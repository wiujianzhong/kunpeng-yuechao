import { DEFAULT_MISSIONS, QUESTIONS, SKILLS, SUBJECTS, getQuestion } from "./data.js";

export const STORAGE_KEY = "xinghang-gaokao-state-v1";

const REVIEW_INTERVALS_MINUTES = [10, 24 * 60, 3 * 24 * 60, 7 * 24 * 60, 14 * 24 * 60, 30 * 24 * 60];

export function createInitialState(now = new Date()) {
  return {
    version: 1,
    profile: {
      name: "伍润芝",
      grade: "准高三",
      targetExamDate: "2027-06-07T09:00:00+08:00",
      targetScore: 580,
    },
    mastery: Object.fromEntries(SKILLS.map((skill) => [skill.id, skill.mastery])),
    attempts: [],
    wrongBook: [],
    reviewQueue: [],
    examHistory: [],
    completedMissions: [],
    stats: {
      xp: 0,
      streak: 0,
      totalMinutes: 0,
      lastStudyDate: null,
    },
    activeDate: toDateKey(now),
    createdAt: now.toISOString(),
    onboardingCompleted: false,
  };
}

export function hydrateState(rawState, now = new Date()) {
  const initial = createInitialState(now);
  if (!rawState || rawState.version !== 1) return initial;
  const savedProfile = rawState.profile || {};

  return {
    ...initial,
    ...rawState,
    profile: { ...initial.profile, ...savedProfile, name: !savedProfile.name || savedProfile.name === "星航员" ? "伍润芝" : savedProfile.name },
    mastery: { ...initial.mastery, ...(rawState.mastery || {}) },
    stats: { ...initial.stats, ...(rawState.stats || {}) },
    attempts: Array.isArray(rawState.attempts) ? rawState.attempts : [],
    wrongBook: Array.isArray(rawState.wrongBook) ? rawState.wrongBook : [],
    reviewQueue: Array.isArray(rawState.reviewQueue) ? rawState.reviewQueue : [],
    examHistory: Array.isArray(rawState.examHistory) ? rawState.examHistory : [],
    completedMissions: Array.isArray(rawState.completedMissions) ? rawState.completedMissions : [],
  };
}

export function toDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function daysUntil(targetDate, now = new Date()) {
  const distance = new Date(targetDate).getTime() - now.getTime();
  return Math.max(0, Math.ceil(distance / 86_400_000));
}

export function gradeAnswer(question, rawAnswer) {
  if (!question) return { correct: false, normalized: "", reason: "题目不存在" };

  if (question.type === "choice") {
    const selected = Number(rawAnswer);
    return {
      correct: Number.isInteger(selected) && selected === Number(question.answer),
      normalized: Number.isInteger(selected) ? selected : null,
    };
  }

  const normalized = normalizeAnswer(rawAnswer);
  const accepted = [...(question.acceptable || []), String(question.answer)].map(normalizeAnswer);

  if (question.type === "numeric") {
    const numericInput = parseNumericAnswer(normalized);
    const numericAnswer = Number(question.answer);
    const directMatch = accepted.includes(normalized);
    const numericMatch = Number.isFinite(numericInput) && Number.isFinite(numericAnswer)
      ? Math.abs(numericInput - numericAnswer) <= Math.max(1e-6, Math.abs(numericAnswer) * 1e-4)
      : false;
    return { correct: directMatch || numericMatch, normalized };
  }

  const keywords = question.keywords || [];
  const keywordHits = keywords.filter((keyword) => normalized.includes(normalizeAnswer(keyword))).length;
  return {
    correct: accepted.includes(normalized) || (keywords.length > 0 && keywordHits >= Math.ceil(keywords.length * 0.6)),
    normalized,
  };
}

export function normalizeAnswer(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[，,。；;：:\s]/g, "")
    .replace(/米每二次方秒|m\/s\^?2|m·s-2/g, "m/s²")
    .replace(/秒/g, "s")
    .replace(/安培|安/g, "a");
}

