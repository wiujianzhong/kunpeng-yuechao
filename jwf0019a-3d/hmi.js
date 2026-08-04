const ASSET_BASE = "./assets/hmi-real";
const EVIDENCE_CAPTURE_AT = Date.parse("2026-08-02T10:31:25+08:00");

const baselineProfiles = {
  "capture-composite": {
    label: "实机单日合成示例",
    detail: "多端点单日取证合成培训数据，不对应某一台实机。"
  },
  "yaxin-f1-april": {
    label: "雅新一分厂4月", samples: 126, lines: "清花1—7线", dates: "4.1—4.18", p25: 9354, p50: 11494, p75: 13569
  },
  "yaxin-f3-august": {
    label: "雅新三分厂8月", samples: 186, lines: "清花1—6线", dates: "8.1—8.31", p25: 6360, p50: 7456, p75: 8391
  },
  "yaxin-f3-september": {
    label: "雅新三分厂9月", samples: 180, lines: "清花1—6线", dates: "9.1—9.30", p25: 5600, p50: 6237, p75: 7088
  },
  "yaxin-f3-october": {
    label: "雅新三分厂10月", samples: 186, lines: "清花1—6线", dates: "10.1—10.31", p25: 6273, p50: 7101, p75: 8202
  },
  "ruxin-f1-july": {
    label: "如新一分厂7月", samples: 80, lines: "清花1—8线", dates: "7.1—7.10", p25: 4215, p50: 4924, p75: 5805
  },
  "axin-shift-summary": {
    label: "阿新跨班次汇总", samples: 67, lines: "多车间、多产线", dates: "日期含义待核", p25: 4002, p50: 4643, p75: 5632
  }
};

const scenarios = {
  normal: {
    phenomenon: "前16幅错峰持续刷新，刷新周期以实机为准；4幅精灵眼黑帧。",
    screen: "10个算力通道状态正常；前16幅相邻刷新帧中的棉流位置连续变化。",
    diagnosis: "正常基线要看画面是否持续更新，而不是看有没有移动线条。",
    handling: "无需处置；持续对照画面刷新、流速和局部喷次基线。",
    machineLogs: ["通道5吹阀保护开", "通道3吹阀保护开", "通道1吹阀保护开"]
  },
  "high-spray": {
    phenomenon: "某个局部反复识别，附近电磁阀喷次持续高于相邻阀位。",
    screen: "统计页对应阀位柱状图抬高，触发图像在相近位置重复出现。",
    diagnosis: "先核对重复图像，再检查对应玻璃下缘是否挂花或沾脏花。",
    handling: "先找到高喷阀位和重复触发图，再按对应相机区域检查、清理玻璃下缘，恢复后继续观察喷次。",
    machineLogs: ["前视局部连续触发次数升高", "前视局部吹阀计数持续增加", "相同相机触发记录连续出现"]
  },
  "hang-small": {
    phenomenon: "前视玻璃下缘形成约1厘米毛笔头状挂花。",
    screen: "目标相机附近棉流轻微绕行，喷次小幅波动，远端画面不受影响。",
    diagnosis: "小挂花影响有限，但要观察是否继续扩大。",
    handling: "记录位置并连续观察；若挂花扩大或局部喷次升高，按安全规程停止检测后清理。",
    machineLogs: ["前视局部画面持续刷新", "实时流速仍在8.00至12.00范围", "局部吹阀计数无持续升高"]
  },
  "hang-large": {
    phenomenon: "玻璃下缘约10厘米挂花沾上脏花，附近棉流从两侧绕行。",
    screen: "局部流速凹陷，同一相机出现反复扭曲触发图，对应局部2至3个阀位会误喷白棉。",
    diagnosis: "异常应集中在挂花附近，不会让远处所有阀位同时异常。",
    handling: "按安全规程停止检测，清除脏花并用湿布擦拭通道玻璃；恢复后核对原区域画面和喷次。",
    machineLogs: ["前视局部棉流画面偏移", "同一相机触发频率升高", "对应局部吹阀计数连续增加"]
  },
  blockage: {
    phenomenon: "1.6米通道中约30厘米宽度被一大团棉花局部占据。",
    screen: "被堵区域流速严重下降，两侧棉流绕行，附近检测和喷射位置失准。",
    diagnosis: "应先停机处理堵花，再判断相机、阀和参数。",
    handling: "按安全规程停止检测并清理通道局部棉团；先恢复均匀棉流，再复查检测和喷射。",
    machineLogs: ["局部实时流速明显偏移", "局部棉流画面明显绕行", "正式流速报警条件待现场取证"]
  },
  "duct-blockage": {
    phenomenon: "排杂风道局部形成一大团堵花，抽吸受阻后主通道出现严重偏流。",
    screen: "相机画面仍刷新，但局部棉流明显绕行；流速曲线大幅偏离10.00基准。",
    diagnosis: "先检查排杂风道和圆盘出口处的堵花，再判断检测、喷射参数。",
    handling: "按安全规程停止检测，依次检查排杂风道、涡旋管道与圆盘出口；清理后确认抽吸和流速恢复。",
    machineLogs: ["局部实时流速明显偏移", "主检测画面仍刷新但棉流明显偏移", "正式流速报警条件待现场取证"]
  },
  "flow-abnormal": {
    phenomenon: "棉流速度持续越过10.00±2.00的监控范围。",
    screen: "前16幅主检测画面继续刷新；越界采样连续达到3次后，才触发流速异常报警。",
    diagnosis: "先检查前后风压、通道挂花和排杂风道，再确认流速基准设置。",
    handling: "先查风压、挂花和堵塞，不盲目改参数；故障排除后连续观察至少三次采样是否回到范围内。",
    machineLogs: ["实时流速超出8.00至12.00范围", "流速连续异常计数增加", "通道流速监控状态异常"]
  },
  "camera-fault": {
    phenomenon: "单个主检测相机画面不再刷新，其余15幅主检测画面继续更新，4幅精灵眼仍保持黑帧。",
    screen: "只有一幅主检测画面冻结，右侧以【培训提示】标出对应相机监控异常。",
    diagnosis: "先断电20秒重启复核；反复出现时检查接线并准备更换对应相机。",
    handling: "记录不刷新的相机号；断电20秒后重启复核，若高频复发，检查线缆并更换对应相机。",
    machineLogs: ["单幅主检测画面停止刷新", "其余15幅主检测画面继续刷新", "未刷新画面不再产生新触发记录"]
  },
  "channel-fault": {
    phenomenon: "同一算力通道关联的两台相机同时停止刷新。",
    screen: "同一行两幅画面冻结；顶部通道的真实报警颜色尚未取证，只在机外培训面板标出通讯监控异常。",
    diagnosis: "优先排查该通道线缆和算力盒子，不先判断两台相机同时损坏。",
    handling: "记录异常通道号；断电20秒后重启复核，若反复出现，重点检查线缆并更换对应算力盒子。",
    machineLogs: ["同一通道两幅画面同时停止刷新", "其他通道画面继续刷新", "未刷新的两幅画面不再产生新触发记录"]
  },
  "screen-freeze": {
    phenomenon: "上位机停留在开车画面，20幅相机画面、界面时间与信息不再刷新；设备实际运行状态不能由冻结画面反推。",
    screen: "整组相机画面同时冻结；这与单相机不刷新、同一通道两幅画面不刷新必须分开判断。",
    diagnosis: "优先判断上位机软件或系统卡住，不把它误判成20台相机同时故障；真实报警文字仍待实机取证。",
    handling: "按安全流程停止检测和整机断电，等待20秒后重新上电；Linux和检测软件加载约需3分钟，恢复后确认20幅画面重新刷新。",
    machineLogs: ["上位机相机画面整体停止刷新", "界面时间与信息停留在同一时刻", "设备运行状态需结合现场另行确认"]
  },
  "recognized-no-eject": {
    phenomenon: "触发页已经生成异物识别记录，但对应阀位没有出现相应喷射动作。",
    screen: "目标相机继续刷新并留下触发图；对应阀位计数未随该条记录增长，异物仍随棉流通过。",
    diagnosis: "沿识别记录、算力输出、喷阀指示、气压、电磁阀、喷嘴、延时和排杂吸力逐项排查，不能只凭一个画面直接判定阀体损坏。",
    handling: "先核对触发时间和对应阀位，再检查供气、插头、电磁阀与喷嘴；需要测阀时必须按现场安全和权限流程执行。",
    machineLogs: ["目标相机产生新的异物识别记录", "对应阀位计数未随该条记录增加", "喷射链路需要人工逐项核查"]
  },
  temperature: {
    phenomenon: "某个算力通道温度超过报警阈值。",
    screen: "相机仍刷新；顶部通道的真实报警颜色和正式报警文案尚未取证，只在机外培训面板显示高温异常。",
    diagnosis: "先检查积花、散热片和风扇，再判断算力盒子。",
    handling: "按安全规程停止检测，检查积花、散热片间隙和风扇是否卡死；温度恢复后再观察通道状态。",
    machineLogs: ["算力通道温度从57.0℃上升", "通道温度超过60.0℃阈值", "高温监控状态异常"]
  },
  "lamp-brightness": {
    phenomenon: "目标相机画面仍持续刷新，但局部亮度明显偏离相邻相机。",
    screen: "相机画面不冻结；右侧仅以【培训提示】说明亮度监控现象，正式报警文字待实机取证。",
    diagnosis: "先区分画面不刷新与画面仍刷新但亮度异常，再检查灯板、供电、玻璃洁净度和亮度基线。",
    handling: "记录相机号与亮度差异；按安全规程检查灯板、接线和玻璃，处理后继续观察画面亮度与刷新。",
    machineLogs: ["目标相机画面持续刷新", "目标区域亮度偏离相邻画面", "灯管亮度监控现象需人工核查"]
  },
  "air-pressure-low": {
    phenomenon: "识别与阀命令仍可出现，但供气不足导致实际喷气力量整体偏弱。",
    screen: "触发记录和软件阀计数不能证明物理喷气充足；气压值未接入模拟器，只在外部培训面板提示。",
    diagnosis: "先查气源、压力、阀板供气与漏气点，再判断电磁阀或喷嘴。",
    handling: "按现场安全流程检查气源与供气管路；恢复后用现场可验证方法确认实际喷气，不只看软件计数。",
    machineLogs: ["识别记录与阀命令仍可产生", "实际喷气强度需要现场核查", "气源压力不足为培训推演"]
  },
  "waste-bag-full": {
    phenomenon: "废料袋逐步充满并形成大面积遮挡，约10秒后进入满袋观察阶段。",
    screen: "不强制抬高喷次，也不生成异常触发图；右侧培训面板显示满袋形成过程。",
    diagnosis: "废料满袋属于排杂末端物理状态，不能仅靠喷次或触发图反推。",
    handling: "按安全规程停止相关设备并处理废料袋；处理后观察培训推演不代表已完成实机闭环验证。",
    machineLogs: ["废料袋遮挡逐步形成", "约10秒后进入满袋观察", "喷次与触发记录不作为满袋判据"]
  },
  "fan-overload": {
    phenomenon: "风机热过载现象持续后，培训模拟停止检测动作。",
    screen: "停止后运行时间、相机刷新、触发记录和喷次累计暂停；正式报警文字与复位闭环待实机取证。",
    diagnosis: "先检查风机积花、通风、负载和热保护，不把停检直接判成相机故障。",
    handling: "按安全规程停机并检查风机；人工确认处理后仅推演重新观察，不宣称实机已经恢复。",
    machineLogs: ["风机热过载现象持续", "培训模拟停止检测动作", "等待人工检查风机与热保护"]
  },
  "valve-long-blow": {
    phenomenon: "目标电磁阀出现持续漏气或长喷的机械现象。",
    screen: "机械漏气不一定对应软件喷次增长，界面不强制抬高目标阀统计。",
    diagnosis: "软件计数是阀命令记录，不等于阀体实际持续漏气时长。",
    handling: "按安全规程检查阀体、密封、阀板与接线；处理后通过现场动作确认，不只看统计数值。",
    machineLogs: ["目标阀存在持续漏气培训现象", "软件喷次不强制随漏气增加", "物理阀体需要现场检查"]
  },
  "valve-weak-blow": {
    phenomenon: "目标区域有识别记录并发出阀命令，但实际喷气不足。",
    screen: "触发图与目标阀命令计数可以正常产生；外部培训面板单独提示物理喷气偏弱。",
    diagnosis: "有软件计数不等于喷气足够，应检查气压、阀体、喷嘴和供气路径。",
    handling: "核对识别记录和对应阀位后，按安全流程检查供气、阀体及喷嘴；处理后观察不代表实机闭环已取证。",
    machineLogs: ["目标相机产生识别记录", "对应阀命令计数增加", "实际喷气强度不足需现场确认"]
  },
  "camera-485": {
    phenomenon: "单幅相机画面停止刷新，其他画面继续更新。",
    screen: "目标相机冻结且不再新增触发记录；右侧只写【培训提示】，不伪造正式485报警原文或顶部变色。",
    diagnosis: "现有证据不足以仅凭冻结画面区分相机故障与485通讯异常，需结合现场报警和线路检查。",
    handling: "记录相机号与现场报警；按安全流程检查485线路、接头和相机，处理后再观察该画面是否恢复刷新。",
    machineLogs: ["单幅相机画面停止刷新", "目标相机不再产生新触发记录", "相机485通讯异常为培训推演"]
  }
};

