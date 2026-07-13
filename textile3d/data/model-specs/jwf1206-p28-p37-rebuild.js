// JWF1206 第28—37页逐格重建：只允许按 recordKey 取已审核的视图结构。
const PI=Math.PI;
const rect=(w,h)=>[[-w/2,-h/2],[w/2,-h/2],[w/2,h/2],[-w/2,h/2]];
const hole=(x,y,r)=>({kind:'circle',center:[x,y],radius:r});
const box=(size,material='paintedMetal',position=[0,0,0],rotation=[0,0,0])=>({type:'box',size,material,position,rotation});
const cyl=(radius,length,axis='x',material='metal',position=[0,0,0],radialSegments=48)=>({type:'cylinder',radius,length,axis,material,position,radialSegments});
const extrude=(points,depth,holes=[],material='paintedMetal',rotation=[0,0,0],position=[0,0,0])=>({type:'extrude',points,depth,holes,material,rotation,position,bevel:0});
const lathe=(points,material='metal',position=[0,0,0],rotation=[0,0,PI/2])=>({type:'lathe',points,material,position,rotation});
const annulus=(outer,inner,width,material='metal',position=[0,0,0])=>lathe([[inner/2,-width/2],[outer/2,-width/2],[outer/2,width/2],[inner/2,width/2],[inner/2,-width/2]],material,position);
const arcShell=(length,radius,angle,thickness,segments=16,material='paintedMetal')=>Array.from({length:segments},(_,i)=>{
  const da=angle/segments,a=-angle/2+da*(i+.5),chord=2*radius*Math.sin(Math.abs(da)/2);
  return box([length,thickness,chord],material,[0,Math.sin(a)*radius,Math.cos(a)*radius],[a,0,0]);
});
const S=(views,assumptions,material,primitives)=>({views,assumptions,material,primitives});
const V={frontSide:['厂家原格主视图与侧视/端视图联合定形；尺寸线、中心线不当作实体'],frontSection:['厂家原格主视图与下方截面/端视图联合定形'],axial:['厂家原格轴向主视或纵向剖视；点画线为回转中心线'],section:['厂家原格截面图沿零件长度方向拉伸']};
const exact='明示尺寸用于主轮廓；未标板厚、孔径、圆角和内部结构仅按原格比例做视觉表达，不作加工依据。';