export function parseNumericAnswer(value) {
  const cleaned = String(value).replace(/[a-zA-Z²·/%]/g, "");
  if (String(value).includes("%")) {
    const percentage = Number(cleaned);
    return Number.isFinite(percentage) ? percentage / 100 : Number.NaN;
  }
  if (/^-?\d+(\.\d+)?\/-?\d+(\.\d+)?$/.test(cleaned)) {
    const [numerator, denominator] = cleaned.split("/").map(Number);
    return denominator === 0 ? Number.NaN : numerator / denominator;
  }
  return Number(cleaned);
}

export function bktUpdate(currentMastery, correct, difficulty = 2, hintsUsed = 0) {
  const current = clamp(Number(currentMastery) || 0, 5, 95);
  const prior = current / 100;
  const slip = clamp(0.08 + difficulty * 0.015, 0.08, 0.17);
  const guess = clamp(0.28 - difficulty * 0.035, 0.1, 0.25);
  const learn = 0.07;

  const posterior = correct
    ? (prior * (1 - slip)) / (prior * (1 - slip) + (1 - prior) * guess)
    : (prior * slip) / (prior * slip + (1 - prior) * (1 - guess));
  const learned = posterior + (1 - posterior) * learn;
  const rawTarget = learned * 100 - (correct ? hintsUsed * 0.8 : 0);
  const delta = clamp(rawTarget - current, correct ? 1 : -9, correct ? 7 : -2);
  return Math.round(clamp(current + delta, 5, 98));
}

export function diagnoseError(question, rawAnswer, responseSeconds = 0, hintsUsed = 0) {
  if (question?.type === "choice") {
    const mapped = question.errorByChoice?.[Number(rawAnswer)];
    if (mapped) return mapped;
  }
  if (responseSeconds > Math.max(180, (question?.estimatedSeconds || 90) * 2)) return "方法不熟";
  if (hintsUsed >= 2) return "知识漏洞";
  if (question?.type === "numeric") return "计算或单位";
  return "审题与判断";
}

export function recordAttempt(state, payload, now = new Date()) {
  const question = getQuestion(payload.questionId);
  if (!question) return { state, result: { correct: false, reason: "题目不存在" } };

  const result = gradeAnswer(question, payload.answer);
  const responseSeconds = Math.max(0, Number(payload.responseSeconds) || 0);
  const hintsUsed = Math.max(0, Number(payload.hintsUsed) || 0);
  const errorType = result.correct ? null : diagnoseError(question, payload.answer, responseSeconds, hintsUsed);
  const oldMastery = state.mastery[question.skill] ?? 50;
  const newMastery = bktUpdate(oldMastery, result.correct, question.difficulty, hintsUsed);
  const attempt = {
    id: `${question.id}-${now.getTime()}`,
    questionId: question.id,
    subject: question.subject,
    skill: question.skill,
    answer: payload.answer,
    correct: result.correct,
    errorType,
    hintsUsed,
    responseSeconds,
    mode: payload.mode || "practice",
    createdAt: now.toISOString(),
    dateKey: toDateKey(now),
  };

  const wrongBook = updateWrongBook(state.wrongBook, question, attempt, now);
  const reviewQueue = updateReviewQueue(state.reviewQueue, question, result.correct, hintsUsed, now);
  const stats = updateStudyStats(state.stats, result.correct ? 8 : 3, Math.max(1, Math.round(responseSeconds / 60)), now);

  return {
    state: {
      ...state,
      mastery: { ...state.mastery, [question.skill]: newMastery },
      attempts: [...state.attempts, attempt],
      wrongBook,
      reviewQueue,
      stats,
      onboardingCompleted: state.attempts.length >= 7 || state.onboardingCompleted,
      activeDate: toDateKey(now),
    },
    result: {
      ...result,
      errorType,
      masteryBefore: oldMastery,
      masteryAfter: newMastery,
      attempt,
    },
  };
}