const PHASE = {
  STOPPED: "STOPPED",
  RUN_BASELINE: "RUN_BASELINE",
  FAULT_FORMING: "FAULT_FORMING",
  FAULT_OBSERVABLE: "FAULT_OBSERVABLE",
  ALARM_ACTIVE: "ALARM_ACTIVE",
  RECOVERY: "RECOVERY"
};

const PHASE_LABELS = {
  [PHASE.STOPPED]: "已关车",
  [PHASE.RUN_BASELINE]: "实时基线",
  [PHASE.FAULT_FORMING]: "异常形成",
  [PHASE.FAULT_OBSERVABLE]: "界面可观察",
  [PHASE.ALARM_ACTIVE]: "监控异常",
  [PHASE.RECOVERY]: "恢复观察"
};

const PHASE_DURATION = {
  [PHASE.RUN_BASELINE]: 3,
  [PHASE.FAULT_FORMING]: 3,
  [PHASE.FAULT_OBSERVABLE]: 6,
  [PHASE.ALARM_ACTIVE]: 4,
  [PHASE.RECOVERY]: 3
};

const SCENARIO_PHASE_DURATION = {
  "flow-abnormal": { [PHASE.FAULT_FORMING]: 2 },
  "waste-bag-full": { [PHASE.FAULT_FORMING]: 10 },
  "fan-overload": { [PHASE.FAULT_OBSERVABLE]: 4, [PHASE.ALARM_ACTIVE]: 3 }
};

function phaseDuration(phase = state.phase) {
  return SCENARIO_PHASE_DURATION[state.scenario]?.[phase] || PHASE_DURATION[phase] || 1;
}

const MANUAL_RECOVERY_SCENARIOS = new Set([
  "high-spray", "hang-small", "hang-large", "blockage", "duct-blockage",
  "flow-abnormal", "camera-fault", "channel-fault", "screen-freeze",
  "recognized-no-eject", "temperature", "lamp-brightness", "air-pressure-low",
  "waste-bag-full", "fan-overload", "valve-long-blow", "valve-weak-blow", "camera-485"
]);

const state = {
  scenario: "normal",
  position: 18,
  screen: "main",
  stat: "valve",
  selectedChannel: 1,
  framePhase: 0,
  cameraPhases: Array(16).fill(0),
  cameraCursor: 0,
  playing: false,
  awaitingManual: false,
  running: true,
  phase: PHASE.RUN_BASELINE,
  phaseTick: 0,
  runtimeSeconds: 154 * 3600 + 13 * 60 + 43,
  liveFlow: 10,
  dayTotal: 69708,
  spiritTotal: 0,
  tick: 0,
  logEvents: [],
  flowAbnormalCount: 0,
  flowAlarm: false,
  logClock: EVIDENCE_CAPTURE_AT,
  temperature: 57,
  selectedTrigger: 12,
  selectedTriggerKey: null,
  triggerSerial: 0,
  triggerRecords: [],
  triggerEvents: [],
  playbackBaseline: null,
  playbackClock: null,
  playbackElapsed: 0,
  roundClockActive: false,
  flowSamples: [],
  hourlyFlow: [],
  hourlySpray: [],
  frontValves: [],
  rearValves: [],
  baseline: "capture-composite",
  simClockAt: EVIDENCE_CAPTURE_AT
};

const startupParams = new URLSearchParams(window.location.search);
const startupScenario = startupParams.get("scenario");
const startupScreen = startupParams.get("screen");
const startupStat = startupParams.get("stat");
const startupAccountOpen = startupScreen === "account";
const startupBaseline = startupParams.get("baseline");
if (scenarios[startupScenario]) {
  state.scenario = startupScenario;
  state.phase = PHASE.RUN_BASELINE;
}
if (["main", "stats", "triggers", "settings"].includes(startupScreen)) state.screen = startupScreen;
if (["valve", "flow", "spirit", "history"].includes(startupStat)) state.stat = startupStat;
if (baselineProfiles[startupBaseline]) state.baseline = startupBaseline;

