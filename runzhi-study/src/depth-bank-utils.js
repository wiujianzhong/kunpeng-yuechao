const SUBJECT_POINTS = { math: 5, physics: 6, chinese: 5, english: 5 };

const DIMENSION_HINTS = {
  application: ["先圈出题目给出的量和最终所求。", "选择只含这些量的规则或关系式。", "算完后代回题意检查范围、单位或语境。"],
  reasoning: ["先写出结论成立需要满足的条件。", "把题干信息沿着因果关系逐步连接。", "最后检查有没有偷换对象或漏掉隐含条件。"],
  transfer: ["先找它与熟悉题型不变的核心结构。", "再判断新情境改变了哪个条件。", "用结果反推题干，确认迁移没有越过适用范围。"],
  pitfall: ["不要急着计算，先比较四个选项的差异。", "找出最容易被忽略的限定词或符号。", "用定义或反例逐项排除。"],
};

export function makeDepthSet(config) {
  return config.cases.map((item, index) => ({
    id: `DP-${config.code}-${String(index + 1).padStart(2, "0")}`,
    subject: config.subject,
    skill: config.skill,
    title: item.title,
    stem: item.stem,
    type: "choice",
    options: item.options,
    answer: item.answer,
    difficulty: item.difficulty || (item.dimension === "pitfall" ? 2 : 3),
    dimension: item.dimension,
    points: SUBJECT_POINTS[config.subject],
    estimatedSeconds: item.estimatedSeconds || 110,
    hints: item.hints || DIMENSION_HINTS[item.dimension] || DIMENSION_HINTS.reasoning,
    explanation: {
      idea: item.idea || config.idea,
      steps: item.steps,
      trap: item.trap || config.trap,
    },
    errorByChoice: item.errorByChoice,
    sourceType: "review-depth",
  }));
}
