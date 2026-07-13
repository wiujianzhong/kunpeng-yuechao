// JWF1026厂家PDF第19—25页的3D建模工厂。
// 厂家明确尺寸只放入source.dimensions；未标孔距、壁厚、圆角与连接细节均写入assumptions。

const PI=Math.PI;
const numbers=value=>(value||[]).flatMap(item=>(String(item).match(/\d+(?:\.\d+)?/g)||[]).map(Number));
const positive=(value,fallback=1)=>Number.isFinite(value)&&value>0?value:fallback;
const rectangle=(width,height)=>[[-width/2,-height/2],[width/2,-height/2],[width/2,height/2],[-width/2,height/2]];
const box=(size,material='paintedMetal',position=[0,0,0],rotation=[0,0,0])=>({type:'box',size:size.map(value=>positive(value)),material,position,rotation});
const cylinder=(radius,length,material='metal',position=[0,0,0],axis='x')=>({type:'cylinder',radius:positive(radius),length:positive(length),material,position,axis});
const extrude=(width,height,depth,holes=[],material='paintedMetal',position=[0,0,0])=>({type:'extrude',points:rectangle(positive(width),positive(height)),depth:positive(depth),holes,bevel:Math.min(positive(depth)*.08,3),material,position});
const annulus=(outer,inner,width,material='metal',position=[0,0,0])=>({type:'lathe',points:[[inner/2,-width/2],[outer/2,-width/2],[outer/2,width/2],[inner/2,width/2],[inner/2,-width/2]],rotation:[0,0,PI/2],position,material});
const hole=(x,y,r)=>({kind:'circle',center:[x,y],radius:r});

function structural(part){
  const n=numbers(part.dimensions),length=Math.max(...n,300),height=n.find(value=>value!==length&&value>50)||72,width=n.find(value=>value!==length&&value!==height)||60;
  if(part.nameZh.startsWith('U槽支撑'))return [
    box([length,width,Math.max(8,height*.16)],'paintedMetal'),
    box([length,Math.max(8,width*.18),height],'darkMetal',[0,-width*.42,height*.35]),
    box([length,Math.max(8,width*.18),height],'darkMetal',[0,width*.42,height*.35]),
    ...Array.from({length:6},(_,i)=>box([Math.max(6,length*.012),width*1.18,height*.82],'metal',[-length*.42+i*length*.84/5,0,height*.3])),
  ];
  if(part.nameZh==='支板结合件')return [
    box([length,width,Math.max(7,height*.16)],'paintedMetal'),
    box([length*.74,Math.max(8,width*.2),height],'darkMetal',[length*.08,-width*.38,-height*.42]),
    ...[-length*.35,length*.25].map(x=>({type:'torus',radius:Math.max(4,width*.09),tube:Math.max(1,width*.025),position:[x,0,height*.12],material:'metal'})),
  ];
  return [
    box([length,width,Math.max(9,height*.2)],'paintedMetal'),
    box([Math.max(18,width*.34),width,height],'darkMetal',[-length*.45,0,-height*.42]),
    ...Array.from({length:Math.min(8,Math.max(3,Math.round(length/260)))},(_,i)=>box([Math.max(6,length*.012),width*.92,height*.64],'metal',[-length*.3+i*length*.62/Math.max(1,Math.round(length/260)),0,height*.18])),
  ];
}

function guardRail(){return [
  {type:'tube',points:[[-300,-275,0],[-390,-210,0],[-430,-110,0],[-430,0,0],[-430,110,0],[-390,210,0],[-300,275,0],[310,275,0]],radius:13,material:'paintedMetal'},
  {type:'tube',points:[[-300,-210,0],[-350,-155,0],[-375,-75,0],[-375,75,0],[-350,155,0],[-300,210,0],[310,210,0]],radius:10,material:'paintedMetal'},
  ...[-230,-50,130].map(x=>box([16,65,550],'darkMetal',[x,0,0],[PI/2,0,0])),
]}

function pipe(part){
  const n=numbers(part.dimensions);
  if(part.nameZh==='钢管结合件'){
    const length=Math.max(...n,600),span=n.find(value=>value<length&&value>80)||105;
    return [{type:'tube',points:[[-length/2,span/2,0],[length*.32,span/2,0],[length*.45,span*.28,0],[length*.48,-span/2,0]],radius:Math.max(7,span*.1),material:'metal'}];
  }
  const diameter=n[0]||25,length=n[1]||500;
  if(part.nameZh==='轴管'||part.nameZh==='轴衬'||part.nameZh==='轴套')return [annulus(diameter,Math.max(8,diameter*.62),length,'metal')];
  return [cylinder(diameter/2,length,'metal')];
}

