import { makeDepthSet } from "../depth-bank-utils.js";

export const MATH_DEPTH_QUESTIONS = [
  ...makeDepthSet({
    code: "M-SETS", subject: "math", skill: "sets",
    idea: "先把集合元素写清楚，再按交、并、补的定义逐个判断。",
    trap: "集合中的元素不重复，且交集与并集的含义相反。",
    cases: [
      { dimension: "application", title: "描述法转列举法", stem: "设 A={x∈Z|−1<x≤2}，B={1,2,3}，则 A∪B=（　）", options: ["{1,2}", "{0,1,2,3}", "{−1,0,1,2,3}", "{0,3}"], answer: 1, steps: ["整数 x 满足 −1<x≤2，所以 A={0,1,2}。", "并集收集 A、B 中全部不重复元素。", "得到 A∪B={0,1,2,3}。"] },
      { dimension: "reasoning", title: "子集个数", stem: "集合 {a,b,c} 的子集共有（　）个。", options: ["3", "6", "8", "9"], answer: 2, steps: ["每个元素都有“选入”或“不选入”两种状态。", "3 个元素的选择相互独立。", "子集数为 2³=8。"] },
      { dimension: "pitfall", title: "集合关系辨析", stem: "若 A⊆B，则下列结论一定成立的是（　）", options: ["A∪B=A", "A∩B=B", "A∩B=A", "A 与 B 没有公共元素"], answer: 2, steps: ["A⊆B 表示 A 中每个元素都在 B 中。", "两者共有的元素正好就是 A 的全部元素。", "所以 A∩B=A。"] },
    ],
  }),
  ...makeDepthSet({
    code: "M-LOGIC", subject: "math", skill: "logic",
    idea: "把条件与结论分开，再用定义、逆命题或反例判断。",
    trap: "充分与必要的方向不要说反；否定命题还要同时改变量词。",
    cases: [
      { dimension: "application", title: "充分必要条件", stem: "在实数范围内，p：x>2，q：x²>4，则 p 是 q 的（　）", options: ["充分不必要条件", "必要不充分条件", "充要条件", "既不充分也不必要条件"], answer: 0, steps: ["x>2 一定推出 x²>4，所以 p 对 q 充分。", "x²>4 还可能有 x<−2，不能推出 x>2。", "因此 p 是充分不必要条件。"] },
      { dimension: "reasoning", title: "存在命题的否定", stem: "命题“存在 x∈R，使 x²+1=0”的否定是（　）", options: ["存在 x∈R，使 x²+1≠0", "任意 x∈R，都有 x²+1≠0", "任意 x∈R，都有 x²+1=0", "不存在实数 x"], answer: 1, steps: ["原命题的量词是“存在”。", "否定后改为“任意”，并否定等式。", "得到“任意实数 x，都有 x²+1≠0”。"] },
      { dimension: "pitfall", title: "复合命题真假", stem: "当 p、q 的真假性相同时，命题“p 当且仅当 q”的真假是（　）", options: ["一定为真", "一定为假", "只在 p、q 都真时为真", "无法判断"], answer: 0, steps: ["“当且仅当”要求两个方向同时成立。", "真—真与假—假时，p、q 真值相同。", "等价命题此时都为真。"] },
    ],
  }),
  ...makeDepthSet({
    code: "M-INEQ", subject: "math", skill: "inequality",
    idea: "先确认定义域和符号，再选择基本不等式、因式分解或等价变形。",
    trap: "乘除负数时不等号要反向，使用基本不等式必须检查等号条件。",
    cases: [
      { dimension: "application", title: "基本不等式求最值", stem: "当 x>0 时，2x+8/x 的最小值是（　）", options: ["4", "6", "8", "10"], answer: 2, steps: ["2x 与 8/x 都是正数。", "2x+8/x≥2√(2x·8/x)=8。", "当 2x=8/x，即 x=2 时取等号。"] },
      { dimension: "reasoning", title: "一元二次不等式", stem: "不等式 (x−1)(x+2)>0 的解集是（　）", options: ["(−2,1)", "(−∞,−2)∪(1,+∞)", "(−∞,−2]∪[1,+∞)", "[−2,1]"], answer: 1, steps: ["两个零点是 −2 和 1。", "乘积为正时两个因式同号。", "解得 x<−2 或 x>1。"] },
      { dimension: "pitfall", title: "不等式性质", stem: "已知实数 a>b，下列结论一定正确的是（　）", options: ["a²>b²", "1/a<1/b", "−a<−b", "ac>bc"], answer: 2, steps: ["a、b 的正负未知，所以平方和倒数关系不一定。", "c 的正负未知，所以乘 c 后方向不确定。", "两边乘 −1 不等号反向，故 −a<−b。"] },
    ],
  }),
  ...makeDepthSet({
    code: "M-EXPLOG", subject: "math", skill: "exponential-log",
    idea: "指数与对数互为逆运算，先统一底数或改写成指数式。",
    trap: "对数真数必须大于 0；底数在 0 与 1 之间时函数递减。",
    cases: [
      { dimension: "application", title: "指数方程", stem: "方程 2^(x+1)=16 的解为（　）", options: ["2", "3", "4", "5"], answer: 1, steps: ["把 16 写成 2⁴。", "同底数且底数合法，可令指数相等。", "x+1=4，解得 x=3。"] },
      { dimension: "reasoning", title: "对数方程", stem: "方程 log₂(x−1)=3 的解为（　）", options: ["7", "8", "9", "10"], answer: 2, steps: ["改写为指数式 x−1=2³。", "所以 x−1=8。", "x=9，且满足 x−1>0。"] },
      { dimension: "pitfall", title: "指数对数大小比较", stem: "设 a=(1/2)²，b=(1/2)^(−1)，c=log₂1，则大小关系是（　）", options: ["a<c<b", "c<a<b", "c<b<a", "b<a<c"], answer: 1, steps: ["a=1/4。", "b=2，c=0。", "因此 0<1/4<2，即 c<a<b。"] },
    ],
  }),
  ...makeDepthSet({
    code: "M-TRIGT", subject: "math", skill: "trig-transform",
    idea: "先识别角的拆分方式，再使用和差公式、二倍角公式或正弦定理。",
    trap: "公式中的正负号和三角形中边角对应关系最容易混淆。",
    cases: [
      { dimension: "application", title: "两角差余弦", stem: "cos15° 的值为（　）", options: ["(√6−√2)/4", "(√6+√2)/4", "√3/2", "√2/2"], answer: 1, steps: ["15°=45°−30°。", "cos(45°−30°)=cos45°cos30°+sin45°sin30°。", "化简得 (√6+√2)/4。"] },
      { dimension: "transfer", title: "正弦定理解三角形", stem: "在△ABC中，A=30°，B=45°，a=1，则 b=（　）", options: ["√2/2", "1", "√2", "2"], answer: 2, steps: ["正弦定理给出 a/sinA=b/sinB。", "b=a·sin45°/sin30°。", "b=(√2/2)/(1/2)=√2。"] },
      { dimension: "pitfall", title: "恒等式辨析", stem: "下列恒等式正确的是（　）", options: ["sin2x=2sinx", "sin2x=2sinxcosx", "cos2x=2sin²x−1", "cos(x+y)=cosxcosy+sinxsiny"], answer: 1, steps: ["二倍角正弦公式是 sin2x=2sinxcosx。", "C 的正确形式之一是 cos2x=1−2sin²x。", "D 是余弦和角公式，第二项应为减号。"] },
    ],
  }),
  ...makeDepthSet({
    code: "M-RECUR", subject: "math", skill: "recurrence",
    idea: "递推题要明确起点，再按同一规则逐项推进或寻找稳定结构。",
    trap: "下标每增加 1 才递推一次，不要少算或多算。",
    cases: [
      { dimension: "application", title: "逐项递推", stem: "数列满足 a₁=2，aₙ₊₁=aₙ+3，则 a₅=（　）", options: ["11", "12", "14", "17"], answer: 2, steps: ["从 a₁ 到 a₅ 共增加 4 次。", "a₅=2+4×3。", "结果为 14。"] },
      { dimension: "reasoning", title: "递推链条", stem: "数列满足 a₁=a₂=1，aₙ₊₂=aₙ₊₁+aₙ，则 a₆=（　）", options: ["5", "8", "10", "13"], answer: 1, steps: ["a₃=2，a₄=3。", "a₅=5。", "a₆=a₅+a₄=8。"] },
      { dimension: "pitfall", title: "递推与通项核对", stem: "已知 a₁=2，aₙ₊₁=2aₙ，下列通项正确的是（　）", options: ["aₙ=2n", "aₙ=2^(n−1)", "aₙ=2ⁿ", "aₙ=n²+1"], answer: 2, steps: ["相邻两项倍数固定为 2，是等比数列。", "aₙ=a₁·2^(n−1)。", "代入 a₁=2，得 aₙ=2ⁿ。"] },
    ],
  }),
  ...makeDepthSet({
    code: "M-SVEC", subject: "math", skill: "space-vector",
    idea: "把空间关系坐标化，垂直看数量积，距离看差向量的模。",
    trap: "数量积为零判断垂直时，向量应为非零向量。",
    cases: [
      { dimension: "application", title: "空间向量数量积", stem: "a=(1,0,1)，b=(1,2,−1)，则 a、b 的关系是（　）", options: ["平行", "垂直", "同向", "无法判断"], answer: 1, steps: ["计算 a·b=1×1+0×2+1×(−1)。", "数量积等于 0。", "两个向量均非零，所以互相垂直。"] },
      { dimension: "reasoning", title: "空间两点距离", stem: "空间中 A(1,2,3)，B(4,6,3)，则 |AB|=（　）", options: ["4", "5", "6", "7"], answer: 1, steps: ["AB=(3,4,0)。", "|AB|=√(3²+4²+0²)。", "结果为 5。"] },
      { dimension: "pitfall", title: "夹角关系", stem: "向量 a=(1,1,0)，b=(1,−1,0) 的夹角为（　）", options: ["0°", "45°", "90°", "180°"], answer: 2, steps: ["a·b=1−1+0=0。", "两向量均非零。", "数量积为零说明夹角为 90°。"] },
    ],
  }),
  ...makeDepthSet({
    code: "M-LINE", subject: "math", skill: "line",
    idea: "直线问题优先找方向信息：两点定斜率，平行斜率相同，距离用标准公式。",
    trap: "斜率公式的分子分母顺序要一致，距离公式分母不能漏。",
    cases: [
      { dimension: "application", title: "两点求斜率", stem: "过点 (1,2) 与 (3,6) 的直线斜率为（　）", options: ["1", "2", "3", "4"], answer: 1, steps: ["斜率 k=(6−2)/(3−1)。", "分子为 4，分母为 2。", "k=2。"] },
      { dimension: "transfer", title: "平行直线判断", stem: "下列直线与 2x−y+1=0 平行的是（　）", options: ["x−2y=0", "2x−y−3=0", "2x+y=0", "x+y−1=0"], answer: 1, steps: ["原直线化为 y=2x+1，斜率为 2。", "B 化为 y=2x−3，斜率也为 2。", "两直线截距不同，因此平行而不重合。"] },
      { dimension: "reasoning", title: "点到直线距离", stem: "原点到直线 3x+4y−10=0 的距离是（　）", options: ["1", "2", "5/2", "10"], answer: 1, steps: ["使用点到直线距离公式。", "d=|−10|/√(3²+4²)。", "d=10/5=2。"] },
    ],
  }),
  ...makeDepthSet({
    code: "M-CONIC", subject: "math", skill: "conic",
    idea: "先认清曲线标准式，再从分母和方向读取 a、b、p、c。",
    trap: "椭圆用 c²=a²−b²，双曲线用 c²=a²+b²。",
    cases: [
      { dimension: "application", title: "双曲线焦距参数", stem: "双曲线 x²/9−y²/16=1 中，c=（　）", options: ["3", "4", "5", "7"], answer: 2, steps: ["a²=9，b²=16。", "双曲线满足 c²=a²+b²。", "c=√25=5。"] },
      { dimension: "transfer", title: "抛物线焦点", stem: "抛物线 y²=8x 的焦点坐标是（　）", options: ["(2,0)", "(4,0)", "(0,2)", "(0,4)"], answer: 0, steps: ["与标准式 y²=4px 对照。", "4p=8，所以 p=2。", "焦点为 (p,0)=(2,0)。"] },
      { dimension: "pitfall", title: "椭圆长轴长度", stem: "椭圆 x²/16+y²/9=1 的长轴长为（　）", options: ["3", "4", "6", "8"], answer: 3, steps: ["较大分母 16=a²。", "所以半长轴 a=4。", "长轴长为 2a=8。"] },
    ],
  }),
  ...makeDepthSet({
    code: "M-COUNT", subject: "math", skill: "counting",
    idea: "先问是否考虑顺序，再判断使用分步乘法、排列还是组合。",
    trap: "“选出”通常不计顺序，“安排岗位或座位”通常要计顺序。",
    cases: [
      { dimension: "application", title: "全排列", stem: "A、B、C、D 四名同学排成一列，共有（　）种排法。", options: ["4", "12", "16", "24"], answer: 3, steps: ["第一个位置有 4 种选法。", "后面依次有 3、2、1 种。", "总数为 4×3×2×1=24。"] },
      { dimension: "reasoning", title: "组合选择", stem: "从 6 本不同的书中任选 2 本，共有（　）种选法。", options: ["8", "12", "15", "30"], answer: 2, steps: ["只问选哪两本，不考虑先后顺序。", "使用组合数 C₆²。", "C₆²=6×5/2=15。"] },
      { dimension: "transfer", title: "捆绑法排列", stem: "3 名男生、2 名女生排成一列，要求两名女生相邻，共有（　）种排法。", options: ["24", "36", "48", "120"], answer: 2, steps: ["把两名女生看作一个整体，与 3 名男生共 4 个对象。", "4 个对象有 4! 种排法。", "女生内部有 2! 种，总数 4!×2!=48。"] },
    ],
  }),
  ...makeDepthSet({
    code: "M-STAT", subject: "math", skill: "statistics",
    idea: "先明确统计量描述的是中心、离散程度还是变量之间的关系。",
    trap: "相关关系不等于因果关系，数据整体平移不会改变方差。",
    cases: [
      { dimension: "application", title: "中位数", stem: "数据 1，2，2，7，8 的中位数是（　）", options: ["2", "4", "7", "20"], answer: 0, steps: ["数据已经从小到大排列。", "共有 5 个数据，中位数是第 3 个。", "第 3 个数为 2。"] },
      { dimension: "reasoning", title: "方差变化", stem: "一组数据中的每个数都加 3，则这组数据的方差（　）", options: ["加 3", "乘 3", "不变", "无法判断"], answer: 2, steps: ["每个数据和平均数都同时加 3。", "各数据与平均数的差不变。", "这些差的平方平均值即方差，因此方差不变。"] },
      { dimension: "pitfall", title: "相关与因果", stem: "某调查发现学习时长与成绩呈正相关，据此一定能推出（　）", options: ["增加学习时长必然让每个人提分", "成绩高只由学习时长决定", "两变量有同向变化趋势，但不能仅凭相关断定因果", "两变量没有任何关系"], answer: 2, steps: ["正相关只描述总体上的同向变化趋势。", "调查中还可能存在基础、方法等其他变量。", "所以不能仅凭相关关系断定因果。"] },
    ],
  }),
  ...makeDepthSet({
    code: "M-CPLX", subject: "math", skill: "complex",
    idea: "把实部与虚部分开运算，并始终使用 i²=−1。",
    trap: "复数的模不是实部与虚部直接相加。",
    cases: [
      { dimension: "application", title: "复数加法", stem: "(2+i)+(1−3i)=（　）", options: ["3−2i", "3+4i", "1−2i", "1+4i"], answer: 0, steps: ["实部相加：2+1=3。", "虚部相加：1−3=−2。", "结果为 3−2i。"] },
      { dimension: "reasoning", title: "共轭复数乘积", stem: "(1+i)(1−i)=（　）", options: ["0", "1", "2", "2i"], answer: 2, steps: ["使用平方差：(1+i)(1−i)=1−i²。", "i²=−1。", "所以 1−(−1)=2。"] },
      { dimension: "pitfall", title: "复数的模", stem: "复数 z=3−4i 的模 |z|=（　）", options: ["1", "5", "7", "25"], answer: 1, steps: ["实部为 3，虚部为 −4。", "|z|=√(3²+(−4)²)。", "结果为 √25=5。"] },
    ],
  }),
];
