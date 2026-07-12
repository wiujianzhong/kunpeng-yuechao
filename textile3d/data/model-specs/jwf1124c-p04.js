// JWF1124C-160 原PDF第4页19项BOM：件号、名称和明确规格以厂家资料为准。
// 坐标单位为毫米，X=宽、Y=高、Z=深；第3页只提供爆炸总图，未标尺寸均只作视觉级估算并写入assumptions。

const source = (dimensions, assumptions, views = ['第3页爆炸总图等轴测外形', '第4页BOM']) => ({
  page: 4,
  dimensions,
  views,
  assumptions,
});

const circleHole = (x, y, radius) => ({ kind: 'circle', center: [x, y], radius });
const hexagon = radius => Array.from({ length: 6 }, (_, index) => {
  const angle = Math.PI / 6 + index * Math.PI / 3;
  return [radius * Math.cos(angle), radius * Math.sin(angle)];
});

const hexNutSpec = ({ code, recordKey, nominal, acrossFlats, height }) => ({
  code,
  recordKey,
  level: '轮廓级',
  material: 'metal',
  source: source(
    [`M${nominal}`],
    [
      `厂家中文名称只明确规格M${nominal}，没有标准件单独视图。`,
      `六角对边${acrossFlats}、高${height}、通孔余量及倒角均按常见六角螺母比例估算，不作加工尺寸。`,
    ],
    ['第3页爆炸总图标准件示意', '第4页BOM规格'],
  ),
  primitives: [
    {
      type: 'extrude',
      points: hexagon(acrossFlats / Math.sqrt(3)),
      depth: height,
      holes: [circleHole(0, 0, nominal * 0.52)],
      position: [0, 0, 0],
      material: 'metal',
    },
  ],
});

const washerSpec = ({ code, recordKey, nominal, outerDiameter, thickness }) => ({
  code,
  recordKey,
  level: '轮廓级',
  material: 'metal',
  source: source(
    [`${nominal}`],
    [
      `厂家中文名称只明确垫圈规格${nominal}，没有标准件单独视图。`,
      `外径${outerDiameter}、厚${thickness}和内孔装配余量按大垫圈的常见比例估算，不写入厂家尺寸。`,
    ],
    ['第3页爆炸总图环形垫圈示意', '第4页BOM规格'],
  ),
  primitives: [
    {
      type: 'lathe',
      points: [
        [nominal * 0.53, -thickness / 2],
        [outerDiameter / 2, -thickness / 2],
        [outerDiameter / 2, thickness / 2],
        [nominal * 0.53, thickness / 2],
      ],
      position: [0, 0, 0],
      material: 'metal',
      flatShading: false,
    },
  ],
});

