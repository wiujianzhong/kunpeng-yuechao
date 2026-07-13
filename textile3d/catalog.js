import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {manuals,parts as coreParts} from './data/parts.js?v=20260713-9';
import {jwf1206Parts09to30} from './data/jwf1206-pages-09-30.js?v=20260713-9';
import {jwf1206_pages_09_16_verified} from './data/jwf1206-pages-09-16-verified.js?v=20260713-9';
import {jwf1206P17P26Verified} from './data/jwf1206-p17-p26-verified.js?v=20260713-29';
import {jwf1206P27P37Verified} from './data/jwf1206-p27-p37-verified.js?v=20260713-29';
import {jwf1206P38P49Verified} from './data/jwf1206-p38-p49-verified.js?v=20260713-29';
import {jwf1206P50P61Verified} from './data/jwf1206-p50-p61-verified.js?v=20260713-29';
import {jwf1206P62P73Verified} from './data/jwf1206-p62-p73-verified.js?v=20260713-29';
import {jwf1206Parts31to50} from './data/jwf1206-pages-31-50.js?v=20260713-9';
import {jwf1206Parts51to73} from './data/jwf1206-pages-51-73.js?v=20260713-9';
import {zfa051aParts} from './data/zfa051a-parts.js?v=20260713-9';
import {zfa051aP03P06Verified} from './data/zfa051a-p03-p06-verified.js?v=20260713-29';
import {zfa051aP07P12Verified} from './data/zfa051a-p07-p12-verified.js?v=20260713-29';
import {jwf1026Parts} from './data/jwf1026-parts.js?v=20260713-9';
import {jwf1026P03P10Verified} from './data/jwf1026-p03-p10-verified.js?v=20260713-29';
import {jwf1026P11P18Verified} from './data/jwf1026-p11-p18-verified.js?v=20260713-29';
import {jwf1026P19P25Verified} from './data/jwf1026-p19-p25-verified.js?v=20260713-29';
import {jwf1124cParts} from './data/jwf1124c-parts.js?v=20260713-9';
import {jwf1124cP04Verified} from './data/jwf1124c-p04-verified.js?v=20260713-29';
import {jwf1124cP06Verified} from './data/jwf1124c-p06-verified.js?v=20260713-29';
import {jwf1124cP08Verified} from './data/jwf1124c-p08-verified.js?v=20260713-29';
import {jwf1124cP09Verified} from './data/jwf1124c-p09-verified.js?v=20260713-29';
import {jwf1124cP12Verified} from './data/jwf1124c-p12-verified.js?v=20260713-29';
import {jwf1124cP13P14Verified} from './data/jwf1124c-p13-p14-verified.js?v=20260713-29';
import {jwf1124cP16Verified} from './data/jwf1124c-p16-verified.js?v=20260713-29';
import {jwf1124cP18Verified} from './data/jwf1124c-p18-verified.js?v=20260713-29';
import {jwf1124cP20Verified} from './data/jwf1124c-p20-verified.js?v=20260713-29';
import {jwf1124cP22Verified} from './data/jwf1124c-p22-verified.js?v=20260713-29';
import {jwf1012Parts} from './data/jwf1012-parts.js?v=20260713-9';
import {jwf1012P04P15Verified} from './data/jwf1012-p04-p15-verified.js?v=20260713-29';
import {jwf1012P16P25Verified} from './data/jwf1012-p16-p25-verified.js?v=20260713-29';
import {jwf1012P26P33Verified} from './data/jwf1012-p26-p33-verified.js?v=20260713-29';
import {tf2513Parts} from './data/tf2513-parts.js?v=20260713-9';
import {fa103bParts} from './data/fa103b-parts.js?v=20260713-9';
import {fa103bP04Verified} from './data/fa103b-p04-verified.js?v=20260713-29';
import {fa103bP06P07Verified} from './data/fa103b-p06-p07-verified.js?v=20260713-29';
import {fa103bP09Verified} from './data/fa103b-p09-verified.js?v=20260713-29';
import {fa103bP11Verified} from './data/fa103b-p11-verified.js?v=20260713-29';
import {jwf1102Parts} from './data/jwf1102-parts.js?v=20260713-9';
import {jwf1102P05Verified} from './data/jwf1102-p05-verified.js?v=20260713-29';
import {jwf1102P08P09Verified} from './data/jwf1102-p08-p09-verified.js?v=20260713-29';
import {jwf1102P11P12Verified} from './data/jwf1102-p11-p12-verified.js?v=20260713-29';
import {jwf1102P14Verified} from './data/jwf1102-p14-verified.js?v=20260713-29';
import {assemblies} from './data/assemblies.js?v=20260713-29';
import {jwf1206_0100_verified} from './data/jwf1206-0100-verified.js?v=20260713-9';
import {getPartModelSpec} from './data/model-specs/index.js?v=20260713-31';
import {createPartModel} from './models/part-models.js?v=20260713-10';
import {createAssemblyModel} from './models/assembly-models.js?v=20260713-29';

