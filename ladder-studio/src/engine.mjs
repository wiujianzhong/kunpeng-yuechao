// 所有模型、图纸、下料和定位表共用这一套毫米坐标。
export const DEFAULTS = Object.freeze({
  height: 2610, run: 1600, targetRise: 250, clearWidth: 460,
  treadDepth: 90, plateThickness: 3, foldHeight: 20,
  beamWidth: 40, beamDepth: 80, beamThickness: 2,
  railSize: 30, railThickness: 1.5, railHeight: 500,
  postSpacing: 800, riserCount: 0, postCount: 0,
  bendRadius: 3, bendK: 0.4,
});

export const FIELDS = [
  ['targetRise', '目标步高', 'mm', 100, 400, 1],
  ['clearWidth', '两梁内净宽／踏板长', 'mm', 200, 1500, 1],
  ['treadDepth', '踏板水平踩踏宽', 'mm', 50, 350, 1],
  ['plateThickness', '花纹板基板厚', 'mm', 1, 12, 0.5],
  ['foldHeight', '前后向下折边高', 'mm', 10, 100, 1],
  ['beamWidth', '主梁窄面宽', 'mm', 20, 150, 1],
  ['beamDepth', '主梁侧面宽', 'mm', 40, 300, 1],
  ['beamThickness', '主梁壁厚', 'mm', 1, 12, 0.5],
  ['railSize', '扶手／立柱方管边长', 'mm', 20, 80, 1],
  ['railThickness', '扶手／立柱壁厚', 'mm', 1, 6, 0.5],
  ['railHeight', '踏板前缘到扶手顶（垂直量）', 'mm', 200, 1400, 10],
  ['postSpacing', '立柱最大间距（沿梯斜长）', 'mm', 300, 1500, 10],
  ['riserCount', '指定等高步距数（0＝自动）', '份', 0, 60, 1],
  ['postCount', '每侧立柱数（0＝自动）', '根', 0, 20, 1],
  ['bendRadius', '折弯内圆角半径', 'mm', 0.5, 20, 0.5],
  ['bendK', '折弯中性层系数K', '', 0.2, 0.6, 0.01],
];

export const fmt = (n, digits = 1) => Number(n.toFixed(digits)).toLocaleString('zh-CN', {maximumFractionDigits: digits, useGrouping: false});
export const point = (x, y) => ({x, y});

function closestRiserCount(height, target) {
  // 比较相邻整数方案的实际步高，而不只四舍五入份数。
  const base = height / target;
  const candidates = [...new Set([Math.max(2, Math.floor(base)), Math.max(2, Math.ceil(base))])];
  return candidates.sort((a, b) => Math.abs(height / a - target) - Math.abs(height / b - target) || b - a)[0];
}

