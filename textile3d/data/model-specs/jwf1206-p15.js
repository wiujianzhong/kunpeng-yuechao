// JWF1206 原PDF第15页：逐格依据600dpi厂家原图的轮廓、剖面和明示尺寸建立。
// 坐标单位为毫米，X=宽、Y=高、Z=深；未标尺寸只作视觉估算并写入 assumptions。
export const jwf1206P15ModelSpecs = {
  'FA221D-1135': {
    level: '尺寸级',
    material: 'metal',
    source: {
      page: 15,
      dimensions: ['外径φ50', 'Z=3'],
      views: ['正视图', '侧视图'],
      assumptions: ['外径和厚度取自厂家标注', '中心孔直径未标，按正视图比例估算为25'],
    },
    primitives: [
      {
        type: 'lathe',
        points: [[12.5, -1.5], [25, -1.5], [25, 1.5], [12.5, 1.5], [12.5, -1.5]],
        rotation: [1.5708, 0, 0],
      },
    ],
  },

  'FA221D-1147': {
    level: '尺寸级',
    material: 'plastic',
    source: {
      page: 15,
      dimensions: ['外径φ84', '内径φ80', 'Z=42'],
      views: ['轴向剖视图'],
      assumptions: ['内外径及长度均取自厂家标注', '厂家名称明确为绝缘套，按工程塑料而非金属材质建立'],
    },
    primitives: [
      {
        type: 'lathe',
        points: [[40, -21], [42, -21], [42, 21], [40, 21], [40, -21]],
        rotation: [1.5708, 0, 0],
      },
    ],
  },

  'FA225-1109': {
    level: '轮廓级',
    material: 'rubber',
    source: {
      page: 15,
      dimensions: ['φ6', '展开长度=1500'],
      views: ['长度示意图'],
      assumptions: ['直径和展开长度取自厂家标注', '厂家未规定安装后的空间走向；3D预览按约1500展开长度布置成柔和S形，不把软管建成刚性金属杆'],
    },
    primitives: [
      {
        type: 'tube',
        points: [[-690, -40, 0], [-470, 70, 25], [-210, 105, 65], [40, 35, 20], [285, -80, -45], [510, -95, -20], [690, 20, 0]],
        radius: 3,
        segments: 128,
        radialSegments: 18,
      },
    ],
  },

  'FA225-1115': {
    level: '尺寸级',
    material: 'metal',
    source: {
      page: 15,
      dimensions: ['φ20', 'X=936'],
      views: ['轴向主视图'],
      assumptions: ['最大外径和轴向总长取自厂家标注', '两端收径、锥肩及端螺纹长度按主视图比例估算'],
    },
    primitives: [
      {
        type: 'lathe',
        points: [[0, -468], [6, -468], [6, -438], [8, -438], [10, -420], [10, 420], [8, 438], [6, 438], [6, 468], [0, 468], [0, -468]],
        rotation: [0, 0, -1.5708],
      },
      { type: 'torus', radius: 6.4, tube: 0.45, position: [-455, 0, 0], rotation: [0, 1.5708, 0], material: 'darkMetal' },
      { type: 'torus', radius: 6.4, tube: 0.45, position: [-448, 0, 0], rotation: [0, 1.5708, 0], material: 'darkMetal' },
      { type: 'torus', radius: 6.4, tube: 0.45, position: [448, 0, 0], rotation: [0, 1.5708, 0], material: 'darkMetal' },
      { type: 'torus', radius: 6.4, tube: 0.45, position: [455, 0, 0], rotation: [0, 1.5708, 0], material: 'darkMetal' },
    ],
  },

  'FA225-1116': {
    level: '尺寸级',
    material: 'darkMetal',
    source: {
      page: 15,
      dimensions: ['外径φ20', 'Z=18'],
      views: ['轴向剖视图'],
      assumptions: ['17Z来自厂家零件名称，不冒充图形区尺寸；外径和齿宽取自厂家标注', '中心孔、齿根圆、齿高和端面沉孔按剖视比例估算；17个轮齿逐齿表达'],
    },
    primitives: [
      {
        type: 'lathe',
        points: [[3, -9], [7.8, -9], [7.8, 9], [3, 9], [3, -9]],
        rotation: [1.5708, 0, 0],
        material: 'metal',
      },
      ...Array.from({length: 17}, (_, index) => {
        const angle = index * Math.PI * 2 / 17;
        return {
          type: 'box',
          size: [4, 2.3, 18],
          position: [Math.cos(angle) * 8, Math.sin(angle) * 8, 0],
          rotation: [0, 0, angle],
        };
      }),
    ],
  },

  'FA225-1117': {
    level: '尺寸级',
    material: 'metal',
    source: {
      page: 15,
      dimensions: ['M12', 'X=1039'],
      views: ['轴向主视图'],
      assumptions: ['螺纹规格和总长取自厂家标注', '右部两段轴肩、挡圈槽和端部螺纹的分段长度与直径按主视图比例估算'],
    },
    primitives: [
      {
        type: 'lathe',
        points: [[0, -519.5], [6, -519.5], [6, 240], [7.5, 240], [7.5, 285], [9, 285], [9, 312], [7.5, 312], [7.5, 345], [6, 345], [6, 519.5], [0, 519.5], [0, -519.5]],
        rotation: [0, 0, -1.5708],
      },
      { type: 'torus', radius: 6.3, tube: 0.45, position: [-506, 0, 0], rotation: [0, 1.5708, 0], material: 'darkMetal' },
      { type: 'torus', radius: 6.3, tube: 0.45, position: [-498, 0, 0], rotation: [0, 1.5708, 0], material: 'darkMetal' },
      { type: 'torus', radius: 7.7, tube: 0.7, position: [274, 0, 0], rotation: [0, 1.5708, 0], material: 'darkMetal' },
      { type: 'torus', radius: 7.7, tube: 0.7, position: [332, 0, 0], rotation: [0, 1.5708, 0], material: 'darkMetal' },
    ],
  },

  'FA225-1118': {
    level: '轮廓级',
    material: 'metal',
    source: {
      page: 15,
      dimensions: ['X=70', 'Y=10'],
      views: ['平面图'],
      assumptions: ['长度和宽度取自厂家标注', '厚度未标，按4估算；原图四个圆形特征按压铆/定位凸点表达，不臆造为贯通大孔'],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-35, -3], [-33, -5], [33, -5], [35, -3], [35, 3], [33, 5], [-33, 5], [-35, 3]],
        depth: 4,
        bevel: 0.8,
      },
      { type: 'cylinder', radius: 3.2, length: 1.5, axis: 'z', position: [-30, 0, 2.75], material: 'darkMetal' },
      { type: 'cylinder', radius: 2.4, length: 1.5, axis: 'z', position: [-10, 0, 2.75], material: 'darkMetal' },
      { type: 'cylinder', radius: 2.4, length: 1.5, axis: 'z', position: [15, 0, 2.75], material: 'darkMetal' },
      { type: 'cylinder', radius: 3.2, length: 1.5, axis: 'z', position: [30, 0, 2.75], material: 'darkMetal' },
    ],
  },

  'FA225-1119': {
    level: '轮廓级',
    material: 'metal',
    source: {
      page: 15,
      dimensions: ['X=35', 'Y=10'],
      views: ['平面图'],
      assumptions: ['外廓长度和宽度取自厂家标注', '套厚未标，按5估算；内外长圆轮廓按图面比例建立'],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-17.5, -2], [-16.5, -5], [16.5, -5], [17.5, -2], [17.5, 2], [16.5, 5], [-16.5, 5], [-17.5, 2]],
        depth: 5,
        bevel: 1,
        holes: [
          { kind: 'polygon', points: [[-13.5, -1.5], [-12.5, -3], [12.5, -3], [13.5, -1.5], [13.5, 1.5], [12.5, 3], [-12.5, 3], [-13.5, 1.5]] },
        ],
      },
    ],
  },

  'FA225-1120': {
    level: '轮廓级',
    material: 'metal',
    source: {
      page: 15,
      dimensions: ['Y=60', '上段X=35', '下段X=14'],
      views: ['平面图'],
      assumptions: ['总高、上段宽和下段宽取自厂家标注', '板厚与两个安装孔孔径未标，按2.5和6估算；斜边和窄柄按厂家轮廓建立'],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-17.5, 30], [17.5, 30], [7, 0], [7, -30], [-7, -30], [-7, 0]],
        depth: 2.5,
        bevel: 0.6,
        holes: [
          { kind: 'circle', center: [0, -8], radius: 3 },
          { kind: 'circle', center: [0, -24], radius: 3 },
        ],
      },
    ],
  },

  'FA225-1127': {
    level: '尺寸级',
    material: 'metal',
    source: {
      page: 15,
      dimensions: ['φ48', 'Z=5'],
      views: ['侧视图'],
      assumptions: ['直径和厚度取自厂家标注', '原图未画中心孔，按实体圆挡片建立'],
    },
    primitives: [
      { type: 'cylinder', radius: 24, length: 5, axis: 'z' },
    ],
  },

  'FA225-1130': {
    level: '尺寸级',
    material: 'darkMetal',
    source: {
      page: 15,
      dimensions: ['外径φ142.6', 'Z=32'],
      views: ['轴向剖视图'],
      assumptions: ['56Z来自厂家零件名称，不冒充图形区尺寸；外径和总宽取自厂家标注', '中心孔、齿根圆及齿槽宽按剖视比例估算；56个同步齿逐齿表达，不用光圆柱代替'],
    },
    primitives: [
      {
        type: 'lathe',
        points: [[22, -16], [68, -16], [68, 16], [22, 16], [22, -16]],
        rotation: [1.5708, 0, 0],
        material: 'metal',
      },
      ...Array.from({length: 56}, (_, index) => {
        const angle = index * Math.PI * 2 / 56;
        return {
          type: 'box',
          size: [6.6, 3.8, 32],
          position: [Math.cos(angle) * 68, Math.sin(angle) * 68, 0],
          rotation: [0, 0, angle],
        };
      }),
    ],
  },

  'FA225-1141': {
    level: '轮廓级',
    material: 'metal',
    source: {
      page: 15,
      dimensions: ['X=15', 'Y=37'],
      views: ['正视图'],
      assumptions: ['牌宽和牌高取自厂家标注', '板厚未标，按1.5估算；40、50、60、70四道刻线以凸起暗纹表达，数字不作为几何加工特征'],
    },
    primitives: [
      { type: 'box', size: [15, 37, 1.5], position: [0, 0, 0] },
      { type: 'box', size: [11, 0.7, 0.5], position: [0, 13, 1], material: 'darkMetal' },
      { type: 'box', size: [11, 0.7, 0.5], position: [0, 4.5, 1], material: 'darkMetal' },
      { type: 'box', size: [11, 0.7, 0.5], position: [0, -4.5, 1], material: 'darkMetal' },
      { type: 'box', size: [11, 0.7, 0.5], position: [0, -13, 1], material: 'darkMetal' },
    ],
  },

  'FA225-11120': {
    level: '尺寸级',
    material: 'rubber',
    source: {
      page: 15,
      dimensions: ['外径φ112', 'Z=3'],
      views: ['侧视图'],
      assumptions: ['外径和厚度取自厂家标注', '原图未标内孔，按薄片圆形密封垫建立；材质按密封件语境使用橡胶，禁止金属化'],
    },
    primitives: [
      { type: 'cylinder', radius: 56, length: 3, axis: 'z' },
    ],
  },

  'TZH1091-12X17': {
    level: '尺寸级',
    material: 'brass',
    source: {
      page: 15,
      dimensions: ['最大外径φ55', 'Z=26'],
      views: ['轴向剖视图'],
      assumptions: ['最大外径和总长取自厂家标注', '内孔、细筒外径、肩部长度和过渡斜面按剖视及件号12X17估算；按轴衬语境采用铜合金'],
    },
    primitives: [
      {
        type: 'lathe',
        points: [[6, -13], [17, -13], [17, 4], [27.5, 6], [27.5, 13], [6, 13], [6, -13]],
        rotation: [1.5708, 0, 0],
      },
    ],
  },

  'TZH1076': {
    level: '轮廓级',
    material: 'rubber',
    source: {
      page: 15,
      dimensions: ['槽口X=8'],
      views: ['截面图'],
      assumptions: ['槽口宽8取自厂家标注', '其余截面高度、双唇厚度和倒钩尺寸按截面比例估算；厂家用量92dm不是单件几何尺寸', '3D仅显示80长样段，便于看清M形双唇截面；材质按柔性密封条使用橡胶，禁止金属化'],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-8, -8], [-8, 5], [-6.5, 8], [-3.5, 8], [-1.5, 6], [0, 2], [1.5, 6], [3.5, 8], [6.5, 7.5], [8, 5], [8, -5], [6, -8], [3.5, -8], [1.5, -5], [0, -1], [-1.5, -5], [-3.5, -8], [-6, -8]],
        depth: 80,
        bevel: 0.8,
        holes: [
          { kind: 'polygon', points: [[-5.5, -4], [-5.5, 4], [-4.3, 5.5], [-3, 5.5], [-2, 4], [-2.8, 0], [-3.8, -4]] },
          { kind: 'polygon', points: [[2.2, -3.5], [2, 4], [3.2, 5.5], [5, 5], [5.8, 3], [5.5, -3.5], [4.2, -5]] },
        ],
      },
    ],
  },
};
