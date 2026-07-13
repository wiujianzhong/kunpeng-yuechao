// JWF1102 厂家PDF第3—5页：第5页44项明细的独立3D规格。
// 坐标单位为毫米；厂家未给出的外形尺寸仅用于轮廓展示，并全部写入 assumptions。

const circlePoints=(radius,count=48)=>Array.from({length:count},(_,index)=>{
  const angle=Math.PI*2*index/count;
  return [Number((Math.cos(angle)*radius).toFixed(4)),Number((Math.sin(angle)*radius).toFixed(4))];
});

const ellipsePoints=(radiusX,radiusY,count=48)=>Array.from({length:count},(_,index)=>{
  const angle=Math.PI*2*index/count;
  return [Number((Math.cos(angle)*radiusX).toFixed(4)),Number((Math.sin(angle)*radiusY).toFixed(4))];
});

const hexPoints=radius=>Array.from({length:6},(_,index)=>{
  const angle=Math.PI/6+Math.PI*2*index/6;
  return [Number((Math.cos(angle)*radius).toFixed(4)),Number((Math.sin(angle)*radius).toFixed(4))];
});

const parts={
  1:{code:'ZFA113A-0300A',nameZh:'尘格部件',quantity:1,dimensions:[]},
  2:{code:'JWF1102-0100',nameZh:'机架部件',quantity:1,dimensions:[]},
  3:{code:'JWF1102-0200',nameZh:'打手部件',quantity:1,dimensions:[]},
  4:{code:'ZFA113-0000-3',nameZh:'排杂口结合件',quantity:1,dimensions:[]},
  5:{code:'ZFA113B-0000-3',nameZh:'撑挡结合件',quantity:4,dimensions:[]},
  6:{code:'JWF1102-0000-1',nameZh:'左框结合件',quantity:1,dimensions:[]},
  7:{code:'JWF1102-0000-2',nameZh:'右框结合件',quantity:1,dimensions:[]},
  8:{code:'JWF1102-0000-3',nameZh:'出棉口结合件',quantity:1,dimensions:[]},
  9:{code:'JWF1102-0000-4A',nameZh:'进棉口结合件',quantity:1,dimensions:[]},
  10:{code:'JWF1102-0000-9',nameZh:'防护罩结合件',quantity:1,dimensions:[]},
  11:{code:'JWF1102-0000-10',nameZh:'防护罩结合件',quantity:1,dimensions:[]},
  12:{code:'ZFA113-0023',nameZh:'垫板',quantity:4,dimensions:[]},
  13:{code:'ZFA113B-0001',nameZh:'后侧板',quantity:1,dimensions:[]},
  14:{code:'JWF1102-0001',nameZh:'封板',quantity:2,dimensions:[]},
  15:{code:'JWF1102-0022',nameZh:'软管',quantity:1,dimensions:[]},
  16:{code:'TV425A-0501',nameZh:'禁令牌',quantity:1,dimensions:[]},
  17:{code:'ZBG012-0120',nameZh:'光电管架',quantity:2,dimensions:[]},
  18:{code:'TF2407-02',nameZh:'透光板',quantity:2,dimensions:[]},
  20:{code:'GB14',nameZh:'螺栓 M8X20',quantity:4,dimensions:['M8X20']},
  21:{code:'GB5783',nameZh:'螺栓 M4X12',quantity:4,dimensions:['M4X12']},
  22:{code:'GB5783',nameZh:'螺栓 M6X12',quantity:11,dimensions:['M6X12']},
  23:{code:'GB5783',nameZh:'螺栓 M6X16',quantity:22,dimensions:['M6X16']},
  24:{code:'GB5783',nameZh:'螺栓 M6X20',quantity:45,dimensions:['M6X20']},
  25:{code:'GB5783',nameZh:'螺栓 M6X30',quantity:4,dimensions:['M6X30']},
  26:{code:'GB5783',nameZh:'螺栓 M8X20',quantity:16,dimensions:['M8X20']},
  27:{code:'GB5783',nameZh:'螺栓 M16X40',quantity:4,dimensions:['M16X40']},
  28:{code:'GB5783',nameZh:'螺栓 M16X80',quantity:4,dimensions:['M16X80']},
  29:{code:'GB825',nameZh:'螺钉 M16',quantity:4,dimensions:['M16']},
  30:{code:'GB6170',nameZh:'螺母 M4',quantity:4,dimensions:['M4']},
  32:{code:'GB6170',nameZh:'螺母 M6',quantity:17,dimensions:['M6']},
  33:{code:'GB6170',nameZh:'螺母 M8',quantity:4,dimensions:['M8']},
  34:{code:'GB6170',nameZh:'螺母 M16',quantity:10,dimensions:['M16']},
  35:{code:'GB93',nameZh:'垫圈 4',quantity:4,dimensions:['4']},
  36:{code:'GB93',nameZh:'垫圈 6',quantity:43,dimensions:['6']},
  37:{code:'GB93',nameZh:'垫圈 8',quantity:16,dimensions:['8']},
  38:{code:'GB93',nameZh:'垫圈 16',quantity:4,dimensions:['16']},
  39:{code:'GB96',nameZh:'垫圈 6',quantity:24,dimensions:['6']},
  40:{code:'GB96',nameZh:'垫圈 16',quantity:4,dimensions:['16']},
  41:{code:'GB97.1',nameZh:'垫圈 4',quantity:8,dimensions:['4']},
  43:{code:'GB97.1',nameZh:'垫圈 6',quantity:75,dimensions:['6']},
  44:{code:'GB97.1',nameZh:'垫圈 8',quantity:20,dimensions:['8']},
  45:{code:'GB97.1',nameZh:'垫圈 16',quantity:6,dimensions:['16']},
  47:{code:null,nameZh:'接头 QS-1/8-8',quantity:1,dimensions:['QS-1/8-8'],remark:'FESTO'},
  48:{code:'FA022-0000-2',nameZh:'玻璃窗结合件',quantity:1,dimensions:[]},
};

