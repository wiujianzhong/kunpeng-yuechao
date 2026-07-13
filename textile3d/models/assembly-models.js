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

function feedAssembly(){
  const root=new THREE.Group();
  const components=[];

  const sideFrames=component3D(root,'4/5 左右底座与机架墙板',[0,0,0],[0,-2.7,-1.6],group=>{
    for(const x of [-3.15,3.15]){
      mesh(group,new THREE.BoxGeometry(.24,3.55,3.25),metal(0x718385),x,0,0);
      mesh(group,new THREE.BoxGeometry(.34,.25,3.55),metal(0x526668),x,-1.72,0);
      mesh(group,new THREE.BoxGeometry(.34,.25,3.55),metal(0x526668),x,1.72,0);
      for(const [y,z,r] of [[1.05,-.9,.38],[.35,.25,.3],[-.55,.75,.33],[-1.05,-.65,.28]]){
        const opening=mesh(group,new THREE.TorusGeometry(r,.055,12,40),dark(),x+(x<0?-.14:.14),y,z);
        opening.rotation.y=Math.PI/2;
      }
      for(let row=0;row<3;row++)for(let col=0;col<3;col++){
        const bolt=mesh(group,new THREE.CylinderGeometry(.035,.035,.34,14),metal(0xaab4b1,.2),x,1.35-row*1.25,-1.25+col*1.25);
        bolt.rotation.z=Math.PI/2;
      }
    }
    for(const y of [-1.48,1.48])for(const z of [-1.35,1.35])mesh(group,new THREE.BoxGeometry(6.15,.16,.16),metal(0x596d6f),0,y,z);
  });components.push(sideFrames);

  const lowerFeed=component3D(root,'1 下给棉罗拉结合件',[0,-.48,.62],[0,-.35,4.35],group=>{
    const roller=mesh(group,new THREE.CylinderGeometry(.31,.31,5.95,64),metal(0x879596,.25));roller.rotation.z=Math.PI/2;
    for(let i=0;i<22;i++){
      const angle=i*Math.PI*2/22;
      const rail=mesh(group,new THREE.BoxGeometry(5.78,.035,.055),metal(0xb1bbb8,.2),0,Math.cos(angle)*.32,Math.sin(angle)*.32);
      rail.rotation.x=angle;
    }
    for(const x of [-3.18,3.18]){const shaft=mesh(group,new THREE.CylinderGeometry(.11,.11,.62,28),metal(0xb7c0bd,.18),x,0,0);shaft.rotation.z=Math.PI/2}
  });components.push(lowerFeed);

  const apronDrive=component3D(root,'2 输棉帘传动辊结合件',[0,-1.02,-.72],[0,-3.5,2.45],group=>{
    const roller=mesh(group,new THREE.CylinderGeometry(.27,.27,5.78,56),metal(0x7c8d8e));roller.rotation.z=Math.PI/2;
    for(const x of [-3.08,3.08]){const shaft=mesh(group,new THREE.CylinderGeometry(.1,.1,.58,26),metal(0xb2bcb9,.18),x,0,0);shaft.rotation.z=Math.PI/2}
  });components.push(apronDrive);

  const pressureRoller=component3D(root,'6 压棉罗拉结合件',[0,.98,-.72],[0,3.85,2.55],group=>{
    const roller=mesh(group,new THREE.CylinderGeometry(.42,.42,5.72,64),metal(0x627678));roller.rotation.z=Math.PI/2;
    for(let i=0;i<16;i++){
      const angle=i*Math.PI*2/16;
      const rail=mesh(group,new THREE.BoxGeometry(5.55,.045,.08),metal(0xa5afac,.22),0,Math.cos(angle)*.43,Math.sin(angle)*.43);
      rail.rotation.x=angle;
    }
    for(const x of [-3.08,3.08]){const shaft=mesh(group,new THREE.CylinderGeometry(.12,.12,.66,28),metal(0xb7c0bd,.18),x,0,0);shaft.rotation.z=Math.PI/2}
  });components.push(pressureRoller);

  const guideRoller=component3D(root,'9 输棉帘导向辊',[0,.12,-.98],[0,1.35,-4.25],group=>{
    const roller=mesh(group,new THREE.CylinderGeometry(.22,.22,5.68,56),metal(0x829294));roller.rotation.z=Math.PI/2;
    for(const x of [-3.05,3.05]){const shaft=mesh(group,new THREE.CylinderGeometry(.08,.08,.54,24),metal(0xb7c0bd,.18),x,0,0);shaft.rotation.z=Math.PI/2}
  });components.push(guideRoller);

  const bearingGroups=component3D(root,'23/24/47/56 轴承座与轴端支承',[0,0,0],[0,.2,0],group=>{
    const positions=[[-3.28,-.48,.62],[3.28,-.48,.62],[-3.28,-1.02,-.72],[3.28,-1.02,-.72],[-3.28,.98,-.72],[3.28,.98,-.72],[-3.28,.12,-.98],[3.28,.12,-.98]];
    positions.forEach(([x,y,z],index)=>{
      const bearing=mesh(group,new THREE.TorusGeometry(.25,.09,18,48),index%2?brass():metal(0x9ca8a6,.2),x,y,z);bearing.rotation.y=Math.PI/2;
      mesh(group,new THREE.BoxGeometry(.16,.62,.7),metal(0x596d6f),x+(x<0?-.25:.25),y,z);
    });
  });components.push(bearingGroups);

  const pulleys=component3D(root,'3/11/13/14 同步带轮与链轮',[-3.62,-.2,.1],[-6.35,.35,.55],group=>{
    const wheels=[[.9,.62,.32],[-.18,-.72,.28],[-.86,-.72,.38],[-1.18,.05,.3]];
    wheels.forEach(([y,z,r],index)=>{
      const wheel=mesh(group,new THREE.CylinderGeometry(r,r,.3,48),index===2?dark():metal(0x647779),0,y,z);wheel.rotation.z=Math.PI/2;
      const hub=mesh(group,new THREE.CylinderGeometry(r*.36,r*.36,.5,30),brass(),0,y,z);hub.rotation.z=Math.PI/2;
      for(let i=0;i<16;i++){
        const angle=i*Math.PI*2/16;
        mesh(group,new THREE.BoxGeometry(.36,.035,.06),dark(),0,y+Math.cos(angle)*(r+.035),z+Math.sin(angle)*(r+.035)).rotation.x=angle;
      }
    });
  });components.push(pulleys);

  const motor=component3D(root,'3/7/116 电机与传动支架',[-3.75,.88,1.05],[-6.2,3.05,2.85],group=>{
    const body=mesh(group,new THREE.CylinderGeometry(.45,.45,1.18,40),dark(),0,0,0);body.rotation.z=Math.PI/2;
    for(let i=0;i<8;i++){
      const angle=i*Math.PI*2/8;
      const fin=mesh(group,new THREE.BoxGeometry(.8,.05,.12),metal(0x596d6f),0,Math.cos(angle)*.48,Math.sin(angle)*.48);fin.rotation.x=angle;
    }
    const shaft=mesh(group,new THREE.CylinderGeometry(.09,.09,.5,24),metal(0xb7c0bd,.18),.82,0,0);shaft.rotation.z=Math.PI/2;
    mesh(group,new THREE.BoxGeometry(1.55,.18,1.02),metal(0x708284),0,-.55,0);
    mesh(group,new THREE.BoxGeometry(.18,1.65,1.18),metal(0x637779),-.9,.12,0);
  });components.push(motor);

  const belt=component3D(root,'32/111 同步带与防护罩',[-3.84,.15,.88],[-6.8,1.05,1.25],group=>{
    const shape=new THREE.Shape();shape.absellipse(0,0,.48,1.15,0,Math.PI*2,false,0);
    const hole=new THREE.Path();hole.absellipse(0,0,.31,.98,0,Math.PI*2,true,0);shape.holes.push(hole);
    const geometry=new THREE.ExtrudeGeometry(shape,{depth:.12,bevelEnabled:false});geometry.center();
    const strap=mesh(group,geometry,rubber());strap.rotation.y=Math.PI/2;
    const guard=mesh(group,new THREE.BoxGeometry(.18,2.65,1.35),metal(0x728486),-.28,0,0);guard.material.transparent=true;guard.material.opacity=.72;
  });components.push(belt);

  const linkage=component3D(root,'18—22/37 调节连杆组',[3.65,.55,.92],[6.35,3.45,2.15],group=>{
    const rod=mesh(group,new THREE.CylinderGeometry(.07,.07,2.35,22),metal(0xaab4b1,.18),0,0,0);rod.rotation.z=-.48;
    for(const [x,y] of [[-.55,-1.02],[.55,1.02]]){
      const eye=mesh(group,new THREE.TorusGeometry(.15,.045,10,30),brass(),x,y,0);eye.rotation.y=Math.PI/2;
    }
    mesh(group,new THREE.BoxGeometry(.28,.95,.48),metal(0x596d6f),-.92,-1.2,0);
    mesh(group,new THREE.BoxGeometry(.28,.95,.48),metal(0x596d6f),.92,1.2,0);
  });components.push(linkage);

  const fasteners=component3D(root,'紧固件、轴承、挡圈和垫圈组',[0,0,0],[0,0,0],group=>{
    const clusters=[[-3.65,-.5,.62],[3.65,-.5,.62],[-3.65,-1.02,-.72],[3.65,-1.02,-.72],[-3.65,.98,-.72],[3.65,.98,-.72]];
    clusters.forEach(([x,y,z])=>{
      for(let i=0;i<4;i++){
        const offset=(i-1.5)*.18*(x<0?-1:1);
        const ring=mesh(group,new THREE.TorusGeometry(.15-i*.015,.025,8,28),i%2?brass():dark(),x+offset,y,z);ring.rotation.y=Math.PI/2;
      }
    });
  });components.push(fasteners);

  root.userData.setExplode=value=>{
    const amount=THREE.MathUtils.clamp(Number(value)||0,0,1);
    components.forEach(item=>item.position.copy(item.userData.closed).lerp(item.userData.exploded,amount));
    root.userData.explode=amount;
  };
  root.userData.setExplode(.76);
  root.scale.setScalar(.57);
  root.position.y=-.35;
  return root;
}

