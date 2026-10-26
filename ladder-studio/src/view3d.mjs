import * as THREE from '../../jwf1206-training/vendor/three.module.js';
import {OrbitControls} from '../../jwf1206-training/vendor/OrbitControls.js';
import {fmt} from './engine.mjs';

export function createViewer(host, onRotateChange) {
  const scene=new THREE.Scene();
  scene.background=new THREE.Color('#edf3f5');
  const camera=new THREE.OrthographicCamera(-2200,2200,2200,-2200,1,60000);
  const renderer=new THREE.WebGLRenderer({antialias:true,alpha:false,preserveDrawingBuffer:true});
  renderer.setPixelRatio(Math.min(devicePixelRatio,2));
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.setClearColor('#edf3f5');
  host.prepend(renderer.domElement);
  renderer.domElement.setAttribute('aria-label','可拖动旋转和缩放的钢梯三维模型');
  const controls=new OrbitControls(camera,renderer.domElement);
  controls.enableDamping=true;
  controls.dampingFactor=.1;
  controls.autoRotate=!matchMedia('(prefers-reduced-motion: reduce)').matches;
  controls.autoRotateSpeed=1.4;
  controls.minZoom=.25;controls.maxZoom=5;
  controls.addEventListener('start',()=>{controls.autoRotate=false;onRotateChange?.(false);});
  scene.add(new THREE.HemisphereLight('#ffffff','#9eafb5',2.6));
  const light=new THREE.DirectionalLight('#ffffff',3.1);light.position.set(-3200,6000,4800);scene.add(light);
  const fill=new THREE.DirectionalLight('#ccdce5',1.2);fill.position.set(4000,1600,-2800);scene.add(fill);
  const materials={
    beam:new THREE.MeshStandardMaterial({color:'#456d83',metalness:.28,roughness:.65}),
    tread:new THREE.MeshStandardMaterial({color:'#d7a14f',metalness:.25,roughness:.65}),
    rail:new THREE.MeshStandardMaterial({color:'#438675',metalness:.18,roughness:.65}),
    platform:new THREE.MeshStandardMaterial({color:'#c6ced0',roughness:.95,transparent:true,opacity:.55}),
  };
  const edgeMaterial=new THREE.LineBasicMaterial({color:'#26414c',transparent:true,opacity:.42});
  const dimensionMaterial=new THREE.LineBasicMaterial({color:'#3c7ba0',transparent:true,opacity:.8});
  let group=new THREE.Group(),model=null,annotations=[],labels=true,currentView='iso';
  scene.add(group);
  const labelLayer=document.createElement('div');labelLayer.className='model-labels';host.append(labelLayer);
  const leaders=document.createElementNS('http://www.w3.org/2000/svg','svg');leaders.classList.add('model-leaders');labelLayer.append(leaders);

  function mesh(geometry,material,edges=true) {
    const item=new THREE.Mesh(geometry,material);group.add(item);
    if(edges){const edge=new THREE.LineSegments(new THREE.EdgesGeometry(geometry,25),edgeMaterial);item.add(edge);}
    return item;
  }
  function prism(poly,z0,z1,material,edges=true) {
    const shape=new THREE.Shape(poly.map(p=>new THREE.Vector2(p.x,p.y)));
    const geometry=new THREE.ExtrudeGeometry(shape,{depth:z1-z0,bevelEnabled:false,curveSegments:4,steps:1});
    geometry.translate(0,0,z0);return mesh(geometry,material,edges);
  }
  function box(x,y,z,w,h,d,material,edges=true) {
    const geometry=new THREE.BoxGeometry(w,h,d);geometry.translate(x,y,z);return mesh(geometry,material,edges);
  }
  function ln(points) {
    const geometry=new THREE.BufferGeometry().setFromPoints(points.map(p=>new THREE.Vector3(...p)));
    const l=new THREE.Line(geometry,dimensionMaterial);group.add(l);return l;
  }
  function annotation(value,position,offset=[0,0]) {
    const element=document.createElement('span');element.className='model-label';element.textContent=value;
    const leader=document.createElementNS('http://www.w3.org/2000/svg','line');leaders.append(leader);
    labelLayer.append(element);annotations.push({element,leader,position:new THREE.Vector3(...position),offset});
  }
  // 四条真实管壁形成空心矩形管；端部切口不靠遮挡板模拟。
  function beamShell(z) {
    const {p,beam,c,s}=model,t=p.beamThickness,w=p.beamWidth,d=p.beamDepth,H=p.height,L=p.run;
    const [A,B,D,C]=beam.side;
    const a={x:t/s,y:0},b={x:(d-t)/s,y:0},c1={x:L,y:H-t/c},d1={x:L,y:H-(d-t)/c};
    prism(beam.side,z,z+t,materials.beam);
    prism(beam.side,z+w-t,z+w,materials.beam);
    prism([A,C,c1,a],z+t,z+w-t,materials.beam,false);
    prism([B,b,d1,D],z+t,z+w-t,materials.beam,false);
  }
  function railShell(z) {
    const {p,rail,c,slope}=model,t=p.railThickness,q=p.railSize;
    prism(rail.side,z-q/2,z-q/2+t,materials.rail);
    prism(rail.side,z+q/2-t,z+q/2,materials.rail);
    const [a,b,d,e]=rail.side;
    prism([a,b,{x:b.x,y:b.y+t/c},{x:a.x,y:a.y+t/c}],z-q/2+t,z+q/2-t,materials.rail,false);
    prism([e,d,{x:d.x,y:d.y-t/c},{x:e.x,y:e.y-t/c}],z-q/2+t,z+q/2-t,materials.rail,false);
    // 两端封板放在端口内侧，封板外表面与端口齐平。
    for(const x of [rail.x0,rail.x1-t]) {
      prism([{x,y:slope*x+rail.bottom},{x:x+t,y:slope*(x+t)+rail.bottom},{x:x+t,y:slope*(x+t)+rail.top},{x,y:slope*x+rail.top}],z-q/2,z+q/2,materials.rail,false);
    }
  }
  function postShell(post,z) {
    const {p,slope,rail}=model,q=p.railSize,t=p.railThickness;
    prism(post.side,z-q/2,z-q/2+t,materials.rail);
    prism(post.side,z+q/2-t,z+q/2,materials.rail);
    for(const x of [post.x0,post.x1-t]) {
      prism([{x,y:slope*x},{x:x+t,y:slope*(x+t)},{x:x+t,y:slope*(x+t)+rail.bottom},{x,y:slope*x+rail.bottom}],z-q/2+t,z+q/2-t,materials.rail,false);
    }
  }
  function tread(step) {
    const {p}=model,t=p.plateThickness,ro=p.bendRadius+t,ri=p.bendRadius;
    const x=step.x0,y=step.y,d=p.treadDepth,f=p.foldHeight;
    const shape=new THREE.Shape();
    shape.moveTo(x,y-f);shape.lineTo(x,y-ro);
    shape.absarc(x+ro,y-ro,ro,Math.PI,Math.PI/2,true);
    shape.lineTo(x+d-ro,y);
    shape.absarc(x+d-ro,y-ro,ro,Math.PI/2,0,true);
    shape.lineTo(x+d,y-f);shape.lineTo(x+d-t,y-f);shape.lineTo(x+d-t,y-ro);
    shape.absarc(x+d-ro,y-ro,ri,0,Math.PI/2,false);
    shape.lineTo(x+ro,y-t);
    shape.absarc(x+ro,y-ro,ri,Math.PI/2,Math.PI,false);
    shape.lineTo(x+t,y-f);shape.closePath();
    const geometry=new THREE.ExtrudeGeometry(shape,{depth:p.clearWidth,bevelEnabled:false,curveSegments:6,steps:1});
    geometry.translate(0,0,p.beamWidth);mesh(geometry,materials.tread);
    // 花纹凸起仅表现纹理，板厚仍以基板计算。
    const bumps=[];
    const side=7,spacing=45;
    for(let z=p.beamWidth+22;z<p.beamWidth+p.clearWidth-12;z+=spacing) {
      for(let xx=x+ro+8;xx<x+d-ro-5;xx+=32) {
        const centerZ=z+((Math.round((xx-x)/32)%2)*12);
        if(centerZ>p.beamWidth+p.clearWidth-10)continue;
        bumps.push([[xx-side,y+.35,centerZ],[xx,y+.35,centerZ+3],[xx+side,y+.35,centerZ],[xx,y+.35,centerZ-3],[xx-side,y+.35,centerZ]]);
      }
    }
    for(const points of bumps) {
      const geometry=new THREE.BufferGeometry().setFromPoints(points.map(v=>new THREE.Vector3(...v)));
      group.add(new THREE.Line(geometry,new THREE.LineBasicMaterial({color:'#8a642d',transparent:true,opacity:.45})));
    }
  }

  function setView(view='iso') {
    currentView=view;if(!model)return;
    const {p,width}=model;
    const target=new THREE.Vector3(p.run*.53,(p.height+p.railHeight)*.45,width*.5);
    controls.target.copy(target);
    const dirs={iso:[-1.5,.65,1.6],side:[0,0,1],front:[-1,0,0],back:[1,0,0],top:[0,1,.0001],rear:[1.5,.65,-1.6]};
    const d=new THREE.Vector3(...(dirs[view]||dirs.iso)).normalize();
    camera.up.set(0,1,0);if(view==='top')camera.up.set(1,0,0);
    camera.position.copy(target).addScaledVector(d,20000);camera.lookAt(target);
    const aspect=host.clientWidth/Math.max(1,host.clientHeight);
    const span=Math.max(p.height+p.railHeight,p.run,width+300)*1.25;
    const vertical=view==='top'?Math.max((p.run+600)*1.12,(width+450)/(aspect||1)):Math.max(span, (p.run+width+650)/(aspect||1));
    camera.top=vertical/2;camera.bottom=-vertical/2;camera.left=-vertical*aspect/2;camera.right=vertical*aspect/2;
    camera.zoom=1;camera.updateProjectionMatrix();controls.update();
  }
  function update(m) {
    model=m;scene.remove(group);
    group.traverse(o=>{o.geometry?.dispose();if(o.isLine&&o.material!==edgeMaterial&&o.material!==dimensionMaterial)o.material?.dispose();});
    group=new THREE.Group();scene.add(group);labelLayer.replaceChildren(leaders);leaders.replaceChildren();annotations=[];
    const {p,width,steps}=m;
    beamShell(0);beamShell(p.beamWidth+p.clearWidth);
    steps.forEach(tread);
    for(const z of [p.beamWidth/2,width-p.beamWidth/2]){railShell(z);m.posts.forEach(post=>postShell(post,z));}
    box(p.run+220,p.height-35,width/2,440,70,width+220,materials.platform);
    const grid=new THREE.GridHelper(Math.max(p.run*2,width*4,3000),20,'#b9cbd2','#d8e2e6');
    grid.position.set(p.run/2,-6,width/2);group.add(grid);
    const zz=width+110;
    ln([[p.run,0,zz],[p.run,p.height,zz],[p.run,p.height,width/2]]);
    ln([[0,-80,zz],[p.run,-80,zz]]);
    ln([[0,0,zz],[0,-110,zz]]);
    ln([[p.run,0,zz],[p.run,-110,zz]]);
    for(const y of [0,p.height])ln([[p.run-35,y,zz],[p.run+35,y,zz]]);
    annotation(`H ${fmt(p.height)} mm · 平台踩踏面`,[p.run,p.height/2,zz],[16,0]);
    annotation(`L ${fmt(p.run)} mm · 水平伸出`,[p.run/2,-80,zz],[0,16]);
    const mid=steps[Math.floor(steps.length/2)];
    annotation(`${mid.id} · 距地 ${fmt(mid.y)} mm`,[mid.cx,mid.y,p.beamWidth+p.clearWidth/2],[-130,-8]);
    const post=m.posts[Math.floor(m.posts.length/2)];
    annotation(`扶手高 ${p.railHeight} mm`,[post.x,m.slope*post.x+m.rail.top,width-p.beamWidth/2],[90,-30]);
    setView(currentView);
  }

  function resize(){renderer.setSize(host.clientWidth,host.clientHeight,false);setView(currentView);}
  new ResizeObserver(resize).observe(host);
  let last=performance.now();
  function animate(now) {
    requestAnimationFrame(animate);const elapsed=Math.min((now-last)/1000,.05);last=now;
    controls.update(elapsed);renderer.render(scene,camera);
    labelLayer.hidden=!labels;
    if(labels){
      const placed=[];
      for(const {element,leader,position,offset} of annotations){
        const q=position.clone().project(camera),ax=(q.x*.5+.5)*host.clientWidth,ay=(-q.y*.5+.5)*host.clientHeight;
        const hw=(element.offsetWidth||120)/2,hh=(element.offsetHeight||24)/2;
        const x=Math.max(hw+7,Math.min(host.clientWidth-hw-7,ax+offset[0]));
        const originalY=Math.max(65,Math.min(host.clientHeight-hh-7,ay+offset[1]));
        let y=originalY;
        for(const shift of [0,34,-34,68,-68,102,-102]){
          const trial=Math.max(65,Math.min(host.clientHeight-hh-7,originalY+shift));
          if(!placed.some(r=>Math.abs(x-r.x)<hw+r.hw+5&&Math.abs(trial-r.y)<hh+r.hh+5)){y=trial;break;}
        }
        placed.push({x,y,hw,hh});element.style.left=`${x}px`;element.style.top=`${y}px`;
        element.hidden=q.z>1||q.z< -1;leader.style.display=element.hidden?'none':'';
        const dx=ax-x,dy=ay-y,factor=Math.min(1,1/Math.max(Math.abs(dx)/hw,Math.abs(dy)/hh));
        for(const [key,value] of Object.entries({x1:ax,y1:ay,x2:x+dx*factor,y2:y+dy*factor}))leader.setAttribute(key,value);
      }
    }
  }
  requestAnimationFrame(animate);
  return {update,setView,
    rotate(value){controls.autoRotate=value;onRotateChange?.(value);},
    labels(value){labels=value;},
    image(scale=1){
      const ratio=renderer.getPixelRatio(),width=host.clientWidth,height=host.clientHeight;
      try{
        renderer.setPixelRatio(1);renderer.setSize(Math.round(width*scale),Math.round(height*scale),false);
        renderer.render(scene,camera);return renderer.domElement.toDataURL('image/png');
      }finally{renderer.setPixelRatio(ratio);renderer.setSize(width,height,false);}
    },
    inspect(){return {meshes:group.children.filter(x=>x.isMesh).length,rotation:controls.getAzimuthalAngle(),annotations:annotations.length};},
  };
}