function inferType(part){
  if(part.type!=='unknown')return part.type;
  const text=(part.name||'')+(part.nameEn||'');
  if(/气弹簧|弹簧|SPRING/i.test(text))return 'spring';
  if(/同步带|平皮带|覆盖带|链条|BELT|CHAIN/i.test(text))return 'belt';
  if(/减速电机|电动机|电机|GEARED MOTOR|MOTOR/i.test(text))return 'motor';
  if(/轴承|垫圈|挡圈|密封圈|卡箍|BEARING|WASHER|COLLAR|RING|CLAMP/i.test(text))return 'ring';
  if(/毛毡|FELT/i.test(text))return 'seal';
  if(/气管|风管|钢管|软管|导带|拉绳|钢丝绳|TUBE|PIPE|HOSE|TAPE|ROPE|WIRE STRING/i.test(text))return 'tube';
  if(/螺钉|拉杆|轴|销|螺栓|探测头|SCREW|ROD|SHAFT|PIN|BOLT|EXPLORER/i.test(text))return 'shaft';
  if(/油塞|闷头|堵头|端帽|PLUG|CAP/i.test(text))return 'plug';
  if(/带轮|PULLEY/i.test(text))return 'pulley';
  if(/齿轮|GEAR/i.test(text))return 'gear';
  if(/速度控制阀|消音器|接头|检测盘|套筒|轴套|轴衬|套|螺母|垫铁|VALVE|SILENCER|COUPLING|DISK|SLEEVE|BUSH|NUT|PAD IRON/i.test(text))return 'cylinder';
  if(/定位片|帘|键|板|LATTICE|PLATE|FLAT|KEY/i.test(text))return 'panel';
  if(/断头装置|换筒装置|接近开关|气动装置|机架|箱|壳|盖|罩|DEVICE|PROXIMITY SWITCH|PNEUMATIC DEVICE|FRAME|BODY|COVER|CASING/i.test(text))return 'casing';
  if(/喂条嘴|喇叭口|NOZZLE|TRUMPET/i.test(text))return 'hood';
  if(/导条|护栏|扶梯|GUIDE BAR|RAILING|LADDER/i.test(text))return 'beam';
  if(/托垫|定位块|专用扳手|平衡块|配重|碰块|减震块|臂|指针|座|支架|WRENCH|BLOCK|ARM|POINTER|SEAT|BRACKET/i.test(text))return 'bracket';
  return 'unknown';
}

