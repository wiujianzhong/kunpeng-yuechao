import {
  MICRO_LESSONS,
  QUESTIONS,
  SKILLS,
  SUBJECTS,
  VIDEO_RESOURCES,
  getLesson,
  getQuestion,
  getSkill,
} from "./data.js?v=20260731-video2";
import { CURRICULUM, getCurriculumStats } from "./curriculum.js";
import { DIMENSION_LABELS } from "./learning-guides.js";
import { celebrateSuccess, initPlayfulUI, refreshPlayfulUI } from "./playful-ui.js";
import {
  STORAGE_KEY,
  addExamResult,
  buildDailyMissions,
  completeMission,
  createInitialState,
  daysUntil,
  generateExam,
  getDueReviews,
  getSubjectSummary,
  getWeakSkills,
  getWeeklyReport,
  hydrateState,
  recordAttempt,
  resetState,
  scoreExam,
  selectPracticeQuestions,
  toDateKey,
} from "./engine.js";

const main = document.querySelector("#main-content");
const countdown = document.querySelector("#countdown-days");
const wrongCountBadge = document.querySelector("#nav-wrong-count");
const tutorDrawer = document.querySelector("#tutor-drawer");
const tutorBackdrop = document.querySelector("#drawer-backdrop");
const tutorMessagesElement = document.querySelector("#tutor-messages");
const tutorQuestion = document.querySelector("#tutor-question");
const tutorStatus = document.querySelector("#tutor-status");

let state = loadState();
let route = "home";
let routeContext = {};
let practiceSession = null;
let examSession = null;
let examTimer = null;
let lessonSession = null;
let lessonTimer = null;
let toastTimer = null;
let tutorMessages = [
  {
    role: "ai",
    text: "你好，我是星星老师。不会的题、卡住的一步，甚至“我完全没看懂”都可以直接告诉我。我会先找出你卡在哪里，再给最小的一步提示。",
  },
];
const curriculumStats = getCurriculumStats(QUESTIONS);
const questionCountBySkill = QUESTIONS.reduce((counts, question) => {
  counts[question.skill] = (counts[question.skill] || 0) + 1;
  return counts;
}, {});

initPlayfulUI();
bootstrap();

function bootstrap() {
  updateCountdown();
  updateBadges();
  bindStaticEvents();
  const hashRoute = window.location.hash.replace("#", "");
  navigate(["home", "practice", "wrongbook", "exam", "report", "lesson", "knowledge", "videos"].includes(hashRoute) ? hashRoute : "home", {}, false);
  window.setInterval(updateCountdown, 60_000);
}

function bindStaticEvents() {
  document.querySelectorAll("[data-route]").forEach((button) => {
    button.addEventListener("click", () => navigate(button.dataset.route));
  });

  document.querySelector("#focus-toggle").addEventListener("click", (event) => {
    const button = event.currentTarget;
    const enabled = button.getAttribute("aria-pressed") !== "true";
    button.setAttribute("aria-pressed", String(enabled));
    document.body.classList.toggle("focus-mode", enabled);
    showToast(enabled ? "专注模式已开启，周围界面会安静下来" : "已退出专注模式");
  });

  document.querySelector("#open-tutor").addEventListener("click", openTutor);
  document.querySelector("#close-tutor").addEventListener("click", closeTutor);
  tutorBackdrop.addEventListener("click", closeTutor);
  document.querySelector("#tutor-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const text = tutorQuestion.value.trim();
    if (!text) return;
    tutorQuestion.value = "";
    await askTutor("custom", text);
  });
  document.querySelector("#tutor-quick-actions").addEventListener("click", async (event) => {
    const button = event.target.closest("[data-tutor-action]");
    if (!button) return;
    await askTutor(button.dataset.tutorAction);
  });

  main.addEventListener("click", handleMainClick);
  main.addEventListener("input", handleMainInput);
  window.addEventListener("hashchange", () => {
    const next = window.location.hash.replace("#", "") || "home";
    if (next !== route) navigate(next, {}, false);
  });
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && tutorDrawer.classList.contains("open")) closeTutor();
  });
}

function navigate(nextRoute, context = {}, updateHash = true) {
  if (route === "lesson" && nextRoute !== "lesson") stopLessonTimer();
  route = nextRoute;
  routeContext = context;
  if (updateHash) window.history.replaceState(null, "", `#${nextRoute}`);
  document.querySelectorAll(".nav-item[data-route]").forEach((item) => {
    item.classList.toggle("active", item.dataset.route === nextRoute);
  });
  render();
  main.focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
}

function render() {
  const renderers = {
    home: renderHome,
    practice: renderPractice,
    wrongbook: renderWrongBook,
    exam: renderExam,
    report: renderReport,
    lesson: renderLesson,
    knowledge: renderKnowledge,
    videos: renderVideos,
  };
  main.innerHTML = (renderers[route] || renderHome)();
  refreshPlayfulUI(main);
  updateBadges();
}

function renderHome() {
  const missions = buildDailyMissions(state);
  const nextMission = missions.find((mission) => !mission.completed) || missions[0];
  const completedCount = missions.filter((mission) => mission.completed).length;
  const weakest = getWeakSkills(state, 1)[0];
  const averageMastery = Math.round(SKILLS.reduce((sum, skill) => sum + (state.mastery[skill.id] ?? skill.mastery), 0) / SKILLS.length);
  const dueReviews = getDueReviews(state);
  const openWrong = state.wrongBook.filter((item) => !item.resolved);
  const radarItems = buildRadarItems(dueReviews, openWrong);
  const weakestLesson = MICRO_LESSONS.find((lesson) => lesson.skill === weakest.id);
  const currentHour = new Date().getHours();
  const greeting = currentHour < 11 ? "早上好" : currentHour < 18 ? "下午好" : "晚上好";

  return `
    <div class="page home-page">
      <div class="page-heading">
        <div class="welcome-copy">
          <span class="eyebrow">今日小冒险</span>
          <h1>${greeting}，${state.profile.name || "伍润芝"}！今天也从一个小目标开始。</h1>
          <p>${state.onboardingCompleted ? "我已经根据你的真实答题记录，重新排好了今天的学习路线。" : "先做几道轻量小题，我会慢慢读懂你的强项和薄弱点。"}</p>
        </div>
        <div class="status-cluster">
          <span class="status-pill">🔥 连续 <strong>${state.stats.streak}</strong> 天</span>
          <span class="status-pill">⭐ 星星 <strong>${state.stats.xp}</strong></span>
          <span class="status-pill">📒 待复盘 <strong>${openWrong.length}</strong> 道</span>
        </div>
      </div>

      <div class="home-grid">
        <section class="panel mission-panel" aria-labelledby="today-mission-title">
          <div class="mission-topline">
            <span class="mission-kicker"><i></i> 今日必闯 · ${subjectName(nextMission.subject)}</span>
            <span class="mission-progress-copy">${completedCount} / ${missions.length} 已完成</span>
          </div>
          <h2 class="mission-title" id="today-mission-title">今天先解锁 <em>${weakest.name}</em></h2>
          <p class="mission-subtitle">这个考点当前约 ${weakest.mastery}%。只做 3 道递进题，不会就看一小步提示，做完就收获今天的第一颗星。</p>
          <div class="mission-actions">
            <button class="primary-button" type="button" data-mission-id="${nextMission.id}">去闯这一关 <span class="button-icon">→</span></button>
            ${weakestLesson
              ? `<button class="secondary-button" type="button" data-lesson-id="${weakestLesson.id}">先看动画讲解</button>`
              : `<button class="secondary-button" type="button" data-open-tutor>让星星老师先帮忙</button>`}
          </div>
          ${renderStudyMascot(completedCount)}
          <div class="mission-mini-stats" aria-label="今日任务信息">
            <span>预计用时<strong>${missions.filter((item) => !item.completed).reduce((sum, item) => sum + item.minutes, 0)} 分钟</strong></span>
            <span>薄弱点<strong>${weakest.mastery}%</strong></span>
            <span>今日可得<strong>${missions.filter((item) => !item.completed).reduce((sum, item) => sum + item.xp, 0)} XP</strong></span>
          </div>
        </section>

        <aside class="panel radar-panel" aria-labelledby="radar-title">
          <div class="panel-heading">
            <div><h2 id="radar-title">记忆小花园</h2><p>到时间的题，会开花提醒你</p></div>
            <button class="panel-link" type="button" data-route-action="wrongbook">查看全部</button>
          </div>
          <div class="radar-visual" aria-label="${dueReviews.length} 道题已经到复习时间">
            <div class="radar-cross"></div><div class="radar-sweep"></div>
            <i class="radar-dot one"></i><i class="radar-dot two"></i><i class="radar-dot three"></i>
            <div class="radar-center"><strong>${dueReviews.length}</strong><span>已到期</span></div>
          </div>
          <div class="radar-list">${radarItems}</div>
        </aside>

        <section class="panel constellation-panel" aria-labelledby="constellation-title">
          <div class="panel-heading">
            <div><h2 id="constellation-title">高考知识星图</h2><p>展示 16 个高频节点，全库共 ${SKILLS.length} 个知识点</p></div>
            <button class="panel-link" type="button" data-route-action="knowledge">完整知识树</button>
          </div>
          ${renderConstellation(averageMastery)}
        </section>

        <section class="panel mission-list-panel" aria-labelledby="mission-list-title">
          <div class="panel-heading">
            <div><h2 id="mission-list-title">今日冒险地图</h2><p>一关一关来，全部走完就收工</p></div>
            <span class="status-pill"><strong>${completedCount}</strong> / ${missions.length}</span>
          </div>
          <div class="mission-list">
            ${missions.map((mission, index) => `
              <button class="mission-item ${mission.completed ? "done" : ""}" type="button" data-mission-id="${mission.id}">
                <span class="mission-index">小关卡 ${index + 1}</span>
                <strong>${mission.title}</strong>
                <small>${mission.subtitle}</small>
                <span class="mission-meta"><b>${mission.minutes} MIN</b><b>+${mission.xp} XP</b></span>
              </button>
            `).join("")}
          </div>
        </section>

        <section class="subjects-section" aria-labelledby="subjects-title">
          <div class="section-heading"><h2 id="subjects-title">四科小岛</h2><p>选一座小岛，从最需要的考点开始</p></div>
          <div class="subjects-grid">
            ${Object.values(SUBJECTS).map(renderSubjectCard).join("")}
          </div>
        </section>

        <section class="panel video-teaser" aria-labelledby="video-teaser-title">
          <div class="video-teaser-illustration" aria-hidden="true"><span>▶</span><i>✦</i><b>♫</b></div>
          <div>
            <span class="eyebrow">严选外部课程</span>
            <h2 id="video-teaser-title">名师视频馆</h2>
            <p>四科官方课程入口已经整理好。先用视频把难点看懂，再回学习岛做题验证，避免“看懂了却不会做”。</p>
          </div>
          <button class="primary-button" type="button" data-route-action="videos">打开视频馆 <span class="button-icon">→</span></button>
        </section>
      </div>
    </div>
  `;
}

