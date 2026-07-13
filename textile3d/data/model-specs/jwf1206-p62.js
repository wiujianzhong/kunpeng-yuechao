// JWF1206厂家PDF第62页：逐格核验后的独立3D规格。
import {jwf1206P62P73Verified} from '../jwf1206-p62-p73-verified.js';
import {createJwf1206P62P73Spec} from './jwf1206-p62-p73-factory.js';

const rows=jwf1206P62P73Verified.filter(part=>part.page===62);
export const jwf1206P62ModelSpecs=Object.fromEntries(rows.map(part=>[part.recordKey,createJwf1206P62P73Spec(part)]));
export default jwf1206P62ModelSpecs;

