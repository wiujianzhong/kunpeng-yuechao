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
  },
  "yaxin-f1-20260727-0731": {
    label: "雅新一分厂7线 2026-07-27—31", samples: 35, lines: "清花1-1至1-7线", dates: "2026-07-27—31", measure: "日累计喷次", p25: 72821, p50: 83440, p75: 95310
  }
};

const TRAINING_MACHINE_META = {
  scheme: "912",
  lampLife: "2483/30000",
  version: "JLH_2026.01.10.0930"
};

const evidenceSnapshots = {
  "endpoint-1-1": {
    label: "端点1-1（2026-08-02）",
    capturedAt: "2026-08-02 23:43:14",
    scheme: "912",
    lampLife: "3464/30000",
    runtime: "0114:54:40",
    version: "JLH_2026.01.10.0930",
    dayTotal: 52338,
    spiritTotal: 0,
    selectedChannel: 10,
    actionButton: "关车",
    available: ["main", "valve", "flow", "spirit", "history", "triggers"],
    historyEvidence: { calendarOpen: true, selectedDay: 1, queryResultCaptured: false },
    hourlySpray: [3113,3159,3146,3203,3242,3117,3339,3293,3314,3166,1874,3343,3346,3283,3457,3197,1746,null,null,null,null,null,null,null,null],
    frontValves: [462,839,1200,1281,1142,1038,982,875,757,788,748,693,672,809,880,914,977,964,972,967,946,1014,1073,1025,983,1051,1304,1354,1369,1365,1025,473],
    rearValves: [408,786,1113,1129,1033,1013,1083,1031,942,924,1009,954,881,901,932,919,978,994,1001,954,870,855,920,970,1039,1156,1310,1277,1260,1317,1003,472],
    flowSteps: [[0,10.5],[9.95,10.5],[10.1,0],[10.35,0],[10.45,10.5],[16.85,10.5],[17,0],[24,0]],
    mainLogs: [
      { atText: "截图记录", text: "模型加载" },
      { atText: "截图记录", text: "系统启动" },
      { atText: "截图记录", text: "通道1吹阀保护开" }
    ]
  },
  "endpoint-1-2": {
    label: "端点1-2",
    capturedAt: "2026-08-02 23:42:12",
    scheme: "912",
    lampLife: "4186/30000",
    runtime: "0116:03:46",
    version: "JLH_2026.01.10.0930",
    dayTotal: 65184,
    spiritTotal: 0,
    selectedChannel: 10,
    actionButton: "关车",
    available: ["valve"],
    hourlySpray: [3700,3728,3790,3265,2862,1986,1070,1845,2147,3279,54,null,2452,4007,1585,4200,3963,4045,3726,4133,4186,3712,1449,null,null],
    frontValves: [706,1153,1552,1548,1225,1023,1046,1120,1091,1205,1249,1243,1058,954,856,995,1069,912,953,1130,1070,872,803,894,881,806,941,1097,1158,1102,920,514],
    rearValves: [852,1393,1865,1872,1464,1127,1106,1084,1003,962,1052,1318,1609,1761,1694,1670,1639,1512,1556,1622,1492,1297,1252,1374,1418,1445,1641,1747,1812,1780,1459,821]
  },
  "endpoint-2-2": {
    label: "端点2-2",
    capturedAt: "2026-08-02 23:48:04",
    scheme: "912",
    lampLife: "4884/30000",
    runtime: "0091:31:23",
    version: "JLH_2026.01.10.0930",
    dayTotal: null,
    spiritTotal: null,
    selectedChannel: 1,
    actionButton: null,
    available: ["main"],
    mainLogs: [
      { atText: "2026-08-02 11:49:09", text: "通道5吹阀保护开" },
      { atText: "2026-08-02 11:49:36", text: "通道5吹阀保护开" },
      { atText: "2026-08-02 11:49:58", text: "通道5吹阀保护开" },
      { atText: "2026-08-02 11:50:17", text: "通道5吹阀保护开" },
      { atText: "2026-08-02 12:25:00", text: "急停按钮按下" },
      { atText: "2026-08-02 12:35:40", text: "急停按钮弹出" }
    ]
  }
};

