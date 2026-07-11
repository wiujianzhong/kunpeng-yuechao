"use strict";

(function initializePowerMeterData(global) {
  const DB_NAME = "power-meter-history-v1";
  const DB_VERSION = 1;
  const DAILY_STORE = "daily";
  const META_STORE = "meta";
  const REFERENCE_KEY = "report-reference";
  const decoder = new TextDecoder("utf-8");
  const OFFICIAL_PROCESS_CELLS = {
    "factory-1": [
      ["清梳联", "C69"], ["清梳联除尘", "C70"], ["精梳", "C71"], ["精梳除尘", "C72"],
      ["条并卷", "C73"], ["粗纱", "C74"], ["细纱", "C75"], ["络筒", "C76"],
      ["空调", "C77"], ["空压", "C78"], ["照明", "C79"], ["细络联", "C80"],
    ],
    "factory-2": [
      ["清梳联", "F69"], ["清梳联除尘", "F70"], ["精梳", "F71"], ["精梳除尘", "F72"],
      ["条并卷", "F73"], ["粗纱", "F74"], ["细纱", "F75"], ["络筒", "F76"],
      ["空调", "F77"], ["空压", "F78"], ["照明", "F79"], ["细络联", "F80"],
    ],
    "factory-3": [
      ["清梳联", "I69"], ["清梳联除尘", "I70"], ["精梳", "I71"], ["精梳除尘", "I72"],
      ["条并卷", "I73"], ["粗纱", "I74"], ["细纱", "I75"], ["络筒", "I76"],
      ["空调", "I77"], ["空压", "I78"], ["照明", "I79"], ["开松间", "I80"], ["细络联", "I81"],
    ],
    "factory-4": [
      ["气流纺清梳联", "L69"], ["气流纺清梳联除尘", "L70"], ["气流纺并条", "L71"],
      ["气流纺主机", "L72"], ["气流纺空调", "L73"], ["气流纺空压", "L74"], ["气流纺照明", "L75"],
      ["涡流纺清梳联", "O69"], ["涡流纺清梳联除尘", "O70"], ["涡流纺精梳", "O71"],
      ["涡流纺精梳除尘", "O72"], ["涡流纺并条", "O73"], ["涡流纺主机", "O74"],
      ["涡流纺空调", "O75"], ["涡流纺空压", "O76"], ["涡流纺照明", "O77"],
    ],
    "factory-7": [
      ["清梳联", "R69"], ["清梳联除尘", "R70"], ["条卷精梳", "R71"], ["精梳除尘", "R72"],
      ["粗纱", "R73"], ["细纱", "R74"], ["络筒", "R75"], ["空调", "R76"],
      ["空压", "R77"], ["照明", "R78"],
    ],
  };
  const OFFICIAL_TOTAL_CELLS = {
    "factory-1": [...cellRange("B", 4, 14), "D11", "D18", "B17"],
    "factory-2": [...cellRange("F", 4, 16), "D12", "G18", "B18"],
    "factory-3": [...cellRange("J", 4, 16), "D13", "J18", "B19"],
    "factory-4": ["L22", "L23"],
    "factory-7": [...cellRange("R", 4, 15), "D14", "B20", "R77"],
  };
  const OFFICIAL_UNIT_CELLS = {
    "factory-4": [["气流纺", "L22"], ["涡流纺", "L23"]],
  };
  const REPORT_AUXILIARY_CELLS = ["F16", "J15", "M22"];
  const FACTORY_NAMES = {
    "factory-1": "一分厂",
    "factory-2": "二分厂",
    "factory-3": "三分厂",
    "factory-4": "四分厂",
    "factory-7": "七分厂",
  };
  const WEEKLY_REPORT_UNITS = [
    { id: "factory-1", name: "一分厂", factoryId: "factory-1" },
    { id: "factory-2", name: "二分厂", factoryId: "factory-2" },
    { id: "factory-3", name: "三分厂", factoryId: "factory-3" },
    { id: "factory-4-air", name: "四分厂气流纺", factoryId: "factory-4", unitName: "气流纺" },
    { id: "factory-4-vortex", name: "四分厂涡流纺", factoryId: "factory-4", unitName: "涡流纺" },
    { id: "factory-7", name: "七分厂", factoryId: "factory-7" },
  ];

  function cellRange(column, start, end) {
    return Array.from({ length: end - start + 1 }, (_, index) => `${column}${start + index}`);
  }

  function standardProcess(item = {}) {
    const text = `${item.category || ""} ${item.name || ""}`.replace(/\s+/g, "");
    const prefix = /气流纺/.test(text) ? "气流纺" : /涡流纺/.test(text) ? "涡流纺" : "";
    let process = "其他";
    if (/照明/.test(text)) process = "照明";
    else if (/空压/.test(text)) process = "空压";
    else if (/空调/.test(text)) process = "空调";
    else if (/除尘/.test(text) && /精梳/.test(text)) process = "精梳除尘";
    else if (/除尘/.test(text)) process = "清梳联除尘";
    else if (/清花|梳棉|清梳/.test(text)) process = "清梳联";
    else if (/条并卷/.test(text)) process = "条并卷";
    else if (/并条精梳|条卷精梳/.test(text)) process = "条卷精梳";
    else if (/精梳/.test(text)) process = "精梳";
    else if (/粗纱/.test(text)) process = "粗纱";
    else if (/细络联/.test(text)) process = "细络联";
    else if (/细纱/.test(text)) process = "细纱";
    else if (/络筒/.test(text)) process = "络筒";
    else if (/并条/.test(text)) process = "并条";
    else if (/主机|气流纺|涡流纺/.test(text)) process = "主机";
    else if (/辅助/.test(text)) process = "辅助";
    else if (/打包/.test(text)) process = "打包机";
    else if (/备用/.test(text)) process = "备用";
    return prefix && !process.startsWith(prefix) ? `${prefix}${process}` : process;
  }

  function standardRoom(panel) {
    const source = String(panel || "").trim().replaceAll("#", "号").replace(/[（）]/g, (value) => value === "（" ? "(" : ")");
    if (!source || !/配|^[一二三四五六七八九十\d]+号(?:\(\d+\))?$/.test(source)) return "未标注配电室";
    const matched = /^([一二三四五六七八九十\d]+)(?:号)?配?(?:电室)?(\(\d+\))?$/.exec(source);
    if (!matched) return source.includes("配电室") ? source : source.replace(/配$/, "配电室");
    const numberMap = { 一: 1, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9, 十: 10 };
    const number = numberMap[matched[1]] || matched[1];
    return `${number}号配电室${matched[2] || ""}`;
  }

  function officialProcessNames(factoryId = null) {
    const rows = factoryId
      ? (OFFICIAL_PROCESS_CELLS[factoryId] || [])
      : Object.values(OFFICIAL_PROCESS_CELLS).flat();
    return [...new Set(rows.map(([process]) => process))];
  }

  function requestResult(request) {
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error || new Error("本地历史数据库操作失败"));
    });
  }

  function transactionDone(transaction) {
    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error || new Error("本地历史数据库写入失败"));
      transaction.onabort = () => reject(transaction.error || new Error("本地历史数据库写入已取消"));
    });
  }

  function openDatabase() {
    if (!global.indexedDB) return Promise.reject(new Error("当前浏览器不支持大容量历史数据存储，请使用最新版Chrome或Edge"));
    return new Promise((resolve, reject) => {
      const request = global.indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = () => {
        const database = request.result;
        const daily = database.createObjectStore(DAILY_STORE, { keyPath: "key" });
        daily.createIndex("date", "date", { unique: false });
        daily.createIndex("factoryId", "factoryId", { unique: false });
        database.createObjectStore(META_STORE, { keyPath: "key" });
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error || new Error("无法打开本地历史数据库"));
    });
  }

  async function getMeta() {
    const database = await openDatabase();
    try {
      const transaction = database.transaction(META_STORE, "readonly");
      return await requestResult(transaction.objectStore(META_STORE).get("import"));
    } finally {
      database.close();
    }
  }

  async function getReferenceData() {
    const database = await openDatabase();
    try {
      const transaction = database.transaction(META_STORE, "readonly");
      return await requestResult(transaction.objectStore(META_STORE).get(REFERENCE_KEY)) || {
        key: REFERENCE_KEY,
        weekly: [],
        monthly: {},
        sources: { publicDaily: {}, publicMonthly: {}, roadMonthly: {}, facilitiesMonthly: {} },
      };
    } finally {
      database.close();
    }
  }

  async function saveReferenceData(referenceData) {
    const database = await openDatabase();
    try {
      const transaction = database.transaction(META_STORE, "readwrite");
      transaction.objectStore(META_STORE).put({
        key: REFERENCE_KEY,
        weekly: referenceData.weekly || [],
        monthly: referenceData.monthly || {},
        sources: referenceData.sources || { publicDaily: {}, publicMonthly: {}, roadMonthly: {}, facilitiesMonthly: {} },
        updatedAt: new Date().toISOString(),
      });
      await transactionDone(transaction);
    } finally {
      database.close();
    }
  }

  async function getDay(date, factoryId) {
    const database = await openDatabase();
    try {
      const transaction = database.transaction(DAILY_STORE, "readonly");
      return await requestResult(transaction.objectStore(DAILY_STORE).get(`${date}|${factoryId}`));
    } finally {
      database.close();
    }
  }

  async function getDate(date) {
    const database = await openDatabase();
    try {
      const transaction = database.transaction(DAILY_STORE, "readonly");
      return await requestResult(transaction.objectStore(DAILY_STORE).index("date").getAll(date));
    } finally {
      database.close();
    }
  }

  async function getLatestBefore(date, factoryId) {
    const database = await openDatabase();
    try {
      const transaction = database.transaction(DAILY_STORE, "readonly");
      const records = await requestResult(transaction.objectStore(DAILY_STORE).index("factoryId").getAll(factoryId));
      return records.filter((item) => item.date < date).sort((a, b) => b.date.localeCompare(a.date))[0] || null;
    } finally {
      database.close();
    }
  }

  async function getRange(startDate, endDate) {
    const database = await openDatabase();
    try {
      const transaction = database.transaction(DAILY_STORE, "readonly");
      const range = IDBKeyRange.bound(startDate, endDate);
      return await requestResult(transaction.objectStore(DAILY_STORE).index("date").getAll(range));
    } finally {
      database.close();
    }
  }

  function buildWeeklyHistory(records, meta, referenceData = null) {
    const completeRecords = records.filter((record) => record.completed);
    const factoryIds = [...new Set(WEEKLY_REPORT_UNITS.map((unit) => unit.factoryId))];
    const recordsByKey = new Map(completeRecords.map((record) => [`${record.date}|${record.factoryId}`, record]));
    const addDays = (value, days) => {
      const date = new Date(`${value}T00:00:00Z`);
      date.setUTCDate(date.getUTCDate() + days);
      return date.toISOString().slice(0, 10);
    };
    const weekEnd = (value) => {
      const date = new Date(`${value}T00:00:00Z`);
      return addDays(value, (4 - date.getUTCDay() + 7) % 7);
    };
    const datesBetween = (startDate, endDate) => {
      const dates = [];
      for (let date = startDate; date <= endDate; date = addDays(date, 1)) dates.push(date);
      return dates;
    };
    const unitValue = (record, unit) => {
      const sourceCommon = finiteNumber(referenceData?.sources?.publicDaily?.[record.date]?.commonShare);
      const embeddedCommon = finiteNumber(record.commonShare ?? record.reportAdjustments?.includedCommonShare) || 0;
      const commonCorrection = sourceCommon === null ? 0 : sourceCommon - embeddedCommon;
      if (unit.factoryId !== "factory-4") return (finiteNumber(record.reportTotal ?? record.officialTotal) || 0) + commonCorrection;
      const units = new Map((record.reportUnits || record.officialUnits || []).map(([name, usage]) => [name, finiteNumber(usage) || 0]));
      return (units.get(unit.unitName) || 0) + commonCorrection;
    };
    const weeks = [];
    let monthKey = "";
    let monthRunning = Object.fromEntries(WEEKLY_REPORT_UNITS.map((unit) => [unit.id, 0]));
    const weekEnds = [...new Set(completeRecords.map((record) => weekEnd(record.date)))].sort();

    weekEnds.forEach((endDate) => {
      if (endDate > meta.completedThrough) return;
      const startDate = addDays(endDate, -6);
      const dates = datesBetween(startDate, endDate);
      if (!dates.every((date) => factoryIds.every((factoryId) => recordsByKey.has(`${date}|${factoryId}`)))) return;
      const unitTotals = Object.fromEntries(WEEKLY_REPORT_UNITS.map((unit) => [unit.id, 0]));
      const processTotals = new Map();
      const dailyRows = dates.map((date) => {
        const units = {};
        WEEKLY_REPORT_UNITS.forEach((unit) => {
          const usage = unitValue(recordsByKey.get(`${date}|${unit.factoryId}`), unit);
          units[unit.id] = usage;
          unitTotals[unit.id] += usage;
        });
        factoryIds.forEach((factoryId) => {
          const record = recordsByKey.get(`${date}|${factoryId}`);
          const pairs = Array.isArray(record.officialRows)
            ? record.officialRows.map(([process, usage]) => [process, finiteNumber(usage) || 0])
            : [];
          const processTotal = pairs.reduce((sum, [, usage]) => sum + usage, 0);
          const residual = (finiteNumber(record.officialTotal) ?? processTotal) - processTotal;
          if (Math.abs(residual) >= 0.01) pairs.push(["汇总口径调整", residual]);
          pairs.forEach(([process, usage]) => processTotals.set(process, (processTotals.get(process) || 0) + usage));
        });
        return { date, units, totalUsage: Object.values(units).reduce((sum, usage) => sum + usage, 0) };
      });
      const currentMonth = endDate.slice(0, 7);
      if (currentMonth !== monthKey) {
        monthKey = currentMonth;
        monthRunning = Object.fromEntries(WEEKLY_REPORT_UNITS.map((unit) => [unit.id, 0]));
      }
      WEEKLY_REPORT_UNITS.forEach((unit) => { monthRunning[unit.id] += unitTotals[unit.id]; });
      const totalUsage = Object.values(unitTotals).reduce((sum, usage) => sum + usage, 0);
      const previous = weeks.at(-1);
      weeks.push({
        startDate,
        endDate,
        sheetName: `${startDate.slice(2).replaceAll("-", ".")}-${endDate.slice(5).replaceAll("-", ".")}`,
        unitTotals,
        monthTotals: { ...monthRunning },
        totalUsage,
        previousChange: previous?.totalUsage ? (totalUsage - previous.totalUsage) / previous.totalUsage : null,
        dailyRows,
        processes: [...processTotals.entries()]
          .sort((a, b) => b[1] - a[1])
          .map(([process, usage]) => ({ process, usage, share: totalUsage ? usage / totalUsage : 0 })),
      });
    });
    return { units: WEEKLY_REPORT_UNITS, weeks };
  }

  function compactRows(date, factoryId, rows, source = "manual") {
    const readings = rows.map((row) => [
      finiteNumber(row.start),
      finiteNumber(row.end),
      row.status_code || "normal",
    ]);
    const totalUsage = rows.reduce((sum, row) => sum + (finiteNumber(row.usage ?? row._usage) || 0), 0);
    const processTotals = new Map();
    rows.forEach((row) => {
      const usage = finiteNumber(row.usage ?? row._usage);
      if (usage === null) return;
      const process = standardProcess(row);
      processTotals.set(process, (processTotals.get(process) || 0) + usage);
    });
    let officialUnits = [[FACTORY_NAMES[factoryId] || factoryId, totalUsage]];
    let reportTotal = totalUsage;
    let reportUnits = officialUnits;
    const reportAdjustments = {
      excludedNetFiber: 0,
      excludedOpeningRoom: 0,
      excludedFourFactoryCommon: 0,
      includedCommonShare: 0,
    };
    if (factoryId === "factory-2") {
      reportAdjustments.excludedNetFiber = rows.reduce((sum, row) => {
        const text = `${row.category || ""}${row.name || ""}`;
        return sum + (/净纤/.test(text) ? finiteNumber(row.usage ?? row._usage) || 0 : 0);
      }, 0);
      reportTotal -= reportAdjustments.excludedNetFiber;
      reportUnits = [[FACTORY_NAMES[factoryId], reportTotal]];
    }
    if (factoryId === "factory-3") {
      reportAdjustments.excludedOpeningRoom = rows.reduce((sum, row) => {
        const text = `${row.category || ""}${row.name || ""}`;
        return sum + (/开松/.test(text) ? finiteNumber(row.usage ?? row._usage) || 0 : 0);
      }, 0);
      reportTotal -= reportAdjustments.excludedOpeningRoom;
      reportUnits = [[FACTORY_NAMES[factoryId], reportTotal]];
    }
    if (factoryId === "factory-4") {
      const gasUsage = [...processTotals.entries()]
        .filter(([process]) => process.startsWith("气流纺"))
        .reduce((sum, [, usage]) => sum + usage, 0);
      const vortexUsage = [...processTotals.entries()]
        .filter(([process]) => process.startsWith("涡流纺"))
        .reduce((sum, [, usage]) => sum + usage, 0);
      const sharedUsage = totalUsage - gasUsage - vortexUsage;
      const gasShare = sharedUsage / 2;
      officialUnits = [
        ["气流纺", gasUsage + gasShare],
        ["涡流纺", vortexUsage + sharedUsage - gasShare],
      ];
      reportAdjustments.excludedFourFactoryCommon = sharedUsage;
      reportTotal = gasUsage + vortexUsage;
      reportUnits = [["气流纺", gasUsage], ["涡流纺", vortexUsage]];
    }
    const monthlyUnits = factoryId === "factory-4"
      ? officialUnits
      : [[FACTORY_NAMES[factoryId] || factoryId, factoryId === "factory-3" ? totalUsage - reportAdjustments.excludedOpeningRoom : totalUsage]];
    const monthlyTotal = monthlyUnits.reduce((sum, [, usage]) => sum + usage, 0);
    return {
      key: `${date}|${factoryId}`,
      date,
      factoryId,
      source,
      completed: rows.some((row) => finiteNumber(row.end) !== null),
      readings,
      totalUsage,
      officialTotal: totalUsage,
      officialRows: [...processTotals.entries()],
      officialUnits,
      reportTotal,
      reportUnits,
      monthlyTotal,
      monthlyUnits,
      commonShare: 0,
      reportAdjustments,
      updatedAt: new Date().toISOString(),
    };
  }

  async function saveRows(date, factoryId, rows, source = "manual") {
    const database = await openDatabase();
    try {
      const transaction = database.transaction([DAILY_STORE, META_STORE], "readwrite");
      const daily = transaction.objectStore(DAILY_STORE);
      const metaStore = transaction.objectStore(META_STORE);
      const [recordsOnDate, meta] = await Promise.all([
        requestResult(daily.index("date").count(date)),
        requestResult(metaStore.get("import")),
      ]);
      const record = compactRows(date, factoryId, rows, source);
      daily.put(record);
      if (meta) {
        meta.firstDate = !meta.firstDate || date < meta.firstDate ? date : meta.firstDate;
        meta.lastDate = !meta.lastDate || date > meta.lastDate ? date : meta.lastDate;
        if (record.completed && (!meta.completedThrough || date > meta.completedThrough)) meta.completedThrough = date;
        if (!recordsOnDate) meta.dayCount = Number(meta.dayCount || 0) + 1;
        meta.updatedAt = new Date().toISOString();
        metaStore.put(meta);
      }
      await transactionDone(transaction);
      return meta || null;
    } finally {
      database.close();
    }
  }

  function finiteNumber(value) {
    if (value === null || value === undefined || value === "") return null;
    const number = Number(value);
    return Number.isFinite(number) ? number : null;
  }

  function columnNumber(name) {
    let value = 0;
    for (const character of name) value = value * 26 + character.charCodeAt(0) - 64;
    return value;
  }

  function columnName(number) {
    let value = number;
    let name = "";
    while (value > 0) {
      const remainder = (value - 1) % 26;
      name = String.fromCharCode(65 + remainder) + name;
      value = Math.floor((value - 1) / 26);
    }
    return name;
  }

  function shiftAddress(address, offset) {
    const matched = /^([A-Z]+)(\d+)$/.exec(address || "");
    if (!matched) throw new Error(`计量点来源位置无效：${address || "空"}`);
    return `${columnName(columnNumber(matched[1]) + offset)}${matched[2]}`;
  }

  function readUint16(view, offset) {
    return view.getUint16(offset, true);
  }

  function readUint32(view, offset) {
    return view.getUint32(offset, true);
  }

  class ZipArchive {
    constructor(buffer) {
      this.bytes = new Uint8Array(buffer);
      this.view = new DataView(buffer);
      this.entries = new Map();
      this.readDirectory();
    }

    readDirectory() {
      let endOffset = -1;
      for (let offset = this.bytes.length - 22; offset >= Math.max(0, this.bytes.length - 65557); offset -= 1) {
        if (readUint32(this.view, offset) === 0x06054b50) {
          endOffset = offset;
          break;
        }
      }
      if (endOffset < 0) throw new Error("这不是可识别的xlsx文件");
      const entryCount = readUint16(this.view, endOffset + 10);
      let offset = readUint32(this.view, endOffset + 16);
      for (let index = 0; index < entryCount; index += 1) {
        if (readUint32(this.view, offset) !== 0x02014b50) throw new Error("xlsx压缩目录损坏");
        const method = readUint16(this.view, offset + 10);
        const compressedSize = readUint32(this.view, offset + 20);
        const nameLength = readUint16(this.view, offset + 28);
        const extraLength = readUint16(this.view, offset + 30);
        const commentLength = readUint16(this.view, offset + 32);
        const localOffset = readUint32(this.view, offset + 42);
        const name = decoder.decode(this.bytes.slice(offset + 46, offset + 46 + nameLength));
        this.entries.set(name.replace(/^\//, ""), { method, compressedSize, localOffset });
        offset += 46 + nameLength + extraLength + commentLength;
      }
    }

    async bytesFor(name) {
      const entry = this.entries.get(name.replace(/^\//, ""));
      if (!entry) throw new Error(`xlsx缺少文件：${name}`);
      const nameLength = readUint16(this.view, entry.localOffset + 26);
      const extraLength = readUint16(this.view, entry.localOffset + 28);
      const start = entry.localOffset + 30 + nameLength + extraLength;
      const compressed = this.bytes.slice(start, start + entry.compressedSize);
      if (entry.method === 0) return compressed;
      if (entry.method !== 8 || typeof DecompressionStream === "undefined") {
        throw new Error("当前浏览器无法解压xlsx，请使用最新版Chrome或Edge");
      }
      const stream = new Blob([compressed]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
      return new Uint8Array(await new Response(stream).arrayBuffer());
    }

    async text(name) {
      return decoder.decode(await this.bytesFor(name));
    }

    has(name) {
      return this.entries.has(name.replace(/^\//, ""));
    }
  }

  function xmlValue(value) {
    return String(value || "")
      .replaceAll("&amp;", "&")
      .replaceAll("&quot;", '"')
      .replaceAll("&apos;", "'")
      .replaceAll("&lt;", "<")
      .replaceAll("&gt;", ">");
  }

  function sheetDate(name) {
    const parts = String(name).replace(/\.+$/, "").split(".").map(Number);
    if (parts.some((value) => !Number.isInteger(value))) return null;
    let year;
    let month;
    let day;
    if (parts.length === 3) [year, month, day] = parts;
    else if (parts.length === 2) [month, day] = parts;
    else return null;
    year = year ? 2000 + year : 2026;
    const date = new Date(Date.UTC(year, month - 1, day));
    if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) return null;
    return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  }

  function allWorkbookSheets(workbookXml, relationsXml) {
    const relations = new Map();
    for (const matched of relationsXml.matchAll(/<Relationship\b[^>]*\bId="([^"]+)"[^>]*\bTarget="([^"]+)"[^>]*\/?\s*>/g)) {
      relations.set(matched[1], matched[2]);
    }
    const sheets = [];
    for (const matched of workbookXml.matchAll(/<sheet\b[^>]*\bname="([^"]+)"[^>]*\br:id="([^"]+)"[^>]*\/?\s*>/g)) {
      const name = xmlValue(matched[1]);
      const target = relations.get(matched[2]);
      if (!target) continue;
      const path = target.startsWith("/") ? target.slice(1) : `xl/${target.replace(/^\.\//, "")}`;
      sheets.push({ name, date: sheetDate(name), path });
    }
    return sheets;
  }

  function workbookSheets(workbookXml, relationsXml) {
    return allWorkbookSheets(workbookXml, relationsXml).filter((sheet) => sheet.date);
  }

  function parseSharedStrings(sharedStringsXml) {
    if (!sharedStringsXml) return [];
    const strings = [];
    for (const matched of sharedStringsXml.matchAll(/<si\b[^>]*>([\s\S]*?)<\/si>/g)) {
      const parts = [...matched[1].matchAll(/<t\b[^>]*>([\s\S]*?)<\/t>/g)].map((item) => xmlValue(item[1]));
      strings.push(parts.join(""));
    }
    return strings;
  }

  function worksheetCells(sheetXml, sharedStrings = []) {
    const cells = new Map();
    const populatedCellsXml = sheetXml.replace(/<c\b[^>]*\/>/g, "");
    for (const matched of populatedCellsXml.matchAll(/<c\b([^>]*)\br="([A-Z]+\d+)"([^>]*)>([\s\S]*?)<\/c>/g)) {
      const attributes = `${matched[1]} ${matched[3]}`;
      const body = matched[4];
      const type = /\bt="([^"]+)"/.exec(attributes)?.[1] || "";
      const raw = /<v>([^<]*)<\/v>/.exec(body)?.[1];
      let value = null;
      if (type === "s") value = sharedStrings[Number(raw)] ?? "";
      else if (type === "inlineStr") {
        value = [...body.matchAll(/<t\b[^>]*>([\s\S]*?)<\/t>/g)].map((item) => xmlValue(item[1])).join("");
      } else if (type === "str") value = xmlValue(raw || "");
      else value = finiteNumber(raw);
      cells.set(matched[2], value);
    }
    return cells;
  }

  function numericCells(sheetXml, addresses) {
    const values = new Map();
    for (const matched of sheetXml.matchAll(/<c\b[^>]*\br="([A-Z]+\d+)"[^>]*>([\s\S]*?)<\/c>/g)) {
      if (!addresses.has(matched[1])) continue;
      const value = /<v>([^<]*)<\/v>/.exec(matched[2]);
      values.set(matched[1], finiteNumber(value?.[1]));
    }
    return values;
  }

  function addDaysText(value, days) {
    const date = new Date(`${value}T00:00:00Z`);
    date.setUTCDate(date.getUTCDate() + days);
    return date.toISOString().slice(0, 10);
  }

  function completedThursday(value) {
    const date = new Date(`${value}T00:00:00Z`);
    return addDaysText(value, -((date.getUTCDay() - 4 + 7) % 7));
  }

  async function workbookContext(file) {
    if (!file || !/\.xlsx$/i.test(file.name || "")) throw new Error("请选择.xlsx格式的历史资料");
    if (file.size > 80 * 1024 * 1024) throw new Error("文件超过80MB，请先确认是否选错文件");
    const archive = new ZipArchive(await file.arrayBuffer());
    const [workbookXml, relationsXml, sharedStringsXml] = await Promise.all([
      archive.text("xl/workbook.xml"),
      archive.text("xl/_rels/workbook.xml.rels"),
      archive.has("xl/sharedStrings.xml") ? archive.text("xl/sharedStrings.xml") : Promise.resolve(""),
    ]);
    return {
      archive,
      sheets: allWorkbookSheets(workbookXml, relationsXml),
      sharedStrings: parseSharedStrings(sharedStringsXml),
    };
  }

  async function sheetCellMap(context, sheet) {
    return worksheetCells(await context.archive.text(sheet.path), context.sharedStrings);
  }

  async function detectWorkbookKind(file) {
    const context = await workbookContext(file);
    const sampleSheet = context.sheets.at(-1);
    if (!sampleSheet) throw new Error(`${file.name}没有可读取的工作表`);
    const cells = await sheetCellMap(context, sampleSheet);
    const title = String(cells.get("A1") || "").replace(/\s+/g, "");
    const secondRow = String(cells.get("A2") || "").replace(/\s+/g, "");
    if (/分厂公摊用电/.test(title)) return { kind: "public-source", context };
    if (/路灯用电总汇/.test(title)) return { kind: "road-source", context };
    if (/计量单位/.test(title) && /生活变办公楼总/.test(secondRow)) return { kind: "facilities-source", context };
    if (/电气周报/.test(title)) return { kind: "weekly", context };
    if (/月.*用电|用电.*月|月.*汇总/.test(title)) return { kind: "monthly", context };
    if (context.sheets.filter((sheet) => sheet.date).length >= 2) return { kind: "daily", context };
    throw new Error(`${file.name}无法识别为日报、周报或月报`);
  }

  async function parseWeeklyReference(file, context) {
    const weekly = [];
    for (const sheet of context.sheets) {
      if (!sheet.date) continue;
      const cells = await sheetCellMap(context, sheet);
      const title = String(cells.get("A1") || "").replace(/\s+/g, "");
      const values = ["C6", "D6", "E6", "F6", "G6", "H6"].map((address) => finiteNumber(cells.get(address)));
      if (!/电气周报/.test(title) || values.some((value) => value === null)) continue;
      const endDate = completedThursday(sheet.date);
      weekly.push({
        startDate: addDaysText(endDate, -6),
        endDate,
        sourceSheet: sheet.name,
        sourceFile: file.name,
        units: Object.fromEntries(WEEKLY_REPORT_UNITS.map((unit, index) => [unit.id, values[index]])),
        production: Object.fromEntries(WEEKLY_REPORT_UNITS.map((unit, index) => [unit.id, finiteNumber(cells.get(`${String.fromCharCode(67 + index)}4`)) || 0])),
      });
    }
    if (!weekly.length) throw new Error(`${file.name}没有识别到周报用电量`);
    return weekly;
  }

  function monthFromTitle(title) {
    const matched = /(20\d{2})年-?(\d{1,2})月/.exec(String(title || "").replace(/\s+/g, ""));
    return matched ? `${matched[1]}-${String(Number(matched[2])).padStart(2, "0")}` : null;
  }

  function monthFromSourceSheet(name, defaultYear = null) {
    const text = String(name || "").replace(/\s+/g, "");
    let matched = /^(20\d{2})年(\d{1,2})月/.exec(text);
    if (matched) return `${matched[1]}-${String(Number(matched[2])).padStart(2, "0")}`;
    matched = /^(\d{2})[.年](\d{1,2})(?:\.\d{1,2})?月/.exec(text);
    if (matched) {
      const month = Number(matched[2]);
      return month >= 1 && month <= 12 ? `${2000 + Number(matched[1])}-${String(month).padStart(2, "0")}` : null;
    }
    matched = /^(\d{1,2})\.(\d{1,2})月/.exec(text);
    if (!matched || !defaultYear) return null;
    const month = Number(matched[1]);
    return month >= 1 && month <= 12 ? `${defaultYear}-${String(month).padStart(2, "0")}` : null;
  }

  function sourceNumber(cells, address) {
    return finiteNumber(cells.get(address)) || 0;
  }

  async function parsePublicSource(file, context) {
    const daily = {};
    const monthly = {};
    const laboratoryByMonth = {};
    for (const sheet of context.sheets) {
      if (sheet.date) {
        const cells = await sheetCellMap(context, sheet);
        const commonShare = finiteNumber(cells.get("H21"));
        if (commonShare === null) continue;
        daily[sheet.date] = {
          commonShare,
          publicAirShare: sourceNumber(cells, "H23") / 4,
          fullCommonShare: sourceNumber(cells, "I4"),
          laboratory: sourceNumber(cells, "G17"),
          sourceFile: file.name,
          sourceSheet: sheet.name,
        };
        const month = sheet.date.slice(0, 7);
        laboratoryByMonth[month] = (laboratoryByMonth[month] || 0) + sourceNumber(cells, "G17");
        continue;
      }
      const month = monthFromSourceSheet(sheet.name, 2026);
      if (!month) continue;
      const cells = await sheetCellMap(context, sheet);
      monthly[month] = {
        dormitory: sourceNumber(cells, "I130"),
        lowVoltage10: sourceNumber(cells, "G134"),
        hanDining: sourceNumber(cells, "G135"),
        garage: sourceNumber(cells, "L136"),
        shed: sourceNumber(cells, "G140"),
        repairRoom: sourceNumber(cells, "G141"),
        rollerRoom: sourceNumber(cells, "G142"),
        lifePump: sourceNumber(cells, "G143"),
        exchangeStation: sourceNumber(cells, "G144"),
        reservoir: sourceNumber(cells, "G145"),
        airEnergy: sourceNumber(cells, "G146"),
        waterWells: sourceNumber(cells, "F29") - sourceNumber(cells, "G24") + sourceNumber(cells, "G131"),
        sourceFile: file.name,
        sourceSheet: sheet.name,
      };
    }
    Object.entries(laboratoryByMonth).forEach(([month, laboratory]) => {
      monthly[month] = { ...(monthly[month] || {}), laboratory };
    });
    if (!Object.keys(daily).length) throw new Error(`${file.name}没有识别到公摊日数据`);
    return { daily, monthly };
  }

  async function parseRoadSource(file, context) {
    const monthly = {};
    for (const sheet of context.sheets) {
      const month = monthFromSourceSheet(sheet.name);
      if (!month) continue;
      const cells = await sheetCellMap(context, sheet);
      const usage = finiteNumber(cells.get("G18"));
      if (usage === null) continue;
      monthly[month] = { usage, sourceFile: file.name, sourceSheet: sheet.name };
    }
    if (!Object.keys(monthly).length) throw new Error(`${file.name}没有识别到月度路灯数据`);
    return monthly;
  }

  async function parseFacilitiesSource(file, context) {
    const monthly = {};
    for (const sheet of context.sheets) {
      const month = monthFromSourceSheet(sheet.name);
      if (!month) continue;
      const cells = await sheetCellMap(context, sheet);
      const office = finiteNumber(cells.get("I2"));
      const dining = finiteNumber(cells.get("I12"));
      if (office === null && dining === null) continue;
      monthly[month] = {
        office: office || 0,
        dining: dining || 0,
        sourceFile: file.name,
        sourceSheet: sheet.name,
      };
    }
    if (!Object.keys(monthly).length) throw new Error(`${file.name}没有识别到办公楼、清餐月度数据`);
    return monthly;
  }

  async function parseMonthlyReference(file, context) {
    const sheet = context.sheets[0];
    const cells = await sheetCellMap(context, sheet);
    const title = String(cells.get("A1") || "").replace(/\s+/g, "");
    const month = monthFromTitle(title);
    if (!month) throw new Error(`${file.name}没有识别到月报月份`);
    if (/环锭纺/.test(title)) {
      return {
        month,
        type: "ring",
        sourceFile: file.name,
        productionUnits: {
          "factory-1": finiteNumber(cells.get("L64")) || 0,
          "factory-2": finiteNumber(cells.get("M64")) || 0,
          "factory-3": finiteNumber(cells.get("N64")) || 0,
          "factory-4-air": finiteNumber(cells.get("S64")) || 0,
          "factory-4-vortex": finiteNumber(cells.get("T64")) || 0,
          "factory-7": finiteNumber(cells.get("P64")) || 0,
        },
        managementTotal: finiteNumber(cells.get("D54")) || 0,
        openingRoom: finiteNumber(cells.get("R16")) || 0,
        companyTotal: finiteNumber(cells.get("R65")) || 0,
      };
    }
    if (/涡流纺/.test(title)) {
      return {
        month,
        type: "vortex",
        sourceFile: file.name,
        vortexTotal: finiteNumber(cells.get("C17")) || 0,
      };
    }
    return {
      month,
      type: "summary",
      sourceFile: file.name,
      managementTotal: finiteNumber(cells.get("I12")) || 0,
      managementShare: finiteNumber(cells.get("C12")) || 0,
      openingRoom: finiteNumber(cells.get("H13")) || 0,
      companyTotal: finiteNumber(cells.get("I13")) || 0,
      factories: {
        "factory-1": finiteNumber(cells.get("C13")) || 0,
        "factory-2": finiteNumber(cells.get("D13")) || 0,
        "factory-3": finiteNumber(cells.get("E13")) || 0,
        "factory-4": finiteNumber(cells.get("F13")) || 0,
        "factory-7": finiteNumber(cells.get("G13")) || 0,
      },
    };
  }

  async function parseReferenceFile(file) {
    const detected = await detectWorkbookKind(file);
    if (detected.kind === "weekly") return { kind: "weekly", data: await parseWeeklyReference(file, detected.context) };
    if (detected.kind === "monthly") return { kind: "monthly", data: await parseMonthlyReference(file, detected.context) };
    if (detected.kind === "public-source") return { kind: "public-source", data: await parsePublicSource(file, detected.context) };
    if (detected.kind === "road-source") return { kind: "road-source", data: await parseRoadSource(file, detected.context) };
    if (detected.kind === "facilities-source") return { kind: "facilities-source", data: await parseFacilitiesSource(file, detected.context) };
    return { kind: "daily", data: null };
  }

  async function parseWorkbook(file, companyData, onProgress = () => {}) {
    if (!file || !/\.xlsx$/i.test(file.name || "")) throw new Error("请选择.xlsx格式的原始基础数据表");
    if (file.size > 80 * 1024 * 1024) throw new Error("文件超过80MB，请先确认是否选错文件");
    const archive = new ZipArchive(await file.arrayBuffer());
    const [workbookXml, relationsXml] = await Promise.all([
      archive.text("xl/workbook.xml"),
      archive.text("xl/_rels/workbook.xml.rels"),
    ]);
    const sheets = workbookSheets(workbookXml, relationsXml);
    if (sheets.length < 2) throw new Error("没有识别到按日期命名的历史工作表");

    const mapping = (companyData.factories || []).map((factory) => ({
      factory,
      meters: factory.meters.map((meter) => ({
        meter,
        startAddress: shiftAddress(meter.source_cell, 1),
        endAddress: shiftAddress(meter.source_cell, 2),
      })),
    }));
    const addresses = new Set(mapping.flatMap((factory) => factory.meters.flatMap((item) => [item.startAddress, item.endAddress])));
    Object.values(OFFICIAL_PROCESS_CELLS).flat().forEach(([, address]) => addresses.add(address));
    Object.values(OFFICIAL_TOTAL_CELLS).flat().forEach((address) => addresses.add(address));
    Object.values(OFFICIAL_UNIT_CELLS).flat().forEach(([, address]) => addresses.add(address));
    REPORT_AUXILIARY_CELLS.forEach((address) => addresses.add(address));
    const byDate = new Map();

    for (let index = 0; index < sheets.length; index += 1) {
      const sheet = sheets[index];
      const cells = numericCells(await archive.text(sheet.path), addresses);
      const records = [];
      let positiveCount = 0;
      mapping.forEach(({ factory, meters }) => {
        let totalUsage = 0;
        const readings = meters.map(({ meter, startAddress, endAddress }) => {
          const start = cells.get(startAddress) ?? null;
          const end = cells.get(endAddress) ?? null;
          if (start !== null && end !== null && end > start) {
            positiveCount += 1;
            totalUsage += (end - start) * Number(meter.multiplier || 0);
          }
          const status = meter.required && (start === null || end === null || end < start) ? "other" : "normal";
          return [start, end, status];
        });
        const officialRows = (OFFICIAL_PROCESS_CELLS[factory.id] || [])
          .map(([process, address]) => [process, cells.get(address) ?? null])
          .filter(([, usage]) => usage !== null);
        const officialTotal = (OFFICIAL_TOTAL_CELLS[factory.id] || [])
          .reduce((sum, address) => sum + (cells.get(address) || 0), 0);
        const officialUnits = factory.id === "factory-4"
          ? OFFICIAL_UNIT_CELLS[factory.id].map(([name, address]) => [name, cells.get(address) || 0])
          : [[factory.name, officialTotal || officialRows.reduce((sum, [, usage]) => sum + usage, 0) || totalUsage]];
        const commonFourFactory = cells.get("M22") || 0;
        const productionBase = factory.id === "factory-2"
          ? officialTotal - (cells.get("F16") || 0)
          : factory.id === "factory-3"
            ? officialTotal - (cells.get("J15") || 0)
            : factory.id === "factory-4"
              ? officialTotal - commonFourFactory
              : officialTotal;
        const reportUnits = factory.id === "factory-4"
          ? OFFICIAL_UNIT_CELLS[factory.id].map(([name, address]) => [name, (cells.get(address) || 0) - commonFourFactory / 2 + commonFourFactory])
          : [[factory.name, (productionBase || officialRows.reduce((sum, [, usage]) => sum + usage, 0) || totalUsage) + commonFourFactory]];
        const reportTotal = reportUnits.reduce((sum, [, usage]) => sum + usage, 0);
        const monthlyUnits = factory.id === "factory-4"
          ? officialUnits
          : [[factory.name, factory.id === "factory-3" ? officialTotal - (cells.get("J15") || 0) : officialTotal]];
        const monthlyTotal = monthlyUnits.reduce((sum, [, usage]) => sum + usage, 0);
        records.push({
          key: `${sheet.date}|${factory.id}`,
          date: sheet.date,
          factoryId: factory.id,
          source: "import",
          completed: true,
          readings,
          totalUsage,
          officialTotal: officialTotal || officialRows.reduce((sum, [, usage]) => sum + usage, 0) || totalUsage,
          officialRows,
          officialUnits,
          reportTotal,
          reportUnits,
          monthlyTotal,
          monthlyUnits,
          commonShare: commonFourFactory,
          reportAdjustments: {
            excludedNetFiber: factory.id === "factory-2" ? cells.get("F16") || 0 : 0,
            excludedOpeningRoom: factory.id === "factory-3" ? cells.get("J15") || 0 : 0,
            excludedFourFactoryCommon: factory.id === "factory-4" ? commonFourFactory : 0,
            includedCommonShare: commonFourFactory,
          },
        });
      });
      const previous = byDate.get(sheet.date);
      if (!previous || positiveCount > previous.positiveCount) byDate.set(sheet.date, { records, positiveCount, sheetName: sheet.name });
      onProgress({ current: index + 1, total: sheets.length, date: sheet.date, percent: Math.round(((index + 1) / sheets.length) * 100) });
    }

    const ordered = [...byDate.entries()].sort((a, b) => a[0].localeCompare(b[0]));
    const completedThrough = [...ordered].reverse().find(([, day]) => day.positiveCount > 0)?.[0] || null;
    ordered.forEach(([date, day]) => {
      if (day.positiveCount > 0 || (completedThrough && date <= completedThrough)) return;
      day.records.forEach((record) => {
        record.completed = false;
        record.totalUsage = 0;
        record.readings = record.readings.map(([start, end, status]) => [start ?? end, null, status]);
      });
    });
    const records = ordered.flatMap(([, day]) => day.records);
    return {
      records,
      meta: {
        key: "import",
        fileName: file.name,
        importedAt: new Date().toISOString(),
        firstDate: ordered[0][0],
        lastDate: ordered.at(-1)[0],
        completedThrough,
        dayCount: ordered.length,
        sheetCount: sheets.length,
        meterCount: (companyData.factories || []).reduce((sum, factory) => sum + factory.meters.length, 0),
        schemaVersion: 6,
        reportBasis: "周报生产区加公摊；月报生产区加管理生活区",
      },
    };
  }

  async function storeImport(parsed, companyData) {
    const database = await openDatabase();
    try {
      const existingTransaction = database.transaction(DAILY_STORE, "readonly");
      const existing = await requestResult(existingTransaction.objectStore(DAILY_STORE).getAll());
      const factoryById = new Map((companyData.factories || []).map((factory) => [factory.id, factory]));
      const manual = existing.filter((record) => record.source === "manual").map((record) => {
        const factory = factoryById.get(record.factoryId);
        if (!factory || (Array.isArray(record.officialRows) && Array.isArray(record.officialUnits) && Array.isArray(record.reportUnits)
          && Array.isArray(record.monthlyUnits) && Number.isFinite(Number(record.monthlyTotal)) && record.commonShare !== undefined)) return record;
        return compactRows(record.date, record.factoryId, expandRecord(record, factory), "manual");
      });
      const importedDates = new Set(parsed.records.map((record) => record.date));
      const extraManualDates = new Set();
      manual.forEach((record) => {
        if (!importedDates.has(record.date)) extraManualDates.add(record.date);
        if (!parsed.meta.firstDate || record.date < parsed.meta.firstDate) parsed.meta.firstDate = record.date;
        if (!parsed.meta.lastDate || record.date > parsed.meta.lastDate) parsed.meta.lastDate = record.date;
        if (record.completed && (!parsed.meta.completedThrough || record.date > parsed.meta.completedThrough)) parsed.meta.completedThrough = record.date;
      });
      parsed.meta.dayCount += extraManualDates.size;
      const manualKeys = new Set(manual.map((record) => record.key));
      const transaction = database.transaction([DAILY_STORE, META_STORE], "readwrite");
      const daily = transaction.objectStore(DAILY_STORE);
      daily.clear();
      manual.forEach((record) => daily.put(record));
      parsed.records.filter((record) => !manualKeys.has(record.key)).forEach((record) => daily.put(record));
      transaction.objectStore(META_STORE).put(parsed.meta);
      await transactionDone(transaction);
      return parsed.meta;
    } finally {
      database.close();
    }
  }

  async function importWorkbook(file, companyData, onProgress) {
    return storeImport(await parseWorkbook(file, companyData, onProgress), companyData);
  }

  async function importFiles(files, companyData, onProgress = () => {}) {
    const selectedFiles = [...files];
    if (!selectedFiles.length) throw new Error("请选择要导入的Excel资料");
    let referenceData = await getReferenceData();
    referenceData.sources = referenceData.sources || { publicDaily: {}, publicMonthly: {}, roadMonthly: {}, facilitiesMonthly: {} };
    let meta = await getMeta();
    const imported = [];
    let referenceChanged = false;
    for (let index = 0; index < selectedFiles.length; index += 1) {
      const file = selectedFiles[index];
      onProgress({ phase: "detect", fileName: file.name, fileIndex: index + 1, fileTotal: selectedFiles.length });
      const detected = await detectWorkbookKind(file);
      if (detected.kind === "daily") {
        meta = await importWorkbook(file, companyData, (progress) => onProgress({
          ...progress,
          phase: "daily",
          fileName: file.name,
          fileIndex: index + 1,
          fileTotal: selectedFiles.length,
        }));
        imported.push(`日报底表：${file.name}`);
        continue;
      }
      if (detected.kind === "weekly") {
        const weekly = await parseWeeklyReference(file, detected.context);
        const merged = new Map((referenceData.weekly || []).map((item) => [`${item.startDate}|${item.endDate}`, item]));
        weekly.forEach((item) => merged.set(`${item.startDate}|${item.endDate}`, item));
        referenceData.weekly = [...merged.values()].sort((a, b) => a.startDate.localeCompare(b.startDate));
        referenceChanged = true;
        imported.push(`历史周报：${weekly.length}周`);
        continue;
      }
      if (detected.kind === "public-source") {
        const source = await parsePublicSource(file, detected.context);
        referenceData.sources.publicDaily = { ...referenceData.sources.publicDaily, ...source.daily };
        referenceData.sources.publicMonthly = { ...referenceData.sources.publicMonthly, ...source.monthly };
        referenceChanged = true;
        imported.push(`五厂公摊：${Object.keys(source.daily).length}天`);
        continue;
      }
      if (detected.kind === "road-source") {
        const monthly = await parseRoadSource(file, detected.context);
        referenceData.sources.roadMonthly = { ...referenceData.sources.roadMonthly, ...monthly };
        referenceChanged = true;
        imported.push(`路灯月度：${Object.keys(monthly).length}个月`);
        continue;
      }
      if (detected.kind === "facilities-source") {
        const monthly = await parseFacilitiesSource(file, detected.context);
        referenceData.sources.facilitiesMonthly = { ...referenceData.sources.facilitiesMonthly, ...monthly };
        referenceChanged = true;
        imported.push(`办公楼/清餐：${Object.keys(monthly).length}个月`);
        continue;
      }
      const monthly = await parseMonthlyReference(file, detected.context);
      const current = referenceData.monthly?.[monthly.month] || {};
      referenceData.monthly = referenceData.monthly || {};
      referenceData.monthly[monthly.month] = { ...current, [monthly.type]: monthly };
      referenceChanged = true;
      imported.push(`${monthly.month}月报：${monthly.type}`);
    }
    if (referenceChanged) await saveReferenceData(referenceData);
    return { meta: meta || await getMeta(), referenceData, imported };
  }

  function expandRecord(record, factory) {
    if (!record || !factory) return null;
    return factory.meters.map((meter, index) => {
      const [start, end, statusCode = "normal"] = record.readings[index] || [];
      const difference = start !== null && end !== null && end >= start ? end - start : null;
      const usage = difference === null ? null : difference * Number(meter.multiplier || 0);
      return {
        meter_id: meter.meter_id,
        order_no: meter.order_no,
        name: meter.name,
        category: meter.category,
        process: standardProcess(meter),
        panel: meter.panel,
        room: standardRoom(meter.panel),
        ratio_text: meter.ratio_text,
        multiplier: meter.multiplier,
        required: meter.required,
        expected_start: start,
        start,
        end,
        difference,
        usage,
        warning: "",
        status_code: statusCode,
      };
    });
  }

  global.PowerMeterData = {
    buildWeeklyHistory,
    compactRows,
    expandRecord,
    getDate,
    getDay,
    getLatestBefore,
    getMeta,
    getReferenceData,
    getRange,
    importFiles,
    importWorkbook,
    parseWorkbook,
    parseReferenceFile,
    saveRows,
    officialProcessNames,
    standardProcess,
    standardRoom,
  };
})(typeof window === "undefined" ? globalThis : window);
