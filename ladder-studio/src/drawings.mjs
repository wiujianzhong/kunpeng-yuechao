import {fmt, materialRows} from './engine.mjs';

const escape = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const xy = points => points.map(p => `${p.x},${p.y}`).join(' ');
const text = (x,y,value,cls='',anchor='middle') => `<text x="${x}" y="${y}" class="${cls}" text-anchor="${anchor}">${escape(value)}</text>`;
const line = (x1,y1,x2,y2,cls='') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${cls}"/>`;
const rect = (x,y,w,h,cls='') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" class="${cls}"/>`;
const poly = (p,cls='') => `<polygon points="${xy(p)}" class="${cls}"/>`;
const dim = (x1,y1,x2,y2,label,vertical=false) => {
  const midx=(x1+x2)/2, midy=(y1+y2)/2;
  return `<g class="dim">${line(x1,y1,x2,y2)}${line(x1-4,y1-4,x1+4,y1+4)}${line(x2-4,y2-4,x2+4,y2+4)}${vertical?`<text transform="translate(${midx-7},${midy}) rotate(-90)" text-anchor="middle">${escape(label)}</text>`:text(midx,midy-7,label)}</g>`;
};

const STYLE = `<style>
  text{font-family:"PingFang SC","Microsoft YaHei",sans-serif;fill:#1d3543;font-size:12px}line,polygon,rect,path{stroke:#355567;stroke-width:1.3;fill:none;stroke-linejoin:round}.beam{fill:#e4eef3;stroke:#466b80}.tread{fill:#e8b66a;stroke:#9a6b21}.rail{fill:#c5ddd3;stroke:#3b7464}.platform{fill:#edf0f2;stroke:#8698a1}.dash{stroke:#afbec7;stroke-dasharray:5 4}.dim line{stroke:#226594;stroke-width:.8}.dim text{fill:#226594;font-size:12px;paint-order:stroke;stroke:white;stroke-width:4px}.title{font-size:19px;font-weight:700}.note{font-size:11px;fill:#607885}.id{font-size:11px;font-weight:650}.thin{stroke-width:.7}.warn{fill:#9b5421}.stock{stroke:#a0b0b8;stroke-dasharray:5 4;fill:#f6f8f9}
</style>`;

