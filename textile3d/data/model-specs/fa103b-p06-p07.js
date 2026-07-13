// FA103B 厂家PDF第5—7页：第6页44项、第7页22项的独立3D规格。
// 厂家未标尺寸的零件只做轮廓级可视化；标准件、密封条规格和dm长度按厂家原格建立。

import {fa103bP06P07Verified} from '../fa103b-p06-p07-verified.js';

const PI=Math.PI;
const rect=(width,height)=>[[-width/2,-height/2],[width/2,-height/2],[width/2,height/2],[-width/2,height/2]];
const circlePoints=(radius,count=48)=>Array.from({length:count},(_,i)=>{const a=PI*2*i/count;return [Math.cos(a)*radius,Math.sin(a)*radius]});
const hexPoints=across=>{const r=across/Math.sqrt(3);return Array.from({length:6},(_,i)=>{const a=PI/6+PI*2*i/6;return [Math.cos(a)*r,Math.sin(a)*r]})};

const partsByItem=new Map(fa103bP06P07Verified.map(part=>[part.item,part]));
const countsByPage=new Map();
for(const part of fa103bP06P07Verified){
  const counts=countsByPage.get(part.page)||new Map();
  const codeKey=part.code===null?'__NULL__':part.code;
  counts.set(codeKey,(counts.get(codeKey)||0)+1);countsByPage.set(part.page,counts);
}
const keyFor=item=>{
  const part=partsByItem.get(item),codeKey=part.code===null?'__NULL__':part.code;
  return !part.code||countsByPage.get(part.page).get(codeKey)>1?part.recordKey:part.code;
};
const source=(item,assumptions)=>{
  const part=partsByItem.get(item);
  return {page:part.page,item,code:part.code,recordKey:part.recordKey,nameZh:part.name,
    quantity:{value:part.quantity,unit:part.quantityUnit,meaning:part.quantityMeaning},
    specification:part.specification,dimensions:part.dims,remark:part.remark,
    sourceCrop:part.sourceCrop,sourceVector:part.sourceVector,
    views:['第5页机架部件爆炸总图标号'+item,'第'+part.page+'页厂家明细原格'],assumptions};
};
const spec=(item,{level='轮廓级',material='paintedMetal',primitives,assumptions})=>({level,material,source:source(item,assumptions),primitives});
const contourNote='厂家未给该单件工程尺寸；图元数值只表达第5页爆炸图可见轮廓和结构层级，不得用于加工、孔位或尺寸申报。';

function panel(item,width,height,variant='plain'){
  const holes=[];
  if(variant==='window')holes.push({kind:'polygon',points:rect(width*.5,height*.36)});
  if(variant==='round')holes.push({kind:'circle',center:[0,0],radius:Math.min(width,height)*.24});
  const primitives=[{type:'extrude',points:rect(width,height),depth:10,holes,bevel:1},
    {type:'box',size:[width,20,46],position:[0,-height/2+10,-18],material:'darkMetal'},
    {type:'box',size:[width,20,46],position:[0,height/2-10,-18],material:'darkMetal'}];
  if(variant==='vent')for(let i=-3;i<=3;i++)primitives.push({type:'box',size:[width*.44,10,20],position:[0,-height*.18+i*24,8],material:'darkMetal'});
  return spec(item,{assumptions:[contourNote,'按标号'+item+'建立'+({plain:'完整板面',window:'带开口板面',round:'带圆形让位孔板面',vent:'带通风孔板面'}[variant])+'及上下折边。'],primitives});
}

function brace(item,length,width,height,variant=0){
  const primitives=[
    {type:'box',size:[length,width,10],position:[0,0,-height/2+5]},
    {type:'box',size:[length,10,height],position:[0,-width/2+5,0],material:'darkMetal'},
    {type:'box',size:[length,10,height],position:[0,width/2-5,0],material:'darkMetal'},
    {type:'box',size:[24,width+26,height+18],position:[-length/2+12,0,0],material:'metal'},
    {type:'box',size:[24,width+26,height+18],position:[length/2-12,0,0],material:'metal'},
  ];
  if(variant===1)primitives.push({type:'box',size:[length*.35,width*.7,18],position:[length*.16,0,height*.34],material:'metal'});
  if(variant===2)primitives.push({type:'box',size:[length*.68,18,height*.7],rotation:[0,.18,0],material:'metal'});
  return spec(item,{assumptions:[contourNote,'同名撑挡按厂家件号和爆炸位置独立建立，端板、折边和加强结构不共享。'],primitives});
}

