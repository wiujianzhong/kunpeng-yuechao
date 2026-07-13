// TF2513厂家PDF第15页BOM逐件3D规格。
import {tf2513P14P23Verified} from '../tf2513-p14-p23-verified.js';
import {makeTF2513P14P23ModelSpec} from './tf2513-p14-p23-factory.js';
const rows=tf2513P14P23Verified.filter(part=>part.page===15);
export const tf2513P15ModelSpecs=Object.freeze(Object.fromEntries(rows.map(part=>[part.recordKey,makeTF2513P14P23ModelSpec(part)])));
export default tf2513P15ModelSpecs;