function ladder(){return [
  box([2980,26,32],'paintedMetal',[0,-210,0]),box([2980,26,32],'paintedMetal',[0,210,0]),
  ...Array.from({length:12},(_,i)=>box([24,420,24],'darkMetal',[-1360+i*2720/11,0,0])),
]}

function pedal(part){
  const n=numbers(part.dimensions),height=n[0]||1000,width=n[1]||490,depth=n[n.length-1]||50;
  const lower=part.code.endsWith('0652')?Math.min(width,n[2]||490):width*.62;
  return [
    box([height,width,Math.max(5,depth*.12)],'paintedMetal'),
    box([height,Math.max(12,width*.04),depth],'darkMetal',[0,-width*.47,-depth*.45]),
    box([height,Math.max(12,width*.04),depth],'darkMetal',[0,width*.47,-depth*.45]),
    box([height*.43,Math.max(12,width*.05),depth*1.05],'metal',[height*.24,-width*.18,depth*.28]),
    box([height*.28,lower*.06,depth*.9],'metal',[-height*.3,width*.2,depth*.2]),
  ];
}

function uChannel(part){const n=numbers(part.dimensions),length=n[0]||417,height=n[1]||80,width=n[2]||58,t=6;return [box([length,width,t]),box([length,t,height],'darkMetal',[0,-width/2+t/2,height/2]),box([length,t,height],'darkMetal',[0,width/2-t/2,height/2])]}
function bendPlate(part){const n=numbers(part.dimensions),height=n[0]||105,width=n[1]||44,depth=n[2]||25;return [box([depth,width,Math.max(4,depth*.16)]),box([Math.max(5,depth*.18),width,height],'darkMetal',[-depth*.42,0,height*.45]),box([depth*.65,width,Math.max(4,depth*.16)],'paintedMetal',[depth*.62,0,height*.9])]}
function fanSeat(part){const n=numbers(part.dimensions),length=n[0]||600,width=n[1]||320,height=n[2]||88;return [extrude(length,width,10,[hole(-length*.4,-width*.35,7),hole(length*.4,-width*.35,7),hole(-length*.4,width*.35,7),hole(length*.4,width*.35,7)]),box([length*.9,18,height],'darkMetal',[0,-width*.32,-height*.42]),box([length*.9,18,height],'darkMetal',[0,width*.32,-height*.42]),box([20,width*.72,height*.8],'metal',[0,0,-height*.34])]}
function smallConsole(part){const n=numbers(part.dimensions),h=n[0]||70,w=n[1]||40,d=n[2]||25;return [extrude(w,h,d,[hole(0,-h*.25,3.5),hole(0,h*.25,3.5)],'paintedMetal'),box([d,w,h*.7],'darkMetal',[w*.45,0,0],[0,PI/2,0])]}

function duct(part){const n=numbers(part.dimensions),length=n[0]||1000,width=n[1]||710,height=n[2]||255;return [
  box([length,width,8],'paintedMetal',[0,0,height/2]),
  box([length,8,height],'paintedMetal',[0,-width/2,height/4]),box([length,8,height],'paintedMetal',[0,width/2,height/4]),
  box([length*.92,width*.75,8],'darkMetal',[0,0,-height/4]),
  ...[-length*.38,0,length*.38].map(x=>box([18,width*.96,height*.82],'metal',[x,0,height*.1])),
]}

function windowModel(part){const n=numbers(part.dimensions),width=n[0]||376,height=n[1]||223,frame=Math.max(14,Math.min(width,height)*.08);return [
  extrude(width,height,frame,[{kind:'polygon',points:rectangle(width-frame*2.3,height-frame*2.3)}],'paintedMetal'),
  box([width-frame*2.5,height-frame*2.5,5],'glass',[0,0,frame*.56]),
  cylinder(frame*.22,frame*1.4,'darkMetal',[width*.38,0,frame],'y'),
]}

