#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import {jwf1206_0100_verified} from '../data/jwf1206-0100-verified.js';
import {jwf1206_pages_09_16_verified} from '../data/jwf1206-pages-09-16-verified.js';
import {jwf1206P17P26Verified} from '../data/jwf1206-p17-p26-verified.js';
import {jwf1206P27P37Verified} from '../data/jwf1206-p27-p37-verified.js';
import {jwf1206P38P49Verified} from '../data/jwf1206-p38-p49-verified.js';
import {jwf1206P50P61Verified} from '../data/jwf1206-p50-p61-verified.js';
import {jwf1206P62P73Verified} from '../data/jwf1206-p62-p73-verified.js';

const allowPartial=process.argv.includes('--partial');
const pad=value=>String(value).padStart(2,'0');
const all=[...jwf1206_0100_verified,...jwf1206_pages_09_16_verified,...jwf1206P17P26Verified,...jwf1206P27P37Verified,...jwf1206P38P49Verified,...jwf1206P50P61Verified,...jwf1206P62P73Verified];
const pageCounters=new Map();
const expected=new Map(all.map(part=>{
  const item=part.item??(pageCounters.set(part.page,(pageCounters.get(part.page)||0)+1),pageCounters.get(part.page));
  const recordKey=part.recordKey||`jwf1206-p${pad(part.page)}-item-${String(item).padStart(3,'0')}`;
  return[recordKey,part];
}));
if(expected.size!==717)throw new Error(`JWF1206期望717件，实际唯一recordKey为${expected.size}件`);

const auditDir=path.resolve('data/audits');
const files=fs.readdirSync(auditDir).filter(name=>/^jwf1206-overlay-p\d+\.json$/.test(name)).sort();
const records=[];
for(const name of files){
  const audit=JSON.parse(fs.readFileSync(path.join(auditDir,name),'utf8'));
  const items=audit.records||audit.parts;
  if(!Array.isArray(items))throw new Error(`${name}缺少records/parts数组`);
  const declared=audit.recordCount??items.length;
  if(declared!==items.length)throw new Error(`${name}声明${declared}件，实际${items.length}件`);
  records.push(...items.map(item=>({...item,__file:name})));
}

const seen=new Map(),failures=[];
for(const item of records){
  if(!item.recordKey){failures.push(`${item.__file}有记录缺recordKey`);continue}
  if(seen.has(item.recordKey))failures.push(`${item.recordKey}在${seen.get(item.recordKey)}与${item.__file}重复`);
  seen.set(item.recordKey,item.__file);
  if(!expected.has(item.recordKey))failures.push(`${item.recordKey}不在JWF1206的717件清单中`);
  for(const key of ['code','material','verdict'])if(!String(item[key]||'').trim())failures.push(`${item.recordKey}.${key}为空`);
  for(const key of ['views','excludedLines'])if(!Array.isArray(item[key])||!item[key].length)failures.push(`${item.recordKey}.${key}为空`);
  const evidence=Array.isArray(item.evidence)?item.evidence:[item.evidence];
  if(!evidence.filter(Boolean).length)failures.push(`${item.recordKey}.evidence为空`);
}
const missing=[...expected.keys()].filter(key=>!seen.has(key));
const unresolved=records.filter(item=>
  item.passed===false||
  !/\u901a\u8fc7/.test(item.verdict||'')||
  /\u5f85|\u9700\u91cd\u5efa|\u8fc7\u7b80|\u4e0d\u901a\u8fc7|\u672a\u901a\u8fc7/.test(item.verdict||'')
);
if(!allowPartial){
  if(missing.length)failures.push(`缺少${missing.length}件正交叠合审计`);
  if(unresolved.length)failures.push(`${unresolved.length}件审计尚未判定通过`);
}
if(failures.length)throw new Error(`JWF1206正交叠合审计失败：\n${failures.join('\n')}`);
console.log(`JWF1206正交叠合审计：已登记${seen.size}/717件，通过${records.length-unresolved.length}件，待闭环${unresolved.length}件，未审计${missing.length}件。`);
