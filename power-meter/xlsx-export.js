"use strict";

(function initializePowerMeterXlsx(global) {
  const encoder = new TextEncoder();
  const CRC_TABLE = Array.from({ length: 256 }, (_, value) => {
    let current = value;
    for (let bit = 0; bit < 8; bit += 1) {
      current = (current & 1) ? (0xedb88320 ^ (current >>> 1)) : (current >>> 1);
    }
    return current >>> 0;
  });

  function xmlEscape(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&apos;");
  }

  function columnName(index) {
    let value = index;
    let name = "";
    while (value > 0) {
      const remainder = (value - 1) % 26;
      name = String.fromCharCode(65 + remainder) + name;
      value = Math.floor((value - 1) / 26);
    }
    return name;
  }

  function numberValue(value) {
    if (value === null || value === undefined || value === "") return null;
    const number = Number(value);
    return Number.isFinite(number) ? number : null;
  }

  function crc32(bytes) {
    let crc = 0xffffffff;
    for (const byte of bytes) crc = CRC_TABLE[(crc ^ byte) & 0xff] ^ (crc >>> 8);
    return (crc ^ 0xffffffff) >>> 0;
  }

  function uint16(value) {
    const bytes = new Uint8Array(2);
    new DataView(bytes.buffer).setUint16(0, value, true);
    return bytes;
  }

  function uint32(value) {
    const bytes = new Uint8Array(4);
    new DataView(bytes.buffer).setUint32(0, value >>> 0, true);
    return bytes;
  }

  function concatBytes(parts) {
    const length = parts.reduce((total, part) => total + part.length, 0);
    const output = new Uint8Array(length);
    let offset = 0;
    parts.forEach((part) => {
      output.set(part, offset);
      offset += part.length;
    });
    return output;
  }

  function dosTimestamp(date = new Date()) {
    const year = Math.max(1980, date.getFullYear());
    const time = (date.getHours() << 11) | (date.getMinutes() << 5) | Math.floor(date.getSeconds() / 2);
    const day = (year - 1980) << 9 | (date.getMonth() + 1) << 5 | date.getDate();
    return { time, day };
  }

  function createZip(files) {
    const localParts = [];
    const centralParts = [];
    let offset = 0;
    const stamp = dosTimestamp();

    files.forEach(({ name, content }) => {
      const nameBytes = encoder.encode(name);
      const data = typeof content === "string" ? encoder.encode(content) : content;
      const crc = crc32(data);
      const localHeader = concatBytes([
        uint32(0x04034b50), uint16(20), uint16(0), uint16(0), uint16(stamp.time), uint16(stamp.day),
        uint32(crc), uint32(data.length), uint32(data.length), uint16(nameBytes.length), uint16(0),
      ]);
      localParts.push(localHeader, nameBytes, data);

      const centralHeader = concatBytes([
        uint32(0x02014b50), uint16(20), uint16(20), uint16(0), uint16(0), uint16(stamp.time), uint16(stamp.day),
        uint32(crc), uint32(data.length), uint32(data.length), uint16(nameBytes.length), uint16(0), uint16(0),
        uint16(0), uint16(0), uint32(0), uint32(offset),
      ]);
      centralParts.push(centralHeader, nameBytes);
      offset += localHeader.length + nameBytes.length + data.length;
    });

    const centralDirectory = concatBytes(centralParts);
    const end = concatBytes([
      uint32(0x06054b50), uint16(0), uint16(0), uint16(files.length), uint16(files.length),
      uint32(centralDirectory.length), uint32(offset), uint16(0),
    ]);
    return concatBytes([...localParts, centralDirectory, end]);
  }

  class SheetBuilder {
    constructor() {
      this.rows = new Map();
      this.rowHeights = new Map();
      this.merges = [];
      this.maxRow = 1;
      this.maxColumn = 1;
    }

    add(row, column, value, style = 0, options = {}) {
      const ref = `${columnName(column)}${row}`;
      const cells = this.rows.get(row) || [];
      const type = options.type || (numberValue(value) !== null && value !== "" ? "number" : "text");
      let xml;
      if (options.formula) {
        const cached = numberValue(options.cached);
        xml = `<c r="${ref}" s="${style}"><f>${xmlEscape(options.formula)}</f>${cached === null ? "" : `<v>${cached}</v>`}</c>`;
      } else if (type === "number") {
        const number = numberValue(value);
        xml = number === null ? `<c r="${ref}" s="${style}"/>` : `<c r="${ref}" s="${style}"><v>${number}</v></c>`;
      } else if (value === null || value === undefined || value === "") {
        xml = `<c r="${ref}" s="${style}"/>`;
      } else {
        xml = `<c r="${ref}" s="${style}" t="inlineStr"><is><t xml:space="preserve">${xmlEscape(value)}</t></is></c>`;
      }
      cells.push({ column, xml });
      this.rows.set(row, cells);
      this.maxRow = Math.max(this.maxRow, row);
      this.maxColumn = Math.max(this.maxColumn, column);
    }

    merge(row, startColumn, endColumn, value, style, height = null) {
      for (let column = startColumn; column <= endColumn; column += 1) {
        this.add(row, column, column === startColumn ? value : "", style);
      }
      this.merges.push(`${columnName(startColumn)}${row}:${columnName(endColumn)}${row}`);
      if (height) this.rowHeights.set(row, height);
    }

    setHeight(row, height) {
      this.rowHeights.set(row, height);
    }

    xml({ columns, freezeRow = 0, autoFilter = "" }) {
      const rows = [...this.rows.entries()].sort((a, b) => a[0] - b[0]).map(([row, cells]) => {
        const height = this.rowHeights.get(row);
        const attributes = height ? ` ht="${height}" customHeight="1"` : "";
        const content = cells.sort((a, b) => a.column - b.column).map((cell) => cell.xml).join("");
        return `<row r="${row}"${attributes}>${content}</row>`;
      }).join("");
      const columnXml = columns.map((column, index) => {
        const hidden = column.hidden ? ' hidden="1"' : "";
        return `<col min="${index + 1}" max="${index + 1}" width="${column.width}" customWidth="1"${hidden}/>`;
      }).join("");
      const pane = freezeRow ? `<pane ySplit="${freezeRow}" topLeftCell="A${freezeRow + 1}" activePane="bottomLeft" state="frozen"/>` : "";
      const mergeXml = this.merges.length
        ? `<mergeCells count="${this.merges.length}">${this.merges.map((ref) => `<mergeCell ref="${ref}"/>`).join("")}</mergeCells>`
        : "";
      return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <sheetPr><pageSetUpPr fitToPage="1"/></sheetPr>
  <dimension ref="A1:${columnName(this.maxColumn)}${this.maxRow}"/>
  <sheetViews><sheetView showGridLines="0" workbookViewId="0">${pane}</sheetView></sheetViews>
  <sheetFormatPr defaultRowHeight="20"/>
  <cols>${columnXml}</cols>
  <sheetData>${rows}</sheetData>
  ${autoFilter ? `<autoFilter ref="${autoFilter}"/>` : ""}
  ${mergeXml}
  <pageMargins left="0.3" right="0.3" top="0.5" bottom="0.5" header="0.2" footer="0.2"/>
  <pageSetup orientation="landscape" fitToWidth="1" fitToHeight="0" paperSize="9"/>
</worksheet>`;
    }
  }

  const STYLES_XML = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <numFmts count="2"><numFmt numFmtId="164" formatCode="#,##0.00"/><numFmt numFmtId="165" formatCode="0.0%"/></numFmts>
  <fonts count="8">
    <font><sz val="10"/><name val="Microsoft YaHei"/><family val="2"/></font>
    <font><b/><color rgb="FFFFFFFF"/><sz val="18"/><name val="Microsoft YaHei"/></font>
    <font><b/><color rgb="FFFFFFFF"/><sz val="10"/><name val="Microsoft YaHei"/></font>
    <font><b/><color rgb="FF123F46"/><sz val="11"/><name val="Microsoft YaHei"/></font>
    <font><b/><color rgb="FF1F6269"/><sz val="12"/><name val="Microsoft YaHei"/></font>
    <font><b/><color rgb="FF123F46"/><sz val="16"/><name val="Microsoft YaHei"/></font>
    <font><b/><color rgb="FF7A5200"/><sz val="10"/><name val="Microsoft YaHei"/></font>
    <font><color rgb="FF687B80"/><sz val="9"/><name val="Microsoft YaHei"/></font>
  </fonts>
  <fills count="8">
    <fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FF123F46"/><bgColor indexed="64"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FF1F6269"/><bgColor indexed="64"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFE8EEF5"/><bgColor indexed="64"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFFFF4D8"/><bgColor indexed="64"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFE6F1F0"/><bgColor indexed="64"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFFFF0EE"/><bgColor indexed="64"/></patternFill></fill>
  </fills>
  <borders count="3">
    <border><left/><right/><top/><bottom/><diagonal/></border>
    <border><left/><right/><top/><bottom style="thin"><color rgb="FFD9E2E3"/></bottom><diagonal/></border>
    <border><left style="thin"><color rgb="FFBBC8CA"/></left><right style="thin"><color rgb="FFBBC8CA"/></right><top style="thin"><color rgb="FFBBC8CA"/></top><bottom style="thin"><color rgb="FFBBC8CA"/></bottom><diagonal/></border>
  </borders>
  <cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>
  <cellXfs count="16">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>
    <xf numFmtId="0" fontId="1" fillId="2" borderId="0" xfId="0" applyAlignment="1"><alignment horizontal="center" vertical="center"/></xf>
    <xf numFmtId="0" fontId="3" fillId="4" borderId="0" xfId="0" applyAlignment="1"><alignment horizontal="center" vertical="center"/></xf>
    <xf numFmtId="0" fontId="2" fillId="3" borderId="2" xfId="0" applyAlignment="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf>
    <xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyAlignment="1"><alignment vertical="center" wrapText="1"/></xf>
    <xf numFmtId="164" fontId="0" fillId="0" borderId="1" xfId="0" applyNumberFormat="1" applyAlignment="1"><alignment horizontal="right" vertical="center"/></xf>
    <xf numFmtId="0" fontId="6" fillId="5" borderId="1" xfId="0" applyAlignment="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf>
    <xf numFmtId="0" fontId="2" fillId="3" borderId="2" xfId="0" applyAlignment="1"><alignment horizontal="center" vertical="center"/></xf>
    <xf numFmtId="164" fontId="5" fillId="5" borderId="2" xfId="0" applyNumberFormat="1" applyAlignment="1"><alignment horizontal="center" vertical="center"/></xf>
    <xf numFmtId="0" fontId="4" fillId="6" borderId="0" xfId="0" applyAlignment="1"><alignment vertical="center"/></xf>
    <xf numFmtId="165" fontId="0" fillId="0" borderId="1" xfId="0" applyNumberFormat="1" applyAlignment="1"><alignment horizontal="right" vertical="center"/></xf>
    <xf numFmtId="0" fontId="6" fillId="5" borderId="2" xfId="0" applyAlignment="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf>
    <xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyAlignment="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf>
    <xf numFmtId="0" fontId="7" fillId="0" borderId="0" xfId="0" applyAlignment="1"><alignment vertical="center" wrapText="1"/></xf>
    <xf numFmtId="0" fontId="6" fillId="7" borderId="1" xfId="0" applyAlignment="1"><alignment vertical="center" wrapText="1"/></xf>
    <xf numFmtId="164" fontId="0" fillId="0" borderId="2" xfId="0" applyNumberFormat="1" applyAlignment="1"><alignment horizontal="right" vertical="center"/></xf>
  </cellXfs>
  <cellStyles count="1"><cellStyle name="常规" xfId="0" builtinId="0"/></cellStyles>
  <dxfs count="0"/><tableStyles count="0" defaultTableStyle="TableStyleMedium2" defaultPivotStyle="PivotStyleLight16"/>
</styleSheet>`;

  function buildDailySheet(report) {
    const sheet = new SheetBuilder();
    const modeText = report.testMode ? "测试预览（不计入正式记录）" : "正式日报";
    sheet.merge(1, 1, 9, `${report.company}用电日报`, 1, 34);
    sheet.merge(2, 1, 9, `${report.factoryName}｜抄表日期：${report.date}｜${modeText}`, 2, 24);
    sheet.merge(3, 1, 9, report.testMode ? "测试数据与正式数据完全隔离，仅供试填和演示" : "读数经系统校验后保存，异常现场情况已如实保留", report.testMode ? 11 : 9, 24);
    const headers = ["序号", "计量点", "分类", "变比", "昨日读数", "今日读数", "差数", "用电量(kWh)", "现场情况"];
    headers.forEach((header, index) => sheet.add(5, index + 1, header, 3));
    sheet.setHeight(5, 26);

    const firstDataRow = 6;
    report.rows.forEach((item, index) => {
      const row = firstDataRow + index;
      const warningStyle = item.note ? 6 : 12;
      sheet.add(row, 1, item.orderNo, 12, { type: "number" });
      sheet.add(row, 2, item.name, 4);
      sheet.add(row, 3, item.category, 4);
      sheet.add(row, 4, item.ratioText, 12);
      const hasStart = numberValue(item.start) !== null;
      const hasEnd = numberValue(item.end) !== null;
      const hasUsage = numberValue(item.difference) !== null && numberValue(item.usage) !== null;
      sheet.add(row, 5, hasStart ? item.start : "—", 5, { type: hasStart ? "number" : "text" });
      sheet.add(row, 6, hasEnd ? item.end : "—", 5, { type: hasEnd ? "number" : "text" });
      if (hasUsage) {
        sheet.add(row, 7, item.difference, 5, {
          formula: `IF(OR(E${row}="",F${row}="",F${row}<E${row}),"",F${row}-E${row})`,
          cached: item.difference,
        });
        sheet.add(row, 8, item.usage, 5, {
          formula: `IF(G${row}="","",G${row}*J${row})`,
          cached: item.usage,
        });
      } else {
        sheet.add(row, 7, "—", 5);
        sheet.add(row, 8, "—", 5);
      }
      sheet.add(row, 9, item.statusLabel, warningStyle);
      sheet.add(row, 10, item.multiplier, 5, { type: "number" });
      sheet.setHeight(row, item.note ? 30 : 22);
    });

    const lastDataRow = Math.max(firstDataRow, firstDataRow + report.rows.length - 1);
    const summaryTitleRow = lastDataRow + 2;
    sheet.merge(summaryTitleRow, 1, 9, "分类汇总", 9, 24);
    const summaryHeaderRow = summaryTitleRow + 1;
    ["分类", "用电量(kWh)", "占比"].forEach((header, index) => sheet.add(summaryHeaderRow, index + 1, header, 3));
    const categoryStartRow = summaryHeaderRow + 1;
    report.categories.forEach((item, index) => {
      const row = categoryStartRow + index;
      sheet.add(row, 1, item.category, 4);
      sheet.add(row, 2, item.usage, 15, {
        formula: `SUMIF($C$${firstDataRow}:$C$${lastDataRow},A${row},$H$${firstDataRow}:$H$${lastDataRow})`,
        cached: item.usage,
      });
      sheet.add(row, 3, item.share, 10, {
        formula: `IF($B$${categoryStartRow + report.categories.length}=0,0,B${row}/$B$${categoryStartRow + report.categories.length})`,
        cached: item.share,
      });
    });
    const totalRow = categoryStartRow + report.categories.length;
    sheet.add(totalRow, 1, report.testMode ? "测试合计" : "分厂合计", 7);
    sheet.add(totalRow, 2, report.totalUsage, 8, {
      formula: report.categories.length ? `SUM(B${categoryStartRow}:B${totalRow - 1})` : "0",
      cached: report.totalUsage,
    });
    sheet.add(totalRow, 3, report.totalUsage ? 1 : 0, 10, { type: "number" });
    sheet.merge(totalRow + 2, 1, 9, "说明：空白或倒退且无法可靠计算的异常记录不会自动计入合计；请以现场和纸质记录为准。", 13, 28);

    return sheet.xml({
      columns: [
        { width: 8 }, { width: 24 }, { width: 24 }, { width: 12 }, { width: 14 },
        { width: 14 }, { width: 12 }, { width: 17 }, { width: 20 }, { width: 10, hidden: true },
      ],
      freezeRow: 5,
      autoFilter: report.rows.length ? `A5:I${lastDataRow}` : "",
    });
  }

  function buildAnalysisSheet(report) {
    const sheet = new SheetBuilder();
    const modeText = report.testMode ? "测试分析（不计入正式记录）" : "正式分析";
    sheet.merge(1, 1, 9, `${report.company}用电分析表`, 1, 34);
    sheet.merge(2, 1, 9, `${report.factoryName}｜${report.date}｜${modeText}`, 2, 24);

    sheet.merge(4, 1, 2, "当前分厂合计", 7, 28);
    sheet.merge(4, 3, 4, report.totalUsage, 8, 28);
    sheet.merge(4, 5, 6, "已计算计量点", 7, 28);
    sheet.merge(4, 7, 9, `${report.calculatedCount} / ${report.rows.length}`, 8, 28);
    sheet.merge(5, 1, 2, report.testMode ? "正式合计（测试不计入）" : "全公司已保存合计", 7, 28);
    sheet.merge(5, 3, 4, report.companyTotal, 8, 28);
    sheet.merge(5, 5, 6, "异常与现场情况", 7, 28);
    sheet.merge(5, 7, 9, report.warnings.length, 8, 28);

    sheet.merge(7, 1, 4, "分类用电", 9, 24);
    sheet.merge(7, 6, 9, "用电最高计量点", 9, 24);
    ["分类", "用电量(kWh)", "占比"].forEach((header, index) => sheet.add(8, index + 1, header, 3));
    ["排名", "计量点", "分类", "用电量(kWh)"].forEach((header, index) => sheet.add(8, index + 6, header, 3));

    const tableRows = Math.max(report.categories.length, report.topMeters.length, 1);
    for (let index = 0; index < tableRows; index += 1) {
      const row = 9 + index;
      const category = report.categories[index];
      const topMeter = report.topMeters[index];
      if (category) {
        sheet.add(row, 1, category.category, 4);
        sheet.add(row, 2, category.usage, 5, { type: "number" });
        sheet.add(row, 3, category.share, 10, { type: "number" });
      }
      if (topMeter) {
        sheet.add(row, 6, index + 1, 12, { type: "number" });
        sheet.add(row, 7, topMeter.name, 4);
        sheet.add(row, 8, topMeter.category, 4);
        sheet.add(row, 9, topMeter.usage, 5, { type: "number" });
      }
    }

    const warningTitleRow = 10 + tableRows;
    sheet.merge(warningTitleRow, 1, 9, "异常与现场情况明细", 9, 24);
    ["序号", "计量点", "现场情况", "提示/处理说明"].forEach((header, index) => {
      const column = [1, 2, 3, 4][index];
      sheet.add(warningTitleRow + 1, column, header, 3);
    });
    for (let column = 5; column <= 9; column += 1) sheet.add(warningTitleRow + 1, column, "", 3);
    sheet.merges.push(`D${warningTitleRow + 1}:I${warningTitleRow + 1}`);

    if (!report.warnings.length) {
      const row = warningTitleRow + 2;
      sheet.merge(row, 1, 9, "本次没有需要特别说明的异常记录。", 13, 24);
    } else {
      report.warnings.slice(0, 30).forEach((item, index) => {
        const row = warningTitleRow + 2 + index;
        sheet.add(row, 1, index + 1, 12, { type: "number" });
        sheet.add(row, 2, item.name, 14);
        sheet.add(row, 3, item.statusLabel, 14);
        sheet.merge(row, 4, 9, item.note, 14, 30);
      });
    }
    const noteRow = warningTitleRow + 3 + Math.min(report.warnings.length, 30);
    sheet.merge(noteRow, 1, 9, "判断原则：黄色异常只做复核提示，不阻止保存；无法可靠相减的项目不自动估算用电量。", 13, 28);

    return sheet.xml({
      columns: [
        { width: 20 }, { width: 16 }, { width: 12 }, { width: 18 }, { width: 3 },
        { width: 9 }, { width: 24 }, { width: 22 }, { width: 17 },
      ],
      freezeRow: 2,
    });
  }

  function weekdayName(dateText) {
    return ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][new Date(`${dateText}T00:00:00Z`).getUTCDay()];
  }

  function buildPeriodSummarySheet(report) {
    const sheet = new SheetBuilder();
    sheet.merge(1, 1, 8, `${report.company}用电${report.label}`, 1, 34);
    sheet.merge(2, 1, 8, `${report.startDate} 至 ${report.endDate}｜自动汇总已保存历史数据`, 2, 24);
    sheet.merge(4, 1, 2, "周期总用电", 7, 28);
    sheet.merge(4, 3, 4, report.totalUsage, 8, 28);
    sheet.merge(4, 5, 6, "有数据天数", 7, 28);
    sheet.merge(4, 7, 8, report.daysWithData, 8, 28);
    sheet.merge(5, 1, 2, "日均用电", 7, 28);
    sheet.merge(5, 3, 4, report.daysWithData ? report.totalUsage / report.daysWithData : 0, 8, 28);
    sheet.merge(5, 5, 6, "现场异常记录", 7, 28);
    sheet.merge(5, 7, 8, report.warningCount, 8, 28);

    const headers = ["日期", "星期", "全公司合计(kWh)", ...report.factories.map((factory) => factory.name)];
    headers.forEach((header, index) => sheet.add(7, index + 1, header, 3));
    report.dailyRows.forEach((item, index) => {
      const row = 8 + index;
      sheet.add(row, 1, item.date, 12);
      sheet.add(row, 2, weekdayName(item.date), 12);
      sheet.add(row, 3, item.totalUsage, 5, { type: "number" });
      report.factories.forEach((factory, factoryIndex) => {
        sheet.add(row, 4 + factoryIndex, item.factories[factory.id] || 0, 5, { type: "number" });
      });
      sheet.setHeight(row, 22);
    });
    const totalRow = 8 + report.dailyRows.length;
    sheet.add(totalRow, 1, "周期合计", 7);
    sheet.add(totalRow, 2, "", 7);
    sheet.add(totalRow, 3, report.totalUsage, 8, { type: "number" });
    report.factories.forEach((factory, index) => {
      const summary = report.factorySummaries.find((item) => item.factoryId === factory.id);
      sheet.add(totalRow, 4 + index, summary?.usage || 0, 15, { type: "number" });
    });
    sheet.merge(totalRow + 2, 1, 8, "口径：周报为上周五至本周四；月报为自然月内已有数据。空白日期不参与日均计算。", 13, 28);
    return sheet.xml({
      columns: [
        { width: 14 }, { width: 10 }, { width: 20 }, { width: 16 },
        { width: 16 }, { width: 16 }, { width: 16 }, { width: 16 },
      ],
      freezeRow: 7,
      autoFilter: `A7:H${Math.max(7, totalRow - 1)}`,
    });
  }

  function buildPeriodAnalysisSheet(report) {
    const sheet = new SheetBuilder();
    sheet.merge(1, 1, 9, `${report.company}用电${report.label}分析表`, 1, 34);
    sheet.merge(2, 1, 9, `${report.startDate} 至 ${report.endDate}｜五分厂统一分析`, 2, 24);

    sheet.merge(4, 1, 6, "分厂汇总", 9, 24);
    sheet.merge(4, 7, 9, "分类用电", 9, 24);
    ["分厂", "用电量(kWh)", "占比", "日均", "峰值日期", "峰值用电"].forEach((header, index) => sheet.add(5, index + 1, header, 3));
    ["分类", "用电量(kWh)", "占比"].forEach((header, index) => sheet.add(5, index + 7, header, 3));
    const upperRows = Math.max(report.factorySummaries.length, report.categories.length, 1);
    for (let index = 0; index < upperRows; index += 1) {
      const row = 6 + index;
      const factory = report.factorySummaries[index];
      const category = report.categories[index];
      if (factory) {
        sheet.add(row, 1, factory.factoryName, 4);
        sheet.add(row, 2, factory.usage, 5, { type: "number" });
        sheet.add(row, 3, factory.share, 10, { type: "number" });
        sheet.add(row, 4, factory.dailyAverage, 5, { type: "number" });
        sheet.add(row, 5, factory.peakDate, 12);
        sheet.add(row, 6, factory.peakUsage, 5, { type: "number" });
      }
      if (category) {
        sheet.add(row, 7, category.category, 4);
        sheet.add(row, 8, category.usage, 5, { type: "number" });
        sheet.add(row, 9, category.share, 10, { type: "number" });
      }
    }

    const topTitleRow = 7 + upperRows;
    sheet.merge(topTitleRow, 1, 9, "周期用电最高计量点", 9, 24);
    sheet.add(topTitleRow + 1, 1, "排名", 3);
    sheet.add(topTitleRow + 1, 2, "分厂", 3);
    sheet.merge(topTitleRow + 1, 3, 4, "计量点", 3);
    sheet.merge(topTitleRow + 1, 5, 7, "分类", 3);
    sheet.merge(topTitleRow + 1, 8, 9, "周期用电量(kWh)", 3);
    report.topMeters.forEach((item, index) => {
      const row = topTitleRow + 2 + index;
      sheet.add(row, 1, index + 1, 12, { type: "number" });
      sheet.add(row, 2, item.factoryName, 4);
      sheet.merge(row, 3, 4, item.name, 4, 22);
      sheet.merge(row, 5, 7, item.category, 4, 22);
      sheet.merge(row, 8, 9, item.usage, 5, 22);
    });
    const noteRow = topTitleRow + 3 + report.topMeters.length;
    sheet.merge(noteRow, 1, 9, "分析说明：排行按周期累计实际电量计算；异常记录只提示复核，不凭空估算缺失电量。", 13, 28);
    return sheet.xml({
      columns: [
        { width: 10 }, { width: 16 }, { width: 13 }, { width: 13 }, { width: 15 },
        { width: 16 }, { width: 16 }, { width: 18 }, { width: 13 },
      ],
      freezeRow: 5,
    });
  }

  function workbookFiles(report, options = {}) {
    const period = Boolean(options.period);
    const dailySheet = period ? buildPeriodSummarySheet(report) : buildDailySheet(report);
    const analysisSheet = period ? buildPeriodAnalysisSheet(report) : buildAnalysisSheet(report);
    const firstSheetName = period ? "周期汇总" : "用电日报";
    const secondSheetName = "分析表";
    const documentTitle = period ? `${report.company}用电${report.label}` : `${report.company}用电日报`;
    const now = new Date().toISOString();
    return [
      { name: "[Content_Types].xml", content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  <Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  <Override PartName="/xl/worksheets/sheet2.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  <Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
  <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
  <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
</Types>` },
      { name: "_rels/.rels", content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
</Relationships>` },
      { name: "docProps/core.xml", content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <dc:title>${xmlEscape(documentTitle)}</dc:title><dc:creator>雅新纺织有限公司</dc:creator>
  <dcterms:created xsi:type="dcterms:W3CDTF">${now}</dcterms:created><dcterms:modified xsi:type="dcterms:W3CDTF">${now}</dcterms:modified>
</cp:coreProperties>` },
      { name: "docProps/app.xml", content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">
  <Application>雅新纺织用电抄表分析工具</Application><DocSecurity>0</DocSecurity><ScaleCrop>false</ScaleCrop>
  <HeadingPairs><vt:vector size="2" baseType="variant"><vt:variant><vt:lpstr>工作表</vt:lpstr></vt:variant><vt:variant><vt:i4>2</vt:i4></vt:variant></vt:vector></HeadingPairs>
  <TitlesOfParts><vt:vector size="2" baseType="lpstr"><vt:lpstr>${xmlEscape(firstSheetName)}</vt:lpstr><vt:lpstr>${xmlEscape(secondSheetName)}</vt:lpstr></vt:vector></TitlesOfParts>
</Properties>` },
      { name: "xl/workbook.xml", content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <bookViews><workbookView xWindow="0" yWindow="0" windowWidth="24000" windowHeight="14000"/></bookViews>
  <sheets><sheet name="${xmlEscape(firstSheetName)}" sheetId="1" r:id="rId1"/><sheet name="${xmlEscape(secondSheetName)}" sheetId="2" r:id="rId2"/></sheets>
  <calcPr calcId="191029" calcMode="auto" fullCalcOnLoad="1" forceFullCalc="1"/>
</workbook>` },
      { name: "xl/_rels/workbook.xml.rels", content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet2.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>` },
      { name: "xl/styles.xml", content: STYLES_XML },
      { name: "xl/worksheets/sheet1.xml", content: dailySheet },
      { name: "xl/worksheets/sheet2.xml", content: analysisSheet },
    ];
  }

  function createWorkbookBlob(report) {
    const bytes = createZip(workbookFiles(report));
    return new Blob([bytes], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  }

  function createPeriodWorkbookBlob(report) {
    const bytes = createZip(workbookFiles(report, { period: true }));
    return new Blob([bytes], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  }

  function downloadBlob(blob, fileName) {
    const link = document.createElement("a");
    const objectUrl = URL.createObjectURL(blob);
    link.href = objectUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1500);
  }

  function download(report) {
    downloadBlob(createWorkbookBlob(report), report.fileName);
  }

  function downloadPeriod(report) {
    downloadBlob(createPeriodWorkbookBlob(report), report.fileName);
  }

  global.PowerMeterXlsx = { createPeriodWorkbookBlob, createWorkbookBlob, download, downloadPeriod };
})(window);
