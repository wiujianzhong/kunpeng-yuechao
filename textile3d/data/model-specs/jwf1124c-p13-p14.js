// JWF1124C-160 第13—14页：给棉部件条目51—116的独立3D规格。
// 厂家两页只有BOM，因此明确规格仅写入source.dimensions，其余展示尺寸全部写入assumptions。

const PI2 = Math.PI * 2;
const recordKey = (page, item) => `jwf1124c-p${page}-item-${String(item).padStart(3, '0')}`;
const source = (page, dimensions, assumptions, views = [`第${page}页BOM件号、名称与规格`]) => ({
  page,
  dimensions,
  views,
  assumptions,
});
const hexagon = radius => Array.from({ length: 6 }, (_, index) => {
  const angle = Math.PI / 6 + index * Math.PI / 3;
  return [radius * Math.cos(angle), radius * Math.sin(angle)];
});
const circleHole = (radius) => ({ kind: 'circle', center: [0, 0], radius });
const ringProfile = (innerRadius, outerRadius, thickness) => [
  [innerRadius, -thickness / 2],
  [outerRadius, -thickness / 2],
  [outerRadius, thickness / 2],
  [innerRadius, thickness / 2],
];

function spec({ page, item, code, name, dimensions, level = '轮廓级', material, assumptions, primitives, views }) {
  return {
    recordKey: recordKey(page, item),
    code,
    name,
    level,
    material,
    source: source(page, dimensions, assumptions, views),
    primitives,
  };
}

function threadRings(diameter, length) {
  return [0.18, 0.29, 0.40, 0.51].map(ratio => ({
    type: 'torus',
    radius: diameter / 2,
    tube: Math.max(diameter * 0.045, 0.28),
    position: [0, length * ratio, 0],
    rotation: [1.5708, 0, 0],
    material: 'darkMetal',
  }));
}

function boltSpec({ page, item, code, name, diameter, length, dimensions, head = 'hex' }) {
  const headHeight = diameter * 0.64;
  const primitives = [
    { type: 'cylinder', radius: diameter / 2, length, axis: 'y', position: [0, 0, 0], material: 'metal' },
    ...threadRings(diameter, length),
  ];
  if (head === 'roundSquareNeck') {
    primitives.push(
      { type: 'lathe', points: [[0, -headHeight / 2], [diameter * 0.85, -headHeight / 2], [diameter * 0.98, -headHeight * 0.12], [diameter * 0.72, headHeight / 2], [0, headHeight / 2]], position: [0, -length / 2 - headHeight / 2, 0], material: 'metal', flatShading: false },
      { type: 'box', size: [diameter * 0.82, diameter * 0.55, diameter * 0.82], position: [0, -length / 2 + diameter * 0.24, 0], material: 'darkMetal' },
    );
  } else {
    primitives.push({ type: 'cylinder', radius: diameter * 0.88, length: headHeight, axis: 'y', position: [0, -length / 2 - headHeight / 2, 0], segments: 6, material: 'darkMetal' });
  }
  return spec({
    page, item, code, name, dimensions, level: '尺寸级', material: 'metal',
    assumptions: [
      `公称直径${diameter}和杆长${length}来自厂家名称规格。`,
      `${head === 'roundSquareNeck' ? '圆头方颈' : '六角头'}、螺纹段长度、螺距和倒角未由该页标注，按标准紧固件的常见比例估算。`,
    ],
    primitives,
  });
}

