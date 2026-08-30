const AMBIGUOUS_TERMS = [
  '一般', '通常', '正常', '有问题', '看一下', '调一下', '差不多', '大概',
  '感觉', '经验', '基本就是', '通常都是', '就好了', '没事', '差不离',
];

const COVERAGE_FIELDS = [
  'symptom', 'conditions', 'firstJudgment', 'judgmentReason', 'checkMethod',
  'normalStandard', 'abnormalStandard', 'branches', 'repair', 'safety',
  'postRepairValidation', 'counterexample',
];

const QUESTION_LIBRARY = [
  {
    category: 'safety_boundary',
    priority: 100,
    when: (text, coverage) => /(重启|断电|拆|换|高温|气压|旋转)/.test(text) && coverage.safety !== 'confirmed',
    question: '这个动作开始前，要停什么、断什么、等多久，谁才可以操作？',
    reason: '涉及设备动作，但安全边界还没有讲清。',
  },
  {
    category: 'occurrence_condition',
    priority: 98,
    when: (text, coverage) => coverage.conditions === 'missing',
    question: '这个现象是在什么工况、操作或维修之后出现的？哪些情况下你的判断不适用？',
    reason: '缺少发生条件和经验适用边界。',
  },
  {
    category: 'judgment_reason',
    priority: 96,
    when: (text, coverage) => coverage.firstJudgment !== 'missing' && coverage.judgmentReason === 'missing',
    question: '为什么第一步先查这里？你是根据什么现象排在其他原因前面？',
    reason: '已有第一判断，但没有判断依据。',
  },
  {
    category: 'check_method',
    priority: 95,
    when: (text, coverage) => coverage.checkMethod === 'missing',
    question: '具体看哪个位置、画面或部件？怎么检查，需要什么工具？',
    reason: '“看一下/检查”还不能让新人执行。',
  },
  {
    category: 'normal_standard',
    priority: 94,
    when: (text, coverage) => coverage.normalStandard === 'missing',
    question: '正常时具体是什么样？有没有数值、单位、允许范围或刷新频率？',
    reason: '缺少正常判据。',
  },
  {
    category: 'abnormal_standard',
    priority: 93,
    when: (text, coverage) => coverage.abnormalStandard === 'missing',
    question: '看到、听到或测到什么，才算异常？异常到什么程度必须停机？',
    reason: '缺少异常判据和停机边界。',
  },
  {
    category: 'abnormal_branch',
    priority: 92,
    when: (text, coverage) => coverage.branches === 'missing',
    question: '如果这一步正常，下一步查哪里？如果异常，又走哪条分支？',
    reason: '诊断链缺正常/异常分支。',
  },
  {
    category: 'repair_action',
    priority: 90,
    when: (text, coverage) => coverage.repair === 'missing',
    question: '确认这个原因后，具体怎么处理？请按准备、操作、复位一步一步说。',
    reason: '有判断但没有可执行维修动作。',
  },
  {
    category: 'post_repair_validation',
    priority: 89,
    when: (text, coverage) => coverage.postRepairValidation !== 'confirmed',
    question: '处理后看哪几个现象、观察多久，达到什么才算真正修好？',
    reason: '缺维修后验证方法或观察时长。',
  },
  {
    category: 'counterexample',
    priority: 86,
    when: (text, coverage) => coverage.counterexample === 'missing',
    question: '有没有“看起来像这个原因，其实是另一个原因”的误判案例？怎么区分？',
    reason: '缺反例和新人防误判经验。',
  },
];

function textOf(interview) {
  return (interview.entries || []).map((entry) => entry.text || '').join('\n');
}

function includesAny(text, patterns) {
  return patterns.some((pattern) => pattern.test(text));
}

