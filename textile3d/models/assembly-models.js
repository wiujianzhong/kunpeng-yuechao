import * as THREE from 'three';

const metal=(color=0x758789,rough=.38)=>new THREE.MeshStandardMaterial({color,roughness:rough,metalness:.72});
const dark=()=>new THREE.MeshStandardMaterial({color:0x1d2b2c,roughness:.55,metalness:.42});
const green=()=>new THREE.MeshStandardMaterial({color:0x70ad47,roughness:.36,metalness:.55});
const brass=()=>new THREE.MeshStandardMaterial({color:0xb99b5c,roughness:.34,metalness:.7});

function mesh(group,geometry,material,x=0,y=0,z=0){
  const object=new THREE.Mesh(geometry,material);object.position.set(x,y,z);group.add(object);return object;
}

function component(parent,name,closedY,explodeY,build){
  const group=new THREE.Group();group.name=name;group.userData.closedY=closedY;group.userData.explodeY=explodeY;build(group);parent.add(group);return group;
}

function radialStruts(group,radius,y,count=6){
  for(let i=0;i<count;i++){
    const angle=i*Math.PI*2/count;
    const strut=mesh(group,new THREE.BoxGeometry(radius*.8,.12,.16),metal(0x596d6f),Math.cos(angle)*radius*.42,y,Math.sin(angle)*radius*.42);
    strut.rotation.y=-angle;
  }
}