function screwSpec({ page, item, code, name, diameter, length, dimensions, style }) {
  const primitives = [
    { type: 'cylinder', radius: diameter / 2, length, axis: 'y', position: [0, 0, 0], material: 'metal' },
    ...threadRings(diameter, length),
  ];
  if (style === 'socketCap') {
    primitives.push(
      { type: 'cylinder', radius: diameter * 0.82, length: diameter, axis: 'y', position: [0, -length / 2 - diameter / 2, 0], material: 'darkMetal' },
      { type: 'cylinder', radius: diameter * 0.31, length: diameter * 0.25, axis: 'y', position: [0, -length / 2 - diameter * 1.02, 0], segments: 6, material: 'metal' },
    );
  } else if (style === 'setScrew') {
    primitives.push(
      { type: 'cylinder', radius: diameter * 0.34, length: diameter * 0.22, axis: 'y', position: [0, -length / 2 - diameter * 0.08, 0], segments: 6, material: 'darkMetal' },
    );
  } else if (style === 'buttonSocket') {
    primitives.push(
      { type: 'lathe', points: [[0, -diameter * 0.36], [diameter * 0.85, -diameter * 0.36], [diameter, -diameter * 0.05], [diameter * 0.72, diameter * 0.42], [0, diameter * 0.42]], position: [0, -length / 2 - diameter * 0.4, 0], material: 'darkMetal', flatShading: false },
      { type: 'cylinder', radius: diameter * 0.28, length: diameter * 0.2, axis: 'y', position: [0, -length / 2 - diameter * 0.83, 0], segments: 6, material: 'metal' },
    );
  } else {
    primitives.push(
      { type: 'cylinder', radius: diameter * 0.78, length: diameter * 0.65, axis: 'y', position: [0, -length / 2 - diameter * 0.33, 0], material: 'darkMetal' },
      { type: 'box', size: [diameter * 1.05, diameter * 0.16, diameter * 0.16], position: [0, -length / 2 - diameter * 0.69, 0], material: 'metal' },
    );
  }
  return spec({
    page, item, code, name, dimensions, level: '尺寸级', material: 'metal',
    assumptions: [
      `公称直径${diameter}和杆长${length}来自厂家名称规格。`,
      `螺钉头型按${code}标准类别作视觉表达；精确头高、扳手孔、螺距和末端形式未由厂家该页标注。`,
    ],
    primitives,
  });
}

function nutSpec({ page, item, code, name, diameter, dimensions, style = 'hex' }) {
  const height = diameter * (style === 'thin' ? 0.48 : 0.82);
  const outer = diameter * 0.9;
  const primitives = [{
    type: 'extrude', points: hexagon(outer), depth: height,
    holes: [circleHole(diameter * 0.52)], rotation: [1.5708, 0, 0], material: 'metal',
  }];
  if (style === 'nyloc') primitives.push({ type: 'torus', radius: diameter * 0.53, tube: diameter * 0.13, position: [0, height * 0.48, 0], rotation: [1.5708, 0, 0], material: 'plastic' });
  if (style === 'cap') primitives.push({ type: 'lathe', points: [[0, 0], [outer * 0.72, 0], [outer * 0.86, height * 0.42], [outer * 0.58, height], [0, height * 1.16]], position: [0, height * 0.45, 0], material: 'metal', flatShading: false });
  return spec({
    page, item, code, name, dimensions, material: 'metal',
    assumptions: [
      `厂家名称明确公称螺纹M${diameter}，未给螺母独立视图。`,
      `${style === 'nyloc' ? '尼龙锁紧圈' : style === 'cap' ? '盖形封闭端' : style === 'thin' ? '薄六角体' : '六角体'}的对边、高度、螺距和倒角按常见标准件比例估算。`,
    ],
    primitives,
  });
}

function springWasherSpec({ page, item, code, name, diameter, dimensions }) {
  const radius = diameter * 0.72;
  const points = Array.from({ length: 26 }, (_, index) => {
    const angle = 0.38 + index * (PI2 - 0.76) / 25;
    const lift = (index / 25 - 0.5) * diameter * 0.18;
    return [radius * Math.cos(angle), lift, radius * Math.sin(angle)];
  });
  return spec({
    page, item, code, name, dimensions, material: 'metal',
    assumptions: [`厂家只明确垫圈规格${diameter}。`, '按开口螺旋弹簧垫圈建立；外径、截面直径、开口角和轴向错位按常见比例估算。'],
    primitives: [{ type: 'tube', points, radius: Math.max(diameter * 0.12, 0.7), material: 'metal' }],
  });
}

