import { loadState, saveState, resetState, STORAGE_KEY } from './data.js';
import { analyzeInterview, structureInterview, auditEquipment, searchKnowledge } from './ai.js';

let state = loadState();
let currentView = 'home';
let entryKind = 'expert_quote';
let answeringQuestionId = null;
let photoData = null;
let searchQuery = '';
let confirmCallback = null;
let toastTimer = null;

const appMain = document.querySelector('#app-main');
const viewTitle = document.querySelector('#view-title');
const viewEyebrow = document.querySelector('#view-eyebrow');
const autosaveState = document.querySelector('#autosave-state');
const interviewDialog = document.querySelector('#interview-dialog');
const sourceDialog = document.querySelector('#source-dialog');
const photoDialog = document.querySelector('#photo-dialog');
const confirmDialog = document.querySelector('#confirm-dialog');
const toast = document.querySelector('#toast');

const VIEW_META = {
  home: ['今日工作台', '把老师傅的判断过程留下来'],
  interview: ['AI萃取采访', '每轮只追当前最重要的1～3个问题'],
  equipment: ['设备与知识', '从现象进入老师傅的诊断路径'],
  audit: ['知识体检', '找出逻辑断点、冲突和下一轮任务'],
};

const KNOWLEDGE_TYPE_LABEL = {
  fault: '故障诊断', repair: '维修方法', inspection: '检查方法', parameter: '参数',
  principle: '设备原理', case: '历史案例', other: '其他',
};

const ENTRY_KIND_LABEL = {
  expert_quote: '老师傅原话',
  answer: '追问回答',
  field_observation: '现场观察',
  transcript_import: '转写文本',
  interviewer_note: '采访人笔记',
};

const MODULE_LABEL = {
  identity: '设备身份证', structure: '设备结构', principle: '工作原理', basicProcessRole: '基础工艺作用',
  controlSystem: '控制系统', parameters: '参数体系', normalState: '正常状态', symptoms: '异常现象',
  diagnosis: '故障诊断', repair: '维修方法', inspectionTechniques: '检查手法', precautions: '注意事项',
  cases: '历史案例', counterexamples: '反例/误判', expertExperience: '老师傅经验', rawSources: '原始资料',
  knowledgeGaps: '待补知识',
};

const STATUS_LABEL = { missing: '缺失', partial: '待完善', reviewed: '已整理', verified: '已验证', confirmed: '已确认' };

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function uid(prefix) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

function formatTime(value) {
  if (!value) return '未记录';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false }).format(date);
}

function getEquipment(id) { return state.equipment.find((item) => item.id === id); }
function getExpert(id) { return state.experts.find((item) => item.id === id); }
function getProcess(id) { return state.processes.find((item) => item.id === id); }
function getInterview(id) { return state.interviews.find((item) => item.id === id); }

function activeInterview() {
  return getInterview(state.meta.activeInterviewId) || state.interviews[0] || null;
}

function persist(message = '') {
  autosaveState.classList.add('is-saving');
  autosaveState.innerHTML = '<i></i>正在保存';
  try {
    saveState(state);
    window.setTimeout(() => {
      autosaveState.classList.remove('is-saving');
      autosaveState.innerHTML = '<i></i>已自动保存';
    }, 220);
    if (message) showToast(message);
    return true;
  } catch (error) {
    console.error(error);
    autosaveState.innerHTML = '<i></i>保存失败';
    showToast('本地空间可能已满，请先导出数据或减少照片。');
    return false;
  }
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add('is-visible');
  toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 2600);
}

