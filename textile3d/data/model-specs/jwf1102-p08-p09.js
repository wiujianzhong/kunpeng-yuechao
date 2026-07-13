// JWF1102 厂家PDF第6—9页：第8页50项、第9页40项的独立3D规格。
// 厂家未标尺寸的零件只做轮廓级可视化；图元数值仅表达相对比例，不作为工程尺寸。
// 标准件和名称/件号中明确的规格按厂家原格建立，其他尺寸不反推、不补造。

import {jwf1102P08P09Verified} from '../jwf1102-p08-p09-verified.js';

const PI=Math.PI;
const rect=(width,height)=>[
  [-width/2,-height/2],[width/2,-height/2],[width/2,height/2],[-width/2,height/2],
];
const circlePoints=(radius,count=48)=>Array.from({length:count},(_,index)=>{
  const angle=PI*2*index/count;
  return [Number((Math.cos(angle)*radius).toFixed(4)),Number((Math.sin(angle)*radius).toFixed(4))];
});
const hexPoints=across=>{
  const radius=across/Math.sqrt(3);
  return Array.from({length:6},(_,index)=>{
    const angle=PI/6+PI*2*index/6;
    return [Number((Math.cos(angle)*radius).toFixed(4)),Number((Math.sin(angle)*radius).toFixed(4))];
  });
};

const partsByItem=new Map(jwf1102P08P09Verified.map(part=>[part.item,part]));
const codeCountsByPage=new Map();
for(const part of jwf1102P08P09Verified){
  const pageCounts=codeCountsByPage.get(part.page)||new Map();
  pageCounts.set(part.code,(pageCounts.get(part.code)||0)+1);
  codeCountsByPage.set(part.page,pageCounts);
}
const keyFor=item=>{
  const part=partsByItem.get(item);
  return codeCountsByPage.get(part.page).get(part.code)>1?part.recordKey:part.code;
};

const page7Only=new Set([10,18,19,20,23,24,25,26,27,34,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,53,55,88]);
const bothAssemblyPages=new Set([59,71,79,81]);
const sourceViews=item=>{
  const part=partsByItem.get(item);
  if(item===89)return ['第9页厂家明细原格；第6—7页未确认到独立清晰标号'];
  const drawingViews=bothAssemblyPages.has(item)
    ?['第6页机架部件爆炸总图标号'+item,'第7页机架部件爆炸总图标号'+item]
    :['第'+(page7Only.has(item)?7:6)+'页机架部件爆炸总图标号'+item];
  return [...drawingViews,'第'+part.page+'页厂家明细原格'];
};
const source=(item,assumptions)=> {
  const part=partsByItem.get(item);
  return {
    page:part.page,item,code:part.code,recordKey:part.recordKey,nameZh:part.name,
    quantity:{value:part.quantity,unit:part.quantityUnit,meaning:part.quantityMeaning},
    specification:part.specification,dimensions:part.dims,remark:part.remark,
    sourceCrop:part.sourceCrop,sourceVector:part.sourceVector,
    views:sourceViews(item),assumptions,
  };
};
const spec=(item,{level='轮廓级',material='paintedMetal',primitives,assumptions})=>({
  level,material,source:source(item,assumptions),primitives,
});
const contourNote='厂家没有给出该单件的工程尺寸；图元数值只用于保持爆炸图可见轮廓和结构层级，不得作为毫米尺寸、孔位或加工依据。';