function renderStudyMascot(completedCount) {
  const speech = completedCount >= 4 ? "今天全部点亮啦！" : completedCount ? "又收获一颗星！" : "我陪你，只闯一关～";
  return `
    <div class="study-mascot" aria-hidden="true">
      <span class="mascot-speech">${speech}</span>
      <svg viewBox="0 0 240 230" role="presentation">
        <ellipse class="mascot-shadow" cx="122" cy="207" rx="71" ry="13"></ellipse>
        <path class="mascot-ray ray-one" d="M35 71l-14-8m177-6 14-11M78 22l-5-17m95 27 8-15"></path>
        <path class="mascot-body" d="M120 27l25 49 54 8-39 39 9 55-49-26-49 26 9-55-39-39 54-8z"></path>
        <circle class="mascot-cheek" cx="83" cy="116" r="10"></circle>
        <circle class="mascot-cheek" cx="157" cy="116" r="10"></circle>
        <g class="mascot-eyes">
          <ellipse class="mascot-eye" cx="96" cy="104" rx="6" ry="9"></ellipse>
          <ellipse class="mascot-eye" cx="144" cy="104" rx="6" ry="9"></ellipse>
          <circle class="mascot-eye-dot" cx="98" cy="101" r="2"></circle>
          <circle class="mascot-eye-dot" cx="146" cy="101" r="2"></circle>
        </g>
        <path class="mascot-mouth" d="M111 121q9 10 18 0"></path>
        <path class="mascot-arm" d="M74 139q-17 8-23 25m115-25q17 8 23 25"></path>
        <g class="mascot-book">
          <path d="M81 142q20-8 39 4v40q-20-11-39-3z"></path>
          <path d="M159 142q-20-8-39 4v40q20-11 39-3z"></path>
          <path class="book-line" d="M120 146v40"></path>
          <path class="book-star" d="M99 158l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"></path>
        </g>
      </svg>
    </div>
  `;
}

function renderConstellation(averageMastery) {
  const pairs = [
    ["derivative", "analytic"], ["analytic", "sequence"], ["sequence", "probability"],
    ["probability", "trigonometry"], ["trigonometry", "geometry3d"], ["geometry3d", "derivative"],
    ["mechanics", "derivative"], ["electricity", "analytic"], ["magnetism", "probability"],
    ["experiment", "trigonometry"], ["reading", "geometry3d"], ["composition", "trigonometry"],
    ["grammar", "electricity"], ["english-reading", "analytic"], ["vocabulary", "experiment"],
  ];
  const lines = pairs.map(([fromId, toId]) => {
    const from = getSkill(fromId);
    const to = getSkill(toId);
    return `<line x1="${from.x}%" y1="${from.y}%" x2="${to.x}%" y2="${to.y}%"></line>`;
  }).join("");
  const stars = SKILLS.filter((skill) => skill.featured).map((skill) => {
    const mastery = state.mastery[skill.id] ?? skill.mastery;
    const color = mastery < 55 ? "#ff9f76" : mastery < 75 ? SUBJECTS[skill.subject].color : "#59d6a7";
    return `
      <button class="skill-star" type="button" data-skill-id="${skill.id}" aria-label="${skill.name}，掌握度 ${mastery}%"
        style="left:${skill.x}%;top:${skill.y}%;--mastery:${mastery};--glow:${100 - mastery};--star-color:${color}">
        <span>${skill.name} · ${mastery}%</span>
      </button>
    `;
  }).join("");
  return `
    <div class="constellation-map">
      <svg class="constellation-lines" aria-hidden="true">${lines}</svg>
      <div class="star-core"><span><strong>${averageMastery}%</strong>总掌握度</span></div>
      ${stars}
    </div>
  `;
}

function renderSubjectCard(subject) {
  const summary = getSubjectSummary(state, subject.id);
  const stats = curriculumStats[subject.id];
  const accuracy = summary.accuracy === null ? "待诊断" : `${summary.accuracy}% 正确`;
  return `
    <button class="subject-card" type="button" data-subject-id="${subject.id}" data-short="${subject.short}" style="--subject-color:${subject.color}">
      <div class="subject-card-top">
        <div><h3>${subject.name}</h3><p>${subject.description}</p></div>
        <span class="subject-score">${summary.mastery}<small>%</small></span>
      </div>
      <div class="progress-track" style="--progress:${summary.mastery}%;--progress-color:${subject.color}"><i></i></div>
      <div class="subject-card-bottom"><span>${stats.skills} 考点 · ${stats.questions} 题 · ${accuracy}</span><strong>${summary.weakest.name} →</strong></div>
    </button>
  `;
}

function renderKnowledge() {
  const selectedSubject = routeContext.subject && SUBJECTS[routeContext.subject] ? routeContext.subject : "math";
  const subject = SUBJECTS[selectedSubject];
  const stats = curriculumStats[selectedSubject];
  const totalReadySkills = Object.values(curriculumStats).reduce((sum, item) => sum + item.readySkills, 0);

  return `
    <div class="page knowledge-page">
      <div class="page-heading">
        <div>
          <span class="eyebrow">知识森林地图</span>
          <h1>完整知识树</h1>
          <p>四科 ${SKILLS.length} 个核心考点，${QUESTIONS.length} 道本地练习题；有题的考点可直接进入专项练习。</p>
        </div>
        <div class="status-cluster">
          <span class="status-pill">章节 <strong>${Object.values(curriculumStats).reduce((sum, item) => sum + item.chapters, 0)}</strong></span>
          <span class="status-pill">已覆盖 <strong>${totalReadySkills}</strong> 考点</span>
          <span class="status-pill">题库 <strong>${QUESTIONS.length}</strong> 题</span>
        </div>
      </div>

      <div class="knowledge-subjects" aria-label="选择学科">
        ${Object.values(SUBJECTS).map((item) => `
          <button type="button" data-knowledge-subject="${item.id}" class="${selectedSubject === item.id ? "active" : ""}" style="--subject-color:${item.color}">
            <strong>${item.name}</strong><span>${curriculumStats[item.id].skills} 考点 · ${curriculumStats[item.id].questions} 题</span>
          </button>
        `).join("")}
      </div>

      <section class="knowledge-overview" style="--subject-color:${subject.color}">
        <div class="section-heading">
          <div><h2>${subject.name}备考地图</h2><p>${stats.chapters} 个章节 · ${stats.skills} 个核心考点 · ${stats.readySkills} 个考点已有专项题</p></div>
          <button class="ghost-button" type="button" data-subject-id="${selectedSubject}">开始${subject.name}智能练习</button>
        </div>
        <div class="knowledge-chapters">
          ${CURRICULUM[selectedSubject].map((chapter, chapterIndex) => `
            <article class="knowledge-chapter">
              <div class="chapter-heading">
                <span>${String(chapterIndex + 1).padStart(2, "0")}</span>
                <div><h3>${chapter.name}</h3><p>${chapter.skills.length} 个考点</p></div>
              </div>
              <div class="knowledge-skills">
                ${chapter.skills.map((skill) => {
                  const questionCount = questionCountBySkill[skill.id] || 0;
                  const mastery = state.mastery[skill.id] ?? skill.mastery;
                  return `
                    <button class="knowledge-skill ${questionCount ? "ready" : "pending"}" type="button"
                      ${questionCount ? `data-skill-id="${skill.id}"` : "disabled"}
                      title="${questionCount ? `练习 ${skill.name}` : "这个考点的专项题正在扩充"}">
                      <span><i style="--mastery:${mastery}%"></i></span>
                      <strong>${skill.name}</strong>
                      <small>${questionCount ? `${questionCount} 题 · 掌握 ${mastery}%` : "待扩题"}</small>
                    </button>
                  `;
                }).join("")}
              </div>
            </article>
          `).join("")}
        </div>
      </section>
    </div>
  `;
}

