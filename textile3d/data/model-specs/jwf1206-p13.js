// JWF1206 原PDF第13页：逐格按厂家三视图、剖面和明示尺寸建立。
// 坐标单位均为毫米，X=宽、Y=高、Z=深；估算参数只记录在 assumptions。
const helixX = (start, end, turns, radius, segments = 80) => Array.from({length: segments + 1}, (_, index) => {
  const t = index / segments;
  const angle = Math.PI * 2 * turns * t;
  return [start + (end - start) * t, Math.cos(angle) * radius, Math.sin(angle) * radius];
});

const clusteredSpringPoints = Array.from({length: 161}, (_, index) => {
  const t = index / 160;
  const angle = Math.PI * 2 * 10 * t;
  let x;
  if (t <= 0.45) x = -69.45 + (t / 0.45) * 39.45;
  else if (t < 0.55) x = -30 + ((t - 0.45) / 0.1) * 60;
  else x = 30 + ((t - 0.55) / 0.45) * 39.45;
  return [x, Math.cos(angle) * 16.2, Math.sin(angle) * 16.2];
});

const threadRingsX = (positions, radius, tube = 0.35) => positions.map((x) => ({
  type: 'torus',
  radius,
  tube,
  position: [x, 0, 0],
  rotation: [0, 1.5708, 0],
  material: 'darkMetal',
}));

