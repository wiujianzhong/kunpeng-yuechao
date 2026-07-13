import fs from 'node:fs';

const root=new URL('../',import.meta.url);
const auditUrl=new URL('data/audits/tf2513-p13-p23.json',root);
const audit=JSON.parse(fs.readFileSync(auditUrl,'utf8'));
audit.parts=audit.parts.map(part=>({...part,dims:[...(part.specification||[])]}));
fs.writeFileSync(auditUrl,`${JSON.stringify(audit,null,2)}\n`);
const frameByAssembly=Object.fromEntries(audit.assemblyFrames.map(item=>[item.assembly,item]));
const explicitEnglishMismatch=new Set(['tf2513-p18-item-002']);

const inferType=name=>{
  if(/钢丝绳|软管|气管/.test(name))return'hose';
  if(/密封|减震|托垫|衬垫/.test(name))return'seal';
  if(/弹簧|拉簧/.test(name))return'spring';
  if(/滚动轴承|带座轴承/.test(name))return'bearing';
  if(/带轮|挂轮|导向轮|罗拉/.test(name))return'pulley';
  if(/轴套|轴衬/.test(name))return'bushing';
  if(/轴|销/.test(name))return'shaft';
  if(/螺母/.test(name))return'nut';
  if(/螺栓|螺钉/.test(name))return'fastener';
  if(/垫圈|垫片|挡圈/.test(name))return'washer';
  if(/键/.test(name))return'key';
  if(/气缸/.test(name))return'cylinder';
  if(/电磁阀|控制阀/.test(name))return'valve';
  if(/磁性开关/.test(name))return'magnet';
  if(/接头|消音器/.test(name))return'fitting';
  if(/减速机/.test(name))return'gearbox';
  if(/管夹/.test(name))return'clamp';
  if(/箱体|罩壳|安全罩|翻板盖/.test(name))return'casing';
  if(/板|片|刮刀|扳手|标牌|护板|盖板/.test(name))return'plate';
  if(/座/.test(name))return'bracket';
  return'unknown';
};

const rows=audit.parts.map(part=>{
  const frame=frameByAssembly[part.assembly];
  const dims=[...part.specification];
  return{
    manual:'tf2513',manualHeader:'TF2513外供图',companyZh:'恒天重工股份有限公司',companyEn:'HI-TECT HEAVY INDUSTRY CO.LTD',
    assembly:part.assembly,assemblyName:part.assemblyNameZh,assemblyNameEn:frame.assemblyNameEn,drawingPage:part.drawingPage,
    recordKey:part.recordKey,item:part.item,tableRow:part.cell.row,code:part.code,name:part.nameZh,nameEn:part.sourceNameEn,
    nameEnStatus:explicitEnglishMismatch.has(part.recordKey)?'厂家BOM英文原文与中文语义不一致':'厂家BOM英文原文',
    page:part.pdfPage,sheetPage:part.pdfSheetPage,printedPage:part.printedPageNumber,
    quantity:part.quantity.value,quantityUnit:part.quantity.unit,quantityMeaning:part.quantity.meaning,
    specification:dims.length?dims.join('；'):null,remark:part.remark,dims,
    dimensionSource:part.dimensionSource,modelType:inferType(part.nameZh),
    dataStatus:'厂家资料已核',modelStatus:'待核',status:'厂家BOM已核·3D待核',
    sourceCrop:`assets/manuals/tf2513/crops/${part.sourceSlug}.png`,sourceVector:`assets/manuals/tf2513/crops/${part.sourceSlug}.pdf`,
    sourceCropBoxPt:part.cell.cropBoxPt,sourceDisplayRotation:part.cell.displayRotation,
    sourceAssemblyCrop:frame.sourceCrop,sourceAssemblyVector:frame.sourceVector,sourceAssemblyCropBoxPt:frame.cropBoxPt,
    sourceAssemblyDisplayRotation:frame.displayRotation,auditIssues:part.auditIssues,
  };
});

const out=`// TF2513厂家PDF中段135项BOM逐行核对；数量为单台设备用量。\nconst rows=${JSON.stringify(rows,null,2)};\nexport const tf2513P14P23Verified=Object.freeze(rows.map(Object.freeze));\nexport default tf2513P14P23Verified;\n`;
fs.writeFileSync(new URL('data/tf2513-p14-p23-verified.js',root),out);