function beaterAssembly(){
  const root=new THREE.Group();
  const components=[];

  const drum=component3D(root,'1 梳针辊筒结合件',[0,.65,0],[0,3.25,0],group=>{
    const body=mesh(group,new THREE.CylinderGeometry(.72,.72,5.6,72),metal(0x758789));body.rotation.z=Math.PI/2;
    const shaft=mesh(group,new THREE.CylinderGeometry(.13,.13,6.35,32),metal(0xb3bcb9,.18));shaft.rotation.z=Math.PI/2;
    for(let row=0;row<7;row++)for(let i=0;i<18;i++){
      const angle=i*Math.PI*2/18+(row%2)*.08;
      const x=-2.45+row*.82;
      const pin=mesh(group,new THREE.CylinderGeometry(.018,.03,.18,9),metal(0xaab4b1,.2),x,Math.cos(angle)*.77,Math.sin(angle)*.77);
      pin.rotation.z=angle;
    }
    for(const x of [-2.82,2.82]){const rim=mesh(group,new THREE.TorusGeometry(.72,.055,12,56),dark(),x,0,0);rim.rotation.y=Math.PI/2}
  });components.push(drum);

  const supports=component3D(root,'3/4/5/7 轴承座与轴承盖',[0,.65,0],[0,.85,0],group=>{
    for(const x of [-3.08,3.08]){
      mesh(group,new THREE.BoxGeometry(.28,1.25,1.35),metal(0x5c7072),x,0,0);
      const bearing=mesh(group,new THREE.TorusGeometry(.34,.13,18,52),metal(0xabb5b2,.2),x+(x<0?-.18:.18),0,0);bearing.rotation.y=Math.PI/2;
      for(const [y,z] of [[-.46,-.42],[-.46,.42],[.46,-.42],[.46,.42]]){
        const bolt=mesh(group,new THREE.CylinderGeometry(.04,.04,.42,14),metal(0xaab4b1,.2),x,y,z);bolt.rotation.z=Math.PI/2;
      }
    }
  });components.push(supports);

  const pulley=component3D(root,'8/9/11 打手带轮与电机带轮',[-3.58,.65,0],[-5.15,1.35,0],group=>{
    for(const [x,y,r] of [[0,0,.62],[-.6,-1.7,.32]]){
      const wheel=mesh(group,new THREE.CylinderGeometry(r,r,.32,56),dark(),x,y,0);wheel.rotation.z=Math.PI/2;
      const hub=mesh(group,new THREE.CylinderGeometry(r*.35,r*.35,.5,30),brass(),x,y,0);hub.rotation.z=Math.PI/2;
      for(let i=0;i<18;i++){
        const angle=i*Math.PI*2/18;
        const tooth=mesh(group,new THREE.BoxGeometry(.36,.035,.065),metal(0x728486),x,y+Math.cos(angle)*(r+.04),Math.sin(angle)*(r+.04));tooth.rotation.x=angle;
      }
    }
  });components.push(pulley);

  const belt=component3D(root,'32 联组带',[-3.78,-.15,0],[-5.75,-.15,.65],group=>{
    const shape=new THREE.Shape();shape.absellipse(0,0,.42,1.25,0,Math.PI*2,false,0);
    const hole=new THREE.Path();hole.absellipse(0,0,.29,1.08,0,Math.PI*2,true,0);shape.holes.push(hole);
    const geometry=new THREE.ExtrudeGeometry(shape,{depth:.14,bevelEnabled:false});geometry.center();
    const strap=mesh(group,geometry,rubber());strap.rotation.y=Math.PI/2;
  });components.push(belt);

  const motor=component3D(root,'2/37 电机底板与电动机',[0,-1.35,-.85],[1.9,-3.55,-2.2],group=>{
    mesh(group,new THREE.BoxGeometry(1.7,.18,1.38),metal(0x697d7f),0,-.55,0);
    const body=mesh(group,new THREE.CylinderGeometry(.48,.48,1.32,44),dark(),0,0,0);body.rotation.z=Math.PI/2;
    for(let i=0;i<9;i++){
      const angle=i*Math.PI*2/9;
      const fin=mesh(group,new THREE.BoxGeometry(.9,.05,.12),metal(0x596d6f),0,Math.cos(angle)*.5,Math.sin(angle)*.5);fin.rotation.x=angle;
    }
    mesh(group,new THREE.BoxGeometry(.58,.38,.5),metal(0x718385),0,.58,0);
    const shaft=mesh(group,new THREE.CylinderGeometry(.09,.09,.54,24),metal(0xb7c0bd,.18),-.9,0,0);shaft.rotation.z=Math.PI/2;
  });components.push(motor);

  const adjuster=component3D(root,'14/23/24 张紧与行程开关支架',[1.8,-.85,.75],[3.95,-2.65,2.5],group=>{
    const rod=mesh(group,new THREE.CylinderGeometry(.06,.06,1.85,20),metal(0xaab4b1,.18),0,.35,0);rod.rotation.z=.12;
    for(const y of [-.55,.15,.85])mesh(group,new THREE.BoxGeometry(.45,.18,.55),metal(0x607477),0,y,0);
    mesh(group,new THREE.BoxGeometry(.72,.85,.2),metal(0x718385),.58,-.6,0);
    mesh(group,new THREE.BoxGeometry(.28,.35,.3),green(),.72,-.42,.1);
  });components.push(adjuster);

  const rings=component3D(root,'6/10/12/13/35/36 轴端垫圈与减振轴承',[0,.65,0],[0,.65,0],group=>{
    for(const x of [-3.38,-3.65,-3.9,3.38,3.65,3.9]){
      const ring=mesh(group,new THREE.TorusGeometry(.24,.045,10,36),Math.abs(x)<3.6?brass():dark(),x,0,0);ring.rotation.y=Math.PI/2;
    }
  });components.push(rings);

  root.userData.setExplode=value=>{
    const amount=THREE.MathUtils.clamp(Number(value)||0,0,1);
    components.forEach(item=>item.position.copy(item.userData.closed).lerp(item.userData.exploded,amount));
    root.userData.explode=amount;
  };
  root.userData.setExplode(.76);
  root.scale.setScalar(.64);
  root.position.y=-.28;
  return root;
}

function eliminatingAssembly(){
  const root=new THREE.Group();
  const components=[];

  const chambers=component3D(root,'1—5 集尘箱与方接圆结合件',[0,0,0],[0,-1.15,-1.1],group=>{
    for(const x of [-2.35,2.35]){
      mesh(group,new THREE.BoxGeometry(2.2,3.05,2.35),metal(0x718385),x,0,0);
      mesh(group,new THREE.BoxGeometry(1.65,2.45,.12),metal(0x596d6f),x,0,1.24);
      for(const y of [-.9,0,.9]){
        const port=mesh(group,new THREE.TorusGeometry(.28,.06,12,40),dark(),x,y,1.34);port.scale.x=1.45;
      }
      for(let row=0;row<5;row++)for(let col=0;col<4;col++){
        mesh(group,new THREE.CylinderGeometry(.025,.025,.18,10),metal(0xaab4b1,.2),x-0.75+col*.5,-1.18+row*.58,1.34).rotation.x=Math.PI/2;
      }
    }
  });components.push(chambers);

  const ducts=component3D(root,'6/7 软管与气管',[0,.25,.25],[0,3.2,2.8],group=>{
    const curves=[
      [[-1.7,.78,1.25],[-.75,1.7,1.85],[.75,1.7,1.85],[1.7,.78,1.25]],
      [[-1.7,.05,1.25],[-.7,.72,2.1],[.7,.72,2.1],[1.7,.05,1.25]],
      [[-1.7,-.72,1.25],[-.65,-.28,2.2],[.65,-.28,2.2],[1.7,-.72,1.25]]
    ];
    curves.forEach((points,index)=>{
      const curve=new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p)));
      mesh(group,new THREE.TubeGeometry(curve,48,.13,index===0?18:14,false),index===1?rubber():metal(0x829294));
      for(const end of [points[0],points.at(-1)]){
        const clamp=mesh(group,new THREE.TorusGeometry(.16,.035,8,28),brass(),...end);clamp.rotation.y=Math.PI/2;
      }
    });
  });components.push(ducts);

  const upperOutlet=component3D(root,'20/21 塑料弹簧软管与上接管',[-2.35,2.1,0],[-5.0,4.2,.8],group=>{
    mesh(group,new THREE.BoxGeometry(1.18,1.55,1.12),metal(0x697d7f),0,0,0);
    const collar=mesh(group,new THREE.CylinderGeometry(.42,.7,1.2,4,1,false),metal(0x829294),0,1.28,0);collar.rotation.y=Math.PI/4;
    const outlet=mesh(group,new THREE.CylinderGeometry(.42,.42,.95,40),rubber(),0,2.25,0);
    for(let i=0;i<6;i++){const ring=mesh(group,new THREE.TorusGeometry(.43,.025,8,32),dark(),0,1.82+i*.16,0);ring.rotation.x=Math.PI/2}
  });components.push(upperOutlet);

  const leftCovers=component3D(root,'8—18 左侧挡板组',[-3.48,0,.15],[-6.2,.1,2.6],group=>{
    for(const [y,z,w,h] of [[1.05,.25,1.0,.8],[.05,.25,1.0,1.05],[-1.05,.25,1.0,.8]]){
      mesh(group,new THREE.BoxGeometry(.15,h,w),metal(0x7c8d8e),0,y,z);
      mesh(group,new THREE.BoxGeometry(.24,.22,.36),dark(),-.12,y,z+.42);
    }
    const rail=mesh(group,new THREE.BoxGeometry(.16,3.15,.18),metal(0x596d6f),0,0,-.62);rail.rotation.z=.08;
  });components.push(leftCovers);

  const rightCovers=component3D(root,'8—18 右侧挡板组',[3.48,0,.15],[6.2,.1,2.6],group=>{
    for(const [y,z,w,h] of [[1.05,.25,1.0,.8],[.05,.25,1.0,1.05],[-1.05,.25,1.0,.8]]){
      mesh(group,new THREE.BoxGeometry(.15,h,w),metal(0x7c8d8e),0,y,z);
      mesh(group,new THREE.BoxGeometry(.24,.22,.36),dark(),.12,y,z+.42);
    }
    mesh(group,new THREE.BoxGeometry(.16,3.15,.18),metal(0x596d6f),0,0,-.62).rotation.z=-.08;
  });components.push(rightCovers);

  const bottomGuard=component3D(root,'9/10/13 底部挡板与连接板',[0,-1.82,.45],[0,-4.15,2.1],group=>{
    mesh(group,new THREE.BoxGeometry(4.6,.18,.78),metal(0x718385),0,0,0);
    for(const x of [-1.85,1.85])mesh(group,new THREE.BoxGeometry(.55,.68,.16),metal(0x596d6f),x,.25,.32);
    for(let i=0;i<8;i++)mesh(group,new THREE.CylinderGeometry(.035,.035,.25,12),brass(),-1.75+i*.5,-.16,0);
  });components.push(bottomGuard);

  const clamps=component3D(root,'22—32 卡箍与紧固件',[0,0,0],[0,0,0],group=>{
    for(const [x,y,z] of [[-1.7,.78,1.25],[1.7,.78,1.25],[-1.7,.05,1.25],[1.7,.05,1.25],[-1.7,-.72,1.25],[1.7,-.72,1.25]]){
      const ring=mesh(group,new THREE.TorusGeometry(.18,.025,8,28),brass(),x,y,z);ring.rotation.y=Math.PI/2;
      mesh(group,new THREE.BoxGeometry(.08,.32,.12),dark(),x,y+.22,z);
    }
  });components.push(clamps);

  root.userData.setExplode=value=>{
    const amount=THREE.MathUtils.clamp(Number(value)||0,0,1);
    components.forEach(item=>item.position.copy(item.userData.closed).lerp(item.userData.exploded,amount));
    root.userData.explode=amount;
  };
  root.userData.setExplode(.76);
  root.scale.setScalar(.62);
  root.position.y=-.25;
  return root;
}