function door(item,width,height,variant='solid',mirror=1){
  const primitives=[
    {type:'box',size:[width,height,12]},
    {type:'box',size:[width,28,42],position:[0,-height/2+14,-15],material:'darkMetal'},
    {type:'box',size:[width,28,42],position:[0,height/2-14,-15],material:'darkMetal'},
    {type:'box',size:[28,height,42],position:[-width/2+14,0,-15],material:'darkMetal'},
    {type:'box',size:[28,height,42],position:[width/2-14,0,-15],material:'darkMetal'},
    {type:'tube',points:[[mirror*width*.2,-35,20],[mirror*width*.25,-35,52],[mirror*width*.25,35,52],[mirror*width*.2,35,20]],radius:9,material:'darkMetal'},
  ];
  if(variant==='vent')for(let i=-3;i<=3;i++)primitives.push({type:'box',size:[width*.4,10,20],position:[0,-height*.28+i*23,8],material:'darkMetal'});
  if(variant==='window')primitives.push({type:'box',size:[width*.48,height*.32,16],position:[0,height*.12,6],material:'glass'},{type:'torus',radius:Math.min(width,height)*.17,tube:11,position:[0,height*.12,16],material:'darkMetal'});
  return spec(item,{assumptions:[contourNote,'按标号'+item+'建立'+({solid:'实心门板',vent:'带通风区门板',window:'带观察区门板'}[variant])+'、边框和拉手；同名门结合件保持独立。'],primitives});
}

function frameSide(item,mirror){
  return spec(item,{material:'darkMetal',assumptions:[contourNote,'按第5页左右机架结合件的箱体立边、圆形风道孔、下部检修孔和安装座语义建立；左右件独立。'],primitives:[
    {type:'extrude',points:rect(600,1180),depth:52,holes:[{kind:'circle',center:[mirror*95,240],radius:150},{kind:'circle',center:[mirror*-90,-310],radius:82}],bevel:2},
    {type:'box',size:[72,1180,100],position:[mirror*-265,0,-22],material:'darkMetal'},
    {type:'box',size:[600,68,100],position:[0,556,-22],material:'darkMetal'},
    {type:'box',size:[600,68,100],position:[0,-556,-22],material:'darkMetal'},
    {type:'box',size:[180,120,120],position:[mirror*165,-470,0],material:'metal'},
  ]});
}

function duct(item,width,height,length,elbow=false){
  const primitives=elbow?[
    {type:'box',size:[width,length*.56,height]},
    {type:'box',size:[length*.46,width,height],position:[length*.18,-length*.22,0],rotation:[0,0,-.32]},
    {type:'box',size:[width+50,24,height+50],position:[0,length*.28,0],material:'darkMetal'},
    {type:'box',size:[24,width+50,height+50],position:[length*.4,-length*.3,0],rotation:[0,0,-.32],material:'darkMetal'},
  ]:[
    {type:'box',size:[width,length,height]},
    {type:'box',size:[width+50,24,height+50],position:[0,-length/2,0],material:'darkMetal'},
    {type:'box',size:[width+50,24,height+50],position:[0,length/2,0],material:'darkMetal'},
  ];
  return spec(item,{assumptions:[contourNote,'按标号'+item+'建立'+(elbow?'弯管及两端法兰':'排杂管及两端法兰')+'轮廓；内壁、板厚和接口尺寸未标。'],primitives});
}

function slopedPlate(item,mirror=1){
  return spec(item,{assumptions:[contourNote,'按标号'+item+'建立排杂斜板、前折边和两侧安装耳；同名斜板按件号独立。'],primitives:[
    {type:'extrude',points:[[-480,-210],[420,-210],[480,145],[-450,210]],depth:12,bevel:1},
    {type:'box',size:[960,24,70],position:[0,-195,-30],material:'darkMetal'},
    {type:'box',size:[70,430,42],position:[mirror*445,0,-18],material:'darkMetal'},
  ]});
}

function windowFrame(item,width,height){
  return spec(item,{material:'darkMetal',assumptions:[contourNote,'按标号'+item+'建立棉箱窗边框、透明窗面和底部安装边。'],primitives:[
    {type:'extrude',points:rect(width,height),depth:28,holes:[{kind:'polygon',points:rect(width*.64,height*.55)}],bevel:2,material:'darkMetal'},
    {type:'box',size:[width*.63,height*.54,8],material:'glass'},
    {type:'box',size:[width+45,24,40],position:[0,-height/2-12,0],material:'metal'},
  ]});
}

