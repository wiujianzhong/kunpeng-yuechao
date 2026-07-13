// JWF1124C-160 厂家PDF第19页爆炸图、第20页48项明细：逐件3D规格。
// 坐标单位为毫米；厂家未标出的外形尺寸只作视觉估算，并全部写入 assumptions。

const circlePoints=(radius,count=48)=>Array.from({length:count},(_,index)=>{
  const angle=Math.PI*2*index/count;
  return [Number((Math.cos(angle)*radius).toFixed(4)),Number((Math.sin(angle)*radius).toFixed(4))];
});

const hexPoints=radius=>Array.from({length:6},(_,index)=>{
  const angle=Math.PI/6+Math.PI*2*index/6;
  return [Number((Math.cos(angle)*radius).toFixed(4)),Number((Math.sin(angle)*radius).toFixed(4))];
});

const source=(item,code,dimensions,assumptions,views)=>({
  page:20,
  item,
  code,
  recordKey:`jwf1124c-p20-item-${String(item).padStart(2,'0')}`,
  dimensions,
  views:views||[`第19页爆炸图标号${item}`,'第20页厂家明细行'],
  assumptions,
});

function doorSpec(item,code,{width,height,depth,window=null,vents=0,handleSide='right',note}){
  const holes=[];
  if(window)holes.push({kind:'polygon',points:[[-window[0]/2,window[1][0]],[window[0]/2,window[1][0]],[window[0]/2,window[1][1]],[-window[0]/2,window[1][1]]]});
  const ventPrimitives=Array.from({length:vents},(_,index)=>({
    type:'box',size:[width*.46,10,depth+6],position:[0,-height*.27+index*22,4],material:'darkMetal',
  }));
  const handleX=handleSide==='right'?width*.4:-width*.4;
  return {
    level:'轮廓级',material:'paintedMetal',
    source:source(item,code,[],[
      `厂家未标外廓尺寸，门体约${width}×${height}×${depth}、框宽和孔位均按爆炸图比例估算`,
      note,
      '该门保持独立recordKey，不与其他门结合件合并；铰链、锁具和密封条作为独立零件未并入',
    ]),
    primitives:[
      {type:'extrude',points:[[-width/2,-height/2],[width/2,-height/2],[width/2,height/2],[-width/2,height/2]],depth,holes,bevel:3},
      {type:'box',size:[width,45,depth+22],position:[0,height/2-22.5,0],material:'darkMetal'},
      {type:'box',size:[width,45,depth+22],position:[0,-height/2+22.5,0],material:'darkMetal'},
      {type:'box',size:[45,height-90,depth+22],position:[-width/2+22.5,0,0],material:'darkMetal'},
      {type:'box',size:[45,height-90,depth+22],position:[width/2-22.5,0,0],material:'darkMetal'},
      {type:'cylinder',radius:18,length:depth+28,axis:'z',position:[handleX,-height*.06,0],material:'metal'},
      ...ventPrimitives,
    ],
  };
}

function hingeSpec(item,code,{leafLength,leafWidth,pinRadius,offset=0,note}){
  return {
    level:'轮廓级',material:'metal',
    source:source(item,code,[],[
      `厂家未标尺寸，单片约${leafLength}×${leafWidth}、销轴直径约${pinRadius*2}，均按爆炸图比例估算`,
      note,
      '该铰链保持独立recordKey，不与另外三种铰链合并；安装孔径和定位不作加工依据',
    ]),
    primitives:[
      {type:'extrude',points:[[-leafWidth,-leafLength/2],[0,-leafLength/2],[0,leafLength/2],[-leafWidth,leafLength/2]],depth:4,position:[offset,0,0],holes:[
        {kind:'circle',center:[-leafWidth*.55,-leafLength*.28],radius:4},{kind:'circle',center:[-leafWidth*.55,leafLength*.28],radius:4},
      ],bevel:.6},
      {type:'extrude',points:[[0,-leafLength/2],[leafWidth,-leafLength/2],[leafWidth,leafLength/2],[0,leafLength/2]],depth:4,position:[offset,0,0],holes:[
        {kind:'circle',center:[leafWidth*.55,-leafLength*.28],radius:4},{kind:'circle',center:[leafWidth*.55,leafLength*.28],radius:4},
      ],bevel:.6,material:'darkMetal'},
      {type:'cylinder',radius:pinRadius,length:leafLength+12,axis:'y',position:[offset,0,4],material:'metal'},
      {type:'cylinder',radius:pinRadius+3,length:8,axis:'y',position:[offset,-leafLength/2-6,4],material:'darkMetal'},
    ],
  };
}

