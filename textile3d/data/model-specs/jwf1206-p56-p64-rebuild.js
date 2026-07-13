// JWF1206第56—64页：依照600dpi厂家原格按recordKey逐件显式建模。
// 不使用零件名称、modelType或通用factory回退猜形。
import {
  PI,rect,circle,hole,slot,box,cylinder,torus,extrude,plate,lathe,annulus,tube,
  spring,arcShell,steppedRoller,flangeCover,solidPulley,roundedRectPoints,rectangularDuct,
  sourceSpec,buildExplicitPage,
} from './jwf1206-p56-p64-rebuild-helpers.js';

const AX=['厂家原格纵向主视/剖视与端视联合定形；点画线为回转中心线，剖面线不是实体边'];
const FS=['厂家原格主视图与侧视/端视联合定形；主视取宽高，侧视取深度与折弯关系'];
const SE=['厂家原格主视图与下方截面/剖面联合定形；下方图是同一零件截面'];
const ONE=['厂家原格单一主视轮廓；尺寸线、中心线和引出线已排除'];
const U=['未标孔径、孔距、倒角、公差和壁厚不作制造依据'];
const UA=['未标的轴肩长度、内孔台阶和键槽按原格比例估算'];
const UH=['结合件的内部紧固件和不可见连接未展开'];
const dim=(part,views,assumptions,unknowns,material,primitives)=>sourceSpec(part,{views,assumptions,unknowns,material,primitives});
const outline=(part,views,assumptions,unknowns,material,primitives)=>sourceSpec(part,{level:'轮廓级',views,assumptions,unknowns,material,primitives});

const bearingSeat=(mirror=1)=>[
  extrude([[-60,-42],[-48,-60],[48,-60],[60,-42],[60,35],[43,58],[-43,58],[-60,35]],100,{
    holes:[hole(0,0,22),hole(-36*mirror,34,3),hole(36*mirror,34,3)],material:'paintedMetal',
  }),
  annulus(78,44,48,{material:'metal',position:[mirror*26,0,0]}),
  box([120,18,100],'darkMetal',[0,-51,0]),
];
const thirdBearingSeat=(mirror=1)=>[
  extrude(circle(127),115,{holes:[hole(0,8,28),slot(-70,-64,54,34),slot(70,-64,54,34)],material:'paintedMetal'}),
  box([238,62,115],'paintedMetal',[0,-97,0]),
  annulus(116,56,62,{material:'metal',position:[mirror*26,0,8]}),
  box([54,38,122],'darkMetal',[-72,-76,0]),box([54,38,122],'darkMetal',[72,-76,0]),
];
const bearingSleeve=(mirror=1)=>[
  annulus(120,58,77,{material:'metal'}),
  extrude(circle(61),12,{holes:[hole(0,0,29),hole(-46,0,2.5),hole(46,0,2.5),hole(0,-46,2.5),hole(0,46,2.5)],material:'paintedMetal',position:[mirror*32.5,0,0]}),
];
const shim=(outer,inner,width)=>[annulus(outer,inner,Math.max(width,.12),{material:'metal'})];
const flatSeal=(outer,section,width)=>[annulus(outer,outer-section*2,width,{material:'rubber'})];