function lock(item,variant){
  const lever=variant?190:145;
  return spec(item,{material:'darkMetal',assumptions:[contourNote,'按标号'+item+'建立门锁座、转轴、手柄和锁舌；两种门锁件号独立。'],primitives:[
    {type:'extrude',points:rect(120,84),depth:22,holes:[{kind:'circle',center:[0,0],radius:13}],bevel:4,material:'darkMetal'},
    {type:'cylinder',radius:14,length:58,axis:'z',material:'metal'},
    {type:'box',size:[lever,24,20],position:[(variant?-1:1)*lever*.34,0,28],rotation:[0,0,variant?-.22:.18],material:'metal'},
    {type:'box',size:[86,18,26],position:[-38,0,-28],rotation:[0,0,.42],material:'darkMetal'},
  ]});
}

function hinge(item,length,width,knuckles){
  const primitives=[{type:'box',size:[width,length,8],position:[-width*.28,0,0]},{type:'box',size:[width,length,8],position:[width*.28,0,0]},{type:'cylinder',radius:width*.13,length:length+22,axis:'y',material:'darkMetal'}];
  for(let i=0;i<knuckles;i++)primitives.push({type:'cylinder',radius:width*.19,length:length/knuckles*.72,axis:'y',position:[0,-length/2+(i+.5)*length/knuckles,0],material:i%2?'metal':'darkMetal'});
  return spec(item,{material:'darkMetal',assumptions:[contourNote,'按厂家件号建立双页、销轴和'+knuckles+'段铰节；同名铰链保持独立。'],primitives});
}

function loopStrip(item,length,width,thickness,exactCrossSection=false){
  const spanX=length*.3,spanY=length*.2;
  return spec(item,{level:'尺寸级',material:'rubber',assumptions:[
    '密封条展开长度'+length+'来自'+(partsByItem.get(item).quantityUnit==='dm'?'厂家数量栏dm换算':'厂家件号长度编码')+'。',
    exactCrossSection?'截面'+width+'X'+thickness+'来自厂家备注栏。':'厂家未给截面尺寸，预览截面仅作橡胶条语义。',
    '为便于预览，柔性条按总长度分配成矩形闭合摆放；摆放形状不是厂家装配轨迹。',
  ],primitives:[
    {type:'box',size:[spanX,width,thickness],position:[0,-spanY/2,0],material:'rubber'},
    {type:'box',size:[spanX,width,thickness],position:[0,spanY/2,0],material:'rubber'},
    {type:'box',size:[width,spanY,thickness],position:[-spanX/2,0,0],material:'rubber'},
    {type:'box',size:[width,spanY,thickness],position:[spanX/2,0,0],material:'rubber'},
  ]});
}

function hexBolt(item,diameter,length,standard='GB5783'){
  const across=diameter*1.7,headHeight=diameter*.65;
  return spec(item,{level:'尺寸级',material:'metal',assumptions:['厂家名称栏明确规格M'+diameter+'X'+length+'；公称直径和杆长按原格建立。',standard+'头部比例仅作标准件视觉识别；螺距、公差和头部实测尺寸未列。'],primitives:[
    {type:'cylinder',radius:diameter/2,length,axis:'z',material:'metal'},
    {type:'cylinder',radius:across/Math.sqrt(3),length:headHeight,axis:'z',segments:6,position:[0,0,-(length+headHeight)/2],material:'darkMetal'},
    {type:'torus',radius:diameter*.46,tube:Math.max(.18,diameter*.035),position:[0,0,length*.28],material:'darkMetal'},
  ]});
}

function socketScrew(item,diameter,length,standard='GB70'){
  const headD=diameter*1.6,headH=diameter;
  return spec(item,{level:'尺寸级',material:'darkMetal',assumptions:['厂家名称栏明确规格M'+diameter+'X'+length+'。',standard+'头部与槽口只按标准类别语义表达；头部实测尺寸、螺距和公差未列。'],primitives:[
    {type:'cylinder',radius:diameter/2,length,axis:'z',material:'metal'},
    {type:'extrude',points:circlePoints(headD/2),depth:headH,position:[0,0,-(length+headH)/2],holes:[{kind:'polygon',points:hexPoints(diameter*.8)}],bevel:.25,material:'darkMetal'},
  ]});
}

