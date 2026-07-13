// ZFA051A-120机件略图第5页：6项独立3D规格。

const circlePoints=(radius,count=48)=>Array.from({length:count},(_,i)=>{const a=Math.PI*2*i/count;return [Math.cos(a)*radius,Math.sin(a)*radius]});
const parts={
  1:['ZFA051A-120-0200-1','打手结合件',1,['1564']],
  2:['ZFA051A-0200-1A','轴承座托脚结合件',1,['180']],
  3:['ZFA051A-120-0201','打手翼板',6,['R87']],
  4:['ZFA051A-120-0202','皮翼',6,['1192','δ4']],
  5:['ZFA051A-120-0203','轴',1,['1564']],
  6:['LVSAB-0202A','法兰',2,['Φ174','75']],
};
const source=(item,assumptions)=>{const [code,nameZh,quantity,dimensions]=parts[item];return {page:5,item,code,recordKey:`zfa051a-p05-item-${String(item).padStart(3,'0')}`,nameZh,quantity:{value:quantity,unit:'件',meaning:'单台设备用量'},dimensions,views:[`第5页厂家零件格${item}`],assumptions}};
const spec=(item,{material='metal',primitives,assumptions})=>({level:'尺寸级',material,source:source(item,assumptions),primitives});

export const zfa051aP05ModelSpecs={
  'ZFA051A-120-0200-1':spec(1,{material:'darkMetal',assumptions:['厂家明确打手总长1564；筒体直径、翼板数量、端座和轴径按两视图比例估算','模型表达贯通轴、筒体、六组打手翼板和两端支承结构'],primitives:[{type:'cylinder',radius:145,length:1192,axis:'x',material:'darkMetal'},{type:'cylinder',radius:28,length:1564,axis:'x',material:'metal'},...Array.from({length:6},(_,i)=>{const a=Math.PI*2*i/6;return {type:'box',size:[1192,18,95],position:[0,Math.cos(a)*165,Math.sin(a)*165],rotation:[a,0,0],material:'metal'}}),{type:'cylinder',radius:175,length:35,axis:'x',position:[-615,0,0],material:'metal'},{type:'cylinder',radius:175,length:35,axis:'x',position:[615,0,0],material:'metal'}]}),
  'ZFA051A-0200-1A':spec(2,{material:'paintedMetal',assumptions:['厂家明确轴承座托脚外高/直径方向180；厚度、中心孔、四角耳和安装孔按图估算','模型按圆形轴承座、中心轴孔、四个安装耳和侧向托脚表达；厂家名称为“托脚”而非旧索引“托架”'],primitives:[{type:'extrude',points:circlePoints(90),depth:45,holes:[{kind:'circle',center:[0,0],radius:30},{kind:'circle',center:[-60,-55],radius:7},{kind:'circle',center:[60,-55],radius:7},{kind:'circle',center:[-60,55],radius:7},{kind:'circle',center:[60,55],radius:7}],bevel:3},{type:'box',size:[210,65,55],position:[0,-85,-8],material:'darkMetal'},{type:'torus',radius:52,tube:12,position:[0,0,28],material:'metal'}]}),
  'ZFA051A-120-0201':spec(3,{material:'paintedMetal',assumptions:['厂家明确打手翼板弯曲半径R87；板长、宽、厚和端部折弯按图估算','数量为6；模型展示单块弧形翼板、两端翻边和安装孔'],primitives:[{type:'tube',points:[[-125,70,0],[-90,68,0],[-45,45,0],[0,0,0],[45,-45,0],[90,-68,0],[125,-70,0]],radius:12,radialSegments:8,material:'paintedMetal'},{type:'box',size:[35,70,8],position:[-130,85,0],rotation:[0,0,.1],material:'darkMetal'},{type:'box',size:[35,70,8],position:[130,-85,0],rotation:[0,0,.1],material:'darkMetal'}]}),
  'ZFA051A-120-0202':spec(4,{material:'rubber',assumptions:['厂家明确皮翼长1192、厚δ4；宽度和四个安装孔孔径按图估算','数量为6；按柔性皮革长条、中央拼接和四孔表达，不与金属翼板混用材质'],primitives:[{type:'extrude',points:[[-596,-55],[596,-55],[596,55],[-596,55]],depth:4,holes:[{kind:'circle',center:[-550,0],radius:6},{kind:'circle',center:[-180,0],radius:6},{kind:'circle',center:[180,0],radius:6},{kind:'circle',center:[550,0],radius:6}],bevel:.6,material:'rubber'}]}),
  'ZFA051A-120-0203':spec(5,{material:'metal',assumptions:['厂家明确轴总长1564；轴径、台阶、键槽和端部形状按图估算','模型建立长阶梯轴、中央挡肩和三处键槽轮廓'],primitives:[{type:'cylinder',radius:24,length:1564,axis:'x',material:'metal'},{type:'cylinder',radius:36,length:55,axis:'x',position:[0,0,0],material:'darkMetal'},{type:'box',size:[80,10,14],position:[-520,24,0],material:'darkMetal'},{type:'box',size:[80,10,14],position:[160,24,0],material:'darkMetal'},{type:'box',size:[110,10,14],position:[620,24,0],material:'darkMetal'}]}),
  'LVSAB-0202A':spec(6,{material:'metal',assumptions:['厂家明确法兰外径Φ174、总长75；中心孔、轮毂、盘厚和止口按剖视图比例估算','数量为2；模型建立阶梯法兰盘、中心通孔和外缘止口'],primitives:[{type:'extrude',points:circlePoints(87),depth:18,holes:[{kind:'circle',center:[0,0],radius:24}],bevel:2,material:'metal'},{type:'extrude',points:circlePoints(52),depth:75,holes:[{kind:'circle',center:[0,0],radius:24}],position:[0,0,-28],bevel:1,material:'darkMetal'},{type:'torus',radius:78,tube:5,position:[0,0,12],material:'metal'}]}),
};
