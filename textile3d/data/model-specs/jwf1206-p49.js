// JWF1206厂家PDF第49页：八件吸口逐件读取走向，不共用通用风管模板。
import {jwf1206P38P49Verified} from '../jwf1206-p38-p49-verified.js';
import {annulus,box,buildPageSpecs,cylinder,extrude,hole,plate,rect,spec,torus,tube} from './jwf1206-rebuild-p38-p55-helpers.js';
const rows=jwf1206P38P49Verified.filter(part=>part.page===49);
const PI=Math.PI;
const flange=(radius,position,rotation=[0,Math.PI/2,0])=>torus(radius*1.04,Math.max(3,radius*.12),'darkMetal',position,rotation);
const polygonHole=points=>({kind:'polygon',points});

function upperDuct(){
  const widths=[100,145,165,140,165,145,100],xs=[-592.5,-510,-260,0,260,510,592.5],height=110;
  const sections=widths.map((width,index)=>({x:xs[index],points:[[-height/2,-width/2],[height/2,-width/2],[height/2,width/2],[-height/2,width/2]]}));
  const inner=widths.map((width,index)=>({x:xs[index],points:[[-height/2+6,-width/2+6],[height/2-6,-width/2+6],[height/2-6,width/2-6],[-height/2+6,width/2-6]]}));
  return [
    {type:'loft',sections,material:'paintedMetal',doubleSided:true},
    {type:'loft',sections:inner,material:'darkMetal',doubleSided:true},
    extrude(rect(130,150),10,{holes:[polygonHole(rect(110,130))],rotation:[0,PI/2,0],position:[-587.5,0,0]}),
    extrude(rect(130,150),10,{holes:[polygonHole(rect(110,130))],rotation:[0,PI/2,0],position:[587.5,0,0]}),
  ];
}

function capsulePoints(cx,cy,width,height,segments=8){
  const radius=width/2,straight=height/2-radius,points=[];
  for(let i=0;i<=segments;i++){const a=PI+i*PI/segments;points.push([cx+Math.cos(a)*radius,cy-straight+Math.sin(a)*radius])}
  for(let i=0;i<=segments;i++){const a=i*PI/segments;points.push([cx+Math.cos(a)*radius,cy+straight+Math.sin(a)*radius])}
  return points;
}

