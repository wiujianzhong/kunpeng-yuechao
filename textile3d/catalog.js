import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {manuals,parts as coreParts} from './data/parts.js?v=20260713-8';
import {jwf1206Parts09to30} from './data/jwf1206-pages-09-30.js?v=20260713-8';
import {jwf1206Parts31to50} from './data/jwf1206-pages-31-50.js?v=20260713-8';
import {jwf1206Parts51to73} from './data/jwf1206-pages-51-73.js?v=20260713-8';
import {zfa051aParts} from './data/zfa051a-parts.js?v=20260713-8';
import {jwf1026Parts} from './data/jwf1026-parts.js?v=20260713-8';
import {jwf1124cParts} from './data/jwf1124c-parts.js?v=20260713-8';
import {jwf1012Parts} from './data/jwf1012-parts.js?v=20260713-8';
import {tf2513Parts} from './data/tf2513-parts.js?v=20260713-8';
import {fa103bParts} from './data/fa103b-parts.js?v=20260713-8';
import {jwf1102Parts} from './data/jwf1102-parts.js?v=20260713-8';
import {createPartModel} from './models/part-models.js?v=20260713-8';

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

const indexedParts=[
  ...jwf1206Parts09to30,...jwf1206Parts31to50,...jwf1206Parts51to73,
  ...zfa051aParts,...jwf1026Parts,...jwf1124cParts,...jwf1012Parts,
  ...tf2513Parts,...fa103bParts,...jwf1102Parts
].map(part=>{
  const inferred=inferType(part);
  return {...part,type:inferred==='unknown'?'casing':inferred,status:'资料与3D待核'};
});
const parts=[...coreParts,...indexedParts];

const manualSelect=document.querySelector('#manual-select');
const search=document.querySelector('#part-search');
const content=document.querySelector('#content');
const pagination=document.querySelector('#pagination');
const dialog=document.querySelector('#detail-dialog');
const pageSize=6;
const urlParams=new URLSearchParams(location.search);
let currentManual=urlParams.get('manual')||'jwf1206';
let currentView='3d';
let currentPage=1;
let query=urlParams.get('q')||'';
let previewEngine=null;
let detailEngine=null;
const previewCache=new Map();

if(!manuals.some(item=>item.id===currentManual))currentManual=manuals[0].id;
manuals.forEach(manual=>{
  const count=parts.filter(part=>part.manual===manual.id).length;
  manualSelect.insertAdjacentHTML('beforeend',`<option value="${manual.id}">${manual.name}（${count}条零件）</option>`);
});
manualSelect.value=currentManual;
search.value=query;

function pagePath(manual,page){return `assets/manuals/${manual}/pages/page-${String(page).padStart(2,'0')}.jpg`}
function formatDims(part){
  if(!Array.isArray(part.dims)||!part.dims.length)return '图纸未标明确尺寸';
  return part.dims.join(' × ')+(part.dims.every(Number.isFinite)?' mm':'');
}
function formatCode(part){return part.code?.trim()||'厂家未提供件号'}
function isVerified(part){return part.status?.startsWith('已核图')}