function plainWasherSpec({ page, item, code, name, diameter, dimensions, large = false }) {
  const outer = diameter * (large ? 1.5 : 1.1);
  const thickness = Math.max(diameter * 0.12, 1);
  return spec({
    page, item, code, name, dimensions, material: 'metal',
    assumptions: [`厂家只明确垫圈规格${diameter}。`, `${large ? '加大外径' : '普通平垫'}的外径、厚度和内孔装配余量按${code}常见比例估算。`],
    primitives: [{ type: 'lathe', points: ringProfile(diameter * 0.53, outer, thickness), material: 'metal', flatShading: false }],
  });
}

function circlipSpec({ page, item, code, name, nominal, dimensions, internal }) {
  const radius = nominal / 2;
  const gap = internal ? 0.48 : 0.34;
  const points = Array.from({ length: 30 }, (_, index) => {
    const angle = gap + index * (PI2 - gap * 2) / 29;
    return [radius * Math.cos(angle), radius * Math.sin(angle), 0];
  });
  const endA = points[0];
  const endB = points[points.length - 1];
  return spec({
    page, item, code, name, dimensions, material: 'metal',
    assumptions: [`厂家只明确挡圈规格${dimensions[0]}。`, `${internal ? '孔用内挡圈' : '轴用外挡圈'}的厚度、开口角、耳部和钳孔按${code}常见外形估算。`],
    primitives: [
      { type: 'tube', points, radius: Math.max(nominal * 0.035, 0.9), material: 'metal' },
      { type: 'cylinder', radius: Math.max(nominal * 0.07, 1.8), length: Math.max(nominal * 0.08, 2), axis: 'z', position: endA, material: 'darkMetal' },
      { type: 'cylinder', radius: Math.max(nominal * 0.07, 1.8), length: Math.max(nominal * 0.08, 2), axis: 'z', position: endB, material: 'darkMetal' },
    ],
  });
}

function keySpec({ page, item, code, name, length, dimensions }) {
  return spec({
    page, item, code, name, dimensions, level: '尺寸级', material: 'metal',
    assumptions: ['厂家名称明确键宽8和长度，键高未注，按7估算。', '两端圆角、倒角和公差未由BOM页提供，用矩形键作视觉表达。'],
    primitives: [{ type: 'box', size: [length, 7, 8], material: 'metal' }],
  });
}

function bearingSpec({ page, item, code, name, dimensions, bore, outer, width, rows = 1, sealed = false, extended = false }) {
  const ballRadius = Math.max((outer - bore) * 0.11, 2.2);
  const raceRadius = (bore + outer) / 4;
  const primitives = [
    { type: 'lathe', points: ringProfile(outer * 0.41, outer / 2, width), material: 'darkMetal', flatShading: false },
    { type: 'lathe', points: ringProfile(bore / 2, bore / 2 + (outer - bore) * 0.16, width * (extended ? 1.35 : 0.84)), material: 'metal', flatShading: false },
  ];
  const offsets = rows === 2 ? [-width * 0.22, width * 0.22] : [0];
  offsets.forEach(offset => primitives.push({ type: 'torus', radius: raceRadius, tube: ballRadius, position: [0, offset, 0], rotation: [1.5708, 0, 0], material: 'metal' }));
  if (sealed) primitives.push(
    { type: 'lathe', points: ringProfile(bore * 0.58, outer * 0.40, 1.2), position: [0, -width * 0.43, 0], material: 'rubber', flatShading: false },
    { type: 'lathe', points: ringProfile(bore * 0.58, outer * 0.40, 1.2), position: [0, width * 0.43, 0], material: 'rubber', flatShading: false },
  );
  return spec({
    page, item, code, name, dimensions, material: 'metal',
    assumptions: [
      `厂家只给轴承型号${dimensions[0]}，该字符是型号规格，不是BOM页独立标注的几何尺寸。`,
      `内径${bore}、外径${outer}、宽${width}及${rows === 2 ? '双列滚动体' : '单列滚动体'}的比例仅按该型号常见外形建立，未写入厂家dimensions。`,
    ],
    primitives,
  });
}