function setView(view) {
  currentView = VIEW_META[view] ? view : 'home';
  document.querySelectorAll('[data-view]').forEach((button) => button.classList.toggle('is-active', button.dataset.view === currentView));
  viewEyebrow.textContent = VIEW_META[currentView][0];
  viewTitle.textContent = VIEW_META[currentView][1];
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function render() {
  if (currentView === 'home') renderHome();
  else if (currentView === 'interview') renderInterview();
  else if (currentView === 'equipment') renderEquipment();
  else if (currentView === 'audit') renderAudit();
}

function renderHome() {
  const interview = activeInterview();
  const equipment = interview ? getEquipment(interview.equipmentId) : null;
  const openTasks = state.reviewTasks.filter((task) => task.status === 'open');
  const completedInterviews = state.interviews.filter((item) => item.status === 'completed').length;
  const confirmedClaims = state.knowledgeItems.flatMap((item) => item.claims || []).filter((claim) => claim.humanConfirmed).length;
  const coverage = interview ? coveragePercent(interview.coverage) : 0;

  appMain.innerHTML = `
    <section class="hero-strip">
      <div class="hero-panel">
        <span class="hero-kicker">EXPERIENCE → EVIDENCE → KNOWLEDGE</span>
        <h2>不是收集答案，<br>是还原判断过程。</h2>
        <p>老师傅负责讲真实经验，采访人负责理解与确认，AI专门发现“不清楚”。每一次采访都要留下可追、可审、可验证的诊断路径。</p>
        <div class="hero-actions">
          <button class="primary-button" data-action="continue-interview" type="button">${interview?.status === 'in_progress' ? '继续当前采访' : '开始一次采访'}</button>
          <button class="secondary-button" data-action="open-audit" type="button">查看知识缺口</button>
        </div>
      </div>
      <aside class="today-card">
        <div class="section-heading">
          <div><h2>今日采访</h2><p>最后编辑 ${formatTime(state.meta.lastSavedAt)}</p></div>
          <span class="count-chip">${state.interviews.filter((item) => item.status === 'in_progress').length}</span>
        </div>
        ${interview ? `
          <div class="interview-resume">
            <h3>${escapeHtml(interview.title)}</h3>
            <p>${escapeHtml(equipment?.model || '')} · ${escapeHtml(getExpert(interview.expertIds?.[0])?.name || '未指定老师傅')} · ${KNOWLEDGE_TYPE_LABEL[interview.knowledgeType] || '其他'}</p>
            <div class="mini-progress"><i style="width:${coverage}%"></i></div>
            <div class="resume-footer"><small>诊断链 ${coverage}%</small><button class="quiet-button" data-action="continue-interview" type="button">继续</button></div>
          </div>
        ` : `<div class="empty-state"><strong>今天还没有采访</strong><p>先选设备、型号和老师傅，只需一个主题就能开始。</p><button class="primary-button" data-action="new-interview" type="button">开始采访</button></div>`}
      </aside>
    </section>

    <section class="metrics-grid" aria-label="知识概览">
      ${metricCard('设备样本', state.equipment.length, '首批从JWF0019A开始')}
      ${metricCard('已确认结论', confirmedClaims, '仍保留来源与适用版本')}
      ${metricCard('完成采访', completedInterviews, '含一次二次采访闭环')}
      ${metricCard('待补任务', openTasks.length, '红色项优先带回车间', 'alert')}
    </section>

    <section class="content-grid">
      <div class="panel">
        <div class="section-heading"><div><h2>下一轮采访任务</h2><p>按风险和知识断点排序</p></div><span class="count-chip">${openTasks.length}</span></div>
        <div class="task-list">
          ${openTasks.length ? openTasks.slice(0, 5).map(renderTaskRow).join('') : emptyBlock('暂无待补任务', '结束一次采访后，AI会把缺口转成下一轮任务。')}
        </div>
      </div>
      <div class="panel">
        <div class="section-heading"><div><h2>最近形成的知识</h2><p>先显示诊断链，再显示结论</p></div></div>
        <div class="knowledge-list">
          ${state.knowledgeItems.slice(0, 4).map((item) => `
            <button class="knowledge-row" data-action="view-knowledge" data-id="${item.id}" type="button">
              <span class="severity-mark ${item.maturity === 'L3' ? 'green' : ''}"></span>
              <div><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.summary)}</small></div>
              <span class="maturity-badge">${escapeHtml(item.maturity)}</span>
            </button>`).join('')}
        </div>
      </div>
    </section>
  `;
}

function metricCard(label, value, note, className = '') {
  return `<article class="metric-card ${className}"><span>${label}</span><strong>${value}</strong><small>${note}</small></article>`;
}

function renderTaskRow(task) {
  return `
    <div class="task-row">
      <span class="severity-mark ${task.severity === 'high' ? 'high' : ''}"></span>
      <div><strong>${escapeHtml(task.title)}</strong><small>${escapeHtml(task.reason || task.questions?.[0] || '')}</small></div>
      <button class="quiet-button" data-action="start-task" data-id="${task.id}" type="button">去采访</button>
    </div>`;
}

function emptyBlock(title, text) {
  return `<div class="empty-state"><strong>${escapeHtml(title)}</strong><p>${escapeHtml(text)}</p></div>`;
}

function coveragePercent(coverage = {}) {
  const values = Object.values(coverage);
  if (!values.length) return 0;
  const score = values.reduce((sum, value) => sum + ({ confirmed: 1, partial: 0.45, missing: 0 }[value] || 0), 0);
  return Math.round((score / values.length) * 100);
}