function safetyFrameAssembly(){
  const root=new THREE.Group();
  const components=[];

  const frame=component3D(root,'机架与安全罩骨架',[0,0,0],[0,-.7,-.8],group=>{
    for(const x of [-2.65,2.65])for(const z of [-1.45,1.45])mesh(group,new THREE.BoxGeometry(.16,3.25,.16),metal(0x596d6f),x,0,z);
    for(const y of [-1.55,1.55]){
      for(const z of [-1.45,1.45])mesh(group,new THREE.BoxGeometry(5.45,.16,.16),metal(0x596d6f),0,y,z);
      for(const x of [-2.65,2.65])mesh(group,new THREE.BoxGeometry(.16,.16,2.9),metal(0x596d6f),x,y,0);
    }
    for(const x of [-1.35,0,1.35])mesh(group,new THREE.BoxGeometry(.13,3.05,.13),metal(0x65787a),x,0,-1.45);
    mesh(group,new THREE.BoxGeometry(5.15,.14,2.65),metal(0x718385),0,-1.46,0);
    for(const x of [-2.45,2.45])for(const z of [-1.2,1.2])mesh(group,new THREE.BoxGeometry(.38,.18,.48),dark(),x,-1.75,z);
  });components.push(frame);

  const frontDoors=component3D(root,'1/2/6/7 门结合件',[0,0,1.55],[0,-.1,4.55],group=>{
    for(const x of [-1.34,1.34]){
      mesh(group,new THREE.BoxGeometry(2.5,2.85,.13),metal(0x7b8b8c),x,0,0);
      for(const y of [-1.3,1.3])mesh(group,new THREE.BoxGeometry(2.5,.12,.2),metal(0x526668),x,y,0);
      for(const x2 of [x-1.12,x+1.12])mesh(group,new THREE.BoxGeometry(.12,2.85,.2),metal(0x526668),x2,0,0);
      mesh(group,new THREE.BoxGeometry(.18,.52,.2),dark(),x+(x<0?.72:-.72),0,0);
      for(let i=0;i<7;i++)mesh(group,new THREE.BoxGeometry(.95,.045,.04),dark(),x,-.8+i*.12,.09);
    }
  });components.push(frontDoors);

  const rearPanels=component3D(root,'3/8/9/10 上罩与后挡板',[0,0,-1.55],[0,1.2,-4.65],group=>{
    mesh(group,new THREE.BoxGeometry(5.25,3.0,.13),metal(0x748688),0,0,0);
    mesh(group,new THREE.BoxGeometry(2.3,1.2,.08),dark(),-1.25,.55,-.08);
    for(let i=0;i<8;i++)mesh(group,new THREE.BoxGeometry(1.75,.045,.05),metal(0x9ca8a6,.22),1.25,-.7+i*.14,.08);
    mesh(group,new THREE.BoxGeometry(5.1,.16,.72),metal(0x829294),0,1.55,.25);
  });components.push(rearPanels);

  const sidePanels=component3D(root,'4/5/11/12 侧罩与活动挡板',[0,0,0],[0,.4,0],group=>{
    for(const x of [-2.77,2.77]){
      mesh(group,new THREE.BoxGeometry(.13,2.95,2.68),metal(0x7c8d8e),x,0,0);
      const window=mesh(group,new THREE.CircleGeometry(.42,40),glass(),x+(x<0?-.07:.07),.55,.2);window.rotation.y=Math.PI/2;
      for(const y of [-1.2,1.2])mesh(group,new THREE.BoxGeometry(.2,.16,2.5),metal(0x526668),x,y,0);
    }
  });components.push(sidePanels);

  const upperDuct=component3D(root,'上部接管、方接圆与封板',[0,1.95,-.55],[-2.8,4.15,-2.1],group=>{
    mesh(group,new THREE.BoxGeometry(1.15,1.3,1.15),metal(0x697d7f),0,0,0);
    const collar=mesh(group,new THREE.CylinderGeometry(.42,.66,.85,4),metal(0x829294),0,.95,0);collar.rotation.y=Math.PI/4;
    mesh(group,new THREE.BoxGeometry(1.55,.12,1.45),metal(0x596d6f),0,-.72,0);
  });components.push(upperDuct);

  const hinges=component3D(root,'19—27 门锁、铰链与门线装置',[0,0,1.62],[3.8,0,4.75],group=>{
    for(const x of [-2.45,-.75,.75,2.45])for(const y of [-.85,.85]){
      const pin=mesh(group,new THREE.CylinderGeometry(.07,.07,.55,20),brass(),x,y,0);pin.rotation.x=Math.PI/2;
      mesh(group,new THREE.BoxGeometry(.35,.22,.12),dark(),x,y,0);
    }
    for(const x of [-1.2,1.2])mesh(group,new THREE.BoxGeometry(.24,.5,.18),green(),x,0,0);
  });components.push(hinges);

  const seals=component3D(root,'16—18 密封条',[0,0,1.61],[-3.9,-.2,4.7],group=>{
    for(const x of [-1.35,1.35]){
      const shape=new THREE.Shape();shape.moveTo(-1.15,-1.3);shape.lineTo(1.15,-1.3);shape.lineTo(1.15,1.3);shape.lineTo(-1.15,1.3);shape.closePath();
      const hole=new THREE.Path();hole.moveTo(-1.05,-1.2);hole.lineTo(-1.05,1.2);hole.lineTo(1.05,1.2);hole.lineTo(1.05,-1.2);hole.closePath();shape.holes.push(hole);
      const geometry=new THREE.ExtrudeGeometry(shape,{depth:.035,bevelEnabled:false});geometry.center();mesh(group,geometry,rubber(),x,0,0);
    }
  });components.push(seals);

  root.userData.setExplode=value=>{
    const amount=THREE.MathUtils.clamp(Number(value)||0,0,1);
    components.forEach(item=>item.position.copy(item.userData.closed).lerp(item.userData.exploded,amount));
    root.userData.explode=amount;
  };
  root.userData.setExplode(.76);
  root.scale.setScalar(.62);
  root.position.y=-.25;
  return root;
}

