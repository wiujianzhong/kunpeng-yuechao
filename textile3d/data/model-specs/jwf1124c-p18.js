// JWF1124C-160 厂家PDF第17页爆炸图、第18页32项明细：逐件3D规格。
// 坐标单位为毫米；厂家未标出的外形尺寸仅作视觉估算，并全部写入 assumptions。

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

const source=(item,code,dimensions,assumptions)=>({
  page:18,
  item,
  code,
  recordKey:`jwf1124c-p18-item-${String(item).padStart(2,'0')}`,
  dimensions,
  views:[`第17页排尘部件爆炸图标号${item}`,'第18页厂家明细原格'],
  assumptions,
});

const rectangle=(width,height)=>[
  [-width/2,-height/2],[width/2,-height/2],[width/2,height/2],[-width/2,height/2],
];

function plateSpec(item,code,points,depth,holes,note,extras=[]){
  return {
    level:'轮廓级',material:'paintedMetal',
    source:source(item,code,[],[
      note,
      '厂家第18页未给单件尺寸；轮廓、板厚、孔位和折边均按第17页对应标号的可见比例估算，不作加工依据。',
    ]),
    primitives:[
      {type:'extrude',points,depth,holes,bevel:.5,material:'paintedMetal'},
      ...extras,
    ],
  };
}

function squareCollar(item,code,width,height,depth,flange,roundOutlet=false){
  const hole=roundOutlet
    ?{kind:'circle',center:[0,0],radius:Math.min(width,height)*.31}
    :{kind:'polygon',points:rectangle(width*.64,height*.64)};
  return {
    level:'轮廓级',material:'paintedMetal',
    source:source(item,code,[],[
      `标号${item}按爆炸图建立为${roundOutlet?'方形法兰带圆口':'方接圈短节'}，与另一方接圈保持不同外廓和接口形式。`,
      `厂家未标尺寸；外廓约${width}×${height}、深${depth}和法兰宽${flange}均按图形比例估算。`,
    ]),
    primitives:[
      {type:'extrude',points:rectangle(width,height),depth:flange,holes:[hole],bevel:1,material:'paintedMetal'},
      ...(roundOutlet?[
        {type:'cylinder',radius:Math.min(width,height)*.31,length:depth,axis:'z',position:[0,0,-depth/2],material:'darkMetal'},
        {type:'torus',radius:Math.min(width,height)*.31,tube:4,position:[0,0,-depth],material:'metal'},
      ]:[
        {type:'box',size:[width*.64,10,depth],position:[0,-height*.32,-depth/2],material:'darkMetal'},
        {type:'box',size:[width*.64,10,depth],position:[0,height*.32,-depth/2],material:'darkMetal'},
        {type:'box',size:[10,height*.64,depth],position:[-width*.32,0,-depth/2],material:'darkMetal'},
        {type:'box',size:[10,height*.64,depth],position:[width*.32,0,-depth/2],material:'darkMetal'},
      ]),
    ],
  };
}

function hexBolt(item,diameter,length){
  const code='GB5783',across=10,headHeight=4;
  return {
    level:'尺寸级',material:'metal',
    source:source(item,code,[`M${diameter}X${length}`],[
      `公称直径M${diameter}和杆长${length}取自厂家第18页明细。`,
      `六角头对边${across}、头高${headHeight}按GB5783常用M6比例表达；螺距和公差未标。`,
    ]),
    primitives:[
      {type:'cylinder',radius:diameter/2,length,axis:'z',material:'metal'},
      {type:'cylinder',radius:across/Math.sqrt(3),length:headHeight,axis:'z',segments:6,position:[0,0,-(length+headHeight)/2],material:'darkMetal'},
      {type:'torus',radius:diameter*.46,tube:.22,position:[0,0,length*.28],material:'darkMetal'},
      {type:'torus',radius:diameter*.46,tube:.22,position:[0,0,length*.04],material:'darkMetal'},
    ],
  };
}