export function threeView(m) {
  const {p}=m;
  const scale=Math.min(550/(p.height+p.railHeight+170),460/(p.run+180),260/m.width);
  const fs=Math.min(scale,440/(p.height+p.railHeight+170));
  const ts=Math.min(scale,90/(m.width+220),400/(p.run+440));
  const side={x:545,y:690},front={x:135,y:690},top={x:80,y:120};
  const toSide=q=>({x:side.x+q.x*scale,y:side.y-q.y*scale});
  let out=STYLE+text(70,40,'钢梯三视图','title','start')+text(1130,38,'单位：毫米 mm｜按尺寸制作，不按图形比例量料','note','end');
  out+=text(front.x+m.width*fs/2,front.y-(p.height+m.rail.top)*fs-23,'正视图：从梯子起点往上看','id');
  out+=text(top.x+p.run*ts/2,80,'俯视图','id')+text(800,80,'侧视图／踏步标高','id');
  // 正视：宽度与所有踏板标高。
  for(const z of [0,p.beamWidth+p.clearWidth]) out+=rect(front.x+z*fs,front.y-p.height*fs,p.beamWidth*fs,p.height*fs,'beam');
  m.steps.forEach(t=>{
    out+=rect(front.x+p.beamWidth*fs,front.y-t.y*fs,p.clearWidth*fs,Math.max(2,p.plateThickness*fs),'tread');
    if(m.steps.length<=20||t.n===1||t.n===m.steps.length||t.n%Math.ceil(m.steps.length/18)===0)out+=text(front.x-8,front.y-t.y*fs+4,t.id,'id','end');
  });
  for(const z of [p.beamWidth/2,m.width-p.beamWidth/2]){
    const y0=m.posts[0].side[0].y,y1=p.height+m.rail.top;
    out+=rect(front.x+(z-p.railSize/2)*fs,front.y-y1*fs,p.railSize*fs,(y1-y0)*fs,'rail');
  }
  out+=dim(front.x,front.y+37,front.x+m.width*fs,front.y+37,`外宽 ${fmt(m.width)}`);
  out+=dim(front.x+p.beamWidth*fs,front.y+65,front.x+(p.beamWidth+p.clearWidth)*fs,front.y+65,`内净 ${fmt(p.clearWidth)}`);
  out+=dim(front.x-48,front.y,front.x-48,front.y-p.height*fs,`平台高 ${fmt(p.height)}`,true);
  // 侧视：踏板保持水平，平台为最后一级。
  out+=poly(m.beam.side.map(toSide),'beam');
  out+=poly(m.rail.side.map(toSide),'rail');
  m.posts.forEach(post=>out+=poly(post.side.map(toSide),'rail'));
  m.steps.forEach(t=>{
    const a=toSide({x:t.x0,y:t.y}),b=toSide({x:t.x1,y:t.y});
    out+=rect(a.x,a.y,Math.max(2,b.x-a.x),Math.max(2,p.plateThickness*scale),'tread');
    out+=line(a.x,a.y,a.x,a.y+p.foldHeight*scale,'tread')+line(b.x,b.y,b.x,b.y+p.foldHeight*scale,'tread');
    const tx=side.x+p.run*scale+63;
    if(m.steps.length<=20||t.n===1||t.n===m.steps.length||t.n%Math.ceil(m.steps.length/18)===0)out+=line(b.x+2,b.y,tx-6,b.y,'dash')+text(tx,b.y+4,`${t.id}  距地 ${fmt(t.y)}`,'id','start');
  });
  const platform=toSide({x:p.run,y:p.height});
  out+=rect(platform.x,platform.y,82,9,'platform')+text(platform.x+8,platform.y-12,`平台面 ${fmt(p.height)}`,'id','start');
  out+=line(side.x-10,side.y,platform.x+94,side.y,'dash');
  out+=line(platform.x,platform.y,platform.x,side.y+34,'dash');
  out+=dim(side.x,side.y+38,platform.x,side.y+38,`水平距离 L＝${fmt(p.run)}`);
  out+=text(side.x,side.y+71,`每步垂直 ${fmt(m.rise)}；共${m.count}个等高步距；实体踏板${m.steps.length}块`,'note','start');
  const nose=m.steps[0];
  const h0=toSide({x:nose.x0,y:nose.y}),h1=toSide({x:nose.x0,y:nose.y+p.railHeight});
  out+=dim(h0.x-32,h0.y,h1.x-32,h1.y,`扶手垂直高 ${fmt(p.railHeight)}`,true);
  // 俯视。
  for(const z of [0,p.beamWidth+p.clearWidth]) out+=rect(top.x,top.y+z*ts,p.run*ts,p.beamWidth*ts,'beam');
  m.steps.forEach(t=>out+=rect(top.x+t.x0*ts,top.y+p.beamWidth*ts,p.treadDepth*ts,p.clearWidth*ts,'tread'));
  for(const z of [p.beamWidth/2,m.width-p.beamWidth/2])out+=rect(top.x+m.rail.x0*ts,top.y+(z-p.railSize/2)*ts,(p.run-m.rail.x0)*ts,p.railSize*ts,'rail');
  out+=dim(top.x,top.y-22,top.x+p.run*ts,top.y-22,`${fmt(p.run)}`);
  out+=text(70,785,`主梁 ${p.beamWidth}×${p.beamDepth}×${p.beamThickness}；踏板成品 ${p.clearWidth}×${p.treadDepth}×${p.plateThickness}；扶手 ${p.railSize}×${p.railSize}×${p.railThickness}`,'note','start');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 810" role="img" aria-label="钢梯正视侧视俯视三视图">${out}</svg>`;
}

