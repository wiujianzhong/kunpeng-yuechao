// JWF1206 原PDF第16页：逐格按厂家剖面、三视图和明示尺寸建立。
// 坐标单位均为毫米，X=宽、Y=高、Z=深；名称信息与估算值只写在 assumptions。
const timingTeeth26 = Array.from({length: 26}, (_, index) => {
  const angle = (Math.PI * 2 * index) / 26;
  const radius = 34.5;
  return {
    type: 'box',
    size: [3.5, 6, 24.5],
    position: [Math.cos(angle) * radius, Math.sin(angle) * radius, -6.25],
    rotation: [0, 0, angle],
    material: 'darkMetal',
  };
});

const threadRings = [10, 14, 18, 22, 26].map((x) => ({
  type: 'torus',
  radius: 5.6,
  tube: 0.4,
  position: [x, 0, 0],
  rotation: [0, 1.5708, 0],
  material: 'darkMetal',
}));

export const jwf1206P16ModelSpecs = {
  'JWF1206-1300-1': {
    level: '轮廓级',
    material: 'metal',
    source: {
      page: 16,
      dimensions: ['φ75', '41'],
      views: ['轴向剖视图'],
      assumptions: ['最大外径75和轴向总长41按厂家图形区标注', '名称中的26Z只用于表达26齿，未写入厂家尺寸；齿距、齿高、齿宽、轮毂台阶和中心孔直径未标，按剖面比例估算'],
    },
    primitives: [
      {
        type: 'lathe',
        points: [[15, -20.5], [37.5, -20.5], [37.5, -18.5], [34.5, -18.5], [34.5, 6], [37.5, 6], [37.5, 8], [30, 8], [30, 20.5], [15, 20.5], [15, -20.5]],
        rotation: [1.5708, 0, 0],
      },
      ...timingTeeth26,
      { type: 'torus', radius: 36.2, tube: 1.3, position: [0, 0, -19.5], material: 'darkMetal' },
      { type: 'torus', radius: 36.2, tube: 1.3, position: [0, 0, 7], material: 'darkMetal' },
    ],
  },

  'JWF1206-1301': {
    level: '尺寸级',
    material: 'metal',
    source: {
      page: 16,
      dimensions: ['M12×55', '六角18'],
      views: ['轴向剖视图', '端视图'],
      assumptions: ['厂家中文为“撑杆”、英文误写MOTOR SPROCKET；模型只服从图形，按六角撑杆/调节支柱建立', '总长55、外螺纹M12和六角对边18按厂家标注；左端盲孔、锥底、六角段长度和螺距未标，按剖面比例估算'],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[10.392, 0], [5.196, 9], [-5.196, 9], [-10.392, 0], [-5.196, -9], [5.196, -9]],
        depth: 35,
        position: [-27.5, 0, 0],
        rotation: [0, 1.5708, 0],
        bevel: 0.6,
      },
      { type: 'cylinder', radius: 5, length: 18, axis: 'x', position: [-18.5, 0, 0], material: 'darkMetal' },
      { type: 'cylinder', radius: 6, length: 20, axis: 'x', position: [17.5, 0, 0] },
      ...threadRings,
    ],
  },

  'JWF1206-1302': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 16,
      dimensions: ['180×160'],
      views: ['正视平面图'],
      assumptions: ['板面外廓180×160按厂家标注', '板厚、圆角、中心孔、四个小孔及五个长圆槽的孔槽尺寸和定位均未标，按平面图比例估算'],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-82, -80], [82, -80], [90, -72], [90, 72], [82, 80], [-82, 80], [-90, 72], [-90, -72]],
        depth: 10,
        position: [0, 0, -5],
        bevel: 2,
        holes: [
          { kind: 'circle', center: [0, 0], radius: 40 },
          { kind: 'circle', center: [-45, -35], radius: 5 },
          { kind: 'circle', center: [45, -35], radius: 5 },
          { kind: 'circle', center: [-45, 35], radius: 5 },
          { kind: 'circle', center: [45, 35], radius: 5 },
          { kind: 'polygon', points: [[-78, -68], [-72, -74], [-66, -68], [-66, -35], [-72, -29], [-78, -35]] },
          { kind: 'polygon', points: [[66, -68], [72, -74], [78, -68], [78, -35], [72, -29], [66, -35]] },
          { kind: 'polygon', points: [[-78, 35], [-72, 29], [-66, 35], [-66, 68], [-72, 74], [-78, 68]] },
          { kind: 'polygon', points: [[66, 35], [72, 29], [78, 35], [78, 68], [72, 74], [66, 68]] },
          { kind: 'polygon', points: [[-20, 54], [-14, 48], [14, 48], [20, 54], [14, 60], [-14, 60]] },
        ],
      },
    ],
  },

  'JWF1206-1303': {
    level: '轮廓级',
    material: 'metal',
    source: {
      page: 16,
      dimensions: ['φ40×5'],
      views: ['轴向剖视图'],
      assumptions: ['外径40和厚度5按厂家标注', '中心孔直径未标，按剖面比例估算为15；两侧小倒角按1估算'],
    },
    primitives: [
      {
        type: 'lathe',
        points: [[7.5, -2.5], [19, -2.5], [20, -1.5], [20, 1.5], [19, 2.5], [7.5, 2.5], [7.5, -2.5]],
        rotation: [1.5708, 0, 0],
      },
    ],
  },
};