const verified09to16Count=jwf1206_pages_09_16_verified.length;
if(verified09to16Count!==93||jwf1206_pages_09_16_verified.some((part,index)=>part.page!==jwf1206Parts09to30[index]?.page)){
  throw new Error('JWF1206第9—16页审计数据与原索引顺序不一致');
}
const verifiedJwf1206Parts09to30=[
  ...jwf1206Parts09to30.slice(0,verified09to16Count).map((part,index)=>({...part,...jwf1206_pages_09_16_verified[index],type:part.type})),
  ...jwf1206Parts09to30.slice(verified09to16Count)
];
function mergeVerifiedPage(source,page,verified,label){
  const pageParts=source.filter(part=>part.page===page);
  if(pageParts.length!==verified.length)throw new Error(`${label}核对数据与原索引数量不一致`);
  let index=0;
  return source.map(part=>part.page===page?{...part,...verified[index++],type:part.type}:part);
}
const verifiedJwf1206Parts09to30With17to26=[17,18,19,20,21,22,23,24,25,26].reduce((result,page)=>mergeVerifiedPage(
  result,page,jwf1206P17P26Verified.filter(part=>part.page===page),`JWF1206第${page}页`
),verifiedJwf1206Parts09to30);
const verifiedJwf1206Parts09to30Through30=[27,28,29,30].reduce((result,page)=>mergeVerifiedPage(
  result,page,jwf1206P27P37Verified.filter(part=>part.page===page),`JWF1206第${page}页`
),verifiedJwf1206Parts09to30With17to26);
const verifiedJwf1206Parts31to50Through37=[31,32,33,34,35,36,37].reduce((result,page)=>mergeVerifiedPage(
  result,page,jwf1206P27P37Verified.filter(part=>part.page===page),`JWF1206第${page}页`
),jwf1206Parts31to50);
const verifiedJwf1206Parts31to50Through49=[38,39,40,41,42,43,44,45,46,47,48,49].reduce((result,page)=>mergeVerifiedPage(
  result,page,jwf1206P38P49Verified.filter(part=>part.page===page),`JWF1206第${page}页`
),verifiedJwf1206Parts31to50Through37);
const verifiedJwf1206Parts31to50Through50=mergeVerifiedPage(
  verifiedJwf1206Parts31to50Through49,50,jwf1206P50P61Verified.filter(part=>part.page===50),'JWF1206第50页'
);
const verifiedJwf1206Parts51to73Through61=[51,52,53,54,55,56,57,58,59,60,61].reduce((result,page)=>mergeVerifiedPage(
  result,page,jwf1206P50P61Verified.filter(part=>part.page===page),`JWF1206第${page}页`
),jwf1206Parts51to73);
const verifiedJwf1206Parts51to73Through73=[62,63,64,65,66,67,68,69,70,71,72,73].reduce((result,page)=>mergeVerifiedPage(
  result,page,jwf1206P62P73Verified.filter(part=>part.page===page),`JWF1206第${page}页`
),verifiedJwf1206Parts51to73Through61);
const verifiedJwf1124cParts=[
  [4,jwf1124cP04Verified,'JWF1124C第4页'],
  [6,jwf1124cP06Verified,'JWF1124C第6页'],
  [8,jwf1124cP08Verified,'JWF1124C第8页'],
  [9,jwf1124cP09Verified,'JWF1124C第9页'],
  [12,jwf1124cP12Verified,'JWF1124C第12页'],
  [13,jwf1124cP13P14Verified.filter(part=>part.page===13),'JWF1124C第13页'],
  [14,jwf1124cP13P14Verified.filter(part=>part.page===14),'JWF1124C第14页'],
  [16,jwf1124cP16Verified,'JWF1124C第16页'],
  [18,jwf1124cP18Verified,'JWF1124C第18页'],
  [20,jwf1124cP20Verified,'JWF1124C第20页'],
  [22,jwf1124cP22Verified,'JWF1124C第22页']
].reduce((result,[page,verified,label])=>mergeVerifiedPage(result,page,verified,label),jwf1124cParts);
const verifiedJwf1102Parts=[
  [5,jwf1102P05Verified,'JWF1102第5页'],
  [8,jwf1102P08P09Verified.filter(part=>part.page===8),'JWF1102第8页'],
  [9,jwf1102P08P09Verified.filter(part=>part.page===9),'JWF1102第9页'],
  [11,jwf1102P11P12Verified.filter(part=>part.page===11),'JWF1102第11页'],
  [12,jwf1102P11P12Verified.filter(part=>part.page===12),'JWF1102第12页'],
  [14,jwf1102P14Verified,'JWF1102第14页']
].reduce((result,[page,verified,label])=>mergeVerifiedPage(result,page,verified,label),jwf1102Parts);
const verifiedFa103bParts=[
  [4,fa103bP04Verified,'FA103B第4页'],
  [6,fa103bP06P07Verified.filter(part=>part.page===6),'FA103B第6页'],
  [7,fa103bP06P07Verified.filter(part=>part.page===7),'FA103B第7页'],
  [9,fa103bP09Verified,'FA103B第9页'],
  [11,fa103bP11Verified,'FA103B第11页']
].reduce((result,[page,verified,label])=>mergeVerifiedPage(result,page,verified,label),fa103bParts);
const verifiedZfa051aParts=[3,4,5,6,7,8,9,10,11,12].reduce((result,page)=>{
  const source=page<=6?zfa051aP03P06Verified:zfa051aP07P12Verified;
  return mergeVerifiedPage(result,page,source.filter(part=>part.page===page),`ZFA051A第${page}页`);
},zfa051aParts);
const verifiedJwf1026Parts=[3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25].reduce((result,page)=>{
  const source=page<=10?jwf1026P03P10Verified:page<=18?jwf1026P11P18Verified:jwf1026P19P25Verified;
  return mergeVerifiedPage(result,page,source.filter(part=>part.page===page),`JWF1026第${page}页`);
},jwf1026Parts);
const verifiedJwf1012Parts=[4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33].reduce((result,page)=>{
  const source=page<=15?jwf1012P04P15Verified:page<=25?jwf1012P16P25Verified:jwf1012P26P33Verified;
  return mergeVerifiedPage(result,page,source.filter(part=>part.page===page),`JWF1012第${page}页`);
},jwf1012Parts);
const indexedParts=[
  ...verifiedJwf1206Parts09to30Through30,...verifiedJwf1206Parts31to50Through50,...verifiedJwf1206Parts51to73Through73,
  ...verifiedZfa051aParts,...verifiedJwf1026Parts,...verifiedJwf1124cParts,...verifiedJwf1012Parts,
  ...tf2513Parts,...verifiedFa103bParts,...verifiedJwf1102Parts
].map(part=>{
  const inferred=inferType(part);
  const verified=part.dataStatus==='厂家资料已核';
  return {...part,type:inferred==='unknown'?'casing':inferred,status:verified?part.status:'资料与3D待核',dataStatus:verified?'厂家资料已核':'待核',modelStatus:verified?(part.modelStatus||'待核'):'待核'};
});
if(jwf1206_0100_verified.length!==coreParts.length)throw new Error('JWF1206-0100审计数据与模型基线数量不一致');
const verifiedCoreParts=coreParts.map((part,index)=>({...part,...jwf1206_0100_verified[index]}));
const parts=[...verifiedCoreParts,...indexedParts].map(part=>{
  const modelSpec=getPartModelSpec(part.manual,part.code,part.recordKey,part.page);
  if(!modelSpec)return part;
  const modelStatus=`${modelSpec.level}3D已核`;
  return {...part,modelSpec,modelStatus,status:`${part.dataStatus==='厂家资料已核'?'资料已核':'资料待核'}·${modelStatus}`};
});

