// JWF1124C-160 厂家PDF第5页爆炸图、第6页明细表：37项逐件3D规格。
// 坐标单位为毫米；厂家未给出的外形尺寸只用于轮廓表达，并全部写入 assumptions。

const circlePoints=(radius,count=48)=>Array.from({length:count},(_,index)=>{
  const angle=Math.PI*2*index/count;
  return [Number((Math.cos(angle)*radius).toFixed(4)),Number((Math.sin(angle)*radius).toFixed(4))];
});

const hexPoints=radius=>Array.from({length:6},(_,index)=>{
  const angle=Math.PI/6+Math.PI*2*index/6;
  return [Number((Math.cos(angle)*radius).toFixed(4)),Number((Math.sin(angle)*radius).toFixed(4))];
});

const source=(item,code,dimensions,assumptions,views)=>({
  page:6,
  item,
  code,
  recordKey:`jwf1124c-p06-item-${String(item).padStart(2,'0')}`,
  dimensions,
  views:views||[`第5页轴测爆炸图标号${item}`,'第6页厂家明细行'],
  assumptions,
});

function hexBolt(item,code,diameter,length,headAcross,headHeight){
  const key=`M${diameter}X${length}`;
  return {
    level:'尺寸级',
    material:'metal',
    source:source(item,code,[key],[
      `螺纹公称直径M${diameter}与杆长${length}取自厂家明细`,
      `六角头对边${headAcross}、头高${headHeight}按GB5783常用比例表达；螺距和牙型未在本页标明，未作加工级建模`,
    ],[`第6页厂家明细：螺栓${key}`,`第5页爆炸图标号${item}`]),
    primitives:[
      {type:'cylinder',radius:diameter/2,length,axis:'z',position:[0,0,0],material:'metal'},
      {type:'cylinder',radius:headAcross/Math.sqrt(3),length:headHeight,axis:'z',segments:6,position:[0,0,-(length+headHeight)/2],material:'darkMetal'},
      {type:'torus',radius:diameter*.46,tube:diameter*.035,position:[0,0,length*.34],material:'darkMetal'},
      {type:'torus',radius:diameter*.46,tube:diameter*.035,position:[0,0,length*.18],material:'darkMetal'},
    ],
  };
}

function socketScrew(item,code,diameter,length,headDiameter,headHeight,socketAcross){
  const key=`M${diameter}X${length}`;
  return {
    level:'尺寸级',
    material:'darkMetal',
    source:source(item,code,[key],[
      `螺纹公称直径M${diameter}与杆长${length}取自厂家明细`,
      `圆柱头直径${headDiameter}、头高${headHeight}和内六角${socketAcross}按GB70常用比例表达；螺距未标，不作加工牙型`,
    ],[`第6页厂家明细：螺钉${key}`,`第5页爆炸图标号${item}`]),
    primitives:[
      {type:'cylinder',radius:diameter/2,length,axis:'z',position:[0,0,0],material:'metal'},
      {
        type:'extrude',
        points:circlePoints(headDiameter/2),
        depth:headHeight,
        position:[0,0,-(length+headHeight)/2],
        holes:[{kind:'polygon',points:hexPoints(socketAcross/Math.sqrt(3))}],
        bevel:.2,
        material:'darkMetal',
      },
      {type:'torus',radius:diameter*.46,tube:diameter*.035,position:[0,0,length*.3],material:'darkMetal'},
    ],
  };
}

function springWasher(item,code,nominal,wireRadius,pathRadius){
  const points=Array.from({length:34},(_,index)=>{
    const t=index/33;
    const angle=.12+t*Math.PI*1.78;
    return [
      Number((Math.cos(angle)*pathRadius).toFixed(4)),
      Number((Math.sin(angle)*pathRadius).toFixed(4)),
      Number(((t-.5)*wireRadius*1.4).toFixed(4)),
    ];
  });
  return {
    level:'尺寸级',
    material:'darkMetal',
    source:source(item,code,[String(nominal)],[
      `公称规格${nominal}取自厂家明细`,
      `开口螺旋外径、线径和翘高按GB93常用比例估算；本页未给具体公差`,
    ],[`第6页厂家明细：GB93垫圈${nominal}`,`第5页爆炸图标号${item}`]),
    primitives:[{type:'tube',points,radius:wireRadius,radialSegments:12,material:'darkMetal'}],
  };
}

