// JWF1026 第11—18页零件建模工厂。
// 仅将厂家明确标注的尺寸写入 source.dimensions；未标细节统一在 assumptions 中说明。

const PI=Math.PI;
const finite=value=>Number.isFinite(value)&&value>0?value:1;
const nums=value=>(value||[]).flatMap(item=>(String(item).match(/\d+(?:\.\d+)?/g)||[]).map(Number));
const rectangle=(width,height)=>[[-width/2,-height/2],[width/2,-height/2],[width/2,height/2],[-width/2,height/2]];

const box=(size,material='metal',position=[0,0,0],rotation=[0,0,0])=>({
  type:'box',size:size.map(finite),material,position,rotation,
});
const cylinder=(radius,length,material='metal',position=[0,0,0],axis='x')=>({
  type:'cylinder',radius:finite(radius),length:finite(length),axis,material,position,
});
const annulus=(outer,inner,width,material='metal',position=[0,0,0])=>({
  type:'lathe',
  points:[[inner/2,-width/2],[outer/2,-width/2],[outer/2,width/2],[inner/2,width/2],[inner/2,-width/2]],
  rotation:[0,0,PI/2],position,material,
});
const extrude=(width,height,depth,holes=[],material='metal',position=[0,0,0])=>({
  type:'extrude',points:rectangle(finite(width),finite(height)),depth:finite(depth),holes,material,position,bevel:Math.min(finite(depth)*.08,3),
});
const radialBoxes=(count,radius,size,material='darkMetal')=>Array.from({length:Math.max(3,Math.min(count,48))},(_,index)=>{
  const angle=PI*2*index/count;
  return box(size,material,[0,Math.cos(angle)*radius,Math.sin(angle)*radius],[angle,0,0]);
});
const holesGrid=(width,height,cols=7,rows=4)=>{
  const radius=Math.max(3,Math.min(width/cols,height/rows)*.16);
  const holes=[];
  for(let row=0;row<rows;row++)for(let col=0;col<cols;col++)holes.push({
    kind:'circle',center:[(col-(cols-1)/2)*width/(cols+.4),(row-(rows-1)/2)*height/(rows+.4)],radius,
  });
  return holes;
};

function dimensions3(part,defaults=[240,120,16]){
  const values=nums(part.dimensions);
  if(values.length>=3)return [values[0],values[1],values[2]];
  if(values.length===2)return [values[0],values[1],defaults[2]];
  if(values.length===1)return [values[0],defaults[1],defaults[2]];
  return defaults;
}

function longCylinder(part,{diameter,length,inner=0,material='metal'}={}){
  const values=nums(part.dimensions);
  const actualLength=finite(length||Math.max(...values,520));
  const actualDiameter=finite(diameter||values.find(value=>value<actualLength)||60);
  const primitives=[inner>0?annulus(actualDiameter,inner,actualLength,material):cylinder(actualDiameter/2,actualLength,material)];
  if(/结合件/.test(part.nameZh)){
    primitives.push(cylinder(actualDiameter*.34,actualLength+actualDiameter*1.8,'darkMetal'));
    primitives.push(annulus(actualDiameter*1.16,actualDiameter*.68,actualDiameter*.18,'paintedMetal',[-actualLength*.49,0,0]));
    primitives.push(annulus(actualDiameter*1.16,actualDiameter*.68,actualDiameter*.18,'paintedMetal',[actualLength*.49,0,0]));
  }
  return primitives;
}

function sealing(part){
  const values=nums(part.dimensions);
  const length=values[0]||720;
  const height=values[1]||65;
  const thickness=values[2]||Math.max(8,height*.16);
  return [
    box([length,thickness,height*.62],'rubber',[0,0,-height*.12]),
    box([length,Math.max(3,thickness*.3),height],'darkMetal',[0,-thickness*.42,height*.12]),
    box([length,Math.max(2,thickness*.22),height*.72],'rubber',[0,thickness*.48,height*.18],[0,0,-.12]),
  ];
}

function brush(part){
  const [length,width]=dimensions3(part,[445,45,12]);
  const bristles=Array.from({length:28},(_,index)=>box(
    [Math.max(2,length/95),Math.max(2,width*.1),width*.82],
    'plastic',[-length*.47+index*length/29,0,-width*.47],[0,0,index%2?.08:-.08],
  ));
  return [box([length,width,Math.max(8,width*.22)],'paintedMetal',[0,0,width*.12]),...bristles];
}

