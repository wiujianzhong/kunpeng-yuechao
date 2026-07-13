// JWF1102 厂家PDF第10页爆炸图、第11—12页57项明细：逐件独立3D规格。
// 坐标单位为毫米；source.dimensions只保存厂家名称栏明确规格，未标尺寸仅写入assumptions。

const PI=Math.PI;
const circlePoints=(radius,count=48)=>Array.from({length:count},(_,index)=>{
  const angle=PI*2*index/count;return [Math.cos(angle)*radius,Math.sin(angle)*radius];
});
const hexPoints=across=>{
  const radius=across/Math.sqrt(3);
  return Array.from({length:6},(_,index)=>{const angle=PI/6+PI*2*index/6;return [Math.cos(angle)*radius,Math.sin(angle)*radius]});
};
const openRingPoints=(radius,gap=.36,count=40)=>Array.from({length:count},(_,index)=>{
  const angle=gap/2+(PI*2-gap)*index/(count-1);return [0,Math.cos(angle)*radius,Math.sin(angle)*radius];
});

const parts={
  1:{code:'FA103A-0200-1A',nameZh:'轮座结合件',quantity:1,dims:[]},
  2:{code:'JWF1102-0200-1',nameZh:'打手结合件',quantity:1,dims:[]},
  3:{code:'JWF1102-0200-2',nameZh:'调节板结合件',quantity:1,dims:[]},
  4:{code:'ZFA113-0212',nameZh:'支架',quantity:1,dims:[]},
  5:{code:'ZFA113-0223',nameZh:'电机座',quantity:1,dims:[]},
  6:{code:'JWF1102-0201',nameZh:'打手带轮',quantity:1,dims:[]},
  7:{code:'JWF1102-0202',nameZh:'法兰',quantity:1,dims:[]},
  8:{code:'JWF1102-0203',nameZh:'法兰',quantity:2,dims:[]},
  9:{code:'JWF1102-0204',nameZh:'轴承盖',quantity:1,dims:[]},
  10:{code:'JWF1102-0205',nameZh:'轴承盖',quantity:1,dims:[]},
  11:{code:'JWF1102-0206',nameZh:'空心轴',quantity:1,dims:[]},
  12:{code:'JWF1102-0207',nameZh:'空心轴',quantity:1,dims:[]},
  13:{code:'JWF1102-0208',nameZh:'螺栓',quantity:1,dims:[]},
  14:{code:'JWF1102-0209',nameZh:'螺栓',quantity:1,dims:[]},
  15:{code:'JWF1102-0210',nameZh:'套筒',quantity:1,dims:[]},
  16:{code:'JWF1102-0211',nameZh:'套筒',quantity:2,dims:[]},
  17:{code:'JWF1102-0212',nameZh:'套筒',quantity:2,dims:[]},
  18:{code:'JWF1102-0213',nameZh:'套筒',quantity:1,dims:[]},
  19:{code:'JWF1102-0214',nameZh:'压紧盖',quantity:2,dims:[]},
  20:{code:'JWF1102-0215',nameZh:'压紧盖',quantity:1,dims:[]},
  21:{code:'JWF1102-0216',nameZh:'压紧盖',quantity:1,dims:[]},
  22:{code:'JWF1102-0217',nameZh:'止推环',quantity:1,dims:[]},
  23:{code:'JWF1102-0218',nameZh:'检测盘',quantity:1,dims:[]},
  24:{code:'JWF1102-0219',nameZh:'电机带轮',quantity:1,dims:[]},
  25:{code:'JWF1102-0220',nameZh:'张紧带轮',quantity:1,dims:[]},
  26:{code:'GB14',nameZh:'螺栓 M16X45',quantity:4,dims:['M16X45']},
  27:{code:'GB5783',nameZh:'螺栓 M6X45',quantity:2,dims:['M6X45']},
  28:{code:'GB5783',nameZh:'螺栓 M8X16',quantity:40,dims:['M8X16']},
  29:{code:'GB5783',nameZh:'螺栓 M8X40',quantity:6,dims:['M8X40']},
  30:{code:'GB5783',nameZh:'螺栓 M10X40',quantity:1,dims:['M10X40']},
  31:{code:'GB5783',nameZh:'螺栓 M16X45',quantity:4,dims:['M16X45']},
  32:{code:'GB77',nameZh:'螺钉 M6X16',quantity:1,dims:['M6X16']},
  33:{code:'GB818',nameZh:'螺钉 M6X12',quantity:1,dims:['M6X12']},
  34:{code:'GB6191',nameZh:'螺钉 M8X20',quantity:12,dims:['M8X20']},
  35:{code:'GB6170',nameZh:'螺母 M16',quantity:8,dims:['M16']},
  36:{code:'GB93',nameZh:'垫圈 6',quantity:3,dims:['6']},
  37:{code:'GB93',nameZh:'垫圈 8',quantity:36,dims:['8']},
  38:{code:'GB93',nameZh:'垫圈 16',quantity:8,dims:['16']},
  39:{code:'GB96',nameZh:'垫圈 12',quantity:2,dims:['12']},
  40:{code:'GB96',nameZh:'垫圈 16',quantity:4,dims:['16']},
  41:{code:'GB97.1',nameZh:'垫圈 8',quantity:4,dims:['8']},
  42:{code:'GB97.1',nameZh:'垫圈 10',quantity:1,dims:['10']},
  43:{code:'GB97.1',nameZh:'垫圈 16',quantity:4,dims:['16']},
  44:{code:'GB879',nameZh:'销 5X12',quantity:4,dims:['5X12']},
  45:{code:'GB893.1',nameZh:'挡圈 52',quantity:2,dims:['52']},
  46:{code:'GB894.1',nameZh:'挡圈 25',quantity:1,dims:['25']},
  47:{code:'GB/T276-94',nameZh:'滚动轴承 6205-2Z',quantity:2,dims:['6205-2Z']},
  48:{code:null,nameZh:'滚动轴承 22209EAE4',quantity:2,dims:['22209EAE4'],remark:'NSK'},
  49:{code:'GB5867-86',nameZh:'胀套 Z1-45X52',quantity:12,dims:['Z1-45X52'],remark:'上海汉唐传动'},
  50:{code:null,nameZh:'尼龙片基平皮带 GG-26,2.6X40X2900',quantity:1,dims:['GG-26,2.6X40X2900']},
  51:{code:'JB/T7940.1-95',nameZh:'油杯 M6',quantity:2,dims:['M6']},
  52:{code:'FZ/T92010-91',nameZh:'毡圈 55',quantity:4,dims:['55']},
  53:{code:'JWF1102-0232',nameZh:'刀片',quantity:72,dims:[]},
  54:{code:'JWF1102-0231',nameZh:'角钉',quantity:72,dims:[]},
  55:{code:'JWF1102-0230',nameZh:'固定块',quantity:72,dims:[]},
  56:{code:'GB859',nameZh:'垫圈 8',quantity:144,dims:['8']},
  57:{code:'GB70',nameZh:'螺钉 M8X25',quantity:144,dims:['M8X25']},
};

