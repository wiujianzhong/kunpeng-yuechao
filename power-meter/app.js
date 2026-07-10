"use strict";

const STATIC_MODE = location.hostname.endsWith("github.io") || new URLSearchParams(location.search).has("static");
const STATIC_STORAGE_KEY = "power-meter-pages-records-v1";
const STATIC_METERS = [
  ["M001", 1, "低压总表", "总表", "4000/5", 800, 13816, true],
  ["M002", 2, "清花1", "清花", "200/5", 40, 6140, true],
  ["M003", 3, "清花2", "清花", "200/5", 40, 83972, true],
  ["M004", 4, "梳棉1", "梳棉", "250/5", 50, 87803, true],
  ["M005", 5, "梳棉2", "梳棉", "250/5", 50, 76858, true],
  ["M006", 6, "梳棉3", "梳棉", "250/5", 50, 75704, true],
  ["M007", 7, "梳棉4", "梳棉", "250/5", 50, 93379, true],
  ["M008", 8, "梳棉5", "梳棉", "250/5", 50, 91601, true],
  ["M009", 9, "梳棉6", "梳棉", "250/5", 50, 90713, true],
  ["M010", 10, "梳棉7", "梳棉", "250/5", 50, 45, true],
  ["M011", 11, "精梳1", "精梳", "100/5", 20, 54760, true],
  ["M012", 12, "精梳2", "精梳", "100/5", 20, 53909, true],
  ["M013", 13, "精梳3", "精梳", "100/5", 20, 62644, true],
  ["M014", 14, "精梳4", "精梳", "100/5", 20, 60950, true],
  ["M015", 15, "精梳5", "精梳", "100/5", 20, 47935, true],
  ["M016", 16, "精梳6", "精梳", "100/5", 20, 29121, true],
  ["M017", 17, "尾纱1", "尾纱", "250/5", 50, 30022, true],
  ["M018", 18, "尾纱2", "尾纱", "250/5", 50, 29075, true],
  ["M019", 19, "前并条", "前并", "150/5", 30, 99725, true],
  ["M020", 20, "条并卷", "条并卷", "200/5", 40, 41027, true],
  ["M021", 21, "并条机", "并条", "250/5", 50, 29297, true],
  ["M022", 22, "后并条", "后并", "150/5", 30, 56045, true],
  ["M023", 23, "清花除尘1", "清花除尘", "300/5", 60, 64871, true],
  ["M024", 24, "清花除尘2", "清花除尘", "300/5", 60, 60833, true],
  ["M025", 25, "梳棉除尘1", "梳棉除尘", "300/5", 60, 60224, true],
  ["M026", 26, "梳棉除尘2", "梳棉除尘", "300/5", 60, 57439, true],
  ["M027", 27, "精梳除尘1", "精梳除尘", "300/5", 60, 37830, true],
  ["M028", 28, "精梳除尘2", "精梳除尘", "300/5", 60, 63344, true],
  ["M029", 29, "1#清花空调", "空调", "250/5", 50, 58675, true],
  ["M030", 30, "3#梳棉空调", "空调", "250/5", 50, 49184, true],
  ["M031", 31, "5#精梳空调", "空调", "250/5", 50, 63623, true],
  ["M032", 32, "清尾照明", "照明", "100/5", 20, 23218, true],
  ["M033", 33, "前纺照明", "照明", "200/5", 40, 30183, true],
  ["M034", 34, "应急照明1", "照明", "40/5", 8, 26837, true],
  ["M035", 35, "应急照明2", "照明", "40/5", 8, 1856, true],
  ["M036", 36, "一厂南路灯", "照明", "300/5", 60, 17564, true],
  ["M037", 37, "一厂南水井", "水井", "300/5", 60, 0, false],
  ["M038", 38, "联络线（1-7）", "联络线", "400/5", 80, 10035, true],
  ["M039", 39, "1-3排烟风机", "排烟风机", "50/5", 10, 63, true],
  ["M040", 40, "新装梳棉动力柜", "梳棉", "250/5", 50, 59419, true],
];

const state = {
  date: "",
  rows: [],
  saved: false,
  apiConfigured: false,
  serverWarnings: new Map(),
  rowElements: new Map(),
};

