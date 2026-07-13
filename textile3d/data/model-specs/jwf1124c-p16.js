// JWF1124C-160 厂家PDF第15页爆炸图、第16页38项明细：逐件3D规格。
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
  page:16,
  item,
  code,
  recordKey:`jwf1124c-p16-item-${String(item).padStart(2,'0')}`,
  dimensions,
  views:views||[`第15页爆炸图标号${item}`,'第16页厂家明细行'],
  assumptions,
});

function hexBolt(item,code,diameter,length,headAcross,headHeight){
  return {
    level:'尺寸级',
    material:'metal',
    source:source(item,code,[`M${diameter}X${length}`],[
      `螺纹公称直径M${diameter}和杆长${length}取自厂家明细`,
      `六角头对边${headAcross}、头高${headHeight}按相应国标常用比例表达；螺距和牙型未在本页标明`,
    ]),
    primitives:[
      {type:'cylinder',radius:diameter/2,length,axis:'z',material:'metal'},
      {type:'cylinder',radius:headAcross/Math.sqrt(3),length:headHeight,axis:'z',segments:6,position:[0,0,-(length+headHeight)/2],material:'darkMetal'},
      {type:'torus',radius:diameter*.46,tube:diameter*.035,position:[0,0,length*.34],material:'darkMetal'},
      {type:'torus',radius:diameter*.46,tube:diameter*.035,position:[0,0,length*.16],material:'darkMetal'},
    ],
  };
}

function socketScrew(item,code,diameter,length,headDiameter,headHeight,socketAcross){
  return {
    level:'尺寸级',
    material:'darkMetal',
    source:source(item,code,[`M${diameter}X${length}`],[
      `螺纹公称直径M${diameter}和杆长${length}取自厂家明细`,
      `圆柱头直径${headDiameter}、头高${headHeight}和内六角${socketAcross}按对应国标常用比例表达；螺距未标`,
    ]),
    primitives:[
      {type:'cylinder',radius:diameter/2,length,axis:'z',material:'metal'},
      {
        type:'extrude',points:circlePoints(headDiameter/2),depth:headHeight,
        position:[0,0,-(length+headHeight)/2],holes:[{kind:'polygon',points:hexPoints(socketAcross/Math.sqrt(3))}],
        bevel:.2,material:'darkMetal',
      },
      {type:'torus',radius:diameter*.46,tube:diameter*.035,position:[0,0,length*.28],material:'darkMetal'},
    ],
  };
}

function hexNut(item,code,diameter,across,height){
  return {
    level:'尺寸级',
    material:'darkMetal',
    source:source(item,code,[`M${diameter}`],[
      `螺纹公称直径M${diameter}取自厂家明细，中心孔按${diameter}表达`,
      `六角对边${across}和厚度${height}按GB6170常用比例估算；牙型未作加工级建模`,
    ]),
    primitives:[{
      type:'extrude',points:hexPoints(across/Math.sqrt(3)),depth:height,
      holes:[{kind:'circle',center:[0,0],radius:diameter/2}],bevel:.6,material:'darkMetal',
    }],
  };
}

function flatWasher(item,code,nominal,outerDiameter,thickness){
  return {
    level:'尺寸级',
    material:'metal',
    source:source(item,code,[String(nominal)],[
      `公称孔径${nominal}取自厂家明细`,
      `外径${outerDiameter}和厚度${thickness}按对应国标常用规格表达；厂家本页未列公差`,
    ]),
    primitives:[{
      type:'extrude',points:circlePoints(outerDiameter/2),depth:thickness,
      holes:[{kind:'circle',center:[0,0],radius:nominal/2}],bevel:.12,material:'metal',
    }],
  };
}

function springWasher(item,code,nominal,wireRadius,pathRadius){
  const points=Array.from({length:34},(_,index)=>{
    const t=index/33,angle=.12+t*Math.PI*1.78;
    return [
      Number((Math.cos(angle)*pathRadius).toFixed(4)),
      Number((Math.sin(angle)*pathRadius).toFixed(4)),
      Number(((t-.5)*wireRadius*1.4).toFixed(4)),
    ];
  });
  return {
    level:'尺寸级',material:'darkMetal',
    source:source(item,code,[String(nominal)],[
      `公称规格${nominal}取自厂家明细`,
      '开口外径、线径和翘高按对应弹簧垫圈常用比例估算；本页未给具体公差',
    ]),
    primitives:[{type:'tube',points,radius:wireRadius,radialSegments:12,material:'darkMetal'}],
  };
}

