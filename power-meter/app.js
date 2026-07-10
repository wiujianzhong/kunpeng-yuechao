"use strict";

const STATIC_MODE = location.hostname.endsWith("github.io") || new URLSearchParams(location.search).has("static");
const STATIC_STORAGE_KEY = "power-meter-pages-records-v2";
const TEST_STORAGE_KEY = "power-meter-pages-test-records-v1";
const BASELINE_DATE = "2026-07-10";
const EXCEPTION_LABELS = {
  normal: "正常",
  broken: "表坏/无显示",
  recovered: "表计恢复/更换",
  temporary_high: "临时加电",
  stopped: "停用/停电",
  other: "其他情况",
};
const state = {
  date: "",
  companyData: null,
  historyData: null,
  factoryId: "",
  testMode: false,
  rows: [],
  saved: false,
  apiConfigured: false,
  importMeta: null,
  importedTotals: new Map(),
  referenceDifferences: new Map(),
  serverWarnings: new Map(),
  rowElements: new Map(),
};

const el = {
  readingDate: document.querySelector("#readingDate"),
  testModeButton: document.querySelector("#testModeButton"),
  testBanner: document.querySelector("#testBanner"),
  exitTestModeButton: document.querySelector("#exitTestModeButton"),
  historyPanel: document.querySelector("#historyPanel"),
  historyStatus: document.querySelector("#historyStatus"),
  historyDetail: document.querySelector("#historyDetail"),
  historyProgressBar: document.querySelector("#historyProgressBar"),
  historyFileInput: document.querySelector("#historyFileInput"),
  historyImportButton: document.querySelector("#historyImportButton"),
  weeklyReportButton: document.querySelector("#weeklyReportButton"),
  monthlyReportButton: document.querySelector("#monthlyReportButton"),
  factoryTabs: document.querySelector("#factoryTabs"),
  factoryLedgerLabel: document.querySelector("#factoryLedgerLabel"),
  ledgerTitle: document.querySelector("#ledgerTitle"),
  analysisTitle: document.querySelector("#analysisTitle"),
  meterRows: document.querySelector("#meterRows"),
  template: document.querySelector("#meterRowTemplate"),
  progressValue: document.querySelector("#progressValue"),
  progressBar: document.querySelector("#progressBar"),
  totalUsage: document.querySelector("#totalUsage"),
  classifiedUsage: document.querySelector("#classifiedUsage"),
  companyTotalLabel: document.querySelector("#companyTotalLabel"),
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


function testRecords() {
  try {
    return JSON.parse(localStorage.getItem(TEST_STORAGE_KEY) || "{}");
  } catch (_) {
    return {};
  }
}


function selectedFactory() {
  return state.companyData?.factories?.find((factory) => factory.id === state.factoryId) || null;
}


function staticFactoryRecord(records, readingDate, factoryId = state.factoryId) {
  return records[readingDate]?.[factoryId] || null;
}


function testFactoryRecord(records, readingDate, factoryId = state.factoryId) {
  return records[readingDate]?.[factoryId] || null;
}


function historicalStart(readingDate, factoryId, meter) {
  const value = state.historyData?.baselines?.[readingDate]?.[factoryId]?.[meter.meter_id];
  if (value !== undefined) return value;
  if (readingDate > BASELINE_DATE) return meter.source_end ?? meter.seed ?? null;
  if (readingDate === BASELINE_DATE) return meter.seed ?? null;
  return null;
}


function referenceDifference(factoryId, meterId) {
  const imported = state.referenceDifferences.get(meterId);
  if (imported !== undefined) return imported;
  const dates = Object.keys(state.historyData?.baselines || {}).sort();
  if (dates.length < 2) return null;
  const earlier = toNumber(state.historyData.baselines[dates.at(-2)]?.[factoryId]?.[meterId]);
  const later = toNumber(state.historyData.baselines[dates.at(-1)]?.[factoryId]?.[meterId]);
  if (earlier === null || later === null || later <= earlier) return null;
  return later - earlier;
}


function anomalyWarning(row, difference) {
  const reference = referenceDifference(state.factoryId, row.meter_id);
  if (reference === null || difference === null) return "";
  if (difference > Math.max(reference * 3, reference + 20)) {
    return `差数 ${formatNumber(difference)} 明显高于参考日 ${formatNumber(reference)}，已保留；请核对是否临时加电`;
  }
  if (reference >= 5 && difference < reference * 0.2) {
    return `差数 ${formatNumber(difference)} 明显低于参考日 ${formatNumber(reference)}，已保留；请核对是否停用或停电`;
  }
  return "";
}


function staticCompanyTotal(readingDate) {
  const records = staticRecords();
  return (state.companyData?.factories || []).reduce((total, factory) => {
    const saved = staticFactoryRecord(records, readingDate, factory.id);
    if (saved?.rows) return total + Number(staticSummary(saved.rows).total_usage || 0);
    return total + Number(state.importedTotals.get(factory.id) || 0);
  }, 0);
}


function updateCompanyTotal() {
  if (!STATIC_MODE) return;
  el.companyTotalLabel.textContent = state.testMode ? "正式合计（测试不计入）" : "全公司已保存合计";
  el.classifiedUsage.textContent = formatNumber(staticCompanyTotal(state.date));
}


function updateModeUi() {
  document.body.classList.toggle("test-mode", state.testMode);
  el.testBanner.hidden = !state.testMode;
  el.testModeButton.textContent = state.testMode ? "正在测试" : "进入测试模式";
  el.testModeButton.setAttribute("aria-pressed", state.testMode ? "true" : "false");
  updateCompanyTotal();
}


async function setTestMode(enabled) {
  if (!STATIC_MODE) {
    showToast("测试模式目前用于GitHub试用版");
    return;
  }
  if (state.testMode === enabled) return;
  saveDraft();
  state.testMode = enabled;
  updateModeUi();
  await loadDate(state.date || el.readingDate.value);
  showToast(enabled ? "已进入测试模式，测试数据与正式记录隔离" : "已退出测试模式，恢复正式数据");
}


function shortDate(date) {
  const matched = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date || "");
  return matched ? `${Number(matched[2])}月${Number(matched[3])}日` : date;
}


