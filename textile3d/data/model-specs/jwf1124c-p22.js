// JWF1124C-160 厂家PDF第21页爆炸图、第22页38项明细：逐件3D规格。
// 坐标单位为毫米；厂家未标出的外形尺寸只作视觉估算，并全部写入 assumptions。

const PI=Math.PI;

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

const rectangle=(width,height)=>[
  [-width/2,-height/2],[width/2,-height/2],[width/2,height/2],[-width/2,height/2],
];

const source=(item,code,dimensions,assumptions,remark=null)=>({
  page:22,
  item,
  code,
  recordKey:`jwf1124c-p22-item-${String(item).padStart(2,'0')}`,
  dimensions,
  remark,
  views:[`第21页联接部件爆炸图标号${item}`,'第22页厂家明细原格'],
  assumptions,
});

function guardSpec(item,code,points,holes,remark,note,extras=[]){
  return {
    level:'轮廓级',material:'plastic',
    source:source(item,code,[],[
      note,
      '厂家未标单件尺寸和材质；轮廓、孔位、板厚按第21页对应标号比例估算，使用非金属材质作视觉占位，不作为材质或加工依据。',
      '与其他同名左右护木按件号、适用机型和recordKey分别建模，不共享轮廓。',
    ],remark),
    primitives:[
      {type:'extrude',points,depth:16,holes,bevel:1,material:'plastic'},
      ...extras,
    ],
  };
}

function hexBolt(item,length){
  return {
    level:'尺寸级',material:'metal',
    source:source(item,'GB5783',[`M10X${length}`],[
      `公称直径M10和杆长${length}取自厂家第22页明细。`,
      '六角头对边17、头高6.4按GB5783常用M10比例表达；螺距和公差未标。',
    ]),
    primitives:[
      {type:'cylinder',radius:5,length,axis:'z',material:'metal'},
      {type:'cylinder',radius:17/Math.sqrt(3),length:6.4,axis:'z',segments:6,position:[0,0,-(length+6.4)/2],material:'darkMetal'},
      {type:'torus',radius:4.65,tube:.32,position:[0,0,length*.28],material:'darkMetal'},
      {type:'torus',radius:4.65,tube:.32,position:[0,0,length*.03],material:'darkMetal'},
    ],
  };
}

function socketScrew(item,diameter,length){
  const headDiameter=diameter===6?10:16,headHeight=diameter===6?6:10,socket=diameter===6?5:8;
  return {
    level:'尺寸级',material:'darkMetal',
    source:source(item,'GB70',[`M${diameter}X${length}`],[
      `公称直径M${diameter}和杆长${length}取自厂家第22页明细。`,
      `圆柱头直径${headDiameter}、头高${headHeight}和内六角${socket}按GB70常用比例表达；螺距未标。`,
    ]),
    primitives:[
      {type:'cylinder',radius:diameter/2,length,axis:'z',material:'metal'},
      {type:'extrude',points:circlePoints(headDiameter/2),depth:headHeight,position:[0,0,-(length+headHeight)/2],holes:[{kind:'polygon',points:hexPoints(socket)}],bevel:.3,material:'darkMetal'},
      {type:'torus',radius:diameter*.46,tube:.25,position:[0,0,length*.22],material:'darkMetal'},
    ],
  };
}

function hexNut(item,code,diameter,across,height,nylon=false){
  return {
    level:'尺寸级',material:'darkMetal',
    source:source(item,code,[`M${diameter}`],[
      `公称螺纹M${diameter}取自厂家第22页明细。`,
      `六角对边${across}、厚${height}按${code}常用规格表达；螺纹牙型和公差未作加工级建模。`,
      ...(nylon?['GB889按防松螺母表达，顶部非金属锁紧圈为结构语义提示。']:[]),
    ]),
    primitives:[
      {type:'extrude',points:hexPoints(across),depth:height,holes:[{kind:'circle',center:[0,0],radius:diameter/2}],bevel:.5,material:'darkMetal'},
      ...(nylon?[{type:'torus',radius:diameter*.58,tube:.9,position:[0,0,height/2],material:'plastic'}]:[]),
    ],
  };
}

