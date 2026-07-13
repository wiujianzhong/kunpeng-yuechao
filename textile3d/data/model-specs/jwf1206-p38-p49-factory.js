// JWF1206 第38—49页：按厂家单格三视图、剖面与明确尺寸生成识别级3D规格。
const PI=Math.PI;
const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));
const nums=part=>part.dims.flatMap(value=>(String(value).match(/\d+(?:\.\d+)?/g)||[]).map(Number));
const rect=(width,height)=>[[-width/2,-height/2],[width/2,-height/2],[width/2,height/2],[-width/2,height/2]];
const box=(size,material='paintedMetal',position=[0,0,0],rotation=[0,0,0])=>({type:'box',size,material,position,rotation});
const cylinder=(radius,length,material='metal',position=[0,0,0],axis='x')=>({type:'cylinder',radius,length,axis,material,position});
const extrude=(width,height,depth,holes=[],material='paintedMetal')=>({type:'extrude',points:rect(width,height),depth,holes,bevel:Math.min(depth*.08,2),material});
const annulus=(outer,inner,width,material='darkMetal',position=[0,0,0])=>({
  type:'lathe',points:[[inner/2,-width/2],[outer/2,-width/2],[outer/2,width/2],[inner/2,width/2],[inner/2,-width/2]],
  rotation:[0,0,PI/2],material,position,
});

function source(part,assumptions){
  return {
    page:part.page,item:part.item,code:part.code,recordKey:part.recordKey,nameZh:part.name,nameEn:part.nameEn,
    quantity:{value:part.quantity,unit:part.quantityUnit,meaning:part.quantityMeaning},dimensions:part.dims,
    sourceCrop:part.sourceCrop,sourceVector:part.sourceVector,views:[`第${part.page}页厂家原格`],assumptions,
  };
}

function dimensions(part,defaults=[180,90,8]){
  const n=nums(part);
  return [clamp(n[0]||defaults[0],8,1200),clamp(n[1]||defaults[1],5,800),clamp(n[2]||defaults[2],1,300)];
}

function plate(part){
  const [width,height,depth]=dimensions(part);
  const holes=[];
  if(/板|片|键|标牌/.test(part.name)){
    const radius=clamp(Math.min(width,height)*.07,2,16);
    if(width>50)holes.push({kind:'circle',center:[-width*.3,0],radius},{kind:'circle',center:[width*.3,0],radius});
  }
  const material=/有机玻璃/.test(part.name)?'glass':'paintedMetal';
  const primitives=[extrude(width,height,depth,holes,material)];
  if(/L形板/.test(part.name))primitives.push(box([width,clamp(height*.12,5,22),clamp(height*.55,12,90)],'darkMetal',[0,-height*.44,-height*.22]));
  if(/刮刀/.test(part.name))primitives.push(box([width,clamp(height*.12,4,16),depth*1.4],'metal',[0,height*.44,depth*.2]));
  return {material,primitives,note:'按厂家板件外边界、厚度和可见安装孔建立；未标孔径及折弯圆角按原格比例表达。'};
}

function ring(part){
  const n=nums(part),outer=clamp(n[0]||40,8,220);
  let inner=clamp(n[1]||outer*.48,1,outer*.9),width=clamp(n.at(-1)||5,.5,100);
  if(/圆座/.test(part.name)){inner=outer*.34;width=clamp(n[1]||25,4,80)}
  return {material:'metal',primitives:[annulus(outer,inner,width,/垫片|垫圈/.test(part.name)?'darkMetal':'metal')],note:'按厂家回转剖面的外径、内径和厚度建立；名称规格与图中尺寸同时保留。'};
}

function shaft(part){
  const n=nums(part),first=part.dims[0]||'';
  let diameter=16,length=120;
  if(/[φΦM]/.test(first)){diameter=n[0]||16;length=n.at(-1)||120}else{length=n[0]||120;diameter=n[1]||16}
  diameter=clamp(diameter,4,100);length=clamp(length,20,1200);
  const primitives=[cylinder(diameter/2,length,'metal')];
  if(/螺栓|螺钉|丝杠|撑杆/.test(part.name))primitives.push(cylinder(diameter*.72,clamp(length*.13,5,40),'darkMetal',[-length*.44,0,0]));
  if(/轴|顶杆|导条杆/.test(part.name))primitives.push(cylinder(diameter*.66,clamp(length*.1,5,30),'darkMetal',[length*.45,0,0]));
  return {material:'metal',primitives,note:'按厂家明确杆径、总长、螺纹和端部台阶建立；未标牙型、倒角与公差不作加工依据。'};
}

