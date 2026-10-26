import test from 'node:test';
import assert from 'node:assert/strict';
import {calculate,materialRows,DEFAULTS} from '../src/engine.mjs';
import {threeView,fabricationSheets,csv,dxf} from '../src/drawings.mjs';

const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-7,`${a} 应等于 ${b}`);

test('原现场：首步、末步一起均分，9踏板、10步距、每步261',()=>{
  const m=calculate();assert.equal(m.count,10);assert.equal(m.steps.length,9);near(m.rise,261);
  near(m.steps[0].y,m.rise);near(m.p.height-m.steps.at(-1).y,m.rise);
  near(m.beam.bottomTrim,80*1600/2610);near(m.beam.topTrim,80*2610/1600);
  assert.equal(m.posts.length,5);assert.equal(m.canFabricate,true);
});
test('不同高度均分，自动比较实际步高最接近目标的份数',()=>{
  for(let height=700;height<=6000;height+=37){
    const m=calculate({height,run:height*.62});
    near(m.rise*m.count,height);assert.equal(m.steps.length,m.count-1);
    for(let i=1;i<m.steps.length;i++)near(m.steps[i].y-m.steps[i-1].y,m.rise);
    near(height-m.steps.at(-1).y,m.rise);
    for(const n of [Math.max(2,m.count-1),m.count+1])assert.ok(Math.abs(m.rise-250)<=Math.abs(height/n-250)+1e-8);
  }
});
test('可以调整目标步高和手动份数，材料跟随改变',()=>{
  const m=calculate({height:3000,run:2000,targetRise:240,riserCount:13,clearWidth:500,beamWidth:50,beamDepth:100,railSize:35});
  assert.equal(m.count,13);near(m.width,600);near(m.rise,3000/13);
  const rows=materialRows(m);assert.ok(rows[0][2].includes('50×100'));assert.ok(rows[0][5].startsWith('100宽面'));
  assert.ok(rows[1][4].startsWith('500×'));assert.ok(rows[2][2].startsWith('35×35'));
});
test('踏板两端净距与前后接触对中，主梁切口恢复原坐标',()=>{
  const m=calculate();
  for(const step of m.steps){near(step.cx,step.station+m.beam.contact/2);near(step.x0-step.station,m.beam.margin);}
  near(m.beam.side[1].y,0);near(m.beam.side[2].x,m.p.run);near(m.beam.side[3].y,m.p.height);
  near(m.beam.bottomTrim*m.c+m.p.beamDepth*m.s,m.beam.contact);
});
test('立柱上下切口贴合，扶手高度从踏板前缘垂直测量',()=>{
  const m=calculate();const {p}=m;
  for(const t of m.steps)near(m.slope*t.x0+m.rail.top-t.y,p.railHeight);
  for(const post of m.posts){
    near(post.side[0].y,m.slope*post.side[0].x);
    near(post.side[2].y,m.slope*post.side[2].x+m.rail.bottom);
    near(post.side[2].y-post.side[3].y,m.post.cut);
  }
  near(m.posts.at(-1).x1,p.run);near(m.posts[0].x0,m.rail.x0);
  near(m.post.blank,m.post.sideLength+m.post.cut);
});
test('折弯展开扣除两弯，不直接拿90加20加20作下料',()=>{
  const m=calculate();assert.ok(m.fold.developed<130);assert.ok(m.fold.developed>90);
  near(m.fold.developed,90+40-2*m.fold.deduction);
  near(2*m.fold.bendLine+(90-m.fold.deduction),m.fold.developed);
});
test('不允许贴合的踏板、过厚方管、留空参数均有明确提示',()=>{
  assert.equal(calculate({treadDepth:120}).canFabricate,false);
  assert.equal(calculate({height:6000,run:200}).canFabricate,false);
  assert.throws(()=>calculate({railSize:50}),/立柱比/);
  assert.throws(()=>calculate({railThickness:NaN}),/填写完整/);
  assert.throws(()=>calculate({riserCount:1}),/2以上/);
});
test('三视图、打印、下料表和CAD使用同一套自定义参数',()=>{
  const m=calculate({height:3000,run:2000,clearWidth:500,beamWidth:50,beamDepth:100});
  const svg=threeView(m),sheets=fabricationSheets(m),sheet=csv(m),cad=dxf(m);
  assert.ok(svg.includes('3000'));assert.ok(svg.includes('内净 500'));assert.ok(sheets.includes('500长的两个端头'));
  assert.ok(sheet.includes('T11'));assert.ok(sheet.includes('2750'));assert.ok(cad.includes('$INSUNITS\n70\n4'));
  assert.ok(cad.includes('T11 H=2750'));assert.ok(!sheets.includes('460长的两个端头'));
  assert.equal((sheets.match(/<section class="sheet/g)||[]).length,5);
});
