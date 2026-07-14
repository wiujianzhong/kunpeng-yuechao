import {manuals,parts as coreParts} from './parts.js?v=20260713-9';
import {jwf1206Parts09to30} from './jwf1206-pages-09-30.js?v=20260713-9';
import {jwf1206_pages_09_16_verified} from './jwf1206-pages-09-16-verified.js?v=20260714-03';
import {jwf1206P17P26Verified} from './jwf1206-p17-p26-verified.js?v=20260713-29';
import {jwf1206P27P37Verified} from './jwf1206-p27-p37-verified.js?v=20260713-29';
import {jwf1206P38P49Verified} from './jwf1206-p38-p49-verified.js?v=20260714-03';
import {jwf1206P50P61Verified} from './jwf1206-p50-p61-verified.js?v=20260713-29';
import {jwf1206P62P73Verified} from './jwf1206-p62-p73-verified.js?v=20260713-29';
import {jwf1206Parts31to50} from './jwf1206-pages-31-50.js?v=20260713-9';
import {jwf1206Parts51to73} from './jwf1206-pages-51-73.js?v=20260713-9';
import {zfa051aParts} from './zfa051a-parts.js?v=20260713-9';
import {zfa051aP03P06Verified} from './zfa051a-p03-p06-verified.js?v=20260713-29';
import {zfa051aP07P12Verified} from './zfa051a-p07-p12-verified.js?v=20260713-29';
import {jwf1026Parts} from './jwf1026-parts.js?v=20260713-9';
import {jwf1026P03P10Verified} from './jwf1026-p03-p10-verified.js?v=20260713-29';
import {jwf1026P11P18Verified} from './jwf1026-p11-p18-verified.js?v=20260713-29';
import {jwf1026P19P25Verified} from './jwf1026-p19-p25-verified.js?v=20260713-29';
import {jwf1124cParts} from './jwf1124c-parts.js?v=20260713-9';
import {jwf1124cP04Verified} from './jwf1124c-p04-verified.js?v=20260713-29';
import {jwf1124cP06Verified} from './jwf1124c-p06-verified.js?v=20260713-29';
import {jwf1124cP08Verified} from './jwf1124c-p08-verified.js?v=20260713-29';
import {jwf1124cP09Verified} from './jwf1124c-p09-verified.js?v=20260713-29';
import {jwf1124cP12Verified} from './jwf1124c-p12-verified.js?v=20260713-29';
import {jwf1124cP13P14Verified} from './jwf1124c-p13-p14-verified.js?v=20260713-29';
import {jwf1124cP16Verified} from './jwf1124c-p16-verified.js?v=20260713-29';
import {jwf1124cP18Verified} from './jwf1124c-p18-verified.js?v=20260713-29';
import {jwf1124cP20Verified} from './jwf1124c-p20-verified.js?v=20260713-29';
import {jwf1124cP22Verified} from './jwf1124c-p22-verified.js?v=20260713-29';
import {jwf1012Parts} from './jwf1012-parts.js?v=20260713-9';
import {jwf1012P04P15Verified} from './jwf1012-p04-p15-verified.js?v=20260713-29';
import {jwf1012P16P25Verified} from './jwf1012-p16-p25-verified.js?v=20260713-29';
import {jwf1012P26P33Verified} from './jwf1012-p26-p33-verified.js?v=20260713-29';
import {tf2513Parts} from './tf2513-parts.js?v=20260713-31';
import {tf2513P03P12Verified} from './tf2513-p03-p12-verified.js?v=20260713-31';
import {tf2513P14P23Verified} from './tf2513-p14-p23-verified.js?v=20260713-31';
import {tf2513P25P37Verified} from './tf2513-p25-p37-verified.js?v=20260713-31';
import {fa103bParts} from './fa103b-parts.js?v=20260713-9';
import {fa103bP04Verified} from './fa103b-p04-verified.js?v=20260713-29';
import {fa103bP06P07Verified} from './fa103b-p06-p07-verified.js?v=20260713-29';
import {fa103bP09Verified} from './fa103b-p09-verified.js?v=20260713-29';
import {fa103bP11Verified} from './fa103b-p11-verified.js?v=20260713-29';
import {jwf1102Parts} from './jwf1102-parts.js?v=20260713-9';
import {jwf1102P05Verified} from './jwf1102-p05-verified.js?v=20260713-29';
import {jwf1102P08P09Verified} from './jwf1102-p08-p09-verified.js?v=20260713-29';
import {jwf1102P11P12Verified} from './jwf1102-p11-p12-verified.js?v=20260713-29';
import {jwf1102P14Verified} from './jwf1102-p14-verified.js?v=20260713-29';
import {jwf1206_0100_verified} from './jwf1206-0100-verified.js?v=20260713-9';

