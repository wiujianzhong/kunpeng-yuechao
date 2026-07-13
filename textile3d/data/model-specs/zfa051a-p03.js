// ZFA051A-120机件略图第3页：14项独立3D规格。

const circlePoints=(radius,count=48)=>Array.from({length:count},(_,i)=>{const a=Math.PI*2*i/count;return [Math.cos(a)*radius,Math.sin(a)*radius]});
const parts={
  1:['ZFA051A-120-0100-1','前撑挡结合件',1,['1200','321','28']],
  2:['ZFA051A-120-0100-2','进棉顶板结合件',1,['1070','28']],
  3:['ZFA051A-120-0100-3A','进棉底板结合件',1,['304.5','225']],
  4:['ZFA051A-120-0100-4','撑挡结合件',2,['1200','55']],
  5:['ZFA051A-120-0100-5','底板结合件',1,['640','1200']],
  6:['ZFA051A-120-0100-6','大弧板结合件',1,['R250','R150']],
  7:['ZFA051A-120-0100-7','出棉前板结合件',1,['1196','80°']],
  8:['ZFA051A-120-0100-8','小弧板结合件',1,['497','153']],
  9:['ZFA051A-120-0100-10','左机架结合件',1,['1100','1035']],
  10:['ZFA051A-120-0100-11','右机架结合件',1,['1100','1035']],
  11:['ZFA051A-120-0100-14','底板结合件',1,['125','25']],
  12:['ZFA051A-120-0100-19','刷子固定座结合件',1,['210']],
  13:['ZFA051A-120-0100-20','刷子结合件',1,['1196','60']],
  14:['ZFA051A-120-0128','密封条',1,['1200','20','δ4','6-Φ8']],
};
const source=(item,assumptions)=>{const [code,nameZh,quantity,dimensions]=parts[item];return {page:3,item,code,recordKey:`zfa051a-p03-item-${String(item).padStart(3,'0')}`,nameZh,quantity:{value:quantity,unit:'件',meaning:'单台设备用量'},dimensions,views:[`第3页厂家零件格${item}`],assumptions}};
const spec=(item,{material='paintedMetal',primitives,assumptions})=>({level:'尺寸级',material,source:source(item,assumptions),primitives});
const arcBoxes=(radius,start,end,count,size,center=[0,0,0],material='paintedMetal')=>Array.from({length:count},(_,i)=>{const a=start+(end-start)*(i+.5)/count;return {type:'box',size,position:[center[0]+Math.cos(a)*radius,center[1]+Math.sin(a)*radius,center[2]],rotation:[0,0,a+Math.PI/2],material}});
function frame(item,mirror){return spec(item,{assumptions:[`厂家明确外框1100×1035；框厚、深度、圆孔直径和孔位按正视图比例估算`,`按${mirror<0?'左':'右'}机架建立矩形外框、三处圆形功能孔和顶部检修口；两件孔位镜像且件号独立`],primitives:[{type:'extrude',points:[[-550,-517.5],[550,-517.5],[550,517.5],[-550,517.5]],depth:45,holes:[{kind:'circle',center:[mirror*180,80],radius:225},{kind:'circle',center:[mirror*-300,-160],radius:145},{kind:'circle',center:[mirror*240,-300],radius:110},{kind:'polygon',points:[[mirror*220,360],[mirror*420,360],[mirror*420,460],[mirror*220,460]]}],bevel:3},{type:'box',size:[1100,55,65],position:[0,-490,-40],material:'darkMetal'},{type:'box',size:[55,1035,65],position:[mirror*522,0,-40],material:'darkMetal'}]})}

