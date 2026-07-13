// JWF1206厂家PDF第51页：逐格辨认投影视图后显式建模。
import {jwf1206P50P61Verified} from '../jwf1206-p50-p61-verified.js';
import {PI,annulus,box,buildPageSpecs,cylinder,extrude,hole,plate,spec,torus} from './jwf1206-rebuild-p38-p55-helpers.js';
const rows=jwf1206P50P61Verified.filter(part=>part.page===51);

function corrugatedHose(length,diameter,rings){
  const body=[annulus(diameter-5,diameter-15,length,{material:'rubber'})];
  for(let index=0;index<rings;index++){
    const x=-length/2+8+index*(length-16)/(rings-1);
    body.push(torus(diameter/2-1.2,1.8,'rubber',[x,0,0]));
  }
  body.push(annulus(diameter+4,diameter-8,14,{material:'rubber',position:[-length/2+7,0,0]}));
  body.push(annulus(diameter+4,diameter-8,14,{material:'rubber',position:[length/2-7,0,0]}));
  return body;
}

const builders={
  'jwf1206-p51-item-001':part=>spec(part,{views:['轴向剖视图'],assumptions:['外径32、轴向总长20、连接端直径16按标注','左端滚花圆盘与右侧细轴按剖视台阶重建，细齿数量未标'],material:'plastic',primitives:[{type:'lathe',points:[[0,-10],[16,-10],[16,-5],[8,-5],[8,10],[0,10]],rotation:[0,0,PI/2],material:'plastic',position:[0,0,0]}]}),
  'jwf1206-p51-item-002':part=>spec(part,{views:['主视图'],assumptions:['软管展开长1420、外径75按标注','原图为直管表示；内径和波纹节距未标，按软管语义保留贯通内孔并均布波纹'],material:'rubber',primitives:corrugatedHose(1420,75,34)}),
  'jwf1206-p51-item-003':part=>spec(part,{views:['主视轮廓图'],assumptions:['主视总宽300、总高160按标注','原格为左侧整板连接右侧上下两条弯臂，并非左右对称件；板厚和孔径未标'],level:'轮廓级',primitives:[plate(175,150,6,{material:'paintedMetal',position:[-62.5,0,0]}),extrude([[-5,62],[32,58],[70,42],[105,38],[122,52],[150,70],[143,80],[116,72],[99,58],[66,55],[28,70],[-5,76]],6,{holes:[hole(137,67,4)],material:'paintedMetal',bevel:1}),extrude([[-5,-62],[32,-58],[70,-42],[105,-38],[122,-52],[150,-70],[143,-80],[116,-72],[99,-58],[66,-55],[28,-70],[-5,-76]],6,{holes:[hole(137,-67,4)],material:'paintedMetal',bevel:1}),plate(24,150,10,{holes:[hole(0,-55,4),hole(0,0,4),hole(0,55,4)],material:'darkMetal',position:[19,0,-2]})]}),
  'jwf1206-p51-item-004':part=>spec(part,{views:['侧向主视图','窄边正视图'],assumptions:['总高195、侧向深63、窄边宽30按标注','三个安装孔孔径及局部折边尺寸未标'],primitives:[extrude([[-31.5,-97.5],[31.5,-97.5],[31.5,-58],[15,-42],[15,70],[31.5,88],[31.5,97.5],[-12,97.5],[-12,62],[-31.5,48]],30,{holes:[hole(0,-76,4),hole(0,0,4),hole(0,76,4)],bevel:1}),plate(30,195,4,{holes:[hole(0,-76,4),hole(0,0,4),hole(0,76,4)],material:'darkMetal',position:[0,0,-17]})]}),
  'jwf1206-p51-item-005':part=>spec(part,{views:['主视图','侧视图'],assumptions:['总长276、宽30、厚4按标注','顶部弯钩和底部长孔按原格轮廓，未标局部尺寸按比例'],primitives:[extrude([[-15,-138],[15,-138],[15,115],[11,115],[11,138],[-6,138],[-6,124],[-15,124]],4,{holes:[{kind:'polygon',points:[[-5,-125],[5,-125],[5,-112],[-5,-112]]}],material:'metal',bevel:.6})]}),
  'jwf1206-p51-item-006':part=>spec(part,{views:['主视图'],assumptions:['软管展开长1150、外径50按标注','内径和波纹节距未标，按软管语义保留贯通内孔并均布波纹'],material:'rubber',primitives:corrugatedHose(1150,50,30)}),
  'jwf1206-p51-item-007':part=>spec(part,{views:['主视图','侧视图'],assumptions:['总长283、宽30、厚4按标注','与FA225-5210外廓不同：顶部为短直钩、下部长孔位置按本格'],primitives:[extrude([[-15,-141.5],[15,-141.5],[15,121],[8,121],[8,141.5],[-9,141.5],[-9,128],[-15,128]],4,{holes:[{kind:'polygon',points:[[-5,-129],[5,-129],[5,-116],[-5,-116]]}],material:'metal',bevel:.6})]}),
  'jwf1206-p51-item-008':part=>spec(part,{views:['主视图','环首端视特征'],assumptions:['环心至螺纹端长度75、螺纹M8按标注','环首外径和孔径未标，按原格比例重建'],material:'metal',primitives:[cylinder(4,63,'x','metal',[6,0,0]),cylinder(4.8,23,'x','darkMetal',[26,0,0]),torus(11,3.6,'metal',[-37.5,0,0])]}),
};
export const jwf1206P51ModelSpecs=buildPageSpecs(rows,builders,51);
export default jwf1206P51ModelSpecs;