function flatWasher(item,code,nominal,outerDiameter,thickness){
  return {
    level:'尺寸级',
    material:'metal',
    source:source(item,code,[String(nominal)],[
      `公称孔径${nominal}取自厂家明细`,
      `外径${outerDiameter}和厚度${thickness}按对应国标常用规格表达；厂家本页未列公差`,
    ],[`第6页厂家明细：${code}垫圈${nominal}`,`第5页爆炸图标号${item}`]),
    primitives:[{
      type:'extrude',
      points:circlePoints(outerDiameter/2),
      depth:thickness,
      holes:[{kind:'circle',center:[0,0],radius:nominal/2}],
      bevel:.12,
      material:'metal',
    }],
  };
}

function straightPin(item,code,diameter,length){
  return {
    level:'尺寸级',
    material:'metal',
    source:source(item,code,[`${diameter}X${length}`],[
      `销直径${diameter}与长度${length}取自厂家明细`,
      '端部倒角和配合公差未标，仅作细小倒角的视觉近似',
    ],[`第6页厂家明细：销${diameter}X${length}`,`第5页爆炸图标号${item}`]),
    primitives:[
      {type:'cylinder',radius:diameter/2,length,axis:'z',material:'metal'},
      {type:'torus',radius:diameter*.44,tube:diameter*.045,position:[0,0,-length/2],material:'darkMetal'},
    ],
  };
}

