import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TransformControls } from 'three/addons/controls/TransformControls.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';

const canvas = document.querySelector('#scene');
const stage = document.querySelector('.stage');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0b1013);
scene.fog = new THREE.Fog(0x0b1013, 8, 15);

const camera = new THREE.OrthographicCamera(-2.5, 2.5, 2.5, -2.5, 0.1, 100);
camera.position.set(4.9, 3.55, 5.7);
camera.zoom = 1.08;

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0.1, 1.7, 0);
controls.enableDamping = true;
controls.minDistance = 3.4;
controls.maxDistance = 11;
controls.minZoom = 0.62;
controls.maxZoom = 2.8;

scene.add(new THREE.HemisphereLight(0xe5f4fb, 0x29312d, 2.15));
const keyLight = new THREE.DirectionalLight(0xffffff, 3.4);
keyLight.position.set(4.5, 7, 5.5);
keyLight.castShadow = true;
keyLight.shadow.mapSize.set(2048, 2048);
keyLight.shadow.camera.left = -5;
keyLight.shadow.camera.right = 5;
keyLight.shadow.camera.top = 5;
keyLight.shadow.camera.bottom = -5;
scene.add(keyLight);
const rimLight = new THREE.DirectionalLight(0x9cc8df, 1.25);
rimLight.position.set(-4, 4, -5);
scene.add(rimLight);

const floor = new THREE.Mesh(
  new THREE.CircleGeometry(5.5, 96),
  new THREE.MeshStandardMaterial({ color: 0x141b1e, roughness: 0.94 })
);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

const materials = {
  paint: new THREE.MeshStandardMaterial({ color: 0xd9ddda, roughness: 0.52, metalness: 0.18 }),
  paintDark: new THREE.MeshStandardMaterial({ color: 0xb9c0be, roughness: 0.58, metalness: 0.22 }),
  green: new THREE.MeshStandardMaterial({ color: 0x74c534, roughness: 0.48, metalness: 0.08 }),
  dark: new THREE.MeshStandardMaterial({ color: 0x101618, roughness: 0.38, metalness: 0.42 }),
  recess: new THREE.MeshStandardMaterial({ color: 0x7f898a, roughness: 0.62, metalness: 0.26 }),
  steel: new THREE.MeshStandardMaterial({ color: 0x9ca6a7, roughness: 0.3, metalness: 0.72 }),
  lens: new THREE.MeshPhysicalMaterial({ color: 0x0d2832, roughness: 0.08, metalness: 0.35, clearcoat: 1 }),
  compute: new THREE.MeshStandardMaterial({ color: 0x687276, roughness: 0.6, metalness: 0.35 }),
  glass: new THREE.MeshPhysicalMaterial({
    color: 0xbceef4,
    transparent: true,
    opacity: 0.23,
    roughness: 0.08,
    transmission: 0.62,
    depthWrite: false
  }),
  light: new THREE.MeshStandardMaterial({ color: 0xf2fcff, emissive: 0xbcecff, emissiveIntensity: 1.7 }),
  red: new THREE.MeshStandardMaterial({ color: 0xc82727, roughness: 0.34 }),
  yellow: new THREE.MeshStandardMaterial({ color: 0xf2b62b, roughness: 0.34 }),
  signalGreen: new THREE.MeshStandardMaterial({ color: 0x35b95c, emissive: 0x176c31, emissiveIntensity: 0.7 }),
  blue: new THREE.MeshStandardMaterial({ color: 0x2f7daf, roughness: 0.42 }),
  orange: new THREE.MeshStandardMaterial({ color: 0xf07d32, emissive: 0x7c2f09, emissiveIntensity: 0.55 }),
  marker: new THREE.MeshStandardMaterial({ color: 0xff4e42, emissive: 0x8d120b, emissiveIntensity: 0.85 })
};

const modeMaterials = {
  clayShell: new THREE.MeshStandardMaterial({ color: 0xc9cdcb, roughness: 0.72, metalness: 0.06 }),
  clayInternal: new THREE.MeshStandardMaterial({ color: 0x7f898d, roughness: 0.62, metalness: 0.16 }),
  wireShell: new THREE.MeshBasicMaterial({ color: 0xd9e0df, wireframe: true, transparent: true, opacity: 0.82 }),
  wireInternal: new THREE.MeshBasicMaterial({ color: 0x79d5ef, wireframe: true, transparent: true, opacity: 0.95 }),
  xrayShell: new THREE.MeshBasicMaterial({
    color: 0x9fc1c6,
    transparent: true,
    opacity: 0.13,
    depthWrite: false,
    side: THREE.DoubleSide
  }),
  xrayInternal: new THREE.MeshStandardMaterial({ color: 0x49c7e6, roughness: 0.35, metalness: 0.25 })
};

const layers = {};
const selectable = [];
const explodeItems = [];
const machine = new THREE.Group();
machine.position.y = 0.035;
scene.add(machine);
let currentMode = 'solid';
let currentView = 'isoRight';
let importedModelReady = false;
let modelAnimationMixer = null;
let modelAnimationActions = [];
let modelAnimationDuration = 0;
let dismantlePlaying = false;
let lastAnimationTime = 0;

function makeLayer(name) {
  const value = new THREE.Group();
  value.name = name;
  layers[name] = value;
  machine.add(value);
  return value;
}

function registerMesh(mesh, name, detail, role = 'shell', selectablePart = true) {
  mesh.castShadow = role !== 'decal';
  mesh.receiveShadow = role === 'shell';
  mesh.userData.baseMaterial = mesh.material;
  mesh.userData.role = role;
  if (name) {
    mesh.userData.name = name;
    mesh.userData.detail = detail;
    if (selectablePart) selectable.push(mesh);
  }
  return mesh;
}

function roundedBox(parent, size, position, material, name, detail, radius = 0.025, role = 'shell') {
  const safeRadius = Math.min(radius, Math.min(...size) / 2.2);
  const mesh = new THREE.Mesh(new RoundedBoxGeometry(...size, 4, safeRadius), material);
  mesh.position.set(...position);
  registerMesh(mesh, name, detail, role);
  parent.add(mesh);
  return mesh;
}

function box(parent, size, position, material, name, detail, role = 'shell') {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), material);
  mesh.position.set(...position);
  registerMesh(mesh, name, detail, role);
  parent.add(mesh);
  return mesh;
}

function cylinder(parent, radius, depth, position, rotation, material, name, detail, role = 'shell', segments = 36) {
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, depth, segments), material);
  mesh.position.set(...position);
  mesh.rotation.set(...rotation);
  registerMesh(mesh, name, detail, role);
  parent.add(mesh);
  return mesh;
}

function trackExplode(object, direction, distance = 1) {
  explodeItems.push({
    object,
    base: object.position.clone(),
    direction: new THREE.Vector3(...direction).normalize(),
    distance
  });
}

function wedgeGeometry(width, height, depth, topFrontInset = 0.13) {
  const x = width / 2;
  const y = height / 2;
  const z = depth / 2;
  const vertices = new Float32Array([
    -x, -y, -z,  x, -y, -z,  x,  y, -z, -x,  y, -z,
    -x, -y,  z,  x, -y,  z,  x,  y, z - topFrontInset, -x, y, z - topFrontInset
  ]);
  const indices = [
    0, 2, 1, 0, 3, 2,
    4, 5, 6, 4, 6, 7,
    0, 1, 5, 0, 5, 4,
    3, 7, 6, 3, 6, 2,
    0, 4, 7, 0, 7, 3,
    1, 2, 6, 1, 6, 5
  ];
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function invertedRightTrianglePrismGeometry(width, height, depth) {
  const x = width / 2;
  const y = height / 2;
  const z = depth / 2;
  const vertices = new Float32Array([
    -x, y, z, -x, y, -z, -x, -y, -z,
     x, y, z,  x, y, -z,  x, -y, -z
  ]);
  const indices = [
    0, 2, 1,
    3, 4, 5,
    0, 1, 4, 0, 4, 3,
    1, 2, 5, 1, 5, 4,
    2, 0, 3, 2, 3, 5
  ];
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function sweptWideDuctGeometry(points, width, thickness, segments = 40, normalOffset = 0, startProgress = 0, endProgress = 1) {
  const curve = new THREE.CatmullRomCurve3(points, false, 'centripetal');
  const vertices = [];
  const indices = [];
  const widthAxis = new THREE.Vector3(1, 0, 0);
  for (let i = 0; i <= segments; i += 1) {
    const t = THREE.MathUtils.lerp(startProgress, endProgress, i / segments);
    const point = curve.getPoint(t);
    const tangent = curve.getTangent(t).normalize();
    const normal = new THREE.Vector3(0, -tangent.z, tangent.y).normalize();
    const sectionCenter = point.clone().add(normal.clone().multiplyScalar(normalOffset));
    const halfWidth = widthAxis.clone().multiplyScalar(width / 2);
    const halfThickness = normal.multiplyScalar(thickness / 2);
    const corners = [
      sectionCenter.clone().sub(halfWidth).sub(halfThickness),
      sectionCenter.clone().add(halfWidth).sub(halfThickness),
      sectionCenter.clone().add(halfWidth).add(halfThickness),
      sectionCenter.clone().sub(halfWidth).add(halfThickness)
    ];
    corners.forEach((corner) => vertices.push(corner.x, corner.y, corner.z));
  }
  for (let i = 0; i < segments; i += 1) {
    for (let side = 0; side < 4; side += 1) {
      const a = i * 4 + side;
      const b = i * 4 + ((side + 1) % 4);
      const c = (i + 1) * 4 + ((side + 1) % 4);
      const d = (i + 1) * 4 + side;
      indices.push(a, b, c, a, c, d);
    }
  }
  indices.push(0, 2, 1, 0, 3, 2);
  const end = segments * 4;
  indices.push(end, end + 1, end + 2, end, end + 2, end + 3);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function voluteGeometry(length) {
  const profile = new THREE.Shape();
  profile.moveTo(-0.24, -0.11);
  profile.bezierCurveTo(-0.29, 0.08, -0.16, 0.25, 0.03, 0.25);
  profile.bezierCurveTo(0.19, 0.25, 0.29, 0.12, 0.24, -0.01);
  profile.bezierCurveTo(0.21, -0.10, 0.12, -0.13, 0.02, -0.10);
  profile.lineTo(0.14, -0.22);
  profile.lineTo(-0.12, -0.22);
  profile.bezierCurveTo(-0.18, -0.21, -0.22, -0.17, -0.24, -0.11);
  const geometry = new THREE.ExtrudeGeometry(profile, {
    depth: length,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.012,
    bevelSegments: 3,
    curveSegments: 24
  });
  geometry.translate(0, 0, -length / 2);
  geometry.rotateY(Math.PI / 2);
  geometry.computeVertexNormals();
  return geometry;
}

function extrudeSideProfileGeometry(width, points) {
  const profile = new THREE.Shape();
  points.forEach(([z, y], index) => {
    const shapeX = -z;
    if (index === 0) profile.moveTo(shapeX, y);
    else profile.lineTo(shapeX, y);
  });
  profile.closePath();
  const geometry = new THREE.ExtrudeGeometry(profile, {
    depth: width,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.012,
    bevelSegments: 2,
    curveSegments: 8
  });
  geometry.translate(0, 0, -width / 2);
  geometry.rotateY(Math.PI / 2);
  geometry.computeVertexNormals();
  return geometry;
}

function textPlate(parent, text, width, height, position, fontSize = 70, color = '#687174') {
  const labelCanvas = document.createElement('canvas');
  labelCanvas.width = 640;
  labelCanvas.height = 160;
  const context = labelCanvas.getContext('2d');
  context.clearRect(0, 0, labelCanvas.width, labelCanvas.height);
  context.fillStyle = color;
  context.font = `700 ${fontSize}px Arial, sans-serif`;
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(text, labelCanvas.width / 2, labelCanvas.height / 2);
  const texture = new THREE.CanvasTexture(labelCanvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(width, height),
    new THREE.MeshBasicMaterial({ map: texture, transparent: true, depthWrite: false })
  );
  mesh.position.set(...position);
  registerMesh(mesh, '', '', 'decal', false);
  parent.add(mesh);
  return mesh;
}

function addLogo(parent, position) {
  const logo = new THREE.Group();
  logo.position.set(...position);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.095, 0.014, 10, 40), materials.blue);
  registerMesh(ring, '', '', 'decal', false);
  logo.add(ring);
  for (let i = -1; i <= 1; i += 1) {
    const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.016, 0.008), materials.blue);
    stripe.position.y = i * 0.03;
    stripe.rotation.z = 0.55;
    registerMesh(stripe, '', '', 'decal', false);
    logo.add(stripe);
  }
  parent.add(logo);
  return logo;
}

function addMachineIdentityDetails(parent) {
  const details = new THREE.Group();
  details.name = 'JWF0019A机身标识与立柱操作件';
  parent.add(details);

  // 正面罩板：保留完整型号和蓝色圆形Logo，稍微浮于原网格表面避免闪烁。
  textPlate(details, 'JWF0019A', 0.66, 0.13, [-0.10, 2.35, 0.82], 68, '#596468');
  const logo = addLogo(details, [1.12, 2.31, 0.822]);
  logo.scale.setScalar(0.82);

  // 信号灯侧立柱内面：独立触摸屏，不改动立柱本体。
  const screenMaterial = new THREE.MeshStandardMaterial({
    color: 0x10191d,
    emissive: 0x0b3b4a,
    emissiveIntensity: 0.62,
    roughness: 0.22,
    metalness: 0.28
  });
  roundedBox(
    details,
    [0.032, 0.32, 0.45],
    [-0.895, 1.665, 0],
    materials.recess,
    '左立柱内侧触摸屏外框',
    '信号灯侧立柱内面的独立屏幕外框。',
    0.012
  );
  roundedBox(
    details,
    [0.018, 0.255, 0.37],
    [-0.874, 1.665, 0],
    screenMaterial,
    '左立柱内侧触摸屏',
    '用于查看异纤检测参数、相机状态和排杂统计。',
    0.008
  );

  // 风机侧立柱内面：平整电气柜门与独立旋转按钮。
  roundedBox(
    details,
    [0.032, 0.54, 0.59],
    [0.892, 1.645, 0],
    materials.paintDark,
    '右立柱内侧电气柜门',
    '风机侧立柱内面的平整电气柜门。',
    0.014
  );
  roundedBox(details, [0.018, 0.47, 0.52], [0.872, 1.645, 0], materials.paint, '', '', 0.01);
  roundedBox(details, [0.018, 0.105, 0.105], [0.855, 1.75, 0.145], materials.yellow, '', '', 0.008);
  cylinder(
    details,
    0.035,
    0.052,
    [0.825, 1.75, 0.145],
    [0, 0, Math.PI / 2],
    materials.red,
    '电柜门旋转按钮',
    '电气柜门上的红色旋转按钮，带黄色安全底座。',
    'shell',
    28
  );
  roundedBox(details, [0.058, 0.022, 0.018], [0.797, 1.75, 0.145], materials.dark, '', '', 0.006);

  return details;
}

