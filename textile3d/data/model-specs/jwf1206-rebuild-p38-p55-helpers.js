// JWF1206 第38—55页专用的显式建模小工具。
// 本文件不根据名称或尺寸数组推测几何；每个零件必须在各页文件中显式指定图元。
export const PI=Math.PI;

export const rect=(width,height)=>[
  [-width/2,-height/2],[width/2,-height/2],[width/2,height/2],[-width/2,height/2],
];
export const hole=(x,y,radius)=>({kind:'circle',center:[x,y],radius});
export const box=(size,material='paintedMetal',position=[0,0,0],rotation=[0,0,0])=>({type:'box',size,material,position,rotation});
export const cylinder=(radius,length,axis='x',material='metal',position=[0,0,0],rotation=[0,0,0])=>({type:'cylinder',radius,length,axis,material,position,rotation});
export const torus=(radius,tube,material='darkMetal',position=[0,0,0],rotation=[0,PI/2,0])=>({type:'torus',radius,tube,material,position,rotation});
export const extrude=(points,depth,{holes=[],material='paintedMetal',position=[0,0,0],rotation=[0,0,0],bevel=0}={})=>({type:'extrude',points,depth,holes,material,position,rotation,bevel});
export const plate=(width,height,depth,{holes=[],material='paintedMetal',position=[0,0,0],rotation=[0,0,0],bevel=0}={})=>extrude(rect(width,height),depth,{holes,material,position,rotation,bevel});
export const annulus=(outerDiameter,innerDiameter,width,{material='metal',position=[0,0,0],axis='x'}={})=>({
  type:'lathe',
  points:[
    [innerDiameter/2,-width/2],[outerDiameter/2,-width/2],
    [outerDiameter/2,width/2],[innerDiameter/2,width/2],[innerDiameter/2,-width/2],
  ],
  rotation:axis==='x'?[0,0,PI/2]:axis==='z'?[PI/2,0,0]:[0,0,0],
  material,position,
});
export const tube=(points,radius,{material='metal',radialSegments=14}={})=>({type:'tube',points,radius,radialSegments,material});

export function spring(length,outerDiameter,wireDiameter,turns,{material='darkMetal',hook=false}={}){
  const radius=outerDiameter/2-wireDiameter/2;
  const count=Math.max(48,turns*18);
  const points=Array.from({length:count+1},(_,index)=>{
    const t=index/count,angle=t*turns*PI*2;
    return [t*length-length/2,Math.cos(angle)*radius,Math.sin(angle)*radius];
  });
  const primitives=[tube(points,wireDiameter/2,{material,radialSegments:10})];
  if(hook){
    const hookRadius=radius*.82,segments=28;
    const hookPoints=side=>{
      const endX=side*length/2,centerX=endX+side*hookRadius;
      const points=[[endX,radius,0],[endX,hookRadius,0]];
      for(let index=0;index<=segments;index++){
        const angle=side<0?index*PI*2:PI-index*PI*2;
        points.push([centerX+Math.cos(angle)*hookRadius,hookRadius+Math.sin(angle)*hookRadius,0]);
      }
      return points;
    };
    primitives.push(tube(hookPoints(-1),wireDiameter/2,{material,radialSegments:10}));
    primitives.push(tube(hookPoints(1),wireDiameter/2,{material,radialSegments:10}));
  }
  return primitives;
}

export function spec(part,{level='尺寸级',material='paintedMetal',views,assumptions,primitives}){
  if(!Array.isArray(primitives)||!primitives.length)throw new Error(`${part.recordKey}缺少3D图元`);
  return {
    level,material,
    source:{
      page:part.page,item:part.item,recordKey:part.recordKey,code:part.code,
      nameZh:part.name,nameEn:part.nameEn||part.sourceNameEn,
      quantity:{value:part.quantity,unit:part.quantityUnit,meaning:part.quantityMeaning},
      dimensions:part.dims,sourceCrop:part.sourceCrop,sourceVector:part.sourceVector,
      views,assumptions,
    },
    primitives,
  };
}

export function buildPageSpecs(rows,builders,page){
  const result={};
  for(const part of rows){
    const build=builders[part.recordKey];
    if(!build)throw new Error(`JWF1206第${page}页缺少显式建模：${part.recordKey}`);
    result[part.recordKey]=build(part);
  }
  const extra=Object.keys(builders).filter(key=>!rows.some(part=>part.recordKey===key));
  if(extra.length)throw new Error(`JWF1206第${page}页存在无对应原格的建模：${extra.join(',')}`);
  return result;
}
