// JWF1206厂家PDF第73页：逐格核验后的独立3D规格。
import {jwf1206P62P73Verified} from '../jwf1206-p62-p73-verified.js';
import {createJwf1206P65P73Spec} from './jwf1206-p65-p73-rebuild.js';

const rows=jwf1206P62P73Verified.filter(part=>part.page===73);
export const jwf1206P73ModelSpecs=Object.fromEntries(rows.map(part=>[part.recordKey,createJwf1206P65P73Spec(part)]));
export default jwf1206P73ModelSpecs;
