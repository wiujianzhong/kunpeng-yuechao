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
  }
};
const keepExistingCustomModel=new Set(['jwf1206:JWF1204-0100-10']);

export function getPartModelSpec(manual,code){
  if(!code||keepExistingCustomModel.has(`${manual}:${code}`))return null;
  return specsByManual[manual]?.[code]||null;
}
export const allPartModelSpecs=specsByManual;
export const modelSpecCount=Object.values(specsByManual).reduce((total,specs)=>total+Object.keys(specs).length,0);
