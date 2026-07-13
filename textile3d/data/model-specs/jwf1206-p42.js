// JWF1206厂家PDF第42页：逐格识图、显式建模。
import {jwf1206P38P49Verified} from '../jwf1206-p38-p49-verified.js';
import {PI,annulus,box,buildPageSpecs,cylinder,extrude,hole,plate,spec,tube} from './jwf1206-rebuild-p38-p55-helpers.js';

const rows=jwf1206P38P49Verified.filter(part=>part.page===42);
const circle=(radius,segments=64)=>Array.from({length:segments},(_,index)=>{const angle=PI*2*index/segments;return[Math.cos(angle)*radius,Math.sin(angle)*radius]});
const hex=acrossFlats=>{const radius=acrossFlats/(2*Math.cos(PI/6));return Array.from({length:6},(_,index)=>{const angle=PI/6+index*PI/3;return[Math.cos(angle)*radius,Math.sin(angle)*radius]})};
const latheX=(points,material='metal')=>({type:'lathe',points,rotation:[0,0,PI/2],material});
const fastener=(x,y,z,across=10,depth=2)=>extrude(hex(across),depth,{material:'darkMetal',position:[x,y,z],bevel:.3});
const lobe=(sign=1)=>{
  const edge=1.5,start=Math.asin(edge/5),end=PI-start;
  const arc=Array.from({length:25},(_,index)=>{const angle=start+(end-start)*index/24;return[Math.cos(angle)*5,sign*Math.sin(angle)*5]});
  return sign>0?arc:[...arc].reverse();
};
const guideRodPoints=()=>{
  const points=[[-19.5,12,0],[-19.5,59.25,9]];
  for(let index=1;index<=24;index++){const angle=PI-PI*index/24;points.push([Math.cos(angle)*19.5,59.25+Math.sin(angle)*19.5,12])}
  points.push([19.5,-59.25,0]);
  for(let index=1;index<=24;index++){const angle=-PI*index/24;points.push([Math.cos(angle)*19.5,-59.25+Math.sin(angle)*19.5,0])}
  points.push([-19.5,-12,0]);
  return points;
};

