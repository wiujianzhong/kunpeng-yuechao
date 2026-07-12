import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {manuals,parts as coreParts} from './data/parts.js?v=20260713-7';
import {jwf1206Parts09to30} from './data/jwf1206-pages-09-30.js?v=20260713-7';
import {jwf1206Parts31to50} from './data/jwf1206-pages-31-50.js?v=20260713-7';
import {jwf1206Parts51to73} from './data/jwf1206-pages-51-73.js?v=20260713-7';
import {zfa051aParts} from './data/zfa051a-parts.js?v=20260713-7';
import {jwf1026Parts} from './data/jwf1026-parts.js?v=20260713-7';
import {jwf1124cParts} from './data/jwf1124c-parts.js?v=20260713-7';
import {jwf1012Parts} from './data/jwf1012-parts.js?v=20260713-7';
import {tf2513Parts} from './data/tf2513-parts.js?v=20260713-7';
import {fa103bParts} from './data/fa103b-parts.js?v=20260713-7';
import {jwf1102Parts} from './data/jwf1102-parts.js?v=20260713-7';
import {createPartModel} from './models/part-models.js?v=20260713-7';

function inferType(part){
 if(part.type!=='unknown')return part.type;const text=part.name+part.nameEn;
 if(/气弹簧|弹簧|SPRING/i.test(text))return 'spring';if(/同步带|平皮带|覆盖带|链条|BELT|CHAIN/i.test(text))return 'belt';if(/减速电机|电动机|电机|GEARED MOTOR|MOTOR/i.test(text))return 'motor';if(/轴承|垫圈|挡圈|密封圈|卡箍|BEARING|WASHER|COLLAR|RING|CLAMP/i.test(text))return 'ring';if(/毛毡|FELT/i.test(text))return 'seal';if(/气管|风管|钢管|软管|导带|拉绳|钢丝绳|TUBE|PIPE|HOSE|TAPE|ROPE|WIRE STRING/i.test(text))return 'tube';if(/螺钉|拉杆|轴|销|螺栓|探测头|SCREW|ROD|SHAFT|PIN|BOLT|EXPLORER/i.test(text))return 'shaft';if(/油塞|闷头|堵头|端帽|PLUG|CAP/i.test(text))return 'plug';if(/带轮|PULLEY/i.test(text))return 'pulley';if(/齿轮|GEAR/i.test(text))return 'gear';if(/速度控制阀|消音器|接头|检测盘|套筒|轴套|轴衬|套|螺母|垫铁|VALVE|SILENCER|COUPLING|DISK|SLEEVE|BUSH|NUT|PAD IRON/i.test(text))return 'cylinder';if(/定位片|帘|键|板|LATTICE|PLATE|FLAT|KEY/i.test(text))return 'panel';if(/断头装置|换筒装置|接近开关|气动装置|机架|箱|壳|盖|罩|DEVICE|PROXIMITY SWITCH|PNEUMATIC DEVICE|FRAME|BODY|COVER|CASING/i.test(text))return 'casing';if(/喂条嘴|喇叭口|NOZZLE|TRUMPET/i.test(text))return 'hood';if(/导条|护栏|扶梯|GUIDE BAR|RAILING|LADDER/i.test(text))return 'beam';if(/托垫|定位块|专用扳手|平衡块|配重|碰块|减震块|臂|指针|座|支架|WRENCH|BLOCK|ARM|POINTER|SEAT|BRACKET/i.test(text))return 'bracket';return 'unknown';
}
const indexedParts=[...jwf1206Parts09to30,...jwf1206Parts31to50,...jwf1206Parts51to73,...zfa051aParts,...jwf1026Parts,...jwf1124cParts,...jwf1012Parts,...tf2513Parts,...fa103bParts,...jwf1102Parts].map(part=>{const inferred=inferType(part);return {...part,type:inferred==='unknown'?'casing':inferred,status:inferred==='unknown'?'通用3D·待精修':'参数化3D已建模'}});
const parts=[...coreParts,...indexedParts];

const manualSelect=document.querySelector('#manual-select');
const search=document.querySelector('#part-search');
const content=document.querySelector('#content');
const pagination=document.querySelector('#pagination');
const dialog=document.querySelector('#detail-dialog');
const pageSize=6;
const urlParams=new URLSearchParams(location.search);
let currentManual=urlParams.get('manual')||'jwf1206',currentView='3d',currentPage=1,query=urlParams.get('q')||'',detailViewer=null,cardViewers=[];