function oilSealSpec({ page, item, code, name, dimensions, inner, outer, width }) {
  return spec({
    page, item, code, name, dimensions, level: '尺寸级', material: 'rubber',
    assumptions: ['PD规格中的内径、外径和宽度按厂家名称建立。', '密封唇口、骨架钢圈、弹簧槽和倒角未标，按径向油封的常见截面估算。'],
    primitives: [
      { type: 'lathe', points: ringProfile(inner / 2, outer / 2, width), material: 'rubber', flatShading: false },
      { type: 'torus', radius: inner * 0.55, tube: Math.max(width * 0.11, 0.8), position: [0, width * 0.12, 0], rotation: [1.5708, 0, 0], material: 'darkMetal' },
    ],
  });
}

function timingBeltSpec({ page, item, name, dimensions, pitchLength, width }) {
  const a = pitchLength / 4.7;
  const b = Math.max(a * 0.34, 38);
  const count = 32;
  const thickness = Math.max(pitchLength * 0.006, 5);
  const primitives = [];
  for (let index = 0; index < count; index += 1) {
    const t = index * PI2 / count;
    const next = (index + 1) * PI2 / count;
    const x = a * Math.cos(t);
    const y = b * Math.sin(t);
    const nx = a * Math.cos(next);
    const ny = b * Math.sin(next);
    const segmentLength = Math.hypot(nx - x, ny - y) * 1.08;
    const angle = Math.atan2(ny - y, nx - x);
    primitives.push({ type: 'box', size: [segmentLength, thickness, width], position: [(x + nx) / 2, (y + ny) / 2, 0], rotation: [0, 0, angle], material: 'rubber' });
    if (index % 2 === 0) primitives.push({ type: 'box', size: [Math.max(segmentLength * 0.45, 4), thickness * 0.55, width], position: [x * 0.94, y * 0.94, 0], rotation: [0, 0, angle], material: 'darkMetal' });
  }
  return spec({
    page, item, code: null, name, dimensions, material: 'rubber',
    assumptions: [
      `厂家名称中明确同步带型号${dimensions[0]}，厂家件号栏保持为空。`,
      `按型号中的节线长${pitchLength}和带宽${width}建立闭合橡胶带环；带轮中心距、张紧状态、齿高和齿形未标，按椭圆展示轮廓估算。`,
    ],
    primitives,
  });
}

function ambiguousShimSpec({ page, item, code, name, radius }) {
  const innerRadius = Number((radius * 0.56).toFixed(2));
  return spec({
    page, item, code, name, dimensions: [], material: 'metal',
    assumptions: [
      `厂家只给件号${code}与名称“垫片”；件号尾缀的含义和单位未注，未写入dimensions。`,
      `为了可视化，用外半径${radius}、内半径${innerRadius}、厚0.8的环形薄垫片表达；这些数值不由件号尾缀推导。`,
    ],
    primitives: [{ type: 'lathe', points: ringProfile(innerRadius, radius, 0.8), material: 'metal', flatShading: false }],
  });
}

const p13 = {};
const p14 = {};
const add = (target, key, value) => { target[key] = value; };