function addBoltRow(parent, y, z, count = 10) {
  for (let i = 0; i < count; i += 1) {
    const x = -0.92 + i * (1.84 / (count - 1));
    cylinder(parent, 0.013, 0.012, [x, y, z], [Math.PI / 2, 0, 0], materials.steel, '', '', 'shell', 16);
  }
}

function addVentGrid(parent) {
  const vent = new THREE.Group();
  vent.position.set(-1.31, 0.72, 0.347);
  const columns = 6;
  const rows = 18;
  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const cell = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.025, 0.009), materials.recess);
      cell.position.set(column * 0.032, row * 0.035, 0);
      registerMesh(cell, '', '', 'shell', false);
      vent.add(cell);
    }
  }
  parent.add(vent);
}

function cameraModule(parent, x, y, z, facing, index, type) {
  const unit = new THREE.Group();
  unit.position.set(x, y, z);
  unit.rotation.y = facing === 'front' ? Math.PI : 0;
  const detail = type === '精灵眼'
    ? `背面精灵眼第${index}台相机。1—2号进入算力通道9，3—4号进入通道10。`
    : `${facing === 'front' ? '正面直视' : facing === 'down' ? '背面折射' : '背面'}主检测相机第${index}台；与另一侧对应相机共同覆盖1.6米机幅。`;
  const body = new THREE.Mesh(new RoundedBoxGeometry(0.19, 0.14, 0.15, 3, 0.015), materials.dark);
  registerMesh(body, `${type}${index}号相机`, detail, 'internal');
  const lens = new THREE.Mesh(new THREE.CylinderGeometry(0.048, 0.048, 0.052, 28), materials.lens);
  if (facing === 'down') {
    lens.position.y = -0.1;
  } else {
    lens.rotation.x = Math.PI / 2;
    lens.position.z = 0.1;
  }
  registerMesh(lens, `${type}${index}号相机`, detail, 'internal');
  unit.add(body, lens);
  parent.add(unit);
}

function importedPartInfo(name) {
  if (/第11轮_精灵眼前缘横向圆管/.test(name)) return ['精灵眼前缘横向圆管', '靠近前视方向边缘的横向圆管，直角梯形精灵眼罩壳通过支架悬挂在它下方。'];
  if (/第11轮_精灵眼悬挂直角梯形罩壳/.test(name)) return ['精灵眼直角梯形罩壳', '原位替换旧三角实体罩；采用圆润边角的直角梯形外形，内部对应4台精灵眼相机。'];
  if (/第11轮_精灵眼管道悬挂支架/.test(name)) return ['精灵眼罩壳悬挂支架', '连接前缘横向圆管与下方直角梯形罩壳的圆角短支架。'];
  if (/正面_平整可拆罩壳/.test(name)) return ['正面平整可拆罩壳', '第11轮独立罩壳，可向机器正面拆下；底层原网格尚未重新修面。'];
  if (/背面散热扇|背面_散热扇/.test(name)) return ['背面散热扇总成', '本轮标注2新增：背面下部独立散热扇，包含扇框、叶片、轮毂和防护网。'];
  if (/背面_微凸可拆罩壳/.test(name)) return ['背面微凸可拆罩壳', '本轮标注3新增：散热扇上方的微凸罩壳，可向机器背面拆下。'];
  if (/背面_上部可拆罩壳/.test(name)) return ['背面上部可拆罩壳', '本轮标注4新增：背面上方独立罩壳，后续用于展示后视相机区域。'];
  if (/后视相机_高位罩板/.test(name)) return [name, '机器后方高位相机舱罩板；拆开后是8台朝下的后视相机和下方全幅反光镜。'];
  if (/前视相机_低位罩板/.test(name)) return [name, '机器前方低位相机舱罩板；拆开后是8台直接朝向检测通道的前视相机。'];
  if (/前视相机/.test(name)) return [name.replace(/_(机身|镜头)$/, ''), '正面主检测相机，共8台，直接朝向1.6米检测通道。'];
  if (/后视相机_全幅45度反光镜/.test(name)) return [name, '后方高位舱内的全幅反光镜；位于8台朝下的后视相机下方，拆解时与相机同步后退。'];
  if (/后视相机/.test(name)) return [name.replace(/_(机身|镜头)$/, ''), '背面主检测相机，共8台，通过反光镜观察1.6米检测通道。'];
  if (/精灵眼相机/.test(name)) return [name.replace(/_(机身|镜头)$/, ''), '精灵眼相机，共4台；1—2号进入通道9，3—4号进入通道10。'];
  if (/电磁阀/.test(name)) return [name.replace(/_(线圈|喷嘴)$/, ''), '32位喷射排中的一个电磁阀，根据识别位置和棉流速度进行毫秒级喷射。'];
  if (/反光镜/.test(name)) return [name, '检测光路反光镜，用于折叠光路并扩大对应相机的检测视场。'];
  if (/封闭矩形主通道/.test(name)) return [name, '第8轮长距离斜伸的1600×70毫米主通道：从机器下方连续上升，穿过检测区并接入蜗壳。'];
  if (/L形检测主体_左侧绿色罩板/.test(name)) return [name, '第9轮连续L形侧罩：后端竖臂对应高位后视相机舱，前端横臂对应低位前视相机舱。'];
  if (/大型三角罩体/.test(name)) return [name, '包住4台精灵眼相机的大型三角罩体，可整体移开检查内部。'];
  if (/小型螺旋蜗壳风道/.test(name)) return [name, '紧凑全机幅薄壁蜗壳：下方接长斜主通道，外圈上部接顶部出口。'];
  if (/蜗壳上翻横向出口/.test(name)) return [name, '从蜗壳外圈切向向上翻，再转为顶部横向出口；与蜗壳连续。'];
  if (/罩|盖|散热片/.test(name)) return [name, '可拆卸外部罩壳；拖动拆解进度可查看它后方的内部部件。'];
  if (/屏幕/.test(name)) return [name, '信号灯侧立柱内侧的操作屏。'];
  if (/电柜/.test(name)) return [name, '风机侧立柱内侧的电气控制柜。'];
  if (/风机|管道|收集/.test(name)) return [name, '异纤排出风机与等径管路，负责把喷出的异纤抽送至收集位置。'];
  return [name || 'JWF0019A整机', '依据官方外形、现场拆板照片和已确认结构重新绘制的低面数可拆模型。'];
}

// 第13轮恢复：回退到第11轮完整外形母体，保留已校准内部布局。
const completeModel = makeLayer('hunyuan');
const modelLoadStatus = document.querySelector('#model-load-status');
const modelStatusValue = document.querySelector('#model-status-value');
const importedModelLoader = new GLTFLoader();
importedModelLoader.setMeshoptDecoder(MeshoptDecoder);
importedModelLoader.load(
  './assets/models/JWF0019A-第11轮精灵眼管道梯形罩.glb?v=13restore-shell',
  (gltf) => {
    const importedRoot = gltf.scene;
    importedRoot.name = 'JWF0019A第13轮完整外形恢复';
    completeModel.add(importedRoot);
    importedRoot.updateMatrixWorld(true);

    const sourceBounds = new THREE.Box3().setFromObject(importedRoot);
    const sourceSize = sourceBounds.getSize(new THREE.Vector3());
    const scale = 3.62 / sourceSize.y;
    importedRoot.scale.setScalar(scale);
    importedRoot.updateMatrixWorld(true);

    const scaledBounds = new THREE.Box3().setFromObject(importedRoot);
    const scaledCenter = scaledBounds.getCenter(new THREE.Vector3());
    importedRoot.position.x -= scaledCenter.x;
    importedRoot.position.y -= scaledBounds.min.y;
    importedRoot.position.z -= scaledCenter.z;
    importedRoot.updateMatrixWorld(true);

    addMachineIdentityDetails(completeModel);

    importedRoot.traverse((object) => {
      if (!object.isMesh) return;
      const [name, detail] = importedPartInfo(object.name);
      const role = /相机|电磁阀|反光镜|检测通道|主通道/.test(object.name) ? 'internal' : 'shell';
      registerMesh(
        object,
        name,
        detail,
        role
      );
      object.castShadow = false;
      object.receiveShadow = true;
    });

    if (gltf.animations.length) {
      modelAnimationMixer = new THREE.AnimationMixer(importedRoot);
      modelAnimationActions = gltf.animations.map((clip) => {
        const action = modelAnimationMixer.clipAction(clip);
        action.setLoop(THREE.LoopOnce, 1);
        action.clampWhenFinished = true;
        action.play();
        return action;
      });
      modelAnimationDuration = Math.max(...gltf.animations.map((clip) => clip.duration));
      modelAnimationMixer.setTime(0);
    }

    importedModelReady = true;
    modelLoadStatus.innerHTML = '<span class="dot ready"></span>第13轮完整外形恢复版已加载 · 31970三角面';
    modelStatusValue.textContent = '精灵眼承载外形已恢复 · 内部布局位置保留';
    updateExplode();
    applyMode(currentMode);
  },
  (event) => {
    if (!event.total) return;
    const progress = Math.min(99, Math.round((event.loaded / event.total) * 100));
    modelStatusValue.textContent = `真实外观加载 ${progress}%`;
  },
  (error) => {
    console.error('第13轮完整外形恢复版加载失败', error);
    completeModel.visible = false;
    if (layers.shell) layers.shell.visible = true;
    const hunyuanToggle = document.querySelector('[data-layer="hunyuan"]');
    const shellToggle = document.querySelector('[data-layer="shell"]');
    if (hunyuanToggle) hunyuanToggle.checked = false;
    if (shellToggle) shellToggle.checked = true;
    modelLoadStatus.innerHTML = '<span class="dot warning"></span>低模修复校对版加载失败 · 已回退校对草模';
    modelStatusValue.textContent = '校对草模回退';
  }
);

const calibrationMaterials = {
  front: new THREE.MeshStandardMaterial({ color: 0x37b8e5, roughness: 0.35, metalness: 0.18 }),
  rear: new THREE.MeshStandardMaterial({ color: 0x7b61d1, roughness: 0.35, metalness: 0.18 }),
  magic: new THREE.MeshStandardMaterial({ color: 0xf29b38, roughness: 0.35, metalness: 0.18 }),
  compute: new THREE.MeshStandardMaterial({ color: 0x4dc27a, roughness: 0.42, metalness: 0.16 }),
  mirror: new THREE.MeshPhysicalMaterial({ color: 0xc9f4ff, roughness: 0.05, metalness: 0.72 }),
  valve: new THREE.MeshStandardMaterial({ color: 0xe85d5d, roughness: 0.38, metalness: 0.22 }),
  cover: new THREE.MeshStandardMaterial({ color: 0xe8eceb, roughness: 0.42, metalness: 0.20 }),
  coverGhost: new THREE.MeshPhysicalMaterial({
    color: 0xc9edf4,
    transparent: true,
    opacity: 0.14,
    roughness: 0.08,
    transmission: 0.52,
    depthWrite: false,
    side: THREE.DoubleSide
  }),
  heatsink: new THREE.MeshStandardMaterial({ color: 0x8f9ca1, roughness: 0.30, metalness: 0.74 }),
  cameraBody: new THREE.MeshStandardMaterial({ color: 0x9da8ad, roughness: 0.26, metalness: 0.72 }),
  cameraDark: new THREE.MeshStandardMaterial({ color: 0x1b2226, roughness: 0.40, metalness: 0.50 }),
  cameraGlass: new THREE.MeshPhysicalMaterial({ color: 0x5db4d2, roughness: 0.08, metalness: 0.15, transmission: 0.38 }),
  computeBody: new THREE.MeshStandardMaterial({ color: 0x606d73, roughness: 0.30, metalness: 0.70 }),
  computeFin: new THREE.MeshStandardMaterial({ color: 0x8d9ba1, roughness: 0.24, metalness: 0.78 }),
  connector: new THREE.MeshStandardMaterial({ color: 0x22292d, roughness: 0.48, metalness: 0.32 }),
  statusLed: new THREE.MeshStandardMaterial({ color: 0x77f082, emissive: 0x28b94c, emissiveIntensity: 1.5 }),
  valveCoil: new THREE.MeshStandardMaterial({ color: 0xc94b43, roughness: 0.38, metalness: 0.42, emissive: 0x5a120e, emissiveIntensity: 0.45 }),
  valveMetal: new THREE.MeshStandardMaterial({ color: 0xb8c1c4, roughness: 0.22, metalness: 0.82 }),
  valveNozzle: new THREE.MeshStandardMaterial({ color: 0xc8963f, roughness: 0.30, metalness: 0.72 }),
  channelGlass: new THREE.MeshPhysicalMaterial({
    color: 0x76d7e8,
    transparent: true,
    opacity: 0.28,
    roughness: 0.08,
    transmission: 0.56,
    depthWrite: false,
    side: THREE.DoubleSide
  }),
  channelShell: materials.paint,
  channelFrame: materials.paint,
  channelWindowGlass: new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    emissive: 0xffffff,
    emissiveIntensity: 0.18,
    transparent: true,
    opacity: 0.38,
    roughness: 0.12,
    metalness: 0.04,
    transmission: 0.58,
    thickness: 0.01,
    ior: 1.46,
    depthWrite: false,
    side: THREE.DoubleSide
  }),
  channelPlaybackWindow: new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    emissive: 0xffffff,
    emissiveIntensity: 0.24,
    transparent: true,
    opacity: 0.62,
    roughness: 0.30,
    metalness: 0.02,
    transmission: 0.36,
    thickness: 0.01,
    ior: 1.42,
    depthWrite: false,
    side: THREE.DoubleSide
  }),
  rejectVolute: new THREE.MeshPhysicalMaterial({
    color: 0x76d7e8,
    transparent: true,
    opacity: 0.34,
    roughness: 0.08,
    transmission: 0.48,
    depthWrite: false,
    side: THREE.DoubleSide
  })
};

const calibrationLayer = makeLayer('calibration');
calibrationLayer.visible = false;
const calibrationParts = new Map();
const calibrationStorageKey = 'jwf0019a-internal-layout-v5';
let calibrationEnabled = false;
let selectedCalibrationPart = null;
let calibrationHelper = null;