manuals.forEach(m=>{const count=parts.filter(p=>p.manual===m.id).length;manualSelect.insertAdjacentHTML('beforeend',`<option value="${m.id}">${m.name}（${count}个3D）</option>`)});
manualSelect.value=currentManual;search.value=query;

function pagePath(manual,page){return `assets/manuals/${manual}/pages/page-${String(page).padStart(2,'0')}.jpg`}
function formatDims(part){if(!Array.isArray(part.dims)||!part.dims.length)return '图纸未标总尺寸';return part.dims.join(' × ')+(part.dims.every(Number.isFinite)?' mm':'')}
function formatCode(part){return part.code?.trim()||'厂家未提供件号'}

function makeViewer(canvas,part,interactive=false){
 const scene=new THREE.Scene();const camera=new THREE.PerspectiveCamera(35,1,.1,100);camera.position.set(4.8,3.3,5.4);camera.lookAt(0,0,0);
 let renderer;try{renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true})}catch(error){canvas.parentElement?.classList.add('viewer-failed');return()=>{}}renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.outputColorSpace=THREE.SRGBColorSpace;
 scene.add(new THREE.HemisphereLight(0xe5fff9,0x0a181b,2.3));const key=new THREE.DirectionalLight(0xffffff,4);key.position.set(4,7,5);scene.add(key);const rim=new THREE.DirectionalLight(0x6fffd5,2);rim.position.set(-5,2,-4);scene.add(rim);
 const model=createPartModel(part);scene.add(model);let controls=null;if(interactive){controls=new OrbitControls(camera,canvas);controls.enableDamping=true;controls.minDistance=2.8;controls.maxDistance=11}
 const resize=()=>{const parent=canvas.parentElement,w=parent.clientWidth,h=parent.clientHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix()};const observer=new ResizeObserver(resize);observer.observe(canvas.parentElement);resize();
 renderer.setAnimationLoop(()=>{if(!interactive)model.rotation.y+=.004;controls?.update();renderer.render(scene,camera)});
 let stopped=false;return()=>{if(stopped)return;stopped=true;renderer.setAnimationLoop(null);observer.disconnect();controls?.dispose();scene.traverse(object=>{object.geometry?.dispose?.();if(Array.isArray(object.material))object.material.forEach(item=>item.dispose?.());else object.material?.dispose?.()});renderer.dispose();renderer.forceContextLoss();canvas.width=1;canvas.height=1};
}

function filteredParts(){const pool=parts.filter(p=>p.manual===currentManual);const q=query.toLowerCase();if(!q)return pool;const exact=pool.filter(p=>p.code?.toLowerCase()===q);return exact.length?exact:pool.filter(p=>(p.name+p.code+p.assembly).toLowerCase().includes(q))}

function updateHeading(count,unit){const manual=manuals.find(m=>m.id===currentManual);const modeled=parts.filter(p=>p.manual===currentManual).length;document.querySelector('#manual-kicker').textContent=`${manual.name} · 已生成 ${modeled} 个3D`;document.querySelector('#result-title').textContent=currentView==='3d'?'零件3D模型':'厂家原图页';document.querySelector('#result-count').textContent=count;document.querySelector('#result-unit').textContent=unit}

function renderParts(){
 cardViewers.splice(0).forEach(stop=>stop());const found=filteredParts();const pages=Math.max(1,Math.ceil(found.length/pageSize));currentPage=Math.min(currentPage,pages);const shown=found.slice((currentPage-1)*pageSize,currentPage*pageSize);content.className='part-grid';content.innerHTML='';updateHeading(found.length,'个可旋转3D模型');
 if(!shown.length){content.innerHTML='<div class="empty"><strong>这本资料的零件3D还在逐件建模</strong><span>二维原图已经保留，可切换“厂家原图”查看；只有完成独立几何建模的零件才会出现在这里。</span></div>';pagination.innerHTML='';return}
 shown.forEach(part=>{
  const card=document.createElement('article');card.className='part-card';const pill=part.status.startsWith('真3D')?'尺寸3D':part.status.includes('待精修')?'待精修3D':'参数3D';const dimsText=formatDims(part);card.innerHTML=`<div class="thumb-stage"><canvas></canvas><span class="thumb-code">${formatCode(part)}</span><span class="model-pill">${pill}</span></div><div class="card-info"><div class="card-name-row"><h2>${part.name}</h2><span class="page">原第${part.page}页</span></div><div class="card-meta"><div><span>所属总成</span><strong>${part.assembly}</strong></div><div><span>图纸尺寸</span><strong>${dimsText}</strong></div></div></div>`;
  card.addEventListener('click',()=>openDetail(part));content.append(card);cardViewers.push(makeViewer(card.querySelector('canvas'),part));
 });renderPagination(pages);
}

