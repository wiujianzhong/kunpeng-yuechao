const DATA_URL = "data/exercises.json";
const PAGE_SIZE = 48;
const FAVORITES_KEY = "xiaowu-fitness-favorites";
const GITHUB_ASSET_BASE = "https://wiujianzhong.github.io/kunpeng-yuechao/fitness/";

const categoryLabels = {
  back: "背部",
  cardio: "有氧",
  chest: "胸部",
  "lower arms": "小臂",
  "lower legs": "小腿",
  neck: "颈部",
  shoulders: "肩部",
  "upper arms": "上臂",
  "upper legs": "大腿",
  waist: "腰腹",
};

const equipmentLabels = {
  assisted: "辅助器械",
  band: "弹力带",
  barbell: "杠铃",
  "body weight": "徒手",
  "bosu ball": "波速球",
  cable: "绳索",
  dumbbell: "哑铃",
  "elliptical machine": "椭圆机",
  "ez barbell": "EZ 杠",
  hammer: "锤式器械",
  kettlebell: "壶铃",
  "leverage machine": "固定器械",
  "medicine ball": "药球",
  "olympic barbell": "奥杆",
  "resistance band": "阻力带",
  roller: "滚轴",
  rope: "绳",
  "skierg machine": "滑雪机",
  "sled machine": "雪橇机",
  "smith machine": "史密斯机",
  "stability ball": "瑜伽球",
  "stationary bike": "动感单车",
  "stepmill machine": "台阶机",
  tire: "轮胎",
  "trap bar": "六角杠",
  "upper body ergometer": "上肢测功仪",
  weighted: "负重",
  "wheel roller": "健腹轮",
};

const targetLabels = {
  abductors: "外展肌",
  abs: "腹肌",
  adductors: "内收肌",
  biceps: "肱二头肌",
  calves: "小腿",
  "cardiovascular system": "心肺",
  delts: "三角肌",
  forearms: "前臂",
  glutes: "臀肌",
  hamstrings: "腘绳肌",
  lats: "背阔肌",
  "levator scapulae": "肩胛提肌",
  pectorals: "胸肌",
  quads: "股四头肌",
  "serratus anterior": "前锯肌",
  spine: "脊柱",
  traps: "斜方肌",
  triceps: "肱三头肌",
  "upper back": "上背",
};

const muscleLabels = {
  hands: "手部",
  "hip flexors": "髋屈肌",
  "lower back": "下背",
  wrists: "手腕",
};

const exactNameLabels = {
  "3/4 sit-up": "3/4 仰卧起坐",
  "45° side bend": "45度侧屈",
  "air bike": "空中自行车卷腹",
  "all fours squad stretch": "四点支撑股四头肌拉伸",
  "alternate heel touchers": "交替触脚跟",
  "ankle circles": "脚踝绕环",
  "back and forth step": "前后踏步",
  "back lever": "后水平",
  "balance board": "平衡板",
  "bear crawl": "熊爬",
  "body-up": "徒手臂屈伸",
  "bottoms-up": "反向卷腹",
};