const scenarios = {
  normal: {
    phenomenon: "前16幅错峰持续刷新，刷新周期以实机为准；本次取证末4幅精灵眼素材为黑帧，不能作为正常标准。",
    screen: "10个算力通道状态正常；前16幅相邻刷新帧中的棉流位置连续变化，精灵眼正常运行形态待补充取证。",
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
    phenomenon: "单个主检测相机画面不再刷新，其余15幅主检测画面继续更新。",
    screen: "只有一幅主检测画面冻结，右侧以【培训提示】标出对应相机监控异常。",
    diagnosis: "先断电20秒重启复核；反复出现时检查接线并准备更换对应相机。",
    handling: "记录不刷新的相机号；断电20秒后重启复核，若高频复发，检查线缆并更换对应相机。",
    machineLogs: ["单幅主检测画面停止刷新", "其余15幅主检测画面继续刷新", "未刷新画面不再产生新触发记录"]
  },
  "channel-fault": {
    phenomenon: "同一算力通道关联的两台相机同时停止刷新。",
    screen: "同一行两幅上位机画面冻结；下位机可能仍在检测喷出，也可能是通道完全不工作，不能只凭画面下结论。",
    diagnosis: "先结合喷次、流速、日志和现场动作区分显示不同步与通道完全故障，再排查线缆和算力盒子。",
    handling: "记录异常通道号；断电20秒后重启复核，若反复出现，重点检查线缆并更换对应算力盒子。",
    machineLogs: ["同一通道两幅上位机画面同时停止刷新", "其他通道画面继续刷新", "物理检测状态需结合喷次、流速、日志与现场动作确认"]
  },
  "screen-freeze": {
    phenomenon: "上位机停留在开车画面，20幅相机画面、界面时间与信息不再刷新；设备实际运行状态不能由冻结画面反推。",
    screen: "整组相机画面同时冻结；这与单相机不刷新、同一通道两幅画面不刷新必须分开判断。",
    diagnosis: "优先判断上位机软件或系统卡住，不把它误判成20台相机同时故障；真实报警文字仍待实机取证。",
    handling: "按安全流程停止检测和整机断电，等待20秒后重新上电；Linux和检测软件加载约需3分钟。培训恢复观察只核对前16幅主检测画面与界面时钟，精灵眼正常刷新形态仍待取证。",
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
    phenomenon: "厂家资料确认气源压力不足会报警；当前缺少同机台报警时的阀命令与喷气联动录像。",
    screen: "只显示低压报警培训态；不把软件阀计数、触发记录与实际喷气强度强行绑定。",
    diagnosis: "先查外部气源、压力、通道挂花堵花、阀板供气与漏气点，再判断电磁阀或喷嘴。",
    handling: "按现场安全流程检查气源与供气管路；恢复后用现场可验证方法确认实际喷气，不只看软件计数。",
    machineLogs: ["气源压力不足报警培训态", "检查外部气源与通道挂花堵花", "实际喷气与界面联动待实机取证"]
  },
  "waste-bag-full": {
    phenomenon: "废棉袋光电头被遮挡约10秒后，界面进入“废料满袋”报警培训态。",
    screen: "显示光电遮挡计时，不用喷次或触发图模拟袋体实际装满。",
    diagnosis: "报警既可能来自废料袋状态，也可能来自光电头被棉絮遮挡，应同时检查。",
    handling: "按安全规程检查废料袋并清理光电头；恢复后继续观察是否再次报警。",
    machineLogs: ["废料满袋光电遮挡计时", "约10秒后进入报警培训态", "检查废料袋并清理光电头"]
  },
  "fan-overload": {
    phenomenon: "风机热过载时接触器断开，设备无法继续检测。",
    screen: "只确定显示风机过载培训报警；运行时间、相机刷新、喷次等具体界面联动仍待实机取证。",
    diagnosis: "先检查风机积花、堵塞、通风、负载和热保护，不把无法检测直接判成相机故障。",
    handling: "按安全规程停机清堵，由合格人员检查并复位热继电器；恢复后再确认检测状态。",
    machineLogs: ["风机热过载，接触器断开", "当前无法检测", "清堵后由合格人员检查并复位热继电器"]
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

// 证据等级：A厂家说明书，B厂家培训/正式函，C现场截图/维修记录，D长期实机经验，E培训推演。
// “已确认”可以进入运行模拟；“未取证”不得伪造成实机报警原文或确定的物理联动。
const scenarioEvidence = {
  normal: { level: "C/D", confirmed: "前16幅主检测画面应持续错峰刷新。", unknown: "本次取证末4幅精灵眼为黑帧，不能作为正常运行标准。" },
  "high-spray": { level: "C/D/E", confirmed: "统计页可见1至32号阀喷次，现场存在局部喷次升高和重复触发。", unknown: "单凭喷次不能直接判定挂花、原料异物或阀体故障。" },
  "hang-small": { level: "D/E", confirmed: "约1厘米玻璃下缘挂花通常只影响邻近区域。", unknown: "精确流速变化和报警条件未形成实机闭环。" },
  "hang-large": { level: "D/E", confirmed: "5至10厘米脏挂花可造成局部偏流、重复触发和误喷白棉。", unknown: "具体阀位增量和触发图为培训合成。" },
  blockage: { level: "D/E", confirmed: "约30厘米局部棉团会让棉流从两侧绕行。", unknown: "喷射偏移方向、距离和精准阀位未实测。" },
  "duct-blockage": { level: "B/C/D/E", confirmed: "排杂风道堵塞会削弱抽吸并可能诱发严重偏流。", unknown: "当前机台的精确报警文字和统计联动未取证。" },
  "flow-abnormal": { level: "A/C/D", confirmed: "当前基准10.00、范围±2.00，连续异常3次才报警。", unknown: "报警原文和处理后自动复位过程仍待实机取证。" },
  "camera-fault": { level: "D/E", confirmed: "单幅约0.5至1秒应刷新却停止，其余主检测画面继续。", unknown: "正式报警原文、颜色及对应物理检测状态未取证。" },
  "channel-fault": { level: "A/D/E", confirmed: "同一算力通道配对的两幅画面同时停止，其余画面继续。", unknown: "下位机是否仍检测喷出，不能只凭冻结画面下结论。" },
  "screen-freeze": { level: "A/D/E", confirmed: "20幅画面、界面时间与信息同时冻结。", unknown: "冻结时下位机是否继续检测或喷射尚未取证。" },
  "recognized-no-eject": { level: "B/C/E", confirmed: "识别记录、阀命令与实际喷出是三段不同证据。", unknown: "现无同机台完整时间同步录像证明具体失效环节。" },
  temperature: { level: "C/D/E", confirmed: "当前高温阈值60℃，散热积花、风扇和散热片均需检查。", unknown: "真实报警颜色、原文及相机/统计联动未取证。" },
  "lamp-brightness": { level: "C/D/E", confirmed: "存在灯管亮度监控，目标画面仍刷新但亮度偏离。", unknown: "异常究竟偏亮或偏暗不能固定模拟。" },
  "air-pressure-low": { level: "A/E", confirmed: "厂家资料确认气源压力不足会报警。", unknown: "软件阀计数、触发记录与实际喷气强度的同步联动未取证。" },
  "waste-bag-full": { level: "A/E", confirmed: "废棉袋光电头持续遮挡约10秒会进入满袋报警。", unknown: "袋体装满外观和当前软件正式报警样式未取证。" },
  "fan-overload": { level: "A/E", confirmed: "风机热过载会使交流接触器断开并导致无法检测。", unknown: "过载后相机、流速和统计是否继续刷新尚未取证。" },
  "valve-long-blow": { level: "D/E", confirmed: "机械长喷或漏气不等于软件喷次持续增加。", unknown: "当前缺少阀体动作与界面计数同步录像。" },
  "valve-weak-blow": { level: "D/E", confirmed: "有识别记录和阀命令也不等于实际喷气足够。", unknown: "弱喷强度、持续时间和统计联动未取证。" },
  "camera-485": { level: "D/E", confirmed: "现场也可能表现为单幅画面不刷新。", unknown: "仅凭冻结画面不能与普通相机故障区分，必须结合报警对象和线路检查。" }
};

const PHASE = {
  STOPPED: "STOPPED",
  RUN_BASELINE: "RUN_BASELINE",
  FAULT_FORMING: "FAULT_FORMING",
  FAULT_OBSERVABLE: "FAULT_OBSERVABLE",
  ALARM_ACTIVE: "ALARM_ACTIVE",
  RECOVERY: "RECOVERY"
};

const NARRATION_STAGE = {
  MANUAL_WAIT: "MANUAL_WAIT"
};

// 这些原声是诊断与处理顺序，不冒充机器报警播报；阶段映射只负责让画面与讲解不抢跑。
const SCENARIO_NARRATION = {
  "camera-fault": {
    tracks: Array.from({ length: 5 }, (_, index) => `./assets/audio/fault-camera-0${index + 1}.mp3`),
    captions: [
      "观察20个相机画面，确认只有一个画面停止刷新。",
      "读取主屏右侧报警信息，记录对应相机编号。",
      "关闭整机电源，等待20秒后重新上电复核。",
      "如果短期内反复出现，检查接线并准备对应相机。",
      "确认故障持续后，更换对应相机并验证画面刷新。"
    ],
    stages: {
      [PHASE.FAULT_OBSERVABLE]: [0],
      [PHASE.ALARM_ACTIVE]: [1],
      [NARRATION_STAGE.MANUAL_WAIT]: [2, 3],
      [PHASE.RECOVERY]: [4]
    }
  },
  "channel-fault": {
    tracks: Array.from({ length: 5 }, (_, index) => `./assets/audio/fault-channel-0${index + 1}.mp3`),
    captions: [
      "确认同一通道的两个相机画面都停止刷新。",
      "读取报警信息，记录故障通道编号。",
      "断电等待20秒后重新上电，观察通讯是否恢复。",
      "若故障很快再次出现，检查该通道线缆与接口。",
      "确认通讯仍异常后，更换对应算力盒子并复核。"
    ],
    stages: {
      [PHASE.FAULT_OBSERVABLE]: [0],
      [PHASE.ALARM_ACTIVE]: [1],
      [NARRATION_STAGE.MANUAL_WAIT]: [2, 3],
      [PHASE.RECOVERY]: [4]
    }
  },
  "flow-abnormal": {
    tracks: Array.from({ length: 5 }, (_, index) => `./assets/audio/fault-flow-0${index + 1}.mp3`),
    captions: [
      "观察棉流是否明显偏向通道一侧。",
      "停机检查入口、出口和上部风口是否积花或漏风。",
      "检查检测玻璃是否有棉蜡，必要时用湿布清洁。",
      "恢复运行后观察流速是否回到基准范围。",
      "偏流仍存在时，再检查前后工序风量与管道连接。"
    ],
    stages: {
      [PHASE.FAULT_OBSERVABLE]: [0],
      [PHASE.ALARM_ACTIVE]: [1],
      [NARRATION_STAGE.MANUAL_WAIT]: [2],
      [PHASE.RECOVERY]: [3, 4]
    }
  },
  temperature: {
    tracks: Array.from({ length: 5 }, (_, index) => `./assets/audio/fault-temperature-0${index + 1}.mp3`),
    captions: [
      "读取报警温度和对应通道，先停止高负荷运行。",
      "检查散热风扇是否转动，周围是否被棉花堵塞。",
      "检查散热片与风扇间距，清除影响风量的积花。",
      "恢复运行后继续观察温度变化。",
      "温度仍持续升高时，进一步检查风扇和算力盒子。"
    ],
    stages: {
      [PHASE.FAULT_OBSERVABLE]: [0],
      [PHASE.ALARM_ACTIVE]: [1],
      [NARRATION_STAGE.MANUAL_WAIT]: [2],
      [PHASE.RECOVERY]: [3, 4]
    }
  }
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
  "high-spray", "hang-large", "blockage", "duct-blockage",
  "flow-abnormal", "camera-fault", "channel-fault", "screen-freeze",
  "recognized-no-eject", "temperature", "lamp-brightness", "air-pressure-low",
  "waste-bag-full", "fan-overload", "valve-long-blow", "valve-weak-blow", "camera-485"
]);

const OBSERVATION_ONLY_SCENARIOS = new Set(["hang-small"]);

const state = {
  snapshot: "training",
  scenario: "normal",
  position: 18,
  targetView: "front",
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
  flowRecoveryInRangeCount: 0,
  logClock: EVIDENCE_CAPTURE_AT,
  temperature: 57,
  selectedTrigger: 9,
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
  normalLogCursor: 0,
  simClockAt: EVIDENCE_CAPTURE_AT,
  recoveryValidation: null,
  narrationStage: null,
  narrationQueue: [],
  narrationQueuePosition: 0,
  narrationCurrentStep: null,
  narrationPlaying: false,
  narrationStageComplete: true,
  narrationNeedsGesture: false,
  narrationPrimed: false,
  narrationMessage: ""
};

let trainingStateBeforeSnapshot = null;
let trainingPlayButtonBeforeSnapshot = null;
const narrationPlayer = new Audio();
narrationPlayer.preload = "auto";
let narrationToken = 0;
const activeEvidenceSnapshot = () => evidenceSnapshots[state.snapshot] || null;
const isEvidenceSnapshot = () => Boolean(activeEvidenceSnapshot());

function cloneTrainingState() {
  return JSON.parse(JSON.stringify(state));
}

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
const EVIDENCE_TRIGGER_EMPTY_SLOTS = 3;

const pad2 = (value) => String(value).padStart(2, "0");
const targetChannel = () => Math.max(1, Math.min(8, Math.ceil(state.position / 4)));
const targetPairCameraIndex = () => (targetChannel() - 1) * 2;
const targetCameraIndex = () => targetPairCameraIndex() + (state.targetView === "rear" ? 1 : 0);
const cameraSource = (index, phase) => `${ASSET_BASE}/cameras/cam-${pad2(index + 1)}-${index < 16 && phase ? "b" : "a"}.png`;
const readyCameraFrames = new Set();
const trainingText = (text) => text.startsWith("培训模拟：") ? text : `培训模拟：${text}`;
const trainingLogText = (text) => text.startsWith("【培训提示】") ? text : `【培训提示】${text}`;
const NORMAL_MACHINE_EVENTS = ["通道1吹阀保护开", "通道3吹阀保护开", "通道5吹阀保护开", "阀保护计数正常"];
const TARGET_VIEW_SCENARIOS = new Set([
  "high-spray", "hang-small", "hang-large", "camera-fault",
  "recognized-no-eject", "lamp-brightness", "valve-weak-blow", "camera-485"
]);
const targetViewText = (text) => state.targetView === "rear" && TARGET_VIEW_SCENARIOS.has(state.scenario)
  ? text.replaceAll("前视", "后视")
  : text;
const trainingNow = () => new Date(state.simClockAt);
const trainingHour = () => trainingNow().getHours();

function narrationConfig() {
  return SCENARIO_NARRATION[state.scenario] || null;
}

function narrationStepsFor(stage) {
  return narrationConfig()?.stages?.[stage] || [];
}

function narrationStagePending(stage = state.phase) {
  return state.narrationStage === stage && !state.narrationStageComplete;
}

function stopNarration() {
  narrationToken += 1;
  narrationPlayer.pause();
  narrationPlayer.loop = false;
  narrationPlayer.muted = false;
  narrationPlayer.onended = null;
  narrationPlayer.onerror = null;
  try { narrationPlayer.currentTime = 0; } catch {}
  state.narrationStage = null;
  state.narrationQueue = [];
  state.narrationQueuePosition = 0;
  state.narrationCurrentStep = null;
  state.narrationPlaying = false;
  state.narrationStageComplete = true;
  state.narrationNeedsGesture = false;
  state.narrationPrimed = false;
  state.narrationMessage = "";
}

function updateManualRecoveryButton() {
  if (!state.awaitingManual) return;
  const button = document.querySelector("#play-scenario");
  const pending = narrationStagePending(NARRATION_STAGE.MANUAL_WAIT);
  button.disabled = isEvidenceSnapshot() || pending;
  button.classList.remove("playing");
  button.textContent = pending
    ? state.narrationNeedsGesture
      ? "请先开启语音，继续现场处理讲解"
      : "正在讲解现场处理步骤…"
    : "确认已完成现场处理，推演处理后观察";
}

function renderNarration() {
  const strip = document.querySelector("#narration-strip");
  if (!strip) return;
  const config = narrationConfig();
  const hidden = isEvidenceSnapshot() || state.scenario === "normal";
  strip.hidden = hidden;
  if (hidden) return;
  const title = document.querySelector("#narration-title");
  const caption = document.querySelector("#narration-caption");
  const retry = document.querySelector("#narration-retry");
  if (!config) {
    title.textContent = "运行模拟字幕";
    caption.textContent = "本场景暂无对应原声，画面仍按已确认事实和证据边界播放。";
    retry.hidden = true;
    return;
  }
  const step = state.narrationCurrentStep;
  title.textContent = Number.isInteger(step) ? `原声讲解 ${step + 1}/5` : "原声讲解已准备";
  caption.textContent = Number.isInteger(step)
    ? config.captions[step]
    : state.narrationMessage || "异常进入可观察阶段后，讲解会按诊断顺序播放。";
  retry.hidden = !state.narrationNeedsGesture;
  retry.textContent = "开启语音继续";
  strip.classList.toggle("is-playing", state.narrationPlaying);
  strip.classList.toggle("needs-gesture", state.narrationNeedsGesture);
}

function failNarration(token) {
  if (token !== narrationToken) return;
  state.narrationPlaying = false;
  state.narrationNeedsGesture = true;
  state.narrationStageComplete = false;
  state.narrationMessage = "浏览器拦截了有声播放，请点“开启语音继续”；当前阶段不会跳过。";
  renderNarration();
  updateManualRecoveryButton();
  renderPhase();
}

function completeNarrationTrack(token) {
  if (token !== narrationToken) return;
  state.narrationQueuePosition += 1;
  if (state.narrationQueuePosition < state.narrationQueue.length) {
    playNarrationQueueItem();
    return;
  }
  state.narrationPlaying = false;
  state.narrationStageComplete = true;
  state.narrationNeedsGesture = false;
  state.narrationMessage = "本阶段讲解已完整播放。";
  renderNarration();
  updateManualRecoveryButton();
  renderPhase();
}

function playNarrationQueueItem() {
  const config = narrationConfig();
  const step = state.narrationQueue[state.narrationQueuePosition];
  if (!config || !Number.isInteger(step)) {
    state.narrationStageComplete = true;
    renderNarration();
    return;
  }
  const src = config.tracks[step];
  const token = ++narrationToken;
  state.narrationCurrentStep = step;
  state.narrationPlaying = true;
  state.narrationNeedsGesture = false;
  state.narrationStageComplete = false;
  state.narrationMessage = "";
  narrationPlayer.loop = false;
  narrationPlayer.muted = false;
  narrationPlayer.onended = () => completeNarrationTrack(token);
  narrationPlayer.onerror = () => failNarration(token);
  const primedFirstTrack = step === 0
    && state.narrationPrimed
    && narrationPlayer.src === new URL(src, document.baseURI).href;
  if (!primedFirstTrack) narrationPlayer.src = src;
  try { narrationPlayer.currentTime = 0; } catch {}
  const playPromise = narrationPlayer.play();
  if (playPromise?.catch) playPromise.catch(() => failNarration(token));
  renderNarration();
}

function startNarrationStage(stage) {
  const queue = narrationStepsFor(stage);
  state.narrationStage = stage;
  state.narrationQueue = [...queue];
  state.narrationQueuePosition = 0;
  state.narrationCurrentStep = null;
  state.narrationStageComplete = queue.length === 0;
  state.narrationNeedsGesture = false;
  state.narrationMessage = queue.length ? "正在准备本阶段讲解。" : "本阶段没有对应原声。";
  if (queue.length) playNarrationQueueItem();
  else renderNarration();
}

function primeNarration() {
  stopNarration();
  const config = narrationConfig();
  if (!config) {
    renderNarration();
    return;
  }
  const token = ++narrationToken;
  state.narrationStage = "PRIMED";
  state.narrationStageComplete = true;
  state.narrationMessage = "原声正在预载；异常进入可观察阶段后开始讲解。";
  narrationPlayer.src = config.tracks[0];
  narrationPlayer.loop = true;
  narrationPlayer.muted = true;
  narrationPlayer.onended = null;
  narrationPlayer.onerror = () => failNarration(token);
  try { narrationPlayer.currentTime = 0; } catch {}
  const playPromise = narrationPlayer.play();
  if (playPromise?.then) {
    playPromise.then(() => {
      if (token !== narrationToken) return;
      state.narrationPrimed = true;
      state.narrationMessage = "原声已准备；异常进入可观察阶段后开始讲解。";
      renderNarration();
    }).catch(() => failNarration(token));
  }
  renderNarration();
}

function retryNarration() {
  if (!narrationConfig()) return;
  state.narrationNeedsGesture = false;
  if (state.narrationQueue.length && state.narrationQueuePosition < state.narrationQueue.length) playNarrationQueueItem();
  else primeNarration();
}

function phaseEffect() {
  if (state.scenario === "normal" || state.phase === PHASE.RUN_BASELINE || state.phase === PHASE.STOPPED) return 0;
  if (state.phase === PHASE.FAULT_FORMING) return .42;
  if (state.phase === PHASE.RECOVERY) return .32;
  return 1;
}

function faultPhaseActive() {
  return state.scenario !== "normal" && [PHASE.FAULT_FORMING, PHASE.FAULT_OBSERVABLE, PHASE.ALARM_ACTIVE].includes(state.phase);
}

const LOCAL_FAULT_EVENT_SCENARIOS = new Set([
  "high-spray", "hang-large", "recognized-no-eject", "valve-weak-blow"
]);

function localFaultEventDue() {
  return faultPhaseActive() && LOCAL_FAULT_EVENT_SCENARIOS.has(state.scenario) && state.tick % 3 === 0;
}

function phaseIsObservable() {
  return phaseEffect() >= .95;
}

function frozenCameraIndexes() {
  if (!phaseIsObservable()) return [];
  const target = targetCameraIndex();
  if (state.scenario === "camera-fault") return [target];
  if (state.scenario === "camera-485") return [target];
  if (state.scenario === "channel-fault") return [targetPairCameraIndex(), targetPairCameraIndex() + 1];
  if (state.scenario === "screen-freeze") return Array.from({ length: 20 }, (_, index) => index);
  return [];
}

function hmiDisplayFrozen() {
  return state.scenario === "screen-freeze" && phaseIsObservable();
}

function physicalDetectionPaused() {
  // 风机过载后只保留故障前最后一组检测数据；HMI实际刷新联动尚未取证。
  return state.scenario === "fan-overload" && phaseIsObservable();
}

function detectionEventsSuppressed() {
  return state.scenario === "fan-overload" && phaseIsObservable();
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
  state.triggerRecords = triggerCameraSources.slice(EVIDENCE_TRIGGER_EMPTY_SLOTS).map((cameraSourceNumber, index) => ({
    id: `evidence-${index + EVIDENCE_TRIGGER_EMPTY_SLOTS + 1}`,
    imageIndex: index + EVIDENCE_TRIGGER_EMPTY_SLOTS + 1,
    cameraSourceNumber,
    at: clock - index * 850,
    repeated: false
  }));
}

function updateClock() {
  const snapshot = activeEvidenceSnapshot();
  document.querySelector("#scheme-value").textContent = snapshot ? snapshot.scheme || "未取证" : TRAINING_MACHINE_META.scheme;
  document.querySelector("#lamp-life").textContent = snapshot ? snapshot.lampLife : TRAINING_MACHINE_META.lampLife;
  document.querySelector("#version-value").textContent = snapshot
    ? snapshot.version || "未取证"
    : TRAINING_MACHINE_META.version;
  if (snapshot) {
    document.querySelector("#machine-date").textContent = `星期日 ${snapshot.capturedAt}`;
    document.querySelector("#runtime-value").textContent = snapshot.runtime;
    return;
  }
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
  if (isEvidenceSnapshot()) return;
  if (hmiDisplayFrozen()) return;
  state.simClockAt += 1000;
  updateClock();
}

function renderChannels() {
  const root = document.querySelector("#channel-status");
  const selectedChannel = activeEvidenceSnapshot()?.selectedChannel ?? (isEvidenceSnapshot() ? null : state.selectedChannel);
  const trainingFocusChannel = !isEvidenceSnapshot() && state.scenario === "channel-fault" && phaseIsObservable()
    ? targetChannel()
    : null;
  root.innerHTML = channelOrder.map((channel) => {
    const label = channel <= 8 ? `通道${channel}` : `精灵Eye${channel - 8}`;
    const classes = ["channel-chip"];
    if (channel === selectedChannel) classes.push("selected");
    if (channel === trainingFocusChannel) classes.push("training-focus");
    const title = channel === trainingFocusChannel
      ? `培训定位：通道${channel}对应的两幅上位机画面未刷新`
      : "通道切换行为尚无完整实机取证";
    return `<button class="${classes.join(" ")}" data-channel="${channel}" type="button" disabled title="${title}">${label}</button>`;
  }).join("");
}

function cameraClasses(index) {
  const target = targetCameraIndex();
  const classes = ["camera-card"];
  if (frozenCameraIndexes().includes(index)) classes.push("freeze");
  if (faultPhaseActive() && ["hang-small", "hang-large"].includes(state.scenario) && index === target) classes.push("hang");
  if (faultPhaseActive() && state.scenario === "hang-large" && index === target) classes.push("large");
  if (faultPhaseActive() && state.scenario === "blockage" && (index === targetPairCameraIndex() || index === targetPairCameraIndex() + 1)) classes.push("blocked");
  if (faultPhaseActive() && state.scenario === "duct-blockage" && ductDriftCameraIndexes().has(index)) classes.push("duct-drift");
  if (faultPhaseActive() && state.scenario === "lamp-brightness" && index === target) classes.push("brightness-abnormal");
  return classes;
}

function ductDriftCameraIndexes() {
  const indexes = new Set();
  const center = state.position - 1;
  for (let valveIndex = Math.max(0, center - 3); valveIndex <= Math.min(31, center + 3); valveIndex += 1) {
    const firstCamera = Math.floor(valveIndex / 4) * 2;
    indexes.add(firstCamera);
    indexes.add(firstCamera + 1);
  }
  return indexes;
}

function renderCameras() {
  const root = document.querySelector("#camera-grid");
  if (isEvidenceSnapshot()) {
    if (state.snapshot === "endpoint-1-1") {
      const cards = cameraLabels.map((label, index) => `<div class="camera-card evidence-dark" data-camera="${index}"><small>${label}</small></div>`).join("");
      root.innerHTML = `${cards}<p class="camera-evidence-boundary endpoint-note">按端点1-1截图02重构灰暗20格；未混用端点2-2棉流帧</p>`;
      return;
    }
    if (state.snapshot === "endpoint-2-2") {
      root.innerHTML = cameraLabels.map((label, index) => `<div class="camera-card" data-camera="${index}"><img src="${cameraSource(index, 1)}" alt="" aria-label="${label}相机取证画面"><small>${label}</small></div>`).join("");
      return;
    }
    root.innerHTML = "";
    return;
  }
  const previousSources = new Map(Array.from(root.querySelectorAll(".camera-card")).map((card) => [Number(card.dataset.camera), card.querySelector("img")?.src]));
  const cards = cameraLabels.map((label, index) => {
    const classes = cameraClasses(index);
    const isolatedFreeze = classes.includes("freeze") && state.scenario !== "screen-freeze";
    const freezeLabel = state.scenario === "channel-fault" ? "同通道未刷新" : "画面未刷新";
    const marker = classes.includes("hang")
      ? '<i class="hang-mark"></i>'
      : classes.includes("blocked")
      ? '<i class="blockage-mark"></i>'
      : isolatedFreeze
      ? `<i class="freeze-mark">${freezeLabel}</i>`
      : classes.includes("brightness-abnormal")
      ? '<i class="brightness-mark">亮度偏离<small>方向未取证</small></i>'
      : "";
    const frozenSource = previousSources.get(index);
    const shouldHoldFrame = classes.includes("freeze") || !state.running;
    const phase = index < 16 ? state.cameraPhases[index] : 0;
    const source = shouldHoldFrame && frozenSource ? frozenSource : cameraSource(index, phase);
    return `<div class="${classes.join(" ")}" data-camera="${index}">
      <img src="${source}" alt="" aria-label="${label}相机棉流画面">
      ${marker}<small>${label}</small>
    </div>`;
  }).join("");
  const evidenceBoundaryText = phaseIsObservable() ? ({
    "camera-fault": "单幅画面冻结，其余主检测画面继续刷新",
    "channel-fault": "同通道两幅画面冻结；物理检测状态未知",
    "screen-freeze": "20幅画面与界面时间同时冻结；设备动作未知",
    "camera-485": "单幅冻结；仅凭画面不能与普通相机故障区分",
    "fan-overload": "培训边界：保留故障前最后画面；培训时钟不代表实机过载后的刷新状态"
  })[state.scenario] : "";
  const evidenceBoundary = evidenceBoundaryText
    ? `<p class="camera-evidence-boundary">${evidenceBoundaryText}</p>`
    : "";
  root.innerHTML = `${cards}${evidenceBoundary}`;
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
  if (isEvidenceSnapshot()) return;
  if (!state.running || physicalDetectionPaused() || hmiDisplayFrozen()) return;
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
    recordRecoveryCameraChange(index);
  }
  state.cameraCursor = (state.cameraCursor + 4) % 16;
}

