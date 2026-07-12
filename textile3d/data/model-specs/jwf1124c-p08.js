// JWF1124C-160 原PDF第7页爆炸图、第8页明细表：逐件按标号关系和厂家明示规格建立。
// 坐标单位均为毫米；第8页未给单件尺寸图，所有视觉估算只写入 assumptions。
const PI = Math.PI;

const hexPoints = (acrossFlats) => {
  const radius = acrossFlats / Math.sqrt(3);
  return Array.from({length: 6}, (_, index) => {
    const angle = PI / 6 + index * PI / 3;
    return [Math.cos(angle) * radius, Math.sin(angle) * radius];
  });
};

const circlePoints = (radius, segments = 48) =>
  Array.from({length: segments}, (_, index) => {
    const angle = index * PI * 2 / segments;
    return [Math.cos(angle) * radius, Math.sin(angle) * radius];
  });

const modelSource = (item, dimensions, assumptions) => ({
  page: 8,
  dimensions,
  views: ['第7页爆炸图标号' + item, '第8页明细原格'],
  assumptions,
});

const toothRow = (count, length, y, z, material = 'darkMetal') =>
  Array.from({length: count}, (_, index) => ({
    type: 'box',
    size: [Math.max(length / count * 0.34, 3), 16, 8],
    position: [-length / 2 + (index + 0.5) * length / count, y, z],
    rotation: [0, 0, -0.2],
    material,
  }));

const scaleTicks = (count, length, y, z) =>
  Array.from({length: count}, (_, index) => ({
    type: 'box',
    size: [1.2, index % 2 ? 6 : 10, 2.4],
    position: [-length / 2 + index * length / Math.max(count - 1, 1), y, z],
    material: 'darkMetal',
  }));

const threadRings = (m, length, count = 5) =>
  Array.from({length: count}, (_, index) => ({
    type: 'torus',
    radius: m * 0.51,
    tube: Math.max(m * 0.055, 0.18),
    position: [length * (0.48 + index * 0.105), 0, 0],
    rotation: [0, PI / 2, 0],
    material: 'darkMetal',
  }));

const standardAssumptions = (description, m, length) => [
  description,
  '明细只明确公称规格M' + m + (length ? '和杆长' + length + '毫米' : '') + '；头部外径、对边、厚度、螺距、倒角和沉孔细节均按第7页符号及常见比例估算。',
];

const hexBoltSpec = (item, dimensionText, m, length) => {
  const headHeight = m * 0.65;
  return {
    level: '轮廓级',
    material: 'metal',
    source: modelSource(item, [dimensionText], standardAssumptions('按第7页标号建立六角头螺栓，并与同页其他螺钉头型区分。', m, length)),
    primitives: [
      {type: 'cylinder', radius: m / 2, length, axis: 'x', position: [length / 2, 0, 0]},
      {type: 'extrude', points: hexPoints(m * 1.6), depth: headHeight, position: [-headHeight / 2, 0, 0], rotation: [0, PI / 2, 0], bevel: m * 0.05},
      ...threadRings(m, length),
    ],
  };
};

const socketCapScrewSpec = (item, dimensionText, m, length) => ({
  level: '轮廓级',
  material: 'metal',
  source: modelSource(item, [dimensionText], standardAssumptions('按第7页标号建立圆柱头内六角螺钉；每个M值和长度均独立建模。', m, length)),
  primitives: [
    {type: 'cylinder', radius: m / 2, length, axis: 'x', position: [length / 2, 0, 0]},
    {type: 'cylinder', radius: m * 0.76, length: m, axis: 'x', position: [-m / 2, 0, 0]},
    {type: 'extrude', points: hexPoints(m * 0.72), depth: Math.max(m * 0.12, 0.5), position: [-m - m * 0.06, 0, 0], rotation: [0, PI / 2, 0], material: 'darkMetal'},
    ...threadRings(m, length),
  ],
});

