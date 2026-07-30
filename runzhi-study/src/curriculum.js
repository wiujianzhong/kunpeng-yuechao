const SUBJECT_CURRICULUM = {
  math: [
    {
      id: "math-foundation",
      name: "集合、逻辑与不等式",
      skills: [
        ["sets", "集合关系与运算", 66, 6],
        ["logic", "常用逻辑用语", 63, 6],
        ["inequality", "不等式与基本不等式", 55, 8],
      ],
    },
    {
      id: "math-function",
      name: "函数与导数",
      skills: [
        ["function", "函数概念与性质", 58, 9],
        ["quadratic", "二次函数与方程", 62, 8],
        ["exponential-log", "指数、对数与幂函数", 57, 8],
        ["derivative", "导数与函数", 46, 10, { featured: true, x: 24, y: 29 }],
      ],
    },
    {
      id: "math-trig-vector",
      name: "三角函数与平面向量",
      skills: [
        ["trigonometry", "三角函数图像与性质", 74, 7, { featured: true, x: 55, y: 68 }],
        ["trig-transform", "三角恒等变换与解三角形", 59, 8],
        ["vectors", "平面向量", 61, 8],
      ],
    },
    {
      id: "math-sequence",
      name: "数列",
      skills: [
        ["sequence", "等差数列", 68, 7, { featured: true, x: 62, y: 29 }],
        ["geometric-sequence", "等比数列", 60, 8],
        ["recurrence", "数列递推与求和", 51, 9],
      ],
    },
    {
      id: "math-solid",
      name: "立体几何",
      skills: [
        ["geometry3d", "空间关系与几何体", 64, 7, { featured: true, x: 32, y: 70 }],
        ["space-vector", "空间向量与角距离", 52, 9],
      ],
    },
    {
      id: "math-analytic",
      name: "解析几何",
      skills: [
        ["line", "直线与圆", 60, 8],
        ["analytic", "圆与位置关系", 53, 9, { featured: true, x: 43, y: 16 }],
        ["conic", "椭圆、双曲线与抛物线", 48, 10],
      ],
    },
    {
      id: "math-probability",
      name: "计数、概率与统计",
      skills: [
        ["counting", "排列组合与二项式", 56, 8],
        ["probability", "古典概型与条件概率", 61, 8, { featured: true, x: 73, y: 51 }],
        ["statistics", "统计、分布与回归", 65, 7],
      ],
    },
    {
      id: "math-other",
      name: "复数",
      skills: [["complex", "复数运算与几何意义", 67, 6]],
    },
  ],
  physics: [
    {
      id: "physics-motion",
      name: "运动学",
      skills: [
        ["motion", "直线运动与图像", 56, 9],
        ["projectile", "抛体运动", 52, 9],
      ],
    },
    {
      id: "physics-force",
      name: "相互作用与牛顿定律",
      skills: [
        ["mechanics", "受力分析与牛顿定律", 49, 10, { featured: true, x: 15, y: 52 }],
        ["circular", "圆周运动", 54, 8],
        ["gravitation", "万有引力与航天", 59, 8],
      ],
    },
    {
      id: "physics-energy",
      name: "机械能与动量",
      skills: [
        ["energy", "功、功率与机械能", 55, 9],
        ["momentum", "动量与碰撞", 51, 9],
      ],
    },
    {
      id: "physics-electric-field",
      name: "静电场",
      skills: [
        ["electrostatics", "库仑定律与场强", 57, 8],
        ["electric-field", "电势、电势能与电容器", 50, 9],
      ],
    },
    {
      id: "physics-circuit",
      name: "恒定电流",
      skills: [
        ["electricity", "电路与闭合电路", 58, 9, { featured: true, x: 86, y: 30 }],
        ["circuit-experiment", "电学实验与仪表", 53, 9],
      ],
    },
    {
      id: "physics-magnetic",
      name: "磁场",
      skills: [
        ["magnetic-field", "安培力与磁场方向", 47, 9],
        ["magnetism", "带电粒子在磁场中运动", 44, 10, { featured: true, x: 87, y: 70 }],
      ],
    },
    {
      id: "physics-induction",
      name: "电磁感应与交变电流",
      skills: [
        ["induction", "电磁感应与楞次定律", 46, 10],
        ["ac", "交变电流与变压器", 60, 7],
      ],
    },
    {
      id: "physics-modern",
      name: "热、光、波与近代物理",
      skills: [
        ["thermodynamics", "分子动理论与热力学", 62, 7],
        ["optics", "几何光学与波动光学", 58, 7],
        ["waves", "机械振动与机械波", 55, 8],
        ["modern-physics", "原子与原子核", 64, 7],
      ],
    },
    {
      id: "physics-lab",
      name: "物理实验",
      skills: [["experiment", "力学实验与数据处理", 66, 8, { featured: true, x: 69, y: 83 }]],
    },
  ],
  chinese: [
    {
      id: "chinese-modern",
      name: "现代文阅读",
      skills: [
        ["reading", "现代文阅读通法", 62, 8, { featured: true, x: 16, y: 84 }],
        ["information-reading", "信息类文本阅读", 58, 9],
        ["literary-reading", "文学类文本阅读", 55, 9],
        ["argument-reading", "论证结构与材料分析", 60, 8],
      ],
    },
    {
      id: "chinese-classical",
      name: "古诗文阅读",
      skills: [
        ["classical", "文言实词、虚词与翻译", 71, 8, { featured: true, x: 37, y: 89 }],
        ["classical-culture", "文言断句与文化常识", 63, 7],
        ["poetry", "古代诗歌鉴赏", 57, 9],
        ["famous-lines", "名篇名句默写", 69, 6],
      ],
    },
    {
      id: "chinese-language",
      name: "语言文字运用",
      skills: [
        ["language-use", "词语、成语与语病", 61, 8],
        ["rhetoric", "修辞与表达效果", 66, 7],
        ["sentence", "压缩、补写与句式变换", 56, 8],
        ["continuation", "图文转换与情境表达", 64, 7],
      ],
    },
    {
      id: "chinese-writing",
      name: "写作与整本书",
      skills: [
        ["composition", "作文审题与结构", 57, 10, { featured: true, x: 52, y: 91 }],
        ["practical-writing", "应用文与微写作", 68, 6],
        ["whole-book", "整本书阅读", 65, 6],
      ],
    },
  ],
  english: [
    {
      id: "english-foundation",
      name: "词汇与构词",
      skills: [
        ["vocabulary", "高频词汇与词块", 69, 8, { featured: true, x: 81, y: 88 }],
        ["wordformation", "词性转换与构词法", 58, 8],
      ],
    },
    {
      id: "english-grammar",
      name: "语法体系",
      skills: [
        ["grammar", "语法填空综合", 55, 9, { featured: true, x: 94, y: 50 }],
        ["tense", "时态、语态与主谓一致", 60, 8],
        ["nonfinite", "非谓语动词", 51, 9],
        ["clauses", "三大从句与特殊句式", 53, 9],
      ],
    },
    {
      id: "english-reading",
      name: "完形与阅读",
      skills: [
        ["cloze", "完形填空", 59, 8],
        ["english-reading", "阅读理解", 63, 9, { featured: true, x: 91, y: 15 }],
        ["seven-five", "七选五", 57, 8],
        ["thematic-reading", "主题语境与长难句", 55, 8],
      ],
    },
    {
      id: "english-writing",
      name: "写作与听力",
      skills: [
        ["writing", "应用文写作", 61, 8],
        ["continuation-writing", "读后续写", 54, 9],
        ["translation", "句子翻译与表达升级", 58, 7],
        ["listening", "听力情境与信息定位", 64, 7],
      ],
    },
  ],
};

