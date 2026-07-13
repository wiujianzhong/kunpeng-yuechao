// JWF1206厂家PDF第53页：按轴向剖视、正视轮廓和截面图分别显式建模。
import {jwf1206P50P61Verified} from '../jwf1206-p50-p61-verified.js';
import {PI,annulus,box,buildPageSpecs,cylinder,extrude,spec} from './jwf1206-rebuild-p38-p55-helpers.js';
const rows=jwf1206P50P61Verified.filter(part=>part.page===53);

function roundedUSection(){
  const points=[[-3,-4.75],[-3,1.75]];
  for(let index=0;index<=14;index++){const angle=PI-index*PI/14;points.push([Math.cos(angle)*3,1.75+Math.sin(angle)*3])}
  points.push([3,-4.75],[1.4,-3.2],[1.4,1.75]);
  for(let index=0;index<=14;index++){const angle=index*PI/14;points.push([Math.cos(angle)*1.4,1.75+Math.sin(angle)*1.4])}
  points.push([-1.4,-3.2]);
  return points;
}
const builders={
  'jwf1206-p53-item-001':part=>spec(part,{views:['轴向剖视图','端部外形图'],assumptions:['外径32、内径19、对边19.5、轴向总长26按标注','端部锁止平面和内孔台阶按本格剖视表达'],material:'metal',primitives:[annulus(32,19,18,{material:'metal',position:[-4,0,0]}),annulus(25,12,8,{material:'darkMetal',position:[9,0,0]}),box([9,19.5,19.5],'metal',[8.5,0,0])]}),
  'jwf1206-p53-item-002':part=>spec(part,{views:['轴向剖视图'],assumptions:['大径15.8、小径10、总长27按标注','中间止口宽度按原格比例，端部槽深未标'],material:'metal',primitives:[cylinder(5,9,'x','darkMetal',[-9,0,0]),cylinder(7.9,10,'x','metal',[.5,0,0]),cylinder(5,8,'x','darkMetal',[9.5,0,0]),annulus(18,10,3,{material:'metal',position:[-4.5,0,0]})]}),
  'jwf1206-p53-item-003':part=>spec(part,{views:['主视异形轮廓','侧视图'],assumptions:['总高37、最大宽22、主体宽14、厚4按标注','上部方孔和下部斜锁舌按原格轮廓，局部圆角未标'],material:'metal',primitives:[extrude([[-7,-18.5],[7,-18.5],[7,-3],[11,3],[7,9],[7,18.5],[-7,18.5],[-7,8],[-10,4],[-7,-2]],4,{holes:[{kind:'polygon',points:[[-4,9],[4,9],[4,17],[-4,17]]}],material:'metal',bevel:.5})]}),
  'jwf1206-p53-item-004':part=>spec(part,{views:['轴向剖视图'],assumptions:['外径15、内径10.5、厚0.5均按标注','平垫圈按完整环体表达'],material:'metal',primitives:[annulus(15,10.5,.5,{material:'metal'})]}),
  'jwf1206-p53-item-005':part=>spec(part,{views:['圆头U形截面图'],assumptions:['密封条外包截面6×9.5按标注','按原格圆头U形开口截面重建；11dm是单机用量，不反推单段裁切长度，3D仅取80长代表段展示截面'],level:'轮廓级',material:'rubber',primitives:[extrude(roundedUSection(),80,{material:'rubber',bevel:.3})]}),
};
export const jwf1206P53ModelSpecs=buildPageSpecs(rows,builders,53);
export default jwf1206P53ModelSpecs;
