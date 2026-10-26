import {spawn} from 'node:child_process';
import {mkdtemp,mkdir,writeFile,readFile,readdir,rm} from 'node:fs/promises';
import {resolve,dirname,join} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {tmpdir} from 'node:os';
import assert from 'node:assert/strict';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const out=resolve(root,'验收');await mkdir(out,{recursive:true});
const downloads=await mkdtemp(join(out,'导出测试-'));
const profile=await mkdtemp(join(tmpdir(),'ladder-studio-test-'));
const chrome=spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',[
  '--headless=new','--no-first-run','--no-default-browser-check','--hide-scrollbars',
  '--use-angle=swiftshader','--enable-unsafe-swiftshader','--allow-file-access-from-files',
  '--remote-debugging-port=9476',`--user-data-dir=${profile}`,'--window-size=1440,1100','about:blank',
],{stdio:'ignore'});
const wait=ms=>new Promise(r=>setTimeout(r,ms));
let socket;
try{
  let tabs;
  for(let i=0;i<60;i++){try{tabs=await(await fetch('http://127.0.0.1:9476/json')).json();break;}catch{await wait(200);}}
  const target=tabs.find(t=>t.type==='page');socket=new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((ok,no)=>{socket.addEventListener('open',ok,{once:true});socket.addEventListener('error',no,{once:true});});
  let seq=0;const pending=new Map(),errors=[];
  const send=(method,params={})=>new Promise((ok,no)=>{
    const id=++seq;const timeout=setTimeout(()=>{pending.delete(id);no(new Error(`浏览器命令超时：${method}`));},20000);
    pending.set(id,{ok,no,timeout});socket.send(JSON.stringify({id,method,params}));
  });
  socket.addEventListener('message',event=>{
    const msg=JSON.parse(event.data);
    if(msg.method==='Runtime.exceptionThrown')errors.push(msg.params.exceptionDetails.exception?.description||msg.params.exceptionDetails.text);
    if(!pending.has(msg.id))return;
    const {ok,no,timeout}=pending.get(msg.id);clearTimeout(timeout);pending.delete(msg.id);
    msg.error?no(new Error(msg.error.message)):ok(msg.result);
  });
  const evaluate=async expression=>{
    const r=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});
    if(r.exceptionDetails)throw new Error(r.exceptionDetails.exception?.description||r.exceptionDetails.text);
    return r.result.value;
  };
  const navigate=async url=>{
    await send('Page.navigate',{url});
    for(let i=0;i<60;i++){if(await evaluate(`location.href===${JSON.stringify(url)} && Boolean(window.__ladder?.ready)`))return;await wait(200);}
    throw new Error('页面未能在规定时间内完成模型与图纸初始化。');
  };
  const set=async values=>evaluate(`(()=>{const values=${JSON.stringify(values)};for(const [key,value] of Object.entries(values))document.getElementById(key).value=String(value);window.__ladder.render();return {height:window.__ladder.model?.p.height,treads:window.__ladder.model?.steps.length};})()`);
  const click=async selector=>evaluate(`document.querySelector(${JSON.stringify(selector)}).click()`);
  const shot=async name=>{
    await wait(180);const metrics=await send('Page.getLayoutMetrics');const size=metrics.cssContentSize;
    const result=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip:{x:0,y:0,width:size.width,height:size.height,scale:1}});
    await writeFile(resolve(out,name),Buffer.from(result.data,'base64'));
  };
  await send('Page.enable');await send('Runtime.enable');
  await send('Browser.setDownloadBehavior',{behavior:'allow',downloadPath:downloads});
  await send('Emulation.setDeviceMetricsOverride',{width:1440,height:1100,deviceScaleFactor:1,mobile:false});
  await navigate(pathToFileURL(resolve(root,'index.html')).href);
  assert.equal(await evaluate('window.__ladder.model.steps.length'),9);
  assert.equal(await evaluate('window.__ladder.model.rise'),261);
  assert.ok((await evaluate('window.__ladder.inspect3d().meshes'))>40);
  const rotation1=await evaluate('window.__ladder.inspect3d().rotation');await wait(900);
  const rotation2=await evaluate('window.__ladder.inspect3d().rotation');assert.ok(Math.abs(rotation2-rotation1)>.003,'3D模型应该实际旋转');
  await evaluate("window.__ladder.setView('iso')");await shot('01-桌面默认方案.png');
  for(const view of ['front','back','side','rear','top']){await evaluate(`window.__ladder.setView('${view}')`);await shot(`3D-${view}.png`);}
  await click('#tab-views');await shot('02-默认三视图.png');
  assert.ok((await evaluate("document.querySelector('#three-view').textContent")).includes('T09'));
  await click('#tab-cuts');await shot('03-下料切口.png');
  await send('Emulation.setEmulatedMedia',{media:'print'});
  const pdf=await send('Page.printToPDF',{printBackground:true,preferCSSPageSize:true,displayHeaderFooter:false});
  await writeFile(resolve(out,'默认方案-施工图.pdf'),Buffer.from(pdf.data,'base64'));
  await send('Emulation.setEmulatedMedia',{media:'screen'});

  await click('[data-unit="m"]');assert.equal(await evaluate("document.getElementById('height').value"),'2.61');
  assert.equal(await evaluate('window.__ladder.model.p.height'),2610);await click('[data-unit="mm"]');
  await set({height:3000,run:2000});assert.equal(await evaluate('window.__ladder.model.steps.length'),11);assert.equal(await evaluate('window.__ladder.model.rise'),250);
  await set({treadDepth:120});assert.equal(await evaluate("document.getElementById('print').disabled"),true);assert.equal(await evaluate("document.getElementById('download-views-png').disabled"),true);assert.ok(await evaluate("document.getElementById('message-area').textContent.includes('不能按')"));
  await set({treadDepth:90});assert.equal(await evaluate("document.getElementById('print').disabled"),false);
  await set({height:''});assert.equal(await evaluate("document.getElementById('print').disabled"),true);
  await set({height:3000,clearWidth:500,beamWidth:50,beamDepth:100,railSize:35});
  assert.equal(await evaluate('window.__ladder.model.width'),600);
  assert.ok(await evaluate("document.getElementById('fabrication-content').textContent.includes('500长的两个端头')"));

  await click('[data-unit="m"]');
  await click('#download-csv');await click('#download-dxf');await click('#download-svg');await click('#save-html');
  for(let i=0;i<30;i++){const files=await readdir(downloads);if(files.filter(f=>!f.endsWith('.crdownload')).length===4)break;await wait(150);}
  const files=await readdir(downloads);assert.equal(files.length,4);
  const htmlFile=files.find(f=>f.endsWith('.html'));
  const csvFile=files.find(f=>f.endsWith('.csv'));assert.ok((await readFile(join(downloads,csvFile),'utf8')).includes('T11'));
  const dxfFile=files.find(f=>f.endsWith('.dxf'));assert.ok((await readFile(join(downloads,dxfFile),'utf8')).includes('T11 H=2750'));
  let completed=files.length;
  for(const type of ['model','views','cuts','tread','materials','positions']){
    await click('#image-export>summary');await click(`[data-image="${type}"]`);
    for(let i=0;i<50;i++){const all=await readdir(downloads);if(all.filter(f=>!f.endsWith('.crdownload')).length>completed)break;await wait(150);}
    completed+=1;assert.equal((await readdir(downloads)).filter(f=>!f.endsWith('.crdownload')).length,completed,`应成功导出${type}图片`);
  }
  const pngs=(await readdir(downloads)).filter(f=>f.endsWith('.png'));assert.equal(pngs.length,6);
  for(const name of pngs){const data=await readFile(join(downloads,name));assert.equal(data.subarray(0,8).toString('hex'),'89504e470d0a1a0a');assert.ok(data.readUInt32BE(16)>=1400);assert.ok(data.readUInt32BE(20)>400);assert.ok(data.length>10000);}
  await navigate(pathToFileURL(join(downloads,htmlFile)).href);
  assert.equal(await evaluate('window.__ladder.model.p.height'),3000);
  assert.equal(await evaluate('window.__ladder.model.p.clearWidth'),500);
  assert.equal(await evaluate("document.querySelector('.main-unit').textContent"),'mm');
  assert.ok((await evaluate('window.__ladder.inspect3d().meshes'))>40);

  await click('#reset-materials');await set({height:2610,run:1600});await click('#tab-3d');await wait(3100);
  await send('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
  await evaluate('window.scrollTo(0,0)');await wait(250);
  assert.ok(await evaluate('document.documentElement.scrollWidth<=window.innerWidth+1'),'手机页面不应该横向溢出');
  await shot('04-手机完整页面.png');
  await evaluate("document.querySelector('.design-area').scrollIntoView()");await shot('05-手机3D.png');
  await click('#advanced>summary');
  assert.ok(await evaluate('document.documentElement.scrollWidth<=window.innerWidth+1'),'手机展开参数后不应该横向溢出');
  assert.deepEqual(errors,[],'页面不应该出现运行错误');
  const report={状态:'通过',检查:['默认排步与首末步','真实3D旋转','六个观察方向','三视图尺寸','切口图','打印PDF','米和毫米切换','参数联动','非法尺寸阻止出图','CSV、DXF、SVG导出','6类PNG图片导出','完整方案离线重开','390像素手机布局'],导出目录:downloads,运行错误:errors};
  await writeFile(resolve(out,'浏览器验收.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
}finally{
  socket?.close();chrome.kill('SIGTERM');await rm(profile,{recursive:true,force:true});
}
