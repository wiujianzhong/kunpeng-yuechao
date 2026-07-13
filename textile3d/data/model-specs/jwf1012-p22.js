// JWF1012厂家PDF第22页：逐格核验后的独立3D规格。
import {jwf1012P16P25Verified} from '../jwf1012-p16-p25-verified.js';
import {createJwf1012Spec} from './jwf1012-p16-p25-factory.js';

const rows=jwf1012P16P25Verified.filter(part=>part.page===22);
export const jwf1012P22ModelSpecs=Object.fromEntries(rows.map(part=>[part.recordKey,createJwf1012Spec(part)]));
export default jwf1012P22ModelSpecs;