function couplingAssembly(){
  const root=new THREE.Group();
  const components=[];

  const walls=component3D(root,'机架墙板与联接基准',[0,0,0],[0,-1.2,-1.15],group=>{
    for(const x of [-3.05,3.05]){
      mesh(group,new THREE.BoxGeometry(.24,3.45,3.1),metal(0x718385),x,0,0);
      for(const [y,z,r] of [[1.05,-.65,.38],[.25,.45,.34],[-.85,-.35,.3]]){
        const port=mesh(group,new THREE.TorusGeometry(r,.055,12,42),dark(),x+(x<0?-.14:.14),y,z);port.rotation.y=Math.PI/2;
      }
      for(let row=0;row<4;row++)for(let col=0;col<3;col++){
        const bolt=mesh(group,new THREE.CylinderGeometry(.03,.03,.34,12),metal(0xaab4b1,.2),x,1.25-row*.82,-1.05+col*1.02);bolt.rotation.z=Math.PI/2;
      }
    }
    for(const y of [-1.55,1.55])for(const z of [-1.35,1.35])mesh(group,new THREE.BoxGeometry(5.95,.15,.15),metal(0x596d6f),0,y,z);
  });components.push(walls);

  const upperRoller=component3D(root,'上部联接辊组',[0,1.0,-.65],[0,4.15,1.95],group=>{
    const roller=mesh(group,new THREE.CylinderGeometry(.28,.28,5.75,56),metal(0x829294));roller.rotation.z=Math.PI/2;
    for(const x of [-3.12,3.12]){const shaft=mesh(group,new THREE.CylinderGeometry(.09,.09,.62,24),metal(0xb7c0bd,.18),x,0,0);shaft.rotation.z=Math.PI/2}
  });components.push(upperRoller);

  const mainRoller=component3D(root,'下部主辊与支承',[0,-.55,-.3],[0,-3.8,2.1],group=>{
    const roller=mesh(group,new THREE.CylinderGeometry(.36,.36,5.65,60),metal(0x65787a));roller.rotation.z=Math.PI/2;
    for(let i=0;i<14;i++){
      const angle=i*Math.PI*2/14;
      const rail=mesh(group,new THREE.BoxGeometry(5.5,.04,.07),metal(0xaab4b1,.22),0,Math.cos(angle)*.37,Math.sin(angle)*.37);rail.rotation.x=angle;
    }
    for(const x of [-3.12,3.12]){const shaft=mesh(group,new THREE.CylinderGeometry(.11,.11,.62,26),metal(0xb7c0bd,.18),x,0,0);shaft.rotation.z=Math.PI/2}
  });components.push(mainRoller);

  const tensionRoller=component3D(root,'张紧辊与摆臂组',[0,-1.15,.82],[0,-4.25,-2.8],group=>{
    const roller=mesh(group,new THREE.CylinderGeometry(.2,.2,5.35,52),metal(0x7c8d8e));roller.rotation.z=Math.PI/2;
    for(const x of [-2.85,2.85]){
      const arm=mesh(group,new THREE.BoxGeometry(.16,1.15,.3),metal(0x596d6f),x,.28,0);arm.rotation.z=x<0?.32:-.32;
      const pivot=mesh(group,new THREE.CylinderGeometry(.16,.16,.4,28),brass(),x,.78,0);pivot.rotation.z=Math.PI/2;
    }
  });components.push(tensionRoller);

  const bearingSets=component3D(root,'轴承座、轴衬和挡圈组',[0,0,0],[0,.1,0],group=>{
    for(const [x,y,z] of [[-3.28,1,-.65],[3.28,1,-.65],[-3.28,-.55,-.3],[3.28,-.55,-.3],[-3.0,-1.15,.82],[3.0,-1.15,.82]]){
      mesh(group,new THREE.BoxGeometry(.18,.72,.72),metal(0x596d6f),x,y,z);
      const bearing=mesh(group,new THREE.TorusGeometry(.24,.09,16,46),metal(0xaab4b1,.2),x+(x<0?-.15:.15),y,z);bearing.rotation.y=Math.PI/2;
      const clip=mesh(group,new THREE.TorusGeometry(.18,.025,8,30),brass(),x+(x<0?-.35:.35),y,z);clip.rotation.y=Math.PI/2;
    }
  });components.push(bearingSets);

  const topCovers=component3D(root,'顶部左/右罩与封板',[0,1.82,-.25],[0,4.5,-2.35],group=>{
    for(const x of [-1.52,1.52]){
      const cover=mesh(group,new THREE.BoxGeometry(2.85,.18,1.15),metal(0x7c8d8e),x,0,0);cover.rotation.z=x<0?-.04:.04;
      mesh(group,new THREE.BoxGeometry(2.85,.6,.13),metal(0x65787a),x,-.35,-.5);
      for(let i=0;i<4;i++)mesh(group,new THREE.CylinderGeometry(.035,.035,.2,12),brass(),x-1+i*.68,.12,.42);
    }
  });components.push(topCovers);

  const lowerCovers=component3D(root,'底部挡板与联接板',[0,-1.82,.1],[0,-4.55,2.75],group=>{
    mesh(group,new THREE.BoxGeometry(5.75,.17,1.05),metal(0x718385),0,0,0);
    for(const x of [-2.55,2.55])mesh(group,new THREE.BoxGeometry(.46,.75,.16),metal(0x596d6f),x,.28,.42);
    for(let i=0;i<8;i++)mesh(group,new THREE.CylinderGeometry(.035,.035,.24,12),brass(),-2.25+i*.65,-.14,0);
  });components.push(lowerCovers);

  const drives=component3D(root,'带轮、联轴器与传动件',[-3.62,.12,-.1],[-6.15,.25,.35],group=>{
    for(const [y,z,r] of [[.9,-.55,.38],[-.65,-.25,.46],[-1.15,.85,.3]]){
      const wheel=mesh(group,new THREE.CylinderGeometry(r,r,.3,48),dark(),0,y,z);wheel.rotation.z=Math.PI/2;
      const hub=mesh(group,new THREE.CylinderGeometry(r*.35,r*.35,.48,28),brass(),0,y,z);hub.rotation.z=Math.PI/2;
    }
    const coupling=mesh(group,new THREE.CylinderGeometry(.22,.22,.72,32),metal(0x879596,.22),-.55,.9,-.55);coupling.rotation.z=Math.PI/2;
  });components.push(drives);

  const links=component3D(root,'调节杆、手柄与紧固件',[3.65,.2,.05],[6.3,1.2,1.8],group=>{
    const rod=mesh(group,new THREE.CylinderGeometry(.055,.055,1.9,20),metal(0xaab4b1,.18),0,0,0);rod.rotation.z=-.65;
    for(const [x,y] of [[-.72,-.58],[.72,.58]]){
      const eye=mesh(group,new THREE.TorusGeometry(.14,.04,9,28),brass(),x,y,0);eye.rotation.y=Math.PI/2;
    }
    mesh(group,new THREE.BoxGeometry(.34,.9,.42),metal(0x596d6f),-.9,-.75,0);
    mesh(group,new THREE.BoxGeometry(.34,.9,.42),metal(0x596d6f),.9,.75,0);
  });components.push(links);

  root.userData.setExplode=value=>{
    const amount=THREE.MathUtils.clamp(Number(value)||0,0,1);
    components.forEach(item=>item.position.copy(item.userData.closed).lerp(item.userData.exploded,amount));
    root.userData.explode=amount;
  };
  root.userData.setExplode(.76);
  root.scale.setScalar(.62);
  root.position.y=-.28;
  return root;
}

function frameBaseAssembly(){
  const root=new THREE.Group();
  const components=[];

  const endFrames=component3D(root,'1/2 左右机架墙板',[0,0,0],[0,-1.1,-1.0],group=>{
    for(const x of [-3.05,3.05]){
      mesh(group,new THREE.BoxGeometry(.24,3.25,3.05),metal(0x718385),x,0,0);
      mesh(group,new THREE.BoxGeometry(.34,.22,3.35),metal(0x526668),x,-1.62,0);
      for(const [y,z,r] of [[1,-.72,.34],[.32,.35,.28],[-.6,.72,.3]]){
        const port=mesh(group,new THREE.TorusGeometry(r,.055,12,40),dark(),x+(x<0?-.14:.14),y,z);port.rotation.y=Math.PI/2;
      }
      for(let row=0;row<4;row++)for(let col=0;col<3;col++){
        const bolt=mesh(group,new THREE.CylinderGeometry(.028,.028,.34,10),metal(0xaab4b1,.2),x,1.25-row*.78,-1+col);bolt.rotation.z=Math.PI/2;
      }
    }
  });components.push(endFrames);

  const upperRails=component3D(root,'3/4/11 上部撑杆与角钢',[0,1.25,-.55],[0,4.1,1.85],group=>{
    for(const [y,z] of [[.45,-.45],[0,0],[-.45,.45]]){
      mesh(group,new THREE.BoxGeometry(5.75,.16,.34),metal(0x65787a),0,y,z);
      mesh(group,new THREE.BoxGeometry(5.75,.34,.12),metal(0x829294),0,y-.1,z+.12);
    }
  });components.push(upperRails);

  const middleRails=component3D(root,'9/10/12/13 中部撑杆与圆轴',[0,.12,.15],[0,.15,3.7],group=>{
    for(const [y,z] of [[.52,-.62],[.05,0],[-.52,.62]]){
      const shaft=mesh(group,new THREE.CylinderGeometry(.09,.09,5.65,24),metal(0xaab4b1,.2),0,y,z);shaft.rotation.z=Math.PI/2;
      for(const x of [-2.85,2.85]){const ring=mesh(group,new THREE.TorusGeometry(.14,.035,8,28),brass(),x,y,z);ring.rotation.y=Math.PI/2}
    }
  });components.push(middleRails);

  const lowerBeam=component3D(root,'5/19 右侧横梁与加强件',[0,-.9,.82],[4.85,-2.95,2.2],group=>{
    mesh(group,new THREE.BoxGeometry(5.8,.72,.18),metal(0x718385),0,0,0);
    mesh(group,new THREE.BoxGeometry(5.8,.16,.85),metal(0x596d6f),0,.28,0);
    for(const x of [-2.5,2.5])mesh(group,new THREE.BoxGeometry(.18,.78,.95),metal(0x526668),x,0,0);
  });components.push(lowerBeam);

  const frontPanels=component3D(root,'6/7/8/20 前挡板与底板',[0,-1.05,1.3],[0,-3.75,4.15],group=>{
    mesh(group,new THREE.BoxGeometry(3.2,1.05,.14),metal(0x7c8d8e),0,.25,0);
    for(const x of [-2.25,2.25])mesh(group,new THREE.BoxGeometry(1.15,.88,.14),metal(0x748688),x,-.25,0);
    mesh(group,new THREE.BoxGeometry(5.65,.18,.75),metal(0x697d7f),0,-.85,-.18);
    for(const x of [-2.55,-.85,.85,2.55])mesh(group,new THREE.BoxGeometry(.35,.36,.2),dark(),x,-.72,.08);
  });components.push(frontPanels);

  const upright=component3D(root,'16 立柱与调节件',[0,-.25,-1.15],[0,-2.7,-3.9],group=>{
    mesh(group,new THREE.BoxGeometry(.24,2.65,.32),metal(0x596d6f),0,0,0);
    mesh(group,new THREE.BoxGeometry(.6,.18,.55),metal(0x718385),0,-1.25,0);
    const adjust=mesh(group,new THREE.CylinderGeometry(.09,.09,.62,24),brass(),0,1.5,0);adjust.rotation.x=Math.PI/2;
  });components.push(upright);

  const feet=component3D(root,'17/23 机架脚与调平件',[0,-1.78,0],[0,-4.45,-.55],group=>{
    for(const x of [-2.55,2.55])for(const z of [-1.1,1.1]){
      mesh(group,new THREE.CylinderGeometry(.22,.28,.16,36),dark(),x,0,z);
      mesh(group,new THREE.CylinderGeometry(.07,.07,.55,20),metal(0xaab4b1,.2),x,.28,z);
    }
  });components.push(feet);

  root.userData.setExplode=value=>{
    const amount=THREE.MathUtils.clamp(Number(value)||0,0,1);
    components.forEach(item=>item.position.copy(item.userData.closed).lerp(item.userData.exploded,amount));
    root.userData.explode=amount;
  };
  root.userData.setExplode(.76);
  root.scale.setScalar(.62);
  root.position.y=-.25;
  return root;
}

