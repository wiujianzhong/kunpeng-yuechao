import {tf2513P25P37Verified} from '../tf2513-p25-p37-verified.js';
import {makeTF2513P25P37ModelSpec} from './tf2513-p25-p37-factory.js';
export const tf2513P37ModelSpecs=Object.fromEntries(tf2513P25P37Verified.filter(part=>part.page===37).map(part=>[part.recordKey,makeTF2513P25P37ModelSpec(part)]));
export default tf2513P37ModelSpecs;