const builders={
  // 第56页：第二刺辊结合件及轴承件。
  'jwf1206-p56-item-001':part=>dim(part,AX,['1352为总长，φ172.5为中部辊体直径；按原格将辊体、贯通轴和两端多级轴肩分开建立'],UA,'darkMetal',steppedRoller({overall:1352,bodyLength:690,bodyDiameter:172.5,shaftDiameter:30,material:'darkMetal'})),
  'jwf1206-p56-item-002':part=>dim(part,AX,['剖视明确外径φ150、内径φ120、轴向长16；按环形密封件建立'],U,'rubber',[annulus(150,120,16,{material:'rubber'})]),
  'jwf1206-p56-item-003':part=>dim(part,FS,['右轴承座的主视外廓、中心轴承孔、底座与侧剖深100联合建立；右侧轴向凸台不与左件混用'],U,'paintedMetal',bearingSeat(1)),
  'jwf1206-p56-item-004':part=>dim(part,FS,['左轴承座为右件的轴向镜像；底座平面与上部弧形外廓分开表达'],U,'paintedMetal',bearingSeat(-1)),
  'jwf1206-p56-item-005':part=>dim(part,AX,['按80总长和M12×1螺纹大径建立调节螺柱，两端短螺纹段与光杆分色'],['螺纹牙形仅用短圆柱语义表达'], 'metal',[cylinder(6,80,'x','metal'),cylinder(6.35,12,'x','darkMetal',[-34,0,0]),cylinder(6.35,12,'x','darkMetal',[34,0,0])]),
  'jwf1206-p56-item-006':part=>dim(part,AX,['剖视明确φ45/φ13×5平垫圈'],U,'metal',[annulus(45,13,5,{material:'metal'})]),
  'jwf1206-p56-item-007':part=>dim(part,FS,['右轴承盖由φ119圆法兰、中心孔、四安装孔和侧剖26深台阶定形'],U,'metal',flangeCover({outer:119,depth:26,bore:40,boltRadius:45,material:'metal'})),
  'jwf1206-p56-item-008':part=>dim(part,FS,['左轴承盖的法兰孔系与右件一致，轴向深度为29'],U,'metal',flangeCover({outer:119,depth:29,bore:40,boltRadius:45,material:'metal'})),
  'jwf1206-p56-item-009':part=>dim(part,AX,['按φ70×45纵向剖视建立带外圆台阶的空心轴套'],UA,'metal',[lathe([[20,-22.5],[35,-22.5],[35,-13],[30,-13],[30,13],[35,13],[35,22.5],[20,22.5],[20,-22.5]],'metal')]),
  'jwf1206-p56-item-010':part=>dim(part,AX,['带轮为φ126×45实心轮缘、中心轮毂和键槽孔；原格未给减重槽，不人为增加'],UA,'darkMetal',solidPulley({outer:126,width:45,bore:34,hub:62,grooves:1})),
  'jwf1206-p56-item-011':part=>dim(part,FS,['上方剖视确定轴向宽16和高10，下方端视确定20方形外廓及中心孔'],['中心孔直径未标，按端视比例取φ10'],'metal',[extrude(rect(20,20),16,{holes:[hole(0,0,5)],material:'metal'})]),

  // 第57页：调整垫片与橡胶密封圈。
  'jwf1206-p57-item-001':part=>dim(part,AX,['调整垫片按φ50/φ40×0.1建立，不把侧视尺寸线当成折边'],U,'metal',shim(50,40,.1)),
  'jwf1206-p57-item-002':part=>dim(part,AX,['调整垫片按φ90/φ82×0.1建立'],U,'metal',shim(90,82,.1)),
  'jwf1206-p57-item-003':part=>dim(part,AX,['调整垫片按φ90/φ82×0.2建立'],U,'metal',shim(90,82,.2)),
  'jwf1206-p57-item-004':part=>dim(part,AX,['调整垫片按φ90/φ82×0.3建立'],U,'metal',shim(90,82,.3)),
  'jwf1206-p57-item-005':part=>dim(part,AX,['不按金属垫圈处理；名称40×2.8用于径向截面，原格侧视明示轴向厚1.6'],['名称规格2.8与图示1.6用途不同，两者均保留'],'rubber',flatSeal(40,2.8,1.6)),
  'jwf1206-p57-item-006':part=>dim(part,AX,['橡胶密封圈按名称50×3.1的径向截面和图示1.6轴向厚建立'],['未标橡胶硬度和公差'],'rubber',flatSeal(50,3.1,1.6)),

  // 第58页：第三刺辊结合件。
  'jwf1206-p58-item-001':part=>dim(part,AX,['1352为含轴端总长，φ250为辊体直径；辊体和两端阶梯轴分开建立'],UA,'darkMetal',steppedRoller({overall:1352,bodyLength:690,bodyDiameter:250,shaftDiameter:34,material:'darkMetal'})),
  'jwf1206-p58-item-002':part=>dim(part,FS,['右轴承座结合件按R127外弧、R124.5内部轮廓、底座及115轴向深建立；两个下部窗口保留'],UH,'paintedMetal',thirdBearingSeat(1)),
  'jwf1206-p58-item-003':part=>dim(part,FS,['左轴承座结合件与右件轴向镜像，不将剖面线当作表面槽'],UH,'paintedMetal',thirdBearingSeat(-1)),
  'jwf1206-p58-item-004':part=>dim(part,AX,['密封圈结合件按φ225/φ195×14建立为环形密封件'],U,'rubber',[annulus(225,195,14,{material:'rubber'})]),
  'jwf1206-p58-item-005':part=>dim(part,FS,['主视为L形安装片并有三个安装孔，侧视明确折弯伸出73和正视宽70'],['板厚及孔径未标，按原格取4和φ10'],'paintedMetal',[
    extrude([[-35,-26],[35,-26],[35,0],[8,0],[8,28],[-8,28],[-8,0],[-35,0]],4,{holes:[hole(-22,-13,5),hole(22,-13,5),hole(0,18,5)],material:'paintedMetal'}),
    box([73,4,24],'paintedMetal',[0,0,-12],[0,0,0]),
  ]),
  'jwf1206-p58-item-006':part=>dim(part,AX,['φ136×45带轮保留实心轮缘、轮毂、键槽孔和正视两道弧形减重槽语义'],UA,'darkMetal',[
    ...solidPulley({outer:136,width:45,bore:36,hub:68,grooves:2}),
    box([2,58,9],'darkMetal',[23,0,37],[.12,0,0]),box([2,58,9],'darkMetal',[23,0,-37],[-.12,0,0]),
  ]),
  'jwf1206-p58-item-007':part=>dim(part,AX,['φ45/φ13×5平垫圈'],U,'metal',[annulus(45,13,5,{material:'metal'})]),
  'jwf1206-p58-item-008':part=>dim(part,FS,['φ119右轴承盖，轴向深26，四孔法兰与中心台阶分开表达'],U,'metal',flangeCover({outer:119,depth:26,bore:40,boltRadius:45,material:'metal'})),
  'jwf1206-p58-item-009':part=>dim(part,FS,['右轴承套按φ120×77剖视及右端法兰孔系建立'],UA,'metal',bearingSleeve(1)),
  'jwf1206-p58-item-010':part=>dim(part,FS,['左轴承套为右轴承套的轴向镜像，法兰在反向'],UA,'metal',bearingSleeve(-1)),
  'jwf1206-p58-item-011':part=>dim(part,FS,['φ119左轴承盖，轴向深29'],U,'metal',flangeCover({outer:119,depth:29,bore:40,boltRadius:45,material:'metal'})),
  'jwf1206-p58-item-012':part=>dim(part,AX,['φ70×45轴套按剖视建立中心通孔和外圆台阶'],UA,'metal',[lathe([[20,-22.5],[35,-22.5],[35,-13],[30,-13],[30,13],[35,13],[35,22.5],[20,22.5],[20,-22.5]],'metal')]),
  'jwf1206-p58-item-013':part=>dim(part,FS,['上剖视和下端视联合确定20方形外廓、16轴向宽、10高及中心孔'],['中心孔径按比例取φ10'],'metal',[extrude(rect(20,20),16,{holes:[hole(0,0,5)],material:'metal'})]),

  // 第59页：与第三刺辊配套的独立垫片/密封圈。
  'jwf1206-p59-item-001':part=>dim(part,AX,['φ50/φ40×0.1调整垫片'],U,'metal',shim(50,40,.1)),
  'jwf1206-p59-item-002':part=>dim(part,AX,['φ90/φ82×0.1调整垫片'],U,'metal',shim(90,82,.1)),
  'jwf1206-p59-item-003':part=>dim(part,AX,['φ90/φ82×0.2调整垫片'],U,'metal',shim(90,82,.2)),
  'jwf1206-p59-item-004':part=>dim(part,AX,['φ90/φ82×0.3调整垫片'],U,'metal',shim(90,82,.3)),
  'jwf1206-p59-item-005':part=>dim(part,AX,['40×2.8橡胶密封圈，轴向图示厚1.6；不套用金属垫圈材质'],['名称规格与图示厚度均保留'],'rubber',flatSeal(40,2.8,1.6)),
  'jwf1206-p59-item-006':part=>dim(part,AX,['50×3.1橡胶密封圈，轴向图示厚1.6'],['橡胶硬度未标'],'rubber',flatSeal(50,3.1,1.6)),
};