export function calculate(input = {}) {
  const p = {...DEFAULTS};
  for (const key of Object.keys(p)) {
    if (input[key] !== undefined) p[key] = Number(input[key]);
    if (!Number.isFinite(p[key])) throw new Error('请把尺寸填写完整，不能留空或输入文字。');
  }
  if (p.height < 300 || p.height > 12000 || p.run < 200 || p.run > 15000) throw new Error('平台高度请填300～12000毫米，水平距离请填200～15000毫米。');
  for (const [key, label, , min, max] of FIELDS) {
    if (p[key] < min || p[key] > max) throw new Error(`${label}请填${min}～${max}。`);
  }
  if (p.riserCount && (!Number.isInteger(p.riserCount) || p.riserCount < 2)) throw new Error('指定步距数须为2以上整数，自动计算请填0。');
  if (p.postCount && (!Number.isInteger(p.postCount) || p.postCount < 2)) throw new Error('每侧立柱至少2根，自动计算请填0。');
  if (2 * p.beamThickness >= Math.min(p.beamWidth, p.beamDepth) || 2 * p.railThickness >= p.railSize) throw new Error('方管壁厚不能超过方管尺寸的一半。');
  if (p.railSize > p.beamWidth) throw new Error('立柱比主梁上面窄面还宽，请加宽主梁或减小立柱方管。');
  if (p.foldHeight <= p.bendRadius + p.plateThickness || p.treadDepth <= 2 * (p.bendRadius + p.plateThickness)) throw new Error('折边或踏板过小，放不下当前板厚和折弯圆角。');

  const length = Math.hypot(p.height, p.run);
  const c = p.run / length, s = p.height / length, slope = p.height / p.run;
  const count = p.riserCount || closestRiserCount(p.height, p.targetRise);
  const rise = p.height / count, going = p.run / count;
  const contact = p.beamDepth / s;
  const margin = (contact - p.treadDepth) / 2;
  const width = p.clearWidth + p.beamWidth * 2;
  const steps = Array.from({length: count - 1}, (_, i) => {
    const n = i + 1, y = rise * n, station = going * n;
    const x0 = station + margin;
    return {id: `T${String(n).padStart(2, '0')}`, n, y, station, x0, x1: x0 + p.treadDepth, cx: x0 + p.treadDepth / 2, fromTop: p.height - y};
  });

  const beam = {
    length, bottomTrim: p.beamDepth * c / s, topTrim: p.beamDepth * s / c,
    contact, margin,
    side: [point(0, 0), point(contact, 0), point(p.run, p.height - p.beamDepth / c), point(p.run, p.height)],
  };
  const railTop = p.railHeight - slope * margin;
  const railBottom = railTop - p.railSize / c;
  const railX0 = steps[0].x0, railX1 = p.run;
  const span = (railX1 - railX0) / c;
  const railTrim = p.railSize * s / c;
  const rail = {
    x0: railX0, x1: railX1, top: railTop, bottom: railBottom,
    span, trim: railTrim, blank: span + railTrim,
    side: [point(railX0, slope * railX0 + railBottom), point(railX1, slope * railX1 + railBottom), point(railX1, slope * railX1 + railTop), point(railX0, slope * railX0 + railTop)],
  };
  const postX0 = railX0 + p.railSize / 2, postX1 = p.run - p.railSize / 2;
  const postSpan = (postX1 - postX0) / c;
  const postCount = p.postCount || Math.max(2, Math.ceil(postSpan / p.postSpacing) + 1);
  const postCut = p.railSize * slope;
  const posts = Array.from({length: postCount}, (_, i) => {
    const x = postX0 + (postX1 - postX0) * i / (postCount - 1);
    const x0 = x - p.railSize / 2, x1 = x + p.railSize / 2;
    return {id: `P${String(i + 1).padStart(2, '0')}`, x, x0, x1, along: x / c, y: slope * x,
      side: [point(x0, slope * x0), point(x1, slope * x1), point(x1, slope * x1 + railBottom), point(x0, slope * x0 + railBottom)]};
  });

  const deduction = 2 * (p.bendRadius + p.plateThickness) - Math.PI / 2 * (p.bendRadius + p.bendK * p.plateThickness);
  const developed = p.treadDepth + 2 * p.foldHeight - 2 * deduction;
  const bendLine = p.foldHeight - deduction / 2;
  const warnings = [];
  const blocks = [];
  if (margin < -0.01) blocks.push(`踏板比主梁的水平接触范围宽${fmt(-2 * margin)}毫米，不能按“全部镶入并对中”的做法出下料单。请减小踏板宽或增大主梁侧面宽。`);
  if (steps.at(-1).x1 > p.run + 0.01) blocks.push('最上一块踏板已经伸过平台边缘，请增大水平距离或减小踏板宽。');
  if (beam.topTrim + beam.bottomTrim >= length) blocks.push('主梁两端切口相交，当前尺寸无法成形。');
  if (railBottom <= p.railSize || postSpan <= 0) blocks.push('扶手高度或起点空间不足，当前立柱无法安装。请提高扶手或增加水平距离。');
  if (rise < p.foldHeight + p.plateThickness + 20) blocks.push('上下踏板间净空过小，折边会影响上下踏步。');
  if (going < p.treadDepth) warnings.push(`相邻踏板水平投影重叠${fmt(p.treadDepth - going)}毫米，请查看侧视图的脚部空间。`);
  if (Math.abs(rise - p.targetRise) > 30) warnings.push(`实际步高${fmt(rise)}毫米，离目标${fmt(p.targetRise)}毫米较远，可调整步距数。`);
  if (postSpan / (postCount - 1) > p.postSpacing + 0.1) warnings.push('指定立柱数量对应的间距大于当前最大间距设置。');
  const slopeAngle = Math.atan2(p.height, p.run) * 180 / Math.PI;
  if (slopeAngle > 65) warnings.push('当前空间较陡，90毫米踏面接触和上下方式需在样梯上确认。');
  if (slopeAngle < 45) warnings.push('当前梯形较缓，窄踏板之间的水平空隙较大，可增大踏板踩踏宽后重新检查。');

  return {p, length, c, s, slope, slopeAngle, count, rise, going, width, steps, beam, rail, posts,
    post: {cut: postCut, sideLength: railBottom, blank: railBottom + postCut, spacing: postSpan / (postCount - 1)},
    fold: {deduction, developed, bendLine}, warnings, blocks, canFabricate: blocks.length === 0};
}

export function materialRows(m) {
  const {p} = m;
  return [
    ['B01～B02', '左右主梁', `${p.beamWidth}×${p.beamDepth}×${p.beamThickness}方管`, '2根', `${fmt(m.length)} 长点毛料`, `${p.beamDepth}宽面下口退${fmt(m.beam.bottomTrim)}；上口退${fmt(m.beam.topTrim)}`],
    [`T01～T${String(m.steps.length).padStart(2, '0')}`, '花纹板踏板', `基板厚${p.plateThickness}`, `${m.steps.length}块`, `${fmt(p.clearWidth)}×${fmt(m.fold.developed)} 展开参考`, `成品${p.clearWidth}×${p.treadDepth}；前后外高${p.foldHeight}，折弯先试一块`],
    ['H01～H02', '左右扶手顶杆', `${p.railSize}×${p.railSize}×${p.railThickness}方管`, '2根', `${fmt(m.rail.blank)} 长点毛料`, `两端同向斜切，跨${p.railSize}宽面错位${fmt(m.rail.trim)}`],
    [`P01～P${String(m.posts.length).padStart(2, '0')}（左右各一组）`, '竖直立柱', `${p.railSize}×${p.railSize}×${p.railThickness}方管`, `${m.posts.length * 2}根`, `${fmt(m.post.blank)} 长点毛料`, `上下同向斜口，跨${p.railSize}宽面高差${fmt(m.post.cut)}`],
    ['E01～E04', '扶手端封板', `板厚${p.railThickness}`, '4块', `${p.railSize}×${fmt(p.railSize / m.c)} 端面覆盖参考`, '贴端口封焊、修边磨圆，尺寸按外包封板计'],
  ];
}
