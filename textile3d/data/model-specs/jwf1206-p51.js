// JWF1206厂家PDF第51页：逐格核验后的独立3D规格。
import {jwf1206P50P61Verified} from '../jwf1206-p50-p61-verified.js';
import {createJwf1206P50P61Spec} from './jwf1206-p50-p61-factory.js';
const rows=jwf1206P50P61Verified.filter(part=>part.page===51);
export const jwf1206P51ModelSpecs=Object.fromEntries(rows.map(part=>[part.recordKey,createJwf1206P50P61Spec(part)]));
export default jwf1206P51ModelSpecs;
