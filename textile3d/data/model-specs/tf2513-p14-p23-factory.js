// TF2513中段BOM视觉建模工厂；厂家未给单件三视图的部位只还原名称语义与总成轮廓。
const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));
const nums=value=>(Array.isArray(value)?value:[value]).filter(item=>item!=null).flatMap(item=>String(item).match(/\d+(?:\.\d+)?/g)||[]).map(Number);
const rect=(width,height)=>[[-width/2,-height/2],[width/2,-height/2],[width/2,height/2],[-width/2,height/2]];
const hex=radius=>Array.from({length:6},(_,index)=>{const angle=Math.PI*2*index/6+Math.PI/6;return[Math.cos(angle)*radius,Math.sin(angle)*radius]});
const ring=(outer,inner,width,material='darkMetal')=>({type:'lathe',points:[[inner/2,-width/2],[outer/2,-width/2],[outer/2,width/2],[inner/2,width/2],[inner/2,-width/2]],material});
const plate=(width,height,depth=10,material='paintedMetal',holes=true)=>({type:'extrude',points:rect(width,height),depth,bevel:1.5,holes:holes?[{kind:'circle',center:[-width*.34,0],radius:clamp(Math.min(width,height)*.07,3,14)},{kind:'circle',center:[width*.34,0],radius:clamp(Math.min(width,height)*.07,3,14)}]:[],material});

const source=part=>({
  page:part.page,item:part.item,recordKey:part.recordKey,code:part.code,nameZh:part.name,nameEn:part.nameEn,
  quantity:{value:part.quantity,unit:part.quantityUnit,meaning:part.quantityMeaning},
  dimensions:part.dims,specification:part.specification,remark:part.remark,
  sourceCrop:part.sourceCrop,sourceVector:part.sourceVector,
  sourceAssemblyCrop:part.sourceAssemblyCrop,sourceAssemblyVector:part.sourceAssemblyVector,
  views:[`PDF第${part.page}页BOM第${part.tableRow}行四边框高清裁剪`,`PDF第${part.drawingPage}页${part.assemblyName}总成图`],
  assumptions:[part.dims.length?'按厂家BOM中明确规格建立主要比例；未标注的孔位、台阶、公差和内部结构不猜补。':'厂家未提供该单件三视图和绝对尺寸；形体仅依BOM名称与总成图轮廓视觉还原，不可用于加工。'],
});