add(p13, 'TZH1039-80X100X0.3', spec({
  page: 13, item: 51, code: 'TZH1039-80X100X0.3', name: '垫片', dimensions: ['80X100X0.3'], level: '尺寸级', material: 'metal',
  assumptions: ['按厂家件号中80×100×0.3建立内径80、外径100、厚0.3的环形薄垫片。', '厂家BOM没有标材质、开口或表面处理，按金属调整垫片呈现。'],
  primitives: [{ type: 'lathe', points: ringProfile(40, 50, 0.3), material: 'metal', flatShading: false }],
}));
add(p13, 'TZH1040-20', ambiguousShimSpec({ page: 13, item: 52, code: 'TZH1040-20', name: '垫片', radius: 34 }));
add(p13, 'TZH1040-80', ambiguousShimSpec({ page: 13, item: 53, code: 'TZH1040-80', name: '垫片', radius: 43 }));
add(p13, 'TZH1068-1.25X2.1', spec({
  page: 13, item: 54, code: 'TZH1068-1.25X2.1', name: '垫片', dimensions: ['1.25X2.1'], level: '尺寸级', material: 'rubber',
  assumptions: ['厂家件号明确1.25×2.1截面规格；实际展开长度未注。', '按1.25厚、2.1宽的连续密封垫条建立100长展示段；材质和硬度未注，按橡胶视觉表达。'],
  primitives: [{ type: 'box', size: [100, 2.1, 1.25], material: 'rubber' }],
}));

add(p13, 'GB14', boltSpec({ page: 13, item: 55, code: 'GB14', name: '螺栓 M10X25', diameter: 10, length: 25, dimensions: ['M10X25'], head: 'roundSquareNeck' }));
[
  [56, 6, 16], [57, 6, 20], [58, 8, 16], [59, 8, 30], [60, 8, 80],
  [61, 10, 20], [62, 10, 30], [63, 10, 50], [64, 10, 100],
].forEach(([item, diameter, length]) => add(p13, recordKey(13, item), boltSpec({ page: 13, item, code: 'GB5783', name: `螺栓 M${diameter}X${length}`, diameter, length, dimensions: [`M${diameter}X${length}`] })));
add(p13, 'GB798', boltSpec({ page: 13, item: 65, code: 'GB798', name: '螺栓 M16X70', diameter: 16, length: 70, dimensions: ['M16X70'] }));

add(p13, 'GB65', screwSpec({ page: 13, item: 66, code: 'GB65', name: '螺钉 M5X12', diameter: 5, length: 12, dimensions: ['M5X12'], style: 'slotted' }));
[[67, 6, 8], [68, 8, 16], [69, 10, 30]].forEach(([item, diameter, length]) => add(p13, recordKey(13, item), screwSpec({ page: 13, item, code: 'GB70', name: `螺钉 M${diameter}X${length}`, diameter, length, dimensions: [`M${diameter}X${length}`], style: 'socketCap' })));
[[70, 8, 12], [71, 10, 25], [72, 10, 30]].forEach(([item, diameter, length]) => add(p13, recordKey(13, item), screwSpec({ page: 13, item, code: 'GB80', name: `螺钉 M${diameter}X${length}`, diameter, length, dimensions: [`M${diameter}X${length}`], style: 'setScrew' })));
add(p13, 'GB6191', screwSpec({ page: 13, item: 73, code: 'GB6191', name: '螺钉 M8X12', diameter: 8, length: 12, dimensions: ['M8X12'], style: 'buttonSocket' }));

add(p13, 'GB889', nutSpec({ page: 13, item: 74, code: 'GB889', name: '螺母 M10', diameter: 10, dimensions: ['M10'], style: 'nyloc' }));
add(p13, 'GB923', nutSpec({ page: 13, item: 75, code: 'GB923', name: '螺母 M12', diameter: 12, dimensions: ['M12'], style: 'cap' }));
[[76, 8], [77, 10], [78, 12]].forEach(([item, diameter]) => add(p13, recordKey(13, item), nutSpec({ page: 13, item, code: 'GB6170', name: `螺母 M${diameter}`, diameter, dimensions: [`M${diameter}`] })));
add(p13, 'GB6172', nutSpec({ page: 13, item: 79, code: 'GB6172', name: '螺母 M16', diameter: 16, dimensions: ['M16'], style: 'thin' }));

