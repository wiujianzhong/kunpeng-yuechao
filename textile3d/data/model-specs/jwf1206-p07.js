// JWF1206 原PDF第7页：逐格按厂家视图、轮廓和明示尺寸建立。
// 坐标单位均为毫米，X=宽、Y=高、Z=深；估算值只记录在 assumptions。
function roundedRectanglePoints(width, height, radius, segments = 5) {
  const points = [];
  const corners = [
    [width / 2 - radius, height / 2 - radius, 0],
    [-width / 2 + radius, height / 2 - radius, Math.PI / 2],
    [-width / 2 + radius, -height / 2 + radius, Math.PI],
    [width / 2 - radius, -height / 2 + radius, Math.PI * 1.5],
  ];
  for (const [centerX, centerY, startAngle] of corners) {
    for (let index = 0; index <= segments; index += 1) {
      const angle = startAngle + Math.PI / 2 * index / segments;
      points.push([centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius]);
    }
  }
  return points;
}

export const jwf1206P07ModelSpecs = {
  'JWF1206-0107': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 7,
      dimensions: ['700', '147.5'],
      views: ['正视图', '俯视图'],
      assumptions: ['本格未标板厚和折边高度，按4厚板、25高单侧折边估算', '中间连接边与两处底面加强条按两视图实体线建立', '两端圆形标记未给孔径且两向均重复表达，按连接点而非贯通孔处理'],
    },
    primitives: [
      { type: 'box', size: [700, 4, 147.5], position: [0, 0, 0] },
      { type: 'box', size: [700, 25, 4], position: [0, -12.5, -71.75] },
      { type: 'box', size: [4, 14, 147.5], position: [0, 5, 0], material: 'darkMetal' },
      { type: 'box', size: [4, 8, 116], position: [-260, 4, 14], material: 'darkMetal' },
      { type: 'box', size: [4, 8, 116], position: [260, 4, 14], material: 'darkMetal' },
    ],
  },

  'JWF1206-0108': {
    level: '尺寸级',
    material: 'paintedMetal',
    source: {
      page: 7,
      dimensions: ['105', '55', '131'],
      views: ['正视图', '截面图'],
      assumptions: ['U形槽外廓三向尺寸按原图；板厚未标，按3估算', '两处竖向长圆孔尺寸及定位未标，按正视轮廓比例估算为12×20、中心距约65'],
    },
    primitives: [
      { type: 'box', size: [105, 3, 131], position: [0, -26, 0] },
      {
        type: 'extrude',
        points: [[-52.5, -27.5], [52.5, -27.5], [52.5, 27.5], [-52.5, 27.5]],
        depth: 3,
        position: [0, 0, 62.5],
        holes: [
          { kind: 'polygon', points: [[-38.5,-6],[-36.5,-10],[-28.5,-10],[-26.5,-6],[-26.5,6],[-28.5,10],[-36.5,10],[-38.5,6]] },
          { kind: 'polygon', points: [[26.5,-6],[28.5,-10],[36.5,-10],[38.5,-6],[38.5,6],[36.5,10],[28.5,10],[26.5,6]] },
        ],
      },
      { type: 'box', size: [105, 55, 3], position: [0, 0, -64] },
      { type: 'box', size: [105, 3, 18], position: [0, 26, 56.5] },
      { type: 'box', size: [105, 3, 18], position: [0, 26, -56.5] },
    ],
  },

  'JWF1206-0109': {
    level: '尺寸级',
    material: 'paintedMetal',
    source: {
      page: 7,
      dimensions: ['105', '55', '66'],
      views: ['正视图', '截面图'],
      assumptions: ['U形槽外廓三向尺寸按原图；板厚未标，按3估算', '两处竖向长圆孔尺寸及定位未标，按正视轮廓比例估算为12×20、中心距约65'],
    },
    primitives: [
      { type: 'box', size: [105, 3, 66], position: [0, -26, 0] },
      {
        type: 'extrude',
        points: [[-52.5, -27.5], [52.5, -27.5], [52.5, 27.5], [-52.5, 27.5]],
        depth: 3,
        position: [0, 0, 30],
        holes: [
          { kind: 'polygon', points: [[-38.5,-6],[-36.5,-10],[-28.5,-10],[-26.5,-6],[-26.5,6],[-28.5,10],[-36.5,10],[-38.5,6]] },
          { kind: 'polygon', points: [[26.5,-6],[28.5,-10],[36.5,-10],[38.5,-6],[38.5,6],[36.5,10],[28.5,10],[26.5,6]] },
        ],
      },
      { type: 'box', size: [105, 55, 3], position: [0, 0, -31.5] },
      { type: 'box', size: [105, 3, 15], position: [0, 26, 25.5] },
      { type: 'box', size: [105, 3, 15], position: [0, 26, -25.5] },
    ],
  },

  'JWF1202-0101': {
    level: '尺寸级',
    material: 'paintedMetal',
    source: {
      page: 7,
      dimensions: ['88', '103', '65'],
      views: ['俯视图', '正视图', '侧视图'],
      assumptions: ['支架三向外廓按原图；板厚未标，按4估算', '前板左下斜角和右侧三角加强板按视图比例建立；三孔孔径和精确孔位未标，按比例估算'],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-51.5, -10], [-31.5, -32.5], [51.5, -32.5], [51.5, 32.5], [-51.5, 32.5]],
        depth: 4,
        position: [0, 0, 40],
        holes: [
          { kind: 'circle', center: [-24, 3], radius: 5 },
          { kind: 'circle', center: [15, -8], radius: 5 },
        ],
      },
      { type: 'box', size: [103, 4, 88], position: [0, 30.5, 0] },
      {
        type: 'extrude',
        points: [[-44, -32.5], [44, -32.5], [44, 32.5], [14, 32.5], [-44, -5]],
        depth: 4,
        position: [51.5, 0, 0],
        rotation: [0, 1.570796, 0],
        holes: [{ kind: 'circle', center: [20, -17], radius: 5 }],
        bevel: 1,
      },
    ],
  },

  'FA225-0159': {
    level: '轮廓级',
    material: 'glass',
    source: {
      page: 7,
      dimensions: ['390', '200'],
      views: ['正视轮廓'],
      assumptions: ['本格未标材质和厚度，结合名称按8厚透明观察板呈现', '四角圆弧半径未标，按正视轮廓比例估算约60'],
    },
    primitives: [
      {
        type: 'extrude',
        points: roundedRectanglePoints(390, 200, 60),
        depth: 8,
        position: [0, 0, -4],
      },
    ],
  },

  'DK760-0131': {
    level: '轮廓级',
    material: 'metal',
    source: {
      page: 7,
      dimensions: ['386.5'],
      views: ['侧视图', '俯视轮廓'],
      assumptions: ['本格只标总长；板宽按正视轮廓比例估算100，主体板厚按4估算', '右端叉口、三孔孔径/孔位及单侧下折加强边均按两视图比例估算；加强边使总厚约12'],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-193.25, -37], [193.25, -63], [193.25, -29], [133, -29], [133, 3], [193.25, 3], [193.25, 37], [-193.25, 63]],
        depth: 4,
        position: [0, 0, 0],
        holes: [
          { kind: 'circle', center: [-48, 28], radius: 6 },
          { kind: 'circle', center: [178, -48], radius: 6 },
          { kind: 'circle', center: [178, 28], radius: 6 },
        ],
      },
      { type: 'extrude', points: [[-163, -39], [163, -61], [163, -51], [-163, -29]], depth: 8, position: [0, 0, -6], material: 'darkMetal' },
    ],
  },

  'DK760-0132': {
    level: '轮廓级',
    material: 'metal',
    source: {
      page: 7,
      dimensions: ['386.5'],
      views: ['侧视图', '俯视轮廓'],
      assumptions: ['本格只标总长；板宽按正视轮廓比例估算100，主体板厚按4估算', '右端叉口、三孔孔径/孔位及单侧下折加强边均按两视图比例估算；加强边使总厚约12'],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-193.25, -63], [193.25, -37], [193.25, -3], [133, -3], [133, 29], [193.25, 29], [193.25, 63], [-193.25, 37]],
        depth: 4,
        position: [0, 0, 0],
        holes: [
          { kind: 'circle', center: [-48, -28], radius: 6 },
          { kind: 'circle', center: [178, -30], radius: 6 },
          { kind: 'circle', center: [178, 48], radius: 6 },
        ],
      },
      { type: 'extrude', points: [[-163, 29], [163, 51], [163, 61], [-163, 39]], depth: 8, position: [0, 0, -6], material: 'darkMetal' },
    ],
  },

  'DK760-0133': {
    level: '轮廓级',
    material: 'metal',
    source: {
      page: 7,
      dimensions: ['511.5'],
      views: ['侧视图', '俯视轮廓'],
      assumptions: ['本格只标总长；板宽按正视轮廓比例估算100，主体板厚按4估算', '左端叉口、两孔孔径/孔位及单侧下折加强边均按两视图比例估算；加强边使总厚约12'],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[255.75, -37], [-255.75, -63], [-255.75, -29], [-195, -29], [-195, 3], [-255.75, 3], [-255.75, 37], [255.75, 63]],
        depth: 4,
        position: [0, 0, 0],
        holes: [
          { kind: 'circle', center: [-238, -48], radius: 6 },
          { kind: 'circle', center: [-238, 22], radius: 6 },
        ],
      },
      { type: 'extrude', points: [[-226, -61], [226, -39], [226, -29], [-226, -51]], depth: 8, position: [0, 0, -6], material: 'darkMetal' },
    ],
  },

  'DK760-0134': {
    level: '轮廓级',
    material: 'metal',
    source: {
      page: 7,
      dimensions: ['511.5'],
      views: ['侧视图', '俯视轮廓'],
      assumptions: ['本格只标总长；板宽按正视轮廓比例估算100，主体板厚按4估算', '左端叉口、两孔孔径/孔位及单侧下折加强边均按两视图比例估算；加强边使总厚约12'],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[255.75, -63], [-255.75, -37], [-255.75, -3], [-195, -3], [-195, 29], [-255.75, 29], [-255.75, 63], [255.75, 37]],
        depth: 4,
        position: [0, 0, 0],
        holes: [
          { kind: 'circle', center: [-238, -30], radius: 6 },
          { kind: 'circle', center: [-238, 56], radius: 6 },
        ],
      },
      { type: 'extrude', points: [[-226, 61], [226, 39], [226, 29], [-226, 51]], depth: 8, position: [0, 0, -6], material: 'darkMetal' },
    ],
  },

  'DK760-0179': {
    level: '轮廓级',
    material: 'darkMetal',
    source: {
      page: 7,
      dimensions: ['600', '287'],
      views: ['正视图', '侧视图', '俯视图'],
      assumptions: ['本格未标厚度，按端视轮廓比例估算35', '四角小十字在三视图中没有闭合孔轮廓，按连接/定位标记处理，不作为贯通孔'],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-300, -143.5], [300, -143.5], [300, 143.5], [-300, 143.5]],
        depth: 35,
        position: [0, 0, -17.5],
      },
    ],
  },

  'JWF1204-0103': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 7,
      dimensions: ['60', '565'],
      views: ['正视图', '侧视轮廓'],
      assumptions: ['本格未标深度和壁厚，按40总深的闭合罩壳外轮廓呈现，内部空腔不作为已知结构', '侧视中的上段深腔、中段浅台阶和底部折边长度按图面比例建立'],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-20,-282.5],[20,-282.5],[20,-249.5],[12,-249.5],[12,113.5],[20,113.5],[20,282.5],[-20,282.5]],
        depth: 60,
        rotation: [0, 1.570796, 0],
      },
    ],
  },

  'JWF1204-0137': {
    level: '轮廓级',
    material: 'glass',
    source: {
      page: 7,
      dimensions: ['580', '300'],
      views: ['正视轮廓'],
      assumptions: ['本格未标材质和厚度，结合名称按8厚透明观察板呈现', '四角圆弧半径未标，按正视轮廓比例估算约90'],
    },
    primitives: [
      {
        type: 'extrude',
        points: roundedRectanglePoints(580, 300, 90),
        depth: 8,
        position: [0, 0, -4],
      },
    ],
  },

  'JWF1204-0147': {
    level: '轮廓级',
    material: 'glass',
    source: {
      page: 7,
      dimensions: ['390', '300'],
      views: ['正视轮廓'],
      assumptions: ['本格未标材质和厚度，结合名称按8厚透明观察板呈现', '四角圆弧半径未标，按正视轮廓比例估算约50'],
    },
    primitives: [
      {
        type: 'extrude',
        points: roundedRectanglePoints(390, 300, 50),
        depth: 8,
        position: [0, 0, -4],
      },
    ],
  },
};

for (const [partCode, spec] of Object.entries(jwf1206P07ModelSpecs)) {
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
