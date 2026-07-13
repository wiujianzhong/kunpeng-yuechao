// JWF1102 厂家PDF第13页ZFA113A-0300A尘格部件爆炸图、第14页18项明细：逐件3D规格。
// 坐标单位为毫米；厂家未标注的外形尺寸只作视觉估算，并全部写入 assumptions。

const circlePoints=(radius,count=48)=>Array.from({length:count},(_,index)=>{
  const angle=Math.PI*2*index/count;
  return [Number((Math.cos(angle)*radius).toFixed(4)),Number((Math.sin(angle)*radius).toFixed(4))];
});

const hexPoints=radius=>Array.from({length:6},(_,index)=>{
  const angle=Math.PI/6+Math.PI*2*index/6;
  return [Number((Math.cos(angle)*radius).toFixed(4)),Number((Math.sin(angle)*radius).toFixed(4))];
});

const starPoints=(outer,inner,count=10)=>Array.from({length:count*2},(_,index)=>{
  const angle=Math.PI*2*index/(count*2);
  const radius=index%2?inner:outer;
  return [Number((Math.cos(angle)*radius).toFixed(4)),Number((Math.sin(angle)*radius).toFixed(4))];
});

const arcBandPoints=(outer,inner,start,end,count=36)=>[
  ...Array.from({length:count},(_,index)=>{
    const angle=start+(end-start)*index/(count-1);
    return [Number((Math.cos(angle)*outer).toFixed(4)),Number((Math.sin(angle)*outer).toFixed(4))];
  }),
  ...Array.from({length:count},(_,index)=>{
    const angle=end-(end-start)*index/(count-1);
    return [Number((Math.cos(angle)*inner).toFixed(4)),Number((Math.sin(angle)*inner).toFixed(4))];
  }),
];

const parts={
  1:{code:'ZFA113A-0300-1A',nameZh:'调节板结合件(一)',quantity:1,dimensions:[]},
  2:{code:'ZFA113A-0300-2A',nameZh:'调节板结合件(二)',quantity:1,dimensions:[]},
  3:{code:'ZFA113A-0300-3',nameZh:'调节偏心轴结合件',quantity:2,dimensions:[]},
  4:{code:'ZFA113-0300-1C',nameZh:'尘棒结合件(一)',quantity:40,dimensions:[]},
  5:{code:'ZFA113-0300-2C',nameZh:'尘棒结合件(二)',quantity:40,dimensions:[]},
  6:{code:'ZFA113A-0301A',nameZh:'调节指示座(一)',quantity:1,dimensions:[]},
  7:{code:'ZFA113A-0302A',nameZh:'调节指示座(二)',quantity:1,dimensions:[]},
  8:{code:'ZFA113A-0303',nameZh:'操作杆',quantity:2,dimensions:[]},
  9:{code:'ZFA113-0302',nameZh:'拉杆(二)',quantity:2,dimensions:[]},
  10:{code:'ZFA113-0303',nameZh:'拉杆(三)',quantity:2,dimensions:[]},
  11:{code:'FA103-0305',nameZh:'指针',quantity:2,dimensions:[]},
  12:{code:'FA103-0306',nameZh:'调节座圈',quantity:2,dimensions:[]},
  13:{code:'JB/T7274.4-1994',nameZh:'把手 BM16X63',quantity:2,dimensions:['BM16X63']},
  14:{code:'JB/T7271.1-94',nameZh:'手柄球 M12X40',quantity:2,dimensions:['M12X40']},
  15:{code:'GB1096-79',nameZh:'键 5X20',quantity:2,dimensions:['5X20']},
  16:{code:'GB6170',nameZh:'螺母 M10',quantity:4,dimensions:['M10']},
  17:{code:'GB97.1',nameZh:'垫圈 10',quantity:4,dimensions:['10']},
  18:{code:'GB97.1',nameZh:'垫圈 16',quantity:2,dimensions:['16']},
};

const source=(item,assumptions)=>{
  const part=parts[item];
  return {
    page:14,
    item,
    code:part.code,
    recordKey:`jwf1102-p14-item-${String(item).padStart(3,'0')}`,
    nameZh:part.nameZh,
    quantity:{value:part.quantity,unit:'件',meaning:'单台设备用量'},
    dimensions:part.dimensions,
    views:[`第13页尘格部件爆炸图标号${item}`,'第14页厂家明细行'],
    assumptions,
  };
};

const spec=(item,{level='轮廓级',material='paintedMetal',assumptions,primitives})=>({
  level,material,source:source(item,assumptions),primitives,
});

