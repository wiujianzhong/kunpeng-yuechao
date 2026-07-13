// JWF1206 原PDF第4页：按厂家原格中的视图、轮廓和明示尺寸建立。
// 所有坐标单位均为毫米，X=宽、Y=高、Z=深；未标尺寸只作为视觉估算写入 assumptions。
export const jwf1206P04ModelSpecs = {
  'JWF1206-0100-1': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 4,
      dimensions: ['X=785', 'Z=147', '下折边Y=55'],
      views: ['俯视主轮廓', '左端剖视图'],
      viewAnalysis: [
        {name:'主表达图（从上方看）',projection:'top',sourceBox:[158,552,658,76],entityBox:[163,565,648,50],entity:'785长的水平板带、折边投影和沿长度分布的螺栓/小孔；紧固杆沿高度方向，在此视图中只显示端部',exclude:'785尺寸线、延伸线、箭头和数字',material:'钣金喷漆组合件'},
        {name:'左视/截面图',projection:'side',sourceBox:[238,977,600,475],entityBox:[242,1015,592,404],entity:'147深的水平底板、靠右的局部紧固支架、下折55的连续竖向折边',exclude:'147、55尺寸线、中心线、延伸线和箭头；上部竖杆是沿长度分布的局部紧固件，不是整长立边',material:'钣金喷漆板+金属紧固件，实线为可见实体边'},
      ],
      assumptions: ['板厚未标，按4估算', '底部外伸回边未标，按端视图比例取32', '竖向件为沿长度分布的局部紧固件，不是整长立边；小孔孔径未标'],
    },
    primitives: [
      { type: 'box', size: [785, 4, 147], position: [0, 0, 73.5] },
      { type: 'box', size: [785, 55, 4], position: [0, -27.5, 0] },
      { type: 'box', size: [785, 4, 32], position: [0, -55, -16] },
      ...[-320,-280,-70,-20,135,350].flatMap(x=>[
        {type:'cylinder',radius:3,length:76,axis:'y',position:[x,38,22],material:'metal',segments:16},
        {type:'cylinder',radius:9,length:5,axis:'y',position:[x,2.5,22],material:'darkMetal',segments:24},
        {type:'cylinder',radius:7,length:8,axis:'y',position:[x,80,22],material:'metal',segments:6},
      ]),
      ...[-350,-55,190,330].map(x=>({type:'cylinder',radius:5,length:7,axis:'y',position:[x,3.5,140],material:'darkMetal',segments:20})),
    ],
  },

  'JWF1206-0100-2': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 4,
      dimensions: ['X=2490', 'Z=147', '下折边Y=55'],
      views: ['俯视主轮廓', '左端剖视图'],
      assumptions: ['板厚未标，按4估算', '底部外伸回边未标，按端视图比例取32', '竖向件是分布在长度方向的局部紧固件，不是整长立边'],
    },
    primitives: [
      { type: 'box', size: [2490, 4, 147], position: [0, 0, 73.5] },
      { type: 'box', size: [2490, 55, 4], position: [0, -27.5, 0] },
      { type: 'box', size: [2490, 4, 32], position: [0, -55, -16] },
      ...[-1055,-945,50,180,580,1150].flatMap(x=>[
        {type:'cylinder',radius:3,length:76,axis:'y',position:[x,38,22],material:'metal',segments:16},
        {type:'cylinder',radius:9,length:5,axis:'y',position:[x,2.5,22],material:'darkMetal',segments:24},
        {type:'cylinder',radius:7,length:8,axis:'y',position:[x,80,22],material:'metal',segments:6},
      ]),
      ...[-1120,-650,-90,110,820,1160].map(x=>({type:'cylinder',radius:5,length:7,axis:'y',position:[x,3.5,140],material:'darkMetal',segments:20})),
    ],
  },

  'JWF1206-0100-3': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 4,
      dimensions: ['X=2490', 'Z=337', '下折边Y=55'],
      views: ['俯视主轮廓', '端部剖视图'],
      assumptions: ['板厚未标，按4估算', '底部外伸回边未标，按端视图比例取32', '竖向件是分布在长度方向的局部紧固件，不是整长立边'],
    },
    primitives: [
      { type: 'box', size: [2490, 4, 337], position: [0, 0, -168.5] },
      { type: 'box', size: [2490, 55, 4], position: [0, -27.5, 0] },
      { type: 'box', size: [2490, 4, 32], position: [0, -55, 16] },
      ...[-1175,-650,-125,0,820,950,1200].flatMap(x=>[
        {type:'cylinder',radius:3,length:76,axis:'y',position:[x,38,-22],material:'metal',segments:16},
        {type:'cylinder',radius:9,length:5,axis:'y',position:[x,2.5,-22],material:'darkMetal',segments:24},
        {type:'cylinder',radius:7,length:8,axis:'y',position:[x,80,-22],material:'metal',segments:6},
      ]),
      ...[-1120,-650,-90,110,820,1160].map(x=>({type:'cylinder',radius:5,length:7,axis:'y',position:[x,3.5,-330],material:'darkMetal',segments:20})),
    ],
  },

  'JWF1206-0100-4': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 4,
      dimensions: ['X=785', 'Z=337', '下折边Y=55'],
      views: ['俯视主轮廓', '端部剖视图'],
      assumptions: ['板厚未标，按4估算', '底部外伸回边未标，按端视图比例取32', '竖向件是分布在长度方向的局部紧固件，不是整长立边'],
    },
    primitives: [
      { type: 'box', size: [785, 4, 337], position: [0, 0, -168.5] },
      { type: 'box', size: [785, 55, 4], position: [0, -27.5, 0] },
      { type: 'box', size: [785, 4, 32], position: [0, -55, 16] },
      ...[-343,-50,246].flatMap(x=>[
        {type:'cylinder',radius:3,length:76,axis:'y',position:[x,38,-22],material:'metal',segments:16},
        {type:'cylinder',radius:9,length:5,axis:'y',position:[x,2.5,-22],material:'darkMetal',segments:24},
        {type:'cylinder',radius:7,length:8,axis:'y',position:[x,80,-22],material:'metal',segments:6},
      ]),
      ...[-342,-3,243].map(x=>({type:'cylinder',radius:8,length:7,axis:'y',position:[x,3.5,-330],material:'darkMetal',segments:20})),
    ],
  },

  'JWF1206-0100-5': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 4,
      dimensions: ['X=378', 'Y=1032', 'Z=153'],
      views: ['正视图', '左视图', '俯视图'],
      assumptions: ['板厚未标，按4估算', '中下部竖向加强件、短支架及俯视图阶梯折边的尺寸按三视图比例估算；中心十字未见孔圈，不冒充为孔'],
    },
    primitives: [
      { type: 'box', size: [378, 1032, 4], position: [0, 0, 74.5] },
      { type: 'box', size: [378, 4, 153], position: [0, -514, 0] },
      { type: 'box', size: [378, 4, 42], position: [0, 514, 55.5] },
      { type: 'box', size: [4, 1032, 153], position: [187, 0, 0] },
      { type: 'box', size: [72, 500, 18], position: [44, -180, 61], material: 'darkMetal' },
      { type: 'box', size: [82, 34, 24], position: [105, -175, 54], material: 'darkMetal' },
      { type: 'box', size: [124, 4, 4], position: [-127, -512, -74.5], material: 'darkMetal' },
      { type: 'box', size: [4, 4, 36], position: [-65, -512, -56.5], material: 'darkMetal' },
      { type: 'box', size: [92, 4, 4], position: [-19, -512, -40.5], material: 'darkMetal' },
      { type: 'box', size: [4, 4, 97], position: [27, -512, 8], material: 'darkMetal' },
      { type: 'box', size: [162, 4, 4], position: [108, -512, 56.5], material: 'darkMetal' },
    ],
  },

  'JWF1206-0100-7': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 4,
      dimensions: ['X=880', 'Y=2040'],
      views: ['正视图'],
      assumptions: ['本格未标厚度/背面，门体深度按30估算', '观察窗、百叶孔、铰链加强条的位置和大小按正视图比例估算'],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-440, -1020], [440, -1020], [440, 1020], [-440, 1020]],
        depth: 30,
        position: [0, 0, -15],
        bevel: 2,
        holes: [
          { kind: 'polygon', points: [[-140, 180], [-100, 140], [100, 140], [140, 180], [140, 560], [100, 600], [-100, 600], [-140, 560]] },
          { kind: 'polygon', points: [[-340, -770], [280, -770], [280, -740], [-340, -740]] },
          { kind: 'polygon', points: [[-340, -700], [280, -700], [280, -670], [-340, -670]] },
          { kind: 'polygon', points: [[-340, -630], [280, -630], [280, -600], [-340, -600]] },
          { kind: 'polygon', points: [[-340, -560], [280, -560], [280, -530], [-340, -530]] },
          { kind: 'polygon', points: [[-340, -490], [280, -490], [280, -460], [-340, -460]] },
          { kind: 'polygon', points: [[-340, -420], [280, -420], [280, -390], [-340, -390]] },
          { kind: 'polygon', points: [[-340, -350], [280, -350], [280, -320], [-340, -320]] },
          { kind: 'polygon', points: [[-340, -280], [280, -280], [280, -250], [-340, -250]] },
        ],
      },
      { type: 'box', size: [145, 1990, 14], position: [367, 0, 18], material: 'darkMetal' },
      { type: 'cylinder', radius: 18, length: 12, axis: 'z', position: [-330, 80, 21], material: 'darkMetal' },
    ],
  },

  'JWF1206-0100-8': {
    level: '尺寸级',
    material: 'paintedMetal',
    source: {
      page: 4,
      dimensions: ['X=1078', 'Y=75', 'Z=35'],
      views: ['长向主视图', '端部剖视图'],
      assumptions: ['截面总体尺寸和卷边方向取自原图；板厚未标，按3估算', '上下两条内卷边用连续圆杆视觉近似；局部连接片尺寸按长向图比例估算'],
    },
    primitives: [
      { type: 'box', size: [1078, 75, 3], position: [0, 0, -16] },
      { type: 'box', size: [1078, 3, 35], position: [0, 36, 0] },
      { type: 'box', size: [1078, 3, 35], position: [0, -36, 0] },
      { type: 'box', size: [1078, 18, 3], position: [0, 27, 16] },
      { type: 'box', size: [1078, 18, 3], position: [0, -27, 16] },
      { type: 'cylinder', radius: 6, length: 1078, axis: 'x', position: [0, 18, 0], material: 'darkMetal', segments: 24 },
      { type: 'cylinder', radius: 6, length: 1078, axis: 'x', position: [0, -18, 0], material: 'darkMetal', segments: 24 },
      { type: 'box', size: [100, 8, 16], position: [0, 41, 0], material: 'darkMetal' },
    ],
  },

  'JWF1206-0100-9': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 4,
      dimensions: ['X=703', 'Y=2040'],
      views: ['正视图'],
      assumptions: ['本格未标厚度/背面，门体深度按30估算', '中部观察窗及上下两段加强/铰链框的尺寸与位置按正视图比例估算'],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-351.5, -1020], [351.5, -1020], [351.5, 1020], [-351.5, 1020]],
        depth: 30,
        position: [0, 0, -15],
        bevel: 2,
        holes: [
          { kind: 'polygon', points: [[-245, -10], [-225, -30], [20, -30], [40, -10], [40, 160], [20, 180], [-225, 180], [-245, 160]] },
        ],
      },
      { type: 'box', size: [150, 610, 14], position: [-255, 610, 18], material: 'darkMetal' },
      { type: 'box', size: [150, 690, 14], position: [-255, -620, 18], material: 'darkMetal' },
      { type: 'box', size: [14, 1300, 20], position: [-325, -5, 16], material: 'darkMetal' },
    ],
  },

  'JWF1206-0100-10': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 4,
      dimensions: ['Y=2040'],
      views: ['正视图', '俯视图'],
      assumptions: ['本格只标高度；宽度按同页对称件JWF1206-0100-9估算为703，深度按30估算', '右侧加强/铰链框及中部方形组件尺寸按正视图比例估算'],
    },
    primitives: [
      { type: 'box', size: [703, 2040, 30], position: [0, 0, 0] },
      { type: 'box', size: [145, 1980, 14], position: [270, 0, 22], material: 'darkMetal' },
      { type: 'box', size: [200, 190, 42], position: [-20, 540, 28], material: 'darkMetal' },
      { type: 'cylinder', radius: 85, length: 18, axis: 'z', position: [-20, 540, 58], material: 'metal' },
    ],
  },

  'JWF1206-0100-11': {
    level: '尺寸级',
    material: 'paintedMetal',
    source: {
      page: 4,
      dimensions: ['X=890', 'Y=1930', 'Z=51.5'],
      views: ['俯视图', '正视图'],
      assumptions: ['外廓三向尺寸均按原图；板厚未标，按4估算', '两条纵向加强筋的宽度、长度和梯形凸起高度按正视/边视图比例估算'],
    },
    primitives: [
      { type: 'box', size: [890, 1930, 4], position: [0, 0, 23.75] },
      { type: 'box', size: [4, 1930, 51.5], position: [-443, 0, 0] },
      { type: 'box', size: [4, 1930, 51.5], position: [443, 0, 0] },
      { type: 'box', size: [890, 4, 51.5], position: [0, -963, 0] },
      { type: 'box', size: [890, 4, 51.5], position: [0, 963, 0] },
      { type: 'loft', sections: [{x:-820,points:[[-72.5,0],[72.5,0],[55,18],[-55,18]]},{x:820,points:[[-72.5,0],[72.5,0],[55,18],[-55,18]]}], rotation:[0,0,Math.PI/2], position: [-200, 0, 4], material: 'darkMetal' },
      { type: 'loft', sections: [{x:-820,points:[[-72.5,0],[72.5,0],[55,18],[-55,18]]},{x:820,points:[[-72.5,0],[72.5,0],[55,18],[-55,18]]}], rotation:[0,0,Math.PI/2], position: [200, 0, 4], material: 'darkMetal' },
      { type: 'box', size: [890, 8, 12], position: [0, 0, 16], material: 'darkMetal' },
    ],
  },

  'JWF1206-0100-12': {
    level: '尺寸级',
    material: 'paintedMetal',
    source: {
      page: 4,
      dimensions: ['X=1509', 'Y=75', 'Z=35'],
      views: ['长向主视图', '端部剖视图'],
      assumptions: ['截面总体尺寸和卷边方向取自原图；板厚未标，按3估算', '上下两条内卷边用连续圆杆视觉近似；中部连接片尺寸按长向图比例估算'],
    },
    primitives: [
      { type: 'box', size: [1509, 75, 3], position: [0, 0, -16] },
      { type: 'box', size: [1509, 3, 35], position: [0, 36, 0] },
      { type: 'box', size: [1509, 3, 35], position: [0, -36, 0] },
      { type: 'box', size: [1509, 18, 3], position: [0, 27, 16] },
      { type: 'box', size: [1509, 18, 3], position: [0, -27, 16] },
      { type: 'cylinder', radius: 6, length: 1509, axis: 'x', position: [0, 18, 0], material: 'darkMetal', segments: 24 },
      { type: 'cylinder', radius: 6, length: 1509, axis: 'x', position: [0, -18, 0], material: 'darkMetal', segments: 24 },
      { type: 'box', size: [140, 8, 16], position: [0, 41, 0], material: 'darkMetal' },
    ],
  },

  'JWF1206-0100-14': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 4,
      dimensions: ['X=880', 'Y=2040'],
      views: ['正视图'],
      assumptions: ['本格未标厚度/背面，门体深度按30估算', '观察窗、百叶孔、左侧加强/铰链框的位置和大小按正视图比例估算'],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-440, -1020], [440, -1020], [440, 1020], [-440, 1020]],
        depth: 30,
        position: [0, 0, -15],
        bevel: 2,
        holes: [
          { kind: 'polygon', points: [[-140, 170], [-100, 130], [100, 130], [140, 170], [140, 550], [100, 590], [-100, 590], [-140, 550]] },
          { kind: 'polygon', points: [[-235, -760], [395, -760], [395, -730], [-235, -730]] },
          { kind: 'polygon', points: [[-235, -690], [395, -690], [395, -660], [-235, -660]] },
          { kind: 'polygon', points: [[-235, -620], [395, -620], [395, -590], [-235, -590]] },
          { kind: 'polygon', points: [[-235, -550], [395, -550], [395, -520], [-235, -520]] },
          { kind: 'polygon', points: [[-235, -480], [395, -480], [395, -450], [-235, -450]] },
          { kind: 'polygon', points: [[-235, -410], [395, -410], [395, -380], [-235, -380]] },
          { kind: 'polygon', points: [[-235, -340], [395, -340], [395, -310], [-235, -310]] },
          { kind: 'polygon', points: [[-235, -270], [395, -270], [395, -240], [-235, -240]] },
        ],
      },
      { type: 'box', size: [145, 1990, 14], position: [-367, 0, 18], material: 'darkMetal' },
      { type: 'cylinder', radius: 18, length: 12, axis: 'z', position: [330, 80, 21], material: 'darkMetal' },
    ],
  },

  'JWF1206-0100-15': {
    level: '尺寸级',
    material: 'paintedMetal',
    source: {
      page: 4,
      dimensions: ['X=75', 'Y=1205', 'Z=147.5'],
      views: ['正视图', '端部截面图'],
      assumptions: ['长度及75×147.5外截面尺寸按原图；板厚未标，按4估算为空心折弯柱', '端视图顶部约36.5宽按图面比例取值；斜边端部小圆角以直线轮廓近似，安装孔未建模'],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-37.5, -73.75], [37.5, -73.75], [-1, 73.75], [-37.5, 73.75]],
        depth: 1205,
        holes: [
          { kind: 'polygon', points: [[-33.5, -69.75], [33.5, -69.75], [-5, 69.75], [-33.5, 69.75]] },
        ],
        position: [0, 602.5, 0],
        rotation: [-1.570796, 0, 0],
        bevel: 1,
      },
    ],
  },

  'JWF1204-0100-2': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 4,
      dimensions: ['X=672', 'Y=1144', 'Z=30'],
      views: ['正视图', '左视图'],
      assumptions: ['总体宽高厚按原图；斜顶右端高度未标，按正视图比例估算', '斜孔和纵向格栅的位置、尺寸按图面比例估算；格栅按与门板齐平的五道通风槽表达'],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-336, -572], [336, -572], [336, 350], [-336, 572]],
        depth: 30,
        position: [0, 0, -15],
        bevel: 2,
        holes: [
          { kind: 'polygon', points: [[-320, 430], [-295, 405], [-215, 485], [-200, 530], [-225, 550], [-325, 465]] },
          { kind: 'polygon', points: [[135, -540], [155, -540], [155, 300], [135, 300]] },
          { kind: 'polygon', points: [[170, -540], [190, -540], [190, 300], [170, 300]] },
          { kind: 'polygon', points: [[210, -540], [230, -540], [230, 300], [210, 300]] },
          { kind: 'polygon', points: [[250, -540], [270, -540], [270, 300], [250, 300]] },
          { kind: 'polygon', points: [[290, -540], [310, -540], [310, 300], [290, 300]] },
        ],
      },
      { type: 'box', size: [30, 1080, 30], position: [-321, -18, 0], material: 'darkMetal' },
    ],
  },

  'JWF1204-0100-3A': {
    level: '轮廓级',
    material: 'paintedMetal',
    source: {
      page: 4,
      dimensions: ['X=470', 'Y=2040', 'Z=30'],
      views: ['正视图', '左视图'],
      assumptions: ['总体宽高厚按原图；斜顶起止点未标，按正视图比例估算', '观察窗、斜孔、小方孔及纵向加强框的位置和尺寸按图面比例估算'],
    },
    primitives: [
      {
        type: 'extrude',
        points: [[-235, -1020], [235, -1020], [235, 500], [-120, 1020], [-235, 1020]],
        depth: 30,
        position: [0, 0, -15],
        bevel: 2,
        holes: [
          { kind: 'polygon', points: [[-185, 405], [-160, 380], [130, 380], [155, 405], [155, 575], [130, 600], [-160, 600], [-185, 575]] },
          { kind: 'polygon', points: [[45, 230], [70, 245], [160, 155], [165, 100], [140, 85], [35, 185]] },
        ],
      },
      { type: 'box', size: [135, 1320, 8], position: [-125, -340, 16], material: 'darkMetal' },
      { type: 'box', size: [10, 1290, 10], position: [-180, -340, 17], material: 'darkMetal' },
      { type: 'box', size: [10, 1290, 10], position: [-70, -340, 17], material: 'darkMetal' },
      { type: 'box', size: [35, 35, 4], position: [162.5, 227.5, 17], material: 'darkMetal' },
    ],
  },
};

for (const [partCode, spec] of Object.entries(jwf1206P04ModelSpecs)) {
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