const capsule=(width,height)=>roundedRectPoints(width,height,height/2,8);
const pointer=(length,width)=>extrude([
  [-width/2,-length/2],[width/2,-length/2],[width/2,length*.18],[width*.18,length*.34],[0,length/2],[-width*.18,length*.34],[-width/2,length*.18],
],4,{holes:[hole(0,-length*.2,width*.24),slot(0,length*.06,width*.42,width*.18)],material:'paintedMetal'});
const scalePlate=(width,height)=>[
  plate(width,height,2,{material:'paintedMetal'}),
  ...Array.from({length:7},(_,index)=>box([.7,height*.38-(index%2)*3,.7],'darkMetal',[-width*.32+index*width*.105,-height*.08,1.2],[0,0,-.14+index*.045])),
];
const longKnife=(length,height)=>[
  box([length,height,6],'paintedMetal'),box([length,7,12],'metal',[0,-height/2+3,0]),
  ...Array.from({length:6},(_,index)=>cylinder(3,10,'z','darkMetal',[-length*.42+index*length*.168,height*.28,0])),
];
const roofPlate=(length,height,mirror=1)=>[
  box([length,3,height*.72],'paintedMetal',[0,-height*.18,height*.19],[mirror*.58,0,0]),
  box([length,3,height*.72],'paintedMetal',[0,height*.18,height*.19],[-mirror*.58,0,0]),
  box([length,12,10],'darkMetal',[0,0,height*.48]),
];