export const jwf1124cP04ModelSpecs = {
  'JWF1124C-160-0100B': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: source([], [
      '厂家未给机架独立尺寸；整体约2100×1200×1100按第3页整机比例估算。',
      '只建立四角立柱、上下纵横梁、正面中梁和脚座；密集安装孔、焊缝及内部小支架未臆测。',
    ]),
    primitives: [
      { type: 'box', size: [2100, 70, 80], position: [0, -565, -500] },
      { type: 'box', size: [2100, 70, 80], position: [0, -565, 500] },
      { type: 'box', size: [80, 70, 1000], position: [-1010, -565, 0] },
      { type: 'box', size: [80, 70, 1000], position: [1010, -565, 0] },
      { type: 'box', size: [80, 1200, 80], position: [-1010, 0, -500] },
      { type: 'box', size: [80, 1200, 80], position: [1010, 0, -500] },
      { type: 'box', size: [80, 1200, 80], position: [-1010, 0, 500] },
      { type: 'box', size: [80, 1200, 80], position: [1010, 0, 500] },
      { type: 'box', size: [2100, 70, 80], position: [0, 565, -500] },
      { type: 'box', size: [2100, 70, 80], position: [0, 565, 500] },
      { type: 'box', size: [80, 70, 1000], position: [-1010, 565, 0] },
      { type: 'box', size: [80, 70, 1000], position: [1010, 565, 0] },
      { type: 'box', size: [2020, 100, 65], position: [0, 190, 505], material: 'darkMetal' },
      { type: 'box', size: [170, 45, 190], position: [-900, -620, -440], material: 'darkMetal' },
      { type: 'box', size: [170, 45, 190], position: [900, -620, -440], material: 'darkMetal' },
      { type: 'box', size: [170, 45, 190], position: [-900, -620, 440], material: 'darkMetal' },
      { type: 'box', size: [170, 45, 190], position: [900, -620, 440], material: 'darkMetal' },
    ],
  },

  'JWF1124C-160-0200B': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: source([], [
      '厂家未给除尘部件独立尺寸；长条吸风箱、斜向导流板与双吸口位置按第3页机内可见关系估算。',
      '只表达除尘通道的主要箱体、两个圆形吸口和下部排尘缝；分梳板、除尘刀与调节机构的精确间隙未标。',
    ]),
    primitives: [
      { type: 'box', size: [1750, 260, 430], position: [0, 0, 0] },
      { type: 'box', size: [1680, 30, 360], position: [0, 115, -10], material: 'darkMetal' },
      { type: 'box', size: [1600, 22, 120], position: [0, -145, 80], rotation: [0.16, 0, 0], material: 'metal' },
      { type: 'box', size: [1600, 20, 80], position: [0, -110, -95], rotation: [-0.12, 0, 0], material: 'darkMetal' },
      { type: 'cylinder', radius: 105, length: 150, axis: 'y', position: [-520, 200, -60], material: 'paintedMetal' },
      { type: 'cylinder', radius: 105, length: 150, axis: 'y', position: [520, 200, -60], material: 'paintedMetal' },
      { type: 'torus', radius: 105, tube: 12, position: [-520, 278, -60], rotation: [1.5708, 0, 0], material: 'darkMetal' },
      { type: 'torus', radius: 105, tube: 12, position: [520, 278, -60], rotation: [1.5708, 0, 0], material: 'darkMetal' },
    ],
  },

  'JWF1124C-160-0300': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: source([], [
      '厂家未给给棉部件独立尺寸；双给棉罗拉、输棉帘和两侧支板均按第3页顶部可见比例估算。',
      '本模型用两根平行辊筒与一段输送帘表达给棉路径，齿形、轴承座和张紧器未标而只作轮廓。',
    ]),
    primitives: [
      { type: 'box', size: [1560, 34, 520], position: [0, -105, 0], material: 'darkMetal' },
      { type: 'cylinder', radius: 82, length: 1500, axis: 'x', position: [0, 40, -155], material: 'metal' },
      { type: 'cylinder', radius: 82, length: 1500, axis: 'x', position: [0, 40, 155], material: 'metal' },
      { type: 'cylinder', radius: 28, length: 1740, axis: 'x', position: [0, 40, -155], material: 'darkMetal' },
      { type: 'cylinder', radius: 28, length: 1740, axis: 'x', position: [0, 40, 155], material: 'darkMetal' },
      { type: 'box', size: [42, 420, 540], position: [-790, 20, 0] },
      { type: 'box', size: [42, 420, 540], position: [790, 20, 0] },
      { type: 'cylinder', radius: 125, length: 48, axis: 'x', position: [-815, 40, -155], material: 'darkMetal' },
      { type: 'cylinder', radius: 125, length: 48, axis: 'x', position: [815, 40, -155], material: 'darkMetal' },
    ],
  },

  'JWF1124C-160-0400': {
    level: '轮廓级',
    material: 'metal',
    source: source([], [
      '厂家未给打手部件独立尺寸；中央长辊、端盘、轴和外周梳针排布按第3页顶部中央外形估算。',
      '梳针仅用六条纵向针条表达，未臆测针数、针距、辊筒动平衡和轴承配合。',
    ]),
    primitives: [
      { type: 'cylinder', radius: 175, length: 1500, axis: 'x', position: [0, 0, 0], material: 'darkMetal' },
      { type: 'cylinder', radius: 34, length: 1770, axis: 'x', position: [0, 0, 0], material: 'metal' },
      { type: 'cylinder', radius: 205, length: 26, axis: 'x', position: [-752, 0, 0], material: 'metal' },
      { type: 'cylinder', radius: 205, length: 26, axis: 'x', position: [752, 0, 0], material: 'metal' },
      { type: 'box', size: [1450, 24, 34], position: [0, 182, 0], material: 'metal' },
      { type: 'box', size: [1450, 24, 34], position: [0, -182, 0], material: 'metal' },
      { type: 'box', size: [1450, 34, 24], position: [0, 0, 182], material: 'metal' },
      { type: 'box', size: [1450, 34, 24], position: [0, 0, -182], material: 'metal' },
      { type: 'box', size: [1450, 24, 30], position: [0, 128, 128], rotation: [0.7854, 0, 0], material: 'metal' },
      { type: 'box', size: [1450, 24, 30], position: [0, -128, -128], rotation: [0.7854, 0, 0], material: 'metal' },
    ],
  },

  'JWF1124C-160-0500': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: source([], [
      '厂家未给排杂部件独立尺寸；双斜面排杂斗、下部出口和横向连接梁按第3页机体下部位置估算。',
      '第4页数量为2；这里只建单件模型，不在几何中复制成整机两件安装状态。',
    ]),
    primitives: [
      { type: 'box', size: [1500, 70, 520], position: [0, 270, 0], material: 'darkMetal' },
      { type: 'extrude', points: [[-310, -260], [310, -260], [245, 260], [-245, 260]], depth: 420, position: [-390, 0, 0] },
      { type: 'extrude', points: [[-310, -260], [310, -260], [245, 260], [-245, 260]], depth: 420, position: [390, 0, 0] },
      { type: 'box', size: [500, 110, 330], position: [-390, -310, 0], material: 'darkMetal' },
      { type: 'box', size: [500, 110, 330], position: [390, -310, 0], material: 'darkMetal' },
      { type: 'box', size: [50, 640, 460], position: [-760, -10, 0] },
      { type: 'box', size: [50, 640, 460], position: [760, -10, 0] },
    ],
  },

  'JWF1124-0600A': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: source([], [
      '厂家未给安全罩部件独立尺寸；大面积侧罩、外周加强边、中缝和铰链位置按第3页整机右侧外形估算。',
      '本件仅表达关闭时的外观轮廓；罩内支撑、气弹簧、门锁和精确开启轨迹未标。',
    ]),
    primitives: [
      { type: 'box', size: [1980, 1080, 28], position: [0, 0, 0] },
      { type: 'box', size: [1980, 52, 55], position: [0, 514, 12], material: 'darkMetal' },
      { type: 'box', size: [1980, 52, 55], position: [0, -514, 12], material: 'darkMetal' },
      { type: 'box', size: [52, 1080, 55], position: [-964, 0, 12], material: 'darkMetal' },
      { type: 'box', size: [52, 1080, 55], position: [964, 0, 12], material: 'darkMetal' },
      { type: 'box', size: [36, 1010, 42], position: [0, 0, 26], material: 'darkMetal' },
      { type: 'cylinder', radius: 18, length: 170, axis: 'y', position: [985, 330, 30], material: 'metal' },
      { type: 'cylinder', radius: 18, length: 170, axis: 'y', position: [985, 0, 30], material: 'metal' },
      { type: 'cylinder', radius: 18, length: 170, axis: 'y', position: [985, -330, 30], material: 'metal' },
    ],
  },

  'JWF1124-0700A': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: source([], [
      '厂家未给联接部件独立尺寸；成对护板、输棉帘连接段、两端辊筒和张紧位置按第3页机顶长条结构估算。',
      '第3页只能确认该部件位于顶部给棉/输送路径，不能据此推定链轮、带轮和护板内部的工程尺寸。',
    ]),
    primitives: [
      { type: 'box', size: [1850, 42, 360], position: [0, 0, 0], material: 'darkMetal' },
      { type: 'box', size: [1850, 150, 42], position: [0, 70, -180] },
      { type: 'box', size: [1850, 150, 42], position: [0, 70, 180] },
      { type: 'cylinder', radius: 82, length: 360, axis: 'z', position: [-800, 15, 0], material: 'metal' },
      { type: 'cylinder', radius: 82, length: 360, axis: 'z', position: [800, 15, 0], material: 'metal' },
      { type: 'cylinder', radius: 48, length: 360, axis: 'z', position: [0, 15, 0], material: 'metal' },
      { type: 'cylinder', radius: 115, length: 45, axis: 'z', position: [-800, 15, -203], material: 'darkMetal' },
      { type: 'cylinder', radius: 115, length: 45, axis: 'z', position: [800, 15, -203], material: 'darkMetal' },
      { type: 'box', size: [170, 250, 70], position: [690, -95, -180], material: 'darkMetal' },
    ],
  },

  'JWF1124-0000-1': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: source([], [
      '第3页可确认该件为长矩形接管、顶部双翻边，侧面有长圆开口；厂家未标长宽高和板厚。',
      '长1800、高340、深320、板厚8及长圆孔尺寸按爆炸图比例估算，不作加工尺寸。',
    ]),
    primitives: [
      { type: 'box', size: [1800, 8, 320], position: [0, -166, 0] },
      { type: 'box', size: [1800, 340, 8], position: [0, 0, -156] },
      {
        type: 'extrude',
        points: [[-900, -170], [900, -170], [900, 170], [-900, 170]],
        depth: 8,
        holes: [{
          kind: 'polygon',
          points: [[-360, -52], [300, -52], [342, -38], [370, 0], [342, 38], [300, 52], [-360, 52], [-402, 38], [-430, 0], [-402, -38]],
        }],
        position: [0, 0, 156],
      },
      { type: 'box', size: [1800, 26, 75], position: [0, 178, -140], material: 'darkMetal' },
      { type: 'box', size: [1800, 26, 75], position: [0, 178, 140], material: 'darkMetal' },
      { type: 'box', size: [55, 340, 320], position: [-872, 0, 0], material: 'darkMetal' },
      { type: 'box', size: [55, 340, 320], position: [872, 0, 0], material: 'darkMetal' },
    ],
  },

  'JWF1124-0000-2': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: source([], [
      '厂家名称已核准为“方接圆结合件”；第3页可见方形底座、锥台过渡罩和上部圆口。',
      '方口460×300、总高480、圆口直径150、板厚8及锥面斜率均按爆炸图比例估算。',
    ]),
    primitives: [
      { type: 'box', size: [500, 12, 340], position: [0, -220, 0], material: 'darkMetal' },
      { type: 'extrude', points: [[-220, -210], [220, -210], [80, 170], [-80, 170]], depth: 8, position: [0, 0, 146] },
      { type: 'extrude', points: [[-220, -210], [220, -210], [80, 170], [-80, 170]], depth: 8, position: [0, 0, -146] },
      { type: 'extrude', points: [[-150, -210], [150, -210], [80, 170], [-80, 170]], depth: 8, position: [216, 0, 0], rotation: [0, 1.5708, 0] },
      { type: 'extrude', points: [[-150, -210], [150, -210], [80, 170], [-80, 170]], depth: 8, position: [-216, 0, 0], rotation: [0, 1.5708, 0] },
      { type: 'cylinder', radius: 75, length: 90, axis: 'y', position: [0, 215, 0] },
      { type: 'torus', radius: 78, tube: 11, position: [0, 262, 0], rotation: [1.5708, 0, 0], material: 'darkMetal' },
    ],
  },

  'JWF1124-0001': {
    level: '轮廓级',
    material: 'glass',
    source: source([], [
      '第3页可确认该件为接管侧面的长圆透视窗；厂家未标长、宽、厚度和材质。',
      '外框400×100×12、玻璃360×76×6按第3页外形比例估算；透明片用glass，周边压框用rubber作视觉区分。',
    ]),
    primitives: [
      {
        type: 'extrude',
        points: [[-160, -50], [160, -50], [190, -30], [200, 0], [190, 30], [160, 50], [-160, 50], [-190, 30], [-200, 0], [-190, -30]],
        depth: 12,
        holes: [{
          kind: 'polygon',
          points: [[-150, -38], [150, -38], [174, -23], [182, 0], [174, 23], [150, 38], [-150, 38], [-174, 23], [-182, 0], [-174, -23]],
        }],
        position: [0, 0, 0],
        material: 'rubber',
      },
      {
        type: 'extrude',
        points: [[-150, -38], [150, -38], [174, -23], [182, 0], [174, 23], [150, 38], [-150, 38], [-174, 23], [-182, 0], [-174, -23]],
        depth: 6,
        position: [0, 0, 0],
        material: 'glass',
      },
    ],
  },

  'TV425A-0501': {
    level: '轮廓级',
    material: 'plastic',
    source: source([], [
      '厂家件号已核准为TV425A-0501，中文名为“禁令牌”；第4页未给牌面尺寸或单独图形。',
      '牌面260×160×4、四角孔径及孔位仅按常见设备标识牌比例估算；牌面图文未由厂家页提供，因此不臆造。',
    ], ['第3页整机安装位置示意', '第4页BOM件号与名称']),
    primitives: [
      {
        type: 'extrude',
        points: [[-130, -80], [130, -80], [130, 80], [-130, 80]],
        depth: 4,
        holes: [circleHole(-112, -62, 3), circleHole(112, -62, 3), circleHole(112, 62, 3), circleHole(-112, 62, 3)],
        position: [0, 0, 0],
        material: 'plastic',
      },
      { type: 'box', size: [210, 8, 3], position: [0, 35, 3], material: 'darkMetal' },
      { type: 'box', size: [150, 8, 3], position: [0, 5, 3], material: 'darkMetal' },
      { type: 'box', size: [180, 8, 3], position: [0, -25, 3], material: 'darkMetal' },
    ],
  },

  'TZH1077-1.5X3X1170': {
    level: '尺寸级',
    material: 'rubber',
    source: source(
      ['1.5', '3', '1170'],
      [
        '厂家本页没有独立尺寸栏；1.5×3×1170只来自件号中的明确规格串。',
        '按连续矩形橡胶嵌条建立；倒角、硬度、压缩量和安装预紧未标。',
      ],
      ['第4页BOM件号规格'],
    ),
    primitives: [
      { type: 'box', size: [1170, 3, 1.5], position: [0, 0, 0], material: 'rubber' },
    ],
  },

  'TZH1078-6X7X1170': {
    level: '尺寸级',
    material: 'rubber',
    source: source(
      ['6', '7', '1170'],
      [
        '厂家本页没有独立尺寸栏；6×7×1170只来自件号中的明确规格串。',
        '按连续矩形橡胶嵌芯建立；截面圆角、硬度和受压后形状未标。',
      ],
      ['第4页BOM件号规格'],
    ),
    primitives: [
      { type: 'box', size: [1170, 7, 6], position: [0, 0, 0], material: 'rubber' },
    ],
  },

  GB799: {
    level: '尺寸级',
    material: 'metal',
    source: source(
      ['M16', '220'],
      [
        '厂家中文名称明确螺栓M16×220，第3页标号14可见长直杆与底部弯钩外形。',
        '直杆段、螺纹段和弯钩长度分配按标号14示意比例估算；螺距仅用环纹视觉表达。',
      ],
      ['第3页爆炸总图标号14外形', '第4页BOM规格'],
    ),
    primitives: [
      { type: 'cylinder', radius: 8, length: 170, axis: 'y', position: [0, 25, 0], material: 'metal' },
      { type: 'tube', points: [[0, -60, 0], [0, -86, 0], [5, -102, 0], [18, -110, 0], [33, -105, 0], [40, -92, 0]], radius: 8, material: 'metal' },
      { type: 'torus', radius: 8, tube: 0.7, position: [0, 82, 0], rotation: [1.5708, 0, 0], material: 'darkMetal' },
      { type: 'torus', radius: 8, tube: 0.7, position: [0, 92, 0], rotation: [1.5708, 0, 0], material: 'darkMetal' },
      { type: 'torus', radius: 8, tube: 0.7, position: [0, 102, 0], rotation: [1.5708, 0, 0], material: 'darkMetal' },
    ],
  },

  GB5783: {
    level: '尺寸级',
    material: 'metal',
    source: source(
      ['M6', '20'],
      [
        '厂家中文名称明确螺栓M6×20，没有该标准件的单独视图。',
        '六角头对边、头高、螺纹长度和螺距按常见六角头螺栓比例估算；公称直径和杆长保持厂家规格。',
      ],
      ['第3页爆炸总图标号15示意', '第4页BOM规格'],
    ),
    primitives: [
      { type: 'cylinder', radius: 3, length: 20, axis: 'y', position: [0, 0, 0], material: 'metal' },
      { type: 'cylinder', radius: 5.8, length: 4, axis: 'y', position: [0, -12, 0], segments: 6, material: 'darkMetal' },
      { type: 'torus', radius: 3, tube: 0.35, position: [0, 3, 0], rotation: [1.5708, 0, 0], material: 'darkMetal' },
      { type: 'torus', radius: 3, tube: 0.35, position: [0, 7, 0], rotation: [1.5708, 0, 0], material: 'darkMetal' },
      { type: 'torus', radius: 3, tube: 0.35, position: [0, 10, 0], rotation: [1.5708, 0, 0], material: 'darkMetal' },
    ],
  },

  'jwf1124c-p04-item-16': hexNutSpec({
    code: 'GB6170',
    recordKey: 'jwf1124c-p04-item-16',
    nominal: 6,
    acrossFlats: 10,
    height: 5,
  }),

  'jwf1124c-p04-item-17': hexNutSpec({
    code: 'GB6170',
    recordKey: 'jwf1124c-p04-item-17',
    nominal: 16,
    acrossFlats: 24,
    height: 13,
  }),

  'jwf1124c-p04-item-18': washerSpec({
    code: 'GB96',
    recordKey: 'jwf1124c-p04-item-18',
    nominal: 6,
    outerDiameter: 18,
    thickness: 1.5,
  }),

  'jwf1124c-p04-item-19': washerSpec({
    code: 'GB96',
    recordKey: 'jwf1124c-p04-item-19',
    nominal: 16,
    outerDiameter: 44,
    thickness: 3,
  }),
};