function renderHistoryStatus() {
  const meta = state.importMeta;
  const ready = Boolean(meta);
  el.weeklyReportButton.disabled = !ready;
  el.monthlyReportButton.disabled = !ready;
  if (!meta) {
    el.historyStatus.textContent = "尚未导入原始 Excel";
    el.historyDetail.textContent = "首次使用导入一次，系统自动整理全部日期；文件不会上传。";
    el.historyProgressBar.style.width = "0";
    return;
  }
  el.historyStatus.textContent = `已整理 ${meta.dayCount} 天 · 有效数据到 ${shortDate(meta.completedThrough)}`;
  el.historyDetail.textContent = `${meta.fileName}｜${meta.meterCount} 个计量点｜仅保存在当前浏览器`;
  el.historyProgressBar.style.width = "100%";
  el.historyImportButton.textContent = "更新历史 Excel";
}


async function syncSavedRecordsToHistory() {
  if (!STATIC_MODE || !window.PowerMeterData?.saveRows) return;
  const records = staticRecords();
  for (const [date, factories] of Object.entries(records)) {
    for (const [factoryId, record] of Object.entries(factories || {})) {
      if (Array.isArray(record?.rows)) await window.PowerMeterData.saveRows(date, factoryId, record.rows, "manual");
    }
  }
}


async function importHistoryFile(file) {
  if (!file || !window.PowerMeterData?.importWorkbook) return;
  el.historyImportButton.disabled = true;
  el.weeklyReportButton.disabled = true;
  el.monthlyReportButton.disabled = true;
  el.historyImportButton.textContent = "正在整理…";
  el.historyStatus.textContent = "正在读取原始工作表";
  el.historyDetail.textContent = "请保持当前页面打开，数据只在本机处理。";
  try {
    await syncSavedRecordsToHistory();
    state.importMeta = await window.PowerMeterData.importWorkbook(file, state.companyData, (progress) => {
      el.historyStatus.textContent = `正在整理 ${progress.current} / ${progress.total} 张日表`;
      el.historyDetail.textContent = `当前日期 ${shortDate(progress.date)}｜${progress.percent}%`;
      el.historyProgressBar.style.width = `${progress.percent}%`;
    });
    renderHistoryStatus();
    await loadDate(state.date || el.readingDate.value);
    showToast(`历史数据导入完成：${state.importMeta.dayCount} 天，${state.importMeta.meterCount} 个计量点`);
  } catch (error) {
    renderHistoryStatus();
    showToast(`导入失败：${error.message}`);
  } finally {
    el.historyImportButton.disabled = false;
    el.historyImportButton.textContent = state.importMeta ? "更新历史 Excel" : "导入历史 Excel";
    el.historyFileInput.value = "";
  }
}


function dateAtUtc(value) {
  return new Date(`${value}T00:00:00Z`);
}


function dateText(date) {
  return date.toISOString().slice(0, 10);
}


function addDays(value, days) {
  const date = typeof value === "string" ? dateAtUtc(value) : new Date(value.getTime());
  date.setUTCDate(date.getUTCDate() + days);
  return date;
}


