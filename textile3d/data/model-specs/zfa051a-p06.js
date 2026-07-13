// ZFA051A-120机件略图第6页：12项独立3D规格。

const circlePoints=(radius,count=64)=>Array.from({length:count},(_,i)=>{const a=Math.PI*2*i/count;return [Math.cos(a)*radius,Math.sin(a)*radius]});
const parts={
  1:['ZFA051A-120-0300-1','尘笼结合件',1,['1573']],
  2:['ZFA051A-0300-1','右法兰结合件',1,['Φ550']],
  3:['ZFA051A-0300-2','左法兰结合件',1,['Φ550']],
  4:['ZFA051A-0300-3B','罩壳结合件',1,['104']],
  5:['ZFA051A-120-0301','尘笼网板',1,['1140']],
  6:['ZFA051A-120-0302','轴',1,['1573']],
  7:['ZFA211-3112','圆形闷盖',2,['20']],
  8:['LVSAB-0302A','尘笼法兰',2,['Φ490']],
  9:['LVSAB-0306A','密封环',2,['Φ480','14']],
  10:['LVSAB-0307','密封环',2,['Φ480','15']],
  11:['LVSAB-0308','密封环',1,['Φ500']],
  12:['LVSAB-0309','密封环',1,['Φ500']],
};
const source=(item,assumptions)=>{const [code,nameZh,quantity,dimensions]=parts[item];return {page:6,item,code,recordKey:`zfa051a-p06-item-${String(item).padStart(3,'0')}`,nameZh,quantity:{value:quantity,unit:'件',meaning:'单台设备用量'},dimensions,views:[`第6页厂家零件格${item}`],assumptions}};
const spec=(item,{material='metal',primitives,assumptions})=>({level:'尺寸级',material,source:source(item,assumptions),primitives});
function sideFlange(item,side){return spec(item,{assumptions:[`厂家明确法兰外径Φ550；盘厚、中心孔、轮毂、孔位和加强筋按图估算`,`按${side>0?'右':'左'}法兰建立环形盘、中心轮毂、四根加强筋和单侧止口；左右件方向镜像且件号独立`],primitives:[{type:'extrude',points:circlePoints(275),depth:22,holes:[{kind:'circle',center:[0,0],radius:58},{kind:'circle',center:[-190,0],radius:8},{kind:'circle',center:[190,0],radius:8}],bevel:2},{type:'cylinder',radius:95,length:70,axis:'z',position:[0,0,side*25],material:'darkMetal'},...Array.from({length:4},(_,i)=>{const a=Math.PI*2*i/4;return {type:'box',size:[170,28,22],position:[Math.cos(a)*145,Math.sin(a)*145,0],rotation:[0,0,a],material:'darkMetal'}}),{type:'torus',radius:245,tube:10,position:[0,0,side*14],material:'metal'}]})}
function sealingRing(item,diameter,width,profile){return spec(item,{material:'rubber',assumptions:[`厂家明确外径Φ${diameter}${width?`、轴向宽/厚${width}`:''}；内径和截面形状按视图比例估算`,`按橡胶密封环建立独立环体${profile}，不使用金属材质`],primitives:[{type:'extrude',points:circlePoints(diameter/2),depth:width||18,holes:[{kind:'circle',center:[0,0],radius:diameter/2-(profile==='厚唇口'?18:12)}],bevel:1.5,material:'rubber'},...(profile==='厚唇口'?[{type:'torus',radius:diameter/2-14,tube:5,position:[0,0,(width||18)/2],material:'rubber'}]:[])]})}

