import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {DRACOLoader} from 'three/addons/loaders/DRACOLoader.js';

const $=id=>document.getElementById(id);
const touch=matchMedia('(pointer:coarse)').matches;
const reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;
const state={ready:false,mode:'overview',roof:true,walls:true,inner:true,annotations:true,yaw:0,pitch:0,auto:false};
let renderer,model,data,transition=null,last=0,toastTimer,selected=null;
const scene=new THREE.Scene();scene.background=new THREE.Color('#e9eff3');scene.fog=new THREE.Fog('#e9eff3',65,140);
const camera=new THREE.PerspectiveCamera(48,innerWidth/innerHeight,.06,180);
const target=new THREE.Vector3(12,1,-4);
const layers={};const keys=new Set();const input={x:0,y:0};
let orbit,lookPointer=null,joyPointer=null,lastLook={x:0,y:0};
const points=[
 {id:'entrance',title:'主入口',text:'从原车库大门进入，向右可到达仓储主通道。',anchor:[6,3.1,0],pos:[6,1.65,-.95],look:[12,1.65,-3.8]},
 {id:'aisle',title:'主通道',text:'原方案标注净宽 1.9 米，连接入口、货架区和贵重物品间。',anchor:[9.4,2.7,-3.8],pos:[9.4,1.65,-3.8],look:[16,1.65,-3.8]},
 {id:'racks',title:'货架存放区',text:'沿用 V3 最新保存的货架布局，可从中间通道观察层板、工序牌与空间关系。',anchor:[16,2.5,-4],pos:[14,1.65,-3.8],look:[14,1.45,-5.4]},
 {id:'room',title:'贵重物品间',text:'独立隔间，保留金属门、智能锁与内部货架。可从门口走入，或关闭隔墙查看布局。',anchor:[2.3,3,-5.4],pos:[3,1.65,-3.95],look:[.8,1.5,-6.7]},
 {id:'staging',title:'物品暂放处',text:'入门左侧的临时存放区域，保留原模型的托盘、纸箱与标识。',anchor:[1.5,1.5,-1.4],pos:[3,1.65,-1.6],look:[1,1,-1.4]}
];
function toast(text){$('toast').textContent=text;$('toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.remove('show'),2800);}
function loadError(error){console.error(error);$('loading').hidden=false;$('load-text').textContent='模型未能打开，请检查网络后重新加载。';$('retry').hidden=false;}
$('retry').onclick=()=>location.reload();
function overviewPosition(){return innerWidth<600?new THREE.Vector3(43,35,51):new THREE.Vector3(30,20,23);}
function setCamera(pos,look,animate=true){
 if(animate&&!reduced){transition={start:performance.now(),pos:camera.position.clone(),end:pos.clone(),fromTarget:orbit.target.clone(),target:look.clone()};}
 else{transition=null;camera.position.copy(pos);orbit.target.copy(look);camera.lookAt(look);orbit.update();}
}
function resetInput(){input.x=0;input.y=0;keys.clear();joyPointer=null;lookPointer=null;$('stick').style.transform='translate(0,0)';}
function closeDetail(){$('detail').hidden=true;selected=null;}
function setMode(mode){
 if(!state.ready)return;
 resetInput();closeDetail();state.mode=mode;state.auto=mode==='orbit';orbit.enabled=mode!=='walk';orbit.autoRotate=state.auto;transition=null;
 document.body.classList.toggle('walking',mode==='walk');$('walk-controls').hidden=mode!=='walk';
 document.querySelectorAll('.mode').forEach(b=>b.classList.toggle('active',b.id===mode));
 const names={overview:'空间总览',walk:'第一人称漫游',orbit:'自动环绕中',top:'俯视布局'};$('mode-status').textContent=names[mode];$('map-caption').textContent=mode==='walk'?'当前位置':'平面位置';
 $('scene-title').textContent=mode==='orbit'?'绕一圈，看建筑的全貌。':mode==='top'?'打开屋顶，查看空间布局。':'把空间交给你，亲自走进去。';
 $('scene-hint').textContent=touch?'单指旋转 · 双指缩放 · 点击标注':'拖动旋转 · 滚轮缩放 · 点击标注';
 $('walking-help').textContent=touch?'左手移动 · 右手转头':'W A S D 移动 · 拖动转头 · Shift 加速';
 if(mode==='walk'){goTo(points[0],false);return;}
 camera.fov=mode==='top'?38:48;camera.updateProjectionMatrix();
 if(mode==='top'){setLayer('roof',false);setCamera(new THREE.Vector3(12,innerWidth<600?51:34,-3.99),new THREE.Vector3(12,0,-4));}
 else{setCamera(overviewPosition(),target);}
}
function setLayer(name,value){
 state[name]=value;$(name).checked=value;
 if(layers[name])layers[name].visible=value;
 if(renderer)renderer.shadowMap.needsUpdate=true;
}
function pointInPolygon(x,z,poly){let inside=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){
 const a=poly[i],b=poly[j];if((a[1]>z)!==(b[1]>z)&&x<(b[0]-a[0])*(z-a[1])/(b[1]-a[1])+a[0])inside=!inside;
 }return inside;}
function blocked(x,z){
 if(x< -3||x>27||z< -11||z>3.8)return true;
 const radius=.19;
 return data.colliders.some(c=>{
 // 显隐只改变观察方式，实际建筑与货架仍有实体边界。
 const [minX,minZ,maxX,maxZ]=c.bounds;
 if(x<minX-radius||x>maxX+radius||z<minZ-radius||z>maxZ+radius)return false;
 if(pointInPolygon(x,z,c.polygon))return true;
 for(let i=0;i<c.polygon.length;i++){
  const a=c.polygon[i],b=c.polygon[(i+1)%c.polygon.length],dx=b[0]-a[0],dz=b[1]-a[1];
  const t=Math.max(0,Math.min(1,((x-a[0])*dx+(z-a[1])*dz)/(dx*dx+dz*dz||1)));
  if(Math.hypot(x-a[0]-t*dx,z-a[1]-t*dz)<radius)return true;
 }return false;
 });
}
function safePosition(p){
 if(!blocked(p.x,p.z))return p;
 for(let r=.15;r<2;r+=.15)for(let a=0;a<Math.PI*2;a+=Math.PI/12){const x=p.x+Math.cos(a)*r,z=p.z+Math.sin(a)*r;if(!blocked(x,z))return new THREE.Vector3(x,1.65,z);}
 return new THREE.Vector3(6,1.65,-.95);
}
function orient(look){const d=look.clone().sub(camera.position).normalize();state.yaw=Math.atan2(-d.x,-d.z);state.pitch=Math.asin(d.y);camera.rotation.order='YXZ';camera.rotation.set(state.pitch,state.yaw,0);}
function goTo(p,switchMode=true){
 if(switchMode&&state.mode!=='walk')setMode('walk');
 transition=null;camera.fov=68;camera.updateProjectionMatrix();camera.position.copy(safePosition(new THREE.Vector3(...p.pos)));orient(new THREE.Vector3(...p.look));closeDetail();resetInput();$('destination').value='';$('map-caption').textContent=p.title;
 if(switchMode)toast('已到达'+p.title);
}
function move(dt){
 let x=input.x+(keys.has('KeyD')?1:0)-(keys.has('KeyA')?1:0), y=-input.y+(keys.has('KeyW')||keys.has('ArrowUp')?1:0)-(keys.has('KeyS')||keys.has('ArrowDown')?1:0);
 if(keys.has('ArrowLeft'))state.yaw+=dt*1.3;if(keys.has('ArrowRight'))state.yaw-=dt*1.3;
 const length=Math.hypot(x,y);if(length>1){x/=length;y/=length;}
 const speed=(keys.has('ShiftLeft')||keys.has('ShiftRight')?3.7:2.1)*dt;
 const dx=(Math.cos(state.yaw)*x-Math.sin(state.yaw)*y)*speed,dz=(-Math.sin(state.yaw)*x-Math.cos(state.yaw)*y)*speed;
 // 每步细分并沿墙滑动，避免低帧率穿过薄墙。
 const steps=Math.max(1,Math.ceil(Math.hypot(dx,dz)/.06));
 for(let i=0;i<steps;i++){
  if(!blocked(camera.position.x+dx/steps,camera.position.z))camera.position.x+=dx/steps;
  if(!blocked(camera.position.x,camera.position.z+dz/steps))camera.position.z+=dz/steps;
 }
 camera.position.y=1.65;camera.rotation.set(state.pitch,state.yaw,0,'YXZ');
}
function buildMap(){
 const map=$('map-shapes'),svgNS='http://www.w3.org/2000/svg';
 function polygon(points,fill,stroke){const el=document.createElementNS(svgNS,'polygon');el.setAttribute('points',points.map(([x,z])=>[20+x*10,94+z*10].join(',')).join(' '));el.setAttribute('fill',fill);if(stroke){el.setAttribute('stroke',stroke);el.setAttribute('stroke-width','1.5');}map.append(el);}
 polygon([[0,0],[24,0],[24,-8],[0,-8]],'#e3ebf0','#829bad');
 polygon([[.12,-3.3],[4,-3.3],[4,-7.9],[.12,-7.9]],'#cddde7','#829bad');
 for(const r of data.racks)polygon(r.polygon,'#7893a4');
 const entry=document.createElementNS(svgNS,'path');entry.setAttribute('d','M66.5 94H93.5');entry.setAttribute('stroke','#f9fcfd');entry.setAttribute('stroke-width','4');map.append(entry);
}
function buildLabels(){
 for(const p of points){p.world=new THREE.Vector3(...p.anchor);p.screen=new THREE.Vector3();const b=document.createElement('button');b.className='hotspot';b.textContent=p.title;b.setAttribute('aria-label','查看'+p.title+'标注');b.onclick=()=>{selected=p;$('detail-title').textContent=p.title;$('detail-text').textContent=p.text;$('detail').hidden=false;};$('labels').append(b);p.button=b;}
}
function updateLabels(){
 const occupied=[];
 for(const p of points){
  p.screen.copy(p.world).project(camera);const x=(p.screen.x+1)*innerWidth/2,y=(-p.screen.y+1)*innerHeight/2;
  const d=camera.position.distanceTo(p.world);
  let show=state.annotations&&p.screen.z<1&&p.screen.z> -1&&x>45&&x<innerWidth-45&&y>145&&y<innerHeight-105;
  if(state.mode==='walk'&&d>10)show=false;
  // 总览保留主标注；漫游时隐藏被墙遮住的标注。
  if(state.mode==='walk'&&show){
   const direction=p.world.clone().sub(camera.position).normalize();labelRay.set(camera.position,direction);labelRay.far=d-.18;
   const hits=labelRay.intersectObjects(occluders,false);if(hits.some(h=>{let o=h.object;while(o){if(!o.visible)return false;o=o.parent;}return h.distance<d-.18;}))show=false;
  }
  if(show&&occupied.some(q=>Math.abs(q.x-x)<110&&Math.abs(q.y-y)<40))show=false;
  p.button.hidden=!show;
  if(show){p.button.style.left=x+'px';p.button.style.top=y+'px';p.button.classList.toggle('selected',selected===p);occupied.push({x,y});}
 }
}
const labelRay=new THREE.Raycaster(),occluders=[];
let labelTick=0;
function animate(now){
 requestAnimationFrame(animate);if(!state.ready)return;
 const dt=Math.min((now-last)/1000||.016,.06);last=now;
 if(transition){const t=Math.min(1,(now-transition.start)/750),k=t*t*(3-2*t);camera.position.lerpVectors(transition.pos,transition.end,k);orbit.target.lerpVectors(transition.fromTarget,transition.target,k);camera.lookAt(orbit.target);if(t===1)transition=null;}
 else if(state.mode==='walk')move(dt);
 else orbit.update(dt);
 if(now-labelTick>100){updateLabels();labelTick=now;}
 const mx=20+camera.position.x*10,my=94+camera.position.z*10;
 const direction=new THREE.Vector3();camera.getWorldDirection(direction);const a=Math.atan2(direction.x,-direction.z)*180/Math.PI;
 $('map-person').setAttribute('transform',`translate(${Math.max(8,Math.min(272,mx))} ${Math.max(6,Math.min(106,my))}) rotate(${a})`);
 $('map-person').style.opacity=state.mode==='walk'?'1':'.5';
 renderer.render(scene,camera);
}
function startLook(e){if(state.mode!=='walk'||e.target.closest('button,select')||e.button>0||lookPointer!==null)return;lookPointer=e.pointerId;lastLook={x:e.clientX,y:e.clientY};e.currentTarget.setPointerCapture(e.pointerId);e.preventDefault();}
function dragLook(e){if(e.pointerId!==lookPointer)return;state.yaw-=(e.clientX-lastLook.x)*.004;state.pitch=THREE.MathUtils.clamp(state.pitch-(e.clientY-lastLook.y)*.003,-1.15,1.15);lastLook={x:e.clientX,y:e.clientY};e.preventDefault();}
function stopLook(e){if(e.pointerId===lookPointer)lookPointer=null;}
function setupInput(){
 for(const el of [renderer.domElement,$('look-area')]){el.addEventListener('pointerdown',startLook);el.addEventListener('pointermove',dragLook);el.addEventListener('pointerup',stopLook);el.addEventListener('pointercancel',stopLook);el.addEventListener('lostpointercapture',stopLook);el.addEventListener('contextmenu',e=>e.preventDefault());}
 const joy=$('joystick');
 function moveJoy(e){if(e.pointerId!==joyPointer)return;const r=joy.getBoundingClientRect(),dx=e.clientX-r.left-r.width/2,dy=e.clientY-r.top-r.height/2,limit=r.width*.32,len=Math.hypot(dx,dy),k=len>limit?limit/len:1;input.x=dx*k/limit;input.y=dy*k/limit;$('stick').style.transform=`translate(${dx*k}px,${dy*k}px)`;e.preventDefault();}
 joy.onpointerdown=e=>{if(joyPointer!==null)return;joyPointer=e.pointerId;joy.setPointerCapture(e.pointerId);moveJoy(e);};joy.onpointermove=moveJoy;
 const end=e=>{if(e.pointerId===joyPointer){joyPointer=null;input.x=0;input.y=0;$('stick').style.transform='translate(0,0)';}};
 joy.onpointerup=end;joy.onpointercancel=end;joy.onlostpointercapture=end;
 window.addEventListener('keydown',e=>{if(state.mode!=='walk'||e.target.matches('select,input,button'))return;if(['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','ShiftLeft','ShiftRight'].includes(e.code)){keys.add(e.code);e.preventDefault();}});
 window.addEventListener('keyup',e=>keys.delete(e.code));window.addEventListener('blur',resetInput);document.addEventListener('visibilitychange',()=>{if(document.hidden)resetInput();});
 for(const id of ['overview','walk','orbit','top'])$(id).onclick=()=>{$(id).blur();setMode(id);};
 for(const id of ['roof','walls','inner','annotations'])$(id).onchange=e=>setLayer(id,e.target.checked);
 $('reset').onclick=()=>{for(const id of ['roof','walls','inner','annotations'])setLayer(id,true);toast('已恢复完整建筑');};
 $('settings-button').onclick=()=>{$('settings').hidden=!$('settings').hidden;$('settings-button').setAttribute('aria-expanded',String(!$('settings').hidden));};
 $('close-settings').onclick=()=>{$('settings').hidden=true;$('settings-button').setAttribute('aria-expanded','false');};
 $('close-detail').onclick=closeDetail;$('detail-go').onclick=()=>{if(selected)goTo(selected);};
 $('destination').onchange=e=>{const p=points.find(p=>p.id===e.target.value);if(p)goTo(p);e.target.blur();};
 orbit.addEventListener('start',()=>{transition=null;if(state.auto){state.auto=false;orbit.autoRotate=false;$('mode-status').textContent='手动环绕';}});
 window.addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);if(state.mode==='overview'||state.mode==='top'){const mode=state.mode;setMode(mode);}});
}
async function init(){
 try{
  renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance'});renderer.setPixelRatio(Math.min(devicePixelRatio,touch?1.5:2));renderer.setSize(innerWidth,innerHeight);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.02;
  renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.shadowMap.autoUpdate=false;renderer.shadowMap.needsUpdate=true;$('viewport').append(renderer.domElement);
  renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();state.ready=false;loadError(new Error('图形上下文已中断'));});
  orbit=new OrbitControls(camera,renderer.domElement);orbit.target.copy(target);orbit.enableDamping=true;orbit.dampingFactor=.08;orbit.minDistance=8;orbit.maxDistance=90;orbit.maxPolarAngle=Math.PI/2-.035;orbit.minPolarAngle=.015;orbit.autoRotateSpeed=.6;orbit.enablePan=true;orbit.screenSpacePanning=false;
  camera.position.copy(overviewPosition());camera.lookAt(target);orbit.update();
  scene.add(new THREE.HemisphereLight(0xf1f7ff,0x84948e,1.9));scene.add(new THREE.AmbientLight(0xffffff,.5));
  const sun=new THREE.DirectionalLight(0xfff4df,2.2);sun.position.set(2,20,14);sun.target.position.set(12,0,-4);scene.add(sun,sun.target);sun.castShadow=true;sun.shadow.mapSize.set(touch?1024:2048,touch?1024:2048);Object.assign(sun.shadow.camera,{left:-21,right:21,top:17,bottom:-17,near:.5,far:60});sun.shadow.bias=-.0003;sun.shadow.normalBias=.025;
  const fill=new THREE.DirectionalLight(0xd7eaff,1.4);fill.position.set(20,6,-7);scene.add(fill);
  const ground=new THREE.Mesh(new THREE.PlaneGeometry(180,180),new THREE.MeshStandardMaterial({color:0xe3ebef,roughness:1}));ground.rotation.x=-Math.PI/2;ground.position.set(12,-.14,-4);ground.receiveShadow=true;scene.add(ground);
  const grid=new THREE.GridHelper(100,50,0xc9d9e1,0xd8e4eb);grid.position.set(12,-.135,-4);grid.material.transparent=true;grid.material.opacity=.42;scene.add(grid);
  data=await fetch('./scene.json').then(r=>{if(!r.ok)throw Error('场景信息加载失败');return r.json();});
  for(const c of data.colliders){const xs=c.polygon.map(p=>p[0]),zs=c.polygon.map(p=>p[1]);c.bounds=[Math.min(...xs),Math.min(...zs),Math.max(...xs),Math.max(...zs)];}
  const draco=new DRACOLoader();draco.setDecoderPath('./vendor/examples/jsm/libs/draco/gltf/');draco.setDecoderConfig({type:'wasm'});draco.setWorkerLimit(2);
  const loader=new GLTFLoader();loader.setDRACOLoader(draco);
  const gltf=await loader.loadAsync('./garage.glb',e=>{const n=e.total?Math.min(94,Math.round(e.loaded/e.total*94)):Math.min(90,10+e.loaded/50000);$('load-progress').style.width=n+'%';$('load-text').textContent='正在加载模型 '+(e.total?Math.round(e.loaded/e.total*100)+'%':(e.loaded/1048576).toFixed(1)+' MB');});
  model=gltf.scene;scene.add(model);
  model.traverse(o=>{if(o.userData.layer)layers[o.userData.layer]=o;if(o.isMesh){o.castShadow=true;o.receiveShadow=true;if(o.material){const materials=Array.isArray(o.material)?o.material:[o.material];for(const m of materials){if(m.transmission>0){m.transmission=0;m.transparent=true;m.opacity=.2;m.depthWrite=false;}m.side=THREE.DoubleSide;}}}});
  for(const id of ['walls','inner'])layers[id]?.traverse(o=>{if(o.isMesh)occluders.push(o);});
  // 屋顶不遮挡室内补光；固定设施、货架仍投射阴影。
  layers.roof?.traverse(o=>{if(o.isMesh)o.castShadow=false;});
  $('rack-count').textContent=data.rack_count+' 组货架';buildMap();buildLabels();setupInput();
  state.ready=true;renderer.shadowMap.needsUpdate=true;$('load-progress').style.width='100%';$('loading').hidden=true;last=performance.now();requestAnimationFrame(animate);
  // 诊断接口用于检查相机、图层和通道连通性。
  window.garageDemo={state,camera,scene,renderer,layers,data,blocked,goTo,setMode,setLayer,points};
 }catch(e){loadError(e);}
}
init();
