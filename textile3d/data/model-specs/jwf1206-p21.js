// JWF1206厂家PDF第21页逐格重建规格。
import {jwf1206P17P26Verified} from '../jwf1206-p17-p26-verified.js';
import {createJwf1206P17P27Spec} from './jwf1206-p17-p27-rebuild.js';
const rows=jwf1206P17P26Verified.filter(part=>part.page===21);
export const jwf1206P21ModelSpecs=Object.freeze(Object.fromEntries(rows.map(part=>[part.recordKey,createJwf1206P17P27Spec(part)])));
export default jwf1206P21ModelSpecs;