const knurledScrewSpec = (item, dimensionText, m, length) => ({
  level: '轮廓级',
  material: 'metal',
  source: modelSource(item, [dimensionText], standardAssumptions('按第7页标号建立大径滚花头螺钉；滚花仅用环纹表达，不冒充厂家精密齿形。', m, length)),
  primitives: [
    {type: 'cylinder', radius: m / 2, length, axis: 'x', position: [length / 2, 0, 0]},
    {type: 'cylinder', radius: m * 1.08, length: m * 0.95, axis: 'x', position: [-m * 0.475, 0, 0], material: 'darkMetal'},
    {type: 'torus', radius: m * 1.06, tube: m * 0.07, position: [-m * 0.18, 0, 0], rotation: [0, PI / 2, 0]},
    {type: 'torus', radius: m * 1.06, tube: m * 0.07, position: [-m * 0.48, 0, 0], rotation: [0, PI / 2, 0]},
    {type: 'torus', radius: m * 1.06, tube: m * 0.07, position: [-m * 0.78, 0, 0], rotation: [0, PI / 2, 0]},
    {type: 'box', size: [0.8, m * 1.25, m * 0.22], position: [-m * 0.98, 0, 0], material: 'darkMetal'},
    ...threadRings(m, length, 4),
  ],
});

const lowHeadSocketSpec = (item, dimensionText, m, length) => ({
  level: '轮廓级',
  material: 'metal',
  source: modelSource(item, [dimensionText], standardAssumptions('按第7页可见低圆头轮廓建立内六角螺钉；头顶曲率与内六角深度为视觉估算。', m, length)),
  primitives: [
    {type: 'cylinder', radius: m / 2, length, axis: 'x', position: [length / 2, 0, 0]},
    {type: 'cylinder', radiusTop: m * 0.78, radiusBottom: m * 0.96, length: m * 0.48, axis: 'x', position: [-m * 0.24, 0, 0]},
    {type: 'torus', radius: m * 0.72, tube: m * 0.2, position: [-m * 0.45, 0, 0], rotation: [0, PI / 2, 0]},
    {type: 'extrude', points: hexPoints(m * 0.66), depth: Math.max(m * 0.1, 0.45), position: [-m * 0.52, 0, 0], rotation: [0, PI / 2, 0], material: 'darkMetal'},
    ...threadRings(m, length),
  ],
});

const countersunkSocketSpec = (item, dimensionText, m, length) => ({
  level: '轮廓级',
  material: 'metal',
  source: modelSource(item, [dimensionText], standardAssumptions('按第7页可见锥形头轮廓建立沉头内六角螺钉；锥角和头部直径未标，按图估算。', m, length)),
  primitives: [
    {type: 'cylinder', radius: m / 2, length, axis: 'x', position: [length / 2, 0, 0]},
    {type: 'cylinder', radiusTop: m * 0.5, radiusBottom: m * 0.96, length: m * 0.55, axis: 'x', position: [-m * 0.275, 0, 0]},
    {type: 'extrude', points: hexPoints(m * 0.62), depth: Math.max(m * 0.1, 0.45), position: [-m * 0.58, 0, 0], rotation: [0, PI / 2, 0], material: 'darkMetal'},
    ...threadRings(m, length),
  ],
});

const crossPanScrewSpec = (item, dimensionText, m, length) => {
  const headHeight = m * 0.55;
  const headRadius = m * 0.92;
  return {
    level: '轮廓级',
    material: 'metal',
    source: modelSource(item, [dimensionText], standardAssumptions('按第7页标号建立十字槽盘头螺钉；十字槽以深色浅槽表达。', m, length)),
    primitives: [
      {type: 'cylinder', radius: m / 2, length, axis: 'x', position: [length / 2, 0, 0]},
      {
        type: 'lathe',
        points: [[0, -headHeight / 2], [headRadius * 0.72, -headHeight / 2], [headRadius, -headHeight * 0.12], [headRadius * 0.82, headHeight * 0.28], [headRadius * 0.42, headHeight / 2], [0, headHeight / 2]],
        position: [-headHeight / 2, 0, 0],
        rotation: [0, 0, PI / 2],
      },
      {type: 'box', size: [0.7, m * 0.95, m * 0.18], position: [-headHeight - 0.2, 0, 0], material: 'darkMetal'},
      {type: 'box', size: [0.7, m * 0.18, m * 0.95], position: [-headHeight - 0.2, 0, 0], material: 'darkMetal'},
      ...threadRings(m, length, 4),
    ],
  };
};

const hexNutSpec = (item, dimensionText, m) => {
  const thickness = m * 0.8;
  return {
    level: '轮廓级',
    material: 'metal',
    source: modelSource(item, [dimensionText], standardAssumptions('按第7页标号建立六角螺母，中心通孔按M6公称直径表达。', m, null)),
    primitives: [
      {
        type: 'extrude',
        points: hexPoints(m * 1.6),
        depth: thickness,
        holes: [{kind: 'circle', center: [0, 0], radius: m * 0.51}],
        position: [0, 0, 0],
        rotation: [0, PI / 2, 0],
        bevel: m * 0.04,
      },
    ],
  };
};