function renderInterview() {
  const interview = activeInterview();
  if (!interview) {
    appMain.innerHTML = emptyBlock('还没有采访记录', '点击右上角“开始采访”创建第一条记录。');
    return;
  }
  if (interview.extraction && interview.status !== 'in_progress') {
    renderInterviewReview(interview);
    return;
  }

  const equipment = getEquipment(interview.equipmentId);
  const expert = getExpert(interview.expertIds?.[0]);
  const process = getProcess(equipment?.processId);
  const openQuestions = (interview.activeQuestions || []).filter((item) => item.status === 'open').slice(0, 3);
  const ambiguities = analyzeInterview(interview).ambiguities;
  const steps = diagnosticSteps(interview.coverage);

  appMain.innerHTML = `
    <section class="interview-layout">
      <aside class="interview-column context-column">
        <div class="sticky-panel">
          <div class="context-card">
            <p class="eyebrow">CURRENT INTERVIEW</p>
            <h2>${escapeHtml(interview.title)}</h2>
            <p>${escapeHtml(process?.name || '未分工序')} / ${escapeHtml(equipment?.model || '')} ${escapeHtml(equipment?.name || '')}</p>
            <div class="context-meta">
              <div><span>老师傅</span><b>${escapeHtml(expert?.name || '未指定')}</b></div>
              <div><span>知识类型</span><b>${KNOWLEDGE_TYPE_LABEL[interview.knowledgeType] || '其他'}</b></div>
              <div><span>采访方式</span><b>${interview.mode === 'field' ? '现场采访' : '桌面整理'}</b></div>
              <div><span>开始时间</span><b>${formatTime(interview.startedAt)}</b></div>
            </div>
          </div>
          <div class="diagnostic-rail">
            <h3>诊断轨道 · ${coveragePercent(interview.coverage)}%</h3>
            <div class="rail-steps">${steps.map((step) => `
              <div class="rail-step ${step.status}"><i></i>${step.label}<small>${step.note}</small></div>`).join('')}
            </div>
          </div>
        </div>
      </aside>

      <section class="interview-column interview-stream">
        <div class="stream-toolbar">
          <div><h2>采访记录</h2><small>原话保留，不替老师傅改写</small></div>
          <select id="interview-selector" aria-label="切换采访记录">
            ${state.interviews.map((item) => `<option value="${item.id}" ${item.id === interview.id ? 'selected' : ''}>${escapeHtml(item.title)}</option>`).join('')}
          </select>
        </div>
        <div class="entry-list" id="entry-list">
          ${(interview.entries || []).map((entry) => renderEntry(entry, expert)).join('') || emptyBlock('还没有原话', '先记录老师傅的一句话，AI会从模糊点开始追问。')}
        </div>
        <div class="composer">
          <div class="composer-tabs">
            ${Object.entries(ENTRY_KIND_LABEL).filter(([kind]) => kind !== 'answer').map(([kind, label]) => `<button class="composer-tab ${entryKind === kind ? 'is-active' : ''}" data-action="entry-kind" data-kind="${kind}" type="button">${label}</button>`).join('')}
          </div>
          <div class="answering-banner ${answeringQuestionId ? 'is-visible' : ''}" id="answering-banner">
            <span>${answeringQuestionId ? `正在回答：${escapeHtml((interview.activeQuestions || []).find((item) => item.id === answeringQuestionId)?.question || '')}` : ''}</span>
            <button class="text-button" data-action="cancel-answer" type="button">取消</button>
          </div>
          <textarea id="interview-input" placeholder="${entryKind === 'transcript_import' ? '粘贴录音转写文本，保留老师傅原始说法…' : entryKind === 'field_observation' ? '记录现场看到、听到、测到的内容…' : '记下老师傅原话，不用先替他整理…'}"></textarea>
          <div class="composer-actions">
            <div class="attachment-actions">
              <button class="attachment-button" data-action="add-photo" type="button">▣ 现场照片</button>
              <button class="attachment-button" data-action="insert-unknown" type="button">？ 暂时不知道</button>
            </div>
            <button class="record-button" data-action="save-entry" type="button">记录并让AI分析</button>
          </div>
        </div>
      </section>

      <aside class="interview-column ai-panel sticky-panel">
        <div class="ai-heading"><span class="ai-mark">AI</span><div><strong>AI知识萃取师</strong><small>Mock模式 · 只提当前最重要的问题</small></div></div>
        ${ambiguities.length ? `<div class="ambiguity-alert"><b>发现模糊表达：</b>${escapeHtml(ambiguities[ambiguities.length - 1].matchedTerms.join('、'))}<br>${escapeHtml(ambiguities[ambiguities.length - 1].problem)}</div>` : ''}
        <div class="question-list">
          ${openQuestions.length ? openQuestions.map((question, index) => renderQuestion(question, index)).join('') : emptyBlock('当前问题已回答', '可以继续记录新内容，或结束采访交给AI整理。')}
        </div>
        <div class="ai-footer">
          <button class="secondary-button" data-action="reanalyze" type="button">重新分析当前记录</button>
          <button class="primary-button" data-action="finish-interview" type="button">结束采访并整理</button>
        </div>
      </aside>
    </section>
  `;

  requestAnimationFrame(() => {
    const list = document.querySelector('#entry-list');
    if (list) list.scrollTop = list.scrollHeight;
  });
}

function diagnosticSteps(coverage = {}) {
  const merge = (...fields) => {
    const statuses = fields.map((field) => coverage[field] || 'missing');
    if (statuses.every((status) => status === 'confirmed')) return 'confirmed';
    if (statuses.some((status) => status === 'partial' || status === 'confirmed')) return 'partial';
    return 'missing';
  };
  return [
    { label: '现象', note: '说清发生了什么', status: merge('symptom', 'conditions') },
    { label: '第一判断', note: '先查哪里及原因', status: merge('firstJudgment', 'judgmentReason') },
    { label: '检查', note: '位置、方法、标准', status: merge('checkMethod', 'normalStandard', 'abnormalStandard') },
    { label: '分支', note: '正常/异常下一步', status: merge('branches') },
    { label: '维修', note: '动作与安全', status: merge('repair', 'safety') },
    { label: '验证', note: '怎样才算修好', status: merge('postRepairValidation') },
  ];
}

function renderEntry(entry, expert) {
  const kindClass = entry.kind === 'answer' ? 'answer' : entry.kind === 'field_observation' ? 'observation' : '';
  const attachments = (entry.attachments || []).map((attachment) => attachment.thumbnailDataUrl ? `<img class="entry-photo" src="${attachment.thumbnailDataUrl}" alt="${escapeHtml(attachment.description || '现场照片')}">` : '').join('');
  return `
    <article class="entry-card ${kindClass}">
      <div class="entry-head"><strong>${ENTRY_KIND_LABEL[entry.kind] || '记录'} · ${escapeHtml(entry.speaker === 'expert_wjz' ? expert?.name || '老师傅' : '采访人')}</strong><time>${formatTime(entry.recordedAt)}</time></div>
      <p>${escapeHtml(entry.text)}</p>
      ${attachments}
      <div class="entry-flags">
        ${entry.confirmedByExpert ? '<span class="maturity-badge">老师傅已确认</span>' : '<span class="tag">原始记录</span>'}
        ${entry.linkedQuestionId ? '<span class="source-badge">追问回答</span>' : ''}
        ${!entry.confirmedByExpert && entry.kind !== 'interviewer_note' ? `<button class="text-button" data-action="confirm-entry" data-id="${entry.id}" type="button">标记老师傅确认</button>` : ''}
      </div>
    </article>`;
}

function renderQuestion(question, index) {
  return `
    <article class="question-card">
      <span class="question-order">追问 ${String(index + 1).padStart(2, '0')}</span>
      <p>${escapeHtml(question.question)}</p>
      <small>为什么问：${escapeHtml(question.reason)}</small>
      <button class="answer-question" data-action="answer-question" data-id="${question.id}" type="button">用下一条记录回答</button>
    </article>`;
}

