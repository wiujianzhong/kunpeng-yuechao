// JWF1206厂家PDF第43页：逐格显式建模。
import {jwf1206P38P49Verified} from '../jwf1206-p38-p49-verified.js';
import {annulus,buildPageSpecs,extrude,hole,plate,spec,tube} from './jwf1206-rebuild-p38-p55-helpers.js';
const rows=jwf1206P38P49Verified.filter(part=>part.page===43);

function progressiveCompressionSpring(){
  const turns=5,count=150,radius=(20.5-2.8)/2;
  const axialRatio=t=>t<.32?t/.32*.18:t<.68?.18+(t-.32)/.36*.64:.82+(t-.68)/.32*.18;
  const points=Array.from({length:count+1},(_,index)=>{
    const t=index/count,angle=t*turns*Math.PI*2;
    return [axialRatio(t)*45.9-45.9/2,Math.cos(angle)*radius,Math.sin(angle)*radius];
  });
  return [tube(points,1.4,{material:'darkMetal',radialSegments:12})];
}

const builders={
  'jwf1206-p43-item-001':part=>spec(part,{views:['轴向全剖视图','端视图'],assumptions:['外径φ28、孔径φ13.5、厚3按厂家明确标注','材料牌号和倒角未标，不反推'],material:'plastic',primitives:[annulus(28,13.5,3,{material:'plastic'})]}),
  'jwf1206-p43-item-002':part=>spec(part,{level:'轮廓级',views:['轴向全剖视图'],assumptions:['最大口径φ20、轴向控制长12按标注','直筒外径、贯通孔径、V槽深度和喇叭口壁厚按建模前二维叠合估算','直筒、V槽和外翻口为单一连续旋转体，不再拆成两个相互穿插圆环'],material:'plastic',primitives:[{type:'lathe',points:[[3.2,-6],[7,-6],[7,1.4],[4.6,2.3],[10,6],[3.2,4],[3.2,-6]],rotation:[0,0,-Math.PI/2],material:'plastic',flatShading:false}]}),
  'jwf1206-p43-item-003':part=>spec(part,{level:'轮廓级',views:['主视图','侧视图'],assumptions:['板宽50、厚6按厂家明确标注','总高、圆角、孔径和孔位按建模前二维叠合估算','左侧两孔明确大于右侧两孔，四孔均贯穿'],primitives:[extrude([[-25,9.3],[-22.9,13.1],[-20.1,15.1],[17.1,25.6],[20.1,25.7],[22.7,24.4],[25,21.4],[25,-11.7],[23.7,-14.6],[21.1,-16.3],[-19.9,-25.7],[-22.4,-25.1],[-24.3,-23.4],[-25,-20.7]],6,{holes:[hole(-17.3,8.1,3.6),hole(-17.3,-17.7,3.4),hole(17.9,17.9,2.9),hole(17.9,-7.7,2.7)]})]}),
  'jwf1206-p43-item-004':part=>spec(part,{level:'轮廓级',views:['压缩弹簧主视图'],assumptions:['线径2.8、自由长45.9按厂家明确标注','外径约20.5、总圈数约5圈按建模前二维叠合估算','两端密绕、中段大节距属于同一根连续螺旋线'],material:'darkMetal',primitives:progressiveCompressionSpring()}),
  'jwf1206-p43-item-005':part=>spec(part,{level:'轮廓级',views:['轴向半剖视图'],assumptions:['筒体外径φ23、肩部外径φ30、总长11.5按厂家明确标注','壁厚约1、肩宽和过渡圆角按建模前二维叠合估算','薄壁筒体连续外翻形成肩部，不再用两个厚圆环相叠'],material:'plastic',primitives:[{type:'lathe',points:[[10.5,-5.75],[11.5,-5.75],[11.5,3.2],[11.7,3.8],[12.4,4.4],[15,4.85],[15,5.75],[14,5.75],[14,5.05],[11.6,4.6],[10.9,3.9],[10.5,3.2],[10.5,-5.75]],rotation:[0,0,-Math.PI/2],material:'plastic',flatShading:false}]}),
  'jwf1206-p43-item-006':part=>spec(part,{views:['正视图','断面图'],assumptions:['长120、宽15、厚3按标注','粘合密封条为柔性橡胶，不渲染为金属'],material:'rubber',primitives:[plate(120,15,3,{material:'rubber'})]}),
};
export const jwf1206P43ModelSpecs=buildPageSpecs(rows,builders,43);
export default jwf1206P43ModelSpecs;