const transformControls = new TransformControls(camera, renderer.domElement);
transformControls.setSize(0.72);
scene.add(transformControls.getHelper());
transformControls.getHelper().visible = false;
transformControls.addEventListener('dragging-changed', (event) => {
  controls.enabled = !event.value;
});

function addCalibrationMesh(parent, geometry, material, calibrationId) {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.userData.calibrationId = calibrationId;
  registerMesh(mesh, '', '', 'calibration', true);
  parent.add(mesh);
  return mesh;
}

function addCameraRow(group, calibrationId, count, direction) {
  const spacing = count > 4 ? 0.29 : 0.42;
  for (let index = 0; index < count; index += 1) {
    const unit = new THREE.Group();
    unit.position.x = (index - (count - 1) / 2) * spacing;
    const body = addCalibrationMesh(
      unit,
      new RoundedBoxGeometry(0.20, 0.13, 0.15, 3, 0.018),
      calibrationMaterials.cameraBody,
      calibrationId
    );
    body.userData.name = `${group.userData.label}${index + 1}号`;
    const frontPlate = addCalibrationMesh(
      unit,
      new THREE.CylinderGeometry(0.057, 0.057, 0.020, 20),
      calibrationMaterials.cameraDark,
      calibrationId
    );
    const lensBarrel = addCalibrationMesh(
      unit,
      new THREE.CylinderGeometry(0.039, 0.044, 0.048, 20),
      calibrationMaterials.cameraDark,
      calibrationId
    );
    const lensGlass = addCalibrationMesh(
      unit,
      new THREE.CylinderGeometry(0.030, 0.030, 0.008, 20),
      calibrationMaterials.cameraGlass,
      calibrationId
    );
    const rearConnector = addCalibrationMesh(
      unit,
      new THREE.CylinderGeometry(0.020, 0.020, 0.035, 12),
      calibrationMaterials.connector,
      calibrationId
    );
    const mount = addCalibrationMesh(
      unit,
      new THREE.BoxGeometry(0.15, 0.018, 0.055),
      calibrationMaterials.cameraDark,
      calibrationId
    );
    [frontPlate, lensBarrel, lensGlass, rearConnector, mount].forEach((part) => {
      part.userData.name = `${group.userData.label}${index + 1}号`;
    });
    mount.position.y = 0.082;
    if (direction === 'down') {
      frontPlate.position.y = -0.080;
      lensBarrel.position.y = -0.108;
      lensGlass.position.y = -0.136;
      rearConnector.position.set(0.064, 0.083, 0);
    } else {
      const sign = direction === 'front' ? 1 : -1;
      [frontPlate, lensBarrel, lensGlass, rearConnector].forEach((part) => { part.rotation.x = Math.PI / 2; });
      frontPlate.position.z = sign * 0.082;
      lensBarrel.position.z = sign * 0.110;
      lensGlass.position.z = sign * 0.138;
      rearConnector.position.set(0.064, 0.080, -sign * 0.055);
    }
    group.add(unit);
  }
}

function addComputeRow(group, calibrationId, count) {
  for (let index = 0; index < count; index += 1) {
    const unit = new THREE.Group();
    unit.position.x = (index - (count - 1) / 2) * 0.22;
    const body = addCalibrationMesh(unit, new RoundedBoxGeometry(0.19, 0.24, 0.10, 3, 0.012), calibrationMaterials.computeBody, calibrationId);
    body.userData.name = `算力盒子${index + 1}号`;
    for (let finIndex = 0; finIndex < 5; finIndex += 1) {
      const fin = addCalibrationMesh(unit, new THREE.BoxGeometry(0.018, 0.19, 0.018), calibrationMaterials.computeFin, calibrationId);
      fin.position.set((finIndex - 2) * 0.032, 0.012, 0.056);
      fin.userData.name = `算力盒子${index + 1}号散热鳍片`;
    }
    const socket = addCalibrationMesh(unit, new THREE.BoxGeometry(0.048, 0.030, 0.022), calibrationMaterials.connector, calibrationId);
    socket.position.set(-0.045, -0.094, 0.058);
    socket.userData.name = `算力盒子${index + 1}号接口`;
    const led = addCalibrationMesh(unit, new THREE.SphereGeometry(0.009, 10, 8), calibrationMaterials.statusLed, calibrationId);
    led.position.set(0.060, -0.095, 0.061);
    led.userData.name = `算力盒子${index + 1}号状态灯`;
    group.add(unit);
  }
}

function addValveRow(group, calibrationId, count) {
  for (let index = 0; index < count; index += 1) {
    const unit = new THREE.Group();
    unit.position.x = (index - (count - 1) / 2) * 0.072;
    const coil = addCalibrationMesh(unit, new THREE.CylinderGeometry(0.027, 0.027, 0.062, 14), calibrationMaterials.valveCoil, calibrationId);
    const core = addCalibrationMesh(unit, new THREE.CylinderGeometry(0.014, 0.014, 0.102, 14), calibrationMaterials.valveMetal, calibrationId);
    const collar = addCalibrationMesh(unit, new THREE.CylinderGeometry(0.024, 0.024, 0.018, 14), calibrationMaterials.valveMetal, calibrationId);
    const nozzle = addCalibrationMesh(unit, new THREE.CylinderGeometry(0.008, 0.012, 0.044, 12), calibrationMaterials.valveNozzle, calibrationId);
    coil.position.y = 0.012;
    core.position.y = -0.018;
    collar.position.y = -0.060;
    nozzle.position.y = -0.090;
    [coil, core, collar, nozzle].forEach((part) => { part.userData.name = `电磁阀${index + 1}号`; });
    group.add(unit);
  }
}

function clearCalibrationChildren(group) {
  const removed = [];
  group.traverse((object) => {
    if (object !== group && object.isMesh) removed.push(object);
  });
  removed.forEach((mesh) => {
    const index = selectable.indexOf(mesh);
    if (index >= 0) selectable.splice(index, 1);
    mesh.geometry?.dispose();
  });
  group.clear();
}

function flowChannelPathPoints(dimensions) {
  const height = dimensions.height;
  const offset = dimensions.offset;
  // 主通道组整体比例为0.85；局部延伸0.15/0.85后，当前整机中的实际前伸量为150毫米。
  const outletExtension = 0.15 / 0.85;
  return [
    new THREE.Vector3(0, -height * 0.50, -offset * 0.50),
    new THREE.Vector3(0, -height * 0.30, -offset * 0.34),
    new THREE.Vector3(0, -height * 0.06, -offset * 0.13),
    new THREE.Vector3(0, height * 0.22, 0),
    new THREE.Vector3(0, height * 0.38, 0),
    new THREE.Vector3(0, height * 0.47, offset * 0.10),
    new THREE.Vector3(0, height * 0.50, offset * 0.28),
    new THREE.Vector3(0, height * 0.50, offset * 0.50 + outletExtension)
  ];
}

function buildParametricCalibrationPart(group) {
  const config = group.userData.config;
  const dimensions = config.dimensions;
  clearCalibrationChildren(group);
  if (config.kind === 'mirror-single') {
    const mirror = addCalibrationMesh(
      group,
      new THREE.BoxGeometry(dimensions.length - 0.025, Math.max(0.006, dimensions.height), dimensions.depth - 0.018),
      calibrationMaterials.mirror,
      config.id
    );
    mirror.userData.name = config.label;
    const frameThickness = Math.min(0.018, dimensions.depth * 0.12);
    const frameParts = [
      [[dimensions.length, frameThickness, frameThickness], [0, 0, dimensions.depth / 2 - frameThickness / 2]],
      [[dimensions.length, frameThickness, frameThickness], [0, 0, -dimensions.depth / 2 + frameThickness / 2]],
      [[frameThickness, frameThickness, dimensions.depth], [-dimensions.length / 2 + frameThickness / 2, 0, 0]],
      [[frameThickness, frameThickness, dimensions.depth], [dimensions.length / 2 - frameThickness / 2, 0, 0]]
    ];
    frameParts.forEach(([size, position]) => {
      const frame = addCalibrationMesh(group, new THREE.BoxGeometry(...size), calibrationMaterials.cameraDark, config.id);
      frame.position.set(...position);
      frame.userData.name = `${config.label}边框`;
    });
  }
  if (config.kind === 'cover') {
    const length = dimensions.length;
    const height = dimensions.height;
    const depth = dimensions.depth;
    const thickness = Math.min(dimensions.thickness, length / 3, height / 3, depth / 2);
    const panels = [
      [[length, height, thickness], [0, 0, depth / 2 - thickness / 2]],
      [[length, thickness, depth - thickness], [0, height / 2 - thickness / 2, -thickness / 2]],
      [[length, thickness, depth - thickness], [0, -height / 2 + thickness / 2, -thickness / 2]],
      [[thickness, height - thickness * 2, depth - thickness], [-length / 2 + thickness / 2, 0, -thickness / 2]],
      [[thickness, height - thickness * 2, depth - thickness], [length / 2 - thickness / 2, 0, -thickness / 2]]
    ];
    panels.forEach(([size, position], index) => {
      const radius = Math.min(0.035, height * 0.18, length * 0.04);
      const geometry = index === 0
        ? new RoundedBoxGeometry(size[0], size[1], size[2], 4, Math.min(radius, size[2] * 0.45))
        : new THREE.BoxGeometry(...size);
      const panel = addCalibrationMesh(group, geometry, calibrationMaterials.cover, config.id);
      panel.position.set(...position);
      panel.userData.name = config.label;
    });
    const screwRadius = Math.min(0.018, height * 0.065);
    const screwMarginX = Math.max(0.055, screwRadius * 2.2);
    const screwMarginY = Math.max(0.042, screwRadius * 2.2);
    const screwPositions = [];
    for (let row = 0; row < 2; row += 1) {
      for (let column = 0; column < 5; column += 1) {
        screwPositions.push([
          -length / 2 + screwMarginX + column * ((length - screwMarginX * 2) / 4),
          row === 0 ? height / 2 - screwMarginY : -height / 2 + screwMarginY
        ]);
      }
    }
    screwPositions.forEach(([x, y], index) => {
      const screw = addCalibrationMesh(
        group,
        new THREE.CylinderGeometry(screwRadius, screwRadius, 0.008, 18),
        calibrationMaterials.valveMetal,
        config.id
      );
      screw.rotation.x = Math.PI / 2;
      screw.position.set(x, y, depth / 2 + 0.003);
      screw.userData.name = `${config.label}固定螺丝${index + 1}`;
      const slot = addCalibrationMesh(group, new THREE.BoxGeometry(screwRadius * 1.25, screwRadius * 0.22, 0.003), calibrationMaterials.cameraDark, config.id);
      slot.position.set(screw.position.x, screw.position.y, depth / 2 + 0.008);
      slot.userData.name = screw.userData.name;
    });
  }
  if (config.kind === 'heatsink') {
    const length = dimensions.length;
    const height = dimensions.height;
    const depth = dimensions.depth;
    const thickness = Math.min(dimensions.thickness, height / 3, length / 12);
    const base = addCalibrationMesh(group, new THREE.BoxGeometry(length, thickness, depth), calibrationMaterials.heatsink, config.id);
    base.position.y = -height / 2 + thickness / 2;
    base.userData.name = config.label;
    const finCount = 16;
    for (let index = 0; index < finCount; index += 1) {
      const fin = addCalibrationMesh(
        group,
        new THREE.BoxGeometry(thickness, Math.max(thickness, height - thickness), depth),
        calibrationMaterials.heatsink,
        config.id
      );
      fin.position.set((index - (finCount - 1) / 2) * ((length - thickness) / (finCount - 1)), thickness / 2, 0);
      fin.userData.name = config.label;
    }
  }
  if (config.kind === 'flow-channel') {
    const width = dimensions.length;
    const depth = dimensions.depth;
    const wall = Math.min(dimensions.thickness, depth / 3, width / 20);
    const points = flowChannelPathPoints(dimensions);
    const curveLength = new THREE.CatmullRomCurve3(points, false, 'centripetal').getLength();
    const windowCenter = 0.30;
    const halfWindowProgress = Math.min(0.07 / Math.max(curveLength, 0.01), 0.08);
    const windowStart = windowCenter - halfWindowProgress;
    const windowEnd = windowCenter + halfWindowProgress;
    const wallRanges = [[0, windowStart], [windowEnd, 1]];
    const wallOffsets = [
      { offset: (depth - wall) / 2, side: '前壁' },
      { offset: -(depth - wall) / 2, side: '后壁' }
    ];
    const channelSurfaces = [];
    wallOffsets.forEach(({ offset, side }) => {
      wallRanges.forEach(([start, end]) => {
        const metalWall = addCalibrationMesh(
          group,
          sweptWideDuctGeometry(points, width, wall, Math.max(8, Math.round(44 * (end - start))), offset, start, end),
          calibrationMaterials.channelShell,
          config.id
        );
        metalWall.userData.name = `主通道铁质${side}`;
        channelSurfaces.push(metalWall);
      });
      const glassWindow = addCalibrationMesh(
        group,
        sweptWideDuctGeometry(points, width, wall, 10, offset, windowStart, windowEnd),
        calibrationMaterials.channelWindowGlass,
        config.id
      );
      glassWindow.userData.name = `${side}透明检测窗（上下各70毫米）`;
      glassWindow.renderOrder = 9;
      channelSurfaces.push(glassWindow);
    });
    const leftRail = addCalibrationMesh(
      group,
      sweptWideDuctGeometry(points, wall, depth, 44),
      calibrationMaterials.channelFrame,
      config.id
    );
    const rightRail = addCalibrationMesh(
      group,
      sweptWideDuctGeometry(points, wall, depth, 44),
      calibrationMaterials.channelFrame,
      config.id
    );
    leftRail.position.x = -width / 2 + wall / 2;
    rightRail.position.x = width / 2 - wall / 2;
    leftRail.userData.name = '主通道左侧铁质边框';
    rightRail.userData.name = '主通道右侧铁质边框';
    channelSurfaces.push(leftRail, rightRail);
    channelSurfaces.forEach((part) => { part.userData.detail = '主通道主体为白色铁质风道，上方出口向前延伸150毫米；前后相机对射处设置上下各70毫米的透明玻璃检测窗。'; });
  }
  if (config.kind === 'reject-volute') {
    const length = dimensions.length;
    const height = dimensions.height;
    const depth = dimensions.depth;
    const drop = dimensions.drop;
    const wall = Math.min(dimensions.thickness, depth / 4, length / 24);
    const shell = addCalibrationMesh(group, voluteGeometry(length), calibrationMaterials.rejectVolute, config.id);
    shell.scale.set(1, height / 0.47, depth / 0.58);
    shell.userData.name = config.label;

    const throatDepth = Math.max(0.07, depth * 0.34);
    const throatY = -height / 2 - drop / 2 + wall;
    const throatParts = [
      [[length, drop, wall], [0, throatY, throatDepth / 2 - wall / 2]],
      [[length, drop, wall], [0, throatY, -throatDepth / 2 + wall / 2]],
      [[wall, drop, throatDepth], [-length / 2 + wall / 2, throatY, 0]],
      [[wall, drop, throatDepth], [length / 2 - wall / 2, throatY, 0]]
    ];
    throatParts.forEach(([size, position]) => {
      const panel = addCalibrationMesh(group, new THREE.BoxGeometry(...size), calibrationMaterials.rejectVolute, config.id);
      panel.position.set(...position);
      panel.userData.name = `${config.label}入口`;
    });

    const fanStub = addCalibrationMesh(
      group,
      new THREE.CylinderGeometry(height * 0.18, height * 0.18, Math.max(0.14, depth * 0.55), 24),
      calibrationMaterials.rejectVolute,
      config.id
    );
    fanStub.rotation.z = Math.PI / 2;
    fanStub.position.set(length / 2 + Math.max(0.07, depth * 0.25), height * 0.04, 0);
    fanStub.userData.name = `${config.label}风机接口`;
  }
}