const plainWasherSpec = (item, dimensionText, m, outerDiameter, thickness, series) => ({
  level: '轮廓级',
  material: 'metal',
  source: modelSource(item, [dimensionText], [
    '厂家明细只明确垫圈公称规格' + dimensionText + '；按第7页标号建立' + series + '平垫圈。',
    '内孔按M' + m + '留装配间隙；外径' + outerDiameter + '和厚度' + thickness + '毫米为常见系列比例估算，不是本页厂家尺寸。',
  ]),
  primitives: [
    {
      type: 'extrude',
      points: circlePoints(outerDiameter / 2),
      depth: thickness,
      holes: [{kind: 'circle', center: [0, 0], radius: m * 0.54}],
      position: [0, 0, 0],
      rotation: [0, PI / 2, 0],
      bevel: Math.min(thickness * 0.18, 0.25),
    },
  ],
});

const springWasherSpec = (item, dimensionText, m) => {
  const wire = m * 0.24;
  const radius = m * 0.72;
  const points = Array.from({length: 30}, (_, index) => {
    const angle = 0.28 + index * (PI * 2 - 0.56) / 29;
    return [(index / 29 - 0.5) * wire * 1.1, Math.cos(angle) * radius, Math.sin(angle) * radius];
  });
  return {
    level: '轮廓级',
    material: 'metal',
    source: modelSource(item, [dimensionText], [
      '厂家明细只明确弹簧垫圈公称规格' + dimensionText + '；第7页标号显示为开口弹簧圈。',
      '圈外径、线径、开口角和轴向错位均按M' + m + '常见比例估算，不是本页厂家尺寸。',
    ]),
    primitives: [
      {type: 'tube', points, radius: wire / 2, material: 'darkMetal'},
    ],
  };
};

