import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TransformControls } from 'three/addons/controls/TransformControls.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

const canvas = document.querySelector('#scene');
const stage = document.querySelector('.stage');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xe8eee8);
scene.fog = new THREE.Fog(0xe8eee8, 12, 26);

const camera = new THREE.OrthographicCamera(-2.5, 2.5, 2.5, -2.5, 0.1, 100);
camera.position.set(10.5, 5.8, 9.0);
camera.zoom = 0.46;

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 2.05, 1.10);
controls.enableDamping = true;
controls.minDistance = 3.4;
controls.maxDistance = 11;
controls.minZoom = 0.17;
controls.maxZoom = 2.8;

scene.add(new THREE.HemisphereLight(0xe5f4fb, 0x29312d, 2.15));
const keyLight = new THREE.DirectionalLight(0xffffff, 3.4);
keyLight.position.set(4.5, 7, 5.5);
keyLight.castShadow = true;
keyLight.shadow.mapSize.set(2048, 2048);
keyLight.shadow.camera.left = -8;
keyLight.shadow.camera.right = 8;
keyLight.shadow.camera.top = 7;
keyLight.shadow.camera.bottom = -7;
scene.add(keyLight);
const rimLight = new THREE.DirectionalLight(0x9cc8df, 1.25);
rimLight.position.set(-4, 4, -5);
scene.add(rimLight);

const floor = new THREE.Mesh(
  new THREE.CircleGeometry(7.5, 96),
  new THREE.MeshStandardMaterial({ color: 0xd9e1da, roughness: 0.94 })
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
  signalRed: new THREE.MeshStandardMaterial({ color: 0xef3d42, emissive: 0x8b1018, emissiveIntensity: 0.82, roughness: 0.22 }),
  signalAmber: new THREE.MeshStandardMaterial({ color: 0xffb51e, emissive: 0x9a5400, emissiveIntensity: 0.78, roughness: 0.22 }),
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
  xrayInternal: new THREE.MeshStandardMaterial({ color: 0x49c7e6, roughness: 0.35, metalness: 0.25 }),
  xrayCalibrationShell: new THREE.MeshPhysicalMaterial({
    color: 0x9fcbd3,
    transparent: true,
    opacity: 0.15,
    roughness: 0.16,
    transmission: 0.42,
    depthWrite: false,
    side: THREE.DoubleSide
  }),
  xrayWindow: new THREE.MeshPhysicalMaterial({
    color: 0xf7ffff,
    emissive: 0xd8fbff,
    emissiveIntensity: 1.05,
    transparent: true,
    opacity: 0.72,
    roughness: 0.08,
    transmission: 0.28,
    depthWrite: false,
    side: THREE.DoubleSide
  })
};

const layers = {};
const selectable = [];
const explodeItems = [];
const machine = new THREE.Group();
machine.position.y = 0.035;
scene.add(machine);
let currentMode = 'solid';
let currentView = 'line';
let importedModelReady = false;
let importedRootModel = null;
let shellSurfacePaints = [];
const shellSurfaceTopologyCache = new WeakMap();
const fixedShellSurfacePaints = [
  4877, 4875, 362, 364, 4375, 627, 4073, 1409, 4169, 3268, 4018, 4488,
  976, 1038, 2196, 2979, 4857, 4859
].map((seedFaceIndex) => ({
  meshId: '主体区域-0',
  seedFaceIndex,
  color: seedFaceIndex === 364
    ? '#a5adad'
    : [976, 1038, 2196, 2979, 4857, 4859].includes(seedFaceIndex) ? '#d9e2e2' : '#d9ddda',
  repairPaint: [364, 976, 1038, 2196, 2979, 4857, 4859].includes(seedFaceIndex)
}));
let modelAnimationMixer = null;
let modelAnimationActions = [];
let modelAnimationDuration = 0;
let dismantlePlaying = false;
let dismantleProgress = 0;
let lastAnimationTime = 0;
let explodePresentationActive = false;
let modeBeforeExplode = 'solid';

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

function trackExplode(object, direction, distance = 1, start = 0, end = 1) {
  explodeItems.push({
    object,
    base: object.position.clone(),
    direction: new THREE.Vector3(...direction).normalize(),
    distance,
    start,
    end
  });
}

function syncExplodeBase(object) {
  const item = explodeItems.find((entry) => entry.object === object);
  if (item) item.base.copy(object.position);
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

function tubeBetweenPoints(parent, points, radius, material, name, detail, tubularSegments = 48) {
  const curve = new THREE.CatmullRomCurve3(points, false, 'centripetal');
  const mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, tubularSegments, radius, 18, false), material);
  registerMesh(mesh, name, detail, 'shell');
  parent.add(mesh);
  return { mesh, curve };
}

function rectanglePerimeterPoint(width, height, progress) {
  const perimeter = 2 * (width + height);
  let distance = ((progress % 1) + 1) % 1 * perimeter;
  if (distance <= width) return new THREE.Vector2(-width / 2 + distance, -height / 2);
  distance -= width;
  if (distance <= height) return new THREE.Vector2(width / 2, -height / 2 + distance);
  distance -= height;
  if (distance <= width) return new THREE.Vector2(width / 2 - distance, height / 2);
  distance -= width;
  return new THREE.Vector2(-width / 2, height / 2 - distance);
}

function superellipsePerimeterPoint(width, height, exponent, angle) {
  const cosine = Math.cos(angle);
  const sine = Math.sin(angle);
  const power = 2 / Math.max(2, exponent);
  return new THREE.Vector2(
    width * 0.5 * Math.sign(cosine) * Math.pow(Math.abs(cosine), power),
    height * 0.5 * Math.sign(sine) * Math.pow(Math.abs(sine), power)
  );
}

function smootherStep01(value) {
  const progress = THREE.MathUtils.clamp(value, 0, 1);
  return progress * progress * progress * (progress * (progress * 6 - 15) + 10);
}

function sectionedDuctGeometry(sections, perimeterSegments = 48) {
  const positions = [];
  const indices = [];
  const worldWidthAxis = new THREE.Vector3(1, 0, 0);
  let previousWidthAxis = null;
  sections.forEach((section, sectionIndex) => {
    const previous = sections[Math.max(0, sectionIndex - 1)].point;
    const next = sections[Math.min(sections.length - 1, sectionIndex + 1)].point;
    const tangent = next.clone().sub(previous).normalize();
    const preferredWidthAxis = section.widthAxis?.clone() || previousWidthAxis?.clone() || worldWidthAxis.clone();
    const widthAxis = preferredWidthAxis.addScaledVector(tangent, -preferredWidthAxis.dot(tangent));
    if (widthAxis.lengthSq() < 0.001) {
      widthAxis.copy(worldWidthAxis).addScaledVector(tangent, -worldWidthAxis.dot(tangent));
    }
    if (widthAxis.lengthSq() < 0.001) {
      widthAxis.set(0, 0, 1).addScaledVector(tangent, -tangent.z);
    }
    widthAxis.normalize();
    if (previousWidthAxis && widthAxis.dot(previousWidthAxis) < 0) widthAxis.negate();
    const heightAxis = new THREE.Vector3().crossVectors(tangent, widthAxis).normalize();
    previousWidthAxis = widthAxis.clone();
    for (let edgeIndex = 0; edgeIndex < perimeterSegments; edgeIndex += 1) {
      const progress = edgeIndex / perimeterSegments;
      const angle = progress * Math.PI * 2 - Math.PI / 2;
      let x;
      let y;
      if (Number.isFinite(section.shapeExponent)) {
        const profile = superellipsePerimeterPoint(section.width, section.height, section.shapeExponent, angle);
        x = profile.x;
        y = profile.y;
      } else {
        const rectangle = rectanglePerimeterPoint(section.width, section.height, progress);
        const circleX = Math.cos(angle) * section.diameter / 2;
        const circleY = Math.sin(angle) * section.diameter / 2;
        x = THREE.MathUtils.lerp(rectangle.x, circleX, section.morph);
        y = THREE.MathUtils.lerp(rectangle.y, circleY, section.morph);
      }
      const vertex = section.point.clone()
        .addScaledVector(widthAxis, x)
        .addScaledVector(heightAxis, y);
      positions.push(vertex.x, vertex.y, vertex.z);
    }
  });
  for (let sectionIndex = 0; sectionIndex < sections.length - 1; sectionIndex += 1) {
    for (let edgeIndex = 0; edgeIndex < perimeterSegments; edgeIndex += 1) {
      const nextEdge = (edgeIndex + 1) % perimeterSegments;
      const a = sectionIndex * perimeterSegments + edgeIndex;
      const b = sectionIndex * perimeterSegments + nextEdge;
      const c = (sectionIndex + 1) * perimeterSegments + nextEdge;
      const d = (sectionIndex + 1) * perimeterSegments + edgeIndex;
      indices.push(a, b, c, a, c, d);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function sectionedDuct(parent, sections, material, name, detail) {
  const mesh = new THREE.Mesh(sectionedDuctGeometry(sections), material);
  registerMesh(mesh, name, detail, 'shell');
  parent.add(mesh);
  return mesh;
}

function rectToRoundTransition(parent, start, end, width, height, diameter, material, name, detail) {
  const sectionCount = 32;
  const positions = [];
  const indices = [];
  for (let index = 0; index < sectionCount; index += 1) {
    const progress = index / sectionCount;
    const rectangle = rectanglePerimeterPoint(width, height, progress);
    const angle = progress * Math.PI * 2 - Math.PI / 2;
    positions.push(rectangle.x, rectangle.y, 0);
    positions.push(Math.cos(angle) * diameter / 2, Math.sin(angle) * diameter / 2, start.distanceTo(end));
  }
  for (let index = 0; index < sectionCount; index += 1) {
    const next = (index + 1) % sectionCount;
    const a = index * 2;
    const b = next * 2;
    const c = next * 2 + 1;
    const d = index * 2 + 1;
    indices.push(a, b, c, a, c, d);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.copy(start);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), end.clone().sub(start).normalize());
  registerMesh(mesh, name, detail, 'shell');
  parent.add(mesh);
  return mesh;
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

function textPlate(parent, text, width, height, position, fontSize = 70, color = '#687174', rotation = [0, 0, 0]) {
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
    new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      polygonOffset: true,
      polygonOffsetFactor: -2,
      polygonOffsetUnits: -2
    })
  );
  mesh.position.set(...position);
  mesh.rotation.set(...rotation);
  mesh.renderOrder = 22;
  registerMesh(mesh, '', '', 'decal', false);
  parent.add(mesh);
  return mesh;
}

function componentNumberPlate(parent, text, width, height, position, color, rotation) {
  const labelCanvas = document.createElement('canvas');
  labelCanvas.width = /^\d$/.test(text) ? 128 : /^\d{2}$/.test(text) ? 192 : 256;
  labelCanvas.height = 128;
  const context = labelCanvas.getContext('2d');
  context.clearRect(0, 0, labelCanvas.width, labelCanvas.height);
  context.fillStyle = color;
  context.font = '700 112px Arial, "PingFang SC", sans-serif';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(text, labelCanvas.width / 2, labelCanvas.height / 2);
  const texture = new THREE.CanvasTexture(labelCanvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    polygonOffset: true,
    polygonOffsetFactor: -2,
    polygonOffsetUnits: -2
  });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(width, height), material);
  mesh.position.set(...position);
  mesh.rotation.set(...rotation);
  mesh.renderOrder = 22;
  registerMesh(mesh, '', '', 'decal', false);
  mesh.userData.componentNumberLabel = true;
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

const screenTexture = new THREE.TextureLoader().load('./assets/JWF0019A-运行主屏.png');
screenTexture.colorSpace = THREE.SRGBColorSpace;
screenTexture.minFilter = THREE.LinearFilter;
screenTexture.magFilter = THREE.LinearFilter;

function makeScreenImageMaterial() {
  return new THREE.MeshBasicMaterial({ map: screenTexture, toneMapped: false, side: THREE.DoubleSide });
}

function frontSurfaceZ(parent, target, x, y, fallbackZ) {
  parent.updateMatrixWorld(true);
  target.updateMatrixWorld(true);
  const origin = parent.localToWorld(new THREE.Vector3(x, y, 4));
  const raycaster = new THREE.Raycaster(origin, new THREE.Vector3(0, 0, -1), 0, 8);
  const hit = raycaster.intersectObject(target, true)[0];
  if (!hit) return fallbackZ;
  return parent.worldToLocal(hit.point.clone()).z;
}

function addMachineIdentityDetails(parent, importedRoot) {
  const details = new THREE.Group();
  details.name = 'JWF0019A机身标识与立柱操作件';
  parent.add(details);
  const cabinetShellPaint = new THREE.MeshStandardMaterial({
    color: 0xd9e2e2,
    roughness: 0.36,
    metalness: 0.48,
    emissive: 0x1c1e1d,
    emissiveIntensity: 0.08
  });
  const screenBackingPaint = cabinetShellPaint.clone();
  screenBackingPaint.color.set(0xa5adad);

  // 使用“内部布局校准 (8)”最终坐标，替换主体GLB内原有的旧操作件。
  const cabinetCenterZ = -0.21;
  const cabinetButtonZ = cabinetCenterZ - 0.135;
  const leftScreenOriginal = importedRoot.getObjectByName('左立柱_内侧触摸屏');
  const rightCabinetOriginal = importedRoot.getObjectByName('右立柱_内侧电柜门');
  leftScreenOriginal?.removeFromParent();
  rightCabinetOriginal?.removeFromParent();

  // 信号灯侧立柱内面：触摸屏位于背板中央。
  const screenGroup = new THREE.Group();
  screenGroup.position.set(-1.052113004643858, 2.0560421225333316, -0.10005655626252286);
  details.add(screenGroup);
  roundedBox(
    screenGroup,
    [0.032, 0.32, 0.45],
    [0, 0, 0],
    screenBackingPaint,
    '左立柱内侧触摸屏外框',
    '信号灯侧立柱内面的独立屏幕外框。',
    0.012
  );
  roundedBox(
    screenGroup,
    [0.018, 0.255, 0.37],
    [0.021, 0, 0],
    materials.dark,
    '左立柱内侧触摸屏',
    '用于查看异纤检测参数、相机状态和排杂统计。',
    0.008
  );
  const operatingScreen = new THREE.Mesh(new THREE.PlaneGeometry(0.355, 0.225), makeScreenImageMaterial());
  operatingScreen.position.set(0.034, 0, 0);
  operatingScreen.rotation.y = Math.PI / 2;
  registerMesh(operatingScreen, '触摸屏运行主画面', '通道状态与32位喷阀统计的正常运行画面。', 'decal');
  screenGroup.add(operatingScreen);

  // 风机侧立柱内面：电气柜门位于背板中央。
  const cabinetGroup = new THREE.Group();
  cabinetGroup.position.set(1.0485846029540842, 2.082058051536222, -0.10650275590833051);
  details.add(cabinetGroup);
  roundedBox(
    cabinetGroup,
    [0.032, 0.54, 0.59],
    [0, 0, 0],
    cabinetShellPaint,
    '右立柱内侧电气柜门',
    '风机侧立柱内面的平整电气柜门。',
    0.014
  );
  roundedBox(cabinetGroup, [0.018, 0.47, 0.52], [-0.020, 0, 0], materials.paint, '', '', 0.01);
  roundedBox(cabinetGroup, [0.018, 0.105, 0.105], [-0.037, 0, cabinetButtonZ - cabinetCenterZ], materials.yellow, '', '', 0.008);
  cylinder(
    cabinetGroup,
    0.035,
    0.052,
    [-0.067, 0, cabinetButtonZ - cabinetCenterZ],
    [0, 0, Math.PI / 2],
    materials.red,
    '电柜门旋转按钮',
    '电气柜门上的红色旋转按钮，带黄色安全底座。',
    'shell',
    28
  );
  roundedBox(cabinetGroup, [0.058, 0.022, 0.018], [-0.095, 0, cabinetButtonZ - cabinetCenterZ], materials.dark, '', '', 0.006);

  // 仅用贴面级薄片覆盖背面上部横向绿色表面；侧面的绿色识别板保持原样。
  roundedBox(
    details,
    [2.70, 0.76, 0.012],
    [0, 3.13, -1.035],
    materials.paint,
    '背面上部机身白横板',
    '将背面原绿色横板改为与机身一致的白色。',
    0.025
  );

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

// 正式外形只允许加载当前新主体；旧程序化草模永不作为弱网回退显示。
const completeModel = makeLayer('hunyuan');
const modelLoadStatus = document.querySelector('#model-load-status');
const modelStatusValue = document.querySelector('#model-status-value');
const importedModelLoader = new GLTFLoader();
importedModelLoader.setMeshoptDecoder(MeshoptDecoder);
const CURRENT_MODEL_PATH = 'assets/models/JWF0019A-新主体对齐-720贴图-前罩底板削平-2026-07-25.glb';
const CURRENT_MODEL_VERSION = 'e5e75993-20260802';
const CURRENT_MODEL_ATTEMPTS_PER_SOURCE = 2;
const currentModelSources = [...new Map([
  `./${CURRENT_MODEL_PATH}?v=${CURRENT_MODEL_VERSION}`,
  `https://wiujianzhong.github.io/kunpeng-yuechao/jwf0019a-3d/${CURRENT_MODEL_PATH}?v=${CURRENT_MODEL_VERSION}`,
  `https://cdn.jsdelivr.net/gh/wiujianzhong/kunpeng-yuechao@747a801/jwf0019a-3d/${CURRENT_MODEL_PATH}?v=${CURRENT_MODEL_VERSION}`
].map((source) => [new URL(source, window.location.href).href, source])).values()];
let currentModelSourceIndex = 0;
let currentModelAttempt = 0;

function loadCurrentModel() {
  const source = currentModelSources[currentModelSourceIndex];
  const sourceUrl = new URL(source, window.location.href);
  if (currentModelAttempt > 0) sourceUrl.searchParams.set('retry', `${currentModelAttempt + 1}`);
  completeModel.visible = false;
  if (layers.shell) layers.shell.visible = false;
  modelStatusValue.textContent = `当前新模型加载中 · 线路${currentModelSourceIndex + 1}`;

  importedModelLoader.load(
  sourceUrl.href,
  (gltf) => {
    const importedRoot = gltf.scene;
    importedRootModel = importedRoot;
    importedRoot.name = 'JWF0019A外形清理校正版';
    completeModel.add(importedRoot);
    importedRoot.rotation.y = -Math.PI / 2;
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

    // 圆盘保持与管口同轴，并按现场校对结果整体上提100毫米，消除悬空缝隙。
    const outletDisk = importedRoot.getObjectByName('第10轮_出口圆盘_连续低模');
    if (outletDisk) outletDisk.position.y += 0.10 / scale;

    const removedOverlapTriangles = removeImportedOverlapInsideLowerFlowChannel(importedRoot);
    console.info(`主通道下半段穿模清理完成：删除${removedOverlapTriangles}个重叠三角面`);

    // 外加罩板和电柜门沿用母版机身白漆，避免前罩板比主机明显更白。
    const shellReference = importedRoot.getObjectByName('第10轮_母版保形上部外观_锁定');
    const shellMaterial = Array.isArray(shellReference?.material)
      ? shellReference.material[0]
      : shellReference?.material;
    if (shellMaterial?.color) {
      materials.paint.color.copy(shellMaterial.color);
      calibrationMaterials.cover.color.copy(shellMaterial.color);
    }

    addMachineIdentityDetails(completeModel, importedRoot);

    let shellRegionIndex = 0;
    importedRoot.traverse((object) => {
      if (!object.isMesh) return;
      const [name, detail] = importedPartInfo(object.name);
      object.userData.shellColorId = `主体区域-${shellRegionIndex}`;
      object.userData.shellColorLabel = name || `主体区域${shellRegionIndex + 1}`;
      shellRegionIndex += 1;
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
    restoreShellSurfacePaints();

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
    completeModel.visible = true;
    if (layers.shell) layers.shell.visible = false;
    modelLoadStatus.innerHTML = '<span class="dot ready"></span>外形清理校正版已加载 · 31252三角面';
    modelStatusValue.textContent = '旧灯与疙瘩已清除 · 圆盘管口已对中';
    updateExplode();
    applyMode(currentMode);
  },
  (event) => {
    if (!event.total) return;
    const progress = Math.min(99, Math.round((event.loaded / event.total) * 100));
    modelStatusValue.textContent = `真实外观加载 ${progress}%`;
  },
  (error) => {
    console.warn(`当前新模型加载失败：线路${currentModelSourceIndex + 1}，第${currentModelAttempt + 1}次`, error);
    completeModel.visible = false;
    if (layers.shell) layers.shell.visible = false;

    if (currentModelAttempt + 1 < CURRENT_MODEL_ATTEMPTS_PER_SOURCE) {
      currentModelAttempt += 1;
      modelStatusValue.textContent = `网络较慢，正在重试当前新模型 · ${currentModelAttempt + 1}/${CURRENT_MODEL_ATTEMPTS_PER_SOURCE}`;
      window.setTimeout(loadCurrentModel, 700);
      return;
    }

    currentModelSourceIndex += 1;
    currentModelAttempt = 0;
    if (currentModelSourceIndex < currentModelSources.length) {
      modelStatusValue.textContent = `正在切换备用线路加载当前新模型 · ${currentModelSourceIndex + 1}/${currentModelSources.length}`;
      window.setTimeout(loadCurrentModel, 700);
      return;
    }

    console.error('当前新模型的全部加载线路均失败');
    modelLoadStatus.innerHTML = '<span class="dot warning"></span>当前新模型暂未加载，请检查网络后刷新';
    modelStatusValue.textContent = '当前新模型加载失败 · 不显示旧模型';
  }
  );
}

loadCurrentModel();

const calibrationMaterials = {
  front: new THREE.MeshStandardMaterial({ color: 0x37b8e5, roughness: 0.35, metalness: 0.18 }),
  rear: new THREE.MeshStandardMaterial({ color: 0x7b61d1, roughness: 0.35, metalness: 0.18 }),
  magic: new THREE.MeshStandardMaterial({ color: 0xf29b38, roughness: 0.35, metalness: 0.18 }),
  compute: new THREE.MeshStandardMaterial({ color: 0x4dc27a, roughness: 0.42, metalness: 0.16 }),
  mirror: new THREE.MeshPhysicalMaterial({ color: 0xc9f4ff, roughness: 0.05, metalness: 0.72 }),
  componentBack: new THREE.MeshStandardMaterial({ color: 0x6f787c, roughness: 0.52, metalness: 0.42 }),
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
  heatsink: new THREE.MeshStandardMaterial({ color: 0xf0f3f4, roughness: 0.18, metalness: 0.88 }),
  cameraBody: new THREE.MeshStandardMaterial({ color: 0x9da8ad, roughness: 0.26, metalness: 0.72 }),
  cameraDark: new THREE.MeshStandardMaterial({ color: 0x1b2226, roughness: 0.40, metalness: 0.50 }),
  cameraGlass: new THREE.MeshPhysicalMaterial({ color: 0x5db4d2, roughness: 0.08, metalness: 0.15, transmission: 0.38 }),
  computeBody: new THREE.MeshStandardMaterial({ color: 0x606d73, roughness: 0.30, metalness: 0.70 }),
  computeFin: new THREE.MeshStandardMaterial({ color: 0x8d9ba1, roughness: 0.24, metalness: 0.78 }),
  connector: new THREE.MeshStandardMaterial({ color: 0x22292d, roughness: 0.48, metalness: 0.32 }),
  statusLed: new THREE.MeshStandardMaterial({ color: 0x77f082, emissive: 0x28b94c, emissiveIntensity: 1.5 }),
  lampPanel: new THREE.MeshStandardMaterial({ color: 0xe8eceb, roughness: 0.38, metalness: 0.22 }),
  lampWhite: new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0xffffff,
    emissiveIntensity: 1.0,
    roughness: 0.12,
    metalness: 0.02,
    toneMapped: false
  }),
  lampPurple: new THREE.MeshStandardMaterial({
    color: 0xd9b8ff,
    emissive: 0xb880ff,
    emissiveIntensity: 0.92,
    roughness: 0.14,
    metalness: 0.02,
    toneMapped: false
  }),
  valveBody: new THREE.MeshStandardMaterial({ color: 0x2f6f9f, roughness: 0.34, metalness: 0.54 }),
  valveBodyActive: new THREE.MeshStandardMaterial({ color: 0x297fbd, emissive: 0x0f4d77, emissiveIntensity: 0.62, roughness: 0.24, metalness: 0.46 }),
  valveCoil: new THREE.MeshStandardMaterial({ color: 0x20272b, roughness: 0.42, metalness: 0.34 }),
  valveCoilActive: new THREE.MeshStandardMaterial({ color: 0x192126, emissive: 0x22333d, emissiveIntensity: 0.34, roughness: 0.28, metalness: 0.38 }),
  valveMetal: new THREE.MeshStandardMaterial({ color: 0xb8c1c4, roughness: 0.22, metalness: 0.82 }),
  valveMetalActive: new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xd9f7ff, emissiveIntensity: 0.48, roughness: 0.12, metalness: 0.76 }),
  valveNozzle: new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0xffffff,
    emissiveIntensity: 0.68,
    roughness: 0.18,
    metalness: 0.10,
    toneMapped: false
  }),
  valveNozzleActive: new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0xffffff,
    emissiveIntensity: 1.35,
    roughness: 0.08,
    transparent: false,
    toneMapped: false
  }),
  valveOverrideActive: new THREE.MeshStandardMaterial({ color: 0xf53f46, emissive: 0xb60f1d, emissiveIntensity: 0.78 }),
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
  })
};