function panel(item,width,height,variant='plain'){
  const holes=[];
  if(variant==='window')holes.push({kind:'polygon',points:rect(width*.46,height*.34)});
  if(variant==='round')holes.push({kind:'circle',center:[0,0],radius:Math.min(width,height)*.22});
  const primitives=[
    {type:'extrude',points:rect(width,height),depth:10,holes,bevel:1,material:'paintedMetal'},
    {type:'box',size:[width,18,34],position:[0,-height/2+9,-17],material:'darkMetal'},
    {type:'box',size:[width,18,34],position:[0,height/2-9,-17],material:'darkMetal'},
  ];
  if(variant==='slots'){
    primitives.push(
      {type:'box',size:[width*.22,height*.08,18],position:[-width*.24,0,0],material:'darkMetal'},
      {type:'box',size:[width*.22,height*.08,18],position:[width*.24,0,0],material:'darkMetal'},
    );
  }
  return spec(item,{
    assumptions:[
      contourNote,
      '按第'+(page7Only.has(item)?7:6)+'页标号'+item+'的板面、折边和'+({plain:'完整板面',window:'中央开口',round:'圆形让位孔',slots:'双长槽'}[variant])+'语义建立。',
    ],
    primitives,
  });
}

function brace(item,length,width,height,variant=0){
  const primitives=[
    {type:'box',size:[length,width,10],position:[0,0,-height/2+5]},
    {type:'box',size:[length,10,height],position:[0,-width/2+5,0],material:'darkMetal'},
    {type:'box',size:[length,10,height],position:[0,width/2-5,0],material:'darkMetal'},
    {type:'box',size:[22,width+30,height+18],position:[-length/2+11,0,0],material:'metal'},
    {type:'box',size:[22,width+30,height+18],position:[length/2-11,0,0],material:'metal'},
  ];
  if(variant===1)primitives.push({type:'box',size:[length*.36,width*.72,18],position:[length*.14,0,height*.35],material:'metal'});
  if(variant===2)primitives.push(
    {type:'box',size:[length*.46,18,height*.8],position:[-length*.2,0,0],rotation:[0,.22,0],material:'metal'},
    {type:'box',size:[length*.46,18,height*.8],position:[length*.2,0,0],rotation:[0,-.22,0],material:'metal'},
  );
  return spec(item,{
    assumptions:[contourNote,'按标号'+item+'建立独立长撑挡；同名撑挡因件号和爆炸位置不同，不共享长度、端板或加强结构。'],
    primitives,
  });
}

function frameSide(item,mirror){
  const x=mirror*250;
  return spec(item,{
    material:'darkMetal',
    assumptions:[
      contourNote,
      '按第6页左右机架板的大圆形风道孔、下部检修孔、周边立边和安装孔语义建立；左右件互为可见镜像但件号独立。',
    ],
    primitives:[
      {type:'extrude',points:rect(560,1100),depth:48,holes:[
        {kind:'circle',center:[0,250],radius:170},
        {kind:'circle',center:[mirror*90,-300],radius:105},
        {kind:'polygon',points:rect(170,120).map(point=>[point[0]+mirror*95,point[1]-465])},
      ],bevel:2,material:'paintedMetal'},
      {type:'box',size:[70,1100,90],position:[mirror*-245,0,-20],material:'darkMetal'},
      {type:'box',size:[560,60,90],position:[0,520,-20],material:'darkMetal'},
      {type:'box',size:[560,60,90],position:[0,-520,-20],material:'darkMetal'},
      {type:'cylinder',radius:18,length:80,axis:'z',position:[x*.7,440,0],material:'metal'},
      {type:'cylinder',radius:18,length:80,axis:'z',position:[x*.7,-440,0],material:'metal'},
    ],
  });
}