const cameraLabels = [
  "前1", "后1", "前2", "后2", "前3", "后3", "前4", "后4",
  "前5", "后5", "前6", "后6", "前7", "后7", "前8", "后8",
  "精灵1", "精灵2", "精灵3", "精灵4"
];
const channelOrder = [1, 3, 5, 7, 9, 2, 4, 6, 8, 10];
const triggerCameraSources = Array.from({ length: 32 }, (_, index) => index < 20 ? index + 1 : [1, 4, 7, 10, 13, 16, 17, 18, 19, 20, 5, 12][index - 20]);

const pad2 = (value) => String(value).padStart(2, "0");
const targetChannel = () => Math.max(1, Math.min(8, Math.ceil(state.position / 4)));
const targetCameraIndex = () => (targetChannel() - 1) * 2;
const cameraSource = (index, phase) => `${ASSET_BASE}/cameras/cam-${pad2(index + 1)}-${index < 16 && phase ? "b" : "a"}.png`;
const readyCameraFrames = new Set();
const trainingText = (text) => text.startsWith("培训模拟：") ? text : `培训模拟：${text}`;
const trainingLogText = (text) => text.startsWith("【培训提示】") ? text : `【培训提示】${text}`;
const trainingNow = () => new Date(state.simClockAt);
const trainingHour = () => trainingNow().getHours();

function phaseEffect() {
  if (state.scenario === "normal" || state.phase === PHASE.RUN_BASELINE || state.phase === PHASE.STOPPED) return 0;
  if (state.phase === PHASE.FAULT_FORMING) return .42;
  if (state.phase === PHASE.RECOVERY) return .32;
  return 1;
}

function phaseIsObservable() {
  return phaseEffect() >= .95;
}

function frozenCameraIndexes() {
  if (!phaseIsObservable()) return [];
  const target = targetCameraIndex();
  if (state.scenario === "camera-fault") return [target];
  if (state.scenario === "camera-485") return [target];
  if (state.scenario === "channel-fault") return [target, target + 1];
  if (state.scenario === "screen-freeze") return Array.from({ length: 20 }, (_, index) => index);
  return [];
}

function hmiDisplayFrozen() {
  return state.scenario === "screen-freeze" && phaseIsObservable();
}

function physicalDetectionPaused() {
  return state.scenario === "fan-overload" && state.phase === PHASE.ALARM_ACTIVE;
}

function trainingTimelinePaused() {
  return state.awaitingManual;
}

function initializeHourlySpray(total) {
  const currentHour = trainingHour();
  const weights = Array.from({ length: currentHour + 1 }, (_, index) => 72 + (index * 17) % 41 + Math.round(Math.sin(index * .81) * 9));
  const weightTotal = weights.reduce((sum, value) => sum + value, 0);
  const values = Array(25).fill(null);
  let used = 0;
  weights.forEach((weight, index) => {
    const value = index === currentHour ? total - used : Math.floor(total * weight / weightTotal);
    values[index] = value;
    used += value;
  });
  return values;
}

function initializeValveTotals() {
  const front = Array.from({ length: 32 }, (_, index) => Math.max(80, Math.round(640 + Math.sin(index * .64) * 230 + (index * 53) % 260)));
  const rear = Array.from({ length: 32 }, (_, index) => Math.max(80, Math.round(560 + Math.sin(index * .71 + .8) * 190 + (index * 47) % 230)));
  return { front, rear };
}

function initializeHistories() {
  state.hourlySpray = initializeHourlySpray(state.dayTotal);
  state.hourlyFlow = Array.from({ length: 25 }, (_, index) => index <= trainingHour() ? Number((10.1 + Math.sin(index * .7) * .34).toFixed(2)) : null);
  state.flowSamples = Array.from({ length: 18 }, (_, index) => Number((10.05 + Math.sin(index * .72) * .28).toFixed(2)));
  const valves = initializeValveTotals();
  state.frontValves = valves.front;
  state.rearValves = valves.rear;
}

function initializeTriggerRecords() {
  const clock = state.simClockAt;
  state.triggerRecords = triggerCameraSources.map((cameraSourceNumber, index) => ({
    id: `evidence-${index + 1}`,
    imageIndex: index + 1,
    cameraSourceNumber,
    at: clock - index * 850,
    repeated: false
  }));
}

function updateClock() {
  const now = trainingNow();
  const date = `${now.getFullYear()}-${pad2(now.getMonth() + 1)}-${pad2(now.getDate())}`;
  const time = `${pad2(now.getHours())}:${pad2(now.getMinutes())}:${pad2(now.getSeconds())}`;
  document.querySelector("#machine-date").textContent = `星期${"日一二三四五六"[now.getDay()]} ${date} ${time}`;
  const hours = Math.floor(state.runtimeSeconds / 3600);
  const minutes = Math.floor(state.runtimeSeconds % 3600 / 60);
  const seconds = state.runtimeSeconds % 60;
  document.querySelector("#runtime-value").textContent = `${String(hours).padStart(4, "0")}时${pad2(minutes)}分${pad2(seconds)}秒`;
}

function tickClock() {
  if (trainingTimelinePaused() || hmiDisplayFrozen()) return;
  state.simClockAt += 1000;
  updateClock();
}

function renderChannels() {
  const root = document.querySelector("#channel-status");
  root.innerHTML = channelOrder.map((channel) => {
    const label = channel <= 8 ? `通道${channel}` : `精灵Eye${channel - 8}`;
    const classes = ["channel-chip"];
    if (channel === state.selectedChannel) classes.push("selected");
    return `<button class="${classes.join(" ")}" data-channel="${channel}" type="button" disabled title="通道切换行为尚无完整实机取证">${label}</button>`;
  }).join("");
}

function cameraClasses(index) {
  const target = targetCameraIndex();
  const classes = ["camera-card"];
  if (frozenCameraIndexes().includes(index)) classes.push("freeze");
  if (phaseEffect() > 0 && ["hang-small", "hang-large"].includes(state.scenario) && index === target) classes.push("hang");
  if (state.scenario === "hang-large" && index === target) classes.push("large");
  if (phaseEffect() > 0 && state.scenario === "blockage" && (index === target || index === target + 1)) classes.push("blocked");
  if (phaseEffect() > 0 && state.scenario === "lamp-brightness" && index === target) classes.push("brightness-abnormal");
  return classes;
}

function renderCameras() {
  const root = document.querySelector("#camera-grid");
  const previousSources = new Map(Array.from(root.querySelectorAll(".camera-card")).map((card) => [Number(card.dataset.camera), card.querySelector("img")?.src]));
  root.innerHTML = cameraLabels.map((label, index) => {
    const classes = cameraClasses(index);
    const marker = classes.includes("hang") ? '<i class="hang-mark"></i>' : classes.includes("blocked") ? '<i class="blockage-mark"></i>' : "";
    const frozenSource = previousSources.get(index);
    const shouldHoldFrame = classes.includes("freeze") || !state.running;
    const phase = index < 16 ? state.cameraPhases[index] : 0;
    const source = shouldHoldFrame && frozenSource ? frozenSource : cameraSource(index, phase);
    return `<div class="${classes.join(" ")}" data-camera="${index}">
      <img src="${source}" alt="" aria-label="${label}相机棉流画面">
      ${marker}<small>${label}</small>
    </div>`;
  }).join("");
  root.querySelectorAll(".camera-card img").forEach((image) => {
    image.addEventListener("load", () => {
      const source = image.getAttribute("src");
      if (source) readyCameraFrames.add(source);
      delete image.dataset.fallbackApplied;
    });
    image.addEventListener("error", () => {
      if (image.dataset.fallbackApplied === "1") return;
      const card = image.closest(".camera-card");
      const index = Number(card?.dataset.camera);
      if (!Number.isInteger(index)) return;
      image.dataset.fallbackApplied = "1";
      state.cameraPhases[index] = 0;
      image.src = cameraSource(index, 0);
    });
  });
}

function tickCameraFrames() {
  if (!state.running || physicalDetectionPaused() || trainingTimelinePaused() || hmiDisplayFrozen()) return;
  const cards = document.querySelectorAll(".camera-card");
  for (let offset = 0; offset < 4; offset += 1) {
    const index = (state.cameraCursor + offset) % 16;
    const card = cards[index];
    if (!card || card.classList.contains("freeze")) continue;
    const nextPhase = state.cameraPhases[index] ? 0 : 1;
    const nextSource = cameraSource(index, nextPhase);
    if (!readyCameraFrames.has(nextSource)) continue;
    const image = card.querySelector("img");
    if (!image) continue;
    state.cameraPhases[index] = nextPhase;
    image.src = nextSource;
  }
  state.cameraCursor = (state.cameraCursor + 4) % 16;
}

function timeText(offsetSeconds) {
  const date = new Date(state.simClockAt - offsetSeconds * 1000);
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())} ${pad2(date.getHours())}:${pad2(date.getMinutes())}:${pad2(date.getSeconds())}`;
}

function eventTimeText(timestamp) {
  const date = new Date(timestamp);
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())} ${pad2(date.getHours())}:${pad2(date.getMinutes())}:${pad2(date.getSeconds())}`;
}

