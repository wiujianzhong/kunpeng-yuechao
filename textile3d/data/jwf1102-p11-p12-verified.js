// 根据JWF1102厂家PDF第10—12页逐页、逐格核对；第11—12页数量均为单台设备用量，空件号保持null。
const rows=[
  {
    "item": 1,
    "recordKey": "jwf1102-p11-item-001",
    "code": "FA103A-0200-1A",
    "name": "轮座结合件",
    "nameEn": null,
    "quantity": 1,
    "specification": null,
    "remark": null,
    "dims": [],
    "dimensionSource": null,
    "page": 11,
    "sheetPage": "共2页第1页",
    "sourceSlug": "jwf1102-p11-item-001",
    "sourceCropBoxPt": [
      103.44,
      477.36,
      459.12,
      495.12
    ],
    "auditIssues": []
  },
  {
    "item": 2,
    "recordKey": "jwf1102-p11-item-002",
    "code": "JWF1102-0200-1",
    "name": "打手结合件",
    "nameEn": null,
    "quantity": 1,
    "specification": null,
    "remark": null,
    "dims": [],
    "dimensionSource": null,
    "page": 11,
    "sheetPage": "共2页第1页",
    "sourceSlug": "jwf1102-p11-item-002",
    "sourceCropBoxPt": [
      103.44,
      459.6,
      459.12,
      477.36
    ],
    "auditIssues": []
  },
  {
    "item": 3,
    "recordKey": "jwf1102-p11-item-003",
    "code": "JWF1102-0200-2",
    "name": "调节板结合件",
    "nameEn": null,
    "quantity": 1,
    "specification": null,
    "remark": null,
    "dims": [],
    "dimensionSource": null,
    "page": 11,
    "sheetPage": "共2页第1页",
    "sourceSlug": "jwf1102-p11-item-003",
    "sourceCropBoxPt": [
      103.44,
      441.84,
      459.12,
      459.6
    ],
    "auditIssues": []
  },
  {
    "item": 4,
    "recordKey": "jwf1102-p11-item-004",
    "code": "ZFA113-0212",
    "name": "支架",
    "nameEn": null,
    "quantity": 1,
    "specification": null,
    "remark": null,
    "dims": [],
    "dimensionSource": null,
    "page": 11,
    "sheetPage": "共2页第1页",
    "sourceSlug": "jwf1102-p11-item-004",
    "sourceCropBoxPt": [
      103.44,
      424.08,
      459.12,
      441.84
    ],
    "auditIssues": []
  },
  {
    "item": 5,
    "recordKey": "jwf1102-p11-item-005",
    "code": "ZFA113-0223",
    "name": "电机座",
    "nameEn": null,
    "quantity": 1,
    "specification": null,
    "remark": null,
    "dims": [],
    "dimensionSource": null,
    "page": 11,
    "sheetPage": "共2页第1页",
    "sourceSlug": "jwf1102-p11-item-005",
    "sourceCropBoxPt": [
      103.44,
      406.32,
      459.12,
      424.08
    ],
    "auditIssues": []
  },
  {
    "item": 6,
    "recordKey": "jwf1102-p11-item-006",
    "code": "JWF1102-0201",
    "name": "打手带轮",
    "nameEn": null,
    "quantity": 1,
    "specification": null,
    "remark": null,
    "dims": [],
    "dimensionSource": null,
    "page": 11,
    "sheetPage": "共2页第1页",
    "sourceSlug": "jwf1102-p11-item-006",
    "sourceCropBoxPt": [
      103.44,
      388.56,
      459.12,
      406.32
    ],
    "auditIssues": []
  },
  {
    "item": 7,
    "recordKey": "jwf1102-p11-item-007",
    "code": "JWF1102-0202",
    "name": "法兰",
    "nameEn": null,
    "quantity": 1,
    "specification": null,
    "remark": null,
    "dims": [],
    "dimensionSource": null,
    "page": 11,
    "sheetPage": "共2页第1页",
    "sourceSlug": "jwf1102-p11-item-007",
    "sourceCropBoxPt": [
      103.44,
      370.8,
      459.12,
      388.56
    ],
    "auditIssues": [
      "第7、8项同名法兰但件号和数量不同，按厂家序号独立建档。"
    ]
  },
  {
    "item": 8,
    "recordKey": "jwf1102-p11-item-008",
    "code": "JWF1102-0203",
    "name": "法兰",
    "nameEn": null,
    "quantity": 2,
    "specification": null,
    "remark": null,
    "dims": [],
    "dimensionSource": null,
    "page": 11,
    "sheetPage": "共2页第1页",
    "sourceSlug": "jwf1102-p11-item-008",
    "sourceCropBoxPt": [
      103.44,
      353.04,
      459.12,
      370.8
    ],
    "auditIssues": [
      "第7、8项同名法兰但件号和数量不同，按厂家序号独立建档。"
    ]
  },
  {
    "item": 9,
    "recordKey": "jwf1102-p11-item-009",
    "code": "JWF1102-0204",
    "name": "轴承盖",
    "nameEn": null,
    "quantity": 1,
    "specification": null,
    "remark": null,
    "dims": [],
    "dimensionSource": null,
    "page": 11,
    "sheetPage": "共2页第1页",
    "sourceSlug": "jwf1102-p11-item-009",
    "sourceCropBoxPt": [
      103.44,
      335.04,
      459.12,
      353.04
    ],
    "auditIssues": [
      "第9、10项同名轴承盖但件号不同，按厂家序号独立建档。"
    ]
  },
  {
    "item": 10,
    "recordKey": "jwf1102-p11-item-010",
    "code": "JWF1102-0205",
    "name": "轴承盖",
    "nameEn": null,
    "quantity": 1,
    "specification": null,
    "remark": null,
    "dims": [],
    "dimensionSource": null,
    "page": 11,
    "sheetPage": "共2页第1页",
    "sourceSlug": "jwf1102-p11-item-010",
    "sourceCropBoxPt": [
      103.44,
      317.28,
      459.12,
      335.04
    ],
    "auditIssues": [
      "第9、10项同名轴承盖但件号不同，按厂家序号独立建档。"
    ]
  },
  {
    "item": 11,
    "recordKey": "jwf1102-p11-item-011",
    "code": "JWF1102-0206",
    "name": "空心轴",
    "nameEn": null,
    "quantity": 1,
    "specification": null,
    "remark": null,
    "dims": [],
    "dimensionSource": null,
    "page": 11,
    "sheetPage": "共2页第1页",
    "sourceSlug": "jwf1102-p11-item-011",
    "sourceCropBoxPt": [
      103.44,
      299.52,
      459.12,
      317.28
    ],
    "auditIssues": [
      "第11、12项同名空心轴但件号不同，按厂家序号独立建档。"
    ]
  },
  {
    "item": 12,
    "recordKey": "jwf1102-p11-item-012",
    "code": "JWF1102-0207",
    "name": "空心轴",
    "nameEn": null,
    "quantity": 1,
    "specification": null,
    "remark": null,
    "dims": [],
    "dimensionSource": null,
    "page": 11,
    "sheetPage": "共2页第1页",
    "sourceSlug": "jwf1102-p11-item-012",
    "sourceCropBoxPt": [
      103.44,
      281.76,
      459.12,
      299.52
    ],
    "auditIssues": [
      "第11、12项同名空心轴但件号不同，按厂家序号独立建档。"
    ]
  },
  {
    "item": 13,
    "recordKey": "jwf1102-p11-item-013",
    "code": "JWF1102-0208",
    "name": "螺栓",
    "nameEn": null,
    "quantity": 1,
    "specification": null,
    "remark": null,
    "dims": [],
    "dimensionSource": null,
    "page": 11,
    "sheetPage": "共2页第1页",
    "sourceSlug": "jwf1102-p11-item-013",
    "sourceCropBoxPt": [
      103.44,
      264,
      459.12,
      281.76
    ],
    "auditIssues": [
      "第13、14项同名螺栓但件号不同，按厂家序号独立建档。"
    ]
  },
  {
    "item": 14,
    "recordKey": "jwf1102-p11-item-014",
    "code": "JWF1102-0209",
    "name": "螺栓",
    "nameEn": null,
    "quantity": 1,
    "specification": null,
    "remark": null,
    "dims": [],
    "dimensionSource": null,
    "page": 11,
    "sheetPage": "共2页第1页",
    "sourceSlug": "jwf1102-p11-item-014",
    "sourceCropBoxPt": [
      103.44,
      246.24,
      459.12,
      264
    ],
    "auditIssues": [
      "第13、14项同名螺栓但件号不同，按厂家序号独立建档。"
    ]
  },
  {
    "item": 15,
    "recordKey": "jwf1102-p11-item-015",
    "code": "JWF1102-0210",
    "name": "套筒",
    "nameEn": null,
    "quantity": 1,
    "specification": null,
    "remark": null,
    "dims": [],
    "dimensionSource": null,
    "page": 11,
    "sheetPage": "共2页第1页",
    "sourceSlug": "jwf1102-p11-item-015",
    "sourceCropBoxPt": [
      103.44,
      228.48,
      459.12,
      246.24
    ],
    "auditIssues": [
      "第15—18项均名为套筒，件号和数量不同，四项按厂家序号独立建档。"
    ]
  },
  {
    "item": 16,
    "recordKey": "jwf1102-p11-item-016",
    "code": "JWF1102-0211",
    "name": "套筒",
    "nameEn": null,
    "quantity": 2,
    "specification": null,
    "remark": null,
    "dims": [],
    "dimensionSource": null,
    "page": 11,
    "sheetPage": "共2页第1页",
    "sourceSlug": "jwf1102-p11-item-016",
    "sourceCropBoxPt": [
      103.44,
      210.72,
      459.12,
      228.48
    ],
    "auditIssues": [
      "第15—18项均名为套筒，件号和数量不同，四项按厂家序号独立建档。"
    ]
  },
  {
    "item": 17,
    "recordKey": "jwf1102-p11-item-017",
    "code": "JWF1102-0212",
    "name": "套筒",
    "nameEn": null,
    "quantity": 2,
    "specification": null,
    "remark": null,
    "dims": [],
    "dimensionSource": null,
    "page": 11,
    "sheetPage": "共2页第1页",
    "sourceSlug": "jwf1102-p11-item-017",
    "sourceCropBoxPt": [
      103.44,
      192.96,
      459.12,
      210.72
    ],
    "auditIssues": [
      "第15—18项均名为套筒，件号和数量不同，四项按厂家序号独立建档。"
    ]
  },
  {
    "item": 18,
    "recordKey": "jwf1102-p11-item-018",
    "code": "JWF1102-0213",
    "name": "套筒",
    "nameEn": null,
    "quantity": 1,
    "specification": null,
    "remark": null,
    "dims": [],
    "dimensionSource": null,
    "page": 11,
    "sheetPage": "共2页第1页",
    "sourceSlug": "jwf1102-p11-item-018",
    "sourceCropBoxPt": [
      103.44,
      175.2,
      459.12,
      192.96
    ],
    "auditIssues": [
      "第15—18项均名为套筒，件号和数量不同，四项按厂家序号独立建档。"
    ]
  },
  {
    "item": 19,
    "recordKey": "jwf1102-p11-item-019",
    "code": "JWF1102-0214",
    "name": "压紧盖",
    "nameEn": null,
    "quantity": 2,
    "specification": null,
    "remark": null,
    "dims": [],
    "dimensionSource": null,
    "page": 11,
    "sheetPage": "共2页第1页",
    "sourceSlug": "jwf1102-p11-item-019",
    "sourceCropBoxPt": [
      103.44,
      157.44,
      459.12,
      175.2
    ],
    "auditIssues": [
      "第19—21项均名为压紧盖，件号和数量不同，三项按厂家序号独立建档。"
    ]
  },
  {
    "item": 20,
    "recordKey": "jwf1102-p11-item-020",
    "code": "JWF1102-0215",
    "name": "压紧盖",
    "nameEn": null,
    "quantity": 1,
    "specification": null,
    "remark": null,
    "dims": [],
    "dimensionSource": null,
    "page": 11,
    "sheetPage": "共2页第1页",
    "sourceSlug": "jwf1102-p11-item-020",
    "sourceCropBoxPt": [
      103.44,
      139.44,
      459.12,
      157.44
    ],
    "auditIssues": [
      "第19—21项均名为压紧盖，件号和数量不同，三项按厂家序号独立建档。"
    ]
  },
  {
    "item": 21,
    "recordKey": "jwf1102-p11-item-021",
    "code": "JWF1102-0216",
    "name": "压紧盖",
    "nameEn": null,
    "quantity": 1,
    "specification": null,
    "remark": null,
    "dims": [],
    "dimensionSource": null,
    "page": 11,
    "sheetPage": "共2页第1页",
    "sourceSlug": "jwf1102-p11-item-021",
    "sourceCropBoxPt": [
      103.44,
      121.68,
      459.12,
      139.44
    ],
    "auditIssues": [
      "第19—21项均名为压紧盖，件号和数量不同，三项按厂家序号独立建档。"
    ]
  },
  {
    "item": 22,
    "recordKey": "jwf1102-p11-item-022",
    "code": "JWF1102-0217",
    "name": "止推环",
    "nameEn": null,
    "quantity": 1,
    "specification": null,
    "remark": null,
    "dims": [],
    "dimensionSource": null,
    "page": 11,
    "sheetPage": "共2页第1页",
    "sourceSlug": "jwf1102-p11-item-022",
    "sourceCropBoxPt": [
      103.44,
      103.92,
      459.12,
      121.68
    ],
    "auditIssues": []
  },
  {
    "item": 23,
    "recordKey": "jwf1102-p11-item-023",
    "code": "JWF1102-0218",
    "name": "检测盘",
    "nameEn": null,
    "quantity": 1,
    "specification": null,
    "remark": null,
    "dims": [],
    "dimensionSource": null,
    "page": 11,
    "sheetPage": "共2页第1页",
    "sourceSlug": "jwf1102-p11-item-023",
    "sourceCropBoxPt": [
      103.44,
      86.16,
      459.12,
      103.92
    ],
    "auditIssues": []
  },
  {
    "item": 24,
    "recordKey": "jwf1102-p11-item-024",
    "code": "JWF1102-0219",
    "name": "电机带轮",
    "nameEn": null,
    "quantity": 1,
    "specification": null,
    "remark": null,
    "dims": [],
    "dimensionSource": null,
    "page": 11,
    "sheetPage": "共2页第1页",
    "sourceSlug": "jwf1102-p11-item-024",
    "sourceCropBoxPt": [
      103.44,
      68.4,
      459.12,
      86.16
    ],
    "auditIssues": []
  },
  {
    "item": 25,
    "recordKey": "jwf1102-p11-item-025",
    "code": "JWF1102-0220",
    "name": "张紧带轮",
    "nameEn": null,
    "quantity": 1,
    "specification": null,
    "remark": null,
    "dims": [],
    "dimensionSource": null,
    "page": 11,
    "sheetPage": "共2页第1页",
    "sourceSlug": "jwf1102-p11-item-025",
    "sourceCropBoxPt": [
      103.44,
      50.64,
      459.12,
      68.4
    ],
    "auditIssues": []
  },
  {
    "item": 26,
    "recordKey": "jwf1102-p11-item-026",
    "code": "GB14",
    "name": "螺栓 M16X45",
    "nameEn": null,
    "quantity": 4,
    "specification": "M16X45",
    "remark": null,
    "dims": [
      "M16X45"
    ],
    "dimensionSource": "厂家名称栏明确规格原文",
    "page": 11,
    "sheetPage": "共2页第1页",
    "sourceSlug": "jwf1102-p11-item-026",
    "sourceCropBoxPt": [
      103.44,
      32.88,
      459.12,
      50.64
    ],
    "auditIssues": []
  },
  {
    "item": 27,
    "recordKey": "jwf1102-p11-item-027",
    "code": "GB5783",
    "name": "螺栓 M6X45",
    "nameEn": null,
    "quantity": 2,
    "specification": "M6X45",
    "remark": null,
    "dims": [
      "M6X45"
    ],
    "dimensionSource": "厂家名称栏明确规格原文",
    "page": 11,
    "sheetPage": "共2页第1页",
    "sourceSlug": "jwf1102-p11-item-027",
    "sourceCropBoxPt": [
      459.12,
      477.36,
      814.56,
      495.12
    ],
    "auditIssues": [
      "第27—31项件号同为GB5783，但规格、数量不同，按厂家序号建立独立recordKey。"
    ]
  },
  {
    "item": 28,
    "recordKey": "jwf1102-p11-item-028",
    "code": "GB5783",
    "name": "螺栓 M8X16",
    "nameEn": null,
    "quantity": 40,
    "specification": "M8X16",
    "remark": null,
    "dims": [
      "M8X16"
    ],
    "dimensionSource": "厂家名称栏明确规格原文",
    "page": 11,
    "sheetPage": "共2页第1页",
    "sourceSlug": "jwf1102-p11-item-028",
    "sourceCropBoxPt": [
      459.12,
      459.6,
      814.56,
      477.36
    ],
    "auditIssues": [
      "第27—31项件号同为GB5783，但规格、数量不同，按厂家序号建立独立recordKey。"
    ]
  },
  {
    "item": 29,
    "recordKey": "jwf1102-p11-item-029",
    "code": "GB5783",
    "name": "螺栓 M8X40",
    "nameEn": null,
    "quantity": 6,
    "specification": "M8X40",
    "remark": null,
    "dims": [
      "M8X40"
    ],
    "dimensionSource": "厂家名称栏明确规格原文",
    "page": 11,
    "sheetPage": "共2页第1页",
    "sourceSlug": "jwf1102-p11-item-029",
    "sourceCropBoxPt": [
      459.12,
      441.84,
      814.56,
      459.6
    ],
    "auditIssues": [
      "第27—31项件号同为GB5783，但规格、数量不同，按厂家序号建立独立recordKey。"
    ]
  },
  {
    "item": 30,
    "recordKey": "jwf1102-p11-item-030",
    "code": "GB5783",
    "name": "螺栓 M10X40",
    "nameEn": null,
    "quantity": 1,
    "specification": "M10X40",
    "remark": null,
    "dims": [
      "M10X40"
    ],
    "dimensionSource": "厂家名称栏明确规格原文",
    "page": 11,
    "sheetPage": "共2页第1页",
    "sourceSlug": "jwf1102-p11-item-030",
    "sourceCropBoxPt": [
      459.12,
      424.08,
      814.56,
      441.84
    ],
    "auditIssues": [
      "第27—31项件号同为GB5783，但规格、数量不同，按厂家序号建立独立recordKey。"
    ]
  },
  {
    "item": 31,
    "recordKey": "jwf1102-p11-item-031",
    "code": "GB5783",
    "name": "螺栓 M16X45",
    "nameEn": null,
    "quantity": 4,
    "specification": "M16X45",
    "remark": null,
    "dims": [
      "M16X45"
    ],
    "dimensionSource": "厂家名称栏明确规格原文",
    "page": 11,
    "sheetPage": "共2页第1页",
    "sourceSlug": "jwf1102-p11-item-031",
    "sourceCropBoxPt": [
      459.12,
      406.32,
      814.56,
      424.08
    ],
    "auditIssues": [
      "第27—31项件号同为GB5783，但规格、数量不同，按厂家序号建立独立recordKey。"
    ]
  },
  {
    "item": 32,
    "recordKey": "jwf1102-p11-item-032",
    "code": "GB77",
    "name": "螺钉 M6X16",
    "nameEn": null,
    "quantity": 1,
    "specification": "M6X16",
    "remark": null,
    "dims": [
      "M6X16"
    ],
    "dimensionSource": "厂家名称栏明确规格原文",
    "page": 11,
    "sheetPage": "共2页第1页",
    "sourceSlug": "jwf1102-p11-item-032",
    "sourceCropBoxPt": [
      459.12,
      388.56,
      814.56,
      406.32
    ],
    "auditIssues": []
  },
  {
    "item": 33,
    "recordKey": "jwf1102-p11-item-033",
    "code": "GB818",
    "name": "螺钉 M6X12",
    "nameEn": null,
    "quantity": 1,
    "specification": "M6X12",
    "remark": null,
    "dims": [
      "M6X12"
    ],
    "dimensionSource": "厂家名称栏明确规格原文",
    "page": 11,
    "sheetPage": "共2页第1页",
    "sourceSlug": "jwf1102-p11-item-033",
    "sourceCropBoxPt": [
      459.12,
      370.8,
      814.56,
      388.56
    ],
    "auditIssues": []
  },
  {
    "item": 34,
    "recordKey": "jwf1102-p11-item-034",
    "code": "GB6191",
    "name": "螺钉 M8X20",
    "nameEn": null,
    "quantity": 12,
    "specification": "M8X20",
    "remark": null,
    "dims": [
      "M8X20"
    ],
    "dimensionSource": "厂家名称栏明确规格原文",
    "page": 11,
    "sheetPage": "共2页第1页",
    "sourceSlug": "jwf1102-p11-item-034",
    "sourceCropBoxPt": [
      459.12,
      353.04,
      814.56,
      370.8
    ],
    "auditIssues": []
  },
  {
    "item": 35,
    "recordKey": "jwf1102-p11-item-035",
    "code": "GB6170",
    "name": "螺母 M16",
    "nameEn": null,
    "quantity": 8,
    "specification": "M16",
    "remark": null,
    "dims": [
      "M16"
    ],
    "dimensionSource": "厂家名称栏明确规格原文",
    "page": 11,
    "sheetPage": "共2页第1页",
    "sourceSlug": "jwf1102-p11-item-035",
    "sourceCropBoxPt": [
      459.12,
      335.04,
      814.56,
      353.04
    ],
    "auditIssues": []
  },
  {
    "item": 36,
    "recordKey": "jwf1102-p11-item-036",
    "code": "GB93",
    "name": "垫圈 6",
    "nameEn": null,
    "quantity": 3,
    "specification": "6",
    "remark": null,
    "dims": [
      "6"
    ],
    "dimensionSource": "厂家名称栏明确规格原文",
    "page": 11,
    "sheetPage": "共2页第1页",
    "sourceSlug": "jwf1102-p11-item-036",
    "sourceCropBoxPt": [
      459.12,
      317.28,
      814.56,
      335.04
    ],
    "auditIssues": [
      "第36—38项件号同为GB93，但规格、数量不同，按厂家序号建立独立recordKey。"
    ]
  },
  {
    "item": 37,
    "recordKey": "jwf1102-p11-item-037",
    "code": "GB93",
    "name": "垫圈 8",
    "nameEn": null,
    "quantity": 36,
    "specification": "8",
    "remark": null,
    "dims": [
      "8"
    ],
    "dimensionSource": "厂家名称栏明确规格原文",
    "page": 11,
    "sheetPage": "共2页第1页",
    "sourceSlug": "jwf1102-p11-item-037",
    "sourceCropBoxPt": [
      459.12,
      299.52,
      814.56,
      317.28
    ],
    "auditIssues": [
      "第36—38项件号同为GB93，但规格、数量不同，按厂家序号建立独立recordKey。"
    ]
  },
  {
    "item": 38,
    "recordKey": "jwf1102-p11-item-038",
    "code": "GB93",
    "name": "垫圈 16",
    "nameEn": null,
    "quantity": 8,
    "specification": "16",
    "remark": null,
    "dims": [
      "16"
    ],
    "dimensionSource": "厂家名称栏明确规格原文",
    "page": 11,
    "sheetPage": "共2页第1页",
    "sourceSlug": "jwf1102-p11-item-038",
    "sourceCropBoxPt": [
      459.12,
      281.76,
      814.56,
      299.52
    ],
    "auditIssues": [
      "第36—38项件号同为GB93，但规格、数量不同，按厂家序号建立独立recordKey。"
    ]
  },
  {
    "item": 39,
    "recordKey": "jwf1102-p11-item-039",
    "code": "GB96",
    "name": "垫圈 12",
    "nameEn": null,
    "quantity": 2,
    "specification": "12",
    "remark": null,
    "dims": [
      "12"
    ],
    "dimensionSource": "厂家名称栏明确规格原文",
    "page": 11,
    "sheetPage": "共2页第1页",
    "sourceSlug": "jwf1102-p11-item-039",
    "sourceCropBoxPt": [
      459.12,
      264,
      814.56,
      281.76
    ],
    "auditIssues": [
      "第39、40项件号同为GB96，但规格、数量不同，按厂家序号建立独立recordKey。"
    ]
  },
  {
    "item": 40,
    "recordKey": "jwf1102-p11-item-040",
    "code": "GB96",
    "name": "垫圈 16",
    "nameEn": null,
    "quantity": 4,
    "specification": "16",
    "remark": null,
    "dims": [
      "16"
    ],
    "dimensionSource": "厂家名称栏明确规格原文",
    "page": 11,
    "sheetPage": "共2页第1页",
    "sourceSlug": "jwf1102-p11-item-040",
    "sourceCropBoxPt": [
      459.12,
      246.24,
      814.56,
      264
    ],
    "auditIssues": [
      "第39、40项件号同为GB96，但规格、数量不同，按厂家序号建立独立recordKey。"
    ]
  },
  {
    "item": 41,
    "recordKey": "jwf1102-p11-item-041",
    "code": "GB97.1",
    "name": "垫圈 8",
    "nameEn": null,
    "quantity": 4,
    "specification": "8",
    "remark": null,
    "dims": [
      "8"
    ],
    "dimensionSource": "厂家名称栏明确规格原文",
    "page": 11,
    "sheetPage": "共2页第1页",
    "sourceSlug": "jwf1102-p11-item-041",
    "sourceCropBoxPt": [
      459.12,
      228.48,
      814.56,
      246.24
    ],
    "auditIssues": [
      "第41—43项件号同为GB97.1，但规格、数量不同，按厂家序号建立独立recordKey。"
    ]
  },
  {
    "item": 42,
    "recordKey": "jwf1102-p11-item-042",
    "code": "GB97.1",
    "name": "垫圈 10",
    "nameEn": null,
    "quantity": 1,
    "specification": "10",
    "remark": null,
    "dims": [
      "10"
    ],
    "dimensionSource": "厂家名称栏明确规格原文",
    "page": 11,
    "sheetPage": "共2页第1页",
    "sourceSlug": "jwf1102-p11-item-042",
    "sourceCropBoxPt": [
      459.12,
      210.72,
      814.56,
      228.48
    ],
    "auditIssues": [
      "第41—43项件号同为GB97.1，但规格、数量不同，按厂家序号建立独立recordKey。"
    ]
  },
  {
    "item": 43,
    "recordKey": "jwf1102-p11-item-043",
    "code": "GB97.1",
    "name": "垫圈 16",
    "nameEn": null,
    "quantity": 4,
    "specification": "16",
    "remark": null,
    "dims": [
      "16"
    ],
    "dimensionSource": "厂家名称栏明确规格原文",
    "page": 11,
    "sheetPage": "共2页第1页",
    "sourceSlug": "jwf1102-p11-item-043",
    "sourceCropBoxPt": [
      459.12,
      192.96,
      814.56,
      210.72
    ],
    "auditIssues": [
      "第41—43项件号同为GB97.1，但规格、数量不同，按厂家序号建立独立recordKey。"
    ]
  },
  {
    "item": 44,
    "recordKey": "jwf1102-p11-item-044",
    "code": "GB879",
    "name": "销 5X12",
    "nameEn": null,
    "quantity": 4,
    "specification": "5X12",
    "remark": null,
    "dims": [
      "5X12"
    ],
    "dimensionSource": "厂家名称栏明确规格原文",
    "page": 11,
    "sheetPage": "共2页第1页",
    "sourceSlug": "jwf1102-p11-item-044",
    "sourceCropBoxPt": [
      459.12,
      175.2,
      814.56,
      192.96
    ],
    "auditIssues": []
  },
  {
    "item": 45,
    "recordKey": "jwf1102-p11-item-045",
    "code": "GB893.1",
    "name": "挡圈 52",
    "nameEn": null,
    "quantity": 2,
    "specification": "52",
    "remark": null,
    "dims": [
      "52"
    ],
    "dimensionSource": "厂家名称栏明确规格原文",
    "page": 11,
    "sheetPage": "共2页第1页",
    "sourceSlug": "jwf1102-p11-item-045",
    "sourceCropBoxPt": [
      459.12,
      157.44,
      814.56,
      175.2
    ],
    "auditIssues": [
      "第45、46项均为挡圈，但标准号和规格不同，必须独立建档。"
    ]
  },
  {
    "item": 46,
    "recordKey": "jwf1102-p11-item-046",
    "code": "GB894.1",
    "name": "挡圈 25",
    "nameEn": null,
    "quantity": 1,
    "specification": "25",
    "remark": null,
    "dims": [
      "25"
    ],
    "dimensionSource": "厂家名称栏明确规格原文",
    "page": 11,
    "sheetPage": "共2页第1页",
    "sourceSlug": "jwf1102-p11-item-046",
    "sourceCropBoxPt": [
      459.12,
      139.44,
      814.56,
      157.44
    ],
    "auditIssues": [
      "第45、46项均为挡圈，但标准号和规格不同，必须独立建档。"
    ]
  },
  {
    "item": 47,
    "recordKey": "jwf1102-p11-item-047",
    "code": "GB/T276-94",
    "name": "滚动轴承 6205-2Z",
    "nameEn": null,
    "quantity": 2,
    "specification": "6205-2Z",
    "remark": null,
    "dims": [
      "6205-2Z"
    ],
    "dimensionSource": "厂家名称栏明确规格原文",
    "page": 11,
    "sheetPage": "共2页第1页",
    "sourceSlug": "jwf1102-p11-item-047",
    "sourceCropBoxPt": [
      459.12,
      121.68,
      814.56,
      139.44
    ],
    "auditIssues": [
      "第47、48项均为滚动轴承，但型号、件号来源和备注不同，必须独立建档。"
    ]
  },
  {
    "item": 48,
    "recordKey": "jwf1102-p11-item-048",
    "code": null,
    "name": "滚动轴承 22209EAE4",
    "nameEn": null,
    "quantity": 2,
    "specification": "22209EAE4",
    "remark": "NSK",
    "dims": [
      "22209EAE4"
    ],
    "dimensionSource": "厂家名称栏明确规格原文",
    "page": 11,
    "sheetPage": "共2页第1页",
    "sourceSlug": "jwf1102-p11-item-048",
    "sourceCropBoxPt": [
      459.12,
      103.92,
      814.56,
      121.68
    ],
    "auditIssues": [
      "厂家件号栏为空；22209EAE4位于名称栏，NSK位于备注栏，二者均不得反填为件号。"
    ]
  },
  {
    "item": 49,
    "recordKey": "jwf1102-p11-item-049",
    "code": "GB5867-86",
    "name": "胀套 Z1-45X52",
    "nameEn": null,
    "quantity": 12,
    "specification": "Z1-45X52",
    "remark": "上海汉唐传动",
    "dims": [
      "Z1-45X52"
    ],
    "dimensionSource": "厂家名称栏明确规格原文",
    "page": 11,
    "sheetPage": "共2页第1页",
    "sourceSlug": "jwf1102-p11-item-049",
    "sourceCropBoxPt": [
      459.12,
      86.16,
      814.56,
      103.92
    ],
    "auditIssues": [
      "“上海汉唐传动”为厂家备注原文，不属于件号或零件名称。"
    ]
  },
  {
    "item": 50,
    "recordKey": "jwf1102-p11-item-050",
    "code": null,
    "name": "尼龙片基平皮带 GG-26,2.6X40X2900",
    "nameEn": null,
    "quantity": 1,
    "specification": "GG-26,2.6X40X2900",
    "remark": null,
    "dims": [
      "GG-26,2.6X40X2900"
    ],
    "dimensionSource": "厂家名称栏明确规格原文",
    "page": 11,
    "sheetPage": "共2页第1页",
    "sourceSlug": "jwf1102-p11-item-050",
    "sourceCropBoxPt": [
      459.12,
      68.4,
      814.56,
      86.16
    ],
    "auditIssues": [
      "厂家件号栏为空；GG-26,2.6X40X2900是名称栏规格串，不得反填为件号。"
    ]
  },
  {
    "item": 51,
    "recordKey": "jwf1102-p12-item-051",
    "code": "JB/T7940.1-95",
    "name": "油杯 M6",
    "nameEn": null,
    "quantity": 2,
    "specification": "M6",
    "remark": null,
    "dims": [
      "M6"
    ],
    "dimensionSource": "厂家名称栏明确规格原文",
    "page": 12,
    "sheetPage": "共2页第2页",
    "sourceSlug": "jwf1102-p12-item-051",
    "sourceCropBoxPt": [
      103.44,
      477.6,
      458.64,
      495.36
    ],
    "auditIssues": []
  },
  {
    "item": 52,
    "recordKey": "jwf1102-p12-item-052",
    "code": "FZ/T92010-91",
    "name": "毡圈 55",
    "nameEn": null,
    "quantity": 4,
    "specification": "55",
    "remark": null,
    "dims": [
      "55"
    ],
    "dimensionSource": "厂家名称栏明确规格原文",
    "page": 12,
    "sheetPage": "共2页第2页",
    "sourceSlug": "jwf1102-p12-item-052",
    "sourceCropBoxPt": [
      103.44,
      459.6,
      458.64,
      477.6
    ],
    "auditIssues": [
      "第52项是毡圈，不得与第45、46项金属挡圈合并。"
    ]
  },
  {
    "item": 53,
    "recordKey": "jwf1102-p12-item-053",
    "code": "JWF1102-0232",
    "name": "刀片",
    "nameEn": null,
    "quantity": 72,
    "specification": null,
    "remark": null,
    "dims": [],
    "dimensionSource": null,
    "page": 12,
    "sheetPage": "共2页第2页",
    "sourceSlug": "jwf1102-p12-item-053",
    "sourceCropBoxPt": [
      103.44,
      441.84,
      458.64,
      459.6
    ],
    "auditIssues": []
  },
  {
    "item": 54,
    "recordKey": "jwf1102-p12-item-054",
    "code": "JWF1102-0231",
    "name": "角钉",
    "nameEn": null,
    "quantity": 72,
    "specification": null,
    "remark": null,
    "dims": [],
    "dimensionSource": null,
    "page": 12,
    "sheetPage": "共2页第2页",
    "sourceSlug": "jwf1102-p12-item-054",
    "sourceCropBoxPt": [
      103.44,
      424.08,
      458.64,
      441.84
    ],
    "auditIssues": []
  },
  {
    "item": 55,
    "recordKey": "jwf1102-p12-item-055",
    "code": "JWF1102-0230",
    "name": "固定块",
    "nameEn": null,
    "quantity": 72,
    "specification": null,
    "remark": null,
    "dims": [],
    "dimensionSource": null,
    "page": 12,
    "sheetPage": "共2页第2页",
    "sourceSlug": "jwf1102-p12-item-055",
    "sourceCropBoxPt": [
      103.44,
      406.32,
      458.64,
      424.08
    ],
    "auditIssues": []
  },
  {
    "item": 56,
    "recordKey": "jwf1102-p12-item-056",
    "code": "GB859",
    "name": "垫圈 8",
    "nameEn": null,
    "quantity": 144,
    "specification": "8",
    "remark": null,
    "dims": [
      "8"
    ],
    "dimensionSource": "厂家名称栏明确规格原文",
    "page": 12,
    "sheetPage": "共2页第2页",
    "sourceSlug": "jwf1102-p12-item-056",
    "sourceCropBoxPt": [
      103.44,
      388.56,
      458.64,
      406.32
    ],
    "auditIssues": []
  },
  {
    "item": 57,
    "recordKey": "jwf1102-p12-item-057",
    "code": "GB70",
    "name": "螺钉 M8X25",
    "nameEn": null,
    "quantity": 144,
    "specification": "M8X25",
    "remark": null,
    "dims": [
      "M8X25"
    ],
    "dimensionSource": "厂家名称栏明确规格原文",
    "page": 12,
    "sheetPage": "共2页第2页",
    "sourceSlug": "jwf1102-p12-item-057",
    "sourceCropBoxPt": [
      103.44,
      370.8,
      458.64,
      388.56
    ],
    "auditIssues": []
  }
];