function recoveryCameraTargets() {
  if (["camera-fault", "camera-485", "lamp-brightness"].includes(state.scenario)) return [targetCameraIndex()];
  if (state.scenario === "channel-fault") return [targetPairCameraIndex(), targetPairCameraIndex() + 1];
  if (["screen-freeze", "fan-overload"].includes(state.scenario)) return Array.from({ length: 16 }, (_, index) => index);
  return [];
}

function beginRecoveryValidation() {
  state.flowRecoveryInRangeCount = 0;
  state.recoveryValidation = {
    startClock: state.simClockAt,
    cameraTargets: recoveryCameraTargets(),
    cameraChanges: Array(16).fill(0)
  };
}

function recordRecoveryCameraChange(index) {
  if (state.phase !== PHASE.RECOVERY || !state.recoveryValidation?.cameraTargets.includes(index)) return;
  state.recoveryValidation.cameraChanges[index] = Math.min(2, state.recoveryValidation.cameraChanges[index] + 1);
}

function recoveryReady() {
  if (state.phase !== PHASE.RECOVERY) return true;
  if (state.scenario === "flow-abnormal") return state.flowRecoveryInRangeCount >= 3;
  const validation = state.recoveryValidation;
  if (!validation) return false;
  if (["camera-fault", "camera-485", "lamp-brightness"].includes(state.scenario)) {
    return validation.cameraChanges[targetCameraIndex()] >= 2;
  }
  if (state.scenario === "channel-fault") {
    return [targetPairCameraIndex(), targetPairCameraIndex() + 1]
      .every((index) => validation.cameraChanges[index] >= 2);
  }
  if (["screen-freeze", "fan-overload"].includes(state.scenario)) {
    return validation.cameraTargets.every((index) => validation.cameraChanges[index] >= 2)
      && state.simClockAt > validation.startClock;
  }
  return true;
}