function tensioner(part){
  const values=nums(part.dimensions);
  const length=Math.max(values[0]||150,70);
  const height=values[1]||length*.55;
  const wheel=Math.max(32,Math.min(length,height)*.42);
  return [
    extrude(length,height,Math.max(12,wheel*.32),[
      {kind:'circle',center:[-length*.28,0],radius:wheel*.18},
      {kind:'circle',center:[length*.28,0],radius:wheel*.18},
    ],'paintedMetal'),
    annulus(wheel,wheel*.34,Math.max(18,wheel*.35),'darkMetal',[length*.34,0,18]),
    cylinder(wheel*.11,Math.max(28,wheel*.55),'metal',[length*.34,0,18]),
  ];
}

function flexibleApron(part){
  const values=nums(part.dimensions);
  const width=values.length>1?values[values.length-1]:1500;
  const run=part.nameZh==='平帘'?(values[0]||5700)/2.45:(values[0]||1580);
  const primitives=[box([run,width,12],'rubber')];
  if(part.nameZh!=='平帘'){
    for(let index=0;index<14;index++)primitives.push(box([20,width,32],'darkMetal',[-run*.46+index*run/13,0,16]));
  }else{
    primitives.push(box([run*.96,width*.96,3],'plastic',[0,0,7]));
  }
  return primitives;
}

function threadedRod(part){
  const values=nums(part.dimensions);
  const diameter=values[0]||20;
  const length=values[1]||600;
  return [
    cylinder(diameter/2,length,'darkMetal'),
    ...Array.from({length:18},(_,index)=>({
      type:'torus',radius:diameter*.51,tube:Math.max(.55,diameter*.055),
      position:[-length*.46+index*length*.92/17,0,0],rotation:[0,PI/2,0],material:'metal',
    })),
  ];
}

function sprocket(part){
  const values=nums(part.dimensions);
  const outer=values[0]||150;
  const width=values[1]||45;
  const holeText=part.dimensions.find(value=>/孔/.test(value));
  const inner=(holeText&&nums([holeText])[0])||outer*.28;
  const count=Number((part.nameZh.match(/(\d+)(?:T|齿)/)||part.dimensions.join(' ').match(/(\d+)齿/)||[])[1])||18;
  const tooth=Math.max(5,outer*.055);
  return [
    annulus(outer*.86,inner,width,'darkMetal'),
    annulus(Math.max(inner*2.2,outer*.44),inner,width*1.12,'metal'),
    ...radialBoxes(count,outer*.45,[width*.84,tooth,outer*.11],'paintedMetal'),
  ];
}

function pulley(part){
  const values=nums(part.dimensions);
  const outer=values[0]||Number((part.nameZh.match(/φ(\d+(?:\.\d+)?)/)||[])[1])||180;
  const width=values[1]||70;
  const inner=values.find((value,index)=>index>1&&value<outer*.65)||Math.max(28,outer*.22);
  const grooves=part.nameZh.includes('（二）')?4:3;
  return [
    annulus(outer,inner,width,'darkMetal'),
    annulus(Math.max(inner*2.25,outer*.38),inner,width*1.08,'metal'),
    ...Array.from({length:grooves},(_,index)=>({
      type:'torus',radius:outer*.49,tube:Math.max(1.5,width*.025),
      position:[(index-(grooves-1)/2)*width*.68/Math.max(grooves-1,1),0,0],rotation:[0,PI/2,0],material:'metal',
    })),
  ];
}

