// JWF1206厂家PDF第54页：按轴向装配图、剖视图及端视图逐件显式建模。
import {jwf1206P50P61Verified} from '../jwf1206-p50-p61-verified.js';
import {PI,annulus,box,buildPageSpecs,cylinder,extrude,hole,plate,spec} from './jwf1206-rebuild-p38-p55-helpers.js';
const rows=jwf1206P50P61Verified.filter(part=>part.page===54);

function beaterHousing(side){
  const front=extrude([[-60,-80],[60,-80],[60,-55],[56,-25],[46,25],[25,72],[0,88.5],[-25,72],[-46,25],[-56,-25],[-60,-55]],70,{holes:[hole(0,0,31),hole(-42,-60,5),hole(42,-60,5)],material:'paintedMetal',bevel:2});
  const stepA=annulus(92,62,18,{axis:'z',material:'metal',position:[0,0,side==='right'?44:-44]});
  const stepB=annulus(76,48,12,{axis:'z',material:'darkMetal',position:[0,0,side==='right'?-41:41]});
  return [front,box([120,18,100],'darkMetal',[0,-71,0]),stepA,stepB];
}

const circlePoints=(radius,segments=48)=>Array.from({length:segments},(_,index)=>{const angle=index*PI*2/segments;return [Math.cos(angle)*radius,Math.sin(angle)*radius]});
const boltHoles=Array.from({length:6},(_,index)=>{const angle=index*PI/3;return hole(Math.cos(angle)*47,Math.sin(angle)*47,3)});
function arcSlot(center){
  const points=[];
  for(let index=0;index<=12;index++){const angle=center-.42+index*.84/12;points.push([Math.cos(angle)*70,Math.sin(angle)*70])}
  for(let index=12;index>=0;index--){const angle=center-.42+index*.84/12;points.push([Math.cos(angle)*46,Math.sin(angle)*46])}
  return {kind:'polygon',points:points.reverse()};
}

