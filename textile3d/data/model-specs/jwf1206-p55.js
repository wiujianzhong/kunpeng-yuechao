// JWF1206厂家PDF第55页：薄垫片和密封圈按标注截面精确显式建模。
import {jwf1206P50P61Verified} from '../jwf1206-p50-p61-verified.js';
import {annulus,buildPageSpecs,spec,torus} from './jwf1206-rebuild-p38-p55-helpers.js';
const rows=jwf1206P50P61Verified.filter(part=>part.page===55);
const builders={
  'jwf1206-p55-item-001':part=>spec(part,{views:['轴向剖视图'],assumptions:['外径50、内径40、厚0.1均按标注','调整垫片按完整薄环表达'],material:'metal',primitives:[annulus(50,40,.1,{material:'metal'})]}),
  'jwf1206-p55-item-002':part=>spec(part,{views:['轴向剖视图'],assumptions:['外径90、内径82、厚0.1均按标注','调整垫片按完整薄环表达'],material:'metal',primitives:[annulus(90,82,.1,{material:'metal'})]}),
  'jwf1206-p55-item-003':part=>spec(part,{views:['轴向剖视图'],assumptions:['外径90、内径82、厚0.2均按标注','与0.1垫片分开建模，保持本件实际厚度'],material:'metal',primitives:[annulus(90,82,.2,{material:'metal'})]}),
  'jwf1206-p55-item-004':part=>spec(part,{views:['轴向剖视图'],assumptions:['外径90、内径82、厚0.3均按标注','与前两件分开建模，保持本件实际厚度'],material:'metal',primitives:[annulus(90,82,.3,{material:'metal'})]}),
  'jwf1206-p55-item-005':part=>spec(part,{views:['轴向剖视图'],assumptions:['密封圈名义外径40、名称规格截面2.8按厂家名称','图中轴向投影另标1.6；3D环体优先采用名称规定的2.8圆截面，并完整保留两项来源尺寸'],material:'rubber',primitives:[torus(18.6,1.4,'rubber')]}),
  'jwf1206-p55-item-006':part=>spec(part,{views:['轴向剖视图'],assumptions:['密封圈名义外径50、名称规格截面3.1按厂家名称','图中轴向投影另标1.6；3D环体优先采用名称规定的3.1圆截面，并完整保留两项来源尺寸'],material:'rubber',primitives:[torus(23.45,1.55,'rubber')]}),
};
export const jwf1206P55ModelSpecs=buildPageSpecs(rows,builders,55);
export default jwf1206P55ModelSpecs;
