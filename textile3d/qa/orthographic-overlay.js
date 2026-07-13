import * as THREE from 'three';
import {allPartModelSpecs} from '../data/model-specs/index.js';
import {createSpecModel} from '../models/spec-models.js';

const params=new URLSearchParams(location.search);
const manual=params.get('manual')||'jwf1206';
const key=params.get('key')||'JWF1206-0100-1';
const spec=allPartModelSpecs[manual]?.[key];
if(!spec)throw new Error(`找不到3D规格：${manual}/${key}`);
const analyses=spec.source?.viewAnalysis||[];
if(!analyses.length)throw new Error(`该零件尚未完成视图语义标注：${key}`);
document.querySelector('#summary').textContent=`${key} · ${analyses.length}个厂家视图叠合验证`;

const W=760,H=520,padding=28;
const projectionUp={front:[0,1,0],side:[0,1,0],top:[0,0,-1]};

function drawSource(canvas,image,box){
  canvas.width=W;canvas.height=H;
  const context=canvas.getContext('2d');context.fillStyle='#fff';context.fillRect(0,0,W,H);
  const [sx,sy,sw,sh]=box,scale=Math.min((W-padding*2)/sw,(H-padding*2)/sh);
  const dw=sw*scale,dh=sh*scale,dx=(W-dw)/2,dy=(H-dh)/2;
  context.drawImage(image,sx,sy,sw,sh,dx,dy,dw,dh);
  return {sx,sy,scale,dx,dy};
}

function targetBox(entityBox,transform){
  if(!entityBox)return null;
  const [x,y,width,height]=entityBox;
  return {
    x:transform.dx+(x-transform.sx)*transform.scale,
    y:transform.dy+(y-transform.sy)*transform.scale,
    width:width*transform.scale,
    height:height*transform.scale,
  };
}

function edgeModel(model){
  const additions=[];
  model.traverse(object=>{
    if(!object.isMesh)return;
    const edges=new THREE.LineSegments(new THREE.EdgesGeometry(object.geometry,12),new THREE.LineBasicMaterial({color:0xff245e,transparent:true,opacity:.9,depthTest:false}));
    edges.position.copy(object.position);edges.rotation.copy(object.rotation);edges.scale.copy(object.scale);
    additions.push([object.parent,edges]);object.visible=false;
  });
  additions.forEach(([parent,edges])=>parent.add(edges));
  return model;
}

function renderProjection(canvas,analysis,fitBox){
  const renderCanvas=fitBox?document.createElement('canvas'):canvas;
  const renderer=new THREE.WebGLRenderer({canvas:renderCanvas,alpha:true,antialias:true,preserveDrawingBuffer:true});
  renderer.setPixelRatio(1);renderer.setSize(W,H,false);renderer.setClearColor(0x000000,0);
  const scene=new THREE.Scene();const model=edgeModel(createSpecModel(spec));scene.add(model);
  if(analysis.flipX){if(analysis.projection==='side')model.scale.z*=-1;else model.scale.x*=-1}
  if(analysis.flipY){if(analysis.projection==='top')model.scale.z*=-1;else model.scale.y*=-1}
  model.updateMatrixWorld(true);
  const bounds=new THREE.Box3().setFromObject(model),center=bounds.getCenter(new THREE.Vector3()),size=bounds.getSize(new THREE.Vector3());
  const projectionSize=analysis.projection==='side'?[size.z,size.y]:analysis.projection==='top'?[size.x,size.z]:[size.x,size.y];
  const aspect=W/H;let halfWidth=projectionSize[0]*.54,halfHeight=projectionSize[1]*.54;
  if(halfWidth/halfHeight>aspect)halfHeight=halfWidth/aspect;else halfWidth=halfHeight*aspect;
  const camera=new THREE.OrthographicCamera(-halfWidth,halfWidth,halfHeight,-halfHeight,.1,20);
  camera.up.fromArray(projectionUp[analysis.projection]);
  if(analysis.projection==='side'){camera.position.set(center.x+6,center.y,center.z);camera.lookAt(center)}
  else if(analysis.projection==='top'){camera.position.set(center.x,center.y+6,center.z);camera.lookAt(center)}
  else{camera.position.set(center.x,center.y,center.z+6);camera.lookAt(center)}
  renderer.render(scene,camera);
  if(fitBox){
    canvas.width=W;canvas.height=H;
    const scanCanvas=document.createElement('canvas');scanCanvas.width=W;scanCanvas.height=H;
    const sourceContext=scanCanvas.getContext('2d',{willReadFrequently:true});
    sourceContext.drawImage(renderCanvas,0,0);
    const pixels=sourceContext.getImageData(0,0,W,H).data;
    let minX=W,minY=H,maxX=-1,maxY=-1;
    for(let y=0;y<H;y+=1)for(let x=0;x<W;x+=1){
      if(pixels[(y*W+x)*4+3]<12)continue;
      if(x<minX)minX=x;if(x>maxX)maxX=x;if(y<minY)minY=y;if(y>maxY)maxY=y;
    }
    if(maxX>=minX&&maxY>=minY){
      canvas.getContext('2d').drawImage(scanCanvas,minX,minY,maxX-minX+1,maxY-minY+1,fitBox.x,fitBox.y,fitBox.width,fitBox.height);
    }
  }
  renderer.dispose();renderer.forceContextLoss();
}

const image=new Image();image.src=`../${spec.source.sourceCrop}`;
await image.decode();
for(const analysis of analyses){
  const card=document.createElement('article');card.className='card';
  card.innerHTML=`<h2>${analysis.name}</h2><div class="stage"><canvas class="source"></canvas><canvas class="projection"></canvas></div><div class="legend"><span>厂家实体线</span><span class="model">3D正投影</span></div><div class="meta"><div><strong>实体理解：</strong>${analysis.entity}</div><div><strong>排除线：</strong>${analysis.exclude}</div><div><strong>材质：</strong>${analysis.material}</div></div>`;
  document.querySelector('#grid').append(card);
  const transform=drawSource(card.querySelector('.source'),image,analysis.sourceBox);
  renderProjection(card.querySelector('.projection'),analysis,targetBox(analysis.entityBox,transform));
}