function adjustingPlate(item,side){
  const start=Math.PI+.24;
  const end=Math.PI*2-.24;
  const ticks=Array.from({length:30},(_,index)=>{
    const angle=start+(end-start)*(index+.5)/30;
    return {
      type:'box',size:[12,56,20],
      position:[Math.cos(angle)*380,Math.sin(angle)*380,side*12],
      rotation:[0,0,angle+Math.PI/2],material:'darkMetal',
    };
  });
  return spec(item,{
    assumptions:[
      '厂家未标外形尺寸；弧板外半径约460、内半径约345、板厚12和槽距均按第13页爆炸图比例估算',
      `该件按${item===1?'左侧':'右侧'}弧形调节板、内弧尘棒槽、端部耳板和调节孔表达；与另一侧调节板件号及recordKey独立`,
    ],
    primitives:[
      {type:'extrude',points:arcBandPoints(460,345,start,end),depth:12,bevel:2},
      {type:'box',size:[120,230,26],position:[-405,-5,side*6],rotation:[0,0,-.16],material:'darkMetal'},
      {type:'box',size:[120,230,26],position:[405,-5,side*6],rotation:[0,0,.16],material:'darkMetal'},
      {type:'cylinder',radius:18,length:34,axis:'z',position:[-405,55,side*6],material:'metal'},
      {type:'cylinder',radius:18,length:34,axis:'z',position:[405,55,side*6],material:'metal'},
      ...ticks,
    ],
  });
}

function indicatorSeat(item,mirror){
  const ticks=Array.from({length:13},(_,index)=>{
    const angle=Math.PI*.18+Math.PI*1.18*index/12;
    return {
      type:'box',size:[4,index%3===0?18:12,7],
      position:[Math.cos(angle)*116,Math.sin(angle)*116,8],
      rotation:[0,0,angle-Math.PI/2],material:'darkMetal',
    };
  });
  return spec(item,{
    assumptions:[
      '厂家未标尺寸；圆盘外径约280、中心孔约44、板厚8及刻度位置按第13页端部调节机构比例估算',
      `${item===6?'调节指示座(一)':'调节指示座(二)'}按独立圆形刻度盘、中心孔、限位槽和背部安装耳表达；两件左右方向不同但不合并`,
    ],
    primitives:[
      {type:'extrude',points:circlePoints(140),depth:8,holes:[
        {kind:'circle',center:[0,0],radius:22},
        {kind:'circle',center:[mirror*82,-65],radius:8},
        {kind:'circle',center:[mirror*95,48],radius:6},
      ],bevel:2},
      {type:'torus',radius:123,tube:4,position:[0,0,6],material:'darkMetal'},
      {type:'box',size:[70,48,24],position:[mirror*120,-40,-10],material:'darkMetal'},
      ...ticks,
    ],
  });
}

function flatWasher(item,nominal,outerDiameter,thickness){
  return spec(item,{
    level:'尺寸级',material:'metal',
    assumptions:[
      `厂家明确公称规格${nominal}；中心孔按公称直径${nominal}表达`,
      `外径${outerDiameter}和厚度${thickness}按GB97.1常用规格表达；厂家第14页未列公差`,
    ],
    primitives:[{
      type:'extrude',points:circlePoints(outerDiameter/2),depth:thickness,
      holes:[{kind:'circle',center:[0,0],radius:nominal/2}],bevel:.1,material:'metal',
    }],
  });
}