[[80, 6], [81, 8], [82, 10]].forEach(([item, diameter]) => add(p13, recordKey(13, item), springWasherSpec({ page: 13, item, code: 'GB93', name: `垫圈 ${diameter}`, diameter, dimensions: [`${diameter}`] })));
[[83, 6], [84, 8], [85, 10]].forEach(([item, diameter]) => add(p13, recordKey(13, item), plainWasherSpec({ page: 13, item, code: 'GB96', name: `垫圈 ${diameter}`, diameter, dimensions: [`${diameter}`], large: true })));
[[86, 5], [87, 6], [88, 8], [89, 10], [90, 12]].forEach(([item, diameter]) => add(p13, recordKey(13, item), plainWasherSpec({ page: 13, item, code: 'GB97.1', name: `垫圈 ${diameter}`, diameter, dimensions: [`${diameter}`] })));

[[91, 'B32', 32], [92, 'B38', 38]].forEach(([item, label, nominal]) => add(p13, recordKey(13, item), circlipSpec({ page: 13, item, code: 'GB892', name: `挡圈 ${label}`, nominal, dimensions: [label], internal: false })));
[[93, 42], [94, 47], [95, 62]].forEach(([item, nominal]) => add(p13, recordKey(13, item), circlipSpec({ page: 13, item, code: 'GB893.1', name: `挡圈 ${nominal}`, nominal, dimensions: [`${nominal}`], internal: true })));
[[96, 20], [97, 25], [98, 30], [99, 80]].forEach(([item, nominal]) => add(p13, recordKey(13, item), circlipSpec({ page: 13, item, code: 'GB894.1', name: `挡圈 ${nominal}`, nominal, dimensions: [`${nominal}`], internal: false })));
add(p13, 'GB1096-79', keySpec({ page: 13, item: 100, code: 'GB1096-79', name: '键 8X28', length: 28, dimensions: ['8X28'] }));

add(p14, recordKey(14, 101), keySpec({ page: 14, item: 101, code: 'GB1096-79', name: '键 8X36', length: 36, dimensions: ['8X36'] }));
add(p14, recordKey(14, 102), keySpec({ page: 14, item: 102, code: 'GB1096-79', name: '键 8X50', length: 50, dimensions: ['8X50'] }));
add(p14, 'GB/T281-94', bearingSpec({ page: 14, item: 103, code: 'GB/T281-94', name: '滚动轴承 2206', dimensions: ['2206'], bore: 30, outer: 62, width: 20, rows: 2 }));
add(p14, recordKey(14, 104), bearingSpec({ page: 14, item: 104, code: 'GB/T276-94', name: '滚动轴承 6004-RS', dimensions: ['6004-RS'], bore: 20, outer: 42, width: 12, sealed: true }));
add(p14, recordKey(14, 105), bearingSpec({ page: 14, item: 105, code: 'GB/T276-94', name: '滚动轴承 6005-RS', dimensions: ['6005-RS'], bore: 25, outer: 47, width: 12, sealed: true }));
add(p14, 'GB/T3882-95', bearingSpec({ page: 14, item: 106, code: 'GB/T3882-95', name: '滚动轴承 UEL206', dimensions: ['UEL206'], bore: 30, outer: 62, width: 35.7, extended: true }));

add(p14, 'GB/T7940.2-95', spec({
  page: 14, item: 107, code: 'GB/T7940.2-95', name: '油杯 45° M6', dimensions: ['45°', 'M6'], material: 'brass',
  assumptions: ['45°弯角和M6螺纹来自厂家名称规格。', '杯体直径、容量、螺纹长和防尘盖未注，按黄铜斜角润滑油杯的常见比例估算。'],
  primitives: [
    { type: 'cylinder', radius: 3, length: 12, axis: 'y', position: [-7, -7, 0], rotation: [0, 0, -0.7854], material: 'brass' },
    { type: 'cylinder', radius: 7, length: 13, axis: 'y', position: [1, 1, 0], rotation: [0, 0, -0.7854], material: 'brass' },
    { type: 'lathe', points: [[0, -6], [7, -6], [10, 0], [8, 9], [3, 14], [0, 14]], position: [8, 8, 0], rotation: [0, 0, -0.7854], material: 'brass', flatShading: false },
  ],
}));
add(p14, recordKey(14, 108), oilSealSpec({ page: 14, item: 108, code: 'HG4-692-67', name: '油封 PD30X45X10', dimensions: ['PD30X45X10'], inner: 30, outer: 45, width: 10 }));
add(p14, recordKey(14, 109), oilSealSpec({ page: 14, item: 109, code: 'HG4-692-67', name: '油封 PD35X62X12', dimensions: ['PD35X62X12'], inner: 35, outer: 62, width: 12 }));
add(p14, 'SKF', bearingSpec({ page: 14, item: 110, code: 'SKF', name: '滚动轴承 YEL207', dimensions: ['YEL207'], bore: 35, outer: 72, width: 43.7, extended: true }));