function door(item,width,height,variant='solid',mirror=1){
  const primitives=[
    {type:'box',size:[width,height,12],material:'paintedMetal'},
    {type:'box',size:[width,28,42],position:[0,-height/2+14,-15],material:'darkMetal'},
    {type:'box',size:[width,28,42],position:[0,height/2-14,-15],material:'darkMetal'},
    {type:'box',size:[28,height,42],position:[-width/2+14,0,-15],material:'darkMetal'},
    {type:'box',size:[28,height,42],position:[width/2-14,0,-15],material:'darkMetal'},
    {type:'tube',points:[[mirror*width*.18,-40,25],[mirror*width*.24,-40,55],[mirror*width*.24,40,55],[mirror*width*.18,40,25]],radius:9,material:'darkMetal'},
  ];
  if(variant==='vent')for(let i=-3;i<=3;i++)primitives.push({type:'box',size:[width*.45,10,20],position:[0,-height*.25+i*24,8],material:'darkMetal'});
  if(variant==='window')primitives.push(
    {type:'box',size:[width*.52,height*.34,18],position:[0,height*.14,8],material:'glass'},
    {type:'torus',radius:Math.min(width,height)*.18,tube:12,position:[0,height*.14,18],material:'darkMetal'},
  );
  if(variant==='chute')primitives.push(
    {type:'box',size:[width*.68,height*.26,80],position:[0,-height*.22,34],rotation:[.18,0,0],material:'darkMetal'},
    {type:'box',size:[width*.24,height*.14,100],position:[width*.22,-height*.36,48],material:'metal'},
  );
  return spec(item,{
    assumptions:[
      contourNote,
      '按第'+(page7Only.has(item)?7:6)+'页标号'+item+'建立'+({solid:'实心门板',vent:'带通风孔门板',window:'带观察区门板',chute:'带排杂导板门板'}[variant])+'；同名门结合件按厂家件号和recordKey独立建模。',
    ],
    primitives,
  });
}

function bentCover(item,mirror){
  return spec(item,{
    assumptions:[contourNote,'按第6页标号'+item+'建立斜面排杂罩板、前折边和侧封板；左右件按件号独立，不合并。'],
    primitives:[
      {type:'extrude',points:[[-450,-190],[390,-190],[450,-80],[450,190],[-450,190]],depth:12,bevel:1},
      {type:'box',size:[900,25,70],position:[0,-178,-30],material:'darkMetal'},
      {type:'box',size:[24,380,80],position:[mirror*438,0,-32],material:'darkMetal'},
      {type:'box',size:[340,18,55],position:[mirror*-180,145,-28],material:'metal'},
    ],
  });
}

function windowFrame(item,width,height,round=false){
  const hole=round
    ?[{kind:'circle',center:[0,0],radius:Math.min(width,height)*.32}]
    :[{kind:'polygon',points:rect(width*.65,height*.58)}];
  return spec(item,{
    material:'darkMetal',
    assumptions:[contourNote,'按爆炸图标号'+item+'建立独立窗框、透明窗面和安装边；透明件只表达可见窗口语义。'],
    primitives:[
      {type:'extrude',points:rect(width,height),depth:28,holes:hole,bevel:2,material:'darkMetal'},
      ...(round
        ?[{type:'cylinder',radius:Math.min(width,height)*.32,length:8,axis:'z',material:'glass'}]
        :[{type:'box',size:[width*.64,height*.57,8],material:'glass'}]),
      {type:'box',size:[width+50,24,40],position:[0,-height/2-12,0],material:'metal'},
    ],
  });
}

function duct(item,width,height,length,elbow=false){
  const primitives=elbow
    ?[
      {type:'box',size:[width,length*.58,height],position:[0,length*.2,0]},
      {type:'box',size:[length*.48,width,height],position:[length*.18,-length*.08,0],rotation:[0,0,-.25]},
      {type:'box',size:[width+50,24,height+50],position:[0,length*.49,0],material:'darkMetal'},
      {type:'box',size:[24,width+50,height+50],position:[length*.42,-length*.16,0],rotation:[0,0,-.25],material:'darkMetal'},
    ]
    :[
      {type:'box',size:[width,length,height]},
      {type:'box',size:[width+55,24,height+55],position:[0,-length/2,0],material:'darkMetal'},
      {type:'box',size:[width+55,24,height+55],position:[0,length/2,0],material:'darkMetal'},
    ];
  return spec(item,{
    assumptions:[contourNote,'按第6页标号'+item+'建立'+(elbow?'转折风管与两端法兰':'方管与两端法兰')+'的轮廓；内壁、板厚和接口尺寸未在厂家页标明。'],
    primitives,
  });
}

