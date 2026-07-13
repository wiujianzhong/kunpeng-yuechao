// JWF1206第56—64页专用建模小工具。
// 本文件不依据名称、modelType或尺寸数组自动猜形。
export const PI=Math.PI;

export const rect=(width,height)=>[
  [-width/2,-height/2],[width/2,-height/2],[width/2,height/2],[-width/2,height/2],
];
export const circle=(radius,segments=48)=>Array.from({length:segments},(_,index)=>{
  const angle=PI*2*index/segments;
  return [Math.cos(angle)*radius,Math.sin(angle)*radius];
});
export const hole=(x,y,radius)=>({kind:'circle',center:[x,y],radius});
export const polygonHole=points=>({kind:'polygon',points});
export const box=(size,material='paintedMetal',position=[0,0,0],rotation=[0,0,0])=>({type:'box',size,material,position,rotation});
export const cylinder=(radius,length,axis='x',material='metal',position=[0,0,0])=>({type:'cylinder',radius,length,axis,material,position,radialSegments:48});
export const torus=(radius,tube,material='rubber',position=[0,0,0],rotation=[0,PI/2,0])=>({type:'torus',radius,tube,material,position,rotation,radialSegments:48,tubularSegments:24});
export const extrude=(points,depth,{holes=[],material='paintedMetal',position=[0,0,0],rotation=[0,0,0],bevel=0}={})=>({type:'extrude',points,depth,holes,material,position,rotation,bevel});
export const plate=(width,height,depth,options={})=>extrude(rect(width,height),depth,options);
export const lathe=(points,material='metal',position=[0,0,0],rotation=[0,0,PI/2])=>({type:'lathe',points,material,position,rotation});
export const annulus=(outerDiameter,innerDiameter,width,{material='metal',position=[0,0,0]}={})=>lathe([
  [innerDiameter/2,-width/2],[outerDiameter/2,-width/2],[outerDiameter/2,width/2],
  [innerDiameter/2,width/2],[innerDiameter/2,-width/2],
],material,position);
export const tube=(points,radius,{material='metal',radialSegments=14}={})=>({type:'tube',points,radius,material,radialSegments});

export const slot=(x,y,width,height)=>polygonHole([
  [x-width/2,y-height/2],[x+width/2,y-height/2],[x+width/2,y+height/2],[x-width/2,y+height/2],
]);

export function spring(length,outerDiameter,wireDiameter,turns,material='darkMetal'){
  const radius=outerDiameter/2-wireDiameter/2;
  const count=Math.max(64,turns*18);
  const points=Array.from({length:count+1},(_,index)=>{
    const t=index/count,angle=t*turns*PI*2;
    return [t*length-length/2,Math.cos(angle)*radius,Math.sin(angle)*radius];
  });
  return tube(points,wireDiameter/2,{material,radialSegments:10});
}

export function arcShell(length,radius,angle,thickness,segments=14,material='paintedMetal'){
  const primitives=[];
  const delta=angle/segments;
  const chord=2*radius*Math.sin(Math.abs(delta)/2);
  for(let index=0;index<segments;index++){
    const a=-angle/2+delta*(index+.5);
    primitives.push(box([length,thickness,chord],material,[0,Math.sin(a)*radius,Math.cos(a)*radius],[a,0,0]));
  }
  return primitives;
}

export function steppedRoller({overall,bodyLength,bodyDiameter,shaftDiameter=28,material='darkMetal'}){
  return [
    cylinder(bodyDiameter/2,bodyLength,'x',material),
    cylinder(shaftDiameter/2,overall,'x','metal'),
    cylinder(shaftDiameter*.72,(overall-bodyLength)*.72,'x','metal',[-(overall+bodyLength)*.23,0,0]),
    cylinder(shaftDiameter*.72,(overall-bodyLength)*.72,'x','metal',[(overall+bodyLength)*.23,0,0]),
    annulus(bodyDiameter*1.03,shaftDiameter,Math.max(10,bodyDiameter*.07),{material:'paintedMetal',position:[-bodyLength*.49,0,0]}),
    annulus(bodyDiameter*1.03,shaftDiameter,Math.max(10,bodyDiameter*.07),{material:'paintedMetal',position:[bodyLength*.49,0,0]}),
  ];
}