export const jwf1124cP06ModelSpecs={
  'JWF1124C-160-0100-1D':{
    level:'轮廓级',
    material:'paintedMetal',
    source:source(1,'JWF1124C-160-0100-1D',[],[
      '厂家仅给轴测爆炸外形，外框约1000×1180×90、框料宽度和板厚均按图形比例估算',
      '按爆炸图保留左墙板的开放式框架、两根内立梁、下部护板和顶部安装梁；孔位不作为加工依据',
    ]),
    primitives:[
      {type:'box',size:[1000,90,90],position:[0,545,0]},
      {type:'box',size:[1000,90,90],position:[0,-545,0]},
      {type:'box',size:[90,1000,90],position:[-455,0,0]},
      {type:'box',size:[90,1000,90],position:[455,0,0]},
      {type:'box',size:[820,55,65],position:[0,395,0],material:'darkMetal'},
      {type:'box',size:[55,780,60],position:[-165,-55,0],material:'darkMetal'},
      {type:'box',size:[55,780,60],position:[165,-55,0],material:'darkMetal'},
      {type:'box',size:[280,360,16],position:[300,-210,35]},
      {type:'box',size:[280,250,16],position:[-300,-265,35]},
      {type:'cylinder',radius:52,length:20,axis:'z',position:[-350,245,48],material:'darkMetal'},
      {type:'cylinder',radius:34,length:20,axis:'z',position:[330,260,48],material:'darkMetal'},
    ],
  },

  'JWF1124C-160-0100-2D':{
    level:'轮廓级',
    material:'paintedMetal',
    source:source(2,'JWF1124C-160-0100-2D',[],[
      '厂家仅给轴测爆炸外形，右墙板外廓约1000×1180×90、板厚和孔径按图形比例估算',
      '与左墙板不同：按图建立大面积机侧板、多组轴孔、下部矩形检修口和外侧折边箱体',
    ]),
    primitives:[
      {
        type:'extrude',
        points:[[-500,-590],[500,-590],[500,590],[-500,590]],
        depth:22,
        holes:[
          {kind:'circle',center:[-170,205],radius:58},
          {kind:'circle',center:[80,120],radius:48},
          {kind:'circle',center:[-120,-35],radius:44},
          {kind:'circle',center:[155,-10],radius:34},
          {kind:'circle',center:[300,210],radius:26},
          {kind:'polygon',points:[[-430,-410],[-190,-410],[-190,-180],[-430,-180]]},
          {kind:'polygon',points:[[185,-480],[360,-480],[360,-315],[185,-315]]},
        ],
        bevel:2,
      },
      {type:'box',size:[1000,85,90],position:[0,548,-20],material:'darkMetal'},
      {type:'box',size:[1000,85,90],position:[0,-548,-20],material:'darkMetal'},
      {type:'box',size:[88,1100,90],position:[456,0,-20],material:'darkMetal'},
      {type:'box',size:[230,420,80],position:[-385,-255,-36]},
      {type:'box',size:[235,270,70],position:[300,-390,-32]},
    ],
  },

  'JWF1124-0100-4A':{
    level:'轮廓级',
    material:'paintedMetal',
    source:source(3,'JWF1124-0100-4A',[],[
      '长度、板高、折边宽度和板厚均未标，按爆炸图估算为1600×220×4',
      '该挡棉板按图表现为低矮长板、上沿加强折边和两端安装耳，不与标号4共用轮廓',
    ]),
    primitives:[
      {type:'box',size:[1600,220,4],position:[0,0,0]},
      {type:'box',size:[1600,28,32],position:[0,96,-16],material:'darkMetal'},
      {type:'box',size:[1600,24,42],position:[0,-101,19]},
      {type:'box',size:[8,220,70],position:[-796,0,22]},
      {type:'box',size:[8,220,70],position:[796,0,22]},
    ],
  },

  'JWF1124-0100-5':{
    level:'轮廓级',
    material:'paintedMetal',
    source:source(4,'JWF1124-0100-5',[],[
      '厂家未标外形尺寸，按爆炸图估算长1600、高260、深70、板厚4',
      '标号4是较高的框边挡棉板，具有上下折边、斜端连接板和中部面板，与标号3明显区分',
    ]),
    primitives:[
      {type:'box',size:[1600,210,4],position:[0,0,0]},
      {type:'box',size:[1600,28,70],position:[0,116,25]},
      {type:'box',size:[1600,28,70],position:[0,-116,25]},
      {type:'box',size:[10,260,70],position:[-795,0,25],rotation:[0,0,.12],material:'darkMetal'},
      {type:'box',size:[10,260,70],position:[795,0,25],rotation:[0,0,-.12],material:'darkMetal'},
      {type:'cylinder',radius:7,length:12,axis:'z',position:[0,58,7],material:'darkMetal'},
    ],
  },

  'JWF1124-0100-6':{
    level:'轮廓级',
    material:'paintedMetal',
    source:source(5,'JWF1124-0100-6',[],[
      '开关箱上罩板的长1600、面高360、顶深320和板厚4均按爆炸图比例估算',
      '按图建立长面板、顶部水平罩面、下沿翻边和左右端板，未把标号19密封条并入金属件',
    ]),
    primitives:[
      {type:'box',size:[1600,360,4],position:[0,0,0]},
      {type:'box',size:[1600,4,320],position:[0,178,-158]},
      {type:'box',size:[1600,28,42],position:[0,-166,19],material:'darkMetal'},
      {type:'box',size:[8,340,320],position:[-796,8,-158]},
      {type:'box',size:[8,340,320],position:[796,8,-158]},
      {type:'cylinder',radius:5,length:10,axis:'z',position:[-250,-75,4],material:'darkMetal'},
      {type:'cylinder',radius:5,length:10,axis:'z',position:[250,-75,4],material:'darkMetal'},
    ],
  },

  'JWF1124-0100-7':{
    level:'轮廓级',
    material:'paintedMetal',
    source:source(6,'JWF1124-0100-7',[],[
      '该挡板在爆炸图中为长U形折弯件，长1600、槽宽180、槽高120及板厚4均为比例估算',
      '圆弧折弯以直板折面近似，保留双侧卷边和端部安装耳',
    ]),
    primitives:[
      {type:'box',size:[1600,4,180],position:[0,-58,0]},
      {type:'box',size:[1600,120,4],position:[0,0,-88]},
      {type:'box',size:[1600,120,4],position:[0,0,88]},
      {type:'box',size:[1600,18,24],position:[0,58,-98],rotation:[.32,0,0],material:'darkMetal'},
      {type:'box',size:[1600,18,24],position:[0,58,98],rotation:[-.32,0,0],material:'darkMetal'},
      {type:'box',size:[10,90,220],position:[-795,-10,0]},
      {type:'box',size:[10,90,220],position:[795,-10,0]},
    ],
  },

  'JWF1124-0100-8':{
    level:'轮廓级',
    material:'paintedMetal',
    source:source(7,'JWF1124-0100-8',[],[
      '开关箱下罩板长1600、立面高330、底托深300和板厚4均按爆炸图估算',
      '按图建立低位立板、向前底托、两端翻边及底部三个安装座，与标号5上罩板方向相反',
    ]),
    primitives:[
      {type:'box',size:[1600,330,4],position:[0,0,0]},
      {type:'box',size:[1600,4,300],position:[0,-163,148]},
      {type:'box',size:[8,330,300],position:[-796,0,148]},
      {type:'box',size:[8,330,300],position:[796,0,148]},
      {type:'box',size:[130,24,55],position:[-520,-177,95],material:'darkMetal'},
      {type:'box',size:[130,24,55],position:[0,-177,95],material:'darkMetal'},
      {type:'box',size:[130,24,55],position:[520,-177,95],material:'darkMetal'},
    ],
  },

  'JWF1124-0100-9':{
    level:'轮廓级',
    material:'paintedMetal',
    source:source(8,'JWF1124-0100-9',[],[
      '撑挡长1600、宽180、高70和板厚4均按爆炸图比例估算',
      '标号8表现为宽底浅槽并带双端安装板，未与标号10、11、12共用同一截面',
    ]),
    primitives:[
      {type:'box',size:[1600,4,180],position:[0,-33,0]},
      {type:'box',size:[1600,70,4],position:[0,0,-88]},
      {type:'box',size:[1600,70,4],position:[0,0,88]},
      {type:'box',size:[10,70,180],position:[-795,0,0]},
      {type:'box',size:[10,70,180],position:[795,0,0]},
    ],
  },

  'JWF1124-0100-10':{
    level:'轮廓级',
    material:'paintedMetal',
    source:source(9,'JWF1124-0100-10',[],[
      '电机托板长1500、宽300、槽高55和板厚6均按爆炸图比例估算',
      '按图建立宽托板、双侧加强边、两条电机安装滑槽和中部加强条',
    ]),
    primitives:[
      {type:'box',size:[1500,6,300],position:[0,-25,0]},
      {type:'box',size:[1500,55,12],position:[0,0,-144],material:'darkMetal'},
      {type:'box',size:[1500,55,12],position:[0,0,144],material:'darkMetal'},
      {type:'box',size:[420,14,48],position:[-330,8,-62],material:'metal'},
      {type:'box',size:[420,14,48],position:[330,8,62],material:'metal'},
      {type:'box',size:[900,14,30],position:[0,8,0],material:'darkMetal'},
    ],
  },

  'FA109A-0100-3':{
    level:'轮廓级',
    material:'paintedMetal',
    source:source(10,'FA109A-0100-3',[],[
      '长1600、宽160、高90和板厚5均按爆炸图比例估算',
      '标号10为深槽形撑挡，底板较宽、两侧壁较高，截面区别于标号8的浅槽',
    ]),
    primitives:[
      {type:'box',size:[1600,5,160],position:[0,-42,0]},
      {type:'box',size:[1600,90,5],position:[0,0,-77.5]},
      {type:'box',size:[1600,90,5],position:[0,0,77.5]},
      {type:'box',size:[10,90,160],position:[-795,0,0],material:'darkMetal'},
      {type:'box',size:[10,90,160],position:[795,0,0],material:'darkMetal'},
    ],
  },

  'FA109A-0100-6':{
    level:'轮廓级',
    material:'paintedMetal',
    source:source(11,'FA109A-0100-6',[],[
      '长1600、宽95、高45和板厚4均按爆炸图比例估算',
      '该件数量为2；模型表达单件窄帽形撑挡，顶部平条和向下双折边按图建立',
    ]),
    primitives:[
      {type:'box',size:[1600,4,95],position:[0,21,0]},
      {type:'box',size:[1600,45,4],position:[0,0,-45.5]},
      {type:'box',size:[1600,45,4],position:[0,0,45.5]},
      {type:'box',size:[120,10,72],position:[-650,25,0],material:'darkMetal'},
      {type:'box',size:[120,10,72],position:[650,25,0],material:'darkMetal'},
    ],
  },

  'FA109A-0900-1':{
    level:'轮廓级',
    material:'paintedMetal',
    source:source(12,'FA109A-0900-1',[],[
      '长1600、宽135、高55和板厚4均按爆炸图比例估算',
      '按图建立带中央加强脊的长条撑挡及两端安装耳，区别于标号11的对称帽形截面',
    ]),
    primitives:[
      {type:'box',size:[1600,5,135],position:[0,-22,0]},
      {type:'box',size:[1600,55,5],position:[0,2,-65]},
      {type:'box',size:[1600,34,16],position:[0,8,0],material:'darkMetal'},
      {type:'box',size:[12,70,170],position:[-794,0,0]},
      {type:'box',size:[12,70,170],position:[794,0,0]},
    ],
  },

  'CVT1-160-0100-7':{
    level:'轮廓级',
    material:'paintedMetal',
    source:source(13,'CVT1-160-0100-7',[],[
      '圆撑挡长度1600、管径50和端头尺寸均按爆炸图估算，厂家未给明示尺寸',
      '该件数量为3；模型表达单根圆管撑挡及两端较小连接轴颈',
    ]),
    primitives:[
      {type:'cylinder',radius:25,length:1600,axis:'x'},
      {type:'cylinder',radius:16,length:55,axis:'x',position:[-827.5,0,0],material:'darkMetal'},
      {type:'cylinder',radius:16,length:55,axis:'x',position:[827.5,0,0],material:'darkMetal'},
    ],
  },

  'JWF1124-0102':{
    level:'轮廓级',
    material:'darkMetal',
    source:source(14,'JWF1124-0102',[],[
      '压板长160、宽75、厚8和两孔位置均按第5页局部爆炸比例估算',
      '该件数量为2；按图作为小型竖向压板，中心开长孔并带两端紧固孔',
    ]),
    primitives:[{
      type:'extrude',
      points:[[-80,-37.5],[80,-37.5],[80,37.5],[-80,37.5]],
      depth:8,
      holes:[
        {kind:'polygon',points:[[-42,-10],[42,-10],[42,10],[-42,10]]},
        {kind:'circle',center:[-62,0],radius:5},
        {kind:'circle',center:[62,0],radius:5},
      ],
      bevel:1,
    }],
  },

  'JWF1124-0103':{
    level:'轮廓级',
    material:'rubber',
    source:source(15,'JWF1124-0103',[],[
      '厂家未给该短密封条尺寸，按标号14旁的四段外形估算为110×20×12',
      '材质按零件名称确定为橡胶；模型表达单段，实际单台数量为4',
    ]),
    primitives:[
      {type:'box',size:[110,20,12],material:'rubber'},
      {type:'box',size:[82,4,14],position:[0,8,0],material:'rubber'},
    ],
  },

  'FA109A-0102':{
    level:'轮廓级',
    material:'paintedMetal',
    source:source(16,'FA109A-0102',[],[
      '前立柱高1120、截面85×70、底板和顶板尺寸均按爆炸图估算',
      '按图建立竖直槽形柱、上下连接板和底部侧向安装耳，不并入紧固件26、33',
    ]),
    primitives:[
      {type:'box',size:[10,1120,70],position:[-37,0,0]},
      {type:'box',size:[75,1120,10],position:[0,0,-30]},
      {type:'box',size:[85,1120,10],position:[0,0,30]},
      {type:'box',size:[160,16,130],position:[0,-552,0],material:'darkMetal'},
      {type:'box',size:[125,16,105],position:[0,552,0],material:'darkMetal'},
      {type:'box',size:[70,14,80],position:[75,-515,0]},
    ],
  },

  'MM6-0107':{
    level:'轮廓级',
    material:'darkMetal',
    source:source(17,'MM6-0107',[],[
      '垫板直径约130、厚度12及中心凸台按爆炸图中墙板底部四个圆垫外形估算',
      '模型表达单件圆垫板；实际单台数量为4，未把调平螺杆并入本件',
    ]),
    primitives:[
      {type:'cylinder',radius:65,length:12,axis:'z',material:'darkMetal'},
      {type:'cylinder',radius:18,length:16,axis:'z',position:[0,0,13],material:'metal'},
      {type:'torus',radius:56,tube:3,position:[0,0,6],material:'metal'},
    ],
  },

  'TF2120-00':{
    level:'轮廓级',
    material:'glass',
    source:source(18,'TF2120-00',[],[
      '窗口外框约240×160、框宽20、玻璃厚度6和安装孔径均按第5页爆炸图估算',
      '中心透明片采用glass材质，四边压框采用金属；不将垫圈31和螺钉24并入窗口',
    ]),
    primitives:[
      {type:'box',size:[200,120,6],material:'glass'},
      {type:'box',size:[240,20,16],position:[0,70,0],material:'darkMetal'},
      {type:'box',size:[240,20,16],position:[0,-70,0],material:'darkMetal'},
      {type:'box',size:[20,120,16],position:[-110,0,0],material:'darkMetal'},
      {type:'box',size:[20,120,16],position:[110,0,0],material:'darkMetal'},
      {type:'cylinder',radius:5,length:18,axis:'z',position:[-102,58,0],material:'metal'},
      {type:'cylinder',radius:5,length:18,axis:'z',position:[102,-58,0],material:'metal'},
    ],
  },

  'TZH1107-10X3X1600':{
    level:'尺寸级',
    material:'rubber',
    source:source(19,'TZH1107-10X3X1600',['10X3X1600'],[
      '10×3×1600三向尺寸取自厂家件号和明细',
      '厂家未给截面倒角，按实心矩形橡胶条表达；标号19位于上罩板下沿',
    ]),
    primitives:[{type:'box',size:[1600,10,3],material:'rubber'}],
  },

  'TZH1107-19X3X1600':{
    level:'尺寸级',
    material:'rubber',
    source:source(20,'TZH1107-19X3X1600',['19X3X1600'],[
      '19×3×1600三向尺寸取自厂家件号和明细',
      '厂家未给截面倒角，按比标号19更宽的实心矩形橡胶条表达；两者不得共用宽度',
    ]),
    primitives:[{type:'box',size:[1600,19,3],material:'rubber'}],
  },

  'jwf1124c-p06-item-21':hexBolt(21,'GB5783',8,20,13,5.3),
  'jwf1124c-p06-item-22':hexBolt(22,'GB5783',10,25,16,6.4),
  'jwf1124c-p06-item-23':hexBolt(23,'GB5783',16,80,24,10),
  'jwf1124c-p06-item-24':socketScrew(24,'GB70',6,12,10,6,4),
  'jwf1124c-p06-item-25':socketScrew(25,'GB70',8,10,13,8,6),
  'jwf1124c-p06-item-26':socketScrew(26,'GB70',8,16,13,8,6),
  'jwf1124c-p06-item-27':socketScrew(27,'GB70',8,20,13,8,6),
  'jwf1124c-p06-item-28':socketScrew(28,'GB70',12,40,18,12,10),

  GB825:{
    level:'尺寸级',
    material:'metal',
    source:source(29,'GB825',['M20'],[
      '螺纹公称直径M20取自厂家明细',
      '爆炸图明确为吊环螺钉；环外径、环厚、颈部和螺纹长度按GB825常用M20比例估算',
    ],['第5页爆炸图标号29吊环外形','第6页厂家明细：GB825螺钉M20']),
    primitives:[
      {type:'torus',radius:20,tube:5,position:[0,22,0],rotation:[1.5708,0,0],material:'metal'},
      {type:'cylinder',radius:12,length:18,axis:'y',position:[0,2,0],material:'darkMetal'},
      {type:'cylinder',radius:10,length:38,axis:'y',position:[0,-24,0],material:'metal'},
      {type:'torus',radius:9.2,tube:.7,position:[0,-37,0],rotation:[1.5708,0,0],material:'darkMetal'},
    ],
  },

  GB6170:{
    level:'尺寸级',
    material:'darkMetal',
    source:source(30,'GB6170',['M20'],[
      '螺纹公称直径M20取自厂家明细，中心孔按20表达',
      '六角对边30、厚度16按GB6170常用M20比例估算；螺纹牙型未作加工级表达',
    ],['第6页厂家明细：GB6170螺母M20','第5页爆炸图标号30']),
    primitives:[{
      type:'extrude',
      points:hexPoints(30/Math.sqrt(3)),
      depth:16,
      holes:[{kind:'circle',center:[0,0],radius:10}],
      bevel:.8,
      material:'darkMetal',
    }],
  },

  'jwf1124c-p06-item-31':springWasher(31,'GB93',6,.8,3.8),
  'jwf1124c-p06-item-32':springWasher(32,'GB93',12,1.25,7.25),
  'jwf1124c-p06-item-33':flatWasher(33,'GB96',8,24,2),
  'jwf1124c-p06-item-34':flatWasher(34,'GB96',10,30,2.5),
  'GB97.1':flatWasher(35,'GB97.1',20,37,3),
  'jwf1124c-p06-item-36':straightPin(36,'GB879',6,10),
  'jwf1124c-p06-item-37':straightPin(37,'GB879',6,14),
};