export function inferCoverage(interview) {
  const text = textOf(interview);
  const coverage = Object.fromEntries(COVERAGE_FIELDS.map((field) => [field, 'missing']));

  if (text.length > 4) coverage.symptom = 'partial';
  if (includesAny(text, [/现象/, /画面/, /报警/, /不喷/, /漏气/, /堵花/, /高温/])) coverage.symptom = 'confirmed';
  if (includesAny(text, [/情况下/, /时候/, /工况/, /生产时/, /维修后/, /刚.*后/, /短期/, /反复/])) coverage.conditions = 'partial';
  if (includesAny(text, [/先看/, /先查/, /优先/, /第一/, /判断/])) coverage.firstJudgment = 'partial';
  if (includesAny(text, [/因为/, /所以/, /对应/, /说明/, /区分/, /根据/])) coverage.judgmentReason = 'partial';
  if (includesAny(text, [/检查/, /观察/, /主屏/, /报警区/, /网口/, /网线/, /测量/, /听/])) coverage.checkMethod = 'partial';
  if (includesAny(text, [/正常.*\d/, /\d.*秒/, /\d.*℃/, /范围/, /应该是/, /刷新一次/])) coverage.normalStandard = 'confirmed';
  else if (/正常/.test(text)) coverage.normalStandard = 'partial';
  if (includesAny(text, [/异常/, /停止刷新/, /报警/, /不工作/, /复发/, /越来越频繁/])) coverage.abnormalStandard = 'partial';
  if (includesAny(text, [/如果.*正常/, /如果.*异常/, /一个.*两个/, /单个.*同一通道/, /否则/, /下一步/])) coverage.branches = 'confirmed';
  if (includesAny(text, [/处理/, /更换/, /清理/, /重启/, /修复/, /调整/])) coverage.repair = 'partial';
  if (includesAny(text, [/安全/, /断电/, /停机/, /防止误启动/, /受训/, /等20秒/])) coverage.safety = 'partial';
  if (includesAny(text, [/算恢复/, /算修好/, /报警消失/, /恢复工作/, /验证/, /观察.*分钟/, /观察.*小时/])) coverage.postRepairValidation = 'partial';
  if (includesAny(text, [/看起来像/, /其实是/, /误判/, /网线.*类似/, /不能只/])) coverage.counterexample = 'confirmed';

  const prior = interview.coverage || {};
  for (const field of COVERAGE_FIELDS) {
    if (prior[field] === 'confirmed') coverage[field] = 'confirmed';
    else if (prior[field] === 'partial' && coverage[field] === 'missing') coverage[field] = 'partial';
  }
  return coverage;
}

export function findAmbiguities(interview) {
  const findings = [];
  for (const entry of interview.entries || []) {
    const matches = AMBIGUOUS_TERMS.filter((term) => (entry.text || '').includes(term));
    if (!matches.length) continue;
    findings.push({
      entryId: entry.id,
      text: entry.text,
      matchedTerms: matches,
      problem: `出现模糊表达“${matches.join('、')}”，需要补条件、判据或动作细节。`,
      severity: matches.some((term) => ['正常', '有问题', '就好了'].includes(term)) ? 'high' : 'medium',
    });
  }
  return findings;
}

export function analyzeInterview(interview) {
  const text = textOf(interview);
  const coverage = inferCoverage(interview);
  if (!text.trim()) {
    return { provider: 'mock', coverage, ambiguities: [], questions: [] };
  }
  const answeredCategories = new Set(
    (interview.activeQuestions || [])
      .filter((question) => question.status === 'answered')
      .map((question) => question.category),
  );
  const questions = QUESTION_LIBRARY
    .filter((item) => item.when(text, coverage) && !answeredCategories.has(item.category))
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 3)
    .map((item, index) => ({
      id: `q_${Date.now()}_${index}`,
      category: item.category,
      priority: item.priority,
      question: item.question,
      reason: item.reason,
      triggerText: findAmbiguities(interview)[0]?.matchedTerms?.join('、') || '',
      status: 'open',
      answerEntryIds: [],
      generatedBy: 'mock',
      humanEdited: false,
    }));

  return {
    provider: 'mock',
    coverage,
    ambiguities: findAmbiguities(interview),
    questions,
  };
}

function labelForField(field) {
  return {
    symptom: '故障现象',
    conditions: '发生条件/适用边界',
    firstJudgment: '第一判断',
    judgmentReason: '判断依据',
    checkMethod: '检查方法',
    normalStandard: '正常标准',
    abnormalStandard: '异常标准',
    branches: '正常/异常分支',
    repair: '维修动作',
    safety: '安全边界',
    postRepairValidation: '维修后验证',
    counterexample: '反例/误判',
  }[field] || field;
}

function followUpQuestionForField(field) {
  return {
    symptom: '请把故障现象说到能和相似故障区分：具体看到、听到或测到什么？',
    conditions: '这个现象在什么工况、操作或维修之后出现？哪些情况下这套判断不适用？',
    firstJudgment: '看到这个现象时，第一步先怀疑哪个方向、先查哪里？',
    judgmentReason: '为什么第一步先查这里？你根据什么证据把它排在其他原因前面？',
    checkMethod: '具体看哪个位置、画面或部件？怎么检查，需要什么工具？',
    normalStandard: '正常时具体是什么样？有没有数值、单位、允许范围或刷新频率？',
    abnormalStandard: '什么表现才算异常？异常到什么程度必须停机或换件？',
    branches: '如果这一步正常，下一步查哪里？如果异常，又走哪条分支？',
    repair: '确认原因后怎么处理？请按准备、操作、复位一步一步说。',
    safety: '操作前要停什么、断什么、等多久，谁才可以操作？',
    postRepairValidation: '处理后看哪几个现象、观察多久，达到什么才算真正修好？',
    counterexample: '有没有“看起来像这个原因，其实是另一个原因”的误判案例？怎么区分？',
  }[field] || `请老师傅把“${labelForField(field)}”讲到新人可以照做。`;
}

