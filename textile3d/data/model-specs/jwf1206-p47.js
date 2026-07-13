// JWF1206厂家PDF第47页：6件逐格显式建模。
import {jwf1206P38P49Verified} from '../jwf1206-p38-p49-verified.js';
import {annulus,buildPageSpecs,extrude,spec,tube} from './jwf1206-rebuild-p38-p55-helpers.js';

const rows=jwf1206P38P49Verified.filter(part=>part.page===47);
const PI=Math.PI;

function roundSeat(){
  // 轴向剖视：左端实体封闭，右端φ6盲孔约深12；左外缘按图作小圆钝过渡。
  return [{
    type:'lathe',material:'metal',rotation:[0,0,PI/2],
    points:[[0,12.5],[6,12.5],[8,10.5],[8,-12.5],[3,-12.5],[3,-.5],[0,-.5],[0,12.5]],
  }];
}

function asymmetricExtensionSpring(){
  const wire=1.2,radius=(9-wire)/2,turns=8,count=144;
  const coil=Array.from({length:count+1},(_,index)=>{
    const t=index/count,angle=t*turns*PI*2;
    return[-9+t*18,Math.cos(angle)*radius,Math.sin(angle)*radius];
  });
  const left=[[-9,radius,0],[-11.5,3.6,0],[-13,2.5,0]];
  const eyeCenter=-17.1,eyeRadius=4.1;
  for(let index=0;index<=40;index++){
    const angle=.7+index*((PI*2-1.25)/40);
    left.push([eyeCenter+Math.cos(angle)*eyeRadius,Math.sin(angle)*eyeRadius,0]);
  }
  const right=[[9,radius,0],[10.2,4.2,0],[10.8,2.7,0],[11.8,1,0],[14,0,0],[22.45,0,0],[22.45,-5.2,0]];
  return [
    tube(coil,wire/2,{material:'darkMetal',radialSegments:10}),
    tube(left,wire/2,{material:'darkMetal',radialSegments:10}),
    tube(right,wire/2,{material:'darkMetal',radialSegments:10}),
  ];
}

function steppedConcaveKey(){
  // 左侧11长保留端视凹弧顶面，右侧4长为降台；不再用顶部凸块代替图纸台阶。
  const concaveEnd=[[-3,-3],[3,-3],[3,3],[1.5,2.75],[0,2.55],[-1.5,2.75],[-3,3]];
  return [
    extrude(concaveEnd,11,{rotation:[0,PI/2,0],position:[-2,0,0],material:'metal'}),
    extrude([[-3,-3],[3,-3],[3,0],[-3,0]],4,{rotation:[0,PI/2,0],position:[5.5,0,0],material:'metal'}),
  ];
}

function shoulderedBush(){
  // 名称10X7与剖视共同表明φ10贯通孔、总长7；φ12筒壁右端连续翻肩至φ18。
  return [{
    type:'lathe',material:'metal',rotation:[0,0,PI/2],
    points:[[5,-3.5],[6,-3.5],[6,2.1],[6.4,2.7],[9,2.7],[9,3.5],[5,3.5],[5,-3.5]],
  }];
}

const builders={
  'jwf1206-p47-item-001':part=>spec(part,{level:'轮廓级',views:['轴向局部剖视图'],assumptions:['外径φ16、总长25按厂家明确标注','左端为实体封闭圆钝端，右端为盲孔；剖面线不建实体纹理','盲孔径和孔深未标，按剖视比例估为φ6、深12'],material:'metal',primitives:roundSeat()}),
  'jwf1206-p47-item-002':part=>spec(part,{level:'轮廓级',views:['拉簧主视图'],assumptions:['外径φ9、总长44.9按厂家明确标注','左端为开口圆眼，右端为长直折钩，两端不对称；断裂/尺寸线不建实体','线径、圈数和两端钩部局部尺寸未标，按主视比例估算'],material:'darkMetal',primitives:asymmetricExtensionSpring()}),
  'jwf1206-p47-item-003':part=>spec(part,{level:'轮廓级',views:['轴向主视图'],assumptions:['外径φ3、总长200按厂家明确标注','气管为连续中空软管，中心线和隐藏线不建实体','内径未标，按图与气管语义估为φ1.8'],material:'plastic',primitives:[annulus(3,1.8,200,{material:'plastic'})]}),
  'jwf1206-p47-item-004':part=>spec(part,{level:'轮廓级',views:['主视台阶轮廓','端视凹顶轮廓'],assumptions:['总长15、宽6按厂家明确标注','主视右端是降台，不是顶部凸块；端视上缘为浅凹弧','总高、降台长度/高度和凹弧深度未标，按两视比例估算'],material:'metal',primitives:steppedConcaveKey()}),
  'jwf1206-p47-item-005':part=>spec(part,{level:'尺寸级',views:['轴向全剖视图','端视图'],assumptions:['外径φ14、同心孔φ8、厚0.5全部按厂家明确标注','剖面线和中心十字不建实体，超薄垫片不虚构倒角'],material:'metal',primitives:[annulus(14,8,.5,{material:'metal'})]}),
  'jwf1206-p47-item-006':part=>spec(part,{level:'轮廓级',views:['轴向局部剖视图'],assumptions:['肩部外径φ18、主体外径φ12、总长7按厂家明确标注','名称带肩轴衬10X7与剖视壁厚共同说明φ10贯通孔','肩部宽度与圆滑翻肩过渡未标，按剖视比例估算；不再使用两个厚实圆环相叠'],material:'metal',primitives:shoulderedBush()}),
};

export const jwf1206P47ModelSpecs=buildPageSpecs(rows,builders,47);
export default jwf1206P47ModelSpecs;