function hexBolt(item,code,diameter,length,headAcross,headHeight){
  return {
    level:'尺寸级',material:'metal',
    source:source(item,code,[`M${diameter}X${length}`],[
      `螺纹公称直径M${diameter}和杆长${length}取自厂家明细`,
      `六角头对边${headAcross}、头高${headHeight}按GB5783常用比例表达；螺距和牙型未在本页标明`,
    ]),
    primitives:[
      {type:'cylinder',radius:diameter/2,length,axis:'z',material:'metal'},
      {type:'cylinder',radius:headAcross/Math.sqrt(3),length:headHeight,axis:'z',segments:6,position:[0,0,-(length+headHeight)/2],material:'darkMetal'},
      {type:'torus',radius:diameter*.46,tube:diameter*.035,position:[0,0,length*.32],material:'darkMetal'},
    ],
  };
}

function socketScrew(item,code,diameter,length,headDiameter,headHeight,socketAcross){
  return {
    level:'尺寸级',material:'darkMetal',
    source:source(item,code,[`M${diameter}X${length}`],[
      `螺纹公称直径M${diameter}和杆长${length}取自厂家明细`,
      `圆柱头直径${headDiameter}、头高${headHeight}和内六角${socketAcross}按常用比例表达；螺距未标`,
    ]),
    primitives:[
      {type:'cylinder',radius:diameter/2,length,axis:'z',material:'metal'},
      {type:'extrude',points:circlePoints(headDiameter/2),depth:headHeight,position:[0,0,-(length+headHeight)/2],holes:[{kind:'polygon',points:hexPoints(socketAcross/Math.sqrt(3))}],bevel:.2,material:'darkMetal'},
      {type:'torus',radius:diameter*.46,tube:diameter*.035,position:[0,0,length*.28],material:'darkMetal'},
    ],
  };
}

function hexNut(item,code,diameter,across,height,{nylon=false}={}){
  const primitives=[{
    type:'extrude',points:hexPoints(across/Math.sqrt(3)),depth:height,
    holes:[{kind:'circle',center:[0,0],radius:diameter/2}],bevel:.5,material:'darkMetal',
  }];
  if(nylon)primitives.push({type:'torus',radius:diameter*.62,tube:diameter*.15,position:[0,0,height/2],material:'plastic'});
  return {
    level:'尺寸级',material:'darkMetal',
    source:source(item,code,[`M${diameter}`],[
      `螺纹公称直径M${diameter}取自厂家明细`,
      `六角对边${across}和厚度${height}按相应螺母常用比例估算；螺纹牙型未建模${nylon?'，尼龙锁紧环按GB889语义表达':''}`,
    ]),
    primitives,
  };
}

function flatWasher(item,code,nominal,outerDiameter,thickness){
  return {
    level:'尺寸级',material:'metal',
    source:source(item,code,[String(nominal)],[
      `公称孔径${nominal}取自厂家明细`,
      `外径${outerDiameter}和厚度${thickness}按对应国标常用规格表达；厂家本页未列公差`,
    ]),
    primitives:[{type:'extrude',points:circlePoints(outerDiameter/2),depth:thickness,holes:[{kind:'circle',center:[0,0],radius:nominal/2}],bevel:.12,material:'metal'}],
  };
}

function springWasher(item,code,nominal,wireRadius,pathRadius){
  const points=Array.from({length:34},(_,index)=>{
    const t=index/33,angle=.12+t*Math.PI*1.78;
    return [Number((Math.cos(angle)*pathRadius).toFixed(4)),Number((Math.sin(angle)*pathRadius).toFixed(4)),Number(((t-.5)*wireRadius*1.4).toFixed(4))];
  });
  return {
    level:'尺寸级',material:'darkMetal',
    source:source(item,code,[String(nominal)],[
      `公称规格${nominal}取自厂家明细`,
      '开口外径、线径和翘高按弹簧垫圈常用比例估算；厂家本页未给公差',
    ]),
    primitives:[{type:'tube',points,radius:wireRadius,radialSegments:12,material:'darkMetal'}],
  };
}

