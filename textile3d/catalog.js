import {manuals,parts} from './data/catalog-data.js?v=20260714-public';

let purchaseHistory={};
try{purchaseHistory=(await import('./data/purchase-history.local.js?v=20260714-public')).purchaseHistory||{}}catch(error){}
const hasPurchaseHistory=Object.keys(purchaseHistory).length>0;

const manualSelect=document.querySelector('#manual-select');
const search=document.querySelector('#part-search');
const content=document.querySelector('#content');
const pagination=document.querySelector('#pagination');
const dialog=document.querySelector('#detail-dialog');
const cartDialog=document.querySelector('#cart-dialog');
const pageSize=6;
const urlParams=new URLSearchParams(location.search);
const CART_KEY='jiaxin-pdf-parts-cart-v2';
let currentManual=urlParams.get('manual')||manuals[0].id;
let currentView=urlParams.get('view')||'parts';
let currentPage=1;
let query=urlParams.get('q')||'';
let currentPart=null;
let currentCopyCode='';
let copyResetTimer=null;
let cart=loadCart();

if(!manuals.some(item=>item.id===currentManual))currentManual=manuals[0].id;
if(!['parts','pages'].includes(currentView))currentView='parts';
manuals.forEach(manual=>{
  const count=parts.filter(part=>part.manual===manual.id).length;
  manualSelect.insertAdjacentHTML('beforeend',`<option value="${escapeHtml(manual.id)}">${escapeHtml(manual.name)}（${count}条零件）</option>`);
});
manualSelect.value=currentManual;
search.value=query;
if(!hasPurchaseHistory)document.querySelector('.build-state').innerHTML='<span></span>公网安全版 · 内部价格未公开';