const duplicateCodes=new Set(['GB5783','GB93','GB96','GB97.1']);
const pageFor=item=>item<=50?11:12;
const recordKey=item=>`jwf1102-p${String(pageFor(item)).padStart(2,'0')}-item-${String(item).padStart(3,'0')}`;
const partKey=item=>!parts[item].code||duplicateCodes.has(parts[item].code)?recordKey(item):parts[item].code;
const source=(item,assumptions)=>({
  page:pageFor(item),item,code:parts[item].code,recordKey:recordKey(item),nameZh:parts[item].nameZh,
  quantity:{value:parts[item].quantity,unit:'件',meaning:'单台设备用量'},dimensions:parts[item].dims,
  views:[`第10页打手部件爆炸图标号${item}`,`第${pageFor(item)}页厂家明细原格`],assumptions,
  ...(parts[item].remark?{remark:parts[item].remark}:{}),
});
const spec=(item,{level='轮廓级',material='metal',primitives,assumptions})=>({level,material,source:source(item,assumptions),primitives});

const annulus=(outer,inner,width,material='metal',position=[0,0,0])=>({
  type:'lathe',points:[[inner/2,-width/2],[outer/2,-width/2],[outer/2,width/2],[inner/2,width/2],[inner/2,-width/2]],
  rotation:[0,0,PI/2],position,material,
});
const radialBoxes=(count,radius,size,x=0,material='darkMetal')=>Array.from({length:count},(_,index)=>{
  const angle=PI*2*index/count;return {type:'box',size,position:[x,Math.cos(angle)*radius,Math.sin(angle)*radius],rotation:[angle,0,0],material};
});
const spokedWheel=(outer,inner,width,spokes=8)=>[
  annulus(outer,outer*.82,width,'paintedMetal'),annulus(inner*2.1,inner,width*1.25,'darkMetal'),
  ...radialBoxes(spokes,outer*.31,[width*.75,outer*.58,outer*.055],0,'paintedMetal'),
];
const pulley=(item,outer,inner,width,grooves,note)=>spec(item,{assumptions:[note,`厂家未标该件单件尺寸；外径${outer}、内孔${inner}、轮宽${width}和槽数${grooves}均按第10页爆炸图相对比例估算。`],primitives:[annulus(outer,inner,width,'darkMetal'),annulus(Math.max(inner*2.3,outer*.38),inner,width*1.22,'metal'),...Array.from({length:grooves},(_,i)=>({type:'torus',radius:outer/2,tube:Math.max(width*.025,1.5),position:[(i-(grooves-1)/2)*width*.7/Math.max(grooves-1,1),0,0],rotation:[0,PI/2,0],material:'metal'}))]});
const sleeve=(item,outer,inner,length,note)=>spec(item,{assumptions:[note,`厂家未标套筒尺寸；外径${outer}、内孔${inner}、长度${length}按第10页相应轴端比例估算，中心保持贯通孔。`],primitives:[annulus(outer,inner,length,'metal'),annulus(outer*1.12,inner,length*.12,'darkMetal',[-length*.44,0,0])]});
const cover=(item,outer,inner,width,lip,note)=>spec(item,{assumptions:[note,`厂家未标尺寸；外径${outer}、内孔${inner}、深度${width}和止口${lip}按第10页比例估算，保持杯形/压盖中心孔语义。`],primitives:[annulus(outer,inner,width,'paintedMetal'),annulus(outer*.72,inner,width+lip,'darkMetal',[lip/2,0,0])]});
const hexBolt=(item,diameter,length,headAcross,headHeight,kind='螺栓')=>spec(item,{level:'尺寸级',assumptions:[`厂家明确${kind}规格M${diameter}X${length}，公称直径${diameter}和长度${length}直接采用。`,`头部对边${headAcross}、头高${headHeight}按对应标准常用比例表达；螺距、倒角和公差未在本页标明。`],primitives:[{type:'cylinder',radius:diameter/2,length,axis:'x',position:[length/2,0,0]},{type:'cylinder',radius:headAcross/Math.sqrt(3),length:headHeight,segments:6,axis:'x',position:[-headHeight/2,0,0],material:'darkMetal'},...Array.from({length:5},(_,i)=>({type:'torus',radius:diameter/2,tube:Math.max(diameter*.045,.25),position:[length*.62+i*length*.07,0,0],rotation:[0,PI/2,0],material:'darkMetal'}))]});
const machineBolt=(item,diameter,length,headAcross,note)=>spec(item,{assumptions:[note,`厂家未标专用螺栓尺寸；杆径${diameter}、长度${length}和头部对边${headAcross}均按第10页相对比例估算。`],primitives:[{type:'cylinder',radius:diameter/2,length,axis:'x',position:[length/2,0,0]},{type:'cylinder',radius:headAcross/Math.sqrt(3),length:diameter*.65,segments:6,axis:'x',position:[-diameter*.325,0,0],material:'darkMetal'}]});
const screw=(item,diameter,length,headRadius,headHeight,headKind)=>spec(item,{level:'尺寸级',assumptions:[`厂家明确螺钉规格M${diameter}X${length}，公称直径和长度直接采用。`,`按${headKind}语义建立头部；头径${headRadius*2}、头高${headHeight}按相应标准常用比例估算，螺纹和公差未展开。`],primitives:[{type:'cylinder',radius:diameter/2,length,axis:'x',position:[length/2,0,0]},{type:'cylinder',radius:headRadius,length:headHeight,axis:'x',position:[-headHeight/2,0,0],material:'darkMetal'},{type:'box',size:[headHeight*.25,headRadius*1.25,headRadius*.18],position:[-headHeight,0,0],material:'metal'}]});
const flatWasher=(item,nominal,outer,thickness,standard)=>spec(item,{level:'尺寸级',assumptions:[`厂家明确${standard}垫圈公称规格${nominal}，中心孔按公称规格表达。`,`外径${outer}、厚度${thickness}按${standard}常用比例估算；厂家本页未给外径、厚度和公差。`],primitives:[annulus(outer,nominal,thickness,'metal')]});
const springWasher=(item,nominal,ringRadius,wireRadius,standard='GB93')=>spec(item,{level:'尺寸级',material:'darkMetal',assumptions:[`厂家明确${standard}垫圈公称规格${nominal}；模型按开口弹簧垫圈物理语义建立。`,`环半径${ringRadius}、线径${wireRadius*2}和开口角按相应标准常用比例估算；厂家本页未给这些尺寸。`],primitives:[{type:'tube',points:openRingPoints(ringRadius),radius:wireRadius,radialSegments:12,material:'darkMetal'}]});
const bearing=(item,outer,inner,width,note)=>spec(item,{assumptions:[note,`厂家只明确轴承型号，未在本页列出外径、内径和宽度；外径${outer}、内径${inner}、宽度${width}仅按型号外观和第10页比例估算。`],primitives:[annulus(outer,(outer+inner)*.53,width,'darkMetal'),annulus((outer+inner)*.46,inner,width,'metal'),...Array.from({length:12},(_,i)=>{const a=PI*2*i/12;return {type:'torus',radius:width*.22,tube:width*.16,position:[0,Math.cos(a)*(outer+inner)*.245,Math.sin(a)*(outer+inner)*.245],rotation:[a,0,0],material:'metal'}})]});