function renderInterviewReview(interview) {
  const extraction = interview.extraction;
  const equipment = getEquipment(interview.equipmentId);
  appMain.innerHTML = `
    <section class="review-page">
      <div class="review-banner">
        <p class="eyebrow">INTERVIEW REVIEW</p>
        <h2>这次采访真正留下了什么？</h2>
        <p>${escapeHtml(extraction.summary)}<br>${escapeHtml(equipment?.model || '')} · ${escapeHtml(interview.title)}</p>
      </div>
      <div class="review-grid">
        ${reviewCard('高价值经验', extraction.highValue, 'high-value', '能复制老师傅判断过程的内容')}
        ${reviewCard('已确认信息', extraction.confirmed, 'confirmed', '老师傅明确确认或已有现场证据')}
        ${reviewCard('仍然模糊', extraction.ambiguous, 'ambiguous', '原话保留，但还不能让新人执行')}
        ${reviewCard('下次必须补', extraction.missing, 'missing', '已经转成二次采访任务')}
      </div>
      ${extraction.conflicts?.length ? `<div class="panel"><div class="section-heading"><div><h2>经验冲突 / 待确认</h2><p>不覆盖，先保留差异</p></div></div>${extraction.conflicts.map((item) => `<div class="ambiguity-alert">${escapeHtml(item)}</div>`).join('')}</div>` : ''}
      <div class="panel">
        <div class="section-heading"><div><h2>下一次采访任务</h2><p>手机带着这份清单继续问</p></div><span class="count-chip">${extraction.followUpTasks?.length || 0}</span></div>
        <div class="task-list">${(extraction.followUpTasks || []).map(renderTaskRow).join('') || emptyBlock('当前没有新增任务', '知识链已较完整，可以进入审核。')}</div>
      </div>
      <div class="review-actions">
        <button class="secondary-button" data-action="resume-editing" type="button">返回补充记录</button>
        <button class="secondary-button" data-action="export-followup" type="button">导出二次采访清单</button>
        <button class="primary-button" data-action="save-knowledge" type="button">确认整理并形成知识草稿</button>
        <button class="primary-button" data-action="start-followup" type="button">立即开始二次采访</button>
      </div>
    </section>
  `;
}

function reviewCard(title, items = [], className, hint) {
  return `<article class="review-card ${className}"><h3>${title}</h3>${items.length ? `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>` : `<p>${escapeHtml(hint)}：暂无。</p>`}</article>`;
}

function renderEquipment() {
  const equipment = state.equipment[0];
  if (!equipment) {
    appMain.innerHTML = emptyBlock('还没有设备', '第一版可先从一台最熟悉的设备开始。');
    return;
  }
  const process = getProcess(equipment.processId);
  const sources = state.sources.filter((item) => item.equipmentIds?.includes(equipment.id));
  const results = searchKnowledge(state.knowledgeItems, equipment.id, searchQuery);
  appMain.innerHTML = `
    <div class="search-bar">
      <input id="knowledge-search" value="${escapeHtml(searchQuery)}" placeholder="输入现象，例如：画面不刷新、乱喷、漏气…" aria-label="搜索维修知识">
      <select id="equipment-filter" aria-label="筛选设备">${state.equipment.map((item) => `<option value="${item.id}">${escapeHtml(item.model)} · ${escapeHtml(item.name)}</option>`).join('')}</select>
    </div>
    <section class="equipment-summary">
      <article class="equipment-card">
        <span class="model">${escapeHtml(equipment.model)}</span>
        <h2>${escapeHtml(equipment.name)}</h2>
        <p>${escapeHtml(equipment.manufacturer)}<br>${escapeHtml(process?.name || '')} · ${escapeHtml(equipment.versions?.[0] || '版本待登记')}</p>
        <div class="equipment-tags">${(equipment.tags || []).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}</div>
      </article>
      <div class="module-grid">
        ${Object.entries(equipment.modules || {}).map(([key, status]) => `<div class="module-cell ${status}"><span>${MODULE_LABEL[key] || key}</span><strong>${STATUS_LABEL[status] || status}</strong></div>`).join('')}
      </div>
    </section>

    <section class="content-grid">
      <div class="panel">
        <div class="section-heading"><div><h2>维修知识</h2><p>${searchQuery ? `找到 ${results.length} 条` : '按诊断链展示，不只给答案'}</p></div><span class="count-chip">${results.length}</span></div>
        <div class="knowledge-list">${results.length ? results.map(renderKnowledgeCard).join('') : emptyBlock('没有匹配结果', '换一个现象词，或开始采访补充这类知识。')}</div>
      </div>
      <aside class="panel">
        <div class="section-heading"><div><h2>原始资料</h2><p>资料与经验分开保存</p></div><button class="quiet-button" data-action="register-source" type="button">＋ 登记</button></div>
        <div class="source-list">${sources.map((source) => `<div class="source-row"><div><strong>${escapeHtml(source.title)}</strong><small>${escapeHtml(source.fileName || source.notes || '')}</small></div><span class="source-badge">${sourceTypeLabel(source.type)}</span></div>`).join('')}</div>
      </aside>
    </section>
  `;
}