function periodBounds(type) {
  const selected = dateAtUtc(state.date || todayLocal());
  const completedThrough = state.importMeta?.completedThrough ? dateAtUtc(state.importMeta.completedThrough) : selected;
  if (type === "week") {
    const selectedThursday = addDays(selected, -((selected.getUTCDay() - 4 + 7) % 7));
    const completedThursday = addDays(completedThrough, -((completedThrough.getUTCDay() - 4 + 7) % 7));
    const end = selectedThursday < completedThursday ? selectedThursday : completedThursday;
    return { start: dateText(addDays(end, -6)), end: dateText(end), label: "周报" };
  }
  const start = new Date(Date.UTC(selected.getUTCFullYear(), selected.getUTCMonth(), 1));
  let end = selected < completedThrough ? selected : completedThrough;
  if (end < start) end = addDays(new Date(Date.UTC(selected.getUTCFullYear(), selected.getUTCMonth() + 1, 1)), -1);
  return { start: dateText(start), end: dateText(end), label: "月报" };
}


function datesBetween(startDate, endDate) {
  const dates = [];
  for (let current = dateAtUtc(startDate); current <= dateAtUtc(endDate); current = addDays(current, 1)) {
    dates.push(dateText(current));
  }
  return dates;
}


async function createPeriodReport(type) {
  if (!state.importMeta || !window.PowerMeterData || !window.PowerMeterXlsx?.downloadPeriod) {
    showToast("请先导入原始历史 Excel");
    return;
  }
  const bounds = periodBounds(type);
  if (bounds.end < bounds.start) {
    showToast("所选月份还没有可汇总的数据");
    return;
  }
  const records = (await window.PowerMeterData.getRange(bounds.start, bounds.end)).filter((record) => record.completed);
  if (!records.length) {
    showToast("这个时间段还没有已完成的数据");
    return;
  }

  const factories = new Map(state.companyData.factories.map((factory) => [factory.id, factory]));
  const daily = new Map(datesBetween(bounds.start, bounds.end).map((date) => [date, {
    date,
    totalUsage: 0,
    factories: Object.fromEntries(state.companyData.factories.map((factory) => [factory.id, 0])),
    completedFactories: 0,
  }]));
  const factoryTotals = new Map(state.companyData.factories.map((factory) => [factory.id, 0]));
  const factoryPeaks = new Map();
  const categories = new Map();
  const meterTotals = new Map();
  let warningCount = 0;

  records.forEach((record) => {
    const factory = factories.get(record.factoryId);
    if (!factory) return;
    const rows = window.PowerMeterData.expandRecord(record, factory);
    const day = daily.get(record.date);
    const usage = rows.reduce((sum, row) => sum + (toNumber(row.usage) || 0), 0);
    day.totalUsage += usage;
    day.factories[factory.id] = usage;
    day.completedFactories += 1;
    factoryTotals.set(factory.id, (factoryTotals.get(factory.id) || 0) + usage);
    const peak = factoryPeaks.get(factory.id);
    if (!peak || usage > peak.usage) factoryPeaks.set(factory.id, { date: record.date, usage });
    rows.forEach((row) => {
      const rowUsage = toNumber(row.usage);
      if (row.status_code && row.status_code !== "normal") warningCount += 1;
      if (rowUsage === null || rowUsage <= 0) return;
      categories.set(row.category, (categories.get(row.category) || 0) + rowUsage);
      const key = `${factory.id}|${row.meter_id}`;
      const current = meterTotals.get(key) || { name: row.name, factoryName: factory.name, category: row.category, usage: 0 };
      current.usage += rowUsage;
      meterTotals.set(key, current);
    });
  });

  const dailyRows = [...daily.values()];
  const daysWithData = dailyRows.filter((item) => item.completedFactories > 0).length;
  const totalUsage = dailyRows.reduce((sum, item) => sum + item.totalUsage, 0);
  const factorySummaries = state.companyData.factories.map((factory) => {
    const usage = factoryTotals.get(factory.id) || 0;
    const peak = factoryPeaks.get(factory.id) || { date: "—", usage: 0 };
    return {
      factoryId: factory.id,
      factoryName: factory.name,
      usage,
      share: totalUsage ? usage / totalUsage : 0,
      dailyAverage: daysWithData ? usage / daysWithData : 0,
      peakDate: peak.date,
      peakUsage: peak.usage,
    };
  });
  const categoryRows = [...categories.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([category, usage]) => ({ category, usage, share: totalUsage ? usage / totalUsage : 0 }));
  const topMeters = [...meterTotals.values()].sort((a, b) => b.usage - a.usage).slice(0, 20);

  window.PowerMeterXlsx.downloadPeriod({
    company: "雅新纺织有限公司",
    type,
    label: bounds.label,
    startDate: bounds.start,
    endDate: bounds.end,
    dailyRows,
    factories: state.companyData.factories.map((factory) => ({ id: factory.id, name: factory.name })),
    factorySummaries,
    categories: categoryRows,
    topMeters,
    totalUsage,
    daysWithData,
    warningCount,
    fileName: `雅新纺织-用电${bounds.label}-${bounds.start}至${bounds.end}.xlsx`,
  });
  showToast(`${bounds.label}已生成：${shortDate(bounds.start)}至${shortDate(bounds.end)}`);
}


