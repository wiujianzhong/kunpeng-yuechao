import * as THREE from 'three';

const painted=()=>new THREE.MeshStandardMaterial({color:0x718486,metalness:.42,roughness:.38});
const lightMetal=()=>new THREE.MeshStandardMaterial({color:0xaebbb8,metalness:.72,roughness:.25});
const darkMetal=()=>new THREE.MeshStandardMaterial({color:0x465e60,metalness:.62,roughness:.31});
const accent=()=>new THREE.MeshStandardMaterial({color:0x70ad47,metalness:.34,roughness:.35});
const brass=()=>new THREE.MeshStandardMaterial({color:0xb69a55,metalness:.7,roughness:.28});
const rubber=()=>new THREE.MeshStandardMaterial({color:0x34494a,metalness:.08,roughness:.72});

function mesh(parent,geometry,material,position=[0,0,0],rotation=[0,0,0]){
  const object=new THREE.Mesh(geometry,material);
  object.position.fromArray(position);object.rotation.set(...rotation);parent.add(object);return object;
}

function component(parent,label,closed,exploded,build){
  const group=new THREE.Group();group.userData.componentLabel=label;
  group.userData.closed=new THREE.Vector3(...closed);group.userData.exploded=new THREE.Vector3(...exploded);
  group.position.copy(group.userData.closed);build(group);parent.add(group);return group;
}

function cylinder(parent,radius,length,material,position=[0,0,0],axis='y'){
  const object=mesh(parent,new THREE.CylinderGeometry(radius,radius,length,40),material,position);
  if(axis==='x')object.rotation.z=Math.PI/2;
  if(axis==='z')object.rotation.x=Math.PI/2;
  return object;
}

function wheel(parent,radius,width,position=[0,0,0],axis='x',material=darkMetal()){
  cylinder(parent,radius,width,material,position,axis);
  cylinder(parent,radius*.28,width*1.5,brass(),position,axis);
  const ring=mesh(parent,new THREE.TorusGeometry(radius*.72,radius*.08,12,52),lightMetal(),position);
  if(axis==='x')ring.rotation.y=Math.PI/2;
  else if(axis==='y')ring.rotation.x=Math.PI/2;
  return ring;
}

function beamXZ(parent,a,b,height=.22,depth=.28,material=painted()){
  const dx=b[0]-a[0],dz=b[1]-a[1],length=Math.hypot(dx,dz);
  return mesh(parent,new THREE.BoxGeometry(length,height,depth),material,[(a[0]+b[0])/2,0,(a[1]+b[1])/2],[0,-Math.atan2(dz,dx),0]);
}

function curvedTube(parent,points,radius=.08,material=accent()){
  const curve=new THREE.CatmullRomCurve3(points.map(point=>new THREE.Vector3(...point)));
  return mesh(parent,new THREE.TubeGeometry(curve,72,radius,12,false),material);
}

function horizontalPlate(parent,points,thickness,material,position=[0,0,0]){
  const shape=new THREE.Shape();shape.moveTo(points[0][0],points[0][1]);
  points.slice(1).forEach(point=>shape.lineTo(point[0],point[1]));shape.closePath();
  const geometry=new THREE.ExtrudeGeometry(shape,{depth:thickness,bevelEnabled:false});geometry.center();
  return mesh(parent,geometry,material,position,[Math.PI/2,0,0]);
}

function finish(root,components,{scale=.7,y=-.3,rotationY=.18,explode=.76}={}){
  root.userData.setExplode=value=>{
    const amount=THREE.MathUtils.clamp(Number(value)||0,0,1);
    components.forEach(item=>item.position.copy(item.userData.closed).lerp(item.userData.exploded,amount));
    root.userData.explode=amount;
  };
  root.userData.setExplode(explode);root.scale.setScalar(scale);root.position.y=y;root.rotation.y=rotationY;
  return root;
}