function escapeHtml(value){return String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]))}
function normalizeCode(value){return String(value||'').normalize('NFKC').toUpperCase().replace(/[—–－﹣−]/g,'-').replace(/[～〜]/g,'~').replace(/\s+/g,'')}
function pagePath(manual,page){return `assets/manuals/${manual}/pages/page-${String(page).padStart(2,'0')}.jpg`}
function hdPagePath(manual,page){return `assets/manuals/${manual}/pages-hd/page-${String(page).padStart(2,'0')}.jpg`}
function pdfPagePath(manual,page){return `assets/manuals/${manual}/original.pdf#page=${page}`}
function formatCode(part){return part.code?.trim()||'厂家未提供件号'}
function formatDims(part){if(!Array.isArray(part.dims)||!part.dims.length)return '图纸未标明确尺寸';return part.dims.join(' × ')+(part.dims.every(Number.isFinite)?' mm':'')}
function formatUsage(part){return part.quantity==null?'待确认':`${part.quantity} ${part.quantityUnit||'件'}/台`}
function isVerified(part){return part.dataStatus==='厂家资料已核'||part.sourceCrop||part.sourceVector||part.status?.startsWith('资料已核')}
function partImage(part){return part.sourceCrop||hdPagePath(part.manual,part.page)}
function fullPageImage(part){return hdPagePath(part.manual,part.page)}
function purchaseForPart(part){return purchaseHistory[normalizeCode(part.code)]||null}
function formatMoney(value){return Number.isFinite(value)?`¥${new Intl.NumberFormat('zh-CN',{minimumFractionDigits:2,maximumFractionDigits:2}).format(value)}`:'暂无历史价'}
function formatUnit(value){return /^(pcs?|件)$/i.test(String(value||''))?'个':String(value||'个')}
function priceRange(history){if(!history||!Number.isFinite(history.minTaxPrice))return '—';if(history.minTaxPrice===history.maxTaxPrice)return formatMoney(history.minTaxPrice);return `${formatMoney(history.minTaxPrice)} ～ ${formatMoney(history.maxTaxPrice)}`}
function loadCart(){try{return JSON.parse(localStorage.getItem(CART_KEY)||'{}')}catch(error){return {}}}
function saveCart(){localStorage.setItem(CART_KEY,JSON.stringify(cart));updateCartBadge()}
function cartKey(part){return `${part.manual}:${part.recordKey||part.code}:${part.page}`}
function rowForPart(part,quantity){
  const history=purchaseForPart(part);
  const latest=history?.latest;
  return {
    key:cartKey(part),manual:part.manual,manualName:manuals.find(item=>item.id===part.manual)?.name||part.manual,
    code:formatCode(part),name:part.name||'未命名零件',nameEn:part.nameEn||'',page:part.page,assembly:part.assembly||'',
    image:partImage(part),quantity,materialCode:latest?.materialCode||'',purchaseDescription:latest?.description||latest?.materialName||'',
    unit:formatUnit(latest?.unit),taxPrice:latest?.taxPrice??null,netPrice:latest?.netPrice??null,latestDate:latest?.date||'',
    supplier:latest?.supplier||'',minTaxPrice:history?.minTaxPrice??null,maxTaxPrice:history?.maxTaxPrice??null,
    purchaseRecordCount:history?.recordCount||0,purchaseDocumentCount:history?.documentCount||0,matchType:history?.matchType||(hasPurchaseHistory?'暂无历史采购价':'内部价格未公开')
  };
}
function cartRows(){return Object.values(cart)}
function updateCartBadge(){const count=cartRows().reduce((sum,row)=>sum+row.quantity,0);document.querySelector('#cart-count').textContent=count;document.querySelector('#cart-button').classList.toggle('has-items',count>0)}
function addToCart(part,quantity=1){
  const n=Math.max(1,Number.parseInt(quantity,10)||1);
  const key=cartKey(part);
  const total=(cart[key]?.quantity||0)+n;
  cart[key]=rowForPart(part,total);
  saveCart();
  return n;
}
function removeFromCart(key){delete cart[key];saveCart()}
function setCopyCode(code){currentCopyCode=code?.trim?.()||'';const button=document.querySelector('#copy-code');button.disabled=!currentCopyCode;button.textContent=currentCopyCode?'复制件号':'无件号'}
async function copyText(text,button,label='已复制',resetLabel='复制件号'){
  let copied=false;
  try{await navigator.clipboard.writeText(text);copied=true}catch(error){
    const textarea=document.createElement('textarea');textarea.value=text;textarea.style.cssText='position:fixed;left:-9999px;top:0;opacity:0';document.body.append(textarea);textarea.select();try{copied=document.execCommand('copy')}catch(error2){}textarea.remove();
  }
  if(button){button.textContent=copied?label:'复制失败';clearTimeout(copyResetTimer);copyResetTimer=setTimeout(()=>{button.textContent=resetLabel},1200)}
  return copied;
}

function filteredParts(){
  const pool=parts.filter(part=>part.manual===currentManual);
  const q=query.trim().toLowerCase();
  if(!q)return pool;
  const exact=pool.filter(part=>formatCode(part).toLowerCase()===q||purchaseForPart(part)?.latest?.materialCode===q);
  if(exact.length)return exact;
  return pool.filter(part=>{
    const purchase=purchaseForPart(part)?.latest;
    return `${part.name||''}${part.nameEn||''}${formatCode(part)}${part.assembly||''}${purchase?.materialCode||''}${purchase?.materialName||''}${purchase?.description||''}${purchase?.supplier||''}`.toLowerCase().includes(q);
  });
}
function updateHeading(count,unit){
  const manual=manuals.find(item=>item.id===currentManual);
  const manualParts=parts.filter(part=>part.manual===currentManual);
  const verified=manualParts.filter(isVerified).length;
  const purchased=manualParts.filter(purchaseForPart).length;
  const priceState=hasPurchaseHistory?`历史已购 ${purchased} 条`:'内部采购价格未公开';
  document.querySelector('#manual-kicker').textContent=`${manual.name} · 收录 ${manualParts.length} 条 · 高清原图 ${verified} 条 · ${priceState}`;
  document.querySelector('#result-title').textContent=currentView==='pages'?'厂家高清整页':(hasPurchaseHistory?'零件高清图与历史采购价':'零件高清图（公网安全版）');
  document.querySelector('#result-count').textContent=count;
  document.querySelector('#result-unit').textContent=unit;
}

