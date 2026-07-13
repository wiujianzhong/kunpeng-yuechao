#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';

const [modulePath,exportName,pageText,auditPath]=process.argv.slice(2);
if(!modulePath||!exportName||!pageText||!auditPath){
  throw new Error('用法：node scripts/validate_model_specs.mjs 规格.js 导出名 页码 审计.json');
}

const page=Number(pageText);
const audit=JSON.parse(fs.readFileSync(auditPath,'utf8'));
const auditParts=audit.parts||audit.records;
if(!Array.isArray(auditParts))throw new Error('审计文件缺少parts或records数组');
const pageParts=auditParts.filter(part=>(part.pdfPage??part.page)===page&&(part.code||part.recordKey||part.item));
const codeCounts=new Map();
pageParts.forEach(part=>{if(part.code)codeCounts.set(part.code,(codeCounts.get(part.code)||0)+1)});
const recordKeyFor=part=>part.recordKey||(audit.manualId&&part.item?`${audit.manualId}-p${String(page).padStart(2,'0')}-item-${String(part.item).padStart(2,'0')}`:null);
const partKey=part=>!part.code||codeCounts.get(part.code)>1?recordKeyFor(part)||part.code:part.code;
const expected=pageParts.filter(part=>partKey(part));
const module=await import(pathToFileURL(path.resolve(modulePath)).href);
const specs=module[exportName];
if(!specs||typeof specs!=='object'||Array.isArray(specs))throw new Error(`未找到导出对象：${exportName}`);

const actualCodes=Object.keys(specs).sort();
const expectedKey=part=>specs[recordKeyFor(part)]?recordKeyFor(part):partKey(part);
const expectedCodes=expected.map(expectedKey).sort();
if(JSON.stringify(actualCodes)!==JSON.stringify(expectedCodes)){
  const missing=expectedCodes.filter(code=>!actualCodes.includes(code));
  const extra=actualCodes.filter(code=>!expectedCodes.includes(code));
  throw new Error(`覆盖不一致：缺少 ${missing.join(',')||'无'}；多出 ${extra.join(',')||'无'}`);
}

const allowedLevels=new Set(['轮廓级','尺寸级']);
const allowedMaterials=new Set(['paintedMetal','metal','darkMetal','rubber','plastic','glass','brass']);
const allowedKinds=new Set(['box','extrude','cylinder','lathe','torus','tube','dualInletDuct','loft']);
const failures=[];
const finite=value=>typeof value==='number'&&Number.isFinite(value);
const vector=(value,length)=>Array.isArray(value)&&value.length===length&&value.every(finite);
const positive=value=>finite(value)&&value>0;

