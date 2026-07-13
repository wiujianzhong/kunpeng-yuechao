// JWF1206 第50—61页：只依据厂家原格三视图、剖面和明确尺寸建立识别级3D规格。
const PI=Math.PI;
const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));
const numbers=part=>(part.dims||[]).flatMap(value=>(String(value).match(/\d+(?:\.\d+)?/g)||[]).map(Number));
const rect=(width,height)=>[[-width/2,-height/2],[width/2,-height/2],[width/2,height/2],[-width/2,height/2]];
const box=(size,material='paintedMetal',position=[0,0,0],rotation=[0,0,0])=>({type:'box',size,material,position,rotation});
const cylinder=(radius,length,material='metal',position=[0,0,0],axis='x')=>({type:'cylinder',radius,length,axis,material,position});
const extrude=(width,height,depth,holes=[],material='paintedMetal',position=[0,0,0])=>({type:'extrude',points:rect(width,height),depth,holes,bevel:Math.min(Math.max(depth,1)*.06,2),material,position});
const annulus=(outer,inner,width,material='metal',position=[0,0,0])=>({type:'lathe',points:[[inner/2,-width/2],[outer/2,-width/2],[outer/2,width/2],[inner/2,width/2],[inner/2,-width/2]],rotation:[0,0,PI/2],material,position});
const hole=(x,y,r)=>({kind:'circle',center:[x,y],radius:r});

function source(part,assumptions){return {page:part.page,item:part.item,code:part.code,recordKey:part.recordKey,nameZh:part.name,nameEn:part.sourceNameEn,quantity:{value:part.quantity,unit:part.quantityUnit,meaning:part.quantityMeaning},dimensions:part.dims,sourceCrop:part.sourceCrop,sourceVector:part.sourceVector,views:[`第${part.page}页厂家原格`],assumptions};}
function bounded(part,defaults=[180,90,8]){const n=numbers(part);return [clamp(n[0]||defaults[0],6,1300),clamp(n[1]||defaults[1],4,900),clamp(n[2]||defaults[2],.1,320)];}

function ring(part){
  const n=numbers(part),name=part.name;
  if(/密封圈\d/.test(name)){const diameter=clamp(n[0]||40,8,160),tube=clamp(Number((name.match(/×(\d+(?:\.\d+)?)/)||[])[1])||n[1]||3,.7,12);return {material:'rubber',primitives:[{type:'torus',radius:Math.max(2,diameter/2-tube/2),tube,rotation:[0,PI/2,0],material:'rubber'}],note:'按厂家名称中的密封圈直径和截面规格建立柔性橡胶O形圈；图示1.6尺寸作为原文保留。'};}
  const outer=clamp(n[0]||90,8,260),inner=clamp(n[1]||outer*.65,1,outer*.92),width=clamp(n.at(-1)||3,.1,40);
  const material=/密封|垫/.test(name)?'rubber':'metal';
  if(/密封垫/.test(name)&&n.length>=2)return {material:'rubber',primitives:[extrude(outer,inner,clamp(n[2]||3,.5,12),[hole(0,0,Math.min(outer,inner)*.19)],'rubber')],note:'按厂家外形尺寸和中心孔建立柔性密封垫，不使用金属材质。'};
  return {material,primitives:[annulus(outer,inner,width,material)],note:'按厂家回转剖面的外径、内径和厚度建立环件；未标倒角与公差不作加工依据。'};
}

function strip(part){
  const n=numbers(part),sectionW=clamp(n[0]||9.5,3,24),sectionH=clamp(n[1]||6,2,18),length=part.quantityUnit==='dm'?clamp(part.quantity*100,120,1100):clamp(n.find(v=>v>100)||520,120,1100);
  const points=[[-length/2,sectionW*2,0],[-length/2,-sectionW*2,0],[-length*.42,-sectionW*4,0],[length*.42,-sectionW*4,0],[length/2,-sectionW*2,0],[length/2,sectionW*2,0]];
  return {material:'rubber',primitives:[{type:'tube',points,radius:Math.max(1,sectionH*.32),radialSegments:10,material:'rubber'}],note:'按厂家密封条截面及单台11dm用量建立柔性橡胶条；走向仅为预览折弯，不代表安装路径。'};
}

