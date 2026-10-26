import {readFile,writeFile} from 'node:fs/promises';
import {createRequire} from 'node:module';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const root=dirname(fileURLToPath(import.meta.url));
const require=createRequire(import.meta.url);
const esbuild=require('/Users/xiaowu/Projects/05-小伍官网与品牌/吴甜甜个人主页/node_modules/esbuild');
const result=await esbuild.build({
  entryPoints:[resolve(root,'src/app.mjs')],bundle:true,write:false,minify:true,format:'iife',target:'es2020',
  alias:{three:resolve(root,'../jwf1206-training/vendor/three.module.js')},legalComments:'inline',
});
const [page,style,license]=await Promise.all([readFile(resolve(root,'src/page.html'),'utf8'),readFile(resolve(root,'src/style.css'),'utf8'),readFile(resolve(root,'../jwf1206-training/vendor/LICENSE.three.txt'),'utf8')]);
const script=`/* Three.js许可：\n${license}\n*/\n${result.outputFiles[0].text}`;
const html=page.replace('/*__STYLE__*/',()=>style).replace('/*__APP__*/',()=>script.replace(/<\/script/gi,'<\\/script'));
await writeFile(resolve(root,'index.html'),html);
console.log(`离线页面已生成：${resolve(root,'index.html')}（${(Buffer.byteLength(html)/1024).toFixed(0)} KB）`);
