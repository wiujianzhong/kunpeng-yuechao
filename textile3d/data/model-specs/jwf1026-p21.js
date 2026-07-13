import {jwf1026P19P25Verified as verified} from '../jwf1026-p19-p25-verified.js';
import {createJwf1026P19P25Spec} from './jwf1026-p19-p25-factory.js';
const parts=verified.filter(part=>part.page===21).map(part=>({pdfPage:part.page,item:part.item,recordKey:part.recordKey,code:part.code,nameZh:part.name,quantity:{value:part.quantity,unit:part.quantityUnit,meaning:part.quantityMeaning},dimensions:part.dims}));
export const jwf1026P21ModelSpecs=Object.fromEntries(parts.map(part=>[part.code||part.recordKey,createJwf1026P19P25Spec(part)]));