function renderVideos() {
  const selectedSubject = routeContext.subject === "all" || SUBJECTS[routeContext.subject] ? routeContext.subject || "all" : "all";
  const resources = VIDEO_RESOURCES.filter((resource) => selectedSubject === "all" || resource.subject === "all" || resource.subject === selectedSubject);
  const subjectFilters = [
    { id: "all", name: "全部", color: "#ff8fb8" },
    ...Object.values(SUBJECTS),
  ];

  return `
    <div class="page videos-page">
      <div class="page-heading">
        <div>
          <span class="eyebrow">先看懂 · 再做会</span>
          <h1>名师视频馆</h1>
          <p>只收录来源明确的官方平台或老师本人课程页。视频负责讲明白，练习负责确认真的会。</p>
        </div>
        <div class="status-cluster">
          <span class="status-pill">四科 <strong>全覆盖</strong></span>
          <span class="status-pill">入口 <strong>${VIDEO_RESOURCES.length}</strong> 个</span>
          <span class="status-pill">已检查 <strong>2026-07-31</strong></span>
        </div>
      </div>

      <section class="video-study-rule" aria-label="视频学习三步法">
        <div><span>1</span><strong>带着问题看</strong><small>先写下卡住的知识点</small></div>
        <i>→</i>
        <div><span>2</span><strong>只看一小节</strong><small>建议一次 15～30 分钟</small></div>
        <i>→</i>
        <div><span>3</span><strong>立刻做题</strong><small>至少完成 4 道专项题</small></div>
      </section>

      <div class="video-subjects" aria-label="筛选视频学科">
        ${subjectFilters.map((item) => `
          <button type="button" data-video-subject="${item.id}" class="${selectedSubject === item.id ? "active" : ""}" style="--subject-color:${item.color}">
            ${item.id === "all" ? "🌈" : item.short} ${item.name}
          </button>
        `).join("")}
      </div>

      <div class="video-library-grid">
        ${resources.map(renderVideoResource).join("")}
      </div>

      <aside class="video-safety-note">
        <span aria-hidden="true">🧭</span>
        <p><strong>伍润芝的视频使用规则：</strong>不追求收藏很多老师，也不连续刷课。一个知识点选一位老师，看完能独立做题才算学会；外部平台内容或入口如有调整，可以回来告诉星星老师。</p>
      </aside>
    </div>
  `;
}

function renderVideoResource(resource) {
  const subject = resource.subject === "all"
    ? { name: "四科综合", color: "#ff8fb8", short: "全" }
    : SUBJECTS[resource.subject];
  return `
    <article class="video-resource-card" style="--subject-color:${subject.color}">
      <div class="video-resource-top">
        <span class="video-resource-icon" aria-hidden="true">${resource.icon}</span>
        <span class="video-resource-tag">${resource.tag}</span>
      </div>
      <span class="video-resource-subject">${subject.short} · ${subject.name}</span>
      <h2>${resource.title}</h2>
      <p class="video-resource-provider">${resource.provider}</p>
      <p class="video-resource-description">${resource.description}</p>
      <div class="video-resource-best">
        ${resource.bestFor.map((item) => `<span>${item}</span>`).join("")}
      </div>
      <div class="video-resource-tip"><strong>怎么学：</strong>${resource.watchTip}</div>
      <div class="video-resource-actions">
        <a class="primary-button" data-video-link="${resource.id}" href="${resource.url}" target="_blank" rel="noopener noreferrer">打开官方课程 ↗</a>
        ${resource.subject === "all"
          ? `<button class="ghost-button" type="button" data-route-action="knowledge">查看知识树</button>`
          : `<button class="ghost-button" type="button" data-subject-id="${resource.subject}">看完做题</button>`}
      </div>
    </article>
  `;
}

function buildRadarItems(dueReviews, openWrong) {
  const source = dueReviews.length
    ? dueReviews.slice(0, 3).map((item) => ({ ...item, label: "现在复习" }))
    : openWrong.slice(0, 3).map((item) => ({ ...item, label: "等待复练" }));
  if (!source.length) {
    return `<div class="radar-item"><span class="subject-token" style="--subject-color:#59d6a7">✓</span><div><strong>雷达目前很干净</strong><small>开始答题后会自动安排复习</small></div><time>READY</time></div>`;
  }
  return source.map((item) => {
    const question = getQuestion(item.questionId);
    const subject = SUBJECTS[question.subject];
    return `
      <div class="radar-item">
        <span class="subject-token" style="--subject-color:${subject.color}">${subject.short}</span>
        <div><strong>${question.title}</strong><small>${getSkill(question.skill).name}</small></div>
        <time>${item.label}</time>
      </div>
    `;
  }).join("");
}

function ensurePracticeSession() {
  if (practiceSession && !routeContext.restart) return;
  const options = {
    subject: routeContext.subject || "all",
    skill: routeContext.skill || null,
    onlyWrong: Boolean(routeContext.onlyWrong),
    questionIds: routeContext.questionIds || null,
    limit: routeContext.limit || 5,
  };
  const selected = selectPracticeQuestions(state, options);
  practiceSession = {
    subject: options.subject,
    skill: options.skill,
    missionId: routeContext.missionId || null,
    items: selected.map((question) => ({
      question,
      answer: null,
      hintsUsed: 0,
      submitted: false,
      result: null,
      startedAt: Date.now(),
    })),
    index: 0,
    completed: false,
  };
  routeContext.restart = false;
}