const el = {
  readingDate: document.querySelector("#readingDate"),
  meterRows: document.querySelector("#meterRows"),
  template: document.querySelector("#meterRowTemplate"),
  progressValue: document.querySelector("#progressValue"),
  progressBar: document.querySelector("#progressBar"),
  totalUsage: document.querySelector("#totalUsage"),
  classifiedUsage: document.querySelector("#classifiedUsage"),
  errorCount: document.querySelector("#errorCount"),
  balancePanel: document.querySelector(".balance-panel"),
  balanceValue: document.querySelector("#balanceValue"),
  balanceHint: document.querySelector("#balanceHint"),
  categoryBars: document.querySelector("#categoryBars"),
  topMeters: document.querySelector("#topMeters"),
  saveState: document.querySelector("#saveState"),
  aiState: document.querySelector("#aiState"),
  aiOverview: document.querySelector("#aiOverview"),
  aiAnomalies: document.querySelector("#aiAnomalies"),
  aiConclusion: document.querySelector("#aiConclusion"),
  apiStatusDot: document.querySelector("#apiStatusDot"),
  dockIcon: document.querySelector("#dockIcon"),
  dockText: document.querySelector("#dockText"),
  saveButton: document.querySelector("#saveButton"),
  exportButton: document.querySelector("#exportButton"),
  printButton: document.querySelector("#printButton"),
  apiSettingsButton: document.querySelector("#apiSettingsButton"),
  apiDialog: document.querySelector("#apiDialog"),
  closeApiDialog: document.querySelector("#closeApiDialog"),
  cancelApiDialog: document.querySelector("#cancelApiDialog"),
  apiForm: document.querySelector("#apiForm"),
  apiKeyInput: document.querySelector("#apiKeyInput"),
  saveApiKeyButton: document.querySelector("#saveApiKeyButton"),
  toast: document.querySelector("#toast"),
};


function todayLocal() {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60_000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}


function toNumber(value) {
  if (value === null || value === undefined || value === "") return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}


function formatNumber(value, suffix = "") {
  if (value === null || value === undefined || Number.isNaN(value)) return "—";
  const number = Number(value);
  const formatted = new Intl.NumberFormat("zh-CN", {
    maximumFractionDigits: 2,
  }).format(number);
  return `${formatted}${suffix}`;
}