function adjustmentPlate(item,width,height,mirror,slotOffset){
  return spec(item,{
    assumptions:[contourNote,'按第7页标号'+item+'建立带长槽的调节补风板；四块板件按不同件号、方向和槽位分别建模。'],
    primitives:[
      {type:'extrude',points:rect(width,height),depth:10,holes:[
        {kind:'polygon',points:rect(width*.42,height*.22).map(point=>[point[0]+slotOffset,point[1]])},
      ],bevel:1},
      {type:'box',size:[24,height,44],position:[mirror*(width/2-12),0,-18],material:'darkMetal'},
      {type:'cylinder',radius:9,length:24,axis:'z',position:[mirror*-width*.34,height*.3,0],material:'metal'},
    ],
  });
}

function lockDevice(item,variant){
  const leverLength=variant===0?150:variant===1?190:125;
  return spec(item,{
    material:'darkMetal',
    assumptions:[contourNote,'按第7页标号'+item+'建立门锁座、转轴、手柄和背部锁舌；三种门锁件号与手柄比例保持独立。'],
    primitives:[
      {type:'extrude',points:rect(120,82),depth:22,holes:[{kind:'circle',center:[0,0],radius:13}],bevel:4,material:'darkMetal'},
      {type:'cylinder',radius:14,length:58,axis:'z',material:'metal'},
      {type:'box',size:[leverLength,24,20],position:[mirrorValue(variant)*leverLength*.34,0,28],rotation:[0,0,(variant-1)*.22],material:'metal'},
      {type:'box',size:[90,18,26],position:[-40,0,-28],rotation:[0,0,.45],material:'darkMetal'},
    ],
  });
}
const mirrorValue=variant=>variant===1?-1:1;

function hinge(item,length,width,knuckles){
  const primitives=[
    {type:'box',size:[width,length,8],position:[-width*.28,0,0],material:'paintedMetal'},
    {type:'box',size:[width,length,8],position:[width*.28,0,0],material:'paintedMetal'},
    {type:'cylinder',radius:width*.13,length:length+24,axis:'y',material:'darkMetal'},
  ];
  for(let i=0;i<knuckles;i++){
    const y=-length/2+(i+.5)*length/knuckles;
    primitives.push({type:'cylinder',radius:width*.19,length:length/knuckles*.74,axis:'y',position:[0,y,0],material:i%2?'metal':'darkMetal'});
  }
  return spec(item,{
    material:'darkMetal',
    assumptions:[contourNote,'按厂家件号和第7页标号'+item+'建立双页、销轴与'+knuckles+'段铰节；同名铰链按recordKey独立。'],
    primitives,
  });
}

function loopedStripPrimitives(length,width,thickness){
  const spanX=length*.3,spanY=length*.2;
  return [
    {type:'box',size:[spanX,width,thickness],position:[0,-spanY/2,0],material:'rubber'},
    {type:'box',size:[spanX,width,thickness],position:[0,spanY/2,0],material:'rubber'},
    {type:'box',size:[width,spanY,thickness],position:[-spanX/2,0,0],material:'rubber'},
    {type:'box',size:[width,spanY,thickness],position:[spanX/2,0,0],material:'rubber'},
  ];
}

function seal(item,length,width=18,thickness=8){
  return spec(item,{
    level:'尺寸级',material:'rubber',
    assumptions:[
      '厂家件号明确长度编码'+length+'，模型长度据此建立。',
      '名称栏仅写密封条，截面形状和材质牌号未标；截面仅作可见橡胶条语义，不作为加工尺寸。',
      '为避免长柔性条在预览中缩成一条细线，按总长度分配成矩形闭合摆放；摆放形状不是厂家装配轨迹。',
    ],
    primitives:loopedStripPrimitives(length,width,thickness),
  });
}

function exactStrip(item,length,width,thickness,note){
  return spec(item,{
    level:'尺寸级',material:'rubber',
    assumptions:[
      note,
      '厂家未给材料牌号、倒角和公差；模型只使用原格明确的长度/截面规格。',
      '为便于预览，将柔性条按总长度分配成矩形闭合摆放；摆放形状不是厂家装配轨迹。',
    ],
    primitives:loopedStripPrimitives(length,width,thickness),
  });
}