const manualSelect=document.querySelector('#manual-select');
const search=document.querySelector('#part-search');
const content=document.querySelector('#content');
const pagination=document.querySelector('#pagination');
const dialog=document.querySelector('#detail-dialog');
const pageSize=6;
const urlParams=new URLSearchParams(location.search);
let currentManual=urlParams.get('manual')||'jwf1206';
let currentView=urlParams.get('view')||'3d';
let currentPage=1;
let query=urlParams.get('q')||'';
let previewEngine=null;
let detailEngine=null;
let currentCopyCode='';
let copyResetTimer=null;
const previewCache=new Map();

if(!manuals.some(item=>item.id===currentManual))currentManual=manuals[0].id;
if(!['3d','assemblies','pages'].includes(currentView))currentView='3d';
manuals.forEach(manual=>{
  const count=parts.filter(part=>part.manual===manual.id).length;
  manualSelect.insertAdjacentHTML('beforeend',`<option value="${manual.id}">${manual.name}（${count}条零件）</option>`);
});
manualSelect.value=currentManual;
search.value=query;

function pagePath(manual,page){return `assets/manuals/${manual}/pages/page-${String(page).padStart(2,'0')}.jpg`}
function hdPagePath(manual,page){return `assets/manuals/${manual}/pages-hd/page-${String(page).padStart(2,'0')}.jpg`}
function pdfPagePath(manual,page){return `assets/manuals/${manual}/original.pdf#page=${page}`}
function formatDims(part){
  if(!Array.isArray(part.dims)||!part.dims.length)return '图纸未标明确尺寸';
  return part.dims.join(' × ')+(part.dims.every(Number.isFinite)?' mm':'');
}
function formatCode(part){return part.code?.trim()||'厂家未提供件号'}
function formatUsage(part){return part.quantity==null?'待逐格核对':`${part.quantity} ${part.quantityUnit||'件'}/台`}
function isVerified(part){return part.dataStatus==='厂家资料已核'||part.status?.startsWith('已核图')||part.status?.startsWith('资料已核')}
function isModelVerified(part){return part.modelStatus?.includes('已核')||part.status?.includes('3D已核')}
function modelBadge(part){return isModelVerified(part)?part.modelSpec?.level==='尺寸级'?'尺寸3D':'轮廓3D':'3D待核'}

function setCopyCode(code){
  currentCopyCode=code?.trim?.()||'';
  const button=document.querySelector('#copy-code');
  clearTimeout(copyResetTimer);
  button.disabled=!currentCopyCode;
  button.textContent=currentCopyCode?'复制':'无件号';
}

async function copyCurrentCode(){
  if(!currentCopyCode)return;
  const button=document.querySelector('#copy-code');
  let copied=false;
  try{
    if(!navigator.clipboard?.writeText)throw new Error('当前环境不支持剪贴板接口');
    await navigator.clipboard.writeText(currentCopyCode);
    copied=true;
  }catch(error){}
  if(!copied){
    const textarea=document.createElement('textarea');
    textarea.value=currentCopyCode;
    textarea.style.cssText='position:fixed;left:-9999px;top:0;opacity:0';
    textarea.setAttribute('readonly','');
    document.body.append(textarea);
    textarea.select();
    textarea.setSelectionRange(0,textarea.value.length);
    try{copied=document.execCommand('copy')}catch(error){copied=false}
    textarea.remove();
  }
  button.textContent=copied?'已复制':'复制失败';
  clearTimeout(copyResetTimer);
  copyResetTimer=setTimeout(()=>{button.textContent='复制'},1200);
}

function createLitScene(){
  const scene=new THREE.Scene();
  scene.add(new THREE.HemisphereLight(0xeafff8,0x526b68,2.7));
  scene.add(new THREE.AmbientLight(0xffffff,.58));
  const key=new THREE.DirectionalLight(0xffffff,4);key.position.set(4,7,5);scene.add(key);
  const rim=new THREE.DirectionalLight(0x6fffd5,2);rim.position.set(-5,2,-4);scene.add(rim);
  const lowerFill=new THREE.DirectionalLight(0xd9fff5,1.8);lowerFill.position.set(1,-6,4);scene.add(lowerFill);
  const frontFill=new THREE.DirectionalLight(0xffffff,1.1);frontFill.position.set(0,1,7);scene.add(frontFill);
  return scene;
}

function disposeModel(model){
  if(!model)return;
  model.traverse(object=>{
    object.geometry?.dispose?.();
    if(Array.isArray(object.material))object.material.forEach(item=>item.dispose?.());
    else object.material?.dispose?.();
  });
}

function getPreviewEngine(){
  if(previewEngine)return previewEngine;
  try{
    const canvas=document.createElement('canvas');
    const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true,preserveDrawingBuffer:true});
    renderer.setPixelRatio(1);renderer.setSize(640,400,false);renderer.outputColorSpace=THREE.SRGBColorSpace;
    const scene=createLitScene();
    const camera=new THREE.PerspectiveCamera(35,640/400,.1,100);camera.position.set(4.8,3.3,5.4);camera.lookAt(0,0,0);
    previewEngine={canvas,renderer,scene,camera};
  }catch(error){
    previewEngine={failed:true};
  }
  return previewEngine;
}