function flatWasher(item,nominal,outer,thickness){
  return {
    level:'尺寸级',material:'metal',
    source:source(item,'GB97.1',[String(nominal)],[
      `垫圈公称规格${nominal}取自厂家第22页明细。`,
      `外径${outer}、厚${thickness}按GB97.1常用规格表达；厂家本页未列公差。`,
    ]),
    primitives:[{type:'extrude',points:circlePoints(outer/2),depth:thickness,holes:[{kind:'circle',center:[0,0],radius:nominal/2}],bevel:.12,material:'metal'}],
  };
}

function splitWasher(item,code,nominal,pathRadius,wireRadius){
  const points=Array.from({length:40},(_,index)=>{
    const t=index/39,angle=.18+t*PI*1.82;
    return [Math.cos(angle)*pathRadius,Math.sin(angle)*pathRadius,(t-.5)*wireRadius*1.6];
  });
  return {
    level:'尺寸级',material:'darkMetal',
    source:source(item,code,[String(nominal)],[
      `垫圈公称规格${nominal}取自厂家第22页明细。`,
      '开口、线径和翘高按相应标准常用比例表达；厂家本页未列公差。',
    ]),
    primitives:[{type:'tube',points,radius:wireRadius,radialSegments:12,material:'darkMetal'}],
  };
}

function retainingRing(item,code,nominal,pathRadius,wireRadius){
  const points=Array.from({length:44},(_,index)=>{
    const t=index/43,angle=.28+t*PI*1.72;
    return [Math.cos(angle)*pathRadius,Math.sin(angle)*pathRadius,0];
  });
  return {
    level:'尺寸级',material:'darkMetal',
    source:source(item,code,[String(nominal)],[
      `挡圈公称规格${nominal}取自厂家第22页明细。`,
      '开口角、截面和耳部尺寸按相应轴用挡圈常用比例表达；厂家本页未列公差。',
    ]),
    primitives:[
      {type:'tube',points,radius:wireRadius,radialSegments:12,material:'darkMetal'},
      {type:'torus',radius:wireRadius*1.3,tube:wireRadius*.35,position:[pathRadius*.94,pathRadius*.28,0],material:'metal'},
      {type:'torus',radius:wireRadius*1.3,tube:wireRadius*.35,position:[pathRadius*.94,-pathRadius*.28,0],material:'metal'},
    ],
  };
}