Object.assign(builders,{
  // 第60页：第一、第三刺辊上部弧罩与除尘组件。
  'jwf1206-p60-item-001':part=>dim(part,FS,['按92高、20宽的主视指针轮廓、圆轴孔和下部长圆孔建立；侧视确定薄板和轴套'],U,'paintedMetal',[pointer(92,20),cylinder(7,12,'z','darkMetal',[0,-18,0])]),
  'jwf1206-p60-item-002':part=>dim(part,SE,['正视确定1052长主体、两端耳板和三道横向工作条；下方剖面用于判断组合型材层次'],UH,'paintedMetal',[
    box([1052,74,12],'paintedMetal'),box([1008,8,28],'metal',[0,-22,-9]),box([1008,8,28],'metal',[0,0,-9]),box([1008,8,28],'metal',[0,22,-9]),
    plate(32,96,16,{holes:[hole(0,-28,4),hole(0,28,4)],material:'darkMetal',position:[-526,0,0]}),
    plate(32,96,16,{holes:[hole(0,-28,4),hole(0,28,4)],material:'darkMetal',position:[526,0,0]}),
  ]),
  'jwf1206-p60-item-003':part=>dim(part,SE,['1052为弧罩轴向长度，R88.5由下方截面弧线确定；两端长圆孔不作凸起'],['弧段张角和板厚未标，按截面比例取1.1rad和3'], 'paintedMetal',arcShell(1052,88.5,1.1,3,14)),
  'jwf1206-p60-item-004':part=>dim(part,FS,['上视确定φ70长管段及1108总长，端视确定左端异形安装板和右端法兰'],UH,'paintedMetal',[
    annulus(70,64,1108,{material:'paintedMetal'}),annulus(88,64,10,{material:'metal',position:[549,0,0]}),
    extrude([[-34,-46],[18,-46],[34,-24],[34,20],[19,38],[-18,38],[-34,18]],8,{holes:[hole(0,8,35),hole(-19,-33,3)],material:'paintedMetal',rotation:[0,PI/2,0],position:[-550,0,0]}),
  ]),
  'jwf1206-p60-item-005':part=>dim(part,SE,['1052长除尘刀由长条底板、刀口、6个紧固点及R88.5安装弧面组成'],UH,'paintedMetal',longKnife(1052,92)),
  'jwf1206-p60-item-006':part=>dim(part,SE,['1052长密封罩按下方R91.5截面建立弧面，底部黑色截面是橡胶密封条'],['弧段张角和板厚未标'],'paintedMetal',[
    ...arcShell(1052,91.5,.95,3,14),box([1052,7,8],'rubber',[0,-39,-83]),box([1052,10,10],'metal',[0,39,-83]),
  ]),
  'jwf1206-p60-item-007':part=>dim(part,AX,['φ12×72轴按主视两端台阶建立'],UA,'metal',[cylinder(6,58,'x','metal'),cylinder(5,14,'x','darkMetal',[-36,0,0]),cylinder(4.5,14,'x','darkMetal',[36,0,0])]),
  'jwf1206-p60-item-008':part=>dim(part,SE,['1052长第一刺辊罩板，下方截面R88.5；正视两侧三个长孔属开孔不是加强筋'],['弧段张角和板厚未标'],'paintedMetal',arcShell(1052,88.5,1.26,3,16)),
  'jwf1206-p60-item-009':part=>dim(part,SE,['1052长第三刺辊罩板，下方截面R127.5；曲率与第一刺辊罩板不同'],['弧段张角和板厚未标'],'paintedMetal',arcShell(1052,127.5,1.05,3,16)),
  'jwf1206-p60-item-010':part=>dim(part,AX,['调节轴按φ10×90主杆及两端方头/细轴台阶建立'],UA,'metal',[cylinder(5,64,'x','metal'),cylinder(4,14,'x','darkMetal',[-39,0,0]),cylinder(4,14,'x','darkMetal',[39,0,0]),box([8,8,10],'metal',[-44,0,0]),box([8,8,10],'metal',[44,0,0])]),
  'jwf1206-p60-item-011':part=>dim(part,AX,['压缩弹簧按自由长20.25、外径φ16、内径φ10建立线径3和5圈'],['有效圈数按原格读取为5'],'darkMetal',[spring(20.25,16,3,5)]),
  'jwf1206-p60-item-012':part=>dim(part,FS,['密封垫为40×22圆角长片，左侧有一个圆孔；按柔性垫件而非金属板建立'],['厚度和孔径未标，按原格取3和φ11'],'rubber',[extrude(capsule(40,22),3,{holes:[hole(-9,0,5.5)],material:'rubber'})]),
  'jwf1206-p60-item-013':part=>dim(part,SE,['1030为密封条长度；下方截面显示两片唇边构成V形，不建成实心金属条'],['截面宽高未标，按原格比例取16×12'],'rubber',[box([1030,3,14],'rubber',[0,-4,0],[.42,0,0]),box([1030,3,14],'rubber',[0,4,0],[-.42,0,0])]),
  'jwf1206-p60-item-014':part=>dim(part,ONE,['刻度牌按30×20面板和0°—12°刻线建立，刻线是表面标识不是槽钢'],['厚度未标，视觉取2'],'paintedMetal',scalePlate(30,20)),

  // 第61页：刺辊下吸口、弧板和左右机架。
  'jwf1206-p61-item-001':part=>dim(part,FS,['60高、21宽指针的尖头、上轴孔和中部长圆孔按主视建立'],U,'paintedMetal',[pointer(60,21),cylinder(7,12,'z','darkMetal',[0,-12,0])]),
  'jwf1206-p61-item-002':part=>dim(part,FS,['上视将吸口分为1076长主管和185端部接口，右端φ72；端视为带四孔的异形法兰'],UH,'paintedMetal',[
    annulus(72,66,1261,{material:'paintedMetal'}),annulus(92,66,10,{material:'metal',position:[-625,0,0]}),
    extrude(roundedRectPoints(116,112,18),10,{holes:[hole(0,0,36),hole(-45,-42,4),hole(45,-42,4),hole(-45,42,4),hole(45,42,4)],material:'paintedMetal',rotation:[0,PI/2,0],position:[630,0,0]}),
  ]),
  'jwf1206-p61-item-003':part=>dim(part,SE,['1052长预分梳板由上下两道齿板、中间紧固点、端板和下方组合截面共同定形'],UH,'paintedMetal',[
    box([1052,84,12],'paintedMetal'),box([1000,20,22],'darkMetal',[0,-22,-12]),box([1000,20,22],'darkMetal',[0,22,-12]),
    box([14,112,34],'metal',[-526,0,0]),box([14,112,34],'metal',[526,0,0]),
    ...Array.from({length:5},(_,index)=>cylinder(4,18,'z','metal',[-400+index*200,0,0])),
  ]),
  'jwf1206-p61-item-004':part=>outline(part,SE,['1052长弧板结合件的下方端视显示两侧弧片在中心高点交汇，不是平板'],['厂家未标弧半径、高度和板厚，仅按端视比例表达'],'paintedMetal',roofPlate(1052,140,1)),
  'jwf1206-p61-item-005':part=>outline(part,SE,['第二件弧板同为双侧弧片中心交汇，但端部安装耳方向与前件相反'],['曲率与板厚未标，保持轮廓级'],'paintedMetal',roofPlate(1052,140,-1)),
  'jwf1206-p61-item-006':part=>dim(part,FS,['1052长除尘刀主视明确长条刀板、5个中间紧固点和两端封板；侧视确定折弯支架'],UH,'paintedMetal',longKnife(1052,96)),
  'jwf1206-p61-item-007':part=>dim(part,FS,['1048长刺辊下吸口主视为两端法兰、上下横档和中间分隔；端视显示带圆口的异形侧板'],UH,'paintedMetal',[
    box([1048,12,12],'metal',[0,-62,0]),box([1048,12,12],'metal',[0,62,0]),box([1048,8,8],'paintedMetal',[0,0,0]),
    box([14,140,72],'darkMetal',[-524,0,0]),box([14,140,72],'darkMetal',[524,0,0]),box([12,140,60],'paintedMetal',[0,0,0]),
    extrude([[-48,-64],[42,-64],[55,-20],[38,60],[-15,66],[-52,20]],10,{holes:[hole(0,-10,34),hole(-25,36,4)],material:'paintedMetal',rotation:[0,PI/2,0],position:[-520,0,0]}),
  ]),
  'jwf1206-p61-item-008':part=>dim(part,AX,['圆吸口按φ70薄壁圆管、180总长和两端法兰建立'],['壁厚和法兰外径未标，按原格比例取3和φ86'],'paintedMetal',[annulus(70,64,180,{material:'paintedMetal'}),annulus(86,64,9,{material:'metal',position:[-85.5,0,0]}),annulus(86,64,9,{material:'metal',position:[85.5,0,0]})]),
  'jwf1206-p61-item-009':part=>dim(part,FS,['扁吸口按154×88圆角矩形截面和208长建立薄壁风道，两端法兰保留'],['壁厚取5，圆角半径按原格估算'],'paintedMetal',[
    ...rectangularDuct(208,154,88,5),
    extrude(roundedRectPoints(170,104,22),8,{holes:[{kind:'polygon',points:roundedRectPoints(142,76,19)}],material:'metal',rotation:[0,PI/2,0],position:[-100,0,0]}),
    extrude(roundedRectPoints(170,104,22),8,{holes:[{kind:'polygon',points:roundedRectPoints(142,76,19)}],material:'metal',rotation:[0,PI/2,0],position:[100,0,0]}),
  ]),
  'jwf1206-p61-item-010':part=>dim(part,FS,['长吸口按154×88圆角矩形截面和1048总长建立；不将端视图误作单独零件'],['壁厚取5，圆角半径估算'],'paintedMetal',[
    ...rectangularDuct(1048,154,88,5),
    extrude(roundedRectPoints(170,104,22),8,{holes:[{kind:'polygon',points:roundedRectPoints(142,76,19)}],material:'metal',rotation:[0,PI/2,0],position:[-520,0,0]}),
    extrude(roundedRectPoints(170,104,22),8,{holes:[{kind:'polygon',points:roundedRectPoints(142,76,19)}],material:'metal',rotation:[0,PI/2,0],position:[520,0,0]}),
  ]),
  'jwf1206-p61-item-011':part=>dim(part,AX,['43总长内φ18主轴与φ12右端轴心偏移；按同一主视中的平行中心线建立偏心'],['偏心距、左端螺纹和中间法兰厚度未标，按原格比例取3、6和5'],'metal',[cylinder(9,23,'x','metal',[-5,0,0]),cylinder(6,15,'x','metal',[14,-3,0]),cylinder(15,5,'x','darkMetal',[-17,0,0]),cylinder(7,8,'x','darkMetal',[-25,0,0])]),
  'jwf1206-p61-item-012':part=>dim(part,ONE,['835×185左机架是长形箱板，原格可见多个圆孔、长圆检修口和立向分隔筋；左右件开孔布局不相同'],['板厚、各孔精确尺寸和孔距未标'],'paintedMetal',[
    extrude(rect(835,185),16,{holes:[hole(-330,15,28),slot(-205,0,92,48),hole(-60,0,30),slot(90,0,100,54),hole(270,0,34),slot(365,0,45,70)],material:'paintedMetal'}),
    box([12,185,24],'darkMetal',[-270,0,0]),box([12,185,24],'darkMetal',[10,0,0]),box([12,185,24],'darkMetal',[205,0,0]),
  ]),
  'jwf1206-p61-item-013':part=>dim(part,ONE,['835×185右机架同样为多开孔长箱板，按右件原格重排圆孔、长圆口和分隔筋'],['板厚和孔距未标'],'paintedMetal',[
    extrude(rect(835,185),16,{holes:[hole(-340,0,30),slot(-205,0,85,46),hole(-55,0,34),slot(105,0,98,52),hole(250,5,27),slot(358,0,52,72)],material:'paintedMetal'}),
    box([12,185,24],'darkMetal',[-270,0,0]),box([12,185,24],'darkMetal',[-5,0,0]),box([12,185,24],'darkMetal',[200,0,0]),
  ]),
});