const builders={
  'jwf1206-p42-item-001':part=>spec(part,{level:'轮廓级',views:['轴向全剖视图'],assumptions:['总成最大外径φ72、图示轴向总长152.6按厂家标注','剖面线、中心线和轴承滚子交叉线不建实体；按剖视关系恢复贯通轴、左右轴承、间隔套、左端盖和右安装体','各段直径、轴承型号和轴向分段均未标，仅按剖视比例表达'],material:'darkMetal',primitives:[cylinder(13,152.6,'x','metal'),annulus(38,26,22.3,{position:[-65.15,0,0],material:'darkMetal'}),annulus(60,26,30,{position:[-39,0,0],material:'darkMetal'}),annulus(38,26,28,{position:[-10,0,0],material:'metal'}),annulus(60,26,32,{position:[20,0,0],material:'darkMetal'}),annulus(72,26,40.6,{position:[56,0,0],material:'paintedMetal'}),annulus(52,26,18,{position:[-39,0,0],material:'metal'}),annulus(52,26,18,{position:[20,0,0],material:'metal'})]}),

  'jwf1206-p42-item-002':part=>spec(part,{level:'轮廓级',views:['主视图','右视图'],assumptions:['主视主体宽64按厂家标注','主视两圆形特征是上下紧固件头；右视显示横向刮刀板、下方夹持座、横向转轴与右端上折刃口','主体高度、纵深、刃板长度及折弯角均未标，按两视图比例表达'],primitives:[box([64,45,6],'paintedMetal',[0,0,1]),box([64,24,24],'paintedMetal',[0,10,-22]),box([64,3,76],'metal',[0,23,0]),box([64,3,17],'darkMetal',[0,28,-43],[.62,0,0]),cylinder(3,58,'y','metal',[25,0,0]),cylinder(5.5,1.2,'z','metal',[12,11,4.6]),cylinder(5.5,1.2,'z','metal',[12,-11,4.6]),fastener(12,11,5.5,8.5),fastener(12,-11,5.5,8.5),extrude(hex(18),10,{holes:[hole(0,0,4)],material:'darkMetal',position:[0,-7,-27],rotation:[0,PI/2,0],bevel:.3}),annulus(20,8,3,{material:'metal',position:[5.5,-7,-27],axis:'x'})]}),

  'jwf1206-p42-item-003':part=>spec(part,{level:'轮廓级',views:['主视图','左视图'],assumptions:['主视主体宽64按厂家标注','与上刮刀不是简单上下翻面：侧视中刃板伸出方向、横向转轴和折弯端与上刮刀相反','主体高度、纵深、刃板长度及折弯角均未标，按两视图比例表达'],primitives:[box([64,45,6],'paintedMetal',[0,0,-1]),box([64,24,24],'paintedMetal',[0,10,22]),box([64,3,76],'metal',[0,23,0]),box([64,3,17],'darkMetal',[0,28,43],[-.62,0,0]),cylinder(3,58,'y','metal',[-25,0,0]),cylinder(5.5,1.2,'z','metal',[-12,11,-4.6]),cylinder(5.5,1.2,'z','metal',[-12,-11,-4.6]),fastener(-12,11,-5.5,8.5),fastener(-12,-11,-5.5,8.5),extrude(hex(18),10,{holes:[hole(0,0,4)],material:'darkMetal',position:[0,-7,27],rotation:[0,PI/2,0],bevel:.3}),annulus(20,8,3,{material:'metal',position:[-5.5,-7,27],axis:'x'})]}),

  'jwf1206-p42-item-004':part=>spec(part,{level:'轮廓级',views:['轴向全剖视图'],assumptions:['带轮外径φ57、轮宽35按厂家标注','外圈为齿形带轮轮体，中部交叉线区域按轴承/滚动件位置表达，不把交叉线建成实体肋板','内孔、轴承直径、轴向伸出和具体齿形均未标，不虚构外齿'],material:'darkMetal',primitives:[annulus(57,36,35,{material:'darkMetal'}),annulus(36,18,14,{position:[-8.5,0,0],material:'metal'}),annulus(36,18,14,{position:[8.5,0,0],material:'metal'}),cylinder(9,53,'x','metal'),annulus(38,18,2,{position:[18.5,0,0],material:'darkMetal'})]}),

  'jwf1206-p42-item-005':part=>spec(part,{level:'轮廓级',views:['侧向剖视图','正视外壳图'],assumptions:['外壳总高272、侧向深60按厂家标注','正视外壳主体恢复上、中、下三个主要圆孔及右侧中孔；其余盖板、筋线和紧固件是表面装配信息，不误作贯穿大孔','正视总宽、各孔径、板厚和局部盖板尺寸未标，按原图轮廓比例表达'],primitives:[extrude([[-86,136],[52,136],[67,120],[86,65],[86,18],[80,2],[86,-20],[76,-73],[56,-116],[4,-136],[-72,-127],[-88,-109]],60,{holes:[hole(0,79,29),hole(-3,2,34),hole(-50,-92,26),hole(52,3,13)],material:'paintedMetal',bevel:1.2}),...[[0,79,31,9],[-3,2,31,10],[-50,-92,31,8],[52,3,31,7]].map(([x,y,z,across])=>fastener(x,y,z,across,1.6))]}),

  'jwf1206-p42-item-006':part=>spec(part,{level:'轮廓级',views:['主视图','俯视图'],assumptions:['主视外廓134×75、俯视深47按厂家标注','主视大圆和右侧小圆均为贯穿深度方向的孔；左侧收腰、底部圆弧和右耳外形按厂家轮廓重描','两孔直径、左侧横向小孔及局部倒角未标，保留轮廓级'],primitives:[extrude([[-67,37.5],[18,37.5],[42,18],[55,15],[64,8],[67,0],[66,-7],[55,-15],[35,-20],[22,-32],[5,-37.5],[-18,-36],[-37,-27],[-43,-16],[-47,0],[-47,17],[-56,25],[-63,25],[-67,30]],47,{holes:[hole(-6,0,31),hole(51,0,11)],material:'paintedMetal',bevel:1.1})]}),

  'jwf1206-p42-item-007':part=>spec(part,{level:'轮廓级',views:['主视图','俯视图'],assumptions:['外廓80×30、厚10按厂家标注','中部大孔和两端小孔为三处贯穿孔；孔径和孔中心距未标，按主视比例表达'],primitives:[plate(80,30,10,{holes:[hole(-30,0,5),hole(0,0,8),hole(30,0,5)],bevel:.5})]}),

  'jwf1206-p42-item-008':part=>spec(part,{level:'轮廓级',views:['主视图','俯视图'],assumptions:['外廓82×30、厚10按厂家标注','左侧为贯穿长圆槽，右侧为贯穿圆孔；不再用两个分离圆孔冒充长圆槽','槽长、槽宽、圆孔直径和孔距未标，按主视比例表达'],primitives:[plate(82,30,10,{holes:[hole(-28,0,5),hole(-16,0,5),{kind:'polygon',points:[[-28,-5],[-16,-5],[-16,5],[-28,5]]},hole(25,0,5)],bevel:.5})]}),

  'jwf1206-p42-item-009':part=>spec(part,{level:'轮廓级',views:['轴向主视图'],assumptions:['左端M12螺纹和总长86按厂家标注','按原图恢复左螺纹段、窄过渡、中央加粗段、右侧台阶段及末端挡圈槽；中心线和螺纹示意线不建实体','各台阶直径与长度未标，按主视比例表达'],material:'metal',primitives:[latheX([[0,-43],[7,-42],[8,-41],[7,-40],[7,-35],[9,-34],[9,-11],[10,-10],[10,10],[5,14],[6,15],[6,43],[0,43]],'metal')]}),

  'jwf1206-p42-item-010':part=>spec(part,{level:'轮廓级',views:['轴向主视图'],assumptions:['两端主轴外径φ20、总长70按厂家标注','零件为两段φ20轴体由中间细颈连接，不再建成一根等径轴加端部套','细颈直径、长度及端部倒角未标，按主视比例表达'],material:'metal',primitives:[latheX([[0,-35],[9.4,-35],[10,-34],[10,-3],[5,-3],[5,1],[10,1],[10,34],[9.4,35],[0,35]],'metal')]}),

  'jwf1206-p42-item-011':part=>spec(part,{level:'轮廓级',views:['轴向主视图'],assumptions:['主轴外径φ10、总长90按厂家标注','右端矩形特征是从端面向内开的槽，不是附加实体块；末端按上下两个圆弧截面实体重建','槽宽、槽深和左端倒角未标，按主视比例表达'],material:'metal',primitives:[cylinder(5,84.5,'x','metal',[-2.75,0,0]),extrude(lobe(1),5.5,{material:'metal',position:[42.25,0,0],rotation:[0,PI/2,0]}),extrude(lobe(-1),5.5,{material:'metal',position:[42.25,0,0],rotation:[0,PI/2,0]})]}),

  'jwf1206-p42-item-012':part=>spec(part,{level:'轮廓级',views:['侧视图','端视图','俯视图'],assumptions:['水平腿长42、板宽25、立边高21按厂家标注','三视图共同确定为90°折弯L形板：水平腿远端两角倒角并有大孔，竖直腿顶部两角倒角并有较小孔','板厚、两孔直径、孔距和弯曲半径未标，按三视轮廓表达'],primitives:[extrude([[-21,-12.5],[18,-12.5],[21,-9.5],[21,9.5],[18,12.5],[-21,12.5]],3,{holes:[hole(10,0,4.2)],material:'paintedMetal'}),extrude([[0,-12.5],[17,-12.5],[21,-8.5],[21,8.5],[17,12.5],[0,12.5]],3,{holes:[hole(11,0,3)],material:'darkMetal',position:[-19.5,0,0],rotation:[0,PI/2,0]})]}),

  'jwf1206-p42-item-013':part=>spec(part,{level:'轮廓级',views:['正视开口长环','侧视上段偏折'],assumptions:['杆径φ12、正视总高169.5和总宽51按厂家标注','正视是一根连续杆形成的左侧开口长环，上下两个自由端位于左侧；不再误建成两端都向下的普通倒U形','侧视显示上段向深度方向偏折；偏折量、弯曲半径和开口间距未标，按两视图比例表达'],material:'metal',primitives:[tube(guideRodPoints(),6,{material:'metal',radialSegments:20})]}),

  'jwf1206-p42-item-014':part=>spec(part,{level:'轮廓级',views:['轴向全剖视图','六角端视图'],assumptions:['总长54、最大六角段对边10按厂家标注','外部由四个轴向台阶段组成，最大段为六角体；内部是贯通阶梯孔，不再用三个圆环代替六角外形','各段长度、外径、孔径及螺纹规格未标，按剖视比例表达'],material:'metal',primitives:[extrude(hex(7),10,{holes:[hole(0,0,2.2)],material:'metal',position:[-22,0,0],rotation:[0,PI/2,0],bevel:.25}),extrude(hex(9),18,{holes:[hole(0,0,2.2)],material:'metal',position:[-8,0,0],rotation:[0,PI/2,0],bevel:.25}),extrude(hex(10),16,{holes:[hole(0,0,3)],material:'darkMetal',position:[9,0,0],rotation:[0,PI/2,0],bevel:.25}),extrude(hex(7),10,{holes:[hole(0,0,3)],material:'metal',position:[22,0,0],rotation:[0,PI/2,0],bevel:.25})]}),
};

export const jwf1206P42ModelSpecs=buildPageSpecs(rows,builders,42);
export default jwf1206P42ModelSpecs;