function renderPractice() {
  ensurePracticeSession();
  const session = practiceSession;
  if (!session.items.length) return renderNoPracticeQuestions();
  if (session.completed) return renderPracticeComplete(session);

  const item = session.items[session.index];
  const question = item.question;
  const subject = SUBJECTS[question.subject];
  const skill = getSkill(question.skill);
  const mastery = state.mastery[question.skill] ?? skill.mastery;
  const answerContent = renderQuestionAnswer(question, item, "practice");

  return `
    <div class="page practice-page">
      <div class="page-heading">
        <div>
          <span class="eyebrow">今日闯关</span>
          <h1>今日练习场</h1>
          <p>不会没关系，先暴露卡点，系统才能给你真正有用的下一题。</p>
        </div>
        <div class="status-cluster"><span class="status-pill">当前考点 <strong>${skill.name}</strong></span><span class="status-pill">掌握度 <strong>${mastery}%</strong></span></div>
      </div>
      <div class="practice-toolbar">
        <div class="subject-tabs" aria-label="选择学科">
          <button type="button" data-practice-subject="all" class="${session.subject === "all" ? "active" : ""}">智能推荐</button>
          ${Object.values(SUBJECTS).map((itemSubject) => `<button type="button" data-practice-subject="${itemSubject.id}" class="${session.subject === itemSubject.id ? "active" : ""}">${itemSubject.name}</button>`).join("")}
        </div>
        <button class="ghost-button" type="button" data-open-tutor>✦ 问 AI 老师</button>
      </div>
      <div class="practice-layout">
        <section class="panel question-panel" aria-labelledby="question-title">
          <div class="question-progress">
            <span>QUESTION ${String(session.index + 1).padStart(2, "0")} / ${String(session.items.length).padStart(2, "0")}</span>
            <div class="progress-track" style="--progress:${((session.index + (item.submitted ? 1 : 0)) / session.items.length) * 100}%;--progress-color:${subject.color}"><i></i></div>
            <span>约 ${Math.ceil(question.estimatedSeconds / 60)} MIN</span>
          </div>
          <div class="question-meta"><span class="question-tag" style="color:${subject.accent};background:color-mix(in srgb, ${subject.color} 9%, transparent)">${subject.name}</span><span class="question-tag">${skill.name}</span><span class="question-tag dimension-tag">🧩 ${DIMENSION_LABELS[question.dimension] || "综合思考"}</span><span class="question-tag">难度 ${"●".repeat(question.difficulty)}${"○".repeat(Math.max(0, 4 - question.difficulty))}</span></div>
          <h2 id="question-title">${question.title}</h2>
          <p class="question-stem">${question.stem}</p>
          ${answerContent}
          ${item.submitted ? renderFeedback(item) : ""}
          <div class="question-actions">
            <div class="question-actions-left">
              <button class="ghost-button" type="button" data-practice-prev ${session.index === 0 ? "disabled" : ""}>← 上一题</button>
              <button class="secondary-button" type="button" data-show-hint ${item.hintsUsed >= question.hints.length || item.submitted ? "disabled" : ""}>提示 ${item.hintsUsed}/${question.hints.length}</button>
            </div>
            <div class="question-actions-right">
              ${item.submitted
                ? `<button class="primary-button" type="button" data-practice-next>${session.index === session.items.length - 1 ? "完成本组" : "下一题"} →</button>`
                : `<button class="primary-button" type="button" data-submit-answer ${item.answer === null ? "disabled" : ""}>检查答案</button>`}
            </div>
          </div>
        </section>
        <aside class="panel coach-panel" aria-label="分步引导">
          <div class="coach-orb">COACH</div>
          <h3>${item.hintsUsed ? "已经打开一条路" : "先自己走第一步"}</h3>
          <p class="coach-copy">${item.hintsUsed ? "提示只给方向，不替你完成思考。试着把提示翻译成一个算式或判断。" : "真正卡住时再点提示。主动回忆比看懂答案更能留下记忆。"}</p>
          <div class="hint-stack">
            ${question.hints.slice(0, item.hintsUsed).map((hint, index) => `<div class="hint-card"><strong>HINT ${index + 1}</strong>${hint}</div>`).join("")}
          </div>
          <div class="coach-mastery">
            <div><span>${skill.name}</span><strong>${mastery}%</strong></div>
            <div class="progress-track" style="--progress:${mastery}%;--progress-color:${subject.color}"><i></i></div>
          </div>
        </aside>
      </div>
    </div>
  `;
}

function renderQuestionAnswer(question, item, mode) {
  if (question.type === "choice") {
    return `<div class="answer-options">${question.options.map((option, index) => {
      const selected = Number(item.answer) === index;
      const isCorrect = item.submitted && index === Number(question.answer);
      const isWrong = item.submitted && selected && !item.result?.correct;
      return `
        <button class="answer-option ${selected ? "selected" : ""} ${isCorrect ? "correct" : ""} ${isWrong ? "wrong" : ""}" type="button"
          data-answer-index="${index}" data-answer-mode="${mode}" ${item.submitted && mode === "practice" ? "disabled" : ""}>
          <span class="answer-letter">${String.fromCharCode(65 + index)}</span><span>${option}</span>
        </button>
      `;
    }).join("")}</div>`;
  }

  return `
    <div class="answer-input-wrap">
      <label for="current-answer">写下你的答案${question.type === "numeric" ? "（可带单位）" : ""}</label>
      <input class="answer-input" id="current-answer" data-answer-input data-answer-mode="${mode}" value="${escapeAttribute(item.answer ?? "")}" placeholder="在这里输入…" ${item.submitted && mode === "practice" ? "disabled" : ""} autocomplete="off" />
    </div>
  `;
}

function renderFeedback(item) {
  const question = item.question;
  const correct = item.result.correct;
  return `
    <div class="feedback-box ${correct ? "correct" : "wrong"}">
      <div class="feedback-title">
        <i>${correct ? "✓" : "!"}</i>
        <strong>${correct ? "这一步走对了" : "错误已经被定位"}</strong>
        <span>${correct ? `掌握度 ${item.result.masteryBefore}% → ${item.result.masteryAfter}%` : `错因：${item.result.errorType}`}</span>
      </div>
      <p>${question.explanation.idea}</p>
      <div class="analogy-note"><span>💡</span><div><strong>像这样想，会更容易懂</strong><p>${question.explanation.analogy}</p><small>类比只帮助建立直觉，做题时仍以题目条件和正式规则为准。</small></div></div>
      <ol class="solution-steps">${question.explanation.steps.map((step) => `<li>${step}</li>`).join("")}</ol>
      <div class="trap-note"><span>⚠</span><span><strong>易错提醒：</strong>${question.explanation.trap}</span></div>
    </div>
  `;
}

function renderPracticeComplete(session) {
  const correctCount = session.items.filter((item) => item.result?.correct).length;
  const wrongIds = session.items.filter((item) => !item.result?.correct).map((item) => item.question.id);
  const rate = Math.round((correctCount / session.items.length) * 100);
  return `
    <div class="page">
      <section class="panel exam-result">
        <span class="eyebrow">关卡完成</span>
        <div class="result-ring" style="--score:${rate}"><span>${rate}<small>正确率</small></span></div>
        <h2>${rate >= 80 ? "这组考点已经亮了一截" : "很好，薄弱点终于现形了"}</h2>
        <p>${correctCount} / ${session.items.length} 题正确。错题已经进入复习队列，不需要现在反复抄答案。</p>
        <div class="result-breakdown">
          <div class="summary-card"><span>答对</span><strong>${correctCount}</strong><small>道题</small></div>
          <div class="summary-card"><span>需要复练</span><strong>${wrongIds.length}</strong><small>道题</small></div>
          <div class="summary-card"><span>当前经验</span><strong>${state.stats.xp}</strong><small>XP</small></div>
        </div>
        <div class="mission-actions" style="justify-content:center">
          ${wrongIds.length ? `<button class="secondary-button" type="button" data-retry-question-ids="${wrongIds.join(",")}">立即做一遍变式复练</button>` : ""}
          <button class="primary-button" type="button" data-route-action="home">返回学习岛</button>
        </div>
      </section>
    </div>
  `;
}

function renderNoPracticeQuestions() {
  return `
    <div class="page">
      <div class="page-heading"><div><span class="eyebrow">智能练习</span><h1>今日练习场</h1></div></div>
      <section class="empty-state">
        <div><div class="empty-state-symbol">✓</div><h2>这一组暂时没有待练题</h2><p>可以回到智能推荐继续做薄弱考点，新的错题出现后会自动进入复练。</p><button class="primary-button" type="button" data-smart-practice>开始智能推荐</button></div>
      </section>
    </div>
  `;
}

function renderWrongBook() {
  const filter = routeContext.filter || "active";
  const openItems = state.wrongBook.filter((item) => !item.resolved);
  const resolvedItems = state.wrongBook.filter((item) => item.resolved);
  const due = getDueReviews(state);
  const items = filter === "all" ? state.wrongBook : filter === "resolved" ? resolvedItems : openItems;
  const topError = mostCommon(openItems.map((item) => item.errorType)) || "暂无";

  return `
    <div class="page wrongbook-page">
      <div class="page-heading">
        <div><span class="eyebrow">错因会被修好</span><h1>错题修理铺</h1><p>这里不收集失败，只把每一个错因修成下次的得分点。</p></div>
        ${openItems.length ? `<button class="primary-button" type="button" data-practice-all-wrong>复练全部 ${openItems.length} 题</button>` : ""}
      </div>
      <div class="wrongbook-summary">
        <div class="summary-card"><span>待修复错题</span><strong>${openItems.length}</strong><small>连续答对 2 次后移出</small></div>
        <div class="summary-card"><span>今天已到期</span><strong>${due.length}</strong><small>按记忆节奏安排</small></div>
        <div class="summary-card"><span>主要失分原因</span><strong style="font-size:20px">${topError}</strong><small>根据真实错答更新</small></div>
      </div>
      <div class="practice-toolbar">
        <div class="segmented-control">
          <button type="button" data-wrong-filter="active" class="${filter === "active" ? "active" : ""}">待复练 ${openItems.length}</button>
          <button type="button" data-wrong-filter="resolved" class="${filter === "resolved" ? "active" : ""}">已修复 ${resolvedItems.length}</button>
          <button type="button" data-wrong-filter="all" class="${filter === "all" ? "active" : ""}">全部</button>
        </div>
      </div>
      ${items.length ? `<div class="wrongbook-list">${items.map(renderWrongCard).join("")}</div>` : `
        <section class="empty-state"><div><div class="empty-state-symbol">${filter === "resolved" ? "◇" : "✓"}</div><h2>${filter === "resolved" ? "还没有修复记录" : "当前没有待修复错题"}</h2><p>${filter === "resolved" ? "同一道错题连续复练正确两次，就会出现在这里。" : "先去完成一组智能练习，系统会自动保存错题和错因。"}</p><button class="primary-button" type="button" data-smart-practice>开始智能练习</button></div></section>
      `}
    </div>
  `;
}