async function request(url, options = {}) {
  if (STATIC_MODE) return staticRequest(url, options);
  const response = await fetch(url, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  let payload = {};
  try {
    payload = await response.json();
  } catch (_) {
    payload = { error: "本地服务返回了无法识别的数据" };
  }
  if (!response.ok) {
    const error = new Error(payload.error || "操作失败");
    error.payload = payload;
    throw error;
  }
  return payload;
}


function staticRecords() {
  try {
    return JSON.parse(localStorage.getItem(STATIC_STORAGE_KEY) || "{}");
  } catch (_) {
    return {};
  }
}


function staticBaseRows(readingDate) {
  const records = staticRecords();
  if (records[readingDate]?.rows) return records[readingDate].rows.map((row) => ({ ...row }));
  const previousDate = Object.keys(records).filter((item) => item < readingDate).sort().at(-1);
  const previous = new Map((records[previousDate]?.rows || []).map((row) => [row.meter_id, row.end]));
  return STATIC_METERS.map(([meter_id, order_no, name, category, ratio_text, multiplier, seed, required]) => {
    const start = previous.has(meter_id) ? previous.get(meter_id) : seed;
    return {
      meter_id, order_no, name, category, ratio_text, multiplier, required,
      expected_start: start, start, end: null, difference: null, usage: null, warning: "",
    };
  });
}


function staticSummary(rows) {
  const categories = new Map();
  let totalUsage = null;
  let classifiedUsage = 0;
  rows.forEach((row) => {
    const usage = toNumber(row.usage);
    if (usage === null) return;
    if (row.category === "总表") totalUsage = usage;
    else {
      categories.set(row.category, (categories.get(row.category) || 0) + usage);
      classifiedUsage += usage;
    }
  });
  return {
    total_usage: totalUsage,
    classified_usage: classifiedUsage,
    balance: totalUsage === null ? null : totalUsage - classifiedUsage,
    completed: rows.filter((row) => row.end !== null && row.end !== "").length,
    total_meters: rows.length,
    categories: [...categories.entries()].sort((a, b) => b[1] - a[1]).map(([category, usage]) => ({ category, usage })),
  };
}


function staticLocalAnalysis(calculation) {
  const top_meters = calculation.rows
    .filter((row) => row.category !== "总表" && toNumber(row.usage) > 0)
    .sort((a, b) => b.usage - a.usage)
    .slice(0, 5)
    .map((row) => ({ name: row.name, category: row.category, usage: row.usage }));
  const total = calculation.summary.total_usage;
  return {
    overview: total === null
      ? "浏览器本地分析已生成。"
      : `本日总表用电 ${formatNumber(total)} kWh，数据只保存在当前浏览器。`,
    risk_level: calculation.warnings.length ? "需复核" : "正常",
    top_meters,
    rule_warnings: calculation.warnings,
  };
}


async function staticRequest(url, options = {}) {
  const parsed = new URL(url, location.href);
  const readingDate = parsed.searchParams.get("date") || state.date || todayLocal();
  const records = staticRecords();
  if (parsed.pathname.endsWith("/api/bootstrap")) {
    const saved = records[readingDate];
    return {
      date: readingDate,
      rows: staticBaseRows(readingDate),
      warnings: [],
      report: saved?.report || null,
      api_configured: false,
      static_mode: true,
    };
  }
  const payload = JSON.parse(options.body || "{}");
  if (parsed.pathname.endsWith("/api/save")) {
    const submitted = new Map((payload.rows || []).map((row) => [row.meter_id, row]));
    const errors = [];
    const warnings = [];
    const rows = staticBaseRows(payload.date).map((row) => {
      const item = submitted.get(row.meter_id) || {};
      const start = toNumber(item.start);
      let end = toNumber(item.end);
      if (end === null && !row.required) end = start;
      if (end === null) errors.push({ meter_id: row.meter_id, message: "请填写今日读数" });
      if (start === null) errors.push({ meter_id: row.meter_id, message: "请补充昨日读数" });
      if (start !== null && end !== null && end < start) errors.push({ meter_id: row.meter_id, message: "今日读数不能小于昨日读数" });
      const difference = start !== null && end !== null && end >= start ? end - start : null;
      const usage = difference === null ? null : difference * row.multiplier;
      return { ...row, start, end, difference, usage, warning: "" };
    });
    if (errors.length) {
      const error = new Error("请先处理错误读数");
      error.payload = { errors };
      throw error;
    }
    const calculation = { date: payload.date, rows, summary: staticSummary(rows), errors, warnings, valid: true };
    const local = staticLocalAnalysis(calculation);
    records[payload.date] = { rows, report: { local, ai: null, ai_status: "GitHub试用版" } };
    localStorage.setItem(STATIC_STORAGE_KEY, JSON.stringify(records));
    return { ...calculation, local_analysis: local };
  }
  if (parsed.pathname.endsWith("/api/analyze")) {
    const saved = records[payload.date];
    const calculation = saved
      ? { date: payload.date, rows: saved.rows, summary: staticSummary(saved.rows), warnings: [] }
      : { date: payload.date, rows: [], summary: {}, warnings: [] };
    return {
      local: staticLocalAnalysis(calculation),
      status: "未配置",
      analysis: null,
      message: "GitHub试用版不上传生产数据；DeepSeek将在正式服务器版启用。",
    };
  }
  throw new Error("GitHub试用版不支持此操作");
}


function showToast(message) {
  el.toast.textContent = message;
  el.toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => el.toast.classList.remove("show"), 2400);
}


function draftKey() {
  return `power-meter-draft-${state.date}`;
}


function saveDraft() {
  if (!state.date || state.saved) return;
  const rows = state.rows.map((row) => ({
    meter_id: row.meter_id,
    start: row.start,
    end: row.end,
  }));
  localStorage.setItem(draftKey(), JSON.stringify(rows));
}


