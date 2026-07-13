// JWF1206 原PDF第9页：逐格依据600dpi厂家原图的剖面、轮廓和明示尺寸建立。
// 坐标单位为毫米，X=宽、Y=高、Z=深；厂家未标尺寸仅写入 assumptions。
export const jwf1206P09ModelSpecs = {
  'JWF1206-0200-1': {
    level: '尺寸级',
    material: 'metal',
    source: {
      page: 9,
      dimensions: ['φ90', 'Z=127'],
      views: ['轴向剖视图'],
      assumptions: ['外径和轴向总长取自厂家标注', '轴径、双轴承尺寸、右端阶梯座和润滑嘴尺寸按剖视比例估算'],
    },
    primitives: [
      {
        type: 'lathe',
        points: [[30, -63.5], [43, -63.5], [45, -58], [45, 18], [42, 22], [35, 22], [35, 30], [30, 30], [30, -63.5]],
        rotation: [1.5708, 0, 0],
        material: 'darkMetal',
      },
      {
        type: 'lathe',
        points: [[12, 22], [35, 22], [35, 37], [30, 37], [30, 63.5], [12, 63.5], [12, 22]],
        rotation: [1.5708, 0, 0],
      },
      { type: 'cylinder', radius: 15, length: 96, axis: 'z', position: [0, 0, -10] },
      { type: 'torus', radius: 25, tube: 5, position: [0, 0, -34], material: 'metal' },
      { type: 'torus', radius: 25, tube: 5, position: [0, 0, 8], material: 'metal' },
      { type: 'cylinder', radius: 11.5, length: 28, axis: 'z', position: [0, 0, 49.5], material: 'darkMetal' },
      { type: 'cylinder', radius: 5, radiusTop: 2, radiusBottom: 5, length: 11, axis: 'z', position: [0, 0, -58], material: 'brass' },
    ],
  },

  'JWF1206-0201': {
    level: '尺寸级',
    material: 'metal',
    source: {
      page: 9,
      dimensions: ['M12', 'X=270'],
      views: ['主视图'],
      assumptions: ['螺纹大径按M12取12', '螺距未标，螺纹以间隔环纹作视觉表达，不作为加工牙型'],
    },
    primitives: [
      { type: 'cylinder', radius: 5.35, length: 270, axis: 'x', material: 'metal' },
    ],
  },

  'JWF1206-0202': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 9,
      dimensions: ['X=300', 'Y=440'],
      views: ['展开平面图'],
      assumptions: ['厂家未标板厚，按10估算', '两处大减重孔、四个长圆安装孔、小圆孔及左下避让台阶按平面图比例估算'],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-150, -220], [150, -220], [150, 220], [-150, 220], [-150, -140], [-205, -140], [-205, -195], [-165, -195], [-154, -205]],
        depth: 10,
        bevel: 2,
        holes: [
          { kind: 'polygon', points: [[-76, 58], [-66, 68], [58, 68], [68, 58], [68, 155], [58, 165], [-66, 165], [-76, 155]] },
          { kind: 'polygon', points: [[-76, -160], [-66, -170], [58, -170], [68, -160], [68, -65], [58, -55], [-66, -55], [-76, -65]] },
          { kind: 'polygon', points: [[-128, 196], [-116, 202], [-96, 202], [-84, 196], [-96, 190], [-116, 190]] },
          { kind: 'polygon', points: [[84, 196], [96, 202], [116, 202], [128, 196], [116, 190], [96, 190]] },
          { kind: 'polygon', points: [[-128, -202], [-116, -196], [-96, -196], [-84, -202], [-96, -208], [-116, -208]] },
          { kind: 'polygon', points: [[84, -202], [96, -196], [116, -196], [128, -202], [116, -208], [96, -208]] },
          { kind: 'circle', center: [-105, 45], radius: 6 },
          { kind: 'circle', center: [105, 45], radius: 6 },
          { kind: 'circle', center: [-105, -145], radius: 6 },
          { kind: 'circle', center: [105, -145], radius: 6 },
          { kind: 'circle', center: [-193, -168], radius: 6 },
        ],
      },
    ],
  },

  'JWF1206-0203': {
    level: '尺寸级',
    material: 'darkMetal',
    source: {
      page: 9,
      dimensions: ['X=140', 'Y=50', 'Z=25'],
      views: ['俯视图', '剖视图'],
      assumptions: ['三向外廓尺寸取自厂家标注', '中心阶梯孔、四个紧固孔和右侧调节螺孔的孔径及定位按视图比例估算'],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-70, -25], [70, -25], [70, 25], [-70, 25]],
        depth: 25,
        bevel: 1,
        holes: [
          { kind: 'circle', center: [0, 0], radius: 18 },
          { kind: 'circle', center: [-58, 15], radius: 5 },
          { kind: 'circle', center: [58, 15], radius: 5 },
          { kind: 'circle', center: [58, -15], radius: 5 },
          { kind: 'circle', center: [-15, 0], radius: 4 },
        ],
      },
      { type: 'lathe', points: [[9, -12.5], [18, -12.5], [18, 1.5], [9, 1.5]], rotation: [1.5708, 0, 0], material: 'metal', flatShading: false },
      { type: 'cylinder', radius: 5, length: 58, axis: 'x', position: [41, 0, 0], material: 'metal' },
      { type: 'cylinder', radius: 7, radiusTop: 3, radiusBottom: 7, length: 9, axis: 'x', position: [66, 0, 0], material: 'metal' },
    ],
  },

  'JWF1206-0204': {
    level: '尺寸级',
    material: 'metal',
    source: {
      page: 9,
      dimensions: ['X=32', 'Y=16', 'Z=10'],
      views: ['俯视图', '剖视图'],
      assumptions: ['三向外廓尺寸取自厂家标注', '中心沉孔和通孔孔径未标，按俯视、剖视比例估算'],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-16, -4], [-14, -8], [14, -8], [16, -4], [16, 4], [14, 8], [-14, 8], [-16, 4]],
        depth: 10,
        bevel: 1,
        holes: [{ kind: 'circle', center: [0, 0], radius: 5.5 }],
      },
      { type: 'lathe', points: [[4, -5], [5.5, -5], [5.5, 0], [4, 0]], rotation: [1.5708, 0, 0], material: 'darkMetal', flatShading: false },
    ],
  },

  'FA221B-0203': {
    level: '尺寸级',
    material: 'metal',
    source: {
      page: 9,
      dimensions: ['φ135', 'Z=82'],
      views: ['轴向剖视图'],
      assumptions: ['外径和总宽取自厂家标注', '中心孔、轮毂和单侧凹腔尺寸按剖视比例估算；外圆按图作轻微鼓形'],
    },
    primitives: [
      {
        type: 'lathe',
        points: [[35, -41], [66.5, -41], [67.5, 0], [66.5, 41], [20, 41], [20, 12], [35, 12]],
        rotation: [1.5708, 0, 0],
      },
    ],
  },

  'FA221B-0204': {
    level: '尺寸级',
    material: 'metal',
    source: {
      page: 9,
      dimensions: ['φ155', 'Z=82'],
      views: ['轴向剖视图'],
      assumptions: ['外径和总宽取自厂家标注', '中心孔、轮毂、中央轮辐和两侧凹腔尺寸按剖视比例估算；外圆按图作轻微鼓形'],
    },
    primitives: [
      {
        type: 'lathe',
        points: [[20, -41], [36, -41], [36, -14], [67.5, -14], [67.5, -32], [76.5, -39], [77.5, 0], [76.5, 39], [67.5, 32], [67.5, 14], [36, 14], [36, 41], [20, 41], [20, -41]],
        rotation: [1.5708, 0, 0],
      },
    ],
  },

  'FA221B-0205': {
    level: '尺寸级',
    material: 'metal',
    source: {
      page: 9,
      dimensions: ['φ175', 'Z=82'],
      views: ['轴向剖视图'],
      assumptions: ['外径和总宽取自厂家标注', '中心孔、轮毂、中央轮辐和两侧凹腔尺寸按剖视比例估算；外圆按图作轻微鼓形'],
    },
    primitives: [
      {
        type: 'lathe',
        points: [[21, -41], [38, -41], [38, -14], [77.5, -14], [77.5, -32], [86.5, -39], [87.5, 0], [86.5, 39], [77.5, 32], [77.5, 14], [38, 14], [38, 41], [21, 41], [21, -41]],
        rotation: [1.5708, 0, 0],
      },
    ],
  },

  'FA225B-0201': {
    level: '尺寸级',
    material: 'metal',
    source: {
      page: 9,
      dimensions: ['φ190', 'Z=82'],
      views: ['轴向剖视图'],
      assumptions: ['外径和总宽取自厂家标注', '中心孔、轮毂、中央轮辐和两侧凹腔尺寸按剖视比例估算；外圆按图作轻微鼓形'],
    },
    primitives: [
      {
        type: 'lathe',
        points: [[22, -41], [40, -41], [40, -14], [85, -14], [85, -32], [94, -39], [95, 0], [94, 39], [85, 32], [85, 14], [40, 14], [40, 41], [22, 41], [22, -41]],
        rotation: [1.5708, 0, 0],
      },
    ],
  },

  'FA225B-0202': {
    level: '尺寸级',
    material: 'metal',
    source: {
      page: 9,
      dimensions: ['φ210', 'Z=82'],
      views: ['轴向剖视图'],
      assumptions: ['外径和总宽取自厂家标注', '中心孔、轮毂、中央轮辐和两侧凹腔尺寸按剖视比例估算；外圆按图作轻微鼓形'],
    },
    primitives: [
      {
        type: 'lathe',
        points: [[23, -41], [42, -41], [42, -14], [95, -14], [95, -32], [104, -39], [105, 0], [104, 39], [95, 32], [95, 14], [42, 14], [42, 41], [23, 41], [23, -41]],
        rotation: [1.5708, 0, 0],
      },
    ],
  },

  'FA225B-0203': {
    level: '尺寸级',
    material: 'metal',
    source: {
      page: 9,
      dimensions: ['φ230', 'Z=82'],
      views: ['轴向剖视图'],
      assumptions: ['外径和总宽取自厂家标注', '中心孔、轮毂、中央轮辐和两侧凹腔尺寸按剖视比例估算；外圆按图作轻微鼓形'],
    },
    primitives: [
      {
        type: 'lathe',
        points: [[24, -41], [44, -41], [44, -14], [105, -14], [105, -32], [114, -39], [115, 0], [114, 39], [105, 32], [105, 14], [44, 14], [44, 41], [24, 41], [24, -41]],
        rotation: [1.5708, 0, 0],
      },
    ],
  },

  'FA221D-0203': {
    level: '尺寸级',
    material: 'metal',
    source: {
      page: 9,
      dimensions: ['φ550', 'Z=80'],
      views: ['正视图', '轴向剖视图'],
      assumptions: ['外径和总宽取自厂家标注', '中心孔、轮毂、轮缘厚度、六根渐宽轮辐及六个减重开口按两视图比例估算'],
    },
    primitives: [
      {
        type: 'lathe',
        points: [[260, -40], [275, -40], [275, 40], [260, 40], [260, -40]],
        rotation: [1.5708, 0, 0],
        material: 'darkMetal',
      },
      {
        type: 'lathe',
        points: [[25, -40], [48, -40], [48, 40], [25, 40], [25, -40]],
        rotation: [1.5708, 0, 0],
      },
      { type: 'extrude', points: [[45, -24], [260, -38], [260, 38], [45, 24]], depth: 22, bevel: 2 },
      { type: 'extrude', points: [[45, -24], [260, -38], [260, 38], [45, 24]], depth: 22, bevel: 2, rotation: [0, 0, 1.0472] },
      { type: 'extrude', points: [[45, -24], [260, -38], [260, 38], [45, 24]], depth: 22, bevel: 2, rotation: [0, 0, 2.0944] },
      { type: 'extrude', points: [[45, -24], [260, -38], [260, 38], [45, 24]], depth: 22, bevel: 2, rotation: [0, 0, 3.1416] },
      { type: 'extrude', points: [[45, -24], [260, -38], [260, 38], [45, 24]], depth: 22, bevel: 2, rotation: [0, 0, 4.1888] },
      { type: 'extrude', points: [[45, -24], [260, -38], [260, 38], [45, 24]], depth: 22, bevel: 2, rotation: [0, 0, 5.236] },
    ],
  },

  'ZFA211-0201A': {
    level: '尺寸级',
    material: 'metal',
    source: {
      page: 9,
      dimensions: ['φ110', 'Z=90'],
      views: ['轴向剖视图'],
      assumptions: ['外径和总宽取自厂家标注', '中心孔、端面台阶及倒角尺寸按剖视比例估算'],
    },
    primitives: [
      {
        type: 'lathe',
        points: [[22, -45], [48, -45], [55, -38], [55, 38], [48, 45], [22, 45], [22, -45]],
        rotation: [1.5708, 0, 0],
      },
    ],
  },

  'ZFA211-0203~0205': {
    level: '尺寸级',
    material: 'metal',
    source: {
      page: 9,
      dimensions: ['X=35', 'Y=25', 'Z=2/3/8'],
      views: ['正视图', '厚度表'],
      assumptions: ['厂家在同一格列出0203、0204、0205三种厚度', '原图未标孔径，3D中暂按约φ8呈现', '三种零件正视轮廓相同；3D以8毫米厚的0205作为代表实体，2毫米和3毫米厚度保留在厂家尺寸元数据中'],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-17.5, -12.5], [17.5, -12.5], [17.5, 12.5], [-17.5, 12.5]],
        depth: 8,
        position: [0, 0, 0],
        bevel: 0.5,
        holes: [{ kind: 'circle', center: [0, 0], radius: 4 }],
      },
    ],
  },
};

for (const [partCode, spec] of Object.entries(jwf1206P09ModelSpecs)) {
  const hasSection = spec.source.views.some((view) => /剖/.test(view));
  const cropCode = partCode === 'ZFA211-0203~0205' ? 'ZFA211-0203_0205' : partCode;
  spec.source.sourceCrop = `assets/manuals/jwf1206/crops/${cropCode}.png`;
  spec.source.sourceVector = `assets/manuals/jwf1206/crops/${cropCode}.pdf`;
  spec.source.cropDpi = 600;
  spec.source.excludedLines = [
    '原格表框、件号、名称、数量栏与文字', '尺寸线、箭头与尺寸数字', '尺寸延长线',
    '中心线与中心十字', '引出线与标注线', ...(hasSection ? ['剖面填充线'] : []),
  ];
  spec.source.unknowns = spec.source.assumptions.filter((text) => /未.*(?:标|给|注明|画|规定|建模)|估算|比例|近似|代表|暂按/.test(text));
  spec.source.reconstructionRule = '逐格识别主视、辅助视图和剖面；清除非实体标注线后，只按厂家明示尺寸与闭合实体轮廓建模。';
}
