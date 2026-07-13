// JWF1124C-160 原PDF第10—11页爆炸图、第12页前50项明细：逐件依据标号关系建立。
// 坐标单位均为毫米；厂家未明示的几何数值只写入 assumptions，不混入 source.dimensions。
const PI = Math.PI;

const circlePoints = (radius, segments = 48) =>
  Array.from({length: segments}, (_, index) => {
    const angle = index * PI * 2 / segments;
    return [Math.cos(angle) * radius, Math.sin(angle) * radius];
  });

const hexPoints = (acrossFlats) => {
  const radius = acrossFlats / Math.sqrt(3);
  return Array.from({length: 6}, (_, index) => {
    const angle = PI / 6 + index * PI / 3;
    return [Math.cos(angle) * radius, Math.sin(angle) * radius];
  });
};
const modelSource = (item, dimensions, drawingPages, assumptions) => ({
  page: 12,
  dimensions,
  views: [
    ...drawingPages.map(page => '第' + page + '页爆炸图标号' + item),
    '第12页明细原格',
  ],
  assumptions,
});

const annularLathe = (outerDiameter, innerDiameter, width, options = {}) => ({
  type: 'lathe',
  points: [
    [innerDiameter / 2, -width / 2],
    [outerDiameter / 2, -width / 2],
    [outerDiameter / 2, width / 2],
    [innerDiameter / 2, width / 2],
    [innerDiameter / 2, -width / 2],
  ],
  position: options.position || [0, 0, 0],
  rotation: options.rotation || [0, 0, PI / 2],
  material: options.material,
});

const radialBoxes = (count, radius, size, x = 0, material = 'darkMetal') =>
  Array.from({length: count}, (_, index) => {
    const angle = index * PI * 2 / count;
    return {
      type: 'box',
      size,
      position: [x, Math.cos(angle) * radius, Math.sin(angle) * radius],
      rotation: [angle, 0, 0],
      material,
    };
  });

const rollerRibs = (count, length, radius, ribWidth = 4, ribHeight = 4) =>
  Array.from({length: count}, (_, index) => {
    const angle = index * PI * 2 / count;
    return {
      type: 'box',
      size: [length, ribWidth, ribHeight],
      position: [0, Math.cos(angle) * radius, Math.sin(angle) * radius],
      rotation: [angle, 0, 0],
      material: 'darkMetal',
    };
  });

const threadRings = (radius, start, end, count = 6) =>
  Array.from({length: count}, (_, index) => ({
    type: 'torus',
    radius,
    tube: Math.max(radius * 0.11, 0.22),
    position: [start + (end - start) * index / Math.max(count - 1, 1), 0, 0],
    rotation: [0, PI / 2, 0],
    material: 'darkMetal',
  }));

const helixPoints = (start, end, radius, turns, hand = 1) =>
  Array.from({length: turns * 18 + 1}, (_, index) => {
    const ratio = index / (turns * 18);
    const angle = hand * ratio * turns * PI * 2;
    return [start + (end - start) * ratio, Math.cos(angle) * radius, Math.sin(angle) * radius];
  });

const pulleySpec = (item, drawingPages, description, config) => {
  const {outer, inner, width, hubOuter, hubWidth, teeth, flangeOffset = 0, extra = []} = config;
  return {
    level: '轮廓级',
    material: 'metal',
    source: modelSource(item, [], drawingPages, [
      description,
      '厂家第12页未给单件尺寸；模型外径' + outer + '、内孔' + inner + '、轮宽' + width + '、轮毂和' + teeth + '个示意齿均按爆炸图比例估算，各同步带轮没有套用同一尺寸。',
    ]),
    primitives: [
      annularLathe(outer, inner, width),
      annularLathe(hubOuter, inner, hubWidth, {position: [flangeOffset, 0, 0], material: 'darkMetal'}),
      ...radialBoxes(teeth, outer / 2 + 2, [width * 0.9, Math.max(outer * PI / teeth * 0.34, 2), 5]),
      ...extra,
    ],
  };
};

const rollerSpec = (item, name, drawingPages, config) => {
  const {length, diameter, ribs = 0, journalRadius, journalLength, material = 'metal', extra = []} = config;
  return {
    level: '轮廓级',
    material,
    source: modelSource(item, [], drawingPages, [
      name + '按爆炸图中的长辊、两端台阶和同轴支承关系建立；厂家第12页未给单件尺寸。',
      '辊身估算为长' + length + '、直径' + diameter + '，轴颈半径' + journalRadius + '、长度' + journalLength + '；' + (ribs ? ribs + '条纵向纹仅表达可见表面节奏。' : '辊面按图建立为光面。'),
    ]),
    primitives: [
      {type: 'cylinder', radius: diameter / 2, length, axis: 'x', position: [0, 0, 0]},
      ...(ribs ? rollerRibs(ribs, length * 0.94, diameter / 2 + 1.5) : []),
      {type: 'cylinder', radius: journalRadius, length: journalLength, axis: 'x', position: [-(length + journalLength) / 2, 0, 0], material: 'darkMetal'},
      {type: 'cylinder', radius: journalRadius, length: journalLength, axis: 'x', position: [(length + journalLength) / 2, 0, 0], material: 'darkMetal'},
      {type: 'torus', radius: diameter / 2, tube: 3, position: [-length / 2 + 5, 0, 0], rotation: [0, PI / 2, 0], material: 'darkMetal'},
      {type: 'torus', radius: diameter / 2, tube: 3, position: [length / 2 - 5, 0, 0], rotation: [0, PI / 2, 0], material: 'darkMetal'},
      ...extra,
    ],
  };
};