function createCalibrationPart(config) {
  const group = new THREE.Group();
  group.name = config.label;
  group.userData.calibrationId = config.id;
  group.userData.label = config.label;
  group.userData.count = config.count;
  group.userData.note = config.note;
  group.userData.config = JSON.parse(JSON.stringify(config));
  group.position.set(...config.position);
  group.rotation.set(...config.rotation.map(THREE.MathUtils.degToRad));
  const initialScale = Array.isArray(config.scale) ? config.scale : [config.scale || 1, config.scale || 1, config.scale || 1];
  group.scale.set(...initialScale);
  group.userData.defaultTransform = {
    position: [...config.position],
    rotation: [...config.rotation],
    scale: [...initialScale]
  };
  group.userData.defaultDimensions = config.dimensions ? { ...config.dimensions } : null;

  if (config.kind === 'camera-row') addCameraRow(group, config.id, config.count, config.direction);
  if (config.kind === 'compute-row') addComputeRow(group, config.id, config.count);
  if (['mirror-single', 'cover', 'heatsink', 'flow-channel', 'reject-volute'].includes(config.kind)) buildParametricCalibrationPart(group);
  if (config.kind === 'valve-row') addValveRow(group, config.id, config.count);

  calibrationLayer.add(group);
  calibrationParts.set(config.id, group);
  return group;
}

[
  {
    id: 'front-cameras', label: '前视相机组（8台）', count: 8, kind: 'camera-row', direction: 'rear',
    position: [0.013688, 2.424479, 0.167221], rotation: [0, 0, 0], scale: [0.8617110902523837, 0.8617110902523837, 0.8617110902523837], note: '机器前方低位舱内，直接朝向检测通道。'
  },
  {
    id: 'rear-cameras', label: '后视相机组（8台）', count: 8, kind: 'camera-row', direction: 'down',
    position: [0.008002, 2.929415, -0.810111], rotation: [0, 0, 0], scale: [0.85, 0.85, 0.85], note: '机器背方高位舱内，镜头朝下，通过反光镜观察通道。'
  },
  {
    id: 'magic-cameras', label: '精灵眼相机组（4台）', count: 4, kind: 'camera-row', direction: 'down',
    position: [-0.003608207736811635, 2.330293455648308, -0.8887049395669343], rotation: [0, 0, 0], scale: [1, 1, 1], note: '精灵眼罩壳上部；1—2号接通道9，3—4号接通道10。'
  },
  {
    id: 'compute-boxes', label: '算力盒子组（10个）', count: 10, kind: 'compute-row',
    position: [-0.046239, 2.034573, -1.117372], rotation: [0, 0, 0], scale: [0.774307, 0.774307, 0.774307], note: '精灵眼罩壳下部，横向排列。'
  },
  {
    id: 'mirrors', label: '反光镜1', count: 1, kind: 'mirror-single',
    dimensions: { length: 2.00, height: 0.01, depth: 0.14 },
    position: [0.004074, 2.558265, -0.829302], rotation: [42, 0, 0], scale: [0.9, 0.9, 0.9], note: '单根反光镜，可复制、位移、旋转和缩放。保留原反光镜组的已校准中心位置。'
  },
  {
    id: 'valves', label: '电磁阀组（32个）', count: 32, kind: 'valve-row',
    position: [-0.031286, 2.878776, -0.515353], rotation: [90.81208, -0.171593, 0.285773], scale: [0.827251, 0.577727, 0.577727], note: '主检测区域上方的32位喷射排。'
  },
  {
    id: 'flow-channel-1', label: '连续棉流主通道（1600×70）', count: 1, kind: 'flow-channel',
    dimensions: { length: 2.33, height: 2.05, depth: 0.27, thickness: 0.012, offset: 0.72 },
    position: [-0.04408803968526252, 2.5782623922476064, -0.38111494470446605], rotation: [0, 0, 0], scale: [0.85, 0.85, 0.85],
    note: '连续空心白色铁质主通道：下方斜入、贯穿检测区，上方出口向前延伸150毫米；前后相机对射位置分别设置上下各70毫米的透明玻璃检测窗。'
  },
  {
    id: 'reject-volute-1', label: '排杂漩涡风道＋风机接口', count: 1, kind: 'reject-volute',
    dimensions: { length: 1.62, height: 0.42, depth: 0.36, thickness: 0.018, drop: 0.22 },
    position: [-0.06991307341462512, 2.8568308115714007, 0.13062473737787755], rotation: [90, 0, 0], scale: [1.1844425599368247, 0.8680448176009804, 0.8680448176009804],
    note: '独立排杂支路草模：入口贴近32位喷阀后的异物出口，进入紧凑蜗壳后由右端风机接口抽走；不承担正常棉流输送。'
  },
  {
    id: 'cover-1', label: '罩壳1', count: 1, kind: 'cover',
    dimensions: { length: 1.64, height: 0.24, depth: 0.02, thickness: 0.015 },
    position: [-0.019831424666720946, 2.348879635895407, 0.30033862543684176], rotation: [0, 0, 0], scale: [1, 1, 1], note: '开放背面的薄壁罩壳，可调整长宽高、板厚、位置和旋转，也可复制。'
  },
  {
    id: 'heatsink-1', label: '散热片1', count: 1, kind: 'heatsink',
    dimensions: { length: 1.34, height: 0.17, depth: 0.08, thickness: 0.018 },
    position: [0.005711318451512161, 2.04222648449484, -1.2115566226616268], rotation: [0, 0, 0], scale: [1, 1, 1], note: '带底板和12条散热鳍片的校准件，可复制、位移、旋转和缩放。'
  },
  {
    id: 'mirror-single-1784558446608', label: '反光镜2', count: 1, kind: 'mirror-single', isDuplicate: true,
    dimensions: { length: 2.00, height: 0.01, depth: 0.14 },
    position: [-0.03620035075280398, 2.086802611912021, -0.8868139967877691], rotation: [42, 0, 0], scale: [0.9, 0.9, 0.9], note: '用户校准的第二根反光镜。'
  },
  {
    id: 'mirror-single-1784558638431', label: '反光镜3', count: 1, kind: 'mirror-single', isDuplicate: true,
    dimensions: { length: 2.00, height: 0.01, depth: 0.14 },
    position: [-0.01130177222562116, 2.223756485264831, -0.7638272783465556], rotation: [-207, 0, 0], scale: [0.9, 0.9, 0.9], note: '用户校准的第三根反光镜。'
  },
  {
    id: 'cover-1784559273935', label: '罩壳2', count: 1, kind: 'cover', isDuplicate: true,
    dimensions: { length: 1.75, height: 0.30, depth: 0.02, thickness: 0.015 },
    position: [0, 2.92, -0.9838928401126742], rotation: [180, 0, 0], scale: [1, 1, 1], note: '用户校准的第二块可拆罩壳。'
  }
].forEach(createCalibrationPart);

const calibrationModeButton = document.querySelector('#calibration-mode');
const calibrationPartSelect = document.querySelector('#calibration-part');
const calibrationStatus = document.querySelector('#calibration-status');
const calibrationInputs = [...document.querySelectorAll('[data-axis]')];
const calibrationDimensionInputs = [...document.querySelectorAll('[data-dimension]')];
const calibrationTransformButtons = [...document.querySelectorAll('[data-transform]')];
const calibrationSave = document.querySelector('#calibration-save');
const calibrationExport = document.querySelector('#calibration-export');
const calibrationReset = document.querySelector('#calibration-reset');
const calibrationDuplicate = document.querySelector('#calibration-duplicate');
const calibrationDelete = document.querySelector('#calibration-delete');

function addCalibrationOption(part, id) {
  if (calibrationPartSelect.querySelector(`option[value="${id}"]`)) return;
  const option = document.createElement('option');
  option.value = id;
  option.textContent = part.userData.label;
  calibrationPartSelect.appendChild(option);
}
calibrationParts.forEach(addCalibrationOption);

function serializeCalibrationLayout() {
  return {
    model: 'JWF0019A',
    version: 5,
    coordinateSystem: { x: '左右，正数向右', y: '上下，正数向上', z: '前后，正数向前' },
    parts: [...calibrationParts.entries()].map(([id, part]) => ({
      id,
      name: part.userData.label,
      count: part.userData.count,
      note: part.userData.note,
      kind: part.userData.config.kind,
      dimensions: part.userData.config.dimensions ? { ...part.userData.config.dimensions } : null,
      config: JSON.parse(JSON.stringify(part.userData.config)),
      position: { x: part.position.x, y: part.position.y, z: part.position.z },
      rotationDegrees: {
        x: THREE.MathUtils.radToDeg(part.rotation.x),
        y: THREE.MathUtils.radToDeg(part.rotation.y),
        z: THREE.MathUtils.radToDeg(part.rotation.z)
      },
      scale: { x: part.scale.x, y: part.scale.y, z: part.scale.z }
    }))
  };
}

function persistCalibrationLayout(showStatus = false) {
  localStorage.setItem(calibrationStorageKey, JSON.stringify(serializeCalibrationLayout()));
  if (showStatus) calibrationStatus.textContent = '位置已保存';
}

function restoreCalibrationLayout() {
  try {
    const saved = JSON.parse(localStorage.getItem(calibrationStorageKey) || 'null');
    saved?.parts?.forEach((item) => {
      let part = calibrationParts.get(item.id);
      if (!part && item.config) {
        part = createCalibrationPart(item.config);
        addCalibrationOption(part, item.id);
      }
      if (!part) return;
      if (item.dimensions && part.userData.config.dimensions) {
        part.userData.config.dimensions = { ...item.dimensions };
        buildParametricCalibrationPart(part);
      }
      part.position.set(item.position.x, item.position.y, item.position.z);
      part.rotation.set(
        THREE.MathUtils.degToRad(item.rotationDegrees.x),
        THREE.MathUtils.degToRad(item.rotationDegrees.y),
        THREE.MathUtils.degToRad(item.rotationDegrees.z)
      );
      part.scale.set(item.scale.x, item.scale.y, item.scale.z);
    });
  } catch (error) {
    console.warn('内部布局记录读取失败，已使用初始位置', error);
  }
}
restoreCalibrationLayout();

function updateCalibrationPartVisibility(mode = 'external') {
  calibrationLayer.visible = true;
  calibrationParts.forEach((part, id) => {
    const kind = part.userData.config.kind;
    const external = kind === 'cover' || kind === 'heatsink' || id === 'flow-channel-1';
    const processDuct = id === 'flow-channel-1' || id === 'reject-volute-1';
    const detectionPart = id === 'front-cameras' || id === 'rear-cameras' || id === 'mirrors';
    part.visible = mode === 'all'
      || external
      || ((mode === 'process' || mode === 'detect') && (processDuct || detectionPart));
  });
}

function setExternalModulesGhosted(ghosted) {
  calibrationParts.forEach((part) => {
    if (!['cover', 'heatsink'].includes(part.userData.config.kind)) return;
    part.visible = true;
    part.traverse((object) => {
      if (!object.isMesh) return;
      object.material = ghosted ? calibrationMaterials.coverGhost : object.userData.baseMaterial;
      object.renderOrder = ghosted ? 12 : 0;
    });
  });
}

function setFlowChannelGhosted(ghosted) {
  const channel = calibrationParts.get('flow-channel-1');
  if (!channel) return;
  channel.traverse((object) => {
    if (!object.isMesh) return;
    object.material = ghosted ? calibrationMaterials.channelGlass : object.userData.baseMaterial;
    object.renderOrder = ghosted ? 10 : 0;
  });
}

function setFlowChannelPlaybackAppearance(active) {
  const channel = calibrationParts.get('flow-channel-1');
  if (!channel) return;
  channel.traverse((object) => {
    if (!object.isMesh) return;
    if (active) {
      object.material = /透明检测窗/.test(object.userData.name || '')
        ? calibrationMaterials.channelPlaybackWindow
        : calibrationMaterials.channelGlass;
    } else {
      object.material = object.userData.baseMaterial;
    }
    object.renderOrder = active ? 10 : 0;
  });
}

updateCalibrationPartVisibility('external');

function updateCalibrationFields() {
  const part = selectedCalibrationPart;
  calibrationInputs.forEach((input) => {
    input.disabled = !part || !calibrationEnabled;
    if (!part) {
      input.value = '';
      return;
    }
    const axis = input.dataset.axis;
    if (axis === 'scale') input.value = part.scale.x.toFixed(2);
    else if (axis.startsWith('position.')) input.value = part.position[axis.split('.')[1]].toFixed(3);
    else input.value = THREE.MathUtils.radToDeg(part.rotation[axis.split('.')[1]]).toFixed(1);
  });
  calibrationDimensionInputs.forEach((input) => {
    const dimensions = part?.userData.config.dimensions;
    const key = input.dataset.dimension;
    input.disabled = !calibrationEnabled || !dimensions || !(key in dimensions);
    input.value = dimensions && key in dimensions ? Number(dimensions[key]).toFixed(3) : '';
  });
  calibrationReset.disabled = !calibrationEnabled || !part;
  calibrationDuplicate.disabled = !calibrationEnabled || !part || !['mirror-single', 'cover', 'heatsink'].includes(part.userData.config.kind);
  calibrationDelete.disabled = !calibrationEnabled || !part?.userData.config.isDuplicate;
}

