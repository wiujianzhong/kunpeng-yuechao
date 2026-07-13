// JWF1206 原PDF第6页：逐格依据厂家原图的视图、轮廓和明示尺寸建立。
// 坐标单位为毫米，X=宽、Y=高、Z=深；图纸未标尺寸只作视觉估算并写入 assumptions。
const PI=Math.PI;

const channelPrimitives=(length,{divider=false,segments=[],bolts=[]}={})=>{
  const primitives=[
    {type:'box',size:[length,55,3],position:[0,0,31.5]},
    {type:'box',size:[length,3,66],position:[0,-26,0]},
    {type:'box',size:[length,55,3],position:[0,0,-31.5]},
    {type:'box',size:[length,3,18],position:[0,26,-40.5]},
  ];
  if(divider){
    primitives.push(
      {type:'box',size:[length,43,3],position:[0,-5,-2]},
      {type:'box',size:[length,3,22],position:[0,-25,8]},
    );
  }
  for(const [width,x] of segments)primitives.push({type:'box',size:[width,5,12],position:[x,21,-37],material:'darkMetal'});
  for(const x of bolts)primitives.push({type:'cylinder',radius:4,length:5,axis:'y',position:[x,24,-40.5],material:'metal'});
  return primitives;
};

export const jwf1206P06ModelSpecs = {
  'JWF1202-0100-3': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 6,
      dimensions: ['X=140', 'Y=150', 'Z=147.5'],
      views: ['俯视图', '左视图'],
      assumptions: ['原图140×150为俯视宽深包络，147.5为左视高度，不再把俯视误当正视', '俯视两孔均在水平托板；左视两孔分属竖板和底脚', '板厚、孔径、台阶深度和折弯圆角未标，按两视图比例表达'],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-70,-75],[20,-75],[20,50],[70,50],[70,75],[-70,75]],
        depth: 4,
        position: [0,24,0],
        rotation: [PI/2,0,0],
        bevel: 1,
        holes: [
          {kind:'circle',center:[-49,-54],radius:6},
          {kind:'circle',center:[-49,49],radius:6},
        ],
      },
      {
        type:'extrude',
        points:[[-75,-73.75],[75,-73.75],[75,-55],[22,-55],[22,73.75],[-18,73.75],[-18,22],[-75,22]],
        depth:4,
        position:[-2,0,0],
        rotation:[0,PI/2,0],
        bevel:1,
        holes:[{kind:'circle',center:[-50,-55],radius:6},{kind:'circle',center:[0,-55],radius:6}],
      },
    ],
  },

  'JWF1202-0100-11': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 6,
      dimensions: ['X=912', 'Y=830'],
      views: ['正视图'],
      assumptions: ['门体背面和厚度未给出，按28估算', '按厂家正视重新标定：右铰链框约占总宽27%，三条百叶位于左下部，顶部提手为宽扁梯形而非细条', '铰链轴径、门厚和百叶内部折边未标，保留轮廓级'],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-456, -415], [456, -415], [456, 415], [-456, 415]],
        depth: 28,
        position: [0, 0, -14],
        bevel: 2,
        holes: [
          {kind:'polygon',points:[[-390,-133],[180,-133],[180,-117],[-390,-117]]},
          {kind:'polygon',points:[[-390,-105],[180,-105],[180,-89],[-390,-89]]},
          {kind:'polygon',points:[[-390,-77],[180,-77],[180,-61],[-390,-61]]},
        ],
      },
      {type:'box',size:[240,810,10],position:[336,0,18],material:'darkMetal'},
      {type:'box',size:[18,810,18],position:[286,0,27],material:'metal'},
      {type:'box',size:[18,810,18],position:[406,0,27],material:'metal'},
      {type:'extrude',points:[[-397,415],[-397,466],[130,466],[210,415]],depth:18,position:[0,0,14],material:'darkMetal'},
      {type:'box',size:[28,760,12],position:[-470,-5,10],material:'darkMetal'},
      ...[265,0,-265].flatMap(y=>[
        {type:'cylinder',radius:6,length:32,axis:'y',position:[286,y,30],material:'metal'},
        {type:'cylinder',radius:6,length:32,axis:'y',position:[406,y,30],material:'metal'},
      ]),
    ],
  },

  'JWF1202-0100-12': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 6,
      dimensions: ['X=912', 'Y=830'],
      views: ['正视图'],
      assumptions: ['门体背面和厚度未给出，按28估算', '按厂家正视重新标定：左铰链框约占总宽27%，三条百叶位于右下部，顶部提手为右伸宽扁梯形', '右下小孔为门板实体孔；其他中心十字和引出线不建实体'],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-456, -415], [456, -415], [456, 415], [-456, 415]],
        depth: 28,
        position: [0, 0, -14],
        bevel: 2,
        holes: [
          {kind:'polygon',points:[[-180,-133],[390,-133],[390,-117],[-180,-117]]},
          {kind:'polygon',points:[[-180,-105],[390,-105],[390,-89],[-180,-89]]},
          {kind:'polygon',points:[[-180,-77],[390,-77],[390,-61],[-180,-61]]},
          {kind:'circle',center:[397,-360],radius:7},
        ],
      },
      {type:'box',size:[240,810,10],position:[-336,0,18],material:'darkMetal'},
      {type:'box',size:[18,810,18],position:[-406,0,27],material:'metal'},
      {type:'box',size:[18,810,18],position:[-286,0,27],material:'metal'},
      {type:'extrude',points:[[-210,415],[-130,466],[397,466],[397,415]],depth:18,position:[0,0,14],material:'darkMetal'},
      ...[265,0,-265].flatMap(y=>[
        {type:'cylinder',radius:6,length:32,axis:'y',position:[-406,y,30],material:'metal'},
        {type:'cylinder',radius:6,length:32,axis:'y',position:[-286,y,30],material:'metal'},
      ]),
    ],
  },

  'FA225-0100-1': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 6,
      dimensions: ['X=2490', 'Y=55'],
      views: ['正视图', '左视图（端面）'],
      assumptions: ['本格未标槽宽，按同页左后线槽FA225-0100-3的66只作轮廓参考', '端部图不是对称U槽：左壁无顶翻边，右壁向外翻边并带紧固块，中间隔板自底部立起', '板厚、折弯圆角和隔板定位未标，按端部轮廓表达'],
    },
    primitives:channelPrimitives(2490,{divider:true,segments:[[1790,-310],[285,1090]]}),
  },

  'FA225-0100-2': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 6,
      dimensions: ['X=624', 'Y=55'],
      views: ['正视图', '左视图（端面）'],
      assumptions: ['本格未标槽宽，按同页左前线槽FA225-0100-4的66只作轮廓参考', '端部图不是对称U槽：左壁无顶翻边，右壁向外翻边并带紧固块，中间隔板与底脚独立成形', '正视两段安装条和三紧固点按原图左右分段表达'],
    },
    primitives:channelPrimitives(624,{divider:true,segments:[[205,-192],[205,192]],bolts:[-220,0,220]}),
  },

  'FA225-0100-3': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 6,
      dimensions: ['X=2490', 'Y=55', 'Z=66'],
      views: ['正视图', '左视图（端面）'],
      assumptions: ['三向外廓尺寸取自原图', '端部截面为不对称折弯槽：左壁平口，右壁向外翻边并在下方配紧固块', '板厚、折弯圆角和紧固块尺寸未标，因此不再标尺寸级'],
    },
    primitives:channelPrimitives(2490,{segments:[[2490,0]]}),
  },

  'FA225-0100-4': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 6,
      dimensions: ['X=624', 'Y=55', 'Z=66'],
      views: ['正视图', '左视图（端面）'],
      assumptions: ['三向外廓尺寸取自原图', '端部截面为不对称折弯槽：左壁平口，右壁向外翻边并在下方配紧固块', '板厚、折弯圆角和三紧固点实际规格未标，保留轮廓级'],
    },
    primitives:channelPrimitives(624,{segments:[[624,0]],bolts:[-250,-120,250]}),
  },

  'FA225-0100-36': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 6,
      dimensions: ['X=1051'],
      views: ['开启状态左视图', '正视图'],
      assumptions: ['本格只给总宽1051；罩板深度、开启角度、支臂和气弹簧长度均按两视图比例估算', '该零件为铰接罩总成，已按图建立罩板、横向铰轴、双侧支臂、气弹簧和安装梁，不作为工程装配尺寸'],
    },
    primitives: [
      { type: 'box', size: [1051, 18, 480], position: [0, 125, -65], rotation: [-0.72, 0, 0] },
      { type: 'box', size: [1051, 62, 18], position: [0, 270, -232], rotation: [-0.72, 0, 0] },
      { type: 'box', size: [1051, 36, 68], position: [0, -162, 82], material: 'darkMetal' },
      { type: 'cylinder', radius: 22, length: 1051, axis: 'x', position: [0, -128, 142], material: 'metal' },
      { type: 'box', size: [22, 28, 410], position: [-480, 5, 52], rotation: [0.88, 0, 0], material: 'darkMetal' },
      { type: 'box', size: [22, 28, 410], position: [480, 5, 52], rotation: [0.88, 0, 0], material: 'darkMetal' },
      { type: 'cylinder', radius: 9, length: 310, axis: 'z', position: [-485, 75, -5], rotation: [-0.68, 0, 0], material: 'metal' },
      { type: 'cylinder', radius: 9, length: 310, axis: 'z', position: [485, 75, -5], rotation: [-0.68, 0, 0], material: 'metal' },
      { type: 'cylinder', radius: 28, length: 28, axis: 'x', position: [-488, -128, 142], material: 'darkMetal' },
      { type: 'cylinder', radius: 28, length: 28, axis: 'x', position: [488, -128, 142], material: 'darkMetal' },
    ],
  },

  'JWF1206-0101': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 6,
      dimensions: ['X=974', 'Y=160'],
      views: ['展开平面图'],
      assumptions: ['图纸未标板厚，按3估算', '中部避让缺口和五个安装孔的位置、孔径按展开图比例估算'],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-487, -80], [487, -80], [487, 80], [60, 80], [60, 66], [45, 58], [-15, 58], [-30, 66], [-30, 80], [-487, 80]],
        depth: 3,
        position: [0, 0, -1.5],
        bevel: 1,
        holes: [
          { kind: 'circle', center: [-440, -70], radius: 4 },
          { kind: 'circle', center: [-225, -70], radius: 7 },
          { kind: 'circle', center: [45, -70], radius: 4 },
          { kind: 'circle', center: [150, -70], radius: 7 },
          { kind: 'circle', center: [355, -70], radius: 4 },
        ],
      },
    ],
  },

  'JWF1206-0102': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 6,
      dimensions: ['X=993', 'Y=160'],
      views: ['展开平面图'],
      assumptions: ['图纸未标板厚，按3估算', '上边两个避让缺口、下边小凸耳和安装孔的位置按展开图比例估算'],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-496.5, -80], [-360, -80], [-360, -58], [-328, -58], [-328, -80], [496.5, -80], [496.5, 60], [456, 60], [456, 80], [110, 80], [110, 64], [94, 56], [42, 56], [26, 64], [26, 80], [-496.5, 80]],
        depth: 3,
        position: [0, 0, -1.5],
        bevel: 1,
        holes: [
          { kind: 'circle', center: [-445, -69], radius: 7 },
          { kind: 'circle', center: [-365, -69], radius: 6 },
          { kind: 'circle', center: [-162, -69], radius: 4 },
          { kind: 'circle', center: [-40, -69], radius: 7 },
          { kind: 'circle', center: [365, -69], radius: 4 },
        ],
      },
    ],
  },

  'JWF1206-0103': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 6,
      dimensions: ['X=1212', 'Y=160'],
      views: ['展开平面图'],
      assumptions: ['图纸未标板厚，按3估算', '右上方两处避让缺口及安装孔位置按展开图比例估算'],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-606, -80], [606, -80], [606, 58], [526, 58], [526, 80], [458, 80], [458, 61], [442, 54], [410, 54], [394, 61], [394, 80], [-606, 80]],
        depth: 3,
        position: [0, 0, -1.5],
        bevel: 1,
        holes: [
          { kind: 'circle', center: [-540, -69], radius: 4 },
          { kind: 'circle', center: [-350, -69], radius: 7 },
          { kind: 'circle', center: [-225, -69], radius: 4 },
          { kind: 'circle', center: [108, -69], radius: 7 },
          { kind: 'circle', center: [335, -69], radius: 7 },
          { kind: 'circle', center: [455, -69], radius: 4 },
        ],
      },
    ],
  },

  'JWF1206-0104': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 6,
      dimensions: ['X=1213', 'Y=95'],
      views: ['展开平面图'],
      assumptions: ['图纸未标板厚，按3估算', '左下角避让台阶和六个安装孔的位置、孔径按展开图比例估算'],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-606.5, -47.5], [606.5, -47.5], [606.5, 47.5], [-606.5, 47.5], [-606.5, -15], [-585, -15], [-575, -30], [-606.5, -30]],
        depth: 3,
        position: [0, 0, -1.5],
        bevel: 1,
        holes: [
          { kind: 'circle', center: [-550, -36], radius: 6 },
          { kind: 'circle', center: [-355, -36], radius: 4 },
          { kind: 'circle', center: [-230, -36], radius: 7 },
          { kind: 'circle', center: [100, -36], radius: 4 },
          { kind: 'circle', center: [325, -36], radius: 7 },
          { kind: 'circle', center: [450, -36], radius: 7 },
        ],
      },
    ],
  },

  'JWF1206-0105': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 6,
      dimensions: ['X=993', 'Y=95'],
      views: ['展开平面图'],
      assumptions: ['图纸未标板厚，按3估算', '下边小避让缺口和四个安装孔的位置、孔径按展开图比例估算'],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-496.5, -47.5], [-245, -47.5], [-245, -30], [-225, -30], [-225, -47.5], [496.5, -47.5], [496.5, 47.5], [-496.5, 47.5]],
        depth: 3,
        position: [0, 0, -1.5],
        bevel: 1,
        holes: [
          { kind: 'circle', center: [-435, 36], radius: 4 },
          { kind: 'circle', center: [-360, 36], radius: 7 },
          { kind: 'circle', center: [-163, 36], radius: 4 },
          { kind: 'circle', center: [-40, 36], radius: 7 },
          { kind: 'circle', center: [360, 36], radius: 4 },
        ],
      },
    ],
  },

  'JWF1206-0106': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 6,
      dimensions: ['X=974', 'Y=95'],
      views: ['展开平面图'],
      assumptions: ['图纸未标板厚，按3估算', '本格外廓为矩形；五个安装孔的位置、孔径按展开图比例估算'],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-487, -47.5], [487, -47.5], [487, 47.5], [-487, 47.5]],
        depth: 3,
        position: [0, 0, -1.5],
        bevel: 1,
        holes: [
          { kind: 'circle', center: [-440, 36], radius: 7 },
          { kind: 'circle', center: [-225, 36], radius: 4 },
          { kind: 'circle', center: [40, 36], radius: 7 },
          { kind: 'circle', center: [140, 36], radius: 4 },
          { kind: 'circle', center: [360, 36], radius: 7 },
        ],
      },
    ],
  },
};

for (const [partCode, spec] of Object.entries(jwf1206P06ModelSpecs)) {
  const hasSection = spec.source.views.some((view) => /剖|截面/.test(view));
  spec.source.sourceCrop = `assets/manuals/jwf1206/crops/${partCode}.png`;
  spec.source.sourceVector = `assets/manuals/jwf1206/crops/${partCode}.pdf`;
  spec.source.cropDpi = 600;
  spec.source.excludedLines = [
    '原格表框、件号、名称、数量栏与文字', '尺寸线、箭头与尺寸数字', '尺寸延长线',
    '中心线与中心十字', '引出线与标注线', ...(hasSection ? ['剖面填充线'] : []),
  ];
  spec.source.unknowns = spec.source.assumptions.filter((text) => /未.*(?:标|给|注明|画|规定|建模)|估算|比例|近似|不作为|空间走向/.test(text));
  spec.source.reconstructionRule = '逐格识别主视、辅助视图和剖面；清除非实体标注线后，只按厂家明示尺寸与闭合实体轮廓建模。';
}