function mergeDraft(rows) {
  if (rows.some((row) => row.end !== null && row.end !== "")) return rows;
  const raw = localStorage.getItem(draftKey());
  if (!raw) return rows;
  try {
    const draft = new Map(JSON.parse(raw).map((item) => [item.meter_id, item]));
    return rows.map((row) => ({ ...row, ...(draft.get(row.meter_id) || {}) }));
  } catch (_) {
    localStorage.removeItem(draftKey());
    return rows;
  }
}


async function loadDate(readingDate) {
  state.date = readingDate;
  state.saved = false;
  state.serverWarnings.clear();
  el.meterRows.innerHTML = '<p class="loading-row">正在读取昨日数据…</p>';
  try {
    const payload = await request(`/api/bootstrap?date=${encodeURIComponent(readingDate)}`);
    state.rows = mergeDraft(payload.rows);
    state.saved = Boolean(payload.rows.some((row) => row.end !== null && row.end !== ""));
    state.apiConfigured = payload.api_configured;
    (payload.warnings || []).forEach((item) => state.serverWarnings.set(item.meter_id, item.message));
    renderRows();
    updateApiStatus();
    updateSavedState();
    calculateClient();
    if (payload.report) {
      renderLocalAnalysis(payload.report.local);
      if (payload.report.ai) {
        renderAiAnalysis(payload.report.ai, "成功");
      } else {
        setAiState(payload.report.ai_status || "未调用");
      }
    } else {
      resetAnalysisText();
    }
  } catch (error) {
    const message = document.createElement("p");
    message.className = "loading-row";
    message.textContent = `读取失败：${error.message}`;
    el.meterRows.replaceChildren(message);
  }
}


function renderRows() {
  el.meterRows.replaceChildren();
  state.rowElements.clear();
  state.rows.forEach((row) => {
    const node = el.template.content.firstElementChild.cloneNode(true);
    node.dataset.meterId = row.meter_id;
    node.querySelector(".meter-order").textContent = String(row.order_no).padStart(2, "0");
    node.querySelector(".meter-name").textContent = row.name;
    node.querySelector(".meter-category").textContent = row.required ? row.category : `${row.category} · 可留空`;
    node.querySelector(".ratio-plate").textContent = row.ratio_text;

    const previousInput = node.querySelector(".previous-input");
    const currentInput = node.querySelector(".current-input");
    const editButton = node.querySelector(".edit-previous");
    previousInput.value = row.start ?? "";
    currentInput.value = row.end ?? "";
    previousInput.readOnly = row.start !== null && row.start !== undefined;
    editButton.textContent = previousInput.readOnly ? "修正" : "首次补录";

    previousInput.addEventListener("input", () => {
      row.start = previousInput.value;
      state.saved = false;
      calculateClient();
      saveDraft();
    });

    editButton.addEventListener("click", () => {
      previousInput.readOnly = !previousInput.readOnly;
      editButton.textContent = previousInput.readOnly ? "修正" : "确认后锁定";
      if (!previousInput.readOnly) {
        previousInput.focus();
        previousInput.select();
      } else {
        row.start = previousInput.value;
        calculateClient();
      }
    });

    currentInput.addEventListener("input", () => {
      row.end = currentInput.value;
      state.saved = false;
      state.serverWarnings.delete(row.meter_id);
      calculateClient();
      saveDraft();
    });

    currentInput.addEventListener("keydown", (event) => {
      if (event.key !== "Enter") return;
      event.preventDefault();
      const inputs = [...document.querySelectorAll(".current-input")];
      const index = inputs.indexOf(currentInput);
      const next = inputs[index + 1];
      if (next) {
        next.focus();
        next.select();
      } else {
        el.saveButton.focus();
      }
    });

    state.rowElements.set(row.meter_id, node);
    el.meterRows.appendChild(node);
  });
}


