// JWF1206 原PDF第10页：逐格按厂家剖面、旋转轮廓和明示尺寸建立。
// 坐标单位为毫米，X=宽、Y=高、Z=深；未标参数只记录在 assumptions。
const detectionDiskOutline = Array.from({ length: 128 }, (_, index) => {
  const angle = Math.PI * 2 * index / 128;
  const notchDistance = Math.min(...[Math.PI / 4, 3 * Math.PI / 4, 5 * Math.PI / 4, 7 * Math.PI / 4]
    .map((center) => Math.abs(Math.atan2(Math.sin(angle - center), Math.cos(angle - center)))));
  const radius = notchDistance < 0.16 ? 55 + 10 * notchDistance / 0.16 : 65;
  return [Math.cos(angle) * radius, Math.sin(angle) * radius];
});

export const jwf1206P10ModelSpecs = {
  'ZFA211-0206': {
    level: '轮廓级',
    material: 'metal',
    source: {
      page: 10,
      dimensions: ['φ80×10'],
      views: ['轴向剖视图'],
      assumptions: ['外径80和厚度10按厂家标注', '中心孔直径未标，按剖面比例估算为20；端面倒角未标而未添加'],
    },
    primitives: [
      {
        type: 'lathe',
        points: [[10, -5], [40, -5], [40, 5], [10, 5], [10, -5]],
        rotation: [1.5708, 0, 0],
      },
    ],
  },

  'ZFA211-1212': {
    level: '轮廓级',
    material: 'metal',
    source: {
      page: 10,
      dimensions: ['φ30×6'],
      views: ['轴向剖视图'],
      assumptions: ['外径30和厚度6按厂家标注', '中心孔直径未标，按剖面比例估算为10；端面倒角未标而未添加'],
    },
    primitives: [
      {
        type: 'lathe',
        points: [[5, -3], [15, -3], [15, 3], [5, 3], [5, -3]],
        rotation: [1.5708, 0, 0],
      },
    ],
  },

  'ZFA211-4142': {
    level: '轮廓级',
    material: 'metal',
    source: {
      page: 10,
      dimensions: ['M12', '长55'],
      views: ['主视图'],
      assumptions: ['螺杆大径按M12取12，眼环中心至杆端长度按55建立', '眼环内外径、颈部长度和螺距未标，按主视图比例估算；厂家未画独立闭合螺纹牙型，不添加实体环纹'],
    },
    primitives: [
      { type: 'torus', radius: 7.5, tube: 2.5, position: [-27.5, 0, 0] },
      { type: 'extrude', points: [[-17.5, 0], [-13.5, -6], [-10, -6], [-10, 6], [-13.5, 6]], depth: 5, position: [0, 0, -2.5] },
      { type: 'cylinder', radius: 6, length: 41, axis: 'x', position: [7, 0, 0] },
    ],
  },

  'ZFA211A-0201A': {
    level: '轮廓级',
    material: 'metal',
    source: {
      page: 10,
      dimensions: ['φ130×24.5'],
      views: ['正视图', '侧视图'],
      assumptions: ['最大外径130和总厚24.5按厂家标注', '两端环形槽的内外径与深度，以及四处径向缺口的深度和角度未标，按两视图比例估算'],
    },
    primitives: [
      {
        type: 'extrude',
        points: detectionDiskOutline,
        depth: 18,
        position: [0, 0, -9],
      },
      {
        type: 'extrude',
        points: detectionDiskOutline,
        depth: 3.25,
        position: [0, 0, -10.625],
        holes: [{ kind: 'circle', center: [0, 0], radius: 52 }],
      },
      {
        type: 'extrude',
        points: detectionDiskOutline,
        depth: 3.25,
        position: [0, 0, 10.625],
        holes: [{ kind: 'circle', center: [0, 0], radius: 52 }],
      },
      { type: 'cylinder', radius: 50, length: 3.25, axis: 'z', position: [0, 0, -10.625] },
      { type: 'cylinder', radius: 50, length: 3.25, axis: 'z', position: [0, 0, 10.625] },
    ],
  },

  'jwf1206:p10:r2:c1': {
    level: '尺寸级',
    material: 'metal',
    source: {
      page: 10,
      dimensions: ['φ75', 'φ42', '54'],
      views: ['正视图', '轴向剖视图'],
      assumptions: ['厂家件号格为空，本对象使用审计recordKey，未把名称中的ZT12-42X75冒充件号', '外径75、内孔42和总长54按厂家标注；六个螺栓的孔径、分布圆和头部尺寸未标，按正视图比例估算'],
    },
    primitives: [
      {
        type: 'lathe',
        points: [[21, -27], [37.5, -27], [37.5, 27], [21, 27], [21, -27]],
        rotation: [1.5708, 0, 0],
      },
      { type: 'cylinder', radius: 3.8, length: 60, axis: 'z', position: [25.115, 14.5, 0], material: 'darkMetal' },
      { type: 'cylinder', radius: 7, length: 2, axis: 'z', position: [25.115, 14.5, 28], material: 'metal' },
      { type: 'cylinder', radius: 4.5, length: 4, axis: 'z', segments: 6, position: [25.115, 14.5, 29], material: 'darkMetal' },
      { type: 'cylinder', radius: 3.8, length: 60, axis: 'z', position: [0, 29, 0], material: 'darkMetal' },
      { type: 'cylinder', radius: 7, length: 2, axis: 'z', position: [0, 29, 28], material: 'metal' },
      { type: 'cylinder', radius: 4.5, length: 4, axis: 'z', segments: 6, position: [0, 29, 29], material: 'darkMetal' },
      { type: 'cylinder', radius: 3.8, length: 60, axis: 'z', position: [-25.115, 14.5, 0], material: 'darkMetal' },
      { type: 'cylinder', radius: 7, length: 2, axis: 'z', position: [-25.115, 14.5, 28], material: 'metal' },
      { type: 'cylinder', radius: 4.5, length: 4, axis: 'z', segments: 6, position: [-25.115, 14.5, 29], material: 'darkMetal' },
      { type: 'cylinder', radius: 3.8, length: 60, axis: 'z', position: [-25.115, -14.5, 0], material: 'darkMetal' },
      { type: 'cylinder', radius: 7, length: 2, axis: 'z', position: [-25.115, -14.5, 28], material: 'metal' },
      { type: 'cylinder', radius: 4.5, length: 4, axis: 'z', segments: 6, position: [-25.115, -14.5, 29], material: 'darkMetal' },
      { type: 'cylinder', radius: 3.8, length: 60, axis: 'z', position: [0, -29, 0], material: 'darkMetal' },
      { type: 'cylinder', radius: 7, length: 2, axis: 'z', position: [0, -29, 28], material: 'metal' },
      { type: 'cylinder', radius: 4.5, length: 4, axis: 'z', segments: 6, position: [0, -29, 29], material: 'darkMetal' },
      { type: 'cylinder', radius: 3.8, length: 60, axis: 'z', position: [25.115, -14.5, 0], material: 'darkMetal' },
      { type: 'cylinder', radius: 7, length: 2, axis: 'z', position: [25.115, -14.5, 28], material: 'metal' },
      { type: 'cylinder', radius: 4.5, length: 4, axis: 'z', segments: 6, position: [25.115, -14.5, 29], material: 'darkMetal' },
    ],
  },
};

for (const [partCode, spec] of Object.entries(jwf1206P10ModelSpecs)) {
  const hasSection = spec.source.views.some((view) => /剖/.test(view));
  const cropCode = partCode === 'jwf1206:p10:r2:c1' ? 'jwf1206_p10_r2_c1' : partCode;
  spec.source.sourceCrop = `assets/manuals/jwf1206/crops/${cropCode}.png`;
  spec.source.sourceVector = `assets/manuals/jwf1206/crops/${cropCode}.pdf`;
  spec.source.cropDpi = 600;
  spec.source.excludedLines = [
    '原格表框、件号、名称、数量栏与文字', '尺寸线、箭头与尺寸数字', '尺寸延长线',
    '中心线与中心十字', '引出线与标注线', ...(hasSection ? ['剖面填充线'] : []),
  ];
  spec.source.unknowns = spec.source.assumptions.filter((text) => /未.*(?:标|给|注明|画|规定|建模)|估算|比例|近似|冒充/.test(text));
  spec.source.reconstructionRule = '逐格识别主视、辅助视图和剖面；清除非实体标注线后，只按厂家明示尺寸与闭合实体轮廓建模。';
}
