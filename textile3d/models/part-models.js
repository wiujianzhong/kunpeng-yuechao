import * as THREE from 'three';
import {createSpecModel} from './spec-models.js?v=20260713-10';

const metal=(color=0x819294,rough=.34)=>new THREE.MeshStandardMaterial({color,roughness:rough,metalness:.78});
const dark=()=>new THREE.MeshStandardMaterial({color:0x1c2929,roughness:.48,metalness:.35});
const add=(group,geometry,material,x=0,y=0,z=0)=>{const mesh=new THREE.Mesh(geometry,material);mesh.position.set(x,y,z);group.add(mesh);return mesh};

function numericDims(part){
  const text=(part.dims||[]).join('×');const nums=Array.isArray(part.dims)&&part.dims.length&&part.dims.every(Number.isFinite)?part.dims:(text.match(/\d+(?:\.\d+)?/g)||[]).map(Number).filter(n=>n>0);const first=Math.max(nums[0]||100,1),second=Math.max(nums[1]||first*.35,1),third=Math.max(nums[2]||Math.min(first,second)*.12,1);
  if(part.type==='belt'&&nums.length>=3)return [Math.max(...nums),nums.slice().sort((a,b)=>a-b)[1],Math.min(...nums)];
  if(part.type==='spring'&&nums.length>=2){const wire=first<5?first:Math.max(first*.12,1);return [second,first<5?first*5:first,wire]}
  if(['shaft','tube'].includes(part.type)&&nums.length>=2&&first<second)return [second,first,third];
  if(['pulley','gear'].includes(part.type)&&nums.length>=2&&first>second)return [second,first,third];
  if(part.type==='fan'&&nums.length===1)return [Math.max(first*.1,20),first,Math.max(first*.08,12)];
  if(part.type==='roller'&&nums.length===1)return [first,Math.min(first*.14,180),Math.min(first*.04,60)];
  if(part.type==='motor'&&first<50)return [300,180,160];
  if(['pulley','gear'].includes(part.type)&&/φ/.test(text))return [second,first,third];
  if(['shaft','cylinder','roller','tube'].includes(part.type)&&/φ/.test(text))return [second,first,third];
  if(part.type==='ring'&&/φ/.test(text))return [first,second||first*.55,third];
  return [first,second,third];
}

function normalize(group){
  const box=new THREE.Box3().setFromObject(group);const size=box.getSize(new THREE.Vector3());const center=box.getCenter(new THREE.Vector3());
  const scale=3.65/Math.max(size.x,size.y,size.z,1);group.scale.setScalar(scale);group.position.copy(center).multiplyScalar(-scale);return group;
}

function plate(group,[l,w,t]){
  add(group,new THREE.BoxGeometry(l,t,w),metal());
  const holeR=Math.max(Math.min(l,w)*.018,5);for(const x of [-l*.34,l*.34])for(const z of [-w*.28,w*.28])add(group,new THREE.CylinderGeometry(holeR,holeR,t*1.08,24),dark(),x,t*.53,z);
  add(group,new THREE.BoxGeometry(l,t*3,w*.035),metal(0x647779),0,t*1.6,-w*.47);
}

function door(group,[w,h,d],part){
  add(group,new THREE.BoxGeometry(w,h,d),metal(0x7d8f91));const rail=Math.max(w*.045,18);
  add(group,new THREE.BoxGeometry(rail,h*1.01,d*1.35),metal(0x526668),-w*.46,0,0);add(group,new THREE.BoxGeometry(rail,h*1.01,d*1.35),metal(0x526668),w*.46,0,0);
  add(group,new THREE.BoxGeometry(w*.94,rail,d*1.35),metal(0x526668),0,h*.47,0);add(group,new THREE.BoxGeometry(w*.94,rail,d*1.35),metal(0x526668),0,-h*.47,0);
  if(part.vent!==false){for(let i=0;i<6;i++)add(group,new THREE.BoxGeometry(w*.46,Math.max(h*.012,8),d*.28),dark(),0,-h*.20+i*h*.032,d*.56)}
  add(group,new THREE.BoxGeometry(w*.055,h*.12,d*.5),dark(),w*.34,0,d*.62);
}

function beam(group,[l,h,w]){
  const t=Math.max(Math.min(h,w)*.16,4);add(group,new THREE.BoxGeometry(l,t,w),metal());add(group,new THREE.BoxGeometry(l,h,t),metal(0x697d7f),0,h*.46,-w*.46);add(group,new THREE.BoxGeometry(l,h,t),metal(0x697d7f),0,h*.46,w*.46);
  for(const x of [-l*.35,0,l*.35])add(group,new THREE.CylinderGeometry(t*.45,t*.45,t*1.2,20),dark(),x,t*.8,0);
}

