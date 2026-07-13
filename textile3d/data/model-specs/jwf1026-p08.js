// JWF1026-160(10)厂家PDF第8页：按本页原格独立生成3D规格。
import {jwf1026P03P10Verified} from '../jwf1026-p03-p10-verified.js';

const rows=jwf1026P03P10Verified.filter(part=>part.page===8);
const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));
const rect=(w,h)=>[[-w/2,-h/2],[w/2,-h/2],[w/2,h/2],[-w/2,h/2]];
const nums=part=>part.dims.flatMap(value=>String(value).match(/\d+(?:\.\d+)?/g)||[]).map(Number);
const source=part=>({page:part.page,item:part.item,code:part.code,recordKey:part.recordKey,nameZh:part.name,nameEn:part.nameEn,quantity:{value:part.quantity,unit:part.quantityUnit,meaning:part.quantityMeaning},dimensions:part.dims,sourceCrop:part.sourceCrop,sourceVector:part.sourceVector,views:[`第${part.page}页厂家原格`],assumptions:part.dims.length?['外形和特征按厂家原格可见尺寸建立；未标板厚、孔位及内部结构不得用于加工或申报。']:['厂家未标该单件工程尺寸；模型只表达原格可见轮廓与零件语义，不得用于加工或申报。']});
function makeSpec(part){
  const n=nums(part),kind=part.modelType,name=part.name;
  const a=clamp(n[0]||420,80,700),b=clamp(n[1]||Math.max(120,a*.55),45,560),c=clamp(n[2]||Math.max(18,Math.min(a,b)*.12),8,260);
  const flexible=/密封条|密封圈|密封皮板/.test(name),material=flexible?'rubber':kind==='window'?'darkMetal':'paintedMetal';
  let primitives=[];
  if(name==='气动装置结合件')primitives=[{type:'box',size:[260,180,24],position:[0,-105,0]},{type:'cylinder',radius:58,length:230,axis:'y',position:[0,0,55],material:'darkMetal'},{type:'cylinder',radius:34,length:130,axis:'y',position:[-120,8,55],material:'metal'},{type:'tube',points:[[100,0,70],[150,0,130],[190,0,130]],radius:10,material:'rubber'},{type:'box',size:[36,220,170],position:[-145,0,0],material:'metal'}];
  else if(name==='方接圆结合件')primitives=[{type:'box',size:[a,b,c]},{type:'cylinder',radius:clamp((n[2]||280)/2,55,190),length:clamp(n[3]||240,80,360),axis:'z',position:[0,0,c/2+110],material:'darkMetal'},{type:'box',size:[a+45,b+45,18],position:[0,0,-c/2-9],material:'metal'},{type:'torus',radius:clamp((n[2]||280)/2,55,190),tube:12,position:[0,0,c/2+220],material:'metal'}];
  else if(/弯管/.test(name)&&!/^方/.test(name))primitives=[{type:'tube',points:[[-a*.45,0,0],[-a*.2,0,0],[a*.12,0,b*.12],[a*.35,0,b*.42],[a*.42,0,b*.8]],radius:clamp((n.at(-1)||120)/2,24,90),radialSegments:24},{type:'torus',radius:clamp((n.at(-1)||120)/2,24,90),tube:10,position:[-a*.45,0,0],rotation:[0,1.57,0],material:'darkMetal'},{type:'torus',radius:clamp((n.at(-1)||120)/2,24,90),tube:10,position:[a*.42,0,b*.8],material:'darkMetal'}];
  else if(/接管|直管|管接头/.test(name))primitives=[{type:'cylinder',radius:clamp((n[0]||120)/2,25,180),length:b,axis:'y'},{type:'torus',radius:clamp((n[0]||120)/2,25,180),tube:10,position:[0,-b/2,0],rotation:[1.57,0,0],material:'darkMetal'},{type:'torus',radius:clamp((n[0]||120)/2,25,180),tube:10,position:[0,b/2,0],rotation:[1.57,0,0],material:'darkMetal'}];
  else if(/进棉口|方接方|方弯管|滤尘口/.test(name))primitives=[{type:'box',size:[a,b,c]},{type:'box',size:[a+48,22,c+48],position:[0,-b/2,0],material:'darkMetal'},{type:'box',size:[a+48,22,c+48],position:[0,b/2,0],material:'darkMetal'},{type:'box',size:[a*.55,b*.45,c*.55],position:[a*.18,b*.12,c*.4],rotation:[0,.18,.12],material:'metal'}];
  else if(flexible&&/圈/.test(name)){const r=clamp((n[0]||150)/2,35,220),tube=clamp((n[2]||16)/2,5,28);primitives=[{type:'torus',radius:r,tube,material:'rubber'}];}
  else if(name==='密封条')primitives=[{type:'tube',points:[[-a*.45,-b*.28,0],[a*.45,-b*.28,0],[a*.45,b*.28,0],[-a*.45,b*.28,0],[-a*.45,-b*.28,0]],radius:clamp(n[1]||8,3,16),material:'rubber'}];
  else if(name==='密封皮板')primitives=[{type:'extrude',points:rect(a,b),depth:clamp(n[2]||8,4,18),bevel:2,material:'rubber'},{type:'box',size:[a*.18,b*.9,clamp(n[2]||8,4,18)+3],position:[a*.22,0,0],material:'rubber'}];
  else if(name==='箍圈'){const r=clamp((n[0]||160)/2,35,220);primitives=[{type:'torus',radius:r,tube:7,material:'darkMetal'},{type:'box',size:[30,16,14],position:[r,0,0],material:'metal'}];}
  else if(kind==='lock')primitives=[{type:'cylinder',radius:clamp((n[0]||28)/2,10,30),length:58,axis:'z',material:'darkMetal'},{type:'box',size:[clamp((n[1]||20)*4,70,150),18,16],position:[35,0,38],rotation:[0,0,.3],material:'metal'},{type:'box',size:[86,54,16],position:[0,0,-32],material:'darkMetal'}];
  else if(kind==='handle')primitives=[{type:'tube',points:[[-a*.45,0,0],[-a*.45,0,b*.55],[-a*.25,0,b],[a*.25,0,b],[a*.45,0,b*.55],[a*.45,0,0]],radius:12,material:'darkMetal'},{type:'cylinder',radius:24,length:14,axis:'z',position:[-a*.45,0,0]},{type:'cylinder',radius:24,length:14,axis:'z',position:[a*.45,0,0]}];
  else if(kind==='hinge')primitives=[{type:'box',size:[a*1.8,b*.46,8],position:[-a*.46,0,0]},{type:'box',size:[a*1.8,b*.46,8],position:[a*.46,0,0]},{type:'cylinder',radius:12,length:b+32,axis:'y',material:'darkMetal'},{type:'cylinder',radius:17,length:b*.34,axis:'y',position:[0,-b*.28,0],material:'metal'},{type:'cylinder',radius:17,length:b*.34,axis:'y',position:[0,b*.28,0],material:'metal'}];
  else if(kind==='window')primitives=[{type:'extrude',points:rect(a,b),depth:c,holes:[{kind:'polygon',points:rect(a*.68,b*.54)}],bevel:2,material:'darkMetal'},{type:'box',size:[a*.67,b*.53,8],material:'glass'},{type:'box',size:[a+36,24,c+22],position:[0,-b/2,0],material:'metal'}];
  else if(kind==='door')primitives=[{type:'box',size:[a,b,c]},{type:'box',size:[a,28,c+40],position:[0,-b/2+14,-14],material:'darkMetal'},{type:'box',size:[a,28,c+40],position:[0,b/2-14,-14],material:'darkMetal'},{type:'cylinder',radius:12,length:b*.72,axis:'y',position:[-a/2,0,0],material:'darkMetal'},{type:'tube',points:[[a*.2,-42,c/2],[a*.3,-42,c/2+48],[a*.3,42,c/2+48],[a*.2,42,c/2]],radius:9,material:'darkMetal'}];
  else if(kind==='beam')primitives=[{type:'box',size:[a,b,c]},{type:'box',size:[a,22,c+38],position:[0,-b/2,0],material:'darkMetal'},{type:'box',size:[a,22,c+38],position:[0,b/2,0],material:'darkMetal'},{type:'box',size:[22,b+30,c+24],position:[-a/2,0,0],material:'metal'},{type:'box',size:[22,b+30,c+24],position:[a/2,0,0],material:'metal'}];
  else if(kind==='bracket')primitives=[{type:'extrude',points:rect(a,b),depth:c,bevel:2},{type:'box',size:[a,26,c+58],position:[0,-b/2,-18],material:'darkMetal'},{type:'box',size:[36,b,c+38],position:[-a/2+18,0,-12],material:'metal'}];
  else if(kind==='plate'&&/垫板/.test(name)){const r=clamp((n[0]||182)/2,35,220);primitives=[{type:'extrude',points:Array.from({length:48},(_,i)=>{const t=Math.PI*2*i/48;return[Math.cos(t)*r,Math.sin(t)*r]}),depth:clamp(n[1]||6,4,20),holes:[{kind:'circle',center:[0,0],radius:10}],bevel:1}];}
  else primitives=[{type:'extrude',points:rect(a,b),depth:c,bevel:2},{type:'box',size:[a,22,c+34],position:[0,-b/2,-12],material:'darkMetal'},{type:'box',size:[a,22,c+34],position:[0,b/2,-12],material:'darkMetal'}];
  return {level:part.dims.length?'尺寸级':'轮廓级',material,source:source(part),primitives};
}

export const jwf1026P08ModelSpecs=Object.fromEntries(rows.map(part=>[part.recordKey,makeSpec(part)]));
export default jwf1026P08ModelSpecs;