function renderWrongCard(item) {
  const question = getQuestion(item.questionId);
  if (!question) return "";
  const subject = SUBJECTS[question.subject];
  const skill = getSkill(question.skill);
  return `
    <article class="wrong-card ${item.resolved ? "resolved" : ""}">
      <span class="subject-token" style="--subject-color:${subject.color}">${subject.short}</span>
      <div>
        <h3>${question.title}</h3>
        <p>${question.stem}</p>
        <div class="wrong-meta"><span>${item.errorType}</span><span>${skill.name}</span><span>错 ${item.count} 次</span>${item.resolved ? "<span>已修复</span>" : ""}</div>
      </div>
      <div class="wrong-actions"><button class="secondary-button" type="button" data-practice-question="${question.id}">${item.resolved ? "再测一次" : "现在复练"}</button><button class="ghost-button" type="button" data-tutor-question="${question.id}">问老师</button></div>
    </article>
  `;
}

function renderExam() {
  if (examSession?.result) return renderExamResult();
  if (examSession?.exam) return renderExamRunning();

  const lastExam = state.examHistory.at(-1);
  return `
    <div class="page exam-page">
      <div class="page-heading">
        <div><span class="eyebrow">周末检验</span><h1>限时挑战赛</h1><p>练习看过程，挑战赛看能不能在规定时间里把会做的分拿稳。</p></div>
      </div>
      <div class="exam-launch-grid">
        <section class="panel exam-hero">
          <span class="eyebrow">四科联合挑战</span>
          <h2>25 分钟，检验这一周有没有真正学会</h2>
          <p>数学、物理占七成，语文、英语做保温。系统优先抽取薄弱考点，交卷后自动拆出错因和复练队列。</p>
          <div class="exam-specs"><span>默认题量<strong>8 题</strong></span><span>建议用时<strong>25 分</strong></span><span>主科占比<strong>72%</strong></span></div>
          <button class="primary-button" type="button" data-start-exam>生成并开始小卷 →</button>
        </section>
        <aside class="exam-side">
          <section class="panel exam-option-card">
            <h3>本次设置</h3><p>先用小卷建立节奏，稳定后再逐步增加题量。</p>
            <div class="field-row">
              <label>题量<select id="exam-size"><option value="8">8 题</option><option value="12">12 题</option><option value="16">16 题</option></select></label>
              <label>限时<select id="exam-duration"><option value="25">25 分钟</option><option value="40">40 分钟</option><option value="60">60 分钟</option></select></label>
            </div>
          </section>
          <section class="panel exam-option-card">
            <h3>最近一次</h3>
            ${lastExam ? `<div class="exam-history-item"><div><strong>${lastExam.title}</strong><small>${formatDate(lastExam.completedAt)} · ${lastExam.correctCount}/${lastExam.questionCount} 题</small></div><span class="exam-history-score">${lastExam.percentage}%</span></div>` : `<p style="margin-bottom:0">还没有小卷记录。第一次成绩只做基线，不做评价。</p>`}
          </section>
          <section class="panel exam-option-card">
            <h3>考场规则</h3><p style="margin-bottom:0">不开提示，不即时判分；不会的先标记、继续向后，把会做的分拿稳。</p>
          </section>
        </aside>
      </div>
    </div>
  `;
}

function renderExamRunning() {
  const exam = examSession.exam;
  const question = getQuestion(exam.questionIds[examSession.index]);
  const item = { question, answer: examSession.answers[question.id] ?? null, submitted: false };
  const remainingMinutes = Math.floor(examSession.remainingSeconds / 60);
  const remainingSeconds = examSession.remainingSeconds % 60;
  return `
    <div class="page exam-page">
      <div class="exam-running">
        <section class="panel exam-paper">
          <div class="exam-top"><div><span class="eyebrow">挑战进行中</span><h2>${exam.title}</h2></div><time class="exam-timer" id="exam-timer">${String(remainingMinutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}</time></div>
          <div class="exam-question">
            <span class="exam-question-number">第 ${examSession.index + 1} 题 / 共 ${exam.questionIds.length} 题 · ${SUBJECTS[question.subject].name} · ${question.points} 分</span>
            <h3>${question.stem}</h3>
            ${renderQuestionAnswer(question, item, "exam")}
          </div>
          <div class="question-actions">
            <div class="question-actions-left"><button class="ghost-button" type="button" data-exam-prev ${examSession.index === 0 ? "disabled" : ""}>← 上一题</button></div>
            <div class="question-actions-right"><button class="secondary-button" type="button" data-exam-mark>${examSession.marked.has(question.id) ? "取消标记" : "标记不会"}</button><button class="primary-button" type="button" data-exam-next>${examSession.index === exam.questionIds.length - 1 ? "检查答题卡" : "下一题 →"}</button></div>
          </div>
        </section>
        <aside class="panel exam-navigator">
          <h3>答题卡</h3>
          <div class="exam-number-grid">${exam.questionIds.map((id, index) => `<button type="button" data-exam-jump="${index}" class="${index === examSession.index ? "current" : ""} ${examSession.answers[id] !== undefined && examSession.answers[id] !== null && examSession.answers[id] !== "" ? "answered" : ""}" aria-label="第 ${index + 1} 题${examSession.marked.has(id) ? "，已标记" : ""}">${examSession.marked.has(id) ? "?" : index + 1}</button>`).join("")}</div>
          <button class="primary-button exam-submit" type="button" data-submit-exam>交卷</button>
          <p style="margin:12px 0 0;color:var(--muted);font-size:9px;line-height:1.6">已答 ${Object.values(examSession.answers).filter((answer) => answer !== null && answer !== "").length} / ${exam.questionIds.length} 题</p>
        </aside>
      </div>
    </div>
  `;
}

function renderExamResult() {
  const result = examSession.result;
  const wrongIds = result.details.filter((item) => !item.correct).map((item) => item.questionId);
  return `
    <div class="page">
      <section class="panel exam-result">
        <span class="eyebrow">挑战结果</span>
        <div class="result-ring" style="--score:${result.percentage}"><span>${result.percentage}<small>得分率</small></span></div>
        <h2>${result.percentage >= 85 ? "节奏和掌握都很稳" : result.percentage >= 60 ? "基础能取分，薄弱点已经看清" : "这张卷的价值是把漏洞暴露出来"}</h2>
        <p>${result.correctCount} / ${examSession.exam.questionIds.length} 题正确，得分 ${result.score} / ${result.total}。错题已经进入记忆复习队列。</p>
        <div class="result-breakdown">
          <div class="summary-card"><span>正确题数</span><strong>${result.correctCount}</strong><small>共 ${examSession.exam.questionIds.length} 题</small></div>
          <div class="summary-card"><span>失分题数</span><strong>${wrongIds.length}</strong><small>进入错题复盘</small></div>
          <div class="summary-card"><span>得分率</span><strong>${result.percentage}%</strong><small>本次基线</small></div>
        </div>
        <div class="mission-actions" style="justify-content:center">
          ${wrongIds.length ? `<button class="secondary-button" type="button" data-retry-question-ids="${wrongIds.join(",")}">复练失分题</button>` : ""}
          <button class="primary-button" type="button" data-new-exam>再生成一卷</button>
          <button class="ghost-button" type="button" data-route-action="report">查看学习报告</button>
        </div>
      </section>
    </div>
  `;
}