export const CURRICULUM = Object.fromEntries(
  Object.entries(SUBJECT_CURRICULUM).map(([subject, chapters]) => [
    subject,
    chapters.map((chapter) => ({
      id: chapter.id,
      name: chapter.name,
      skills: chapter.skills.map(([id, name, mastery, priority, visual = {}]) => ({
        id,
        name,
        mastery,
        priority,
        subject,
        chapterId: chapter.id,
        chapterName: chapter.name,
        ...visual,
      })),
    })),
  ]),
);

export const CURRICULUM_SKILLS = Object.values(CURRICULUM)
  .flatMap((chapters) => chapters)
  .flatMap((chapter) => chapter.skills);

export function getCurriculumStats(questionBank = []) {
  const questionCounts = questionBank.reduce((counts, question) => {
    counts[question.skill] = (counts[question.skill] || 0) + 1;
    return counts;
  }, {});
  return Object.fromEntries(
    Object.entries(CURRICULUM).map(([subject, chapters]) => {
      const skills = chapters.flatMap((chapter) => chapter.skills);
      return [subject, {
        chapters: chapters.length,
        skills: skills.length,
        questions: skills.reduce((sum, skill) => sum + (questionCounts[skill.id] || 0), 0),
        readySkills: skills.filter((skill) => questionCounts[skill.id]).length,
      }];
    }),
  );
}
