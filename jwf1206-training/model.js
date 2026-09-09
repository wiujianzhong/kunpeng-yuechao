import * as T from 'three';

// 本轮采用用户剖视图的平面比例；深度为教学补齐，不作为厂家尺寸。
export const S=.645/163;
export const xy=(x,y,z=0)=>[(x-696)*S,(751-y)*S+.08,z];
export const sections=['机架与外罩','喂棉与开松','三刺辊分梳','锡林与盖板','道夫与成条','传动与吸风','圈条机构'];
export const descriptions=[
  '薄板罩壳、底梁和横撑共同组成机架。剖开展示移除近侧罩板，保留后侧结构。',
  '松散棉进入棉箱，给棉罗拉定量喂入，开松打手松解棉块，下棉箱形成连续棉层。',
  '给棉罗拉握持棉层，三只刺辊逐级开松、分梳和转移；除尘刀、预分梳板与吸口配合清除杂质。',
  '锡林表面针布携带纤维经过固定盖板及回转盖板区，反复分梳，使纤维更伸直、平行。',
  '道夫接取纤维形成薄棉网。剥棉与轧辊输出棉网，集束器将棉网收拢，大压辊压成棉条。',
  '吸风罩和管路收集梳理落棉；电机通过带轮驱动各机构。背侧传动按教学需要简化。',
  '棉条经导条架进入圈条盘，旋转的偏心出口与条筒运动配合，将棉条有规律地铺放入筒。'
];

