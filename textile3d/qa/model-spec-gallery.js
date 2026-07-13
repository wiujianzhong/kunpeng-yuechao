import * as THREE from 'three';
import {allPartModelSpecs} from '../data/model-specs/index.js';
import {jwf1206_0100_verified} from '../data/jwf1206-0100-verified.js';
import {jwf1206_pages_09_16_verified} from '../data/jwf1206-pages-09-16-verified.js';
import {jwf1206P17P26Verified} from '../data/jwf1206-p17-p26-verified.js';
import {jwf1206P27P37Verified} from '../data/jwf1206-p27-p37-verified.js';
import {jwf1206P38P49Verified} from '../data/jwf1206-p38-p49-verified.js';
import {jwf1206P50P61Verified} from '../data/jwf1206-p50-p61-verified.js';
import {jwf1206P62P73Verified} from '../data/jwf1206-p62-p73-verified.js';
import {jwf1124cP04Verified} from '../data/jwf1124c-p04-verified.js';
import {jwf1124cP06Verified} from '../data/jwf1124c-p06-verified.js';
import {jwf1124cP08Verified} from '../data/jwf1124c-p08-verified.js';
import {jwf1124cP09Verified} from '../data/jwf1124c-p09-verified.js';
import {jwf1124cP12Verified} from '../data/jwf1124c-p12-verified.js';
import {jwf1124cP13P14Verified} from '../data/jwf1124c-p13-p14-verified.js';
import {jwf1124cP16Verified} from '../data/jwf1124c-p16-verified.js';
import {jwf1124cP18Verified} from '../data/jwf1124c-p18-verified.js';
import {jwf1124cP20Verified} from '../data/jwf1124c-p20-verified.js';
import {jwf1124cP22Verified} from '../data/jwf1124c-p22-verified.js';
import {jwf1102P05Verified} from '../data/jwf1102-p05-verified.js';
import {jwf1102P08P09Verified} from '../data/jwf1102-p08-p09-verified.js';
import {jwf1102P11P12Verified} from '../data/jwf1102-p11-p12-verified.js';
import {jwf1102P14Verified} from '../data/jwf1102-p14-verified.js';
import {fa103bP04Verified} from '../data/fa103b-p04-verified.js';
import {fa103bP06P07Verified} from '../data/fa103b-p06-p07-verified.js';
import {fa103bP09Verified} from '../data/fa103b-p09-verified.js';
import {fa103bP11Verified} from '../data/fa103b-p11-verified.js';
import {zfa051aP03P06Verified} from '../data/zfa051a-p03-p06-verified.js';
import {zfa051aP07P12Verified} from '../data/zfa051a-p07-p12-verified.js';
import {jwf1026P03P10Verified} from '../data/jwf1026-p03-p10-verified.js';
import {jwf1026P11P18Verified} from '../data/jwf1026-p11-p18-verified.js';
import {jwf1026P19P25Verified} from '../data/jwf1026-p19-p25-verified.js';
import {jwf1012P04P15Verified} from '../data/jwf1012-p04-p15-verified.js';
import {jwf1012P16P25Verified} from '../data/jwf1012-p16-p25-verified.js';
import {jwf1012P26P33Verified} from '../data/jwf1012-p26-p33-verified.js';
import {tf2513P03P12Verified} from '../data/tf2513-p03-p12-verified.js';
import {tf2513P14P23Verified} from '../data/tf2513-p14-p23-verified.js';
import {tf2513P25P37Verified} from '../data/tf2513-p25-p37-verified.js';
import {createSpecModel} from '../models/spec-models.js';

const params=new URLSearchParams(location.search);
const manual=params.get('manual')||'jwf1206';
const page=Number(params.get('page'))||0;
const partDataByManual={
  jwf1206:[...jwf1206_0100_verified,...jwf1206_pages_09_16_verified,...jwf1206P17P26Verified,...jwf1206P27P37Verified,...jwf1206P38P49Verified,...jwf1206P50P61Verified,...jwf1206P62P73Verified],
  jwf1124c:[...jwf1124cP04Verified,...jwf1124cP06Verified,...jwf1124cP08Verified,...jwf1124cP09Verified,...jwf1124cP12Verified,...jwf1124cP13P14Verified,...jwf1124cP16Verified,...jwf1124cP18Verified,...jwf1124cP20Verified,...jwf1124cP22Verified],
  jwf1102:[...jwf1102P05Verified,...jwf1102P08P09Verified,...jwf1102P11P12Verified,...jwf1102P14Verified],
  fa103b:[...fa103bP04Verified,...fa103bP06P07Verified,...fa103bP09Verified,...fa103bP11Verified],
  zfa051a:[...zfa051aP03P06Verified,...zfa051aP07P12Verified],
  jwf1026:[...jwf1026P03P10Verified,...jwf1026P11P18Verified,...jwf1026P19P25Verified],
  jwf1012:[...jwf1012P04P15Verified,...jwf1012P16P25Verified,...jwf1012P26P33Verified],
  tf2513:[...tf2513P03P12Verified,...tf2513P14P23Verified,...tf2513P25P37Verified],
};
const partData=partDataByManual[manual]||[];
const specs=Object.entries(allPartModelSpecs[manual]||{}).filter(([code,spec])=>!page||spec.source.page===page);
const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,preserveDrawingBuffer:true});
renderer.setPixelRatio(1);renderer.setSize(560,360,false);renderer.outputColorSpace=THREE.SRGBColorSpace;
const scene=new THREE.Scene();
scene.add(new THREE.HemisphereLight(0xeafff8,0x526b68,2.7));
scene.add(new THREE.AmbientLight(0xffffff,.58));
const key=new THREE.DirectionalLight(0xffffff,4);key.position.set(4,7,5);scene.add(key);
const rim=new THREE.DirectionalLight(0x6fffd5,2);rim.position.set(-5,2,-4);scene.add(rim);
const lower=new THREE.DirectionalLight(0xd9fff5,1.8);lower.position.set(1,-6,4);scene.add(lower);
const camera=new THREE.PerspectiveCamera(35,560/360,.1,100);camera.position.set(4.8,3.3,5.4);camera.lookAt(0,0,0);

function dispose(model){model.traverse(object=>{object.geometry?.dispose?.();if(Array.isArray(object.material))object.material.forEach(item=>item.dispose?.());else object.material?.dispose?.()})}
function renderSpec(spec){
  const model=createSpecModel(spec);model.rotation.set(-.08,.52,0);scene.add(model);renderer.render(scene,camera);
  const image=renderer.domElement.toDataURL('image/webp',.9);scene.remove(model);dispose(model);return image;
}

const gallery=document.querySelector('#gallery');
for(const [code,spec] of specs){
  const part=partData.find(item=>item.code===code||item.recordKey===code);
  const card=document.createElement('article');card.className='card';
  card.innerHTML=`<div class="title"><strong>${part?.code||code} · ${part?.name||''}</strong><span>${spec.level}</span></div><div class="compare"><img class="model" alt="${part?.code||code} 3D"><img class="source" src="../${part?.sourceCrop||''}" alt="${part?.code||code} 厂家原格"></div><p class="note">${spec.source.assumptions.join('；')}</p>`;
  card.querySelector('.model').src=renderSpec(spec);gallery.append(card);
}
document.querySelector('#summary').textContent=`${manual} · ${page?`第${page}页 · `:''}${specs.length}件对照`;
renderer.dispose();renderer.forceContextLoss();
