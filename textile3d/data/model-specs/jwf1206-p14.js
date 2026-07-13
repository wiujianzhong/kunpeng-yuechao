const circlePoints = (radius, segments = 64) => Array.from({ length: segments }, (_, index) => {
  const angle = index / segments * Math.PI * 2;
  return [Math.cos(angle) * radius, Math.sin(angle) * radius];
});

const circleHole = (x, y, radius) => ({ kind: 'circle', center: [x, y], radius });

export const jwf1206P14ModelSpecs = {
  'FA221D-1107': {
    level: '轮廓级',
    material: 'metal',
    source: {
      page: 14,
      dimensions: ['六角24×16', '台阶厚8'],
      views: ['侧视图', '俯视图'],
      assumptions: [
        '厂家明确标注六角对边24毫米、总高16毫米、上部台阶高8毫米。',
        '六角外接圆半径按对边24换算为13.856毫米；上部圆台外径未标，按俯视比例估算为18毫米。',
        '偏心孔直径和偏心距均未标，按俯视轮廓估算为孔径10毫米、偏心距2.5毫米；上下两级共用真实贯穿孔，不用深色圆柱冒充。',
      ],
    },
    primitives: [
      {
        type: 'extrude', points: circlePoints(13.856, 6), depth: 8, position: [0, -4, 0], rotation: [1.5708, 0, 0],
        holes: [circleHole(2.5, 0, 5)], bevel: 0.4, material: 'metal',
      },
      {
        type: 'extrude', points: circlePoints(9), depth: 8, position: [0, 4, 0], rotation: [1.5708, 0, 0],
        holes: [circleHole(2.5, 0, 5)], bevel: 0.4, material: 'metal',
      },
    ],
  },

  'FA221D-1108': {
    level: '轮廓级',
    material: 'metal',
    source: {
      page: 14,
      dimensions: ['75', '106', '90', '54'],
      views: ['正视图', '侧视图'],
      assumptions: [
        '按正视标注将75解释为主轴心至底脚基准距离，将106解释为主轴心至右端支承孔中心距离；右孔中心按图面约20度方向分解为X=99.6、Y=36.3毫米。',
        '按侧视标注将主轴承座体高度90毫米、右端支承段高度54毫米落实到两级座体；Z向厚度未标，主座与右座分别按40、32毫米估算。',
        '主轴孔、右端孔、四个法兰孔、左上耳孔和各加强臂宽度未标，均按两视图比例估算，因此只评为轮廓级。',
        '所有孔均按原图白区建立为贯穿负空间，不使用深色实心圆柱替代。',
      ],
    },
    primitives: [
      {
        type: 'extrude', points: circlePoints(45), depth: 40,
        holes: [circleHole(0, 0, 31), circleHole(-31, 24, 4), circleHole(31, 24, 4), circleHole(-31, -24, 4), circleHole(31, -24, 4)],
        bevel: 1.2, material: 'metal',
      },
      { type: 'box', size: [110, 12, 40], position: [52, 26, 0], rotation: [0, 0, 0.35], material: 'metal' },
      { type: 'box', size: [105, 12, 40], position: [51, 8, 0], rotation: [0, 0, 0.1], material: 'metal' },
      { type: 'extrude', points: circlePoints(27), depth: 32, position: [99.6, 36.3, 0], holes: [circleHole(0, 0, 12)], bevel: 1, material: 'metal' },
      { type: 'extrude', points: circlePoints(13), depth: 28, position: [-34, 54, 0], holes: [circleHole(0, 0, 4)], bevel: 0.8, material: 'metal' },
      { type: 'box', size: [24, 46, 28], position: [-22, 38, 0], rotation: [0, 0, -0.55], material: 'metal' },
      { type: 'box', size: [58, 14, 40], position: [1, -68, 0], rotation: [0, 0, 0], material: 'darkMetal' },
      { type: 'box', size: [18, 34, 30], position: [4, -58, 0], rotation: [0, 0, 0], material: 'metal' },
    ],
  },

  'FA221D-1109': {
    level: '轮廓级',
    material: 'metal',
    source: {
      page: 14,
      dimensions: ['φ87', '147', '37'],
      views: ['正视图', '侧视图'],
      assumptions: [
        '正视图中的φ87按四个等分安装孔共同所在的分布圆解释，四孔中心半径取43.5毫米。',
        '厂家明确标注含左右安装耳总宽147毫米、Z向总厚37毫米；圆形座体外径、中心轴承孔径及安装孔径未标。',
        '圆形座体外径按110毫米、中心孔按70毫米、安装孔按6毫米估算；两级轴向台阶依侧视轮廓建立，因此只评为轮廓级。',
        '中心孔、四个分布孔和左右耳孔均为真实负空间；旧凸起圆环和深色实心假孔已删除。',
      ],
    },
    primitives: [
      {
        type: 'extrude',
        points: circlePoints(55),
        depth: 12,
        holes: [
          circleHole(0, 43.5, 3), circleHole(43.5, 0, 3),
          circleHole(0, -43.5, 3), circleHole(-43.5, 0, 3),
          circleHole(0, 0, 35),
        ],
        position: [0, 0, -12.5],
        rotation: [0, 0, 0],
        bevel: 1.5,
        material: 'metal',
      },
      {
        type: 'extrude',
        points: circlePoints(45),
        depth: 25,
        holes: [circleHole(0, 0, 35)],
        position: [0, 0, 6],
        rotation: [0, 0, 0],
        bevel: 1.2,
        material: 'metal',
      },
      { type: 'box', size: [37, 20, 12], position: [-55, 0, -12.5], rotation: [0, 0, 0], material: 'metal' },
      { type: 'box', size: [37, 20, 12], position: [55, 0, -12.5], rotation: [0, 0, 0], material: 'metal' },
      { type: 'extrude', points: circlePoints(9.25), depth: 12, position: [-64.25, 0, -12.5], holes: [circleHole(0, 0, 4)], bevel: 0.6, material: 'metal' },
      { type: 'extrude', points: circlePoints(9.25), depth: 12, position: [64.25, 0, -12.5], holes: [circleHole(0, 0, 4)], bevel: 0.6, material: 'metal' },
    ],
  },

  'FA221D-1110': {
    level: '尺寸级',
    material: 'paintedMetal',
    source: {
      page: 14,
      dimensions: ['100×48×3'],
      views: ['正视图'],
      assumptions: [
        '厂家明确标注X向100毫米、Y向48毫米、Z向板厚3毫米。',
        '两个安装孔孔径和孔中心位置未标注，按正视图比例估算为直径6毫米。',
      ],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-50, -24], [50, -24], [50, 24], [-50, 24]],
        depth: 3,
        holes: [circleHole(-7, -14, 3), circleHole(43, 14, 3)],
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        bevel: 0.5,
        material: 'paintedMetal',
      },
    ],
  },

  'FA221D-1111': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 14,
      dimensions: ['88×50'],
      views: ['斜视投影', '俯视图'],
      assumptions: [
        '厂家明确标注安装底面X向88毫米、Z向50毫米；板厚、立板高度和折弯角未标。',
        '依据两视图判定为折弯支架：底面有一大孔，斜立面有两个小孔；板厚按3毫米、立板宽50毫米、折弯角约65度估算。',
        '三孔孔径、孔位及左端倒角未标，按图面比例建立，因此只评为轮廓级。',
      ],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-44, -25], [44, -25], [44, 25], [-38, 25], [-44, 19]],
        depth: 3,
        holes: [circleHole(-25, 0, 8)],
        position: [0, 0, 0],
        rotation: [1.5708, 0, 0],
        bevel: 0.6,
        material: 'paintedMetal',
      },
      {
        type: 'extrude',
        points: [[-44, -25], [44, -25], [44, 25], [-38, 25], [-44, 19]],
        depth: 3,
        holes: [circleHole(-17, -3, 3), circleHole(26, 12, 3)],
        position: [0, 27, -22],
        rotation: [-1.1345, 0, 0],
        bevel: 0.6,
        material: 'paintedMetal',
      },
    ],
  },

  'FA221D-1120': {
    level: '尺寸级',
    material: 'metal',
    source: {
      page: 14,
      dimensions: ['φ8×61'],
      views: ['外形图'],
      assumptions: [
        '厂家明确标注最大轴身直径8毫米、总长61毫米。',
        '左端倒角、中央缩颈直径与长度、两侧锥肩及右端挡边外径均未标，按外形比例估算。',
      ],
    },
    primitives: [
      { type: 'cylinder', radiusTop: 4, radiusBottom: 3, length: 3, axis: 'x', position: [-29, 0, 0], rotation: [0, 0, 0], material: 'metal' },
      { type: 'cylinder', radius: 4, length: 22, axis: 'x', position: [-16.5, 0, 0], rotation: [0, 0, 0], material: 'metal' },
      { type: 'cylinder', radiusTop: 2, radiusBottom: 4, length: 4, axis: 'x', position: [-3.5, 0, 0], rotation: [0, 0, 0], material: 'metal' },
      { type: 'cylinder', radius: 2, length: 8, axis: 'x', position: [2.5, 0, 0], rotation: [0, 0, 0], material: 'darkMetal' },
      { type: 'cylinder', radiusTop: 4, radiusBottom: 2, length: 4, axis: 'x', position: [8.5, 0, 0], rotation: [0, 0, 0], material: 'metal' },
      { type: 'cylinder', radius: 4, length: 16, axis: 'x', position: [18.5, 0, 0], rotation: [0, 0, 0], material: 'metal' },
      { type: 'cylinder', radius: 6, length: 4, axis: 'x', position: [28.5, 0, 0], rotation: [0, 0, 0], material: 'darkMetal' },
    ],
  },

  'FA221D-1123': {
    level: '尺寸级',
    material: 'metal',
    source: {
      page: 14,
      dimensions: ['φ100/φ87×13'],
      views: ['正视图', '剖视图'],
      assumptions: [
        '厂家明确标注外径100毫米、四孔分布圆直径87毫米、Z向总厚13毫米。',
        '四个安装孔孔径、中央凹腔直径、底厚和中心小孔未标，按正视及剖视比例估算。',
        '本件按较浅凹腔和带中心小孔的13毫米轴承盖建立，与FA221D-1124的15毫米深腔结构分开建模。',
      ],
    },
    primitives: [
      {
        type: 'extrude',
        points: circlePoints(50),
        depth: 4,
        holes: [
          circleHole(0, 43.5, 3), circleHole(43.5, 0, 3),
          circleHole(0, -43.5, 3), circleHole(-43.5, 0, 3),
          circleHole(0, 0, 7),
        ],
        position: [0, 0, -4.5],
        rotation: [0, 0, 0],
        bevel: 0.8,
        material: 'metal',
      },
      {
        type: 'extrude',
        points: circlePoints(40),
        depth: 9,
        holes: [circleHole(0, 0, 35)],
        position: [0, 0, 2],
        rotation: [0, 0, 0],
        bevel: 0.8,
        material: 'metal',
      },
      {
        type: 'extrude',
        points: circlePoints(35),
        depth: 5,
        holes: [circleHole(0, 0, 7)],
        position: [0, 0, -0.5],
        rotation: [0, 0, 0],
        bevel: 0.5,
        material: 'darkMetal',
      },
    ],
  },

  'FA221D-1124': {
    level: '尺寸级',
    material: 'metal',
    source: {
      page: 14,
      dimensions: ['φ100/φ87×15'],
      views: ['正视图', '剖视图'],
      assumptions: [
        '厂家明确标注外径100毫米、四孔分布圆直径87毫米、Z向总厚15毫米。',
        '四个安装孔孔径、中央凹腔直径、底厚及圆角未标，按剖视比例估算。',
        '本件按无中心小孔、较深凹腔和15毫米总厚建立，不能与FA221D-1123共用同一盖体。',
      ],
    },
    primitives: [
      {
        type: 'extrude',
        points: circlePoints(50),
        depth: 5,
        holes: [
          circleHole(0, 43.5, 3), circleHole(43.5, 0, 3),
          circleHole(0, -43.5, 3), circleHole(-43.5, 0, 3),
        ],
        position: [0, 0, -5],
        rotation: [0, 0, 0],
        bevel: 0.8,
        material: 'metal',
      },
      {
        type: 'extrude',
        points: circlePoints(41),
        depth: 10,
        holes: [circleHole(0, 0, 33)],
        position: [0, 0, 2.5],
        rotation: [0, 0, 0],
        bevel: 0.8,
        material: 'metal',
      },
      { type: 'cylinder', radius: 33, length: 3.5, axis: 'z', position: [0, 0, -0.75], rotation: [0, 0, 0], material: 'darkMetal' },
    ],
  },

  'FA221D-1125': {
    level: '尺寸级',
    material: 'plastic',
    source: {
      page: 14,
      dimensions: ['φ76/φ72×24'],
      views: ['剖视图'],
      assumptions: [
        '厂家明确标注外径76毫米、内径72毫米、轴向长度24毫米，单边壁厚由此为2毫米。',
        '厂家未标绝缘材料牌号，按非金属工程塑料材质表达，不按金属套筒渲染。',
      ],
    },
    primitives: [
      { type: 'extrude', points: circlePoints(38), depth: 24, holes: [circleHole(0, 0, 36)], position: [0, 0, 0], rotation: [0, 0, 0], bevel: 0.5, material: 'plastic' },
    ],
  },

  'FA221D-1126': {
    level: '尺寸级',
    material: 'plastic',
    source: {
      page: 14,
      dimensions: ['φ76/φ63×2'],
      views: ['剖视图'],
      assumptions: [
        '厂家明确标注外径76毫米、内径63毫米、厚2毫米。',
        '厂家未标绝缘材料牌号，按非金属绝缘垫片表达；该件与φ84/φ73及3毫米厚垫片分别建模。',
      ],
    },
    primitives: [
      { type: 'extrude', points: circlePoints(38), depth: 2, holes: [circleHole(0, 0, 31.5)], position: [0, 0, 0], rotation: [0, 0, 0], bevel: 0.2, material: 'plastic' },
    ],
  },

  'FA221D-1127': {
    level: '尺寸级',
    material: 'plastic',
    source: {
      page: 14,
      dimensions: ['φ76/φ72×26.5'],
      views: ['剖视图'],
      assumptions: [
        '厂家明确标注外径76毫米、内径72毫米、轴向长度26.5毫米，单边壁厚2毫米。',
        '厂家未标绝缘材料牌号，按非金属工程塑料材质表达；长度与24、38毫米两种绝缘套严格区分。',
      ],
    },
    primitives: [
      { type: 'extrude', points: circlePoints(38), depth: 26.5, holes: [circleHole(0, 0, 36)], position: [0, 0, 0], rotation: [0, 0, 0], bevel: 0.5, material: 'plastic' },
    ],
  },

  'FA221D-1128': {
    level: '尺寸级',
    material: 'plastic',
    source: {
      page: 14,
      dimensions: ['φ76/φ63×3'],
      views: ['剖视图'],
      assumptions: [
        '厂家明确标注外径76毫米、内径63毫米、厚3毫米。',
        '厂家未标绝缘材料牌号，按非金属绝缘垫片表达；与同孔径但2毫米厚的FA221D-1126分开建模。',
      ],
    },
    primitives: [
      { type: 'extrude', points: circlePoints(38), depth: 3, holes: [circleHole(0, 0, 31.5)], position: [0, 0, 0], rotation: [0, 0, 0], bevel: 0.25, material: 'plastic' },
    ],
  },

  'FA221D-1129': {
    level: '尺寸级',
    material: 'plastic',
    source: {
      page: 14,
      dimensions: ['φ76/φ72×38'],
      views: ['剖视图'],
      assumptions: [
        '厂家明确标注外径76毫米、内径72毫米、轴向长度38毫米，单边壁厚2毫米。',
        '厂家未标绝缘材料牌号，按非金属工程塑料材质表达；该件为本页三种同径绝缘套中最长者。',
      ],
    },
    primitives: [
      { type: 'extrude', points: circlePoints(38), depth: 38, holes: [circleHole(0, 0, 36)], position: [0, 0, 0], rotation: [0, 0, 0], bevel: 0.5, material: 'plastic' },
    ],
  },

  'FA221D-1130': {
    level: '尺寸级',
    material: 'plastic',
    source: {
      page: 14,
      dimensions: ['φ84/φ73×3'],
      views: ['剖视图'],
      assumptions: [
        '厂家明确标注外径84毫米、内径73毫米、厚3毫米。',
        '厂家未标绝缘材料牌号，按非金属绝缘垫片表达；外径、孔径均与φ76/φ63垫片不同。',
      ],
    },
    primitives: [
      { type: 'extrude', points: circlePoints(42), depth: 3, holes: [circleHole(0, 0, 36.5)], position: [0, 0, 0], rotation: [0, 0, 0], bevel: 0.25, material: 'plastic' },
    ],
  },

  'FA221D-1134': {
    level: '尺寸级',
    material: 'metal',
    source: {
      page: 14,
      dimensions: ['φ32/φ28×8'],
      views: ['正视图', '侧视图'],
      assumptions: [
        '厂家明确标注外径32毫米、内径28毫米、轴向长度8毫米，单边壁厚2毫米。',
        '名称为隔圈且未注明绝缘，按机加工金属隔圈材质处理，不能套用本页绝缘塑料套材质。',
      ],
    },
    primitives: [
      { type: 'extrude', points: circlePoints(16), depth: 8, holes: [circleHole(0, 0, 14)], position: [0, 0, 0], rotation: [0, 0, 0], bevel: 0.35, material: 'metal' },
    ],
  },
};

for (const [partCode, spec] of Object.entries(jwf1206P14ModelSpecs)) {
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