const bushingSpec = (item, drawingPages, outer, inner, length, flangeOuter, flangeWidth, note) => ({
  level: '轮廓级',
  material: 'brass',
  source: modelSource(item, [], drawingPages, [
    note,
    '厂家明细明确名称为“轴衬”，不是实心轴；内孔、外径、长度和凸缘尺寸分别按爆炸图估算为' + inner + '、' + outer + '、' + length + '、' + flangeOuter + '和' + flangeWidth + '。',
  ]),
  primitives: [
    annularLathe(outer, inner, length, {material: 'brass'}),
    annularLathe(flangeOuter, inner, flangeWidth, {position: [-length / 2 + flangeWidth / 2, 0, 0], material: 'brass'}),
  ],
});

const shoulderCollarSpec = (item, drawingPages, outer, inner, width, shoulderOuter, shoulderWidth, note) => ({
  level: '轮廓级',
  material: 'metal',
  source: modelSource(item, [], drawingPages, [
    note,
    '内孔、外径、总宽和肩部尺寸未标，按爆炸图估算；模型保留中心通孔和轴肩，不作为实心圆柱。',
  ]),
  primitives: [
    annularLathe(outer, inner, width),
    annularLathe(shoulderOuter, inner, shoulderWidth, {position: [-width / 2 + shoulderWidth / 2, 0, 0], material: 'darkMetal'}),
  ],
});

const bearingCoverSpec = (item, drawingPages, outer, inner, width, earCount, note) => ({
  level: '轮廓级',
  material: 'paintedMetal',
  source: modelSource(item, [], drawingPages, [
    note,
    '法兰外径' + outer + '、中心孔' + inner + '、深度' + width + '及' + earCount + '个安装耳均按爆炸图比例估算；与另一轴承盖的直径和耳数分开。',
  ]),
  primitives: [
    annularLathe(outer, inner, width),
    annularLathe(outer * 0.72, inner, width * 1.3, {material: 'darkMetal'}),
    ...radialBoxes(earCount, outer * 0.56, [width * 0.65, outer * 0.2, outer * 0.16], 0, 'paintedMetal'),
  ],
});

const hexNut = (acrossFlats, holeDiameter, width, options = {}) => ({
  type: 'extrude',
  points: hexPoints(acrossFlats),
  depth: width,
  holes: [{kind: 'circle', center: [0, 0], radius: holeDiameter / 2}],
  position: options.position || [0, 0, 0],
  rotation: options.rotation || [0, PI / 2, 0],
  bevel: Math.min(width * 0.08, 0.8),
  material: options.material,
});

