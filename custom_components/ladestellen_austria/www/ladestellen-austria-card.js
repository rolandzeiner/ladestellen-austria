/*! Ladestellen Austria Card — bundled by Rolldown. Edit sources in src/, then `npm run build`. */
var e=Object.defineProperty,t=(t,n)=>{let r={};for(var i in t)e(r,i,{get:t[i],enumerable:!0});return n||e(r,Symbol.toStringTag,{value:`Module`}),r};
/**
* @license
* Copyright 2019 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
const n=globalThis,r=n.ShadowRoot&&(n.ShadyCSS===void 0||n.ShadyCSS.nativeShadow)&&`adoptedStyleSheets`in Document.prototype&&`replace`in CSSStyleSheet.prototype,i=Symbol(),a=new WeakMap;var o=class{constructor(e,t,n){if(this._$cssResult$=!0,n!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(r&&e===void 0){let n=t!==void 0&&t.length===1;n&&(e=a.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&a.set(t,e))}return e}toString(){return this.cssText}};const s=e=>new o(typeof e==`string`?e:e+``,void 0,i),c=(e,...t)=>new o(e.length===1?e[0]:t.reduce((t,n,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if(typeof e==`number`)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: `+e+`. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)})(n)+e[r+1],e[0]),e,i),l=(e,t)=>{if(r)e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let r of t){let t=document.createElement(`style`),i=n.litNonce;i!==void 0&&t.setAttribute(`nonce`,i),t.textContent=r.cssText,e.appendChild(t)}},u=r?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t=``;for(let n of e.cssRules)t+=n.cssText;return s(t)})(e):e,{is:d,defineProperty:f,getOwnPropertyDescriptor:p,getOwnPropertyNames:m,getOwnPropertySymbols:h,getPrototypeOf:g}=Object,_=globalThis,v=_.trustedTypes,y=v?v.emptyScript:``,ee=_.reactiveElementPolyfillSupport,b=(e,t)=>e,x={toAttribute(e,t){
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
switch(t){case Boolean:e=e?y:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},S=(e,t)=>!d(e,t),C={attribute:!0,type:String,converter:x,reflect:!1,useDefault:!1,hasChanged:S};Symbol.metadata??=Symbol(`metadata`),_.litPropertyMetadata??=new WeakMap;var w=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=C){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let n=Symbol(),r=this.getPropertyDescriptor(e,n,t);r!==void 0&&f(this.prototype,e,r)}}static getPropertyDescriptor(e,t,n){let{get:r,set:i}=p(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){let a=r?.call(this);i?.call(this,t),this.requestUpdate(e,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??C}static _$Ei(){if(this.hasOwnProperty(b(`elementProperties`)))return;let e=g(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(b(`finalized`)))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b(`properties`))){let e=this.properties,t=[...m(e),...h(e)];for(let n of t)this.createProperty(n,e[n])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let n=this._$Eu(e,t);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let n=new Set(e.flat(1/0).reverse());for(let e of n)t.unshift(u(e))}else e!==void 0&&t.push(u(e));return t}static _$Eu(e,t){let n=t.attribute;return!1===n?void 0:typeof n==`string`?n:typeof e==`string`?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return l(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){let n=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,n);if(r!==void 0&&!0===n.reflect){let i=(n.converter?.toAttribute===void 0?x:n.converter).toAttribute(t,n.type);this._$Em=e,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(e,t){let n=this.constructor,r=n._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let e=n.getPropertyOptions(r),i=typeof e.converter==`function`?{fromAttribute:e.converter}:e.converter?.fromAttribute===void 0?x:e.converter;this._$Em=r;let a=i.fromAttribute(t,e.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(e,t,n,r=!1,i){if(e!==void 0){let a=this.constructor;if(!1===r&&(i=this[e]),n??=a.getPropertyOptions(e),!((n.hasChanged??S)(i,t)||n.useDefault&&n.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:r,wrapped:i},a){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==i||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,n]of e){let{wrapped:e}=n,r=this[t];!0!==e||this._$AL.has(t)||r===void 0||this.C(t,void 0,n,r)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};w.elementStyles=[],w.shadowRootOptions={mode:`open`},w[b(`elementProperties`)]=new Map,w[b(`finalized`)]=new Map,ee?.({ReactiveElement:w}),(_.reactiveElementVersions??=[]).push(`2.1.2`);
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
const te=globalThis,ne=e=>e,T=te.trustedTypes,re=T?T.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,ie=`$lit$`,E=`lit$${Math.random().toFixed(9).slice(2)}$`,ae=`?`+E,oe=`<${ae}>`,D=document,O=()=>D.createComment(``),k=e=>e===null||typeof e!=`object`&&typeof e!=`function`,se=Array.isArray,ce=e=>se(e)||typeof e?.[Symbol.iterator]==`function`,le=`[ 	
\f\r]`,A=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ue=/-->/g,de=/>/g,j=RegExp(`>|${le}(?:([^\\s"'>=/]+)(${le}*=${le}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),fe=/'/g,pe=/"/g,me=/^(?:script|style|textarea|title)$/i,M=(e=>(t,...n)=>({_$litType$:e,strings:t,values:n}))(1),N=Symbol.for(`lit-noChange`),P=Symbol.for(`lit-nothing`),he=new WeakMap,F=D.createTreeWalker(D,129);function ge(e,t){if(!se(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return re===void 0?t:re.createHTML(t)}const _e=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:t===3?`<math>`:``,o=A;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===A?c[1]===`!--`?o=ue:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=j):(me.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=j):o=de:o===j?c[0]===`>`?(o=i??A,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?j:c[3]===`"`?pe:fe):o===pe||o===fe?o=j:o===ue||o===de?o=A:(o=j,i=void 0);let d=o===j&&e[t+1].startsWith(`/>`)?` `:``;a+=o===A?n+oe:l>=0?(r.push(s),n.slice(0,l)+ie+n.slice(l)+E+d):n+E+(l===-2?t:d)}return[ge(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:t===3?`</math>`:``)),r]};var ve=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=_e(t,n);if(this.el=e.createElement(l,r),F.currentNode=this.el.content,n===2||n===3){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;(i=F.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes())for(let e of i.getAttributeNames())if(e.endsWith(ie)){let t=u[o++],n=i.getAttribute(e).split(E),r=/([.?@])?(.*)/.exec(t);c.push({type:1,index:a,name:r[2],strings:n,ctor:r[1]===`.`?xe:r[1]===`?`?Se:r[1]===`@`?Ce:L}),i.removeAttribute(e)}else e.startsWith(E)&&(c.push({type:6,index:a}),i.removeAttribute(e));if(me.test(i.tagName)){let e=i.textContent.split(E),t=e.length-1;if(t>0){i.textContent=T?T.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],O()),F.nextNode(),c.push({type:2,index:++a});i.append(e[t],O())}}}else if(i.nodeType===8){if(i.data===ae)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(E,e+1))!==-1;)c.push({type:7,index:a}),e+=E.length-1}}a++}}static createElement(e,t){let n=D.createElement(`template`);return n.innerHTML=e,n}};function I(e,t,n=e,r){if(t===N)return t;let i=r===void 0?n._$Cl:n._$Co?.[r],a=k(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(e),i._$AT(e,n,r)),r===void 0?n._$Cl=i:(n._$Co??=[])[r]=i),i!==void 0&&(t=I(e,i._$AS(e,t.values),i,r)),t}var ye=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??D).importNode(t,!0);F.currentNode=r;let i=F.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new be(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new we(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=F.nextNode(),a++)}return F.currentNode=D,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},be=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=P,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=I(this,e,t),k(e)?e===P||e==null||e===``?(this._$AH!==P&&this._$AR(),this._$AH=P):e!==this._$AH&&e!==N&&this._(e):e._$litType$===void 0?e.nodeType===void 0?ce(e)?this.k(e):this._(e):this.T(e):this.$(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==P&&k(this._$AH)?this._$AA.nextSibling.data=e:this.T(D.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=ve.createElement(ge(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new ye(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=he.get(e.strings);return t===void 0&&he.set(e.strings,t=new ve(e)),t}k(t){se(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.O(O()),this.O(O()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=ne(e).nextSibling;ne(e).remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},L=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,i){this.type=1,this._$AH=P,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=P}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=I(this,e,t,0),a=!k(e)||e!==this._$AH&&e!==N,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=I(this,r[n+o],t,o),s===N&&(s=this._$AH[o]),a||=!k(s)||s!==this._$AH[o],s===P?e=P:e!==P&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===P?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},xe=class extends L{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===P?void 0:e}},Se=class extends L{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==P)}},Ce=class extends L{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=I(this,e,t,0)??P)===N)return;let n=this._$AH,r=e===P&&n!==P||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==P&&(n===P||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},we=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){I(this,e)}};const Te=te.litHtmlPolyfillSupport;Te?.(ve,be),(te.litHtmlVersions??=[]).push(`3.3.2`);const Ee=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new be(t.insertBefore(O(),e),e,void 0,n??{})}return i._$AI(e),i},De=globalThis
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
;var R=class extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Ee(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return N}};R._$litElement$=!0,R.finalized=!0,De.litElementHydrateSupport?.({LitElement:R});const Oe=De.litElementPolyfillSupport;Oe?.({LitElement:R}),(De.litElementVersions??=[]).push(`4.2.2`);
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
const z=e=>(t,n)=>{n===void 0?customElements.define(e,t):n.addInitializer(()=>{customElements.define(e,t)})},ke={attribute:!0,type:String,converter:x,reflect:!1,hasChanged:S},Ae=(e=ke,t,n)=>{
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
let{kind:r,metadata:i}=n,a=globalThis.litPropertyMetadata.get(i);if(a===void 0&&globalThis.litPropertyMetadata.set(i,a=new Map),r===`setter`&&((e=Object.create(e)).wrapped=!0),a.set(n.name,e),r===`accessor`){let{name:r}=n;return{set(n){let i=t.get.call(this);t.set.call(this,n),this.requestUpdate(r,i,e,!0,n)},init(t){return t!==void 0&&this.C(r,void 0,e,t),t}}}if(r===`setter`){let{name:r}=n;return function(n){let i=this[r];t.call(this,n),this.requestUpdate(r,i,e,!0,n)}}throw Error(`Unsupported decorator location: `+r)};function B(e){return(t,n)=>typeof n==`object`?Ae(e,t,n):((e,t,n)=>{let r=t.hasOwnProperty(n);return t.constructor.createProperty(n,e),r?Object.getOwnPropertyDescriptor(t,n):void 0})(e,t,n)}
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/function V(e){return B({...e,state:!0,attribute:!1})}function H(e,t,n){e.dispatchEvent(new CustomEvent(t,{detail:n,bubbles:!0,composed:!0}))}const je=[`Type 2`,`CCS`,`CHAdeMO`,`Type 1`,`Tesla`,`Schuko`,`CEE`],Me=[{key:`green_energy`,icon:`mdi:leaf`,label_key:`amenities.green_energy`},{key:`austrian_ecolabel`,icon:`mdi:certificate-outline`,label_key:`amenities.austrian_ecolabel`},{key:`free_parking`,icon:`mdi:parking`,label_key:`amenities.free_parking`},{key:`roofed_parking`,icon:`mdi:home-roof`,label_key:`amenities.roofed_parking`},{key:`illuminated_parking`,icon:`mdi:lightbulb-outline`,label_key:`amenities.illuminated_parking`},{key:`barrier_free`,icon:`mdi:wheelchair-accessibility`,label_key:`amenities.barrier_free`},{key:`catering`,icon:`mdi:silverware-fork-knife`,label_key:`amenities.catering`},{key:`bathrooms`,icon:`mdi:toilet`,label_key:`amenities.bathrooms`},{key:`resting`,icon:`mdi:sofa`,label_key:`amenities.resting`}],Ne=[{key:`APP`,icon:`mdi:cellphone`,label_key:`auth.app`},{key:`QR`,icon:`mdi:qrcode`,label_key:`auth.qr`},{key:`RFID_READER`,icon:`mdi:credit-card-wireless-outline`,label_key:`auth.rfid`},{key:`CHARGING_CONTRACT`,icon:`mdi:handshake-outline`,label_key:`auth.contract`},{key:`DEBIT_CARD`,icon:`mdi:credit-card-outline`,label_key:`auth.debit`},{key:`CREDIT_CARD`,icon:`mdi:credit-card`,label_key:`auth.credit`},{key:`CONTACTLESS_CARD_SUPPORT`,icon:`mdi:contactless-payment`,label_key:`auth.contactless`}];var Pe=t({amenities:()=>Re,auth:()=>ze,card:()=>Ie,common:()=>Fe,default:()=>He,editor:()=>Ve,parking:()=>Le,weekday:()=>Be}),Fe={version:`Version`,invalid_configuration:`Invalid configuration`,invalid_entity:`Card config: 'entity' must be a string referencing a sensor entity_id.`,invalid_station_id:`Card config: 'station_id' must be a string.`,loading:`Loading…`,version_update:`A newer card version ({v}) is available. Reload to apply.`,version_reload:`Reload`,version_reload_stuck:`Reload didn't pick up the new version. Close this browser tab and reopen the dashboard, or clear your browser's site data for Home Assistant.`},Ie={no_entity:`Select a Ladestellen Austria sensor in the card editor.`,no_stations:`No stations match the current filters.`,hero_context:`to the nearest charger in {city}`,hero_count:`{count} stations`,hero_count_filtered:`{filtered} of {total} stations`,hero_range:`{min}–{max} km range`,inactive:`inactive`,status_unknown:`live availability unavailable`,gratis:`Free`,live_suffix:`free`,open_in_maps:`Open in Maps`,website:`Website`,call:`Call`,address_heading:`Address`,amenities_heading:`Amenities`,pinned:`Pinned`,unpin:`Remove pin`,orphan_pin_title:`Pinned station not in range`,operator_heading:`Operator`,charging_points_heading:`Charging points`,opening_hours_heading:`Opening hours`,payment_heading:`Payment`,open_now:`Open now`,closed_now:`Closed`,always_open_short:`24h`,start_fee_label:`start fee`,blocking_fee_label:`¢/min from {from} min.`,point_status_available:`Available`,point_status_charging:`Charging`,point_status_occupied:`Occupied`,point_status_reserved:`Reserved`,point_status_blocked:`Blocked`,point_status_out_of_order:`Out of order`,point_status_faulted:`Faulted`,point_status_inoperative:`Inoperative`,point_status_unavailable:`Unavailable`,point_status_out_of_stock:`Empty`,point_status_planned:`Planned`,point_status_removed:`Removed`,point_status_unknown:`Unknown`,tariff:`Tariff`,dynamic_follows_entity:`Tracking: {entity}`},Le={editor_station_heading:`Station`,pick_station_hint:`Pick one station from the sensor. The card shows that station's charging points as parking slots.`,no_station_selected:`Pick a station in the card editor.`,station_not_found:`The selected station is not in the sensor's current results.`,station_not_in_range:`Selected station not in range`,available_count:`{avail} of {total} free`,no_points:`No charging points reported for this station.`,slot_status_free:`free`,slot_status_busy:`in use`,slot_status_warn:`out of order`,slot_status_unknown:`unknown`,slot_status_reserved:`reserved`,slot_status_blocked:`blocked`,slot_status_out_of_stock:`empty`,slot_status_faulted:`faulted`,slot_status_inoperative:`offline`,slot_status_unavailable:`n/a`,slot_status_planned:`planned`,slot_status_removed:`removed`},Re={green_energy:`Green energy`,free_parking:`Free parking`,roofed_parking:`Roofed parking`,illuminated_parking:`Illuminated`,barrier_free:`Accessible`,austrian_ecolabel:`Austrian Eco-Label`,catering:`Catering nearby`,bathrooms:`Restrooms`,resting:`Resting area`},ze={app:`App`,qr:`QR code`,rfid:`RFID`,contract:`Contract`,debit:`Debit card`,credit:`Credit card`,contactless:`Contactless`},Be={mo:`Mo`,tu:`Tu`,we:`We`,th:`Th`,fr:`Fr`,sa:`Sa`,su:`Su`},Ve={section_main:`Main`,section_display:`Display`,section_filters:`Filters`,section_chip_filters:`Filter by type`,section_appearance:`Appearance`,name:`Card title (optional)`,entity:`Sensor`,entity_missing:`Selected sensor is unavailable. Pick a different Ladestellen Austria sensor.`,max_stations:`Stations to show`,show_hero:`Show hero block`,show_pricing:`Show pricing`,show_amenities:`Show amenity details`,sort_by_power:`Sort by power (fastest first)`,logo_adapt_to_theme:`Adapt logo to theme (black on light, white on dark)`,hide_header:`Hide header`,show_free_count:`Show free / total counter`,car_color_mode:`Car colour`,car_color_random:`Random per spot`,car_color_theme:`Theme accent colour`,car_color_fixed:`Single colour`,car_color_pick:`Pick car colour`,asphalt_style:`Asphalt style`,asphalt_style_default:`Default (flat grey)`,asphalt_style_textured:`Textured asphalt`,paint_width:`Lane-line width`,paint_width_thin:`Thin`,paint_width_medium:`Medium`,paint_width_wide:`Wide`,icon_paint_mode:`Icon colour`,icon_paint_default:`Default (state colours)`,icon_paint_white:`White (painted on asphalt)`,only_available:`Only currently available stations`,only_free:`Only stations with free charging`,only_open:`Only currently open stations`,connector_filter_hint:`Tap connector types to only show stations offering at least one of them. Empty = no filter.`,amenity_filter_hint:`Tap amenities to narrow to stations offering all selected features (AND). Empty = no filter.`,payment_filter_hint:`Tap payment methods to only show stations accepting at least one of them. Empty = no filter.`,hint_compliance:`The E-Control logo (linking to e-control.at) and the 'Datenquelle: E-Control' attribution in the footer are required by the ladestellen.at Terms of Use.`,section_pinned:`Pinned stations`,pin_hint:`Pinned stations always appear first and bypass filters. They still count toward the display cap above.`,pin_select_sensor_first:`Select a sensor first to see available stations.`,pin_no_stations_yet:`No stations returned yet — wait for the next refresh.`,pin_orphans_heading:`Pinned but not in range (click to remove):`,pin_unpin:`Remove`,pin_disabled_dynamic:`Dynamic location mode is active on this sensor — pinned stations are disabled because the list follows your current position. Existing pins are preserved for when you switch back to fixed mode.`},He={common:Fe,card:Ie,parking:Le,amenities:Re,auth:ze,weekday:Be,editor:Ve},Ue=t({amenities:()=>qe,auth:()=>Je,card:()=>Ge,common:()=>We,default:()=>Ze,editor:()=>Xe,parking:()=>Ke,weekday:()=>Ye}),We={version:`Version`,invalid_configuration:`Ungültige Konfiguration`,invalid_entity:`Kartenkonfiguration: „entity“ muss ein String mit einer Sensor-entity_id sein.`,invalid_station_id:`Kartenkonfiguration: „station_id“ muss ein String sein.`,loading:`Lade…`,version_update:`Eine neuere Kartenversion ({v}) ist verfügbar. Bitte neu laden.`,version_reload:`Neu laden`,version_reload_stuck:`Neu laden hat die neue Version nicht übernommen. Schließen Sie diesen Browser-Tab und öffnen Sie das Dashboard erneut, oder löschen Sie die Website-Daten für Home Assistant in den Browser-Einstellungen.`},Ge={no_entity:`Bitte einen Ladestellen-Austria-Sensor im Karten-Editor auswählen.`,no_stations:`Keine Ladestellen entsprechen den aktuellen Filtern.`,hero_context:`zur nächsten Ladestelle in {city}`,hero_count:`{count} Ladestellen`,hero_count_filtered:`{filtered} von {total} Ladestellen`,hero_range:`{min}–{max} km Umkreis`,inactive:`inaktiv`,status_unknown:`Live-Status nicht verfügbar`,gratis:`Gratis`,live_suffix:`frei`,open_in_maps:`In Karte öffnen`,website:`Website`,call:`Anrufen`,address_heading:`Adresse`,amenities_heading:`Ausstattung`,pinned:`Angepinnt`,unpin:`Pin entfernen`,orphan_pin_title:`Angepinnte Ladestelle außerhalb des Umkreises`,operator_heading:`Betreiber`,charging_points_heading:`Ladepunkte`,opening_hours_heading:`Öffnungszeiten`,payment_heading:`Bezahlung`,open_now:`Jetzt geöffnet`,closed_now:`Geschlossen`,always_open_short:`24h`,start_fee_label:`Startgebühr`,blocking_fee_label:`¢/min ab {from} Min.`,point_status_available:`Verfügbar`,point_status_charging:`Lädt`,point_status_occupied:`Belegt`,point_status_reserved:`Reserviert`,point_status_blocked:`Blockiert`,point_status_out_of_order:`Außer Betrieb`,point_status_faulted:`Defekt`,point_status_inoperative:`Außer Betrieb`,point_status_unavailable:`Nicht verfügbar`,point_status_out_of_stock:`Leer`,point_status_planned:`Geplant`,point_status_removed:`Entfernt`,point_status_unknown:`Unbekannt`,tariff:`Tarif`,dynamic_follows_entity:`Folgt: {entity}`},Ke={editor_station_heading:`Ladestelle`,pick_station_hint:`Eine Ladestelle aus dem Sensor auswählen. Die Karte zeigt deren Ladepunkte als Parkplätze.`,no_station_selected:`Bitte eine Ladestelle im Karten-Editor auswählen.`,station_not_found:`Die gewählte Ladestelle ist aktuell nicht in den Sensor-Ergebnissen.`,station_not_in_range:`Gewählte Ladestelle nicht im Umkreis`,available_count:`{avail} von {total} frei`,no_points:`Keine Ladepunkte für diese Ladestelle vorhanden.`,slot_status_free:`frei`,slot_status_busy:`belegt`,slot_status_warn:`außer Betrieb`,slot_status_unknown:`unbekannt`,slot_status_reserved:`reserviert`,slot_status_blocked:`gesperrt`,slot_status_out_of_stock:`leer`,slot_status_faulted:`defekt`,slot_status_inoperative:`offline`,slot_status_unavailable:`n. v.`,slot_status_planned:`geplant`,slot_status_removed:`entfernt`},qe={green_energy:`Ökostrom`,free_parking:`Gratis Parken`,roofed_parking:`Überdacht`,illuminated_parking:`Beleuchtet`,barrier_free:`Barrierefrei`,austrian_ecolabel:`Umweltzeichen`,catering:`Gastronomie`,bathrooms:`WC`,resting:`Ruhebereich`},Je={app:`App`,qr:`QR-Code`,rfid:`RFID`,contract:`Vertrag`,debit:`Bankomat`,credit:`Kreditkarte`,contactless:`Kontaktlos`},Ye={mo:`Mo`,tu:`Di`,we:`Mi`,th:`Do`,fr:`Fr`,sa:`Sa`,su:`So`},Xe={section_main:`Allgemein`,section_display:`Anzeige`,section_filters:`Filter`,section_chip_filters:`Nach Typ filtern`,section_appearance:`Darstellung`,name:`Kartentitel (optional)`,entity:`Sensor`,entity_missing:`Ausgewählter Sensor ist nicht verfügbar. Bitte einen anderen Ladestellen-Austria-Sensor wählen.`,max_stations:`Anzahl angezeigter Ladestellen`,show_hero:`Hauptbereich anzeigen`,show_pricing:`Preise anzeigen`,show_amenities:`Ausstattungs-Details anzeigen`,sort_by_power:`Nach Leistung sortieren (schnellste zuerst)`,logo_adapt_to_theme:`Logo an Design anpassen (schwarz auf hell, weiß auf dunkel)`,hide_header:`Kopfzeile ausblenden`,show_free_count:`Frei/Gesamt-Zähler anzeigen`,car_color_mode:`Auto-Farbe`,car_color_random:`Zufällig pro Platz`,car_color_fixed:`Eigene Farbe`,car_color_theme:`Akzentfarbe des Designs`,car_color_pick:`Auto-Farbe wählen`,asphalt_style:`Asphalt-Stil`,asphalt_style_default:`Standard (flaches Grau)`,asphalt_style_textured:`Strukturierter Asphalt`,paint_width:`Linienbreite`,paint_width_thin:`Schmal`,paint_width_medium:`Mittel`,paint_width_wide:`Breit`,icon_paint_mode:`Symbol-Farbe`,icon_paint_default:`Standard (Statusfarben)`,icon_paint_white:`Weiß (auf Asphalt gemalt)`,only_available:`Nur aktuell verfügbare Ladestellen`,only_free:`Nur Ladestellen mit Gratis-Laden`,only_open:`Nur aktuell geöffnete Ladestellen`,connector_filter_hint:`Steckertypen antippen, um nur Ladestellen mit mindestens einem davon anzuzeigen. Leer = kein Filter.`,amenity_filter_hint:`Ausstattungsmerkmale antippen, um nur Ladestellen mit allen gewählten Merkmalen anzuzeigen (UND). Leer = kein Filter.`,payment_filter_hint:`Bezahlmethoden antippen, um nur Ladestellen anzuzeigen, die mindestens eine davon akzeptieren. Leer = kein Filter.`,hint_compliance:`Die Anzeige des E-Control-Logos (verlinkt auf e-control.at) und des Hinweises „Datenquelle: E-Control“ in der Fußzeile ist von den ladestellen.at-Nutzungsbedingungen vorgeschrieben.`,section_pinned:`Angepinnte Ladestellen`,pin_hint:`Angepinnte Ladestellen erscheinen immer zuerst und ignorieren Filter. Sie zählen weiterhin zur obigen Maximalanzahl.`,pin_select_sensor_first:`Zuerst einen Sensor auswählen, um verfügbare Ladestellen zu sehen.`,pin_no_stations_yet:`Noch keine Ladestellen geladen — auf die nächste Aktualisierung warten.`,pin_orphans_heading:`Angepinnt, aber nicht im Umkreis (anklicken zum Entfernen):`,pin_unpin:`Entfernen`,pin_disabled_dynamic:`Dynamische Standortverfolgung ist für diesen Sensor aktiv — angepinnte Ladestellen sind deaktiviert, weil die Liste deiner aktuellen Position folgt. Bestehende Pins bleiben erhalten, falls du wieder auf festen Standort wechselst.`},Ze={common:We,card:Ge,parking:Ke,amenities:qe,auth:Je,weekday:Ye,editor:Xe};const Qe={en:Pe,de:Ue};function $e(e,t){let n=e.split(`.`).reduce((e,t)=>{if(e&&typeof e==`object`&&t in e)return e[t]},t);return typeof n==`string`?n:void 0}let et;function U(e){typeof e==`string`&&e.length>0&&(et=e)}function tt(){return(et||(typeof navigator<`u`?navigator.language:``)||`en`).replace(/['"]+/g,``).substring(0,2).toLowerCase()}function W(e,t=``,n=``){let r=tt(),i=Qe.en??{},a=$e(e,Qe[r]??i);return a===void 0&&(a=$e(e,i)),a===void 0&&(a=e),t!==``&&n!==``&&(a=a.replaceAll(t,n)),a}async function nt(e){if(!e?.callWS)return null;try{let t=await e.callWS({type:`ladestellen_austria/card_version`});if(t?.version&&t.version!==`1.0.0`)return t.version}catch{}return null}function rt(e){try{window.caches?.keys?.().then(e=>{e.forEach(e=>window.caches?.delete?.(e))})}catch{}if(e)try{window.sessionStorage?.setItem(`lade-reload-attempted-${e}`,`1`)}catch{}window.location.reload()}function it(e){if(!e)return!1;try{return window.sessionStorage?.getItem(`lade-reload-attempted-${e}`)===`1`}catch{return!1}}function G(e){return e?it(e)?M`
      <div class="version-notice" role="alert" aria-live="assertive">
        <span>${W(`common.version_reload_stuck`)}</span>
      </div>
    `:M`
    <div class="version-notice" role="alert" aria-live="assertive">
      <span
        >${W(`common.version_update`).replaceAll(`{v}`,e)}</span
      >
      <button
        class="version-reload-btn"
        type="button"
        @click=${()=>rt(e)}
      >
        ${W(`common.version_reload`)}
      </button>
    </div>
  `:P}function K(e,t,n){let r=!!e?.themes?.darkMode,i=n?`brand-logo adaptive ${r?`adaptive-dark`:`adaptive-light`}`:`brand-logo`,a=t&&t.includes(`E-Control`)?t:`Datenquelle: E-Control`;return M`
    <div class="footer">
      <a
        class="brand-link"
        href="https://www.e-control.at/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="E-Control"
        @click=${e=>e.stopPropagation()}
      >
        <img
          class=${i}
          src="/ladestellen_austria/e-control_logo.svg"
          alt="E-Control"
        />
      </a>
      <span class="attribution-text">${a}</span>
    </div>
  `}const at=c`
  .version-notice {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    background: var(--lade-warning, #f59e0b);
    color: #fff;
    padding: 10px 14px;
    margin: calc(var(--lade-pad-y) * -1) calc(var(--lade-pad-x) * -1) 0;
    font-size: 0.8125rem;
    font-weight: 500;
  }
  .version-reload-btn {
    flex-shrink: 0;
    background: #fff;
    color: var(--lade-warning, #f59e0b);
    border: none;
    border-radius: 999px;
    padding: 6px 14px;
    font-weight: 600;
    font-size: 0.75rem;
    cursor: pointer;
  }
  .version-reload-btn:hover {
    background: rgba(255, 255, 255, 0.92);
  }
`,ot=c`
  .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 10px var(--lade-pad-x);
    border-top: 1px solid var(--divider-color);
  }
  .brand-link {
    display: inline-flex;
    align-items: center;
    text-decoration: none;
    transition: opacity 0.16s ease;
  }
  .brand-link:hover {
    opacity: 0.7;
  }
  .brand-logo {
    display: block;
    height: 20px;
    width: auto;
    max-width: 140px;
    object-fit: contain;
    transition: filter 0.16s ease;
  }
  .brand-logo.adaptive.adaptive-light {
    filter: brightness(0);
  }
  .brand-logo.adaptive.adaptive-dark {
    filter: brightness(0) invert(1);
  }
  .attribution-text {
    font-size: 0.75rem;
    color: var(--secondary-text-color);
    letter-spacing: 0.03em;
    opacity: 0.85;
  }
`,st=c`
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`,ct=c`
  :host {
    /* color-scheme enables light-dark() and steers forced-colors palette
       selection (WCAG 1.4.11). HA's active theme drives the resolution. */
    color-scheme: light dark;
    display: block;
    /* Fill the grid cell the dashboard gave us.
       A sections view puts a fixed pixel height on the cell WRAPPER whenever
       the card's rows are numeric -- which a user also causes by dragging the
       row handle, since a stored grid_options overrides what getGridOptions()
       returns -- and styles nothing inside that wrapper.
       This host is display: block, so IT is the containing block for the
       ha-card below, and a percentage height against a containing block whose
       own height is auto computes to auto. Without this line ha-card therefore
       sizes to its content, overflows a cell too short for it, and is painted
       over the card underneath. Taking the cell's height here is what gives
       ha-card's 100% something to resolve against.
       In an auto-height cell it resolves to auto -- the height it already had
       -- so it costs nothing there. */
    block-size: 100%;
    container-type: inline-size;
    container-name: lscard;

    /* Brand accent — domain-specific, no HA equivalent. */
    --lade-accent: var(--primary-color);

    /* Semantic state tokens layered over HA's official semantic palette
       so theme authors can recolour the whole portfolio in one place;
       hard-coded fallbacks for older HA versions without these vars. */
    --lade-rt:      var(--success-color, #22c55e);
    --lade-warning: var(--warning-color, #f57c00);
    --lade-error:   var(--error-color,   #ef4444);
    --lade-info:    var(--info-color,    #1565c0);

    /* Spacing / radius / sizing — layered over the HA Design System
       so the card moves with HA when tokens evolve. Hard-coded values
       are the fallback for older HA versions. */
    /* These names were wrong until v0.5.1 and nothing complained: var()
       on a token HA does not define is not an error, it just resolves to
       the fallback. So the card ran entirely on its own literals while
       looking theme-aware — which is how --ha-spacing-3 came to mean
       14px on one line and 12px on the next, and --ha-radius-sm meant
       6px here and 8px in the parking card.

       Verified against the frontend's src/resources/theme/core.globals.ts:
         --ha-space-N          4px grid, 1…20   (was --ha-spacing-N)
         --ha-font-size-*      xs 10 / s 12 / m 14 / l 16 / xl 20px.
                               typography.globals.ts sets the root to
                               font-size:14px, so -m is 1rem, NOT 0.875 —
                               do the rem maths at 14px or just write px.
         --ha-border-radius-*  sm 4 / md 8 / lg 12 / xl 16 / pill / circle
                                                (was --ha-radius-*)
         --ha-animation-duration-*  none 1 / instant 75 / fast 150 /
                                    normal 250 / slow 350ms
                                                (was --ha-transition-duration-*)
       There is no easing token — --ha-transition-easing-standard never
       existed either, so easings are now named directly.

       Fallbacks are kept and now match the token they stand in for.
       Adopting a new --ha-* token means checking core.globals.ts first;
       a typo here is invisible. */
    --lade-radius-sm: var(--ha-border-radius-sm, 4px);
    --lade-radius-md: var(--ha-border-radius-md, 8px);
    --lade-radius-lg: var(--ha-card-border-radius, var(--ha-border-radius-lg, 12px));
    --lade-pad-x:     var(--ha-space-4, 16px);
    --lade-pad-y:     var(--ha-space-3, 12px);
    --lade-row-gap:   var(--ha-space-3, 12px);
    --lade-tile-size: 40px;
    --lade-slot-size: 80px;
    --lade-slot-height: 64px;
    --lade-slot-radius: var(--ha-border-radius-md, 8px);
    --lade-slot-gap: 8px;

    /* Parking-card surface tokens — defaults match the rollback look
       so cards with no asphalt/paint config render unchanged. The
       data-* attributes on .wrap (driven by parking-card.ts config)
       override these per-card when the user opts into the asphalt
       presets. */
    --lade-paint: rgba(255, 255, 255, 0.92);
    --lade-paint-width: 3px;

    /* Asphalt color + noise for the textured preset. The grain is an
       inline SVG fractalNoise filter (vector-based, randomly
       distributed by construction — no visible tile grid like
       layered radial-gradients produce). The CSS-Tricks "grainy
       gradients" recipe is the canonical reference for this
       technique. baseFrequency='4' gives a fine asphalt-grade grain
       (lower values give coarser, cloud-like noise; '0.65' is
       gradient-grain, '4' is asphalt-grain). numOctaves='3' adds
       fractal detail. stitchTiles='stitch' makes the 200×200 SVG
       tile seamlessly when the slot exceeds it. feColorMatrix zeros
       RGB and rescales alpha (×0.55) so the overlay reads as soft
       black grain instead of feTurbulence's default rainbow noise. */
    --lade-asphalt-color: #3a3d42;
    /* (Asphalt noise URL is inlined in each .parking-slot rule below
       rather than stored on this var — Lit's static styles + CSS
       custom-property var() substitution into background-image with
       a base64 data URI did not resolve in our testing, even though
       the same URL inlined directly works. We accept the duplication
       to keep the noise visible.) */
  }
  ha-card {
    /* Resolves against the height :host just took from the cell, so
       overflow: hidden clips inside the card rather than the card spilling
       past its own cell. The two declarations only work as a pair: core cards
       that set this one alone leave :host at its default inline display, where
       the cell wrapper is ha-card's containing block instead. */
    block-size: 100%;

    overflow: hidden;
    border-radius: var(--lade-radius-lg);
  }
  /* Slotted child of <ha-card>. Reset HA's default 16px padding — every
     region inside .wrap supplies its own spacing tuned to the new tile
     vocabulary. */
  .card-content {
    padding: 0;
  }
  .wrap {
    padding: var(--lade-pad-y) var(--lade-pad-x);
    display: flex;
    flex-direction: column;
    gap: var(--lade-row-gap);
  }

  /* Version-mismatch banner CSS lives in sharedVersionBanner. */

  /* ── Card header ─────────────────────────────────────────────────── */
  .header {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .icon-tile {
    /* Modern HA "tile-card" vocabulary: rounded square, accent-tinted
       background, accent-coloured icon. Replaces the old thin coloured
       accent bar / status dot. */
    width: var(--lade-tile-size);
    height: var(--lade-tile-size);
    border-radius: var(--lade-radius-md);
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: color-mix(in srgb, var(--lade-accent) 18%, transparent);
    color: var(--lade-accent);
    --mdc-icon-size: 22px;
  }
  /* "Inactive" / "unknown" tile variants — hollow ring (no fill) so the
     state reads at any zoom, in grayscale, in forced-colors mode. */
  .icon-tile.is-hollow {
    background: transparent;
    box-shadow: inset 0 0 0 1.5px
      color-mix(in srgb, var(--lade-accent) 55%, transparent);
    color: var(--lade-accent);
  }
  .header-text {
    min-width: 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .title {
    /* <h2>/<h3> override. */
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.25;
    color: var(--primary-text-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .subtitle {
    /* <p> override. */
    margin: 0;
    font-size: 0.75rem;
    color: var(--secondary-text-color);
    font-weight: 400;
    letter-spacing: 0.1px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .icon-action {
    /* Circular HA-style icon button — 40×40 touch target, hover/focus
       tint matching native ha-icon-button. */
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    color: var(--secondary-text-color);
    text-decoration: none;
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
    transition: background-color var(--ha-animation-duration-fast, 150ms) ease, color var(--ha-animation-duration-fast, 150ms) ease;
    --mdc-icon-size: 20px;
  }
  .icon-action:hover,
  .icon-action:focus-visible {
    background: color-mix(in srgb, var(--primary-color) 12%, transparent);
    color: var(--primary-color);
    outline: none;
  }

  /* ── Hero metric ─────────────────────────────────────────────────── */
  .hero {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
  }
  .hero--empty {
    justify-content: center;
    color: var(--secondary-text-color);
    font-size: 0.8125rem;
    padding: 8px 0;
  }
  .metric {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }
  .metric-value {
    display: inline-flex;
    align-items: baseline;
    gap: 6px;
    line-height: 1;
  }
  .metric-num {
    font-size: 2.25rem;
    font-weight: var(--ha-font-weight-bold, 700);
    color: var(--primary-text-color);
    font-variant-numeric: tabular-nums;
    letter-spacing: -0.5px;
  }
  .metric-of {
    font-size: 1rem;
    color: var(--secondary-text-color);
    font-weight: 500;
    font-variant-numeric: tabular-nums;
  }
  .metric-label {
    font-size: 0.75rem;
    color: var(--secondary-text-color);
    font-weight: 500;
    letter-spacing: 0.2px;
    text-transform: uppercase;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100%;
  }

  /* ── Chips ───────────────────────────────────────────────────────── */
  .chip-row {
    display: inline-flex;
    flex-wrap: wrap;
    gap: 6px;
    align-items: center;
  }
  .chip {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 5px 10px;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 1;
    background: color-mix(in srgb, var(--primary-color) 14%, transparent);
    color: var(--primary-color);
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }
  .chip ha-icon {
    --mdc-icon-size: 14px;
  }
  .chip.muted {
    background: color-mix(in srgb, var(--secondary-text-color) 12%, transparent);
    color: var(--secondary-text-color);
  }
  /* Free-of-charge price chip — green domain accent. */
  .chip.free {
    background: color-mix(in srgb, var(--lade-rt) 16%, transparent);
    color: var(--lade-rt);
  }
  /* DC fast-charge chip — amber/warning accent at 28% mix. */
  .chip.dc {
    background: color-mix(in srgb, var(--lade-warning) 28%, transparent);
    color: var(--primary-text-color);
  }
  .chip.dc ha-icon {
    color: var(--lade-warning);
  }
  .chip.pin {
    background: color-mix(in srgb, var(--primary-color) 18%, transparent);
    color: var(--primary-color);
  }

  /* ── Status flags (pill badges, NOT inline text) ──────────────────── */
  .flags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  .flag {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 4px 10px;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 500;
    line-height: 1;
    background: color-mix(in srgb, var(--secondary-text-color) 12%, transparent);
    color: var(--secondary-text-color);
    font-variant-numeric: tabular-nums;
  }
  .flag ha-icon {
    --mdc-icon-size: 14px;
    flex-shrink: 0;
  }
  .flag.ok {
    background: color-mix(in srgb, var(--lade-rt) 16%, transparent);
    color: var(--lade-rt);
  }
  .flag.warn {
    background: color-mix(in srgb, var(--lade-warning) 16%, transparent);
    color: var(--lade-warning);
  }
  .flag.err {
    background: color-mix(in srgb, var(--lade-error) 16%, transparent);
    color: var(--lade-error);
  }

  /* ── Station list ────────────────────────────────────────────────── */
  /* Negative horizontal margin so the list breaks out of .wrap's padding;
     each row supplies its own --lade-pad-x so hover/pinned tints span
     edge-to-edge of the card. */
  .stations {
    list-style: none;
    margin: 0 calc(var(--lade-pad-x) * -1);
    padding: 0;
  }
  .station {
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid var(--divider-color);
    cursor: pointer;
    transition: background-color var(--ha-animation-duration-fast, 150ms) ease;
  }
  .station:last-child {
    border-bottom: none;
  }
  .station:hover,
  .station:focus-visible {
    background: color-mix(in srgb, var(--primary-color) 5%, transparent);
    outline: none;
  }
  .station.is-pinned {
    background: color-mix(in srgb, var(--primary-color) 4%, transparent);
  }
  .station.is-pinned:hover,
  .station.is-pinned:focus-visible {
    background: color-mix(in srgb, var(--primary-color) 8%, transparent);
  }
  .station.is-inactive .station-body {
    opacity: 0.65;
  }

  .station-body {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px var(--lade-pad-x);
  }
  .station-main {
    min-width: 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .station-actions {
    display: inline-flex;
    align-items: center;
    gap: 2px;
    flex-shrink: 0;
  }
  .chevron {
    --mdc-icon-size: 22px;
    color: var(--secondary-text-color);
    transition: transform var(--ha-animation-duration-fast, 150ms) ease;
  }
  .station.expanded .chevron {
    transform: rotate(180deg);
  }

  /* Row line 1 — primary numeric reading: big bold kW + price, then DC /
     connector / pin chips. Tabular nums so digits stay column-aligned
     across rows. */
  .row-primary {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 4px 10px;
    min-width: 0;
    font-variant-numeric: tabular-nums;
  }
  /* Row line 2 — subordinate identity: station name + city / distance,
     same size + colour as the card-header subtitle. */
  .row-secondary {
    display: flex;
    align-items: baseline;
    gap: 6px;
    min-width: 0;
    font-size: 0.75rem;
    color: var(--secondary-text-color);
    line-height: 1.3;
  }
  .station-name {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    /* Allow wrapping at any character (long Austrian street names like
       "Wiener Bundesstraße" overflow narrow tiles); ellipsis still
       triggers when the row hits its overflow:hidden boundary. */
    overflow-wrap: anywhere;
    color: var(--secondary-text-color);
  }
  .station-loc {
    flex-shrink: 0;
    font-variant-numeric: tabular-nums;
  }

  /* Big kW — primary-text bold number, muted unit. DC swaps both to
     warning amber (still high-contrast against the card surface). */
  .metric-kw {
    display: inline-flex;
    align-items: baseline;
    gap: 3px;
    color: var(--primary-text-color);
    line-height: 1;
    white-space: nowrap;
  }
  .metric-kw .kw-num {
    font-size: 1.5rem;
    font-weight: var(--ha-font-weight-bold, 700);
    letter-spacing: -0.02em;
  }
  .metric-kw .kw-unit {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--secondary-text-color);
  }
  .metric-kw.dc {
    color: var(--lade-warning);
  }
  .metric-kw.dc .kw-unit {
    color: var(--lade-warning);
  }

  /* Price — bold companion to kW. Free renders in success green. */
  .metric-price {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--primary-text-color);
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }
  .metric-price.free {
    color: var(--lade-rt);
    font-weight: var(--ha-font-weight-bold, 700);
  }

  /* ── Status dot (halo three-cue treatment) ────────────────────────── */
  /* Each level ships THREE independent cues: hue, halo geometry, and
     fill-vs-hollow shape. Survives any single-channel deficit (low
     vision, protanopia, grayscale, forced-colors). */
  .status-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
    background: currentColor;
    box-sizing: border-box;
  }
  .status-dot.status-ok {
    color: var(--lade-rt);
    box-shadow: 0 0 0 3px
      color-mix(in srgb, var(--lade-rt) 18%, transparent);
  }
  .status-dot.status-partial {
    color: var(--lade-warning);
    box-shadow:
      0 0 0 2px
        color-mix(in srgb, var(--lade-warning) 45%, transparent),
      0 0 0 4px
        color-mix(in srgb, var(--lade-warning) 18%, transparent);
  }
  .status-dot.status-busy {
    color: var(--lade-error);
    box-shadow:
      0 0 0 1.5px var(--lade-error),
      0 0 0 4px
        color-mix(in srgb, var(--lade-error) 20%, transparent);
  }
  .status-dot.status-inactive {
    color: transparent;
    background: transparent;
    border: 1.5px solid var(--state-unavailable-color, #9ca3af);
    opacity: 0.7;
  }
  .status-dot.status-unknown {
    color: transparent;
    background: transparent;
    border: 1.5px dashed var(--secondary-text-color);
    opacity: 0.6;
  }

  /* ── Orphan-pin row ──────────────────────────────────────────────── */
  .station.is-orphan {
    cursor: default;
    opacity: 0.85;
  }
  .station.is-orphan:hover {
    background: transparent;
  }
  .orphan-icon {
    --mdc-icon-size: 20px;
    color: var(--secondary-text-color);
    flex-shrink: 0;
  }
  .orphan-id {
    font-family: ui-monospace, "SF Mono", Menlo, Monaco, Consolas, monospace;
    font-size: 0.6875rem;
    color: var(--secondary-text-color);
    letter-spacing: 0;
    overflow-wrap: anywhere;
  }

  /* ── Expanded detail ─────────────────────────────────────────────── */
  /* Mirrors wiener-linien-austria's hero-detail / dep-row-detail: outer
     uses grid-template-rows: 0fr ↔ 1fr to animate to intrinsic height
     in both directions; inner clips with overflow:hidden + min-height:0.
     The panel stays in the DOM so collapse is symmetric with expand;
     inert + aria-hidden lift focus and AT out of the collapsed row. */
  .detail {
    display: grid;
    /* minmax(0, …) forces the implicit row min to 0; bare 0fr
       still resolves to minmax(auto, 0fr) and falls back to the
       grid item's min-content, which leaks one row of content. */
    grid-template-rows: minmax(0, 0fr);
    min-height: 0;
    overflow: hidden;
    transition: grid-template-rows 0.24s ease;
  }
  .station.expanded .detail {
    grid-template-rows: minmax(0, 1fr);
  }
  .detail-inner {
    overflow: hidden;
    min-height: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 0 var(--lade-pad-x) 12px;
  }
  .detail-section {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .detail-label {
    font-size: 0.6875rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--secondary-text-color);
    opacity: 0.85;
  }
  .detail-text {
    font-size: 0.8125rem;
    color: var(--primary-text-color);
    line-height: 1.4;
  }
  .station-note {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    padding: 8px 10px;
    background: color-mix(in srgb, var(--lade-accent) 8%, transparent);
    border-left: 3px solid
      color-mix(in srgb, var(--lade-accent) 55%, transparent);
    border-radius: var(--lade-radius-sm);
    font-size: 0.75rem;
    line-height: 1.4;
    color: var(--primary-text-color);
  }
  .station-note ha-icon {
    --mdc-icon-size: 16px;
    color: var(--lade-accent);
    flex-shrink: 0;
    margin-top: 1px;
  }
  .operator-line {
    display: flex;
    align-items: baseline;
    gap: 8px;
    flex-wrap: wrap;
    min-width: 0;
  }
  .operator-name {
    font-size: 0.8125rem;
    font-weight: 500;
    color: var(--primary-text-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-width: 0;
  }

  /* ── Rack ────────────────────────────────────────────────────────── */
  .rack-block {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .rack {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--lade-slot-gap);
    padding: 10px;
    border-radius: var(--lade-radius-md);
    background: color-mix(in srgb, var(--lade-accent) 5%, transparent);
    border: 1px solid color-mix(in srgb, var(--lade-accent) 10%, transparent);
  }
  .rack-slot {
    position: relative;
    flex: 0 0 var(--lade-slot-size);
    width: var(--lade-slot-size);
    min-height: var(--lade-slot-height);
    box-sizing: border-box;
    border-radius: var(--lade-slot-radius);
    padding: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3px;
    transition: background-color var(--ha-animation-duration-fast, 150ms) ease;
    cursor: default;
  }
  /* Status-coloured rack slots — tinted surface + inset bottom shadow for
     depth (per spec). State variants prefer box-shadow insets over outline
     so they don't clip inside flex. */
  .rack-slot[data-status="ok"] {
    background: color-mix(in srgb, var(--lade-rt) 16%, transparent);
    box-shadow:
      inset 0 0 0 1px color-mix(in srgb, var(--lade-rt) 32%, transparent),
      inset 0 -2px 0 color-mix(in srgb, #000 14%, transparent);
  }
  .rack-slot[data-status="busy"] {
    background: color-mix(in srgb, var(--lade-error) 14%, transparent);
    box-shadow:
      inset 0 0 0 1px color-mix(in srgb, var(--lade-error) 30%, transparent),
      inset 0 -2px 0 color-mix(in srgb, #000 14%, transparent);
  }
  .rack-slot[data-status="warn"] {
    background: color-mix(in srgb, var(--lade-warning) 14%, transparent);
    box-shadow:
      inset 0 0 0 1px color-mix(in srgb, var(--lade-warning) 30%, transparent),
      inset 0 -2px 0 color-mix(in srgb, #000 14%, transparent);
  }
  .rack-slot[data-status="unknown"] {
    background: color-mix(in srgb, var(--secondary-text-color) 6%, transparent);
    box-shadow: inset 0 0 0 1px
      color-mix(in srgb, var(--secondary-text-color) 24%, transparent);
  }
  .rack-slot[data-status="empty"] {
    background: color-mix(in srgb, var(--secondary-text-color) 6%, transparent);
    box-shadow: inset 0 0 0 1px
      color-mix(in srgb, var(--secondary-text-color) 28%, transparent);
  }
  .rack-kw {
    display: inline-flex;
    align-items: baseline;
    gap: 2px;
    color: var(--primary-text-color);
    font-variant-numeric: tabular-nums;
    line-height: 1;
    white-space: nowrap;
  }
  .rack-kw-num {
    font-size: 1.15rem;
    font-weight: var(--ha-font-weight-bold, 700);
    letter-spacing: -0.02em;
  }
  .rack-kw-unit {
    font-size: 0.72rem;
    font-weight: 500;
    letter-spacing: 0.01em;
  }
  .rack-connector {
    max-width: 100%;
    font-size: 0.7rem;
    color: var(--secondary-text-color);
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .rack-overlay-icon {
    --mdc-icon-size: 28px;
  }
  .rack-overlay-icon.tone-warning {
    color: var(--lade-warning);
  }
  .rack-overlay-icon.tone-error {
    color: var(--lade-error);
  }
  .rack-overlay-icon.tone-info {
    color: var(--info-color, #039be5);
  }
  .rack-overlay-icon.tone-muted {
    color: var(--secondary-text-color);
  }
  /* bgTint overrides: PLANNED reads as future-info, REMOVED as error.
     OUT_OF_STOCK reuses the existing warn tint (no override needed). */
  .rack-slot.slot-tint-info {
    background: color-mix(in srgb, var(--info-color, #039be5) 14%, transparent);
    box-shadow:
      inset 0 0 0 1px color-mix(in srgb, var(--info-color, #039be5) 30%, transparent),
      inset 0 -2px 0 color-mix(in srgb, #000 14%, transparent);
  }
  .rack-slot.slot-tint-error {
    background: color-mix(in srgb, var(--lade-error) 14%, transparent);
    box-shadow:
      inset 0 0 0 1px color-mix(in srgb, var(--lade-error) 30%, transparent),
      inset 0 -2px 0 color-mix(in srgb, #000 14%, transparent);
  }
  .rack-dot {
    position: absolute;
    top: 6px;
    left: 7px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }
  .rack-dot[data-status="ok"] {
    background: var(--lade-rt);
  }
  .rack-dot[data-status="busy"] {
    background: var(--lade-error);
  }
  .rack-dot[data-status="warn"] {
    background: var(--lade-warning);
  }
  .rack-dot[data-status="unknown"] {
    background: transparent;
    box-shadow: inset 0 0 0 1.5px
      color-mix(in srgb, var(--secondary-text-color) 60%, transparent);
  }
  .power-badge {
    font-size: 0.5625rem;
    font-weight: var(--ha-font-weight-bold, 700);
    letter-spacing: 0.08em;
    line-height: 1;
    text-transform: uppercase;
  }
  .power-badge[data-type="dc"] {
    color: var(--lade-warning);
  }
  .power-badge[data-type="ac"] {
    color: var(--secondary-text-color);
    opacity: 0.75;
  }
  .fees-line {
    font-size: 0.75rem;
    color: var(--secondary-text-color);
    font-variant-numeric: tabular-nums;
    line-height: 1.4;
  }

  /* ── Opening hours ───────────────────────────────────────────────── */
  .hours-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
  }
  .hours-lines {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
    margin: 0;
    padding: 0;
    font-size: 0.8125rem;
    color: var(--primary-text-color);
    line-height: 1.4;
  }
  .hours-line {
    display: flex;
    gap: 8px;
    font-variant-numeric: tabular-nums;
  }
  .hours-day,
  .hours-time {
    margin: 0;
  }
  .hours-day {
    font-weight: 500;
    flex-shrink: 0;
  }

  /* ── Detail action footer ────────────────────────────────────────── */
  .actions {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    padding-top: 2px;
  }
  .btn-primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    padding: 0 14px;
    height: 32px;
    border-radius: 999px;
    background: var(--lade-accent);
    color: var(--text-primary-color, #fff);
    font-size: 0.75rem;
    font-weight: 600;
    text-decoration: none;
    box-shadow: 0 1px 2px color-mix(in srgb, #000 12%, transparent);
    transition: filter var(--ha-animation-duration-fast, 150ms) ease, transform var(--ha-animation-duration-fast, 150ms) ease;
  }
  .btn-primary:hover {
    filter: brightness(1.08);
  }
  .btn-primary:active {
    transform: translateY(1px);
  }
  .btn-primary ha-icon {
    --mdc-icon-size: 16px;
  }
  .btn-secondary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    padding: 0 12px;
    height: 32px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--secondary-text-color) 10%, transparent);
    color: var(--primary-text-color);
    font-size: 0.75rem;
    font-weight: 600;
    text-decoration: none;
    border: none;
    cursor: pointer;
    transition: background-color var(--ha-animation-duration-fast, 150ms) ease;
  }
  .btn-secondary:hover {
    background: color-mix(in srgb, var(--secondary-text-color) 18%, transparent);
  }
  .btn-secondary ha-icon {
    --mdc-icon-size: 16px;
    color: var(--secondary-text-color);
  }
  .timestamp {
    font-size: 0.7rem;
    color: var(--secondary-text-color);
    margin-left: auto;
  }

  /* ── Brand footer (§3c logo-link + §3d attribution) ───────────────── */
  /* Footer + brand-logo + attribution-text CSS lives in sharedFooter. */

  /* ── Empty state ─────────────────────────────────────────────────── */
  .empty-state {
    padding: 24px 0;
    text-align: center;
    color: var(--secondary-text-color);
    font-size: 0.875rem;
  }

  /* ── Responsive density tiers (container queries) ─────────────────── */
  @container lscard (inline-size < 360px) {
    :host {
      --lade-pad-x: 14px;
      --lade-pad-y: 12px;
      --lade-tile-size: 36px;
      --lade-slot-size: 60px;
      --lade-slot-height: 52px;
      --lade-slot-gap: 6px;
    }
    .metric-num {
      font-size: 2rem;
    }
    .icon-tile {
      --mdc-icon-size: 20px;
    }
    .rack-slot {
      padding: 6px 4px;
      gap: 2px;
    }
    .rack-kw-num {
      font-size: 1rem;
    }
    .rack-kw-unit {
      font-size: 0.65rem;
    }
    .rack-connector {
      font-size: 0.625rem;
    }
    .rack-overlay-icon {
      --mdc-icon-size: 22px;
    }
    .power-badge {
      font-size: 0.5rem;
      letter-spacing: 0.06em;
    }
    .station-body {
      padding: 10px;
      gap: 10px;
    }
    .footer {
      padding: 8px 14px;
    }
    .brand-logo {
      height: 18px;
    }
  }
  @container lscard (inline-size > 480px) {
    :host {
      --lade-pad-x: 20px;
      --lade-pad-y: 16px;
      --lade-tile-size: 44px;
      --lade-slot-size: 92px;
      --lade-slot-height: 72px;
      --lade-slot-gap: 10px;
    }
    .metric-num {
      font-size: 2.5rem;
    }
    .icon-tile {
      --mdc-icon-size: 24px;
    }
  }

  /* ── Accessibility primitives ────────────────────────────────────── */
  /* Focus ring (WCAG 2.4.7 AA; the 2px/3:1 ring also meets 2.4.13 AAA). */
  .station:focus-visible,
  .icon-action:focus-visible,
  a:focus-visible,
  button:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
    border-radius: 6px;
  }
  .btn-primary:focus-visible {
    outline-offset: 3px;
  }

  /* Forced-colors fallback (Windows High Contrast). */
  @media (forced-colors: active) {
    .station:focus-visible,
    .icon-action:focus-visible,
    a:focus-visible,
    button:focus-visible {
      outline-color: CanvasText;
    }
    .icon-tile,
    .chip,
    .flag,
    .btn-primary,
    .btn-secondary {
      forced-color-adjust: none;
    }
  }

  /* prefers-reduced-motion catch-all lives in sharedReducedMotion. */
`,lt=c`
  :host {
    display: block;
  }
  .editor {
    padding: var(--ha-space-4, 16px);
    display: flex;
    flex-direction: column;
    gap: var(--ha-space-3, 12px);
  }
  .editor-section {
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
    border-radius: var(--ha-border-radius-lg, 12px);
    padding: var(--ha-space-3, 12px) var(--ha-space-4, 16px);
    display: flex;
    flex-direction: column;
    gap: var(--ha-space-2, 8px);
  }
  .section-header {
    font-size: var(--ha-font-size-xs, 10px);
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--secondary-text-color);
  }
  .toggle-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .editor-hint {
    font-size: var(--ha-font-size-s, 12px);
    color: var(--secondary-text-color);
    line-height: 1.4;
  }
  .chip-row {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  .filter-chip {
    appearance: none;
    border: 1px solid var(--divider-color);
    border-radius: 999px;
    background: var(--ha-card-background, var(--card-background-color));
    color: var(--primary-text-color);
    padding: 4px 12px;
    font-size: var(--ha-font-size-s, 12px);
    cursor: pointer;
    transition:
      background-color 160ms cubic-bezier(0.4, 0, 0.2, 1),
      color 160ms cubic-bezier(0.4, 0, 0.2, 1),
      border-color 160ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  .filter-chip:hover {
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
  }
  .filter-chip.active {
    background: var(--primary-color);
    color: var(--text-primary-color, #fff);
    border-color: var(--primary-color);
    font-weight: 600;
  }
  .filter-chip.icon-chip {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 4px 10px;
  }
  .filter-chip.icon-chip ha-icon {
    --mdc-icon-size: 15px;
    color: var(--secondary-text-color);
  }
  .filter-chip.icon-chip.active ha-icon {
    color: var(--text-primary-color, #fff);
  }

  .pin-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .pin-row {
    appearance: none;
    text-align: left;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 12px;
    border-radius: 8px;
    border: 1px solid var(--divider-color);
    background: var(--ha-card-background, var(--card-background-color));
    color: var(--primary-text-color);
    font-size: var(--ha-font-size-s, 12px);
    cursor: pointer;
    transition:
      background-color 160ms cubic-bezier(0.4, 0, 0.2, 1),
      border-color 160ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  .pin-row:hover,
  .pin-row:focus-visible {
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
    outline: none;
  }
  .pin-row.pinned {
    background: color-mix(in srgb, var(--primary-color) 10%, transparent);
    border-color: color-mix(in srgb, var(--primary-color) 40%, transparent);
  }
  .pin-row.orphan {
    opacity: 0.75;
  }
  .pin-row ha-icon {
    --mdc-icon-size: 18px;
    color: var(--secondary-text-color);
    flex-shrink: 0;
  }
  .pin-row.pinned ha-icon {
    color: var(--primary-color);
  }
  .pin-label {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-width: 0;
  }
  .pin-meta {
    font-size: var(--ha-font-size-xs, 10px);
    color: var(--secondary-text-color);
    font-variant-numeric: tabular-nums;
    flex-shrink: 0;
  }
  .editor-hint--muted {
    opacity: 0.7;
  }

  /* Palette-swatch chip — used by the parking card's "Eigene Farbe"
     picker. Pill-shaped chip tinted in the chosen colour, with a
     palette-swatch-variant icon in full saturation + the hex value as
     a tabular label. The native <input type="color"> covers the chip
     at opacity 0 so the OS picker opens on click and the hex value
     flows back through @input/@change. */
  .color-swatch {
    --swatch-color: var(--primary-color);
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--swatch-color) 18%, transparent);
    color: var(--primary-text-color);
    font-size: 0.8125rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.16s ease, transform 0.16s ease;
  }
  .color-swatch:hover {
    background: color-mix(in srgb, var(--swatch-color) 26%, transparent);
  }
  .color-swatch:active {
    transform: translateY(1px);
  }
  /* Keyboard focus lands on the inner <input>, not the wrapping label —
     :focus-within catches the focus event on the actual focused
     descendant and paints the brand-tinted ring on the visible chip. */
  .color-swatch:focus-within {
    outline: 2px solid var(--swatch-color);
    outline-offset: 2px;
  }
  .color-swatch ha-icon {
    --mdc-icon-size: 22px;
    color: var(--swatch-color);
    flex-shrink: 0;
  }
  .color-swatch-hex {
    font-family: ui-monospace, "SF Mono", Menlo, Monaco, Consolas, monospace;
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.02em;
  }
  .color-swatch-input {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    border: 0;
    padding: 0;
    margin: 0;
    cursor: pointer;
    /* Some browsers render the native swatch at a fixed size that
       leaks past inset:0; clip just in case. */
    overflow: hidden;
  }
`,ut=c`
  :host {
    /* color-scheme enables light-dark() and steers forced-colors palette
       selection (WCAG 1.4.11). HA's active theme drives the resolution. */
    color-scheme: light dark;
    display: block;
    /* Fill the grid cell the dashboard gave us.
       A sections view puts a fixed pixel height on the cell WRAPPER whenever
       the card's rows are numeric -- which a user also causes by dragging the
       row handle, since a stored grid_options overrides what getGridOptions()
       returns -- and styles nothing inside that wrapper.
       This host is display: block, so IT is the containing block for the
       ha-card below, and a percentage height against a containing block whose
       own height is auto computes to auto. Without this line ha-card therefore
       sizes to its content, overflows a cell too short for it, and is painted
       over the card underneath. Taking the cell's height here is what gives
       ha-card's 100% something to resolve against.
       In an auto-height cell it resolves to auto -- the height it already had
       -- so it costs nothing there. */
    block-size: 100%;
    container-type: inline-size;
    container-name: plcard;

    /* Brand accent — domain-specific, no HA equivalent. */
    --lade-accent: var(--primary-color);

    /* Semantic state tokens — REQUIRED here, not just in cardStyles.
       parking-card.ts uses parkingLotStyles in its own shadow root, so
       any token referenced inside this stylesheet must also be defined
       on this :host. Without these, .slot-overlay-icon.tone-warning /
       .tone-error fall through to currentColor (= white in dark themes)
       and the state-colour cue is lost. Layered over HA's official
       semantic palette with the same fallback hex values used in the
       main cardStyles block. */
    --lade-rt:      var(--success-color, #22c55e);
    --lade-warning: var(--warning-color, #f57c00);
    --lade-error:   var(--error-color,   #ef4444);
    --lade-info:    var(--info-color,    #1565c0);

    /* Spacing / radius / sizing — layered over the HA Design System.
       Token names verified against core.globals.ts; see the note in the
       main cardStyles :host block for why they were wrong before. */
    --lade-radius-sm: var(--ha-border-radius-sm, 4px);
    --lade-radius-md: var(--ha-border-radius-md, 8px);
    --lade-radius-lg: var(--ha-card-border-radius, var(--ha-border-radius-lg, 12px));
    --lade-pad-x:     var(--ha-space-4, 16px);
    --lade-pad-y:     var(--ha-space-3, 12px);
    --lade-row-gap:   var(--ha-space-3, 12px);
    --lade-tile-size: 40px;
    --lade-slot-size: 96px;
    --lade-slot-height: 120px;
    --lade-slot-radius: var(--ha-border-radius-sm, 4px);
    --lade-slot-gap: 8px;
  }
  ha-card {
    /* Resolves against the height :host just took from the cell, so
       overflow: hidden clips inside the card rather than the card spilling
       past its own cell. The two declarations only work as a pair: core cards
       that set this one alone leave :host at its default inline display, where
       the cell wrapper is ha-card's containing block instead. */
    block-size: 100%;

    overflow: hidden;
    border-radius: var(--lade-radius-lg);
  }
  .card-content {
    padding: 0;
  }
  .wrap {
    padding: var(--lade-pad-y) var(--lade-pad-x);
    display: flex;
    flex-direction: column;
    gap: var(--lade-row-gap);
  }

  /* Version-mismatch banner CSS lives in sharedVersionBanner. */

  /* ── Card header (icon-tile + title group) ────────────────────────── */
  .header {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .icon-tile {
    width: var(--lade-tile-size);
    height: var(--lade-tile-size);
    border-radius: var(--lade-radius-md);
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: color-mix(in srgb, var(--lade-accent) 18%, transparent);
    color: var(--lade-accent);
    --mdc-icon-size: 22px;
  }
  .header-text {
    min-width: 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .title {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.25;
    color: var(--primary-text-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .subtitle {
    margin: 0;
    font-size: 0.75rem;
    color: var(--secondary-text-color);
    font-weight: 400;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* ── Header count (avail / total free, right-aligned) ─────────────── */
  /* Sits in the header row alongside the icon-tile + title. Compact
     stack: big tabular number + " / total" suffix on top, UPPERCASE
     "free" label below. Pinned right via margin-left:auto. Number
     turns success-green when at least one slot is free so the
     glance-read is instant. */
  .header-count {
    margin-left: auto;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 2px;
    font-variant-numeric: tabular-nums;
  }
  .header-count-value {
    display: inline-flex;
    align-items: baseline;
    gap: 4px;
    line-height: 1;
  }
  .header-count-num {
    font-size: 1.5rem;
    font-weight: var(--ha-font-weight-bold, 700);
    color: var(--primary-text-color);
    letter-spacing: -0.5px;
  }
  .header-count.has-free .header-count-num {
    color: var(--lade-rt);
  }
  .header-count-of {
    font-size: 0.85rem;
    color: var(--secondary-text-color);
    font-weight: 500;
  }
  .header-count-label {
    font-size: 0.7rem;
    color: var(--secondary-text-color);
    font-weight: 500;
    letter-spacing: 0.2px;
    text-transform: uppercase;
  }

  /* ── Lot ─────────────────────────────────────────────────────────── */
  .rack-block {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .parking-lot {
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(var(--lade-slot-size), 1fr));
    /* Slots butt up edge-to-edge so adjacent painted lane-lines collapse
       into a single 3px stripe (instead of two parallel ones). The
       border-radius + overflow:hidden clips corner slots to the asphalt
       rounded outline. */
    gap: 0;
    padding: 0;
    border-radius: var(--lade-radius-md);
    overflow: hidden;
    background: color-mix(
      in srgb,
      var(--primary-text-color) 8%,
      transparent
    );
  }
  /* Opening painted lane-line on the lot's left edge. A flat 3 px
     pseudo-element rectangle — gets hard-clipped by the lot's
     overflow:hidden + border-radius so the straight middle section
     shows and the rounded corners cut it off cleanly. (An inset
     box-shadow would FOLLOW the rounded corners and bleed into them,
     which is what this rule replaces.) Closing / inter-slot lines are
     drawn by each slot's own border-right. */
  .parking-lot::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: var(--lade-paint-width, 3px);
    background: var(--lade-paint, rgba(255, 255, 255, 0.92));
    pointer-events: none;
    z-index: 1;
  }

  /* ── Slot ────────────────────────────────────────────────────────── */
  /* Each slot is a real parking-spot rectangle: sharp corners, solid
     white painted lane-lines on the long sides, asphalt-tinted body
     between them. Buttons are reset to look like plain divs but stay
     focusable + clickable for the car-toggle interaction. */
  .parking-slot {
    position: relative;
    min-height: var(--lade-slot-height);
    padding: 12px 6px;
    display: flex;
    align-items: stretch;
    justify-content: center;
    box-sizing: border-box;
    border-radius: 0;
    border: none;
    /* Painted lane-line: every slot draws a solid white line on its
       passenger-side (right) edge. Adjacent slots share that line —
       slot N's border-right doubles as the line between N and N+1.
       The row's closing line happens naturally on the row-last slot's
       border-right with NO special-case logic, regardless of whether
       the row is full or partial. The lot's inset-left shadow handles
       the row-opening line. */
    border-right: var(--lade-paint-width, 3px) solid var(--lade-paint, rgba(255, 255, 255, 0.92));
    background: color-mix(
      in srgb,
      var(--primary-text-color) 6%,
      transparent
    );
    appearance: none;
    font: inherit;
    color: inherit;
    text-align: inherit;
    cursor: default;
    transition: background-color 0.16s ease;
  }
  .parking-slot.has-overlay {
    cursor: pointer;
  }
  .slot-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    width: 100%;
    transition: opacity 0.22s ease;
  }

  .slot-power-badge {
    font-size: 0.5625rem;
    font-weight: var(--ha-font-weight-bold, 700);
    letter-spacing: 0.08em;
    line-height: 1;
    text-transform: uppercase;
  }
  .slot-power-badge[data-type="dc"] {
    color: var(--lade-warning);
  }
  .slot-power-badge[data-type="ac"] {
    color: var(--secondary-text-color);
    opacity: 0.75;
  }
  .slot-kw {
    display: inline-flex;
    align-items: baseline;
    gap: 2px;
    color: var(--primary-text-color);
    font-variant-numeric: tabular-nums;
    line-height: 1;
    white-space: nowrap;
  }
  .slot-kw-num {
    font-size: 1.4rem;
    font-weight: var(--ha-font-weight-bold, 700);
    letter-spacing: -0.02em;
  }
  .slot-kw-unit {
    font-size: 0.78rem;
    font-weight: 500;
  }
  .slot-connector {
    font-size: 0.7rem;
    color: var(--secondary-text-color);
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .slot-status-word {
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    line-height: 1.1;
    margin-top: 4px;
    text-align: center;
  }
  .slot-status-free {
    color: var(--lade-rt);
  }
  .slot-status-busy {
    color: var(--lade-error);
  }
  .slot-status-warn {
    color: var(--lade-warning);
  }
  .slot-status-unknown {
    color: var(--secondary-text-color);
  }

  /* AVAILABLE slots — empty parking spot. Flat tinted fill (the
     state-colour cue), inset bottom shadow kept for depth. Previously
     stacked a top white-sheen linear-gradient and a centre-bias
     radial-glow over an asphalt base; the flat fill reads cleaner. */
  .parking-slot.is-available {
    background: color-mix(in srgb, var(--lade-rt) 22%, transparent);
    box-shadow:
      inset 0 1px 0 color-mix(in srgb, #fff 10%, transparent),
      inset 0 -2px 0 color-mix(in srgb, #000 18%, transparent);
  }

  /* ── Slot overlays (car on busy, MDI icon on every other special
     state — wrench / battery-off / cancel / progress-wrench / etc.) ──
     Both overlay types use the same .has-overlay reveal mechanism: on
     hover / focus / when the slot is in the revealed set, the overlay
     fades + shrinks and the slot-inner info appears in its place.
     Per-state icons (.slot-overlay-icon) get a tone class that picks
     the icon colour — keeps the icon-vs-tone mapping in TS (utils
     slotOverlayIcon) and the visual treatment here. */
  .slot-car,
  .slot-overlay-icon {
    position: absolute;
    inset: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    transition: opacity 0.24s ease, transform 0.24s ease;
  }
  .slot-car svg {
    width: 78%;
    height: auto;
    max-height: 92%;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.35));
  }
  .slot-overlay-icon {
    --mdc-icon-size: 44px;
  }
  .slot-overlay-icon ha-icon {
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.35));
  }
  .slot-overlay-icon.tone-warning {
    color: var(--lade-warning);
  }
  .slot-overlay-icon.tone-error {
    color: var(--lade-error);
  }
  .slot-overlay-icon.tone-info {
    color: var(--lade-info);
  }
  .slot-overlay-icon.tone-muted {
    color: var(--secondary-text-color);
    opacity: 0.7;
  }
  .parking-slot.has-overlay .slot-inner {
    opacity: 0;
  }
  .parking-slot.has-overlay:hover .slot-car,
  .parking-slot.has-overlay:hover .slot-overlay-icon,
  .parking-slot.has-overlay:focus-visible .slot-car,
  .parking-slot.has-overlay:focus-visible .slot-overlay-icon,
  .parking-slot.has-overlay.is-revealed .slot-car,
  .parking-slot.has-overlay.is-revealed .slot-overlay-icon {
    opacity: 0;
    transform: scale(0.85);
  }
  .parking-slot.has-overlay:hover .slot-inner,
  .parking-slot.has-overlay:focus-visible .slot-inner,
  .parking-slot.has-overlay.is-revealed .slot-inner {
    opacity: 1;
  }
  /* Tinted slot states (out-of-order family + OUT_OF_STOCK / PLANNED /
     REMOVED) reuse the same flat-fill recipe as is-available so the
     visual weight matches across all backgrounded states — only the
     accent colour differs. is-warn covers the OUT_OF_ORDER family +
     OUT_OF_STOCK; slotOverlayIcon never emits bgTint:"warning" alone
     so .slot-tint-warning would be a dead selector. */
  .parking-slot.is-warn {
    background: color-mix(in srgb, var(--lade-warning) 22%, transparent);
    box-shadow:
      inset 0 1px 0 color-mix(in srgb, #fff 10%, transparent),
      inset 0 -2px 0 color-mix(in srgb, #000 18%, transparent);
  }
  .parking-slot.slot-tint-info {
    background: color-mix(in srgb, var(--lade-info) 22%, transparent);
    box-shadow:
      inset 0 1px 0 color-mix(in srgb, #fff 10%, transparent),
      inset 0 -2px 0 color-mix(in srgb, #000 18%, transparent);
  }
  .parking-slot.slot-tint-error {
    background: color-mix(in srgb, var(--lade-error) 22%, transparent);
    box-shadow:
      inset 0 1px 0 color-mix(in srgb, #fff 10%, transparent),
      inset 0 -2px 0 color-mix(in srgb, #000 18%, transparent);
  }
  .parking-slot.is-unknown {
    opacity: 0.85;
  }

  /* ── Empty state ─────────────────────────────────────────────────── */
  .empty-state {
    padding: 24px 0;
    text-align: center;
    color: var(--secondary-text-color);
    font-size: 0.875rem;
  }

  /* ── Brand footer (§3c logo-link + §3d attribution) ───────────────── */
  /* Required by ladestellen.at ToU §3c (E-Control link) + §3d (verbatim
     "Datenquelle: E-Control" next to the data). The CSS lives in
     sharedFooter; the markup lives in shared-render.ts. Non-negotiable
     in both places — do not restyle the logo path or attribution string. */

  /* ── Parking-card appearance presets ─────────────────────────────────
     Card-config controls (asphalt_style / paint_width / icon_paint_mode)
     are applied as data-* attributes on .wrap by parking-card.ts. These
     rules cascade --lade-paint-width / --lade-paint on .wrap (so every
     descendant lot/slot picks them up) or override the surface paint of
     the lot itself. Defaults set on :host above keep the rollback look
     when no preset is chosen. */
  .wrap[data-paint-width="thin"]   { --lade-paint-width: 2px; }
  .wrap[data-paint-width="medium"] { --lade-paint-width: 3px; }
  .wrap[data-paint-width="wide"]   { --lade-paint-width: 5px; }

  /* Asphalt: textured — paint the asphalt + grain on each .parking-
     slot rather than the .parking-lot, so empty grid cells (where no
     point exists; e.g. last partial row) keep the lot's default
     tinted bg instead of bleeding asphalt under nothing. Status tints
     for .is-available / .is-warn / .slot-tint-info / .slot-tint-error
     are blended into the asphalt color via color-mix so the grain
     stays visible on top, instead of laying a translucent fill ABOVE
     the grain (which would mute it). Specificity (0,3,0) wins over
     the base status rules at (0,2,0). The grain itself comes from
     --lade-asphalt-noise (a single SVG data URI; var substitution
     for one image works reliably, unlike multi-gradient lists). */
  .wrap[data-asphalt-style="textured"] .parking-slot {
    background-color: var(--lade-asphalt-color);
    background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMS4yIiBudW1PY3RhdmVzPSIzIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI24pIiBvcGFjaXR5PSIwLjMiLz48L3N2Zz4=");
    background-size: 200px 200px;
    background-repeat: repeat;
  }
  .wrap[data-asphalt-style="textured"] .parking-slot.is-available {
    background-color: color-mix(in srgb, var(--lade-rt) 22%, var(--lade-asphalt-color));
    background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMS4yIiBudW1PY3RhdmVzPSIzIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI24pIiBvcGFjaXR5PSIwLjMiLz48L3N2Zz4=");
    background-size: 200px 200px;
    background-repeat: repeat;
  }
  .wrap[data-asphalt-style="textured"] .parking-slot.is-warn {
    background-color: color-mix(in srgb, var(--lade-warning) 22%, var(--lade-asphalt-color));
    background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMS4yIiBudW1PY3RhdmVzPSIzIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI24pIiBvcGFjaXR5PSIwLjMiLz48L3N2Zz4=");
    background-size: 200px 200px;
    background-repeat: repeat;
  }
  .wrap[data-asphalt-style="textured"] .parking-slot.slot-tint-info {
    background-color: color-mix(in srgb, var(--lade-info) 22%, var(--lade-asphalt-color));
    background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMS4yIiBudW1PY3RhdmVzPSIzIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI24pIiBvcGFjaXR5PSIwLjMiLz48L3N2Zz4=");
    background-size: 200px 200px;
    background-repeat: repeat;
  }
  .wrap[data-asphalt-style="textured"] .parking-slot.slot-tint-error {
    background-color: color-mix(in srgb, var(--lade-error) 22%, var(--lade-asphalt-color));
    background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMS4yIiBudW1PY3RhdmVzPSIzIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI24pIiBvcGFjaXR5PSIwLjMiLz48L3N2Zz4=");
    background-size: 200px 200px;
    background-repeat: repeat;
  }
  /* Per-slot background-position offsets so adjacent slots show
     different windows onto the noise. Seven nth-child buckets cycle
     through coprime offsets — slots in a 4-column grid almost never
     land on the same bucket as their immediate neighbour or the slot
     above. Last selector in source order wins for slots that match
     multiple buckets, which is fine — the goal is variety, not
     coverage. */
  .wrap[data-asphalt-style="textured"] .parking-slot:nth-child(7n+1) { background-position:   0px   0px; }
  .wrap[data-asphalt-style="textured"] .parking-slot:nth-child(7n+2) { background-position:  47px  31px; }
  .wrap[data-asphalt-style="textured"] .parking-slot:nth-child(7n+3) { background-position:  89px  17px; }
  .wrap[data-asphalt-style="textured"] .parking-slot:nth-child(7n+4) { background-position:  23px  73px; }
  .wrap[data-asphalt-style="textured"] .parking-slot:nth-child(7n+5) { background-position: 113px  53px; }
  .wrap[data-asphalt-style="textured"] .parking-slot:nth-child(7n+6) { background-position:  61px 101px; }
  .wrap[data-asphalt-style="textured"] .parking-slot:nth-child(7n)   { background-position: 137px  79px; }

  /* Icon-paint: white — flips slot info colour to a near-white so it
     reads as "painted on the asphalt". Targets the overlay icon,
     AC/DC badge, kW number/unit, connector text, and status word.
     Cars keep their own car_color_mode — they're vehicles, not paint.
     Equal specificity to the per-tone / per-status rules above; this
     block lives later in the cascade so source order wins. */
  .wrap[data-icon-paint="white"] .slot-overlay-icon,
  .wrap[data-icon-paint="white"] .slot-overlay-icon.tone-warning,
  .wrap[data-icon-paint="white"] .slot-overlay-icon.tone-error,
  .wrap[data-icon-paint="white"] .slot-overlay-icon.tone-info,
  .wrap[data-icon-paint="white"] .slot-overlay-icon.tone-muted,
  .wrap[data-icon-paint="white"] .slot-power-badge,
  .wrap[data-icon-paint="white"] .slot-power-badge[data-type="dc"],
  .wrap[data-icon-paint="white"] .slot-power-badge[data-type="ac"],
  .wrap[data-icon-paint="white"] .slot-kw,
  .wrap[data-icon-paint="white"] .slot-connector,
  .wrap[data-icon-paint="white"] .slot-status-word,
  .wrap[data-icon-paint="white"] .slot-status-free,
  .wrap[data-icon-paint="white"] .slot-status-busy,
  .wrap[data-icon-paint="white"] .slot-status-warn,
  .wrap[data-icon-paint="white"] .slot-status-unknown {
    /* Force full opacity so .tone-muted (which sets opacity:0.7 in
       its base rule) reads as proper white paint and not faded grey.
       The hover-fade rule that sets opacity:0 is re-declared below
       with higher specificity so it still wins on hover/focus.
       No mix-blend-mode here — soft-light/overlay both dragged the
       white toward grey unevenly across icons (the inner ha-icon
       drop-shadow filter establishes a stacking context that made
       blend application inconsistent). Pure white reads more
       cleanly as paint; the painted-on feel comes from the visible
       grain AROUND the icons. */
    color: rgba(255, 255, 255, 0.95);
    opacity: 1;
  }
  /* Re-declare the hover/focus/revealed fade with higher specificity
     than the white-paint block above (which sets opacity:1). Without
     this, opacity:1 wins by source order + equal specificity and the
     icon never fades. */
  .wrap[data-icon-paint="white"] .parking-slot.has-overlay:hover .slot-car,
  .wrap[data-icon-paint="white"] .parking-slot.has-overlay:hover .slot-overlay-icon,
  .wrap[data-icon-paint="white"] .parking-slot.has-overlay:focus-visible .slot-car,
  .wrap[data-icon-paint="white"] .parking-slot.has-overlay:focus-visible .slot-overlay-icon,
  .wrap[data-icon-paint="white"] .parking-slot.has-overlay.is-revealed .slot-car,
  .wrap[data-icon-paint="white"] .parking-slot.has-overlay.is-revealed .slot-overlay-icon {
    opacity: 0;
  }

  /* ── Responsive density tiers (container queries) ─────────────────── */
  @container plcard (inline-size < 360px) {
    :host {
      --lade-pad-x: 14px;
      --lade-pad-y: 12px;
      --lade-tile-size: 36px;
      --lade-slot-size: 84px;
      --lade-slot-height: 100px;
    }
    .metric-num {
      font-size: 2rem;
    }
    .icon-tile {
      --mdc-icon-size: 20px;
    }
    .slot-kw-num {
      font-size: 1.2rem;
    }
    .parking-slot {
      padding: 10px 6px;
    }
    .footer {
      padding: 8px 14px;
      gap: 8px;
    }
    .brand-logo {
      height: 18px;
    }
  }
  @container plcard (inline-size > 480px) {
    :host {
      --lade-pad-x: 20px;
      --lade-pad-y: 16px;
      --lade-tile-size: 44px;
      --lade-slot-size: 110px;
      --lade-slot-height: 132px;
    }
    .metric-num {
      font-size: 2.5rem;
    }
    .icon-tile {
      --mdc-icon-size: 24px;
    }
  }

  /* ── Accessibility primitives ────────────────────────────────────── */
  .parking-slot:focus-visible,
  a:focus-visible,
  button:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
    border-radius: 6px;
  }
  @media (forced-colors: active) {
    .parking-slot:focus-visible,
    a:focus-visible,
    button:focus-visible {
      outline-color: CanvasText;
    }
    .icon-tile,
    .slot-power-badge,
    .slot-status-word {
      forced-color-adjust: none;
    }
  }
  /* prefers-reduced-motion catch-all lives in sharedReducedMotion. */
`,dt=[at,ot,st,ct],ft=[at,ot,st,ut];function pt(e){let t=e.electricityType??[];return t.some(e=>e===`DC`||e?.startsWith(`DC`))?`dc`:t.some(e=>e?.startsWith(`AC`))?`ac`:null}function q(e){return(e??``).toUpperCase().replace(/_/g,``)}function mt(e){let t=q(e);return t===`AVAILABLE`?`ok`:t===`CHARGING`||t===`OCCUPIED`||t===`RESERVED`||t===`BLOCKED`?`busy`:t===`OUTOFORDER`||t===`FAULTED`||t===`INOPERATIVE`||t===`UNAVAILABLE`?`warn`:t===`UNKNOWN`?`unknown`:`empty`}function ht(e){if(!e)return``;let t={AVAILABLE:`available`,CHARGING:`charging`,OCCUPIED:`occupied`,RESERVED:`reserved`,BLOCKED:`blocked`,OUTOFORDER:`out_of_order`,FAULTED:`faulted`,INOPERATIVE:`inoperative`,UNAVAILABLE:`unavailable`,OUTOFSTOCK:`out_of_stock`,PLANNED:`planned`,REMOVED:`removed`,UNKNOWN:`unknown`}[q(e)];if(!t)return e;let n=`card.point_status_${t}`,r=W(n);return r===n?e:r}function gt(e){return{AVAILABLE:`free`,CHARGING:`busy`,OCCUPIED:`busy`,RESERVED:`reserved`,BLOCKED:`blocked`,OUTOFORDER:`out_of_order`,FAULTED:`faulted`,INOPERATIVE:`inoperative`,UNAVAILABLE:`unavailable`,OUTOFSTOCK:`out_of_stock`,PLANNED:`planned`,REMOVED:`removed`,UNKNOWN:`unknown`}[q(e)]??`unknown`}function _t(e){switch(q(e)){case`OUTOFORDER`:case`FAULTED`:case`INOPERATIVE`:case`UNAVAILABLE`:return{icon:`mdi:wrench`,tone:`warning`};case`OUTOFSTOCK`:return{icon:`mdi:battery-off-outline`,tone:`warning`,bgTint:`warning`};case`PLANNED`:return{icon:`mdi:progress-wrench`,tone:`info`,bgTint:`info`};case`REMOVED`:return{icon:`mdi:close-circle-outline`,tone:`error`,bgTint:`error`};case`UNKNOWN`:return{icon:`mdi:help-circle-outline`,tone:`muted`};default:return null}}function vt(e){let t=mt(e.status),n=_t(e.status);return{bucket:t,isAvailable:t===`ok`,isBusy:t===`busy`,isWarn:t===`warn`,overlay:n,showCar:t===`busy`&&n===null,showOverlayIcon:n!==null}}function yt(e){if(e==null||!Number.isFinite(e))return`–`;try{return new Intl.NumberFormat(`de-AT`,{minimumFractionDigits:0,maximumFractionDigits:1}).format(e)}catch{return String(e).replace(`.`,`,`)}}function J(e){let t=e/100;try{return new Intl.NumberFormat(`de-AT`,{minimumFractionDigits:2,maximumFractionDigits:2}).format(t)}catch{return t.toFixed(2)}}function bt(e){if(!Number.isFinite(e))return`0`;try{return new Intl.NumberFormat(`de-AT`,{minimumFractionDigits:0,maximumFractionDigits:2}).format(e)}catch{return String(e).replace(`.`,`,`)}}function xt(e,t){switch(e){case`TYPE_2_AC`:return`Type 2`;case`COMBO2_CCS_DC`:return`CCS`;case`CHADEMO`:return`CHAdeMO`;case`TYPE_1_AC`:return`Type 1`;case`TESLA_S`:case`TESLA_R`:return`Tesla`;case`OTHER`:return t===`DOMESTIC_F`?`Schuko`:t?.startsWith(`CEE`)?`CEE`:t??`?`;default:return e?.replace(/_/g,` `)??t??`?`}}function St(e){let t=(e.connectorType??[])[0];return t?xt(t.consumerName,t.key):`–`}function Ct(e){return typeof e==`string`&&/^https?:\/\//i.test(e)?e:``}function wt(e){let t=e.type===`expandable`?`editor.section_${e.name}`:`editor.${e.name}`,n=W(t);return n===t?e.name:n}function Y(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a}const Tt=[{name:`entity`,required:!0,selector:{entity:{filter:{domain:`sensor`,integration:`ladestellen_austria`}}}},{name:`name`,selector:{text:{}}},{type:`expandable`,name:`display`,flatten:!0,schema:[{name:`max_stations`,selector:{number:{min:1,max:10,step:1,mode:`slider`}}},{name:`hide_header`,selector:{boolean:{}}},{name:`show_hero`,selector:{boolean:{}}},{name:`show_pricing`,selector:{boolean:{}}},{name:`show_amenities`,selector:{boolean:{}}},{name:`sort_by_power`,selector:{boolean:{}}},{name:`logo_adapt_to_theme`,selector:{boolean:{}}}]},{type:`expandable`,name:`filters`,flatten:!0,schema:[{name:`only_available`,selector:{boolean:{}}},{name:`only_free`,selector:{boolean:{}}},{name:`only_open`,selector:{boolean:{}}}]}],Et={max_stations:10,hide_header:!1,show_hero:!0,show_pricing:!0,show_amenities:!0,sort_by_power:!1,logo_adapt_to_theme:!1,only_available:!1,only_free:!1,only_open:!1};let X=class extends R{constructor(...e){super(...e),this._config={type:`ladestellen-austria-card`}}setConfig(e){let t=e.entity&&this.hass?.states[e.entity]?.attributes.friendly_name;this._config=typeof t==`string`?{name:t,...e}:{...e}}_formChanged(e){let t=e.detail.value;t&&(this._config=t,H(this,`config-changed`,{config:t}))}_toggleConnector(e){let t=this._config.connector_types??[],n=t.includes(e)?t.filter(t=>t!==e):[...t,e];this._config={...this._config,connector_types:n},H(this,`config-changed`,{config:this._config})}_toggleAmenity(e){let t=this._config.amenities??[],n=t.includes(e)?t.filter(t=>t!==e):[...t,e];this._config={...this._config,amenities:n},H(this,`config-changed`,{config:this._config})}_togglePayment(e){let t=this._config.payment_methods??[],n=t.includes(e)?t.filter(t=>t!==e):[...t,e];this._config={...this._config,payment_methods:n},H(this,`config-changed`,{config:this._config})}_togglePin(e){let t=this._config.pinned_station_ids??[],n=t.includes(e)?t.filter(t=>t!==e):[...t,e];this._config={...this._config,pinned_station_ids:n},H(this,`config-changed`,{config:this._config})}willUpdate(e){super.willUpdate(e),e.has(`hass`)&&U(this.hass?.language)}render(){if(!this._config)return M`<p>${W(`common.loading`)}</p>`;let e={...Et,...this._config},t=this._config.connector_types??[],n=this._config.amenities??[],r=this._config.payment_methods??[],i=!!this._config.entity&&!!this.hass&&!this.hass.states[this._config.entity];return M`
      <div class="editor">
        ${this.hass?M`<ha-form
              .hass=${this.hass}
              .data=${e}
              .schema=${Tt}
              .computeLabel=${wt}
              @value-changed=${this._formChanged}
            ></ha-form>`:P}
        ${i?M`<ha-alert alert-type="error">
              ${W(`editor.entity_missing`)}
            </ha-alert>`:P}

        <div class="editor-section">
          <div class="section-header">
            ${W(`editor.section_chip_filters`)}
          </div>
          <div class="editor-hint">
            ${W(`editor.connector_filter_hint`)}
          </div>
          <div class="chip-row">
            ${je.map(e=>M`
                <button
                  type="button"
                  class=${t.includes(e)?`filter-chip active`:`filter-chip`}
                  @click=${()=>this._toggleConnector(e)}
                >
                  ${e}
                </button>
              `)}
          </div>

          <div class="editor-hint">
            ${W(`editor.amenity_filter_hint`)}
          </div>
          <div class="chip-row">
            ${Me.map(e=>M`
                <button
                  type="button"
                  class=${n.includes(e.key)?`filter-chip icon-chip active`:`filter-chip icon-chip`}
                  @click=${()=>this._toggleAmenity(e.key)}
                >
                  <ha-icon icon=${e.icon}></ha-icon>
                  <span>${W(e.label_key)}</span>
                </button>
              `)}
          </div>

          <div class="editor-hint">
            ${W(`editor.payment_filter_hint`)}
          </div>
          <div class="chip-row">
            ${Ne.map(e=>M`
                <button
                  type="button"
                  class=${r.includes(e.key)?`filter-chip icon-chip active`:`filter-chip icon-chip`}
                  @click=${()=>this._togglePayment(e.key)}
                >
                  <ha-icon icon=${e.icon}></ha-icon>
                  <span>${W(e.label_key)}</span>
                </button>
              `)}
          </div>

          <div class="editor-hint">${W(`editor.hint_compliance`)}</div>
        </div>

        ${this._renderPinSection()}
      </div>
    `}_renderPinSection(){let e=this._config.entity,t=e?this.hass?.states[e]:void 0,n=t?.attributes?.stations??[],r=this._config.pinned_station_ids??[],i=new Set(r),a=new Set(n.map(e=>e.stationId)),o=r.filter(e=>!a.has(e)),s=t?.attributes?.dynamic_mode===!0;return M`
      <div class="editor-section">
        <div class="section-header">${W(`editor.section_pinned`)}</div>
        <div class="editor-hint">${W(`editor.pin_hint`)}</div>

        ${s?M`<div class="editor-hint editor-hint--muted">
              ${W(`editor.pin_disabled_dynamic`)}
            </div>`:e?n.length===0?M`<div class="editor-hint editor-hint--muted">
              ${W(`editor.pin_no_stations_yet`)}
            </div>`:M`
              <div class="pin-list">
                ${n.map(e=>{let t=i.has(e.stationId),n=typeof e.distance==`number`?`${e.distance.toFixed(2)} km`:``;return M`
                    <button
                      type="button"
                      class=${t?`pin-row pinned`:`pin-row`}
                      @click=${()=>this._togglePin(e.stationId)}
                    >
                      <ha-icon
                        icon=${t?`mdi:pin`:`mdi:pin-outline`}
                      ></ha-icon>
                      <span class="pin-label">${e.label}</span>
                      <span class="pin-meta">${n}</span>
                    </button>
                  `})}
              </div>
            `:M`<div class="editor-hint editor-hint--muted">
              ${W(`editor.pin_select_sensor_first`)}
            </div>`}
        ${!s&&o.length>0?M`
              <div class="editor-hint editor-hint--muted">
                ${W(`editor.pin_orphans_heading`)}
              </div>
              <div class="pin-list">
                ${o.map(e=>M`
                    <button
                      type="button"
                      class="pin-row pinned orphan"
                      @click=${()=>this._togglePin(e)}
                    >
                      <ha-icon icon="mdi:pin"></ha-icon>
                      <span class="pin-label orphan-id">${e}</span>
                      <span class="pin-meta">
                        ${W(`editor.pin_unpin`)}
                      </span>
                    </button>
                  `)}
              </div>
            `:P}
      </div>
    `}static{this.styles=lt}};Y([B({attribute:!1})],X.prototype,`hass`,void 0),Y([V()],X.prototype,`_config`,void 0),X=Y([z(`ladestellen-austria-card-editor`)],X);function Dt(){return M`
    <svg
      viewBox="0 0 50 90"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <!-- Body -->
      <rect
        x="3"
        y="2"
        width="44"
        height="86"
        rx="10"
        style="fill: var(--slot-car-color);"
      />
      <!-- Smoked windshield -->
      <path
        d="M10 18 Q25 14 40 18 L37 36 L13 36 Z"
        fill="rgba(15,20,35,0.7)"
      />
      <!-- Smoked rear window -->
      <path
        d="M13 54 L37 54 L40 70 Q25 74 10 70 Z"
        fill="rgba(15,20,35,0.65)"
      />
      <!-- Headlights -->
      <circle cx="14" cy="9" r="2" fill="#fff8c5" />
      <circle cx="36" cy="9" r="2" fill="#fff8c5" />
      <!-- Taillights -->
      <circle cx="14" cy="81" r="2" fill="#e63946" />
      <circle cx="36" cy="81" r="2" fill="#e63946" />
      <!-- Side mirrors -->
      <rect
        x="1"
        y="22"
        width="3"
        height="5"
        rx="1"
        style="fill: var(--slot-car-color);"
      />
      <rect
        x="46"
        y="22"
        width="3"
        height="5"
        rx="1"
        style="fill: var(--slot-car-color);"
      />
    </svg>
  `}const Ot={hide_header:!1,show_free_count:!0,logo_adapt_to_theme:!1,car_color_mode:`random`,asphalt_style:`default`,paint_width:`medium`,icon_paint_mode:`default`},kt=[{name:`entity`,required:!0,selector:{entity:{filter:{domain:`sensor`,integration:`ladestellen_austria`}}}},{name:`name`,selector:{text:{}}}];function At(){return[{type:`expandable`,name:`appearance`,flatten:!0,schema:[{name:`hide_header`,selector:{boolean:{}}},{name:`show_free_count`,selector:{boolean:{}}},{name:`logo_adapt_to_theme`,selector:{boolean:{}}},{name:`car_color_mode`,selector:{select:{mode:`dropdown`,options:[{value:`random`,label:W(`editor.car_color_random`)},{value:`theme`,label:W(`editor.car_color_theme`)},{value:`fixed`,label:W(`editor.car_color_fixed`)}]}}},{name:`asphalt_style`,selector:{select:{mode:`dropdown`,options:[{value:`default`,label:W(`editor.asphalt_style_default`)},{value:`textured`,label:W(`editor.asphalt_style_textured`)}]}}},{name:`paint_width`,selector:{select:{mode:`dropdown`,options:[{value:`thin`,label:W(`editor.paint_width_thin`)},{value:`medium`,label:W(`editor.paint_width_medium`)},{value:`wide`,label:W(`editor.paint_width_wide`)}]}}},{name:`icon_paint_mode`,selector:{select:{mode:`dropdown`,options:[{value:`default`,label:W(`editor.icon_paint_default`)},{value:`white`,label:W(`editor.icon_paint_white`)}]}}}]}]}let Z=class extends R{constructor(...e){super(...e),this._config={type:`ladestellen-austria-parking-card`}}setConfig(e){this._config={...e}}_formChanged(e){let t=e.detail.value;t&&(this._config=t,H(this,`config-changed`,{config:t}))}_appearanceSchema(){let e=this.hass?.language??``;return this._appearanceSchemaCache?.lang!==e&&(this._appearanceSchemaCache={lang:e,schema:At()}),this._appearanceSchemaCache.schema}_selectStation(e){let t=this._config.station_id===e?``:e;this._config={...this._config,station_id:t},H(this,`config-changed`,{config:this._config})}_carColorFixedChanged(e){let t=e.target;if(!t)return;let n=t.value;this._config.car_color_fixed!==n&&(this._config={...this._config,car_color_fixed:n},H(this,`config-changed`,{config:this._config}))}willUpdate(e){super.willUpdate(e),e.has(`hass`)&&U(this.hass?.language)}render(){if(!this._config)return M`<p>${W(`common.loading`)}</p>`;let e=this._config.entity,t=(e?this.hass?.states[e]:void 0)?.attributes?.stations??[],n=this._config.station_id??``,r={...Ot,...this._config},i=!!e&&!!this.hass&&!this.hass.states[e];return M`
      <div class="editor">
        ${this.hass?M`<ha-form
              .hass=${this.hass}
              .data=${r}
              .schema=${kt}
              .computeLabel=${wt}
              @value-changed=${this._formChanged}
            ></ha-form>`:P}
        ${i?M`<ha-alert alert-type="error">
              ${W(`editor.entity_missing`)}
            </ha-alert>`:P}

        <div class="editor-section">
          <div class="section-header">
            ${W(`parking.editor_station_heading`)}
          </div>
          <div class="editor-hint">
            ${W(`parking.pick_station_hint`)}
          </div>
          ${e?t.length===0?M`<div class="editor-hint editor-hint--muted">
                ${W(`editor.pin_no_stations_yet`)}
              </div>`:M`
                <div class="pin-list">
                  ${t.map(e=>{let t=e.stationId===n,r=typeof e.distance==`number`?`${e.distance.toFixed(2)} km`:``;return M`
                      <button
                        type="button"
                        class=${t?`pin-row pinned`:`pin-row`}
                        @click=${()=>this._selectStation(e.stationId)}
                      >
                        <ha-icon
                          icon=${t?`mdi:radiobox-marked`:`mdi:radiobox-blank`}
                        ></ha-icon>
                        <span class="pin-label">${e.label}</span>
                        <span class="pin-meta">${r}</span>
                      </button>
                    `})}
                </div>
              `:M`<div class="editor-hint editor-hint--muted">
                ${W(`editor.pin_select_sensor_first`)}
              </div>`}
          ${n&&!t.some(e=>e.stationId===n)?M`<div class="editor-hint editor-hint--muted">
                ${W(`parking.station_not_in_range`)}: ${n}
              </div>`:P}
        </div>

        ${this.hass?M`<ha-form
              .hass=${this.hass}
              .data=${r}
              .schema=${this._appearanceSchema()}
              .computeLabel=${wt}
              @value-changed=${this._formChanged}
            ></ha-form>`:P}

        ${this._config.car_color_mode===`fixed`?M`<div class="editor-section">
              <div class="section-header">
                ${W(`editor.car_color_pick`)}
              </div>
              <div class="toggle-row">
                <span>${W(`editor.car_color_pick`)}</span>
                <label
                  class="color-swatch"
                  style=${`--swatch-color: ${this._config.car_color_fixed||`#1d4ed8`};`}
                >
                  <ha-icon
                    icon="mdi:palette-swatch-variant"
                    aria-hidden="true"
                  ></ha-icon>
                  <span class="color-swatch-hex"
                    >${(this._config.car_color_fixed||`#1d4ed8`).toUpperCase()}</span
                  >
                  <input
                    type="color"
                    class="color-swatch-input"
                    .value=${this._config.car_color_fixed||`#1d4ed8`}
                    aria-label=${W(`editor.car_color_pick`)}
                    @input=${this._carColorFixedChanged}
                    @change=${this._carColorFixedChanged}
                  />
                </label>
              </div>
            </div>`:P}

        <div class="editor-section">
          <div class="editor-hint">${W(`editor.hint_compliance`)}</div>
        </div>
      </div>
    `}static{this.styles=lt}};Y([B({attribute:!1})],Z.prototype,`hass`,void 0),Y([V()],Z.prototype,`_config`,void 0),Z=Y([z(`ladestellen-austria-parking-card-editor`)],Z),window.customCards=window.customCards??[],window.customCards.push({type:`ladestellen-austria-parking-card`,name:`Ladestellen Austria — Parking`,description:`Single station, points rendered as parking slots viewed from above.`,preview:!0,documentationURL:`https://github.com/rolandzeiner/ladestellen-austria`,getEntitySuggestion:(e,t)=>!t.startsWith(`sensor.`)||e?.entities?.[t]?.platform!==`ladestellen_austria`?null:{config:{type:`custom:ladestellen-austria-parking-card`,entity:t}}});let Q=class extends R{constructor(...e){super(...e),this._revealedSlots=new Set,this._versionMismatch=null,this._versionCheckDone=!1}static getConfigElement(){return document.createElement(`ladestellen-austria-parking-card-editor`)}static getStubConfig(e,t){return{entity:t.find(e=>e.startsWith(`sensor.`)&&e.includes(`ladestelle`))??``,station_id:``}}setConfig(e){if(!e||typeof e!=`object`)throw Error(W(`common.invalid_configuration`));if(e.entity!==void 0&&typeof e.entity!=`string`)throw Error(W(`common.invalid_entity`));if(e.station_id!==void 0&&typeof e.station_id!=`string`)throw Error(W(`common.invalid_station_id`));this.config={hide_header:!1,show_free_count:!0,logo_adapt_to_theme:!1,car_color_mode:`random`,asphalt_style:`default`,paint_width:`medium`,icon_paint_mode:`default`,...e}}shouldUpdate(e){if(e.has(`config`)||e.has(`_revealedSlots`)||e.has(`_versionMismatch`))return!0;let t=e.get(`hass`);return!t||!this.config.entity||t.states[this.config.entity]!==this.hass.states[this.config.entity]}getCardSize(){return 3}getGridOptions(){return{columns:6,rows:`auto`,min_columns:4,min_rows:3}}willUpdate(e){super.willUpdate(e),e.has(`hass`)&&U(this.hass?.language)}firstUpdated(e){this._maybeRunVersionCheck()}updated(e){super.updated(e),e.has(`hass`)&&this._maybeRunVersionCheck()}_maybeRunVersionCheck(){!this._versionCheckDone&&this.hass&&(this._versionCheckDone=!0,nt(this.hass).then(e=>{this.isConnected&&e&&(this._versionMismatch=e)}))}render(){if(!this.hass||!this.config)return M`<ha-card>
        <div class="card-content">
          <div
            class="wrap"
            data-asphalt-style=${this.config?.asphalt_style??`default`}
            data-paint-width=${this.config?.paint_width??`medium`}
            data-icon-paint=${this.config?.icon_paint_mode??`default`}
          >
            ${G(this._versionMismatch)}
            <div class="empty-state">${W(`common.loading`)}</div>
          </div>
        </div>
      </ha-card>`;let e=this.config.entity?this.hass.states[this.config.entity]:void 0;if(!e)return M`<ha-card>
        <div class="card-content">
          <div
            class="wrap"
            data-asphalt-style=${this.config.asphalt_style??`default`}
            data-paint-width=${this.config.paint_width??`medium`}
            data-icon-paint=${this.config.icon_paint_mode??`default`}
          >
            ${G(this._versionMismatch)}
            <div class="empty-state">${W(`card.no_entity`)}</div>
          </div>
          ${K(this.hass,void 0,this.config?.logo_adapt_to_theme===!0)}
        </div>
      </ha-card>`;let t=e.attributes.stations??[],n=this.config.station_id??``,r=t.find(e=>e.stationId===n),i=this.config.name;if(!n||!r)return M`<ha-card>
        <div class="card-content">
          <div
            class="wrap"
            data-asphalt-style=${this.config.asphalt_style??`default`}
            data-paint-width=${this.config.paint_width??`medium`}
            data-icon-paint=${this.config.icon_paint_mode??`default`}
          >
            ${G(this._versionMismatch)}
            ${i&&!this.config.hide_header?M`<header class="header">
                  <div class="icon-tile" aria-hidden="true">
                    <ha-icon icon="mdi:ev-station"></ha-icon>
                  </div>
                  <div class="header-text">
                    <h3 class="title">${i}</h3>
                  </div>
                </header>`:P}
            <div class="empty-state">
              ${W(n?`parking.station_not_found`:`parking.no_station_selected`)}
            </div>
          </div>
          ${K(this.hass,e.attributes.attribution,this.config.logo_adapt_to_theme===!0)}
        </div>
      </ha-card>`;let a=r.points??[],o=a.filter(e=>mt(e.status)===`ok`).length,s=a.length,c=W(`parking.available_count`).replaceAll(`{avail}`,String(o)).replaceAll(`{total}`,String(s)),l=i??r.label,u=i?r.label:``;return M`
      <ha-card>
        <div class="card-content">
          <div
            class="wrap"
            style="--lade-accent: var(--primary-color);"
            data-asphalt-style=${this.config.asphalt_style??`default`}
            data-paint-width=${this.config.paint_width??`medium`}
            data-icon-paint=${this.config.icon_paint_mode??`default`}
          >
            ${G(this._versionMismatch)}
            ${this.config.hide_header?P:M`<header class="header">
                  <div class="icon-tile" aria-hidden="true">
                    <ha-icon icon="mdi:ev-station"></ha-icon>
                  </div>
                  <div class="header-text">
                    <h3 class="title">${l}</h3>
                    ${u?M`<p class="subtitle">${u}</p>`:P}
                  </div>
                  ${this.config.show_free_count===!1?P:M`<div
                        class=${o>0?`header-count has-free`:`header-count`}
                        aria-label=${c}
                      >
                        <div class="header-count-value">
                          <span
                            class="header-count-num"
                            role="status"
                            aria-live="polite"
                            >${o}</span
                          >
                          <span class="header-count-of">/ ${s}</span>
                        </div>
                        <div class="header-count-label">
                          ${W(`parking.slot_status_free`)}
                        </div>
                      </div>`}
                </header>`}
            ${a.length===0?M`<div class="empty-state">
                  ${W(`parking.no_points`)}
                </div>`:M`<div class="rack-block">
                  <div
                    class="parking-lot"
                    role="list"
                    aria-label=${c}
                  >
                    ${a.map(e=>this._renderSlot(e))}
                  </div>
                </div>`}
          </div>
          ${K(this.hass,e.attributes.attribution,this.config.logo_adapt_to_theme===!0)}
        </div>
      </ha-card>
    `}_renderSlot(e){let{bucket:t,isAvailable:n,isBusy:r,isWarn:i,overlay:a,showCar:o,showOverlayIcon:s}=vt(e),c=pt(e),l=St(e),u=yt(e.capacityKw),d=ht(e.status),f=this._slotStatusBucket(t),p=gt(e.status),m=o||s,h=m&&this._revealedSlots.has(e.evseId),g=n?`is-available`:r?`is-busy`:i?`is-warn`:`is-unknown`,_=[c?c.toUpperCase():null,e.capacityKw?`${u} kW`:null,l&&l!==`–`?l:null,d].filter(Boolean).join(` · `),v=o?this._carColor(e.evseId):null,y=[`parking-slot`,g,m?`has-overlay`:``,o?`has-car`:``,s?`has-icon`:``,a?.bgTint?`slot-tint-${a.bgTint}`:``,h?`is-revealed`:``].filter(Boolean).join(` `);return M`
      <button
        type="button"
        class=${y}
        data-status=${t}
        role="listitem"
        tabindex=${m?`0`:`-1`}
        aria-label=${_}
        aria-pressed=${m?h?`true`:`false`:P}
        title=${`${e.evseId??``} · ${d}`.trim()}
        @click=${t=>{t.preventDefault(),m&&this._toggleSlot(e.evseId)}}
      >
        ${o&&v?M`<span
              class="slot-car"
              aria-hidden="true"
              style=${`--slot-car-color: ${v};`}
            >
              ${Dt()}
            </span>`:P}
        ${a?M`<span
              class="slot-overlay-icon tone-${a.tone}"
              aria-hidden="true"
            >
              <ha-icon icon=${a.icon}></ha-icon>
            </span>`:P}
        <span class="slot-inner">
          ${c?M`<span
                class="slot-power-badge"
                data-type=${c}
                >${c.toUpperCase()}</span
              >`:P}
          <span class="slot-kw">
            <span class="slot-kw-num">${u}</span
            ><span class="slot-kw-unit">kW</span>
          </span>
          <span class="slot-connector">${l}</span>
          <span class="slot-status-word slot-status-${f}"
            >${this._slotStatusWord(p,d)}</span
          >
        </span>
      </button>
    `}_slotStatusBucket(e){switch(e){case`ok`:return`free`;case`busy`:return`busy`;case`warn`:return`warn`;case`unknown`:return`unknown`;default:return`unknown`}}_slotStatusWord(e,t){let n=`parking.slot_status_${e}`,r=W(n);return r===n?t:r}_toggleSlot(e){if(!e)return;let t=new Set(this._revealedSlots);t.has(e)?t.delete(e):t.add(e),this._revealedSlots=t}_carColor(e){let t=this.config?.car_color_mode??`random`;if(t===`theme`)return`var(--primary-color)`;if(t===`fixed`)return this.config?.car_color_fixed||`var(--primary-color)`;let n=[`#e63946`,`#1d4ed8`,`#15803d`,`#facc15`,`#fb923c`,`#ec4899`,`#0e7490`,`#6b21a8`,`#1f2937`,`#e5e7eb`],r=e??``,i=0;for(let e=0;e<r.length;e++)i=i*31+r.charCodeAt(e)>>>0;return n[i%n.length]??`#1f2937`}static{this.styles=ft}};Y([B({attribute:!1})],Q.prototype,`hass`,void 0),Y([V()],Q.prototype,`config`,void 0),Y([V()],Q.prototype,`_revealedSlots`,void 0),Y([V()],Q.prototype,`_versionMismatch`,void 0),Q=Y([z(`ladestellen-austria-parking-card`)],Q),window.customCards=window.customCards??[],window.customCards.push({type:`ladestellen-austria-card`,name:`Ladestellen Austria`,description:`Nearby EV charging stations, powered by E-Control Austria`,preview:!0,documentationURL:`https://github.com/rolandzeiner/ladestellen-austria`,getEntitySuggestion:(e,t)=>!t.startsWith(`sensor.`)||e?.entities?.[t]?.platform!==`ladestellen_austria`?null:{config:{type:`custom:ladestellen-austria-card`,entity:t}}});const jt={MONDAY:0,TUESDAY:1,WEDNESDAY:2,THURSDAY:3,FRIDAY:4,SATURDAY:5,SUNDAY:6},Mt={Mon:0,Tue:1,Wed:2,Thu:3,Fri:4,Sat:5,Sun:6};let $=class extends R{constructor(...e){super(...e),this._expanded=new Set,this._versionMismatch=null,this._versionCheckDone=!1}static getConfigElement(){return document.createElement(`ladestellen-austria-card-editor`)}static getStubConfig(e,t){return{entity:t.find(e=>e.startsWith(`sensor.`)&&e.includes(`ladestelle`))??``}}setConfig(e){if(!e||typeof e!=`object`)throw Error(W(`common.invalid_configuration`));if(e.entity!==void 0&&typeof e.entity!=`string`)throw Error(W(`common.invalid_entity`));this.config={name:`Ladestellen Austria`,max_stations:10,show_hero:!0,show_amenities:!0,show_pricing:!0,sort_by_power:!1,logo_adapt_to_theme:!1,only_available:!1,only_free:!1,only_open:!1,connector_types:[],amenities:[],payment_methods:[],pinned_station_ids:[],...e}}shouldUpdate(e){if(e.has(`config`)||e.has(`_expanded`)||e.has(`_versionMismatch`))return!0;let t=e.get(`hass`);return!t||!this.config.entity||t.states[this.config.entity]!==this.hass.states[this.config.entity]}getCardSize(){let e=this.config?.max_stations??10;return Math.min(3+Math.ceil(e/3),10)}getGridOptions(){return{columns:12,rows:`auto`,min_columns:6,min_rows:3}}willUpdate(e){super.willUpdate(e),e.has(`hass`)&&U(this.hass?.language)}firstUpdated(e){this._maybeRunVersionCheck()}updated(e){super.updated(e),e.has(`hass`)&&this._maybeRunVersionCheck()}_maybeRunVersionCheck(){!this._versionCheckDone&&this.hass&&(this._versionCheckDone=!0,nt(this.hass).then(e=>{this.isConnected&&e&&(this._versionMismatch=e)}))}render(){if(!this.config||!this.hass)return M`<ha-card>
        <div class="card-content">
          <div class="wrap">
            <div class="empty-state">${W(`common.loading`)}</div>
          </div>
        </div>
      </ha-card>`;let e=this.config.entity?this.hass.states[this.config.entity]:void 0;if(!e)return M`
        <ha-card>
          <div class="card-content">
            <div class="wrap">
              <div class="empty-state">${W(`card.no_entity`)}</div>
            </div>
            ${K(this.hass,void 0,this.config?.logo_adapt_to_theme===!0)}
          </div>
        </ha-card>
      `;let t=e.attributes.stations??[],n=e.attributes.live_status_available===!0,r=e.attributes.dynamic_mode===!0,i=e.attributes.dynamic_entity??null,a=r?[]:this.config.pinned_station_ids??[],o=this._collectPinnedItems(a,t),s=new Set(o.filter(e=>e.kind===`live`).map(e=>e.stationId)),c=t.filter(e=>!s.has(e.stationId)),l=this._filterStations(c),u=this._sortStations(l),d=t[0],f=Math.max(1,this.config.max_stations??10),p=[...o,...u.map(e=>({kind:`live`,station:e}))].slice(0,f),m=p.filter(e=>e.kind===`live`).map(e=>e.station),h=m.length>0?m[m.length-1]:void 0,g=this.config.show_hero!==!1,_=this.config.name&&this.config.name.trim()?this.config.name:`Ladestellen Austria`,v=d?this._heroCity(d):``;return M`
      <ha-card>
        <div class="card-content">
          <div class="wrap">
            ${G(this._versionMismatch)}
            ${this.config.hide_header?P:M`<header class="header">
                  <div class="icon-tile" aria-hidden="true">
                    <ha-icon icon="mdi:ev-station"></ha-icon>
                  </div>
                  <div class="header-text">
                    <h2 class="title">${_}</h2>
                    ${v?M`<p class="subtitle">${v}</p>`:P}
                  </div>
                </header>`}
            ${g?this._renderHero(d,h,l.length,t.length):P}
            ${r&&i?M`<div class="flags">
                  <span class="flag">
                    <ha-icon
                      icon="mdi:crosshairs-gps"
                      aria-hidden="true"
                    ></ha-icon>
                    <span
                      >${W(`card.dynamic_follows_entity`).replace(`{entity}`,i)}</span
                    >
                  </span>
                </div>`:P}
            ${p.length>0?M`<ul class="stations" role="list">
                  ${p.map(e=>e.kind===`live`?this._renderStation(e.station,n,s.has(e.station.stationId)):this._renderOrphanPin(e.id))}
                </ul>`:M`<div class="empty-state">
                  ${W(`card.no_stations`)}
                </div>`}
          </div>
          ${K(this.hass,e.attributes.attribution,this.config.logo_adapt_to_theme===!0)}
        </div>
      </ha-card>
    `}_sortStations(e){return[...e].sort((e,t)=>{if(this.config.sort_by_power){let n=Math.max(0,...(e.points??[]).map(e=>e.capacityKw??0)),r=Math.max(0,...(t.points??[]).map(e=>e.capacityKw??0));if(r!==n)return r-n}else{let n=e.distance??1/0,r=t.distance??1/0;if(n!==r)return n-r}let n=this._stationHasFree(e);return n===this._stationHasFree(t)?(e.distance??1/0)-(t.distance??1/0):n?-1:1})}_stationHasFree(e){return e.stationStatus===`ACTIVE`&&(e.points??[]).some(e=>q(e.status)===`AVAILABLE`)}_collectPinnedItems(e,t){let n=new Map(t.map(e=>[e.stationId,e])),r=new Set,i=[];for(let t of e){if(r.has(t))continue;r.add(t);let e=n.get(t);e?i.push({kind:`live`,station:e,stationId:e.stationId}):i.push({kind:`orphan`,id:t})}return i}_unpinStation(e){let t=(this.config.pinned_station_ids??[]).filter(t=>t!==e),n={...this.config,pinned_station_ids:t};H(this,`config-changed`,{config:n})}_renderOrphanPin(e){return M`
      <li class="station is-orphan" role="listitem">
        <div class="station-body">
          <ha-icon
            class="orphan-icon"
            icon="mdi:pin-off-outline"
            aria-hidden="true"
          ></ha-icon>
          <div class="station-main">
            <div class="row-secondary">
              <span class="station-name"
                >${W(`card.orphan_pin_title`)}</span
              >
            </div>
            <div class="orphan-id">${e}</div>
          </div>
          <div class="station-actions">
            <ha-icon-button
              .label=${W(`card.unpin`)}
              @click=${t=>{t.stopPropagation(),this._unpinStation(e)}}
            >
              <ha-icon icon="mdi:close"></ha-icon>
            </ha-icon-button>
          </div>
        </div>
      </li>
    `}_filterStations(e){let t=this.config.only_available??!1,n=this.config.only_free??!1,r=this.config.only_open??!1,i=this.config.connector_types??[],a=this.config.amenities??[],o=this.config.payment_methods??[];if(!t&&!n&&!r&&i.length===0&&a.length===0&&o.length===0)return e;let s=new Date,c=this.hass?.config?.time_zone??`Europe/Vienna`;return e.filter(e=>{if(t&&!(e.stationStatus===`ACTIVE`&&(e.points??[]).some(e=>q(e.status)===`AVAILABLE`))||n&&!(e.points??[]).some(e=>e.freeOfCharge)||r&&this._isOpenNow(e.openingHours,s,c)===!1)return!1;if(i.length>0){let t=new Set((e.points??[]).flatMap(e=>(e.connectorType??[]).map(e=>xt(e.consumerName,e.key))));if(!i.some(e=>t.has(e)))return!1}if(a.length>0&&!a.every(t=>this._stationHasAmenity(e,t)))return!1;if(o.length>0){let t=new Set((e.points??[]).flatMap(e=>e.authenticationMode??[]));if(!o.some(e=>t.has(e)))return!1}return!0})}_stationHasAmenity(e,t){switch(t){case`green_energy`:return!!e.greenEnergy;case`austrian_ecolabel`:return!!e.austrianEcoLabel;case`free_parking`:return!!e.freeParking;case`roofed_parking`:return!!e.roofedParking;case`illuminated_parking`:return!!e.illuminatedParking;case`barrier_free`:return(e.barrierFreeParkingPlaces??0)>0;case`catering`:return!!e.cateringService;case`bathrooms`:return!!e.bathroomsAvailable;case`resting`:return!!e.restingFacilities;default:return!1}}_renderHero(e,t,n,r){if(!e)return M`<section class="hero hero--empty">
        <span aria-live="polite">${W(`card.no_stations`)}</span>
      </section>`;let i=this._formatKm(e.distance),a=this._heroCity(e),o=t?this._formatKm(t.distance):i,s=W(`card.hero_range`).replaceAll(`{min}`,this._formatKm(e.distance)).replaceAll(`{max}`,o),c=n===r?W(`card.hero_count`).replaceAll(`{count}`,String(n)):W(`card.hero_count_filtered`).replaceAll(`{filtered}`,String(n)).replaceAll(`{total}`,String(r));return M`
      <section class="hero">
        <div class="metric">
          <div class="metric-value">
            <span class="metric-num" aria-live="polite">${i}</span>
            <span class="metric-of">km</span>
          </div>
          <div class="metric-label">${a}</div>
        </div>
        <div class="chip-row">
          <span class="chip">${s}</span>
          <span class="chip muted">${c}</span>
        </div>
      </section>
    `}_heroCity(e){return e.city||e.label||``}_renderStation(e,t,n=!1){let r=e.points??[],i=r.some(e=>(e.electricityType??[]).includes(`DC`)),a=r.reduce((e,t)=>Math.max(e,t.capacityKw??0),0),o=Array.from(new Set(r.flatMap(e=>(e.connectorType??[]).map(e=>xt(e.consumerName,e.key))))),s=o.slice(0,3),c=o.length-s.length,l=this._priceText(r),u=r.some(e=>e.freeOfCharge),d=r.length,f=r.filter(e=>q(e.status)===`AVAILABLE`).length,p=e.stationStatus===`ACTIVE`,m=this.hass?.config?.time_zone??`Europe/Vienna`,h=this._isOpenNow(e.openingHours,new Date,m),g=this._statusLevel(t,p,r,h),_=this._expanded.has(e.stationId),v=e.location,y=v?Ct(`https://www.google.com/maps/search/?api=1&query=${v.lat},${v.lon}`):``,ee=this.config?.show_amenities??!0,b=this.config?.show_pricing??!0,x=[`station`,_?`expanded`:``,n?`is-pinned`:``,g===`inactive`?`is-inactive`:``].filter(Boolean).join(` `),S=[[e.postCode,e.city].filter(Boolean).join(` `),Number.isFinite(e.distance)?`${this._formatKm(e.distance)} km`:``].filter(Boolean).join(` · `),C=`station-panel-${e.stationId}`;return M`
      <li
        class=${x}
        @click=${()=>this._toggle(e.stationId)}
        @keydown=${t=>this._onKey(t,e.stationId)}
        tabindex="0"
        role="button"
        aria-expanded=${_?`true`:`false`}
        aria-controls=${C}
      >
        <div class="station-body">
          <span
            class=${`status-dot status-${g}`}
            role="img"
            aria-label=${this._statusAria(g,f,d)}
          ></span>
          <div class="station-main">
            <div class="row-primary">
              ${a>0?M`<span class=${i?`metric-kw dc`:`metric-kw`}>
                    <span class="kw-num">${a}</span
                    ><span class="kw-unit">kW</span>
                  </span>`:P}
              ${b&&l?M`<span
                    class=${u?`metric-price free`:`metric-price`}
                    >${l}</span
                  >`:P}
              ${s.map(e=>M`<span class="chip muted">${e}</span>`)}
              ${c>0?M`<span class="chip muted">+${c}</span>`:P}
              ${n?M`<span class="chip pin" title=${W(`card.pinned`)}>
                    <ha-icon icon="mdi:pin" aria-hidden="true"></ha-icon>
                    <span>${W(`card.pinned`)}</span>
                  </span>`:P}
            </div>
            <div class="row-secondary">
              <span class="station-name" lang="de">${e.label}</span>
              ${S?M`<span class="station-loc" lang="de">${S}</span>`:P}
            </div>
          </div>
          <div class="station-actions">
            ${y?M`<a
                  class="icon-action"
                  href=${y}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label=${`${W(`card.open_in_maps`)}: ${e.label}`}
                  title=${W(`card.open_in_maps`)}
                  @click=${e=>e.stopPropagation()}
                >
                  <ha-icon
                    icon="mdi:map-marker-outline"
                    aria-hidden="true"
                  ></ha-icon>
                </a>`:P}
            <ha-icon
              class="chevron"
              icon="mdi:chevron-down"
              aria-hidden="true"
            ></ha-icon>
          </div>
        </div>
        ${this._renderStationDetail(e,h,ee,y,_,C)}
      </li>
    `}_renderStationDetail(e,t,n,r,i,a){let o=this._amenityItems(e),s=e.points??[],c=this._address(e),l=this._paymentChips(s),u=this._feesLine(s),d=e.operatorName||e.owner||``;return M`
      <div
        class="detail"
        id=${a}
        role="region"
        aria-hidden=${i?`false`:`true`}
        ?inert=${!i}
      >
        <div class="detail-inner">
        ${d?M`<div class="operator-line">
              <span class="detail-label">
                ${W(`card.operator_heading`)}
              </span>
              <span class="operator-name" lang="de">${d}</span>
            </div>`:P}
        ${e.description?M`<div class="station-note">
              <ha-icon
                icon="mdi:information-outline"
                aria-hidden="true"
              ></ha-icon>
              <span>${e.description}</span>
            </div>`:P}
        ${s.length>0?M`<div class="rack-block">
              <div class="detail-label">
                ${W(`card.charging_points_heading`)}
              </div>
              ${this._renderRack(s)}
              ${u?M`<div class="fees-line">${u}</div>`:P}
            </div>`:P}
        ${this._renderOpeningHoursSection(e.openingHours,t)}
        ${l.length>0?M`<div class="detail-section">
              <div class="detail-label">
                ${W(`card.payment_heading`)}
              </div>
              <div class="chip-row">
                ${l.map(e=>M`
                    <span class="chip muted" title=${e.label}>
                      <ha-icon icon=${e.icon} aria-hidden="true"></ha-icon>
                      <span>${e.label}</span>
                    </span>
                  `)}
              </div>
            </div>`:P}
        ${n&&o.length>0?M`<div class="detail-section">
              <div class="detail-label">
                ${W(`card.amenities_heading`)}
              </div>
              <div class="chip-row">
                ${o.map(e=>M`
                    <span class="chip muted" title=${e.label}>
                      <ha-icon icon=${e.icon} aria-hidden="true"></ha-icon>
                      <span>${e.label}</span>
                    </span>
                  `)}
              </div>
            </div>`:P}
        ${c?M`<div class="detail-section">
              <div class="detail-label">
                ${W(`card.address_heading`)}
              </div>
              <div class="detail-text" lang="de">${c}</div>
            </div>`:P}
        <div class="actions">
          ${r?M`<a
                class="btn-primary"
                href=${r}
                target="_blank"
                rel="noopener noreferrer"
                @click=${e=>e.stopPropagation()}
              >
                <ha-icon
                  icon="mdi:map-marker-radius-outline"
                  aria-hidden="true"
                ></ha-icon>
                <span>${W(`card.open_in_maps`)}</span>
              </a>`:P}
          ${(()=>{let t=Ct(e.website);return t?M`<a
                  class="btn-secondary"
                  href=${t}
                  target="_blank"
                  rel="noopener noreferrer"
                  @click=${e=>e.stopPropagation()}
                >
                  <ha-icon icon="mdi:web" aria-hidden="true"></ha-icon>
                  <span>${W(`card.website`)}</span>
                </a>`:P})()}
          ${e.phoneNumber?M`<a
                class="btn-secondary"
                href=${`tel:${e.phoneCountryCode??``}${e.phoneNumber}`}
                @click=${e=>e.stopPropagation()}
              >
                <ha-icon icon="mdi:phone-outline" aria-hidden="true"></ha-icon>
                <span>${W(`card.call`)}</span>
              </a>`:P}
          ${(()=>{let t=Ct(e.priceUrl);return t?M`<a
                  class="btn-secondary"
                  href=${t}
                  target="_blank"
                  rel="noopener noreferrer"
                  @click=${e=>e.stopPropagation()}
                >
                  <ha-icon
                    icon="mdi:cash-multiple"
                    aria-hidden="true"
                  ></ha-icon>
                  <span>${W(`card.tariff`)}</span>
                </a>`:P})()}
        </div>
        </div>
      </div>
    `}_renderRack(e){return M`
      <div class="rack">
        ${e.map(e=>this._renderRackSlot(e))}
      </div>
    `}_renderRackSlot(e){let t=pt(e),{bucket:n,overlay:r}=vt(e),i=this._pointTooltip(e),a=this._pointAriaLabel(e,t),o=t?M`<span class="power-badge" data-type=${t}
          >${t.toUpperCase()}</span
        >`:P;if(r){let e=r.bgTint?`rack-slot slot-tint-${r.bgTint}`:`rack-slot`;return M`
        <div
          class=${e}
          role="group"
          aria-label=${a}
          data-status=${n}
          title=${i}
        >
          <ha-icon
            class=${`rack-overlay-icon tone-${r.tone}`}
            icon=${r.icon}
          ></ha-icon>
        </div>
      `}let s=St(e),c=yt(e.capacityKw);return M`
      <div
        class="rack-slot"
        role="group"
        aria-label=${a}
        data-status=${n}
        title=${i}
      >
        <span class="rack-dot" data-status=${n}></span>
        ${o}
        <span class="rack-kw">
          <span class="rack-kw-num">${c}</span
          ><span class="rack-kw-unit">kW</span>
        </span>
        <span class="rack-connector">${s}</span>
      </div>
    `}_pointAriaLabel(e,t){let n=[];t&&n.push(t.toUpperCase()),e.capacityKw&&n.push(`${yt(e.capacityKw)} kW`);let r=St(e);r&&r!==`–`&&n.push(r);let i=ht(e.status);return i&&n.push(i),n.join(` · `)}_pointTooltip(e){let t=[`${e.evseId??``} · ${ht(e.status)}`.trim()],n=e.startFeeCent??0;n>0&&t.push(`${W(`card.start_fee_label`)}: ${J(n)} €`);let r=e.blockingFeeCentMin??0,i=e.blockingFeeFromMinute??0;return r>0&&i>0&&t.push(`${bt(r)} ${W(`card.blocking_fee_label`).replaceAll(`{from}`,String(i))}`),t.join(` · `)}_renderOpeningHoursSection(e,t){if(!e||e.length===0)return P;let n=this._formatOpeningHours(e);if(n.length===0)return P;let r=t===!0?`flag ok`:t===!1?`flag warn`:null,i=t===!0?`mdi:clock-check-outline`:t===!1?`mdi:clock-alert-outline`:null,a=t===!0?W(`card.open_now`):t===!1?W(`card.closed_now`):null;return M`
      <div class="detail-section">
        <div class="detail-label">
          ${W(`card.opening_hours_heading`)}
        </div>
        <div class="hours-row">
          <dl class="hours-lines">
            ${n.map(e=>M`<div class="hours-line">
                <dt class="hours-day">${e.day}</dt>
                <dd class="hours-time">${e.time}</dd>
              </div>`)}
          </dl>
          ${a&&r&&i?M`<span class=${r}>
                <ha-icon icon=${i} aria-hidden="true"></ha-icon>
                <span>${a}</span>
              </span>`:P}
        </div>
      </div>
    `}_formatOpeningHours(e){let t=[];for(let n of e){let e=this._formatSingleRange(n);e&&t.push(e)}return t}_formatSingleRange(e){let t=this._shortDay(e.fromWeekday),n=this._shortDay(e.toWeekday);if(!t||!n)return null;let r=e.fromTime===`00:00`&&(e.toTime===`23:59`||e.toTime===`24:00`);return{day:e.fromWeekday===e.toWeekday?t:`${t}–${n}`,time:r?W(`card.always_open_short`):`${e.fromTime}–${e.toTime}`}}_shortDay(e){switch((e??``).toUpperCase()){case`MONDAY`:return W(`weekday.mo`);case`TUESDAY`:return W(`weekday.tu`);case`WEDNESDAY`:return W(`weekday.we`);case`THURSDAY`:return W(`weekday.th`);case`FRIDAY`:return W(`weekday.fr`);case`SATURDAY`:return W(`weekday.sa`);case`SUNDAY`:return W(`weekday.su`);default:return``}}_isOpenNow(e,t,n){if(!e||e.length===0)return null;let r=this._minuteOfWeek(t,n);if(r==null)return null;for(let t of e){let e=this._hoursToMow(t.fromWeekday,t.fromTime),n=this._hoursToMow(t.toWeekday,t.toTime);if(e!=null&&n!=null){if(e<=n){if(r>=e&&r<=n)return!0}else if(r>=e||r<=n)return!0}}return!1}_minuteOfWeek(e,t){try{let n=new Intl.DateTimeFormat(`en-US`,{timeZone:t,weekday:`short`,hour:`2-digit`,minute:`2-digit`,hour12:!1}).formatToParts(e),r=n.find(e=>e.type===`weekday`)?.value??``,i=n.find(e=>e.type===`hour`)?.value??``,a=n.find(e=>e.type===`minute`)?.value??``,o=Mt[r];if(o===void 0)return null;let s=parseInt(i,10),c=parseInt(a,10);return!Number.isFinite(s)||!Number.isFinite(c)?null:(s===24&&(s=0),o*1440+s*60+c)}catch{return null}}_hoursToMow(e,t){let n=jt[(e??``).toUpperCase()];if(n===void 0)return null;let[r,i]=(t??``).split(`:`),a=parseInt(r??``,10),o=parseInt(i??``,10);return!Number.isFinite(a)||!Number.isFinite(o)?null:n*1440+a*60+o}_paymentChips(e){let t=new Set,n=[];for(let r of e)for(let e of r.authenticationMode??[]){if(t.has(e))continue;t.add(e);let r=this._authLabel(e);r&&n.push(r)}return n}_authLabel(e){switch(e){case`APP`:return{icon:`mdi:cellphone`,label:W(`auth.app`)};case`QR`:return{icon:`mdi:qrcode`,label:W(`auth.qr`)};case`RFID_READER`:return{icon:`mdi:credit-card-wireless-outline`,label:W(`auth.rfid`)};case`CHARGING_CONTRACT`:return{icon:`mdi:handshake-outline`,label:W(`auth.contract`)};case`DEBIT_CARD`:return{icon:`mdi:credit-card-outline`,label:W(`auth.debit`)};case`CREDIT_CARD`:return{icon:`mdi:credit-card`,label:W(`auth.credit`)};case`CONTACTLESS_CARD_SUPPORT`:return{icon:`mdi:contactless-payment`,label:W(`auth.contactless`)};default:return null}}_feesLine(e){let t=e.map(e=>e.startFeeCent??0).filter(e=>e>0),n=e.map(e=>({cent:e.blockingFeeCentMin??0,fromMin:e.blockingFeeFromMinute??0})).filter(e=>e.cent>0&&e.fromMin>0),r=[];if(t.length>0){let e=Math.max(...t);r.push(`+ ${J(e)} € ${W(`card.start_fee_label`)}`)}if(n.length>0){let e=Math.max(...n.map(e=>e.cent)),t=Math.min(...n.map(e=>e.fromMin));r.push(`${bt(e)} ${W(`card.blocking_fee_label`).replaceAll(`{from}`,String(t))}`)}return r.length>0?r.join(`, `):null}_statusLevel(e,t,n,r=null){if(!t||r===!1)return`inactive`;let i=n.length;if(!e||i===0)return`unknown`;let a=0,o=0,s=0;for(let e of n){let t=q(e.status);t===`AVAILABLE`?a++:t===`CHARGING`||t===`OCCUPIED`||t===`RESERVED`||t===`BLOCKED`?o++:(t===`OUTOFORDER`||t===`FAULTED`||t===`INOPERATIVE`||t===`UNAVAILABLE`)&&s++}return a===0?o===0&&s>0?`inactive`:`busy`:a<i?`partial`:`ok`}_statusAria(e,t,n){return e===`inactive`?W(`card.inactive`):e===`unknown`?W(`card.status_unknown`):`${t} / ${n} ${W(`card.live_suffix`)}`}_toggle(e){let t=new Set(this._expanded);t.has(e)?t.delete(e):t.add(e),this._expanded=t}_onKey(e,t){(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),this._toggle(t))}_priceText(e){if(e.length===0)return``;if(e.some(e=>e.freeOfCharge))return W(`card.gratis`);let t=e.filter(e=>!e.freeOfCharge&&e.priceCentKwh>0).map(e=>e.priceCentKwh);if(t.length>0)return`${J(Math.min(...t))} €/kWh`;let n=e.filter(e=>!e.freeOfCharge&&e.priceCentMin>0).map(e=>e.priceCentMin);return n.length>0?`${J(Math.min(...n))} €/min`:``}_address(e){let t=[];e.street&&t.push(e.street);let n=[e.postCode,e.city].filter(Boolean).join(` `);return n&&t.push(n),t.join(`, `)}_amenityItems(e){return[{flag:e.greenEnergy,icon:`mdi:leaf`,label:W(`amenities.green_energy`)},{flag:e.austrianEcoLabel,icon:`mdi:certificate-outline`,label:W(`amenities.austrian_ecolabel`)},{flag:e.freeParking,icon:`mdi:parking`,label:W(`amenities.free_parking`)},{flag:e.roofedParking,icon:`mdi:home-roof`,label:W(`amenities.roofed_parking`)},{flag:e.illuminatedParking,icon:`mdi:lightbulb-outline`,label:W(`amenities.illuminated_parking`)},{flag:(e.barrierFreeParkingPlaces??0)>0,icon:`mdi:wheelchair-accessibility`,label:W(`amenities.barrier_free`)},{flag:e.cateringService,icon:`mdi:silverware-fork-knife`,label:W(`amenities.catering`)},{flag:e.bathroomsAvailable,icon:`mdi:toilet`,label:W(`amenities.bathrooms`)},{flag:e.restingFacilities,icon:`mdi:sofa`,label:W(`amenities.resting`)}].filter(e=>e.flag)}_formatKm(e){let t=typeof e==`number`?e:parseFloat(String(e??``));if(!Number.isFinite(t))return`–`;try{return new Intl.NumberFormat(`de-AT`,{minimumFractionDigits:2,maximumFractionDigits:2}).format(t)}catch{return t.toFixed(2)}}static{this.styles=dt}};Y([B({attribute:!1})],$.prototype,`hass`,void 0),Y([V()],$.prototype,`config`,void 0),Y([V()],$.prototype,`_expanded`,void 0),Y([V()],$.prototype,`_versionMismatch`,void 0),$=Y([z(`ladestellen-austria-card`)],$);export{$ as LadestellenAustriaCard};