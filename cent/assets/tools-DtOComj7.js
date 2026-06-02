import{a as e}from"./rolldown-runtime-COnpUsM8.js";import{v as t}from"./dndkit-DFWEzLie.js";import{t as n}from"./preload-helper-BrfB4heR.js";import{a as r,m as i,s as a,u as o}from"./locale-7lKexmOl.js";import{n as s}from"./user-DZnWzXVB.js";import{n as c}from"./dist-c27M4WSY.js";import{$t as l,Gt as u,Ht as d,It as f,Kt as p,T as m,Ut as h,Vt as g,Yt as _,b as v,f as y,j as ee,k as b,qt as x,t as S,zt as C}from"./storage-B3zcorQQ.js";import{B as w,G as T,M as E,P as D,R as O,T as k,U as A,V as te,W as ne,_ as j,a as re,c as ie,g as ae,i as oe,k as M,n as se,o as ce,r as le,s as ue,t as de,u as fe,v as N,z as pe}from"./select-fzPjri0R.js";import{C as me,S as P,b as F,c as I,d as L,g as R,h as z,l as he,m as ge,u as B,v as V,x as _e}from"./zod-Bd8O-Clv.js";import{a as H,c as ve,d as ye,f as be,i as xe,l as Se,o as Ce,r as we,t as Te}from"./preview-wrapper-BwukFUFW.js";var Ee=0,De=200,Oe=i(e=>({entries:[],panelOpen:!1,push:t=>{let n=++Ee;return e(e=>{let r=[...e.entries,{...t,id:n}];return r.length>De&&r.splice(0,r.length-De),{entries:r}}),n},update:(t,n)=>e(e=>({entries:e.entries.map(e=>e.id===t?{...e,...n}:e)})),clear:()=>e({entries:[]}),setPanelOpen:t=>e({panelOpen:t})}));function ke(e){return{...e,handler:async(t,n)=>{let r=Oe.getState().push({name:e.name,startedAt:Date.now(),params:t,status:`running`});try{let i=await e.handler(t,n);return Oe.getState().update(r,{status:`success`,result:i,endedAt:Date.now()}),i}catch(e){throw Oe.getState().update(r,{status:`error`,error:e instanceof Error?e.message:String(e),endedAt:Date.now()}),e}}}}var U=class extends Error{constructor(e,t){super(`${e} at position ${t}`),this.position=t}},Ae=32,je=10,Me=9,Ne=13,Pe=160,Fe=6158,Ie=8192,Le=8203,Re=8239,ze=8287,Be=12288,Ve=65279;function He(e){return/^[0-9A-Fa-f]$/.test(e)}function W(e){return e>=`0`&&e<=`9`}function Ue(e){return e>=` `}function G(e){return`,:[]/{}()
+`.includes(e)}function We(e){return e>=`a`&&e<=`z`||e>=`A`&&e<=`Z`||e===`_`||e===`$`}function Ge(e){return e>=`a`&&e<=`z`||e>=`A`&&e<=`Z`||e===`_`||e===`$`||e>=`0`&&e<=`9`}var Ke=/^(http|https|ftp|mailto|file|data|irc):\/\/$/,qe=/^[A-Za-z0-9-._~:/?#@!$&'()*+;=]$/;function Je(e){return`,[]/{}
+`.includes(e)}function Ye(e){return q(e)||Xe.test(e)}var Xe=/^[[{\w-]$/;function Ze(e){return e===`
`||e===`\r`||e===`	`||e===`\b`||e===`\f`}function K(e,t){let n=e.charCodeAt(t);return n===Ae||n===je||n===Me||n===Ne}function Qe(e,t){let n=e.charCodeAt(t);return n===Ae||n===Me||n===Ne}function $e(e,t){let n=e.charCodeAt(t);return n===Pe||n===Fe||n>=Ie&&n<=Le||n===Re||n===ze||n===Be||n===Ve}function q(e){return et(e)||nt(e)}function et(e){return e===`"`||e===`“`||e===`”`}function tt(e){return e===`"`}function nt(e){return e===`'`||e===`‘`||e===`’`||e==="`"||e===`´`}function rt(e){return e===`'`}function J(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!1,r=e.lastIndexOf(t);return r===-1?e:e.substring(0,r)+(n?``:e.substring(r+1))}function Y(e,t){let n=e.length;if(!K(e,n-1))return e+t;for(;K(e,n-1);)n--;return e.substring(0,n)+t+e.substring(n)}function it(e,t,n){return e.substring(0,t)+e.substring(t+n)}function at(e){return/[,\n][ \t\r]*$/.test(e)}var ot={"\b":`\\b`,"\f":`\\f`,"\n":`\\n`,"\r":`\\r`,"	":`\\t`},st={'"':`"`,"\\":`\\`,"/":`/`,b:`\b`,f:`\f`,n:`
`,r:`\r`,t:`	`};function ct(e){let t=0,n=``;c(["```","[```","{```"]),i()||O(),c(["```","```]","```}"]);let r=u(`,`);for(r&&a(),Ye(e[t])&&at(n)?(r||(n=Y(n,`,`)),g()):r&&(n=J(n,`,`));e[t]===`}`||e[t]===`]`;)t++,a();if(t>=e.length)return n;D();function i(){a();let e=m()||h()||_()||y()||ee()||x(!1)||S();return a(),e}function a(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!0,n=t,r=o(e);do r=s(),r&&=o(e);while(r);return t>n}function o(r){let i=r?K:Qe,a=``;for(;;)if(i(e,t))a+=e[t],t++;else if($e(e,t))a+=` `,t++;else break;return a.length>0?(n+=a,!0):!1}function s(){if(e[t]===`/`&&e[t+1]===`*`){for(;t<e.length&&!lt(e,t);)t++;return t+=2,!0}if(e[t]===`/`&&e[t+1]===`/`){for(;t<e.length&&e[t]!==`
`;)t++;return!0}return!1}function c(n){if(l(n)){if(We(e[t]))for(;t<e.length&&Ge(e[t]);)t++;return a(),!0}return!1}function l(n){o(!0);for(let r of n){let n=t+r.length;if(e.slice(t,n)===r)return t=n,!0}return!1}function u(r){return e[t]===r?(n+=e[t],t++,!0):!1}function d(n){return e[t]===n?(t++,!0):!1}function f(){return d(`\\`)}function p(){return a(),e[t]===`.`&&e[t+1]===`.`&&e[t+2]===`.`?(t+=3,a(),d(`,`),!0):!1}function m(){if(e[t]===`{`){n+=`{`,t++,a(),d(`,`)&&a();let r=!0;for(;t<e.length&&e[t]!==`}`;){let o;if(r?(o=!0,r=!1):(o=u(`,`),o||(n=Y(n,`,`)),a()),p(),!(_()||x(!0))){e[t]===`}`||e[t]===`{`||e[t]===`]`||e[t]===`[`||e[t]===void 0?n=J(n,`,`):k();break}a();let s=u(`:`),c=t>=e.length;s||(Ye(e[t])||c?n=Y(n,`:`):A()),i()||(s||c?n+=`null`:A())}return e[t]===`}`?(n+=`}`,t++):n=Y(n,`}`),!0}return!1}function h(){if(e[t]===`[`){n+=`[`,t++,a(),d(`,`)&&a();let r=!0;for(;t<e.length&&e[t]!==`]`;)if(r?r=!1:u(`,`)||(n=Y(n,`,`)),p(),!i()){n=J(n,`,`);break}return e[t]===`]`?(n+=`]`,t++):n=Y(n,`]`),!0}return!1}function g(){let e=!0,t=!0;for(;t;)e?e=!1:u(`,`)||(n=Y(n,`,`)),t=i();t||(n=J(n,`,`)),n=`[\n${n}\n]`}function _(){let r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1,i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:-1,o=e[t]===`\\`;if(o&&=(t++,!0),q(e[t])){let s=tt(e[t])?tt:rt(e[t])?rt:nt(e[t])?nt:et,c=t,l=n.length,u=`"`;for(t++;;){if(t>=e.length){let i=C(t-1);return!r&&G(e.charAt(i))?(t=c,n=n.substring(0,l),_(!0)):(u=Y(u,`"`),n+=u,!0)}if(t===i)return u=Y(u,`"`),n+=u,!0;if(s(e[t])){let i=t,o=u.length;if(u+=`"`,t++,n+=u,a(!1),r||t>=e.length||G(e[t])||q(e[t])||W(e[t]))return v(),!0;let s=C(i-1),d=e.charAt(s);if(d===`,`)return t=c,n=n.substring(0,l),_(!1,s);if(G(d))return t=c,n=n.substring(0,l),_(!0);n=n.substring(0,l),t=i+1,u=`${u.substring(0,o)}\\${u.substring(o)}`}else if(r&&Je(e[t])){if(e[t-1]===`:`&&Ke.test(e.substring(c+1,t+2)))for(;t<e.length&&qe.test(e[t]);)u+=e[t],t++;return u=Y(u,`"`),n+=u,v(),!0}else if(e[t]===`\\`){let n=e.charAt(t+1);if(st[n]!==void 0)u+=e.slice(t,t+2),t+=2;else if(n===`u`){let n=2;for(;n<6&&He(e[t+n]);)n++;n===6?(u+=e.slice(t,t+6),t+=6):t+n>=e.length?t=e.length:te()}else u+=n,t+=2}else{let n=e.charAt(t);n===`"`&&e[t-1]!==`\\`?(u+=`\\${n}`,t++):Ze(n)?(u+=ot[n],t++):(Ue(n)||E(n),u+=n,t++)}o&&f()}}return!1}function v(){let r=!1;for(a();e[t]===`+`;){r=!0,t++,a(),n=J(n,`"`,!0);let e=n.length;n=_()?it(n,e,1):Y(n,`"`)}return r}function y(){let r=t;if(e[t]===`-`){if(t++,w())return T(r),!0;if(!W(e[t]))return t=r,!1}for(;W(e[t]);)t++;if(e[t]===`.`){if(t++,w())return T(r),!0;if(!W(e[t]))return t=r,!1;for(;W(e[t]);)t++}if(e[t]===`e`||e[t]===`E`){if(t++,(e[t]===`-`||e[t]===`+`)&&t++,w())return T(r),!0;if(!W(e[t]))return t=r,!1;for(;W(e[t]);)t++}if(!w())return t=r,!1;if(t>r){let i=e.slice(r,t),a=/^0\d/.test(i);return n+=a?`"${i}"`:i,!0}return!1}function ee(){return b(`true`,`true`)||b(`false`,`false`)||b(`null`,`null`)||b(`True`,`true`)||b(`False`,`false`)||b(`None`,`null`)}function b(r,i){return e.slice(t,t+r.length)===r?(n+=i,t+=r.length,!0):!1}function x(r){let a=t;if(We(e[t])){for(;t<e.length&&Ge(e[t]);)t++;let n=t;for(;K(e,n);)n++;if(e[n]===`(`)return t=n+1,i(),e[t]===`)`&&(t++,e[t]===`;`&&t++),!0}for(;t<e.length&&!Je(e[t])&&!q(e[t])&&(!r||e[t]!==`:`);)t++;if(e[t-1]===`:`&&Ke.test(e.substring(a,t+2)))for(;t<e.length&&qe.test(e[t]);)t++;if(t>a){for(;K(e,t-1)&&t>0;)t--;let r=e.slice(a,t);return n+=r===`undefined`?`null`:JSON.stringify(r),e[t]===`"`&&t++,!0}}function S(){if(e[t]===`/`){let r=t;for(t++;t<e.length&&(e[t]!==`/`||e[t-1]===`\\`);)t++;return t++,n+=JSON.stringify(e.substring(r,t)),!0}}function C(t){let n=t;for(;n>0&&K(e,n);)n--;return n}function w(){return t>=e.length||G(e[t])||K(e,t)}function T(r){n+=`${e.slice(r,t)}0`}function E(e){throw new U(`Invalid character ${JSON.stringify(e)}`,t)}function D(){throw new U(`Unexpected character ${JSON.stringify(e[t])}`,t)}function O(){throw new U(`Unexpected end of json string`,e.length)}function k(){throw new U(`Object key expected`,t)}function A(){throw new U(`Colon expected`,t)}function te(){throw new U(`Invalid unicode character "${e.slice(t,t+6)}"`,t)}}function lt(e,t){return e[t]===`*`&&e[t+1]===`/`}function ut(e){let t={role:`assistant`,raw:e.answer,formatted:{thought:e.thought||``,answer:``,overview:``}},n=e.answer;function r(e,r){let i=RegExp(`<${e}>([\\s\\S]*?)(?:<\\/${e}>|<\\/${e}|(?=<${e})|$)`,`gi`);n=n.replace(i,(e,n)=>{let i=(n||``).replace(/[<>]/g,``).trim();return i&&(t.formatted[r]+=i),``})}return r(`overview`,`overview`),r(`thought`,`thought`),n=n.replace(/<tool>([\s\S]*?)(?:(<\s*\/?\s*tool[^>]*>?)|(?=<))/gi,(e,n)=>{if(!n)return``;let r=n.replace(/[<>]/g,``).trim();if(r)try{let e=ct(r),n=JSON.parse(e);t.formatted.tools||(t.formatted.tools=[]),t.formatted.tools.push({name:n.name||`unknown_tool`,params:n.params||{}})}catch(e){console.error(`JSON Repair/Parse failed:`,e,`Content:`,r)}return``}),t.formatted.answer=n.replace(/\n{2,}/g,`
`).replace(/<\s*\/\s*$/g,``).replace(`<answer>`,``).replace(`</answer>`,``).trim(),t}function dt(e){let t=e.match(/^---\s*\n([\s\S]*?)\n---\s*/);if(!t)throw Error(`can not parse markdown as Skill: ${e.slice(10)}...`);let n=t[1],r=e=>e.match(/^name:\s*(.*)$/m)?.[1]?.trim()||``,i=e=>e.match(/^description:\s*(.*)$/m)?.[1]?.trim()||``,a=r(n);return{id:a||`unknown-skill`,name:a,description:i(n),content:e}}function ft(e,t){return Object.assign(e,{abort:t})}function pt(e){return typeof structuredClone==`function`?structuredClone(e):JSON.parse(JSON.stringify(e))}function mt(e){return e.map(e=>pt(e))}function ht(e,t){return{role:`user`,raw:e,assets:t}}function gt(e,t){if(!e)return t;let n=e.safeParse(t);if(!n.success)throw n.error;return n.data}var _t=`你是是一个运行在浏览器环境中的AI助手，你必须遵循以下响应规则进行文本回复：