function renderParts(){
  const found=filteredParts();
  const total=Math.max(1,Math.ceil(found.length/pageSize));
  currentPage=Math.min(currentPage,total);
  const shown=found.slice((currentPage-1)*pageSize,currentPage*pageSize);
  content.className='part-grid';content.innerHTML='';updateHeading(found.length,'条零件');
  if(!shown.length){content.innerHTML='<div class="empty"><strong>当前资料没有匹配零件</strong><span>可搜索厂家名称、件号或内部物料编码。</span></div>';pagination.innerHTML='';return}
  shown.forEach(part=>{
    const history=purchaseForPart(part);
    const latest=history?.latest;
    const key=cartKey(part);
    const queued=cart[key]?.quantity||0;
    const card=document.createElement('article');
    card.className='part-card pdf-part-card';
    const missingLabel=hasPurchaseHistory?'暂无历史价':'内部价格未公开';
    const missingCode=hasPurchaseHistory?'未找到':'未公开';
    const missingDescription=hasPurchaseHistory?'历史订单中未按件号找到，价格留空':'公网安全版不加载内部采购价格和供应商';
    card.innerHTML=`<div class="thumb-stage pdf-thumb"><img class="part-image" alt="${escapeHtml(part.name)}高清原格" loading="lazy"><span class="thumb-code">${escapeHtml(formatCode(part))}</span><span class="pdf-badge">高清原图</span><span class="purchase-badge ${history?'matched':'missing'}">${history?'历史已购':missingLabel}</span></div><div class="card-info"><div class="card-name-row"><h2>${escapeHtml(part.name||'未命名零件')}</h2><span class="page">原第${part.page}页</span></div><div class="purchase-summary ${history?'matched':'missing'}"><div><span>内部物料编码</span><strong>${escapeHtml(latest?.materialCode||missingCode)}</strong></div><div><span>最近含税单价</span><strong>${history?`${escapeHtml(formatMoney(latest?.taxPrice))}${latest?.unit?` / ${escapeHtml(formatUnit(latest.unit))}`:''}`:missingLabel}</strong></div><p>${escapeHtml(latest?.description||latest?.materialName||missingDescription)}</p></div><div class="card-meta"><div><span>所属总成/页眉</span><strong>${escapeHtml(part.assembly||'厂家未提供')}</strong></div><div><span>单台用量</span><strong>${escapeHtml(formatUsage(part))}</strong></div></div><div class="card-actions"><button class="copy-card-code" type="button" ${part.code?'':'disabled'}>复制件号</button><label>添加数量<input class="add-quantity" type="number" min="1" value="1"></label><button class="add-part ${queued?'added':''}" type="button">${queued?`已添加 ${queued} 个`:'添加'}</button></div></div>`;
    content.append(card);
    const image=card.querySelector('.part-image');image.src=partImage(part);image.onerror=()=>{if(!image.dataset.fallback){image.dataset.fallback='1';image.src=hdPagePath(part.manual,part.page)}};
    card.querySelector('.copy-card-code').addEventListener('click',event=>{event.stopPropagation();copyText(formatCode(part),event.currentTarget)});
    card.querySelector('.add-part').addEventListener('click',event=>{event.stopPropagation();const amount=addToCart(part,card.querySelector('.add-quantity').value);event.currentTarget.textContent=`已添加 ${cart[key].quantity} 个`;event.currentTarget.classList.add('added');showToast(`已添加 ${amount} 个：${formatCode(part)}`)});
    card.addEventListener('click',event=>{if(event.target.closest('button,input,label'))return;openDetail(part)});
  });
  renderPagination(total);
}

