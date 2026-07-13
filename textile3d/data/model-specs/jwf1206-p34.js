// JWF1206厂家PDF第34页逐格重建规格。
import {jwf1206P27P37Verified} from '../jwf1206-p27-p37-verified.js';
import {createJwf1206P30P37Spec} from './jwf1206-p30-p37-rebuild.js';
const rows=jwf1206P27P37Verified.filter(part=>part.page===34);
export const jwf1206P34ModelSpecs=Object.freeze(Object.fromEntries(rows.map(part=>[part.recordKey,createJwf1206P30P37Spec(part)])));
export default jwf1206P34ModelSpecs;