function scenarioLogLines() {
  if (!state.running) return ["设备已停止检测", "画面刷新、流速采样与喷次累计均已暂停"].map(trainingLogText);
  if (state.phase === PHASE.RUN_BASELINE || state.scenario === "normal") return scenarios.normal.machineLogs.map(trainingLogText);
  if (state.scenario === "waste-bag-full" && state.phase === PHASE.FAULT_FORMING) {
    return [`废料袋遮挡形成 ${Math.min(10, state.phaseTick)}/10秒`, "喷次不强制抬高", "不生成异常触发记录"].map(trainingLogText);
  }
  if (state.phase === PHASE.FAULT_FORMING) return ["主检测画面持续刷新", "监控采样连续记录中", `当前流速 ${state.liveFlow.toFixed(2)}`].map(trainingLogText);
  if (state.phase === PHASE.RECOVERY) return ["已进入处理后观察培训推演", "是否真实恢复需由现场继续确认", `当前流速 ${state.liveFlow.toFixed(2)}`].map(trainingLogText);
  if (state.scenario !== "flow-abnormal" && !["blockage", "duct-blockage"].includes(state.scenario)) return scenarios[state.scenario].machineLogs.map(trainingLogText);
  if (state.flowAlarm) return ["连续3次流速越界", "通道流速监控状态异常", `当前流速 ${state.liveFlow.toFixed(2)}`].map(trainingLogText);
  if (state.flowAbnormalCount > 0) return [`流速越界采样 ${state.flowAbnormalCount}/3`, "前2次只记录计数，尚未触发报警"].map(trainingLogText);
  return scenarios[state.scenario].machineLogs.map(trainingLogText);
}

function renderLogs() {
  const base = scenarioLogLines();
  const normal = ["通道5吹阀保护开", "通道3吹阀保护开", "通道1吹阀保护开", "阀保护计数正常"].map(trainingLogText);
  const entries = Array.from({ length: 28 }, (_, index) => {
    if (state.logEvents[index]) return state.logEvents[index];
    const text = index < base.length ? base[index] : normal[index % normal.length];
    return { text, warn: phaseIsObservable() && state.scenario !== "normal" && index < base.length, at: state.logClock - index * 3000 };
  });
  document.querySelector("#runtime-log-list").innerHTML = entries.map((item, index) => {
    const timestamp = item.at ? eventTimeText(item.at) : timeText(index * 3);
    return `<div class="log-line${item.warn ? " warn" : ""}">${timestamp}: ${item.text}</div>`;
  }).join("");
}

function makeValues(count, base, variance) {
  return Array.from({ length: count }, (_, index) => Math.max(0, Math.round(base + Math.sin(index * 1.41 + state.tick * .11) * variance + (index * 47) % 113)));
}

function valveValues(rear = false) {
  return [...(rear ? state.rearValves : state.frontValves)];
}

function chartBlock(title, values, labels, hot = [], cold = []) {
  const numericValues = values.filter((value) => Number.isFinite(value));
  const max = Math.max(...numericValues, 1);
  const bars = values.map((value, index) => {
    const future = !Number.isFinite(value);
    const classes = ["bar"];
    if (hot.includes(index)) classes.push("hot");
    if (cold.includes(index)) classes.push("cold");
    if (future) classes.push("future");
    const height = future ? 0 : Math.max(2, value / max * 88);
    return `<span class="${classes.join(" ")}" style="height:${height}%">${future ? "" : `<em>${value}</em>`}<i>${labels[index]}</i></span>`;
  }).join("");
  return `<article class="chart-block"><h2>${title}</h2><div class="bar-chart">${bars}</div></article>`;
}

function renderValveStats() {
  const hot = [];
  if (phaseEffect() > 0 && ["high-spray", "hang-large"].includes(state.scenario)) hot.push(trainingHour());
  const affected = phaseEffect() > 0 && ["high-spray", "hang-large"].includes(state.scenario)
    ? Array.from({ length: 32 }, (_, index) => index).filter((index) => Math.abs(index + 1 - state.position) <= 1)
    : [];
  const commandOnly = phaseEffect() > 0 && ["recognized-no-eject", "valve-weak-blow"].includes(state.scenario)
    ? [state.position - 1]
    : [];
  document.querySelector("#stat-valve").innerHTML = [
    chartBlock("气阀吹气总数统计", state.hourlySpray, Array.from({ length: 25 }, (_, index) => index), hot),
    chartBlock("前视统计", valveValues(false), Array.from({ length: 32 }, (_, index) => index + 1), affected, commandOnly),
    chartBlock("后视统计", valveValues(true), Array.from({ length: 32 }, (_, index) => index + 1), [])
  ].join("");
}

function lineCoordinates(values) {
  const max = 20;
  return values.map((value, index) => Number.isFinite(value)
    ? [20 + index * (720 / Math.max(1, values.length - 1)), 180 - value / max * 150]
    : null);
}

function lineChart(title, values, danger = [], labels = [], xAxisTitle = "") {
  const grid = [30, 67, 104, 141, 178].map((y) => `<line class="grid-line" x1="20" y1="${y}" x2="740" y2="${y}"/>`).join("");
  const coordinates = lineCoordinates(values);
  const points = coordinates.filter(Boolean).map((point) => point.join(",")).join(" ");
  const dangerIndexes = Array.isArray(danger) ? danger : danger >= 0 ? [danger] : [];
  const marker = dangerIndexes.map((index) => {
    const point = coordinates[index];
    return point ? `<circle class="flow-danger" cx="${point[0]}" cy="${point[1]}" r="5"/>` : "";
  }).join("");
  const xLabels = labels.map((label, index) => {
    const x = 20 + index * (720 / Math.max(1, labels.length - 1));
    return `<text class="flow-axis-label" x="${x}" y="193" text-anchor="middle">${label}</text>`;
  }).join("");
  return `<article class="chart-block"><h2>${title}</h2><svg class="line-chart" viewBox="0 0 760 205" preserveAspectRatio="none">${grid}<text class="flow-axis-label" x="4" y="33">20</text><text class="flow-axis-label" x="4" y="70">15</text><text class="flow-axis-label" x="4" y="107">10</text><text class="flow-axis-label" x="8" y="144">5</text><text class="flow-axis-label" x="8" y="181">0</text><text class="flow-axis-title" x="8" y="112" text-anchor="middle" transform="rotate(-90 8 112)">流速(m/s)</text><polyline class="flow-line" points="${points}"/>${marker}${xLabels}<text class="flow-axis-title" x="380" y="204" text-anchor="middle">${xAxisTitle}</text></svg></article>`;
}

function renderFlowStats() {
  const time = [...state.hourlyFlow];
  const positions = Array.from({ length: 32 }, (_, index) => 10.2 + Math.sin(index * .72) * .3);
  let danger = [];
  const center = state.position - 1;
  if (phaseEffect() > 0 && state.scenario === "hang-small") positions[center] = 9.65;
  if (phaseEffect() > 0 && state.scenario === "hang-large") {
    danger = [center - 1, center, center + 1].filter((index) => index >= 0 && index < 32);
    danger.forEach((index) => { positions[index] = index === center ? 6.9 : 8.15; });
  }
  if (phaseEffect() > 0 && ["blockage", "duct-blockage"].includes(state.scenario)) {
    danger = Array.from({ length: 7 }, (_, offset) => center - 3 + offset).filter((index) => index >= 0 && index < 32);
    danger.forEach((index) => {
      const distance = Math.abs(index - center);
      if (state.scenario === "blockage") positions[index] = [5.4, 7.1, 12.8, 11.6][distance];
      else positions[index] = [5.9, 7.2, 13.5, 12.8][distance];
    });
  }
  if (phaseEffect() > 0 && state.scenario === "flow-abnormal") {
    danger = Array.from({ length: 32 }, (_, index) => index);
    positions.forEach((value, index) => { positions[index] = 12.7 + Math.sin(index * .9) * 1.05; });
  }
  const recentDanger = time.map((value, index) => value < 8 || value > 12 ? index : -1).filter((index) => index >= 0);
  document.querySelector("#stat-flow").innerHTML = [
    lineChart("总体流速统计", time, recentDanger, Array.from({ length: 25 }, (_, index) => index), "时间(h)"),
    lineChart("实时流速统计", positions, danger, Array.from({ length: 32 }, (_, index) => index + 1), "气阀编号")
  ].join("");
}

function renderSpiritStats() {
  const hours = Array(24).fill(0);
  const positions = Array(32).fill(0);
  document.querySelector("#stat-spirit").innerHTML = [
    chartBlock("JLEye总数统计", hours, Array.from({ length: 24 }, (_, index) => index)),
    chartBlock("JLEye统计", positions, Array.from({ length: 32 }, (_, index) => index + 1))
  ].join("");
}

