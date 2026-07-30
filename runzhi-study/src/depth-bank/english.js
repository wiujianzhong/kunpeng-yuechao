import { makeDepthSet } from "../depth-bank-utils.js";

export const ENGLISH_DEPTH_QUESTIONS = [
  ...makeDepthSet({
    code: "E-WFORM", subject: "english", skill: "wordformation",
    idea: "先由句子位置判断所需词性，再根据主谓、单复数和修饰关系变形。",
    trap: "不要只看中文意思；冠词后、系动词后和动词后需要的词性不同。",
    cases: [
      { dimension: "application", title: "名词形式", stem: "The rapid ___ of technology has changed the way we learn. (develop)", options: ["develop", "develops", "development", "developmental"], answer: 2, steps: ["空前有定冠词 The 和形容词 rapid。", "该位置需要名词作主语中心词。", "develop 的名词形式是 development。"] },
      { dimension: "reasoning", title: "副词修饰动词", stem: "The volunteers responded ___ when the child asked for help. (quick)", options: ["quick", "quickly", "quicken", "quickness"], answer: 1, steps: ["空格修饰动词 responded。", "修饰动词通常使用副词。", "quick 的副词形式是 quickly。"] },
      { dimension: "pitfall", title: "系动词后的形容词", stem: "This method is especially ___ for beginners. (use)", options: ["use", "useful", "usefully", "usefulness"], answer: 1, steps: ["is 是系动词。", "空格作表语，并受 especially 修饰。", "应使用形容词 useful。"] },
    ],
  }),
  ...makeDepthSet({
    code: "E-GRAM", subject: "english", skill: "grammar",
    idea: "综合语法先找谓语和时间线，再判断主动、被动或非谓语形式。",
    trap: "同一句中已有谓语时，另一个动词往往要使用非谓语形式。",
    cases: [
      { dimension: "reasoning", title: "过去进行时", stem: "When I arrived at the lab, the students ___ an experiment.", options: ["do", "were doing", "have done", "will do"], answer: 1, steps: ["arrived 表示过去某一时刻到达。", "实验在那个时刻正在进行。", "过去某时正在发生用过去进行时 were doing。"] },
      { dimension: "pitfall", title: "过去分词作定语", stem: "The book ___ last year has become popular among teenagers.", options: ["publish", "published", "publishing", "publishes"], answer: 1, steps: ["主句谓语是 has become。", "空格处修饰 The book，不能再用完整谓语。", "书与 publish 是被动关系，用过去分词 published。"] },
    ],
  }),
  ...makeDepthSet({
    code: "E-CLOZE", subject: "english", skill: "cloze",
    idea: "完形填空同时核对词义、固定搭配、上下文逻辑和人物情感变化。",
    trap: "某个选项单独看语法正确，不代表放进整段后语意连贯。",
    cases: [
      { dimension: "application", title: "因果语境", stem: "It began to rain heavily, so we decided to ___ the outdoor activity until Friday.", options: ["postpone", "celebrate", "describe", "discover"], answer: 0, steps: ["大雨会影响户外活动。", "until Friday 表示活动改到周五。", "postpone 意为“推迟”，符合因果和搭配。"] },
      { dimension: "reasoning", title: "人物情感转折", stem: "Leo was disappointed by the result. ___, he thanked his teammates and promised to try again.", options: ["However", "Therefore", "Besides", "Instead of"], answer: 0, steps: ["前句是失望，后句却积极感谢并决定再试。", "前后存在转折关系。", "However 最能准确连接两个句子。"] },
      { dimension: "pitfall", title: "动词搭配", stem: "The teacher encouraged us to ___ attention to the reasons behind each mistake.", options: ["pay", "take", "make", "bring"], answer: 0, steps: ["句意是关注每个错误背后的原因。", "固定搭配为 pay attention to。", "其他动词不能与 attention 构成该搭配。"] },
    ],
  }),
  ...makeDepthSet({
    code: "E-SEVEN", subject: "english", skill: "seven-five",
    idea: "七选五要同时检查逻辑连接、代词指代和关键词复现。",
    trap: "只因选项出现相同单词就选择，可能忽略上下句真正的逻辑关系。",
    cases: [
      { dimension: "application", title: "建议关系衔接", stem: "You may have trouble remembering new words. ___. Reviewing them in short sentences can make them easier to recall.", options: ["Try using them in context", "Stop reading at once", "Words never need review", "Grammar is always useless"], answer: 0, steps: ["前句提出记忆单词困难。", "后句进一步说明在短句中复习。", "A 提出“在语境中使用”的建议，衔接最紧密。"] },
      { dimension: "reasoning", title: "代词指代衔接", stem: "Set one clear goal before each study session. ___. It will also help you decide what to review next.", options: ["This gives your work a direction", "They were built last year", "Those books are expensive", "He never made a plan"], answer: 0, steps: ["后句主语 It 需要明确的单数指代对象。", "A 中 This 指代前句“设定明确目标”这件事。", "“给学习方向”也与决定下一步复习内容逻辑一致。"] },
      { dimension: "pitfall", title: "转折关系衔接", stem: "Many students think a long study session is always better. ___. Short, focused sessions with breaks may be more effective.", options: ["That is not necessarily true", "For example, never take a break", "As a result, time does not matter", "In addition, sleep should be avoided"], answer: 0, steps: ["前句提出一种常见看法。", "后句给出与之不同的观点。", "A 用否定缓和地转折，并自然引出后句。"] },
    ],
  }),
  ...makeDepthSet({
    code: "E-THEME", subject: "english", skill: "thematic-reading",
    idea: "长难句先去掉修饰成分找主干，再把从句和代词逐层接回。",
    trap: "离主语最近的动词不一定是主句谓语，它可能属于从句。",
    cases: [
      { dimension: "application", title: "主句谓语定位", stem: "In “The plan that the team discussed yesterday will reduce waste,” the main predicate is ___.", options: ["discussed", "will reduce", "waste", "yesterday"], answer: 1, steps: ["主句主语中心词是 The plan。", "that the team discussed yesterday 是定语从句。", "去掉从句后为 The plan will reduce waste，主句谓语是 will reduce。"] },
      { dimension: "reasoning", title: "代词指代", stem: "Mia placed the glass bottle in a cloth bag because it was easy to break. Here “it” refers to ___.", options: ["Mia", "the glass bottle", "the cloth bag", "the action of placing"], answer: 1, steps: ["it 指代单数事物。", "easy to break 描述“易碎”的性质。", "玻璃瓶易碎，所以 it 指 the glass bottle。"] },
      { dimension: "pitfall", title: "让步从句主干", stem: "In “Although the task seemed difficult, every student completed it on time,” the main clause is ___.", options: ["Although the task seemed difficult", "the task seemed difficult", "every student completed it on time", "on time"], answer: 2, steps: ["Although 引导让步状语从句。", "逗号后的部分不依赖从属连词，结构完整。", "主句是 every student completed it on time。"] },
    ],
  }),
  ...makeDepthSet({
    code: "E-WRITE", subject: "english", skill: "writing",
    idea: "英语应用文先明确对象和目的，再用礼貌、清楚、可执行的句子传达信息。",
    trap: "礼貌不等于含糊，时间、地点、请求内容等关键信息仍要完整。",
    cases: [
      { dimension: "application", title: "礼貌请求", stem: "Which sentence is most suitable for asking a classmate to share notes?", options: ["Give me your notes now.", "Could you please share your notes from today's class with me?", "Your notes are mine.", "You must help me."], answer: 1, steps: ["写作对象是同学，请求应清楚且有礼貌。", "Could you please 构成礼貌请求。", "B 还明确说明需要今天课堂的笔记。"] },
      { dimension: "reasoning", title: "活动通知信息", stem: "Which notice gives the clearest information?", options: ["A meeting is coming. Be there.", "The English Club meeting will be held in Room 201 at 4 p.m. on Friday.", "Friday is important for everyone.", "Come to some room after class."], answer: 1, steps: ["通知需要活动、时间和地点。", "B 给出 English Club meeting、Room 201、Friday 4 p.m.。", "其他选项都有关键内容缺失或表述含糊。"] },
      { dimension: "pitfall", title: "邮件结尾语气", stem: "Which ending is most appropriate in an email thanking a teacher?", options: ["Thanks for your patient guidance. Best wishes, Li Hua", "Reply immediately. Li Hua", "That's all. Whatever.", "You should do more next time."], answer: 0, steps: ["感谢信结尾应再次表达感谢。", "Best wishes 是得体的结束语。", "A 的语气礼貌，署名位置也清楚。"] },
    ],
  }),
  ...makeDepthSet({
    code: "E-CWRITE", subject: "english", skill: "continuation-writing",
    idea: "续写要保持人物目标、情节因果、情感变化和时态人称一致。",
    trap: "突然加入无关人物或奇迹转折，会破坏原文已经建立的因果链。",
    cases: [
      { dimension: "application", title: "情节连贯", stem: "Tom finds an injured bird and wants to help it. Which next event is most coherent?", options: ["He puts it in a box and calls a wildlife rescue center.", "The story suddenly moves to a football match on Mars.", "He forgets the bird and buys a cake.", "A stranger wins a race in another city."], answer: 0, steps: ["人物目标是帮助受伤的小鸟。", "装入安全盒子并联系救助中心直接回应困境。", "其余事件与目标和情节没有因果联系。"] },
      { dimension: "reasoning", title: "用动作表现情感", stem: "Which sentence best shows that Anna is nervous without directly saying “she was nervous”?", options: ["Anna was a student.", "Anna checked the clock again and again, rubbing her cold hands together.", "The room had two windows.", "Anna liked blue."], answer: 1, steps: ["题目要求用可观察的动作表现紧张。", "反复看钟和搓冰冷的手都是紧张时可能出现的细节。", "B 通过动作侧面呈现情绪。"] },
      { dimension: "pitfall", title: "时态一致", stem: "The original story is told in the simple past. Which continuation keeps the tense consistent?", options: ["Lucy opens the door and smiles.", "Lucy opened the door and smiled.", "Lucy will open the door and smiles.", "Lucy opening the door and smile."], answer: 1, steps: ["原文使用一般过去时。", "续写的连续动作也应使用过去式。", "opened 和 smiled 在时态及结构上都一致。"] },
    ],
  }),
  ...makeDepthSet({
    code: "E-TRANS", subject: "english", skill: "translation",
    idea: "翻译先抓句子逻辑和核心搭配，再按英语语序表达完整意思。",
    trap: "逐字直译容易造成搭配错误；尤其注意动词后接不定式还是动名词。",
    cases: [
      { dimension: "application", title: "计划表达", stem: "“我们计划每天复习二十个单词。”最准确的英文是（　）", options: ["We plan review twenty words every day.", "We plan to review twenty words every day.", "We planning to review twenty word everyday.", "We plan reviewed twenty words every day."], answer: 1, steps: ["plan to do 表示“计划做某事”。", "twenty 后的可数名词用复数 words。", "every day 作时间状语，B 结构完整。"] },
      { dimension: "reasoning", title: "让步逻辑表达", stem: "“虽然任务很难，但她没有放弃。”最准确的英文是（　）", options: ["Although the task was difficult, she did not give up.", "Because the task was difficult, but she gave up.", "Although the task difficult, so she did not give up.", "The task was difficult, because she not give up."], answer: 0, steps: ["“虽然……但……”表达让步关系。", "英语中 although 引导从句后通常不再与 but 连用。", "A 的时态、谓语和逻辑都正确。"] },
      { dimension: "pitfall", title: "avoid 的搭配", stem: "“检查单位能帮助我们避免犯低级错误。”最准确的英文是（　）", options: ["Checking units can help us avoid making careless mistakes.", "Check units help us avoid to make mistakes.", "Checking units can help us avoiding make mistakes.", "Units avoid us to make careless mistakes."], answer: 0, steps: ["动名词短语 Checking units 可作主语。", "help us avoid 表示“帮助我们避免”。", "avoid 后接动名词 making，A 搭配正确。"] },
    ],
  }),
  ...makeDepthSet({
    code: "E-LISTEN", subject: "english", skill: "listening",
    idea: "听力先锁定问题问什么，再关注修正后的最终时间、地点和意图。",
    trap: "对话开头出现的信息常被后文修改，最终决定才是答案。",
    cases: [
      { dimension: "application", title: "最终时间", stem: "Man: Let's meet at 9:00. Woman: I have a class then. Could we make it 10:30? Man: Sure. When will they meet?", options: ["At 9:00.", "At 9:30.", "At 10:00.", "At 10:30."], answer: 3, steps: ["男士最初提出 9:00。", "女士因有课改为 10:30。", "男士同意，因此最终时间是 10:30。"] },
      { dimension: "reasoning", title: "说话意图", stem: "Woman: The bus is usually on time, but it hasn't come yet. Man: Let's take the subway, or we'll miss the train. What does the man suggest?", options: ["Waiting for the bus", "Taking the subway", "Missing the train", "Walking home"], answer: 1, steps: ["公交车尚未到，继续等可能误火车。", "男士明确说 Let's take the subway。", "他的建议是乘地铁。"] },
      { dimension: "pitfall", title: "地点推断", stem: "Woman: I'd like to return this book. Man: Please put it here and show me your library card. Where are the speakers probably?", options: ["At a library.", "At a restaurant.", "At a hospital.", "At a station."], answer: 0, steps: ["对话出现 return this book。", "还要求出示 library card。", "这些信息共同指向图书馆。"] },
    ],
  }),
];
