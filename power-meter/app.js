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
  referenceData: null,
  importedTotals: new Map(),
  referenceDifferences: new Map(),
  serverWarnings: new Map(),
  rowElements: new Map(),
  reportOptionsReady: false,
  reportFactorySignature: "",
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
  masterDownloadButton: document.querySelector("#masterDownloadButton"),
  reportCenter: document.querySelector("#reportCenter"),
  reportType: document.querySelector("#reportType"),
  reportReferenceField: document.querySelector("#reportReferenceField"),
  reportReferenceDate: document.querySelector("#reportReferenceDate"),
  reportStartField: document.querySelector("#reportStartField"),
  reportStartDate: document.querySelector("#reportStartDate"),
  reportEndField: document.querySelector("#reportEndField"),
  reportEndDate: document.querySelector("#reportEndDate"),
  reportPeriodPreview: document.querySelector("#reportPeriodPreview"),
  reportModes: [...document.querySelectorAll('input[name="reportMode"]')],
  reportFilterGrid: document.querySelector("#reportFilterGrid"),
  reportProcessFieldset: document.querySelector("#reportProcessFieldset"),
  reportRoomFieldset: document.querySelector("#reportRoomFieldset"),
  reportFactories: document.querySelector("#reportFactories"),
  reportProcesses: document.querySelector("#reportProcesses"),
  reportRooms: document.querySelector("#reportRooms"),
  reportSelectionSummary: document.querySelector("#reportSelectionSummary"),
  reportBasisHint: document.querySelector("#reportBasisHint"),
  weeklyHistoryButton: document.querySelector("#weeklyHistoryButton"),
  generateReportButton: document.querySelector("#generateReportButton"),
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
  const ready = Boolean(meta?.schemaVersion >= 7);
  el.masterDownloadButton.disabled = !ready;
  el.weeklyHistoryButton.disabled = !ready;
  el.generateReportButton.disabled = !ready;
  if (!meta) {
    el.historyStatus.textContent = "尚未导入原始 Excel";
    el.historyDetail.textContent = "请导入基础数据、公摊、路灯、办公楼清餐；周报月报仅用于对账。";
    el.historyProgressBar.style.width = "0";
    return;
  }
  if (!ready) {
    el.historyStatus.textContent = "历史数据需要升级一次";
    el.historyDetail.textContent = "请重新导入基础数据和公摊表，系统会升级完整周报月报口径。";
    el.historyProgressBar.style.width = "0";
    el.historyImportButton.textContent = "重新导入升级";
    return;
  }
  const weekCount = state.referenceData?.weekly?.length || 0;
  const monthCount = Object.keys(state.referenceData?.monthly || {}).length;
  const publicDays = Object.keys(state.referenceData?.sources?.publicDaily || {}).length;
  el.historyStatus.textContent = `已整理 ${meta.dayCount} 天 · 有效数据到 ${shortDate(meta.completedThrough)}`;
  el.historyDetail.textContent = `${meta.fileName}｜${publicDays}天公摊｜${weekCount}周对账｜${monthCount}个月报对账｜仅保存在当前浏览器`;
  el.historyProgressBar.style.width = "100%";
  el.historyImportButton.textContent = "更新底层数据";
}


async function syncSavedRecordsToHistory() {
  if (!STATIC_MODE || !window.PowerMeterData?.saveRows) return;
  const records = staticRecords();
  for (const [date, factories] of Object.entries(records)) {
    for (const [factoryId, record] of Object.entries(factories || {})) {
      if (Array.isArray(record?.rows)) await window.PowerMeterData.saveRows(date, factoryId, record.rows, "manual");
    }
  }
  state.importMeta = await window.PowerMeterData.getMeta().catch(() => state.importMeta) || state.importMeta;
}


async function importHistoryFiles(files) {
  if (!files?.length || !window.PowerMeterData?.importFiles) return;
  el.historyImportButton.disabled = true;
  el.masterDownloadButton.disabled = true;
  el.weeklyHistoryButton.disabled = true;
  el.generateReportButton.disabled = true;
  el.historyImportButton.textContent = "正在整理…";
  el.historyStatus.textContent = "正在读取原始工作表";
  el.historyDetail.textContent = "请保持当前页面打开，数据只在本机处理。";
  try {
    await syncSavedRecordsToHistory();
    const result = await window.PowerMeterData.importFiles(files, state.companyData, (progress) => {
      if (progress.phase === "daily") {
        el.historyStatus.textContent = `正在整理 ${progress.current} / ${progress.total} 张日表`;
        el.historyDetail.textContent = `${progress.fileName}｜当前日期 ${shortDate(progress.date)}｜${progress.percent}%`;
        el.historyProgressBar.style.width = `${progress.percent}%`;
        return;
      }
      el.historyStatus.textContent = `正在识别第 ${progress.fileIndex} / ${progress.fileTotal} 个文件`;
      el.historyDetail.textContent = progress.fileName;
    });
    state.importMeta = result.meta || state.importMeta;
    state.referenceData = result.referenceData || state.referenceData;
    renderHistoryStatus();
    await loadDate(state.date || el.readingDate.value);
    showToast(`底层数据导入完成：${result.imported.join("；")}`);
  } catch (error) {
    renderHistoryStatus();
    showToast(`导入失败：${error.message}`);
  } finally {
    el.historyImportButton.disabled = false;
    el.historyImportButton.textContent = state.importMeta ? "更新底层数据" : "导入底层数据";
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

function previousMonthKey(monthKey) {
  const [year, month] = monthKey.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 2, 1));
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
}