export function makeTF2513P14P23ModelSpec(part){
  const name=part.name,n=nums(part.dims),type=part.modelType;
  const thread=Number((name.match(/M\s*(\d+(?:\.\d+)?)/i)||[])[1])||n[0]||8;
  const length=Number((name.match(/[X×]\s*(\d+(?:\.\d+)?)/i)||[])[1])||n[1]||60;
  let material='paintedMetal',primitives=[];

  if(/受压弹簧|拉簧/.test(name)){
    const wire=clamp(n[0]||4,2,8),span=clamp(n.at(-1)||100,65,220),radius=clamp(span*.16,12,28);
    const points=Array.from({length:73},(_,i)=>{const t=i/72;const angle=t*Math.PI*12;return[-span/2+t*span,Math.cos(angle)*radius,Math.sin(angle)*radius]});
    primitives=[{type:'tube',points,radius:wire/2,material:'darkMetal'}];
  }else if(/滚动轴承/.test(name)){
    const designation=Number((name.match(/\b(\d{4})/)||[])[1]);
    const outer=designation===6205?52:designation===6003?35:48,inner=designation===6205?25:designation===6003?17:outer*.48,width=designation===6205?15:designation===6003?10:14;
    primitives=[ring(outer,inner,width),{type:'torus',radius:(outer+inner)/4,tube:(outer-inner)/10,rotation:[Math.PI/2,0,0],material:'metal'}];
  }else if(/带座轴承/.test(name)){
    const outer=/208/.test(name)?96:86,inner=/208/.test(name)?40:35;
    primitives=[plate(190,82,24,'paintedMetal'),ring(outer,inner,45),{type:'box',size:[72,56,56],position:[0,0,-14],material:'darkMetal'}];
  }else if(/螺母/.test(name)){
    const outer=clamp(thread*1.85,10,42),height=clamp(thread*.8,3,18);
    primitives=[{type:'extrude',points:hex(outer/2),depth:height,holes:[{kind:'circle',center:[0,0],radius:thread*.5}],material:'metal'}];
  }else if(/垫圈|垫片|调整垫片|挡圈|衬垫|托垫/.test(name)){
    const nominal=Number((name.match(/(\d+(?:\.\d+)?)\s*$/)||[])[1])||n[0]||24,inner=clamp(nominal,3,70),outer=clamp(inner*1.7,10,110),width=/托垫|衬垫/.test(name)?8:clamp(n.at(-1)||2,.6,7);
    material=/托垫|衬垫/.test(name)?'rubber':'metal';primitives=[ring(outer,inner,width,material)];
  }else if(/螺栓|螺钉/.test(name)){
    const diameter=clamp(thread,3,18),span=clamp(length,8,100),head=diameter*1.7;
    primitives=[{type:'cylinder',radius:diameter/2,length:span,axis:'x',material:'metal'},{type:'cylinder',radius:head/2,length:diameter*.65,axis:'x',position:[-span/2-diameter*.32,0,0],material:'darkMetal'}];
    if(/膨胀/.test(name))primitives.push({type:'cylinder',radius:diameter*.68,length:span*.62,axis:'x',position:[span*.18,0,0],material:'brass'});
  }else if(/键/.test(name)){
    const width=clamp(n[0]||10,4,22),span=clamp(n[1]||45,18,150);primitives=[{type:'box',size:[span,width,width*.62],material:'metal'}];
  }else if(/带肩轴衬|轴套/.test(name)){
    const inner=clamp(n[0]||18,8,45),outer=clamp(n[1]||inner*1.55,14,72),width=clamp(n[2]||52,18,95);
    primitives=[ring(outer,inner,width,'darkMetal'),ring(outer*1.35,inner,width*.18,'metal')];
  }else if(/销体|半销|销\s/.test(name)||name==='销'){
    const diameter=clamp(n[0]||10,4,24),span=clamp(n[1]||65,18,150);
    primitives=[{type:'cylinder',radius:diameter/2,length:span,axis:'x',material:'metal'},{type:'cylinder',radius:diameter*.8,length:diameter*.45,axis:'x',position:[-span/2,0,0],material:'darkMetal'}];
  }else if(/心轴|轮轴|刮刀轴|轴$/.test(name)){
    const span=/刮刀轴/.test(name)?300:190,diameter=/轮轴/.test(name)?24:18;
    primitives=[{type:'cylinder',radius:diameter/2,length:span,axis:'x',material:'metal'},{type:'cylinder',radius:diameter*.7,length:span*.18,axis:'x',position:[-span*.42,0,0],material:'darkMetal'},{type:'cylinder',radius:diameter*.62,length:span*.22,axis:'x',position:[span*.4,0,0],material:'metal'}];
  }else if(/同步带轮|调节轮|挂轮|导向轮/.test(name)){
    const teeth=Number((name.match(/(\d+)T/)||[])[1])||24,outer=clamp(teeth*3.2,58,120),width=30;
    primitives=[ring(outer,outer*.28,width),{type:'cylinder',radius:outer*.19,length:width*1.35,axis:'y',material:'metal'},{type:'torus',radius:outer*.43,tube:4.5,rotation:[Math.PI/2,0,0],material:'darkMetal'}];
  }else if(/凹罗拉|凸罗拉/.test(name)){
    const concave=/凹/.test(name),span=260,outer=72;
    primitives=[{type:'cylinder',radius:outer/2,length:span,axis:'x',material:'darkMetal'},{type:'cylinder',radius:concave?outer*.38:outer*.58,length:span*.46,axis:'x',material:'metal'},{type:'cylinder',radius:13,length:span+55,axis:'x',material:'metal'}];
  }else if(/钢丝绳|软管|气管/.test(name)){
    material=/钢丝绳/.test(name)?'darkMetal':'rubber';
    const span=clamp(n.at(-1)||230,100,360),radius=/钢丝绳/.test(name)?clamp(n[0]||5,2,8):8;
    primitives=[{type:'tube',points:[[-span/2,-35,0],[-span*.28,20,5],[0,35,0],[span*.28,5,-4],[span/2,42,0]],radius,material}];
    if(/结合件/.test(name))primitives.push({type:'cylinder',radius:13,length:26,axis:'x',position:[-span/2, -35,0],material:'metal'},{type:'cylinder',radius:13,length:26,axis:'x',position:[span/2,42,0],material:'metal'});
  }else if(/气缸/.test(name)){
    primitives=[{type:'cylinder',radius:42,length:165,axis:'x',material:'paintedMetal'},{type:'cylinder',radius:14,length:150,axis:'x',position:[148,0,0],material:'metal'},{type:'cylinder',radius:50,length:14,axis:'x',position:[-82,0,0],material:'darkMetal'},{type:'cylinder',radius:50,length:14,axis:'x',position:[82,0,0],material:'darkMetal'}];
  }else if(/磁性开关/.test(name)){
    primitives=[{type:'box',size:[68,14,12],material:'plastic'},{type:'tube',points:[[32,0,0],[85,0,0],[135,24,0]],radius:2.4,material:'rubber'}];
  }else if(/电磁阀/.test(name)){
    primitives=[{type:'box',size:[96,54,46],material:'darkMetal'},{type:'box',size:[45,46,42],position:[70,0,0],material:'plastic'},{type:'cylinder',radius:10,length:28,axis:'z',position:[-28,0,35],material:'brass'},{type:'cylinder',radius:10,length:28,axis:'z',position:[28,0,35],material:'brass'}];
  }else if(/速度控制阀/.test(name)){
    primitives=[{type:'cylinder',radius:18,length:58,axis:'x',material:'darkMetal'},{type:'cylinder',radius:8,length:48,axis:'z',position:[0,0,24],material:'brass'},{type:'cylinder',radius:11,length:35,axis:'y',position:[20,0,0],material:'plastic'}];
  }else if(/接头/.test(name)){
    primitives=[{type:'cylinder',radius:16,length:42,axis:'x',material:'brass'},{type:'cylinder',radius:8,length:68,axis:'x',material:'darkMetal'}];
    if(/KQ2L/.test(name))primitives.push({type:'cylinder',radius:8,length:45,axis:'z',position:[18,0,20],material:'darkMetal'});
    if(/KQ2T/.test(name))primitives.push({type:'cylinder',radius:8,length:55,axis:'z',material:'darkMetal'});
    if(/KQ2U/.test(name))primitives.push({type:'tube',points:[[-18,0,0],[0,28,0],[28,28,0],[42,0,0]],radius:8,material:'darkMetal'});
  }else if(/消音器/.test(name)){
    primitives=[{type:'cylinder',radius:20,length:62,axis:'x',material:'darkMetal'},{type:'cylinder',radius:10,length:28,axis:'x',position:[44,0,0],material:'brass'}];
  }else if(/减速机/.test(name)){
    primitives=[{type:'box',size:[150,115,130],material:'paintedMetal'},{type:'cylinder',radius:40,length:135,axis:'y',material:'darkMetal'},{type:'cylinder',radius:18,length:155,axis:'x',position:[0,36,0],material:'metal'},{type:'box',size:[190,24,110],position:[0,-68,0],material:'darkMetal'}];
  }else if(/管夹/.test(name)){
    primitives=[{type:'torus',radius:28,tube:5,rotation:[Math.PI/2,0,0],material:'metal'},{type:'box',size:[24,18,8],position:[35,0,0],material:'darkMetal'}];
  }else if(/减震块/.test(name)){
    material='rubber';primitives=[{type:'cylinder',radius:34,length:28,axis:'y',material:'rubber'},{type:'cylinder',radius:8,length:52,axis:'y',material:'metal'}];
  }else if(/专用扳手/.test(name)){
    primitives=[{type:'extrude',points:[[-140,-15],[70,-15],[105,-38],[140,-22],[118,0],[140,22],[105,38],[70,15],[-140,15]],depth:10,holes:[{kind:'circle',center:[-110,0],radius:9}],material:'metal'}];
  }else if(/刮刀/.test(name)){
    primitives=[{type:'extrude',points:[[-180,-18],[165,-18],[180,0],[165,18],[-180,18]],depth:8,holes:[{kind:'circle',center:[-140,0],radius:5},{kind:'circle',center:[140,0],radius:5}],material:'metal'}];
  }else if(/拉杆/.test(name)){
    primitives=[{type:'cylinder',radius:10,length:290,axis:'x',material:'metal'},{type:'torus',radius:22,tube:7,position:[-155,0,0],rotation:[0,Math.PI/2,0],material:'darkMetal'},{type:'torus',radius:22,tube:7,position:[155,0,0],rotation:[0,Math.PI/2,0],material:'darkMetal'}];
  }else if(/喇叭口/.test(name)){
    primitives=[{type:'lathe',points:[[14,-85],[14,-40],[42,10],[72,85],[56,85],[30,18],[9,-36],[9,-85]],material:'paintedMetal'}];
  }else if(/箱体|罩壳|安全罩|翻板盖/.test(name)){
    primitives=[{type:'box',size:[250,16,170],position:[0,0,-78],material:'paintedMetal'},{type:'box',size:[250,75,14],position:[0,-30,0],material:'paintedMetal'},{type:'box',size:[14,75,156],position:[-118,-30,0],material:'darkMetal'},{type:'box',size:[14,75,156],position:[118,-30,0],material:'darkMetal'}];
  }else if(/座/.test(name)||type==='bracket'){
    primitives=[plate(190,110,16),{type:'box',size:[150,16,92],position:[0,-32,48],material:'darkMetal'},{type:'cylinder',radius:21,length:22,axis:'z',position:[0,-32,54],material:'metal'}];
  }else if(/板|片|护板|盖板|标牌/.test(name)||type==='plate'){
    const width=/标牌/.test(name)?150:240,height=/标牌/.test(name)?70:120,depth=/标牌/.test(name)?3:10;
    primitives=[plate(width,height,depth,/标牌/.test(name)?'metal':'paintedMetal')];
  }else{
    primitives=[{type:'box',size:[180,88,52],material:'paintedMetal'},{type:'cylinder',radius:24,length:76,axis:'z',position:[0,0,34],material:'metal'}];
  }

  return{level:part.dims.length?'尺寸级':'轮廓级',material,source:source(part),primitives};
}
