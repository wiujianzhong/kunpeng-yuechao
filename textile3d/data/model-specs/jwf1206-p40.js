// JWF1206厂家PDF第40页：逐格显式建模。
import {jwf1206P38P49Verified} from '../jwf1206-p38-p49-verified.js';
import {PI,box,buildPageSpecs,cylinder,extrude,hole,spec,tube} from './jwf1206-rebuild-p38-p55-helpers.js';
const rows=jwf1206P38P49Verified.filter(part=>part.page===40);
const hex=radius=>Array.from({length:6},(_,index)=>{const a=Math.PI/6+index*Math.PI/3;return[Math.cos(a)*radius,Math.sin(a)*radius]});
const circle=(radius,segments=64,phase=0)=>Array.from({length:segments},(_,index)=>{const angle=phase+PI*2*index/segments;return[Math.cos(angle)*radius,Math.sin(angle)*radius]});
const keyedHole=(radius,keyHalfWidth,keyTop)=>{
  const start=Math.acos(keyHalfWidth/radius);
  const sweep=PI*2-2*Math.asin(keyHalfWidth/radius);
  return [
    [-keyHalfWidth,radius],[-keyHalfWidth,keyTop],[keyHalfWidth,keyTop],[keyHalfWidth,radius],
    ...Array.from({length:35},(_,index)=>{const angle=start-index*sweep/34;return[Math.cos(angle)*radius,Math.sin(angle)*radius]}),
  ];
};
const pulley19Outer=circle(37.72,64);
const roundedRect=(width,height,radius,segments=5)=>{
  const points=[];
  for(const[cx,cy,start]of [[width/2-radius,height/2-radius,0],[-width/2+radius,height/2-radius,PI/2],[-width/2+radius,-height/2+radius,PI],[width/2-radius,-height/2+radius,PI*1.5]]){
    for(let index=0;index<=segments;index++){const angle=start+index*PI/2/segments;points.push([cx+Math.cos(angle)*radius,cy+Math.sin(angle)*radius])}
  }
  return points;
};
const semicircle=(radius,height,segments=28)=>[[radius,0],[-radius,0],...Array.from({length:segments+1},(_,index)=>{const angle=PI-index*PI/segments;return[Math.cos(angle)*radius,Math.sin(angle)*height]})];
const cRing=(outerRadius,innerRadius,gapHalfAngle=.43,segments=42)=>{
  const outer=Array.from({length:segments+1},(_,index)=>{const angle=gapHalfAngle+index*(PI*2-gapHalfAngle*2)/segments;return[Math.cos(angle)*outerRadius,Math.sin(angle)*outerRadius]});
  const inner=Array.from({length:segments+1},(_,index)=>{const angle=PI*2-gapHalfAngle-index*(PI*2-gapHalfAngle*2)/segments;return[Math.cos(angle)*innerRadius,Math.sin(angle)*innerRadius]});
  return [...outer,...inner];
};
const chamferedRing=(outerRadius,innerRadius,width,chamfer,material)=>({
  type:'lathe',
  points:[[innerRadius,-width/2],[outerRadius-chamfer,-width/2],[outerRadius,-width/2+chamfer],[outerRadius,width/2-chamfer],[outerRadius-chamfer,width/2],[innerRadius,width/2],[innerRadius,-width/2]],
  rotation:[0,0,PI/2],material,
});
const builders={
  'jwf1206-p40-item-001':part=>spec(part,{views:['轴向剖视图','端视图'],assumptions:['外径φ75.44、孔径φ24、轮宽32按标注','端视中心键槽和水平两孔均按真实贯通孔建立；两孔中心距按端视比例估算','厂家原格未给19Z具体齿形尺寸，外缘按厂家图中的圆形轮廓表达，不凭名称虚构齿槽'],material:'darkMetal',primitives:[extrude(pulley19Outer,32,{holes:[{kind:'polygon',points:keyedHole(12,4,16)},hole(-16,0,2.5),hole(16,0,2.5)],material:'darkMetal',rotation:[0,PI/2,0]})]}),
  'jwf1206-p40-item-002':part=>spec(part,{views:['轴向全剖视图'],assumptions:['外径φ40、孔径φ10.5、厚5均按标注','厂家名称及英文均为垫圈/密封垫，按柔性橡胶材质而非金属处理；端缘小倒角按图表达'],material:'rubber',primitives:[chamferedRing(20,5.25,5,.7,'rubber')]}),
  'jwf1206-p40-item-003':part=>spec(part,{level:'轮廓级',views:['轴向全剖视图'],assumptions:['贯通孔φ15、总长48按标注；右端外径φ20按剖视尺寸','右端下侧开口为夹持槽，不再误做成整圈加粗轮缘；主体外径、槽长与外圆浅槽未标，按原格比例估算'],material:'metal',primitives:[extrude(circle(9.2),35,{holes:[hole(0,0,7.5)],material:'metal',rotation:[0,PI/2,0]}),extrude(cRing(10,7.5,.34).map(([x,y])=>[y,-x]),13,{material:'darkMetal',position:[17.5,0,0],rotation:[0,PI/2,0]})]}),
  'jwf1206-p40-item-004':part=>spec(part,{level:'轮廓级',views:['轴向全剖视图'],assumptions:['左段外径φ20、右段外径φ15、总长29按标注','φ15是右段外径而非贯通孔；内孔直径、两段长度和肩部窄槽未标，按剖视比例估算'],material:'metal',primitives:[chamferedRing(10,5,15,.45,'darkMetal'),chamferedRing(7.5,5,12,.35,'metal'),chamferedRing(7,5,2,.2,'darkMetal')].map((primitive,index)=>({...primitive,position:index===0?[-7,0,0]:index===1?[6.5,0,0]:[0,0,0]}))}),
  'jwf1206-p40-item-005':part=>spec(part,{level:'轮廓级',views:['正视轮廓图','板厚标注'],assumptions:['底边长130、板厚6按标注','外廓两侧圆角、上部斜边及三孔位置按厂家轮廓重描；高度和三孔直径未标，保留轮廓级'],primitives:[extrude([[-65,-28],[-64,-17],[-59,-8],[-34,28],[-28,33],[-20,36],[-10,37],[0,34],[54,-1],[61,-7],[65,-16],[65,-28]],6,{holes:[hole(-51,-18,4),hole(54,-17,4),hole(-27,21,7)],bevel:.8})]}),
  'jwf1206-p40-item-006':part=>spec(part,{level:'轮廓级',views:['主视图','左视图'],assumptions:['总高84、左视宽40按标注；主视大圆为真实贯通轴孔','左视四个多边形为装配紧固件头而非孔或外置底板，已移回座体侧面；孔径、紧固件尺寸和厚度未标'],primitives:[extrude([[-4,42],[7,40],[18,34],[30,25],[30,7],[24,-7],[14,-24],[16,-30],[30,-30],[30,-42],[5,-42],[-20,5],[-25,19],[-22,31],[-14,39]],40,{holes:[hole(-5,20,12)],bevel:.6}),...[[0,20,0,6],[-27,-31,-12,4],[-27,-31,0,6],[-27,-31,12,4]].map(([x,y,z,across])=>extrude(hex(across/(2*Math.cos(PI/6))),3,{material:'darkMetal',position:[x,y,z],rotation:[0,PI/2,0],bevel:.2}))]}),
  'jwf1206-p40-item-007':part=>spec(part,{views:['轴向主视图'],assumptions:['M10螺纹、总长32按标注','按总长拆分为26长螺纹杆和6高六角头；六角对边按标准件语义估为16'],material:'metal',primitives:[cylinder(5,26,'x','metal',[-3,0,0]),extrude(hex(16/Math.sqrt(3)),6,{material:'darkMetal',position:[13,0,0],rotation:[0,PI/2,0],bevel:.6})]}),
  'jwf1206-p40-item-008':part=>spec(part,{views:['轴向主视图'],assumptions:['杆径φ12、M10端部螺纹、总长63按标注','光杆与M10段分开建立，不再用φ12实体覆盖螺纹细段；左端圆头尺寸按原格比例估算'],material:'metal',primitives:[cylinder(6,46,'x','metal',[-8.5,0,0]),cylinder(5,17,'x','darkMetal',[23,0,0]),cylinder(9,3,'x','darkMetal',[-33,0,0])]}),
  'jwf1206-p40-item-009':part=>spec(part,{level:'轮廓级',views:['主视图','俯视图'],assumptions:['主视35×50、俯视总长80均按标注','容器按圆角封闭薄壁盒外形表达；左侧为沿深度分置的两条弯管，主视中重合为一组','壁厚、圆角和弯管直径未标，保留轮廓级'],primitives:[extrude(roundedRect(35,50,4),80,{material:'paintedMetal'}),tube([[-17,9,-21],[-24,9,-21],[-29,3,-21],[-29,-7,-21]],2.4,{material:'darkMetal',radialSegments:12}),tube([[-17,9,21],[-24,9,21],[-29,3,21],[-29,-7,21]],2.4,{material:'darkMetal',radialSegments:12})]}),
  'jwf1206-p40-item-010':part=>spec(part,{level:'轮廓级',views:['端视图','轴向剖视图'],assumptions:['圆盘外径φ40、总厚4按标注','端视中心孔及四个等距小孔按真实贯通孔建立；剖视斜线判定为斜孔空腔边界而非实体锥面，斜孔轴向角度未标'],material:'metal',primitives:[extrude(circle(20),4,{holes:[hole(0,0,1.7),hole(-8,0,1.6),hole(8,0,1.6),hole(0,-8,1.6),hole(0,8,1.6)],material:'metal',rotation:[0,PI/2,0],bevel:.35})]}),
  'jwf1206-p40-item-011':part=>spec(part,{views:['轴向主视图','六角端视图'],assumptions:['M10螺纹杆长60、六角对边16按标注','60尺寸由头下量至杆端，六角头高按原格比例估为7.5'],material:'metal',primitives:[cylinder(5,60,'x','metal',[-3.75,0,0]),extrude(hex(16/Math.sqrt(3)),7.5,{material:'darkMetal',position:[30,0,0],rotation:[0,PI/2,0],bevel:.7})]}),
  'jwf1206-p40-item-012':part=>spec(part,{level:'轮廓级',views:['俯视图','端视半圆轮廓'],assumptions:['俯视矩形55×30、端视半圆高25.5按标注','实体为30长的半圆柱座，不再建成六边形块；两个竖向孔的孔径和曲面交线未标，孔以深色凹腔作视觉代理'],primitives:[extrude(semicircle(27.5,-25.5),30,{material:'paintedMetal',rotation:[PI/2,0,0]}),cylinder(3.2,20,'z','darkMetal',[-17,0,-10]),cylinder(3.2,20,'z','darkMetal',[17,0,-10])]}),
  'jwf1206-p40-item-013':part=>spec(part,{views:['轴向主视图'],assumptions:['M12×1螺纹外径和总长120按标注','整根为同径丝杠，不再将两端误缩为φ10.4；仅两端倒角按图表达'],material:'darkMetal',primitives:[{type:'lathe',points:[[0,-60],[5.4,-60],[6,-59],[6,59],[5.4,60],[0,60]],rotation:[0,0,PI/2],material:'darkMetal'}]}),
  'jwf1206-p40-item-014':part=>spec(part,{views:['轴向全剖视图'],assumptions:['外径φ30、孔径φ13、厚6按标注','厂家名称及英文均为垫片/密封垫，按柔性橡胶材质而非金属处理'],material:'rubber',primitives:[chamferedRing(15,6.5,6,.45,'rubber')]}),
};
export const jwf1206P40ModelSpecs=buildPageSpecs(rows,builders,40);
export default jwf1206P40ModelSpecs;