export function cutView(m) {
  const {p}=m;
  let out=STYLE+text(45,40,'下料与切口图','title','start')+text(1150,38,'单位：毫米 mm｜长点下料，不含锯缝损耗','note','end');
  const bx=105,by=145,bw=970,bh=72;
  const short=Math.max(18,m.beam.bottomTrim/m.length*bw),end=Math.max(25,m.beam.topTrim/m.length*bw);
  out+=text(45,85,`B01、B02 主梁：${p.beamWidth}×${p.beamDepth}×${p.beamThickness}，共2根`,'id','start');
  out+=rect(bx,by,bw,bh,'stock');
  out+=poly([{x:bx,y:by},{x:bx+bw,y:by},{x:bx+bw-end,y:by+bh},{x:bx+short,y:by+bh}],'beam');
  out+=dim(bx,by-20,bx+bw,by-20,`长点毛料 ${fmt(m.length)}`);
  out+=dim(bx,by+bh+28,bx+short,by+bh+28,`退 ${fmt(m.beam.bottomTrim)}`);
  out+=dim(bx+bw-end,by+bh+28,bx+bw,by+bh+28,`退 ${fmt(m.beam.topTrim)}`);
  out+=dim(bx-32,by,bx-32,by+bh,`${fmt(p.beamDepth)}宽面`,true);
  out+=text(bx-8,by-7,'A','id')+text(bx+short,by+bh-9,'B','id')+text(bx+bw+8,by-7,'C','id')+text(bx+bw-end,by+bh-9,'D','id');
  out+=text(105,280,`下口：A留原角，下边从左端量${fmt(m.beam.bottomTrim)}到B，连A—B切。`,'note','start');
  out+=text(105,303,`上口：C留原角，下边从右端往回量${fmt(m.beam.topTrim)}到D，连C—D切。两根同样做。`,'note','start');

  const px=125,py=391,pw=84,ph=230,cut=Math.min(90,Math.max(20,m.post.cut/m.post.blank*ph));
  out+=text(45,350,`P 立柱：共${m.posts.length*2}根，全部同样下料`,'id','start');
  out+=rect(px,py,pw,ph,'stock');
  out+=poly([{x:px,y:py+cut},{x:px+pw,y:py},{x:px+pw,y:py+ph-cut},{x:px,y:py+ph}],'rail');
  out+=dim(px-35,py,px-35,py+ph,`毛料 ${fmt(m.post.blank)}`,true);
  out+=dim(px,py+ph+28,px+pw,py+ph+28,`${p.railSize}宽面`);
  out+=dim(px+pw+26,py,px+pw+26,py+cut,`高差 ${fmt(m.post.cut)}`,true);
  out+=text(255,423,'把方管竖着摆，上下斜口方向一致。','note','start');
  out+=text(255,451,`下口：左边留底点，右边从底端向上量${fmt(m.post.cut)}，连线切。`,'note','start');
  out+=text(255,479,`上口：右边留顶点，左边从顶端向下量${fmt(m.post.cut)}，连线切。`,'note','start');
  out+=text(255,507,`两边成品竖边长度均为${fmt(m.post.sideLength)}；全料外包长${fmt(m.post.blank)}。`,'note','start');
  out+=text(255,535,'先试做1根，贴合主梁上面和扶手底面，再批量。','note','start');

  const rx=810,ry=580,rw=270,rh=32,rt=27;
  out+=text(rx,525,'H01、H02 扶手端切示意','id','start');
  out+=rect(rx,ry,rw,rh,'stock');
  out+=poly([{x:rx,y:ry+rh},{x:rx+rt,y:ry},{x:rx+rw,y:ry},{x:rx+rw-rt,y:ry+rh}],'rail');
  out+=dim(rx,ry-20,rx+rw,ry-20,`毛料 ${fmt(m.rail.blank)}`);
  out+=dim(rx,ry+rh+28,rx+rt,ry+rh+28,`错位 ${fmt(m.rail.trim)}`);
  out+=dim(rx+rw+23,ry,rx+rw+23,ry+rh,`${p.railSize}宽面`,true);
  out+=text(rx,670,'两端按同一方向画斜线；图为局部示意。','note','start');

  out+=text(45,712,`H01、H02 扶手顶杆：长点毛料${fmt(m.rail.blank)}，共2根。`,'id','start');
  out+=text(45,738,`跨${p.railSize}宽面，两个端口都错位${fmt(m.rail.trim)}，同向切；对应成品两条长边长度均为${fmt(m.rail.span)}。`,'note','start');
  out+=text(45,764,'端口用封板封住，立柱顶口与扶手底面贴紧焊接；所有接头磨圆，不留开口、尖角。','note','start');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 810" role="img" aria-label="主梁和立柱量尺寸切口图">${out}</svg>`;
}