function dedustAssembly(){
  const root=new THREE.Group();
  const components=[];

  const frames=component3D(root,'左右机架墙板',[0,0,0],[0,-1.05,-.95],group=>{
    for(const x of [-3.05,3.05]){
      mesh(group,new THREE.BoxGeometry(.24,3.25,3.0),metal(0x718385),x,0,0);
      for(const [y,z,r] of [[1.02,-.62,.34],[.18,.42,.3],[-.72,-.12,.28]]){
        const port=mesh(group,new THREE.TorusGeometry(r,.055,12,40),dark(),x+(x<0?-.14:.14),y,z);port.rotation.y=Math.PI/2;
      }
      for(let row=0;row<4;row++)for(let col=0;col<3;col++){
        const bolt=mesh(group,new THREE.CylinderGeometry(.028,.028,.34,10),metal(0xaab4b1,.2),x,1.2-row*.76,-1+col);bolt.rotation.z=Math.PI/2;
      }
    }
  });components.push(frames);

  const knifeRows=component3D(root,'1—8 排尘刀与导条组',[0,.3,.1],[0,3.8,2.45],group=>{
    const rows=[[1.05,-.82],[.62,-.42],[.16,0],[-.3,.4],[-.78,.82]];
    rows.forEach(([y,z],index)=>{
      mesh(group,new THREE.BoxGeometry(5.7,.12,.28),index%2?metal(0x879596,.22):metal(0x65787a),0,y,z);
      const knife=mesh(group,new THREE.BoxGeometry(5.55,.07,.36),metal(0xa7b1ae,.18),0,y-.12,z+.18);knife.rotation.x=-.28;
      for(const x of [-2.75,2.75]){
        const pin=mesh(group,new THREE.CylinderGeometry(.055,.055,.42,18),brass(),x,y,z);pin.rotation.z=Math.PI/2;
      }
    });
  });components.push(knifeRows);

  const troughs=component3D(root,'9—16 排尘槽与托板',[0,-.85,.55],[0,-3.9,3.4],group=>{
    for(const x of [-1.62,1.62]){
      const trough=mesh(group,new THREE.BoxGeometry(2.8,.14,1.1),metal(0x748688),x,0,0);trough.rotation.x=-.18;
      mesh(group,new THREE.BoxGeometry(2.8,.52,.12),metal(0x596d6f),x,-.28,.46);
      for(let i=0;i<5;i++)mesh(group,new THREE.CylinderGeometry(.035,.035,.2,12),brass(),x-1.1+i*.55,.12,-.38);
    }
  });components.push(troughs);

  const adjustmentShafts=component3D(root,'19—29 调节轴、摆臂与支座',[0,.15,-.82],[0,.3,-4.1],group=>{
    for(const y of [.62,-.18,-.92]){
      const shaft=mesh(group,new THREE.CylinderGeometry(.075,.075,5.65,24),metal(0xaab4b1,.2),0,y,0);shaft.rotation.z=Math.PI/2;
      for(const x of [-2.95,2.95]){
        const arm=mesh(group,new THREE.BoxGeometry(.52,.12,.22),metal(0x596d6f),x,y,0);arm.rotation.z=x<0?.55:-.55;
        const hub=mesh(group,new THREE.TorusGeometry(.15,.05,10,32),brass(),x,y,0);hub.rotation.y=Math.PI/2;
      }
    }
  });components.push(adjustmentShafts);

  const scrapers=component3D(root,'25/26 除尘刮板与毛刷',[0,1.25,.55],[0,4.65,-2.55],group=>{
    for(const y of [.32,-.32]){
      mesh(group,new THREE.BoxGeometry(5.45,.16,.32),metal(0x697d7f),0,y,0);
      for(let i=0;i<72;i++)mesh(group,new THREE.BoxGeometry(.035,.18,.025),dark(),-2.65+i*.075,y-.17,.12);
    }
  });components.push(scrapers);

  const guards=component3D(root,'3/9/11/13/15 上下挡板',[0,0,1.25],[4.85,.25,3.65],group=>{
    for(const [x,y,w] of [[-1.75,.9,2.15],[.55,.45,2.1],[-.55,-.35,2.1],[1.75,-.9,2.15]]){
      mesh(group,new THREE.BoxGeometry(w,.75,.13),metal(0x7c8d8e),x,y,0);
      mesh(group,new THREE.BoxGeometry(w,.12,.35),metal(0x526668),x,y-.34,-.12);
    }
  });components.push(guards);

  const fasteners=component3D(root,'紧固件与垫圈组',[0,0,0],[0,0,0],group=>{
    for(const x of [-3.35,3.35])for(const y of [-1.1,-.35,.4,1.15]){
      const washer=mesh(group,new THREE.TorusGeometry(.12,.025,8,26),brass(),x,y,.25);washer.rotation.y=Math.PI/2;
      const bolt=mesh(group,new THREE.CylinderGeometry(.04,.04,.38,14),metal(0xaab4b1,.2),x,y,.25);bolt.rotation.z=Math.PI/2;
    }
  });components.push(fasteners);

  root.userData.setExplode=value=>{
    const amount=THREE.MathUtils.clamp(Number(value)||0,0,1);
    components.forEach(item=>item.position.copy(item.userData.closed).lerp(item.userData.exploded,amount));
    root.userData.explode=amount;
  };
  root.userData.setExplode(.76);
  root.scale.setScalar(.62);
  root.position.y=-.25;
  return root;
}

function jwf1102ProductAssembly(){
  const root=new THREE.Group();
  const components=[];

  const cabinet=component3D(root,'产品主机架',[0,0,0],[0,-.7,-.8],group=>{
    for(const x of [-2.25,2.25])for(const z of [-1.55,1.55])mesh(group,new THREE.BoxGeometry(.17,3.1,.17),metal(0x596d6f),x,0,z);
    for(const y of [-1.5,1.5]){
      for(const z of [-1.55,1.55])mesh(group,new THREE.BoxGeometry(4.65,.17,.17),metal(0x596d6f),0,y,z);
      for(const x of [-2.25,2.25])mesh(group,new THREE.BoxGeometry(.17,.17,3.1),metal(0x596d6f),x,y,0);
    }
    mesh(group,new THREE.BoxGeometry(4.4,.14,2.85),metal(0x718385),0,-1.42,0);
    for(const x of [-1.1,1.1])mesh(group,new THREE.BoxGeometry(.12,2.85,.12),metal(0x65787a),x,0,-1.55);
  });components.push(cabinet);

  const upperFrame=component3D(root,'上部喂棉框架',[0,2.65,-.2],[0,5.05,-1.2],group=>{
    for(const x of [-1.55,1.55])for(const z of [-1.05,1.05])mesh(group,new THREE.BoxGeometry(.15,2.45,.15),metal(0x596d6f),x,0,z);
    for(const y of [-1.15,1.15]){
      for(const z of [-1.05,1.05])mesh(group,new THREE.BoxGeometry(3.25,.15,.15),metal(0x596d6f),0,y,z);
      for(const x of [-1.55,1.55])mesh(group,new THREE.BoxGeometry(.15,.15,2.1),metal(0x596d6f),x,y,0);
    }
    mesh(group,new THREE.BoxGeometry(3.0,.85,2.0),metal(0x748688),0,-.72,0);
    const chute=mesh(group,new THREE.CylinderGeometry(.55,1.05,1.25,4),metal(0x829294),0,.35,0);chute.rotation.y=Math.PI/4;
  });components.push(upperFrame);

  const frontDoors=component3D(root,'前门与观察罩',[0,0,1.62],[0,-.05,4.5],group=>{
    for(const x of [-1.12,1.12]){
      mesh(group,new THREE.BoxGeometry(2.08,2.78,.14),metal(0x7c8d8e),x,0,0);
      mesh(group,new THREE.BoxGeometry(.2,.65,.2),dark(),x+(x<0?.68:-.68),.1,0);
      for(let row=0;row<5;row++)for(let col=0;col<6;col++)mesh(group,new THREE.BoxGeometry(.16,.045,.04),dark(),x-.55+col*.22,-1.0+row*.12,.09);
    }
  });components.push(frontDoors);

  const leftCover=component3D(root,'左侧门与圆形护罩',[-2.38,0,0],[-4.95,.15,1.5],group=>{
    mesh(group,new THREE.BoxGeometry(.14,2.9,2.9),metal(0x748688),0,0,0);
    const ring=mesh(group,new THREE.TorusGeometry(.62,.08,16,56),dark(),-.08,.25,.25);ring.rotation.y=Math.PI/2;
    mesh(group,new THREE.BoxGeometry(.18,.55,.3),green(),-.12,-.2,1.12);
  });components.push(leftCover);

  const rightCover=component3D(root,'右侧门与接管护板',[2.38,0,0],[4.95,.15,1.5],group=>{
    mesh(group,new THREE.BoxGeometry(.14,2.9,2.9),metal(0x7c8d8e),0,0,0);
    const port=mesh(group,new THREE.TorusGeometry(.72,.08,16,56),dark(),.08,.38,.15);port.rotation.y=Math.PI/2;
    mesh(group,new THREE.BoxGeometry(.22,.85,1.15),metal(0x596d6f),.12,-.72,.6);
  });components.push(rightCover);

  const internalRollers=component3D(root,'内部辊组与传动',[0,.15,.2],[0,.2,3.55],group=>{
    for(const [y,z,r] of [[.65,-.45,.42],[-.1,.2,.32],[-.72,-.35,.27]]){
      const roller=mesh(group,new THREE.CylinderGeometry(r,r,3.8,56),metal(0x748688),0,y,z);roller.rotation.z=Math.PI/2;
      for(const x of [-2.0,2.0]){const shaft=mesh(group,new THREE.CylinderGeometry(.09,.09,.48,24),metal(0xb7c0bd,.18),x,y,z);shaft.rotation.z=Math.PI/2}
    }
  });components.push(internalRollers);

  const rearChute=component3D(root,'后部输棉管与挡板',[0,.55,-1.7],[0,2.35,-4.0],group=>{
    mesh(group,new THREE.BoxGeometry(3.2,1.15,.18),metal(0x718385),0,0,0);
    mesh(group,new THREE.BoxGeometry(2.85,.18,1.15),metal(0x829294),0,.55,-.4);
    for(const x of [-1.45,1.45])mesh(group,new THREE.BoxGeometry(.18,1.25,1.15),metal(0x596d6f),x,0,-.4);
  });components.push(rearChute);

  const feet=component3D(root,'底脚与调平件',[0,-1.72,0],[0,-4.05,-.45],group=>{
    for(const x of [-2.0,2.0])for(const z of [-1.3,1.3]){
      mesh(group,new THREE.CylinderGeometry(.22,.28,.16,36),dark(),x,0,z);
      mesh(group,new THREE.CylinderGeometry(.07,.07,.5,20),metal(0xaab4b1,.2),x,.25,z);
    }
  });components.push(feet);

  root.userData.setExplode=value=>{
    const amount=THREE.MathUtils.clamp(Number(value)||0,0,1);
    components.forEach(item=>item.position.copy(item.userData.closed).lerp(item.userData.exploded,amount));
    root.userData.explode=amount;
  };
  root.userData.setExplode(.76);
  root.scale.setScalar(.63);
  root.position.y=-.35;
  return root;
}

