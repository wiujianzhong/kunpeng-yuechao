// JWF1206厂家PDF第41页：逐格显式建模。
import {jwf1206P38P49Verified} from '../jwf1206-p38-p49-verified.js';
import {PI,buildPageSpecs,extrude,spec,tube} from './jwf1206-rebuild-p38-p55-helpers.js';
const rows=jwf1206P38P49Verified.filter(part=>part.page===41);

const compressionSpring=(overallLength,outerDiameter,wireDiameter,turns)=>{
  const pathRadius=(outerDiameter-wireDiameter)/2;
  const centerlineLength=overallLength-wireDiameter;
  const samples=Math.max(120,Math.ceil(turns*30));
  const points=Array.from({length:samples+1},(_,index)=>{
    const t=index/samples,angle=t*turns*PI*2;
    return[(t-.5)*centerlineLength,Math.cos(angle)*pathRadius,Math.sin(angle)*pathRadius];
  });
  const split=Math.floor(samples*.28),right=samples-split;
  return [points.slice(0,split+1),points.slice(split,right+1),points.slice(right)].map(segment=>tube(segment,wireDiameter/2,{material:'darkMetal',radialSegments:12}));
};

const eyeAndStraightTailSpring=()=>{
  const wireDiameter=1.5,wireRadius=wireDiameter/2,coilRadius=5.25;
  const eye=[];
  for(let index=0;index<=52;index++){
    const angle=(85+320*index/52)*PI/180;
    eye.push([-18+Math.cos(angle)*6,Math.sin(angle)*6,0]);
  }
  eye.push([-11.8,coilRadius,0]);
  const turns=16.5,samples=330,coil=[];
  for(let index=0;index<=samples;index++){
    const t=index/samples,angle=t*turns*PI*2;
    coil.push([-11.8+t*25,Math.cos(angle)*coilRadius,Math.sin(angle)*coilRadius]);
  }
  const split=46,right=samples-split;
  const left=[...eye,...coil.slice(1,split+1)];
  const middle=coil.slice(split,right+1);
  const tail=[...coil.slice(right),[13.8,-4.2,0],[15.3,-1.4,0],[17.5,0,0],[24.5,0,0]];
  return [left,middle,tail].map(segment=>tube(segment,wireRadius,{material:'darkMetal',radialSegments:12}));
};

const halfAnnulus=(outerRadius,innerRadius,startAngle)=>{
  const segments=48;
  const outer=Array.from({length:segments+1},(_,index)=>{const angle=startAngle+PI*index/segments;return[Math.cos(angle)*outerRadius,Math.sin(angle)*outerRadius]});
  const inner=Array.from({length:segments+1},(_,index)=>{const angle=startAngle+PI-PI*index/segments;return[Math.cos(angle)*innerRadius,Math.sin(angle)*innerRadius]});
  return extrude([...outer,...inner],1,{material:'metal'});
};

const builders={
  'jwf1206-p41-item-001':part=>spec(part,{views:['轴向全剖视图'],assumptions:['外径φ85、内径φ65、厚1均按厂家标注','剖面线仅表示被剖材料，不建成凸纹；环体按两个半环实体拼合，剖切投影可直接核对φ65内孔','TZH1039同系列用于调整垫片，厂家未注明软质材料，按金属薄垫片表达'],material:'metal',primitives:[halfAnnulus(42.5,32.5,0),halfAnnulus(42.5,32.5,PI)]}),
  'jwf1206-p41-item-002':part=>spec(part,{level:'轮廓级',views:['压缩弹簧主视图（中部采用中断画法）'],assumptions:['线径3.1、自由长44按厂家名称及尺寸标注','图中两组螺旋线由中断画法省略中间重复圈，并非两个分离弹簧；3D用三段首尾连续的管线恢复为一件完整压缩弹簧','厂家未标外径、有效圈数及端部磨平要求；外径18和6.25圈仅按主视比例表达，不能用于加工'],material:'darkMetal',primitives:compressionSpring(44,18,3.1,6.25)}),
  'jwf1206-p41-item-003':part=>spec(part,{level:'轮廓级',views:['弹簧主视图（左圆眼钩、右直尾钩）'],assumptions:['线径1.5、长度50按厂家名称及尺寸标注','左端是平面圆眼钩，右端由末圈弯向轴线后形成直尾钩；不再误建为两端相同圆钩','中间两条平行轮廓表示省略重复密圈后的弹簧体，不是两根独立直杆；3D恢复约16.5个密圈','外径、实际圈数、钩眼直径及50的精确测量基准未标；按主视比例恢复轮廓'],material:'darkMetal',primitives:eyeAndStraightTailSpring()}),
};
export const jwf1206P41ModelSpecs=buildPageSpecs(rows,builders,41);
export default jwf1206P41ModelSpecs;