const motorPlate=()=>[
  extrude(rect(380,260),10,{holes:[hole(0,0,58),slot(-165,-82,14,54),slot(-165,82,14,54),slot(165,-82,14,54),slot(165,82,14,54),hole(-74,-74,4),hole(74,-74,4),hole(-74,74,4),hole(74,74,4)],material:'paintedMetal'}),
  box([380,12,18],'darkMetal',[0,-124,0]),box([380,12,18],'darkMetal',[0,124,0]),
];
const trademarkSeat=()=>extrude([[-16,-37.5],[16,-37.5],[16,12],[11,18],[11,31],[6,37.5],[-6,37.5],[-11,31],[-11,18],[-16,12]],5,{holes:[hole(-9,-28,3),hole(9,-28,3),hole(0,29,3)],material:'paintedMetal'});
const motorPulley=(outer,bore=32,grooves=1)=>solidPulley({outer,width:45,bore,hub:Math.max(56,outer*.48),grooves,material:'darkMetal'});
const upright=(mirror=1)=>{
  const baseSlot=roundedRectPoints(40,44,8).map(([x,y])=>[x-mirror*147,y]);
  return[
    box([506,28,170],'paintedMetal',[0,248.5,0]),
    extrude(rect(506,170),28,{holes:[hole(mirror*230,-55,7.5),hole(mirror*230,55,7.5),hole(-mirror*225,0,7.5),{kind:'polygon',points:baseSlot}],material:'paintedMetal',position:[0,-248.5,0],rotation:[PI/2,0,0]}),
    extrude(rect(28,469),170,{holes:[hole(0,-140,6)],material:'paintedMetal',position:[mirror*239,0,0]}),
    box([28,469,170],'paintedMetal',[-mirror*239,0,0]),
    extrude(rect(410,385),10,{holes:[hole(-mirror*50,0,62)],material:'paintedMetal',position:[0,0,-80]}),
  ];
};
const bendEarOutline=(mirror=1)=>[
  [0,-12.5],[18,-12.5],[28,-9],[42,1],[50,8],[48,16],[42,22],[34,23],[27,20],[18,12.5],[0,12.5],
].map(([x,y])=>[x*mirror,y]);
const bendPlate=(mirror=1)=>[
  extrude(roundedRectPoints(60,25,8),4,{holes:[slot(0,0,38,7)],material:'metal',position:[-mirror*20,0,-4]}),
  extrude(bendEarOutline(mirror),4,{holes:[hole(mirror*35,8,5)],material:'metal',position:[0,0,4]}),
  box([15,25,4],'metal',[mirror*2.5,0,0],[0,-mirror*.49,0]),
];
const corrugatedHose=(length)=>{
  const turns=11,count=turns*24,points=Array.from({length:count+1},(_,index)=>{
    const t=index/count,angle=t*turns*PI*2;
    return[t*length-length/2,Math.cos(angle)*50,Math.sin(angle)*50];
  });
  return[annulus(100,90,length,{material:'rubber'}),tube(points,2.8,{material:'darkMetal',radialSegments:10})];
};