function renderFactoryTabs() {
  if (!STATIC_MODE || !state.companyData) {
    el.factoryTabs.hidden = true;
    return;
  }
  el.factoryTabs.hidden = false;
  el.factoryTabs.replaceChildren();
  state.companyData.factories.forEach((factory) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "factory-tab";
    button.classList.toggle("active", factory.id === state.factoryId);
    button.setAttribute("aria-pressed", factory.id === state.factoryId ? "true" : "false");
    const name = document.createElement("span");
    name.textContent = factory.name;
    const count = document.createElement("small");
    count.textContent = `${factory.meters.length} 个计量点`;
    button.append(name, count);
    button.addEventListener("click", async () => {
      if (factory.id === state.factoryId) return;
      saveDraft();
      state.factoryId = factory.id;
      renderFactoryTabs();
      await loadDate(state.date || el.readingDate.value);
      window.scrollTo({ top: el.factoryTabs.offsetTop - 12, behavior: "smooth" });
    });
    el.factoryTabs.appendChild(button);
  });
}


function updateFactoryHeading() {
  const factory = selectedFactory();
  if (!factory) return;
  el.factoryLedgerLabel.textContent = `${factory.name} · 原表顺序 01—${factory.meters.length}`;
  el.ledgerTitle.textContent = `${factory.name}今日读数`;
  el.analysisTitle.textContent = `${factory.name}分析表`;
}


async function staticBaseRows(readingDate, factoryId = state.factoryId) {
  const records = staticRecords();
  const saved = staticFactoryRecord(records, readingDate, factoryId);
  if (saved?.rows) return saved.rows.map((row) => ({ ...row }));
  const factory = state.companyData?.factories?.find((item) => item.id === factoryId);
  if (!factory) throw new Error("未找到分厂基础数据");
  const imported = await window.PowerMeterData?.getDay(readingDate, factoryId);
  if (imported) return window.PowerMeterData.expandRecord(imported, factory);
  const previousDate = Object.keys(records)
    .filter((item) => item < readingDate && staticFactoryRecord(records, item, factoryId)?.rows)
    .sort()
    .at(-1);
  const previousRows = previousDate ? staticFactoryRecord(records, previousDate, factoryId)?.rows || [] : [];
  const importedPrevious = previousRows.length ? null : await window.PowerMeterData?.getLatestBefore(readingDate, factoryId);
  const importedRows = importedPrevious ? window.PowerMeterData.expandRecord(importedPrevious, factory) : [];
  const sourceRows = previousRows.length ? previousRows : importedRows;
  const previous = new Map(sourceRows.map((row) => [row.meter_id, toNumber(row.end) ?? toNumber(row.start)]));
  return factory.meters.map((meter) => {
    const { meter_id, order_no, name, category, panel, ratio_text, multiplier, seed, required } = meter;
    const start = previous.has(meter_id) ? previous.get(meter_id) : historicalStart(readingDate, factoryId, meter);
    return {
      meter_id, order_no, name, category, panel, ratio_text, multiplier, required,
      expected_start: start, start, end: null, difference: null, usage: null, warning: "", status_code: "normal",
    };
  });
}


async function testBaseRows(readingDate, factoryId = state.factoryId) {
  const records = testRecords();
  const saved = testFactoryRecord(records, readingDate, factoryId);
  if (saved?.rows) return saved.rows.map((row) => ({ ...row }));
  return (await staticBaseRows(readingDate, factoryId)).map((row) => ({
    ...row,
    end: null,
    difference: null,
    usage: null,
    warning: "",
    status_code: "normal",
  }));
}


