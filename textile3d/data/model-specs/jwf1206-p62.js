// JWF1206厂家PDF第62页：逐格核验后的独立3D规格。
import {jwf1206P62P73Verified} from '../jwf1206-p62-p73-verified.js';
import {buildJwf1206P56P64Page} from './jwf1206-p56-p64-rebuild.js';

const rows=jwf1206P62P73Verified.filter(part=>part.page===62);
export const jwf1206P62ModelSpecs=buildJwf1206P56P64Page(rows,62);
export default jwf1206P62ModelSpecs;
