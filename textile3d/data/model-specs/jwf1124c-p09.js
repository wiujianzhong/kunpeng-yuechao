// JWF1124C-160 厂家PDF第9页最后4项：按厂家明示规格分别建立尺寸级模型。

const circlePoints=(radius,count=48)=>Array.from({length:count},(_,index)=>{
  const angle=Math.PI*2*index/count;
  return [Number((Math.cos(angle)*radius).toFixed(4)),Number((Math.sin(angle)*radius).toFixed(4))];
});

const source=(item,code,dimensions,assumptions)=>({
  page:9,
  item,
  code,
  recordKey:`jwf1124c-p09-item-${item}`,
  dimensions,
  views:[`第9页厂家明细标号${item}`,'第7页除尘部件轴测爆炸图对应标号'],
  assumptions,
});

function straightPin(item,diameter,length){
  return {
    level:'尺寸级',
    material:'metal',
    source:source(item,'GB879',[`${diameter}X${length}`],[
      `销直径${diameter}与长度${length}取自厂家第9页明细`,
      '端部倒角和配合公差未标，端面环仅作倒角视觉提示，不作为加工尺寸',
    ]),
    primitives:[
      {type:'cylinder',radius:diameter/2,length,axis:'z',material:'metal'},
      {type:'torus',radius:diameter*.44,tube:diameter*.045,position:[0,0,-length/2],material:'darkMetal'},
      {type:'torus',radius:diameter*.44,tube:diameter*.045,position:[0,0,length/2],material:'darkMetal'},
    ],
  };
}

export const jwf1124cP09ModelSpecs={
  'GB97.1':{
    level:'尺寸级',
    material:'metal',
    source:source(51,'GB97.1',['10'],[
      '垫圈公称孔径10取自厂家第9页明细',
      '外径20和厚度2按GB97.1常用10规格表达；厂家本页未列公差，模型不作加工依据',
    ]),
    primitives:[{
      type:'extrude',
      points:circlePoints(10),
      depth:2,
      holes:[{kind:'circle',center:[0,0],radius:5}],
      bevel:.12,
      material:'metal',
    }],
  },
  'jwf1124c-p09-item-52':straightPin(52,4,18),
  'jwf1124c-p09-item-53':straightPin(53,5,12),
  'jwf1124c-p09-item-54':straightPin(54,6,20),
};