export function structureInterview(interview) {
  const text = textOf(interview);
  const coverage = inferCoverage(interview);
  const incompleteFields = Object.entries(coverage).filter(([, value]) => value !== 'confirmed');
  const missingFields = incompleteFields.map(([field]) => labelForField(field));
  const ambiguities = findAmbiguities(interview);

  const highValue = [];
  if (/单个.*(相机|画面)|一个画面/.test(text)) highValue.push('单画面异常时优先缩小到对应相机方向');
  if (/(两个|配对).*画面.*(算力|通道)/.test(text)) highValue.push('同通道配对画面同时异常时优先缩小到算力通道方向');
  if (/网口|网线/.test(text)) highValue.push('物理连接问题会伪装成相机或算力盒异常，更换前必须排除');
  if (/0\.5|0.5|1秒/.test(text)) highValue.push('正常画面刷新约0.5～1秒/次，可作为现场判据');
  if (/反复|频率.*升|越来越频繁/.test(text)) highValue.push('短时恢复但复发加密时不能长期依赖重启');
  if (!highValue.length && text.trim()) highValue.push('已保留本次老师傅原话，等待补齐判断依据后转为知识');

  const confirmed = (interview.entries || [])
    .filter((entry) => entry.confirmedByExpert)
    .slice(-4)
    .map((entry) => entry.text);

  const followUpTasks = incompleteFields.slice(0, 5).map(([field], index) => ({
    id: `task_${interview.id}_${index}`,
    equipmentId: interview.equipmentId,
    interviewId: interview.id,
    knowledgeItemId: null,
    type: 'follow_up_interview',
    severity: index < 2 ? 'high' : 'medium',
    title: `补充${labelForField(field)}`,
    questions: [followUpQuestionForField(field)],
    reason: `本次采访中的${labelForField(field)}仍未达到已确认状态。`,
    status: 'open',
    assignee: 'user_wjz',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    revision: 1,
  }));

  return {
    highValue,
    ordinary: /说明书|厂家/.test(text) ? ['已提到可从厂家资料核对的设备知识，下一轮优先查资料而非重复询问'] : [],
    confirmed,
    inferred: [],
    ambiguous: ambiguities.map((item) => item.problem),
    conflicts: /485/.test(text) && /(不确定|不知道|待确认)/.test(text) ? ['相机485故障与普通相机故障的正式定义仍未确认'] : [],
    missing: missingFields,
    summary: `本次保留${(interview.entries || []).length}条记录，萃取${highValue.length}条高价值线索，仍有${missingFields.length}类知识需要补充。`,
    coverage,
    followUpTasks,
    diagnosticDraft: buildDiagnosticDraft(interview, coverage),
  };
}

function buildDiagnosticDraft(interview, coverage) {
  const text = textOf(interview);
  const isCommunication = /通讯|画面|相机|算力/.test(text);
  if (!isCommunication) {
    return {
      faultName: interview.title || '待命名故障',
      symptoms: [],
      firstDirection: '',
      nodes: [],
      postRepairValidation: { method: '', duration: null, successCriteria: [] },
      draft: true,
    };
  }
  return {
    faultName: '主屏相机画面不刷新/通讯异常',
    symptoms: ['相机画面停止刷新或出现通讯报警'],
    firstDirection: '先看停止刷新的画面范围，再区分单相机与算力通道方向',
    nodes: [
      {
        id: 'draft_scope',
        order: 1,
        question: '是单个画面不刷新，还是同一通道两个配对画面都不刷新？',
        normalState: coverage.normalStandard === 'confirmed' ? '画面按已确认频率刷新' : '',
        abnormalState: '画面持续停止刷新',
        branches: {
          abnormal_single: '检查对应相机及连接',
          abnormal_pair: '检查对应算力通道/算力盒及连接',
        },
      },
    ],
    postRepairValidation: {
      method: coverage.postRepairValidation !== 'missing' ? '检查画面刷新、报警和对应通道运行' : '',
      duration: null,
      successCriteria: coverage.postRepairValidation !== 'missing' ? ['画面恢复', '报警消失', '通道工作'] : [],
    },
    draft: true,
  };
}