function recoveryProgressText() {
  const validation = state.recoveryValidation;
  if (state.scenario === "flow-abnormal") return `培训观察：范围内采样 ${state.flowRecoveryInRangeCount}/3`;
  if (!validation) return "培训恢复观察";
  if (["camera-fault", "camera-485", "lamp-brightness"].includes(state.scenario)) {
    const suffix = state.scenario === "lamp-brightness" ? "且亮度标记解除" : "";
    return `培训观察：目标画面刷新 ${validation.cameraChanges[targetCameraIndex()]}/2${suffix}`;
  }
  if (state.scenario === "channel-fault") {
    const indexes = [targetPairCameraIndex(), targetPairCameraIndex() + 1];
    return `培训观察：两幅画面刷新 ${validation.cameraChanges[indexes[0]]}/2、${validation.cameraChanges[indexes[1]]}/2`;
  }
  if (["screen-freeze", "fan-overload"].includes(state.scenario)) {
    const recovered = validation.cameraTargets.filter((index) => validation.cameraChanges[index] >= 2).length;
    const clock = state.simClockAt > validation.startClock ? "时钟继续" : "等待时钟";
    const label = state.scenario === "fan-overload" ? "恢复后前16主相机" : "前16主相机";
    return `培训观察：${label} ${recovered}/16 · ${clock}`;
  }
  return "培训恢复观察";
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
  if (state.phase === PHASE.RUN_BASELINE || state.scenario === "normal") return scenarios.normal.machineLogs;
  if (state.scenario === "waste-bag-full" && state.phase === PHASE.FAULT_FORMING) {
    return [`废料满袋光电遮挡计时 ${Math.min(10, state.phaseTick)}/10秒`, "喷次与触发记录不作为满袋判据", "等待进入报警培训态"].map(trainingLogText);
  }
  if (state.phase === PHASE.FAULT_FORMING) return ["主检测画面持续刷新", "监控采样连续记录中", `当前流速 ${state.liveFlow.toFixed(2)}`].map(trainingLogText);
  if (state.phase === PHASE.RECOVERY) return ["已进入处理后观察培训推演", "是否真实恢复需由现场继续确认", `当前流速 ${state.liveFlow.toFixed(2)}`].map(trainingLogText);
  if (state.scenario !== "flow-abnormal" && !["blockage", "duct-blockage"].includes(state.scenario)) return scenarios[state.scenario].machineLogs.map(targetViewText).map(trainingLogText);
  if (state.flowAlarm) return ["连续3次流速越界", "通道流速监控状态异常", `当前流速 ${state.liveFlow.toFixed(2)}`].map(trainingLogText);
  if (state.flowAbnormalCount > 0) return [`流速越界采样 ${state.flowAbnormalCount}/3`, "前2次只记录计数，尚未触发报警"].map(trainingLogText);
  return scenarios[state.scenario].machineLogs.map(targetViewText).map(trainingLogText);
}

function renderLogs() {
  const snapshot = activeEvidenceSnapshot();
  if (snapshot) {
    document.querySelector("#runtime-log-list").innerHTML = (snapshot.mainLogs || []).map((item) => `<div class="log-line">${item.atText}: ${item.text}</div>`).join("");
    return;
  }
  const base = scenarioLogLines();
  const normal = NORMAL_MACHINE_EVENTS;
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
  const axisStep = values.length === 25 ? 1000 : 500;
  const axisFloor = values.length === 25 ? 5000 : 2000;
  const axisMax = Math.max(axisFloor, Math.ceil(max / axisStep) * axisStep);
  const axisTicks = [axisMax, axisMax * .75, axisMax * .5, axisMax * .25, 0]
    .map((value) => `<span>${Math.round(value)}</span>`).join("");
  const bars = values.map((value, index) => {
    const future = !Number.isFinite(value);
    const classes = ["bar"];
    if (hot.includes(index)) classes.push("hot");
    if (cold.includes(index)) classes.push("cold");
    if (future) classes.push("future");
    const height = future ? 0 : Math.max(2, value / axisMax * 88);
    return `<span class="${classes.join(" ")}" style="height:${height}%">${future ? "" : `<em>${value}</em>`}<i>${labels[index]}</i></span>`;
  }).join("");
  return `<article class="chart-block"><h2>${title}</h2><b class="chart-axis-title">次数</b><span class="chart-y-axis" aria-hidden="true">${axisTicks}</span><div class="bar-chart">${bars}</div></article>`;
}