function refinedProduct(){
  const root=new THREE.Group(),components=[];
  components.push(component(root,'2/7/10 异形顶罩、围框与立柱',[0,1.75,0],[0,4.1,-1.4],group=>{
    horizontalPlate(group,[[-4.8,-1.1],[-4.2,-1.9],[3.7,-1.9],[4.75,-1.1],[4.55,1.4],[3.8,1.9],[-3.45,2.2],[-4.8,1.25]],.26,painted());
    for(const [x,z] of [[-4.35,-1.05],[-3.95,-1.65],[-4.1,1.2],[-1.45,-1.7],[1.6,-1.7],[4.2,-.95],[4.05,1.25],[3.35,1.65]]){
      mesh(group,new THREE.BoxGeometry(.16,4.25,.16),darkMetal(),[x,-2.05,z]);
      cylinder(group,.12,.5,darkMetal(),[x,-4.35,z]);
    }
    for(const z of [-1.72,1.72])mesh(group,new THREE.BoxGeometry(8.2,.2,.16),darkMetal(),[-.1,-.25,z]);
  }));
  components.push(component(root,'1/3/4/5/6 圈条、压辊与中心机构',[.7,-1.05,.15],[.8,.35,4.4],group=>{
    mesh(group,new THREE.BoxGeometry(4.2,.24,2.65),painted(),[0,-1.35,0]);
    mesh(group,new THREE.CylinderGeometry(1.18,1.26,.24,72),lightMetal(),[.6,-1.1,0]);
    cylinder(group,.48,2.75,darkMetal(),[.6,.25,0]);
    mesh(group,new THREE.BoxGeometry(1.55,1.25,1.3),painted(),[.6,1.25,0]);
    wheel(group,.54,.28,[-.35,1.55,.1],'x',accent());wheel(group,.48,.28,[1.55,1.4,.1],'x');
    beamXZ(group,[-1.9,.05],[1.85,.15],.2,.42,accent());
  }));
  components.push(component(root,'5/8 顶部喂入与双导条轮',[-1.3,2.25,-.45],[-1.4,4.8,2.9],group=>{
    mesh(group,new THREE.BoxGeometry(2.5,.85,1.65),painted(),[0,0,0]);
    cylinder(group,.15,2.2,lightMetal(),[0,1.5,0]);
    beamXZ(group,[-2.4,0],[2.4,0],.15,.22,darkMetal()).position.y=2.35;
    for(const x of [-2.45,2.45])wheel(group,.48,.24,[x,2.35,0],'z',lightMetal());
  }));
  components.push(component(root,'8/11 弧形导条与转架',[0,-.55,.55],[-4.7,-.6,2.6],group=>{
    curvedTube(group,[[-4,0,0],[-2,.25,1.05],[0,.35,1.4],[2,.25,1.05],[4,0,0]],.1,accent());
    for(const angle of [0,Math.PI*.66,Math.PI*1.33]){
      const end=[Math.cos(angle)*2.05,Math.sin(angle)*2.05];beamXZ(group,[0,0],end,.18,.27,lightMetal());
      cylinder(group,.08,1.65,darkMetal(),[end[0],-.85,end[1]]);
      cylinder(group,.24,.34,rubber(),[end[0],-1.75,end[1]]);
    }
  }));
  return finish(root,components,{scale:.57,y:-.25,rotationY:.15});
}

function refinedCalenderRoll(){
  const root=new THREE.Group(),components=[];
  components.push(component(root,'6 大型叉形罗拉上座',[0,.8,0],[0,3.35,-1.4],group=>{
    beamXZ(group,[-1.35,.8],[1.35,.8],.5,.72,painted());
    beamXZ(group,[-1.35,.8],[-2.45,-2.0],.52,.72,painted());
    beamXZ(group,[1.35,.8],[2.45,-2.0],.52,.72,painted());
    for(const x of [-2.4,2.4])mesh(group,new THREE.BoxGeometry(.72,1.3,.95),painted(),[x,-.25,-1.75]);
    mesh(group,new THREE.BoxGeometry(1.05,.8,1.2),darkMetal(),[0,-.15,.75]);
  }));
  components.push(component(root,'7 罗拉下座与加压支座',[0,-1.15,-.35],[0,-3.6,-1.8],group=>{
    mesh(group,new THREE.BoxGeometry(3.25,1.55,2.25),painted());
    for(const x of [-1.55,1.55])mesh(group,new THREE.BoxGeometry(.7,1.05,1.1),darkMetal(),[x,.25,0]);
    mesh(group,new THREE.BoxGeometry(1.2,.65,1.15),accent(),[0,.95,0]);
  }));
  components.push(component(root,'3/4/14/23/24 左两罗拉与右三同步带轮',[0,.05,0],[0,.8,4.7],group=>{
    for(const y of [-.7,.7]){
      cylinder(group,.18,5.8,lightMetal(),[0,y,0],'x');
      cylinder(group,y<0?.72:.62,.42,painted(),[-3.05,y,0],'x');
    }
    wheel(group,.72,.34,[3.05,-.82,0],'x',accent());
    wheel(group,.62,.34,[3.05,0,.25],'x');
    wheel(group,.76,.34,[3.05,.82,0],'x',accent());
  }));
  components.push(component(root,'1/2/5/8 拉杆、心轴与受压弹簧',[0,-.35,.55],[-4.7,-.2,2.2],group=>{
    cylinder(group,.14,5.1,lightMetal(),[0,.75,0],'x');
    const turns=Array.from({length:52},(_,index)=>{const angle=index*Math.PI*10/51;return [Math.cos(angle)*.34,(index-25.5)*.045,Math.sin(angle)*.34]});
    curvedTube(group,turns,.055,brass());
    cylinder(group,.12,2.7,darkMetal(),[0,0,0]);
  }));
  return finish(root,components,{scale:.7,y:-.25,rotationY:.2});
}