Object.assign(builders,{
  // 第62页：标牌、刻度牌和轴杆件。
  'jwf1206-p62-item-001':part=>dim(part,FS,['标牌座按75×32×5薄板外廓建立上部收窄挂耳和三个安装孔'],U,'paintedMetal',[trademarkSeat()]),
  'jwf1206-p62-item-002':part=>dim(part,ONE,['刻度牌按22×20矩形面板和0°—12°刻线建立'],['厚度未标，视觉取2'],'paintedMetal',scalePlate(22,20)),
  'jwf1206-p62-item-003':part=>dim(part,AX,['撑挡按φ20×1082长杆建立；两端在原格为螺纹/扁头结构，不是等径装饰环'],['两端螺纹长度和扁头尺寸未标'],'metal',[cylinder(10,1000,'x','metal'),cylinder(9,82,'x','darkMetal',[-541,0,0]),cylinder(9,82,'x','darkMetal',[541,0,0]),box([70,12,12],'metal',[-510,0,0]),box([70,12,12],'metal',[510,0,0])]),
  'jwf1206-p62-item-004':part=>dim(part,AX,['M12×1×80调节螺柱按总长、螺纹大径和两端螺纹段建立'],['螺纹牙形简化'],'metal',[cylinder(6,80,'x','metal'),cylinder(6.35,12,'x','darkMetal',[-34,0,0]),cylinder(6.35,12,'x','darkMetal',[34,0,0])]),
  'jwf1206-p62-item-005':part=>dim(part,AX,['φ12×72轴保留左端台阶和右端细轴段'],UA,'metal',[cylinder(6,58,'x','metal'),cylinder(5,14,'x','darkMetal',[-36,0,0]),cylinder(4.5,14,'x','darkMetal',[36,0,0])]),

  // 第63页：电机安装板和七种独立带轮规格。
  'jwf1206-p63-item-001':part=>dim(part,ONE,['380×260电机安装板按中心大圆孔、四角竖向长圆槽、四个电机孔及上下折边建立'],['板厚和各孔尺寸未标，按原格比例表达'],'paintedMetal',motorPlate()),
  'jwf1206-p63-item-002':part=>dim(part,AX,['φ70×45轴套由纵向剖视定义中心通孔和外圆台阶，端视四处小缺口仅作装配语义'],UA,'metal',[lathe([[18,-22.5],[35,-22.5],[35,-13],[31,-13],[31,13],[35,13],[35,22.5],[18,22.5],[18,-22.5]],'metal')]),
  'jwf1206-p63-item-003':part=>dim(part,AX,['φ85×45刺辊电机带轮；侧剖显示双轮缘槽，端视中心孔含键槽'],UA,'darkMetal',motorPulley(85,28,2)),
  'jwf1206-p63-item-004':part=>dim(part,AX,['φ94×45刺辊电机带轮；与φ85件直径不同，单独保留台阶轮缘'],UA,'darkMetal',motorPulley(94,28,1)),
  'jwf1206-p63-item-005':part=>dim(part,AX,['φ112×45带轮按剖视的深轮缘、中心轮毂和键槽孔建立'],UA,'darkMetal',motorPulley(112,32,1)),
  'jwf1206-p63-item-006':part=>dim(part,AX,['φ122×45带轮独立按该格外径建立，不缩放复用φ112图片'],UA,'darkMetal',motorPulley(122,32,1)),
  'jwf1206-p63-item-007':part=>dim(part,AX,['φ145×45带轮按轮缘、轮毂、中心键槽孔建立'],UA,'darkMetal',motorPulley(145,34,1)),
  'jwf1206-p63-item-008':part=>dim(part,AX,['φ155×45带轮按本格剖视轮缘深度和轮毂比例独立建立'],UA,'darkMetal',motorPulley(155,34,1)),
  'jwf1206-p63-item-009':part=>dim(part,AX,['φ170×45带轮为本页最大规格，轮缘与中心轮毂保持原格比例'],UA,'darkMetal',motorPulley(170,36,1)),

  // 第64页：喂棉扁管、立柱、软管与折弯板。
  'jwf1206-p64-item-001':part=>outline(part,['厂家正面视图','厂家斜置侧视（方向待核）'],['识图闸门阻断：两个视图的正式投影方向、内部风道、观察窗层次及侧向连杆前后连接不能唯一闭合；现存几何仅为旧展示占位，不纳入第64页验收。'],['壳体深度和内部风道截面','观察窗厚度','连杆前后位置及连接尺寸'],'paintedMetal',[
    extrude([[-515,-120],[515,-120],[455,120],[-455,120]],290,{holes:[{kind:'polygon',points:roundedRectPoints(690,120,55)}],material:'paintedMetal'}),
    extrude(roundedRectPoints(710,140,62),8,{holes:[{kind:'polygon',points:roundedRectPoints(660,94,42)}],material:'metal',position:[0,0,149]}),
    extrude(roundedRectPoints(650,88,38),4,{material:'glass',position:[0,0,153]}),
    box([925,24,34],'darkMetal',[0,-128,0]),
  ]),
  'jwf1206-p64-item-002':part=>dim(part,['主视图','俯视图'],['左立柱按525×506正视框架与170深底座俯视联合建立；中板偏右大圆孔、左竖梁小孔、底座左端双孔、右端单孔和偏右圆角矩形孔均为真实孔槽。'],['梁宽、板厚、孔槽尺寸和孔距未标，按原格比例估算'],'paintedMetal',upright(-1)),
  'jwf1206-p64-item-003':part=>dim(part,['主视图','俯视图'],['右立柱与左件外包络相同，但中板偏左大圆孔、右竖梁小孔、底座右端双孔、左端单孔和偏左圆角矩形孔逐图对向重建，不只复制同一孔位。'],['梁宽、板厚、孔槽尺寸和孔距未标'],'paintedMetal',upright(1)),
  'jwf1206-p64-item-004':part=>dim(part,AX,['管接头按φ98×100纵向剖视建立薄壁锥形套筒、左端轮缘和中部小台阶'],['右端内径和锥度未标，按剖视比例估算'],'metal',[lathe([[43,-50],[49,-50],[49,-42],[47,-42],[44,50],[39,50],[40,-42],[43,-42],[43,-50]],'metal')]),
  'jwf1206-p64-item-005':part=>dim(part,['侧视图','主视图'],['100×25×4右弯板拆为左端圆耳段、右侧长圆槽臂和中间斜向错层连接；侧视折弯高度与主视孔槽由同一模型表达。'],['圆孔、长槽、错层高度和斜段长度按原格比例估算'],'metal',bendPlate(-1)),
  'jwf1206-p64-item-006':part=>dim(part,['轴向主视图'],['φ100×1350吸尘软管重建为中空橡胶管和一条连续螺旋加强筋；纠正旧模型用28道互不相连圆环冒充螺旋。'],['内径、壁厚、加强筋直径和螺距未标，按原格比例估算'],'rubber',corrugatedHose(1350)),
  'jwf1206-p64-item-007':part=>dim(part,['轴向主视图'],['φ100×1650软管独立按该长度建立，同样使用单条连续螺旋加强筋，不与1350件混用。'],['内径、壁厚、加强筋直径和螺距未标'],'rubber',corrugatedHose(1650)),
  'jwf1206-p64-item-008':part=>dim(part,['侧视图','主视图'],['100×25×4左弯板的右端圆耳、左侧长圆槽臂及错层折弯方向逐视图与右件对向建立。'],['圆孔、长槽、错层高度和斜段长度按原格比例估算'],'metal',bendPlate(1)),
});

export function buildJwf1206P56P64Page(rows,page){
  const pageBuilders=Object.fromEntries(Object.entries(builders).filter(([key])=>key.startsWith(`jwf1206-p${page}-`)));
  return buildExplicitPage(rows,pageBuilders,page);
}

export default buildJwf1206P56P64Page;