function panScrew(item,diameter,length){
  return spec(item,{level:'尺寸级',material:'metal',assumptions:['厂家名称栏明确规格M'+diameter+'X'+length+'。','GB835头部只作标准件语义；头部实测尺寸、槽型和公差未列。'],primitives:[
    {type:'cylinder',radius:diameter/2,length,axis:'z'},
    {type:'lathe',points:[[0,-diameter*.4],[diameter*.8,-diameter*.34],[diameter*1.05,0],[diameter*.78,diameter*.38],[0,diameter*.46]],position:[0,0,-(length+diameter*.8)/2],material:'darkMetal'},
  ]});
}

function nut(item,diameter,standard,nylon=false){
  const across=diameter*1.7,height=diameter*.8;
  return spec(item,{level:'尺寸级',material:'darkMetal',assumptions:['厂家名称栏明确公称规格M'+diameter+'。',standard+'外形比例只用于标准件视觉识别；螺距、公差和外廓实测尺寸未列。'],primitives:[
    {type:'extrude',points:hexPoints(across),depth:height,holes:[{kind:'circle',center:[0,0],radius:diameter/2}],bevel:.35,material:'darkMetal'},
    ...(nylon?[{type:'torus',radius:diameter*.58,tube:Math.max(.4,diameter*.1),position:[0,0,height/2],material:'plastic'}]:[]),
  ]});
}

function flatWasher(item,nominal,outer,thickness,standard){
  return spec(item,{level:'尺寸级',material:'metal',assumptions:['厂家名称栏明确垫圈公称规格'+nominal+'。','外径'+outer+'、厚'+thickness+'按'+standard+'常用规格作视觉表达；厂家页未列公差。'],primitives:[
    {type:'extrude',points:circlePoints(outer/2),depth:thickness,holes:[{kind:'circle',center:[0,0],radius:nominal/2}],bevel:.1,material:'metal'},
  ]});
}

function splitWasher(item,nominal,standard){
  const pathR=nominal*.8,wireR=Math.max(.45,nominal*.14);
  const points=Array.from({length:42},(_,i)=>{const t=i/41,a=.16+t*PI*1.84;return [Math.cos(a)*pathR,Math.sin(a)*pathR,(t-.5)*wireR*1.5]});
  return spec(item,{level:'尺寸级',material:'darkMetal',assumptions:['厂家名称栏明确垫圈公称规格'+nominal+'。',standard+'开口环外形只按标准类别语义表达；截面、公差和实测外径未列。'],primitives:[{type:'tube',points,radius:wireR,radialSegments:12,material:'darkMetal'}]});
}