function modelPreview(key,createModel,fallback){
  if(previewCache.has(key))return previewCache.get(key);
  const engine=getPreviewEngine();
  if(engine.failed)return fallback;
  let model;
  try{
    model=createModel();model.rotation.set(-.08,.52,0);engine.scene.add(model);
    engine.renderer.render(engine.scene,engine.camera);
    const image=engine.canvas.toDataURL('image/webp',.84);
    previewCache.set(key,image);
    if(previewCache.size>24)previewCache.delete(previewCache.keys().next().value);
    return image;
  }catch(error){
    return fallback;
  }finally{
    if(model){engine.scene.remove(model);disposeModel(model)}
  }
}

function previewImage(part){return modelPreview(`part:${part.manual}:${part.recordKey||part.code||formatCode(part)}`,()=>createPartModel(part),part.sourceCrop||hdPagePath(part.manual,part.page))}
function assemblyPreview(assembly){return modelPreview(`assembly:${assembly.manual}:${assembly.code}`,()=>createAssemblyModel(assembly),assembly.sourceImage)}

function getDetailEngine(){
  if(detailEngine)return detailEngine;
  const canvas=document.querySelector('#detail-canvas');
  const stage=canvas.parentElement;
  try{
    const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true});
    renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.outputColorSpace=THREE.SRGBColorSpace;
    const scene=createLitScene();
    const camera=new THREE.PerspectiveCamera(35,1,.1,100);camera.position.set(4.8,3.3,5.4);camera.lookAt(0,0,0);
    const controls=new OrbitControls(camera,canvas);controls.enableDamping=true;controls.minDistance=2.8;controls.maxDistance=11;
    let model=null;
    const resize=()=>{const w=Math.max(stage.clientWidth,1),h=Math.max(stage.clientHeight,1);renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix()};
    const observer=new ResizeObserver(resize);observer.observe(stage);
    const showModel=(nextModel,cameraPosition)=>{
      stage.classList.remove('viewer-failed');
      if(model){scene.remove(model);disposeModel(model);model=null}
      try{
        model=nextModel;scene.add(model);
        camera.position.fromArray(cameraPosition);controls.target.set(0,0,0);controls.update();resize();
        renderer.setAnimationLoop(()=>{controls.update();renderer.render(scene,camera)});
        return true;
      }catch(error){
        renderer.setAnimationLoop(null);model=null;return false;
      }
    };
    detailEngine={
      show(part){try{return showModel(createPartModel(part),[4.8,3.3,5.4])}catch(error){return false}},
      showAssembly(assembly){try{return showModel(createAssemblyModel(assembly),[7.4,5.4,8.2])}catch(error){return false}},
      setExplode(value){model?.userData.setExplode?.(value)},
      pause(){renderer.setAnimationLoop(null)},
      dispose(){
        renderer.setAnimationLoop(null);observer.disconnect();controls.dispose();
        if(model){scene.remove(model);disposeModel(model)}
        renderer.dispose();renderer.forceContextLoss();
      }
    };
  }catch(error){
    detailEngine={failed:true,show:()=>false,pause:()=>{},dispose:()=>{}};
  }
  return detailEngine;
}

function filteredParts(){
  const pool=parts.filter(part=>part.manual===currentManual);
  const q=query.toLowerCase();
  if(!q)return pool;
  const exact=pool.filter(part=>part.code?.toLowerCase()===q);
  if(exact.length)return exact;
  return pool.filter(part=>`${part.name||''}${part.nameEn||''}${part.code||''}${part.assembly||''}`.toLowerCase().includes(q));
}

function filteredAssemblies(){
  const pool=assemblies.filter(assembly=>assembly.manual===currentManual);
  const q=query.toLowerCase();
  if(!q)return pool;
  return pool.filter(assembly=>`${assembly.code}${assembly.name}${assembly.nameEn}`.toLowerCase().includes(q));
}

function updateHeading(count,unit){
  const manual=manuals.find(item=>item.id===currentManual);
  const manualParts=parts.filter(part=>part.manual===currentManual);
  const verified=manualParts.filter(isVerified).length;
  const modeled=manualParts.filter(isModelVerified).length;
  document.querySelector('#manual-kicker').textContent=`${manual.name} · 已收录 ${manualParts.length} 条 · 已核资料 ${verified} 条 · 已建3D ${modeled} 件`;
  document.querySelector('#result-title').textContent={
    '3d':'零件3D预览',
    assemblies:'爆炸总成3D视觉',
    pages:'厂家高清原图页'
  }[currentView]||'零件3D预览';
  document.querySelector('#result-count').textContent=count;
  document.querySelector('#result-unit').textContent=unit;
}