export const zfa051aP06ModelSpecs={
  'ZFA051A-120-0300-1':spec(1,{material:'darkMetal',assumptions:['厂家明确尘笼总长1573；筒径、网格、法兰和轴径按正侧视图比例估算','模型表达长圆筒尘笼、贯通轴、两端法兰、多道环筋和纵向网条'],primitives:[{type:'cylinder',radius:250,length:1140,axis:'x',material:'darkMetal'},{type:'cylinder',radius:28,length:1573,axis:'x',material:'metal'},...Array.from({length:9},(_,i)=>({type:'torus',radius:250,tube:8,rotation:[0,Math.PI/2,0],position:[-520+i*130,0,0],material:'metal'})),...Array.from({length:12},(_,i)=>{const a=Math.PI*2*i/12;return {type:'box',size:[1140,9,9],position:[0,Math.cos(a)*250,Math.sin(a)*250],rotation:[a,0,0],material:'metal'}}),{type:'cylinder',radius:275,length:25,axis:'x',position:[-570,0,0],material:'metal'},{type:'cylinder',radius:275,length:25,axis:'x',position:[570,0,0],material:'metal'}]}),
  'ZFA051A-0300-1':sideFlange(2,1),
  'ZFA051A-0300-2':sideFlange(3,-1),
  'ZFA051A-0300-3B':spec(4,{material:'paintedMetal',assumptions:['厂家明确罩壳轴向深度104；外径、高度、板厚和侧耳按侧视图比例估算','模型建立浅圆筒罩壳、背板、周向翻边和侧向固定耳'],primitives:[{type:'cylinder',radius:285,length:104,axis:'z',material:'paintedMetal'},{type:'extrude',points:circlePoints(285),depth:8,position:[0,0,-56],material:'darkMetal'},{type:'torus',radius:278,tube:9,position:[0,0,52],material:'darkMetal'},{type:'box',size:[75,30,70],position:[300,0,0],material:'metal'}]}),
  'ZFA051A-120-0301':spec(5,{material:'darkMetal',assumptions:['厂家明确尘笼网板轴向长度1140；包覆直径、网孔和板厚按两视图估算','按卷成圆筒的网板建立多道环筋与纵向网条，避免用实心金属块替代筛网语义'],primitives:[...Array.from({length:8},(_,i)=>({type:'torus',radius:245,tube:5,rotation:[0,Math.PI/2,0],position:[-535+i*153,0,0],material:'darkMetal'})),...Array.from({length:16},(_,i)=>{const a=Math.PI*2*i/16;return {type:'box',size:[1140,6,6],position:[0,Math.cos(a)*245,Math.sin(a)*245],rotation:[a,0,0],material:'metal'}})]}),
  'ZFA051A-120-0302':spec(6,{material:'metal',assumptions:['厂家明确轴总长1573；轴径、中央挡肩、键槽和端部台阶按图估算','模型建立长阶梯轴和三处键槽轮廓'],primitives:[{type:'cylinder',radius:24,length:1573,axis:'x',material:'metal'},{type:'cylinder',radius:38,length:60,axis:'x',material:'darkMetal'},{type:'box',size:[90,10,14],position:[-520,24,0],material:'darkMetal'},{type:'box',size:[90,10,14],position:[160,24,0],material:'darkMetal'},{type:'box',size:[115,10,14],position:[630,24,0],material:'darkMetal'}]}),
  'ZFA211-3112':spec(7,{material:'darkMetal',assumptions:['厂家明确圆形闷盖轴向长度20；外径、螺纹齿形和内孔按图估算','厂家件号为ZFA211-3112；模型按短螺纹闷盖、端面和多道外齿表达'],primitives:[{type:'cylinder',radius:34,length:20,axis:'z',material:'darkMetal'},...Array.from({length:4},(_,i)=>({type:'torus',radius:35,tube:3,position:[0,0,-8+i*5],material:'metal'})),{type:'cylinder',radius:24,length:5,axis:'z',position:[0,0,12],material:'metal'}]}),
  'LVSAB-0302A':spec(8,{material:'metal',assumptions:['厂家明确尘笼法兰外径Φ490；盘厚、中心孔、轮毂和止口按剖视图估算','数量为2；建立环形法兰盘、中心轮毂和两道止口'],primitives:[{type:'extrude',points:circlePoints(245),depth:24,holes:[{kind:'circle',center:[0,0],radius:45}],bevel:2},{type:'cylinder',radius:78,length:70,axis:'z',material:'darkMetal'},{type:'torus',radius:220,tube:10,position:[0,0,15],material:'metal'}]}),
  'LVSAB-0306A':sealingRing(9,480,14,'窄截面'),
  'LVSAB-0307':sealingRing(10,480,15,'厚唇口'),
  'LVSAB-0308':sealingRing(11,500,18,'窄截面'),
  'LVSAB-0309':sealingRing(12,500,22,'厚唇口'),
};