function roller(part){
  const n=nums(part);let diameter=n[0]||75,length=n[1]||700;
  if(diameter>length){[diameter,length]=[length,diameter]}
  diameter=clamp(diameter,18,260);length=clamp(length,80,1200);
  const core=clamp(diameter*.22,8,48);
  return {material:'darkMetal',primitives:[cylinder(diameter/2,length,'darkMetal'),cylinder(core/2,length+diameter*.7,'metal'),annulus(diameter*1.04,core,clamp(diameter*.1,5,18),'paintedMetal',[-length*.47,0,0]),annulus(diameter*1.04,core,clamp(diameter*.1,5,18),'paintedMetal',[length*.47,0,0])],note:'按厂家辊径、辊长及轴端尺寸建立辊体、贯通轴和端部轮缘。'};
}

function pulley(part){
  const n=nums(part),outer=clamp(n[0]||80,20,220),inner=clamp(n[1]||outer*.3,5,outer*.7),width=clamp(n.at(-1)||32,5,90);
  const teeth=Number((part.name.match(/(\d+)[TZ]/)||[])[1])||24;
  const primitives=[annulus(outer*.9,inner,width,'darkMetal'),annulus(outer*.62,inner,width*1.08,'metal')];
  for(let i=0;i<Math.min(teeth,40);i++){
    const angle=PI*2*i/Math.min(teeth,40);
    primitives.push(box([width*.74,clamp(outer*.055,3,9),clamp(outer*.1,4,14)],'paintedMetal',[0,Math.cos(angle)*outer*.46,Math.sin(angle)*outer*.46],[angle,0,0]));
  }
  return {material:'darkMetal',primitives,note:'按厂家外径、孔径、轮宽和名称中齿数建立同步带轮；齿形细节仅作识别级表达。'};
}

function spring(part){
  const n=nums(part),length=clamp(n.at(-1)||45,20,220);
  const wire=/线径/.test(part.dims[0]||'')?clamp(n[0]/2,.8,5):clamp((n[0]||3)*.13,.9,4);
  const radius=clamp(/线径/.test(part.dims[0]||'')?wire*4.2:(n[0]||18)*.6,5,28);
  const turns=/拉簧/.test(part.name)?10:8;
  const points=Array.from({length:turns*12+1},(_,index)=>{const t=index/(turns*12);const angle=t*turns*PI*2;return [t*length-length/2,Math.cos(angle)*radius,Math.sin(angle)*radius]});
  const primitives=[{type:'tube',points,radius:wire,radialSegments:10,material:'darkMetal'}];
  if(/拉簧/.test(part.name)){primitives.push({type:'torus',radius:radius*.75,tube:wire,rotation:[0,PI/2,0],position:[-length*.56,0,0],material:'darkMetal'},{type:'torus',radius:radius*.75,tube:wire,rotation:[0,PI/2,0],position:[length*.56,0,0],material:'darkMetal'})}
  return {material:'darkMetal',primitives,note:'按厂家线径/外径、自由长与拉簧挂钩语义建立螺旋弹簧；未标圈数按原格比例估算。'};
}

function seal(part){
  const [length,width,thickness]=dimensions(part,[330,120,3]);
  if(/密封条/.test(part.name))return {material:'rubber',primitives:[box([length,width,thickness],'rubber')],note:'按厂家长度、截面宽度和厚度建立柔性橡胶密封条，不渲染为金属。'};
  const holeWidth=width*.65,holeHeight=length*.62;
  return {material:'rubber',primitives:[{type:'extrude',points:rect(width,length),depth:thickness,holes:[{kind:'polygon',points:rect(holeWidth,holeHeight)}],material:'rubber'}],note:'按厂家外框尺寸和厚度建立柔性密封垫；内开口按原格轮廓比例表达。'};
}