function column(group,[h,w,d],part){
  const t=Math.max(Math.min(w,d)*.16,8);add(group,new THREE.BoxGeometry(t,h,d),metal(),-w*.5+t*.5,0,0);add(group,new THREE.BoxGeometry(w,h,t),metal(0x6d8082),0,0,-d*.5+t*.5);add(group,new THREE.BoxGeometry(w*1.2,t*1.3,d*1.2),metal(0x526668),0,-h*.5,0);
  for(const y of [-h*.34,h*.34])add(group,new THREE.CylinderGeometry(t*.35,t*.35,t*1.1,20),dark(),-w*.5+t*.5,y,0).rotation.z=Math.PI/2;
}

function hoodDoor(group,[w,h,d],part){
  door(group,[w,h,d],{vent:false});const top=new THREE.Shape();top.moveTo(-w*.42,0);top.lineTo(w*.42,0);top.lineTo(w*.25,h*.15);top.lineTo(-w*.18,h*.15);top.closePath();const geo=new THREE.ExtrudeGeometry(top,{depth:d*.55,bevelEnabled:false});const cap=add(group,geo,metal(0x89999a),0,h*.5,0);cap.geometry.center();
}

function topCover(group,[w,h,d]){add(group,new THREE.BoxGeometry(w,d,h),metal());add(group,new THREE.BoxGeometry(w*.92,d*2.2,h*.06),metal(0x566a6c),0,d*.8,-h*.44);add(group,new THREE.BoxGeometry(w*.92,d*2.2,h*.06),metal(0x566a6c),0,d*.8,h*.44)}
function frontTopHood(group,[w,h,d]){
  // 厂家略图只明确标注总宽；高度、深度和板厚按图面比例做轮廓级还原。
  const faceH=h*.68,t=Math.max(d*.065,5),frontZ=d*.45;
  const face=new THREE.Shape();face.moveTo(-w*.5,-faceH*.5);face.lineTo(w*.5,-faceH*.5);face.lineTo(w*.5,faceH*.5);face.lineTo(-w*.5,faceH*.5);face.closePath();
  const holeW=w*.34,holeH=faceH*.22,r=holeH*.28,hole=new THREE.Path(),x=-holeW*.5,y=-faceH*.12-holeH*.5;
  hole.moveTo(x+r,y);hole.quadraticCurveTo(x,y,x,y+r);hole.lineTo(x,y+holeH-r);hole.quadraticCurveTo(x,y+holeH,x+r,y+holeH);hole.lineTo(x+holeW-r,y+holeH);hole.quadraticCurveTo(x+holeW,y+holeH,x+holeW,y+holeH-r);hole.lineTo(x+holeW,y+r);hole.quadraticCurveTo(x+holeW,y,x+holeW-r,y);hole.closePath();face.holes.push(hole);
  const faceGeo=new THREE.ExtrudeGeometry(face,{depth:t,bevelEnabled:false});faceGeo.center();add(group,faceGeo,metal(0x829395),0,0,frontZ);
  add(group,new THREE.BoxGeometry(holeW*.96,holeH*.9,t*.9),dark(),0,-faceH*.12,frontZ-t*.65);
  const rise=h*.5-faceH*.5,run=d*.9,slope=Math.hypot(rise,run),angle=Math.atan2(rise,run);
  const roof=add(group,new THREE.BoxGeometry(w,t,slope),metal(0x8b9b9c),0,(faceH*.5+h*.5)*.5,0);roof.rotation.x=angle;
  add(group,new THREE.BoxGeometry(w,t,d*.22),metal(0x697d7f),0,h*.5,-d*.39);
  add(group,new THREE.BoxGeometry(w,h*.1,t),metal(0x617577),0,h*.45,-d*.5);
  add(group,new THREE.BoxGeometry(w,t,d*.2),metal(0x617577),0,-faceH*.5,frontZ-d*.1);
  for(const side of [-1,1]){
    add(group,new THREE.BoxGeometry(t*1.7,faceH,d*.18),metal(0x566b6d),side*(w*.5-t*.85),0,frontZ-d*.09);
    add(group,new THREE.BoxGeometry(t*2.1,faceH*.2,d*.28),metal(0x526668),side*(w*.5+t*.2),-faceH*.06,frontZ-d*.05);
  }
  add(group,new THREE.BoxGeometry(w*.98,t*1.7,d*.12),metal(0x5f7375),0,faceH*.47,frontZ);
  add(group,new THREE.BoxGeometry(w*.98,t*1.7,d*.12),metal(0x5f7375),0,-faceH*.47,frontZ);
}
function panel(group,[w,h,d],part){add(group,new THREE.BoxGeometry(w,h,d),metal());if(part.perforated){for(let x=-2;x<=2;x++)for(let y=-2;y<=2;y++)add(group,new THREE.CylinderGeometry(d*.18,d*.18,d*1.1,16),dark(),x*w*.14,y*h*.14,d*.52).rotation.x=Math.PI/2}}
function hood(group,[w,h,d]){const shape=new THREE.Shape();shape.moveTo(-w*.5,-h*.5);shape.lineTo(w*.5,-h*.5);shape.lineTo(w*.32,h*.5);shape.lineTo(-w*.18,h*.35);shape.closePath();const geo=new THREE.ExtrudeGeometry(shape,{depth:d,bevelEnabled:true,bevelSize:d*.08,bevelThickness:d*.08,bevelSegments:2});geo.center();add(group,geo,metal())}
function bracket(group,[w,h,d]){const shape=new THREE.Shape();shape.moveTo(-w*.5,-h*.5);shape.lineTo(w*.5,-h*.5);shape.lineTo(w*.5,-h*.28);shape.lineTo(w*.12,-h*.28);shape.lineTo(w*.12,h*.5);shape.lineTo(-w*.12,h*.5);shape.lineTo(-w*.12,-h*.28);shape.lineTo(-w*.5,-h*.28);shape.closePath();const geo=new THREE.ExtrudeGeometry(shape,{depth:d,bevelEnabled:true,bevelSize:2,bevelThickness:2,bevelSegments:2});geo.center();add(group,geo,metal(0x77898b))}
function windowPart(group,[w,h,d]){const glass=new THREE.MeshPhysicalMaterial({color:0x99d5d5,transparent:true,opacity:.42,roughness:.12,metalness:0,transmission:.45});add(group,new THREE.BoxGeometry(w,h,d),glass);const t=Math.max(Math.min(w,h)*.045,8);for(const x of [-w*.5+t*.5,w*.5-t*.5])add(group,new THREE.BoxGeometry(t,h,d*2),metal(0x405759),x,0,0);for(const y of [-h*.5+t*.5,h*.5-t*.5])add(group,new THREE.BoxGeometry(w,t,d*2),metal(0x405759),0,y,0)}
function pressPlate(group,[l,w,t],part){const shape=new THREE.Shape();shape.moveTo(-l*.5,-w*.42);shape.lineTo(l*.5,-w*.24);shape.lineTo(l*.5,w*.25);shape.lineTo(-l*.5,w*.42);shape.closePath();const geo=new THREE.ExtrudeGeometry(shape,{depth:t,bevelEnabled:true,bevelSize:t*.15,bevelThickness:t*.15,bevelSegments:2});geo.center();add(group,geo,metal());for(const x of [-l*.28,l*.28])add(group,new THREE.CylinderGeometry(t*.48,t*.48,t*1.1,20),dark(),x,0,t*.52).rotation.x=Math.PI/2}
function lockPart(group,[w,h,d]){add(group,new THREE.BoxGeometry(w,h,d),metal(0x5e7274));add(group,new THREE.CylinderGeometry(h*.12,h*.12,d*1.5,32),metal(0xc0c9c7,.18),0,0,d*.7).rotation.x=Math.PI/2;add(group,new THREE.BoxGeometry(w*.25,h*.12,d*.8),dark(),w*.5,0,0)}
function casing(group,[h,w,d]){add(group,new THREE.BoxGeometry(w,h,d),metal());add(group,new THREE.BoxGeometry(w*.7,h*.05,d*1.3),dark(),0,h*.28,0);add(group,new THREE.BoxGeometry(w*.7,h*.05,d*1.3),dark(),0,-h*.28,0)}
function hinge(group,[w,h,d]){add(group,new THREE.BoxGeometry(w*.42,h,d),metal(),-w*.28,0,0);add(group,new THREE.BoxGeometry(w*.42,h,d),metal(),w*.28,0,0);const pin=add(group,new THREE.CylinderGeometry(d*.28,d*.28,h*1.15,32),metal(0xb6c0bd,.2),0,0,0);pin.rotation.x=Math.PI/2}
function magnet(group,[w,h,d]){add(group,new THREE.BoxGeometry(w,h,d),metal(0x596b6d));for(let i=0;i<4;i++){const pin=add(group,new THREE.CylinderGeometry(d*.18,d*.18,w*.65,20),metal(0x9ba8a6,.25),-w*.28+i*w*.19,0,d*.8);pin.rotation.z=Math.PI/2}}
function handle(group,[w,h,d]){const shape=new THREE.Shape();shape.moveTo(-w*.5,-h*.45);shape.lineTo(w*.5,-h*.45);shape.lineTo(w*.28,h*.45);shape.lineTo(-w*.28,h*.45);const hole=new THREE.Path();hole.moveTo(-w*.25,-h*.2);hole.lineTo(w*.25,-h*.2);hole.lineTo(w*.12,h*.18);hole.lineTo(-w*.12,h*.18);hole.closePath();shape.holes.push(hole);const geo=new THREE.ExtrudeGeometry(shape,{depth:d,bevelEnabled:true,bevelSize:d*.08,bevelThickness:d*.08,bevelSegments:3});geo.center();add(group,geo,metal(0x485d5f))}
function rubber(){return new THREE.MeshStandardMaterial({color:0x151b1b,roughness:.9,metalness:0})}
function seal(group){const shape=new THREE.Shape();shape.moveTo(-5,-5);shape.lineTo(5,-5);shape.lineTo(5,5);shape.lineTo(2.5,5);shape.lineTo(2.5,-1.5);shape.quadraticCurveTo(0,-4,-2.5,-1.5);shape.lineTo(-2.5,5);shape.lineTo(-5,5);shape.closePath();const geo=new THREE.ExtrudeGeometry(shape,{depth:95,bevelEnabled:true,bevelSize:.4,bevelThickness:.4,bevelSegments:2});geo.center();add(group,geo,rubber())}
function embedStrip(group){const shape=new THREE.Shape();shape.moveTo(-6,-4);shape.lineTo(1,-4);shape.lineTo(6,4);shape.lineTo(2,6);shape.lineTo(-1,1);shape.lineTo(-6,1);shape.closePath();const geo=new THREE.ExtrudeGeometry(shape,{depth:90,bevelEnabled:true,bevelSize:.35,bevelThickness:.35,bevelSegments:2});geo.center();add(group,geo,rubber())}
function embedCore(group){const geo=new THREE.ConeGeometry(6,12,32,1,false,0,Math.PI*2);const mesh=add(group,geo,rubber());mesh.rotation.z=Math.PI/2;mesh.scale.y=8}
function plug(group,[diameter,length]){const body=add(group,new THREE.CylinderGeometry(diameter*.5,diameter*.42,length,40),rubber());body.rotation.z=Math.PI/2;for(let i=0;i<4;i++){const ring=add(group,new THREE.TorusGeometry(diameter*.44,diameter*.045,12,36),rubber(),-length*.28+i*length*.18,0,0);ring.rotation.y=Math.PI/2}}
function shaft(group,dims=[300,40,40]){const [length,diameter]=dims;const main=add(group,new THREE.CylinderGeometry(diameter*.42,diameter*.42,length*.72,40),metal(0xaeb9b6,.18));main.rotation.z=Math.PI/2;for(const [x,r,l] of [[-length*.43,diameter*.28,length*.14],[length*.43,diameter*.28,length*.14]]){const end=add(group,new THREE.CylinderGeometry(r,r,l,32),metal(0xc5cecb,.16),x,0,0);end.rotation.z=Math.PI/2}}
function cylinderPart(group,dims=[300,120,120]){const [length,diameter]=dims;const body=add(group,new THREE.CylinderGeometry(diameter*.5,diameter*.5,length,48),metal());body.rotation.z=Math.PI/2;for(const x of [-length*.51,length*.51]){const cap=add(group,new THREE.CylinderGeometry(diameter*.57,diameter*.57,Math.max(length*.035,6),48),metal(0x617477),x,0,0);cap.rotation.z=Math.PI/2}}
function pulley(group,dims=[120,260,60]){const [width,diameter,bore]=dims;const body=add(group,new THREE.CylinderGeometry(diameter*.5,diameter*.5,width,64),metal(0x65787a));body.rotation.z=Math.PI/2;for(let i=-2;i<=2;i++){const groove=add(group,new THREE.TorusGeometry(diameter*.5,Math.max(width*.025,2),10,64),dark(),i*width*.16,0,0);groove.rotation.y=Math.PI/2}const hub=add(group,new THREE.CylinderGeometry(Math.max(bore*.6,diameter*.12),Math.max(bore*.6,diameter*.12),width*1.25,40),metal(0x9ba8a5,.22));hub.rotation.z=Math.PI/2}
function gear(group,dims=[60,240,40]){const [width,diameter]=dims;const core=add(group,new THREE.CylinderGeometry(diameter*.42,diameter*.42,width,48),metal(0x637577));core.rotation.z=Math.PI/2;const teeth=24;for(let i=0;i<teeth;i++){const a=i*Math.PI*2/teeth;const tooth=add(group,new THREE.BoxGeometry(width,diameter*.11,diameter*.055),metal(0x758789),0,Math.cos(a)*diameter*.48,Math.sin(a)*diameter*.48);tooth.rotation.x=a;}}
function roller(group,dims=[900,180,60]){const [length,diameter,shaftD]=dims;const body=add(group,new THREE.CylinderGeometry(diameter*.5,diameter*.5,length,64),metal(0x56696b));body.rotation.z=Math.PI/2;for(const x of [-length*.56,length*.56]){const pin=add(group,new THREE.CylinderGeometry(shaftD*.5,shaftD*.5,length*.12,32),metal(0xb5bfbc,.18),x,0,0);pin.rotation.z=Math.PI/2}}
function fan(group,dims=[120,360,60]){const [depth,diameter]=dims;const hub=add(group,new THREE.CylinderGeometry(diameter*.12,diameter*.12,depth,36),metal(0x56696b));hub.rotation.z=Math.PI/2;for(let i=0;i<8;i++){const a=i*Math.PI/4;const blade=add(group,new THREE.BoxGeometry(depth*.65,diameter*.34,diameter*.055),metal(0x809193),0,Math.cos(a)*diameter*.22,Math.sin(a)*diameter*.22);blade.rotation.x=a+.35}}
function spring(group,dims=[120,45,6]){const [length,diameter,wire]=dims;const turns=10;const points=[];for(let i=0;i<=turns*24;i++){const a=i/24*Math.PI*2;points.push(new THREE.Vector3((i/(turns*24)-.5)*length,Math.cos(a)*diameter*.5,Math.sin(a)*diameter*.5))}const curve=new THREE.CatmullRomCurve3(points);add(group,new THREE.TubeGeometry(curve,turns*24,Math.max(wire*.5,1),10,false),metal(0x9eaaa7,.2))}
function ring(group,dims=[80,45,8]){const [outer,inner,width]=dims;add(group,new THREE.TorusGeometry((outer+inner)*.25,Math.max((outer-inner)*.25,2),18,64),partRubberOrMetal(group),0,0,0).rotation.y=Math.PI/2;function partRubberOrMetal(){return metal(0x77898b)}}
function tube(group,dims=[400,20,20],part){const [length,diameter]=dims;const body=add(group,new THREE.CylinderGeometry(diameter*.5,diameter*.5,length,36),part.material==='橡胶'?rubber():metal(0x96a3a0,.25));body.rotation.z=Math.PI/2}
function belt(group,dims=[600,30,8]){const [length,width,thickness]=dims;const loop=add(group,new THREE.TorusGeometry(Math.max(length*.16,40),Math.max(thickness*.5,2),14,80),rubber());loop.scale.x=1.8;loop.scale.z=Math.max(width/(thickness*5),.35);loop.rotation.x=Math.PI/2}
function motor(group,dims=[300,180,160]){const [length,diameter]=dims;const body=add(group,new THREE.CylinderGeometry(diameter*.5,diameter*.5,length*.72,48),metal(0x4e6264));body.rotation.z=Math.PI/2;for(let i=-4;i<=4;i++){const fin=add(group,new THREE.TorusGeometry(diameter*.52,Math.max(diameter*.018,2),8,48),metal(0x657779),i*length*.07,0,0);fin.rotation.y=Math.PI/2}add(group,new THREE.BoxGeometry(length*.28,diameter*.45,diameter*.5),metal(0x718284),-length*.46,0,0);const axle=add(group,new THREE.CylinderGeometry(diameter*.11,diameter*.11,length*.18,28),metal(0xb7c1be,.16),length*.46,0,0);axle.rotation.z=Math.PI/2}

export function createPartModel(part){
  if(part.modelSpec)return createSpecModel(part.modelSpec);
  const group=new THREE.Group();const dims=numericDims(part);
  ({plate,door,beam,column,hoodDoor,topCover,frontTopHood,panel,hood,bracket,window:windowPart,pressPlate,lock:lockPart,casing,hinge,magnet,handle,seal,embedStrip,embedCore,plug,shaft,cylinder:cylinderPart,pulley,gear,roller,fan,spring,ring,tube,belt,motor}[part.type]||panel)(group,dims,part);
  normalize(group);if(part.mirror)group.scale.x*=-1;return group;
}
