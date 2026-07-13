// JWF1012厂家PDF第26—33页的3D建模工厂。
// source.dimensions只保留厂家明确标注；未标几何细节全部放入assumptions。

const PI=Math.PI;
const nums=value=>(value||[]).flatMap(item=>(String(item).match(/\d+(?:\.\d+)?/g)||[]).map(Number));
const pos=(v,f=1)=>Number.isFinite(v)&&v>0?v:f;
const rect=(w,h)=>[[-w/2,-h/2],[w/2,-h/2],[w/2,h/2],[-w/2,h/2]];
const box=(size,material='paintedMetal',position=[0,0,0],rotation=[0,0,0])=>({type:'box',size:size.map(v=>pos(v)),material,position,rotation});
const cyl=(radius,length,material='metal',position=[0,0,0],axis='x')=>({type:'cylinder',radius:pos(radius),length:pos(length),material,position,axis});
const hole=(x,y,r)=>({kind:'circle',center:[x,y],radius:r});
const extrude=(w,h,d,holes=[],material='paintedMetal',position=[0,0,0])=>({type:'extrude',points:rect(pos(w),pos(h)),depth:pos(d),holes,bevel:Math.min(pos(d)*.08,3),material,position});
const annulus=(outer,inner,width,material='metal',position=[0,0,0])=>({type:'lathe',points:[[inner/2,-width/2],[outer/2,-width/2],[outer/2,width/2],[inner/2,width/2],[inner/2,-width/2]],rotation:[0,0,PI/2],position,material});