function renderValveStats() {
  const snapshot = activeEvidenceSnapshot();
  if (snapshot) {
    if (!snapshot.available.includes("valve")) {
      document.querySelector("#stat-valve").innerHTML = "";
      return;
    }
    const hourly = snapshot.hourlySpray
      ? chartBlock("JLEye总数统计", snapshot.hourlySpray, Array.from({ length: 25 }, (_, index) => index))
      : '<article class="chart-block"><h2>JLEye总数统计</h2><div class="evidence-gap-chart">小时分布未转录；仅保留页头总数</div></article>';
    document.querySelector("#stat-valve").innerHTML = [
      hourly,
      chartBlock("前视统计", snapshot.frontValves, Array.from({ length: 32 }, (_, index) => index + 1)),
      chartBlock("后视统计", snapshot.rearValves, Array.from({ length: 32 }, (_, index) => index + 1))
    ].join("");
    return;
  }
  const hot = [];
  if (faultPhaseActive() && ["high-spray", "hang-large"].includes(state.scenario)) hot.push(trainingHour());
  const affected = faultPhaseActive() && ["high-spray", "hang-large"].includes(state.scenario)
    ? Array.from({ length: 32 }, (_, index) => index).filter((index) => Math.abs(index + 1 - state.position) <= 1)
    : [];
  const commandOnly = faultPhaseActive() && ["recognized-no-eject", "valve-weak-blow"].includes(state.scenario)
    ? [state.position - 1]
    : [];
  const affectedFront = state.targetView === "front" ? affected : [];
  const affectedRear = state.targetView === "rear" ? affected : [];
  const commandFront = state.targetView === "front" ? commandOnly : [];
  const commandRear = state.targetView === "rear" ? commandOnly : [];
  document.querySelector("#stat-valve").innerHTML = [
    chartBlock("JLEye总数统计", state.hourlySpray, Array.from({ length: 25 }, (_, index) => index), hot),
    chartBlock("前视统计", valveValues(false), Array.from({ length: 32 }, (_, index) => index + 1), affectedFront, commandFront),
    chartBlock("后视统计", valveValues(true), Array.from({ length: 32 }, (_, index) => index + 1), affectedRear, commandRear)
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

function evidenceFlowChart(title, points = null, xAxisTitle = "", xMax = 24) {
  const x = (value) => 20 + value / xMax * 720;
  const y = (value) => 180 - value / 20 * 150;
  const horizontalGrid = [0, 5, 10, 15, 20].map((value) => `<line class="grid-line" x1="20" y1="${y(value)}" x2="740" y2="${y(value)}"/>`).join("");
  const verticalGrid = Array.from({ length: xMax + 1 }, (_, value) => `<line class="grid-line" x1="${x(value)}" y1="30" x2="${x(value)}" y2="180"/>`).join("");
  const yLabels = [20, 15, 10, 5, 0].map((value) => `<text class="flow-axis-label" x="13" y="${y(value) + 2}" text-anchor="end">${value}</text>`).join("");
  const xLabels = Array.from({ length: xMax + 1 }, (_, value) => `<text class="flow-axis-label" x="${x(value)}" y="193" text-anchor="middle">${value}</text>`).join("");
  let curve = "";
  let legend = "";
  if (points?.length) {
    const path = points.reduce((result, point, index) => index === 0
      ? `M ${x(point[0])} ${y(point[1])}`
      : `${result} H ${x(point[0])} V ${y(point[1])}`, "");
    curve = `<path class="flow-line evidence-step-line" d="${path}"/>`;
    legend = '<g aria-label="图例：总体流速"><line class="flow-legend-line" x1="650" y1="19" x2="680" y2="19"/><text class="flow-legend-text" x="686" y="22">总体流速</text></g>';
  }
  const pointData = points ? ` data-evidence-points='${JSON.stringify(points)}'` : "";
  return `<article class="chart-block evidence-flow-chart"${pointData}><h2>${title}</h2><svg class="line-chart" viewBox="0 0 760 205" preserveAspectRatio="none">${horizontalGrid}${verticalGrid}<line class="flow-axis" x1="20" y1="30" x2="20" y2="180"/><line class="flow-axis" x1="20" y1="180" x2="740" y2="180"/>${yLabels}<text class="flow-axis-title" x="8" y="112" text-anchor="middle" transform="rotate(-90 8 112)">流速(m/s)</text>${curve}${legend}${xLabels}<text class="flow-axis-title" x="380" y="204" text-anchor="middle">${xAxisTitle}</text></svg></article>`;
}

function renderFlowStats() {
  const snapshot = activeEvidenceSnapshot();
  if (snapshot) {
    document.querySelector("#stat-flow").innerHTML = snapshot.available.includes("flow")
      ? [
        evidenceFlowChart("总体流速统计", snapshot.flowSteps, "时间(h)"),
        evidenceFlowChart("实时流速统计", null, "气阀编号", 32)
      ].join("")
      : "";
    return;
  }
  const time = [...state.hourlyFlow];
  const positions = Array.from({ length: 32 }, (_, index) => 10.2 + Math.sin(index * .72) * .3);
  let danger = [];
  const center = state.position - 1;
  if (faultPhaseActive() && state.scenario === "hang-small") positions[center] = 9.65;
  if (faultPhaseActive() && state.scenario === "hang-large") {
    danger = [center - 1, center, center + 1].filter((index) => index >= 0 && index < 32);
    danger.forEach((index) => { positions[index] = index === center ? 6.9 : 8.15; });
  }
  if (faultPhaseActive() && ["blockage", "duct-blockage"].includes(state.scenario)) {
    danger = Array.from({ length: 7 }, (_, offset) => center - 3 + offset).filter((index) => index >= 0 && index < 32);
    danger.forEach((index) => {
      const distance = Math.abs(index - center);
      if (state.scenario === "blockage") positions[index] = [5.4, 7.1, 12.8, 11.6][distance];
      else positions[index] = [5.9, 7.2, 13.5, 12.8][distance];
    });
  }
  if (faultPhaseActive() && state.scenario === "flow-abnormal") {
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
  const snapshot = activeEvidenceSnapshot();
  if (snapshot && !snapshot.available.includes("spirit")) {
    document.querySelector("#stat-spirit").innerHTML = "";
    return;
  }
  const hours = Array(24).fill(0);
  const positions = Array(32).fill(0);
  document.querySelector("#stat-spirit").innerHTML = [
    chartBlock("JLEye总数统计", hours, Array.from({ length: 24 }, (_, index) => index)),
    chartBlock("JLEye统计", positions, Array.from({ length: 32 }, (_, index) => index + 1))
  ].join("");
}

function renderCalendar(activeDay = 1) {
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
    if ((activeDay === 1 && rowIndex === 0 && columnIndex === 7) || (activeDay === 2 && rowIndex === 1 && columnIndex === 1)) classes.push("active");
    return `<span class="${classes.join(" ")}">${day}</span>`;
  })).join("");
}

function renderStats() {
  const snapshot = activeEvidenceSnapshot();
  document.querySelector("#stats-date").textContent = snapshot ? "8月02" : "8月02";
  document.querySelector("#day-total").textContent = snapshot ? snapshot.dayTotal ?? "未取证" : state.dayTotal;
  document.querySelector("#spirit-total").textContent = snapshot ? snapshot.spiritTotal ?? "未取证" : state.spiritTotal;
  renderValveStats();
  renderFlowStats();
  renderSpiritStats();
  renderCalendar(snapshot?.historyEvidence?.selectedDay ?? 1);
}

function triggerCameraLabel(source) {
  if (source <= 16) return cameraLabels[source - 1];
  return `精灵相机${source - 16}`;
}

function renderTriggers() {
  const grid = document.querySelector("#trigger-grid");
  const detail = document.querySelector(".trigger-detail");
  const snapshot = activeEvidenceSnapshot();
  if (snapshot && !snapshot.available.includes("triggers")) {
    grid.innerHTML = "";
    document.querySelector("#trigger-number").textContent = "—";
    detail.hidden = true;
    return;
  }
  detail.hidden = false;
  grid.setAttribute("aria-label", "最近32条触发记录");
  const liveRecords = snapshot ? [] : state.triggerEvents.slice(0, 32);
  const emptySlots = Array.from(
    { length: Math.max(0, EVIDENCE_TRIGGER_EMPTY_SLOTS - liveRecords.length) },
    (_, index) => ({ id: `empty-${index + 1}`, placeholder: true })
  );
  const capturedAt = snapshot ? Date.parse(snapshot.capturedAt.replace(" ", "T") + "+08:00") : 0;
  const evidenceRecords = snapshot
    ? triggerCameraSources.slice(EVIDENCE_TRIGGER_EMPTY_SLOTS).map((cameraSourceNumber, index) => ({
      id: `snapshot-${index + EVIDENCE_TRIGGER_EMPTY_SLOTS + 1}`,
      imageIndex: index + EVIDENCE_TRIGGER_EMPTY_SLOTS + 1,
      cameraSourceNumber,
      at: capturedAt - index * 850,
      repeated: false
    }))
    : state.triggerRecords;
  const records = [...liveRecords, ...emptySlots, ...evidenceRecords].slice(0, 32);
  const interactiveRecords = records.filter((record) => !record.placeholder);
  if (state.selectedTriggerKey) {
    const stableIndex = interactiveRecords.findIndex((record) => record.id === state.selectedTriggerKey);
    if (stableIndex >= 0) state.selectedTrigger = stableIndex;
  }
  state.selectedTrigger = Math.max(0, Math.min(interactiveRecords.length - 1, state.selectedTrigger));
  let interactiveIndex = 0;
  grid.innerHTML = records.map((record) => {
    if (record.placeholder) return `<span class="trigger-thumb empty" aria-label="空槽"></span>`;
    const index = interactiveIndex++;
    const imageIndex = record.imageIndex;
    const cameraSourceNumber = record.cameraSourceNumber;
    return `<button class="trigger-thumb${index === state.selectedTrigger ? " active" : ""}${record.repeated ? " repeated" : ""}" data-trigger="${index}" data-record-id="${record.id}" data-image="${imageIndex}" data-camera-source="${cameraSourceNumber}" data-trigger-time="${record.at}" data-repeated="${record.repeated ? "1" : "0"}" data-kind="${record.kind || ""}" type="button"><img src="${ASSET_BASE}/triggers/trigger-${pad2(imageIndex)}.png" alt="最近触发记录${index + 1}，来源${triggerCameraLabel(cameraSourceNumber)}"></button>`;
  }).join("");
  grid.querySelectorAll("button").forEach((button) => button.addEventListener("click", () => selectTrigger(Number(button.dataset.trigger))));
  selectTrigger(state.selectedTrigger);
}

