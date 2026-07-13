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
      { type: 'lathe', points: [[8, -5], [25, -5], [25, 5], [8, 5]], position: [-40, 0, 0], rotation: [0, 0, -1.5708], material: 'darkMetal', flatShading: false },
      { type: 'cylinder', radius: 7, length: 10, axis: 'x', position: [-40, 0, 0], rotation: [0, 0, 0], material: 'metal' },
      { type: 'cylinder', radius: 3.8, length: 53.3, axis: 'x', position: [-8.35, 0, 0], rotation: [0, 0, 0], material: 'metal' },
      { type: 'torus', radius: 4.25, tube: 0.8, position: [-30.45, 0, 0], rotation: [0, 1.5708, 0], material: 'darkMetal' },
      { type: 'torus', radius: 4.25, tube: 0.8, position: [-25.25, 0, 0], rotation: [0, 1.5708, 0], material: 'darkMetal' },
      { type: 'torus', radius: 4.25, tube: 0.8, position: [-20.05, 0, 0], rotation: [0, 1.5708, 0], material: 'darkMetal' },
      { type: 'torus', radius: 4.25, tube: 0.8, position: [-0.55, 0, 0], rotation: [0, 1.5708, 0], material: 'darkMetal' },
      { type: 'torus', radius: 4.25, tube: 0.8, position: [4.65, 0, 0], rotation: [0, 1.5708, 0], material: 'darkMetal' },
      { type: 'cylinder', radius: 9.5, length: 2.2, axis: 'x', position: [18.95, 0, 0], rotation: [0, 0, 0], material: 'metal' },
      { type: 'cylinder', radius: 8, length: 7, axis: 'x', position: [23.55, 0, 0], rotation: [0, 0, 0], material: 'darkMetal' },
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
        '外轮廓圆角、内侧加强边界、顶部紧固件和俯视拱面曲率未单独标注，按两视图比例估算；内侧闭合线不擅自判作贯通孔。',
      ],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-81.4, -51.2], [81.4, -51.2], [75, -21], [18, 43], [10, 51.2], [-10, 51.2], [-18, 43], [-75, -21]],
        depth: 3,
        holes: [],
        position: [0, 0, -15.75],
        rotation: [0, 0, 0],
        bevel: 1,
        material: 'plastic',
      },
      {
        type: 'loft',
        sections: [
          { x: -13.8, points: [[-42, 62], [-42, -62], [-36, -64], [-19, -59], [32, -14], [41, -7], [43, 0], [41, 7], [32, 14], [-19, 59], [-36, 64]] },
          { x: 3, points: [[-36, 52], [-36, -52], [-31, -54], [-16, -49], [27, -12], [35, -6], [37, 0], [35, 6], [27, 12], [-16, 49], [-31, 54]] },
          { x: 17.25, points: [[-24, 29], [-24, -29], [-22, -31], [-10, -28], [18, -8], [23, -4], [25, 0], [23, 4], [18, 8], [-10, 28], [-22, 31]] },
        ],
        capStart: true,
        capEnd: true,
        rotation: [0, -1.5708, 0],
        material: 'plastic',
      },
      {
        type: 'extrude',
        points: [[-68, -40], [68, -40], [62, -16], [16, 32], [-16, 32], [-62, -16]],
        depth: 1.2,
        holes: [polygonHole([[-63, -35], [63, -35], [57, -14], [13, 27], [-13, 27], [-57, -14]])],
        position: [0, 0, -12.5],
        rotation: [0, 0, 0],
        bevel: 0.25,
        material: 'darkMetal',
      },
      { type: 'cylinder', radius: 7, length: 4, axis: 'z', position: [0, 39, 17], rotation: [0, 0, 0], material: 'darkMetal' },
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
        points: [[-2.2, -4.75], [-2.8, -4.3], [-3, -3.7], [-3, 0.7], [-2.7, 2.5], [-1.6, 4.1], [0, 4.75], [1.6, 4.1], [2.7, 2.5], [3, 0.7], [3, -3.7], [2.8, -4.3], [2.2, -4.75], [1.55, -4.6], [1.25, -3.6], [1.65, -2.4], [1.7, 0.6], [1.35, 2], [0.65, 2.9], [0, 3.15], [-0.65, 2.9], [-1.35, 2], [-1.7, 0.6], [-1.65, -2.4], [-1.25, -3.6], [-1.55, -4.6]],
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
        points: [[-6, -7.25], [-1.1, -7.25], [-0.55, -6.9], [-0.55, -2.8], [0.55, -2.8], [0.55, -7.25], [6, -7.25], [6, -1.1], [5.5, -0.2], [4.4, 0.4], [2, 0.2], [1.1, -0.15], [0.5, 0], [0.15, 0.55], [0.5, 0.95], [2, 0.95], [3.5, 1], [4.6, 1.7], [5.2, 2.8], [6, 5.2], [4.4, 6.6], [1.4, 2.6], [-0.3, 2.6], [-0.3, 7.25], [-6, 7.25]],
        depth: 100,
        holes: [],
        position: [0, 0, -50],
        rotation: [0, 0, 0],
        bevel: 0.3,
        material: 'rubber',
      },
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
        points: [[-3, 0], [0.7, -2.25], [1.25, -2.8], [1.35, -3.3], [1.6, -3.5], [2.15, -3.45], [2.3, -3.15], [2.15, -2.55], [2.65, -1.55], [2.95, -0.6], [3, 0], [2.95, 0.6], [2.65, 1.55], [2.15, 2.55], [2.3, 3.15], [2.15, 3.45], [1.6, 3.5], [1.35, 3.3], [1.25, 2.8], [0.7, 2.25]],
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
      {
        type: 'lathe',
        points: [[0, -6], [5, -5.8], [9, -4.5], [12, -2], [13.5, 0], [6.4, 0], [6.4, 1], [7.35, 1.45], [7.35, 2], [6.4, 2.45], [6.4, 4], [7.35, 4.45], [7.35, 5], [6.4, 5.45], [6.4, 7], [7.35, 7.45], [7.35, 8], [6.4, 8.45], [6.4, 10], [7.35, 10.45], [7.35, 11], [6.4, 11.45], [6.4, 14], [5.2, 14], [5.2, 1.2], [4.8, 0], [4, -1.8], [2.5, -3.8], [0, -5]],
        rotation: [0, 0, -1.5708],
        material: 'rubber',
        flatShading: false,
      },
    ],
  },
};

for (const [partCode, spec] of Object.entries(jwf1206P08ModelSpecs)) {
  const hasSection = spec.source.views.some((view) => /剖|截面/.test(view));
  spec.source.sourceCrop = `assets/manuals/jwf1206/crops/${partCode}.png`;
  spec.source.sourceVector = `assets/manuals/jwf1206/crops/${partCode}.pdf`;
  spec.source.cropDpi = 600;
  spec.source.excludedLines = [
    '原格表框、件号、名称、数量栏与文字', '尺寸线、箭头与尺寸数字', '尺寸延长线',
    '中心线与中心十字', '引出线与标注线', ...(hasSection ? ['剖面填充线'] : []),
  ];
  spec.source.unknowns = spec.source.assumptions.filter((text) => /未.*(?:标|给|注明|画|规定|建模)|估算|比例|近似|不作为|空间走向/.test(text));
  spec.source.reconstructionRule = '逐格识别主视、辅助视图和剖面；清除非实体标注线后，只按厂家明示尺寸与闭合实体轮廓建模。';
}