function renderCalendar() {
  const rows = [
    [31, 26, 27, 28, 29, 30, 31, 1],
    [32, 2, 3, 4, 5, 6, 7, 8],
    [33, 9, 10, 11, 12, 13, 14, 15],
    [34, 16, 17, 18, 19, 20, 21, 22],
    [35, 23, 24, 25, 26, 27, 28, 29],
    [36, 30, 31, 1, 2, 3, 4, 5]
  ];
  document.querySelector("#calendar-grid").innerHTML = rows.flatMap((row, rowIndex) => row.map((day, columnIndex) => {
    const classes = [];
    if (columnIndex === 0) classes.push("week-number");
    if (columnIndex === 1 || columnIndex === 7) classes.push("weekend");
    if ((rowIndex === 0 && columnIndex >= 1 && columnIndex <= 6) || (rowIndex === 5 && columnIndex >= 3)) classes.push("outside-month");
    if (rowIndex === 0 && columnIndex === 7) classes.push("active");
    return `<span class="${classes.join(" ")}">${day}</span>`;
  })).join("");
}

function renderStats() {
  document.querySelector("#day-total").textContent = state.dayTotal;
  document.querySelector("#spirit-total").textContent = state.spiritTotal;
  renderValveStats();
  renderFlowStats();
  renderSpiritStats();
  renderCalendar();
}

function triggerCameraLabel(source) {
  if (source <= 16) return cameraLabels[source - 1];
  return `精灵相机${source - 16}`;
}

function renderTriggers() {
  const grid = document.querySelector("#trigger-grid");
  grid.setAttribute("aria-label", "最近32条触发记录");
  const records = [...state.triggerEvents, ...state.triggerRecords].slice(0, 32);
  if (state.selectedTriggerKey) {
    const stableIndex = records.findIndex((record) => record.id === state.selectedTriggerKey);
    if (stableIndex >= 0) state.selectedTrigger = stableIndex;
  }
  state.selectedTrigger = Math.max(0, Math.min(records.length - 1, state.selectedTrigger));
  grid.innerHTML = records.map((record, index) => {
    const imageIndex = record.imageIndex;
    const cameraSourceNumber = record.cameraSourceNumber;
    return `<button class="trigger-thumb${index === state.selectedTrigger ? " active" : ""}${record.repeated ? " repeated" : ""}" data-trigger="${index}" data-record-id="${record.id}" data-image="${imageIndex}" data-camera-source="${cameraSourceNumber}" data-trigger-time="${record.at}" data-repeated="${record.repeated ? "1" : "0"}" data-kind="${record.kind || ""}" type="button"><img src="${ASSET_BASE}/triggers/trigger-${pad2(imageIndex)}.png" alt="最近触发记录${index + 1}，来源${triggerCameraLabel(cameraSourceNumber)}"></button>`;
  }).join("");
  grid.querySelectorAll("button").forEach((button) => button.addEventListener("click", () => selectTrigger(Number(button.dataset.trigger))));
  selectTrigger(state.selectedTrigger);
}

function selectTrigger(index) {
  state.selectedTrigger = Math.max(0, Math.min(31, index));
  document.querySelectorAll(".trigger-thumb").forEach((item, itemIndex) => item.classList.toggle("active", itemIndex === index));
  const selected = document.querySelectorAll(".trigger-thumb")[index];
  state.selectedTriggerKey = selected?.dataset.recordId || null;
  const imageIndex = Number(selected?.dataset.image || index + 1);
  const cameraSourceNumber = Number(selected?.dataset.cameraSource || triggerCameraSources[index]);
  const triggerTime = Number(selected?.dataset.triggerTime || state.triggerRecords[index]?.at || state.logClock);
  const detailImage = document.querySelector("#trigger-large-image");
  const isRepeated = selected?.dataset.repeated === "1";
  const triggerKind = selected?.dataset.kind || "";
  const hasCapturedDetail = !triggerKind && !isRepeated && imageIndex === 13;
  detailImage.src = hasCapturedDetail
    ? `${ASSET_BASE}/triggers/detail.png`
    : `${ASSET_BASE}/triggers/trigger-${pad2(imageIndex)}.png`;
  const distorted = isRepeated;
  detailImage.classList.toggle("distorted", distorted);
  document.querySelector("#trigger-number").textContent = imageIndex;
  const box = document.querySelector("#trigger-box");
  box.hidden = !isRepeated;
  const left = Math.max(2, Math.min(91, 4 + (state.position - 1) / 31 * 84 + index % 3));
  box.style.left = `${left}%`;
  box.style.top = `${36 + index % 4 * 9}%`;
  const evidence = document.querySelector("#trigger-evidence");
  evidence.textContent = triggerKind === "recognized-no-eject"
    ? "【培训模拟】该条识别记录已经生成；对应阀位未见与该条同步的喷次增长。"
    : triggerKind === "valve-weak-blow"
    ? "【培训模拟】该条识别记录和阀命令计数已经生成；实际喷气不足需在现场另行确认。"
    : triggerKind
    ? "【培训模拟】该条识别事件由运行场景生成，用于联动相机来源、阀位和喷次。"
    : isRepeated
    ? "【培训模拟】同一局部反复触发，缩略图按相近棉束形态连续积累。"
    : hasCapturedDetail
      ? "实机取证：该条有完整详情画面和检测框。"
      : "实机取证：该条仅保留缩略图，暂无对应高清详情证据。";
}

function renderReading() {
  const data = scenarios[state.scenario];
  const prefix = state.scenario === "normal" ? (text) => text : trainingText;
  document.querySelector("#scene-phenomenon").textContent = prefix(data.phenomenon);
  const flowProgress = state.scenario === "flow-abnormal" ? ` 当前连续越界计数：${state.flowAbnormalCount}/3${state.flowAlarm ? "，已报警。" : "，尚未报警。"}` : "";
  document.querySelector("#scene-screen").textContent = prefix(`${data.screen}${flowProgress}`);
  document.querySelector("#scene-diagnosis").textContent = prefix(data.diagnosis);
  document.querySelector("#scene-handling").textContent = prefix(data.handling);
  renderPhase();
}

function renderBaselineProfile() {
  const profile = baselineProfiles[state.baseline];
  const select = document.querySelector("#baseline-select");
  const detail = document.querySelector("#baseline-detail");
  select.value = state.baseline;
  detail.textContent = profile.samples
    ? `人工日报参考资料（不参与本次模拟）· ${profile.lines} · ${profile.dates} · ${profile.samples}点 · P25 ${profile.p25} / P50 ${profile.p50} / P75 ${profile.p75}。不是HMI原始日志。`
    : profile.detail;
}

function renderPhase() {
  const label = document.querySelector("#phase-label");
  const progress = document.querySelector("#phase-progress");
  const strip = document.querySelector(".phase-strip");
  const duration = phaseDuration();
  label.textContent = state.awaitingManual
    ? "等待人工处理"
    : state.phase === PHASE.ALARM_ACTIVE && state.scenario === "flow-abnormal"
      ? "流速异常报警"
      : PHASE_LABELS[state.phase];
  progress.value = state.phase === PHASE.STOPPED ? 0 : Math.min(100, state.phaseTick / duration * 100);
  const formalAlarm = state.scenario === "flow-abnormal" && state.flowAlarm;
  const observation = !formalAlarm && [PHASE.FAULT_OBSERVABLE, PHASE.ALARM_ACTIVE].includes(state.phase);
  strip.classList.toggle("warning", formalAlarm);
  strip.classList.toggle("observation", observation);
}

function scenarioFlowValue() {
  const baseline = 10.05 + Math.sin(state.tick * .72) * .22;
  const effect = phaseEffect();
  if (!effect) return baseline;
  if (state.scenario === "flow-abnormal") {
    if (state.phase === PHASE.FAULT_FORMING) return [12.7, 13.1, 13.3][Math.min(2, state.phaseTick)];
    if (state.phase === PHASE.RECOVERY) return 10.2;
    return 13.3 + Math.sin(state.tick * .55) * .18;
  }
  const targets = {
    "hang-small": 9.72,
    "hang-large": 9.12,
    blockage: 6.45,
    "duct-blockage": 5.85
  };
  const target = targets[state.scenario];
  if (!Number.isFinite(target)) return baseline;
  return baseline + (target + Math.sin(state.tick * .48) * .26 - baseline) * effect;
}