const drawingPageByItem=new Map([
  ...[1,2,3,10,11,12,16,20,22,27,28,29,34,36,38,40,45].map(item=>[item,3]),
]);

const source=(item,assumptions)=>{
  const part=parts[item];
  const drawingPage=drawingPageByItem.get(item)||4;
  return {
    page:5,
    item,
    code:part.code,
    recordKey:`jwf1102-p05-item-${String(item).padStart(3,'0')}`,
    nameZh:part.nameZh,
    quantity:{value:part.quantity,unit:'件',meaning:'单台设备用量'},
    dimensions:part.dimensions,
    views:[`第${drawingPage}页产品装配总图标号${item}`,'第5页厂家明细行'],
    assumptions,
    ...(part.remark?{remark:part.remark}:{}),
  };
};

const spec=(item,{material='paintedMetal',level='轮廓级',primitives,assumptions})=>({
  level,material,source:source(item,assumptions),primitives,
});

const duplicateCodes=new Set(['GB5783','GB6170','GB93','GB96','GB97.1']);
const partKey=item=>!parts[item].code||duplicateCodes.has(parts[item].code)
  ?`jwf1102-p05-item-${String(item).padStart(3,'0')}`
  :parts[item].code;

function sideFrame(item,mirror){
  return spec(item,{
    assumptions:[
      `厂家未标外形尺寸；框体约1050×1450×260、型材宽100和板厚均按第4页爆炸图比例估算`,
      `${mirror<0?'左框':'右框'}按图保留内侧立边、上下连接箱和安装孔语义；它与另一侧框互为镜像但件号独立`,
    ],
    primitives:[
      {type:'box',size:[100,1450,260],position:[mirror*475,0,0]},
      {type:'box',size:[950,100,260],position:[0,675,0]},
      {type:'box',size:[950,100,260],position:[0,-675,0]},
      {type:'box',size:[80,1250,45],position:[mirror*-425,0,-105],material:'darkMetal'},
      {type:'box',size:[210,70,310],position:[mirror*385,500,0],material:'darkMetal'},
      {type:'cylinder',radius:16,length:272,axis:'z',position:[mirror*475,460,0],material:'metal'},
      {type:'cylinder',radius:16,length:272,axis:'z',position:[mirror*475,-460,0],material:'metal'},
    ],
  });
}