function hexBolt(item,diameter,length,standard='GB5783'){
  const across=diameter*1.7,headHeight=diameter*.65;
  return spec(item,{
    level:'尺寸级',material:'metal',
    assumptions:[
      '厂家名称栏明确规格M'+diameter+'X'+length+'；公称直径和杆长按原格建立。',
      standard+'头部比例只用于标准件视觉识别；厂家本页未列螺距、公差和头部实测尺寸。',
    ],
    primitives:[
      {type:'cylinder',radius:diameter/2,length,axis:'z',material:'metal'},
      {type:'cylinder',radius:across/Math.sqrt(3),length:headHeight,axis:'z',segments:6,position:[0,0,-(length+headHeight)/2],material:'darkMetal'},
      {type:'torus',radius:diameter*.46,tube:Math.max(.18,diameter*.035),position:[0,0,length*.28],material:'darkMetal'},
    ],
  });
}

function socketScrew(item,diameter,length){
  const headDiameter=diameter*1.6,headHeight=diameter;
  return spec(item,{
    level:'尺寸级',material:'darkMetal',
    assumptions:[
      '厂家名称栏明确规格M'+diameter+'X'+length+'；公称直径和杆长按原格建立。',
      'GB70圆柱头和内六角仅按标准类别语义表达；厂家本页未列头部实测尺寸、螺距和公差。',
    ],
    primitives:[
      {type:'cylinder',radius:diameter/2,length,axis:'z',material:'metal'},
      {type:'extrude',points:circlePoints(headDiameter/2),depth:headHeight,position:[0,0,-(length+headHeight)/2],holes:[{kind:'polygon',points:hexPoints(diameter*.8)}],bevel:.3,material:'darkMetal'},
      {type:'torus',radius:diameter*.46,tube:Math.max(.15,diameter*.03),position:[0,0,length*.25],material:'darkMetal'},
    ],
  });
}

function nut(item,diameter,standard,nylon=false){
  const across=diameter*1.7,height=diameter*.8;
  return spec(item,{
    level:'尺寸级',material:'darkMetal',
    assumptions:[
      '厂家名称栏明确公称规格M'+diameter+'。',
      standard+'外形比例只用于标准件视觉识别；厂家本页未列螺距、公差和外廓实测尺寸。',
    ],
    primitives:[
      {type:'extrude',points:hexPoints(across),depth:height,holes:[{kind:'circle',center:[0,0],radius:diameter/2}],bevel:.35,material:'darkMetal'},
      ...(nylon?[{type:'torus',radius:diameter*.58,tube:Math.max(.4,diameter*.1),position:[0,0,height/2],material:'plastic'}]:[]),
    ],
  });
}

function splitWasher(item,nominal,standard){
  const pathRadius=nominal*.8,wireRadius=Math.max(.45,nominal*.14);
  const points=Array.from({length:42},(_,index)=>{
    const t=index/41,angle=.16+t*PI*1.84;
    return [Math.cos(angle)*pathRadius,Math.sin(angle)*pathRadius,(t-.5)*wireRadius*1.5];
  });
  return spec(item,{
    level:'尺寸级',material:'darkMetal',
    assumptions:['厂家名称栏明确垫圈公称规格'+nominal+'。',standard+'开口环外形只按标准类别语义表达；厂家本页未列截面、公差和实测外径。'],
    primitives:[{type:'tube',points,radius:wireRadius,radialSegments:12,material:'darkMetal'}],
  });
}

function flatWasher(item,nominal,outer,thickness,standard){
  return spec(item,{
    level:'尺寸级',material:'metal',
    assumptions:['厂家名称栏明确垫圈公称规格'+nominal+'。','外径'+outer+'、厚'+thickness+'按'+standard+'常用规格作视觉表达；厂家本页未列公差。'],
    primitives:[{type:'extrude',points:circlePoints(outer/2),depth:thickness,holes:[{kind:'circle',center:[0,0],radius:nominal/2}],bevel:.1,material:'metal'}],
  });
}