function validatePrimitive(code,primitive,index){
  const label=`${code} primitives[${index}]`;
  const kind=primitive.kind||primitive.type;
  if(!allowedKinds.has(kind)){failures.push(`${label}图元类型不支持`);return}
  if(primitive.position&&!vector(primitive.position,3))failures.push(`${label}.position必须是3个有限数`);
  if(primitive.rotation&&!vector(primitive.rotation,3))failures.push(`${label}.rotation必须是3个有限数`);
  if(primitive.material&&!allowedMaterials.has(primitive.material))failures.push(`${label}.material不合法`);
  if(kind==='box'&&(!vector(primitive.size,3)||primitive.size.some(value=>value<=0)))failures.push(`${label}.size必须是3个正数`);
  if(kind==='extrude'){
    if(!positive(primitive.depth))failures.push(`${label}.depth必须为正数`);
    if(!Array.isArray(primitive.points)||primitive.points.length<3||primitive.points.some(point=>!vector(point,2)))failures.push(`${label}.points轮廓无效`);
    for(const hole of primitive.holes||[]){
      if(hole.kind==='circle'&&(!vector(hole.center,2)||!positive(hole.radius)))failures.push(`${label}圆孔无效`);
      else if(hole.kind==='polygon'&&(!Array.isArray(hole.points)||hole.points.length<3||hole.points.some(point=>!vector(point,2))))failures.push(`${label}多边形孔无效`);
      else if(!['circle','polygon'].includes(hole.kind))failures.push(`${label}孔类型不支持`);
    }
  }
  if(kind==='cylinder'){
    if(!positive(primitive.length))failures.push(`${label}.length必须为正数`);
    if(!positive(primitive.radius)&&(!positive(primitive.radiusTop)||!positive(primitive.radiusBottom)))failures.push(`${label}缺少合法半径`);
    if(!['x','y','z'].includes(primitive.axis||'y'))failures.push(`${label}.axis不合法`);
  }
  if(kind==='lathe'&&(!Array.isArray(primitive.points)||primitive.points.length<2||primitive.points.some(point=>!vector(point,2)||point[0]<0)))failures.push(`${label}.points回转轮廓无效`);
  if(kind==='torus'&&(!positive(primitive.radius)||!positive(primitive.tube)))failures.push(`${label}环体半径无效`);
  if(kind==='tube'&&(!Array.isArray(primitive.points)||primitive.points.length<2||primitive.points.some(point=>!vector(point,3))||!positive(primitive.radius)))failures.push(`${label}管线数据无效`);
  if(kind==='loft'){
    const sections=primitive.sections;
    const count=Array.isArray(sections)&&sections.length>1&&Array.isArray(sections[0].points)?sections[0].points.length:0;
    if(!Array.isArray(sections)||sections.length<2||count<3||sections.some(section=>!finite(section.x)||!Array.isArray(section.points)||section.points.length!==count||section.points.some(point=>!vector(point,2))))failures.push(`${label}放样截面无效`);
  }
  if(kind==='dualInletDuct'){
    for(const key of ['inletStartX','transitionStartX','transitionEndX','outletEndX','inletCenterOffset','inletRadius','outletRadius','thickness']){
      if(!finite(primitive[key]))failures.push(`${label}.${key}必须是有限数`);
    }
    if(!(primitive.inletStartX<primitive.transitionStartX&&primitive.transitionStartX<primitive.transitionEndX&&primitive.transitionEndX<primitive.outletEndX))failures.push(`${label}轴向节点顺序无效`);
    if(!positive(primitive.inletCenterOffset)||!positive(primitive.inletRadius)||!positive(primitive.outletRadius)||!positive(primitive.thickness)||primitive.thickness>=Math.min(primitive.inletRadius,primitive.outletRadius))failures.push(`${label}双入口风道尺寸无效`);
  }
}

for(const part of expected){
  const key=expectedKey(part);
  const spec=specs[key];
  if(!allowedLevels.has(spec.level))failures.push(`${key}.level不合法`);
  if(!allowedMaterials.has(spec.material))failures.push(`${key}.material不合法`);
  if(spec.source?.page!==page)failures.push(`${key}.source.page不一致`);
  const dimensionNumbers=value=>(value||[]).flatMap(item=>String(item).match(/\d+(?:\.\d+)?/g)||[]);
  const expectedDims=dimensionNumbers(part.dimensions??part.dims).sort((a,b)=>Number(a)-Number(b));
  const actualDims=dimensionNumbers(spec.source?.dimensions).sort((a,b)=>Number(a)-Number(b));
  if(JSON.stringify(actualDims)!==JSON.stringify(expectedDims))failures.push(`${key}.source.dimensions与厂家尺寸数值不一致`);
  if(!Array.isArray(spec.source?.views)||!spec.source.views.length)failures.push(`${key}.source.views为空`);
  if(!Array.isArray(spec.source?.assumptions))failures.push(`${key}.source.assumptions必须是数组`);
  if(!Array.isArray(spec.primitives)||!spec.primitives.length)failures.push(`${key}.primitives为空`);
  else spec.primitives.forEach((primitive,index)=>validatePrimitive(key,primitive,index));
}

if(failures.length)throw new Error(`3D规格验证失败：\n${failures.join('\n')}`);
const dimensionLevel=Object.values(specs).filter(spec=>spec.level==='尺寸级').length;
console.log(`验证通过：第${page}页 ${actualCodes.length}件3D规格，其中尺寸级${dimensionLevel}件。`);
