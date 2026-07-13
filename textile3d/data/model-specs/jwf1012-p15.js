// JWF1012厂家PDF第15页：按本页原格独立生成3D规格。
import {jwf1012P04P15Verified} from '../jwf1012-p04-p15-verified.js';

const rows=jwf1012P04P15Verified.filter(part=>part.page===15);
const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));
const rect=(w,h)=>[[-w/2,-h/2],[w/2,-h/2],[w/2,h/2],[-w/2,h/2]];
const nums=part=>part.dims.flatMap(value=>String(value).match(/\d+(?:\.\d+)?/g)||[]).map(Number);
const circle=(r,count=40)=>Array.from({length:count},(_,i)=>{const t=Math.PI*2*i/count;return[Math.cos(t)*r,Math.sin(t)*r]});
const source=part=>({page:part.page,item:part.item,code:part.code,recordKey:part.recordKey,nameZh:part.name,nameEn:part.nameEn,quantity:{value:part.quantity,unit:part.quantityUnit,meaning:part.quantityMeaning},dimensions:part.dims,sourceCrop:part.sourceCrop,sourceVector:part.sourceVector,views:[`第${part.page}页厂家原格`],assumptions:['外形与特征按厂家原格可见尺寸建立；未标孔位、板厚、公差及内部结构不得用于加工或申报。']});
function makeSpec(part){
  const n=nums(part),kind=part.modelType,name=part.name;const a=clamp(n[0]||240,45,700),b=clamp(n[1]||Math.max(70,a*.45),20,520),c=clamp(n[2]||Math.max(10,Math.min(a,b)*.14),4,260);let material=/密封条/.test(name)?'rubber':kind==='window'?'glass':'paintedMetal';let primitives=[];
  if(/钥匙/.test(name))primitives=[{type:'tube',points:[[-a*.48,0,0],[-a*.15,0,0],[0,0,b*.26],[a*.18,0,b*.45]],radius:clamp(c/5,4,12),material:'darkMetal'},{type:'torus',radius:b*.28,tube:clamp(c/5,4,12),position:[a*.22,0,b*.45],rotation:[1.57,0,0],material:'darkMetal'}];
  else if(/钢丝绳/.test(name)){material='darkMetal';primitives=[{type:'tube',points:[[-a*.48,0,0],[-a*.2,0,10],[0,0,0],[a*.2,0,-10],[a*.48,0,0]],radius:6,material:'darkMetal'},{type:'torus',radius:22,tube:6,position:[-a*.48,0,0],rotation:[1.57,0,0]},{type:'torus',radius:22,tube:6,position:[a*.48,0,0],rotation:[1.57,0,0]}];}
  else if(/密封条/.test(name))primitives=[{type:'tube',points:[[-a*.45,-b*.25,0],[a*.45,-b*.25,0],[a*.45,b*.25,0],[-a*.45,b*.25,0],[-a*.45,-b*.25,0]],radius:clamp(n.at(-1)||6,3,16),material:'rubber'}];
  else if(kind==='roller')primitives=[{type:'cylinder',radius:clamp((n[1]||140)/2,28,180),length:a,axis:'x'},{type:'cylinder',radius:18,length:a+90,axis:'x',material:'darkMetal'},{type:'torus',radius:clamp((n[1]||140)/2,28,180),tube:12,position:[-a/2,0,0],rotation:[0,1.57,0],material:'metal'},{type:'torus',radius:clamp((n[1]||140)/2,28,180),tube:12,position:[a/2,0,0],rotation:[0,1.57,0],material:'metal'}];
  else if(kind==='shaft')primitives=[{type:'cylinder',radius:clamp((n[1]||24)/2,6,70),length:a,axis:'x',material:'metal'},{type:'cylinder',radius:clamp((n[1]||24)*.72,9,86),length:a*.15,axis:'x',material:'darkMetal'},{type:'torus',radius:clamp((n[1]||24)/2,6,70),tube:3,position:[a*.32,0,0],rotation:[0,1.57,0],material:'darkMetal'}];
  else if(kind==='pulley')primitives=[{type:'cylinder',radius:a/2,length:b,axis:'z',material:'darkMetal'},{type:'torus',radius:a*.42,tube:clamp(b*.12,5,18),position:[0,0,-b*.32],material:'metal'},{type:'torus',radius:a*.42,tube:clamp(b*.12,5,18),position:[0,0,b*.32],material:'metal'},{type:'cylinder',radius:clamp(a*.13,8,40),length:b+12,axis:'z',material:'metal'}];
  else if(kind==='lock')primitives=[{type:'cylinder',radius:clamp(a/2,12,38),length:58,axis:'z',material:'darkMetal'},{type:'box',size:[b*2.5,18,16],position:[b*.7,0,38],rotation:[0,0,.25],material:'metal'},{type:'box',size:[70,52,18],position:[0,0,-32],material:'darkMetal'}];
  else if(kind==='hinge')primitives=[{type:'box',size:[a,b*.45,8],position:[-a*.22,0,0]},{type:'box',size:[a,b*.45,8],position:[a*.22,0,0]},{type:'cylinder',radius:10,length:b+18,axis:'y',material:'darkMetal'},{type:'cylinder',radius:15,length:b*.38,axis:'y',position:[0,-b*.26,0],material:'metal'},{type:'cylinder',radius:15,length:b*.38,axis:'y',position:[0,b*.26,0],material:'metal'}];
  else if(kind==='cylinder')primitives=[{type:'extrude',points:circle(a/2),depth:clamp(b,8,100),holes:[{kind:'circle',center:[0,0],radius:clamp((n[2]||a*.3)/2,5,a*.38)}],bevel:1},{type:'torus',radius:a*.42,tube:5,material:'darkMetal'}];
  else if(kind==='beam'||kind==='pressPlate')primitives=[{type:'box',size:[a,b,c]},{type:'box',size:[a,18,c+34],position:[0,-b/2,0],material:'darkMetal'},{type:'box',size:[a,18,c+34],position:[0,b/2,0],material:'darkMetal'},{type:'box',size:[22,b+20,c+18],position:[-a/2,0,0],material:'metal'},{type:'box',size:[22,b+20,c+18],position:[a/2,0,0],material:'metal'}];
  else if(kind==='bracket')primitives=[{type:'extrude',points:rect(a,b),depth:c,bevel:2},{type:'box',size:[a,24,c+50],position:[0,-b/2,-18],material:'darkMetal'},{type:'box',size:[36,b,c+38],position:[-a/2+18,0,-12],material:'metal'}];
  else if(kind==='panel'||kind==='plate'||kind==='topCover')primitives=[{type:'extrude',points:rect(a,b),depth:c,bevel:2},{type:'box',size:[a,20,c+34],position:[0,-b/2,-12],material:'darkMetal'},{type:'box',size:[a,20,c+34],position:[0,b/2,-12],material:'darkMetal'}];
  else primitives=[{type:'box',size:[a,b,c]},{type:'box',size:[a*.72,b*.72,c+18],position:[0,0,c*.32],material:'darkMetal'},{type:'cylinder',radius:clamp(Math.min(a,b)*.13,8,50),length:c+30,axis:'z',material:'metal'}];
  return {level:'尺寸级',material,source:source(part),primitives};
}
export const jwf1012P15ModelSpecs=Object.fromEntries(rows.map(part=>[part.recordKey,makeSpec(part)]));
export default jwf1012P15ModelSpecs;