const namePhraseLabels = {
  "clean and press": "翻站推举",
  "close grip bench press": "窄握卧推",
  "wide grip bench press": "宽握卧推",
  "reverse grip press": "反握推举",
  "bench press": "卧推",
  "chest press": "胸推",
  "shoulder press": "肩推",
  "arnold press": "阿诺德推举",
  "side press": "侧向推举",
  "skull press": "碎颅式臂屈伸",
  "pallof press": "帕洛夫抗旋推",
  "biceps curl": "肱二头肌弯举",
  "bicep curl": "肱二头肌弯举",
  "hammer curl": "锤式弯举",
  "preacher curl": "牧师凳弯举",
  "concentration curl": "集中弯举",
  "wrist curl": "腕弯举",
  "drag curl": "拖拽弯举",
  "triceps extension": "肱三头肌臂屈伸",
  "calf raise": "提踵",
  "front raise": "前平举",
  "lateral raise": "侧平举",
  "shoulder raise": "肩部上提",
  "leg raise": "举腿",
  "knee raise": "提膝",
  "toe touch": "触脚尖",
  "heel touchers": "触脚跟",
  "russian twist": "俄罗斯转体",
  "bicycle crunch": "自行车卷腹",
  "twisting crunch": "转体卷腹",
  "jack knife sit up": "折刀仰卧起坐",
  "sit up": "仰卧起坐",
  "push up": "俯卧撑",
  "pull up": "引体向上",
  "chin up": "反手引体向上",
  "pulldown": "下拉",
  "pull through": "拉绳髋伸",
  "bent over row": "俯身划船",
  "upright row": "直立划船",
  "lat pulldown": "背阔肌下拉",
  "low row": "低位划船",
  "seated row": "坐姿划船",
  "standing row": "站姿划船",
  row: "划船",
  deadlift: "硬拉",
  "front squat": "前蹲",
  "full squat": "全深蹲",
  "hack squat": "哈克深蹲",
  "high bar squat": "高杠深蹲",
  "low bar squat": "低杠深蹲",
  "zercher squat": "泽奇深蹲",
  "split squat": "分腿蹲",
  squat: "深蹲",
  lunge: "弓步",
  "glute bridge": "臀桥",
  bridge: "桥式",
  "hip extension": "髋伸展",
  "hip lift": "提髋",
  "internal rotation": "内旋",
  "external rotation": "外旋",
  pullover: "上拉",
  fly: "飞鸟",
  shrug: "耸肩",
  dip: "臂屈伸",
  crunch: "卷腹",
  twist: "转体",
  plank: "平板支撑",
  stretch: "拉伸",
  jump: "跳",
  "mountain climber": "登山跑",
  burpee: "波比跳",
  crawl: "爬行",
  "good morning": "早安式",
  clean: "翻站",
  "wheel rollerout": "健腹轮推出",
  pushdown: "下压",
  kickback: "后伸",
  rollout: "推出",
  "all fours": "四点支撑",
  "arm slingers": "手臂吊带",
  "arm blaster": "托臂板",
  "behind head": "脑后",
  "military press": "军式推举",
  "wall sit": "靠墙静蹲",
};

const nameWordLabels = {
  assisted: "辅助",
  alternate: "交替",
  alternating: "交替",
  archer: "弓箭手",
  arms: "手臂",
  apart: "打开",
  overhead: "过顶",
  hanging: "悬垂",
  straight: "直",
  bent: "屈",
  knee: "膝",
  knees: "膝",
  legs: "腿",
  leg: "腿",
  lateral: "侧向",
  side: "侧向",
  front: "前",
  back: "后",
  backward: "向后",
  forward: "向前",
  reverse: "反向",
  inverse: "反向",
  around: "环绕",
  circular: "绕环",
  lying: "卧姿",
  prone: "俯卧",
  supine: "仰卧",
  seated: "坐姿",
  standing: "站姿",
  kneeling: "跪姿",
  incline: "上斜",
  decline: "下斜",
  flat: "平板",
  close: "窄",
  narrow: "窄",
  wide: "宽",
  neutral: "中立",
  grip: "握",
  one: "单",
  single: "单",
  arm: "臂",
  two: "双",
  both: "双",
  deep: "深度",
  full: "全程",
  basic: "基础",
  bodyweight: "徒手",
  body: "身体",
  weight: "重量",
  weighted: "负重",
  dumbbell: "哑铃",
  barbell: "杠铃",
  bar: "杆",
  band: "弹力带",
  resistance: "阻力",
  cable: "绳索",
  kettlebell: "壶铃",
  smith: "史密斯机",
  machine: "器械",
  leverage: "固定器械",
  bench: "凳上",
  ball: "球上",
  bosu: "波速球",
  medicine: "药球",
  rope: "绳",
  sled: "雪橇",
  towel: "毛巾",
  floor: "地面",
  wall: "墙面",
  exercise: "训练",
  with: "配合",
  on: "在",
  to: "至",
  and: "",
  v: "V字",
  male: "男士",
  curl: "弯举",
  press: "推举",
  lever: "器械",
  rear: "后束",
  stability: "瑜伽",
  tricep: "肱三头肌",
  delt: "三角肌",
  glute: "臀肌",
  hamstring: "腘绳肌",
  lat: "背阔肌",
  hands: "手部",
  touch: "触碰",
  dips: "臂屈伸",
  blaster: "托臂板",
  run: "跑",
  down: "向下",
  hack: "哈克",
  neck: "颈部",
  attachment: "附件",
  support: "支撑",
  lower: "下",
  throw: "下压",
  lift: "抬起",
  pov: "视角",
  head: "头部",
  behind: "后方",
  high: "高位",
  parallel: "平行",
  guillotine: "断头台式",
  jm: "JM式",
};

