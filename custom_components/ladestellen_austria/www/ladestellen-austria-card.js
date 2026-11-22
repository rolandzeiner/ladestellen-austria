/*! Ladestellen Austria Card — bundled by Rolldown. Edit sources in src/, then `npm run build`. */
var e=Object.defineProperty,t=(t,n)=>{let r={};for(var i in t)e(r,i,{get:t[i],enumerable:!0});return n||e(r,Symbol.toStringTag,{value:`Module`}),r},n=globalThis,r=n.ShadowRoot&&(n.ShadyCSS===void 0||n.ShadyCSS.nativeShadow)&&`adoptedStyleSheets`in Document.prototype&&`replace`in CSSStyleSheet.prototype,i=Symbol(),a=/* @__PURE__ */ new WeakMap,o=class{constructor(e,t,n){
/**
* @license
* Copyright 2019 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
if(this._$cssResult$=!0,n!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(r&&e===void 0){let n=t!==void 0&&t.length===1;n&&(e=a.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&a.set(t,e))}return e}toString(){return this.cssText}},s=e=>new o(typeof e==`string`?e:e+``,void 0,i),c=(e,...t)=>new o(e.length===1?e[0]:t.reduce((t,n,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if(typeof e==`number`)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: `+e+`. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)})(n)+e[r+1],e[0]),e,i),l=(e,t)=>{if(r)e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let r of t){let t=document.createElement(`style`),i=n.litNonce;i!==void 0&&t.setAttribute(`nonce`,i),t.textContent=r.cssText,e.appendChild(t)}},u=r?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t=``;for(let n of e.cssRules)t+=n.cssText;return s(t)})(e):e,{is:d,defineProperty:f,getOwnPropertyDescriptor:p,getOwnPropertyNames:ee,getOwnPropertySymbols:m,getPrototypeOf:h}=Object,g=globalThis,_=g.trustedTypes,te=_?_.emptyScript:``,ne=g.reactiveElementPolyfillSupport,v=(e,t)=>e,y={toAttribute(e,t){
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
var ie=globalThis,ae=e=>e,oe=ie.trustedTypes,se=oe?oe.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,ce=`$lit$`,S=`lit$${Math.random().toFixed(9).slice(2)}$`,le=`?`+S,ue=`<${le}>`,C=document,w=()=>C.createComment(``),T=e=>e===null||typeof e!=`object`&&typeof e!=`function`,de=Array.isArray,fe=e=>de(e)||typeof e?.[Symbol.iterator]==`function`,pe=`[ 	
\f\r]`,E=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,me=/-->/g,he=/>/g,D=RegExp(`>|${pe}(?:([^\\s"'>=/]+)(${pe}*=${pe}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),ge=/'/g,_e=/"/g,ve=/^(?:script|style|textarea|title)$/i,O=(e=>(t,...n)=>({_$litType$:e,strings:t,values:n}))(1),k=Symbol.for(`lit-noChange`),A=Symbol.for(`lit-nothing`),ye=/* @__PURE__ */ new WeakMap,j=C.createTreeWalker(C,129);function be(e,t){if(!de(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return se===void 0?t:se.createHTML(t)}var xe=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:t===3?`<math>`:``,o=E;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===E?c[1]===`!--`?o=me:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=D):(ve.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=D):o=he:o===D?c[0]===`>`?(o=i??E,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?D:c[3]===`"`?_e:ge):o===_e||o===ge?o=D:o===me||o===he?o=E:(o=D,i=void 0);let d=o===D&&e[t+1].startsWith(`/>`)?` `:``;a+=o===E?n+ue:l>=0?(r.push(s),n.slice(0,l)+ce+n.slice(l)+S+d):n+S+(l===-2?t:d)}return[be(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:t===3?`</math>`:``)),r]},Se=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=xe(t,n);if(this.el=e.createElement(l,r),j.currentNode=this.el.content,n===2||n===3){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;(i=j.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes())for(let e of i.getAttributeNames())if(e.endsWith(ce)){let t=u[o++],n=i.getAttribute(e).split(S),r=/([.?@])?(.*)/.exec(t);c.push({type:1,index:a,name:r[2],strings:n,ctor:r[1]===`.`?Te:r[1]===`?`?Ee:r[1]===`@`?De:N}),i.removeAttribute(e)}else e.startsWith(S)&&(c.push({type:6,index:a}),i.removeAttribute(e));if(ve.test(i.tagName)){let e=i.textContent.split(S),t=e.length-1;if(t>0){i.textContent=oe?oe.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],w()),j.nextNode(),c.push({type:2,index:++a});i.append(e[t],w())}}}else if(i.nodeType===8){if(i.data===le)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(S,e+1))!==-1;)c.push({type:7,index:a}),e+=S.length-1}}a++}}static createElement(e,t){let n=C.createElement(`template`);return n.innerHTML=e,n}};function M(e,t,n=e,r){if(t===k)return t;let i=r===void 0?n._$Cl:n._$Co?.[r],a=T(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(e),i._$AT(e,n,r)),r===void 0?n._$Cl=i:(n._$Co??=[])[r]=i),i!==void 0&&(t=M(e,i._$AS(e,t.values),i,r)),t}var Ce=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??C).importNode(t,!0);j.currentNode=r;let i=j.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new we(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new Oe(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=j.nextNode(),a++)}return j.currentNode=C,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},we=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=M(this,e,t),T(e)?e===A||e==null||e===``?(this._$AH!==A&&this._$AR(),this._$AH=A):e!==this._$AH&&e!==k&&this._(e):e._$litType$===void 0?e.nodeType===void 0?fe(e)?this.k(e):this._(e):this.T(e):this.$(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==A&&T(this._$AH)?this._$AA.nextSibling.data=e:this.T(C.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=Se.createElement(be(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new Ce(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=ye.get(e.strings);return t===void 0&&ye.set(e.strings,t=new Se(e)),t}k(t){de(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.O(w()),this.O(w()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=ae(e).nextSibling;ae(e).remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},N=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,i){this.type=1,this._$AH=A,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(/* @__PURE__ */ new String),this.strings=n):this._$AH=A}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=M(this,e,t,0),a=!T(e)||e!==this._$AH&&e!==k,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=M(this,r[n+o],t,o),s===k&&(s=this._$AH[o]),a||=!T(s)||s!==this._$AH[o],s===A?e=A:e!==A&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},Te=class extends N{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===A?void 0:e}},Ee=class extends N{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==A)}},De=class extends N{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=M(this,e,t,0)??A)===k)return;let n=this._$AH,r=e===A&&n!==A||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==A&&(n===A||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Oe=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){M(this,e)}},ke=ie.litHtmlPolyfillSupport;ke?.(Se,we),(ie.litHtmlVersions??=[]).push(`3.3.3`);var Ae=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new we(t.insertBefore(w(),e),e,void 0,n??{})}return i._$AI(e),i},je=globalThis,P=class extends x{constructor(){
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Ae(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return k}};P._$litElement$=!0,P.finalized=!0,je.litElementHydrateSupport?.({LitElement:P});var Me=je.litElementPolyfillSupport;Me?.({LitElement:P}),(je.litElementVersions??=[]).push(`4.2.2`);
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
var F=e=>(t,n)=>{n===void 0?customElements.define(e,t):n.addInitializer(()=>{customElements.define(e,t)})},Ne={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:b},Pe=(e=Ne,t,n)=>{
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
let{kind:r,metadata:i}=n,a=globalThis.litPropertyMetadata.get(i);if(a===void 0&&globalThis.litPropertyMetadata.set(i,a=/* @__PURE__ */ new Map),r===`setter`&&((e=Object.create(e)).wrapped=!0),a.set(n.name,e),r===`accessor`){let{name:r}=n;return{set(n){let i=t.get.call(this);t.set.call(this,n),this.requestUpdate(r,i,e,!0,n)},init(t){return t!==void 0&&this.C(r,void 0,e,t),t}}}if(r===`setter`){let{name:r}=n;return function(n){let i=this[r];t.call(this,n),this.requestUpdate(r,i,e,!0,n)}}throw Error(`Unsupported decorator location: `+r)};function I(e){return(t,n)=>typeof n==`object`?Pe(e,t,n):((e,t,n)=>{let r=t.hasOwnProperty(n);return t.constructor.createProperty(n,e),r?Object.getOwnPropertyDescriptor(t,n):void 0})(e,t,n)}
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/function L(e){return I({...e,state:!0,attribute:!1})}function Fe(e,t,n){e.dispatchEvent(new CustomEvent(t,{detail:n,bubbles:!0,composed:!0}))}var Ie=[`Type 2`,`CCS`,`CHAdeMO`,`Type 1`,`Tesla`,`Schuko`,`CEE`],Le=[{key:`green_energy`,icon:`mdi:leaf`,label_key:`amenities.green_energy`},{key:`austrian_ecolabel`,icon:`mdi:certificate-outline`,label_key:`amenities.austrian_ecolabel`},{key:`free_parking`,icon:`mdi:parking`,label_key:`amenities.free_parking`},{key:`roofed_parking`,icon:`mdi:home-roof`,label_key:`amenities.roofed_parking`},{key:`illuminated_parking`,icon:`mdi:lightbulb-outline`,label_key:`amenities.illuminated_parking`},{key:`barrier_free`,icon:`mdi:wheelchair-accessibility`,label_key:`amenities.barrier_free`},{key:`catering`,icon:`mdi:silverware-fork-knife`,label_key:`amenities.catering`},{key:`bathrooms`,icon:`mdi:toilet`,label_key:`amenities.bathrooms`},{key:`resting`,icon:`mdi:sofa`,label_key:`amenities.resting`}],Re=[{key:`APP`,icon:`mdi:cellphone`,label_key:`auth.app`},{key:`QR`,icon:`mdi:qrcode`,label_key:`auth.qr`},{key:`RFID_READER`,icon:`mdi:credit-card-wireless-outline`,label_key:`auth.rfid`},{key:`CHARGING_CONTRACT`,icon:`mdi:handshake-outline`,label_key:`auth.contract`},{key:`DEBIT_CARD`,icon:`mdi:credit-card-outline`,label_key:`auth.debit`},{key:`CREDIT_CARD`,icon:`mdi:credit-card`,label_key:`auth.credit`},{key:`CONTACTLESS_CARD_SUPPORT`,icon:`mdi:contactless-payment`,label_key:`auth.contactless`}],ze=/* @__PURE__ */ t({amenities:()=>Ue,auth:()=>We,card:()=>Ve,common:()=>Be,default:()=>Je,editor:()=>Ke,parking:()=>He,parking_editor:()=>qe,weekday:()=>Ge}),Be={invalid_configuration:`Invalid configuration`,invalid_entity:`Card config: 'entity' must be a string referencing a sensor entity_id.`,invalid_station_id:`Card config: 'station_id' must be a string.`,loading:`Loading…`,entity_unavailable:`Entity not available: {entity}`},Ve={no_entity:`Select a Ladestellen Austria sensor in the card editor.`,no_stations:`No stations match the current filters.`,unreachable:`Can't reach E-Control`,unreachable_detail:`Stations come back on their own once the connection works again.`,hero_count:`{count} stations`,hero_count_filtered:`{filtered} of {total} stations`,hero_range:`{min}–{max} km range`,inactive:`inactive`,status_unknown:`live availability unavailable`,free_of_charge:`Free`,available_count:`{avail} of {total} available`,open_in_maps:`Open in Maps`,website:`Website`,call:`Call`,address_heading:`Address`,amenities_heading:`Amenities`,pinned:`Pinned`,unpin:`Remove pin`,orphan_pin_title:`Pinned station not in range`,operator_heading:`Operator`,charging_points_heading:`Charging points`,opening_hours_heading:`Opening hours`,payment_heading:`Payment`,open_now:`Open now`,closed_now:`Closed`,always_open_short:`24h`,start_fee_label:`start fee`,blocking_fee_label:`¢/min from {from} min.`,point_status_available:`Available`,point_status_charging:`Charging`,point_status_occupied:`Occupied`,point_status_reserved:`Reserved`,point_status_blocked:`Blocked`,point_status_out_of_order:`Out of order`,point_status_faulted:`Faulted`,point_status_inoperative:`Inoperative`,point_status_unavailable:`Unavailable`,point_status_out_of_stock:`Empty`,point_status_planned:`Planned`,point_status_removed:`Removed`,point_status_unknown:`Unknown`,tariff:`Tariff`,dynamic_follows_entity:`Tracking: {entity}`},He={editor_station_heading:`Station`,pick_station_hint:`The card shows each charging point of this station as a parking space.`,no_station_selected:`Pick a station in the card editor.`,station_not_found:`The selected station is not in the sensor's current results.`,no_stations:`No stations yet. Wait for the sensor's next refresh.`,none_available:`None of the nearby stations has a free space right now.`,none_matching:`None of the nearby stations has a charging point with this plug and power.`,slot_unmatched:`doesn't fit your plug or power`,station_not_in_range:`Not in the sensor's current radius. Pick another station, or widen the radius in the integration options.`,available_count:`{avail} of {total} free`,no_points:`No charging points reported for this station.`,slot_status_free:`free`,slot_status_busy:`in use`,slot_status_out_of_order:`out of order`,slot_status_unknown:`unknown`,slot_status_reserved:`reserved`,slot_status_blocked:`blocked`,slot_status_out_of_stock:`empty`,slot_status_faulted:`faulted`,slot_status_inoperative:`inoperative`,slot_status_unavailable:`unavailable`,slot_status_planned:`planned`,slot_status_removed:`removed`},Ue={green_energy:`Green energy`,free_parking:`Free parking`,roofed_parking:`Roofed parking`,illuminated_parking:`Illuminated`,barrier_free:`Accessible`,austrian_ecolabel:`Austrian Eco-Label`,catering:`Catering nearby`,bathrooms:`Restrooms`,resting:`Resting area`},We={app:`App`,qr:`QR code`,rfid:`RFID`,contract:`Contract`,debit:`Debit card`,credit:`Credit card`,contactless:`Contactless`},Ge={mo:`Mo`,tu:`Tu`,we:`We`,th:`Th`,fr:`Fr`,sa:`Sa`,su:`Su`},Ke={entity:`Sensor`,entity_missing:`Selected sensor is unavailable. Pick a different Ladestellen Austria sensor.`,name:`Title`,name_helper:`Defaults to “Ladestellen Austria”.`,group_header:`Header & overview`,group_stations:`Stations`,group_filters:`Filters`,group_footer:`Footer`,show_header:`Show header`,show_header_helper:`Icon, title and place.`,show_hero:`Highlight the nearest station`,show_hero_helper:`Distance to the nearest station and how many are in range.`,max_stations:`Show at most`,max_stations_helper:`Shows up to {n} stations. Pinned ones count.`,sort_order:`Order`,sort_distance:`Nearest first`,sort_distance_helper:`Shortest distance on top`,sort_power:`Fastest first`,sort_power_helper:`Highest power on top`,pinned:`Pinned`,pinned_helper:`Pinned stations always stay on top, even if a filter would hide them.`,pin_select_sensor_first:`Select a sensor first to see available stations.`,pin_no_stations_yet:`No stations returned yet — wait for the next refresh.`,pin_orphans_heading:`Pinned but out of range. Select to remove.`,pin_unpin:`Remove`,pin_disabled_dynamic:`Dynamic location mode is active on this sensor — pinned stations are disabled because the list follows your current position. Existing pins are preserved for when you switch back to fixed mode.`,show_pricing:`Show prices`,show_amenities:`Show amenities in the details`,only_available:`Only available right now`,only_open:`Only open right now`,only_free:`Only free charging`,chips_connector:`Connectors`,chips_connector_helper:`Shows stations with at least one of these. None picked: all.`,chips_payment:`Payment`,chips_payment_helper:`Shows stations that accept at least one of these.`,chips_amenity:`Amenities`,chips_amenity_helper:`Shows only stations with everything picked.`,logo_adapt_to_theme:`Match the logo to the theme`,logo_adapt_to_theme_helper:`Black on light, white on dark backgrounds instead of E-Control's colours.`,hint_compliance:`The logo and “Datenquelle: E-Control” always stay visible. The ladestellen.at terms of use require it.`,summary_hidden:`Hidden`,summary_header:`Header`,summary_hero:`Nearest highlighted`,summary_distance:`nearest first`,summary_power:`fastest first`,summary_pins:`{n} pinned`,summary_filters:`Filters on: {n}`,summary_no_filters:`No filters`,summary_logo_colour:`Logo in E-Control colours`,summary_logo_theme:`Logo matches theme`},qe={name_helper:`Defaults to the station's name.`,auto_nearest:`Always the nearest station`,auto_nearest_helper:`Follows the sensor, so with a tracker it follows you.`,only_available:`Only with a free space`,only_available_helper:`Skips stations that are full, out of order or closed right now.`,group_plug:`Plug & power`,plugs:`Plugs`,plugs_helper:`Only charging points with one of these count. None picked: all.`,min_kw:`Power`,min_kw_any:`Any`,min_kw_any_helper:`Slow points too`,min_kw_from:`From {kw} kW`,min_kw_11_helper:`Normal charging, AC`,min_kw_50_helper:`Fast charging, DC`,min_kw_150_helper:`High-power charging`,plug_power_hint:`With “Always the nearest station”, these pick the station. In the lot, spaces that don't fit are hatched.`,summary_all_plugs:`All plugs`,summary_any_power:`any power`,summary_min_kw:`from {kw} kW`,group_header:`Header`,group_lot:`Parking lot`,show_header_helper:`Icon, title and how many spaces are free.`,show_free_count:`Count free spaces`,show_free_count_helper:`For example “2 of 6 free”.`,summary_counter:`with counter`,asphalt_style:`Asphalt`,asphalt_default:`Smooth`,asphalt_textured:`Grainy`,car_color_mode:`Cars`,car_color_random:`Mixed`,car_color_theme:`Accent colour`,car_color_fixed:`One colour`,car_colour:`Car colour`,paint_width:`Lines`,paint_width_thin:`Thin`,paint_width_medium:`Medium`,paint_width_wide:`Wide`,icon_paint_mode:`Labels`,icon_paint_default:`Status colours`,icon_paint_white:`Painted white`},Je={common:Be,card:Ve,parking:He,amenities:Ue,auth:We,weekday:Ge,editor:Ke,parking_editor:qe},Ye=/* @__PURE__ */ t({amenities:()=>$e,auth:()=>et,card:()=>Ze,common:()=>Xe,default:()=>it,editor:()=>nt,parking:()=>Qe,parking_editor:()=>rt,weekday:()=>tt}),Xe={invalid_configuration:`Ungültige Konfiguration`,invalid_entity:`Kartenkonfiguration: „entity“ muss ein String mit einer Sensor-entity_id sein.`,invalid_station_id:`Kartenkonfiguration: „station_id“ muss ein String sein.`,loading:`Lade…`,entity_unavailable:`Entität nicht verfügbar: {entity}`},Ze={no_entity:`Bitte einen Ladestellen-Austria-Sensor im Karten-Editor auswählen.`,no_stations:`Keine Ladestellen entsprechen den aktuellen Filtern.`,unreachable:`Keine Verbindung zur E-Control`,unreachable_detail:`Die Ladestellen erscheinen von selbst wieder, sobald die Verbindung funktioniert.`,hero_count:`{count} Ladestellen`,hero_count_filtered:`{filtered} von {total} Ladestellen`,hero_range:`{min}–{max} km Umkreis`,inactive:`inaktiv`,status_unknown:`Live-Status nicht verfügbar`,free_of_charge:`Gratis`,available_count:`{avail} von {total} verfügbar`,open_in_maps:`In Karte öffnen`,website:`Website`,call:`Anrufen`,address_heading:`Adresse`,amenities_heading:`Ausstattung`,pinned:`Angepinnt`,unpin:`Pin entfernen`,orphan_pin_title:`Angepinnte Ladestelle außerhalb des Umkreises`,operator_heading:`Betreiber`,charging_points_heading:`Ladepunkte`,opening_hours_heading:`Öffnungszeiten`,payment_heading:`Bezahlung`,open_now:`Jetzt geöffnet`,closed_now:`Geschlossen`,always_open_short:`24h`,start_fee_label:`Startgebühr`,blocking_fee_label:`¢/min ab {from} Min.`,point_status_available:`Verfügbar`,point_status_charging:`Lädt`,point_status_occupied:`Belegt`,point_status_reserved:`Reserviert`,point_status_blocked:`Blockiert`,point_status_out_of_order:`Außer Betrieb`,point_status_faulted:`Defekt`,point_status_inoperative:`Nicht in Betrieb`,point_status_unavailable:`Nicht verfügbar`,point_status_out_of_stock:`Leer`,point_status_planned:`Geplant`,point_status_removed:`Entfernt`,point_status_unknown:`Unbekannt`,tariff:`Tarif`,dynamic_follows_entity:`Folgt: {entity}`},Qe={editor_station_heading:`Ladestelle`,pick_station_hint:`Die Karte zeigt jeden Ladepunkt dieser Ladestelle als Parkplatz.`,no_station_selected:`Bitte eine Ladestelle im Karten-Editor auswählen.`,station_not_found:`Die gewählte Ladestelle ist aktuell nicht in den Sensor-Ergebnissen.`,no_stations:`Noch keine Ladestellen. Warte auf die nächste Aktualisierung des Sensors.`,none_available:`Gerade hat keine Ladestelle in der Nähe einen freien Platz.`,none_matching:`Keine Ladestelle in der Nähe hat einen Ladepunkt mit diesem Stecker und dieser Leistung.`,slot_unmatched:`passt nicht zu Stecker oder Leistung`,station_not_in_range:`Nicht im aktuellen Umkreis des Sensors. Wähle eine andere Ladestelle oder vergrößere den Umkreis in den Integrations-Optionen.`,available_count:`{avail} von {total} frei`,no_points:`Keine Ladepunkte für diese Ladestelle vorhanden.`,slot_status_free:`frei`,slot_status_busy:`belegt`,slot_status_out_of_order:`außer Betrieb`,slot_status_unknown:`unbekannt`,slot_status_reserved:`reserviert`,slot_status_blocked:`blockiert`,slot_status_out_of_stock:`leer`,slot_status_faulted:`defekt`,slot_status_inoperative:`nicht in Betrieb`,slot_status_unavailable:`nicht verfügbar`,slot_status_planned:`geplant`,slot_status_removed:`entfernt`},$e={green_energy:`Ökostrom`,free_parking:`Kostenloses Parken`,roofed_parking:`Überdacht`,illuminated_parking:`Beleuchtet`,barrier_free:`Barrierefrei`,austrian_ecolabel:`Umweltzeichen`,catering:`Gastronomie`,bathrooms:`WC`,resting:`Ruhebereich`},et={app:`App`,qr:`QR-Code`,rfid:`RFID`,contract:`Vertrag`,debit:`Bankomat`,credit:`Kreditkarte`,contactless:`Kontaktlos`},tt={mo:`Mo`,tu:`Di`,we:`Mi`,th:`Do`,fr:`Fr`,sa:`Sa`,su:`So`},nt={entity:`Sensor`,entity_missing:`Ausgewählter Sensor ist nicht verfügbar. Bitte einen anderen Ladestellen-Austria-Sensor wählen.`,name:`Titel`,name_helper:`Standardmäßig „Ladestellen Austria“.`,group_header:`Kopfzeile & Übersicht`,group_stations:`Ladestellen`,group_filters:`Filter`,group_footer:`Fußzeile`,show_header:`Kopfzeile anzeigen`,show_header_helper:`Symbol, Titel und Ort.`,show_hero:`Nächste Ladestelle groß zeigen`,show_hero_helper:`Entfernung zur nächsten Ladestelle und wie viele in Reichweite sind.`,max_stations:`Höchstens`,max_stations_helper:`Zeigt bis zu {n} Ladestellen. Angepinnte zählen mit.`,sort_order:`Reihenfolge`,sort_distance:`Nächste zuerst`,sort_distance_helper:`Kürzeste Entfernung oben`,sort_power:`Schnellste zuerst`,sort_power_helper:`Höchste Leistung oben`,pinned:`Angepinnt`,pinned_helper:`Angepinnte Ladestellen stehen immer oben, auch wenn ein Filter sie ausblenden würde.`,pin_select_sensor_first:`Zuerst einen Sensor auswählen, um verfügbare Ladestellen zu sehen.`,pin_no_stations_yet:`Noch keine Ladestellen geladen — auf die nächste Aktualisierung warten.`,pin_orphans_heading:`Angepinnt, aber nicht im Umkreis. Zum Entfernen auswählen.`,pin_unpin:`Entfernen`,pin_disabled_dynamic:`Dynamische Standortverfolgung ist für diesen Sensor aktiv — angepinnte Ladestellen sind deaktiviert, weil die Liste deiner aktuellen Position folgt. Bestehende Pins bleiben erhalten, falls du wieder auf festen Standort wechselst.`,show_pricing:`Preise zeigen`,show_amenities:`Ausstattung in den Details zeigen`,only_available:`Nur gerade frei`,only_open:`Nur gerade geöffnet`,only_free:`Nur gratis laden`,chips_connector:`Stecker`,chips_connector_helper:`Zeigt Ladestellen mit mindestens einem davon. Nichts gewählt: alle.`,chips_payment:`Bezahlen`,chips_payment_helper:`Zeigt Ladestellen, die mindestens eine davon annehmen.`,chips_amenity:`Ausstattung`,chips_amenity_helper:`Zeigt nur Ladestellen mit allem Gewählten.`,logo_adapt_to_theme:`Logo dem Design anpassen`,logo_adapt_to_theme_helper:`Schwarz auf hellem, weiß auf dunklem Hintergrund statt in E-Control-Farben.`,hint_compliance:`Logo und „Datenquelle: E-Control“ bleiben immer sichtbar. Das verlangen die Nutzungsbedingungen von ladestellen.at.`,summary_hidden:`Ausgeblendet`,summary_header:`Kopfzeile`,summary_hero:`Nächste groß`,summary_distance:`nächste zuerst`,summary_power:`schnellste zuerst`,summary_pins:`{n} angepinnt`,summary_filters:`Aktive Filter: {n}`,summary_no_filters:`Keine Filter`,summary_logo_colour:`Logo in E-Control-Farben`,summary_logo_theme:`Logo passt sich an`},rt={name_helper:`Standardmäßig der Name der Ladestelle.`,auto_nearest:`Immer die nächste Ladestelle`,auto_nearest_helper:`Folgt dem Sensor, mit Tracker also dir.`,only_available:`Nur mit freiem Platz`,only_available_helper:`Überspringt Ladestellen, die gerade voll, gestört oder geschlossen sind.`,group_plug:`Stecker & Leistung`,plugs:`Stecker`,plugs_helper:`Nur Ladepunkte mit einem davon zählen. Nichts gewählt: alle.`,min_kw:`Leistung`,min_kw_any:`Jede`,min_kw_any_helper:`Auch langsame Ladepunkte`,min_kw_from:`Ab {kw} kW`,min_kw_11_helper:`Normal laden, AC`,min_kw_50_helper:`Schnellladen, DC`,min_kw_150_helper:`Ultraschnell laden`,plug_power_hint:`Mit „Immer die nächste Ladestelle“ bestimmen sie die Ladestelle. Im Parkplatz sind Plätze, die nicht passen, schraffiert.`,summary_all_plugs:`Alle Stecker`,summary_any_power:`jede Leistung`,summary_min_kw:`ab {kw} kW`,group_header:`Kopfzeile`,group_lot:`Parkplatz`,show_header_helper:`Symbol, Titel und wie viele Plätze frei sind.`,show_free_count:`Freie Plätze zählen`,show_free_count_helper:`Zum Beispiel „2 von 6 frei“.`,summary_counter:`mit Zähler`,asphalt_style:`Asphalt`,asphalt_default:`Glatt`,asphalt_textured:`Körnig`,car_color_mode:`Autos`,car_color_random:`Bunt`,car_color_theme:`Akzentfarbe`,car_color_fixed:`Eine Farbe`,car_colour:`Farbe der Autos`,paint_width:`Linien`,paint_width_thin:`Schmal`,paint_width_medium:`Mittel`,paint_width_wide:`Breit`,icon_paint_mode:`Beschriftung`,icon_paint_default:`Statusfarben`,icon_paint_white:`Weiß aufgemalt`},it={common:Xe,card:Ze,parking:Qe,amenities:$e,auth:et,weekday:tt,editor:nt,parking_editor:rt},at={en:ze,de:Ye};function ot(e,t){let n=e.split(`.`).reduce((e,t)=>{if(e&&typeof e==`object`&&t in e)return e[t]},t);return typeof n==`string`?n:void 0}var st;function ct(e){typeof e==`string`&&e.length>0&&(st=e)}function lt(){return(st||(typeof navigator<`u`?navigator.language:``)||`en`).replace(/['"]+/g,``).substring(0,2).toLowerCase()}function R(e,t=``,n=``){let r=lt(),i=at.en??{},a=ot(e,at[r]??i);return a===void 0&&(a=ot(e,i)),a===void 0&&(a=e),t!==``&&n!==``&&(a=a.replaceAll(t,n)),a}var ut=`Datenquelle: E-Control`;function dt(){return O`
    <div class="empty-state unreachable" role="status" aria-live="polite">
      <div class="unreachable-title">${R(`card.unreachable`)}</div>
      <div class="unreachable-detail">${R(`card.unreachable_detail`)}</div>
    </div>
  `}function ft(e,t,n){let r=!!e?.themes?.darkMode;return O`
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
          class=${n?`brand-logo adaptive ${r?`adaptive-dark`:`adaptive-light`}`:`brand-logo`}
          src="/ladestellen_austria/e-control_logo.svg"
          alt="E-Control"
        />
      </a>
      <span class="attribution-text">${t&&t.includes(`E-Control`)?t:ut}</span>
    </div>
  `}function pt(e){return e?O`<ha-alert alert-type="warning"
        >${R(`common.entity_unavailable`,`{entity}`,e)}</ha-alert
      >`:O`<div class="empty-state" role="status">${R(`card.no_entity`)}</div>`}var mt=`1.3.0`,ht=`ladestellen_austria`;function gt(e,t){e.has(`hass`)&&ct(t?.language)}function _t(e,t,n){let r=e.get(`hass`);return!r||!n||r.language!==t.language||r.themes?.darkMode!==t.themes?.darkMode||r.config?.time_zone!==t.config?.time_zone||r.states[n]!==t.states[n]}function vt(e){return e.find(e=>e.startsWith(`sensor.`)&&e.includes(`ladestelle`))??``}function yt(e){return(t,n)=>!n.startsWith(`sensor.`)||t?.entities?.[n]?.platform!==`ladestellen_austria`?null:{config:{type:e,entity:n}}}function bt(e,t,n){return e===`grid`&&typeof(t?.rows??n)==`number`}var xt=`rz-version-banner-r1`,St={en:{update:(e,t)=>`${e} ${t} is installed. Reload the page to finish the update.`,reload:`Reload`,reloading:`Reloading…`,stuck:`The old card is still in the cache. Clear the site data for Home Assistant in your browser, or reset the frontend cache in the app settings.`,hide:`Hide`},de:{update:(e,t)=>`${e} ${t} ist installiert. Lade die Seite neu, um das Update abzuschließen.`,reload:`Neu laden`,reloading:`Wird neu geladen…`,stuck:`Die alte Karte liegt noch im Cache. Lösche im Browser die Websitedaten für Home Assistant oder setze in den App-Einstellungen den Frontend-Cache zurück.`,hide:`Ausblenden`}},Ct=`M21,10.12H14.22L16.96,7.3C14.23,4.6 9.81,4.5 7.08,7.2C4.35,9.91 4.35,14.28 7.08,17C9.81,19.7 14.23,19.7 16.96,17C18.32,15.65 19,14.08 19,12.1H21C21,14.08 20.12,16.65 18.36,18.39C14.85,21.87 9.15,21.87 5.64,18.39C2.14,14.92 2.11,9.28 5.62,5.81C9.13,2.34 14.76,2.34 18.27,5.81L21,3V10.12M12.5,8V12.25L16,14.33L15.28,15.54L11,13V8H12.5Z`,wt=`M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z`,Tt=/* @__PURE__ */ new Set,z=/* @__PURE__ */ new WeakMap,Et=/* @__PURE__ */ new WeakMap,B=/* @__PURE__ */ new WeakMap,Dt=/* @__PURE__ */ new WeakSet,Ot=/* @__PURE__ */ new Set,kt=/* @__PURE__ */ new Set,At=/* @__PURE__ */ new Set,jt={},Mt=`rz-version-banner:`;function Nt(e){for(let t of Tt)t(e)}function Pt(e,t){let n=e.get(t);return n||(n=/* @__PURE__ */ new Map,e.set(t,n)),n}async function Ft(e,t){let n=e.callWS;if(typeof n!=`function`)return null;try{let r=(await n.call(e,{type:t}))?.version;return typeof r==`string`&&r!==``?r:null}catch{return null}}function It(e,t,n){let r=Pt(Et,t),i=B.get(t)??0;r.get(n)!==i&&(r.set(n,i),Ft(e,n).then(e=>{(B.get(t)??0)===i&&(r.delete(n),Pt(z,t).set(n,e),Nt({kind:`answer`,key:t,type:n}))}))}function Lt(e){if(Dt.has(e))return;Dt.add(e);let t=e.addEventListener;typeof t==`function`&&t.call(e,`ready`,()=>{B.set(e,(B.get(e)??0)+1),z.get(e)?.clear(),Nt({kind:`reconnect`,key:e})})}function Rt(e,t){try{return window.sessionStorage.getItem(`${Mt}${e}:${t}`)===`1`}catch{return!1}}function zt(e,t){try{window.sessionStorage.setItem(`${Mt}${e}:${t}`,`1`)}catch{}}function Bt(e){try{let t=window.sessionStorage;for(let n=t.length-1;n>=0;--n){let r=t.key(n);r?.startsWith(Mt)&&r.includes(`:${e}@`)&&t.removeItem(r)}}catch{}}async function Vt(){let e=(async()=>{let e=globalThis.caches;if(!e)return;let t=await e.keys();await Promise.all(t.map(t=>e.delete(t)))})().catch(()=>void 0);await Promise.race([e,new Promise(e=>setTimeout(e,2e3))]),window.location.reload()}function Ht(e){return(e?.locale?.language??e?.language??``).toLowerCase().startsWith(`de`)?`de`:`en`}var Ut=class extends P{static{this.properties={domain:{attribute:!1},version:{attribute:!1},name:{attribute:!1},_answer:{state:!0},_busy:{state:!0},_lang:{state:!0}}}constructor(){super(),this._type=``,this._stage=null,this._id=``,this._speaks=``,this._onSignal=e=>{e.kind===`hide`?e.type===this._type&&this.requestUpdate():e.key===this._key&&(e.kind===`reconnect`?this._hass&&It(this._hass,e.key,this._type):e.type===this._type&&(this._answer=z.get(e.key)?.get(e.type)??null))},this._onReload=()=>{!this._busy&&this._id&&(this._busy=!0,kt.add(this._id),zt(`reload`,this._id),Vt())},this._onHide=()=>{this._id&&(At.add(this._id),zt(`hide`,this._id),Nt({kind:`hide`,type:this._type}))},this.domain=``,this.version=``,this.name=``,this._answer=null,this._busy=!1,this._lang=`en`}get hass(){return this._hass}set hass(e){this._hass=e;let t=Ht(e);t!==this._lang&&(this._lang=t),this._sync()}connectedCallback(){super.connectedCallback(),Tt.add(this._onSignal),this._sync()}disconnectedCallback(){super.disconnectedCallback(),Tt.delete(this._onSignal),this._key=void 0}_sync(){let e=this._hass;if(!e||!this.domain||!this.isConnected)return;let t=e.connection,n=typeof t==`object`&&t?t:jt,r=`${this.domain}/card_version`;if(n===this._key&&r===this._type)return;this._key=n,this._type=r,Lt(n);let i=z.get(n)?.get(r);i===void 0?It(e,n,r):this._answer=i}willUpdate(e){e.has(`domain`)&&this._sync();let t=this._answer;e.has(`_answer`)&&t===this.version&&Bt(this._type),this._stage=this._computeStage(),this._id=this._stage&&t?`${this._type}@${t}`:``;let n=`${this._id}:${this._stage??``}`;this._id&&this._speaks!==n&&!Ot.has(n)&&(Ot.add(n),this._speaks=n),this.hidden=this._stage===null}_computeStage(){let e=this._answer;if(!e||!this._type||e===this.version)return null;let t=`${this._type}@${e}`;return At.has(t)||Rt(`hide`,t)?null:!kt.has(t)&&Rt(`reload`,t)?`stuck`:`update`}render(){let e=this._answer;if(!this._stage||!e)return A;let t=St[this._lang],n=this._stage===`stuck`,r=t.reload;n?r=t.hide:this._busy&&(r=t.reloading);let i=this._speaks===`${this._id}:${this._stage}`?`alert`:A;return O`<div class=${n?`banner stuck`:`banner`} lang=${this._lang}>
      <div class="body">
        <svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d=${n?wt:Ct}></path>
        </svg>
        <p class="message" role=${i}>${n?t.stuck:t.update(this.name,e)}</p>
      </div>
      <button
        class="action"
        type="button"
        aria-disabled=${this._busy?`true`:A}
        @click=${n?this._onHide:this._onReload}
      >${r}</button>
    </div>`}static{this.styles=c`
    :host {
      display: block;
      container: rz-version-banner / inline-size;
    }
    :host([hidden]) {
      display: none;
    }
    .banner {
      --rz-vb-tint: color-mix(in srgb, var(--warning-color, #ffa600) 14%, transparent);
      --rz-vb-mark: color-mix(
        in srgb,
        var(--warning-color, #ffa600) 50%,
        var(--primary-text-color, #212121)
      );
      display: grid;
      grid-template-columns: var(--rz-vb-columns, minmax(0, 1fr) auto);
      align-items: center;
      gap: var(--ha-space-2, 8px) var(--ha-space-3, 12px);
      margin: var(--rz-vb-margin, var(--ha-space-2, 8px));
      padding: var(--rz-vb-padding, var(--ha-space-2, 8px) var(--ha-space-2, 8px) var(--ha-space-2, 8px) var(--ha-space-3, 12px));
      border: 1px solid transparent;
      border-radius: max(4px, calc(var(--ha-card-border-radius, 12px) - var(--ha-space-2, 8px)));
      background-color: var(--card-background-color, #fff);
      background-image: linear-gradient(var(--rz-vb-tint), var(--rz-vb-tint));
      color: var(--primary-text-color, #212121);
      font-size: var(--ha-font-size-m, 14px);
      line-height: 1.43;
    }
    .body {
      display: flex;
      align-items: flex-start;
      gap: var(--ha-space-3, 12px);
      min-inline-size: 0;
    }
    .icon {
      flex: none;
      inline-size: 24px;
      block-size: 24px;
      margin-block: -2px;
      display: var(--rz-vb-icon, block);
      color: var(--rz-vb-mark);
      fill: currentColor;
    }
    .message {
      margin: 0;
      min-inline-size: 0;
      overflow-wrap: break-word;
      hyphens: var(--rz-vb-hyphens, manual);
      text-wrap: pretty;
    }
    .action {
      justify-self: var(--rz-vb-action-align, end);
      min-block-size: 40px;
      margin-inline-start: var(--rz-vb-action-indent, 0);
      padding: var(--rz-vb-action-padding, 0 var(--ha-space-4, 16px));
      border: 1px solid currentColor;
      border-radius: var(--ha-border-radius-pill, 9999px);
      background: transparent;
      color: inherit;
      font: inherit;
      font-weight: var(--ha-font-weight-medium, 500);
      white-space: var(--rz-vb-action-wrap, nowrap);
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }
    .action:hover {
      background: color-mix(in srgb, currentColor 8%, transparent);
    }
    .action:active {
      background: color-mix(in srgb, currentColor 16%, transparent);
    }
    .action[aria-disabled="true"] {
      cursor: progress;
    }
    .action:focus-visible {
      outline: 2px solid currentColor;
      outline-offset: 2px;
    }
    @container rz-version-banner (inline-size < 400px) {
      .stuck {
        --rz-vb-columns: minmax(0, 1fr);
        --rz-vb-action-align: start;
        --rz-vb-action-indent: calc(24px + var(--ha-space-3, 12px));
      }
    }
    @container rz-version-banner (inline-size < 340px) {
      .banner {
        --rz-vb-columns: minmax(0, 1fr);
        --rz-vb-action-align: start;
        --rz-vb-action-indent: calc(24px + var(--ha-space-3, 12px));
      }
    }
    @container rz-version-banner (inline-size < 180px) {
      .banner {
        --rz-vb-margin: var(--ha-space-1, 4px);
        --rz-vb-padding: var(--ha-space-2, 8px);
        --rz-vb-icon: none;
        --rz-vb-hyphens: auto;
        --rz-vb-action-align: stretch;
        --rz-vb-action-indent: 0px;
        --rz-vb-action-padding: 0 var(--ha-space-2, 8px);
        --rz-vb-action-wrap: normal;
      }
    }
    @media (forced-colors: active) {
      .icon {
        color: CanvasText;
      }
    }
  `}};customElements.get(xt)||customElements.define(xt,Ut);function Wt(e,t){return t.preview||!e?A:O`<rz-version-banner-r1
    .hass=${e}
    .domain=${t.domain}
    .version=${t.version}
    .name=${t.name}
  ></rz-version-banner-r1>`}var Gt=c`
  .footer {
    display: flex;
    /* Below about 150 px the logo and the attribution don't fit one row. */
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 4px 12px;
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
  }
`,Kt=c`
  .unreachable-title {
    color: var(--primary-text-color);
    font-size: 1rem;
    font-weight: 500;
  }
  .unreachable-detail {
    margin-block-start: 4px;
  }
`,qt=c`
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
`,Jt=c`
  :host {
    display: block;
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

    /* The same colours as words and as small marks. HA's own values are
       made for fills: as text on a stock light card the warning amber
       measures 2.0:1, the success green 3.3:1, the info blue 3.1:1, the
       error red 4.3:1 and the primary blue 2.6:1, all short of the 4.5:1
       text needs. Mixed with the body text colour they keep their hue,
       darken on a light theme and lighten on a dark one. --lade-muted-text
       is the quiet grey for a tinted surface (a chip, a slot, a pinned
       row), where the theme's secondary colour drops below 4.5:1. Fills
       and tints keep the plain tokens. Measured in both stock themes with
       the card mounted; the lowest is 4.6:1. */
    --lade-rt-text:      color-mix(in srgb, var(--lade-rt) 60%, var(--primary-text-color));
    --lade-warning-text: color-mix(in srgb, var(--lade-warning) 40%, var(--primary-text-color));
    --lade-error-text:   color-mix(in srgb, var(--lade-error) 70%, var(--primary-text-color));
    --lade-info-text:    color-mix(in srgb, var(--lade-info) 60%, var(--primary-text-color));
    --lade-accent-text:  color-mix(in srgb, var(--primary-color) 50%, var(--primary-text-color));
    --lade-muted-text:   color-mix(in srgb, var(--secondary-text-color) 70%, var(--primary-text-color));
    /* Amber for what needs 3:1, not 4.5:1: the big kW figure and the
       status dots. 3.5:1 on a light card, and still plainly amber. */
    --lade-warning-mark: color-mix(in srgb, var(--lade-warning) 70%, var(--primary-text-color));

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
  }
  ha-card {
    overflow: hidden;
    border-radius: var(--lade-radius-lg);
  }
  /* Fill the grid cell the dashboard hands us. A sections view puts a fixed
     pixel height on the cell WRAPPER when rows is numeric -- which the user
     also causes by dragging the row handle -- and styles nothing inside it.
     Because :host is display: block, it is ha-card's containing block, so
     the two declarations only work as a pair: without the host's, ha-card's
     100% computes to auto and the card renders at content height on top of
     the card beneath it.
     Gated on the layout HA sets on the card ("grid" in a sections view and
     its edit dialog, "panel" in a panel view), the way Mushroom and HA's tile
     card gate it. The add-card picker sets none and centres each preview in
     a tile as tall as the tallest preview in its row; an ungated 100%
     resolves against that tile and stretches the card down to it. */
  :host([layout="grid"]),
  :host([layout="panel"]) {
    block-size: 100%;
  }
  :host([layout="grid"]) ha-card,
  :host([layout="panel"]) ha-card {
    block-size: 100%;
  }
  /* A sections cell with a set number of rows has a fixed height
     (ha-card.fixed-height, from _fixedHeight in the card). There the
     stations, or the lot, scroll inside .wrap while the footer stays put,
     instead of being cut off at the bottom of the cell. Only there: a
     scroll container clips focus rings at its edges, so .wrap stays a
     plain block at natural height. */
  ha-card.fixed-height {
    display: flex;
    flex-direction: column;
  }
  ha-card.fixed-height .card-content {
    flex: 1 1 auto;
    min-block-size: 0;
    display: flex;
    flex-direction: column;
  }
  ha-card.fixed-height .wrap {
    flex: 1 1 auto;
    /* min-block-size: 0 is what lets a flex child shrink below its
       content; without it overflow-y never engages. */
    min-block-size: 0;
    overflow-y: auto;
    /* Room for the focus ring of whatever Tab scrolls into view (2 px at
       an offset of up to 3 px); without it the scroller's edge cuts the
       ring of a control that lands flush with it. */
    scroll-padding-block: 6px;
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
    color: var(--lade-accent-text);
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }
  .chip ha-icon {
    --mdc-icon-size: 14px;
  }
  .chip.muted {
    background: color-mix(in srgb, var(--secondary-text-color) 12%, transparent);
    color: var(--lade-muted-text);
  }
  .chip.pin {
    background: color-mix(in srgb, var(--primary-color) 18%, transparent);
    color: var(--lade-accent-text);
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
    line-height: 1.2;
    background: color-mix(in srgb, var(--secondary-text-color) 12%, transparent);
    color: var(--lade-muted-text);
    font-variant-numeric: tabular-nums;
    /* The tracker flag carries an entity id, which has no space to wrap
       at and is often wider than a six-column cell. */
    max-width: 100%;
    box-sizing: border-box;
  }
  .flag span {
    min-width: 0;
    overflow-wrap: anywhere;
  }
  .flag ha-icon {
    --mdc-icon-size: 14px;
    flex-shrink: 0;
  }
  .flag.ok {
    background: color-mix(in srgb, var(--lade-rt) 16%, transparent);
    color: var(--lade-rt-text);
  }
  .flag.warn {
    background: color-mix(in srgb, var(--lade-warning) 16%, transparent);
    color: var(--lade-warning-text);
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
  .station:focus-within {
    background: color-mix(in srgb, var(--primary-color) 5%, transparent);
  }
  .station.is-pinned {
    background: color-mix(in srgb, var(--primary-color) 4%, transparent);
  }
  .station.is-pinned:hover,
  .station.is-pinned:focus-within {
    background: color-mix(in srgb, var(--primary-color) 8%, transparent);
  }
  /* An inactive or closed station is greyed through its text colours,
     not by fading the row: at 65 % opacity nothing in it reaches 4.5:1. */
  .station.is-inactive .metric-kw,
  .station.is-inactive .metric-kw.dc,
  .station.is-inactive .metric-kw.dc .kw-unit,
  .station.is-inactive .metric-price,
  .station.is-inactive .metric-price.free {
    color: var(--lade-muted-text);
  }

  .station-body {
    position: relative;
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
  /* Transparent disclosure trigger stretched across the row. It is
     absolutely positioned and therefore out of the flex flow, so the
     dot / main / actions layout is unchanged. */
  .station-trigger {
    position: absolute;
    inset: 0;
    appearance: none;
    border: 0;
    margin: 0;
    padding: 0;
    background: none;
    cursor: pointer;
  }
  /* Raise only the maps link above the overlay. Both are positioned and
     the link comes later in the DOM, so it wins without a z-index. The
     chevron is left unpositioned on purpose: it stays under the overlay
     so clicking the expand affordance expands the row. */
  .station-actions .icon-action {
    position: relative;
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
     amber: the figure is large text, the unit is not. */
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
    color: var(--lade-warning-mark);
  }
  .metric-kw.dc .kw-unit {
    color: var(--lade-warning-text);
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
    color: var(--lade-rt-text);
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
    /* Plain amber is 2.0:1 on a light card, and a mark needs 3:1. */
    color: var(--lade-warning-mark);
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
    border: 1.5px solid var(--secondary-text-color);
  }
  .status-dot.status-unknown {
    color: transparent;
    background: transparent;
    border: 1.5px dashed var(--secondary-text-color);
  }

  /* ── Orphan-pin row ──────────────────────────────────────────────── */
  .station.is-orphan {
    cursor: default;
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
    color: var(--lade-muted-text);
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
    color: var(--lade-muted-text);
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .rack-overlay-icon {
    --mdc-icon-size: 28px;
  }
  /* The icon is all a special-state slot shows, so it takes the text
     tones: on its own tint the plain colour is under 3:1. */
  .rack-overlay-icon.tone-warning {
    color: var(--lade-warning-text);
  }
  .rack-overlay-icon.tone-error {
    color: var(--lade-error-text);
  }
  .rack-overlay-icon.tone-info {
    color: var(--lade-info-text);
  }
  .rack-overlay-icon.tone-muted {
    color: var(--secondary-text-color);
  }
  /* bgTint overrides: PLANNED reads as future-info, REMOVED as error.
     OUT_OF_STOCK reuses the existing warn tint (no override needed). */
  .rack-slot.slot-tint-info {
    background: color-mix(in srgb, var(--lade-info) 14%, transparent);
    box-shadow:
      inset 0 0 0 1px color-mix(in srgb, var(--lade-info) 30%, transparent),
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
    background: var(--lade-warning-mark);
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
    color: var(--lade-warning-text);
  }
  .power-badge[data-type="ac"] {
    color: var(--lade-muted-text);
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
    /* .station-loc never shrinks, so beside it the name is squeezed to a
       character per line. Give the name the full row and put the
       location under it, where it may wrap: "9220 Velden am Wörther See
       · 1,84 km" is wider than a six-column cell. */
    .row-secondary {
      flex-wrap: wrap;
    }
    .station-name {
      flex-basis: 100%;
    }
    .station-loc {
      flex-shrink: 1;
      min-width: 0;
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
  /* Half a section on a phone is about 175 px. The row can't hold the
     map pin there (the open row has "In Karte öffnen"), and a chip
     longer than the card has to wrap its text. */
  @container lscard (inline-size < 240px) {
    .station-actions .icon-action {
      display: none;
    }
    .chip-row {
      max-width: 100%;
    }
    .chip {
      min-width: 0;
      white-space: normal;
      line-height: 1.2;
    }
    .title,
    .subtitle {
      white-space: normal;
      overflow-wrap: anywhere;
    }
  }
  @container lscard (inline-size > 480px) {
    .metric-num {
      font-size: 2.5rem;
    }
    .icon-tile {
      --mdc-icon-size: 24px;
    }
  }

  /* ── Accessibility primitives ────────────────────────────────────── */
  /* Focus ring (WCAG 2.4.7 AA; the 2px/3:1 ring also meets 2.4.13 AAA). */
  .station-trigger:focus-visible,
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
  /* The trigger spans the whole row, so an outset ring would collide
     with the neighbouring row's divider. Inset it instead. */
  .station-trigger:focus-visible {
    outline-offset: -2px;
  }

  /* Forced-colors fallback (Windows High Contrast). */
  @media (forced-colors: active) {
    .station-trigger:focus-visible,
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
`,Yt=[qt,c`
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
  /* One group per part of the card (ha-expansion-panel). Its body is a
     column of forms and hand-written fields, split by the hr rules. */
  .panel-body {
    padding: 4px 0 8px;
    display: flex;
    flex-direction: column;
    gap: var(--ha-space-3, 12px);
  }
  hr {
    margin: 0;
    border: 0;
    border-top: 1px solid var(--divider-color);
    inline-size: 100%;
  }
  /* A hand-written field: label, control, then the helper below it, the
     way ha-form lays out its own. */
  .field {
    display: flex;
    flex-direction: column;
    gap: var(--ha-space-2, 8px);
  }
  .field-label {
    font-size: var(--ha-font-size-m, 14px);
    font-weight: 500;
    color: var(--primary-text-color);
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
    gap: 8px;
  }
  /* 40px, not 44px: WCAG 2.5.8 AA is satisfied outright, and the house
     rule's dense-row carve-out applies because the 8px gap keeps every
     neighbouring target more than 4px away. 44px chips in a wrapped
     three-row filter block read as buttons, not chips. */
  .filter-chip {
    appearance: none;
    display: inline-flex;
    align-items: center;
    min-height: 40px;
    border: 1px solid var(--divider-color);
    border-radius: 999px;
    background: var(--ha-card-background, var(--card-background-color));
    color: var(--primary-text-color);
    padding: 4px 14px;
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
    min-height: 44px;
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
  .pin-row:hover {
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
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
  /* The "nothing to pick yet" hints. In italics, not faded: at 70 %
     opacity the secondary grey falls to about 3:1. */
  .editor-hint--muted {
    font-style: italic;
  }
  /* Same treatment as the card's orphan ids. Declared again here because
     cardOwnStyles is a separate shadow scope the editors never load. */
  .orphan-id {
    font-family: ui-monospace, "SF Mono", Menlo, Monaco, Consolas, monospace;
    font-size: 0.6875rem;
    color: var(--secondary-text-color);
    letter-spacing: 0;
    overflow-wrap: anywhere;
  }

  /* Each filter dimension (connector / payment / amenity) is its own
     labelled group: label, chips, then the helper saying how it combines. */
  .chip-group {
    display: flex;
    flex-direction: column;
    gap: var(--ha-space-2, 8px);
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
    min-height: 44px;
    gap: 8px;
    padding: 6px 14px;
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
     descendant and paints the ring on the visible chip. The ring uses
     --primary-color, not --swatch-color: the swatch colour is whatever
     the user picked, so it can land at any contrast against the editor
     background and cannot be relied on to meet WCAG 1.4.11's 3:1. */
  .color-swatch:focus-within {
    outline: 2px solid var(--primary-color);
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

  /* ── Accessibility primitives ────────────────────────────────────── */
  /* Focus ring (WCAG 2.4.7 AA; the 2px/3:1 ring also meets 2.4.13 AAA).
     No border-radius here, unlike cardStyles: outline already follows
     each control's own radius, and forcing 6px would square off the
     pill-shaped chips on focus. */
  .filter-chip:focus-visible,
  .pin-row:focus-visible,
  a:focus-visible,
  button:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }

  /* Forced-colors fallback (Windows High Contrast). */
  @media (forced-colors: active) {
    .filter-chip:focus-visible,
    .pin-row:focus-visible,
    .color-swatch:focus-within,
    a:focus-visible,
    button:focus-visible {
      outline-color: CanvasText;
    }
    .filter-chip,
    .color-swatch {
      forced-color-adjust: none;
    }
  }
`],Xt=c`
  :host {
    display: block;
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

    /* The same colours as words, mixed with the body text colour so they
       reach 4.5:1 (see the note in the main cardStyles :host block). The
       shares are lower than the list card's because the slots' tints are
       stronger (22 %). The textured asphalt declares them again for its
       own light text. */
    --lade-rt-text:      color-mix(in srgb, var(--lade-rt) 50%, var(--primary-text-color));
    --lade-warning-text: color-mix(in srgb, var(--lade-warning) 40%, var(--primary-text-color));
    --lade-error-text:   color-mix(in srgb, var(--lade-error) 50%, var(--primary-text-color));
    --lade-info-text:    color-mix(in srgb, var(--lade-info) 50%, var(--primary-text-color));
    --lade-accent-text:  color-mix(in srgb, var(--primary-color) 50%, var(--primary-text-color));
    --lade-muted-text:   color-mix(in srgb, var(--secondary-text-color) 50%, var(--primary-text-color));

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

    /* Parking surface tokens. --lade-paint-width is only the fallback:
       parking-card.ts always sets data-paint-width on .wrap, and the
       appearance presets below map it to a width. --lade-paint is fixed. */
    --lade-paint: rgba(255, 255, 255, 0.92);
    --lade-paint-width: 3px;

    /* Asphalt base colour for the textured preset. The grain is an
       inline SVG fractalNoise (baseFrequency 1.2, numOctaves 3,
       stitchTiles so the 200×200 tile repeats seamlessly) on a rect at
       0.3 opacity, with no visible tile grid the way layered
       radial-gradients have; see the CSS-Tricks "grainy gradients"
       recipe. */
    --lade-asphalt-color: #3a3d42;
    /* (Asphalt noise URL is inlined in each .parking-slot rule below
       rather than stored on this var — Lit's static styles + CSS
       custom-property var() substitution into background-image with
       a base64 data URI did not resolve in our testing, even though
       the same URL inlined directly works. We accept the duplication
       to keep the noise visible.) */
  }
  ha-card {
    overflow: hidden;
    border-radius: var(--lade-radius-lg);
  }
  /* Fill the grid cell the dashboard hands us. A sections view puts a fixed
     pixel height on the cell WRAPPER when rows is numeric -- which the user
     also causes by dragging the row handle -- and styles nothing inside it.
     Because :host is display: block, it is ha-card's containing block, so
     the two declarations only work as a pair: without the host's, ha-card's
     100% computes to auto and the card renders at content height on top of
     the card beneath it.
     Gated on the layout HA sets on the card ("grid" in a sections view and
     its edit dialog, "panel" in a panel view), the way Mushroom and HA's tile
     card gate it. The add-card picker sets none and centres each preview in
     a tile as tall as the tallest preview in its row; an ungated 100%
     resolves against that tile and stretches the card down to it. */
  :host([layout="grid"]),
  :host([layout="panel"]) {
    block-size: 100%;
  }
  :host([layout="grid"]) ha-card,
  :host([layout="panel"]) ha-card {
    block-size: 100%;
  }
  /* A sections cell with a set number of rows has a fixed height
     (ha-card.fixed-height, from _fixedHeight in the card). There the
     stations, or the lot, scroll inside .wrap while the footer stays put,
     instead of being cut off at the bottom of the cell. Only there: a
     scroll container clips focus rings at its edges, so .wrap stays a
     plain block at natural height. */
  ha-card.fixed-height {
    display: flex;
    flex-direction: column;
  }
  ha-card.fixed-height .card-content {
    flex: 1 1 auto;
    min-block-size: 0;
    display: flex;
    flex-direction: column;
  }
  ha-card.fixed-height .wrap {
    flex: 1 1 auto;
    /* min-block-size: 0 is what lets a flex child shrink below its
       content; without it overflow-y never engages. */
    min-block-size: 0;
    overflow-y: auto;
    /* Room for the focus ring of whatever Tab scrolls into view (2 px at
       an offset of up to 3 px); without it the scroller's edge cuts the
       ring of a control that lands flush with it. */
    scroll-padding-block: 6px;
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


  /* ── Card header (icon-tile + title group) ────────────────────────── */
  /* The header wraps: beside a long station name a six-column cell has
     no room for the counter and the map pin, so they move to a second
     row and the name keeps the first. */
  .header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 4px 12px;
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
    /* The basis is the room a name needs before the row is worth sharing. */
    flex: 1 1 140px;
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
    /* Up to two lines: the station name is what the card is about. */
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    overflow: hidden;
    overflow-wrap: anywhere;
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

  /* Map pin: opens the station in the maps app, the same link the list
     card's rows carry. A 44 px round target (the house floor outside
     dense rows) at the header's end, under the thumb on a phone. The
     block margins keep the header's height. No inline overshoot: in a
     fixed-height cell .wrap scrolls, and a pin reaching past it would
     scroll sideways. */
  .map-link {
    flex-shrink: 0;
    width: 44px;
    height: 44px;
    margin-block: -2px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    color: var(--secondary-text-color);
    text-decoration: none;
    --mdc-icon-size: 22px;
    transition:
      background-color var(--ha-animation-duration-fast, 150ms) ease,
      color var(--ha-animation-duration-fast, 150ms) ease;
  }
  .map-link:hover,
  .map-link:focus-visible {
    background: color-mix(in srgb, var(--primary-color) 12%, transparent);
    color: var(--primary-color);
  }
  /* Undo the shared a:focus-visible 6px radius, which outranks .map-link. */
  .map-link:focus-visible {
    border-radius: 50%;
  }

  /* ── Header count (avail / total free, right-aligned) ─────────────── */
  /* Sits in the header row alongside the icon-tile + title. Compact
     stack: big tabular number + " / total" suffix on top, UPPERCASE
     "free" label below. Pinned right via margin-left:auto. Number
     turns success-green when at least one slot is free so the
     glance-read is instant. */
  .header-count {
    position: relative;
    margin-left: auto;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 2px;
    font-variant-numeric: tabular-nums;
  }
  /* The counter's sentence for a screen reader; the figures beside it are
     aria-hidden. */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
    border: 0;
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
     between them. A slot with a car or an icon over its spec is a
     button (pressing it shows the spec), reset to look like the plain
     div the other slots are. */
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
    color: var(--lade-warning-text);
  }
  .slot-power-badge[data-type="ac"] {
    color: var(--lade-muted-text);
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
    color: var(--lade-muted-text);
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
    color: var(--lade-rt-text);
  }
  .slot-status-busy {
    color: var(--lade-error-text);
  }
  .slot-status-warn {
    color: var(--lade-warning-text);
  }
  .slot-status-unknown {
    color: var(--lade-muted-text);
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
  /* The icon is all such a slot shows until it is revealed, so it takes
     the text tones: on its own tint the plain colour is under 3:1. */
  .slot-overlay-icon.tone-warning {
    color: var(--lade-warning-text);
  }
  .slot-overlay-icon.tone-error {
    color: var(--lade-error-text);
  }
  .slot-overlay-icon.tone-info {
    color: var(--lade-info-text);
  }
  .slot-overlay-icon.tone-muted {
    color: var(--lade-muted-text);
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

  /* Spots that don't fit the plug and power filter are painted as a
     no-parking hatch (Sperrfläche): diagonal stripes in the lane-line
     paint, as wide as the lines, so the paint_width preset carries over.
     On a pseudo-element, not the background, so it lies on top of both
     asphalt styles without fighting the textured rules' specificity.
     The spec sits on a clear patch in the middle, cut down to power and
     plug, which say why the spot is out; its status doesn't matter to
     this driver (the aria-label still carries it). */
  .parking-slot.is-unmatched {
    --lade-hatch-patch: color-mix(
      in srgb,
      var(--primary-text-color) 14%,
      var(--ha-card-background, var(--card-background-color, #fff))
    );
  }
  .wrap[data-asphalt-style="textured"] .parking-slot.is-unmatched {
    --lade-hatch-patch: var(--lade-asphalt-color);
  }
  .parking-slot.is-unmatched::after {
    content: "";
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      -45deg,
      color-mix(in srgb, var(--lade-paint, #fff) 45%, transparent) 0
        var(--lade-paint-width, 3px),
      transparent var(--lade-paint-width, 3px) 12px
    );
    pointer-events: none;
  }
  .parking-slot.is-unmatched .slot-inner {
    position: relative;
    z-index: 1;
    align-self: center;
    width: auto;
    max-width: 100%;
    box-sizing: border-box;
    padding: 4px 8px;
    border-radius: var(--lade-radius-sm);
    background: var(--lade-hatch-patch);
  }
  .parking-slot.is-unmatched .slot-power-badge,
  .parking-slot.is-unmatched .slot-status-word {
    display: none;
  }
  .parking-slot.is-unmatched .slot-kw {
    color: var(--lade-muted-text);
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
     the base status rules at (0,2,0). The grain is the SVG data URI
     inlined in each rule (see the note under --lade-asphalt-color). */
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
  /* Textured asphalt is dark whatever the theme (its editor tile shows
     it so), so the lot's text takes light tones on it: in a light theme
     the theme's dark text would vanish into the asphalt. On the bare
     asphalt #cdd2d7 is 7.2:1 and #eceff1 9.4:1; on the 22 % status
     tints #cdd2d7 stays at 5.0:1 or more (the green is the lowest). */
  .wrap[data-asphalt-style="textured"] .parking-lot {
    --primary-text-color: #eceff1;
    --secondary-text-color: #cdd2d7;
    /* Mixed again here: the ones on :host were computed with the theme's
       text colour, which is dark in a light theme. */
    --lade-rt-text:      color-mix(in srgb, var(--lade-rt) 40%, #eceff1);
    --lade-warning-text: color-mix(in srgb, var(--lade-warning) 40%, #eceff1);
    --lade-error-text:   color-mix(in srgb, var(--lade-error) 50%, #eceff1);
    --lade-info-text:    color-mix(in srgb, var(--lade-info) 50%, #eceff1);
    --lade-muted-text:   #cdd2d7;
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
    /* No mix-blend-mode here — soft-light/overlay both dragged the
       white toward grey unevenly across icons (the inner ha-icon
       drop-shadow filter establishes a stacking context that made
       blend application inconsistent). Pure white reads more
       cleanly as paint; the painted-on feel comes from the visible
       grain AROUND the icons. */
    color: rgba(255, 255, 255, 0.95);
  }

  /* ── Responsive density tiers (container queries) ─────────────────── */
  /* Below about five columns the header can't hold the tile, a title,
     the counter and the map pin in one row. The tile is decorative, so
     it goes and the title keeps the room. */
  @container plcard (inline-size < 240px) {
    .icon-tile {
      display: none;
    }
  }
  @container plcard (inline-size < 360px) {
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
  /* The slots tile the lot edge to edge and .parking-lot clips to its
     rounded corners, so a ring outside the slot is cut off. Draw it
     inside instead. */
  .parking-slot:focus-visible {
    outline-offset: -4px;
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
    /* Forced colours drop gradient backgrounds, which would erase the
       hatch. Opt the pseudo-element out and draw the stripes in
       GrayText so a spot that doesn't fit still reads as one. */
    .parking-slot.is-unmatched::after {
      forced-color-adjust: none;
      background: repeating-linear-gradient(-45deg, GrayText 0 2px, transparent 2px 12px);
    }
  }
  /* prefers-reduced-motion catch-all lives in sharedReducedMotion. */
`,Zt=[Kt,Gt,qt,Jt],Qt=[Kt,Gt,qt,Xt];function $t(e){let t=e.electricityType??[];return t.some(e=>e===`DC`||e?.startsWith(`DC`))?`dc`:t.some(e=>e?.startsWith(`AC`))?`ac`:null}function V(e){return(e??``).toUpperCase().replace(/_/g,``)}function en(e){let t=V(e);return t===`AVAILABLE`?`ok`:t===`CHARGING`||t===`OCCUPIED`||t===`RESERVED`||t===`BLOCKED`?`busy`:t===`OUTOFORDER`||t===`FAULTED`||t===`INOPERATIVE`||t===`UNAVAILABLE`?`warn`:t===`UNKNOWN`?`unknown`:`empty`}function tn(e){if(!e)return``;let t=V(e),n={AVAILABLE:`available`,CHARGING:`charging`,OCCUPIED:`occupied`,RESERVED:`reserved`,BLOCKED:`blocked`,OUTOFORDER:`out_of_order`,FAULTED:`faulted`,INOPERATIVE:`inoperative`,UNAVAILABLE:`unavailable`,OUTOFSTOCK:`out_of_stock`,PLANNED:`planned`,REMOVED:`removed`,UNKNOWN:`unknown`},r=R(`card.point_status_unknown`),i=n[t];if(!i)return r;let a=`card.point_status_${i}`,o=R(a);return o===a?r:o}function nn(e){return{AVAILABLE:`free`,CHARGING:`busy`,OCCUPIED:`busy`,RESERVED:`reserved`,BLOCKED:`blocked`,OUTOFORDER:`out_of_order`,FAULTED:`faulted`,INOPERATIVE:`inoperative`,UNAVAILABLE:`unavailable`,OUTOFSTOCK:`out_of_stock`,PLANNED:`planned`,REMOVED:`removed`,UNKNOWN:`unknown`}[V(e)]??`unknown`}function rn(e){switch(V(e)){case`OUTOFORDER`:case`FAULTED`:case`INOPERATIVE`:case`UNAVAILABLE`:return{icon:`mdi:wrench`,tone:`warning`};case`OUTOFSTOCK`:return{icon:`mdi:battery-off-outline`,tone:`warning`,bgTint:`warning`};case`PLANNED`:return{icon:`mdi:progress-wrench`,tone:`info`,bgTint:`info`};case`REMOVED`:return{icon:`mdi:close-circle-outline`,tone:`error`,bgTint:`error`};case`UNKNOWN`:return{icon:`mdi:help-circle-outline`,tone:`muted`};default:return null}}function an(e){let t=en(e.status),n=rn(e.status);return{bucket:t,isAvailable:t===`ok`,isBusy:t===`busy`,isWarn:t===`warn`,overlay:n,showCar:t===`busy`&&n===null,showOverlayIcon:n!==null}}function H(e){if(e==null||!Number.isFinite(e))return`–`;try{return new Intl.NumberFormat(`de-AT`,{minimumFractionDigits:0,maximumFractionDigits:1}).format(e)}catch{return String(e).replace(`.`,`,`)}}function U(e){let t=typeof e==`number`?e:parseFloat(e??``);if(!Number.isFinite(t))return`–`;try{return new Intl.NumberFormat(`de-AT`,{minimumFractionDigits:2,maximumFractionDigits:2}).format(t)}catch{return t.toFixed(2)}}function W(e){let t=e/100;try{return new Intl.NumberFormat(`de-AT`,{minimumFractionDigits:2,maximumFractionDigits:2}).format(t)}catch{return t.toFixed(2)}}function on(e){if(!Number.isFinite(e))return`0`;try{return new Intl.NumberFormat(`de-AT`,{minimumFractionDigits:0,maximumFractionDigits:2}).format(e)}catch{return String(e).replace(`.`,`,`)}}function sn(e,t){switch(e){case`TYPE_2_AC`:return`Type 2`;case`COMBO2_CCS_DC`:return`CCS`;case`CHADEMO`:return`CHAdeMO`;case`TYPE_1_AC`:return`Type 1`;case`TESLA_S`:case`TESLA_R`:return`Tesla`;case`OTHER`:return t===`DOMESTIC_F`?`Schuko`:t?.startsWith(`CEE`)?`CEE`:t??`?`;default:return e?.replace(/_/g,` `)??t??`?`}}function cn(e){let t=(e.connectorType??[])[0];return t?sn(t.consumerName,t.key):`–`}function ln(e){return typeof e==`string`&&/^https?:\/\//i.test(e)?e:``}function un(e){switch(e){case`ok`:return`free`;case`busy`:return`busy`;case`warn`:return`warn`;default:return`unknown`}}function dn(e,t){let n=`parking.slot_status_${e}`,r=R(n);return r===n?t:r}function fn(e,t,n=!1){if(n)return`parking-slot is-unmatched`;let{isAvailable:r,isBusy:i,isWarn:a,overlay:o,showCar:s,showOverlayIcon:c}=e;return[`parking-slot`,r?`is-available`:i?`is-busy`:a?`is-warn`:`is-unknown`,s||c?`has-overlay`:``,s?`has-car`:``,c?`has-icon`:``,o?.bgTint?`slot-tint-${o.bgTint}`:``,t?`is-revealed`:``].filter(Boolean).join(` `)}function pn(e){return[e.powerType?e.powerType.toUpperCase():null,e.capacityKw?`${e.kwText} kW`:null,e.connector&&e.connector!==`–`?e.connector:null,e.statusLabel].filter(Boolean).join(` · `)}var mn={MONDAY:0,TUESDAY:1,WEDNESDAY:2,THURSDAY:3,FRIDAY:4,SATURDAY:5,SUNDAY:6},hn={Mon:0,Tue:1,Wed:2,Thu:3,Fri:4,Sat:5,Sun:6};function gn(e){return e===`CHARGING`||e===`OCCUPIED`||e===`RESERVED`||e===`BLOCKED`}function _n(e){return e===`OUTOFORDER`||e===`FAULTED`||e===`INOPERATIVE`||e===`UNAVAILABLE`}function vn(e,t){switch(t){case`green_energy`:return!!e.greenEnergy;case`austrian_ecolabel`:return!!e.austrianEcoLabel;case`free_parking`:return!!e.freeParking;case`roofed_parking`:return!!e.roofedParking;case`illuminated_parking`:return!!e.illuminatedParking;case`barrier_free`:return(e.barrierFreeParkingPlaces??0)>0;case`catering`:return!!e.cateringService;case`bathrooms`:return!!e.bathroomsAvailable;case`resting`:return!!e.restingFacilities;default:return!1}}function yn(e,t){try{let n=new Intl.DateTimeFormat(`en-US`,{timeZone:t,weekday:`short`,hour:`2-digit`,minute:`2-digit`,hour12:!1}).formatToParts(e),r=n.find(e=>e.type===`weekday`)?.value??``,i=n.find(e=>e.type===`hour`)?.value??``,a=n.find(e=>e.type===`minute`)?.value??``,o=hn[r];if(o===void 0)return null;let s=parseInt(i,10),c=parseInt(a,10);return!Number.isFinite(s)||!Number.isFinite(c)?null:(s===24&&(s=0),o*1440+s*60+c)}catch{return null}}function bn(e,t){let n=mn[(e??``).toUpperCase()];if(n===void 0)return null;let[r,i]=(t??``).split(`:`),a=parseInt(r??``,10),o=parseInt(i??``,10);return!Number.isFinite(a)||!Number.isFinite(o)?null:n*1440+a*60+o}function xn(e,t,n){if(!e||e.length===0)return null;let r=yn(t,n);if(r==null)return null;for(let t of e){let e=bn(t.fromWeekday,t.fromTime),n=bn(t.toWeekday,t.toTime);if(e!=null&&n!=null&&(e<=n?r>=e&&r<=n:r>=e||r<=n))return!0}return!1}function Sn(e,t,n,r=null){if(!t||r===!1)return`inactive`;let i=n.length;if(!e||i===0)return`unknown`;let a=0,o=0,s=0;for(let e of n){let t=V(e.status);t===`AVAILABLE`?a++:gn(t)?o++:_n(t)&&s++}return a===0?o===0&&s>0?`inactive`:`busy`:a<i?`partial`:`ok`}function Cn(e){return e.stationStatus===`ACTIVE`&&(e.points??[]).some(e=>V(e.status)===`AVAILABLE`)}function wn(e){return new Set((e.points??[]).flatMap(e=>(e.connectorType??[]).map(e=>sn(e.consumerName,e.key))))}function Tn(e){return new Set((e.points??[]).flatMap(e=>e.authenticationMode??[]))}function En(e,t,n,r){let i=t.only_available??!1,a=t.only_free??!1,o=t.only_open??!1,s=t.connector_types??[],c=t.amenities??[],l=t.payment_methods??[];return!i&&!a&&!o&&s.length===0&&c.length===0&&l.length===0?e:e.filter(e=>{if(i&&!Cn(e)||a&&!(e.points??[]).some(e=>e.freeOfCharge)||o&&xn(e.openingHours,n,r)===!1)return!1;if(s.length>0){let t=wn(e);if(!s.some(e=>t.has(e)))return!1}if(c.length>0&&!c.every(t=>vn(e,t)))return!1;if(l.length>0){let t=Tn(e);if(!l.some(e=>t.has(e)))return!1}return!0})}function Dn(e){return{plugs:Array.isArray(e.connector_types)?e.connector_types:[],minKw:typeof e.min_kw==`number`&&Number.isFinite(e.min_kw)?e.min_kw:0}}function On(e){let{plugs:t,minKw:n}=Dn(e);return t.length>0||n>0}function G(e,t){let{plugs:n,minKw:r}=Dn(t);if(n.length>0){let t=(e.connectorType??[]).map(e=>sn(e.consumerName,e.key));if(!n.some(e=>t.includes(e)))return!1}return r<=0||(e.capacityKw??0)>=r}function kn(e,t,n,r={}){return e.stationStatus===`ACTIVE`&&(e.points??[]).some(e=>V(e.status)===`AVAILABLE`&&G(e,r))&&xn(e.openingHours,t,n)!==!1}function An(e,t,n,r){if(t.auto_nearest){if(e.length===0)return{emptyKey:`parking.no_stations`};let i=On(t)?e.filter(e=>(e.points??[]).some(e=>G(e,t))):e;if(i.length===0)return{emptyKey:`parking.none_matching`};if(!t.only_available)return{station:i[0]};let a=i.find(e=>kn(e,n,r,t));return a?{station:a}:{emptyKey:`parking.none_available`}}let i=t.station_id??``;if(!i)return{emptyKey:`parking.no_station_selected`};let a=e.find(e=>e.stationId===i);return a?{station:a}:{emptyKey:`parking.station_not_found`}}function jn(e){return(e.points??[]).reduce((e,t)=>Math.max(e,t.capacityKw??0),0)}function Mn(e){return(e.points??[]).some(e=>(e.electricityType??[]).includes(`DC`))}function Nn(e){return e?ln(`https://www.google.com/maps/search/?api=1&query=${e.lat},${e.lon}`):``}function K(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a}var q=(e,t)=>({select:{mode:`box`,options:e,...t?{box_max_columns:t}:{}}});function Pn(e,t,n){return O`
    <button
      type="button"
      class=${e?`filter-chip active`:`filter-chip`}
      aria-pressed=${e}
      @click=${t}
    >
      ${n}
    </button>
  `}function Fn(e,t,n,r){return O`<div
    class="chip-group"
    role="group"
    aria-labelledby=${`chips-${e}`}
    aria-describedby=${`chips-${e}-hint`}
  >
    <div class="field-label" id=${`chips-${e}`}>${t}</div>
    <div class="chip-row">${r}</div>
    <div class="editor-hint" id=${`chips-${e}-hint`}>${n}</div>
  </div>`}var In=(e,t=`0 0 72 44`)=>`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${t}">${e}</svg>`)}`;function Ln(e,t){for(let n of e){let e=`${n}.${t}`,r=R(e);if(r!==e)return r}}function Rn(...e){return{computeLabel:t=>Ln(e,t.name)??t.name,computeHelper:t=>Ln(e,`${t.name}_helper`)}}function zn(e,t){let n={...e};for(let[e,r]of Object.entries(t))n[e]===r&&delete n[e];return n}function Bn(e){let t;return(n,r)=>(t?.key!==n&&(t={key:n,value:e(r)}),t.value)}var J=class extends P{constructor(...e){super(...e),this._config={},this._formChanged=e=>{let t=e.detail.value;t&&this._commit(zn(this._fromForm(t),this._defaults))},this._open=/* @__PURE__ */ new Set,this._panels=customElements.get(`ha-expansion-panel`)!==void 0}static{this.styles=Yt}setConfig(e){this._config={...e}}_commit(e){this._config=e,Fe(this,`config-changed`,{config:e})}_toggleListItem(e,t){let n=this._config[e]??[],r=n.includes(t)?n.filter(e=>e!==t):[...n,t],i={...this._config,[e]:r};r.length===0&&delete i[e],this._commit(i)}_form(e,t){return this.hass?O`<ha-form
      .hass=${this.hass}
      .data=${t}
      .schema=${e}
      .computeLabel=${this._text.computeLabel}
      .computeHelper=${this._text.computeHelper}
      @value-changed=${this._formChanged}
    ></ha-form>`:A}connectedCallback(){super.connectedCallback(),this._panels||customElements.whenDefined(`ha-expansion-panel`).then(()=>{this._panels=!0})}willUpdate(e){super.willUpdate(e),gt(e,this.hass)}_renderEntityAlert(){let e=this._config.entity;return!e||!this.hass||this.hass.states[e]?A:O`<ha-alert alert-type="error">${R(`editor.entity_missing`)}</ha-alert>`}_footerPanel(e){return{id:`footer`,icon:`mdi:information-outline`,header:R(`editor.group_footer`),summary:R(this._config.logo_adapt_to_theme===!0?`editor.summary_logo_theme`:`editor.summary_logo_colour`),body:()=>O`
        ${this._form(Vn,e)}
        <div class="editor-hint">${R(`editor.hint_compliance`)}</div>
      `}}_renderPanels(e){return this._panels?O`${e.map(e=>this._renderPanel(e))}`:O`
      ${this.hass?O`<ha-form
            hidden
            .hass=${this.hass}
            .data=${{}}
            .schema=${Hn}
          ></ha-form>`:A}
      ${e.map(e=>O`<section class="editor-section">
          <div class="section-header" role="heading" aria-level="3">${e.header}</div>
          <div class="editor-hint">${e.summary}</div>
          ${e.body()}
        </section>`)}
    `}_renderPanel(e){return O`<ha-expansion-panel
      outlined
      .header=${e.header}
      .secondary=${e.summary}
      @expanded-will-change=${t=>{t.stopPropagation();let n=new Set(this._open);t.detail.expanded?n.add(e.id):n.delete(e.id),this._open=n}}
    >
      <ha-icon slot="leading-icon" icon=${e.icon}></ha-icon>
      ${this._open.has(e.id)?O`<div class="panel-body">${e.body()}</div>`:A}
    </ha-expansion-panel>`}};K([I({attribute:!1})],J.prototype,`hass`,void 0),K([L()],J.prototype,`_config`,void 0),K([L()],J.prototype,`_open`,void 0),K([L()],J.prototype,`_panels`,void 0);var Vn=[{name:`logo_adapt_to_theme`,selector:{boolean:{}}}],Hn=[{type:`expandable`,name:`panel_loader`,title:``,flatten:!0,schema:[]}],Un=[{name:`entity`,required:!0,selector:{entity:{filter:{domain:`sensor`,integration:`ladestellen_austria`}}}},{name:`name`,selector:{text:{}}}],Wn=[{name:`show_header`,selector:{boolean:{}}},{name:`show_hero`,selector:{boolean:{}}}],Gn=[{name:`show_pricing`,selector:{boolean:{}}},{name:`show_amenities`,selector:{boolean:{}}}],Kn=[{name:`only_available`,selector:{boolean:{}}},{name:`only_open`,selector:{boolean:{}}},{name:`only_free`,selector:{boolean:{}}}],qn=Bn(()=>[{name:`max_stations`,selector:{number:{min:1,max:10,step:1,mode:`slider`}}},{name:`sort_order`,selector:q([{value:`distance`,label:R(`editor.sort_distance`),description:R(`editor.sort_distance_helper`)},{value:`power`,label:R(`editor.sort_power`),description:R(`editor.sort_power_helper`)}],2)}]),Jn={max_stations:10,hide_header:!1,show_hero:!0,show_pricing:!0,show_amenities:!0,sort_by_power:!1,logo_adapt_to_theme:!1,only_available:!1,only_free:!1,only_open:!1},Yn=e=>[e.only_available,e.only_open,e.only_free].filter(Boolean).length+(e.connector_types?.length??0)+(e.payment_methods?.length??0)+(e.amenities?.length??0),Xn=e=>[e.hide_header!==!0&&R(`editor.summary_header`),e.show_hero!==!1&&R(`editor.summary_hero`)].filter(Boolean).join(` · `)||R(`editor.summary_hidden`);function Zn(e){let t=e.pinned_station_ids?.length??0;return[String(e.max_stations??Jn.max_stations),R(e.sort_by_power?`editor.summary_power`:`editor.summary_distance`),t>0?R(`editor.summary_pins`,`{n}`,String(t)):``].filter(Boolean).join(` · `)}function Qn(e){let t=Yn(e);return t>0?R(`editor.summary_filters`,`{n}`,String(t)):R(`editor.summary_no_filters`)}var $n=Rn(`editor`),er=class extends J{constructor(...e){super(...e),this._defaults=Jn,this._text={computeLabel:$n.computeLabel,computeHelper:e=>e.name===`max_stations`?R(`editor.max_stations_helper`,`{n}`,String(this._config.max_stations??Jn.max_stations)):$n.computeHelper(e)}}_fromForm(e){let{show_header:t,sort_order:n,...r}=e;return t!==void 0&&(r.hide_header=t===!1),n!==void 0&&(r.sort_by_power=n===`power`),r}render(){let e=this._config,t={...Jn,...e,show_header:e.hide_header!==!0,sort_order:e.sort_by_power===!0?`power`:`distance`},n=e=>this._form(e,t);return O`
      <div class="editor">
        ${n(Un)} ${this._renderEntityAlert()}
        ${this._renderPanels([{id:`header`,icon:`mdi:page-layout-header`,header:R(`editor.group_header`),summary:Xn(e),body:()=>O`${n(Wn)}`},{id:`stations`,icon:`mdi:format-list-bulleted`,header:R(`editor.group_stations`),summary:Zn(e),body:()=>O`
              ${n(qn(this.hass?.language??``))} ${this._renderPinSection()}
              <hr />
              ${n(Gn)}
            `},{id:`filters`,icon:`mdi:filter-outline`,header:R(`editor.group_filters`),summary:Qn(e),body:()=>O`
              ${n(Kn)}
              <hr />
              ${this._renderChipFilters()}
            `},this._footerPanel(t)])}
      </div>
    `}_renderChipFilters(){let e=this._config.connector_types??[],t=this._config.payment_methods??[],n=this._config.amenities??[],r=(e,t,n,r)=>Pn(n,()=>this._toggleListItem(e,t),r),i=(e,t,n)=>r(e,n.key,t.includes(n.key),O`<ha-icon icon=${n.icon} aria-hidden="true"></ha-icon>
          <span>${R(n.label_key)}</span>`);return O`
      ${this._chipGroup(`connector`,Ie.map(t=>r(`connector_types`,t,e.includes(t),t)))}
      ${this._chipGroup(`payment`,Re.map(e=>i(`payment_methods`,t,e)))}
      ${this._chipGroup(`amenity`,Le.map(e=>i(`amenities`,n,e)))}
    `}_chipGroup(e,t){return Fn(e,R(`editor.chips_${e}`),R(`editor.chips_${e}_helper`),t)}_renderPinSection(){let e=this._config.entity,t=e?this.hass?.states[e]:void 0,n=t?.attributes?.stations??[],r=this._config.pinned_station_ids??[],i=new Set(r),a=new Set(n.map(e=>e.stationId)),o=r.filter(e=>!a.has(e)),s=t?.attributes?.dynamic_mode===!0;return O`
      <div class="field">
        <div class="field-label">${R(`editor.pinned`)}</div>
        ${s?O`<div class="editor-hint editor-hint--muted">
              ${R(`editor.pin_disabled_dynamic`)}
            </div>`:e?n.length===0?O`<div class="editor-hint editor-hint--muted">
              ${R(`editor.pin_no_stations_yet`)}
            </div>`:O`
              <div class="pin-list">
                ${n.map(e=>{let t=i.has(e.stationId),n=typeof e.distance==`number`?`${U(e.distance)} km`:``;return O`
                    <button
                      type="button"
                      class=${t?`pin-row pinned`:`pin-row`}
                      aria-pressed=${t}
                      @click=${()=>this._toggleListItem(`pinned_station_ids`,e.stationId)}
                    >
                      <ha-icon
                        icon=${t?`mdi:pin`:`mdi:pin-outline`}
                        aria-hidden="true"
                      ></ha-icon>
                      <span class="pin-label">${e.label}</span>
                      <span class="pin-meta">${n}</span>
                    </button>
                  `})}
              </div>
            `:O`<div class="editor-hint editor-hint--muted">
              ${R(`editor.pin_select_sensor_first`)}
            </div>`}
        ${!s&&o.length>0?O`
              <div class="editor-hint editor-hint--muted">
                ${R(`editor.pin_orphans_heading`)}
              </div>
              <div class="pin-list">
                ${o.map(e=>O`
                    <button
                      type="button"
                      class="pin-row pinned orphan"
                      aria-pressed="true"
                      @click=${()=>this._toggleListItem(`pinned_station_ids`,e)}
                    >
                      <ha-icon icon="mdi:pin" aria-hidden="true"></ha-icon>
                      <span class="pin-label orphan-id">${e}</span>
                      <span class="pin-meta">
                        ${R(`editor.pin_unpin`)}
                      </span>
                    </button>
                  `)}
              </div>
            `:A}
        ${s?A:O`<div class="editor-hint">${R(`editor.pinned_helper`)}</div>`}
      </div>
    `}};er=K([F(`ladestellen-austria-card-editor`)],er);function tr(){return O`
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
  `}var nr={auto_nearest:!1,only_available:!1,min_kw:0,hide_header:!1,show_free_count:!0,logo_adapt_to_theme:!1,car_color_mode:`random`,asphalt_style:`default`,paint_width:`medium`,icon_paint_mode:`default`},rr=`#1d4ed8`,ir=`#03a9f4`,ar=[{name:`entity`,required:!0,selector:{entity:{filter:{domain:`sensor`,integration:`ladestellen_austria`}}}}],or=[{name:`name`,selector:{text:{}}}],sr=e=>[{name:`auto_nearest`,selector:{boolean:{}}},{name:`only_available`,disabled:e,selector:{boolean:{}}}],cr=sr(!1),lr=sr(!0),Y=[0,11,50,150],ur=Bn(e=>[{name:`min_kw`,selector:q((Y.includes(e)?Y:[...Y.filter(t=>t<e),e,...Y.filter(t=>t>e)]).map(e=>({value:String(e),label:e===0?R(`parking_editor.min_kw_any`):R(`parking_editor.min_kw_from`,`{kw}`,H(e)),...Y.includes(e)?{description:R(`parking_editor.min_kw_${e===0?`any`:e}_helper`)}:{}})),2)}]);function dr(e){return`${e.connector_types?.length?e.connector_types.join(`, `):R(`parking_editor.summary_all_plugs`)} · ${e.min_kw?R(`parking_editor.summary_min_kw`,`{kw}`,H(e.min_kw)):R(`parking_editor.summary_any_power`)}`}var fr=e=>[{name:`show_header`,selector:{boolean:{}}},{name:`show_free_count`,disabled:e,selector:{boolean:{}}}],pr=fr(!1),mr=fr(!0),hr=`#9aa3ab`,gr=`#e8ecef`,_r=(e,t)=>[18,36,54].map(n=>`<rect x="${n-t/2}" y="6" width="${t}" height="32" fill="${e}"/>`).join(``),X=(e,t=1.6,n=gr)=>In(`<rect width="72" height="44" rx="6" fill="${hr}"/>${_r(n,t)}${e}`),vr=(e,t)=>`<rect x="${e}" y="12" width="12" height="20" rx="4" fill="${t}" stroke="rgba(0,0,0,.25)"/><rect x="${e+2}" y="16" width="8" height="4" rx="1" fill="rgba(255,255,255,.55)"/>`,yr=e=>X([3,21,39,57].map((t,n)=>vr(t,e[n%e.length])).join(``)),br=In(`<defs><pattern id="g" width="5" height="5" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".6" fill="#5b6168"/><circle cx="3.5" cy="3.2" r=".5" fill="#3a3f45"/></pattern></defs><rect width="72" height="44" rx="6" fill="#2c3035"/><rect width="72" height="44" rx="6" fill="url(#g)"/>${_r(`#f1f1f1`,1.6)}`),xr=e=>`<text x="36" y="27" text-anchor="middle" font-size="12" font-weight="700" fill="${e}" font-family="Roboto, sans-serif">22 kW</text>`,Sr=In(`<rect width="72" height="44" rx="6" fill="${hr}"/><rect x="8" y="9" width="56" height="26" rx="4" fill="#cfe9d8"/>${xr(`#1e7d4a`)}`),Cr=In(`<rect width="72" height="44" rx="6" fill="#4b5157"/>${xr(`#ffffff`)}`),Z=(e,t,n)=>({value:e,label:R(`parking_editor.${t}`),image:n}),wr=Bn(e=>[{name:`asphalt_style`,selector:q([Z(`default`,`asphalt_default`,X(``)),Z(`textured`,`asphalt_textured`,br)],2)},{name:`car_color_mode`,selector:q([Z(`random`,`car_color_random`,yr([`#dc2626`,`#1d4ed8`,`#e5e7eb`,`#059669`])),Z(`theme`,`car_color_theme`,yr([e.accent])),Z(`fixed`,`car_color_fixed`,yr([e.fixed]))],3)}]),Tr=Bn(()=>[{name:`paint_width`,selector:q([Z(`thin`,`paint_width_thin`,X(``,1.2,`#f4f4f4`)),Z(`medium`,`paint_width_medium`,X(``,2,`#f4f4f4`)),Z(`wide`,`paint_width_wide`,X(``,3.4,`#f4f4f4`))],3)},{name:`icon_paint_mode`,selector:q([Z(`default`,`icon_paint_default`,Sr),Z(`white`,`icon_paint_white`,Cr)],2)}]),Er=class extends J{constructor(...e){super(...e),this._defaults=nr,this._text=Rn(`parking_editor`,`editor`),this._carColorFixedChanged=e=>{let t=e.target?.value;t&&this._config.car_color_fixed!==t&&this._commit({...this._config,car_color_fixed:t})}}_fromForm(e){let{show_header:t,...n}=e;return t!==void 0&&(n.hide_header=t===!1),typeof n.min_kw==`string`&&(n.min_kw=Number(n.min_kw)||0),n}_selectStation(e){let t={...this._config,station_id:e};this._config.station_id===e&&delete t.station_id,this._commit(t)}render(){let e=this._config,t=e.entity,n=(t?this.hass?.states[t]:void 0)?.attributes?.stations??[],r=typeof e.min_kw==`number`&&e.min_kw>0?e.min_kw:0,i={...nr,...e,show_header:e.hide_header!==!0,min_kw:String(r)},a=e=>this._form(e,i),o=this.hass?.language??``,s=String(e.car_color_mode??nr.car_color_mode),c=e.auto_nearest===!0;return O`
      <div class="editor">
        ${a(ar)} ${this._renderEntityAlert()}
        <div class="field">
          <div class="field-label" id="station-picker-heading">
            ${R(`parking.editor_station_heading`)}
          </div>
          ${a(c?cr:lr)}
          ${c?A:this._renderStationPicker(t,n,e.station_id??``)}
        </div>
        ${a(or)}
        ${this._renderPanels([{id:`plug`,icon:`mdi:ev-plug-type2`,header:R(`parking_editor.group_plug`),summary:dr(e),body:()=>O`
              ${this._renderPlugChips()}
              <hr />
              ${a(ur(`${o}|${r}`,r))}
              <div class="editor-hint">${R(`parking_editor.plug_power_hint`)}</div>
            `},{id:`header`,icon:`mdi:page-layout-header`,header:R(`parking_editor.group_header`),summary:e.hide_header===!0?R(`editor.summary_hidden`):[R(`editor.summary_header`),e.show_free_count!==!1&&R(`parking_editor.summary_counter`)].filter(Boolean).join(` · `),body:()=>O`${a(e.hide_header===!0?mr:pr)}`},{id:`lot`,icon:`mdi:car`,header:R(`parking_editor.group_lot`),summary:[R(`parking_editor.asphalt_${e.asphalt_style??`default`}`),R(`parking_editor.car_color_${s}`),R(`parking_editor.paint_width_${e.paint_width??`medium`}`)].join(` · `),body:()=>{let t={accent:this._accent(),fixed:e.car_color_fixed||rr};return O`
                ${a(wr(`${o}|${t.accent}|${t.fixed}`,t))}
                ${s===`fixed`?this._renderCarColorPicker():A}
                <hr />
                ${a(Tr(o))}
              `}},this._footerPanel(i)])}
      </div>
    `}_renderPlugChips(){let e=this._config.connector_types??[];return Fn(`plug`,R(`parking_editor.plugs`),R(`parking_editor.plugs_helper`),Ie.map(t=>Pn(e.includes(t),()=>this._toggleListItem(`connector_types`,t),t)))}_accent(){return getComputedStyle(this).getPropertyValue(`--primary-color`).trim()||ir}_renderStationPicker(e,t,n){return O`
      ${e?t.length===0?O`<div class="editor-hint editor-hint--muted">
            ${R(`editor.pin_no_stations_yet`)}
          </div>`:O`
            <div
              class="pin-list"
              role="radiogroup"
              aria-labelledby="station-picker-heading"
              aria-describedby="station-picker-hint"
            >
              ${t.map(e=>this._renderStationOption(e,e.stationId===n))}
            </div>
          `:O`<div class="editor-hint editor-hint--muted">
            ${R(`editor.pin_select_sensor_first`)}
          </div>`}
      ${n&&!t.some(e=>e.stationId===n)?O`<div class="editor-hint editor-hint--muted">
            ${R(`parking.station_not_in_range`)}
            <span class="orphan-id">${n}</span>
          </div>`:A}
      <div class="editor-hint" id="station-picker-hint">
        ${R(`parking.pick_station_hint`)}
      </div>
    `}_renderStationOption(e,t){let n=typeof e.distance==`number`?`${U(e.distance)} km`:``;return O`
      <button
        type="button"
        class=${t?`pin-row pinned`:`pin-row`}
        role="radio"
        aria-checked=${t}
        @click=${()=>this._selectStation(e.stationId)}
      >
        <ha-icon
          icon=${t?`mdi:radiobox-marked`:`mdi:radiobox-blank`}
          aria-hidden="true"
        ></ha-icon>
        <span class="pin-label">${e.label}</span>
        <span class="pin-meta">${n}</span>
      </button>
    `}_renderCarColorPicker(){let e=this._config.car_color_fixed||rr,t=R(`parking_editor.car_colour`);return O`<div class="field">
      <div class="field-label">${t}</div>
      <div class="toggle-row">
        <label class="color-swatch" style=${`--swatch-color: ${e};`}>
          <ha-icon icon="mdi:palette-swatch-variant" aria-hidden="true"></ha-icon>
          <span class="color-swatch-hex">${e.toUpperCase()}</span>
          <input
            type="color"
            class="color-swatch-input"
            .value=${e}
            aria-label=${t}
            @input=${this._carColorFixedChanged}
            @change=${this._carColorFixedChanged}
          />
        </label>
      </div>
    </div>`}};Er=K([F(`ladestellen-austria-parking-card-editor`)],Er),window.customCards=window.customCards??[],window.customCards.push({type:`ladestellen-austria-parking-card`,name:`Ladestellen Austria — Parking`,description:`Single station, points rendered as parking slots viewed from above.`,preview:!0,documentationURL:`https://github.com/rolandzeiner/ladestellen-austria`,getEntitySuggestion:yt(`custom:ladestellen-austria-parking-card`)});var Q=class extends P{constructor(...e){super(...e),this.preview=!1,this._revealedSlots=/* @__PURE__ */ new Set}static getConfigElement(){return document.createElement(`ladestellen-austria-parking-card-editor`)}static getStubConfig(e,t){return{entity:vt(t),station_id:``}}setConfig(e){if(!e||typeof e!=`object`)throw Error(R(`common.invalid_configuration`));if(e.entity!==void 0&&typeof e.entity!=`string`)throw Error(R(`common.invalid_entity`));if(e.station_id!==void 0&&typeof e.station_id!=`string`)throw Error(R(`common.invalid_station_id`));this.config={auto_nearest:!1,only_available:!1,hide_header:!1,show_free_count:!0,logo_adapt_to_theme:!1,car_color_mode:`random`,asphalt_style:`default`,paint_width:`medium`,icon_paint_mode:`default`,...e}}shouldUpdate(e){return e.has(`config`)||e.has(`layout`)||e.has(`preview`)||e.has(`_revealedSlots`)?!0:_t(e,this.hass,this.config.entity)}getCardSize(){let e=(this.config.entity?this.hass?.states[this.config.entity]:void 0)?.attributes.stations??[],{station:t}=this._pick(e),n=Math.ceil((t?.points?.length??0)/3),r=57+(this.config.hide_header?0:52)+120*n;return Math.ceil(r/50)}getGridOptions(){return{columns:6,rows:`auto`,min_columns:4,min_rows:3}}_pick(e){return An(e,this.config,/* @__PURE__ */ new Date,this.hass?.config?.time_zone??`Europe/Vienna`)}get _fixedHeight(){return bt(this.layout,this.config?.grid_options,this.getGridOptions().rows)}willUpdate(e){super.willUpdate(e),gt(e,this.hass)}_versionBanner(){return Wt(this.hass,{domain:ht,version:mt,name:`Ladestellen Austria`,preview:this.preview})}_renderShell(e,t={}){return O`
      <ha-card class=${this._fixedHeight?`fixed-height`:``}>
        ${this._versionBanner()}
        <div class="card-content">
          <div
            class="wrap"
            style=${t.accent?`--lade-accent: var(--primary-color);`:A}
            data-asphalt-style=${this.config?.asphalt_style??`default`}
            data-paint-width=${this.config?.paint_width??`medium`}
            data-icon-paint=${this.config?.icon_paint_mode??`default`}
          >
            ${e}
          </div>
          ${t.footer??A}
        </div>
      </ha-card>
    `}_cardFooter(e){return ft(this.hass,e,this.config?.logo_adapt_to_theme===!0)}_renderHeader(e,t=``,n,r){return O`<header class="header">
      <div class="icon-tile" aria-hidden="true">
        <ha-icon icon="mdi:ev-station"></ha-icon>
      </div>
      <div class="header-text">
        <h3 class="title">${e}</h3>
        ${t?O`<p class="subtitle">${t}</p>`:A}
      </div>
      ${n?O`<div
            class=${n.avail>0?`header-count has-free`:`header-count`}
            role="status"
          >
            <span class="sr-only">${n.label}</span>
            <div class="header-count-value" aria-hidden="true">
              <span class="header-count-num">${n.avail}</span>
              <span class="header-count-of">/ ${n.total}</span>
            </div>
            <div class="header-count-label" aria-hidden="true">
              ${R(`parking.slot_status_free`)}
            </div>
          </div>`:A}
      ${r?O`<a
            class="map-link"
            href=${r.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label=${`${R(`card.open_in_maps`)}: ${r.place}`}
            title=${R(`card.open_in_maps`)}
          >
            <ha-icon icon="mdi:map-marker-outline" aria-hidden="true"></ha-icon>
          </a>`:A}
    </header>`}_renderLot(e,t){if(e.length===0)return O`<div class="empty-state">
        ${R(`parking.no_points`)}
      </div>`;let n=On(this.config);return O`<div class="rack-block">
      <div class="parking-lot" role="group" aria-label=${t}>
        ${e.map(e=>this._renderSlot(e,n&&!G(e,this.config)))}
      </div>
    </div>`}_stationHeader(e,t,n){if(this.config.hide_header)return A;let r=this.config.show_free_count!==!1&&n.total>0,i=this.config.auto_nearest?U(e.distance):`–`,a=i===`–`?``:`${i} km`,o=[t?e.label:``,a].filter(Boolean).join(` · `),s=Nn(e.location);return this._renderHeader(t??e.label,o,r?n:void 0,s?{url:s,place:e.label}:void 0)}render(){if(!this.hass||!this.config)return this._renderShell(O`<div class="empty-state">${R(`common.loading`)}</div>`);let e=this.config.entity?this.hass.states[this.config.entity]:void 0;if(!e)return this._renderShell(pt(this.config.entity),{footer:this._cardFooter()});let t=this.config.name,n=!!t&&!this.config.hide_header;if(e.state===`unavailable`)return this._renderShell(O`
          ${n?this._renderHeader(t??``):A}
          ${dt()}
        `,{footer:this._cardFooter()});let r=e.attributes.stations??[],i=this._pick(r),a=this._cardFooter(e.attributes.attribution);if(!i.station)return this._renderShell(O`
          ${n?this._renderHeader(t??``):A}
          <div class="empty-state">${R(i.emptyKey)}</div>
        `,{footer:a});let o=i.station,s=o.points??[],c=s.filter(e=>G(e,this.config)),l=c.filter(e=>en(e.status)===`ok`).length,u=c.length,d=R(`parking.available_count`).replaceAll(`{avail}`,String(l)).replaceAll(`{total}`,String(u));return this._renderShell(O`
        ${this._stationHeader(o,t,{avail:l,total:u,label:d})}
        ${this._renderLot(s,d)}
      `,{footer:a,accent:!0})}_renderSlotOverlays(e,t){return O`
      ${t?O`<span
            class="slot-car"
            aria-hidden="true"
            style=${`--slot-car-color: ${t};`}
          >
            ${tr()}
          </span>`:A}
      ${e?O`<span
            class="slot-overlay-icon tone-${e.tone}"
            aria-hidden="true"
          >
            <ha-icon icon=${e.icon}></ha-icon>
          </span>`:A}
    `}_renderSlotInner(e,t,n,r,i){let a=un(an(e).bucket),o=nn(e.status);return O`<span class="slot-inner">
      ${t?O`<span class="slot-power-badge" data-type=${t}
            >${t.toUpperCase()}</span
          >`:A}
      <span class="slot-kw">
        <span class="slot-kw-num">${n}</span
        ><span class="slot-kw-unit">kW</span>
      </span>
      <span class="slot-connector">${r}</span>
      <span class="slot-status-word slot-status-${a}"
        >${dn(o,i)}</span
      >
    </span>`}_renderSlot(e,t=!1){let n=an(e),{bucket:r,overlay:i,showCar:a,showOverlayIcon:o}=n,s=!t&&(a||o),c=s&&this._revealedSlots.has(e.evseId),l=$t(e),u=cn(e),d=H(e.capacityKw),f=tn(e.status),p=t?`${f} · ${R(`parking.slot_unmatched`)}`:f,ee=pn({powerType:l,capacityKw:e.capacityKw,kwText:d,connector:u,statusLabel:p}),m=`${e.evseId??``} · ${p}`.trim();return s?O`
      <button
        type="button"
        class=${fn(n,c,t)}
        data-status=${r}
        aria-label=${ee}
        aria-pressed=${c?`true`:`false`}
        title=${m}
        @click=${()=>this._toggleSlot(e.evseId)}
      >
        ${this._renderSlotOverlays(i,a?this._carColor(e.evseId):null)}
        ${this._renderSlotInner(e,l,d,u,f)}
      </button>
    `:O`
        <div
          class=${fn(n,!1,t)}
          data-status=${r}
          role="img"
          aria-label=${ee}
          title=${m}
        >
          ${this._renderSlotInner(e,l,d,u,f)}
        </div>
      `}_toggleSlot(e){if(!e)return;let t=new Set(this._revealedSlots);t.has(e)?t.delete(e):t.add(e),this._revealedSlots=t}_carColor(e){let t=this.config?.car_color_mode??`random`;if(t===`theme`)return`var(--primary-color)`;if(t===`fixed`)return this.config?.car_color_fixed||`var(--primary-color)`;let n=[`#e63946`,`#1d4ed8`,`#15803d`,`#facc15`,`#fb923c`,`#ec4899`,`#0e7490`,`#6b21a8`,`#1f2937`,`#e5e7eb`],r=e??``,i=0;for(let e=0;e<r.length;e++)i=i*31+r.charCodeAt(e)>>>0;return n[i%n.length]??`#1f2937`}static{this.styles=Qt}};K([I({attribute:!1})],Q.prototype,`hass`,void 0),K([I({reflect:!0})],Q.prototype,`layout`,void 0),K([I({type:Boolean})],Q.prototype,`preview`,void 0),K([L()],Q.prototype,`config`,void 0),K([L()],Q.prototype,`_revealedSlots`,void 0),Q=K([F(`ladestellen-austria-parking-card`)],Q),window.customCards=window.customCards??[],window.customCards.push({type:`ladestellen-austria-card`,name:`Ladestellen Austria`,description:`Nearby EV charging stations, powered by E-Control Austria`,preview:!0,documentationURL:`https://github.com/rolandzeiner/ladestellen-austria`,getEntitySuggestion:yt(`custom:ladestellen-austria-card`)});var Dr=10,$=class extends P{constructor(...e){super(...e),this.preview=!1,this._expanded=/* @__PURE__ */ new Set}static getConfigElement(){return document.createElement(`ladestellen-austria-card-editor`)}static getStubConfig(e,t){return{entity:vt(t)}}setConfig(e){if(!e||typeof e!=`object`)throw Error(R(`common.invalid_configuration`));if(e.entity!==void 0&&typeof e.entity!=`string`)throw Error(R(`common.invalid_entity`));this.config={name:`Ladestellen Austria`,max_stations:Dr,show_hero:!0,show_amenities:!0,show_pricing:!0,sort_by_power:!1,logo_adapt_to_theme:!1,only_available:!1,only_free:!1,only_open:!1,connector_types:[],amenities:[],payment_methods:[],pinned_station_ids:[],...e}}shouldUpdate(e){return e.has(`config`)||e.has(`layout`)||e.has(`preview`)||e.has(`_expanded`)?!0:_t(e,this.hass,this.config.entity)}getCardSize(){let e=this.config?.max_stations??Dr;return Math.min(3+Math.ceil(e/3),10)}getGridOptions(){return{columns:12,rows:`auto`,min_columns:6,min_rows:3}}get _fixedHeight(){return bt(this.layout,this.config?.grid_options,this.getGridOptions().rows)}willUpdate(e){super.willUpdate(e),gt(e,this.hass)}_versionBanner(){return Wt(this.hass,{domain:ht,version:mt,name:`Ladestellen Austria`,preview:this.preview})}_buildListView(e){let t=e.attributes.stations??[],n=e.attributes.live_status_available===!0,r=e.attributes.dynamic_mode===!0,i=e.attributes.dynamic_entity??null,a=r?[]:this.config.pinned_station_ids??[],o=this._collectPinnedItems(a,t),s=new Set(o.filter(e=>e.kind===`live`).map(e=>e.stationId)),c=t.filter(e=>!s.has(e.stationId)),l=this._filterStations(c),u=this._sortStations(l),d=Math.max(1,this.config.max_stations??Dr),f=[...o,...u.map(e=>({kind:`live`,station:e}))].slice(0,d),p=f.filter(e=>e.kind===`live`).map(e=>e.station);return{visible:f,liveAvailable:n,pinnedLiveStationIds:s,dynamicMode:r,dynamicEntity:i,filteredCount:l.length,totalCount:t.length,nearestByDistance:t[0],farthestShown:p[p.length-1]}}_renderCardHeader(e){if(this.config.hide_header)return A;let t=this.config.name,n=t&&t.trim()?t:`Ladestellen Austria`,r=e?this._heroCity(e):``;return O`<header class="header">
      <div class="icon-tile" aria-hidden="true">
        <ha-icon icon="mdi:ev-station"></ha-icon>
      </div>
      <div class="header-text">
        <h2 class="title">${n}</h2>
        ${r?O`<p class="subtitle">${r}</p>`:A}
      </div>
    </header>`}_renderDynamicFlag(e,t){return!e||!t?A:O`<div class="flags">
      <span class="flag">
        <ha-icon icon="mdi:crosshairs-gps" aria-hidden="true"></ha-icon>
        <span
          >${R(`card.dynamic_follows_entity`).replace(`{entity}`,t)}</span
        >
      </span>
    </div>`}_renderStationList(e){return e.visible.length===0?O`<div class="empty-state">
        ${R(`card.no_stations`)}
      </div>`:O`<ul class="stations" role="list">
      ${e.visible.map(t=>t.kind===`live`?this._renderStation(t.station,e.liveAvailable,e.pinnedLiveStationIds.has(t.station.stationId)):this._renderOrphanPin(t.id))}
    </ul>`}render(){if(!this.config||!this.hass)return O`<ha-card class=${this._fixedHeight?`fixed-height`:``}>
        <div class="card-content">
          <div class="wrap">
            <div class="empty-state">${R(`common.loading`)}</div>
          </div>
        </div>
      </ha-card>`;let e=this.config.entity?this.hass.states[this.config.entity]:void 0;if(!e)return O`
        <ha-card class=${this._fixedHeight?`fixed-height`:``}>
          ${this._versionBanner()}
          <div class="card-content">
            <div class="wrap">
              ${pt(this.config.entity)}
            </div>
            ${ft(this.hass,void 0,this.config?.logo_adapt_to_theme===!0)}
          </div>
        </ha-card>
      `;if(e.state===`unavailable`)return O`
        <ha-card class=${this._fixedHeight?`fixed-height`:``}>
          ${this._versionBanner()}
          <div class="card-content">
            <div class="wrap">
              ${this._renderCardHeader(void 0)} ${dt()}
            </div>
            ${ft(this.hass,void 0,this.config.logo_adapt_to_theme===!0)}
          </div>
        </ha-card>
      `;let t=this._buildListView(e);return O`
      <ha-card class=${this._fixedHeight?`fixed-height`:``}>
        ${this._versionBanner()}
        <div class="card-content">
          <div class="wrap">
            ${this._renderCardHeader(t.nearestByDistance)}
            ${this.config.show_hero===!1?A:this._renderHero(t.nearestByDistance,t.farthestShown,t.filteredCount,t.totalCount)}
            ${this._renderDynamicFlag(t.dynamicMode,t.dynamicEntity)}
            ${this._renderStationList(t)}
          </div>
          ${ft(this.hass,e.attributes.attribution,this.config.logo_adapt_to_theme===!0)}
        </div>
      </ha-card>
    `}_sortStations(e){let t=[...e];return t.sort((e,t)=>{if(this.config.sort_by_power){let n=Math.max(0,...(e.points??[]).map(e=>e.capacityKw??0)),r=Math.max(0,...(t.points??[]).map(e=>e.capacityKw??0));if(r!==n)return r-n}else{let n=e.distance??1/0,r=t.distance??1/0;if(n!==r)return n-r}let n=this._stationHasFree(e);return n===this._stationHasFree(t)?(e.distance??1/0)-(t.distance??1/0):n?-1:1}),t}_stationHasFree(e){return e.stationStatus===`ACTIVE`&&(e.points??[]).some(e=>V(e.status)===`AVAILABLE`)}_collectPinnedItems(e,t){let n=new Map(t.map(e=>[e.stationId,e])),r=/* @__PURE__ */ new Set,i=[];for(let t of e){if(r.has(t))continue;r.add(t);let e=n.get(t);e?i.push({kind:`live`,station:e,stationId:e.stationId}):i.push({kind:`orphan`,id:t})}return i}_unpinStation(e){let t=(this.config.pinned_station_ids??[]).filter(t=>t!==e),n={...this.config,pinned_station_ids:t};Fe(this,`config-changed`,{config:n})}_renderOrphanPin(e){return O`
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
                >${R(`card.orphan_pin_title`)}</span
              >
            </div>
            <div class="orphan-id">${e}</div>
          </div>
          <div class="station-actions">
            <ha-icon-button
              .label=${R(`card.unpin`)}
              @click=${t=>{t.stopPropagation(),this._unpinStation(e)}}
            >
              <ha-icon icon="mdi:close"></ha-icon>
            </ha-icon-button>
          </div>
        </div>
      </li>
    `}_filterStations(e){return En(e,this.config,/* @__PURE__ */ new Date,this.hass?.config?.time_zone??`Europe/Vienna`)}_renderHero(e,t,n,r){if(!e)return O`<section class="hero hero--empty">
        <span aria-live="polite">${R(`card.no_stations`)}</span>
      </section>`;let i=U(e.distance),a=this._heroCity(e),o=t?U(t.distance):i;return O`
      <section class="hero">
        <div class="metric">
          <div class="metric-value">
            <span class="metric-num" aria-live="polite">${i}</span>
            <span class="metric-of">km</span>
          </div>
          <div class="metric-label">${a}</div>
        </div>
        <div class="chip-row">
          <span class="chip">${R(`card.hero_range`).replaceAll(`{min}`,U(e.distance)).replaceAll(`{max}`,o)}</span>
          <span class="chip muted">${n===r?R(`card.hero_count`).replaceAll(`{count}`,String(n)):R(`card.hero_count_filtered`).replaceAll(`{filtered}`,String(n)).replaceAll(`{total}`,String(r))}</span>
        </div>
      </section>
    `}_heroCity(e){return e.city||e.label||``}_renderRowPrimary(e){return O`<div class="row-primary">
      ${e.maxKw>0?O`<span class=${e.isDC?`metric-kw dc`:`metric-kw`}>
            <span class="kw-num">${H(e.maxKw)}</span
            ><span class="kw-unit">kW</span>
          </span>`:A}
      ${e.priceText?O`<span
            class=${e.priceIsFree?`metric-price free`:`metric-price`}
            >${e.priceText}</span
          >`:A}
      ${e.visibleConnectors.map(e=>O`<span class="chip muted">${e}</span>`)}
      ${e.extraConnectors>0?O`<span class="chip muted">+${e.extraConnectors}</span>`:A}
      ${e.isPinned?O`<span class="chip pin" title=${R(`card.pinned`)}>
            <ha-icon icon="mdi:pin" aria-hidden="true"></ha-icon>
            <span>${R(`card.pinned`)}</span>
          </span>`:A}
    </div>`}_renderStation(e,t,n=!1){let r=e.points??[],i=Mn(e),a=jn(e),o=Array.from(wn(e)),s=o.slice(0,3),c=o.length-s.length,l=this._priceText(r),u=r.some(e=>e.freeOfCharge),d=r.length,f=r.filter(e=>V(e.status)===`AVAILABLE`).length,p=e.stationStatus===`ACTIVE`,ee=this.hass?.config?.time_zone??`Europe/Vienna`,m=xn(e.openingHours,/* @__PURE__ */ new Date,ee),h=Sn(t,p,r,m),g=this._expanded.has(e.stationId),_=Nn(e.location),te=this.config?.show_amenities??!0,ne=this.config?.show_pricing??!0,v=[`station`,g?`expanded`:``,n?`is-pinned`:``,h===`inactive`?`is-inactive`:``].filter(Boolean).join(` `),y=[[e.postCode,e.city].filter(Boolean).join(` `),Number.isFinite(e.distance)?`${U(e.distance)} km`:``].filter(Boolean).join(` · `),b=`station-panel-${e.stationId}`,re=`station-name-${e.stationId}`,x=`station-status-${e.stationId}`;return O`
      <li class=${v}>
        <div class="station-body">
          <button
            class="station-trigger"
            type="button"
            aria-expanded=${g}
            aria-controls=${b}
            aria-labelledby=${`${re} ${x}`}
            @click=${()=>this._toggle(e.stationId)}
          ></button>
          <span
            id=${x}
            class=${`status-dot status-${h}`}
            role="img"
            aria-label=${this._statusAria(h,f,d)}
          ></span>
          <div class="station-main">
            ${this._renderRowPrimary({maxKw:a,isDC:i,priceText:ne?l:``,priceIsFree:u,visibleConnectors:s,extraConnectors:c,isPinned:n})}
            <div class="row-secondary">
              <span class="station-name" id=${re} lang="de"
                >${e.label}</span
              >
              ${y?O`<span class="station-loc" lang="de">${y}</span>`:A}
            </div>
          </div>
          <div class="station-actions">
            ${_?O`<a
                  class="icon-action"
                  href=${_}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label=${`${R(`card.open_in_maps`)}: ${e.label}`}
                  title=${R(`card.open_in_maps`)}
                  @click=${e=>e.stopPropagation()}
                >
                  <ha-icon
                    icon="mdi:map-marker-outline"
                    aria-hidden="true"
                  ></ha-icon>
                </a>`:A}
            <ha-icon
              class="chevron"
              icon="mdi:chevron-down"
              aria-hidden="true"
            ></ha-icon>
          </div>
        </div>
        ${this._renderStationDetail(e,m,te,_,g,b)}
      </li>
    `}_renderStationDetail(e,t,n,r,i,a){let o=this._amenityItems(e),s=e.points??[],c=this._address(e),l=this._paymentChips(s),u=this._feesLine(s),d=e.operatorName||e.owner||``;return O`
      <div
        class="detail"
        id=${a}
        role="region"
        aria-hidden=${i?`false`:`true`}
        ?inert=${!i}
      >
        <div class="detail-inner">
        ${d?O`<div class="operator-line">
              <span class="detail-label">
                ${R(`card.operator_heading`)}
              </span>
              <span class="operator-name" lang="de">${d}</span>
            </div>`:A}
        ${e.description?O`<div class="station-note">
              <ha-icon
                icon="mdi:information-outline"
                aria-hidden="true"
              ></ha-icon>
              <span>${e.description}</span>
            </div>`:A}
        ${s.length>0?O`<div class="rack-block">
              <div class="detail-label">
                ${R(`card.charging_points_heading`)}
              </div>
              ${this._renderRack(s)}
              ${u?O`<div class="fees-line">${u}</div>`:A}
            </div>`:A}
        ${this._renderOpeningHoursSection(e.openingHours,t)}
        ${this._renderChipSection(R(`card.payment_heading`),l)}
        ${n?this._renderChipSection(R(`card.amenities_heading`),o):A}
        ${c?O`<div class="detail-section">
              <div class="detail-label">
                ${R(`card.address_heading`)}
              </div>
              <div class="detail-text" lang="de">${c}</div>
            </div>`:A}
        ${this._renderActions(e,r)}
        </div>
      </div>
    `}_renderChipSection(e,t){return t.length===0?A:O`<div class="detail-section">
      <div class="detail-label">
        ${e}
      </div>
      <div class="chip-row">
        ${t.map(e=>O`
            <span class="chip muted" title=${e.label}>
              <ha-icon icon=${e.icon} aria-hidden="true"></ha-icon>
              <span>${e.label}</span>
            </span>
          `)}
      </div>
    </div>`}_renderActions(e,t){return O`<div class="actions">
      ${t?O`<a
            class="btn-primary"
            href=${t}
            target="_blank"
            rel="noopener noreferrer"
            @click=${e=>e.stopPropagation()}
          >
            <ha-icon
              icon="mdi:map-marker-radius-outline"
              aria-hidden="true"
            ></ha-icon>
            <span>${R(`card.open_in_maps`)}</span>
          </a>`:A}
      ${this._renderExternalLink(e.website,`mdi:web`,R(`card.website`))}
      ${e.phoneNumber?O`<a
            class="btn-secondary"
            href=${`tel:${e.phoneCountryCode??``}${e.phoneNumber}`}
            @click=${e=>e.stopPropagation()}
          >
            <ha-icon icon="mdi:phone-outline" aria-hidden="true"></ha-icon>
            <span>${R(`card.call`)}</span>
          </a>`:A}
      ${this._renderExternalLink(e.priceUrl,`mdi:cash-multiple`,R(`card.tariff`))}
    </div>`}_renderExternalLink(e,t,n){let r=ln(e);return r?O`<a
      class="btn-secondary"
      href=${r}
      target="_blank"
      rel="noopener noreferrer"
      @click=${e=>e.stopPropagation()}
    >
      <ha-icon icon=${t} aria-hidden="true"></ha-icon>
      <span>${n}</span>
    </a>`:A}_renderRack(e){return O`
      <div class="rack">
        ${e.map(e=>this._renderRackSlot(e))}
      </div>
    `}_renderRackSlot(e){let t=$t(e),{bucket:n,overlay:r}=an(e),i=this._pointTooltip(e),a=this._pointAriaLabel(e,t),o=t?O`<span class="power-badge" data-type=${t}
          >${t.toUpperCase()}</span
        >`:A;if(r)return O`
        <div
          class=${r.bgTint?`rack-slot slot-tint-${r.bgTint}`:`rack-slot`}
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
      `;let s=cn(e);return O`
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
          <span class="rack-kw-num">${H(e.capacityKw)}</span
          ><span class="rack-kw-unit">kW</span>
        </span>
        <span class="rack-connector">${s}</span>
      </div>
    `}_pointAriaLabel(e,t){let n=[];t&&n.push(t.toUpperCase()),e.capacityKw&&n.push(`${H(e.capacityKw)} kW`);let r=cn(e);r&&r!==`–`&&n.push(r);let i=tn(e.status);return i&&n.push(i),n.join(` · `)}_pointTooltip(e){let t=[`${e.evseId??``} · ${tn(e.status)}`.trim()],n=e.startFeeCent??0;n>0&&t.push(`${R(`card.start_fee_label`)}: ${W(n)} €`);let r=e.blockingFeeCentMin??0,i=e.blockingFeeFromMinute??0;return r>0&&i>0&&t.push(`${on(r)} ${R(`card.blocking_fee_label`).replaceAll(`{from}`,String(i))}`),t.join(` · `)}_renderOpeningHoursSection(e,t){if(!e||e.length===0)return A;let n=this._formatOpeningHours(e);if(n.length===0)return A;let r=t===!0?`flag ok`:t===!1?`flag warn`:null,i=t===!0?`mdi:clock-check-outline`:t===!1?`mdi:clock-alert-outline`:null,a=t===!0?R(`card.open_now`):t===!1?R(`card.closed_now`):null;return O`
      <div class="detail-section">
        <div class="detail-label">
          ${R(`card.opening_hours_heading`)}
        </div>
        <div class="hours-row">
          <dl class="hours-lines">
            ${n.map(e=>O`<div class="hours-line">
                <dt class="hours-day">${e.day}</dt>
                <dd class="hours-time">${e.time}</dd>
              </div>`)}
          </dl>
          ${a&&r&&i?O`<span class=${r}>
                <ha-icon icon=${i} aria-hidden="true"></ha-icon>
                <span>${a}</span>
              </span>`:A}
        </div>
      </div>
    `}_formatOpeningHours(e){let t=[];for(let n of e){let e=this._formatSingleRange(n);e&&t.push(e)}return t}_formatSingleRange(e){let t=this._shortDay(e.fromWeekday),n=this._shortDay(e.toWeekday);if(!t||!n)return null;let r=e.fromTime===`00:00`&&(e.toTime===`23:59`||e.toTime===`24:00`);return{day:e.fromWeekday===e.toWeekday?t:`${t}–${n}`,time:r?R(`card.always_open_short`):`${e.fromTime}–${e.toTime}`}}_shortDay(e){switch((e??``).toUpperCase()){case`MONDAY`:return R(`weekday.mo`);case`TUESDAY`:return R(`weekday.tu`);case`WEDNESDAY`:return R(`weekday.we`);case`THURSDAY`:return R(`weekday.th`);case`FRIDAY`:return R(`weekday.fr`);case`SATURDAY`:return R(`weekday.sa`);case`SUNDAY`:return R(`weekday.su`);default:return``}}_paymentChips(e){let t=/* @__PURE__ */ new Set,n=[];for(let r of e)for(let e of r.authenticationMode??[]){if(t.has(e))continue;t.add(e);let r=this._authLabel(e);r&&n.push(r)}return n}_authLabel(e){switch(e){case`APP`:return{icon:`mdi:cellphone`,label:R(`auth.app`)};case`QR`:return{icon:`mdi:qrcode`,label:R(`auth.qr`)};case`RFID_READER`:return{icon:`mdi:credit-card-wireless-outline`,label:R(`auth.rfid`)};case`CHARGING_CONTRACT`:return{icon:`mdi:handshake-outline`,label:R(`auth.contract`)};case`DEBIT_CARD`:return{icon:`mdi:credit-card-outline`,label:R(`auth.debit`)};case`CREDIT_CARD`:return{icon:`mdi:credit-card`,label:R(`auth.credit`)};case`CONTACTLESS_CARD_SUPPORT`:return{icon:`mdi:contactless-payment`,label:R(`auth.contactless`)};default:return null}}_feesLine(e){let t=e.map(e=>e.startFeeCent??0).filter(e=>e>0),n=e.map(e=>({cent:e.blockingFeeCentMin??0,fromMin:e.blockingFeeFromMinute??0})).filter(e=>e.cent>0&&e.fromMin>0),r=[];if(t.length>0){let e=Math.max(...t);r.push(`+ ${W(e)} € ${R(`card.start_fee_label`)}`)}if(n.length>0){let e=Math.max(...n.map(e=>e.cent)),t=Math.min(...n.map(e=>e.fromMin));r.push(`${on(e)} ${R(`card.blocking_fee_label`).replaceAll(`{from}`,String(t))}`)}return r.length>0?r.join(`, `):null}_statusAria(e,t,n){return e===`inactive`?R(`card.inactive`):e===`unknown`?R(`card.status_unknown`):R(`card.available_count`).replaceAll(`{avail}`,String(t)).replaceAll(`{total}`,String(n))}_toggle(e){let t=new Set(this._expanded);t.has(e)?t.delete(e):t.add(e),this._expanded=t}_priceText(e){if(e.length===0)return``;if(e.some(e=>e.freeOfCharge))return R(`card.free_of_charge`);let t=e.filter(e=>!e.freeOfCharge&&e.priceCentKwh>0).map(e=>e.priceCentKwh);if(t.length>0)return`${W(Math.min(...t))} €/kWh`;let n=e.filter(e=>!e.freeOfCharge&&e.priceCentMin>0).map(e=>e.priceCentMin);return n.length>0?`${W(Math.min(...n))} €/min`:``}_address(e){let t=[];e.street&&t.push(e.street);let n=[e.postCode,e.city].filter(Boolean).join(` `);return n&&t.push(n),t.join(`, `)}_amenityItems(e){return[{flag:e.greenEnergy,icon:`mdi:leaf`,label:R(`amenities.green_energy`)},{flag:e.austrianEcoLabel,icon:`mdi:certificate-outline`,label:R(`amenities.austrian_ecolabel`)},{flag:e.freeParking,icon:`mdi:parking`,label:R(`amenities.free_parking`)},{flag:e.roofedParking,icon:`mdi:home-roof`,label:R(`amenities.roofed_parking`)},{flag:e.illuminatedParking,icon:`mdi:lightbulb-outline`,label:R(`amenities.illuminated_parking`)},{flag:(e.barrierFreeParkingPlaces??0)>0,icon:`mdi:wheelchair-accessibility`,label:R(`amenities.barrier_free`)},{flag:e.cateringService,icon:`mdi:silverware-fork-knife`,label:R(`amenities.catering`)},{flag:e.bathroomsAvailable,icon:`mdi:toilet`,label:R(`amenities.bathrooms`)},{flag:e.restingFacilities,icon:`mdi:sofa`,label:R(`amenities.resting`)}].filter(e=>e.flag)}static{this.styles=Zt}};K([I({attribute:!1})],$.prototype,`hass`,void 0),K([I({reflect:!0})],$.prototype,`layout`,void 0),K([I({type:Boolean})],$.prototype,`preview`,void 0),K([L()],$.prototype,`config`,void 0),K([L()],$.prototype,`_expanded`,void 0),$=K([F(`ladestellen-austria-card`)],$);export{$ as LadestellenAustriaCard};