function updateLiveIndicators() {
  const flow = state.liveFlow.toFixed(2);
  document.querySelector("#live-flow").textContent = flow;
  document.querySelector("#log-spray").textContent = state.dayTotal;
  const indicator = document.querySelector("#run-state");
  const paused = physicalDetectionPaused();
  indicator.textContent = state.awaitingManual
    ? "● 等待人工处理（培训时间线暂停）"
    : paused
      ? "● 检测动作已暂停（培训推演）"
      : state.running
        ? "● 正在开车（培训模拟）"
        : "● 已关车（培训模拟）";
  indicator.classList.toggle("stopped", state.awaitingManual || !state.running || paused);
  const live = document.querySelector(".training-live");
  const formalAlarm = state.scenario === "flow-abnormal" && state.flowAlarm;
  const observation = !formalAlarm && [PHASE.FAULT_OBSERVABLE, PHASE.ALARM_ACTIVE].includes(state.phase);
  live.classList.toggle("alert", formalAlarm);
  live.classList.toggle("observation", observation);
  renderPhysicalReadout();
  renderBaselineProfile();
}

function renderPhysicalReadout() {
  const active = phaseEffect() > 0;
  let pressure = "未接入真实压力值";
  let action = active ? "物理动作待现场确认" : "检测与喷射动作正常（培训基线）";
  if (active && state.scenario === "screen-freeze") action = "界面停留在开车画面；设备实际动作待现场确认";
  if (active && state.scenario === "lamp-brightness") action = `${cameraLabels[targetCameraIndex()]}仍刷新，局部亮度偏离`;
  if (active && state.scenario === "air-pressure-low") {
    pressure = "低于现场正常区间（培训推演）";
    action = "阀命令可产生，实际喷气整体偏弱";
  }
  if (active && state.scenario === "waste-bag-full") {
    action = state.phase === PHASE.FAULT_FORMING
      ? `废料袋遮挡形成中 ${Math.min(10, state.phaseTick)}/10秒`
      : "废料袋大面积遮挡（培训推演）";
  }
  if (active && state.scenario === "fan-overload") action = physicalDetectionPaused() ? "检测动作暂停，等待人工检查" : "风机热过载现象持续";
  if (active && state.scenario === "valve-long-blow") action = `第${state.position}号阀持续漏气；软件喷次不等同漏气时长`;
  if (active && state.scenario === "valve-weak-blow") action = `第${state.position}号阀有命令，实际喷气不足`;
  if (active && state.scenario === "camera-485") action = `${cameraLabels[targetCameraIndex()]}停止刷新且无新增触发`;
  if (state.awaitingManual) action = "培训时间线已暂停；不代表实机停机";
  document.querySelector("#air-pressure").textContent = pressure;
  document.querySelector("#physical-action").textContent = action;
}

function renderFrozenTrainingState() {
  const indicator = document.querySelector("#run-state");
  indicator.textContent = "● 上位机画面冻结；设备状态待现场确认";
  indicator.classList.add("stopped");
  renderPhysicalReadout();
  renderPhase();
}

function pushRuntimeEvent(text, warn = false) {
  const at = state.roundClockActive ? state.playbackClock + state.playbackElapsed * 1000 : state.simClockAt;
  state.logClock = at;
  state.logEvents.unshift({ text: trainingLogText(text), warn, at });
}

function liveEventText() {
  const events = {
    normal: "前16幅主检测画面刷新正常，4幅精灵眼保持黑帧",
    "high-spray": `第${state.position}号阀局部喷次继续升高`,
    "hang-small": `第${state.position}号阀附近流速轻微波动`,
    "hang-large": `第${state.position}号阀附近反复出现扭曲触发图，局部白棉喷次增加`,
    blockage: `第${state.position}号阀附近流速下降，两侧位置流速升高`,
    "duct-blockage": "主检测画面持续刷新，实时位置流速出现明显偏移",
    "flow-abnormal": state.flowAlarm ? "连续3次流速越界，已触发报警" : `流速越界采样 ${state.flowAbnormalCount}/3`,
    "camera-fault": `${cameraLabels[targetCameraIndex()]}画面未刷新，其余主检测画面继续刷新`,
    "channel-fault": `通道${targetChannel()}两路画面同时未刷新`,
    "screen-freeze": "上位机20幅相机画面与界面时间同时停止刷新",
    "recognized-no-eject": `${cameraLabels[targetCameraIndex()]}产生识别记录，但第${state.position}号阀计数未随该条记录增加`,
    temperature: `通道${targetChannel()}当前温度 ${state.temperature.toFixed(1)}℃`,
    "lamp-brightness": `${cameraLabels[targetCameraIndex()]}仍刷新，但局部亮度偏离相邻画面`,
    "air-pressure-low": "阀命令仍可产生，实际喷气强度需要现场核查",
    "waste-bag-full": "废料袋形成大面积遮挡，喷次与触发记录不作为判据",
    "fan-overload": physicalDetectionPaused() ? "风机热过载后检测动作暂停" : "风机热过载现象持续",
    "valve-long-blow": `第${state.position}号阀持续漏气，软件喷次不强制抬高`,
    "valve-weak-blow": `第${state.position}号阀有命令计数，但实际喷气不足`,
    "camera-485": `${cameraLabels[targetCameraIndex()]}画面停止刷新且不再新增触发记录`
  };
  return events[state.scenario];
}

function resetFlowAlarm() {
  state.flowAbnormalCount = 0;
  state.flowAlarm = false;
}

function sampleFlowAlarm() {
  if (state.scenario !== "flow-abnormal") {
    resetFlowAlarm();
    return;
  }
  const outOfRange = state.liveFlow < 8 || state.liveFlow > 12;
  if (!outOfRange) {
    if (state.flowAbnormalCount > 0) pushRuntimeEvent("流速恢复监控范围，连续异常计数清零");
    resetFlowAlarm();
    return;
  }
  state.flowAbnormalCount = Math.min(3, state.flowAbnormalCount + 1);
  if (state.flowAbnormalCount < 3) {
    pushRuntimeEvent(`流速越界采样 ${state.flowAbnormalCount}/3，尚未触发报警`, true);
    return;
  }
  const firstAlarm = !state.flowAlarm;
  if (firstAlarm) pushRuntimeEvent("连续3次流速越界，触发流速异常报警", true);
  state.flowAlarm = true;
  if (firstAlarm && state.playing && state.scenario === "flow-abnormal" && ![PHASE.ALARM_ACTIVE, PHASE.RECOVERY].includes(state.phase)) {
    enterPhase(PHASE.ALARM_ACTIVE);
  }
}

function updateTemperature() {
  if (!state.running) return;
  if (state.scenario !== "temperature" || !phaseEffect()) {
    state.temperature = 57 + Math.sin(state.tick * .31) * .25;
    return;
  }
  const values = {
    [PHASE.FAULT_FORMING]: 59.2,
    [PHASE.FAULT_OBSERVABLE]: 61.4,
    [PHASE.ALARM_ACTIVE]: 63.2,
    [PHASE.RECOVERY]: 58.4
  };
  state.temperature = (values[state.phase] || 57) + Math.sin(state.tick * .37) * .18;
}

function updateSettingsMonitors() {
  // 实机设置页顶部六项仅作固定标签还原；动态培训数值留在右侧培训面板。
}

function sprayIncrement() {
  if (state.phase === PHASE.STOPPED) return 0;
  if (phaseEffect() > 0 && state.scenario === "high-spray") return 9;
  if (phaseEffect() > 0 && state.scenario === "hang-large") return 6;
  return 2 + state.tick % 2;
}

function currentDetectionEvent() {
  const localBlockageEvent = phaseEffect() > 0 && state.scenario === "blockage" && state.tick % 3 === 0;
  const targeted = phaseEffect() > 0 && (["high-spray", "hang-large", "recognized-no-eject", "valve-weak-blow"].includes(state.scenario) || localBlockageEvent);
  let front = targeted || state.tick % 2 === 0;
  let valveIndex = targeted ? state.position - 1 : (front ? state.tick * 3 : state.tick * 5) % 32;
  let group = Math.floor(valveIndex / 4);
  let cameraSourceNumber = group * 2 + (front ? 1 : 2);
  const unavailable = new Set(state.scenario === "screen-freeze" ? [] : frozenCameraIndexes().map((index) => index + 1));
  if (unavailable.has(cameraSourceNumber)) {
    cameraSourceNumber = Array.from({ length: 16 }, (_, index) => index + 1).find((source) => !unavailable.has(source)) || cameraSourceNumber;
    front = cameraSourceNumber % 2 === 1;
    group = Math.floor((cameraSourceNumber - 1) / 2);
    valveIndex = group * 4 + state.tick % 4;
  }
  return { front, valveIndex, cameraSourceNumber };
}