function renderAssemblies(){
  const found=filteredAssemblies();
  const pages=Math.max(1,Math.ceil(found.length/pageSize));
  currentPage=Math.min(currentPage,pages);
  const shown=found.slice((currentPage-1)*pageSize,currentPage*pageSize);
  content.className='assembly-grid';content.innerHTML='';updateHeading(found.length,'个爆炸总成视觉');
  if(!shown.length){
    content.innerHTML='<div class="empty"><strong>这本资料的总成3D正在按爆炸图逐页制作</strong><span>厂家高清原图已经保留；只有核对过爆炸图层级的总成才会出现在这里。</span></div>';
    pagination.innerHTML='';return;
  }
  shown.forEach(assembly=>{
    const card=document.createElement('article');
    card.className='part-card assembly-card';
    const markerLabel=assembly.markerLabel||`1–${assembly.itemCount}`;
    card.innerHTML=`<div class="thumb-stage assembly-stage"><img class="model-preview" alt="${assembly.name} 爆炸总成3D预览"><span class="thumb-code">${assembly.code}</span><span class="model-pill verified">视觉级总成</span><span class="explode-mark">可合拢 / 可爆炸</span></div><div class="card-info"><div class="card-name-row"><h2>${assembly.name}</h2><span class="page">爆炸图第${assembly.drawingPage}页</span></div><div class="card-meta"><div><span>厂家英文</span><strong>${assembly.nameEn}</strong></div><div><span>图中标号</span><strong>${markerLabel}</strong></div></div></div>`;
    card.addEventListener('click',()=>openAssemblyDetail(assembly));
    content.append(card);card.querySelector('.model-preview').src=assemblyPreview(assembly);
  });
  renderPagination(pages);
}

function renderParts(){
  const found=filteredParts();
  const pages=Math.max(1,Math.ceil(found.length/pageSize));
  currentPage=Math.min(currentPage,pages);
  const shown=found.slice((currentPage-1)*pageSize,currentPage*pageSize);
  content.className='part-grid';content.innerHTML='';updateHeading(found.length,'条零件预览');
  if(!shown.length){
    content.innerHTML='<div class="empty"><strong>当前资料没有匹配零件</strong><span>请更换零件名称或件号关键词，也可切换“厂家原图”逐页查看。</span></div>';
    pagination.innerHTML='';return;
  }
  shown.forEach(part=>{
    const card=document.createElement('article');
    const verified=isVerified(part);
    const modelVerified=isModelVerified(part);
    const hasVerifiedDims=verified&&Array.isArray(part.dims)&&part.dims.length>0;
    card.className='part-card';
    card.innerHTML=`<div class="thumb-stage"><img class="model-preview" alt="${part.name} 3D静态预览"><span class="thumb-code">${formatCode(part)}</span><span class="model-pill ${verified?'verified':''}">${verified?'资料已核':'资料待核'}</span><span class="model-state ${modelVerified?'verified':''}">${modelBadge(part)}</span></div><div class="card-info"><div class="card-name-row"><h2>${part.name}</h2><span class="page">原第${part.page}页</span></div><div class="card-meta"><div><span>所属总成</span><strong>${part.assembly}</strong></div><div><span>${hasVerifiedDims?'厂家明确尺寸':verified?'厂家未标尺寸':'录入尺寸（待核）'}</span><strong>${formatDims(part)}</strong></div><div class="usage"><span>单台用量</span><strong>${formatUsage(part)}</strong></div></div></div>`;
    card.addEventListener('click',()=>openDetail(part));
    content.append(card);
    card.querySelector('.model-preview').src=previewImage(part);
  });
  renderPagination(pages);
}

function renderPages(){
  const manual=manuals.find(item=>item.id===currentManual);
  const start=manual.contentStart||4;
  const pages=Array.from({length:Math.max(0,manual.pages-start+1)},(_,i)=>i+start);
  const pageCount=Math.max(1,Math.ceil(pages.length/pageSize));
  currentPage=Math.min(currentPage,pageCount);
  const shown=pages.slice((currentPage-1)*pageSize,currentPage*pageSize);
  content.className='page-grid';content.innerHTML='';updateHeading(pages.length,'页厂家原图');
  shown.forEach(page=>content.insertAdjacentHTML('beforeend',`<a class="page-card" href="${pdfPagePath(currentManual,page)}" target="_blank"><img src="${hdPagePath(currentManual,page)}" loading="lazy" alt="第${page}页"><span>第 ${page} 页 · 300dpi高清页 · 点击打开原始PDF</span></a>`));
  renderPagination(pageCount);
}

function goToPage(value,total){
  const target=Math.max(1,Math.min(total,Number.parseInt(value,10)||currentPage));
  if(target===currentPage)return;
  currentPage=target;render();window.scrollTo({top:150,behavior:'smooth'});
}