function renderPages(){
  const manual=manuals.find(item=>item.id===currentManual);
  const start=manual.contentStart||1;
  const pages=Array.from({length:Math.max(0,manual.pages-start+1)},(_,i)=>i+start);
  const total=Math.max(1,Math.ceil(pages.length/pageSize));currentPage=Math.min(currentPage,total);
  const shown=pages.slice((currentPage-1)*pageSize,currentPage*pageSize);
  content.className='page-grid';content.innerHTML='';updateHeading(pages.length,'页高清整页');
  shown.forEach(page=>{const link=document.createElement('a');link.className='page-card';link.href=pdfPagePath(currentManual,page);link.target='_blank';link.rel='noopener';link.innerHTML=`<img src="${hdPagePath(currentManual,page)}" loading="lazy" alt="${escapeHtml(manual.name)}第${page}页高清原图"><span>第 ${page} 页 · 高清原页 · 点击打开 PDF</span>`;content.append(link)});
  renderPagination(total);
}

function goToPage(value,total){const target=Math.max(1,Math.min(total,Number.parseInt(value,10)||currentPage));if(target===currentPage)return;currentPage=target;render();window.scrollTo({top:150,behavior:'smooth'})}
function renderPagination(total){
  pagination.innerHTML='';
  const prev=document.createElement('button');prev.textContent='上一页';prev.className='page-step';prev.disabled=currentPage===1;prev.onclick=()=>goToPage(currentPage-1,total);pagination.append(prev);
  const wanted=new Set([1,total,currentPage-2,currentPage-1,currentPage,currentPage+1,currentPage+2]);const nums=[...wanted].filter(i=>i>=1&&i<=total).sort((a,b)=>a-b);let previous=0;
  for(const i of nums){if(previous&&i-previous>1){const gap=document.createElement('span');gap.textContent='…';gap.className='page-gap';pagination.append(gap)}const button=document.createElement('button');button.textContent=i;button.classList.toggle('active',i===currentPage);button.onclick=()=>goToPage(i,total);pagination.append(button);previous=i}
  const next=document.createElement('button');next.textContent='下一页';next.className='page-step';next.disabled=currentPage===total;next.onclick=()=>goToPage(currentPage+1,total);pagination.append(next);
  const jump=document.createElement('form');jump.className='page-jump';jump.innerHTML=`<span>到</span><input type="number" min="1" max="${total}" value="${currentPage}" aria-label="输入页码"><span>页</span><button type="submit">跳转</button>`;jump.onsubmit=event=>{event.preventDefault();goToPage(jump.querySelector('input').value,total)};pagination.append(jump);
}

