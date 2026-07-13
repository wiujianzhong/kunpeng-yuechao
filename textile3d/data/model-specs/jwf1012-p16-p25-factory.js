// JWF1012 第16—25页零件3D规格工厂。
// 厂家明确尺寸直接用于主轮廓；未标结构只在 assumptions 中说明。

const PI=Math.PI;
const positive=value=>Number.isFinite(value)&&value>0?value:1;
const values=part=>part.dims.flatMap(item=>(String(item).match(/\d+(?:\.\d+)?/g)||[]).map(Number));
const rect=(width,height)=>[[-width/2,-height/2],[width/2,-height/2],[width/2,height/2],[-width/2,height/2]];
const hex=across=>Array.from({length:6},(_,index)=>{const angle=PI/6+index*PI/3,radius=across/Math.sqrt(3);return[Math.cos(angle)*radius,Math.sin(angle)*radius]});
const box=(size,material='metal',position=[0,0,0],rotation=[0,0,0])=>({type:'box',size:size.map(positive),material,position,rotation});
const cylinder=(radius,length,material='metal',position=[0,0,0],axis='x')=>({type:'cylinder',radius:positive(radius),length:positive(length),axis,material,position});
const annulus=(outer,inner,width,material='metal',position=[0,0,0])=>({
  type:'lathe',points:[[inner/2,-width/2],[outer/2,-width/2],[outer/2,width/2],[inner/2,width/2],[inner/2,-width/2]],
  rotation:[0,0,PI/2],position,material,
});
const extrude=(width,height,depth,holes=[],material='metal',position=[0,0,0])=>({
  type:'extrude',points:rect(positive(width),positive(height)),depth:positive(depth),holes,material,position,
  bevel:Math.min(positive(depth)*.07,2),
});
const radialBoxes=(count,radius,size,material='darkMetal')=>Array.from({length:Math.max(3,Math.min(count,48))},(_,index)=>{
  const angle=PI*2*index/count;
  return box(size,material,[0,Math.cos(angle)*radius,Math.sin(angle)*radius],[angle,0,0]);
});