function pin(item,diameter,length){
  return spec(item,{
    level:'尺寸级',material:'metal',
    assumptions:['厂家名称栏明确销规格'+diameter+'X'+length+'，直径和长度据此建立。','端部倒角、表面处理和公差未标，不作加工级表达。'],
    primitives:[
      {type:'cylinder',radius:diameter/2,length,axis:'z',material:'metal'},
      {type:'torus',radius:diameter*.4,tube:diameter*.08,position:[0,0,length*.42],material:'darkMetal'},
    ],
  });
}

function rivet(item,diameter,length){
  return spec(item,{
    level:'尺寸级',material:'metal',
    assumptions:['厂家名称栏明确铆钉规格'+diameter+'X'+length+'，杆径和杆长据此建立。','铆钉头部只作标准件视觉识别；头部实测尺寸与公差未标。'],
    primitives:[
      {type:'cylinder',radius:diameter/2,length,axis:'z',material:'metal'},
      {type:'lathe',points:[[0,-diameter*.55],[diameter*.72,-diameter*.48],[diameter,-diameter*.18],[diameter*.82,diameter*.14],[0,diameter*.18]],position:[0,0,-(length+diameter*.7)/2],material:'darkMetal'},
    ],
  });
}

const page8ByItem={
  1:panel(1,980,260,'slots'),
  2:spec(2,{assumptions:[contourNote,'按第6页标号2建立带竖板、底板和双安装耳的托脚（一）。'],primitives:[
    {type:'box',size:[95,420,70],material:'darkMetal'},{type:'box',size:[260,130,24],position:[0,-185,-45]},{type:'box',size:[170,24,220],position:[0,-145,65]},{type:'cylinder',radius:12,length:28,axis:'z',position:[70,-185,-45],material:'metal'},
  ]}),
  3:spec(3,{assumptions:[contourNote,'按第6页标号3建立较短竖板、外伸底板和斜撑组成的托脚（二），与项目2独立。'],primitives:[
    {type:'box',size:[110,310,68],material:'darkMetal'},{type:'box',size:[300,145,24],position:[55,-145,-45]},{type:'box',size:[28,230,190],position:[-40,-60,55],rotation:[0,0,-.22]},{type:'cylinder',radius:12,length:28,axis:'z',position:[130,-145,-45],material:'metal'},
  ]}),
  4:panel(4,1120,210,'slots'),
  5:duct(5,230,220,720,true),
  6:panel(6,920,300,'window'),
  7:panel(7,1220,170,'plain'),
  8:panel(8,1040,150,'round'),
  9:brace(9,1380,80,70,1),
  10:door(10,680,1140,'solid',-1),
  11:brace(11,1080,65,80,2),
  12:frameSide(12,-1),
  13:frameSide(13,1),
  14:brace(14,1480,72,62,0),
  15:brace(15,930,92,58,1),
  16:bentCover(16,-1),
  17:bentCover(17,1),
  18:spec(18,{assumptions:[contourNote,'按第7页标号18建立大顶板、四周折边和顶部检修开口。'],primitives:[
    {type:'extrude',points:rect(1480,820),depth:12,holes:[{kind:'polygon',points:rect(380,220).map(point=>[point[0]+280,point[1]+120])}],bevel:1},
    {type:'box',size:[1480,28,60],position:[0,-396,-26],material:'darkMetal'},{type:'box',size:[1480,28,60],position:[0,396,-26],material:'darkMetal'},
  ]}),
  19:spec(19,{assumptions:[contourNote,'按第7页标号19建立上部梯形导流罩、前后折边和侧挡板。'],primitives:[
    {type:'extrude',points:[[-560,-260],[460,-260],[560,180],[-440,260]],depth:12,bevel:1},
    {type:'box',size:[1120,22,85],position:[0,-248,-35],material:'darkMetal'},{type:'box',size:[900,22,70],position:[40,232,-28],material:'darkMetal'},
  ]}),
  20:windowFrame(20,520,360,false),
  21:duct(21,210,190,650,false),
  22:duct(22,250,230,920,false),
  23:door(23,720,520,'window',1),
  24:door(24,640,1080,'solid',-1),
  25:door(25,620,1050,'vent',1),
  26:door(26,720,980,'vent',-1),
  27:door(27,760,610,'chute',1),
  28:windowFrame(28,460,340,false),
  29:windowFrame(29,360,360,true),
  30:panel(30,720,520,'plain'),
  31:spec(31,{assumptions:[contourNote,'按第6页标号31建立行程开关底板的L形折板、长槽和安装孔。'],primitives:[
    {type:'extrude',points:rect(250,180),depth:12,holes:[{kind:'polygon',points:rect(90,28).map(point=>[point[0]+35,point[1]])}],bevel:1},
    {type:'box',size:[250,32,95],position:[0,-74,-45],material:'darkMetal'},{type:'cylinder',radius:9,length:18,axis:'z',position:[-80,50,0],material:'metal'},
  ]}),
  32:spec(32,{assumptions:[contourNote,'按第6页标号32建立长条门挡边、折角和两端安装孔；数量2表达单件模型。'],primitives:[
    {type:'box',size:[820,46,24]},{type:'box',size:[820,18,70],position:[0,-14,30],material:'darkMetal'},{type:'cylinder',radius:9,length:28,axis:'z',position:[-365,0,0],material:'metal'},{type:'cylinder',radius:9,length:28,axis:'z',position:[365,0,0],material:'metal'},
  ]}),
  33:spec(33,{material:'metal',assumptions:[contourNote,'厂家仅给自制件号和名称“螺栓”，未给M规格；只建立低细节螺栓语义，不声明直径或长度。'],primitives:[
    {type:'cylinder',radius:8,length:54,axis:'z',material:'metal'},{type:'cylinder',radius:15,length:8,axis:'z',segments:6,position:[0,0,-31],material:'darkMetal'},
  ]}),
  34:spec(34,{assumptions:[contourNote,'按第7页标号34建立门开关挡板的短折板、触发舌和安装孔。'],primitives:[
    {type:'extrude',points:rect(190,130),depth:12,holes:[{kind:'circle',center:[-55,0],radius:10}],bevel:1},
    {type:'box',size:[95,28,85],position:[55,-48,34],rotation:[0,0,.12],material:'darkMetal'},
  ]}),
  35:panel(35,560,420,'plain'),
  36:adjustmentPlate(36,460,210,-1,-50),
  37:adjustmentPlate(37,520,230,1,55),
  38:adjustmentPlate(38,430,250,-1,35),
  39:adjustmentPlate(39,570,200,1,-70),
  40:lockDevice(40,0),
  41:lockDevice(41,1),
  42:lockDevice(42,2),
  43:spec(43,{material:'darkMetal',assumptions:[contourNote,'按第7页标号43建立U形拉手、两端座和穿门紧固柱。'],primitives:[
    {type:'tube',points:[[-145,0,0],[-145,0,55],[-90,0,105],[90,0,105],[145,0,55],[145,0,0]],radius:15,material:'darkMetal'},
    {type:'cylinder',radius:28,length:16,axis:'z',position:[-145,0,0],material:'metal'},{type:'cylinder',radius:28,length:16,axis:'z',position:[145,0,0],material:'metal'},
  ]}),
  44:hinge(44,260,90,5),
  45:hinge(45,190,74,3),
  46:hinge(46,320,82,6),
  47:seal(47,3406),
  48:seal(48,4498,20,8),
  49:seal(49,5150,18,9),
  50:seal(50,5614,22,8),
};