function renderPages(){
 cardViewers.splice(0).forEach(stop=>stop());const manual=manuals.find(m=>m.id===currentManual);const start=manual.contentStart||4;const pages=Array.from({length:Math.max(0,manual.pages-start+1)},(_,i)=>i+start);const pageCount=Math.max(1,Math.ceil(pages.length/pageSize));currentPage=Math.min(currentPage,pageCount);const shown=pages.slice((currentPage-1)*pageSize,currentPage*pageSize);content.className='page-grid';content.innerHTML='';updateHeading(pages.length,'页零件原图');
 shown.forEach(page=>content.insertAdjacentHTML('beforeend',`<a class="page-card" href="${pagePath(currentManual,page)}" target="_blank"><img src="${pagePath(currentManual,page)}" loading="lazy" alt="第${page}页"><span>第 ${page} 页 · 点击查看高清原图</span></a>`));renderPagination(pageCount);
}

function renderPagination(total){pagination.innerHTML='';const wanted=new Set([1,total,currentPage-2,currentPage-1,currentPage,currentPage+1,currentPage+2]);const pageNumbers=[...wanted].filter(i=>i>=1&&i<=total).sort((a,b)=>a-b);let previous=0;for(const i of pageNumbers){if(previous&&i-previous>1){const gap=document.createElement('span');gap.textContent='…';gap.className='page-gap';pagination.append(gap)}const button=document.createElement('button');button.textContent=i;button.classList.toggle('active',i===currentPage);button.addEventListener('click',()=>{currentPage=i;render();window.scrollTo({top:180,behavior:'smooth'})});pagination.append(button);previous=i}}

function render(){currentView==='3d'?renderParts():renderPages()}

function openDetail(part){
 const manualName=manuals.find(m=>m.id===part.manual)?.name||part.manual;document.querySelector('#stage-code').textContent=formatCode(part);document.querySelector('#detail-assembly').textContent=`${part.assembly} · ${manualName}`;document.querySelector('#detail-name').textContent=part.name;document.querySelector('#detail-code').textContent=formatCode(part);document.querySelector('#detail-page').textContent=`第 ${part.page} 页`;document.querySelector('#detail-status').textContent=part.status;document.querySelector('#detail-dims').textContent=formatDims(part);
 const src=pagePath(part.manual,part.page);document.querySelector('#origin-image').src=src;document.querySelector('#origin-caption').textContent=`厂家原手册第${part.page}页（当前先展示整页，后续可继续细裁单格）`;document.querySelector('#open-page').href=src;document.querySelector('#origin-preview').classList.remove('show');dialog.showModal();detailViewer?.();detailViewer=makeViewer(document.querySelector('#detail-canvas'),part,true);
}

manualSelect.addEventListener('change',()=>{currentManual=manualSelect.value;currentPage=1;search.value='';query='';render()});
let searchTimer;search.addEventListener('input',()=>{clearTimeout(searchTimer);searchTimer=setTimeout(()=>{query=search.value.trim();currentPage=1;render()},160)});
document.querySelectorAll('.view-switch button').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('.view-switch button').forEach(b=>b.classList.remove('active'));button.classList.add('active');currentView=button.dataset.view;currentPage=1;render()}));
document.querySelector('.close-detail').addEventListener('click',()=>dialog.close());dialog.addEventListener('close',()=>{detailViewer?.();detailViewer=null});
document.querySelector('#show-origin').addEventListener('click',()=>document.querySelector('#origin-preview').classList.toggle('show'));
render();const directPart=urlParams.get('part');if(directPart){const target=parts.find(p=>p.code===directPart);if(target)openDetail(target)}
