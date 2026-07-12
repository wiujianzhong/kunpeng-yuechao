const roundedRect = (cx, cy, width, height, radius) => [
  [cx - width / 2 + radius, cy - height / 2],
  [cx + width / 2 - radius, cy - height / 2],
  [cx + width / 2, cy - height / 2 + radius],
  [cx + width / 2, cy + height / 2 - radius],
  [cx + width / 2 - radius, cy + height / 2],
  [cx - width / 2 + radius, cy + height / 2],
  [cx - width / 2, cy + height / 2 - radius],
  [cx - width / 2, cy - height / 2 + radius],
];

const circleHole = (x, y, radius) => ({ kind: 'circle', center: [x, y], radius });
const polygonHole = (points) => ({ kind: 'polygon', points });

export const jwf1206P05ModelSpecs = {
  'JWF1204-0100-4': {
    level: '尺寸级',
    material: 'paintedMetal',
    source: {
      page: 5,
      dimensions: ['2055', '225', '120'],
      views: ['正视图', '俯视图'],
      assumptions: [
        '按零件名称与安装方向，将2055作为Y向立柱高度，225作为X向最大宽度，120作为Z向深度。',
        '右端异形安装头的台阶、倒角按正视轮廓比例复原；孔径及孔位未标注，按图面比例估算。',
      ],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-60, -1027.5], [60, -1027.5], [60, 790], [92, 790], [92, 825], [112.5, 825], [112.5, 1027.5], [-72, 1027.5], [-112.5, 990], [-112.5, 842], [-60, 842]],
        depth: 8,
        holes: [circleHole(-18, -720, 7), circleHole(-18, -540, 7), circleHole(-18, 460, 7), circleHole(-18, 640, 7)],
        position: [0, 0, 56],
        rotation: [0, 0, 0],
        bevel: 2,
        material: 'paintedMetal',
      },
      { type: 'box', size: [12, 1830, 120], position: [-54, -112.5, 0], rotation: [0, 0, 0], material: 'paintedMetal' },
      { type: 'box', size: [108, 12, 120], position: [0, -1021.5, 0], rotation: [0, 0, 0], material: 'darkMetal' },
      { type: 'box', size: [205, 12, 120], position: [3, 1021.5, 0], rotation: [0, 0, 0], material: 'darkMetal' },
      { type: 'box', size: [48, 170, 72], position: [80, 870, 0], rotation: [0, 0, 0], material: 'metal' },
    ],
  },

  'JWF1204-0100-5': {
    level: '尺寸级',
    material: 'paintedMetal',
    source: {
      page: 5,
      dimensions: ['2010', '160', '120'],
      views: ['正视图', '俯视图'],
      assumptions: [
        '按中立柱安装方向，将2010作为Y向高度，160为X向宽度，120为Z向深度。',
        '图中纵向拼缝与四个安装孔均保留；孔径和距边尺寸未标注，按图面比例估算。',
      ],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-80, -1005], [80, -1005], [80, 1005], [-80, 1005]],
        depth: 6,
        holes: [circleHole(-48, -680, 6), circleHole(-48, -500, 6), circleHole(48, 500, 6), circleHole(48, 680, 6)],
        position: [0, 0, 57],
        rotation: [0, 0, 0],
        bevel: 1.5,
        material: 'paintedMetal',
      },
      { type: 'box', size: [18, 2010, 120], position: [-71, 0, 0], rotation: [0, 0, 0], material: 'paintedMetal' },
      { type: 'box', size: [18, 2010, 120], position: [71, 0, 0], rotation: [0, 0, 0], material: 'paintedMetal' },
      { type: 'box', size: [34, 520, 10], position: [0, -120, 51], rotation: [0, 0, 0], material: 'metal' },
      { type: 'box', size: [160, 12, 120], position: [0, -999, 0], rotation: [0, 0, 0], material: 'darkMetal' },
      { type: 'box', size: [160, 12, 120], position: [0, 999, 0], rotation: [0, 0, 0], material: 'darkMetal' },
    ],
  },

  'JWF1204-0100-8': {
    level: '尺寸级',
    material: 'paintedMetal',
    source: {
      page: 5,
      dimensions: ['2010', '160', '120'],
      views: ['正视图', '俯视图'],
      assumptions: [
        '按左中立柱安装方向，将2010作为Y向高度，160为X向宽度，120为Z向深度。',
        '该件与右中立柱为镜像关系，但按本格拼缝、孔位方向单独建立。',
      ],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-80, -1005], [80, -1005], [80, 1005], [-80, 1005]],
        depth: 6,
        holes: [circleHole(48, -680, 6), circleHole(48, -500, 6), circleHole(-48, 500, 6), circleHole(-48, 680, 6)],
        position: [0, 0, 57],
        rotation: [0, 0, 0],
        bevel: 1.5,
        material: 'paintedMetal',
      },
      { type: 'box', size: [18, 2010, 120], position: [-71, 0, 0], rotation: [0, 0, 0], material: 'paintedMetal' },
      { type: 'box', size: [18, 2010, 120], position: [71, 0, 0], rotation: [0, 0, 0], material: 'paintedMetal' },
      { type: 'box', size: [34, 520, 10], position: [0, 120, 51], rotation: [0, 0, 0], material: 'metal' },
      { type: 'box', size: [160, 12, 120], position: [0, -999, 0], rotation: [0, 0, 0], material: 'darkMetal' },
      { type: 'box', size: [160, 12, 120], position: [0, 999, 0], rotation: [0, 0, 0], material: 'darkMetal' },
    ],
  },

  'JWF1204-0100-9': {
    level: '尺寸级',
    material: 'paintedMetal',
    source: {
      page: 5,
      dimensions: ['2055', '225', '120'],
      views: ['正视图', '俯视图'],
      assumptions: [
        '按零件名称与安装方向，将2055作为Y向立柱高度，225作为X向最大宽度，120作为Z向深度。',
        '左端异形安装头按右前立柱镜像，并依本格正视轮廓调整台阶方向；未标孔径按图面比例估算。',
      ],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-60, -1027.5], [60, -1027.5], [60, 842], [112.5, 842], [112.5, 990], [72, 1027.5], [-112.5, 1027.5], [-112.5, 825], [-92, 825], [-92, 790], [-60, 790]],
        depth: 8,
        holes: [circleHole(18, -720, 7), circleHole(18, -540, 7), circleHole(18, 460, 7), circleHole(18, 640, 7)],
        position: [0, 0, 56],
        rotation: [0, 0, 0],
        bevel: 2,
        material: 'paintedMetal',
      },
      { type: 'box', size: [12, 1830, 120], position: [54, -112.5, 0], rotation: [0, 0, 0], material: 'paintedMetal' },
      { type: 'box', size: [108, 12, 120], position: [0, -1021.5, 0], rotation: [0, 0, 0], material: 'darkMetal' },
      { type: 'box', size: [205, 12, 120], position: [-3, 1021.5, 0], rotation: [0, 0, 0], material: 'darkMetal' },
      { type: 'box', size: [48, 170, 72], position: [-80, 870, 0], rotation: [0, 0, 0], material: 'metal' },
    ],
  },

  'JWF1204-0100-10': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 5,
      dimensions: ['1930'],
      views: ['正视图', '侧视图'],
      assumptions: [
        '厂家本格只明确标注X向总宽1930；Y向总高约520、Z向总深约120按两视图比例及已获认可的现有模型轮廓估算。',
        '正面圆角长孔、上部斜顶、左右侧折边及上下加强边均按原格轮廓建立；孔宽、高及圆角半径未标注。',
        '板厚统一按4毫米表达，仅用于视觉建模，不作为加工尺寸。',
      ],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-965, -205], [965, -205], [965, 205], [-965, 205]],
        depth: 4,
        holes: [polygonHole(roundedRect(0, -45, 650, 115, 28))],
        position: [0, -45, 58],
        rotation: [0, 0, 0],
        bevel: 1.5,
        material: 'paintedMetal',
      },
      { type: 'box', size: [1930, 6, 152], position: [0, 217, -1], rotation: [-0.53, 0, 0], material: 'paintedMetal' },
      { type: 'box', size: [1930, 24, 8], position: [0, 248, -54], rotation: [0, 0, 0], material: 'darkMetal' },
      { type: 'box', size: [1930, 18, 12], position: [0, 153, 57], rotation: [0, 0, 0], material: 'metal' },
      { type: 'box', size: [1930, 18, 12], position: [0, -241, 57], rotation: [0, 0, 0], material: 'metal' },
      { type: 'box', size: [18, 410, 18], position: [-956, -45, 50], rotation: [0, 0, 0], material: 'darkMetal' },
      { type: 'box', size: [18, 410, 18], position: [956, -45, 50], rotation: [0, 0, 0], material: 'darkMetal' },
      { type: 'box', size: [28, 110, 26], position: [-972, -55, 47], rotation: [0, 0, 0], material: 'metal' },
      { type: 'box', size: [28, 110, 26], position: [972, -55, 47], rotation: [0, 0, 0], material: 'metal' },
      { type: 'box', size: [630, 100, 5], position: [0, -90, 54], rotation: [0, 0, 0], material: 'darkMetal' },
    ],
  },

  'JWF1204-0100-11': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 5,
      dimensions: ['1930'],
      views: ['正视图', '端视图', '侧视图'],
      assumptions: [
        '1930为X向总宽；端视轮廓所示的约430深、160高均按图面比例估算，厂家未在本格标注。',
        '主体为长条折弯罩，保留前端方形折边、斜面和两侧回边；板厚按4毫米表达。',
      ],
    },
    primitives: [
      { type: 'box', size: [1930, 6, 390], position: [0, 33, -10], rotation: [-0.22, 0, 0], material: 'paintedMetal' },
      { type: 'box', size: [1930, 74, 6], position: [0, -50, 174], rotation: [0, 0, 0], material: 'paintedMetal' },
      { type: 'box', size: [1930, 46, 6], position: [0, 100, -198], rotation: [0, 0, 0], material: 'metal' },
      { type: 'box', size: [1930, 18, 24], position: [0, -78, 175], rotation: [0, 0, 0], material: 'darkMetal' },
      { type: 'box', size: [18, 148, 430], position: [-956, 12, 0], rotation: [0, 0, 0], material: 'metal' },
      { type: 'box', size: [18, 148, 430], position: [956, 12, 0], rotation: [0, 0, 0], material: 'metal' },
    ],
  },

  'JWF1204-0100-12': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 5,
      dimensions: ['1148.1', '503'],
      views: ['正视图', '侧视图', '俯视图'],
      assumptions: [
        '503作为X向宽度、1148.1作为Y向高度；Z向主体深度约90按侧视比例估算。',
        '上部向后伸出的斜罩深度约300、斜角约15度，均为比例估算；正面小方孔未标注尺寸。',
      ],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-251.5, -574.05], [251.5, -574.05], [251.5, 500], [210, 574.05], [-251.5, 574.05]],
        depth: 8,
        holes: [polygonHole([[-62, 40], [62, 40], [62, 135], [-62, 135]])],
        position: [0, 0, 41],
        rotation: [0, 0, 0],
        bevel: 2,
        material: 'paintedMetal',
      },
      { type: 'box', size: [503, 8, 305], position: [0, 535, -105], rotation: [-0.26, 0, 0], material: 'paintedMetal' },
      { type: 'box', size: [503, 30, 10], position: [0, 448, 44], rotation: [0, 0, 0], material: 'metal' },
      { type: 'box', size: [503, 32, 18], position: [0, -528, 38], rotation: [0, 0, 0], material: 'darkMetal' },
      { type: 'box', size: [18, 1040, 90], position: [-242.5, -20, 0], rotation: [0, 0, 0], material: 'metal' },
      { type: 'box', size: [18, 1040, 90], position: [242.5, -20, 0], rotation: [0, 0, 0], material: 'metal' },
      { type: 'box', size: [118, 88, 6], position: [0, 87, 43], rotation: [0, 0, 0], material: 'darkMetal' },
    ],
  },

  'JWF1204-0100-13': {
    level: '尺寸级',
    material: 'paintedMetal',
    source: {
      page: 5,
      dimensions: ['1144', '672', '30'],
      views: ['正视图', '侧视图'],
      assumptions: [
        '672为X向宽度、1144为Y向最大高度、30为Z向厚度。',
        '左上斜边高度、通风格栅开口及加强边尺寸未标注，按正视比例估算；外包络三尺寸保持厂家标注。',
      ],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-336, -572], [336, -572], [336, 572], [55, 572], [-336, 390]],
        depth: 30,
        holes: [polygonHole([[-310, -485], [-165, -485], [-165, 300], [-310, 300]])],
        position: [0, 0, -15],
        rotation: [0, 0, 0],
        bevel: 2,
        material: 'paintedMetal',
      },
      { type: 'box', size: [137, 775, 8], position: [-237.5, -92.5, -16], rotation: [0, 0, 0], material: 'darkMetal' },
      { type: 'box', size: [12, 775, 36], position: [-307, -92.5, 0], rotation: [0, 0, 0], material: 'metal' },
      { type: 'box', size: [12, 775, 36], position: [-272, -92.5, 0], rotation: [0, 0, 0], material: 'metal' },
      { type: 'box', size: [12, 775, 36], position: [-237, -92.5, 0], rotation: [0, 0, 0], material: 'metal' },
      { type: 'box', size: [12, 775, 36], position: [-202, -92.5, 0], rotation: [0, 0, 0], material: 'metal' },
      { type: 'box', size: [26, 1080, 36], position: [310, -8, 0], rotation: [0, 0, 0], material: 'darkMetal' },
      { type: 'box', size: [672, 24, 36], position: [0, -560, 0], rotation: [0, 0, 0], material: 'darkMetal' },
    ],
  },

  'JWF1204-0100-14A': {
    level: '尺寸级',
    material: 'paintedMetal',
    source: {
      page: 5,
      dimensions: ['2040', '470', '30'],
      views: ['正视图', '侧视图'],
      assumptions: [
        '470为X向宽度、2040为Y向最大高度、30为Z向厚度。',
        '左上切角、圆角观察窗、斜向把手孔和右侧长格栅按正视比例建立；格栅及孔位无独立标注。',
      ],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-235, -1020], [235, -1020], [235, 1020], [120, 1020], [-235, 720]],
        depth: 30,
        holes: [
          polygonHole(roundedRect(-22, 520, 330, 230, 32)),
          polygonHole([[-170, 190], [-105, 260], [5, 145], [-60, 75]]),
          polygonHole([[70, -980], [205, -980], [205, 160], [70, 160]]),
        ],
        position: [0, 0, -15],
        rotation: [0, 0, 0],
        bevel: 2,
        material: 'paintedMetal',
      },
      { type: 'box', size: [322, 222, 6], position: [-22, 520, -16], rotation: [0, 0, 0], material: 'glass' },
      { type: 'box', size: [125, 1125, 6], position: [137.5, -410, -16], rotation: [0, 0, 0], material: 'darkMetal' },
      { type: 'box', size: [12, 1125, 36], position: [85, -410, 0], rotation: [0, 0, 0], material: 'metal' },
      { type: 'box', size: [12, 1125, 36], position: [120, -410, 0], rotation: [0, 0, 0], material: 'metal' },
      { type: 'box', size: [12, 1125, 36], position: [155, -410, 0], rotation: [0, 0, 0], material: 'metal' },
      { type: 'box', size: [12, 1125, 36], position: [190, -410, 0], rotation: [0, 0, 0], material: 'metal' },
      { type: 'box', size: [96, 30, 20], position: [-82, 170, 0], rotation: [0, 0, -0.80], material: 'darkMetal' },
    ],
  },

  'JWF1204-0100-15': {
    level: '尺寸级',
    material: 'paintedMetal',
    source: {
      page: 5,
      dimensions: ['2040', '880', '30'],
      views: ['正视图', '侧视图'],
      assumptions: [
        '880为X向宽度、2040为Y向高度、30为Z向厚度。',
        '左侧长格栅、圆角观察窗及斜向把手孔均依正视图比例复原，厂家本格未标各开口尺寸。',
      ],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-440, -1020], [440, -1020], [440, 1020], [-440, 1020]],
        depth: 30,
        holes: [
          polygonHole([[-410, -960], [-270, -960], [-270, 985], [-410, 985]]),
          polygonHole(roundedRect(-80, 460, 235, 400, 34)),
          polygonHole([[95, 240], [155, 300], [285, 165], [225, 105]]),
        ],
        position: [0, 0, -15],
        rotation: [0, 0, 0],
        bevel: 2,
        material: 'paintedMetal',
      },
      { type: 'box', size: [227, 392, 6], position: [-80, 460, -16], rotation: [0, 0, 0], material: 'glass' },
      { type: 'box', size: [130, 1935, 6], position: [-340, 12.5, -16], rotation: [0, 0, 0], material: 'darkMetal' },
      { type: 'box', size: [12, 1935, 36], position: [-400, 12.5, 0], rotation: [0, 0, 0], material: 'metal' },
      { type: 'box', size: [12, 1935, 36], position: [-365, 12.5, 0], rotation: [0, 0, 0], material: 'metal' },
      { type: 'box', size: [12, 1935, 36], position: [-330, 12.5, 0], rotation: [0, 0, 0], material: 'metal' },
      { type: 'box', size: [12, 1935, 36], position: [-295, 12.5, 0], rotation: [0, 0, 0], material: 'metal' },
      { type: 'box', size: [122, 30, 20], position: [190, 205, 0], rotation: [0, 0, -0.80], material: 'darkMetal' },
    ],
  },

  'JWF1204-0100-29': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 5,
      dimensions: ['1930'],
      views: ['正视图', '侧视图'],
      assumptions: [
        '1930为X向总宽；Z向门板展开深度约515、Y向斜起高度约280按侧视比例估算。',
        '两端三角加强板、后部铰轴耳和前缘折边均按侧视轮廓复原；孔径、板厚未标注。',
      ],
    },
    primitives: [
      { type: 'box', size: [1930, 8, 530], position: [0, 15, -8], rotation: [-0.47, 0, 0], material: 'paintedMetal' },
      { type: 'box', size: [1930, 24, 12], position: [0, -102, 235], rotation: [0, 0, 0], material: 'darkMetal' },
      { type: 'box', size: [1930, 32, 14], position: [0, 135, -245], rotation: [0, 0, 0], material: 'metal' },
      { type: 'box', size: [1530, 20, 12], position: [0, -72, 218], rotation: [0, 0, 0], material: 'metal' },
      {
        type: 'extrude',
        points: [[-250, -115], [235, -115], [235, 135], [85, 135], [-250, -35]],
        depth: 26,
        holes: [circleHole(125, 35, 24)],
        position: [-940, 0, 0],
        rotation: [0, 1.5708, 0],
        bevel: 2,
        material: 'darkMetal',
      },
      {
        type: 'extrude',
        points: [[-250, -115], [235, -115], [235, 135], [85, 135], [-250, -35]],
        depth: 26,
        holes: [circleHole(125, 35, 24)],
        position: [914, 0, 0],
        rotation: [0, 1.5708, 0],
        bevel: 2,
        material: 'darkMetal',
      },
      { type: 'cylinder', radius: 22, length: 1880, axis: 'x', position: [0, 112, -220], rotation: [0, 0, 0], material: 'metal' },
    ],
  },

  'DK760-0100-56': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 5,
      dimensions: ['375', '398'],
      views: ['侧视图', '正视图', '俯视图'],
      assumptions: [
        '375作为X向宽度、398作为Z向深度；斜面高差约90按侧视比例估算。',
        '中央圆形提手、前后折边和两侧板按三视轮廓复原；提手直径及板厚未标注。',
      ],
    },
    primitives: [
      { type: 'box', size: [375, 8, 408], position: [0, 5, 0], rotation: [-0.23, 0, 0], material: 'paintedMetal' },
      { type: 'box', size: [375, 90, 8], position: [0, 0, 195], rotation: [0, 0, 0], material: 'paintedMetal' },
      { type: 'box', size: [375, 24, 16], position: [0, -42, -196], rotation: [0, 0, 0], material: 'darkMetal' },
      { type: 'box', size: [12, 90, 398], position: [-181.5, 0, 0], rotation: [0, 0, 0], material: 'metal' },
      { type: 'box', size: [12, 90, 398], position: [181.5, 0, 0], rotation: [0, 0, 0], material: 'metal' },
      { type: 'cylinder', radius: 28, length: 42, axis: 'y', position: [0, 46, 40], rotation: [0, 0, 0], material: 'darkMetal' },
      { type: 'torus', radius: 28, tube: 5, position: [0, 68, 40], rotation: [1.5708, 0, 0], material: 'metal' },
    ],
  },

  'ZFA211A-0100-5A': {
    level: '尺寸级',
    material: 'rubber',
    source: {
      page: 5,
      dimensions: ['41', '18', 'Φ26'],
      views: ['剖视图'],
      assumptions: [
        '外径26、橡胶支撑体高度18、总高41取厂家标注；中央螺柱与内部槽宽未单独标注。',
        '剖面交叉线区域判定为橡胶减振支撑体，上部螺柱及压板判定为金属。',
      ],
    },
    primitives: [
      { type: 'cylinder', radius: 13, length: 6, axis: 'y', position: [0, 3, 0], rotation: [0, 0, 0], material: 'rubber' },
      { type: 'torus', radius: 8, tube: 5, position: [0, 10.5, 0], rotation: [1.5708, 0, 0], material: 'rubber' },
      { type: 'cylinder', radius: 13, length: 3, axis: 'y', position: [0, 19.5, 0], rotation: [0, 0, 0], material: 'metal' },
      { type: 'cylinder', radius: 3.2, length: 23, axis: 'y', position: [0, 29.5, 0], rotation: [0, 0, 0], material: 'metal' },
      { type: 'cylinder', radiusTop: 4.2, radiusBottom: 3.2, length: 3, axis: 'y', position: [0, 40.5, 0], rotation: [0, 0, 0], material: 'metal' },
      { type: 'box', size: [16, 3, 7], position: [0, 11, 0], rotation: [0, 0, 0], material: 'darkMetal' },
    ],
  },

  'JWF1202-0100-1': {
    level: '尺寸级',
    material: 'paintedMetal',
    source: {
      page: 5,
      dimensions: ['986', '51.5', '1930'],
      views: ['侧视图', '正视图'],
      assumptions: [
        '按正视图建立X向宽986、Y向高度1930，并以侧视标注51.5作为Z向总深。',
        '面板纵向加强筋、两组内侧折边、三道横撑及下部方形开口按正视图比例建立；各筋宽和开口尺寸未标注。',
      ],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-493, -965], [493, -965], [493, 965], [-493, 965]],
        depth: 6,
        holes: [polygonHole([[-125, -900], [125, -900], [125, -620], [-125, -620]])],
        position: [0, 0, 22.75],
        rotation: [0, 0, 0],
        bevel: 1.5,
        material: 'paintedMetal',
      },
      { type: 'box', size: [22, 1930, 51.5], position: [-482, 0, 0], rotation: [0, 0, 0], material: 'darkMetal' },
      { type: 'box', size: [22, 1930, 51.5], position: [482, 0, 0], rotation: [0, 0, 0], material: 'darkMetal' },
      { type: 'box', size: [18, 1530, 51.5], position: [-350, 160, 0], rotation: [0, 0, 0], material: 'metal' },
      { type: 'box', size: [18, 1530, 51.5], position: [-210, 160, 0], rotation: [0, 0, 0], material: 'metal' },
      { type: 'box', size: [18, 1530, 51.5], position: [210, 160, 0], rotation: [0, 0, 0], material: 'metal' },
      { type: 'box', size: [18, 1530, 51.5], position: [350, 160, 0], rotation: [0, 0, 0], material: 'metal' },
      { type: 'box', size: [16, 1640, 32], position: [-105, 120, 8], rotation: [0, 0, 0], material: 'metal' },
      { type: 'box', size: [16, 1640, 32], position: [105, 120, 8], rotation: [0, 0, 0], material: 'metal' },
      { type: 'box', size: [960, 22, 51.5], position: [0, -485, 0], rotation: [0, 0, 0], material: 'darkMetal' },
      { type: 'box', size: [960, 22, 51.5], position: [0, -555, 0], rotation: [0, 0, 0], material: 'darkMetal' },
      { type: 'box', size: [960, 22, 51.5], position: [0, -625, 0], rotation: [0, 0, 0], material: 'darkMetal' },
      { type: 'box', size: [238, 268, 6], position: [0, -760, 20], rotation: [0, 0, 0], material: 'darkMetal' },
    ],
  },
};
