const SUBJECT_NAMES = {
  math: "数学",
  physics: "物理",
  chemistry: "化学",
  biology: "生物",
  chinese: "语文",
  english: "英语",
};

const MATH_PDF_PATHS = {
  2017: "普通高考/2017/2017山东理.pdf",
  2018: "普通高考/2018/2018全国1理(河南,河北,山西,江西,湖北,湖南,广东,安徽,福建,山东).pdf",
  2019: "普通高考/2019/2019全国1理(河南,河北,山西,江西,湖北,湖南,广东,安徽,福建,山东).pdf",
  2020: "普通高考/2020/2020新高考1(山东).pdf",
  2021: "普通高考/2021/2021新高考1(山东,广东,湖南,湖北,河北,江苏,福建).pdf",
  2022: "普通高考/2022/2022新高考1(山东,广东,湖南,湖北,河北,江苏,福建).pdf",
  2023: "普通高考/2023/2023新高考1(山东,广东,湖南,湖北,河北,江苏,福建,浙江).pdf",
  2024: "普通高考/2024/2024新高考1(山东,广东,湖南,湖北,河北,江苏,福建,浙江,河南,江西,安徽).pdf",
  2025: "普通高考/2025/2025全国1(山东,广东,湖南,湖北,河北,江苏,福建,浙江,河南,江西,安徽).pdf",
  2026: "普通高考/2026/2026全国1(山东,广东,湖南,湖北,河北,江苏,福建,浙江,河南,江西,安徽).pdf",
};

function githubRawUrl(path) {
  return `https://raw.githubusercontent.com/deekur/gaokaomath/main/${path.split("/").map(encodeURIComponent).join("/")}`;
}

function trustedSearchUrl(query) {
  return `https://cn.bing.com/search?q=${encodeURIComponent(query)}`;
}

function paperScheme(year, subject) {
  if (year === 2017 && ["chinese", "math"].includes(subject)) return "山东卷";
  if (subject === "physics") return year >= 2020 ? "山东省等级考" : "全国Ⅰ卷理综·物理";
  if (subject === "chemistry") return year >= 2020 ? "山东省等级考" : "全国Ⅰ卷理综·化学";
  if (subject === "biology") return year >= 2020 ? "山东省等级考" : "全国Ⅰ卷理综·生物";
  return year >= 2020 ? (year >= 2025 ? "全国Ⅰ卷" : "新高考Ⅰ卷") : "全国Ⅰ卷";
}

function paperLink(year, subject) {
  if (subject === "math") return githubRawUrl(MATH_PDF_PATHS[year]);
  const scheme = paperScheme(year, subject);
  const domain = ["physics", "chemistry", "biology"].includes(subject) && year >= 2020 ? "sdzk.cn" : "gaokao.eol.cn";
  return trustedSearchUrl(`site:${domain} ${year} ${scheme} ${SUBJECT_NAMES[subject]} 高考 真题 答案`);
}

function officialReviewUrl(year) {
  if (year <= 2021) return "https://gaokao.neea.edu.cn/xhtml1/folder/1510/811-1.htm";
  return trustedSearchUrl(`site:moe.gov.cn OR site:neea.edu.cn ${year} 高考 试题评析 语文 数学 英语 物理 化学 生物`);
}

export const GAOKAO_YEARS = Array.from({ length: 10 }, (_, index) => 2026 - index).map((year) => ({
  year,
  scheme: year >= 2020 ? (year >= 2025 ? "全国Ⅰ卷＋山东等级考" : "新高考Ⅰ卷＋山东等级考") : year === 2017 ? "山东语数＋全国Ⅰ卷英理综" : "全国Ⅰ卷",
  note: year >= 2020 ? "语数英按Ⅰ卷，物理、化学、生物按山东省等级考核对" : year === 2017 ? "语文、数学为山东卷；英语与理综物化生为全国Ⅰ卷" : "语数英与理综物化生按全国Ⅰ卷核对",
  officialReviewUrl: officialReviewUrl(year),
  papers: Object.keys(SUBJECT_NAMES).map((subject) => ({
    subject,
    name: SUBJECT_NAMES[subject],
    scheme: paperScheme(year, subject),
    url: paperLink(year, subject),
    source: subject === "math" ? "开源原卷 PDF" : ["physics", "chemistry", "biology"].includes(subject) && year >= 2020 ? "山东考试院检索" : "中国教育在线检索",
  })),
}));

