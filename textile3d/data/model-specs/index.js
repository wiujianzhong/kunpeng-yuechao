import {jwf1206P04ModelSpecs} from './jwf1206-p04.js';
import {jwf1206P05ModelSpecs} from './jwf1206-p05.js';
import {jwf1206P06ModelSpecs} from './jwf1206-p06.js';
import {jwf1206P07ModelSpecs} from './jwf1206-p07.js';
import {jwf1206P08ModelSpecs} from './jwf1206-p08.js';
import {jwf1206P09ModelSpecs} from './jwf1206-p09.js';
import {jwf1206P10ModelSpecs} from './jwf1206-p10.js';
import {jwf1206P11ModelSpecs} from './jwf1206-p11.js';
import {jwf1206P12ModelSpecs} from './jwf1206-p12.js';
import {jwf1206P13ModelSpecs} from './jwf1206-p13.js';
import {jwf1206P14ModelSpecs} from './jwf1206-p14.js';
import {jwf1206P15ModelSpecs} from './jwf1206-p15.js';
import {jwf1206P16ModelSpecs} from './jwf1206-p16.js';
import {jwf1124cP06ModelSpecs} from './jwf1124c-p06.js';
import {jwf1124cP09ModelSpecs} from './jwf1124c-p09.js';
import {jwf1124cP04ModelSpecs} from './jwf1124c-p04.js';
import {jwf1124cP08ModelSpecs} from './jwf1124c-p08.js';

function keyedByRecord(specs,manual,page){
  return Object.values(specs).reduce((result,spec,index)=>{
    const item=spec.source?.item??index+1;
    const recordKey=spec.recordKey||spec.source?.recordKey||`${manual}-p${String(page).padStart(2,'0')}-item-${String(item).padStart(2,'0')}`;
    result[recordKey]=spec;return result;
  },{});
}

const specsByManual={
  jwf1206:{
    ...jwf1206P04ModelSpecs,
    ...jwf1206P05ModelSpecs,
    ...jwf1206P06ModelSpecs,
    ...jwf1206P07ModelSpecs,
    ...jwf1206P08ModelSpecs,
    ...jwf1206P09ModelSpecs,
    ...jwf1206P10ModelSpecs,
    ...jwf1206P11ModelSpecs,
    ...jwf1206P12ModelSpecs,
    ...jwf1206P13ModelSpecs,
    ...jwf1206P14ModelSpecs,
    ...jwf1206P15ModelSpecs,
    ...jwf1206P16ModelSpecs
  },
  jwf1124c:{
    ...keyedByRecord(jwf1124cP04ModelSpecs,'jwf1124c',4),
    ...keyedByRecord(jwf1124cP06ModelSpecs,'jwf1124c',6),
    ...keyedByRecord(jwf1124cP08ModelSpecs,'jwf1124c',8),
    ...keyedByRecord(jwf1124cP09ModelSpecs,'jwf1124c',9)
  }
};
const keepExistingCustomModel=new Set(['jwf1206:JWF1204-0100-10']);

export function getPartModelSpec(manual,code,recordKey,page){
  if(recordKey&&specsByManual[manual]?.[recordKey])return specsByManual[manual][recordKey];
  if(!code||keepExistingCustomModel.has(`${manual}:${code}`))return null;
  const spec=specsByManual[manual]?.[code]||null;
  return spec&&page!=null&&spec.source?.page!==page?null:spec;
}
export const allPartModelSpecs=specsByManual;
export const modelSpecCount=Object.values(specsByManual).reduce((total,specs)=>total+Object.keys(specs).length,0);
