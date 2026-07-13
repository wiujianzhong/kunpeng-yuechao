// FA103B 厂家PDF第3页FA103B-0000产品装配总图、第4页15项明细：逐件3D规格。
// 坐标单位为毫米；厂家未标注的外形尺寸只作视觉估算，并全部写入 assumptions。

const circlePoints=(radius,count=48)=>Array.from({length:count},(_,index)=>{
  const angle=Math.PI*2*index/count;
  return [Number((Math.cos(angle)*radius).toFixed(4)),Number((Math.sin(angle)*radius).toFixed(4))];
});

const hexPoints=radius=>Array.from({length:6},(_,index)=>{
  const angle=Math.PI/6+Math.PI*2*index/6;
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
  1:{code:'FA103B-0100A',nameZh:'机架部件',quantity:1,remark:null,dimensions:[]},
  2:{code:'FA103B-0200',nameZh:'打手部件',quantity:1,remark:null,dimensions:[]},
  3:{code:'FA103B-0300',nameZh:'尘格部件',quantity:1,remark:null,dimensions:[]},
  4:{code:'FA103B-0000-1',nameZh:'出棉口结合件',quantity:1,remark:null,dimensions:[]},
  5:{code:'FA103A-0000-1',nameZh:'方接圆结合件',quantity:1,remark:null,dimensions:[]},
  6:{code:'FA103A-0000-2',nameZh:'90° 弯管结合件',quantity:1,remark:null,dimensions:['90°']},
  7:{code:'FA103B-0001',nameZh:'软管',quantity:1,remark:'FESTO',dimensions:[]},
  8:{code:'GB799',nameZh:'螺栓 M16X220',quantity:4,remark:null,dimensions:['M16X220']},
  9:{code:'GB5783',nameZh:'螺栓 M6X20',quantity:16,remark:null,dimensions:['M6X20']},
  10:{code:'GB825',nameZh:'螺钉 M16',quantity:4,remark:null,dimensions:['M16']},
  11:{code:'GB6170',nameZh:'螺母 M16',quantity:8,remark:null,dimensions:['M16']},
  12:{code:'GB96',nameZh:'垫圈 6',quantity:16,remark:null,dimensions:['6']},
  13:{code:'GB97.1',nameZh:'垫圈 16',quantity:8,remark:null,dimensions:['16']},
  14:{code:null,nameZh:'接头 QSL-1/8-8',quantity:1,remark:'FESTO',dimensions:['QSL-1/8-8']},
  15:{code:'FZ/T90089.1',nameZh:'厂铭牌 80X130',quantity:1,remark:null,dimensions:['80X130']},
};

const source=(item,assumptions)=>{
  const part=parts[item];
  return {
    page:4,
    item,
    code:part.code,
    recordKey:`fa103b-p04-item-${String(item).padStart(3,'0')}`,
    nameZh:part.nameZh,
    quantity:{value:part.quantity,unit:'件',meaning:'单台设备用量'},
    dimensions:part.dimensions,
    views:[`第3页产品装配总图标号${item}`,'第4页厂家明细行'],
    assumptions,
    ...(part.remark?{remark:part.remark}:{}),
  };
};

const spec=(item,{level='轮廓级',material='paintedMetal',assumptions,primitives})=>({
  level,material,source:source(item,assumptions),primitives,
});

function transitionSpec(item,{baseX,baseZ,topRadius,height,note}){
  return spec(item,{
    assumptions:[
      `厂家未标外形尺寸；方口约${baseX}×${baseZ}、圆口直径约${topRadius*2}、高度约${height}和板厚均按第3页比例估算`,
      note,
    ],
    primitives:[
      {type:'extrude',points:[[-baseX/2,-height/2],[baseX/2,-height/2],[topRadius,height/2],[-topRadius,height/2]],depth:8,position:[0,0,-baseZ/2]},
      {type:'extrude',points:[[-baseX/2,-height/2],[baseX/2,-height/2],[topRadius,height/2],[-topRadius,height/2]],depth:8,position:[0,0,baseZ/2]},
      {type:'box',size:[8,height,baseZ],position:[-(baseX/2+topRadius)/2,0,0],rotation:[0,0,-Math.atan((baseX/2-topRadius)/height)]},
      {type:'box',size:[8,height,baseZ],position:[(baseX/2+topRadius)/2,0,0],rotation:[0,0,Math.atan((baseX/2-topRadius)/height)]},
      {type:'torus',radius:topRadius,tube:16,rotation:[Math.PI/2,0,0],position:[0,height/2+12,0],material:'darkMetal'},
      {type:'box',size:[baseX+70,28,baseZ+70],position:[0,-height/2-12,0],material:'darkMetal'},
    ],
  });
}

function flatWasher(item,nominal,outerDiameter,thickness,standard){
  return spec(item,{
    level:'尺寸级',material:'metal',
    assumptions:[
      `厂家明确公称规格${nominal}；中心孔按公称直径${nominal}表达`,
      `外径${outerDiameter}和厚度${thickness}按${standard}常用规格表达；厂家第4页未列公差`,
    ],
    primitives:[{
      type:'extrude',points:circlePoints(outerDiameter/2),depth:thickness,
      holes:[{kind:'circle',center:[0,0],radius:nominal/2}],bevel:.1,material:'metal',
    }],
  });
}

export const fa103bP04ModelSpecs={
  'FA103B-0100A':spec(1,{
    assumptions:[
      '厂家未标外形尺寸；机架柜体约1850×1700×1050、立柱截面、门框和板厚均按第3页整机比例估算',
      '模型表达双轴流机架的四立柱、上下框架、顶部双风道开口、正面双门和侧面检修开口；打手、尘格和风道件不并入',
    ],
    primitives:[
      ...[-870,870].flatMap(x=>[-480,480].map(z=>({type:'box',size:[100,1700,100],position:[x,0,z],material:'darkMetal'}))),
      ...[-780,0,780].flatMap(y=>[
        {type:'box',size:[1840,90,90],position:[0,y,-480]},
        {type:'box',size:[1840,90,90],position:[0,y,480]},
      ]),
      ...[-870,870].flatMap(x=>[-780,780].map(y=>({type:'box',size:[90,90,1050],position:[x,y,0]}))),
      {type:'extrude',points:[[-790,-690],[-20,-690],[-20,690],[-790,690]],depth:12,holes:[{kind:'polygon',points:[[-700,-560],[-110,-560],[-110,560],[-700,560]]}],position:[0,0,-495]},
      {type:'extrude',points:[[20,-690],[790,-690],[790,690],[20,690]],depth:12,holes:[{kind:'polygon',points:[[110,-560],[700,-560],[700,560],[110,560]]}],position:[0,0,-495]},
      {type:'extrude',points:[[-820,-470],[820,-470],[820,470],[-820,470]],depth:18,holes:[
        {kind:'circle',center:[-420,0],radius:155},{kind:'circle',center:[420,0],radius:155},
      ],position:[0,790,0],rotation:[Math.PI/2,0,0],material:'darkMetal'},
      {type:'box',size:[380,24,360],position:[-420,810,0]},
      {type:'box',size:[380,24,360],position:[420,810,0]},
    ],
  }),

  'FA103B-0200':spec(2,{
    material:'darkMetal',
    assumptions:[
      '厂家未标外形尺寸；双打手单辊工作长约980、辊径约360、两辊中心距约430和角钉尺寸按第3页比例估算',
      '按两根并列圆筒、贯通轴、端盘和交错角钉表达双轴流打手；电机、轴承和传动件未在第4页15项内，未并入',
    ],
    primitives:[
      ...[-215,215].flatMap(y=>[
        {type:'cylinder',radius:180,length:980,axis:'x',position:[0,y,0],material:'darkMetal'},
        {type:'cylinder',radius:205,length:26,axis:'x',position:[-490,y,0],material:'metal'},
        {type:'cylinder',radius:205,length:26,axis:'x',position:[490,y,0],material:'metal'},
        {type:'cylinder',radius:38,length:1120,axis:'x',position:[0,y,0],material:'metal'},
        ...Array.from({length:18},(_,index)=>{
          const angle=Math.PI*2*(index%6)/6;
          const x=-410+Math.floor(index/6)*410;
          return {type:'box',size:[16,18,95],position:[x,y+Math.cos(angle)*190,Math.sin(angle)*190],rotation:[angle+.35,0,.28],material:'metal'};
        }),
      ]),
      {type:'box',size:[980,70,55],position:[0,0,-245],material:'metal'},
    ],
  }),

  'FA103B-0300':spec(3,{
    material:'darkMetal',
    assumptions:[
      '厂家未标外形尺寸；双尘格单段宽约780、内弧半径约250、栅条间距和侧板厚度按第3页比例估算',
      '模型表达两个并列半圆尘格、弧形侧板、多根轴向栅条和上部连接板；与双打手保持独立总成',
    ],
    primitives:[
      ...[-430,430].flatMap(x=>[
        {type:'extrude',points:arcBandPoints(300,245,Math.PI,Math.PI*2),depth:18,position:[x,0,-390],rotation:[0,Math.PI/2,0],material:'darkMetal'},
        {type:'extrude',points:arcBandPoints(300,245,Math.PI,Math.PI*2),depth:18,position:[x,0,390],rotation:[0,Math.PI/2,0],material:'darkMetal'},
        ...Array.from({length:13},(_,index)=>{
          const angle=Math.PI+Math.PI*(index+.5)/13;
          return {type:'box',size:[780,12,20],position:[x,Math.sin(angle)*270,Math.cos(angle)*270],rotation:[angle+Math.PI/2,0,0],material:'metal'};
        }),
      ]),
      {type:'box',size:[1720,80,55],position:[0,40,-330]},
      {type:'box',size:[1720,80,55],position:[0,40,330]},
      {type:'box',size:[1700,300,20],position:[0,170,-350],material:'paintedMetal'},
    ],
  }),

  'FA103B-0000-1':transitionSpec(4,{
    baseX:520,baseZ:430,topRadius:150,height:440,
    note:'按出棉口结合件建立较宽方口、向上圆口的偏心过渡罩、上下法兰和侧向加强板；与标号5方接圆外廓比例不同',
  }),

  'FA103A-0000-1':transitionSpec(5,{
    baseX:420,baseZ:360,topRadius:125,height:380,
    note:'按方接圆结合件建立居中的方口至圆口过渡和双法兰；标号4出棉口较宽且安装方向不同，二者不合并',
  }),

  'FA103A-0000-2':spec(6,{
    level:'尺寸级',
    assumptions:[
      '厂家名称明确为90°弯管结合件，弯曲转角90°据此建立',
      '厂家未给管径、弯曲半径、法兰和板厚；展示管径约250、中心弯曲半径约310均按第3页比例估算',
    ],
    primitives:[
      {type:'tube',points:[[0,-300,0],[0,-210,0],[15,-115,0],[65,-45,0],[140,0,0],[230,12,0],[310,12,0]],radius:125,radialSegments:24,material:'paintedMetal'},
      {type:'torus',radius:130,tube:14,rotation:[Math.PI/2,0,0],position:[0,-312,0],material:'darkMetal'},
      {type:'torus',radius:130,tube:14,rotation:[0,Math.PI/2,0],position:[320,12,0],material:'darkMetal'},
    ],
  }),

  'FA103B-0001':spec(7,{
    material:'rubber',
    assumptions:[
      '厂家仅给软管、单台1件及备注FESTO，未给长度和管径；展示外径约42、长度约700按第3页比例估算',
      '模型按连续柔性弯管和两端卡箍表达；FESTO仅保留为备注，不改变件号FA103B-0001',
    ],
    primitives:[
      {type:'tube',points:[[-310,-135,0],[-250,-55,20],[-135,30,35],[0,55,0],[140,20,-30],[245,-60,-20],[315,-135,0]],radius:21,radialSegments:16,material:'rubber'},
      {type:'torus',radius:24,tube:5,rotation:[0,Math.PI/2,0],position:[-315,-140,0],material:'darkMetal'},
      {type:'torus',radius:24,tube:5,rotation:[0,Math.PI/2,0],position:[315,-140,0],material:'darkMetal'},
    ],
  }),

  'GB799':spec(8,{
    level:'尺寸级',material:'metal',
    assumptions:[
      '厂家明确规格M16X220；公称直径16和总长220据此表达',
      'GB799按地脚螺栓语义建立长直螺杆和末端直角锚钩；弯曲半径、螺纹长度及公差未在本页标明',
    ],
    primitives:[
      {type:'tube',points:[[0,110,0],[0,-55,0],[0,-90,0],[18,-108,0],[55,-108,0]],radius:8,radialSegments:16,material:'metal'},
      {type:'torus',radius:7.5,tube:.8,rotation:[Math.PI/2,0,0],position:[0,98,0],material:'darkMetal'},
      {type:'torus',radius:7.5,tube:.8,rotation:[Math.PI/2,0,0],position:[0,87,0],material:'darkMetal'},
    ],
  }),

  'GB5783':spec(9,{
    level:'尺寸级',material:'metal',
    assumptions:[
      '厂家明确规格M6X20；公称直径6和杆长20据此建立',
      '六角头对边10、头高4按GB5783常用比例表达；螺距、倒角和公差未在本页标明',
    ],
    primitives:[
      {type:'cylinder',radius:3,length:20,axis:'z',material:'metal'},
      {type:'cylinder',radius:10/Math.sqrt(3),length:4,axis:'z',segments:6,position:[0,0,-12],material:'darkMetal'},
      {type:'torus',radius:2.8,tube:.25,position:[0,0,7],material:'darkMetal'},
    ],
  }),

  'GB825':spec(10,{
    level:'尺寸级',material:'metal',
    assumptions:[
      '厂家明确公称规格M16；GB825按吊环螺钉语义建立螺杆和封闭吊环',
      '厂家未给杆长、吊环外径和螺距；展示杆长45、环外径64均按常用比例估算',
    ],
    primitives:[
      {type:'cylinder',radius:8,length:45,axis:'z',position:[0,0,-22.5],material:'metal'},
      {type:'torus',radius:24,tube:8,rotation:[Math.PI/2,0,0],position:[0,0,12],material:'darkMetal'},
      {type:'box',size:[28,16,20],position:[0,0,-2],material:'darkMetal'},
    ],
  }),

  'GB6170':spec(11,{
    level:'尺寸级',material:'darkMetal',
    assumptions:[
      '厂家明确公称规格M16；中心孔按公称直径16表达',
      '六角对边24和厚度13按GB6170常用比例表达；螺距、牙型和公差未在本页标明',
    ],
    primitives:[{
      type:'extrude',points:hexPoints(24/Math.sqrt(3)),depth:13,
      holes:[{kind:'circle',center:[0,0],radius:8}],bevel:.5,material:'darkMetal',
    }],
  }),

  'GB96':flatWasher(12,6,18,1.6,'GB96大垫圈'),
  'GB97.1':flatWasher(13,16,30,3,'GB97.1平垫圈'),

  'fa103b-p04-item-014':spec(14,{
    material:'plastic',
    assumptions:[
      '厂家件号栏为空，名称明确为“接头 QSL-1/8-8”，备注为FESTO；模型和元数据均不反填厂家件号',
      'QSL按90°气动快插接头语义建立；螺纹端、8毫米管端、六角尺寸和总长按第3页局部放大图作轮廓估算，不作为加工尺寸',
    ],
    primitives:[
      {type:'cylinder',radius:7,length:20,axis:'y',position:[0,-28,0],material:'metal'},
      {type:'cylinder',radius:12,length:16,axis:'y',segments:6,position:[0,-10,0],material:'brass'},
      {type:'tube',points:[[0,0,0],[0,20,0],[10,32,0],[28,32,0],[48,32,0]],radius:10,radialSegments:18,material:'plastic'},
      {type:'torus',radius:8.5,tube:2,rotation:[0,Math.PI/2,0],position:[52,32,0],material:'plastic'},
      {type:'cylinder',radius:6.2,length:8,axis:'x',position:[55,32,0],material:'darkMetal'},
    ],
  }),

  'FZ/T90089.1':spec(15,{
    level:'尺寸级',material:'metal',
    assumptions:[
      '厂家明确厂铭牌外形80X130，据此建立130×80矩形牌面',
      '厂家未给厚度、孔径、孔距和文字图案；展示厚度1.2及四角安装孔按常见铭牌比例估算，未臆造文字内容',
    ],
    primitives:[
      {type:'extrude',points:[[-65,-40],[65,-40],[65,40],[-65,40]],depth:1.2,holes:[
        {kind:'circle',center:[-58,-33],radius:2},{kind:'circle',center:[58,-33],radius:2},
        {kind:'circle',center:[-58,33],radius:2},{kind:'circle',center:[58,33],radius:2},
      ],bevel:.3,material:'metal'},
      {type:'box',size:[100,2,1.8],position:[0,18,1],material:'darkMetal'},
      {type:'box',size:[100,2,1.8],position:[0,5,1],material:'darkMetal'},
      {type:'box',size:[70,2,1.8],position:[-15,-8,1],material:'darkMetal'},
    ],
  }),
};