const namePhraseEntries = Object.entries(namePhraseLabels)
  .sort((left, right) => right[0].length - left[0].length);

const categoryColors = {
  back: "#2f70b7",
  cardio: "#e4573d",
  chest: "#d89d22",
  "lower arms": "#7d5bbd",
  "lower legs": "#1aa68a",
  neck: "#60717f",
  shoulders: "#1f8fba",
  "upper arms": "#c94878",
  "upper legs": "#26825f",
  waist: "#e06f34",
};

const state = {
  all: [],
  filtered: [],
  visible: PAGE_SIZE,
  query: "",
  category: "all",
  equipment: "all",
  target: "all",
  mode: "all",
  favorites: new Set(readFavorites()),
};

const els = {
  searchInput: document.querySelector("#searchInput"),
  filterToggle: document.querySelector("#filterToggle"),
  filtersPanel: document.querySelector("#filtersPanel"),
  categorySelect: document.querySelector("#categorySelect"),
  equipmentSelect: document.querySelector("#equipmentSelect"),
  targetSelect: document.querySelector("#targetSelect"),
  categoryRail: document.querySelector("#categoryRail"),
  exerciseGrid: document.querySelector("#exerciseGrid"),
  cardTemplate: document.querySelector("#cardTemplate"),
  matchCount: document.querySelector("#matchCount"),
  totalCount: document.querySelector("#totalCount"),
  favoriteCount: document.querySelector("#favoriteCount"),
  visibleLabel: document.querySelector("#visibleLabel"),
  activeLabel: document.querySelector("#activeLabel"),
  loadMoreBtn: document.querySelector("#loadMoreBtn"),
  emptyState: document.querySelector("#emptyState"),
  drawer: document.querySelector("#detailDrawer"),
  drawerBody: document.querySelector("#drawerBody"),
  drawerBackdrop: document.querySelector("#drawerBackdrop"),
  closeDrawerBtn: document.querySelector("#closeDrawerBtn"),
  randomBtn: document.querySelector("#randomBtn"),
  modeButtons: [...document.querySelectorAll(".mode-pill")],
};

const warmedMedia = new Set();

init();

async function init() {
  bindEvents();
  registerServiceWorker();

  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    state.all = data.map(prepareExercise);
    state.filtered = state.all;
    els.totalCount.textContent = state.all.length.toLocaleString("zh-CN");
    hydrateFilters();
    renderCategoryRail();
    applyFilters();
  } catch (error) {
    els.visibleLabel.textContent = "载入失败";
    els.emptyState.hidden = false;
    els.emptyState.querySelector("strong").textContent = "数据没有载入";
    els.emptyState.querySelector("span").textContent = "请用本地服务或网页地址打开，不要直接双击 HTML。";
    console.error(error);
  }
}

function bindEvents() {
  els.searchInput.addEventListener("input", debounce((event) => {
    state.query = event.target.value.trim().toLowerCase();
    resetAndFilter();
  }, 120));

  els.filterToggle.addEventListener("click", () => {
    els.filtersPanel.hidden = !els.filtersPanel.hidden;
  });

  els.categorySelect.addEventListener("change", (event) => {
    state.category = event.target.value;
    syncCategoryRail();
    resetAndFilter();
  });

  els.equipmentSelect.addEventListener("change", (event) => {
    state.equipment = event.target.value;
    resetAndFilter();
  });

  els.targetSelect.addEventListener("change", (event) => {
    state.target = event.target.value;
    resetAndFilter();
  });

  els.categoryRail.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-category]");
    if (!button) return;
    state.category = button.dataset.category;
    els.categorySelect.value = state.category;
    syncCategoryRail();
    resetAndFilter();
  });

  els.modeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.mode = button.dataset.mode;
      els.modeButtons.forEach((item) => {
        const selected = item === button;
        item.classList.toggle("is-active", selected);
        item.setAttribute("aria-selected", String(selected));
      });
      resetAndFilter();
    });
  });

  els.exerciseGrid.addEventListener("click", (event) => {
    const card = event.target.closest(".exercise-card");
    if (!card) return;
    const id = card.dataset.id;
    if (event.target.closest(".save-button")) {
      toggleFavorite(id);
      return;
    }
    openDetail(id);
  });

  els.exerciseGrid.addEventListener("pointerover", (event) => {
    const card = event.target.closest(".exercise-card");
    if (!card) return;
    const exercise = state.all.find((item) => item.id === card.dataset.id);
    if (exercise) warmMedia(exercise.gif_url || exercise.image);
  });

  els.loadMoreBtn.addEventListener("click", () => {
    state.visible += PAGE_SIZE;
    renderGrid();
  });

  els.closeDrawerBtn.addEventListener("click", closeDetail);
  els.drawerBackdrop.addEventListener("click", closeDetail);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeDetail();
  });

  els.drawerBody.addEventListener("click", (event) => {
    const save = event.target.closest("[data-save-detail]");
    const random = event.target.closest("[data-random-detail]");
    if (save) toggleFavorite(save.dataset.saveDetail);
    if (random) openRandomExercise();
  });

  els.randomBtn.addEventListener("click", openRandomExercise);
}