function sourceClosingDate(monthKey) {
  const sources = state.referenceData?.sources;
  return sources?.publicMonthly?.[monthKey]?.closingDate
    || sources?.roadMonthly?.[monthKey]?.closingDate
    || sources?.facilitiesMonthly?.[monthKey]?.closingDate
    || null;
}


function reportBounds(type = el.reportType.value) {
  const referenceText = el.reportReferenceDate.value || state.date || todayLocal();
  const reference = dateAtUtc(referenceText);
  const completedThrough = state.importMeta?.completedThrough ? dateAtUtc(state.importMeta.completedThrough) : reference;
  if (type === "day") return { start: referenceText, end: referenceText, label: "日报" };
  if (type === "week") {
    const candidateThursday = addDays(reference, (4 - reference.getUTCDay() + 7) % 7);
    const completedThursday = addDays(completedThrough, -((completedThrough.getUTCDay() - 4 + 7) % 7));
    const end = candidateThursday < completedThursday ? candidateThursday : completedThursday;
    return { start: dateText(addDays(end, -6)), end: dateText(end), label: "周报" };
  }
  if (type === "month") {
    const monthKey = referenceText.slice(0, 7);
    const closingDate = sourceClosingDate(monthKey);
    const previousClosingDate = sourceClosingDate(previousMonthKey(monthKey));
    const naturalStart = new Date(Date.UTC(reference.getUTCFullYear(), reference.getUTCMonth(), 1));
    const naturalEnd = addDays(new Date(Date.UTC(reference.getUTCFullYear(), reference.getUTCMonth() + 1, 1)), -1);
    const start = previousClosingDate ? addDays(previousClosingDate, 1) : naturalStart;
    const plannedEnd = closingDate ? dateAtUtc(closingDate) : naturalEnd;
    const end = completedThrough >= start && completedThrough < plannedEnd ? completedThrough : plannedEnd;
    return { start: dateText(start), end: dateText(end), label: "月报", monthKey, closingDate: dateText(plannedEnd) };
  }
  return {
    start: el.reportStartDate.value || referenceText,
    end: el.reportEndDate.value || referenceText,
    label: "自定义报表",
  };
}


function datesBetween(startDate, endDate) {
  const dates = [];
  for (let current = dateAtUtc(startDate); current <= dateAtUtc(endDate); current = addDays(current, 1)) {
    dates.push(dateText(current));
  }
  return dates;
}

async function buildWeeklyHistoryReport() {
  const records = (await window.PowerMeterData.getRange(state.importMeta.firstDate, state.importMeta.completedThrough))
    .filter((record) => record.completed);
  const { units, weeks } = window.PowerMeterData.buildWeeklyHistory(records, state.importMeta, state.referenceData);
  return {
    company: "雅新纺织有限公司",
    throughDate: state.importMeta.completedThrough,
    units,
    weeks,
    totalWeeks: weeks.length,
    fileName: `雅新纺织-用电周报历史总簿-截至${state.importMeta.completedThrough}.xlsx`,
  };
}

async function downloadWeeklyHistoryWorkbook() {
  if (state.importMeta?.schemaVersion < 7 || !window.PowerMeterXlsx?.downloadWeeklyHistory) {
    showToast("请重新导入基础数据和公摊表，升级周报总簿口径");
    return;
  }
  el.weeklyHistoryButton.disabled = true;
  el.weeklyHistoryButton.textContent = "正在整理全部周报…";
  await new Promise((resolve) => requestAnimationFrame(resolve));
  try {
    const report = await buildWeeklyHistoryReport();
    if (!report.weeks.length) throw new Error("没有找到完整的周五至周四数据周期");
    await window.PowerMeterXlsx.downloadWeeklyHistory(report);
    showToast(`周报历史总簿已生成，共 ${report.totalWeeks} 周`);
  } catch (error) {
    showToast(`周报总簿生成失败：${error.message}`);
  } finally {
    el.weeklyHistoryButton.disabled = false;
    el.weeklyHistoryButton.textContent = "下载周报历史总簿";
  }
}


function checkedFilter(container) {
  const inputs = [...container.querySelectorAll('input[type="checkbox"]')];
  if (!inputs.length) return new Set();
  const selected = inputs.filter((input) => input.checked).map((input) => input.value);
  return selected.length === inputs.length ? null : new Set(selected);
}

function selectedFilterText(container, allText) {
  const inputs = [...container.querySelectorAll('input[type="checkbox"]')];
  if (!inputs.length) return "无可选项";
  const selected = inputs.filter((input) => input.checked).map((input) => input.value);
  if (selected.length === inputs.length) return allText;
  if (!selected.length) return "未选择";
  return selected.length <= 3 ? selected.join("、") : `${selected.slice(0, 2).join("、")}等${selected.length}项`;
}

