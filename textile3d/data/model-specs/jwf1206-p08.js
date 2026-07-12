const circleHole = (x, y, radius) => ({ kind: 'circle', center: [x, y], radius });
const polygonHole = (points) => ({ kind: 'polygon', points });

export const jwf1206P08ModelSpecs = {
  'TF2233-00': {
    level: '轮廓级',
    material: 'metal',
    source: {
      page: 8,
      dimensions: ['32'],
      views: ['俯视图', '正视图', '侧视图'],
      assumptions: [
        '厂家只标注侧视基准至上部的32毫米高度；主体长度、厚度、销轴与螺栓直径均按三视图比例估算。',
        '该件不是普通合页片，而是带偏置压臂、中心转轴、横向调节螺杆和竖向紧固螺柱的铰链总成。',
        '与TF2236-00的压臂方向相反，本件按原格侧视图向左伸出。',
      ],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-9, -16], [18, -16], [18, 16], [-3, 16], [-9, 8]],
        depth: 18,
        holes: [circleHole(0, 4, 5.5)],
        position: [0, 0, -9],
        rotation: [0, 0, 0],
        bevel: 1.5,
        material: 'darkMetal',
      },
      {
        type: 'extrude',
        points: [[-55, -14], [-22, -14], [-11, -3], [-11, 8], [-23, 12], [-50, 7], [-59, -1]],
        depth: 12,
        holes: [circleHole(-38, 0, 4)],
        position: [0, -6, -6],
        rotation: [0, 0, 0],
        bevel: 2,
        material: 'metal',
      },
      { type: 'cylinder', radius: 6.5, length: 26, axis: 'z', position: [0, 4, 0], rotation: [0, 0, 0], material: 'metal' },
      { type: 'cylinder', radius: 3.8, length: 36, axis: 'y', position: [0, 27, 0], rotation: [0, 0, 0], material: 'metal' },
      { type: 'cylinder', radiusTop: 6.5, radiusBottom: 6.5, length: 7, axis: 'y', position: [0, 45.5, 0], rotation: [0, 0, 0], material: 'darkMetal' },
      { type: 'box', size: [22, 19, 22], position: [22, 2, 0], rotation: [0, 0, 0], material: 'darkMetal' },
      { type: 'cylinder', radius: 3.2, length: 43, axis: 'x', position: [42, 2, 0], rotation: [0, 0, 0], material: 'metal' },
      { type: 'cylinder', radiusTop: 6.2, radiusBottom: 6.2, length: 8, axis: 'x', position: [66, 2, 0], rotation: [0, 0, 0], material: 'darkMetal' },
    ],
  },

  'TF2236-00': {
    level: '轮廓级',
    material: 'metal',
    source: {
      page: 8,
      dimensions: ['32'],
      views: ['俯视图', '正视图', '侧视图'],
      assumptions: [
        '厂家只标注侧视基准至上部的32毫米高度；主体长度、厚度、销轴与螺栓直径均按三视图比例估算。',
        '该件按原图建立偏置压臂、中心转轴、横向调节螺杆及竖向紧固螺柱，不使用通用合页外形。',
        '与TF2233-00的压臂方向相反，本件按原格侧视图向右伸出。',
      ],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-18, -16], [9, -16], [9, 8], [3, 16], [-18, 16]],
        depth: 18,
        holes: [circleHole(0, 4, 5.5)],
        position: [0, 0, -9],
        rotation: [0, 0, 0],
        bevel: 1.5,
        material: 'darkMetal',
      },
      {
        type: 'extrude',
        points: [[11, -3], [22, -14], [55, -14], [59, -1], [50, 7], [23, 12], [11, 8]],
        depth: 12,
        holes: [circleHole(38, 0, 4)],
        position: [0, -6, -6],
        rotation: [0, 0, 0],
        bevel: 2,
        material: 'metal',
      },
      { type: 'cylinder', radius: 6.5, length: 26, axis: 'z', position: [0, 4, 0], rotation: [0, 0, 0], material: 'metal' },
      { type: 'cylinder', radius: 3.8, length: 36, axis: 'y', position: [0, 27, 0], rotation: [0, 0, 0], material: 'metal' },
      { type: 'cylinder', radiusTop: 6.5, radiusBottom: 6.5, length: 7, axis: 'y', position: [0, 45.5, 0], rotation: [0, 0, 0], material: 'darkMetal' },
      { type: 'box', size: [22, 19, 22], position: [-22, 2, 0], rotation: [0, 0, 0], material: 'darkMetal' },
      { type: 'cylinder', radius: 3.2, length: 43, axis: 'x', position: [-42, 2, 0], rotation: [0, 0, 0], material: 'metal' },
      { type: 'cylinder', radiusTop: 6.2, radiusBottom: 6.2, length: 8, axis: 'x', position: [-66, 2, 0], rotation: [0, 0, 0], material: 'darkMetal' },
    ],
  },

  'TF2225-00': {
    level: '轮廓级',
    material: 'metal',
    source: {
      page: 8,
      dimensions: ['Φ50', '10'],
      views: ['剖视图'],
      assumptions: [
        '厂家明确标注磁吸圆盘外径50毫米、安装板厚10毫米；右侧螺杆总长、螺纹、螺母和垫圈尺寸未标注。',
        '按剖视图建立金属外壳、磁性圆芯、中心调节螺杆、双垫圈与锁紧螺母，不把该装置简化成单一圆柱。',
      ],
    },
    primitives: [
      { type: 'cylinder', radius: 25, length: 10, axis: 'x', position: [-37, 0, 0], rotation: [0, 0, 0], material: 'darkMetal' },
      { type: 'cylinder', radius: 19, length: 8, axis: 'x', position: [-31, 0, 0], rotation: [0, 0, 0], material: 'metal' },
      { type: 'cylinder', radius: 8, length: 9, axis: 'x', position: [-24, 0, 0], rotation: [0, 0, 0], material: 'darkMetal' },
      { type: 'cylinder', radius: 3.8, length: 72, axis: 'x', position: [13, 0, 0], rotation: [0, 0, 0], material: 'metal' },
      { type: 'torus', radius: 4.5, tube: 1.1, position: [-9, 0, 0], rotation: [0, 1.5708, 0], material: 'darkMetal' },
      { type: 'torus', radius: 4.5, tube: 1.1, position: [-1, 0, 0], rotation: [0, 1.5708, 0], material: 'darkMetal' },
      { type: 'torus', radius: 4.5, tube: 1.1, position: [7, 0, 0], rotation: [0, 1.5708, 0], material: 'darkMetal' },
      { type: 'torus', radius: 4.5, tube: 1.1, position: [27, 0, 0], rotation: [0, 1.5708, 0], material: 'darkMetal' },
      { type: 'torus', radius: 4.5, tube: 1.1, position: [35, 0, 0], rotation: [0, 1.5708, 0], material: 'darkMetal' },
      { type: 'cylinder', radius: 11, length: 2.5, axis: 'x', position: [46, 0, 0], rotation: [0, 0, 0], material: 'metal' },
      { type: 'cylinder', radius: 8, length: 11, axis: 'x', position: [53, 0, 0], rotation: [0, 0, 0], material: 'darkMetal' },
    ],
  },

  'TF2227-00': {
    level: '尺寸级',
    material: 'plastic',
    source: {
      page: 8,
      dimensions: ['102.4', '162.8', '34.5'],
      views: ['正视图', '侧视图'],
      assumptions: [
        '正视总高102.4毫米、总宽162.8毫米、侧视总深34.5毫米均取厂家标注。',
        '外轮廓圆角、内握持孔、顶部安装孔和侧视拱面曲率未单独标注，按两视图比例估算。',
      ],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-81.4, -51.2], [81.4, -51.2], [75, -21], [18, 43], [10, 51.2], [-10, 51.2], [-18, 43], [-75, -21]],
        depth: 34.5,
        holes: [
          polygonHole([[-62, -34], [62, -34], [55, -12], [12, 31], [-12, 31], [-55, -12]]),
          circleHole(0, 39, 6.5),
        ],
        position: [0, 0, -17.25],
        rotation: [0, 0, 0],
        bevel: 4,
        material: 'plastic',
      },
      { type: 'box', size: [162.8, 4, 34.5], position: [0, -49.2, 0], rotation: [0, 0, 0], material: 'darkMetal' },
      { type: 'cylinder', radius: 11, length: 34.5, axis: 'z', position: [0, 39, 0], rotation: [0, 0, 0], material: 'plastic' },
      { type: 'cylinder', radius: 6.5, length: 38, axis: 'z', position: [0, 39, 0], rotation: [0, 0, 0], material: 'darkMetal' },
    ],
  },

  'TZH1073-II': {
    level: '轮廓级',
    material: 'rubber',
    source: {
      page: 8,
      dimensions: ['6', '9.5'],
      views: ['截面图'],
      assumptions: [
        '厂家明确标注截面总宽6毫米、总高9.5毫米；U形槽宽、壁厚和圆角未标注，按截面比例估算。',
        '该件为连续橡胶密封条，3D仅取100毫米展示段；500dm是单台用量，不作为几何长度。',
      ],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-3, -4.75], [-1.9, -4.75], [-1.9, 1.9], [-1.25, 3.25], [0, 3.85], [1.25, 3.25], [1.9, 1.9], [1.9, -4.75], [3, -4.75], [3, 2.2], [2.35, 3.85], [1.1, 4.75], [-1.1, 4.75], [-2.35, 3.85], [-3, 2.2]],
        depth: 100,
        holes: [],
        position: [0, 0, -50],
        rotation: [0, 0, 0],
        bevel: 0.35,
        material: 'rubber',
      },
    ],
  },

  'TZH1077-1.5X3': {
    level: '轮廓级',
    material: 'rubber',
    source: {
      page: 8,
      dimensions: ['14.5', '12'],
      views: ['截面图'],
      assumptions: [
        '厂家明确标注截面总高14.5毫米、总宽12毫米；件号中的1.5X3未作为本格标注尺寸重复录入。',
        '中部弹性唇口、下部开槽宽度及各分支厚度按截面比例估算；3D取100毫米连续展示段。',
      ],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-6, -7.25], [-0.5, -7.25], [-0.5, -2.1], [0.2, -1.3], [0.2, 1.6], [-0.4, 2.3], [-0.4, 7.25], [-6, 7.25]],
        depth: 100,
        holes: [],
        position: [0, 0, -50],
        rotation: [0, 0, 0],
        bevel: 0.3,
        material: 'rubber',
      },
      {
        type: 'extrude',
        points: [[-0.3, 2], [5.1, 7.1], [6, 6], [2, 0.4], [0.2, -0.1]],
        depth: 100,
        holes: [],
        position: [0, 0, -50],
        rotation: [0, 0, 0],
        bevel: 0.3,
        material: 'rubber',
      },
      {
        type: 'extrude',
        points: [[-0.4, -7.25], [6, -7.25], [6, -1.25], [4.9, -0.7], [1.2, -0.8], [0.25, -1.6], [-0.4, -2.2]],
        depth: 100,
        holes: [],
        position: [0, 0, -50],
        rotation: [0, 0, 0],
        bevel: 0.3,
        material: 'rubber',
      },
      { type: 'tube', points: [[0.2, 0.8, -50], [1.5, 0.3, -25], [3.7, 0.2, 0], [5.3, 0.8, 25], [5.6, 1.4, 50]], radius: 0.55, position: [0, 0, 0], rotation: [0, 0, 0], material: 'rubber' },
    ],
  },

  'TZH1078-6X7': {
    level: '尺寸级',
    material: 'rubber',
    source: {
      page: 8,
      dimensions: ['7', '6'],
      views: ['截面图'],
      assumptions: [
        '厂家明确标注截面总高7毫米、总宽6毫米；箭头形嵌芯轮廓依原截面建立。',
        '外缘局部圆角未标注，按图面比例估算；该连续橡胶件仅取100毫米展示段。',
      ],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-3, 0], [0.8, -2.35], [1.5, -3.5], [2.3, -3.4], [2.15, -2.55], [2.7, -1.45], [3, 0], [2.7, 1.45], [2.15, 2.55], [2.3, 3.4], [1.5, 3.5], [0.8, 2.35]],
        depth: 100,
        holes: [],
        position: [0, 0, -50],
        rotation: [0, 0, 0],
        bevel: 0.25,
        material: 'rubber',
      },
    ],
  },

  'TZH-1096': {
    level: '尺寸级',
    material: 'rubber',
    source: {
      page: 8,
      dimensions: ['Φ27', '14'],
      views: ['剖视图'],
      assumptions: [
        '厂家明确标注外露塞帽最大直径27毫米、插入段长度14毫米。',
        '塞帽曲面、插入柱直径、四道防脱环高度和内部空腔未单独标注，按剖视轮廓比例估算。',
      ],
    },
    primitives: [
      { type: 'cylinder', radiusTop: 13.5, radiusBottom: 11.5, length: 2.5, axis: 'x', position: [-5.75, 0, 0], rotation: [0, 0, 0], material: 'rubber' },
      { type: 'cylinder', radiusTop: 11.5, radiusBottom: 8.5, length: 3.5, axis: 'x', position: [-2.75, 0, 0], rotation: [0, 0, 0], material: 'rubber' },
      { type: 'cylinder', radius: 6.3, length: 14, axis: 'x', position: [7, 0, 0], rotation: [0, 0, 0], material: 'rubber' },
      { type: 'torus', radius: 6.5, tube: 1.15, position: [3, 0, 0], rotation: [0, 1.5708, 0], material: 'rubber' },
      { type: 'torus', radius: 6.5, tube: 1.15, position: [6, 0, 0], rotation: [0, 1.5708, 0], material: 'rubber' },
      { type: 'torus', radius: 6.5, tube: 1.15, position: [9, 0, 0], rotation: [0, 1.5708, 0], material: 'rubber' },
      { type: 'torus', radius: 6.5, tube: 1.15, position: [12, 0, 0], rotation: [0, 1.5708, 0], material: 'rubber' },
      { type: 'cylinder', radiusTop: 6.3, radiusBottom: 5.5, length: 2, axis: 'x', position: [15, 0, 0], rotation: [0, 0, 0], material: 'rubber' },
    ],
  },
};