function renderPagination(total){
  pagination.innerHTML='';
  const previousButton=document.createElement('button');previousButton.textContent='上一页';previousButton.className='page-step';previousButton.disabled=currentPage===1;previousButton.addEventListener('click',()=>goToPage(currentPage-1,total));pagination.append(previousButton);
  const wanted=new Set([1,total,currentPage-2,currentPage-1,currentPage,currentPage+1,currentPage+2]);
  const pageNumbers=[...wanted].filter(i=>i>=1&&i<=total).sort((a,b)=>a-b);
  let previous=0;
  for(const i of pageNumbers){
    if(previous&&i-previous>1){const gap=document.createElement('span');gap.textContent='…';gap.className='page-gap';pagination.append(gap)}
    const button=document.createElement('button');button.textContent=i;button.classList.toggle('active',i===currentPage);button.setAttribute('aria-label',`第${i}页`);button.addEventListener('click',()=>goToPage(i,total));pagination.append(button);previous=i;
  }
  const nextButton=document.createElement('button');nextButton.textContent='下一页';nextButton.className='page-step';nextButton.disabled=currentPage===total;nextButton.addEventListener('click',()=>goToPage(currentPage+1,total));pagination.append(nextButton);
  const jump=document.createElement('form');jump.className='page-jump';jump.innerHTML=`<span>到</span><input type="number" inputmode="numeric" min="1" max="${total}" value="${currentPage}" aria-label="输入页码"><span>页</span><button type="submit">跳转</button>`;
  jump.addEventListener('submit',event=>{event.preventDefault();goToPage(jump.querySelector('input').value,total)});
  pagination.append(jump);
}

function render(){
  if(currentView==='assemblies')renderAssemblies();
  else if(currentView==='pages')renderPages();
  else renderParts();
}

function openDetail(part){
  const manualName=manuals.find(item=>item.id===part.manual)?.name||part.manual;
  const verified=isVerified(part);
  const modelVerified=isModelVerified(part);
  document.querySelector('.detail-info').scrollTop=0;
  document.querySelector('#detail-code-label').textContent='零件件号';
  document.querySelector('#detail-page-label').textContent='原手册位置';
  document.querySelector('#detail-status-label').textContent='核对状态';
  document.querySelector('#detail-sheet-label').textContent='原图页眉/总成';
  document.querySelector('#detail-quantity-label').textContent='单台用量';
  document.querySelector('#stage-help').textContent='拖动旋转 · 滚轮/双指缩放';
  document.querySelector('#explode-control').hidden=true;
  document.querySelector('#stage-code').textContent=formatCode(part);
  document.querySelector('#detail-assembly').textContent=`${part.assembly}${part.sheetPage?` · ${part.sheetPage}`:''} · ${manualName}`;
  document.querySelector('#detail-name').textContent=part.name;
  document.querySelector('#detail-name-en').textContent=part.nameEn||'厂家原格未提供英文描述';
  document.querySelector('#detail-code').textContent=formatCode(part);
  setCopyCode(part.code);
  document.querySelector('#detail-page').textContent=`第 ${part.page} 页`;
  document.querySelector('#detail-status').textContent=`${part.dataStatus||'待核'} · ${part.modelStatus||'待核'}`;
  document.querySelector('#detail-dims').textContent=formatDims(part);
  document.querySelector('#detail-dims-label').textContent=verified&&part.dims?.length?'厂家明确尺寸':verified?'厂家未标尺寸':'录入尺寸（待核）';
  document.querySelector('#detail-sheet').textContent=part.assembly||'厂家未提供';
  document.querySelector('#detail-quantity').textContent=formatUsage(part);
  const assumptions=part.modelSpec?.source?.assumptions?.join('；');
  document.querySelector('#accuracy').textContent=verified
    ?modelVerified
      ?`厂家资料和主要3D轮廓均已逐项核对。${part.dimensionNote||'图纸未标注尺寸仍不得推测'}${assumptions?`；未标部分：${assumptions}`:'；未标注的高度、深度、板厚和背面结构不作为准确数据'}。`
      :`件号、名称、英文描述、页码和厂家明确尺寸已按原格核对；当前3D仍是待核预览，不可作为加工、采购或装配依据。`
    :'当前录入的件号、名称、尺寸和3D均尚未逐件与厂家原图核对，不可作为申报、采购、加工或装配依据；下方厂家原页已默认展开，请以原图为准。';
  const source=part.sourceCrop||hdPagePath(part.manual,part.page);
  const originPreview=document.querySelector('#origin-preview');
  const showOrigin=document.querySelector('#show-origin');
  document.querySelector('#origin-image').src=source;
  document.querySelector('#origin-caption').textContent=part.sourceCrop
    ?`厂家原手册第${part.page}页 · 600dpi零件原格（非AI重画）`
    :`厂家原手册第${part.page}页 · 300dpi高清整页（非AI重画）`;
  const pageLink=document.querySelector('#open-page');
  pageLink.href=pdfPagePath(part.manual,part.page);pageLink.textContent='打开原始PDF页';
  const vectorLink=document.querySelector('#open-vector');
  vectorLink.hidden=!part.sourceVector;vectorLink.href=part.sourceVector||'#';vectorLink.textContent='打开矢量原格';
  originPreview.classList.add('show');
  showOrigin.textContent=part.sourceCrop?'隐藏厂家原格':'隐藏厂家原页';
  if(!dialog.open)dialog.showModal();
  const active=getDetailEngine().show(part);
  const fallback=document.querySelector('#detail-fallback');
  fallback.classList.toggle('show',!active);fallback.src=previewImage(part);
  document.querySelector('.detail-stage').classList.toggle('viewer-failed',!active);
}