function panScrew(item,code,diameter,length,drive){
  const headDiameter=diameter===5?9.5:12,headHeight=diameter===5?3.1:3.6;
  const drivePrimitives=drive==='cross'?[
    {type:'box',size:[headDiameter*.58,.7,.45],position:[0,0,-(length/2+headHeight+.25)],material:'darkMetal'},
    {type:'box',size:[.7,headDiameter*.58,.45],position:[0,0,-(length/2+headHeight+.25)],material:'darkMetal'},
  ]:[
    {type:'box',size:[headDiameter*.62,.8,.45],position:[0,0,-(length/2+headHeight+.25)],material:'darkMetal'},
  ];
  return {
    level:'尺寸级',material:'metal',
    source:source(item,code,[`M${diameter}X${length}`],[
      `公称直径M${diameter}和杆长${length}取自厂家第18页明细。`,
      `${code}按${drive==='cross'?'十字槽':'一字槽'}盘头螺钉表达；头径${headDiameter}、头高${headHeight}按相应标准常用比例估算。`,
    ]),
    primitives:[
      {type:'cylinder',radius:diameter/2,length,axis:'z',material:'metal'},
      {type:'cylinder',radiusTop:headDiameter*.44,radiusBottom:headDiameter/2,length:headHeight,axis:'z',position:[0,0,-(length+headHeight)/2],material:'metal'},
      ...drivePrimitives,
      {type:'torus',radius:diameter*.46,tube:.2,position:[0,0,length*.22],material:'darkMetal'},
    ],
  };
}

function washer(item,code,nominal,outer,thickness){
  return {
    level:'尺寸级',material:'metal',
    source:source(item,code,[String(nominal)],[
      `垫圈公称规格${nominal}取自厂家第18页明细。`,
      `外径${outer}、厚${thickness}按${code}常用规格表达；厂家本页未列公差。`,
    ]),
    primitives:[{
      type:'extrude',points:circlePoints(outer/2),depth:thickness,
      holes:[{kind:'circle',center:[0,0],radius:nominal/2}],bevel:.12,material:'metal',
    }],
  };
}

function springHose(item,code,diameter,length){
  const curvePoints=Array.from({length:9},(_,index)=>{
    const t=index/8,x=(t-.5)*length;
    return [x,Math.sin(t*PI)*diameter*.34,Math.sin(t*PI*2)*diameter*.1];
  });
  const rings=Array.from({length:length===1200?18:26},(_,index)=>{
    const t=(index+1)/(length===1200?19:27),x=(t-.5)*length;
    const y=Math.sin(t*PI)*diameter*.34,z=Math.sin(t*PI*2)*diameter*.1;
    return {type:'torus',radius:diameter*.47,tube:2.2,position:[x,y,z],rotation:[0,PI/2,0],material:'rubber'};
  });
  return {
    level:'尺寸级',material:'plastic',
    source:source(item,code,[`φ${diameter}X${length}`],[
      `软管外径φ${diameter}、展开长度${length}取自厂家第18页件号。`,
      '主体明确按塑料软管建模，外圈以橡胶加强筋表达弹簧纹理，不使用金属主体材质。',
      '弯曲中心线和加强筋节距按第17页爆炸图作视觉表达；展开长度、公差及真实钢丝结构未标。',
    ]),
    primitives:[
      {type:'tube',points:curvePoints,radius:diameter*.43,radialSegments:24,material:'plastic'},
      ...rings,
    ],
  };
}