function fillPurchaseDetail(part){
  const history=purchaseForPart(part);
  const latest=history?.latest;
  const panel=document.querySelector('#purchase-panel');
  panel.classList.toggle('missing',!history);
  document.querySelector('#purchase-match').textContent=history?'件号精确匹配':(hasPurchaseHistory?'暂无历史采购价':'公网安全版未加载');
  document.querySelector('#purchase-material-code').textContent=latest?.materialCode||'—';
  document.querySelector('#purchase-price').textContent=history?`${formatMoney(latest?.taxPrice)} / ${formatUnit(latest?.unit)}`:'—';
  document.querySelector('#purchase-description').textContent=latest?.description||latest?.materialName||(hasPurchaseHistory?'历史订单中未按厂家件号找到对应记录':'内部采购价格和供应商未在公网发布');
  document.querySelector('#purchase-date').textContent=latest?.date||'—';
  document.querySelector('#purchase-supplier').textContent=latest?.supplier||'—';
  document.querySelector('#purchase-range').textContent=priceRange(history);
  document.querySelector('#purchase-count').textContent=history?`${history.recordCount} 条明细 / ${history.documentCount} 张订单`:'0 条';
}
function openDetail(part){
  currentPart=part;
  const manualName=manuals.find(item=>item.id===part.manual)?.name||part.manual;
  document.querySelector('.detail-info').scrollTop=0;
  document.querySelector('#stage-code').textContent=formatCode(part);
  document.querySelector('#detail-assembly').textContent=`${part.assembly||'厂家未提供页眉'} · ${manualName}`;
  document.querySelector('#detail-name').textContent=part.name||'未命名零件';
  document.querySelector('#detail-name-en').textContent=part.nameEn||'厂家原格未提供英文描述';
  document.querySelector('#detail-code').textContent=formatCode(part);setCopyCode(part.code);
  document.querySelector('#detail-page').textContent=`第 ${part.page} 页`;
  document.querySelector('#detail-status').textContent=isVerified(part)?'厂家高清原图已收录':'高清原图待补充';
  document.querySelector('#detail-dims').textContent=formatDims(part);
  document.querySelector('#detail-sheet').textContent=part.assembly||'厂家未提供';
  document.querySelector('#detail-quantity').textContent=formatUsage(part);
  document.querySelector('#accuracy').textContent='厂家图册负责确认件号和外形；历史采购价来自订单明细，仅供本次申报参考，最终价格以采购询价为准。';
  fillPurchaseDetail(part);
  const detailImage=document.querySelector('#detail-image');detailImage.src=partImage(part);detailImage.onerror=()=>{detailImage.src=hdPagePath(part.manual,part.page)};
  document.querySelector('#origin-image').src=fullPageImage(part);
  document.querySelector('#origin-caption').textContent=`厂家原手册第${part.page}页 · 高清整页原图（非AI重画）`;
  document.querySelector('#origin-preview').classList.add('show');document.querySelector('#show-origin').textContent='隐藏整页原图';
  document.querySelector('#open-page').href=pdfPagePath(part.manual,part.page);
  document.querySelector('#open-vector').hidden=!part.sourceVector;document.querySelector('#open-vector').href=part.sourceVector||'#';
  document.querySelector('#detail-add-quantity').value=1;
  if(!dialog.open)dialog.showModal();
}