function jwf1102FrameAssembly(){
  const root=new THREE.Group();
  const components=[];

  const walls=component3D(root,'左右机架墙板',[0,0,0],[0,-1.1,-.9],group=>{
    for(const x of [-3,3]){
      mesh(group,new THREE.BoxGeometry(.24,3.35,3.05),metal(0x718385),x,0,0);
      for(const [y,z,r] of [[1.05,-.65,.38],[.2,.4,.32],[-.7,-.2,.3]]){
        const port=mesh(group,new THREE.TorusGeometry(r,.055,12,42),dark(),x+(x<0?-.14:.14),y,z);port.rotation.y=Math.PI/2;
      }
      for(let row=0;row<4;row++)for(let col=0;col<3;col++){
        const bolt=mesh(group,new THREE.CylinderGeometry(.028,.028,.34,10),metal(0xaab4b1,.2),x,1.25-row*.78,-1+col);bolt.rotation.z=Math.PI/2;
      }
    }
  });components.push(walls);

  const railBanks=component3D(root,'排刀、托条与导板组',[0,.25,.05],[0,3.9,2.5],group=>{
    const levels=[[1.1,-.85],[.66,-.42],[.2,0],[-.28,.42],[-.75,.82]];
    levels.forEach(([y,z],index)=>{
      mesh(group,new THREE.BoxGeometry(5.65,.14,.3),index%2?metal(0x829294):metal(0x65787a),0,y,z);
      const blade=mesh(group,new THREE.BoxGeometry(5.45,.07,.34),metal(0xaab4b1,.18),0,y-.13,z+.18);blade.rotation.x=-.26;
      for(const x of [-2.75,2.75]){
        const pin=mesh(group,new THREE.CylinderGeometry(.055,.055,.42,18),brass(),x,y,z);pin.rotation.z=Math.PI/2;
      }
    });
  });components.push(railBanks);

  const upperHood=component3D(root,'顶部罩、上盖与排风口',[0,1.95,.05],[0,5.0,-1.9],group=>{
    mesh(group,new THREE.BoxGeometry(4.8,.18,2.55),metal(0x7c8d8e),0,0,0);
    mesh(group,new THREE.BoxGeometry(2.45,.65,1.55),metal(0x748688),0,.4,0);
    const outlet=mesh(group,new THREE.CylinderGeometry(.48,.72,.9,4),metal(0x829294),0,1.15,0);outlet.rotation.y=Math.PI/4;
    for(let i=0;i<6;i++)mesh(group,new THREE.CylinderGeometry(.035,.035,.22,12),brass(),-1.65+i*.66,.12,1.1);
  });components.push(upperHood);

  const lowerGrates=component3D(root,'下部格栅与排杂槽',[0,-1.0,.45],[0,-4.0,3.25],group=>{
    for(const x of [-1.55,1.55]){
      const trough=mesh(group,new THREE.BoxGeometry(2.65,.14,1.0),metal(0x748688),x,0,0);trough.rotation.x=-.18;
      for(let i=0;i<12;i++)mesh(group,new THREE.BoxGeometry(.08,.1,.85),dark(),x-1.15+i*.21,.07,0);
      mesh(group,new THREE.BoxGeometry(2.65,.5,.12),metal(0x596d6f),x,-.27,.43);
    }
  });components.push(lowerGrates);

  const frontDoors=component3D(root,'前门、侧门与观察板',[0,0,1.58],[0,.15,4.6],group=>{
    for(const x of [-1.55,1.55]){
      mesh(group,new THREE.BoxGeometry(2.75,2.85,.14),metal(0x7c8d8e),x,0,0);
      mesh(group,new THREE.BoxGeometry(.2,.52,.2),dark(),x+(x<0?.95:-.95),0,0);
      for(let row=0;row<5;row++)for(let col=0;col<7;col++)mesh(group,new THREE.BoxGeometry(.16,.04,.04),dark(),x-.66+col*.22,-1+row*.12,.09);
    }
  });components.push(frontDoors);

  const rearPanels=component3D(root,'后部挡板与检修门',[0,0,-1.58],[0,.15,-4.6],group=>{
    mesh(group,new THREE.BoxGeometry(5.7,2.95,.14),metal(0x748688),0,0,0);
    mesh(group,new THREE.BoxGeometry(2.25,1.25,.08),dark(),-1.25,.45,-.08);
    mesh(group,new THREE.BoxGeometry(.2,.5,.2),green(),1.85,-.15,0);
  });components.push(rearPanels);

  const adjusters=component3D(root,'调节轴、连杆和支座',[0,.05,-.65],[0,.3,-4.1],group=>{
    for(const y of [.65,-.15,-.92]){
      const shaft=mesh(group,new THREE.CylinderGeometry(.07,.07,5.5,24),metal(0xaab4b1,.2),0,y,0);shaft.rotation.z=Math.PI/2;
      for(const x of [-2.9,2.9]){
        const arm=mesh(group,new THREE.BoxGeometry(.55,.13,.22),metal(0x596d6f),x,y,0);arm.rotation.z=x<0?.58:-.58;
        const hub=mesh(group,new THREE.TorusGeometry(.15,.045,10,30),brass(),x,y,0);hub.rotation.y=Math.PI/2;
      }
    }
  });components.push(adjusters);

  root.userData.setExplode=value=>{
    const amount=THREE.MathUtils.clamp(Number(value)||0,0,1);
    components.forEach(item=>item.position.copy(item.userData.closed).lerp(item.userData.exploded,amount));
    root.userData.explode=amount;
  };
  root.userData.setExplode(.76);
  root.scale.setScalar(.62);
  root.position.y=-.28;
  return root;
}

function jwf1102GridAssembly(){
  const root=new THREE.Group();
  const components=[];

  const gridSides=component3D(root,'左右尘格与弧形齿板',[0,0,0],[0,1.75,1.6],group=>{
    for(const x of [-2.75,2.75]){
      const curve=new THREE.CatmullRomCurve3([
        new THREE.Vector3(x,.95,-1.15),
        new THREE.Vector3(x,.15,-1.5),
        new THREE.Vector3(x,-.75,-1.05),
        new THREE.Vector3(x,-1.05,-.25),
      ]);
      mesh(group,new THREE.TubeGeometry(curve,36,.12,14,false),metal(0x65787a));
      for(let i=0;i<15;i++){
        const t=i/14,pos=curve.getPoint(t),tangent=curve.getTangent(t);
        const tooth=mesh(group,new THREE.BoxGeometry(.08,.42,.08),metal(0xaab4b1,.18),pos.x,pos.y,pos.z);
        tooth.rotation.x=Math.atan2(tangent.z,tangent.y)+.45;
      }
      const upper=mesh(group,new THREE.CylinderGeometry(.16,.16,.42,28),brass(),x,1.08,-1.12);upper.rotation.z=Math.PI/2;
      const lower=mesh(group,new THREE.CylinderGeometry(.16,.16,.42,28),brass(),x,-1.12,-.2);lower.rotation.z=Math.PI/2;
    }
  });components.push(gridSides);

  const crossRods=component3D(root,'尘棒与横向联接杆',[0,-.05,-.55],[0,-2.8,2.5],group=>{
    const rods=[[.78,-1.08],[.38,-1.36],[-.05,-1.42],[-.5,-1.25],[-.86,-.85]];
    rods.forEach(([y,z],index)=>{
      const rod=mesh(group,new THREE.CylinderGeometry(index<2?.06:.075,index<2?.06:.075,5.45,22),metal(0xaab4b1,.2),0,y,z);rod.rotation.z=Math.PI/2;
      for(const x of [-2.68,2.68]){
        const ring=mesh(group,new THREE.TorusGeometry(.11,.025,8,28),brass(),x,y,z);ring.rotation.y=Math.PI/2;
      }
    });
  });components.push(crossRods);

  const endDisks=component3D(root,'左右端盘、轴套与调节板',[0,-.15,-.65],[0,.2,-4.0],group=>{
    for(const x of [-3.05,3.05]){
      const disk=mesh(group,new THREE.CylinderGeometry(.62,.62,.16,48),metal(0x748688),x,0,0);disk.rotation.z=Math.PI/2;
      const hub=mesh(group,new THREE.CylinderGeometry(.2,.2,.45,28),brass(),x+(x<0?-.18:.18),0,0);hub.rotation.z=Math.PI/2;
      for(let i=0;i<6;i++){
        const angle=i*Math.PI*2/6;
        const bolt=mesh(group,new THREE.CylinderGeometry(.035,.035,.22,12),dark(),x,Math.cos(angle)*.42,Math.sin(angle)*.42);bolt.rotation.z=Math.PI/2;
      }
      mesh(group,new THREE.BoxGeometry(.18,.9,.42),metal(0x596d6f),x,.72,0);
    }
  });components.push(endDisks);

  const handles=component3D(root,'调节手柄与拉杆',[0,-.3,-.55],[4.75,.5,-2.7],group=>{
    for(const x of [-1.15,1.15]){
      const rod=mesh(group,new THREE.CylinderGeometry(.055,.055,1.75,20),metal(0xaab4b1,.18),x,0,0);rod.rotation.z=x<0?.7:-.7;
      mesh(group,new THREE.SphereGeometry(.13,18,12),dark(),x+(x<0?-.56:.56),.66,0);
      const eye=mesh(group,new THREE.TorusGeometry(.14,.04,10,28),brass(),x+(x<0?.56:-.56),-.66,0);eye.rotation.y=Math.PI/2;
    }
  });components.push(handles);

  const fasteners=component3D(root,'挡圈、垫圈和紧固件',[0,0,0],[0,0,0],group=>{
    for(const x of [-3.35,-3.58,3.35,3.58]){
      const ring=mesh(group,new THREE.TorusGeometry(.18,.03,8,30),x%1>.4?brass():dark(),x,0,0);ring.rotation.y=Math.PI/2;
    }
  });components.push(fasteners);

  root.userData.setExplode=value=>{
    const amount=THREE.MathUtils.clamp(Number(value)||0,0,1);
    components.forEach(item=>item.position.copy(item.userData.closed).lerp(item.userData.exploded,amount));
    root.userData.explode=amount;
  };
  root.userData.setExplode(.76);
  root.scale.setScalar(.72);
  root.position.y=-.2;
  return root;
}

