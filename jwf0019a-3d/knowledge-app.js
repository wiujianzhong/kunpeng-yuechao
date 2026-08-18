import { knowledgeData } from './knowledge/knowledge-data.js';

const moduleTabs = document.querySelector('#knowledge-module-tabs');
const moduleTitle = document.querySelector('#knowledge-module-title');
const moduleDescription = document.querySelector('#knowledge-module-description');
const moduleEvidence = document.querySelector('#knowledge-module-evidence');
const cardGrid = document.querySelector('#knowledge-card-grid');
const searchInput = document.querySelector('#knowledge-search');
const searchClear = document.querySelector('#knowledge-search-clear');
const resultCount = document.querySelector('#knowledge-result-count');
const quickActions = document.querySelector('#knowledge-quick-actions');
const dialog = document.querySelector('#knowledge-dialog');
const dialogTitle = document.querySelector('#knowledge-dialog-title');
const dialogMeta = document.querySelector('#knowledge-dialog-meta');
const dialogBody = document.querySelector('#knowledge-dialog-body');
const dialogClose = document.querySelector('#knowledge-dialog-close');
const metricArticles = document.querySelector('#knowledge-article-count');
const metricFaults = document.querySelector('#knowledge-fault-count');
const metricModules = document.querySelector('#knowledge-module-count');

let activeModule = 'overview';
let searchTerm = '';
let activeDiagnosisFault = null;

const statusNames = {
  active: '正式知识',
  confirmed: '现场确认',
  reviewed: '案例复核',
  mixed: '现场经验',
  draft: '参考资料'
};

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function inlineMarkdown(value = '') {
  return escapeHtml(value)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, target, label) => `<span class="knowledge-link-chip">${label || target}</span>`)
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
}

function renderMarkdown(markdown = '') {
  const lines = markdown.split('\n');
  const html = [];
  let listType = '';

  const closeList = () => {
    if (!listType) return;
    html.push(`</${listType}>`);
    listType = '';
  };

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index].trim();
    if (!line) {
      closeList();
      continue;
    }

    if (line.startsWith('|') && lines[index + 1]?.trim().match(/^\|?\s*:?-+/)) {
      closeList();
      const headers = line.split('|').filter(Boolean).map((cell) => inlineMarkdown(cell.trim()));
      index += 1;
      const rows = [];
      while (lines[index + 1]?.trim().startsWith('|')) {
        index += 1;
        rows.push(lines[index].split('|').filter(Boolean).map((cell) => inlineMarkdown(cell.trim())));
      }
      html.push('<div class="knowledge-table-wrap"><table><thead><tr>');
      headers.forEach((header) => html.push(`<th>${header}</th>`));
      html.push('</tr></thead><tbody>');
      rows.forEach((row) => {
        html.push('<tr>');
        row.forEach((cell) => html.push(`<td>${cell}</td>`));
        html.push('</tr>');
      });
      html.push('</tbody></table></div>');
      continue;
    }

    const heading = line.match(/^(#{1,4})\s+(.+)$/);
    if (heading) {
      closeList();
      const level = Math.min(4, heading[1].length + 1);
      html.push(`<h${level}>${inlineMarkdown(heading[2])}</h${level}>`);
      continue;
    }

    const unordered = line.match(/^[-*]\s+(.+)$/);
    if (unordered) {
      if (listType !== 'ul') {
        closeList();
        listType = 'ul';
        html.push('<ul>');
      }
      html.push(`<li>${inlineMarkdown(unordered[1])}</li>`);
      continue;
    }

    const ordered = line.match(/^\d+[.)]\s+(.+)$/);
    if (ordered) {
      if (listType !== 'ol') {
        closeList();
        listType = 'ol';
        html.push('<ol>');
      }
      html.push(`<li>${inlineMarkdown(ordered[1])}</li>`);
      continue;
    }

    if (line.startsWith('>')) {
      closeList();
      html.push(`<blockquote>${inlineMarkdown(line.replace(/^>\s?/, ''))}</blockquote>`);
      continue;
    }

    closeList();
    html.push(`<p>${inlineMarkdown(line)}</p>`);
  }

  closeList();
  return html.join('');
}