function hose(part){
  const n=numbers(part),length=clamp(n[0]||900,120,1200),diameter=clamp(n[1]||50,12,110);
  const points=Array.from({length:9},(_,i)=>{const t=i/8;return [t*length-length/2,Math.sin(t*PI*1.6)*diameter*.45,Math.cos(t*PI*1.2)*diameter*.18]});
  const primitives=[{type:'tube',points,radius:diameter/2,radialSegments:18,material:'rubber'}];
  for(let i=1;i<8;i++){const p=points[i];primitives.push({type:'torus',radius:diameter*.52,tube:Math.max(1.2,diameter*.045),rotation:[0,PI/2,0],position:p,material:'darkMetal'});}
  return {material:'rubber',primitives,note:'按厂家总长和管径建立柔性波纹吸尘软管；弯曲路径仅用于3D识别展示。'};
}

function shaft(part){
  const n=numbers(part),name=part.name;
  if(name==='键'){const [length,width,height]=[n[0]||20,n[1]||16,n[2]||10];return {material:'metal',primitives:[box([length,width,height],'metal')],note:'按厂家20×16×10建立平键实体。'};}
  if(/轴套|轴承套|套$/.test(name)){const outer=clamp(n[0]||70,10,160),length=clamp(n[1]||45,5,120),inner=outer*.58;return {material:'metal',primitives:[annulus(outer,inner,length,'metal'),annulus(outer*1.04,inner,length*.14,'darkMetal',[length*.43,0,0])],note:'按厂家外径和轴向长度建立台阶套筒；未标内径按剖面比例估算。'};}
  const first=String(part.dims?.[0]||''),diameterFirst=/^[φΦ]/.test(first),length=clamp(diameterFirst?(n[1]||60):(n[0]||80),18,1200),diameter=clamp(diameterFirst?(n[0]||12):(n.find(v=>v<=30&&v!==length)||12),3,80);
  const primitives=[cylinder(diameter/2,length,'metal')];
  if(/撑杆|螺柱|螺栓/.test(name)){primitives.push(cylinder(diameter*.72,Math.max(6,length*.18),'darkMetal',[-length*.42,0,0]),cylinder(diameter*.72,Math.max(6,length*.18),'darkMetal',[length*.42,0,0]));}
  if(/轴$|销$/.test(name))primitives.push(cylinder(diameter*.68,Math.max(5,length*.12),'darkMetal',[length*.46,0,0]));
  return {material:'metal',primitives,note:'按厂家总长、杆径和可见端部台阶建立轴/杆/销件；螺纹牙型和倒角仅作识别级表达。'};
}

function pulley(part){
  const n=numbers(part),outer=clamp(n[0]||100,24,240),width=clamp(n.at(-1)||35,5,90),inner=clamp(outer*.36,8,outer*.72);
  const primitives=[annulus(outer,inner,width,'darkMetal'),annulus(outer*.62,inner,width*1.06,'metal')];
  for(let i=0;i<6;i++){const a=i*PI/3;primitives.push(box([width*.82,outer*.08,outer*.18],'paintedMetal',[0,Math.cos(a)*outer*.38,Math.sin(a)*outer*.38],[a,0,0]));}
  return {material:'darkMetal',primitives,note:'按厂家带轮外径、轮宽和中心孔建立轮体、轮毂及弧形减重槽语义。'};
}