function fa103bProductAssembly(){
  const root=new THREE.Group();
  const components=[];

  const frame=component3D(root,'1 机架部件',[0,0,0],[0,-.7,-.8],group=>{
    for(const x of [-2.15,2.15])for(const z of [-1.45,1.45])mesh(group,new THREE.BoxGeometry(.18,3.15,.18),metal(0x596d6f),x,0,z);
    for(const y of [-1.48,1.48]){
      for(const z of [-1.45,1.45])mesh(group,new THREE.BoxGeometry(4.45,.18,.18),metal(0x596d6f),0,y,z);
      for(const x of [-2.15,2.15])mesh(group,new THREE.BoxGeometry(.18,.18,2.9),metal(0x596d6f),x,y,0);
    }
    mesh(group,new THREE.BoxGeometry(4.1,.12,2.65),metal(0x748688),0,-1.38,0);
    mesh(group,new THREE.BoxGeometry(4.08,2.75,.12),metal(0x718385),0,0,-1.42);
    for(const x of [-1.05,1.05])mesh(group,new THREE.BoxGeometry(.12,2.7,.12),metal(0x526668),x,0,1.46);
  });components.push(frame);

  const beaters=component3D(root,'2 双打手部件',[0,.45,.1],[3.85,2.75,1.7],group=>{
    for(const z of [-.62,.62]){
      const drum=mesh(group,new THREE.CylinderGeometry(.48,.48,3.65,56),metal(0x65787a),0,0,z);drum.rotation.z=Math.PI/2;
      const shaft=mesh(group,new THREE.CylinderGeometry(.09,.09,4.15,28),metal(0xb7c0bd,.2),0,0,z);shaft.rotation.z=Math.PI/2;
      for(let lane=0;lane<6;lane++)for(let col=0;col<9;col++){
        const angle=lane*Math.PI/3+(col%2)*.24;
        const spike=mesh(group,new THREE.CylinderGeometry(.025,.055,.32,10),metal(0xa8b2af,.18),-1.5+col*.38,Math.cos(angle)*.56,z+Math.sin(angle)*.56);
        spike.rotation.x=Math.PI/2-angle;
      }
      for(const x of [-1.92,1.92]){const disk=mesh(group,new THREE.CylinderGeometry(.58,.58,.16,42),metal(0x829294),x,0,z);disk.rotation.z=Math.PI/2}
    }
  });components.push(beaters);

  const grids=component3D(root,'3 尘格部件',[0,-.55,-.1],[-4.25,.1,2.2],group=>{
    for(const z of [-.65,.65]){
      for(const x of [-1.85,1.85]){
        const curve=new THREE.CatmullRomCurve3([
          new THREE.Vector3(x,.48,z-.48),new THREE.Vector3(x,-.05,z-.72),new THREE.Vector3(x,-.58,z-.48),
        ]);
        mesh(group,new THREE.TubeGeometry(curve,28,.08,12,false),metal(0x596d6f));
      }
      for(let i=0;i<13;i++){
        const angle=Math.PI*(i+1)/14;
        mesh(group,new THREE.BoxGeometry(3.7,.055,.08),metal(0x9ca8a6,.18),0,-.08-Math.sin(angle)*.52,z+Math.cos(angle)*.52);
      }
    }
  });components.push(grids);

  const frontDoor=component3D(root,'前门与观察板',[0,0,1.5],[0,-.2,4.2],group=>{
    mesh(group,new THREE.BoxGeometry(4.0,2.72,.14),metal(0x7c8d8e),0,0,0);
    mesh(group,new THREE.BoxGeometry(1.18,.58,.08),glass(),-.75,.2,.08);
    for(let row=0;row<7;row++)for(let col=0;col<6;col++)mesh(group,new THREE.BoxGeometry(.15,.035,.035),dark(),.62+col*.22,-.72+row*.13,.1);
    mesh(group,new THREE.BoxGeometry(.18,.52,.18),green(),1.62,.05,.1);
  });components.push(frontDoor);

  const outlets=component3D(root,'4—7 出棉口、方接圆、弯管与软管',[0,1.7,-.1],[-1.6,4.75,-.25],group=>{
    mesh(group,new THREE.BoxGeometry(1.35,.18,1.05),metal(0x748688),-.95,0,0);
    const transition=mesh(group,new THREE.CylinderGeometry(.38,.72,.9,4),metal(0x829294),-.25,.52,0);transition.rotation.y=Math.PI/4;
    const elbow=new THREE.CatmullRomCurve3([new THREE.Vector3(.05,.85,0),new THREE.Vector3(.5,1.2,0),new THREE.Vector3(1.0,1.1,0)]);
    mesh(group,new THREE.TubeGeometry(elbow,36,.29,28,false),metal(0x758789));
    const hose=new THREE.CatmullRomCurve3([new THREE.Vector3(1.0,1.1,0),new THREE.Vector3(1.6,.95,.15),new THREE.Vector3(2.05,.45,.25)]);
    mesh(group,new THREE.TubeGeometry(hose,40,.25,24,false),rubber());
  });components.push(outlets);

  const drive=component3D(root,'电机与传动端',[2.28,.25,.55],[5.05,1.15,.35],group=>{
    mesh(group,new THREE.BoxGeometry(.85,.68,1.0),dark(),0,0,0);
    for(let i=0;i<7;i++)mesh(group,new THREE.BoxGeometry(.9,.045,1.04),metal(0x596d6f),0,-.25+i*.085,0);
    const pulley=mesh(group,new THREE.CylinderGeometry(.38,.38,.25,36),metal(0x65787a),-.55,.05,0);pulley.rotation.z=Math.PI/2;
  });components.push(drive);

  root.userData.setExplode=value=>{
    const amount=THREE.MathUtils.clamp(Number(value)||0,0,1);
    components.forEach(item=>item.position.copy(item.userData.closed).lerp(item.userData.exploded,amount));
    root.userData.explode=amount;
  };
  root.userData.setExplode(.76);
  root.scale.setScalar(.64);
  root.position.y=-.3;
  return root;
}

function fa103bFrameAssembly(){
  const root=new THREE.Group();
  const components=[];

  const skeleton=component3D(root,'机架骨架与底座',[0,0,0],[0,-1.1,-.8],group=>{
    for(const x of [-2.45,2.45])for(const z of [-1.55,1.55])mesh(group,new THREE.BoxGeometry(.18,3.4,.18),metal(0x596d6f),x,0,z);
    for(const y of [-1.62,0,1.62]){
      for(const z of [-1.55,1.55])mesh(group,new THREE.BoxGeometry(5.05,.18,.18),metal(0x596d6f),0,y,z);
      for(const x of [-2.45,2.45])mesh(group,new THREE.BoxGeometry(.18,.18,3.1),metal(0x596d6f),x,y,0);
    }
    for(const x of [-1.25,1.25])mesh(group,new THREE.BoxGeometry(.16,3.15,.16),metal(0x65787a),x,0,-1.55);
  });components.push(skeleton);

  const leftPanels=component3D(root,'左侧门板与锁具',[-2.55,0,0],[-5.25,.2,1.5],group=>{
    for(const z of [-.82,.82])mesh(group,new THREE.BoxGeometry(.14,3.0,1.42),metal(0x748688),0,0,z);
    mesh(group,new THREE.BoxGeometry(.2,.55,.2),green(),-.12,.05,.75);
    for(const y of [-1.15,1.15])mesh(group,new THREE.BoxGeometry(.22,.18,.42),dark(),-.1,y,-1.42);
  });components.push(leftPanels);

  const rightPanels=component3D(root,'右侧门板与检修口',[2.55,0,0],[5.25,.2,1.5],group=>{
    mesh(group,new THREE.BoxGeometry(.14,3.0,2.95),metal(0x7c8d8e),0,0,0);
    mesh(group,new THREE.BoxGeometry(.08,.8,1.15),dark(),.09,.35,.45);
    mesh(group,new THREE.BoxGeometry(.2,.55,.2),green(),.12,-.15,-1.05);
  });components.push(rightPanels);

  const frontPanels=component3D(root,'前门、观察窗与通风板',[0,0,1.62],[0,-.1,4.65],group=>{
    for(const x of [-1.25,1.25]){
      mesh(group,new THREE.BoxGeometry(2.3,2.95,.14),metal(0x7c8d8e),x,0,0);
      for(let row=0;row<7;row++)for(let col=0;col<7;col++)mesh(group,new THREE.BoxGeometry(.15,.035,.035),dark(),x-.68+col*.22,-1+row*.12,.1);
    }
    mesh(group,new THREE.BoxGeometry(1.2,.62,.08),glass(),-.75,.58,.09);
  });components.push(frontPanels);

  const rearPanels=component3D(root,'后挡板与接线盖',[0,0,-1.62],[0,.15,-4.65],group=>{
    mesh(group,new THREE.BoxGeometry(4.78,2.95,.14),metal(0x718385),0,0,0);
    mesh(group,new THREE.BoxGeometry(1.25,.82,.1),dark(),1.3,.32,-.08);
    for(const x of [-1.8,-.6,.6,1.8])mesh(group,new THREE.BoxGeometry(.7,.08,.24),metal(0x596d6f),x,-1.25,.06);
  });components.push(rearPanels);

  const upperDeck=component3D(root,'顶部导板、盖板与风口',[0,1.75,0],[0,4.65,-1.8],group=>{
    mesh(group,new THREE.BoxGeometry(4.8,.15,2.9),metal(0x829294),0,0,0);
    for(const x of [-1.25,1.25]){
      mesh(group,new THREE.BoxGeometry(1.8,.18,1.15),metal(0x748688),x,.32,0);
      const port=mesh(group,new THREE.TorusGeometry(.38,.07,14,42),dark(),x,.44,0);port.rotation.x=Math.PI/2;
    }
  });components.push(upperDeck);

  const internalRails=component3D(root,'内部撑杆、导轨与安装座',[0,.15,0],[0,3.45,2.7],group=>{
    for(const y of [-1.1,-.45,.2,.85])for(const z of [-.9,.9])mesh(group,new THREE.BoxGeometry(4.65,.12,.16),metal(0x65787a),0,y,z);
    for(const x of [-2.15,2.15])for(const y of [-.75,.65])mesh(group,new THREE.BoxGeometry(.38,.24,.55),brass(),x,y,0);
  });components.push(internalRails);

  root.userData.setExplode=value=>{
    const amount=THREE.MathUtils.clamp(Number(value)||0,0,1);
    components.forEach(item=>item.position.copy(item.userData.closed).lerp(item.userData.exploded,amount));
    root.userData.explode=amount;
  };
  root.userData.setExplode(.76);
  root.scale.setScalar(.62);
  root.position.y=-.25;
  return root;
}