function selectTrigger(index) {
  state.selectedTrigger = Math.max(0, Math.min(31, index));
  const triggerButtons = document.querySelectorAll("#trigger-grid button.trigger-thumb");
  triggerButtons.forEach((item, itemIndex) => item.classList.toggle("active", itemIndex === index));
  const selected = triggerButtons[index];
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
  const snapshot = activeEvidenceSnapshot();
  if (snapshot) {
    document.querySelector("#scene-phenomenon").textContent = `${snapshot.label}只读证据，不播放培训场景。`;
    document.querySelector("#scene-screen").textContent = `可查看：${snapshot.available.map((page) => ({ main: "主界面", valve: "阀统计", flow: "流速", spirit: "精灵统计", history: "历史", triggers: "触发" })[page]).join("、")}。`;
    document.querySelector("#scene-diagnosis").textContent = "未取证页不生成数据，也不借用其他端点资料。";
    document.querySelector("#scene-handling").textContent = "仅供证据对照；不连接设备、不写设置。";
    document.querySelector("#scene-evidence-level").textContent = "证据边界 · 只读快照";
    document.querySelector("#scene-evidence").textContent = "已确认：仅显示该端点已取证页面；未取证：不借用其他端点补齐。";
    renderPhase();
    return;
  }
  const data = scenarios[state.scenario];
  const evidence = scenarioEvidence[state.scenario];
  const prefix = state.scenario === "normal" ? (text) => text : trainingText;
  document.querySelector("#scene-phenomenon").textContent = prefix(targetViewText(data.phenomenon));
  const flowProgress = state.scenario === "flow-abnormal"
    ? state.phase === PHASE.RECOVERY
      ? ` 培训恢复观察：范围内连续采样${state.flowRecoveryInRangeCount}/3；不代表实机自动清警。`
      : ` 当前连续越界计数：${state.flowAbnormalCount}/3${state.flowAlarm ? "，已报警。" : "，尚未报警。"}`
    : "";
  document.querySelector("#scene-screen").textContent = prefix(`${targetViewText(data.screen)}${flowProgress}`);
  document.querySelector("#scene-diagnosis").textContent = prefix(data.diagnosis);
  document.querySelector("#scene-handling").textContent = prefix(data.handling);
  document.querySelector("#scene-evidence-level").textContent = `证据边界 · ${evidence.level}`;
  document.querySelector("#scene-evidence").textContent = `已确认：${evidence.confirmed} 未取证：${evidence.unknown}`;
  renderPhase();
}

function renderBaselineProfile() {
  const profile = baselineProfiles[state.baseline];
  const select = document.querySelector("#baseline-select");
  const detail = document.querySelector("#baseline-detail");
  select.value = state.baseline;
  detail.textContent = profile.samples
    ? `人工日报参考资料（不参与本次模拟）· ${profile.lines} · ${profile.dates} · ${profile.samples}点 · 口径：${profile.measure || "次/小时"} · P25 ${profile.p25} / P50 ${profile.p50} / P75 ${profile.p75}。不是HMI原始日志。`
    : profile.detail;
}

function renderSnapshotControl() {
  const snapshot = activeEvidenceSnapshot();
  document.querySelector("#snapshot-select").value = state.snapshot;
  const historyBoundary = snapshot?.historyEvidence?.calendarOpen && !snapshot.historyEvidence.queryResultCaptured
    ? "；历史截图仅证明日历弹窗已打开并选中2026-08-01，选择后的查询结果未取证。"
    : "";
  document.querySelector("#snapshot-detail").textContent = snapshot
    ? `${snapshot.label} · ${snapshot.capturedAt} · 只读证据快照；未取证页不补造${historyBoundary}`
    : "动态培训模拟；不连接生产设备。";
  document.querySelector(".training-panel").classList.toggle("snapshot-readonly", Boolean(snapshot));
  document.querySelector(".hmi-window").classList.toggle("evidence-snapshot", Boolean(snapshot));
}

function renderEvidenceAvailability() {
  document.querySelectorAll(".evidence-page-message").forEach((message) => { message.hidden = true; });
  const snapshot = activeEvidenceSnapshot();
  if (!snapshot) return;
  const page = state.screen === "stats" ? state.stat : state.screen;
  if (snapshot.available.includes(page)) return;
  const screen = document.querySelector(`#screen-${state.screen}`);
  const message = screen?.querySelector(".evidence-page-message");
  if (message) message.hidden = false;
}

function syncSnapshotControls() {
  const readonly = isEvidenceSnapshot();
  document.querySelectorAll("[data-scenario]").forEach((button) => { button.disabled = readonly; });
  document.querySelector("#play-scenario").disabled = readonly
    || (state.awaitingManual && narrationStagePending(NARRATION_STAGE.MANUAL_WAIT));
  document.querySelector("#account-button").disabled = readonly;
  document.querySelector(".read-settings").disabled = readonly;
  syncPositionLock();
}

function setSnapshot(name) {
  if (name === "training") {
    if (trainingStateBeforeSnapshot) Object.assign(state, trainingStateBeforeSnapshot);
    else state.snapshot = "training";
    trainingStateBeforeSnapshot = null;
    renderAll();
    setScreen(state.screen);
    setStat(state.stat);
    syncSnapshotControls();
    const playButton = document.querySelector("#play-scenario");
    if (trainingPlayButtonBeforeSnapshot) {
      playButton.textContent = trainingPlayButtonBeforeSnapshot.text;
      playButton.classList.toggle("playing", trainingPlayButtonBeforeSnapshot.playing);
    } else {
      playButton.textContent = "播放完整联动";
      playButton.classList.remove("playing");
    }
    trainingPlayButtonBeforeSnapshot = null;
    return;
  }
  if (!evidenceSnapshots[name]) return;
  if (!isEvidenceSnapshot()) {
    trainingStateBeforeSnapshot = cloneTrainingState();
    const currentPlayButton = document.querySelector("#play-scenario");
    trainingPlayButtonBeforeSnapshot = {
      text: currentPlayButton.textContent,
      playing: currentPlayButton.classList.contains("playing")
    };
  }
  state.snapshot = name;
  state.playing = false;
  state.awaitingManual = false;
  state.roundClockActive = false;
  state.selectedTrigger = 9;
  state.selectedTriggerKey = null;
  const button = document.querySelector("#play-scenario");
  button.classList.remove("playing");
  button.textContent = "证据快照只读";
  state.screen = name === "endpoint-1-2" ? "stats" : "main";
  state.stat = "valve";
  renderAll();
  setScreen(state.screen);
  setStat(state.stat);
  syncSnapshotControls();
}

function renderPhase() {
  const label = document.querySelector("#phase-label");
  const progress = document.querySelector("#phase-progress");
  const strip = document.querySelector(".phase-strip");
  if (isEvidenceSnapshot()) {
    label.textContent = "只读证据快照";
    progress.value = 0;
    strip.classList.remove("warning", "observation");
    return;
  }
  const duration = phaseDuration();
  label.textContent = state.awaitingManual
    ? "等待人工处理"
    : state.phase === PHASE.RECOVERY
      ? recoveryProgressText()
    : state.phase === PHASE.ALARM_ACTIVE && state.scenario === "flow-abnormal"
      ? "流速异常报警"
      : PHASE_LABELS[state.phase];
  progress.value = state.phase === PHASE.STOPPED ? 0 : Math.min(100, state.phaseTick / duration * 100);
  const formalAlarm = state.scenario === "flow-abnormal" && state.flowAlarm && state.phase !== PHASE.RECOVERY;
  const observation = !formalAlarm && [PHASE.FAULT_OBSERVABLE, PHASE.ALARM_ACTIVE].includes(state.phase);
  strip.classList.toggle("warning", formalAlarm);
  strip.classList.toggle("observation", observation);
}

function scenarioFlowValue() {
  const baseline = 10.05 + Math.sin(state.tick * .72) * .22;
  if (state.phase === PHASE.RECOVERY) return state.scenario === "flow-abnormal" ? 10.2 : baseline;
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
  const snapshot = activeEvidenceSnapshot();
  if (snapshot) {
    document.querySelector("#live-flow").textContent = "—";
    document.querySelector("#spray-label").textContent = "证据日喷次";
    document.querySelector("#log-spray").textContent = snapshot.dayTotal ?? "未取证";
    const indicator = document.querySelector("#run-state");
    indicator.textContent = "● 只读证据快照";
    indicator.classList.add("stopped");
    document.querySelector(".training-live").classList.remove("alert", "observation");
    renderPhysicalReadout();
    renderBaselineProfile();
    return;
  }
  const flow = state.liveFlow.toFixed(2);
  document.querySelector("#live-flow").textContent = flow;
  document.querySelector("#spray-label").textContent = "模拟日喷次";
  document.querySelector("#log-spray").textContent = state.dayTotal;
  const indicator = document.querySelector("#run-state");
  const paused = physicalDetectionPaused();
  indicator.textContent = hmiDisplayFrozen()
    ? "● 上位机画面冻结；设备状态待现场确认"
    : detectionEventsSuppressed()
      ? "● 风机过载，检测动作已停止（培训推演）"
      : paused
      ? "● 检测动作已暂停（培训推演）"
      : state.running
        ? "● 正在开车（培训模拟）"
        : "● 已关车（培训模拟）";
  indicator.classList.toggle("stopped", hmiDisplayFrozen() || detectionEventsSuppressed() || !state.running || paused);
  const live = document.querySelector(".training-live");
  const formalAlarm = state.scenario === "flow-abnormal" && state.flowAlarm && state.phase !== PHASE.RECOVERY;
  const observation = !formalAlarm && [PHASE.FAULT_OBSERVABLE, PHASE.ALARM_ACTIVE].includes(state.phase);
  live.classList.toggle("alert", formalAlarm);
  live.classList.toggle("observation", observation);
  renderPhysicalReadout();
  renderBaselineProfile();
}