export function treadView(m) {
  const {p}=m;
  const sx=190,sy=150,sc=1.45;
  const top=p.treadDepth*sc,fold=p.foldHeight*sc,th=p.plateThickness*sc;
  let out=STYLE+text(45,40,'踏板折弯与焊接定位','title','start')+text(1140,38,'单位：毫米 mm','note','end');
  out+=text(70,92,`成品踏板 ${p.clearWidth}长 × ${p.treadDepth}踩踏宽 × ${p.plateThickness}基板厚；前后外高${p.foldHeight}`,'id','start');
  out+=poly([{x:sx,y:sy},{x:sx+top,y:sy},{x:sx+top,y:sy+fold},{x:sx+top-th,y:sy+fold},{x:sx+top-th,y:sy+th},{x:sx+th,y:sy+th},{x:sx+th,y:sy+fold},{x:sx,y:sy+fold}],'tread');
  out+=dim(sx,sy-22,sx+top,sy-22,`成品外宽 ${p.treadDepth}`)+dim(sx-27,sy,sx-27,sy+fold,`外高 ${p.foldHeight}`,true);
  out+=text(470,155,'端视：两个长边向下折，踩踏面保持水平。','note','start');
  out+=text(470,180,`${p.clearWidth}长的两个端头分别贴两根主梁内侧，沿实际接触边焊接。`,'note','start');

  const dx=170,dy=293,dw=620,dh=150,band=m.fold.bendLine/m.fold.developed*dh;
  out+=text(70,250,'展开参考：需要用实际板厚、刀具和试折结果确认','id','start');
  out+=rect(dx,dy,dw,dh,'tread')+line(dx,dy+band,dx+dw,dy+band,'dash')+line(dx,dy+dh-band,dx+dw,dy+dh-band,'dash');
  out+=dim(dx,dy-20,dx+dw,dy-20,`${p.clearWidth} 长`)+dim(dx+dw+35,dy,dx+dw+35,dy+dh,`展开 ${fmt(m.fold.developed)}`,true);
  out+=text(dx+dw/2,dy+dh/2+4,`两条折弯中心线距各自长边 ${fmt(m.fold.bendLine)}`,'id');
  out+=text(70,485,`当前计算：内圆角R${p.bendRadius}，K=${p.bendK}，每弯扣除${fmt(m.fold.deduction)}；两弯合计扣除${fmt(m.fold.deduction*2)}。`,'note','start');
  out+=text(70,511,'板厚指花纹板基板，不含凸起花纹。折边20按成品外包高度计。先试折一块再批量下板。','note','start');

  const cx=245,cy=645,cw=m.beam.contact*3.8,td=p.treadDepth*3.8;
  out+=rect(cx,cy,cw,65,'beam')+rect(cx+(cw-td)/2,cy+24,td,17,'tread');
  out+=dim(cx,cy-22,cx+cw,cy-22,`主梁侧面在踏面高度的水平范围 ${fmt(m.beam.contact)}`);
  out+=text(cx+cw+35,cy+23,m.beam.margin>=0?`前后对中，各留 ${fmt(m.beam.margin)}`:'踏板超出，暂不能制作','id','start');
  out+=text(70,760,'装配时两梁内净距锁定为踏板成品长度；先点焊检查水平、宽度和对角线，再按焊接工艺施焊。','note','start');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 810" role="img" aria-label="踏板折弯展开和居中焊接图">${out}</svg>`;
}

