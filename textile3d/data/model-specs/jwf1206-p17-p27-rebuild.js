// JWF1206 第17—27页逐格重建：每个recordKey均对应独立的厂家视图判断与几何。
// 禁止按名称、modelType或数字数组回退猜形；未登记件号直接报错。
const PI=Math.PI;
const rect=(w,h)=>[[-w/2,-h/2],[w/2,-h/2],[w/2,h/2],[-w/2,h/2]];
const circle=(r,n=64)=>Array.from({length:n},(_,i)=>[Math.cos(PI*2*i/n)*r,Math.sin(PI*2*i/n)*r]);
const hole=(x,y,r)=>({kind:'circle',center:[x,y],radius:r});
const box=(size,material='paintedMetal',position=[0,0,0],rotation=[0,0,0])=>({type:'box',size,material,position,rotation});
const cyl=(radius,length,axis='x',material='metal',position=[0,0,0],radialSegments=48)=>({type:'cylinder',radius,length,axis,material,position,radialSegments});
const extrude=(points,depth,holes=[],material='paintedMetal',rotation=[0,0,0],position=[0,0,0])=>({type:'extrude',points,depth,holes,material,rotation,position,bevel:0});
const lathe=(points,material='metal',position=[0,0,0],rotation=[0,0,PI/2])=>({type:'lathe',points,material,position,rotation});
const annulus=(outer,inner,width,material='metal',position=[0,0,0])=>lathe([[inner/2,-width/2],[outer/2,-width/2],[outer/2,width/2],[inner/2,width/2],[inner/2,-width/2]],material,position);
const arcBandPoints=(inner,outer,start,end,segments=24)=>{
  const p=[];for(let i=0;i<=segments;i++){const a=start+(end-start)*i/segments;p.push([Math.cos(a)*outer,Math.sin(a)*outer])}
  for(let i=segments;i>=0;i--){const a=start+(end-start)*i/segments;p.push([Math.cos(a)*inner,Math.sin(a)*inner])}return p;
};
const arcBand=(inner,outer,start,end,depth,material='paintedMetal')=>extrude(arcBandPoints(inner,outer,start,end),depth,[],material);
const arcShell=(length,radius,angle,thickness,segments=14,material='paintedMetal')=>{
  const out=[];const da=angle/segments,chord=2*radius*Math.sin(Math.abs(da)/2);
  for(let i=0;i<segments;i++){const a=-angle/2+da*(i+.5);out.push(box([length,thickness,chord],material,[0,Math.sin(a)*radius,Math.cos(a)*radius],[a,0,0]))}
  return out;
};
const tubeAlongX=(length,outer,inner,material='paintedMetal')=>[annulus(outer,inner,length,material)];
const S=(views,assumptions,material,primitives)=>({views,assumptions,material,primitives});
const V={
  main:['厂家原格单一主视图；尺寸线、中心线和引出线已从实体轮廓中排除'],
  axial:['厂家原格轴向主视/纵向剖视；点画线为回转中心线，剖面线不是实体边'],
  frontSide:['厂家原格主视图与侧视/端视图联合定形；主视取宽高，侧视取深度与截面'],
  frontSection:['厂家原格主视图与下方横截面/端视图联合定形；下方图不是另一独立零件'],
  section:['厂家原格单独截面图；该轮廓沿零件长度方向拉伸'],
};
const A={
  exact:'厂家明确尺寸直接用于主轮廓；孔距、公差、倒角及未标内部结构不作制造依据。',
  depth:'厂家未标板厚/轴向深度，按原格线宽和相邻结构做视觉估算，并明确保持轮廓级。',
  bore:'厂家未标内径或小孔尺寸，按原格比例做视觉估算，不冒充厂家尺寸。',
};

