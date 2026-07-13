const circleHole = (x, y, radius) => ({ kind: 'circle', center: [x, y], radius });

const airPipeSpec = (diameter, length) => {
  const outerRadius = diameter / 2;
  const innerRadius = outerRadius - 1;
  return {
    level: '轮廓级',
    material: 'plastic',
    source: {
      page: 11,
      dimensions: [`φ${diameter}×${length}`],
      views: ['外形图（断开表示）'],
      assumptions: [
        `厂家明确标注外径${diameter}毫米、展开长度${length}毫米。`,
        '外形图两条内部隐藏边证明为中心贯通的空心气管，不按实心圆柱处理。',
        '壁厚未标，按隐藏边比例估算为1毫米；材质牌号、颜色和实际安装走向未知。',
      ],
    },
    primitives: [{
      type: 'lathe',
      points: [
        [innerRadius, -length / 2], [outerRadius, -length / 2],
        [outerRadius, length / 2], [innerRadius, length / 2],
        [innerRadius, -length / 2],
      ],
      rotation: [0, 0, 1.5708],
      material: 'plastic',
    }],
  };
};

export const jwf1206P11ModelSpecs = {
  'JWF1202-0301(SMC)': {
    level: '轮廓级',
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
          circleHole(-84, 79, 3), circleHole(-84, 68, 3),
          circleHole(-34, 79, 3), circleHole(-34, 68, 3),
          circleHole(35, 79, 3), circleHole(35, 68, 3),
          circleHole(84, 79, 3), circleHole(84, 68, 3),
          circleHole(-84, -14, 3), circleHole(-48, -23, 3),
          circleHole(51, -4, 3), circleHole(51, -21, 3),
        ],
        position: [0, 0, 8.5],
        rotation: [0, 0, 0],
        material: 'paintedMetal',
      },
      {
        type: 'extrude',
        points: [[-95, 105], [95, 105], [95, 125], [-95, 125]],
        depth: 3,
        holes: [circleHole(-80, 115, 4), circleHole(80, 115, 4)],
        position: [0, 0, 8.5],
        rotation: [0, 0, 0],
        material: 'paintedMetal',
      },
      {
        type: 'extrude',
        points: [[-95, -125], [95, -125], [95, -105], [-95, -105]],
        depth: 3,
        holes: [circleHole(-80, -115, 4), circleHole(80, -115, 4)],
        position: [0, 0, 8.5],
        rotation: [0, 0, 0],
        material: 'paintedMetal',
      },
      { type: 'box', size: [190, 3, 17], position: [0, 105, 0], rotation: [0, 0, 0], material: 'paintedMetal' },
      { type: 'box', size: [190, 3, 17], position: [0, -105, 0], rotation: [0, 0, 0], material: 'paintedMetal' },
      { type: 'box', size: [190, 12, 3], position: [0, 111, -8.5], rotation: [0, 0, 0], material: 'paintedMetal' },
      { type: 'box', size: [190, 12, 3], position: [0, -111, -8.5], rotation: [0, 0, 0], material: 'paintedMetal' },
      { type: 'box', size: [190, 3, 4], position: [0, 104, 6.5], rotation: [0, 0, 0], material: 'paintedMetal' },
      { type: 'box', size: [190, 3, 4], position: [0, -104, 6.5], rotation: [0, 0, 0], material: 'paintedMetal' },
    ],
  },

  'JWF1202-0302': airPipeSpec(8, 6000),
  'JWF1202-0303': airPipeSpec(6, 100),
  'JWF1202-0304': airPipeSpec(6, 2100),
  'JWF1202-0305': airPipeSpec(6, 200),
  'JWF1202-0306': airPipeSpec(6, 2600),
  'JWF1202-0307': airPipeSpec(6, 700),
  'JWF1202-0308': airPipeSpec(6, 400),

  'ZFA211A-0302': {
    level: '轮廓级',
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
        material: 'metal',
      },
    ],
  },

  'ZFA211A-0303': {
    level: '轮廓级',
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
    primitives: [{
      type: 'lathe',
      points: [
        [0, -26.5], [5.5, -26.5], [7, -24.5],
        [7, -21], [6.4, -20.5], [6.4, -18.5], [7, -18],
        [7, 24.5], [10, 24.5], [10, 26.5], [0, 26.5], [0, -26.5],
      ],
      rotation: [0, 0, -1.5708],
      material: 'metal',
    }],
  },
};

for (const [partCode, spec] of Object.entries(jwf1206P11ModelSpecs)) {
  const cropCode = partCode === 'JWF1202-0301(SMC)' ? 'JWF1202-0301_SMC_' : partCode;
  spec.source.sourceCrop = `assets/manuals/jwf1206/crops/${cropCode}.png`;
  spec.source.sourceVector = `assets/manuals/jwf1206/crops/${cropCode}.pdf`;
  spec.source.cropDpi = 600;
  spec.source.excludedLines = ['原格表框和文字', '尺寸线、箭头和尺寸界线', '中心线', '断开符号', '剖面填充线'];
  spec.source.unknowns = spec.source.assumptions.filter((text) => /未标|未知|估算/.test(text));
  spec.source.reconstructionRule = '先完成视图、线型、拓扑和尺寸台账，再按干净二维轮廓建立同一坐标系模型。';
}