function bearingHousing(part){
  const values=nums(part.dimensions);
  const outer=values[0]||145;
  const widthText=part.dimensions.find(value=>/×/.test(value));
  const widthValues=nums(widthText?[widthText]:[]);
  const width=widthValues[1]||50;
  const holeText=part.dimensions.find(value=>/孔|\//.test(value));
  const holeValues=nums(holeText?[holeText]:[]);
  const inner=(/孔/.test(holeText||'')?holeValues[0]:holeValues[1])||Math.max(35,outer*.45);
  if(part.pdfPage===13)return [
    extrude(outer,width,30,[{kind:'circle',center:[0,5],radius:inner/2}],'paintedMetal',[0,0,22]),
    box([outer*1.3,width*.35,26],'darkMetal',[0,-width*.48,0]),
  ];
  return [
    annulus(outer,inner,Math.max(30,width),'paintedMetal'),
    annulus(outer*.72,inner,Math.max(36,width*1.16),'darkMetal'),
    ...radialBoxes(4,outer*.48,[Math.max(24,width*.62),outer*.2,outer*.12],'paintedMetal'),
  ];
}

function beater(part){
  const values=nums(part.dimensions);
  const diameter=values[0]||460;
  const total=values[1]||1836.5;
  const roll=values[2]||1594;
  const variant=part.nameZh.includes('结合件')&&String(part.code).endsWith('-2A');
  return [
    cylinder(diameter*.39,roll,'darkMetal'),
    cylinder(diameter*.08,total,'metal'),
    annulus(diameter,diameter*.16,34,'paintedMetal',[-roll*.49,0,0]),
    annulus(diameter,diameter*.16,34,'paintedMetal',[roll*.49,0,0]),
    ...radialBoxes(variant?10:12,diameter*.43,[roll*.9,diameter*.055,diameter*.12],variant?'paintedMetal':'metal'),
  ];
}

function plate(part){
  const values=nums(part.dimensions);
  const width=values[0]||260;
  const height=values[1]||110;
  const depth=values[2]||Math.max(6,Math.min(width,height)*.06);
  const name=part.nameZh;
  if(/墙板/.test(name))return [
    extrude(width,height,depth,[{kind:'circle',center:[width*.3,0],radius:height*.18}],'paintedMetal'),
    box([width*.9,Math.max(10,height*.05),depth*1.4],'darkMetal',[0,-height*.32,depth]),
    box([width*.9,Math.max(10,height*.05),depth*1.4],'darkMetal',[0,height*.32,depth]),
  ];
  if(/角板|支架|托架|支座|支板/.test(name))return [
    extrude(width,height,depth,[{kind:'circle',center:[-width*.28,0],radius:Math.max(4,height*.09)},{kind:'circle',center:[width*.28,0],radius:Math.max(4,height*.09)}],'paintedMetal'),
    box([width,Math.max(12,depth),Math.max(18,height*.34)],'darkMetal',[0,-height*.48,-height*.12]),
  ];
  if(/电机托板/.test(name))return [
    extrude(width,height,depth,[
      {kind:'circle',center:[-width*.28,-height*.25],radius:Math.max(5,height*.055)},
      {kind:'circle',center:[width*.28,-height*.25],radius:Math.max(5,height*.055)},
      {kind:'circle',center:[-width*.28,height*.25],radius:Math.max(5,height*.055)},
      {kind:'circle',center:[width*.28,height*.25],radius:Math.max(5,height*.055)},
    ],'paintedMetal'),
    box([width,depth,height*.22],'darkMetal',[0,-height*.48,-height*.08]),
  ];
  return [
    extrude(width,height,depth,[],'paintedMetal'),
    box([width*.88,Math.max(8,height*.045),depth*1.5],'darkMetal',[0,-height*.3,depth]),
    box([width*.88,Math.max(8,height*.045),depth*1.5],'darkMetal',[0,height*.3,depth]),
  ];
}

function perforatedPanel(part){
  const [width,height,depth]=dimensions3(part,[1700,1120,18]);
  return [
    extrude(width,height,depth,holesGrid(width,height,8,5),'paintedMetal'),
    box([width,Math.max(14,height*.035),depth*1.5],'darkMetal',[0,-height*.48,depth*.2]),
    box([width,Math.max(14,height*.035),depth*1.5],'darkMetal',[0,height*.48,depth*.2]),
  ];
}

function windowModel(part){
  const values=nums(part.dimensions);
  const width=values[0]||410;
  const height=values[1]||440;
  const frame=Math.max(18,Math.min(width,height)*.075);
  return [
    extrude(width,height,frame,[{kind:'polygon',points:rectangle(width-frame*2.2,height-frame*2.2)}],'paintedMetal'),
    box([width-frame*2.3,height-frame*2.3,Math.max(5,frame*.28)],'glass',[0,0,frame*.55]),
    cylinder(frame*.22,frame*1.4,'darkMetal',[width*.42,0,frame], 'y'),
  ];
}

function rawSealStrip(part){
  const values=nums(part.dimensions);
  const width=values[0]||10;
  const thickness=values[1]||3;
  const previewLength=800;
  return [
    box([previewLength,width,thickness],'rubber'),
    box([previewLength,width*.28,thickness*.42],'darkMetal',[0,0,thickness*.62]),
  ];
}

function choose(part){
  const name=part.nameZh;
  if(name==='密封条')return {material:'rubber',primitives:rawSealStrip(part),note:'这是按10×3截面展示的柔性密封条样段；厂家1120dm为单台长度用量，预览未按112米全长展开。'};
  if(/玻璃/.test(name)){
    const values=nums(part.dimensions),outer=values[0]||45,inner=values[1]||0,width=values[2]||6;
    return {material:'glass',primitives:[inner?annulus(outer,inner,width,'glass'):cylinder(outer/2,width,'glass')],note:'按厂家圆形玻璃直径、内径和厚度建立透明件。'};
  }
  if(/维修窗|大视窗/.test(name))return {material:'glass',primitives:windowModel(part),note:'按厂家外框尺寸建立金属窗框与透明视窗，框宽、铰链细节由原格轮廓估算。'};
  if(/网眼板|网眼下板/.test(name))return {material:'paintedMetal',primitives:perforatedPanel(part),note:'按厂家板件外形尺寸建立带孔板；孔径、孔距和数量仅作规则化示意。'};
  if(/密封装置/.test(name)){
    const values=nums(part.dimensions),outer=values[0]||206,width=values[1]||28.5;
    return {material:'rubber',primitives:[annulus(outer,outer*.58,width,'rubber'),annulus(outer*.82,outer*.61,width*.44,'darkMetal',[width*.28,0,0])],note:'按厂家外径和宽度建立橡胶密封环及金属骨架，唇口细节由原格轮廓估算。'};
  }
  if(/密封/.test(name))return {material:'rubber',primitives:sealing(part),note:'按柔性密封件语义建立橡胶唇边和背板，不使用金属实体代替密封主体。'};
  if(/毛刷/.test(name))return {material:'plastic',primitives:brush(part),note:'按厂家外形尺寸建立刷板、背板和分布式柔性刷毛。'};
  if(/平帘|压棉帘|斜帘/.test(name))return {material:'rubber',primitives:flexibleApron(part),note:'按柔性输送帘语义建立帘面；压棉帘和斜帘保留横向条带，帘面厚度为预览估算。'};
  if(/螺杆/.test(name))return {material:'darkMetal',primitives:threadedRod(part),note:'厂家明确公称直径和长度；预览用18道环形纹表达螺纹，不展开真实螺距。'};
  if(/链轮/.test(name))return {material:'darkMetal',primitives:sprocket(part),note:'按厂家外径、宽度与明确齿数建立轮毂和周向齿；厂家标孔径时直接采用，未标孔径按原格比例估算。'};
  if(/带轮/.test(name))return {material:'darkMetal',primitives:pulley(part),note:'按厂家外径、轮宽和孔径建立带轮；槽数及轮毂肩部由原格视图估算。'};
  if(/轴承座/.test(name))return {material:'paintedMetal',primitives:bearingHousing(part),note:'按厂家外形、孔径与宽度建立轴承座壳体和安装耳。'};
  if(/轴承盖/.test(name)){
    const values=nums(part.dimensions),outer=values[0]||100,width=values[1]||28,inner=outer*.48;
    return {material:'metal',primitives:[annulus(outer,inner,width,'paintedMetal'),annulus(outer*.72,inner,width*1.22,'darkMetal',[width*.18,0,0])],note:'按轴承盖回转件语义建立外盖和止口；未标内孔按原格比例估算。'};
  }
  if(/打手结合件/.test(name))return {material:'darkMetal',primitives:beater(part),note:'按厂家打手外径、总长和辊长建立鼓体、贯通轴、端盘及周向工作条。'};
  if(/输棉帘辊|托辊|轴结合件|输棉帘轴|给棉罗拉|^轴$/.test(name)){
    const values=nums(part.dimensions);
    const diameter=/给棉罗拉/.test(name)?220:(values[0]||60);
    const length=/给棉罗拉/.test(name)?(values[0]||1790):Math.max(...values,520);
    const primitives=longCylinder(part,{diameter,length});
    if(/给棉罗拉/.test(name))primitives.push(...radialBoxes(10,diameter*.48,[length*.88,diameter*.07,diameter*.13],'paintedMetal'));
    return {material:'metal',primitives,note:/给棉罗拉/.test(name)?'厂家只标总长与工作段长度，罗拉直径由原格端视图估算；保留周向给棉工作条。':'按厂家直径、总长和轴端尺寸建立辊轴及两端台阶。'};
  }
  if(/计数盘|压盘/.test(name)){
    const values=nums(part.dimensions),outer=name.includes('压盘')?(values[0]||48)*2:(values[0]||60),inner=values[1]||outer*.3,width=values[2]||12;
    return {material:'metal',primitives:[annulus(outer,inner,width,'paintedMetal'),box([outer*.72,outer*.12,width*1.25],'darkMetal',[0,outer*.38,0])],note:'按厂家盘径、孔径与厚度建立盘体；凸耳/压边由原格轮廓估算。'};
  }
  if(/法兰结合件/.test(name)){
    const [width,height,depth]=dimensions3(part,[430,430,76]);
    const holes=[{kind:'circle',center:[0,0],radius:Math.min(width,height)*.18}];
    for(let i=0;i<8;i++){const angle=PI*2*i/8;holes.push({kind:'circle',center:[Math.cos(angle)*width*.34,Math.sin(angle)*height*.34],radius:Math.min(width,height)*.035})}
    return {material:'paintedMetal',primitives:[extrude(width,height,depth,holes,'paintedMetal')],note:'按厂家方形法兰外廓建立中心孔与八孔安装圈；安装孔直径按原格比例估算。'};
  }
  if(/侧垫|挡圈/.test(name)){
    const values=nums(part.dimensions),outer=values[0]||85,width=values[values.length-1]||6;
    const inner=!/侧垫/.test(name)&&values.length>=3?values[1]:outer*.58;
    return {material:'metal',primitives:[annulus(outer,inner,width,'darkMetal')],note:'按薄环件语义建立，外径、内径/截面和厚度优先采用厂家标注。'};
  }
  if(/滑轨/.test(name)){
    const [length,width,height]=dimensions3(part,[170,50,38]);
    return {material:'paintedMetal',primitives:[box([length,width,Math.max(5,height*.16)],'paintedMetal',[0,0,-height*.42]),box([length,Math.max(5,width*.14),height],'darkMetal',[0,-width*.44,0]),box([length,Math.max(5,width*.14),height],'darkMetal',[0,width*.44,0])],note:'按厂家长宽高建立U形滑轨，壁厚由原格截面比例估算。'};
  }
  if(/挡条/.test(name)){
    const values=nums(part.dimensions),length=values[0]||600,width=values[1]||32,height=values[2]||18,lip=values[3]||12;
    return {material:'paintedMetal',primitives:[box([length,width,height*.55],'paintedMetal'),box([length,Math.max(3,width*.18),height+lip],'darkMetal',[0,-width*.42,lip*.25])],note:'按厂家长度和32×18×12截面建立带折边挡条，不把不同长度件复用。'};
  }
  if(/托板结合件/.test(name)){
    const [length,width,height]=dimensions3(part,[1599,392,55]);
    return {material:'paintedMetal',primitives:[extrude(length,width,Math.max(8,height*.18),[],'paintedMetal'),box([length*.92,Math.max(12,width*.07),height],'darkMetal',[0,-width*.42,-height*.22]),box([length*.92,Math.max(12,width*.07),height],'darkMetal',[0,width*.42,-height*.22])],note:'按厂家长宽高建立托板面板和两条纵向加强折边。'};
  }
  return {material:'paintedMetal',primitives:plate(part),note:'按厂家原格轮廓和明确外形尺寸建立板件/支承件，未标孔距、折边厚度与圆角为预览估算。'};
}

export function createJwf1026Spec(part){
  const model=choose(part);
  const dimensions=Array.isArray(part.dimensions)?part.dimensions:[];
  const assumptions=[
    model.note,
    dimensions.length?'厂家明确尺寸直接用于主轮廓；未标的孔距、壁厚、倒角和连接细节不作制造依据。':'厂家未标几何尺寸；本模型仅按原格三视图/轮廓建立识别级外形，不作制造依据。',
  ];
  return {
    level:dimensions.length?'尺寸级':'轮廓级',
    material:model.material,
    source:{
      page:part.pdfPage,item:part.item,code:part.code,recordKey:part.recordKey,nameZh:part.nameZh,
      quantity:part.quantity,dimensions,
      views:[`第${part.pdfPage}页厂家原格`],
      assumptions,
    },
    primitives:model.primitives,
  };
}