const calibrationLayer = makeLayer('calibration');
calibrationLayer.visible = false;
const calibrationParts = new Map();
const cameraLensMeshes = [];
const calibrationStorageKey = 'jwf0019a-internal-layout-v8';
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

function addCalibrationInstances(parent, geometry, material, calibrationId, count) {
  const mesh = new THREE.InstancedMesh(geometry, material, count);
  mesh.userData.calibrationId = calibrationId;
  registerMesh(mesh, '', '', 'calibration', true);
  parent.add(mesh);
  return mesh;
}

function registerExternalCalibrationGroup(group, config) {
  group.name = config.label;
  group.userData.calibrationId = config.id;
  group.userData.label = config.label;
  group.userData.count = config.count;
  group.userData.note = config.note;
  group.userData.config = JSON.parse(JSON.stringify(config));
  group.userData.defaultTransform = {
    position: group.position.toArray(),
    rotation: [
      THREE.MathUtils.radToDeg(group.rotation.x),
      THREE.MathUtils.radToDeg(group.rotation.y),
      THREE.MathUtils.radToDeg(group.rotation.z)
    ],
    scale: group.scale.toArray()
  };
  group.userData.defaultDimensions = null;
  group.traverse((object) => {
    if (!object.isMesh) return;
    object.userData.calibrationId = config.id;
  });
  calibrationParts.set(config.id, group);
  addCalibrationOption(group, config.id);
  restoreCalibrationPartFromStorage(group, config.id);
  updateCalibrationPartVisibility(calibrationEnabled ? 'all' : 'external');
}

function addCameraRow(group, calibrationId, count, direction) {
  const spacing = count > 4 ? 0.29 : 0.42;
  const opticalType = calibrationId === 'magic-cameras'
    ? 'spirit'
    : calibrationId === 'front-cameras'
      ? 'front'
      : 'rear';
  const numberPrefix = opticalType === 'front' ? '前' : opticalType === 'rear' ? '后' : '';
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
      calibrationMaterials.cameraGlass.clone(),
      calibrationId
    );
    lensGlass.userData.opticalCameraType = opticalType;
    lensGlass.userData.opticalCameraIndex = index;
    cameraLensMeshes.push(lensGlass);
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
      const numberLabel = componentNumberPlate(
        unit,
        `${numberPrefix}${index + 1}`,
        opticalType === 'spirit' ? 0.120 : 0.170,
        0.075,
        [0, 0, -0.076],
        '#ffffff',
        [0, Math.PI, 0]
      );
      numberLabel.userData.calibrationId = calibrationId;
      numberLabel.userData.name = `${group.userData.label}${index + 1}号散热扇侧编号`;
    } else {
      const sign = direction === 'front' ? 1 : -1;
      [frontPlate, lensBarrel, lensGlass, rearConnector].forEach((part) => { part.rotation.x = Math.PI / 2; });
      frontPlate.position.z = sign * 0.082;
      lensBarrel.position.z = sign * 0.110;
      lensGlass.position.z = sign * 0.138;
      rearConnector.position.set(0.064, 0.080, -sign * 0.055);
      const numberLabel = componentNumberPlate(
        unit,
        `${numberPrefix}${index + 1}`,
        0.170,
        0.075,
        [0, 0, -sign * 0.076],
        '#ffffff',
        [0, sign > 0 ? Math.PI : 0, 0]
      );
      numberLabel.userData.calibrationId = calibrationId;
      numberLabel.userData.name = `${group.userData.label}${index + 1}号背面编号`;
    }
    group.add(unit);
  }
}

function addComputeRow(group, calibrationId, count) {
  const physicalNumbers = [1, 2, 3, 4, 9, 10, 5, 6, 7, 8];
  for (let index = 0; index < count; index += 1) {
    const physicalNumber = physicalNumbers[index] || index + 1;
    const unit = new THREE.Group();
    unit.position.x = (index - (count - 1) / 2) * 0.22;
    const body = addCalibrationMesh(unit, new RoundedBoxGeometry(0.19, 0.24, 0.10, 3, 0.012), calibrationMaterials.computeBody, calibrationId);
    body.userData.name = `算力盒子${physicalNumber}号`;
    for (let finIndex = 0; finIndex < 5; finIndex += 1) {
      const fin = addCalibrationMesh(unit, new THREE.BoxGeometry(0.018, 0.19, 0.018), calibrationMaterials.computeFin, calibrationId);
      fin.position.set((finIndex - 2) * 0.032, 0.012, 0.056);
      fin.userData.name = `算力盒子${physicalNumber}号散热鳍片`;
    }
    const socket = addCalibrationMesh(unit, new THREE.BoxGeometry(0.048, 0.030, 0.022), calibrationMaterials.connector, calibrationId);
    socket.position.set(-0.045, -0.094, 0.058);
    socket.userData.name = `算力盒子${physicalNumber}号接口`;
    const led = addCalibrationMesh(unit, new THREE.SphereGeometry(0.009, 10, 8), calibrationMaterials.statusLed, calibrationId);
    led.position.set(0.060, -0.095, 0.061);
    led.userData.name = `算力盒子${physicalNumber}号状态灯`;
    const numberLabel = componentNumberPlate(
      unit,
      `${physicalNumber}`,
      physicalNumber >= 10 ? 0.165 : 0.120,
      0.120,
      [0, 0, -0.051],
      '#ffffff',
      [0, Math.PI, 0]
    );
    numberLabel.userData.calibrationId = calibrationId;
    numberLabel.userData.name = `算力盒子${physicalNumber}号后面编号`;
    group.add(unit);
  }
}

function addValveRow(group, calibrationId, count) {
  const spacing = 0.072;
  const manifoldLength = (count - 1) * spacing + 0.105;
  const manifold = addCalibrationMesh(
    group,
    new RoundedBoxGeometry(manifoldLength, 0.040, 0.120, 2, 0.010),
    calibrationMaterials.valveMetal,
    calibrationId
  );
  // 阀板位于32个阀体前方，靠近前视相机侧；正面可直接看清128个喷孔。
  manifold.position.y = 0.150;
  manifold.userData.name = `32位MAC52A电磁阀板（${count * 4}孔）`;
  manifold.userData.detail = `整块阀板安装${count}个MAC52A风格电磁阀，每阀对应4个喷孔，共${count * 4}个喷孔。`;

  for (let index = 0; index < count; index += 1) {
    const unit = new THREE.Group();
    unit.position.x = (index - (count - 1) / 2) * spacing;

    const body = addCalibrationMesh(
      unit,
      new RoundedBoxGeometry(0.057, 0.065, 0.080, 2, 0.008),
      calibrationMaterials.valveBody,
      calibrationId
    );
    body.position.y = 0.013;
    const coil = addCalibrationMesh(
      unit,
      new RoundedBoxGeometry(0.047, 0.068, 0.054, 2, 0.007),
      calibrationMaterials.valveCoil,
      calibrationId
    );
    coil.position.y = 0.078;
    const metalCap = addCalibrationMesh(
      unit,
      new THREE.CylinderGeometry(0.017, 0.017, 0.012, 12),
      calibrationMaterials.valveMetal,
      calibrationId
    );
    metalCap.position.y = 0.119;
    const manualOverride = addCalibrationMesh(
      unit,
      new THREE.CylinderGeometry(0.007, 0.007, 0.008, 10),
      materials.red,
      calibrationId
    );
    manualOverride.position.y = 0.130;
    [body, coil, metalCap, manualOverride].forEach((part) => {
      part.userData.name = `MAC52A电磁阀${index + 1}号`;
      part.userData.detail = '蓝色阀体、黑色电磁线圈安装在银色阀板上；每个阀位控制4个喷孔。';
    });
    const numberLabel = componentNumberPlate(
      unit,
      `${index + 1}`,
      0.054,
      0.056,
      [0, 0.012, -0.041],
      '#ffffff',
      [0, Math.PI, 0]
    );
    numberLabel.userData.calibrationId = calibrationId;
    numberLabel.userData.name = `MAC52A电磁阀${index + 1}号顶部编号`;

    for (let portIndex = 0; portIndex < 4; portIndex += 1) {
      const port = addCalibrationMesh(
        unit,
        new THREE.CylinderGeometry(0.0044, 0.0044, 0.012, 10),
        calibrationMaterials.valveNozzle,
        calibrationId
      );
      port.position.set(-0.024 + portIndex * 0.016, 0.176, 0);
      port.userData.name = `电磁阀${index + 1}号·喷孔${portIndex + 1}`;
      port.userData.detail = `第${index + 1}个电磁阀对应的第${portIndex + 1}个喷孔；整排共${count * 4}孔。`;
    }
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
    // 以弯头连接点为固定点；前六点保持同一直线，使斜段与水平出口的内夹角为110°。
    new THREE.Vector3(0, -height * 0.24, -offset * 0.807462),
    new THREE.Vector3(0, -height * 0.08, -offset * 0.629521),
    new THREE.Vector3(0, height * 0.08, -offset * 0.45158),
    new THREE.Vector3(0, height * 0.24, -offset * 0.273639),
    new THREE.Vector3(0, height * 0.40, -offset * 0.095698),
    new THREE.Vector3(0, height * 0.54, offset * 0.06),
    // 到箭头头部高度才进入圆滑弯头，最后三点等高形成稳定的水平出口。
    new THREE.Vector3(0, height * 0.64, offset * 0.19),
    new THREE.Vector3(0, height * 0.67, offset * 0.34),
    new THREE.Vector3(0, height * 0.67, offset * 0.46),
    new THREE.Vector3(0, height * 0.67, offset * 0.50 + outletExtension)
  ];
}

function removeImportedOverlapInsideLowerFlowChannel(importedRoot) {
  const channel = calibrationParts.get('flow-channel-1');
  const dimensions = channel?.userData.config.dimensions;
  if (!channel || !dimensions) return 0;

  channel.updateWorldMatrix(true, true);
  importedRoot.updateWorldMatrix(true, true);

  const wall = Math.min(dimensions.thickness, dimensions.depth / 3, dimensions.length / 20);
  const innerHalfWidth = dimensions.length / 2 - wall * 1.2;
  const innerHalfDepth = dimensions.depth / 2 - wall * 1.2;
  const cutEndProgress = 0.28;
  const curve = new THREE.CatmullRomCurve3(flowChannelPathPoints(dimensions), false, 'centripetal');
  const pathSamples = Array.from({ length: 33 }, (_, index) => (
    curve.getPoint(cutEndProgress * index / 32)
  ));
  const localPoint = new THREE.Vector3();
  const segment = new THREE.Vector2();
  const relative = new THREE.Vector2();

  function insideOpenChannel(point) {
    if (Math.abs(point.x) >= innerHalfWidth) return false;
    let nearestDistanceSquared = Infinity;
    for (let index = 0; index < pathSamples.length - 1; index += 1) {
      const start = pathSamples[index];
      const end = pathSamples[index + 1];
      segment.set(end.z - start.z, end.y - start.y);
      const segmentLengthSquared = segment.lengthSq();
      if (segmentLengthSquared <= 0.0000001) continue;
      relative.set(point.z - start.z, point.y - start.y);
      const amount = THREE.MathUtils.clamp(relative.dot(segment) / segmentLengthSquared, 0, 1);
      const nearestZ = start.z + segment.x * amount;
      const nearestY = start.y + segment.y * amount;
      const deltaZ = point.z - nearestZ;
      const deltaY = point.y - nearestY;
      nearestDistanceSquared = Math.min(nearestDistanceSquared, deltaZ * deltaZ + deltaY * deltaY);
    }
    return nearestDistanceSquared < innerHalfDepth * innerHalfDepth;
  }

  const barycentricSamples = [
    [1, 0, 0], [0, 1, 0], [0, 0, 1],
    [0.5, 0.5, 0], [0.5, 0, 0.5], [0, 0.5, 0.5],
    [1 / 3, 1 / 3, 1 / 3],
    [0.5, 0.25, 0.25], [0.25, 0.5, 0.25], [0.25, 0.25, 0.5]
  ];
  const a = new THREE.Vector3();
  const b = new THREE.Vector3();
  const c = new THREE.Vector3();
  const sample = new THREE.Vector3();
  let removedTriangles = 0;

  importedRoot.traverse((mesh) => {
    if (!mesh.isMesh || !mesh.geometry?.attributes.position) return;
    const geometry = mesh.geometry.clone();
    const position = geometry.attributes.position;
    const index = geometry.index;
    const triangleCount = index ? index.count / 3 : position.count / 3;
    let meshChanged = false;
    mesh.updateWorldMatrix(true, false);

    for (let triangle = 0; triangle < triangleCount; triangle += 1) {
      const indexOffset = triangle * 3;
      const indexA = index ? index.getX(indexOffset) : indexOffset;
      const indexB = index ? index.getX(indexOffset + 1) : indexOffset + 1;
      const indexC = index ? index.getX(indexOffset + 2) : indexOffset + 2;
      a.fromBufferAttribute(position, indexA);
      b.fromBufferAttribute(position, indexB);
      c.fromBufferAttribute(position, indexC);
      mesh.localToWorld(a);
      mesh.localToWorld(b);
      mesh.localToWorld(c);
      channel.worldToLocal(a);
      channel.worldToLocal(b);
      channel.worldToLocal(c);

      const intersectsOpenChannel = barycentricSamples.some(([weightA, weightB, weightC]) => {
        sample.set(0, 0, 0)
          .addScaledVector(a, weightA)
          .addScaledVector(b, weightB)
          .addScaledVector(c, weightC);
        localPoint.copy(sample);
        return insideOpenChannel(localPoint);
      });
      if (!intersectsOpenChannel) continue;

      if (index) {
        index.setX(indexOffset + 1, indexA);
        index.setX(indexOffset + 2, indexA);
      } else {
        position.setXYZ(indexB, position.getX(indexA), position.getY(indexA), position.getZ(indexA));
        position.setXYZ(indexC, position.getX(indexA), position.getY(indexA), position.getZ(indexA));
      }
      removedTriangles += 1;
      meshChanged = true;
    }

    if (!meshChanged) return;
    if (index) index.needsUpdate = true;
    else position.needsUpdate = true;
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();
    mesh.geometry = geometry;
    mesh.userData.flowChannelOverlapTrianglesRemoved = removedTriangles;
  });

  return removedTriangles;
}

