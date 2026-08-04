import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { createServer } from "node:net";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const testDir = dirname(fileURLToPath(import.meta.url));
const appDir = resolve(testDir, "..");
const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const html = readFileSync(join(appDir, "hmi.html"), "utf8");
const script = readFileSync(join(appDir, "hmi.js"), "utf8");

assert.ok(existsSync(chromePath), "未找到 Google Chrome");
assert.doesNotMatch(script, /trainingTimelinePaused/, "等待人工状态不能冻结整套HMI");
assert.doesNotMatch(script, /\b(fetch|XMLHttpRequest|WebSocket|sendBeacon)\b/, "HMI培训页不得连接或写入生产设备");

const scenarioButtons = [...html.matchAll(/data-scenario="([^"]+)"/g)].map((match) => match[1]);
assert.equal(new Set(scenarioButtons).size, 19, "HMI场景按钮应为19个且不能重名");

function freePort() {
  return new Promise((resolvePort, reject) => {
    const server = createServer();
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address();
      server.close(() => resolvePort(port));
    });
  });
}

async function waitFor(check, label, timeout = 10_000) {
  const startedAt = Date.now();
  let lastError;
  while (Date.now() - startedAt < timeout) {
    try {
      const value = await check();
      if (value) return value;
    } catch (error) {
      lastError = error;
    }
    await new Promise((resolveWait) => setTimeout(resolveWait, 100));
  }
  throw new Error(`${label}超时${lastError ? `：${lastError.message}` : ""}`);
}

function cdpClient(socketUrl) {
  const socket = new WebSocket(socketUrl);
  const pending = new Map();
  let nextId = 1;
  const opened = new Promise((resolveOpen, reject) => {
    socket.addEventListener("open", resolveOpen, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });
  socket.addEventListener("message", (event) => {
    const message = JSON.parse(String(event.data));
    if (!message.id || !pending.has(message.id)) return;
    const { resolveCommand, rejectCommand } = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) rejectCommand(new Error(message.error.message));
    else resolveCommand(message.result);
  });
  return {
    async command(method, params = {}) {
      await opened;
      const id = nextId++;
      return new Promise((resolveCommand, rejectCommand) => {
        pending.set(id, { resolveCommand, rejectCommand });
        socket.send(JSON.stringify({ id, method, params }));
      });
    },
    close() {
      socket.close();
    }
  };
}

let webServer;
let chrome;
let client;
let profileDir;