function staticSummary(rows) {
  const categories = new Map();
  let totalUsage = 0;
  rows.forEach((row) => {
    const usage = toNumber(row.usage);
    if (usage === null) return;
    categories.set(row.category, (categories.get(row.category) || 0) + usage);
    totalUsage += usage;
  });
  return {
    total_usage: totalUsage,
    classified_usage: totalUsage,
    balance: 0,
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
      : `${state.testMode ? "测试预览：" : ""}${selectedFactory()?.name || "当前分厂"}本日计量点合计 ${formatNumber(total)} kWh，数据只保存在当前浏览器。`,
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
    const imported = state.testMode ? null : await window.PowerMeterData?.getDay(readingDate, state.factoryId);
    const saved = state.testMode
      ? testFactoryRecord(testRecords(), readingDate)
      : staticFactoryRecord(records, readingDate);
    return {
      date: readingDate,
      rows: state.testMode ? await testBaseRows(readingDate) : await staticBaseRows(readingDate),
      warnings: [],
      report: saved?.report || null,
      saved: Boolean(saved || imported?.completed),
      api_configured: false,
      static_mode: true,
    };
  }
  const payload = JSON.parse(options.body || "{}");
  if (parsed.pathname.endsWith("/api/save")) {
    const submitted = new Map((payload.rows || []).map((row) => [row.meter_id, row]));
    const errors = [];
    const warnings = [];
    const rows = (await staticBaseRows(payload.date)).map((row) => {
      const item = submitted.get(row.meter_id) || {};
      const statusCode = EXCEPTION_LABELS[item.status_code] ? item.status_code : "normal";
      const hasException = statusCode !== "normal";
      const start = toNumber(item.start);
      let end = toNumber(item.end);
      if (end === null && !row.required && !hasException) end = start;
      if (end === null && row.required && !hasException) errors.push({ meter_id: row.meter_id, message: "请填写今日读数或选择现场情况" });
      if (start === null && end !== null && !hasException) errors.push({ meter_id: row.meter_id, message: "请补充昨日读数" });
      if (start !== null && end !== null && end < start && !hasException) errors.push({ meter_id: row.meter_id, message: "今日读数不能小于昨日读数；如属实请选择现场情况" });
      const difference = start !== null && end !== null && end >= start ? end - start : null;
      const usage = difference === null ? null : difference * row.multiplier;
      const warning = hasException
        ? `现场情况：${EXCEPTION_LABELS[statusCode]}`
        : anomalyWarning(row, difference);
      if (warning) warnings.push({ meter_id: row.meter_id, message: warning });
      return { ...row, start, end, difference, usage, warning, status_code: statusCode };
    });
    if (errors.length) {
      const error = new Error("请先处理错误读数");
      error.payload = { errors };
      throw error;
    }
    const calculation = { date: payload.date, rows, summary: staticSummary(rows), errors, warnings, valid: true };
    const local = staticLocalAnalysis(calculation);
    records[payload.date] ||= {};
    records[payload.date][state.factoryId] = { rows, report: { local, ai: null, ai_status: "GitHub试用版" } };
    localStorage.setItem(STATIC_STORAGE_KEY, JSON.stringify(records));
    if (window.PowerMeterData?.saveRows) {
      await window.PowerMeterData.saveRows(payload.date, state.factoryId, rows, "manual");
      state.importedTotals.set(state.factoryId, Number(calculation.summary.total_usage || 0));
    }
    return { ...calculation, local_analysis: local };
  }
  if (parsed.pathname.endsWith("/api/analyze")) {
    const saved = staticFactoryRecord(records, payload.date);
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
  const mode = state.testMode ? "test" : "formal";
  return `power-meter-draft-${mode}-${state.factoryId || "local"}-${state.date}`;
}


function saveDraft() {
  if (!state.date || state.saved) return;
  const rows = state.rows.map((row) => ({
    meter_id: row.meter_id,
    start: row.start,
    end: row.end,
    status_code: row.status_code || "normal",
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
  if (STATIC_MODE && window.PowerMeterData) {
    const importedForDate = await window.PowerMeterData.getDate(readingDate);
    state.importedTotals = new Map(importedForDate.filter((item) => item.completed).map((item) => [item.factoryId, item.totalUsage]));
    const previous = await window.PowerMeterData.getLatestBefore(readingDate, state.factoryId);
    const factory = selectedFactory();
    const previousRows = previous && factory ? window.PowerMeterData.expandRecord(previous, factory) : [];
    state.referenceDifferences = new Map(previousRows
      .filter((row) => toNumber(row.difference) !== null && Number(row.difference) > 0)
      .map((row) => [row.meter_id, Number(row.difference)]));
  }
  updateFactoryHeading();
  updateCompanyTotal();
  el.meterRows.innerHTML = '<p class="loading-row">正在读取昨日数据…</p>';
  try {
    const payload = await request(`/api/bootstrap?date=${encodeURIComponent(readingDate)}`);
    state.rows = mergeDraft(payload.rows);
    state.saved = Boolean(payload.saved ?? payload.rows.some((row) => row.end !== null && row.end !== ""));
    state.apiConfigured = payload.api_configured;
    (payload.warnings || []).forEach((item) => state.serverWarnings.set(item.meter_id, item.message));
    renderRows();
    updateApiStatus();
    updateSavedState();
    calculateClient();
    updateCompanyTotal();
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
    const locationText = [row.category, row.panel].filter(Boolean).join(" · ");
    node.querySelector(".meter-category").textContent = row.required ? locationText : `${locationText} · 备用可留空`;
    node.querySelector(".ratio-plate").textContent = row.ratio_text;

    const previousInput = node.querySelector(".previous-input");
    const currentInput = node.querySelector(".current-input");
    const editButton = node.querySelector(".edit-previous");
    const exceptionSelect = node.querySelector(".exception-select");
    row.status_code = EXCEPTION_LABELS[row.status_code] ? row.status_code : "normal";
    exceptionSelect.value = row.status_code;
    node.classList.toggle("exception", row.status_code !== "normal");
    previousInput.value = row.start ?? "";
    currentInput.value = row.end ?? "";
    previousInput.readOnly = !state.testMode && row.start !== null && row.start !== undefined;
    editButton.hidden = state.testMode;
    editButton.textContent = previousInput.readOnly ? "修正" : "首次补录";

    exceptionSelect.addEventListener("change", () => {
      row.status_code = exceptionSelect.value;
      node.classList.toggle("exception", row.status_code !== "normal");
      state.saved = false;
      resetAnalysisText();
      calculateClient();
      saveDraft();
    });

    previousInput.addEventListener("input", () => {
      row.start = previousInput.value;
      state.saved = false;
      resetAnalysisText();
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
      resetAnalysisText();
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
    const statusCode = EXCEPTION_LABELS[row.status_code] ? row.status_code : "normal";
    const hasException = statusCode !== "normal";
    const exceptionLabel = EXCEPTION_LABELS[statusCode];
    let message = state.serverWarnings.get(row.meter_id) || "";
    let status = message ? "warning" : "";
    let difference = null;
    let usage = null;

    if (end === null) {
      if (hasException) {
        completed += 1;
        ready += 1;
        message = `已记录：${exceptionLabel}，本日不计入自动合计`;
        status = "warning";
      } else if (state.testMode) {
        message = "";
        status = "";
      } else if (!row.required) {
        ready += 1;
      } else {
        message = "请填写今日读数，或选择实际现场情况";
        status = "invalid";
        errors += 1;
      }
    } else if (start === null) {
      if (hasException) {
        completed += 1;
        ready += 1;
        message = `已记录：${exceptionLabel}；缺少起点，本日不计入自动合计`;
        status = "warning";
      } else {
        message = "首次使用请补充昨日读数";
        status = "invalid";
        errors += 1;
      }
    } else if (end < start) {
      if (hasException) {
        completed += 1;
        ready += 1;
        message = `已记录：${exceptionLabel}；读数倒退，本日不计入自动合计`;
        status = "warning";
      } else {
        message = `今日读数不能小于昨日读数 ${formatNumber(start)}；如属实请选择现场情况`;
        status = "invalid";
        errors += 1;
      }
    } else {
      completed += 1;
      ready += 1;
      difference = end - start;
      usage = difference * Number(row.multiplier);
      if (hasException) {
        message = `已记录：${exceptionLabel}，读数照常计算`;
        status = "warning";
      } else {
        const anomaly = anomalyWarning(row, difference);
        if (anomaly) {
          message = anomaly;
          status = "warning";
        } else if (!status) {
          status = "completed";
        }
      }
      if (STATIC_MODE) {
        totalUsage = (totalUsage || 0) + usage;
        categories.set(row.category, (categories.get(row.category) || 0) + usage);
        classifiedUsage += usage;
        ranking.push({ name: row.name, category: row.category, usage });
      } else if (row.category === "总表") {
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
  el.classifiedUsage.textContent = formatNumber(STATIC_MODE ? staticCompanyTotal(state.date) : classifiedUsage);
  el.errorCount.textContent = String(errors);

  const balance = totalUsage === null ? null : totalUsage - classifiedUsage;
  renderBalance(STATIC_MODE ? totalUsage : balance);
  renderCategoryBars(categories);
  renderTopMeters(ranking);
  updateDock({ completed, ready, totalRows, errors, firstError });
  updateSavedState();
  return { errors, completed, ready, totalRows, firstError };
}


function renderBalance(balance) {
  el.balanceValue.textContent = formatNumber(balance, balance === null ? "" : " kWh");
  if (STATIC_MODE) {
    el.balancePanel.classList.remove("danger");
    if (state.testMode) {
      el.balanceHint.textContent = balance === null ? "填写任意几项即可生成测试汇总。" : "测试合计不计入正式记录。";
    } else {
      el.balanceHint.textContent = balance === null ? "录入后自动按原表分区汇总。" : "已按当前分厂原表分类自动汇总。";
    }
    return;
  }
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
  el.saveButton.textContent = state.testMode ? "生成测试分析" : "保存并生成分析";
  if (state.testMode) {
    if (errors > 0) {
      el.dockIcon.textContent = "!";
      el.dockText.textContent = `测试数据还有 ${errors} 项需要处理`;
    } else if (completed === 0) {
      el.dockIcon.textContent = "T";
      el.dockText.textContent = "测试模式：随便填写1项即可生成分析和导出";
    } else {
      el.dockIcon.textContent = "T";
      el.dockText.textContent = state.saved
        ? `测试分析已生成，共 ${completed} 项，不计入正式数据`
        : `已填写 ${completed} 项，可以生成测试分析`;
    }
    return;
  }
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
  el.saveState.textContent = state.testMode
    ? (state.saved ? "测试分析已生成" : "测试未生成")
    : (state.saved ? "已保存" : "尚未保存");
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
    el.exportButton.textContent = "导出美化 Excel";
    return;
  }
  el.apiStatusDot.classList.toggle("connected", state.apiConfigured);
  el.apiSettingsButton.title = state.apiConfigured ? "DeepSeek已配置" : "尚未配置DeepSeek API Key";
  el.exportButton.textContent = "导出日报 CSV";
}


function exportStyledWorkbook() {
  const factoryName = selectedFactory()?.name || "分厂";
  const allRows = state.rows.map((row) => {
    const statusCode = EXCEPTION_LABELS[row.status_code] ? row.status_code : "normal";
    const start = toNumber(row.start);
    const end = toNumber(row.end);
    let note = state.serverWarnings.get(row.meter_id) || "";
    if (statusCode !== "normal") {
      if (end === null) note = `现场情况：${EXCEPTION_LABELS[statusCode]}；今日无可靠读数，本项不自动计入合计`;
      else if (start === null) note = `现场情况：${EXCEPTION_LABELS[statusCode]}；缺少起点，本项不自动计入合计`;
      else if (end < start) note = `现场情况：${EXCEPTION_LABELS[statusCode]}；读数倒退，本项不自动计入合计`;
      else note = `现场情况：${EXCEPTION_LABELS[statusCode]}；读数照常计算`;
    } else if (!note) {
      note = anomalyWarning(row, row._difference);
    }
    return {
      meterId: row.meter_id,
      orderNo: row.order_no,
      name: row.name,
      category: row.category,
      ratioText: row.ratio_text,
      multiplier: Number(row.multiplier),
      start,
      end,
      difference: row._difference,
      usage: row._usage,
      statusCode,
      statusLabel: EXCEPTION_LABELS[statusCode],
      note,
    };
  });
  const rows = state.testMode
    ? allRows.filter((row) => row.end !== null || row.statusCode !== "normal")
    : allRows;
  const summary = staticSummary(rows);
  const totalUsage = Number(summary.total_usage || 0);
  const categories = summary.categories.map((item) => ({
    category: item.category,
    usage: Number(item.usage || 0),
    share: totalUsage > 0 ? Number(item.usage || 0) / totalUsage : 0,
  }));
  const topMeters = rows
    .filter((row) => toNumber(row.usage) !== null && Number(row.usage) > 0)
    .sort((a, b) => Number(b.usage) - Number(a.usage))
    .slice(0, 10);
  const warnings = rows.filter((row) => row.note).map((row) => ({
    name: row.name,
    statusLabel: row.statusLabel,
    note: row.note,
  }));
  const fileType = state.testMode ? "用电测试预览" : "用电日报";
  if (!window.PowerMeterXlsx?.download) {
    showToast("Excel导出组件加载失败，请刷新页面重试");
    return;
  }
  window.PowerMeterXlsx.download({
    company: "雅新纺织有限公司",
    testMode: state.testMode,
    date: state.date,
    factoryName,
    rows,
    categories,
    topMeters,
    warnings,
    totalUsage,
    calculatedCount: rows.filter((row) => toNumber(row.usage) !== null).length,
    companyTotal: staticCompanyTotal(state.date),
    fileName: `雅新纺织-${factoryName}${fileType}-${state.date}.xlsx`,
  });
}


function setAiState(status) {
  el.aiState.className = "ai-state";
  if (status === "分析中") el.aiState.classList.add("running");
  if (status === "成功") el.aiState.classList.add("success");
  if (status === "失败" || status === "未配置") el.aiState.classList.add("failed");
  el.aiState.textContent = status;
}


function resetAnalysisText() {
  if (state.testMode) {
    setAiState("测试模式");
    el.aiOverview.textContent = "填写任意几项即可生成测试分析，未填写项目不会报错。";
    el.aiAnomalies.replaceChildren();
    el.aiConclusion.textContent = "测试数据只保存在当前浏览器，不计入正式记录和公司合计。";
    return;
  }
  setAiState("等待保存");
  el.aiOverview.textContent = "系统先精确计算，DeepSeek再解释趋势和异常。";
  el.aiAnomalies.replaceChildren();
  el.aiConclusion.textContent = "";
}


async function saveTestAnalysis() {
  const client = calculateClient();
  if (client.errors > 0 || client.completed === 0) {
    client.firstError?.focus();
    client.firstError?.scrollIntoView({ behavior: "smooth", block: "center" });
    showToast(client.completed === 0 ? "测试模式至少填写1项，或选择1项现场情况" : "请先处理已填写项目中的错误");
    return;
  }

  el.saveButton.disabled = true;
  el.saveButton.textContent = "正在生成…";
  try {
    const warnings = [];
    const rows = state.rows.map((row) => {
      const statusCode = EXCEPTION_LABELS[row.status_code] ? row.status_code : "normal";
      const warning = statusCode !== "normal"
        ? `现场情况：${EXCEPTION_LABELS[statusCode]}`
        : anomalyWarning(row, row._difference);
      if (warning) warnings.push({ meter_id: row.meter_id, message: warning });
      return {
        ...row,
        start: toNumber(row.start),
        end: toNumber(row.end),
        difference: row._difference,
        usage: row._usage,
        warning,
        status_code: statusCode,
      };
    });
    const calculation = {
      date: state.date,
      rows,
      summary: staticSummary(rows),
      errors: [],
      warnings,
      valid: true,
    };
    const local = staticLocalAnalysis(calculation);
    const records = testRecords();
    records[state.date] ||= {};
    records[state.date][state.factoryId] = {
      rows,
      report: { local, ai: null, ai_status: "测试模式" },
    };
    localStorage.setItem(TEST_STORAGE_KEY, JSON.stringify(records));
    localStorage.removeItem(draftKey());
    state.saved = true;
    renderLocalAnalysis(local);
    setAiState("测试模式");
    el.aiConclusion.textContent = "测试数据只用于预览，不计入正式记录和公司合计。";
    calculateClient();
    updateSavedState();
    showToast("测试分析已生成，可以导出预览");
  } finally {
    el.saveButton.disabled = false;
    el.saveButton.textContent = "生成测试分析";
  }
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
  if (state.testMode) {
    await saveTestAnalysis();
    return;
  }
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
    status_code: row.status_code || "normal",
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
    el.saveButton.textContent = state.testMode ? "生成测试分析" : "保存并生成分析";
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
el.testModeButton.addEventListener("click", () => setTestMode(!state.testMode));
el.exitTestModeButton.addEventListener("click", () => setTestMode(false));
el.historyImportButton.addEventListener("click", () => el.historyFileInput.click());
el.historyFileInput.addEventListener("change", () => importHistoryFile(el.historyFileInput.files?.[0]));
el.weeklyReportButton.addEventListener("click", () => createPeriodReport("week"));
el.monthlyReportButton.addEventListener("click", () => createPeriodReport("month"));
el.saveButton.addEventListener("click", saveAndAnalyze);
el.exportButton.addEventListener("click", () => {
  if (STATIC_MODE) {
    exportStyledWorkbook();
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


async function initialize() {
  el.readingDate.value = todayLocal();
  if (STATIC_MODE) {
    const [meterResponse, historyResponse] = await Promise.all([
      fetch("meters.json", { cache: "no-store" }),
      fetch("history.json", { cache: "no-store" }),
    ]);
    if (!meterResponse.ok) throw new Error("五分厂基础数据加载失败");
    if (!historyResponse.ok) throw new Error("历史起点数据加载失败");
    state.companyData = await meterResponse.json();
    state.historyData = await historyResponse.json();
    state.importMeta = await window.PowerMeterData?.getMeta().catch(() => null) || null;
    await syncSavedRecordsToHistory();
    state.factoryId = state.companyData.factories?.[0]?.id || "";
    renderFactoryTabs();
    updateModeUi();
    renderHistoryStatus();
  } else {
    el.factoryTabs.hidden = true;
    el.historyPanel.hidden = true;
    el.testModeButton.hidden = true;
    el.testBanner.hidden = true;
  }
  await loadDate(el.readingDate.value);
}


initialize().catch((error) => {
  el.meterRows.innerHTML = `<p class="loading-row">启动失败：${error.message}</p>`;
  showToast(error.message);
});