function hexBolt(item,diameter,length,headAcross,headHeight){
  return spec(item,{
    level:'尺寸级',material:'metal',
    assumptions:[
      `厂家明确规格为M${diameter}X${length}；公称直径${diameter}和杆长${length}据此建立`,
      `六角头对边${headAcross}、头高${headHeight}按GB5783常用比例表达；螺距、倒角和公差未在本页标明`,
    ],
    primitives:[
      {type:'cylinder',radius:diameter/2,length,axis:'z',material:'metal'},
      {type:'cylinder',radius:headAcross/Math.sqrt(3),length:headHeight,axis:'z',segments:6,position:[0,0,-(length+headHeight)/2],material:'darkMetal'},
      {type:'torus',radius:diameter*.46,tube:diameter*.035,position:[0,0,length*.3],material:'darkMetal'},
    ],
  });
}

function hexNut(item,diameter,across,height){
  return spec(item,{
    level:'尺寸级',material:'darkMetal',
    assumptions:[
      `厂家明确公称规格M${diameter}；中心孔按公称直径${diameter}表达`,
      `六角对边${across}和厚度${height}按GB6170常用比例估算；螺距、牙型和公差未在本页标明`,
    ],
    primitives:[{
      type:'extrude',points:hexPoints(across/Math.sqrt(3)),depth:height,
      holes:[{kind:'circle',center:[0,0],radius:diameter/2}],bevel:.35,material:'darkMetal',
    }],
  });
}

function springWasher(item,nominal,wireRadius,pathRadius){
  const points=Array.from({length:36},(_,index)=>{
    const t=index/35;
    const angle=.1+t*Math.PI*1.8;
    return [
      Number((Math.cos(angle)*pathRadius).toFixed(4)),
      Number((Math.sin(angle)*pathRadius).toFixed(4)),
      Number(((t-.5)*wireRadius*1.5).toFixed(4)),
    ];
  });
  return spec(item,{
    level:'尺寸级',material:'darkMetal',
    assumptions:[
      `厂家明确公称规格${nominal}，模型按GB93弹簧垫圈的开口环语义建立`,
      `环径、线径${wireRadius*2}和翘高按常用比例估算；厂家本页未给公差`,
    ],
    primitives:[{type:'tube',points,radius:wireRadius,radialSegments:12,material:'darkMetal'}],
  });
}

function flatWasher(item,nominal,outerDiameter,thickness,standard){
  return spec(item,{
    level:'尺寸级',material:'metal',
    assumptions:[
      `厂家明确公称规格${nominal}，模型按${standard}平垫圈的圆环语义建立`,
      `外径${outerDiameter}和厚度${thickness}按相应国标常用比例估算；厂家本页未给公差`,
    ],
    primitives:[{
      type:'extrude',points:circlePoints(outerDiameter/2),depth:thickness,
      holes:[{kind:'circle',center:[0,0],radius:nominal/2}],bevel:.1,material:'metal',
    }],
  });
}

