import {DEFAULTS,FIELDS,calculate,fmt} from './engine.mjs';
import {threeView,cutView,treadView,tableImage,fabricationSheets,csv,dxf} from './drawings.mjs';
import {createViewer} from './view3d.mjs';
import {svgPNG,modelPNG} from './images.mjs';

const $=s=>document.querySelector(s);
const storageKey='xiaowu-ladder-studio-v1';
let model=null,viewer=null,unit='mm',valid=false,timer=null;
const bootstrap=JSON.parse($('#bootstrap-params').textContent||'{}');
let initial={};
try{initial=Object.keys(bootstrap).length?bootstrap:JSON.parse(localStorage.getItem(storageKey)||'{}');}catch{/* 浏览器禁用存储时仍可正常出图。 */}
initial={...DEFAULTS,...initial};
for(const key of Object.keys(DEFAULTS))initial[key]=Number.isFinite(Number(initial[key]))?Number(initial[key]):DEFAULTS[key];
const advanced=$('#advanced-fields');
advanced.innerHTML=FIELDS.map(([key,label,suffix,min,max,step])=>`<div class="advanced-field"><label for="${key}">${label}</label><div><input id="${key}" name="${key}" type="number" inputmode="decimal" min="${min}" max="${max}" step="${step}" value="${initial[key]}"><em>${suffix}</em></div></div>`).join('');
$('#height').value=initial.height;$('#run').value=initial.run;
for(const id of ['height','run']){const input=document.getElementById(id);input.min=id==='height'?300:200;input.max=id==='height'?12000:15000;input.step=1;}
document.querySelectorAll('.main-unit').forEach(el=>el.textContent='mm');
document.querySelectorAll('[data-unit]').forEach(el=>{const active=el.dataset.unit==='mm';el.classList.toggle('active',active);el.setAttribute('aria-pressed',String(active));});
document.querySelectorAll('[data-tab]').forEach(el=>{const active=el.dataset.tab==='3d';el.classList.toggle('active',active);el.setAttribute('aria-selected',String(active));});
document.querySelectorAll('.view-panel').forEach(el=>el.hidden=el.id!=='panel-3d');
document.querySelectorAll('[data-camera]').forEach(el=>el.classList.toggle('active',el.dataset.camera==='iso'));
$('#labels').checked=true;
const defaultRotation=!matchMedia('(prefers-reduced-motion: reduce)').matches;
$('#rotation').textContent=defaultRotation?'暂停旋转':'开始旋转';$('#rotation').setAttribute('aria-pressed',String(defaultRotation));
$('#model-host').replaceChildren();
try{
  viewer=createViewer($('#model-host'),rotating=>{
    $('#rotation').textContent=rotating?'暂停旋转':'开始旋转';$('#rotation').setAttribute('aria-pressed',String(rotating));
  });
}catch(error){
  const node=document.createElement('p');node.textContent='当前浏览器未启用3D显示，请先查看三视图；也可换浏览器打开。';$('#model-host').append(node);
  console.warn('3D初始化失败：',error.message);
}

function params(){
  const output={};
  for(const key of Object.keys(DEFAULTS)){
    const value=document.getElementById(key).value;
    output[key]=value.trim()===''?NaN:Number(value);
  }
  if(unit==='m'){output.height*=1000;output.run*=1000;}
  return output;
}

function toast(message){
  $('#toast').textContent=message;$('#toast').classList.add('show');
  clearTimeout(toast.timer);toast.timer=setTimeout(()=>$('#toast').classList.remove('show'),3000);
}

function exportState(enabled){
  for(const id of ['save-html','download-svg','download-csv','download-dxf','print'])document.getElementById(id).disabled=!enabled;
  document.querySelectorAll('[data-image]').forEach(button=>button.disabled=!enabled||(button.dataset.image==='model'&&!viewer));
}

function render(){
  clearTimeout(timer);timer=null;
  try{
    const candidate=calculate(params());model=candidate;valid=model.canFabricate;
    $('#scheme-title').innerHTML=`${fmt(model.p.height)} × ${fmt(model.p.run)} <small>mm</small>`;
    $('#stat-treads').innerHTML=`${model.steps.length}<small>块</small>`;
    $('#stat-rise').innerHTML=`${fmt(model.rise)}<small>mm</small>`;
    $('#stat-length').innerHTML=`${fmt(model.length)}<small>mm</small>`;
    $('#stat-posts').innerHTML=`${model.posts.length}<small>根</small>`;
    $('#three-view').innerHTML=threeView(model);
    $('#fabrication-content').innerHTML=fabricationSheets(model);
    $('#fabrication-content>.sheet')?.remove();
    $('#print-document').innerHTML=fabricationSheets(model);
    viewer?.update(model);
    $('#live-state').textContent=valid?'方案已生成':'尺寸需要调整';
    $('#live-state').classList.toggle('error',!valid);
    $('#message-area').replaceChildren();
    for(const [items,type] of [[model.blocks,'block'],[model.warnings,'']])for(const message of items){const item=document.createElement('div');item.className=`message ${type}`;item.textContent=message;$('#message-area').append(item);}
    $('#production-note').innerHTML=`<b>从地面到平台，${model.count}个步距全部等高。</b> 第一块距地${fmt(model.rise)}，最后一块距平台${fmt(model.rise)}；踏板前后居中${model.beam.margin>=0?`各留${fmt(model.beam.margin)}毫米`:'待调整'}。`;
    exportState(valid);
    if(!valid){$('#print-document').replaceChildren();$('#save-status').textContent='请先调整提示中的尺寸，再导出施工图';}
    else {
      try{localStorage.setItem(storageKey,JSON.stringify(model.p));$('#save-status').textContent='本机已保存这组参数 · 修改后自动更新';}catch{$('#save-status').textContent='这组参数已生成 · 可保存整份方案';}
    }
    window.__ladder.model=model;
  }catch(error){
    valid=false;exportState(false);$('#print-document').replaceChildren();
    $('#live-state').textContent='输入待完成';$('#live-state').classList.add('error');
    $('#message-area').replaceChildren();const item=document.createElement('div');item.className='message block';item.textContent=error.message+' 图中暂保留上一次预览，导出已暂停。';$('#message-area').append(item);
    $('#save-status').textContent='补齐或调整参数后重新生成';
  }
}