const table=(head,rows)=>`<table><thead><tr>${head.map(x=>`<th>${escape(x)}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map(x=>`<td>${escape(x)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;

export function positionTables(m) {
  return `<h3>踏板位置：全部从同一地面基准量</h3>${table(['编号','踩踏面距地高','前缘距梯脚A水平距离','与上一踩踏面高差'],m.steps.map(t=>[t.id,fmt(t.y),fmt(t.x0),fmt(m.rise)]))}<p class="paper-note">地面＝0；平台面＝${fmt(m.p.height)}。最后一块踏板到平台的垂直高差仍是${fmt(m.rise)}毫米。水平坐标指下坡侧踏板前缘，焊缝不另留间隙。</p><h3>立柱位置：左右两边一一对应</h3>${table(['每侧编号','中心距A水平距离','中心沿主梁上边量','中心落脚距地高'],m.posts.map(t=>[t.id,fmt(t.x),fmt(t.along),fmt(t.y)]))}<p class="paper-note">立柱竖直，落在主梁${m.p.beamWidth}毫米上面窄面，左右居中各留${fmt((m.p.beamWidth-m.p.railSize)/2)}毫米。最后一根的上坡外边对齐平台边缘竖线。</p>`;
}

export function fabricationSheets(m) {
  const summary=`平台高 ${fmt(m.p.height)} · 水平 ${fmt(m.p.run)} · 踏板 ${m.steps.length}块 · 每步 ${fmt(m.rise)} · 单位mm`;
  const head=title=>`<header class="paper-heading"><b>小伍 · 钢梯出图</b><span>${title}</span><small>${summary}</small></header>`;
  const foot='<footer class="paper-footer">按标注尺寸制作。平台／地面固定件须按现场基材另定，未列入本材料表；本页未包含承载、焊缝及锚固验算。</footer>';
  return [
    `<section class="sheet">${head('总装三视图')}${threeView(m)}${foot}</section>`,
    `<section class="sheet">${head('主梁、立柱、扶手下料')}${cutView(m)}${foot}</section>`,
    `<section class="sheet">${head('踏板制作详图')}${treadView(m)}${foot}</section>`,
    `<section class="sheet">${head('材料与制作顺序')}<h3>下料清单</h3>${table(['编号','名称','材料／规格','数量','下料尺寸（mm）','加工说明'],materialRows(m))}<h3>照这个顺序做</h3><ol class="work-order"><li>把B01、B02两根主梁的${m.p.beamDepth}毫米宽面朝上，按切口图画线。两根叠放核对后切割，去毛刺。</li><li>按成品要求先试折1块踏板：长${m.p.clearWidth}，水平踩踏宽${m.p.treadDepth}，前后向下折${m.p.foldHeight}；确认展开后再做其余${Math.max(0,m.steps.length-1)}块。</li><li>在平整地面放样平台高${m.p.height}、水平距离${m.p.run}。固定两梁，内净距${m.p.clearWidth}，外宽${m.width}。</li><li>按踏板定位表，从同一地面基准量每块踩踏面高度。踏板前后对中两梁侧面接触范围，左右端贴梁内侧。先点焊、检查水平和宽度，再按施工方确认的焊接工艺完成接触边焊缝。</li><li>按立柱定位表逐个放置P件：立柱竖直，两端斜口同方向；居中放在主梁上面窄面，左右位置对应。</li><li>安装H01、H02扶手，立柱顶口贴紧扶手底面。扶手高从踏板下坡前缘垂直量到扶手顶：${m.p.railHeight}。端口加封板，接头焊好磨圆。</li><li>按现场平台和地面条件确定固定件并安装。最后复核所有踏板水平、首末步高、净宽及焊接连接。</li></ol>${foot}</section>`,
    `<section class="sheet position-sheet">${head('踏板与立柱安装定位')}${positionTables(m)}${foot}</section>`,
  ].join('');
}

export function csv(m) {
  const rows=[['项目','内容'],['平台面高度',m.p.height],['水平伸出',m.p.run],['步距数',m.count],['实际步高',fmt(m.rise)],[],['编号','名称','材料','数量','下料尺寸mm','加工'],...materialRows(m),[],['踏板编号','距地标高mm','前缘水平距Amm','踩踏宽mm'],...m.steps.map(t=>[t.id,fmt(t.y),fmt(t.x0),m.p.treadDepth]),[],['立柱编号（每侧）','中心水平距Amm','沿主梁上边距Amm','中心落脚距地mm'],...m.posts.map(p=>[p.id,fmt(p.x),fmt(p.along),fmt(p.y)])];
  return '\uFEFF'+rows.map(row=>row.map(v=>`"${String(v).replace(/"/g,'""')}"`).join(',')).join('\r\n');
}