function strip(part){const n=nums(part.dimensions),length=Math.min(n.find(v=>v>=100)||600,900),width=n.find(v=>v<100&&v>5)||14.8,thickness=n.find(v=>v<=5)||3.8;return [box([length,width,thickness],'rubber'),box([length,width*.28,Math.max(.6,thickness*.25)],'darkMetal',[0,0,thickness*.6])]}
function gasket(part){const n=nums(part.dimensions),w=n[0]||90,h=n[1]||45,t=n[n.length-1]||.2;return [extrude(w,h,Math.max(t,.1),[hole(0,0,Math.min(w,h)*.16),hole(w*.34,h*.28,2)],'metal')]}
function sprocket(part){const n=nums(part.dimensions),outer=n[0]||182,width=n[1]||40,inner=Math.max(20,outer*.3),teeth=18;return [annulus(outer*.86,inner,width,'darkMetal'),annulus(outer*.52,inner,width*1.12,'metal'),...Array.from({length:teeth},(_,i)=>{const a=PI*2*i/teeth;return box([width*.78,outer*.07,outer*.1],'paintedMetal',[0,Math.cos(a)*outer*.46,Math.sin(a)*outer*.46],[a,0,0])})]}
function bearingSeat(part){const n=nums(part.dimensions),height=n[0]||100,outer=n.find(v=>v>50&&v<height)||height*.62,inner=n.find(v=>v>30&&v<outer)||outer*.72,width=n[n.length-1]||32;return [extrude(height*.72,height,width,[hole(0,0,inner/2),hole(0,-height*.38,4),hole(0,height*.38,4)]),annulus(outer,inner,width*1.12,'darkMetal')]}
function hinge(part){const n=nums(part.dimensions),h=n[0]||60,w=n[1]||30;return [box([h,w*.44,3],'metal',[0,-w*.25,0]),box([h,w*.44,3],'metal',[0,w*.25,0]),cyl(Math.max(3,w*.11),h,'darkMetal'),...[-h*.3,h*.3].flatMap(x=>[-1,1].map(y=>({type:'torus',radius:Math.max(2,w*.08),tube:Math.max(.5,w*.02),position:[x,y*w*.25,3],material:'darkMetal'})))]}
function plate(part){
  const n=nums(part.dimensions),w=n[0]||140,h=n[1]||50,d=n[2]||Math.max(3,Math.min(w,h)*.08),name=part.nameZh;
  if(/弯板|座板|托板|连接板|支架/.test(name))return [extrude(w,h,Math.max(4,d*.18),[hole(-w*.3,0,Math.max(3,h*.06)),hole(w*.3,0,Math.max(3,h*.06))]),box([w,Math.max(6,h*.12),Math.max(14,d)],'darkMetal',[0,-h*.45,-d*.4]),box([Math.max(8,d*.22),h,Math.max(14,d)],'metal',[-w*.46,0,-d*.35])];
  if(/压线块/.test(name))return [box([w,h,d],'paintedMetal'),...Array.from({length:5},(_,i)=>box([Math.max(3,w*.035),h*.78,d*.35],'darkMetal',[-w*.25+i*w*.125,0,d*.65]))];
  return [extrude(w,h,Math.max(.1,d),[hole(-w*.34,0,Math.max(2,h*.07)),hole(w*.34,0,Math.max(2,h*.07))]),box([w*.88,Math.max(4,h*.06),Math.max(2,d*.55)],'darkMetal',[0,-h*.3,d*.55])];
}
function brush(part){const n=nums(part.dimensions),length=n[0]||260,width=n[1]||40,height=n[2]||15;return [box([length,width,Math.max(5,height*.4)],'paintedMetal',[0,0,height*.18]),...Array.from({length:26},(_,i)=>box([Math.max(2,length/100),width*.76,height],'plastic',[-length*.47+i*length*.94/25,0,-height*.42],[0,0,i%2?.05:-.05]))]}
function casing(part){const n=nums(part.dimensions),length=n[0]||600,width=n[1]||400,height=n[2]||Math.max(120,width*.4);return [box([length,width,8],'paintedMetal',[0,0,height/2]),box([length,8,height],'paintedMetal',[0,-width/2,height/4]),box([length,8,height],'paintedMetal',[0,width/2,height/4]),box([8,width,height],'darkMetal',[-length/2,0,height/4]),...[-length*.32,0,length*.32].map(x=>box([16,width*.92,height*.78],'metal',[x,0,height*.15]))]}
function shaft(part){const n=nums(part.dimensions),length=Math.max(...n,45),diameter=n.find(v=>v!==length&&v<=60)||12;return [cyl(diameter/2,length,'metal'),cyl(diameter*.38,Math.max(10,diameter),'darkMetal',[-length*.48,0,0]),box([length*.2,diameter*.16,diameter*.15],'darkMetal',[length*.25,diameter*.45,0])]}
function flange(part){const n=nums(part.dimensions),outer=n[0]||310,width=n[1]||2,inner=outer*.82;return [annulus(outer,inner,width,'metal'),...Array.from({length:8},(_,i)=>{const a=PI*2*i/8;return {type:'torus',radius:Math.max(2,outer*.016),tube:Math.max(.5,outer*.004),position:[0,Math.cos(a)*outer*.44,Math.sin(a)*outer*.44],rotation:[0,PI/2,0],material:'darkMetal'}})]}
function telescopic(part){const n=nums(part.dimensions),length=n[0]||2200,diameter=n[1]||310;return [cyl(diameter/2,length*.58,'paintedMetal',[-length*.2,0,0]),cyl(diameter*.43,length*.58,'metal',[length*.2,0,0]),annulus(diameter*1.08,diameter*.82,32,'darkMetal')]}
function clamp(part){const n=nums(part.dimensions),diameter=n[0]||304,length=n[1]||185;return [{type:'torus',radius:diameter/2,tube:Math.max(8,length*.08),rotation:[0,PI/2,0],material:'paintedMetal'},box([length*.9,diameter*.18,diameter*.12],'darkMetal',[0,diameter*.54,0]),cyl(Math.max(5,diameter*.025),diameter*.25,'metal',[0,diameter*.54,0],'y')]}
function bendPipe(part){const n=nums(part.dimensions),length=n[0]||897,height=n[1]||426,diameter=n[2]||263;return [{type:'tube',points:[[-length/2,-height*.3,0],[-length*.25,-height*.3,0],[-length*.05,-height*.18,0],[length*.12,height*.05,0],[length*.35,height*.22,0],[length/2,height*.24,0]],radius:diameter*.48,radialSegments:18,material:'paintedMetal'}]}
function sleeve(part){const n=nums(part.dimensions),length=n[0]||450,diameter=n[1]||Math.max(180,length*.72);return [annulus(diameter,diameter*.86,length,'paintedMetal'),annulus(diameter*1.08,diameter*.84,Math.max(16,length*.06),'darkMetal',[length*.48,0,0])]}
function door(part){const n=nums(part.dimensions),w=n[0]||616,h=n[1]||384.5,d=n[2]||Math.max(18,h*.05);return [box([w,h,Math.max(6,d*.12)]),box([w*.92,16,d],'darkMetal',[0,-h*.45,-d*.4]),box([w*.92,16,d],'darkMetal',[0,h*.45,-d*.4]),box([16,h*.88,d],'metal',[-w*.45,0,-d*.4]),{type:'tube',points:[[w*.28,-h*.18,d*.18],[w*.36,-h*.18,d*.55],[w*.36,h*.18,d*.55],[w*.28,h*.18,d*.18]],radius:Math.max(5,d*.07),material:'darkMetal'}]}
function limitSwitch(part){const n=nums(part.dimensions),length=n[0]||235,width=n[1]||85,height=n[2]||39;return [box([length*.72,width,height],'paintedMetal',[length*.08,0,0]),cyl(height*.15,length*.45,'metal',[-length*.42,0,0]),box([length*.15,width*.8,height*.72],'darkMetal',[length*.42,0,0])]}
function winding(part){const n=nums(part.dimensions),thickness=n[0]||.8;return [{type:'torus',radius:120,tube:36,material:'rubber'},{type:'torus',radius:65,tube:24,material:'darkMetal'},box([210,Math.max(1,thickness),22],'rubber',[-150,-120,0],[0,0,PI/2])]}
function roller(part){const n=nums(part.dimensions),length=n[0]||780,diameter=90;return [cyl(diameter/2,length,'darkMetal'),cyl(16,length+120,'metal'),annulus(diameter*1.08,34,34,'paintedMetal',[-length*.46,0,0]),annulus(diameter*1.08,34,34,'paintedMetal',[length*.46,0,0])]}
function beam(part){const n=nums(part.dimensions),length=n[0]||1100,height=n[1]||80,width=n[2]||Math.max(18,height*.35);return [box([length,width,Math.max(6,height*.18)]),box([length,Math.max(6,width*.2),height],'darkMetal',[0,-width*.42,height*.3]),...[-length*.34,0,length*.34].map(x=>box([Math.max(6,length*.012),width*.92,height*.7],'metal',[x,0,height*.25]))]}
function lock(part){const n=nums(part.dimensions),height=n[0]||45,length=n[n.length-1]||33.5;return [box([length,height*.7,height],'darkMetal'),cyl(height*.22,length*.7,'metal'),box([length*1.5,height*.18,height*.24],'metal',[length*.55,0,-height*.28])]}
function handle(){return [{type:'tube',points:[[-85,-45,0],[-85,-45,35],[-60,-45,55],[-20,-45,60],[20,-45,60],[60,-45,55],[85,-45,35],[85,-45,0]],radius:8,material:'metal'},box([28,20,6],'darkMetal',[-85,-45,0]),box([28,20,6],'darkMetal',[85,-45,0])]}
function magnet(part){const n=nums(part.dimensions),diameter=n[0]||50,length=n[1]||50;return [cyl(diameter/2,Math.max(18,length*.35),'darkMetal'),cyl(Math.max(5,diameter*.12),length,'metal',[length*.4,0,0]),cyl(diameter*.24,10,'metal',[length*.72,0,0])]}
function chain(part){const n=nums(part.dimensions),length=n[0]||46,width=n[1]||35;return [{type:'torus',radius:width*.34,tube:width*.1,position:[-length*.24,0,0],material:'darkMetal'},{type:'torus',radius:width*.34,tube:width*.1,position:[length*.24,0,0],material:'metal'},box([length*.48,width*.18,width*.16],'metal')]}
function coupling(part){const n=nums(part.dimensions),height=n[0]||90;return [box([height*.65,height*.8,height*.24],'darkMetal'),...Array.from({length:8},(_,i)=>box([height*.5,Math.max(2,height*.025),height*.12],'metal',[height*.38,0,-height*.35+i*height*.1])),cyl(height*.08,height*.75,'metal',[0,0,0],'y')]}
function clasp(part){const n=nums(part.dimensions),h=n[0]||90,w=n[1]||20;return [{type:'tube',points:[[-h*.35,-w,0],[-h*.1,-w,0],[h*.12,-w*.7,0],[h*.3,0,0],[h*.12,w*.7,0],[-h*.1,w,0],[-h*.35,w,0]],radius:Math.max(3,w*.16),material:'paintedMetal'},box([h,w*.5,4],'darkMetal')]}
function column(part){const n=nums(part.dimensions),length=n[0]||2120,width=n[1]||75;return [box([length,width,10]),box([length,10,width],'darkMetal',[0,-width*.44,width*.42]),...Array.from({length:7},(_,i)=>box([12,width*.84,width*.6],'metal',[-length*.42+i*length*.84/6,0,width*.2]))]}
function hood(part){const n=nums(part.dimensions),length=n[0]||800,width=n[1]||330;return [box([length,width,8]),box([length,12,width*.45],'darkMetal',[0,-width*.46,-width*.2]),box([length,12,width*.45],'darkMetal',[0,width*.46,-width*.2]),box([12,width*.88,width*.4],'metal',[-length*.48,0,-width*.18]),box([12,width*.88,width*.4],'metal',[length*.48,0,-width*.18])]}