export const jwf1206P13ModelSpecs = {
  'FA225-1100-1': {
    level: '轮廓级',
    material: 'plastic',
    source: {
      page: 13,
      dimensions: ['M12', '长36'],
      views: ['轴向剖视图'],
      assumptions: ['螺纹大径按M12、旋入段长度按36建立', '手轮直径、内置弹簧、导套、垫片和台阶长度未标，按剖面比例估算；手轮材质未标，按工业塑料握柄呈现'],
    },
    primitives: [
      {
        type: 'lathe',
        points: [[0.1, -12], [16, -12], [22, -6], [23, 2], [20, 8], [14, 11], [0.1, 11], [0.1, -12]],
        position: [-22, 0, 0],
        rotation: [0, 0, -1.5708],
      },
      {
        type: 'lathe',
        points: [[6, -3], [12, -3], [12, 3], [6, 3], [6, -3]],
        position: [-5, 0, 0],
        rotation: [0, 0, -1.5708],
        material: 'metal',
      },
      { type: 'cylinder', radius: 10, length: 22, axis: 'x', position: [7, 0, 0], material: 'metal' },
      { type: 'tube', points: helixX(-1, 19, 5, 8, 60), radius: 1, material: 'metal' },
      { type: 'cylinder', radius: 5.5, length: 36, axis: 'x', position: [18, 0, 0], material: 'metal' },
      ...threadRingsX([8, 13, 18, 23, 28, 33], 5.6, 0.4),
    ],
  },

  'FA225-1100-2A': {
    level: '尺寸级',
    material: 'paintedMetal',
    source: {
      page: 13,
      dimensions: ['157×125×95'],
      views: ['正视图', '侧视图', '俯视图'],
      assumptions: ['三向总体外廓按厂家标注', 'C形开口宽高、板厚、折边和孔径未标，按三视图比例估算'],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-62.5, -78.5], [62.5, -78.5], [62.5, -55], [10, -55], [10, 55], [62.5, 55], [62.5, 78.5], [-62.5, 78.5]],
        depth: 4,
        position: [0, 0, -47.5],
        bevel: 1,
      },
      {
        type: 'extrude',
        points: [[-62.5, -78.5], [62.5, -78.5], [62.5, -55], [10, -55], [10, 55], [62.5, 55], [62.5, 78.5], [-62.5, 78.5]],
        depth: 4,
        position: [0, 0, 43.5],
        bevel: 1,
      },
      { type: 'box', size: [125, 4, 95], position: [0, -76.5, 0] },
      { type: 'box', size: [125, 4, 95], position: [0, 76.5, 0] },
      { type: 'box', size: [4, 157, 95], position: [-60.5, 0, 0] },
    ],
  },

  'FA225-1100-13A': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 13,
      dimensions: ['207×196', '接口φ99'],
      views: ['轴向剖视/侧视图'],
      assumptions: ['总高207、轴向总长196和圆接口直径99按厂家标注', '左侧上下吸入口的深度、圆锥过渡起止位置和板厚未标，按剖面比例估算为空心罩体'],
    },
    primitives: [
      { type: 'box', size: [63, 70, 100], position: [-66.5, 68.5, 0] },
      { type: 'box', size: [63, 70, 100], position: [-66.5, -68.5, 0] },
      { type: 'cylinder', radiusTop: 49.5, radiusBottom: 103.5, length: 70, axis: 'x', position: [0, 0, 0] },
      { type: 'cylinder', radius: 49.5, length: 63, axis: 'x', position: [66.5, 0, 0] },
      { type: 'torus', radius: 49.5, tube: 2, position: [98, 0, 0], rotation: [0, 1.5708, 0], material: 'darkMetal' },
    ],
  },

  'JWF1206-1101': {
    level: '尺寸级',
    material: 'paintedMetal',
    source: {
      page: 13,
      dimensions: ['190×50×30'],
      views: ['正视轮廓', '侧视图'],
      assumptions: ['三向最大外廓按厂家标注', '下部曲线、过渡台阶及两孔直径/孔位未标，按两视图比例估算'],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-25, -95], [18, -95], [25, -80], [10, -55], [5, -28], [8, -8], [25, 0], [25, 95], [-25, 95]],
        depth: 30,
        position: [0, 0, -15],
        bevel: 1,
      },
    ],
  },

  'JWF1206-1102': {
    level: '尺寸级',
    material: 'paintedMetal',
    source: {
      page: 13,
      dimensions: ['190×50×30'],
      views: ['正视轮廓', '侧视图'],
      assumptions: ['三向最大外廓按厂家标注', '下部曲线、过渡台阶及两孔直径/孔位未标，按两视图比例估算；轮廓与左侧板镜像'],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[25, -95], [-18, -95], [-25, -80], [-10, -55], [-5, -28], [-8, -8], [-25, 0], [-25, 95], [25, 95]],
        depth: 30,
        position: [0, 0, -15],
        bevel: 1,
      },
    ],
  },

  'JWF1206-1103': {
    level: '尺寸级',
    material: 'metal',
    source: {
      page: 13,
      dimensions: ['M8×115', '六角14'],
      views: ['主视图', '端视图'],
      assumptions: ['总长115、两端M8及中段六角对边14按厂家标注', '中段六角体长度和两端螺纹长度未标，按主视图比例估算为90和各12.5；螺距仅作视觉环纹'],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[8.083, 0], [4.041, 7], [-4.041, 7], [-8.083, 0], [-4.041, -7], [4.041, -7]],
        depth: 90,
        position: [-45, 0, 0],
        rotation: [0, 1.5708, 0],
        bevel: 0.5,
      },
      { type: 'cylinder', radius: 3.6, length: 12.5, axis: 'x', position: [-51.25, 0, 0] },
      { type: 'cylinder', radius: 3.6, length: 12.5, axis: 'x', position: [51.25, 0, 0] },
      ...threadRingsX([-55, -51, -47, 47, 51, 55], 3.65, 0.35),
    ],
  },

  'JWF1206-1104': {
    level: '尺寸级',
    material: 'metal',
    source: {
      page: 13,
      dimensions: ['M10×100'],
      views: ['主视图'],
      assumptions: ['螺纹大径10和总长100按厂家标注', '端部倒角与螺距未标；杆芯按螺纹小径估算，外牙仅以等距环纹表达'],
    },
    primitives: [
      { type: 'cylinder', radius: 4.6, length: 100, axis: 'x' },
      ...threadRingsX([-46, -36, -26, -16, -6, 4, 14, 24, 34, 44], 4.65, 0.35),
    ],
  },

  'JWF1206-1105': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 13,
      dimensions: ['150×95×80'],
      views: ['正视图', '侧视图'],
      assumptions: ['三向总体外廓按厂家标注', '中央半圆承托槽直径、底座厚度、四个紧固孔和右侧调节螺钉尺寸未标，按两视图比例估算'],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-75, -40], [75, -40], [75, 40], [55, 40], [50, 20], [40, 5], [25, -5], [0, -10], [-25, -5], [-40, 5], [-50, 20], [-55, 40], [-75, 40]],
        depth: 95,
        position: [0, 0, -47.5],
        bevel: 2,
      },
      { type: 'box', size: [150, 10, 95], position: [0, -35, 0], material: 'darkMetal' },
      { type: 'cylinder', radius: 5, length: 28, axis: 'x', position: [68, 5, 0], material: 'metal' },
    ],
  },

  'JWF1206-1106': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 13,
      dimensions: ['150×95×80'],
      views: ['正视图', '侧视图'],
      assumptions: ['三向总体外廓按厂家标注', '中央半圆承托槽直径、底座厚度、四个紧固孔和左侧调节螺钉尺寸未标，按两视图比例估算；与左端座镜像'],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-75, -40], [75, -40], [75, 40], [55, 40], [50, 20], [40, 5], [25, -5], [0, -10], [-25, -5], [-40, 5], [-50, 20], [-55, 40], [-75, 40]],
        depth: 95,
        position: [0, 0, -47.5],
        bevel: 2,
      },
      { type: 'box', size: [150, 10, 95], position: [0, -35, 0], material: 'darkMetal' },
      { type: 'cylinder', radius: 5, length: 28, axis: 'x', position: [-68, 5, 0], material: 'metal' },
    ],
  },

  'FA221D-1101': {
    level: '轮廓级',
    material: 'metal',
    source: {
      page: 13,
      dimensions: ['φ36×142.5'],
      views: ['主视图'],
      assumptions: ['弹簧外径36和自由总长142.5按厂家标注', '线径未标，按3.6估算；圈数和两端密圈/中段疏圈的节距按主视图建立'],
    },
    primitives: [
      { type: 'tube', points: clusteredSpringPoints, radius: 1.8 },
    ],
  },

  'FA221D-1102': {
    level: '尺寸级',
    material: 'metal',
    source: {
      page: 13,
      dimensions: ['76', '61', 'φ67'],
      views: ['轴向剖视图', '端视图'],
      assumptions: ['总高76、主体高61和外径67按厂家标注', '中心内螺纹/六角孔尺寸、上部凸台直径及圆角未标，按剖视比例估算'],
    },
    primitives: [
      {
        type: 'lathe',
        points: [[8, -30.5], [33.5, -30.5], [33.5, 30.5], [14, 30.5], [14, 45.5], [8, 45.5], [8, -30.5]],
      },
      { type: 'torus', radius: 27, tube: 2, position: [0, -27, 0], rotation: [1.5708, 0, 0], material: 'darkMetal' },
    ],
  },

  'FA221D-1103': {
    level: '尺寸级',
    material: 'metal',
    source: {
      page: 13,
      dimensions: ['φ15×16', '孔φ8'],
      views: ['轴向剖视图', '端视图'],
      assumptions: ['外径15、长度16和通孔直径8按厂家标注', '右端两道浅槽的槽宽、槽深未标，按剖视比例以环纹表达'],
    },
    primitives: [
      {
        type: 'lathe',
        points: [[4, -8], [7.5, -8], [7.5, 8], [4, 8], [4, -8]],
        rotation: [1.5708, 0, 0],
      },
      { type: 'torus', radius: 7.1, tube: 0.35, position: [0, 0, 3], material: 'darkMetal' },
      { type: 'torus', radius: 7.1, tube: 0.35, position: [0, 0, 6], material: 'darkMetal' },
    ],
  },

  'FA221D-1104': {
    level: '尺寸级',
    material: 'metal',
    source: {
      page: 13,
      dimensions: ['φ35', 'φ25', 'φ20', '40', '50'],
      views: ['正视/剖视图'],
      assumptions: ['三级直径35、25、20及高度40、50均按厂家标注', '底部叉槽宽度、横向孔中心高度和细部倒角未标，按图面比例估算'],
    },
    primitives: [
      { type: 'cylinder', radius: 12.5, length: 50, axis: 'y' },
      { type: 'cylinder', radius: 17.5, length: 10, axis: 'y', position: [0, 20, 0] },
      { type: 'cylinder', radius: 10, length: 36, axis: 'x', position: [0, -5, 0], material: 'darkMetal' },
      { type: 'box', size: [8, 18, 25], position: [-8.5, -16, 0] },
      { type: 'box', size: [8, 18, 25], position: [8.5, -16, 0] },
    ],
  },

  'FA221D-1105': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 13,
      dimensions: ['106', '75', '54', '90'],
      views: ['正视图', '侧视图'],
      assumptions: ['厂家明确标注106、75、54、90，按两视图控制长臂、中心高度、座厚和侧向总高', '中心孔径、壳体外径、三个安装耳、紧固孔和长臂角度未标，按图面比例估算'],
    },
    primitives: [
      {
        type: 'lathe',
        points: [[25, -27], [37.5, -27], [37.5, 27], [25, 27], [25, -27]],
        rotation: [1.5708, 0, 0],
      },
      { type: 'box', size: [106, 24, 54], position: [-42, 30, 0], rotation: [0, 0, -0.22] },
      { type: 'cylinder', radius: 22, length: 54, axis: 'z', position: [-88, 48, 0] },
      { type: 'torus', radius: 10, tube: 2, position: [-88, 48, 27], material: 'darkMetal' },
      { type: 'cylinder', radius: 14, length: 54, axis: 'z', position: [48, 44, 0] },
      { type: 'box', size: [24, 30, 54], position: [0, -45, 0] },
    ],
  },

  'FA221D-1106': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 13,
      dimensions: ['147×65×37', 'φ87'],
      views: ['正视图', '侧视图'],
      assumptions: ['总长147、中心至外缘65、座厚37和中心孔φ87按厂家标注', '外壳曲线、两侧安装耳、四个斜置紧固孔和侧面台阶尺寸未标，按两视图比例估算'],
    },
    primitives: [
      {
        type: 'lathe',
        points: [[43.5, -18.5], [65, -18.5], [65, 18.5], [43.5, 18.5], [43.5, -18.5]],
        rotation: [1.5708, 0, 0],
      },
      { type: 'box', size: [17, 25, 37], position: [-65, 0, 0] },
      { type: 'box', size: [17, 25, 37], position: [65, 0, 0] },
      { type: 'cylinder', radius: 6, length: 37, axis: 'z', position: [-36.8, 36.8, 0], material: 'darkMetal' },
      { type: 'cylinder', radius: 6, length: 37, axis: 'z', position: [36.8, 36.8, 0], material: 'darkMetal' },
      { type: 'cylinder', radius: 6, length: 37, axis: 'z', position: [-36.8, -36.8, 0], material: 'darkMetal' },
      { type: 'cylinder', radius: 6, length: 37, axis: 'z', position: [36.8, -36.8, 0], material: 'darkMetal' },
    ],
  },
};
