// JWF1206厂家PDF第56页：按600dpi原格逐件显式重建。
import {jwf1206P50P61Verified} from '../jwf1206-p50-p61-verified.js';
import {buildJwf1206P56P64Page} from './jwf1206-p56-p64-rebuild.js';
const rows=jwf1206P50P61Verified.filter(part=>part.page===56);
export const jwf1206P56ModelSpecs=buildJwf1206P56P64Page(rows,56);
export default jwf1206P56ModelSpecs;