function renderKnowledgeCard(item) {
  const chain = item.diagnosticChain;
  return `
    <article class="knowledge-card" id="knowledge-${item.id}">
      <div class="knowledge-card-header">
        <div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.summary)}</p></div>
        <div><span class="maturity-badge">${escapeHtml(item.maturity)}</span> <span class="source-badge">${item.claims?.[0]?.classification === 'measured_data' ? '实测数据' : '老师傅经验'}</span></div>
      </div>
      <div class="knowledge-card-tags">${(item.tags || []).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}</div>
      ${chain ? `
        <div class="diagnostic-chain">
          <div class="diagnostic-chain-title">诊断路径 · ${escapeHtml(chain.firstDirection || '')}</div>
          ${(chain.nodes || []).map((node) => `
            <div class="chain-node" data-order="${node.order}">
              <strong>${escapeHtml(node.question)}</strong>
              <small>为什么：${escapeHtml(node.why || '待补')}</small>
              <small>正常：${escapeHtml(node.normalState || '待补')}　｜　异常：${escapeHtml(node.abnormalState || '待补')}</small>
              <div class="branch-row">
                <div class="branch normal">正常 → ${escapeHtml(node.branches?.normal?.meaning || '按条件进入下一节点')}</div>
                <div class="branch abnormal">异常 → ${escapeHtml(node.branches?.abnormal?.meaning || node.branches?.abnormal_single?.meaning || '按异常范围继续定位')}</div>
              </div>
            </div>`).join('')}
        </div>` : ''}
    </article>`;
}

function sourceTypeLabel(type) {
  return {
    manufacturer_manual: '厂家资料', drawing: '图纸', parts_manual: '零件手册', sop: '企业SOP',
    maintenance_record: '维修记录', case_report: '历史案例', photo: '照片', other: '其他',
  }[type] || '资料';
}

function renderAudit() {
  const equipment = state.equipment[0];
  if (!equipment) {
    appMain.innerHTML = emptyBlock('没有可体检的设备', '先登记设备和知识。');
    return;
  }
  const report = auditEquipment(equipment, state.knowledgeItems, state.interviews, state.reviewTasks);
  const overall = Math.round(Object.values(report.scores).reduce((sum, value) => sum + value, 0) / Object.keys(report.scores).length);
  const scoreLabels = { equipment: '设备知识', fault: '故障知识', repair: '维修知识', parameter: '参数完整', cases: '案例丰富', crossValidation: '交叉验证' };
  appMain.innerHTML = `
    <section class="audit-header">
      <div class="score-dial" style="--score:${overall}"><div><strong>${overall}</strong><span>综合完整度</span></div></div>
      <div><p class="eyebrow">KNOWLEDGE HEALTH CHECK</p><h2>${escapeHtml(equipment.model)} 知识体检</h2><p>${escapeHtml(report.summary)} 分数只反映可执行完整度，不代表结论一定正确；来源、成熟度和冲突仍需人工审核。</p></div>
    </section>
    <section class="score-grid">
      ${Object.entries(report.scores).map(([key, value]) => `<article class="score-card"><span>${scoreLabels[key]}</span><strong>${value}%</strong><div class="score-bar"><i style="width:${value}%"></i></div></article>`).join('')}
    </section>
    <section class="content-grid">
      <div class="panel">
        <div class="section-heading"><div><h2>问题清单</h2><p>红色先补，橙色随后完善</p></div><span class="count-chip">${report.issues.length}</span></div>
        <div class="audit-list">${report.issues.length ? report.issues.map(renderAuditIssue).join('') : `<div class="audit-issue green"><i></i><div><strong>当前没有严重断点</strong><p>继续积累真实案例和多人验证。</p></div><span class="status-badge">较完整</span></div>`}</div>
      </div>
      <aside class="panel">
        <div class="section-heading"><div><h2>下一轮建议</h2><p>直接带回车间的问题</p></div></div>
        <div class="task-list">${report.issues.slice(0, 5).map((issue) => `<div class="task-row"><span class="severity-mark ${issue.severity === 'red' ? 'high' : ''}"></span><div><strong>${escapeHtml(issue.suggestedQuestion || issue.title)}</strong><small>${escapeHtml(issue.detail)}</small></div></div>`).join('')}</div>
        <button class="primary-button" style="width:100%;margin-top:14px" data-action="new-interview" type="button">开始补知识采访</button>
      </aside>
    </section>
  `;
}

function renderAuditIssue(issue) {
  return `<article class="audit-issue ${issue.severity}"><i></i><div><strong>${escapeHtml(issue.title)}</strong><p>${escapeHtml(issue.detail)}</p>${issue.suggestedQuestion ? `<div class="suggested-question">建议追问：${escapeHtml(issue.suggestedQuestion)}</div>` : ''}</div><span class="status-badge">${issue.severity === 'red' ? '严重缺失' : '建议补充'}</span></article>`;
}

function openInterviewDialog(prefill = {}) {
  populateForms();
  if (prefill.equipmentId) document.querySelector('#form-equipment').value = prefill.equipmentId;
  if (prefill.title) document.querySelector('#form-interview-title').value = prefill.title;
  interviewDialog.showModal();
}

function populateForms() {
  document.querySelector('#form-process').innerHTML = state.processes.map((item) => `<option value="${item.id}">${escapeHtml(item.name)}</option>`).join('');
  const equipmentOptions = state.equipment.map((item) => `<option value="${item.id}">${escapeHtml(item.model)} · ${escapeHtml(item.name)}</option>`).join('');
  document.querySelector('#form-equipment').innerHTML = equipmentOptions;
  document.querySelector('#source-equipment').innerHTML = equipmentOptions;
  document.querySelector('#form-expert').innerHTML = state.experts.filter((item) => item.active).map((item) => `<option value="${item.id}">${escapeHtml(item.name)} · ${escapeHtml(item.roles?.[0] || '')}</option>`).join('');
}

