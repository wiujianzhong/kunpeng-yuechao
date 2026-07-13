import * as THREE from 'three';

const materialFactories={
  paintedMetal:()=>new THREE.MeshStandardMaterial({color:0x77898a,roughness:.56,metalness:.42}),
  metal:()=>new THREE.MeshStandardMaterial({color:0x929f9d,roughness:.48,metalness:.62}),
  darkMetal:()=>new THREE.MeshStandardMaterial({color:0x334345,roughness:.6,metalness:.46}),
  rubber:()=>new THREE.MeshStandardMaterial({color:0x171d1d,roughness:.9,metalness:0}),
  plastic:()=>new THREE.MeshStandardMaterial({color:0x657674,roughness:.66,metalness:.05}),
  glass:()=>new THREE.MeshPhysicalMaterial({color:0xa9dddd,transparent:true,opacity:.46,roughness:.12,metalness:0,transmission:.38}),
  brass:()=>new THREE.MeshStandardMaterial({color:0xb99a59,roughness:.5,metalness:.58})
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

function loftGeometry(primitive){
  const sections=primitive.sections;
  const pointCount=sections[0].points.length;
  const vertices=[];
  const triangle=(a,b,c)=>vertices.push(...a,...b,...c);
  const point=(section,index)=>[section.x,section.points[index][0],section.points[index][1]];
  for(let sectionIndex=0;sectionIndex<sections.length-1;sectionIndex++){
    const current=sections[sectionIndex],next=sections[sectionIndex+1];
    for(let index=0;index<pointCount;index++){
      const following=(index+1)%pointCount;
      const a=point(current,index),b=point(current,following),c=point(next,following),d=point(next,index);
      triangle(a,b,c);triangle(a,c,d);
    }
  }
  const cap=(section,reverse=false)=>{
    const center=[section.x,section.points.reduce((sum,item)=>sum+item[0],0)/pointCount,section.points.reduce((sum,item)=>sum+item[1],0)/pointCount];
    for(let index=0;index<pointCount;index++){
      const following=(index+1)%pointCount,a=point(section,index),b=point(section,following);
      if(reverse)triangle(center,b,a);else triangle(center,a,b);
    }
  };
  if(primitive.capStart)cap(sections[0],true);
  if(primitive.capEnd)cap(sections.at(-1));
  const geometry=new THREE.BufferGeometry();
  geometry.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();
  return geometry;
}

function dualInletDuctGeometry(primitive){
  const segments=Math.max(24,primitive.segments||48);
  const steps=Math.max(4,primitive.steps||12);
  const inletStartX=primitive.inletStartX;
  const transitionStartX=primitive.transitionStartX;
  const transitionEndX=primitive.transitionEndX;
  const outletEndX=primitive.outletEndX;
  const offset=primitive.inletCenterOffset;
  const inletRadius=primitive.inletRadius;
  const outletRadius=primitive.outletRadius;
  const thickness=primitive.thickness;
  const vertices=[];
  const addTriangle=(a,b,c)=>vertices.push(...a,...b,...c);
  const connect=(a,b,reverse=false)=>{
    for(let index=0;index<segments;index++){
      const next=(index+1)%segments;
      if(reverse){addTriangle(a[index],b[next],a[next]);addTriangle(a[index],b[index],b[next])}
      else{addTriangle(a[index],a[next],b[next]);addTriangle(a[index],b[next],b[index])}
    }
  };
  const closeRim=(outer,inner)=>{
    for(let index=0;index<segments;index++){
      const next=(index+1)%segments;
      addTriangle(outer[index],inner[next],outer[next]);
      addTriangle(outer[index],inner[index],inner[next]);
    }
  };
  const circle=(x,centerY,radius,branch=1)=>Array.from({length:segments},(_,index)=>{
    const angle=Math.PI*2*index/segments;
    return[x,centerY+branch*Math.sin(angle)*radius,Math.cos(angle)*radius];
  });
  const dShape=(x,branch,radius)=>Array.from({length:segments},(_,index)=>{
    const ratio=index/segments;
    if(ratio<.5){const angle=Math.PI*2*ratio;return[x,branch*Math.sin(angle)*radius,Math.cos(angle)*radius]}
    const lineRatio=(ratio-.5)*2;
    return[x,0,-radius+lineRatio*radius*2];
  });
  const interpolateRing=(from,to,ratio)=>from.map((point,index)=>[
    THREE.MathUtils.lerp(point[0],to[index][0],ratio),
    THREE.MathUtils.lerp(point[1],to[index][1],ratio),
    THREE.MathUtils.lerp(point[2],to[index][2],ratio),
  ]);
  for(const branch of [1,-1]){
    const centerY=branch*offset;
    const tubeOuterStart=circle(inletStartX,centerY,inletRadius,branch);
    const tubeOuterEnd=circle(transitionStartX,centerY,inletRadius,branch);
    const tubeInnerStart=circle(inletStartX,centerY,inletRadius-thickness,branch);
    const tubeInnerEnd=circle(transitionStartX,centerY,inletRadius-thickness,branch);
    connect(tubeOuterStart,tubeOuterEnd);
    connect(tubeInnerStart,tubeInnerEnd,true);
    closeRim(tubeOuterStart,tubeInnerStart);
    const outerTarget=dShape(transitionEndX,branch,outletRadius);
    const innerTarget=dShape(transitionEndX,branch,outletRadius-thickness);
    let previousOuter=tubeOuterEnd;
    let previousInner=tubeInnerEnd;
    for(let step=1;step<=steps;step++){
      const ratio=step/steps;
      const nextOuter=interpolateRing(tubeOuterEnd,outerTarget,ratio);
      const nextInner=interpolateRing(tubeInnerEnd,innerTarget,ratio);
      connect(previousOuter,nextOuter);
      connect(previousInner,nextInner,true);
      previousOuter=nextOuter;
      previousInner=nextInner;
    }
  }
  for(const side of [1,-1]){
    const startZ=side*inletRadius;
    const endZ=side*outletRadius;
    const upperStart=[transitionStartX,offset+inletRadius,startZ];
    const lowerStart=[transitionStartX,-offset-inletRadius,startZ];
    const upperEnd=[transitionEndX,outletRadius,endZ];
    const lowerEnd=[transitionEndX,-outletRadius,endZ];
    addTriangle(lowerStart,lowerEnd,upperEnd);
    addTriangle(lowerStart,upperEnd,upperStart);
  }
  const outletOuterStart=circle(transitionEndX,0,outletRadius);
  const outletOuterEnd=circle(outletEndX,0,outletRadius);
  const outletInnerStart=circle(transitionEndX,0,outletRadius-thickness);
  const outletInnerEnd=circle(outletEndX,0,outletRadius-thickness);
  connect(outletOuterStart,outletOuterEnd);
  connect(outletInnerStart,outletInnerEnd,true);
  closeRim(outletOuterEnd,outletInnerEnd);
  const geometry=new THREE.BufferGeometry();
  geometry.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();
  return geometry;
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
  }else if(kind==='dualInletDuct')geometry=dualInletDuctGeometry(primitive);
  else if(kind==='loft')geometry=loftGeometry(primitive);
  else throw new Error(`不支持的3D图元：${kind}`);
  const meshMaterial=material(primitive.material||defaultMaterial);
  if(primitive.doubleSided)meshMaterial.side=THREE.DoubleSide;
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
