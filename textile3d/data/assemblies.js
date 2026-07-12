export const assemblies = [
  {
    manual:'tf2513',
    code:'TF2502-0300',
    name:'圈条盘部件',
    nameEn:'COILING DISK ASS',
    drawingPage:4,
    bomPages:[5,6],
    model:'coilingDisk',
    itemCount:25,
    status:'爆炸图已核·视觉级3D',
    sourceImage:'assets/manuals/tf2513/pages-hd/page-04.jpg',
    sourceVector:'assets/manuals/tf2513/original.pdf#page=4',
    accuracy:'按厂家爆炸图还原主要构件、中心轴线和上下装配层级；未提供的精确尺寸、配合公差与内部结构不作推测。',
    keyParts:[
      '3 圈条盘结合件',
      '6 平皮带盘',
      '7 心轴',
      '23/24 挡圈',
      '25 滚动轴承6024-2RS',
      '5 安装板',
      '8 喂条嘴（下）'
    ]
  },
  {
    manual:'jwf1124c',
    code:'JWF1124C-160-0000',
    name:'JWF1124C-160型开棉机产品装配总图',
    nameEn:'PRODUCT ASSEMBLY CHART',
    drawingPage:3,
    bomPages:[4],
    model:'openerProduct',
    itemCount:19,
    status:'爆炸图与19项明细已核·视觉级3D',
    sourceImage:'assets/manuals/jwf1124c/crops/JWF1124C-160-0000-assembly-p03.png',
    sourceVector:'assets/manuals/jwf1124c/crops/JWF1124C-160-0000-assembly-p03.pdf',
    accuracy:'按厂家第3页总装爆炸图还原整机框架、内部辊组、右侧安全罩、上方接管、方接圆与透视窗的主要空间关系；原图未给整机尺寸，外形比例与内部细节只作结构视觉。',
    keyParts:[
      '1 机架部件',
      '2 除尘部件',
      '3 给棉部件',
      '4 打手部件',
      '5 排杂部件（两组）',
      '6 安全罩部件',
      '8 接管结合件',
      '9 方接圆结合件',
      '10 透视窗',
      '12/13 嵌条与嵌芯'
    ]
  }
];