function emitDetectionEvent(amount) {
  if (phaseEffect() > 0 && state.scenario === "waste-bag-full") return;
  const event = currentDetectionEvent();
  const noEject = phaseEffect() > 0 && state.scenario === "recognized-no-eject";
  const currentHour = trainingHour();
  if (!noEject) {
    state.hourlySpray[currentHour] = (state.hourlySpray[currentHour] || 0) + amount;
    (event.front ? state.frontValves : state.rearValves)[event.valveIndex] += amount;
    state.dayTotal += amount;
  }
  const repeated = phaseEffect() > 0 && ["high-spray", "hang-large", "recognized-no-eject", "valve-weak-blow"].includes(state.scenario);
  state.triggerEvents.unshift({
    id: `training-${++state.triggerSerial}`,
    imageIndex: repeated ? [28, 29][state.tick % 2] : (state.tick - 1) % 32 + 1,
    cameraSourceNumber: event.cameraSourceNumber,
    at: state.roundClockActive ? state.playbackClock + state.playbackElapsed * 1000 : state.simClockAt,
    repeated,
    kind: repeated ? state.scenario : "normal"
  });
  state.triggerEvents = state.triggerEvents.slice(0, 32);
}

function capturePlaybackBaseline() {
  if (state.playbackBaseline) return;
  state.playbackClock = state.simClockAt;
  state.playbackBaseline = {
    simClockAt: state.simClockAt,
    runtimeSeconds: state.runtimeSeconds,
    liveFlow: state.liveFlow,
    dayTotal: state.dayTotal,
    spiritTotal: state.spiritTotal,
    tick: state.tick,
    logEvents: state.logEvents.map((event) => ({ ...event })),
    logClock: state.logClock,
    temperature: state.temperature,
    selectedTrigger: 12,
    flowSamples: [...state.flowSamples],
    hourlyFlow: [...state.hourlyFlow],
    hourlySpray: [...state.hourlySpray],
    frontValves: [...state.frontValves],
    rearValves: [...state.rearValves],
    cameraPhases: [...state.cameraPhases]
  };
}

function restorePlaybackBaseline() {
  const baseline = state.playbackBaseline;
  if (!baseline) return;
  state.runtimeSeconds = baseline.runtimeSeconds;
  state.simClockAt = baseline.simClockAt;
  state.liveFlow = baseline.liveFlow;
  state.dayTotal = baseline.dayTotal;
  state.spiritTotal = baseline.spiritTotal;
  state.tick = baseline.tick;
  state.logEvents = baseline.logEvents.map((event) => ({ ...event }));
  state.logClock = baseline.logClock;
  state.temperature = baseline.temperature;
  state.selectedTrigger = baseline.selectedTrigger;
  state.selectedTriggerKey = null;
  state.flowSamples = [...baseline.flowSamples];
  state.hourlyFlow = [...baseline.hourlyFlow];
  state.hourlySpray = [...baseline.hourlySpray];
  state.frontValves = [...baseline.frontValves];
  state.rearValves = [...baseline.rearValves];
  state.cameraPhases = [...baseline.cameraPhases];
  state.triggerEvents = [];
  state.playbackElapsed = 0;
}

function syncPositionLock() {
  const slider = document.querySelector("#position-slider");
  slider.disabled = state.playing || state.awaitingManual;
  slider.title = slider.disabled ? "联动播放或等待人工处理期间位置已锁定" : "";
}

function phaseScreen(phase) {
  if ([PHASE.STOPPED, PHASE.RUN_BASELINE, PHASE.FAULT_FORMING, PHASE.RECOVERY].includes(phase)) return ["main", null];
  if (state.scenario === "temperature") return ["main", null];
  if (["high-spray", "hang-large", "recognized-no-eject", "valve-weak-blow"].includes(state.scenario)) {
    return phase === PHASE.FAULT_OBSERVABLE ? ["triggers", null] : ["stats", "valve"];
  }
  if (["hang-small", "blockage", "duct-blockage", "flow-abnormal"].includes(state.scenario)) return ["stats", "flow"];
  return ["main", null];
}

function enterPhase(phase) {
  state.phase = phase;
  state.phaseTick = 0;
  state.awaitingManual = false;
  if (phase === PHASE.FAULT_OBSERVABLE && ["high-spray", "hang-large", "recognized-no-eject", "valve-weak-blow"].includes(state.scenario)) {
    state.selectedTrigger = 0;
    state.selectedTriggerKey = null;
  }
  const [screen, stat] = phaseScreen(phase);
  setScreen(screen);
  if (stat) setStat(stat);
  if (phase === PHASE.FAULT_FORMING) pushRuntimeEvent("实时基线后出现连续偏离，开始记录异常形成过程", true);
  if (phase === PHASE.FAULT_OBSERVABLE && !(state.scenario === "flow-abnormal" && state.flowAlarm)) pushRuntimeEvent(liveEventText(), true);
  if (phase === PHASE.ALARM_ACTIVE && state.scenario !== "flow-abnormal") pushRuntimeEvent("异常现象持续，培训界面进入监控观察阶段", true);
  if (phase === PHASE.RECOVERY) pushRuntimeEvent("已确认现场处理，开始处理后观察培训推演；是否真实恢复需现场确认");
}

function finishScenarioPlayback() {
  state.playing = false;
  state.awaitingManual = false;
  pushRuntimeEvent("本轮处理后观察培训推演结束；是否真实恢复需现场确认");
  state.roundClockActive = false;
  state.phase = PHASE.RUN_BASELINE;
  state.phaseTick = 0;
  resetFlowAlarm();
  setScreen("main");
  const button = document.querySelector("#play-scenario");
  button.classList.remove("playing");
  button.textContent = "重新播放完整联动";
  syncPositionLock();
}

function advanceScenarioPhase() {
  if (!state.playing) return;
  state.phaseTick += 1;
  if (state.phaseTick < phaseDuration()) return;
  if (state.scenario === "normal" && state.phase === PHASE.RUN_BASELINE) {
    finishScenarioPlayback();
    return;
  }
  if (state.phase === PHASE.ALARM_ACTIVE && MANUAL_RECOVERY_SCENARIOS.has(state.scenario)) {
    state.playing = false;
    state.awaitingManual = true;
    state.phaseTick = phaseDuration(PHASE.ALARM_ACTIVE);
    const button = document.querySelector("#play-scenario");
    button.classList.remove("playing");
    button.textContent = "确认已完成现场处理，推演处理后观察";
    pushRuntimeEvent("本培训不自动推演恢复；真实恢复条件待取证，需人工确认完成现场处理", true);
    syncPositionLock();
    renderPhase();
    return;
  }
  const next = {
    [PHASE.RUN_BASELINE]: PHASE.FAULT_FORMING,
    [PHASE.FAULT_FORMING]: PHASE.FAULT_OBSERVABLE,
    [PHASE.FAULT_OBSERVABLE]: PHASE.ALARM_ACTIVE,
    [PHASE.ALARM_ACTIVE]: PHASE.RECOVERY
  }[state.phase];
  if (state.scenario === "flow-abnormal" && state.phase === PHASE.FAULT_OBSERVABLE && !state.flowAlarm) {
    state.phaseTick = phaseDuration(PHASE.FAULT_OBSERVABLE);
    return;
  }
  if (state.phase === PHASE.RECOVERY || !next) finishScenarioPlayback();
  else enterPhase(next);
}

function tickMachine() {
  if (!state.running) return;
  const paused = physicalDetectionPaused();
  const timelinePaused = trainingTimelinePaused();
  if (timelinePaused) {
    if (hmiDisplayFrozen()) renderFrozenTrainingState();
    else {
      renderPhase();
      renderPhysicalReadout();
    }
    return;
  }
  if (hmiDisplayFrozen()) {
    advanceScenarioPhase();
    renderFrozenTrainingState();
    return;
  }
  state.tick += 1;
  if (state.roundClockActive && state.playing) state.playbackElapsed += 1;
  if (!paused && !timelinePaused) {
    state.runtimeSeconds += 1;
    state.liveFlow = scenarioFlowValue();
    state.flowSamples.push(Number(state.liveFlow.toFixed(2)));
    state.hourlyFlow[trainingHour()] = Number(state.liveFlow.toFixed(2));
    sampleFlowAlarm();
    updateTemperature();
    emitDetectionEvent(sprayIncrement());
  }
  if (!paused && !timelinePaused && state.tick % 3 === 0 && state.scenario !== "flow-abnormal" && state.phase !== PHASE.RUN_BASELINE) pushRuntimeEvent(liveEventText(), state.scenario !== "normal");
  advanceScenarioPhase();
  if (hmiDisplayFrozen()) {
    renderFrozenTrainingState();
    return;
  }
  updateClock();
  updateLiveIndicators();
  updateSettingsMonitors();
  renderChannels();
  renderCameras();
  renderLogs();
  renderReading();
  if (state.screen === "stats") renderStats();
  if (state.screen === "triggers") renderTriggers();
}

function renderAll() {
  renderChannels();
  renderCameras();
  renderLogs();
  renderStats();
  renderTriggers();
  renderReading();
  updateLiveIndicators();
  updateSettingsMonitors();
  updateRunToggleButton();
}

