// JWF1206 第30—37页逐格重建：每个recordKey均来自厂家单格视图，不做名称/类型回退猜形。
const PI=Math.PI;
const rect=(w,h)=>[[-w/2,-h/2],[w/2,-h/2],[w/2,h/2],[-w/2,h/2]];
const hole=(x,y,r)=>({kind:'circle',center:[x,y],radius:r});
const box=(size,material='paintedMetal',position=[0,0,0],rotation=[0,0,0])=>({type:'box',size,material,position,rotation});
const cyl=(radius,length,axis='x',material='metal',position=[0,0,0],radialSegments=64)=>({type:'cylinder',radius,length,axis,material,position,radialSegments});
const ext=(points,depth,holes=[],material='paintedMetal',rotation=[0,0,0],position=[0,0,0])=>({type:'extrude',points,depth,holes,material,rotation,position,bevel:0});
const lathe=(points,material='metal',position=[0,0,0],rotation=[0,0,PI/2])=>({type:'lathe',points,material,position,rotation});
const ann=(outer,inner,width,material='metal',position=[0,0,0])=>lathe([[inner/2,-width/2],[outer/2,-width/2],[outer/2,width/2],[inner/2,width/2],[inner/2,-width/2]],material,position);
const S=(views,assumptions,material,primitives)=>({views,assumptions,material,primitives});
const V={
  axial:['厂家纵向主视/轴向剖视联合定形；中心线、尺寸线、剖面线均已排除'],
  frontSide:['厂家主视图与侧视/俯视图联合定形；相邻小图用于深度和折弯方向'],
  main:['厂家单一主视轮廓；标注线、中心线和引出线不作为实体'],
  section:['厂家截面图决定截面，沿明确长度方向拉伸'],
};
const A={exact:'厂家明示尺寸用于主轮廓；未标孔径、板厚、齿形和倒角只作视觉估算，不可用于加工。',depth:'厂家未标深度/板厚，按侧视比例作轮廓级视觉估算并在模型信息中保留说明。'};
const pulley=(d,w,bore,material='darkMetal')=>[lathe([[bore/2,-w/2],[d*.44,-w/2],[d/2,-w*.38],[d/2,w*.38],[d*.44,w/2],[bore/2,w/2],[bore/2,-w/2]],material),ann(d*1.03,d*.92,2,'metal',[-w*.42,0,0]),ann(d*1.03,d*.92,2,'metal',[w*.42,0,0])];
const shaft=(segments)=>segments.map(([d,l,x,m='metal'])=>cyl(d/2,l,'x',m,[x,0,0]));
const D={
  // 第30页
  'jwf1206-p30-item-001':S(V.frontSide,[A.exact,'主板156×93，侧视显示弯曲加强边及左侧三只凸台。'],'paintedMetal',[ext([[-46.5,-78],[30,-76],[46.5,-42],[39,60],[10,78],[-43,70]],8,[hole(-22,-40,10),hole(30,-55,7),hole(27,52,12)],'paintedMetal'),cyl(9,18,'z','metal',[-31,-18,-8]),cyl(9,18,'z','metal',[-31,10,-8]),cyl(7,16,'z','darkMetal',[24,55,-7])]),
  'jwf1206-p30-item-002':S(V.frontSide,[A.exact,'箱体由主视314×228与侧视深146联合定形，保留前端轴孔、上部安装耳和内部双圆腔。'],'paintedMetal',[box([314,228,146]),ext(rect(240,165),12,[hole(-63,20,38),hole(65,-18,48)],'darkMetal',[0,0,0],[5,0,80]),cyl(30,165,'z','metal',[-125,12,0]),box([65,28,165],'metal',[-75,112,0])]),
  'jwf1206-p30-item-003':S(V.axial,[A.exact,'φ55×30的18齿同步带轮，剖视为直孔与双挡边。'],'darkMetal',pulley(55,30,22)),
  'jwf1206-p30-item-004':S(V.axial,[A.exact,'φ79×25的18齿同步带轮，端视两安装孔不当作中心孔。'],'darkMetal',[...pulley(79,25,30),cyl(3,28,'x','metal',[0,24,0]),cyl(3,28,'x','metal',[0,-24,0])]),
  'jwf1206-p30-item-005':S(V.frontSide,[A.exact,'135×130电机板带中心大孔、四角长圆孔；侧视显示87深折弯支架。'],'paintedMetal',[ext(rect(135,130),7,[hole(0,0,28),hole(-49,-48,5),hole(49,-48,5),hole(-49,48,5),hole(49,48,5)],'paintedMetal'),box([135,12,87],'metal',[0,-59,-40]),box([12,55,87],'metal',[56,-30,-40])]),
  'jwf1206-p30-item-006':S(V.axial,[A.exact,'蜗轮轴为φ55×165中空阶梯筒，中央有外凸环、两端有短台阶。'],'metal',[lathe([[14,-82.5],[24,-82.5],[24,-50],[27.5,-50],[27.5,-12],[33,-12],[33,12],[27.5,12],[27.5,50],[24,50],[24,80],[14,82.5],[14,-82.5]])]),
  'jwf1206-p30-item-007':S(V.axial,[A.exact,'总长275的多阶齿轮轴；原格只给总长，各段径按轮廓比例。'],'metal',shaft([[12,55,-110],[20,50,-58],[32,70,0],[20,75,60],[14,35,115],[8,15,137]])),
  'jwf1206-p30-item-008':S(V.axial,[A.exact,'φ28×6定位套为薄壁短套，剖视中心通孔。'],'metal',[ann(28,18,6)]),
  'jwf1206-p30-item-009':S(V.axial,[A.exact,'φ80×5平端盖，端视明确8-φ7均布孔。'],'metal',[ext(Array.from({length:64},(_,i)=>[40*Math.cos(i*2*PI/64),40*Math.sin(i*2*PI/64)]),5,Array.from({length:8},(_,i)=>hole(29*Math.cos(i*PI/4),29*Math.sin(i*PI/4),3.5)),'metal')]),
  'jwf1206-p30-item-010':S(V.axial,[A.exact,'φ80×13台阶端盖，端视8-φ7均布孔并有中心通孔。'],'metal',[ann(80,42,13),...Array.from({length:8},(_,i)=>cyl(3.5,15,'x','darkMetal',[0,29*Math.cos(i*PI/4),29*Math.sin(i*PI/4)]))]),
  'jwf1206-p30-item-011':S(V.axial,[A.exact,'φ55.22×30的14齿同步带轮，原剖视为直孔和双挡边。'],'darkMetal',pulley(55.22,30,22)),
  'jwf1206-p30-item-012':S(V.axial,[A.exact,'过渡轮φ45×30，剖视为一侧厚轮缘和直孔。'],'metal',[lathe([[10,-15],[22.5,-15],[22.5,15],[18,15],[18,2],[10,2],[10,-15]])]),
  'jwf1206-p30-item-013':S(V.axial,[A.exact,'φ32×1.5薄挡圈，原图为平环。'],'metal',[ann(32,24,1.5)]),
  'jwf1206-p30-item-014':S(V.axial,[A.exact,'φ30×0.2极薄挡圈，保持平环而不是厚套。'],'metal',[ann(30,24,0.2)]),
  'jwf1206-p30-item-015':S(V.axial,[A.exact,'φ32×11定位套为等壁短套。'],'metal',[ann(32,20,11)]),

  // 第31页
  'jwf1206-p31-item-001':S(V.axial,[A.exact,'30齿锥齿轮总长44、轮毂φ40；锥齿段位于左端。'],'darkMetal',[lathe([[11,-22],[27,-22],[22,-9],[20,-2],[20,22],[11,22],[11,-22]],'darkMetal')]),
  'jwf1206-p31-item-002':S(V.axial,[A.exact,'左蜗杆为φ56×40中空筒，外圆单头蜗纹以螺旋视觉环表达。'],'metal',[ann(56,35,40),...Array.from({length:6},(_,i)=>ann(58,54,2,'darkMetal',[-15+i*6,0,0]))]),
  'jwf1206-p31-item-003':S(V.axial,[A.exact,'隔套φ35×18，中心通孔按剖视比例。'],'metal',[ann(35,22,18)]),
  'jwf1206-p31-item-004':S(V.axial,[A.exact,'轴套φ30×17，中心通孔按剖视比例。'],'metal',[ann(30,20,17)]),
  'jwf1206-p31-item-005':S(V.axial,[A.exact,'挡套φ42×3为薄环，一侧有浅斜面。'],'metal',[ann(42,34,3)]),
  'jwf1206-p31-item-006':S(V.axial,[A.exact,'小调整片φ52×0.3为极薄金属环。'],'metal',[ann(52,40,0.3)]),
  'jwf1206-p31-item-007':S(V.axial,[A.exact,'锥轮轴总长157、主体φ30，端部为多级细轴。'],'metal',shaft([[10,24,-66],[18,30,-43],[30,74,0],[22,32,48],[12,20,70]])),
  'jwf1206-p31-item-008':S(V.axial,[A.exact,'垫片外φ47、内φ37、厚0.1。'],'metal',[ann(47,37,0.1)]),

  // 第32页
  'jwf1206-p32-item-001':S(V.frontSide,[A.exact,'除尘板主体长1087，主视为三道纵向折筋，左端有异形安装耳。'],'paintedMetal',[box([1087,80,3]),box([1087,7,14],'metal',[0,-30,-6]),box([1087,7,14],'metal',[0,0,-6]),box([1087,7,14],'metal',[0,30,-6]),ext([[-35,-40],[25,-40],[35,-22],[20,40],[-20,40],[-35,18]],8,[hole(-10,-18,5),hole(8,4,5)],'metal',[0,PI/2,0],[-540,0,0])]),
  'jwf1206-p32-item-002':S(V.axial,[A.exact,'大毛刷总长1230、刷体φ145.5；长圆柱刷体、两端毂和细轴必须分段。'],'rubber',[cyl(72.75,900,'x','rubber'),cyl(55,100,'x','darkMetal',[-500,0,0]),cyl(55,100,'x','darkMetal',[500,0,0]),cyl(18,1230,'x','metal')]),
  'jwf1206-p32-item-003':S(V.axial,[A.exact,'清洁辊总长1230、工作段φ109，两端阶梯轴对称。'],'darkMetal',[cyl(54.5,900,'x','darkMetal'),cyl(42,110,'x','metal',[-500,0,0]),cyl(42,110,'x','metal',[500,0,0]),cyl(15,1230,'x','metal')]),
  'jwf1206-p32-item-004':S(V.frontSide,[A.exact,'吸罩主体长1098；端视是约150.5高的多折边罩壳并有底部半圆缺口。'],'paintedMetal',[ext([[-72,-55],[-55,-75],[35,-75],[72,-35],[72,48],[55,70],[-45,70],[-72,48],[-72,8],[-58,0],[-72,-8]],1098,[],'paintedMetal',[0,PI/2,0]),box([1098,10,12],'metal',[0,68,0])]),
  'jwf1206-p32-item-005':S(V.axial,[A.exact,'同步带轮φ68×25、内孔φ25，剖视双挡边。'],'darkMetal',pulley(68,25,25)),
  'jwf1206-p32-item-006':S(V.frontSide,[A.exact,'套杆总长140，一端M12，杆体中段有S形偏置，末端为圆环耳。'],'metal',[cyl(6,48,'y','metal',[0,46,0]),cyl(6,36,'y','metal',[-18,-30,0]),box([6,44,6],'metal',[-10,7,0],[0,0,-0.42]),ann(24,12,8,'metal',[-18,-62,0])]),
  'jwf1206-p32-item-007':S(V.axial,[A.exact,'上吸罩主体长1092、总长1248.5，右端为φ100管口和法兰，左端截角。'],'paintedMetal',[box([1092,100,95]),box([35,100,95],'paintedMetal',[-546,0,0],[0,0,-0.35]),cyl(50,120,'x','metal',[606,0,0]),ann(120,100,10,'metal',[550,0,0])]),
  'jwf1206-p32-item-008':S(V.main,[A.exact,'电机板208×200为不规则六边板，中央大圆孔、下部长圆孔和周边安装孔。'],'paintedMetal',[ext([[-104,-100],[58,-100],[104,-55],[104,70],[76,100],[-55,100],[-104,32]],7,[hole(5,25,46),hole(-70,-65,6),hole(62,-62,6),hole(70,70,5),hole(-60,65,5)],'paintedMetal')]),
  'jwf1206-p32-item-009':S(V.frontSide,[A.exact,'右调节座259×164.5×75；主视双半圆承座、斜撑和右下安装座，俯视宽70。'],'paintedMetal',[ext([[-129,45],[-82,45],[-65,16],[-25,16],[-10,45],[30,45],[45,16],[82,16],[96,45],[129,45],[112,-5],[68,-12],[40,-60],[-20,-82],[-55,-55],[-98,-42]],70,[hole(74,-42,7),hole(-44,-56,7)],'paintedMetal'),cyl(24,76,'z','darkMetal',[-50,22,0]),cyl(24,76,'z','darkMetal',[55,22,0])]),
  'jwf1206-p32-item-010':S(V.frontSide,[A.exact,'左调节座为右件镜像，双半圆承座和下部安装耳方向相反。'],'paintedMetal',[ext([[129,45],[82,45],[65,16],[25,16],[10,45],[-30,45],[-45,16],[-82,16],[-96,45],[-129,45],[-112,-5],[-68,-12],[-40,-60],[20,-82],[55,-55],[98,-42]],70,[hole(-74,-42,7),hole(44,-56,7)],'paintedMetal'),cyl(24,76,'z','darkMetal',[50,22,0]),cyl(24,76,'z','darkMetal',[-55,22,0])]),
  'jwf1206-p32-item-011':S(V.frontSide,[A.exact,'密封条175×28×4为矩形橡胶条。'],'rubber',[box([175,28,4],'rubber')]),
  'jwf1206-p32-item-012':S(V.axial,[A.exact,'销轴φ16×66，左端有方形横孔/扁槽，右端有窄挡槽。'],'metal',[cyl(8,66,'x','metal'),box([8,8,18],'darkMetal',[-22,0,0]),ann(18,16,2,'darkMetal',[29,0,0])]),
  'jwf1206-p32-item-013':S(V.axial,[A.exact,'锁紧套φ35×20为阶梯半剖套，左侧厚壁、右侧小径通孔。'],'metal',[lathe([[8,-10],[17.5,-10],[17.5,2],[14,2],[14,10],[8,10],[8,-10]])]),
  'jwf1206-p32-item-014':S(V.axial,[A.exact,'调节套φ35×41为长阶梯套，右下端有多级小径。'],'metal',[lathe([[6,-20.5],[17.5,-20.5],[17.5,2],[13,2],[13,13],[9,13],[9,18],[6,20.5],[6,-20.5]])]),

  // 第33页
  'jwf1206-p33-item-001':S(V.frontSide,[A.exact,'标套外φ30、内φ20、长15，外圆刻有数字刻线。'],'metal',[ann(30,20,15),...[-10,-5,0,5,10].map(y=>box([2,2,4],'darkMetal',[0,14,y]))]),
  'jwf1206-p33-item-002':S(V.main,[A.exact,'调节架66×30×10，一端半圆，主视三孔。'],'metal',[ext([[-18,-15],[33,-15],[33,15],[-18,15],[-33,0]],10,[hole(-18,0,9),hole(8,0,5),hole(25,0,5)],'metal')]),
  'jwf1206-p33-item-003':S(V.axial,[A.exact,'垫圈φ23×1.5为薄环。'],'metal',[ann(23,15,1.5)]),
  'jwf1206-p33-item-004':S(V.axial,[A.exact,'调整片φ24×0.2为极薄环。'],'metal',[ann(24,16,0.2)]),
  'jwf1206-p33-item-005':S(V.axial,[A.exact,'轴承套φ68×38，剖面有内台阶和右侧挡边。'],'metal',[lathe([[20,-19],[34,-19],[34,19],[28,19],[28,8],[24,8],[24,-15],[20,-15],[20,-19]])]),
  'jwf1206-p33-item-006':S(V.axial,[A.exact,'封盖φ52×8为浅盘盖，中心不贯通。'],'metal',[cyl(26,3,'x','metal',[-2.5,0,0]),ann(52,44,8,'darkMetal')]),
  'jwf1206-p33-item-007':S(V.axial,[A.exact,'50Hz带轮φ60×48，左轮缘大径、右侧长轮毂并有中心孔。'],'darkMetal',[lathe([[8,-24],[30,-24],[30,-16],[23,-16],[23,-4],[16,-4],[16,24],[8,24],[8,-24]],'darkMetal')]),
  'jwf1206-p33-item-008':S(V.axial,[A.exact,'定位套φ30×15为直壁短套。'],'metal',[ann(30,20,15)]),
  'jwf1206-p33-item-009':S(V.axial,[A.exact,'平带轮φ60×25、轮槽φ50、内段22；外缘两侧有挡边。'],'darkMetal',[lathe([[9,-12.5],[30,-12.5],[30,-10],[25,-10],[25,10],[30,10],[30,12.5],[9,12.5],[9,-12.5]],'darkMetal')]),
  'jwf1206-p33-item-010':S(V.axial,[A.exact,'60Hz带轮φ52×48、台阶φ42，剖面与50Hz件不同。'],'darkMetal',[lathe([[8,-24],[26,-24],[26,-16],[21,-16],[21,-4],[15,-4],[15,24],[8,24],[8,-24]],'darkMetal')]),
  'jwf1206-p33-item-011':S(V.axial,[A.exact,'垫片外φ52、内φ42、厚0.1。'],'metal',[ann(52,42,0.1)]),

  // 第34页
  'jwf1206-p34-item-001':S(V.axial,[A.exact,'道夫总长1292、筒体长1020、φ700；两端为多级轴颈。'],'darkMetal',[cyl(350,1020,'x','darkMetal'),cyl(70,1120,'x','metal'),cyl(45,1210,'x','metal'),cyl(25,1292,'x','metal')]),
  'jwf1206-p34-item-002':S(V.frontSide,[A.exact,'张紧轮架177×50×40为长条支架，左端两孔、中部长圆槽、右端阶梯齿。'],'paintedMetal',[ext(rect(177,40),10,[hole(-68,0,6),hole(-45,0,6),{kind:'polygon',points:[[-25,-6],[45,-6],[52,0],[45,6],[-25,6],[-32,0]]}],'paintedMetal'),box([28,50,40],'metal',[74,0,-15])]),
  'jwf1206-p34-item-003':S(V.axial,[A.exact,'道夫端盖结合件φ640×3为薄圆盘，中心孔和内环形缺口按端视表达。'],'metal',[ann(640,95,3)]),
  'jwf1206-p34-item-004':S(V.frontSide,[A.depth,'右墙板原格无总尺寸；保留大圆环框、中心轴孔、三辐支撑和外周安装耳。'],'paintedMetal',[ann(330,235,22,'paintedMetal'),ann(90,45,35,'metal'),box([22,250,26],'metal',[0,-70,0]),box([22,220,26],'metal',[0,30,-65],[-0.75,0,0]),box([22,220,26],'metal',[0,30,65],[0.75,0,0])]),
  'jwf1206-p34-item-005':S(V.frontSide,[A.depth,'左墙板与右墙板镜像；原格未标总尺寸，保持轮廓级。'],'paintedMetal',[ann(330,235,22,'paintedMetal'),ann(90,45,35,'metal'),box([22,250,26],'metal',[0,-70,0]),box([22,220,26],'metal',[0,30,65],[-0.75,0,0]),box([22,220,26],'metal',[0,30,-65],[0.75,0,0])]),
  'jwf1206-p34-item-006':S(V.axial,[A.exact,'调节螺杆总长230、M12×1；左螺纹80、右螺纹50，中间光杆。'],'metal',[cyl(6,230,'x','metal'),ann(15,12,80,'darkMetal',[-75,0,0]),ann(15,12,50,'darkMetal',[90,0,0])]),
  'jwf1206-p34-item-007':S(V.axial,[A.exact,'81齿齿形带轮φ326×32，端视有中心轮毂与六个弧形辐孔。'],'darkMetal',[ann(326,255,32,'darkMetal'),ann(105,45,36,'metal'),...Array.from({length:6},(_,i)=>box([28,95,24],'metal',[0,90*Math.cos(i*PI/3),90*Math.sin(i*PI/3)],[i*PI/3,0,0]))]),
  'jwf1206-p34-item-008':S(V.frontSide,[A.exact,'支撑板75×30×10为双层台阶板，俯视两端各一孔。'],'metal',[box([75,30,10],'metal'),box([28,30,20],'metal',[23,0,5]),cyl(5,32,'z','darkMetal',[-23,0,0]),cyl(7,32,'z','darkMetal',[23,0,0])]),
  'jwf1206-p34-item-009':S(V.axial,[A.exact,'胀套φ105×45，端视有四条径向开槽，剖视为厚壁套。'],'metal',[ann(105,68,45),...Array.from({length:4},(_,i)=>box([20,4,48],'darkMetal',[42*Math.cos(i*PI/2),42*Math.sin(i*PI/2),0],[0,0,i*PI/2]))]),
  'jwf1206-p34-item-010':S(V.axial,[A.exact,'胀套φ85×45，端视四条径向开槽并带内台阶。'],'metal',[ann(85,50,45),...Array.from({length:4},(_,i)=>box([16,4,48],'darkMetal',[34*Math.cos(i*PI/2),34*Math.sin(i*PI/2),0],[0,0,i*PI/2]))]),
  'jwf1206-p34-item-011':S(V.axial,[A.exact,'定位螺钉总长50、M12，外六角头位于一端。'],'metal',[cyl(6,42,'x','metal',[4,0,0]),cyl(10,8,'x','darkMetal',[-21,0,0],6)]),
  'jwf1206-p34-item-012':S(V.axial,[A.exact,'圆透盖φ138×22为带中心大孔的台阶法兰盖，端视六孔。'],'metal',[lathe([[25,-11],[69,-11],[69,-7],[60,-7],[60,7],[50,7],[50,11],[25,11],[25,-11]]),...Array.from({length:6},(_,i)=>cyl(3,24,'x','darkMetal',[0,55*Math.cos(i*PI/3),55*Math.sin(i*PI/3)]))]),
  'jwf1206-p34-item-013':S(V.axial,[A.exact,'隔圈φ110×12为薄壁圆环。'],'metal',[ann(110,92,12)]),

  // 第35页
  'jwf1206-p35-item-001':S(V.axial,[A.exact,'道夫轴承座φ140×96为深杯形座，右端内台阶和外法兰按剖视。'],'metal',[lathe([[40,-48],[70,-48],[70,35],[63,35],[63,44],[50,44],[50,48],[40,48],[40,-48]])]),
  'jwf1206-p35-item-002':S(V.axial,[A.exact,'圆端盖φ138×20为浅台阶盖，端视四安装孔。'],'metal',[cyl(69,10,'x','metal',[-5,0,0]),ann(138,105,20,'metal'),...Array.from({length:4},(_,i)=>cyl(3,22,'x','darkMetal',[0,52*Math.cos(i*PI/2+PI/4),52*Math.sin(i*PI/2+PI/4)]))]),
  'jwf1206-p35-item-003':S(V.axial,[A.exact,'过桥轮φ60×35，剖视有中心通孔和中部浅槽。'],'darkMetal',[lathe([[10,-17.5],[30,-17.5],[30,-7],[27,-7],[27,7],[30,7],[30,17.5],[10,17.5],[10,-17.5]],'darkMetal')]),
  'jwf1206-p35-item-004':S(V.axial,[A.exact,'轴套φ30×42，左端有外挡肩。'],'metal',[lathe([[8,-21],[18,-21],[18,-15],[15,-15],[15,21],[8,21],[8,-21]])]),
  'jwf1206-p35-item-005':S(V.axial,[A.exact,'调节螺杆总长100、M12，两端螺纹、中段光杆。'],'metal',[cyl(6,100,'x','metal'),ann(15,12,24,'darkMetal',[-38,0,0]),ann(15,12,24,'darkMetal',[38,0,0])]),
  'jwf1206-p35-item-006':S(V.frontSide,[A.exact,'活节螺栓总长55、M12，左端为圆环眼，头宽14。'],'metal',[ann(24,10,14,'metal',[-22,0,0]),cyl(6,44,'x','metal',[12,0,0])]),
  'jwf1206-p35-item-007':S(V.axial,[A.exact,'碟形弹簧φ40×2为锥碟环，不是平垫圈。'],'metal',[lathe([[8,-1],[20,-1],[19,1],[9,4],[8,-1]])]),
  'jwf1206-p35-item-008':S(V.axial,[A.exact,'垫片φ62×0.5为薄环。'],'metal',[ann(62,50,0.5)]),
  'jwf1206-p35-item-009':S(V.axial,[A.exact,'垫片φ62×0.1为极薄环。'],'metal',[ann(62,50,0.1)]),
  'jwf1206-p35-item-010':S(V.frontSide,[A.exact,'盖110×24为长圆形浅盖，两端圆孔，中部长圆凹槽。'],'paintedMetal',[ext([[-43,-12],[43,-12],[55,0],[43,12],[-43,12],[-55,0]],5,[hole(-43,0,5),hole(43,0,5),{kind:'polygon',points:[[-25,-5],[25,-5],[31,0],[25,5],[-25,5],[-31,0]]}],'paintedMetal'),box([70,12,3],'darkMetal',[0,0,-4])]),
  'jwf1206-p35-item-011':S(V.axial,[A.exact,'垫片外φ40、内φ17、厚6为厚橡胶环。'],'rubber',[ann(40,17,6,'rubber')]),
  'jwf1206-p35-item-012':S(V.section,[A.exact,'密封条长2060、截面宽14；原图网纹表示橡胶，不是金属。'],'rubber',[box([2060,14,8],'rubber')]),

  // 第36页
  'jwf1206-p36-item-001':S(V.frontSide,[A.exact,'电机底板306×193，侧视深106并有斜折边；主板四孔和侧板长圆孔。'],'paintedMetal',[ext(rect(306,193),7,[hole(-110,-62,5),hole(110,-62,5),hole(-110,62,5),hole(110,62,5)],'paintedMetal'),box([193,7,106],'metal',[145,0,-48],[0,0,PI/2]),ext([[-53,-96],[53,-96],[53,60],[30,96],[-53,96]],7,[hole(-20,-55,6),hole(15,25,6)],'metal',[0,PI/2,0],[150,0,-50])]),
  'jwf1206-p36-item-002':S(V.axial,[A.exact,'道夫清洁辊总长1323、工作宽1051、φ73；工作段呈螺旋包覆，两端阶梯轴。'],'darkMetal',[cyl(36.5,1051,'x','darkMetal'),cyl(24,1170,'x','metal'),cyl(15,1260,'x','metal'),cyl(8,1323,'x','metal'),...Array.from({length:11},(_,i)=>ann(76,72,3,'rubber',[-500+i*100,0,0]))]),
  'jwf1206-p36-item-003':S(V.axial,[A.exact,'带轮φ72×28，剖视双挡边。'],'darkMetal',pulley(72,28,30)),
  'jwf1206-p36-item-004':S(V.axial,[A.exact,'电机皮带轮φ55×28，剖视双挡边。'],'darkMetal',pulley(55,28,24)),
  'jwf1206-p36-item-005':S(V.axial,[A.exact,'电机带轮φ63×28，剖视双挡边。'],'darkMetal',pulley(63,28,26)),
  'jwf1206-p36-item-006':S(V.frontSide,[A.exact,'吸风管左件总长195、φ75；主视为直圆管，两端法兰，端视另有两个小安装孔。'],'paintedMetal',[ann(75,65,195,'paintedMetal'),ann(94,75,7,'metal',[-70,0,0]),ann(94,75,7,'metal',[70,0,0]),cyl(3,10,'x','darkMetal',[95,34,0]),cyl(3,10,'x','darkMetal',[95,-34,0])]),
  'jwf1206-p36-item-007':S(V.frontSide,[A.exact,'除花板长1045；侧视折边30后接54斜边，绝非平矩形板。'],'paintedMetal',[box([1045,70,3]),box([1045,30,3],'metal',[0,-48,-14],[0.85,0,0]),box([1045,8,3],'metal',[0,-72,-34],[PI/2,0,0]),...[-350,0,350].map(x=>box([8,8,6],'darkMetal',[x,20,0]))]),
  'jwf1206-p36-item-008':S(V.axial,[A.exact,'密封圈外φ103、内φ73、宽25为厚橡胶套圈。'],'rubber',[ann(103,73,25,'rubber')]),
  'jwf1206-p36-item-009':S(V.axial,[A.exact,'挡圈φ30×3为薄金属环。'],'metal',[ann(30,22,3)]),
  'jwf1206-p36-item-010':S(V.frontSide,[A.exact,'托板1111×194×3为长折弯托板，主视六孔，侧视下缘卷成大圆弧。'],'paintedMetal',[ext(rect(1111,194),3,[hole(-530,72,5),hole(-460,72,5),hole(460,72,5),hole(530,72,5)],'paintedMetal'),box([1111,10,22],'metal',[0,-92,-10]),cyl(12,1111,'x','metal',[0,-98,-22])]),
  'jwf1206-p36-item-011':S(V.frontSide,[A.exact,'左清洁辊座176×100，主视三角壳体、上下两个大孔和右侧安装耳；侧视为叉形座。'],'paintedMetal',[ext([[-88,-50],[40,-50],[88,-12],[70,50],[-88,50]],24,[hole(-25,-24,22),hole(-25,27,22),hole(72,0,6)],'paintedMetal'),box([20,70,100],'metal',[-70,0,-42]),box([20,30,100],'metal',[55,30,-42])]),
  'jwf1206-p36-item-012':S(V.frontSide,[A.exact,'右清洁辊座与左件镜像，安装耳和叉形方向相反。'],'paintedMetal',[ext([[88,-50],[-40,-50],[-88,-12],[-70,50],[88,50]],24,[hole(25,-24,22),hole(25,27,22),hole(-72,0,6)],'paintedMetal'),box([20,70,100],'metal',[70,0,-42]),box([20,30,100],'metal',[-55,30,-42])]),
  'jwf1206-p36-item-013':S(V.axial,[A.exact,'销子φ16×97，左端有窄环槽，右端圆角。'],'metal',[cyl(8,97,'x','metal'),ann(18,16,2,'darkMetal',[-42,0,0])]),
  'jwf1206-p36-item-014':S(V.axial,[A.exact,'衬圈φ35×15.5为短厚壁套。'],'metal',[ann(35,22,15.5)]),
  'jwf1206-p36-item-015':S(V.section,[A.exact,'密封条长度1055，截面9×21是带中空泡和U形夹持骨架的复合橡胶条。'],'rubber',[box([1055,9,7],'rubber',[0,-7,0]),box([1055,3,14],'rubber',[0,1,0]),cyl(4.5,1055,'x','rubber',[0,7,0])]),

  // 第37页
  'jwf1206-p37-item-001':S(V.axial,[A.exact,'同步带轮φ85×32、20齿，剖视双挡边和中心通孔。'],'darkMetal',pulley(85,32,34)),
  'jwf1206-p37-item-002':S(V.axial,[A.exact,'垫圈φ40×5为厚金属环。'],'metal',[ann(40,20,5)]),
  'jwf1206-p37-item-003':S(V.main,[A.exact,'连接板590×365为双大窗不规则框板，左右窗形不同并有周边安装孔。'],'paintedMetal',[ext([[-295,-150],[-245,-182],[80,-182],[125,-150],[260,-150],[295,-115],[295,80],[250,125],[145,125],[105,150],[-230,150],[-295,110]],8,[{kind:'polygon',points:[[-230,-105],[-60,-105],[-40,-80],[-40,75],[-65,105],[-230,105]]},{kind:'polygon',points:[[80,-105],[245,-105],[275,-70],[275,70],[230,105],[80,105],[55,78],[55,-78]]},hole(-270,-100,5),hole(-270,90,5),hole(270,-90,5),hole(270,90,5)],'paintedMetal')]),
  'jwf1206-p37-item-004':S(V.main,[A.exact,'电机板330×230为上部尖顶板，中央圆孔、四圆孔及顶部/底部长圆孔。'],'paintedMetal',[ext([[-115,-165],[115,-165],[115,105],[55,165],[-55,165],[-115,105]],8,[hole(0,0,45),hole(-65,-55,5),hole(65,-55,5),hole(-65,55,5),hole(65,55,5),{kind:'polygon',points:[[-8,120],[8,120],[8,145],[-8,145]]}],'paintedMetal')]),
  'jwf1206-p37-item-005':S(V.main,[A.exact,'另一电机板315×220，顶肩与左下斜边不同，中央孔和槽位按主视。'],'paintedMetal',[ext([[-110,-157.5],[110,-157.5],[110,105],[55,157.5],[-55,157.5],[-110,105],[-110,-70],[-70,-110]],8,[hole(0,0,43),hole(-65,-55,5),hole(65,-55,5),hole(-65,55,5),hole(65,55,5)],'paintedMetal')]),
  'jwf1206-p37-item-006':S(V.axial,[A.exact,'挡套φ50×8，剖视右侧有浅台阶。'],'metal',[lathe([[16,-4],[25,-4],[25,4],[21,4],[21,2],[16,2],[16,-4]])]),
  'jwf1206-p37-item-007':S(V.axial,[A.exact,'挡套φ45×4为薄台阶套。'],'metal',[lathe([[14,-2],[22.5,-2],[22.5,2],[19,2],[19,1],[14,1],[14,-2]])]),
  'jwf1206-p37-item-008':S(V.axial,[A.exact,'挡套φ45×7为较厚台阶套。'],'metal',[lathe([[14,-3.5],[22.5,-3.5],[22.5,3.5],[19,3.5],[19,2],[14,2],[14,-3.5]])]),
  'jwf1206-p37-item-009':S(V.axial,[A.exact,'轴套φ50×37，端视有键槽；剖视为等壁通孔套。'],'metal',[ann(50,34,37),box([7,7,40],'darkMetal',[0,20,0])]),
};

function source(part,d){return {page:part.page,item:part.item,code:part.code,recordKey:part.recordKey,nameZh:part.name,nameEn:part.nameEn,quantity:{value:part.quantity,unit:part.quantityUnit,meaning:part.quantityMeaning},dimensions:part.dims,sourceCrop:part.sourceCrop,sourceVector:part.sourceVector,views:d.views,assumptions:d.assumptions};}
export function createJwf1206P30P37Spec(part){const d=D[part.recordKey];if(!d)throw new Error('JWF1206第30—37页缺少逐格重建规格：'+part.recordKey);return {level:part.dims.length?'尺寸级':'轮廓级',material:d.material,source:source(part,d),primitives:d.primitives};}
export const jwf1206P30P37RebuildKeys=Object.freeze(Object.keys(D));
export default createJwf1206P30P37Spec;