export const jwf1124cP12ModelSpecs = {
  'JWF1124C-160-0300-1': rollerSpec(1, '下给棉罗拉结合件', [10], {
    length: 1380, diameter: 82, ribs: 12, journalRadius: 16, journalLength: 95,
    extra: [
      {type: 'cylinder', radius: 24, length: 28, axis: 'x', position: [-718, 0, 0], material: 'darkMetal'},
      {type: 'cylinder', radius: 21, length: 34, axis: 'x', position: [721, 0, 0], material: 'darkMetal'},
    ],
  }),

  'JWF1124C-160-0300-2': rollerSpec(2, '输棉帘传动辊结合件', [10], {
    length: 1480, diameter: 104, ribs: 0, journalRadius: 17, journalLength: 105,
    extra: [
      {type: 'cylinder', radius: 28, length: 45, axis: 'x', position: [-762, 0, 0], material: 'darkMetal'},
      {type: 'box', size: [42, 10, 12], position: [-786, 24, 0], material: 'darkMetal'},
    ],
  }),

  'JWF1124C-160-0300-3': pulleySpec(3, [11], '标号3位于第11页左上传动电机前端，是带轴套和端部联接段的同步带轮结合件。', {
    outer: 118, inner: 30, width: 58, hubOuter: 54, hubWidth: 82, teeth: 24, flangeOffset: 12,
    extra: [
      {type: 'cylinder', radius: 14, length: 72, axis: 'x', position: [62, 0, 0], material: 'darkMetal'},
      {type: 'torus', radius: 28, tube: 4, position: [-31, 0, 0], rotation: [0, PI / 2, 0]},
    ],
  }),

  'FA109-0300-15': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: modelSource(4, [], [10], [
      '标号4位于第10页上部长辊左端，是带三孔墙板、轴承位和底脚的左底座结合件。',
      '外廓、板厚、孔径、轴承凸台和安装脚按爆炸图估算；与标号5按左右方向镜像但孔位不完全共用。',
    ]),
    primitives: [
      {type: 'extrude', points: [[-65, -95], [48, -78], [70, -20], [52, 82], [-38, 95], [-70, 22]], depth: 28, holes: [{kind: 'circle', center: [18, 20], radius: 24}, {kind: 'circle', center: [-38, -48], radius: 7}, {kind: 'circle', center: [38, -56], radius: 7}], bevel: 3},
      {type: 'box', size: [135, 18, 88], position: [0, -101, 0], material: 'darkMetal'},
      {type: 'cylinder', radius: 35, length: 42, axis: 'z', position: [18, 20, 0], material: 'darkMetal'},
    ],
  },

  'FA109-0300-16': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: modelSource(5, [], [10], [
      '标号5位于第10页上部长辊右端，是右底座结合件，外形与左底座相向但安装耳和孔位方向不同。',
      '外廓、板厚、孔径、轴承凸台和安装脚按爆炸图估算；未把它简单复用为左底座模型。',
    ]),
    primitives: [
      {type: 'extrude', points: [[-48, -78], [65, -95], [70, 22], [38, 95], [-52, 82], [-70, -20]], depth: 30, holes: [{kind: 'circle', center: [-18, 20], radius: 24}, {kind: 'circle', center: [38, -48], radius: 7}, {kind: 'circle', center: [-38, -56], radius: 7}], bevel: 3},
      {type: 'box', size: [138, 18, 90], position: [0, -101, 0], material: 'darkMetal'},
      {type: 'cylinder', radius: 36, length: 44, axis: 'z', position: [-18, 20, 0], material: 'darkMetal'},
    ],
  },

  'FA109-160-0300-12A': rollerSpec(6, '压棉罗拉结合件', [10], {
    length: 1460, diameter: 96, ribs: 8, journalRadius: 18, journalLength: 90,
    extra: [
      {type: 'cylinder', radius: 26, length: 34, axis: 'x', position: [-730, 0, 0], material: 'darkMetal'},
      {type: 'cylinder', radius: 26, length: 34, axis: 'x', position: [730, 0, 0], material: 'darkMetal'},
    ],
  }),

  'FA109A-0300-1': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: modelSource(7, [], [11], [
      '标号7位于第11页左上电机组上方，为竖向安装支架结合件，直接可见矩形主板和侧向固定边。',
      '主板估算为150×190×10，长圆孔、侧边和顶部轴套按爆炸图比例估算。',
    ]),
    primitives: [
      {type: 'extrude', points: [[-75, -95], [75, -95], [75, 95], [-75, 95]], depth: 10, holes: [{kind: 'polygon', points: [[-42, -55], [-34, -63], [-22, -55], [-22, 55], [-34, 63], [-42, 55]]}, {kind: 'polygon', points: [[22, -55], [34, -63], [42, -55], [42, 55], [34, 63], [22, 55]]}], bevel: 2},
      {type: 'box', size: [20, 210, 55], position: [-82, 0, -20], material: 'darkMetal'},
      {type: 'cylinder', radius: 14, length: 45, axis: 'z', position: [60, 74, 0], material: 'darkMetal'},
    ],
  },

  'FA109A-0300-2': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: modelSource(8, [], [11], [
      '标号8位于第11页左上电机下方，是带多排长孔和折边的电机底板结合件。',
      '板面估算为240×170×10；四个调节长孔、侧折边和电机孔位按爆炸图比例估算。',
    ]),
    primitives: [
      {type: 'extrude', points: [[-120, -85], [120, -85], [120, 85], [-120, 85]], depth: 10, holes: [{kind: 'polygon', points: [[-82, -58], [-72, -68], [-35, -68], [-25, -58], [-35, -48], [-72, -48]]}, {kind: 'polygon', points: [[25, -58], [35, -68], [72, -68], [82, -58], [72, -48], [35, -48]]}, {kind: 'polygon', points: [[-82, 42], [-72, 32], [-35, 32], [-25, 42], [-35, 52], [-72, 52]]}, {kind: 'polygon', points: [[25, 42], [35, 32], [72, 32], [82, 42], [72, 52], [35, 52]]}], bevel: 2},
      {type: 'box', size: [240, 24, 48], position: [0, -92, -18], material: 'darkMetal'},
      {type: 'box', size: [24, 170, 48], position: [-127, 0, -18], material: 'darkMetal'},
    ],
  },

  'FA109A-0300-4': rollerSpec(9, '上给棉罗拉结合件', [10], {
    length: 1420, diameter: 72, ribs: 10, journalRadius: 14, journalLength: 100,
    extra: [
      {type: 'cylinder', radius: 22, length: 36, axis: 'x', position: [-724, 0, 0], material: 'darkMetal'},
      {type: 'cylinder', radius: 20, length: 40, axis: 'x', position: [726, 0, 0], material: 'darkMetal'},
    ],
  }),

  'FA109A-0300-7': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: modelSource(10, [], [11], [
      '标号10位于第11页上部中央，是水平U形张紧支座结合件，带同轴套孔和两侧安装耳。',
      '外廓估算为180×90×72；叉口、轴孔、耳板和底座尺寸未标，按爆炸图比例估算。',
    ]),
    primitives: [
      {type: 'box', size: [180, 18, 90], position: [0, -36, 0]},
      {type: 'box', size: [22, 82, 72], position: [-78, 0, 0]},
      {type: 'box', size: [22, 82, 72], position: [78, 0, 0]},
      {type: 'cylinder', radius: 19, length: 100, axis: 'x', position: [0, 10, 0], material: 'darkMetal'},
      {type: 'cylinder', radius: 9, length: 190, axis: 'x', position: [0, 10, 0], material: 'metal'},
    ],
  },

  'FA109A-0300-8': pulleySpec(11, [10], '标号11位于第10页下部长辊左端，是带深轮毂和端部挡边的同步带轮结合件。', {
    outer: 96, inner: 26, width: 48, hubOuter: 48, hubWidth: 76, teeth: 20, flangeOffset: -10,
    extra: [
      {type: 'torus', radius: 48, tube: 4, position: [25, 0, 0], rotation: [0, PI / 2, 0]},
      {type: 'cylinder', radius: 13, length: 48, axis: 'x', position: [-55, 0, 0], material: 'darkMetal'},
    ],
  }),

  'FA109A-0300-12': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: modelSource(12, [], [10], [
      '标号12位于第10页中左，是斜置三角支板式张紧支座，带中心轴孔和长底脚。',
      '板外廓、三孔位置、轴承凸台和底脚按爆炸图估算；与标号10的U形支座明显区分。',
    ]),
    primitives: [
      {type: 'extrude', points: [[-72, -70], [70, -45], [42, 76], [-35, 92], [-78, 20]], depth: 24, holes: [{kind: 'circle', center: [12, 18], radius: 20}, {kind: 'circle', center: [-42, -34], radius: 7}, {kind: 'circle', center: [42, -28], radius: 7}], bevel: 3},
      {type: 'box', size: [170, 18, 88], position: [0, -79, 0], material: 'darkMetal'},
      {type: 'cylinder', radius: 29, length: 38, axis: 'z', position: [12, 18, 0], material: 'darkMetal'},
    ],
  },

  'JWF1124C-160-0301': pulleySpec(13, [10], '标号13位于第10页中下部长辊左端，是窄轮身、小轮毂同步带轮。', {
    outer: 66, inner: 20, width: 36, hubOuter: 34, hubWidth: 54, teeth: 16, flangeOffset: 8,
  }),

  'JWF1124C-160-0302': pulleySpec(14, [10], '标号14位于第10页最下部长辊左端，是宽轮身、双端挡边同步带轮。', {
    outer: 88, inner: 28, width: 54, hubOuter: 46, hubWidth: 70, teeth: 20,
    extra: [
      {type: 'torus', radius: 44, tube: 3.5, position: [-28, 0, 0], rotation: [0, PI / 2, 0]},
      {type: 'torus', radius: 44, tube: 3.5, position: [28, 0, 0], rotation: [0, PI / 2, 0]},
    ],
  }),

  'JWF1124C-160-0306': {
    level: '轮廓级',
    material: 'metal',
    source: modelSource(15, [], [11], [
      '标号15位于第11页右下调节组，是带中心孔和均布齿/孔的薄计数盘。',
      '外径估算为118、内孔24、厚度6；16个外缘标记仅表达计数盘视觉节奏，实际齿数和孔位未标。',
    ]),
    primitives: [
      annularLathe(118, 24, 6),
      ...radialBoxes(16, 60, [5, 5, 10], 0, 'darkMetal'),
      {type: 'torus', radius: 40, tube: 2, position: [0, 0, 0], rotation: [0, PI / 2, 0], material: 'darkMetal'},
    ],
  },

  'JWF1124C-160-0307': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: modelSource(16, [], [11], [
      '标号16位于第11页上部中央，是带竖板、水平折脚和长圆检测孔的接近开关支架。',
      '竖板估算为90×120×8，折脚70×45；孔径、折弯半径和安装方向按爆炸图比例估算。',
    ]),
    primitives: [
      {type: 'extrude', points: [[-45, -60], [45, -60], [45, 60], [-45, 60]], depth: 8, holes: [{kind: 'polygon', points: [[8, 18], [18, 8], [34, 8], [44, 18], [34, 28], [18, 28]]}], bevel: 1.5},
      {type: 'box', size: [90, 45, 8], position: [0, -77, -18], material: 'darkMetal'},
      {type: 'cylinder', radius: 7, length: 14, axis: 'z', position: [-28, 38, 0], material: 'darkMetal'},
    ],
  },

  'FA109-0303': {
    level: '轮廓级',
    material: 'metal',
    source: modelSource(17, [], [10], [
      '标号17在第10页上部左右轴端各出现一块小板，单件为带中心孔和圆角端部的扁平连接板。',
      '外廓估算为92×44×6，孔径18；圆角、孔位和板厚未标，单台用量2不复制进单件模型。',
    ]),
    primitives: [
      {type: 'extrude', points: [[-38, -22], [38, -22], [46, -14], [46, 14], [38, 22], [-38, 22], [-46, 14], [-46, -14]], depth: 6, holes: [{kind: 'circle', center: [0, 0], radius: 9}], bevel: 1},
    ],
  },

  'FA109-0312': {
    level: '轮廓级',
    material: 'metal',
    source: modelSource(18, [], [11], [
      '标号18在第11页两侧调节链中出现三件，是两端螺纹、中段光杆的小螺柱。',
      '总长估算为92、杆径12；螺纹长度和螺距按爆炸图估算，单台用量3不复制进单件模型。',
    ]),
    primitives: [
      {type: 'cylinder', radius: 6, length: 92, axis: 'x', position: [0, 0, 0]},
      ...threadRings(6.1, -44, -20, 5),
      ...threadRings(6.1, 20, 44, 5),
      {type: 'box', size: [16, 14, 14], position: [0, 0, 0], material: 'darkMetal'},
    ],
  },

  'FA109-0313': {
    level: '轮廓级',
    material: 'metal',
    source: modelSource(19, [], [11], [
      '标号19位于第11页左下调节链，是较窄刻度环；外径估算48、内孔28、宽16。',
      '环体保留中心通孔，10条刻线按图示意；尺寸、刻度文字和零位未标。',
    ]),
    primitives: [
      annularLathe(48, 28, 16),
      ...radialBoxes(10, 24.5, [5, 1.4, 5], 0, 'darkMetal'),
    ],
  },

  'FA109-0314': {
    level: '轮廓级',
    material: 'metal',
    source: modelSource(20, [], [11], [
      '标号20位于第11页右上调节链，是较宽、带台阶的刻度环；外径估算56、内孔30、宽24。',
      '环体、台阶和12条刻线按爆炸图估算；与标号19的宽度和肩部不同。',
    ]),
    primitives: [
      annularLathe(56, 30, 24),
      annularLathe(48, 30, 34, {material: 'darkMetal'}),
      ...radialBoxes(12, 28.5, [7, 1.5, 5], 0, 'darkMetal'),
    ],
  },

  'FA109-0315': {
    level: '轮廓级',
    material: 'metal',
    source: modelSource(21, [], [11], [
      '标号21位于第11页左右调节链，是带六角头和左旋螺纹的专用螺栓。',
      '公称直径估算12、杆长72、头部对边19；左旋螺纹用反向螺旋线表达，尺寸均非厂家明示。',
    ]),
    primitives: [
      {type: 'cylinder', radius: 6, length: 72, axis: 'x', position: [36, 0, 0]},
      hexNut(19, 0.1, 8, {position: [-4, 0, 0]}),
      {type: 'tube', points: helixPoints(32, 70, 6.2, 8, -1), radius: 0.55, material: 'darkMetal'},
    ],
  },

  'FA109-0316': {
    level: '轮廓级',
    material: 'metal',
    source: modelSource(22, [], [11], [
      '标号22位于第11页调节链，与标号21左旋螺栓配套，是六角左旋螺母而非普通垫圈。',
      '对边估算20、孔径12、厚度10；内螺纹未展开，只保留通孔和深色内壁。',
    ]),
    primitives: [
      hexNut(20, 12, 10),
      {type: 'torus', radius: 6.5, tube: 1.1, position: [-5, 0, 0], rotation: [0, PI / 2, 0], material: 'darkMetal'},
    ],
  },

  'FA109-0329': bearingCoverSpec(23, [10], 92, 46, 20, 4, '标号23在第10页多根辊轴端部出现，是四耳、浅杯形轴承盖。'),

  'FA109-0330': bushingSpec(24, [10], 42, 24, 28, 52, 6, '标号24在第10页上部轴端支承链中，是短凸缘轴衬。'),

  'FA109-0337': bushingSpec(25, [10], 50, 28, 42, 62, 8, '标号25在第10页右上轴端支承链中，是较长、较大凸缘轴衬。'),

  'FA109A-0301': pulleySpec(26, [10], '标号26位于第10页最上部长辊左侧，是窄轮身、外侧大挡边同步带轮。', {
    outer: 102, inner: 30, width: 38, hubOuter: 48, hubWidth: 60, teeth: 22, flangeOffset: -8,
    extra: [{type: 'torus', radius: 51, tube: 4, position: [-21, 0, 0], rotation: [0, PI / 2, 0]}],
  }),

  'FA109A-0302': {
    level: '轮廓级',
    material: 'metal',
    source: modelSource(27, [], [10], [
      '标号27位于第10页最上部左端，是左支杆，带长杆、端部扁眼和短螺纹段。',
      '总长估算520、杆径10；扁眼、孔径、螺纹和偏置按爆炸图估算，与右支杆镜向。',
    ]),
    primitives: [
      {type: 'cylinder', radius: 5, length: 470, axis: 'x', position: [15, 0, 0]},
      {type: 'extrude', points: [[-34, -20], [20, -20], [34, 0], [20, 20], [-34, 20]], depth: 10, holes: [{kind: 'circle', center: [10, 0], radius: 8}], position: [-230, 0, 0], rotation: [0, PI / 2, 0], bevel: 1},
      ...threadRings(5.1, 240, 260, 4),
    ],
  },

  'FA109A-0303': {
    level: '轮廓级',
    material: 'metal',
    source: modelSource(28, [], [10], [
      '标号28位于第10页最上部左侧底座旁，是三孔左支臂，轮廓向左弯折。',
      '臂长、孔径、板厚和弯折角按爆炸图估算；与标号45右支臂镜向但孔位独立。',
    ]),
    primitives: [
      {type: 'extrude', points: [[-85, -28], [35, -28], [82, 8], [54, 38], [-30, 22], [-82, 48]], depth: 12, holes: [{kind: 'circle', center: [-58, 10], radius: 10}, {kind: 'circle', center: [12, -4], radius: 9}, {kind: 'circle', center: [55, 10], radius: 8}], bevel: 2},
      {type: 'cylinder', radius: 15, length: 18, axis: 'z', position: [-58, 10, 0], material: 'darkMetal'},
    ],
  },

  'FA109A-0304': {
    level: '轮廓级',
    material: 'metal',
    source: modelSource(29, [], [10], [
      '标号29在第10页上部长辊下方，是贯穿两侧支座的细长阶梯轴。',
      '总长估算1450、主轴径18；两端台阶、键槽和横销位置按爆炸图估算。',
    ]),
    primitives: [
      {type: 'cylinder', radius: 9, length: 1330, axis: 'x', position: [0, 0, 0]},
      {type: 'cylinder', radius: 7, length: 80, axis: 'x', position: [-705, 0, 0], material: 'darkMetal'},
      {type: 'cylinder', radius: 7, length: 80, axis: 'x', position: [705, 0, 0], material: 'darkMetal'},
      {type: 'box', size: [120, 4, 8], position: [-520, 9, 0], material: 'darkMetal'},
      {type: 'box', size: [90, 4, 8], position: [555, 9, 0], material: 'darkMetal'},
    ],
  },

  'FA109A-0305': {
    level: '轮廓级',
    material: 'metal',
    source: modelSource(30, [], [10], [
      '标号30位于第10页最上部右端，是右支杆，扁眼位于右侧并带左端螺纹。',
      '总长估算500、杆径10；扁眼、孔径、螺纹和偏置按爆炸图估算，与标号27方向相反。',
    ]),
    primitives: [
      {type: 'cylinder', radius: 5, length: 450, axis: 'x', position: [-15, 0, 0]},
      {type: 'extrude', points: [[-20, -20], [34, -20], [34, 20], [-20, 20], [-34, 0]], depth: 10, holes: [{kind: 'circle', center: [-10, 0], radius: 8}], position: [220, 0, 0], rotation: [0, PI / 2, 0], bevel: 1},
      ...threadRings(5.1, -250, -230, 4),
    ],
  },

  'FA109A-0306': pulleySpec(31, [10], '标号31位于第10页最上部长辊右侧，是窄小轮身、长轮毂同步带轮。', {
    outer: 78, inner: 24, width: 34, hubOuter: 40, hubWidth: 62, teeth: 18, flangeOffset: 8,
  }),

  'FA109A-0307': {
    level: '轮廓级',
    material: 'metal',
    source: modelSource(32, [], [11], [
      '标号32位于第11页左上传动电机前端，是带开口键槽的轴端挡圈。',
      '外径估算50、内径24、宽14；键槽宽度和紧定结构按爆炸图估算。',
    ]),
    primitives: [
      {type: 'extrude', points: circlePoints(25), depth: 14, holes: [{kind: 'circle', center: [0, 0], radius: 12}, {kind: 'polygon', points: [[-4, 12], [4, 12], [4, 25], [-4, 25]]}], rotation: [0, PI / 2, 0], bevel: 1},
      {type: 'box', size: [18, 8, 8], position: [0, 22, 0], material: 'darkMetal'},
    ],
  },

  'FA109A-0308': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: modelSource(33, [], [10, 11], [
      '标号33在第10页下部辊轴两端及第11页机架附近出现，是带中央轴承孔和双安装脚的轴承座。',
      '座体估算为130×140×52，中心孔50；铸造圆角、脚孔和油路未标，按爆炸图比例估算。',
    ]),
    primitives: [
      {type: 'extrude', points: [[-58, -70], [58, -70], [68, -48], [68, 52], [48, 70], [-48, 70], [-68, 52], [-68, -48]], depth: 52, holes: [{kind: 'circle', center: [0, 12], radius: 25}, {kind: 'circle', center: [-45, -52], radius: 7}, {kind: 'circle', center: [45, -52], radius: 7}], bevel: 4},
      {type: 'box', size: [160, 18, 75], position: [0, -78, 0], material: 'darkMetal'},
      {type: 'torus', radius: 32, tube: 8, position: [0, 12, 28], material: 'darkMetal'},
    ],
  },

  'FA109A-0309A': pulleySpec(34, [11], '标号34位于第11页右下调节端，是带薄外齿圈和偏置轮毂的小同步带轮。', {
    outer: 70, inner: 20, width: 30, hubOuter: 36, hubWidth: 48, teeth: 16, flangeOffset: -7,
    extra: [{type: 'torus', radius: 35, tube: 3, position: [16, 0, 0], rotation: [0, PI / 2, 0]}],
  }),

  'FA109A-0310': shoulderCollarSpec(35, [11], 58, 30, 22, 68, 8, '标号35位于第11页上部同步带轮右侧，是较大轴肩挡圈。'),

  'FA109A-0311': pulleySpec(36, [11], '标号36位于第11页上部中央，是中等直径、较宽轮身同步带轮。', {
    outer: 84, inner: 24, width: 42, hubOuter: 42, hubWidth: 58, teeth: 20,
  }),

  'FA109A-0312': {
    level: '轮廓级',
    material: 'metal',
    source: modelSource(37, [], [11], [
      '标号37位于第11页右侧，是两端螺纹、中段六角/光杆的长调节杆。',
      '总长估算620，中段对边18，端部螺纹直径12；各段长度、螺距和孔位未标。',
    ]),
    primitives: [
      {type: 'extrude', points: hexPoints(18), depth: 400, position: [0, 0, 0], rotation: [0, PI / 2, 0], bevel: 0.8},
      {type: 'cylinder', radius: 6, length: 110, axis: 'x', position: [-255, 0, 0], material: 'darkMetal'},
      {type: 'cylinder', radius: 6, length: 110, axis: 'x', position: [255, 0, 0], material: 'darkMetal'},
      ...threadRings(6.1, -305, -220, 7),
      ...threadRings(6.1, 220, 305, 7),
    ],
  },

  'FA109A-0313': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: modelSource(38, [], [11], [
      '标号38位于第11页上部中央，是方块式张紧调节座，带贯穿调节孔和两侧安装耳。',
      '主体估算为82×70×62；孔径、耳板、开槽和紧定孔按爆炸图比例估算。',
    ]),
    primitives: [
      {type: 'extrude', points: [[-41, -35], [41, -35], [41, 35], [-41, 35]], depth: 62, holes: [{kind: 'circle', center: [0, 0], radius: 12}], bevel: 4},
      {type: 'box', size: [124, 18, 72], position: [0, -43, 0], material: 'darkMetal'},
      {type: 'cylinder', radius: 6, length: 90, axis: 'y', position: [0, 0, 0], material: 'darkMetal'},
    ],
  },

  'FA109A-0317': pulleySpec(39, [10], '标号39位于第10页中左张紧支座外侧，是小直径、长轮毂同步带轮。', {
    outer: 74, inner: 22, width: 46, hubOuter: 38, hubWidth: 68, teeth: 18, flangeOffset: 10,
  }),

  'FA109A-0318': shoulderCollarSpec(40, [10], 46, 24, 16, 54, 6, '标号40位于第10页中左轮组外侧，是较小、较窄轴肩挡圈。'),

  'FA109A-0340': {
    level: '轮廓级',
    material: 'metal',
    source: modelSource(41, [], [11], [
      '标号41位于第11页右侧调节杆端部，是薄平垫圈，保留中心通孔。',
      '外径估算38、内径18、厚度3；厂家未给规格，不套用标准垫圈尺寸。',
    ]),
    primitives: [
      {type: 'extrude', points: circlePoints(19), depth: 3, holes: [{kind: 'circle', center: [0, 0], radius: 9}], rotation: [0, PI / 2, 0], bevel: 0.3},
    ],
  },

  'FA109A-0341': {
    level: '轮廓级',
    material: 'metal',
    source: modelSource(42, [], [11], [
      '标号42位于第11页右侧调节链末端，是短螺柱，外端带螺纹、内端为光杆。',
      '总长估算86、杆径12；分段长度、螺纹和端部倒角按爆炸图比例估算。',
    ]),
    primitives: [
      {type: 'cylinder', radius: 6, length: 86, axis: 'x', position: [0, 0, 0]},
      ...threadRings(6.1, 12, 41, 6),
      {type: 'cylinder', radius: 8, length: 12, axis: 'x', position: [-37, 0, 0], material: 'darkMetal'},
    ],
  },

  'CVT1-0301': {
    level: '轮廓级',
    material: 'metal',
    source: modelSource(43, [], [11], [
      '标号43位于第11页机架两侧的指示位置，是带圆孔、折角尾部的薄指针。',
      '外廓估算为88×42×4，孔径12；箭尖、折角、板厚和安装方向按爆炸图估算，单台用量2。',
    ]),
    primitives: [
      {type: 'extrude', points: [[-35, -20], [44, 0], [-35, 20], [-22, 6], [-22, -6]], depth: 4, holes: [{kind: 'circle', center: [-24, 0], radius: 6}], bevel: 0.6},
      {type: 'cylinder', radius: 9, length: 7, axis: 'z', position: [-24, 0, 0], material: 'darkMetal'},
    ],
  },

  'CVT1-0308': {
    level: '轮廓级',
    material: 'metal',
    source: modelSource(44, [], [11], [
      '标号44位于第11页左下调节链，是带圆形底肩的专用六角螺母。',
      '对边估算22、通孔12、六角厚度10、底肩外径28；内螺纹未展开。',
    ]),
    primitives: [
      hexNut(22, 12, 10),
      annularLathe(28, 12, 4, {position: [7, 0, 0], material: 'darkMetal'}),
    ],
  },

  'CVT1-0320': {
    level: '轮廓级',
    material: 'metal',
    source: modelSource(45, [], [10], [
      '标号45位于第10页上部右侧底座旁，是三孔右支臂，轮廓向右弯折。',
      '臂长、孔径、板厚和弯折角按爆炸图估算；与标号28左支臂镜向但凸台方向不同。',
    ]),
    primitives: [
      {type: 'extrude', points: [[-35, -28], [85, -28], [82, 48], [30, 22], [-54, 38], [-82, 8]], depth: 12, holes: [{kind: 'circle', center: [58, 10], radius: 10}, {kind: 'circle', center: [-12, -4], radius: 9}, {kind: 'circle', center: [-55, 10], radius: 8}], bevel: 2},
      {type: 'cylinder', radius: 15, length: 18, axis: 'z', position: [58, 10, 0], material: 'darkMetal'},
    ],
  },

  'CVT1-0321': {
    level: '轮廓级',
    material: 'metal',
    source: modelSource(46, [], [10], [
      '标号46位于第10页左右支臂轴线，是带六角头、光杆肩部和短螺纹的专用螺栓。',
      '估算杆径10、总长58、头部对边17；肩部和螺纹长度按爆炸图比例估算，单台用量2。',
    ]),
    primitives: [
      {type: 'cylinder', radius: 5, length: 58, axis: 'x', position: [29, 0, 0]},
      hexNut(17, 0.1, 7, {position: [-3.5, 0, 0]}),
      {type: 'cylinder', radius: 6.5, length: 20, axis: 'x', position: [12, 0, 0], material: 'darkMetal'},
      ...threadRings(5.1, 38, 57, 4),
    ],
  },

  'CVT1-0325': bearingCoverSpec(47, [10], 112, 54, 24, 3, '标号47位于第10页右侧辊轴端部，是三耳、较深杯形轴承盖。'),

  'TZH1035-M12X120': {
    level: '尺寸级',
    material: 'metal',
    source: modelSource(48, ['M12X120'], [11], [
      '厂家件号明确丝杆为M12、总长120毫米，公称外径和总长直接采用。',
      '螺距、牙型、两端倒角和未画出的配合长度未标；螺纹用连续右旋螺旋线作视觉表达。',
    ]),
    primitives: [
      {type: 'cylinder', radius: 6, length: 120, axis: 'x', position: [0, 0, 0]},
      {type: 'tube', points: helixPoints(-58, 58, 6.15, 16, 1), radius: 0.42, material: 'darkMetal'},
    ],
  },

  'TZH1039-50X62X0.1': {
    level: '尺寸级',
    material: 'metal',
    source: modelSource(49, ['50X62X0.1'], [10], [
      '厂家件号明确环形调整垫片内径50、外径62、厚度0.1毫米；纠正旧索引误写的50X52X0.1。',
      '0.1毫米薄片按金属调整垫片建立，不建成橡胶密封圈；边缘倒角未标且不添加。',
    ]),
    primitives: [
      {type: 'extrude', points: circlePoints(31), depth: 0.1, holes: [{kind: 'circle', center: [0, 0], radius: 25}], rotation: [0, PI / 2, 0], material: 'metal'},
    ],
  },

  'TZH1039-80X100X0.1': {
    level: '尺寸级',
    material: 'metal',
    source: modelSource(50, ['80X100X0.1'], [10], [
      '厂家件号明确环形调整垫片内径80、外径100、厚度0.1毫米，三项尺寸直接采用。',
      '该件为金属薄垫片，不套用项目49尺寸，也不建成橡胶密封圈；边缘倒角未标且不添加。',
    ]),
    primitives: [
      {type: 'extrude', points: circlePoints(50), depth: 0.1, holes: [{kind: 'circle', center: [0, 0], radius: 40}], rotation: [0, PI / 2, 0], material: 'metal'},
    ],
  },
};