function prepareExercise(exercise) {
  const zhSteps = exercise.instruction_steps?.zh || splitChineseSteps(exercise.instructions?.zh || "");
  const displayName = translateExerciseName(exercise);
  const searchText = [
    displayName,
    exercise.name,
    exercise.category,
    exercise.equipment,
    exercise.target,
    exercise.muscle_group,
    ...(exercise.secondary_muscles || []),
    categoryLabels[exercise.category],
    equipmentLabels[exercise.equipment],
    targetLabels[exercise.target],
  ].filter(Boolean).join(" ").toLowerCase();

  return { ...exercise, zhSteps, displayName, searchText };
}

function hydrateFilters() {
  fillSelect(els.categorySelect, "全部部位", countBy("category"), categoryLabels);
  fillSelect(els.equipmentSelect, "全部器械", countBy("equipment"), equipmentLabels);
  fillSelect(els.targetSelect, "全部目标", countBy("target"), targetLabels);
}

function fillSelect(select, allLabel, counts, labels) {
  const options = [["all", allLabel, state.all.length], ...Object.entries(counts).sort((a, b) => b[1] - a[1]).map(([key, count]) => [key, labels[key] || key, count])];
  select.innerHTML = options.map(([value, label, count]) => (
    `<option value="${escapeAttr(value)}">${escapeHtml(label)} · ${count}</option>`
  )).join("");
}

function renderCategoryRail() {
  const counts = countBy("category");
  const chips = [["all", "全部", state.all.length], ...Object.entries(counts).sort((a, b) => b[1] - a[1]).map(([key, count]) => [key, categoryLabels[key] || key, count])];
  els.categoryRail.innerHTML = chips.map(([key, label, count]) => {
    const color = key === "all" ? "#17212b" : categoryColors[key] || "#1aa68a";
    return `<button class="category-chip" type="button" data-category="${escapeAttr(key)}" style="--chip-color:${color}">
      <span>${count}</span>
      <strong>${escapeHtml(label)}</strong>
    </button>`;
  }).join("");
  syncCategoryRail();
}

function syncCategoryRail() {
  els.categoryRail.querySelectorAll("[data-category]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.category === state.category);
  });
}

function resetAndFilter() {
  state.visible = PAGE_SIZE;
  applyFilters();
}

function applyFilters() {
  state.filtered = state.all.filter((exercise) => {
    if (state.mode === "bodyweight" && exercise.equipment !== "body weight") return false;
    if (state.mode === "favorites" && !state.favorites.has(exercise.id)) return false;
    if (state.category !== "all" && exercise.category !== state.category) return false;
    if (state.equipment !== "all" && exercise.equipment !== state.equipment) return false;
    if (state.target !== "all" && exercise.target !== state.target) return false;
    if (state.query && !exercise.searchText.includes(state.query)) return false;
    return true;
  });

  els.matchCount.textContent = state.filtered.length.toLocaleString("zh-CN");
  els.favoriteCount.textContent = state.favorites.size.toLocaleString("zh-CN");
  els.activeLabel.textContent = getActiveLabel();
  renderGrid();
}

