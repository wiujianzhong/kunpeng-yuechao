// JWF1206厂家PDF第44页：逐格显式建模。
import {jwf1206P38P49Verified} from '../jwf1206-p38-p49-verified.js';
import {annulus,box,buildPageSpecs,extrude,hole,plate,spec,torus,tube} from './jwf1206-rebuild-p38-p55-helpers.js';
const rows=jwf1206P38P49Verified.filter(part=>part.page===44);

function supportingFrameProfile(){
  const inner=[];
  for(let index=0;index<=18;index++){
    const angle=Math.PI/4-index*(Math.PI*1.5/18);
    inner.push([Math.cos(angle)*10,3+Math.sin(angle)*10]);
  }
  return [[-15,-16],[15,-16],[15,9],[14.2,11.5],[12.2,14],[9.2,16],[6.7,13.5],...inner,[-6.7,13.5],[-9.2,16],[-12.2,14],[-14.2,11.5],[-15,9]];
}

function asymmetricExtensionSpring(){
  const wire=1.2,radius=(9-wire)/2,turns=10,count=180;
  const coil=Array.from({length:count+1},(_,index)=>{
    const t=index/count,angle=t*turns*Math.PI*2;
    return [-8+t*16,Math.cos(angle)*radius,Math.sin(angle)*radius];
  });
  const left=[[-8,radius,0],[-11,3.5,0],[-14.6,3.2,0]];
  const centerX=-17.95,eyeRadius=4.5;
  for(let index=0;index<=42;index++){
    const angle=.8+index*((Math.PI*2-1.3)/42);
    left.push([centerX+Math.cos(angle)*eyeRadius,Math.sin(angle)*eyeRadius,0]);
  }
  const right=[[8,radius,0],[9.2,3.8,0],[10.2,2.6,0],[11.2,.8,0],[13,0,0],[22.45,0,0]];
  return [tube(coil,wire/2,{material:'darkMetal',radialSegments:10}),tube(left,wire/2,{material:'darkMetal',radialSegments:10}),tube(right,wire/2,{material:'darkMetal',radialSegments:10})];
}

const polygonHole=points=>({kind:'polygon',points});

function shieldAssembly(){
  const frontProfile=[[-235,-39],[235,-39],[235,39],[190,39],[190,3],[-235,3]];
  const foldedPlan=[[-235,39],[235,39],[235,-13],[231,-20],[85,-20],[85,-39],[-47,-39],[-47,-26],[-207,-26],[-207,-39],[-228,-39],[-228,-22],[-235,-15]];
  return [
    extrude(frontProfile,3,{position:[0,0,-37.5],holes:[hole(210,27,6)]}),
    extrude(foldedPlan,3,{position:[0,0,0],rotation:[Math.PI/2,0,0]}),
    plate(320,12,2,{position:[-70,-22,-35.5],material:'darkMetal'}),
    box([3,78,58],'paintedMetal',[233.5,0,10]),
  ];
}

function leftSideShell(){
  const outer=[[-70.5,124.5],[90.5,124.5],[90.5,-65],[80,-78],[50,-78],[40,-95],[35,-124.5],[15,-124.5],[-65,-96],[-90.5,-25],[-90.5,53],[-70.5,124.5]];
  const inner=[[-58,111],[77,111],[77,-55],[68,-65],[44,-65],[32,-84],[25,-109],[18,-110],[-54,-85],[-74,-20],[-74,48],[-58,111]];
  return [
    plate(490,249,3,{position:[0,0,89]}),
    extrude(outer,490,{holes:[polygonHole(inner)],rotation:[0,Math.PI/2,0]}),
    ...[[-220,120], [170,120], [-220,-120], [-60,-120]].map(([x,y])=>box([20,4,3],'darkMetal',[x,y,91])),
  ];
}

function rightMainProfile(){
  return [[-245,-125],[110,-125],[110,-113],[245,-113],[245,125],[-83,125],[-85,110],[-92,85],[-105,58],[-122,30],[-145,5],[-175,-18],[-210,-34],[-245,-43]];
}