function renderReport() {
  const report = getWeeklyReport(state);
  const averageMastery = Math.round(SKILLS.reduce((sum, skill) => sum + (state.mastery[skill.id] ?? skill.mastery), 0) / SKILLS.length);
  const weakest = getWeakSkills(state, 3);
  const maxAttempts = Math.max(1, ...report.trend.map((item) => item.attempts));
  return `
    <div class="page report-page">
      <div class="page-heading">
        <div><span class="eyebrow">本周成长记录</span><h1>我的成长花园</h1><p>不比谁做得多，只看哪些错误正在变少、哪些知识点已经慢慢长稳。</p></div>
        <div class="status-cluster"><span class="status-pill">数据更新到 <strong>${formatDate(new Date())}</strong></span></div>
      </div>
      <div class="report-grid">
        <section class="panel report-overview">
          <div class="panel-heading"><div><h2>最近 7 天</h2><p>${report.attempts ? "真实答题表现" : "开始练习后生成趋势"}</p></div><span class="status-pill">连续 ${state.stats.streak} 天</span></div>
          <div class="report-kpis">
            <div class="report-kpi"><span>完成题目</span><strong>${report.attempts}</strong></div>
            <div class="report-kpi"><span>正确率</span><strong>${report.accuracy}%</strong></div>
            <div class="report-kpi"><span>活跃天数</span><strong>${report.activeDays}</strong></div>
            <div class="report-kpi"><span>总掌握度</span><strong>${averageMastery}%</strong></div>
          </div>
          <div class="trend-chart" aria-label="最近七天答题量">
            ${report.trend.map((day) => `<div class="trend-day"><div class="trend-bar" data-count="${day.attempts}" style="--height:${Math.max(3, (day.attempts / maxAttempts) * 110)}px"></div><span>周${day.label}</span></div>`).join("")}
          </div>
        </section>

        <aside class="panel report-advice">
          <div class="panel-heading"><div><h2>星星老师建议</h2><p>只给下一周最重要的三件事</p></div></div>
          <div class="advice-quote">“先把反复错的原因修掉，分数自然会跟上来。”</div>
          <div class="advice-list">
            <div class="advice-item"><span>1</span><div><strong>主攻 ${weakest[0].name}</strong><br>掌握度 ${weakest[0].mastery}%，先练基础模型，再做综合题。</div></div>
            <div class="advice-item"><span>2</span><div><strong>盯住 ${report.topError}</strong><br>${report.topError === "暂无足够数据" ? "完成一组练习后，我会找出最常见失分原因。" : "每次提交前留 20 秒，专门检查这一类错误。"}</div></div>
            <div class="advice-item"><span>3</span><div><strong>周末完成一张 25 分钟小卷</strong><br>用限时状态验证会不会，而不是只验证看没看懂。</div></div>
          </div>
          <button class="primary-button" style="width:100%;margin-top:25px" type="button" data-skill-id="${weakest[0].id}">开始最弱点训练</button>
        </aside>

        <section class="panel mastery-panel">
          <div class="panel-heading"><div><h2>薄弱考点排序</h2><p>优先级会随每次答题改变</p></div></div>
          <div class="mastery-list">
            ${getWeakSkills(state, 8).map((skill) => {
              const subject = SUBJECTS[skill.subject];
              return `<div class="mastery-row"><span>${skill.name}</span><div class="progress-track" style="--progress:${skill.mastery}%;--progress-color:${subject.color}"><i></i></div><strong>${skill.mastery}%</strong></div>`;
            }).join("")}
          </div>
        </section>

        <section class="panel settings-panel">
          <div class="panel-heading"><div><h2>学习档案</h2><p>数据默认只在这台设备的浏览器里</p></div></div>
          <div class="settings-actions"><button class="ghost-button" type="button" data-export-state>导出学习记录</button><button class="danger-button" type="button" data-reset-state>清空并重新诊断</button></div>
        </section>
      </div>
    </div>
  `;
}

function ensureLessonSession() {
  const lessonId = routeContext.lessonId || lessonSession?.lessonId || MICRO_LESSONS[0].id;
  if (!lessonSession || lessonSession.lessonId !== lessonId) {
    lessonSession = { lessonId, frameIndex: 0, playing: false, missionId: routeContext.missionId || null };
  }
}

function renderLesson() {
  ensureLessonSession();
  const lesson = getLesson(lessonSession.lessonId);
  const frame = lesson.frames[lessonSession.frameIndex];
  return `
    <div class="page lesson-page">
      <div class="page-heading">
        <div><span class="eyebrow">动画小课堂</span><h1>${lesson.title}</h1><p>${SUBJECTS[lesson.subject].name} · ${getSkill(lesson.skill).name} · ${lesson.duration}</p></div>
        <button class="ghost-button" type="button" data-route-action="home">退出微课</button>
      </div>
      <div class="lesson-layout">
        <section class="panel lesson-stage">
          <div class="panel-heading"><div><h2>动态演示</h2><p>把抽象公式变成一眼能看见的关系</p></div><span class="status-pill">${lessonSession.playing ? "播放中" : "已暂停"}</span></div>
          <div class="lesson-visual">
            ${lesson.type === "slope" ? renderSlopeVisual() : renderProjectileVisual()}
            <span class="lesson-caption">${frame.note}</span>
          </div>
        </section>
        <aside class="panel lesson-script">
          <span class="lesson-frame-count">${frame.eyebrow} · ${lessonSession.frameIndex + 1}/${lesson.frames.length}</span>
          <h2>${frame.title}</h2>
          <p>${frame.body}</p>
          <div class="lesson-note">${frame.note}</div>
          <div class="lesson-controls">
            <button class="play-button" type="button" data-lesson-play aria-label="${lessonSession.playing ? "暂停" : "播放"}">${lessonSession.playing ? "Ⅱ" : "▶"}</button>
            <div class="lesson-dots">${lesson.frames.map((_, index) => `<button type="button" class="${index === lessonSession.frameIndex ? "active" : ""}" data-lesson-frame="${index}" aria-label="第 ${index + 1} 段"></button>`).join("")}</div>
            <button class="ghost-button" type="button" data-lesson-next>${lessonSession.frameIndex === lesson.frames.length - 1 ? "重播" : "下一段"}</button>
          </div>
          <button class="primary-button" style="width:100%;margin-top:25px" type="button" data-lesson-practice="${lesson.skill}">做 2 道题，看看真懂没有</button>
        </aside>
      </div>
    </div>
  `;
}

function renderSlopeVisual() {
  return `
    <svg viewBox="0 0 460 300" role="img" aria-label="曲线上的切线随位置移动，展示导数是瞬时斜率">
      <line class="graph-axis" x1="30" y1="245" x2="435" y2="245"></line><line class="graph-axis" x1="70" y1="275" x2="70" y2="25"></line>
      <path class="graph-curve" d="M45,212 C108,202 138,253 198,191 C255,132 304,67 415,102"></path>
      <line class="graph-tangent" x1="165" y1="210" x2="290" y2="154"></line><circle class="graph-point" cx="227" cy="182" r="6"></circle>
      <text x="390" y="268" fill="#8fa8ba" font-size="11">x</text><text x="49" y="42" fill="#8fa8ba" font-size="11">f(x)</text>
      <text x="285" y="141" fill="#ffd166" font-size="11">切线坡度 = f′(x)</text>
    </svg>
  `;
}

function renderProjectileVisual() {
  return `
    <svg viewBox="0 0 460 300" role="img" aria-label="小球平抛轨迹及水平、竖直方向的速度分解">
      <defs><marker id="arrow-blue" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#4bc6ff"></path></marker><marker id="arrow-orange" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#ff9f76"></path></marker></defs>
      <line class="graph-axis" x1="35" y1="260" x2="435" y2="260"></line><line class="graph-axis" x1="60" y1="40" x2="60" y2="260"></line>
      <path class="projectile-path" d="M60,70 Q230,70 390,255"></path><circle class="projectile-ball" cx="0" cy="0" r="8"></circle>
      <line class="vector-x" x1="60" y1="70" x2="145" y2="70"></line><line class="vector-y" x1="60" y1="70" x2="60" y2="145"></line>
      <text x="105" y="58" fill="#4bc6ff" font-size="11">v₀：水平匀速</text><text x="72" y="126" fill="#ff9f76" font-size="11">g：竖直加速</text>
      <text x="300" y="282" fill="#8fa8ba" font-size="11">同一个时间 t</text>
    </svg>
  `;
}