function calculateClient() {
  const categories = new Map();
  const ranking = [];
  let totalUsage = null;
  let classifiedUsage = 0;
  let completed = 0;
  let ready = 0;
  let errors = 0;
  let firstError = null;

  state.rows.forEach((row) => {
    const node = state.rowElements.get(row.meter_id);
    const start = toNumber(row.start);
    const end = toNumber(row.end);
    let message = state.serverWarnings.get(row.meter_id) || "";
    let status = message ? "warning" : "";
    let difference = null;
    let usage = null;

    if (end === null) {
      if (!row.required) {
        ready += 1;
      } else {
        message = "请填写今日读数";
        status = "invalid";
        errors += 1;
      }
    } else if (start === null) {
      message = "首次使用请补充昨日读数";
      status = "invalid";
      errors += 1;
    } else if (end < start) {
      message = `今日读数不能小于昨日读数 ${formatNumber(start)}`;
      status = "invalid";
      errors += 1;
    } else {
      completed += 1;
      ready += 1;
      difference = end - start;
      usage = difference * Number(row.multiplier);
      if (!status) status = "completed";
      if (row.category === "总表") {
        totalUsage = usage;
      } else {
        categories.set(row.category, (categories.get(row.category) || 0) + usage);
        classifiedUsage += usage;
        ranking.push({ name: row.name, category: row.category, usage });
      }
    }

    row._difference = difference;
    row._usage = usage;
    row._error = status === "invalid";
    if (row._error && !firstError) firstError = node?.querySelector(".current-input");

    if (node) {
      node.classList.remove("completed", "invalid", "warning");
      if (status) node.classList.add(status);
      node.querySelector(".difference-value").textContent = formatNumber(difference);
      node.querySelector(".usage-value").textContent = formatNumber(usage);
      node.querySelector(".row-message").textContent = message;
    }
  });

  const totalRows = state.rows.length || 40;
  el.progressValue.textContent = `${completed} / ${totalRows}`;
  el.progressBar.style.width = `${Math.min(100, (completed / totalRows) * 100)}%`;
  el.totalUsage.textContent = formatNumber(totalUsage);
  el.classifiedUsage.textContent = formatNumber(classifiedUsage);
  el.errorCount.textContent = String(errors);

  const balance = totalUsage === null ? null : totalUsage - classifiedUsage;
  renderBalance(balance);
  renderCategoryBars(categories);
  renderTopMeters(ranking);
  updateDock({ completed, ready, totalRows, errors, firstError });
  updateSavedState();
  return { errors, completed, ready, totalRows, firstError };
}


function renderBalance(balance) {
  el.balanceValue.textContent = formatNumber(balance, balance === null ? "" : " kWh");
  el.balancePanel.classList.toggle("danger", balance !== null && balance < 0);
  if (balance === null) {
    el.balanceHint.textContent = "填完读数后自动核对。";
  } else if (balance < 0) {
    el.balanceHint.textContent = "分类合计超过总表，请检查输入。";
  } else {
    el.balanceHint.textContent = "差额代表未纳入本页分类的其他用电。";
  }
}


function renderCategoryBars(categories) {
  const items = [...categories.entries()]
    .filter(([, value]) => value > 0)
    .sort((a, b) => b[1] - a[1]);
  el.categoryBars.replaceChildren();
  if (!items.length) {
    el.categoryBars.className = "category-bars empty-state";
    el.categoryBars.textContent = "等待录入数据";
    return;
  }
  el.categoryBars.className = "category-bars";
  const max = items[0][1] || 1;
  items.forEach(([category, value]) => {
    const row = document.createElement("div");
    row.className = "category-row";
    const label = document.createElement("span");
    label.textContent = category;
    const track = document.createElement("span");
    track.className = "category-track";
    const fill = document.createElement("span");
    fill.style.width = `${Math.max(2, (value / max) * 100)}%`;
    track.appendChild(fill);
    const number = document.createElement("strong");
    number.className = "category-value";
    number.textContent = formatNumber(value);
    row.append(label, track, number);
    el.categoryBars.appendChild(row);
  });
}


function renderTopMeters(ranking) {
  const items = ranking.filter((item) => item.usage > 0).sort((a, b) => b.usage - a.usage).slice(0, 5);
  el.topMeters.replaceChildren();
  if (!items.length) {
    el.topMeters.className = "top-meters empty-state";
    const item = document.createElement("li");
    item.textContent = "保存后生成排行";
    el.topMeters.appendChild(item);
    return;
  }
  el.topMeters.className = "top-meters";
  items.forEach((item, index) => {
    const row = document.createElement("li");
    const rank = document.createElement("span");
    rank.className = "rank-number";
    rank.textContent = String(index + 1).padStart(2, "0");
    const name = document.createElement("span");
    name.textContent = item.name;
    const value = document.createElement("strong");
    value.className = "top-value";
    value.textContent = formatNumber(item.usage);
    row.append(rank, name, value);
    el.topMeters.appendChild(row);
  });
}