const D={
  // 第28页：JWF1204-3500A 第1页
  'jwf1206-p28-item-001':S(V.frontSection,[exact,'主视1080长条两端斜收；下方图是顶视，不是另一块板。'],'paintedMetal',[
    extrude([[-540,-36],[-515,-18],[515,-18],[540,-36],[540,36],[-540,36]],35,[hole(-510,0,5),hole(510,0,5)],'paintedMetal'),box([1040,12,48],'metal',[0,-30,-12])
  ]),
  'jwf1206-p28-item-002':S(V.frontSide,[exact,'1122长组合盖板包含中间双长条、两端轴座/连接耳，不等同于实心长方体。'],'paintedMetal',[
    box([1019,18,12]),box([1019,18,12],'paintedMetal',[0,42,0]),box([1019,8,22],'darkMetal',[0,0,-8]),
    box([42,71,30],'metal',[-540,0,0]),box([42,71,30],'metal',[540,0,0]),cyl(8,38,'y','darkMetal',[-510,0,-20]),cyl(8,38,'y','darkMetal',[510,0,-20])
  ]),
  'jwf1206-p28-item-003':S(V.frontSide,[exact,'侧视显示弧形吸口壳与下缘支架；两根M8为安装螺杆，不是管体。'],'paintedMetal',[
    box([1138,12,92.5],'paintedMetal',[0,0,18]),box([1138,22,22],'darkMetal',[0,-18,-20]),
    ...arcShell(1138,70,0.95,4,12),cyl(4,62,'z','metal',[-532,-30,-40]),cyl(4,62,'z','metal',[532,-30,-40])
  ]),
  'jwf1206-p28-item-004':S(V.frontSide,[exact,'主体是1138长侧密封壳，端视为内凹曲面和底部安装边。'],'paintedMetal',[
    box([1138,10,66]),box([1138,18,18],'darkMetal',[0,-16,-25]),...arcShell(1138,48,0.85,4,10),
    cyl(4,55,'z','metal',[-532,-24,-38]),cyl(4,55,'z','metal',[532,-24,-38])
  ]),
  'jwf1206-p28-item-005':S(V.frontSection,[exact,'1080×10×3为长条密封件，材质按橡胶表达。'],'rubber',[box([1080,10,3],'rubber')]),
  'jwf1206-p28-item-006':S(V.frontSide,[exact,'下盖板同样由两根长条和两端连接件组成，截面高度71。'],'paintedMetal',[
    box([1019,18,12]),box([1019,18,12],'paintedMetal',[0,-42,0]),box([1019,8,22],'darkMetal',[0,0,-8]),
    box([42,71,30],'metal',[-540,0,0]),box([42,71,30],'metal',[540,0,0])
  ]),
  'jwf1206-p28-item-007':S(V.frontSection,[exact,'上罩板是R643.5弧面薄板，主视中部宽1024、两端加宽到1134并带安装孔。'],'paintedMetal',[
    ...arcShell(1024,643.5,0.17,3,12),box([55,107,3],'paintedMetal',[-539,0,0]),box([55,107,3],'paintedMetal',[539,0,0]),
    cyl(4,5,'z','darkMetal',[-520,-22,0]),cyl(4,5,'z','darkMetal',[520,-22,0])
  ]),
  'jwf1206-p28-item-008':S(V.frontSection,[exact,'下罩板是长1080、R643.5的弧面薄板，侧视端高146.5。'],'paintedMetal',[...arcShell(1080,643.5,0.23,3,14),box([1080,10,18],'metal',[0,-73,-638])]),
  'jwf1206-p28-item-009':S(V.frontSide,[exact,'主视左端为圆头并带通孔，侧视确定40长的块状深度。'],'metal',[
    extrude([[-20,-12],[9,-12],[20,-5],[20,12],[-20,12]],40,[hole(-10,0,6)],'metal',[0,PI/2,0])
  ]),
  'jwf1206-p28-item-010':S(V.frontSide,[exact,'主视是非圆的68.5×105吸口，侧视显示锥形过渡到短圆管与端法兰。'],'paintedMetal',[
    {type:'loft',material:'paintedMetal',sections:[
      {x:-66,points:[[-34.25,-40],[-23,-52.5],[23,-52.5],[34.25,-40],[34.25,31],[23,52.5],[-23,52.5],[-34.25,31]]},
      {x:-15,points:[[-34,-31],[-24,-24],[0,-34],[24,-24],[34,0],[24,24],[0,34],[-24,24]]},
      {x:16,points:[[-34,0],[-24,-24],[0,-34],[24,-24],[34,0],[24,24],[0,34],[-24,24]]}
    ]},
    extrude([[-34.25,-40],[-23,-52.5],[23,-52.5],[34.25,-40],[34.25,31],[23,52.5],[-23,52.5],[-34.25,31]],5,[{kind:'polygon',points:[[-27,-36],[-19,-45],[19,-45],[27,-35],[27,27],[18,44],[-18,44],[-27,27]]}],'metal',[0,PI/2,0],[-69,0,0]),
    cyl(34,55,'x','paintedMetal',[43,0,0]),annulus(82,68,6,'metal',[72,0,0])
  ]),
  'jwf1206-p28-item-011':S(V.axial,[exact,'厂家明确外径92、内径62、宽25。'],'rubber',[annulus(92,62,25,'rubber')]),
  'jwf1206-p28-item-012':S(V.frontSide,[exact,'96×74×2封板；中部U形缺口和四角安装孔按主视轮廓建立。'],'paintedMetal',[
    extrude(rect(74,96),2,[hole(-27,-36,4),hole(27,-36,4),hole(-27,36,4),hole(27,36,4),{kind:'polygon',points:[[-20,-15],[-20,22],[-12,35],[12,35],[20,22],[20,-15]]}])
  ]),

  // 第29页：JWF1204-3500A 第2页
  'jwf1206-p29-item-001':S(V.frontSide,[exact,'55×20×6压板，两孔中心距25。'],'metal',[extrude(rect(55,20),6,[hole(-12.5,0,4),hole(12.5,0,4)],'metal')]),
  'jwf1206-p29-item-002':S(V.axial,[exact,'M8内六角螺钉：螺纹杆长40、总长48；左端是螺钉头。'],'metal',[cyl(4,40,'x','metal',[4,0,0]),cyl(7,8,'x','darkMetal',[-20,0,0],6),cyl(3,3,'x','darkMetal',[-24,0,0],6)]),
  'jwf1206-p29-item-003':S(V.frontSection,[exact,'截面上部为R4.5圆冠、下部为12×7卡脚，整体沿1080长度拉伸。'],'rubber',[box([1080,12,7],'rubber',[0,-3.5,0]),cyl(4.5,1080,'x','rubber',[0,4.5,0])]),
  'jwf1206-p29-item-004':S(V.frontSide,[exact,'φ10×60销；主视另显示侧孔、长方窗和右端挡肩。'],'metal',[cyl(5,60,'x','metal'),cyl(8,4,'x','darkMetal',[28,0,0]),cyl(2.5,12,'z','darkMetal',[-18,0,0]),box([18,4,3],'darkMetal',[8,5,0])]),
  'jwf1206-p29-item-005':S(V.frontSection,[exact,'名称中590不当作长度；厂家图明示φ8×700。'],'rubber',[cyl(4,700,'x','rubber')]),
};

function source(part,definition){return{page:part.page,item:part.item,code:part.code,recordKey:part.recordKey,nameZh:part.name,nameEn:part.nameEn,quantity:{value:part.quantity,unit:part.quantityUnit,meaning:part.quantityMeaning},dimensions:part.dims,sourceCrop:part.sourceCrop,sourceVector:part.sourceVector,views:definition.views,assumptions:definition.assumptions};}
export function createJwf1206P28P37Spec(part){const definition=D[part.recordKey];if(!definition)throw new Error('JWF1206第28—37页缺少逐格重建规格：'+part.recordKey);return{level:part.dims.length?'尺寸级':'轮廓级',material:definition.material,source:source(part,definition),primitives:definition.primitives};}
export const jwf1206P28P37RebuildKeys=Object.freeze(Object.keys(D));
export default createJwf1206P28P37Spec;