function createInterview(form) {
  const equipmentId = document.querySelector('#form-equipment').value;
  const expertId = document.querySelector('#form-expert').value;
  const title = document.querySelector('#form-interview-title').value.trim();
  const interview = {
    id: uid('int'), equipmentId, expertIds: [expertId], interviewerId: 'user_wjz',
    knowledgeType: document.querySelector('#form-knowledge-type').value,
    title, mode: new FormData(form).get('mode') || 'field', status: 'in_progress',
    startedAt: new Date().toISOString(), endedAt: null, entries: [], activeQuestions: [],
    coverage: {}, extraction: null, followUpInterviewId: null,
    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), revision: 1,
  };
  const analysis = analyzeInterview(interview);
  interview.coverage = analysis.coverage;
  interview.activeQuestions = analysis.questions;
  state.interviews.unshift(interview);
  state.meta.activeInterviewId = interview.id;
  persist('采访已创建，先记录老师傅原话。');
  interviewDialog.close();
  form.reset();
  setView('interview');
}

function saveInterviewEntry() {
  const interview = activeInterview();
  const input = document.querySelector('#interview-input');
  const text = input?.value.trim();
  if (!interview || !text) {
    showToast('先记下一句老师傅原话或现场观察。');
    input?.focus();
    return;
  }
  let kind = entryKind;
  const question = (interview.activeQuestions || []).find((item) => item.id === answeringQuestionId);
  if (question) kind = 'answer';
  const entry = {
    id: uid('entry'), kind, speaker: kind === 'interviewer_note' || kind === 'field_observation' ? 'user_wjz' : interview.expertIds[0],
    text, recordedAt: new Date().toISOString(), attachments: [], confirmedByExpert: false,
    linkedQuestionId: question?.id || null, tags: [],
  };
  interview.entries.push(entry);
  if (question) {
    question.status = 'answered';
    question.answerEntryIds = [...(question.answerEntryIds || []), entry.id];
  }
  const analysis = analyzeInterview(interview);
  interview.coverage = analysis.coverage;
  interview.activeQuestions = [
    ...(interview.activeQuestions || []).filter((item) => item.status === 'answered'),
    ...analysis.questions,
  ];
  interview.updatedAt = new Date().toISOString();
  interview.revision += 1;
  answeringQuestionId = null;
  persist('已记录，AI追问已更新。');
  renderInterview();
  document.querySelector('#interview-input')?.focus();
}

function reanalyzeInterview() {
  const interview = activeInterview();
  if (!interview) return;
  const analysis = analyzeInterview(interview);
  interview.coverage = analysis.coverage;
  interview.activeQuestions = [
    ...(interview.activeQuestions || []).filter((item) => item.status === 'answered'),
    ...analysis.questions,
  ];
  persist('AI已重新检查当前记录。');
  renderInterview();
}

function finishInterview() {
  const interview = activeInterview();
  if (!interview || !(interview.entries || []).length) {
    showToast('至少记录一条老师傅原话后再整理。');
    return;
  }
  const extraction = structureInterview(interview);
  interview.extraction = extraction;
  interview.coverage = extraction.coverage;
  interview.status = extraction.missing.length ? 'needs_follow_up' : 'awaiting_review';
  interview.endedAt = new Date().toISOString();
  interview.updatedAt = new Date().toISOString();
  const existingIds = new Set(state.reviewTasks.map((task) => task.id));
  for (const task of extraction.followUpTasks) if (!existingIds.has(task.id)) state.reviewTasks.push(task);
  persist('采访已整理，并生成二次采访清单。');
  renderInterview();
}

function startFollowUp(interview = activeInterview()) {
  if (!interview) return;
  const followUp = {
    id: uid('int_followup'), equipmentId: interview.equipmentId, expertIds: [...interview.expertIds], interviewerId: 'user_wjz',
    knowledgeType: interview.knowledgeType, title: `${interview.title} · 二次采访`, mode: 'field', status: 'in_progress',
    startedAt: new Date().toISOString(), endedAt: null, entries: [], activeQuestions: [], coverage: { ...interview.coverage },
    extraction: null, parentInterviewId: interview.id, followUpInterviewId: null,
    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), revision: 1,
  };
  const relevantTasks = state.reviewTasks.filter((task) => task.interviewId === interview.id && task.status === 'open').slice(0, 3);
  followUp.activeQuestions = relevantTasks.map((task, index) => ({
    id: uid(`q_followup_${index}`), category: 'follow_up', priority: 100 - index,
    question: task.questions?.[0] || task.title, reason: task.reason, triggerText: '', status: 'open', answerEntryIds: [], generatedBy: 'mock',
  }));
  if (!followUp.activeQuestions.length) followUp.activeQuestions = analyzeInterview(followUp).questions;
  interview.followUpInterviewId = followUp.id;
  state.interviews.unshift(followUp);
  state.meta.activeInterviewId = followUp.id;
  answeringQuestionId = null;
  persist('二次采访已创建，问题已带入。');
  setView('interview');
}

