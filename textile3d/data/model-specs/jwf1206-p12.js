// JWF1206 原PDF第12页：逐格依据600dpi厂家原图的视图、剖面和明示尺寸建立。
// 坐标单位为毫米，X=宽、Y=高、Z=深；未标尺寸仅作视觉估算并写入 assumptions。
export const jwf1206P12ModelSpecs = {
  'JWF1206-1100-1': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 12,
      dimensions: ['下部X=260', '上部斜边=275'],
      views: ['左墙板主视图'],
      assumptions: ['总高和板厚未标，按图面比例估算为739和12', '两个圆孔、下部圆角矩形检修口、小安装孔及左侧附件位置按原格比例估算'],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-130, -350], [130, -350], [130, -75], [110, -75], [110, 300], [-130, 389]],
        depth: 12,
        bevel: 2,
        holes: [
          { kind: 'circle', center: [18, 238], radius: 35 },
          { kind: 'circle', center: [-32, 70], radius: 40 },
          { kind: 'polygon', points: [[-88, -245], [-78, -255], [78, -255], [88, -245], [88, -175], [78, -165], [-78, -165], [-88, -175]] },
          { kind: 'circle', center: [88, 258], radius: 6 },
          { kind: 'circle', center: [82, 145], radius: 6 },
          { kind: 'circle', center: [82, 118], radius: 6 },
          { kind: 'circle', center: [100, 40], radius: 5 },
        ],
      },
      { type: 'box', size: [58, 82, 26], position: [-90, 40, 12], material: 'darkMetal' },
      { type: 'cylinder', radius: 7, length: 24, axis: 'z', position: [-103, 42, 27], material: 'metal' },
    ],
  },

  'JWF1206-1100-2': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 12,
      dimensions: ['下部X=260', '上部斜边=275'],
      views: ['右墙板主视图'],
      assumptions: ['总高和板厚未标，按图面比例估算为739和12', '孔位和右侧附件按右墙板原格独立布置，不把左墙板整体镜像后冒充'],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-130, -350], [130, -350], [130, 389], [-130, 300], [-110, -75], [-130, -75]],
        depth: 12,
        bevel: 2,
        holes: [
          { kind: 'circle', center: [-18, 238], radius: 35 },
          { kind: 'circle', center: [32, 70], radius: 40 },
          { kind: 'polygon', points: [[-88, -245], [-78, -255], [78, -255], [88, -245], [88, -175], [78, -165], [-78, -165], [-88, -175]] },
          { kind: 'circle', center: [-88, 258], radius: 6 },
          { kind: 'circle', center: [-82, 145], radius: 6 },
          { kind: 'circle', center: [-82, 118], radius: 6 },
          { kind: 'circle', center: [-100, 40], radius: 5 },
        ],
      },
      { type: 'box', size: [58, 82, 26], position: [90, 40, 12], material: 'darkMetal' },
      { type: 'cylinder', radius: 7, length: 24, axis: 'z', position: [103, 42, 27], material: 'metal' },
    ],
  },

  'JWF1206-1100-3': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 12,
      dimensions: ['X=95', 'Y=157'],
      views: ['主视图'],
      assumptions: ['折弯深度和板厚未标，按20和5估算', '中部让位口、上下长圆孔、小圆孔及右侧翻边紧固件按主视图比例估算'],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-47.5, -78.5], [47.5, -78.5], [47.5, -50], [23, -50], [23, 50], [47.5, 50], [47.5, 78.5], [-47.5, 78.5], [-47.5, 50], [-26, 50], [-26, -50], [-47.5, -50]],
        depth: 5,
        bevel: 1,
        holes: [
          { kind: 'polygon', points: [[-38, 58], [-31, 64], [-8, 64], [-1, 58], [-8, 52], [-31, 52]] },
          { kind: 'polygon', points: [[5, -59], [12, -53], [35, -53], [42, -59], [35, -65], [12, -65]] },
          { kind: 'circle', center: [27, 58], radius: 5 },
          { kind: 'circle', center: [-34, -59], radius: 5 },
          { kind: 'circle', center: [0, -10], radius: 4 },
        ],
      },
      { type: 'box', size: [5, 157, 20], position: [45, 0, 10], material: 'darkMetal' },
      { type: 'cylinder', radius: 5, length: 14, axis: 'z', position: [45, 58, 20], material: 'metal' },
      { type: 'cylinder', radius: 5, length: 14, axis: 'z', position: [45, -59, 20], material: 'metal' },
    ],
  },

  'JWF1206-1100-4': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 12,
      dimensions: ['X=1016'],
      views: ['正视图', '端面图'],
      assumptions: ['棉道高度、深度及板厚未标，按正视和端面比例估算为210、180和5', '三层导流板、中央加强筋、两侧阶梯耳板和倾斜端面已分别表达'],
    },
    primitives: [
      { type: 'box', size: [1016, 5, 180], position: [0, -72, 0] },
      { type: 'box', size: [1016, 5, 194], position: [0, 2, -8], rotation: [-0.16, 0, 0] },
      { type: 'box', size: [1016, 5, 172], position: [0, 58, -2], rotation: [-0.08, 0, 0] },
      { type: 'box', size: [1016, 5, 88], position: [0, 103, -46] },
      { type: 'box', size: [8, 210, 180], position: [0, 0, 0], material: 'darkMetal' },
      { type: 'box', size: [18, 122, 24], position: [-499, -8, 82], material: 'darkMetal' },
      { type: 'box', size: [18, 122, 24], position: [499, -8, 82], material: 'darkMetal' },
      { type: 'cylinder', radius: 7, length: 18, axis: 'x', position: [-499, 52, 82], material: 'metal' },
      { type: 'cylinder', radius: 7, length: 18, axis: 'x', position: [499, 52, 82], material: 'metal' },
    ],
  },

  'JWF1206-1100-5': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 12,
      dimensions: ['X=939', 'Z=231'],
      views: ['正视图', '端面图'],
      assumptions: ['总高未标，按端面图估算为220；板厚按6估算', '端面圆形风道、外壳斜角、中央锁扣和两端安装边按两视图比例估算'],
    },
    primitives: [
      { type: 'box', size: [939, 8, 231], position: [0, 106, 0] },
      { type: 'box', size: [939, 8, 190], position: [0, -106, 10] },
      { type: 'box', size: [939, 212, 8], position: [0, 0, -111.5] },
      { type: 'box', size: [939, 150, 8], position: [0, -30, 111.5] },
      {
        type: 'lathe',
        points: [[72, -469.5], [88, -469.5], [88, 469.5], [72, 469.5], [72, -469.5]],
        rotation: [0, 0, -1.5708],
        material: 'darkMetal',
      },
      { type: 'box', size: [44, 62, 24], position: [0, 64, 112], material: 'darkMetal' },
      { type: 'cylinder', radius: 9, length: 28, axis: 'z', position: [0, 77, 126], material: 'metal' },
    ],
  },

  'JWF1206-1100-6': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 12,
      dimensions: ['X=1010', 'Y=121'],
      views: ['正视图', '端面图'],
      assumptions: ['前后深度和板厚未标，按34和4估算', '三道横向折边、两端立边、分段加强条和四个紧固点按图面比例估算'],
    },
    primitives: [
      { type: 'box', size: [1010, 121, 4], position: [0, 0, 0] },
      { type: 'box', size: [1010, 7, 30], position: [0, 55, 13], material: 'darkMetal' },
      { type: 'box', size: [1010, 7, 30], position: [0, 0, 13], material: 'darkMetal' },
      { type: 'box', size: [1010, 7, 30], position: [0, -55, 13], material: 'darkMetal' },
      { type: 'box', size: [7, 121, 34], position: [-498, 0, 15], material: 'darkMetal' },
      { type: 'box', size: [7, 121, 34], position: [498, 0, 15], material: 'darkMetal' },
      { type: 'box', size: [6, 121, 26], position: [-360, 0, 12], material: 'darkMetal' },
      { type: 'box', size: [6, 121, 26], position: [310, 0, 12], material: 'darkMetal' },
      { type: 'cylinder', radius: 6, length: 8, axis: 'z', position: [-455, 35, 22], material: 'metal' },
      { type: 'cylinder', radius: 6, length: 8, axis: 'z', position: [-455, -35, 22], material: 'metal' },
      { type: 'cylinder', radius: 6, length: 8, axis: 'z', position: [455, 35, 22], material: 'metal' },
      { type: 'cylinder', radius: 6, length: 8, axis: 'z', position: [455, -35, 22], material: 'metal' },
    ],
  },

  'JWF1206-1100-7': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 12,
      dimensions: ['X=1010'],
      views: ['正视图', '端面图'],
      assumptions: ['给棉板高度、深度和轴径未标，按两视图估算', '五块分段给棉板、顶部压块、上下横轴、底部调节梁及两端异形侧板按原图关系建立'],
    },
    primitives: [
      { type: 'box', size: [1010, 8, 165], position: [0, 20, -10], rotation: [-0.18, 0, 0] },
      { type: 'box', size: [180, 112, 6], position: [-400, 22, 76], rotation: [0.08, 0, 0] },
      { type: 'box', size: [180, 112, 6], position: [-200, 22, 76], rotation: [0.08, 0, 0] },
      { type: 'box', size: [180, 112, 6], position: [0, 22, 76], rotation: [0.08, 0, 0] },
      { type: 'box', size: [180, 112, 6], position: [200, 22, 76], rotation: [0.08, 0, 0] },
      { type: 'box', size: [180, 112, 6], position: [400, 22, 76], rotation: [0.08, 0, 0] },
      { type: 'box', size: [54, 22, 24], position: [-400, 88, 73], material: 'darkMetal' },
      { type: 'box', size: [54, 22, 24], position: [-200, 88, 73], material: 'darkMetal' },
      { type: 'box', size: [54, 22, 24], position: [0, 88, 73], material: 'darkMetal' },
      { type: 'box', size: [54, 22, 24], position: [200, 88, 73], material: 'darkMetal' },
      { type: 'box', size: [54, 22, 24], position: [400, 88, 73], material: 'darkMetal' },
      { type: 'cylinder', radius: 10, length: 1170, axis: 'x', position: [0, 64, 70], material: 'metal' },
      { type: 'cylinder', radius: 12, length: 1160, axis: 'x', position: [0, -74, 48], material: 'metal' },
      {
        type: 'extrude',
        points: [[-24, -100], [38, -100], [58, -58], [42, 18], [50, 88], [-20, 105], [-58, 35], [-58, -45]],
        depth: 12,
        position: [-505, 0, 0],
        holes: [{ kind: 'circle', center: [25, -68], radius: 14 }],
        material: 'darkMetal',
      },
      {
        type: 'extrude',
        points: [[-38, -100], [24, -100], [58, -45], [58, 35], [20, 105], [-50, 88], [-42, 18], [-58, -58]],
        depth: 12,
        position: [505, 0, 0],
        holes: [{ kind: 'circle', center: [-25, -68], radius: 14 }],
        material: 'darkMetal',
      },
    ],
  },

  'JWF1206-1100-8': {
    level: '尺寸级',
    material: 'paintedMetal',
    source: {
      page: 12,
      dimensions: ['X=939', 'Y=324', 'Z=368'],
      views: ['正视图', '端面图'],
      assumptions: ['三向外廓尺寸取自厂家标注', '圆形风道内外径、板厚、端面斜角和顶部锁扣尺寸按两视图比例估算'],
    },
    primitives: [
      { type: 'box', size: [939, 12, 368], position: [0, 156, 0] },
      { type: 'box', size: [939, 12, 304], position: [0, -156, 0] },
      { type: 'box', size: [939, 300, 12], position: [0, 0, -178] },
      { type: 'box', size: [939, 300, 12], position: [0, 0, 178] },
      {
        type: 'lathe',
        points: [[112, -469.5], [132, -469.5], [132, 469.5], [112, 469.5], [112, -469.5]],
        rotation: [0, 0, -1.5708],
        material: 'darkMetal',
      },
      { type: 'box', size: [40, 62, 28], position: [0, 128, 170], material: 'darkMetal' },
      { type: 'cylinder', radius: 9, length: 28, axis: 'z', position: [0, 128, 184], material: 'metal' },
    ],
  },

  'JWF1206-1100-9': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 12,
      dimensions: ['X=936', 'Y=76'],
      views: ['正视图', '端面图'],
      assumptions: ['横撑深度未标，按端面比例估算为55', '矩形管框、两根内撑和端部斜角按两视图建立；端板上下圆形按真实贯穿孔处理，不用圆柱实体冒充'],
    },
    primitives: [
      { type: 'box', size: [936, 8, 55], position: [0, 34, 0] },
      { type: 'box', size: [936, 8, 55], position: [0, -34, 0] },
      {
        type: 'extrude',
        points: [[-27.5, -38], [22, -38], [27.5, -32.5], [27.5, 32.5], [22, 38], [-27.5, 38]],
        depth: 8,
        position: [-464, 0, 0],
        rotation: [0, 1.5708, 0],
        holes: [
          { kind: 'circle', center: [0, -26], radius: 6 },
          { kind: 'circle', center: [0, 26], radius: 6 },
        ],
      },
      {
        type: 'extrude',
        points: [[-27.5, -38], [22, -38], [27.5, -32.5], [27.5, 32.5], [22, 38], [-27.5, 38]],
        depth: 8,
        position: [464, 0, 0],
        rotation: [0, 1.5708, 0],
        holes: [
          { kind: 'circle', center: [0, -26], radius: 6 },
          { kind: 'circle', center: [0, 26], radius: 6 },
        ],
      },
      { type: 'box', size: [8, 76, 45], position: [-285, 0, 0], material: 'darkMetal' },
      { type: 'box', size: [8, 76, 45], position: [285, 0, 0], material: 'darkMetal' },
    ],
  },

  'JWF1206-1100-10': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 12,
      dimensions: ['X=100', 'Y=50'],
      views: ['主视图', '俯视图', '侧视图'],
      assumptions: ['折弯深度和板厚未标，按38和6估算', '长板纵向调节槽及圆孔、垂直短折边两个圆孔按三视图比例估算，并均按真实贯穿孔处理'],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-50, -25], [42, -25], [50, -17], [50, 17], [42, 25], [-50, 25]],
        depth: 6,
        bevel: 1,
        holes: [
          { kind: 'circle', center: [33, 0], radius: 7 },
          { kind: 'polygon', points: [[-42, -4], [18, -4], [22, 0], [18, 4], [-42, 4]] },
        ],
      },
      {
        type: 'extrude',
        points: [[-19, -25], [19, -25], [19, 25], [-19, 25]],
        depth: 6,
        position: [-47, 0, 19],
        rotation: [0, 1.5708, 0],
        holes: [
          { kind: 'circle', center: [0, -15], radius: 5 },
          { kind: 'circle', center: [0, 15], radius: 5 },
        ],
        material: 'darkMetal',
      },
      { type: 'box', size: [22, 6, 38], position: [-39, 22, 16], material: 'darkMetal' },
    ],
  },

  'JWF1206-1100-11': {
    level: '尺寸级',
    material: 'metal',
    source: {
      page: 12,
      dimensions: ['φ100', 'X=1338'],
      views: ['轴向主视图'],
      assumptions: ['辊体最大外径和轴向总长取自厂家标注', '中央辊身长度、左右各级轴颈直径和键槽按主视比例估算；端螺纹线不逐圈生成实体圆环'],
    },
    primitives: [
      {
        type: 'lathe',
        points: [[0, -669], [14, -669], [14, -630], [22, -630], [22, -560], [28, -560], [28, -420], [50, -420], [50, 0], [28, 0], [28, 80], [22, 80], [22, 180], [25, 180], [25, 300], [20, 300], [20, 430], [16, 430], [16, 620], [10, 620], [10, 669], [0, 669], [0, -669]],
        rotation: [0, 0, -1.5708],
      },
      { type: 'box', size: [95, 8, 8], position: [482, 18, 0], material: 'darkMetal' },
    ],
  },

  'JWF1206-1100-12': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 12,
      dimensions: ['X=939', 'Y=70'],
      views: ['正视图', '端面图'],
      assumptions: ['调节板深度和板厚未标，按42和8估算', '三处钥匙孔形调节槽、两道分隔加强筋及端部卷边按两视图比例估算；端板圆形按真实贯穿孔处理'],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-469.5, -35], [469.5, -35], [469.5, 35], [-469.5, 35]],
        depth: 8,
        bevel: 1,
        holes: [
          { kind: 'polygon', points: [[-320, 0], [-317, 7], [-310, 10], [-303, 7], [-300, 0], [-306, -6], [-306, -28], [-314, -28], [-314, -6]] },
          { kind: 'polygon', points: [[-10, 0], [-7, 7], [0, 10], [7, 7], [10, 0], [4, -6], [4, -28], [-4, -28], [-4, -6]] },
          { kind: 'polygon', points: [[300, 0], [303, 7], [310, 10], [317, 7], [320, 0], [314, -6], [314, -28], [306, -28], [306, -6]] },
        ],
      },
      { type: 'box', size: [8, 78, 42], position: [-210, 0, 17], material: 'darkMetal' },
      { type: 'box', size: [8, 78, 42], position: [210, 0, 17], material: 'darkMetal' },
      {
        type: 'extrude',
        points: [[-21, -35], [13, -35], [21, -27], [21, 27], [13, 35], [-21, 35]],
        depth: 8,
        position: [-465.5, 0, 17],
        rotation: [0, 1.5708, 0],
        holes: [
          { kind: 'circle', center: [0, -12], radius: 5 },
          { kind: 'circle', center: [8, 14], radius: 5 },
        ],
        material: 'darkMetal',
      },
      {
        type: 'extrude',
        points: [[-21, -35], [13, -35], [21, -27], [21, 27], [13, 35], [-21, 35]],
        depth: 8,
        position: [465.5, 0, 17],
        rotation: [0, 1.5708, 0],
        holes: [
          { kind: 'circle', center: [0, -12], radius: 5 },
          { kind: 'circle', center: [8, 14], radius: 5 },
        ],
        material: 'darkMetal',
      },
    ],
  },

  'FA221D-1100-3': {
    level: '尺寸级',
    material: 'darkMetal',
    source: {
      page: 12,
      dimensions: ['上段X=46', 'Y=170', '下段X=50', 'Z=53'],
      views: ['正视图', '侧视图'],
      assumptions: ['四项外廓尺寸均取自厂家标注', '大、小枢轴孔径、叉板厚度、顶部螺纹柱和横梁高度按两视图比例估算；螺纹短线不逐条生成实体环'],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-25, -85], [25, -85], [25, 28], [20, 35], [-20, 35], [-25, 28]],
        depth: 6,
        position: [0, 0, -23.5],
        bevel: 1,
        holes: [
          { kind: 'circle', center: [0, -15], radius: 19 },
          { kind: 'circle', center: [0, -70], radius: 6 },
        ],
      },
      {
        type: 'extrude',
        points: [[-25, -85], [25, -85], [25, 28], [20, 35], [-20, 35], [-25, 28]],
        depth: 6,
        position: [0, 0, 23.5],
        bevel: 1,
        holes: [
          { kind: 'circle', center: [0, -15], radius: 19 },
          { kind: 'circle', center: [0, -70], radius: 6 },
        ],
      },
      { type: 'box', size: [50, 20, 53], position: [0, 25, 0], material: 'metal' },
      { type: 'box', size: [46, 50, 53], position: [0, 60, 0] },
      { type: 'cylinder', radius: 9, length: 50, axis: 'y', position: [0, 60, 0], material: 'metal' },
    ],
  },

  'FA221D-1100-4': {
    level: '尺寸级',
    material: 'rubber',
    source: {
      page: 12,
      dimensions: ['外径φ93', '内径φ85', 'Z=10'],
      views: ['轴向剖视图'],
      assumptions: ['外径、内径和厚度均取自厂家标注', '原图为等截面密封垫，按橡胶材质建立，不使用金属材质或实体圆柱'],
    },
    primitives: [
      {
        type: 'lathe',
        points: [[42.5, -5], [46.5, -5], [46.5, 5], [42.5, 5], [42.5, -5]],
        rotation: [1.5708, 0, 0],
      },
    ],
  },

  'FA221D-1100-5': {
    level: '尺寸级',
    material: 'metal',
    source: {
      page: 12,
      dimensions: ['M12×1-6g', 'X=36'],
      views: ['轴向主视图'],
      assumptions: ['螺纹规格和总长取自厂家标注', '中部法兰、右端六角/螺纹段和左端探测端的分段长度按主视比例估算；螺纹画法只保留光顺名义外径，不逐圈生成实体环'],
    },
    primitives: [
      {
        type: 'lathe',
        points: [[0, -18], [3, -18], [3, -13], [5, -13], [5, -8], [8.5, -8], [8.5, 0], [6, 0], [6, 10], [4.5, 10], [4.5, 16], [3.5, 16], [3.5, 18], [0, 18], [0, -18]],
        rotation: [0, 0, -1.5708],
      },
      { type: 'cylinder', radius: 3, radiusTop: 1.5, radiusBottom: 3, length: 5, axis: 'x', position: [-15.5, 0, 0], material: 'brass' },
    ],
  },
};
