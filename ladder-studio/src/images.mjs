import {fmt} from './engine.mjs';

const loadImage=url=>new Promise((resolve,reject)=>{
  const image=new Image();image.onload=()=>resolve(image);image.onerror=()=>reject(new Error('图片生成失败，请重试。'));image.src=url;
});
const blob=canvas=>new Promise((resolve,reject)=>canvas.toBlob(value=>value?resolve(value):reject(new Error('浏览器未能保存图片，请重试。')),'image/png'));

export async function svgPNG(svg) {
  const doc=new DOMParser().parseFromString(svg,'image/svg+xml');
  const [, ,width,height]=doc.documentElement.getAttribute('viewBox').split(/\s+/).map(Number);
  const scale=Math.min(2,Math.sqrt(12e6/(width*height)));
  const canvas=document.createElement('canvas');canvas.width=Math.round(width*scale);canvas.height=Math.round(height*scale);
  const ctx=canvas.getContext('2d');ctx.fillStyle='white';ctx.fillRect(0,0,canvas.width,canvas.height);
  const url=URL.createObjectURL(new Blob([svg],{type:'image/svg+xml;charset=utf-8'}));
  try{ctx.drawImage(await loadImage(url),0,0,canvas.width,canvas.height);return await blob(canvas);}
  finally{URL.revokeObjectURL(url);}
}

export async function modelPNG(viewer,host,m) {
  const width=host.clientWidth,height=host.clientHeight;
  if(!width||!height)throw new Error('请先打开3D视图，再导出图片。');
  const scale=Math.max(2,1400/width),header=106,footer=100;
  const origin=host.getBoundingClientRect();
  // 与当前相机画面同时取得标签位置；不把按钮、滚动条导进图中。
  const layer=host.querySelector('.model-labels');
  const labels=layer.hidden?[]:[...layer.querySelectorAll('.model-label:not([hidden])')].map(el=>{
    const r=el.getBoundingClientRect();return {text:el.textContent,x:r.left-origin.left,y:r.top-origin.top,width:r.width,height:r.height};
  });
  const leaders=layer.hidden?[]:[...layer.querySelectorAll('line')].filter(el=>el.style.display!=='none').map(el=>['x1','y1','x2','y2'].map(key=>Number(el.getAttribute(key))));
  const url=viewer.image(scale);
  const canvas=document.createElement('canvas');canvas.width=Math.round(width*scale);canvas.height=Math.round((height+header+footer)*scale);
  const ctx=canvas.getContext('2d');ctx.scale(scale,scale);ctx.fillStyle='white';ctx.fillRect(0,0,width,height+header+footer);
  ctx.fillStyle='#173746';ctx.font='650 22px "PingFang SC","Microsoft YaHei",sans-serif';ctx.fillText('钢梯3D标注视图',18,34);
  const wrap=(value,x,y,maxWidth,lineHeight)=>{
    let line='';for(const char of value){if(ctx.measureText(line+char).width>maxWidth&&line){ctx.fillText(line,x,y);line='';y+=lineHeight;}line+=char;}ctx.fillText(line,x,y);return y;
  };
  ctx.fillStyle='#587281';ctx.font='12px "PingFang SC","Microsoft YaHei",sans-serif';
  wrap(`平台高${fmt(m.p.height)} · 水平${fmt(m.p.run)} · 每步${fmt(m.rise)} · ${m.steps.length}块踏板 · 单位mm`,18,60,width-36,19);
  ctx.save();ctx.beginPath();ctx.rect(0,header,width,height);ctx.clip();
  ctx.drawImage(await loadImage(url),0,header,width,height);
  ctx.lineWidth=.8;ctx.strokeStyle='#8babbc';
  for(const [x1,y1,x2,y2] of leaders){ctx.beginPath();ctx.moveTo(x1,y1+header);ctx.lineTo(x2,y2+header);ctx.stroke();}
  for(const label of labels){
    ctx.fillStyle='rgba(247,251,253,.96)';ctx.strokeStyle='#c4d6e1';ctx.lineWidth=.8;
    ctx.beginPath();ctx.roundRect(label.x,label.y+header,label.width,label.height,5);ctx.fill();ctx.stroke();
    ctx.fillStyle='#355b6f';ctx.font=`${width<600?9:10}px "PingFang SC","Microsoft YaHei",sans-serif`;ctx.textBaseline='middle';
    ctx.fillText(label.text,label.x+7,label.y+header+label.height/2);
  }
  ctx.restore();ctx.textBaseline='alphabetic';ctx.strokeStyle='#d9e3e8';ctx.beginPath();ctx.moveTo(18,header+height+14);ctx.lineTo(width-18,header+height+14);ctx.stroke();
  ctx.fillStyle='#456576';ctx.font='12px "PingFang SC","Microsoft YaHei",sans-serif';
  const next=wrap(`主梁${m.p.beamWidth}×${m.p.beamDepth}×${m.p.beamThickness} · 踏板${m.p.clearWidth}×${m.p.treadDepth}×${m.p.plateThickness} · 扶手${m.p.railSize}×${m.p.railSize}×${m.p.railThickness}`,18,header+height+38,width-36,19);
  ctx.fillStyle='#7d929d';ctx.font='10px "PingFang SC","Microsoft YaHei",sans-serif';
  wrap('小伍工作室 · 按当前观察方向导出；下料制作请结合切口图与安装定位表。',18,next+24,width-36,17);
  return blob(canvas);
}