function openDialog({ title, meta, html }) {
  dialogTitle.textContent = title;
  dialogMeta.innerHTML = meta;
  dialogBody.innerHTML = html;
  if (typeof dialog.showModal === 'function') dialog.showModal();
  else dialog.setAttribute('open', '');
  requestAnimationFrame(() => dialogClose.focus());
}

function openArticle(article) {
  openDialog({
    title: article.title,
    meta: `<span>${escapeHtml(article.evidence)}</span><span>${escapeHtml(article.level)}</span><span>${escapeHtml(statusNames[article.status] || article.status)}</span>`,
    html: `<article class="knowledge-article">${renderMarkdown(article.markdown)}</article>`
  });
}

function faultSection(label, items) {
  return `
    <section class="fault-detail-section">
      <h3>${escapeHtml(label)}</h3>
      <ol>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ol>
    </section>
  `;
}

function diagnosisResult(result, showRestart = false) {
  return `
    <section class="diagnosis-result" aria-live="polite">
      <span class="diagnosis-result-label">当前判断</span>
      <h3>${escapeHtml(result.title)}</h3>
      <p class="diagnosis-conclusion">${escapeHtml(result.conclusion)}</p>
      <div class="diagnosis-result-grid">
        <div><strong>现在怎么做</strong><ol>${result.actions.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ol></div>
        <div><strong>怎样算处理好</strong><p>${escapeHtml(result.verify)}</p><strong>什么时候上报</strong><p>${escapeHtml(result.escalate)}</p></div>
      </div>
      ${showRestart ? '<button type="button" class="diagnosis-restart" data-diagnosis-restart>重新判断</button>' : ''}
    </section>
  `;
}

function quickDiagnosis(fault) {
  const quick = fault.diagnosis.quick;
  return `
    <section class="diagnosis-panel">
      <div class="diagnosis-question-head"><span>一步得到答案</span><h3>${escapeHtml(quick.prompt)}</h3><p>${escapeHtml(quick.hint)}</p></div>
      <div class="diagnosis-choice-grid">
        ${quick.options.map((option, index) => `<button type="button" data-quick-result="${index}">${escapeHtml(option.label)}</button>`).join('')}
      </div>
      <div id="diagnosis-answer"></div>
    </section>
  `;
}

function deepDiagnosis(fault, nodeId = fault.diagnosis.deep.start) {
  const node = fault.diagnosis.deep.nodes[nodeId];
  return `
    <section class="diagnosis-panel" data-deep-node="${escapeHtml(nodeId)}">
      <div class="diagnosis-question-head"><span>按现场逻辑逐步分析</span><h3>${escapeHtml(node.question)}</h3><p>${escapeHtml(node.why)}</p></div>
      <div class="diagnosis-binary-actions">
        <button type="button" data-deep-answer="yes">是，符合</button>
        <button type="button" data-deep-answer="no">不是，继续判断</button>
      </div>
      <div id="diagnosis-answer"></div>
    </section>
  `;
}

function enhancedFaultContent(fault, mode = 'quick') {
  const related = fault.articleIds
    .map((id) => knowledgeData.articles.find((article) => article.id === id))
    .filter(Boolean);
  return `
    <div class="fault-lead">${escapeHtml(fault.summary)}</div>
    <nav class="diagnosis-mode-switch" aria-label="选择诊断方式">
      <button type="button" data-diagnosis-mode="quick" class="${mode === 'quick' ? 'active' : ''}"><strong>快速答案</strong><span>选一个现象，直接给结果</span></button>
      <button type="button" data-diagnosis-mode="deep" class="${mode === 'deep' ? 'active' : ''}"><strong>逐步分析</strong><span>跟着判断路径找原因</span></button>
    </nav>
    <div id="diagnosis-workspace">${mode === 'quick' ? quickDiagnosis(fault) : deepDiagnosis(fault)}</div>
    <div class="fault-related">
      <span>相关知识卡</span>
      ${related.map((article) => `<button type="button" data-open-article="${article.id}">${escapeHtml(article.title)}</button>`).join('')}
    </div>
  `;
}