function updateWrongBook(wrongBook, question, attempt, now) {
  const existing = wrongBook.find((item) => item.questionId === question.id);
  if (attempt.correct) {
    if (!existing) return wrongBook;
    return wrongBook.map((item) => item.questionId === question.id
      ? {
          ...item,
          correctAfterWrong: (item.correctAfterWrong || 0) + 1,
          resolved: (item.correctAfterWrong || 0) + 1 >= 2,
          lastReviewedAt: now.toISOString(),
        }
      : item);
  }

  if (existing) {
    return wrongBook.map((item) => item.questionId === question.id
      ? {
          ...item,
          count: item.count + 1,
          errorType: attempt.errorType,
          lastWrongAt: now.toISOString(),
          correctAfterWrong: 0,
          resolved: false,
        }
      : item);
  }

  return [
    {
      questionId: question.id,
      subject: question.subject,
      skill: question.skill,
      count: 1,
      errorType: attempt.errorType,
      firstWrongAt: now.toISOString(),
      lastWrongAt: now.toISOString(),
      correctAfterWrong: 0,
      resolved: false,
    },
    ...wrongBook,
  ];
}

function updateReviewQueue(reviewQueue, question, correct, hintsUsed, now) {
  const existing = reviewQueue.find((item) => item.questionId === question.id);
  let stage = existing?.stage ?? -1;
  if (!correct) stage = 0;
  else if (hintsUsed >= 2) stage = Math.max(0, stage);
  else stage = Math.min(stage + 1, REVIEW_INTERVALS_MINUTES.length - 1);

  const dueAt = new Date(now.getTime() + REVIEW_INTERVALS_MINUTES[stage] * 60_000).toISOString();
  const updated = {
    questionId: question.id,
    subject: question.subject,
    skill: question.skill,
    stage,
    dueAt,
    lastResult: correct ? "correct" : "wrong",
    lastReviewedAt: now.toISOString(),
  };

  return existing
    ? reviewQueue.map((item) => item.questionId === question.id ? updated : item)
    : [updated, ...reviewQueue];
}

function updateStudyStats(stats, xpGain, minutes, now) {
  const today = toDateKey(now);
  const yesterday = toDateKey(new Date(now.getTime() - 86_400_000));
  let streak = stats.streak || 0;
  if (stats.lastStudyDate !== today) {
    streak = stats.lastStudyDate === yesterday ? streak + 1 : 1;
  }
  return {
    ...stats,
    xp: (stats.xp || 0) + xpGain,
    totalMinutes: (stats.totalMinutes || 0) + minutes,
    streak,
    lastStudyDate: today,
  };
}

export function getDueReviews(state, now = new Date()) {
  const timestamp = now.getTime();
  return state.reviewQueue
    .filter((item) => new Date(item.dueAt).getTime() <= timestamp)
    .sort((a, b) => new Date(a.dueAt) - new Date(b.dueAt));
}

export function getWeakSkills(state, limit = 5, subject = null) {
  const practiceReadySkillIds = new Set(QUESTIONS.map((question) => question.skill));
  return SKILLS
    .filter((skill) => !subject || skill.subject === subject)
    .filter((skill) => practiceReadySkillIds.has(skill.id))
    .map((skill) => ({ ...skill, mastery: state.mastery[skill.id] ?? skill.mastery }))
    .sort((a, b) => a.mastery - b.mastery || b.priority - a.priority)
    .slice(0, limit);
}

export function selectPracticeQuestions(state, options = {}) {
  const { subject = "all", skill = null, limit = 5, onlyWrong = false, questionIds = null } = options;
  const attemptedCounts = countBy(state.attempts, "questionId");
  const wrongIds = new Set(state.wrongBook.filter((item) => !item.resolved).map((item) => item.questionId));

  return QUESTIONS
    .filter((question) => subject === "all" || question.subject === subject)
    .filter((question) => !skill || question.skill === skill)
    .filter((question) => !onlyWrong || wrongIds.has(question.id))
    .filter((question) => !questionIds || questionIds.includes(question.id))
    .map((question) => ({
      ...question,
      _mastery: state.mastery[question.skill] ?? 50,
      _attempted: attemptedCounts[question.id] || 0,
    }))
    .sort((a, b) => a._mastery - b._mastery || a._attempted - b._attempted || b.difficulty - a.difficulty)
    .slice(0, limit);
}

