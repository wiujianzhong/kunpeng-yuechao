// JWF1206厂家PDF第48页：逐格显式建模。
import {jwf1206P38P49Verified} from '../jwf1206-p38-p49-verified.js';
import {annulus,box,buildPageSpecs,cylinder,extrude,hole,plate,rect,spec,torus,tube} from './jwf1206-rebuild-p38-p55-helpers.js';
const rows=jwf1206P38P49Verified.filter(part=>part.page===48);
const PI=Math.PI;
const polygonHole=points=>({kind:'polygon',points});

function transitionPipe(){
  const outer={type:'loft',material:'paintedMetal',doubleSided:true,rotation:[0,0,PI/2],sections:[
    {x:-102.5,points:[[-165,-185],[165,-185],[165,185],[-165,185]]},
    {x:102.5,points:[[-135,-150],[135,-150],[135,150],[-135,150]]},
  ]};
  const inner={type:'loft',material:'darkMetal',doubleSided:true,rotation:[0,0,PI/2],sections:[
    {x:-102.5,points:[[-153,-173],[153,-173],[153,173],[-153,173]]},
    {x:102.5,points:[[-123,-138],[123,-138],[123,138],[-123,138]]},
  ]};
  return [
    outer,inner,
    extrude(rect(330,370),8,{holes:[polygonHole(rect(306,346))],rotation:[PI/2,0,0],position:[0,-102.5,0]}),
    extrude(rect(270,300),6,{holes:[polygonHole(rect(246,276))],rotation:[PI/2,0,0],position:[0,102.5,0],material:'darkMetal'}),
  ];
}

function supportingPlateAssembly(){
  const body=[[-225,-175],[-100,-175],[225,15],[225,150],[-225,150]];
  return [
    extrude(body,6,{holes:[polygonHole(rect(80,45)),hole(-200,-100,5),hole(-200,-145,5),hole(205,95,5),hole(205,45,5)]}),
    plate(58,32,6,{holes:[hole(0,2,5)],position:[-170,166,0]}),
    plate(58,32,6,{holes:[hole(0,2,5)],position:[70,166,0]}),
    box([8,350,183],'darkMetal',[221,0,-91]),
    box([300,8,183],'metal',[65,-171,-91]),
    box([235,8,160],'metal',[85,10,-80],[0,0,-.42]),
  ];
}

function threadedSeat(){
  return [{
    type:'lathe',material:'metal',rotation:[0,0,PI/2],
    points:[[0,21.35],[5.5,17],[10,8],[12.5,2],[12.5,-21.35],[10.5,-21.35],[10.5,-10.65],[0,-10.65],[0,21.35]],
  }];
}

function panelBetween(width,[y1,z1],[y2,z2],material='paintedMetal'){
  const length=Math.hypot(y2-y1,z2-z1),rotation=Math.atan2(z2-z1,y2-y1);
  return box([width,length,5],material,[0,(y1+y2)/2,(z1+z2)/2],[rotation,0,0]);
}

function tonguePlate(){
  return [
    plate(25,30,5,{holes:[hole(0,3,6)],position:[0,21,5],bevel:1.5}),
    panelBetween(25,[6,5],[-6,-5]),
    plate(25,30,5,{position:[0,-21,-5],bevel:1.5}),
  ];
}

const builders={
  'jwf1206-p48-item-001':part=>spec(part,{level:'轮廓级',views:['正视总管轮廓图'],assumptions:['厂家仅明确标注顶部主口宽249','总高、主管深度、四个侧支口和底部斜口的第三向尺寸未标，只依闭合外廓建模'],primitives:[tube([[0,310,0],[0,180,0],[0,20,0],[0,-190,0],[0,-320,0]],72,{material:'paintedMetal',radialSegments:24}),annulus(249,225,18,{axis:'y',position:[0,310,0],material:'darkMetal'}),tube([[-15,170,0],[-150,90,0],[-245,90,0]],44,{material:'paintedMetal'}),tube([[15,120,0],[145,45,0],[235,45,0]],42,{material:'paintedMetal'}),tube([[-10,-20,0],[-170,-75,0],[-260,-75,0]],40,{material:'paintedMetal'}),tube([[10,-80,0],[145,-145,0],[230,-145,0]],40,{material:'paintedMetal'}),tube([[0,-250,0],[-85,-345,0]],52,{material:'paintedMetal'}),torus(46,5,'darkMetal',[-245,90,0],[Math.PI/2,0,0]),torus(44,5,'darkMetal',[235,45,0],[Math.PI/2,0,0])]}),
  'jwf1206-p48-item-002':part=>spec(part,{level:'轮廓级',views:['正视图','右侧视图'],assumptions:['外廓450×350、侧向深183按厂家明确标注','主体为异形前板、两只顶部带孔耳、后侧竖板、底折边和斜撑组成的薄壁焊接总成','长方形减重孔、各安装孔、耳板和筋板局部尺寸未标，按两视比例估算'],primitives:supportingPlateAssembly()}),
  'jwf1206-p48-item-003':part=>spec(part,{level:'轮廓级',views:['330向正视图','370向侧视图'],assumptions:['矩形底法兰两向330×370、过渡高度205按厂家明确标注','主体为中空薄壁矩形变径管，底部和顶部均为开口法兰；不再使用四块厚实板封成实体','顶部小口尺寸、壁厚和法兰孔局部尺寸未标，按两视比例估算'],primitives:transitionPipe()}),
  'jwf1206-p48-item-004':part=>spec(part,{level:'轮廓级',views:['轴向主视图'],assumptions:['气管外径φ8、长700按厂家明确标注','气管为连续中空低反光软管，中心和隐藏线不建实体','内径未标，按图估为φ6'],material:'plastic',primitives:[annulus(8,6,700,{material:'plastic'})]}),
  'jwf1206-p48-item-005':part=>spec(part,{level:'轮廓级',views:['正视矩形环','厚度标注'],assumptions:['外廓330×370、厚3按标注','内孔和四角孔未标，按原格比例估算'],material:'rubber',primitives:[extrude(rect(330,370),3,{holes:[{kind:'polygon',points:rect(285,322)},hole(-155,-175,3),hole(155,-175,3),hole(-155,175,3),hole(155,175,3)],material:'rubber'})]}),
  'jwf1206-p48-item-006':part=>spec(part,{level:'轮廓级',views:['正视矩形环','厚度标注'],assumptions:['外廓300×330、厚20按标注','内孔未标，按原格比例估算'],material:'rubber',primitives:[extrude(rect(300,330),20,{holes:[{kind:'polygon',points:rect(260,290)}],material:'rubber',bevel:2})]}),
  'jwf1206-p48-item-007':part=>spec(part,{level:'轮廓级',views:['轴向局部剖视图'],assumptions:['总长42.7、大端外径φ25、右端内螺纹M21按厂家明确标注','左端为连续圆钝锥头，右段为φ25圆柱并带M21盲内螺纹孔；螺纹示意线不建实体凸环','锥段分段长度、盲孔深度和螺纹牙型未标，按剖视比例估算'],material:'metal',primitives:threadedSeat()}),
  'jwf1206-p48-item-008':part=>spec(part,{level:'轮廓级',views:['正视图','侧视折弯图'],assumptions:['总高72、宽25、厚5按厂家明确标注','上段和下段为两片平行竖板，中部以连续斜折面形成S形错位；正视两条横线对应折弯边','上部孔径和前后错位量未标，按两视比例估算'],primitives:tonguePlate()}),
};
export const jwf1206P48ModelSpecs=buildPageSpecs(rows,builders,48);
export default jwf1206P48ModelSpecs;