export const zfa051aP03ModelSpecs={
  'ZFA051A-120-0100-1':spec(1,{assumptions:['厂家明确外形1200×321、侧向厚度28；中心开口和安装孔按三视图比例估算','模型建立长矩形前撑挡、中央方孔、上下加强边和端部安装孔'],primitives:[{type:'extrude',points:[[-600,-160.5],[600,-160.5],[600,160.5],[-600,160.5]],depth:28,holes:[{kind:'polygon',points:[[-170,-80],[170,-80],[170,80],[-170,80]]},{kind:'circle',center:[-540,120],radius:7},{kind:'circle',center:[540,120],radius:7}],bevel:2},{type:'box',size:[1200,25,40],position:[0,145,-18],material:'darkMetal'},{type:'box',size:[1200,25,40],position:[0,-145,-18],material:'darkMetal'}]}),
  'ZFA051A-120-0100-2':spec(2,{assumptions:['厂家明确总长1070和板厚/折边高28；板宽及弯曲半径按侧视图比例估算','按长直顶板接四分之一圆弧下弯段表达，弧段由连续短板近似'],primitives:[{type:'box',size:[760,28,420],position:[-155,0,0]},...arcBoxes(300,-Math.PI/2,0,9,[53,28,420],[225,-300,0]),{type:'box',size:[35,170,430],position:[525,-285,0],rotation:[0,0,-.15],material:'darkMetal'}]}),
  'ZFA051A-120-0100-3A':spec(3,{assumptions:['厂家明确水平段304.5、斜段225；板宽、厚度和折弯角按图估算','模型建立两段折弯底板、安装孔和端部翻边'],primitives:[{type:'box',size:[304.5,14,420],position:[-112,65,0]},{type:'box',size:[225,14,420],position:[142,-7,0],rotation:[0,0,-.62]},{type:'box',size:[20,55,430],position:[240,-75,0],rotation:[0,0,-.62],material:'darkMetal'},{type:'cylinder',radius:7,length:18,axis:'z',position:[-210,65,0],material:'darkMetal'}]}),
  'ZFA051A-120-0100-4':spec(4,{assumptions:['厂家明确撑挡长1200、截面宽55；截面深度和板厚按三视图估算','数量为2；模型展示单根槽形撑挡、双侧翻边及端孔'],primitives:[{type:'box',size:[1200,8,55]},{type:'box',size:[1200,45,8],position:[0,-18,-23.5]},{type:'box',size:[1200,45,8],position:[0,-18,23.5]},{type:'cylinder',radius:7,length:65,axis:'z',position:[-560,0,0],material:'darkMetal'},{type:'cylinder',radius:7,length:65,axis:'z',position:[560,0,0],material:'darkMetal'}]}),
  'ZFA051A-120-0100-5':spec(5,{assumptions:['厂家明确底板640×1200；厚度和孔位按图估算','建立完整大底板、周边折边和六个安装孔，不把撑挡并入'],primitives:[{type:'extrude',points:[[-600,-320],[600,-320],[600,320],[-600,320]],depth:8,holes:Array.from({length:6},(_,i)=>({kind:'circle',center:[-500+i*200,280],radius:7})),bevel:1},{type:'box',size:[1200,28,22],position:[0,-306,-12],material:'darkMetal'},{type:'box',size:[1200,28,22],position:[0,306,-12],material:'darkMetal'}]}),
  'ZFA051A-120-0100-6':spec(6,{assumptions:['厂家明确两段弧半径R250与R150；板宽、厚度和连接位置按图估算','模型用两段相反曲率弧板组成S形大弧板，并保留加强边'],primitives:[...arcBoxes(250,Math.PI*.72,Math.PI*1.45,10,[55,22,120]),...arcBoxes(150,-Math.PI*.42,Math.PI*.34,7,[38,22,120],[145,-360,0]),{type:'box',size:[110,25,135],position:[-175,180,0],rotation:[0,0,.45],material:'darkMetal'},{type:'box',size:[90,25,135],position:[270,-315,0],rotation:[0,0,-.65],material:'darkMetal'}]}),
  'ZFA051A-120-0100-7':spec(7,{assumptions:['厂家明确宽1196及端板80°；高度、厚度和孔位按三视图估算','按长矩形出棉前板、80°端侧板和中央加强筋表达'],primitives:[{type:'box',size:[1196,360,8]},{type:'box',size:[45,420,180],position:[-575,25,0],rotation:[0,0,.1745],material:'darkMetal'},{type:'box',size:[18,360,35],position:[0,0,-18],material:'darkMetal'},{type:'cylinder',radius:8,length:16,axis:'z',position:[-540,-120,0],material:'metal'},{type:'cylinder',radius:8,length:16,axis:'z',position:[-540,120,0],material:'metal'}]}),
  'ZFA051A-120-0100-8':spec(8,{assumptions:['厂家明确总高497、底脚153；板厚、宽度和各折弯点按图估算','模型按多折线小弧板、底脚和上端翻边建立'],primitives:[{type:'extrude',points:[[-76.5,-248.5],[76.5,-248.5],[45,-165],[22,-55],[65,55],[110,248.5],[70,248.5],[15,75],[-20,-35],[-55,-165]],depth:22,bevel:2},{type:'box',size:[153,28,55],position:[0,-235,-38],material:'darkMetal'}]}),
  'ZFA051A-120-0100-10':frame(9,-1),
  'ZFA051A-120-0100-11':frame(10,1),
  'ZFA051A-120-0100-14':spec(11,{assumptions:['厂家明确总长125、宽25；厚度、中央垫块和孔径按图估算','建立窄长底板、中央凸台及两端安装孔'],primitives:[{type:'extrude',points:[[-62.5,-12.5],[62.5,-12.5],[62.5,12.5],[-62.5,12.5]],depth:6,holes:[{kind:'circle',center:[-48,0],radius:5},{kind:'circle',center:[48,0],radius:5}],bevel:.8},{type:'box',size:[70,20,12],position:[0,0,8],material:'darkMetal'}]}),
  'ZFA051A-120-0100-19':spec(12,{assumptions:['厂家明确刷子固定座总高210；宽度、深度、斜边和孔径按图估算','模型建立梯形固定座、两只安装孔和侧向螺柱'],primitives:[{type:'extrude',points:[[-85,-105],[85,-105],[85,105],[25,75],[-60,20],[-75,-40]],depth:45,holes:[{kind:'circle',center:[30,-45],radius:11},{kind:'circle',center:[40,35],radius:11}],bevel:2},{type:'cylinder',radius:8,length:70,axis:'z',position:[75,35,45],material:'metal'},{type:'cylinder',radius:8,length:70,axis:'z',position:[75,-45,45],material:'metal'}]}),
  'ZFA051A-120-0100-20':spec(13,{material:'darkMetal',assumptions:['厂家明确刷体长1196、端部宽60；刷毛直径、密度和端座按图估算','模型表达贯通刷轴、密集径向刷毛及两端夹持座'],primitives:[{type:'cylinder',radius:16,length:1196,axis:'x',material:'metal'},...Array.from({length:28},(_,i)=>({type:'torus',radius:24,tube:5,rotation:[0,Math.PI/2,0],position:[-560+i*41.5,0,0],material:'darkMetal'})),{type:'cylinder',radius:30,length:60,axis:'x',position:[628,0,0],material:'metal'},{type:'cylinder',radius:30,length:60,axis:'x',position:[-628,0,0],material:'metal'}]}),
  'ZFA051A-120-0128':spec(14,{material:'rubber',assumptions:['厂家明确长1200、宽20、厚δ4及6个Φ8孔','按橡胶密封条建立精确外廓与六孔；孔距未完整标注，按图均布'],primitives:[{type:'extrude',points:[[-600,-10],[600,-10],[600,10],[-600,10]],depth:4,holes:Array.from({length:6},(_,i)=>({kind:'circle',center:[-500+i*200,0],radius:4})),bevel:.4,material:'rubber'}]}),
};