function refinedBrokenEnd(){
  const root=new THREE.Group(),components=[];
  components.push(component(root,'2/5/11 长底板、导轨与钢丝绳',[-.35,-.55,0],[0,-3.0,-1.4],group=>{
    mesh(group,new THREE.BoxGeometry(7.4,.22,1.0),painted());
    for(const z of [-.34,.34])cylinder(group,.055,7.0,lightMetal(),[0,.22,z],'x');
    curvedTube(group,[[-3.55,.3,.45],[-1.3,.5,.5],[1.5,.28,.42],[3.55,.5,.45]],.035,rubber());
  }));
  components.push(component(root,'15/16/44/46 长行程气缸与安装座',[-2.1,.1,0],[-5.1,.2,-1.2],group=>{
    mesh(group,new THREE.BoxGeometry(2.25,1.3,1.25),darkMetal(),[-.55,0,0]);
    cylinder(group,.34,2.15,painted(),[1.45,0,0],'x');
    cylinder(group,.13,2.9,lightMetal(),[3.9,0,0],'x');
    for(const z of [-.42,.42])cylinder(group,.1,1.05,brass(),[-.8,.9,z]);
    mesh(group,new THREE.BoxGeometry(1.45,.18,1.35),painted(),[-.6,-.85,0]);
  }));
  components.push(component(root,'4/7/9/22 喇叭口、固定座与罩壳',[2.2,.5,.05],[4.8,2.4,1.7],group=>{
    const profile=[new THREE.Vector2(.24,-.6),new THREE.Vector2(.4,-.35),new THREE.Vector2(.78,.15),new THREE.Vector2(.9,.48),new THREE.Vector2(.55,.7),new THREE.Vector2(.3,.45)];
    mesh(group,new THREE.LatheGeometry(profile,56),accent(),[0,0,0]);
    mesh(group,new THREE.CylinderGeometry(.98,.98,.32,64),darkMetal(),[0,-.78,0]);
    mesh(group,new THREE.BoxGeometry(2.3,.2,2.1),painted(),[0,-1.2,0]);
    mesh(group,new THREE.BoxGeometry(2.65,.18,2.2),painted(),[0,2.05,0]);
    mesh(group,new THREE.BoxGeometry(1.95,.85,1.7),painted(),[0,1.15,0]);
  }));
  components.push(component(root,'13/17/20/43/45 导轮与气管',[-.1,.2,.5],[-3.6,2.2,2.2],group=>{
    wheel(group,.48,.24,[2.2,.25,0],'z',lightMetal());
    curvedTube(group,[[-3,0,0],[-1.5,.55,.2],[.5,.45,-.1],[2.7,1,.15]],.075,rubber());
    for(const x of [-3,2.7])cylinder(group,.14,.4,brass(),[x,x<0?0:1,x<0?0:.15],'x');
    mesh(group,new THREE.BoxGeometry(1.35,.62,.78),darkMetal(),[-1.3,-1.2,0]);
    for(const x of [-1.72,-1.3,-.88])cylinder(group,.1,.42,brass(),[x,-1.62,0]);
  }));
  return finish(root,components,{scale:.69,y:-.25,rotationY:.12});
}

