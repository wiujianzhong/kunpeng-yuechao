// ZFA051A-120机件略图第4页：8项独立3D规格。

const circlePoints=(radius,count=48)=>Array.from({length:count},(_,i)=>{const a=Math.PI*2*i/count;return [Math.cos(a)*radius,Math.sin(a)*radius]});
const parts={
  1:['ZFA051A-120-0129','密封条',4,['1200','20','δ4','8-Φ8']],
  2:['ZFA051A-120-0140','盖板',2,['280','180','δ3']],
  3:['ZFA051A-120-0146','刷子压板',1,['1196','7']],
  4:['ZFA051A-0120','密封条',2,['778','R288.5','δ2']],
  5:['ZFA051A-0121','密封条',2,['304','279','δ2']],
  6:['ZFA051A-0130A','密封条',2,['55','δ2']],
  7:['ZFA051A-0131','密封条',2,['R252','R152','δ2']],
  8:['ZFA051A-0132A','密封条',2,['464']],
};
const source=(item,assumptions)=>{const [code,nameZh,quantity,dimensions]=parts[item];return {page:4,item,code,recordKey:`zfa051a-p04-item-${String(item).padStart(3,'0')}`,nameZh,quantity:{value:quantity,unit:'件',meaning:'单台设备用量'},dimensions,views:[`第4页厂家零件格${item}`],assumptions}};
const spec=(item,{material='rubber',primitives,assumptions})=>({level:'尺寸级',material,source:source(item,assumptions),primitives});

export const zfa051aP04ModelSpecs={
  'ZFA051A-120-0129':spec(1,{assumptions:['厂家明确长1200、宽20、厚δ4及8个Φ8孔','按橡胶密封条建立精确外廓和八孔；孔距按图均布'],primitives:[{type:'extrude',points:[[-600,-10],[600,-10],[600,10],[-600,10]],depth:4,holes:Array.from({length:8},(_,i)=>({kind:'circle',center:[-525+i*150,0],radius:4})),bevel:.35,material:'rubber'}]}),
  'ZFA051A-120-0140':spec(2,{material:'paintedMetal',assumptions:['厂家明确盖板280×180、厚δ3；圆角半径、下缘缺口和孔径按图估算','模型建立圆角矩形盖板、下缘双缺口和两侧安装孔'],primitives:[{type:'extrude',points:[[-130,-90],[130,-90],[140,-75],[140,75],[125,90],[-125,90],[-140,75],[-140,-60],[-120,-75],[-95,-75],[-85,-90]],depth:3,holes:[{kind:'circle',center:[-130,0],radius:4},{kind:'circle',center:[130,0],radius:4}],bevel:3}]}),
  'ZFA051A-120-0146':spec(3,{material:'darkMetal',assumptions:['厂家明确刷子压板长1196、厚/侧宽7；条宽与孔径按图估算','模型建立窄长压板、五个沉孔座和端部定位边'],primitives:[{type:'box',size:[1196,42,7],material:'darkMetal'},...Array.from({length:5},(_,i)=>({type:'torus',radius:11,tube:3,position:[-480+i*240,0,4],material:'metal'})),{type:'box',size:[20,55,14],position:[0,0,0],material:'metal'}]}),
  'ZFA051A-0120':spec(4,{assumptions:['厂家明确直段778、弯曲半径R288.5、厚δ2；截面宽按图估算','密封条使用橡胶材质，模型按直段接四分之一圆弧连续路径建立'],primitives:[{type:'tube',points:[[-530,145,0],[-350,145,0],[-150,145,0],[0,145,0],[100,128,0],[185,75,0],[245,0,0],[275,-90,0],[285,-180,0]],radius:5,radialSegments:12,material:'rubber'}]}),
  'ZFA051A-0121':spec(5,{assumptions:['厂家明确水平段304、斜段279、厚δ2；折弯角和截面宽按图估算','按两段折弯橡胶密封条和安装孔语义建立'],primitives:[{type:'box',size:[304,12,2],position:[-120,65,0],material:'rubber'},{type:'box',size:[279,12,2],position:[158,-18,0],rotation:[0,0,-.65],material:'rubber'},...Array.from({length:5},(_,i)=>({type:'torus',radius:4,tube:1,position:[-220+i*115,55-i*18,2],material:'darkMetal'}))]}),
  'ZFA051A-0130A':spec(6,{assumptions:['厂家明确底边55、厚δ2；总高、斜边和三个孔径按图估算','按不规则折弯橡胶垫片轮廓和三孔建立'],primitives:[{type:'extrude',points:[[-27.5,-65],[27.5,-65],[48,5],[25,85],[-5,110],[-5,45],[-27.5,20]],depth:2,holes:[{kind:'circle',center:[0,-35],radius:5},{kind:'circle',center:[20,5],radius:5},{kind:'circle',center:[15,65],radius:5}],bevel:.4,material:'rubber'}]}),
  'ZFA051A-0131':spec(7,{assumptions:['厂家明确两段半径R252、R152及厚δ2；截面宽与连接位置按图估算','模型用连续S形橡胶路径分别表达两段相反曲率，不渲染成金属'],primitives:[{type:'tube',points:[[-210,220,0],[-195,145,0],[-150,70,0],[-80,10,0],[0,-5,0],[55,-35,0],[75,-95,0],[55,-155,0],[15,-210,0]],radius:5,radialSegments:12,material:'rubber'}]}),
  'ZFA051A-0132A':spec(8,{assumptions:['厂家明确总高464；厚度、截面宽、折弯点和孔径按图估算','按多折线L形橡胶密封条和五个安装孔表达'],primitives:[{type:'tube',points:[[-70,-232,0],[-70,-170,0],[-30,-120,0],[-20,-30,0],[-45,40,0],[-10,120,0],[35,232,0]],radius:6,radialSegments:12,material:'rubber'},{type:'box',size:[135,12,8],position:[-5,-232,0],material:'rubber'}]}),
};