function percent(values) {
  if (!values.length) return 0;
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

function statusScore(status) {
  return { missing: 0, partial: 45, reviewed: 78, verified: 100 }[status] ?? 0;
}

export function auditEquipment(equipment, knowledgeItems = [], interviews = [], reviewTasks = []) {
  const equipmentScore = percent(Object.values(equipment.modules || {}).map(statusScore));
  const faultItems = knowledgeItems.filter((item) => item.equipmentId === equipment.id && item.type === 'fault_diagnosis');
  const parameterItems = knowledgeItems.filter((item) => item.equipmentId === equipment.id && item.type === 'parameter');
  const completedInterviews = interviews.filter((item) => item.equipmentId === equipment.id && item.status === 'completed');
  const issues = [];

  const faultScores = faultItems.map((item) => {
    const chain = item.diagnosticChain || {};
    const checks = [
      (chain.symptoms || []).length > 0,
      Boolean(chain.firstDirection),
      Boolean(chain.firstDirectionReason),
      (chain.nodes || []).length > 0,
      (chain.causes || []).length > 0,
      (chain.repairPlans || []).length > 0,
      Boolean(chain.postRepairValidation?.method),
      Boolean(chain.postRepairValidation?.duration),
    ];
    if (!(chain.occurrenceConditions || []).length) {
      issues.push({ severity: 'orange', code: 'MISSING_CONDITIONS', title: `${item.title}缺发生条件`, detail: '经验可能无法安全推广到其他工况。', suggestedQuestion: '这个故障在什么工况或操作之后更容易发生？', targetId: item.id });
    }
    if (!chain.postRepairValidation?.duration) {
      issues.push({ severity: 'red', code: 'MISSING_POST_REPAIR_DURATION', title: `${item.title}缺复测观察时长`, detail: '短期恢复可能是假恢复。', suggestedQuestion: '恢复后至少观察多久，才能判断不是短时假恢复？', targetId: item.id });
    }
    if (!(item.counterexampleIds || []).length && !item.searchText?.includes('网线')) {
      issues.push({ severity: 'orange', code: 'MISSING_COUNTEREXAMPLE', title: `${item.title}缺反例`, detail: '新人容易把相似现象直接等同于一个根因。', suggestedQuestion: '有没有看起来一样、实际根因不同的案例？', targetId: item.id });
    }
    if (!item.review?.otherExpertVerified) {
      issues.push({ severity: 'orange', code: 'NO_CROSS_VALIDATION', title: `${item.title}尚未经过第二位老师傅验证`, detail: '当前仍是一位老师傅的已确认经验。', suggestedQuestion: '请另一位老师傅说明同类故障的第一检查方向。', targetId: item.id });
    }
    return Math.round((checks.filter(Boolean).length / checks.length) * 100);
  });

  for (const task of reviewTasks.filter((item) => item.equipmentId === equipment.id && item.status === 'open')) {
    if (task.severity === 'high') {
      issues.push({ severity: 'red', code: 'OPEN_HIGH_TASK', title: task.title, detail: task.reason, suggestedQuestion: task.questions?.[0] || '', targetId: task.id });
    }
  }

  const multiContributorClaims = knowledgeItems
    .filter((item) => item.equipmentId === equipment.id)
    .flatMap((item) => item.claims || [])
    .filter((claim) => (claim.contributorIds || []).length > 1).length;

  const scores = {
    equipment: equipmentScore,
    fault: faultScores.length ? percent(faultScores) : 0,
    repair: faultItems.length ? percent(faultItems.map((item) => (item.diagnosticChain?.repairPlans || []).length ? 62 : 0)) : 0,
    parameter: parameterItems.length ? 78 : 0,
    cases: Math.min(100, completedInterviews.length * 35),
    crossValidation: multiContributorClaims ? Math.min(100, multiContributorClaims * 25) : 10,
  };

  const uniqueIssues = issues.filter((issue, index, list) => list.findIndex((item) => `${item.code}:${item.targetId}` === `${issue.code}:${issue.targetId}`) === index);
  return {
    id: `audit_${equipment.id}_${Date.now()}`,
    equipmentId: equipment.id,
    generatedAt: new Date().toISOString(),
    scores,
    issues: uniqueIssues.sort((a, b) => {
      const rank = { red: 0, orange: 1, green: 2 };
      return rank[a.severity] - rank[b.severity];
    }),
    summary: uniqueIssues.some((item) => item.severity === 'red') ? '存在影响新人执行或知识可信度的严重缺口。' : '核心诊断链可用，继续补案例与交叉验证。',
  };
}

export function searchKnowledge(items, equipment, query) {
  const keyword = (query || '').trim().toLowerCase();
  return items.filter((item) => {
    if (equipment && item.equipmentId !== equipment) return false;
    if (!keyword) return true;
    const haystack = [item.title, item.summary, item.searchText, ...(item.tags || [])].join(' ').toLowerCase();
    return keyword.split(/\s+/).every((part) => haystack.includes(part));
  });
}