function refinedCanChanging(){
  const root=new THREE.Group(),components=[];
  components.push(component(root,'2 完整高箱体结合件',[0,0,0],[3.8,.2,-1.8],group=>{
    mesh(group,new THREE.BoxGeometry(3.55,5.0,.2),painted(),[0,0,-1.15]);
    for(const x of [-1.68,1.68])mesh(group,new THREE.BoxGeometry(.2,5.0,2.25),painted(),[x,0,0]);
    mesh(group,new THREE.BoxGeometry(3.5,.2,2.2),darkMetal(),[0,-2.4,0]);
    mesh(group,new THREE.BoxGeometry(3.5,.2,2.2),painted(),[0,2.4,0]);
    mesh(group,new THREE.BoxGeometry(1.05,.5,.95),darkMetal(),[1.05,-1.95,-.45]);
  }));
  components.push(component(root,'3/6/31/34 换筒轴与减速电机',[-.15,-.55,-.25],[-3.8,-.4,-1.2],group=>{
    mesh(group,new THREE.BoxGeometry(1.5,1.35,1.2),darkMetal(),[0,-1.35,0]);
    cylinder(group,.46,1.5,accent(),[0,-.15,0]);
    cylinder(group,.16,4.5,lightMetal(),[0,2.35,0]);
    mesh(group,new THREE.CylinderGeometry(.56,.56,1.25,48),painted(),[1.05,-.9,0]);
  }));
  components.push(component(root,'5/9/10/13/32/33 上下带轮与轴承',[0,2.0,-.25],[0,5.6,2.8],group=>{
    wheel(group,.78,.32,[0,-.65,0],'y',accent());wheel(group,.58,.3,[0,.5,0],'y');
    for(const y of [-1.35,1.25]){const ring=mesh(group,new THREE.TorusGeometry(.54,.09,12,48),brass(),[0,y,0]);ring.rotation.x=Math.PI/2}
  }));
  components.push(component(root,'7/8/11/20/24 安全罩、护板和拉手',[0,.15,.25],[4.3,-.6,2.4],group=>{
    mesh(group,new THREE.BoxGeometry(3.35,4.65,.14),painted());
    mesh(group,new THREE.BoxGeometry(1.15,.75,.18),darkMetal(),[-.9,-1.45,.2]);
    mesh(group,new THREE.BoxGeometry(.9,.12,.25),lightMetal(),[.65,.25,.2]);
    cylinder(group,.07,.65,brass(),[0,-2.55,0],'x');
  }));
  return finish(root,components,{scale:.66,y:-.25,rotationY:-.16});
}

function refinedRacking(){
  const root=new THREE.Group(),components=[];
  components.push(component(root,'1/3 三臂转架与九个压轮',[0,0,0],[0,2.8,-1.4],group=>{
    mesh(group,new THREE.BoxGeometry(1.05,.62,.78),darkMetal());
    const angles=[Math.PI/2,Math.PI/2+Math.PI*2/3,Math.PI/2+Math.PI*4/3],lengths=[3.45,3.25,3.55];
    angles.forEach((angle,index)=>{
      const knee=[Math.cos(angle)*lengths[index]*.53,Math.sin(angle)*lengths[index]*.53];
      const bend=angle+(index===1?.2:index===2?-.2:0),end=[knee[0]+Math.cos(bend)*lengths[index]*.5,knee[1]+Math.sin(bend)*lengths[index]*.5];
      beamXZ(group,[0,0],knee,.24,.34,index%2?painted():lightMetal());
      beamXZ(group,knee,end,.24,.3,accent());
      mesh(group,new THREE.BoxGeometry(.42,.38,.42),darkMetal(),[knee[0],0,knee[1]]);
      for(const amount of [.3,.67,1]){
        const point=[knee[0]+(end[0]-knee[0])*amount,knee[1]+(end[1]-knee[1])*amount];
        cylinder(group,.09,1.55,lightMetal(),[point[0],-.86,point[1]]);
        cylinder(group,.3,.42,rubber(),[point[0],-1.72,point[1]]);
      }
    });
  }));
  components.push(component(root,'2 支架结合件',[0,.25,.15],[0,-2.6,2.6],group=>{
    beamXZ(group,[-1.45,0],[1.45,0],.25,.32,painted());
    mesh(group,new THREE.BoxGeometry(.65,1.05,.52),painted(),[0,.55,0]);
  }));
  components.push(component(root,'4/5 长短轴',[0,-.25,0],[-4.2,-1.6,-1.4],group=>{
    cylinder(group,.08,1.55,lightMetal(),[-.45,0,0]);cylinder(group,.08,1.05,lightMetal(),[.45,.2,0]);
  }));
  components.push(component(root,'6—11 轴套、定位块与挡圈',[0,.35,0],[3.9,2.7,2.1],group=>{
    cylinder(group,.2,1.15,lightMetal());
    mesh(group,new THREE.BoxGeometry(.58,.58,.58),darkMetal(),[0,.85,0]);
    for(const y of [-.75,-.48,.48,.75]){const ring=mesh(group,new THREE.TorusGeometry(.24,.04,10,36),brass(),[0,y,0]);ring.rotation.x=Math.PI/2}
  }));
  return finish(root,components,{scale:.74,y:-.28,rotationY:.28});
}

export function createRefinedTf2513Assembly(model){
  if(model==='tf2513Product')return refinedProduct();
  if(model==='tf2513CalenderRollAssembly')return refinedCalenderRoll();
  if(model==='tf2513BrokenEndAssembly')return refinedBrokenEnd();
  if(model==='tf2513CanChangingAssembly')return refinedCanChanging();
  if(model==='tf2513RackingAssembly')return refinedRacking();
  return null;
}

export default createRefinedTf2513Assembly;