export function buildDailyMissions(state, now = new Date()) {
  const today = toDateKey(now);
  const completedToday = new Set(
    state.completedMissions.filter((item) => item.dateKey === today).map((item) => item.missionId),
  );
  const dueCount = getDueReviews(state, now).length;
  const weakest = getWeakSkills(state, 1)[0];

  return DEFAULT_MISSIONS.map((mission) => {
    if (mission.id === "mission-weak" && weakest) {
      return {
        ...mission,
        subject: weakest.subject,
        subtitle: `${weakest.name} · 3 题`,
        skill: weakest.id,
        completed: completedToday.has(mission.id),
      };
    }
    if (mission.id === "mission-review") {
      return {
        ...mission,
        subtitle: dueCount ? `${dueCount} 道已到复习时间` : "今天暂无到期题，做 2 道保温题",
        dueCount,
        completed: completedToday.has(mission.id),
      };
    }
    return { ...mission, completed: completedToday.has(mission.id) };
  });
}

export function completeMission(state, missionId, now = new Date()) {
  const today = toDateKey(now);
  const exists = state.completedMissions.some((item) => item.missionId === missionId && item.dateKey === today);
  if (exists) return state;
  const mission = buildDailyMissions(state, now).find((item) => item.id === missionId);
  if (!mission) return state;
  return {
    ...state,
    completedMissions: [...state.completedMissions, { missionId, dateKey: today, completedAt: now.toISOString() }],
    stats: updateStudyStats(state.stats, mission.xp, mission.minutes, now),
  };
}

export function generateExam(state, options = {}) {
  const size = clamp(Number(options.size) || 8, 4, QUESTIONS.length);
  const seed = Number(options.seed) || Date.now();
  const requestedSubject = Object.prototype.hasOwnProperty.call(SUBJECTS, options.subject) ? options.subject : null;
  if (requestedSubject) {
    const candidates = seededShuffle(
      QUESTIONS.filter((question) => question.subject === requestedSubject),
      seed + requestedSubject.length,
    ).sort((a, b) => (state.mastery[a.skill] ?? 50) - (state.mastery[b.skill] ?? 50));
    const selected = candidates.slice(0, Math.min(size, candidates.length));
    return {
      id: `EXAM-${seed}`,
      title: options.title || `${SUBJECTS[requestedSubject].name}高考节奏卷`,
      durationMinutes: Number(options.durationMinutes) || 60,
      questionIds: seededShuffle(selected, seed + 7).map((question) => question.id),
      totalPoints: selected.reduce((sum, question) => sum + question.points, 0),
      createdAt: new Date().toISOString(),
    };
  }
  const priority = { math: 0.23, physics: 0.18, chemistry: 0.16, biology: 0.15, chinese: 0.14, english: 0.14 };
  const subjects = Object.keys(priority);
  const selected = [];
  const used = new Set();

  for (const subject of subjects) {
    const count = Math.max(1, Math.round(size * priority[subject]));
    const candidates = seededShuffle(
      QUESTIONS.filter((question) => question.subject === subject),
      seed + subject.length,
    ).sort((a, b) => (state.mastery[a.skill] ?? 50) - (state.mastery[b.skill] ?? 50));
    for (const question of candidates.slice(0, count)) {
      if (selected.length < size && !used.has(question.id)) {
        selected.push(question);
        used.add(question.id);
      }
    }
  }

  const remaining = seededShuffle(QUESTIONS.filter((question) => !used.has(question.id)), seed + 99);
  while (selected.length < size && remaining.length) selected.push(remaining.shift());

  return {
    id: `EXAM-${seed}`,
    title: options.title || "高考六科联合小卷",
    durationMinutes: Number(options.durationMinutes) || 25,
    questionIds: seededShuffle(selected, seed + 7).map((question) => question.id),
    totalPoints: selected.reduce((sum, question) => sum + question.points, 0),
    createdAt: new Date().toISOString(),
  };
}