function pipe(part){
  const n=nums(part),name=part.name;
  if(/塑料波纹管/.test(name)){
    const outer=clamp(n[0]||21.2,8,60),inner=clamp(n[1]||16.8,4,outer*.9),length=clamp(n[2]||800,60,1200);
    const primitives=[cylinder(outer/2,length,'plastic')];
    for(let x=-length*.46;x<length*.47;x+=clamp(outer*.55,7,18))primitives.push({type:'torus',radius:outer*.54,tube:clamp((outer-inner)*.22,.8,3),rotation:[0,PI/2,0],position:[x,0,0],material:'plastic'});
    return {material:'plastic',primitives,note:'按厂家外径φ21.2、内径φ16.8和长度800建立塑料波纹软管及环向波纹。'};
  }
  const diameter=clamp(n[0]||20,3,90),length=clamp(n.at(-1)||300,40,1200);
  return {material:/气管/.test(name)?'plastic':'metal',primitives:[cylinder(diameter/2,length,/气管/.test(name)?'plastic':'metal')],note:'按厂家管径和长度建立空心/柔性管件外形；未标壁厚不作制造依据。'};
}

function bracket(part){
  const [width,height,depth]=dimensions(part,[120,70,12]);
  const holes=[{kind:'circle',center:[-width*.27,0],radius:clamp(Math.min(width,height)*.07,2,12)},{kind:'circle',center:[width*.27,0],radius:clamp(Math.min(width,height)*.07,2,12)}];
  return {material:'paintedMetal',primitives:[extrude(width,height,depth,holes),box([width,clamp(height*.14,5,22),clamp(height*.52,12,100)],'darkMetal',[0,-height*.43,-height*.2])],note:'按厂家支座/支架正视外廓、孔位和侧视折弯建立；未标圆角按原格比例估算。'};
}

function hood(part){
  const [length,height,depth]=dimensions(part,[500,240,120]);
  const radius=clamp(Math.min(height,depth)*.18,18,80);
  const path=[[-length*.48,0,-height*.22],[-length*.28,0,-height*.18],[0,0,0],[length*.28,0,height*.16],[length*.46,0,height*.3]];
  const primitives=[{type:'tube',points:path,radius,radialSegments:24,material:'paintedMetal'},annulus(radius*2.45,radius*1.65,clamp(radius*.22,5,20),'darkMetal',[-length*.48,0,-height*.22]),annulus(radius*2.45,radius*1.65,clamp(radius*.22,5,20),'darkMetal',[length*.46,0,height*.3])];
  if(/箱体|集棉器/.test(part.name))primitives.push(box([length*.6,height*.55,depth*.55],'paintedMetal',[0,0,0]));
  return {material:'paintedMetal',primitives,note:'按厂家总长、高度、接口宽度和原格弯折走向建立吸口/风道壳体及端部法兰；未标截面仅作识别级表达。'};
}

function assembly(part){
  const [width,height,depth]=dimensions(part,[360,220,90]);
  return {material:'paintedMetal',primitives:[extrude(width,height,clamp(depth*.18,6,40),[]),box([width,clamp(height*.08,8,24),depth],'darkMetal',[0,-height*.45,0]),box([clamp(width*.08,8,28),height,depth],'metal',[-width*.45,0,0]),cylinder(clamp(Math.min(width,height)*.1,8,40),depth+30,'metal',[width*.2,0,0],'z')],note:'按厂家原格正视、侧视外廓和明确尺寸建立结合件主体、折边与主要接口；内部连接未标部分不作制造依据。'};
}

function choose(part){
  if(part.modelType==='seal')return seal(part);
  if(part.modelType==='pipe')return pipe(part);
  if(part.modelType==='spring')return spring(part);
  if(part.modelType==='pulley')return pulley(part);
  if(part.modelType==='roller')return roller(part);
  if(part.modelType==='shaft')return shaft(part);
  if(part.modelType==='ring')return ring(part);
  if(part.modelType==='hood')return hood(part);
  if(part.modelType==='bracket')return bracket(part);
  if(part.modelType==='plate')return plate(part);
  return assembly(part);
}

export function createJwf1206P38P49Spec(part){
  const model=choose(part);
  const assumptions=[model.note,part.dims.length?'厂家明确尺寸直接进入模型主轮廓；孔距、公差、倒角和内部连接未标部分仅按原格比例表达。':'厂家原格未标几何尺寸，模型只表达可见轮廓。'];
  return {level:part.dims.length?'尺寸级':'轮廓级',material:model.material,source:source(part,assumptions),primitives:model.primitives};
}