function buildParametricCalibrationPart(group) {
  const config = group.userData.config;
  const dimensions = config.dimensions;
  clearCalibrationChildren(group);
  if (config.kind === 'mirror-single') {
    const mirrorBack = addCalibrationMesh(
      group,
      new THREE.BoxGeometry(dimensions.length - 0.025, Math.max(0.006, dimensions.height), dimensions.depth - 0.018),
      calibrationMaterials.componentBack,
      config.id
    );
    mirrorBack.userData.name = `${config.label}灰色背面`;
    const mirrorFace = addCalibrationMesh(
      group,
      new THREE.BoxGeometry(dimensions.length - 0.030, 0.0015, dimensions.depth - 0.022),
      calibrationMaterials.mirror,
      config.id
    );
    mirrorFace.position.y = Math.max(0.006, dimensions.height) / 2 + 0.00075;
    mirrorFace.userData.name = `${config.label}镜面正面`;
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
    if (config.id === 'cover-1') {
      const frontCoverPaint = new THREE.MeshStandardMaterial({
        color: 0xd9e2e2,
        roughness: 0.36,
        metalness: 0.48,
        emissive: 0x1c1e1d,
        emissiveIntensity: 0.08
      });
      const faceHeight = height + 0.08;
      const coverThickness = Math.max(0.0125, thickness * 1.25);
      const coverAssembly = new THREE.Group();
      coverAssembly.position.set(0, -0.0077, -0.0485);
      group.add(coverAssembly);

      const faceRadius = Math.min(0.018, faceHeight * 0.075);
      const face = addCalibrationMesh(
        coverAssembly,
        new RoundedBoxGeometry(length, faceHeight, coverThickness, 4, faceRadius),
        frontCoverPaint,
        config.id
      );
      face.position.z = coverThickness / 2;
      face.userData.name = config.label;

      const flangeDepth = Math.max(0.28, height * 1.18);
      const flangePivot = new THREE.Group();
      flangePivot.position.set(0, faceHeight / 2, 0);
      flangePivot.rotation.x = THREE.MathUtils.degToRad(12.9);
      coverAssembly.add(flangePivot);
      const flange = addCalibrationMesh(
        flangePivot,
        new RoundedBoxGeometry(length, coverThickness, flangeDepth, 4, Math.min(0.012, coverThickness * 0.45)),
        frontCoverPaint,
        config.id
      );
      flange.position.set(0, coverThickness / 2, -flangeDepth / 2);
      flange.userData.name = `${config.label}顶部水平折边`;

      const screwRadius = Math.min(0.015, height * 0.060);
      const screwMarginX = Math.max(0.09, screwRadius * 2.4);
      const screwMarginY = Math.max(0.040, screwRadius * 2.5);
      const screwXs = Array.from({ length: 4 }, (_, column) => (
        -length / 2 + screwMarginX + column * ((length - screwMarginX * 2) / 3)
      ));
      screwXs.forEach((x, index) => {
        const screw = addCalibrationMesh(
          coverAssembly,
          new THREE.CylinderGeometry(screwRadius, screwRadius, 0.008, 18),
          calibrationMaterials.valveMetal,
          config.id
        );
        screw.rotation.x = Math.PI / 2;
        screw.position.set(x, -faceHeight / 2 + screwMarginY, coverThickness + 0.004);
        screw.userData.name = `${config.label}下排固定螺丝${index + 1}`;
        const slot = addCalibrationMesh(
          coverAssembly,
          new THREE.BoxGeometry(screwRadius * 1.25, screwRadius * 0.22, 0.003),
          calibrationMaterials.cameraDark,
          config.id
        );
        slot.position.set(x, -faceHeight / 2 + screwMarginY, coverThickness + 0.009);
        slot.userData.name = screw.userData.name;
      });
      screwXs.forEach((x, index) => {
        const screw = addCalibrationMesh(
          flangePivot,
          new THREE.CylinderGeometry(screwRadius, screwRadius, 0.008, 18),
          calibrationMaterials.valveMetal,
          config.id
        );
        screw.position.set(x, coverThickness + 0.004, -flangeDepth * 0.58 - 0.065);
        screw.userData.name = `${config.label}上排固定螺丝${index + 1}`;
        const slot = addCalibrationMesh(
          flangePivot,
          new THREE.BoxGeometry(screwRadius * 1.25, 0.003, screwRadius * 0.22),
          calibrationMaterials.cameraDark,
          config.id
        );
        slot.position.set(x, coverThickness + 0.009, -flangeDepth * 0.58 - 0.065);
        slot.userData.name = screw.userData.name;
      });

      const modelLabel = textPlate(
        coverAssembly,
        'JWF0019',
        0.72,
        0.095,
        [-length / 2 + 0.43, 0.020, coverThickness + 0.012],
        78,
        '#505b60'
      );
      modelLabel.userData.calibrationId = config.id;
      return;
    }
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
    const finCount = 32;
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
  if (config.kind === 'lamp-board') {
    const length = dimensions.length;
    const height = dimensions.height;
    const depth = dimensions.depth;
    const ledDepth = Math.max(0.002, dimensions.thickness);
    const panelBack = addCalibrationMesh(
      group,
      new RoundedBoxGeometry(length, height, depth, 3, Math.min(0.008, height * 0.22, depth * 0.45)),
      calibrationMaterials.componentBack,
      config.id
    );
    panelBack.userData.name = `${config.label}灰色背板`;
    const frontDepth = Math.min(0.0015, depth * 0.18);
    const panelFace = addCalibrationMesh(
      group,
      new THREE.BoxGeometry(length * 0.985, height * 0.84, frontDepth),
      calibrationMaterials.lampPanel,
      config.id
    );
    panelFace.position.z = depth / 2 + frontDepth / 2;
    panelFace.userData.name = `${config.label}发光正面`;

    const rows = config.rows || ['purple'];
    const spacing = 0.01;
    const margin = 0.015;
    const ledCount = Math.max(2, Math.floor((length - margin * 2) / spacing) + 1);
    const firstX = -((ledCount - 1) * spacing) / 2;
    const ledSize = Math.min(0.006, height * (rows.length > 1 ? 0.28 : 0.46));
    const rowGap = rows.length > 1 ? Math.min(height * 0.24, 0.014) : 0;
    const matrix = new THREE.Matrix4();

    rows.forEach((row, rowIndex) => {
      const leds = addCalibrationInstances(
        group,
        new THREE.BoxGeometry(ledSize, ledSize, ledDepth),
        row === 'white' ? calibrationMaterials.lampWhite : calibrationMaterials.lampPurple,
        config.id,
        ledCount
      );
      const rowY = rows.length > 1 ? (rowIndex === 0 ? rowGap : -rowGap) : 0;
      for (let index = 0; index < ledCount; index += 1) {
        matrix.makeTranslation(firstX + index * spacing, rowY, depth / 2 + ledDepth / 2);
        leds.setMatrixAt(index, matrix);
      }
      leds.instanceMatrix.needsUpdate = true;
      leds.userData.name = `${config.label}${row === 'white' ? '白光LED排' : '淡紫光LED排'}`;
    });
  }
  if (config.kind === 'flow-channel') {
    const width = dimensions.length;
    const depth = dimensions.depth;
    const wall = Math.min(dimensions.thickness, depth / 3, width / 20);
    const points = flowChannelPathPoints(dimensions);
    const curveLength = new THREE.CatmullRomCurve3(points, false, 'centripetal').getLength();
    const halfWindowProgress = Math.min(0.07 / Math.max(curveLength, 0.01), 0.08);
    const mainWindow = {
      start: 0.30 - halfWindowProgress,
      end: 0.30 + halfWindowProgress,
      name: '透明检测窗（上下各70毫米）'
    };
    const spiritEyeWindow = {
      start: 0.15 - halfWindowProgress,
      end: 0.15 + halfWindowProgress,
      name: '精灵眼透明检测窗（上下各70毫米）'
    };
    const wallOffsets = [
      { offset: (depth - wall) / 2, side: '前壁', windows: [mainWindow] },
      { offset: -(depth - wall) / 2, side: '后壁', windows: [spiritEyeWindow, mainWindow] }
    ];
    const channelSurfaces = [];
    wallOffsets.forEach(({ offset, side, windows }) => {
      const wallRanges = [];
      let rangeStart = 0;
      windows.forEach((window) => {
        wallRanges.push([rangeStart, window.start]);
        rangeStart = window.end;
      });
      wallRanges.push([rangeStart, 1]);
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
      windows.forEach((window) => {
        const glassWindow = addCalibrationMesh(
          group,
          sweptWideDuctGeometry(points, width, wall, 10, offset, window.start, window.end),
          calibrationMaterials.channelWindowGlass,
          config.id
        );
        glassWindow.userData.name = `${side}${window.name}`;
        glassWindow.renderOrder = 9;
        channelSurfaces.push(glassWindow);
      });
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
    channelSurfaces.forEach((part) => { part.userData.detail = '主通道主体为白色铁质风道；主检测区域保留前后透明玻璃窗，精灵眼折射检测位置在靠近相机的后壁增加同规格透明玻璃窗。'; });
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
  if (['mirror-single', 'cover', 'heatsink', 'lamp-board', 'flow-channel'].includes(config.kind)) buildParametricCalibrationPart(group);
  if (config.kind === 'valve-row') addValveRow(group, config.id, config.count);

  calibrationLayer.add(group);
  calibrationParts.set(config.id, group);
  return group;
}

[
  {
    id: 'front-cameras', label: '前视相机组（8台）', count: 8, kind: 'camera-row', direction: 'rear',
    position: [-0.0381176525108761, 2.584748643053573, 0.16679359654620318], rotation: [6, 0, 0], scale: [0.8617110902523837, 0.8617110902523837, 0.8617110902523837], note: '机器前方低位舱内，直接朝向检测通道。'
  },
  {
    id: 'rear-cameras', label: '后视相机组（8台）', count: 8, kind: 'camera-row', direction: 'down',
    position: [-0.027650401769502255, 3.2854285017619684, -0.8649206308317869], rotation: [0, 0, 0], scale: [0.85, 0.85, 0.85], note: '机器背方高位舱内，镜头朝下，通过反光镜观察通道。'
  },
  {
    id: 'magic-cameras', label: '精灵眼相机组（4台）', count: 4, kind: 'camera-row', direction: 'down',
    position: [-0.020258380036813087, 2.5687464148206853, -0.931037815400405], rotation: [0, 0, 0], scale: [1, 1, 1], note: '精灵眼罩壳上部；1—2号接通道9，3—4号接通道10。'
  },
  {
    id: 'compute-boxes', label: '算力盒子组（10个）', count: 10, kind: 'compute-row',
    position: [-0.005878268014597491, 2.2357131959323113, -1.1885237207551664], rotation: [0, 0, 0], scale: [0.774307, 0.774307, 0.774307], note: '精灵眼罩壳下部，横向排列。'
  },
  {
    id: 'mirrors', label: '反光镜1', count: 1, kind: 'mirror-single',
    dimensions: { length: 2.06, height: 0.01, depth: 0.14 },
    position: [-0.04374060133993681, 2.8245030662672286, -0.866733369020622], rotation: [42, 0, 0], scale: [0.9, 0.9, 0.9], note: '单根反光镜，可复制、位移、旋转和缩放。保留原反光镜组的已校准中心位置。'
  },
  {
    id: 'valves', label: '电磁阀组（32个）', count: 32, kind: 'valve-row',
    position: [-0.01, 3.144103704944298, -0.6565423055022137], rotation: [90.81208, -0.171593, 0.285773], scale: [0.89, 0.89, 0.89], note: '主检测区域上方的32位喷射排。'
  },
  {
    id: 'flow-channel-1', label: '连续棉流主通道（1600×70）', count: 1, kind: 'flow-channel',
    dimensions: { length: 2.46, height: 2.20, depth: 0.22, thickness: 0.012, offset: 0.72 },
    position: [-0.01, 2.80132326981508, -0.39656706385206403], rotation: [0, 0, 0], scale: [0.85, 0.85, 0.85],
    note: '连续空心白色铁质主通道：下方斜入、贯穿检测区，上方出口向前延伸150毫米；前后相机对射位置分别设置上下各70毫米的透明玻璃检测窗。'
  },
  {
    id: 'cover-1', label: '罩壳1', count: 1, kind: 'cover',
    dimensions: { length: 1.96, height: 0.24, depth: 0.02, thickness: 0.015 },
    position: [-0.02005954417434063, 2.6124752384471663, 0.36122633103446933], rotation: [0, 0, 0], scale: [1, 1, 1], note: '带10颗螺丝和JWF0019型号字样的正面薄壁罩壳，可调整尺寸、位置和旋转。'
  },
  {
    id: 'heatsink-1', label: '散热片1', count: 1, kind: 'heatsink',
    dimensions: { length: 1.64, height: 0.17, depth: 0.08, thickness: 0.018 },
    position: [-0.005699054919995963, 2.2493126605606597, -1.3047508808666584], rotation: [0, 0, 0], scale: [1, 1, 1], note: '银白色密集散热片，带底板和32条散热鳍片；正常模式下贴紧精灵眼外侧。'
  },
  {
    id: 'lamp-board-dual-1', label: '双排白光＋淡紫光LED灯板', count: 1, kind: 'lamp-board', rows: ['white', 'purple'],
    dimensions: { length: 1.60, height: 0.055, depth: 0.012, thickness: 0.004 },
    position: [0, 2.72, -0.82], rotation: [0, 0, 0], scale: [1, 1, 1], note: '与检测通道等长的窄灯板；白光和淡紫光各一排，LED中心距约10毫米。'
  },
  {
    id: 'lamp-board-purple-1', label: '单排紫光LED灯板', count: 1, kind: 'lamp-board', rows: ['purple'],
    dimensions: { length: 1.60, height: 0.030, depth: 0.010, thickness: 0.004 },
    position: [0, 2.50, -1.06], rotation: [0, 0, 0], scale: [1, 1, 1], note: '更窄的单排紫光灯板，LED中心距约10毫米。'
  },
  {
    id: 'mirror-single-1784558446608', label: '反光镜2', count: 1, kind: 'mirror-single', isDuplicate: true,
    dimensions: { length: 2.04, height: 0.01, depth: 0.14 },
    position: [-0.041614977326378706, 2.3197060099466467, -0.938961786490567], rotation: [42, 0, 0], scale: [0.9, 0.9, 0.9], note: '用户校准的第二根反光镜。'
  },
  {
    id: 'mirror-single-1784558638431', label: '反光镜3', count: 1, kind: 'mirror-single', isDuplicate: true,
    dimensions: { length: 2.04, height: 0.01, depth: 0.14 },
    position: [-0.04, 2.490198234753521, -0.76994431374349], rotation: [150, 0, 0], scale: [0.9, 0.9, 0.9], note: '用户校准的第三根反光镜。'
  },
  {
    id: 'cover-1784559273935', label: '罩壳2', count: 1, kind: 'cover', isDuplicate: true,
    dimensions: { length: 1.79, height: 0.39, depth: 0.02, thickness: 0.015 },
    position: [-0.05, 3.12, -1.05293427963854], rotation: [180, 0, 0], scale: [1, 1, 1], note: '用户校准的第二块可拆罩壳。'
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

function geometryVertexIndex(geometry, faceIndex, corner) {
  return geometry.index
    ? geometry.index.getX(faceIndex * 3 + corner)
    : faceIndex * 3 + corner;
}

function shellSurfaceTopology(mesh) {
  const geometry = mesh?.geometry;
  if (!geometry?.attributes?.position) return null;
  const cached = shellSurfaceTopologyCache.get(geometry);
  if (cached) return cached;

  geometry.computeBoundingBox();
  const diagonal = geometry.boundingBox.getSize(new THREE.Vector3()).length() || 1;
  const quantize = diagonal * 0.00002;
  const position = geometry.attributes.position;
  const faceCount = Math.floor((geometry.index ? geometry.index.count : position.count) / 3);
  const normals = Array.from({ length: faceCount }, () => new THREE.Vector3());
  const planes = Array.from({ length: faceCount }, () => new THREE.Vector3());
  const adjacency = Array.from({ length: faceCount }, () => []);
  const edgeFaces = new Map();
  const a = new THREE.Vector3();
  const b = new THREE.Vector3();
  const c = new THREE.Vector3();
  const ab = new THREE.Vector3();
  const ac = new THREE.Vector3();
  const keyFor = (vertex) => [
    Math.round(vertex.x / quantize),
    Math.round(vertex.y / quantize),
    Math.round(vertex.z / quantize)
  ].join(',');

  for (let face = 0; face < faceCount; face += 1) {
    a.fromBufferAttribute(position, geometryVertexIndex(geometry, face, 0));
    b.fromBufferAttribute(position, geometryVertexIndex(geometry, face, 1));
    c.fromBufferAttribute(position, geometryVertexIndex(geometry, face, 2));
    normals[face].crossVectors(ab.subVectors(b, a), ac.subVectors(c, a)).normalize();
    planes[face].copy(a);
    const keys = [keyFor(a), keyFor(b), keyFor(c)];
    [[0, 1], [1, 2], [2, 0]].forEach(([start, end]) => {
      const edgeKey = keys[start] < keys[end]
        ? `${keys[start]}|${keys[end]}`
        : `${keys[end]}|${keys[start]}`;
      if (!edgeFaces.has(edgeKey)) edgeFaces.set(edgeKey, []);
      edgeFaces.get(edgeKey).push(face);
    });
  }

  edgeFaces.forEach((faces) => {
    if (faces.length < 2) return;
    faces.forEach((face) => {
      faces.forEach((other) => {
        if (other !== face && !adjacency[face].includes(other)) adjacency[face].push(other);
      });
    });
  });

  const topology = { geometry, diagonal, faceCount, normals, planes, adjacency };
  shellSurfaceTopologyCache.set(geometry, topology);
  return topology;
}

function selectCoplanarShellFaces(mesh, seedFaceIndex) {
  const topology = shellSurfaceTopology(mesh);
  if (!topology || !Number.isInteger(seedFaceIndex) || seedFaceIndex < 0 || seedFaceIndex >= topology.faceCount) return [];
  const seedNormal = topology.normals[seedFaceIndex];
  const seedPoint = topology.planes[seedFaceIndex];
  const normalThreshold = Math.cos(THREE.MathUtils.degToRad(9));
  const planeTolerance = topology.diagonal * 0.006;
  const selected = [];
  const visited = new Uint8Array(topology.faceCount);
  const queue = [seedFaceIndex];
  visited[seedFaceIndex] = 1;
  const position = topology.geometry.attributes.position;
  const vertex = new THREE.Vector3();

  while (queue.length) {
    const face = queue.shift();
    if (topology.normals[face].dot(seedNormal) < normalThreshold) continue;
    let coplanar = true;
    for (let corner = 0; corner < 3; corner += 1) {
      vertex.fromBufferAttribute(position, geometryVertexIndex(topology.geometry, face, corner));
      if (Math.abs(vertex.clone().sub(seedPoint).dot(seedNormal)) > planeTolerance) {
        coplanar = false;
        break;
      }
    }
    if (!coplanar) continue;
    selected.push(face);
    topology.adjacency[face].forEach((next) => {
      if (visited[next]) return;
      visited[next] = 1;
      queue.push(next);
    });
  }
  return selected.sort((left, right) => left - right);
}

function shellSurfaceKey(mesh, faceIndices) {
  return `${mesh.userData.shellColorId || mesh.name || '主体'}:${faceIndices[0] ?? -1}`;
}

function buildShellSurfaceOverlay(mesh, faceIndices, color) {
  if (!mesh?.geometry || !faceIndices.length) return null;
  const source = mesh.geometry;
  const sourcePosition = source.attributes.position;
  const sourceNormal = source.attributes.normal;
  const positions = [];
  const normals = [];
  faceIndices.forEach((face) => {
    for (let corner = 0; corner < 3; corner += 1) {
      const vertexIndex = geometryVertexIndex(source, face, corner);
      positions.push(
        sourcePosition.getX(vertexIndex),
        sourcePosition.getY(vertexIndex),
        sourcePosition.getZ(vertexIndex)
      );
      if (sourceNormal) {
        normals.push(
          sourceNormal.getX(vertexIndex),
          sourceNormal.getY(vertexIndex),
          sourceNormal.getZ(vertexIndex)
        );
      }
    }
  });
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  if (normals.length) geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  else geometry.computeVertexNormals();
  const material = new THREE.MeshStandardMaterial({
    color,
    roughness: 0.48,
    metalness: 0.12,
    polygonOffset: true,
    polygonOffsetFactor: -2,
    polygonOffsetUnits: -2,
    side: THREE.DoubleSide
  });
  const overlay = new THREE.Mesh(geometry, material);
  overlay.name = '主体GLB所选面填色';
  overlay.userData.shellSurfacePaintOverlay = true;
  overlay.userData.baseMaterial = material;
  overlay.userData.role = 'decal';
  overlay.renderOrder = 20;
  mesh.add(overlay);
  return overlay;
}

function applyShellSurfaceColor(mesh, seedFaceIndex, color, record = true) {
  if (!mesh || !Number.isInteger(seedFaceIndex) || !/^#[0-9a-f]{6}$/i.test(color)) return 0;
  const faceIndices = selectCoplanarShellFaces(mesh, seedFaceIndex);
  if (!faceIndices.length) return 0;
  const surfaceKey = shellSurfaceKey(mesh, faceIndices);
  const previousIndex = shellSurfacePaints.findIndex((item) => item.surfaceKey === surfaceKey);
  if (previousIndex >= 0) {
    shellSurfacePaints[previousIndex].overlay?.removeFromParent();
    shellSurfacePaints[previousIndex].overlay?.geometry?.dispose();
    shellSurfacePaints[previousIndex].overlay?.material?.dispose();
    shellSurfacePaints.splice(previousIndex, 1);
  }
  const overlay = buildShellSurfaceOverlay(mesh, faceIndices, color);
  if (!overlay) return 0;
  shellSurfacePaints.push({
    meshId: mesh.userData.shellColorId,
    seedFaceIndex,
    surfaceKey,
    color: color.toLowerCase(),
    overlay
  });
  if (record) persistCalibrationLayout();
  return faceIndices.length;
}

function restoreShellSurfacePaints() {
  try {
    shellSurfacePaints = [];
    fixedShellSurfacePaints.forEach((record) => {
      let mesh = null;
      importedRootModel?.traverse((object) => {
        if (!mesh && object.isMesh && object.userData.shellColorId === record.meshId) mesh = object;
      });
      mesh ||= importedRootModel?.getObjectByProperty('isMesh', true);
      if (mesh && Number.isInteger(record.seedFaceIndex) && /^#[0-9a-f]{6}$/i.test(record.color)) {
        applyShellSurfaceColor(mesh, record.seedFaceIndex, record.color, false);
        const restored = shellSurfacePaints.at(-1)?.overlay;
        if (restored && record.repairPaint) {
          restored.material.dispose();
          restored.material = new THREE.MeshStandardMaterial({
            color: record.color,
            roughness: 0.36,
            metalness: 0.48,
            emissive: 0x1c1e1d,
            emissiveIntensity: 0.08,
            polygonOffset: true,
            polygonOffsetFactor: -2,
            polygonOffsetUnits: -2,
            side: THREE.DoubleSide
          });
          restored.userData.baseMaterial = restored.material;
          const position = restored.geometry.attributes.position;
          const normal = restored.geometry.attributes.normal;
          if (position && normal) {
            for (let index = 0; index < position.count; index += 1) {
              position.setXYZ(
                index,
                position.getX(index) + normal.getX(index) * 0.0015,
                position.getY(index) + normal.getY(index) * 0.0015,
                position.getZ(index) + normal.getZ(index) * 0.0015
              );
            }
            position.needsUpdate = true;
          }
        }
      }
    });
  } catch (error) {
    shellSurfacePaints = [];
    console.warn('主体GLB固定表面颜色恢复失败，已使用原始外观', error);
  }
}

function addCalibrationOption(part, id) {
  if (calibrationPartSelect.querySelector(`option[value="${id}"]`)) return;
  const option = document.createElement('option');
  option.value = id;
  option.textContent = part.userData.label;
  calibrationPartSelect.appendChild(option);
}
calibrationParts.forEach(addCalibrationOption);
const retiredCalibrationIds = new Set(['reject-volute-1', 'operator-screen', 'electrical-cabinet']);

function serializeCalibrationLayout() {
  return {
    model: 'JWF0019A',
    version: 8,
    coordinateSystem: { x: '左右，正数向右', y: '上下，正数向上', z: '前后，正数向前' },
    shellSurfacePaints: shellSurfacePaints.map((record) => ({
      meshId: record.meshId,
      seedFaceIndex: record.seedFaceIndex,
      color: record.color
    })),
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

function applySavedCalibrationItem(part, item) {
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
}

function restoreCalibrationPartFromStorage(part, id) {
  if (retiredCalibrationIds.has(id)) return;
  try {
    const saved = JSON.parse(localStorage.getItem(calibrationStorageKey) || 'null');
    const item = saved?.parts?.find((entry) => entry.id === id);
    if (item) applySavedCalibrationItem(part, item);
  } catch (error) {
    console.warn(`${part.userData.label}布局记录读取失败，已使用初始位置`, error);
  }
}

function restoreCalibrationLayout() {
  try {
    const saved = JSON.parse(localStorage.getItem(calibrationStorageKey) || 'null');
    saved?.parts?.forEach((item) => {
      if (retiredCalibrationIds.has(item.id)) return;
      let part = calibrationParts.get(item.id);
      if (!part && item.config && item.config.kind !== 'external-control') {
        part = createCalibrationPart(item.config);
        addCalibrationOption(part, item.id);
      }
      if (!part) return;
      applySavedCalibrationItem(part, item);
    });
  } catch (error) {
    console.warn('内部布局记录读取失败，已使用初始位置', error);
  }
}
restoreCalibrationLayout();
const layout9MigrationKey = 'jwf0019a-layout9-final-v1';
if (!localStorage.getItem(layout9MigrationKey)) {
  const layout9Items = [
    { id: 'front-cameras', position: { x: -0.0381176525108761, y: 2.584748643053573, z: 0.16679359654620318 }, rotationDegrees: { x: 6, y: 0, z: 0 }, scale: { x: 0.8617110902523837, y: 0.8617110902523837, z: 0.8617110902523837 } },
    { id: 'rear-cameras', position: { x: -0.027650401769502255, y: 3.2854285017619684, z: -0.8649206308317869 }, rotationDegrees: { x: 0, y: 0, z: 0 }, scale: { x: 0.85, y: 0.85, z: 0.85 } },
    { id: 'magic-cameras', position: { x: -0.020258380036813087, y: 2.5687464148206853, z: -0.931037815400405 }, rotationDegrees: { x: 0, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 } },
    { id: 'compute-boxes', position: { x: -0.005878268014597491, y: 2.2357131959323113, z: -1.1885237207551664 }, rotationDegrees: { x: 0, y: 0, z: 0 }, scale: { x: 0.774307, y: 0.774307, z: 0.774307 } },
    { id: 'mirrors', dimensions: { length: 2.06, height: 0.01, depth: 0.14 }, position: { x: -0.04374060133993681, y: 2.8245030662672286, z: -0.866733369020622 }, rotationDegrees: { x: 42, y: 0, z: 0 }, scale: { x: 0.9, y: 0.9, z: 0.9 } },
    { id: 'valves', position: { x: -0.01, y: 3.144103704944298, z: -0.6565423055022137 }, rotationDegrees: { x: 100, y: 0, z: 0 }, scale: { x: 0.89, y: 0.89, z: 0.89 } },
    { id: 'flow-channel-1', dimensions: { length: 2.46, height: 2.2, depth: 0.22, thickness: 0.012, offset: 0.72 }, position: { x: -0.01, y: 2.80132326981508, z: -0.39656706385206403 }, rotationDegrees: { x: 0, y: 0, z: 0 }, scale: { x: 0.85, y: 0.85, z: 0.85 } },
    { id: 'cover-1', dimensions: { length: 1.96, height: 0.24, depth: 0.02, thickness: 0.015 }, position: { x: -0.02005954417434063, y: 2.6124752384471663, z: 0.36122633103446933 }, rotationDegrees: { x: 0, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 } },
    { id: 'heatsink-1', dimensions: { length: 1.64, height: 0.17, depth: 0.08, thickness: 0.018 }, position: { x: -0.005699054919995963, y: 2.2493126605606597, z: -1.3047508808666584 }, rotationDegrees: { x: 0, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 } },
    { id: 'lamp-board-dual-1', dimensions: { length: 2, height: 0.055, depth: 0.012, thickness: 0.004 }, position: { x: -0.010246147582078485, y: 2.896272925018304, z: -0.6087336762295686 }, rotationDegrees: { x: 60, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 } },
    { id: 'lamp-board-purple-1', dimensions: { length: 2, height: 0.05, depth: 0.01, thickness: 0.004 }, position: { x: -0.0001946733735222816, y: 2.4905258957984535, z: -0.6730703713871884 }, rotationDegrees: { x: 60, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 } },
    { id: 'mirror-single-1784558446608', dimensions: { length: 1.96, height: 0.01, depth: 0.14 }, position: { x: -0.01, y: 2.3197060099466467, z: -0.938961786490567 }, rotationDegrees: { x: 42, y: 0, z: 0 }, scale: { x: 0.9, y: 0.9, z: 0.9 } },
    { id: 'mirror-single-1784558638431', dimensions: { length: 1.96, height: 0.01, depth: 0.14 }, position: { x: -0.01, y: 2.490198234753521, z: -0.76994431374349 }, rotationDegrees: { x: 150, y: 0, z: 0 }, scale: { x: 0.9, y: 0.9, z: 0.9 } },
    { id: 'cover-1784559273935', dimensions: { length: 1.79, height: 0.39, depth: 0.02, thickness: 0.015 }, position: { x: -0.05, y: 3.12, z: -1.05293427963854 }, rotationDegrees: { x: 180, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 } },
    {
      id: 'lamp-board-1784821673222',
      config: { id: 'lamp-board-1784821673222', label: '双排白光＋淡紫光LED灯板副本1', count: 1, kind: 'lamp-board', rows: ['white', 'purple'], dimensions: { length: 2, height: 0.055, depth: 0.012, thickness: 0.004 }, position: [0.10975385241792152, 2.976272925018304, -0.48873367622956865], rotation: [60, 0, 0], scale: [1, 1, 1], note: '与检测通道等长的窄灯板；白光和淡紫光各一排，LED中心距约10毫米。', isDuplicate: true, copyBaseLabel: '双排白光＋淡紫光LED灯板' },
      dimensions: { length: 2, height: 0.055, depth: 0.012, thickness: 0.004 }, position: { x: -0.02073957754626196, y: 2.7258914909623306, z: -0.6227657946870061 }, rotationDegrees: { x: -40, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 }
    },
    {
      id: 'lamp-board-1784821729871',
      config: { id: 'lamp-board-1784821729871', label: '双排白光＋淡紫光LED灯板副本2', count: 1, kind: 'lamp-board', rows: ['white', 'purple'], dimensions: { length: 2, height: 0.055, depth: 0.012, thickness: 0.004 }, position: [0.09926042245373803, 2.8058914909623307, -0.5027657946870061], rotation: [-40, 0, 0], scale: [1, 1, 1], note: '与检测通道等长的窄灯板；白光和淡紫光各一排，LED中心距约10毫米。', isDuplicate: true, copyBaseLabel: '双排白光＋淡紫光LED灯板' },
      dimensions: { length: 2, height: 0.055, depth: 0.012, thickness: 0.004 }, position: { x: -0.007993791484923116, y: 2.788770040336861, z: -0.2987121871765246 }, rotationDegrees: { x: 150, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 }
    },
    {
      id: 'lamp-board-1784821735355',
      config: { id: 'lamp-board-1784821735355', label: '双排白光＋淡紫光LED灯板副本3', count: 1, kind: 'lamp-board', rows: ['white', 'purple'], dimensions: { length: 2, height: 0.055, depth: 0.012, thickness: 0.004 }, position: [0.2190126794611173, 2.8738346653217612, -0.1606009785824839], rotation: [-40, 0, 0], scale: [1, 1, 1], note: '与检测通道等长的窄灯板；白光和淡紫光各一排，LED中心距约10毫米。', isDuplicate: true, copyBaseLabel: '双排白光＋淡紫光LED灯板' },
      dimensions: { length: 2, height: 0.055, depth: 0.012, thickness: 0.004 }, position: { x: 0.003344661041022795, y: 2.6334679935475065, z: -0.3167951237861724 }, rotationDegrees: { x: 240, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 }
    }
  ];
  const layout9Ids = new Set(layout9Items.map((item) => item.id));
  [...calibrationParts.entries()].forEach(([id, part]) => {
    if (!part.userData.config.isDuplicate || layout9Ids.has(id)) return;
    part.traverse((object) => {
      const selectableIndex = selectable.indexOf(object);
      if (selectableIndex >= 0) selectable.splice(selectableIndex, 1);
    });
    calibrationLayer.remove(part);
    calibrationParts.delete(id);
    calibrationPartSelect.querySelector(`option[value="${id}"]`)?.remove();
  });
  layout9Items.forEach((item) => {
    let part = calibrationParts.get(item.id);
    if (!part && item.config) {
      part = createCalibrationPart(item.config);
      addCalibrationOption(part, item.id);
    }
    if (part) applySavedCalibrationItem(part, item);
  });
  localStorage.setItem(layout9MigrationKey, '1');
  persistCalibrationLayout();
}
const frontCameraX6MigrationKey = 'jwf0019a-front-camera-x6-v1';
if (!localStorage.getItem(frontCameraX6MigrationKey)) {
  const frontCameraPart = calibrationParts.get('front-cameras');
  if (frontCameraPart) frontCameraPart.rotation.x = THREE.MathUtils.degToRad(6);
  localStorage.setItem(frontCameraX6MigrationKey, '1');
  persistCalibrationLayout();
}
const heatsinkPositionMigrationKey = 'jwf0019a-heatsink-tight-v2';
if (!localStorage.getItem(heatsinkPositionMigrationKey)) {
  const heatsinkPart = calibrationParts.get('heatsink-1');
  if (heatsinkPart) heatsinkPart.position.z = -1.3047508808666584;
  localStorage.setItem(heatsinkPositionMigrationKey, '1');
  persistCalibrationLayout();
}
const frontCoverPositionMigrationKey = 'jwf0019a-front-cover-up-v2';
if (!localStorage.getItem(frontCoverPositionMigrationKey)) {
  const frontCoverPart = calibrationParts.get('cover-1');
  if (frontCoverPart) frontCoverPart.position.y = 2.6124752384471663;
  localStorage.setItem(frontCoverPositionMigrationKey, '1');
  persistCalibrationLayout();
}
const layout10MigrationKey = 'jwf0019a-layout10-final-v1';
if (!localStorage.getItem(layout10MigrationKey)) {
  const layout10Items = [
    { id: 'front-cameras', position: { x: -0.0381176525108761, y: 2.584748643053573, z: 0.16679359654620318 }, rotationDegrees: { x: 6.000000000000001, y: 0, z: 0 }, scale: { x: 0.8617110902523837, y: 0.8617110902523837, z: 0.8617110902523837 } },
    { id: 'rear-cameras', position: { x: -0.027650401769502255, y: 3.2854285017619684, z: -0.8649206308317869 }, rotationDegrees: { x: 0, y: 0, z: 0 }, scale: { x: 0.85, y: 0.85, z: 0.85 } },
    { id: 'magic-cameras', position: { x: -0.02035834257418426, y: 2.5639864882983665, z: -1.012816249371657 }, rotationDegrees: { x: 0, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 } },
    { id: 'compute-boxes', position: { x: -0.005878268014597491, y: 2.2357131959323113, z: -1.1885237207551664 }, rotationDegrees: { x: 0, y: 0, z: 0 }, scale: { x: 0.774307, y: 0.774307, z: 0.774307 } },
    { id: 'mirrors', dimensions: { length: 2.06, height: 0.01, depth: 0.14 }, position: { x: -0.04374060133993681, y: 2.85, z: -0.866733369020622 }, rotationDegrees: { x: 42, y: 0, z: 0 }, scale: { x: 0.9, y: 0.9, z: 0.9 } },
    { id: 'valves', position: { x: -0.009664791444459015, y: 3.160417187980539, z: -0.6786478890175238 }, rotationDegrees: { x: 112, y: 0, z: 0 }, scale: { x: 0.89, y: 0.89, z: 0.89 } },
    { id: 'flow-channel-1', dimensions: { length: 2.46, height: 2.2, depth: 0.18, thickness: 0.012, offset: 0.72 }, position: { x: 0, y: 2.42, z: -0.38 }, rotationDegrees: { x: 0, y: 0, z: 0 }, scale: { x: 0.85, y: 0.85, z: 0.85 } },
    { id: 'cover-1', dimensions: { length: 1.96, height: 0.24, depth: 0.02, thickness: 0.015 }, position: { x: -0.02005954417434063, y: 2.6124752384471663, z: 0.36122633103446933 }, rotationDegrees: { x: 0, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 } },
    { id: 'heatsink-1', dimensions: { length: 1.64, height: 0.17, depth: 0.08, thickness: 0.018 }, position: { x: -0.005699054919995963, y: 2.2493126605606597, z: -1.3047508808666584 }, rotationDegrees: { x: 0, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 } },
    { id: 'lamp-board-dual-1', dimensions: { length: 2, height: 0.055, depth: 0.012, thickness: 0.004 }, position: { x: -0.010034790676388535, y: 2.8908172528975116, z: -0.6802913556026182 }, rotationDegrees: { x: 59.99999999999999, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 } },
    { id: 'lamp-board-purple-1', dimensions: { length: 2, height: 0.05, depth: 0.01, thickness: 0.004 }, position: { x: 0.00015583230487511512, y: 2.507753803706803, z: -0.7873339023523009 }, rotationDegrees: { x: 59.99999999999999, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 } },
    { id: 'mirror-single-1784558446608', dimensions: { length: 1.96, height: 0.01, depth: 0.14 }, position: { x: -0.010367736067942128, y: 2.3019106623249423, z: -1.0114554092206343 }, rotationDegrees: { x: 42, y: 0, z: 0 }, scale: { x: 0.9, y: 0.9, z: 0.9 } },
    { id: 'mirror-single-1784558638431', dimensions: { length: 1.96, height: 0.01, depth: 0.14 }, position: { x: -0.010823729935340547, y: 2.4502867250531324, z: -0.9046411713993665 }, rotationDegrees: { x: 160, y: 0, z: 0 }, scale: { x: 0.9, y: 0.9, z: 0.9 } },
    { id: 'cover-1784559273935', dimensions: { length: 1.79, height: 0.39, depth: 0.02, thickness: 0.015 }, position: { x: -0.05, y: 3.12, z: -1.05293427963854 }, rotationDegrees: { x: 180, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 } },
    { id: 'lamp-board-1784821673222', dimensions: { length: 2, height: 0.055, depth: 0.012, thickness: 0.004 }, position: { x: -0.02044016364416529, y: 2.740538581143027, z: -0.729235979300345 }, rotationDegrees: { x: -40, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 } },
    { id: 'lamp-board-1784821729871', dimensions: { length: 2, height: 0.055, depth: 0.012, thickness: 0.004 }, position: { x: -0.00742946553547958, y: 2.816420816577462, z: -0.4266984579496416 }, rotationDegrees: { x: 150, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 } },
    { id: 'lamp-board-1784821735355', dimensions: { length: 2, height: 0.055, depth: 0.012, thickness: 0.004 }, position: { x: 0.004295192522338472, y: 2.680016845345684, z: -0.4722439060750575 }, rotationDegrees: { x: 239.99999999999997, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 } }
  ];
  layout10Items.forEach((item) => {
    const part = calibrationParts.get(item.id);
    if (part) applySavedCalibrationItem(part, item);
  });
  localStorage.setItem(layout10MigrationKey, '1');
  persistCalibrationLayout();
}

function trackCalibrationExplode(part, id) {
  if (!part || explodeItems.some((entry) => entry.object === part)) return;
  const kind = part.userData.config.kind;
  if (kind === 'cover') {
    trackExplode(part, [0, 0, part.position.z >= 0 ? 1 : -1], 0.68, 0.00, 0.18);
    return;
  }
  if (kind === 'heatsink') {
    trackExplode(part, [0, 0.10, -1], 1.42, 0.18, 0.48);
    return;
  }
  if (kind === 'lamp-board' && (part.userData.config.rows || []).length === 2) {
    trackExplode(part, [0, 1, 0], 0.92, 0.28, 0.58);
    return;
  }
  const plans = {
    'front-cameras': [[0, 0, 1], 0.70, 0.20, 0.46],
    'rear-cameras': [[0, 0.12, -1], 0.80, 0.25, 0.52],
    'magic-cameras': [[0, -0.10, -1], 0.95, 0.34, 0.60],
    'compute-boxes': [[0, -0.06, -1], 0.88, 0.38, 0.68],
    'lamp-board-purple-1': [[0, -0.04, -1], 1.05, 0.32, 0.62],
    valves: [[0, 1, -0.20], 0.55, 0.58, 0.82],
    'flow-channel-1': [[0, -1, 0], 0.28, 0.78, 1.00]
  };
  const plan = plans[id]
    || (kind === 'mirror-single' ? [[0, 0.22, -1], 0.82, 0.48, 0.74] : null)
    || (kind === 'lamp-board' ? [[0, 0, -1], 0.92, 0.30, 0.60] : null);
  if (plan) trackExplode(part, plan[0], plan[1], plan[2], plan[3]);
}

calibrationParts.forEach(trackCalibrationExplode);

function updateCalibrationPartVisibility(mode = 'external') {
  calibrationLayer.visible = true;
  calibrationParts.forEach((part, id) => {
    const kind = part.userData.config.kind;
    const external = kind === 'cover' || kind === 'heatsink' || kind === 'external-control' || id === 'flow-channel-1';
    const processDuct = id === 'flow-channel-1';
    const detectionPart = id === 'front-cameras' || id === 'rear-cameras' || id === 'mirrors';
    const spiritEyeProcessPart = id === 'magic-cameras'
      || id === 'compute-boxes'
      || id === 'mirror-single-1784558446608'
      || id === 'mirror-single-1784558638431';
    const processPart = processDuct || detectionPart || spiritEyeProcessPart || id === 'valves' || kind === 'lamp-board';
    part.visible = mode === 'all'
      || external
      || (mode === 'process' && processPart)
      || (mode === 'detect' && detectionPart);
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
  calibrationDuplicate.disabled = !calibrationEnabled || !part || !['mirror-single', 'cover', 'heatsink', 'lamp-board'].includes(part.userData.config.kind);
  calibrationDelete.disabled = !calibrationEnabled || !part?.userData.config.isDuplicate;
  calibrationTransformButtons.forEach((button) => { button.disabled = !calibrationEnabled || !part; });
  calibrationReset.disabled = !calibrationEnabled || !part;
  calibrationReset.textContent = '复位当前部件';
}

function selectCalibrationPart(id) {
  const part = calibrationParts.get(id);
  if (!part) return;
  if (calibrationEnabled) {
    applyMode('xray');
    setFlowChannelGhosted(true);
    setExternalModulesGhosted(true);
  }
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
  if (enabled && faultDemoPlaying) setFaultDemo(false);
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

calibrationModeButton.addEventListener('click', () => {
  if (!calibrationEnabled && lineLayoutEnabled) setLineLayoutEnabled(false);
  setCalibrationEnabled(!calibrationEnabled);
});
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
    syncExplodeBase(selectedCalibrationPart);
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
  if (selectedCalibrationPart) syncExplodeBase(selectedCalibrationPart);
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
  if (!['mirror-single', 'cover', 'heatsink', 'lamp-board'].includes(sourceConfig.kind)) return;
  const sameKindCount = [...calibrationParts.values()].filter((part) => part.userData.config.kind === sourceConfig.kind).length;
  const config = JSON.parse(JSON.stringify(sourceConfig));
  config.id = `${sourceConfig.kind}-${Date.now()}`;
  config.isDuplicate = true;
  if (sourceConfig.kind === 'lamp-board') {
    const baseLabel = sourceConfig.copyBaseLabel || sourceConfig.label;
    const sameBaseCount = [...calibrationParts.values()].filter((part) => {
      const partConfig = part.userData.config;
      return partConfig.kind === 'lamp-board' && (partConfig.copyBaseLabel || partConfig.label) === baseLabel;
    }).length;
    config.copyBaseLabel = baseLabel;
    config.label = `${baseLabel}副本${sameBaseCount}`;
  } else {
    config.label = `${sourceConfig.kind === 'mirror-single' ? '反光镜' : sourceConfig.kind === 'cover' ? '罩壳' : '散热片'}${sameKindCount + 1}`;
  }
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
  trackCalibrationExplode(duplicate, config.id);
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
  const explodeIndex = explodeItems.findIndex((entry) => entry.object === part);
  if (explodeIndex >= 0) explodeItems.splice(explodeIndex, 1);
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
  syncExplodeBase(selectedCalibrationPart);
  if (selectedCalibrationPart.userData.defaultDimensions) {
    selectedCalibrationPart.userData.config.dimensions = { ...selectedCalibrationPart.userData.defaultDimensions };
    buildParametricCalibrationPart(selectedCalibrationPart);
  }
  calibrationHelper?.update();
  updateCalibrationFields();
  persistCalibrationLayout(true);
});

const shell = makeLayer('shell');
shell.visible = false;

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
const screenImage = new THREE.Mesh(
  new THREE.PlaneGeometry(0.265, 0.169),
  makeScreenImageMaterial()
);
screenImage.position.set(-0.878, 1.66, 0.02);
screenImage.rotation.y = Math.PI / 2;
registerMesh(screenImage, '操作屏运行画面', 'JWF0019A正常运行时的通道状态与喷阀统计主画面。', 'decal');
screenGroup.add(screenImage);

const electricCabinet = new THREE.Group();
shell.add(electricCabinet);
electricCabinet.position.set(-0.015, -0.09, -0.055);
roundedBox(electricCabinet, [0.055, 0.78, 0.47], [0.855, 1.48, 0], materials.paintDark, '电柜门', '风机侧立柱内面的一体式电气柜门。', 0.018);
roundedBox(electricCabinet, [0.022, 0.68, 0.39], [0.821, 1.48, 0], materials.paint, '电柜内侧面板', '电柜完全收在右侧落地立柱内，不占用中间悬空区域。', 0.01);
roundedBox(electricCabinet, [0.016, 0.10, 0.10], [0.798, 1.48, -0.13], materials.yellow, '', '', 0.008);
cylinder(electricCabinet, 0.032, 0.045, [0.775, 1.48, -0.13], [0, 0, Math.PI / 2], materials.red, '电柜门旋转按钮', '风机侧电柜门靠左侧边框中部的红色旋转按钮，带黄色安全底座。');

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
const fallbackValveRow = new THREE.Group();
fallbackValveRow.position.set(-0.031286, 2.878776, -0.515353);
fallbackValveRow.rotation.set(THREE.MathUtils.degToRad(90.81208), THREE.MathUtils.degToRad(-0.171593), THREE.MathUtils.degToRad(0.285773));
fallbackValveRow.scale.set(0.827251, 0.577727, 0.577727);
ejection.add(fallbackValveRow);
addValveRow(fallbackValveRow, 'fallback-valves', 32);

const cottonFlow = new THREE.Group();
cottonFlow.visible = false;
machine.add(cottonFlow);
const processStatus = document.querySelector('#process-status');
const processPlay = document.querySelector('#process-play');
const faultPlay = document.querySelector('#fault-play');
const faultXInput = document.querySelector('#fault-x');
const faultXValue = document.querySelector('#fault-x-value');
const faultLevelOutput = document.querySelector('#fault-level');
let processDemoPlaying = false;
let faultDemoPlaying = false;
let processPlaybackRate = 1.5;
let processTimelineMs = 0;
const faultSettings = {
  type: 'channel',
  surface: 'front',
  edge: 'upper',
  xCm: 0,
  sizeCm: 20
};
document.documentElement.dataset.activeProcessSpeed = '1';
document.documentElement.dataset.activeProcessPlaybackRate = String(processPlaybackRate);
document.documentElement.dataset.faultWidthCm = String(faultSettings.sizeCm);

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

const cottonLobeGeometry = new THREE.SphereGeometry(0.022, 7, 5);
const cottonFiberGeometry = new THREE.CapsuleGeometry(0.0055, 0.036, 2, 5);
const cottonMaterial = new THREE.MeshStandardMaterial({ color: 0xf5f0df, roughness: 1, transparent: true, opacity: 0.82 });
const cottonShadowMaterial = new THREE.MeshStandardMaterial({ color: 0xded8c7, roughness: 1, transparent: true, opacity: 0.62 });
const redImpurityMaterial = new THREE.MeshStandardMaterial({ color: 0xc92d32, roughness: 0.82, emissive: 0x3c080a, emissiveIntensity: 0.35 });
const blackImpurityMaterial = new THREE.MeshStandardMaterial({ color: 0x15191c, roughness: 0.78, metalness: 0.08 });
const blueImpurityMaterial = new THREE.MeshStandardMaterial({ color: 0x2468d8, roughness: 0.80, emissive: 0x071c49, emissiveIntensity: 0.28 });
const yellowImpurityMaterial = new THREE.MeshStandardMaterial({ color: 0xe1b62b, roughness: 0.84, emissive: 0x4a3506, emissiveIntensity: 0.24 });
const greenImpurityMaterial = new THREE.MeshStandardMaterial({ color: 0x24945a, roughness: 0.82, emissive: 0x062c17, emissiveIntensity: 0.24 });
const fluorescentWhiteImpurityMaterial = new THREE.MeshStandardMaterial({
  color: 0xfaffff,
  roughness: 0.66,
  emissive: 0xd9ffff,
  emissiveIntensity: 0.38
});

function seededUnit(seed) {
  const value = Math.sin(seed * 91.733) * 43758.5453;
  return value - Math.floor(value);
}

let cottonSourceMeshCount = 0;
let cottonMergedMeshCount = 0;

function transformedCottonGeometry(source, position, rotation, scale) {
  const geometry = source.clone();
  const matrix = new THREE.Matrix4().compose(
    position,
    new THREE.Quaternion().setFromEuler(rotation),
    scale
  );
  geometry.applyMatrix4(matrix);
  return geometry;
}

function setCottonVertexColor(geometry, color) {
  const colors = new Float32Array(geometry.attributes.position.count * 3);
  for (let index = 0; index < geometry.attributes.position.count; index += 1) {
    colors[index * 3] = color.r;
    colors[index * 3 + 1] = color.g;
    colors[index * 3 + 2] = color.b;
  }
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  return geometry;
}

function makeFluffyTuft(seed, material = cottonMaterial, impurity = false) {
  const tuft = new THREE.Group();
  const lobeCount = impurity ? 6 : 7;
  const mainParts = [];
  const whiteVertexColor = new THREE.Color(1, 1, 1);
  const shadowVertexColor = new THREE.Color(
    THREE.MathUtils.clamp(cottonShadowMaterial.color.r / Math.max(material.color.r, 0.001), 0, 1),
    THREE.MathUtils.clamp(cottonShadowMaterial.color.g / Math.max(material.color.g, 0.001), 0, 1),
    THREE.MathUtils.clamp(cottonShadowMaterial.color.b / Math.max(material.color.b, 0.001), 0, 1)
  );
  for (let index = 0; index < lobeCount; index += 1) {
    const angle = seededUnit(seed + index * 3.1) * Math.PI * 2;
    const radius = 0.014 + seededUnit(seed + index * 5.7) * 0.034;
    const geometry = transformedCottonGeometry(
      cottonLobeGeometry,
      new THREE.Vector3(Math.cos(angle) * radius, (seededUnit(seed + index * 7.9) - 0.5) * 0.052, Math.sin(angle) * radius * 0.58),
      new THREE.Euler(),
      new THREE.Vector3(
        0.58 + seededUnit(seed + index * 11.1) * 0.50,
        0.38 + seededUnit(seed + index * 13.3) * 0.46,
        0.52 + seededUnit(seed + index * 17.7) * 0.42
      )
    );
    mainParts.push(setCottonVertexColor(
      geometry,
      index === lobeCount - 1 && !impurity ? shadowVertexColor : whiteVertexColor
    ));
  }
  for (let index = 0; index < 3; index += 1) {
    const angle = seededUnit(seed + 80 + index * 4.3) * Math.PI * 2;
    const radius = 0.012 + seededUnit(seed + 90 + index * 6.1) * 0.034;
    const scale = 0.72 + seededUnit(seed + 140 + index * 10.7) * 0.34;
    mainParts.push(setCottonVertexColor(transformedCottonGeometry(
      cottonFiberGeometry,
      new THREE.Vector3(Math.cos(angle) * radius, (seededUnit(seed + 100 + index * 8.3) - 0.5) * 0.045, Math.sin(angle) * radius * 0.55),
      new THREE.Euler(
        (seededUnit(seed + 110 + index * 5.1) - 0.5) * Math.PI,
        seededUnit(seed + 120 + index * 7.7) * Math.PI,
        (seededUnit(seed + 130 + index * 9.9) - 0.5) * Math.PI
      ),
      new THREE.Vector3(scale, scale, scale)
    ), whiteVertexColor));
  }
  const mainGeometry = mergeGeometries(mainParts, false);
  material.vertexColors = true;
  material.needsUpdate = true;
  const mainMesh = new THREE.Mesh(mainGeometry, material);
  registerMesh(mainMesh, '', '', 'flow', false);
  tuft.add(mainMesh);
  mainParts.forEach((geometry) => geometry.dispose());
  cottonSourceMeshCount += lobeCount + 3;
  cottonMergedMeshCount += 1;
  document.documentElement.dataset.cottonGeometryOptimization = 'merged-per-tuft';
  document.documentElement.dataset.cottonSourceMeshes = String(cottonSourceMeshCount);
  document.documentElement.dataset.cottonMergedMeshes = String(cottonMergedMeshCount);
  cottonFlow.add(tuft);
  return tuft;
}

const cottonTuftCount = 84;
const whiteCottonTufts = Array.from({ length: cottonTuftCount }, (_, index) => {
  const tuft = makeFluffyTuft(index + 1);
  tuft.userData.flowOffset = index / cottonTuftCount;
  tuft.userData.lane = -0.82 + seededUnit(index + 20) * 1.64;
  tuft.userData.baseScale = 0.68 + seededUnit(index + 40) * 0.34;
  return tuft;
});

const impurityEvents = [
  { label: '红色异物', start: 3.5, lane: -0.42, detector: 'front', tuft: makeFluffyTuft(101, redImpurityMaterial, true) },
  { label: '黑色异物', start: 8.5, lane: 0.47, detector: 'rear', tuft: makeFluffyTuft(202, blackImpurityMaterial, true) },
  { label: '蓝色异物', start: 13.5, lane: -0.10, detector: 'front', tuft: makeFluffyTuft(303, blueImpurityMaterial, true) },
  { label: '黄色异物', start: 18.5, lane: 0.22, detector: 'rear', tuft: makeFluffyTuft(404, yellowImpurityMaterial, true) },
  { label: '绿色异物', start: 23.5, lane: -0.67, detector: 'front', tuft: makeFluffyTuft(505, greenImpurityMaterial, true) },
  {
    label: '荧光白色异纤1',
    start: 27.0,
    lane: -0.58,
    detector: 'spirit',
    fluorescent: true,
    tuft: makeFluffyTuft(606, fluorescentWhiteImpurityMaterial, true)
  },
  {
    label: '荧光白色异纤2',
    start: 35.0,
    lane: 0.03,
    detector: 'spirit',
    fluorescent: true,
    tuft: makeFluffyTuft(607, fluorescentWhiteImpurityMaterial, true)
  },
  {
    label: '荧光白色异纤3',
    start: 43.0,
    lane: 0.63,
    detector: 'spirit',
    fluorescent: true,
    tuft: makeFluffyTuft(608, fluorescentWhiteImpurityMaterial, true)
  }
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

const faultObstructionMaterial = new THREE.MeshStandardMaterial({
  color: 0xe6e0d2,
  roughness: 1,
  transparent: true,
  opacity: 0.94
});
const faultObstructionShadowMaterial = new THREE.MeshStandardMaterial({
  color: 0xb9b09d,
  roughness: 1,
  transparent: true,
  opacity: 0.78
});
const faultObstruction = new THREE.Group();
faultObstruction.name = '可调挂花与堵花';
faultObstruction.visible = false;

const channelBrushObstruction = new THREE.Group();
channelBrushObstruction.name = '主通道毛笔头挂花';
const brushProfile = [
  { x: -0.25, y: 0.04, scale: 3.7 },
  { x: 0.02, y: 0.08, scale: 4.1 },
  { x: 0.25, y: 0.05, scale: 3.5 },
  { x: -0.16, y: 0.32, scale: 3.2 },
  { x: 0.13, y: 0.36, scale: 3.0 },
  { x: -0.08, y: 0.58, scale: 2.5 },
  { x: 0.07, y: 0.70, scale: 2.2 },
  { x: 0.00, y: 0.88, scale: 1.55 }
];
brushProfile.forEach((profile, index) => {
  const tuft = makeFluffyTuft(
    1200 + index,
    index % 3 === 0 ? faultObstructionShadowMaterial : faultObstructionMaterial
  );
  tuft.position.set(profile.x, profile.y, (index % 2 ? 0.04 : -0.025));
  tuft.scale.setScalar(profile.scale);
  channelBrushObstruction.add(tuft);
});
faultObstruction.add(channelBrushObstruction);

const ductClumpObstruction = makeFluffyTuft(1650, faultObstructionMaterial);
ductClumpObstruction.name = '排杂风道单团堵花';
ductClumpObstruction.scale.set(6.3, 5.2, 5.8);
faultObstruction.add(ductClumpObstruction);
cottonFlow.add(faultObstruction);

const faultImpurity = makeFluffyTuft(1701, redImpurityMaterial, true);
faultImpurity.name = '堵花偏流演示异纤';
faultImpurity.visible = false;

const faultSprayCotton = Array.from({ length: 7 }, (_, index) => {
  const tuft = makeFluffyTuft(1750 + index);
  tuft.name = `故障演示喷出白棉${index + 1}`;
  tuft.visible = false;
  tuft.userData.routeDelay = index * 0.035;
  tuft.userData.routeSide = (index - 3) * 0.014;
  tuft.userData.baseScale = 0.72 + seededUnit(1800 + index) * 0.26;
  return tuft;
});

const valvePulse = new THREE.Group();
const valvePulseMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  emissive: 0xffffff,
  emissiveIntensity: 2.1,
  transparent: true,
  opacity: 0.92
});
for (let index = 0; index < 4; index += 1) {
  const pulsePoint = new THREE.Mesh(new THREE.SphereGeometry(0.013, 10, 8), valvePulseMaterial);
  registerMesh(pulsePoint, '', '', 'flow', false);
  valvePulse.add(pulsePoint);
}
valvePulse.visible = false;
cottonFlow.add(valvePulse);

const airJet = new THREE.Group();
const airJetMaterial = new THREE.MeshBasicMaterial({ color: 0xf5fbff, transparent: true, opacity: 0.78, depthWrite: false });
for (let index = 0; index < 16; index += 1) {
  const particle = new THREE.Mesh(new THREE.SphereGeometry(0.010 + (index % 3) * 0.0025, 8, 6), airJetMaterial);
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
const opticalFlashWhite = new THREE.Color(0xffffff);
let opticalPathMode = 'off';
let opticalTriggerStrength = 0;
let opticalTriggerType = null;
let opticalTriggerIndex = -1;

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

// 正式JWF0019A主体按3.62米展示高度归一化；整线新增设备按厂家3200毫米标称高度同比例换算。
const factoryDisplayScale = 3.62 / 3.20;
const factoryMetric = (meters) => meters * factoryDisplayScale;

const factoryLine = new THREE.Group();
factoryLine.name = 'JWF1124C-JWF0019A-FA151开清棉整线';
machine.add(factoryLine);

const factoryPaint = new THREE.MeshStandardMaterial({ color: 0xd4dcda, roughness: 0.62, metalness: 0.16 });
const factoryPanel = new THREE.MeshStandardMaterial({ color: 0xaeb9b7, roughness: 0.58, metalness: 0.22 });
const factoryAccent = new THREE.MeshStandardMaterial({ color: 0x2d8091, roughness: 0.46, metalness: 0.16 });
const factoryDoorPaint = new THREE.MeshStandardMaterial({ color: 0xe8eeeb, roughness: 0.56, metalness: 0.14 });
const factoryFrameDark = new THREE.MeshStandardMaterial({ color: 0x596361, roughness: 0.50, metalness: 0.28 });
const factoryGreen = new THREE.MeshStandardMaterial({ color: 0x74c534, roughness: 0.48, metalness: 0.08 });
const factoryDuct = new THREE.MeshStandardMaterial({ color: 0xd4dcda, roughness: 0.62, metalness: 0.16 });
const factoryDuctEdge = new THREE.MeshStandardMaterial({ color: 0x879696, roughness: 0.34, metalness: 0.62 });

function addPanelSeams(parent, width, height, z, count) {
  for (let index = 1; index < count; index += 1) {
    box(
      parent,
      [0.012, height, 0.016],
      [-width / 2 + width * index / count, height / 2, z],
      factoryPanel,
      '',
      '',
      'shell'
    );
  }
}

function factoryLocalPoint(group, localPoint) {
  return localPoint.clone().multiply(group.scale).applyEuler(group.rotation).add(group.position);
}

const beaterParams = {
  diameterMm: 800,
  lengthMm: 1910,
  offsetXmm: 50,
  offsetYmm: 90,
  offsetZmm: 0,
  speedRpm: 180
};
let jwf1124BeaterGroup = null;
let jwf1124BeaterCore = null;
const jwf1124BeaterPaddles = [];
const factoryDoorActions = new Map();

function updateFactoryDoorDatasets() {
  const states = {};
  factoryDoorActions.forEach((action, id) => {
    states[id] = action.open ? 'open' : 'closed';
  });
  document.documentElement.dataset.factoryDoors = JSON.stringify(states);
}

function createFactoryDoorAction(id, label) {
  const action = { id, label, open: false, pivots: [] };
  factoryDoorActions.set(id, action);
  updateFactoryDoorDatasets();
  return action;
}

function markFactoryDoorAction(object, actionId) {
  object.userData.factoryDoorAction = actionId;
  return object;
}

function addFactoryDoorPivot(action, pivot, openAngleDeg) {
  action.pivots.push({ pivot, openAngle: THREE.MathUtils.degToRad(openAngleDeg), angle: 0 });
}

function setFactoryDoorOpen(actionId, open) {
  const action = factoryDoorActions.get(actionId);
  if (!action) return;
  action.open = Boolean(open);
  updateFactoryDoorDatasets();
}

function toggleFactoryDoor(actionId) {
  const action = factoryDoorActions.get(actionId);
  if (action) setFactoryDoorOpen(actionId, !action.open);
}

function addDoorHinges(parent, positions) {
  positions.forEach((position) => {
    cylinder(parent, 0.030, 0.18, position, [0, 0, 0], factoryFrameDark, '', '');
  });
}

function buildJwf1124OpposingDoors(group) {
  const action = createFactoryDoorAction('jwf1124-opposing', 'JWF1124侧面对开门');
  const totalWidth = 1.48;
  const gap = 0.028;
  const leafWidth = (totalWidth - gap) / 2;
  const doorHeight = 1.72;
  const centerY = 1.06;
  const surfaceZ = -1.337;
  const leftHingeX = -totalWidth / 2;
  const rightHingeX = totalWidth / 2;

  box(group, [totalWidth + 0.10, 0.035, 0.030], [0, centerY + doorHeight / 2 + 0.040, surfaceZ], factoryFrameDark, '', '');
  box(group, [totalWidth + 0.10, 0.035, 0.030], [0, centerY - doorHeight / 2 - 0.040, surfaceZ], factoryFrameDark, '', '');
  box(group, [0.035, doorHeight, 0.030], [leftHingeX - 0.040, centerY, surfaceZ], factoryFrameDark, '', '');
  box(group, [0.035, doorHeight, 0.030], [rightHingeX + 0.040, centerY, surfaceZ], factoryFrameDark, '', '');
  box(group, [gap, doorHeight, 0.032], [0, centerY, surfaceZ - 0.002], factoryFrameDark, '', '');

  [
    { side: '左', hingeX: leftHingeX, direction: 1, openAngle: 105 },
    { side: '右', hingeX: rightHingeX, direction: -1, openAngle: -105 }
  ].forEach(({ side, hingeX, direction, openAngle }) => {
    const pivot = new THREE.Group();
    pivot.name = `JWF1124侧面${side}门铰链`;
    pivot.position.set(hingeX, centerY, surfaceZ - 0.018);
    group.add(pivot);
    const panelCenterX = direction * leafWidth / 2;
    const panel = roundedBox(
      pivot,
      [leafWidth, doorHeight, 0.040],
      [panelCenterX, 0, -0.020],
      factoryDoorPaint,
      `JWF1124侧面${side}开检修门`,
      '两扇门从中缝向左右相反方向打开。',
      0.018
    );
    markFactoryDoorAction(panel, action.id);
    const handle = roundedBox(
      pivot,
      [0.050, 0.26, 0.075],
      [direction * (leafWidth - 0.090), 0.02, -0.070],
      factoryFrameDark,
      `JWF1124侧面${side}门把手`,
      '点击门板或把手可同时开合两扇对开门。',
      0.014
    );
    markFactoryDoorAction(handle, action.id);
    box(pivot, [leafWidth - 0.08, 0.14, 0.018], [panelCenterX, doorHeight / 2 - 0.12, -0.049], factoryGreen, '', '', 'decal');
    textPlate(
      pivot,
      side === '左' ? 'JWF1124C' : 'JINGWEI',
      leafWidth - 0.10,
      0.15,
      [panelCenterX, 0.36, -0.060],
      46,
      side === '左' ? '#46514f' : '#62aa2a',
      [0, Math.PI, 0]
    );
    addFactoryDoorPivot(action, pivot, openAngle);
    addDoorHinges(group, [
      [hingeX, centerY - 0.55, surfaceZ - 0.070],
      [hingeX, centerY + 0.55, surfaceZ - 0.070]
    ]);
  });
  setFactoryDoorOpen(action.id, false);
}

function buildYzFaceDoor(group, config) {
  const {
    actionId,
    label,
    surfaceX,
    outwardSign,
    centerY,
    centerZ,
    doorWidth,
    doorHeight,
    hingeSide,
    openAngle
  } = config;
  const action = createFactoryDoorAction(actionId, label);
  const hingeZ = centerZ + (hingeSide === 'max' ? doorWidth / 2 : -doorWidth / 2);
  const panelDirection = hingeSide === 'max' ? -1 : 1;
  const pivot = new THREE.Group();
  pivot.name = `${label}铰链`;
  pivot.position.set(surfaceX + outwardSign * 0.018, centerY, hingeZ);
  group.add(pivot);

  box(group, [0.035, 0.035, doorWidth + 0.10], [surfaceX, centerY + doorHeight / 2 + 0.040, centerZ], factoryFrameDark, '', '');
  box(group, [0.035, 0.035, doorWidth + 0.10], [surfaceX, centerY - doorHeight / 2 - 0.040, centerZ], factoryFrameDark, '', '');
  box(group, [0.035, doorHeight, 0.035], [surfaceX, centerY, centerZ - doorWidth / 2 - 0.040], factoryFrameDark, '', '');
  box(group, [0.035, doorHeight, 0.035], [surfaceX, centerY, centerZ + doorWidth / 2 + 0.040], factoryFrameDark, '', '');

  const panelCenterZ = panelDirection * doorWidth / 2;
  const panel = roundedBox(
    pivot,
    [0.040, doorHeight, doorWidth],
    [outwardSign * 0.020, 0, panelCenterZ],
    factoryDoorPaint,
    label,
    '点击门板或把手可独立开合。',
    0.018
  );
  markFactoryDoorAction(panel, action.id);
  const handle = roundedBox(
    pivot,
    [0.075, 0.27, 0.055],
    [outwardSign * 0.070, 0.02, panelDirection * (doorWidth - 0.10)],
    factoryFrameDark,
    `${label}把手`,
    '点击把手可开合检修门。',
    0.014
  );
  markFactoryDoorAction(handle, action.id);
  box(
    pivot,
    [0.018, 0.14, doorWidth - 0.08],
    [outwardSign * 0.049, doorHeight / 2 - 0.12, panelCenterZ],
    factoryGreen,
    '',
    '',
    'decal'
  );
  textPlate(
    pivot,
    label.replace('检修门', ''),
    doorWidth - 0.18,
    0.14,
    [outwardSign * 0.060, 0.36, panelCenterZ],
    38,
    '#46514f',
    [0, outwardSign * Math.PI / 2, 0]
  );
  addDoorHinges(group, [
    [surfaceX + outwardSign * 0.070, centerY - 0.55, hingeZ],
    [surfaceX + outwardSign * 0.070, centerY + 0.55, hingeZ]
  ]);
  addFactoryDoorPivot(action, pivot, openAngle);
  setFactoryDoorOpen(action.id, false);
  return panel;
}

function updateJwf1124Beater() {
  if (!jwf1124BeaterGroup || !jwf1124BeaterCore) return;
  const diameter = Math.max(0.10, beaterParams.diameterMm / 1000);
  const length = Math.max(0.20, beaterParams.lengthMm / 1000);
  jwf1124BeaterGroup.position.set(
    beaterParams.offsetXmm / 1000,
    1.04 + beaterParams.offsetYmm / 1000,
    beaterParams.offsetZmm / 1000
  );
  jwf1124BeaterCore.scale.set(diameter * 0.72, length, diameter * 0.72);
  jwf1124BeaterPaddles.forEach((paddle, index) => {
    const angle = index / jwf1124BeaterPaddles.length * Math.PI * 2;
    paddle.position.set(Math.cos(angle) * diameter * 0.43, 0, Math.sin(angle) * diameter * 0.43);
    paddle.rotation.y = -angle;
    paddle.scale.set(diameter * 0.12, length * 0.96, diameter * 0.06);
  });
}

function buildJwf1124Outline() {
  const group = new THREE.Group();
  group.name = 'JWF1124C-160开棉机轮廓';
  group.rotation.y = -Math.PI / 2;
  group.scale.setScalar(factoryDisplayScale);
  factoryLine.add(group);

  const jwf1124Body = roundedBox(group, [1.664, 2.08, 2.64], [0, 1.04, 0], factoryPaint, 'JWF1124简化方箱主体', '单一主体长方箱；侧面设左右对开门，朝向FA151的宽面另设检修门。', 0.035);
  jwf1124Body.userData.factoryDoorActions = ['jwf1124-opposing', 'jwf1124-fa151-face'];
  textPlate(group, 'JWF1124 开棉机', 1.40, 0.20, [0, 1.55, 1.326], 46, '#3d4b49');
  buildJwf1124OpposingDoors(group);
  buildYzFaceDoor(group, {
    actionId: 'jwf1124-fa151-face',
    label: 'JWF1124朝向FA151宽面检修门',
    surfaceX: 0.842,
    outwardSign: 1,
    centerY: 1.06,
    centerZ: 0,
    doorWidth: 2.30,
    doorHeight: 1.72,
    hingeSide: 'min',
    openAngle: -95
  });

  jwf1124BeaterGroup = new THREE.Group();
  jwf1124BeaterGroup.name = 'JWF1124内部可调打手罗拉';
  jwf1124BeaterGroup.rotation.x = Math.PI / 2;
  group.add(jwf1124BeaterGroup);
  jwf1124BeaterCore = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 1, 32), factoryDuctEdge);
  registerMesh(jwf1124BeaterCore, 'JWF1124打手罗拉', '方箱内部唯一的横向打手罗拉；直径、长度、位置和转速可在整线布局面板调整。', 'internal');
  jwf1124BeaterGroup.add(jwf1124BeaterCore);
  for (let index = 0; index < 8; index += 1) {
    const paddle = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), factoryAccent);
    registerMesh(paddle, '', '', 'internal', false);
    jwf1124BeaterGroup.add(paddle);
    jwf1124BeaterPaddles.push(paddle);
  }
  updateJwf1124Beater();
  return {
    group,
    outletLocal: new THREE.Vector3(0.842, 1.62, 0),
    outletProfileMm: [1910, 70],
    outlet: new THREE.Vector3()
  };
}

let relayFanRotor = null;
const relayFanBladeCount = 9;

function relayFanBladeGeometry() {
  const blade = new THREE.Shape();
  blade.moveTo(0.042, -0.018);
  blade.quadraticCurveTo(0.105, -0.060, 0.206, -0.048);
  blade.quadraticCurveTo(0.234, -0.010, 0.206, 0.032);
  blade.quadraticCurveTo(0.112, 0.064, 0.052, 0.034);
  blade.closePath();
  const geometry = new THREE.ExtrudeGeometry(blade, {
    depth: 0.022,
    bevelEnabled: true,
    bevelSegments: 2,
    bevelSize: 0.005,
    bevelThickness: 0.004,
    curveSegments: 8
  });
  geometry.translate(0, 0, -0.011);
  return geometry;
}

function buildFa151Outline() {
  const group = new THREE.Group();
  group.name = 'FA151除微尘机轮廓';
  group.scale.setScalar(factoryDisplayScale);
  factoryLine.add(group);

  roundedBox(group, [1.864, 2.55, 2.182], [0, 1.31, 0], factoryPaint, 'FA151除微尘机', '按现场沟通保留长方箱主体和进棉接口，删除其余外露圆柱与侧面风机。', 0.055);
  roundedBox(group, [1.70, 0.10, 1.98], [0, 2.59, 0], factoryPanel, '', '', 0.025);
  box(group, [1.70, 1.92, 0.018], [0, 1.66, 1.100], factoryDoorPaint, 'FA151平整白色外观面板', '正面保持平整；进棉口左右两个侧面分别设置检修门。');
  box(group, [1.70, 0.16, 0.026], [0, 2.38, 1.116], factoryGreen, '', '', 'decal');
  box(group, [0.12, 1.72, 0.026], [-0.77, 1.48, 1.116], factoryGreen, '', '', 'decal');
  box(group, [0.66, 0.30, 0.026], [0.28, 0.58, 1.116], factoryFrameDark, '', '', 'decal');
  for (let row = 0; row < 6; row += 1) {
    box(group, [0.58, 0.016, 0.010], [0.28, 0.48 + row * 0.040, 1.132], factoryDoorPaint, '', '', 'decal');
  }
  const inletFanMount = new THREE.Group();
  inletFanMount.position.set(0, 1.26, -1.105);
  group.add(inletFanMount);
  relayFanRotor = new THREE.Group();
  relayFanRotor.name = 'FA151进棉风机模拟叶轮';
  const fanHub = new THREE.Mesh(new THREE.CylinderGeometry(0.058, 0.070, 0.085, 28), factoryDuctEdge);
  fanHub.rotation.x = Math.PI / 2;
  registerMesh(fanHub, 'FA151进棉风机轮毂', '位于进口内部的接力风机轮毂，随九片扇叶同步旋转。', 'internal');
  relayFanRotor.add(fanHub);
  const bladeGeometry = relayFanBladeGeometry();
  for (let index = 0; index < relayFanBladeCount; index += 1) {
    const blade = new THREE.Mesh(bladeGeometry, factoryAccent);
    blade.rotation.z = index / relayFanBladeCount * Math.PI * 2 + 0.10;
    registerMesh(blade, 'FA151进棉风机扇叶', '弯曲扇叶模拟FA151进口接力风机抽吸状态。', 'internal');
    relayFanRotor.add(blade);
  }
  inletFanMount.add(relayFanRotor);
  textPlate(group, 'FA151 除微尘机', 1.30, 0.19, [0.08, 2.13, 1.132], 52, '#46514f');
  textPlate(group, 'JINGWEI', 0.72, 0.13, [0.08, 1.91, 1.132], 44, '#62aa2a');
  textPlate(group, '进棉风机 = 接力风机', 1.18, 0.14, [0.12, 0.90, 1.132], 37, '#53635f');
  buildYzFaceDoor(group, {
    actionId: 'fa151-inlet-left',
    label: 'FA151进棉口左侧检修门',
    surfaceX: -0.943,
    outwardSign: -1,
    centerY: 1.35,
    centerZ: 0,
    doorWidth: 1.82,
    doorHeight: 1.78,
    hingeSide: 'min',
    openAngle: -95
  });
  buildYzFaceDoor(group, {
    actionId: 'fa151-inlet-right',
    label: 'FA151进棉口右侧检修门',
    surfaceX: 0.943,
    outwardSign: 1,
    centerY: 1.35,
    centerZ: 0,
    doorWidth: 1.82,
    doorHeight: 1.78,
    hingeSide: 'max',
    openAngle: -95
  });
  return {
    group,
    inletLocal: new THREE.Vector3(0, 1.26, -1.091),
    inlet: new THREE.Vector3()
  };
}

const jwf1124Outline = buildJwf1124Outline();
const fa151Outline = buildFa151Outline();
const mainFlowCurve = currentFlowCurve();
const mainInletPoint = mainFlowCurve.getPoint(0);
const mainOutletPoint = mainFlowCurve.getPoint(1);
const mainInletTangent = mainFlowCurve.getTangent(0).normalize();
const mainOutletTangent = mainFlowCurve.getTangent(1).normalize();
const upstreamHorizontal = new THREE.Vector3(mainInletTangent.x, 0, mainInletTangent.z).normalize();
const downstreamHorizontal = new THREE.Vector3(mainOutletTangent.x, 0, mainOutletTangent.z).normalize();
if (upstreamHorizontal.lengthSq() < 0.001) upstreamHorizontal.set(0, 0, 1);
if (downstreamHorizontal.lengthSq() < 0.001) downstreamHorizontal.set(0, 0, 1);

const factoryConnectionLayer = new THREE.Group();
factoryConnectionLayer.name = '整线自动连接管路';
factoryLine.add(factoryConnectionLayer);

const factoryLayoutStorageKey = 'jwf0019a-factory-line-layout-v6';
const lineLayoutParams = {
  mainWidthMm: 1910,
  flatHeightMm: 70,
  upstreamOutletDepthMm: 460,
  upstreamOutletHeightMm: 1000,
  upstreamOutletOffsetMm: 0,
  upstreamSlopeAngleDeg: 70,
  upstreamLeadMm: 70,
  upstreamEntryLeadMm: 80,
  ductDiameterMm: 300,
  transitionLengthMm: 1250,
  straightLengthMm: 450,
  slopeAngleDeg: 39.08
};
const userLayoutBaseline = {
  jwf1124: {
    position: [0.02, -0.01015, -2.02],
    rotationDegrees: [0, -90, 0],
    scale: [1.611215, 0.821244, 1.208381]
  },
  fa151: {
    position: [0, -0.13575, 5.84488],
    rotationDegrees: [0, 0, 0],
    scale: [1.389787, 1.378844, 1.187242]
  }
};
jwf1124Outline.group.userData.lineLayoutId = 'jwf1124';
jwf1124Outline.group.userData.nominalDimensions = new THREE.Vector3(1.664, 2.080, 2.640);
fa151Outline.group.userData.lineLayoutId = 'fa151';
fa151Outline.group.userData.nominalDimensions = new THREE.Vector3(1.864, 2.650, 2.182);

function factoryTransformSnapshot(group) {
  return {
    position: group.position.toArray().map((value) => Number(value.toFixed(5))),
    rotationDegrees: [group.rotation.x, group.rotation.y, group.rotation.z]
      .map((value) => Number(THREE.MathUtils.radToDeg(value).toFixed(3))),
    scale: group.scale.toArray().map((value) => Number(value.toFixed(6)))
  };
}

function applyFactoryTransform(group, data) {
  if (!data) return;
  if (Array.isArray(data.position)) group.position.fromArray(data.position);
  if (Array.isArray(data.rotationDegrees)) {
    group.rotation.set(...data.rotationDegrees.map(THREE.MathUtils.degToRad));
  }
  if (Array.isArray(data.scale)) group.scale.fromArray(data.scale);
}

function initialPlaceFactoryMachines() {
  applyFactoryTransform(jwf1124Outline.group, userLayoutBaseline.jwf1124);
  applyFactoryTransform(fa151Outline.group, userLayoutBaseline.fa151);
}

initialPlaceFactoryMachines();
const factoryLayoutDefaults = {
  jwf1124: factoryTransformSnapshot(jwf1124Outline.group),
  fa151: factoryTransformSnapshot(fa151Outline.group),
  params: { ...lineLayoutParams },
  beater: { ...beaterParams }
};

function restoreFactoryLineLayout() {
  try {
    const saved = JSON.parse(localStorage.getItem(factoryLayoutStorageKey) || 'null');
    if (!saved) return;
    applyFactoryTransform(jwf1124Outline.group, saved.jwf1124);
    applyFactoryTransform(fa151Outline.group, saved.fa151);
    Object.keys(lineLayoutParams).forEach((key) => {
      if (Number.isFinite(Number(saved.params?.[key]))) lineLayoutParams[key] = Number(saved.params[key]);
    });
    Object.keys(beaterParams).forEach((key) => {
      if (Number.isFinite(Number(saved.beater?.[key]))) beaterParams[key] = Number(saved.beater[key]);
    });
    updateJwf1124Beater();
  } catch (error) {
    console.warn('整线布局恢复失败，已使用默认位置', error);
  }
}
restoreFactoryLineLayout();

let upstreamProcessCurve = null;
let downstreamProcessCurve = null;
let downstreamTaperCurve = null;
let downstreamRoundCurve = null;
let downstreamTaperFraction = 0;
let upstreamProcessLength = 1;
let downstreamProcessLength = 1;
let downstreamRoundProcessLength = 1;
const upstreamFactoryCottonCount = 72;
const downstreamBaseCottonCount = 96;
const downstreamRoundExtraCottonCount = 96;
let factoryLineAudit = null;

function clearFactoryConnectionGeometry() {
  factoryConnectionLayer.traverse((object) => {
    const selectableIndex = selectable.indexOf(object);
    if (selectableIndex >= 0) selectable.splice(selectableIndex, 1);
    object.geometry?.dispose();
    if (object.material && object.material !== factoryDuct && object.material !== factoryDuctEdge) {
      object.material.map?.dispose();
      object.material.dispose?.();
    }
  });
  factoryConnectionLayer.clear();
}

function rebuildFactoryConnections(syncSlopeFromLayout = true) {
  clearFactoryConnectionGeometry();
  jwf1124Outline.outletLocal.x = lineLayoutParams.upstreamOutletDepthMm / 1000;
  jwf1124Outline.outletLocal.y = lineLayoutParams.upstreamOutletHeightMm / 1000;
  jwf1124Outline.outletLocal.z = lineLayoutParams.upstreamOutletOffsetMm / 1000;
  jwf1124Outline.outlet.copy(factoryLocalPoint(jwf1124Outline.group, jwf1124Outline.outletLocal));
  fa151Outline.inlet.copy(factoryLocalPoint(fa151Outline.group, fa151Outline.inletLocal));

  const jwfOutletDirection = new THREE.Vector3(1, 0, 0)
    .applyEuler(jwf1124Outline.group.rotation)
    .normalize();
  const mainWidth = factoryMetric(lineLayoutParams.mainWidthMm / 1000);
  const flatHeight = factoryMetric(lineLayoutParams.flatHeightMm / 1000);
  const ductDiameter = factoryMetric(lineLayoutParams.ductDiameterMm / 1000);
  const jwfOutletHorizontal = new THREE.Vector3(jwfOutletDirection.x, 0, jwfOutletDirection.z);
  if (jwfOutletHorizontal.lengthSq() < 0.001) jwfOutletHorizontal.copy(upstreamHorizontal);
  jwfOutletHorizontal.normalize();
  const upstreamSlopeRadians = THREE.MathUtils.degToRad(THREE.MathUtils.clamp(lineLayoutParams.upstreamSlopeAngleDeg, 0, 85));
  const upstreamSlopeDirection = jwfOutletHorizontal.clone()
    .multiplyScalar(Math.cos(upstreamSlopeRadians))
    .add(new THREE.Vector3(0, Math.sin(upstreamSlopeRadians), 0))
    .normalize();
  const upstreamStartInside = jwf1124Outline.outlet.clone()
    .addScaledVector(jwfOutletDirection, -factoryMetric(0.04));
  const upstreamEndInside = mainInletPoint.clone()
    .addScaledVector(mainInletTangent, factoryMetric(0.04));
  // 折线路径：水平引出段 → 小圆弧拐角 → 直斜段 → 入口顺直段，贴合长方体直管外观
  const upstreamPolyline = (() => {
    const points = [];
    const horizontalLead = factoryMetric(lineLayoutParams.upstreamLeadMm / 1000);
    const entryLead = factoryMetric(lineLayoutParams.upstreamEntryLeadMm / 1000);
    const start = upstreamStartInside.clone();
    const elbowBase = jwf1124Outline.outlet.clone()
      .addScaledVector(jwfOutletDirection, horizontalLead);
    const cornerRadius = factoryMetric(0.10);
    // 圆弧圆心：水平段末端沿+Y偏移r；在YZ平面从水平(+Z)转到斜向(70°)
    const arcCenter = elbowBase.clone()
      .addScaledVector(new THREE.Vector3(0, 1, 0), cornerRadius);
    const arcStartAngle = 0;
    const arcEndAngle = THREE.MathUtils.degToRad(THREE.MathUtils.clamp(lineLayoutParams.upstreamSlopeAngleDeg, 0, 85));
    const arcSteps = 7;
    // 水平段（含出口内侧缩进点）
    for (let step = 0; step <= 3; step += 1) {
      points.push(start.clone().lerp(elbowBase, step / 3));
    }
    // 圆弧拐角：从水平转到斜向（在YZ平面内绕arcCenter旋转）
    for (let step = 1; step <= arcSteps; step += 1) {
      const angle = arcStartAngle + (arcEndAngle - arcStartAngle) * (step / arcSteps);
      points.push(new THREE.Vector3(
        arcCenter.x,
        arcCenter.y - cornerRadius * Math.cos(angle),
        arcCenter.z + cornerRadius * Math.sin(angle)
      ));
    }
    // 直斜段：从圆弧末端沿斜向延伸到入口顺直段起点
    const elbowEnd = new THREE.Vector3(
      arcCenter.x,
      arcCenter.y - cornerRadius * Math.cos(arcEndAngle),
      arcCenter.z + cornerRadius * Math.sin(arcEndAngle)
    );
    const entryStart = mainInletPoint.clone()
      .addScaledVector(mainInletTangent, -entryLead);
    const slopeSteps = 6;
    for (let step = 1; step <= slopeSteps; step += 1) {
      points.push(elbowEnd.clone().lerp(entryStart, step / slopeSteps));
    }
    // 入口顺直段
    points.push(entryStart.clone().lerp(upstreamEndInside, 0.35));
    points.push(upstreamEndInside);
    return points;
  })();
  upstreamProcessCurve = new THREE.CatmullRomCurve3(upstreamPolyline, false, 'centripetal');
  upstreamProcessLength = upstreamProcessCurve.getLength();
  const upstreamEndpointVector = mainInletPoint.clone().sub(jwf1124Outline.outlet);
  const upstreamEndpointRun = Math.hypot(upstreamEndpointVector.x, upstreamEndpointVector.z);
  const upstreamEndpointAngleDeg = Number(THREE.MathUtils.radToDeg(Math.atan2(
    upstreamEndpointVector.y,
    Math.max(upstreamEndpointRun, 0.001)
  )).toFixed(2));
  const upstreamStartWidth = (jwf1124Outline.outletProfileMm[0] / 1000) * jwf1124Outline.group.scale.z;
  const flowChannelPart = calibrationParts.get('flow-channel-1');
  const channelWidthWorld = flowChannelPart
    ? flowChannelPart.userData.config.dimensions.length * flowChannelPart.scale.x
    : mainWidth;
  const upstreamSections = Array.from({ length: 41 }, (_, index) => ({
    point: upstreamProcessCurve.getPointAt(index / 40),
    width: THREE.MathUtils.lerp(upstreamStartWidth, channelWidthWorld, index / 40),
    height: flatHeight,
    diameter: ductDiameter,
    morph: 0
  }));
  sectionedDuct(
    factoryConnectionLayer,
    upstreamSections,
    factoryDuct,
    `JWF1124至JWF0019A连续${Math.round(lineLayoutParams.mainWidthMm)}×${Math.round(lineLayoutParams.flatHeightMm)}扁管`,
    '斜管宽度、厚度、引出角、引出长度和入口顺直长度均可调整，两端始终伸入接口40毫米消除缝隙。'
  );

  const transitionLength = factoryMetric(lineLayoutParams.transitionLengthMm / 1000);
  const downstreamTransitionEnd = mainOutletPoint.clone().addScaledVector(downstreamHorizontal, transitionLength);
  const downstreamStraightEnd = downstreamTransitionEnd.clone()
    .addScaledVector(downstreamHorizontal, factoryMetric(lineLayoutParams.straightLengthMm / 1000));
  const relayFanInlet = fa151Outline.inlet.clone();
  const downstreamSlopeDirection = relayFanInlet.clone().sub(downstreamStraightEnd).normalize();
  const bendGuide = factoryMetric(0.22);
  downstreamTaperCurve = new THREE.LineCurve3(mainOutletPoint, downstreamTransitionEnd);
  downstreamRoundCurve = new THREE.CatmullRomCurve3([
    downstreamTransitionEnd,
    downstreamTransitionEnd.clone().addScaledVector(downstreamHorizontal, bendGuide),
    downstreamStraightEnd.clone().addScaledVector(downstreamHorizontal, -bendGuide),
    downstreamStraightEnd,
    downstreamStraightEnd.clone().addScaledVector(downstreamSlopeDirection, bendGuide),
    relayFanInlet.clone().addScaledVector(downstreamHorizontal, -bendGuide),
    relayFanInlet.clone().addScaledVector(downstreamHorizontal, factoryMetric(0.04))
  ], false, 'centripetal');
  const downstreamSections = [];
  const transitionWidthAxis = new THREE.Vector3(1, 0, 0)
    .addScaledVector(downstreamHorizontal, -downstreamHorizontal.x);
  if (transitionWidthAxis.lengthSq() < 0.001) transitionWidthAxis.set(0, 0, 1);
  transitionWidthAxis.normalize();
  const transitionSectionCount = 49;
  for (let index = 0; index < transitionSectionCount; index += 1) {
    const progress = index / (transitionSectionCount - 1);
    const shaping = smootherStep01(progress);
    downstreamSections.push({
      point: mainOutletPoint.clone()
        .addScaledVector(downstreamHorizontal, -factoryMetric(0.04))
        .lerp(downstreamTransitionEnd, progress),
      width: THREE.MathUtils.lerp(channelWidthWorld, ductDiameter, shaping),
      height: THREE.MathUtils.lerp(flatHeight, ductDiameter, shaping),
      diameter: ductDiameter,
      morph: shaping,
      shapeExponent: THREE.MathUtils.lerp(12, 2, shaping),
      widthAxis: transitionWidthAxis
    });
  }
  for (let index = 1; index <= 64; index += 1) {
    downstreamSections.push({
      point: downstreamRoundCurve.getPointAt(index / 64),
      width: ductDiameter,
      height: ductDiameter,
      diameter: ductDiameter,
      morph: 1,
      shapeExponent: 2
    });
  }
  sectionedDuct(
    factoryConnectionLayer,
    downstreamSections,
    factoryDuct,
    'JWF0019A至FA151一体式缓变连接管',
    '从JWF0019A的可调宽幅扁口沿缓变段连续收窄至Ø300，再以同一网格连接FA151内部进棉风机口。'
  );

  const downstreamSlopeVector = relayFanInlet.clone().sub(downstreamStraightEnd);
  const actualSlopeDegrees = Number(THREE.MathUtils.radToDeg(Math.atan2(
    Math.abs(downstreamSlopeVector.y),
    Math.hypot(downstreamSlopeVector.x, downstreamSlopeVector.z)
  )).toFixed(2));
  if (syncSlopeFromLayout && Number.isFinite(actualSlopeDegrees)) {
    lineLayoutParams.slopeAngleDeg = actualSlopeDegrees;
  }
  textPlate(factoryConnectionLayer, `${Math.round(lineLayoutParams.mainWidthMm)}×${Math.round(lineLayoutParams.flatHeightMm)}缓变${Math.round(lineLayoutParams.transitionLengthMm)}mm → Ø${Math.round(lineLayoutParams.ductDiameterMm)}`, 1.82, 0.18, [downstreamTransitionEnd.x, mainOutletPoint.y + 0.26, downstreamTransitionEnd.z], 36, '#315c61');
  textPlate(factoryConnectionLayer, `Ø${Math.round(lineLayoutParams.ductDiameterMm)} · 直段${Math.round(lineLayoutParams.straightLengthMm)}mm`, 1.38, 0.18, [downstreamStraightEnd.x, mainOutletPoint.y + 0.26, (downstreamTransitionEnd.z + downstreamStraightEnd.z) / 2], 38, '#315c61');
  textPlate(factoryConnectionLayer, `下倾${actualSlopeDegrees}° · 接FA151进棉风机`, 1.72, 0.18, [relayFanInlet.x, (downstreamStraightEnd.y + relayFanInlet.y) / 2 + 0.30, (downstreamStraightEnd.z + relayFanInlet.z) / 2], 36, '#315c61');

  downstreamProcessCurve = new THREE.CatmullRomCurve3([
    mainOutletPoint,
    downstreamTransitionEnd,
    downstreamStraightEnd,
    relayFanInlet
  ], false, 'centripetal');
  const taperLength = downstreamTaperCurve.getLength();
  const roundLength = downstreamRoundCurve.getLength();
  downstreamProcessLength = taperLength + roundLength;
  downstreamRoundProcessLength = roundLength;
  downstreamTaperFraction = taperLength / Math.max(taperLength + roundLength, 0.001);

  factoryLineAudit = {
    order: ['JWF1124C-160', 'JWF0019A', 'FA151'],
    defaultView: 'line',
    allFixedViewsUseFactoryLine: true,
    allMaterialModesUseFactoryLine: true,
    faultWidthCm: 20,
    faultWidthAdjustable: false,
    processSpeedUi: [0.5, 1, 2],
    processSpeedRates: [0.75, 1.5, 3],
    doorConfiguration: {
      jwf1124OpposingLeafCount: 2,
      jwf1124Fa151FacingDoorCount: 1,
      fa151InletSideDoorCount: 2
    },
    layoutAxis: 'JWF0019A固定；JWF1124与FA151可自由移动、旋转、缩放',
    displayScale: Number(factoryDisplayScale.toFixed(6)),
    nominalMachineDimensionsMm: {
      jwf1124: [1664, 2640, 2080],
      jwf0019a: [1500, 2500, 3200],
      fa151: [1864, 2182, 2650]
    },
    baselineSource: '用户导出的JWF1124-JWF0019A-FA151-整线布局 (1).json',
    jwf1124OutletProfileMm: [Math.round(lineLayoutParams.mainWidthMm), Math.round(lineLayoutParams.flatHeightMm)],
    upstreamDuctProfileMm: [Math.round(lineLayoutParams.mainWidthMm), Math.round(lineLayoutParams.flatHeightMm)],
    upstreamSlopeAngleDeg: Number(lineLayoutParams.upstreamSlopeAngleDeg.toFixed(2)),
    upstreamOutletDepthMm: Math.round(lineLayoutParams.upstreamOutletDepthMm),
    upstreamEndpointAngleDeg,
    upstreamRiseMm: Math.round(upstreamEndpointVector.y / factoryDisplayScale * 1000),
    upstreamRunMm: Math.round(upstreamEndpointRun / factoryDisplayScale * 1000),
    upstreamOutletHeightMm: Math.round(lineLayoutParams.upstreamOutletHeightMm),
    upstreamOutletOffsetMm: Math.round(lineLayoutParams.upstreamOutletOffsetMm),
    upstreamLeadMm: Math.round(lineLayoutParams.upstreamLeadMm),
    upstreamEntryLeadMm: Math.round(lineLayoutParams.upstreamEntryLeadMm),
    upstreamSingleContinuousMesh: true,
    upstreamConnectionGapMm: 0,
    mainOutletProfileMm: [Math.round(lineLayoutParams.mainWidthMm), Math.round(lineLayoutParams.flatHeightMm)],
    roundDuctDiameterMm: Math.round(lineLayoutParams.ductDiameterMm),
    transitionLengthMm: Math.round(lineLayoutParams.transitionLengthMm),
    transitionStartProfileMm: [Math.round(lineLayoutParams.mainWidthMm), Math.round(lineLayoutParams.flatHeightMm)],
    transitionMidProfileMm: [
      Math.round(THREE.MathUtils.lerp(lineLayoutParams.mainWidthMm, lineLayoutParams.ductDiameterMm, 0.5)),
      Math.round(THREE.MathUtils.lerp(lineLayoutParams.flatHeightMm, lineLayoutParams.ductDiameterMm, 0.5))
    ],
    transitionEndProfileMm: [Math.round(lineLayoutParams.ductDiameterMm), Math.round(lineLayoutParams.ductDiameterMm)],
    transitionSectionCount,
    transitionShape: '12次超椭圆连续缓变至正圆',
    transitionFrameMode: '截面坐标平行传递',
    transitionUntwisted: true,
    transitionWidthHeightContinuous: true,
    straightLengthMm: Math.round(lineLayoutParams.straightLengthMm),
    slopeDegrees: actualSlopeDegrees,
    fa151InletGapMm: 0,
    downstreamSingleContinuousMesh: true,
    downstreamConnectionGapMm: 0,
    cottonInletMode: `${Math.round(lineLayoutParams.mainWidthMm)}×${Math.round(lineLayoutParams.flatHeightMm)}宽幅薄层`,
    cottonInletPattern: '确定性随机、无行列网格',
    cottonInletCount: upstreamFactoryCottonCount,
    cottonInletCenterSpanMm: Math.round(lineLayoutParams.mainWidthMm * 0.98 * 0.96),
    cottonDetectionMode: '1.6米宽棉幕',
    cottonOutletMode: '杂乱棉束沿缓变段连续聚集至Ø300',
    cottonOutletContractionContinuous: true,
    cottonOutletBaseCount: downstreamBaseCottonCount,
    cottonRoundExtraCount: downstreamRoundExtraCottonCount,
    cottonRoundDensityRatio: Number(((downstreamBaseCottonCount + downstreamRoundExtraCottonCount) / downstreamBaseCottonCount).toFixed(2)),
    fa151ExternalBlackFlangeRemoved: true,
    fa151ExternalCylinderCount: 0,
    relayFanBladeCount,
    relayFanSimulated: true,
    relayFanHubVisibleInXray: true,
    jwf1124BodyPrimitiveCount: 1,
    jwf1124TopExtraBlockRemoved: true,
    beater: { ...beaterParams },
    beaterAdjustable: ['diameterMm', 'lengthMm', 'offsetXmm', 'offsetYmm', 'offsetZmm', 'speedRpm'],
    pipeAdjustable: ['mainWidthMm', 'flatHeightMm', 'upstreamOutletDepthMm', 'upstreamOutletHeightMm', 'upstreamOutletOffsetMm', 'upstreamSlopeAngleDeg', 'upstreamLeadMm', 'upstreamEntryLeadMm', 'ductDiameterMm', 'transitionLengthMm', 'straightLengthMm', 'slopeAngleDeg'],
    jwf0019InletDirection: mainInletTangent.toArray().map((value) => Number(value.toFixed(3))),
    jwf0019OutletDirection: mainOutletTangent.toArray().map((value) => Number(value.toFixed(3))),
    relayFanInlet: relayFanInlet.toArray().map((value) => Number(value.toFixed(3))),
    fa151Inlet: fa151Outline.inlet.toArray().map((value) => Number(value.toFixed(3))),
    relayFanIdentity: 'FA151内部进棉风机',
    adjustable: true,
    transforms: {
      jwf1124: factoryTransformSnapshot(jwf1124Outline.group),
      fa151: factoryTransformSnapshot(fa151Outline.group)
    }
  };
  window.__factoryLineAudit = factoryLineAudit;
  document.documentElement.dataset.factoryLineAudit = JSON.stringify(factoryLineAudit);
  document.documentElement.dataset.upstreamCottonMode = `wide-sheet-${Math.round(lineLayoutParams.mainWidthMm)}x${Math.round(lineLayoutParams.flatHeightMm)}`;
  document.documentElement.dataset.downstreamCottonMode = 'irregular-gradual-contraction-dense-round-300';
  document.documentElement.dataset.transitionGeometry = 'untwisted-superellipse-parallel-transport';
  document.documentElement.dataset.relayFanBladeCount = String(relayFanBladeCount);
}
rebuildFactoryConnections(false);

const upstreamCottonTufts = Array.from({ length: upstreamFactoryCottonCount }, (_, index) => {
  const tuft = makeFluffyTuft(900 + index);
  tuft.userData.lineOffset = seededUnit(9100 + index * 5.3);
  tuft.userData.sheetLane = -0.88 + seededUnit(9200 + index * 7.1) * 1.76;
  tuft.userData.sheetLayer = -0.72 + seededUnit(9300 + index * 9.7) * 1.44;
  tuft.userData.baseScale = 0.68 + seededUnit(950 + index) * 0.34;
  tuft.userData.wanderPhase = seededUnit(9400 + index * 11.3) * Math.PI * 2;
  return tuft;
});
const downstreamCottonTufts = Array.from({ length: downstreamBaseCottonCount + downstreamRoundExtraCottonCount }, (_, index) => {
  const tuft = makeFluffyTuft(1000 + index);
  tuft.userData.roundOnly = index >= downstreamBaseCottonCount;
  tuft.userData.lineOffset = seededUnit(10100 + index * 5.9);
  tuft.userData.sheetLane = -0.90 + seededUnit(10200 + index * 7.7) * 1.80;
  tuft.userData.sheetLayer = -0.70 + seededUnit(10300 + index * 9.1) * 1.40;
  tuft.userData.radialAngle = seededUnit(10400 + index * 11.9) * Math.PI * 2;
  tuft.userData.radialRadius = Math.sqrt(seededUnit(10500 + index * 13.3)) * 0.82;
  tuft.userData.baseScale = 0.68 + seededUnit(10600 + index) * 0.34;
  tuft.userData.wanderPhase = seededUnit(10700 + index * 15.1) * Math.PI * 2;
  return tuft;
});
document.documentElement.dataset.cottonFlowProfile = 'unified-fluffy-tufts';
document.documentElement.dataset.cottonFlowSpeed = 'shared-world-distance-speed';
document.documentElement.dataset.faultModes = 'channel,duct';
document.documentElement.dataset.faultChannelDefault = 'front-upper-center-20cm';
document.documentElement.dataset.lineLayoutDefault = 'collapsed';

const lineLayoutModeButton = document.querySelector('#line-layout-mode');
const lineLayoutRevealButton = document.querySelector('#line-layout-reveal');
const lineLayoutContent = document.querySelector('#line-layout-content');
const lineLayoutStatus = document.querySelector('#line-layout-status');
const lineLayoutPartSelect = document.querySelector('#line-layout-part');
const lineLayoutTransformButtons = [...document.querySelectorAll('[data-line-transform]')];
const lineLayoutAxisInputs = [...document.querySelectorAll('[data-line-axis]')];
const lineLayoutDimensionInputs = [...document.querySelectorAll('[data-line-dimension]')];
const lineLayoutPipeInputs = [...document.querySelectorAll('[data-line-pipe]')];
const beaterInputs = [...document.querySelectorAll('[data-beater]')];
const lineLayoutLive = document.querySelector('#line-layout-live');
const lineLayoutSave = document.querySelector('#line-layout-save');
const lineLayoutImport = document.querySelector('#line-layout-import');
const lineLayoutImportFile = document.querySelector('#line-layout-import-file');
const lineLayoutExport = document.querySelector('#line-layout-export');
const lineLayoutReset = document.querySelector('#line-layout-reset');
const lineLayoutParts = new Map([
  ['jwf1124', jwf1124Outline.group],
  ['fa151', fa151Outline.group]
]);
let lineLayoutEnabled = false;
let selectedLineLayoutPart = jwf1124Outline.group;
let factoryRebuildFrame = 0;
let factoryRebuildSyncSlope = true;

const lineLayoutTransformControls = new TransformControls(camera, renderer.domElement);
lineLayoutTransformControls.setSize(0.78);
scene.add(lineLayoutTransformControls.getHelper());
lineLayoutTransformControls.getHelper().visible = false;
lineLayoutTransformControls.addEventListener('dragging-changed', (event) => {
  controls.enabled = !event.value;
});

function updateLineLayoutFields() {
  const group = selectedLineLayoutPart;
  lineLayoutAxisInputs.forEach((input) => {
    const axis = input.dataset.lineAxis;
    if (axis === 'scale') input.value = (group.scale.x / factoryDisplayScale).toFixed(3);
    else if (axis.startsWith('position.')) input.value = group.position[axis.split('.')[1]].toFixed(3);
    else input.value = THREE.MathUtils.radToDeg(group.rotation[axis.split('.')[1]]).toFixed(1);
  });
  const nominal = group.userData.nominalDimensions;
  lineLayoutDimensionInputs.forEach((input) => {
    const axis = input.dataset.lineDimension;
    input.value = (nominal[axis] * group.scale[axis] / factoryDisplayScale).toFixed(3);
  });
  lineLayoutPipeInputs.forEach((input) => {
    const key = input.dataset.linePipe;
    input.value = Number(lineLayoutParams[key]).toFixed(key.endsWith('AngleDeg') ? 1 : 0);
  });
  beaterInputs.forEach((input) => {
    input.value = Number(beaterParams[input.dataset.beater]).toFixed(0);
  });
  if (lineLayoutLive && factoryLineAudit) {
    lineLayoutLive.textContent = `1124斜管 ${factoryLineAudit.upstreamDuctProfileMm.join('×')}mm · 出口方向${factoryLineAudit.upstreamSlopeAngleDeg}° / 两端实际${factoryLineAudit.upstreamEndpointAngleDeg}° · 打手Ø${Math.round(beaterParams.diameterMm)}×${Math.round(beaterParams.lengthMm)}mm · 后段下倾${factoryLineAudit.slopeDegrees}°`;
  }
}

function scheduleFactoryConnectionRebuild(syncSlopeFromLayout = true) {
  factoryRebuildSyncSlope = factoryRebuildSyncSlope && syncSlopeFromLayout;
  if (factoryRebuildFrame) return;
  factoryRebuildFrame = requestAnimationFrame(() => {
    factoryRebuildFrame = 0;
    rebuildFactoryConnections(factoryRebuildSyncSlope);
    factoryRebuildSyncSlope = true;
    updateLineLayoutFields();
  });
}

function selectLineLayoutPart(id) {
  selectedLineLayoutPart = lineLayoutParts.get(id) || jwf1124Outline.group;
  lineLayoutPartSelect.value = selectedLineLayoutPart.userData.lineLayoutId;
  if (lineLayoutEnabled) {
    lineLayoutTransformControls.attach(selectedLineLayoutPart);
    lineLayoutTransformControls.getHelper().visible = true;
  }
  updateLineLayoutFields();
}

function setLineLayoutEnabled(enabled) {
  lineLayoutEnabled = enabled;
  lineLayoutModeButton.classList.toggle('active', enabled);
  lineLayoutModeButton.textContent = enabled ? '关闭整线布局调整' : '开启整线布局调整';
  lineLayoutPartSelect.disabled = !enabled;
  [...lineLayoutTransformButtons, ...lineLayoutAxisInputs, ...lineLayoutDimensionInputs, ...lineLayoutPipeInputs, ...beaterInputs, lineLayoutSave, lineLayoutImport, lineLayoutExport, lineLayoutReset]
    .forEach((element) => { element.disabled = !enabled; });
  if (enabled) {
    if (calibrationEnabled) setCalibrationEnabled(false);
    document.querySelector('[data-view="line"]')?.click();
    selectLineLayoutPart(lineLayoutPartSelect.value);
    lineLayoutStatus.textContent = '拖动三轴或输入数值，管路自动跟随';
  } else {
    lineLayoutTransformControls.detach();
    lineLayoutTransformControls.getHelper().visible = false;
    factoryLine.visible = true;
    lineLayoutStatus.textContent = 'JWF0019A固定为基准';
  }
}

function setLineLayoutContentVisible(visible) {
  if (!visible && lineLayoutEnabled) setLineLayoutEnabled(false);
  lineLayoutContent.hidden = !visible;
  lineLayoutRevealButton.classList.toggle('active', visible);
  lineLayoutRevealButton.setAttribute('aria-expanded', String(visible));
  lineLayoutRevealButton.textContent = visible ? '隐藏布局调整' : '显示布局调整';
}

lineLayoutRevealButton.addEventListener('click', () => {
  setLineLayoutContentVisible(lineLayoutContent.hidden);
});

function currentFactoryLayoutData() {
  return {
    version: 2,
    coordinateSystem: { x: '左右', y: '上下', z: '前后' },
    fixedReference: 'JWF0019A',
    jwf1124: factoryTransformSnapshot(jwf1124Outline.group),
    fa151: factoryTransformSnapshot(fa151Outline.group),
    params: { ...lineLayoutParams },
    beater: { ...beaterParams }
  };
}

function applyFactoryLayoutData(data) {
  if (!data || typeof data !== 'object') throw new Error('布局JSON格式不正确');
  applyFactoryTransform(jwf1124Outline.group, data.jwf1124);
  applyFactoryTransform(fa151Outline.group, data.fa151);
  Object.assign(lineLayoutParams, factoryLayoutDefaults.params);
  Object.assign(beaterParams, factoryLayoutDefaults.beater);
  Object.keys(lineLayoutParams).forEach((key) => {
    if (Number.isFinite(Number(data.params?.[key]))) lineLayoutParams[key] = Number(data.params[key]);
  });
  Object.keys(beaterParams).forEach((key) => {
    if (Number.isFinite(Number(data.beater?.[key]))) beaterParams[key] = Number(data.beater[key]);
  });
  updateJwf1124Beater();
  scheduleFactoryConnectionRebuild(false);
}

function alignFa151ToSlopeAngle() {
  const downstreamTransitionEnd = mainOutletPoint.clone()
    .addScaledVector(downstreamHorizontal, factoryMetric(lineLayoutParams.transitionLengthMm / 1000));
  const downstreamStraightEnd = downstreamTransitionEnd.clone()
    .addScaledVector(downstreamHorizontal, factoryMetric(lineLayoutParams.straightLengthMm / 1000));
  const currentInlet = factoryLocalPoint(fa151Outline.group, fa151Outline.inletLocal);
  const angle = THREE.MathUtils.degToRad(THREE.MathUtils.clamp(lineLayoutParams.slopeAngleDeg, 5, 85));
  const verticalDrop = Math.max(0.10, downstreamStraightEnd.y - currentInlet.y);
  const slopeLength = verticalDrop / Math.sin(angle);
  const desiredInlet = downstreamStraightEnd.clone()
    .addScaledVector(downstreamHorizontal, Math.cos(angle) * slopeLength)
    .add(new THREE.Vector3(0, -verticalDrop, 0));
  fa151Outline.group.position.add(desiredInlet.sub(currentInlet));
}

lineLayoutModeButton.addEventListener('click', () => setLineLayoutEnabled(!lineLayoutEnabled));
lineLayoutPartSelect.addEventListener('change', () => selectLineLayoutPart(lineLayoutPartSelect.value));
lineLayoutTransformButtons.forEach((button) => {
  button.addEventListener('click', () => {
    lineLayoutTransformButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    lineLayoutTransformControls.setMode(button.dataset.lineTransform);
  });
});
lineLayoutAxisInputs.forEach((input) => {
  input.addEventListener('input', () => {
    const value = Number(input.value);
    if (!Number.isFinite(value)) return;
    const axis = input.dataset.lineAxis;
    if (axis === 'scale') {
      selectedLineLayoutPart.scale.setScalar(Math.max(0.05, value) * factoryDisplayScale);
    } else if (axis.startsWith('position.')) {
      selectedLineLayoutPart.position[axis.split('.')[1]] = value;
    } else {
      selectedLineLayoutPart.rotation[axis.split('.')[1]] = THREE.MathUtils.degToRad(value);
    }
    scheduleFactoryConnectionRebuild(true);
  });
});
lineLayoutDimensionInputs.forEach((input) => {
  input.addEventListener('input', () => {
    const value = Number(input.value);
    if (!Number.isFinite(value) || value <= 0) return;
    const axis = input.dataset.lineDimension;
    const nominal = selectedLineLayoutPart.userData.nominalDimensions[axis];
    selectedLineLayoutPart.scale[axis] = value / nominal * factoryDisplayScale;
    scheduleFactoryConnectionRebuild(true);
  });
});
lineLayoutPipeInputs.forEach((input) => {
  input.addEventListener('input', () => {
    const value = Number(input.value);
    if (!Number.isFinite(value)) return;
    const key = input.dataset.linePipe;
    lineLayoutParams[key] = value;
    if (key === 'slopeAngleDeg') {
      alignFa151ToSlopeAngle();
      scheduleFactoryConnectionRebuild(false);
    } else {
      scheduleFactoryConnectionRebuild(true);
    }
  });
});
beaterInputs.forEach((input) => {
  input.addEventListener('input', () => {
    const value = Number(input.value);
    if (!Number.isFinite(value)) return;
    beaterParams[input.dataset.beater] = value;
    updateJwf1124Beater();
    rebuildFactoryConnections(false);
    updateLineLayoutFields();
  });
});
lineLayoutTransformControls.addEventListener('objectChange', () => {
  scheduleFactoryConnectionRebuild(true);
});
lineLayoutSave.addEventListener('click', () => {
  localStorage.setItem(factoryLayoutStorageKey, JSON.stringify(currentFactoryLayoutData()));
  lineLayoutStatus.textContent = '布局已保存到本机';
});
lineLayoutImport.addEventListener('click', () => lineLayoutImportFile.click());
lineLayoutImportFile.addEventListener('change', async () => {
  const [file] = lineLayoutImportFile.files;
  if (!file) return;
  try {
    applyFactoryLayoutData(JSON.parse(await file.text()));
    lineLayoutStatus.textContent = `已导入：${file.name}`;
  } catch (error) {
    lineLayoutStatus.textContent = `导入失败：${error.message}`;
  } finally {
    lineLayoutImportFile.value = '';
  }
});
lineLayoutExport.addEventListener('click', () => {
  const blob = new Blob([JSON.stringify(currentFactoryLayoutData(), null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'JWF1124-JWF0019A-FA151-整线布局.json';
  anchor.click();
  URL.revokeObjectURL(url);
  lineLayoutStatus.textContent = '布局JSON已导出';
});
lineLayoutReset.addEventListener('click', () => {
  applyFactoryTransform(jwf1124Outline.group, factoryLayoutDefaults.jwf1124);
  applyFactoryTransform(fa151Outline.group, factoryLayoutDefaults.fa151);
  Object.assign(lineLayoutParams, factoryLayoutDefaults.params);
  Object.assign(beaterParams, factoryLayoutDefaults.beater);
  updateJwf1124Beater();
  scheduleFactoryConnectionRebuild(false);
  lineLayoutStatus.textContent = '已复位到用户JSON基线';
});
selectLineLayoutPart('jwf1124');
factoryLine.visible = true;
document.documentElement.dataset.currentView = currentView;
document.documentElement.dataset.factoryLineVisible = 'true';

function flowChannelWallPoint(part, progress, side = 'rear') {
  const dimensions = part.userData.config.dimensions;
  const localCurve = new THREE.CatmullRomCurve3(flowChannelPathPoints(dimensions), false, 'centripetal');
  const point = localCurve.getPoint(progress);
  const tangent = localCurve.getTangent(progress).normalize();
  const normal = new THREE.Vector3(0, -tangent.z, tangent.y).normalize();
  const wall = Math.min(dimensions.thickness, dimensions.depth / 3, dimensions.length / 20);
  const offset = (dimensions.depth - wall) / 2 * (side === 'rear' ? -1 : 1);
  return partLocalPoint(part, point.add(normal.multiplyScalar(offset)));
}

function lanePoint(curve, progress, lane, width) {
  const point = curve.getPoint(THREE.MathUtils.clamp(progress, 0, 1));
  point.x += lane * width * 0.5;
  return point;
}

function curveSheetPoint(curve, progress, lane, layer, width, thickness) {
  const clampedProgress = THREE.MathUtils.clamp(progress, 0, 1);
  const point = curve.getPointAt(clampedProgress);
  const tangent = curve.getTangentAt(clampedProgress).normalize();
  const widthAxis = new THREE.Vector3(1, 0, 0)
    .addScaledVector(tangent, -tangent.x);
  if (widthAxis.lengthSq() < 0.001) {
    widthAxis.set(0, 0, 1).addScaledVector(tangent, -tangent.z);
  }
  widthAxis.normalize();
  const heightAxis = new THREE.Vector3().crossVectors(tangent, widthAxis).normalize();
  return point
    .addScaledVector(widthAxis, lane * width * 0.5)
    .addScaledVector(heightAxis, layer * thickness * 0.5);
}

function curveOffsetPoint(curve, progress, widthOffset, heightOffset) {
  const clampedProgress = THREE.MathUtils.clamp(progress, 0, 1);
  const point = curve.getPointAt(clampedProgress);
  const tangent = curve.getTangentAt(clampedProgress).normalize();
  const widthAxis = new THREE.Vector3(1, 0, 0)
    .addScaledVector(tangent, -tangent.x);
  if (widthAxis.lengthSq() < 0.001) {
    widthAxis.set(0, 0, 1).addScaledVector(tangent, -tangent.z);
  }
  widthAxis.normalize();
  const heightAxis = new THREE.Vector3().crossVectors(tangent, widthAxis).normalize();
  return point
    .addScaledVector(widthAxis, widthOffset)
    .addScaledVector(heightAxis, heightOffset);
}

function downstreamCottonPoint(progress, tuft, time) {
  const mainWidth = factoryMetric(lineLayoutParams.mainWidthMm / 1000) * 0.98;
  const flatHeight = factoryMetric(lineLayoutParams.flatHeightMm / 1000) * 0.74;
  const roundDiameter = factoryMetric(lineLayoutParams.ductDiameterMm / 1000) * 0.78;
  const phase = tuft.userData.wanderPhase + progress * Math.PI * 5 + time * 0.0008;
  const sheetWidthOffset = tuft.userData.sheetLane * mainWidth * 0.5;
  const sheetHeightOffset = tuft.userData.sheetLayer * flatHeight * 0.5;
  const roundWidthOffset = Math.cos(tuft.userData.radialAngle) * tuft.userData.radialRadius * roundDiameter * 0.5;
  const roundHeightOffset = Math.sin(tuft.userData.radialAngle) * tuft.userData.radialRadius * roundDiameter * 0.5;
  if (progress <= downstreamTaperFraction) {
    const taperProgress = progress / Math.max(downstreamTaperFraction, 0.001);
    const contraction = smootherStep01(taperProgress);
    const turbulence = Math.sin(phase) * roundDiameter * 0.035 * (1 - contraction * 0.72);
    return curveOffsetPoint(
      downstreamTaperCurve,
      taperProgress,
      THREE.MathUtils.lerp(sheetWidthOffset, roundWidthOffset, contraction) + turbulence,
      THREE.MathUtils.lerp(sheetHeightOffset, roundHeightOffset, contraction) + Math.cos(phase * 1.37) * roundDiameter * 0.018
    );
  }
  const roundProgress = (progress - downstreamTaperFraction) / Math.max(1 - downstreamTaperFraction, 0.001);
  return curveOffsetPoint(
    downstreamRoundCurve,
    roundProgress,
    roundWidthOffset + Math.sin(phase) * roundDiameter * 0.018,
    roundHeightOffset + Math.cos(phase * 1.23) * roundDiameter * 0.018
  );
}

function channelFaultLevel(sizeCm = faultSettings.sizeCm) {
  if (sizeCm <= 2) {
    return { label: '基本不影响', driftMeters: 0.002, reachMeters: 0.018, clearanceMeters: 0.002, influenceAfter: 0.09 };
  }
  if (sizeCm <= 5) {
    return { label: '轻度', driftMeters: 0.025, reachMeters: 0.055, clearanceMeters: 0.010, influenceAfter: 0.12 };
  }
  if (sizeCm <= 10) {
    return { label: '中度', driftMeters: 0.065, reachMeters: 0.11, clearanceMeters: 0.020, influenceAfter: 0.16 };
  }
  return { label: '重度', driftMeters: 0.135, reachMeters: 0.16, clearanceMeters: 0.035, influenceAfter: 0.22 };
}

function faultField(width) {
  const centerLane = THREE.MathUtils.clamp((faultSettings.xCm / 100) / Math.max(width * 0.5, 0.01), -0.86, 0.86);
  const sizeMeters = faultSettings.sizeCm / 100;
  if (faultSettings.type === 'duct') {
    return {
      centerLane,
      sizeMeters,
      progress: 0.69,
      driftMeters: 0.285,
      reachMeters: 0.18,
      clearanceMeters: 0.045,
      influenceBefore: 0.24,
      influenceAfter: 0.40,
      label: '局部严重'
    };
  }
  const level = channelFaultLevel();
  return {
    centerLane,
    sizeMeters,
    progress: 0.335,
    driftMeters: level.driftMeters,
    reachMeters: level.reachMeters,
    clearanceMeters: level.clearanceMeters,
    influenceBefore: 0.075,
    influenceAfter: level.influenceAfter,
    label: level.label
  };
}

function faultLaneOffset(lane, progress, width, seed = 0) {
  const field = faultField(width);
  const delta = progress - field.progress;
  if (delta < -field.influenceBefore || delta > field.influenceAfter) return 0;
  const envelope = delta <= 0
    ? THREE.MathUtils.smoothstep(delta, -field.influenceBefore, 0)
    : 1 - THREE.MathUtils.smoothstep(delta, 0, field.influenceAfter);
  const lateralMeters = Math.abs(lane - field.centerLane) * width * 0.5;
  const radius = field.sizeMeters * 0.5;
  const reach = radius + field.reachMeters;
  if (lateralMeters >= reach) return 0;
  const lateralFalloff = 1 - THREE.MathUtils.smoothstep(lateralMeters, radius * 0.55, reach);
  const clearancePush = Math.max(0, radius + field.clearanceMeters - lateralMeters);
  let direction = Math.sign(lane - field.centerLane);
  if (!direction) direction = seededUnit(seed + 177) > 0.5 ? 1 : -1;
  const offsetMeters = direction * (clearancePush + field.driftMeters * lateralFalloff) * envelope;
  return offsetMeters / Math.max(width * 0.5, 0.01);
}

function faultAffectedLane(lane, progress, width, seed = 0) {
  return THREE.MathUtils.clamp(lane + faultLaneOffset(lane, progress, width, seed), -0.96, 0.96);
}

function updateFaultObstruction(curve, width) {
  const field = faultField(width);
  const channelPart = calibrationParts.get('flow-channel-1');
  const isDuct = faultSettings.type === 'duct';
  const position = isDuct
    ? valvePosition(field.centerLane).position.add(new THREE.Vector3(0, -0.10, 0.10))
    : flowChannelWallPoint(channelPart, field.progress, 'front');
  if (!isDuct) position.x += field.centerLane * width * 0.5;
  faultObstruction.position.copy(position);
  channelBrushObstruction.visible = !isDuct;
  ductClumpObstruction.visible = isDuct;
  if (isDuct) {
    faultObstruction.quaternion.identity();
    faultObstruction.rotation.z = -0.08;
    faultObstruction.scale.set(field.sizeMeters, field.sizeMeters * 0.82, field.sizeMeters * 0.72);
  } else {
    const tangent = curve.getTangent(field.progress).normalize();
    faultObstruction.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), tangent);
    const visualSize = Math.max(field.sizeMeters, 0.022);
    faultObstruction.scale.set(visualSize, visualSize * 2.35, visualSize * 0.72);
  }
  faultObstruction.visible = faultDemoPlaying;
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

function addCameraCoveragePath({
  rowId,
  count,
  direction,
  mirrorForIndex,
  mirrorPathForIndex,
  progress,
  targetSide,
  type,
  coverageWidth = 0.30
}) {
  const row = calibrationParts.get(rowId);
  const channel = calibrationParts.get('flow-channel-1');
  if (!row || !channel) return;
  const curve = currentFlowCurve();
  const channelWidth = channel.userData.config.dimensions.length * channel.scale.x;
  const span = count > 1 ? Math.max(0, channelWidth - coverageWidth) : 0;

  for (let index = 0; index < count; index += 1) {
    const target = targetSide
      ? flowChannelWallPoint(channel, progress, targetSide)
      : curve.getPoint(progress);
    target.x += count === 1 ? 0 : (index / (count - 1) - 0.5) * span;
    const source = cameraLensPoint(row, index, count, direction);
    const material = makeOpticalCameraMaterial(index, count, type);
    const mirrorIds = mirrorPathForIndex
      ? mirrorPathForIndex(index)
      : mirrorForIndex
        ? [mirrorForIndex(index)]
        : [];
    const hits = mirrorIds
      .map((mirrorId) => calibrationParts.get(mirrorId))
      .filter(Boolean)
      .map((mirror) => mirrorHitPoint(mirror, target.x));
    const path = [source, ...hits, target];
    const widths = hits.length === 2
      ? [0.025, 0.060, 0.105, coverageWidth]
      : hits.length === 1
        ? [0.025, 0.075, coverageWidth]
        : [0.025, coverageWidth];
    for (let segmentIndex = 0; segmentIndex < path.length - 1; segmentIndex += 1) {
      makeOpticalWedge(
        path[segmentIndex],
        path[segmentIndex + 1],
        widths[segmentIndex],
        widths[segmentIndex + 1],
        material
      );
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
  addCameraCoveragePath({
    rowId: 'magic-cameras', count: 4, direction: 'down', progress: 0.15,
    mirrorPathForIndex: () => [
      'mirror-single-1784558446608',
      'mirror-single-1784558638431'
    ],
    targetSide: 'rear',
    type: 'spirit',
    coverageWidth: 0.60
  });
}

function setOpticalPathState(mode = 'off', trigger = null) {
  opticalTriggerStrength = THREE.MathUtils.clamp(trigger?.strength || 0, 0, 1);
  opticalTriggerType = trigger?.type || null;
  opticalTriggerIndex = Number.isInteger(trigger?.index) ? trigger.index : -1;
  if (mode === 'off') {
    opticalPathMode = 'off';
    opticalPathLayer.visible = false;
    calibrationMaterials.cameraGlass.emissive.setHex(0x000000);
    calibrationMaterials.cameraGlass.emissiveIntensity = 0;
    cameraLensMeshes.forEach((lens) => {
      lens.userData.baseMaterial.emissive.setHex(0x000000);
      lens.userData.baseMaterial.emissiveIntensity = 0;
    });
    return;
  }
  if (!opticalPathLayer.children.length || opticalPathMode !== mode) rebuildOpticalPaths();
  opticalPathMode = mode;
  opticalPathLayer.visible = true;
}

function updateOpticalPathAnimation(time) {
  if (!opticalPathLayer.visible) return;
  opticalCameraMaterials.forEach(({ material, index, type }) => {
    const isTriggeredCamera = type === opticalTriggerType && index === opticalTriggerIndex;
    const flash = isTriggeredCamera ? opticalTriggerStrength : 0;
    material.color.copy(opticalBlue).lerp(opticalFlashWhite, flash * 0.62);
    material.opacity = 0.055 + flash * 0.34;
  });
  cameraLensMeshes.forEach((lens) => {
    const isTriggeredCamera = lens.userData.opticalCameraType === opticalTriggerType
      && lens.userData.opticalCameraIndex === opticalTriggerIndex;
    const flash = isTriggeredCamera ? opticalTriggerStrength : 0;
    const material = lens.userData.baseMaterial;
    material.emissive.copy(opticalBlue).lerp(opticalFlashWhite, flash * 0.72);
    material.emissiveIntensity = 0.16 + flash * 2.10;
  });
}

function quadraticPoint(start, control, end, progress) {
  const oneMinus = 1 - progress;
  return start.clone().multiplyScalar(oneMinus * oneMinus)
    .add(control.clone().multiplyScalar(2 * oneMinus * progress))
    .add(end.clone().multiplyScalar(progress * progress));
}

function rejectRoutePoints(source) {
  // 固定为四段连续路线：阀位向前推出、横向到风机处、斜向到落点上方500毫米、垂直落下。
  const outletDisk = completeModel.getObjectByName('第10轮_出口圆盘_连续低模');
  const funnel = new THREE.Vector3(0.897, 2.347, 0.749);
  if (outletDisk) {
    const diskBounds = new THREE.Box3().setFromObject(outletDisk);
    diskBounds.getCenter(funnel);
    funnel.y = diskBounds.min.y - 0.02;
  }
  const inlet = source.clone().add(new THREE.Vector3(0, 0, 0.30));
  const fanPoint = new THREE.Vector3(funnel.x, inlet.y, inlet.z);
  const horizontalDirection = Math.sign(fanPoint.x - inlet.x) || 1;
  const ductEnd = fanPoint.clone().add(new THREE.Vector3(horizontalDirection * 0.20, 0, 0));
  const shiftedLanding = funnel.clone().add(new THREE.Vector3(horizontalDirection * 0.20, 0, 0));
  const landingAbove = shiftedLanding.clone().add(new THREE.Vector3(0, 0.50, 0));
  const drop = shiftedLanding.clone().add(new THREE.Vector3(0, -0.62, 0));
  return { inlet, fanPoint, ductEnd, landingAbove, funnel, drop };
}

function pointAlongRoute(points, progress) {
  const clamped = THREE.MathUtils.clamp(progress, 0, 1);
  const lengths = [];
  let total = 0;
  for (let index = 1; index < points.length; index += 1) {
    const length = points[index - 1].distanceTo(points[index]);
    lengths.push(length);
    total += length;
  }
  let target = clamped * Math.max(total, 0.0001);
  for (let index = 0; index < lengths.length; index += 1) {
    if (target <= lengths[index] || index === lengths.length - 1) {
      return points[index].clone().lerp(points[index + 1], target / Math.max(lengths[index], 0.0001));
    }
    target -= lengths[index];
  }
  return points[points.length - 1].clone();
}

function valvePosition(lane) {
  const row = calibrationParts.get('valves');
  const index = THREE.MathUtils.clamp(Math.round(((lane + 1) / 2) * 31), 0, 31);
  const ports = Array.from({ length: 4 }, (_, portIndex) => partLocalPoint(
    row,
    new THREE.Vector3((index - 15.5) * 0.072 - 0.024 + portIndex * 0.016, 0.176, 0)
  ));
  const position = ports.reduce((center, port) => center.add(port), new THREE.Vector3()).multiplyScalar(0.25);
  return { index, position, ports };
}

function closestProgressOnFlowCurve(curve, target, lane, width, startProgress, endProgress) {
  let closestProgress = startProgress;
  let closestDistance = Infinity;
  const sampleCount = 160;
  for (let index = 0; index <= sampleCount; index += 1) {
    const progress = THREE.MathUtils.lerp(startProgress, endProgress, index / sampleCount);
    const distance = lanePoint(curve, progress, lane, width).distanceToSquared(target);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestProgress = progress;
    }
  }
  return closestProgress;
}

function progressBeforeFlowDistance(curve, endProgress, distance) {
  let previousPoint = curve.getPoint(endProgress);
  let travelled = 0;
  const step = 0.002;
  for (let progress = endProgress - step; progress >= 0; progress -= step) {
    const point = curve.getPoint(progress);
    travelled += point.distanceTo(previousPoint);
    if (travelled >= distance) return progress;
    previousPoint = point;
  }
  return 0;
}

function cameraIndexForLane(lane, count) {
  return THREE.MathUtils.clamp(Math.floor(((lane + 1) / 2) * count), 0, count - 1);
}

function showValveJet(valve, target, progress) {
  valvePulse.visible = true;
  setValveRowActive(true);
  valvePulse.children.forEach((pulsePoint, index) => {
    pulsePoint.position.copy(valve.ports[index]);
    pulsePoint.scale.setScalar(0.72 + Math.sin(progress * Math.PI * 5) * 0.28);
  });
  airJet.visible = true;
  airJet.children.forEach((particle, index) => {
    const portIndex = index % 4;
    const streamIndex = Math.floor(index / 4);
    const jetProgress = (progress * 1.12 + streamIndex / 4) % 1;
    particle.position.lerpVectors(valve.ports[portIndex], target, jetProgress);
    particle.scale.setScalar(0.55 + (1 - jetProgress) * 0.65);
  });
}

function setValveRowActive(active) {
  const row = calibrationParts.get('valves');
  if (!row) return;
  row.visible = active || calibrationEnabled;
  row.traverse((object) => {
    if (!object.isMesh) return;
    if (active) object.visible = true;
    if (active && object.userData.baseMaterial) {
      if (object.userData.baseMaterial === calibrationMaterials.valveBody) object.material = calibrationMaterials.valveBodyActive;
      else if (object.userData.baseMaterial === calibrationMaterials.valveMetal) object.material = calibrationMaterials.valveMetalActive;
      else if (object.userData.baseMaterial === calibrationMaterials.valveCoil) object.material = calibrationMaterials.valveCoilActive;
      else if (object.userData.baseMaterial === calibrationMaterials.valveNozzle) object.material = calibrationMaterials.valveNozzleActive;
      else if (object.userData.baseMaterial === materials.red) object.material = calibrationMaterials.valveOverrideActive;
      else object.material = object.userData.baseMaterial;
    } else if (!active && object.userData.baseMaterial) {
      object.material = object.userData.baseMaterial;
    }
    object.renderOrder = active ? 80 : 0;
    object.frustumCulled = !active;
    object.material.needsUpdate = true;
  });
}

function updateProcessStatus(text) {
  if (!processStatus || processStatus.textContent === text) return;
  processStatus.textContent = text;
}

function hideNormalImpurityEvents() {
  impurityEvents.forEach((event) => {
    event.tuft.visible = false;
    event.sprayCotton.forEach((tuft) => { tuft.visible = false; });
  });
}

function hideFaultSprayCotton() {
  faultSprayCotton.forEach((tuft) => { tuft.visible = false; });
}

function updateFaultSprayCotton(routePoints, progress) {
  faultSprayCotton.forEach((tuft) => {
    const delayed = progress - tuft.userData.routeDelay;
    if (delayed <= 0 || delayed >= 1) {
      tuft.visible = false;
      return;
    }
    const routeProgress = delayed / (1 - tuft.userData.routeDelay);
    tuft.visible = true;
    tuft.position.copy(pointAlongRoute(routePoints, routeProgress));
    tuft.position.z += tuft.userData.routeSide;
    const fade = Math.min(routeProgress / 0.08, (1 - routeProgress) / 0.12, 1);
    tuft.scale.setScalar(tuft.userData.baseScale * Math.max(0.04, fade));
    tuft.rotation.y += 0.024;
    tuft.rotation.z += 0.016;
  });
}

function updateFaultProcess(time, curve, width) {
  hideNormalImpurityEvents();
  hideFaultSprayCotton();
  updateFaultObstruction(curve, width);
  valvePulse.visible = false;
  airJet.visible = false;
  setValveRowActive(true);

  const field = faultField(width);
  const cycleDuration = 7.0;
  const cycleProgress = ((time / 1000) % cycleDuration) / cycleDuration;
  const sourceLane = THREE.MathUtils.clamp(
    field.centerLane + (field.centerLane > 0.72 ? -0.018 : 0.018),
    -0.90,
    0.90
  );
  const detectionProgress = 0.30;
  const detectedLane = faultAffectedLane(sourceLane, detectionProgress, width, 1901);
  const valve = valvePosition(detectedLane);
  const valveChannelProgress = closestProgressOnFlowCurve(
    curve,
    valve.position,
    detectedLane,
    width,
    detectionProgress,
    0.95
  );
  const preBlowChannelProgress = Math.max(
    detectionProgress + 0.01,
    progressBeforeFlowDistance(curve, valveChannelProgress, 0.05)
  );
  const actualLaneAtValve = faultAffectedLane(sourceLane, valveChannelProgress, width, 1901);
  const actualValveIndex = valvePosition(actualLaneAtValve).index;
  const missCm = Math.round(Math.abs(actualLaneAtValve - detectedLane) * width * 50);
  const hasMeaningfulDrift = faultSettings.type === 'duct' || faultSettings.sizeCm > 2;
  const detectorIndex = cameraIndexForLane(detectedLane, 8);
  const channelProgress = THREE.MathUtils.lerp(0.04, 0.995, cycleProgress);
  const cameraFlash = THREE.MathUtils.smoothstep(channelProgress, 0.285, 0.30)
    * (1 - THREE.MathUtils.smoothstep(channelProgress, 0.315, 0.335));
  setOpticalPathState('process', {
    type: 'front',
    index: detectorIndex,
    strength: cameraFlash
  });

  const preBlowCycle = THREE.MathUtils.clamp((preBlowChannelProgress - 0.04) / 0.955, 0, 1);
  const sprayDuration = 0.085;
  const sprayProgress = THREE.MathUtils.clamp((cycleProgress - preBlowCycle) / sprayDuration, 0, 1);
  const ejectPoint = lanePoint(curve, valveChannelProgress, detectedLane, width);
  const route = rejectRoutePoints(ejectPoint);
  const routePoints = [ejectPoint, route.inlet, route.fanPoint, route.ductEnd, route.landingAbove, route.drop];
  const whiteCottonRouteProgress = THREE.MathUtils.clamp(
    (cycleProgress - preBlowCycle) / Math.max(0.24, 0.97 - preBlowCycle),
    0,
    1
  );
  if (cycleProgress >= preBlowCycle && cycleProgress < 0.98) {
    updateFaultSprayCotton(routePoints, whiteCottonRouteProgress);
  }
  if (cycleProgress >= preBlowCycle && cycleProgress <= preBlowCycle + sprayDuration) {
    showValveJet(valve, route.inlet, sprayProgress);
  }

  faultImpurity.visible = cycleProgress < 0.985;
  faultImpurity.rotation.y += 0.036;
  faultImpurity.rotation.z += 0.022;
  faultImpurity.scale.setScalar(cycleProgress < 0.92 ? 1.16 : Math.max(0.04, (0.985 - cycleProgress) * 15.4));

  let status = faultSettings.type === 'duct'
    ? `排杂风道出现约${faultSettings.sizeCm}厘米局部堵花，对应区域棉流发生严重偏流`
    : `前玻璃上边缘出现${faultSettings.sizeCm}厘米毛笔头挂花`;

  if (channelProgress >= detectionProgress && cycleProgress < preBlowCycle) {
    const currentLane = faultAffectedLane(sourceLane, channelProgress, width, 1901);
    const currentDriftCm = Math.round(Math.abs(currentLane - detectedLane) * width * 50);
    status = `前视${detectorIndex + 1}号相机锁定第${valve.index + 1}号阀；异纤继续上升并局部偏移约${currentDriftCm}厘米`;
  }

  const actualLane = faultAffectedLane(sourceLane, channelProgress, width, 1901);
  if (!hasMeaningfulDrift && cycleProgress >= preBlowCycle) {
    faultImpurity.position.copy(pointAlongRoute(routePoints, whiteCottonRouteProgress));
    status = '约1厘米挂花基本不影响棉流，异纤仍由对应电磁阀准确喷出';
  } else {
    faultImpurity.position.copy(lanePoint(curve, channelProgress, actualLane, width));
    if (cycleProgress >= preBlowCycle && cycleProgress <= preBlowCycle + sprayDuration) {
      status = `第${valve.index + 1}号阀仍按原位置喷射，只喷走附近白棉；异纤已漂到第${actualValveIndex + 1}号附近`;
    } else if (cycleProgress > preBlowCycle + sprayDuration) {
      status = `白棉已从原阀位喷出，异纤偏移约${missCm}厘米后漏过并继续进入后道`;
    }
  }
  updateProcessStatus(status);
}

function applyUnifiedCottonState(tuft, progress) {
  const fade = Math.min(progress / 0.07, (1 - progress) / 0.08, 1);
  tuft.scale.setScalar(tuft.userData.baseScale * Math.max(0.05, fade));
  tuft.rotation.y += 0.010;
  tuft.rotation.z += 0.004;
}

function updateCottonProcess(time) {
  const curve = currentFlowCurve();
  const channelPart = calibrationParts.get('flow-channel-1');
  const width = channelPart.userData.config.dimensions.length * channelPart.scale.x;
  const mainProgress = time * 0.000145;
  const travelDistance = mainProgress * curve.getLength();
  const upstreamProgress = travelDistance / Math.max(upstreamProcessLength, 0.001);
  const downstreamProgress = travelDistance / Math.max(downstreamProcessLength, 0.001);
  const roundProgress = travelDistance / Math.max(downstreamRoundProcessLength, 0.001);

  whiteCottonTufts.forEach((tuft, index) => {
    const progress = (mainProgress + tuft.userData.flowOffset) % 1;
    const lane = faultDemoPlaying
      ? faultAffectedLane(tuft.userData.lane, progress, width, index + 2100)
      : tuft.userData.lane;
    tuft.position.copy(lanePoint(curve, progress, lane, width));
    applyUnifiedCottonState(tuft, progress);
  });

  upstreamCottonTufts.forEach((tuft) => {
    const progress = (upstreamProgress + tuft.userData.lineOffset) % 1;
    const wanderingLane = tuft.userData.sheetLane + Math.sin(tuft.userData.wanderPhase + time * 0.0007) * 0.028;
    const wanderingLayer = tuft.userData.sheetLayer + Math.cos(tuft.userData.wanderPhase * 1.31 + time * 0.0009) * 0.08;
    tuft.position.copy(curveSheetPoint(
      upstreamProcessCurve,
      progress,
      wanderingLane,
      wanderingLayer,
      factoryMetric(lineLayoutParams.mainWidthMm / 1000) * 0.98,
      factoryMetric(lineLayoutParams.flatHeightMm / 1000) * 0.74
    ));
    applyUnifiedCottonState(tuft, progress);
  });

  downstreamCottonTufts.forEach((tuft) => {
    const loopProgress = ((tuft.userData.roundOnly ? roundProgress : downstreamProgress) + tuft.userData.lineOffset) % 1;
    const progress = tuft.userData.roundOnly
      ? downstreamTaperFraction + loopProgress * (1 - downstreamTaperFraction)
      : loopProgress;
    tuft.position.copy(downstreamCottonPoint(
      progress,
      tuft,
      time
    ));
    const localLoopProgress = tuft.userData.roundOnly ? loopProgress : progress;
    applyUnifiedCottonState(tuft, localLoopProgress);
  });

  if (relayFanRotor) {
    relayFanRotor.rotation.z -= processDemoPlaying || faultDemoPlaying ? 0.24 : 0.035;
    document.documentElement.dataset.relayFanRotation = relayFanRotor.rotation.z.toFixed(3);
  }
  if (jwf1124BeaterGroup) {
    jwf1124BeaterGroup.rotation.y = -time * Math.max(0, beaterParams.speedRpm) * Math.PI * 2 / 60000;
    document.documentElement.dataset.jwf1124BeaterRotation = jwf1124BeaterGroup.rotation.y.toFixed(3);
  }

  valvePulse.visible = false;
  airJet.visible = false;
  if (faultDemoPlaying) {
    updateFaultProcess(time, curve, width);
    return;
  }
  hideFaultSprayCotton();
  faultObstruction.visible = false;
  faultImpurity.visible = false;
  if (!processDemoPlaying && opticalPathMode === 'scan') {
    impurityEvents.forEach((event) => {
      event.tuft.visible = false;
      event.sprayCotton.forEach((tuft) => { tuft.visible = false; });
    });
    setOpticalPathState('scan', 0.58);
    updateProcessStatus('16台主相机持续扫描：前视直射，后视经反光镜折射覆盖通道');
    return;
  }
  let activeStatus = '正常棉流：JWF1124送入 → JWF0019A检测 → FA151进棉风机接力抽吸';
  const cycleDuration = 52;
  const impurityDuration = 7.4;
  const voiceCycleIndex = Math.floor(time / (cycleDuration * 1000));
  if (processDemoPlaying && voiceCycleIndex !== processVoiceCycleIndex) {
    processVoiceCycleIndex = voiceCycleIndex;
    playedProcessVoiceCues.clear();
    queueProcessVoiceCue(`第${voiceCycleIndex + 1}轮棉流进入主通道`, 'intake');
  }
  const cycleSeconds = (time / 1000) % cycleDuration;
  let activeCameraTrigger = null;
  fluorescentWhiteImpurityMaterial.emissiveIntensity = 0.38;
  if (processDemoPlaying && time >= 2500) queueProcessVoiceCue('扫描透明检测窗', 'scan');

  impurityEvents.forEach((event, eventIndex) => {
    const elapsed = (cycleSeconds - event.start + cycleDuration) % cycleDuration;
    const active = elapsed < impurityDuration;
    event.tuft.visible = active;
    event.sprayCotton.forEach((tuft) => { tuft.visible = false; });
    if (!active) return;

    const progress = elapsed / impurityDuration;
    const detectionProgress = event.detector === 'spirit' ? 0.15 : 0.30;
    const valve = valvePosition(event.lane);
    const valveChannelProgress = closestProgressOnFlowCurve(
      curve,
      valve.position,
      event.lane,
      width,
      detectionProgress,
      0.95
    );
    const preBlowChannelProgress = Math.max(
      detectionProgress + 0.01,
      progressBeforeFlowDistance(curve, valveChannelProgress, 0.05)
    );
    // 相机在检测点闪烁；异纤随后连续上飘，距真实阀位50毫米预吹，到达阀位后横向喷出。
    const ejectPoint = lanePoint(curve, valveChannelProgress, event.lane, width);
    const route = rejectRoutePoints(ejectPoint);
    event.tuft.rotation.y += 0.035;
    event.tuft.rotation.z += 0.021;
    event.tuft.scale.setScalar(1.08);
    const detectorCount = event.detector === 'spirit' ? 4 : 8;
    const detectorIndex = cameraIndexForLane(event.lane, detectorCount);
    const triggerIn = THREE.MathUtils.smoothstep(progress, 0.20, 0.24);
    const triggerOut = 1 - THREE.MathUtils.smoothstep(progress, 0.26, 0.30);
    const eventTrigger = triggerIn * triggerOut;
    if (eventTrigger > 0.001 && (!activeCameraTrigger || eventTrigger > activeCameraTrigger.strength)) {
      activeCameraTrigger = {
        type: event.detector,
        index: detectorIndex,
        strength: eventTrigger
      };
    }
    if (event.fluorescent) {
      fluorescentWhiteImpurityMaterial.emissiveIntensity = 0.38 + eventTrigger * 2.45;
    }

    if (progress < 0.25) {
      const channelProgress = 0.04 + (progress / 0.25) * (detectionProgress - 0.04);
      event.tuft.position.copy(lanePoint(curve, channelProgress, event.lane, width));
      if (progress > 0.20) {
        const detectorLabel = event.detector === 'spirit'
          ? `精灵眼${detectorIndex + 1}号相机`
          : `${event.detector === 'front' ? '前视' : '后视'}${detectorIndex + 1}号相机`;
        activeStatus = `${detectorLabel}的淡蓝光幕识别到${event.label}，提前锁定第${valve.index + 1}号电磁阀`;
        if (eventIndex === 0) queueProcessVoiceCue('识别第一处异纤', 'detect');
      }
      return;
    }

    if (progress < 0.40) {
      const approachProgress = (progress - 0.25) / 0.15;
      const channelProgress = THREE.MathUtils.lerp(detectionProgress, preBlowChannelProgress, approachProgress);
      event.tuft.position.copy(lanePoint(curve, channelProgress, event.lane, width));
      if (event.fluorescent) fluorescentWhiteImpurityMaterial.emissiveIntensity = 0.72;
      activeStatus = `${event.label}已被识别，继续随棉流向第${valve.index + 1}号电磁阀移动`;
      return;
    }

    if (progress < 0.43) {
      const preBlowProgress = (progress - 0.40) / 0.03;
      const channelProgress = THREE.MathUtils.lerp(preBlowChannelProgress, valveChannelProgress, preBlowProgress);
      event.tuft.position.copy(lanePoint(curve, channelProgress, event.lane, width));
      showValveJet(valve, route.inlet, preBlowProgress);
      activeStatus = `${event.label}接近第${valve.index + 1}号电磁阀，4个喷孔提前开启`;
      return;
    }

    if (progress < 0.49) {
      if (eventIndex === 0) queueProcessVoiceCue('第一次喷射排杂', 'eject');
      const ejectProgress = (progress - 0.43) / 0.06;
      const control = ejectPoint.clone().lerp(route.inlet, 0.5);
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
      showValveJet(valve, route.inlet, ejectProgress);
      activeStatus = `第${valve.index + 1}号电磁阀“噗”地喷射：${event.label}连同周围白棉进入排杂风道`;
      return;
    }

    if (eventIndex === 0) queueProcessVoiceCue('第一次风机吸杂', 'suction');
    const suctionProgress = (progress - 0.49) / 0.34;
    if (suctionProgress >= 1) {
      event.tuft.visible = false;
      event.sprayCotton.forEach((tuft) => { tuft.visible = false; });
      return;
    }
    const pathProgress = THREE.MathUtils.clamp(suctionProgress / 0.72, 0, 1);
    const dropProgress = THREE.MathUtils.clamp((suctionProgress - 0.72) / 0.28, 0, 1);
    const routePath = [route.inlet, route.fanPoint, route.ductEnd, route.landingAbove];
    event.tuft.position.copy(suctionProgress < 0.72
      ? pointAlongRoute(routePath, pathProgress)
      : route.landingAbove.clone().lerp(route.drop, dropProgress));
    event.tuft.scale.setScalar(Math.max(0.02, 1.08 * (1 - dropProgress)));
    event.sprayCotton.forEach((tuft, index) => {
      const offset = new THREE.Vector3(tuft.userData.sprayOffset * (1 - dropProgress), 0, 0);
      tuft.position.copy(suctionProgress < 0.72
        ? pointAlongRoute(routePath, pathProgress)
        : route.landingAbove.clone().lerp(route.drop, dropProgress)).add(offset);
      tuft.visible = true;
      tuft.scale.setScalar(Math.max(0.02, tuft.userData.baseScale * (1 - dropProgress)));
      tuft.rotation.y += 0.032;
    });
    activeStatus = suctionProgress < 0.72
      ? `排杂风机将${event.label}和伴随白棉横向送到风机处，再斜向送到落点上方500毫米`
      : `${event.label}和伴随白棉从落点上方垂直落下并消失，其余白棉继续通过`;
  });

  if (processDemoPlaying) {
    setOpticalPathState('process', activeCameraTrigger);
  }

  updateProcessStatus(activeStatus);
}

const grid = new THREE.GridHelper(8, 24, 0xaab8ae, 0xcfd8d1);
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
  window.__lastPick = {
    faceIndex: hit.faceIndex,
    objectName: hit.object.name,
    shellColorId: hit.object.userData.shellColorId,
    partName: hit.object.userData.name
  };
  if (calibrationEnabled && hit.object.userData.calibrationId) {
    selectCalibrationPart(hit.object.userData.calibrationId);
    return;
  }
  if (hit.object.userData.factoryDoorAction) toggleFactoryDoor(hit.object.userData.factoryDoorAction);
  if (hit.object.userData.factoryDoorActions) {
    hit.object.userData.factoryDoorActions.forEach((actionId) => toggleFactoryDoor(actionId));
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

// 只显示正式GLB；旧程序化草模保留给代码历史，但任何模式都不再显示。
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
  top: [0.01, 8.2, 0.01],
  line: [10.5, 5.8, 9.0]
};
const lineInspectionViews = {
  isoRight: [10.5, 5.8, 9.0],
  isoLeft: [-10.5, 5.8, 9.0],
  front: [0, 3.4, 12.5],
  rear: [0, 3.4, -12.5],
  left: [-12.5, 3.4, 1.10],
  right: [12.5, 3.4, 1.10],
  top: [0.01, 13.5, 1.10],
  line: [10.5, 5.8, 9.0]
};

function updateViewZoom() {
  const amount = Number(document.querySelector('#explode')?.value || 0) / 100;
  const baseZoom = currentView === 'top' ? 0.24 : 0.46;
  camera.zoom = Math.max(currentView === 'top' ? 0.17 : 0.36, baseZoom * (1 - amount * 0.30));
  camera.updateProjectionMatrix();
}

document.querySelectorAll('[data-view]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-view]').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    currentView = button.dataset.view;
    factoryLine.visible = true;
    document.documentElement.dataset.currentView = currentView;
    document.documentElement.dataset.factoryLineVisible = 'true';
    camera.position.set(...lineInspectionViews[button.dataset.view]);
    camera.up.set(0, button.dataset.view === 'top' ? 0 : 1, button.dataset.view === 'top' ? -1 : 0);
    updateViewZoom();
    controls.target.set(0, 2.05, 1.10);
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
  document.documentElement.dataset.currentMode = mode;
  document.querySelectorAll('[data-mode]').forEach((button) => {
    button.classList.toggle('active', button.dataset.mode === mode);
  });
  machine.traverse((object) => {
    if (!object.isMesh || !object.userData.baseMaterial) return;
    const role = object.userData.role;
    if (role === 'calibration') {
      const calibrationId = object.userData.calibrationId;
      const calibrationKind = calibrationParts.get(calibrationId)?.userData.config.kind;
      const isPresentationShell = calibrationId === 'flow-channel-1'
        || calibrationKind === 'cover'
        || calibrationKind === 'heatsink';
      const isGlassWindow = /透明检测窗/.test(object.userData.name || '');
      if (mode === 'wireframe' && isPresentationShell) object.material = modeMaterials.wireShell;
      else if (mode === 'xray' && isPresentationShell) {
        object.material = isGlassWindow ? modeMaterials.xrayWindow : modeMaterials.xrayCalibrationShell;
      } else object.material = object.userData.baseMaterial;
      object.visible = true;
      object.castShadow = mode !== 'xray';
      object.renderOrder = mode === 'xray' && isPresentationShell ? (isGlassWindow ? 12 : 9) : 0;
      return;
    }
    if (role === 'flow' || role === 'indicator') {
      object.material = object.userData.baseMaterial;
      object.visible = true;
      object.castShadow = role === 'indicator' && mode !== 'xray';
      return;
    }
    if (role === 'decal') {
      object.material = object.userData.baseMaterial;
      object.visible = mode === 'solid' || object.userData.componentNumberLabel === true;
      return;
    }
    object.visible = true;
    if (mode === 'solid') object.material = object.userData.baseMaterial;
    if (mode === 'clay') object.material = role === 'internal' ? modeMaterials.clayInternal : modeMaterials.clayShell;
    if (mode === 'wireframe') object.material = role === 'internal' ? modeMaterials.wireInternal : modeMaterials.wireShell;
    if (mode === 'xray') object.material = role === 'internal' ? modeMaterials.xrayInternal : modeMaterials.xrayShell;
    object.castShadow = mode === 'solid' || mode === 'clay';
  });
  factoryLine.visible = true;
  document.documentElement.dataset.factoryLineVisible = 'true';
  if (processDemoPlaying || faultDemoPlaying) setValveRowActive(true);
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
  intake: ['进棉阶段', 'JWF1124方箱内的打手罗拉开松棉层，棉花沿宽度、厚度和斜上角可调的扁管进入JWF0019A。'],
  detect: ['视觉检测', '正面8台、背面8台主相机覆盖1.6米机幅；背面另有4台精灵眼相机。'],
  compute: ['算力判别', '10个算力盒子位于精灵眼背部，最外侧是银白色密集散热片；拆解时按实际前后层级展开。'],
  eject: ['喷射与后送', '异纤由32位喷阀吹入排杂风道；正常棉流沿可调缓变段连续收拢至Ø300，再进入FA151进棉风机。']
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
  setLayerVisible('shell', false);
  updateCalibrationPartVisibility('external');
  setValveRowActive(false);

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
    if (faultDemoPlaying) setFaultDemo(false);
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
  if (faultDemoPlaying) setFaultDemo(false);
  document.querySelector('#tour-play').textContent = '暂停演示';
  setTourStep(tourSteps[currentTourIndex]);
  tourTimer = window.setInterval(() => {
    currentTourIndex = (currentTourIndex + 1) % tourSteps.length;
    setTourStep(tourSteps[currentTourIndex]);
  }, 2400);
});

function updateFaultControlLabels() {
  const level = faultSettings.type === 'duct' ? '局部严重' : channelFaultLevel().label;
  faultXValue.textContent = faultSettings.xCm === 0
    ? '中间'
    : `${faultSettings.xCm < 0 ? '左' : '右'}${Math.abs(faultSettings.xCm)}厘米`;
  faultLevelOutput.textContent = `${faultSettings.type === 'duct' ? '排杂风道' : '主通道'} · ${level}`;
}

function setFaultDemo(enabled) {
  faultDemoPlaying = enabled;
  faultPlay.classList.toggle('active', enabled);
  faultPlay.textContent = enabled ? '暂停堵花偏流' : '播放堵花偏流';
  cottonFlow.visible = enabled;
  processStatus.hidden = !enabled;
  if (enabled) {
    if (processDemoPlaying) setProcessDemo(false);
    processTimelineMs = 0;
    stopProcessVoice();
    stopTour();
    if (calibrationEnabled) setCalibrationEnabled(false);
    applyMode('xray');
    updateCalibrationPartVisibility('process');
    setValveRowActive(true);
    setFlowChannelPlaybackAppearance(true);
    setExternalModulesGhosted(true);
    setOpticalPathState('process', 0);
    setLayerVisible('hunyuan', importedModelReady);
    setLayerVisible('shell', false);
    faultObstruction.visible = true;
    faultImpurity.visible = true;
    partTitle.textContent = '堵花偏流故障演示';
    partDetail.textContent = faultSettings.type === 'duct'
      ? '排杂风道挂花造成局部严重偏流。'
      : '前玻璃上边缘挂花造成主通道局部棉流偏移。';
  } else {
    faultObstruction.visible = false;
    faultImpurity.visible = false;
    hideFaultSprayCotton();
    valvePulse.visible = false;
    airJet.visible = false;
    setValveRowActive(false);
    updateCalibrationPartVisibility('external');
    applyMode('solid');
    setFlowChannelPlaybackAppearance(false);
    setExternalModulesGhosted(false);
    setOpticalPathState('off');
  }
}

document.querySelectorAll('[data-fault-type]').forEach((button) => {
  button.addEventListener('click', () => {
    faultSettings.type = button.dataset.faultType;
    faultSettings.sizeCm = 20;
    document.documentElement.dataset.faultWidthCm = '20';
    document.querySelectorAll('[data-fault-type]').forEach((item) => {
      item.classList.toggle('active', item === button);
    });
    processTimelineMs = 0;
    updateFaultControlLabels();
  });
});

faultXInput.addEventListener('input', () => {
  faultSettings.xCm = Number(faultXInput.value);
  updateFaultControlLabels();
});
faultPlay.addEventListener('click', () => setFaultDemo(!faultDemoPlaying));
updateFaultControlLabels();

function setProcessDemo(enabled) {
  if (enabled && faultDemoPlaying) setFaultDemo(false);
  processDemoPlaying = enabled;
  processPlay.classList.toggle('active', enabled);
  processPlay.textContent = enabled ? '暂停工作原理' : '播放工作原理';
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
    setLayerVisible('shell', false);
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
    processPlaybackRate = Number(button.dataset.processRate) || 1.5;
    document.documentElement.dataset.activeProcessSpeed = button.dataset.processSpeed;
    document.documentElement.dataset.activeProcessPlaybackRate = String(processPlaybackRate);
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

function setExplodePresentation(active) {
  if (active === explodePresentationActive) return;
  explodePresentationActive = active;
  if (active) {
    if (processDemoPlaying) setProcessDemo(false);
    if (faultDemoPlaying) setFaultDemo(false);
    modeBeforeExplode = currentMode;
    applyMode('xray');
    updateCalibrationPartVisibility('all');
    setFlowChannelPlaybackAppearance(true);
  } else {
    applyMode(modeBeforeExplode);
    updateCalibrationPartVisibility('external');
    setFlowChannelPlaybackAppearance(false);
  }
}

function explodeStageLabel(amount) {
  if (amount <= 0) return '整机';
  if (amount < 0.20) return '拆开罩板';
  if (amount < 0.38) return '外移银白散热片';
  if (amount < 0.62) return '展开相机与10个算力盒';
  if (amount < 0.82) return '展开电磁阀组';
  return '完整拆解';
}

function updateExplode() {
  const amount = Number(explodeSlider.value) / 100;
  explodeValue.textContent = `${explodeSlider.value}% · ${explodeStageLabel(amount)}`;
  setExplodePresentation(amount > 0);
  if (modelAnimationMixer && modelAnimationDuration) {
    setModelAnimationTime(modelAnimationDuration * amount);
    completeModel.updateMatrixWorld(true);
  }
  explodeItems.forEach(({ object, base, direction, distance, start = 0, end = 1 }) => {
    const rawProgress = THREE.MathUtils.clamp((amount - start) / Math.max(0.001, end - start), 0, 1);
    const progress = rawProgress * rawProgress * (3 - 2 * rawProgress);
    object.position.copy(base).addScaledVector(direction, progress * distance);
  });
  updateViewZoom();
}
explodeSlider.addEventListener('input', () => {
  stopDismantle();
  dismantleProgress = Number(explodeSlider.value);
  updateExplode();
});
dismantlePlay.addEventListener('click', () => {
  if (dismantlePlaying) {
    stopDismantle();
    return;
  }
  if (Number(explodeSlider.value) >= 100) {
    explodeSlider.value = 0;
    if (modelAnimationMixer && modelAnimationDuration) setModelAnimationTime(0);
    updateExplode();
  }
  dismantleProgress = Number(explodeSlider.value);
  if (modelAnimationMixer && modelAnimationDuration) {
    setModelAnimationTime(modelAnimationDuration * (Number(explodeSlider.value) / 100));
  }
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
  const factoryDoorAngles = {};
  factoryDoorActions.forEach((action, actionId) => {
    action.pivots.forEach((record, index) => {
      const targetDoorAngle = action.open ? record.openAngle : 0;
      const doorBlend = Math.min(1, deltaSeconds * 7.5);
      record.angle = THREE.MathUtils.lerp(record.angle, targetDoorAngle, doorBlend);
      if (Math.abs(record.angle - targetDoorAngle) < 0.0005) record.angle = targetDoorAngle;
      record.pivot.rotation.y = record.angle;
      factoryDoorAngles[`${actionId}-${index + 1}`] = Number(THREE.MathUtils.radToDeg(record.angle).toFixed(1));
    });
  });
  document.documentElement.dataset.factoryDoorAngles = JSON.stringify(factoryDoorAngles);
  if (dismantlePlaying) {
    if (modelAnimationMixer && modelAnimationActions.length) {
      modelAnimationMixer.update(deltaSeconds);
      dismantleProgress = Math.min(100, (modelAnimationMixer.time / modelAnimationDuration) * 100);
    } else {
      dismantleProgress = Math.min(100, dismantleProgress + deltaSeconds * 12);
    }
    explodeSlider.value = Math.round(dismantleProgress);
    updateExplode();
    if (Number(explodeSlider.value) >= 100) stopDismantle();
  }
  if (cottonFlow.visible) {
    if (processDemoPlaying || faultDemoPlaying) processTimelineMs += deltaSeconds * 1000 * processPlaybackRate;
    updateCottonProcess(processDemoPlaying || faultDemoPlaying ? processTimelineMs : time);
  }
  updateOpticalPathAnimation(time);
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();
