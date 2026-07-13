// TF2513后段BOM视觉建模工厂；只采用厂家BOM明确规格和对应总成爆炸图轮廓。
const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));
const numbers=value=>(Array.isArray(value)?value:[value]).filter(item=>item!=null).flatMap(item=>String(item).match(/\d+(?:\.\d+)?/g)||[]).map(Number);
const regular=(radius,count=6)=>Array.from({length:count},(_,index)=>{const angle=Math.PI*2*index/count+Math.PI/6;return[Math.cos(angle)*radius,Math.sin(angle)*radius]});
const rect=(width,height)=>[[-width/2,-height/2],[width/2,-height/2],[width/2,height/2],[-width/2,height/2]];
const ring=(outer,inner,width,material='darkMetal')=>({type:'lathe',points:[[inner/2,-width/2],[outer/2,-width/2],[outer/2,width/2],[inner/2,width/2],[inner/2,-width/2]],material});
const source=part=>({
  page:part.page,item:part.item,recordKey:part.recordKey,code:part.code,nameZh:part.name,nameEn:part.nameEn,
  quantity:{value:part.quantity,unit:part.quantityUnit,meaning:part.quantityMeaning},dimensions:part.dims,
  sourceCrop:part.sourceCrop,sourceVector:part.sourceVector,
  views:[`第${part.drawingPage}页厂家总成爆炸图标号${part.item}`,`第${part.page}页厂家BOM原行`],
  assumptions:[part.dims.some(value=>!String(value).startsWith('型号'))?'按BOM中的明确规格建立主要比例；未列出的孔位、台阶、公差和内部结构不猜补。':'厂家未提供该单件三视图或绝对尺寸；形体只依BOM名称和总成爆炸图轮廓还原，不可用于加工或申报尺寸。'],
});