function selectCalibrationPart(id) {
  const part = calibrationParts.get(id);
  if (!part) return;
  selectedCalibrationPart = part;
  calibrationPartSelect.value = id;
  transformControls.attach(part);
  transformControls.getHelper().visible = calibrationEnabled;
  if (calibrationHelper) scene.remove(calibrationHelper);
  calibrationHelper = new THREE.BoxHelper(part, 0xffd64a);
  scene.add(calibrationHelper);
  partTitle.textContent = part.userData.label;
  partDetail.textContent = part.userData.note;
  calibrationStatus.textContent = '已选中，可拖动三轴';
  updateCalibrationFields();
}

function setCalibrationEnabled(enabled) {
  calibrationEnabled = enabled;
  updateCalibrationPartVisibility(enabled ? 'all' : 'external');
  calibrationModeButton.classList.toggle('active', enabled);
  calibrationModeButton.textContent = enabled ? '关闭内部校准模式' : '开启内部校准模式';
  calibrationPartSelect.disabled = !enabled;
  calibrationTransformButtons.forEach((button) => { button.disabled = !enabled; });
  calibrationSave.disabled = !enabled;
  calibrationExport.disabled = !enabled;
  calibrationStatus.textContent = enabled ? '请选择部件' : '未开启';
  if (enabled) {
    applyMode('xray');
    setFlowChannelGhosted(true);
    setExternalModulesGhosted(true);
    if (!selectedCalibrationPart) selectCalibrationPart('front-cameras');
    else transformControls.getHelper().visible = true;
    if (calibrationHelper) calibrationHelper.visible = true;
  } else {
    transformControls.detach();
    transformControls.getHelper().visible = false;
    if (calibrationHelper) calibrationHelper.visible = false;
    applyMode('solid');
    setFlowChannelGhosted(false);
    setExternalModulesGhosted(false);
  }
  updateCalibrationFields();
}

calibrationModeButton.addEventListener('click', () => setCalibrationEnabled(!calibrationEnabled));
calibrationPartSelect.addEventListener('change', () => selectCalibrationPart(calibrationPartSelect.value));
calibrationTransformButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calibrationTransformButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    transformControls.setMode(button.dataset.transform);
  });
});
calibrationInputs.forEach((input) => {
  input.addEventListener('change', () => {
    if (!selectedCalibrationPart) return;
    const value = Number(input.value);
    if (!Number.isFinite(value)) return;
    const axis = input.dataset.axis;
    if (axis === 'scale') selectedCalibrationPart.scale.setScalar(Math.max(0.1, value));
    else if (axis.startsWith('position.')) selectedCalibrationPart.position[axis.split('.')[1]] = value;
    else selectedCalibrationPart.rotation[axis.split('.')[1]] = THREE.MathUtils.degToRad(value);
    calibrationHelper?.update();
    persistCalibrationLayout();
    updateCalibrationFields();
  });
});
calibrationDimensionInputs.forEach((input) => {
  input.addEventListener('change', () => {
    const dimensions = selectedCalibrationPart?.userData.config.dimensions;
    const key = input.dataset.dimension;
    const value = Number(input.value);
    if (!dimensions || !(key in dimensions) || !Number.isFinite(value)) return;
    dimensions[key] = Math.max(key === 'thickness' ? 0.005 : 0.01, value);
    buildParametricCalibrationPart(selectedCalibrationPart);
    calibrationHelper?.update();
    persistCalibrationLayout();
    updateCalibrationFields();
  });
});
transformControls.addEventListener('objectChange', () => {
  calibrationHelper?.update();
  updateCalibrationFields();
  persistCalibrationLayout();
});
calibrationSave.addEventListener('click', () => persistCalibrationLayout(true));
calibrationExport.addEventListener('click', () => {
  const blob = new Blob([JSON.stringify(serializeCalibrationLayout(), null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'JWF0019A-内部布局校准.json';
  anchor.click();
  URL.revokeObjectURL(url);
  calibrationStatus.textContent = '布局已导出';
});
calibrationDuplicate.addEventListener('click', () => {
  if (!selectedCalibrationPart) return;
  const sourceConfig = selectedCalibrationPart.userData.config;
  if (!['mirror-single', 'cover', 'heatsink'].includes(sourceConfig.kind)) return;
  const sameKindCount = [...calibrationParts.values()].filter((part) => part.userData.config.kind === sourceConfig.kind).length;
  const config = JSON.parse(JSON.stringify(sourceConfig));
  config.id = `${sourceConfig.kind}-${Date.now()}`;
  config.isDuplicate = true;
  config.label = `${sourceConfig.kind === 'mirror-single' ? '反光镜' : sourceConfig.kind === 'cover' ? '罩壳' : '散热片'}${sameKindCount + 1}`;
  config.position = [
    selectedCalibrationPart.position.x + 0.12,
    selectedCalibrationPart.position.y + 0.08,
    selectedCalibrationPart.position.z + 0.12
  ];
  config.rotation = [
    THREE.MathUtils.radToDeg(selectedCalibrationPart.rotation.x),
    THREE.MathUtils.radToDeg(selectedCalibrationPart.rotation.y),
    THREE.MathUtils.radToDeg(selectedCalibrationPart.rotation.z)
  ];
  config.scale = [selectedCalibrationPart.scale.x, selectedCalibrationPart.scale.y, selectedCalibrationPart.scale.z];
  const duplicate = createCalibrationPart(config);
  addCalibrationOption(duplicate, config.id);
  selectCalibrationPart(config.id);
  persistCalibrationLayout();
  calibrationStatus.textContent = `${config.label}已复制`;
});
calibrationDelete.addEventListener('click', () => {
  const part = selectedCalibrationPart;
  if (!part?.userData.config.isDuplicate) return;
  const id = part.userData.calibrationId;
  transformControls.detach();
  if (calibrationHelper) {
    scene.remove(calibrationHelper);
    calibrationHelper = null;
  }
  clearCalibrationChildren(part);
  calibrationLayer.remove(part);
  calibrationParts.delete(id);
  calibrationPartSelect.querySelector(`option[value="${id}"]`)?.remove();
  selectedCalibrationPart = null;
  calibrationPartSelect.value = '';
  updateCalibrationFields();
  persistCalibrationLayout();
  calibrationStatus.textContent = '副本已删除';
});
calibrationReset.addEventListener('click', () => {
  if (!selectedCalibrationPart) return;
  const defaults = selectedCalibrationPart.userData.defaultTransform;
  selectedCalibrationPart.position.set(...defaults.position);
  selectedCalibrationPart.rotation.set(...defaults.rotation.map(THREE.MathUtils.degToRad));
  selectedCalibrationPart.scale.set(...defaults.scale);
  if (selectedCalibrationPart.userData.defaultDimensions) {
    selectedCalibrationPart.userData.config.dimensions = { ...selectedCalibrationPart.userData.defaultDimensions };
    buildParametricCalibrationPart(selectedCalibrationPart);
  }
  calibrationHelper?.update();
  updateCalibrationFields();
  persistCalibrationLayout(true);
});

const shell = makeLayer('shell');

// 图7左侧落地承重柱：灰色机身、竖向绿色饰板和下部散热孔。
const leftColumn = new THREE.Group();
shell.add(leftColumn);
roundedBox(
  leftColumn,
  [0.42, 2.18, 0.68],
  [-1.16, 1.09, 0],
  materials.paint,
  '左侧落地立柱',
  '与风机侧同宽的窄落地支撑，前面由灰色散热区和竖向绿色面板组成。',
  0.045
);
box(leftColumn, [0.18, 2.06, 0.028], [-1.05, 1.11, 0.351], materials.green, '竖向绿色面板', '左柱靠内侧的连续绿色识别面。');
box(leftColumn, [0.002, 0.54, 0.31], [-0.948, 2.14, 0.19], materials.green, '', '');
box(leftColumn, [0.38, 0.018, 0.03], [-1.16, 1.29, 0.354], materials.paintDark, '', '');
addVentGrid(leftColumn);

// 用户第三轮校对：主检测箱从侧面看是L形，上臂容纳后视8相机，
// 下方前伸的倾斜舱容纳前视8相机，不能再用完整矩形框代替。
const bodyFrame = new THREE.Group();
shell.add(bodyFrame);
const lBody = new THREE.Mesh(
  extrudeSideProfileGeometry(2.67, [
    [-0.44, 1.98],
    [-0.44, 2.67],
    [0.32, 2.67],
    [0.32, 2.25],
    [-0.12, 2.25],
    [-0.12, 1.98]
  ]),
  materials.paint
);
lBody.position.x = -0.035;
registerMesh(
  lBody,
  'L型主检测箱体',
  '侧面为L形：上部横臂安装8台后视相机，后侧竖臂向下包住贯通检测通道。',
  'shell'
);
bodyFrame.add(lBody);

const frontCameraBay = new THREE.Mesh(
  new RoundedBoxGeometry(2.42, 0.22, 0.50, 4, 0.025),
  materials.paintDark
);
frontCameraBay.position.set(-0.035, 2.10, 0.31);
frontCameraBay.rotation.x = 0.20;
registerMesh(
  frontCameraBay,
  '前视相机倾斜舱',
  '位于L形箱体斜下方，向正面突出并略向下倾斜，内部安装8台前视相机。',
  'shell'
);
bodyFrame.add(frontCameraBay);

const frontCover = new THREE.Group();
frontCover.position.z = 0.388;
shell.add(frontCover);
roundedBox(frontCover, [2.67, 0.48, 0.045], [-0.035, 2.31, 0], materials.paint, '主机正面白色罩板', '整张白色罩板的左右边缘与两根支撑腿外边对齐。', 0.018);
textPlate(frontCover, 'JWF0019A', 0.66, 0.13, [0.38, 2.34, 0.024], 68);
addLogo(frontCover, [0.94, 2.31, 0.027]);
addBoltRow(frontCover, 2.08, 0.029, 11);
trackExplode(frontCover, [0, 0, 1], 0.95);

const rearCover = new THREE.Group();
rearCover.position.z = -0.388;
shell.add(rearCover);
roundedBox(rearCover, [2.67, 0.48, 0.045], [-0.035, 2.31, 0], materials.paint, '主机背面罩板', '左右边缘与两根支撑腿外边对齐；拆下后可看到背面主相机和精灵眼组件。', 0.018);
trackExplode(rearCover, [0, 0, -1], 0.95);

// 顶部为蜗壳形横向风道，不再使用普通圆筒。
const drum = new THREE.Group();
drum.position.z = 0.18;
shell.add(drum);
const volute = new THREE.Mesh(voluteGeometry(1.62), materials.paintDark);
volute.position.set(-0.04, 2.83, 0);
registerMesh(volute, '顶部横向蜗壳风道', '更小并向正面罩板方向前移的蜗壳形风道，下部喉口与贯通检测风道平滑衔接。', 'shell');
drum.add(volute);
cylinder(drum, 0.185, 0.10, [0.82, 2.84, 0], [0, 0, Math.PI / 2], materials.steel, '蜗壳右端连接座', '蜗壳与右侧风机管路的连接座。');
const voluteRing = new THREE.Mesh(new THREE.TorusGeometry(0.105, 0.014, 10, 40), materials.steel);
voluteRing.position.set(-0.86, 2.87, 0.015);
voluteRing.rotation.y = Math.PI / 2;
registerMesh(voluteRing, '蜗壳端面检修环', '用于表达蜗壳而非普通圆筒的端面中心。', 'shell');
drum.add(voluteRing);

// 信号灯和左上圆形维护盖。
const signal = new THREE.Group();
signal.position.set(-0.56, 3.02, 0.29);
shell.add(signal);
cylinder(signal, 0.07, 0.075, [0, 0, 0], [0, 0, 0], materials.dark, '三色信号灯', '图7左上方的设备状态灯。');
cylinder(signal, 0.055, 0.08, [0, 0.08, 0], [0, 0, 0], materials.red, '', '');
cylinder(signal, 0.055, 0.08, [0, 0.16, 0], [0, 0, 0], materials.yellow, '', '');
cylinder(signal, 0.055, 0.08, [0, 0.24, 0], [0, 0, 0], materials.signalGreen, '', '');
cylinder(signal, 0.025, 0.06, [0, 0.31, 0], [0, 0, 0], materials.dark, '', '');
const serviceRing = new THREE.Mesh(new THREE.TorusGeometry(0.105, 0.022, 12, 40), materials.paint);
serviceRing.position.set(-0.32, 2.91, 0.382);
registerMesh(serviceRing, '左上圆形维护盖', '图7信号灯右侧的圆形外观件。', 'shell');
shell.add(serviceRing);

// 风机只在右前上方；管路从蜗壳端口到圆盘全程保持同径。
const sidePipe = new THREE.Group();
sidePipe.position.z = 0.18;
shell.add(sidePipe);
cylinder(sidePipe, 0.19, 0.25, [0.98, 2.94, 0.02], [0, 0, Math.PI / 2], materials.dark, '右前上方风机', '紧贴风机侧上部安装的唯一风机；背面不复制风机。');
cylinder(sidePipe, 0.215, 0.055, [0.855, 2.94, 0.02], [0, 0, Math.PI / 2], materials.steel, '风机连接法兰', '风机与上部蜗壳的连接法兰。');
const pipeCurve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0.88, 2.83, 0.015),
  new THREE.Vector3(1.27, 2.83, 0.015),
  new THREE.Vector3(1.55, 2.77, 0.015),
  new THREE.Vector3(1.69, 2.56, 0.015),
  new THREE.Vector3(1.69, 2.30, 0.015)
]);
const pipeMesh = new THREE.Mesh(new THREE.TubeGeometry(pipeCurve, 56, 0.105, 18, false), materials.paintDark);
registerMesh(pipeMesh, '右侧等径弯管', '从顶部出口到圆形收集口全程保持相同管径，不做变径。', 'shell');
sidePipe.add(pipeMesh);
cylinder(sidePipe, 0.135, 0.09, [0.91, 2.83, 0.015], [0, 0, Math.PI / 2], materials.steel, '管路法兰', '顶部蜗壳与右侧弯管的连接法兰。');
cylinder(sidePipe, 0.36, 0.055, [1.69, 2.245, 0.015], [0, 0, 0], materials.paintDark, '圆形出口盘', '图7右侧大直径圆盘状出口。');
cylinder(sidePipe, 0.1, 0.08, [1.69, 2.285, 0.015], [0, 0, 0], materials.steel, '', '');
trackExplode(sidePipe, [1, 0, 0], 0.65);

