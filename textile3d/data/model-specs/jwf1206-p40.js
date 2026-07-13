// JWF1206厂家PDF第40页：逐格核验后的独立3D规格。
import {jwf1206P38P49Verified} from '../jwf1206-p38-p49-verified.js';
import {createJwf1206P38P49Spec} from './jwf1206-p38-p49-factory.js';

const rows=jwf1206P38P49Verified.filter(part=>part.page===40);
export const jwf1206P40ModelSpecs=Object.fromEntries(rows.map(part=>[part.recordKey,createJwf1206P38P49Spec(part)]));
export default jwf1206P40ModelSpecs;