# 核心交互模式：ReAct

当你需要开始行动时，不要立即给出答案，必须先思考，确定下一步后，再给出回答：
第一步，思考问题：用户是否给出了足够的信息，如果没有，是否可以通过调用工具侧面获取这些信息？listTools很有用，大部分情况下你可以直接调用以获取更多可用工具。
第二步，获取信息：如果信息不足，尝试列出可用的Tools帮助自己获取更多信息，通过工具的描述了解如何使用这些Tools。
第三步，学习技能：如果用户的问题较为复杂，可以列出可用的Skills，如果有可能满足要求的SKills，大胆读取这些Skills的完整信息，这将非常有助于解决用户的问题。
第四步，行动(Act)：当你获取了足够多的信息，就可以开始行动，不要担心，大胆去使用工具Tools，即使工具报错也会返回给你足够的信息，根据这些信息调整你的下一步行动，直到最终给出用户满意的解答。

# 响应规则
对话引导： 当对话开始或话题切换时，必须使用 <overview></overview> 标签返回一个新的对话标题。

工具调用： 如果需要使用工具，请在回复末尾包含且仅包含一个 <tool></tool> 代码块。

JSON 规范： <tool> 标签内的内容必须是合法的 JSON 格式。

JSON 结构： 必须严格遵守此结构：{"name":"工具名称","params":{}}。

调用限制： 单次回复中禁最多出现3次 <tool> 调用。

自检机制： 如果不确定可用工具，请优先调用内置工具 listTools；如果需要可用技能/知识库，请调用 listSkills 并按需用 loadSkill 加载全文。

后续处理： 收到工具执行结果后，请继续按照此协议进行推理和回答。

允许使用的标签
<overview>：用于输出概述、标题，注意回复不能只包含overview。
<tool>：用于执行工具调用（内容为 JSON）。

