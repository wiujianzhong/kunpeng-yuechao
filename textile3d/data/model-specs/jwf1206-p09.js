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
      { type: 'torus', radius: 5.45, tube: 0.45, position: [-123, 0, 0], rotation: [0, 1.5708, 0], material: 'darkMetal' },
      { type: 'torus', radius: 5.45, tube: 0.45, position: [-103, 0, 0], rotation: [0, 1.5708, 0], material: 'darkMetal' },
      { type: 'torus', radius: 5.45, tube: 0.45, position: [-83, 0, 0], rotation: [0, 1.5708, 0], material: 'darkMetal' },
      { type: 'torus', radius: 5.45, tube: 0.45, position: [-63, 0, 0], rotation: [0, 1.5708, 0], material: 'darkMetal' },
      { type: 'torus', radius: 5.45, tube: 0.45, position: [-43, 0, 0], rotation: [0, 1.5708, 0], material: 'darkMetal' },
      { type: 'torus', radius: 5.45, tube: 0.45, position: [-23, 0, 0], rotation: [0, 1.5708, 0], material: 'darkMetal' },
      { type: 'torus', radius: 5.45, tube: 0.45, position: [-3, 0, 0], rotation: [0, 1.5708, 0], material: 'darkMetal' },
      { type: 'torus', radius: 5.45, tube: 0.45, position: [17, 0, 0], rotation: [0, 1.5708, 0], material: 'darkMetal' },
      { type: 'torus', radius: 5.45, tube: 0.45, position: [37, 0, 0], rotation: [0, 1.5708, 0], material: 'darkMetal' },
      { type: 'torus', radius: 5.45, tube: 0.45, position: [57, 0, 0], rotation: [0, 1.5708, 0], material: 'darkMetal' },
      { type: 'torus', radius: 5.45, tube: 0.45, position: [77, 0, 0], rotation: [0, 1.5708, 0], material: 'darkMetal' },
      { type: 'torus', radius: 5.45, tube: 0.45, position: [97, 0, 0], rotation: [0, 1.5708, 0], material: 'darkMetal' },
      { type: 'torus', radius: 5.45, tube: 0.45, position: [117, 0, 0], rotation: [0, 1.5708, 0], material: 'darkMetal' },
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
        points: [[-150, -220], [150, -220], [150, 220], [-150, 220], [-150, -150], [-180, -150], [-180, -198], [-160, -198], [-150, -220]],
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
          { kind: 'circle', center: [0, 0], radius: 11 },
          { kind: 'circle', center: [-58, 15], radius: 5 },
          { kind: 'circle', center: [58, 15], radius: 5 },
          { kind: 'circle', center: [58, -15], radius: 5 },
          { kind: 'circle', center: [-15, 0], radius: 4 },
        ],
      },
      { type: 'torus', radius: 18, tube: 3, position: [0, 0, 12.5], material: 'metal' },
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
        holes: [{ kind: 'circle', center: [0, 0], radius: 4 }],
      },
      { type: 'torus', radius: 5.5, tube: 1, position: [0, 0, 5], material: 'darkMetal' },
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
        points: [[20, -41], [66.5, -41], [67.5, 0], [66.5, 41], [57.5, 35], [57.5, 20], [35, 20], [35, 41], [20, 41], [20, -41]],
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
      dimensions: ['φ590', 'Z=80'],
      views: ['正视图', '轴向剖视图'],
      assumptions: ['外径和总宽取自厂家标注', '中心孔、轮毂、轮缘厚度、五根渐宽轮辐及五个减重开口按两视图比例估算'],
    },
    primitives: [
      {
        type: 'lathe',
        points: [[270, -40], [295, -40], [295, 40], [270, 40], [270, -40]],
        rotation: [1.5708, 0, 0],
        material: 'darkMetal',
      },
      {
        type: 'lathe',
        points: [[25, -40], [48, -40], [48, 40], [25, 40], [25, -40]],
        rotation: [1.5708, 0, 0],
      },
      { type: 'extrude', points: [[45, -24], [270, -38], [270, 38], [45, 24]], depth: 22, bevel: 2 },
      { type: 'extrude', points: [[45, -24], [270, -38], [270, 38], [45, 24]], depth: 22, bevel: 2, rotation: [0, 0, 1.2566] },
      { type: 'extrude', points: [[45, -24], [270, -38], [270, 38], [45, 24]], depth: 22, bevel: 2, rotation: [0, 0, 2.5133] },
      { type: 'extrude', points: [[45, -24], [270, -38], [270, 38], [45, 24]], depth: 22, bevel: 2, rotation: [0, 0, 3.7699] },
      { type: 'extrude', points: [[45, -24], [270, -38], [270, 38], [45, 24]], depth: 22, bevel: 2, rotation: [0, 0, 5.0265] },
      { type: 'torus', radius: 282.5, tube: 4, position: [0, 0, 40], material: 'darkMetal' },
      { type: 'torus', radius: 282.5, tube: 4, position: [0, 0, -40], material: 'darkMetal' },
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
      { type: 'torus', radius: 51.5, tube: 2.5, position: [0, 0, -38], material: 'darkMetal' },
    ],
  },

  'ZFA211-0203~0205': {
    level: '尺寸级',
    material: 'metal',
    source: {
      page: 9,
      dimensions: ['X=35', 'Y=25', 'Z=2/3/8'],
      views: ['正视图', '厚度表'],
      assumptions: ['厂家在同一格列出0203、0204、0205三种厚度', '原图未标孔径，3D中暂按约φ8呈现', '3D预览将三种明确厚度的平衡块并排展示'],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-17.5, -12.5], [17.5, -12.5], [17.5, 12.5], [-17.5, 12.5]],
        depth: 2,
        position: [-45, 0, 0],
        bevel: 0.5,
        holes: [{ kind: 'circle', center: [0, 0], radius: 4 }],
      },
      {
        type: 'extrude',
        points: [[-17.5, -12.5], [17.5, -12.5], [17.5, 12.5], [-17.5, 12.5]],
        depth: 3,
        position: [0, 0, 0],
        bevel: 0.5,
        holes: [{ kind: 'circle', center: [0, 0], radius: 4 }],
      },
      {
        type: 'extrude',
        points: [[-17.5, -12.5], [17.5, -12.5], [17.5, 12.5], [-17.5, 12.5]],
        depth: 8,
        position: [45, 0, 0],
        bevel: 0.5,
        holes: [{ kind: 'circle', center: [0, 0], radius: 4 }],
      },
    ],
  },
};