function supportRod(totalLength,bodyLength){
  const across=16,radius=across/Math.sqrt(3),hex=Array.from({length:6},(_,i)=>{const a=PI/6+i*PI/3;return[Math.cos(a)*radius,Math.sin(a)*radius]});
  const threadLength=(totalLength-bodyLength)/2;
  return [
    extrude(hex,bodyLength,{rotation:[0,PI/2,0],material:'metal'}),
    cylinder(4,threadLength,'x','darkMetal',[-(bodyLength+threadLength)/2,0,0]),
    cylinder(4,threadLength,'x','darkMetal',[(bodyLength+threadLength)/2,0,0]),
  ];
}
const builders={
  'jwf1206-p49-item-001':part=>spec(part,{level:'轮廓级',views:['单张主视走向图'],assumptions:['水平中心距494和右上接口宽72按标注','原格无端视图，第三向截面与壁厚按接口比例估算'],primitives:[tube([[-247,0,0],[-105,0,0],[80,0,0],[155,38,0],[175,110,0],[160,205,0]],32,{material:'paintedMetal',radialSegments:22}),flange(34,[-247,0,0]),flange(34,[160,205,0],[Math.PI/2,0,0]),box([70,8,28],'metal',[45,25,0],[0,0,.5])]}),
  'jwf1206-p49-item-002':part=>spec(part,{level:'轮廓级',views:['单张主视走向图'],assumptions:['总水平尺寸588.5、右上接口宽175按标注','左上U形支管、中部竖支管和第三向截面未标'],primitives:[tube([[-294,-15,0],[-190,-90,0],[-25,-105,0],[155,-55,0],[294,90,0]],38,{material:'paintedMetal'}),tube([[-190,-65,0],[-210,55,0],[-180,145,0]],24,{material:'paintedMetal'}),tube([[5,-90,0],[0,55,0],[-35,125,0]],22,{material:'paintedMetal'}),flange(40,[294,90,0],[Math.PI/2,0,0]),box([80,12,40],'darkMetal',[-15,-120,0])]}),
  'jwf1206-p49-item-003':part=>spec(part,{level:'轮廓级',views:['主视走向图','俯视多接口图'],assumptions:['水平长251、总高313.5按标注','俯视显示三个上接口，其直径、深度和孔距未标'],primitives:[tube([[-125,-145,0],[40,-145,0],[72,-110,0],[80,-15,0],[68,110,0],[95,157,0]],32,{material:'paintedMetal'}),tube([[-80,-145,0],[-80,-35,0]],22,{material:'paintedMetal'}),tube([[0,-145,0],[0,-28,0]],24,{material:'paintedMetal'}),tube([[80,-145,0],[80,-35,0]],22,{material:'paintedMetal'}),flange(34,[-125,-145,0]),flange(34,[95,157,0],[Math.PI/2,0,0])]}),
  'jwf1206-p49-item-004':part=>spec(part,{views:['主视走向图'],assumptions:['水平长438、垂向最大高417、右端接口深86按标注','双回环内腔与壁厚未标，按原格外轮廓估算'],primitives:[tube([[-219,-145,0],[-85,-145,0],[40,-120,0],[120,-70,0],[205,-70,0]],43,{material:'paintedMetal'}),tube([[-85,-130,0],[-160,-35,0],[-155,85,0],[-80,165,0],[-5,175,0],[45,115,0],[18,35,0],[-55,5,0],[-95,-45,0]],30,{material:'paintedMetal'}),flange(46,[205,-70,0]),torus(48,5,'darkMetal',[-155,75,0],[Math.PI/2,0,0])]}),
  'jwf1206-p49-item-005':part=>spec(part,{level:'轮廓级',views:['单张主视走向图'],assumptions:['总长963、左端高190按标注','多段分支风道截面、壁厚和第三向尺寸未标'],primitives:[tube([[-481,-45,0],[-310,-30,0],[-140,-10,0],[60,-45,0],[250,-55,0],[420,-20,0],[481,15,0]],34,{material:'paintedMetal'}),tube([[-360,-30,0],[-300,55,0],[-215,105,0]],28,{material:'paintedMetal'}),tube([[-40,-20,0],[-25,85,0],[65,125,0]],25,{material:'paintedMetal'}),tube([[240,-50,0],[285,-120,0],[350,-145,0]],24,{material:'paintedMetal'}),flange(36,[-481,-45,0]),flange(36,[481,15,0])]}),
  'jwf1206-p49-item-006':part=>spec(part,{level:'轮廓级',views:['单张主视走向图'],assumptions:['总长536按标注','三支口的口径、高度和第三向截面未标'],primitives:[tube([[-268,90,0],[-120,20,0],[30,-35,0],[160,-70,0],[245,-70,0]],31,{material:'paintedMetal'}),tube([[-110,15,0],[-40,-95,0],[30,-125,0]],24,{material:'paintedMetal'}),tube([[105,-55,0],[115,55,0],[100,95,0]],24,{material:'paintedMetal'}),flange(34,[-268,90,0]),flange(34,[245,-70,0])]}),
  'jwf1206-p49-item-007':part=>spec(part,{level:'轮廓级',views:['单张主视走向图'],assumptions:['右上水平尺寸168按标注','总长、弯管直径和左端法兰尺寸未标'],primitives:[tube([[-150,-60,0],[-65,-35,0],[15,10,0],[80,55,0],[168,55,0]],24,{material:'paintedMetal'}),flange(28,[-150,-60,0]),flange(28,[168,55,0],[Math.PI/2,0,0]),box([55,10,30],'metal',[-115,-82,0],[0,0,.15])]}),
  'jwf1206-p49-item-008':part=>spec(part,{level:'轮廓级',views:['单张主视走向图'],assumptions:['总长438、上部进口高207按标注','下部弧管截面和第三向深度未标'],primitives:[tube([[-219,95,0],[-110,80,0],[-60,5,0],[15,-75,0],[125,-120,0],[219,-95,0]],32,{material:'paintedMetal'}),tube([[-190,100,0],[-190,-45,0]],38,{material:'paintedMetal'}),flange(40,[-190,100,0],[Math.PI/2,0,0]),flange(35,[219,-95,0])]}),
  'jwf1206-p49-item-009':part=>spec(part,{level:'轮廓级',views:['正视图','俯视变截面图'],assumptions:['总长1185按厂家明确标注','主体按两视重建为贯通中空矩形风道，俯视宽度沿长度分段收放；不再用厚盒封成实心','两端截面宽高、中段各宽度、壁厚和断裂省略段长度未标，按两视比例估算'],primitives:upperDuct()}),
  'jwf1206-p49-item-010':part=>spec(part,{level:'轮廓级',views:['正视闭合轮廓','侧视厚度'],assumptions:['总长338、厚4按厂家明确标注','上端为向下开口挂钩，下端为竖向长圆贯通槽；不是矩形孔','板宽、挂钩和长圆槽尺寸未标，按两视比例估算'],primitives:[extrude([[-22,-169],[18,-169],[18,135],[28,145],[28,165],[5,165],[5,145],[-22,145]],4,{holes:[polygonHole(capsulePoints(0,-125,14,44))],bevel:1})]}),
  'jwf1206-p49-item-011':part=>spec(part,{level:'轮廓级',views:['轴向局部剖视图','六角端视图'],assumptions:['总长200、六角对边16、两端M8按厂家明确标注','中段为实心六角杆，两端为同轴M8外螺纹段；剖面线和螺纹示意线不建实体','两端螺纹段长未标，按原格比例估为20'],material:'metal',primitives:supportRod(200,160)}),
  'jwf1206-p49-item-012':part=>spec(part,{views:['正视图','侧视图'],assumptions:['主板235×185、侧向深165.5、总高170按标注','三角减重孔、四安装孔和折边厚度未标'],primitives:[extrude([[-117.5,-85],[80,-85],[117.5,-35],[117.5,85],[-70,85],[-117.5,45]],6,{holes:[{kind:'polygon',points:[[-45,-35],[55,-35],[30,38],[-30,38]]},hole(-100,-70,4),hole(95,-70,4),hole(-95,65,4),hole(95,65,4)],bevel:1}),box([8,170,165.5],'darkMetal',[113.5,0,-82.75]),box([185,8,150],'metal',[15,-81,-75])]}),
  'jwf1206-p49-item-013':part=>spec(part,{level:'轮廓级',views:['轴向局部剖视图','六角端视图'],assumptions:['总长156、六角对边16、两端M8按厂家明确标注','中段为实心六角杆，两端为同轴M8外螺纹段；不再错误建成空心圆管','两端螺纹段长未标，按原格比例估为18'],material:'metal',primitives:supportRod(156,120)}),
};
export const jwf1206P49ModelSpecs=buildPageSpecs(rows,builders,49);
export default jwf1206P49ModelSpecs;
