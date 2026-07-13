// JWF1206厂家PDF第46页：逐格显式建模。
import {jwf1206P38P49Verified} from '../jwf1206-p38-p49-verified.js';
import {PI,annulus,box,buildPageSpecs,cylinder,extrude,hole,plate,spec,spring,tube} from './jwf1206-rebuild-p38-p55-helpers.js';
const rows=jwf1206P38P49Verified.filter(part=>part.page===46);
const coverArc=Array.from({length:7},(_,index)=>{const angle=-.58+index*.16;return box([32,5,78],'paintedMetal',[-70+index*23,Math.sin(angle)*42,-Math.cos(angle)*42],[0,0,angle])});
const polygonHole=points=>({kind:'polygon',points});

function keyedHole(cx,cy,radius,stemWidth,stemHeight){
  const points=[[cx-stemWidth/2,cy+radius+stemHeight],[cx+stemWidth/2,cy+radius+stemHeight],[cx+stemWidth/2,cy+radius*.7]];
  for(let index=0;index<=24;index++){
    const angle=Math.PI/3-index*Math.PI*5/3/24;
    points.push([cx+Math.cos(angle)*radius,cy+Math.sin(angle)*radius]);
  }
  points.push([cx-stemWidth/2,cy+radius*.7]);
  return polygonHole(points);
}

function steppedConnectingPin(){
  return [{
    type:'lathe',rotation:[0,0,PI/2],material:'metal',
    points:[[0,-12.75],[3.3,-12.75],[4,-11.7],[4,-8],[7,-7],[7,1.2],[4.2,1.2],[4.2,11.5],[3.5,12.75],[0,12.75]],
  }];
}

function slottedBush(){
  const segments=24,outer=[],inner=[];
  for(let index=0;index<=segments;index++){
    const angle=Math.PI/2+index*Math.PI*1.5/segments;
    outer.push([Math.cos(angle)*8,Math.sin(angle)*8]);
  }
  for(let index=0;index<=segments;index++){
    const angle=Math.PI*2-index*Math.PI*1.5/segments;
    inner.push([Math.cos(angle)*4.5,Math.sin(angle)*4.5]);
  }
  const middle=extrude([...outer,...inner],2.8,{position:[0,0,0],rotation:[0,PI/2,0],material:'darkMetal'});
  return [
    annulus(16,9,3.6,{position:[-3.2,0,0],material:'metal'}),
    middle,
    annulus(16,9,3.6,{position:[3.2,0,0],material:'metal'}),
  ];
}

function tPlateProfile(){
  return [[-9,6.25],[9,6.25],[9,1.8],[5.5,1.8],[5.5,-6.25],[-6,-6.25],[-6,1.8],[-9,1.8]];
}

function ventRod(){
  return [{
    type:'lathe',rotation:[0,0,PI/2],material:'metal',
    points:[[1.25,-27],[3.6,-27],[3.6,-14],[5.7,-14],[5.7,20],[7.5,20],[7.5,27],[1.25,27],[1.25,-27]],
  }];
}

function lTypePlate(){
  const profile=[[-39.75,63.5],[39.75,63.5],[39.75,-63.5],[-39.75,-63.5],[-39.75,-25]];
  for(let index=1;index<=12;index++){
    const angle=-Math.PI/2+index*Math.PI/12;
    profile.push([-39.75+Math.cos(angle)*20,Math.sin(angle)*25]);
  }
  profile.push([-39.75,25]);
  return [
    extrude(profile,2,{holes:[hole(20,54,3),hole(-23.5,-54,3)]}),
    box([3,17,7],'darkMetal',[-38.25,36,3.5]),
    box([3,17,7],'darkMetal',[-38.25,-36,3.5]),
  ];
}