function saveKnowledgeDraft() {
  const interview = activeInterview();
  if (!interview?.extraction) return;
  const existing = state.knowledgeItems.find((item) => item.sourceInterviewId === interview.id);
  if (existing) {
    showToast('这次采访已经形成知识草稿。');
    setView('equipment');
    return;
  }
  const draft = interview.extraction.diagnosticDraft;
  const item = {
    id: uid('ki'), equipmentId: interview.equipmentId,
    type: interview.knowledgeType === 'fault' ? 'fault_diagnosis' : interview.knowledgeType,
    title: draft?.faultName || interview.title,
    summary: interview.extraction.summary,
    tags: [],
    claims: (interview.extraction.confirmed || []).map((statement) => ({
      id: uid('claim'), statement, classification: 'expert_experience', verificationStatus: 'structured',
      sourceRefs: [], interviewEntryIds: [], contributorIds: [...interview.expertIds],
      applicability: { equipmentModels: [getEquipment(interview.equipmentId)?.model || ''], softwareVersions: [], conditions: [] },
      confidence: null, maturity: 'L2', humanConfirmed: false,
    })),
    diagnosticChain: draft || null,
    status: 'draft', maturity: 'L2', review: { reviewedBy: null, otherExpertVerified: false },
    searchText: `${interview.title} ${(interview.entries || []).map((entry) => entry.text).join(' ')}`,
    sourceInterviewId: interview.id,
    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), revision: 1,
  };
  state.knowledgeItems.unshift(item);
  interview.status = 'completed';
  persist('已形成L2知识草稿，AI推测没有自动变成事实。');
  setView('equipment');
}

function exportFollowUp() {
  const interview = activeInterview();
  if (!interview?.extraction) return;
  const equipment = getEquipment(interview.equipmentId);
  const lines = [
    `# ${equipment?.model || ''} 下一次采访任务`, '',
    `来源采访：${interview.title}`, `生成时间：${new Date().toLocaleString('zh-CN')}`, '',
    '## 必须继续追问', '',
  ];
  (interview.extraction.followUpTasks || []).forEach((task, index) => {
    lines.push(`${index + 1}. [ ] ${task.title}`);
    (task.questions || []).forEach((question) => lines.push(`   - ${question}`));
    lines.push(`   - 原因：${task.reason}`, '');
  });
  lines.push('## 采访结束前', '', '- [ ] 把整理后的结论念给老师傅听并确认', '- [ ] 标出AI推测与未验证信息', '- [ ] 记录维修后验证证据');
  downloadText(`${equipment?.model || '设备'}-下一次采访任务.md`, lines.join('\n'), 'text/markdown');
}

function renderPhotoPreview() {
  const preview = document.querySelector('#photo-preview');
  preview.innerHTML = photoData ? `<img src="${photoData}" alt="现场照片预览">` : '尚未选择照片';
  preview.classList.toggle('is-empty', !photoData);
}