const builders={
  'jwf1206-p54-item-001':part=>spec(part,{views:['轴向主视装配图'],assumptions:['刺辊总长1352、工作体外径172.5按标注','工作体长度和两端各级轴径未标，按原格轴向比例分段；表面只保留细小齿面语义，不添加夸大纵向翼片'],primitives:[cylinder(86.25,610,'x','darkMetal'),annulus(182,60,14,{material:'metal',position:[-298,0,0]}),annulus(182,60,14,{material:'metal',position:[298,0,0]}),cylinder(45,80,'x','paintedMetal',[-345,0,0]),cylinder(45,80,'x','paintedMetal',[345,0,0]),cylinder(30,120,'x','metal',[-445,0,0]),cylinder(30,120,'x','metal',[445,0,0]),cylinder(20,100,'x','darkMetal',[-555,0,0]),cylinder(20,100,'x','darkMetal',[555,0,0]),cylinder(12,71,'x','metal',[-640.5,0,0]),cylinder(12,71,'x','metal',[640.5,0,0])]}),
  'jwf1206-p54-item-002':part=>spec(part,{views:['轴向剖视图'],assumptions:['外径150、内径120、轴向宽16均按标注','密封圈结合件按完整橡胶环体表达'],material:'rubber',primitives:[annulus(150,120,16,{material:'rubber'})]}),
  'jwf1206-p54-item-003':part=>spec(part,{views:['正视图','轴向剖视图'],assumptions:['顶部R88.5、底宽120、轴向总深100、轴心高80按标注','右轴承座两侧止口按右件剖视方向表达，孔径未标'],primitives:beaterHousing('right')}),
  'jwf1206-p54-item-004':part=>spec(part,{views:['正视图','轴向剖视图'],assumptions:['顶部R88.5、底宽120、轴向总深100、轴心高80按标注','左轴承座不是复用右件：轴向两级止口位置按左件剖视镜像'],primitives:beaterHousing('left')}),
  'jwf1206-p54-item-005':part=>spec(part,{views:['轴向主视图'],assumptions:['总长65、螺纹M12×1按标注','两端倒角和退刀槽未标，按通长调节螺柱表达'],material:'metal',primitives:[cylinder(6,65,'x','darkMetal'),annulus(14,12,4,{material:'metal',position:[-29.5,0,0]}),annulus(14,12,4,{material:'metal',position:[29.5,0,0]})]}),
  'jwf1206-p54-item-006':part=>spec(part,{views:['正视图','侧视图','俯视图'],assumptions:['总高55、总宽33、侧向深28按标注','叉耳孔径和底部连接孔未标，按原格U形调节座表达'],primitives:[box([33,10,28],'paintedMetal',[0,-22.5,0]),plate(8,45,28,{holes:[hole(0,11,4)],position:[-12.5,5,0]}),plate(8,45,28,{holes:[hole(0,11,4)],position:[12.5,5,0]}),box([17,8,18],'darkMetal',[0,-14,0])]}),
  'jwf1206-p54-item-007':part=>spec(part,{views:['轴向剖视图'],assumptions:['外径45、内径13、厚5均按标注','平垫圈按完整环体表达'],material:'metal',primitives:[annulus(45,13,5,{material:'metal'})]}),
  'jwf1206-p54-item-008':part=>spec(part,{views:['端视图','轴向剖视图'],assumptions:['右轴承盖外径119、轴向总宽26按标注','中心孔及六个安装孔孔径未标，轴向台阶按右盖剖视'],material:'metal',primitives:[extrude(circlePoints(59.5),12,{holes:[hole(0,0,24),...boltHoles],material:'paintedMetal',position:[-7,0,0],rotation:[0,PI/2,0]}),annulus(92,40,14,{material:'metal',position:[6,0,0]})]}),
  'jwf1206-p54-item-009':part=>spec(part,{views:['端视图','轴向剖视图'],assumptions:['左轴承盖外径119、轴向总宽29按标注','左盖轴向台阶与右盖相反；中心孔和六孔孔径未标'],material:'metal',primitives:[extrude(circlePoints(59.5),14,{holes:[hole(0,0,24),...boltHoles],material:'paintedMetal',position:[7.5,0,0],rotation:[0,PI/2,0]}),annulus(92,40,15,{material:'metal',position:[-7,0,0]})]}),
  'jwf1206-p54-item-010':part=>spec(part,{views:['轴向剖视图'],assumptions:['最大外径70、轴向总长45按标注','内孔及两端台阶直径未标，按原格比例表达'],level:'轮廓级',material:'metal',primitives:[annulus(70,36,25,{material:'metal',position:[-10,0,0]}),annulus(58,36,20,{material:'darkMetal',position:[12.5,0,0]})]}),
  'jwf1206-p54-item-011':part=>spec(part,{views:['端视图','轴向剖视图'],assumptions:['带轮外径175、轴向宽45按标注','中心孔和三条弧形减重槽尺寸未标；按端视位置建成真实贯通槽，不再误加外圆凸环'],level:'轮廓级',material:'metal',primitives:[extrude(circlePoints(87.5),45,{holes:[hole(0,0,17),arcSlot(0),arcSlot(PI*2/3),arcSlot(PI*4/3)],material:'metal',rotation:[0,PI/2,0]}),annulus(58,26,58,{material:'paintedMetal'})]}),
  'jwf1206-p54-item-012':part=>spec(part,{views:['正视图','侧视图'],assumptions:['外形20×16、厚10按标注','中央圆孔孔径未标，按原格比例取6'],primitives:[extrude([[-8,-10],[8,-10],[8,10],[-8,10]],10,{holes:[hole(0,0,3)],material:'metal',bevel:.5})]}),
};
export const jwf1206P54ModelSpecs=buildPageSpecs(rows,builders,54);
export default jwf1206P54ModelSpecs;