// 用户现场确认：下方是两根落地支撑，信号灯侧立柱内面为屏幕，风机侧立柱内面为电柜。
const rightColumn = new THREE.Group();
shell.add(rightColumn);
roundedBox(
  rightColumn,
  [0.42, 2.18, 0.68],
  [1.09, 1.09, 0],
  materials.paint,
  '风机侧落地立柱',
  '与信号灯侧同宽的窄落地支撑；电柜位于朝向两柱之间的内侧面。',
  0.045
);
box(rightColumn, [0.16, 0.62, 0.025], [1.17, 2.12, 0.352], materials.green, '风机侧绿色识别面', '风机侧立柱上部的绿色罩板。');

const screenGroup = new THREE.Group();
shell.add(screenGroup);
roundedBox(screenGroup, [0.055, 0.40, 0.38], [-0.925, 1.66, 0.02], materials.paintDark, '操作屏箱体', '信号灯侧立柱的内侧操作屏箱体。', 0.018);
roundedBox(screenGroup, [0.022, 0.30, 0.28], [-0.891, 1.66, 0.02], materials.dark, '操作屏', '信号灯侧立柱内面屏幕，用于参数、统计与相机状态查看。', 0.008);
box(screenGroup, [0.008, 0.24, 0.22], [-0.876, 1.66, 0.02], materials.light, '', '', 'decal');

const electricCabinet = new THREE.Group();
shell.add(electricCabinet);
roundedBox(electricCabinet, [0.055, 0.78, 0.47], [0.855, 1.48, 0], materials.paintDark, '电柜门', '风机侧立柱内面的一体式电气柜门。', 0.018);
roundedBox(electricCabinet, [0.022, 0.68, 0.39], [0.821, 1.48, 0], materials.paint, '电柜内侧面板', '电柜完全收在右侧落地立柱内，不占用中间悬空区域。', 0.01);
roundedBox(electricCabinet, [0.016, 0.10, 0.10], [0.798, 1.69, 0.13], materials.yellow, '', '', 0.008);
cylinder(electricCabinet, 0.032, 0.045, [0.775, 1.69, 0.13], [0, 0, Math.PI / 2], materials.red, '电柜门旋转按钮', '风机侧电柜门上的红色旋转按钮，带黄色安全底座。');

// 正面是1600×70 mm的全机幅水平入口；背面同一位置背有精灵眼三角立体罩。
const intakeDuct = new THREE.Group();
shell.add(intakeDuct);
roundedBox(intakeDuct, [1.72, 0.075, 0.19], [-0.02, 1.965, 0.295], materials.recess, '1600×70入口通道', '正面可见的全机幅水平入口通道，约1600 mm长、70 mm高。', 0.016);
roundedBox(intakeDuct, [1.60, 0.038, 0.015], [-0.02, 1.965, 0.398], materials.dark, '入口通道开口', '入口通道保持全宽，不在中部收窄。', 0.008);

const magicHousing = new THREE.Group();
shell.add(magicHousing);
const magicWedge = new THREE.Mesh(invertedRightTrianglePrismGeometry(1.96, 0.78, 0.58), materials.paintDark);
magicWedge.position.set(-0.02, 1.61, -0.36);
registerMesh(magicWedge, '精灵眼三角罩体', '加大的封闭实体倒扣直角三角罩；顶面贴住入口通道，竖边继续向下延伸。', 'shell');
magicHousing.add(magicWedge);

// 主机下方可见的灰色落棉/导流斗，保持图7的中部悬空关系。
const chute = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.28, 0.48, 4), materials.paintDark);
chute.position.set(-0.13, 1.76, -0.08);
chute.rotation.y = Math.PI / 4;
chute.scale.set(1.35, 1, 0.72);
registerMesh(chute, '主机下方导流斗', '图7中主梁下方可见的灰色导流斗外形。', 'shell');
shell.add(chute);

// 内部结构：默认关闭，外形通过后再逐层打开核对。
const front = makeLayer('front');
front.position.set(0, 2.10, 0.36);
front.rotation.x = 0.20;
for (let i = 0; i < 8; i += 1) {
  cameraModule(front, -0.82 + i * 0.229, 0, 0, 'front', i + 1, '前视');
}
trackExplode(front, [0, 0, 1], 0.42);

const rear = makeLayer('rear');
for (let i = 0; i < 8; i += 1) {
  cameraModule(rear, -0.82 + i * 0.229, 2.51, -0.30, 'down', i + 1, '后视');
}
const rearMirror = box(rear, [1.82, 0.018, 0.15], [-0.02, 2.30, -0.30], materials.steel, '后视45°反光镜', '随8台后视相机整体上移，继续保持在向下镜头约100 mm处。', 'internal');
rearMirror.rotation.x = Math.PI / 4;
trackExplode(rear, [0, 0, -1], 0.42);

const magic = makeLayer('magic');
magic.position.z = -0.10;
for (let i = 0; i < 4; i += 1) {
  cameraModule(magic, -0.63 + i * 0.42, 1.84, -0.38, 'down', i + 1, '精灵眼');
}
const magicMirrorLower = box(magic, [1.58, 0.018, 0.11], [-0.02, 1.63, -0.40], materials.steel, '精灵眼第一反光镜', '位于4台精灵眼相机向下镜头约100 mm处的长条45°反光镜。', 'internal');
magicMirrorLower.rotation.x = Math.PI / 4;
const magicMirrorUpper = box(magic, [1.58, 0.018, 0.11], [-0.02, 1.75, -0.18], materials.steel, '精灵眼第二反光镜', '光路向右并向上后的第二块长条45°反光镜。', 'internal');
magicMirrorUpper.rotation.x = -Math.PI / 4;
trackExplode(magic, [0, -0.18, -1], 0.66);

const compute = makeLayer('compute');

const channel = makeLayer('channel');
box(channel, [1.78, 0.035, 0.14], [-0.02, 2.49, 0], materials.light, '上照明板', '主检测通道照明组件，当前只标位置。', 'internal');
box(channel, [1.78, 0.035, 0.14], [-0.02, 1.99, 0], materials.light, '下照明板', '主检测通道照明组件，当前只标位置。', 'internal');

const ejection = makeLayer('ejection');
for (let i = 0; i < 32; i += 1) {
  const x = -0.82 + i * (1.64 / 31);
  cylinder(
    ejection,
    0.015,
    0.105,
    [x, 3.01, -0.22],
    [Math.PI / 2, 0, 0],
    materials.orange,
    `喷射阀${i + 1}`,
    `第${i + 1}个电磁喷射阀；位于后视相机上方约500 mm并靠后布置，不附加长底板。`,
    'internal',
    14
  );
}

const cottonFlow = new THREE.Group();
cottonFlow.visible = false;
machine.add(cottonFlow);
const processStatus = document.querySelector('#process-status');
const processPlay = document.querySelector('#process-play');
let processDemoPlaying = false;
let processPlaybackRate = 1;
let processTimelineMs = 0;

const processVoice = {
  intake: new Audio('./assets/audio/step-intake.mp3'),
  scan: new Audio('./assets/audio/step-scan.mp3'),
  detect: new Audio('./assets/audio/step-detect.mp3'),
  eject: new Audio('./assets/audio/step-eject.mp3'),
  suction: new Audio('./assets/audio/step-suction.mp3')
};
Object.values(processVoice).forEach((audio) => { audio.preload = 'auto'; });
let activeProcessVoice = null;
const processVoiceQueue = [];
const playedProcessVoiceCues = new Set();
let processVoiceCycleIndex = 0;

function playNextProcessVoice() {
  if (activeProcessVoice || !processVoiceQueue.length || !processDemoPlaying) return;
  const clipName = processVoiceQueue.shift();
  const audio = processVoice[clipName];
  if (!audio) {
    playNextProcessVoice();
    return;
  }
  activeProcessVoice = audio;
  audio.currentTime = 0;
  audio.onended = () => {
    activeProcessVoice = null;
    playNextProcessVoice();
  };
  audio.play().catch(() => {
    activeProcessVoice = null;
    playNextProcessVoice();
  });
}

function stopProcessVoice() {
  Object.values(processVoice).forEach((audio) => {
    audio.pause();
    audio.currentTime = 0;
    audio.onended = null;
  });
  activeProcessVoice = null;
  processVoiceQueue.length = 0;
  playedProcessVoiceCues.clear();
}

function queueProcessVoiceCue(cue, clipName) {
  if (playedProcessVoiceCues.has(cue)) return;
  playedProcessVoiceCues.add(cue);
  processVoiceQueue.push(clipName);
  playNextProcessVoice();
}

const cottonLobeGeometry = new THREE.SphereGeometry(0.034, 8, 6);
const impurityLobeGeometry = new THREE.DodecahedronGeometry(0.038, 0);
const cottonMaterial = new THREE.MeshStandardMaterial({ color: 0xf5f0df, roughness: 1, transparent: true, opacity: 0.82 });
const cottonShadowMaterial = new THREE.MeshStandardMaterial({ color: 0xded8c7, roughness: 1, transparent: true, opacity: 0.62 });
const redImpurityMaterial = new THREE.MeshStandardMaterial({ color: 0xc92d32, roughness: 0.82, emissive: 0x3c080a, emissiveIntensity: 0.35 });
const blackImpurityMaterial = new THREE.MeshStandardMaterial({ color: 0x15191c, roughness: 0.78, metalness: 0.08 });
const blueImpurityMaterial = new THREE.MeshStandardMaterial({ color: 0x2468d8, roughness: 0.80, emissive: 0x071c49, emissiveIntensity: 0.28 });
const yellowImpurityMaterial = new THREE.MeshStandardMaterial({ color: 0xe1b62b, roughness: 0.84, emissive: 0x4a3506, emissiveIntensity: 0.24 });
const greenImpurityMaterial = new THREE.MeshStandardMaterial({ color: 0x24945a, roughness: 0.82, emissive: 0x062c17, emissiveIntensity: 0.24 });

function seededUnit(seed) {
  const value = Math.sin(seed * 91.733) * 43758.5453;
  return value - Math.floor(value);
}

function makeFluffyTuft(seed, material = cottonMaterial, impurity = false) {
  const tuft = new THREE.Group();
  const count = impurity ? 6 : 11;
  for (let index = 0; index < count; index += 1) {
    const angle = seededUnit(seed + index * 3.1) * Math.PI * 2;
    const radius = impurity ? 0.026 + seededUnit(seed + index * 5.7) * 0.032 : 0.030 + seededUnit(seed + index * 5.7) * 0.058;
    const lobe = new THREE.Mesh(impurity ? impurityLobeGeometry : cottonLobeGeometry, index === count - 1 && !impurity ? cottonShadowMaterial : material);
    lobe.position.set(Math.cos(angle) * radius, (seededUnit(seed + index * 7.9) - 0.5) * 0.075, Math.sin(angle) * radius * 0.72);
    lobe.scale.set(0.72 + seededUnit(seed + index * 11.1) * 0.65, 0.55 + seededUnit(seed + index * 13.3) * 0.70, 0.65 + seededUnit(seed + index * 17.7) * 0.55);
    registerMesh(lobe, '', '', 'flow', false);
    tuft.add(lobe);
  }
  cottonFlow.add(tuft);
  return tuft;
}

const whiteCottonTufts = Array.from({ length: 42 }, (_, index) => {
  const tuft = makeFluffyTuft(index + 1);
  tuft.userData.flowOffset = index / 42;
  tuft.userData.lane = -0.82 + seededUnit(index + 20) * 1.64;
  tuft.userData.baseScale = 0.78 + seededUnit(index + 40) * 0.58;
  return tuft;
});

const impurityEvents = [
  { label: '红色异物', start: 6.0, lane: -0.42, tuft: makeFluffyTuft(101, redImpurityMaterial, true) },
  { label: '黑色异物', start: 12.0, lane: 0.47, tuft: makeFluffyTuft(202, blackImpurityMaterial, true) },
  { label: '蓝色异物', start: 18.0, lane: -0.10, tuft: makeFluffyTuft(303, blueImpurityMaterial, true) },
  { label: '黄色异物', start: 24.0, lane: 0.22, tuft: makeFluffyTuft(404, yellowImpurityMaterial, true) },
  { label: '绿色异物', start: 30.0, lane: -0.67, tuft: makeFluffyTuft(505, greenImpurityMaterial, true) }
];
impurityEvents.forEach((event, eventIndex) => {
  event.tuft.visible = false;
  event.sprayCotton = Array.from({ length: 5 }, (_, index) => {
    const tuft = makeFluffyTuft(700 + eventIndex * 20 + index);
    tuft.visible = false;
    tuft.userData.sprayOffset = (index - 2) * 0.030;
    tuft.userData.baseScale = 0.66 + seededUnit(800 + eventIndex * 20 + index) * 0.24;
    return tuft;
  });
});

const valvePulse = new THREE.Mesh(
  new THREE.SphereGeometry(0.065, 14, 10),
  new THREE.MeshStandardMaterial({ color: 0xffb23b, emissive: 0xff5a12, emissiveIntensity: 2.4, transparent: true, opacity: 0.92 })
);
registerMesh(valvePulse, '', '', 'flow', false);
valvePulse.visible = false;
cottonFlow.add(valvePulse);

const airJet = new THREE.Group();
const airJetMaterial = new THREE.MeshBasicMaterial({ color: 0x9feeff, transparent: true, opacity: 0.72, depthWrite: false });
for (let index = 0; index < 11; index += 1) {
  const particle = new THREE.Mesh(new THREE.SphereGeometry(0.014 + (index % 3) * 0.004, 8, 6), airJetMaterial);
  registerMesh(particle, '', '', 'flow', false);
  airJet.add(particle);
}
airJet.visible = false;
cottonFlow.add(airJet);

const opticalPathLayer = new THREE.Group();
opticalPathLayer.name = '相机动态检测光路';
opticalPathLayer.visible = false;
machine.add(opticalPathLayer);
const opticalCameraMaterials = [];
const opticalBlue = new THREE.Color(0x38a9ff);
let opticalPathMode = 'off';
let opticalTriggerStrength = 0;

function clearOpticalPaths() {
  opticalPathLayer.children.forEach((child) => child.geometry?.dispose());
  opticalPathLayer.clear();
  opticalCameraMaterials.forEach(({ material }) => material.dispose());
  opticalCameraMaterials.length = 0;
}

function makeOpticalCameraMaterial(index, count, type) {
  const material = new THREE.MeshBasicMaterial({
    color: opticalBlue,
    transparent: true,
    opacity: 0.10,
    depthWrite: false,
    depthTest: false,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending
  });
  opticalCameraMaterials.push({ material, index, count, type });
  return material;
}