async function compressPhoto(file) {
  const dataUrl = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
  const image = await new Promise((resolve, reject) => {
    const target = new Image();
    target.onload = () => resolve(target);
    target.onerror = reject;
    target.src = dataUrl;
  });
  const max = 900;
  const ratio = Math.min(1, max / Math.max(image.width, image.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(image.width * ratio);
  canvas.height = Math.round(image.height * ratio);
  canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL('image/jpeg', 0.68);
}

function savePhotoEntry() {
  const interview = activeInterview();
  if (!interview || !photoData) {
    showToast('先拍照或选择一张照片。');
    return;
  }
  const note = document.querySelector('#photo-note').value.trim() || '现场照片';
  interview.entries.push({
    id: uid('entry_photo'), kind: 'field_observation', speaker: 'user_wjz', text: note,
    recordedAt: new Date().toISOString(), confirmedByExpert: false, linkedQuestionId: null, tags: ['现场照片'],
    attachments: [{ id: uid('att'), type: 'photo', fileName: document.querySelector('#photo-input').files?.[0]?.name || '现场照片.jpg', thumbnailDataUrl: photoData, capturedAt: new Date().toISOString(), locationNote: note, description: note }],
  });
  const analysis = analyzeInterview(interview);
  interview.coverage = analysis.coverage;
  interview.activeQuestions = [...(interview.activeQuestions || []).filter((item) => item.status === 'answered'), ...analysis.questions];
  if (!persist('现场照片已加入本次采访。')) return;
  photoData = null;
  document.querySelector('#photo-form').reset();
  photoDialog.close();
  renderInterview();
}

function createSource() {
  const source = {
    id: uid('src'), equipmentIds: [document.querySelector('#source-equipment').value],
    type: document.querySelector('#source-type').value,
    title: document.querySelector('#source-title').value.trim(),
    fileName: document.querySelector('#source-filename').value.trim(),
    version: document.querySelector('#source-version').value.trim(),
    confidentiality: 'internal', importStatus: 'registered',
    notes: document.querySelector('#source-notes').value.trim(),
    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), revision: 1,
  };
  state.sources.unshift(source);
  const equipment = getEquipment(source.equipmentIds[0]);
  if (equipment && !equipment.sourceIds.includes(source.id)) equipment.sourceIds.push(source.id);
  persist('资料已登记，采访时优先避开说明书已有内容。');
  sourceDialog.close();
  document.querySelector('#source-form').reset();
  if (currentView === 'equipment') renderEquipment();
}

function openConfirm(title, message, callback) {
  document.querySelector('#confirm-title').textContent = title;
  document.querySelector('#confirm-message').textContent = message;
  confirmCallback = callback;
  confirmDialog.showModal();
}

function downloadText(fileName, text, type) {
  const url = URL.createObjectURL(new Blob([text], { type: `${type};charset=utf-8` }));
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function exportData() {
  downloadText(`纺织设备经验萃取数据-${new Date().toISOString().slice(0, 10)}.json`, JSON.stringify(state, null, 2), 'application/json');
  showToast('完整数据已导出，请妥善保存。');
}

async function importData(file) {
  try {
    const parsed = JSON.parse(await file.text());
    if (parsed.schemaVersion !== state.schemaVersion || !Array.isArray(parsed.equipment) || !Array.isArray(parsed.interviews)) throw new Error('数据结构不匹配');
    state = parsed;
    persist('数据导入成功。');
    render();
  } catch (error) {
    console.error(error);
    showToast('导入失败：请选择本系统导出的JSON文件。');
  }
}

function handleMainClick(event) {
  const target = event.target.closest('[data-action]');
  if (!target) return;
  const action = target.dataset.action;
  const id = target.dataset.id;

  if (action === 'new-interview') openInterviewDialog();
  if (action === 'continue-interview') {
    const interview = activeInterview();
    if (interview) setView('interview'); else openInterviewDialog();
  }
  if (action === 'open-audit') setView('audit');
  if (action === 'view-knowledge') { searchQuery = ''; setView('equipment'); requestAnimationFrame(() => document.querySelector(`#knowledge-${id}`)?.scrollIntoView({ behavior: 'smooth' })); }
  if (action === 'start-task') {
    const task = state.reviewTasks.find((item) => item.id === id);
    openInterviewDialog({ equipmentId: task?.equipmentId, title: task?.title });
  }
  if (action === 'entry-kind') { entryKind = target.dataset.kind; renderInterview(); document.querySelector('#interview-input')?.focus(); }
  if (action === 'save-entry') saveInterviewEntry();
  if (action === 'answer-question') { answeringQuestionId = id; renderInterview(); document.querySelector('#interview-input')?.focus(); }
  if (action === 'cancel-answer') { answeringQuestionId = null; renderInterview(); }
  if (action === 'insert-unknown') { const input = document.querySelector('#interview-input'); input.value += `${input.value ? '\n' : ''}[待确认] 老师傅暂时不知道，需要查资料或下次继续问。`; input.focus(); }
  if (action === 'confirm-entry') {
    const interview = activeInterview();
    const entry = interview?.entries.find((item) => item.id === id);
    if (entry) { entry.confirmedByExpert = true; persist('已标记为老师傅确认。'); renderInterview(); }
  }
  if (action === 'reanalyze') reanalyzeInterview();
  if (action === 'finish-interview') finishInterview();
  if (action === 'resume-editing') { const interview = activeInterview(); interview.status = 'in_progress'; persist(); renderInterview(); }
  if (action === 'start-followup') startFollowUp();
  if (action === 'save-knowledge') saveKnowledgeDraft();
  if (action === 'export-followup') exportFollowUp();
  if (action === 'add-photo') { photoData = null; document.querySelector('#photo-form').reset(); renderPhotoPreview(); photoDialog.showModal(); }
  if (action === 'register-source') { populateForms(); sourceDialog.showModal(); }
}

function bindEvents() {
  document.querySelectorAll('[data-view]').forEach((button) => button.addEventListener('click', () => setView(button.dataset.view)));
  document.querySelector('#start-interview').addEventListener('click', () => openInterviewDialog());
  document.querySelector('#register-source').addEventListener('click', () => { populateForms(); sourceDialog.showModal(); });
  document.querySelector('#export-data').addEventListener('click', exportData);
  document.querySelector('#import-data').addEventListener('click', () => document.querySelector('#import-data-file').click());
  document.querySelector('#import-data-file').addEventListener('change', (event) => event.target.files?.[0] && importData(event.target.files[0]));
  appMain.addEventListener('click', handleMainClick);
  appMain.addEventListener('change', (event) => {
    if (event.target.id === 'interview-selector') {
      state.meta.activeInterviewId = event.target.value;
      answeringQuestionId = null;
      persist();
      renderInterview();
    }
  });
  appMain.addEventListener('input', (event) => {
    if (event.target.id === 'knowledge-search') {
      searchQuery = event.target.value;
      const cursor = event.target.selectionStart;
      renderEquipment();
      const input = document.querySelector('#knowledge-search');
      input.focus();
      input.setSelectionRange(cursor, cursor);
    }
  });
  appMain.addEventListener('keydown', (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key === 'Enter' && event.target.id === 'interview-input') saveInterviewEntry();
  });

  document.querySelector('#interview-form').addEventListener('submit', (event) => {
    event.preventDefault();
    if (event.submitter?.value === 'cancel') return interviewDialog.close();
    createInterview(event.currentTarget);
  });
  document.querySelector('#source-form').addEventListener('submit', (event) => {
    event.preventDefault();
    if (event.submitter?.value === 'cancel') return sourceDialog.close();
    if (!document.querySelector('#source-title').value.trim()) return showToast('请填写资料名称。');
    createSource();
  });
  document.querySelector('#photo-form').addEventListener('submit', (event) => {
    event.preventDefault();
    if (event.submitter?.value === 'cancel') return photoDialog.close();
    savePhotoEntry();
  });
  document.querySelector('#photo-input').addEventListener('change', async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    showToast('正在压缩现场照片…');
    try { photoData = await compressPhoto(file); renderPhotoPreview(); }
    catch (error) { console.error(error); showToast('照片读取失败，请换一张重试。'); }
  });
  document.querySelector('#confirm-ok').addEventListener('click', () => { if (confirmCallback) confirmCallback(); confirmCallback = null; });
  confirmDialog.addEventListener('close', () => { if (confirmDialog.returnValue !== 'default') confirmCallback = null; });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') answeringQuestionId = null;
  });

  document.addEventListener('dblclick', (event) => {
    if (event.altKey && event.target.closest('.brand-block')) {
      openConfirm('恢复演示数据', '这会覆盖当前浏览器里的采访记录。请先导出需要保留的数据。', () => {
        state = resetState();
        showToast('演示数据已恢复。');
        setView('home');
      });
    }
  });
}

populateForms();
bindEvents();
render();

// 便于本地自动化测试读取，不作为业务接口。
window.__TEXTILE_EXPERIENCE_MVP__ = {
  getState: () => state,
  reset: () => { state = resetState(); render(); return state; },
  storageKey: STORAGE_KEY,
};