export function createModel(){
  const root=new T.Group();root.name='梳棉机_参考图剖视重建';
  const parts=[],rotors=[],flats=[],caps=[],belts=[];
  // 面向出条端时右手侧为 -Z；核心梳理宽度不变，罩壳向两侧扩展。
  const sideNear=1.04,sideDrive=-1.40,caseCenter=(sideNear+sideDrive)/2,caseWidth=sideNear-sideDrive;
  const coilerOffset=new T.Vector3(.30,0,-1.60);
  const cxy=(x,y,z=0)=>new T.Vector3(...xy(x,y,z)).add(coilerOffset).toArray();
  const colors={paint:0xb7bdb9,light:0xd0d4cf,steel:0x79837e,rim:0xb7bfba,dark:0x343b39,black:0x151c1a,green:0x52aa00,interior:0x69716f,fiber:0xeec675,rubber:0x232725};
  const materials={};
  for(const [key,color] of Object.entries(colors))materials[key]=new T.MeshStandardMaterial({color,metalness:['steel','rim'].includes(key)?.65:.16,roughness:key==='rim'?.3:.57,envMapIntensity:.40});
  const needleCanvas=document.createElement('canvas');needleCanvas.width=512;needleCanvas.height=256;const nc=needleCanvas.getContext('2d');nc.fillStyle='#78807b';nc.fillRect(0,0,512,256);
  for(let y=0;y<256;y+=5)for(let x=0;x<512;x+=7){nc.fillStyle='#c1c7c1';nc.fillRect(x+(y%10?3:0),y,1,3);nc.fillStyle='#454c47';nc.fillRect(x+1+(y%10?3:0),y+1,1,3);}
  const needle=new T.CanvasTexture(needleCanvas);needle.wrapS=needle.wrapT=T.RepeatWrapping;needle.repeat.set(4,2);needle.colorSpace=T.SRGBColorSpace;
  materials.needle=new T.MeshStandardMaterial({map:needle,color:0xa6ada4,metalness:.5,roughness:.76,bumpMap:needle,bumpScale:.001});
  function part(name,section,pos,vector=[0,.15,0],kind='structure',desc){
    const g=new T.Group();g.name=`P${String(parts.length+1).padStart(3,'0')}_${name}`;g.position.set(...pos);root.add(g);
    const p={g,name,section:sections[section],base:g.position.clone(),v:new T.Vector3(...vector),kind,hidden:false,desc:desc||descriptions[section]};
    g.userData={id:g.name,名称:name,总成:p.section,精度:'用户单图轮廓重建',说明:p.desc,装配坐标:pos,爆炸向量:vector};parts.push(p);return p;
  }
  function mesh(p,geo,key,pos=[0,0,0],rot=[0,0,0]){const m=new T.Mesh(geo,materials[key]||materials.steel);m.position.set(...pos);m.rotation.set(...rot);m.castShadow=true;m.receiveShadow=true;m.userData.partId=p.g.name;p.g.add(m);return m;}
  const box=(p,size,key,pos=[0,0,0],rot=[0,0,0])=>mesh(p,new T.BoxGeometry(...size),key,pos,rot);
  const cyl=(p,r,len,key,pos=[0,0,0],axis='z')=>mesh(p,new T.CylinderGeometry(r,r,len,64),key,pos,axis==='z'?[Math.PI/2,0,0]:axis==='x'?[0,0,Math.PI/2]:[0,0,0]);
  const ring=(p,r,t,key,pos=[0,0,0],axis='z')=>mesh(p,new T.TorusGeometry(r,t,8,96),key,pos,axis==='y'?[Math.PI/2,0,0]:[0,0,0]);
  function tube(p,r,len,key,pos=[0,0,0],axis='z'){
    const shape=new T.Shape();shape.absarc(0,0,r,0,Math.PI*2,false);const hole=new T.Path();hole.absarc(0,0,r-.012,0,Math.PI*2,true);shape.holes.push(hole);
    const g=new T.ExtrudeGeometry(shape,{depth:len,bevelEnabled:false,curveSegments:48});g.translate(0,0,-len/2);
    return mesh(p,g,key,pos,axis==='y'?[Math.PI/2,0,0]:axis==='x'?[0,Math.PI/2,0]:[0,0,0]);
  }
  function bar(p,a,b,r,key){const av=new T.Vector3(...a),bv=new T.Vector3(...b),d=bv.clone().sub(av);const m=mesh(p,new T.CylinderGeometry(r,r,d.length(),10),key,av.add(bv).multiplyScalar(.5).toArray());m.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),d.normalize());return m;}
  function bolt(p,x,y,z,r=.009){mesh(p,new T.CylinderGeometry(r,r,.01,6),'rim',[x,y,z],[Math.PI/2,0,0]);}
  function sheet(name,sec,points,z,depth,key,kind='structure',vector=[0,.2,0]){
    const origin=xy(points[0][0],points[0][1],z),shape=new T.Shape();points.forEach(([x,y],i)=>{const q=xy(x,y);i?shape.lineTo(q[0]-origin[0],q[1]-origin[1]):shape.moveTo(0,0);});shape.closePath();
    const p=part(name,sec,origin,vector,kind);mesh(p,new T.ExtrudeGeometry(shape,{depth,bevelEnabled:false}),key);return p;
  }
  function roller(name,sec,px,py,pr,speed){
    const r=pr*S,w=1.01,pos=xy(px,py);const p=part(name,sec,pos,[sec===2?-.35:sec===4?.4:0,.16,.35],'roller');
    tube(p,r,w,'steel');mesh(p,new T.CylinderGeometry(r+.002,r+.002,w-.012,96,1,true),'needle',[0,0,0],[Math.PI/2,0,0]);
    // 开口前缘、内壁与后端壁保持真实深度；近侧端盖可切换。
    for(const zz of [-.505,.505]){ring(p,r-.003,.006,'rim',[0,0,zz]);ring(p,r+.005,.003,'fiber',[0,0,zz]);}
    cyl(p,r-.015,.016,'interior',[0,0,-.486]);
    if(r>.3){box(p,[.013,r*1.72,.012],'steel',[r*.18,0,-.465]);box(p,[r*.63,.014,.013],'steel',[r*.14,-r*.30,-.462]);}
    else{cyl(p,Math.min(.025,r*.22),.035,'steel',[0,0,-.458]);}
    const cap=part(name+'近侧端盖',sec,xy(px,py,.51),[0,.05,1.05],'cap');cyl(cap,r-.015,.023,'steel');cyl(cap,Math.min(.06,r*.3),.13,'rim',[0,0,.06]);caps.push(cap);
    const bearing=part(name+'后轴承座',sec,xy(px,py,-.60),[0,0,-.7]);box(bearing,[Math.max(.10,r*.30),Math.max(.11,r*.30),.1],'paint');cyl(bearing,Math.min(.055,r*.4),.16,'steel');for(const a of [-1,1])bolt(bearing,a*.035,.035,.09);
    p.g.userData.动画轴='Z';p.g.userData.转速说明='教学减速，非生产转速';rotors.push({p,speed});return p;
  }

  // 底盘采用可见的折边托盘、纵梁、横梁、地脚和螺栓。
  let p=part('底盘折边托盘',0,xy(606,742,caseCenter),[0,-.22,0]);box(p,[970*S,.035,caseWidth],'steel');for(const z of [-caseWidth/2,caseWidth/2])box(p,[970*S,.10,.025],'paint',[0,.06,z]);
  for(const z of [-.58,.58]){p=part(z>0?'近侧底梁':'后侧底梁',0,xy(620,729,z),[0,-.15,z*.4]);box(p,[930*S,.075,.06],'dark');}
  for(const px of [160,350,530,760,960,1070]){p=part('底盘横撑 '+px,0,xy(px,736,caseCenter),[0,-.12,0]);box(p,[.055,.065,caseWidth-.05],'paint');for(const z of [sideDrive+.15,sideNear-.15]){const q=part('支脚 '+px+' '+z,0,xy(px,759,z),[0,-.1,z*.2]);box(q,[.16,.024,.14],'dark');cyl(q,.022,.045,'steel',[0,.03,0],'y');}}
  sheet('棉箱后侧壳板',0,[[124,89],[326,89],[326,744],[124,744]],-.64,.027,'paint');
  for(const px of [128,324]){p=part('棉箱立柱 '+px,0,xy(px,420,-.02),[-.35,0,px===128?.3:-.3]);box(p,[.042,658*S,1.27],'paint');}
  for(const py of [89,337,579,747]){p=part('棉箱横向支撑 '+py,0,xy(226,py),[-.25,0,0]);box(p,[197*S,.045,1.24],'paint');for(const z of [-.60,.6]){bolt(p,-.28,0,z);bolt(p,.28,0,z);}}
  // 后侧分缝门板和黑色观察窗，与参考图的轮廓位置一致。
  for(const [left,right] of [[376,568],[572,752],[756,914]]){
    const panel=sheet('后侧门板 '+left,0,[[left,261],[Math.min(right,850),261],[right,506],[right,705],[left,705]],sideDrive,.03,'light','rearShell',[0,.12,-1.3]);
    const wx=left===756?798:left+38;
    sheet('后侧观察窗 '+left,0,[[wx,286],[wx+40,286],[wx+40,425],[wx+18,417],[wx,401]],sideDrive+.042,.012,'black','rearShell',[0,.12,-1.3]);
    p=part('后门锁扣 '+left,0,xy(left+12,490,sideDrive+.07),[0,.12,-1.3],'rearShell');box(p,[.028,.05,.018],'dark');bolt(p,0,0,.016,.007);
    for(const py of [290,665]){p=part('门板铰链 '+left+' '+py,0,xy(left,py,sideDrive+.078),[0,.12,-1.3],'rearShell');box(p,[.025,.065,.019],'steel');}
    if(left===376){p=part('后部散热格栅',0,xy(465,669,sideDrive+.06),[0,.12,-1.3],'rearShell');box(p,[.57,.20,.022],'dark');for(let i=0;i<18;i++)for(let j=0;j<5;j++)box(p,[.012,.012,.012],'paint',[-.26+i*.03,-.073+j*.035,.015]);}
    panel.g.userData.图源='用户本轮剖视图';
  }
  for(const z of [sideDrive+.04,sideNear-.04]){p=part('上横梁 '+z,0,xy(605,241,z),[0,.35,z*.3]);box(p,[553*S,.052,.065],'paint');p=part('绿色上饰条 '+z,0,xy(594,257,z),[0,.25,z*.3]);box(p,[503*S,.04,.024],'green');}
  for(const px of [365,590,840]){p=part('顶盖横撑 '+px,0,xy(px,235,caseCenter),[0,.35,0]);box(p,[.075,.04,caseWidth],'steel');}
  sheet('出条端倾斜后侧罩',0,[[860,228],[893,228],[982,483],[1051,516],[1051,573],[956,513]],sideDrive,.045,'paint','rearShell',[0,.1,-1.2]);
  p=part('倾斜出条前罩',0,xy(925,363,caseCenter),[.55,.2,0],'shell');box(p,[.043,1.10,caseWidth],'paint',[0,0,0],[0,0,.38]);box(p,[.014,.59,.75],'black',[.07,.12,0],[0,0,.38]);
  p=part('顶部检修盖',0,xy(602,240,caseCenter),[0,.8,0],'shell');box(p,[2.15,.026,caseWidth],'paint');
  for(const [a,b] of [[331,516],[519,710],[713,888]])sheet('近侧可拆外罩 '+a,0,a===713?[[713,260],[868,260],[961,502],[1051,516],[1051,705],[713,705]]:[[a,260],[b,260],[b,705],[a,705]],sideNear,.025,'light','shell',[0,.12,1.3]);
  sheet('传动侧道夫检修门',0,[[917,509],[1051,518],[1051,705],[917,705]],sideDrive,.03,'light','rearShell',[0,.12,-1.3]);

  for(const [label,z] of [['操作侧',sideNear-.03],['传动侧',sideDrive+.04]]){
    p=part(label+'外侧底梁',0,xy(707,727,z),[0,-.15,z*.4]);box(p,[772*S,.09,.055],'paint');
    p=part(label+'棉箱接口侧封板',0,xy(337,463,(z+(z>0?.60:-.63))/2),[-.2,0,z*.4]);box(p,[.03,414*S,Math.abs(z-(z>0?.60:-.63))],'paint');
    for(const px of [370,575,835,1040]){const top=px===1040?526:245;p=part(label+'侧罩支柱 '+px,0,xy(px,(top+729)/2,z),[0,.1,z*.4],z>0?'shell':'structure');box(p,[.026,(729-top)*S,.026],'paint');}
  }
  // 喂棉通道、上下罗拉、开松打手、风机和薄壁风路。
  p=part('顶部进棉管',1,xy(220,34),[-.3,.7,0]);tube(p,.18,.50,'paint',[0,.08,0],'y');ring(p,.182,.015,'steel',[0,-.17,0],'y');
  p=part('上棉箱分隔板',1,xy(260,225),[-.4,.3,.2]);box(p,[.025,1.01,1.04],'steel');
  p=part('上棉箱检修窗口',1,xy(207,136,-.59),[-.3,.3,-.3]);box(p,[.22,.21,.035],'dark');
  const chuteFeed=roller('棉箱给棉罗拉',1,234,373,27,-.8),beater=roller('棉箱开松打手',1,276,416,35,1.9);
  for(let row=0;row<4;row++)for(let i=0;i<15;i++){const angle=row*Math.PI/2+i*.075;box(beater,[.014,.032,.011],'rim',[Math.cos(angle)*.135,Math.sin(angle)*.135,-.46+i*.065],[0,0,angle-Math.PI/2]);}
  sheet('下棉箱导棉板',1,[[277,451],[302,451],[303,556],[329,578],[275,572]],-.51,1.02,'paint', 'structure',[-.4,.1,0]);
  p=part('下棉箱排气网框',1,xy(278,521,-.55),[-.55,.05,-.3]);box(p,[.035,.34,.97],'steel');for(let i=0;i<11;i++)box(p,[.041,.008,.91],'dark',[.02,-.15+i*.028,0]);
  p=part('棉箱循环风机',5,xy(198,486,-.18),[-.5,0,-.4]);cyl(p,.135,.19,'paint');cyl(p,.082,.21,'dark');for(let i=0;i<9;i++)box(p,[.015,.22,.012],'steel',[0,0,.111],[0,0,i*Math.PI/9]);
  for(const py of [486,531]){p=part('棉箱回风支管 '+py,5,xy(220,py,-.36),[-.6,0,-.5]);tube(p,.056,.4,'steel',[0,0,0],'x');}
  const feed=roller('给棉罗拉',1,365,629,14,-.5);p=part('给棉板',1,xy(347,610),[-.4,.1,.3]);box(p,[.15,.023,1.03],'steel',[0,0,0],[0,0,-.15]);
  const takers=[roller('第一刺辊',2,404,622,24,2.2),roller('第二刺辊',2,456,622,26,-2.6),roller('第三刺辊',2,522,622,34,3.1)];
  for(let i=0;i<3;i++){
    const cx=[404,456,522][i],r=[24,26,37][i];
    p=part('第'+(i+1)+'刺辊上吸罩',5,xy(cx,622-r-13),[-.35,.23,.15]);tube(p,.031,1.02,'steel');box(p,[.07,.011,1.01],'steel',[-.042,-.026,0],[0,0,-.45]);
    p=part('第'+(i+1)+'刺辊下吸口',5,xy(cx,622+r+28),[-.25,-.2,.1]);tube(p,.048,1.02,'steel');box(p,[.11,.025,1.01],'paint',[0,.075,0]);
    p=part('第'+(i+1)+'除尘刀',2,xy(cx-13,622+r+10),[-.3,-.12,.4]);box(p,[.011,.07,1.01],'steel',[0,0,0],[0,0,-.5]);
    p=part('第'+(i+1)+'预分梳板',2,xy(cx+12,622+r+5),[-.15,-.1,.3]);box(p,[.08,.014,1.01],'dark',[0,0,0],[0,0,.25]);
  }
  const cylinder=roller('锡林',3,696,528,163,-1.15),doffer=roller('道夫',4,932,624,91,.35);
  for(let side=0;side<2;side++)for(let i=0;i<(side?8:6);i++){
    const a=(side?-.15:Math.PI+.15)+(side?1:-1)*i*.065,r=.671,center=xy(696,528);
    p=part((side?'前':'后')+'固定盖板 '+(i+1),3,[center[0]+Math.cos(a)*r,center[1]+Math.sin(a)*r,0],[side?.35:-.35,.15,.15]);p.g.rotation.z=a-Math.PI/2;
    box(p,[.037,.047,1.03],'paint');box(p,[.04,.013,1.01],'dark',[0,-.030,0]);for(const z of [-.52,.52])box(p,[.065,.015,.025],'rim',[0,.033,z]);
  }
  // 30根工作盖板沿锡林外弧；54根回程盖板沿封闭上轨，型材截面独立。
  const working=[];for(let i=0;i<=60;i++){const a=(158-(136*i/60))*Math.PI/180;working.push(new T.Vector3(Math.cos(a)*.706,xy(696,528)[1]+Math.sin(a)*.706,0));}
  const returning=[[851,438],[878,415],[873,389],[851,369],[777,335],[640,332],[607,333],[548,368],[523,393],[523,414],[545,438]].map(v=>new T.Vector3(...xy(...v)));
  const workCurve=new T.CatmullRomCurve3(working),returnCurve=new T.CatmullRomCurve3(returning);
  const loopPoints=[...working,...returnCurve.getPoints(90)];const flatLoop=new T.CatmullRomCurve3(loopPoints,true,'centripetal');
  const flatProfile=new T.Shape();[[-.016,-.020],[.016,-.020],[.016,-.012],[.006,-.012],[.006,.037],[.017,.037],[.017,.046],[-.017,.046],[-.017,.037],[-.006,.037],[-.006,-.012],[-.016,-.012]].forEach(([x,y],i)=>i?flatProfile.lineTo(x,y):flatProfile.moveTo(x,y));flatProfile.closePath();
  const flatGeo=new T.ExtrudeGeometry(flatProfile,{depth:1.04,bevelEnabled:false});flatGeo.translate(0,0,-.52);
  for(let i=0;i<84;i++){const curve=i<30?workCurve:returnCurve,u=i<30?i/29:(i-30)/53,v=curve.getPointAt(u),tan=curve.getTangentAt(u);p=part('回转盖板 '+String(i+1).padStart(2,'0'),3,v.toArray(),[v.x*.4,.4+(i%3)*.04,0],'flat');p.g.rotation.z=Math.atan2(tan.y,tan.x);mesh(p,flatGeo,'steel');box(p,[.029,.006,1.0],'dark',[0,-.024,0]);flats.push({p,u:flatLoop.getUtoTmapping(0,0),baseU:i/84});}
  for(const z of [-.537,.537]){p=part('盖板传动链 '+z,3,[0,0,z],[0,.4,z*.5]);mesh(p,new T.TubeGeometry(new T.CatmullRomCurve3(loopPoints.map(v=>new T.Vector3(v.x,v.y,0)),true),240,.012,6,true),'rubber');}
  for(const [cx,cy] of [[548,405],[849,404]]){p=part('盖板导向轮 '+cx,3,xy(cx,cy,-.55),[0,.35,-.3]);cyl(p,.08,.04,'dark');ring(p,.065,.01,'rim',[0,0,.025]);}
  roller('盖板清洁刷辊',3,490,358,22,-1.2);roller('盖板剥取辊',3,514,341,16,1.0);roller('盖板清洁大刷辊',3,550,338,21,-1.2);
  for(const [cx,cy] of [[516,520],[518,488],[536,456],[870,484],[872,519]]){p=part('梳理区吸风嘴 '+cx+' '+cy,5,xy(cx,cy),[cx<696?-.3:.3,0,.2]);tube(p,.028,1.06,'steel');box(p,[.035,.02,1.02],'dark',[0,-.03,0]);}
  const under=part('锡林下部弧形罩',3,xy(696,528),[0,-.3,0]);const ug=new T.CylinderGeometry(.675,.675,1.03,70,1,true,Math.PI*.08,Math.PI*.84);mesh(under,ug,'paint',[0,0,0],[Math.PI/2,0,Math.PI]);
  for(const px of [575,647,724,803]){p=part('下部吸风槽 '+px,5,xy(px,688),[0,-.2,0]);tube(p,.025,1.07,'steel');}
  const stripper=roller('剥棉罗拉',4,1016,545,14,1.0);roller('清洁罗拉',4,1035,573,16,-.8);
  roller('上轧辊',4,1050,598,10,.8);roller('下轧辊',4,1050,620,10,-.8);
  roller('大压辊上辊',4,1094,583,9,.9);roller('大压辊下辊',4,1094,603,9,-.9);
  p=part('棉网集束器',4,xy(1075,593),[.45,.15,.2]);const funnelGeo=new T.BufferGeometry();funnelGeo.setAttribute('position',new T.Float32BufferAttribute([-.10,.05,-.5,-.10,.05,.5,.10,0,.025,-.10,.05,-.5,.10,0,.025,.10,0,-.025],3));funnelGeo.computeVertexNormals();const funnel=mesh(p,funnelGeo,'steel');funnel.material=materials.steel.clone();funnel.material.side=T.DoubleSide;
  sheet('成网导板',4,[[982,490],[1053,514],[1060,532],[981,510]],-.51,1.02,'paint');
  p=part('出条端吸风箱',5,xy(1058,689),[.45,-.2,0]);box(p,[.23,.33,.99],'dark');for(let i=0;i<8;i++)box(p,[.24,.009,.88],'steel',[.015,-.12+i*.031,0]);
  // 单工作条筒移到出条端右前侧；主机正前方留出生头位置。
  const canX=1191,canY=625;
  p=part('圈条器顶箱',6,cxy(1179,448,0),[.7,.6,0]);box(p,[274*S,.115,1.14],'light');box(p,[274*S,.082,1.145],'green',[0,.089,0]);
  p=part('圈条器传动盒',6,cxy(1179,435,0),[.65,.6,-.2]);box(p,[.61,.06,.66],'green');
  for(const px of [1085,1285])for(const z of [-.53,.53]){p=part('圈条器支柱 '+px+' '+z,6,cxy(px,602,z),[.65,0,z*.4]);box(p,[.035,1.12,.035],'paint');}
  p=part('圈条器落地底座',6,cxy(1191,755,.08),[.8,-.1,-.4]);box(p,[1.12,.14,1.43],'paint');
  p=part('工作条筒',6,cxy(canX,canY,0),[.9,0,.4]);tube(p,.395,.89,'paint',[0,0,0],'y');cyl(p,.38,.015,'steel',[0,-.444,0],'y');for(const yy of [-.43,.435])ring(p,.395,.01,'rim',[0,yy,0],'y');ring(p,.399,.022,'green',[0,.37,0],'y');
  p=part('条筒转盘',6,cxy(canX,746,0),[.8,-.1,0]);cyl(p,.415,.042,'steel',[0,0,0],'y');p.g.userData.动画轴='Y';rotors.push({p,speed:.08,axis:'y'});
  p=part('圈条盘',6,cxy(canX,486,0),[.8,.6,0]);cyl(p,.32,.05,'steel',[0,0,0],'y');cyl(p,.041,.07,'dark',[.17,-.035,0],'y');p.g.userData.动画轴='Y';rotors.push({p,speed:1.4,axis:'y'});
  p=part('条筒棉条层',6,cxy(canX,534,0),[.9,.1,.4]);for(let layer=0;layer<4;layer++)for(let i=0;i<12;i++){const a=i*Math.PI/6;ring(p,.16,.009,'fiber',[Math.cos(a)*.18,layer*.013,Math.sin(a)*.18],'y');}
  p=part('圈条器落地电机箱',6,cxy(1185,740,.70),[.7,0,.65]);box(p,[.32,.28,.31],'green');box(p,[.19,.17,.04],'paint',[0,.01,-.174]);
  p=part('导条架',6,cxy(1160,397,0),[.55,.4,0]);bar(p,[-.08,-.1,-.08],[-.08,.05,-.08],.013,'steel');bar(p,[.08,-.1,.08],[.08,.05,.08],.013,'steel');cyl(p,.018,.22,'dark',[0,.05,0]);
  p=part('导条连续棉条',6,[0,0,0],[.7,.3,-.5],'sliver');
  const sliverCurve=new T.CatmullRomCurve3([xy(1104,593,0),xy(1130,526,-.22),xy(1157,432,-.70),cxy(1160,385,0),cxy(1170,399,0),cxy(1191,443,0)].map(v=>new T.Vector3(...v)));
  mesh(p,new T.TubeGeometry(sliverCurve,90,.008,7,false),'fiber');
  p=part('侧向导条托架',6,cxy(1135,437,0),[.55,.4,-.3]);bar(p,[0,0,0],[-.10,.24,.24],.012,'steel');cyl(p,.018,.10,'dark',[-.10,.24,.24]);
  // 五台工艺驱动电机按用户配置分开；具体带轮规格和换向机构为教学示意。
  function pulley(name,cx,cy,r,z,speed){
    const q=part(name,5,xy(cx,cy,z),[0,0,-.75],'driveRotor','独立驱动的带轮与轴端，教学减速显示，不表示实际传动比。');
    cyl(q,r,.035,'dark');for(const zz of [-.022,.022])ring(q,r,.005,'rim',[0,0,zz]);cyl(q,r*.26,.048,'steel');
    for(let i=0;i<6;i++){const a=i*Math.PI/3;bar(q,[Math.cos(a)*r*.25,Math.sin(a)*r*.25,-.025],[Math.cos(a)*r*.87,Math.sin(a)*r*.87,-.025],.007,'rim');}
    q.g.userData.动画轴='Z';rotors.push({p:q,speed});return q;
  }
  function driveBelt(name,a,b,ra,rb,z,cross=false){
    const av=new T.Vector3(...xy(...a)),bv=new T.Vector3(...xy(...b)),d=av.distanceTo(bv),theta=Math.atan2(bv.y-av.y,bv.x-av.x),alpha=Math.acos((cross?ra+rb:ra-rb)/d),pts=[];
    for(let i=0;i<=45;i++){const u=theta+alpha+(Math.PI*2-alpha*2)*i/45;pts.push(new T.Vector3(av.x+ra*Math.cos(u),av.y+ra*Math.sin(u),0));}
    if(cross){for(let i=0;i<=45;i++){const u=theta+Math.PI+alpha-(Math.PI*2-alpha*2)*i/45;pts.push(new T.Vector3(bv.x+rb*Math.cos(u),bv.y+rb*Math.sin(u),0));}}
    else for(let i=0;i<=45;i++){const u=theta-alpha+alpha*2*i/45;pts.push(new T.Vector3(bv.x+rb*Math.cos(u),bv.y+rb*Math.sin(u),0));}
    if(cross){const first=pts.slice(0,46),second=pts.slice(46),bridge=(a,b,sign)=>Array.from({length:15},(_,i)=>{const t=(i+1)/16,v=a.clone().lerp(b,t);v.z=sign*Math.sin(Math.PI*t)*.022;return v;});pts.splice(0,pts.length,...first,...bridge(first.at(-1),second[0],1),...second,...bridge(second.at(-1),first[0],-1));}
    // 直线切边和圆弧包角相接；交叉带中间略分层避免两段实体相穿。
    const vertices=[],indices=[];
    for(let i=0;i<pts.length;i++){
      const v=pts[i],prev=pts[(i+pts.length-1)%pts.length],next=pts[(i+1)%pts.length],t=next.clone().sub(prev).normalize(),n=new T.Vector3(-t.y,t.x,0).multiplyScalar(.004);
      for(const [sign,zz] of [[1,-.012],[1,.012],[-1,-.012],[-1,.012]])vertices.push(v.x+n.x*sign,v.y+n.y*sign,v.z+zz);
      const k=i*4,j=((i+1)%pts.length)*4;indices.push(k,j,k+1,k+1,j,j+1,k+2,k+3,j+2,k+3,j+3,j+2,k,k+2,j,k+2,j+2,j,k+1,j+1,k+3,k+3,j+1,j+3);
    }
    const q=part(name,5,[0,0,z],[0,0,-.85],'belt','闭合传动带示意；三刺辊换向通过分层交叉带表示，实际带型与换向件需依据厂家图纸。'),g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(vertices,3));g.setIndex(indices);g.computeVertexNormals();mesh(q,g,'rubber');belts.push(q);return q;
  }
  function motor(name,cx,cy,r,len,target,tr,speed){
    const z=-1.065,q=part(name,5,xy(cx,cy,z),[0,0,-.9],'motor',name+'采用独立安装座，轴向与工作辊平行。电机数量依用户说明配置，外形为教学补齐。');
    cyl(q,r,len,'paint');for(let i=0;i<18;i++){const a=i*Math.PI/9;box(q,[.013,.026,len*.77],'steel',[Math.cos(a)*r,Math.sin(a)*r,0],[0,0,a-Math.PI/2]);}
    cyl(q,r*.94,.025,'steel',[0,0,-len/2-.013]);ring(q,r*.82,.006,'rim',[0,0,-len/2-.029]);
    for(let i=-3;i<=3;i++)box(q,[Math.sqrt(1-(i/4)**2)*r*1.4,.006,.007],'dark',[0,i*r*.18,-len/2-.03]);
    box(q,[r*.94,.06,len*.48],'paint',[0,r+.02,-.012]);box(q,[r*.82,.012,len*.39],'steel',[0,r+.056,-.012]);
    cyl(q,.018,.19,'rim',[0,0,len/2+.082]);
    for(const xx of [-r*.72,r*.72]){box(q,[.05,.045,len*.89],'steel',[xx,-r-.017,0]);for(const zz of [-len*.32,len*.32])mesh(q,new T.CylinderGeometry(.009,.009,.025,6),'rim',[xx,-r+.009,zz]);}
    const support=part(name+'安装座',5,xy(cx,cy,z),[0,-.12,-.75]);box(support,[r*3,.028,len+.10],'dark',[0,-r-.055,0]);
    const foot=xy(cx,cy)[1]-r-.069;
    if(foot<.55){for(const xx of [-r,r])box(support,[.024,Math.max(.02,foot-.15),.22],'paint',[xx,-r-.07-(foot-.15)/2,0]);}
    else{const h=xy(cx,248)[1]-xy(cx,cy)[1];for(const xx of [-r,r])box(support,[.026,h+r+.055,.035],'paint',[xx,(h-r-.055)/2,-.08]);}
    pulley(name+'主动带轮',cx,cy,r*.49,-.84,speed*tr/(r*.49));pulley(name+'从动带轮',...target,tr,-.84,speed);
    const shaft=part(name+'工作轴延伸',5,xy(...target,-.70),[0,0,-.65]);cyl(shaft,.021,.30,'rim');
    driveBelt(name+'传动带',[cx,cy],target,r*.49,tr,-.84);return q;
  }
  motor('锡林独立电机',735,693,.112,.25,[696,528],.185,-1.15);
  motor('三刺辊共用电机',425,695,.079,.22,[404,622],.052,2.2);
  motor('道夫独立电机',954,700,.088,.23,[932,624],.11,.35);
  motor('清洁辊电机一',455,282,.065,.20,[490,358],.044,-1.2);
  motor('清洁辊电机二',610,285,.065,.20,[550,338],.043,-1.2);
  pulley('第二刺辊换向带轮',456,622,.051,-.90,-2.6);pulley('第三刺辊传动带轮',522,622,.062,-.96,3.1);
  for(const [cx,z] of [[404,-.90],[456,-.96]])pulley('三刺辊分级主动轮 '+cx,cx,622,cx===404?.051*2.6/2.2:.062*3.1/2.6,z,cx===404?2.2:-2.6);
  for(const cx of [456,522]){p=part('刺辊联动轴 '+cx,5,xy(cx,622,-.77),[0,0,-.7]);cyl(p,.018,.40,'rim');}
  driveBelt('第一至第二刺辊换向带',[404,622],[456,622],.051*2.6/2.2,.051,-.90,true);
  driveBelt('第二至第三刺辊换向带',[456,622],[522,622],.062*3.1/2.6,.062,-.96,true);
  // 两侧吸风总管与原有横向吸口连接；传动侧总管位于电机外侧。
  for(const [label,z,r] of [['操作侧',.83,.052],['传动侧',-1.30,.052]]){
    p=part(label+'吸风总管',5,xy(705,718,z),[0,-.12,z*.45],'duct','侧部吸风总管连接下吸口与梳理吸口，法兰和支架独立布置。');tube(p,r,720*S,'steel',[0,0,0],'x');
    for(const cx of [370,585,815,1058]){
      const q=part(label+'总管法兰 '+cx,5,xy(cx,718,z),[0,-.12,z*.45]);mesh(q,new T.TorusGeometry(r+.008,.009,8,40),'rim',[0,0,0],[0,Math.PI/2,0]);
      const clamp=part(label+'管路支架 '+cx,5,xy(cx,731,z),[0,-.15,z*.45]);box(clamp,[.027,.045,.13],'paint');
    }
    const branches=[[404,674],[456,676],[522,684],[647,688],[803,688],[870,519]];
    for(const [cx,cy] of branches){
      const q=part(label+'吸风支管 '+cx,5,[0,0,0],[0,.08,z*.5],'duct'),start=xy(cx,cy,z>0?.535:-.535),middle=xy(cx+13,cy+10,z),end=xy(cx+13,718,z);
      mesh(q,new T.TubeGeometry(new T.CatmullRomCurve3([new T.Vector3(...start),new T.Vector3(...middle),new T.Vector3(...end)],false,'centripetal'),28,.022,10,false),'steel');
      const flange=part(label+'支管接口 '+cx,5,start,[0,.08,z*.5]);ring(flange,.026,.005,'rim');
    }
    const outlet=part(label+'吸风汇出口',5,xy(322,718,z),[-.3,0,z*.4]);tube(outlet,r,.18,'steel',[0,0,0],'x');mesh(outlet,new T.TorusGeometry(r+.01,.009,8,40),'rim',[-.09,0,0],[0,Math.PI/2,0]);
  }
  // 连续棉层为薄片带，不用球体代替纤维；运动时由细线方向提示输送。
  const feedPoints=[[247,146],[247,320],[242,358],[251,408],[260,477],[271,571],[293,600],[366,621]].map(v=>new T.Vector3(...xy(...v)));
  const feedCurve=new T.CatmullRomCurve3(feedPoints);
  p=part('喂入棉层',1,[0,0,0],[-.35,.15,0],'fiber');ribbon(p,feedCurve,.94,.11,'fiber');
  function ribbon(p,curve,width,thickness,key){
    const pos=[],idx=[];for(let i=0;i<=100;i++){const v=curve.getPoint(i/100),tan=curve.getTangent(i/100),n=new T.Vector3(-tan.y,tan.x,0).multiplyScalar(thickness/2);for(const [side,z] of [[1,-width/2],[1,width/2],[-1,-width/2],[-1,width/2]])pos.push(v.x+n.x*side,v.y+n.y*side,z);}
    for(let i=0;i<100;i++){const a=i*4,b=a+4;idx.push(a,b,a+1,a+1,b,b+1,a+2,a+3,b+2,a+3,b+3,b+2,a+1,b+1,a+3,a+3,b+1,b+3,a,a+2,b,a+2,b+2,b);}
    const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(pos,3));g.setIndex(idx);g.computeVertexNormals();const m=mesh(p,g,key);m.material=m.material.clone();m.material.side=T.DoubleSide;return m;
  }
  const thinWeb=new T.CatmullRomCurve3([[1001,557],[1036,578],[1050,609],[1070,610],[1094,594]].map(v=>new T.Vector3(...xy(...v))));
  p=part('道夫输出棉网',4,[0,0,0],[.4,.1,0],'fiber');ribbon(p,thinWeb,.89,.003,'fiber');
  const fiberRoute=[...feedCurve.getPoints(90),...[[389,643],[410,645],[431,629],[457,596],[485,612],[505,655],[535,657],[556,641]].map(v=>new T.Vector3(...xy(...v)))];
  for(let i=0;i<=100;i++){const a=(Math.PI*1.22)-(Math.PI*1.30*i/100);fiberRoute.push(new T.Vector3(Math.cos(a)*.652,xy(696,528)[1]+Math.sin(a)*.652,.535));}
  for(let i=0;i<=40;i++){const a=Math.PI*.88+i/40*Math.PI*1.33;fiberRoute.push(new T.Vector3(xy(932,624)[0]+Math.cos(a)*92*S,xy(932,624)[1]+Math.sin(a)*92*S,.54));}
  fiberRoute.push(...thinWeb.getPoints(30),...sliverCurve.getPoints(40));
  const flowCurve=new T.CatmullRomCurve3(fiberRoute);
  const flowStages=[feedCurve,new T.CatmullRomCurve3(fiberRoute.slice(90,100)),new T.CatmullRomCurve3(fiberRoute.slice(99,200)),new T.CatmullRomCurve3(fiberRoute.slice(200,241)),thinWeb,sliverCurve];
  for(const q of parts){q.rotation=q.g.rotation.clone();q.g.userData.装配旋转=q.rotation.toArray();}
  return {root,parts,rotors,flats,flatLoop,sections,flowCurve,flowStages,feedCurve,thinWeb,sliverCurve,materials,xy,landmarks:{锡林:xy(696,528,.51),道夫:xy(932,624,.51),第一刺辊:xy(404,622,.51),第二刺辊:xy(456,622,.51),第三刺辊:xy(522,622,.51)},needle};
}