function opticalWedgeGeometry(start, end, startWidth, endWidth, thickness = 0.01) {
  const direction = end.clone().sub(start).normalize();
  const widthAxis = new THREE.Vector3(1, 0, 0);
  const thicknessAxis = new THREE.Vector3().crossVectors(widthAxis, direction).normalize();
  if (thicknessAxis.lengthSq() < 0.001) thicknessAxis.set(0, 0, 1);
  const startHalfWidth = widthAxis.clone().multiplyScalar(startWidth / 2);
  const endHalfWidth = widthAxis.clone().multiplyScalar(endWidth / 2);
  const halfThickness = thicknessAxis.multiplyScalar(thickness / 2);
  const vertices = [
    start.clone().sub(startHalfWidth).sub(halfThickness),
    start.clone().add(startHalfWidth).sub(halfThickness),
    start.clone().add(startHalfWidth).add(halfThickness),
    start.clone().sub(startHalfWidth).add(halfThickness),
    end.clone().sub(endHalfWidth).sub(halfThickness),
    end.clone().add(endHalfWidth).sub(halfThickness),
    end.clone().add(endHalfWidth).add(halfThickness),
    end.clone().sub(endHalfWidth).add(halfThickness)
  ];
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices.flatMap((point) => point.toArray()), 3));
  geometry.setIndex([
    0, 2, 1, 0, 3, 2,
    4, 5, 6, 4, 6, 7,
    0, 1, 5, 0, 5, 4,
    3, 7, 6, 3, 6, 2,
    0, 4, 7, 0, 7, 3,
    1, 2, 6, 1, 6, 5
  ]);
  geometry.computeVertexNormals();
  return geometry;
}

function makeOpticalWedge(start, end, startWidth, endWidth, material) {
  if (start.distanceToSquared(end) < 0.000001) return;
  const wedge = new THREE.Mesh(opticalWedgeGeometry(start, end, startWidth, endWidth, 0.01), material);
  wedge.frustumCulled = false;
  wedge.renderOrder = 30;
  opticalPathLayer.add(wedge);
}

function partLocalPoint(part, point) {
  part.updateMatrix();
  return point.clone().applyMatrix4(part.matrix);
}

function currentFlowCurve() {
  const part = calibrationParts.get('flow-channel-1');
  const points = flowChannelPathPoints(part.userData.config.dimensions).map((point) => partLocalPoint(part, point));
  return new THREE.CatmullRomCurve3(points, false, 'centripetal');
}

function lanePoint(curve, progress, lane, width) {
  const point = curve.getPoint(THREE.MathUtils.clamp(progress, 0, 1));
  point.x += lane * width * 0.5;
  return point;
}

function cameraLensPoint(row, index, count, direction) {
  const spacing = count > 4 ? 0.29 : 0.42;
  const localX = (index - (count - 1) / 2) * spacing;
  return direction === 'down'
    ? partLocalPoint(row, new THREE.Vector3(localX, -0.142, 0))
    : partLocalPoint(row, new THREE.Vector3(localX, 0, -0.145));
}

function mirrorHitPoint(mirror, targetX) {
  const dimensions = mirror.userData.config.dimensions;
  const localX = THREE.MathUtils.clamp(
    (targetX - mirror.position.x) / Math.max(0.01, mirror.scale.x),
    -dimensions.length * 0.46,
    dimensions.length * 0.46
  );
  return partLocalPoint(mirror, new THREE.Vector3(localX, 0, 0));
}

function addCameraCoveragePath({ rowId, count, direction, mirrorForIndex, progress, type }) {
  const row = calibrationParts.get(rowId);
  const channel = calibrationParts.get('flow-channel-1');
  if (!row || !channel) return;
  const curve = currentFlowCurve();
  const channelWidth = channel.userData.config.dimensions.length * channel.scale.x;
  const coverageWidth = 0.30;
  const span = count > 4 ? Math.max(0, channelWidth - coverageWidth) : coverageWidth * (count - 1);

  for (let index = 0; index < count; index += 1) {
    const target = curve.getPoint(progress);
    target.x += count === 1 ? 0 : (index / (count - 1) - 0.5) * span;
    const source = cameraLensPoint(row, index, count, direction);
    const material = makeOpticalCameraMaterial(index, count, type);
    const mirror = mirrorForIndex ? calibrationParts.get(mirrorForIndex(index)) : null;

    if (mirror) {
      const hit = mirrorHitPoint(mirror, target.x);
      makeOpticalWedge(source, hit, 0.025, 0.075, material);
      makeOpticalWedge(hit, target, 0.075, coverageWidth, material);
    } else {
      makeOpticalWedge(source, target, 0.025, coverageWidth, material);
    }
  }
}

function rebuildOpticalPaths() {
  clearOpticalPaths();
  addCameraCoveragePath({
    rowId: 'front-cameras', count: 8, direction: 'rear', progress: 0.30,
    type: 'front'
  });
  addCameraCoveragePath({
    rowId: 'rear-cameras', count: 8, direction: 'down', progress: 0.30,
    mirrorForIndex: () => 'mirrors', type: 'rear'
  });
}

function setOpticalPathState(mode = 'off', triggerStrength = 0) {
  opticalTriggerStrength = THREE.MathUtils.clamp(triggerStrength, 0, 1);
  if (mode === 'off') {
    opticalPathMode = 'off';
    opticalPathLayer.visible = false;
    calibrationMaterials.cameraGlass.emissive.setHex(0x000000);
    calibrationMaterials.cameraGlass.emissiveIntensity = 0;
    return;
  }
  if (!opticalPathLayer.children.length || opticalPathMode !== mode) rebuildOpticalPaths();
  opticalPathMode = mode;
  opticalPathLayer.visible = true;
}

function updateOpticalPathAnimation(time) {
  if (!opticalPathLayer.visible) return;
  opticalCameraMaterials.forEach(({ material }) => {
    material.color.copy(opticalBlue);
    material.opacity = 0.11;
  });
  calibrationMaterials.cameraGlass.emissive.copy(opticalBlue);
  calibrationMaterials.cameraGlass.emissiveIntensity = 0.82;
}

function quadraticPoint(start, control, end, progress) {
  const oneMinus = 1 - progress;
  return start.clone().multiplyScalar(oneMinus * oneMinus)
    .add(control.clone().multiplyScalar(2 * oneMinus * progress))
    .add(end.clone().multiplyScalar(progress * progress));
}

function rejectRoutePoints(source) {
  const part = calibrationParts.get('reject-volute-1');
  const dimensions = part.userData.config.dimensions;
  const localX = THREE.MathUtils.clamp((source.x - part.position.x) / Math.max(part.scale.x, 0.01), -dimensions.length * 0.45, dimensions.length * 0.45);
  const inlet = partLocalPoint(part, new THREE.Vector3(localX, -dimensions.height / 2 - dimensions.drop + dimensions.thickness, 0));
  const center = partLocalPoint(part, new THREE.Vector3(localX * 0.30, 0, 0));
  const fan = partLocalPoint(part, new THREE.Vector3(dimensions.length / 2 + Math.max(0.18, dimensions.depth * 0.55), dimensions.height * 0.04, 0));
  const outletDisk = completeModel.getObjectByName('第10轮_出口圆盘_连续低模');
  const funnel = new THREE.Vector3(0.897, 2.347, 0.749);
  if (outletDisk) {
    const diskBounds = new THREE.Box3().setFromObject(outletDisk);
    diskBounds.getCenter(funnel);
    funnel.y = diskBounds.min.y - 0.02;
  }
  const drop = funnel.clone().add(new THREE.Vector3(0, -0.62, 0));
  return { inlet, center, fan, funnel, drop };
}

function valvePosition(lane) {
  const row = calibrationParts.get('valves');
  const index = THREE.MathUtils.clamp(Math.round(((lane + 1) / 2) * 31), 0, 31);
  const position = partLocalPoint(row, new THREE.Vector3((index - 15.5) * 0.072, 0, 0));
  return { index, position };
}

function setValveRowActive(active) {
  const row = calibrationParts.get('valves');
  if (!row) return;
  row.visible = active || calibrationEnabled;
  row.traverse((object) => {
    if (!object.isMesh) return;
    if (active && object.userData.baseMaterial) object.material = object.userData.baseMaterial;
    object.renderOrder = active ? 15 : 0;
    object.material.depthTest = !active;
    object.material.needsUpdate = true;
  });
}

function updateProcessStatus(text) {
  if (!processStatus || processStatus.textContent === text) return;
  processStatus.textContent = text;
}

function updateCottonProcess(time) {
  const curve = currentFlowCurve();
  const channelPart = calibrationParts.get('flow-channel-1');
  const width = channelPart.userData.config.dimensions.length * channelPart.scale.x;
  const normalSpeed = time * 0.000145;

  whiteCottonTufts.forEach((tuft) => {
    const progress = (normalSpeed + tuft.userData.flowOffset) % 1;
    tuft.position.copy(lanePoint(curve, progress, tuft.userData.lane, width));
    const fade = Math.min(progress / 0.07, (1 - progress) / 0.08, 1);
    tuft.scale.setScalar(tuft.userData.baseScale * Math.max(0.05, fade));
    tuft.rotation.y += 0.010;
    tuft.rotation.z += 0.004;
  });

  valvePulse.visible = false;
  airJet.visible = false;
  if (!processDemoPlaying && opticalPathMode === 'scan') {
    impurityEvents.forEach((event) => {
      event.tuft.visible = false;
      event.sprayCotton.forEach((tuft) => { tuft.visible = false; });
    });
    setOpticalPathState('scan', 0.58);
    updateProcessStatus('16台主相机持续扫描：前视直射，后视经反光镜折射覆盖通道');
    return;
  }
  let activeStatus = '白色棉絮正常通过：下方进入，顶部出口消失';
  const cycleDuration = 36;
  const impurityDuration = 4.6;
  const voiceCycleIndex = Math.floor(time / (cycleDuration * 1000));
  if (processDemoPlaying && voiceCycleIndex !== processVoiceCycleIndex) {
    processVoiceCycleIndex = voiceCycleIndex;
    playedProcessVoiceCues.clear();
    queueProcessVoiceCue(`第${voiceCycleIndex + 1}轮棉流进入主通道`, 'intake');
  }
  const cycleSeconds = (time / 1000) % cycleDuration;
  let cameraTriggerStrength = 0;
  if (processDemoPlaying && time >= 2500) queueProcessVoiceCue('扫描透明检测窗', 'scan');

  impurityEvents.forEach((event, eventIndex) => {
    const elapsed = (cycleSeconds - event.start + cycleDuration) % cycleDuration;
    const active = elapsed < impurityDuration;
    event.tuft.visible = active;
    event.sprayCotton.forEach((tuft) => { tuft.visible = false; });
    if (!active) return;

    const progress = elapsed / impurityDuration;
    // 异物尚未到达阀位时就完成识别并预喷，避免越过后再倒吸回来。
    const ejectPoint = lanePoint(curve, 0.30, event.lane, width);
    const route = rejectRoutePoints(ejectPoint);
    const valve = valvePosition(event.lane);
    event.tuft.rotation.y += 0.035;
    event.tuft.rotation.z += 0.021;
    event.tuft.scale.setScalar(1.08);

    if (progress < 0.38) {
      const channelProgress = 0.04 + (progress / 0.38) * 0.26;
      event.tuft.position.copy(lanePoint(curve, channelProgress, event.lane, width));
      const triggerIn = THREE.MathUtils.smoothstep(progress, 0.12, 0.22);
      const triggerOut = 1 - THREE.MathUtils.smoothstep(progress, 0.32, 0.38);
      const eventTrigger = triggerIn * triggerOut;
      cameraTriggerStrength = Math.max(cameraTriggerStrength, eventTrigger);
      if (progress > 0.12) {
        activeStatus = `相机淡蓝光幕识别到${event.label}：通道30%位置预先锁定第${valve.index + 1}号电磁阀`;
        if (eventIndex === 0) queueProcessVoiceCue('识别第一处异纤', 'detect');
      }
      return;
    }

    if (progress < 0.70) {
      if (eventIndex === 0) queueProcessVoiceCue('第一次喷射排杂', 'eject');
      const ejectProgress = (progress - 0.38) / 0.32;
      const control = ejectPoint.clone().lerp(route.inlet, 0.5).add(new THREE.Vector3(0, 0.10, 0));
      event.tuft.position.copy(quadraticPoint(ejectPoint, control, route.inlet, ejectProgress));
      event.sprayCotton.forEach((tuft, index) => {
        const localProgress = THREE.MathUtils.clamp(ejectProgress * 1.08 - index * 0.025, 0, 1);
        const offset = tuft.userData.sprayOffset;
        const start = ejectPoint.clone().add(new THREE.Vector3(offset, (index % 2) * 0.028 - 0.014, 0));
        const end = route.inlet.clone().add(new THREE.Vector3(offset * 0.45, 0, 0));
        const cottonControl = start.clone().lerp(end, 0.5).add(new THREE.Vector3(0, 0.08 + (index % 2) * 0.025, 0));
        tuft.visible = true;
        tuft.position.copy(quadraticPoint(start, cottonControl, end, localProgress));
        tuft.scale.setScalar(tuft.userData.baseScale * (0.94 - localProgress * 0.14));
        tuft.rotation.y += 0.028;
        tuft.rotation.z += 0.018;
      });
      valvePulse.visible = true;
      setValveRowActive(true);
      valvePulse.position.copy(valve.position);
      valvePulse.scale.setScalar(0.72 + Math.sin(ejectProgress * Math.PI * 5) * 0.28);
      airJet.visible = true;
      airJet.children.forEach((particle, index) => {
        const jetProgress = (ejectProgress + index / airJet.children.length) % 1;
        particle.position.lerpVectors(valve.position, route.inlet, jetProgress);
        particle.scale.setScalar(0.55 + (1 - jetProgress) * 0.65);
      });
      activeStatus = `第${valve.index + 1}号电磁阀“噗”地喷射：${event.label}连同周围白棉进入排杂风道`;
      return;
    }

    if (eventIndex === 0) queueProcessVoiceCue('第一次风机吸杂', 'suction');
    const suctionProgress = (progress - 0.70) / 0.30;
    const dropProgress = THREE.MathUtils.clamp((suctionProgress - 0.42) / 0.58, 0, 1);
    if (suctionProgress < 0.25) event.tuft.position.lerpVectors(route.inlet, route.center, suctionProgress / 0.25);
    else if (suctionProgress < 0.42) event.tuft.position.lerpVectors(route.center, route.funnel, (suctionProgress - 0.25) / 0.17);
    else event.tuft.position.lerpVectors(route.funnel, route.drop, dropProgress);
    event.tuft.scale.setScalar(Math.max(0.02, 1.08 * (1 - dropProgress)));
    event.sprayCotton.forEach((tuft, index) => {
      const offset = new THREE.Vector3(tuft.userData.sprayOffset * (1 - dropProgress), 0, 0);
      if (suctionProgress < 0.25) tuft.position.lerpVectors(route.inlet, route.center, suctionProgress / 0.25).add(offset);
      else if (suctionProgress < 0.42) tuft.position.lerpVectors(route.center, route.funnel, (suctionProgress - 0.25) / 0.17).add(offset);
      else tuft.position.lerpVectors(route.funnel, route.drop, dropProgress).add(offset);
      tuft.visible = true;
      tuft.scale.setScalar(Math.max(0.02, tuft.userData.baseScale * (1 - dropProgress)));
      tuft.rotation.y += 0.032;
    });
    activeStatus = suctionProgress < 0.42
      ? `排杂风机将${event.label}和伴随白棉送向圆盘漏斗`
      : `${event.label}和伴随白棉从圆盘漏斗落下并消失，其余白棉继续通过`;
  });

  if (processDemoPlaying) {
    setOpticalPathState('process', cameraTriggerStrength);
  }

  updateProcessStatus(activeStatus);
}