function download(content,name,type){
  if(!valid){toast('请先调整尺寸，再导出。');return;}
  const url=URL.createObjectURL(new Blob([content],{type}));const a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);
  toast(`已保存：${name}`);
}
const fileBase=()=>`钢梯-${fmt(model.p.height)}高-${fmt(model.p.run)}水平`;

$('#parameters-form').addEventListener('submit',event=>{event.preventDefault();render();});
$('#parameters-form').addEventListener('input',()=>{clearTimeout(timer);timer=setTimeout(render,350);});
$('#reset-materials').addEventListener('click',()=>{for(const [key] of FIELDS)document.getElementById(key).value=DEFAULTS[key];render();toast('材料和加工参数已恢复默认值');});

document.querySelectorAll('[data-unit]').forEach(button=>button.addEventListener('click',()=>{
  const next=button.dataset.unit;if(next===unit)return;
  for(const id of ['height','run']){
    const input=document.getElementById(id);if(input.value.trim())input.value=String(Number(input.value)*(next==='m'?.001:1000));
    input.min=next==='m'?(id==='height'?.3:.2):(id==='height'?300:200);
    input.max=next==='m'?(id==='height'?12:15):(id==='height'?12000:15000);
    input.step=next==='m'?'0.001':'1';
  }
  unit=next;document.querySelectorAll('.main-unit').forEach(el=>el.textContent=unit);
  document.querySelectorAll('[data-unit]').forEach(el=>{el.classList.toggle('active',el===button);el.setAttribute('aria-pressed',String(el===button));});
  render();
}));

document.querySelectorAll('[data-tab]').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('[data-tab]').forEach(item=>{item.classList.toggle('active',item===button);item.setAttribute('aria-selected',String(item===button));});
  document.querySelectorAll('.view-panel').forEach(panel=>panel.hidden=panel.id!==`panel-${button.dataset.tab}`);
}));
document.querySelectorAll('[data-camera]').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('[data-camera]').forEach(item=>item.classList.toggle('active',item===button));viewer?.rotate(false);viewer?.setView(button.dataset.camera);
}));
$('#rotation').addEventListener('click',()=>viewer?.rotate($('#rotation').getAttribute('aria-pressed')!=='true'));
$('#labels').addEventListener('change',event=>viewer?.labels(event.target.checked));
$('#download-svg').addEventListener('click',()=>download(threeView(model),`${fileBase()}-三视图.svg`,'image/svg+xml;charset=utf-8'));
$('#download-csv').addEventListener('click',()=>download(csv(model),`${fileBase()}-下料定位表.csv`,'text/csv;charset=utf-8'));
$('#download-dxf').addEventListener('click',()=>download(dxf(model),`${fileBase()}-三视图.dxf`,'application/dxf;charset=utf-8'));
$('#print').addEventListener('click',()=>{if(valid)window.print();});

document.querySelectorAll('[data-image]').forEach(button=>button.addEventListener('click',async()=>{
  if(timer)render();if(!valid)return;
  const kind=button.dataset.image;
  const names={model:'3D标注视图',views:'三视图',cuts:'主梁扶手切口图',tread:'踏板折弯详图',materials:'下料清单',positions:'安装定位表'};
  $('#image-export').open=false;
  try{
    let image;
    if(kind==='model'){
      if($('#panel-3d').hidden){$('#tab-3d').click();await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));}
      image=await modelPNG(viewer,$('#model-host'),model);
    }else{
      const svg=kind==='views'?threeView(model):kind==='cuts'?cutView(model):kind==='tread'?treadView(model):tableImage(model,kind);
      image=await svgPNG(svg);
    }
    download(image,`${fileBase()}-${names[kind]}.png`,'image/png');
  }catch(error){toast(error.message||'图片导出失败，请重试。');}
}));
document.addEventListener('click',event=>{if(!$('#image-export').contains(event.target))$('#image-export').open=false;});

$('#save-html').addEventListener('click',()=>{
  const clone=document.documentElement.cloneNode(true);
  clone.querySelector('#bootstrap-params').textContent=JSON.stringify(model.p);
  clone.querySelector('#toast').classList.remove('show');
  clone.querySelectorAll('canvas').forEach(canvas=>canvas.remove());
  clone.querySelector('title').textContent=`钢梯方案 · 平台高${fmt(model.p.height)} · 水平${fmt(model.p.run)}`;
  download('<!doctype html>\n'+clone.outerHTML,`${fileBase()}-完整方案.html`,'text/html;charset=utf-8');
});
window.addEventListener('beforeprint',()=>{if(valid)$('#print-document').innerHTML=fabricationSheets(model);});
window.__ladder={model:null,calculate,params,render,threeView,fabricationSheets,
  snapshot:()=>viewer?.image(),inspect3d:()=>viewer?.inspect(),setView:view=>{viewer?.rotate(false);viewer?.setView(view);},
  exports:{csv:()=>csv(model),dxf:()=>dxf(model)},ready:false};
render();window.__ladder.ready=true;