function handleMainClick(event) {
  const routeButton = event.target.closest("[data-route-action]");
  if (routeButton) return navigate(routeButton.dataset.routeAction);

  const subjectButton = event.target.closest("[data-subject-id]");
  if (subjectButton) return startPractice({ subject: subjectButton.dataset.subjectId, limit: 5 });

  const skillButton = event.target.closest("[data-skill-id]");
  if (skillButton) return startPractice({ skill: skillButton.dataset.skillId, subject: getSkill(skillButton.dataset.skillId).subject, limit: 4 });

  const missionButton = event.target.closest("[data-mission-id]");
  if (missionButton) return startMission(missionButton.dataset.missionId);

  const lessonButton = event.target.closest("[data-lesson-id]");
  if (lessonButton) return openLesson(lessonButton.dataset.lessonId);

  const subjectTab = event.target.closest("[data-practice-subject]");
  if (subjectTab) return startPractice({ subject: subjectTab.dataset.practiceSubject, limit: 5 });

  const knowledgeSubject = event.target.closest("[data-knowledge-subject]");
  if (knowledgeSubject) {
    routeContext.subject = knowledgeSubject.dataset.knowledgeSubject;
    return render();
  }

  const videoSubject = event.target.closest("[data-video-subject]");
  if (videoSubject) {
    routeContext.subject = videoSubject.dataset.videoSubject;
    return render();
  }

  const answerButton = event.target.closest("[data-answer-index]");
  if (answerButton) return selectAnswer(answerButton);

  if (event.target.closest("[data-submit-answer]")) return submitPracticeAnswer();
  if (event.target.closest("[data-show-hint]")) return showNextHint();
  if (event.target.closest("[data-practice-next]")) return nextPracticeQuestion();
  if (event.target.closest("[data-practice-prev]")) return previousPracticeQuestion();
  if (event.target.closest("[data-smart-practice]")) return startPractice({ subject: "all", limit: 5 });
  if (event.target.closest("[data-open-tutor]")) return openTutor();

  const retryIds = event.target.closest("[data-retry-question-ids]");
  if (retryIds) return startPractice({ questionIds: retryIds.dataset.retryQuestionIds.split(","), limit: 20 });
  const oneQuestion = event.target.closest("[data-practice-question]");
  if (oneQuestion) return startPractice({ questionIds: [oneQuestion.dataset.practiceQuestion], limit: 1 });
  if (event.target.closest("[data-practice-all-wrong]")) return startPractice({ onlyWrong: true, limit: 30 });

  const wrongFilter = event.target.closest("[data-wrong-filter]");
  if (wrongFilter) { routeContext.filter = wrongFilter.dataset.wrongFilter; return render(); }
  const tutorQuestionButton = event.target.closest("[data-tutor-question]");
  if (tutorQuestionButton) { openTutor(getQuestion(tutorQuestionButton.dataset.tutorQuestion)); return; }

  if (event.target.closest("[data-start-exam]")) return startExam();
  if (event.target.closest("[data-exam-prev]")) return moveExam(-1);
  if (event.target.closest("[data-exam-next]")) return moveExam(1);
  const jump = event.target.closest("[data-exam-jump]");
  if (jump) { examSession.index = Number(jump.dataset.examJump); return render(); }
  if (event.target.closest("[data-exam-mark]")) return toggleExamMark();
  if (event.target.closest("[data-submit-exam]")) return submitExam();
  if (event.target.closest("[data-new-exam]")) { clearExam(); return render(); }

  if (event.target.closest("[data-lesson-play]")) return toggleLessonPlay();
  if (event.target.closest("[data-lesson-next]")) return nextLessonFrame();
  const lessonFrame = event.target.closest("[data-lesson-frame]");
  if (lessonFrame) { lessonSession.frameIndex = Number(lessonFrame.dataset.lessonFrame); render(); return; }
  const lessonPractice = event.target.closest("[data-lesson-practice]");
  if (lessonPractice) return finishLessonAndPractice(lessonPractice.dataset.lessonPractice);

  if (event.target.closest("[data-export-state]")) return exportState();
  if (event.target.closest("[data-reset-state]")) return resetLearningState();
}

function handleMainInput(event) {
  if (!event.target.matches("[data-answer-input]")) return;
  const mode = event.target.dataset.answerMode;
  if (mode === "practice" && practiceSession) {
    practiceSession.items[practiceSession.index].answer = event.target.value;
    const submit = main.querySelector("[data-submit-answer]");
    if (submit) submit.disabled = !event.target.value.trim();
  }
  if (mode === "exam" && examSession) {
    const questionId = examSession.exam.questionIds[examSession.index];
    examSession.answers[questionId] = event.target.value;
    updateExamNavigatorOnly();
  }
}

function startMission(missionId) {
  const mission = buildDailyMissions(state).find((item) => item.id === missionId);
  if (!mission) return;
  if (mission.type === "lesson") return openLesson(mission.lessonId, missionId);
  if (mission.type === "review") {
    const dueIds = getDueReviews(state).map((item) => item.questionId);
    return startPractice({ questionIds: dueIds.length ? dueIds : null, onlyWrong: false, limit: dueIds.length || 2, missionId });
  }
  return startPractice({ subject: mission.subject || "all", skill: mission.skill || null, limit: mission.id === "mission-language" ? 2 : 3, missionId });
}

function startPractice(options = {}) {
  practiceSession = null;
  navigate("practice", { ...options, restart: true });
}

function selectAnswer(button) {
  const mode = button.dataset.answerMode;
  const value = Number(button.dataset.answerIndex);
  if (mode === "practice") {
    const item = practiceSession.items[practiceSession.index];
    if (item.submitted) return;
    item.answer = value;
    main.querySelectorAll(".answer-option").forEach((option) => option.classList.toggle("selected", option === button));
    const submit = main.querySelector("[data-submit-answer]");
    if (submit) submit.disabled = false;
  } else if (mode === "exam") {
    const questionId = examSession.exam.questionIds[examSession.index];
    examSession.answers[questionId] = value;
    main.querySelectorAll(".answer-option").forEach((option) => option.classList.toggle("selected", option === button));
    updateExamNavigatorOnly();
  }
}

function submitPracticeAnswer() {
  const item = practiceSession.items[practiceSession.index];
  if (item.answer === null || item.answer === "") return;
  const responseSeconds = Math.max(1, Math.round((Date.now() - item.startedAt) / 1000));
  const recorded = recordAttempt(state, {
    questionId: item.question.id,
    answer: item.answer,
    responseSeconds,
    hintsUsed: item.hintsUsed,
    mode: "practice",
  });
  state = recorded.state;
  item.submitted = true;
  item.result = recorded.result;
  saveState();
  render();
  if (recorded.result.correct) celebrateSuccess();
  showToast(recorded.result.correct ? "⭐ +8 星星 · 这个知识点又亮了一点" : "🌱 错因已收好，10 分钟后再来修一次");
}

function showNextHint() {
  const item = practiceSession.items[practiceSession.index];
  item.hintsUsed = Math.min(item.hintsUsed + 1, item.question.hints.length);
  render();
}

function nextPracticeQuestion() {
  const session = practiceSession;
  if (session.index < session.items.length - 1) {
    session.index += 1;
    render();
    return;
  }
  session.completed = true;
  if (session.missionId) {
    state = completeMission(state, session.missionId);
    saveState();
  }
  render();
}

function previousPracticeQuestion() {
  if (practiceSession.index > 0) {
    practiceSession.index -= 1;
    render();
  }
}

function startExam() {
  const size = Number(document.querySelector("#exam-size")?.value || 8);
  const durationMinutes = Number(document.querySelector("#exam-duration")?.value || 25);
  const exam = generateExam(state, { size, durationMinutes, seed: Date.now() });
  examSession = {
    exam,
    index: 0,
    answers: {},
    marked: new Set(),
    remainingSeconds: durationMinutes * 60,
    result: null,
    startedAt: Date.now(),
  };
  startExamTimer();
  render();
}

function startExamTimer() {
  if (examTimer) window.clearInterval(examTimer);
  examTimer = window.setInterval(() => {
    if (!examSession?.exam || examSession.result) return;
    examSession.remainingSeconds -= 1;
    const timer = document.querySelector("#exam-timer");
    if (timer) {
      const minutes = Math.max(0, Math.floor(examSession.remainingSeconds / 60));
      const seconds = Math.max(0, examSession.remainingSeconds % 60);
      timer.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }
    if (examSession.remainingSeconds <= 0) {
      showToast("时间到，系统已自动交卷");
      submitExam(true);
    }
  }, 1000);
}

function moveExam(direction) {
  examSession.index = Math.max(0, Math.min(examSession.exam.questionIds.length - 1, examSession.index + direction));
  render();
}

function toggleExamMark() {
  const id = examSession.exam.questionIds[examSession.index];
  if (examSession.marked.has(id)) examSession.marked.delete(id);
  else examSession.marked.add(id);
  render();
}

function updateExamNavigatorOnly() {
  const buttons = main.querySelectorAll("[data-exam-jump]");
  buttons.forEach((button) => {
    const id = examSession.exam.questionIds[Number(button.dataset.examJump)];
    const answer = examSession.answers[id];
    button.classList.toggle("answered", answer !== undefined && answer !== null && answer !== "");
  });
  const copy = main.querySelector(".exam-navigator p");
  if (copy) copy.textContent = `已答 ${Object.values(examSession.answers).filter((answer) => answer !== null && answer !== "").length} / ${examSession.exam.questionIds.length} 题`;
}