function renderGrid() {
  const slice = state.filtered.slice(0, state.visible);
  const fragment = document.createDocumentFragment();

  slice.forEach((exercise, index) => {
    const node = els.cardTemplate.content.firstElementChild.cloneNode(true);
    const image = node.querySelector("img");
    const main = node.querySelector(".card-main");
    const save = node.querySelector(".save-button");
    node.dataset.id = exercise.id;
    node.style.setProperty("--card-color", categoryColors[exercise.category] || "#1aa68a");
    node.style.setProperty("--card-delay", `${Math.min(index * 10, 160)}ms`);
    prepareSmoothImage(image);
    image.decoding = "async";
    image.src = mediaUrl(exercise.image);
    image.alt = `${exercise.displayName} 缩略图`;
    node.querySelector(".card-kicker").textContent = `${categoryLabels[exercise.category] || exercise.category} / ${targetLabels[exercise.target] || exercise.target}`;
    node.querySelector("strong").textContent = exercise.displayName;
    node.querySelector(".card-original").textContent = exercise.name;
    node.querySelector(".card-meta").textContent = `${equipmentLabels[exercise.equipment] || exercise.equipment} · ${exercise.id}`;
    main.setAttribute("aria-label", `查看 ${exercise.displayName}`);
    save.classList.toggle("is-saved", state.favorites.has(exercise.id));
    save.setAttribute("aria-label", state.favorites.has(exercise.id) ? "取消收藏" : "收藏动作");
    fragment.appendChild(node);
  });

  els.exerciseGrid.replaceChildren(fragment);
  const shown = Math.min(state.visible, state.filtered.length);
  els.visibleLabel.textContent = state.filtered.length ? `${shown} / ${state.filtered.length}` : "0 / 0";
  els.emptyState.hidden = state.filtered.length > 0;
  els.loadMoreBtn.hidden = shown >= state.filtered.length;
}

function openDetail(id) {
  const exercise = state.all.find((item) => item.id === id);
  if (!exercise) return;
  const saved = state.favorites.has(id);
  warmMedia(mediaUrl(exercise.gif_url || exercise.image));
  els.drawerBody.innerHTML = detailMarkup(exercise, saved);
  prepareSmoothImage(els.drawerBody.querySelector(".detail-media img"));
  els.drawerBackdrop.hidden = false;
  document.body.classList.add("drawer-open");
  els.drawer.setAttribute("aria-hidden", "false");
  requestAnimationFrame(() => els.drawer.classList.add("is-open"));
}

function closeDetail() {
  if (els.drawer.getAttribute("aria-hidden") === "true") return;
  els.drawer.classList.remove("is-open");
  els.drawer.setAttribute("aria-hidden", "true");
  document.body.classList.remove("drawer-open");
  window.setTimeout(() => {
    if (!els.drawer.classList.contains("is-open")) els.drawerBackdrop.hidden = true;
  }, 180);
}

function detailMarkup(exercise, saved) {
  const tags = [
    categoryLabels[exercise.category] || exercise.category,
    targetLabels[exercise.target] || exercise.target,
    equipmentLabels[exercise.equipment] || exercise.equipment,
    muscleLabel(exercise.muscle_group),
  ].filter(Boolean);

  return `
    <div class="detail-hero">
      <div class="detail-media">
        <img src="${escapeAttr(mediaUrl(exercise.gif_url || exercise.image))}" alt="${escapeAttr(exercise.displayName)} 动作演示" />
      </div>
      <div class="detail-copy">
        <h3>${escapeHtml(exercise.displayName)}</h3>
        <p class="detail-original">${escapeHtml(exercise.name)}</p>
        <div class="detail-tags">${tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
        <div class="detail-actions">
          <button class="primary-action" type="button" data-save-detail="${escapeAttr(exercise.id)}">${saved ? "已收藏" : "收藏"}</button>
          <button type="button" data-random-detail>随机</button>
        </div>
      </div>
    </div>
    <div class="steps-panel">
      <h4>中文步骤</h4>
      <ol>${exercise.zhSteps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}</ol>
    </div>
    <p class="attribution">${escapeHtml(exercise.attribution || "© Gym visual — https://gymvisual.com/")}</p>
  `;
}

function toggleFavorite(id) {
  if (state.favorites.has(id)) {
    state.favorites.delete(id);
  } else {
    state.favorites.add(id);
  }

  localStorage.setItem(FAVORITES_KEY, JSON.stringify([...state.favorites]));
  els.favoriteCount.textContent = state.favorites.size.toLocaleString("zh-CN");
  applyFilters();

  const openSave = els.drawerBody.querySelector("[data-save-detail]");
  if (openSave && openSave.dataset.saveDetail === id) {
    openSave.textContent = state.favorites.has(id) ? "已收藏" : "收藏";
  }
}