function straightPin(item,code,diameter,length){
  return {
    level:'尺寸级',material:'metal',
    source:source(item,code,[`${diameter}X${length}`],[
      `销直径${diameter}与长度${length}取自厂家明细`,
      '端部倒角和配合公差未标，端面环只作倒角视觉提示',
    ]),
    primitives:[
      {type:'cylinder',radius:diameter/2,length,axis:'z',material:'metal'},
      {type:'torus',radius:diameter*.44,tube:diameter*.045,position:[0,0,-length/2],material:'darkMetal'},
      {type:'torus',radius:diameter*.44,tube:diameter*.045,position:[0,0,length/2],material:'darkMetal'},
    ],
  };
}

const beaterPins=[];
for(let ring=0;ring<10;ring++){
  const x=-630+ring*140;
  for(let tooth=0;tooth<6;tooth++){
    const angle=(tooth/6+ring*.08)*Math.PI*2;
    beaterPins.push({
      type:'cylinder',radius:2.4,length:22,axis:'y',
      position:[x,Math.cos(angle)*171,Math.sin(angle)*171],rotation:[angle,0,0],material:'darkMetal',
    });
  }
}

export const jwf1124cP16ModelSpecs={
  'JWF1124C-160-0400-1':{
    level:'轮廓级',material:'metal',
    source:source(1,'JWF1124C-160-0400-1',[],[
      '厂家仅给爆炸外形，辊筒长度1450、外径330、轴径70和端盘尺寸均按图形比例估算',
      '按图建立梳针辊筒、左右端盘、贯通轴及多排表面梳针；梳针数量和节距仅作视觉表达',
    ]),
    primitives:[
      {type:'cylinder',radius:165,length:1450,axis:'x',material:'darkMetal'},
      {type:'cylinder',radius:35,length:1660,axis:'x',material:'metal'},
      {type:'cylinder',radius:148,length:28,axis:'x',position:[-720,0,0],material:'metal'},
      {type:'cylinder',radius:148,length:28,axis:'x',position:[720,0,0],material:'metal'},
      {type:'torus',radius:145,tube:7,position:[-735,0,0],rotation:[0,1.5708,0],material:'metal'},
      {type:'torus',radius:145,tube:7,position:[735,0,0],rotation:[0,1.5708,0],material:'metal'},
      ...beaterPins,
    ],
  },

  'JWF1124-0400-3':{
    level:'轮廓级',material:'paintedMetal',
    source:source(2,'JWF1124-0400-3',[],[
      '电机底板外廓约360×300×12、立板高260和孔位均按爆炸图比例估算',
      '按图建立底板、竖向安装板、四个安装孔和下部圆形调节座；不并入螺栓、螺母和丝杆',
    ]),
    primitives:[
      {type:'box',size:[360,12,300],position:[0,-126,0]},
      {type:'extrude',points:[[-180,-125],[180,-125],[180,125],[-180,125]],depth:12,position:[0,0,-135],holes:[
        {kind:'circle',center:[-120,-72],radius:9},{kind:'circle',center:[120,-72],radius:9},
        {kind:'circle',center:[-120,72],radius:9},{kind:'circle',center:[120,72],radius:9},
      ],bevel:2},
      {type:'cylinder',radius:38,length:35,axis:'y',position:[0,-155,0],material:'darkMetal'},
      {type:'box',size:[90,24,120],position:[0,-143,90],material:'darkMetal'},
    ],
  },

  'JWF1124C-160-0401':{
    level:'轮廓级',material:'metal',
    source:source(3,'JWF1124C-160-0401',[],[
      '厂家未标尺寸，外径170、中心孔70、总厚42和台阶尺寸按爆炸图比例估算',
      '该轴承盖按右侧轴端外形建立圆形法兰、中心通孔和内侧凸台',
    ]),
    primitives:[
      {type:'extrude',points:circlePoints(85),depth:18,holes:[{kind:'circle',center:[0,0],radius:35}],bevel:1},
      {type:'cylinder',radius:62,length:24,axis:'z',position:[0,0,-20],material:'darkMetal'},
      {type:'torus',radius:70,tube:5,position:[0,0,9],material:'metal'},
    ],
  },

  'JWF1124C-160-0402':{
    level:'轮廓级',material:'paintedMetal',
    source:source(4,'JWF1124C-160-0402',[],[
      '轴承座外廓约260×230×55、中心孔和安装孔位置均按爆炸图比例估算',
      '数量为2；模型表达单件带双耳法兰轴承座及中央圆筒座',
    ]),
    primitives:[
      {type:'extrude',points:[[-130,-82],[-92,-115],[92,-115],[130,-82],[130,82],[92,115],[-92,115],[-130,82]],depth:20,holes:[
        {kind:'circle',center:[0,0],radius:50},{kind:'circle',center:[-102,-88],radius:9},{kind:'circle',center:[102,-88],radius:9},
      ],bevel:2},
      {type:'cylinder',radius:76,length:55,axis:'z',position:[0,0,-28],material:'darkMetal'},
      {type:'torus',radius:58,tube:8,position:[0,0,-55],material:'metal'},
    ],
  },

  'JWF1124C-160-0403':{
    level:'轮廓级',material:'darkMetal',
    source:source(5,'JWF1124C-160-0403',[],[
      '厂家只给挡圈外形，内径70、外径90、厚度6和开口均按爆炸图比例估算',
      '模型用开口管线表达弹性挡圈，不把标号31油杯并入',
    ]),
    primitives:[{
      type:'tube',radius:3,radialSegments:12,points:Array.from({length:42},(_,i)=>{
        const angle=.18+i/41*Math.PI*1.88;
        return [Math.cos(angle)*40,Math.sin(angle)*40,0];
      }),material:'darkMetal',
    }],
  },

  'JWF1124C-160-0404':{
    level:'轮廓级',material:'paintedMetal',
    source:source(6,'JWF1124C-160-0404',[],[
      '行程开关支架约160×125×90、板厚6和长孔位置按爆炸图比例估算',
      '按图建立L形折板、安装长孔和用于接近开关的上部小平台',
    ]),
    primitives:[
      {type:'extrude',points:[[-80,-62.5],[80,-62.5],[80,62.5],[-80,62.5]],depth:6,holes:[
        {kind:'polygon',points:[[-52,-10],[42,-10],[42,10],[-52,10]]},{kind:'circle',center:[58,42],radius:6},
      ],bevel:1},
      {type:'box',size:[160,90,6],position:[0,60,-42],rotation:[1.5708,0,0]},
      {type:'box',size:[52,12,58],position:[54,105,-42],material:'darkMetal'},
    ],
  },

  'JWF1124C-160-0405':{
    level:'轮廓级',material:'metal',
    source:source(7,'JWF1124C-160-0405',[],[
      '厂家未标尺寸，外径145、中心孔65、厚度55和三耳轮廓按左轴端爆炸比例估算',
      '与标号3不同：按图建立较厚的三耳轴承盖和外侧凸台，不作简单复制',
    ]),
    primitives:[
      {type:'extrude',points:[[-72,-52],[-30,-72],[30,-72],[72,-52],[72,52],[30,72],[-30,72],[-72,52]],depth:22,holes:[{kind:'circle',center:[0,0],radius:32.5}],bevel:2},
      {type:'cylinder',radius:55,length:33,axis:'z',position:[0,0,-27],material:'darkMetal'},
      {type:'cylinder',radius:8,length:28,axis:'z',position:[-55,-45,0]},
      {type:'cylinder',radius:8,length:28,axis:'z',position:[55,-45,0]},
      {type:'cylinder',radius:8,length:28,axis:'z',position:[0,58,0]},
    ],
  },

  'JWF1124C-180-0401':{
    level:'轮廓级',material:'darkMetal',
    source:source(8,'JWF1124C-180-0401',[],[
      '六角轴套长度85、六角对边52、中心孔32均按爆炸图比例估算，厂家未给明示尺寸',
      '按图建立贯通孔六角套和一端短圆柱台阶',
    ]),
    primitives:[
      {type:'extrude',points:hexPoints(30),depth:85,holes:[{kind:'circle',center:[0,0],radius:16}],bevel:1,material:'darkMetal'},
      {type:'torus',radius:22,tube:3,position:[0,0,42.5],material:'metal'},
    ],
  },

  'JWF1124C-180-0403':{
    level:'轮廓级',material:'darkMetal',
    source:source(9,'JWF1124C-180-0403',[],[
      '打手带轮外径260、轮宽75、中心孔55及槽数按爆炸图比例估算',
      '建立双槽轮缘、轮毂和中央轮辐；厂家未给槽型尺寸，不作传动计算依据',
    ]),
    primitives:[
      {type:'cylinder',radius:130,length:22,axis:'z',position:[0,0,-26],material:'darkMetal'},
      {type:'cylinder',radius:130,length:22,axis:'z',position:[0,0,26],material:'darkMetal'},
      {type:'cylinder',radius:72,length:75,axis:'z',material:'metal'},
      {type:'extrude',points:circlePoints(58),depth:75,holes:[{kind:'circle',center:[0,0],radius:27.5}],material:'darkMetal'},
      {type:'torus',radius:112,tube:7,position:[0,0,-37],material:'metal'},
      {type:'torus',radius:112,tube:7,position:[0,0,37],material:'metal'},
    ],
  },

  'JWF1124-0404':{
    level:'轮廓级',material:'metal',
    source:source(10,'JWF1124-0404',[],[
      '测速盘外径210、厚度12、中心孔和单个检测缺口均按爆炸图比例估算',
      '按图建立薄圆盘、中心孔和边缘缺口，缺口角度只作视觉表达',
    ]),
    primitives:[{
      type:'extrude',points:circlePoints(105),depth:12,holes:[
        {kind:'circle',center:[0,0],radius:26},{kind:'polygon',points:[[85,-12],[110,-12],[110,12],[85,12]]},
      ],bevel:1,material:'metal',
    }],
  },

  'JWF1124-0405':{
    level:'轮廓级',material:'darkMetal',
    source:source(11,'JWF1124-0405',[],[
      '电机带轮外径150、宽70、中心孔38和槽数按爆炸图比例估算',
      '建立三段轮缘、中心轮毂和贯通孔；槽型与键槽未标，仅作视觉近似',
    ]),
    primitives:[
      {type:'extrude',points:circlePoints(75),depth:70,holes:[{kind:'circle',center:[0,0],radius:19}],material:'darkMetal'},
      {type:'torus',radius:63,tube:5,position:[0,0,-30],material:'metal'},
      {type:'torus',radius:63,tube:5,position:[0,0,0],material:'metal'},
      {type:'torus',radius:63,tube:5,position:[0,0,30],material:'metal'},
    ],
  },

  'JWF1126-160-0203':{
    level:'轮廓级',material:'rubber',
    source:source(12,'JWF1126-160-0203',[],[
      '厂家名称已核为“侧垫”而非“侧板”；外径105、内孔70和厚度10按爆炸图比例估算',
      '本页未注明侧垫材质，按柔性隔垫语义用rubber材质表达，并在此明确为视觉假设',
    ]),
    primitives:[{
      type:'extrude',points:circlePoints(52.5),depth:10,holes:[{kind:'circle',center:[0,0],radius:35}],bevel:.8,material:'rubber',
    }],
  },

  'FZ/T92010-91':{
    level:'尺寸级',material:'rubber',
    source:source(13,'FZ/T92010-91',['50'],[
      '毡圈公称规格50取自厂家明细',
      '厂家本页未给外径和厚度，按内径50、外径72、厚度9作视觉表达；felt材质以rubber着色近似',
    ]),
    primitives:[{
      type:'extrude',points:circlePoints(36),depth:9,holes:[{kind:'circle',center:[0,0],radius:25}],bevel:1,material:'rubber',
    }],
  },

  'TZH1035-M12X120':{
    level:'尺寸级',material:'metal',
    source:source(14,'TZH1035-M12X120',['M12X120'],[
      '螺纹公称直径M12和总长120取自厂家件号',
      '螺距、端部倒角和螺纹有效长度未标，外螺纹用间隔环纹作视觉表达',
    ]),
    primitives:[
      {type:'cylinder',radius:6,length:120,axis:'z',material:'metal'},
      {type:'torus',radius:5.6,tube:.45,position:[0,0,-42],material:'darkMetal'},
      {type:'torus',radius:5.6,tube:.45,position:[0,0,-28],material:'darkMetal'},
      {type:'torus',radius:5.6,tube:.45,position:[0,0,-14],material:'darkMetal'},
      {type:'torus',radius:5.6,tube:.45,position:[0,0,0],material:'darkMetal'},
      {type:'torus',radius:5.6,tube:.45,position:[0,0,14],material:'darkMetal'},
      {type:'torus',radius:5.6,tube:.45,position:[0,0,28],material:'darkMetal'},
      {type:'torus',radius:5.6,tube:.45,position:[0,0,42],material:'darkMetal'},
    ],
  },

  'TZH1100-L':{
    level:'轮廓级',material:'paintedMetal',
    source:source(15,'TZH1100-L',[],[
      '厂家仅给箭头牌型号L，箭头外廓约120×65、厚度2和安装孔按爆炸图比例估算',
      '模型只表达左向箭头轮廓和单个安装孔，不从型号L推导尺寸',
    ]),
    primitives:[{
      type:'extrude',points:[[-60,0],[-18,-32],[-18,-14],[60,-14],[60,14],[-18,14],[-18,32]],depth:2,
      holes:[{kind:'circle',center:[32,0],radius:4}],bevel:.5,material:'paintedMetal',
    }],
  },

  GB14:{
    level:'尺寸级',material:'metal',
    source:source(16,'GB14',['M10X30'],[
      '螺纹公称直径M10和杆长30取自厂家明细',
      'GB14头部圆弧、方颈对边和高度按常用比例估算；螺距未标，不作加工牙型',
    ]),
    primitives:[
      {type:'cylinder',radius:5,length:30,axis:'z',material:'metal'},
      {type:'box',size:[10,10,5],position:[0,0,-17.5],material:'darkMetal'},
      {type:'cylinder',radius:10,length:5,axis:'z',position:[0,0,-22.5],material:'metal'},
      {type:'torus',radius:4.6,tube:.4,position:[0,0,10],material:'darkMetal'},
    ],
  },

  'jwf1124c-p16-item-17':hexBolt(17,'GB5783',8,20,13,5.3),
  'jwf1124c-p16-item-18':hexBolt(18,'GB5783',12,35,18,7.5),
  GB70:socketScrew(19,'GB70',6,16,10,6,4),

  GB80:{
    level:'尺寸级',material:'darkMetal',
    source:source(20,'GB80',['M8X10'],[
      '螺纹公称直径M8和长度10取自厂家明细',
      '按无头内六角紧定螺钉表达，内六角4和端部锥度按常用比例估算；螺距未标',
    ]),
    primitives:[
      {type:'cylinder',radius:4,length:8,axis:'z',material:'darkMetal'},
      {type:'cylinder',radiusTop:1.5,radiusBottom:4,length:2,axis:'z',position:[0,0,5],material:'metal'},
      {type:'extrude',points:circlePoints(4),depth:1,position:[0,0,-5],holes:[{kind:'polygon',points:hexPoints(2.3)}],material:'darkMetal'},
    ],
  },

  GB879:straightPin(21,'GB879',6,24),

  'GB1096-79':{
    level:'尺寸级',material:'metal',
    source:source(22,'GB1096-79',['14X45'],[
      '键宽14和长度45取自厂家明细',
      '键高未标，按9估算；两端圆角以小倒角近似',
    ]),
    primitives:[{type:'box',size:[45,14,9],material:'metal'}],
  },

  'jwf1124c-p16-item-23':hexNut(23,'GB6170',10,16,8),
  'jwf1124c-p16-item-24':hexNut(24,'GB6170',12,18,10),
  GB93:springWasher(25,'GB93',12,1.25,7.25),
  'jwf1124c-p16-item-26':flatWasher(26,'GB97.1',8,16,1.6),
  'jwf1124c-p16-item-27':flatWasher(27,'GB97.1',10,20,2),
  'jwf1124c-p16-item-28':flatWasher(28,'GB97.1',12,24,2.5),
  'jwf1124c-p16-item-29':springWasher(29,'GB859',6,.65,3.65),
  'jwf1124c-p16-item-30':springWasher(30,'GB859',10,1,6),

  'JB/T7940.1-95':{
    level:'尺寸级',material:'brass',
    source:source(31,'JB/T7940.1-95',['M8X1'],[
      '油杯螺纹规格M8X1取自厂家明细',
      '杯体外径、锥部高度、嘴口和螺纹长度未标，按爆炸图和常见直通油杯比例估算',
    ]),
    primitives:[
      {type:'cylinder',radius:4,length:10,axis:'z',position:[0,0,-10],material:'brass'},
      {type:'cylinder',radiusTop:7,radiusBottom:4,length:12,axis:'z',position:[0,0,1],material:'brass'},
      {type:'cylinder',radius:8,length:5,axis:'z',position:[0,0,9.5],material:'darkMetal'},
      {type:'cylinder',radiusTop:2,radiusBottom:5,length:8,axis:'z',position:[0,0,16],material:'brass'},
    ],
  },

  'jwf1124c-p16-item-32':{
    level:'尺寸级',material:'rubber',
    source:source(32,'',['2.2X35X1985'],[
      '平皮带厚2.2、宽35、长度1985取自厂家明细',
      '为便于独立预览，按中心线周长约1985的扁平矩形闭环表达；实际装机状态的圆弧和张紧量未标',
    ]),
    primitives:[{
      type:'extrude',points:[[-325,-171.25],[325,-171.25],[325,171.25],[-325,171.25]],depth:2.2,
      holes:[{kind:'polygon',points:[[-290,-136.25],[290,-136.25],[290,136.25],[-290,136.25]]}],bevel:1,material:'rubber',
    }],
  },

  'jwf1124c-p16-item-33':{
    level:'尺寸级',material:'metal',
    source:source(33,'',['ZT12-45X75'],[
      '厂家名称已核为胀套；ZT12为型号标识，45与75按内外公称直径表达',
      '厂家未给轴向宽度，按24估算；开缝、锥面和紧固孔只按胀套语义作视觉表达',
    ]),
    primitives:[
      {type:'extrude',points:circlePoints(37.5),depth:24,holes:[{kind:'circle',center:[0,0],radius:22.5}],bevel:.8,material:'darkMetal'},
      {type:'torus',radius:32,tube:2,position:[0,0,-12],material:'metal'},
      {type:'box',size:[3,18,26],position:[30,0,0],material:'metal'},
    ],
  },

  'jwf1124c-p16-item-34':{
    level:'尺寸级',material:'metal',
    source:source(34,'',['ZT12-38X65X40'],[
      '厂家名称已核为胀套；ZT12为型号标识，38、65、40按厂家规格完整记录',
      '模型按内径38、外径65、轴向宽40表达；开缝、锥面和紧固孔位置未标，按视觉比例估算',
    ]),
    primitives:[
      {type:'extrude',points:circlePoints(32.5),depth:40,holes:[{kind:'circle',center:[0,0],radius:19}],bevel:.8,material:'darkMetal'},
      {type:'torus',radius:27.5,tube:2,position:[0,0,-20],material:'metal'},
      {type:'box',size:[3,16,42],position:[26,0,0],material:'metal'},
    ],
  },

  'jwf1124c-p16-item-35':{
    level:'尺寸级',material:'metal',
    source:source(35,'',['2211EK'],[
      '厂家仅给滚动轴承型号2211EK，未在本页给内径、外径和宽度',
      '外径100、内径55、宽25仅按该型号常见外观作视觉估算；型号记录完整，不作为尺寸依据',
    ]),
    primitives:[
      {type:'torus',radius:42,tube:8,material:'darkMetal'},
      {type:'torus',radius:33,tube:5,material:'metal'},
      {type:'torus',radius:37.5,tube:3.8,position:[0,0,-8],material:'metal'},
      {type:'torus',radius:37.5,tube:3.8,position:[0,0,8],material:'metal'},
      {type:'extrude',points:circlePoints(50),depth:25,holes:[{kind:'circle',center:[0,0],radius:27.5}],material:'metal'},
    ],
  },

  'jwf1124c-p16-item-36':{
    level:'尺寸级',material:'darkMetal',
    source:source(36,'',['H311'],[
      '厂家仅给紧定套型号H311，未在本页给实际直径和宽度',
      '按带锥度、开槽和锁紧螺母的套筒外形表达；外径75、内径55、宽58均为视觉估算',
    ]),
    primitives:[
      {type:'extrude',points:circlePoints(37.5),depth:58,holes:[{kind:'circle',center:[0,0],radius:27.5}],material:'darkMetal'},
      {type:'torus',radius:34,tube:2.5,position:[0,0,29],material:'metal'},
      {type:'box',size:[3,18,60],position:[31,0,0],material:'metal'},
      {type:'extrude',points:hexPoints(44),depth:10,position:[0,0,-34],holes:[{kind:'circle',center:[0,0],radius:28}],material:'darkMetal'},
    ],
  },

  'jwf1124c-p16-item-37':{
    level:'尺寸级',material:'paintedMetal',
    source:source(37,'',['AEEF-4P-7.5HP','右手'],[
      '厂家型号AEEF-4P-7.5HP及方向“右手”已由1000dpi原格确认',
      '电机外径260、机身长420、轴径38、脚座和散热片尺寸未标，均按爆炸图比例估算；右手信息保留在source，不从名称反推件号',
    ]),
    primitives:[
      {type:'cylinder',radius:130,length:420,axis:'x',material:'paintedMetal'},
      {type:'cylinder',radius:142,length:26,axis:'x',position:[-205,0,0],material:'darkMetal'},
      {type:'cylinder',radius:142,length:26,axis:'x',position:[205,0,0],material:'darkMetal'},
      {type:'cylinder',radius:19,length:115,axis:'x',position:[267.5,0,0],material:'metal'},
      {type:'box',size:[250,45,160],position:[-90,-145,0],material:'darkMetal'},
      {type:'box',size:[250,45,160],position:[90,-145,0],material:'darkMetal'},
      {type:'box',size:[520,18,22],position:[0,130,0],material:'darkMetal'},
      {type:'box',size:[520,18,22],position:[0,92,90],material:'darkMetal'},
      {type:'box',size:[520,18,22],position:[0,92,-90],material:'darkMetal'},
      {type:'box',size:[520,18,22],position:[0,-92,90],material:'darkMetal'},
      {type:'box',size:[520,18,22],position:[0,-92,-90],material:'darkMetal'},
      {type:'box',size:[150,100,120],position:[-40,155,0],material:'paintedMetal'},
    ],
  },

  'jwf1124c-p16-item-38':{
    level:'尺寸级',material:'plastic',
    source:source(38,'',['E1224 5L(2KHz)'],[
      '厂家型号E1224 5L(2KHz)已由1000dpi原格确认，现有索引中的ET274.5L不是厂家原文',
      '传感器外径18、壳体长65、螺纹段和电缆长度未标，按爆炸图中圆柱形接近开关外形估算；空件号保持为空',
    ]),
    primitives:[
      {type:'cylinder',radius:9,length:65,axis:'y',material:'plastic'},
      {type:'cylinder',radius:8.5,length:12,axis:'y',position:[0,38.5,0],material:'metal'},
      {type:'cylinder',radius:11,length:5,axis:'y',segments:6,position:[0,-24,0],material:'darkMetal'},
      {type:'tube',points:[[0,-32.5,0],[0,-65,0],[18,-92,0]],radius:2.5,material:'rubber'},
    ],
  },
};