function plate(part){
  const n=numbers(part.dimensions),width=n[0]||500,height=n[1]||220,depth=n[2]||Math.max(6,Math.min(width,height)*.04);
  if(part.nameZh==='网眼板'){
    const holes=[];for(let r=0;r<5;r++)for(let c=0;c<8;c++)holes.push(hole((c-3.5)*width/9,(r-2)*height/6,Math.max(4,Math.min(width,height)*.018)));
    return [extrude(width,height,Math.max(8,depth*.12),holes,'paintedMetal'),box([width,16,Math.max(18,depth*.2)],'darkMetal',[0,-height*.47,-8]),box([width,16,Math.max(18,depth*.2)],'darkMetal',[0,height*.47,-8])];
  }
  if(part.nameZh==='活门结合件')return [box([height,width,8]),cylinder(9,height,'darkMetal',[0,width*.48,0]),{type:'tube',points:[[-height*.45,-width*.42,12],[height*.35,-width*.42,12],[height*.45,-width*.36,12]],radius:6,material:'metal'}];
  if(part.nameZh==='盖板结合件')return [box([width,height,7]),box([width*.46,height,7],'paintedMetal',[width*.28,0,55],[0,-.35,0]),box([width*.18,height,7],'darkMetal',[width*.45,0,105])];
  if(part.code.endsWith('0801')||part.code.endsWith('0802'))return [box([width,height,8]),box([width*.28,height,8],'paintedMetal',[width*.36,0,55],[0,-.42,0]),box([width*.08,height,8],'darkMetal',[width*.49,0,105])];
  return [extrude(width,height,Math.max(6,depth*.12),[hole(-width*.38,-height*.36,5),hole(width*.38,-height*.36,5),hole(-width*.38,height*.36,5),hole(width*.38,height*.36,5)],'paintedMetal'),box([width*.92,14,Math.max(18,depth*.2)],'darkMetal',[0,-height*.46,-8]),box([width*.92,14,Math.max(18,depth*.2)],'darkMetal',[0,height*.46,-8])];
}

function rod(part){const n=numbers(part.dimensions),length=n[0]||165,width=n[1]||30,thickness=n[2]||8;return [box([length,width*.42,thickness],'metal'),{type:'torus',radius:width*.48,tube:Math.max(3,width*.14),position:[length*.46,0,0],material:'darkMetal'},{type:'torus',radius:width*.22,tube:Math.max(2,width*.1),position:[-length*.46,0,0],material:'darkMetal'}]}
function coupling(part){const n=numbers(part.dimensions),length=n[0]||50,width=n[1]||20;return [box([length,width,width],'metal'),cylinder(width*.28,width*1.3,'darkMetal',[length*.25,0,0],'z'),box([length*.55,width*.42,width*.45],'darkMetal',[-length*.22,0,0])]}
function screw(part){const n=numbers(part.dimensions),diameter=n[0]||20,length=n[1]||26;return [cylinder(diameter*.28,length,'metal'),{type:'lathe',points:[[0,-diameter*.2],[diameter*.42,-diameter*.2],[diameter*.5,0],[diameter*.34,diameter*.26],[0,diameter*.26]],rotation:[0,0,PI/2],position:[-length*.52,0,0],material:'darkMetal'},...Array.from({length:7},(_,i)=>({type:'torus',radius:diameter*.29,tube:Math.max(.55,diameter*.045),position:[-length*.15+i*length*.1,0,0],rotation:[0,PI/2,0],material:'metal'}))]}
function bearingSeat(part){const n=numbers(part.dimensions),height=n[0]||99,width=n[1]||32,outer=height*.54,inner=height*.3;return [extrude(height*.72,height,width,[hole(0,0,inner/2),hole(0,-height*.38,4),hole(0,height*.38,4)],'paintedMetal'),annulus(outer,inner,width*1.18,'darkMetal')]}
function seal(part){const n=numbers(part.dimensions),width=n[0]||10,thickness=n[1]||3,length=n.find((value,index)=>index>1&&value>width)||180;return [box([Math.min(length,800),width,thickness],'rubber'),box([Math.min(length,800),width*.28,Math.max(1,thickness*.3)],'darkMetal',[0,0,thickness*.58])]}
function bearing(){return [annulus(72,25,30,'darkMetal'),{type:'torus',radius:24,tube:7,rotation:[0,PI/2,0],material:'metal'},...Array.from({length:10},(_,i)=>{const a=PI*2*i/10;return {type:'cylinder',radius:4.5,length:8,axis:'x',position:[0,Math.cos(a)*25,Math.sin(a)*25],material:'metal'}})]}
function shaft(part){
  const n=numbers(part.dimensions),diameter=n[0]||25;
  const length=part.pdfPage===23&&part.code.startsWith('TF2314')?600:(n[1]||660);
  return [cylinder(diameter/2,length,'metal'),cylinder(diameter*.4,Math.max(16,diameter),'darkMetal',[-length*.5,0,0]),box([length*.22,diameter*.18,diameter*.15],'darkMetal',[length*.3,diameter*.46,0])];
}