try {
  const webPort = await freePort();
  const debugPort = await freePort();
  profileDir = mkdtempSync(join(tmpdir(), "jwf0019a-hmi-test-"));
  webServer = spawn("python3", ["-m", "http.server", String(webPort), "--bind", "127.0.0.1", "--directory", appDir], {
    stdio: "ignore"
  });
  const pageUrl = `http://127.0.0.1:${webPort}/hmi.html?test=regression`;
  await waitFor(async () => (await fetch(pageUrl)).ok, "本地HMI服务启动");

  chrome = spawn(chromePath, [
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    "--no-default-browser-check",
    `--remote-debugging-port=${debugPort}`,
    `--user-data-dir=${profileDir}`,
    "about:blank"
  ], { stdio: "ignore" });

  await waitFor(async () => (await fetch(`http://127.0.0.1:${debugPort}/json/version`)).ok, "Chrome调试端口启动");
  const target = await (await fetch(`http://127.0.0.1:${debugPort}/json/new?${encodeURIComponent(pageUrl)}`, { method: "PUT" })).json();
  client = cdpClient(target.webSocketDebuggerUrl);
  await client.command("Runtime.enable");

  async function evaluate(expression) {
    const response = await client.command("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
    if (response.exceptionDetails) throw new Error(response.exceptionDetails.text || "页面脚本执行失败");
    return response.result.value;
  }

  await waitFor(async () => evaluate("document.readyState === 'complete' && document.querySelectorAll('.camera-card').length === 20"), "HMI页面加载");
  await waitFor(async () => evaluate("readyCameraFrames.size >= 36"), "相机训练帧预载", 15_000);

  const cameraStart = await evaluate(`(() => {
    setScenario("camera-fault");
    state.phase = PHASE.ALARM_ACTIVE;
    state.phaseTick = phaseDuration(PHASE.ALARM_ACTIVE);
    state.awaitingManual = true;
    state.playing = false;
    const frozen = frozenCameraIndexes()[0];
    const moving = frozen === 0 ? 4 : 0;
    state.cameraCursor = moving;
    renderAll();
    return {
      frozen,
      moving,
      frozenPhase: state.cameraPhases[frozen],
      movingPhase: state.cameraPhases[moving],
      clock: state.simClockAt,
      runtime: state.runtimeSeconds
    };
  })()`);
  await new Promise((resolveWait) => setTimeout(resolveWait, 350));
  const cameraAfter = await evaluate(`({
    frozenPhase: state.cameraPhases[${cameraStart.frozen}],
    movingPhase: state.cameraPhases[${cameraStart.moving}]
  })`);
  assert.equal(cameraAfter.frozenPhase, cameraStart.frozenPhase, "故障相机等待人工时应保持冻结");
  assert.notEqual(cameraAfter.movingPhase, cameraStart.movingPhase, "其余相机等待人工时仍应刷新");

  await new Promise((resolveWait) => setTimeout(resolveWait, 1_150));
  const runningAfter = await evaluate("({ clock: state.simClockAt, runtime: state.runtimeSeconds })");
  assert.ok(runningAfter.clock > cameraStart.clock, "等待人工时界面时钟应继续");
  assert.ok(runningAfter.runtime > cameraStart.runtime, "等待人工时运行时长与统计应继续");
  const waitingReadout = await evaluate(`({
    runState: document.querySelector("#run-state").textContent,
    phaseLabel: document.querySelector("#phase-label").textContent
  })`);
  assert.match(waitingReadout.runState, /正在开车/, "等待人工处理不应伪装成实机停机");
  assert.equal(waitingReadout.phaseLabel, "等待人工处理", "培训阶段应单独标记等待人工处理");

  const smallHangAfter = await evaluate(`(() => {
    setScenario("hang-small");
    state.playing = true;
    state.phase = PHASE.FAULT_OBSERVABLE;
    state.phaseTick = phaseDuration(PHASE.FAULT_OBSERVABLE) - 1;
    advanceScenarioPhase();
    return {
      phase: state.phase,
      playing: state.playing,
      awaitingManual: state.awaitingManual,
      latestLog: state.logEvents[0]?.text || ""
    };
  })()`);
  assert.equal(smallHangAfter.phase, "RUN_BASELINE", "1厘米小挂花观察结束后应回到基线");
  assert.equal(smallHangAfter.playing, false, "1厘米小挂花不应继续进入报警阶段");
  assert.equal(smallHangAfter.awaitingManual, false, "1厘米小挂花不应强制等待人工处理");
  assert.match(smallHangAfter.latestLog, /未升级为报警/, "1厘米小挂花应明确记录为观察而非报警");

  const multiDayReference = await evaluate(`(() => {
    state.baseline = "yaxin-f1-20260727-0731";
    renderBaselineProfile();
    return {
      selected: document.querySelector("#baseline-select").value,
      detail: document.querySelector("#baseline-detail").textContent
    };
  })()`);
  assert.equal(multiDayReference.selected, "yaxin-f1-20260727-0731", "应能选择2026-07-27—31多线多日参考");
  assert.match(multiDayReference.detail, /日累计喷次/, "多日参考必须明确日累计口径");
  assert.match(multiDayReference.detail, /P50 83440/, "多日参考应展示可回溯的中位数");

  const frozenStart = await evaluate(`(() => {
    setScenario("screen-freeze");
    state.phase = PHASE.ALARM_ACTIVE;
    state.phaseTick = phaseDuration(PHASE.ALARM_ACTIVE);
    state.awaitingManual = true;
    state.playing = false;
    renderAll();
    return {
      clock: state.simClockAt,
      runtime: state.runtimeSeconds,
      phases: state.cameraPhases.slice(),
      sources: Array.from(document.querySelectorAll(".camera-card img"), (image) => image.src),
      runButton: document.querySelector("#run-toggle").textContent.replace(/\s+/g, "")
    };
  })()`);
  await new Promise((resolveWait) => setTimeout(resolveWait, 1_250));
  const frozenAfter = await evaluate(`({
    clock: state.simClockAt,
    runtime: state.runtimeSeconds,
    phases: state.cameraPhases.slice(),
    sources: Array.from(document.querySelectorAll(".camera-card img"), (image) => image.src),
    runButton: document.querySelector("#run-toggle").textContent.replace(/\s+/g, "")
  })`);
  assert.deepEqual(frozenAfter, frozenStart, "整屏卡住时界面时间、统计和20幅画面都应保持不变");
  assert.equal(frozenAfter.runButton, "开车", "整屏卡住时应保留卡住前的开车按钮画面");

  console.log("HMI回归通过：19场景入口、只读边界、等待人工局部冻结、整屏卡住全冻结");
} finally {
  client?.close();
  const waitForExit = (process) => process && process.exitCode === null
    ? new Promise((resolveExit) => {
      process.once("exit", resolveExit);
      process.kill("SIGTERM");
      setTimeout(resolveExit, 2_000);
    })
    : Promise.resolve();
  await Promise.all([waitForExit(chrome), waitForExit(webServer)]);
  if (profileDir) rmSync(profileDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
}
