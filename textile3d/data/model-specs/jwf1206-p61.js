// JWF1206厂家PDF第61页：逐格核验后的独立3D规格。
import {jwf1206P50P61Verified} from '../jwf1206-p50-p61-verified.js';
import {buildJwf1206P56P64Page} from './jwf1206-p56-p64-rebuild.js';
const rows=jwf1206P50P61Verified.filter(part=>part.page===61);
export const jwf1206P61ModelSpecs=buildJwf1206P56P64Page(rows,61);
export default jwf1206P61ModelSpecs;