function submitExam(auto = false) {
  if (!examSession?.exam || examSession.result) return;
  const unanswered = examSession.exam.questionIds.filter((id) => examSession.answers[id] === undefined || examSession.answers[id] === "");
  if (!auto && unanswered.length && !window.confirm(`还有 ${unanswered.length} 题未作答，确定交卷吗？`)) return;
  if (examTimer) window.clearInterval(examTimer);
  const result = scoreExam(examSession.exam, examSession.answers);
  const perQuestionSeconds = Math.max(1, Math.round((Date.now() - examSession.startedAt) / 1000 / examSession.exam.questionIds.length));
  let nextState = state;
  for (const questionId of examSession.exam.questionIds) {
    nextState = recordAttempt(nextState, {
      questionId,
      answer: examSession.answers[questionId] ?? "",
      responseSeconds: perQuestionSeconds,
      hintsUsed: 0,
      mode: "exam",
    }).state;
  }
  state = addExamResult(nextState, examSession.exam, result, examSession.answers);
  examSession.result = result;
  saveState();
  render();
}

function clearExam() {
  if (examTimer) window.clearInterval(examTimer);
  examTimer = null;
  examSession = null;
}

function openLesson(lessonId, missionId = null) {
  stopLessonTimer();
  lessonSession = { lessonId, frameIndex: 0, playing: false, missionId };
  navigate("lesson", { lessonId, missionId });
}

function toggleLessonPlay() {
  lessonSession.playing = !lessonSession.playing;
  if (lessonSession.playing) startLessonTimer();
  else stopLessonTimer(false);
  render();
}

function startLessonTimer() {
  stopLessonTimer(false);
  lessonTimer = window.setInterval(() => {
    const lesson = getLesson(lessonSession.lessonId);
    if (lessonSession.frameIndex >= lesson.frames.length - 1) {
      lessonSession.playing = false;
      stopLessonTimer(false);
    } else {
      lessonSession.frameIndex += 1;
    }
    render();
  }, 4500);
}

function stopLessonTimer(markPaused = true) {
  if (lessonTimer) window.clearInterval(lessonTimer);
  lessonTimer = null;
  if (markPaused && lessonSession) lessonSession.playing = false;
}

function nextLessonFrame() {
  const lesson = getLesson(lessonSession.lessonId);
  lessonSession.frameIndex = lessonSession.frameIndex >= lesson.frames.length - 1 ? 0 : lessonSession.frameIndex + 1;
  render();
}

function finishLessonAndPractice(skillId) {
  stopLessonTimer();
  if (lessonSession.missionId) {
    state = completeMission(state, lessonSession.missionId);
    saveState();
  }
  startPractice({ subject: getSkill(skillId).subject, skill: skillId, limit: 2 });
}

function openTutor(question = null) {
  tutorDrawer.classList.add("open");
  tutorDrawer.setAttribute("aria-hidden", "false");
  tutorBackdrop.hidden = false;
  if (question) {
    tutorMessages.push({ role: "ai", text: `我们来看“${question.title}”。先别看答案：你觉得这道题第一步应该找哪个关系或公式？` });
  }
  renderTutorMessages();
  window.setTimeout(() => tutorQuestion.focus(), 220);
}

function closeTutor() {
  tutorDrawer.classList.remove("open");
  tutorDrawer.setAttribute("aria-hidden", "true");
  tutorBackdrop.hidden = true;
}

async function askTutor(action, customText = "") {
  const context = getTutorContext();
  const prompts = {
    hint: "我卡住了，只提示下一步，不要直接给答案。",
    explain: "请换一种更直观的说法讲给我听。",
    diagnose: "请根据我的作答，帮我判断最可能的错因。",
  };
  const questionText = customText || prompts[action] || "请帮我讲解。";
  tutorMessages.push({ role: "user", text: questionText });
  tutorMessages.push({ role: "ai", text: "正在判断你卡住的那一步…", loading: true });
  renderTutorMessages();
  tutorStatus.textContent = "正在思考";

  try {
    const response = await fetch("/api/tutor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, message: questionText, context }),
    });
    if (!response.ok) throw new Error("AI 接口暂时不可用");
    const payload = await response.json();
    tutorMessages[tutorMessages.length - 1] = { role: "ai", text: payload.reply || localTutorReply(action, context, questionText) };
    tutorStatus.textContent = payload.mode === "ai" ? "AI 深度讲解" : "本地讲解可用";
  } catch {
    tutorMessages[tutorMessages.length - 1] = { role: "ai", text: localTutorReply(action, context, questionText) };
    tutorStatus.textContent = "本地讲解可用";
  }
  renderTutorMessages();
}

function getTutorContext() {
  const practiceItem = practiceSession && route === "practice" ? practiceSession.items[practiceSession.index] : null;
  const question = practiceItem?.question || null;
  return {
    route,
    question: question ? {
      id: question.id,
      title: question.title,
      stem: question.stem,
      subject: SUBJECTS[question.subject].name,
      skill: getSkill(question.skill).name,
      hints: question.hints,
      explanation: question.explanation,
    } : null,
    answer: practiceItem?.answer ?? null,
    hintsUsed: practiceItem?.hintsUsed ?? 0,
    result: practiceItem?.result ? { correct: practiceItem.result.correct, errorType: practiceItem.result.errorType } : null,
    weakestSkills: getWeakSkills(state, 3).map((skill) => ({ name: skill.name, mastery: skill.mastery })),
  };
}

function localTutorReply(action, context, message) {
  const question = context.question;
  if (!question) {
    return `你目前最值得先处理的是 ${context.weakestSkills[0].name}（约 ${context.weakestSkills[0].mastery}%）。建议先做 3 道基础模型题：第一题允许看提示，后两题独立完成。你也可以先打开一道具体题再问我，我会讲得更准确。`;
  }
  if (action === "hint") {
    const hint = question.hints[Math.min(context.hintsUsed, question.hints.length - 1)];
    return `只给你下一步：${hint}\n\n先别往后算。告诉我，这句话能转成哪个式子或判断？`;
  }
  if (action === "diagnose") {
    if (context.result?.errorType) return `这次最像“${context.result.errorType}”。先不要抄完整答案，把你的第一步和标准第一步并排看：${question.explanation.steps[0]} 你是从哪一步开始不一样的？`;
    return `现在还没有提交结果，我先不武断判断。你把自己的第一步写出来，我会从“审题、模型、公式、计算、表达”五层里帮你定位。`;
  }
  if (action === "explain") {
    return `先用一个生活里的画面理解：${question.explanation.analogy}\n\n再回到正式规则：${question.explanation.idea}\n第一步只做：${question.explanation.steps[0]}\n\n注意：类比帮助你理解，但最终要用题目条件和规则检查。`;
  }
  return `你问的是：“${message}”\n\n针对这道题，最关键的入口是：${question.explanation.idea} 先尝试完成“${question.explanation.steps[0]}”，把你的结果发给我，我再只检查这一步。`;
}

function renderTutorMessages() {
  tutorMessagesElement.innerHTML = "";
  for (const message of tutorMessages) {
    const element = document.createElement("div");
    element.className = `tutor-message ${message.role} ${message.loading ? "loading" : ""}`;
    element.textContent = message.text;
    tutorMessagesElement.appendChild(element);
  }
  tutorMessagesElement.scrollTop = tutorMessagesElement.scrollHeight;
}

function exportState() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `星航学习记录-${toDateKey(new Date())}.json`;
  link.click();
  URL.revokeObjectURL(link.href);
  showToast("学习记录已导出，可作为本地备份");
}

function resetLearningState() {
  if (!window.confirm("确定清空全部答题、错题和小卷记录吗？这个操作无法撤销。")) return;
  state = resetState();
  practiceSession = null;
  clearExam();
  saveState();
  render();
  showToast("学习档案已清空，可以重新开始诊断");
}

function loadState() {
  try {
    return hydrateState(JSON.parse(window.localStorage.getItem(STORAGE_KEY)));
  } catch {
    return createInitialState();
  }
}

function saveState() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    showToast("浏览器未能保存学习记录，请检查隐私模式或存储权限");
  }
  updateBadges();
}

function updateCountdown() {
  countdown.textContent = daysUntil(state.profile.targetExamDate);
}

function updateBadges() {
  const count = state.wrongBook.filter((item) => !item.resolved).length;
  wrongCountBadge.textContent = count;
  wrongCountBadge.hidden = count === 0;
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  if (toastTimer) window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2600);
}

function subjectName(subjectId) {
  return SUBJECTS[subjectId]?.name || "综合";
}

function mostCommon(items) {
  const counts = items.reduce((result, item) => {
    if (item) result[item] = (result[item] || 0) + 1;
    return result;
  }, {});
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || null;
}

function formatDate(value) {
  const date = value instanceof Date ? value : new Date(value);
  return `${date.getMonth() + 1}月${date.getDate()}日`;
}

function escapeAttribute(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

window.__XINGHANG__ = {
  getState: () => state,
  reset: () => {
    state = resetState();
    saveState();
    render();
  },
};
