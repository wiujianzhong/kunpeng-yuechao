import * as THREE from 'three';

const metal=(color=0x758789,rough=.38)=>new THREE.MeshStandardMaterial({color,roughness:rough,metalness:.72});
const dark=()=>new THREE.MeshStandardMaterial({color:0x1d2b2c,roughness:.55,metalness:.42});
const green=()=>new THREE.MeshStandardMaterial({color:0x70ad47,roughness:.36,metalness:.55});
const brass=()=>new THREE.MeshStandardMaterial({color:0xb99b5c,roughness:.34,metalness:.7});
const rubber=()=>new THREE.MeshStandardMaterial({color:0x151b1b,roughness:.9,metalness:0});
const glass=()=>new THREE.MeshPhysicalMaterial({color:0xa9dddd,transparent:true,opacity:.42,roughness:.12,metalness:0,transmission:.32});

function mesh(group,geometry,material,x=0,y=0,z=0){
  const object=new THREE.Mesh(geometry,material);object.position.set(x,y,z);group.add(object);return object;
}

function component(parent,name,closedY,explodeY,build){
  const group=new THREE.Group();group.name=name;group.userData.closedY=closedY;group.userData.explodeY=explodeY;build(group);parent.add(group);return group;
}

function component3D(parent,name,closed,exploded,build){
  const group=new THREE.Group();group.name=name;
  group.userData.closed=new THREE.Vector3(...closed);
  group.userData.exploded=new THREE.Vector3(...exploded);
  build(group);parent.add(group);return group;
}

function radialStruts(group,radius,y,count=6){
  for(let i=0;i<count;i++){
    const angle=i*Math.PI*2/count;
    const strut=mesh(group,new THREE.BoxGeometry(radius*.8,.12,.16),metal(0x596d6f),Math.cos(angle)*radius*.42,y,Math.sin(angle)*radius*.42);
    strut.rotation.y=-angle;
  }
}