export const jwf1124cP22ModelSpecs={
  'FA109-160-0300-21':{
    level:'轮廓级',material:'darkMetal',
    source:source(1,'FA109-160-0300-21',[],[
      '按第21页上部两端的标号1建立气弹簧筒体、伸缩杆和两端球头连接，模型表达单件。',
      '厂家未标尺寸；筒体约φ36×420、杆φ12×260及接头大小均按爆炸图比例估算。',
    ]),
    primitives:[
      {type:'cylinder',radius:18,length:420,axis:'x',position:[-75,0,0],material:'darkMetal'},
      {type:'cylinder',radius:6,length:260,axis:'x',position:[265,0,0],material:'metal'},
      {type:'cylinder',radius:24,length:34,axis:'x',position:[-302,0,0],material:'darkMetal'},
      {type:'torus',radius:13,tube:5,position:[-319,0,0],rotation:[0,PI/2,0],material:'metal'},
      {type:'torus',radius:10,tube:4,position:[395,0,0],rotation:[0,PI/2,0],material:'metal'},
    ],
  },

  'FA109A-0100-6':{
    level:'轮廓级',material:'paintedMetal',
    source:source(2,'FA109A-0100-6',[],[
      '标号2为上部横向长撑挡，按矩形空心梁、两端封板和安装孔表达。',
      '厂家未标尺寸；约1450×70×45和端板孔位按爆炸图比例估算。',
    ]),
    primitives:[
      {type:'box',size:[1450,70,45],material:'paintedMetal'},
      {type:'box',size:[14,92,68],position:[-725,0,0],material:'darkMetal'},
      {type:'box',size:[14,92,68],position:[725,0,0],material:'darkMetal'},
      {type:'cylinder',radius:7,length:18,axis:'x',position:[-730,25,0],material:'metal'},
      {type:'cylinder',radius:7,length:18,axis:'x',position:[730,25,0],material:'metal'},
    ],
  },

  'FA109A-1300-1':guardSpec(3,'FA109A-1300-1',[
    [-250,-155],[170,-155],[250,-78],[250,155],[-250,155],
  ],[{kind:'circle',center:[150,-15],radius:72}],null,
  '标号3为FA109A左护木，建立右侧圆弧让位、单侧斜边和双安装边。',[
    {type:'box',size:[500,18,24],position:[0,-145,-18],material:'darkMetal'},
  ]),

  'FA109A-1300-2':guardSpec(4,'FA109A-1300-2',[
    [-250,-78],[-170,-155],[250,-155],[250,155],[-250,155],
  ],[{kind:'circle',center:[-150,-15],radius:72}],null,
  '标号4为FA109A右护木，圆弧让位和斜边方向与项目3镜像但保留独立轮廓。',[
    {type:'box',size:[500,18,24],position:[0,-145,-18],material:'darkMetal'},
  ]),

  'FA109A-1300-6A':{
    level:'轮廓级',material:'metal',
    source:source(5,'FA109A-1300-6A',[],[
      '标号5为中下部输棉帘传动辊，按长辊筒、两端阶梯轴和端部连接段建立。',
      '厂家未标尺寸；辊长1550、外径180、轴颈和台阶尺寸按爆炸图比例估算。',
    ]),
    primitives:[
      {type:'cylinder',radius:90,length:1550,axis:'x',material:'paintedMetal'},
      {type:'cylinder',radius:28,length:170,axis:'x',position:[-860,0,0],material:'metal'},
      {type:'cylinder',radius:28,length:170,axis:'x',position:[860,0,0],material:'metal'},
      {type:'cylinder',radius:45,length:55,axis:'x',position:[-802,0,0],material:'darkMetal'},
      {type:'cylinder',radius:45,length:55,axis:'x',position:[802,0,0],material:'darkMetal'},
      {type:'torus',radius:86,tube:4,position:[-765,0,0],rotation:[0,PI/2,0],material:'darkMetal'},
      {type:'torus',radius:86,tube:4,position:[765,0,0],rotation:[0,PI/2,0],material:'darkMetal'},
    ],
  },

  'FA109A-1300-7':{
    level:'轮廓级',material:'paintedMetal',
    source:source(6,'FA109A-1300-7',[],[
      '标号6为右下长托板，按浅槽托板、两侧折边和端部安装耳建立。',
      '厂家未标尺寸；约1500×260×45、板厚和孔位均按爆炸图比例估算。',
    ]),
    primitives:[
      {type:'box',size:[1500,240,10],material:'paintedMetal'},
      {type:'box',size:[1500,12,55],position:[0,-116,25],material:'darkMetal'},
      {type:'box',size:[1500,12,55],position:[0,116,25],material:'darkMetal'},
      {type:'box',size:[42,280,35],position:[-730,0,15],material:'darkMetal'},
      {type:'box',size:[42,280,35],position:[730,0,15],material:'darkMetal'},
    ],
  },

  'FA109A-1300-8A':{
    level:'轮廓级',material:'paintedMetal',
    source:source(7,'FA109A-1300-8A',[],[
      '标号7位于上部长罩板下方，按宽幅活门板、长铰接边和两端连接耳建立。',
      '厂家未标尺寸；约1450×430×10和铰接边尺寸按爆炸图比例估算。',
    ]),
    primitives:[
      {type:'box',size:[1450,430,10],material:'paintedMetal'},
      {type:'cylinder',radius:13,length:1410,axis:'x',position:[0,-205,-4],material:'darkMetal'},
      {type:'box',size:[28,42,28],position:[-710,-205,0],material:'metal'},
      {type:'box',size:[28,42,28],position:[710,-205,0],material:'metal'},
    ],
  },

  'FA109A-1300-9':{
    level:'轮廓级',material:'paintedMetal',
    source:source(8,'FA109A-1300-9',[],[
      '标号8为传动辊左端轴承座底板，按四孔矩形底板、左向折边和中心轴孔建立。',
      '厂家未标尺寸；底板约250×220×14、中心孔和孔距按爆炸图比例估算。',
    ]),
    primitives:[
      {type:'extrude',points:[[-125,-110],[125,-110],[125,78],[85,110],[-125,110]],depth:14,holes:[
        {kind:'circle',center:[0,0],radius:38},{kind:'circle',center:[-92,-75],radius:7},{kind:'circle',center:[92,-75],radius:7},{kind:'circle',center:[-92,75],radius:7},{kind:'circle',center:[92,75],radius:7},
      ],bevel:1,material:'paintedMetal'},
      {type:'box',size:[24,220,70],position:[-113,0,-35],material:'darkMetal'},
    ],
  },

  'FA109A-1300-10':{
    level:'轮廓级',material:'paintedMetal',
    source:source(9,'FA109A-1300-10',[],[
      '标号9为传动辊右端轴承座底板，按四孔矩形底板、右向折边和中心轴孔建立。',
      '厂家未标尺寸；底板约260×225×14、中心孔和孔距按爆炸图比例估算，与项目8独立。',
    ]),
    primitives:[
      {type:'extrude',points:[[-130,-112],[-88,-112],[130,-78],[130,112],[-130,112]],depth:14,holes:[
        {kind:'circle',center:[0,0],radius:40},{kind:'circle',center:[-95,-78],radius:7},{kind:'circle',center:[95,-78],radius:7},{kind:'circle',center:[-95,78],radius:7},{kind:'circle',center:[95,78],radius:7},
      ],bevel:1,material:'paintedMetal'},
      {type:'box',size:[26,225,72],position:[117,0,-36],material:'darkMetal'},
    ],
  },

  'FA109A-1300-11':guardSpec(10,'FA109A-1300-11',[
    [-205,-125],[205,-125],[205,125],[-150,125],[-205,65],
  ],[{kind:'circle',center:[92,-5],radius:55}],'FA028C-160专用',
  '项目10为FA028C-160专用左护木，建立左上缺角、偏置圆弧让位和较短外廓。',[
    {type:'box',size:[410,16,20],position:[0,-116,-17],material:'darkMetal'},
  ]),

  'FA109A-1300-12':guardSpec(11,'FA109A-1300-12',[
    [-205,-125],[205,-125],[205,65],[150,125],[-205,125],
  ],[{kind:'circle',center:[-92,-5],radius:55}],'FA028C-160专用',
  '项目11为FA028C-160专用右护木，缺角和圆弧方向与项目10镜像但保持独立记录。',[
    {type:'box',size:[410,16,20],position:[0,-116,-17],material:'darkMetal'},
  ]),

  'FA109A-1300-17':{
    level:'轮廓级',material:'paintedMetal',
    source:source(12,'FA109A-1300-17',[],[
      '标号12为右上张紧支座，按四孔安装板、轴承孔和外伸支臂建立；不并入标号13张紧轮。',
      '厂家未标尺寸；支座约230×210×70、孔位和支臂长度按爆炸图比例估算。',
    ]),
    primitives:[
      {type:'extrude',points:[[-115,-100],[72,-100],[115,-55],[115,100],[-115,100]],depth:18,holes:[
        {kind:'circle',center:[0,0],radius:32},{kind:'circle',center:[-82,-70],radius:7},{kind:'circle',center:[82,-70],radius:7},{kind:'circle',center:[-82,70],radius:7},{kind:'circle',center:[82,70],radius:7},
      ],bevel:1,material:'paintedMetal'},
      {type:'box',size:[180,32,42],position:[150,0,-8],material:'darkMetal'},
      {type:'cylinder',radius:25,length:58,axis:'z',position:[0,0,-33],material:'metal'},
    ],
  },

  'FA109A-1300-18':{
    level:'轮廓级',material:'metal',
    source:source(13,'FA109A-1300-18',[],[
      '标号13为右上张紧轮，按轮缘、轮毂、中心孔和双侧挡边建立；与项目12支座独立。',
      '厂家未标尺寸；外径180、内孔30、轮宽58和轮毂尺寸按爆炸图比例估算。',
    ]),
    primitives:[
      {type:'extrude',points:circlePoints(90),depth:58,holes:[{kind:'circle',center:[0,0],radius:15}],bevel:1,material:'metal'},
      {type:'torus',radius:78,tube:9,position:[0,0,-29],material:'darkMetal'},
      {type:'torus',radius:78,tube:9,position:[0,0,29],material:'darkMetal'},
      {type:'cylinder',radius:32,length:70,axis:'z',material:'darkMetal'},
    ],
  },

  'JWF1124C-180-0700-7':guardSpec(14,'JWF1124C-180-0700-7',[
    [-235,-140],[150,-140],[235,-60],[235,140],[-235,140],
  ],[{kind:'circle',center:[125,0],radius:68}],'JWF1026-160专用',
  '项目14为JWF1026-160专用左护木，建立更高外廓、右侧大圆弧和长斜边。',[
    {type:'box',size:[470,18,28],position:[0,128,-19],material:'darkMetal'},
  ]),

  'JWF1124C-180-0700-8':guardSpec(15,'JWF1124C-180-0700-8',[
    [-235,-60],[-150,-140],[235,-140],[235,140],[-235,140],
  ],[{kind:'circle',center:[-125,0],radius:68}],'JWF1026-160专用',
  '项目15为JWF1026-160专用右护木，建立与项目14镜像但不共用的圆弧和安装边。',[
    {type:'box',size:[470,18,28],position:[0,128,-19],material:'darkMetal'},
  ]),

  'FA109A-0315':{
    level:'轮廓级',material:'darkMetal',
    source:source(16,'FA109A-0315',[],[
      '标号16位于张紧轮轴系，按带缺口的轴肩挡圈建立。',
      '厂家未标公称直径；内径约30、外径50、厚5和开口角按爆炸图比例估算。',
    ]),
    primitives:[{
      type:'tube',radius:4,radialSegments:12,material:'darkMetal',points:Array.from({length:42},(_,i)=>{
        const angle=.22+i/41*PI*1.78;return [Math.cos(angle)*21,Math.sin(angle)*21,0];
      }),
    }],
  },

  'FA109A-1303':{
    level:'轮廓级',material:'metal',
    source:source(17,'FA109A-1303',[],[
      '标号17为右下托板上的两根扁棒，模型表达单件长方截面扁棒。',
      '厂家未标尺寸；约920×45×8按爆炸图比例估算，数量2表示同规格两件。',
    ]),
    primitives:[{type:'box',size:[920,45,8],material:'metal'}],
  },

  'TZH1107-10X3':{
    level:'尺寸级',material:'rubber',
    source:source(18,'TZH1107-10X3',['10X3'],[
      '密封条截面10X3取自厂家件号，按宽10、厚3的橡胶条建模。',
      '数量栏2.3m是单台设备总用量，不写入source.dimensions；模型展开长度2300仅用于表达总用量。',
      '厂家未标硬度、接头和安装压缩率，不作材质牌号或加工依据。',
    ]),
    primitives:[{type:'box',size:[2300,10,3],material:'rubber'}],
  },

  'jwf1124c-p22-item-19':hexBolt(19,16),
  'jwf1124c-p22-item-20':hexBolt(20,25),
  'jwf1124c-p22-item-21':socketScrew(21,6,30),
  'jwf1124c-p22-item-22':socketScrew(22,10,16),

  'GB99':{
    level:'尺寸级',material:'metal',
    source:source(23,'GB99',['4.5X20'],[
      '木螺钉直径4.5、长度20取自厂家第22页明细。',
      '尖端、沉头和螺纹仅按GB99木螺钉常用比例表达；螺距和槽型未标。',
    ]),
    primitives:[
      {type:'cylinder',radius:2.25,length:16,axis:'z',position:[0,0,-2],material:'metal'},
      {type:'cylinder',radiusTop:.25,radiusBottom:2.25,length:4,axis:'z',position:[0,0,8],material:'metal'},
      {type:'cylinder',radiusTop:4.2,radiusBottom:2.25,length:3.2,axis:'z',position:[0,0,-11.6],material:'darkMetal'},
      {type:'torus',radius:2.05,tube:.25,position:[0,0,2],material:'darkMetal'},
      {type:'torus',radius:1.75,tube:.23,position:[0,0,5],material:'darkMetal'},
    ],
  },

  'GB12618':{
    level:'尺寸级',material:'metal',
    source:source(24,'GB12618',['4X8'],[
      '抽芯铆钉直径4、夹持长度8取自厂家第22页明细。',
      '帽径、芯杆长度和断芯形态按GB12618常用比例表达；厂家本页未列公差。',
    ]),
    primitives:[
      {type:'cylinder',radius:2,length:8,axis:'z',material:'metal'},
      {type:'cylinder',radiusTop:4,radiusBottom:2.2,length:2.2,axis:'z',position:[0,0,-5.1],material:'metal'},
      {type:'cylinder',radius:1,length:18,axis:'z',position:[0,0,9],material:'darkMetal'},
    ],
  },

  'GB879':{
    level:'尺寸级',material:'metal',
    source:source(25,'GB879',['6X12'],[
      '销直径6、长度12取自厂家第22页明细。',
      '端部倒角和配合公差未标，端面环只作倒角视觉提示。',
    ]),
    primitives:[
      {type:'cylinder',radius:3,length:12,axis:'z',material:'metal'},
      {type:'torus',radius:2.65,tube:.25,position:[0,0,-6],material:'darkMetal'},
      {type:'torus',radius:2.65,tube:.25,position:[0,0,6],material:'darkMetal'},
    ],
  },

  'GB889':hexNut(26,'GB889',6,10,6,true),
  'GB6170':hexNut(27,'GB6170',10,17,8,false),
  'GB6172':hexNut(28,'GB6172',8,13,5,false),
  'GB93':splitWasher(29,'GB93',10,6.3,1.5),
  'jwf1124c-p22-item-30':flatWasher(30,6,12,1.6),
  'jwf1124c-p22-item-31':flatWasher(31,10,20,2),
  'jwf1124c-p22-item-32':splitWasher(32,'GB859',8,5.2,1.15),
  'jwf1124c-p22-item-33':splitWasher(33,'GB859',10,6.3,1.4),
  'GB893.1':retainingRing(34,'GB893.1',55,27.5,2.2),
  'GB894.1':retainingRing(35,'GB894.1',30,15,1.6),

  'JB/T7274.1-94':{
    level:'尺寸级',material:'plastic',
    source:source(36,'JB/T7274.1-94',['CM10X32'],[
      '厂家名称栏明确把手规格CM10X32，模型按M10×32外螺纹杆和蘑菇形把手建立。',
      '把手外径、总高和圆角按第21页顶部标号36外形及常用比例估算；颜色和材料牌号未标。',
    ]),
    primitives:[
      {type:'cylinder',radius:5,length:32,axis:'z',position:[0,0,-16],material:'metal'},
      {type:'cylinder',radiusTop:18,radiusBottom:13,length:24,axis:'z',position:[0,0,12],material:'plastic'},
      {type:'torus',radius:18,tube:5,position:[0,0,24],material:'plastic'},
      {type:'torus',radius:4.6,tube:.3,position:[0,0,-22],material:'darkMetal'},
      {type:'torus',radius:4.6,tube:.3,position:[0,0,-14],material:'darkMetal'},
    ],
  },

  'GB/T276-94':{
    level:'尺寸级',material:'metal',
    source:source(37,'GB/T276-94',['6006-RS'],[
      '厂家名称栏明确滚动轴承型号6006-RS。',
      '模型按6006常用30×55×13外形表达单面橡胶密封深沟球轴承；具体游隙、精度和内部滚珠数未在本页标明。',
    ]),
    primitives:[
      {type:'extrude',points:circlePoints(27.5),depth:13,holes:[{kind:'circle',center:[0,0],radius:15}],bevel:.5,material:'metal'},
      {type:'torus',radius:22.5,tube:3.2,position:[0,0,-5.8],material:'darkMetal'},
      {type:'torus',radius:17.8,tube:2.1,position:[0,0,5.8],material:'metal'},
      {type:'extrude',points:circlePoints(24),depth:1.2,position:[0,0,6.2],holes:[{kind:'circle',center:[0,0],radius:15.5}],material:'rubber'},
    ],
  },

  'GB/T7810-95':{
    level:'尺寸级',material:'paintedMetal',
    source:source(38,'GB/T7810-95',['UELFLU206'],[
      '厂家名称栏完整型号为UELFLU206，source.dimensions保留完整串，不简写为206。',
      '按第21页传动辊两端标号38建立菱形双孔带座外球面轴承、凸台和中心轴承；外廓、孔距和厚度按图估算。',
      '轴承内径按206系列常用30毫米表达；座体公差、锁紧结构和材料牌号未在本页标明。',
    ]),
    primitives:[
      {type:'extrude',points:[[-92,-52],[-55,-82],[55,-82],[92,-52],[92,52],[55,82],[-55,82],[-92,52]],depth:24,holes:[
        {kind:'circle',center:[0,0],radius:31},{kind:'circle',center:[-66,0],radius:8},{kind:'circle',center:[66,0],radius:8},
      ],bevel:2,material:'paintedMetal'},
      {type:'cylinder',radius:45,length:48,axis:'z',position:[0,0,-24],material:'darkMetal'},
      {type:'extrude',points:circlePoints(38),depth:30,holes:[{kind:'circle',center:[0,0],radius:15}],bevel:.8,material:'metal'},
      {type:'torus',radius:30,tube:4,position:[0,0,-39],material:'metal'},
    ],
  },
};
