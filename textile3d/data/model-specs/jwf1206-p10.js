// JWF1206 原PDF第10页：逐格按厂家剖面、旋转轮廓和明示尺寸建立。
// 坐标单位为毫米，X=宽、Y=高、Z=深；未标参数只记录在 assumptions。
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
      assumptions: ['螺杆大径按M12取12，眼环中心至杆端长度按55建立', '眼环内外径、颈部长度和螺距未标，按主视图比例估算；螺纹仅用环纹作视觉表达'],
    },
    primitives: [
      { type: 'torus', radius: 10, tube: 4, position: [-27.5, 0, 0] },
      { type: 'cylinder', radius: 8, length: 9, axis: 'x', position: [-14.5, 0, 0] },
      { type: 'cylinder', radius: 6, length: 45, axis: 'x', position: [5, 0, 0] },
      { type: 'torus', radius: 6, tube: 0.45, position: [-5, 0, 0], rotation: [0, 1.5708, 0], material: 'darkMetal' },
      { type: 'torus', radius: 6, tube: 0.45, position: [0, 0, 0], rotation: [0, 1.5708, 0], material: 'darkMetal' },
      { type: 'torus', radius: 6, tube: 0.45, position: [5, 0, 0], rotation: [0, 1.5708, 0], material: 'darkMetal' },
      { type: 'torus', radius: 6, tube: 0.45, position: [10, 0, 0], rotation: [0, 1.5708, 0], material: 'darkMetal' },
      { type: 'torus', radius: 6, tube: 0.45, position: [15, 0, 0], rotation: [0, 1.5708, 0], material: 'darkMetal' },
      { type: 'torus', radius: 6, tube: 0.45, position: [20, 0, 0], rotation: [0, 1.5708, 0], material: 'darkMetal' },
      { type: 'torus', radius: 6, tube: 0.45, position: [25, 0, 0], rotation: [0, 1.5708, 0], material: 'darkMetal' },
    ],
  },

  'ZFA211A-0201A': {
    level: '轮廓级',
    material: 'metal',
    source: {
      page: 10,
      dimensions: ['φ130×24.5'],
      views: ['正视图', '侧视图'],
      assumptions: ['最大外径130和总厚24.5按厂家标注', '中央盘直径、双侧凸缘厚度及四处径向缺口的深度和角度未标，按两视图比例估算'],
    },
    primitives: [
      { type: 'cylinder', radius: 52, length: 24.5, axis: 'z' },
      {
        type: 'extrude',
        points: [[65, 0], [60.1, 24.9], [39.6, 39.6], [24.9, 60.1], [0, 65], [-24.9, 60.1], [-39.6, 39.6], [-60.1, 24.9], [-65, 0], [-60.1, -24.9], [-39.6, -39.6], [-24.9, -60.1], [0, -65], [24.9, -60.1], [39.6, -39.6], [60.1, -24.9]],
        depth: 3.25,
        position: [0, 0, -12.25],
        holes: [{ kind: 'circle', center: [0, 0], radius: 52 }],
        bevel: 1,
      },
      {
        type: 'extrude',
        points: [[65, 0], [60.1, 24.9], [39.6, 39.6], [24.9, 60.1], [0, 65], [-24.9, 60.1], [-39.6, 39.6], [-60.1, 24.9], [-65, 0], [-60.1, -24.9], [-39.6, -39.6], [-24.9, -60.1], [0, -65], [24.9, -60.1], [39.6, -39.6], [60.1, -24.9]],
        depth: 3.25,
        position: [0, 0, 9],
        holes: [{ kind: 'circle', center: [0, 0], radius: 52 }],
        bevel: 1,
      },
      { type: 'torus', radius: 52, tube: 1.1, position: [0, 0, 12.25], material: 'darkMetal' },
      { type: 'torus', radius: 52, tube: 1.1, position: [0, 0, -12.25], material: 'darkMetal' },
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
      { type: 'torus', radius: 29, tube: 1, position: [0, 0, -1], material: 'darkMetal' },
      { type: 'cylinder', radius: 3.8, length: 60, axis: 'z', position: [29, 0, 0], material: 'darkMetal' },
      { type: 'cylinder', radius: 7, length: 4, axis: 'z', position: [29, 0, 29], material: 'darkMetal' },
      { type: 'cylinder', radius: 3.8, length: 60, axis: 'z', position: [14.5, 25.115, 0], material: 'darkMetal' },
      { type: 'cylinder', radius: 7, length: 4, axis: 'z', position: [14.5, 25.115, 29], material: 'darkMetal' },
      { type: 'cylinder', radius: 3.8, length: 60, axis: 'z', position: [-14.5, 25.115, 0], material: 'darkMetal' },
      { type: 'cylinder', radius: 7, length: 4, axis: 'z', position: [-14.5, 25.115, 29], material: 'darkMetal' },
      { type: 'cylinder', radius: 3.8, length: 60, axis: 'z', position: [-29, 0, 0], material: 'darkMetal' },
      { type: 'cylinder', radius: 7, length: 4, axis: 'z', position: [-29, 0, 29], material: 'darkMetal' },
      { type: 'cylinder', radius: 3.8, length: 60, axis: 'z', position: [-14.5, -25.115, 0], material: 'darkMetal' },
      { type: 'cylinder', radius: 7, length: 4, axis: 'z', position: [-14.5, -25.115, 29], material: 'darkMetal' },
      { type: 'cylinder', radius: 3.8, length: 60, axis: 'z', position: [14.5, -25.115, 0], material: 'darkMetal' },
      { type: 'cylinder', radius: 7, length: 4, axis: 'z', position: [14.5, -25.115, 29], material: 'darkMetal' },
    ],
  },
};