export function scoreExam(exam, answers = {}) {
  const details = exam.questionIds.map((questionId) => {
    const question = getQuestion(questionId);
    const result = gradeAnswer(question, answers[questionId]);
    return {
      questionId,
      correct: result.correct,
      points: result.correct ? question.points : 0,
      maxPoints: question.points,
      subject: question.subject,
      skill: question.skill,
    };
  });
  const score = details.reduce((sum, item) => sum + item.points, 0);
  const total = details.reduce((sum, item) => sum + item.maxPoints, 0);
  return {
    score,
    total,
    percentage: total ? Math.round((score / total) * 100) : 0,
    correctCount: details.filter((item) => item.correct).length,
    details,
  };
}

export function addExamResult(state, exam, result, answers, now = new Date()) {
  return {
    ...state,
    examHistory: [
      ...state.examHistory,
      {
        examId: exam.id,
        title: exam.title,
        score: result.score,
        total: result.total,
        percentage: result.percentage,
        correctCount: result.correctCount,
        questionCount: exam.questionIds.length,
        answers,
        details: result.details,
        completedAt: now.toISOString(),
      },
    ],
  };
}

export function getSubjectSummary(state, subject) {
  const skills = SKILLS.filter((skill) => skill.subject === subject);
  const mastery = skills.length
    ? Math.round(skills.reduce((sum, skill) => sum + (state.mastery[skill.id] ?? skill.mastery), 0) / skills.length)
    : 0;
  const attempts = state.attempts.filter((attempt) => attempt.subject === subject);
  const correct = attempts.filter((attempt) => attempt.correct).length;
  return {
    mastery,
    attempts: attempts.length,
    accuracy: attempts.length ? Math.round((correct / attempts.length) * 100) : null,
    weakest: getWeakSkills(state, 1, subject)[0],
  };
}

export function getWeeklyReport(state, now = new Date()) {
  const start = new Date(now.getTime() - 6 * 86_400_000);
  const recent = state.attempts.filter((attempt) => new Date(attempt.createdAt) >= start);
  const correct = recent.filter((attempt) => attempt.correct).length;
  const errorCounts = countBy(recent.filter((attempt) => !attempt.correct), "errorType");
  const topError = Object.entries(errorCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "暂无足够数据";
  const weakest = getWeakSkills(state, 3);
  return {
    attempts: recent.length,
    accuracy: recent.length ? Math.round((correct / recent.length) * 100) : 0,
    activeDays: new Set(recent.map((attempt) => attempt.dateKey)).size,
    topError,
    weakest,
    trend: Array.from({ length: 7 }, (_, index) => {
      const date = new Date(start.getTime() + index * 86_400_000);
      const key = toDateKey(date);
      const dayAttempts = recent.filter((attempt) => attempt.dateKey === key);
      return {
        date: key,
        label: ["日", "一", "二", "三", "四", "五", "六"][date.getDay()],
        attempts: dayAttempts.length,
        correct: dayAttempts.filter((attempt) => attempt.correct).length,
      };
    }),
  };
}

export function resetState(now = new Date()) {
  return createInitialState(now);
}

function seededShuffle(items, seed) {
  const result = [...items];
  let value = seed % 2_147_483_647;
  if (value <= 0) value += 2_147_483_646;
  const random = () => ((value = (value * 16_807) % 2_147_483_647) - 1) / 2_147_483_646;
  for (let index = result.length - 1; index > 0; index -= 1) {
    const target = Math.floor(random() * (index + 1));
    [result[index], result[target]] = [result[target], result[index]];
  }
  return result;
}

function countBy(items, key) {
  return items.reduce((result, item) => {
    const value = item[key] || "unknown";
    result[value] = (result[value] || 0) + 1;
    return result;
  }, {});
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}
