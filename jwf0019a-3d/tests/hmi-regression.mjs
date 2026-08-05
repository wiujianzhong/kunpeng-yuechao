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
const snapshotOptions = [...html.matchAll(/<option value="(training|endpoint-[^"]+)"/g)].map((match) => match[1]);
assert.deepEqual(snapshotOptions, ["training", "endpoint-1-1", "endpoint-1-2", "endpoint-2-2"], "2026-08-02多机台快照选择器只能包含训练合成和三个已取证端点");
assert.doesNotMatch(`${html}\n${script}`, /\b(fetch|XMLHttpRequest|WebSocket|sendBeacon)\b/, "HMI页面与脚本不得连接或写入生产设备");
assert.match(html, /2026-05-15 · 端点3-2 · 只读/, "系统设置必须标明实际取证时间与端点");
assert.doesNotMatch(html, /来源于2026-07-22实机参数截图/, "不得把资料整理日误写为设置截图时间");

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

  const snapshotContract = await evaluate("JSON.parse(JSON.stringify(evidenceSnapshots))");
  assert.deepEqual(Object.keys(snapshotContract), ["endpoint-1-1", "endpoint-1-2", "endpoint-2-2"], "2026-08-02多机台快照对象只能按三个已确认端点拆分");
  assert.deepEqual(snapshotContract["endpoint-1-1"].available, ["main", "valve", "flow", "spirit", "history", "triggers"], "端点1-1证据页面范围不得扩张");
  assert.deepEqual(snapshotContract["endpoint-1-2"].available, ["valve"], "端点1-2只能展示喷阀统计证据");
  assert.deepEqual(snapshotContract["endpoint-2-2"].available, ["main"], "端点2-2只能展示主界面证据");
  assert.deepEqual({
    capturedAt: snapshotContract["endpoint-1-1"].capturedAt,
    lampLife: snapshotContract["endpoint-1-1"].lampLife,
    runtime: snapshotContract["endpoint-1-1"].runtime,
    dayTotal: snapshotContract["endpoint-1-1"].dayTotal,
    selectedChannel: snapshotContract["endpoint-1-1"].selectedChannel,
    actionButton: snapshotContract["endpoint-1-1"].actionButton
  }, {
    capturedAt: "2026-08-02 23:43:14",
    lampLife: "3464/30000",
    runtime: "0114:54:40",
    dayTotal: 52338,
    selectedChannel: 10,
    actionButton: "关车"
  }, "端点1-1元数据必须与截图04时刻一致");
  assert.deepEqual(snapshotContract["endpoint-1-1"].flowSteps, [[0,10.5],[9.95,10.5],[10.1,0],[10.35,0],[10.45,10.5],[16.85,10.5],[17,0],[24,0]], "端点1-1流速必须使用显式取证阶梯点");
  assert.deepEqual(snapshotContract["endpoint-1-1"].historyEvidence, { calendarOpen: true, selectedDay: 1, queryResultCaptured: false }, "端点1-1历史证据只能表示日历弹窗与选中日");
  assert.deepEqual(snapshotContract["endpoint-1-1"].frontValves, [462,839,1200,1281,1142,1038,982,875,757,788,748,693,672,809,880,914,977,964,972,967,946,1014,1073,1025,983,1051,1304,1354,1369,1365,1025,473], "端点1-1前视32阀值不得串入其他机台");
  assert.deepEqual(snapshotContract["endpoint-1-1"].rearValves, [408,786,1113,1129,1033,1013,1083,1031,942,924,1009,954,881,901,932,919,978,994,1001,954,870,855,920,970,1039,1156,1310,1277,1260,1317,1003,472], "端点1-1后视32阀值不得串入其他机台");
  assert.deepEqual({
    scheme: snapshotContract["endpoint-1-2"].scheme,
    capturedAt: snapshotContract["endpoint-1-2"].capturedAt,
    lampLife: snapshotContract["endpoint-1-2"].lampLife,
    runtime: snapshotContract["endpoint-1-2"].runtime,
    version: snapshotContract["endpoint-1-2"].version,
    dayTotal: snapshotContract["endpoint-1-2"].dayTotal,
    selectedChannel: snapshotContract["endpoint-1-2"].selectedChannel,
    actionButton: snapshotContract["endpoint-1-2"].actionButton
  }, {
    scheme: "912",
    capturedAt: "2026-08-02 23:42:12",
    lampLife: "4186/30000",
    runtime: "0116:03:46",
    version: "JLH_2026.01.10.0930",
    dayTotal: 65184,
    selectedChannel: 10,
    actionButton: "关车"
  }, "端点1-2元数据必须独立来自截图08");
  assert.deepEqual(snapshotContract["endpoint-1-2"].hourlySpray, [3700,3728,3790,3265,2862,1986,1070,1845,2147,3279,54,null,2452,4007,1585,4200,3963,4045,3726,4133,4186,3712,1449,null,null], "端点1-2小时喷次必须与截图08逐时对齐");
  assert.equal(snapshotContract["endpoint-1-2"].hourlySpray.filter(Number.isFinite).reduce((sum, value) => sum + value, 0), 65184, "端点1-2逐时喷次之和必须与页头日总数一致");
  assert.deepEqual(snapshotContract["endpoint-1-2"].frontValves, [706,1153,1552,1548,1225,1023,1046,1120,1091,1205,1249,1243,1058,954,856,995,1069,912,953,1130,1070,872,803,894,881,806,941,1097,1158,1102,920,514], "端点1-2前视32阀值不得串入其他机台");
  assert.deepEqual(snapshotContract["endpoint-1-2"].rearValves, [852,1393,1865,1872,1464,1127,1106,1084,1003,962,1052,1318,1609,1761,1694,1670,1639,1512,1556,1622,1492,1297,1252,1374,1418,1445,1641,1747,1812,1780,1459,821], "端点1-2后视32阀值不得串入其他机台");
  assert.deepEqual({
    capturedAt: snapshotContract["endpoint-2-2"].capturedAt,
    lampLife: snapshotContract["endpoint-2-2"].lampLife,
    runtime: snapshotContract["endpoint-2-2"].runtime,
    selectedChannel: snapshotContract["endpoint-2-2"].selectedChannel,
    dayTotal: snapshotContract["endpoint-2-2"].dayTotal,
    actionButton: snapshotContract["endpoint-2-2"].actionButton
  }, {
    capturedAt: "2026-08-02 23:48:04",
    lampLife: "4884/30000",
    runtime: "0091:31:23",
    selectedChannel: 1,
    dayTotal: null,
    actionButton: null
  }, "端点2-2只保留主界面可直接读到的元数据");
  assert.deepEqual(snapshotContract["endpoint-2-2"].mainLogs, [
    { atText: "2026-08-02 11:49:09", text: "通道5吹阀保护开" },
    { atText: "2026-08-02 11:49:36", text: "通道5吹阀保护开" },
    { atText: "2026-08-02 11:49:58", text: "通道5吹阀保护开" },
    { atText: "2026-08-02 11:50:17", text: "通道5吹阀保护开" },
    { atText: "2026-08-02 12:25:00", text: "急停按钮按下" },
    { atText: "2026-08-02 12:35:40", text: "急停按钮弹出" }
  ], "端点2-2日志时间与顺序必须按截图09/10保留");

  const snapshotRoundTrip = await evaluate(`(() => {
    setScenario("high-spray");
    state.position = 7;
    state.targetView = "rear";
    state.screen = "stats";
    state.stat = "flow";
    renderAll();
    setScreen("stats");
    setStat("flow");
    const trainingBefore = JSON.stringify(state);

    setSnapshot("endpoint-1-1");
    setScreen("main");
    const frozenBefore = JSON.stringify(state);
    tickClock();
    tickCameraFrames();
    tickMachine();
    const frozenAfter = JSON.stringify(state);
    const oneOneMain = {
      selected: document.querySelector("#snapshot-select").value,
      scheme: document.querySelector("#scheme-value").textContent,
      lamp: document.querySelector("#lamp-life").textContent,
      runtime: document.querySelector("#runtime-value").textContent,
      selectedChannel: document.querySelector(".channel-chip.selected")?.textContent || "",
      cards: document.querySelectorAll("#camera-grid .camera-card.evidence-dark").length,
      images: document.querySelectorAll("#camera-grid img").length,
      scenarioLocked: Array.from(document.querySelectorAll("[data-scenario]"), (button) => button.disabled).every(Boolean),
      playLocked: document.querySelector("#play-scenario").disabled,
      positionLocked: document.querySelector("#position-slider").disabled,
      viewLocked: document.querySelector("#target-view").disabled,
      navEnabled: Array.from(document.querySelectorAll(".machine-nav [data-screen]"), (button) => !button.disabled).every(Boolean),
      runButton: document.querySelector("#run-toggle").textContent.replace(/\\s+/g, ""),
      sprayLabel: document.querySelector("#spray-label").textContent,
      scenarioHidden: getComputedStyle(document.querySelector("#scenario-list")).display === "none",
      baselineHidden: getComputedStyle(document.querySelector(".baseline-control")).display === "none",
      positionHidden: getComputedStyle(document.querySelector(".position-control")).display === "none",
      settingsHidden: getComputedStyle(document.querySelector(".read-settings")).display === "none"
    };
    setScreen("stats");
    setStat("flow");
    const flowCharts = document.querySelectorAll("#stat-flow .evidence-flow-chart");
    const oneOneFlow = {
      chartCount: flowCharts.length,
      firstPath: flowCharts[0]?.querySelector(".evidence-step-line")?.getAttribute("d") || "",
      firstLegend: flowCharts[0]?.textContent.includes("总体流速") || false,
      secondLines: flowCharts[1]?.querySelectorAll(".flow-line").length ?? -1,
      missingVisible: !document.querySelector("#screen-stats .evidence-page-message").hidden
    };
    setStat("history");
    const oneOneHistory = {
      activeDays: Array.from(document.querySelectorAll("#calendar-grid .active"), (item) => item.textContent),
      headerDate: document.querySelector("#stats-date").textContent,
      resultChartsVisible: Array.from(document.querySelectorAll(".stat-content"), (panel) => !panel.hidden).filter(Boolean).length,
      detail: document.querySelector("#snapshot-detail").textContent
    };
    setScreen("triggers");
    const oneOneTriggers = {
      slots: document.querySelector("#trigger-grid").children.length,
      empty: document.querySelectorAll("#trigger-grid .trigger-thumb.empty").length,
      records: document.querySelectorAll("#trigger-grid button.trigger-thumb").length
    };

    setSnapshot("endpoint-1-2");
    setStat("valve");
    const oneTwoValve = {
      total: document.querySelector("#day-total").textContent,
      selectedChannel: document.querySelector(".channel-chip.selected")?.textContent || "",
      charts: document.querySelectorAll("#stat-valve .chart-block").length,
      gap: document.querySelector("#stat-valve .evidence-gap-chart")?.textContent || "",
      hourlyBars: document.querySelectorAll("#stat-valve .chart-block:first-child .bar").length,
      flowResidue: document.querySelectorAll("#stat-flow .flow-line").length
    };
    setScreen("main");
    const oneTwoMissing = {
      visible: !document.querySelector("#screen-main .evidence-page-message").hidden,
      cards: document.querySelectorAll("#camera-grid .camera-card").length,
      leakedLogs: document.querySelector("#runtime-log-list").textContent
    };

    setSnapshot("endpoint-2-2");
    setScreen("main");
    const twoTwoMain = {
      images: document.querySelectorAll("#camera-grid img").length,
      darkCards: document.querySelectorAll("#camera-grid .camera-card.evidence-dark").length,
      selectedChannel: document.querySelector(".channel-chip.selected")?.textContent || "",
      logs: Array.from(document.querySelectorAll("#runtime-log-list .log-line"), (line) => line.textContent),
      actionButtonHidden: document.querySelector("#run-toggle").hidden,
      noActionLayout: document.querySelector(".machine-header").classList.contains("no-action-button"),
      physicalAction: document.querySelector("#physical-action").textContent
    };
    setScreen("stats");
    setStat("valve");
    const twoTwoMissing = {
      visible: !document.querySelector("#screen-stats .evidence-page-message").hidden,
      valveCharts: document.querySelectorAll("#stat-valve .chart-block").length
    };
    setScreen("triggers");
    const twoTwoTriggerMissing = {
      visible: !document.querySelector("#screen-triggers .evidence-page-message").hidden,
      gridItems: document.querySelector("#trigger-grid").children.length,
      detailHidden: document.querySelector(".trigger-detail").hidden
    };

    setSnapshot("training");
    const trainingAfter = JSON.stringify(state);
    const restoredControls = {
      scenarioEnabled: Array.from(document.querySelectorAll("[data-scenario]"), (button) => !button.disabled).every(Boolean),
      playEnabled: !document.querySelector("#play-scenario").disabled,
      positionEnabled: !document.querySelector("#position-slider").disabled,
      viewEnabled: !document.querySelector("#target-view").disabled,
      missingOverlays: Array.from(document.querySelectorAll(".evidence-page-message"), (message) => !message.hidden).filter(Boolean).length
    };
    const clockBeforeResume = state.simClockAt;
    const runtimeBeforeResume = state.runtimeSeconds;
    tickClock();
    tickMachine();
    const resumed = { clock: state.simClockAt, runtime: state.runtimeSeconds };
    setScenario("normal");
    setScreen("main");
    setStat("valve");
    state.selectedTrigger = 9;
    state.selectedTriggerKey = null;
    renderTriggers();
    return { trainingBefore, trainingAfter, frozenBefore, frozenAfter, oneOneMain, oneOneFlow, oneOneHistory, oneOneTriggers, oneTwoValve, oneTwoMissing, twoTwoMain, twoTwoMissing, twoTwoTriggerMissing, restoredControls, clockBeforeResume, runtimeBeforeResume, resumed };
  })()`);
  assert.equal(snapshotRoundTrip.frozenAfter, snapshotRoundTrip.frozenBefore, "实机只读快照中三类定时更新都必须停摆");
  assert.deepEqual(snapshotRoundTrip.oneOneMain, {
    selected: "endpoint-1-1", scheme: "912", lamp: "3464/30000", runtime: "0114:54:40", selectedChannel: "精灵Eye2",
    cards: 20, images: 0, scenarioLocked: true, playLocked: true, positionLocked: true, viewLocked: true, navEnabled: true, runButton: "关车",
    sprayLabel: "证据日喷次", scenarioHidden: true, baselineHidden: true, positionHidden: true, settingsHidden: true
  }, "端点1-1主界面必须为独立灰暗20格并锁定训练控制");
  assert.equal(snapshotRoundTrip.oneOneFlow.chartCount, 2, "端点1-1流速页应保留上下两张图");
  assert.match(snapshotRoundTrip.oneOneFlow.firstPath, /^M .+(?: H .+ V .+)+$/, "端点1-1总体流速必须是无对角线的阶梯路径");
  assert.equal(snapshotRoundTrip.oneOneFlow.firstLegend, true, "端点1-1总体流速应保留图例");
  assert.equal(snapshotRoundTrip.oneOneFlow.secondLines, 0, "端点1-1实时流速图必须只有坐标与网格，不得补造曲线");
  assert.equal(snapshotRoundTrip.oneOneFlow.missingVisible, false, "端点1-1流速是已取证页，不应显示缺证遮罩");
  assert.deepEqual(snapshotRoundTrip.oneOneHistory.activeDays, ["1"], "端点1-1历史日历只能还原截图选中的8月1日");
  assert.equal(snapshotRoundTrip.oneOneHistory.headerDate, "8月02", "历史弹窗不得把页头取证日期改成8月01");
  assert.equal(snapshotRoundTrip.oneOneHistory.resultChartsVisible, 0, "历史日历证据不得补造日期查询结果图");
  assert.match(snapshotRoundTrip.oneOneHistory.detail, /查询结果未取证/, "历史快照说明必须明示证据边界");
  assert.deepEqual(snapshotRoundTrip.oneOneTriggers, { slots: 32, empty: 3, records: 29 }, "端点1-1触发页必须保留32槽、3空槽和29条记录");
  assert.deepEqual(snapshotRoundTrip.oneTwoValve, { total: "65184", selectedChannel: "精灵Eye2", charts: 3, gap: "", hourlyBars: 25, flowResidue: 0 }, "端点1-2只显示独立喷阀证据且不得残留1-1流速");
  assert.deepEqual(snapshotRoundTrip.oneTwoMissing, { visible: true, cards: 0, leakedLogs: "" }, "端点1-2未取证主界面不得残留其他端点画面或日志");
  assert.equal(snapshotRoundTrip.twoTwoMain.images, 20, "端点2-2主界面应显示20幅本端点取证画面");
  assert.equal(snapshotRoundTrip.twoTwoMain.darkCards, 0, "端点2-2不得残留端点1-1灰暗重构格");
  assert.equal(snapshotRoundTrip.twoTwoMain.selectedChannel, "通道1", "端点2-2应保留截图中的通道1选中状态");
  assert.equal(snapshotRoundTrip.twoTwoMain.actionButtonHidden, true, "端点2-2截图未出现动作按钮，不得借用其他端点的关车按钮");
  assert.equal(snapshotRoundTrip.twoTwoMain.noActionLayout, true, "端点2-2隐藏按钮后，机器信息区必须紧接通道区");
  assert.equal(snapshotRoundTrip.twoTwoMain.physicalAction, "本端点未显示动作按钮，不推断运行状态", "端点2-2右侧说明不得声称存在未取证按钮");
  assert.deepEqual(snapshotRoundTrip.twoTwoMain.logs, snapshotContract["endpoint-2-2"].mainLogs.map((item) => `${item.atText}: ${item.text}`), "端点2-2日志不得串入1-1日志");
  assert.deepEqual(snapshotRoundTrip.twoTwoMissing, { visible: true, valveCharts: 0 }, "端点2-2未取证统计页不得残留1-1或1-2柱图");
  assert.deepEqual(snapshotRoundTrip.twoTwoTriggerMissing, { visible: true, gridItems: 0, detailHidden: true }, "端点2-2未取证触发页不得残留1-1触发详情");
  assert.equal(snapshotRoundTrip.trainingAfter, snapshotRoundTrip.trainingBefore, "退出快照后必须完整恢复进入前的训练状态");
  assert.deepEqual(snapshotRoundTrip.restoredControls, { scenarioEnabled: true, playEnabled: true, positionEnabled: true, viewEnabled: true, missingOverlays: 0 }, "退出快照后训练控制与画面必须恢复");
  assert.ok(snapshotRoundTrip.resumed.clock > snapshotRoundTrip.clockBeforeResume, "退出快照后培训时钟应继续增长");
  assert.ok(snapshotRoundTrip.resumed.runtime > snapshotRoundTrip.runtimeBeforeResume, "退出快照后培训运行时长应继续增长");

  const triggerEvidenceBaseline = await evaluate(`(() => {
    renderTriggers();
    return {
      slots: document.querySelector("#trigger-grid").children.length,
      emptySlots: document.querySelectorAll("#trigger-grid .trigger-thumb.empty").length,
      records: document.querySelectorAll("#trigger-grid button.trigger-thumb").length,
      detailNumber: document.querySelector("#trigger-number").textContent
    };
  })()`);
  assert.deepEqual(triggerEvidenceBaseline, {
    slots: 32,
    emptySlots: 3,
    records: 29,
    detailNumber: "13"
  }, "触发图实机基线应保留32个槽位、3个空槽和29条记录");

  const scenarioEvidenceContract = await evaluate(`(() => ({
    scenarioCount: Object.keys(scenarios).length,
    evidenceCount: Object.keys(scenarioEvidence).length,
    complete: Object.keys(scenarios).every((key) => {
      const item = scenarioEvidence[key];
      return Boolean(item?.level && item?.confirmed && item?.unknown);
    })
  }))()`);
  assert.deepEqual(scenarioEvidenceContract, {
    scenarioCount: 19,
    evidenceCount: 19,
    complete: true
  }, "19个场景都必须有证据等级、已确认事实和未取证边界");

  const cameraFaultMarkers = await evaluate(`(() => {
    const inspect = (name) => {
      setScenario(name);
      state.phase = PHASE.ALARM_ACTIVE;
      renderCameras();
      return {
        marks: document.querySelectorAll("#camera-grid .freeze-mark").length,
        note: document.querySelector("#camera-grid .camera-evidence-boundary")?.textContent || ""
      };
    };
    return {
      camera: inspect("camera-fault"),
      channel: inspect("channel-fault"),
      camera485: inspect("camera-485"),
      screen: inspect("screen-freeze")
    };
  })()`);
  assert.equal(cameraFaultMarkers.camera.marks, 1, "单相机故障只应标记一幅未刷新画面");
  assert.match(cameraFaultMarkers.camera.note, /其余主检测画面继续刷新/, "单相机故障应解释其余画面仍刷新");
  assert.equal(cameraFaultMarkers.channel.marks, 2, "通道通讯故障应标记同通道两幅未刷新画面");
  assert.match(cameraFaultMarkers.channel.note, /物理检测状态未知/, "通道故障不得由冻结画面反推物理检测状态");
  assert.equal(cameraFaultMarkers.camera485.marks, 1, "485异常只应标记一幅未刷新画面");
  assert.match(cameraFaultMarkers.camera485.note, /不能与普通相机故障区分/, "485异常必须保留与普通相机故障的鉴别边界");
  assert.equal(cameraFaultMarkers.screen.marks, 0, "整屏冻结不应在20幅画面重复堆叠标记");
  assert.match(cameraFaultMarkers.screen.note, /设备动作未知/, "整屏冻结不得反推设备动作");

  const settingsMonitorContract = await evaluate(`(() => {
    const inspect = (name) => {
      setScenario(name);
      state.phase = PHASE.ALARM_ACTIVE;
      updateSettingsMonitors();
      return Array.from(document.querySelectorAll("[data-monitor].training-alert"), (node) => node.dataset.monitor);
    };
    const result = {
      flow: inspect("flow-abnormal"),
      channel: inspect("channel-fault"),
      camera: inspect("camera-fault"),
      temperature: inspect("temperature"),
      camera485: inspect("camera-485")
    };
    setSnapshot("endpoint-1-1");
    updateSettingsMonitors();
    result.snapshot = Array.from(document.querySelectorAll("[data-monitor].training-alert"), (node) => node.dataset.monitor);
    setSnapshot("training");
    return result;
  })()`);
  assert.deepEqual(settingsMonitorContract, {
    flow: ["flow"],
    channel: ["channel"],
    camera: ["camera"],
    temperature: ["temperature"],
    camera485: ["camera485"],
    snapshot: []
  }, "培训场景只联动对应监控项；实机只读快照不得叠加培训报警");

  const triggerEvidenceFilled = await evaluate(`(() => {
    state.triggerEvents = Array.from({ length: 3 }, (_, index) => ({
      id: "training-fill-" + index,
      imageIndex: 13,
      cameraSourceNumber: index + 1,
      at: state.simClockAt + index,
      repeated: false,
      kind: "training"
    }));
    renderTriggers();
    const result = {
      slots: document.querySelector("#trigger-grid").children.length,
      emptySlots: document.querySelectorAll("#trigger-grid .trigger-thumb.empty").length,
      records: document.querySelectorAll("#trigger-grid button.trigger-thumb").length
    };
    state.triggerEvents = [];
    state.selectedTriggerKey = null;
    state.selectedTrigger = 9;
    renderTriggers();
    return result;
  })()`);
  assert.deepEqual(triggerEvidenceFilled, {
    slots: 32,
    emptySlots: 0,
    records: 32
  }, "培训中新触发记录应依次占用3个空槽，且不改变32槽布局");

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

  const blockageBoundary = await evaluate(`(() => {
    setScenario("blockage");
    state.phase = PHASE.FAULT_OBSERVABLE;
    state.phaseTick = 1;
    state.tick = 6;
    renderAll();
    const event = currentDetectionEvent(true);
    return {
      forcedFaultEvent: localFaultEventDue(),
      eventIsTargeted: event.isFaultEvent,
      action: document.querySelector("#physical-action").textContent,
      eventText: liveEventText()
    };
  })()`);
  assert.equal(blockageBoundary.forcedFaultEvent, false, "30厘米堵花不得强制生成精准阀位故障事件");
  assert.equal(blockageBoundary.eventIsTargeted, false, "30厘米堵花不得把检测事件绑定成精准目标喷射");
  assert.match(blockageBoundary.action, /不绑定精准阀位/, "30厘米堵花必须标明喷射偏移尚未取证");
  assert.match(blockageBoundary.eventText, /约30厘米区域/, "30厘米堵花实时描述必须使用区域口径");
  assert.doesNotMatch(blockageBoundary.eventText, /号阀/, "30厘米堵花实时描述不得指向单个电磁阀");

  const physicalReadoutMatrix = await evaluate(`(() => {
    const abnormalScenarios = Object.keys(scenarios).filter((name) => name !== "normal");
    const phases = [PHASE.FAULT_FORMING, PHASE.FAULT_OBSERVABLE, PHASE.ALARM_ACTIVE, PHASE.RECOVERY];
    const rows = [];
    for (const name of abnormalScenarios) {
      setScenario(name);
      for (const phase of phases) {
        state.phase = phase;
        renderPhysicalReadout();
        rows.push({ name, phase, action: document.querySelector("#physical-action").textContent });
      }
    }
    setScenario("normal");
    renderPhysicalReadout();
    return {
      rows,
      normalAction: document.querySelector("#physical-action").textContent,
      ductTargeted: (() => {
        setScenario("duct-blockage");
        state.phase = PHASE.FAULT_OBSERVABLE;
        return currentDetectionEvent(true).isFaultEvent;
      })()
    };
  })()`);
  assert.equal(physicalReadoutMatrix.rows.length, 72, "18个异常场景应覆盖4个培训阶段");
  physicalReadoutMatrix.rows.forEach(({ name, phase, action }) => {
    assert.doesNotMatch(action, /检测与喷射动作正常/, `${name}/${phase}不得误报物理动作正常`);
  });
  assert.match(physicalReadoutMatrix.normalAction, /物理检测和喷气未接入/, "正常培训基线不得冒充物理设备真实状态");
  assert.equal(physicalReadoutMatrix.ductTargeted, false, "风道堵塞不得伪造精准阀位故障喷次");

  const brightnessBoundary = await evaluate(`(() => {
    setScenario("lamp-brightness");
    state.phase = PHASE.FAULT_OBSERVABLE;
    renderAll();
    const abnormal = document.querySelector(".camera-card.brightness-abnormal img");
    const normal = document.querySelector(".camera-card:not(.brightness-abnormal) img");
    return {
      abnormalFilter: getComputedStyle(abnormal).filter,
      normalFilter: getComputedStyle(normal).filter
    };
  })()`);
  assert.equal(brightnessBoundary.abnormalFilter, brightnessBoundary.normalFilter, "亮度异常方向未取证时不得固定画成变暗");

  const fanBoundary = await evaluate(`(() => {
    setScenario("fan-overload");
    state.phase = PHASE.FAULT_OBSERVABLE;
    renderAll();
    const before = {
      runtime: state.runtimeSeconds,
      flowLength: state.flowSamples.length,
      hourlyFlow: state.hourlyFlow.slice(),
      dayTotal: state.dayTotal,
      frontValves: state.frontValves.slice(),
      rearValves: state.rearValves.slice(),
      cameraPhases: state.cameraPhases.slice()
    };
    tickMachine();
    tickCameraFrames();
    return {
      boundary: document.querySelector(".camera-evidence-boundary")?.textContent || "",
      before,
      after: {
        runtime: state.runtimeSeconds,
        flowLength: state.flowSamples.length,
        hourlyFlow: state.hourlyFlow.slice(),
        dayTotal: state.dayTotal,
        frontValves: state.frontValves.slice(),
        rearValves: state.rearValves.slice(),
        cameraPhases: state.cameraPhases.slice()
      }
    };
  })()`);
  assert.match(fanBoundary.boundary, /保留故障前最后画面/, "风机过载动态区域必须显示证据边界");
  assert.deepEqual(fanBoundary.after, fanBoundary.before, "风机过载后不得继续伪造相机、流速、喷次和运行统计");

  const scenarioIsolation = await evaluate(`(() => {
    setScenario("high-spray");
    capturePlaybackBaseline();
    const baseline = {
      dayTotal: state.dayTotal,
      hourlySpray: state.hourlySpray.slice(),
      hourlyFlow: state.hourlyFlow.slice(),
      flowSamples: state.flowSamples.slice(),
      frontValves: state.frontValves.slice(),
      rearValves: state.rearValves.slice(),
      cameraPhases: state.cameraPhases.slice()
    };
    state.playing = true;
    state.roundClockActive = true;
    state.phase = PHASE.FAULT_OBSERVABLE;
    for (let index = 0; index < 6; index += 1) tickMachine();
    state.simClockAt += 30000;
    const beforeSwitch = { clock: state.simClockAt, runtime: state.runtimeSeconds };
    setScenario("normal");
    return {
      baseline,
      restored: {
        dayTotal: state.dayTotal,
        hourlySpray: state.hourlySpray.slice(),
        hourlyFlow: state.hourlyFlow.slice(),
        flowSamples: state.flowSamples.slice(),
        frontValves: state.frontValves.slice(),
        rearValves: state.rearValves.slice(),
        cameraPhases: state.cameraPhases.slice()
      },
      beforeSwitch,
      afterSwitch: { clock: state.simClockAt, runtime: state.runtimeSeconds },
      flags: {
        phase: state.phase,
        playing: state.playing,
        awaitingManual: state.awaitingManual,
        roundClockActive: state.roundClockActive,
        triggerCount: state.triggerEvents.length,
        flowAlarm: state.flowAlarm,
        flowAbnormalCount: state.flowAbnormalCount
      }
    };
  })()`);
  assert.deepEqual(scenarioIsolation.restored, scenarioIsolation.baseline, "切换场景后必须恢复播放前的喷次、流速、阀统计和相机相位");
  assert.ok(scenarioIsolation.afterSwitch.clock >= scenarioIsolation.beforeSwitch.clock, "切换场景后界面时间不得倒退");
  assert.ok(scenarioIsolation.afterSwitch.runtime >= scenarioIsolation.beforeSwitch.runtime, "切换场景后运行时长不得倒退");
  assert.deepEqual(scenarioIsolation.flags, {
    phase: "RUN_BASELINE",
    playing: false,
    awaitingManual: false,
    roundClockActive: false,
    triggerCount: 0,
    flowAlarm: false,
    flowAbnormalCount: 0
  }, "切换场景后必须清理上一场的运行标志和触发事件");

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
  assert.equal(frozenAfter.runButton, "关车", "整屏卡住时应保留卡住前的关车动作按钮画面");

  console.log("HMI回归通过：19场景入口、触发页32槽/3空槽基线、只读边界、72阶段物理文案、堵花不绑定精准阀位、风机过载保留最后值、切换场景不串数且计时不倒退");
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