function renderFilterChips(container, values) {
  container.replaceChildren();
  const tools = document.createElement("div");
  tools.className = "filter-tools";
  [
    ["全选", true],
    ["清空", false],
  ].forEach(([labelText, checked]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = labelText;
    button.addEventListener("click", () => {
      container.querySelectorAll('input[type="checkbox"]').forEach((input) => { input.checked = checked; });
      refreshReportUi();
    });
    tools.appendChild(button);
  });
  container.appendChild(tools);
  values.forEach((value) => {
    const label = document.createElement("label");
    label.className = "filter-chip";
    const input = document.createElement("input");
    input.type = "checkbox";
    input.value = value;
    input.checked = true;
    const text = document.createElement("span");
    text.textContent = value;
    label.append(input, text);
    input.addEventListener("change", refreshReportUi);
    container.appendChild(label);
  });
}

function initializeReportOptions() {
  const factories = state.companyData.factories || [];
  renderFilterChips(el.reportFactories, factories.map((factory) => factory.name));
  state.reportOptionsReady = true;
  refreshDependentReportOptions(factories);
}

function reportMode() {
  return el.reportModes.find((input) => input.checked)?.value || "factory";
}

function selectedReportFactories() {
  const filter = checkedFilter(el.reportFactories);
  if (filter === null) return state.companyData.factories || [];
  return (state.companyData.factories || []).filter((factory) => filter.has(factory.name));
}

function refreshDependentReportOptions(factories) {
  const processSet = new Set();
  const roomSet = new Set();
  factories.forEach((factory) => {
    window.PowerMeterData.officialProcessNames(factory.id).forEach((process) => processSet.add(process));
    factory.meters.forEach((meter) => {
      processSet.add(window.PowerMeterData.standardProcess(meter));
      roomSet.add(window.PowerMeterData.standardRoom(meter.panel));
    });
  });
  processSet.add("汇总口径调整");
  const processOrder = ["清梳联", "清梳联除尘", "精梳", "条卷精梳", "精梳除尘", "条并卷", "并条", "粗纱", "细纱", "络筒", "空调", "空压", "照明", "细络联", "开松间", "气流纺", "涡流纺", "辅助", "打包机", "备用", "其他", "汇总口径调整"];
  const processes = [...processSet].sort((a, b) => {
    const aIndex = processOrder.findIndex((item) => a.includes(item));
    const bIndex = processOrder.findIndex((item) => b.includes(item));
    return (aIndex < 0 ? 999 : aIndex) - (bIndex < 0 ? 999 : bIndex) || a.localeCompare(b, "zh-CN");
  });
  const rooms = [...roomSet].sort((a, b) => a.localeCompare(b, "zh-CN", { numeric: true }));
  renderFilterChips(el.reportProcesses, processes);
  renderFilterChips(el.reportRooms, rooms);
}

function refreshReportUi() {
  const custom = el.reportType.value === "custom";
  el.reportReferenceField.hidden = custom;
  el.reportStartField.hidden = !custom;
  el.reportEndField.hidden = !custom;
  const bounds = reportBounds();
  el.reportPeriodPreview.textContent = bounds.start === bounds.end ? bounds.start : `${bounds.start} → ${bounds.end}`;
  const selectedFactories = selectedReportFactories();
  const factorySignature = selectedFactories.map((factory) => factory.id).sort().join("|");
  if (state.reportOptionsReady && factorySignature !== state.reportFactorySignature) {
    state.reportFactorySignature = factorySignature;
    refreshDependentReportOptions(selectedFactories);
  }
  const mode = reportMode();
  el.reportFilterGrid.dataset.mode = mode;
  el.reportProcessFieldset.hidden = mode !== "process";
  el.reportRoomFieldset.hidden = mode !== "room";
  const factories = selectedFilterText(el.reportFactories, "全部分厂");
  const processes = selectedFilterText(el.reportProcesses, "全部工序");
  const rooms = selectedFilterText(el.reportRooms, "全部配电室");
  if (mode === "process") {
    el.reportSelectionSummary.textContent = `${factories} · 工序：${processes}`;
    el.reportBasisHint.textContent = "按原表正式工序口径汇总，不再叠加配电室限制。";
  } else if (mode === "room") {
    el.reportSelectionSummary.textContent = `${factories} · 配电室：${rooms}`;
    el.reportBasisHint.textContent = "按计量点明细汇总所选配电室，不再叠加工序限制。";
  } else {
    el.reportSelectionSummary.textContent = `${factories} · 整厂汇总`;
    el.reportBasisHint.textContent = el.reportType.value === "month"
      ? "月报按源表月结节点统计，不按自然月；管理生活区五厂均摊，开松间单列。"
      : "周报采用基础数据生产区加五厂公摊；四分厂拆成气流纺、涡流纺，路灯和生活区不进周报。";
  }
}

function reportingUnits(factories, mode) {
  if (mode !== "factory") return factories.map((factory) => ({
    id: factory.id,
    name: factory.name,
    sourceFactoryId: factory.id,
  }));
  return factories.flatMap((factory) => factory.id === "factory-4"
    ? [
        { id: "factory-4-air", name: "四分厂气流纺", sourceFactoryId: factory.id, unitName: "气流纺" },
        { id: "factory-4-vortex", name: "四分厂涡流纺", sourceFactoryId: factory.id, unitName: "涡流纺" },
      ]
    : [{ id: factory.id, name: factory.name, sourceFactoryId: factory.id }]);
}