function openFault(fault) {
  activeDiagnosisFault = fault.diagnosis ? fault : null;
  const related = fault.articleIds
    .map((id) => knowledgeData.articles.find((article) => article.id === id))
    .filter(Boolean);
  openDialog({
    title: fault.title,
    meta: `<span>故障诊断</span><span>${escapeHtml(fault.level)}</span><span>按顺序检查</span>`,
    html: fault.diagnosis ? enhancedFaultContent(fault) : `
      <div class="fault-lead">${escapeHtml(fault.summary)}</div>
      ${faultSection('你会看到', fault.symptoms)}
      ${faultSection('先检查', fault.checks)}
      ${faultSection('再处理', fault.actions)}
      <section class="fault-verify"><strong>处理后验证</strong><p>${escapeHtml(fault.verify)}</p></section>
      <div class="fault-related">
        <span>相关知识卡</span>
        ${related.map((article) => `<button type="button" data-open-article="${article.id}">${escapeHtml(article.title)}</button>`).join('')}
      </div>
    `
  });
}

function renderModuleTabs() {
  moduleTabs.innerHTML = knowledgeData.modules.map((module) => `
    <button
      type="button"
      class="knowledge-flow-step ${module.id === activeModule ? 'active' : ''}"
      data-module="${module.id}"
      data-accent="${module.accent}"
      aria-pressed="${module.id === activeModule}"
    >
      <span>${String(module.order).padStart(2, '0')}</span>
      <strong>${escapeHtml(module.short)}</strong>
    </button>
  `).join('');
}

function articleCard(article) {
  return `
    <button type="button" class="knowledge-card" data-open-article="${article.id}">
      <span class="knowledge-card-index">KB-${article.id}</span>
      <h3>${escapeHtml(article.title)}</h3>
      <p>${escapeHtml(article.excerpt)}${article.excerpt.length >= 104 ? '…' : ''}</p>
      <span class="knowledge-card-footer">
        <span>${escapeHtml(article.evidence)}</span>
        <span>${escapeHtml(article.level)}</span>
      </span>
    </button>
  `;
}

function faultCard(fault) {
  return `
    <button type="button" class="fault-card" data-open-fault="${fault.id}">
      <span class="fault-card-signal"></span>
      <span>
        <strong>${escapeHtml(fault.title)}</strong>
        <small>${escapeHtml(fault.summary)}</small>
      </span>
      <em>${escapeHtml(fault.level)}</em>
    </button>
  `;
}

function normalizedSearchText(article) {
  return `${article.title} ${article.excerpt} ${article.markdown}`.toLowerCase();
}

function matchesSearchText(value, query) {
  const haystack = String(value).toLowerCase().replace(/[\s，。；：、,.!?！？：；（）()]/g, '');
  return query.trim().toLowerCase().split(/\s+/).filter(Boolean).every((part) => {
    const needle = part.replace(/[，。；：、,.!?！？：；（）()]/g, '');
    if (!needle || haystack.includes(needle)) return true;
    let cursor = 0;
    for (const character of haystack) {
      if (character === needle[cursor]) cursor += 1;
      if (cursor === needle.length) return true;
    }
    return false;
  });
}

function renderContent() {
  const module = knowledgeData.modules.find((item) => item.id === activeModule) || knowledgeData.modules[0];
  const normalizedTerm = searchTerm.trim().toLowerCase();
  let articles = knowledgeData.articles.filter((article) => article.module === activeModule);

  if (normalizedTerm) {
    articles = knowledgeData.articles.filter((article) => matchesSearchText(normalizedSearchText(article), normalizedTerm));
    moduleTitle.textContent = `搜索：${searchTerm.trim()}`;
    moduleDescription.textContent = '搜索范围包括设备结构、操作、参数、故障和现场确认内容。';
    moduleEvidence.textContent = '全库检索';
  } else {
    moduleTitle.textContent = module.name;
    moduleDescription.textContent = module.description;
    moduleEvidence.textContent = '设备知识';
  }

  const faultMatches = normalizedTerm
    ? knowledgeData.faultCases.filter((fault) => matchesSearchText(`${fault.title} ${fault.summary} ${fault.symptoms.join(' ')}`, normalizedTerm))
    : activeModule === 'fault' ? knowledgeData.faultCases : [];

  const blocks = [];
  if (faultMatches.length) {
    blocks.push(`
      <section class="fault-entry">
        <div class="knowledge-section-head"><span>从现象开始</span><strong>${faultMatches.length}类常见问题</strong></div>
        <div class="fault-grid">${faultMatches.map(faultCard).join('')}</div>
      </section>
    `);
  }
  if (articles.length) {
    blocks.push(`
      <section class="knowledge-article-list">
        <div class="knowledge-section-head"><span>知识卡</span><strong>${articles.length}篇</strong></div>
        <div class="knowledge-cards">${articles.map(articleCard).join('')}</div>
      </section>
    `);
  }

  if (!blocks.length) {
    blocks.push('<div class="knowledge-empty"><strong>没有找到对应内容</strong><span>换一个设备名称、报警词或故障现象试试。</span></div>');
  }

  cardGrid.innerHTML = blocks.join('');
  resultCount.textContent = `${articles.length + faultMatches.length}项结果`;
  renderModuleTabs();
}

