// JWF1206 第62—73页：复用通用厂家图工厂，并补充风机、门、软管等本段专属结构。
import {createJwf1206P38P49Spec as createBaseSpec} from './jwf1206-p38-p49-factory.js';

const PI=Math.PI;
const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));
const nums=part=>part.dims.flatMap(value=>(String(value).match(/\d+(?:\.\d+)?/g)||[]).map(Number));
const rect=(width,height)=>[[-width/2,-height/2],[width/2,-height/2],[width/2,height/2],[-width/2,height/2]];
const box=(size,material='paintedMetal',position=[0,0,0],rotation=[0,0,0])=>({type:'box',size,material,position,rotation});
const cylinder=(radius,length,material='metal',position=[0,0,0],axis='x')=>({type:'cylinder',radius,length,axis,material,position});

function source(part,assumptions){
  return {page:part.page,item:part.item,code:part.code,recordKey:part.recordKey,nameZh:part.name,nameEn:part.nameEn,
    quantity:{value:part.quantity,unit:part.quantityUnit,meaning:part.quantityMeaning},dimensions:part.dims,
    sourceCrop:part.sourceCrop,sourceVector:part.sourceVector,views:[`第${part.page}页厂家原格`],assumptions};
}

function special(part,material,primitives,note){
  const assumptions=[note,part.dims.length?'厂家明确尺寸直接用于主轮廓；未标孔距、壁厚、公差及内部连接仅按原格比例表达。':'厂家原格未标几何尺寸，模型只表达可见轮廓。'];
  return {level:part.dims.length?'尺寸级':'轮廓级',material,source:source(part,assumptions),primitives};
}

function hose(part){
  const n=nums(part),diameter=clamp(n[0]||100,20,180),length=clamp(n.at(-1)||900,120,1200);
  const primitives=[cylinder(diameter/2,length,'plastic')];
  for(let x=-length*.45;x<length*.46;x+=clamp(diameter*.35,12,36))primitives.push({type:'torus',radius:diameter*.53,tube:clamp(diameter*.045,2,7),rotation:[0,PI/2,0],position:[x,0,0],material:'plastic'});
  return special(part,'plastic',primitives,'按厂家φ100和明确长度建立吸尘软管，并按原格连续螺旋加强筋表达柔性管语义。');
}

function gasSpring(part){
  return special(part,'darkMetal',[cylinder(24,260,'darkMetal'),cylinder(10,170,'metal',[205,0,0]),{type:'torus',radius:24,tube:8,rotation:[0,PI/2,0],position:[-150,0,0],material:'metal'},{type:'torus',radius:18,tube:7,rotation:[0,PI/2,0],position:[305,0,0],material:'metal'}],'厂家未标气弹簧尺寸；仅按原格长筒、活塞杆和两端铰接头建立轮廓级模型。');
}

function fan(part){
  const n=nums(part),outer=clamp(n[0]||300,120,420);
  if(/蜗壳/.test(part.name))return special(part,'paintedMetal',[{type:'torus',radius:outer*.36,tube:outer*.13,material:'paintedMetal'},cylinder(outer*.18,outer*.25,'darkMetal',[0,0,0],'z'),box([outer*.42,outer*.24,outer*.25],'paintedMetal',[outer*.43,-outer*.2,0])],'按厂家蜗壳正视螺旋外廓、长205与出风口建立风机壳体；渐开线细节按原格比例表达。');
  const hub=clamp(outer*.08,10,32),width=clamp((n[1]||outer*.8)*.08,8,28),primitives=[cylinder(hub,width*1.8,'darkMetal',[0,0,0],'z'),{type:'torus',radius:outer*.47,tube:clamp(width*.18,2,6),material:'metal'}];
  for(let i=0;i<12;i++){const angle=PI*2*i/12;primitives.push(box([outer*.36,clamp(outer*.045,6,16),width],'paintedMetal',[Math.cos(angle)*outer*.27,Math.sin(angle)*outer*.27,0],[0,0,angle+.35]))}
  return special(part,'paintedMetal',primitives,'按厂家φ300叶轮外径、叶片有效直径和可见弯曲方向建立轮毂及12片叶片。');
}

function door(part){
  const n=nums(part),width=clamp(n[0]||630,100,1270),height=clamp(n[1]||450,100,900),depth=clamp(n[2]||18,4,40);
  const primitives=[{type:'extrude',points:rect(width,height),depth,material:'paintedMetal',bevel:1},box([width,clamp(height*.055,10,30),depth*1.7],'darkMetal',[0,-height*.4,0]),cylinder(clamp(height*.018,5,14),height*.78,'metal',[-width*.49,0,0],'y')];
  return special(part,'paintedMetal',primitives,'按厂家门板宽、高、厚度和可见横向加强筋/铰接边建立；未标锁孔位置按原格比例表达。');
}

function windowModel(part){
  const n=nums(part),height=clamp(n[0]||276,80,500),width=clamp(n[1]||100,40,260),depth=8;
  return special(part,'glass',[{type:'extrude',points:rect(width,height),depth,material:'glass'},box([width+18,10,depth+6],'paintedMetal',[0,-height/2,0]),box([width+18,10,depth+6],'paintedMetal',[0,height/2,0]),box([10,height,depth+6],'paintedMetal',[-width/2,0,0]),box([10,height,depth+6],'paintedMetal',[width/2,0,0])],'按厂家276×100观察窗建立透明窗面和四周金属框，不按实心金属板处理。');
}

function lock(part){
  const n=nums(part),a=clamp(n[0]||58,24,160),b=clamp(n[1]||38,16,100),c=clamp(n[2]||16,5,60);
  if(/铰链/.test(part.name))return special(part,'metal',[box([a,b,c],'paintedMetal'),box([a,b,c],'paintedMetal',[a*.7,0,0]),cylinder(clamp(b*.14,3,9),a*1.7,'darkMetal',[a*.35,0,0],'x')],'厂家仅标铰链高度38；叶片宽度、轴径和搭接量按原格三视图估算。');
  return special(part,'darkMetal',[box([a,b,c],'darkMetal'),cylinder(clamp(b*.18,4,12),a*.75,'metal',[a*.3,0,0]),box([a*.4,b*.25,c*.8],'paintedMetal',[-a*.35,-b*.35,0])],'按厂家门锁/搭扣剖面与明确外形尺寸建立锁体、锁芯和拨片；内部弹簧未标。');
}

function arrow(part){
  const flip=/-R$/.test(part.code)?-1:1,points=[[-110,-16],[-48,-16],[-58,-34],[10,-10],[95,-25],[70,0],[95,25],[10,10],[-58,34],[-48,16],[-110,16]].map(([x,y])=>[flip*x,y]);
  return special(part,'paintedMetal',[{type:'extrude',points,depth:3,material:'paintedMetal',bevel:.4}],'厂家原格未标尺寸；左右箭头牌分别按原格镜像轮廓建立，不合并为同一方向。');
}

export function createJwf1206P62P73Spec(part){
  if(/吸尘软管/.test(part.name))return hose(part);
  if(/气弹簧/.test(part.name))return gasSpring(part);
  if(part.modelType==='fan')return fan(part);
  if(part.modelType==='door')return door(part);
  if(part.modelType==='window')return windowModel(part);
  if(part.modelType==='lock')return lock(part);
  if(/箭头牌/.test(part.name))return arrow(part);
  return createBaseSpec(part);
}
