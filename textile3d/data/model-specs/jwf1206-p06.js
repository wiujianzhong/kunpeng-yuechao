// JWF1206 原PDF第6页：逐格依据厂家原图的视图、轮廓和明示尺寸建立。
// 坐标单位为毫米，X=宽、Y=高、Z=深；图纸未标尺寸只作视觉估算并写入 assumptions。
export const jwf1206P06ModelSpecs = {
  'JWF1202-0100-3': {
    level: '尺寸级',
    material: 'paintedMetal',
    source: {
      page: 6,
      dimensions: ['X=140', 'Y=150', 'Z=147.5'],
      views: ['正视图', '侧视图'],
      assumptions: ['三向外廓尺寸取自原图', '板厚、顶托深度及孔径未标，分别按4、58和12估算；折弯圆角以直角近似'],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-35, -75], [35, -75], [35, 75], [-35, 75]],
        depth: 4,
        position: [0, 0, -73.75],
        bevel: 1,
        holes: [
          { kind: 'circle', center: [0, -48], radius: 6 },
          { kind: 'circle', center: [0, 28], radius: 6 },
        ],
      },
      { type: 'box', size: [70, 4, 147.5], position: [0, -73, 0] },
      { type: 'box', size: [4, 150, 60], position: [33, 0, -43.75] },
      { type: 'box', size: [140, 4, 58], position: [0, 73, -44.75] },
      { type: 'box', size: [56, 16, 4], position: [-41, 62, -16], material: 'darkMetal' },
      { type: 'box', size: [56, 16, 4], position: [41, 62, -16], material: 'darkMetal' },
    ],
  },

  'JWF1202-0100-11': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 6,
      dimensions: ['X=912', 'Y=830'],
      views: ['正视图'],
      assumptions: ['门体背面和厚度未给出，按28估算', '三条百叶孔、顶部提手和右侧铰链框的位置按正视图比例估算'],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-456, -415], [456, -415], [456, 415], [-456, 415]],
        depth: 28,
        position: [0, 0, -14],
        bevel: 2,
        holes: [
          { kind: 'polygon', points: [[-405, -165], [-105, -165], [-105, -143], [-405, -143]] },
          { kind: 'polygon', points: [[-405, -113], [-105, -113], [-105, -91], [-405, -91]] },
          { kind: 'polygon', points: [[-405, -61], [-105, -61], [-105, -39], [-405, -39]] },
        ],
      },
      { type: 'box', size: [74, 810, 14], position: [405, 0, 21], material: 'darkMetal' },
      { type: 'box', size: [300, 20, 24], position: [-140, 396, 16], material: 'darkMetal' },
      { type: 'cylinder', radius: 7, length: 70, axis: 'y', position: [449, 265, 24], material: 'metal' },
      { type: 'cylinder', radius: 7, length: 70, axis: 'y', position: [449, 0, 24], material: 'metal' },
      { type: 'cylinder', radius: 7, length: 70, axis: 'y', position: [449, -265, 24], material: 'metal' },
    ],
  },

  'JWF1202-0100-12': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 6,
      dimensions: ['X=912', 'Y=830'],
      views: ['正视图'],
      assumptions: ['门体背面和厚度未给出，按28估算', '三条百叶孔、顶部提手和左侧铰链框的位置按正视图比例估算；与右门不是简单复制，已按图镜向布置'],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-456, -415], [456, -415], [456, 415], [-456, 415]],
        depth: 28,
        position: [0, 0, -14],
        bevel: 2,
        holes: [
          { kind: 'polygon', points: [[105, -165], [405, -165], [405, -143], [105, -143]] },
          { kind: 'polygon', points: [[105, -113], [405, -113], [405, -91], [105, -91]] },
          { kind: 'polygon', points: [[105, -61], [405, -61], [405, -39], [105, -39]] },
          { kind: 'circle', center: [405, -360], radius: 7 },
        ],
      },
      { type: 'box', size: [74, 810, 14], position: [-405, 0, 21], material: 'darkMetal' },
      { type: 'box', size: [300, 20, 24], position: [140, 396, 16], material: 'darkMetal' },
      { type: 'cylinder', radius: 7, length: 70, axis: 'y', position: [-449, 265, 24], material: 'metal' },
      { type: 'cylinder', radius: 7, length: 70, axis: 'y', position: [-449, 0, 24], material: 'metal' },
      { type: 'cylinder', radius: 7, length: 70, axis: 'y', position: [-449, -265, 24], material: 'metal' },
    ],
  },

  'FA225-0100-1': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 6,
      dimensions: ['X=2490', 'Y=55'],
      views: ['正视图', '端面图'],
      assumptions: ['本格未标槽宽，按同页左后线槽FA225-0100-3的66估算', '板厚按3估算；端面图显示的中间隔板、双侧翻边已建模，紧固孔位置只按正视图比例表达'],
    },
    primitives: [
      { type: 'box', size: [2490, 3, 66], position: [0, -26, 0] },
      { type: 'box', size: [2490, 55, 3], position: [0, 0, -31.5] },
      { type: 'box', size: [2490, 55, 3], position: [0, 0, 31.5] },
      { type: 'box', size: [2490, 43, 3], position: [0, -5, 0] },
      { type: 'box', size: [2490, 3, 16], position: [0, 26, -24] },
      { type: 'box', size: [2490, 3, 16], position: [0, 26, 24] },
      { type: 'box', size: [1790, 5, 12], position: [-310, 22, -10], material: 'darkMetal' },
      { type: 'box', size: [285, 5, 12], position: [1090, 22, -10], material: 'darkMetal' },
    ],
  },

  'FA225-0100-2': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 6,
      dimensions: ['X=624', 'Y=55'],
      views: ['正视图', '端面图'],
      assumptions: ['本格未标槽宽，按同页左前线槽FA225-0100-4的66估算', '板厚按3估算；端面图的中间隔板、双侧翻边和正视图两段安装条已建模'],
    },
    primitives: [
      { type: 'box', size: [624, 3, 66], position: [0, -26, 0] },
      { type: 'box', size: [624, 55, 3], position: [0, 0, -31.5] },
      { type: 'box', size: [624, 55, 3], position: [0, 0, 31.5] },
      { type: 'box', size: [624, 43, 3], position: [0, -5, 0] },
      { type: 'box', size: [624, 3, 16], position: [0, 26, -24] },
      { type: 'box', size: [624, 3, 16], position: [0, 26, 24] },
      { type: 'box', size: [205, 5, 14], position: [-192, 22, -10], material: 'darkMetal' },
      { type: 'box', size: [205, 5, 14], position: [192, 22, -10], material: 'darkMetal' },
      { type: 'cylinder', radius: 4, length: 5, axis: 'y', position: [-220, 27, 0], material: 'metal' },
      { type: 'cylinder', radius: 4, length: 5, axis: 'y', position: [0, 27, 0], material: 'metal' },
      { type: 'cylinder', radius: 4, length: 5, axis: 'y', position: [220, 27, 0], material: 'metal' },
    ],
  },

  'FA225-0100-3': {
    level: '尺寸级',
    material: 'paintedMetal',
    source: {
      page: 6,
      dimensions: ['X=2490', 'Y=55', 'Z=66'],
      views: ['正视图', '端面图'],
      assumptions: ['三向外廓尺寸取自原图', '板厚按3估算；端面折弯圆角以直角近似，紧固孔未标定位尺寸故未逐孔建模'],
    },
    primitives: [
      { type: 'box', size: [2490, 3, 66], position: [0, -26, 0] },
      { type: 'box', size: [2490, 55, 3], position: [0, 0, -31.5] },
      { type: 'box', size: [2490, 55, 3], position: [0, 0, 31.5] },
      { type: 'box', size: [2490, 3, 18], position: [0, 26, 24] },
      { type: 'box', size: [2490, 5, 8], position: [0, 22, 8], material: 'darkMetal' },
    ],
  },

  'FA225-0100-4': {
    level: '尺寸级',
    material: 'paintedMetal',
    source: {
      page: 6,
      dimensions: ['X=624', 'Y=55', 'Z=66'],
      views: ['正视图', '端面图'],
      assumptions: ['三向外廓尺寸取自原图', '板厚按3估算；端面折弯圆角以直角近似，三个紧固点只按正视图比例表达'],
    },
    primitives: [
      { type: 'box', size: [624, 3, 66], position: [0, -26, 0] },
      { type: 'box', size: [624, 55, 3], position: [0, 0, -31.5] },
      { type: 'box', size: [624, 55, 3], position: [0, 0, 31.5] },
      { type: 'box', size: [624, 3, 18], position: [0, 26, 24] },
      { type: 'cylinder', radius: 4, length: 5, axis: 'y', position: [-250, 27, 8], material: 'metal' },
      { type: 'cylinder', radius: 4, length: 5, axis: 'y', position: [-120, 27, 8], material: 'metal' },
      { type: 'cylinder', radius: 4, length: 5, axis: 'y', position: [250, 27, 8], material: 'metal' },
    ],
  },

  'FA225-0100-36': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 6,
      dimensions: ['X=1051'],
      views: ['开启状态侧视图', '正视/端视图'],
      assumptions: ['本格只给总宽1051；罩板深度、开启角度、支臂和气弹簧长度均按两视图比例估算', '该零件为铰接罩总成，已按图建立罩板、横向铰轴、双侧支臂、气弹簧和安装梁，不作为工程装配尺寸'],
    },
    primitives: [
      { type: 'box', size: [1051, 18, 480], position: [0, 125, -65], rotation: [-0.72, 0, 0] },
      { type: 'box', size: [1051, 62, 18], position: [0, 270, -232], rotation: [-0.72, 0, 0] },
      { type: 'box', size: [1051, 36, 68], position: [0, -162, 82], material: 'darkMetal' },
      { type: 'cylinder', radius: 22, length: 1051, axis: 'x', position: [0, -128, 142], material: 'metal' },
      { type: 'box', size: [22, 28, 410], position: [-480, 5, 52], rotation: [0.88, 0, 0], material: 'darkMetal' },
      { type: 'box', size: [22, 28, 410], position: [480, 5, 52], rotation: [0.88, 0, 0], material: 'darkMetal' },
      { type: 'cylinder', radius: 9, length: 310, axis: 'z', position: [-485, 75, -5], rotation: [-0.68, 0, 0], material: 'metal' },
      { type: 'cylinder', radius: 9, length: 310, axis: 'z', position: [485, 75, -5], rotation: [-0.68, 0, 0], material: 'metal' },
      { type: 'cylinder', radius: 28, length: 28, axis: 'x', position: [-488, -128, 142], material: 'darkMetal' },
      { type: 'cylinder', radius: 28, length: 28, axis: 'x', position: [488, -128, 142], material: 'darkMetal' },
    ],
  },

  'JWF1206-0101': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 6,
      dimensions: ['X=974', 'Y=160'],
      views: ['展开平面图'],
      assumptions: ['图纸未标板厚，按3估算', '中部避让缺口和五个安装孔的位置、孔径按展开图比例估算'],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-487, -80], [487, -80], [487, 80], [60, 80], [60, 66], [45, 58], [-15, 58], [-30, 66], [-30, 80], [-487, 80]],
        depth: 3,
        position: [0, 0, -1.5],
        bevel: 1,
        holes: [
          { kind: 'circle', center: [-440, -70], radius: 4 },
          { kind: 'circle', center: [-225, -70], radius: 7 },
          { kind: 'circle', center: [45, -70], radius: 4 },
          { kind: 'circle', center: [150, -70], radius: 7 },
          { kind: 'circle', center: [355, -70], radius: 4 },
        ],
      },
    ],
  },

  'JWF1206-0102': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 6,
      dimensions: ['X=993', 'Y=160'],
      views: ['展开平面图'],
      assumptions: ['图纸未标板厚，按3估算', '上边两个避让缺口、下边小凸耳和安装孔的位置按展开图比例估算'],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-496.5, -80], [-360, -80], [-360, -58], [-328, -58], [-328, -80], [496.5, -80], [496.5, 60], [456, 60], [456, 80], [110, 80], [110, 64], [94, 56], [42, 56], [26, 64], [26, 80], [-496.5, 80]],
        depth: 3,
        position: [0, 0, -1.5],
        bevel: 1,
        holes: [
          { kind: 'circle', center: [-445, -69], radius: 7 },
          { kind: 'circle', center: [-365, -69], radius: 6 },
          { kind: 'circle', center: [-40, -69], radius: 7 },
          { kind: 'circle', center: [365, -69], radius: 4 },
        ],
      },
    ],
  },

  'JWF1206-0103': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 6,
      dimensions: ['X=1212', 'Y=160'],
      views: ['展开平面图'],
      assumptions: ['图纸未标板厚，按3估算', '右上方两处避让缺口及安装孔位置按展开图比例估算'],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-606, -80], [606, -80], [606, 58], [526, 58], [526, 80], [458, 80], [458, 61], [442, 54], [410, 54], [394, 61], [394, 80], [-606, 80]],
        depth: 3,
        position: [0, 0, -1.5],
        bevel: 1,
        holes: [
          { kind: 'circle', center: [-540, -69], radius: 4 },
          { kind: 'circle', center: [-350, -69], radius: 7 },
          { kind: 'circle', center: [-225, -69], radius: 4 },
          { kind: 'circle', center: [108, -69], radius: 7 },
          { kind: 'circle', center: [335, -69], radius: 7 },
          { kind: 'circle', center: [455, -69], radius: 4 },
        ],
      },
    ],
  },

  'JWF1206-0104': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 6,
      dimensions: ['X=1213', 'Y=95'],
      views: ['展开平面图'],
      assumptions: ['图纸未标板厚，按3估算', '左下角避让台阶和六个安装孔的位置、孔径按展开图比例估算'],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-606.5, -47.5], [606.5, -47.5], [606.5, 47.5], [-606.5, 47.5], [-606.5, -15], [-585, -15], [-575, -30], [-606.5, -30]],
        depth: 3,
        position: [0, 0, -1.5],
        bevel: 1,
        holes: [
          { kind: 'circle', center: [-550, -36], radius: 6 },
          { kind: 'circle', center: [-355, -36], radius: 4 },
          { kind: 'circle', center: [-230, -36], radius: 7 },
          { kind: 'circle', center: [100, -36], radius: 4 },
          { kind: 'circle', center: [325, -36], radius: 7 },
          { kind: 'circle', center: [450, -36], radius: 7 },
        ],
      },
    ],
  },

  'JWF1206-0105': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 6,
      dimensions: ['X=993', 'Y=95'],
      views: ['展开平面图'],
      assumptions: ['图纸未标板厚，按3估算', '下边小避让缺口和四个安装孔的位置、孔径按展开图比例估算'],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-496.5, -47.5], [-245, -47.5], [-245, -30], [-225, -30], [-225, -47.5], [496.5, -47.5], [496.5, 47.5], [-496.5, 47.5]],
        depth: 3,
        position: [0, 0, -1.5],
        bevel: 1,
        holes: [
          { kind: 'circle', center: [-435, 36], radius: 4 },
          { kind: 'circle', center: [-360, 36], radius: 7 },
          { kind: 'circle', center: [-40, 36], radius: 7 },
          { kind: 'circle', center: [360, 36], radius: 4 },
        ],
      },
    ],
  },

  'JWF1206-0106': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 6,
      dimensions: ['X=974', 'Y=95'],
      views: ['展开平面图'],
      assumptions: ['图纸未标板厚，按3估算', '本格外廓为矩形；五个安装孔的位置、孔径按展开图比例估算'],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-487, -47.5], [487, -47.5], [487, 47.5], [-487, 47.5]],
        depth: 3,
        position: [0, 0, -1.5],
        bevel: 1,
        holes: [
          { kind: 'circle', center: [-440, 36], radius: 7 },
          { kind: 'circle', center: [-225, 36], radius: 4 },
          { kind: 'circle', center: [40, 36], radius: 7 },
          { kind: 'circle', center: [140, 36], radius: 4 },
          { kind: 'circle', center: [360, 36], radius: 7 },
        ],
      },
    ],
  },
};