export function flangeCover({outer,depth,bore,boltRadius,boltCount=4,material='metal'}){
  const holes=[hole(0,0,bore/2)];
  for(let index=0;index<boltCount;index++){
    const angle=PI*2*index/boltCount;
    holes.push(hole(Math.cos(angle)*boltRadius,Math.sin(angle)*boltRadius,3));
  }
  return [
    extrude(circle(outer/2),depth,{holes,material}),
    annulus(outer*.58,bore,depth*.68,{material:'darkMetal',position:[depth*.16,0,0]}),
  ];
}

export function solidPulley({outer,width,bore=34,hub=58,grooves=1,material='darkMetal'}){
  const profile=[[bore/2,-width/2],[outer/2,-width/2]];
  if(grooves===1){
    profile.push([outer/2-4,-width*.22],[outer/2,width*.22],[outer/2,width/2]);
  }else{
    profile.push([outer/2,-width*.28],[outer/2-5,-width*.18],[outer/2,-width*.05],[outer/2-5,width*.05],[outer/2,width*.18],[outer/2,width*.28],[outer/2,width/2]);
  }
  profile.push([hub/2,width/2],[hub/2,-width/2],[bore/2,-width/2]);
  return [lathe(profile,material)];
}

export function roundedRectPoints(width,height,radius,segments=6){
  const result=[];
  for(const [cx,cy,start] of [[width/2-radius,height/2-radius,0],[-width/2+radius,height/2-radius,PI/2],[-width/2+radius,-height/2+radius,PI],[width/2-radius,-height/2+radius,PI*1.5]]){
    for(let index=0;index<=segments;index++){
      const angle=start+index/segments*PI/2;
      result.push([cx+Math.cos(angle)*radius,cy+Math.sin(angle)*radius]);
    }
  }
  return result;
}

export function rectangularDuct(length,width,height,wall=5,material='paintedMetal'){
  return [
    box([length,width,wall],material,[0,0,height/2-wall/2]),
    box([length,width,wall],material,[0,0,-height/2+wall/2]),
    box([length,wall,height-wall*2],material,[0,-width/2+wall/2,0]),
    box([length,wall,height-wall*2],material,[0,width/2-wall/2,0]),
  ];
}

export function sourceSpec(part,{level='\u5c3a\u5bf8\u7ea7',material='paintedMetal',views,assumptions,unknowns,primitives}){
  if(!Array.isArray(primitives)||!primitives.length)throw new Error(`${part.recordKey}\u7f3a\u5c113D\u56fe\u5143`);
  return {
    level,material,
    source:{
      page:part.page,item:part.item,recordKey:part.recordKey,code:part.code,
      nameZh:part.name,nameEn:part.nameEn||part.sourceNameEn,
      quantity:{value:part.quantity,unit:part.quantityUnit,meaning:part.quantityMeaning},
      dimensions:part.dims,sourceCrop:part.sourceCrop,sourceVector:part.sourceVector,
      views,assumptions,unknowns,
    },
    primitives,
  };
}

export function buildExplicitPage(rows,builders,page){
  const result={};
  for(const part of rows){
    const builder=builders[part.recordKey];
    if(!builder)throw new Error(`JWF1206\u7b2c${page}\u9875\u7f3a\u5c11\u663e\u5f0f\u5efa\u6a21\uff1a${part.recordKey}`);
    result[part.recordKey]=builder(part);
  }
  const extras=Object.keys(builders).filter(key=>!rows.some(part=>part.recordKey===key));
  if(extras.length)throw new Error(`JWF1206\u7b2c${page}\u9875\u591a\u51fa\u672a\u5bf9\u5e94\u539f\u683c\uff1a${extras.join(',')}`);
  return result;
}
