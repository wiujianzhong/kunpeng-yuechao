"use strict";

(function initializePowerMeterData(global) {
  const DB_NAME = "power-meter-history-v1";
  const DB_VERSION = 1;
  const DAILY_STORE = "daily";
  const META_STORE = "meta";
  const decoder = new TextDecoder("utf-8");

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

  function compactRows(date, factoryId, rows, source = "manual") {
    const readings = rows.map((row) => [
      finiteNumber(row.start),
      finiteNumber(row.end),
      row.status_code || "normal",
    ]);
    const totalUsage = rows.reduce((sum, row) => sum + (finiteNumber(row.usage ?? row._usage) || 0), 0);
    return {
      key: `${date}|${factoryId}`,
      date,
      factoryId,
      source,
      completed: rows.some((row) => finiteNumber(row.end) !== null),
      readings,
      totalUsage,
      updatedAt: new Date().toISOString(),
    };
  }

  async function saveRows(date, factoryId, rows, source = "manual") {
    const database = await openDatabase();
    try {
      const transaction = database.transaction(DAILY_STORE, "readwrite");
      transaction.objectStore(DAILY_STORE).put(compactRows(date, factoryId, rows, source));
      await transactionDone(transaction);
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

  function workbookSheets(workbookXml, relationsXml) {
    const relations = new Map();
    for (const matched of relationsXml.matchAll(/<Relationship\b[^>]*\bId="([^"]+)"[^>]*\bTarget="([^"]+)"[^>]*\/?\s*>/g)) {
      relations.set(matched[1], matched[2]);
    }
    const sheets = [];
    for (const matched of workbookXml.matchAll(/<sheet\b[^>]*\bname="([^"]+)"[^>]*\br:id="([^"]+)"[^>]*\/?\s*>/g)) {
      const date = sheetDate(xmlValue(matched[1]));
      const target = relations.get(matched[2]);
      if (!date || !target) continue;
      const path = target.startsWith("/") ? target.slice(1) : `xl/${target.replace(/^\.\//, "")}`;
      sheets.push({ name: xmlValue(matched[1]), date, path });
    }
    return sheets;
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
        records.push({
          key: `${sheet.date}|${factory.id}`,
          date: sheet.date,
          factoryId: factory.id,
          source: "import",
          completed: true,
          readings,
          totalUsage,
        });
      });
      const previous = byDate.get(sheet.date);
      if (!previous || positiveCount > previous.positiveCount) byDate.set(sheet.date, { records, positiveCount, sheetName: sheet.name });
      onProgress({ current: index + 1, total: sheets.length, date: sheet.date, percent: Math.round(((index + 1) / sheets.length) * 100) });
    }

    const ordered = [...byDate.entries()].sort((a, b) => a[0].localeCompare(b[0]));
    ordered.forEach(([, day]) => {
      if (day.positiveCount > 0) return;
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
        completedThrough: [...ordered].reverse().find(([, day]) => day.positiveCount > 0)?.[0] || null,
        dayCount: ordered.length,
        sheetCount: sheets.length,
        meterCount: (companyData.factories || []).reduce((sum, factory) => sum + factory.meters.length, 0),
      },
    };
  }

  async function storeImport(parsed) {
    const database = await openDatabase();
    try {
      const existingTransaction = database.transaction(DAILY_STORE, "readonly");
      const existing = await requestResult(existingTransaction.objectStore(DAILY_STORE).getAll());
      const manual = existing.filter((record) => record.source === "manual");
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
    return storeImport(await parseWorkbook(file, companyData, onProgress));
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
        panel: meter.panel,
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
    compactRows,
    expandRecord,
    getDate,
    getDay,
    getLatestBefore,
    getMeta,
    getRange,
    importWorkbook,
    parseWorkbook,
    saveRows,
  };
})(typeof window === "undefined" ? globalThis : window);
