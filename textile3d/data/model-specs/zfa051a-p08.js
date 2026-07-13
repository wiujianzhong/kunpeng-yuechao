// ZFA051A-120机件略图第8页：11项独立3D规格。
import {zfa051aP07P12Verified as verified} from '../zfa051a-p07-p12-verified.js';

const row=item=>verified.find(part=>part.page===8&&part.item===item);
const source=(item,assumptions)=>{const part=row(item);return {page:8,item,code:part.code,recordKey:part.recordKey,nameZh:part.name,quantity:{value:part.quantity,unit:part.quantityUnit,meaning:part.quantityMeaning},dimensions:part.dims,views:[`第8页厂家零件格${item}`],assumptions}};
const spec=(item,{level='尺寸级',material='paintedMetal',primitives,assumptions})=>({level,material,source:source(item,assumptions),primitives});
const circle=(r,n=64)=>Array.from({length:n},(_,i)=>[r*Math.cos(i*Math.PI*2/n),r*Math.sin(i*Math.PI*2/n)]);
const ring=(outer,inner,depth,material='metal')=>({type:'extrude',points:circle(outer),depth,holes:[{kind:'circle',center:[0,0],radius:inner}],bevel:Math.min(1,depth/5),material});

export const zfa051aP08ModelSpecs={
  'ZFA051A-120-0400-1':spec(1,{assumptions:['厂家明确风机连接口Φ320；蜗壳外形、厚度和出风口尺寸按图形比例估算','模型用偏心环体、矩形出风管和圆形法兰表达风机蜗壳结合件'],primitives:[{type:'torus',radius:205,tube:72,material:'paintedMetal'},{type:'box',size:[270,150,145],position:[190,155,0]},{type:'cylinder',radius:160,length:52,axis:'z',position:[0,0,0],material:'darkMetal'},{type:'torus',radius:160,tube:10,position:[0,0,30],material:'metal'}]}),
  'ZFA051A-120-0400-3':spec(2,{assumptions:['厂家明确管长487、管径Φ258；法兰外径与孔位按图估算','模型建立圆管、两端环形法兰和支撑边'],primitives:[{type:'cylinder',radius:129,length:487,axis:'x'},{type:'torus',radius:145,tube:10,rotation:[0,Math.PI/2,0],position:[-243.5,0,0],material:'metal'},{type:'torus',radius:145,tube:10,rotation:[0,Math.PI/2,0],position:[243.5,0,0],material:'metal'}]}),
  'ZFA051A-120-0400-4':spec(3,{assumptions:['厂家明确风扇总跨尺1600；轴径、轮毂和叶片尺寸按图估算','模型建立横向主轴、两端轮毂和径向叶片'],primitives:[{type:'cylinder',radius:26,length:1600,axis:'x',material:'darkMetal'},{type:'cylinder',radius:90,length:110,axis:'x',position:[-620,0,0],material:'metal'},{type:'cylinder',radius:90,length:110,axis:'x',position:[620,0,0],material:'metal'},...[-620,620].flatMap(x=>Array.from({length:8},(_,i)=>({type:'box',size:[85,250,18],position:[x,Math.cos(i*Math.PI/4)*150,Math.sin(i*Math.PI/4)*150],rotation:[i*Math.PI/4,0,0],material:'paintedMetal'})))]}),
  'ZFA051A-0400-6':spec(4,{assumptions:['厂家明确弧形罩壳半径288.5；宽、弧度和折边尺寸按图估算','模型以弧形盖体和两侧连接板表达罩壳结合件'],primitives:[{type:'tube',points:[[-288,0,0],[-250,110,0],[-145,210,0],[0,288.5,0],[145,210,0],[250,110,0],[288,0,0]],radius:8,material:'paintedMetal'},{type:'box',size:[18,120,390],position:[-288,0,0]},{type:'box',size:[18,120,390],position:[288,0,0]}]}),
  'LVSAB-0401':spec(5,{assumptions:['厂家明确外形长360、宽220；内窗、厚度和孔径按图估算','模型建立矩形环状法兰及四角安装孔'],primitives:[{type:'extrude',points:[[-180,-110],[180,-110],[180,110],[-180,110]],depth:8,holes:[{kind:'polygon',points:[[-145,-75],[145,-75],[145,75],[-145,75]]},...[-1,1].flatMap(x=>[-1,1].map(y=>({kind:'circle',center:[x*162,y*92],radius:5})))],bevel:1,material:'metal'}]}),
  'ZFA051A-0409':spec(6,{material:'rubber',assumptions:['厂家明确内径Φ260、外径Φ320；厚度按图估算','密封毡按黑色柔性环形垫建立'],primitives:[ring(160,130,6,'rubber')]}),
  'ZFA051A-0420':spec(7,{assumptions:['厂家明确外径Φ62、轴向尺寸28；内孔与台阶按图估算','模型按多台阶轴承盖回转体建立'],primitives:[{type:'lathe',points:[[0,-14],[18,-14],[18,-11],[31,-11],[31,8],[27,12],[18,12],[18,14],[0,14]],material:'metal'}]}),
  'ZFA051A-0421':spec(8,{material:'metal',assumptions:['厂家明确厚δ1、内径Φ50、外径Φ62','按完整环形挡圈建立'],primitives:[ring(31,25,1)]}),
  'ZFA051A-0422':spec(9,{assumptions:['厂家明确外径Φ85、总长69；内孔、法兰与孔位按图估算','模型建立带法兰台阶圆筒轴承座'],primitives:[{type:'lathe',points:[[18,-34.5],[36,-34.5],[42.5,-26],[42.5,-18],[34,-18],[34,24],[28,34.5],[18,34.5]],material:'metal'}]}),
  'TZH1087-10X3X5000':spec(10,{material:'rubber',assumptions:['厂家件号和图纸明确5000×10×3','密封条按黑色橡胶矩形截面建立'],primitives:[{type:'box',size:[5000,10,3],material:'rubber'}]}),
  'TZH1045-85X6':spec(11,{material:'metal',assumptions:['厂家明确厚ζ6、内径Φ72、外径Φ85','按厚环形挡圈建立'],primitives:[ring(42.5,36,6)]}),
};