export const jwf1124cP08ModelSpecs = {
  'JWF1124C-160-0200-6': {
    level: '轮廓级',
    material: 'metal',
    source: modelSource(1, [], [
      '厂家第8页只给件号、名称和单台用量，未给单件尺寸；外廓按第7页标号1估算为长980、宽150、高约38。',
      '标号1直接显示为长条分梳板、深色工作边和连续齿列；齿距、齿高、板厚和安装孔均为视觉估算。',
    ]),
    primitives: [
      {type: 'box', size: [980, 12, 150], position: [0, 0, 0]},
      {type: 'box', size: [930, 10, 28], position: [0, 11, -50], material: 'darkMetal'},
      ...toothRow(18, 880, 25, -50),
      {type: 'box', size: [35, 38, 125], position: [-472, -6, 0], material: 'darkMetal'},
      {type: 'box', size: [35, 38, 125], position: [472, -6, 0], material: 'darkMetal'},
    ],
  },

  'JWF1124C-160-0200-19': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: modelSource(2, [], [
      '标号2在第7页上部偏左，是带下弧吸口和上沿导轨的长件；外廓估算为1500×190×110。',
      '弧面用六边折线截面近似；弧度、板厚、导轨和中部托片尺寸未标，均按爆炸图比例估算。',
    ]),
    primitives: [
      {type: 'extrude', points: [[-95, -8], [-72, -42], [72, -42], [95, -8], [62, 34], [-62, 34]], depth: 1500, position: [0, 0, 0], rotation: [0, PI / 2, 0], bevel: 2},
      {type: 'box', size: [1500, 12, 190], position: [0, 35, 0], material: 'darkMetal'},
      {type: 'box', size: [520, 18, 70], position: [0, -48, 0]},
      {type: 'box', size: [50, 42, 120], position: [-700, -16, 0], material: 'darkMetal'},
      {type: 'box', size: [50, 42, 120], position: [700, -16, 0], material: 'darkMetal'},
    ],
  },

  'JWF1124C-160-0200-20': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: modelSource(3, [], [
      '标号3位于第7页上部中央，图形为浅弧上板和一侧折边；外廓估算为1480×165×70。',
      '弧面、折边角度、板厚、端部支耳和孔位未标，按爆炸图轮廓估算；与标号2的深弧下板分开建模。',
    ]),
    primitives: [
      {type: 'extrude', points: [[-82, -24], [82, -24], [66, 22], [-50, 34], [-82, 12]], depth: 1480, position: [0, 0, 0], rotation: [0, PI / 2, 0], bevel: 1.5},
      {type: 'box', size: [1480, 10, 38], position: [0, 29, -58], material: 'darkMetal'},
      {type: 'box', size: [48, 60, 130], position: [-710, 0, 0], material: 'darkMetal'},
    ],
  },

  'JWF1124C-160-0200-21': {
    level: '轮廓级',
    material: 'metal',
    source: modelSource(4, [], [
      '标号4在第7页中部，是带两处托座的长条除尘刀；外廓估算为1450×105×55。',
      '刀口角度、刃厚、托座尺寸和孔位未标，按爆炸图直接轮廓估算；与标号6、9的背脊和端部形式分别建模。',
    ]),
    primitives: [
      {type: 'extrude', points: [[-52, -10], [52, -10], [38, 16], [-42, 24]], depth: 1450, position: [0, 0, 0], rotation: [0, PI / 2, 0], bevel: 1},
      {type: 'box', size: [1390, 8, 24], position: [0, 22, -28], material: 'metal'},
      {type: 'extrude', points: [[-34, -26], [34, -26], [12, 26], [-12, 26]], depth: 24, position: [-430, -20, 0], material: 'metal'},
      {type: 'extrude', points: [[-34, -26], [34, -26], [12, 26], [-12, 26]], depth: 24, position: [430, -20, 0], material: 'metal'},
    ],
  },

  'JWF1124-0200-2': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: modelSource(5, [], [
      '标号5在第7页中部与右中部各出现一件，图形为长平调节板；单件外廓估算为1400×80×8。',
      '两端安装孔、中央避让位置、板厚和局部折边未标，按爆炸图比例估算；单台用量2不复制进单件模型。',
    ]),
    primitives: [
      {
        type: 'extrude',
        points: [[-700, -40], [700, -40], [700, 40], [-700, 40]],
        depth: 8,
        holes: [
          {kind: 'circle', center: [-625, 0], radius: 9},
          {kind: 'circle', center: [625, 0], radius: 9},
          {kind: 'circle', center: [0, 0], radius: 7},
        ],
        position: [0, 0, 0],
        rotation: [PI / 2, 0, 0],
        bevel: 1,
      },
      {type: 'box', size: [260, 18, 24], position: [0, -10, 0], material: 'darkMetal'},
    ],
  },

  'JWF1124-0200-3': {
    level: '轮廓级',
    material: 'metal',
    source: modelSource(6, [], [
      '标号6位于第7页中下部偏右，是带连续小齿/孔列和端部支座的长条除尘刀；外廓估算为1420×92×62。',
      '齿列只表达可见节奏，不作为真实齿距；刀厚、孔径、支座和端部结构均按图估算。',
    ]),
    primitives: [
      {type: 'box', size: [1420, 14, 62], position: [0, 0, 0]},
      {type: 'box', size: [1350, 9, 22], position: [0, 14, -18], material: 'metal'},
      ...toothRow(16, 1260, 28, -18, 'metal'),
      {type: 'box', size: [42, 52, 78], position: [-675, -12, 0], material: 'metal'},
      {type: 'box', size: [42, 52, 78], position: [675, -12, 0], material: 'metal'},
    ],
  },

  'JWF1124-0200-4': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: modelSource(7, [], [
      '标号7位于第7页下部中间，图形为较短U形撑挡；外廓估算为1000×58×48。',
      '槽宽、板厚、端部封板和孔位未标，按爆炸图比例估算；与标号8的长度和端部形式分开。',
    ]),
    primitives: [
      {type: 'box', size: [1000, 6, 58], position: [0, -21, 0]},
      {type: 'box', size: [1000, 48, 6], position: [0, 0, -26]},
      {type: 'box', size: [1000, 48, 6], position: [0, 0, 26]},
      {type: 'box', size: [28, 48, 58], position: [-486, 0, 0], material: 'darkMetal'},
    ],
  },

  'JWF1124-0200-5': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: modelSource(8, [], [
      '标号8位于第7页下部右侧，图形为较长、右端封闭的U形撑挡；外廓估算为1500×70×52。',
      '槽宽、板厚、端部封板和孔位未标，按爆炸图比例估算；长度和封头位置与标号7不同。',
    ]),
    primitives: [
      {type: 'box', size: [1500, 6, 70], position: [0, -23, 0]},
      {type: 'box', size: [1500, 52, 6], position: [0, 0, -32]},
      {type: 'box', size: [1500, 52, 6], position: [0, 0, 32]},
      {type: 'box', size: [30, 52, 70], position: [735, 0, 0], material: 'darkMetal'},
      {type: 'box', size: [80, 18, 46], position: [-690, 18, 0], material: 'darkMetal'},
    ],
  },

  'JWF1124-0200-6': {
    level: '轮廓级',
    material: 'metal',
    source: modelSource(9, [], [
      '标号9在第7页上部偏右，是带高背脊的长条除尘刀；外廓估算为1450×105×70。',
      '刀口角度、背脊高度、板厚和端部孔位未标，按爆炸图轮廓估算；高背脊用于区别标号4和6。',
    ]),
    primitives: [
      {type: 'extrude', points: [[-52, -14], [52, -14], [45, 18], [-38, 28]], depth: 1450, position: [0, 0, 0], rotation: [0, PI / 2, 0], bevel: 1},
      {type: 'box', size: [1410, 15, 34], position: [0, 27, -30], material: 'metal'},
      {type: 'box', size: [55, 60, 95], position: [-695, 0, 0], material: 'metal'},
      {type: 'box', size: [55, 60, 95], position: [695, 0, 0], material: 'metal'},
    ],
  },

  'JWF1124-0200-7': {
    level: '轮廓级',
    material: 'metal',
    source: modelSource(10, [], [
      '标号10在第7页中上部和中下部各出现一组，直接显示圆形枢轴、短摆臂和指示臂；外廓估算为150×105×42。',
      '轴径、臂长、角度、连接孔和紧固件尺寸未标，按爆炸图比例估算；单台用量2不复制进单件模型。',
    ]),
    primitives: [
      {type: 'cylinder', radius: 22, length: 42, axis: 'z', position: [0, 0, 0], material: 'darkMetal'},
      {type: 'cylinder', radius: 10, length: 58, axis: 'z', position: [0, 0, 10]},
      {type: 'box', size: [118, 12, 16], position: [42, 25, 10], rotation: [0, 0, 0.55]},
      {type: 'extrude', points: [[-18, -12], [28, 0], [-18, 12]], depth: 8, position: [92, 53, 10], rotation: [0, 0, 0.55], material: 'darkMetal'},
      {type: 'cylinder', radius: 8, length: 20, axis: 'z', position: [72, 43, 10], material: 'darkMetal'},
    ],
  },

  'JWF1124C-180-0200-2B': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: modelSource(11, [], [
      '标号11与15、30、48在第7页左下和右下组成重复图组；标号11直接显示为下部弧形集尘斗，外廓估算为320×190×300。',
      '斗壁曲率、开口、板厚、安装边和底部接口尺寸未标，按图比例估算；单台用量2不复制进单件模型。',
    ]),
    primitives: [
      {
        type: 'extrude',
        points: [[-160, 65], [-128, -35], [-72, -88], [0, -108], [72, -88], [128, -35], [160, 65]],
        depth: 300,
        holes: [{kind: 'polygon', points: [[-118, 48], [-92, -20], [-50, -58], [0, -70], [50, -58], [92, -20], [118, 48]]}],
        position: [0, 0, 0],
        bevel: 3,
      },
      {type: 'box', size: [330, 18, 320], position: [0, 68, 0], material: 'darkMetal'},
      {type: 'cylinder', radius: 32, length: 55, axis: 'y', position: [0, -112, 0], material: 'darkMetal'},
    ],
  },

  'JWF1124C-160-0201': {
    level: '轮廓级',
    material: 'metal',
    source: modelSource(12, [], [
      '标号12在第7页中部，是连接两侧机体的长直方钢；外廓估算为1400×40×40。',
      '厂家未标截面、壁厚和端孔；本模型按实心方条表达直接外形，不把普通图号数字当尺寸。',
    ]),
    primitives: [
      {type: 'box', size: [1400, 40, 40], position: [0, 0, 0]},
      {type: 'box', size: [34, 52, 52], position: [-683, 0, 0], material: 'metal'},
      {type: 'box', size: [34, 52, 52], position: [683, 0, 0], material: 'metal'},
    ],
  },

  'JWF1124C-160-0202': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: modelSource(13, [], [
      '标号13位于第7页中部偏下，图形为长窄封板并带端部下折片；外廓估算为1120×78×34。',
      '板厚、折边高度、端片角度和孔位未标，按爆炸图比例估算。',
    ]),
    primitives: [
      {type: 'box', size: [1120, 6, 78], position: [0, 0, 0]},
      {type: 'box', size: [1120, 28, 6], position: [0, 11, -36], material: 'darkMetal'},
      {type: 'box', size: [38, 55, 84], position: [541, -20, 0], rotation: [0, 0, -0.2], material: 'darkMetal'},
    ],
  },

  'JWF1124C-160-0203': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: modelSource(14, [], [
      '标号14位于第7页上部中央，直接显示为长条调风板和一列安装孔；外廓估算为1300×105×36。',
      '板厚、孔径、孔距和折边高度未标，按爆炸图比例估算；孔列仅表达可见分布。',
    ]),
    primitives: [
      {
        type: 'extrude',
        points: [[-650, -52.5], [650, -52.5], [650, 52.5], [-650, 52.5]],
        depth: 6,
        holes: Array.from({length: 7}, (_, index) => ({kind: 'circle', center: [-540 + index * 180, 18], radius: 7})),
        position: [0, 0, 0],
        rotation: [PI / 2, 0, 0],
        bevel: 1,
      },
      {type: 'box', size: [1300, 30, 6], position: [0, 12, -49], material: 'darkMetal'},
      {type: 'box', size: [42, 55, 112], position: [-629, -14, 0], material: 'darkMetal'},
    ],
  },

  'JWF1124C-160-0204': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: modelSource(15, [], [
      '标号15位于第7页两个标号11集尘斗上方，图形为长圆吸风罩；外廓估算为1400长、90直径。',
      '实际开口截面、壁厚、端部接口和安装孔未标；圆筒与深色纵向吸口按爆炸图视觉估算。',
    ]),
    primitives: [
      {type: 'cylinder', radius: 45, length: 1400, axis: 'x', position: [0, 0, 0]},
      {type: 'box', size: [1180, 20, 68], position: [0, -38, 0], material: 'darkMetal'},
      {type: 'torus', radius: 46, tube: 5, position: [-680, 0, 0], rotation: [0, PI / 2, 0], material: 'darkMetal'},
      {type: 'torus', radius: 46, tube: 5, position: [680, 0, 0], rotation: [0, PI / 2, 0], material: 'darkMetal'},
    ],
  },

  'JWF1124-0202': {
    level: '轮廓级',
    material: 'metal',
    source: modelSource(16, [], [
      '标号16在第7页中下部偏右，直接显示为固定在长板上的小支撑块；外廓估算为90×70×40。',
      '中心孔、台阶、底脚和倒角尺寸未标，按爆炸图比例估算。',
    ]),
    primitives: [
      {
        type: 'extrude',
        points: [[-45, -35], [45, -35], [45, 35], [-45, 35]],
        depth: 40,
        holes: [{kind: 'circle', center: [0, 8], radius: 13}],
        position: [0, 0, 0],
        bevel: 2,
      },
      {type: 'box', size: [115, 16, 58], position: [0, -42, 0], material: 'metal'},
    ],
  },

  'JWF1124C-180-0264': {
    level: '轮廓级',
    material: 'metal',
    source: modelSource(17, [], [
      '标号17为指针机构附近的刻度标牌；第8页未给尺寸，外廓估算为70×30×2。',
      '长方牌轮廓和长短刻线按第7页位置关系表达；刻度数量、字样、孔径和定位均未标。',
    ]),
    primitives: [
      {type: 'extrude', points: [[-35, -15], [35, -15], [35, 15], [-35, 15]], depth: 2, position: [0, 0, 0], bevel: 0.5},
      ...scaleTicks(9, 58, 9, 2),
      {type: 'cylinder', radius: 2.2, length: 3, axis: 'z', position: [-29, -9, 1.5], material: 'darkMetal'},
      {type: 'cylinder', radius: 2.2, length: 3, axis: 'z', position: [29, -9, 1.5], material: 'darkMetal'},
    ],
  },

  'JWF1124C-180-0265': {
    level: '轮廓级',
    material: 'metal',
    source: modelSource(18, [], [
      '标号18为另一处刻度标牌；为避免与标号17混同，按第7页方向建成较宽的梯形弧度牌，外廓估算为86×34×2。',
      '梯形角度、刻度数量、字样、孔径和定位均未标，按图比例估算。',
    ]),
    primitives: [
      {type: 'extrude', points: [[-43, -14], [38, -17], [43, 12], [-36, 17]], depth: 2, position: [0, 0, 0], bevel: 0.5},
      ...scaleTicks(11, 66, 8, 2),
      {type: 'cylinder', radius: 2.2, length: 3, axis: 'z', position: [-35, -8, 1.5], material: 'darkMetal'},
      {type: 'cylinder', radius: 2.2, length: 3, axis: 'z', position: [35, -8, 1.5], material: 'darkMetal'},
    ],
  },

  'JWF1124C-180-0275': {
    level: '轮廓级',
    material: 'metal',
    source: modelSource(19, [], [
      '标号19在第7页中部成对出现，图形为带枢轴孔的三角指针；外廓估算为72×32×4。',
      '箭尖角度、孔径、板厚和安装方向按爆炸图估算；单台用量2不复制进单件模型。',
    ]),
    primitives: [
      {
        type: 'extrude',
        points: [[-28, -16], [36, 0], [-28, 16], [-20, 0]],
        depth: 4,
        holes: [{kind: 'circle', center: [-18, 0], radius: 6}],
        position: [0, 0, 0],
        bevel: 0.6,
      },
      {type: 'cylinder', radius: 9, length: 6, axis: 'z', position: [-18, 0, 0], material: 'metal'},
    ],
  },

  'JWF1124C-180-0276': {
    level: '轮廓级',
    material: 'metal',
    source: modelSource(20, [], [
      '标号20在第7页中部直接画成大圆垫片；外径、内径和厚度估算为44、22和2。',
      '第8页没有该垫片尺寸，以上数值仅为爆炸图视觉比例，不写入source.dimensions；单台用量2。',
    ]),
    primitives: [
      {
        type: 'extrude',
        points: circlePoints(22),
        depth: 2,
        holes: [{kind: 'circle', center: [0, 0], radius: 11}],
        position: [0, 0, 0],
        rotation: [0, PI / 2, 0],
        bevel: 0.25,
      },
    ],
  },

  'FA109A-1401A': {
    level: '轮廓级',
    material: 'metal',
    source: modelSource(21, [], [
      '标号21在第7页两个指针结合件旁各出现一块小刻度牌；外廓估算为46×30×2。',
      '刻线、字样、孔位和厚度未标，按爆炸图相对位置估算；单台用量2。',
    ]),
    primitives: [
      {type: 'extrude', points: [[-23, -15], [23, -15], [20, 15], [-20, 15]], depth: 2, position: [0, 0, 0], bevel: 0.4},
      ...scaleTicks(5, 32, 7, 2),
      {type: 'cylinder', radius: 2.5, length: 3, axis: 'z', position: [0, -9, 1.5], material: 'darkMetal'},
    ],
  },

  'CVT1-0504': {
    level: '轮廓级',
    material: 'metal',
    source: modelSource(22, [], [
      '标号22在第7页右上机体连接处，直接显示为右向偏置的小压板；外廓估算为76×42×8。',
      '压板孔径、偏置角、板厚和凸台尺寸未标，按爆炸图比例估算；与左压板标号23镜向区分。',
    ]),
    primitives: [
      {
        type: 'extrude',
        points: [[-38, -21], [38, -21], [38, 21], [-12, 21], [-38, 8]],
        depth: 8,
        holes: [{kind: 'circle', center: [8, 0], radius: 7}],
        position: [0, 0, 0],
        bevel: 1,
      },
      {type: 'cylinder', radius: 12, length: 12, axis: 'z', position: [8, 0, 2], material: 'metal'},
    ],
  },

  'CVT1-0505': {
    level: '轮廓级',
    material: 'metal',
    source: modelSource(23, [], [
      '标号23在第7页左侧机体上、下连接位置出现，直接显示为左向偏置的小压板；外廓估算为76×42×8。',
      '压板孔径、偏置角、板厚和凸台尺寸未标，按爆炸图比例估算；轮廓与标号22镜向。',
    ]),
    primitives: [
      {
        type: 'extrude',
        points: [[-38, -21], [38, -21], [38, 8], [12, 21], [-38, 21]],
        depth: 8,
        holes: [{kind: 'circle', center: [-8, 0], radius: 7}],
        position: [0, 0, 0],
        bevel: 1,
      },
      {type: 'cylinder', radius: 12, length: 12, axis: 'z', position: [-8, 0, 2], material: 'metal'},
    ],
  },

  'CVT1-0506': {
    level: '轮廓级',
    material: 'metal',
    source: modelSource(24, [], [
      '标号24在第7页左侧机体附近直接显示为带大端帽的细长盖件；外廓估算为总长60、帽径30、杆径16。',
      '厂家未给任何尺寸；回转轮廓、帽厚、端部倒角和内腔均按爆炸图比例估算。',
    ]),
    primitives: [
      {
        type: 'lathe',
        points: [[0, -30], [8, -30], [8, 20], [15, 20], [15, 28], [12, 30], [0, 30]],
        position: [0, 0, 0],
        rotation: [0, 0, PI / 2],
      },
    ],
  },

  'CVT1-160-0502': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: modelSource(25, [], [
      '标号25在第7页左上偏中和右下各出现一件，图形为长条折弯排杂板；单件外廓估算为1350×120×42。',
      '板厚、折边角度、端部支耳和孔位未标，按爆炸图比例估算；单台用量2不复制进单件模型。',
    ]),
    primitives: [
      {type: 'box', size: [1350, 6, 120], position: [0, 0, 0]},
      {type: 'box', size: [1350, 34, 6], position: [0, 17, -57], material: 'darkMetal'},
      {type: 'box', size: [1350, 34, 6], position: [0, -17, 57], material: 'darkMetal'},
      {type: 'box', size: [46, 48, 132], position: [-652, 0, 0], rotation: [0, 0, 0.15], material: 'darkMetal'},
      {type: 'box', size: [46, 48, 132], position: [652, 0, 0], rotation: [0, 0, -0.15], material: 'darkMetal'},
    ],
  },

  'TZH1107-10X3X1600': {
    level: '尺寸级',
    material: 'rubber',
    source: modelSource(26, ['10X3X1600'], [
      '厂家件号明确连续密封条截面10×3毫米、长度1600毫米，三向尺寸均直接采用。',
      '第7页标号26显示为沿长件铺设的简单条材；材质按用户语境确定为橡胶，边缘微圆仅作显示处理。',
    ]),
    primitives: [
      {
        type: 'extrude',
        points: [[-5, -1.5], [5, -1.5], [5, 1.5], [-5, 1.5]],
        depth: 1600,
        position: [0, 0, 0],
        rotation: [0, PI / 2, 0],
        bevel: 0.3,
        material: 'rubber',
      },
    ],
  },

  'jwf1124c-p08-item-27': hexBoltSpec(27, 'M6X16', 6, 16),
  'jwf1124c-p08-item-28': hexBoltSpec(28, 'M8X20', 8, 20),
  'jwf1124c-p08-item-29': hexBoltSpec(29, 'M8X25', 8, 25),

  'jwf1124c-p08-item-30': socketCapScrewSpec(30, 'M5X6', 5, 6),
  'jwf1124c-p08-item-31': socketCapScrewSpec(31, 'M5X16', 5, 16),
  'jwf1124c-p08-item-32': socketCapScrewSpec(32, 'M6X16', 6, 16),
  'jwf1124c-p08-item-33': socketCapScrewSpec(33, 'M6X25', 6, 25),
  'jwf1124c-p08-item-34': socketCapScrewSpec(34, 'M8X25', 8, 25),
  'jwf1124c-p08-item-35': socketCapScrewSpec(35, 'M10X20', 10, 20),
  'jwf1124c-p08-item-36': socketCapScrewSpec(36, 'M10X25', 10, 25),
  'jwf1124c-p08-item-37': socketCapScrewSpec(37, 'M10X30', 10, 30),

  'GB834': knurledScrewSpec(38, 'M6X12', 6, 12),
  'GB2672': lowHeadSocketSpec(39, 'M6X20', 6, 20),
  'jwf1124c-p08-item-40': countersunkSocketSpec(40, 'M6X10', 6, 10),
  'jwf1124c-p08-item-41': countersunkSocketSpec(41, 'M6X20', 6, 20),
  'jwf1124c-p08-item-42': crossPanScrewSpec(42, 'M3X8', 3, 8),
  'jwf1124c-p08-item-43': crossPanScrewSpec(43, 'M6X10', 6, 10),

  'GB6170': hexNutSpec(44, 'M6', 6),
  'GB93': springWasherSpec(45, '6', 6),
  'GB96': plainWasherSpec(46, '10', 10, 30, 2.5, '大'),
  'jwf1124c-p08-item-47': plainWasherSpec(47, '3', 3, 7, 0.5, '普通'),
  'jwf1124c-p08-item-48': plainWasherSpec(48, '5', 5, 10, 1, '普通'),
  'jwf1124c-p08-item-49': plainWasherSpec(49, '6', 6, 12, 1.6, '普通'),
  'jwf1124c-p08-item-50': plainWasherSpec(50, '8', 8, 16, 1.6, '普通'),
};