function choose(part){
  if(part.nameZh.startsWith('U槽支撑')||/支架结合件|支板结合件/.test(part.nameZh))return {material:'paintedMetal',primitives:structural(part),note:'按厂家外形尺寸建立支撑型材、折边和加强节点；未标孔距只按原格比例示意。'};
  if(part.nameZh==='护栏结合件')return {material:'paintedMetal',primitives:guardRail(part),note:'按厂家R209.5、550×579外形语义建立U形护栏及内档。'};
  if(part.nameZh==='钢管结合件'||/钢管|过气管|轴管|轴衬|轴套/.test(part.nameZh))return {material:'metal',primitives:pipe(part),note:'按厂家直径/外形与长度建立管轴件；结合件弯折半径按原格比例估算。'};
  if(part.nameZh==='扶梯结合件')return {material:'paintedMetal',primitives:ladder(part),note:'按厂家2980×420建立双立杆和十二道梯横；横档数量与截面按原格比例识别。'};
  if(part.nameZh==='踏板')return {material:'paintedMetal',primitives:pedal(part),note:'按厂家踏板外形尺寸建立板面、边缘折边和加强条；孔位不作制造依据。'};
  if(part.nameZh==='U槽')return {material:'paintedMetal',primitives:uChannel(part),note:'按厂家417×80×58建立U型槽三面截面，壁厚由原格截面比例估算。'};
  if(part.nameZh==='弯板')return {material:'paintedMetal',primitives:bendPlate(part),note:'按厂家105×44×25建立多折边弯板，折弯圆角为预览估算。'};
  if(part.nameZh==='风机座')return {material:'paintedMetal',primitives:fanSeat(part),note:'按厂家600×320×88建立风机座板、两侧折边和中部加强筋。'};
  if(part.nameZh==='小托架')return {material:'paintedMetal',primitives:smallConsole(part),note:'按厂家70×40×25建立小托架与两个安装孔。'};
  if(part.nameZh==='配棉道结合件')return {material:'paintedMetal',primitives:duct(part),note:'按厂家1000×710×255建立配棉道壳体、端板和三道加强档。'};
  if(part.nameZh==='视窗结合件'||part.nameZh==='窗')return {material:'glass',primitives:windowModel(part),note:'按厂家外框尺寸建立金属窗框、透明窗板与铰链语义。'};
  if(/上板结合件|下板结合件|封板|网眼板|活门结合件|盖板结合件/.test(part.nameZh))return {material:'paintedMetal',primitives:plate(part),note:'按厂家外形尺寸建立板件、折边与开口；网眼板的孔径孔距仅规则化示意。'};
  if(part.nameZh==='连杆结合件')return {material:'metal',primitives:rod(part),note:'按厂家165×30×8建立连杆、大小环孔与端部轮毂。'};
  if(part.nameZh==='接头')return {material:'metal',primitives:coupling(part),note:'按厂家50×20建立开口接头、横向销孔与圆角端。'};
  if(part.nameZh==='螺钉')return {material:'metal',primitives:screw(part),note:'按厂家φ20×26建立头部、杆部与螺纹语义；螺距不作制造依据。'};
  if(part.nameZh==='轴承座')return {material:'paintedMetal',primitives:bearingSeat(part),note:'按厂家99×32建立双耳法兰、中心轴承孔与止口。'};
  if(part.nameZh==='密封条')return {material:'rubber',primitives:seal(part),note:'按厂家截面和单段长度建立黑色橡胶密封条；80dm项以短样段预览，不按80米展开。'};
  if(part.nameZh==='滚动轴承')return {material:'metal',primitives:bearing(part),note:'按厂家φ25轴孔与UEL205轴承语义建立内外圈和滚动体；未标外径为识别级估算。'};
  if(part.nameZh==='轴')return {material:'metal',primitives:shaft(part),note:part.pdfPage===23?'厂家件号写φ25×660而本页图示φ25×600；预览按本页图示600建立，source同时保留冲突原值。':'按厂家φ25×660建立轴体、端部台阶与键槽语义。'};
  return {material:'paintedMetal',primitives:structural(part),note:'按厂家原格轮廓与明确尺寸建立识别级结构件。'};
}

export function createJwf1026P19P25Spec(part){
  const model=choose(part),dimensions=Array.isArray(part.dimensions)?part.dimensions:[];
  return {level:dimensions.length?'尺寸级':'轮廓级',material:model.material,source:{page:part.pdfPage,item:part.item,code:part.code,recordKey:part.recordKey,nameZh:part.nameZh,quantity:part.quantity,dimensions,views:[`第${part.pdfPage}页厂家原格`],assumptions:[model.note,dimensions.length?'厂家明确尺寸直接用于主轮廓；未标的孔距、壁厚、圆角、焊缝和连接细节不作制造依据。':'厂家未标几何尺寸；本模型仅按原格轮廓建立识别级外形。']},primitives:model.primitives};
}