function openAssemblyDetail(assembly){
  const manualName=manuals.find(item=>item.id===assembly.manual)?.name||assembly.manual;
  document.querySelector('.detail-info').scrollTop=0;
  document.querySelector('#detail-code-label').textContent='总成号';
  document.querySelector('#detail-page-label').textContent='厂家爆炸图';
  document.querySelector('#detail-status-label').textContent='模型级别';
  document.querySelector('#detail-dims-label').textContent='爆炸图标号';
  document.querySelector('#detail-sheet-label').textContent='配套明细表';
  document.querySelector('#detail-quantity-label').textContent='总成构件';
  document.querySelector('#stage-help').textContent='拖动旋转 · 双指缩放 · 下方调节爆炸程度';
  document.querySelector('#stage-code').textContent=assembly.code;
  document.querySelector('#detail-assembly').textContent=`${assembly.code} · ${manualName}`;
  document.querySelector('#detail-name').textContent=assembly.name;
  document.querySelector('#detail-name-en').textContent=assembly.nameEn;
  document.querySelector('#detail-code').textContent=assembly.code;
  setCopyCode(assembly.code);
  document.querySelector('#detail-page').textContent=`第 ${assembly.drawingPage} 页`;
  document.querySelector('#detail-status').textContent=assembly.status;
  document.querySelector('#detail-dims').textContent=assembly.markerLabel||`1–${assembly.itemCount}`;
  document.querySelector('#detail-sheet').textContent=assembly.bomPages.map(page=>`第${page}页`).join('、');
  document.querySelector('#detail-quantity').textContent=`${assembly.itemCount} 项`;
  document.querySelector('#accuracy').textContent=`${assembly.accuracy} 该模型用于理解结构和装配顺序，不可作为加工、配合或维修尺寸依据。`;
  const control=document.querySelector('#explode-control');control.hidden=false;
  const range=document.querySelector('#explode-range');range.value=76;
  document.querySelector('#assembly-legend').innerHTML=assembly.keyParts.map(item=>`<span>${item}</span>`).join('');
  document.querySelector('#origin-image').src=assembly.sourceImage;
  document.querySelector('#origin-caption').textContent=`厂家原手册第${assembly.drawingPage}页 · ${assembly.sourceDpi||300}dpi高清爆炸图（非AI重画）`;
  document.querySelector('#origin-preview').classList.add('show');
  document.querySelector('#show-origin').textContent='隐藏厂家爆炸图';
  const vectorLink=document.querySelector('#open-vector');vectorLink.hidden=false;vectorLink.href=assembly.sourceVector;vectorLink.textContent='打开原始PDF页';
  const pageLink=document.querySelector('#open-page');pageLink.href=assembly.sourceImage;pageLink.textContent='打开高清整页';
  if(!dialog.open)dialog.showModal();
  const active=getDetailEngine().showAssembly(assembly);getDetailEngine().setExplode(.76);
  const fallback=document.querySelector('#detail-fallback');fallback.classList.toggle('show',!active);fallback.src=assemblyPreview(assembly);
  document.querySelector('.detail-stage').classList.toggle('viewer-failed',!active);
}

manualSelect.addEventListener('change',()=>{currentManual=manualSelect.value;currentPage=1;search.value='';query='';render()});
let searchTimer;
search.addEventListener('input',()=>{clearTimeout(searchTimer);searchTimer=setTimeout(()=>{query=search.value.trim();currentPage=1;render()},160)});
document.querySelectorAll('.view-switch button').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('.view-switch button').forEach(item=>item.classList.remove('active'));
  button.classList.add('active');currentView=button.dataset.view;currentPage=1;render();
}));
document.querySelector('.close-detail').addEventListener('click',()=>dialog.close());
document.querySelector('#copy-code').addEventListener('click',copyCurrentCode);
dialog.addEventListener('close',()=>{
  detailEngine?.pause();
  if(detailEngine?.failed)detailEngine=null;
  document.querySelector('.detail-stage').classList.remove('viewer-failed');
});
document.querySelector('#show-origin').addEventListener('click',event=>{
  const shown=document.querySelector('#origin-preview').classList.toggle('show');
  event.currentTarget.textContent=shown?'隐藏厂家原图':'查看厂家原图';
});
document.querySelector('#explode-range').addEventListener('input',event=>detailEngine?.setExplode(Number(event.currentTarget.value)/100));
window.addEventListener('beforeunload',()=>{
  detailEngine?.dispose();
  if(previewEngine?.renderer){previewEngine.renderer.dispose();previewEngine.renderer.forceContextLoss()}
});

document.querySelectorAll('.view-switch button').forEach(button=>button.classList.toggle('active',button.dataset.view===currentView));
render();
const directPart=urlParams.get('part');
if(directPart){const target=parts.find(part=>part.code===directPart);if(target)openDetail(target)}
const directAssembly=urlParams.get('assembly');
if(directAssembly){const target=assemblies.find(assembly=>assembly.code===directAssembly);if(target)openAssemblyDetail(target)}
