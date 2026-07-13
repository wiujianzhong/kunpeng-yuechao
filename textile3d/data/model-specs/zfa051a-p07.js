// ZFA051A-120机件略图第7页：7项独立3D规格。
import {zfa051aP07P12Verified as verified} from '../zfa051a-p07-p12-verified.js';

const row=item=>verified.find(part=>part.page===7&&part.item===item);
const source=(item,assumptions)=>{const part=row(item);return {page:7,item,code:part.code,recordKey:part.recordKey,nameZh:part.name,quantity:{value:part.quantity,unit:part.quantityUnit,meaning:part.quantityMeaning},dimensions:part.dims,views:[`第7页厂家零件格${item}`],assumptions}};
const spec=(item,{level='尺寸级',material='paintedMetal',primitives,assumptions})=>({level,material,source:source(item,assumptions),primitives});
const holes=(xs,y=0,r=5)=>xs.map(x=>({kind:'circle',center:[x,y],radius:r}));

export const zfa051aP07ModelSpecs={
  'LVSAB-0310':spec(1,{assumptions:['厂家明确总长560；板宽、折边高度和孔位按图形比例估算','模型表达窄长折边罩板和安装孔'],primitives:[{type:'box',size:[560,112,4]},{type:'box',size:[560,8,24],position:[0,52,-10]},{type:'box',size:[560,8,24],position:[0,-52,-10]},...[-240,-120,0,120,240].map(x=>({type:'torus',radius:6,tube:1.4,position:[x,0,3],material:'darkMetal'}))]}),
  'LVSAB-0311':spec(2,{assumptions:['厂家明确542×98；厚度、端部轮廓与孔径按图估算','模型按长条罩板及两端安装孔建立'],primitives:[{type:'extrude',points:[[-271,-49],[250,-49],[271,-34],[271,34],[250,49],[-271,49]],depth:4,holes:[...holes([-235,235],0,5)],bevel:2}]}),
  'LVSAB-0312':spec(3,{assumptions:['厂家明确长610；宽、厚度和孔位按图形比例估算','模型表达长条安装法兰及成排孔位'],primitives:[{type:'extrude',points:[[-305,-28],[305,-28],[305,28],[-305,28]],depth:6,holes:holes([-265,-175,-85,5,95,185,265],0,5),bevel:1,material:'darkMetal'}]}),
  'ZFA051A-0302':spec(4,{assumptions:['厂家明确外径Φ550；内径、厚度与孔位按图估算','模型建立大型环状法兰和周向安装孔'],primitives:[{type:'extrude',points:Array.from({length:64},(_,i)=>[275*Math.cos(i*Math.PI/32),275*Math.sin(i*Math.PI/32)]),depth:10,holes:[{kind:'circle',center:[0,0],radius:238},...Array.from({length:12},(_,i)=>({kind:'circle',center:[258*Math.cos(i*Math.PI/6),258*Math.sin(i*Math.PI/6)],radius:5}))],bevel:1,material:'metal'}]}),
  'ZFA051A-0303':spec(5,{assumptions:['厂家明确Φ76与轴向长50；内孔和台阶尺寸按图估算','模型按圆形轴承盖的多台阶回转体建立'],primitives:[{type:'lathe',points:[[0,-25],[18,-25],[18,-20],[30,-20],[38,-15],[38,12],[32,18],[20,18],[20,25],[0,25]],material:'metal'}]}),
  'ZFA051A-0304':spec(6,{assumptions:['厂家明确总长380；宽、高、厚度和孔位按图估算','模型表达弧面罩盖与两侧折边'],primitives:[{type:'box',size:[380,122,4]},{type:'box',size:[380,8,30],position:[0,57,-14]},{type:'box',size:[380,8,30],position:[0,-57,-14]},{type:'box',size:[12,110,24],position:[-184,0,-11]},{type:'box',size:[12,110,24],position:[184,0,-11]}]}),
  'TZH1087-10X3X2400':spec(7,{material:'rubber',assumptions:['厂家件号和图纸明确2400×10×3','密封条按黑色橡胶矩形截面建立，不使用金属材质'],primitives:[{type:'box',size:[2400,10,3],material:'rubber'}]}),
};
