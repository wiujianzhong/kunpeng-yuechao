import * as THREE from 'three';

const materialFactories={
  paintedMetal:()=>new THREE.MeshStandardMaterial({color:0x7f9192,roughness:.38,metalness:.58}),
  metal:()=>new THREE.MeshStandardMaterial({color:0x9ca9a7,roughness:.3,metalness:.82}),
  darkMetal:()=>new THREE.MeshStandardMaterial({color:0x334345,roughness:.44,metalness:.66}),
  rubber:()=>new THREE.MeshStandardMaterial({color:0x171d1d,roughness:.9,metalness:0}),
  plastic:()=>new THREE.MeshStandardMaterial({color:0x657674,roughness:.66,metalness:.05}),
  glass:()=>new THREE.MeshPhysicalMaterial({color:0xa9dddd,transparent:true,opacity:.46,roughness:.12,metalness:0,transmission:.38}),
  brass:()=>new THREE.MeshStandardMaterial({color:0xb99a59,roughness:.34,metalness:.72})
};

function material(name){return (materialFactories[name]||materialFactories.paintedMetal)()}
function radians(value){return Math.abs(value)>Math.PI*2?THREE.MathUtils.degToRad(value):value}
function applyTransform(mesh,primitive){
  if(primitive.position)mesh.position.fromArray(primitive.position);
  if(primitive.rotation)mesh.rotation.set(...primitive.rotation.map(radians));
  return mesh;
}

function polygonPath(points,PathClass=THREE.Shape){
  if(!Array.isArray(points)||points.length<3)throw new Error('拉伸轮廓至少需3个点');
  const path=new PathClass();
  path.moveTo(points[0][0],points[0][1]);
  points.slice(1).forEach(point=>path.lineTo(point[0],point[1]));
  path.closePath();
  return path;
}

function extrudeGeometry(primitive){
  const shape=polygonPath(primitive.points);
  for(const hole of primitive.holes||[]){
    if(hole.kind==='circle'){
      const path=new THREE.Path();
      path.absarc(hole.center[0],hole.center[1],hole.radius,0,Math.PI*2,false);
      shape.holes.push(path);
    }else if(hole.kind==='polygon')shape.holes.push(polygonPath(hole.points,THREE.Path));
  }
  const bevel=primitive.bevel;
  const geometry=new THREE.ExtrudeGeometry(shape,{
    depth:primitive.depth,
    bevelEnabled:Boolean(bevel),
    bevelSize:typeof bevel==='number'?bevel:Math.min(primitive.depth*.08,2),
    bevelThickness:typeof bevel==='number'?bevel:Math.min(primitive.depth*.08,2),
    bevelSegments:bevel?2:1
  });
  geometry.translate(0,0,-primitive.depth/2);
  return geometry;
}

function cylinderGeometry(primitive){
  const radius=primitive.radius;
  return new THREE.CylinderGeometry(
    primitive.radiusTop??radius,
    primitive.radiusBottom??radius,
    primitive.length,
    primitive.segments||48
  );
}

function primitiveMesh(primitive,defaultMaterial){
  const kind=primitive.kind||primitive.type;
  let geometry;
  if(kind==='box')geometry=new THREE.BoxGeometry(...primitive.size);
  else if(kind==='extrude')geometry=extrudeGeometry(primitive);
  else if(kind==='cylinder')geometry=cylinderGeometry(primitive);
  else if(kind==='lathe')geometry=new THREE.LatheGeometry(primitive.points.map(point=>new THREE.Vector2(point[0],point[1])),primitive.segments||64);
  else if(kind==='torus')geometry=new THREE.TorusGeometry(primitive.radius,primitive.tube,primitive.radialSegments||18,primitive.tubularSegments||64);
  else if(kind==='tube'){
    const curve=new THREE.CatmullRomCurve3(primitive.points.map(point=>new THREE.Vector3(...point)));
    geometry=new THREE.TubeGeometry(curve,primitive.segments||Math.max(48,primitive.points.length*16),primitive.radius,primitive.radialSegments||16,false);
  }else throw new Error(`不支持的3D图元：${kind}`);
  const meshMaterial=material(primitive.material||defaultMaterial);
  if(kind==='lathe'&&primitive.flatShading!==false)meshMaterial.flatShading=true;
  const mesh=new THREE.Mesh(geometry,meshMaterial);
  applyTransform(mesh,primitive);
  if(kind==='cylinder'){
    if(primitive.axis==='x')mesh.rotation.z+=Math.PI/2;
    else if(primitive.axis==='z')mesh.rotation.x+=Math.PI/2;
  }
  return mesh;
}

function normalizeForViewer(group){
  const box=new THREE.Box3().setFromObject(group);
  const sourceSize=box.getSize(new THREE.Vector3());
  const center=box.getCenter(new THREE.Vector3());
  const scale=3.65/Math.max(sourceSize.x,sourceSize.y,sourceSize.z,1);
  group.scale.setScalar(scale);
  group.position.copy(center).multiplyScalar(-scale);
  group.userData.sourceSizeMm=sourceSize.toArray();
  group.userData.sourceCenterMm=center.toArray();
  return group;
}

export function createSpecModel(spec){
  if(!spec||!Array.isArray(spec.primitives)||!spec.primitives.length)throw new Error('零件缺少3D建模规格');
  const group=new THREE.Group();
  spec.primitives.forEach(primitive=>group.add(primitiveMesh(primitive,spec.material)));
  group.userData.modelLevel=spec.level;
  group.userData.modelSource=spec.source;
  return normalizeForViewer(group);
}