function updateDock({ completed, ready, totalRows, errors, firstError }) {
  el.saveButton.disabled = false;
  el.saveButton.dataset.firstError = firstError ? "yes" : "no";
  if (errors > 0) {
    el.dockIcon.textContent = "!";
    el.dockText.textContent = `还有 ${errors} 项未填写或有错误`;
  } else if (ready < totalRows) {
    el.dockIcon.textContent = String(totalRows - ready);
    el.dockText.textContent = `还差 ${totalRows - ready} 项，请继续填写`;
  } else {
    el.dockIcon.textContent = "✓";
    el.dockText.textContent = state.saved ? "数据已保存，可以导出或打印" : "读数完整，可以保存并生成分析";
  }
}


function updateSavedState() {
  el.saveState.textContent = state.saved ? "已保存" : "尚未保存";
  el.saveState.classList.toggle("saved", state.saved);
  el.exportButton.disabled = !state.saved;
  el.printButton.disabled = !state.saved;
}


function updateApiStatus() {
  if (STATIC_MODE) {
    el.apiStatusDot.classList.remove("connected");
    el.apiSettingsButton.textContent = "GitHub 试用版";
    el.apiSettingsButton.disabled = true;
    el.apiSettingsButton.title = "数据只保存在当前浏览器，DeepSeek将在服务器版启用";
    return;
  }
  el.apiStatusDot.classList.toggle("connected", state.apiConfigured);
  el.apiSettingsButton.title = state.apiConfigured ? "DeepSeek已配置" : "尚未配置DeepSeek API Key";
}


function staticExportCsv() {
  const rows = state.rows.map((row) => ({
    ...row,
    difference: row._difference,
    usage: row._usage,
  }));
  const summary = staticSummary(rows);
  const lines = [
    ["一分厂用电日报", state.date],
    ["序号", "计量点", "分类", "变比", "昨日读数", "今日读数", "差数", "用电量(kWh)"],
    ...rows.map((row) => [row.order_no, row.name, row.category, row.ratio_text, row.start, row.end ?? row.start, row.difference ?? 0, row.usage ?? 0]),
    [],
    ["分类汇总", "用电量(kWh)"],
    ...summary.categories.map((item) => [item.category, item.usage]),
    ["低压总表", summary.total_usage],
    ["分类合计", summary.classified_usage],
    ["未分类差额", summary.balance],
  ];
  const csv = "\ufeff" + lines.map((line) => line.map((cell) => {
    const text = String(cell ?? "");
    return `"${text.replaceAll('"', '""')}"`;
  }).join(",")).join("\r\n");
  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  link.download = `一分厂用电日报-${state.date}.csv`;
  document.body.appendChild(link);
  link.click();
  const objectUrl = link.href;
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
}


function setAiState(status) {
  el.aiState.className = "ai-state";
  if (status === "分析中") el.aiState.classList.add("running");
  if (status === "成功") el.aiState.classList.add("success");
  if (status === "失败" || status === "未配置") el.aiState.classList.add("failed");
  el.aiState.textContent = status;
}


function resetAnalysisText() {
  setAiState("等待保存");
  el.aiOverview.textContent = "系统先精确计算，DeepSeek再解释趋势和异常。";
  el.aiAnomalies.replaceChildren();
  el.aiConclusion.textContent = "";
}


function renderLocalAnalysis(analysis) {
  if (!analysis) return;
  el.aiOverview.textContent = analysis.overview || "本地规则分析已生成。";
  if (Array.isArray(analysis.top_meters)) {
    renderTopMeters(analysis.top_meters.map((item) => ({ ...item, usage: Number(item.usage || 0) })));
  }
}