function coilingDisk(){
  const root=new THREE.Group();
  const components=[];

  const base=component(root,'3 圈条盘结合件',-1.55,-.6,group=>{
    mesh(group,new THREE.CylinderGeometry(2.05,2.15,.24,72),metal(0x5d7072),0,-.45,0);
    mesh(group,new THREE.CylinderGeometry(1.86,2.0,.56,72),metal(0x7b8b8c),0,-.12,0);
    mesh(group,new THREE.CylinderGeometry(.62,.72,1.18,56),metal(0x65787a),0,.48,0);
    mesh(group,new THREE.CylinderGeometry(.32,.32,.58,48),dark(),0,1.12,0);
    radialStruts(group,1.72,.16,7);
  });components.push(base);

  const casing=component(root,'6 平皮带盘',-.55,-.2,group=>{
    mesh(group,new THREE.CylinderGeometry(1.72,1.96,.18,72),green(),0,-.37,0);
    mesh(group,new THREE.CylinderGeometry(1.58,1.76,.64,72),metal(0x819294),0,0,0);
    mesh(group,new THREE.TorusGeometry(1.58,.12,18,72),metal(0x54686a),0,.32,0).rotation.x=Math.PI/2;
  });components.push(casing);

  const hub=component(root,'7 心轴',.02,.65,group=>{
    mesh(group,new THREE.CylinderGeometry(1.12,1.2,.18,64),metal(0x697d7f),0,-.3,0);
    mesh(group,new THREE.CylinderGeometry(.9,1.04,.62,64),metal(0x8c9a9b),0,.05,0);
    mesh(group,new THREE.CylinderGeometry(.48,.48,.72,56),dark(),0,.16,0);
  });components.push(hub);

  const lowerClip=component(root,'23 下挡圈',.48,1.45,group=>{
    const clip=mesh(group,new THREE.TorusGeometry(1.18,.045,12,72),brass());clip.rotation.x=Math.PI/2;
  });components.push(lowerClip);

  const bearing=component(root,'25 轴承',.62,2.15,group=>{
    const outer=mesh(group,new THREE.TorusGeometry(1.16,.25,22,80),metal(0xadb7b4,.22));outer.rotation.x=Math.PI/2;
    const inner=mesh(group,new THREE.TorusGeometry(.72,.1,18,64),dark());inner.rotation.x=Math.PI/2;
    for(let i=0;i<18;i++){
      const angle=i*Math.PI*2/18;
      mesh(group,new THREE.SphereGeometry(.08,16,10),brass(),Math.cos(angle)*.93,0,Math.sin(angle)*.93);
    }
  });components.push(bearing);

  const upperClip=component(root,'24 上挡圈',.82,2.85,group=>{
    const clip=mesh(group,new THREE.TorusGeometry(1.02,.045,12,72),brass());clip.rotation.x=Math.PI/2;
  });components.push(upperClip);

  const frame=component(root,'5 安装板',1.22,3.65,group=>{
    mesh(group,new THREE.BoxGeometry(3.9,.18,1.18),metal(0x6b7e80),0,0,0);
    mesh(group,new THREE.BoxGeometry(1.08,.2,2.2),metal(0x758789),1.42,-.02,0).rotation.y=-.34;
    for(const [x,z] of [[-1.86,-.42],[-1.86,.42],[1.92,-.58],[1.92,.58]]){
      mesh(group,new THREE.CylinderGeometry(.2,.24,.2,36),dark(),x,-.2,z);
      mesh(group,new THREE.CylinderGeometry(.1,.1,.42,30),metal(0xa8b2af,.22),x,-.42,z);
    }
    for(const x of [-1.2,0,1.15])for(const z of [-.36,.36])mesh(group,new THREE.CylinderGeometry(.035,.035,.22,18),brass(),x,.14,z);
  });components.push(frame);

  const nozzle=component(root,'8 喂条嘴（下）与中心件',1.52,4.7,group=>{
    mesh(group,new THREE.CylinderGeometry(.11,.11,.78,32),metal(0xb6bfbc,.2),0,-.28,0);
    mesh(group,new THREE.CylinderGeometry(.2,.16,.32,32),brass(),0,.25,0);
    const shape=new THREE.Shape();shape.moveTo(-.34,-.12);shape.quadraticCurveTo(0,.42,.38,.1);shape.lineTo(.22,-.2);shape.quadraticCurveTo(0,.06,-.22,-.22);shape.closePath();
    const geometry=new THREE.ExtrudeGeometry(shape,{depth:.22,bevelEnabled:true,bevelSize:.025,bevelThickness:.025,bevelSegments:2});geometry.center();
    const mouth=mesh(group,geometry,dark(),0,.55,0);mouth.rotation.x=-.35;
  });components.push(nozzle);

  const sideDrive=component(root,'1/2/4 弹性调节座、张紧轮、调节板',.35,1.2,group=>{
    mesh(group,new THREE.CylinderGeometry(.28,.34,.42,36),metal(0x687b7d),-2.45,-.25,.15);
    mesh(group,new THREE.CylinderGeometry(.13,.13,1.25,32),metal(0xaab4b1,.2),-2.45,.52,.15);
    const rod=mesh(group,new THREE.CylinderGeometry(.055,.055,1.55,24),metal(0xb6bfbc,.2),-3.25,.22,.15);rod.rotation.z=Math.PI/2;
    mesh(group,new THREE.BoxGeometry(.55,.18,.36),green(),-1.98,-.56,.15);
  });components.push(sideDrive);

  const axisMaterial=new THREE.MeshBasicMaterial({color:0x70ad47,transparent:true,opacity:.36});
  mesh(root,new THREE.CylinderGeometry(.018,.018,9.4,12),axisMaterial,0,2.05,0);

  root.userData.setExplode=value=>{
    const amount=THREE.MathUtils.clamp(Number(value)||0,0,1);
    components.forEach(item=>{item.position.y=THREE.MathUtils.lerp(item.userData.closedY,item.userData.explodeY,amount)});
    root.userData.explode=amount;
  };
  root.userData.setExplode(.76);
  root.scale.setScalar(.72);
  root.position.y=-.5;
  return root;
}

export function createAssemblyModel(assembly){
  if(assembly.model==='coilingDisk')return coilingDisk();
  throw new Error(`尚未实现总成模型：${assembly.code}`);
}