export const jwf1124cP20ModelSpecs={
  'JWF1124-0600-2':doorSpec(1,'JWF1124-0600-2',{width:860,height:980,depth:28,window:[620,[-300,300]],vents:0,handleSide:'right',note:'门结合件（二）按右侧大框门表达，中央为大开口/面板，外框较厚'}),
  'JWF1124-0600-3':doorSpec(2,'JWF1124-0600-3',{width:760,height:940,depth:28,window:null,vents:5,handleSide:'left',note:'门结合件（三）按左下方门体表达，下部有多排通风孔，上部为实心面板'}),

  'JWF1124-0600-5B':{
    level:'轮廓级',material:'paintedMetal',
    source:source(3,'JWF1124-0600-5B',[],[
      '上罩板长1750、宽620、折边高140和板厚4均按爆炸图比例估算',
      '按图建立大面积顶板、双侧折边、前后加强边和气弹簧连接耳；密封条与紧固件不并入',
    ]),
    primitives:[
      {type:'box',size:[1750,4,620],position:[0,68,0]},
      {type:'box',size:[1750,140,4],position:[0,0,-308]},
      {type:'box',size:[1750,140,4],position:[0,0,308]},
      {type:'box',size:[4,140,620],position:[-873,0,0]},
      {type:'box',size:[4,140,620],position:[873,0,0]},
      {type:'box',size:[90,55,18],position:[-650,-78,250],material:'darkMetal'},
      {type:'box',size:[90,55,18],position:[650,-78,250],material:'darkMetal'},
    ],
  },

  'JWF1124-0600-12':{
    level:'轮廓级',material:'paintedMetal',
    source:source(4,'JWF1124-0600-12',[],[
      '撑挡长1600、截面70×55和板厚4均按爆炸图估算',
      '按图建立长帽形撑挡、双侧翻边和端部安装耳；与标号10的撑挡截面不同',
    ]),
    primitives:[
      {type:'box',size:[1600,4,70],position:[0,25,0]},
      {type:'box',size:[1600,55,4],position:[0,0,-33]},
      {type:'box',size:[1600,55,4],position:[0,0,33]},
      {type:'box',size:[12,75,100],position:[-794,0,0],material:'darkMetal'},
      {type:'box',size:[12,75,100],position:[794,0,0],material:'darkMetal'},
    ],
  },

  'JWF1124-0600-13A':{
    level:'轮廓级',material:'darkMetal',
    source:source(5,'JWF1124-0600-13A',[],[
      '气弹簧总长约620、缸筒直径38、活塞杆直径16和端头尺寸按爆炸图估算',
      '数量为2；模型表达单件伸展状态，行程和气压参数未标，不作工程选型依据',
    ]),
    primitives:[
      {type:'cylinder',radius:19,length:360,axis:'x',position:[-90,0,0],material:'darkMetal'},
      {type:'cylinder',radius:8,length:260,axis:'x',position:[220,0,0],material:'metal'},
      {type:'cylinder',radius:26,length:32,axis:'x',position:[-286,0,0],material:'metal'},
      {type:'cylinder',radius:20,length:30,axis:'x',position:[365,0,0],material:'metal'},
      {type:'torus',radius:13,tube:4,position:[-302,0,0],rotation:[0,1.5708,0],material:'darkMetal'},
      {type:'torus',radius:10,tube:3,position:[380,0,0],rotation:[0,1.5708,0],material:'darkMetal'},
    ],
  },

  'JWF1124C-180-0600-2A':doorSpec(6,'JWF1124C-180-0600-2A',{width:720,height:980,depth:30,window:null,vents:7,handleSide:'right',note:'该门按左侧带横向百叶和两个圆孔的机侧门表达，百叶位置偏下'}),
  'JWF1124C-180-0600-4A':doorSpec(7,'JWF1124C-180-0600-4A',{width:690,height:930,depth:30,window:[430,[-250,250]],vents:6,handleSide:'left',note:'该门按右上方带视窗框和下部百叶的门体表达，窗口与百叶分区独立'}),
  'FA109A-1100-5':doorSpec(8,'FA109A-1100-5',{width:680,height:860,depth:24,window:[500,[-270,260]],vents:0,handleSide:'right',note:'门结合件（五）按中下方较窄框门表达，边框左侧铰接、右侧设锁点'}),
  'FA109A-1100-6':doorSpec(9,'FA109A-1100-6',{width:820,height:900,depth:24,window:null,vents:0,handleSide:'left',note:'门结合件（六）按中下方宽实心门表达，顶部有独立加强边，门面无百叶'}),

  'CVT1-160-1100-9':{
    level:'轮廓级',material:'paintedMetal',
    source:source(10,'CVT1-160-1100-9',[],[
      '撑挡长1600、截面95×45和板厚4均按爆炸图估算',
      '数量为2；模型表达单件宽底浅槽撑挡，顶部双加强筋区别于标号4',
    ]),
    primitives:[
      {type:'box',size:[1600,4,95],position:[0,-20,0]},
      {type:'box',size:[1600,45,4],position:[0,0,-45.5]},
      {type:'box',size:[1600,45,4],position:[0,0,45.5]},
      {type:'box',size:[1600,12,12],position:[0,18,-22],material:'darkMetal'},
      {type:'box',size:[1600,12,12],position:[0,18,22],material:'darkMetal'},
    ],
  },

  'JWF1124-0601':{
    level:'轮廓级',material:'rubber',
    source:source(11,'JWF1124-0601',[],[
      '厂家只给名称和单台1件，未给截面或长度；展示长度1000、截面18×10均为视觉估算',
      '该密封条保持独立recordKey，不与另外三项密封条合并',
    ]),
    primitives:[
      {type:'box',size:[1000,18,10],material:'rubber'},
      {type:'box',size:[1000,6,18],position:[0,6,0],material:'rubber'},
    ],
  },

  'JWF1124-0602':{
    level:'轮廓级',material:'paintedMetal',
    source:source(12,'JWF1124-0602',[],[
      '盖板长1500、宽230、厚4和两端安装孔按爆炸图比例估算',
      '按图建立长条盖板、双侧折边和两端孔，不并入标号43垫圈或34螺钉',
    ]),
    primitives:[{
      type:'extrude',points:[[-750,-115],[750,-115],[750,115],[-750,115]],depth:4,holes:[
        {kind:'circle',center:[-710,0],radius:5},{kind:'circle',center:[710,0],radius:5},
      ],bevel:1,
    },
      {type:'box',size:[1500,26,16],position:[0,-102,-8],material:'darkMetal'},
    ],
  },

  'FA109-0803':{
    level:'轮廓级',material:'paintedMetal',
    source:source(13,'FA109-0803',[],[
      '托板外廓约210×150×55、板厚5和安装孔按爆炸图比例估算',
      '模型表达带竖边的小型L形托板，位于门框侧边，不与压片14合并',
    ]),
    primitives:[
      {type:'extrude',points:[[-105,-75],[105,-75],[105,75],[-105,75]],depth:5,holes:[{kind:'circle',center:[-70,0],radius:6},{kind:'circle',center:[70,0],radius:6}],bevel:1},
      {type:'box',size:[210,55,5],position:[0,72,-27.5]},
    ],
  },

  'FA109-0804':{
    level:'轮廓级',material:'darkMetal',
    source:source(14,'FA109-0804',[],[
      '压片长120、宽35、厚6和中心孔按爆炸图比例估算',
      '按图建立窄长压片和单孔，标号33螺钉作为独立标准件',
    ]),
    primitives:[{type:'extrude',points:[[-60,-17.5],[60,-17.5],[60,17.5],[-60,17.5]],depth:6,holes:[{kind:'circle',center:[0,0],radius:5}],bevel:1}],
  },

  'CVT1-1106':{
    level:'轮廓级',material:'glass',
    source:source(15,'CVT1-1106',[],[
      '视窗外框约210×160、玻璃厚5、压框宽18按爆炸图比例估算',
      '数量为6；模型表达单件透明视窗和金属压框，安装孔不作加工定位',
    ]),
    primitives:[
      {type:'box',size:[174,124,5],material:'glass'},
      {type:'box',size:[210,18,14],position:[0,71,0],material:'darkMetal'},
      {type:'box',size:[210,18,14],position:[0,-71,0],material:'darkMetal'},
      {type:'box',size:[18,124,14],position:[-96,0,0],material:'darkMetal'},
      {type:'box',size:[18,124,14],position:[96,0,0],material:'darkMetal'},
    ],
  },

  'TZH1073-II':{
    level:'轮廓级',material:'rubber',
    source:source(16,'TZH1073-II',[],[
      '厂家数量栏15m为单台长度用量，不是零件尺寸，因此source.dimensions保持空数组',
      '仅为独立预览使用1000展示长度；截面约15×8按图中门框密封条语义估算，不代表厂家截面',
      '该密封条保持独立recordKey，不与项目11、17、18合并',
    ]),
    primitives:[
      {type:'box',size:[1000,15,8],material:'rubber'},
      {type:'box',size:[1000,5,14],position:[0,5,0],material:'rubber'},
    ],
  },

  TZH1082:{
    level:'轮廓级',material:'rubber',
    source:source(17,'TZH1082',[],[
      '厂家数量栏7.5m为单台长度用量，不是零件尺寸，因此source.dimensions保持空数组',
      '仅为独立预览使用1000展示长度；截面约10×7按另一处门框密封条外观估算，不代表厂家截面',
      '该密封条保持独立recordKey，轮廓比TZH1073-II更窄，不共用模型',
    ]),
    primitives:[
      {type:'box',size:[1000,10,7],material:'rubber'},
      {type:'cylinder',radius:4,length:1000,axis:'x',position:[0,5,0],material:'rubber'},
    ],
  },

  'TZH1107-25X6.5X1600':{
    level:'尺寸级',material:'rubber',
    source:source(18,'TZH1107-25X6.5X1600',['25X6.5X1600'],[
      '截面25×6.5、长度1600全部取自厂家件号',
      '厂家未给截面倒角，按实心矩形橡胶条表达；保持独立recordKey',
    ]),
    primitives:[{type:'box',size:[1600,25,6.5],material:'rubber'}],
  },

  'TF24A-36-00':{
    level:'轮廓级',material:'darkMetal',
    source:source(19,'TF24A-36-00',[],[
      '门锁装置外廓约170×75×55、锁舌和安装孔按爆炸图比例估算',
      '数量为2；按较长卧式门锁表达，不与TF24A-40-00共用轮廓',
    ]),
    primitives:[
      {type:'box',size:[170,75,45],material:'darkMetal'},
      {type:'cylinder',radius:18,length:55,axis:'z',position:[-48,0,20],material:'metal'},
      {type:'box',size:[65,20,18],position:[110,0,0],material:'metal'},
      {type:'cylinder',radius:8,length:105,axis:'x',position:[0,45,0],material:'metal'},
    ],
  },

  'TF24A-40-00':{
    level:'轮廓级',material:'darkMetal',
    source:source(20,'TF24A-40-00',[],[
      '门锁装置外廓约125×85×62、旋钮和锁舌按爆炸图比例估算',
      '数量为4；按较短竖式旋转锁表达，与TF24A-36-00结构和比例独立',
    ]),
    primitives:[
      {type:'box',size:[125,85,52],material:'darkMetal'},
      {type:'cylinder',radius:24,length:65,axis:'z',position:[0,0,28],material:'metal'},
      {type:'box',size:[92,16,20],position:[55,0,-8],rotation:[0,0,.35],material:'metal'},
      {type:'box',size:[58,14,18],position:[0,52,0],material:'darkMetal'},
    ],
  },

  TF2058:{
    level:'轮廓级',material:'paintedMetal',
    source:source(21,'TF2058',[],[
      '底座约180×145×65、板厚8和孔位按爆炸图比例估算',
      '按门锁配套的折弯底座表达，中央开口和两侧安装耳仅作视觉近似',
    ]),
    primitives:[
      {type:'extrude',points:[[-90,-72.5],[90,-72.5],[90,72.5],[-90,72.5]],depth:8,holes:[{kind:'polygon',points:[[-42,-28],[42,-28],[42,28],[-42,28]]}],bevel:1},
      {type:'box',size:[35,65,70],position:[-72,0,-35],material:'darkMetal'},
      {type:'box',size:[35,65,70],position:[72,0,-35],material:'darkMetal'},
    ],
  },

  'TF2225-00':{
    level:'轮廓级',material:'darkMetal',
    source:source(22,'TF2225-00',[],[
      '门吸铁装置约100×55×45、磁块直径和安装孔按爆炸图比例估算',
      '数量为2；模型表达金属底座、圆形磁块和连接螺杆',
    ]),
    primitives:[
      {type:'box',size:[100,55,12],material:'metal'},
      {type:'cylinder',radius:22,length:28,axis:'z',position:[0,0,20],material:'darkMetal'},
      {type:'cylinder',radius:8,length:55,axis:'z',position:[0,0,-32],material:'metal'},
      {type:'cylinder',radius:5,length:15,axis:'z',position:[-36,0,0],material:'metal'},
      {type:'cylinder',radius:5,length:15,axis:'z',position:[36,0,0],material:'metal'},
    ],
  },

  'TF2227-00':{
    level:'轮廓级',material:'metal',
    source:source(23,'TF2227-00',[],[
      '拉手总长210、握持直径22、安装距165按爆炸图比例估算',
      '数量为2；模型表达U形金属拉手和双端安装座',
    ]),
    primitives:[
      {type:'tube',points:[[-82.5,0,0],[-82.5,0,55],[-55,0,80],[55,0,80],[82.5,0,55],[82.5,0,0]],radius:11,material:'metal'},
      {type:'cylinder',radius:20,length:12,axis:'z',position:[-82.5,0,-6],material:'darkMetal'},
      {type:'cylinder',radius:20,length:12,axis:'z',position:[82.5,0,-6],material:'darkMetal'},
    ],
  },

  'TF2233-00':hingeSpec(24,'TF2233-00',{leafLength:150,leafWidth:58,pinRadius:6,offset:0,note:'TF2233-00按长叶片、双孔和直销轴表达'}),
  'TF2236-00':hingeSpec(25,'TF2236-00',{leafLength:118,leafWidth:72,pinRadius:7,offset:4,note:'TF2236-00按较宽短叶片、较粗销轴和偏置卷边表达'}),
  'TF2237-00':hingeSpec(26,'TF2237-00',{leafLength:92,leafWidth:48,pinRadius:5,offset:-3,note:'TF2237-00按小型窄叶片、双孔和短销轴表达'}),
  'TF2238-00':hingeSpec(27,'TF2238-00',{leafLength:175,leafWidth:42,pinRadius:5.5,offset:7,note:'TF2238-00按细长叶片、偏置轴套和长销轴表达'}),

  TF2245:{
    level:'轮廓级',material:'metal',
    source:source(28,'TF2245',[],[
      '手柄销直径约12、长度75和端头尺寸按爆炸图比例估算，厂家未给明确规格',
      '按带头圆柱销和端部卡槽表达，不从图号反推尺寸',
    ]),
    primitives:[
      {type:'cylinder',radius:6,length:75,axis:'z',material:'metal'},
      {type:'cylinder',radius:12,length:6,axis:'z',position:[0,0,-40.5],material:'darkMetal'},
      {type:'torus',radius:5.4,tube:.6,position:[0,0,32],material:'darkMetal'},
    ],
  },

  'jwf1124c-p20-item-29':hexBolt(29,'GB5783',4,16,7,2.8),
  'jwf1124c-p20-item-30':hexBolt(30,'GB5783',8,10,13,5.3),
  'jwf1124c-p20-item-31':hexBolt(31,'GB5783',10,16,16,6.4),
  GB70:socketScrew(32,'GB70',8,16,13,8,6),

  GB819:{
    level:'尺寸级',material:'darkMetal',
    source:source(33,'GB819',['M4X20'],[
      '螺纹公称直径M4和长度20取自厂家明细',
      '按十字沉头螺钉表达，沉头直径8、头高2.4和十字槽按常用比例估算；螺距未标',
    ]),
    primitives:[
      {type:'cylinder',radius:2,length:20,axis:'z',material:'metal'},
      {type:'cylinder',radiusTop:4,radiusBottom:2,length:2.4,axis:'z',position:[0,0,-11.2],material:'darkMetal'},
      {type:'box',size:[5,.8,.8],position:[0,0,-12.5],material:'metal'},
      {type:'box',size:[.8,5,.8],position:[0,0,-12.5],material:'metal'},
    ],
  },

  GB818:{
    level:'尺寸级',material:'darkMetal',
    source:source(34,'GB818',['M6X12'],[
      '螺纹公称直径M6和长度12取自厂家明细',
      '按十字盘头螺钉表达，盘头直径12、头高4.5和十字槽按常用比例估算；螺距未标',
    ]),
    primitives:[
      {type:'cylinder',radius:3,length:12,axis:'z',material:'metal'},
      {type:'cylinder',radius:6,length:4.5,axis:'z',position:[0,0,-8.25],material:'darkMetal'},
      {type:'box',size:[7,1,1],position:[0,0,-10.8],material:'metal'},
      {type:'box',size:[1,7,1],position:[0,0,-10.8],material:'metal'},
    ],
  },

  'jwf1124c-p20-item-35':hexNut(35,'GB889',4,7,5,{nylon:true}),
  'jwf1124c-p20-item-36':hexNut(36,'GB889',6,10,6,{nylon:true}),
  'jwf1124c-p20-item-37':hexNut(37,'GB6170',4,7,3.2),
  'jwf1124c-p20-item-38':hexNut(38,'GB6170',5,8,4),
  GB6172:hexNut(39,'GB6172',8,13,4.5),
  'jwf1124c-p20-item-40':flatWasher(40,'GB96',4,12,1.2),
  'jwf1124c-p20-item-41':flatWasher(41,'GB96',6,18,1.6),
  'jwf1124c-p20-item-42':flatWasher(42,'GB97.1',4,9,0.8),
  'jwf1124c-p20-item-43':flatWasher(43,'GB97.1',6,12,1.6),
  'jwf1124c-p20-item-44':flatWasher(44,'GB97.1',8,16,1.6),
  GB859:springWasher(45,'GB859',8,.8,4.8),

  GB879:{
    level:'尺寸级',material:'metal',
    source:source(46,'GB879',['6X20'],[
      '销直径6和长度20取自厂家明细',
      '端部倒角和配合公差未标，端面环只作倒角视觉提示',
    ]),
    primitives:[
      {type:'cylinder',radius:3,length:20,axis:'z',material:'metal'},
      {type:'torus',radius:2.65,tube:.28,position:[0,0,-10],material:'darkMetal'},
      {type:'torus',radius:2.65,tube:.28,position:[0,0,10],material:'darkMetal'},
    ],
  },

  GB12618:{
    level:'尺寸级',material:'metal',
    source:source(47,'GB12618',['4X12'],[
      '抽芯铆钉直径4和长度12取自厂家明细',
      '帽缘直径8、帽厚1.5、芯轴直径2和伸出长度按常用比例估算',
    ]),
    primitives:[
      {type:'cylinder',radius:2,length:12,axis:'z',material:'metal'},
      {type:'cylinder',radius:4,length:1.5,axis:'z',position:[0,0,-6.75],material:'darkMetal'},
      {type:'cylinder',radius:1,length:14,axis:'z',position:[0,0,7],material:'metal'},
    ],
  },

  'JB/T7274.1-94':{
    level:'尺寸级',material:'plastic',
    source:source(48,'JB/T7274.1-94',['CM10X32'],[
      '把手规格CM10X32取自厂家明细，按M10连接和32有效长度完整记录',
      '星形旋钮外径52、厚度24和五瓣外形按常用把手比例估算；螺纹牙型未建模',
    ]),
    primitives:[
      {type:'cylinder',radius:26,length:24,axis:'z',segments:10,material:'plastic'},
      {type:'cylinder',radius:9,length:30,axis:'z',position:[0,0,-16],material:'darkMetal'},
      {type:'cylinder',radius:5,length:32,axis:'z',position:[0,0,-44],material:'metal'},
      {type:'torus',radius:20,tube:3,position:[0,0,12],material:'darkMetal'},
    ],
  },
};