export const jwf1102P14ModelSpecs={
  'ZFA113A-0300-1A':adjustingPlate(1,-1),
  'ZFA113A-0300-2A':adjustingPlate(2,1),

  'ZFA113A-0300-3':spec(3,{
    material:'darkMetal',
    assumptions:[
      '厂家未标尺寸；总长约150、主轴直径36、偏心量约12和端部台阶按第13页比例估算',
      '数量为单台2件；模型展示单件阶梯轴、偏心轴颈、键槽块和端部螺纹轮廓，键为标号15独立零件',
    ],
    primitives:[
      {type:'cylinder',radius:18,length:82,axis:'x',material:'darkMetal'},
      {type:'cylinder',radius:13,length:42,axis:'x',position:[55,12,0],material:'metal'},
      {type:'cylinder',radius:11,length:32,axis:'x',position:[-57,0,0],material:'metal'},
      {type:'box',size:[22,8,20],position:[-42,18,0],material:'metal'},
      {type:'torus',radius:12,tube:2,rotation:[0,Math.PI/2,0],position:[75,12,0],material:'darkMetal'},
    ],
  }),

  'ZFA113-0300-1C':spec(4,{
    material:'darkMetal',
    assumptions:[
      '厂家未标尺寸；尘棒展示长度约1450、杆身约18×24和端部耳尺寸按第13页比例估算',
      '单台40件；模型展示单根尘棒结合件(一)的直条杆身、同向扁平端耳和定位销，不按数量复制',
    ],
    primitives:[
      {type:'box',size:[1450,18,24],material:'darkMetal'},
      {type:'box',size:[95,42,12],position:[-705,16,0],rotation:[0,0,.18],material:'metal'},
      {type:'box',size:[95,42,12],position:[705,16,0],rotation:[0,0,-.18],material:'metal'},
      {type:'cylinder',radius:7,length:34,axis:'z',position:[-735,28,0],material:'metal'},
      {type:'cylinder',radius:7,length:34,axis:'z',position:[735,28,0],material:'metal'},
    ],
  }),

  'ZFA113-0300-2C':spec(5,{
    material:'metal',
    assumptions:[
      '厂家未标尺寸；尘棒展示长度约1430、三棱杆截面外接直径约24和端部折耳按第13页比例估算',
      '单台40件；模型展示单根尘棒结合件(二)的三棱杆身、反向折耳和端部定位销，以区别标号4',
    ],
    primitives:[
      {type:'cylinder',radius:14,length:1430,axis:'x',segments:3,rotation:[Math.PI/6,0,0],material:'metal'},
      {type:'box',size:[105,36,12],position:[-695,-18,0],rotation:[0,0,-.2],material:'darkMetal'},
      {type:'box',size:[105,36,12],position:[695,18,0],rotation:[0,0,.2],material:'darkMetal'},
      {type:'cylinder',radius:6,length:32,axis:'z',position:[-728,-30,0],material:'darkMetal'},
      {type:'cylinder',radius:6,length:32,axis:'z',position:[728,30,0],material:'darkMetal'},
    ],
  }),

  'ZFA113A-0301A':indicatorSeat(6,-1),
  'ZFA113A-0302A':indicatorSeat(7,1),

  'ZFA113A-0303':spec(8,{
    material:'metal',
    assumptions:[
      '厂家未标尺寸；操作杆总长约520、杆径18、端部螺纹和方榫按第13页比例估算',
      '数量为单台2件；模型展示单件直操作杆、端部台阶和手柄球连接端，手柄球为标号14独立零件',
    ],
    primitives:[
      {type:'cylinder',radius:9,length:450,axis:'x',material:'metal'},
      {type:'cylinder',radius:7,length:48,axis:'x',position:[249,0,0],material:'darkMetal'},
      {type:'box',size:[42,18,18],position:[-246,0,0],material:'darkMetal'},
      {type:'torus',radius:8,tube:1.5,rotation:[0,Math.PI/2,0],position:[270,0,0],material:'darkMetal'},
    ],
  }),

  'ZFA113-0302':spec(9,{
    material:'darkMetal',
    assumptions:[
      '厂家未标尺寸；拉杆(二)总长约1520、杆径14、两端叉耳和折弯量按第13页上部长杆比例估算',
      '模型按长直拉杆、两端反向偏置连接耳和销孔语义建立；与拉杆(三)外形及recordKey独立',
    ],
    primitives:[
      {type:'tube',points:[[-760,0,0],[-690,0,0],[-620,24,0],[620,24,0],[690,0,0],[760,0,0]],radius:7,material:'darkMetal'},
      {type:'box',size:[100,34,12],position:[-720,-4,0],rotation:[0,0,-.2],material:'metal'},
      {type:'box',size:[100,34,12],position:[720,-4,0],rotation:[0,0,.2],material:'metal'},
      {type:'cylinder',radius:6,length:24,axis:'z',position:[-758,-12,0],material:'metal'},
      {type:'cylinder',radius:6,length:24,axis:'z',position:[758,-12,0],material:'metal'},
    ],
  }),

  'ZFA113-0303':spec(10,{
    material:'darkMetal',
    assumptions:[
      '厂家未标尺寸；拉杆(三)约310×210、杆径16及两端环孔按第13页尘格端部短曲柄比例估算',
      '模型按S形短拉杆、上下偏置和两端圆孔语义建立；不是标号9长直拉杆的缩放复制',
    ],
    primitives:[
      {type:'tube',points:[[-125,-95,0],[-85,-95,0],[-35,-45,0],[20,35,0],[75,95,0],[125,95,0]],radius:13,material:'darkMetal'},
      {type:'torus',radius:22,tube:10,position:[-135,-95,0],material:'metal'},
      {type:'torus',radius:22,tube:10,position:[135,95,0],material:'metal'},
    ],
  }),

  'FA103-0305':spec(11,{
    material:'darkMetal',
    assumptions:[
      '厂家未标尺寸；指针长约105、根部宽38、厚5和安装孔按第13页圆形指示座比例估算',
      '数量为单台2件；模型展示单个三角指针、圆形根部和中心孔，不与指示座合并',
    ],
    primitives:[
      {type:'extrude',points:[[-22,-28],[22,-28],[9,18],[0,78],[-9,18]],depth:5,holes:[{kind:'circle',center:[0,-12],radius:8}],bevel:.8},
      {type:'torus',radius:17,tube:4,position:[0,-12,4],material:'metal'},
    ],
  }),

  'FA103-0306':spec(12,{
    material:'metal',
    assumptions:[
      '厂家未标尺寸；调节座圈外径约92、内孔约36、总厚约38和径向孔按第13页比例估算',
      '数量为单台2件；模型展示单个阶梯座圈、中心孔、凸缘和径向锁紧孔，偏心轴为标号3独立零件',
    ],
    primitives:[
      {type:'extrude',points:circlePoints(46),depth:18,holes:[{kind:'circle',center:[0,0],radius:18}],bevel:1,material:'metal'},
      {type:'extrude',points:circlePoints(34),depth:38,holes:[{kind:'circle',center:[0,0],radius:18}],position:[0,0,-12],material:'darkMetal'},
      {type:'cylinder',radius:5,length:58,axis:'x',position:[0,34,-12],material:'metal'},
    ],
  }),

  'JB/T7274.4-1994':spec(13,{
    level:'尺寸级',material:'plastic',
    assumptions:[
      '厂家明确规格BM16X63；模型以M16中心连接孔和直径约63的星形把手语义建立',
      '厂家未给轮廓厚度、齿数和嵌件深度；展示厚度24、十瓣外形及金属嵌件按标准件常见比例表达',
    ],
    primitives:[
      {type:'extrude',points:starPoints(31.5,25,10),depth:24,holes:[{kind:'circle',center:[0,0],radius:8}],bevel:2,material:'plastic'},
      {type:'cylinder',radius:11,length:30,axis:'z',material:'metal'},
      {type:'torus',radius:9,tube:2,position:[0,0,15],material:'darkMetal'},
    ],
  }),

  'JB/T7271.1-94':spec(14,{
    level:'尺寸级',material:'plastic',
    assumptions:[
      '厂家明确规格M12X40；模型以公称M12连接杆和长度40的螺杆表达',
      '球形手柄直径约40按第13页和标准件常见比例估算；球面由回转轮廓近似，螺距与公差未标',
    ],
    primitives:[
      {type:'lathe',points:[[0,-20],[11,-18],[18,-10],[20,0],[18,10],[11,18],[0,20]],segments:64,material:'plastic'},
      {type:'cylinder',radius:6,length:40,axis:'y',position:[0,-40,0],material:'metal'},
      {type:'torus',radius:6,tube:1,rotation:[Math.PI/2,0,0],position:[0,-58,0],material:'darkMetal'},
    ],
  }),

  'GB1096-79':spec(15,{
    level:'尺寸级',material:'metal',
    assumptions:[
      '厂家明确规格5X20；键宽5和长度20据此建立',
      '厂家未给键高、公差和端部形式；展示高度5并作轻微端部倒角轮廓，不作为加工依据',
    ],
    primitives:[{type:'box',size:[20,5,5],material:'metal'}],
  }),

  'GB6170':spec(16,{
    level:'尺寸级',material:'darkMetal',
    assumptions:[
      '厂家明确公称规格M10；中心孔按公称直径10表达',
      '六角对边17和厚度8按GB6170常用比例表达；螺距、牙型和公差未在本页标明',
    ],
    primitives:[{
      type:'extrude',points:hexPoints(17/Math.sqrt(3)),depth:8,
      holes:[{kind:'circle',center:[0,0],radius:5}],bevel:.4,material:'darkMetal',
    }],
  }),

  'jwf1102-p14-item-017':flatWasher(17,10,20,2),
  'jwf1102-p14-item-018':flatWasher(18,16,30,3),
};
