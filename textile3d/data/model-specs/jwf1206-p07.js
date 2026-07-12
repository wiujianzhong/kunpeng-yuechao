// JWF1206 原PDF第7页：逐格按厂家视图、轮廓和明示尺寸建立。
// 坐标单位均为毫米，X=宽、Y=高、Z=深；估算值只记录在 assumptions。
export const jwf1206P07ModelSpecs = {
  'JWF1206-0107': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 7,
      dimensions: ['700', '147.5'],
      views: ['正视图', '俯视图'],
      assumptions: ['本格未标板厚和折边高度，按4厚板、25高折边估算', '中间连接/加强边按两视图轮廓建立，安装孔直径未标而未开孔'],
    },
    primitives: [
      { type: 'box', size: [700, 4, 147.5], position: [0, 0, 0] },
      { type: 'box', size: [700, 25, 4], position: [0, -12.5, 71.75] },
      { type: 'box', size: [700, 25, 4], position: [0, -12.5, -71.75] },
      { type: 'box', size: [4, 14, 147.5], position: [0, 5, 0], material: 'darkMetal' },
    ],
  },

  'JWF1206-0108': {
    level: '尺寸级',
    material: 'paintedMetal',
    source: {
      page: 7,
      dimensions: ['105', '55', '131'],
      views: ['正视图', '截面图'],
      assumptions: ['U形槽外廓三向尺寸按原图；板厚未标，按3估算', '两孔直径及定位未标，按正视图比例估算为半径7'],
    },
    primitives: [
      { type: 'box', size: [105, 3, 131], position: [0, -26, 0] },
      {
        type: 'extrude',
        points: [[-52.5, -27.5], [52.5, -27.5], [52.5, 27.5], [-52.5, 27.5]],
        depth: 3,
        position: [0, 0, 62.5],
        holes: [
          { kind: 'circle', center: [-25, 7], radius: 7 },
          { kind: 'circle', center: [25, 7], radius: 7 },
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
      assumptions: ['U形槽外廓三向尺寸按原图；板厚未标，按3估算', '两孔直径及定位未标，按正视图比例估算为半径7'],
    },
    primitives: [
      { type: 'box', size: [105, 3, 66], position: [0, -26, 0] },
      {
        type: 'extrude',
        points: [[-52.5, -27.5], [52.5, -27.5], [52.5, 27.5], [-52.5, 27.5]],
        depth: 3,
        position: [0, 0, 30],
        holes: [
          { kind: 'circle', center: [-25, 7], radius: 7 },
          { kind: 'circle', center: [25, 7], radius: 7 },
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
      assumptions: ['支架三向外廓按原图；板厚未标，按4估算', '前板左下斜角和侧向三角加强板按视图比例建立；孔径和精确孔位未标，按比例估算'],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-51.5, -10], [-31.5, -32.5], [51.5, -32.5], [51.5, 32.5], [-51.5, 32.5]],
        depth: 4,
        position: [0, 0, 40],
        holes: [
          { kind: 'circle', center: [-23, -4], radius: 5 },
          { kind: 'circle', center: [19, -12], radius: 5 },
        ],
      },
      { type: 'box', size: [103, 4, 88], position: [0, 30.5, 0] },
      {
        type: 'extrude',
        points: [[-44, -32.5], [44, -32.5], [44, 32.5], [14, 32.5], [-44, -5]],
        depth: 4,
        position: [-51.5, 0, 0],
        rotation: [0, 1.570796, 0],
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
      assumptions: ['本格未标材质和厚度，按8厚透明观察板呈现', '四角圆弧半径未标，按图面轮廓估算约35'],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-160, -100], [160, -100], [180, -92], [192, -75], [195, -45], [195, 45], [192, 75], [180, 92], [160, 100], [-160, 100], [-180, 92], [-192, 75], [-195, 45], [-195, -45], [-192, -75], [-180, -92]],
        depth: 8,
        position: [0, 0, -4],
        bevel: 3,
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
      assumptions: ['本格只标总长；板宽按120、厚度按12估算', '右端叉口、锥度、三孔直径和位置均按俯视图比例估算'],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-193.25, -60], [193.25, -35], [193.25, -18], [140, -18], [140, 18], [193.25, 18], [193.25, 55], [-193.25, 60]],
        depth: 12,
        position: [0, 0, -6],
        holes: [
          { kind: 'circle', center: [-65, -18], radius: 6 },
          { kind: 'circle', center: [175, -29], radius: 6 },
          { kind: 'circle', center: [175, 42], radius: 6 },
        ],
        bevel: 1,
      },
    ],
  },

  'DK760-0132': {
    level: '轮廓级',
    material: 'metal',
    source: {
      page: 7,
      dimensions: ['386.5'],
      views: ['侧视图', '俯视轮廓'],
      assumptions: ['本格只标总长；板宽按120、厚度按12估算', '右端叉口、锥度、三孔直径和位置均按俯视图比例估算'],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-193.25, -60], [193.25, -55], [193.25, -18], [140, -18], [140, 18], [193.25, 18], [193.25, 35], [-193.25, 60]],
        depth: 12,
        position: [0, 0, -6],
        holes: [
          { kind: 'circle', center: [-48, 18], radius: 6 },
          { kind: 'circle', center: [175, -42], radius: 6 },
          { kind: 'circle', center: [175, 29], radius: 6 },
        ],
        bevel: 1,
      },
    ],
  },

  'DK760-0133': {
    level: '轮廓级',
    material: 'metal',
    source: {
      page: 7,
      dimensions: ['511.5'],
      views: ['侧视图', '俯视轮廓'],
      assumptions: ['本格只标总长；板宽按135、厚度按12估算', '左端叉口、锥度、两孔直径和位置均按俯视图比例估算'],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[255.75, -67.5], [-255.75, -45], [-255.75, -18], [-205, -18], [-205, 18], [-255.75, 18], [-255.75, 45], [255.75, 67.5]],
        depth: 12,
        position: [0, 0, -6],
        holes: [
          { kind: 'circle', center: [-238, -31], radius: 6 },
          { kind: 'circle', center: [-238, 31], radius: 6 },
        ],
        bevel: 1,
      },
    ],
  },

  'DK760-0134': {
    level: '轮廓级',
    material: 'metal',
    source: {
      page: 7,
      dimensions: ['511.5'],
      views: ['侧视图', '俯视轮廓'],
      assumptions: ['本格只标总长；板宽按135、厚度按12估算', '左端叉口、锥度、两孔直径和位置均按俯视图比例估算'],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[255.75, -45], [-255.75, -67.5], [-255.75, -18], [-205, -18], [-205, 18], [-255.75, 18], [-255.75, 67.5], [255.75, 45]],
        depth: 12,
        position: [0, 0, -6],
        holes: [
          { kind: 'circle', center: [-238, -31], radius: 6 },
          { kind: 'circle', center: [-238, 31], radius: 6 },
        ],
        bevel: 1,
      },
    ],
  },

  'DK760-0179': {
    level: '轮廓级',
    material: 'darkMetal',
    source: {
      page: 7,
      dimensions: ['600', '287'],
      views: ['正视图', '侧视图', '俯视图'],
      assumptions: ['本格未标厚度，按35估算', '四角小安装孔的直径和孔位未标，按视图比例估算为半径5'],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-300, -143.5], [300, -143.5], [300, 143.5], [-300, 143.5]],
        depth: 35,
        position: [0, 0, -17.5],
        holes: [
          { kind: 'circle', center: [-255, -105], radius: 5 },
          { kind: 'circle', center: [255, -105], radius: 5 },
          { kind: 'circle', center: [-255, 105], radius: 5 },
          { kind: 'circle', center: [255, 105], radius: 5 },
        ],
        bevel: 2,
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
      assumptions: ['本格未标深度和板厚，按40深、4厚折弯罩壳估算', '侧视中的中段台阶深度及端部折边按图面比例建立'],
    },
    primitives: [
      { type: 'box', size: [60, 565, 4], position: [0, 0, 18] },
      { type: 'box', size: [4, 565, 40], position: [-28, 0, 0] },
      { type: 'box', size: [4, 565, 40], position: [28, 0, 0] },
      { type: 'box', size: [52, 470, 4], position: [0, 0, -18], material: 'darkMetal' },
      { type: 'box', size: [52, 4, 40], position: [0, 232, 0] },
      { type: 'box', size: [52, 4, 40], position: [0, -232, 0] },
    ],
  },

  'JWF1204-0137': {
    level: '轮廓级',
    material: 'glass',
    source: {
      page: 7,
      dimensions: ['580', '300'],
      views: ['正视轮廓'],
      assumptions: ['本格未标材质和厚度，按8厚透明观察板呈现', '四角圆弧半径未标，按图面轮廓估算约45'],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-245, -150], [245, -150], [270, -140], [285, -115], [290, -75], [290, 75], [285, 115], [270, 140], [245, 150], [-245, 150], [-270, 140], [-285, 115], [-290, 75], [-290, -75], [-285, -115], [-270, -140]],
        depth: 8,
        position: [0, 0, -4],
        bevel: 3,
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
      assumptions: ['本格未标材质和厚度，按8厚透明观察板呈现', '四角圆弧半径未标，按图面轮廓估算约45'],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-150, -150], [150, -150], [175, -140], [190, -115], [195, -75], [195, 75], [190, 115], [175, 140], [150, 150], [-150, 150], [-175, 140], [-190, 115], [-195, 75], [-195, -75], [-190, -115], [-175, -140]],
        depth: 8,
        position: [0, 0, -4],
        bevel: 3,
      },
    ],
  },
};