function renderPhysicalReadout() {
  const pressureElement = document.querySelector("#air-pressure");
  if (isEvidenceSnapshot()) {
    const actionButton = activeEvidenceSnapshot().actionButton;
    pressureElement.textContent = "本快照未取证";
    pressureElement.dataset.state = "unmeasured";
    pressureElement.dataset.evidence = "snapshot-unmeasured";
    document.querySelector("#physical-action").textContent = actionButton
      ? `红色“${actionButton}”为实机动作按钮，不代表运行状态结论`
      : "本端点未显示动作按钮，不推断运行状态";
    return;
  }
  const active = faultPhaseActive();
  let pressure = "未接入真实压力值";
  let pressureState = "unmeasured";
  let action = !state.running
    ? "已停止检测，无检测与喷射动作"
    : state.phase === PHASE.RECOVERY
      ? "处理后观察培训态；是否真实恢复需现场确认"
    : active
      ? "物理动作待现场确认"
      : state.scenario === "normal"
        ? "培训基线：界面刷新与统计模拟正常；物理检测和喷气未接入"
        : "当前为正常运行基线，异常场景尚未激活";
  if (active && state.scenario === "screen-freeze") action = "界面停留在开车画面；设备实际动作待现场确认";
  if (active && state.scenario === "lamp-brightness") action = `${cameraLabels[targetCameraIndex()]}仍刷新，局部亮度偏离`;
  if (active && state.scenario === "air-pressure-low") {
    pressure = "低于现场正常区间（培训推演）";
    pressureState = "training-low";
    action = "低压报警已证实；喷气与界面联动待取证";
  }
  if (state.phase === PHASE.RECOVERY && state.scenario === "air-pressure-low") {
    pressure = "已确认供气处理；真实压力仍未接入";
    pressureState = "recovery-unverified";
    action = "处理后继续现场确认实际压力与喷气；培训页不自动宣布恢复";
  }
  if (active && state.scenario === "waste-bag-full") {
    action = state.phase === PHASE.FAULT_FORMING
      ? `光电遮挡计时 ${Math.min(10, state.phaseTick)}/10秒`
      : "废料满袋报警培训态；检查袋体和光电头";
  }
  if (active && state.scenario === "blockage") action = "局部流速明显偏移；喷射偏移方向和距离未取证，不绑定精准阀位";
  if (active && state.scenario === "duct-blockage") action = "风道局部堵塞，流速偏移；喷次变化和精准阀位未取证";
  if (active && state.scenario === "fan-overload") action = "风机接触器断开，当前无法检测；动态区保留故障前最后值，HMI联动待取证";
  if (active && state.scenario === "valve-long-blow") action = `第${state.position}号阀持续漏气；软件喷次不等同漏气时长`;
  if (active && state.scenario === "valve-weak-blow") action = `第${state.position}号阀有命令，实际喷气不足`;
  if (active && state.scenario === "camera-485") action = `${cameraLabels[targetCameraIndex()]}停止刷新且无新增触发`;
  pressureElement.textContent = pressure;
  pressureElement.dataset.state = pressureState;
  pressureElement.dataset.evidence = "training-only";
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

function pushNormalMachineEvent() {
  const text = NORMAL_MACHINE_EVENTS[state.normalLogCursor % NORMAL_MACHINE_EVENTS.length];
  state.normalLogCursor += 1;
  state.logClock = state.simClockAt;
  state.logEvents.unshift({ text, warn: false, at: state.simClockAt });
  state.logEvents = state.logEvents.slice(0, 28);
}

function liveEventText() {
  const events = {
    normal: "前16幅主检测画面刷新正常；精灵眼正常运行形态待取证",
    "high-spray": `第${state.position}号阀局部喷次继续升高`,
    "hang-small": `第${state.position}号阀附近流速轻微波动`,
    "hang-large": `第${state.position}号阀附近反复出现扭曲触发图，局部白棉喷次增加`,
    blockage: `以第${state.position}号位置为中心约30厘米区域流速下降，两侧位置流速升高`,
    "duct-blockage": "主检测画面持续刷新，实时位置流速出现明显偏移",
    "flow-abnormal": state.flowAlarm ? "连续3次流速越界，已触发报警" : `流速越界采样 ${state.flowAbnormalCount}/3`,
    "camera-fault": `${cameraLabels[targetCameraIndex()]}画面未刷新，其余主检测画面继续刷新`,
    "channel-fault": `通道${targetChannel()}两路上位机画面未刷新；物理检测状态待确认`,
    "screen-freeze": "上位机20幅相机画面与界面时间同时停止刷新",
    "recognized-no-eject": `${cameraLabels[targetCameraIndex()]}产生识别记录，但第${state.position}号阀计数未随该条记录增加`,
    temperature: `通道${targetChannel()}当前温度 ${state.temperature.toFixed(1)}℃`,
    "lamp-brightness": `${cameraLabels[targetCameraIndex()]}仍刷新，但局部亮度偏离相邻画面`,
    "air-pressure-low": "气源压力不足报警培训态；实际喷气与界面联动待取证",
    "waste-bag-full": state.phase === PHASE.FAULT_FORMING
      ? `废料满袋光电遮挡计时 ${Math.min(10, state.phaseTick)}/10秒`
      : "光电遮挡达到约10秒，进入废料满袋报警培训态",
    "fan-overload": "风机热过载，接触器断开，当前无法检测",
    "valve-long-blow": `第${state.position}号阀持续漏气，软件喷次不强制抬高`,
    "valve-weak-blow": `第${state.position}号阀有命令计数，但实际喷气不足`,
    "camera-485": `${cameraLabels[targetCameraIndex()]}画面停止刷新且不再新增触发记录`
  };
  return events[state.scenario];
}

function resetFlowAlarm() {
  state.flowAbnormalCount = 0;
  state.flowAlarm = false;
  state.flowRecoveryInRangeCount = 0;
}

function sampleFlowAlarm() {
  if (state.scenario !== "flow-abnormal") {
    resetFlowAlarm();
    return;
  }
  const outOfRange = state.liveFlow < 8 || state.liveFlow > 12;
  if (state.phase === PHASE.RECOVERY) {
    state.flowAbnormalCount = 0;
    if (outOfRange) {
      if (state.flowRecoveryInRangeCount > 0) pushRuntimeEvent("培训恢复观察中再次越界，范围内连续采样重新计数", true);
      state.flowRecoveryInRangeCount = 0;
      return;
    }
    state.flowRecoveryInRangeCount = Math.min(3, state.flowRecoveryInRangeCount + 1);
    if (state.flowRecoveryInRangeCount === 3) {
      pushRuntimeEvent("培训观察：连续3次采样回到8.00至12.00范围；不代表实机已自动清警");
    }
    return;
  }
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
  const scenarioMonitor = {
    blockage: "flow",
    "duct-blockage": "flow",
    "flow-abnormal": "flow",
    "lamp-brightness": "brightness",
    "channel-fault": "channel",
    "camera-fault": "camera",
    temperature: "temperature",
    "camera-485": "camera485"
  };
  const monitorObservable = [PHASE.FAULT_OBSERVABLE, PHASE.ALARM_ACTIVE].includes(state.phase);
  const flowConfirmed = state.scenario !== "flow-abnormal" || state.flowAlarm;
  const activeMonitor = !isEvidenceSnapshot() && monitorObservable && flowConfirmed
    ? scenarioMonitor[state.scenario]
    : null;
  document.querySelectorAll("[data-monitor]").forEach((monitor) => {
    monitor.classList.toggle("training-alert", monitor.dataset.monitor === activeMonitor);
  });
}

function sprayIncrement(isFaultEvent = false) {
  if (state.phase === PHASE.STOPPED) return 0;
  if (isFaultEvent && state.scenario === "high-spray") return 9;
  if (isFaultEvent && state.scenario === "hang-large") return 6;
  return 2 + state.tick % 2;
}

function currentDetectionEvent(isFaultEvent = false) {
  const targeted = isFaultEvent && faultPhaseActive() && LOCAL_FAULT_EVENT_SCENARIOS.has(state.scenario);
  let front = targeted ? state.targetView === "front" : state.tick % 2 === 0;
  let valveIndex = targeted
    ? state.scenario === "hang-large"
      ? Math.max(0, Math.min(31, state.position - 1 + [-1, 0, 1][Math.floor(state.tick / 3) % 3]))
      : state.position - 1
    : (front ? state.tick * 3 : state.tick * 5) % 32;
  if (!targeted && faultPhaseActive() && LOCAL_FAULT_EVENT_SCENARIOS.has(state.scenario) && Math.abs(valveIndex - (state.position - 1)) <= 1) {
    valveIndex = (valveIndex + 8) % 32;
  }
  let group = Math.floor(valveIndex / 4);
  let cameraSourceNumber = group * 2 + (front ? 1 : 2);
  const unavailable = new Set(frozenCameraIndexes().map((index) => index + 1));
  if (unavailable.has(cameraSourceNumber)) {
    cameraSourceNumber = Array.from({ length: 16 }, (_, index) => index + 1).find((source) => !unavailable.has(source)) || cameraSourceNumber;
    front = cameraSourceNumber % 2 === 1;
    group = Math.floor((cameraSourceNumber - 1) / 2);
    valveIndex = group * 4 + state.tick % 4;
  }
  return { front, valveIndex, cameraSourceNumber, isFaultEvent: targeted };
}

function emitDetectionEvent(isFaultEvent = false) {
  const event = currentDetectionEvent(isFaultEvent);
  const amount = sprayIncrement(event.isFaultEvent);
  const noEject = event.isFaultEvent && state.scenario === "recognized-no-eject";
  const currentHour = trainingHour();
  if (!noEject) {
    state.hourlySpray[currentHour] = (state.hourlySpray[currentHour] || 0) + amount;
    (event.front ? state.frontValves : state.rearValves)[event.valveIndex] += amount;
    state.dayTotal += amount;
  }
  const repeated = event.isFaultEvent;
  state.triggerEvents.unshift({
    id: `training-${++state.triggerSerial}`,
    imageIndex: repeated ? [28, 29][state.tick % 2] : (state.tick - 1) % 32 + 1,
    cameraSourceNumber: event.cameraSourceNumber,
    at: state.roundClockActive ? state.playbackClock + state.playbackElapsed * 1000 : state.simClockAt,
    repeated,
    kind: event.isFaultEvent ? state.scenario : "normal"
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
  const latestSimClockAt = state.simClockAt;
  const latestRuntimeSeconds = state.runtimeSeconds;
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
  state.simClockAt = Math.max(state.simClockAt, latestSimClockAt);
  state.runtimeSeconds = Math.max(state.runtimeSeconds, latestRuntimeSeconds);
}

function syncPositionLock() {
  const slider = document.querySelector("#position-slider");
  const viewSelect = document.querySelector("#target-view");
  viewSelect.value = state.targetView;
  slider.disabled = isEvidenceSnapshot() || state.playing || state.awaitingManual;
  slider.title = isEvidenceSnapshot() ? "只读证据快照不调整位置" : slider.disabled ? "联动播放或等待人工处理期间位置已锁定" : "";
  const viewLocked = isEvidenceSnapshot() || !TARGET_VIEW_SCENARIOS.has(state.scenario) || state.playing || state.awaitingManual;
  viewSelect.disabled = viewLocked;
  viewSelect.title = isEvidenceSnapshot()
    ? "只读证据快照不调整检测面"
    : !TARGET_VIEW_SCENARIOS.has(state.scenario)
    ? "当前场景不区分前视与后视目标"
    : viewLocked ? "联动播放或等待人工处理期间检测面已锁定" : "";
}

function phaseScreen(phase) {
  if ([PHASE.STOPPED, PHASE.RUN_BASELINE, PHASE.FAULT_FORMING, PHASE.RECOVERY].includes(phase)) return ["main", null];
  if (state.scenario === "temperature") return ["main", null];
  if (state.scenario === "duct-blockage") return phase === PHASE.FAULT_OBSERVABLE ? ["main", null] : ["stats", "flow"];
  if (["high-spray", "hang-large", "recognized-no-eject", "valve-weak-blow"].includes(state.scenario)) {
    return phase === PHASE.FAULT_OBSERVABLE ? ["triggers", null] : ["stats", "valve"];
  }
  if (["hang-small", "blockage", "flow-abnormal"].includes(state.scenario)) return ["stats", "flow"];
  return ["main", null];
}

function enterPhase(phase) {
  state.phase = phase;
  state.phaseTick = 0;
  state.awaitingManual = false;
  if (phase === PHASE.RECOVERY) beginRecoveryValidation();
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
  if (narrationStepsFor(phase).length) startNarrationStage(phase);
}

function finishScenarioPlayback() {
  stopNarration();
  state.playing = false;
  state.awaitingManual = false;
  pushRuntimeEvent(OBSERVATION_ONLY_SCENARIOS.has(state.scenario)
    ? "本轮观察结束；小挂花未扩大，未升级为报警或人工处理"
    : "本轮处理后观察培训推演结束；是否真实恢复需现场确认");
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
  if (narrationStagePending(state.phase)) {
    state.phaseTick = phaseDuration();
    return;
  }
  if (state.phase === PHASE.RECOVERY && !recoveryReady()) {
    state.phaseTick = phaseDuration();
    return;
  }
  if (state.scenario === "normal" && state.phase === PHASE.RUN_BASELINE) {
    finishScenarioPlayback();
    return;
  }
  if (state.phase === PHASE.ALARM_ACTIVE && MANUAL_RECOVERY_SCENARIOS.has(state.scenario)) {
    state.playing = false;
    state.awaitingManual = true;
    state.phaseTick = phaseDuration(PHASE.ALARM_ACTIVE);
    if (narrationStepsFor(NARRATION_STAGE.MANUAL_WAIT).length) startNarrationStage(NARRATION_STAGE.MANUAL_WAIT);
    updateManualRecoveryButton();
    pushRuntimeEvent("本培训不自动推演恢复；真实恢复条件待取证，需人工确认完成现场处理", true);
    syncPositionLock();
    renderPhase();
    return;
  }
  if (state.phase === PHASE.FAULT_OBSERVABLE && OBSERVATION_ONLY_SCENARIOS.has(state.scenario)) {
    finishScenarioPlayback();
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
  if (isEvidenceSnapshot()) return;
  if (!state.running) return;
  const paused = physicalDetectionPaused();
  if (hmiDisplayFrozen()) {
    advanceScenarioPhase();
    renderFrozenTrainingState();
    return;
  }
  state.tick += 1;
  if (state.roundClockActive && state.playing) state.playbackElapsed += 1;
  if (!paused) {
    state.runtimeSeconds += 1;
    state.liveFlow = scenarioFlowValue();
    state.flowSamples.push(Number(state.liveFlow.toFixed(2)));
    state.hourlyFlow[trainingHour()] = Number(state.liveFlow.toFixed(2));
    sampleFlowAlarm();
    updateTemperature();
    if (!detectionEventsSuppressed()) {
      if ((state.scenario === "normal" || state.phase === PHASE.RUN_BASELINE) && state.tick % 3 === 0) {
        pushNormalMachineEvent();
      }
      emitDetectionEvent(false);
      if (localFaultEventDue()) emitDetectionEvent(true);
    }
  }
  if (!paused && state.tick % 3 === 0 && state.scenario !== "flow-abnormal" && faultPhaseActive()) pushRuntimeEvent(liveEventText(), true);
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
  updateClock();
  renderChannels();
  renderCameras();
  renderLogs();
  renderStats();
  renderTriggers();
  renderReading();
  renderNarration();
  updateLiveIndicators();
  updateSettingsMonitors();
  updateRunToggleButton();
  renderSnapshotControl();
  renderEvidenceAvailability();
  syncSnapshotControls();
}

function setAccountDialog(open) {
  const dialog = document.querySelector("#account-failure-dialog");
  const accountButton = document.querySelector("#account-button");
  dialog.hidden = !open;
  accountButton.classList.toggle("active", open);
}

function updateRunToggleButton() {
  const button = document.querySelector("#run-toggle");
  const machineHeader = document.querySelector(".machine-header");
  button.hidden = false;
  machineHeader.classList.remove("no-action-button");
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
  button.classList.toggle("settings-readonly", settingsView && !isEvidenceSnapshot());
  button.classList.remove("start", "recovering");
  if (isEvidenceSnapshot()) {
    const actionButton = activeEvidenceSnapshot().actionButton;
    button.hidden = !actionButton;
    machineHeader.classList.toggle("no-action-button", !actionButton);
    if (!actionButton) return;
    button.innerHTML = `${actionButton.slice(0, 1)}<br>${actionButton.slice(1)}`;
    button.title = "实机动作按钮的只读复刻，不代表设备运行状态结论";
    return;
  }
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
  if (hmiDisplayFrozen()) {
    button.innerHTML = "关<br>车";
    button.title = "上位机画面冻结，此处保留卡住前显示";
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
  button.innerHTML = "关<br>车";
  button.title = "当前正在开车；点击该动作按钮应关车";
}

function setScreen(name) {
  if (name === "account") {
    if (isEvidenceSnapshot()) return;
    setAccountDialog(document.querySelector("#account-failure-dialog").hidden);
    return;
  }
  setAccountDialog(false);
  state.screen = name;
  document.querySelectorAll(".machine-screen").forEach((screen) => { screen.hidden = screen.id !== `screen-${name}`; });
  document.querySelectorAll("[data-screen]").forEach((button) => button.classList.toggle("active", button.dataset.screen === name));
  document.querySelector(".machine-nav").classList.toggle("is-hidden", name === "settings");
  updateRunToggleButton();
  renderEvidenceAvailability();
}

function setStat(name) {
  state.stat = name;
  document.querySelectorAll("[data-stat]").forEach((button) => button.classList.toggle("active", button.dataset.stat === name));
  const evidenceHistory = name === "history" && Boolean(activeEvidenceSnapshot());
  ["valve", "flow", "spirit"].forEach((panel) => {
    document.querySelector(`#stat-${panel}`).hidden = evidenceHistory || (name === "history" ? panel !== "spirit" : panel !== name);
  });
  document.querySelector("#stat-history").hidden = name !== "history";
  renderEvidenceAvailability();
}

function cancelScenarioPlayback() {
  stopNarration();
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
  if (isEvidenceSnapshot()) return;
  cancelScenarioPlayback();
  restorePlaybackBaseline();
  state.logEvents = [];
  state.scenario = name;
  if (!TARGET_VIEW_SCENARIOS.has(name)) state.targetView = "front";
  state.playbackBaseline = null;
  state.playbackClock = null;
  state.triggerEvents = [];
  state.selectedTrigger = 12;
  state.selectedTriggerKey = null;
  resetFlowAlarm();
  state.phase = state.running ? PHASE.RUN_BASELINE : PHASE.STOPPED;
  state.phaseTick = 0;
  state.liveFlow = state.running ? scenarioFlowValue() : 0;
  setScreen("main");
  if (state.running && name !== "normal") pushRuntimeEvent("已选择培训场景，等待播放");
  document.querySelectorAll("[data-scenario]").forEach((button) => button.classList.toggle("active", button.dataset.scenario === name));
  syncPositionLock();
  renderAll();
}

function setRunning(running) {
  if (isEvidenceSnapshot()) return;
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
  if (state.scenario !== "normal") {
    pushRuntimeEvent(running ? "设备开始检测，前16幅主检测画面恢复刷新；精灵眼正常运行形态待取证" : "设备已停止检测，累计与流速采样暂停", !running);
  }
  renderAll();
}

document.querySelectorAll("[data-screen]").forEach((button) => button.addEventListener("click", () => setScreen(button.dataset.screen)));
document.querySelector("#account-button").addEventListener("click", () => setScreen("account"));
document.querySelector("#account-failure-confirm").addEventListener("click", () => setAccountDialog(false));
document.querySelector("#account-failure-close").addEventListener("click", () => setAccountDialog(false));
document.querySelectorAll("[data-stat]").forEach((button) => button.addEventListener("click", () => setStat(button.dataset.stat)));
document.querySelectorAll("[data-scenario]").forEach((button) => button.addEventListener("click", () => setScenario(button.dataset.scenario)));
document.querySelector("#position-slider").addEventListener("input", (event) => {
  if (isEvidenceSnapshot()) return;
  if (!state.awaitingManual) {
    restorePlaybackBaseline();
    state.playbackBaseline = null;
    state.playbackClock = null;
  }
  state.position = Number(event.target.value);
  document.querySelector("#position-value").textContent = `${state.position}号阀`;
  renderAll();
});

document.querySelector("#target-view").addEventListener("change", (event) => {
  if (isEvidenceSnapshot() || state.playing || state.awaitingManual) return;
  restorePlaybackBaseline();
  state.playbackBaseline = null;
  state.playbackClock = null;
  state.targetView = event.target.value === "rear" ? "rear" : "front";
  renderAll();
});

document.querySelector("#baseline-select").addEventListener("change", (event) => {
  state.baseline = event.target.value;
  renderBaselineProfile();
});

document.querySelector("#snapshot-select").addEventListener("change", (event) => setSnapshot(event.target.value));

document.querySelector("#play-scenario").addEventListener("click", () => {
  if (isEvidenceSnapshot()) return;
  if (!state.playing && state.awaitingManual && MANUAL_RECOVERY_SCENARIOS.has(state.scenario)) {
    if (narrationStagePending(NARRATION_STAGE.MANUAL_WAIT)) return;
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
  primeNarration();
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
  if (state.scenario !== "normal") pushRuntimeEvent("开始播放培训联动");
  renderAll();
});

document.querySelector("#narration-retry").addEventListener("click", retryNarration);

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