export const GAOKAO_MOCK_PRESETS = [
  {
    id: "mixed-short",
    title: "六科诊断小卷",
    subject: null,
    size: 8,
    durationMinutes: 25,
    description: "六科各有覆盖，优先抽取掌握度较低的知识点做快速诊断。",
  },
  {
    id: "math-rhythm",
    title: "数学高考节奏卷",
    subject: "math",
    size: 19,
    durationMinutes: 120,
    description: "按高考整卷时间训练取舍与节奏，系统优先抽薄弱考点。",
  },
  {
    id: "physics-rhythm",
    title: "物理等级考节奏卷",
    subject: "physics",
    size: 15,
    durationMinutes: 90,
    description: "覆盖力、电、磁、实验与近代物理，训练模型识别。",
  },
  {
    id: "chemistry-rhythm",
    title: "化学等级考节奏卷",
    subject: "chemistry",
    size: 15,
    durationMinutes: 90,
    description: "覆盖计量、元素、反应原理、有机和实验，训练守恒与条件判断。",
  },
  {
    id: "biology-rhythm",
    title: "生物等级考节奏卷",
    subject: "biology",
    size: 15,
    durationMinutes: 90,
    description: "覆盖细胞、遗传、调节、生态和生物技术，训练因果链与实验分析。",
  },
  {
    id: "chinese-objective",
    title: "语文客观题模拟",
    subject: "chinese",
    size: 20,
    durationMinutes: 60,
    description: "集中训练阅读证据、语用和古诗文判断；作文需线下完成。",
  },
  {
    id: "english-objective",
    title: "英语客观题模拟",
    subject: "english",
    size: 20,
    durationMinutes: 60,
    description: "集中训练语法、词汇、完形和阅读判断；写作需线下完成。",
  },
];

export const GAOKAO_SOURCES = [
  {
    name: "教育部教育考试院 · 高考试题评析",
    role: "官方命题方向",
    url: "https://gaokao.neea.edu.cn/xhtml1/folder/1510/811-1.htm",
  },
  {
    name: "GAOKAO-Bench",
    role: "2010—2022 开源题目数据",
    url: "https://github.com/OpenLMLab/GAOKAO-Bench",
  },
  {
    name: "GAOKAO-Bench-Updates",
    role: "2023—2024 客观题补充",
    url: "https://github.com/OpenLMLab/GAOKAO-Bench-Updates",
  },
  {
    name: "历年高考数学真题",
    role: "1952—2026 数学原卷 PDF",
    url: "https://github.com/deekur/gaokaomath",
  },
  {
    name: "山东省教育招生考试院",
    role: "山东等级考原题与逐题分析",
    url: "https://www.sdzk.cn/",
  },
];

export const GAOKAO_TEACHING_TEAM = [
  {
    subject: "math",
    name: "一数",
    role: "数学模型与题型体系",
    method: "先认模型，再写第一步，最后做同类变式。",
    url: "https://www.bilibili.com/list/14229967?bvid=BV1L142187QT&oid=1556314244",
  },
  {
    subject: "physics",
    name: "李永乐老师",
    role: "物理图景与推导",
    method: "先画过程图和受力图，再把图翻译成方程。",
    url: "https://www.bilibili.com/list/9458053?bvid=BV1Lz42197T1&oid=1351342373",
  },
  {
    subject: "chemistry",
    name: "Daniel 高考化学",
    role: "化学知识体系与反应条件",
    method: "先做物质分类和价态表，再用守恒、条件、现象三步锁定反应。",
    url: "https://www.bilibili.com/video/BV1CFMQzXEyP/",
  },
  {
    subject: "biology",
    name: "金晶生物",
    role: "生物概念网络与一轮复习",
    method: "先画结构—功能—过程图，再用教材原话和实验变量完成表达。",
    url: "https://www.bilibili.com/video/BV1Cz4y1379F/",
  },
  {
    subject: "chinese",
    name: "戴建业老师＋官方评析",
    role: "诗词情境与规范答题",
    method: "先理解人物与情境，再用证据—手法—情感组织答案。",
    url: "https://www.bilibili.com/list/532741557?bvid=BV1z3ByYdEHt&oid=113530129095598",
  },
  {
    subject: "english",
    name: "英语兔",
    role: "语法结构与长难句",
    method: "先找句子主干，再拆修饰，最后回原文找证据。",
    url: "https://yingyutu.com/",
  },
];