function fa103bDoubleBeaterAssembly(){
  const root=new THREE.Group();
  const components=[];

  const drums=component3D(root,'1/2 双角钉打手结合件',[0,0,0],[0,1.8,1.45],group=>{
    for(const z of [-.72,.72]){
      const body=mesh(group,new THREE.CylinderGeometry(.5,.5,4.15,56),metal(0x65787a),0,0,z);body.rotation.z=Math.PI/2;
      for(let lane=0;lane<8;lane++)for(let col=0;col<10;col++){
        const angle=lane*Math.PI/4+(col%2)*.18;
        const spike=mesh(group,new THREE.CylinderGeometry(.022,.05,.34,9),metal(0xaab4b1,.16),-1.72+col*.38,Math.cos(angle)*.56,z+Math.sin(angle)*.56);
        spike.rotation.x=Math.PI/2-angle;
      }
      for(const x of [-2.08,2.08]){const end=mesh(group,new THREE.CylinderGeometry(.59,.59,.16,42),metal(0x829294),x,0,z);end.rotation.z=Math.PI/2}
    }
  });components.push(drums);

  const shafts=component3D(root,'打手轴与端部法兰',[0,0,0],[0,-2.7,2.45],group=>{
    for(const z of [-.72,.72]){
      const shaft=mesh(group,new THREE.CylinderGeometry(.09,.09,5.3,28),metal(0xb7c0bd,.18),0,0,z);shaft.rotation.z=Math.PI/2;
      for(const x of [-2.28,2.28]){
        const flange=mesh(group,new THREE.CylinderGeometry(.42,.42,.22,42),metal(0x748688),x,0,z);flange.rotation.z=Math.PI/2;
        const bearing=mesh(group,new THREE.TorusGeometry(.23,.1,16,42),brass(),x+(x<0?-.16:.16),0,z);bearing.rotation.y=Math.PI/2;
      }
    }
  });components.push(shafts);

  const leftDrive=component3D(root,'左端带轮、V带与张紧组',[-2.55,0,0],[-5.25,1.1,-.3],group=>{
    for(const z of [-.72,.72]){const pulley=mesh(group,new THREE.CylinderGeometry(.5,.5,.25,42),dark(),0,0,z);pulley.rotation.z=Math.PI/2}
    const belt=mesh(group,new THREE.TorusGeometry(.85,.055,12,64),rubber(),-.18,0,0);belt.rotation.y=Math.PI/2;belt.scale.z=.7;
    mesh(group,new THREE.BoxGeometry(.72,.18,.45),metal(0x596d6f),-.25,1.05,0);
    const tension=mesh(group,new THREE.CylinderGeometry(.2,.2,.2,32),metal(0x829294),-.25,.75,0);tension.rotation.z=Math.PI/2;
  });components.push(leftDrive);

  const rightBearings=component3D(root,'右端轴承座、轴承盖与挡圈',[2.55,0,0],[5.2,.95,1.05],group=>{
    for(const z of [-.72,.72]){
      mesh(group,new THREE.BoxGeometry(.45,.82,.82),metal(0x596d6f),0,0,z);
      const cover=mesh(group,new THREE.CylinderGeometry(.38,.38,.22,42),metal(0x748688),.32,0,z);cover.rotation.z=Math.PI/2;
      const ring=mesh(group,new THREE.TorusGeometry(.22,.045,10,32),brass(),.5,0,z);ring.rotation.y=Math.PI/2;
    }
  });components.push(rightBearings);

  const motor=component3D(root,'电动机、电机带轮与窄V带',[2.1,-1.2,.15],[4.35,-3.15,-1.9],group=>{
    mesh(group,new THREE.BoxGeometry(1.15,.82,.9),dark(),0,0,0);
    for(let i=0;i<8;i++)mesh(group,new THREE.BoxGeometry(1.18,.045,.94),metal(0x596d6f),0,-.32+i*.09,0);
    const axle=mesh(group,new THREE.CylinderGeometry(.09,.09,.72,20),metal(0xaab4b1,.2),-.8,0,0);axle.rotation.z=Math.PI/2;
    const pulley=mesh(group,new THREE.CylinderGeometry(.28,.28,.24,36),metal(0x65787a),-1.15,0,0);pulley.rotation.z=Math.PI/2;
    const belt=mesh(group,new THREE.TorusGeometry(.75,.045,10,56),rubber(),-1.05,.55,0);belt.rotation.y=Math.PI/2;belt.scale.z=.58;
  });components.push(motor);

  root.userData.setExplode=value=>{
    const amount=THREE.MathUtils.clamp(Number(value)||0,0,1);
    components.forEach(item=>item.position.copy(item.userData.closed).lerp(item.userData.exploded,amount));
    root.userData.explode=amount;
  };
  root.userData.setExplode(.76);
  root.scale.setScalar(.66);
  root.position.y=-.28;
  return root;
}

function fa103bGridAssembly(){
  const root=new THREE.Group();
  const components=[];

  const sidePlates=component3D(root,'左右侧板与长圆孔板',[0,0,0],[0,2.35,1.75],group=>{
    for(const x of [-2.9,2.9]){
      mesh(group,new THREE.BoxGeometry(.16,1.65,2.0),metal(0x718385),x,0,0);
      for(const y of [-.45,.45]){
        const opening=mesh(group,new THREE.TorusGeometry(.3,.065,12,42),dark(),x+(x<0?-.1:.1),y,0);opening.rotation.y=Math.PI/2;opening.scale.z=2.25;
        const pane=mesh(group,new THREE.SphereGeometry(.28,28,18),glass(),x,y,0);pane.scale.set(.08,1,2.15);
      }
    }
  });components.push(sidePlates);

  const longRods=component3D(root,'长尘棒与联接杆',[0,.05,0],[0,-2.75,2.8],group=>{
    for(const [y,z,r] of [[.62,-.58,.07],[.32,-.22,.075],[-.08,.18,.08],[-.5,.56,.075]]){
      const rod=mesh(group,new THREE.CylinderGeometry(r,r,5.65,24),metal(0xaab4b1,.18),0,y,z);rod.rotation.z=Math.PI/2;
      for(const x of [-2.72,2.72]){const ring=mesh(group,new THREE.TorusGeometry(.12,.025,8,28),brass(),x,y,z);ring.rotation.y=Math.PI/2}
    }
  });components.push(longRods);

  const curvedLinks=component3D(root,'弧形三角针板结合件',[0,-.3,-.55],[0,-1.25,-3.6],group=>{
    for(const z of [-.55,.55]){
      const curve=new THREE.CatmullRomCurve3([
        new THREE.Vector3(-2.6,.52,z),new THREE.Vector3(-1.3,.08,z),new THREE.Vector3(0,-.42,z),new THREE.Vector3(1.3,.08,z),new THREE.Vector3(2.6,.52,z),
      ]);
      mesh(group,new THREE.TubeGeometry(curve,30,.075,12,false),metal(0x596d6f));
      for(let i=0;i<17;i++){
        const pos=curve.getPoint(i/16);
        const needle=mesh(group,new THREE.CylinderGeometry(.018,.055,.25,8),metal(0xaab4b1,.16),pos.x,pos.y+.14,pos.z);
        needle.rotation.z=(i%2?-.14:.14);
      }
    }
  });components.push(curvedLinks);

  const adjusters=component3D(root,'操作杆、偏心轴、指针与手柄',[0,0,0],[-4.7,-.35,-1.8],group=>{
    for(const z of [-.55,.55]){
      const disk=mesh(group,new THREE.CylinderGeometry(.38,.38,.18,42),metal(0x748688),-3.18,0,z);disk.rotation.z=Math.PI/2;
      const hub=mesh(group,new THREE.CylinderGeometry(.15,.15,.42,28),brass(),-3.38,0,z);hub.rotation.z=Math.PI/2;
    }
    const rod=mesh(group,new THREE.CylinderGeometry(.055,.055,1.45,20),metal(0xaab4b1,.18),-3.55,-.72,-.55);rod.rotation.z=-.55;
    mesh(group,new THREE.SphereGeometry(.16,18,12),dark(),-3.92,-1.3,-.55);
    mesh(group,new THREE.BoxGeometry(.08,.72,.22),metal(0x596d6f),-3.52,.52,.55).rotation.z=.35;
    const pointer=mesh(group,new THREE.ConeGeometry(.11,.42,3),green(),-3.72,.86,.55);pointer.rotation.z=-.4;
    mesh(group,new THREE.BoxGeometry(.52,.24,.48),metal(0x65787a),-3.2,.95,.55);
  });components.push(adjusters);

  const spacers=component3D(root,'垫圈、挡圈与紧固件',[0,0,0],[0,0,0],group=>{
    for(const x of [-3.45,-3.68,3.45,3.68])for(const z of [-.55,.55]){
      const ring=mesh(group,new THREE.TorusGeometry(.15,.03,8,28),x<0?brass():dark(),x,0,z);ring.rotation.y=Math.PI/2;
    }
  });components.push(spacers);

  root.userData.setExplode=value=>{
    const amount=THREE.MathUtils.clamp(Number(value)||0,0,1);
    components.forEach(item=>item.position.copy(item.userData.closed).lerp(item.userData.exploded,amount));
    root.userData.explode=amount;
  };
  root.userData.setExplode(.76);
  root.scale.setScalar(.7);
  root.position.y=-.25;
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
  if(assembly.model==='feedAssembly')return feedAssembly();
  if(assembly.model==='beaterAssembly')return beaterAssembly();
  if(assembly.model==='eliminatingAssembly')return eliminatingAssembly();
  if(assembly.model==='safetyFrameAssembly')return safetyFrameAssembly();
  if(assembly.model==='couplingAssembly')return couplingAssembly();
  if(assembly.model==='frameBaseAssembly')return frameBaseAssembly();
  if(assembly.model==='dedustAssembly')return dedustAssembly();
  if(assembly.model==='jwf1102ProductAssembly')return jwf1102ProductAssembly();
  if(assembly.model==='jwf1102FrameAssembly')return jwf1102FrameAssembly();
  if(assembly.model==='jwf1102GridAssembly')return jwf1102GridAssembly();
  if(assembly.model==='fa103bProductAssembly')return fa103bProductAssembly();
  if(assembly.model==='fa103bFrameAssembly')return fa103bFrameAssembly();
  if(assembly.model==='fa103bDoubleBeaterAssembly')return fa103bDoubleBeaterAssembly();
  if(assembly.model==='fa103bGridAssembly')return fa103bGridAssembly();
  throw new Error(`尚未实现总成模型：${assembly.code}`);
}