function rightEndProfiles(){
  const outer=[[-89.25,125],[72,125],[89.25,40],[56,-105],[-30,-125],[-8,-70],[-25,-55],[-89.25,-55]];
  const lap=[[62,119],[72,119],[87,40],[53,-99],[42,-96],[78,39]];
  return {outer,lap};
}

const builders={
  'jwf1206-p44-item-001':part=>spec(part,{level:'轮廓级',views:['主视图','俯视折边图'],assumptions:['470总长和78总高/总深按厂家明确标注','实体为前侧竖板、水平折边板、右端耳板和前侧搭接条组成的薄壁组合件；不再使用大实心块相交','右耳单孔、分段折边与两个底边缺口按两视图比例；板厚、孔径及各段长度未标'],primitives:shieldAssembly()}),
  'jwf1206-p44-item-002':part=>spec(part,{level:'轮廓级',views:['主视图','左视图（端面）'],assumptions:['490×249×181三向包络按厂家明确标注','端面内外双线识别为连续薄壁壳/搭接层，沿490方向延伸；不再用三块厚盒相交','主视四个短标记按搭接/紧固片表达，不作为贯穿孔；板厚与折弯圆角未标'],primitives:leftSideShell()}),
  'jwf1206-p44-item-003':part=>spec(part,{level:'轮廓级',views:['主视图','左视图（端面）'],assumptions:['490总长和178.5最大深按厂家明确标注；正视总高未标，按原格比例估为250','主视曲线外形由一张薄壁侧板连续成形，右端另有178.5深不对称端板及右侧搭接条；两张视图不互相替代','左上曲线、右下台阶、端面凹口及局部双线均按原格比例，板厚和折弯半径未标'],primitives:[extrude(rightMainProfile(),3,{position:[0,0,89]}),extrude(rightEndProfiles().outer,3,{position:[243.5,0,0],rotation:[0,Math.PI/2,0]}),extrude(rightEndProfiles().lap,2,{position:[241.5,0,0],rotation:[0,Math.PI/2,0],material:'darkMetal'})]}),
  'jwf1206-p44-item-004':part=>spec(part,{level:'轮廓级',views:['主视图'],assumptions:['主体外廓56×19、厚3按厂家明确标注','上缘凸台宽高、中央孔径和竖向位置按建模前二维叠合估算','凸台位于正中，不再使用偏置台阶'],primitives:[extrude([[-28,-9.5],[28,-9.5],[28,9.5],[7.5,9.5],[7.5,15.5],[-7.5,15.5],[-7.5,9.5],[-28,9.5]],3,{holes:[hole(0,2,4.5)]})]}),
  'jwf1206-p44-item-005':part=>spec(part,{level:'轮廓级',views:['主视开口卡槽','俯视图'],assumptions:['外廓宽30、高32、深16按厂家明确标注','上部是向顶面开口的连续圆弧卡槽，不是内部封闭圆孔','卡槽半径、开口宽、底部紧固孔内外径按建模前二维叠合估算'],primitives:[extrude(supportingFrameProfile(),16),annulus(8,4,1.2,{axis:'y',position:[0,-15.4,0],material:'darkMetal'})]}),
  'jwf1206-p44-item-006':part=>spec(part,{level:'轮廓级',views:['轴向主视图'],assumptions:['外径φ21.2、内径φ16.8、长800均按厂家明确标注','中部断裂符号只为缩短画法，模型保持连续800长管','波纹节距与沟深未标，按原格示意估为节距10、沟深约0.9'],material:'plastic',primitives:[annulus(19.4,16.8,800,{material:'plastic'}),...Array.from({length:80},(_,i)=>torus(9.7,.9,'plastic',[-395+i*10,0,0]))]}),
  'jwf1206-p44-item-007':part=>spec(part,{level:'轮廓级',views:['拉簧主视图'],assumptions:['簧体外径φ9、总长44.9按厂家明确标注','断裂符号之间为同一连续密绕簧体','左端为开口圆眼，右端为长直弯钩，不再复用对称双圆钩模板','线径、圈数和钩部局部尺寸按建模前二维叠合估算'],material:'darkMetal',primitives:asymmetricExtensionSpring()}),
};
export const jwf1206P44ModelSpecs=buildPageSpecs(rows,builders,44);
export default jwf1206P44ModelSpecs;