function mergePage(source,page,verified,label){
  const pageParts=source.filter(part=>part.page===page);
  if(pageParts.length!==verified.length)throw new Error(`${label}零件数量不一致`);
  let index=0;
  return source.map(part=>part.page===page?{...part,...verified[index++]}:part);
}
function mergePages(source,pages,verified,label){
  return pages.reduce((result,page)=>mergePage(result,page,verified.filter(part=>part.page===page),`${label}第${page}页`),source);
}

const p09to30=mergePages(
  jwf1206Parts09to30,
  [...new Set(jwf1206_pages_09_16_verified.map(part=>part.page))],
  jwf1206_pages_09_16_verified,'JWF1206'
);
const p09to30with17=mergePages(p09to30,[17,18,19,20,21,22,23,24,25,26],jwf1206P17P26Verified,'JWF1206');
const p09to30full=mergePages(p09to30with17,[27,28,29,30],jwf1206P27P37Verified,'JWF1206');
const p31to50=mergePages(jwf1206Parts31to50,[31,32,33,34,35,36,37],jwf1206P27P37Verified,'JWF1206');
const p31to50verified=mergePages(p31to50,[38,39,40,41,42,43,44,45,46,47,48,49],jwf1206P38P49Verified,'JWF1206');
const p31to50full=mergePage(p31to50verified,50,jwf1206P50P61Verified.filter(part=>part.page===50),'JWF1206第50页');
const p51to73=mergePages(jwf1206Parts51to73,[51,52,53,54,55,56,57,58,59,60,61],jwf1206P50P61Verified,'JWF1206');
const p51to73full=mergePages(p51to73,[62,63,64,65,66,67,68,69,70,71,72,73],jwf1206P62P73Verified,'JWF1206');

const jwf1124cVerified=mergePages(jwf1124cParts,[4,6,8,9,12,13,14,16,18,20,22],[
  ...jwf1124cP04Verified,...jwf1124cP06Verified,...jwf1124cP08Verified,...jwf1124cP09Verified,...jwf1124cP12Verified,...jwf1124cP13P14Verified,...jwf1124cP16Verified,...jwf1124cP18Verified,...jwf1124cP20Verified,...jwf1124cP22Verified
],'JWF1124C');
const jwf1102Verified=mergePages(jwf1102Parts,[5,8,9,11,12,14],[...jwf1102P05Verified,...jwf1102P08P09Verified,...jwf1102P11P12Verified,...jwf1102P14Verified],'JWF1102');
const fa103bVerified=mergePages(fa103bParts,[4,6,7,9,11],[...fa103bP04Verified,...fa103bP06P07Verified,...fa103bP09Verified,...fa103bP11Verified],'FA103B');
const zfaVerified=mergePages(zfa051aParts,[3,4,5,6,7,8,9,10,11,12],[...zfa051aP03P06Verified,...zfa051aP07P12Verified],'ZFA051A');
const jwf1026Verified=mergePages(jwf1026Parts,[3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25],[...jwf1026P03P10Verified,...jwf1026P11P18Verified,...jwf1026P19P25Verified],'JWF1026');
const jwf1012Verified=mergePages(jwf1012Parts,[4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33],[...jwf1012P04P15Verified,...jwf1012P16P25Verified,...jwf1012P26P33Verified],'JWF1012');
const tf2513Verified=mergePages(tf2513Parts,[3,5,6,8,9,11,12,14,15,16,18,19,20,22,23,25,26,28,30,31,32,34,35,37],[...tf2513P03P12Verified,...tf2513P14P23Verified,...tf2513P25P37Verified],'TF2513');

const all=[...coreParts,...p09to30full,...p31to50full,...p51to73full,...zfaVerified,...jwf1026Verified,...jwf1124cVerified,...jwf1012Verified,...tf2513Verified,...fa103bVerified,...jwf1102Verified];
const seen=new Map();
export const parts=all.map((part,index)=>{
  const base=part.recordKey||`${part.manual}-p${String(part.page).padStart(2,'0')}-item-${String((seen.get(`${part.manual}-${part.page}`)||0)+1).padStart(3,'0')}`;
  seen.set(`${part.manual}-${part.page}`,(seen.get(`${part.manual}-${part.page}`)||0)+1);
  return {...part,recordKey:base,dataStatus:part.dataStatus||((part.sourceCrop||part.sourceVector)?'厂家资料已核':'待核'),modelStatus:undefined,status:part.dataStatus||((part.sourceCrop||part.sourceVector)?'厂家资料已核':'待核')};
});
export {manuals};