export function tableImage(m,kind) {
  // 直接生成矢量文字和表格，存图时不会截断滚动区域。
  const total=1260,left=70,lineHeight=25,fontSize=17;
  const wrap=(value,width)=>{
    const lines=[];let current='',used=0;
    for(const char of String(value)){
      const size=char.charCodeAt(0)>255?fontSize:fontSize*.6;
      if(used+size>width&&current){lines.push(current);current='';used=0;}
      current+=char;used+=size;
    }
    lines.push(current);return lines;
  };
  let y=135;
  const title=kind==='materials'?'钢梯下料清单':'踏板与立柱安装定位';
  let content=text(70,55,title,'title','start')+text(70,89,`平台高${fmt(m.p.height)} · 水平${fmt(m.p.run)} · ${m.steps.length}块踏板 · 每步${fmt(m.rise)} · 单位mm`,'note','start');
  function table(title,headers,rows,widths){
    content+=text(left,y,title,'section-title','start');y+=20;
    const all=[headers,...rows];
    for(let i=0;i<all.length;i++){
      const cells=all[i].map((value,j)=>wrap(value,widths[j]-22));
      const height=Math.max(...cells.map(c=>c.length))*lineHeight+22;
      content+=`<rect x="${left}" y="${y}" width="${total}" height="${height}" fill="${i===0?'#e8f0f4':i%2?'#ffffff':'#f7fafb'}" stroke="#cad9e2"/>`;
      let x=left;
      for(let j=0;j<cells.length;j++){
        if(j)content+=line(x,y,x,y+height,'cell-border');
        for(let k=0;k<cells[j].length;k++)content+=text(x+11,y+29+k*lineHeight,cells[j][k],i===0?'cell header-cell':'cell','start');
        x+=widths[j];
      }
      y+=height;
    }
    y+=34;
  }
  if(kind==='materials')table('按编号逐件下料',['编号','名称','规格','数量','下料尺寸（mm）','加工说明'],materialRows(m),[170,140,200,85,260,405]);
  else{
    table('踏板：全部从同一地面量踩踏面高度',['踏板编号','踩踏面距地高','前缘距梯脚A水平距离','与上一踩踏面高差'],m.steps.map(t=>[t.id,fmt(t.y),fmt(t.x0),fmt(m.rise)]),[170,280,430,380]);
    table('立柱：左右两边各一组，位置对应',['每侧编号','中心距A水平距离','中心沿主梁上边量','中心落脚距地高'],m.posts.map(p=>[p.id,fmt(p.x),fmt(p.along),fmt(p.y)]),[170,340,380,370]);
  }
  const notes=kind==='materials'?[
    '毛料按长点外包尺寸计，不含锯缝损耗。花纹板厚度指基板厚，不含凸起花纹。',
    '折弯展开为参考值，先试折一块踏板确认尺寸；立柱先试配一根，再批量制作。',
    '请同时查看切口和踏板详图。现场固定件另定；本图未包含承载、焊缝和锚固验算。',
  ]:[
    `地面＝0，平台面＝${fmt(m.p.height)}。首步和最后一块踏板到平台的高差均为${fmt(m.rise)}。`,
    `立柱竖直放在主梁${m.p.beamWidth}毫米窄面上，居中各留${fmt((m.p.beamWidth-m.p.railSize)/2)}毫米。`,
    `扶手顶距踏板下坡前缘的垂直高度${m.p.railHeight}。最上立柱的上坡外边对齐平台边缘竖线。`,
  ];
  for(const note of notes)for(const row of wrap(note,total)){content+=text(left,y,row,'note','start');y+=27;}
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 ${y+40}"><rect width="1400" height="${y+40}" fill="white"/><style>text{font-family:"PingFang SC","Microsoft YaHei",sans-serif;fill:#1d3543}.title{font-size:29px;font-weight:700}.note{font-size:17px;fill:#587281}.section-title{font-size:20px;font-weight:650}.cell{font-size:17px}.header-cell{font-weight:650}.cell-border{stroke:#cad9e2;stroke-width:1}</style>${content}</svg>`;
}

