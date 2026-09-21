/*! Ladestellen Austria Card — bundled by Rolldown. Edit sources in src/, then `npm run build`. */
var e=Object.defineProperty,t=(t,n)=>{let r={};for(var i in t)e(r,i,{get:t[i],enumerable:!0});return n||e(r,Symbol.toStringTag,{value:`Module`}),r};
/**
* @license
* Copyright 2019 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
const n=globalThis,r=n.ShadowRoot&&(n.ShadyCSS===void 0||n.ShadyCSS.nativeShadow)&&`adoptedStyleSheets`in Document.prototype&&`replace`in CSSStyleSheet.prototype,i=Symbol(),a=/* @__PURE__ */ new WeakMap;var o=class{constructor(e,t,n){if(this._$cssResult$=!0,n!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(r&&e===void 0){let n=t!==void 0&&t.length===1;n&&(e=a.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&a.set(t,e))}return e}toString(){return this.cssText}};const s=e=>new o(typeof e==`string`?e:e+``,void 0,i),c=(e,...t)=>new o(e.length===1?e[0]:t.reduce((t,n,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if(typeof e==`number`)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: `+e+`. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)})(n)+e[r+1],e[0]),e,i),l=(e,t)=>{if(r)e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let r of t){let t=document.createElement(`style`),i=n.litNonce;i!==void 0&&t.setAttribute(`nonce`,i),t.textContent=r.cssText,e.appendChild(t)}},u=r?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t=``;for(let n of e.cssRules)t+=n.cssText;return s(t)})(e):e,{is:d,defineProperty:f,getOwnPropertyDescriptor:p,getOwnPropertyNames:ee,getOwnPropertySymbols:m,getPrototypeOf:h}=Object,g=globalThis,_=g.trustedTypes,te=_?_.emptyScript:``,ne=g.reactiveElementPolyfillSupport,v=(e,t)=>e,y={toAttribute(e,t){
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
switch(t){case Boolean:e=e?te:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},b=(e,t)=>!d(e,t),re={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol(`metadata`),g.litPropertyMetadata??=/* @__PURE__ */ new WeakMap;var x=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=re){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let n=Symbol(),r=this.getPropertyDescriptor(e,n,t);r!==void 0&&f(this.prototype,e,r)}}static getPropertyDescriptor(e,t,n){let{get:r,set:i}=p(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){let a=r?.call(this);i?.call(this,t),this.requestUpdate(e,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??re}static _$Ei(){if(this.hasOwnProperty(v(`elementProperties`)))return;let e=h(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(v(`finalized`)))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v(`properties`))){let e=this.properties,t=[...ee(e),...m(e)];for(let n of t)this.createProperty(n,e[n])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=/* @__PURE__ */ new Map;for(let[e,t]of this.elementProperties){let n=this._$Eu(e,t);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let n=new Set(e.flat(1/0).reverse());for(let e of n)t.unshift(u(e))}else e!==void 0&&t.push(u(e));return t}static _$Eu(e,t){let n=t.attribute;return!1===n?void 0:typeof n==`string`?n:typeof e==`string`?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=/* @__PURE__ */ new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=/* @__PURE__ */ new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=/* @__PURE__ */ new Map,t=this.constructor.elementProperties;for(let n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return l(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){let n=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,n);if(r!==void 0&&!0===n.reflect){let i=(n.converter?.toAttribute===void 0?y:n.converter).toAttribute(t,n.type);this._$Em=e,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(e,t){let n=this.constructor,r=n._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let e=n.getPropertyOptions(r),i=typeof e.converter==`function`?{fromAttribute:e.converter}:e.converter?.fromAttribute===void 0?y:e.converter;this._$Em=r;let a=i.fromAttribute(t,e.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(e,t,n,r=!1,i){if(e!==void 0){let a=this.constructor;if(!1===r&&(i=this[e]),n??=a.getPropertyOptions(e),!((n.hasChanged??b)(i,t)||n.useDefault&&n.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:r,wrapped:i},a){n&&!(this._$Ej??=/* @__PURE__ */ new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==i||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=/* @__PURE__ */ new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,n]of e){let{wrapped:e}=n,r=this[t];!0!==e||this._$AL.has(t)||r===void 0||this.C(t,void 0,n,r)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=/* @__PURE__ */ new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};x.elementStyles=[],x.shadowRootOptions={mode:`open`},x[v(`elementProperties`)]=/* @__PURE__ */ new Map,x[v(`finalized`)]=/* @__PURE__ */ new Map,ne?.({ReactiveElement:x}),(g.reactiveElementVersions??=[]).push(`2.1.2`);
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
const ie=globalThis,ae=e=>e,S=ie.trustedTypes,oe=S?S.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,se=`$lit$`,C=`lit$${Math.random().toFixed(9).slice(2)}$`,ce=`?`+C,le=`<${ce}>`,w=document,T=()=>w.createComment(``),E=e=>e===null||typeof e!=`object`&&typeof e!=`function`,ue=Array.isArray,de=e=>ue(e)||typeof e?.[Symbol.iterator]==`function`,fe=`[ 	
\f\r]`,D=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,pe=/-->/g,me=/>/g,O=RegExp(`>|${fe}(?:([^\\s"'>=/]+)(${fe}*=${fe}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),he=/'/g,ge=/"/g,_e=/^(?:script|style|textarea|title)$/i,k=(e=>(t,...n)=>({_$litType$:e,strings:t,values:n}))(1),A=Symbol.for(`lit-noChange`),j=Symbol.for(`lit-nothing`),ve=/* @__PURE__ */ new WeakMap,M=w.createTreeWalker(w,129);function ye(e,t){if(!ue(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return oe===void 0?t:oe.createHTML(t)}const be=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:t===3?`<math>`:``,o=D;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===D?c[1]===`!--`?o=pe:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=O):(_e.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=O):o=me:o===O?c[0]===`>`?(o=i??D,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?O:c[3]===`"`?ge:he):o===ge||o===he?o=O:o===pe||o===me?o=D:(o=O,i=void 0);let d=o===O&&e[t+1].startsWith(`/>`)?` `:``;a+=o===D?n+le:l>=0?(r.push(s),n.slice(0,l)+se+n.slice(l)+C+d):n+C+(l===-2?t:d)}return[ye(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:t===3?`</math>`:``)),r]};var N=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=be(t,n);if(this.el=e.createElement(l,r),M.currentNode=this.el.content,n===2||n===3){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;(i=M.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes())for(let e of i.getAttributeNames())if(e.endsWith(se)){let t=u[o++],n=i.getAttribute(e).split(C),r=/([.?@])?(.*)/.exec(t);c.push({type:1,index:a,name:r[2],strings:n,ctor:r[1]===`.`?Ce:r[1]===`?`?we:r[1]===`@`?Te:F}),i.removeAttribute(e)}else e.startsWith(C)&&(c.push({type:6,index:a}),i.removeAttribute(e));if(_e.test(i.tagName)){let e=i.textContent.split(C),t=e.length-1;if(t>0){i.textContent=S?S.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],T()),M.nextNode(),c.push({type:2,index:++a});i.append(e[t],T())}}}else if(i.nodeType===8){if(i.data===ce)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(C,e+1))!==-1;)c.push({type:7,index:a}),e+=C.length-1}}a++}}static createElement(e,t){let n=w.createElement(`template`);return n.innerHTML=e,n}};function P(e,t,n=e,r){if(t===A)return t;let i=r===void 0?n._$Cl:n._$Co?.[r],a=E(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(e),i._$AT(e,n,r)),r===void 0?n._$Cl=i:(n._$Co??=[])[r]=i),i!==void 0&&(t=P(e,i._$AS(e,t.values),i,r)),t}var xe=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??w).importNode(t,!0);M.currentNode=r;let i=M.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new Se(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new Ee(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=M.nextNode(),a++)}return M.currentNode=w,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},Se=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=j,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=P(this,e,t),E(e)?e===j||e==null||e===``?(this._$AH!==j&&this._$AR(),this._$AH=j):e!==this._$AH&&e!==A&&this._(e):e._$litType$===void 0?e.nodeType===void 0?de(e)?this.k(e):this._(e):this.T(e):this.$(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==j&&E(this._$AH)?this._$AA.nextSibling.data=e:this.T(w.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=N.createElement(ye(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new xe(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=ve.get(e.strings);return t===void 0&&ve.set(e.strings,t=new N(e)),t}k(t){ue(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.O(T()),this.O(T()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=ae(e).nextSibling;ae(e).remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},F=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,i){this.type=1,this._$AH=j,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(/* @__PURE__ */ new String),this.strings=n):this._$AH=j}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=P(this,e,t,0),a=!E(e)||e!==this._$AH&&e!==A,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=P(this,r[n+o],t,o),s===A&&(s=this._$AH[o]),a||=!E(s)||s!==this._$AH[o],s===j?e=j:e!==j&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===j?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},Ce=class extends F{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===j?void 0:e}},we=class extends F{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==j)}},Te=class extends F{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=P(this,e,t,0)??j)===A)return;let n=this._$AH,r=e===j&&n!==j||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==j&&(n===j||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Ee=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){P(this,e)}};const De=ie.litHtmlPolyfillSupport;De?.(N,Se),(ie.litHtmlVersions??=[]).push(`3.3.2`);const Oe=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new Se(t.insertBefore(T(),e),e,void 0,n??{})}return i._$AI(e),i},ke=globalThis
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
;var I=class extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Oe(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return A}};I._$litElement$=!0,I.finalized=!0,ke.litElementHydrateSupport?.({LitElement:I});const Ae=ke.litElementPolyfillSupport;Ae?.({LitElement:I}),(ke.litElementVersions??=[]).push(`4.2.2`);
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
const L=e=>(t,n)=>{n===void 0?customElements.define(e,t):n.addInitializer(()=>{customElements.define(e,t)})},je={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:b},Me=(e=je,t,n)=>{
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
let{kind:r,metadata:i}=n,a=globalThis.litPropertyMetadata.get(i);if(a===void 0&&globalThis.litPropertyMetadata.set(i,a=/* @__PURE__ */ new Map),r===`setter`&&((e=Object.create(e)).wrapped=!0),a.set(n.name,e),r===`accessor`){let{name:r}=n;return{set(n){let i=t.get.call(this);t.set.call(this,n),this.requestUpdate(r,i,e,!0,n)},init(t){return t!==void 0&&this.C(r,void 0,e,t),t}}}if(r===`setter`){let{name:r}=n;return function(n){let i=this[r];t.call(this,n),this.requestUpdate(r,i,e,!0,n)}}throw Error(`Unsupported decorator location: `+r)};function R(e){return(t,n)=>typeof n==`object`?Me(e,t,n):((e,t,n)=>{let r=t.hasOwnProperty(n);return t.constructor.createProperty(n,e),r?Object.getOwnPropertyDescriptor(t,n):void 0})(e,t,n)}
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/function z(e){return R({...e,state:!0,attribute:!1})}function B(e,t,n){e.dispatchEvent(new CustomEvent(t,{detail:n,bubbles:!0,composed:!0}))}const Ne=[`Type 2`,`CCS`,`CHAdeMO`,`Type 1`,`Tesla`,`Schuko`,`CEE`],Pe=[{key:`green_energy`,icon:`mdi:leaf`,label_key:`amenities.green_energy`},{key:`austrian_ecolabel`,icon:`mdi:certificate-outline`,label_key:`amenities.austrian_ecolabel`},{key:`free_parking`,icon:`mdi:parking`,label_key:`amenities.free_parking`},{key:`roofed_parking`,icon:`mdi:home-roof`,label_key:`amenities.roofed_parking`},{key:`illuminated_parking`,icon:`mdi:lightbulb-outline`,label_key:`amenities.illuminated_parking`},{key:`barrier_free`,icon:`mdi:wheelchair-accessibility`,label_key:`amenities.barrier_free`},{key:`catering`,icon:`mdi:silverware-fork-knife`,label_key:`amenities.catering`},{key:`bathrooms`,icon:`mdi:toilet`,label_key:`amenities.bathrooms`},{key:`resting`,icon:`mdi:sofa`,label_key:`amenities.resting`}],Fe=[{key:`APP`,icon:`mdi:cellphone`,label_key:`auth.app`},{key:`QR`,icon:`mdi:qrcode`,label_key:`auth.qr`},{key:`RFID_READER`,icon:`mdi:credit-card-wireless-outline`,label_key:`auth.rfid`},{key:`CHARGING_CONTRACT`,icon:`mdi:handshake-outline`,label_key:`auth.contract`},{key:`DEBIT_CARD`,icon:`mdi:credit-card-outline`,label_key:`auth.debit`},{key:`CREDIT_CARD`,icon:`mdi:credit-card`,label_key:`auth.credit`},{key:`CONTACTLESS_CARD_SUPPORT`,icon:`mdi:contactless-payment`,label_key:`auth.contactless`}];var Ie=/* @__PURE__ */ t({amenities:()=>Be,auth:()=>Ve,card:()=>Re,common:()=>Le,default:()=>We,editor:()=>Ue,parking:()=>ze,weekday:()=>He}),Le={version:`Version`,invalid_configuration:`Invalid configuration`,invalid_entity:`Card config: 'entity' must be a string referencing a sensor entity_id.`,invalid_station_id:`Card config: 'station_id' must be a string.`,loading:`Loading…`,version_update:`A newer card version ({v}) is available. Reload to apply.`,version_reload:`Reload`,version_reload_stuck:`Reload didn't pick up the new version. Close this browser tab and reopen the dashboard, or clear your browser's site data for Home Assistant.`},Re={no_entity:`Select a Ladestellen Austria sensor in the card editor.`,no_stations:`No stations match the current filters.`,hero_context:`to the nearest charger in {city}`,hero_count:`{count} stations`,hero_count_filtered:`{filtered} of {total} stations`,hero_range:`{min}–{max} km range`,inactive:`inactive`,status_unknown:`live availability unavailable`,gratis:`Free`,live_suffix:`free`,open_in_maps:`Open in Maps`,website:`Website`,call:`Call`,address_heading:`Address`,amenities_heading:`Amenities`,pinned:`Pinned`,unpin:`Remove pin`,orphan_pin_title:`Pinned station not in range`,operator_heading:`Operator`,charging_points_heading:`Charging points`,opening_hours_heading:`Opening hours`,payment_heading:`Payment`,open_now:`Open now`,closed_now:`Closed`,always_open_short:`24h`,start_fee_label:`start fee`,blocking_fee_label:`¢/min from {from} min.`,point_status_available:`Available`,point_status_charging:`Charging`,point_status_occupied:`Occupied`,point_status_reserved:`Reserved`,point_status_blocked:`Blocked`,point_status_out_of_order:`Out of order`,point_status_faulted:`Faulted`,point_status_inoperative:`Inoperative`,point_status_unavailable:`Unavailable`,point_status_out_of_stock:`Empty`,point_status_planned:`Planned`,point_status_removed:`Removed`,point_status_unknown:`Unknown`,tariff:`Tariff`,dynamic_follows_entity:`Tracking: {entity}`},ze={editor_station_heading:`Station`,pick_station_hint:`Pick one station from the sensor. The card shows that station's charging points as parking slots.`,no_station_selected:`Pick a station in the card editor.`,station_not_found:`The selected station is not in the sensor's current results.`,station_not_in_range:`Selected station not in range`,available_count:`{avail} of {total} free`,no_points:`No charging points reported for this station.`,slot_status_free:`free`,slot_status_busy:`in use`,slot_status_out_of_order:`out of order`,slot_status_unknown:`unknown`,slot_status_reserved:`reserved`,slot_status_blocked:`blocked`,slot_status_out_of_stock:`empty`,slot_status_faulted:`faulted`,slot_status_inoperative:`offline`,slot_status_unavailable:`n/a`,slot_status_planned:`planned`,slot_status_removed:`removed`},Be={green_energy:`Green energy`,free_parking:`Free parking`,roofed_parking:`Roofed parking`,illuminated_parking:`Illuminated`,barrier_free:`Accessible`,austrian_ecolabel:`Austrian Eco-Label`,catering:`Catering nearby`,bathrooms:`Restrooms`,resting:`Resting area`},Ve={app:`App`,qr:`QR code`,rfid:`RFID`,contract:`Contract`,debit:`Debit card`,credit:`Credit card`,contactless:`Contactless`},He={mo:`Mo`,tu:`Tu`,we:`We`,th:`Th`,fr:`Fr`,sa:`Sa`,su:`Su`},Ue={section_main:`Main`,section_display:`Display`,section_filters:`Filters`,section_chip_filters:`Filter by type`,section_appearance:`Appearance`,name:`Card title (optional)`,entity:`Sensor`,entity_missing:`Selected sensor is unavailable. Pick a different Ladestellen Austria sensor.`,max_stations:`Stations to show`,show_hero:`Show hero block`,show_pricing:`Show pricing`,show_amenities:`Show amenity details`,sort_by_power:`Sort by power (fastest first)`,logo_adapt_to_theme:`Adapt logo to theme (black on light, white on dark)`,hide_header:`Hide header`,show_free_count:`Show free / total counter`,car_color_mode:`Car colour`,car_color_random:`Random per spot`,car_color_theme:`Theme accent colour`,car_color_fixed:`Single colour`,car_color_pick:`Pick car colour`,asphalt_style:`Asphalt style`,asphalt_style_default:`Default (flat grey)`,asphalt_style_textured:`Textured asphalt`,paint_width:`Lane-line width`,paint_width_thin:`Thin`,paint_width_medium:`Medium`,paint_width_wide:`Wide`,icon_paint_mode:`Icon colour`,icon_paint_default:`Default (state colours)`,icon_paint_white:`White (painted on asphalt)`,only_available:`Only currently available stations`,only_free:`Only stations with free charging`,only_open:`Only currently open stations`,connector_filter_hint:`Tap connector types to only show stations offering at least one of them. Empty = no filter.`,amenity_filter_hint:`Tap amenities to narrow to stations offering all selected features (AND). Empty = no filter.`,payment_filter_hint:`Tap payment methods to only show stations accepting at least one of them. Empty = no filter.`,hint_compliance:`The E-Control logo (linking to e-control.at) and the 'Datenquelle: E-Control' attribution in the footer are required by the ladestellen.at Terms of Use.`,section_pinned:`Pinned stations`,pin_hint:`Pinned stations always appear first and bypass filters. They still count toward the display cap above.`,pin_select_sensor_first:`Select a sensor first to see available stations.`,pin_no_stations_yet:`No stations returned yet — wait for the next refresh.`,pin_orphans_heading:`Pinned but not in range (click to remove):`,pin_unpin:`Remove`,pin_disabled_dynamic:`Dynamic location mode is active on this sensor — pinned stations are disabled because the list follows your current position. Existing pins are preserved for when you switch back to fixed mode.`},We={common:Le,card:Re,parking:ze,amenities:Be,auth:Ve,weekday:He,editor:Ue},Ge=/* @__PURE__ */ t({amenities:()=>Ye,auth:()=>Xe,card:()=>qe,common:()=>Ke,default:()=>$e,editor:()=>Qe,parking:()=>Je,weekday:()=>Ze}),Ke={version:`Version`,invalid_configuration:`Ungültige Konfiguration`,invalid_entity:`Kartenkonfiguration: „entity“ muss ein String mit einer Sensor-entity_id sein.`,invalid_station_id:`Kartenkonfiguration: „station_id“ muss ein String sein.`,loading:`Lade…`,version_update:`Eine neuere Kartenversion ({v}) ist verfügbar. Bitte neu laden.`,version_reload:`Neu laden`,version_reload_stuck:`Neu laden hat die neue Version nicht übernommen. Schließe diesen Browser-Tab und öffne das Dashboard erneut, oder lösche die Website-Daten für Home Assistant in den Browser-Einstellungen.`},qe={no_entity:`Bitte einen Ladestellen-Austria-Sensor im Karten-Editor auswählen.`,no_stations:`Keine Ladestellen entsprechen den aktuellen Filtern.`,hero_context:`zur nächsten Ladestelle in {city}`,hero_count:`{count} Ladestellen`,hero_count_filtered:`{filtered} von {total} Ladestellen`,hero_range:`{min}–{max} km Umkreis`,inactive:`inaktiv`,status_unknown:`Live-Status nicht verfügbar`,gratis:`Gratis`,live_suffix:`frei`,open_in_maps:`In Karte öffnen`,website:`Website`,call:`Anrufen`,address_heading:`Adresse`,amenities_heading:`Ausstattung`,pinned:`Angepinnt`,unpin:`Pin entfernen`,orphan_pin_title:`Angepinnte Ladestelle außerhalb des Umkreises`,operator_heading:`Betreiber`,charging_points_heading:`Ladepunkte`,opening_hours_heading:`Öffnungszeiten`,payment_heading:`Bezahlung`,open_now:`Jetzt geöffnet`,closed_now:`Geschlossen`,always_open_short:`24h`,start_fee_label:`Startgebühr`,blocking_fee_label:`¢/min ab {from} Min.`,point_status_available:`Verfügbar`,point_status_charging:`Lädt`,point_status_occupied:`Belegt`,point_status_reserved:`Reserviert`,point_status_blocked:`Blockiert`,point_status_out_of_order:`Außer Betrieb`,point_status_faulted:`Defekt`,point_status_inoperative:`Nicht in Betrieb`,point_status_unavailable:`Nicht verfügbar`,point_status_out_of_stock:`Leer`,point_status_planned:`Geplant`,point_status_removed:`Entfernt`,point_status_unknown:`Unbekannt`,tariff:`Tarif`,dynamic_follows_entity:`Folgt: {entity}`},Je={editor_station_heading:`Ladestelle`,pick_station_hint:`Eine Ladestelle aus dem Sensor auswählen. Die Karte zeigt deren Ladepunkte als Parkplätze.`,no_station_selected:`Bitte eine Ladestelle im Karten-Editor auswählen.`,station_not_found:`Die gewählte Ladestelle ist aktuell nicht in den Sensor-Ergebnissen.`,station_not_in_range:`Gewählte Ladestelle nicht im Umkreis`,available_count:`{avail} von {total} frei`,no_points:`Keine Ladepunkte für diese Ladestelle vorhanden.`,slot_status_free:`frei`,slot_status_busy:`belegt`,slot_status_out_of_order:`außer Betrieb`,slot_status_unknown:`unbekannt`,slot_status_reserved:`reserviert`,slot_status_blocked:`gesperrt`,slot_status_out_of_stock:`leer`,slot_status_faulted:`defekt`,slot_status_inoperative:`offline`,slot_status_unavailable:`n. v.`,slot_status_planned:`geplant`,slot_status_removed:`entfernt`},Ye={green_energy:`Ökostrom`,free_parking:`Kostenloses Parken`,roofed_parking:`Überdacht`,illuminated_parking:`Beleuchtet`,barrier_free:`Barrierefrei`,austrian_ecolabel:`Umweltzeichen`,catering:`Gastronomie`,bathrooms:`WC`,resting:`Ruhebereich`},Xe={app:`App`,qr:`QR-Code`,rfid:`RFID`,contract:`Vertrag`,debit:`Bankomat`,credit:`Kreditkarte`,contactless:`Kontaktlos`},Ze={mo:`Mo`,tu:`Di`,we:`Mi`,th:`Do`,fr:`Fr`,sa:`Sa`,su:`So`},Qe={section_main:`Allgemein`,section_display:`Anzeige`,section_filters:`Filter`,section_chip_filters:`Nach Typ filtern`,section_appearance:`Darstellung`,name:`Kartentitel (optional)`,entity:`Sensor`,entity_missing:`Ausgewählter Sensor ist nicht verfügbar. Bitte einen anderen Ladestellen-Austria-Sensor wählen.`,max_stations:`Anzahl angezeigter Ladestellen`,show_hero:`Hauptbereich anzeigen`,show_pricing:`Preise anzeigen`,show_amenities:`Ausstattungs-Details anzeigen`,sort_by_power:`Nach Leistung sortieren (schnellste zuerst)`,logo_adapt_to_theme:`Logo an Design anpassen (schwarz auf hell, weiß auf dunkel)`,hide_header:`Kopfzeile ausblenden`,show_free_count:`Frei/Gesamt-Zähler anzeigen`,car_color_mode:`Auto-Farbe`,car_color_random:`Zufällig pro Platz`,car_color_fixed:`Eigene Farbe`,car_color_theme:`Akzentfarbe des Designs`,car_color_pick:`Auto-Farbe wählen`,asphalt_style:`Asphalt-Stil`,asphalt_style_default:`Standard (flaches Grau)`,asphalt_style_textured:`Strukturierter Asphalt`,paint_width:`Linienbreite`,paint_width_thin:`Schmal`,paint_width_medium:`Mittel`,paint_width_wide:`Breit`,icon_paint_mode:`Symbol-Farbe`,icon_paint_default:`Standard (Statusfarben)`,icon_paint_white:`Weiß (auf Asphalt gemalt)`,only_available:`Nur aktuell verfügbare Ladestellen`,only_free:`Nur Ladestellen mit Gratis-Laden`,only_open:`Nur aktuell geöffnete Ladestellen`,connector_filter_hint:`Steckertypen antippen, um nur Ladestellen mit mindestens einem davon anzuzeigen. Leer = kein Filter.`,amenity_filter_hint:`Ausstattungsmerkmale antippen, um nur Ladestellen mit allen gewählten Merkmalen anzuzeigen (UND). Leer = kein Filter.`,payment_filter_hint:`Bezahlmethoden antippen, um nur Ladestellen anzuzeigen, die mindestens eine davon akzeptieren. Leer = kein Filter.`,hint_compliance:`Die Anzeige des E-Control-Logos (verlinkt auf e-control.at) und des Hinweises „Datenquelle: E-Control“ in der Fußzeile ist von den ladestellen.at-Nutzungsbedingungen vorgeschrieben.`,section_pinned:`Angepinnte Ladestellen`,pin_hint:`Angepinnte Ladestellen erscheinen immer zuerst und ignorieren Filter. Sie zählen weiterhin zur obigen Maximalanzahl.`,pin_select_sensor_first:`Zuerst einen Sensor auswählen, um verfügbare Ladestellen zu sehen.`,pin_no_stations_yet:`Noch keine Ladestellen geladen — auf die nächste Aktualisierung warten.`,pin_orphans_heading:`Angepinnt, aber nicht im Umkreis (anklicken zum Entfernen):`,pin_unpin:`Entfernen`,pin_disabled_dynamic:`Dynamische Standortverfolgung ist für diesen Sensor aktiv — angepinnte Ladestellen sind deaktiviert, weil die Liste deiner aktuellen Position folgt. Bestehende Pins bleiben erhalten, falls du wieder auf festen Standort wechselst.`},$e={common:Ke,card:qe,parking:Je,amenities:Ye,auth:Xe,weekday:Ze,editor:Qe};const et={en:Ie,de:Ge};function tt(e,t){let n=e.split(`.`).reduce((e,t)=>{if(e&&typeof e==`object`&&t in e)return e[t]},t);return typeof n==`string`?n:void 0}let nt;function rt(e){typeof e==`string`&&e.length>0&&(nt=e)}function it(){return(nt||(typeof navigator<`u`?navigator.language:``)||`en`).replace(/['"]+/g,``).substring(0,2).toLowerCase()}function V(e,t=``,n=``){let r=it(),i=et.en??{},a=tt(e,et[r]??i);return a===void 0&&(a=tt(e,i)),a===void 0&&(a=e),t!==``&&n!==``&&(a=a.replaceAll(t,n)),a}function at(e){try{window.caches?.keys?.().then(e=>{e.forEach(e=>window.caches?.delete?.(e))})}catch{}if(e)try{window.sessionStorage?.setItem(`lade-reload-attempted-${e}`,`1`)}catch{}window.location.reload()}function ot(e){if(!e)return!1;try{return window.sessionStorage?.getItem(`lade-reload-attempted-${e}`)===`1`}catch{return!1}}function st(e){return e?ot(e)?k`
      <div class="version-notice" role="alert" aria-live="assertive">
        <span>${V(`common.version_reload_stuck`)}</span>
      </div>
    `:k`
    <div class="version-notice" role="alert" aria-live="assertive">
      <span
        >${V(`common.version_update`).replaceAll(`{v}`,e)}</span
      >
      <button
        class="version-reload-btn"
        type="button"
        @click=${()=>at(e)}
      >
        ${V(`common.version_reload`)}
      </button>
    </div>
  `:j}function ct(e,t,n){let r=!!e?.themes?.darkMode,i=n?`brand-logo adaptive ${r?`adaptive-dark`:`adaptive-light`}`:`brand-logo`,a=t&&t.includes(`E-Control`)?t:`Datenquelle: E-Control`;return k`
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
  `}async function lt(e){if(!e?.callWS)return null;try{let t=await e.callWS({type:`ladestellen_austria/card_version`});if(t?.version&&t.version!==`1.1.0`)return t.version}catch{}return null}function H(e,t){e.has(`hass`)&&rt(t?.language)}function ut(e,t,n){let r=e.get(`hass`);return!r||!n||r.states[n]!==t.states[n]}function dt(e){return e.find(e=>e.startsWith(`sensor.`)&&e.includes(`ladestelle`))??``}const ft=/* @__PURE__ */ new WeakSet;function pt(e,t){e.hass&&!ft.has(e)&&(ft.add(e),lt(e.hass).then(n=>{e.isConnected&&n&&t(n)}))}function mt(e){return(t,n)=>!n.startsWith(`sensor.`)||t?.entities?.[n]?.platform!==`ladestellen_austria`?null:{config:{type:e,entity:n}}}const ht=c`
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
`,gt=c`
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
`,_t=c`
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
`,vt=c`
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
`,yt=c`
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
`,bt=c`
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
`,xt=[ht,gt,_t,vt],St=[ht,gt,_t,bt];function Ct(e){let t=e.electricityType??[];return t.some(e=>e===`DC`||e?.startsWith(`DC`))?`dc`:t.some(e=>e?.startsWith(`AC`))?`ac`:null}function U(e){return(e??``).toUpperCase().replace(/_/g,``)}function wt(e){let t=U(e);return t===`AVAILABLE`?`ok`:t===`CHARGING`||t===`OCCUPIED`||t===`RESERVED`||t===`BLOCKED`?`busy`:t===`OUTOFORDER`||t===`FAULTED`||t===`INOPERATIVE`||t===`UNAVAILABLE`?`warn`:t===`UNKNOWN`?`unknown`:`empty`}function W(e){if(!e)return``;let t={AVAILABLE:`available`,CHARGING:`charging`,OCCUPIED:`occupied`,RESERVED:`reserved`,BLOCKED:`blocked`,OUTOFORDER:`out_of_order`,FAULTED:`faulted`,INOPERATIVE:`inoperative`,UNAVAILABLE:`unavailable`,OUTOFSTOCK:`out_of_stock`,PLANNED:`planned`,REMOVED:`removed`,UNKNOWN:`unknown`}[U(e)];if(!t)return e;let n=`card.point_status_${t}`,r=V(n);return r===n?e:r}function Tt(e){return{AVAILABLE:`free`,CHARGING:`busy`,OCCUPIED:`busy`,RESERVED:`reserved`,BLOCKED:`blocked`,OUTOFORDER:`out_of_order`,FAULTED:`faulted`,INOPERATIVE:`inoperative`,UNAVAILABLE:`unavailable`,OUTOFSTOCK:`out_of_stock`,PLANNED:`planned`,REMOVED:`removed`,UNKNOWN:`unknown`}[U(e)]??`unknown`}function Et(e){switch(U(e)){case`OUTOFORDER`:case`FAULTED`:case`INOPERATIVE`:case`UNAVAILABLE`:return{icon:`mdi:wrench`,tone:`warning`};case`OUTOFSTOCK`:return{icon:`mdi:battery-off-outline`,tone:`warning`,bgTint:`warning`};case`PLANNED`:return{icon:`mdi:progress-wrench`,tone:`info`,bgTint:`info`};case`REMOVED`:return{icon:`mdi:close-circle-outline`,tone:`error`,bgTint:`error`};case`UNKNOWN`:return{icon:`mdi:help-circle-outline`,tone:`muted`};default:return null}}function G(e){let t=wt(e.status),n=Et(e.status);return{bucket:t,isAvailable:t===`ok`,isBusy:t===`busy`,isWarn:t===`warn`,overlay:n,showCar:t===`busy`&&n===null,showOverlayIcon:n!==null}}function K(e){if(e==null||!Number.isFinite(e))return`–`;try{return new Intl.NumberFormat(`de-AT`,{minimumFractionDigits:0,maximumFractionDigits:1}).format(e)}catch{return String(e).replace(`.`,`,`)}}function q(e){let t=e/100;try{return new Intl.NumberFormat(`de-AT`,{minimumFractionDigits:2,maximumFractionDigits:2}).format(t)}catch{return t.toFixed(2)}}function Dt(e){if(!Number.isFinite(e))return`0`;try{return new Intl.NumberFormat(`de-AT`,{minimumFractionDigits:0,maximumFractionDigits:2}).format(e)}catch{return String(e).replace(`.`,`,`)}}function Ot(e,t){switch(e){case`TYPE_2_AC`:return`Type 2`;case`COMBO2_CCS_DC`:return`CCS`;case`CHADEMO`:return`CHAdeMO`;case`TYPE_1_AC`:return`Type 1`;case`TESLA_S`:case`TESLA_R`:return`Tesla`;case`OTHER`:return t===`DOMESTIC_F`?`Schuko`:t?.startsWith(`CEE`)?`CEE`:t??`?`;default:return e?.replace(/_/g,` `)??t??`?`}}function J(e){let t=(e.connectorType??[])[0];return t?Ot(t.consumerName,t.key):`–`}function kt(e){return typeof e==`string`&&/^https?:\/\//i.test(e)?e:``}function At(e){let t=e.type===`expandable`?`editor.section_${e.name}`:`editor.${e.name}`,n=V(t);return n===t?e.name:n}function jt(e){switch(e){case`ok`:return`free`;case`busy`:return`busy`;case`warn`:return`warn`;default:return`unknown`}}function Mt(e,t){let n=`parking.slot_status_${e}`,r=V(n);return r===n?t:r}function Nt(e,t){let{isAvailable:n,isBusy:r,isWarn:i,overlay:a,showCar:o,showOverlayIcon:s}=e;return[`parking-slot`,n?`is-available`:r?`is-busy`:i?`is-warn`:`is-unknown`,o||s?`has-overlay`:``,o?`has-car`:``,s?`has-icon`:``,a?.bgTint?`slot-tint-${a.bgTint}`:``,t?`is-revealed`:``].filter(Boolean).join(` `)}function Pt(e){return[e.powerType?e.powerType.toUpperCase():null,e.capacityKw?`${e.kwText} kW`:null,e.connector&&e.connector!==`–`?e.connector:null,e.statusLabel].filter(Boolean).join(` · `)}const Ft={MONDAY:0,TUESDAY:1,WEDNESDAY:2,THURSDAY:3,FRIDAY:4,SATURDAY:5,SUNDAY:6},It={Mon:0,Tue:1,Wed:2,Thu:3,Fri:4,Sat:5,Sun:6};function Lt(e){return e===`CHARGING`||e===`OCCUPIED`||e===`RESERVED`||e===`BLOCKED`}function Rt(e){return e===`OUTOFORDER`||e===`FAULTED`||e===`INOPERATIVE`||e===`UNAVAILABLE`}function zt(e,t){switch(t){case`green_energy`:return!!e.greenEnergy;case`austrian_ecolabel`:return!!e.austrianEcoLabel;case`free_parking`:return!!e.freeParking;case`roofed_parking`:return!!e.roofedParking;case`illuminated_parking`:return!!e.illuminatedParking;case`barrier_free`:return(e.barrierFreeParkingPlaces??0)>0;case`catering`:return!!e.cateringService;case`bathrooms`:return!!e.bathroomsAvailable;case`resting`:return!!e.restingFacilities;default:return!1}}function Bt(e,t){try{let n=new Intl.DateTimeFormat(`en-US`,{timeZone:t,weekday:`short`,hour:`2-digit`,minute:`2-digit`,hour12:!1}).formatToParts(e),r=n.find(e=>e.type===`weekday`)?.value??``,i=n.find(e=>e.type===`hour`)?.value??``,a=n.find(e=>e.type===`minute`)?.value??``,o=It[r];if(o===void 0)return null;let s=parseInt(i,10),c=parseInt(a,10);return!Number.isFinite(s)||!Number.isFinite(c)?null:(s===24&&(s=0),o*1440+s*60+c)}catch{return null}}function Vt(e,t){let n=Ft[(e??``).toUpperCase()];if(n===void 0)return null;let[r,i]=(t??``).split(`:`),a=parseInt(r??``,10),o=parseInt(i??``,10);return!Number.isFinite(a)||!Number.isFinite(o)?null:n*1440+a*60+o}function Ht(e,t,n){if(!e||e.length===0)return null;let r=Bt(t,n);if(r==null)return null;for(let t of e){let e=Vt(t.fromWeekday,t.fromTime),n=Vt(t.toWeekday,t.toTime);if(e!=null&&n!=null){if(e<=n){if(r>=e&&r<=n)return!0}else if(r>=e||r<=n)return!0}}return!1}function Ut(e,t,n,r=null){if(!t||r===!1)return`inactive`;let i=n.length;if(!e||i===0)return`unknown`;let a=0,o=0,s=0;for(let e of n){let t=U(e.status);t===`AVAILABLE`?a++:Lt(t)?o++:Rt(t)&&s++}return a===0?o===0&&s>0?`inactive`:`busy`:a<i?`partial`:`ok`}function Wt(e){return e.stationStatus===`ACTIVE`&&(e.points??[]).some(e=>U(e.status)===`AVAILABLE`)}function Gt(e){return new Set((e.points??[]).flatMap(e=>(e.connectorType??[]).map(e=>Ot(e.consumerName,e.key))))}function Kt(e){return new Set((e.points??[]).flatMap(e=>e.authenticationMode??[]))}function qt(e,t,n,r){let i=t.only_available??!1,a=t.only_free??!1,o=t.only_open??!1,s=t.connector_types??[],c=t.amenities??[],l=t.payment_methods??[];return!i&&!a&&!o&&s.length===0&&c.length===0&&l.length===0?e:e.filter(e=>{if(i&&!Wt(e)||a&&!(e.points??[]).some(e=>e.freeOfCharge)||o&&Ht(e.openingHours,n,r)===!1)return!1;if(s.length>0){let t=Gt(e);if(!s.some(e=>t.has(e)))return!1}if(c.length>0&&!c.every(t=>zt(e,t)))return!1;if(l.length>0){let t=Kt(e);if(!l.some(e=>t.has(e)))return!1}return!0})}function Jt(e){return(e.points??[]).reduce((e,t)=>Math.max(e,t.capacityKw??0),0)}function Yt(e){return(e.points??[]).some(e=>(e.electricityType??[]).includes(`DC`))}function Xt(e){return e?kt(`https://www.google.com/maps/search/?api=1&query=${e.lat},${e.lon}`):``}function Y(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a}const Zt=[{name:`entity`,required:!0,selector:{entity:{filter:{domain:`sensor`,integration:`ladestellen_austria`}}}},{name:`name`,selector:{text:{}}},{type:`expandable`,name:`display`,flatten:!0,schema:[{name:`max_stations`,selector:{number:{min:1,max:10,step:1,mode:`slider`}}},{name:`hide_header`,selector:{boolean:{}}},{name:`show_hero`,selector:{boolean:{}}},{name:`show_pricing`,selector:{boolean:{}}},{name:`show_amenities`,selector:{boolean:{}}},{name:`sort_by_power`,selector:{boolean:{}}},{name:`logo_adapt_to_theme`,selector:{boolean:{}}}]},{type:`expandable`,name:`filters`,flatten:!0,schema:[{name:`only_available`,selector:{boolean:{}}},{name:`only_free`,selector:{boolean:{}}},{name:`only_open`,selector:{boolean:{}}}]}],Qt={max_stations:10,hide_header:!1,show_hero:!0,show_pricing:!0,show_amenities:!0,sort_by_power:!1,logo_adapt_to_theme:!1,only_available:!1,only_free:!1,only_open:!1};let X=class extends I{constructor(...e){super(...e),this._config={type:`ladestellen-austria-card`}}setConfig(e){let t=e.entity&&this.hass?.states[e.entity]?.attributes.friendly_name;this._config=typeof t==`string`?{name:t,...e}:{...e}}_formChanged(e){let t=e.detail.value;t&&(this._config=t,B(this,`config-changed`,{config:t}))}_toggleListItem(e,t){let n=this._config[e]??[],r=n.includes(t)?n.filter(e=>e!==t):[...n,t];this._config={...this._config,[e]:r},B(this,`config-changed`,{config:this._config})}willUpdate(e){super.willUpdate(e),H(e,this.hass)}render(){if(!this._config)return k`<p>${V(`common.loading`)}</p>`;let e={...Qt,...this._config},t=this._config.connector_types??[],n=this._config.amenities??[],r=this._config.payment_methods??[],i=!!this._config.entity&&!!this.hass&&!this.hass.states[this._config.entity];return k`
      <div class="editor">
        ${this.hass?k`<ha-form
              .hass=${this.hass}
              .data=${e}
              .schema=${Zt}
              .computeLabel=${At}
              @value-changed=${this._formChanged}
            ></ha-form>`:j}
        ${i?k`<ha-alert alert-type="error">
              ${V(`editor.entity_missing`)}
            </ha-alert>`:j}

        <div class="editor-section">
          <div class="section-header">
            ${V(`editor.section_chip_filters`)}
          </div>
          <div class="editor-hint">
            ${V(`editor.connector_filter_hint`)}
          </div>
          <div class="chip-row">
            ${Ne.map(e=>k`
                <button
                  type="button"
                  class=${t.includes(e)?`filter-chip active`:`filter-chip`}
                  @click=${()=>this._toggleListItem(`connector_types`,e)}
                >
                  ${e}
                </button>
              `)}
          </div>

          <div class="editor-hint">
            ${V(`editor.amenity_filter_hint`)}
          </div>
          <div class="chip-row">
            ${Pe.map(e=>k`
                <button
                  type="button"
                  class=${n.includes(e.key)?`filter-chip icon-chip active`:`filter-chip icon-chip`}
                  @click=${()=>this._toggleListItem(`amenities`,e.key)}
                >
                  <ha-icon icon=${e.icon}></ha-icon>
                  <span>${V(e.label_key)}</span>
                </button>
              `)}
          </div>

          <div class="editor-hint">
            ${V(`editor.payment_filter_hint`)}
          </div>
          <div class="chip-row">
            ${Fe.map(e=>k`
                <button
                  type="button"
                  class=${r.includes(e.key)?`filter-chip icon-chip active`:`filter-chip icon-chip`}
                  @click=${()=>this._toggleListItem(`payment_methods`,e.key)}
                >
                  <ha-icon icon=${e.icon}></ha-icon>
                  <span>${V(e.label_key)}</span>
                </button>
              `)}
          </div>

          <div class="editor-hint">${V(`editor.hint_compliance`)}</div>
        </div>

        ${this._renderPinSection()}
      </div>
    `}_renderPinSection(){let e=this._config.entity,t=e?this.hass?.states[e]:void 0,n=t?.attributes?.stations??[],r=this._config.pinned_station_ids??[],i=new Set(r),a=new Set(n.map(e=>e.stationId)),o=r.filter(e=>!a.has(e)),s=t?.attributes?.dynamic_mode===!0;return k`
      <div class="editor-section">
        <div class="section-header">${V(`editor.section_pinned`)}</div>
        <div class="editor-hint">${V(`editor.pin_hint`)}</div>

        ${s?k`<div class="editor-hint editor-hint--muted">
              ${V(`editor.pin_disabled_dynamic`)}
            </div>`:e?n.length===0?k`<div class="editor-hint editor-hint--muted">
              ${V(`editor.pin_no_stations_yet`)}
            </div>`:k`
              <div class="pin-list">
                ${n.map(e=>{let t=i.has(e.stationId),n=typeof e.distance==`number`?`${e.distance.toFixed(2)} km`:``;return k`
                    <button
                      type="button"
                      class=${t?`pin-row pinned`:`pin-row`}
                      @click=${()=>this._toggleListItem(`pinned_station_ids`,e.stationId)}
                    >
                      <ha-icon
                        icon=${t?`mdi:pin`:`mdi:pin-outline`}
                      ></ha-icon>
                      <span class="pin-label">${e.label}</span>
                      <span class="pin-meta">${n}</span>
                    </button>
                  `})}
              </div>
            `:k`<div class="editor-hint editor-hint--muted">
              ${V(`editor.pin_select_sensor_first`)}
            </div>`}
        ${!s&&o.length>0?k`
              <div class="editor-hint editor-hint--muted">
                ${V(`editor.pin_orphans_heading`)}
              </div>
              <div class="pin-list">
                ${o.map(e=>k`
                    <button
                      type="button"
                      class="pin-row pinned orphan"
                      @click=${()=>this._toggleListItem(`pinned_station_ids`,e)}
                    >
                      <ha-icon icon="mdi:pin"></ha-icon>
                      <span class="pin-label orphan-id">${e}</span>
                      <span class="pin-meta">
                        ${V(`editor.pin_unpin`)}
                      </span>
                    </button>
                  `)}
              </div>
            `:j}
      </div>
    `}static{this.styles=yt}};Y([R({attribute:!1})],X.prototype,`hass`,void 0),Y([z()],X.prototype,`_config`,void 0),X=Y([L(`ladestellen-austria-card-editor`)],X);function $t(){return k`
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
  `}const en={hide_header:!1,show_free_count:!0,logo_adapt_to_theme:!1,car_color_mode:`random`,asphalt_style:`default`,paint_width:`medium`,icon_paint_mode:`default`},tn=[{name:`entity`,required:!0,selector:{entity:{filter:{domain:`sensor`,integration:`ladestellen_austria`}}}},{name:`name`,selector:{text:{}}}];function nn(){return[{type:`expandable`,name:`appearance`,flatten:!0,schema:[{name:`hide_header`,selector:{boolean:{}}},{name:`show_free_count`,selector:{boolean:{}}},{name:`logo_adapt_to_theme`,selector:{boolean:{}}},{name:`car_color_mode`,selector:{select:{mode:`dropdown`,options:[{value:`random`,label:V(`editor.car_color_random`)},{value:`theme`,label:V(`editor.car_color_theme`)},{value:`fixed`,label:V(`editor.car_color_fixed`)}]}}},{name:`asphalt_style`,selector:{select:{mode:`dropdown`,options:[{value:`default`,label:V(`editor.asphalt_style_default`)},{value:`textured`,label:V(`editor.asphalt_style_textured`)}]}}},{name:`paint_width`,selector:{select:{mode:`dropdown`,options:[{value:`thin`,label:V(`editor.paint_width_thin`)},{value:`medium`,label:V(`editor.paint_width_medium`)},{value:`wide`,label:V(`editor.paint_width_wide`)}]}}},{name:`icon_paint_mode`,selector:{select:{mode:`dropdown`,options:[{value:`default`,label:V(`editor.icon_paint_default`)},{value:`white`,label:V(`editor.icon_paint_white`)}]}}}]}]}let Z=class extends I{constructor(...e){super(...e),this._config={type:`ladestellen-austria-parking-card`}}setConfig(e){this._config={...e}}_formChanged(e){let t=e.detail.value;t&&(this._config=t,B(this,`config-changed`,{config:t}))}_appearanceSchema(){let e=this.hass?.language??``;return this._appearanceSchemaCache?.lang!==e&&(this._appearanceSchemaCache={lang:e,schema:nn()}),this._appearanceSchemaCache.schema}_selectStation(e){let t=this._config.station_id===e?``:e;this._config={...this._config,station_id:t},B(this,`config-changed`,{config:this._config})}_carColorFixedChanged(e){let t=e.target;if(!t)return;let n=t.value;this._config.car_color_fixed!==n&&(this._config={...this._config,car_color_fixed:n},B(this,`config-changed`,{config:this._config}))}willUpdate(e){super.willUpdate(e),H(e,this.hass)}render(){if(!this._config)return k`<p>${V(`common.loading`)}</p>`;let e=this._config.entity,t=(e?this.hass?.states[e]:void 0)?.attributes?.stations??[],n=this._config.station_id??``,r={...en,...this._config},i=!!e&&!!this.hass&&!this.hass.states[e];return k`
      <div class="editor">
        ${this.hass?k`<ha-form
              .hass=${this.hass}
              .data=${r}
              .schema=${tn}
              .computeLabel=${At}
              @value-changed=${this._formChanged}
            ></ha-form>`:j}
        ${i?k`<ha-alert alert-type="error">
              ${V(`editor.entity_missing`)}
            </ha-alert>`:j}

        <div class="editor-section">
          <div class="section-header">
            ${V(`parking.editor_station_heading`)}
          </div>
          <div class="editor-hint">
            ${V(`parking.pick_station_hint`)}
          </div>
          ${e?t.length===0?k`<div class="editor-hint editor-hint--muted">
                ${V(`editor.pin_no_stations_yet`)}
              </div>`:k`
                <div class="pin-list">
                  ${t.map(e=>{let t=e.stationId===n,r=typeof e.distance==`number`?`${e.distance.toFixed(2)} km`:``;return k`
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
              `:k`<div class="editor-hint editor-hint--muted">
                ${V(`editor.pin_select_sensor_first`)}
              </div>`}
          ${n&&!t.some(e=>e.stationId===n)?k`<div class="editor-hint editor-hint--muted">
                ${V(`parking.station_not_in_range`)}: ${n}
              </div>`:j}
        </div>

        ${this.hass?k`<ha-form
              .hass=${this.hass}
              .data=${r}
              .schema=${this._appearanceSchema()}
              .computeLabel=${At}
              @value-changed=${this._formChanged}
            ></ha-form>`:j}

        ${this._config.car_color_mode===`fixed`?k`<div class="editor-section">
              <div class="section-header">
                ${V(`editor.car_color_pick`)}
              </div>
              <div class="toggle-row">
                <span>${V(`editor.car_color_pick`)}</span>
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
                    aria-label=${V(`editor.car_color_pick`)}
                    @input=${this._carColorFixedChanged}
                    @change=${this._carColorFixedChanged}
                  />
                </label>
              </div>
            </div>`:j}

        <div class="editor-section">
          <div class="editor-hint">${V(`editor.hint_compliance`)}</div>
        </div>
      </div>
    `}static{this.styles=yt}};Y([R({attribute:!1})],Z.prototype,`hass`,void 0),Y([z()],Z.prototype,`_config`,void 0),Z=Y([L(`ladestellen-austria-parking-card-editor`)],Z),window.customCards=window.customCards??[],window.customCards.push({type:`ladestellen-austria-parking-card`,name:`Ladestellen Austria — Parking`,description:`Single station, points rendered as parking slots viewed from above.`,preview:!0,documentationURL:`https://github.com/rolandzeiner/ladestellen-austria`,getEntitySuggestion:mt(`custom:ladestellen-austria-parking-card`)});let Q=class extends I{constructor(...e){super(...e),this._revealedSlots=/* @__PURE__ */ new Set,this._versionMismatch=null}static getConfigElement(){return document.createElement(`ladestellen-austria-parking-card-editor`)}static getStubConfig(e,t){return{entity:dt(t),station_id:``}}setConfig(e){if(!e||typeof e!=`object`)throw Error(V(`common.invalid_configuration`));if(e.entity!==void 0&&typeof e.entity!=`string`)throw Error(V(`common.invalid_entity`));if(e.station_id!==void 0&&typeof e.station_id!=`string`)throw Error(V(`common.invalid_station_id`));this.config={hide_header:!1,show_free_count:!0,logo_adapt_to_theme:!1,car_color_mode:`random`,asphalt_style:`default`,paint_width:`medium`,icon_paint_mode:`default`,...e}}shouldUpdate(e){return e.has(`config`)||e.has(`_revealedSlots`)||e.has(`_versionMismatch`)?!0:ut(e,this.hass,this.config.entity)}getCardSize(){return 3}getGridOptions(){return{columns:6,rows:`auto`,min_columns:4,min_rows:3}}willUpdate(e){super.willUpdate(e),H(e,this.hass)}firstUpdated(e){this._runVersionCheck()}updated(e){super.updated(e),e.has(`hass`)&&this._runVersionCheck()}_runVersionCheck(){pt(this,e=>{this._versionMismatch=e})}_renderShell(e,t={}){return k`
      <ha-card>
        <div class="card-content">
          <div
            class="wrap"
            style=${t.accent?`--lade-accent: var(--primary-color);`:j}
            data-asphalt-style=${this.config?.asphalt_style??`default`}
            data-paint-width=${this.config?.paint_width??`medium`}
            data-icon-paint=${this.config?.icon_paint_mode??`default`}
          >
            ${st(this._versionMismatch)} ${e}
          </div>
          ${t.footer??j}
        </div>
      </ha-card>
    `}_cardFooter(e){return ct(this.hass,e,this.config?.logo_adapt_to_theme===!0)}_renderHeader(e,t=``,n){return k`<header class="header">
      <div class="icon-tile" aria-hidden="true">
        <ha-icon icon="mdi:ev-station"></ha-icon>
      </div>
      <div class="header-text">
        <h3 class="title">${e}</h3>
        ${t?k`<p class="subtitle">${t}</p>`:j}
      </div>
      ${n?k`<div
            class=${n.avail>0?`header-count has-free`:`header-count`}
            aria-label=${n.label}
          >
            <div class="header-count-value">
              <span class="header-count-num" role="status" aria-live="polite"
                >${n.avail}</span
              >
              <span class="header-count-of">/ ${n.total}</span>
            </div>
            <div class="header-count-label">
              ${V(`parking.slot_status_free`)}
            </div>
          </div>`:j}
    </header>`}_renderLot(e,t){return e.length===0?k`<div class="empty-state">
        ${V(`parking.no_points`)}
      </div>`:k`<div class="rack-block">
      <div class="parking-lot" role="list" aria-label=${t}>
        ${e.map(e=>this._renderSlot(e))}
      </div>
    </div>`}_stationHeader(e,t,n){if(this.config.hide_header)return j;let r=this.config.show_free_count!==!1;return this._renderHeader(t??e,t?e:``,r?n:void 0)}render(){if(!this.hass||!this.config)return this._renderShell(k`<div class="empty-state">${V(`common.loading`)}</div>`);let e=this.config.entity?this.hass.states[this.config.entity]:void 0;if(!e)return this._renderShell(k`<div class="empty-state">${V(`card.no_entity`)}</div>`,{footer:this._cardFooter()});let t=e.attributes.stations??[],n=this.config.station_id??``,r=t.find(e=>e.stationId===n),i=this.config.name,a=this._cardFooter(e.attributes.attribution);if(!n||!r){let e=!!i&&!this.config.hide_header;return this._renderShell(k`
          ${e?this._renderHeader(i??``):j}
          <div class="empty-state">
            ${V(n?`parking.station_not_found`:`parking.no_station_selected`)}
          </div>
        `,{footer:a})}let o=r.points??[],s=o.filter(e=>wt(e.status)===`ok`).length,c=o.length,l=V(`parking.available_count`).replaceAll(`{avail}`,String(s)).replaceAll(`{total}`,String(c));return this._renderShell(k`
        ${this._stationHeader(r.label,i,{avail:s,total:c,label:l})}
        ${this._renderLot(o,l)}
      `,{footer:a,accent:!0})}_renderSlotOverlays(e,t){return k`
      ${t?k`<span
            class="slot-car"
            aria-hidden="true"
            style=${`--slot-car-color: ${t};`}
          >
            ${$t()}
          </span>`:j}
      ${e?k`<span
            class="slot-overlay-icon tone-${e.tone}"
            aria-hidden="true"
          >
            <ha-icon icon=${e.icon}></ha-icon>
          </span>`:j}
    `}_renderSlotInner(e,t,n,r,i){let a=jt(G(e).bucket),o=Tt(e.status);return k`<span class="slot-inner">
      ${t?k`<span class="slot-power-badge" data-type=${t}
            >${t.toUpperCase()}</span
          >`:j}
      <span class="slot-kw">
        <span class="slot-kw-num">${n}</span
        ><span class="slot-kw-unit">kW</span>
      </span>
      <span class="slot-connector">${r}</span>
      <span class="slot-status-word slot-status-${a}"
        >${Mt(o,i)}</span
      >
    </span>`}_renderSlot(e){let t=G(e),{bucket:n,overlay:r,showCar:i,showOverlayIcon:a}=t,o=i||a,s=o&&this._revealedSlots.has(e.evseId),c=Ct(e),l=J(e),u=K(e.capacityKw),d=W(e.status),f=Pt({powerType:c,capacityKw:e.capacityKw,kwText:u,connector:l,statusLabel:d});return k`
      <button
        type="button"
        class=${Nt(t,s)}
        data-status=${n}
        role="listitem"
        tabindex=${o?`0`:`-1`}
        aria-label=${f}
        aria-pressed=${o?s?`true`:`false`:j}
        title=${`${e.evseId??``} · ${d}`.trim()}
        @click=${t=>{t.preventDefault(),o&&this._toggleSlot(e.evseId)}}
      >
        ${this._renderSlotOverlays(r,i?this._carColor(e.evseId):null)}
        ${this._renderSlotInner(e,c,u,l,d)}
      </button>
    `}_toggleSlot(e){if(!e)return;let t=new Set(this._revealedSlots);t.has(e)?t.delete(e):t.add(e),this._revealedSlots=t}_carColor(e){let t=this.config?.car_color_mode??`random`;if(t===`theme`)return`var(--primary-color)`;if(t===`fixed`)return this.config?.car_color_fixed||`var(--primary-color)`;let n=[`#e63946`,`#1d4ed8`,`#15803d`,`#facc15`,`#fb923c`,`#ec4899`,`#0e7490`,`#6b21a8`,`#1f2937`,`#e5e7eb`],r=e??``,i=0;for(let e=0;e<r.length;e++)i=i*31+r.charCodeAt(e)>>>0;return n[i%n.length]??`#1f2937`}static{this.styles=St}};Y([R({attribute:!1})],Q.prototype,`hass`,void 0),Y([z()],Q.prototype,`config`,void 0),Y([z()],Q.prototype,`_revealedSlots`,void 0),Y([z()],Q.prototype,`_versionMismatch`,void 0),Q=Y([L(`ladestellen-austria-parking-card`)],Q),window.customCards=window.customCards??[],window.customCards.push({type:`ladestellen-austria-card`,name:`Ladestellen Austria`,description:`Nearby EV charging stations, powered by E-Control Austria`,preview:!0,documentationURL:`https://github.com/rolandzeiner/ladestellen-austria`,getEntitySuggestion:mt(`custom:ladestellen-austria-card`)});let $=class extends I{constructor(...e){super(...e),this._expanded=/* @__PURE__ */ new Set,this._versionMismatch=null}static getConfigElement(){return document.createElement(`ladestellen-austria-card-editor`)}static getStubConfig(e,t){return{entity:dt(t)}}setConfig(e){if(!e||typeof e!=`object`)throw Error(V(`common.invalid_configuration`));if(e.entity!==void 0&&typeof e.entity!=`string`)throw Error(V(`common.invalid_entity`));this.config={name:`Ladestellen Austria`,max_stations:10,show_hero:!0,show_amenities:!0,show_pricing:!0,sort_by_power:!1,logo_adapt_to_theme:!1,only_available:!1,only_free:!1,only_open:!1,connector_types:[],amenities:[],payment_methods:[],pinned_station_ids:[],...e}}shouldUpdate(e){return e.has(`config`)||e.has(`_expanded`)||e.has(`_versionMismatch`)?!0:ut(e,this.hass,this.config.entity)}getCardSize(){let e=this.config?.max_stations??10;return Math.min(3+Math.ceil(e/3),10)}getGridOptions(){return{columns:12,rows:`auto`,min_columns:6,min_rows:3}}willUpdate(e){super.willUpdate(e),H(e,this.hass)}firstUpdated(e){this._runVersionCheck()}updated(e){super.updated(e),e.has(`hass`)&&this._runVersionCheck()}_runVersionCheck(){pt(this,e=>{this._versionMismatch=e})}_buildListView(e){let t=e.attributes.stations??[],n=e.attributes.live_status_available===!0,r=e.attributes.dynamic_mode===!0,i=e.attributes.dynamic_entity??null,a=r?[]:this.config.pinned_station_ids??[],o=this._collectPinnedItems(a,t),s=new Set(o.filter(e=>e.kind===`live`).map(e=>e.stationId)),c=t.filter(e=>!s.has(e.stationId)),l=this._filterStations(c),u=this._sortStations(l),d=Math.max(1,this.config.max_stations??10),f=[...o,...u.map(e=>({kind:`live`,station:e}))].slice(0,d),p=f.filter(e=>e.kind===`live`).map(e=>e.station);return{visible:f,liveAvailable:n,pinnedLiveStationIds:s,dynamicMode:r,dynamicEntity:i,filteredCount:l.length,totalCount:t.length,nearestByDistance:t[0],farthestShown:p[p.length-1]}}_renderCardHeader(e){if(this.config.hide_header)return j;let t=this.config.name,n=t&&t.trim()?t:`Ladestellen Austria`,r=e?this._heroCity(e):``;return k`<header class="header">
      <div class="icon-tile" aria-hidden="true">
        <ha-icon icon="mdi:ev-station"></ha-icon>
      </div>
      <div class="header-text">
        <h2 class="title">${n}</h2>
        ${r?k`<p class="subtitle">${r}</p>`:j}
      </div>
    </header>`}_renderDynamicFlag(e,t){return!e||!t?j:k`<div class="flags">
      <span class="flag">
        <ha-icon icon="mdi:crosshairs-gps" aria-hidden="true"></ha-icon>
        <span
          >${V(`card.dynamic_follows_entity`).replace(`{entity}`,t)}</span
        >
      </span>
    </div>`}_renderStationList(e){return e.visible.length===0?k`<div class="empty-state">
        ${V(`card.no_stations`)}
      </div>`:k`<ul class="stations" role="list">
      ${e.visible.map(t=>t.kind===`live`?this._renderStation(t.station,e.liveAvailable,e.pinnedLiveStationIds.has(t.station.stationId)):this._renderOrphanPin(t.id))}
    </ul>`}render(){if(!this.config||!this.hass)return k`<ha-card>
        <div class="card-content">
          <div class="wrap">
            <div class="empty-state">${V(`common.loading`)}</div>
          </div>
        </div>
      </ha-card>`;let e=this.config.entity?this.hass.states[this.config.entity]:void 0;if(!e)return k`
        <ha-card>
          <div class="card-content">
            <div class="wrap">
              <div class="empty-state">${V(`card.no_entity`)}</div>
            </div>
            ${ct(this.hass,void 0,this.config?.logo_adapt_to_theme===!0)}
          </div>
        </ha-card>
      `;let t=this._buildListView(e);return k`
      <ha-card>
        <div class="card-content">
          <div class="wrap">
            ${st(this._versionMismatch)}
            ${this._renderCardHeader(t.nearestByDistance)}
            ${this.config.show_hero===!1?j:this._renderHero(t.nearestByDistance,t.farthestShown,t.filteredCount,t.totalCount)}
            ${this._renderDynamicFlag(t.dynamicMode,t.dynamicEntity)}
            ${this._renderStationList(t)}
          </div>
          ${ct(this.hass,e.attributes.attribution,this.config.logo_adapt_to_theme===!0)}
        </div>
      </ha-card>
    `}_sortStations(e){return[...e].sort((e,t)=>{if(this.config.sort_by_power){let n=Math.max(0,...(e.points??[]).map(e=>e.capacityKw??0)),r=Math.max(0,...(t.points??[]).map(e=>e.capacityKw??0));if(r!==n)return r-n}else{let n=e.distance??1/0,r=t.distance??1/0;if(n!==r)return n-r}let n=this._stationHasFree(e);return n===this._stationHasFree(t)?(e.distance??1/0)-(t.distance??1/0):n?-1:1})}_stationHasFree(e){return e.stationStatus===`ACTIVE`&&(e.points??[]).some(e=>U(e.status)===`AVAILABLE`)}_collectPinnedItems(e,t){let n=new Map(t.map(e=>[e.stationId,e])),r=/* @__PURE__ */ new Set,i=[];for(let t of e){if(r.has(t))continue;r.add(t);let e=n.get(t);e?i.push({kind:`live`,station:e,stationId:e.stationId}):i.push({kind:`orphan`,id:t})}return i}_unpinStation(e){let t=(this.config.pinned_station_ids??[]).filter(t=>t!==e),n={...this.config,pinned_station_ids:t};B(this,`config-changed`,{config:n})}_renderOrphanPin(e){return k`
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
                >${V(`card.orphan_pin_title`)}</span
              >
            </div>
            <div class="orphan-id">${e}</div>
          </div>
          <div class="station-actions">
            <ha-icon-button
              .label=${V(`card.unpin`)}
              @click=${t=>{t.stopPropagation(),this._unpinStation(e)}}
            >
              <ha-icon icon="mdi:close"></ha-icon>
            </ha-icon-button>
          </div>
        </div>
      </li>
    `}_filterStations(e){return qt(e,this.config,/* @__PURE__ */ new Date,this.hass?.config?.time_zone??`Europe/Vienna`)}_renderHero(e,t,n,r){if(!e)return k`<section class="hero hero--empty">
        <span aria-live="polite">${V(`card.no_stations`)}</span>
      </section>`;let i=this._formatKm(e.distance),a=this._heroCity(e),o=t?this._formatKm(t.distance):i,s=V(`card.hero_range`).replaceAll(`{min}`,this._formatKm(e.distance)).replaceAll(`{max}`,o),c=n===r?V(`card.hero_count`).replaceAll(`{count}`,String(n)):V(`card.hero_count_filtered`).replaceAll(`{filtered}`,String(n)).replaceAll(`{total}`,String(r));return k`
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
    `}_heroCity(e){return e.city||e.label||``}_renderRowPrimary(e){return k`<div class="row-primary">
      ${e.maxKw>0?k`<span class=${e.isDC?`metric-kw dc`:`metric-kw`}>
            <span class="kw-num">${e.maxKw}</span
            ><span class="kw-unit">kW</span>
          </span>`:j}
      ${e.priceText?k`<span
            class=${e.priceIsFree?`metric-price free`:`metric-price`}
            >${e.priceText}</span
          >`:j}
      ${e.visibleConnectors.map(e=>k`<span class="chip muted">${e}</span>`)}
      ${e.extraConnectors>0?k`<span class="chip muted">+${e.extraConnectors}</span>`:j}
      ${e.isPinned?k`<span class="chip pin" title=${V(`card.pinned`)}>
            <ha-icon icon="mdi:pin" aria-hidden="true"></ha-icon>
            <span>${V(`card.pinned`)}</span>
          </span>`:j}
    </div>`}_renderStation(e,t,n=!1){let r=e.points??[],i=Yt(e),a=Jt(e),o=Array.from(Gt(e)),s=o.slice(0,3),c=o.length-s.length,l=this._priceText(r),u=r.some(e=>e.freeOfCharge),d=r.length,f=r.filter(e=>U(e.status)===`AVAILABLE`).length,p=e.stationStatus===`ACTIVE`,ee=this.hass?.config?.time_zone??`Europe/Vienna`,m=Ht(e.openingHours,/* @__PURE__ */ new Date,ee),h=Ut(t,p,r,m),g=this._expanded.has(e.stationId),_=Xt(e.location),te=this.config?.show_amenities??!0,ne=this.config?.show_pricing??!0,v=[`station`,g?`expanded`:``,n?`is-pinned`:``,h===`inactive`?`is-inactive`:``].filter(Boolean).join(` `),y=[[e.postCode,e.city].filter(Boolean).join(` `),Number.isFinite(e.distance)?`${this._formatKm(e.distance)} km`:``].filter(Boolean).join(` · `),b=`station-panel-${e.stationId}`;return k`
      <li
        class=${v}
        @click=${()=>this._toggle(e.stationId)}
        @keydown=${t=>this._onKey(t,e.stationId)}
        tabindex="0"
        role="button"
        aria-expanded=${g?`true`:`false`}
        aria-controls=${b}
      >
        <div class="station-body">
          <span
            class=${`status-dot status-${h}`}
            role="img"
            aria-label=${this._statusAria(h,f,d)}
          ></span>
          <div class="station-main">
            ${this._renderRowPrimary({maxKw:a,isDC:i,priceText:ne?l:``,priceIsFree:u,visibleConnectors:s,extraConnectors:c,isPinned:n})}
            <div class="row-secondary">
              <span class="station-name" lang="de">${e.label}</span>
              ${y?k`<span class="station-loc" lang="de">${y}</span>`:j}
            </div>
          </div>
          <div class="station-actions">
            ${_?k`<a
                  class="icon-action"
                  href=${_}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label=${`${V(`card.open_in_maps`)}: ${e.label}`}
                  title=${V(`card.open_in_maps`)}
                  @click=${e=>e.stopPropagation()}
                >
                  <ha-icon
                    icon="mdi:map-marker-outline"
                    aria-hidden="true"
                  ></ha-icon>
                </a>`:j}
            <ha-icon
              class="chevron"
              icon="mdi:chevron-down"
              aria-hidden="true"
            ></ha-icon>
          </div>
        </div>
        ${this._renderStationDetail(e,m,te,_,g,b)}
      </li>
    `}_renderStationDetail(e,t,n,r,i,a){let o=this._amenityItems(e),s=e.points??[],c=this._address(e),l=this._paymentChips(s),u=this._feesLine(s),d=e.operatorName||e.owner||``;return k`
      <div
        class="detail"
        id=${a}
        role="region"
        aria-hidden=${i?`false`:`true`}
        ?inert=${!i}
      >
        <div class="detail-inner">
        ${d?k`<div class="operator-line">
              <span class="detail-label">
                ${V(`card.operator_heading`)}
              </span>
              <span class="operator-name" lang="de">${d}</span>
            </div>`:j}
        ${e.description?k`<div class="station-note">
              <ha-icon
                icon="mdi:information-outline"
                aria-hidden="true"
              ></ha-icon>
              <span>${e.description}</span>
            </div>`:j}
        ${s.length>0?k`<div class="rack-block">
              <div class="detail-label">
                ${V(`card.charging_points_heading`)}
              </div>
              ${this._renderRack(s)}
              ${u?k`<div class="fees-line">${u}</div>`:j}
            </div>`:j}
        ${this._renderOpeningHoursSection(e.openingHours,t)}
        ${l.length>0?k`<div class="detail-section">
              <div class="detail-label">
                ${V(`card.payment_heading`)}
              </div>
              <div class="chip-row">
                ${l.map(e=>k`
                    <span class="chip muted" title=${e.label}>
                      <ha-icon icon=${e.icon} aria-hidden="true"></ha-icon>
                      <span>${e.label}</span>
                    </span>
                  `)}
              </div>
            </div>`:j}
        ${n&&o.length>0?k`<div class="detail-section">
              <div class="detail-label">
                ${V(`card.amenities_heading`)}
              </div>
              <div class="chip-row">
                ${o.map(e=>k`
                    <span class="chip muted" title=${e.label}>
                      <ha-icon icon=${e.icon} aria-hidden="true"></ha-icon>
                      <span>${e.label}</span>
                    </span>
                  `)}
              </div>
            </div>`:j}
        ${c?k`<div class="detail-section">
              <div class="detail-label">
                ${V(`card.address_heading`)}
              </div>
              <div class="detail-text" lang="de">${c}</div>
            </div>`:j}
        <div class="actions">
          ${r?k`<a
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
                <span>${V(`card.open_in_maps`)}</span>
              </a>`:j}
          ${(()=>{let t=kt(e.website);return t?k`<a
                  class="btn-secondary"
                  href=${t}
                  target="_blank"
                  rel="noopener noreferrer"
                  @click=${e=>e.stopPropagation()}
                >
                  <ha-icon icon="mdi:web" aria-hidden="true"></ha-icon>
                  <span>${V(`card.website`)}</span>
                </a>`:j})()}
          ${e.phoneNumber?k`<a
                class="btn-secondary"
                href=${`tel:${e.phoneCountryCode??``}${e.phoneNumber}`}
                @click=${e=>e.stopPropagation()}
              >
                <ha-icon icon="mdi:phone-outline" aria-hidden="true"></ha-icon>
                <span>${V(`card.call`)}</span>
              </a>`:j}
          ${(()=>{let t=kt(e.priceUrl);return t?k`<a
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
                  <span>${V(`card.tariff`)}</span>
                </a>`:j})()}
        </div>
        </div>
      </div>
    `}_renderRack(e){return k`
      <div class="rack">
        ${e.map(e=>this._renderRackSlot(e))}
      </div>
    `}_renderRackSlot(e){let t=Ct(e),{bucket:n,overlay:r}=G(e),i=this._pointTooltip(e),a=this._pointAriaLabel(e,t),o=t?k`<span class="power-badge" data-type=${t}
          >${t.toUpperCase()}</span
        >`:j;if(r){let e=r.bgTint?`rack-slot slot-tint-${r.bgTint}`:`rack-slot`;return k`
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
      `}let s=J(e),c=K(e.capacityKw);return k`
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
    `}_pointAriaLabel(e,t){let n=[];t&&n.push(t.toUpperCase()),e.capacityKw&&n.push(`${K(e.capacityKw)} kW`);let r=J(e);r&&r!==`–`&&n.push(r);let i=W(e.status);return i&&n.push(i),n.join(` · `)}_pointTooltip(e){let t=[`${e.evseId??``} · ${W(e.status)}`.trim()],n=e.startFeeCent??0;n>0&&t.push(`${V(`card.start_fee_label`)}: ${q(n)} €`);let r=e.blockingFeeCentMin??0,i=e.blockingFeeFromMinute??0;return r>0&&i>0&&t.push(`${Dt(r)} ${V(`card.blocking_fee_label`).replaceAll(`{from}`,String(i))}`),t.join(` · `)}_renderOpeningHoursSection(e,t){if(!e||e.length===0)return j;let n=this._formatOpeningHours(e);if(n.length===0)return j;let r=t===!0?`flag ok`:t===!1?`flag warn`:null,i=t===!0?`mdi:clock-check-outline`:t===!1?`mdi:clock-alert-outline`:null,a=t===!0?V(`card.open_now`):t===!1?V(`card.closed_now`):null;return k`
      <div class="detail-section">
        <div class="detail-label">
          ${V(`card.opening_hours_heading`)}
        </div>
        <div class="hours-row">
          <dl class="hours-lines">
            ${n.map(e=>k`<div class="hours-line">
                <dt class="hours-day">${e.day}</dt>
                <dd class="hours-time">${e.time}</dd>
              </div>`)}
          </dl>
          ${a&&r&&i?k`<span class=${r}>
                <ha-icon icon=${i} aria-hidden="true"></ha-icon>
                <span>${a}</span>
              </span>`:j}
        </div>
      </div>
    `}_formatOpeningHours(e){let t=[];for(let n of e){let e=this._formatSingleRange(n);e&&t.push(e)}return t}_formatSingleRange(e){let t=this._shortDay(e.fromWeekday),n=this._shortDay(e.toWeekday);if(!t||!n)return null;let r=e.fromTime===`00:00`&&(e.toTime===`23:59`||e.toTime===`24:00`);return{day:e.fromWeekday===e.toWeekday?t:`${t}–${n}`,time:r?V(`card.always_open_short`):`${e.fromTime}–${e.toTime}`}}_shortDay(e){switch((e??``).toUpperCase()){case`MONDAY`:return V(`weekday.mo`);case`TUESDAY`:return V(`weekday.tu`);case`WEDNESDAY`:return V(`weekday.we`);case`THURSDAY`:return V(`weekday.th`);case`FRIDAY`:return V(`weekday.fr`);case`SATURDAY`:return V(`weekday.sa`);case`SUNDAY`:return V(`weekday.su`);default:return``}}_paymentChips(e){let t=/* @__PURE__ */ new Set,n=[];for(let r of e)for(let e of r.authenticationMode??[]){if(t.has(e))continue;t.add(e);let r=this._authLabel(e);r&&n.push(r)}return n}_authLabel(e){switch(e){case`APP`:return{icon:`mdi:cellphone`,label:V(`auth.app`)};case`QR`:return{icon:`mdi:qrcode`,label:V(`auth.qr`)};case`RFID_READER`:return{icon:`mdi:credit-card-wireless-outline`,label:V(`auth.rfid`)};case`CHARGING_CONTRACT`:return{icon:`mdi:handshake-outline`,label:V(`auth.contract`)};case`DEBIT_CARD`:return{icon:`mdi:credit-card-outline`,label:V(`auth.debit`)};case`CREDIT_CARD`:return{icon:`mdi:credit-card`,label:V(`auth.credit`)};case`CONTACTLESS_CARD_SUPPORT`:return{icon:`mdi:contactless-payment`,label:V(`auth.contactless`)};default:return null}}_feesLine(e){let t=e.map(e=>e.startFeeCent??0).filter(e=>e>0),n=e.map(e=>({cent:e.blockingFeeCentMin??0,fromMin:e.blockingFeeFromMinute??0})).filter(e=>e.cent>0&&e.fromMin>0),r=[];if(t.length>0){let e=Math.max(...t);r.push(`+ ${q(e)} € ${V(`card.start_fee_label`)}`)}if(n.length>0){let e=Math.max(...n.map(e=>e.cent)),t=Math.min(...n.map(e=>e.fromMin));r.push(`${Dt(e)} ${V(`card.blocking_fee_label`).replaceAll(`{from}`,String(t))}`)}return r.length>0?r.join(`, `):null}_statusAria(e,t,n){return e===`inactive`?V(`card.inactive`):e===`unknown`?V(`card.status_unknown`):`${t} / ${n} ${V(`card.live_suffix`)}`}_toggle(e){let t=new Set(this._expanded);t.has(e)?t.delete(e):t.add(e),this._expanded=t}_onKey(e,t){(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),this._toggle(t))}_priceText(e){if(e.length===0)return``;if(e.some(e=>e.freeOfCharge))return V(`card.gratis`);let t=e.filter(e=>!e.freeOfCharge&&e.priceCentKwh>0).map(e=>e.priceCentKwh);if(t.length>0)return`${q(Math.min(...t))} €/kWh`;let n=e.filter(e=>!e.freeOfCharge&&e.priceCentMin>0).map(e=>e.priceCentMin);return n.length>0?`${q(Math.min(...n))} €/min`:``}_address(e){let t=[];e.street&&t.push(e.street);let n=[e.postCode,e.city].filter(Boolean).join(` `);return n&&t.push(n),t.join(`, `)}_amenityItems(e){return[{flag:e.greenEnergy,icon:`mdi:leaf`,label:V(`amenities.green_energy`)},{flag:e.austrianEcoLabel,icon:`mdi:certificate-outline`,label:V(`amenities.austrian_ecolabel`)},{flag:e.freeParking,icon:`mdi:parking`,label:V(`amenities.free_parking`)},{flag:e.roofedParking,icon:`mdi:home-roof`,label:V(`amenities.roofed_parking`)},{flag:e.illuminatedParking,icon:`mdi:lightbulb-outline`,label:V(`amenities.illuminated_parking`)},{flag:(e.barrierFreeParkingPlaces??0)>0,icon:`mdi:wheelchair-accessibility`,label:V(`amenities.barrier_free`)},{flag:e.cateringService,icon:`mdi:silverware-fork-knife`,label:V(`amenities.catering`)},{flag:e.bathroomsAvailable,icon:`mdi:toilet`,label:V(`amenities.bathrooms`)},{flag:e.restingFacilities,icon:`mdi:sofa`,label:V(`amenities.resting`)}].filter(e=>e.flag)}_formatKm(e){let t=typeof e==`number`?e:parseFloat(String(e??``));if(!Number.isFinite(t))return`–`;try{return new Intl.NumberFormat(`de-AT`,{minimumFractionDigits:2,maximumFractionDigits:2}).format(t)}catch{return t.toFixed(2)}}static{this.styles=xt}};Y([R({attribute:!1})],$.prototype,`hass`,void 0),Y([z()],$.prototype,`config`,void 0),Y([z()],$.prototype,`_expanded`,void 0),Y([z()],$.prototype,`_versionMismatch`,void 0),$=Y([L(`ladestellen-austria-card`)],$);export{$ as LadestellenAustriaCard};