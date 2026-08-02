import { makeDepthSet } from "../depth-bank-utils.js";

export const CHEMISTRY_DEPTH_QUESTIONS = [
  ...makeDepthSet({
    code: "C-AMOUNT", subject: "chemistry", skill: "chem-amount",
    idea: "化学计量先统一单位，再在质量、物质的量、粒子数、气体体积和浓度之间搭桥。",
    trap: "气体摩尔体积必须对应标准状况；溶液体积要换成升。",
    cases: [
      { dimension: "application", title: "标准状况气体计量", stem: "标准状况下，4.48 L O₂ 的物质的量为（　）", options: ["0.10 mol", "0.20 mol", "0.40 mol", "1.00 mol"], answer: 1, steps: ["标准状况下气体摩尔体积取 22.4 L/mol。", "使用 n=V/Vₘ。", "n=4.48÷22.4=0.20 mol。"] },
      { dimension: "reasoning", title: "物质的量浓度", stem: "将 0.50 mol NaCl 配成 250 mL 溶液，溶液的物质的量浓度为（　）", options: ["0.50 mol/L", "1.0 mol/L", "2.0 mol/L", "4.0 mol/L"], answer: 2, steps: ["把 250 mL 换算为 0.250 L。", "使用 c=n/V。", "c=0.50÷0.250=2.0 mol/L。"] },
      { dimension: "transfer", title: "溶液稀释", stem: "把 50.0 mL、2.0 mol/L 的盐酸稀释到 200 mL，稀释后浓度为（　）", options: ["0.25 mol/L", "0.50 mol/L", "1.0 mol/L", "8.0 mol/L"], answer: 1, steps: ["稀释前后溶质的物质的量不变。", "使用 c₁V₁=c₂V₂。", "c₂=2.0×50.0÷200=0.50 mol/L。"] },
      { dimension: "pitfall", title: "粒子数辨析", stem: "1 mol NaCl 完全溶于水后，溶液中由 NaCl 产生的 Na⁺和 Cl⁻总数约为（　）", options: ["0.5Nₐ", "Nₐ", "2Nₐ", "4Nₐ"], answer: 2, steps: ["NaCl 在水中电离为 Na⁺和 Cl⁻。", "每个化学式单位产生两个离子。", "1 mol NaCl 产生的两种离子总数约为 2Nₐ。"] },
    ],
  }),
  ...makeDepthSet({
    code: "C-ION", subject: "chemistry", skill: "chem-ions",
    idea: "离子方程式只保留真正参加反应的粒子，并同时检查原子和电荷守恒。",
    trap: "弱电解质、难溶物、气体和水不能随意拆成离子。",
    cases: [
      { dimension: "application", title: "强酸强碱中和", stem: "盐酸与 NaOH 溶液反应的离子方程式是（　）", options: ["H⁺+OH⁻=H₂O", "HCl+OH⁻=Cl⁻+H₂O", "Na⁺+Cl⁻=NaCl", "2H⁺+O²⁻=H₂O"], answer: 0, steps: ["盐酸和 NaOH 都是强电解质，要拆成离子。", "Na⁺和 Cl⁻反应前后不变，应约去。", "净反应为 H⁺+OH⁻=H₂O。"] },
      { dimension: "reasoning", title: "碳酸根与酸", stem: "CO₃²⁻与足量强酸反应的离子方程式是（　）", options: ["CO₃²⁻+H⁺=HCO₃⁻", "CO₃²⁻+2H⁺=CO₂↑+H₂O", "CO₃²⁻+2H⁺=H₂CO₃", "CO₃²⁻+H₂O=CO₂↑+2OH⁻"], answer: 1, steps: ["足量强酸使碳酸根完全质子化。", "生成的碳酸不稳定，分解为 CO₂和水。", "配平原子和电荷得到 CO₃²⁻+2H⁺=CO₂↑+H₂O。"] },
      { dimension: "transfer", title: "离子共存", stem: "在无色强酸性溶液中能大量共存的一组离子是（　）", options: ["Na⁺、K⁺、NO₃⁻、Cl⁻", "Ba²⁺、SO₄²⁻、H⁺、Cl⁻", "H⁺、HCO₃⁻、Na⁺、Cl⁻", "Fe³⁺、K⁺、NO₃⁻、Cl⁻"], answer: 0, steps: ["强酸性意味着有大量 H⁺，无色排除有色离子。", "B 会生成 BaSO₄，C 中 HCO₃⁻与 H⁺反应，D 中 Fe³⁺有颜色。", "A 中各离子之间不反应且均无色。"] },
      { dimension: "pitfall", title: "难溶物不拆分", stem: "CaCO₃固体与盐酸反应的正确离子方程式是（　）", options: ["Ca²⁺+CO₃²⁻+2H⁺=Ca²⁺+CO₂↑+H₂O", "CaCO₃+2H⁺=Ca²⁺+CO₂↑+H₂O", "CO₃²⁻+2H⁺=CO₂↑+H₂O", "CaCO₃+H⁺=Ca²⁺+HCO₃⁻"], answer: 1, steps: ["CaCO₃是难溶固体，在离子方程式中保留化学式。", "盐酸拆成 H⁺和 Cl⁻，Cl⁻是旁观离子。", "配平后为 CaCO₃+2H⁺=Ca²⁺+CO₂↑+H₂O。"] },
    ],
  }),
  ...makeDepthSet({
    code: "C-REDOX", subject: "chemistry", skill: "chem-redox",
    idea: "氧化还原反应抓化合价变化，用电子得失守恒确定计量关系。",
    trap: "氧化剂本身被还原；还原剂本身被氧化。",
    cases: [
      { dimension: "application", title: "高锰酸根中锰的价态", stem: "MnO₄⁻中 Mn 元素的化合价是（　）", options: ["+2", "+4", "+6", "+7"], answer: 3, steps: ["氧元素通常为 −2 价，4 个氧合计 −8。", "离子总电荷为 −1。", "设 Mn 为 x，则 x−8=−1，得到 x=+7。"] },
      { dimension: "reasoning", title: "电子得失判断", stem: "Fe²⁺转化为 Fe³⁺的过程中，Fe²⁺（　）", options: ["得到 1 个电子，被还原", "失去 1 个电子，被氧化", "得到 2 个电子，被氧化", "化合价没有变化"], answer: 1, steps: ["铁的化合价由 +2 升到 +3。", "化合价升高对应失去电子。", "半反应可写为 Fe²⁺−e⁻=Fe³⁺，因此被氧化。"] },
      { dimension: "transfer", title: "酸性高锰酸根配平", stem: "酸性条件下 MnO₄⁻氧化 Fe²⁺时，1 mol MnO₄⁻可氧化 Fe²⁺的物质的量为（　）", options: ["1 mol", "3 mol", "5 mol", "8 mol"], answer: 2, steps: ["Mn 从 +7 降到 +2，每个 MnO₄⁻得到 5 个电子。", "每个 Fe²⁺变为 Fe³⁺失去 1 个电子。", "电子守恒要求 1 mol MnO₄⁻对应 5 mol Fe²⁺。"] },
      { dimension: "pitfall", title: "歧化反应", stem: "Cl₂与冷的稀 NaOH 反应生成 NaCl 和 NaClO。该反应中 Cl₂（　）", options: ["只作氧化剂", "只作还原剂", "既作氧化剂又作还原剂", "既未被氧化也未被还原"], answer: 2, steps: ["Cl₂中氯为 0 价。", "一部分变为 Cl⁻的 −1 价，另一部分变为 ClO⁻中的 +1 价。", "同一物质既被还原又被氧化，所以既是氧化剂又是还原剂。"] },
    ],
  }),
  ...makeDepthSet({
    code: "C-METAL", subject: "chemistry", skill: "chem-metals",
    idea: "金属及其化合物要沿着价态和反应条件整理转化网络。",
    trap: "铝的两性、铁的变价和钝化条件常被忽略。",
    cases: [
      { dimension: "application", title: "钠与水反应", stem: "金属钠与水反应的产物是（　）", options: ["Na₂O 和 H₂", "NaOH 和 H₂", "Na₂O₂和 O₂", "NaOH 和 O₂"], answer: 1, steps: ["钠能置换水中的氢。", "生成的金属氢氧化物是 NaOH。", "方程式为 2Na+2H₂O=2NaOH+H₂↑。"] },
      { dimension: "reasoning", title: "铝的两性", stem: "下列物质中，既能与盐酸反应又能与 NaOH 溶液反应的是（　）", options: ["MgO", "Al₂O₃", "Fe₂O₃", "CuO"], answer: 1, steps: ["Al₂O₃是两性氧化物。", "它与酸反应生成铝盐，与强碱反应生成偏铝酸盐。", "其余三种列出的氧化物主要表现碱性。"] },
      { dimension: "transfer", title: "铁离子检验", stem: "检验溶液中 Fe³⁺最常用的试剂是（　）", options: ["KSCN 溶液", "BaCl₂溶液", "稀盐酸", "淀粉溶液"], answer: 0, steps: ["Fe³⁺与 SCN⁻形成明显的血红色络合物。", "颜色变化灵敏，适合检验微量 Fe³⁺。", "BaCl₂、盐酸和淀粉均不具备这一特征反应。"] },
      { dimension: "pitfall", title: "铁的钝化", stem: "常温下，铁制容器可盛装浓硝酸，主要原因是（　）", options: ["铁与浓硝酸完全不反应", "铁表面形成致密氧化膜而钝化", "浓硝酸没有氧化性", "铁的金属活动性很弱"], answer: 1, steps: ["浓硝酸具有强氧化性。", "常温下它使铁表面迅速形成致密保护膜。", "保护膜阻止反应继续进行，这叫钝化。"] },
    ],
  }),
  ...makeDepthSet({
    code: "C-NONMETAL", subject: "chemistry", skill: "chem-nonmetals",
    idea: "非金属元素题要同时看价态变化、物质性质和反应条件。",
    trap: "漂白原因不同，效果是否永久也不同。",
    cases: [
      { dimension: "application", title: "氯气与水", stem: "Cl₂与水反应生成的两种酸是（　）", options: ["HCl 和 HClO", "HCl 和 HClO₃", "HClO 和 HClO₄", "H₂和 HClO"], answer: 0, steps: ["氯气与水发生歧化。", "一部分氯变为 −1 价的 HCl，另一部分变为 +1 价的 HClO。", "反应为 Cl₂+H₂O⇌HCl+HClO。"] },
      { dimension: "reasoning", title: "二氧化硫漂白", stem: "SO₂使品红溶液褪色，加热后红色可能恢复，这说明其漂白通常具有（　）", options: ["永久性", "可逆性", "强氧化性", "脱水性"], answer: 1, steps: ["SO₂与某些有色物质形成不稳定的无色加合物。", "加热会使加合物分解。", "颜色恢复说明该漂白具有可逆性。"] },
      { dimension: "transfer", title: "氨气的碱性", stem: "把湿润的红色石蕊试纸放入 NH₃中，试纸将（　）", options: ["变蓝", "变白", "变黑", "不变色"], answer: 0, steps: ["NH₃溶于试纸上的水。", "NH₃+H₂O⇌NH₃·H₂O，溶液显碱性。", "碱性环境使红色石蕊变蓝。"] },
      { dimension: "pitfall", title: "二氧化氮与水", stem: "NO₂与水反应的正确化学方程式是（　）", options: ["NO₂+H₂O=HNO₃+H₂", "2NO₂+H₂O=HNO₃+HNO₂", "3NO₂+H₂O=2HNO₃+NO", "4NO₂+2H₂O=4HNO₃"], answer: 2, steps: ["NO₂在水中发生歧化反应。", "产物是硝酸和 NO。", "配平后为 3NO₂+H₂O=2HNO₃+NO。"] },
    ],
  }),
  ...makeDepthSet({
    code: "C-PERIOD", subject: "chemistry", skill: "chem-periodic",
    idea: "周期律比较先定位周期和主族，再用核电荷与电子层数解释趋势。",
    trap: "同周期和同主族的递变方向不同，不能只背“越大越强”。",
    cases: [
      { dimension: "application", title: "同周期原子半径", stem: "第三周期元素 Na、Mg、Al 中，原子半径最大的是（　）", options: ["Na", "Mg", "Al", "三者相同"], answer: 0, steps: ["三种元素电子层数相同。", "从 Na 到 Al 核电荷逐渐增大，对外层电子吸引增强。", "原子半径依次减小，所以 Na 最大。"] },
      { dimension: "reasoning", title: "主族最外层电子", stem: "同一主族的短周期元素通常具有相同的（　）", options: ["电子层数", "中子数", "最外层电子数", "原子半径"], answer: 2, steps: ["主族序数与最外层电子数存在对应关系。", "同主族元素具有相似价电子结构。", "因此它们的最外层电子数通常相同。"] },
      { dimension: "transfer", title: "非金属性比较", stem: "下列元素中非金属性最强的是（　）", options: ["C", "N", "O", "F"], answer: 3, steps: ["四种元素都在第二周期。", "同周期从左到右，非金属性总体增强。", "F 位于最右侧且非金属性最强。"] },
      { dimension: "pitfall", title: "元素性质推断", stem: "某主族元素原子的最外层有 7 个电子，它最可能属于（　）", options: ["碱金属", "碱土金属", "卤族元素", "稀有气体"], answer: 2, steps: ["主族元素最外层电子数反映族序特征。", "最外层 7 个电子对应第 17 族。", "第 17 族即卤族元素。"] },
    ],
  }),
  ...makeDepthSet({
    code: "C-THERMO", subject: "chemistry", skill: "chem-thermo",
    idea: "反应热按能量收支处理：断键吸热，成键放热，盖斯定律按路径相加。",
    trap: "催化剂改变速率和活化能，不改变反应焓变。",
    cases: [
      { dimension: "application", title: "放热反应的焓变", stem: "某反应放出 92 kJ 热量，则该过程的 ΔH（　）", options: ["大于 0", "小于 0", "等于 0", "无法判断"], answer: 1, steps: ["焓变按系统吸收的热量记号。", "反应放热表示系统向外界释放能量。", "因此放热反应的 ΔH<0。"] },
      { dimension: "reasoning", title: "盖斯定律", stem: "已知 A→B 的 ΔH₁=+20 kJ/mol，B→C 的 ΔH₂=−50 kJ/mol，则 A→C 的 ΔH 为（　）", options: ["−70 kJ/mol", "−30 kJ/mol", "+30 kJ/mol", "+70 kJ/mol"], answer: 1, steps: ["A→C 可看作 A→B 与 B→C 两步相加。", "根据盖斯定律，焓变具有可加性。", "ΔH=20−50=−30 kJ/mol。"] },
      { dimension: "transfer", title: "键能估算反应热", stem: "反应 H₂+Cl₂→2HCl 中，断裂 H—H 和 Cl—Cl 键共吸收 679 kJ，形成 2 mol H—Cl 键共放出 862 kJ，则 ΔH 为（　）", options: ["−183 kJ", "+183 kJ", "−1541 kJ", "+1541 kJ"], answer: 0, steps: ["断裂化学键吸收 679 kJ。", "形成化学键放出 862 kJ。", "ΔH=679−862=−183 kJ。"] },
      { dimension: "pitfall", title: "催化剂与焓变", stem: "向某反应加入合适催化剂后，下列量一定不变的是（　）", options: ["反应速率", "反应历程", "反应活化能", "反应焓变"], answer: 3, steps: ["催化剂提供新的反应路径。", "新路径通常降低活化能并加快正、逆反应速率。", "反应物和生成物能量不变，所以 ΔH 不变。"] },
    ],
  }),
  ...makeDepthSet({
    code: "C-EQUIL", subject: "chemistry", skill: "chem-rate-equilibrium",
    idea: "速率看单位时间变化，平衡移动看外界条件怎样削弱所加影响。",
    trap: "催化剂同时加快正、逆反应，不能改变平衡常数和平衡组成。",
    cases: [
      { dimension: "application", title: "浓度对速率的影响", stem: "其他条件不变，增大反应物浓度通常会使化学反应速率（　）", options: ["增大", "减小", "保持不变", "先减后增"], answer: 0, steps: ["浓度增大意味着单位体积内反应物粒子数增多。", "粒子间有效碰撞机会通常增多。", "因此反应速率通常增大。"] },
      { dimension: "reasoning", title: "压强与平衡移动", stem: "反应 N₂(g)+3H₂(g)⇌2NH₃(g) 达平衡后，其他条件不变，增大压强，平衡将（　）", options: ["向左移动", "向右移动", "不移动", "先左后右"], answer: 1, steps: ["左侧气体计量数之和为 4，右侧为 2。", "增大压强时，体系倾向于减小气体总物质的量。", "所以平衡向生成 NH₃的一侧移动。"] },
      { dimension: "transfer", title: "浓度商判断方向", stem: "某温度下反应的平衡常数为 K，若瞬时浓度商 Q<K，则反应将（　）", options: ["正向进行到平衡", "逆向进行到平衡", "已经处于平衡", "停止反应"], answer: 0, steps: ["Q 反映当前生成物与反应物的相对比例。", "Q<K 表明生成物相对不足。", "体系会正向进行，使 Q 增大到 K。"] },
      { dimension: "pitfall", title: "催化剂与平衡", stem: "可逆反应达到平衡后加入催化剂，正确的是（　）", options: ["平衡向正反应方向移动", "平衡向逆反应方向移动", "平衡组成不变，但更快建立新的动态平衡", "平衡常数增大"], answer: 2, steps: ["催化剂同等倍数地加快正、逆反应。", "正、逆速率仍然相等，平衡位置不变。", "平衡常数只随温度变化，也不因催化剂改变。"] },
    ],
  }),
  ...makeDepthSet({
    code: "C-AQUEOUS", subject: "chemistry", skill: "chem-aqueous",
    idea: "水溶液平衡先认清弱电解质、电离和水解，再用守恒关系核对。",
    trap: "弱电解质稀释时电离程度增大，但其主要离子浓度通常会下降。",
    cases: [
      { dimension: "application", title: "强酸的 pH", stem: "25 ℃时，0.010 mol/L HCl 溶液的 pH 为（　）", options: ["1", "2", "7", "12"], answer: 1, steps: ["HCl 是强酸，完全电离。", "c(H⁺)=0.010 mol/L=10⁻² mol/L。", "pH=−lg c(H⁺)=2。"] },
      { dimension: "reasoning", title: "醋酸稀释", stem: "向醋酸溶液中加水稀释时，醋酸的电离程度和 c(H⁺)通常分别（　）", options: ["增大、增大", "增大、减小", "减小、增大", "减小、减小"], answer: 1, steps: ["稀释促进弱电解质电离，电离程度增大。", "但溶液总体积增大得更明显。", "对通常的稀释过程，c(H⁺)仍然减小。"] },
      { dimension: "transfer", title: "盐类水解", stem: "25 ℃时，Na₂CO₃水溶液显碱性的主要原因是（　）", options: ["Na⁺水解产生 H⁺", "CO₃²⁻水解产生 OH⁻", "Na₂CO₃与水反应产生 NaOH 固体", "水停止电离"], answer: 1, steps: ["Na⁺来自强碱，基本不水解。", "CO₃²⁻是弱酸的酸根，能与水反应。", "CO₃²⁻+H₂O⇌HCO₃⁻+OH⁻，所以溶液显碱性。"] },
      { dimension: "pitfall", title: "电荷守恒", stem: "NH₄Cl 水溶液中的电荷守恒关系正确的是（　）", options: ["c(NH₄⁺)+c(H⁺)=c(Cl⁻)+c(OH⁻)", "c(NH₄⁺)=c(Cl⁻)", "c(H⁺)=c(OH⁻)", "c(NH₄⁺)+c(Cl⁻)=c(H⁺)+c(OH⁻)"], answer: 0, steps: ["溶液整体必须保持电中性。", "阳离子是 NH₄⁺和 H⁺，阴离子是 Cl⁻和 OH⁻。", "正电荷总浓度等于负电荷总浓度，得到 A。"] },
    ],
  }),
  ...makeDepthSet({
    code: "C-KSP", subject: "chemistry", skill: "chem-solubility",
    idea: "沉淀平衡用离子积 Q 与 Ksp 比较，温度一定时 Ksp 只由难溶物本性决定。",
    trap: "Ksp 小不等于任意条件下溶解度都小，还要看化学式和外加离子。",
    cases: [
      { dimension: "application", title: "氯化银溶解度", stem: "25 ℃时 AgCl 的 Ksp=1.8×10⁻¹⁰，在纯水中其物质的量溶解度约为（　）", options: ["1.8×10⁻¹⁰ mol/L", "1.3×10⁻⁵ mol/L", "1.8×10⁻⁵ mol/L", "9.0×10⁻¹¹ mol/L"], answer: 1, steps: ["AgCl(s)⇌Ag⁺+Cl⁻，设溶解度为 s。", "纯水中 c(Ag⁺)=c(Cl⁻)=s，所以 Ksp=s²。", "s=√(1.8×10⁻¹⁰)≈1.3×10⁻⁵ mol/L。"] },
      { dimension: "reasoning", title: "离子积判断沉淀", stem: "对于难溶盐，若混合后瞬时离子积 Q>Ksp，则体系将（　）", options: ["析出沉淀", "继续溶解固体", "恰好饱和且不变化", "Ksp 自动增大"], answer: 0, steps: ["Q>Ksp 表示溶液中相关离子浓度超过饱和值。", "体系通过生成沉淀降低离子浓度。", "直至 Q 降到 Ksp 并达到平衡。"] },
      { dimension: "transfer", title: "同离子效应", stem: "向 AgCl 的饱和溶液中加入少量 NaCl 固体并保持温度不变，AgCl 的溶解度将（　）", options: ["增大", "减小", "不变", "先增后减"], answer: 1, steps: ["NaCl 提供与 AgCl 平衡共有的 Cl⁻。", "c(Cl⁻)增大使平衡向生成 AgCl 固体方向移动。", "因此 AgCl 的溶解度减小。"] },
      { dimension: "pitfall", title: "Ksp 的影响因素", stem: "在温度不变时，向 AgCl 饱和溶液中加入 NaCl 后，AgCl 的 Ksp（　）", options: ["增大", "减小", "不变", "变为零"], answer: 2, steps: ["Ksp 是特定温度下难溶电解质的平衡常数。", "加入同离子会改变平衡浓度和溶解度。", "但温度不变时 Ksp 不变。"] },
    ],
  }),
  ...makeDepthSet({
    code: "C-ELECTRO", subject: "chemistry", skill: "chem-electrochemistry",
    idea: "电化学先认电极反应：氧化在阳极，还原在阴极，再判断电子和离子方向。",
    trap: "原电池的负极是阳极；电解池的阴阳极由反应类型而不是正负名称判断。",
    cases: [
      { dimension: "application", title: "锌铜原电池电极", stem: "锌—铜原电池中，锌电极发生的反应是（　）", options: ["Zn−2e⁻=Zn²⁺", "Zn²⁺+2e⁻=Zn", "Cu−2e⁻=Cu²⁺", "2H⁺+2e⁻=H₂"], answer: 0, steps: ["锌比铜活泼，在原电池中失去电子。", "失电子是氧化反应，发生在负极即阳极。", "电极反应为 Zn−2e⁻=Zn²⁺。"] },
      { dimension: "reasoning", title: "电子流向", stem: "锌—铜原电池工作时，外电路中电子的流向是（　）", options: ["由铜极流向锌极", "由锌极流向铜极", "由盐桥流向锌极", "电子不发生定向移动"], answer: 1, steps: ["锌极发生氧化反应并放出电子。", "铜极发生还原反应并接收电子。", "因此电子经外电路由锌极流向铜极。"] },
      { dimension: "transfer", title: "硫酸铜溶液电解", stem: "用惰性电极电解 CuSO₄溶液，阴极首先析出的物质是（　）", options: ["Cu", "O₂", "H₂", "SO₂"], answer: 0, steps: ["阴极发生还原反应。", "水溶液中 Cu²⁺比水更容易在阴极得到电子。", "Cu²⁺+2e⁻=Cu，因此阴极析出铜。"] },
      { dimension: "pitfall", title: "电镀的电极连接", stem: "在铁件表面电镀铜时，铁件应连接电源的（　）", options: ["正极，作阳极", "负极，作阴极", "正极，作阴极", "负极，作阳极"], answer: 1, steps: ["要在铁件表面沉积 Cu，铁件处必须发生 Cu²⁺得到电子的还原反应。", "还原发生在电解池阴极。", "电解池阴极连接电源负极。"] },
    ],
  }),
  ...makeDepthSet({
    code: "C-STRUCT", subject: "chemistry", skill: "chem-structure",
    idea: "结构题从质子数、电子排布和成键方式逐层判断。",
    trap: "同位素化学性质相近，但中子数和质量数不同。",
    cases: [
      { dimension: "application", title: "同位素概念", stem: "¹²C 与 ¹⁴C 互为同位素，它们一定相同的是（　）", options: ["中子数", "质量数", "质子数", "物理性质"], answer: 2, steps: ["同位素属于同一种元素。", "元素种类由质子数决定。", "因此 ¹²C 与 ¹⁴C 的质子数相同，中子数和质量数不同。"] },
      { dimension: "reasoning", title: "氯原子价电子", stem: "基态氯原子的最外层电子数是（　）", options: ["1", "3", "7", "17"], answer: 2, steps: ["氯的原子序数为 17。", "电子排布可写成 2、8、7。", "最外层电子数为 7。"] },
      { dimension: "transfer", title: "离子键形成", stem: "NaCl 晶体中主要存在的化学键是（　）", options: ["离子键", "非极性共价键", "金属键", "氢键"], answer: 0, steps: ["Na 容易失去电子形成 Na⁺。", "Cl 容易得到电子形成 Cl⁻。", "阴、阳离子间的静电作用形成离子键。"] },
      { dimension: "pitfall", title: "共价键电子对", stem: "H₂分子中两个氢原子形成共价键的本质是（　）", options: ["完全转移一对电子", "共用一对电子", "共用一对质子", "形成自由电子海"], answer: 1, steps: ["每个氢原子提供一个电子。", "两个电子形成一对共用电子对。", "共用电子对把两个原子结合成 H₂分子。"] },
    ],
  }),
  ...makeDepthSet({
    code: "C-CRYSTAL", subject: "chemistry", skill: "chem-crystal",
    idea: "晶体性质由构成粒子和粒子间作用决定，分子形状由价层电子对排布判断。",
    trap: "离子晶体不存在一个个独立的“分子”。",
    cases: [
      { dimension: "application", title: "二氧化碳分子形状", stem: "CO₂分子的空间构型是（　）", options: ["直线形", "V 形", "三角锥形", "正四面体形"], answer: 0, steps: ["中心碳原子形成两个成键电子域。", "两个电子域为减少排斥取 180°排列。", "因此 CO₂为直线形。"] },
      { dimension: "reasoning", title: "金刚石的高硬度", stem: "金刚石硬度很大的主要结构原因是（　）", options: ["分子间有氢键", "碳原子形成空间网状共价结构", "含有大量自由电子", "由离子构成"], answer: 1, steps: ["金刚石中每个碳原子与周围碳原子形成强共价键。", "这些键延伸成三维空间网状结构。", "破坏晶体需要断裂大量共价键，所以硬度很大。"] },
      { dimension: "transfer", title: "冰中的氢键", stem: "冰的晶体结构中，水分子之间除范德华力外还存在较强的（　）", options: ["离子键", "金属键", "氢键", "配位键"], answer: 2, steps: ["H₂O 分子中 O—H 键极性较强。", "一个水分子的 H 可与另一水分子的 O 形成氢键。", "氢键显著影响水和冰的物理性质。"] },
      { dimension: "pitfall", title: "离子晶体微粒", stem: "关于 NaCl 晶体，下列说法正确的是（　）", options: ["由一个个 NaCl 分子构成", "由 Na⁺和 Cl⁻按一定规律排列构成", "熔融状态不能导电", "晶体中只存在共价键"], answer: 1, steps: ["NaCl 是离子晶体。", "晶体由 Na⁺和 Cl⁻在空间中规则排列构成，不存在独立 NaCl 分子。", "熔融时离子可移动，因此能够导电。"] },
    ],
  }),
  ...makeDepthSet({
    code: "C-ORG", subject: "chemistry", skill: "chem-organic-basic",
    idea: "有机物先看碳骨架和官能团，再判断同系物或同分异构关系。",
    trap: "同分异构体必须分子式相同、结构不同；同系物必须结构相似且组成相差若干 CH₂。",
    cases: [
      { dimension: "application", title: "同分异构体", stem: "正丁烷与异丁烷的关系是（　）", options: ["同位素", "同素异形体", "同系物", "同分异构体"], answer: 3, steps: ["两者分子式都为 C₄H₁₀。", "正丁烷是直链，异丁烷有支链，结构不同。", "分子式相同而结构不同，互为同分异构体。"] },
      { dimension: "reasoning", title: "同系物判断", stem: "乙烷 C₂H₆与丙烷 C₃H₈互为同系物，二者组成相差（　）", options: ["CH", "CH₂", "CH₃", "C₂H₂"], answer: 1, steps: ["乙烷和丙烷都属于烷烃，结构相似。", "用 C₃H₈减去 C₂H₆。", "组成相差一个 CH₂原子团。"] },
      { dimension: "transfer", title: "碳原子的成键数", stem: "在常见稳定有机物中，一个中性碳原子通常形成的共价键数为（　）", options: ["1", "2", "3", "4"], answer: 3, steps: ["碳原子有 4 个价电子。", "通常通过形成 4 个共价键达到稳定结构。", "双键按两个键、三键按三个键计。"] },
      { dimension: "pitfall", title: "丁烷同分异构体数", stem: "分子式为 C₄H₁₀的有机物共有几种碳骨架异构体（　）", options: ["1", "2", "3", "4"], answer: 1, steps: ["先排直链结构，得到正丁烷。", "再排一个支链结构，得到异丁烷。", "4 个碳无法形成第三种不同连接方式，所以共 2 种。"] },
    ],
  }),
  ...makeDepthSet({
    code: "C-HYDRO", subject: "chemistry", skill: "chem-hydrocarbon",
    idea: "烃类性质主要由碳碳单键、双键、三键和苯环结构决定。",
    trap: "甲烷与氯气是光照取代，乙烯使溴水褪色是加成。",
    cases: [
      { dimension: "application", title: "乙烯与溴水", stem: "乙烯使溴水褪色，发生的主要反应类型是（　）", options: ["取代反应", "加成反应", "消去反应", "酯化反应"], answer: 1, steps: ["乙烯分子中含有碳碳双键。", "Br₂可加到双键两端。", "双键转变为单键并生成 1,2-二溴乙烷，属于加成反应。"] },
      { dimension: "reasoning", title: "甲烷氯代", stem: "甲烷与氯气在光照下发生反应，其反应类型主要是（　）", options: ["加成反应", "取代反应", "聚合反应", "中和反应"], answer: 1, steps: ["光照条件下 Cl₂发生均裂并引发链反应。", "甲烷中的 H 原子逐步被 Cl 原子替代。", "这种原子或原子团被替换的反应属于取代反应。"] },
      { dimension: "transfer", title: "苯的典型反应", stem: "苯在 FeBr₃催化下与液溴反应，主要生成溴苯和 HBr，该反应属于（　）", options: ["取代反应", "加成反应", "氧化反应", "消去反应"], answer: 0, steps: ["苯环上的一个 H 被 Br 替代。", "苯环的基本结构在反应后保留。", "因此属于取代反应。"] },
      { dimension: "pitfall", title: "乙炔完全燃烧", stem: "1 mol C₂H₂完全燃烧消耗 O₂的物质的量为（　）", options: ["1.5 mol", "2.0 mol", "2.5 mol", "3.0 mol"], answer: 2, steps: ["配平燃烧方程式：2C₂H₂+5O₂→4CO₂+2H₂O。", "2 mol C₂H₂消耗 5 mol O₂。", "因此 1 mol C₂H₂消耗 2.5 mol O₂。"] },
    ],
  }),
  ...makeDepthSet({
    code: "C-OXYORG", subject: "chemistry", skill: "chem-oxygen-organic",
    idea: "含氧衍生物按羟基、醛基、羧基和酯基识别特征反应。",
    trap: "酚羟基有弱酸性，但通常不能与 NaHCO₃放出 CO₂。",
    cases: [
      { dimension: "application", title: "乙醇催化氧化", stem: "乙醇在铜或银催化并加热条件下被氧化，主要有机产物是（　）", options: ["乙烷", "乙烯", "乙醛", "乙酸乙酯"], answer: 2, steps: ["乙醇属于伯醇。", "伯醇在温和催化氧化条件下先生成醛。", "乙醇对应生成乙醛。"] },
      { dimension: "reasoning", title: "酯化反应", stem: "乙酸与乙醇在浓硫酸、加热条件下反应，主要有机产物是（　）", options: ["乙醛", "乙酸乙酯", "乙醚", "乙烯"], answer: 1, steps: ["羧酸与醇在酸催化下发生酯化。", "乙酸提供乙酰基，乙醇提供乙氧基。", "生成乙酸乙酯和水。"] },
      { dimension: "transfer", title: "醛基检验", stem: "可用于检验乙醛中醛基的试剂是（　）", options: ["银氨溶液", "NaCl 溶液", "稀盐酸", "石蕊溶液"], answer: 0, steps: ["醛基具有还原性。", "在水浴加热时可还原银氨溶液中的银离子。", "生成银镜是醛基的特征现象。"] },
      { dimension: "pitfall", title: "苯酚酸性辨析", stem: "下列试剂中，苯酚能与其反应，而乙醇通常不能反应的是（　）", options: ["NaOH 溶液", "金属 Na", "O₂", "H₂"], answer: 0, steps: ["苯酚羟基受苯环影响，具有弱酸性。", "它能与 NaOH 生成苯酚钠和水。", "乙醇酸性更弱，通常不与 NaOH 水溶液反应。"] },
    ],
  }),
  ...makeDepthSet({
    code: "C-SYN", subject: "chemistry", skill: "chem-synthesis",
    idea: "有机合成像路线规划：先定目标官能团，再逆推每一步需要怎样引入、转换和保护。",
    trap: "写路线时必须同时满足试剂、条件、碳骨架和官能团变化。",
    cases: [
      { dimension: "application", title: "乙醇制乙烯", stem: "由乙醇制取乙烯常用的反应条件是（　）", options: ["浓硫酸、170 ℃", "稀硫酸、冷却", "NaOH 水溶液、加热", "银氨溶液、水浴"], answer: 0, steps: ["乙醇制乙烯需要发生分子内脱水。", "浓硫酸作催化剂和脱水剂。", "约 170 ℃时主要发生消去反应生成乙烯。"] },
      { dimension: "reasoning", title: "官能团逆推", stem: "若目标产物是乙酸乙酯，最直接的两种原料组合是（　）", options: ["乙烯和水", "乙醇和乙酸", "乙醛和氢气", "乙酸和甲醇"], answer: 1, steps: ["乙酸乙酯含有 CH₃COOCH₂CH₃结构。", "酯基可逆推为羧酸和醇。", "对应原料是乙酸与乙醇。"] },
      { dimension: "transfer", title: "酯的水解", stem: "乙酸乙酯在 NaOH 溶液中充分水解，生成的有机物是（　）", options: ["乙酸和乙醇", "乙酸钠和乙醇", "乙醛和甲醇", "甲酸钠和乙醇"], answer: 1, steps: ["酯在碱性条件下发生水解。", "酸性部分转化为羧酸盐，醇的部分生成相应醇。", "乙酸乙酯生成乙酸钠和乙醇。"] },
      { dimension: "pitfall", title: "碳骨架检查", stem: "设计有机合成路线时，判断某一步是否合理，最先应核对（　）", options: ["试剂瓶颜色", "反应前后碳原子数和官能团变化", "方程式写得是否最长", "产物名称是否更复杂"], answer: 1, steps: ["有机反应必须遵守原子守恒。", "碳骨架是否增减决定所需的成键或断键方式。", "随后再核对官能团转化、试剂和条件。"] },
    ],
  }),
  ...makeDepthSet({
    code: "C-POLY", subject: "chemistry", skill: "chem-polymer",
    idea: "高分子题先判断单体官能团，再区分加聚与缩聚；生物大分子要认清基本单元。",
    trap: "加聚通常无小分子副产物，缩聚常伴随水等小分子生成。",
    cases: [
      { dimension: "application", title: "聚乙烯形成", stem: "乙烯生成聚乙烯的反应类型是（　）", options: ["加聚反应", "缩聚反应", "酯化反应", "水解反应"], answer: 0, steps: ["乙烯的碳碳双键打开。", "大量乙烯分子连续连接成链。", "过程不生成小分子，属于加聚反应。"] },
      { dimension: "reasoning", title: "缩聚特征", stem: "二元酸与二元醇形成聚酯的过程中通常还生成（　）", options: ["H₂", "O₂", "H₂O", "CO₂"], answer: 2, steps: ["羧基与羟基之间可形成酯键。", "每形成一个酯键通常脱去一个水分子。", "因此聚酯形成属于缩聚并伴随 H₂O 生成。"] },
      { dimension: "transfer", title: "淀粉水解终产物", stem: "淀粉在酸或酶作用下彻底水解的最终有机产物是（　）", options: ["乙醇", "葡萄糖", "氨基酸", "甘油"], answer: 1, steps: ["淀粉是由许多葡萄糖单元连接而成的多糖。", "水解逐步断开糖苷键。", "彻底水解的最终产物是葡萄糖。"] },
      { dimension: "pitfall", title: "蛋白质基本单元", stem: "蛋白质水解的最终产物主要是（　）", options: ["脂肪酸", "单糖", "α-氨基酸", "核苷酸"], answer: 2, steps: ["蛋白质由氨基酸通过肽键连接形成。", "水解会逐步断裂肽键。", "完全水解后主要得到各种 α-氨基酸。"] },
    ],
  }),
  ...makeDepthSet({
    code: "C-LABB", subject: "chemistry", skill: "chem-lab-basic",
    idea: "实验基本操作先守安全，再按仪器用途和误差方向判断。",
    trap: "容量瓶只用于定容，不能加热、溶解固体或长期贮液。",
    cases: [
      { dimension: "application", title: "浓硫酸稀释", stem: "稀释浓硫酸时，正确操作是（　）", options: ["把水迅速倒入浓硫酸并搅拌", "把浓硫酸沿器壁慢慢加入水中并不断搅拌", "浓硫酸与水同时倒入量筒", "直接在容量瓶中混合并加热"], answer: 1, steps: ["浓硫酸溶于水会放出大量热。", "应把密度较大的浓硫酸慢慢加入较多的水中。", "同时不断搅拌散热，防止局部沸腾飞溅。"] },
      { dimension: "reasoning", title: "闻气体气味", stem: "闻未知气体气味时，正确方法是（　）", options: ["把鼻孔凑近瓶口深吸", "用手在瓶口轻轻扇动，仅闻少量气体", "把气体全部吸入注射器再闻", "加热气体后直接闻"], answer: 1, steps: ["未知气体可能有毒或有强刺激性。", "不能把鼻孔直接靠近容器口。", "应用手轻扇，使少量气体飘向鼻孔。"] },
      { dimension: "transfer", title: "容量瓶用途", stem: "下列操作可以直接在容量瓶中进行的是（　）", options: ["加热溶液", "溶解 NaOH 固体", "把已冷却的溶液定容到刻度", "长期贮存强碱溶液"], answer: 2, steps: ["容量瓶用于准确配制一定体积的溶液。", "溶解和放热过程应在烧杯中完成并冷却。", "转移后可在容量瓶中加水至刻度完成定容。"] },
      { dimension: "pitfall", title: "氢氧化钠称量", stem: "称量 NaOH 固体时，不宜直接放在称量纸上的主要原因是 NaOH（　）", options: ["易潮解且有腐蚀性", "易升华", "具有强还原性", "熔点很低"], answer: 0, steps: ["NaOH 会吸收空气中的水和 CO₂。", "它还具有腐蚀性，可能损伤称量纸和天平。", "因此通常放在小烧杯等容器中快速称量。"] },
    ],
  }),
  ...makeDepthSet({
    code: "C-LABI", subject: "chemistry", skill: "chem-lab-inquiry",
    idea: "实验探究围绕“目的—操作—现象—结论”闭环，并设置空白或对照排除干扰。",
    trap: "观察到现象只能支持对应范围的结论，不能越过证据过度推断。",
    cases: [
      { dimension: "application", title: "氯离子检验", stem: "检验未知溶液中的 Cl⁻，合理的试剂和顺序是（　）", options: ["先加稀硝酸，再加 AgNO₃溶液", "先加稀盐酸，再加 AgNO₃溶液", "只加 BaCl₂溶液", "先加 NaOH，再加酚酞"], answer: 0, steps: ["先用稀硝酸酸化，排除 CO₃²⁻等离子的干扰。", "再加入 AgNO₃，若有 Cl⁻会生成白色 AgCl 沉淀。", "不能用盐酸酸化，因为盐酸会引入 Cl⁻。"] },
      { dimension: "reasoning", title: "过滤的适用对象", stem: "要从含有不溶性泥沙的食盐水中先除去泥沙，最合适的操作是（　）", options: ["过滤", "蒸馏", "萃取", "结晶"], answer: 0, steps: ["泥沙不溶于水，食盐溶于水。", "过滤可利用颗粒是否通过滤纸实现固液分离。", "泥沙留在滤纸上，食盐水成为滤液。"] },
      { dimension: "transfer", title: "二氧化硫与二氧化碳鉴别", stem: "鉴别无色气体 SO₂和 CO₂，较合适的试剂是（　）", options: ["酸性 KMnO₄溶液", "澄清石灰水", "NaOH 溶液", "蒸馏水"], answer: 0, steps: ["SO₂具有还原性，可使酸性 KMnO₄溶液褪色。", "CO₂通常不能使酸性 KMnO₄褪色。", "石灰水与两者都可能产生浑浊，区分度较差。"] },
      { dimension: "pitfall", title: "氨气收集", stem: "实验室收集干燥 NH₃时，适合采用的方法是（　）", options: ["排水法", "向上排空气法", "向下排空气法", "任何方法都相同"], answer: 2, steps: ["NH₃极易溶于水，不能用排水法。", "NH₃的相对分子质量为 17，比空气小。", "密度比空气小的气体用向下排空气法收集。"] },
    ],
  }),
];