function choose(part){const n=part.nameZh;
  if(/密封条|覆盖带/.test(n))return {material:'rubber',primitives:strip(part),note:'按厂家截面和可确认的长度建立黑色柔性件，不使用金属材质代替。'};
  if(/调节垫片/.test(n))return {material:'metal',primitives:gasket(part),note:'按厂家90×45、φ15和各自厚度建立独立调节垫片。'};
  if(n==='链轮')return {material:'darkMetal',primitives:sprocket(part),note:'按厂家外径、轮宽与链轮语义建立轮毂和周向齿；未标齿数按原格比例示意。'};
  if(/轴承座/.test(n))return {material:'paintedMetal',primitives:bearingSeat(part),note:'按厂家外形、轴承孔和安装耳语义建立轴承座。'};
  if(n==='铰链')return {material:'metal',primitives:hinge(part),note:'按厂家单格外形建立铰链叶片、中轴和安装孔；未标尺寸项为轮廓级。'};
  if(/刷子/.test(n))return {material:'plastic',primitives:brush(part),note:'按厂家外形尺寸建立刷座、背板和分布式柔性刷毛。'};
  if(/座架结合件|输棉斗结合件|输棉方管结合件/.test(n))return {material:'paintedMetal',primitives:casing(part),note:'按厂家三向外形尺寸建立壳体、端板与加强档。'};
  if(/销钉|销轴|^轴$|支撑柱/.test(n))return {material:'metal',primitives:shaft(part),note:'按厂家长度、直径与台阶语义建立轴/销件。'};
  if(n==='密封板')return {material:'rubber',primitives:flange(part),note:'中文为密封板、英文为SEALING STRIP；按厂家φ297×2建立柔性环板并保留原文。'};
  if(n==='圆法兰')return {material:'metal',primitives:flange(part),note:'按厂家φ310×2建立薄环法兰和周向孔位语义。'};
  if(n==='伸缩管结合件')return {material:'paintedMetal',primitives:telescopic(part),note:'按厂家2200与φ310建立内外套管和法兰环。'};
  if(n==='管卡结合件')return {material:'paintedMetal',primitives:clamp(part),note:'按厂家φ304与185建立环抱管卡、紧固耳和螺栓。'};
  if(n==='法兰套结合件')return {material:'paintedMetal',primitives:sleeve({...part,dimensions:['70','300']}),note:'厂家单格只明确长度70；外径与内径仅按原格圆环轮廓估算，不写入source.dimensions。'};
  if(n==='吸棉弯管结合件')return {material:'paintedMetal',primitives:bendPipe(part),note:'按厂家897×426×263建立弯管中心路径和圆管截面。'};
  if(/防护内套|防护外套/.test(n))return {material:'paintedMetal',primitives:sleeve(part),note:'按厂家外径/高度建立薄壁防护套及端部折边。'};
  if(/罩门结合件|侧门结合件/.test(n))return {material:'paintedMetal',primitives:door(part),note:'按厂家外形尺寸建立门板、折边、加强条与拉手语义。'};
  if(/限位开关/.test(n))return {material:'paintedMetal',primitives:limitSwitch(part),note:'按厂家235×85×39建立开关壳体、推杆和安装板。'};
  if(/防护罩结合件/.test(n))return {material:'paintedMetal',primitives:hood(part),note:'按厂家长度与宽度建立薄壁防护罩、折边和加强档。'};
  if(/玻璃窗/.test(n))return {material:'glass',primitives:[box([nums(part.dimensions)[0]||100,nums(part.dimensions)[1]||200,5],'glass'),box([12,nums(part.dimensions)[1]||200,12],'darkMetal',[-(nums(part.dimensions)[0]||100)*.48,0,0]),box([12,nums(part.dimensions)[1]||200,12],'darkMetal',[(nums(part.dimensions)[0]||100)*.48,0,0])],note:'按厂家100×200建立透明玻璃板和边框语义。'};
  if(/卷帘/.test(n))return {material:'rubber',primitives:winding(part),note:'按卷帘柔性卷绕语义建立卷芯和下垂帘面；卷帘（一）未标尺寸，卷帘（二）只使用厚0.8。'};
  if(n==='导辊结合件')return {material:'metal',primitives:roller(part),note:'按厂家总长780建立辊体、贯通轴与两端轴承座语义。'};
  if(/撑挡结合件|电缆盖板|角钢/.test(n))return {material:'paintedMetal',primitives:beam(part),note:'按厂家长度和截面尺寸建立长条支撑/槽型件。'};
  if(n==='门锁')return {material:'darkMetal',primitives:lock(part),note:'按厂家锁体尺寸建立锁芯、锁舌与安装座。'};
  if(n==='门吸铁')return {material:'darkMetal',primitives:magnet(part),note:'按厂家φ50×10建立磁吸头、螺杆与锁紧座。'};
  if(n==='拉手装置')return {material:'metal',primitives:handle(),note:'厂家未标尺寸；按原格三角形拉手、上部孔座和两端安装座建立轮廓级模型。'};
  if(/拖链|链条/.test(n))return {material:'darkMetal',primitives:chain(part),note:'按厂家链节外形尺寸建立双环链节样段；不按286节全长展开。'};
  if(/固定接头/.test(n))return {material:'darkMetal',primitives:coupling(part),note:'按厂家总高90和接头轮廓建立壳体、齿形端子与销轴。'};
  if(n==='线卡')return {material:'paintedMetal',primitives:clasp(part),note:'按厂家90×20建立弧形线卡和两端安装孔。'};
  if(/立柱结合件/.test(n))return {material:'paintedMetal',primitives:column(part),note:'按厂家2120×75建立立柱、边缘折边和分段加强节点。'};
  return {material:'paintedMetal',primitives:plate(part),note:'按厂家原格轮廓和明确外形尺寸建立板件/支承件，未标孔距、壁厚、圆角和折弯半径只作预览估算。'};
}

export function createJwf1012P26P33Spec(part){const model=choose(part),dimensions=Array.isArray(part.dimensions)?part.dimensions:[];return {level:dimensions.length?'尺寸级':'轮廓级',material:model.material,source:{page:part.pdfPage,item:part.item,code:part.code,recordKey:part.recordKey,nameZh:part.nameZh,quantity:part.quantity,dimensions,views:[`第${part.pdfPage}页厂家原格`],assumptions:[model.note,dimensions.length?'厂家明确尺寸直接用于主轮廓；未标孔距、壁厚、圆角、焊缝和连接细节不作制造依据。':'厂家未标几何尺寸；本模型仅按原格轮廓建立识别级外形。']},primitives:model.primitives};}