function factsForRecord(record, factory, mode, processFilter, roomFilter, reportType = "day") {
  if (mode === "factory") {
    const sourceAir = toNumber(state.referenceData?.sources?.publicDaily?.[record.date]?.airAllocations?.[factory.id]);
    const embeddedAir = toNumber(record.reportAdjustments?.includedPublicAir) || 0;
    const airCorrection = sourceAir === null ? 0 : sourceAir - embeddedAir;
    if (reportType === "month") {
      const units = factory.id === "factory-4"
        ? record.monthlyUnits || record.officialUnits || record.reportUnits || []
        : [[factory.name, toNumber(record.monthlyTotal ?? record.officialTotal) ?? toNumber(record.totalUsage) ?? 0]];
      return units.map(([unitName, usage]) => {
        const unitId = factory.id === "factory-4"
          ? unitName === "气流纺" ? "factory-4-air" : "factory-4-vortex"
          : factory.id;
        const displayName = factory.id === "factory-4" ? `四分厂${unitName}` : factory.name;
        return {
          date: record.date,
          factoryId: unitId,
          factoryName: displayName,
          room: "全部配电室",
          process: displayName,
          meterId: `monthly-unit-${unitId}`,
          meterName: "月报生产区汇总",
          category: displayName,
          start: null,
          end: null,
          difference: null,
          multiplier: null,
          usage: (toNumber(usage) || 0) + (factory.id === "factory-4"
            ? unitName === "气流纺" ? airCorrection * 0.7 : airCorrection * 0.3
            : airCorrection),
          statusCode: "normal",
          source: "基础表月报生产区口径",
        };
      });
    }
    const sourceCommon = toNumber(state.referenceData?.sources?.publicDaily?.[record.date]?.commonShare);
    const embeddedCommon = toNumber(record.commonShare ?? record.reportAdjustments?.includedCommonShare) || 0;
    const commonCorrection = sourceCommon === null ? 0 : sourceCommon - embeddedCommon;
    const units = factory.id === "factory-4" && Array.isArray(record.reportUnits || record.officialUnits)
      ? record.reportUnits || record.officialUnits
      : [[factory.name, toNumber(record.reportTotal ?? record.officialTotal) ?? toNumber(record.totalUsage) ?? 0]];
    return units.map(([unitName, usage]) => {
      const unitId = factory.id === "factory-4"
        ? unitName === "气流纺" ? "factory-4-air" : "factory-4-vortex"
        : factory.id;
      const displayName = factory.id === "factory-4" ? `四分厂${unitName}` : factory.name;
      return {
        date: record.date,
        factoryId: unitId,
        factoryName: displayName,
        room: "全部配电室",
        process: displayName,
        meterId: `official-unit-${unitId}`,
        meterName: "生产区正式汇总",
        category: displayName,
        start: null,
        end: null,
        difference: null,
        multiplier: null,
        usage: (toNumber(usage) || 0) + commonCorrection + (factory.id === "factory-4"
          ? unitName === "气流纺" ? airCorrection * 0.7 : airCorrection * 0.3
          : airCorrection),
        statusCode: "normal",
        source: sourceCommon === null
          ? (record.source === "import" ? "基础表生产区 + 内嵌公摊" : "当日录入自动汇总")
          : "基础表生产区 + 五厂公摊源表",
      };
    });
  }
  if (mode === "process" && Array.isArray(record.officialRows) && record.officialRows.length) {
    const rows = record.officialRows.map(([process, usage]) => [process, toNumber(usage) || 0]);
    const processTotal = rows.reduce((sum, [, usage]) => sum + usage, 0);
    const residual = (toNumber(record.officialTotal) ?? processTotal) - processTotal;
    if (Math.abs(residual) >= 0.01) rows.push(["汇总口径调整", residual]);
    return rows
      .filter(([process]) => processFilter === null || processFilter.has(process))
      .map(([process, usage]) => ({
        date: record.date,
        factoryId: factory.id,
        factoryName: factory.name,
        room: "全部配电室",
        process,
        meterId: "official-summary",
        meterName: "原表正式汇总",
        category: process,
        start: null,
        end: null,
        difference: null,
        multiplier: null,
        usage,
        statusCode: "normal",
        source: record.source === "import" ? "原表正式汇总" : "当日录入自动汇总",
      }));
  }
  return window.PowerMeterData.expandRecord(record, factory)
    .filter((row) => (processFilter === null || processFilter.has(row.process)) && (roomFilter === null || roomFilter.has(row.room)))
    .map((row) => ({
      date: record.date,
      factoryId: factory.id,
      factoryName: factory.name,
      room: row.room,
      process: row.process,
      meterId: row.meter_id,
      meterName: row.name,
      category: row.category,
      start: row.start,
      end: row.end,
      difference: row.difference,
      multiplier: row.multiplier,
      usage: toNumber(row.usage) || 0,
      statusCode: row.status_code || "normal",
      source: record.source === "import" ? "计量点历史明细" : "当日录入明细",
    }));
}

function medianNumber(values) {
  const ordered = values.filter(Number.isFinite).sort((a, b) => a - b);
  if (!ordered.length) return 0;
  const middle = Math.floor(ordered.length / 2);
  return ordered.length % 2 ? ordered[middle] : (ordered[middle - 1] + ordered[middle]) / 2;
}