export const jwf1102P11P12Verified=rows.map(row=>({
  manual:'jwf1102',
  manualHeader:'JWF1102型单轴流开棉机',
  assembly:'JWF1102-0200',
  assemblyTitle:'打手部件',
  assemblyTitleEnSource:'BEATER ASS.',
  recordKey:row.recordKey,
  item:row.item,
  code:row.code,
  copyValue:row.code||row.recordKey,
  name:row.name,
  nameEn:row.nameEn,
  nameEnStatus:'厂家第11—12页明细行未提供英文零件名',
  page:row.page,
  sheetPage:row.sheetPage,
  quantity:row.quantity,
  quantityUnit:'件',
  quantityMeaning:'单台设备用量',
  quantityColumnEnSource:'QUALITY',
  specification:row.specification,
  remark:row.remark,
  dims:row.dims,
  dimensionSource:row.dimensionSource,
  dataStatus:'厂家资料已核',
  modelStatus:'待核',
  status:'厂家BOM已核·3D待核',
  sourceCrop:`assets/manuals/jwf1102/crops/${row.sourceSlug}.png`,
  sourceVector:`assets/manuals/jwf1102/crops/${row.sourceSlug}.pdf`,
  sourceCropBoxPt:row.sourceCropBoxPt,
  auditIssues:row.auditIssues,
}));