export const jwf1124cP18ModelSpecs={
  'JWF1124C-160-0500-4A':{
    level:'轮廓级',material:'paintedMetal',
    source:source(1,'JWF1124C-160-0500-4A',[],[
      '按第17页左上标号1建立下部矩形集尘箱、四棱锥过渡段、顶部圆接口及法兰；不并入标号2、7、24、30、31。',
      '厂家未标单件尺寸；箱体约260×260×460、过渡段高230和圆口直径150均按爆炸图比例估算。',
    ]),
    primitives:[
      {type:'box',size:[260,460,260],position:[0,-230,0],material:'paintedMetal'},
      {type:'cylinder',radiusTop:78,radiusBottom:176,length:230,axis:'y',segments:4,position:[0,115,0],rotation:[0,PI/4,0],material:'paintedMetal'},
      {type:'cylinder',radius:76,length:90,axis:'y',position:[0,275,0],material:'darkMetal'},
      {type:'torus',radius:82,tube:8,position:[0,320,0],rotation:[PI/2,0,0],material:'metal'},
      {type:'box',size:[292,14,292],position:[0,-467,0],material:'darkMetal'},
    ],
  },

  'JWF1124C-180-0500-2':squareCollar(2,'JWF1124C-180-0500-2',250,210,140,18,false),

  'JWF1124C-180-0500-7':plateSpec(3,'JWF1124C-180-0500-7',[
    [-88,-72],[64,-72],[88,-46],[88,72],[-88,72],
  ],6,[{kind:'circle',center:[-62,46],radius:7},{kind:'circle',center:[62,46],radius:7}],
  '标号3为机架右下侧较宽调风板，模型保留上角缺口、双安装孔和背面加强折边。',[
    {type:'box',size:[150,12,18],position:[0,-57,-10],material:'darkMetal'},
    {type:'cylinder',radius:11,length:28,axis:'z',position:[55,0,-16],material:'metal'},
  ]),

  'JWF1124C-180-0500-8A':plateSpec(4,'JWF1124C-180-0500-8A',[
    [-68,-92],[68,-92],[68,54],[42,92],[-68,92],
  ],6,[{kind:'circle',center:[-45,-65],radius:6},{kind:'circle',center:[45,-65],radius:6}],
  '标号4为机架上侧较窄调风板，与标号3的宽度、斜角方向、孔位和转轴位置分别建立。',[
    {type:'box',size:[12,150,20],position:[54,-5,-11],material:'darkMetal'},
    {type:'cylinder',radius:10,length:30,axis:'z',position:[0,68,-17],material:'metal'},
  ]),

  'JWF1124C-180-0500-9':squareCollar(5,'JWF1124C-180-0500-9',205,185,105,16,true),

  'JWF1124-0526':{
    level:'轮廓级',material:'rubber',
    source:source(6,'JWF1124-0526',[],[
      '标号6位于第17页右下长条构件下方，按柔性软管建立，并与标号31气动接头保持独立。',
      '厂家未标直径和长度；约φ16、长420及弯曲路径按爆炸图比例估算，材质按软管语义使用橡胶。',
    ]),
    primitives:[{
      type:'tube',radius:8,radialSegments:16,material:'rubber',points:[
        [-205,-30,0],[-155,-12,8],[-90,10,22],[-20,18,12],[55,2,-5],[125,-20,-12],[205,-28,0],
      ],
    }],
  },

  'JWF1124C-180-0501':{
    level:'轮廓级',material:'plastic',
    source:source(7,'JWF1124C-180-0501',[],[
      '标号7为集尘器上部连接区域的细气管，按塑料气管建立；标号31接头单独建模。',
      '厂家未标直径和长度；约φ8、长520及折弯路径按爆炸图比例估算。',
    ]),
    primitives:[{
      type:'tube',radius:4,radialSegments:14,material:'plastic',points:[
        [-250,-20,0],[-180,-12,0],[-115,12,12],[-42,24,16],[45,18,8],[125,-4,0],[250,-8,0],
      ],
    }],
  },

  'JWF1124C-180-0513':plateSpec(8,'JWF1124C-180-0513',[
    [-18,-175],[18,-175],[18,175],[-18,175],
  ],5,[{kind:'circle',center:[0,-145],radius:5},{kind:'circle',center:[0,145],radius:5}],
  '标号8为长直挡边，按双端孔窄条建立；长度和孔距不同于标号12。',[
    {type:'box',size:[16,350,18],position:[13,0,-11],material:'darkMetal'},
  ]),

  'JWF1124C-180-0514':plateSpec(9,'JWF1124C-180-0514',[
    [-72,-118],[58,-118],[72,-104],[72,118],[-72,118],
  ],5,[{kind:'circle',center:[-45,-88],radius:5},{kind:'circle',center:[-45,88],radius:5}],
  '标号9挡板按右下长板、右侧折角和左侧双孔独立建立；不得与其他同名挡板共用轮廓。'),

  'JWF1124C-180-0524':plateSpec(10,'JWF1124C-180-0524',[
    [-24,-160],[24,-160],[24,112],[8,160],[-24,160],
  ],4,[{kind:'circle',center:[0,-132],radius:4},{kind:'circle',center:[0,92],radius:4}],
  '标号10挡板是上部窄长件，保留单侧斜顶和不等距双孔，独立于标号11及13—19。'),

  'JWF1124C-180-0525':plateSpec(11,'JWF1124C-180-0525',[
    [-20,-190],[20,-190],[20,190],[-20,190],
  ],5,[{kind:'circle',center:[0,-158],radius:5},{kind:'circle',center:[0,0],radius:5},{kind:'circle',center:[0,158],radius:5}],
  '标号11挡板按三孔直长条建立，长度、孔数和轮廓与标号10分别保存。',[
    {type:'box',size:[12,380,16],position:[15,0,-10],material:'darkMetal'},
  ]),

  'JWF1124C-180-0526':plateSpec(12,'JWF1124C-180-0526',[
    [-15,-138],[22,-138],[22,138],[-15,138],
  ],5,[{kind:'circle',center:[2,-108],radius:4},{kind:'circle',center:[2,108],radius:4}],
  '标号12为较短偏置挡边，按窄条、双端孔和单侧折边建立，与标号8保持不同长度与截面。',[
    {type:'box',size:[14,276,14],position:[16,0,-9],material:'darkMetal'},
  ]),

  'JWF1124C-180-0537':plateSpec(13,'JWF1124C-180-0537',[
    [-58,-90],[58,-90],[58,52],[24,90],[-58,90],
  ],5,[{kind:'circle',center:[-34,-62],radius:5}],
  '标号13挡板按单孔、右上斜角的短板独立建立。'),

  'JWF1124C-180-0538':plateSpec(14,'JWF1124C-180-0538',[
    [-16,-170],[22,-170],[22,170],[-16,170],
  ],4,[{kind:'circle',center:[3,-140],radius:4},{kind:'circle',center:[3,140],radius:4}],
  '标号14挡板按细长双孔板建立，并以更窄外廓区别标号10、11和16—19。'),

  'JWF1124C-180-0539':plateSpec(15,'JWF1124C-180-0539',[
    [-112,-48],[92,-48],[112,-25],[112,48],[-112,48],
  ],5,[{kind:'circle',center:[-82,0],radius:5},{kind:'circle',center:[78,0],radius:5}],
  '标号15挡板按横向低矮双孔板和右端斜角建立，不套用任何竖向挡板轮廓。',[
    {type:'box',size:[205,14,16],position:[0,-38,-10],material:'darkMetal'},
  ]),

  'JWF1124C-180-0540':plateSpec(16,'JWF1124C-180-0540',[
    [-21,-145],[21,-145],[21,145],[-21,145],
  ],6,[{kind:'circle',center:[0,-112],radius:6},{kind:'circle',center:[0,0],radius:4},{kind:'circle',center:[0,112],radius:6}],
  '标号16挡板按中孔较小、端孔较大的三孔直板独立建立。'),

  'JWF1124C-180-0541':plateSpec(17,'JWF1124C-180-0541',[
    [-30,-152],[18,-152],[30,-118],[30,152],[-18,152],[-30,118],
  ],5,[{kind:'circle',center:[0,-118],radius:5},{kind:'circle',center:[0,118],radius:5}],
  '标号17挡板按两端对向斜角的双孔板建立，外廓与其他同名件不同。'),

  'JWF1124C-180-0542':plateSpec(18,'JWF1124C-180-0542',[
    [-25,-182],[25,-182],[25,130],[10,182],[-25,182],
  ],5,[{kind:'circle',center:[0,-150],radius:5},{kind:'circle',center:[0,-20],radius:5},{kind:'circle',center:[0,120],radius:5}],
  '标号18挡板按较长三孔板和单侧斜顶建立，孔距和长度均独立保存。'),

  'JWF1124C-180-0543':plateSpec(19,'JWF1124C-180-0543',[
    [-27,-165],[27,-165],[27,165],[-27,165],
  ],6,[{kind:'circle',center:[0,-132],radius:5},{kind:'circle',center:[0,132],radius:5}],
  '标号19挡板按宽直双孔板和背面加强折边建立，不与标号14共用模型。',[
    {type:'box',size:[16,330,20],position:[20,0,-12],material:'darkMetal'},
  ]),

  'TZH1108-φ125X1200':springHose(20,'TZH1108-φ125X1200',125,1200),
  'TZH1108-φ125X1800':springHose(21,'TZH1108-φ125X1800',125,1800),

  'jwf1124c-p18-item-22':hexBolt(22,6,16),
  'jwf1124c-p18-item-23':hexBolt(23,6,20),
  'jwf1124c-p18-item-24':hexBolt(24,6,30),
  'jwf1124c-p18-item-25':panScrew(25,'GB818',5,8,'cross'),
  'jwf1124c-p18-item-26':panScrew(26,'GB818',6,10,'cross'),
  'GB835':panScrew(27,'GB835',6,12,'slot'),

  'GB6170':{
    level:'尺寸级',material:'darkMetal',
    source:source(28,'GB6170',['M6'],[
      '螺母公称螺纹M6取自厂家第18页明细。',
      '六角对边10、厚5按GB6170常用M6规格表达；牙型和公差未作加工级建模。',
    ]),
    primitives:[{
      type:'extrude',points:hexPoints(10),depth:5,
      holes:[{kind:'circle',center:[0,0],radius:3}],bevel:.5,material:'darkMetal',
    }],
  },

  'GB96':washer(29,'GB96',5,15,1.2),
  'GB97.1':washer(30,'GB97.1',6,12,1.6),

  'jwf1124c-p18-item-31':{
    level:'尺寸级',material:'brass',
    source:source(31,'',['QS-1/8-8'],[
      '厂家件号栏为空；QS-1/8-8取自名称栏，按1/8英寸外螺纹至8毫米气管的直通快插接头建模。',
      '螺纹牙型、六角对边和总长未标，分别按常见QS气动接头比例表达；recordKey用于唯一定位。',
    ]),
    primitives:[
      {type:'cylinder',radius:4.8,length:12,axis:'x',position:[-18,0,0],material:'brass'},
      {type:'cylinder',radius:8.1,length:11,axis:'x',segments:6,position:[-6.5,0,0],material:'brass'},
      {type:'cylinder',radiusTop:6,radiusBottom:7.4,length:12,axis:'x',position:[5,0,0],material:'brass'},
      {type:'cylinder',radius:7.2,length:6,axis:'x',position:[14,0,0],material:'plastic'},
      {type:'torus',radius:5.4,tube:1.1,position:[17,0,0],rotation:[0,PI/2,0],material:'darkMetal'},
      {type:'torus',radius:4.5,tube:.45,position:[-22,0,0],rotation:[0,PI/2,0],material:'darkMetal'},
      {type:'torus',radius:4.5,tube:.45,position:[-19,0,0],rotation:[0,PI/2,0],material:'darkMetal'},
      {type:'torus',radius:4.5,tube:.45,position:[-16,0,0],rotation:[0,PI/2,0],material:'darkMetal'},
    ],
  },

  'jwf1124c-p18-item-32':{
    level:'尺寸级',material:'metal',
    source:source(32,'',['130(110-130)'],[
      '厂家件号栏为空；名称栏明确卡箍规格130(110-130)，按适用直径110—130的金属管卡建模。',
      '环带厚度、锁紧盒和螺钉尺寸未标，按第17页软管端部卡箍外形估算；recordKey用于唯一定位。',
    ]),
    primitives:[
      {type:'torus',radius:60,tube:3.2,material:'metal'},
      {type:'torus',radius:64,tube:1.1,material:'darkMetal'},
      {type:'box',size:[30,18,13],position:[58,18,0],rotation:[0,0,.35],material:'darkMetal'},
      {type:'cylinder',radius:3,length:42,axis:'x',position:[68,22,0],rotation:[0,0,.35],material:'metal'},
      {type:'cylinder',radius:6,length:4,axis:'x',position:[88,29,0],rotation:[0,0,.35],material:'darkMetal'},
    ],
  },
};