function monthlySourceSummary(monthKey) {
  const sources = state.referenceData?.sources;
  const publicMonth = sources?.publicMonthly?.[monthKey];
  const road = sources?.roadMonthly?.[monthKey];
  const facilities = sources?.facilitiesMonthly?.[monthKey];
  if (!publicMonth && !road && !facilities) return null;
  const components = [
    ["路灯", toNumber(road?.usage) || 0],
    ["办公楼", toNumber(facilities?.office) || 0],
    ["宿舍", toNumber(publicMonth?.dormitory) || 0],
    ["清餐", toNumber(facilities?.dining) || 0],
    ["低压10号", toNumber(publicMonth?.lowVoltage10) || 0],
    ["汉餐", toNumber(publicMonth?.hanDining) || 0],
    ["抓包及叉车库", toNumber(publicMonth?.garage) || 0],
    ["车棚", toNumber(publicMonth?.shed) || 0],
    ["机修间", toNumber(publicMonth?.repairRoom) || 0],
    ["皮辊制作间", toNumber(publicMonth?.rollerRoom) || 0],
    ["生活泵站", toNumber(publicMonth?.lifePump) || 0],
    ["交换站", toNumber(publicMonth?.exchangeStation) || 0],
    ["蓄回水池", toNumber(publicMonth?.reservoir) || 0],
    ["空气能", toNumber(publicMonth?.airEnergy) || 0],
    ["公共水井", toNumber(publicMonth?.waterWells) || 0],
    ["中心实验室", toNumber(publicMonth?.laboratory) || 0],
  ];
  const total = components.reduce((sum, [, usage]) => sum + usage, 0);
  return { components, total, share: total / 5 };
}

function monthlyEndpointUsage(records, factoryId, meterFilter) {
  const factory = state.companyData.factories.find((item) => item.id === factoryId);
  const ordered = records.filter((record) => record.factoryId === factoryId).sort((a, b) => a.date.localeCompare(b.date));
  if (!factory || !ordered.length) return 0;
  if (factoryId === "factory-3" && ordered[0].openingEndpointReadings?.length && ordered.at(-1).openingEndpointReadings?.length) {
    return ordered[0].openingEndpointReadings.reduce((sum, [start, , multiplier], index) => {
      const end = ordered.at(-1).openingEndpointReadings[index]?.[1];
      return Number.isFinite(Number(start)) && Number.isFinite(Number(end)) && Number(end) >= Number(start)
        ? sum + (Number(end) - Number(start)) * Number(multiplier || 0)
        : sum;
    }, 0);
  }
  return factory.meters.reduce((sum, meter, index) => {
    if (!meterFilter(meter)) return sum;
    const start = toNumber(ordered[0].readings?.[index]?.[0]);
    const end = toNumber(ordered.at(-1).readings?.[index]?.[1]);
    if (start === null || end === null || end < start) return sum;
    return sum + (end - start) * Number(meter.multiplier || 0);
  }, 0);
}