add(p14, recordKey(14, 111), timingBeltSpec({ page: 14, item: 111, name: '同步带 HTD-600-8M-30', dimensions: ['HTD-600-8M-30'], pitchLength: 600, width: 30 }));
add(p14, recordKey(14, 112), timingBeltSpec({ page: 14, item: 112, name: '同步带 HTD-1912-8M-50', dimensions: ['HTD-1912-8M-50'], pitchLength: 1912, width: 50 }));
add(p14, recordKey(14, 113), timingBeltSpec({ page: 14, item: 113, name: '同步带 HTD.DA-1440-8M-30', dimensions: ['HTD.DA-1440-8M-30'], pitchLength: 1440, width: 30 }));
add(p14, 'TZH1037-12', ambiguousShimSpec({ page: 14, item: 114, code: 'TZH1037-12', name: '垫片', radius: 31 }));
add(p14, 'GB5783', boltSpec({ page: 14, item: 115, code: 'GB5783', name: '螺栓 M12X30', diameter: 12, length: 30, dimensions: ['M12X30'] }));
add(p14, recordKey(14, 116), spec({
  page: 14, item: 116, code: null, name: '减速电机 U8-B6-1.1-80(左手)', dimensions: ['U8-B6-1.1-80'], material: 'paintedMetal',
  assumptions: ['厂家件号栏为空，U8-B6-1.1-80只保留为名称中的型号，左手方向不反填件号。', '电机机座号、减速箱外形、输出轴、散热筋和接线盒按左手布置建立；安装孔距和精确传动比未注。'],
  primitives: [
    { type: 'box', size: [165, 175, 150], position: [-120, 0, 0], material: 'darkMetal' },
    { type: 'cylinder', radius: 76, length: 230, axis: 'x', position: [75, 0, 0], material: 'paintedMetal' },
    { type: 'cylinder', radius: 84, length: 24, axis: 'x', position: [-45, 0, 0], material: 'darkMetal' },
    { type: 'cylinder', radius: 70, length: 20, axis: 'x', position: [200, 0, 0], material: 'darkMetal' },
    { type: 'cylinder', radius: 24, length: 110, axis: 'x', position: [-245, 0, 0], material: 'metal' },
    { type: 'box', size: [92, 58, 78], position: [65, 105, 0], material: 'darkMetal' },
    { type: 'box', size: [250, 22, 175], position: [75, -86, 0], material: 'darkMetal' },
    { type: 'box', size: [65, 36, 190], position: [-120, -98, 0], material: 'darkMetal' },
    { type: 'box', size: [12, 155, 168], position: [8, 0, 0], material: 'metal' },
    { type: 'box', size: [12, 155, 168], position: [45, 0, 0], material: 'metal' },
    { type: 'box', size: [12, 155, 168], position: [82, 0, 0], material: 'metal' },
    { type: 'box', size: [12, 155, 168], position: [119, 0, 0], material: 'metal' },
  ],
}));

export const jwf1124cP13ModelSpecs = p13;
export const jwf1124cP14ModelSpecs = p14;
export const jwf1124cP13P14ModelSpecs = { ...p13, ...p14 };