const grid = new THREE.GridHelper(8, 24, 0x344148, 0x202a2f);
grid.position.y = 0.006;
scene.add(grid);

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const partTitle = document.querySelector('#part-title');
const partDetail = document.querySelector('#part-detail');
let pointerStart = null;

function worldVisible(object) {
  let current = object;
  while (current) {
    if (!current.visible) return false;
    current = current.parent;
  }
  return true;
}

function pickAt(event) {
  const rect = canvas.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects(selectable, false);
  const hit = calibrationEnabled
    ? hits.find((item) => item.object.userData.calibrationId && worldVisible(item.object))
      || hits.find((item) => worldVisible(item.object))
    : hits.find((item) => worldVisible(item.object));
  if (!hit) return;
  if (calibrationEnabled && hit.object.userData.calibrationId) {
    selectCalibrationPart(hit.object.userData.calibrationId);
    return;
  }
  if (!hit.object.userData.name) return;
  partTitle.textContent = hit.object.userData.name;
  partDetail.textContent = hit.object.userData.detail;
}

canvas.addEventListener('pointerdown', (event) => {
  pointerStart = { x: event.clientX, y: event.clientY };
});

canvas.addEventListener('pointerup', (event) => {
  if (!pointerStart) return;
  const distance = Math.hypot(event.clientX - pointerStart.x, event.clientY - pointerStart.y);
  pointerStart = null;
  if (distance <= 5) pickAt(event);
});

// 第4轮开始只显示正式GLB；旧程序化草模保留为加载失败时的自动回退，不再与正式模型叠加。
['shell', 'front', 'rear', 'magic', 'compute', 'channel', 'ejection'].forEach((name) => {
  if (layers[name]) layers[name].visible = false;
});

const views = {
  isoRight: [4.9, 3.55, 5.7],
  isoLeft: [-4.9, 3.55, 5.7],
  front: [0, 1.85, 7.2],
  rear: [0, 1.85, -7.2],
  left: [-7.2, 1.85, 0],
  right: [7.2, 1.85, 0],
  top: [0.01, 8.2, 0.01]
};

function updateViewZoom() {
  const amount = Number(document.querySelector('#explode')?.value || 0) / 100;
  const baseZoom = ['front', 'rear'].includes(currentView) ? 1.12 : currentView === 'top' ? 0.92 : 1.08;
  camera.zoom = Math.max(0.62, baseZoom * (1 - amount * 0.30));
  camera.updateProjectionMatrix();
}

document.querySelectorAll('[data-view]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-view]').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    currentView = button.dataset.view;
    camera.position.set(...views[button.dataset.view]);
    camera.up.set(0, button.dataset.view === 'top' ? 0 : 1, button.dataset.view === 'top' ? -1 : 0);
    updateViewZoom();
    controls.target.set(0.1, 1.7, 0);
    controls.update();
  });
});

document.querySelectorAll('[data-layer]').forEach((checkbox) => {
  const layer = layers[checkbox.dataset.layer];
  layer.visible = checkbox.checked;
  checkbox.addEventListener('change', () => {
    layer.visible = checkbox.checked;
  });
});

function applyMode(mode) {
  currentMode = mode;
  document.querySelectorAll('[data-mode]').forEach((button) => {
    button.classList.toggle('active', button.dataset.mode === mode);
  });
  machine.traverse((object) => {
    if (!object.isMesh || !object.userData.baseMaterial) return;
    const role = object.userData.role;
    if (role === 'calibration' || role === 'flow') {
      object.material = object.userData.baseMaterial;
      object.visible = true;
      object.castShadow = role === 'calibration';
      return;
    }
    if (role === 'decal') {
      object.material = object.userData.baseMaterial;
      object.visible = mode === 'solid';
      return;
    }
    object.visible = true;
    if (mode === 'solid') object.material = object.userData.baseMaterial;
    if (mode === 'clay') object.material = role === 'internal' ? modeMaterials.clayInternal : modeMaterials.clayShell;
    if (mode === 'wireframe') object.material = role === 'internal' ? modeMaterials.wireInternal : modeMaterials.wireShell;
    if (mode === 'xray') object.material = role === 'internal' ? modeMaterials.xrayInternal : modeMaterials.xrayShell;
    object.castShadow = mode === 'solid' || mode === 'clay';
  });
}

document.querySelectorAll('[data-mode]').forEach((button) => {
  button.addEventListener('click', () => {
    applyMode(button.dataset.mode);
    if (button.dataset.mode === 'xray') {
      document.querySelectorAll('[data-layer]:not([data-layer="shell"]):not([data-layer="hunyuan"])').forEach((checkbox) => {
        checkbox.checked = true;
        layers[checkbox.dataset.layer].visible = true;
      });
    }
  });
});

const tourSteps = ['overview', 'intake', 'detect', 'compute', 'eject'];
const tourCopy = {
  overview: ['整机结构', '先校对外形、双落地立柱、正面1600×70入口、右前风机和等径管路。'],
  intake: ['进棉阶段', '开棉后的棉流由下方进入，在气流作用下向上通过全机幅入口和检测通道。'],
  detect: ['视觉检测', '正面8台、背面8台主相机覆盖1.6米机幅；背面另有4台精灵眼相机。'],
  compute: ['算力判别', '通道分配逻辑仍保留；内部校准模式中提供10个带散热鳍片、接口和状态灯的算力盒子，可直接调整位置。'],
  eject: ['喷射排杂', '系统根据目标位置和流速计算毫秒时机，驱动32个喷射阀中的对应阀位完成排杂。']
};
let tourTimer = null;
let currentTourIndex = 0;

function setLayerVisible(name, visible) {
  if (!layers[name]) return;
  layers[name].visible = visible;
  const checkbox = document.querySelector(`[data-layer="${name}"]`);
  if (checkbox) checkbox.checked = visible;
}

function setTourStep(step) {
  document.querySelectorAll('[data-tour]').forEach((button) => {
    button.classList.toggle('active', button.dataset.tour === step);
  });
  ['front', 'rear', 'magic', 'compute', 'channel', 'ejection'].forEach((name) => setLayerVisible(name, false));
  cottonFlow.visible = false;
  setOpticalPathState('off');
  setLayerVisible('hunyuan', importedModelReady);
  setLayerVisible('shell', !importedModelReady);
  updateCalibrationPartVisibility('external');

  if (step === 'overview') applyMode('solid');
  if (step === 'intake') {
    applyMode('xray');
    if (!importedModelReady) setLayerVisible('channel', true);
    cottonFlow.visible = true;
  }
  if (step === 'detect') {
    applyMode('xray');
    if (!importedModelReady) ['front', 'rear', 'magic', 'channel'].forEach((name) => setLayerVisible(name, true));
    cottonFlow.visible = true;
    updateCalibrationPartVisibility('detect');
    setOpticalPathState('scan', 0.58);
  }
  if (step === 'compute') {
    applyMode('xray');
    if (!importedModelReady) ['front', 'rear', 'magic', 'compute'].forEach((name) => setLayerVisible(name, true));
  }
  if (step === 'eject') {
    applyMode('xray');
    if (!importedModelReady) ['channel', 'ejection'].forEach((name) => setLayerVisible(name, true));
    cottonFlow.visible = true;
    updateCalibrationPartVisibility('process');
    const valveRow = calibrationParts.get('valves');
    setValveRowActive(true);
  }
  if (processStatus) processStatus.hidden = !cottonFlow.visible;
  [partTitle.textContent, partDetail.textContent] = tourCopy[step];
}

function stopTour() {
  if (tourTimer) window.clearInterval(tourTimer);
  tourTimer = null;
  document.querySelector('#tour-play').textContent = '自动演示';
}

document.querySelectorAll('[data-tour]').forEach((button) => {
  button.addEventListener('click', () => {
    stopTour();
    if (processDemoPlaying) setProcessDemo(false);
    currentTourIndex = tourSteps.indexOf(button.dataset.tour);
    setTourStep(button.dataset.tour);
  });
});

document.querySelector('#tour-play').addEventListener('click', () => {
  if (tourTimer) {
    stopTour();
    return;
  }
  if (processDemoPlaying) setProcessDemo(false);
  document.querySelector('#tour-play').textContent = '暂停演示';
  setTourStep(tourSteps[currentTourIndex]);
  tourTimer = window.setInterval(() => {
    currentTourIndex = (currentTourIndex + 1) % tourSteps.length;
    setTourStep(tourSteps[currentTourIndex]);
  }, 2400);
});

function setProcessDemo(enabled) {
  processDemoPlaying = enabled;
  processPlay.classList.toggle('active', enabled);
  processPlay.textContent = enabled ? '暂停棉流与排杂' : '播放棉流与排杂';
  cottonFlow.visible = enabled;
  processStatus.hidden = !enabled;
  if (enabled) {
    processTimelineMs = 0;
    processVoiceCycleIndex = 0;
    stopProcessVoice();
    queueProcessVoiceCue('棉流进入主通道', 'intake');
    stopTour();
    if (calibrationEnabled) setCalibrationEnabled(false);
    applyMode('xray');
    updateCalibrationPartVisibility('process');
    setValveRowActive(true);
    setFlowChannelPlaybackAppearance(true);
    setExternalModulesGhosted(true);
    setOpticalPathState('process', 0);
    setLayerVisible('hunyuan', importedModelReady);
    setLayerVisible('shell', !importedModelReady);
    partTitle.textContent = '异纤机工作原理动画';
    partDetail.textContent = '实体展示时主通道为白色铁质风道，前后相机对射位置是透明玻璃窗；播放时整条通道切换为淡蓝透明，玻璃窗发白，便于观察内部棉流。';
  } else {
    stopProcessVoice();
    valvePulse.visible = false;
    airJet.visible = false;
    impurityEvents.forEach((event) => {
      event.tuft.visible = false;
      event.sprayCotton.forEach((tuft) => { tuft.visible = false; });
    });
    setValveRowActive(false);
    updateCalibrationPartVisibility('external');
    applyMode('solid');
    setFlowChannelPlaybackAppearance(false);
    setExternalModulesGhosted(false);
    setOpticalPathState('off');
  }
}

processPlay.addEventListener('click', () => setProcessDemo(!processDemoPlaying));
document.querySelectorAll('[data-process-speed]').forEach((button) => {
  button.addEventListener('click', () => {
    processPlaybackRate = Number(button.dataset.processSpeed) || 1;
    document.querySelectorAll('[data-process-speed]').forEach((item) => {
      item.classList.toggle('active', item === button);
    });
  });
});

const explodeSlider = document.querySelector('#explode');
const explodeValue = document.querySelector('#explode-value');
const dismantlePlay = document.querySelector('#dismantle-play');

function stopDismantle() {
  dismantlePlaying = false;
  dismantlePlay.textContent = '播放拆解';
}

function setModelAnimationTime(time) {
  if (!modelAnimationMixer || !modelAnimationActions.length) return;
  modelAnimationActions.forEach((action) => {
    action.enabled = true;
    action.paused = false;
    action.play();
  });
  modelAnimationMixer.setTime(time);
}

function updateExplode() {
  const amount = Number(explodeSlider.value) / 100;
  explodeValue.textContent = `${explodeSlider.value}%`;
  if (modelAnimationMixer && modelAnimationDuration) {
    setModelAnimationTime(modelAnimationDuration * amount);
    completeModel.updateMatrixWorld(true);
  }
  explodeItems.forEach(({ object, base, direction, distance }) => {
    object.position.copy(base).addScaledVector(direction, amount * distance);
  });
  updateViewZoom();
}
explodeSlider.addEventListener('input', () => {
  stopDismantle();
  updateExplode();
});
dismantlePlay.addEventListener('click', () => {
  if (!modelAnimationActions.length || !modelAnimationDuration) return;
  if (dismantlePlaying) {
    stopDismantle();
    return;
  }
  if (Number(explodeSlider.value) >= 100) {
    explodeSlider.value = 0;
    setModelAnimationTime(0);
  }
  setModelAnimationTime(modelAnimationDuration * (Number(explodeSlider.value) / 100));
  dismantlePlaying = true;
  dismantlePlay.textContent = '暂停拆解';
});
updateExplode();
applyMode(currentMode);

function resize() {
  const width = stage.clientWidth;
  const height = stage.clientHeight;
  renderer.setSize(width, height, false);
  const aspect = width / height;
  const frustumHeight = aspect < 1 ? 5.1 / aspect : 4.25;
  camera.left = -(frustumHeight * aspect) / 2;
  camera.right = (frustumHeight * aspect) / 2;
  camera.top = frustumHeight / 2;
  camera.bottom = -frustumHeight / 2;
  camera.updateProjectionMatrix();
}

window.addEventListener('resize', resize);
resize();

function animate(time = 0) {
  const deltaSeconds = lastAnimationTime ? Math.min((time - lastAnimationTime) / 1000, 0.05) : 0;
  lastAnimationTime = time;
  if (dismantlePlaying && modelAnimationMixer && modelAnimationActions.length) {
    modelAnimationMixer.update(deltaSeconds);
    const percent = Math.min(100, Math.round((modelAnimationMixer.time / modelAnimationDuration) * 100));
    explodeSlider.value = percent;
    explodeValue.textContent = `${percent}%`;
    if (percent >= 100) stopDismantle();
  }
  if (cottonFlow.visible) {
    if (processDemoPlaying) processTimelineMs += deltaSeconds * 1000 * processPlaybackRate;
    updateCottonProcess(processDemoPlaying ? processTimelineMs : time);
  }
  updateOpticalPathAnimation(time);
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();
