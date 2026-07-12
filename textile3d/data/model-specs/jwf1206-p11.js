const circleHole = (x, y, radius) => ({ kind: 'circle', center: [x, y], radius });

export const jwf1206P11ModelSpecs = {
  'JWF1202-0301(SMC)': {
    level: '尺寸级',
    material: 'paintedMetal',
    source: {
      page: 11,
      dimensions: ['190×250×20'],
      views: ['正视图', '侧视图'],
      assumptions: [
        '厂家明确标注X向宽190毫米、Y向高250毫米、Z向折弯总深20毫米。',
        '该件按侧视图判定为薄板折弯底板，不是20毫米厚实心板；板厚按3毫米估算。',
        '上下翻边宽度、回折高度、孔径及各孔位置未标注，按正视图比例估算。',
      ],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-95, -105], [95, -105], [95, 105], [-95, 105]],
        depth: 3,
        holes: [
          circleHole(-84, 73, 3), circleHole(-84, 60, 3),
          circleHole(-34, 73, 3), circleHole(-34, 60, 3),
          circleHole(35, 73, 3), circleHole(35, 60, 3),
          circleHole(84, 73, 3), circleHole(84, 60, 3),
          circleHole(-84, -38, 3), circleHole(-48, -48, 3),
          circleHole(51, -29, 3), circleHole(51, -46, 3),
        ],
        position: [0, 0, 8.5],
        rotation: [0, 0, 0],
        bevel: 0.6,
        material: 'paintedMetal',
      },
      {
        type: 'extrude',
        points: [[-95, 105], [95, 105], [95, 125], [-95, 125]],
        depth: 3,
        holes: [circleHole(-80, 115, 4), circleHole(80, 115, 4)],
        position: [0, 0, 8.5],
        rotation: [0, 0, 0],
        bevel: 0.6,
        material: 'paintedMetal',
      },
      {
        type: 'extrude',
        points: [[-95, -125], [95, -125], [95, -105], [-95, -105]],
        depth: 3,
        holes: [circleHole(-80, -115, 4), circleHole(80, -115, 4)],
        position: [0, 0, 8.5],
        rotation: [0, 0, 0],
        bevel: 0.6,
        material: 'paintedMetal',
      },
      { type: 'box', size: [190, 3, 17], position: [0, 105, 0], rotation: [0, 0, 0], material: 'paintedMetal' },
      { type: 'box', size: [190, 3, 17], position: [0, -105, 0], rotation: [0, 0, 0], material: 'paintedMetal' },
      { type: 'box', size: [190, 12, 3], position: [0, 111, -8.5], rotation: [0, 0, 0], material: 'darkMetal' },
      { type: 'box', size: [190, 12, 3], position: [0, -111, -8.5], rotation: [0, 0, 0], material: 'darkMetal' },
      { type: 'box', size: [190, 3, 4], position: [0, 104, 6.5], rotation: [0, 0, 0], material: 'darkMetal' },
      { type: 'box', size: [190, 3, 4], position: [0, -104, 6.5], rotation: [0, 0, 0], material: 'darkMetal' },
    ],
  },

  'JWF1202-0302': {
    level: '尺寸级',
    material: 'plastic',
    source: {
      page: 11,
      dimensions: ['φ8×6000'],
      views: ['外形图（断开表示）'],
      assumptions: [
        '厂家明确标注外径8毫米、展开长度6000毫米。',
        '按SMC气动组件语境判定为柔性塑料气管；材质牌号、颜色和壁厚未标注。',
        '厂家仅给直管外形，实际安装走向未知，3D按6000毫米直管展示。',
      ],
    },
    primitives: [
      { type: 'cylinder', radius: 4, length: 6000, axis: 'x', position: [0, 0, 0], rotation: [0, 0, 0], material: 'plastic' },
    ],
  },

  'JWF1202-0303': {
    level: '尺寸级',
    material: 'plastic',
    source: {
      page: 11,
      dimensions: ['φ6×100'],
      views: ['外形图'],
      assumptions: [
        '厂家明确标注外径6毫米、长度100毫米。',
        '按SMC气动组件语境判定为柔性塑料气管；壁厚、颜色及端部接头均未标注，故不增设接头。',
      ],
    },
    primitives: [
      { type: 'cylinder', radius: 3, length: 100, axis: 'x', position: [0, 0, 0], rotation: [0, 0, 0], material: 'plastic' },
    ],
  },

  'JWF1202-0304': {
    level: '尺寸级',
    material: 'plastic',
    source: {
      page: 11,
      dimensions: ['φ6×2100'],
      views: ['外形图（断开表示）'],
      assumptions: [
        '厂家明确标注外径6毫米、展开长度2100毫米。',
        '按SMC气动组件语境判定为柔性塑料气管；厂家未给安装路径，3D按2100毫米直管展示。',
      ],
    },
    primitives: [
      { type: 'cylinder', radius: 3, length: 2100, axis: 'x', position: [0, 0, 0], rotation: [0, 0, 0], material: 'plastic' },
    ],
  },

  'JWF1202-0305': {
    level: '尺寸级',
    material: 'plastic',
    source: {
      page: 11,
      dimensions: ['φ6×200'],
      views: ['外形图'],
      assumptions: [
        '厂家明确标注外径6毫米、长度200毫米。',
        '按SMC气动组件语境判定为柔性塑料气管；壁厚、颜色及安装弯曲形态未标注。',
      ],
    },
    primitives: [
      { type: 'cylinder', radius: 3, length: 200, axis: 'x', position: [0, 0, 0], rotation: [0, 0, 0], material: 'plastic' },
    ],
  },

  'JWF1202-0306': {
    level: '尺寸级',
    material: 'plastic',
    source: {
      page: 11,
      dimensions: ['φ6×2600'],
      views: ['外形图（断开表示）'],
      assumptions: [
        '厂家明确标注外径6毫米、展开长度2600毫米。',
        '按SMC气动组件语境判定为柔性塑料气管；厂家未给安装路径，3D按2600毫米直管展示。',
      ],
    },
    primitives: [
      { type: 'cylinder', radius: 3, length: 2600, axis: 'x', position: [0, 0, 0], rotation: [0, 0, 0], material: 'plastic' },
    ],
  },

  'JWF1202-0307': {
    level: '尺寸级',
    material: 'plastic',
    source: {
      page: 11,
      dimensions: ['φ6×700'],
      views: ['外形图（断开表示）'],
      assumptions: [
        '厂家明确标注外径6毫米、展开长度700毫米。',
        '按SMC气动组件语境判定为柔性塑料气管；厂家未给安装路径，3D按700毫米直管展示。',
      ],
    },
    primitives: [
      { type: 'cylinder', radius: 3, length: 700, axis: 'x', position: [0, 0, 0], rotation: [0, 0, 0], material: 'plastic' },
    ],
  },

  'JWF1202-0308': {
    level: '尺寸级',
    material: 'plastic',
    source: {
      page: 11,
      dimensions: ['φ6×400'],
      views: ['外形图（断开表示）'],
      assumptions: [
        '厂家明确标注外径6毫米、展开长度400毫米。',
        '按SMC气动组件语境判定为柔性塑料气管；厂家未给安装路径，3D按400毫米直管展示。',
      ],
    },
    primitives: [
      { type: 'cylinder', radius: 3, length: 400, axis: 'x', position: [0, 0, 0], rotation: [0, 0, 0], material: 'plastic' },
    ],
  },

  'ZFA211A-0302': {
    level: '尺寸级',
    material: 'metal',
    source: {
      page: 11,
      dimensions: ['88×44×28', '中心长74'],
      views: ['俯视图', '纵向剖视图'],
      assumptions: [
        '厂家明确标注X向总长88毫米、Y向最大高44毫米、Z向宽28毫米；左端横孔中心至右端为74毫米。',
        '由88与中心长74确定横孔中心距左端14毫米，即在以零件中心为原点时X=-30毫米。',
        '轴向两级孔径、横孔直径、外圆角及台阶起点未标注，按剖视与俯视轮廓估算。',
      ],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-44, -14], [-36, -22], [8, -22], [8, -14], [44, -14], [44, 14], [8, 14], [8, 22], [-36, 22], [-44, 14]],
        depth: 28,
        holes: [],
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        bevel: 1.8,
        material: 'metal',
      },
      { type: 'cylinder', radius: 13, length: 43, axis: 'x', position: [-22.5, 0, 0], rotation: [0, 0, 0], material: 'darkMetal' },
      { type: 'cylinder', radius: 9, length: 45, axis: 'x', position: [21.5, 0, 0], rotation: [0, 0, 0], material: 'darkMetal' },
      { type: 'cylinder', radius: 7, length: 29, axis: 'z', position: [-30, 0, 0], rotation: [0, 0, 0], material: 'darkMetal' },
      { type: 'torus', radius: 8.2, tube: 1.2, position: [-30, 0, 14.2], rotation: [0, 0, 0], material: 'darkMetal' },
      { type: 'torus', radius: 8.2, tube: 1.2, position: [-30, 0, -14.2], rotation: [0, 0, 0], material: 'darkMetal' },
      { type: 'box', size: [4, 44, 28], position: [6, 0, 0], rotation: [0, 0, 0], material: 'darkMetal' },
    ],
  },

  'ZFA211A-0303': {
    level: '尺寸级',
    material: 'metal',
    source: {
      page: 11,
      dimensions: ['φ14×53'],
      views: ['外形图'],
      assumptions: [
        '厂家明确标注轴身直径14毫米、总长53毫米。',
        '左端倒角、左侧环槽和右端薄挡边的轴向长度及外径未标注，按外形图比例估算。',
      ],
    },
    primitives: [
      { type: 'cylinder', radius: 7, length: 47, axis: 'x', position: [-1, 0, 0], rotation: [0, 0, 0], material: 'metal' },
      { type: 'cylinder', radiusTop: 7, radiusBottom: 5.5, length: 4, axis: 'x', position: [-24.5, 0, 0], rotation: [0, 0, 0], material: 'metal' },
      { type: 'cylinder', radius: 8.8, length: 4, axis: 'x', position: [24.5, 0, 0], rotation: [0, 0, 0], material: 'darkMetal' },
      { type: 'torus', radius: 6.5, tube: 0.65, position: [-18, 0, 0], rotation: [0, 1.5708, 0], material: 'darkMetal' },
      { type: 'torus', radius: 6.5, tube: 0.65, position: [-14, 0, 0], rotation: [0, 1.5708, 0], material: 'darkMetal' },
    ],
  },
};