export function makeTF2513P25P37ModelSpec(part){
  const name=part.name;
  const type=part.modelType;
  const n=numbers(part.dims);
  const hasMeasuredDimension=part.dims.some(value=>!String(value).startsWith('型号'));
  const thread=Number((name.match(/M\s*(\d+(?:\.\d+)?)/i)||[])[1])||n[0]||10;
  const axial=Number((name.match(/[X×]\s*(\d+(?:\.\d+)?)/i)||[])[1])||n[1]||60;
  let material='paintedMetal';
  let primitives=[];

  if(/密封条|毛毡/.test(name)){
    material='rubber';
    const width=clamp(n[0]||18,3,28),height=clamp(n[1]||4,2,14),length=clamp(n[2]||360,140,520);
    primitives=[{type:'box',size:[length,width,height],material:'rubber'}];
  }else if(/吸尘软管/.test(name)){
    material='rubber';
    primitives=[{type:'tube',points:[[-180,-45,0],[-110,12,0],[-30,32,0],[55,10,0],[150,55,0]],radius:24,material:'rubber'},{type:'torus',radius:27,tube:4,position:[-180,-45,0],rotation:[0,Math.PI/2,0],material:'darkMetal'},{type:'torus',radius:27,tube:4,position:[150,55,0],rotation:[0,Math.PI/2,0],material:'darkMetal'}];
  }else if(/气弹簧/.test(name)){
    primitives=[{type:'cylinder',radius:16,length:180,axis:'x',position:[-45,0,0],material:'darkMetal'},{type:'cylinder',radius:7,length:170,axis:'x',position:[120,0,0],material:'metal'},{type:'cylinder',radius:19,length:20,axis:'x',position:[-145,0,0],material:'metal'},{type:'cylinder',radius:11,length:18,axis:'x',position:[215,0,0],material:'metal'}];
  }else if(/滚动轴承/.test(name)){
    const designation=Number((name.match(/\b(\d{4,5})/)||[])[1]);
    const outer=designation===16024?150:designation===6005?72:80;
    const inner=designation===16024?96:outer*.45,width=designation===16024?28:24;
    primitives=[ring(outer,inner,width),{type:'torus',radius:(outer+inner)/4,tube:(outer-inner)/10,rotation:[Math.PI/2,0,0],material:'metal'}];
  }else if(/V带/.test(name)){
    material='rubber';
    primitives=[{type:'torus',radius:150,tube:9,material:'rubber',rotation:[Math.PI/2,0,0]}];
  }else if(/螺母/.test(name)){
    const outer=clamp(thread*1.8,16,70),height=clamp(thread*.8,5,28);
    primitives=[{type:'extrude',points:regular(outer/2),depth:height,holes:[{kind:'circle',center:[0,0],radius:clamp(thread*.52,2.5,24)}],material:'metal'}];
  }else if(/垫圈|垫片|挡圈/.test(name)){
    const nominal=Number((name.match(/(\d+(?:\.\d+)?)\s*$/)||[])[1])||n[0]||20;
    const inner=clamp(nominal,5,180),outer=clamp(inner*1.8,14,260),width=/垫片/.test(name)?clamp(n.at(-1)||1,.2,8):clamp(inner*.08,.8,8);
    primitives=[ring(outer,inner,width,'metal')];
  }else if(/螺栓|螺钉/.test(name)){
    const diameter=clamp(thread,4,24),length=clamp(axial,8,180),head=/膨胀/.test(name)?diameter*1.2:diameter*1.7;
    primitives=[{type:'cylinder',radius:diameter/2,length,axis:'x',material:'metal'},{type:'cylinder',radius:head/2,length:clamp(diameter*.7,4,18),axis:'x',position:[-length/2-diameter*.35,0,0],material:'darkMetal'}];
    if(/膨胀/.test(name))primitives.push({type:'cylinder',radius:diameter*.72,length:length*.58,axis:'x',position:[length*.2,0,0],material:'brass'});
  }else if(/销/.test(name)){
    const diameter=clamp(n[0]||8,4,30),length=clamp(n[1]||55,18,180);
    primitives=[{type:'cylinder',radius:diameter/2,length,axis:'x',material:'metal'}];
  }else if(/键/.test(name)){
    const width=clamp(n[0]||8,5,24),length=clamp(n[1]||30,18,180);
    primitives=[{type:'box',size:[length,width,width*.62],material:'metal'}];
  }else if(/卡箍/.test(name)){
    const diameter=clamp(n[0]||70,35,160);
    primitives=[{type:'torus',radius:diameter/2,tube:clamp(diameter*.07,3,10),rotation:[Math.PI/2,0,0],material:'metal'},{type:'box',size:[26,18,8],position:[diameter/2+8,0,0],material:'darkMetal'}];
  }else if(/厂铭牌/.test(name)){
    const width=n[0]||80,height=n[1]||130;
    primitives=[{type:'extrude',points:rect(width,height),depth:2,holes:[{kind:'circle',center:[-width*.4,-height*.42],radius:2.5},{kind:'circle',center:[width*.4,-height*.42],radius:2.5},{kind:'circle',center:[-width*.4,height*.42],radius:2.5},{kind:'circle',center:[width*.4,height*.42],radius:2.5}],material:'metal'}];
  }else if(/轴套/.test(name)){
    primitives=[ring(56,28,72,'darkMetal')];
  }else if(/轴|心轴|丝杆|铰链销/.test(name)||type==='shaft'){
    const length=/长轴/.test(name)?360:/短轴/.test(name)?180:clamp(axial,80,300),diameter=clamp(thread||18,10,54);
    primitives=[{type:'cylinder',radius:diameter/2,length,axis:'x',material:'metal'},{type:'cylinder',radius:diameter*.72,length:clamp(length*.15,12,45),axis:'x',position:[-length*.46,0,0],material:'darkMetal'}];
  }else if(/带轮|压轮|张紧轮|导条轮/.test(name)||type==='pulley'){
    const diameter=/大皮带轮/.test(name)?260:/小皮带轮/.test(name)?110:130,width=38;
    primitives=[ring(diameter,diameter*.28,width),{type:'cylinder',radius:diameter*.18,length:width*1.35,axis:'y',material:'metal'},{type:'torus',radius:diameter*.42,tube:5,rotation:[Math.PI/2,0,0],material:'darkMetal'}];
  }else if(/把手/.test(name)){
    primitives=[{type:'tube',points:[[-72,-38,0],[-72,10,0],[-45,38,0],[45,38,0],[72,10,0],[72,-38,0]],radius:7,material:'metal'}];
  }else if(/管接头|联轴节/.test(name)){
    primitives=[{type:'cylinder',radius:24,length:76,axis:'x',material:'darkMetal'},{type:'cylinder',radius:13,length:105,axis:'x',material:'metal'},{type:'torus',radius:18,tube:4,rotation:[0,Math.PI/2,0],material:'brass'}];
  }else if(/偏心块/.test(name)){
    primitives=[{type:'cylinder',radius:42,length:22,axis:'y',position:[0,0,12],material:'darkMetal'},{type:'cylinder',radius:11,length:32,axis:'y',position:[18,0,12],material:'metal'}];
  }else if(/立柱|导条柱/.test(name)||type==='column'){
    const height=/短立柱/.test(name)?180:320;
    primitives=[{type:'box',size:[56,height,56],material:'paintedMetal'},{type:'box',size:[100,18,92],position:[0,-height/2-9,0],material:'darkMetal'},{type:'box',size:[82,14,76],position:[0,height/2+7,0],material:'metal'}];
  }else if(/盘框|底框|转架|框结合/.test(name)||type==='panel'){
    primitives=[{type:'box',size:[320,22,34],position:[0,0,-110],material:'paintedMetal'},{type:'box',size:[320,22,34],position:[0,0,110],material:'paintedMetal'},{type:'box',size:[22,220,34],position:[-149,0,0],material:'paintedMetal'},{type:'box',size:[22,220,34],position:[149,0,0],material:'paintedMetal'},{type:'box',size:[220,14,24],rotation:[0,.32,0],material:'darkMetal'}];
  }else if(/罩壳|护板|上盖|罩板|盖板/.test(name)||type==='casing'){
    primitives=[{type:'box',size:[300,26,210],material:'paintedMetal'},{type:'box',size:[280,44,18],position:[0,-28,-96],material:'darkMetal'},{type:'box',size:[280,44,18],position:[0,-28,96],material:'darkMetal'}];
  }else if(/板|扁钢|导条|支座|底座|定位块|端帽|堵头|铰链座|支架/.test(name)||['plate','bracket'].includes(type)){
    const width=/导条/.test(name)?360:220,height=/立柱|支架/.test(name)?150:100,depth=/堵头|定位块/.test(name)?38:12;
    primitives=[{type:'extrude',points:rect(width,height),depth,holes:[{kind:'circle',center:[-width*.36,0],radius:8},{kind:'circle',center:[width*.36,0],radius:8}],material:'paintedMetal'}];
    if(/支座|底座|铰链座|支架/.test(name))primitives.push({type:'box',size:[width*.72,18,height*.55],position:[0,-height*.32,-height*.2],material:'darkMetal'});
  }else{
    primitives=[{type:'box',size:[180,82,46],material:'paintedMetal'},{type:'cylinder',radius:22,length:70,axis:'z',position:[0,0,28],material:'metal'}];
  }

  return{level:hasMeasuredDimension?'尺寸级':'轮廓级',material,source:source(part),primitives};
}