export function dxf(m) {
  // CAD使用真实毫米坐标；每个投影的位置独立平移，不改变比例。
  const entities=[];
  const L=(a,b,layer='轮廓')=>entities.push(`0\nLINE\n8\n${layer}\n10\n${a.x}\n20\n${a.y}\n30\n0\n11\n${b.x}\n21\n${b.y}\n31\n0`);
  const P=(pts,layer)=>pts.forEach((a,i)=>L(a,pts[(i+1)%pts.length],layer));
  const T=(x,y,s,h=35)=>entities.push(`0\nTEXT\n8\n标注\n10\n${x}\n20\n${y}\n30\n0\n40\n${h}\n1\n${s}`);
  const box=(x,y,w,h,layer)=>P([{x,y},{x:x+w,y},{x:x+w,y:y+h},{x,y:y+h}],layer);
  P(m.beam.side,'主梁');P(m.rail.side,'扶手');m.posts.forEach(p=>P(p.side,'立柱'));
  m.steps.forEach(t=>{box(t.x0,t.y-m.p.plateThickness,m.p.treadDepth,m.p.plateThickness,'踏板');L({x:t.x0,y:t.y},{x:t.x0,y:t.y-m.p.foldHeight},'踏板');L({x:t.x1,y:t.y},{x:t.x1,y:t.y-m.p.foldHeight},'踏板');T(m.p.run+220,t.y,`${t.id} H=${fmt(t.y)}`);});
  const fx=-m.width-600;
  box(fx,0,m.p.beamWidth,m.p.height,'主梁');box(fx+m.p.beamWidth+m.p.clearWidth,0,m.p.beamWidth,m.p.height,'主梁');
  m.steps.forEach(t=>box(fx+m.p.beamWidth,t.y-m.p.plateThickness,m.p.clearWidth,m.p.plateThickness,'踏板'));
  for(const z of [m.p.beamWidth/2,m.width-m.p.beamWidth/2]){
    const low=m.posts[0].side[0].y,high=m.p.height+m.rail.top;
    box(fx+z-m.p.railSize/2,low,m.p.railSize,high-low,'扶手');
  }
  const ty=m.p.height+m.p.railHeight+500;
  box(0,ty,m.p.run,m.p.beamWidth,'主梁');box(0,ty+m.p.beamWidth+m.p.clearWidth,m.p.run,m.p.beamWidth,'主梁');
  m.steps.forEach(t=>box(t.x0,ty+m.p.beamWidth,m.p.treadDepth,m.p.clearWidth,'踏板'));
  for(const z of [m.p.beamWidth/2,m.width-m.p.beamWidth/2])box(m.rail.x0,ty+z-m.p.railSize/2,m.p.run-m.rail.x0,m.p.railSize,'扶手');
  T(0,-180,`L=${m.p.run}  H=${m.p.height}  STEP=${fmt(m.rise)}  mm`);
  T(fx,-180,`WIDTH=${m.width}  CLEAR=${m.p.clearWidth} mm`);
  T(0,ty+m.width+120,'俯视图／单位毫米');
  return `0\nSECTION\n2\nHEADER\n9\n$ACADVER\n1\nAC1021\n9\n$INSUNITS\n70\n4\n9\n$MEASUREMENT\n70\n1\n0\nENDSEC\n0\nSECTION\n2\nENTITIES\n${entities.join('\n')}\n0\nENDSEC\n0\nEOF\n`;
}