function roundedRectPoints(width,height,radius,segments=5){
  const points=[];
  for(const [cx,cy,start] of [[width/2-radius,height/2-radius,0],[-width/2+radius,height/2-radius,PI/2],[-width/2+radius,-height/2+radius,PI],[width/2-radius,-height/2+radius,PI*1.5]]){
    for(let index=0;index<=segments;index++){const angle=start+index*PI/2/segments;points.push([cx+Math.cos(angle)*radius,cy+Math.sin(angle)*radius])}
  }
  return points;
}
const builders={
  'jwf1206-p46-item-001':part=>spec(part,{level:'轮廓级',views:['轴向半剖主视图','前端视图'],assumptions:['φ80、轴向73和前端总宽68为明确尺寸','喇叭薄壁、前端开口环架、底部两块支座、中央拉杆及侧面连杆属于同一组合件','现有图元只能表达喇叭与部分连杆，无法让前端开口环架和主视铰接机构同时闭合，旧占位模型不纳入验收'],primitives:[{type:'lathe',points:[[7,-36.5],[10,-36.5],[40,33],[40,36.5],[37,36.5],[7,-32],[7,-36.5]],rotation:[0,0,PI/2],material:'paintedMetal'},annulus(86,72,5,{position:[34,0,0],material:'darkMetal'}),cylinder(5,78,'z','metal',[8,-40,0]),tube([[8,-35,0],[22,-55,0],[22,-72,0]],3,{material:'metal'})]}),
  'jwf1206-p46-item-002':part=>spec(part,{level:'轮廓级',views:['轴向全剖视图'],assumptions:['外管φ16、组合件总长111.5按明确标注','外管、左右导向套、贯穿顶杆、内滑块和右侧压簧同轴连续；剖面白区是孔腔','各段长度、内径、顶杆直径、弹簧线径和圈数按剖视比例估算'],material:'metal',primitives:[annulus(16,11,82,{material:'darkMetal'}),cylinder(2,111.5,'x','metal'),annulus(14,6,9,{position:[-41.5,0,0],material:'metal'}),annulus(15,6,9,{position:[41.5,0,0],material:'metal'}),cylinder(5,43,'x','metal',[-12,0,0]),...spring(20,10,1.1,7,{material:'brass'}).map(p=>({...p,position:[20,0,0]}))]}),
  'jwf1206-p46-item-003':part=>spec(part,{level:'轮廓级',views:['正视图','右视弧形图'],assumptions:['正视底边长172、侧视曲率R174按明确标注','主体为宽度随高度变化的连续弧形薄板，两端另有方向不同的焊接耳','现有分段盒与实心侧板不能同时满足正视梯形外廓和右视R174连续曲面，旧占位模型不纳入验收'],primitives:[...coverArc,extrude([[-86,-45],[48,-45],[68,-25],[68,45],[-60,45],[-86,12]],5,{holes:[hole(58,-34,4)]})]}),
  'jwf1206-p46-item-004':part=>spec(part,{level:'轮廓级',views:['轴向全剖视图'],assumptions:['M12外螺纹壳体和壳体轴向长22按明确标注','壳体为空心回转件，内含左右压簧、中央滑块和右端突出碰珠；剖面线不建纹理','内孔、端法兰、滑块、弹簧和碰珠尺寸按剖视比例估算'],material:'metal',primitives:[annulus(12,8.2,22,{material:'darkMetal'}),annulus(16,8.2,3,{position:[-9.5,0,0],material:'metal'}),...spring(7,7,1,3,{material:'brass'}).map(p=>({...p,position:[-4,0,0]})),cylinder(3.1,6,'x','metal',[3,0,0]),...spring(4,7,1,2,{material:'brass'}).map(p=>({...p,position:[7,0,0]})),{type:'lathe',points:Array.from({length:15},(_,index)=>{const y=-5.5+index*11/14;return[Math.sqrt(Math.max(0,5.5*5.5-y*y)),y]}),rotation:[0,0,PI/2],material:'metal',position:[14,0,0],flatShading:false}]}),
  'jwf1206-p46-item-005':part=>spec(part,{level:'轮廓级',views:['主视图','右视图'],assumptions:['外廓48×55、深15按明确标注','主视左上为带上开直槽的钥匙孔形贯穿孔，另有上下两个圆形贯穿孔；右视仅给出15厚度','三孔孔径和孔位按建模前二维叠合估算'],primitives:[plate(48,55,15,{holes:[keyedHole(-14.2,9.8,5.2,4.5,4.5),hole(.8,6.5,5.8),hole(.8,-13.2,5.8)]})]}),
  'jwf1206-p46-item-006':part=>spec(part,{level:'轮廓级',views:['轴向主视图'],assumptions:['最大外径φ14、总长25.5按明确标注','唯一视图没有剖面线和隐藏孔线，按实心同轴台阶连接销解释；左端、中央法兰、右端轴颈和两端倒角连续','各段直径、长度和倒角按原格比例估算'],material:'metal',primitives:steppedConnectingPin()}),
  'jwf1206-p46-item-007':part=>spec(part,{level:'轮廓级',views:['端视图','轴向全剖视图'],assumptions:['外径φ16、轴向宽10按明确标注','端视同心圆与轴向剖面共同证明中空衬套；剖视上壁中央白区解释为局部径向开槽，槽未贯穿两端面','内径、槽宽和倒角按二维叠合估算'],material:'metal',primitives:slottedBush()}),
  'jwf1206-p46-item-008':part=>spec(part,{level:'轮廓级',views:['主视T形轮廓','右视厚度图'],assumptions:['主视总宽18、总高12.5、右视厚3按明确标注','主体为不对称T形单片，下部窄柄有一个贯穿圆孔','肩部宽度、孔径和孔位按二维叠合估算'],primitives:[extrude(tPlateProfile(),3,{holes:[hole(-.25,-2.9,.9)]})]}),
  'jwf1206-p46-item-009':part=>spec(part,{level:'轮廓级',views:['轴向主视图'],assumptions:['外径φ16、长60按明确标注','两条轴向隐藏线与套类名称共同证明为连续中空圆套，不把中心线当孔','内径未标，按厂家视图比例估为φ12'],material:'metal',primitives:[annulus(16,12,60,{material:'metal'})]}),
  'jwf1206-p46-item-010':part=>spec(part,{level:'轮廓级',views:['轴向全剖视图'],assumptions:['大端最大外径φ15、总长54按明确标注','零件为左大端法兰、中段主体、右端细轴颈连续成形的中空通气杆，中心孔贯通','内孔、台阶直径和各段长度按剖视比例估算'],material:'metal',primitives:ventRod()}),
  'jwf1206-p46-item-011':part=>spec(part,{level:'轮廓级',views:['主视图','厚度标注'],assumptions:['底边宽137、总高132、厚2按明确标注','单块异形薄板，左上长斜边、右上短折角，四角各一贯穿孔','斜边转折、孔径和孔位按二维叠合估算'],primitives:[extrude([[-68.5,-66],[68.5,-66],[68.5,53],[62,60],[52,66],[-31,66],[-42,62],[-48,55],[-68.5,-14]],2,{holes:[hole(-62.6,-56.7,3),hole(63.1,-56.7,3),hole(-39.1,55.7,3),hole(58.1,55.7,3)]})]}),
  'jwf1206-p46-item-012':part=>spec(part,{level:'轮廓级',views:['主视异形轮廓','左视折弯耳图'],assumptions:['主板高127、宽79.5、侧向最大深7按明确标注','主板左侧为向内半圆缺口，右侧上下各一贯穿孔；侧视两处短折弯耳，不是整高厚盒','板厚、缺口半径、孔径和折弯耳局部尺寸按二维叠合估算'],primitives:lTypePlate()}),
  'jwf1206-p46-item-013':part=>spec(part,{level:'轮廓级',views:['正视图','板厚标注'],assumptions:['外廓109×54、厚2按明确标注','四角小圆角半径未标，按原格比例估算；不再用大倒角制造额外框线'],material:'glass',primitives:[extrude(roundedRectPoints(109,54,5),2,{material:'glass'})]}),
  'jwf1206-p46-item-014':part=>spec(part,{level:'轮廓级',views:['主视图','俯视图','右视图'],assumptions:['主视总宽179、正视总高158按明确标注','厂家三视图显示为带弧形侧框、前框、矩形视窗、内部板件和多孔位的复杂座体组合件','现有实心异形块无法同时解释三视图中的空腔、弧形框、窗口、内部筋板和孔位，旧占位模型不纳入验收'],primitives:[extrude([[-89.5,-79],[89.5,-79],[89.5,79],[18,79],[-28,55],[-75,12]],42,{holes:[hole(-45,15,18),hole(42,-15,6)],bevel:2}),box([92,12,52],'darkMetal',[25,-60,-24]),box([12,125,52],'metal',[-80,-8,-24])]}),
  'jwf1206-p46-item-015':part=>spec(part,{views:['端视图','侧视图'],assumptions:['外径φ18、厚4按标注','原格中无中心孔，按实心圆片建模'],material:'metal',primitives:[cylinder(9,4,'x','metal')]}),
};
export const jwf1206P46ModelSpecs=buildPageSpecs(rows,builders,46);
export default jwf1206P46ModelSpecs;