function roller(part){
  const n=numbers(part),name=part.name;
  let length=clamp(n.find(v=>v>300)||n[0]||900,120,1200),diameter=clamp(n.find(v=>v>60&&v<300)||90,24,260);
  if(/清洁器/.test(name))diameter=70;
  const shaftD=clamp(diameter*.18,8,38),primitives=[cylinder(diameter/2,length,'darkMetal'),cylinder(shaftD/2,length+diameter*.72,'metal')];
  primitives.push(annulus(diameter*1.06,shaftD,Math.max(8,diameter*.12),'paintedMetal',[-length*.47,0,0]),annulus(diameter*1.06,shaftD,Math.max(8,diameter*.12),'paintedMetal',[length*.47,0,0]));
  if(/清洁器/.test(name))for(let i=0;i<7;i++)primitives.push(box([length*.5,Math.max(3,diameter*.05),diameter*.65],'metal',[0,Math.cos(i*PI/3.5)*diameter*.36,Math.sin(i*PI/3.5)*diameter*.36],[i*PI/3.5,0,0]));
  return {material:'darkMetal',primitives,note:'按厂家总长、辊径和轴端轮廓建立辊体、贯通轴和端部轴肩；内部结构未标部分不展开。'};
}

function spring(part){
  const n=numbers(part),length=clamp(n[0]||24,12,100),outer=clamp(n[1]||16,6,50),wire=clamp((n[2]||outer*.12)*.1,.7,3),turns=5;
  const points=Array.from({length:turns*16+1},(_,i)=>{const t=i/(turns*16),a=t*turns*PI*2;return [t*length-length/2,Math.cos(a)*(outer/2-wire),Math.sin(a)*(outer/2-wire)]});
  return {material:'darkMetal',primitives:[{type:'tube',points,radius:wire,radialSegments:10,material:'darkMetal'}],note:'按厂家自由长和外径建立压缩弹簧；未标线径和圈数按原格比例估算。'};
}

function plate(part){
  const n=numbers(part),name=part.name;let width=clamp(n[0]||180,8,1200),height=clamp(n[1]||Math.max(30,width*.24),6,500),depth=clamp(n[2]||Math.min(width,height)*.06,.5,100);
  if(width<height){const t=width;width=height;height=t;}
  const holes=width>55?[hole(-width*.36,0,Math.max(2,Math.min(height,30)*.1)),hole(width*.36,0,Math.max(2,Math.min(height,30)*.1))]:[];
  const material=/密封/.test(name)?'rubber':'paintedMetal',primitives=[extrude(width,height,depth,holes,material)];
  if(/U形板|支撑板|撑板|弧形板|罩板|弧板/.test(name))primitives.push(box([width,Math.max(4,height*.08),Math.max(8,depth*2)],'darkMetal',[0,-height*.44,-depth*.7]));
  if(/除尘刀/.test(name))primitives.push(box([width,Math.max(3,height*.06),Math.max(4,depth*1.6)],'metal',[0,height*.44,depth*.5]));
  return {material,primitives,note:'按厂家板件外边界、明确厚度、可见孔和折边建立；未标孔径、圆角与折弯半径按原格比例表达。'};
}

function bracket(part){
  const n=numbers(part),name=part.name,width=clamp(n[0]||160,30,900),height=clamp(n[1]||100,30,360),depth=clamp(n[2]||Math.min(width,height)*.28,8,180),radius=Math.max(3,Math.min(width,height)*.07);
  const primitives=[extrude(width,height,Math.max(5,depth*.18),[hole(-width*.28,-height*.25,radius),hole(width*.28,-height*.25,radius)],'paintedMetal'),box([width,Math.max(7,height*.12),depth],'darkMetal',[0,-height*.43,-depth*.35])];
  if(/轴承/.test(name)){const outer=clamp(n.find(v=>v>80&&v<260)||Math.min(width,height)*.72,50,220);primitives.push(annulus(outer,outer*.48,Math.max(12,depth*.55),'metal',[0,0,depth*.12]));}
  if(/机架/.test(name))for(let i=-1;i<=1;i++)primitives.push(box([Math.max(12,width*.04),height*.84,depth*.7],'metal',[i*width*.28,0,-depth*.25]));
  return {material:'paintedMetal',primitives,note:'按厂家支座/机架正视外廓、轴承孔、安装孔和侧向深度建立；内部筋板仅按可见轮廓表达。'};
}

