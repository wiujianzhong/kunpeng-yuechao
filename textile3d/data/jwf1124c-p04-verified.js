// 根据厂家PDF第4页19行BOM逐格人工核对；厂家本页没有英文零件名。
const rows = [
  {item:1, code:'JWF1124C-160-0100B', name:'机架部件', quantity:1, dims:[], sourceSpec:null, auditIssues:[]},
  {item:2, code:'JWF1124C-160-0200B', name:'除尘部件', quantity:1, dims:[], sourceSpec:null, auditIssues:[]},
  {item:3, code:'JWF1124C-160-0300', name:'给棉部件', quantity:1, dims:[], sourceSpec:null, auditIssues:[]},
  {item:4, code:'JWF1124C-160-0400', name:'打手部件', quantity:1, dims:[], sourceSpec:null, auditIssues:[]},
  {item:5, code:'JWF1124C-160-0500', name:'排杂部件', quantity:2, dims:[], sourceSpec:null, auditIssues:[]},
  {item:6, code:'JWF1124-0600A', name:'安全罩部件', quantity:1, dims:[], sourceSpec:null, auditIssues:['现有索引英文写成FRAME ASS.；厂家本页未提供英文且该译名与安全罩语义不符。']},
  {item:7, code:'JWF1124-0700A', name:'联接部件', quantity:1, dims:[], sourceSpec:null, auditIssues:[]},
  {item:8, code:'JWF1124-0000-1', name:'接管结合件', quantity:1, dims:[], sourceSpec:null, auditIssues:[]},
  {item:9, code:'JWF1124-0000-2', name:'方接圆结合件', quantity:1, dims:[], sourceSpec:null, auditIssues:['现有索引写成方接圈结合件；厂家600dpi原格为方接圆结合件。']},
  {item:10, code:'JWF1124-0001', name:'透视窗', quantity:1, dims:[], sourceSpec:null, auditIssues:[]},
  {item:11, code:'TV425A-0501', name:'禁令牌', quantity:1, dims:[], sourceSpec:null, auditIssues:['现有索引件号为TVL25A-0501；厂家600dpi原格为TV425A-0501。']},
  {item:12, code:'TZH1077-1.5X3X1170', name:'嵌条', quantity:1, dims:[1.5,3,1170], sourceSpec:'件号规格1.5X3X1170', auditIssues:[]},
  {item:13, code:'TZH1078-6X7X1170', name:'嵌芯', quantity:1, dims:[6,7,1170], sourceSpec:'件号规格6X7X1170', auditIssues:[]},
  {item:14, code:'GB799', name:'螺栓 M16X220', quantity:6, dims:[16,220], sourceSpec:'中文名称规格M16X220', auditIssues:[]},
  {item:15, code:'GB5783', name:'螺栓 M6X20', quantity:72, dims:[6,20], sourceSpec:'中文名称规格M6X20', auditIssues:[]},
  {item:16, code:'GB6170', name:'螺母 M6', quantity:48, dims:[6], sourceSpec:'中文名称规格M6', auditIssues:[]},
  {item:17, code:'GB6170', name:'螺母 M16', quantity:6, dims:[16], sourceSpec:'中文名称规格M16', auditIssues:[]},
  {item:18, code:'GB96', name:'垫圈 6', quantity:120, dims:[6], sourceSpec:'中文名称规格6', auditIssues:[]},
  {item:19, code:'GB96', name:'垫圈 16', quantity:6, dims:[16], sourceSpec:'中文名称规格16', auditIssues:[]}
];

export const jwf1124cP04Verified = rows.map((row) => {
  const itemText = String(row.item).padStart(2, '0');
  const slug = `JWF1124C-160-0000-p04-item-${itemText}`;
  return {
    manual: 'jwf1124c',
    manualHeader: 'JWF1124C-160型开棉机',
    assembly: 'JWF1124C-160-0000',
    assemblyTitle: '产品装配总图',
    recordKey: `jwf1124c-p04-item-${itemText}`,
    item: row.item,
    code: row.code,
    name: row.name,
    nameEn: null,
    nameEnStatus: '厂家第4页未提供英文零件名',
    page: 4,
    sheetPage: '共2页第2页',
    quantity: row.quantity,
    quantityUnit: '件',
    quantityMeaning: '单台设备用量',
    dims: row.dims,
    sourceSpec: row.sourceSpec,
    dimensionNote: row.sourceSpec
      ? `厂家${row.sourceSpec}；本页没有独立尺寸栏`
      : '厂家本页没有独立尺寸栏，件号和中文名称中也未写尺寸规格',
    dataStatus: '厂家资料已核',
    modelStatus: '待核',
    status: '厂家BOM已核·3D待核',
    sourceCrop: `assets/manuals/jwf1124c/crops/${slug}.png`,
    sourceVector: `assets/manuals/jwf1124c/crops/${slug}.pdf`,
    auditIssues: row.auditIssues
  };
});