function setModule(moduleId) {
  if (!knowledgeData.modules.some((module) => module.id === moduleId)) return;
  activeModule = moduleId;
  searchTerm = '';
  searchInput.value = '';
  renderContent();
}

moduleTabs.addEventListener('click', (event) => {
  const button = event.target.closest('[data-module]');
  if (!button) return;
  setModule(button.dataset.module);
});

cardGrid.addEventListener('click', (event) => {
  const articleButton = event.target.closest('[data-open-article]');
  if (articleButton) {
    const article = knowledgeData.articles.find((item) => item.id === articleButton.dataset.openArticle);
    if (article) openArticle(article);
    return;
  }
  const faultButton = event.target.closest('[data-open-fault]');
  if (faultButton) {
    const fault = knowledgeData.faultCases.find((item) => item.id === faultButton.dataset.openFault);
    if (fault) openFault(fault);
  }
});

dialogBody.addEventListener('click', (event) => {
  const articleButton = event.target.closest('[data-open-article]');
  if (articleButton) {
    const article = knowledgeData.articles.find((item) => item.id === articleButton.dataset.openArticle);
    if (article) openArticle(article);
    return;
  }

  const fault = activeDiagnosisFault;
  if (!fault?.diagnosis) return;

  const modeButton = event.target.closest('[data-diagnosis-mode]');
  if (modeButton) {
    dialogBody.innerHTML = enhancedFaultContent(fault, modeButton.dataset.diagnosisMode);
    return;
  }

  const quickButton = event.target.closest('[data-quick-result]');
  if (quickButton) {
    const result = fault.diagnosis.quick.options[Number(quickButton.dataset.quickResult)]?.result;
    if (result) dialogBody.querySelector('#diagnosis-answer').innerHTML = diagnosisResult(result);
    return;
  }

  if (event.target.closest('[data-diagnosis-restart]')) {
    dialogBody.innerHTML = enhancedFaultContent(fault, 'deep');
    return;
  }

  const deepButton = event.target.closest('[data-deep-answer]');
  if (!deepButton) return;
  const nodeId = dialogBody.querySelector('[data-deep-node]')?.dataset.deepNode;
  const node = fault.diagnosis.deep.nodes[nodeId];
  if (!node) return;
  const yes = deepButton.dataset.deepAnswer === 'yes';
  const nextNode = yes ? node.yesNext : node.noNext;
  const resultId = yes ? node.yesResult : node.noResult;
  const workspace = dialogBody.querySelector('#diagnosis-workspace');
  if (nextNode) workspace.innerHTML = deepDiagnosis(fault, nextNode);
  else if (resultId) workspace.innerHTML = diagnosisResult(fault.diagnosis.deep.results[resultId], true);
});

searchInput.addEventListener('input', () => {
  searchTerm = searchInput.value;
  renderContent();
});

searchClear.addEventListener('click', () => {
  searchTerm = '';
  searchInput.value = '';
  searchInput.focus();
  renderContent();
});

quickActions?.addEventListener('click', (event) => {
  const button = event.target.closest('[data-quick-module]');
  if (!button) return;
  setModule(button.dataset.quickModule);
  document.querySelector('#knowledge-content')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

dialogClose.addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});
dialog.addEventListener('close', () => { activeDiagnosisFault = null; });

if (metricArticles) metricArticles.textContent = String(knowledgeData.articles.length);
if (metricFaults) metricFaults.textContent = String(knowledgeData.faultCases.length);
if (metricModules) metricModules.textContent = String(knowledgeData.modules.length);
renderContent();