function createLitScene(){
  const scene=new THREE.Scene();
  scene.add(new THREE.HemisphereLight(0xe5fff9,0x0a181b,2.3));
  const key=new THREE.DirectionalLight(0xffffff,4);key.position.set(4,7,5);scene.add(key);
  const rim=new THREE.DirectionalLight(0x6fffd5,2);rim.position.set(-5,2,-4);scene.add(rim);
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

function previewImage(part){
  const key=`${part.manual}:${formatCode(part)}`;
  if(previewCache.has(key))return previewCache.get(key);
  const engine=getPreviewEngine();
  if(engine.failed)return part.sourceCrop||pagePath(part.manual,part.page);
  let model;
  try{
    model=createPartModel(part);model.rotation.set(-.08,.52,0);engine.scene.add(model);
    engine.renderer.render(engine.scene,engine.camera);
    const image=engine.canvas.toDataURL('image/webp',.84);
    previewCache.set(key,image);
    if(previewCache.size>24)previewCache.delete(previewCache.keys().next().value);
    return image;
  }catch(error){
    return part.sourceCrop||pagePath(part.manual,part.page);
  }finally{
    if(model){engine.scene.remove(model);disposeModel(model)}
  }
}

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
    detailEngine={
      show(part){
        stage.classList.remove('viewer-failed');
        if(model){scene.remove(model);disposeModel(model);model=null}
        try{
          model=createPartModel(part);scene.add(model);
          camera.position.set(4.8,3.3,5.4);controls.target.set(0,0,0);controls.update();resize();
          renderer.setAnimationLoop(()=>{controls.update();renderer.render(scene,camera)});
          return true;
        }catch(error){
          renderer.setAnimationLoop(null);model=null;return false;
        }
      },
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

function updateHeading(count,unit){
  const manual=manuals.find(item=>item.id===currentManual);
  const manualParts=parts.filter(part=>part.manual===currentManual);
  const verified=manualParts.filter(isVerified).length;
  document.querySelector('#manual-kicker').textContent=`${manual.name} · 已收录 ${manualParts.length} 条 · 已核图 ${verified} 条`;
  document.querySelector('#result-title').textContent=currentView==='3d'?'零件3D预览':'厂家原图页';
  document.querySelector('#result-count').textContent=count;
  document.querySelector('#result-unit').textContent=unit;
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
    card.className='part-card';
    card.innerHTML=`<div class="thumb-stage"><img class="model-preview" alt="${part.name} 3D静态预览"><span class="thumb-code">${formatCode(part)}</span><span class="model-pill ${verified?'verified':''}">${verified?'已核图':'资料待核'}</span></div><div class="card-info"><div class="card-name-row"><h2>${part.name}</h2><span class="page">原第${part.page}页</span></div><div class="card-meta"><div><span>所属总成</span><strong>${part.assembly}</strong></div><div><span>${verified?'厂家明确尺寸':'录入尺寸（待核）'}</span><strong>${formatDims(part)}</strong></div></div></div>`;
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
  shown.forEach(page=>content.insertAdjacentHTML('beforeend',`<a class="page-card" href="${pagePath(currentManual,page)}" target="_blank"><img src="${pagePath(currentManual,page)}" loading="lazy" alt="第${page}页"><span>第 ${page} 页 · 点击查看高清原图</span></a>`));
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

function render(){currentView==='3d'?renderParts():renderPages()}

function openDetail(part){
  const manualName=manuals.find(item=>item.id===part.manual)?.name||part.manual;
  const verified=isVerified(part);
  document.querySelector('#stage-code').textContent=formatCode(part);
  document.querySelector('#detail-assembly').textContent=`${part.assembly}${part.sheetPage?` · ${part.sheetPage}`:''} · ${manualName}`;
  document.querySelector('#detail-name').textContent=part.name;
  document.querySelector('#detail-name-en').textContent=part.nameEn||'厂家原格未提供英文描述';
  document.querySelector('#detail-code').textContent=formatCode(part);
  document.querySelector('#detail-page').textContent=`第 ${part.page} 页`;
  document.querySelector('#detail-status').textContent=part.status;
  document.querySelector('#detail-dims').textContent=formatDims(part);
  document.querySelector('#detail-dims-label').textContent=verified?'厂家明确尺寸':'录入尺寸（待核）';
  document.querySelector('#detail-sheet').textContent=part.assembly||'厂家未提供';
  document.querySelector('#detail-quantity').textContent=part.quantity??'厂家未识别';
  document.querySelector('#accuracy').textContent=verified
    ?`已按厂家原格核对件号、名称、英文描述和主要轮廓。${part.dimensionNote||'图纸未标注尺寸仍不得推测'}；未标注的高度、深度、板厚和背面结构不作为准确数据。`
    :'当前录入的件号、名称、尺寸和3D均尚未逐件与厂家原图核对，不可作为申报、采购、加工或装配依据；下方厂家原页已默认展开，请以原图为准。';
  const source=part.sourceCrop||pagePath(part.manual,part.page);
  const originPreview=document.querySelector('#origin-preview');
  const showOrigin=document.querySelector('#show-origin');
  document.querySelector('#origin-image').src=source;
  document.querySelector('#origin-caption').textContent=part.sourceCrop
    ?`厂家原手册第${part.page}页 · 该零件高清原格（非AI重画）`
    :`厂家原手册第${part.page}页整页原图`;
  document.querySelector('#open-page').href=pagePath(part.manual,part.page);
  const vectorLink=document.querySelector('#open-vector');
  vectorLink.hidden=!part.sourceVector;vectorLink.href=part.sourceVector||'#';
  originPreview.classList.add('show');
  showOrigin.textContent=part.sourceCrop?'隐藏厂家原格':'隐藏厂家原页';
  if(!dialog.open)dialog.showModal();
  const active=getDetailEngine().show(part);
  const fallback=document.querySelector('#detail-fallback');
  fallback.classList.toggle('show',!active);fallback.src=previewImage(part);
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
dialog.addEventListener('close',()=>{
  detailEngine?.pause();
  if(detailEngine?.failed)detailEngine=null;
  document.querySelector('.detail-stage').classList.remove('viewer-failed');
});
document.querySelector('#show-origin').addEventListener('click',event=>{
  const shown=document.querySelector('#origin-preview').classList.toggle('show');
  event.currentTarget.textContent=shown?'隐藏厂家原图':'查看厂家原图';
});
window.addEventListener('beforeunload',()=>{
  detailEngine?.dispose();
  if(previewEngine?.renderer){previewEngine.renderer.dispose();previewEngine.renderer.forceContextLoss()}
});

render();
const directPart=urlParams.get('part');
if(directPart){const target=parts.find(part=>part.code===directPart);if(target)openDetail(target)}
