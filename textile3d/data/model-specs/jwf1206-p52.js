// JWF1206厂家PDF第52页：清除尺寸线干扰后，按主视/剖视显式建模。
import {jwf1206P50P61Verified} from '../jwf1206-p50-p61-verified.js';
import {PI,annulus,box,buildPageSpecs,cylinder,extrude,hole,plate,spec} from './jwf1206-rebuild-p38-p55-helpers.js';
const rows=jwf1206P50P61Verified.filter(part=>part.page===52);

function cleanerAssembly(totalLength,front){
  const bodyLength=front?760:750;
  const primitives=[box([bodyLength,118,42],'paintedMetal')];
  for(let index=0;index<9;index++){
    const y=-48+index*12;
    primitives.push(box([bodyLength-80,5,52],index%2?'metal':'darkMetal',[0,y,-5]));
  }
  primitives.push(box([34,132,68],'darkMetal',[-bodyLength/2+36,0,0]));
  primitives.push(box([34,132,68],'darkMetal',[bodyLength/2-36,0,0]));
  const shoulder=totalLength/2-170;
  primitives.push(cylinder(13,250,'x','metal',[-shoulder,0,0]));
  primitives.push(cylinder(13,250,'x','metal',[shoulder,0,0]));
  if(front){
    primitives.push(box([86,126,82],'paintedMetal',[-totalLength/2+112,0,0]));
    primitives.push(box([62,104,106],'darkMetal',[totalLength/2-100,0,0]));
    primitives.push(annulus(118,34,12,{material:'metal',position:[totalLength/2-46,0,0]}));
    primitives.push(annulus(92,34,12,{material:'metal',position:[-totalLength/2+54,0,0]}));
  }else{
    primitives.push(box([64,104,108],'darkMetal',[-totalLength/2+102,0,0]));
    primitives.push(box([92,128,80],'paintedMetal',[totalLength/2-116,0,0]));
    primitives.push(annulus(118,34,12,{material:'metal',position:[-totalLength/2+46,0,0]}));
    primitives.push(annulus(92,34,12,{material:'metal',position:[totalLength/2-54,0,0]}));
  }
  return primitives;
}

function capsule(width,height,segments=12){
  const radius=width/2,straight=height/2-radius,points=[];
  for(let index=0;index<=segments;index++){const angle=PI-index*PI/segments;points.push([Math.cos(angle)*radius,straight+Math.sin(angle)*radius])}
  for(let index=0;index<=segments;index++){const angle=-index*PI/segments;points.push([Math.cos(angle)*radius,-straight+Math.sin(angle)*radius])}
  return points;
}

