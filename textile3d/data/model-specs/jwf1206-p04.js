// JWF1206 原PDF第4页：按厂家原格中的视图、轮廓和明示尺寸建立。
// 所有坐标单位均为毫米，X=宽、Y=高、Z=深；未标尺寸只作为视觉估算写入 assumptions。
export const jwf1206P04ModelSpecs = {
  'JWF1206-0100-1': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 4,
      dimensions: ['X=785', 'Z=147', '下折边Y=55'],
      views: ['正视图', '侧视剖面'],
      assumptions: ['板厚未标，按4估算', '侧视中的竖向加强边高度未标，按45估算；螺栓和小孔未建模'],
    },
    primitives: [
      { type: 'box', size: [785, 4, 147], position: [0, 0, 0] },
      { type: 'box', size: [785, 55, 4], position: [0, -27.5, 71.5] },
      { type: 'box', size: [785, 45, 4], position: [0, 22.5, 57] },
      { type: 'box', size: [785, 4, 18], position: [0, 45, 50] },
    ],
  },

  'JWF1206-0100-2': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 4,
      dimensions: ['X=2490', 'Z=147', '下折边Y=55'],
      views: ['正视图', '侧视剖面'],
      assumptions: ['板厚未标，按4估算', '侧视中的竖向加强边高度未标，按45估算；螺栓和小孔未建模'],
    },
    primitives: [
      { type: 'box', size: [2490, 4, 147], position: [0, 0, 0] },
      { type: 'box', size: [2490, 55, 4], position: [0, -27.5, 71.5] },
      { type: 'box', size: [2490, 45, 4], position: [0, 22.5, 57] },
      { type: 'box', size: [2490, 4, 18], position: [0, 45, 50] },
    ],
  },

  'JWF1206-0100-3': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 4,
      dimensions: ['X=2490', 'Z=337', '下折边Y=55'],
      views: ['俯视图', '侧视剖面'],
      assumptions: ['板厚未标，按4估算', '侧视中的竖向加强边高度未标，按45估算；螺栓和小孔未建模'],
    },
    primitives: [
      { type: 'box', size: [2490, 4, 337], position: [0, 0, 0] },
      { type: 'box', size: [2490, 55, 4], position: [0, -27.5, -166.5] },
      { type: 'box', size: [2490, 45, 4], position: [0, 22.5, -152] },
      { type: 'box', size: [2490, 4, 18], position: [0, 45, -145] },
    ],
  },

  'JWF1206-0100-4': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 4,
      dimensions: ['X=785', 'Z=337', '下折边Y=55'],
      views: ['俯视图', '侧视剖面'],
      assumptions: ['板厚未标，按4估算', '侧视中的竖向加强边高度未标，按45估算；螺栓和小孔未建模'],
    },
    primitives: [
      { type: 'box', size: [785, 4, 337], position: [0, 0, 0] },
      { type: 'box', size: [785, 55, 4], position: [0, -27.5, -166.5] },
      { type: 'box', size: [785, 45, 4], position: [0, 22.5, -152] },
      { type: 'box', size: [785, 4, 18], position: [0, 45, -145] },
    ],
  },

  'JWF1206-0100-5': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 4,
      dimensions: ['X=378', 'Y=1032', 'Z=153'],
      views: ['正视图', '侧视图', '俯视/底视截面'],
      assumptions: ['板厚未标，按4估算', '中下部竖向加强件和短支架的尺寸、离边位置按三视图比例估算'],
    },
    primitives: [
      { type: 'box', size: [378, 1032, 4], position: [0, 0, 74.5] },
      { type: 'box', size: [378, 4, 153], position: [0, -514, 0] },
      { type: 'box', size: [378, 4, 42], position: [0, 514, 55.5] },
      { type: 'box', size: [4, 1032, 153], position: [187, 0, 0] },
      { type: 'box', size: [46, 430, 18], position: [50, -180, 61], material: 'darkMetal' },
      { type: 'box', size: [82, 34, 24], position: [105, -175, 54], material: 'darkMetal' },
    ],
  },

  'JWF1206-0100-7': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 4,
      dimensions: ['X=880', 'Y=2040'],
      views: ['正视图'],
      assumptions: ['本格未标厚度/背面，门体深度按30估算', '观察窗、百叶孔、铰链加强条的位置和大小按正视图比例估算'],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-440, -1020], [440, -1020], [440, 1020], [-440, 1020]],
        depth: 30,
        position: [0, 0, -15],
        bevel: 2,
        holes: [
          { kind: 'polygon', points: [[-35, 180], [5, 140], [205, 140], [245, 180], [245, 560], [205, 600], [5, 600], [-35, 560]] },
          { kind: 'polygon', points: [[-365, -770], [-75, -770], [-75, -740], [-365, -740]] },
          { kind: 'polygon', points: [[-365, -700], [-75, -700], [-75, -670], [-365, -670]] },
          { kind: 'polygon', points: [[-365, -630], [-75, -630], [-75, -600], [-365, -600]] },
          { kind: 'polygon', points: [[-365, -560], [-75, -560], [-75, -530], [-365, -530]] },
          { kind: 'polygon', points: [[-365, -490], [-75, -490], [-75, -460], [-365, -460]] },
          { kind: 'polygon', points: [[-365, -420], [-75, -420], [-75, -390], [-365, -390]] },
          { kind: 'polygon', points: [[-365, -350], [-75, -350], [-75, -320], [-365, -320]] },
          { kind: 'polygon', points: [[-365, -280], [-75, -280], [-75, -250], [-365, -250]] },
        ],
      },
      { type: 'box', size: [68, 1990, 14], position: [402, 0, 18], material: 'darkMetal' },
      { type: 'cylinder', radius: 18, length: 12, axis: 'z', position: [-330, 80, 21], material: 'darkMetal' },
    ],
  },

  'JWF1206-0100-8': {
    level: '尺寸级',
    material: 'paintedMetal',
    source: {
      page: 4,
      dimensions: ['X=1078', 'Y=75', 'Z=35'],
      views: ['正视图', '截面图'],
      assumptions: ['截面总体尺寸和卷边方向取自原图；板厚未标，按3估算', '截面内侧卷边圆角以直折边近似'],
    },
    primitives: [
      { type: 'box', size: [1078, 75, 3], position: [0, 0, 16] },
      { type: 'box', size: [1078, 3, 35], position: [0, 36, 0] },
      { type: 'box', size: [1078, 3, 35], position: [0, -36, 0] },
      { type: 'box', size: [1078, 18, 3], position: [0, 27, -16] },
      { type: 'box', size: [1078, 18, 3], position: [0, -27, -16] },
    ],
  },

  'JWF1206-0100-9': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 4,
      dimensions: ['X=703', 'Y=2040'],
      views: ['正视图'],
      assumptions: ['本格未标厚度/背面，门体深度按30估算', '中部观察窗及上下两段加强/铰链框的尺寸与位置按正视图比例估算'],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-351.5, -1020], [351.5, -1020], [351.5, 1020], [-351.5, 1020]],
        depth: 30,
        position: [0, 0, -15],
        bevel: 2,
        holes: [
          { kind: 'polygon', points: [[-245, -10], [-225, -30], [20, -30], [40, -10], [40, 160], [20, 180], [-225, 180], [-245, 160]] },
        ],
      },
      { type: 'box', size: [78, 610, 14], position: [-285, 610, 18], material: 'darkMetal' },
      { type: 'box', size: [78, 690, 14], position: [-285, -620, 18], material: 'darkMetal' },
      { type: 'box', size: [14, 1300, 20], position: [-325, -5, 16], material: 'darkMetal' },
    ],
  },

  'JWF1206-0100-10': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 4,
      dimensions: ['Y=2040'],
      views: ['正视图', '俯视边线'],
      assumptions: ['本格只标高度；宽度按同页对称件JWF1206-0100-9估算为703，深度按30估算', '右侧加强/铰链框及中部方形组件尺寸按正视图比例估算'],
    },
    primitives: [
      { type: 'box', size: [703, 2040, 30], position: [0, 0, 0] },
      { type: 'box', size: [70, 1980, 14], position: [310, 0, 22], material: 'darkMetal' },
      { type: 'box', size: [145, 145, 42], position: [-20, 300, 28], material: 'darkMetal' },
      { type: 'cylinder', radius: 48, length: 18, axis: 'z', position: [-20, 300, 58], material: 'metal' },
    ],
  },

  'JWF1206-0100-11': {
    level: '尺寸级',
    material: 'paintedMetal',
    source: {
      page: 4,
      dimensions: ['X=890', 'Y=1930', 'Z=51.5'],
      views: ['正视图', '侧视/顶视边线'],
      assumptions: ['外廓三向尺寸均按原图；板厚未标，按4估算', '两条纵向加强筋的宽度、长度和凸出高度按正视图比例估算'],
    },
    primitives: [
      { type: 'box', size: [890, 1930, 4], position: [0, 0, 23.75] },
      { type: 'box', size: [4, 1930, 51.5], position: [-443, 0, 0] },
      { type: 'box', size: [4, 1930, 51.5], position: [443, 0, 0] },
      { type: 'box', size: [890, 4, 51.5], position: [0, -963, 0] },
      { type: 'box', size: [890, 4, 51.5], position: [0, 963, 0] },
      { type: 'box', size: [92, 1500, 20], position: [-190, 0, 12], material: 'darkMetal' },
      { type: 'box', size: [92, 1500, 20], position: [190, 0, 12], material: 'darkMetal' },
      { type: 'box', size: [890, 8, 12], position: [0, 0, 16], material: 'darkMetal' },
    ],
  },

  'JWF1206-0100-12': {
    level: '尺寸级',
    material: 'paintedMetal',
    source: {
      page: 4,
      dimensions: ['X=1509', 'Y=75', 'Z=35'],
      views: ['正视图', '截面图'],
      assumptions: ['截面总体尺寸和卷边方向取自原图；板厚未标，按3估算', '截面内侧卷边圆角以直折边近似'],
    },
    primitives: [
      { type: 'box', size: [1509, 75, 3], position: [0, 0, 16] },
      { type: 'box', size: [1509, 3, 35], position: [0, 36, 0] },
      { type: 'box', size: [1509, 3, 35], position: [0, -36, 0] },
      { type: 'box', size: [1509, 18, 3], position: [0, 27, -16] },
      { type: 'box', size: [1509, 18, 3], position: [0, -27, -16] },
    ],
  },

  'JWF1206-0100-14': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 4,
      dimensions: ['X=880', 'Y=2040'],
      views: ['正视图'],
      assumptions: ['本格未标厚度/背面，门体深度按30估算', '观察窗、百叶孔、左侧加强/铰链框的位置和大小按正视图比例估算'],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-440, -1020], [440, -1020], [440, 1020], [-440, 1020]],
        depth: 30,
        position: [0, 0, -15],
        bevel: 2,
        holes: [
          { kind: 'polygon', points: [[-150, 170], [-110, 130], [90, 130], [130, 170], [130, 550], [90, 590], [-110, 590], [-150, 550]] },
          { kind: 'polygon', points: [[-30, -760], [300, -760], [300, -730], [-30, -730]] },
          { kind: 'polygon', points: [[-30, -690], [300, -690], [300, -660], [-30, -660]] },
          { kind: 'polygon', points: [[-30, -620], [300, -620], [300, -590], [-30, -590]] },
          { kind: 'polygon', points: [[-30, -550], [300, -550], [300, -520], [-30, -520]] },
          { kind: 'polygon', points: [[-30, -480], [300, -480], [300, -450], [-30, -450]] },
          { kind: 'polygon', points: [[-30, -410], [300, -410], [300, -380], [-30, -380]] },
          { kind: 'polygon', points: [[-30, -340], [300, -340], [300, -310], [-30, -310]] },
          { kind: 'polygon', points: [[-30, -270], [300, -270], [300, -240], [-30, -240]] },
        ],
      },
      { type: 'box', size: [68, 1990, 14], position: [-402, 0, 18], material: 'darkMetal' },
      { type: 'cylinder', radius: 18, length: 12, axis: 'z', position: [330, 80, 21], material: 'darkMetal' },
    ],
  },

  'JWF1206-0100-15': {
    level: '尺寸级',
    material: 'paintedMetal',
    source: {
      page: 4,
      dimensions: ['X=75', 'Y=1205', 'Z=147.5'],
      views: ['正视图', '截面/侧视图'],
      assumptions: ['长度及外截面尺寸按原图；板厚未标，按4估算为空心折弯柱', '斜边端部小圆角以直线轮廓近似，安装孔未建模'],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-37.5, -73.75], [37.5, -73.75], [27, 73.75], [-37.5, 73.75]],
        depth: 1205,
        holes: [
          { kind: 'polygon', points: [[-33.5, -69.75], [33.5, -69.75], [23, 69.75], [-33.5, 69.75]] },
        ],
        position: [0, 602.5, 0],
        rotation: [-1.570796, 0, 0],
        bevel: 1,
      },
    ],
  },

  'JWF1204-0100-2': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 4,
      dimensions: ['X=672', 'Y=1144', 'Z=30'],
      views: ['正视图', '侧视图'],
      assumptions: ['总体宽高厚按原图；斜顶右端高度未标，按正视图比例估算', '斜孔和纵向格栅的位置、尺寸按图面比例估算'],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-336, -572], [336, -572], [336, 350], [-336, 572]],
        depth: 30,
        position: [0, 0, -15],
        bevel: 2,
        holes: [
          { kind: 'polygon', points: [[-245, 310], [-220, 285], [-140, 365], [-125, 410], [-150, 430], [-250, 345]] },
        ],
      },
      { type: 'box', size: [30, 1080, 30], position: [-321, -18, 0], material: 'darkMetal' },
      { type: 'box', size: [8, 650, 12], position: [170, -130, 22], material: 'darkMetal' },
      { type: 'box', size: [8, 650, 12], position: [205, -130, 22], material: 'darkMetal' },
      { type: 'box', size: [8, 650, 12], position: [240, -130, 22], material: 'darkMetal' },
      { type: 'box', size: [8, 650, 12], position: [275, -130, 22], material: 'darkMetal' },
      { type: 'box', size: [8, 650, 12], position: [310, -130, 22], material: 'darkMetal' },
    ],
  },

  'JWF1204-0100-3A': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 4,
      dimensions: ['X=470', 'Y=2040', 'Z=30'],
      views: ['正视图', '侧视图'],
      assumptions: ['总体宽高厚按原图；斜顶起止点未标，按正视图比例估算', '观察窗、斜孔及纵向加强框的位置和尺寸按图面比例估算'],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-235, -1020], [235, -1020], [235, 500], [-120, 1020], [-235, 1020]],
        depth: 30,
        position: [0, 0, -15],
        bevel: 2,
        holes: [
          { kind: 'polygon', points: [[-185, 350], [-160, 325], [130, 325], [155, 350], [155, 500], [130, 525], [-160, 525], [-185, 500]] },
          { kind: 'polygon', points: [[30, 35], [55, 15], [145, 105], [150, 150], [125, 165], [20, 65]] },
        ],
      },
      { type: 'box', size: [135, 1010, 14], position: [-125, -485, 18], material: 'darkMetal' },
      { type: 'box', size: [10, 980, 20], position: [-180, -485, 17], material: 'darkMetal' },
      { type: 'box', size: [10, 980, 20], position: [-70, -485, 17], material: 'darkMetal' },
    ],
  },
};