function openRandomExercise() {
  const pool = state.filtered.length ? state.filtered : state.all;
  if (!pool.length) return;
  const pick = pool[Math.floor(Math.random() * pool.length)];
  openDetail(pick.id);
}

function countBy(key) {
  return state.all.reduce((acc, item) => {
    acc[item[key]] = (acc[item[key]] || 0) + 1;
    return acc;
  }, {});
}

function getActiveLabel() {
  const pieces = [];
  if (state.mode === "bodyweight") pieces.push("徒手");
  if (state.mode === "favorites") pieces.push("收藏");
  if (state.category !== "all") pieces.push(categoryLabels[state.category] || state.category);
  if (state.equipment !== "all") pieces.push(equipmentLabels[state.equipment] || state.equipment);
  if (state.target !== "all") pieces.push(targetLabels[state.target] || state.target);
  return pieces.length ? pieces.join(" / ") : "全部动作";
}

function splitChineseSteps(text) {
  return text.split(/[。！？]/).map((item) => item.trim()).filter(Boolean).map((item) => `${item}。`);
}

function translateExerciseName(exercise) {
  const exact = exactNameLabels[exercise.name.toLowerCase()];
  if (exact) return exact;

  const noteLabels = [];
  const baseName = exercise.name.replace(/\(([^)]+)\)/g, (_, note) => {
    const translatedNote = translateNameText(note);
    if (translatedNote) noteLabels.push(translatedNote);
    return " ";
  });
  const translated = translateNameText(baseName);
  const fallback = `${equipmentLabels[exercise.equipment] || ""}${targetLabels[exercise.target] || ""}动作`;
  const main = translated || fallback || exercise.name;
  return noteLabels.length ? `${main}（${noteLabels.join("，")}）` : main;
}

function translateNameText(value) {
  let text = value.toLowerCase()
    .replace(/°/g, "度")
    .replace(/\bv\.\s*(\d+)\b/g, "第$1版")
    .replace(/[–—_]/g, " ")
    .replace(/[-]/g, " ")
    .replace(/[.,]/g, " ")
    .replace(/\//g, " / ")
    .replace(/\s+/g, " ")
    .trim();

  for (const [phrase, label] of namePhraseEntries) {
    const pattern = new RegExp(`\\b${escapeRegExp(phrase).replaceAll("\\ ", "\\s+")}\\b`, "g");
    text = text.replace(pattern, ` ${label} `);
  }

  const translated = text.split(/\s+/)
    .filter(Boolean)
    .map((token) => {
      if (token === "/") return "/";
      if (/^\d+度$/.test(token) || /^\d+\/\d+$/.test(token) || /^第\d+版$/.test(token)) return token;
      return nameWordLabels[token] ?? token;
    })
    .join("");

  return cleanupChineseName(translated);
}

function cleanupChineseName(value) {
  return value
    .replace(/配合毛巾/g, "毛巾辅助")
    .replace(/在球上/g, "球上")
    .replace(/在凳上/g, "凳上")
    .replace(/训练球上/g, "训练球上")
    .replace(/\/+/g, "/")
    .replace(/\s+/g, "")
    .trim();
}

function muscleLabel(value) {
  return muscleLabels[value] || targetLabels[value] || categoryLabels[value] || value;
}

function warmMedia(src) {
  if (!src || warmedMedia.has(src)) return;
  warmedMedia.add(src);
  const image = new Image();
  image.decoding = "async";
  image.src = src;
}

function mediaUrl(path) {
  if (!path || /^https?:\/\//i.test(path)) return path || "";
  const cleanPath = path.replace(/^\.?\//, "");
  if (location.hostname.endsWith("xiaowustudio.cn")) {
    return `${GITHUB_ASSET_BASE}${cleanPath}`;
  }
  return cleanPath;
}

function prepareSmoothImage(image) {
  if (!image) return;
  const markLoaded = () => {
    image.classList.add("is-loaded");
    image.parentElement?.classList.add("is-loaded");
  };
  if (image.complete) {
    requestAnimationFrame(markLoaded);
  } else {
    image.addEventListener("load", markLoaded, { once: true });
  }
}

function readFavorites() {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function debounce(fn, wait) {
  let timer = 0;
  return (...args) => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => fn(...args), wait);
  };
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(value) {
  return escapeHtml(value);
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}