const D={
  // 第17页
  'jwf1206-p17-item-001':S(V.frontSide,[A.exact,'机架仅给3300×580×395总包络；内部梁、孔和箱体按原格可见分区表达。'],'paintedMetal',[
    box([3300,70,395],'darkMetal',[0,-255,0]),box([3300,55,395],'paintedMetal',[0,255,0]),
    box([420,440,340],'paintedMetal',[-1370,0,0]),box([360,430,330],'paintedMetal',[-870,0,0]),
    box([620,470,350],'paintedMetal',[-250,0,0]),box([380,390,320],'paintedMetal',[420,0,0]),
    box([520,420,340],'paintedMetal',[930,0,0]),box([350,360,300],'paintedMetal',[1430,0,0])
  ]),
  'jwf1206-p17-item-002':S(V.frontSide,[A.exact,'两安装孔孔径未标，按原格比例估算φ15。'],'metal',[
    extrude([[-45,-15],[45,-15],[45,15],[-45,15]],15,[hole(-30,0,7.5),hole(30,0,7.5)],'metal')
  ]),
  'jwf1206-p17-item-003':S(V.main,[A.exact,'板厚未标，视觉取2；两个钥匙孔直径按原格比例估算。'],'paintedMetal',[
    extrude([[-165,-122.5],[165,-122.5],[165,72.5],[115,122.5],[-165,122.5]],2,[hole(-125,15,8),hole(120,68,8)],'paintedMetal')
  ]),
  'jwf1206-p17-item-004':S(V.main,[A.exact,'与封板（一）为镜像；板厚未标视觉取2。'],'paintedMetal',[
    extrude([[-165,-122.5],[165,-122.5],[165,122.5],[-115,122.5],[-165,72.5]],2,[hole(125,15,8),hole(-120,68,8)],'paintedMetal')
  ]),
  'jwf1206-p17-item-005':S(V.axial,[A.exact,'中心孔/螺纹孔未标，按剖视比例估算φ10。'],'metal',[
    annulus(20,10,20,'metal')
  ]),
  'jwf1206-p17-item-006':S(V.axial,[A.exact,'原格只明确φ120×20及中心浅孔，浅孔尺寸按比例估算。'],'metal',[
    cyl(60,20,'x','metal'),cyl(12,5,'x','darkMetal',[7.5,0,0])
  ]),

  // 第18页
  'jwf1206-p18-item-001':S(V.frontSection,[A.exact,'端视安装耳和法兰孔未标，按原格比例表达。'],'paintedMetal',[
    ...tubeAlongX(1249,75,66),annulus(105,75,12,'metal',[-618,0,0]),
    extrude([[-38,-48],[38,-48],[54,-10],[40,40],[-20,52],[-48,20]],12,[hole(18,22,6),hole(-18,-24,5)],'paintedMetal',[0,PI/2,0],[-500,0,0])
  ]),
  'jwf1206-p18-item-002':S(V.frontSection,[A.exact,'与后吸口端部支架方向不同；孔径按原格估算。'],'paintedMetal',[
    ...tubeAlongX(1249,75,66),annulus(105,75,12,'metal',[-618,0,0]),
    extrude([[-45,-45],[45,-45],[48,20],[18,48],[-18,48],[-48,20]],12,[hole(22,-22,6),hole(-22,-22,6)],'paintedMetal',[0,PI/2,0],[-500,0,0])
  ]),
  'jwf1206-p18-item-003':S(V.frontSection,[A.exact,'弧板厚度未标视觉取3，端部三角支架按侧视比例表达。'],'paintedMetal',[
    ...arcShell(1050,644.5,0.34,3,16),extrude([[-60,-70],[70,-20],[15,80],[-80,30]],8,[hole(-12,10,7)],'metal',[0,PI/2,0],[-520,0,0])
  ]),
  'jwf1206-p18-item-004':S(V.main,[A.depth,'厂家明确R644.5，弧段角度和板厚按原格比例估算。'],'paintedMetal',[
    arcBand(594.5,644.5,-2.35,-1.15,8,'paintedMetal')
  ]),
  'jwf1206-p18-item-005':S(V.main,[A.exact,'弧带由R594.5/R644.5确定；板厚视觉取8。'],'paintedMetal',[
    arcBand(594.5,644.5,-2.35,-1.15,8,'paintedMetal')
  ]),
  'jwf1206-p18-item-006':S(V.frontSection,[A.exact,'R355.5弧面沿1080拉伸，板厚/折边视觉估算。'],'paintedMetal',[
    ...arcShell(1080,355.5,0.72,3,16),box([1080,14,22],'metal',[0,-125,-323])
  ]),
  'jwf1206-p18-item-007':S(V.axial,[A.exact,'φ18主轴与φ12端轴中心线存在偏移；偏心距未标，按原格估算3。'],'metal',[
    cyl(9,22,'x','metal',[-2,0,0]),cyl(6,18,'x','metal',[18,-3,0]),cyl(15,6,'x','darkMetal',[-13,0,0]),
    cyl(12,10,'x','metal',[-21,0,0]),cyl(8,7,'x','darkMetal',[-29,0,0])
  ]),
  'jwf1206-p18-item-008':S(V.frontSection,[A.exact,'R355.5弧面沿1080拉伸；顶部双折边按原格表达。'],'paintedMetal',[
    ...arcShell(1080,355.5,0.64,3,16),box([1080,12,18],'metal',[0,110,-335]),box([1080,8,12],'darkMetal',[0,120,-340])
  ]),
  'jwf1206-p18-item-009':S(V.frontSide,[A.exact,'三角挡板右件外轮廓按主视闭合，多孔仅保留可见主孔。'],'paintedMetal',[
    extrude([[-60,-140],[60,-140],[48,140],[15,98],[-10,40],[-10,-35],[-45,-75]],15,[hole(-12,60,6)],'paintedMetal')
  ]),
  'jwf1206-p18-item-010':S(V.frontSide,[A.exact,'三角挡板左件为右件镜像。'],'paintedMetal',[
    extrude([[60,-140],[-60,-140],[-48,140],[-15,98],[10,40],[10,-35],[45,-75]],15,[hole(12,60,6)],'paintedMetal')
  ]),
  'jwf1206-p18-item-011':S(V.frontSide,[A.exact,'三个孔径未标，按原格比例估算。'],'metal',[
    extrude([[-28,-24.5],[12,-24.5],[28,-14],[28,14],[12,24.5],[-28,24.5]],15,[hole(-10,-8,8),hole(12,10,4),hole(-9,13,4)],'metal')
  ]),
  'jwf1206-p18-item-012':S(V.frontSection,[A.depth,'仅明确高46，宽度、曲率、孔径和厚3按原格读取/估算。'],'paintedMetal',[
    extrude([[-55,-23],[55,-20],[48,23],[-48,19]],3,[hole(10,0,7)],'paintedMetal')
  ]),
  'jwf1206-p18-item-013':S(V.frontSection,[A.exact,'R352.5弧面沿1050拉伸；两侧缺口按主视表达。'],'paintedMetal',[
    ...arcShell(1050,352.5,0.74,3,16),box([1050,10,16],'metal',[0,-125,-318])
  ]),

  // 第19页
  'jwf1206-p19-item-001':S(V.frontSection,[A.exact,'R352.5弧面沿1051拉伸；上下折边按主视表达。'],'paintedMetal',[
    ...arcShell(1051,352.5,0.76,3,16),box([1051,12,18],'metal',[0,128,-320]),box([1051,12,18],'metal',[0,-128,-320])
  ]),
  'jwf1206-p19-item-002':S(V.main,[A.exact,'弧宽167与R644.5明确；三道下垂加强筋长度按原格比例估算。'],'paintedMetal',[
    arcBand(624.5,644.5,-2.0,-1.74,6,'paintedMetal'),
    box([6,70,8],'metal',[-55,-628,0],[0,0,0]),box([6,78,8],'metal',[0,-630,0]),box([6,68,8],'metal',[55,-628,0])
  ]),
  'jwf1206-p19-item-003':S(V.axial,[A.exact,'厂家明确φ103/φ73×25。'],'rubber',[
    annulus(103,73,25,'rubber')
  ]),
  'jwf1206-p19-item-004':S(V.frontSection,[A.exact,'R644.5弧面沿1050拉伸；两端缺口和下折边按主视表达。'],'paintedMetal',[
    ...arcShell(1050,644.5,0.32,3,14),box([1050,10,18],'metal',[0,-103,-636])
  ]),
  'jwf1206-p19-item-005':S(V.section,[A.exact,'截面宽度未标，按原格比例取12；V形唇口保持空开，不做实心圆条。'],'rubber',[
    extrude([[-6,-10],[0,-10],[0,10],[5,10],[5,-3],[12,8],[7,-10]],1030,[],'rubber',[0,PI/2,0])
  ]),

  // 第20页
  'jwf1206-p20-item-001':S(V.frontSide,[A.exact,'φ1250与总高139.5明确；内部窗口、三辐板和底座按原格可见轮廓表达。'],'paintedMetal',[
    lathe([[380,-18],[625,-18],[625,18],[380,18],[380,-18]],'paintedMetal',[0,0,0],[PI/2,0,0]),box([70,760,36],'metal',[0,-155,0],[0,0,0]),
    box([70,700,36],'metal',[-250,80,0],[0,0,-0.72]),box([70,700,36],'metal',[250,80,0],[0,0,0.72]),
    box([580,140,90],'darkMetal',[0,-555,0]),box([220,105,139.5],'paintedMetal',[0,-505,0])
  ]),
  'jwf1206-p20-item-002':S(V.main,[A.exact,'R652明确；弧段角度、截面厚度和端孔按原格比例读取。'],'metal',[
    arcBand(627,652,0.55,2.59,30,'metal')
  ]),
  'jwf1206-p20-item-003':S(V.frontSide,[A.exact,'厂家明确1090×20×9。'],'rubber',[
    box([1090,20,9],'rubber')
  ]),
  'jwf1206-p20-item-004':S(V.frontSide,[A.depth,'前左弓板仅明确宽56、厚30；曲率和弧长按原格比例估算。'],'paintedMetal',[
    arcBand(510,566,0.78,2.1,30,'paintedMetal')
  ]),
  'jwf1206-p20-item-005':S(V.frontSide,[A.depth,'前右弓板为前左弓板镜像；曲率和弧长未标。'],'paintedMetal',[
    arcBand(510,566,1.04,2.36,30,'paintedMetal')
  ]),
  'jwf1206-p20-item-006':S(V.frontSide,[A.depth,'后左弓板仅明确宽56、厚30；外轮廓按原格。'],'paintedMetal',[
    arcBand(510,566,-2.1,-0.78,30,'paintedMetal')
  ]),
  'jwf1206-p20-item-007':S(V.frontSide,[A.depth,'后右弓板为后左弓板镜像。'],'paintedMetal',[
    arcBand(510,566,-2.36,-1.04,30,'paintedMetal')
  ]),
  'jwf1206-p20-item-008':S(V.axial,[A.exact,'厂家明确φ40/φ13×6。'],'metal',[
    annulus(40,13,6,'metal')
  ]),
  'jwf1206-p20-item-009':S(V.frontSide,[A.exact,'左补块外形含下部半圆缺口；孔径按原格比例估算。'],'metal',[
    extrude([[-28,-22.5],[28,-22.5],[28,22.5],[-28,22.5],[-28,2],[-12,-2],[-4,-18],[-18,-22.5]],9.5,[hole(0,10,8)],'metal')
  ]),
  'jwf1206-p20-item-010':S(V.frontSide,[A.exact,'右补块为左补块镜像。'],'metal',[
    extrude([[28,-22.5],[-28,-22.5],[-28,22.5],[28,22.5],[28,2],[12,-2],[4,-18],[18,-22.5]],9.5,[hole(0,10,8)],'metal')
  ]),
  'jwf1206-p20-item-011':S(V.axial,[A.exact,'M12×1×140；端部驱动槽尺寸未标，视觉表达。'],'metal',[
    cyl(6,140,'x','metal'),cyl(8,6,'x','darkMetal',[-67,0,0],6),box([3,10,3],'darkMetal',[69,0,0])
  ]),
  'jwf1206-p20-item-012':S(V.main,[A.depth,'端盖只明确R352；外弧角、内侧半圆缺口和轴向厚度按原格比例估算。'],'paintedMetal',[
    extrude(arcBandPoints(120,352,0,PI,36),20,[],'paintedMetal')
  ]),

  // 第21页
  'jwf1206-p21-item-001':S(V.frontSide,[A.exact,'外弧R95与宽330、深90明确；内弧和底部台阶按原格比例估算。'],'paintedMetal',[
    extrude(arcBandPoints(68,95,0,PI,30),90,[],'paintedMetal'),box([330,38,90],'paintedMetal',[0,-15,0])
  ]),
  'jwf1206-p21-item-002':S(V.axial,[A.exact,'φ28×20；外周三道密封筋按侧视表达。'],'rubber',[
    cyl(14,20,'x','rubber'),annulus(31,24,2,'darkMetal',[-6,0,0]),annulus(31,24,2,'darkMetal',[0,0,0]),annulus(31,24,2,'darkMetal',[6,0,0])
  ]),
  'jwf1206-p21-item-003':S(V.frontSide,[A.exact,'60×60顶板厚6明确；下部卡脚高度未标，按侧视比例估算。'],'rubber',[
    box([60,60,6],'rubber',[0,0,8]),box([42,42,18],'darkMetal',[0,0,-4]),
    box([8,36,16],'rubber',[-23,0,-8],[0,0,-0.18]),box([8,36,16],'rubber',[23,0,-8],[0,0,0.18])
  ]),
  'jwf1206-p21-item-004':S(V.axial,[A.exact,'厂家明确φ40/φ13×3。'],'metal',[
    annulus(40,13,3,'metal')
  ]),
  'jwf1206-p21-item-005':S(V.frontSide,[A.exact,'35×16×10；顶部圆角按原格表达。'],'metal',[
    extrude([[-8,-17.5],[8,-17.5],[8,11],[6,15],[2,17.5],[-2,17.5],[-6,15],[-8,11]],10,[],'metal')
  ]),
  'jwf1206-p21-item-006':S(V.frontSide,[A.exact,'167×186与厚19明确；玻璃窗内框尺寸按原格比例估算。'],'glass',[
    extrude([[-83.5,40],[-35,93],[83.5,-38],[55,-93],[-42,-55]],4,[],'glass'),
    {type:'tube',points:[[-83.5,40,3],[-35,93,3],[83.5,-38,3],[55,-93,3],[-42,-55,3],[-83.5,40,3]],radius:6,material:'paintedMetal',segments:80,radialSegments:12},
    {type:'tube',points:[[-62,35,4],[-32,68,4],[56,-35,4],[40,-65,4],[-28,-42,4],[-62,35,4]],radius:3,material:'darkMetal',segments:80,radialSegments:10}
  ]),
  'jwf1206-p21-item-007':S(V.axial,[A.exact,'厂家明确φ30/φ13×6。'],'rubber',[
    annulus(30,13,6,'rubber')
  ]),
  'jwf1206-p21-item-008':S(V.axial,[A.exact,'厂家明确φ40/φ17×6。'],'rubber',[
    annulus(40,17,6,'rubber')
  ]),

  // 第22页
  'jwf1206-p22-item-001':S(V.axial,[A.exact,'φ1290×1020主筒明确；两端短轴尺寸未标，按原格比例估算。'],'darkMetal',[
    cyl(645,1020,'x','darkMetal'),cyl(45,1080,'x','metal'),cyl(25,80,'x','metal',[-550,0,0]),cyl(25,80,'x','metal',[550,0,0])
  ]),
  'jwf1206-p22-item-002':S(V.frontSide,[A.exact,'φ275×1明确；中心孔未标，按原格比例估算φ55。'],'metal',[
    annulus(275,55,1,'metal')
  ]),
  'jwf1206-p22-item-003':S(V.axial,[A.exact,'φ188×54明确；内部台阶孔未标，按剖视比例建立。'],'metal',[
    lathe([[45,-27],[94,-27],[94,-20],[83,-20],[83,20],[67,20],[67,27],[45,27],[45,-27]],'metal')
  ]),
  'jwf1206-p22-item-004':S(V.frontSide,[A.exact,'135×70×40明确；顶孔/底孔孔径未标，按原格比例估算。'],'paintedMetal',[
    extrude([[-67.5,-35],[67.5,-35],[67.5,0],[20,35],[-20,35],[-67.5,0]],40,[hole(0,23,5)],'paintedMetal'),
    box([135,12,48],'darkMetal',[0,-29,0])
  ]),
  'jwf1206-p22-item-005':S(V.axial,[A.exact,'厂家明确φ160/φ144×10。'],'metal',[
    annulus(160,144,10,'metal')
  ]),
  'jwf1206-p22-item-006':S(V.frontSide,[A.exact,'φ188×28明确；中心孔与环形螺孔圈按原格比例估算。'],'metal',[
    annulus(188,112,28,'metal')
  ]),
  'jwf1206-p22-item-007':S(V.axial,[A.exact,'φ95×0.1明确；内孔未标，按原格估算φ70。'],'metal',[
    annulus(95,70,0.1,'metal')
  ]),
  'jwf1206-p22-item-008':S(V.axial,[A.exact,'φ95×1明确；内孔未标，按原格估算φ70。'],'metal',[
    annulus(95,70,1,'metal')
  ]),
  'jwf1206-p22-item-009':S(V.axial,[A.exact,'厂家明确φ190/φ160×100。'],'metal',[
    annulus(190,160,100,'metal')
  ]),
  'jwf1206-p22-item-010':S(V.frontSide,[A.exact,'φ188×28明确；可见螺孔圈不冒充尺寸。'],'metal',[
    annulus(188,112,28,'metal')
  ]),
  'jwf1206-p22-item-011':S(V.axial,[A.exact,'φ95×10明确；内孔未标，按原格估算φ70。'],'metal',[
    annulus(95,70,10,'metal')
  ]),

  // 第23页
  'jwf1206-p23-item-001':S(V.frontSide,[A.exact,'主视1102上口、1022下体及侧视厚22明确；斜肩高度和孔径按原格比例。'],'paintedMetal',[
    extrude([[-551,220],[551,220],[511,165],[511,-220],[-511,-220],[-511,165]],22,[hole(-410,170,7),hole(410,170,7)],'paintedMetal'),
    box([1022,18,28],'rubber',[0,-165,0])
  ]),
  'jwf1206-p23-item-002':S(V.frontSide,[A.exact,'φ192.3×45明确；中心孔和轮缘台阶未标，按剖视比例估算，不猜齿数。'],'darkMetal',[
    lathe([[22,-22.5],[60,-22.5],[60,-18],[96.15,-18],[96.15,18],[60,18],[60,22.5],[22,22.5],[22,-22.5]],'darkMetal')
  ]),
  'jwf1206-p23-item-003':S(V.frontSide,[A.exact,'总长1101、工作段1025、厚33明确；刷齿高度/节距按原格视觉表达。'],'paintedMetal',[
    box([1025,82,18],'paintedMetal',[0,18,0]),box([1101,16,33],'metal',[0,-25,0]),
    box([38,70,33],'darkMetal',[-531,0,0]),box([38,70,33],'darkMetal',[531,0,0]),
    ...Array.from({length:42},(_,i)=>box([8,28,3],'darkMetal',[-500+i*24.4,-45,0]))
  ]),
  'jwf1206-p23-item-004':S(V.axial,[A.exact,'φ30/φ25×1106明确；左侧大端、锥段和螺纹长度未标，按原格比例。'],'metal',[
    cyl(12.5,680,'x','metal',[190,0,0]),cyl(15,270,'x','metal',[-285,0,0]),cyl(20,110,'x','darkMetal',[-475,0,0]),
    cyl(17,55,'x','metal',[-557,0,0]),cyl(14,30,'x','darkMetal',[545,0,0])
  ]),
  'jwf1206-p23-item-005':S(V.axial,[A.exact,'φ120×30、轴孔φ12明确；刷丝数量/长度按原格比例估算。'],'darkMetal',[
    annulus(70,12,30,'darkMetal'),
    ...Array.from({length:20},(_,i)=>{const a=PI*2*i/20;return box([30,2,52],'rubber',[0,Math.cos(a)*35,Math.sin(a)*35],[a,0,0])})
  ]),
  'jwf1206-p23-item-006':S(V.frontSide,[A.exact,'630×444外包络明确；板厚未标视觉取15，中央Y形筋和孔按原格。'],'paintedMetal',[
    extrude([[-315,-222],[315,-222],[315,120],[275,205],[170,222],[70,115],[0,55],[-70,115],[-170,222],[-275,205],[-315,120]],15,[hole(0,-130,14),hole(-250,160,5),hole(250,160,5)],'paintedMetal'),
    box([70,210,28],'darkMetal',[0,-115,0])
  ]),
  'jwf1206-p23-item-007':S(V.frontSide,[A.exact,'右中托架为左件镜像，尺寸同630×444。'],'paintedMetal',[
    extrude([[315,-222],[-315,-222],[-315,120],[-275,205],[-170,222],[-70,115],[0,55],[70,115],[170,222],[275,205],[315,120]],15,[hole(0,-130,14),hole(250,160,5),hole(-250,160,5)],'paintedMetal'),
    box([70,210,28],'darkMetal',[0,-115,0])
  ]),
  'jwf1206-p23-item-008':S(V.frontSide,[A.exact,'107×32.5外包络明确；长圆槽和下端弹簧座按原格比例。'],'metal',[
    extrude([[-16.25,-53.5],[16.25,-53.5],[16.25,53.5],[-16.25,53.5]],8,[{kind:'polygon',points:[[-5,-38],[5,-38],[5,30],[-5,30]]}], 'metal'),
    cyl(15,20,'z','darkMetal',[0,-55,0])
  ]),
  'jwf1206-p23-item-009':S(V.frontSide,[A.exact,'350高、底宽90、深30明确；上部环形托架宽度和孔径按原格比例。'],'paintedMetal',[
    extrude([[-45,-175],[45,-175],[45,-80],[100,-35],[155,20],[150,105],[85,160],[0,175],[-85,160],[-150,105],[-155,20],[-100,-35],[-45,-80]],30,[hole(0,75,40),hole(0,-115,12)],'paintedMetal')
  ]),
  'jwf1206-p23-item-010':S(V.frontSide,[A.exact,'右前托架为左件镜像；深30。'],'paintedMetal',[
    extrude([[45,-175],[-45,-175],[-45,-80],[-100,-35],[-155,20],[-150,105],[-85,160],[0,175],[85,160],[150,105],[155,20],[100,-35],[45,-80]],30,[hole(0,75,40),hole(0,-115,12)],'paintedMetal')
  ]),
  'jwf1206-p23-item-011':S(V.frontSide,[A.exact,'80×52×39外包络明确；折弯层级和槽孔按两视图。'],'paintedMetal',[
    extrude([[-40,-65],[40,-65],[40,-15],[20,-5],[20,45],[-8,45],[-8,-5],[-40,-20]],9,[hole(15,-40,6)],'paintedMetal'),
    box([80,16,39],'darkMetal',[0,-55,-15]),box([16,90,39],'metal',[-30,-5,-15])
  ]),
  'jwf1206-p23-item-012':S(V.frontSide,[A.exact,'右支撑架为左件镜像。'],'paintedMetal',[
    extrude([[40,-65],[-40,-65],[-40,-15],[-20,-5],[-20,45],[8,45],[8,-5],[40,-20]],9,[hole(-15,-40,6)],'paintedMetal'),
    box([80,16,39],'darkMetal',[0,-55,-15]),box([16,90,39],'metal',[30,-5,-15])
  ]),
  'jwf1206-p23-item-013':S(V.frontSide,[A.exact,'225×95×44包络明确；L形外轮廓和孔按原格。'],'paintedMetal',[
    extrude([[-47.5,-112.5],[47.5,-112.5],[47.5,-5],[15,-5],[15,112.5],[-47.5,112.5]],8,[hole(-18,75,9),hole(-18,-80,7),hole(20,-80,7)],'paintedMetal'),
    box([95,14,44],'darkMetal',[0,-105,-18])
  ]),
  'jwf1206-p23-item-014':S(V.frontSide,[A.exact,'右支撑板为左件镜像。'],'paintedMetal',[
    extrude([[47.5,-112.5],[-47.5,-112.5],[-47.5,-5],[-15,-5],[-15,112.5],[47.5,112.5]],8,[hole(18,75,9),hole(18,-80,7),hole(-20,-80,7)],'paintedMetal'),
    box([95,14,44],'darkMetal',[0,-105,-18])
  ]),

  // 第24页
  'jwf1206-p24-item-001':S(V.main,[A.exact,'R109/R128明确；弧段角度和板厚按原格比例估算，四孔位置按可见轮廓。'],'paintedMetal',[
    arcBand(109,128,-2.25,1.15,15,'paintedMetal')
  ]),
  'jwf1206-p24-item-002':S(V.main,[A.exact,'右前支撑块为左件镜像。'],'paintedMetal',[
    arcBand(109,128,1.99,5.39,15,'paintedMetal')
  ]),
  'jwf1206-p24-item-003':S(V.frontSide,[A.depth,'左后托架只明确端宽90、厚30；环形主体尺寸按原格比例。'],'paintedMetal',[
    extrude([[-45,-180],[45,-180],[70,-110],[160,-20],[145,120],[40,180],[-70,150],[-150,60],[-140,-40],[-70,-100]],30,[hole(0,70,42),hole(0,-120,12)],'paintedMetal')
  ]),
  'jwf1206-p24-item-004':S(V.frontSide,[A.depth,'右后托架为左件镜像。'],'paintedMetal',[
    extrude([[45,-180],[-45,-180],[-70,-110],[-160,-20],[-145,120],[-40,180],[70,150],[150,60],[140,-40],[70,-100]],30,[hole(0,70,42),hole(0,-120,12)],'paintedMetal')
  ]),
  'jwf1206-p24-item-005':S(V.frontSide,[A.exact,'423×39×38明确；长条截面台阶和孔列按原格。'],'paintedMetal',[
    extrude([[-211.5,-19.5],[211.5,-19.5],[211.5,19.5],[-211.5,19.5]],9.5,[hole(-165,8,4),hole(-120,8,4),hole(0,8,4),hole(120,8,4),hole(165,8,4)],'paintedMetal'),
    box([423,18,38],'darkMetal',[0,-12,-14])
  ]),
  'jwf1206-p24-item-006':S(V.frontSide,[A.exact,'右支撑板与左件镜像，423×39×38。'],'paintedMetal',[
    extrude([[-211.5,-19.5],[211.5,-19.5],[211.5,19.5],[-211.5,19.5]],9.5,[hole(-165,8,4),hole(-120,8,4),hole(0,8,4),hole(120,8,4),hole(165,8,4)],'paintedMetal'),
    box([423,18,38],'darkMetal',[0,12,-14])
  ]),
  'jwf1206-p24-item-007':S(V.frontSide,[A.exact,'主视宽268、侧视总长252.1明确；板厚和折边高度按原格。'],'paintedMetal',[
    extrude([[-134,-55],[134,-55],[105,15],[60,32],[-60,32],[-105,15]],12,[hole(-60,-18,8),hole(60,-18,8)],'paintedMetal'),
    box([252.1,18,42],'darkMetal',[0,-45,-15])
  ]),
  'jwf1206-p24-item-008':S(V.axial,[A.exact,'φ160×32.5明确；V形轮槽和内孔按剖视比例估算。'],'darkMetal',[
    lathe([[20,-16.25],[64,-16.25],[80,-8],[80,8],[64,16.25],[20,16.25],[20,-16.25]],'darkMetal')
  ]),
  'jwf1206-p24-item-009':S(V.axial,[A.exact,'φ192.3×32.5明确；中心孔未标按原格估算φ50，不猜齿数。'],'darkMetal',[
    lathe([[25,-16.25],[74,-16.25],[96.15,-12],[96.15,12],[74,16.25],[25,16.25],[25,-16.25]],'darkMetal')
  ]),
  'jwf1206-p24-item-010':S(V.frontSection,[A.exact,'194×25主视与R95弧面明确；轴向厚度未标视觉取20。'],'paintedMetal',[
    arcBand(75,95,-2.0,-1.14,25,'paintedMetal')
  ]),
  'jwf1206-p24-item-011':S(V.frontSide,[A.exact,'260×30×29明确；双安装孔按主视。'],'paintedMetal',[
    extrude([[-130,-15],[130,-15],[115,15],[-115,15]],9,[hole(-55,0,7),hole(55,0,7)],'paintedMetal'),
    box([260,12,29],'darkMetal',[0,-10,-10])
  ]),
  'jwf1206-p24-item-012':S(V.frontSide,[A.exact,'左后支撑板为右件镜像。'],'paintedMetal',[
    extrude([[130,-15],[-130,-15],[-115,15],[115,15]],9,[hole(55,0,7),hole(-55,0,7)],'paintedMetal'),
    box([260,12,29],'darkMetal',[0,-10,-10])
  ]),
  'jwf1206-p24-item-013':S(V.main,[A.exact,'R109/R128明确；右后支撑块弧向按原格。'],'paintedMetal',[
    arcBand(109,128,-2.25,1.15,15,'paintedMetal')
  ]),
  'jwf1206-p24-item-014':S(V.main,[A.exact,'左后支撑块为右件镜像。'],'paintedMetal',[
    arcBand(109,128,1.99,5.39,15,'paintedMetal')
  ]),
  'jwf1206-p24-item-015':S(V.axial,[A.exact,'φ30×42.5明确；端部挡肩按原格比例。'],'metal',[
    cyl(15,42.5,'x','metal'),cyl(19,4,'x','darkMetal',[-21,0,0]),cyl(18,4,'x','darkMetal',[21,0,0])
  ]),
  'jwf1206-p24-item-016':S(V.axial,[A.exact,'φ40/φ30×1357、左端57和右端194明确；中间键槽只作可见语义。'],'metal',[
    cyl(20,1106,'x','metal',[-28,0,0]),cyl(15,194,'x','metal',[622,0,0]),cyl(15,57,'x','metal',[-610,0,0]),
    box([180,8,8],'darkMetal',[420,18,0]),box([150,8,8],'darkMetal',[-250,18,0]),cyl(22,8,'x','darkMetal',[-678,0,0]),cyl(18,8,'x','darkMetal',[681,0,0])
  ]),

  // 第25页
  'jwf1206-p25-item-001':S(V.axial,[A.exact,'M20×1、φ18×57.5明确；六角头和短肩尺寸按原格比例估算。'],'metal',[
    cyl(9,57.5,'x','metal',[12,0,0]),cyl(10,18,'x','metal',[-25,0,0]),cyl(16,14,'x','darkMetal',[-41,0,0],6)
  ]),
  'jwf1206-p25-item-002':S(V.axial,[A.exact,'φ6/φ4×35明确；开口销槽按原格表达。'],'metal',[
    cyl(3,14,'x','metal',[-10.5,0,0]),cyl(2,21,'x','metal',[7,0,0]),box([8,2,3],'darkMetal',[-16,0,0])
  ]),
  'jwf1206-p25-item-003':S(V.frontSide,[A.exact,'100×31.5×15.5明确；侧面凹弧半径未标，按原格比例。'],'rubber',[
    extrude([[-50,-7.75],[50,-7.75],[50,7.75],[20,7.75],[10,2],[-10,2],[-20,7.75],[-50,7.75]],31.5,[],'rubber')
  ]),
  'jwf1206-p25-item-004':S(V.axial,[A.exact,'φ20/φ12×81明确；左端内孔深45按剖视。'],'metal',[
    annulus(20,12,45,'metal',[-18,0,0]),cyl(6,36,'x','metal',[22.5,0,0])
  ]),
  'jwf1206-p25-item-005':S(V.frontSide,[A.exact,'φ135×25.5明确；中心孔和六个安装孔尺寸按原格比例估算。'],'paintedMetal',[
    extrude(circle(67.5),25.5,[{kind:'circle',center:[0,0],radius:36},...Array.from({length:6},(_,i)=>hole(Math.cos(PI*2*i/6)*52,Math.sin(PI*2*i/6)*52,4))],'paintedMetal')
  ]),
  'jwf1206-p25-item-006':S(V.frontSide,[A.depth,'只明确带宽26；展示段长度、齿距和孔距按原格比例，不作为厂家尺寸。'],'rubber',[
    box([220,26,5],'rubber'),...Array.from({length:22},(_,i)=>box([5,26,3],'darkMetal',[-105+i*10,0,-4])),
    cyl(4,7,'z','darkMetal',[-70,0,0]),cyl(4,7,'z','darkMetal',[0,0,0]),cyl(4,7,'z','darkMetal',[70,0,0])
  ]),
  'jwf1206-p25-item-007':S(V.axial,[A.exact,'厂家明确M12×1×120。'],'metal',[
    cyl(6,120,'x','metal')
  ]),
  'jwf1206-p25-item-008':S(V.axial,[A.exact,'厂家明确M12×1×170。'],'metal',[
    cyl(6,170,'x','metal')
  ]),
  'jwf1206-p25-item-009':S(V.axial,[A.exact,'厂家明确φ30/φ13×6。'],'rubber',[
    annulus(30,13,6,'rubber')
  ]),

  // 第26页
  'jwf1206-p26-item-001':S(V.frontSide,[A.exact,'1122×70、两端中心距1019明确；端部滑座和双导轨按两视图表达。'],'paintedMetal',[
    box([1122,70,10],'paintedMetal'),box([1019,12,18],'metal',[0,-18,-8]),box([1019,12,18],'metal',[0,18,-8]),
    box([50,76,36],'darkMetal',[-536,0,-12]),box([50,76,36],'darkMetal',[536,0,-12])
  ]),
  'jwf1206-p26-item-002':S(V.frontSection,[A.exact,'1080×70×35明确；右侧截面为U形槽，非实心板。'],'paintedMetal',[
    box([1080,8,35],'paintedMetal',[0,-31,0]),box([1080,70,7],'paintedMetal',[0,0,-14]),box([1080,8,35],'paintedMetal',[0,31,0])
  ]),
  'jwf1206-p26-item-003':S(V.frontSection,[A.exact,'长1080、R643.5明确；侧视给59高折弯截面，板厚未标视觉取3。'],'paintedMetal',[
    ...arcShell(1080,643.5,0.22,3,12),box([1080,12,28],'metal',[0,-60,-638])
  ]),
  'jwf1206-p26-item-004':S(V.frontSection,[A.exact,'1138×92.5×70、安装距1064明确；侧视为开放弯曲吸口截面并带M8吊杆。'],'paintedMetal',[
    ...arcShell(1138,52,PI*1.35,3,18),box([1138,12,70],'metal',[0,-42,0]),
    cyl(4,110,'y','metal',[-532,-80,0]),cyl(4,110,'y','metal',[532,-80,0])
  ]),
  'jwf1206-p26-item-005':S(V.frontSection,[A.exact,'1338×66、吊杆中心距1264明确；侧面密封体截面按原格闭合。'],'paintedMetal',[
    extrude([[-16,-33],[16,-33],[26,-10],[22,18],[10,33],[-10,33],[-22,18],[-26,-10]],1338,[],'paintedMetal',[0,PI/2,0]),
    cyl(4,100,'y','metal',[-632,-70,0]),cyl(4,100,'y','metal',[632,-70,0])
  ]),
  'jwf1206-p26-item-006':S(V.frontSide,[A.exact,'厂家明确1080×10×3，橡胶密封条。'],'rubber',[
    box([1080,10,3],'rubber')
  ]),
  'jwf1206-p26-item-007':S(V.frontSection,[A.depth,'长1134明确；中央抬高段和三角折弯截面按原格比例，板厚视觉取3。'],'paintedMetal',[
    extrude([[-567,-60],[-180,-60],[-180,60],[180,60],[180,-60],[567,-60],[567,30],[-567,30]],3,[],'paintedMetal'),
    box([1134,12,28],'metal',[0,-52,-12])
  ]),
  'jwf1206-p26-item-008':S(V.frontSide,[A.exact,'1122×70、中心距1019明确；中固定盖板端部机构按原格。'],'paintedMetal',[
    box([1122,70,10],'paintedMetal'),box([1019,12,18],'metal',[0,-18,-8]),box([1019,12,18],'metal',[0,18,-8]),
    box([50,76,36],'darkMetal',[-536,0,-12]),box([50,76,36],'darkMetal',[536,0,-12])
  ]),
  'jwf1206-p26-item-009':S(V.frontSide,[A.exact,'1122×70、中心距1019明确；上固定盖板与中/下件同族但独立登记。'],'paintedMetal',[
    box([1122,70,10],'paintedMetal'),box([1019,12,18],'metal',[0,-18,-8]),box([1019,12,18],'metal',[0,18,-8]),
    box([50,76,36],'darkMetal',[-536,0,-12]),box([50,76,36],'darkMetal',[536,0,-12])
  ]),
  'jwf1206-p26-item-010':S(V.frontSide,[A.exact,'138.5×105×68.5明确；入口梨形闭合轮廓和侧向渐缩按原格，壁厚未标视觉取3。'],'paintedMetal',[
    {type:'loft',material:'paintedMetal',sections:[
      {x:-66,points:[[-34.25,-40],[-23,-52.5],[23,-52.5],[34.25,-40],[34.25,31],[23,52.5],[-23,52.5],[-34.25,31]]},
      {x:-15,points:[[-34,-31],[-24,-24],[0,-34],[24,-24],[34,0],[24,24],[0,34],[-24,24]]},
      {x:16,points:[[-34,0],[-24,-24],[0,-34],[24,-24],[34,0],[24,24],[0,34],[-24,24]]}
    ]},
    extrude([[-34.25,-40],[-23,-52.5],[23,-52.5],[34.25,-40],[34.25,31],[23,52.5],[-23,52.5],[-34.25,31]],5,[{kind:'polygon',points:[[-27,-36],[-19,-45],[19,-45],[27,-35],[27,27],[18,44],[-18,44],[-27,27]]}],'metal',[0,PI/2,0],[-69,0,0]),
    cyl(34,55,'x','paintedMetal',[43,0,0]),annulus(82,68,6,'metal',[72,0,0])
  ]),
  'jwf1206-p26-item-011':S(V.axial,[A.exact,'厂家明确φ92/φ62×25。'],'rubber',[
    annulus(92,62,25,'rubber')
  ]),
  'jwf1206-p26-item-012':S(V.main,[A.exact,'96×74×2明确；U形开口和四角孔按主视，孔径未标。'],'paintedMetal',[
    extrude([[-37,-48],[37,-48],[37,48],[-37,48]],2,[hole(-27,-36,4),hole(27,-36,4),hole(-27,36,4),hole(27,36,4),{kind:'polygon',points:[[-20,-15],[-20,25],[-12,37],[12,37],[20,25],[20,-15]]}],'paintedMetal')
  ]),
  'jwf1206-p26-item-013':S(V.frontSection,[A.depth,'长1080明确；侧视弯折宽35、展开高约168.1来自原格，板厚视觉取3。'],'paintedMetal',[
    ...arcShell(1080,165,1.15,3,16),box([1080,12,35],'metal',[0,-130,-100])
  ]),
  'jwf1206-p26-item-014':S(V.frontSide,[A.exact,'55×20×6、两孔中心距25明确；孔径未标按原格估算φ8。'],'metal',[
    extrude(rect(55,20),6,[hole(-12.5,0,4),hole(12.5,0,4)],'metal')
  ]),

  // 第27页
  'jwf1206-p27-item-001':S(V.frontSide,[A.exact,'M8、螺纹长40、总长48明确；内六角头尺寸按原格比例估算。'],'metal',[
    cyl(4,40,'x','metal',[4,0,0]),cyl(7,8,'x','darkMetal',[-20,0,0],6),cyl(3,3,'x','darkMetal',[-24,0,0],6)
  ]),
  'jwf1206-p27-item-002':S(V.frontSection,[A.exact,'长1080、截面12×7、顶圆R4.5明确；按截面沿长度拉伸。'],'rubber',[
    box([1080,12,2.5],'rubber',[0,-2.25,0]),cyl(4.5,1080,'x','rubber',[0,2.5,0])
  ]),
  'jwf1206-p27-item-003':S(V.frontSide,[A.exact,'φ10×60明确；侧孔、长槽和端帽孔径未标，按原格比例表达。'],'metal',[
    cyl(5,60,'x','metal'),cyl(8,4,'x','darkMetal',[28,0,0]),cyl(2.5,12,'z','darkMetal',[-18,0,0]),box([18,4,3],'darkMetal',[8,5,0])
  ]),
  'jwf1206-p27-item-004':S(V.frontSection,[A.exact,'厂家原格明确φ8×700；名称中的590不作为长度，采用图示700。'],'rubber',[
    cyl(4,700,'x','rubber')
  ]),
};

function source(part,definition){
  return {
    page:part.page,item:part.item,code:part.code,recordKey:part.recordKey,nameZh:part.name,nameEn:part.nameEn,
    quantity:{value:part.quantity,unit:part.quantityUnit,meaning:part.quantityMeaning},
    dimensions:part.dims,sourceCrop:part.sourceCrop,sourceVector:part.sourceVector,
    views:definition.views,assumptions:definition.assumptions
  };
}

export function createJwf1206P17P27Spec(part){
  const definition=D[part.recordKey];
  if(!definition)throw new Error('JWF1206第17—27页缺少逐格重建规格：'+part.recordKey);
  return {level:part.dims.length?'尺寸级':'轮廓级',material:definition.material,source:source(part,definition),primitives:definition.primitives};
}

export const jwf1206P17P27RebuildKeys=Object.freeze(Object.keys(D));
export default createJwf1206P17P27Spec;
