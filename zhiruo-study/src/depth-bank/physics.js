import { makeDepthSet } from "../depth-bank-utils.js";

export const PHYSICS_DEPTH_QUESTIONS = [
  ...makeDepthSet({
    code: "P-CIRC", subject: "physics", skill: "circular",
    idea: "圆周运动先分清线速度、角速度和半径，再找指向圆心的合力。",
    trap: "向心力不是新出现的一种力，而是实际力沿半径方向的合力。",
    cases: [
      { dimension: "application", title: "向心加速度计算", stem: "物体以 6 m/s 的速率做半径为 3 m 的匀速圆周运动，向心加速度为（　）", options: ["2 m/s²", "6 m/s²", "12 m/s²", "18 m/s²"], answer: 2, steps: ["使用 aₙ=v²/r。", "代入 v=6 m/s、r=3 m。", "aₙ=36/3=12 m/s²。"] },
      { dimension: "transfer", title: "同角速度下的线速度", stem: "同一转盘上 A、B 两点随转盘匀速转动，B 到转轴的距离是 A 的 2 倍，则 vB∶vA=（　）", options: ["1∶2", "1∶1", "2∶1", "4∶1"], answer: 2, steps: ["同一转盘各点角速度 ω 相同。", "线速度 v=ωr。", "半径为 2 倍，所以线速度也为 2 倍。"] },
      { dimension: "pitfall", title: "向心力来源", stem: "关于向心力，下列说法正确的是（　）", options: ["向心力是物体受到的额外一种力", "向心力方向沿圆周切线", "向心力可以由重力、弹力等实际力的合力提供", "匀速圆周运动不需要力"], answer: 2, steps: ["向心力描述的是指向圆心的合力效果。", "它可由重力、弹力、摩擦力等实际力提供。", "匀速圆周运动速度方向变化，仍有加速度和合力。"] },
    ],
  }),
  ...makeDepthSet({
    code: "P-GRAV", subject: "physics", skill: "gravitation",
    idea: "把高度换成到天体中心的距离，再用平方反比或圆轨道条件比较。",
    trap: "轨道半径不是离地高度；失重也不等于没有引力。",
    cases: [
      { dimension: "application", title: "引力的平方反比", stem: "同一行星外，A、B 两点到行星中心距离之比 rA∶rB=1∶4，则重力加速度之比 gA∶gB=（　）", options: ["1∶4", "1∶16", "4∶1", "16∶1"], answer: 3, steps: ["g=GM/r²。", "gA/gB=(rB/rA)²。", "代入 4²，得到 16∶1。"] },
      { dimension: "reasoning", title: "圆轨道速度比较", stem: "两颗卫星绕同一天体做匀速圆周运动，轨道半径较大的卫星，其线速度（　）", options: ["较大", "较小", "相同", "无法比较"], answer: 1, steps: ["万有引力提供向心力。", "GMm/r²=mv²/r，得 v=√(GM/r)。", "轨道半径越大，线速度越小。"] },
      { dimension: "pitfall", title: "失重本质", stem: "航天员在绕地球运行的飞船中处于失重状态，主要原因是（　）", options: ["所在位置没有地球引力", "飞船屏蔽了地球引力", "航天员与飞船一起做近似自由落体", "航天员质量变为零"], answer: 2, steps: ["轨道处仍受到明显地球引力。", "引力同时使飞船和航天员产生向心加速度。", "二者一起自由下落，支持力近似为零，所以感觉失重。"] },
    ],
  }),
  ...makeDepthSet({
    code: "P-EPOT", subject: "physics", skill: "electric-field",
    idea: "电势差决定单位电荷的能量变化，电容器问题要区分电荷量还是电压保持不变。",
    trap: "电势为零是参考点选择，不代表该处电场强度为零。",
    cases: [
      { dimension: "application", title: "电场力做功", stem: "电荷量 q=2×10⁻⁶ C 的正电荷从电势 30 V 的 A 点移到电势 10 V 的 B 点，电场力做功为（　）", options: ["−4×10⁻⁵ J", "−2×10⁻⁵ J", "2×10⁻⁵ J", "4×10⁻⁵ J"], answer: 3, steps: ["A、B 间电势差 UAB=φA−φB=20 V。", "电场力做功 W=qUAB。", "W=2×10⁻⁶×20=4×10⁻⁵ J。"] },
      { dimension: "transfer", title: "孤立电容器变式", stem: "平行板电容器充电后与电源断开，再增大两板间距离。忽略边缘效应，则（　）", options: ["电荷量不变，电容减小，电压增大", "电荷量减小，电容增大，电压不变", "电荷量不变，电容增大，电压减小", "电荷量和电压都不变"], answer: 0, steps: ["断开电源后，极板电荷无处转移，所以 Q 不变。", "C=εS/d，距离 d 增大使 C 减小。", "由 U=Q/C 可知电压增大。"] },
      { dimension: "pitfall", title: "电势与场强辨析", stem: "关于电势和电场强度，下列说法正确的是（　）", options: ["电势为零处，场强一定为零", "场强为零处，电势一定为零", "电势是标量，其零点可按需要选取", "沿电场线方向电势升高"], answer: 2, steps: ["电势零点是人为选择的参考。", "电势与场强有关联，但某点取零电势不能决定该点场强。", "电势是标量，沿电场线方向降低。"] },
    ],
  }),
  ...makeDepthSet({
    code: "P-CLAB", subject: "physics", skill: "circuit-experiment",
    idea: "先看电表的连接功能和量程，再按安全原则安排实验操作顺序。",
    trap: "闭合开关前应让滑动变阻器接入最大阻值，读数必须对应所选量程。",
    cases: [
      { dimension: "application", title: "电流表特性", stem: "理想电流表接入电路时应串联，且其内阻应当（　）", options: ["很大", "很小", "等于被测电阻", "随电流增大"], answer: 1, steps: ["电流表要让被测支路电流通过。", "若内阻很大会显著改变原电路电流。", "因此理想电流表内阻为零，实际应很小。"] },
      { dimension: "reasoning", title: "滑动变阻器保护", stem: "用限流接法测电阻，闭合开关前，滑动变阻器的滑片应置于使接入电路电阻（　）的位置。", options: ["最大", "最小", "为零", "等于待测电阻"], answer: 0, steps: ["闭合瞬间要避免电流过大。", "串联接入的电阻越大，总电流越小。", "所以应先调到接入电阻最大的位置。"] },
      { dimension: "pitfall", title: "电表量程读数", stem: "某电流表选择 0～3 A 量程，表盘共有 10 个等分格，指针指在第 6 格，读数为（　）", options: ["0.6 A", "1.2 A", "1.8 A", "2.4 A"], answer: 2, steps: ["每格表示 3/10=0.3 A。", "指针位于第 6 格。", "读数为 6×0.3=1.8 A。"] },
    ],
  }),
  ...makeDepthSet({
    code: "P-MFIELD", subject: "physics", skill: "magnetic-field",
    idea: "安培力大小看 BILsinθ，方向由电流方向与磁场方向共同决定。",
    trap: "磁感应强度方向不是电流方向，也不是安培力方向。",
    cases: [
      { dimension: "application", title: "安培力大小", stem: "长 0.4 m 的直导线通有 2 A 电流，垂直放入 B=0.5 T 的匀强磁场中，安培力大小为（　）", options: ["0.1 N", "0.4 N", "0.8 N", "1.0 N"], answer: 1, steps: ["导线与磁场垂直，sinθ=1。", "F=BIL。", "F=0.5×2×0.4=0.4 N。"] },
      { dimension: "reasoning", title: "安培力方向", stem: "水平直导线中电流向东，匀强磁场方向向北，则导线所受安培力方向为（　）", options: ["向东", "向西", "竖直向上", "竖直向下"], answer: 2, steps: ["电流方向向东，磁场方向向北。", "按左手定则判断力的方向。", "安培力竖直向上。"] },
      { dimension: "pitfall", title: "磁场方向定义", stem: "磁场中某点的磁场方向规定为（　）", options: ["正电荷在该点的受力方向", "小磁针静止时 N 极所指方向", "通电导线在该点的受力方向", "电子运动方向"], answer: 1, steps: ["磁场方向可用小磁针检验。", "小磁针静止时 N 极的指向就是该点磁场方向。", "其他受力方向还取决于电荷或电流的运动方向。"] },
    ],
  }),
  ...makeDepthSet({
    code: "P-IND", subject: "physics", skill: "induction",
    idea: "感应电动势看磁通量变化率，方向判断抓住“阻碍变化”四个字。",
    trap: "阻碍磁通量的变化，不等于阻碍原磁场本身。",
    cases: [
      { dimension: "application", title: "法拉第电磁感应定律", stem: "单匝线圈中的磁通量在 0.2 s 内由 0.6 Wb 均匀减小到 0.2 Wb，感应电动势大小为（　）", options: ["0.5 V", "1 V", "2 V", "4 V"], answer: 2, steps: ["磁通量变化量的大小为 |0.2−0.6|=0.4 Wb。", "E=|ΔΦ|/Δt。", "E=0.4/0.2=2 V。"] },
      { dimension: "reasoning", title: "楞次定律判断磁极", stem: "条形磁铁的 N 极沿线圈轴线靠近闭合线圈，则线圈靠近磁铁的一面将表现为（　）", options: ["N 极，以阻碍靠近", "S 极，以吸引磁铁", "先为 N 极后为 S 极", "没有磁性"], answer: 0, steps: ["N 极靠近使穿过线圈的原磁通量增大。", "感应电流的磁场要阻碍这一变化。", "近端形成 N 极，排斥来靠近的 N 极。"] },
      { dimension: "transfer", title: "切割磁感线", stem: "长 0.4 m 的导体棒以 3 m/s 的速度垂直切割 B=0.5 T 的匀强磁场，且棒、速度、磁场两两垂直，感应电动势为（　）", options: ["0.2 V", "0.6 V", "1.5 V", "6 V"], answer: 1, steps: ["满足垂直切割条件，可用 E=BLv。", "代入 B=0.5 T、L=0.4 m、v=3 m/s。", "E=0.5×0.4×3=0.6 V。"] },
    ],
  }),
  ...makeDepthSet({
    code: "P-AC", subject: "physics", skill: "ac",
    idea: "正弦交流电区分峰值和有效值，理想变压器用匝数比和功率守恒。",
    trap: "升压不等于升功率；理想变压器电压升高时电流会相应减小。",
    cases: [
      { dimension: "application", title: "理想变压器电压", stem: "理想变压器原、副线圈匝数比 n₁∶n₂=10∶1，原线圈电压为 220 V，则副线圈电压为（　）", options: ["11 V", "22 V", "110 V", "2200 V"], answer: 1, steps: ["理想变压器满足 U₁/U₂=n₁/n₂。", "U₂=220×1/10。", "副线圈电压为 22 V。"] },
      { dimension: "reasoning", title: "交流电有效值", stem: "正弦交流电的电流最大值为 10√2 A，则有效值为（　）", options: ["5 A", "10 A", "10√2 A", "20 A"], answer: 1, steps: ["正弦交流电有效值 I=Iₘ/√2。", "代入 Iₘ=10√2 A。", "得到 I=10 A。"] },
      { dimension: "pitfall", title: "升压变压器辨析", stem: "理想升压变压器正常工作时，下列说法正确的是（　）", options: ["副线圈电压较高，输出功率也必然大于输入功率", "副线圈电压较高，电流通常较小", "原、副线圈频率不同", "变压器能改变直流电压"], answer: 1, steps: ["理想变压器输入功率等于输出功率。", "升压时为保持功率，副线圈电流相应减小。", "频率不变，且变压器依靠变化磁通工作，不能直接变换恒定直流。"] },
    ],
  }),
  ...makeDepthSet({
    code: "P-THERMO", subject: "physics", skill: "thermodynamics",
    idea: "理想气体内能看温度，热力学第一定律用能量收支核对。",
    trap: "温度反映大量分子的统计平均，不表示每个分子速率都相同。",
    cases: [
      { dimension: "application", title: "热力学第一定律", stem: "气体吸收 300 J 热量，同时对外做功 120 J，则气体内能增加（　）", options: ["120 J", "180 J", "300 J", "420 J"], answer: 1, steps: ["吸收的热量一部分用于增加内能，一部分用于对外做功。", "ΔU=Q−W外。", "ΔU=300−120=180 J。"] },
      { dimension: "reasoning", title: "理想气体内能", stem: "同一定量理想气体从状态 A 变化到状态 B，若两状态温度相同，则其内能（　）", options: ["A 较大", "B 较大", "相同", "还要看体积才能判断"], answer: 2, steps: ["理想气体内能只由温度决定。", "A、B 两状态温度相同。", "因此内能相同，与体积、压强具体数值无关。"] },
      { dimension: "pitfall", title: "温度的微观意义", stem: "关于气体温度，下列说法正确的是（　）", options: ["温度越高，每个分子的速率都越大", "温度是分子平均动能的标志", "温度为 0 ℃ 时分子停止运动", "温度只由单个最快分子决定"], answer: 1, steps: ["气体分子速率有统计分布。", "温度反映大量分子热运动的平均动能。", "它不由单个分子决定，也不表示所有分子速率相同。"] },
    ],
  }),
  ...makeDepthSet({
    code: "P-OPT", subject: "physics", skill: "optics",
    idea: "成像先用特殊光线或薄透镜公式，干涉和全反射则先核对适用条件。",
    trap: "全反射必须从光密介质射向光疏介质，且入射角超过临界角。",
    cases: [
      { dimension: "application", title: "凸透镜成像", stem: "凸透镜焦距 10 cm，物体放在距透镜 15 cm 处，则像距和像的性质是（　）", options: ["6 cm，正立缩小虚像", "15 cm，倒立等大实像", "30 cm，倒立放大实像", "30 cm，正立放大虚像"], answer: 2, steps: ["使用 1/f=1/u+1/v。", "1/v=1/10−1/15=1/30，所以 v=30 cm。", "物体在一倍与二倍焦距间，成倒立放大实像。"] },
      { dimension: "transfer", title: "双缝干涉条纹", stem: "在双缝干涉实验中，其他条件不变，只把双缝间距变为原来的 2 倍，则相邻亮条纹间距变为原来的（　）", options: ["1/4", "1/2", "2 倍", "4 倍"], answer: 1, steps: ["条纹间距 Δx=Lλ/d。", "双缝间距 d 变为 2d。", "因此 Δx 变为原来的一半。"] },
      { dimension: "pitfall", title: "全反射条件", stem: "光发生全反射必须同时满足（　）", options: ["从光疏介质射向光密介质，入射角较小", "从光密介质射向光疏介质，入射角大于临界角", "从空气射入玻璃，入射角任意", "只要入射角为 90°"], answer: 1, steps: ["全反射只可能从折射率较大的介质射向较小的介质。", "入射角还必须大于临界角。", "两个条件缺一不可。"] },
    ],
  }),
  ...makeDepthSet({
    code: "P-WAVE", subject: "physics", skill: "waves",
    idea: "波动问题抓住 v=λf，并区分介质传播速度与振源频率。",
    trap: "质点只在平衡位置附近振动，不随波整体向前迁移。",
    cases: [
      { dimension: "application", title: "波速计算", stem: "一列机械波在某介质中的波长为 0.5 m，频率为 8 Hz，波速为（　）", options: ["4 m/s", "8 m/s", "16 m/s", "0.0625 m/s"], answer: 0, steps: ["使用 v=λf。", "代入 λ=0.5 m、f=8 Hz。", "v=0.5×8=4 m/s。"] },
      { dimension: "reasoning", title: "一个周期后的状态", stem: "介质中某质点做简谐振动，经过一个完整周期后，它的（　）", options: ["位移一定增加一个振幅", "位置和速度都回到原状态", "速度方向一定相反", "机械能变为零"], answer: 1, steps: ["周期是运动状态重复一次所需时间。", "经过一个周期，相位增加 2π。", "位置、速度等运动状态均与起点相同。"] },
      { dimension: "transfer", title: "同一介质中的变频", stem: "波源频率增大，而波仍在同一均匀介质中传播，则波速 v 和波长 λ 的变化是（　）", options: ["v 增大，λ 不变", "v 不变，λ 减小", "v 不变，λ 增大", "v、λ 都增大"], answer: 1, steps: ["同一均匀介质中，机械波波速由介质决定。", "频率由波源决定并增大。", "由 λ=v/f 可知波长减小。"] },
    ],
  }),
  ...makeDepthSet({
    code: "P-MOD", subject: "physics", skill: "modern-physics",
    idea: "近代物理要分清单个量子能量、光子数量与核反应中的质量—能量关系。",
    trap: "光强增大不能弥补频率低于截止频率。",
    cases: [
      { dimension: "application", title: "半衰期", stem: "某放射性样品初始质量为 800 mg，半衰期为 2 h，经过 6 h 后剩余（　）", options: ["50 mg", "100 mg", "200 mg", "400 mg"], answer: 1, steps: ["6 h 包含 3 个半衰期。", "剩余质量为 800×(1/2)³。", "结果为 100 mg。"] },
      { dimension: "reasoning", title: "质能方程", stem: "核反应中出现质量亏损 Δm，与释放能量 E 的关系是（　）", options: ["E=Δm/c²", "E=Δmc", "E=Δmc²", "E=Δm²c"], answer: 2, steps: ["核反应前后静质量的差称为质量亏损。", "爱因斯坦质能关系为 E=mc²。", "对应释放能量 E=Δmc²。"] },
      { dimension: "pitfall", title: "光电效应截止频率", stem: "入射光频率低于金属的截止频率时，若只增大光强，则（　）", options: ["一定能发生光电效应", "仍不能发生光电效应", "逸出电子最大初动能增大", "金属截止频率降低"], answer: 1, steps: ["单个光子能量由频率决定。", "频率低于截止频率时，单个光子能量不足以使电子逸出。", "增大光强只增加低能光子数量，仍不能发生光电效应。"] },
    ],
  }),
  ...makeDepthSet({
    code: "P-EXP", subject: "physics", skill: "experiment",
    idea: "实验题先分清系统误差与偶然误差，再从图像、单位和有效数字提取结论。",
    trap: "多次测量取平均只能减小偶然误差，不能自动消除系统误差。",
    cases: [
      { dimension: "application", title: "纸带运动判断", stem: "打点计时器在相等时间间隔打出的纸带上，相邻点间距逐渐均匀增大，说明物体最可能做（　）", options: ["匀速直线运动", "加速直线运动", "减速直线运动", "静止"], answer: 1, steps: ["相邻点时间间隔相等。", "点间距越大表示该时间段平均速度越大。", "间距逐渐增大，说明物体在加速。"] },
      { dimension: "reasoning", title: "图像斜率含义", stem: "研究弹簧弹力 F 与伸长量 x 的关系，作出过原点的 F-x 直线图像，其斜率表示（　）", options: ["弹簧原长", "弹簧劲度系数", "弹簧质量", "重力加速度"], answer: 1, steps: ["胡克定律为 F=kx。", "F-x 图像斜率是 ΔF/Δx。", "与公式对照可知斜率就是劲度系数 k。"] },
      { dimension: "pitfall", title: "误差处理", stem: "关于多次测量取平均值，下列说法正确的是（　）", options: ["可以减小偶然误差", "可以消除所有系统误差", "会使仪器分度值变小", "能把错误操作变成正确操作"], answer: 0, steps: ["偶然误差的方向和大小具有随机性。", "多次测量取平均可减弱随机波动的影响。", "系统误差和操作错误需要查找原因、改进方法，不能靠平均消除。"] },
    ],
  }),
];
