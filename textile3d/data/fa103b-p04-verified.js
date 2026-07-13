// 根据FA103B厂家PDF第3—4页逐格核对；第4页数量均为单台设备用量，明细行没有逐项英文名称。
const rows=[
  {
    "item": 1,
    "recordKey": "fa103b-p04-item-001",
    "code": "FA103B-0100A",
    "name": "机架部件",
    "nameEn": null,
    "quantity": 1,
    "remark": null,
    "dims": [],
    "dimensionSource": null,
    "sourceSlug": "fa103b-p04-item-001",
    "sourceCropBoxPt": [
      103.44,
      477.6,
      459.12,
      495.36
    ],
    "auditIssues": []
  },
  {
    "item": 2,
    "recordKey": "fa103b-p04-item-002",
    "code": "FA103B-0200",
    "name": "打手部件",
    "nameEn": null,
    "quantity": 1,
    "remark": null,
    "dims": [],
    "dimensionSource": null,
    "sourceSlug": "fa103b-p04-item-002",
    "sourceCropBoxPt": [
      103.44,
      459.84,
      459.12,
      477.6
    ],
    "auditIssues": []
  },
  {
    "item": 3,
    "recordKey": "fa103b-p04-item-003",
    "code": "FA103B-0300",
    "name": "尘格部件",
    "nameEn": null,
    "quantity": 1,
    "remark": null,
    "dims": [],
    "dimensionSource": null,
    "sourceSlug": "fa103b-p04-item-003",
    "sourceCropBoxPt": [
      103.44,
      442.08,
      459.12,
      459.84
    ],
    "auditIssues": []
  },
  {
    "item": 4,
    "recordKey": "fa103b-p04-item-004",
    "code": "FA103B-0000-1",
    "name": "出棉口结合件",
    "nameEn": null,
    "quantity": 1,
    "remark": null,
    "dims": [],
    "dimensionSource": null,
    "sourceSlug": "fa103b-p04-item-004",
    "sourceCropBoxPt": [
      103.44,
      424.32,
      459.12,
      442.08
    ],
    "auditIssues": []
  },
  {
    "item": 5,
    "recordKey": "fa103b-p04-item-005",
    "code": "FA103A-0000-1",
    "name": "方接圆结合件",
    "nameEn": null,
    "quantity": 1,
    "remark": null,
    "dims": [],
    "dimensionSource": null,
    "sourceSlug": "fa103b-p04-item-005",
    "sourceCropBoxPt": [
      103.44,
      406.56,
      459.12,
      424.32
    ],
    "auditIssues": [
      "厂家原格清楚写“方接圆结合件”；旧索引误写为“方接圈结合件”，本审计按厂家原文纠正。"
    ]
  },
  {
    "item": 6,
    "recordKey": "fa103b-p04-item-006",
    "code": "FA103A-0000-2",
    "name": "90° 弯管结合件",
    "nameEn": null,
    "quantity": 1,
    "remark": null,
    "dims": [
      "90°"
    ],
    "dimensionSource": "厂家中文名称中的明确角度",
    "sourceSlug": "fa103b-p04-item-006",
    "sourceCropBoxPt": [
      103.44,
      388.8,
      459.12,
      406.56
    ],
    "auditIssues": []
  },
  {
    "item": 7,
    "recordKey": "fa103b-p04-item-007",
    "code": "FA103B-0001",
    "name": "软管",
    "nameEn": null,
    "quantity": 1,
    "remark": "FESTO",
    "dims": [],
    "dimensionSource": null,
    "sourceSlug": "fa103b-p04-item-007",
    "sourceCropBoxPt": [
      103.44,
      371.04,
      459.12,
      388.8
    ],
    "auditIssues": [
      "FESTO位于厂家备注栏，未拼入件号或名称。"
    ]
  },
  {
    "item": 8,
    "recordKey": "fa103b-p04-item-008",
    "code": "GB799",
    "name": "螺栓 M16X220",
    "nameEn": null,
    "quantity": 4,
    "remark": null,
    "dims": [
      "M16X220"
    ],
    "dimensionSource": "厂家中文名称中的明确规格",
    "sourceSlug": "fa103b-p04-item-008",
    "sourceCropBoxPt": [
      103.44,
      353.04,
      459.12,
      371.04
    ],
    "auditIssues": []
  },
  {
    "item": 9,
    "recordKey": "fa103b-p04-item-009",
    "code": "GB5783",
    "name": "螺栓 M6X20",
    "nameEn": null,
    "quantity": 16,
    "remark": null,
    "dims": [
      "M6X20"
    ],
    "dimensionSource": "厂家中文名称中的明确规格",
    "sourceSlug": "fa103b-p04-item-009",
    "sourceCropBoxPt": [
      103.44,
      335.28,
      459.12,
      353.04
    ],
    "auditIssues": []
  },
  {
    "item": 10,
    "recordKey": "fa103b-p04-item-010",
    "code": "GB825",
    "name": "螺钉 M16",
    "nameEn": null,
    "quantity": 4,
    "remark": null,
    "dims": [
      "M16"
    ],
    "dimensionSource": "厂家中文名称中的明确规格",
    "sourceSlug": "fa103b-p04-item-010",
    "sourceCropBoxPt": [
      103.44,
      317.52,
      459.12,
      335.28
    ],
    "auditIssues": []
  },
  {
    "item": 11,
    "recordKey": "fa103b-p04-item-011",
    "code": "GB6170",
    "name": "螺母 M16",
    "nameEn": null,
    "quantity": 8,
    "remark": null,
    "dims": [
      "M16"
    ],
    "dimensionSource": "厂家中文名称中的明确规格",
    "sourceSlug": "fa103b-p04-item-011",
    "sourceCropBoxPt": [
      103.44,
      299.76,
      459.12,
      317.52
    ],
    "auditIssues": []
  },
  {
    "item": 12,
    "recordKey": "fa103b-p04-item-012",
    "code": "GB96",
    "name": "垫圈 6",
    "nameEn": null,
    "quantity": 16,
    "remark": null,
    "dims": [
      "6"
    ],
    "dimensionSource": "厂家中文名称中的明确规格",
    "sourceSlug": "fa103b-p04-item-012",
    "sourceCropBoxPt": [
      103.44,
      282,
      459.12,
      299.76
    ],
    "auditIssues": []
  },
  {
    "item": 13,
    "recordKey": "fa103b-p04-item-013",
    "code": "GB97.1",
    "name": "垫圈 16",
    "nameEn": null,
    "quantity": 8,
    "remark": null,
    "dims": [
      "16"
    ],
    "dimensionSource": "厂家中文名称中的明确规格",
    "sourceSlug": "fa103b-p04-item-013",
    "sourceCropBoxPt": [
      103.44,
      264.24,
      459.12,
      282
    ],
    "auditIssues": []
  },
  {
    "item": 14,
    "recordKey": "fa103b-p04-item-014",
    "code": null,
    "name": "接头 QSL-1/8-8",
    "nameEn": null,
    "quantity": 1,
    "remark": "FESTO",
    "dims": [
      "QSL-1/8-8"
    ],
    "dimensionSource": "厂家中文名称中的型号规格（不是独立图形尺寸）",
    "sourceSlug": "fa103b-p04-item-014",
    "sourceCropBoxPt": [
      103.44,
      246.48,
      459.12,
      264.24
    ],
    "auditIssues": [
      "厂家件号栏为空；QSL-1/8-8位于名称栏、FESTO位于备注栏，均不得反填或拼成厂家件号。"
    ]
  },
  {
    "item": 15,
    "recordKey": "fa103b-p04-item-015",
    "code": "FZ/T90089.1",
    "name": "厂铭牌 80X130",
    "nameEn": null,
    "quantity": 1,
    "remark": null,
    "dims": [
      "80X130"
    ],
    "dimensionSource": "厂家中文名称中的明确规格",
    "sourceSlug": "fa103b-p04-item-015",
    "sourceCropBoxPt": [
      103.44,
      228.72,
      459.12,
      246.48
    ],
    "auditIssues": []
  }
];

export const fa103bP04Verified=rows.map(row=>({
  manual:'fa103b',
  manualHeader:'FA103B型双轴流开棉机',
  assembly:'FA103B-0000',
  assemblyTitle:'产品装配总图',
  recordKey:row.recordKey,
  item:row.item,
  code:row.code,
  name:row.name,
  nameEn:row.nameEn,
  nameEnStatus:'厂家第4页明细行未提供英文零件名',
  page:4,
  sheetPage:'共1页第1页',
  quantity:row.quantity,
  quantityUnit:'件',
  quantityMeaning:'单台设备用量',
  remark:row.remark,
  dims:row.dims,
  dimensionSource:row.dimensionSource,
  dataStatus:'厂家资料已核',
  modelStatus:'待核',
  status:'厂家BOM已核·3D待核',
  sourceCrop:`assets/manuals/fa103b/crops/${row.sourceSlug}.png`,
  sourceVector:`assets/manuals/fa103b/crops/${row.sourceSlug}.pdf`,
  sourceCropBoxPt:row.sourceCropBoxPt,
  auditIssues:row.auditIssues,
}));
