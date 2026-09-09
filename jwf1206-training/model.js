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
  let p=part('底盘折边托盘',0,xy(606,742,0),[0,-.22,0]);box(p,[970*S,.035,1.27],'steel');for(const z of [-.63,.63])box(p,[970*S,.10,.025],'paint',[0,.06,z]);
  for(const z of [-.58,.58]){p=part(z>0?'近侧底梁':'后侧底梁',0,xy(620,729,z),[0,-.15,z*.4]);box(p,[930*S,.075,.06],'dark');}
  for(const px of [160,350,530,760,960,1070]){p=part('底盘横撑 '+px,0,xy(px,736),[0,-.12,0]);box(p,[.055,.065,1.22],'paint');for(const z of [-.47,.47]){const q=part('支脚 '+px+' '+z,0,xy(px,759,z),[0,-.1,z*.2]);box(q,[.16,.024,.14],'dark');cyl(q,.022,.045,'steel',[0,.03,0],'y');}}
  sheet('棉箱后侧壳板',0,[[124,89],[326,89],[326,744],[124,744]],-.64,.027,'paint');
  for(const px of [128,324]){p=part('棉箱立柱 '+px,0,xy(px,420,-.02),[-.35,0,px===128?.3:-.3]);box(p,[.042,658*S,1.27],'paint');}
  for(const py of [89,337,579,747]){p=part('棉箱横向支撑 '+py,0,xy(226,py),[-.25,0,0]);box(p,[197*S,.045,1.24],'paint');for(const z of [-.60,.6]){bolt(p,-.28,0,z);bolt(p,.28,0,z);}}
  // 后侧分缝门板和黑色观察窗，与参考图的轮廓位置一致。
  for(const [left,right] of [[376,568],[572,752],[756,914]]){
    const panel=sheet('后侧门板 '+left,0,[[left,261],[Math.min(right,850),261],[right,506],[right,705],[left,705]],-.68,.03,'light');
    const wx=left===756?798:left+38;
    sheet('后侧观察窗 '+left,0,[[wx,286],[wx+40,286],[wx+40,425],[wx+18,417],[wx,401]],-.638,.012,'black');
    p=part('后门锁扣 '+left,0,xy(left+12,490,-.61));box(p,[.028,.05,.018],'dark');bolt(p,0,0,.016,.007);
    for(const py of [290,665]){p=part('门板铰链 '+left+' '+py,0,xy(left,py,-.602));box(p,[.025,.065,.019],'steel');}
    if(left===376){p=part('后部散热格栅',0,xy(465,669,-.62));box(p,[.57,.20,.022],'dark');for(let i=0;i<18;i++)for(let j=0;j<5;j++)box(p,[.012,.012,.012],'paint',[-.26+i*.03,-.073+j*.035,.015]);}
    panel.g.userData.图源='用户本轮剖视图';
  }
  for(const z of [-.62,.60]){p=part('上横梁 '+z,0,xy(605,241,z),[0,.35,z*.3]);box(p,[553*S,.052,.065],'paint');p=part('绿色上饰条 '+z,0,xy(594,257,z),[0,.25,z*.3]);box(p,[503*S,.04,.024],'green');}
  for(const px of [365,590,840]){p=part('顶盖横撑 '+px,0,xy(px,235),[0,.35,0]);box(p,[.075,.04,1.25],'steel');}
  sheet('出条端倾斜后侧罩',0,[[860,228],[893,228],[982,483],[1051,516],[1051,573],[956,513]],-.65,.045,'paint');
  p=part('倾斜出条前罩',0,xy(925,363,0),[.55,.2,0],'shell');box(p,[.043,1.10,1.22],'paint',[0,0,0],[0,0,.38]);box(p,[.014,.59,.75],'black',[.07,.12,0],[0,0,.38]);
  p=part('顶部检修盖',0,xy(602,240,0),[0,.8,0],'shell');box(p,[2.15,.026,1.25],'paint');
  for(const [a,b] of [[331,516],[519,710],[713,888]])sheet('近侧可拆外罩 '+a,0,[[a,260],[b,260],[b+65,705],[a,705]],.65,.025,'light','shell',[0,.12,1.3]);

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
  // 图中可见的单工作条筒，圈条箱与细支柱位于主机右侧。
  const canX=1191,canY=625;
  p=part('圈条器顶箱',6,xy(1179,448,0),[.7,.6,0]);box(p,[274*S,.115,1.14],'light');box(p,[274*S,.082,1.145],'green',[0,.089,0]);
  p=part('圈条器传动盒',6,xy(1179,435,0),[.65,.6,-.2]);box(p,[.61,.06,.66],'green');
  for(const z of [-.53,.53]){p=part('圈条器支柱 '+z,6,xy(1085,602,z),[.65,0,z*.4]);box(p,[.035,1.12,.035],'paint');}
  p=part('工作条筒',6,xy(canX,canY,0),[.9,0,.4]);tube(p,.395,.89,'paint',[0,0,0],'y');cyl(p,.38,.015,'steel',[0,-.444,0],'y');for(const yy of [-.43,.435])ring(p,.395,.01,'rim',[0,yy,0],'y');ring(p,.399,.022,'green',[0,.37,0],'y');
  p=part('条筒转盘',6,xy(canX,746,0),[.8,-.1,0]);cyl(p,.415,.042,'steel',[0,0,0],'y');p.g.userData.动画轴='Y';rotors.push({p,speed:.08,axis:'y'});
  p=part('圈条盘',6,xy(canX,486,0),[.8,.6,0]);cyl(p,.32,.05,'steel',[0,0,0],'y');cyl(p,.041,.07,'dark',[.17,-.035,0],'y');p.g.userData.动画轴='Y';rotors.push({p,speed:1.4,axis:'y'});
  p=part('条筒棉条层',6,xy(canX,534,0),[.9,.1,.4]);for(let layer=0;layer<4;layer++)for(let i=0;i<12;i++){const a=i*Math.PI/6;ring(p,.16,.009,'fiber',[Math.cos(a)*.18,layer*.013,Math.sin(a)*.18],'y');}
  p=part('圈条器落地电机箱',6,xy(1185,758,.50),[.7,0,.65]);box(p,[.32,.28,.31],'green');box(p,[.19,.17,.04],'paint',[0,.01,-.174]);
  p=part('导条架',6,xy(1160,397,0),[.55,.4,0]);bar(p,[-.08,-.1,-.08],[-.08,.05,-.08],.013,'steel');bar(p,[.08,-.1,.08],[.08,.05,.08],.013,'steel');cyl(p,.018,.22,'dark',[0,.05,0]);
  p=part('导条连续棉条',6,[0,0,0],[.7,.3,0],'sliver');const sliverCurve=new T.CatmullRomCurve3([[1104,593,.51],[1125,550,.47],[1147,449,.24],[1160,391,0],[1170,399,0],[1191,443,0]].map(([x,y,z])=>new T.Vector3(...xy(x,y,z))));mesh(p,new T.TubeGeometry(sliverCurve,64,.008,7,false),'fiber');
  // 背侧动力与吸风：合理补齐，独立可拆，明确未由照片验证。
  p=part('背侧主传动电机',5,xy(673,704,-.78),[0,-.05,-.8]);cyl(p,.115,.33,'paint');for(let i=0;i<14;i++){const a=i*Math.PI/7;box(p,[.015,.031,.25],'steel',[Math.cos(a)*.115,Math.sin(a)*.115,0],[0,0,a]);}box(p,[.22,.03,.22],'dark',[0,-.13,0]);
  for(const [px,py,r] of [[696,528,.21],[522,622,.09],[932,624,.14]]){p=part('背侧带轮 '+px,5,xy(px,py,-.77),[0,0,-.9]);cyl(p,r,.035,'dark');for(let i=0;i<6;i++){const a=i*Math.PI/3;bar(p,[0,0,-.027],[Math.cos(a)*r*.84,Math.sin(a)*r*.84,-.027],.009,'steel');}for(const z of [-.026,.026])ring(p,r,.006,'rim',[0,0,z]);}
  for(const [a,b] of [[[696,528],[673,704]],[[673,704],[522,622]],[[696,528],[932,624]]]){p=part('背侧传动带 '+a[0]+'-'+b[0],5,[0,0,-.81],[0,0,-.9]);const av=xy(...a),bv=xy(...b);bar(p,[av[0]-.1,av[1],0],[bv[0]-.06,bv[1],0],.008,'rubber');bar(p,[av[0]+.1,av[1],0],[bv[0]+.06,bv[1],0],.008,'rubber');}
  for(const px of [399,580,830]){p=part('底部吸风总管 '+px,5,xy(px,712,-.37),[0,-.2,-.6]);tube(p,.063,.61,'steel',[0,0,0],'x');}
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