function setAccountDialog(open) {
  const dialog = document.querySelector("#account-failure-dialog");
  const accountButton = document.querySelector("#account-button");
  dialog.hidden = !open;
  accountButton.classList.toggle("active", open);
}

function updateRunToggleButton() {
  const button = document.querySelector("#run-toggle");
  const settingsView = state.screen === "settings";
  const alarmLabels = {
    "high-spray": "喷次<br>异常",
    "hang-small": "挂花<br>观察",
    "hang-large": "挂花<br>异常",
    blockage: "通道<br>堵花",
    "duct-blockage": "风道<br>堵塞",
    "flow-abnormal": "流速<br>异常",
    "camera-fault": "相机<br>故障",
    "channel-fault": "通讯<br>故障",
    "screen-freeze": "画面<br>卡住",
    "recognized-no-eject": "喷射<br>异常",
    temperature: "高温<br>报警",
    "lamp-brightness": "亮度<br>异常",
    "air-pressure-low": "气压<br>不足",
    "waste-bag-full": "废料<br>满袋",
    "fan-overload": "风机<br>过载",
    "valve-long-blow": "气阀<br>长喷",
    "valve-weak-blow": "气阀<br>弱喷",
    "camera-485": "485<br>故障"
  };
  button.disabled = true;
  document.querySelector(".machine-header").classList.toggle("settings-mode", settingsView);
  button.classList.toggle("settings-readonly", settingsView);
  button.classList.remove("start", "recovering");
  if (settingsView) {
    button.innerHTML = "关闭<br>工控阀";
    button.title = "当前系统参数快照只读；培训模拟不操作工控阀";
    return;
  }
  if (!state.running || state.phase === PHASE.STOPPED) {
    button.innerHTML = "停止<br>检测";
    button.title = "当前已停止检测";
    return;
  }
  if (state.phase === PHASE.RECOVERY) {
    button.classList.add("recovering");
    button.innerHTML = "恢复<br>观察";
    button.title = "当前正在进行处理后观察";
    return;
  }
  if (phaseIsObservable() && state.scenario !== "normal") {
    button.innerHTML = alarmLabels[state.scenario] || "异常<br>观察";
    button.title = `${scenarios[state.scenario].phenomenon}（培训模拟）`;
    return;
  }
  button.classList.add("start");
  button.innerHTML = "开<br>车";
  button.title = "当前正在开车";
}

function setScreen(name) {
  if (name === "account") {
    setAccountDialog(document.querySelector("#account-failure-dialog").hidden);
    return;
  }
  setAccountDialog(false);
  state.screen = name;
  document.querySelectorAll(".machine-screen").forEach((screen) => { screen.hidden = screen.id !== `screen-${name}`; });
  document.querySelectorAll("[data-screen]").forEach((button) => button.classList.toggle("active", button.dataset.screen === name));
  document.querySelector(".machine-nav").classList.toggle("is-hidden", name === "settings");
  updateRunToggleButton();
}

function setStat(name) {
  state.stat = name;
  document.querySelectorAll("[data-stat]").forEach((button) => button.classList.toggle("active", button.dataset.stat === name));
  ["valve", "flow", "spirit"].forEach((panel) => {
    document.querySelector(`#stat-${panel}`).hidden = name === "history" ? panel !== "spirit" : panel !== name;
  });
  document.querySelector("#stat-history").hidden = name !== "history";
}

function cancelScenarioPlayback() {
  state.playing = false;
  state.awaitingManual = false;
  state.roundClockActive = false;
  const button = document.querySelector("#play-scenario");
  if (button) {
    button.classList.remove("playing");
    button.textContent = "播放完整联动";
  }
  syncPositionLock();
}

function setScenario(name) {
  cancelScenarioPlayback();
  restorePlaybackBaseline();
  state.scenario = name;
  state.playbackBaseline = null;
  state.playbackClock = null;
  state.triggerEvents = [];
  state.selectedTrigger = 12;
  state.selectedTriggerKey = null;
  resetFlowAlarm();
  state.phase = state.running ? PHASE.RUN_BASELINE : PHASE.STOPPED;
  state.phaseTick = 0;
  state.liveFlow = state.running ? scenarioFlowValue() : 0;
  if (state.running) pushRuntimeEvent("已选择培训场景，等待播放");
  document.querySelectorAll("[data-scenario]").forEach((button) => button.classList.toggle("active", button.dataset.scenario === name));
  renderAll();
}

function setRunning(running) {
  cancelScenarioPlayback();
  restorePlaybackBaseline();
  state.playbackBaseline = null;
  state.playbackClock = null;
  state.triggerEvents = [];
  state.running = running;
  const indicator = document.querySelector("#run-state");
  indicator.textContent = running ? "● 正在开车（培训模拟）" : "● 已关车（培训模拟）";
  indicator.classList.toggle("stopped", !running);
  updateRunToggleButton();
  document.querySelector(".hmi-window").classList.toggle("stopped", !running);
  resetFlowAlarm();
  state.phase = running ? PHASE.RUN_BASELINE : PHASE.STOPPED;
  state.phaseTick = 0;
  state.liveFlow = running ? scenarioFlowValue() : 0;
  if (!running) state.temperature = 57;
  updateLiveIndicators();
  pushRuntimeEvent(running ? "设备开始检测，前16幅主检测画面恢复刷新，4幅精灵眼保持黑帧" : "设备已停止检测，累计与流速采样暂停", !running);
  renderAll();
}

document.querySelectorAll("[data-screen]").forEach((button) => button.addEventListener("click", () => setScreen(button.dataset.screen)));
document.querySelector("#account-button").addEventListener("click", () => setScreen("account"));
document.querySelector("#account-failure-confirm").addEventListener("click", () => setAccountDialog(false));
document.querySelector("#account-failure-close").addEventListener("click", () => setAccountDialog(false));
document.querySelectorAll("[data-stat]").forEach((button) => button.addEventListener("click", () => setStat(button.dataset.stat)));
document.querySelectorAll("[data-scenario]").forEach((button) => button.addEventListener("click", () => setScenario(button.dataset.scenario)));
document.querySelector("#position-slider").addEventListener("input", (event) => {
  if (!state.awaitingManual) {
    restorePlaybackBaseline();
    state.playbackBaseline = null;
    state.playbackClock = null;
  }
  state.position = Number(event.target.value);
  document.querySelector("#position-value").textContent = `${state.position}号阀`;
  renderAll();
});

document.querySelector("#baseline-select").addEventListener("change", (event) => {
  state.baseline = event.target.value;
  renderBaselineProfile();
});

document.querySelector("#play-scenario").addEventListener("click", () => {
  if (!state.playing && state.awaitingManual && MANUAL_RECOVERY_SCENARIOS.has(state.scenario)) {
    state.playing = true;
    enterPhase(PHASE.RECOVERY);
    const recoveryButton = document.querySelector("#play-scenario");
    recoveryButton.classList.add("playing");
    recoveryButton.textContent = "正在推演处理后观察…";
    pushRuntimeEvent("用户已确认完成现场处理，进入处理后观察培训推演；是否真实恢复需现场确认");
    syncPositionLock();
    renderAll();
    return;
  }
  cancelScenarioPlayback();
  if (!state.running) setRunning(true);
  capturePlaybackBaseline();
  restorePlaybackBaseline();
  state.playing = true;
  state.roundClockActive = true;
  state.phase = PHASE.RUN_BASELINE;
  state.phaseTick = 0;
  resetFlowAlarm();
  state.liveFlow = scenarioFlowValue();
  const button = document.querySelector("#play-scenario");
  button.classList.add("playing");
  button.textContent = "正在播放联动…";
  syncPositionLock();
  setScreen("main");
  pushRuntimeEvent("开始播放培训联动");
  renderAll();
});

[
  ...Array.from({ length: 16 }, (_, index) => [cameraSource(index, 0), cameraSource(index, 1)]).flat(),
  ...Array.from({ length: 4 }, (_, index) => cameraSource(index + 16, 0))
].forEach((src) => {
  const image = new Image();
  image.addEventListener("load", () => readyCameraFrames.add(src), { once: true });
  image.src = src;
  if (image.complete && image.naturalWidth > 0) readyCameraFrames.add(src);
});
Array.from({ length: 32 }, (_, index) => `${ASSET_BASE}/triggers/trigger-${pad2(index + 1)}.png`).forEach((src) => { const image = new Image(); image.src = src; });

initializeHistories();
initializeTriggerRecords();
updateClock();
document.querySelectorAll("[data-scenario]").forEach((button) => button.classList.toggle("active", button.dataset.scenario === state.scenario));
renderAll();
setScreen(state.screen);
if (startupAccountOpen) setAccountDialog(true);
setStat(state.stat);
syncPositionLock();
setInterval(tickClock, 1000);
setInterval(tickCameraFrames, 200);
setInterval(tickMachine, 1000);