function slashInner(part,fallback){
  const text=part.dims.find(item=>/\//.test(item));
  const numbers=text?(String(text).match(/\d+(?:\.\d+)?/g)||[]).map(Number):[];
  return numbers[1]||fallback;
}

function sheetSize(part,defaults=[180,100,8]){
  const n=values(part);
  return [n[0]||defaults[0],n[1]||defaults[1],n[2]||defaults[2]];
}

function plate(part){
  const [width,height,depth]=sheetSize(part);
  const holes=[];
  if(/连接板|托板|定位板|挡板|隔板|垫板|板$/.test(part.name)){
    holes.push({kind:'circle',center:[-width*.28,0],radius:Math.max(2,Math.min(width,height)*.055)});
    holes.push({kind:'circle',center:[width*.28,0],radius:Math.max(2,Math.min(width,height)*.055)});
  }
  return [extrude(width,height,depth,holes,'paintedMetal')];
}

function bracket(part){
  const [width,height,depth]=sheetSize(part,[160,100,32]);
  if(/L形板/.test(part.name)){
    const lip=Math.max(6,Math.min(width,height)*.16);
    return [{type:'extrude',points:[[-width/2,-height/2],[width/2,-height/2],[width/2,-height/2+lip],[-width/2+lip,-height/2+lip],[-width/2+lip,height/2],[-width/2,height/2]],depth,holes:[{kind:'circle',center:[width*.18,-height*.28],radius:height*.08},{kind:'circle',center:[-width*.12,height*.18],radius:height*.08}],material:'paintedMetal',bevel:1}];
  }
  if(/U形槽/.test(part.name))return [
    box([width,height,Math.max(5,depth*.16)],'paintedMetal',[0,0,-depth*.42]),
    box([width,Math.max(5,height*.13),depth],'darkMetal',[0,-height*.43,0]),
    box([width,Math.max(5,height*.13),depth],'darkMetal',[0,height*.43,0]),
  ];
  if(/滑块轴承座|轴承座|支撑座/.test(part.name)){
    const n=values(part),outer=n[0]||160,heightValue=n[1]||115,inner=slashInner(part,n.find((value,index)=>index>1&&value<outer*.72)||outer*.36);
    return [extrude(outer,heightValue,Math.max(24,n.at(-1)||42),[{kind:'circle',center:[0,heightValue*.08],radius:inner/2}],'paintedMetal'),box([outer*1.12,heightValue*.18,Math.max(32,n.at(-1)||42)],'darkMetal',[0,-heightValue*.5,0])];
  }
  return [
    extrude(width,height,depth,[{kind:'circle',center:[-width*.27,0],radius:Math.max(3,height*.07)},{kind:'circle',center:[width*.27,0],radius:Math.max(3,height*.07)}],'paintedMetal'),
    box([width,Math.max(8,depth*.35),Math.max(18,height*.35)],'darkMetal',[0,-height*.48,-height*.12]),
  ];
}

function ring(part){
  const n=values(part),outer=n[0]||100;
  const holeText=part.dims.find(item=>/孔/.test(item));
  const holeNumbers=holeText?(String(holeText).match(/\d+(?:\.\d+)?/g)||[]).map(Number):[];
  const inner=slashInner(part,holeNumbers[0]||outer*.42);
  let width=n.at(-1)||Math.max(5,outer*.15);
  if(part.dims.length===1&&/孔/.test(part.dims[0]))width=Math.max(4,outer*.08);
  if(/并紧螺母/.test(part.name))return [{type:'extrude',points:hex(outer),depth:width,holes:[{kind:'circle',center:[0,0],radius:inner/2}],material:'darkMetal',bevel:1}];
  if(/轴承盖|盖$/.test(part.name))return [annulus(outer,inner,width,'paintedMetal'),annulus(outer*.72,inner,width*1.28,'darkMetal',[width*.18,0,0])];
  return [annulus(outer,inner,width,/垫片|垫圈/.test(part.name)?'metal':'darkMetal')];
}

function shaft(part){
  const n=values(part),first=part.dims[0]||'';
  let diameter=n[0]||24,length=n[1]||120;
  if(!/[φΦ]/.test(first)&&n.length>1){diameter=n[0];length=n[1]}
  const primitives=[cylinder(diameter/2,length,'metal')];
  if(/偏心/.test(part.name)){
    const flange=n[0]||120;primitives[0]=cylinder(Math.max(8,flange*.12),n[1]||62,'darkMetal',[0,flange*.08,0]);
    primitives.push(annulus(flange,flange*.22,Math.max(8,(n[1]||62)*.18),'metal',[-(n[1]||62)*.42,0,0]));
  }else if(/双键/.test(part.name)){
    primitives.push(box([length*.18,diameter*.16,diameter*.15],'darkMetal',[-length*.34,diameter*.46,0]));
    primitives.push(box([length*.18,diameter*.16,diameter*.15],'darkMetal',[length*.34,diameter*.46,0]));
  }else{
    primitives.push(cylinder(diameter*.68,Math.max(6,length*.12),'darkMetal',[-length*.44,0,0]));
    primitives.push(cylinder(diameter*.68,Math.max(6,length*.12),'darkMetal',[length*.44,0,0]));
  }
  return primitives;
}

function sprocket(part){
  const n=values(part),outer=n[0]||150,inner=slashInner(part,outer*.3),width=n[1]&&n[1]<outer?n[1]:Math.max(24,outer*.25);
  const count=Number((part.name.match(/(\d+)T|(?:(\d+)齿)/)||[]).slice(1).find(Boolean))||21;
  return [
    annulus(outer*.88,inner,width,'darkMetal'),
    annulus(Math.max(inner*2.2,outer*.45),inner,width*1.08,'metal'),
    ...radialBoxes(count,outer*.46,[width*.78,Math.max(5,outer*.055),outer*.11],'paintedMetal'),
  ];
}

function roller(part){
  const n=values(part);
  if(/行走轮/.test(part.name))return [
    annulus(260,72,116,'darkMetal'),annulus(165,72,142,'metal'),cylinder(34,210,'metal'),
    {type:'torus',radius:118,tube:18,rotation:[0,PI/2,0],material:'paintedMetal'},
  ];
  let diameter=n[0]||100,length=n[1]||520,inner=slashInner(part,Math.max(18,diameter*.24));
  if(/长/.test(part.dims[0]||'')){length=n[0]||529;diameter=n[1]||80;inner=diameter*.25}
  return [
    inner?annulus(diameter,inner,length,'darkMetal'):cylinder(diameter/2,length,'darkMetal'),
    cylinder(Math.max(8,inner*.42),length+diameter*.9,'metal'),
    annulus(diameter*1.08,Math.max(8,inner),Math.max(8,diameter*.12),'paintedMetal',[-length*.48,0,0]),
    annulus(diameter*1.08,Math.max(8,inner),Math.max(8,diameter*.12),'paintedMetal',[length*.48,0,0]),
  ];
}

function seal(part){
  const n=values(part),length=n[0]||800,width=n[1]||10,thickness=n[2]||3;
  return [box([length,width,thickness],'rubber'),box([length,width*.25,thickness*.42],'darkMetal',[0,0,thickness*.62])];
}

function spring(part){
  const n=values(part),outer=n[0]||42,inner=n[1]||25.5,thickness=n[2]||2.05;
  return [{type:'lathe',points:[[inner/2,-thickness*.3],[outer/2,thickness*.5],[outer/2,thickness],[inner/2,thickness*.18],[inner/2,-thickness*.3]],rotation:[0,0,PI/2],material:'darkMetal'}];
}

function casing(part){
  const [width,height,depth]=sheetSize(part,[900,600,260]);
  if(/小车机架/.test(part.name))return [
    box([width,Math.max(30,height*.06),depth],'paintedMetal',[0,-height*.47,0]),
    box([Math.max(30,width*.045),height,depth],'darkMetal',[-width*.48,0,0]),
    box([Math.max(30,width*.045),height,depth],'darkMetal',[width*.48,0,0]),
    annulus(height*.72,height*.55,Math.max(28,depth*.18),'metal',[-width*.24,0,0]),
    box([width*.3,height*.72,Math.max(28,depth*.18)],'paintedMetal',[width*.3,0,0]),
  ];
  if(/悬挂/.test(part.name))return [
    extrude(width,height,Math.max(18,depth*.12),[{kind:'circle',center:[0,0],radius:Math.min(width,height)*.25}],'paintedMetal'),
    box([width,Math.max(22,height*.08),depth],'darkMetal',[0,-height*.47,-depth*.3]),
  ];
  return [
    box([width,height,Math.max(16,depth*.08)],'paintedMetal',[0,0,-depth*.46]),
    box([width,Math.max(18,height*.05),depth],'darkMetal',[0,-height*.48,0]),
    box([width,Math.max(18,height*.05),depth],'darkMetal',[0,height*.48,0]),
    box([Math.max(18,width*.05),height,depth],'paintedMetal',[-width*.48,0,0]),
    box([Math.max(18,width*.05),height,depth],'paintedMetal',[width*.48,0,0]),
  ];
}

function door(part){
  const [width,height,depth]=sheetSize(part,[600,500,18]);
  const primitives=[extrude(width,height,depth,[],'paintedMetal'),box([Math.max(14,width*.04),height,depth*1.8],'darkMetal',[-width*.48,0,0])];
  for(let row=0;row<4;row++)for(let col=0;col<3;col++)primitives.push(box([width*.08,height*.018,depth*1.7],'darkMetal',[width*.18+col*width*.1,-height*.2+row*height*.08,depth]));
  return primitives;
}

function brush(part){
  const [length,width,height]=sheetSize(part,[415,35,22]);
  return [box([length,width,Math.max(6,height*.35)],'paintedMetal',[0,0,height*.25]),...Array.from({length:24},(_,index)=>box([Math.max(2,length/110),width*.18,height],'plastic',[-length*.46+index*length/25,0,-height*.38],[0,0,index%2?.1:-.1]))];
}

function clutch(part){
  const n=values(part),outer=n[0]||140,width=n[1]||111;
  return [annulus(outer,outer*.46,width,'darkMetal'),annulus(outer*.84,outer*.49,width*1.05,'metal'),...radialBoxes(8,outer*.38,[width*.48,outer*.08,outer*.12],'paintedMetal')];
}

function shock(part){
  const n=values(part),length=n[0]||87,neck=n[1]||28;
  return [{type:'lathe',points:[[5,-length/2],[5,-length/2+neck],[neck*.62,-length*.12],[neck*.9,length*.32],[neck*.56,length*.5],[0,length*.56]],rotation:[0,0,PI/2],material:'rubber'},cylinder(5,neck,'darkMetal',[-length*.5,0,0])];
}

function choose(part){
  if(/密封条/.test(part.name))return {material:'rubber',primitives:seal(part),note:'按厂家1600×10×3柔性密封条截面和长度建立，厂家英文栏误写BAFFLE PLATE不改变材料语义。'};
  if(/减震块/.test(part.name))return {material:'rubber',primitives:shock(part),note:'按厂家87长、28安装段及原格锥形轮廓建立橡胶减震块。'};
  if(/弹簧/.test(part.name))return {material:'darkMetal',primitives:spring(part),note:'按厂家外径、内径和厚度建立碟形弹簧，不按普通圆柱螺旋弹簧处理。'};
  if(/链轮/.test(part.name))return {material:'darkMetal',primitives:sprocket(part),note:'按厂家外径、孔径、宽度与名称中的明确齿数建立；未标齿数仅按原格轮廓估算。'};
  if(/滚子|行走轮|卷绕辊|张紧轮/.test(part.name))return {material:'darkMetal',primitives:roller(part),note:'按厂家辊径、孔径和长度建立轮体、轮毂、贯通轴及端部结构。'};
  if(/轴$|销轴|短轴|双键轴|偏心销轴/.test(part.name))return {material:'metal',primitives:shaft(part),note:'按厂家轴径、总长与可见台阶建立；螺纹、键槽深度和倒角未标部分仅作识别级表达。'};
  if(/轴承盖|挡圈|衬套|垫片|垫圈|并紧螺母|^盖$/.test(part.name))return {material:'metal',primitives:ring(part),note:'按厂家回转剖面、外径、内径和厚度建立；未标外径或孔径按原格比例估算。'};
  if(/离合器/.test(part.name))return {material:'darkMetal',primitives:clutch(part),note:'按厂家离合器外径、总宽及剖面可见的多层摩擦/轮毂结构建立。'};
  if(/联轴器结合件/.test(part.name))return {material:'darkMetal',primitives:[...ring(part),annulus((values(part)[0]||125)*.72,(values(part)[0]||125)*.3,(values(part)[1]||147)*.55,'metal')],note:'按厂家联轴器外径、总长与剖面中的双轮毂结构建立。'};
  if(/齿轮传动/.test(part.name))return {material:'darkMetal',primitives:[...sprocket({...part,name:'18T链轮'}),cylinder(28,values(part)[0]||255,'metal')],note:'按厂家传动结合件外廓建立齿轮、轮毂和贯通轴；内部齿数未标。'};
  if(/旋转电机座/.test(part.name))return {material:'paintedMetal',primitives:[annulus(values(part)[0]||250,80,values(part)[1]||242,'paintedMetal'),annulus(150,72,(values(part)[1]||242)*.75,'darkMetal')],note:'按厂家外径、高度与回转剖面建立旋转电机座。'};
  if(/刷子/.test(part.name))return {material:'plastic',primitives:brush(part),note:'按厂家刷座长宽高建立金属背板与分布式柔性刷毛。'};
  if(/门结合件/.test(part.name))return {material:'paintedMetal',primitives:door(part),note:'按厂家门板宽高建立折边门体和通风孔；孔形和孔距按原格示意。'};
  if(/箱体|悬挂|小车机架/.test(part.name))return {material:'paintedMetal',primitives:casing(part),note:'按厂家三视图外廓建立框架/箱体、主要开口和加强边；内部构件未标部分不作制造依据。'};
  if(/L形板|U形槽|座|架|托板|滑块|挡块|弹簧挡铁|调节块/.test(part.name))return {material:'paintedMetal',primitives:bracket(part),note:'按厂家板件/支承件外形、孔位和折弯方向建立，未标圆角及壁厚按原格比例估算。'};
  return {material:'paintedMetal',primitives:plate(part),note:'按厂家板件外形尺寸和可见安装孔建立；未标孔径、折边和圆角不作制造依据。'};
}

export function createJwf1012Spec(part){
  const model=choose(part);
  const assumptions=[model.note,part.dims.length?'厂家明确尺寸直接用于主轮廓；未标孔距、公差、倒角和内部连接仅作识别级估算。':'厂家原格未标几何尺寸；模型只按可见剖面和三视图建立识别级轮廓。'];
  return {
    level:part.dims.length?'尺寸级':'轮廓级',material:model.material,
    source:{page:part.page,item:part.item,code:part.code,recordKey:part.recordKey,nameZh:part.name,nameEn:part.nameEn,quantity:{value:part.quantity,unit:part.quantityUnit,meaning:part.quantityMeaning},dimensions:part.dims,sourceCrop:part.sourceCrop,sourceVector:part.sourceVector,views:[`第${part.page}页厂家原格`],assumptions},
    primitives:model.primitives,
  };
}
