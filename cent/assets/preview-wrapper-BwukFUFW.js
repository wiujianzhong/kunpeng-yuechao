import{a as e}from"./rolldown-runtime-COnpUsM8.js";import{v as t}from"./dndkit-DFWEzLie.js";import{s as n}from"./locale-7lKexmOl.js";import{n as r}from"./user-DZnWzXVB.js";import{t as i}from"./storage-B3zcorQQ.js";import{T as a,U as o,k as s,v as c,w as l}from"./select-fzPjri0R.js";var u=e(o(),1),d;function f(e){d=e}function p(e){let t=c.getState(),n=t.infos?.meta,o=t.infos?.creators??[],l=a.getState(),d=l.books.find(e=>e.id===l.currentBookId),f=[...s,...n?.categories??[]],p=n?.tags??[],m=[],h=r.getState(),g=h.id!==-1&&h.id!==0&&!!h.id;if(m.push(`## 当前环境信息`),m.push(``),m.push(`**当前时间**: ${(0,u.default)().format(`YYYY-MM-DD HH:mm:ss`)}`),g?m.push(`**当前用户**: ${h.name||`(未命名)`} (id: ${h.id})`):m.push(`**当前用户**: 未登录`),m.push(`**登录方式**: ${i.name}${i.type?` (${i.type})`:``}`),d?m.push(`**当前账本**: ${d.name}${d.id?` (id: ${d.id})`:``}`):l.currentBookId?m.push(`**当前账本 ID**: ${l.currentBookId}`):m.push(`**当前账本**: 未选中`),m.push(``),!e)return m.join(`
`);if(e.filterView){m.push(`### 当前选中的过滤视图`),m.push(`- **视图名称**: ${e.filterView.name}`),e.filterView.displayCurrency&&m.push(`- **显示货币**: ${e.filterView.displayCurrency}`),m.push(``);let t=e.filterView.filter;if(t.start||t.end){let e=t.start?(0,u.default)(t.start).format(`YYYY-MM-DD`):`不限`,n=t.end?(0,u.default)(t.end).format(`YYYY-MM-DD`):`不限`;m.push(`- **时间范围**: ${e} 至 ${n}`)}if(t.type){let e=t.type===`income`?`收入`:t.type===`expense`?`支出`:`全部`;m.push(`- **账单类型**: ${e}`)}if(t.categories&&t.categories.length>0){let e=t.categories.map(e=>f.find(t=>t.id===e)?.name??e).filter(Boolean);m.push(`- **分类**: ${e.join(`、`)}`)}if(t.tags&&t.tags.length>0){let e=t.tags.map(e=>p.find(t=>t.id===e)?.name??e).filter(Boolean);m.push(`- **包含标签**: ${e.join(`、`)}`)}if(t.excludeTags&&t.excludeTags.length>0){let e=t.excludeTags.map(e=>p.find(t=>t.id===e)?.name??e).filter(Boolean);m.push(`- **排除标签**: ${e.join(`、`)}`)}if(t.creators&&t.creators.length>0){let e=t.creators.map(e=>o.find(t=>t.id===e)?.name??String(e)).filter(Boolean);m.push(`- **创建者**: ${e.join(`、`)}`)}t.minAmountNumber!==void 0&&m.push(`- **最小金额**: ${(t.minAmountNumber/1e4).toFixed(2)} 元`),t.maxAmountNumber!==void 0&&m.push(`- **最大金额**: ${(t.maxAmountNumber/1e4).toFixed(2)} 元`),t.comment&&m.push(`- **关键词搜索**: ${t.comment}`),t.assets!==void 0&&m.push(`- **包含资产**: ${t.assets?`是`:`否`}`),t.scheduled!==void 0&&m.push(`- **包含周期记账**: ${t.scheduled?`是`:`否`}`),t.currencies&&t.currencies.length>0&&m.push(`- **货币**: ${t.currencies.join(`、`)}`),m.push(``)}if(e.viewType&&(m.push(`### 当前时间切片视图`),m.push(`- **视图类型**: ${{weekly:`周视图`,monthly:`月视图`,yearly:`年视图`,custom:`自定义视图`}[e.viewType]||e.viewType}`),m.push(``)),e.range&&e.range.length===2){let[t,n]=e.range,r=(0,u.default)(t).format(`YYYY-MM-DD`),i=(0,u.default)(n).format(`YYYY-MM-DD`);m.push(`### 当前选中的时间范围`),m.push(`- **开始时间**: ${r}`),m.push(`- **结束时间**: ${i}`),m.push(``)}return e.focusType&&(m.push(`### 当前焦点类型`),m.push(`- **焦点类型**: ${{income:`收入`,expense:`支出`,balance:`余额`}[e.focusType]||e.focusType}`),m.push(``)),m.push(`---`),m.push(``),m.push(`以上信息可以帮助你更好地理解用户当前的上下文。当用户询问账单相关问题时，请考虑这些过滤条件和时间范围。`),m.join(`
`)}function m(){return p(d)}var h=e(t(),1),g=n(),_=[`eval`,`Function`,`XMLHttpRequest`,`WebSocket`,`fetch`,`document`,`window`,`Worker`,`SharedWorker`,`ServiceWorker`,`process`,`require`,`module`,`exports`,`__dirname`,`__filename`,`indexedDB`,`IDBFactory`,`IDBDatabase`,`IDBRequest`];function v(e,t){let n=[..._];return`
        (function() {
            // --- 核心加固函数 ---
            const blockAndLock = (obj, prop) => {
                try {
                    Object.defineProperty(obj, prop, {
                        get: () => { throw new Error("SecurityError: Access to " + prop + " is blocked."); },
                        configurable: false,
                        enumerable: false
                    });
                } catch (e) {
                    // 如果无法重新定义，尝试直接设为 undefined
                    try { obj[prop] = undefined; } catch(e2) {}
                }
            };

            // 1. 深度清理原型链（防止通过 prototype 找回 API）
            const targets = [self, WorkerGlobalScope.prototype, EventTarget.prototype];
            const blockList = ${JSON.stringify(n)};
            
            targets.forEach(target => {
                if (!target) return;
                blockList.forEach(api => {
                    if (api in target) blockAndLock(target, api);
                });
            });

            // 2. 封锁构造函数逃逸
            // 禁止通过 函数实例.constructor 创建新函数
            try {
                const noOp = () => { throw new Error("SecurityError: Dynamic execution is blocked."); };
                // 覆盖 Function 构造函数
                self.constructor.constructor = noOp;
                // 覆盖异步函数构造器
                (async function(){}).constructor.constructor = noOp;
            } catch(e) {
            console.warn("Failed to lock down Function constructor:", e); 
            }
        })();
        globalThis.__FROM_TRANSFER__ = [];
        ${t}
        self.onmessage = async function(e) {
            if (e.data.type === 'init') {
                globalThis.__FROM_TRANSFER__ = e.data.transferable;
                return;
            }
            const { code, args } = e.data;
            try {
                // 此时环境已经通过 IIFE 完成了加固，直接开始执行
                const blob = new Blob([code], { type: 'application/javascript' });
                const url = URL.createObjectURL(blob);
                
                try {
                    const userModule = await import(url);
                    const renderFn = userModule.default;
                    if (typeof renderFn !== 'function') throw new Error('Must export default a function');

                    const result = await renderFn(...args);
                    self.postMessage({ success: true, result });
                } finally {
                    URL.revokeObjectURL(url);
                }
            } catch (error) {
                self.postMessage({ success: false, error: error.message });
            }
        };
    `}function y(e,t,n){let r=null,i=v(e,t),a=new Blob([i],{type:`application/javascript`}),o=URL.createObjectURL(a),s=()=>(r||(r=new Worker(o,{type:`module`}),n&&r.postMessage({type:`init`,transferable:n})),r);return{runDefaultExport:async(e,t,n=5e3)=>new Promise((i,a)=>{let o=s(),c=setTimeout(()=>{a(Error(`Timeout: code running time exceeded ${n}ms`)),o.terminate(),r=null},n);o.onmessage=e=>{clearTimeout(c),e.data.success?i(e.data.result):a(Error(e.data.error))},o.postMessage({type:`run`,code:e,args:t})}),destroy:()=>{r&&=(r.terminate(),null),URL.revokeObjectURL(o)}}}function b(e){if(!e)return``;try{return btoa(unescape(encodeURIComponent(e)))}catch(t){return console.error(`Failed to encode API Key:`,t),e}}function x(e){if(!e)return``;try{return decodeURIComponent(escape(atob(e)))}catch{return e}}var S=`theme`,C=(0,h.createContext)(void 0);function w(e){let t=document.documentElement;t&&(e===`dark`?t.classList.add(`dark`):e===`light`?t.classList.remove(`dark`):window.matchMedia&&window.matchMedia(`(prefers-color-scheme: dark)`).matches?t.classList.add(`dark`):t.classList.remove(`dark`))}var T=({children:e})=>{let[t,n]=(0,h.useState)(()=>{try{return localStorage.getItem(S)??`system`}catch{return`system`}});(0,h.useEffect)(()=>{if(w(t),t===`system`&&typeof window<`u`&&window.matchMedia){let e=window.matchMedia(`(prefers-color-scheme: dark)`),t=()=>w(`system`);return e.addEventListener?e.addEventListener(`change`,t):e.addListener&&e.addListener(t),()=>{e.removeEventListener?e.removeEventListener(`change`,t):e.removeListener&&e.removeListener(t)}}},[t]);let r=(0,h.useCallback)(e=>{try{e===`system`?localStorage.removeItem(S):localStorage.setItem(S,e)}catch{}n(e)},[]),i=(0,h.useCallback)(()=>{n(e=>{let t=e===`dark`?`light`:`dark`;try{localStorage.setItem(S,t)}catch{}return t})},[]),a=(0,h.useMemo)(()=>({theme:t,setTheme:r,toggle:i}),[t,r,i]);return(0,g.jsx)(C.Provider,{value:a,children:e})};function E(){let e=(0,h.useContext)(C);if(!e)throw Error(`useTheme must be used within ThemeProvider`);return e}var D={Billing:`billing`,Filter:`filter`,Budget:`budget`,Collaborators:`collaborators`,Category:`category`,Currency:`currency`,Tag:`tag`};function O(e){let t={apiVersion:``,name:``,permissions:[]},n=e.match(/\/\*\*[\s\S]*?\*\//);if(!n)return t;let r=n[0],i=r.match(/@widget-api\s+([\d.]+)/);i&&(t.apiVersion=i[1]);let a=r.match(/@name\s+(.+)/);a&&(t.name=a[1].trim());let o=r.match(/@permissions\s+(.+)/);return o&&(t.permissions=o[1].split(`,`).map(e=>e.trim()).filter(e=>Object.values(D).includes(e))),t}function k(e){let t=e.match(/export\s+const\s+config\s*=\s*(\{[\s\S]*?\});?\s*(?:\n|$)/);return t?t[1]:null}function A(e){let t={},n=/(\w+)\s*:\s*\{([^}]+)\}/g,r=n.exec(e);for(;r!==null;){let i=r[1],a=r[2],o=a.match(/type\s*:\s*['"](\w+)['"]/),s=a.match(/label\s*:\s*['"]([^'"]+)['"]/),c=a.match(/default\s*:\s*(?:['"]([^'"]+)['"]|(\d+))/),l=a.match(/options\s*:\s*\[([\s\S]*?)\]/);if(o&&s){let e=o[1],n={type:e,label:s[1]};c&&(n.default=c[2]?parseInt(c[2]):c[1]),l&&e===`select`&&(n.options=l[1].split(`,`).map(e=>e.trim().replace(/['"]/g,``)).filter(e=>e)),t[i]=n}r=n.exec(e)}return t}function j(e){let t=O(e),n={},r=k(e);return r&&(n=A(r)),{name:t.name,apiVersion:t.apiVersion,permissions:t.permissions,config:n,code:e}}var M=`function createDSLNode(type) {
    return {
        type,
        props: {},
        children: [],
        style: {},
    };
}

function applyMethods(node) {
    const methods = {
        fontSize(value) {
            node.style.fontSize = value;
            return this;
        },
        color(value) {
            node.style.color = value;
            return this;
        },
        bold(value) {
            node.style.bold = value;
            return this;
        },
        direction(value) {
            node.style.direction = value;
            return this;
        },
        justify(value) {
            node.style.justify = value;
            return this;
        },
        align(value) {
            node.style.align = value;
            return this;
        },
        gap(value) {
            node.style.gap = value;
            return this;
        },
        width(value) {
            node.style.width = value;
            return this;
        },
        height(value) {
            node.style.height = value;
            return this;
        },
        mode(value) {
            node.style.mode = value;
            return this;
        },
        bg(value) {
            node.style.background = value;
            return this;
        },
        padding(value) {
            node.style.padding = value;
            return this;
        },
        borderRadius(value) {
            node.style.borderRadius = value;
            return this;
        },
    };
    return Object.assign(methods, { _node: node });
}

function Flex() {
    const node = createDSLNode("Flex");
    const children = Array.from(arguments).filter(Boolean);
    node.children = children.map((child) =>
        child && child._node ? child._node : child,
    );
    const proxy = applyMethods(node);
    const result = Object.create(proxy);
    result._node = node;
    return result;
}

function Text(content) {
    const node = createDSLNode("Text");
    node.props.content = content;
    const proxy = applyMethods(node);
    const result = Object.create(proxy);
    result._node = node;
    return result;
}

function Image(src) {
    const node = createDSLNode("Image");
    node.props.src = src;
    const proxy = applyMethods(node);
    const result = Object.create(proxy);
    result._node = node;
    return result;
}

function Container() {
    const node = createDSLNode("Container");
    const children = Array.from(arguments).filter(Boolean);
    node.children = children.map((child) =>
        child && child._node ? child._node : child,
    );
    const proxy = applyMethods(node);
    const result = Object.create(proxy);
    result._node = node;
    return result;
}
`;async function N(e,t){let n=j(e),r=await t.getData(),i={};n.permissions.includes(D.Billing)&&(i.billing=r.bills),n.permissions.includes(D.Filter)&&(i.filter=r.filter??{}),n.permissions.includes(D.Budget)&&(i.budget=r.budgets),n.permissions.includes(D.Collaborators)&&(i.collaborators=r.creators),n.permissions.includes(D.Category)&&(i.categories=r.categories),n.permissions.includes(D.Currency)&&(i.currencies={base:r.baseCurrency??`CNY`,custom:r.customCurrencies,quick:r.quickCurrencies}),n.permissions.includes(D.Tag)&&(i.tags=r.tags);let a={};if(n.config)for(let[e,r]of Object.entries(n.config))t.settings&&t.settings[e]!==void 0?a[e]=t.settings[e]:r.default!==void 0&&(a[e]=r.default);t.settings&&Object.assign(a,t.settings);let o={data:i,settings:a,env:{theme:t.env?.theme??`light`,language:t.env?.language??`zh-CN`}},s=y([]);try{return{success:!0,result:await s.runDefaultExport(`${M}\n${n.code}`,[o],5e3),widget:n}}catch(e){return{success:!1,error:e instanceof Error?e.message:String(e),widget:n}}finally{s.destroy()}}function P(e){let t={};return e.fontSize&&(t.fontSize=typeof e.fontSize==`number`?`${e.fontSize}px`:e.fontSize),e.color&&(t.color=e.color),e.bold&&(t.fontWeight=`bold`),e.direction&&(t.flexDirection=e.direction),e.justify&&(t.justifyContent=e.justify),e.align&&(t.alignItems=e.align),e.gap!==void 0&&(t.gap=e.gap),e.width&&(t.width=typeof e.width==`number`?`${e.width}px`:e.width),e.height&&(t.height=typeof e.height==`number`?`${e.height}px`:e.height),e.mode&&(t.objectFit=e.mode),e.background&&(t.background=e.background),e.padding!==void 0&&(t.padding=typeof e.padding==`number`?`${e.padding}px`:e.padding),e.borderRadius!==void 0&&(t.borderRadius=typeof e.borderRadius==`number`?`${e.borderRadius}px`:e.borderRadius),t}function F({node:e,path:t=``}){let n=P(e.style);switch(e.type){case`Text`:return(0,g.jsx)(`span`,{style:n,children:e.props.content});case`Image`:return(0,g.jsx)(`img`,{src:e.props.src,alt:``,style:n});case`Flex`:return(0,g.jsx)(`div`,{style:{display:`flex`,...n},children:e.children.map((e,n)=>(0,g.jsx)(F,{node:e,path:`${t}-${e.type}-${n}`},`${t}-${e.type}-${n}`))});case`Container`:return(0,g.jsx)(`div`,{style:n,children:e.children.map((e,n)=>(0,g.jsx)(F,{node:e,path:`${t}-${e.type}-${n}`},`${t}-${e.type}-${n}`))});default:return null}}function I({dsl:e,className:t}){return e?(0,g.jsx)(`div`,{className:t,children:(0,g.jsx)(F,{node:e})}):(0,g.jsx)(`div`,{className:`flex items-center justify-center text-sm opacity-50 ${t??``}`,children:`No preview available`})}function L({className:e}){return(0,g.jsx)(`div`,{className:`p-4 ${e??``}`,children:(0,g.jsxs)(`div`,{className:`space-y-3`,children:[(0,g.jsx)(l,{className:`h-4 w-3/4`}),(0,g.jsx)(l,{className:`h-4 w-1/2`})]})})}function R({code:e,settings:t={},className:n,bills:r}){let[i,a]=(0,h.useState)(null),[o,s]=(0,h.useState)(null),[u,d]=(0,h.useState)(!0),f=c(e=>e.bills),p=r??f,m=c(e=>e.infos?.meta.budgets),_=c(e=>e.infos?.creators),v=c(e=>e.infos?.meta.categories),y=c(e=>e.infos?.meta.baseCurrency),b=c(e=>e.infos?.meta.customCurrencies),x=c(e=>e.infos?.meta.quickCurrencies),S=c(e=>e.infos?.meta.tags),{theme:C}=E();return(0,h.useEffect)(()=>{let n=!0;return(async()=>{d(!0),s(null);try{j(e);let r=await N(e,{settings:t,getData:async()=>({bills:p,budgets:m,filter:{},creators:_,categories:v,baseCurrency:y,customCurrencies:b,quickCurrencies:x,tags:S}),env:{theme:C===`dark`||C===`system`&&window.matchMedia(`(prefers-color-scheme: dark)`).matches?`dark`:`light`,language:`zh-CN`}});if(!n)return;r.success&&r.result?(a(r.result?._node??r.result),s(null)):(s(r.error??`Unknown error`),a(null))}catch(e){if(!n)return;s(e instanceof Error?e.message:String(e)),a(null)}finally{n&&d(!1)}})(),()=>{n=!1}},[e,t,p,m,_,v,y,b,x,S,C]),u?(0,g.jsx)(`div`,{className:`p-4 ${n??``}`,children:(0,g.jsxs)(`div`,{className:`space-y-3`,children:[(0,g.jsx)(l,{className:`h-4 w-3/4`}),(0,g.jsx)(l,{className:`h-4 w-1/2`})]})}):o?(0,g.jsxs)(`div`,{className:`text-xs text-red-500 ${n??``}`,children:[`Error: `,o.slice(0,50)]}):(0,g.jsx)(I,{dsl:i,className:n})}export{D as a,E as c,y as d,m as f,N as i,x as l,R as n,j as o,f as p,I as r,T as s,L as t,b as u};