const byItem={
  1:spec(1,{material:'paintedMetal',assumptions:['标号1位于打手鼓左端，为带轮缘、轮毂、辐条和安装座的轮座结合件。','厂家未标单件尺寸；外径520、轮毂孔70、厚度48及8根辐条按第10页爆炸图比例估算。'],primitives:[...spokedWheel(520,70,48,8),{type:'box',size:[110,150,80],position:[-54,-245,0],material:'darkMetal'}]}),
  2:spec(2,{material:'darkMetal',assumptions:['标号2是打手长鼓体，图中可见两端盘、筒体以及沿圆周和轴向重复的刀片/角钉安装位。','厂家未标总长和直径；鼓体长1120、直径470、端盘与示意安装块尺寸按第10页比例估算，单个刀片、角钉、固定块仍保持第53—55项独立。'],primitives:[{type:'cylinder',radius:235,length:1120,axis:'x',material:'darkMetal'},...spokedWheel(500,72,28,8).map((p,index)=>({...p,position:[-560,...(p.position||[0,0,0]).slice(1)]})),...spokedWheel(500,72,28,8).map((p,index)=>({...p,position:[560,...(p.position||[0,0,0]).slice(1)]})),...Array.from({length:24},(_,i)=>{const row=i%6,band=Math.floor(i/6),a=PI*2*row/6;return {type:'box',size:[42,20,55],position:[-420+band*280,Math.cos(a)*250,Math.sin(a)*250],rotation:[a,0,0],material:'metal'}})]}),
  3:spec(3,{material:'paintedMetal',assumptions:['标号3位于左上调节链，为带长臂、转轴孔和底部安装板的调节板结合件。','厂家未标外形尺寸；臂长330、板厚18、两端孔径及底座比例按爆炸图估算。'],primitives:[{type:'extrude',points:[[-42,-165],[36,-165],[50,105],[24,165],[-18,150],[-8,-100],[-42,-100]],depth:18,holes:[{kind:'circle',center:[6,125],radius:16},{kind:'circle',center:[0,-126],radius:12}],bevel:3},{type:'box',size:[150,42,48],position:[0,-178,0],material:'darkMetal'}]}),
  4:spec(4,{material:'paintedMetal',assumptions:['标号4位于右上轴承组外侧，为带立板、上折边和安装孔的支架。','厂家未标尺寸；主板190×150×16、折边和孔位按爆炸图估算。'],primitives:[{type:'extrude',points:[[-95,-75],[95,-75],[95,75],[-40,75],[-95,32]],depth:16,holes:[{kind:'circle',center:[52,18],radius:18},{kind:'circle',center:[-55,-35],radius:9}],bevel:2},{type:'box',size:[190,32,55],position:[0,88,-20],material:'darkMetal'}]}),
  5:spec(5,{material:'paintedMetal',assumptions:['标号5位于电机与电机带轮之间，为独立电机安装座，不把电机本体并入。','厂家未标尺寸；座板280×250×18、中心让位孔、四个安装孔和两侧折边按爆炸图估算。'],primitives:[{type:'extrude',points:[[-140,-125],[140,-125],[140,125],[-140,125]],depth:18,holes:[{kind:'circle',center:[0,0],radius:55},{kind:'circle',center:[-92,-82],radius:10},{kind:'circle',center:[92,-82],radius:10},{kind:'circle',center:[-92,82],radius:10},{kind:'circle',center:[92,82],radius:10}],bevel:2},{type:'box',size:[280,34,70],position:[0,-142,-26],material:'darkMetal'}]}),
  6:pulley(6,360,70,72,3,'标号6位于打手左侧传动端，是大直径打手带轮。'),
  7:spec(7,{assumptions:['标号7位于打手左端轮座内侧，是较大、较宽的单件法兰。','厂家未标尺寸；外径210、内孔72、厚度36及6孔安装圈按第10页比例估算。'],primitives:[annulus(210,72,36,'metal'),...radialBoxes(6,78,[30,18,18],0,'darkMetal')]}),
  8:spec(8,{assumptions:['标号8位于打手右端轮座内侧，单台2件；与第7项法兰件号和数量均不同。','厂家未标尺寸；外径175、内孔64、厚度25及4孔安装圈按第10页比例估算，不复用第7项尺寸。'],primitives:[annulus(175,64,25,'metal'),...radialBoxes(4,66,[20,16,16],0,'darkMetal')]}),
  9:cover(9,150,62,28,16,'标号9位于打手左端轴承位置，是较大的轴承盖。'),
  10:cover(10,125,50,22,12,'标号10位于打手右端轴承位置，是较小的轴承盖，外形不复用第9项。'),
  11:spec(11,{assumptions:['标号11是打手一侧较长空心轴，中心孔贯通，并带两级外圆台阶。','厂家未标尺寸；总长520、主外径58、内孔28及台阶尺寸按爆炸图估算。'],primitives:[annulus(58,28,360,'metal'),annulus(76,28,110,'darkMetal',[-235,0,0]),annulus(48,28,50,'metal',[205,0,0])]}),
  12:spec(12,{assumptions:['标号12是打手另一侧空心轴，图中较短且端部台阶方向不同。','厂家未标尺寸；总长430、主外径64、内孔30及台阶尺寸按爆炸图估算，不复用第11项。'],primitives:[annulus(64,30,300,'metal'),annulus(82,30,85,'darkMetal',[192.5,0,0]),annulus(48,30,45,'metal',[-172.5,0,0])]}),
  13:machineBolt(13,16,110,25,'标号13是左下轴系最外侧专用长螺栓。'),
  14:machineBolt(14,12,78,20,'标号14是右侧轴承盖附近的专用螺栓，长度短于第13项。'),
  15:sleeve(15,74,38,88,'标号15位于左下轴系轴承外侧，是较短厚壁套筒。'),
  16:sleeve(16,82,40,170,'标号16位于左下长轴中段，单台2件，是四个套筒中最长者。'),
  17:sleeve(17,70,36,100,'标号17位于左下轴系中段，单台2件，外径和长度小于第16项。'),
  18:sleeve(18,62,30,72,'标号18位于右侧轴端，是四个套筒中较细短的一件。'),
  19:cover(19,88,34,22,10,'标号19位于左下轴系末端，是中等直径压紧盖，单台2件。'),
  20:cover(20,72,28,18,8,'标号20位于右侧检测盘内侧，是较小压紧盖。'),
  21:cover(21,96,40,24,12,'标号21位于左下轴系外端，是较大压紧盖，尺寸不复用第19、20项。'),
  22:spec(22,{assumptions:['标号22位于左下轴承外侧，是带中心孔的止推环。','厂家未标尺寸；外径92、内孔42、宽16按爆炸图估算。'],primitives:[annulus(92,42,16,'darkMetal')]}),
  23:spec(23,{assumptions:['标号23位于右侧轴端，是独立检测盘，图中为薄圆盘并带中心孔。','厂家未标尺寸；外径105、内孔26、厚度8及感应缺口按爆炸图估算。'],primitives:[annulus(105,26,8,'metal'),{type:'box',size:[12,34,8],position:[0,48,0],material:'darkMetal'}]}),
  24:pulley(24,210,42,58,2,'标号24位于电机轴前端，是电机带轮，直径明显小于打手带轮。'),
  25:pulley(25,150,36,65,2,'标号25位于左上张紧机构，是张紧带轮，轮毂长度与第24项不同。'),
  26:hexBolt(26,16,45,24,10,'螺栓'),
  27:hexBolt(27,6,45,10,4,'螺栓'),
  28:hexBolt(28,8,16,13,5.3,'螺栓'),
  29:hexBolt(29,8,40,13,5.3,'螺栓'),
  30:hexBolt(30,10,40,17,6.4,'螺栓'),
  31:hexBolt(31,16,45,24,10,'螺栓'),
  32:screw(32,6,16,5,3,'紧定螺钉'),
  33:screw(33,6,12,6,3.5,'十字槽盘头螺钉'),
  34:screw(34,8,20,7,5,'内六角螺钉'),
  35:spec(35,{level:'尺寸级',material:'darkMetal',assumptions:['厂家明确六角螺母规格M16，中心孔按公称直径16表达。','六角对边24、厚度13按GB6170常用比例估算；螺距与公差未标。'],primitives:[{type:'extrude',points:hexPoints(24),depth:13,holes:[{kind:'circle',center:[0,0],radius:8}],bevel:.8,material:'darkMetal'}]}),
  36:springWasher(36,6,5,1.1),37:springWasher(37,8,6.5,1.3),38:springWasher(38,16,12.5,2.2),
  39:flatWasher(39,12,37,3,'GB96'),40:flatWasher(40,16,50,4,'GB96'),
  41:flatWasher(41,8,16,1.6,'GB97.1'),42:flatWasher(42,10,20,2,'GB97.1'),43:flatWasher(43,16,30,3,'GB97.1'),
  44:spec(44,{level:'尺寸级',assumptions:['厂家明确销规格5X12，按直径5、长度12建立圆柱销。','两端小倒角与公差未标，仅以细环表达端部。'],primitives:[{type:'cylinder',radius:2.5,length:12,axis:'x'},{type:'torus',radius:2.35,tube:.18,position:[-5.7,0,0],rotation:[0,PI/2,0]},{type:'torus',radius:2.35,tube:.18,position:[5.7,0,0],rotation:[0,PI/2,0]}]}),
  45:spec(45,{level:'尺寸级',material:'darkMetal',assumptions:['厂家明确GB893.1挡圈规格52，模型按轴用开口挡圈语义建立。','环宽、厚度、开口角和钳孔按常用比例估算；厂家本页未给这些尺寸。'],primitives:[{type:'tube',points:openRingPoints(27,0.5),radius:1.8,material:'darkMetal'},{type:'torus',radius:2.2,tube:.8,position:[0,25,7],rotation:[0,PI/2,0],material:'darkMetal'},{type:'torus',radius:2.2,tube:.8,position:[0,25,-7],rotation:[0,PI/2,0],material:'darkMetal'}]}),
  46:spec(46,{level:'尺寸级',material:'darkMetal',assumptions:['厂家明确GB894.1挡圈规格25，模型按孔用开口挡圈语义建立。','环宽、厚度、开口角和钳孔按常用比例估算，不与第45项合并。'],primitives:[{type:'tube',points:openRingPoints(11.5,0.55),radius:1.25,material:'darkMetal'},{type:'torus',radius:1.5,tube:.55,position:[0,10,3.8],rotation:[0,PI/2,0],material:'darkMetal'},{type:'torus',radius:1.5,tube:.55,position:[0,10,-3.8],rotation:[0,PI/2,0],material:'darkMetal'}]}),
  47:bearing(47,52,25,15,'厂家名称栏明确型号6205-2Z；模型保留双环滚动轴承和密封盖语义。'),
  48:bearing(48,85,45,23,'厂家件号栏为空，名称栏型号为22209EAE4、备注为NSK；模型按双列调心滚动轴承语义建立，不把NSK当件号。'),
  49:spec(49,{level:'尺寸级',material:'darkMetal',assumptions:['厂家名称栏明确胀套规格Z1-45X52，按内径45、外径52表达同心胀套。','轴向宽度22、开槽与螺钉数量按第10页外观估算；厂家备注“上海汉唐传动”不参与几何。'],primitives:[annulus(52,45,22,'darkMetal'),...radialBoxes(6,25,[18,2.5,2.5],0,'metal')]}),
  50:spec(50,{level:'尺寸级',material:'rubber',assumptions:['厂家名称栏明确尼龙片基平皮带规格GG-26,2.6X40X2900；长度2900、厚2.6、宽40直接采用。','以周长2900换算平均半径约461.5，做成闭合环带用于单件预览；实际装机后的两轮拉伸形态和预紧量未标。'],primitives:[{type:'lathe',points:[[460.2,-20],[462.8,-20],[462.8,20],[460.2,20],[460.2,-20]],rotation:[0,0,PI/2],material:'rubber'}]}),
  51:spec(51,{material:'brass',assumptions:['厂家明确油杯接口规格M6，模型按直通压注油杯的螺纹杆、六角肩和杯头语义建立。','除M6外的总长、六角对边和杯头直径均按第10页比例及常见外观估算。'],primitives:[{type:'cylinder',radius:3,length:12,axis:'x',position:[6,0,0],material:'brass'},{type:'cylinder',radius:5.2,length:5,segments:6,axis:'x',position:[14.5,0,0],material:'darkMetal'},{type:'cylinder',radiusTop:4,radiusBottom:6,length:10,axis:'x',position:[22,0,0],material:'brass'}]}),
  52:spec(52,{material:'rubber',assumptions:['厂家明确毡圈规格55；模型按柔性密封毡圈建立中心孔55。','外径78、宽9和边缘圆角按第10页轴承位置比例估算，不与金属挡圈混用。'],primitives:[annulus(78,55,9,'rubber')]}),
  53:spec(53,{material:'metal',assumptions:['标号53是鼓体表面重复安装的单片刀片，单台72片；模型只展示一片。','厂家未标尺寸；刀片长92、宽34、厚4、前端斜刃和两个安装孔按第10页局部外观估算。'],primitives:[{type:'extrude',points:[[-46,-17],[34,-17],[46,-7],[46,9],[30,17],[-46,17]],depth:4,holes:[{kind:'circle',center:[-24,0],radius:4},{kind:'circle',center:[18,0],radius:4}],bevel:.6},{type:'box',size:[78,3,4],position:[4,18,0],material:'darkMetal'}]}),
  54:spec(54,{material:'darkMetal',assumptions:['标号54是鼓体表面重复安装的角钉，单台72件；图中呈弯折钉杆。','厂家未标尺寸；杆径7、底段38、斜段58和弯折角按第10页局部外观估算。'],primitives:[{type:'tube',points:[[-30,0,0],[-2,0,0],[18,12,0],[36,38,0]],radius:3.5,radialSegments:12,material:'darkMetal'},{type:'cylinder',radius:8,length:5,axis:'x',position:[-32.5,0,0],material:'metal'}]}),
  55:spec(55,{material:'paintedMetal',assumptions:['标号55是用于固定刀片/角钉的单个固定块，单台72件；与刀片、角钉分开建模。','厂家未标尺寸；块体58×34×22、上部弧面以折线轮廓表达，两个安装孔按第10页外观估算。'],primitives:[{type:'extrude',points:[[-29,-17],[29,-17],[29,9],[17,17],[-17,17],[-29,9]],depth:22,holes:[{kind:'circle',center:[-16,0],radius:4},{kind:'circle',center:[16,0],radius:4}],bevel:3}]}),
  56:springWasher(56,8,6.5,1.15,'GB859'),
  57:screw(57,8,25,6.5,8,'内六角圆柱头螺钉'),
};

export const jwf1102P11ModelSpecs=Object.fromEntries(Object.entries(byItem).filter(([item])=>Number(item)<=50).map(([item,value])=>[partKey(Number(item)),value]));
export const jwf1102P12ModelSpecs=Object.fromEntries(Object.entries(byItem).filter(([item])=>Number(item)>=51).map(([item,value])=>[partKey(Number(item)),value]));
export const jwf1102P11P12ModelSpecs={...jwf1102P11ModelSpecs,...jwf1102P12ModelSpecs};