function renderAiAnalysis(analysis, status = "成功") {
  setAiState(status);
  if (!analysis) return;
  el.aiOverview.textContent = analysis.overview || el.aiOverview.textContent;
  el.aiAnomalies.replaceChildren();
  const anomalies = Array.isArray(analysis.anomalies) ? analysis.anomalies : [];
  anomalies.slice(0, 5).forEach((item) => {
    const box = document.createElement("div");
    box.className = "ai-anomaly";
    const title = document.createElement("strong");
    title.textContent = item.meter || "需要复核";
    const reason = document.createElement("span");
    reason.textContent = item.reason || "";
    const action = document.createElement("span");
    action.textContent = item.action ? `建议：${item.action}` : "";
    box.append(title, reason, action);
    el.aiAnomalies.appendChild(box);
  });
  el.aiConclusion.textContent = analysis.conclusion || "";
}


async function saveAndAnalyze() {
  const client = calculateClient();
  if (client.errors > 0 || client.ready < client.totalRows) {
    client.firstError?.focus();
    client.firstError?.scrollIntoView({ behavior: "smooth", block: "center" });
    showToast("请先处理未填写或错误的读数");
    return;
  }

  el.saveButton.disabled = true;
  el.saveButton.textContent = "正在保存…";
  const rows = state.rows.map((row) => ({
    meter_id: row.meter_id,
    start: toNumber(row.start),
    end: toNumber(row.end),
  }));
  try {
    const saved = await request("/api/save", {
      method: "POST",
      body: JSON.stringify({ date: state.date, rows }),
    });
    state.saved = true;
    state.serverWarnings.clear();
    (saved.warnings || []).forEach((item) => state.serverWarnings.set(item.meter_id, item.message));
    localStorage.removeItem(draftKey());
    renderLocalAnalysis(saved.local_analysis);
    calculateClient();
    updateSavedState();
    showToast("数据已保存，本地分析表已生成");
    await runAiAnalysis();
  } catch (error) {
    if (error.payload?.errors) {
      state.serverWarnings.clear();
      error.payload.errors.forEach((item) => state.serverWarnings.set(item.meter_id, item.message));
      calculateClient();
    }
    showToast(error.message);
  } finally {
    el.saveButton.disabled = false;
    el.saveButton.textContent = "保存并生成分析";
  }
}


async function runAiAnalysis() {
  setAiState("分析中");
  try {
    const result = await request("/api/analyze", {
      method: "POST",
      body: JSON.stringify({ date: state.date }),
    });
    renderLocalAnalysis(result.local);
    if (result.status === "成功") {
      renderAiAnalysis(result.analysis, "成功");
      showToast("DeepSeek分析结论已生成");
    } else {
      setAiState(result.status);
      el.aiConclusion.textContent = result.message || "AI暂不可用，本地分析不受影响。";
    }
  } catch (error) {
    setAiState("失败");
    el.aiConclusion.textContent = `AI分析暂不可用：${error.message}`;
  }
}


el.readingDate.addEventListener("change", () => loadDate(el.readingDate.value));
el.saveButton.addEventListener("click", saveAndAnalyze);
el.exportButton.addEventListener("click", () => {
  if (STATIC_MODE) {
    staticExportCsv();
    return;
  }
  window.location.href = `/api/export?date=${encodeURIComponent(state.date)}`;
});
el.printButton.addEventListener("click", () => window.print());

el.apiSettingsButton.addEventListener("click", () => {
  el.apiKeyInput.value = "";
  el.apiDialog.showModal();
  window.setTimeout(() => el.apiKeyInput.focus(), 80);
});
el.closeApiDialog.addEventListener("click", () => el.apiDialog.close());
el.cancelApiDialog.addEventListener("click", () => el.apiDialog.close());

el.apiForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const apiKey = el.apiKeyInput.value.trim();
  if (!apiKey) return;
  el.saveApiKeyButton.disabled = true;
  el.saveApiKeyButton.textContent = "正在保存…";
  try {
    await request("/api/settings", {
      method: "POST",
      body: JSON.stringify({ api_key: apiKey }),
    });
    state.apiConfigured = true;
    updateApiStatus();
    el.apiDialog.close();
    showToast("DeepSeek API Key已保存在本机");
  } catch (error) {
    showToast(error.message);
  } finally {
    el.saveApiKeyButton.disabled = false;
    el.saveApiKeyButton.textContent = "保存到本机";
  }
});


el.readingDate.value = todayLocal();
loadDate(el.readingDate.value);
