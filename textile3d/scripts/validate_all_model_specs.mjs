#!/usr/bin/env node

import fs from 'node:fs';
import {spawnSync} from 'node:child_process';
import {allPartModelSpecs} from '../data/model-specs/index.js';

const pages=Array.from({length:13},(_,index)=>index+4);
for(const page of pages){
  const pageText=String(page).padStart(2,'0');
  const audit=page<=8?'data/audits/jwf1206-0100.json':'data/audits/jwf1206-pages-09-16.json';
  const args=[
    'scripts/validate_model_specs.mjs',
    `data/model-specs/jwf1206-p${pageText}.js`,
    `jwf1206P${pageText}ModelSpecs`,
    String(page),
    audit
  ];
  const result=spawnSync(process.execPath,args,{encoding:'utf8'});
  if(result.status!==0){
    process.stderr.write(result.stderr||result.stdout);
    process.exit(result.status||1);
  }
  process.stdout.write(result.stdout);
}

const auditedParts=[
  ...JSON.parse(fs.readFileSync('data/audits/jwf1206-0100.json','utf8')).parts,
  ...JSON.parse(fs.readFileSync('data/audits/jwf1206-pages-09-16.json','utf8')).parts
].filter(part=>part.pdfPage>=4&&part.pdfPage<=16);
const expected=auditedParts.map(part=>part.code||part.recordKey).sort();
const actual=Object.keys(allPartModelSpecs.jwf1206||{}).sort();
if(JSON.stringify(actual)!==JSON.stringify(expected)||actual.length!==157){
  throw new Error(`JWF1206整体覆盖不一致：应有157件，实际${actual.length}件`);
}
console.log('JWF1206第4—16页157件3D规格全部覆盖，且无重复键。');