**!!!你必须严格按照给定的xml格式来调用工具，所有的xml标签都必须闭合，所有的json文本必须被引号包裹以便能被正确解析！**
例如，你可以这样来查看当前所有的工具，注意你的文本中必须包含\`<tool>\`和\`</tool>\`，并且xml块中包裹的只能是合法JSON字符串：

 <tool>{"name":"listTools","params":{}}</tool>

以下是可用的工具（以 JSON Schema 定义注入）：
{{TOOLS_JSON}}`,vt=`{{TOOLS_JSON}}`,yt=F().describe(`Array of tool prompt definitions as human-readable strings.`),bt=B(R({id:F(),name:F(),description:F()})).describe(`Array of skill metadata including id, name, description.`),xt=R({id:F().trim().min(1)}).describe(`Object with required id:string (from listSkills result).`),St=R({id:F(),name:F(),description:F(),content:F()}).describe(`Skill payload including id, name, description, content(markdown).`);function Ct(e){return typeof e==`object`&&!!e&&`_def`in e&&`safeParse`in e&&typeof e.safeParse==`function`}function wt(e){if(!e)return`None`;let t=me(e);return t.description?t.description:typeof t.type==`string`?t.type:`Complex schema`}function Tt(e){if(!e)return`None`;let t=me(e);return`这是一份JSON Schema的描述：\n${JSON.stringify(t)}`}function Et(e){let t=e.argSchema?Tt(e.argSchema):`No parameters`,n=wt(e.returnSchema);return`工具名称: ${e.name}\n工具描述: ${e.describe}\n工具接收的参数: ${t}\n工具返回值类型: ${n}`}function Dt(e){try{return JSON.stringify(e)}catch{return String(e)}}function Ot(e,t,n){return{role:`tool`,raw:Dt({name:e,params:t,returns:n}),formatted:{name:e,params:t,returns:n}}}function kt(e,t,n){return{role:`tool`,raw:Dt({name:e,params:t,errors:n}),formatted:{name:e,params:t,errors:n}}}function At(e){return X({name:`listTools`,describe:`List available tools and their argument and return schema summary.`,argSchema:void 0,returnSchema:yt,handler:()=>`下面是所有可用工具的列表：\n\n${e.map((e,t)=>`${t}. ${Et(e)}`).join(`

`)}`})}function jt(e){return X({name:`listSkills`,describe:`List available skills (metadata only). Use loadSkill to read full content.`,argSchema:void 0,returnSchema:bt,handler:()=>e.map(e=>({id:e.id,name:e.name,description:e.description}))})}function Mt(e){return X({name:`loadSkill`,describe:`Load a skill full markdown content by id.`,argSchema:xt,returnSchema:St,handler:async({id:t})=>{let n=e.get(t);if(!n)throw Error(`Skill "${t}" not found.`);let r=await n.load();return{id:n.id,name:n.name,description:n.description,content:r}}})}function Nt(e){return e.map(Et).join(`

`)}function Pt(e){return _t.replace(vt,Nt(e)).trim()}async function Ft(e,t,n){let r=e.get(t.name);if(!r)return kt(t.name,t.params,{message:`Tool "${t.name}" not found.`});let i;try{i=gt(r.argSchema,t.params)}catch(e){return kt(r.name,t.params,e)}try{let e=await r.handler(i,n),t=gt(r.returnSchema,e);return Ot(r.name,i,t)}catch(e){return kt(r.name,i,e)}}function X(e){let{name:t,describe:n,argSchema:r,returnSchema:i,handler:a}=e;if(!Ct(i))throw Error(`createTool requires zod schemas for returnSchema.`);return{name:t,describe:n,argSchema:r,returnSchema:i,handler:a}}var It=20;function Lt({history:e=[],provider:t,tools:n,skills:r,systemPrompt:i,maxToolRounds:a=It}){let o=mt(e),s=[...n],c=(r??[]).map(e=>{let t=e.id??e.name;if(typeof t!=`string`||!t.trim())throw Error(`Skill id must be a non-empty string.`);let n=e.name??t,r=e.description??``,i=e.content,a=e.loader;return{id:t,name:n,description:r,load:async()=>typeof i==`string`?i:typeof a==`function`?await a():``}}),l=new Map(c.map(e=>[e.id,e])),u=jt(c),d=Mt(l),f=At([u,d,...s]),p=[...s,f,u,d],m=new Map(p.map(e=>[e.name,e])),h=[[...o.filter(e=>e.role===`system`),{role:`system`,raw:i??``}].reduce((e,t)=>({role:`system`,raw:`${e.raw}${t.raw.length?`\n\nAdditional system prompt:\n${t.raw}`:``}`}),{role:`system`,raw:Pt([f,u])}),...o.filter(e=>e.role!==`system`)],g=(e,n=0)=>{let r,i=null,o=(async()=>{if(n>=a)return(async function*(){})();r=t.request({history:e});async function*o(){yield{history:[...e]};let t=await r;for await(let r of t){let t=ut(r),a=t.formatted.tools??[];if(a.length===0){yield{history:[...e,t]};continue}let o=a.map(async({name:t,params:n})=>{let r=Date.now();try{let i=await Ft(m,{name:t,params:n},{history:[...e]}),a=Date.now()-r;return{...i,formatted:{...i.formatted,runningTime:a}}}catch(e){let i=Date.now()-r;return{role:`tool`,raw:`Error: ${e.message||String(e)}`,formatted:{name:t,params:n,runningTime:i,errors:e.message}}}}),s=await Promise.all(o),c=[...e,t,...s];yield{history:c};let l=g(c,n+1);i=()=>l.abort(),yield*await l,i=null;return}}return o()})();return o.abort=()=>{r?.abort?.(),i?.()},o};return({message:e,assets:t})=>{let n=[...h],r=ht(e,t);return n.push(r),g(n,0)}}var Z=e(A(),1),Q=e(t(),1),$=a(),Rt=`Radio`,[zt,Bt]=u(Rt),[Vt,Ht]=zt(Rt),Ut=Q.forwardRef((e,t)=>{let{__scopeRadio:n,name:r,checked:i=!1,required:a,disabled:o,value:s=`on`,onCheck:c,form:u,...d}=e,[f,m]=Q.useState(null),h=l(t,e=>m(e)),g=Q.useRef(!1),_=f?u||!!f.closest(`form`):!0;return(0,$.jsxs)(Vt,{scope:n,checked:i,disabled:o,children:[(0,$.jsx)(C.button,{type:`button`,role:`radio`,"aria-checked":i,"data-state":Jt(i),"data-disabled":o?``:void 0,disabled:o,value:s,...d,ref:h,onClick:p(e.onClick,e=>{i||c?.(),_&&(g.current=e.isPropagationStopped(),g.current||e.stopPropagation())})}),_&&(0,$.jsx)(qt,{control:f,bubbles:!g.current,name:r,value:s,checked:i,required:a,disabled:o,form:u,style:{transform:`translateX(-100%)`}})]})});Ut.displayName=Rt;var Wt=`RadioIndicator`,Gt=Q.forwardRef((e,t)=>{let{__scopeRadio:n,forceMount:r,...i}=e,a=Ht(Wt,n);return(0,$.jsx)(f,{present:r||a.checked,children:(0,$.jsx)(C.span,{"data-state":Jt(a.checked),"data-disabled":a.disabled?``:void 0,...i,ref:t})})});Gt.displayName=Wt;var Kt=`RadioBubbleInput`,qt=Q.forwardRef(({__scopeRadio:e,control:t,checked:n,bubbles:r=!0,...i},a)=>{let o=Q.useRef(null),s=l(o,a),c=d(n),u=g(t);return Q.useEffect(()=>{let e=o.current;if(!e)return;let t=window.HTMLInputElement.prototype,i=Object.getOwnPropertyDescriptor(t,`checked`).set;if(c!==n&&i){let t=new Event(`click`,{bubbles:r});i.call(e,n),e.dispatchEvent(t)}},[c,n,r]),(0,$.jsx)(C.input,{type:`radio`,"aria-hidden":!0,defaultChecked:n,...i,tabIndex:-1,ref:s,style:{...i.style,...u,position:`absolute`,pointerEvents:`none`,opacity:0,margin:0}})});qt.displayName=Kt;function Jt(e){return e?`checked`:`unchecked`}var Yt=[`ArrowUp`,`ArrowDown`,`ArrowLeft`,`ArrowRight`],Xt=`RadioGroup`,[Zt,Qt]=u(Xt,[w,Bt]),$t=w(),en=Bt(),[tn,nn]=Zt(Xt),rn=Q.forwardRef((e,t)=>{let{__scopeRadioGroup:n,name:r,defaultValue:i,value:a,required:o=!1,disabled:s=!1,orientation:c,dir:l,loop:u=!0,onValueChange:d,...f}=e,p=$t(n),m=te(l),[g,_]=h({prop:a,defaultProp:i??null,onChange:d,caller:Xt});return(0,$.jsx)(tn,{scope:n,name:r,required:o,disabled:s,value:g,onValueChange:_,children:(0,$.jsx)(pe,{asChild:!0,...p,orientation:c,dir:m,loop:u,children:(0,$.jsx)(C.div,{role:`radiogroup`,"aria-required":o,"aria-orientation":c,"data-disabled":s?``:void 0,dir:m,...f,ref:t})})})});rn.displayName=Xt;var an=`RadioGroupItem`,on=Q.forwardRef((e,t)=>{let{__scopeRadioGroup:n,disabled:r,...i}=e,a=nn(an,n),o=a.disabled||r,s=$t(n),c=en(n),u=Q.useRef(null),d=l(t,u),f=a.value===i.value,m=Q.useRef(!1);return Q.useEffect(()=>{let e=e=>{Yt.includes(e.key)&&(m.current=!0)},t=()=>m.current=!1;return document.addEventListener(`keydown`,e),document.addEventListener(`keyup`,t),()=>{document.removeEventListener(`keydown`,e),document.removeEventListener(`keyup`,t)}},[]),(0,$.jsx)(O,{asChild:!0,...s,focusable:!o,active:f,children:(0,$.jsx)(Ut,{disabled:o,required:a.required,checked:f,...c,...i,name:a.name,ref:d,onCheck:()=>a.onValueChange(i.value),onKeyDown:p(e=>{e.key===`Enter`&&e.preventDefault()}),onFocus:p(i.onFocus,()=>{m.current&&u.current?.click()})})})});on.displayName=an;var sn=`RadioGroupIndicator`,cn=Q.forwardRef((e,t)=>{let{__scopeRadioGroup:n,...r}=e;return(0,$.jsx)(Gt,{...en(n),...r,ref:t})});cn.displayName=sn;var ln=rn,un=on,dn=cn,fn=X({name:`getEnv`,describe:`获取当前环境信息，包括当前日期、当前账单数据的过滤视图等，当用户提出获取“当前账单”，或者“当前时间”相关的问题时，应该首先调用这个工具来获取最新的环境信息，辅助回答用户的问题。`,argSchema:void 0,returnSchema:F().describe(`环境信息的字符串表示`),handler(){return be()}}),pn=e(ue(),1);Z.default.extend(pn.default);var mn=(e,t)=>{let{range:n,interval:r=`[)`,desc:i=!0,customFilter:a}=t,[o,s]=n.map(e=>e?(0,Z.default)(e):null),c=null,l=null;o&&s?[c,l]=o.isBefore(s)?[o,s]:[s,o]:c=o||s||null;let u=[];for(let t of e){let e=Z.default.unix(t.time/1e3),d=!0;if(o&&s)d=e.isBetween(c,l,null,r);else if(o||s){let t=o||s,i=r.startsWith(`[`);d=n[0]?i?e.isSameOrAfter(t):e.isAfter(t):r.endsWith(`]`)?e.isSameOrBefore(t):e.isBefore(t)}if(d&&(!a||a(t))&&u.push(t),i&&o&&e.isBefore(c)||!i&&s&&e.isAfter(l))break}return u},hn=(e,t,n=!0,r)=>mn(e,{range:t,desc:n,customFilter:r});function gn(e,t){let{items:n,meta:r}=t,i=[...M,...r.categories??[]],a=r.tags??[],o={},s,c;if(e.startTime&&(s=(0,Z.default)(e.startTime).startOf(`day`).valueOf()),e.endTime&&(c=(0,Z.default)(e.endTime).endOf(`day`).valueOf()),e.categoryNames?.length){let t=[];for(let n of e.categoryNames){let e=i.filter(e=>e.name.toLowerCase().includes(n.toLowerCase()));t.push(...e.map(e=>e.id))}o.categories=[...new Set(t)]}if(e.tagNames?.length){let t=[];for(let n of e.tagNames){let e=a.find(e=>e.name.toLowerCase()===n.toLowerCase());e&&t.push(e.id)}o.tags=t}e.keyword&&(o.comment=e.keyword),e.minAmount!==void 0&&(o.minAmountNumber=j(e.minAmount)),e.maxAmount!==void 0&&(o.maxAmountNumber=j(e.maxAmount)),e.billType&&(o.type=e.billType);let l=fe({...o,start:void 0,end:void 0},{categories:i,tags:a,baseCurrency:r.baseCurrency}),u=mn(n,{range:[s,c],interval:`[]`,desc:!0,customFilter:l}),d=u.filter(e=>e.type===`income`).reduce((e,t)=>e+t.amount,0),f=u.filter(e=>e.type===`expense`).reduce((e,t)=>e+t.amount,0);return{bills:u,statistics:{total:u.length,totalIncome:d,totalExpense:f,netAmount:d-f}}}function _n(e){let t=[...M,...e.categories??[]],n=e.tags??[],r={},i=[];for(let e of t)e.parent?(r[e.parent]||(r[e.parent]=[]),r[e.parent].push(e)):i.push(e);return{categories:{all:t,tree:r,roots:i},tags:n,currencies:e.customCurrencies??[]}}var vn=e=>ae(e),yn=(e=[])=>e.reduce((e,t)=>(e[t.id]=t.name,e),{}),bn=(e=[])=>e.reduce((e,t)=>(e[t.id]=t.name,e),{});function xn(e,t){let{groupBy:n=`category`,limit:r=10,includeTrend:i=!1,...a}=e,{bills:o,statistics:s}=gn(a,t),c=yn([...M,...t.meta.categories??[]]),l=bn(t.meta.tags),u={},d={};o.forEach(e=>{let t=vn(e.amount),r=`Unknown`;if(n===`category`?r=c[e.categoryId]||`Unknown Category`:n===`tag`?e.tagIds?.length?(e.tagIds.forEach(e=>{let n=l[e]||`Unknown Tag`;u[n]||(u[n]={amount:0,count:0}),u[n].amount+=t,u[n].count+=1}),r=``):(r=`No Tag`,u[r]||(u[r]={amount:0,count:0}),u[r].amount+=t,u[r].count+=1):n===`day`?r=(0,Z.default)(e.time).format(`YYYY-MM-DD`):n===`month`?r=(0,Z.default)(e.time).format(`YYYY-MM`):n===`year`?r=(0,Z.default)(e.time).format(`YYYY`):n===`type`&&(r=e.type===`expense`?`支出`:`收入`),r&&(u[r]||(u[r]={amount:0,count:0}),u[r].amount+=t,u[r].count+=1),i){let n=(0,Z.default)(e.time).format(`YYYY-MM-DD`);d[n]=(d[n]||0)+t}});let f=Object.entries(u).map(([e,t])=>({name:e,...t})).sort((e,t)=>t.amount-e.amount),p=f.slice(0,r),m=f.slice(r);if(m.length>0){let e=m.reduce((e,t)=>({amount:e.amount+t.amount,count:e.count+t.count}),{amount:0,count:0});p.push({name:`Others`,amount:e.amount,count:e.count})}let h=p.reduce((e,t)=>e+t.amount,0),g=p.map(e=>({...e,amount:Number(e.amount.toFixed(2)),percentage:h===0?`0%`:`${(e.amount/h*100).toFixed(1)}%`})),_=i?Object.entries(d).map(([e,t])=>({date:e,amount:Number(t.toFixed(2))})).sort((e,t)=>(0,Z.default)(e.date).valueOf()-(0,Z.default)(t.date).valueOf()):void 0;return{meta:{totalAmount:Number(vn(a.billType===`income`?s.totalIncome:a.billType===`expense`?s.totalExpense:s.totalIncome-s.totalExpense).toFixed(2)),count:s.total,currency:t.meta.baseCurrency||`CNY`,dateRange:a.startTime&&a.endTime?`${a.startTime} to ${a.endTime}`:`All Time`},distribution:g,trend:_}}async function Sn(e,t=`file`){let n=e.split(`;base64,`);if(n.length!==2)throw Error(`Invalid Base64 string format. Expected a Data URL.`);let r=n[0],i=n[1],a=r.match(/data:(.*?)(;|$)/),o=a&&a[1]?a[1]:`application/octet-stream`,s=t,c=r.match(/name=([^;]+)/i);if(c&&c[1])try{s=decodeURIComponent(c[1])}catch{s=c[1]}else{let e=o.match(/\/(.+)/);e&&e[1]&&s.indexOf(`.`)===-1?s=`${t}.${e[1]}`:s.indexOf(`.`)===-1&&(s=t)}let l=atob(i),u=new ArrayBuffer(l.length),d=new Uint8Array(u);for(let e=0;e<l.length;e++)d[e]=l.charCodeAt(e);let f=new Blob([d],{type:o});return new File([f],s,{type:o,lastModified:Date.now()})}var Cn=Q.forwardRef(({className:e,...t},n)=>(0,$.jsx)(ln,{className:_(`grid gap-2`,e),...t,ref:n}));Cn.displayName=ln.displayName;var wn=Q.forwardRef(({className:e,...t},n)=>(0,$.jsx)(un,{ref:n,className:_(`aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50`,e),...t,children:(0,$.jsx)(dn,{className:`flex items-center justify-center`,children:(0,$.jsx)(E,{className:`h-3.5 w-3.5 fill-primary`})})}));wn.displayName=un.displayName;var[Tn,En]=m(({edit:e,onCancel:t,onConfirm:n})=>{let i=r(),[a,o]=(0,Q.useState)([]),[s,c]=(0,Q.useState)(!0),[l,u]=(0,Q.useState)(e?.asMine??!0);(0,Q.useEffect)(()=>{(async()=>await(e?.bills?Promise.all(e.bills.map(async e=>{let t=e.images?await Promise.all(e.images?.map(e=>e instanceof File?e:e.startsWith(`data:`)?Sn(e):e)):void 0;return{...e,images:t}})):[]))().then(e=>{o(e)}).catch(console.error).finally(()=>{c(!1)})},[e?.bills]);let[d,f]=(0,Q.useState)(`append`),[p,m]=(0,Q.useState)([]);(0,Q.useEffect)(()=>{d===`append`&&(async()=>{let e=a,t=await N.getState().refreshBillList();return e?.filter(e=>t.every(t=>t.id!==e.id&&t.time!==e.time))??[]})().then(e=>{m(e)})},[a,d]);let h=d===`append`?p.length:e?.bills.length??0;return(0,$.jsx)(ne,{title:`导入预览`,onBack:t,className:`h-full overflow-hidden rounded-md`,right:(0,$.jsx)(x,{disabled:s||h<=0,onClick:()=>{d===`append`?n?.({bills:p,meta:e?.meta,strategy:`append`,asMine:l}):n?.({bills:e?.bills??[],meta:e?.meta,strategy:`overlap`,asMine:l})},children:i(`confirm`)}),children:(0,$.jsxs)(`div`,{className:`relative flex-1 flex flex-col w-full gap-2 overflow-hidden`,children:[(0,$.jsxs)(`div`,{className:`flex flex-col px-4 gap-3`,children:[(0,$.jsxs)(`div`,{className:`opacity-60 text-sm`,children:[i(`import-strategy`),`:`,(0,$.jsx)(`span`,{children:`${i(`import-description`)}`})]}),(0,$.jsxs)(Cn,{value:d,className:`flex flex-col gap-2`,onValueChange:e=>f(e===`append`?`append`:`overlap`),children:[(0,$.jsxs)(v,{className:`flex gap-2`,children:[(0,$.jsx)(wn,{value:`append`}),i(`strategy-add`)]}),(0,$.jsxs)(v,{className:`flex gap-2`,children:[(0,$.jsx)(wn,{value:`overlap`}),i(`strategy-overlap`)]})]})]}),(0,$.jsxs)(`div`,{className:`flex flex-col px-4 gap-3`,children:[(0,$.jsxs)(`div`,{children:[(0,$.jsx)(`div`,{className:`opacity-60 text-sm`,children:i(`put-ledgers-on-me`)}),(0,$.jsx)(T,{checked:l,onCheckedChange:u})]}),!l&&(0,$.jsx)(`p`,{className:`text-xs text-red-700`,children:i(`unkown-users-may-show-up-when-analyze`)})]}),(0,$.jsxs)(`div`,{className:`flex-1 flex flex-col px-4 gap-3 overflow-hidden`,children:[(0,$.jsxs)(`p`,{className:`opacity-60 text-sm`,children:[i(`preview`),`:`]}),d===`append`?(0,$.jsx)(`div`,{children:i(`append-preview-description`,{n:(0,$.jsx)(`span`,{className:`text-green-700`,children:h})})}):(0,$.jsx)(`div`,{children:(0,$.jsx)(`div`,{className:`text-red-700`,children:i(`overlap-preview-description`,{n:(0,$.jsx)(`span`,{className:`text-red-700`,children:h})})})})]}),s&&(0,$.jsx)(`div`,{className:`absolute top-0 left-0 w-full h-full bg-background/60 flex items-center justify-center`,children:(0,$.jsx)(`i`,{className:`icon-[mdi--loading] animate-spin`})})]})})},{dialogTitle:`experimental-functions`,dialogModalClose:!0,contentClassName:`h-full w-full max-h-full max-w-full rounded-none sm:rounded-md sm:max-h-[min(520px,calc(100vh-32px))] sm:w-[90vw] sm:max-w-[500px]`}),Dn=async e=>{let{strategy:t,asMine:n,...r}=e,i=ee(N.getState().infos?.meta??{}),a=t===`overlap`?r.meta:(()=>{if(!r.meta?.categories)return D(i,r.meta);let e=ee(ie((i.categories?.length??0)===0?M:i.categories,[...r.meta?.categories??[]])),t=D(i,r.meta);return b(M,e)?t.categories=void 0:t.categories=e,t})(),o=k.getState().currentBookId;if(!o)return;let c=s.getState().id;await S.batch(o,[...r.bills.map(e=>({id:e.id,type:`update`,value:{...e,creatorId:n?c:e.creatorId},timestamp:e.__update_at})),{type:`meta`,metaValue:a}],t===`overlap`)},On=R({id:F().describe(`账单的唯一标识，应保证唯一。建议使用 crypto.randomUUID()，或 time 与序号拼接形式。`),type:I([`income`,`expense`]).describe(`账单类型：income(收入) 或 expense(支出)。`),categoryId:F().describe(`账单分类的 id。必须引用一个已存在的分类（先调用 getAccountMeta 获取可用分类），或者在 meta.categories 中新增自定义分类后再使用其 id。`),creatorId:_e([z(),F()]).describe(`创建者 id。若不确定，可填写 0。`),comment:F().optional().describe(`备注。导入时不确定的信息也可保存在这里。`),amount:z().int().describe(`整数金额，单位为分的一万分之一（实际金额 × 10000）。例如 ¥12.34 应写作 123400；¥0.01 应写作 100。切勿直接传入人民币元值。`),time:z().describe(`账单发生时间，毫秒级 epoch 时间戳（Date.now() 同单位）。`),images:B(F()).optional().describe(`账单图片附件，字符串数组。每个元素可以是 (1) data: URI（如 'data:image/png;base64,...'）；(2) 公网可访问的 http(s) URL。请勿传入本地文件路径。`),location:R({latitude:z(),longitude:z(),accuracy:z()}).optional().describe(`地理位置（可选）。`),tagIds:B(F()).optional().describe(`标签 id 数组。必须引用已存在的标签 id（通过 getAccountMeta 获取），或在 meta.tags 中新增标签后再使用其 id。`),currency:R({base:F().describe(`记账时的本位币代码，如 CNY。`),target:F().describe(`实际记账币种代码。`),amount:z().describe(`原始记账金额（人类可读金额，例如 12.34），不需要 ×10000。`)}).optional().describe(`多币种信息（可选）。`)}).describe(`单笔账单，字段含义对应 Cent 的 Bill 类型。`),kn=R({type:I([`income`,`expense`]),name:F(),id:F(),icon:F().optional().default(``),color:F().optional().default(``),customName:ge(!0).describe(`新增分类必须为 true。`),parent:F().optional().describe(`父类 id，留空表示该项本身就是父类。`)}).describe(`新增的自定义分类。仅在已有分类中没有合适项时新增，否则应复用 getAccountMeta 返回的已有分类。`),An=R({id:F(),name:F()}).describe(`新增的标签。仅在已有标签中没有合适项时新增。`),jn=R({categories:B(kn).optional().describe(`本次导入需要新增的分类。`),tags:B(An).optional().describe(`本次导入需要新增的标签。`)}).partial().optional().describe(`可选的全局配置增量。只放本次导入新增的分类/标签，不要重复已有项。`),Mn=X({name:`importBills`,describe:`导入一批 AI 生成的账单到 Cent。调用前应先通过 getAccountMeta 获取已有的分类和标签，以便为每条账单选择合理的 categoryId / tagIds。金额字段 amount 必须为整数 ×10000；时间字段 time 为毫秒 epoch；图片可用 data: URI 内联。调用后会弹出导入预览对话框，由用户最终确认是否写入账本。`,argSchema:R({items:B(On).min(1).describe(`待导入的账单列表，至少一条。`),meta:jn}).describe(`符合 Cent ExportedJSON 结构的导入数据。生成前请先调用 getAccountMeta 获取现有分类与标签，复用已有的 id；只有在没有合适项时才在 meta 中新增。`),returnSchema:R({ok:L().describe(`是否成功导入。`),imported:z().optional().describe(`成功导入的账单数量（ok=true 时存在）。`),strategy:I([`append`,`overlap`]).optional().describe(`用户选择的导入策略（ok=true 时存在）。`),reason:F().optional().describe(`失败原因，例如 'user_cancelled'（ok=false 时存在）。`)}),handler:async e=>{let t=await En({bills:e.items,meta:e.meta});return t?(await Dn(t),{ok:!0,imported:e.items.length,strategy:t.strategy}):{ok:!1,reason:`user_cancelled`}}}),Nn=R({startTime:F().optional().describe(`YYYY-MM-DD`),endTime:F().optional().describe(`YYYY-MM-DD`),categoryNames:B(F()).optional().describe(`分类名（逗号分隔，支持模糊匹配）`),tagNames:B(F()).optional().describe(`标签名（逗号分隔）`),keyword:F().optional().describe(`备注关键词`),minAmount:z().optional().describe(`金额范围（数字）`),maxAmount:z().optional().describe(`金额范围（数字）`),billType:I([`income`,`expense`]).optional().describe(`income 或 expense`)});async function Pn(){let e=N.getState(),t=await e.refreshBillList(),n=e.infos?.meta;if(!n)throw Error(`Ledger meta not found`);return{items:t,meta:n}}var Fn=X({name:`queryBills`,describe:`查询原始账单明细。用于按时间/分类/标签/关键字/金额筛选具体账单。注意如果没有设置合理筛选条件，该工具有可能返回大量账单数据，因此必须谨慎使用，适用场景：查找单笔交易时，或者有明确的时间范围。`,argSchema:Nn,returnSchema:R({bills:B(V(F(),P())),statistics:R({total:z(),totalIncome:z(),totalExpense:z(),netAmount:z()})}),handler:async e=>{let t=gn(e,await Pn());return{bills:t.bills.map(e=>({...e,amount:e.amount/1e4})),statistics:{...t.statistics,totalIncome:t.statistics.totalIncome/1e4,totalExpense:t.statistics.totalExpense/1e4,netAmount:t.statistics.netAmount/1e4}}}}),In=X({name:`analyzeBills`,describe:`账单统计与分析。优先用于总额、占比、趋势和概况分析。`,argSchema:Nn.extend({groupBy:I([`category`,`tag`,`day`,`month`,`year`,`type`]).optional().describe(`分组维度，可选值：category/tag/day/month/year/type（category: 按分类统计，tag: 按标签统计，day: 按日统计，month: 按月统计）`),limit:z().int().positive().optional().describe(`返回前几项（数字，默认10）`),includeTrend:L().optional().describe(`true 或 false (是否包含时间趋势数据，用于分析波动)`)}),returnSchema:R({meta:R({totalAmount:z(),count:z(),currency:F(),dateRange:F()}),distribution:B(R({name:F(),amount:z(),percentage:F(),count:z()})),trend:B(R({date:F(),amount:z()})).optional()}),handler:async e=>xn(e,await Pn())}),Ln=X({name:`getAccountMeta`,describe:`获取账本信息，用于获取当前账本定义的分类结构和标签列表。`,argSchema:R({}),returnSchema:R({categories:R({all:B(V(F(),P())),tree:V(F(),B(V(F(),P()))),roots:B(V(F(),P()))}),tags:B(V(F(),P())),currencies:B(he().describe(`Custom Currency object`))}),handler:async()=>_n((await Pn()).meta)}),Rn=`---
name: playground
description: Use a sandboxed JavaScript worker to execute small snippets for calculation, data shaping, and behavior verification.
---

# Playground Tool

\`playground\` lets the assistant run JavaScript module code in an isolated web-worker sandbox.

## When to use

- Quick calculations that are easier to validate with code
- Data transformation checks (map/filter/reduce/grouping)
- Small logic experiments before writing production code

## Input contract

The tool expects:

- \`code\` (required): JavaScript module source code
- \`args\` (optional): array of arguments passed to default export
- \`timeoutMs\` (optional): execution timeout, default is \`2000\`
- \`whiteList\` (optional): allowed global APIs inside sandbox

The runtime also injects a global helper:

- \`getFile(index)\` (1-based): get uploaded file payload from the current session history

\`getFile(index)\` returns:

- \`index\`: file index (starts from \`1\`)
- \`name\`: original filename
- \`type\`: MIME type
- \`size\`: file size (bytes)
- \`lastModified\`: file timestamp
- \`text\`: file text content

\`code\` must export a default function:

\`\`\`js
export default function main(input) {
  return { ok: true, size: Array.isArray(input) ? input.length : 0 };
}
\`\`\`

## Example call

\`\`\`json
{
  "name": "playground",
  "params": {
    "code": "export default function () { const file = getFile(1); return { fileName: file?.name ?? null, first20: file?.text?.slice(0, 20) ?? null }; }"
  }
}
\`\`\`

## Output

- \`success: true\` with \`result\` when execution succeeds
- \`success: false\` with \`error\` when parsing/execution/timeout fails

## Notes

- Keep snippets small and deterministic
- Avoid depending on blocked globals (network, timers, DOM, dynamic eval)
- Use \`getFile(index)\` when you need to parse or inspect user-uploaded files
`;function zn(e){return e instanceof Error?e.message:String(e)}async function Bn(e){return e.flatMap(e=>e.role===`user`&&e.assets?.length?e.assets:[]).map((e,t)=>({index:t+1,file:e}))}var Vn=X({name:`playground`,describe:`Execute JavaScript module code in a sandboxed worker. Supports getFile(index) for uploaded files in this conversation.`,argSchema:R({code:F().min(1).describe(`JavaScript module source code. Must export default function.`),args:B(P()).optional().describe(`Arguments passed to the default-exported function.`)}),returnSchema:R({success:L(),result:P().optional(),error:F().optional()}),handler:(async(e,t)=>{let{history:n}=t,r=ye([],void 0,await Bn(n));try{return{success:!0,result:await r.runDefaultExport(`const getFile = (index) => globalThis.__FROM_TRANSFER__.find(f => f.index === index)?.file;\n${e.code}`,e.args??[],e.timeoutMs??2e3)}}catch(e){return{success:!1,error:zn(e)}}finally{r.destroy()}})}),Hn=dt(Rn);function Un(e){let t=s.getState().id,n=N.getState().infos?.meta.personal?.[t]?.assistant;if(n?.configs&&n.configs.length>0){if(e){let t=n.configs.find(t=>t.id===e);if(t)return t}let t=n.defaultConfigId;if(t){let e=n.configs.find(e=>e.id===t);if(e)return e}}let r=n?.bigmodel?.apiKey;if(r)return{id:`legacy-bigmodel`,name:`智谱GLM (Legacy)`,apiKey:r,apiUrl:`https://open.bigmodel.cn/api/paas/v4`,model:`glm-4-flash`,apiType:`open-ai-compatible`};throw Error(`未找到 AI 配置，请先在设置中配置 AI API`)}function Wn(e){return e.apiType===`google-ai-studio`?`${e.apiUrl.endsWith(`/`)?e.apiUrl.slice(0,-1):e.apiUrl}/v1beta/models/${e.model}:streamGenerateContent?alt=sse`:e.apiUrl.endsWith(`/`)?`${e.apiUrl}chat/completions`:`${e.apiUrl}/chat/completions`}function Gn(e,t){let n={"Content-Type":`application/json`};return e===`google-ai-studio`?n[`x-goog-api-key`]=t:n.Authorization=`Bearer ${t}`,n}function Kn(e,t,n){if(e.apiType===`google-ai-studio`){let e=[],r;for(let n of t)if(n.role===`system`)r?r+=`

`+n.content:r=n.content;else{let t=n.role===`user`?`user`:`model`;e.push({role:t,parts:[{text:n.content}]})}let i={contents:e,generationConfig:{temperature:n?.temperature??.7,maxOutputTokens:n?.maxOutputTokens??n?.max_tokens??2e3}};return r&&(i.systemInstruction={parts:[{text:r}]}),i}else return{model:e.model,messages:t,stream:!0,temperature:n?.temperature??.7,max_tokens:n?.max_tokens??2e3}}async function*qn(e){let t=e.body.getReader(),n=new TextDecoder,r=``,i=``,a=``;try{for(;;){let{done:e,value:o}=await t.read();if(e)break;r+=n.decode(o,{stream:!0});let s=r.split(`
`);r=s.pop()||``;for(let e of s){let t=e.trim();if(!t||!t.startsWith(`data: `))continue;let n=t.slice(6);if(n!==`[DONE]`)try{let e=JSON.parse(n).choices?.[0]?.delta,t=e?.reasoning_content||``,r=e?.content||``;(t||r)&&(i+=t,a+=r,yield{thought:i,answer:a})}catch(e){console.warn(`Failed to parse OpenAI SSE line:`,e)}}}}finally{t.releaseLock()}}async function*Jn(e){let t=e.body.getReader(),n=new TextDecoder,r=``,i=``,a=``;try{for(;;){let{done:e,value:o}=await t.read();if(e)break;r+=n.decode(o,{stream:!0});let s=r.split(`
`);r=s.pop()||``;for(let e of s){let t=e.trim();if(!t||!t.startsWith(`data: `))continue;let n=t.slice(6);try{let e=JSON.parse(n).candidates?.[0]?.content?.parts||[],t=!1;for(let n of e)n.thought===!0||`thought`in n?(i+=n.text||``,t=!0):(a+=n.text||``,t=!0);t&&(yield{thought:i,answer:a})}catch(e){console.warn(`Failed to parse Google SSE line:`,e)}}}}finally{t.releaseLock()}}async function Yn(e,t,n,r){let i=Wn(e),a=Gn(e.apiType,t),o=Kn(e,n,{temperature:.7,max_tokens:2e3});return fetch(i,{method:`POST`,headers:a,body:JSON.stringify(o),signal:r})}async function Xn(e,t){let n=await Yn(t,t.apiKey,e);if(!n.ok){let e=await n.text();throw Error(`AI API 请求失败: ${n.status} ${n.statusText}. ${e}`)}let r=t.apiType===`google-ai-studio`?Jn:qn,i=``;for await(let e of r(n))(e.answer?.trim()||e.thought?.trim())&&(i=e.answer||``);return i}function Zn(){let e=o.getState().voiceAIConfigId;return Un(e)}async function Qn(e){let t=Zn();return Xn(e,{...t,apiKey:Se(t.apiKey)})}function $n(e,t){return e?.length?`本次用户上传了如下文件：${e.map((e,n)=>`(${t+n})[${e.name}]`).join(`, `)}。
你可以通过使用工具 PlaygroundTool，编写代码进行访问，例如使用 getFile(${t}) 获取序号为 ${t} 的文件。`:``}function er(e,t=1e4){if(e.length<=t)return e;let n=e.slice(0,t/2),r=e.slice(-t/2);return console.warn(`Text truncated: ${e.length} -> ${t}`),`${n}...（返回值过长，已截断）...${r}`}function tr(e){return er(JSON.stringify(e))}function nr(e){let t=`[工具调用: ${e.formatted.name}]\n`;return t+=`参数: ${JSON.stringify(e.formatted.params,null,2)}\n`,e.formatted.returns!==void 0&&(t+=`返回结果: ${tr(e.formatted.returns)}`),e.formatted.errors!==void 0&&(t+=`错误: ${tr(e.formatted.errors)}`),t}function rr(e){let t=[];for(let n of e)if(n.role===`user`){let e=n.raw,r=n.assets&&n.assets.length>0?$n(n.assets,1):void 0;t.push({role:`user`,content:`${r?`${r}\n`:``}${e}`})}else n.role===`assistant`?t.push({role:`assistant`,content:n.raw}):n.role===`tool`?t.push({role:`user`,content:nr(n)}):n.role===`system`&&t.push({role:`system`,content:n.raw});return t}var ir={request({history:e}){console.log(`History:`,e);let t=!1,r=null;return ft((async()=>{let i=Un(),a=Se(i.apiKey),o=await(async()=>i.model===`glm-4-flash`?rr([{role:`system`,raw:(await n(()=>import(`./strict-system-prompt-D6MIx3vd.js`),[])).default},...e.filter(e=>e.role!==`system`)]):rr(e))();r=new AbortController,t&&r.abort();let s=await Yn(i,a,o,r.signal);if(!s.ok){let e=await s.text();throw Error(`AI API 请求失败: ${s.status} ${s.statusText}. ${e}`)}return i.apiType===`google-ai-studio`?Jn(s):qn(s)})(),()=>{t=!0,r?.abort()})}},ar=`# Widget API 1.0 技术规范文档

本规范定义了 Widget 脚本的结构、权限管理、用户交互及渲染逻辑。脚本需保存为 \`.js\` 文件，并遵循以下约定。

---

## 1. 脚本总体结构
每一个 Widget 脚本必须包含三个核心部分：**元数据与权限声明**（通过头部注释）、**配置表单声明**（导出对象）以及 **主渲染函数**（默认导出）。

\`\`\`javascript
/**
 * @widget-api 1.0
 * @name 资产概览组件
 * @permissions billing, budget
 */

// 1. 表单声明 (可选)
export const config = { ... };

// 2. 渲染函数 (必选)
export default async (context) => { ... };
\`\`\`

---

## 2. 权限声明 (Permissions)
Widget 必须在文件头部的 JSDoc 注释中声明其所需访问的数据权限。未声明的权限对应的上下文数据将为 \`undefined\`。

| 权限标识符 | 数据说明 | 注入上下文后的字段 |
| :--- | :--- | :--- |
| \`billing\` | 用户的账单历史、收支流水记录 | \`context.data.billing\` |
| \`filter\` | 应用当前的全局筛选状态（如时间区间、分类） | \`context.data.filter\` |
| \`budget\` | 用户的预算设置及当前执行进度数据 | \`context.data.budget\` |
| \`collaborators\` | 账本协作者信息 | \`context.data.collaborators\` |
| \`category\` | 账单类别信息 | \`context.data.categories\` |
| \`currency\` | 多币种信息 | \`context.data.currencies\` |
| \`tag\` | 账单标签信息 | \`context.data.tags\` |

### 数据结构说明

#### billing 账单流水
\`\`\`typescript
context.data.billing // Bill[]

type BillType = "income" | "expense";
/** 整数金额，10000:1（即代码中的 amount 数值需除以 10000 才是实际金额） */
type Amount = number;
type GeoLocation = { latitude: number; longitude: number; accuracy: number };

type Bill = {
  /** 每笔账单的唯一标识 */
  id: string;
  /** 账单类型，代表收入或者支出 */
  type: BillType;
  /** 账单的类别 id（对应 BillCategory.id），可以是父类或子类 */
  categoryId: string;
  /** 创建者的 id */
  creatorId: number | string;
  /** 备注 */
  comment?: string;
  /** 整数金额，10000:1 */
  amount: Amount;
  /** 账单发生的时间（毫秒时间戳） */
  time: number;
  /** 账单的图片附件 */
  images?: (File | string)[];
  /** 账单的地址 */
  location?: GeoLocation;
  /** 账单的 tag id 列表 */
  tagIds?: string[];
  /** 多币种信息 */
  currency?: {
    /** 记账当时设置的本位币 */
    base: string;
    /** 记账当时选择的币种 */
    target: string;
    /** 记账当时填写的金额（非 10000:1 缩放） */
    amount: number;
  };
  /** 其他额外信息 */
  extra?: {
    scheduledId?: string;
  };
};
\`\`\`

#### filter 全局筛选状态
\`\`\`typescript
context.data.filter // BillFilter（无筛选时为 {}）

type BillFilter = Partial<{
  /** 备注关键字 */
  comment: string;
  /** 相对时间区间（与 start/end 二选一） */
  recent?: {
    value: number;
    unit: "year" | "month" | "week" | "day";
  };
  /** 起始时间（毫秒时间戳） */
  start: number;
  /** 结束时间（毫秒时间戳） */
  end: number;
  /** 限定收/支类型 */
  type: BillType | undefined;
  /** 限定创建者 id 列表 */
  creators: (string | number)[];
  /** 限定分类 id 列表 */
  categories: string[];
  /** 最小金额（实际金额，非 10000:1 缩放） */
  minAmountNumber: number;
  /** 最大金额（实际金额，非 10000:1 缩放） */
  maxAmountNumber: number;
  /** 是否仅资产相关 */
  assets?: boolean;
  /** 是否仅周期记账生成 */
  scheduled?: boolean;
  /** 必须包含的标签 id */
  tags?: string[];
  /** 排除的标签 id */
  excludeTags?: string[];
  /** 展示用的本位币 */
  baseCurrency: string;
  /** 限定币种列表 */
  currencies?: string[];
}>;
\`\`\`

#### budget 预算
\`\`\`typescript
context.data.budget // Budget[]

type Budget = {
  /** 预算唯一标识 */
  id: string;
  /** 预算名称 */
  title: string;
  /** 预算起始时间（毫秒时间戳） */
  start: number;
  /** 预算结束时间（毫秒时间戳，可选） */
  end?: number;
  /** 预算重复周期 */
  repeat: {
    unit: "week" | "day" | "month" | "year";
    value: number;
  };
  /** 参与者（创建者 id 列表） */
  joiners: (string | number)[];
  /** 总预算金额（整数，10000:1） */
  totalBudget: number;
  /** 分类预算明细 */
  categoriesBudget?: {
    /** 分类 id */
    id: string;
    /** 该分类的预算金额（整数，10000:1） */
    budget: number;
  }[];
  /** 仅统计这些标签 */
  onlyTags?: string[];
  /** 排除这些标签 */
  excludeTags?: string[];
};
\`\`\`

> 注：\`budget\` 中仅包含预算的配置数据，**不包含已使用进度**。如需统计已用金额，需结合 \`billing\` 数据按 \`start\`/\`end\`/\`categoriesBudget\`/\`onlyTags\`/\`excludeTags\` 等字段自行计算。

#### collaborators 协作者信息
\`\`\`javascript
context.data.collaborators // Array<{ id: string | number; name: string; avatar_url?: string; ... }>
\`\`\`

#### categories 账单类别
\`\`\`javascript
context.data.categories // Array<{ id: string; name: string; type: 'income' | 'expense'; icon: string; color: string; parent?: string; ... }>
\`\`\`

#### currencies 多币种
\`\`\`javascript
context.data.currencies // { base: string; custom?: Array<{ id, name, symbol, rateToBase }>; quick?: string[] }
\`\`\`

#### tags 账单标签
\`\`\`javascript
context.data.tags // Array<{ id: string; name: string; preferCurrency?: string; ... }>
| \`collaborators\` | 账本协作者信息 | \`context.data.collaborators\` |
| \`category\` | 账单分类信息 | \`context.data.categories\` |
| \`currency\` | 多币种配置信息 | \`context.data.currencies\` |
| \`tag\` | 账单标签信息 | \`context.data.tags\` |

---

## 3. 表单声明 (Config Form)
通过导出 \`config\` 对象，Widget 可以要求用户在放置组件前输入特定的配置参数。这些参数将通过 \`context.settings\` 注入渲染函数。

### 表单配置项类型
* **text**: 文本输入框。
* **number**: 数字输入框
* **date**: 日期选择器。
* **select**: 下拉单选。

**示例：**
\`\`\`javascript
export const config = {
  title: { type: 'text', label: '组件标题', default: '我的账单' },
  threshold: { type: 'number', label: '预警阈值', default: 1000 },
  category: { type: 'select', label: '统计分类', options: ['餐饮', '交通', '购物'] },
  time: { type: 'date', label: '开始时间' },
};
\`\`\`

---

## 4. 渲染函数 (Render Function)
Widget 脚本必须默认导出一个函数（支持 \`async\`）。该函数是 Widget 的生命周期核心，负责将数据转化为 UI 描述。

### 函数签名
\`export default async function(context): DSL\`

### 参数：\`context\` 对象
\`context\` 是一个只读对象，包含了脚本运行所需的所有外部信息：

| 属性 | 类型 | 说明 |
| :--- | :--- | :--- |
| \`data\` | \`Object\` | 包含已授权读取的业务数据（如 \`data.billing\`）。 |
| \`settings\` | \`Object\` | 包含用户在“表单声明”中填写的数值。 |
| \`env\` | \`Object\` | 包含系统环境信息，如 \`env.theme\` (light/dark) 或 \`env.language\`。 |

---

## 5. UI 描述语言 (DSL)
渲染函数必须返回由预定义帮助函数构建的 DSL 对象。这些函数支持链式调用以配置样式。

### 基础组件库
* **\`Flex(...children)\`**: 容器组件。
    * \`.direction(value)\`: 布局方向，可选 \`'row' | 'column'\`。
    * \`.justify(value)\`: 对齐方式，如 \`'center' | 'space-between'\`。
    * \`.align(value)\`: 交叉轴对齐，如 \`'center' | 'stretch'\`。
    * \`.gap(value)\`: 子元素间距（数字）。
* **\`Text(content)\`**: 文本组件。
    * \`.fontSize(value)\`: 字号。
    * \`.color(value)\`: 颜色（Hex 或 rgba 字符串）。
    * \`.bold(bool)\`: 是否加粗。
* **\`Image(src)\`**: 图片组件。
    * \`.width(value)\` / \`.height(value)\`: 尺寸。
    * \`.mode(value)\`: 裁剪模式，如 \`'cover' | 'contain'\`。
* **\`Container(...children)\`**: 万能容器，支持更多样式属性如 \`.bg()\`, \`.padding()\`, \`.borderRadius()\`。

---

## 6. 完整代码示例
以下是一个标准的 Widget 脚本实现参考：

\`\`\`javascript
/**
 * @widget-api 1.0
 * @name 预算进度条
 * @permissions budget, billing
 */

export const config = {
  showPercent: { type: 'select', label: '显示百分比', options: ['是', '否'], default: '是' }
};

export default async ({ data, settings }) => {
  // data.budget 为 Budget[]，这里取第一个预算演示
  const budget = (data.budget ?? [])[0];
  if (!budget) return Text('暂无预算').color('#999');

  // amount 为 10000:1 的整数金额，需统一换算为实际数值
  const total = budget.totalBudget / 10000;

  // budget 中不包含已使用进度，需从 billing 中按预算的时间范围与参与者过滤累计支出
  const start = budget.start;
  const end = budget.end ?? Date.now();
  const used = (data.billing ?? [])
    .filter(b =>
      b.type === 'expense' &&
      b.time >= start && b.time <= end &&
      budget.joiners.includes(b.creatorId)
    )
    .reduce((sum, b) => sum + b.amount / 10000, 0);

  const ratio = total > 0 ? used / total : 0;
  const isWarning = ratio > 0.9;

  return Flex(
    Text(budget.title || "预算进度").fontSize(14).color('#999'),
    Flex(
      Container().bg(isWarning ? 'red' : 'green').width(\`\${Math.min(ratio, 1) * 100}%\`).height(8),
      Container().bg('#eee').width(\`\${Math.max(1 - ratio, 0) * 100}%\`).height(8)
    ).direction('row').borderRadius(4).padding(2),
    settings.showPercent === '是' ? Text(\`\${Math.round(ratio * 100)}%\`).bold() : null
  ).direction('column').gap(8);
};
\`\`\`

---

## 7. 执行约束
1.  **纯净性**：渲染函数应尽可能为纯函数，不建议在函数内部产生副作用（如修改全局变量）。
2.  **超时**：渲染函数执行时间不得超过 2000ms，否则系统将强制终止。
3.  **安全性**：脚本无法访问 \`eval\`, \`Function\` (构造函数), \`XMLHttpRequest\`, \`WebSocket\` 以及任何 DOM 元素。`;function or({config:e,settings:t,onChange:n}){let i=r();if(Object.keys(e).length===0)return null;let a=(e,r)=>{let a=t[e]??r.default??``;switch(r.type){case`text`:return(0,$.jsx)(y,{id:`config-${e}`,type:`text`,value:a,onChange:t=>n(e,t.target.value),className:`flex-1 h-8 text-xs`,placeholder:r.label});case`number`:return(0,$.jsx)(y,{id:`config-${e}`,type:`number`,value:a,onChange:t=>n(e,parseFloat(t.target.value)||0),className:`flex-1 h-8 text-xs`,placeholder:r.label});case`date`:return(0,$.jsx)(y,{id:`config-${e}`,type:`date`,value:a,onChange:t=>n(e,t.target.value),className:`flex-1 h-8 text-xs`});case`select`:return(0,$.jsxs)(de,{value:a,onValueChange:t=>n(e,t),children:[(0,$.jsx)(oe,{className:`flex-1 h-8 text-xs`,children:(0,$.jsx)(re,{placeholder:i(`select-placeholder`)})}),(0,$.jsx)(se,{children:r.options?.map(e=>(0,$.jsx)(le,{value:e,children:e},e))})]});default:return null}};return(0,$.jsxs)(`div`,{className:`px-4 py-2 border-b space-y-2`,children:[(0,$.jsx)(`div`,{className:`text-xs font-medium text-muted-foreground mb-2`,children:i(`widget-config`)}),Object.entries(e).map(([e,t])=>(0,$.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,$.jsx)(v,{htmlFor:`config-${e}`,className:`text-xs min-w-[80px]`,children:t.label}),a(e,t)]},e))]})}var sr=`/**
 * @widget-api 1.0
 * @name My Widget
 * @permissions billing
 */

export const config = {
  title: { type: 'text', label: '组件标题', default: '我的账单' },
  showCount: { type: 'select', label: '显示数量', options: ['是', '否'], default: '是' }
};

export default async ({ data, settings }) => {
    const bills = data.billing || [];
    const total = bills.reduce((sum, bill) => sum + bill.amount, 0);
    const title = settings.title || '我的账单';
    const showCount = settings.showCount === '是';
    
    return Flex(
        Text(title).fontSize(16).bold(),
        Text("Total: " + total).fontSize(14),
        showCount ? Text("Bills: " + bills.length).fontSize(12) : null
    ).direction('column').gap(8);
};
`;function cr({edit:e,onCancel:t}){let n=r(),{add:i,update:a}=ce(),[o,s]=(0,Q.useState)(e?.code??sr),[l,u]=(0,Q.useState)(e?.settings??{}),[d,f]=(0,Q.useState)(null),[p,m]=(0,Q.useState)(null),[h,g]=(0,Q.useState)(!0),[_,v]=(0,Q.useState)({billing:!1,filter:!1,budget:!1,collaborators:!1,category:!1,currency:!1,tag:!1}),[y,ee]=(0,Q.useState)({billing:!0,filter:!0,budget:!0,collaborators:!0,category:!0,currency:!0,tag:!0}),b=N(e=>e.bills),S=N(e=>e.infos?.meta.budgets),C=N(e=>e.infos?.creators),w=N(e=>e.infos?.meta.categories),T=N(e=>e.infos?.meta.baseCurrency),E=N(e=>e.infos?.meta.customCurrencies),D=N(e=>e.infos?.meta.quickCurrencies),O=N(e=>e.infos?.meta.tags),{theme:k}=ve(),A=(0,Q.useMemo)(()=>{try{return Ce(o)}catch{return null}},[o]);(0,Q.useEffect)(()=>{A&&v({billing:A.permissions.includes(H.Billing),filter:A.permissions.includes(H.Filter),budget:A.permissions.includes(H.Budget),collaborators:A.permissions.includes(H.Collaborators),category:A.permissions.includes(H.Category),currency:A.permissions.includes(H.Currency),tag:A.permissions.includes(H.Tag)})},[A]);let te=(0,Q.useCallback)(async()=>({bills:b,budgets:S,filter:{},creators:C,categories:w,baseCurrency:T,customCurrencies:E,quickCurrencies:D,tags:O}),[b,S,C,w,T,E,D,O]),j=(0,Q.useCallback)(async()=>{if(!A){m(`Invalid widget code`),f(null),g(!1);return}let e=Object.entries(y).filter(([,e])=>e).map(([e])=>e);if(A.permissions.some(t=>!e.includes(t))){m(`Some permissions are not allowed`),f(null),g(!1);return}g(!0);try{let e=await xe(o,{settings:l,getData:te,env:{theme:k===`dark`||k===`system`&&window.matchMedia(`(prefers-color-scheme: dark)`).matches?`dark`:`light`,language:`zh-CN`}});e.success&&e.result?(f(e.result?._node??e.result),m(null)):(m(e.error??`Unknown error`),f(null))}catch(e){m(e instanceof Error?e.message:String(e)),f(null)}finally{g(!1)}},[o,A,y,l,te,k]);(0,Q.useEffect)(()=>{let e=setTimeout(j,500);return()=>clearTimeout(e)},[j]);let re=(0,Q.useCallback)((e,t)=>{u(n=>({...n,[e]:t}))},[]);return(0,$.jsx)(ne,{onBack:t,title:e?.id?n(`edit-widget`):n(`add-widget`),className:`h-full overflow-hidden`,children:(0,$.jsxs)(`div`,{className:`flex flex-col h-full overflow-hidden`,children:[(0,$.jsx)(`div`,{className:`flex-1 flex flex-col overflow-y-auto`,children:(0,$.jsxs)(`div`,{className:`flex flex-col`,children:[(0,$.jsxs)(`div`,{className:`px-4 py-2 flex items-center gap-2 border-b`,children:[(0,$.jsx)(`div`,{className:`text-sm font-medium`,children:n(`widget-permissions`)}),Object.entries(_).map(([e,t])=>t&&(0,$.jsxs)(`label`,{className:`flex items-center gap-1 text-xs`,children:[(0,$.jsx)(`input`,{type:`checkbox`,checked:y[e],onChange:t=>ee(n=>({...n,[e]:t.target.checked})),className:`size-3`}),n(`permission-${e}`)]},e))]}),A?.config&&(0,$.jsx)(or,{config:A.config,settings:l,onChange:re}),(0,$.jsxs)(`div`,{className:`flex-1 flex flex-col overflow-hidden flex-shrink-0`,children:[(0,$.jsxs)(`div`,{className:`flex flex-col overflow-hidden`,children:[(0,$.jsx)(`div`,{className:`px-4 py-2 text-xs font-medium border-b bg-muted/50`,children:n(`widget-preview`)}),(0,$.jsx)(`div`,{className:`p-4 flex justify-center items-start`,children:h?(0,$.jsx)(`div`,{className:`max-w-[320px] w-full h-[120px] bg-card rounded-lg shadow-lg`,children:(0,$.jsx)(Te,{})}):p?(0,$.jsx)(`div`,{className:`text-red-500 text-xs whitespace-pre-wrap select-text`,children:p}):(0,$.jsx)(`div`,{className:`max-w-[320px] w-full h-[120px] bg-card rounded-lg shadow-lg`,children:(0,$.jsx)(we,{dsl:d})})})]}),(0,$.jsxs)(`div`,{className:`flex-1 flex flex-col overflow-hidden border-t min-h-[400px]`,children:[(0,$.jsx)(`div`,{className:`px-4 py-2 text-xs font-medium border-b bg-muted/50`,children:n(`widget-code`)}),(0,$.jsx)(`textarea`,{value:o,onChange:e=>s(e.target.value),className:`flex-1 w-full p-4 font-mono text-xs resize-none border-none outline-none bg-background`,spellCheck:!1})]})]})]})}),(0,$.jsxs)(`div`,{className:`flex justify-end gap-2 p-4 border-t`,children:[(0,$.jsx)(x,{variant:`outline`,onClick:t,children:n(`cancel`)}),(0,$.jsx)(x,{onClick:async()=>{if(!A){c.error(n(`widget-invalid-code`));return}let r={name:A.name||`Untitled Widget`,code:o,permissions:A.permissions,settings:l};e?.id?await a(e.id,r):await i(r),t?.()},children:n(`save`)})]})]})})}var[lr,ur]=m(cr,{dialogTitle:`Widget Edit`,dialogModalClose:!0,contentClassName:`h-full w-full max-h-full max-w-full rounded-none sm:rounded-md sm:max-h-[90vh] sm:w-[90vw] sm:max-w-[900px]`}),dr=`---
name: widget
description: Author and preview a Cent widget. Use this skill before calling \`createWidget\` to ensure the generated code follows the Widget DSL contract (header metadata, permissions, config schema, default export, DSL builders).
---

# Widget Skill

Use the \`createWidget\` tool to open the widget editor with AI-generated code for preview and saving. Before generating code, follow the Widget API reference below to produce valid widgets.

## When to use

- The user asks to create, draft, or prototype a widget
- The user wants to visualize ledger data with a custom small component
- The user wants to iterate on an existing widget idea

## Workflow

1. Read the API reference (embedded below) to understand the available DSL nodes, permissions, data shapes, and config form schema.
2. Write a complete widget source file:
   - Top-of-file JSDoc-style header declaring \`@widget-api\`, \`@name\`, and \`@permissions\`
   - Optional \`export const config = { ... }\` for user-tunable settings
   - \`export default async ({ data, settings, env }) => DSLNode\` as the main entry
3. Call the \`createWidget\` tool with \`{ code }\` containing the full widget source.
4. The editor opens with a live preview. The user can tweak settings, save, or cancel.

## Output contract

The \`createWidget\` tool returns \`{ saved, cancelled }\`:

- \`saved: true\` — user accepted and persisted the widget
- \`cancelled: true\` — user dismissed without saving

If cancelled, ask the user what to adjust before re-invoking.

---

# Widget API Reference

The following section is the authoritative Widget API documentation. All generated widget code MUST conform to it.

`,fr=X({name:`createWidget`,describe:"创建一个新的 widget 预览。传入符合 widget DSL 规范的代码，弹出 widget 编辑器进行预览与保存。代码必须以 `export default async ({ data, settings, env }) => { ... }` 形式导出，并在文件顶部以注释声明 `@widget-api`、`@name`、`@permissions`。可在 `data` 中读取 billing/budgets/categories/tags 等数据。调用前请先阅读 `widget` skill 了解完整 API。",argSchema:R({code:F().min(1).describe(`Widget 源代码（ES Module 格式），需 default export 一个返回 DSL 节点的 async 函数。`)}),returnSchema:R({saved:L().describe(`用户是否保存了 widget`),cancelled:L().describe(`用户是否取消`)}),handler:async e=>{try{return await ur({code:e.code}),{saved:!0,cancelled:!1}}catch{return{saved:!1,cancelled:!0}}}}),pr=dt(`${dr}\n\n${ar}\n`),mr={tools:[fn,In,Fn,Ln,Mn,Vn,fr].map(e=>ke(e)),skills:[Hn,pr],provider:ir,systemPrompt:`你是一个专业的记账助手，必须基于工具返回的数据回答，禁止臆造数据。`};export{Xn as a,En as c,dn as d,un as f,Qn as i,Sn as l,Lt as m,lr as n,Tn as o,ln as p,ur as r,Dn as s,mr as t,hn as u};