const page6ByItem={
  1:brace(1,1420,76,65,0),
  2:door(2,650,1080,'vent',-1),
  3:door(3,620,980,'solid',1),
  4:brace(4,1180,82,72,1),
  5:frameSide(5,-1),
  6:frameSide(6,1),
  7:door(7,700,940,'solid',-1),
  8:door(8,670,1040,'vent',1),
  9:door(9,760,590,'window',-1),
  10:spec(10,{assumptions:[contourNote,'按标号10建立大顶板、四周折边和顶部检修开口。'],primitives:[
    {type:'extrude',points:rect(1500,840),depth:12,holes:[{kind:'polygon',points:rect(390,220).map(point=>[point[0]+300,point[1]+120])}],bevel:1},
    {type:'box',size:[1500,28,64],position:[0,-406,-27],material:'darkMetal'},{type:'box',size:[1500,28,64],position:[0,406,-27],material:'darkMetal'},
  ]}),
  11:spec(11,{assumptions:[contourNote,'按标号11建立导流槽斜面、两侧立边和端部连接板。'],primitives:[
    {type:'extrude',points:[[-600,-230],[510,-230],[600,160],[-520,230]],depth:12,bevel:1},
    {type:'box',size:[1200,24,86],position:[0,-218,-36],material:'darkMetal'},{type:'box',size:[980,24,72],position:[30,210,-30],material:'darkMetal'},
  ]}),
  13:brace(13,980,72,82,2),
  14:panel(14,880,300,'window'),
  15:panel(15,1020,270,'round'),
  16:duct(16,220,190,700,false),
  17:duct(17,250,210,820,false),
  18:duct(18,230,200,680,true),
  19:duct(19,200,180,620,false),
  20:door(20,680,1120,'solid',1),
  21:slopedPlate(21,-1),
  26:brace(26,1300,74,64,0),
  27:brace(27,1120,68,78,1),
  28:brace(28,940,82,62,2),
  30:slopedPlate(30,1),
  31:windowFrame(31,470,350),
  32:panel(32,650,430,'plain'),
  33:panel(33,520,260,'round'),
  34:spec(34,{material:'darkMetal',assumptions:[contourNote,'按标号34建立电机座底板、两条滑槽和双侧立耳。'],primitives:[
    {type:'extrude',points:rect(520,360),depth:24,holes:[{kind:'polygon',points:rect(160,28).map(p=>[p[0]-120,p[1]])},{kind:'polygon',points:rect(160,28).map(p=>[p[0]+120,p[1]])}],bevel:2,material:'darkMetal'},
    {type:'box',size:[42,360,160],position:[-220,0,68],material:'metal'},{type:'box',size:[42,360,160],position:[220,0,68],material:'metal'},
  ]}),
  35:spec(35,{assumptions:[contourNote,'按标号35建立行程开关底座的L形折板、触发面和安装孔。'],primitives:[
    {type:'extrude',points:rect(240,170),depth:12,holes:[{kind:'circle',center:[-65,25],radius:10}],bevel:1},
    {type:'box',size:[240,30,100],position:[0,-70,-46],material:'darkMetal'},
  ]}),
  36:panel(36,260,180,'plain'),
  37:lock(37,0),
  38:lock(38,1),
  39:spec(39,{material:'darkMetal',assumptions:[contourNote,'按标号39建立U形拉手、两端安装座和穿门柱。'],primitives:[
    {type:'tube',points:[[-145,0,0],[-145,0,52],[-90,0,102],[90,0,102],[145,0,52],[145,0,0]],radius:15,material:'darkMetal'},
    {type:'cylinder',radius:28,length:16,axis:'z',position:[-145,0,0],material:'metal'},{type:'cylinder',radius:28,length:16,axis:'z',position:[145,0,0],material:'metal'},
  ]}),
  40:hinge(40,280,88,5),
  41:hinge(41,180,72,3),
  42:hinge(42,320,82,6),
  43:loopStrip(43,3050,18,8,false),
  44:loopStrip(44,4720,20,8,false),
  45:spec(45,{material:'darkMetal',assumptions:[contourNote,'厂家只给TF2058底座件号和名称；按标号45建立矩形安装座、竖耳和中心孔语义。'],primitives:[
    {type:'extrude',points:rect(220,150),depth:24,holes:[{kind:'circle',center:[0,0],radius:26}],bevel:3,material:'darkMetal'},
    {type:'box',size:[38,150,130],position:[-82,0,55],material:'metal'},{type:'box',size:[38,150,130],position:[82,0,55],material:'metal'},
  ]}),
  46:hexBolt(46,6,20,'GB14'),
  47:hexBolt(47,16,45,'GB14'),
  48:hexBolt(48,6,12),
  49:hexBolt(49,6,16),
  50:hexBolt(50,6,20),
};

const page7ByItem={
  51:hexBolt(51,6,25),52:hexBolt(52,10,20),53:hexBolt(53,10,30),54:hexBolt(54,16,100),
  55:socketScrew(55,4,12),56:socketScrew(56,6,10),57:panScrew(57,6,12),
  58:nut(58,8,'GB62'),59:nut(59,4,'GB889',true),60:nut(60,6,'GB889',true),61:nut(61,6,'GB6170'),62:nut(62,16,'GB6170'),
  63:flatWasher(63,4,12,1.6,'GB96'),64:flatWasher(64,6,18,2,'GB96'),65:flatWasher(65,8,24,2,'GB96'),
  66:flatWasher(66,4,9,.8,'GB97.1'),67:flatWasher(67,6,12,1.6,'GB97.1'),68:flatWasher(68,10,20,2,'GB97.1'),69:flatWasher(69,16,30,3,'GB97.1'),
  70:splitWasher(70,6,'GB859'),
  71:loopStrip(71,1300,10,3,true),
  72:loopStrip(72,7400,19,3,true),
};

const toKeyed=defs=>Object.fromEntries(Object.entries(defs).map(([item,value])=>[keyFor(Number(item)),value]));
export const fa103bP06ModelSpecs=toKeyed(page6ByItem);
export const fa103bP07ModelSpecs=toKeyed(page7ByItem);
export const fa103bP06P07ModelSpecs={...fa103bP06ModelSpecs,...fa103bP07ModelSpecs};