function referenceAudit(bounds, mode, selectedUnits, factoryTotals, records) {
  if (mode !== "factory" || !state.referenceData) return null;
  if (el.reportType.value === "week") {
    const reference = (state.referenceData.weekly || []).find((item) => item.startDate === bounds.start && item.endDate === bounds.end);
    if (!reference) return null;
    const items = selectedUnits
      .filter((unit) => Number.isFinite(Number(reference.units?.[unit.id])))
      .map((unit) => {
        const calculated = factoryTotals.get(unit.id) || 0;
        const historical = Number(reference.units[unit.id]);
        return { unitId: unit.id, unitName: unit.name, calculated, historical, difference: historical - calculated };
      });
    const commonAdjustment = medianNumber(items.map((item) => item.difference));
    const spread = items.length ? Math.max(...items.map((item) => item.difference)) - Math.min(...items.map((item) => item.difference)) : 0;
    const exact = items.every((item) => Math.abs(item.difference) <= 1);
    items.forEach((item) => {
      item.conclusion = Math.abs(item.difference) <= 1
        ? "一致"
        : Math.abs(item.difference - commonAdjustment) <= 1
          ? "六单元统一差额"
          : "单厂源表或历史录入差异";
    });
    const commonByDate = new Map();
    records.forEach((record) => {
      const source = toNumber(state.referenceData?.sources?.publicDaily?.[record.date]?.commonShare);
      const embedded = toNumber(record.commonShare ?? record.reportAdjustments?.includedCommonShare) || 0;
      commonByDate.set(record.date, source === null ? embedded : source);
    });
    return {
      type: "week",
      title: "历史周报对账",
      sourceFile: reference.sourceFile,
      sourceSheet: reference.sourceSheet,
      items,
      commonAdjustment,
      sourceCommonTotal: [...commonByDate.values()].reduce((sum, usage) => sum + usage, 0),
      spread,
      status: exact ? "与历史周报一致" : spread <= 1 ? "历史周报存在六单元统一差额，来源未留公式" : "存在单厂源表或历史录入差异",
      note: "自动计算列采用基础数据生产区、公摊表公共水井均分及空压分配；汉餐、路灯、办公楼和清餐不进入周报。历史周报用电量是手工值，统一差额只作提示；原单元格没有公式，无法继续追溯来源。",
    };
  }
  if (el.reportType.value !== "month" || !bounds.monthKey) return null;
  const month = state.referenceData.monthly?.[bounds.monthKey];
  const ring = month?.ring;
  if (!ring?.productionUnits) return null;
  const items = selectedUnits
    .filter((unit) => Number.isFinite(Number(ring.productionUnits[unit.id])))
    .map((unit) => {
      const calculated = factoryTotals.get(unit.id) || 0;
      const historical = Number(ring.productionUnits[unit.id]);
      const difference = historical - calculated;
      return {
        unitId: unit.id,
        unitName: unit.name,
        calculated,
        historical,
        difference,
        conclusion: Math.abs(difference) <= 1 ? "一致" : "历史底表修订/缺失日",
      };
    });
  const summary = month.summary;
  const sourceManagement = monthlySourceSummary(bounds.monthKey);
  const selectedFactoryIds = new Set(selectedUnits.map((unit) => unit.sourceFactoryId));
  const selectedFactoryCount = selectedFactoryIds.size;
  const includesThirdFactory = selectedFactoryIds.has("factory-3");
  const sourceOpeningRoom = includesThirdFactory
    ? monthlyEndpointUsage(records, "factory-3", (meter) => /开松/.test(`${meter.category || ""}${meter.name || ""}`))
    : 0;
  const sourceProductionTotal = items.reduce((sum, item) => sum + item.calculated, 0);
  const historicalProductionTotal = items.reduce((sum, item) => sum + item.historical, 0);
  const sourceManagementSelected = (sourceManagement?.share || 0) * selectedFactoryCount;
  const historicalManagementShare = Number(summary?.managementShare || 0);
  const historicalManagementSelected = historicalManagementShare * selectedFactoryCount;
  const historicalOpeningRoom = includesThirdFactory ? Number(summary?.openingRoom ?? ring.openingRoom ?? 0) : 0;
  const currentComponentMap = new Map(sourceManagement?.components || []);
  const historicalComponentMap = new Map(Object.entries(ring.managementComponents || {}));
  const componentNames = [...new Set([...currentComponentMap.keys(), ...historicalComponentMap.keys()])];
  const componentItems = componentNames.map((name) => {
    const calculated = toNumber(currentComponentMap.get(name)) || 0;
    const historical = toNumber(historicalComponentMap.get(name)) || 0;
    return { name, calculated, historical, difference: historical - calculated };
  });
  return {
    type: "month",
    title: "历史月报对账",
    sourceFile: ring.sourceFile,
    sourceSheet: "Sheet1",
    items,
    managementTotal: historicalManagementSelected,
    managementShare: historicalManagementShare,
    sourceManagementTotal: sourceManagementSelected,
    sourceManagementShare: sourceManagement?.share || 0,
    openingRoom: historicalOpeningRoom,
    sourceOpeningRoom,
    sourceCompanyTotal: sourceProductionTotal + sourceManagementSelected + sourceOpeningRoom,
    historicalCompanyTotal: historicalProductionTotal + historicalManagementSelected + historicalOpeningRoom,
    componentItems,
    reconciliation: {
      productionCalculated: sourceProductionTotal,
      productionHistorical: historicalProductionTotal,
      managementCalculated: sourceManagementSelected,
      managementHistorical: historicalManagementSelected,
      openingCalculated: sourceOpeningRoom,
      openingHistorical: historicalOpeningRoom,
    },
    status: items.every((item) => Math.abs(item.difference) <= 1) ? "生产区数据一致" : "存在历史底表修订/缺失日",
    note: "月报生产区按六单元核算；路灯、办公楼、清餐及生活外围只进入月度管理生活区，再按五个分厂平均分摊；四分厂合并后只分一份，开松间单列。",
  };
}