function openCart(){renderCart();if(!cartDialog.open)cartDialog.showModal()}
function renderCart(){
  const body=document.querySelector('#cart-body');const rows=cartRows();
  document.querySelector('#cart-empty').hidden=rows.length>0;document.querySelector('#cart-table-wrap').hidden=!rows.length;
  const known=rows.filter(row=>Number.isFinite(row.taxPrice));const totalQty=rows.reduce((sum,row)=>sum+row.quantity,0);const totalMoney=known.reduce((sum,row)=>sum+row.quantity*row.taxPrice,0);
  document.querySelector('#cart-summary').innerHTML=`<span>共 <b>${rows.length}</b> 种 / <b>${totalQty}</b> 个</span><span>有历史价 <b>${known.length}</b> 种</span><span>待询价 <b>${rows.length-known.length}</b> 种</span><span>已知价格估算 <b>${escapeHtml(formatMoney(totalMoney))}</b></span>`;
  body.innerHTML=rows.map(row=>{const estimated=Number.isFinite(row.taxPrice)?row.quantity*row.taxPrice:null;return `<tr><td>${escapeHtml(row.manualName)}</td><td class="code-cell">${escapeHtml(row.code)}</td><td>${escapeHtml(row.name)}</td><td>${escapeHtml(row.materialCode||'—')}</td><td class="description-cell">${escapeHtml(row.purchaseDescription||'暂无历史采购记录')}</td><td class="money-cell ${Number.isFinite(row.taxPrice)?'':'unknown'}">${escapeHtml(formatMoney(row.taxPrice))}</td><td><input class="cart-quantity" data-key="${escapeHtml(row.key)}" type="number" min="1" value="${row.quantity}"></td><td>${escapeHtml(formatUnit(row.unit))}</td><td class="money-cell">${escapeHtml(formatMoney(estimated))}</td><td>第${row.page}页</td><td><button class="remove-cart" data-key="${escapeHtml(row.key)}" type="button">移除</button></td></tr>`}).join('');
  body.querySelectorAll('.cart-quantity').forEach(input=>input.onchange=()=>{const row=cart[input.dataset.key];if(row){row.quantity=Math.max(1,Number.parseInt(input.value,10)||1);saveCart();renderCart()}});
  body.querySelectorAll('.remove-cart').forEach(button=>button.onclick=()=>{removeFromCart(button.dataset.key);renderCart();render()});
}
function tableText(){return ['手册\t厂家件号\t厂家名称\t物料编码\t历史采购描述\t申报数量\t单位\t最近含税单价\t估算含税金额\t最近采购日期\t供应商\t原页'].concat(cartRows().map(row=>[row.manualName,row.code,row.name,row.materialCode,row.purchaseDescription,row.quantity,formatUnit(row.unit),row.taxPrice??'',Number.isFinite(row.taxPrice)?row.quantity*row.taxPrice:'',row.latestDate,row.supplier,`第${row.page}页`].join('\t'))).join('\n')}
function downloadCsv(){
  const rows=[['手册','厂家件号','厂家名称','物料编码','历史采购描述','申报数量','单位','最近含税单价','估算含税金额','最近采购日期','供应商','原页','历史价格范围','价格依据'],...cartRows().map(row=>[row.manualName,row.code,row.name,row.materialCode,row.purchaseDescription,row.quantity,formatUnit(row.unit),row.taxPrice??'',Number.isFinite(row.taxPrice)?row.quantity*row.taxPrice:'',row.latestDate,row.supplier,`第${row.page}页`,Number.isFinite(row.minTaxPrice)?`${row.minTaxPrice}-${row.maxTaxPrice}`:'',row.matchType])];
  const csv='\ufeff'+rows.map(row=>row.map(value=>`"${String(value??'').replaceAll('"','""')}"`).join(',')).join('\n');
  downloadBlob(new Blob([csv],{type:'text/csv;charset=utf-8'}),`嘉新纺织零件申报清单-${localDate()}.csv`);
}
function localDate(){const date=new Date();return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`}
function downloadBlob(blob,filename){const link=document.createElement('a');const url=URL.createObjectURL(blob);link.href=url;link.download=filename;document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000)}
async function exportExcel(button){
  const rows=cartRows();
  if(!rows.length)return;
  if(!globalThis.ExcelJS){showToast('Excel组件未加载，请联网刷新后重试');return}
  const oldLabel=button.textContent;button.disabled=true;button.textContent='正在生成Excel…';
  try{
    const workbook=new ExcelJS.Workbook();workbook.creator='嘉新纺织机械高清零件图册';workbook.created=new Date();
    const sheet=workbook.addWorksheet('采购申报单',{views:[{state:'frozen',xSplit:2,ySplit:5,showGridLines:false}],pageSetup:{orientation:'landscape',fitToPage:true,fitToWidth:1,fitToHeight:0,paperSize:9,margins:{left:.25,right:.25,top:.5,bottom:.5,header:.2,footer:.2}}});
    const known=rows.filter(row=>Number.isFinite(row.taxPrice));const totalQty=rows.reduce((sum,row)=>sum+row.quantity,0);const knownTotal=known.reduce((sum,row)=>sum+row.quantity*row.taxPrice,0);
    sheet.mergeCells('A1:O1');sheet.getCell('A1').value='嘉新纺织机械零件采购申报单';sheet.getCell('A1').font={name:'Microsoft YaHei',size:20,bold:true,color:{argb:'FFFFFFFF'}};sheet.getCell('A1').fill={type:'pattern',pattern:'solid',fgColor:{argb:'FF12363B'}};sheet.getCell('A1').alignment={horizontal:'center',vertical:'middle'};sheet.getRow(1).height=34;
    sheet.mergeCells('A2:O2');sheet.getCell('A2').value=`生成日期：${localDate()}　数据来源：厂家高清图册 + 历史采购订单（件号精确匹配）`;sheet.getCell('A2').font={name:'Microsoft YaHei',size:10,color:{argb:'FF53645F'}};sheet.getCell('A2').alignment={horizontal:'center'};sheet.getRow(2).height=22;
    sheet.mergeCells('A3:O3');sheet.getCell('A3').value=`共 ${rows.length} 种 / ${totalQty} 个　有历史价 ${known.length} 种　待询价 ${rows.length-known.length} 种　已知价格估算 ${formatMoney(knownTotal)}`;sheet.getCell('A3').font={name:'Microsoft YaHei',size:11,bold:true,color:{argb:'FF2F6B3D'}};sheet.getCell('A3').fill={type:'pattern',pattern:'solid',fgColor:{argb:'FFEAF3E5'}};sheet.getCell('A3').alignment={horizontal:'center'};sheet.getRow(3).height=24;
    const headers=['序号','资料手册','厂家件号','厂家名称','物料编码','历史采购描述','申报数量','单位','最近含税单价','估算含税金额','最近采购日期','最近供应商','原手册页','历史价格范围','价格依据'];
    sheet.getRow(5).values=headers;sheet.getRow(5).height=30;
    sheet.getRow(5).eachCell(cell=>{cell.font={name:'Microsoft YaHei',size:10,bold:true,color:{argb:'FFFFFFFF'}};cell.fill={type:'pattern',pattern:'solid',fgColor:{argb:'FF2F6B3D'}};cell.alignment={horizontal:'center',vertical:'middle',wrapText:true};cell.border={bottom:{style:'medium',color:{argb:'FF9CBD8D'}}}});
    sheet.columns=[{width:7},{width:24},{width:20},{width:22},{width:18},{width:34},{width:11},{width:9},{width:15},{width:16},{width:14},{width:28},{width:12},{width:22},{width:16}];
    for(let index=0;index<rows.length;index++){
      const item=rows[index];const excelRow=index+6;const estimated=Number.isFinite(item.taxPrice)?item.quantity*item.taxPrice:null;
      const row=sheet.getRow(excelRow);row.values=[index+1,item.manualName,item.code,item.name,item.materialCode||'—',item.purchaseDescription||'暂无历史采购记录',item.quantity,formatUnit(item.unit),item.taxPrice??null,estimated,item.latestDate||'—',item.supplier||'—',`第${item.page}页`,Number.isFinite(item.minTaxPrice)?priceRange({minTaxPrice:item.minTaxPrice,maxTaxPrice:item.maxTaxPrice}):'—',item.matchType];row.height=46;
      row.eachCell({includeEmpty:true},cell=>{cell.font={name:'Microsoft YaHei',size:9,color:{argb:'FF20302D'}};cell.alignment={vertical:'middle',wrapText:true};cell.border={bottom:{style:'thin',color:{argb:'FFD8DFD9'}}};if(index%2)cell.fill={type:'pattern',pattern:'solid',fgColor:{argb:'FFF5F8F3'}}});
      for(const col of [1,7,8,9,10,11,13,15])row.getCell(col).alignment={horizontal:'center',vertical:'middle',wrapText:true};
      row.getCell(3).numFmt='@';row.getCell(5).numFmt='@';row.getCell(9).numFmt='¥#,##0.00';row.getCell(10).numFmt='¥#,##0.00';
      row.getCell(13).value={text:`第${item.page}页`,hyperlink:new URL(pdfPagePath(item.manual,item.page),location.href).href};row.getCell(13).font={name:'Microsoft YaHei',size:9,color:{argb:'FF2F6B3D'},underline:true};
      if(!Number.isFinite(item.taxPrice)){for(const col of [5,6,9,10,11,12,14,15])row.getCell(col).fill={type:'pattern',pattern:'solid',fgColor:{argb:'FFFFF2CC'}}}
    }
    const totalRow=rows.length+7;sheet.mergeCells(`A${totalRow}:F${totalRow}`);sheet.getCell(`A${totalRow}`).value='合计（无历史价格的项目不计入估算金额）';sheet.getCell(`G${totalRow}`).value={formula:`SUM(G6:G${rows.length+5})`,result:totalQty};sheet.mergeCells(`H${totalRow}:I${totalRow}`);sheet.getCell(`H${totalRow}`).value='已知价格估算合计';sheet.getCell(`J${totalRow}`).value={formula:`SUM(J6:J${rows.length+5})`,result:knownTotal};sheet.getCell(`J${totalRow}`).numFmt='¥#,##0.00';sheet.mergeCells(`K${totalRow}:O${totalRow}`);sheet.getCell(`K${totalRow}`).value=`待询价 ${rows.length-known.length} 种`;
    sheet.getRow(totalRow).height=28;sheet.getRow(totalRow).eachCell({includeEmpty:true},cell=>{cell.font={name:'Microsoft YaHei',size:10,bold:true,color:{argb:'FFFFFFFF'}};cell.fill={type:'pattern',pattern:'solid',fgColor:{argb:'FF12363B'}};cell.alignment={horizontal:'center',vertical:'middle'}});
    sheet.autoFilter={from:'A5',to:'O5'};sheet.properties.defaultRowHeight=20;sheet.pageSetup.printArea=`A1:O${totalRow}`;
    const buffer=await workbook.xlsx.writeBuffer();downloadBlob(new Blob([buffer],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}),`嘉新纺织零件采购申报单-${localDate()}.xlsx`);showToast('美化Excel已生成');
  }catch(error){console.error(error);showToast('Excel生成失败，请先下载CSV备份')}
  finally{button.disabled=false;button.textContent=oldLabel}
}
function showToast(message){let toast=document.querySelector('.toast');if(!toast){toast=document.createElement('div');toast.className='toast';document.body.append(toast)}toast.textContent=message;toast.classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>toast.classList.remove('show'),2200)}
function render(){if(currentView==='pages')renderPages();else renderParts();updateCartBadge()}

manualSelect.onchange=()=>{currentManual=manualSelect.value;currentPage=1;search.value='';query='';render()};
let searchTimer;search.oninput=()=>{clearTimeout(searchTimer);searchTimer=setTimeout(()=>{query=search.value.trim();currentPage=1;render()},160)};
document.querySelectorAll('.view-switch button').forEach(button=>button.onclick=()=>{document.querySelectorAll('.view-switch button').forEach(item=>item.classList.remove('active'));button.classList.add('active');currentView=button.dataset.view;currentPage=1;render()});
document.querySelector('.close-detail').onclick=()=>dialog.close();
document.querySelector('#copy-code').onclick=()=>copyText(currentCopyCode,document.querySelector('#copy-code'));
document.querySelector('#detail-add').onclick=()=>{if(currentPart){addToCart(currentPart,document.querySelector('#detail-add-quantity').value);showToast(`已添加：${formatCode(currentPart)}`);render()}};
document.querySelector('#show-origin').onclick=event=>{const shown=document.querySelector('#origin-preview').classList.toggle('show');event.currentTarget.textContent=shown?'隐藏整页原图':'查看整页原图'};
document.querySelector('#cart-button').onclick=openCart;document.querySelector('#close-cart').onclick=()=>cartDialog.close();
document.querySelector('#copy-table').onclick=event=>copyText(tableText(),event.currentTarget,'已复制表格','复制表格');
document.querySelector('#download-table').onclick=downloadCsv;document.querySelector('#export-excel').onclick=event=>exportExcel(event.currentTarget);
document.querySelector('#clear-cart').onclick=()=>{cart={};saveCart();renderCart();render()};
document.querySelectorAll('.view-switch button').forEach(button=>button.classList.toggle('active',button.dataset.view===currentView));
render();