const gb97Dimensions={
  4:[9,0.8],6:[12,1.6],8:[16,1.6],10:[20,2],12:[24,2.5],
};
const page9ByItem={
  51:exactStrip(51,1420,3,1.5,'厂家件号明确规格1.5X3X1420，模型按厚1.5、宽3、长1420建立。'),
  52:exactStrip(52,1420,7,6,'厂家件号明确规格6X7X1420，模型按截面6X7、长1420建立。'),
  53:seal(53,3150,16,9),
  54:exactStrip(54,1600,19,3,'厂家件号明确规格19X3X1600，模型按宽19、厚3、长1600建立。'),
  55:spec(55,{material:'darkMetal',assumptions:[contourNote,'厂家只给TF2058底座件号和名称；按第7页标号55建立矩形安装座、竖耳和中心孔语义。'],primitives:[
    {type:'extrude',points:rect(220,150),depth:24,holes:[{kind:'circle',center:[0,0],radius:26}],bevel:3,material:'darkMetal'},
    {type:'box',size:[38,150,130],position:[-82,0,55],material:'metal'},{type:'box',size:[38,150,130],position:[82,0,55],material:'metal'},
  ]}),
  56:hexBolt(56,6,20,'GB14'),
  57:hexBolt(57,6,12),
  58:hexBolt(58,6,16),
  59:hexBolt(59,6,20),
  60:hexBolt(60,6,25),
  61:hexBolt(61,8,25),
  62:hexBolt(62,10,20),
  63:hexBolt(63,10,35),
  64:hexBolt(64,12,45),
  65:socketScrew(65,4,12),
  66:socketScrew(66,6,12),
  67:socketScrew(67,10,30),
  68:nut(68,6,'GB62',false),
  69:nut(69,4,'GB889',true),
  70:nut(70,6,'GB889',true),
  71:nut(71,6,'GB6170',false),
  72:nut(72,10,'GB6170',false),
  73:nut(73,12,'GB6170',false),
  74:splitWasher(74,6,'GB93'),
  75:splitWasher(75,8,'GB93'),
  76:splitWasher(76,10,'GB93'),
  77:splitWasher(77,12,'GB93'),
  78:flatWasher(78,4,12,1.6,'GB96'),
  79:flatWasher(79,6,18,2,'GB96'),
  80:flatWasher(80,4,...gb97Dimensions[4],'GB97.1'),
  81:flatWasher(81,6,...gb97Dimensions[6],'GB97.1'),
  82:flatWasher(82,8,...gb97Dimensions[8],'GB97.1'),
  83:flatWasher(83,10,...gb97Dimensions[10],'GB97.1'),
  84:flatWasher(84,12,...gb97Dimensions[12],'GB97.1'),
  85:splitWasher(85,6,'GB859'),
  86:pin(86,6,16),
  87:rivet(87,4,10),
  88:hinge(88,210,72,4),
  89:spec(89,{assumptions:[
    contourNote,
    '厂家第9页明确件号JWF1102-0100-17和名称“排杂斜板结合件”；第6—7页未确认到清晰独立标号，只按名称建立斜板、折边和安装耳语义。',
  ],primitives:[
    {type:'extrude',points:[[-520,-210],[440,-210],[520,150],[-470,210]],depth:12,bevel:1},
    {type:'box',size:[1040,24,72],position:[0,-195,-30],material:'darkMetal'},
    {type:'box',size:[80,470,45],position:[-480,0,-20],material:'darkMetal'},
    {type:'box',size:[80,420,45],position:[480,-15,-20],material:'darkMetal'},
  ]}),
  90:pin(90,6,16),
};

const toKeyed=definitions=>Object.fromEntries(
  Object.entries(definitions).map(([item,value])=>[keyFor(Number(item)),value]),
);

export const jwf1102P08ModelSpecs=toKeyed(page8ByItem);
export const jwf1102P09ModelSpecs=toKeyed(page9ByItem);
export const jwf1102P08P09ModelSpecs={
  ...jwf1102P08ModelSpecs,
  ...jwf1102P09ModelSpecs,
};