function hood(part){
  const n=numbers(part),name=part.name,length=clamp(n[0]||500,80,1200),width=clamp(n.find(v=>v>50&&v!==n[0])||150,40,340),height=clamp(n.at(-1)||width*.55,30,220);
  if(/圆吸口/.test(name))return {material:'paintedMetal',primitives:[cylinder(width/2,length,'paintedMetal'),annulus(width*1.08,width*.82,Math.max(6,width*.08),'darkMetal',[-length*.48,0,0]),annulus(width*1.08,width*.82,Math.max(6,width*.08),'darkMetal',[length*.48,0,0])],note:'按厂家长度和φ70圆截面建立圆吸口薄壁管及两端法兰。'};
  const primitives=[box([length,width,Math.max(4,height*.06)],'paintedMetal',[0,0,height*.45]),box([length,Math.max(5,width*.06),height],'darkMetal',[0,-width*.47,0]),box([length,Math.max(5,width*.06),height],'darkMetal',[0,width*.47,0]),box([Math.max(6,length*.015),width,height],'metal',[-length*.48,0,0]),box([Math.max(6,length*.015),width,height],'metal',[length*.48,0,0])];
  return {material:'paintedMetal',primitives,note:'按厂家吸口总长、截面宽高和端部法兰建立薄壁风道；未标壁厚按原格比例估算。'};
}

function lock(part){
  const n=numbers(part),width=clamp(n[0]||32,15,80),height=clamp(n[1]||26,10,70),depth=clamp(n[2]||18,5,50);
  return {material:'darkMetal',primitives:[box([width,height,depth],'darkMetal'),cylinder(Math.min(height,depth)*.22,width*.9,'metal'),box([width*.7,height*.18,depth*.3],'metal',[width*.55,0,0])],note:'按厂家锁壳/锁芯/锁片外形建立锁体、芯轴和锁舌语义。'};
}

function assembly(part){
  const n=numbers(part),name=part.name;
  if(/指针/.test(name)){const length=clamp(n[0]||80,40,130),width=clamp(n[1]||20,10,40);return {material:'paintedMetal',primitives:[{type:'extrude',points:[[-length/2,-width/2],[length*.18,-width/2],[length/2,0],[length*.18,width/2],[-length/2,width/2]],depth:4,holes:[hole(-length*.2,0,width*.24)],material:'paintedMetal'},cylinder(width*.3,10,'darkMetal',[-length*.2,0,0],'z')],note:'按厂家指针正视轮廓、长度、宽度和转轴孔建立指针结合件。'};}
  const [width,height,depth]=bounded(part,[280,140,50]);
  return {material:'paintedMetal',primitives:[extrude(width,height,Math.max(5,depth*.18),[hole(-width*.34,0,Math.max(2,height*.05)),hole(width*.34,0,Math.max(2,height*.05))]),box([width,Math.max(6,height*.08),depth],'darkMetal',[0,-height*.44,-depth*.28]),box([Math.max(8,width*.04),height*.82,depth*.75],'metal',[-width*.44,0,-depth*.2])],note:'按厂家结合件正视、侧视外廓和明确尺寸建立主体、折边与主要接口；内部连接未标部分不作制造依据。'};
}

function choose(part){if(part.modelType==='ring')return ring(part);if(part.modelType==='strip')return strip(part);if(part.modelType==='hose')return hose(part);if(part.modelType==='shaft')return shaft(part);if(part.modelType==='pulley')return pulley(part);if(part.modelType==='roller')return roller(part);if(part.modelType==='spring')return spring(part);if(part.modelType==='plate')return plate(part);if(part.modelType==='bracket')return bracket(part);if(part.modelType==='hood')return hood(part);if(part.modelType==='lock')return lock(part);return assembly(part);}

export function createJwf1206P50P61Spec(part){const model=choose(part),assumptions=[model.note,part.dims.length?'厂家明确尺寸直接进入模型主轮廓；未标孔距、壁厚、倒角、公差和内部连接仅按原格比例表达。':'厂家原格未标几何尺寸，模型只表达可见轮廓。'];return {level:part.dims.length?'尺寸级':'轮廓级',material:model.material,source:source(part,assumptions),primitives:model.primitives};}