export const jwf1102P05ModelSpecs={
  [partKey(1)]:spec(1,{
    material:'darkMetal',
    assumptions:[
      '厂家未标外形尺寸；尘格宽约900、弧长420和栅条间距均按第3页可见比例估算',
      '按打手下方弧形尘格语义建立两侧弧形边框与多根横向栅条，不把打手部件并入本模型',
    ],
    primitives:[
      ...Array.from({length:9},(_,index)=>{
        const offset=index-4;
        return {type:'box',size:[880,12,18],position:[0,offset*46,offset*offset*7-90],material:'darkMetal'};
      }),
      {type:'tube',points:[[-455,-184,22],[-455,-92,-45],[-455,0,-90],[-455,92,-45],[-455,184,22]],radius:14,material:'metal'},
      {type:'tube',points:[[455,-184,22],[455,-92,-45],[455,0,-90],[455,92,-45],[455,184,22]],radius:14,material:'metal'},
      {type:'box',size:[940,28,38],position:[0,-205,32],material:'metal'},
      {type:'box',size:[940,28,38],position:[0,205,32],material:'metal'},
    ],
  }),

  [partKey(2)]:spec(2,{
    assumptions:[
      '厂家未标外形尺寸；机架约1800×1700×1050、立柱和横梁截面均按第3页整机比例估算',
      '模型只表达承重框架、上下横梁和底座层级，门罩、进出棉口、打手及标准件均保持独立',
    ],
    primitives:[
      {type:'box',size:[110,1700,110],position:[-845,0,-470],material:'darkMetal'},
      {type:'box',size:[110,1700,110],position:[845,0,-470],material:'darkMetal'},
      {type:'box',size:[110,1700,110],position:[-845,0,470],material:'darkMetal'},
      {type:'box',size:[110,1700,110],position:[845,0,470],material:'darkMetal'},
      ...[-760,-180,420,760].flatMap(y=>[
        {type:'box',size:[1800,90,90],position:[0,y,-470]},
        {type:'box',size:[1800,90,90],position:[0,y,470]},
      ]),
      {type:'box',size:[90,90,1050],position:[-845,-760,0]},
      {type:'box',size:[90,90,1050],position:[845,-760,0]},
      {type:'box',size:[90,90,1050],position:[-845,760,0]},
      {type:'box',size:[90,90,1050],position:[845,760,0]},
    ],
  }),

  [partKey(3)]:spec(3,{
    material:'darkMetal',
    assumptions:[
      '厂家未标外形尺寸；打手工作宽约850、转子直径约440、轴径和打击条尺寸按第3页内部可见比例估算',
      '按单轴流打手语义建立中心转子、端盘、贯通轴和六根纵向打击条；齿形与动平衡参数未恢复',
    ],
    primitives:[
      {type:'cylinder',radius:190,length:850,axis:'x',material:'darkMetal'},
      {type:'cylinder',radius:225,length:28,axis:'x',position:[-425,0,0],material:'metal'},
      {type:'cylinder',radius:225,length:28,axis:'x',position:[425,0,0],material:'metal'},
      {type:'cylinder',radius:42,length:1030,axis:'x',material:'metal'},
      ...Array.from({length:6},(_,index)=>{
        const angle=Math.PI*2*index/6;
        return {type:'box',size:[780,30,46],position:[0,Math.cos(angle)*205,Math.sin(angle)*205],rotation:[angle,0,0],material:'metal'};
      }),
    ],
  }),

  [partKey(4)]:spec(4,{
    assumptions:[
      '厂家未标外形尺寸；排杂口筒体约直径230×高520、法兰和壁厚按第4页比例估算',
      '按独立竖向排杂圆管、上下法兰和侧向安装耳表达，软管与接头不并入',
    ],
    primitives:[
      {type:'cylinder',radius:112,length:500,axis:'y'},
      {type:'torus',radius:116,tube:12,rotation:[Math.PI/2,0,0],position:[0,255,0],material:'darkMetal'},
      {type:'torus',radius:116,tube:12,rotation:[Math.PI/2,0,0],position:[0,-255,0],material:'darkMetal'},
      {type:'box',size:[80,28,150],position:[150,-205,0],material:'darkMetal'},
    ],
  }),

  [partKey(5)]:spec(5,{
    assumptions:[
      '厂家未标外形尺寸；单根撑挡长约1500、槽宽75、高55和板厚均按第4页比例估算',
      '数量为单台4件；模型展示单件帽形长撑挡及两端安装耳，不复制成四件装配',
    ],
    primitives:[
      {type:'box',size:[1500,8,75],position:[0,24,0]},
      {type:'box',size:[1500,55,8],position:[0,0,-33.5]},
      {type:'box',size:[1500,55,8],position:[0,0,33.5]},
      {type:'box',size:[75,75,120],position:[-720,0,0],material:'darkMetal'},
      {type:'box',size:[75,75,120],position:[720,0,0],material:'darkMetal'},
    ],
  }),

  [partKey(6)]:sideFrame(6,-1),
  [partKey(7)]:sideFrame(7,1),

  [partKey(8)]:spec(8,{
    assumptions:[
      '厂家未标外形尺寸；出棉口高约760、下部矩形口约620×430、上部圆口直径约420，均按第4页比例估算',
      '按矩形底口向圆形上口过渡的斜置风道语义建立，顶部圆法兰和底部安装边独立可见',
    ],
    primitives:[
      {type:'extrude',points:[[-310,-350],[310,-350],[205,350],[-205,350]],depth:8,position:[0,0,-210]},
      {type:'extrude',points:[[-310,-350],[310,-350],[205,350],[-205,350]],depth:8,position:[0,0,210]},
      {type:'box',size:[8,710,420],position:[-255,0,0],rotation:[0,0,-.15]},
      {type:'box',size:[8,710,420],position:[255,0,0],rotation:[0,0,.15]},
      {type:'torus',radius:210,tube:18,rotation:[Math.PI/2,0,0],position:[0,365,0],material:'darkMetal'},
      {type:'box',size:[700,30,500],position:[0,-365,0],material:'darkMetal'},
    ],
  }),

  [partKey(9)]:spec(9,{
    assumptions:[
      '厂家未标外形尺寸；进棉口约1200×760×620、上口与下口比例按第4页爆炸图估算',
      '按上部长矩形口向下部小矩形口收缩的钣金风斗建立，保留顶框、侧板和下部玻璃窗安装区；玻璃窗本体为标号48',
    ],
    primitives:[
      {type:'extrude',points:[[-600,350],[600,350],[390,-350],[-390,-350]],depth:8,position:[0,0,-300]},
      {type:'extrude',points:[[-600,350],[600,350],[390,-350],[-390,-350]],depth:8,position:[0,0,300]},
      {type:'box',size:[8,720,600],position:[-495,0,0],rotation:[0,0,-.29]},
      {type:'box',size:[8,720,600],position:[495,0,0],rotation:[0,0,.29]},
      {type:'box',size:[1240,34,650],position:[0,360,0],material:'darkMetal'},
      {type:'box',size:[820,34,650],position:[0,-360,0],material:'darkMetal'},
      {type:'box',size:[250,210,18],position:[170,-220,310],material:'darkMetal'},
    ],
  }),

  [partKey(10)]:spec(10,{
    assumptions:[
      '厂家未标外形尺寸；圆形防护罩外径约720、中心开口约560、罩深约130，均按第3页比例估算',
      '该件按右侧圆环形罩壳和周向安装耳表达；与标号11的长圆罩外形不同，二者不合并',
    ],
    primitives:[
      {type:'extrude',points:circlePoints(360),depth:100,holes:[{kind:'circle',center:[0,0],radius:280}],bevel:3},
      ...Array.from({length:8},(_,index)=>{
        const angle=Math.PI*2*index/8;
        return {type:'box',size:[65,36,125],position:[Math.cos(angle)*375,Math.sin(angle)*375,0],rotation:[0,0,angle],material:'darkMetal'};
      }),
    ],
  }),

  [partKey(11)]:spec(11,{
    assumptions:[
      '厂家未标外形尺寸；长圆防护罩约760×500×120，圆角与翻边按第3页左侧分离罩比例估算',
      '模型按竖向胶囊形封闭罩壳、侧壁和四个锁扣耳表达；中心不做圆形开口，以区别标号10',
    ],
    primitives:[
      {type:'extrude',points:[[-180,-380],[180,-380],[250,-250],[250,250],[180,380],[-180,380],[-250,250],[-250,-250]],depth:86,bevel:8},
      {type:'extrude',points:[[-190,-390],[190,-390],[265,-260],[265,260],[190,390],[-190,390],[-265,260],[-265,-260]],depth:18,position:[0,0,-50],material:'darkMetal'},
      {type:'box',size:[75,38,125],position:[275,210,0],material:'metal'},
      {type:'box',size:[75,38,125],position:[275,-210,0],material:'metal'},
      {type:'box',size:[75,38,125],position:[-275,210,0],material:'metal'},
      {type:'box',size:[75,38,125],position:[-275,-210,0],material:'metal'},
    ],
  }),

  [partKey(12)]:spec(12,{
    material:'metal',
    assumptions:[
      '厂家未标外形尺寸；垫板约直径210、厚12，中心支承台和孔径按第3页机脚比例估算',
      '数量为单台4件；模型展示单个圆形机脚垫板，不并入标号28螺栓和34螺母',
    ],
    primitives:[
      {type:'cylinder',radius:105,length:12,axis:'y',material:'metal'},
      {type:'cylinder',radiusTop:45,radiusBottom:75,length:28,axis:'y',position:[0,20,0],material:'darkMetal'},
      {type:'cylinder',radius:11,length:44,axis:'y',position:[0,20,0],material:'metal'},
    ],
  }),

  [partKey(13)]:spec(13,{
    assumptions:[
      '厂家未标外形尺寸；后侧板约1450×180×25、折边和孔位按第4页上部长板比例估算',
      '按长条钣金后侧板、上下折边和两端安装孔表达，不把撑挡或标准件合并',
    ],
    primitives:[
      {type:'extrude',points:[[-725,-90],[725,-90],[725,90],[-725,90]],depth:8,holes:[
        {kind:'circle',center:[-680,0],radius:8},{kind:'circle',center:[680,0],radius:8},
      ],bevel:1},
      {type:'box',size:[1450,28,18],position:[0,-80,-12],material:'darkMetal'},
      {type:'box',size:[1450,28,18],position:[0,80,-12],material:'darkMetal'},
    ],
  }),

  [partKey(14)]:spec(14,{
    assumptions:[
      '厂家未标外形尺寸；单块封板约980×620×5、孔位按第4页框架侧面板比例估算',
      '数量为单台2件；模型展示单块薄板及周边安装孔，不复制数量也不并入左右框',
    ],
    primitives:[{
      type:'extrude',points:[[-490,-310],[490,-310],[490,310],[-490,310]],depth:5,holes:[
        {kind:'circle',center:[-450,-270],radius:7},{kind:'circle',center:[450,-270],radius:7},
        {kind:'circle',center:[-450,270],radius:7},{kind:'circle',center:[450,270],radius:7},
      ],bevel:.7,
    }],
  }),

  [partKey(15)]:spec(15,{
    material:'rubber',
    assumptions:[
      '厂家仅给“软管”和单台1件，未给管径或长度；外径约38、展示长度约720按第4页比例估算',
      '按柔性弯管语义建立连续曲线和两端接口，未把标号47气动接头并入',
    ],
    primitives:[
      {type:'tube',points:[[-300,-180,0],[-220,-70,25],[-90,40,15],[70,65,-20],[210,10,-35],[300,120,0]],radius:19,radialSegments:16,material:'rubber'},
      {type:'torus',radius:22,tube:5,rotation:[0,Math.PI/2,0],position:[-305,-185,0],material:'darkMetal'},
      {type:'torus',radius:22,tube:5,rotation:[0,Math.PI/2,0],position:[305,125,0],material:'darkMetal'},
    ],
  }),

  [partKey(16)]:spec(16,{
    material:'plastic',
    assumptions:[
      '厂家未标尺寸；禁令牌约160×100×4、吊孔与凸起图形按第3页可见比例估算',
      '模型表达独立矩形警示牌、圆角轮廓和顶部吊孔；文字内容无法从总图恢复，未臆造',
    ],
    primitives:[
      {type:'extrude',points:[[-80,-50],[80,-50],[80,50],[-80,50]],depth:4,holes:[{kind:'circle',center:[0,35],radius:7}],bevel:4,material:'plastic'},
      {type:'box',size:[105,8,7],position:[0,-12,5],rotation:[0,0,-.55],material:'darkMetal'},
    ],
  }),

  [partKey(17)]:spec(17,{
    material:'darkMetal',
    assumptions:[
      '厂家未标尺寸；光电管架约140×90×55、折弯高度和孔径按第4页局部放大框比例估算',
      '按L形折弯支架、传感器圆孔和安装长孔语义建立；透光板为标号18，未并入',
    ],
    primitives:[
      {type:'extrude',points:[[-70,-45],[70,-45],[70,45],[-70,45]],depth:5,holes:[
        {kind:'circle',center:[-35,0],radius:10},{kind:'circle',center:[35,0],radius:10},
      ],bevel:1,material:'darkMetal'},
      {type:'extrude',points:[[-70,-27.5],[70,-27.5],[70,27.5],[-70,27.5]],depth:5,position:[0,47,-25],rotation:[Math.PI/2,0,0],holes:[{kind:'circle',center:[0,0],radius:18}],material:'metal'},
    ],
  }),

  [partKey(18)]:spec(18,{
    material:'glass',
    assumptions:[
      '厂家未标尺寸；透光板约直径72、厚5，按第4页光电管架局部放大框比例估算',
      '数量为单台2件；模型展示单个透明圆片及外缘，不与光电管架合并',
    ],
    primitives:[
      {type:'extrude',points:circlePoints(36),depth:5,bevel:.5,material:'glass'},
      {type:'torus',radius:34,tube:2,position:[0,0,2.5],material:'plastic'},
    ],
  }),

  [partKey(20)]:spec(20,{
    level:'尺寸级',material:'metal',
    assumptions:[
      '厂家明确规格为M8X20；公称直径8和杆长20据此建立',
      'GB14按圆头方颈螺栓语义表达；圆头直径、头高和方颈尺寸按常用比例估算，螺距与公差未标',
    ],
    primitives:[
      {type:'cylinder',radius:4,length:20,axis:'z',position:[0,0,5],material:'metal'},
      {type:'box',size:[8,8,5],position:[0,0,-7.5],material:'darkMetal'},
      {type:'cylinder',radiusTop:7.8,radiusBottom:5.8,length:5,axis:'z',position:[0,0,-12.5],material:'metal'},
    ],
  }),

  [partKey(21)]:hexBolt(21,4,12,7,2.8),
  [partKey(22)]:hexBolt(22,6,12,10,4),
  [partKey(23)]:hexBolt(23,6,16,10,4),
  [partKey(24)]:hexBolt(24,6,20,10,4),
  [partKey(25)]:hexBolt(25,6,30,10,4),
  [partKey(26)]:hexBolt(26,8,20,13,5.3),
  [partKey(27)]:hexBolt(27,16,40,24,10),
  [partKey(28)]:hexBolt(28,16,80,24,10),

  [partKey(29)]:spec(29,{
    level:'尺寸级',material:'metal',
    assumptions:[
      '厂家明确公称规格M16；GB825按吊环螺钉语义建立螺杆和封闭吊环',
      '厂家未给杆长、环外径、截面和螺距；展示杆长45、环外径64均按常用比例估算',
    ],
    primitives:[
      {type:'cylinder',radius:8,length:45,axis:'z',position:[0,0,-22.5],material:'metal'},
      {type:'torus',radius:24,tube:8,rotation:[Math.PI/2,0,0],position:[0,0,12],material:'darkMetal'},
      {type:'box',size:[28,16,20],position:[0,0,-2],material:'darkMetal'},
    ],
  }),

  [partKey(30)]:hexNut(30,4,7,3.2),
  [partKey(32)]:hexNut(32,6,10,5),
  [partKey(33)]:hexNut(33,8,13,6.5),
  [partKey(34)]:hexNut(34,16,24,13),

  [partKey(35)]:springWasher(35,4,.8,3.4),
  [partKey(36)]:springWasher(36,6,1.1,4.8),
  [partKey(37)]:springWasher(37,8,1.3,6.2),
  [partKey(38)]:springWasher(38,16,2.5,11.8),

  [partKey(39)]:flatWasher(39,6,18,1.6,'GB96大垫圈'),
  [partKey(40)]:flatWasher(40,16,44,4,'GB96大垫圈'),
  [partKey(41)]:flatWasher(41,4,9,0.8,'GB97.1平垫圈'),
  [partKey(43)]:flatWasher(43,6,12,1.6,'GB97.1平垫圈'),
  [partKey(44)]:flatWasher(44,8,16,1.6,'GB97.1平垫圈'),
  [partKey(45)]:flatWasher(45,16,30,3,'GB97.1平垫圈'),

  [partKey(47)]:spec(47,{
    material:'plastic',
    assumptions:[
      '厂家名称栏明确为“接头 QS-1/8-8”，备注栏为FESTO；厂家件号栏为空，模型和元数据均不反填件号',
      'QS-1/8-8只作为型号规格保留；接头总长、六角尺寸和螺纹细节按第4页局部放大图作轮廓估算，不作为加工尺寸',
    ],
    primitives:[
      {type:'cylinder',radius:7,length:18,axis:'x',position:[-24,0,0],material:'metal'},
      {type:'torus',radius:7.5,tube:1.1,rotation:[0,Math.PI/2,0],position:[-30,0,0],material:'darkMetal'},
      {type:'cylinder',radius:11.5,length:15,axis:'x',segments:6,position:[-7.5,0,0],material:'brass'},
      {type:'cylinder',radius:10,length:22,axis:'x',position:[11,0,0],material:'plastic'},
      {type:'torus',radius:8.5,tube:2,rotation:[0,Math.PI/2,0],position:[24,0,0],material:'plastic'},
      {type:'cylinder',radius:6.2,length:8,axis:'x',position:[27,0,0],material:'darkMetal'},
    ],
  }),

  [partKey(48)]:spec(48,{
    assumptions:[
      '厂家未标外形尺寸；玻璃窗结合件约230×165×18、框宽25和安装孔按第4页标号48位置比例估算',
      '按矩形金属窗框、独立透明玻璃和四角安装耳表达；该件位于进棉口下部，但不与标号9合并',
    ],
    primitives:[
      {type:'extrude',points:[[-115,-82.5],[115,-82.5],[115,82.5],[-115,82.5]],depth:14,holes:[
        {kind:'polygon',points:[[-88,-58],[88,-58],[88,58],[-88,58]]},
      ],bevel:2,material:'paintedMetal'},
      {type:'box',size:[176,116,5],position:[0,0,0],material:'glass'},
      {type:'box',size:[34,24,18],position:[-122,-70,0],material:'darkMetal'},
      {type:'box',size:[34,24,18],position:[122,-70,0],material:'darkMetal'},
      {type:'box',size:[34,24,18],position:[-122,70,0],material:'darkMetal'},
      {type:'box',size:[34,24,18],position:[122,70,0],material:'darkMetal'},
    ],
  }),
};