async function createPeriodReport() {
  if (!state.importMeta?.schemaVersion || !window.PowerMeterData || !window.PowerMeterXlsx?.downloadPeriod) {
    showToast("请先导入基础数据和公摊表");
    return;
  }
  const bounds = reportBounds();
  if (bounds.end < bounds.start) {
    showToast("结束日期不能早于开始日期");
    return;
  }
  const factoryFilter = checkedFilter(el.reportFactories);
  const mode = reportMode();
  const processFilter = mode === "process" ? checkedFilter(el.reportProcesses) : null;
  const roomFilter = mode === "room" ? checkedFilter(el.reportRooms) : null;
  if (factoryFilter?.size === 0) {
    showToast("请至少选择一个分厂");
    return;
  }
  if (mode === "process" && processFilter?.size === 0) {
    showToast("请至少选择一个工序");
    return;
  }
  if (mode === "room" && roomFilter?.size === 0) {
    showToast("请至少选择一个配电室");
    return;
  }
  const factoryByName = new Map(state.companyData.factories.map((factory) => [factory.name, factory]));
  const selectedFactories = factoryFilter === null
    ? state.companyData.factories
    : [...factoryFilter].map((name) => factoryByName.get(name)).filter(Boolean);
  const selectedIds = new Set(selectedFactories.map((factory) => factory.id));
  const selectedUnits = reportingUnits(selectedFactories, mode);
  const records = (await window.PowerMeterData.getRange(bounds.start, bounds.end))
    .filter((record) => record.completed && selectedIds.has(record.factoryId));
  const factoryById = new Map(selectedFactories.map((factory) => [factory.id, factory]));
  const facts = records.flatMap((record) => factsForRecord(
    record,
    factoryById.get(record.factoryId),
    mode,
    processFilter,
    roomFilter,
    el.reportType.value,
  ));
  if (!facts.length) {
    showToast("所选组合没有可汇总的数据");
    return;
  }

  const daily = new Map(datesBetween(bounds.start, bounds.end).map((date) => [date, {
    date,
    totalUsage: 0,
    factories: Object.fromEntries(selectedUnits.map((unit) => [unit.id, 0])),
    completedFactories: 0,
  }]));
  const factoryTotals = new Map(selectedUnits.map((unit) => [unit.id, 0]));
  const processTotals = new Map();
  const topTotals = new Map();
  const activeFactoryDays = new Set();
  let warningCount = 0;
  facts.forEach((fact) => {
    const usage = toNumber(fact.usage) || 0;
    const day = daily.get(fact.date);
    day.totalUsage += usage;
    day.factories[fact.factoryId] = (day.factories[fact.factoryId] || 0) + usage;
    activeFactoryDays.add(`${fact.date}|${fact.factoryId}`);
    factoryTotals.set(fact.factoryId, (factoryTotals.get(fact.factoryId) || 0) + usage);
    processTotals.set(fact.process, (processTotals.get(fact.process) || 0) + usage);
    if (fact.statusCode !== "normal") warningCount += 1;
    const topKey = mode === "room" ? `${fact.factoryId}|${fact.meterId}` : `${fact.factoryId}|${fact.process}`;
    const current = topTotals.get(topKey) || {
      name: mode === "room" ? fact.meterName : fact.process,
      factoryName: fact.factoryName,
      category: fact.process,
      usage: 0,
    };
    current.usage += usage;
    topTotals.set(topKey, current);
  });
  activeFactoryDays.forEach((key) => daily.get(key.split("|")[0]).completedFactories += 1);
  const dailyRows = [...daily.values()];
  const daysWithData = dailyRows.filter((item) => item.completedFactories > 0).length;
  const totalUsage = dailyRows.reduce((sum, item) => sum + item.totalUsage, 0);
  const factorySummaries = selectedUnits.map((unit) => {
    const usage = factoryTotals.get(unit.id) || 0;
    const peak = dailyRows.reduce((best, day) => day.factories[unit.id] > best.usage ? { date: day.date, usage: day.factories[unit.id] } : best, { date: "—", usage: 0 });
    return {
      factoryId: unit.id,
      factoryName: unit.name,
      usage,
      share: totalUsage ? usage / totalUsage : 0,
      dailyAverage: daysWithData ? usage / daysWithData : 0,
      peakDate: peak.date,
      peakUsage: peak.usage,
    };
  });
  const processes = [...processTotals.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([process, usage]) => ({ category: process, process, usage, share: totalUsage ? usage / totalUsage : 0 }));
  const topMeters = [...topTotals.values()].sort((a, b) => b.usage - a.usage).slice(0, 30);
  const audit = referenceAudit(bounds, mode, selectedUnits, factoryTotals, records);
  const monthSources = el.reportType.value === "month" && mode === "factory"
    ? monthlySourceSummary(bounds.monthKey)
    : null;
  const openingRoom = el.reportType.value === "month" && selectedIds.has("factory-3")
    ? monthlyEndpointUsage(records, "factory-3", (meter) => /开松/.test(`${meter.category || ""}${meter.name || ""}`))
    : 0;
  const monthlySummary = monthSources ? {
    managementTotal: monthSources.total,
    managementShare: monthSources.share,
    selectedFactoryCount: selectedFactories.length,
    selectedManagementTotal: monthSources.share * selectedFactories.length,
    openingRoom,
    companyTotal: totalUsage + monthSources.share * selectedFactories.length + openingRoom,
    components: monthSources.components,
  } : null;
  const basis = mode === "room"
    ? "计量点明细口径（仅按配电室筛选）"
    : mode === "process"
      ? "原表正式工序汇总口径"
      : el.reportType.value === "month"
        ? "基础数据月报生产区 + 管理生活区五厂均摊 + 开松间单列"
        : "基础数据周报生产区 + 五厂公摊源表口径";
  const selection = el.reportSelectionSummary.textContent;
  await window.PowerMeterXlsx.downloadPeriod({
    company: "雅新纺织有限公司",
    type: el.reportType.value,
    label: bounds.label,
    startDate: bounds.start,
    endDate: bounds.end,
    dailyRows,
    factories: selectedUnits.map((unit) => ({ id: unit.id, name: unit.name })),
    factorySummaries,
    categories: processes,
    topMeters,
    detailRows: facts,
    totalUsage,
    daysWithData,
    warningCount,
    referenceAudit: audit,
    monthlySummary,
    basis,
    selection,
    fileName: `雅新纺织-用电${bounds.label}-${bounds.start}至${bounds.end}.xlsx`,
  });
  showToast(audit
    ? `${bounds.label}已生成并完成历史对账：${audit.status}`
    : `${bounds.label}已生成：${shortDate(bounds.start)}至${shortDate(bounds.end)}`);
}