const builders={
  'jwf1206-p52-item-001':part=>spec(part,{views:['轴向主视装配图'],assumptions:['装配总长1330按标注','主体按原格矩形栅条清洁器重建，不误判为圆辊；栅条间距和端座局部尺寸未标'],level:'轮廓级',primitives:cleanerAssembly(1330,false)}),
  'jwf1206-p52-item-002':part=>spec(part,{views:['轴向主视装配图'],assumptions:['装配总长1333按标注','与后清洁器不是镜像复制：前清洁器左右方座、法兰和栅条框分别按本格表达'],level:'轮廓级',primitives:cleanerAssembly(1333,true)}),
  'jwf1206-p52-item-003':part=>spec(part,{views:['主视图','端部侧视特征'],assumptions:['挡板总长1040、侧向深32按标注','挡板总高和横条间距未标，按原格九条横向栅条表达'],level:'轮廓级',primitives:[plate(1040,215,4,{material:'paintedMetal'}),...Array.from({length:9},(_,index)=>box([1040,5,32],index%2?'metal':'darkMetal',[0,-84+index*21,-16])),box([18,215,32],'metal',[-500,0,-16]),box([18,215,32],'metal',[500,0,-16])]}),
  'jwf1206-p52-item-004':part=>spec(part,{views:['主视展开轮廓图'],assumptions:['上口总宽980、下口宽550按标注','缺少侧视、总高和板厚；模型只表达两侧斜板汇入下口的总图视觉'],level:'轮廓级',primitives:[extrude([[-490,220],[-34,-220],[-275,-220],[-490,155]],8,{material:'paintedMetal',bevel:1}),extrude([[490,220],[34,-220],[275,-220],[490,155]],8,{material:'paintedMetal',bevel:1}),box([550,18,70],'darkMetal',[0,-211,-35]),box([980,16,45],'metal',[0,212,-22.5])]}),
  'jwf1206-p52-item-005':part=>spec(part,{views:['弧板主视图','弧度端视图'],assumptions:['弧板长度1134、包角72°按标注','弧板宽度、半径和板厚未标，模型只保持长向尺寸与72°弧形特征'],level:'轮廓级',primitives:Array.from({length:9},(_,index)=>{const angle=-PI*.2+index*PI*.4/8;return box([1134,45,4],'paintedMetal',[0,Math.sin(angle)*160,Math.cos(angle)*160],[angle,0,0])}).concat([box([8,360,10],'darkMetal',[0,0,0])])}),
  'jwf1206-p52-item-006':part=>spec(part,{views:['主视图','侧视图'],assumptions:['宽1050、高446、侧向折边41.5按标注','中缝与上下折边按原格表达，孔径和板厚未标'],primitives:[plate(1050,446,5,{holes:[hole(-500,-198,4),hole(500,-198,4),hole(-500,198,4),hole(500,198,4)]}),box([6,446,41.5],'darkMetal',[0,0,-20.75]),box([1050,8,41.5],'metal',[0,-219,-20.75]),box([1050,8,41.5],'metal',[0,219,-20.75])]}),
  'jwf1206-p52-item-007':part=>spec(part,{views:['主视长圆环','侧视图'],assumptions:['密封垫总高150、轴向厚25按标注','正视宽度和内外圆角半径未标，按原格比例重建为橡胶长圆框'],level:'轮廓级',material:'rubber',primitives:[extrude(capsule(100,150),25,{holes:[{kind:'polygon',points:capsule(66,116).reverse()}],material:'rubber',bevel:1})]}),
  'jwf1206-p52-item-008':part=>spec(part,{views:['轴向剖视图'],assumptions:['轴向长30、外径30、内螺纹M12×1按标注','横向锁孔孔径和轴向位置未标，主体按贯通螺纹套表达'],material:'metal',primitives:[annulus(30,12,30,{material:'metal'}),annulus(24,12,12,{material:'darkMetal',position:[9,0,0]})]}),
  'jwf1206-p52-item-009':part=>spec(part,{views:['轴向主视图'],assumptions:['总长183、中间直径16段长104、两端M12按标注','端部退刀槽尺寸按原格比例'],material:'metal',primitives:[cylinder(8,104,'x','metal'),cylinder(6,39.5,'x','darkMetal',[-71.75,0,0]),cylinder(6,39.5,'x','darkMetal',[71.75,0,0]),annulus(18,12,5,{material:'metal',position:[-54.5,0,0]}),annulus(18,12,5,{material:'metal',position:[54.5,0,0]})]}),
  'jwf1206-p52-item-010':part=>spec(part,{views:['轴向剖视图'],assumptions:['外径28、内径16.2、板厚1.7按标注','碟簧自由锥高未标，按原格轻微锥度表达'],material:'metal',primitives:[{type:'lathe',points:[[8.1,-.85],[14,-.25],[14,1.45],[8.1,.85],[8.1,-.85]],rotation:[0,0,PI/2],material:'metal',position:[0,0,0]}]}),
  'jwf1206-p52-item-011':part=>spec(part,{views:['轴向剖视图'],assumptions:['外径22、轴向长11按标注','内孔直径未标，按原格比例取14，仅作装配预览'],level:'轮廓级',material:'metal',primitives:[annulus(22,14,11,{material:'metal'})]}),
  'jwf1206-p52-item-012':part=>spec(part,{views:['轴向主视图'],assumptions:['销杆肩前长度60、杆径5按标注','头部直径和厚度、横孔孔径未标，按原格比例表达'],material:'metal',primitives:[cylinder(2.5,60,'x','metal',[-3,0,0]),cylinder(7.5,6,'x','darkMetal',[30,0,0])]}),
};
export const jwf1206P52ModelSpecs=buildPageSpecs(rows,builders,52);
export default jwf1206P52ModelSpecs;
