import fs from 'node:fs';

const root=new URL('../',import.meta.url);
for(const page of [14,15,16,18,19,20,22,23]){
  const text=`// TF2513厂家PDF第${page}页BOM逐件3D规格。\nimport {tf2513P14P23Verified} from '../tf2513-p14-p23-verified.js';\nimport {makeTF2513P14P23ModelSpec} from './tf2513-p14-p23-factory.js';\nconst rows=tf2513P14P23Verified.filter(part=>part.page===${page});\nexport const tf2513P${String(page).padStart(2,'0')}ModelSpecs=Object.freeze(Object.fromEntries(rows.map(part=>[part.recordKey,makeTF2513P14P23ModelSpec(part)])));\nexport default tf2513P${String(page).padStart(2,'0')}ModelSpecs;\n`;
  fs.writeFileSync(new URL(`data/model-specs/tf2513-p${String(page).padStart(2,'0')}.js`,root),text);
}
