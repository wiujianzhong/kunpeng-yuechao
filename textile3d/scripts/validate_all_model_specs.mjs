#!/usr/bin/env node

import {spawnSync} from 'node:child_process';
import {allPartModelSpecs} from '../data/model-specs/index.js';

const pad=page=>String(page).padStart(2,'0');
const range=(from,to)=>Array.from({length:to-from+1},(_,index)=>from+index);

const jobs=[];
const addPages=(manual,pages,audit)=>pages.forEach(page=>jobs.push({manual,page,audit}));

addPages('jwf1206',range(4,8),'data/audits/jwf1206-0100.json');
addPages('jwf1206',range(9,16),'data/audits/jwf1206-pages-09-16.json');
addPages('jwf1206',range(17,26),'data/audits/jwf1206-p17-p26.json');
addPages('jwf1206',range(27,37),'data/audits/jwf1206-p27-p37.json');
addPages('jwf1206',range(38,49),'data/audits/jwf1206-p38-p49.json');
addPages('jwf1206',range(50,61),'data/audits/jwf1206-p50-p61.json');
addPages('jwf1206',range(62,73),'data/audits/jwf1206-p62-p73.json');

addPages('tf2513',[3,5,6,8,9,11,12],'data/audits/tf2513-p02-p12.json');
addPages('tf2513',[14,15,16,18,19,20,22,23],'data/audits/tf2513-p13-p23.json');
addPages('tf2513',[25,26,28,30,31,32,34,35,37],'data/audits/tf2513-p24-p37.json');

for(const {manual,page,audit} of jobs){
  const pageText=pad(page);
  const args=[
    'scripts/validate_model_specs.mjs',
    `data/model-specs/${manual}-p${pageText}.js`,
    `${manual}P${pageText}ModelSpecs`,
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

const expectedCounts={
  jwf1206:717,
  jwf1124c:382,
  jwf1102:209,
  fa103b:170,
  zfa051a:104,
  jwf1026:247,
  jwf1012:294,
  tf2513:393
};

for(const [manual,expected] of Object.entries(expectedCounts)){
  const actual=Object.keys(allPartModelSpecs[manual]||{}).length;
  if(actual!==expected)throw new Error(`${manual}整体覆盖不一致：应有${expected}件，实际${actual}件`);
}

const total=Object.values(expectedCounts).reduce((sum,count)=>sum+count,0);
console.log(`全部${total}件3D规格数量与逐页审计覆盖一致，且无重复键。`);
