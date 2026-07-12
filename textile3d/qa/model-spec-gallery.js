import * as THREE from 'three';
import {allPartModelSpecs} from '../data/model-specs/index.js';
import {jwf1206_0100_verified} from '../data/jwf1206-0100-verified.js';
import {jwf1206_pages_09_16_verified} from '../data/jwf1206-pages-09-16-verified.js';
import {createSpecModel} from '../models/spec-models.js';

const page=Number(new URLSearchParams(location.search).get('page'))||0;
const partData=[...jwf1206_0100_verified,...jwf1206_pages_09_16_verified];
const specs=Object.entries(allPartModelSpecs.jwf1206).filter(([code,spec])=>!page||spec.source.page===page);
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
  const part=partData.find(item=>(item.code||item.recordKey)===code);
  const card=document.createElement('article');card.className='card';
  card.innerHTML=`<div class="title"><strong>${code} · ${part?.name||''}</strong><span>${spec.level}</span></div><div class="compare"><img class="model" alt="${code} 3D"><img class="source" src="../${part?.sourceCrop||''}" alt="${code} 厂家原格"></div><p class="note">${spec.source.assumptions.join('；')}</p>`;
  card.querySelector('.model').src=renderSpec(spec);gallery.append(card);
}
document.querySelector('#summary').textContent=`${page?`第${page}页 · `:''}${specs.length}件对照`;
renderer.dispose();renderer.forceContextLoss();
