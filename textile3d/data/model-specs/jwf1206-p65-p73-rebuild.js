// JWF1206 第65—73页：依据每个厂家600dpi原格的主/侧/俯/剖视显式建模。
// 不根据名称、modelType 或尺寸数组自动推断几何。
const PI=Math.PI;
const rect=(w,h)=>[[-w/2,-h/2],[w/2,-h/2],[w/2,h/2],[-w/2,h/2]];
const circlePoints=(radius,count=48)=>Array.from({length:count},(_,i)=>[radius*Math.cos(i*PI*2/count),radius*Math.sin(i*PI*2/count)]);
const arcPoints=(cx,cy,r,start,end,count=18)=>Array.from({length:count+1},(_,i)=>{const a=start+(end-start)*i/count;return[cx+r*Math.cos(a),cy+r*Math.sin(a)];});
const roundedRectPoints=(w,h,r=Math.min(w,h)*.12,count=5)=>[
  ...arcPoints(w/2-r,h/2-r,r,0,PI/2,count),...arcPoints(-w/2+r,h/2-r,r,PI/2,PI,count),
  ...arcPoints(-w/2+r,-h/2+r,r,PI,PI*1.5,count),...arcPoints(w/2-r,-h/2+r,r,PI*1.5,PI*2,count),
];
const capsulePoints=(w,h,count=10)=>w>=h?[
  ...arcPoints(w/2-h/2,0,h/2,-PI/2,PI/2,count),...arcPoints(-w/2+h/2,0,h/2,PI/2,PI*1.5,count),
]:[
  ...arcPoints(0,h/2-w/2,w/2,0,PI,count),...arcPoints(0,-h/2+w/2,w/2,PI,PI*2,count),
];
const ringSectorPoints=(outer,inner,start,end,count=36)=>[
  ...Array.from({length:count+1},(_,i)=>{const a=start+(end-start)*i/count;return[outer*Math.cos(a),outer*Math.sin(a)];}),
  ...Array.from({length:count+1},(_,i)=>{const a=end-(end-start)*i/count;return[inner*Math.cos(a),inner*Math.sin(a)];}),
];
const spiralBladePoints=(inner,outer,sweep,width,count=24)=>{
  const side=sign=>Array.from({length:count+1},(_,i)=>{const t=i/count,r=inner+(outer-inner)*t,a=sweep*t+sign*width/(2*r);return[r*Math.cos(a),r*Math.sin(a)];});
  return[...side(1),...side(-1).reverse()];
};
const keyedBorePoints=(radius,halfWidth,keyTop,count=36)=>{
  const theta=Math.acos(halfWidth/radius),circleY=Math.sqrt(radius*radius-halfWidth*halfWidth);
  return[[-halfWidth,keyTop],[halfWidth,keyTop],[halfWidth,circleY],...Array.from({length:count+1},(_,i)=>{const a=theta-(PI+theta*2)*i/count;return[radius*Math.cos(a),radius*Math.sin(a)];}),[-halfWidth,circleY]];
};
const verticalFlatCirclePoints=(radius,halfWidth,count=24)=>{
  const alpha=Math.acos(halfWidth/radius);
  return[
    ...Array.from({length:count+1},(_,i)=>{const a=alpha+(PI-alpha*2)*i/count;return[radius*Math.cos(a),radius*Math.sin(a)];}),
    ...Array.from({length:count+1},(_,i)=>{const a=PI+alpha+(PI-alpha*2)*i/count;return[radius*Math.cos(a),radius*Math.sin(a)];})
  ];
};
const hole=(x,y,r)=>({kind:'circle',center:[x,y],radius:r});
const slot=(x,y,w,h)=>({kind:'polygon',points:[[x-w/2,y-h/2],[x+w/2,y-h/2],[x+w/2,y+h/2],[x-w/2,y+h/2]]});
const polyHole=points=>({kind:'polygon',points});
const capsuleHole=(x,y,w,h)=>polyHole(capsulePoints(w,h).map(([px,py])=>[px+x,py+y]));
const box=(size,material='paintedMetal',position=[0,0,0],rotation=[0,0,0])=>({type:'box',size,material,position,rotation});
const cyl=(r,l,axis='x',material='metal',position=[0,0,0],rotation=[0,0,0])=>({type:'cylinder',radius:r,length:l,axis,material,position,rotation});
const extrude=(points,depth,{holes=[],material='paintedMetal',position=[0,0,0],rotation=[0,0,0],bevel=0}={})=>({type:'extrude',points,depth,holes,material,position,rotation,bevel});
const plate=(w,h,d,options={})=>extrude(rect(w,h),d,options);
const annulus=(od,id,width,{material='metal',position=[0,0,0],axis='x'}={})=>({type:'lathe',points:[[id/2,-width/2],[od/2,-width/2],[od/2,width/2],[id/2,width/2],[id/2,-width/2]],rotation:axis==='x'?[0,0,PI/2]:axis==='z'?[PI/2,0,0]:[0,0,0],material,position});
const torus=(r,t,material='darkMetal',position=[0,0,0],rotation=[0,PI/2,0])=>({type:'torus',radius:r,tube:t,material,position,rotation});
const tube=(points,r,material='metal',segments=14)=>({type:'tube',points,radius:r,material,radialSegments:segments});
const arcShell=(length,radius,angle,thickness,segments=14,material='paintedMetal',position=[0,0,0])=>Array.from({length:segments},(_,i)=>{
  const da=angle/segments,a=-angle/2+da*(i+.5),chord=2*radius*Math.sin(Math.abs(da)/2);
  return box([length,thickness,chord],material,[position[0],position[1]+Math.sin(a)*radius,position[2]+Math.cos(a)*radius],[a,0,0]);
});
const arcShellHorizontal=(length,radius,angle,thickness,segments=14,material='paintedMetal',position=[0,0,0])=>Array.from({length:segments},(_,i)=>{
  const da=angle/segments,a=-angle/2+da*(i+.5),chord=2*radius*Math.sin(Math.abs(da)/2);
  return box([length,thickness,chord],material,[position[0],position[1]+radius-Math.cos(a)*radius,position[2]+Math.sin(a)*radius],[-a,0,0]);
});
const verticalArcBandPoints=(radius,angle,thickness,count=36)=>{
  const outer=radius+thickness/2,inner=radius-thickness/2;
  return[
    ...Array.from({length:count+1},(_,i)=>{const a=-angle/2+angle*i/count;return[outer*Math.cos(a)-radius,outer*Math.sin(a)];}),
    ...Array.from({length:count+1},(_,i)=>{const a=angle/2-angle*i/count;return[inner*Math.cos(a)-radius,inner*Math.sin(a)];}),
  ];
};
const horizontalArcBandPoints=(radius,angle,thickness,count=36)=>{
  const outer=radius+thickness/2,inner=radius-thickness/2;
  return[
    ...Array.from({length:count+1},(_,i)=>{const a=-angle/2+angle*i/count;return[outer*Math.sin(a),radius-outer*Math.cos(a)];}),
    ...Array.from({length:count+1},(_,i)=>{const a=angle/2-angle*i/count;return[inner*Math.sin(a),radius-inner*Math.cos(a)];}),
  ];
};
const barBetweenYZ=(y1,z1,y2,z2,width=6,depth=6,material='metal')=>{
  const dy=y2-y1,dz=z2-z1,length=Math.hypot(dy,dz);
  return box([depth,length,width],material,[0,(y1+y2)/2,(z1+z2)/2],[Math.atan2(dz,dy),0,0]);
};
const panelBetweenYZ=(length,y1,z1,y2,z2,thickness=5,material='paintedMetal')=>{
  const dy=y2-y1,dz=z2-z1,width=Math.hypot(dy,dz);
  return box([length,width,thickness],material,[0,(y1+y2)/2,(z1+z2)/2],[Math.atan2(dz,dy),0,0]);
};
const S=(views,assumptions,material,primitives,level='尺寸级')=>({views,assumptions,material,primitives,level});
const exact='标注尺寸只用于明确的主轮廓；未标板厚、孔径、圆角和内部连接仅按原格比例表达，不作加工依据。';
const mapDrawingPoints=(points,cx,cy,scale)=>points.map(([x,y])=>[(x-cx)*scale,(cy-y)*scale]);
const p68OuterEndScale=495/187;
const p68OuterEndOutline=mapDrawingPoints([
  [183,471],[224,462],[309,462],[309,480],[320,480],[320,532],[313,532],[313,557],[302,557],[302,601],[287,624],[303,649],[190,649],[190,573],[182,573],[184,551],[194,533],[197,513],[194,497],[186,483],[183,476]
],251,555.5,p68OuterEndScale);
const p68InnerEndScale=120/88;
const p68InnerEndOutline=mapDrawingPoints([
  [240,458],[267,452],[312,577],[254,610],[254,632],[220,632],[217,614],[247,597],[226,587],[210,573],[200,557],[202,535],[211,516],[222,496],[233,480],[240,476]
],254.5,542,p68InnerEndScale);
const p68InnerCurveBand=ringSectorPoints(123,118,.99,-.70,40).map(([u,v])=>[u-86.5,v-11.6]);
const p69MotorFlangeOutline=mapDrawingPoints([
  [80,328],[130,298],[182,268],[224,252],[260,251],[296,263],[350,297],[404,327],[404,385],[350,414],[299,446],[258,460],[224,461],[184,450],[130,418],[80,386]
],242,356,.8);
const p69ArrowLeft=mapDrawingPoints([
  [90,408],[147,356],[151,369],[181,362],[213,358],[246,359],[272,365],[289,358],[326,372],[360,391],[391,419],[348,414],[355,456],[322,430],[274,407],[267,394],[211,387],[160,392],[162,404]
],240,406,1);
const p69ArrowRight=mapDrawingPoints([
  [107,416],[155,391],[194,376],[217,370],[233,378],[270,377],[298,381],[340,395],[356,389],[406,449],[342,437],[338,425],[294,414],[238,407],[227,421],[192,429],[154,444],[139,458],[153,419]
],256,414,1);
const p71ArrowLeft=mapDrawingPoints([
  [101,395],[158,343],[162,352],[205,345],[247,344],[283,350],[300,344],[327,355],[355,369],[382,388],[403,407],[357,400],[366,443],[344,424],[316,406],[286,394],[276,380],[249,375],[216,374],[182,378],[169,382],[173,392]
],252,394,1);
const p71ArrowRight=mapDrawingPoints([
  [96,392],[123,374],[150,361],[177,352],[207,345],[224,353],[260,352],[291,355],[317,361],[341,373],[347,363],[397,425],[329,409],[331,399],[304,391],[276,385],[247,383],[226,384],[216,396],[188,401],[164,410],[127,433],[144,392]
],247,389,1);
const p72VoluteScale=205/(394-231);
const p72VoluteOutline=mapDrawingPoints([
  [231,194],[180,198],[137,217],[102,247],[76,289],[61,333],[61,375],[75,421],[101,463],[137,496],[180,522],[220,535],[260,534],[298,526],[386,526],[386,441],[356,441],[346,430],[365,398],[382,359],[384,318],[375,276],[351,239],[318,213],[278,199]
],231,354,p72VoluteScale);
const p72SuctionCoverScale=440/(445-129);
const p72SuctionCoverOutline=mapDrawingPoints([
  [129,430],[162,430],[164,395],[174,360],[193,332],[220,311],[252,298],[286,291],[324,296],[368,313],
  [413,313],[413,321],[445,321],[445,391],[413,391],[413,399],[382,399],[379,435],[365,465],[340,490],
  [310,504],[286,507],[162,507],[162,501],[129,501]
],287,399,p72SuctionCoverScale);
const p72SuctionCoverBand=ringSectorPoints(118,104,.55,3.35,44).map(([x,y])=>[x-12,y-14]);
const hollowDoor=(width,height,depth,{rib=false,topMounts=[],bottomMounts=[],sideMounts=[],lock=null}={})=>[
  box([width,height,2],'paintedMetal',[0,0,depth/2-1]),
  box([width,2,depth],'paintedMetal',[0,height/2-1,0]),box([width,2,depth],'paintedMetal',[0,-height/2+1,0]),
  box([2,height,depth],'paintedMetal',[-width/2+1,0,0]),box([2,height,depth],'paintedMetal',[width/2-1,0,0]),
  ...(rib?[box([width-8,12,4],'darkMetal',[0,-height*.10,depth/2+1])]:[]),
  ...topMounts.map(x=>box([28,8,5],'metal',[x,height/2-4,depth/2+2])),
  ...bottomMounts.map(x=>box([24,10,5],'metal',[x,-height/2+5,depth/2+2])),
  ...sideMounts.map(([x,y])=>box([10,34,5],'metal',[x,y,depth/2+2])),
  ...(lock?[box([18,18,6],'darkMetal',[lock[0],lock[1],depth/2+2])]:[])
];
const p73SealBulbOuter=[[-4.5,4.2],[-4.4,7],[-3.4,9],[-1.8,10.5],[1.8,10.5],[3.4,9],[4.4,7],[4.5,4.2]];
const p73SealBulbInner=[[-3.1,4.9],[-3,6.8],[-2.2,8.4],[-1.2,9],[1.2,9],[2.2,8.4],[3,6.8],[3.1,4.9]];
const p73SealClamp=[[-4.5,4.5],[4.5,4.5],[4.5,-10.5],[2.2,-10.5],[2.2,1.4],[-2.2,1.4],[-2.2,-10.5],[-4.5,-10.5]];
const leftPillarOutline=()=>{
  const points=[[-350,620],[350,620],[350,-305],[-5,-305],...arcPoints(-65,-350,70,.7,PI*2-.7,22),[350,-395],[350,-620],[-350,-620],[-350,-490],[-145,-490],...arcPoints(-185,-455,48,PI*1.18,PI*2.82,22),[-350,-420]];
  return points;
};
const mirrorX=points=>points.map(([x,y])=>[-x,y]).reverse();
const shieldSectionsLeft=()=>[
  [-292.75,66,.7],[-180,66,15],[-175,70,15],[120,70,15],[160,52,15],[180,18,15],[205,-12,15],[235,-32,15],[270,-40,15],[292.75,-42,15]
].map(([x,top,halfDepth])=>({x,points:[[-50,-halfDepth],[top,-halfDepth],[top,halfDepth],[-50,halfDepth]]}));
const mirrorLoftSections=sections=>sections.map(section=>({x:-section.x,points:section.points.map(([y,z])=>[y,z])})).sort((a,b)=>a.x-b.x);
const clippedGrid=(width,height,angle,spacing,z)=>{
  const dx=Math.cos(angle),dy=Math.sin(angle),nx=-dy,ny=dx;
  const maxOffset=(Math.abs(nx)*width+Math.abs(ny)*height)/2;
  const boxes=[];
  for(let offset=-maxOffset;offset<=maxOffset+.001;offset+=spacing){
    const px=nx*offset,py=ny*offset,intervals=[];
    if(Math.abs(dx)>.0001)intervals.push([(-width/2-px)/dx,(width/2-px)/dx].sort((a,b)=>a-b));
    if(Math.abs(dy)>.0001)intervals.push([(-height/2-py)/dy,(height/2-py)/dy].sort((a,b)=>a-b));
    const start=Math.max(...intervals.map(pair=>pair[0])),end=Math.min(...intervals.map(pair=>pair[1]));
    if(end-start<2)continue;
    const mid=(start+end)/2;
    boxes.push(box([end-start,1.5,1],'darkMetal',[px+dx*mid,py+dy*mid,z],[0,0,angle]));
  }
  return boxes;
};
const D={
  // 第65页：棉箱立柱、挡板和顶板。
  'jwf1206-p65-item-001':S(['主视图','右侧视图'],[exact,'主视图三处上部长圆孔为封闭孔；下部左右两个圆头槽分别贯通侧边。密集黑点按点焊/铆接标记处理，不误建为贯穿孔。'],'paintedMetal',[
    extrude(leftPillarOutline(),28,{holes:[capsuleHole(-175,425,78,255),capsuleHole(0,425,72,255),capsuleHole(180,335,82,285),hole(170,-120,12),capsuleHole(250,-505,28,28)],bevel:3}),
    box([28,1240,252],'darkMetal',[-336,0,-140]),box([700,28,252],'darkMetal',[0,-606,-140]),box([250,22,62],'metal',[215,-350,-165])
  ]),
  'jwf1206-p65-item-002':S(['主视图','左侧视图'],[exact,'与左立柱互为镜像；三处上部长圆孔封闭，下部圆头槽分别贯通相反侧边。'],'paintedMetal',[
    extrude(mirrorX(leftPillarOutline()),28,{holes:[capsuleHole(175,425,78,255),capsuleHole(0,425,72,255),capsuleHole(-180,335,82,285),hole(-170,-120,12),capsuleHole(-250,-505,28,28)],bevel:3}),
    box([28,1240,252],'darkMetal',[336,0,-140]),box([700,28,252],'darkMetal',[0,-606,-140]),box([250,22,62],'metal',[-215,-350,-165])
  ]),
  'jwf1206-p65-item-003':S(['长向主视图','端面图'],[exact,'长向图明确是1200×102开口框架，不是实心条板；端面50深，左端板上两通孔真实贯穿，中央分隔和上部附板属于实体。'],'paintedMetal',[
    box([1180,8,50],'paintedMetal',[0,47,0]),box([1180,8,50],'paintedMetal',[0,-47,0]),
    extrude(rect(50,102),10,{holes:[hole(0,-25,5),hole(0,25,5)],rotation:[0,PI/2,0],position:[-595,0,0]}),box([10,102,50],'paintedMetal',[595,0,0]),box([8,102,50],'darkMetal'),box([140,30,8],'metal',[0,36,29])
  ]),
  'jwf1206-p65-item-004':S(['俯视主图','反向俯视图','侧视折弯图'],[exact,'127是窄横臂总长，不是127×85整块板；85只对应双长圆孔安装耳板，右端薄板向下折54.5。'],'paintedMetal',[
    box([127,22,5],'paintedMetal'),box([5,22,54.5],'paintedMetal',[61,0,-27]),extrude(roundedRectPoints(52,85,8),5,{holes:[capsuleHole(0,-27,18,10),capsuleHole(0,27,18,10)],position:[-20,0,1]}),box([30,34,24],'darkMetal',[-48,0,-12]),box([18,28,12],'metal',[54.5,0,-8])
  ]),
  'jwf1206-p65-item-005':S(['俯视主图','反向俯视图','侧视折弯图'],[exact,'219.5水平臂与304.5竖臂组成L形焊合件；135只对应端部双孔安装板，不能铺满整个水平臂。'],'paintedMetal',[
    box([219.5,45,22],'darkMetal',[0,0,-11]),box([22,45,304.5],'darkMetal',[98.75,0,-163]),extrude(roundedRectPoints(36,135,5),5,{holes:[capsuleHole(0,-53,12,8),capsuleHole(0,53,12,8)],position:[-92,0,3]}),box([5,100,100],'paintedMetal',[109.75,0,-270])
  ]),
  'jwf1206-p65-item-006':S(['俯视主图','反向俯视图','侧视折弯图'],[exact,'149.5水平臂与304.5竖臂组成较短L形焊合件；双孔安装板宽135。'],'paintedMetal',[
    box([149.5,45,22],'darkMetal',[0,0,-11]),box([22,45,304.5],'darkMetal',[63.75,0,-163]),extrude(roundedRectPoints(36,135,5),5,{holes:[capsuleHole(0,-53,12,8),capsuleHole(0,53,12,8)],position:[-57,0,3]}),box([5,70,100],'paintedMetal',[74.75,0,-270])
  ]),
  'jwf1206-p65-item-007':S(['俯视主图','反向俯视图','侧视折弯图'],[exact,'127窄横臂在左端向下折104.5；85只对应双长圆孔安装耳板，折向与结合件（一）相反。'],'paintedMetal',[
    box([127,22,5],'paintedMetal'),box([5,22,104.5],'paintedMetal',[-61,0,-52]),extrude(roundedRectPoints(52,85,8),5,{holes:[capsuleHole(0,-27,18,10),capsuleHole(0,27,18,10)],position:[20,0,1]}),box([30,34,24],'darkMetal',[48,0,-12]),box([18,28,55],'metal',[-54.5,0,-75])
  ]),
  'jwf1206-p65-item-008':S(['长向正视图','俯视折弯图'],[exact,'1200×392顶板为薄板，长向正视只见窄边和两孔；俯视右端有带两孔的小折片，尺寸线不建模。'],'paintedMetal',[
    plate(1200,392,5,{holes:[hole(-520,160,5),hole(520,160,5)],rotation:[PI/2,0,0]}),box([1200,18,24],'darkMetal',[0,0,-187]),extrude(roundedRectPoints(42,34,4),7,{holes:[hole(-10,0,3),hole(10,0,3)],rotation:[PI/2,0,0],position:[555,3,-169]})
  ]),
  'jwf1206-p65-item-009':S(['长向正视图','俯视折弯图'],[exact,'1200×213前顶板为薄板，长向正视只见窄边和两孔；俯视右端小折片有两孔。'],'paintedMetal',[
    plate(1200,213,5,{holes:[hole(-520,80,5),hole(520,80,5)],rotation:[PI/2,0,0]}),box([1200,18,24],'darkMetal',[0,0,-98]),extrude(roundedRectPoints(42,34,4),7,{holes:[hole(-10,0,3),hole(10,0,3)],rotation:[PI/2,0,0],position:[555,3,-76]})
  ]),
  'jwf1206-p65-item-010':S(['主视图','右侧视图'],[exact,'233为主视最大宽、337.5为高；中央250高长圆孔真实贯穿，四个边孔为长圆孔，右视三根凸柱属于实体。'],'paintedMetal',[
    extrude([[-45,-168.75],[45,-168.75],[45,-145],[116.5,-145],[116.5,128],[85,128],[85,168.75],[-85,168.75],[-85,128],[-116.5,128],[-116.5,-145],[-45,-145]],5,{holes:[capsuleHole(0,0,70,250),capsuleHole(-108,-105,16,9),capsuleHole(108,-105,16,9),capsuleHole(-108,105,16,9),capsuleHole(108,105,16,9),hole(-60,-63,4),hole(60,-63,4),hole(-78,0,4),hole(78,0,4),hole(-60,105,4),hole(60,105,4)]}),
    ...[105,42,-105].map(y=>cyl(4,24,'z','metal',[0,y,-15]))
  ]),
  'jwf1206-p65-item-011':S(['主视图'],[exact,'276×100为金属圆角框和透明窗；四角为框体安装孔，窗面通气孔按原图四排30孔处理。'],'glass',[
    extrude(roundedRectPoints(276,100,8),5,{holes:[polyHole(roundedRectPoints(248,76,6)),hole(-112,-38,3),hole(112,-38,3),hole(-112,38,3),hole(112,38,3)]}),
    extrude(roundedRectPoints(244,72,5),3,{holes:[...[-18,-6,6,18].flatMap((y,row)=>Array.from({length:row===0||row===3?7:8},(_,i)=>hole(45+(i-(row===0||row===3?3:3.5))*15,y,2.3)))],material:'glass',position:[0,0,1]})
  ]),
  'jwf1206-p65-item-012':S(['主视图'],[exact,'135×25薄搭钩左端为圆头通孔，右端为从下边真实开口的回钩；尺寸和引出线不建模。'],'metal',[
    extrude([[-55,-12.5],[50,-12.5],[52,3],[55,7],[59,8],[61,5],[60,-12.5],[67.5,-12.5],[67.5,3],[66,8],[62,12.5],[-55,12.5],...arcPoints(-55,0,12.5,PI/2,PI*1.5,12).slice(1)],6,{holes:[hole(-50,0,5.5)],material:'metal',bevel:.6})
  ]),
  'jwf1206-p65-item-013':S(['主视图','侧向凸台图'],[exact,'70×85×2圆角薄板四角为长圆孔；中央34×34冲压凸台带竖向长槽，侧视凸台向同一侧抬高。'],'paintedMetal',[
    extrude(roundedRectPoints(70,85,5),2,{holes:[capsuleHole(-23,-30,18,8),capsuleHole(23,-30,18,8),capsuleHole(-23,30,18,8),capsuleHole(23,30,18,8)]}),
    extrude(roundedRectPoints(34,34,5),7,{holes:[capsuleHole(0,0,8,18)],position:[0,0,4],bevel:3})
  ]),

  // 第66页：护板、搭钩座和滤网。
  'jwf1206-p66-item-001':S(['侧向主视图','俯视图'],[exact,'585.5是总长、30是最大宽；右端主视轮廓连续下弯，俯视左端由尖端渐扩到30宽，不是等宽拉伸体。'],'paintedMetal',[
    {type:'loft',sections:shieldSectionsLeft(),capStart:true,capEnd:true,material:'paintedMetal'}
  ]),
  'jwf1206-p66-item-002':S(['侧向主视图','俯视图'],[exact,'右护板是左护板的纵向镜像：主视弯曲端和俯视渐尖端均换到左/右相反位置。'],'paintedMetal',[
    {type:'loft',sections:mirrorLoftSections(shieldSectionsLeft()),capStart:true,capEnd:true,material:'paintedMetal'}
  ]),
  'jwf1206-p66-item-003':S(['侧视主图','正端视图'],[exact,'50为水平底片总长，35为底面至耳片顶的总高，25为件宽；耳片上端双倒角且通孔沿50方向贯穿。'],'metal',[
    box([50,5,25],'metal',[0,2.5,0]),extrude([[-12.5,-17.5],[12.5,-17.5],[12.5,10],[8,17.5],[-8,17.5],[-12.5,10]],5,{holes:[hole(0,5,4)],material:'metal',rotation:[0,PI/2,0],position:[22.5,17.5,0]})
  ]),
  'jwf1206-p66-item-004':S(['轴向主视图'],[exact,'φ14只对应左端盘头最大直径；18为盘头基准到右端的总长。中段是圆柱台阶，右段平行细线为螺纹示意，不建成额外杆件。'],'metal',[
    cyl(7,2,'x','darkMetal',[-8,0,0]),{type:'cylinder',radiusTop:5.8,radiusBottom:7,length:1,axis:'x',material:'darkMetal',position:[-6.5,0,0]},cyl(5,5,'x','metal',[-4,0,0]),cyl(3.5,9,'x','metal',[3,0,0]),{type:'cylinder',radiusTop:2.7,radiusBottom:3.5,length:2,axis:'x',material:'metal',position:[8,0,0]}
  ]),
  'jwf1206-p66-item-005':S(['主视图'],[exact,'295×120圆角金属框四角是贯穿圆孔；中央95×55矩形开口内为双向斜纹金属网，网纹线只存在于开口后方。'],'metal',[
    extrude(roundedRectPoints(295,120,18),4,{holes:[hole(-98,-42,6.5),hole(98,-42,6.5),hole(-98,42,6.5),hole(98,42,6.5),slot(20,0,95,55)],material:'metal'}),
    ...clippedGrid(93,53,PI/4,7,-2.5).map(item=>({...item,position:[item.position[0]+20,item.position[1],item.position[2]]})),
    ...clippedGrid(93,53,-PI/4,7,-2).map(item=>({...item,position:[item.position[0]+20,item.position[1],item.position[2]]}))
  ]),

  // 第67页：打手弧板、给棉板、滤网箱和调节件。
  'jwf1206-p67-item-001':S(['长向主视图','端面图'],[exact,'1200长、206高的梯形薄壳由顶板、124.5宽底板和两块斜侧板组成；端面黑点按紧固标记处理，不把壳体做成实心棱柱。'],'paintedMetal',[
    box([1200,5,60],'paintedMetal',[0,100.5,0]),box([1200,5,124.5],'paintedMetal',[0,-100.5,0]),box([1200,209,5],'paintedMetal',[0,0,46],[ -.154,0,0]),box([1200,209,5],'paintedMetal',[0,0,-46],[.154,0,0]),box([8,206,5],'darkMetal',[0,0,64]),box([6,206,5],'metal',[-597,0,64]),box([6,206,5],'metal',[597,0,64])
  ]),
  'jwf1206-p67-item-002':S(['长向主视图','端面图'],['厂家只明示总长1200；未标端面尺寸，依端视的带刷毛横撑轮廓表达，不作加工依据。'],'paintedMetal',[
    box([1200,12,35],'paintedMetal',[0,44,0]),box([1200,10,35],'paintedMetal',[0,24,0]),box([1200,10,35],'darkMetal',[0,5,0]),
    box([500,22,24],'metal',[-310,-15,0]),box([500,22,24],'metal',[310,-15,0]),...[-470,-270,270,470].map(x=>cyl(5,30,'z','darkMetal',[x,-15,0])),
    ...Array.from({length:19},(_,i)=>box([7,38,3],'rubber',[-570+i*26,-45,0])),...Array.from({length:19},(_,i)=>box([7,38,3],'rubber',[102+i*26,-45,0])),
    ...[-596,596].map(x=>extrude([[-35,-42],[28,-38],[20,35],[-12,42],[-18,30],[-35,36],[-40,27],[-30,14],[-24,18],[-20,-32]],8,{holes:[hole(8,-8,9),hole(5,25,4)],rotation:[0,PI/2,0],position:[x,-5,0],material:'paintedMetal'}))
  ],'轮廓级'),
  'jwf1206-p67-item-003':S(['主视图','右端视图'],[exact,'1198×313外框内是大面积网眼板；端图的61是折边深度，不做成实心箱体。'],'paintedMetal',[
    extrude(rect(1198,313),5,{holes:[slot(0,0,1080,190),hole(-260,142,4),hole(-220,142,4),hole(220,142,4),hole(260,142,4)]}),box([1198,10,61],'darkMetal',[0,-151,-30]),
    box([1045,18,3],'darkMetal',[0,84,0]),box([1045,18,3],'darkMetal',[0,-84,0]),box([18,168,3],'darkMetal',[-531,0,0]),box([18,168,3],'darkMetal',[531,0,0]),
    ...Array.from({length:42},(_,i)=>box([3,16,3],'metal',[-510+i*25,84,1])),...Array.from({length:42},(_,i)=>box([3,16,3],'metal',[-510+i*25,-84,1]))
  ]),
  'jwf1206-p67-item-004':S(['长向主视图','端面图'],[exact,'1200长主腹板高154、端向折边深35；下缘两处圆孔是实际安装孔，中央双线为拼接缝，不误建为开口。'],'paintedMetal',[
    plate(1200,154,5,{holes:[hole(-390,-58,5),hole(390,-58,5)]}),box([1200,5,35],'paintedMetal',[0,-74,-17.5]),box([8,154,7],'darkMetal'),box([8,154,7],'metal',[-596,0,0]),box([8,154,7],'metal',[596,0,0]),box([40,38,18],'darkMetal',[-390,-56,-12]),box([40,38,18],'darkMetal',[390,-56,-12])
  ]),
  'jwf1206-p67-item-005':S(['长向主视图','工字形端面图'],[exact,'1160长调节架的端面是70高、30宽的工字型，两端有竖向长槽。'],'paintedMetal',[
    plate(1160,70,5,{holes:[capsuleHole(-520,0,10,48),capsuleHole(520,0,10,48)],position:[0,0,-12.5]}),box([1160,5,30],'paintedMetal',[0,32.5,0]),box([1160,5,30],'paintedMetal',[0,-32.5,0])
  ]),
  'jwf1206-p67-item-006':S(['长向主视图','端面图'],[exact,'1190×288×80为长箱式滤网组件；正面上缘有4个搭扣，中部是可通风的长网区。'],'paintedMetal',[
    extrude(rect(1190,288),6,{holes:[slot(0,-28,1040,58)],position:[0,0,40]}),box([1190,8,80],'darkMetal',[0,140,0]),box([1190,8,80],'darkMetal',[0,-140,0]),box([8,288,80],'paintedMetal',[-591,0,0]),box([8,288,80],'paintedMetal',[591,0,0]),box([1190,288,5],'paintedMetal',[0,0,-40]),
    ...[-450,-150,150,450].map(x=>box([32,28,14],'metal',[x,92,48])),...Array.from({length:43},(_,i)=>box([3,56,3],'darkMetal',[-505+i*24,-28,43]))
  ]),
  'jwf1206-p67-item-007':S(['主视图','右端折弯图'],[exact,'1200×464竖板在上缘向后折203形成L形，原模型折边放在下缘属方向错误；两侧三孔和顶折边孔均为实体孔。'],'paintedMetal',[
    plate(1200,464,6,{holes:[...[-180,0,180].flatMap(y=>[hole(-585,y,4),hole(585,y,4)])]}),extrude(rect(1200,203),6,{holes:[hole(-500,-65,4),hole(500,-65,4)],rotation:[PI/2,0,0],position:[0,232,101.5]}),box([8,464,10],'darkMetal')
  ]),
  'jwf1206-p67-item-008':S(['长向主视图','端面剖面图'],[exact,'1200长给棉板端面是R110内弧与R130外弧形成的曲板，不是平板。'],'paintedMetal',[
    extrude(verticalArcBandPoints(120,1.25,20),1200,{rotation:[0,PI/2,0],position:[0,0,-50]}),box([1200,16,36],'darkMetal',[0,-70,-30]),box([1200,12,28],'paintedMetal',[0,72,-30]),...[-500,-300,-100,100,300,500].map(x=>cyl(6,24,'z','metal',[x,-55,-12])),box([90,34,28],'darkMetal',[0,84,-28]),
    ...[-596,596].map(x=>extrude([[-42,58],[-20,74],[20,74],[20,62],[43,58],[48,20],[48,-34],[38,-40],[38,-50],[14,-58],[-6,-54],[-22,-64],[-45,-56],[-34,-30],[-28,0],[-30,30]],7,{holes:[hole(15,35,5),hole(0,10,4),hole(20,-15,4),hole(15,-42,4)],rotation:[0,PI/2,0],position:[x,0,0],material:'paintedMetal'}))
  ]),
  'jwf1206-p67-item-009':S(['长向主视图','弧形端面图'],[exact,'有效长920，中部是R130弧形薄壳；两端不是矩形耳板，而是带上、下两孔的弧边异形端板。'],'paintedMetal',[
    extrude(verticalArcBandPoints(130,1.8,8),900,{rotation:[0,PI/2,0],position:[0,0,-50]}),...[-457,457].map(x=>extrude([[-48,78],[12,78],[12,88],[30,88],[48,70],[48,-42],[-22,-96],[-42,-72],[-18,-52],[8,-24],[18,8],[18,38],[4,64]],7,{holes:[hole(25,55,6),hole(-30,-70,5)],rotation:[0,PI/2,0],position:[x,0,0],material:'paintedMetal'}))
  ]),
  'jwf1206-p67-item-010':S(['长向主视图','弧弦端面图'],[exact,'1200长下弧板端面弦宽139，中部为浅下凹弧，两端带孔平耳；端部小斜片属于折边，不是尺寸线。'],'paintedMetal',[
    extrude(horizontalArcBandPoints(150,.96,8),1160,{rotation:[0,PI/2,0]}),...[-596,596].map(x=>extrude([[-69,-18],[-69,15],[-55,15],[-35,7],[0,1],[35,7],[55,18],[62,26],[69,15],[69,-18]],7,{holes:[hole(-55,0,5),hole(55,0,5)],rotation:[0,PI/2,0],position:[x,0,0],material:'paintedMetal'})),box([1200,10,18],'darkMetal',[0,-18,0])
  ]),
  'jwf1206-p67-item-011':S(['主视图'],[exact,'475×115调节板两端为相向的梯形通孔，不是矩形孔；中间两孔为圆头水平长槽。'],'paintedMetal',[extrude(rect(475,115),5,{holes:[polyHole([[-195,-30],[-155,-12],[-155,12],[-195,30]]),polyHole([[155,-12],[195,-30],[195,30],[155,12]]),capsuleHole(-60,0,52,8),capsuleHole(60,0,52,8)]})]),
  'jwf1206-p67-item-012':S(['主视图','右侧机构图'],[exact,'58×20底座上有中央转轴、上置搭扣头和向下摆臂，不是普通矩形锁块。'],'darkMetal',[
    plate(58,20,4,{holes:[hole(-22,0,4),hole(22,0,4)]}),box([18,28,22],'darkMetal',[0,18,4]),box([28,5,18],'paintedMetal',[0,34,4]),
    box([28,4,70],'paintedMetal',[0,31,-25]),box([18,18,40],'darkMetal',[0,21,-4]),cyl(5,24,'x','metal',[0,22,0]),
    barBetweenYZ(19,5,-4,18,6,6),barBetweenYZ(-4,18,-22,35,6,6),box([6,24,5],'paintedMetal',[0,-22,38])
  ]),

  // 第68页：风道内外罩、转动臂、观察窗和气弹簧。
  'jwf1206-p68-item-001':S(['左视轴向图','正视轮廓图'],[exact,'110长、30宽转动臂为上下倒角板；上端是贯穿孔，下端为同轴三级轴套，38是轴套外端到板外面的偏置。'],'metal',[
    extrude([[-15,-45],[-8,-55],[8,-55],[15,-45],[15,45],[8,55],[-8,55],[-15,45]],8,{holes:[hole(0,35,7),hole(0,-37,7)],material:'metal'}),
    {...cyl(8,8,'z','metal',[0,-37,8]),segments:32},{...cyl(14,14,'z','darkMetal',[0,-37,19]),segments:8},{...cyl(9,8,'z','metal',[0,-37,30]),segments:32}
  ]),
  'jwf1206-p68-item-002':S(['主视图','右端轮廓图'],[exact,'1115长外罩端面495高，右端为上下两段内凹弧口的异形风道罩；正面两个长方开口保留。'],'paintedMetal',[
    extrude(rect(1115,270),5,{holes:[slot(-300,-80,300,70),slot(300,-80,300,70)],position:[0,-60,105]}),
    panelBetweenYZ(1115,115,105,247,25,5),panelBetweenYZ(1115,-155,105,-247,35,5),box([1115,5,155],'paintedMetal',[0,247,-50]),box([1115,5,145],'paintedMetal',[0,-247,-40]),
    ...[-554.5,554.5].map(x=>extrude(p68OuterEndOutline,6,{holes:[hole(-86,160,6),hole(-62,96,5),hole(-72,-62,5),hole(42,-218,6)],rotation:[0,PI/2,0],position:[x,0,0],material:'paintedMetal'})),
    box([1115,8,14],'darkMetal',[0,-152,112]),box([1115,8,14],'darkMetal',[0,118,112])
  ]),
  'jwf1206-p68-item-003':S(['长向主视图','右端轮廓图'],[exact,'1118长内罩主体是R120连续内凹曲壳，不是矩形盒体，也不用分段方块拼弧；两端为带三孔的异形支撑板。'],'paintedMetal',[
    extrude(p68InnerCurveBand,1106,{rotation:[0,PI/2,0]}),
    panelBetweenYZ(1106,122,-17,-48,-79,5),box([1106,7,28],'paintedMetal',[0,-120,30]),box([1106,7,24],'darkMetal',[0,114,-4]),
    ...[-556,556].map(x=>extrude(p68InnerEndOutline,6,{holes:[hole(-20,82,5),hole(20,35,4.5),hole(5,-35,4.5),hole(-23,-94,5)],rotation:[0,PI/2,0],position:[x,0,0],material:'paintedMetal'}))
  ]),
  'jwf1206-p68-item-004':S(['轴向全剖视图'],[exact,'右端是φ8×51轴杆，左端是网纹旋钮；中间包含弹簧、滑套和挡圈。'],'darkMetal',[
    {...cyl(13,10,'x','darkMetal',[-20.5,0,0]),segments:32},{type:'cylinder',radiusTop:8,radiusBottom:11,length:6,axis:'x',material:'metal',position:[-12.5,0,0]},cyl(3,35,'x','metal',[-1,0,0]),{...cyl(9,22,'x','darkMetal',[1.5,0,0]),segments:32},cyl(4,13,'x','metal',[19,0,0]),
    annulus(24,9,3,{position:[-9,0,0],material:'metal'}),...Array.from({length:7},(_,i)=>torus(6,0.7,'metal',[-7+i*3,0,0]))
  ]),
  'jwf1206-p68-item-005':S(['主视图','右侧折边图'],[exact,'100×276竖向观察窗外框和中央窗口都有圆角；四个安装孔位于左右边框上下部，窗面是透明材料，侧视的小台阶为压边。'],'glass',[
    extrude(roundedRectPoints(100,276,10),5,{holes:[polyHole(roundedRectPoints(70,230,8)),hole(-40,-105,3.5),hole(40,-105,3.5),hole(-40,105,3.5),hole(40,105,3.5)],material:'paintedMetal',bevel:1}),
    extrude(roundedRectPoints(68,228,7),3,{material:'glass',position:[0,0,-1]}),box([90,5,8],'darkMetal',[0,132,-4]),box([90,5,8],'darkMetal',[0,-132,-4])
  ]),
  'jwf1206-p68-item-006':S(['轴向半剖视图'],[exact,'带肩轴衬内孔φ20，主体外径φ23、肩部φ30，11.5是包含肩部的总长，不能在11.5之外再叠加法兰厚度。'],'metal',[{type:'lathe',points:[[10,-5.75],[11.5,-5.75],[11.5,1.8],[11.7,2.8],[12.3,3.7],[13.5,4.5],[15,5],[15,5.75],[10,5.75],[10,-5.75]],rotation:[0,0,PI/2],material:'metal',flatShading:false}]),
  'jwf1206-p68-item-007':S(['厂家外形主视图'],['厂家未标几何尺寸；仅按原格细长筒体、上端90度球铰和下端U形铰头表达。'],'darkMetal',[
    {type:'lathe',points:[[0,-120],[18,-120],[23,-115],[25,-105],[25,105],[23,115],[18,120],[0,120]],material:'darkMetal',flatShading:false},{...cyl(14,18,'y','metal',[0,128,0]),segments:32},{type:'lathe',points:[[0,120],[16,120],[23,126],[27,138],[26,148],[18,157],[0,157]],material:'metal',flatShading:false},
    cyl(8,34,'x','metal',[17,142,0]),cyl(5,44,'x','metal',[52,142,0]),annulus(18,10,5,{axis:'x',position:[31,142,0],material:'darkMetal'}),
    cyl(6,65,'y','metal',[0,-152.5,0]),box([30,12,16],'metal',[0,-191,0]),box([7,38,16],'metal',[-11.5,-210,0]),box([7,38,16],'metal',[11.5,-210,0]),cyl(4,30,'z','darkMetal',[0,-205,0])
  ],'轮廓级'),

  // 第69页：给棉罗拉、法兰、密封圈和左右箭头牌。
  'jwf1206-p69-item-001':S(['轴向全剖视图'],[exact,'总长1439，辊体有效长1191；左端为多级阶梯轴，右端为内嵌轴头。厂家未标辊径和各轴径，按同一轴向图内辊体长径比例表达，不作加工依据。'],'darkMetal',[
    annulus(520,300,1191,{material:'darkMetal'}),cyl(45,1439,'x','metal'),annulus(500,90,18,{position:[-586,0,0],material:'metal'}),annulus(480,90,85,{position:[570,0,0],material:'metal'}),
    cyl(45,70,'x','metal',[-684.5,0,0]),cyl(64,35,'x','metal',[-632,0,0]),cyl(89,15,'x','darkMetal',[-607,0,0]),
    cyl(65,35,'x','darkMetal',[613,0,0]),cyl(50,70,'x','metal',[665.5,0,0]),cyl(35,20,'x','darkMetal',[709.5,0,0])
  ]),
  'jwf1206-p69-item-002':S(['轴向全剖视图'],[exact,'橡胶密封圈外径φ158、内径φ128、轴向宽16。'],'rubber',[annulus(158,128,16,{material:'rubber'})]),
  'jwf1206-p69-item-003':S(['正视外形图'],[exact,'260是左右最大宽；外廓是上下弧面过渡的梭形电机法兰，中心圆孔外有8个圆周孔和水平端孔。'],'metal',[extrude(p69MotorFlangeOutline,12,{holes:[hole(0,0,38),hole(0,50.4,4.8),hole(36,35.2,4.8),hole(50.4,-.8,4.8),hole(39.2,-30.4,4.8),hole(0,-51.2,4.8),hole(-40.8,-30.4,4.8),hole(-50.4,-.8,4.8),hole(-36,35.2,4.8),hole(-114.4,-.8,6.4),hole(113.6,-.8,6.4)],material:'metal'})]),
  'jwf1206-p69-item-004':S(['正视图'],[exact,'左法兰外径φ264；中央轴孔与凸肩分开，外侧包含8个内圆孔、4个对角小孔、水平端孔及上部不对称安装孔。'],'metal',[
    extrude(circlePoints(132),14,{holes:[hole(0,0,22),...Array.from({length:8},(_,i)=>hole(Math.cos(i*PI/4)*52,Math.sin(i*PI/4)*52,8)),...Array.from({length:4},(_,i)=>hole(Math.cos(i*PI/2+PI/4)*106,Math.sin(i*PI/2+PI/4)*106,4)),hole(-115,0,5.5),hole(115,0,5.5),hole(0,106,5),hole(-22,105,8)],material:'metal'}),
    annulus(76,44,10,{axis:'z',position:[0,0,10],material:'darkMetal'})
  ]),
  'jwf1206-p69-item-005':S(['正视图'],[exact,'右法兰外径φ264，中央是带凸肩的大圆孔；四个对角孔、上下轴线孔和左上大孔均按原格保留。'],'metal',[
    extrude(circlePoints(132),16,{holes:[hole(0,0,40),...[-1,1].flatMap(x=>[-1,1].map(y=>hole(x*76,y*75,4))),hole(0,106,5),hole(0,-106,5),hole(-22,105,8)],material:'metal'}),
    annulus(100,80,24,{axis:'z',position:[0,0,14],material:'darkMetal'})
  ]),
  'jwf1206-p69-item-006':S(['正视轮廓图'],['厂家未标箭头牌尺寸；左牌的上弧、两端尖角、左端回钩和右下长尖角均按原格独立取点。'],'paintedMetal',[extrude(p69ArrowLeft,3,{bevel:.5})],'轮廓级'),
  'jwf1206-p69-item-007':S(['正视轮廓图'],['厂家未标箭头牌尺寸；右牌不按左牌简单镜像，其上缘折点、右端尖角和左下长尖角分别按原格独立取点。'],'paintedMetal',[extrude(p69ArrowRight,3,{bevel:.5})],'轮廓级'),

  // 第70页：打手、带轮、底板、轴承座和轴套。
  'jwf1206-p70-item-001':S(['轴向全剖视图','端视图'],[exact,'总长1349；厂家未标筒体直径和有效长，依同一原格的长径比表达。中部为空心圆筒，两端是内缩端盘与轴头，外周均布纵向打手条。'],'darkMetal',[
    annulus(480,420,990,{material:'darkMetal'}),cyl(20,1349,'x','metal'),
    annulus(440,40,58,{position:[-466,0,0],material:'metal'}),annulus(300,40,72,{position:[-445,0,0],material:'darkMetal'}),
    annulus(440,40,58,{position:[466,0,0],material:'metal'}),annulus(300,40,72,{position:[445,0,0],material:'darkMetal'}),
    ...Array.from({length:12},(_,i)=>box([990,18,10],'metal',[0,Math.cos(i*PI/6)*249,Math.sin(i*PI/6)*249],[i*PI/6,0,0]))
  ]),
  'jwf1206-p70-item-002':S(['轴向剖视图','正视图'],[exact,'打手带轮外径φ205、轴向宽50；原图正视为左右两个大腰形开口和上下两个窄长开口，不是三辐条轮。'],'darkMetal',[
    annulus(205,175,50,{material:'darkMetal'}),annulus(65,38,50,{material:'metal'}),
    extrude(circlePoints(87.5),12,{holes:[hole(0,0,19),capsuleHole(-57,0,36,72),capsuleHole(57,0,36,72),capsuleHole(0,55,12,43),capsuleHole(0,-55,12,43)],material:'paintedMetal',rotation:[0,PI/2,0]})
  ]),
  'jwf1206-p70-item-003':S(['轴向主视图'],[exact,'M10×90为环眼活节螺栓；90从环眼中心线量至杆端。左端是带通孔的环眼，环眼与φ10杆身直接过渡，右端的平行线是螺纹示意。'],'metal',[cyl(5,79,'x','metal',[5.5,0,0]),torus(8,4,'metal',[-45,0,0],[0,0,0])]),
  'jwf1206-p70-item-004':S(['轴向剖视图','正视图'],[exact,'φ117×50电机带轮由右侧全径轮盘、左侧轮毂和中间过渡台阶组成；正视中心孔、键槽及水平两小孔分开表达。'],'darkMetal',[
    extrude(circlePoints(58.5),29,{holes:[hole(0,0,12),hole(-18,0,3),hole(18,0,3)],material:'darkMetal',rotation:[0,PI/2,0],position:[10.5,0,0]}),
    annulus(56,24,21,{position:[-14.5,0,0],material:'metal'}),annulus(72,24,8,{position:[-2,0,0],material:'metal'})
  ]),
  'jwf1206-p70-item-005':S(['轴向剖视图','正视图'],[exact,'φ98×50电机带轮与φ117件不只是缩放；保留小直径右轮盘、左轮毂、台阶及水平两面孔。'],'darkMetal',[
    extrude(circlePoints(49),29,{holes:[hole(0,0,11),hole(-16,0,2.8),hole(16,0,2.8)],material:'darkMetal',rotation:[0,PI/2,0],position:[10.5,0,0]}),
    annulus(50,22,21,{position:[-14.5,0,0],material:'metal'}),annulus(64,22,8,{position:[-2,0,0],material:'metal'})
  ]),
  'jwf1206-p70-item-006':S(['主视图','右侧折弯图'],[exact,'主板276×223，左上角倒角；原图共5个孔，为左上单孔和中部2×2孔。两条竖向折边向后折深50，不是底边向下折。'],'paintedMetal',[
    extrude([[-138,-111.5],[138,-111.5],[138,111.5],[-125,111.5],[-138,98.5]],5,{holes:[hole(-112,91,5),hole(-50,53,4),hole(58,53,4),hole(-50,-78,4),hole(58,-78,4)]}),
    extrude([[0,111.5],[-20,111.5],[-20,-62],[-43,-78],[-50,-74],[-50,-88],[-43,-96],[-20,-111.5],[0,-111.5]],5,{holes:[hole(-36,-88,6)],material:'darkMetal',rotation:[0,PI/2,0],position:[-135,0,0]}),
    extrude([[0,111.5],[-20,111.5],[-20,-62],[-43,-78],[-50,-74],[-50,-88],[-43,-96],[-20,-111.5],[0,-111.5]],5,{holes:[hole(-36,-88,6)],material:'darkMetal',rotation:[0,PI/2,0],position:[135,0,0]})
  ]),
  'jwf1206-p70-item-007':S(['主视图','左侧视图'],[exact,'112高、80宽立板底部九十度折出50深底脚；上部两角倒角并带单孔。底脚位于XZ平面，不再误作立板的加厚块。'],'paintedMetal',[extrude([[-40,-56],[40,-56],[40,42],[30,56],[-30,56],[-40,42]],6,{holes:[hole(0,38,8)]}),box([80,6,50],'darkMetal',[0,-53,-25])]),
  'jwf1206-p70-item-008':S(['轴向剖视图','端视图'],[exact,'φ20×47.5为总长主体；原图左端是开口盲孔的空心段，中部φ20台阶和右端小台阶同轴。原格未明示偏心距，不臆造偏置。'],'metal',[
    {type:'lathe',points:[[6,-23.75],[9,-23.75],[9,-4],[10,-4],[10,13],[8,13],[8,23.75],[0,23.75],[0,-10],[3,-11],[5,-14],[6,-18],[6,-23.75]],rotation:[0,0,PI/2],material:'metal'}
  ]),
  'jwf1206-p70-item-009':S(['主视图','侧视图'],[exact,'80×30×3长条板四角均倒角；中间大孔与上下两小孔同轴排列，不是单侧倒角。'],'metal',[extrude([[-9,-40],[9,-40],[15,-34],[15,34],[9,40],[-9,40],[-15,34],[-15,-34]],3,{holes:[hole(0,0,7),hole(0,-27,4),hole(0,27,4)],material:'metal'})]),
  'jwf1206-p70-item-010':S(['轴向剖视图','正视图'],[exact,'φ145×10薄法兰中央为大孔，圆周上均布4个安装孔。'],'metal',[extrude(circlePoints(72.5),10,{holes:[hole(0,0,44),...Array.from({length:4},(_,i)=>hole(Math.cos(i*PI/2)*58,Math.sin(i*PI/2)*58,4))],material:'metal',rotation:[0,PI/2,0]})]),
  'jwf1206-p70-item-011':S(['轴向剖视图','正视图'],[exact,'轴承座外径φ135、轴向宽22.5；原图是四个对角大孔加上下轴线两小孔，不是6个等径圆周孔。中央轴承孔保留前后台阶和挡肩。'],'darkMetal',[
    extrude(circlePoints(67.5),22.5,{holes:[hole(0,0,39),...[-1,1].flatMap(x=>[-1,1].map(y=>hole(x*39,y*39,6))),hole(0,55,3),hole(0,-55,3)],material:'darkMetal',rotation:[0,PI/2,0]}),
    annulus(95,78,30,{material:'metal',position:[3,0,0]})
  ]),
  'jwf1206-p70-item-012':S(['轴向全剖视图'],[exact,'橡胶密封圈外径φ190、内径φ160、轴向宽14。'],'rubber',[annulus(190,160,14,{material:'rubber'})]),
  'jwf1206-p70-item-013':S(['轴向半剖视图'],[exact,'型号15×17表达φ15内孔和17总长；主体外径φ17、端肩外径φ23。肩部厚度已包含在17总长内。'],'metal',[annulus(17,15,15,{material:'metal',position:[-1,0,0]}),annulus(23,15,2,{material:'darkMetal',position:[7.5,0,0]})]),
  'jwf1206-p70-item-014':S(['轴向半剖视图'],[exact,'型号20×11.5表达φ20内孔和11.5总长；主体外径φ23、端肩外径φ30。肩部厚度已包含在11.5总长内。'],'metal',[annulus(23,20,9.5,{material:'metal',position:[-1,0,0]}),annulus(30,20,2,{material:'darkMetal',position:[4.75,0,0]})]),

  // 第71页：左右箭头牌单独原格。
  'jwf1206-p71-item-001':S(['正视轮廓图'],['原格未标尺寸；左牌按厂家自身轮廓取点，保留左箭尖、上缘双折点、中部下凹和右下长尖角。'],'paintedMetal',[extrude(p71ArrowLeft,3,{bevel:.5})],'轮廓级'),
  'jwf1206-p71-item-002':S(['正视轮廓图'],['原格未标尺寸；右牌按厂家自身轮廓取点，左下长尖、顶部折点、右上小折角和右箭尖均与左牌不同。'],'paintedMetal',[extrude(p71ArrowRight,3,{bevel:.5})],'轮廓级'),

  // 第72页：吸风罩、蜗壳、叶轮和垫圈。
  'jwf1206-p72-item-001':S(['正视轮廓图'],[exact,'440是左端接口到右端的总长，左接口为φ96；左入口位于环罩中心下方，右上出口与C形环罩切向连续。厂家未标轴向深度，只作轮廓级。'],'paintedMetal',[
    extrude(p72SuctionCoverOutline,64,{bevel:2}),
    extrude(p72SuctionCoverBand,4,{material:'darkMetal',position:[0,0,34]})
  ],'轮廓级'),
  'jwf1206-p72-item-002':S(['正视图'],[exact,'205是蜗壳中心线至右端出风口长；外廓按厂家偏心蜗旋壳与右下切向出口取点，中央圆形进风法兰含4孔。轴向深度未标，只作轮廓级。'],'paintedMetal',[
    extrude(p72VoluteOutline,65,{holes:[hole(0,0,64)],bevel:3}),
    extrude(circlePoints(102),18,{holes:[hole(0,0,65),hole(-59,-58,4),hole(59,-58,4),hole(-59,58,4),hole(59,58,4)],position:[0,0,38]}),
    plate(55,82,8,{holes:[hole(0,-26,5),hole(0,26,5)],position:[205,-86,0],rotation:[0,PI/2,0]})
  ],'轮廓级'),
  'jwf1206-p72-item-003':S(['正视图'],[exact,'外缘φ300、叶片有效直径φ290；16片叶片按原格同向后弯曲线建立，不再用两段直条代替。厂家未标叶轮轴向深度，只作轮廓级。'],'paintedMetal',[
    annulus(300,290,18,{axis:'z',material:'darkMetal'}),annulus(42,16,24,{axis:'z',material:'metal'}),
    ...Array.from({length:16},(_,i)=>extrude(spiralBladePoints(22,145,.64,6),12,{material:'paintedMetal',rotation:[0,0,i*PI/8+.25]}))
  ],'轮廓级'),
  'jwf1206-p72-item-004':S(['轴向剖视图'],[exact,'挡圈外径φ36、总轴向宽9；左侧小轮毂、中央通孔和右侧沉孔台阶按同一剖视连续回转，不额外加长。'],'metal',[
    {type:'lathe',points:[[5,-4.5],[8,-4.5],[8,-3.5],[18,-3.5],[18,4.5],[7,4.5],[7,0],[5,0],[5,-4.5]],rotation:[0,0,PI/2],material:'metal'}
  ]),
  'jwf1206-p72-item-005':S(['正视图'],[exact,'φ25×1调节垫圈外圆是完整闭合圆；上部矩形部分是中心孔的键槽式扩孔，不贯通外圆。'],'metal',[extrude(circlePoints(12.5),1,{holes:[polyHole(keyedBorePoints(8.2,2.75,10.3))],material:'metal'})]),
  'jwf1206-p72-item-006':S(['正视图'],[exact,'φ140×1.5垫片的上下为φ140圆弧、左右切平到安装宽120；中大孔外有4个对角小孔，不是六边形板。'],'metal',[extrude(verticalFlatCirclePoints(70,61.3),1.5,{holes:[hole(0,0,44),hole(-41,-41,3.4),hole(41,-41,3.4),hole(-41,41,3.4),hole(41,41,3.4)],material:'metal'})]),
  'jwf1206-p72-item-007':S(['正视图'],[exact,'φ25×0.5垫片外圆闭合；上部矩形部分是内孔键槽，与1mm件轮廓相同，厚度为0.5。'],'metal',[extrude(circlePoints(12.5),.5,{holes:[polyHole(keyedBorePoints(8.2,2.75,10.3))],material:'metal'})]),
  'jwf1206-p72-item-008':S(['正视图'],[exact,'60Hz叶轮外缘φ300，叶片有效直径φ240；外圈因此是120至150半径的宽环，16片后弯叶片在φ240内独立建立。轴向深度未标，只作轮廓级。'],'paintedMetal',[
    annulus(300,240,18,{axis:'z',material:'darkMetal'}),annulus(42,16,24,{axis:'z',material:'metal'}),
    ...Array.from({length:16},(_,i)=>extrude(spiralBladePoints(22,120,.64,6),12,{material:'paintedMetal',rotation:[0,0,i*PI/8+.25]}))
  ],'轮廓级'),

  // 第73页：门板、门锁、铰链、拉绳和橡胶密封条。
  'jwf1206-p73-item-001':S(['主视图','右侧视图'],[exact,'1270×438.5×30前门是薄板折弯的中空箱形门，不是30厚实心板；中部横向加强折边、上缘两个安装位和下部锁点按原格比例表达。'],'paintedMetal',hollowDoor(1270,438.5,30,{rib:true,topMounts:[-490,490],bottomMounts:[0]})),
  'jwf1206-p73-item-002':S(['主视图','右侧视图'],[exact,'1270×795×30后门按薄板面板和四周30深折边组成中空箱体，上缘两个安装位及下部锁点按原格表达。'],'paintedMetal',hollowDoor(1270,795,30,{topMounts:[-525,525],bottomMounts:[0]})),
  'jwf1206-p73-item-003':S(['轴向全剖视图'],[exact,'52约束拨片/门板基准至右端；同轴中空锁套、中心杆、左端螺母、右端多级压圈与方头分别建立，剖面白区是孔腔。径向分级未标，只作轮廓级。'],'darkMetal',[
    annulus(24,10,34,{material:'darkMetal',position:[-2,0,0]}),cyl(4.5,52,'x','metal',[0,0,0]),
    cyl(9,6,'x','metal',[-29,0,0]),annulus(28,10,5,{material:'metal',position:[18,0,0]}),annulus(32,10,5,{material:'darkMetal',position:[23,0,0]}),
    box([8,17,17],'darkMetal',[29,0,0]),extrude([[-26,7],[-17,7],[-15,-25],[-20,-33],[-26,-33]],6,{material:'paintedMetal',position:[0,0,0]})
  ],'轮廓级'),
  'jwf1206-p73-item-004':S(['主视图'],[exact,'630×450只约束正面矩形门板、右侧上下安装位和左中锁点；深度、折边与板厚不可知，仅作轮廓级。'],'paintedMetal',[plate(630,450,4),box([10,32,6],'metal',[312,155,1]),box([10,32,6],'metal',[312,-155,1]),box([18,18,6],'darkMetal',[-275,0,1])],'轮廓级'),
  'jwf1206-p73-item-005':S(['轴向主视图'],[exact,'φ14×18挂钩螺钉是同轴阶梯紧固件，名称不代表图中有弯钩；左端薄圆头、中段肩部和右端螺纹杆分别建立，螺纹细线不建实体。'],'metal',[cyl(7,2,'x','darkMetal',[-8,0,0]),cyl(5,6,'x','metal',[-4,0,0]),cyl(3.6,10,'x','metal',[4,0,0])]),
  'jwf1206-p73-item-006':S(['轴向全剖视图'],[exact,'φ32×35拉手由φ符号和中心线证明为回转中空杯体：底部大孔敞开、顶部收为小贯通孔；纠正旧模型误做U形线性挤出件。'],'rubber',[
    {type:'lathe',points:[[11.5,-17.5],[16,-17.5],[16,10],[15.5,14],[13,16.8],[10,17.5],[2.5,17.5],[2.5,13.5],[6.5,13.5],[9.5,12],[11.5,9],[11.5,-17.5]],material:'rubber'}
  ]),
  'jwf1206-p73-item-007':S(['厂家主视简化图'],['识图闸门阻断：断裂符号不能当真实断口，拉头另有轮廓省略，完整长度、拉头闭合轮廓和深度均不可知；现存几何仅为旧展示占位，不纳入本页3D验收。'],'rubber',[tube([[0,-170,0],[2,-80,0],[-2,20,0],[0,170,0]],4,'rubber',12),box([45,38,18],'darkMetal',[0,-190,0])],'轮廓级'),
  'jwf1206-p73-item-008':S(['主视图','右端视图'],[exact,'φ28锁头、36水平曲柄范围和中心至拨柄顶45由两个视图共同约束；锁头中央为方形驱动孔，曲柄向右上折弯后连接竖向扁平拨柄。'],'darkMetal',[
    extrude(circlePoints(14),8,{holes:[polyHole(rect(8,8))],material:'darkMetal',rotation:[0,PI/2,0],position:[-14,0,0]}),
    cyl(10,7,'x','metal',[-6.5,0,0]),cyl(7,9,'x','darkMetal',[1.5,0,0]),cyl(4,7,'x','metal',[9.5,0,0]),
    tube([[10,0,0],[14,4,0],[23,7,0],[30,10,0],[30,27,0]],2.6,'metal',12),
    extrude([[-10,-14],[10,-14],[7,14],[-7,14]],6,{material:'paintedMetal',rotation:[0,PI/2,0],position:[30,36,0]})
  ]),
  'jwf1206-p73-item-009':S(['厂家三视图（方向待核）'],['识图闸门阻断：三个视图未标方向，装配遮挡关系不能仅凭略图唯一闭合，且除38外无尺寸；现存几何仅为旧展示占位，不纳入本页3D验收。'],'darkMetal',[box([45,38,24],'darkMetal'),cyl(6,55,'y','metal',[15,0,0]),box([12,40,10],'metal',[28,-18,-8],[0,0,-.45]),box([26,12,9],'paintedMetal',[38,-30,-8]),cyl(4,18,'z','metal',[-15,18,0]),cyl(4,18,'z','metal',[-15,-18,0])],'轮廓级'),
  'jwf1206-p73-item-010':S(['厂家三视图（方向待核）'],['识图闸门阻断：可确认与TF2237为对向件，但三个视图的正式方向和前后装配关系仍不唯一；现存几何仅为旧展示占位，不纳入本页3D验收。'],'darkMetal',[box([45,38,24],'darkMetal'),cyl(6,55,'y','metal',[-15,0,0]),box([12,40,10],'metal',[-28,-18,-8],[0,0,.45]),box([26,12,9],'paintedMetal',[-38,-30,-8]),cyl(4,18,'z','metal',[15,18,0]),cyl(4,18,'z','metal',[15,-18,0])],'轮廓级'),
  'jwf1206-p73-item-011':S(['截面剖视图'],[exact,'9×21只控制截面：上部中空泡形管、下部向下开口U形夹持槽及槽内左右交错倒齿均按同一截面连续挤出；132dm是单机长度用量，展示段长度不作交付长度。'],'rubber',[
    extrude(p73SealBulbOuter,35,{holes:[polyHole(p73SealBulbInner)],material:'rubber'}),extrude(p73SealClamp,35,{material:'rubber'}),
    extrude([[-2.2,-1.0],[.2,-3.1],[-2.2,-4.3]],35,{material:'rubber'}),extrude([[2.2,-3.8],[-.2,-5.9],[2.2,-7.1]],35,{material:'rubber'}),
    extrude([[-2.2,-6.6],[.2,-8.3],[-2.2,-9.3]],35,{material:'rubber'})
  ]),
};

function source(part,definition){return{page:part.page,item:part.item,recordKey:part.recordKey,code:part.code,nameZh:part.name,nameEn:part.nameEn,quantity:{value:part.quantity,unit:part.quantityUnit,meaning:part.quantityMeaning},dimensions:part.dims,sourceCrop:part.sourceCrop,sourceVector:part.sourceVector,views:definition.views,assumptions:definition.assumptions};}
export function createJwf1206P65P73Spec(part){const definition=D[part.recordKey];if(!definition)throw new Error('JWF1206第65—73页缺少逐格建模：'+part.recordKey);return{level:definition.level,material:definition.material,source:source(part,definition),primitives:definition.primitives};}
export const jwf1206P65P73RebuildKeys=Object.freeze(Object.keys(D));
export default createJwf1206P65P73Spec;