function openerProduct(){
  const root=new THREE.Group();
  const components=[];

  const frame=component3D(root,'1 机架部件',[0,0,0],[0,-.35,-.35],group=>{
    for(const y of [-1.65,1.65]){
      for(const z of [-2.08,2.08])mesh(group,new THREE.BoxGeometry(6.15,.16,.16),metal(0x596d6f),0,y,z);
      for(const x of [-3,3])mesh(group,new THREE.BoxGeometry(.16,.16,4.16),metal(0x596d6f),x,y,0);
    }
    for(const x of [-3,3])for(const z of [-2.08,2.08])mesh(group,new THREE.BoxGeometry(.16,3.3,.16),metal(0x627678),x,0,z);
    mesh(group,new THREE.BoxGeometry(6,.12,4),metal(0x718385),0,-1.56,0);
    mesh(group,new THREE.BoxGeometry(6,3.12,.11),metal(0x7c8c8d),0,0,-2.02);
    mesh(group,new THREE.BoxGeometry(.11,3.12,4),metal(0x7c8c8d),-2.92,0,0);
    for(let i=0;i<11;i++)mesh(group,new THREE.BoxGeometry(5.65,.07,.18),metal(0x879596),0,1.76,-1.55+i*.31);
    for(const x of [-2.7,2.7])mesh(group,new THREE.BoxGeometry(.16,2.8,.16),metal(0x526668),x,-.05,2.13);
    for(const y of [-1.4,1.22])mesh(group,new THREE.BoxGeometry(5.55,.16,.16),metal(0x526668),0,y,2.13);
    for(const x of [-2.65,2.65])for(const z of [-1.75,1.75])mesh(group,new THREE.BoxGeometry(.44,.18,.52),dark(),x,-1.78,z);
  });components.push(frame);

  const dedust=component3D(root,'2 除尘部件',[0,-.55,-.15],[0,-3.2,-.55],group=>{
    for(const x of [-1.45,1.45]){
      const chute=mesh(group,new THREE.BoxGeometry(2.25,.18,1.6),metal(0x6c7f81),x,0,0);chute.rotation.x=-.24;
      mesh(group,new THREE.BoxGeometry(2.05,.8,.12),metal(0x596d6f),x,-.42,.68);
    }
    const shaft=mesh(group,new THREE.CylinderGeometry(.2,.2,5.1,36),metal(0x9ba7a5,.22),0,.15,-.45);shaft.rotation.z=Math.PI/2;
  });components.push(dedust);

  const feed=component3D(root,'3 给棉部件',[0,.78,.48],[-2.9,.35,3.25],group=>{
    for(const [y,z,r] of [[.18,-.32,.24],[-.18,.28,.2]]){
      const roller=mesh(group,new THREE.CylinderGeometry(r,r,4.85,48),metal(0x829294),0,y,z);roller.rotation.z=Math.PI/2;
    }
    for(const x of [-2.5,2.5])mesh(group,new THREE.BoxGeometry(.2,1.05,1.05),metal(0x53686a),x,0,0);
  });components.push(feed);

  const beater=component3D(root,'4 打手部件',[0,.25,-.55],[2.95,.55,3.25],group=>{
    const body=mesh(group,new THREE.CylinderGeometry(.55,.55,4.8,64),metal(0x627678),0,0,0);body.rotation.z=Math.PI/2;
    for(let i=0;i<8;i++){
      const angle=i*Math.PI/4;
      const rail=mesh(group,new THREE.BoxGeometry(4.65,.08,.12),metal(0x9ca8a6,.24),0,Math.cos(angle)*.58,Math.sin(angle)*.58);rail.rotation.x=angle;
    }
    for(const x of [-2.55,2.55]){const pin=mesh(group,new THREE.CylinderGeometry(.17,.17,.42,32),brass(),x,0,0);pin.rotation.z=Math.PI/2}
  });components.push(beater);

  const waste=component3D(root,'5 排杂部件（两组）',[0,-.45,.95],[0,-2.85,3.3],group=>{
    for(const x of [-1.65,1.65]){
      mesh(group,new THREE.BoxGeometry(2.45,1.45,.88),metal(0x748688),x,0,0);
      const mouth=mesh(group,new THREE.CylinderGeometry(.42,.62,.62,4),dark(),x,.7,0);mouth.rotation.y=Math.PI/4;
    }
  });components.push(waste);

  const safety=component3D(root,'6 安全罩部件',[3.06,0,0],[5.25,.25,1.1],group=>{
    mesh(group,new THREE.BoxGeometry(.16,3.15,4.05),metal(0x849394),0,0,0);
    for(const z of [-1.82,1.82])mesh(group,new THREE.BoxGeometry(.28,3.15,.12),metal(0x526668),-.04,0,z);
    mesh(group,new THREE.BoxGeometry(.28,.18,.48),dark(),.14,.05,1.15);
  });components.push(safety);

  const coupling=component3D(root,'7 联接部件',[0,-.1,2.2],[2.95,-.65,4.35],group=>{
    for(const [x,y,r] of [[-1.55,.65,.34],[0,.2,.48],[1.65,-.65,.36]]){
      const pulley=mesh(group,new THREE.CylinderGeometry(r,r,.26,48),metal(0x596d6f),x,y,0);pulley.rotation.x=Math.PI/2;
      const hub=mesh(group,new THREE.CylinderGeometry(r*.35,r*.35,.42,32),brass(),x,y,0);hub.rotation.x=Math.PI/2;
    }
    for(const [x,y,length,angle] of [[-.78,.43,1.7,-.25],[.82,-.23,2.1,-.43]]){
      const belt=mesh(group,new THREE.BoxGeometry(length,.07,.16),rubber(),x,y,0);belt.rotation.z=angle;
    }
  });components.push(coupling);

  const duct=component3D(root,'8 接管结合件',[.45,2.15,-.35],[.35,5.25,-.2],group=>{
    mesh(group,new THREE.BoxGeometry(5.05,.16,1.28),metal(0x6e8082),0,-.62,0);
    mesh(group,new THREE.BoxGeometry(5.05,.16,1.28),metal(0x829294),0,.62,0);
    for(const z of [-.58,.58])mesh(group,new THREE.BoxGeometry(5.05,1.24,.14),metal(0x758789),0,0,z);
    for(const x of [-2.42,2.42])mesh(group,new THREE.BoxGeometry(.16,1.2,1.15),metal(0x526668),x,0,0);
  });components.push(duct);

  const collar=component3D(root,'9 方接圆结合件',[-2.15,2.35,-.78],[-5.2,3.75,-.5],group=>{
    const body=mesh(group,new THREE.CylinderGeometry(.62,1.48,2.7,4,1,true),metal(0x7f8f90));body.rotation.z=-Math.PI/2;
    const rim=mesh(group,new THREE.TorusGeometry(.66,.09,16,64),metal(0x526668),1.34,0,0);rim.rotation.y=Math.PI/2;
    mesh(group,new THREE.BoxGeometry(.16,2.45,2.45),metal(0x596d6f),-1.34,0,0);
  });components.push(collar);

  const window=component3D(root,'10 透视窗',[.45,2.15,.64],[.35,4.05,2.55],group=>{
    const pane=mesh(group,new THREE.CircleGeometry(.43,48),glass());pane.scale.x=2.25;
    const rim=mesh(group,new THREE.TorusGeometry(.46,.08,18,64),dark(),0,0,.02);rim.scale.x=2.25;
  });components.push(window);

  const sign=component3D(root,'11 禁令牌',[3.18,.48,1.0],[5.3,.45,3.05],group=>{
    mesh(group,new THREE.BoxGeometry(.08,.78,.5),green(),0,0,0);
    mesh(group,new THREE.BoxGeometry(.1,.06,.34),dark(),.05,.12,0);
    mesh(group,new THREE.BoxGeometry(.1,.06,.34),dark(),.05,-.12,0);
  });components.push(sign);

  const strip=component3D(root,'12 嵌条',[.45,2.15,.7],[.35,3.55,2.2],group=>{
    const ring=mesh(group,new THREE.TorusGeometry(.47,.035,12,64),rubber());ring.scale.x=2.3;
  });components.push(strip);

  const core=component3D(root,'13 嵌芯',[.45,2.15,.75],[.35,3.08,1.9],group=>{
    const ring=mesh(group,new THREE.TorusGeometry(.43,.025,10,64),rubber());ring.scale.x=2.25;
  });components.push(core);

  const largeFastener=component3D(root,'14/17/19 M16紧固件',[-2.15,1.1,-.78],[-5.05,1.15,1.5],group=>{
    mesh(group,new THREE.CylinderGeometry(.09,.09,1.1,20),metal(0xaab4b1,.2),0,0,0);
    mesh(group,new THREE.CylinderGeometry(.18,.18,.14,6),dark(),0,.62,0);
    const washer=mesh(group,new THREE.TorusGeometry(.18,.035,10,36),brass(),0,-.58,0);washer.rotation.x=Math.PI/2;
  });components.push(largeFastener);

  const smallFasteners=component3D(root,'15/16/18 M6紧固件',[.45,2.82,-.35],[3.65,4.85,1.15],group=>{
    for(let i=0;i<6;i++){
      const x=(i%3-.9)*.38,y=(Math.floor(i/3)-.5)*.5;
      mesh(group,new THREE.CylinderGeometry(.045,.045,.48,16),metal(0xaab4b1,.2),x,y,0);
      mesh(group,new THREE.CylinderGeometry(.1,.1,.08,6),dark(),x,y+.27,0);
      const washer=mesh(group,new THREE.TorusGeometry(.095,.018,8,24),brass(),x,y-.26,0);washer.rotation.x=Math.PI/2;
    }
  });components.push(smallFasteners);

  root.userData.setExplode=value=>{
    const amount=THREE.MathUtils.clamp(Number(value)||0,0,1);
    components.forEach(item=>item.position.copy(item.userData.closed).lerp(item.userData.exploded,amount));
    root.userData.explode=amount;
  };
  root.userData.setExplode(.72);
  root.scale.setScalar(.58);
  root.position.y=-.45;
  return root;
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
  if(assembly.model==='openerProduct')return openerProduct();
  throw new Error(`尚未实现总成模型：${assembly.code}`);
}