async function downloadMasterWorkbook() {
  if (!state.importMeta?.schemaVersion || !window.PowerMeterXlsx?.downloadMaster) {
    showToast("请先导入基础数据和公摊表");
    return;
  }
  el.masterDownloadButton.disabled = true;
  el.masterDownloadButton.textContent = "正在整理底表…";
  await new Promise((resolve) => requestAnimationFrame(resolve));
  try {
    const records = (await window.PowerMeterData.getRange(state.importMeta.firstDate, state.importMeta.completedThrough))
      .filter((record) => record.completed);
    const factoryById = new Map(state.companyData.factories.map((factory) => [factory.id, factory]));
    const detailRows = [];
    const officialRows = [];
    records.forEach((record) => {
      const factory = factoryById.get(record.factoryId);
      window.PowerMeterData.expandRecord(record, factory).forEach((row) => detailRows.push({
        date: record.date,
        factoryName: factory.name,
        room: row.room,
        process: row.process,
        meterName: row.name,
        category: row.category,
        ratioText: row.ratio_text,
        multiplier: row.multiplier,
        start: row.start,
        end: row.end,
        difference: row.difference,
        usage: row.usage,
        statusCode: row.status_code,
        source: record.source === "import" ? "历史导入" : "当日录入",
      }));
      const pairs = Array.isArray(record.officialRows) ? record.officialRows.map(([process, usage]) => [process, toNumber(usage) || 0]) : [];
      const processTotal = pairs.reduce((sum, [, usage]) => sum + usage, 0);
      const residual = (toNumber(record.officialTotal) ?? processTotal) - processTotal;
      if (Math.abs(residual) >= 0.01) pairs.push(["汇总口径调整", residual]);
      pairs.forEach(([process, usage]) => officialRows.push({
        date: record.date,
        factoryName: factory.name,
        process,
        usage,
        source: record.source === "import" ? "原表正式汇总" : "当日录入自动汇总",
      }));
    });
    const dictionaryRows = state.companyData.factories.flatMap((factory) => factory.meters.map((meter) => ({
      factoryName: factory.name,
      room: window.PowerMeterData.standardRoom(meter.panel),
      process: window.PowerMeterData.standardProcess(meter),
      meterName: meter.name,
      category: meter.category,
      ratioText: meter.ratio_text,
      multiplier: meter.multiplier,
      sourceCell: meter.source_cell,
    })));
    await window.PowerMeterXlsx.downloadMaster({
      company: "雅新纺织有限公司",
      firstDate: state.importMeta.firstDate,
      endDate: state.importMeta.completedThrough,
      detailRows,
      officialRows,
      dictionaryRows,
      fileName: `雅新纺织-用电全量数据底表-${state.importMeta.completedThrough}.xlsx`,
    });
    showToast(`全量数据底表已生成，共 ${detailRows.length} 条计量点日记录`);
  } catch (error) {
    showToast(`底表生成失败：${error.message}`);
  } finally {
    el.masterDownloadButton.disabled = false;
    el.masterDownloadButton.textContent = "下载全量数据底表";
  }
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
      const updatedMeta = await window.PowerMeterData.saveRows(payload.date, state.factoryId, rows, "manual");
      state.importMeta = updatedMeta || state.importMeta;
      state.importedTotals.set(state.factoryId, Number(calculation.summary.total_usage || 0));
      renderHistoryStatus();
      refreshReportUi();
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
    state.importedTotals = new Map(importedForDate.filter((item) => item.completed).map((item) => [item.factoryId, item.officialTotal ?? item.totalUsage]));
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
el.historyFileInput.addEventListener("change", () => importHistoryFiles(el.historyFileInput.files));
el.masterDownloadButton.addEventListener("click", downloadMasterWorkbook);
el.weeklyHistoryButton.addEventListener("click", downloadWeeklyHistoryWorkbook);
el.generateReportButton.addEventListener("click", () => createPeriodReport().catch((error) => showToast(`报表生成失败：${error.message}`)));
[el.reportType, el.reportReferenceDate, el.reportStartDate, el.reportEndDate].forEach((control) => {
  control.addEventListener("change", refreshReportUi);
});
el.reportModes.forEach((control) => control.addEventListener("change", refreshReportUi));
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
  const today = todayLocal();
  el.readingDate.value = today;
  el.reportReferenceDate.value = today;
  el.reportStartDate.value = today;
  el.reportEndDate.value = today;
  if (STATIC_MODE) {
    const [meterResponse, historyResponse] = await Promise.all([
      fetch("meters.json", { cache: "no-store" }),
      fetch("history.json", { cache: "no-store" }),
    ]);
    if (!meterResponse.ok) throw new Error("分厂基础数据加载失败");
    if (!historyResponse.ok) throw new Error("历史起点数据加载失败");
    state.companyData = await meterResponse.json();
    state.historyData = await historyResponse.json();
    state.importMeta = await window.PowerMeterData?.getMeta().catch(() => null) || null;
    state.referenceData = await window.PowerMeterData?.getReferenceData().catch(() => null) || null;
    await syncSavedRecordsToHistory();
    state.factoryId = state.companyData.factories?.[0]?.id || "";
    renderFactoryTabs();
    initializeReportOptions();
    refreshReportUi();
    updateModeUi();
    renderHistoryStatus();
  } else {
    el.factoryTabs.hidden = true;
    el.historyPanel.hidden = true;
    el.reportCenter.hidden = true;
    el.testModeButton.hidden = true;
    el.testBanner.hidden = true;
  }
  await loadDate(el.readingDate.value);
}


initialize().catch((error) => {
  el.meterRows.innerHTML = `<p class="loading-row">启动失败：${error.message}</p>`;
  showToast(error.message);
});
