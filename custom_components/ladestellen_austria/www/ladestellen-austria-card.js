// Ladestellen Austria Card — bundled by Rollup. Edit sources in src/, then `npm run build`.
function e(e,t,i,a){var n,o=arguments.length,r=o<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,a);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(o<3?n(r):o>3?n(t,i,r):n(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,a=Symbol(),n=new WeakMap;let o=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==a)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=n.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&n.set(t,e))}return e}toString(){return this.cssText}};const r=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,a)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[a+1],e[0]);return new o(i,e,a)},s=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new o("string"==typeof e?e:e+"",void 0,a))(t)})(e):e,{is:l,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:p,getOwnPropertySymbols:h,getPrototypeOf:u}=Object,g=globalThis,m=g.trustedTypes,f=m?m.emptyScript:"",v=g.reactiveElementPolyfillSupport,_=(e,t)=>e,b={toAttribute(e,t){switch(t){case Boolean:e=e?f:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},y=(e,t)=>!l(e,t),w={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=w){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),a=this.getPropertyDescriptor(e,i,t);void 0!==a&&c(this.prototype,e,a)}}static getPropertyDescriptor(e,t,i){const{get:a,set:n}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:a,set(t){const o=a?.call(this);n?.call(this,t),this.requestUpdate(e,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??w}static _$Ei(){if(this.hasOwnProperty(_("elementProperties")))return;const e=u(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(_("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_("properties"))){const e=this.properties,t=[...p(e),...h(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(s(e))}else void 0!==e&&t.push(s(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,a)=>{if(i)e.adoptedStyleSheets=a.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of a){const a=document.createElement("style"),n=t.litNonce;void 0!==n&&a.setAttribute("nonce",n),a.textContent=i.cssText,e.appendChild(a)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),a=this.constructor._$Eu(e,i);if(void 0!==a&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(t,i.type);this._$Em=e,null==n?this.removeAttribute(a):this.setAttribute(a,n),this._$Em=null}}_$AK(e,t){const i=this.constructor,a=i._$Eh.get(e);if(void 0!==a&&this._$Em!==a){const e=i.getPropertyOptions(a),n="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:b;this._$Em=a;const o=n.fromAttribute(t,e.type);this[a]=o??this._$Ej?.get(a)??o,this._$Em=null}}requestUpdate(e,t,i,a=!1,n){if(void 0!==e){const o=this.constructor;if(!1===a&&(n=this[e]),i??=o.getPropertyOptions(e),!((i.hasChanged??y)(n,t)||i.useDefault&&i.reflect&&n===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:a,wrapped:n},o){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??t??this[e]),!0!==n||void 0!==o)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===a&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,a=this[t];!0!==e||this._$AL.has(t)||void 0===a||this.C(t,void 0,i,a)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[_("elementProperties")]=new Map,x[_("finalized")]=new Map,v?.({ReactiveElement:x}),(g.reactiveElementVersions??=[]).push("2.1.2");const k=globalThis,$=e=>e,A=k.trustedTypes,S=A?A.createPolicy("lit-html",{createHTML:e=>e}):void 0,C="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,z="?"+E,I=`<${z}>`,T=document,P=()=>T.createComment(""),R=e=>null===e||"object"!=typeof e&&"function"!=typeof e,D=Array.isArray,O="[ \t\n\f\r]",M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,L=/-->/g,N=/>/g,U=RegExp(`>|${O}(?:([^\\s"'>=/]+)(${O}*=${O}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),F=/'/g,H=/"/g,W=/^(?:script|style|textarea|title)$/i,B=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),j=Symbol.for("lit-noChange"),G=Symbol.for("lit-nothing"),V=new WeakMap,Z=T.createTreeWalker(T,129);function Y(e,t){if(!D(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}const K=(e,t)=>{const i=e.length-1,a=[];let n,o=2===t?"<svg>":3===t?"<math>":"",r=M;for(let t=0;t<i;t++){const i=e[t];let s,l,c=-1,d=0;for(;d<i.length&&(r.lastIndex=d,l=r.exec(i),null!==l);)d=r.lastIndex,r===M?"!--"===l[1]?r=L:void 0!==l[1]?r=N:void 0!==l[2]?(W.test(l[2])&&(n=RegExp("</"+l[2],"g")),r=U):void 0!==l[3]&&(r=U):r===U?">"===l[0]?(r=n??M,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,s=l[1],r=void 0===l[3]?U:'"'===l[3]?H:F):r===H||r===F?r=U:r===L||r===N?r=M:(r=U,n=void 0);const p=r===U&&e[t+1].startsWith("/>")?" ":"";o+=r===M?i+I:c>=0?(a.push(s),i.slice(0,c)+C+i.slice(c)+E+p):i+E+(-2===c?t:p)}return[Y(e,o+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),a]};class q{constructor({strings:e,_$litType$:t},i){let a;this.parts=[];let n=0,o=0;const r=e.length-1,s=this.parts,[l,c]=K(e,t);if(this.el=q.createElement(l,i),Z.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(a=Z.nextNode())&&s.length<r;){if(1===a.nodeType){if(a.hasAttributes())for(const e of a.getAttributeNames())if(e.endsWith(C)){const t=c[o++],i=a.getAttribute(e).split(E),r=/([.?@])?(.*)/.exec(t);s.push({type:1,index:n,name:r[2],strings:i,ctor:"."===r[1]?te:"?"===r[1]?ie:"@"===r[1]?ae:ee}),a.removeAttribute(e)}else e.startsWith(E)&&(s.push({type:6,index:n}),a.removeAttribute(e));if(W.test(a.tagName)){const e=a.textContent.split(E),t=e.length-1;if(t>0){a.textContent=A?A.emptyScript:"";for(let i=0;i<t;i++)a.append(e[i],P()),Z.nextNode(),s.push({type:2,index:++n});a.append(e[t],P())}}}else if(8===a.nodeType)if(a.data===z)s.push({type:2,index:n});else{let e=-1;for(;-1!==(e=a.data.indexOf(E,e+1));)s.push({type:7,index:n}),e+=E.length-1}n++}}static createElement(e,t){const i=T.createElement("template");return i.innerHTML=e,i}}function J(e,t,i=e,a){if(t===j)return t;let n=void 0!==a?i._$Co?.[a]:i._$Cl;const o=R(t)?void 0:t._$litDirective$;return n?.constructor!==o&&(n?._$AO?.(!1),void 0===o?n=void 0:(n=new o(e),n._$AT(e,i,a)),void 0!==a?(i._$Co??=[])[a]=n:i._$Cl=n),void 0!==n&&(t=J(e,n._$AS(e,t.values),n,a)),t}class X{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,a=(e?.creationScope??T).importNode(t,!0);Z.currentNode=a;let n=Z.nextNode(),o=0,r=0,s=i[0];for(;void 0!==s;){if(o===s.index){let t;2===s.type?t=new Q(n,n.nextSibling,this,e):1===s.type?t=new s.ctor(n,s.name,s.strings,this,e):6===s.type&&(t=new ne(n,this,e)),this._$AV.push(t),s=i[++r]}o!==s?.index&&(n=Z.nextNode(),o++)}return Z.currentNode=T,a}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,a){this.type=2,this._$AH=G,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=J(this,e,t),R(e)?e===G||null==e||""===e?(this._$AH!==G&&this._$AR(),this._$AH=G):e!==this._$AH&&e!==j&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>D(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==G&&R(this._$AH)?this._$AA.nextSibling.data=e:this.T(T.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,a="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=q.createElement(Y(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===a)this._$AH.p(t);else{const e=new X(a,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=V.get(e.strings);return void 0===t&&V.set(e.strings,t=new q(e)),t}k(e){D(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,a=0;for(const n of e)a===t.length?t.push(i=new Q(this.O(P()),this.O(P()),this,this.options)):i=t[a],i._$AI(n),a++;a<t.length&&(this._$AR(i&&i._$AB.nextSibling,a),t.length=a)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=$(e).nextSibling;$(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ee{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,a,n){this.type=1,this._$AH=G,this._$AN=void 0,this.element=e,this.name=t,this._$AM=a,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=G}_$AI(e,t=this,i,a){const n=this.strings;let o=!1;if(void 0===n)e=J(this,e,t,0),o=!R(e)||e!==this._$AH&&e!==j,o&&(this._$AH=e);else{const a=e;let r,s;for(e=n[0],r=0;r<n.length-1;r++)s=J(this,a[i+r],t,r),s===j&&(s=this._$AH[r]),o||=!R(s)||s!==this._$AH[r],s===G?e=G:e!==G&&(e+=(s??"")+n[r+1]),this._$AH[r]=s}o&&!a&&this.j(e)}j(e){e===G?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class te extends ee{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===G?void 0:e}}class ie extends ee{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==G)}}class ae extends ee{constructor(e,t,i,a,n){super(e,t,i,a,n),this.type=5}_$AI(e,t=this){if((e=J(this,e,t,0)??G)===j)return;const i=this._$AH,a=e===G&&i!==G||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,n=e!==G&&(i===G||a);a&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ne{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){J(this,e)}}const oe=k.litHtmlPolyfillSupport;oe?.(q,Q),(k.litHtmlVersions??=[]).push("3.3.2");const re=globalThis;class se extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const a=i?.renderBefore??t;let n=a._$litPart$;if(void 0===n){const e=i?.renderBefore??null;a._$litPart$=n=new Q(t.insertBefore(P(),e),e,void 0,i??{})}return n._$AI(e),n})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return j}}se._$litElement$=!0,se.finalized=!0,re.litElementHydrateSupport?.({LitElement:se});const le=re.litElementPolyfillSupport;le?.({LitElement:se}),(re.litElementVersions??=[]).push("4.2.2");const ce=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},de={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:y},pe=(e=de,t,i)=>{const{kind:a,metadata:n}=i;let o=globalThis.litPropertyMetadata.get(n);if(void 0===o&&globalThis.litPropertyMetadata.set(n,o=new Map),"setter"===a&&((e=Object.create(e)).wrapped=!0),o.set(i.name,e),"accessor"===a){const{name:a}=i;return{set(i){const n=t.get.call(this);t.set.call(this,i),this.requestUpdate(a,n,e,!0,i)},init(t){return void 0!==t&&this.C(a,void 0,e,t),t}}}if("setter"===a){const{name:a}=i;return function(i){const n=this[a];t.call(this,i),this.requestUpdate(a,n,e,!0,i)}}throw Error("Unsupported decorator location: "+a)};function he(e){return(t,i)=>"object"==typeof i?pe(e,t,i):((e,t,i)=>{const a=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),a?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}function ue(e){return he({...e,state:!0,attribute:!1})}function ge(e,t,i){e.dispatchEvent(new CustomEvent(t,{detail:i,bubbles:!0,composed:!0}))}const me=["Type 2","CCS","CHAdeMO","Type 1","Tesla","Schuko","CEE"],fe=[{key:"green_energy",icon:"mdi:leaf",label_key:"amenities.green_energy"},{key:"austrian_ecolabel",icon:"mdi:certificate-outline",label_key:"amenities.austrian_ecolabel"},{key:"free_parking",icon:"mdi:parking",label_key:"amenities.free_parking"},{key:"roofed_parking",icon:"mdi:home-roof",label_key:"amenities.roofed_parking"},{key:"illuminated_parking",icon:"mdi:lightbulb-outline",label_key:"amenities.illuminated_parking"},{key:"barrier_free",icon:"mdi:wheelchair-accessibility",label_key:"amenities.barrier_free"},{key:"catering",icon:"mdi:silverware-fork-knife",label_key:"amenities.catering"},{key:"bathrooms",icon:"mdi:toilet",label_key:"amenities.bathrooms"},{key:"resting",icon:"mdi:sofa",label_key:"amenities.resting"}],ve=[{key:"APP",icon:"mdi:cellphone",label_key:"auth.app"},{key:"QR",icon:"mdi:qrcode",label_key:"auth.qr"},{key:"RFID_READER",icon:"mdi:credit-card-wireless-outline",label_key:"auth.rfid"},{key:"CHARGING_CONTRACT",icon:"mdi:handshake-outline",label_key:"auth.contract"},{key:"DEBIT_CARD",icon:"mdi:credit-card-outline",label_key:"auth.debit"},{key:"CREDIT_CARD",icon:"mdi:credit-card",label_key:"auth.credit"},{key:"CONTACTLESS_CARD_SUPPORT",icon:"mdi:contactless-payment",label_key:"auth.contactless"}];var _e={version:"Version",invalid_configuration:"Invalid configuration",invalid_entity:"Card config: 'entity' must be a string referencing a sensor entity_id.",invalid_station_id:"Card config: 'station_id' must be a string.",loading:"Loading…",version_update:"A newer card version ({v}) is available. Reload to apply.",version_reload:"Reload",version_reload_stuck:"Reload didn't pick up the new version. Close this browser tab and reopen the dashboard, or clear your browser's site data for Home Assistant."},be={no_entity:"Select a Ladestellen Austria sensor in the card editor.",no_stations:"No stations match the current filters.",hero_context:"to the nearest charger in {city}",hero_count:"{count} stations",hero_count_filtered:"{filtered} of {total} stations",hero_range:"{min}–{max} km range",inactive:"inactive",status_unknown:"live availability unavailable",gratis:"Free",live_suffix:"free",open_in_maps:"Open in Maps",website:"Website",call:"Call",address_heading:"Address",amenities_heading:"Amenities",pinned:"Pinned",unpin:"Remove pin",orphan_pin_title:"Pinned station not in range",operator_heading:"Operator",charging_points_heading:"Charging points",opening_hours_heading:"Opening hours",payment_heading:"Payment",open_now:"Open now",closed_now:"Closed",always_open_short:"24h",start_fee_label:"start fee",blocking_fee_label:"¢/min from {from} min.",point_status_available:"Available",point_status_charging:"Charging",point_status_occupied:"Occupied",point_status_reserved:"Reserved",point_status_blocked:"Blocked",point_status_out_of_order:"Out of order",point_status_faulted:"Faulted",point_status_inoperative:"Inoperative",point_status_unavailable:"Unavailable",point_status_out_of_stock:"Empty",point_status_planned:"Planned",point_status_removed:"Removed",point_status_unknown:"Unknown",tariff:"Tariff",dynamic_follows_entity:"Tracking: {entity}"},ye={editor_station_heading:"Station",pick_station_hint:"Pick one station from the sensor. The card shows that station's charging points as parking slots.",no_station_selected:"Pick a station in the card editor.",station_not_found:"The selected station is not in the sensor's current results.",station_not_in_range:"Selected station not in range",available_count:"{avail} of {total} free",no_points:"No charging points reported for this station.",slot_status_free:"free",slot_status_busy:"in use",slot_status_warn:"out of order",slot_status_unknown:"unknown",slot_status_reserved:"reserved",slot_status_blocked:"blocked",slot_status_out_of_stock:"empty",slot_status_faulted:"faulted",slot_status_inoperative:"offline",slot_status_unavailable:"n/a",slot_status_planned:"planned",slot_status_removed:"removed"},we={green_energy:"Green energy",free_parking:"Free parking",roofed_parking:"Roofed parking",illuminated_parking:"Illuminated",barrier_free:"Accessible",austrian_ecolabel:"Austrian Eco-Label",catering:"Catering nearby",bathrooms:"Restrooms",resting:"Resting area"},xe={app:"App",qr:"QR code",rfid:"RFID",contract:"Contract",debit:"Debit card",credit:"Credit card",contactless:"Contactless"},ke={mo:"Mo",tu:"Tu",we:"We",th:"Th",fr:"Fr",sa:"Sa",su:"Su"},$e={section_main:"Main",section_display:"Display",section_filters:"Filters",section_chip_filters:"Filter by type",section_appearance:"Appearance",name:"Card title (optional)",entity:"Sensor",entity_missing:"Selected sensor is unavailable. Pick a different Ladestellen Austria sensor.",max_stations:"Stations to show",show_hero:"Show hero block",show_pricing:"Show pricing",show_amenities:"Show amenity details",sort_by_power:"Sort by power (fastest first)",logo_adapt_to_theme:"Adapt logo to theme (black on light, white on dark)",hide_header:"Hide header",show_free_count:"Show free / total counter",car_color_mode:"Car colour",car_color_random:"Random per spot",car_color_theme:"Theme accent colour",car_color_fixed:"Single colour",car_color_pick:"Pick car colour",asphalt_style:"Asphalt style",asphalt_style_default:"Default (flat grey)",asphalt_style_textured:"Textured asphalt",paint_width:"Lane-line width",paint_width_thin:"Thin",paint_width_medium:"Medium",paint_width_wide:"Wide",icon_paint_mode:"Icon colour",icon_paint_default:"Default (state colours)",icon_paint_white:"White (painted on asphalt)",only_available:"Only currently available stations",only_free:"Only stations with free charging",only_open:"Only currently open stations",connector_filter_hint:"Tap connector types to only show stations offering at least one of them. Empty = no filter.",amenity_filter_hint:"Tap amenities to narrow to stations offering all selected features (AND). Empty = no filter.",payment_filter_hint:"Tap payment methods to only show stations accepting at least one of them. Empty = no filter.",hint_compliance:"The E-Control logo (linking to e-control.at) and the 'Datenquelle: E-Control' attribution in the footer are required by the ladestellen.at Terms of Use.",section_pinned:"Pinned stations",pin_hint:"Pinned stations always appear first and bypass filters. They still count toward the display cap above.",pin_select_sensor_first:"Select a sensor first to see available stations.",pin_no_stations_yet:"No stations returned yet — wait for the next refresh.",pin_orphans_heading:"Pinned but not in range (click to remove):",pin_unpin:"Remove",pin_disabled_dynamic:"Dynamic location mode is active on this sensor — pinned stations are disabled because the list follows your current position. Existing pins are preserved for when you switch back to fixed mode."},Ae={common:_e,card:be,parking:ye,amenities:we,auth:xe,weekday:ke,editor:$e},Se={version:"Version",invalid_configuration:"Ungültige Konfiguration",invalid_entity:"Kartenkonfiguration: „entity“ muss ein String mit einer Sensor-entity_id sein.",invalid_station_id:"Kartenkonfiguration: „station_id“ muss ein String sein.",loading:"Lade…",version_update:"Eine neuere Kartenversion ({v}) ist verfügbar. Bitte neu laden.",version_reload:"Neu laden",version_reload_stuck:"Neu laden hat die neue Version nicht übernommen. Schließen Sie diesen Browser-Tab und öffnen Sie das Dashboard erneut, oder löschen Sie die Website-Daten für Home Assistant in den Browser-Einstellungen."},Ce={no_entity:"Bitte einen Ladestellen-Austria-Sensor im Karten-Editor auswählen.",no_stations:"Keine Ladestellen entsprechen den aktuellen Filtern.",hero_context:"zur nächsten Ladestelle in {city}",hero_count:"{count} Ladestellen",hero_count_filtered:"{filtered} von {total} Ladestellen",hero_range:"{min}–{max} km Umkreis",inactive:"inaktiv",status_unknown:"Live-Status nicht verfügbar",gratis:"Gratis",live_suffix:"frei",open_in_maps:"In Karte öffnen",website:"Website",call:"Anrufen",address_heading:"Adresse",amenities_heading:"Ausstattung",pinned:"Angepinnt",unpin:"Pin entfernen",orphan_pin_title:"Angepinnte Ladestelle außerhalb des Umkreises",operator_heading:"Betreiber",charging_points_heading:"Ladepunkte",opening_hours_heading:"Öffnungszeiten",payment_heading:"Bezahlung",open_now:"Jetzt geöffnet",closed_now:"Geschlossen",always_open_short:"24h",start_fee_label:"Startgebühr",blocking_fee_label:"¢/min ab {from} Min.",point_status_available:"Verfügbar",point_status_charging:"Lädt",point_status_occupied:"Belegt",point_status_reserved:"Reserviert",point_status_blocked:"Blockiert",point_status_out_of_order:"Außer Betrieb",point_status_faulted:"Defekt",point_status_inoperative:"Außer Betrieb",point_status_unavailable:"Nicht verfügbar",point_status_out_of_stock:"Leer",point_status_planned:"Geplant",point_status_removed:"Entfernt",point_status_unknown:"Unbekannt",tariff:"Tarif",dynamic_follows_entity:"Folgt: {entity}"},Ee={editor_station_heading:"Ladestelle",pick_station_hint:"Eine Ladestelle aus dem Sensor auswählen. Die Karte zeigt deren Ladepunkte als Parkplätze.",no_station_selected:"Bitte eine Ladestelle im Karten-Editor auswählen.",station_not_found:"Die gewählte Ladestelle ist aktuell nicht in den Sensor-Ergebnissen.",station_not_in_range:"Gewählte Ladestelle nicht im Umkreis",available_count:"{avail} von {total} frei",no_points:"Keine Ladepunkte für diese Ladestelle vorhanden.",slot_status_free:"frei",slot_status_busy:"belegt",slot_status_warn:"außer Betrieb",slot_status_unknown:"unbekannt",slot_status_reserved:"reserviert",slot_status_blocked:"gesperrt",slot_status_out_of_stock:"leer",slot_status_faulted:"defekt",slot_status_inoperative:"offline",slot_status_unavailable:"n. v.",slot_status_planned:"geplant",slot_status_removed:"entfernt"},ze={green_energy:"Ökostrom",free_parking:"Gratis Parken",roofed_parking:"Überdacht",illuminated_parking:"Beleuchtet",barrier_free:"Barrierefrei",austrian_ecolabel:"Umweltzeichen",catering:"Gastronomie",bathrooms:"WC",resting:"Ruhebereich"},Ie={app:"App",qr:"QR-Code",rfid:"RFID",contract:"Vertrag",debit:"Bankomat",credit:"Kreditkarte",contactless:"Kontaktlos"},Te={mo:"Mo",tu:"Di",we:"Mi",th:"Do",fr:"Fr",sa:"Sa",su:"So"},Pe={section_main:"Allgemein",section_display:"Anzeige",section_filters:"Filter",section_chip_filters:"Nach Typ filtern",section_appearance:"Darstellung",name:"Kartentitel (optional)",entity:"Sensor",entity_missing:"Ausgewählter Sensor ist nicht verfügbar. Bitte einen anderen Ladestellen-Austria-Sensor wählen.",max_stations:"Anzahl angezeigter Ladestellen",show_hero:"Hauptbereich anzeigen",show_pricing:"Preise anzeigen",show_amenities:"Ausstattungs-Details anzeigen",sort_by_power:"Nach Leistung sortieren (schnellste zuerst)",logo_adapt_to_theme:"Logo an Design anpassen (schwarz auf hell, weiß auf dunkel)",hide_header:"Kopfzeile ausblenden",show_free_count:"Frei/Gesamt-Zähler anzeigen",car_color_mode:"Auto-Farbe",car_color_random:"Zufällig pro Platz",car_color_fixed:"Eigene Farbe",car_color_theme:"Akzentfarbe des Designs",car_color_pick:"Auto-Farbe wählen",asphalt_style:"Asphalt-Stil",asphalt_style_default:"Standard (flaches Grau)",asphalt_style_textured:"Strukturierter Asphalt",paint_width:"Linienbreite",paint_width_thin:"Schmal",paint_width_medium:"Mittel",paint_width_wide:"Breit",icon_paint_mode:"Symbol-Farbe",icon_paint_default:"Standard (Statusfarben)",icon_paint_white:"Weiß (auf Asphalt gemalt)",only_available:"Nur aktuell verfügbare Ladestellen",only_free:"Nur Ladestellen mit Gratis-Laden",only_open:"Nur aktuell geöffnete Ladestellen",connector_filter_hint:"Steckertypen antippen, um nur Ladestellen mit mindestens einem davon anzuzeigen. Leer = kein Filter.",amenity_filter_hint:"Ausstattungsmerkmale antippen, um nur Ladestellen mit allen gewählten Merkmalen anzuzeigen (UND). Leer = kein Filter.",payment_filter_hint:"Bezahlmethoden antippen, um nur Ladestellen anzuzeigen, die mindestens eine davon akzeptieren. Leer = kein Filter.",hint_compliance:"Die Anzeige des E-Control-Logos (verlinkt auf e-control.at) und des Hinweises „Datenquelle: E-Control“ in der Fußzeile ist von den ladestellen.at-Nutzungsbedingungen vorgeschrieben.",section_pinned:"Angepinnte Ladestellen",pin_hint:"Angepinnte Ladestellen erscheinen immer zuerst und ignorieren Filter. Sie zählen weiterhin zur obigen Maximalanzahl.",pin_select_sensor_first:"Zuerst einen Sensor auswählen, um verfügbare Ladestellen zu sehen.",pin_no_stations_yet:"Noch keine Ladestellen geladen — auf die nächste Aktualisierung warten.",pin_orphans_heading:"Angepinnt, aber nicht im Umkreis (anklicken zum Entfernen):",pin_unpin:"Entfernen",pin_disabled_dynamic:"Dynamische Standortverfolgung ist für diesen Sensor aktiv — angepinnte Ladestellen sind deaktiviert, weil die Liste deiner aktuellen Position folgt. Bestehende Pins bleiben erhalten, falls du wieder auf festen Standort wechselst."},Re={common:Se,card:Ce,parking:Ee,amenities:ze,auth:Ie,weekday:Te,editor:Pe};const De={en:Object.freeze({__proto__:null,amenities:we,auth:xe,card:be,common:_e,default:Ae,editor:$e,parking:ye,weekday:ke}),de:Object.freeze({__proto__:null,amenities:ze,auth:Ie,card:Ce,common:Se,default:Re,editor:Pe,parking:Ee,weekday:Te})};function Oe(e,t){const i=e.split(".").reduce((e,t)=>{if(e&&"object"==typeof e&&t in e)return e[t]},t);return"string"==typeof i?i:void 0}let Me;function Le(e){"string"==typeof e&&e.length>0&&(Me=e)}function Ne(e,t="",i=""){const a=(Me||("undefined"!=typeof navigator?navigator.language:"")||"en").replace(/['"]+/g,"").substring(0,2).toLowerCase(),n=De.en??{};let o=Oe(e,De[a]??n);return void 0===o&&(o=Oe(e,n)),void 0===o&&(o=e),""!==t&&""!==i&&(o=o.replaceAll(t,i)),o}async function Ue(e){if(!e?.callWS)return null;try{const t=await e.callWS({type:"ladestellen_austria/card_version"});if(t?.version&&"0.5.2"!==t.version)return t.version}catch{}return null}function Fe(e){return e?function(e){if(!e)return!1;try{return"1"===window.sessionStorage?.getItem(`lade-reload-attempted-${e}`)}catch{return!1}}(e)?B`
      <div class="version-notice" role="alert" aria-live="assertive">
        <span>${Ne("common.version_reload_stuck")}</span>
      </div>
    `:B`
    <div class="version-notice" role="alert" aria-live="assertive">
      <span
        >${Ne("common.version_update").replaceAll("{v}",e)}</span
      >
      <button
        class="version-reload-btn"
        type="button"
        @click=${()=>function(e){try{window.caches?.keys?.().then(e=>{e.forEach(e=>window.caches?.delete?.(e))})}catch{}if(e)try{window.sessionStorage?.setItem(`lade-reload-attempted-${e}`,"1")}catch{}window.location.reload()}(e)}
      >
        ${Ne("common.version_reload")}
      </button>
    </div>
  `:G}function He(e,t,i){const a=Boolean(e?.themes?.darkMode),n=i?"brand-logo adaptive "+(a?"adaptive-dark":"adaptive-light"):"brand-logo",o=t&&t.includes("E-Control")?t:"Datenquelle: E-Control";return B`
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
          class=${n}
          src="/ladestellen_austria/e-control_logo.svg"
          alt="E-Control"
        />
      </a>
      <span class="attribution-text">${o}</span>
    </div>
  `}const We=r`
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
`,Be=r`
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
`,je=r`
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
`,Ge=r`
  :host {
    /* color-scheme enables light-dark() and steers forced-colors palette
       selection (WCAG 1.4.11). HA's active theme drives the resolution. */
    color-scheme: light dark;
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
`,Ve=r`
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
`,Ze=r`
  :host {
    /* color-scheme enables light-dark() and steers forced-colors palette
       selection (WCAG 1.4.11). HA's active theme drives the resolution. */
    color-scheme: light dark;
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
`,Ye=[We,Be,je,Ge],Ke=[We,Be,je,Ze];function qe(e){const t=e.electricityType??[];return t.some(e=>"DC"===e||e?.startsWith("DC"))?"dc":t.some(e=>e?.startsWith("AC"))?"ac":null}function Je(e){return(e??"").toUpperCase().replace(/_/g,"")}function Xe(e){const t=Je(e);return"AVAILABLE"===t?"ok":"CHARGING"===t||"OCCUPIED"===t||"RESERVED"===t||"BLOCKED"===t?"busy":"OUTOFORDER"===t||"FAULTED"===t||"INOPERATIVE"===t||"UNAVAILABLE"===t?"warn":"UNKNOWN"===t?"unknown":"empty"}function Qe(e){if(!e)return"";const t={AVAILABLE:"available",CHARGING:"charging",OCCUPIED:"occupied",RESERVED:"reserved",BLOCKED:"blocked",OUTOFORDER:"out_of_order",FAULTED:"faulted",INOPERATIVE:"inoperative",UNAVAILABLE:"unavailable",OUTOFSTOCK:"out_of_stock",PLANNED:"planned",REMOVED:"removed",UNKNOWN:"unknown"}[Je(e)];if(!t)return e;const i=`card.point_status_${t}`,a=Ne(i);return a===i?e:a}function et(e){const t=Xe(e.status),i=function(e){switch(Je(e)){case"OUTOFORDER":case"FAULTED":case"INOPERATIVE":case"UNAVAILABLE":return{icon:"mdi:wrench",tone:"warning"};case"OUTOFSTOCK":return{icon:"mdi:battery-off-outline",tone:"warning",bgTint:"warning"};case"PLANNED":return{icon:"mdi:progress-wrench",tone:"info",bgTint:"info"};case"REMOVED":return{icon:"mdi:close-circle-outline",tone:"error",bgTint:"error"};case"UNKNOWN":return{icon:"mdi:help-circle-outline",tone:"muted"};default:return null}}(e.status);return{bucket:t,isAvailable:"ok"===t,isBusy:"busy"===t,isWarn:"warn"===t,overlay:i,showCar:"busy"===t&&null===i,showOverlayIcon:null!==i}}function tt(e){if(null==e||!Number.isFinite(e))return"–";try{return new Intl.NumberFormat("de-AT",{minimumFractionDigits:0,maximumFractionDigits:1}).format(e)}catch{return String(e).replace(".",",")}}function it(e){const t=e/100;try{return new Intl.NumberFormat("de-AT",{minimumFractionDigits:2,maximumFractionDigits:2}).format(t)}catch{return t.toFixed(2)}}function at(e){if(!Number.isFinite(e))return"0";try{return new Intl.NumberFormat("de-AT",{minimumFractionDigits:0,maximumFractionDigits:2}).format(e)}catch{return String(e).replace(".",",")}}function nt(e,t){switch(e){case"TYPE_2_AC":return"Type 2";case"COMBO2_CCS_DC":return"CCS";case"CHADEMO":return"CHAdeMO";case"TYPE_1_AC":return"Type 1";case"TESLA_S":case"TESLA_R":return"Tesla";case"OTHER":return"DOMESTIC_F"===t?"Schuko":t?.startsWith("CEE")?"CEE":t??"?";default:return e?.replace(/_/g," ")??t??"?"}}function ot(e){const t=(e.connectorType??[])[0];return t?nt(t.consumerName,t.key):"–"}function rt(e){return"string"!=typeof e?"":/^https?:\/\//i.test(e)?e:""}function st(e){const t="expandable"===e.type?`editor.section_${e.name}`:`editor.${e.name}`,i=Ne(t);return i===t?e.name:i}const lt=[{name:"entity",required:!0,selector:{entity:{filter:{domain:"sensor",integration:"ladestellen_austria"}}}},{name:"name",selector:{text:{}}},{type:"expandable",name:"display",flatten:!0,schema:[{name:"max_stations",selector:{number:{min:1,max:10,step:1,mode:"slider"}}},{name:"hide_header",selector:{boolean:{}}},{name:"show_hero",selector:{boolean:{}}},{name:"show_pricing",selector:{boolean:{}}},{name:"show_amenities",selector:{boolean:{}}},{name:"sort_by_power",selector:{boolean:{}}},{name:"logo_adapt_to_theme",selector:{boolean:{}}}]},{type:"expandable",name:"filters",flatten:!0,schema:[{name:"only_available",selector:{boolean:{}}},{name:"only_free",selector:{boolean:{}}},{name:"only_open",selector:{boolean:{}}}]}],ct={max_stations:10,hide_header:!1,show_hero:!0,show_pricing:!0,show_amenities:!0,sort_by_power:!1,logo_adapt_to_theme:!1,only_available:!1,only_free:!1,only_open:!1};let dt=class extends se{constructor(){super(...arguments),this._config={type:"ladestellen-austria-card"}}setConfig(e){const t=e.entity&&this.hass?.states[e.entity]?.attributes.friendly_name;this._config="string"==typeof t?{name:t,...e}:{...e}}_formChanged(e){const t=e.detail.value;t&&(this._config=t,ge(this,"config-changed",{config:t}))}_toggleConnector(e){const t=this._config.connector_types??[],i=t.includes(e)?t.filter(t=>t!==e):[...t,e];this._config={...this._config,connector_types:i},ge(this,"config-changed",{config:this._config})}_toggleAmenity(e){const t=this._config.amenities??[],i=t.includes(e)?t.filter(t=>t!==e):[...t,e];this._config={...this._config,amenities:i},ge(this,"config-changed",{config:this._config})}_togglePayment(e){const t=this._config.payment_methods??[],i=t.includes(e)?t.filter(t=>t!==e):[...t,e];this._config={...this._config,payment_methods:i},ge(this,"config-changed",{config:this._config})}_togglePin(e){const t=this._config.pinned_station_ids??[],i=t.includes(e)?t.filter(t=>t!==e):[...t,e];this._config={...this._config,pinned_station_ids:i},ge(this,"config-changed",{config:this._config})}willUpdate(e){super.willUpdate(e),e.has("hass")&&Le(this.hass?.language)}render(){if(!this._config)return B`<p>${Ne("common.loading")}</p>`;const e={...ct,...this._config},t=this._config.connector_types??[],i=this._config.amenities??[],a=this._config.payment_methods??[],n=!!this._config.entity&&!!this.hass&&!this.hass.states[this._config.entity];return B`
      <div class="editor">
        ${this.hass?B`<ha-form
              .hass=${this.hass}
              .data=${e}
              .schema=${lt}
              .computeLabel=${st}
              @value-changed=${this._formChanged}
            ></ha-form>`:G}
        ${n?B`<ha-alert alert-type="error">
              ${Ne("editor.entity_missing")}
            </ha-alert>`:G}

        <div class="editor-section">
          <div class="section-header">
            ${Ne("editor.section_chip_filters")}
          </div>
          <div class="editor-hint">
            ${Ne("editor.connector_filter_hint")}
          </div>
          <div class="chip-row">
            ${me.map(e=>B`
                <button
                  type="button"
                  class=${t.includes(e)?"filter-chip active":"filter-chip"}
                  @click=${()=>this._toggleConnector(e)}
                >
                  ${e}
                </button>
              `)}
          </div>

          <div class="editor-hint">
            ${Ne("editor.amenity_filter_hint")}
          </div>
          <div class="chip-row">
            ${fe.map(e=>B`
                <button
                  type="button"
                  class=${i.includes(e.key)?"filter-chip icon-chip active":"filter-chip icon-chip"}
                  @click=${()=>this._toggleAmenity(e.key)}
                >
                  <ha-icon icon=${e.icon}></ha-icon>
                  <span>${Ne(e.label_key)}</span>
                </button>
              `)}
          </div>

          <div class="editor-hint">
            ${Ne("editor.payment_filter_hint")}
          </div>
          <div class="chip-row">
            ${ve.map(e=>B`
                <button
                  type="button"
                  class=${a.includes(e.key)?"filter-chip icon-chip active":"filter-chip icon-chip"}
                  @click=${()=>this._togglePayment(e.key)}
                >
                  <ha-icon icon=${e.icon}></ha-icon>
                  <span>${Ne(e.label_key)}</span>
                </button>
              `)}
          </div>

          <div class="editor-hint">${Ne("editor.hint_compliance")}</div>
        </div>

        ${this._renderPinSection()}
      </div>
    `}_renderPinSection(){const e=this._config.entity,t=e?this.hass?.states[e]:void 0,i=t?.attributes?.stations??[],a=this._config.pinned_station_ids??[],n=new Set(a),o=new Set(i.map(e=>e.stationId)),r=a.filter(e=>!o.has(e)),s=!0===t?.attributes?.dynamic_mode;return B`
      <div class="editor-section">
        <div class="section-header">${Ne("editor.section_pinned")}</div>
        <div class="editor-hint">${Ne("editor.pin_hint")}</div>

        ${s?B`<div class="editor-hint editor-hint--muted">
              ${Ne("editor.pin_disabled_dynamic")}
            </div>`:e?0===i.length?B`<div class="editor-hint editor-hint--muted">
              ${Ne("editor.pin_no_stations_yet")}
            </div>`:B`
              <div class="pin-list">
                ${i.map(e=>{const t=n.has(e.stationId),i="number"==typeof e.distance?`${e.distance.toFixed(2)} km`:"";return B`
                    <button
                      type="button"
                      class=${t?"pin-row pinned":"pin-row"}
                      @click=${()=>this._togglePin(e.stationId)}
                    >
                      <ha-icon
                        icon=${t?"mdi:pin":"mdi:pin-outline"}
                      ></ha-icon>
                      <span class="pin-label">${e.label}</span>
                      <span class="pin-meta">${i}</span>
                    </button>
                  `})}
              </div>
            `:B`<div class="editor-hint editor-hint--muted">
              ${Ne("editor.pin_select_sensor_first")}
            </div>`}
        ${!s&&r.length>0?B`
              <div class="editor-hint editor-hint--muted">
                ${Ne("editor.pin_orphans_heading")}
              </div>
              <div class="pin-list">
                ${r.map(e=>B`
                    <button
                      type="button"
                      class="pin-row pinned orphan"
                      @click=${()=>this._togglePin(e)}
                    >
                      <ha-icon icon="mdi:pin"></ha-icon>
                      <span class="pin-label orphan-id">${e}</span>
                      <span class="pin-meta">
                        ${Ne("editor.pin_unpin")}
                      </span>
                    </button>
                  `)}
              </div>
            `:G}
      </div>
    `}static{this.styles=Ve}};e([he({attribute:!1})],dt.prototype,"hass",void 0),e([ue()],dt.prototype,"_config",void 0),dt=e([ce("ladestellen-austria-card-editor")],dt);const pt={hide_header:!1,show_free_count:!0,logo_adapt_to_theme:!1,car_color_mode:"random",asphalt_style:"default",paint_width:"medium",icon_paint_mode:"default"},ht=[{name:"entity",required:!0,selector:{entity:{filter:{domain:"sensor",integration:"ladestellen_austria"}}}},{name:"name",selector:{text:{}}}];let ut=class extends se{constructor(){super(...arguments),this._config={type:"ladestellen-austria-parking-card"}}setConfig(e){this._config={...e}}_formChanged(e){const t=e.detail.value;t&&(this._config=t,ge(this,"config-changed",{config:t}))}_appearanceSchema(){const e=this.hass?.language??"";return this._appearanceSchemaCache?.lang!==e&&(this._appearanceSchemaCache={lang:e,schema:[{type:"expandable",name:"appearance",flatten:!0,schema:[{name:"hide_header",selector:{boolean:{}}},{name:"show_free_count",selector:{boolean:{}}},{name:"logo_adapt_to_theme",selector:{boolean:{}}},{name:"car_color_mode",selector:{select:{mode:"dropdown",options:[{value:"random",label:Ne("editor.car_color_random")},{value:"theme",label:Ne("editor.car_color_theme")},{value:"fixed",label:Ne("editor.car_color_fixed")}]}}},{name:"asphalt_style",selector:{select:{mode:"dropdown",options:[{value:"default",label:Ne("editor.asphalt_style_default")},{value:"textured",label:Ne("editor.asphalt_style_textured")}]}}},{name:"paint_width",selector:{select:{mode:"dropdown",options:[{value:"thin",label:Ne("editor.paint_width_thin")},{value:"medium",label:Ne("editor.paint_width_medium")},{value:"wide",label:Ne("editor.paint_width_wide")}]}}},{name:"icon_paint_mode",selector:{select:{mode:"dropdown",options:[{value:"default",label:Ne("editor.icon_paint_default")},{value:"white",label:Ne("editor.icon_paint_white")}]}}}]}]}),this._appearanceSchemaCache.schema}_selectStation(e){const t=this._config.station_id===e?"":e;this._config={...this._config,station_id:t},ge(this,"config-changed",{config:this._config})}_carColorFixedChanged(e){const t=e.target;if(!t)return;const i=t.value;this._config.car_color_fixed!==i&&(this._config={...this._config,car_color_fixed:i},ge(this,"config-changed",{config:this._config}))}willUpdate(e){super.willUpdate(e),e.has("hass")&&Le(this.hass?.language)}render(){if(!this._config)return B`<p>${Ne("common.loading")}</p>`;const e=this._config.entity,t=e?this.hass?.states[e]:void 0,i=t?.attributes?.stations??[],a=this._config.station_id??"",n={...pt,...this._config},o=!!e&&!!this.hass&&!this.hass.states[e];return B`
      <div class="editor">
        ${this.hass?B`<ha-form
              .hass=${this.hass}
              .data=${n}
              .schema=${ht}
              .computeLabel=${st}
              @value-changed=${this._formChanged}
            ></ha-form>`:G}
        ${o?B`<ha-alert alert-type="error">
              ${Ne("editor.entity_missing")}
            </ha-alert>`:G}

        <div class="editor-section">
          <div class="section-header">
            ${Ne("parking.editor_station_heading")}
          </div>
          <div class="editor-hint">
            ${Ne("parking.pick_station_hint")}
          </div>
          ${e?0===i.length?B`<div class="editor-hint editor-hint--muted">
                ${Ne("editor.pin_no_stations_yet")}
              </div>`:B`
                <div class="pin-list">
                  ${i.map(e=>{const t=e.stationId===a,i="number"==typeof e.distance?`${e.distance.toFixed(2)} km`:"";return B`
                      <button
                        type="button"
                        class=${t?"pin-row pinned":"pin-row"}
                        @click=${()=>this._selectStation(e.stationId)}
                      >
                        <ha-icon
                          icon=${t?"mdi:radiobox-marked":"mdi:radiobox-blank"}
                        ></ha-icon>
                        <span class="pin-label">${e.label}</span>
                        <span class="pin-meta">${i}</span>
                      </button>
                    `})}
                </div>
              `:B`<div class="editor-hint editor-hint--muted">
                ${Ne("editor.pin_select_sensor_first")}
              </div>`}
          ${a&&!i.some(e=>e.stationId===a)?B`<div class="editor-hint editor-hint--muted">
                ${Ne("parking.station_not_in_range")}: ${a}
              </div>`:G}
        </div>

        ${this.hass?B`<ha-form
              .hass=${this.hass}
              .data=${n}
              .schema=${this._appearanceSchema()}
              .computeLabel=${st}
              @value-changed=${this._formChanged}
            ></ha-form>`:G}

        ${"fixed"===this._config.car_color_mode?B`<div class="editor-section">
              <div class="section-header">
                ${Ne("editor.car_color_pick")}
              </div>
              <div class="toggle-row">
                <span>${Ne("editor.car_color_pick")}</span>
                <label
                  class="color-swatch"
                  style=${`--swatch-color: ${this._config.car_color_fixed||"#1d4ed8"};`}
                >
                  <ha-icon
                    icon="mdi:palette-swatch-variant"
                    aria-hidden="true"
                  ></ha-icon>
                  <span class="color-swatch-hex"
                    >${(this._config.car_color_fixed||"#1d4ed8").toUpperCase()}</span
                  >
                  <input
                    type="color"
                    class="color-swatch-input"
                    .value=${this._config.car_color_fixed||"#1d4ed8"}
                    aria-label=${Ne("editor.car_color_pick")}
                    @input=${this._carColorFixedChanged}
                    @change=${this._carColorFixedChanged}
                  />
                </label>
              </div>
            </div>`:G}

        <div class="editor-section">
          <div class="editor-hint">${Ne("editor.hint_compliance")}</div>
        </div>
      </div>
    `}static{this.styles=Ve}};e([he({attribute:!1})],ut.prototype,"hass",void 0),e([ue()],ut.prototype,"_config",void 0),ut=e([ce("ladestellen-austria-parking-card-editor")],ut),window.customCards=window.customCards??[],window.customCards.push({type:"ladestellen-austria-parking-card",name:"Ladestellen Austria — Parking",description:"Single station, points rendered as parking slots viewed from above.",preview:!0,documentationURL:"https://github.com/rolandzeiner/ladestellen-austria",getEntitySuggestion:(e,t)=>t.startsWith("sensor.")?"ladestellen_austria"!==e?.entities?.[t]?.platform?null:{config:{type:"custom:ladestellen-austria-parking-card",entity:t}}:null});let gt=class extends se{constructor(){super(...arguments),this._revealedSlots=new Set,this._versionMismatch=null,this._versionCheckDone=!1}static getConfigElement(){return document.createElement("ladestellen-austria-parking-card-editor")}static getStubConfig(e,t){const i=t.find(e=>e.startsWith("sensor.")&&e.includes("ladestelle"));return{entity:i??"",station_id:""}}setConfig(e){if(!e||"object"!=typeof e)throw new Error(Ne("common.invalid_configuration"));if(void 0!==e.entity&&"string"!=typeof e.entity)throw new Error(Ne("common.invalid_entity"));if(void 0!==e.station_id&&"string"!=typeof e.station_id)throw new Error(Ne("common.invalid_station_id"));this.config={hide_header:!1,show_free_count:!0,logo_adapt_to_theme:!1,car_color_mode:"random",asphalt_style:"default",paint_width:"medium",icon_paint_mode:"default",...e}}shouldUpdate(e){if(e.has("config")||e.has("_revealedSlots")||e.has("_versionMismatch"))return!0;const t=e.get("hass");return!t||!this.config.entity||t.states[this.config.entity]!==this.hass.states[this.config.entity]}getCardSize(){return 3}getGridOptions(){return{columns:6,rows:"auto",min_columns:4,min_rows:3}}willUpdate(e){super.willUpdate(e),e.has("hass")&&Le(this.hass?.language)}firstUpdated(e){this._maybeRunVersionCheck()}updated(e){super.updated(e),e.has("hass")&&this._maybeRunVersionCheck()}_maybeRunVersionCheck(){!this._versionCheckDone&&this.hass&&(this._versionCheckDone=!0,Ue(this.hass).then(e=>{this.isConnected&&e&&(this._versionMismatch=e)}))}render(){if(!this.hass||!this.config)return B`<ha-card>
        <div class="card-content">
          <div
            class="wrap"
            data-asphalt-style=${this.config?.asphalt_style??"default"}
            data-paint-width=${this.config?.paint_width??"medium"}
            data-icon-paint=${this.config?.icon_paint_mode??"default"}
          >
            ${Fe(this._versionMismatch)}
            <div class="empty-state">${Ne("common.loading")}</div>
          </div>
        </div>
      </ha-card>`;const e=this.config.entity?this.hass.states[this.config.entity]:void 0;if(!e)return B`<ha-card>
        <div class="card-content">
          <div
            class="wrap"
            data-asphalt-style=${this.config.asphalt_style??"default"}
            data-paint-width=${this.config.paint_width??"medium"}
            data-icon-paint=${this.config.icon_paint_mode??"default"}
          >
            ${Fe(this._versionMismatch)}
            <div class="empty-state">${Ne("card.no_entity")}</div>
          </div>
          ${He(this.hass,void 0,!0===this.config?.logo_adapt_to_theme)}
        </div>
      </ha-card>`;const t=e.attributes.stations??[],i=this.config.station_id??"",a=t.find(e=>e.stationId===i),n=this.config.name;if(!i||!a)return B`<ha-card>
        <div class="card-content">
          <div
            class="wrap"
            data-asphalt-style=${this.config.asphalt_style??"default"}
            data-paint-width=${this.config.paint_width??"medium"}
            data-icon-paint=${this.config.icon_paint_mode??"default"}
          >
            ${Fe(this._versionMismatch)}
            ${n&&!this.config.hide_header?B`<header class="header">
                  <div class="icon-tile" aria-hidden="true">
                    <ha-icon icon="mdi:ev-station"></ha-icon>
                  </div>
                  <div class="header-text">
                    <h3 class="title">${n}</h3>
                  </div>
                </header>`:G}
            <div class="empty-state">
              ${Ne(i?"parking.station_not_found":"parking.no_station_selected")}
            </div>
          </div>
          ${He(this.hass,e.attributes.attribution,!0===this.config.logo_adapt_to_theme)}
        </div>
      </ha-card>`;const o=a.points??[],r=o.filter(e=>"ok"===Xe(e.status)).length,s=o.length,l=Ne("parking.available_count").replaceAll("{avail}",String(r)).replaceAll("{total}",String(s)),c=n??a.label,d=n?a.label:"";return B`
      <ha-card>
        <div class="card-content">
          <div
            class="wrap"
            style="--lade-accent: var(--primary-color);"
            data-asphalt-style=${this.config.asphalt_style??"default"}
            data-paint-width=${this.config.paint_width??"medium"}
            data-icon-paint=${this.config.icon_paint_mode??"default"}
          >
            ${Fe(this._versionMismatch)}
            ${this.config.hide_header?G:B`<header class="header">
                  <div class="icon-tile" aria-hidden="true">
                    <ha-icon icon="mdi:ev-station"></ha-icon>
                  </div>
                  <div class="header-text">
                    <h3 class="title">${c}</h3>
                    ${d?B`<p class="subtitle">${d}</p>`:G}
                  </div>
                  ${!1!==this.config.show_free_count?B`<div
                        class=${r>0?"header-count has-free":"header-count"}
                        aria-label=${l}
                      >
                        <div class="header-count-value">
                          <span
                            class="header-count-num"
                            role="status"
                            aria-live="polite"
                            >${r}</span
                          >
                          <span class="header-count-of">/ ${s}</span>
                        </div>
                        <div class="header-count-label">
                          ${Ne("parking.slot_status_free")}
                        </div>
                      </div>`:G}
                </header>`}
            ${0===o.length?B`<div class="empty-state">
                  ${Ne("parking.no_points")}
                </div>`:B`<div class="rack-block">
                  <div
                    class="parking-lot"
                    role="list"
                    aria-label=${l}
                  >
                    ${o.map(e=>this._renderSlot(e))}
                  </div>
                </div>`}
          </div>
          ${He(this.hass,e.attributes.attribution,!0===this.config.logo_adapt_to_theme)}
        </div>
      </ha-card>
    `}_renderSlot(e){const t=et(e),{bucket:i,isAvailable:a,isBusy:n,isWarn:o,overlay:r,showCar:s,showOverlayIcon:l}=t,c=qe(e),d=ot(e),p=tt(e.capacityKw),h=Qe(e.status),u=this._slotStatusBucket(i),g={AVAILABLE:"free",CHARGING:"busy",OCCUPIED:"busy",RESERVED:"reserved",BLOCKED:"blocked",OUTOFORDER:"out_of_order",FAULTED:"faulted",INOPERATIVE:"inoperative",UNAVAILABLE:"unavailable",OUTOFSTOCK:"out_of_stock",PLANNED:"planned",REMOVED:"removed",UNKNOWN:"unknown"}[Je(e.status)]??"unknown";const m=s||l,f=m&&this._revealedSlots.has(e.evseId),v=a?"is-available":n?"is-busy":o?"is-warn":"is-unknown",_=[c?c.toUpperCase():null,e.capacityKw?`${p} kW`:null,d&&"–"!==d?d:null,h].filter(Boolean).join(" · "),b=s?this._carColor(e.evseId):null,y=["parking-slot",v,m?"has-overlay":"",s?"has-car":"",l?"has-icon":"",r?.bgTint?`slot-tint-${r.bgTint}`:"",f?"is-revealed":""].filter(Boolean).join(" ");return B`
      <button
        type="button"
        class=${y}
        data-status=${i}
        role="listitem"
        tabindex=${m?"0":"-1"}
        aria-label=${_}
        aria-pressed=${m?f?"true":"false":G}
        title=${`${e.evseId??""} · ${h}`.trim()}
        @click=${t=>{t.preventDefault(),m&&this._toggleSlot(e.evseId)}}
      >
        ${s&&b?B`<span
              class="slot-car"
              aria-hidden="true"
              style=${`--slot-car-color: ${b};`}
            >
              ${B`
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
  `}
            </span>`:G}
        ${r?B`<span
              class="slot-overlay-icon tone-${r.tone}"
              aria-hidden="true"
            >
              <ha-icon icon=${r.icon}></ha-icon>
            </span>`:G}
        <span class="slot-inner">
          ${c?B`<span
                class="slot-power-badge"
                data-type=${c}
                >${c.toUpperCase()}</span
              >`:G}
          <span class="slot-kw">
            <span class="slot-kw-num">${p}</span
            ><span class="slot-kw-unit">kW</span>
          </span>
          <span class="slot-connector">${d}</span>
          <span class="slot-status-word slot-status-${u}"
            >${this._slotStatusWord(g,h)}</span
          >
        </span>
      </button>
    `}_slotStatusBucket(e){switch(e){case"ok":return"free";case"busy":return"busy";case"warn":return"warn";default:return"unknown"}}_slotStatusWord(e,t){const i=`parking.slot_status_${e}`,a=Ne(i);return a===i?t:a}_toggleSlot(e){if(!e)return;const t=new Set(this._revealedSlots);t.has(e)?t.delete(e):t.add(e),this._revealedSlots=t}_carColor(e){const t=this.config?.car_color_mode??"random";if("theme"===t)return"var(--primary-color)";if("fixed"===t)return this.config?.car_color_fixed||"var(--primary-color)";const i=["#e63946","#1d4ed8","#15803d","#facc15","#fb923c","#ec4899","#0e7490","#6b21a8","#1f2937","#e5e7eb"],a=e??"";let n=0;for(let e=0;e<a.length;e++)n=31*n+a.charCodeAt(e)>>>0;return i[n%i.length]??"#1f2937"}static{this.styles=Ke}};e([he({attribute:!1})],gt.prototype,"hass",void 0),e([ue()],gt.prototype,"config",void 0),e([ue()],gt.prototype,"_revealedSlots",void 0),e([ue()],gt.prototype,"_versionMismatch",void 0),gt=e([ce("ladestellen-austria-parking-card")],gt),window.customCards=window.customCards??[],window.customCards.push({type:"ladestellen-austria-card",name:"Ladestellen Austria",description:"Nearby EV charging stations, powered by E-Control Austria",preview:!0,documentationURL:"https://github.com/rolandzeiner/ladestellen-austria",getEntitySuggestion:(e,t)=>t.startsWith("sensor.")?"ladestellen_austria"!==e?.entities?.[t]?.platform?null:{config:{type:"custom:ladestellen-austria-card",entity:t}}:null});const mt={MONDAY:0,TUESDAY:1,WEDNESDAY:2,THURSDAY:3,FRIDAY:4,SATURDAY:5,SUNDAY:6},ft={Mon:0,Tue:1,Wed:2,Thu:3,Fri:4,Sat:5,Sun:6};let vt=class extends se{constructor(){super(...arguments),this._expanded=new Set,this._versionMismatch=null,this._versionCheckDone=!1}static getConfigElement(){return document.createElement("ladestellen-austria-card-editor")}static getStubConfig(e,t){const i=t.find(e=>e.startsWith("sensor.")&&e.includes("ladestelle"));return{entity:i??""}}setConfig(e){if(!e||"object"!=typeof e)throw new Error(Ne("common.invalid_configuration"));if(void 0!==e.entity&&"string"!=typeof e.entity)throw new Error(Ne("common.invalid_entity"));this.config={name:"Ladestellen Austria",max_stations:10,show_hero:!0,show_amenities:!0,show_pricing:!0,sort_by_power:!1,logo_adapt_to_theme:!1,only_available:!1,only_free:!1,only_open:!1,connector_types:[],amenities:[],payment_methods:[],pinned_station_ids:[],...e}}shouldUpdate(e){if(e.has("config")||e.has("_expanded")||e.has("_versionMismatch"))return!0;const t=e.get("hass");return!t||!this.config.entity||t.states[this.config.entity]!==this.hass.states[this.config.entity]}getCardSize(){const e=this.config?.max_stations??10;return Math.min(3+Math.ceil(e/3),10)}getGridOptions(){return{columns:12,rows:"auto",min_columns:6,min_rows:3}}willUpdate(e){super.willUpdate(e),e.has("hass")&&Le(this.hass?.language)}firstUpdated(e){this._maybeRunVersionCheck()}updated(e){super.updated(e),e.has("hass")&&this._maybeRunVersionCheck()}_maybeRunVersionCheck(){!this._versionCheckDone&&this.hass&&(this._versionCheckDone=!0,Ue(this.hass).then(e=>{this.isConnected&&e&&(this._versionMismatch=e)}))}render(){if(!this.config||!this.hass)return B`<ha-card>
        <div class="card-content">
          <div class="wrap">
            <div class="empty-state">${Ne("common.loading")}</div>
          </div>
        </div>
      </ha-card>`;const e=this.config.entity?this.hass.states[this.config.entity]:void 0;if(!e)return B`
        <ha-card>
          <div class="card-content">
            <div class="wrap">
              <div class="empty-state">${Ne("card.no_entity")}</div>
            </div>
            ${He(this.hass,void 0,!0===this.config?.logo_adapt_to_theme)}
          </div>
        </ha-card>
      `;const t=e.attributes.stations??[],i=!0===e.attributes.live_status_available,a=!0===e.attributes.dynamic_mode,n=e.attributes.dynamic_entity??null,o=a?[]:this.config.pinned_station_ids??[],r=this._collectPinnedItems(o,t),s=new Set(r.filter(e=>"live"===e.kind).map(e=>e.stationId)),l=t.filter(e=>!s.has(e.stationId)),c=this._filterStations(l),d=this._sortStations(c),p=t[0],h=Math.max(1,this.config.max_stations??10),u=[...r,...d.map(e=>({kind:"live",station:e}))],g=u.slice(0,h),m=g.filter(e=>"live"===e.kind).map(e=>e.station),f=m.length>0?m[m.length-1]:void 0,v=!1!==this.config.show_hero,_=this.config.name&&this.config.name.trim()?this.config.name:"Ladestellen Austria",b=p?this._heroCity(p):"";return B`
      <ha-card>
        <div class="card-content">
          <div class="wrap">
            ${Fe(this._versionMismatch)}
            ${this.config.hide_header?G:B`<header class="header">
                  <div class="icon-tile" aria-hidden="true">
                    <ha-icon icon="mdi:ev-station"></ha-icon>
                  </div>
                  <div class="header-text">
                    <h2 class="title">${_}</h2>
                    ${b?B`<p class="subtitle">${b}</p>`:G}
                  </div>
                </header>`}
            ${v?this._renderHero(p,f,c.length,t.length):G}
            ${a&&n?B`<div class="flags">
                  <span class="flag">
                    <ha-icon
                      icon="mdi:crosshairs-gps"
                      aria-hidden="true"
                    ></ha-icon>
                    <span
                      >${Ne("card.dynamic_follows_entity").replace("{entity}",n)}</span
                    >
                  </span>
                </div>`:G}
            ${g.length>0?B`<ul class="stations" role="list">
                  ${g.map(e=>"live"===e.kind?this._renderStation(e.station,i,s.has(e.station.stationId)):this._renderOrphanPin(e.id))}
                </ul>`:B`<div class="empty-state">
                  ${Ne("card.no_stations")}
                </div>`}
          </div>
          ${He(this.hass,e.attributes.attribution,!0===this.config.logo_adapt_to_theme)}
        </div>
      </ha-card>
    `}_sortStations(e){return[...e].sort((e,t)=>{if(this.config.sort_by_power){const i=Math.max(0,...(e.points??[]).map(e=>e.capacityKw??0)),a=Math.max(0,...(t.points??[]).map(e=>e.capacityKw??0));if(a!==i)return a-i}else{const i=e.distance??1/0,a=t.distance??1/0;if(i!==a)return i-a}const i=this._stationHasFree(e);return i!==this._stationHasFree(t)?i?-1:1:(e.distance??1/0)-(t.distance??1/0)})}_stationHasFree(e){return"ACTIVE"===e.stationStatus&&(e.points??[]).some(e=>"AVAILABLE"===Je(e.status))}_collectPinnedItems(e,t){const i=new Map(t.map(e=>[e.stationId,e])),a=new Set,n=[];for(const t of e){if(a.has(t))continue;a.add(t);const e=i.get(t);e?n.push({kind:"live",station:e,stationId:e.stationId}):n.push({kind:"orphan",id:t})}return n}_unpinStation(e){const t=(this.config.pinned_station_ids??[]).filter(t=>t!==e);ge(this,"config-changed",{config:{...this.config,pinned_station_ids:t}})}_renderOrphanPin(e){return B`
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
                >${Ne("card.orphan_pin_title")}</span
              >
            </div>
            <div class="orphan-id">${e}</div>
          </div>
          <div class="station-actions">
            <ha-icon-button
              .label=${Ne("card.unpin")}
              @click=${t=>{t.stopPropagation(),this._unpinStation(e)}}
            >
              <ha-icon icon="mdi:close"></ha-icon>
            </ha-icon-button>
          </div>
        </div>
      </li>
    `}_filterStations(e){const t=this.config.only_available??!1,i=this.config.only_free??!1,a=this.config.only_open??!1,n=this.config.connector_types??[],o=this.config.amenities??[],r=this.config.payment_methods??[];if(!t&&!i&&!a&&0===n.length&&0===o.length&&0===r.length)return e;const s=new Date,l=this.hass?.config?.time_zone??"Europe/Vienna";return e.filter(e=>{if(t){const t="ACTIVE"===e.stationStatus&&(e.points??[]).some(e=>"AVAILABLE"===Je(e.status));if(!t)return!1}if(i){const t=(e.points??[]).some(e=>e.freeOfCharge);if(!t)return!1}if(a){if(!1===this._isOpenNow(e.openingHours,s,l))return!1}if(n.length>0){const t=new Set((e.points??[]).flatMap(e=>(e.connectorType??[]).map(e=>nt(e.consumerName,e.key)))),i=n.some(e=>t.has(e));if(!i)return!1}if(o.length>0){if(!o.every(t=>this._stationHasAmenity(e,t)))return!1}if(r.length>0){const t=new Set((e.points??[]).flatMap(e=>e.authenticationMode??[])),i=r.some(e=>t.has(e));if(!i)return!1}return!0})}_stationHasAmenity(e,t){switch(t){case"green_energy":return Boolean(e.greenEnergy);case"austrian_ecolabel":return Boolean(e.austrianEcoLabel);case"free_parking":return Boolean(e.freeParking);case"roofed_parking":return Boolean(e.roofedParking);case"illuminated_parking":return Boolean(e.illuminatedParking);case"barrier_free":return(e.barrierFreeParkingPlaces??0)>0;case"catering":return Boolean(e.cateringService);case"bathrooms":return Boolean(e.bathroomsAvailable);case"resting":return Boolean(e.restingFacilities);default:return!1}}_renderHero(e,t,i,a){if(!e)return B`<section class="hero hero--empty">
        <span aria-live="polite">${Ne("card.no_stations")}</span>
      </section>`;const n=this._formatKm(e.distance),o=this._heroCity(e),r=t?this._formatKm(t.distance):n,s=Ne("card.hero_range").replaceAll("{min}",this._formatKm(e.distance)).replaceAll("{max}",r),l=i===a?Ne("card.hero_count").replaceAll("{count}",String(i)):Ne("card.hero_count_filtered").replaceAll("{filtered}",String(i)).replaceAll("{total}",String(a));return B`
      <section class="hero">
        <div class="metric">
          <div class="metric-value">
            <span class="metric-num" aria-live="polite">${n}</span>
            <span class="metric-of">km</span>
          </div>
          <div class="metric-label">${o}</div>
        </div>
        <div class="chip-row">
          <span class="chip">${s}</span>
          <span class="chip muted">${l}</span>
        </div>
      </section>
    `}_heroCity(e){return e.city||e.label||""}_renderStation(e,t,i=!1){const a=e.points??[],n=a.some(e=>(e.electricityType??[]).includes("DC")),o=a.reduce((e,t)=>Math.max(e,t.capacityKw??0),0),r=Array.from(new Set(a.flatMap(e=>(e.connectorType??[]).map(e=>nt(e.consumerName,e.key))))),s=r.slice(0,3),l=r.length-s.length,c=this._priceText(a),d=a.some(e=>e.freeOfCharge),p=a.length,h=a.filter(e=>"AVAILABLE"===Je(e.status)).length,u="ACTIVE"===e.stationStatus,g=this.hass?.config?.time_zone??"Europe/Vienna",m=this._isOpenNow(e.openingHours,new Date,g),f=this._statusLevel(t,u,a,m),v=this._expanded.has(e.stationId),_=e.location,b=_?rt(`https://www.google.com/maps/search/?api=1&query=${_.lat},${_.lon}`):"",y=this.config?.show_amenities??!0,w=this.config?.show_pricing??!0,x=["station",v?"expanded":"",i?"is-pinned":"","inactive"===f?"is-inactive":""].filter(Boolean).join(" "),k=[[e.postCode,e.city].filter(Boolean).join(" "),Number.isFinite(e.distance)?`${this._formatKm(e.distance)} km`:""].filter(Boolean).join(" · "),$=`station-panel-${e.stationId}`;return B`
      <li
        class=${x}
        @click=${()=>this._toggle(e.stationId)}
        @keydown=${t=>this._onKey(t,e.stationId)}
        tabindex="0"
        role="button"
        aria-expanded=${v?"true":"false"}
        aria-controls=${$}
      >
        <div class="station-body">
          <span
            class=${`status-dot status-${f}`}
            role="img"
            aria-label=${this._statusAria(f,h,p)}
          ></span>
          <div class="station-main">
            <div class="row-primary">
              ${o>0?B`<span class=${n?"metric-kw dc":"metric-kw"}>
                    <span class="kw-num">${o}</span
                    ><span class="kw-unit">kW</span>
                  </span>`:G}
              ${w&&c?B`<span
                    class=${d?"metric-price free":"metric-price"}
                    >${c}</span
                  >`:G}
              ${s.map(e=>B`<span class="chip muted">${e}</span>`)}
              ${l>0?B`<span class="chip muted">+${l}</span>`:G}
              ${i?B`<span class="chip pin" title=${Ne("card.pinned")}>
                    <ha-icon icon="mdi:pin" aria-hidden="true"></ha-icon>
                    <span>${Ne("card.pinned")}</span>
                  </span>`:G}
            </div>
            <div class="row-secondary">
              <span class="station-name" lang="de">${e.label}</span>
              ${k?B`<span class="station-loc" lang="de">${k}</span>`:G}
            </div>
          </div>
          <div class="station-actions">
            ${b?B`<a
                  class="icon-action"
                  href=${b}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label=${`${Ne("card.open_in_maps")}: ${e.label}`}
                  title=${Ne("card.open_in_maps")}
                  @click=${e=>e.stopPropagation()}
                >
                  <ha-icon
                    icon="mdi:map-marker-outline"
                    aria-hidden="true"
                  ></ha-icon>
                </a>`:G}
            <ha-icon
              class="chevron"
              icon="mdi:chevron-down"
              aria-hidden="true"
            ></ha-icon>
          </div>
        </div>
        ${this._renderStationDetail(e,m,y,b,v,$)}
      </li>
    `}_renderStationDetail(e,t,i,a,n,o){const r=this._amenityItems(e),s=e.points??[],l=this._address(e),c=this._paymentChips(s),d=this._feesLine(s),p=e.operatorName||e.owner||"";return B`
      <div
        class="detail"
        id=${o}
        role="region"
        aria-hidden=${n?"false":"true"}
        ?inert=${!n}
      >
        <div class="detail-inner">
        ${p?B`<div class="operator-line">
              <span class="detail-label">
                ${Ne("card.operator_heading")}
              </span>
              <span class="operator-name" lang="de">${p}</span>
            </div>`:G}
        ${e.description?B`<div class="station-note">
              <ha-icon
                icon="mdi:information-outline"
                aria-hidden="true"
              ></ha-icon>
              <span>${e.description}</span>
            </div>`:G}
        ${s.length>0?B`<div class="rack-block">
              <div class="detail-label">
                ${Ne("card.charging_points_heading")}
              </div>
              ${this._renderRack(s)}
              ${d?B`<div class="fees-line">${d}</div>`:G}
            </div>`:G}
        ${this._renderOpeningHoursSection(e.openingHours,t)}
        ${c.length>0?B`<div class="detail-section">
              <div class="detail-label">
                ${Ne("card.payment_heading")}
              </div>
              <div class="chip-row">
                ${c.map(e=>B`
                    <span class="chip muted" title=${e.label}>
                      <ha-icon icon=${e.icon} aria-hidden="true"></ha-icon>
                      <span>${e.label}</span>
                    </span>
                  `)}
              </div>
            </div>`:G}
        ${i&&r.length>0?B`<div class="detail-section">
              <div class="detail-label">
                ${Ne("card.amenities_heading")}
              </div>
              <div class="chip-row">
                ${r.map(e=>B`
                    <span class="chip muted" title=${e.label}>
                      <ha-icon icon=${e.icon} aria-hidden="true"></ha-icon>
                      <span>${e.label}</span>
                    </span>
                  `)}
              </div>
            </div>`:G}
        ${l?B`<div class="detail-section">
              <div class="detail-label">
                ${Ne("card.address_heading")}
              </div>
              <div class="detail-text" lang="de">${l}</div>
            </div>`:G}
        <div class="actions">
          ${a?B`<a
                class="btn-primary"
                href=${a}
                target="_blank"
                rel="noopener noreferrer"
                @click=${e=>e.stopPropagation()}
              >
                <ha-icon
                  icon="mdi:map-marker-radius-outline"
                  aria-hidden="true"
                ></ha-icon>
                <span>${Ne("card.open_in_maps")}</span>
              </a>`:G}
          ${(()=>{const t=rt(e.website);return t?B`<a
                  class="btn-secondary"
                  href=${t}
                  target="_blank"
                  rel="noopener noreferrer"
                  @click=${e=>e.stopPropagation()}
                >
                  <ha-icon icon="mdi:web" aria-hidden="true"></ha-icon>
                  <span>${Ne("card.website")}</span>
                </a>`:G})()}
          ${e.phoneNumber?B`<a
                class="btn-secondary"
                href=${`tel:${e.phoneCountryCode??""}${e.phoneNumber}`}
                @click=${e=>e.stopPropagation()}
              >
                <ha-icon icon="mdi:phone-outline" aria-hidden="true"></ha-icon>
                <span>${Ne("card.call")}</span>
              </a>`:G}
          ${(()=>{const t=rt(e.priceUrl);return t?B`<a
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
                  <span>${Ne("card.tariff")}</span>
                </a>`:G})()}
        </div>
        </div>
      </div>
    `}_renderRack(e){return B`
      <div class="rack">
        ${e.map(e=>this._renderRackSlot(e))}
      </div>
    `}_renderRackSlot(e){const t=qe(e),{bucket:i,overlay:a}=et(e),n=this._pointTooltip(e),o=this._pointAriaLabel(e,t),r=t?B`<span class="power-badge" data-type=${t}
          >${t.toUpperCase()}</span
        >`:G;if(a){const e=a.bgTint?`rack-slot slot-tint-${a.bgTint}`:"rack-slot";return B`
        <div
          class=${e}
          role="group"
          aria-label=${o}
          data-status=${i}
          title=${n}
        >
          <ha-icon
            class=${`rack-overlay-icon tone-${a.tone}`}
            icon=${a.icon}
          ></ha-icon>
        </div>
      `}const s=ot(e),l=tt(e.capacityKw);return B`
      <div
        class="rack-slot"
        role="group"
        aria-label=${o}
        data-status=${i}
        title=${n}
      >
        <span class="rack-dot" data-status=${i}></span>
        ${r}
        <span class="rack-kw">
          <span class="rack-kw-num">${l}</span
          ><span class="rack-kw-unit">kW</span>
        </span>
        <span class="rack-connector">${s}</span>
      </div>
    `}_pointAriaLabel(e,t){const i=[];t&&i.push(t.toUpperCase()),e.capacityKw&&i.push(`${tt(e.capacityKw)} kW`);const a=ot(e);a&&"–"!==a&&i.push(a);const n=Qe(e.status);return n&&i.push(n),i.join(" · ")}_pointTooltip(e){const t=[`${e.evseId??""} · ${Qe(e.status)}`.trim()],i=e.startFeeCent??0;i>0&&t.push(`${Ne("card.start_fee_label")}: ${it(i)} €`);const a=e.blockingFeeCentMin??0,n=e.blockingFeeFromMinute??0;return a>0&&n>0&&t.push(`${at(a)} ${Ne("card.blocking_fee_label").replaceAll("{from}",String(n))}`),t.join(" · ")}_renderOpeningHoursSection(e,t){if(!e||0===e.length)return G;const i=this._formatOpeningHours(e);if(0===i.length)return G;const a=!0===t?"flag ok":!1===t?"flag warn":null,n=!0===t?"mdi:clock-check-outline":!1===t?"mdi:clock-alert-outline":null,o=!0===t?Ne("card.open_now"):!1===t?Ne("card.closed_now"):null;return B`
      <div class="detail-section">
        <div class="detail-label">
          ${Ne("card.opening_hours_heading")}
        </div>
        <div class="hours-row">
          <dl class="hours-lines">
            ${i.map(e=>B`<div class="hours-line">
                <dt class="hours-day">${e.day}</dt>
                <dd class="hours-time">${e.time}</dd>
              </div>`)}
          </dl>
          ${o&&a&&n?B`<span class=${a}>
                <ha-icon icon=${n} aria-hidden="true"></ha-icon>
                <span>${o}</span>
              </span>`:G}
        </div>
      </div>
    `}_formatOpeningHours(e){const t=[];for(const i of e){const e=this._formatSingleRange(i);e&&t.push(e)}return t}_formatSingleRange(e){const t=this._shortDay(e.fromWeekday),i=this._shortDay(e.toWeekday);if(!t||!i)return null;const a="00:00"===e.fromTime&&("23:59"===e.toTime||"24:00"===e.toTime);return{day:e.fromWeekday===e.toWeekday?t:`${t}–${i}`,time:a?Ne("card.always_open_short"):`${e.fromTime}–${e.toTime}`}}_shortDay(e){switch((e??"").toUpperCase()){case"MONDAY":return Ne("weekday.mo");case"TUESDAY":return Ne("weekday.tu");case"WEDNESDAY":return Ne("weekday.we");case"THURSDAY":return Ne("weekday.th");case"FRIDAY":return Ne("weekday.fr");case"SATURDAY":return Ne("weekday.sa");case"SUNDAY":return Ne("weekday.su");default:return""}}_isOpenNow(e,t,i){if(!e||0===e.length)return null;const a=this._minuteOfWeek(t,i);if(null==a)return null;for(const t of e){const e=this._hoursToMow(t.fromWeekday,t.fromTime),i=this._hoursToMow(t.toWeekday,t.toTime);if(null!=e&&null!=i)if(e<=i){if(a>=e&&a<=i)return!0}else if(a>=e||a<=i)return!0}return!1}_minuteOfWeek(e,t){try{const i=new Intl.DateTimeFormat("en-US",{timeZone:t,weekday:"short",hour:"2-digit",minute:"2-digit",hour12:!1}).formatToParts(e),a=i.find(e=>"weekday"===e.type)?.value??"",n=i.find(e=>"hour"===e.type)?.value??"",o=i.find(e=>"minute"===e.type)?.value??"",r=ft[a];if(void 0===r)return null;let s=parseInt(n,10);const l=parseInt(o,10);return Number.isFinite(s)&&Number.isFinite(l)?(24===s&&(s=0),1440*r+60*s+l):null}catch{return null}}_hoursToMow(e,t){const i=mt[(e??"").toUpperCase()];if(void 0===i)return null;const[a,n]=(t??"").split(":"),o=parseInt(a??"",10),r=parseInt(n??"",10);return Number.isFinite(o)&&Number.isFinite(r)?1440*i+60*o+r:null}_paymentChips(e){const t=new Set,i=[];for(const a of e)for(const e of a.authenticationMode??[]){if(t.has(e))continue;t.add(e);const a=this._authLabel(e);a&&i.push(a)}return i}_authLabel(e){switch(e){case"APP":return{icon:"mdi:cellphone",label:Ne("auth.app")};case"QR":return{icon:"mdi:qrcode",label:Ne("auth.qr")};case"RFID_READER":return{icon:"mdi:credit-card-wireless-outline",label:Ne("auth.rfid")};case"CHARGING_CONTRACT":return{icon:"mdi:handshake-outline",label:Ne("auth.contract")};case"DEBIT_CARD":return{icon:"mdi:credit-card-outline",label:Ne("auth.debit")};case"CREDIT_CARD":return{icon:"mdi:credit-card",label:Ne("auth.credit")};case"CONTACTLESS_CARD_SUPPORT":return{icon:"mdi:contactless-payment",label:Ne("auth.contactless")};default:return null}}_feesLine(e){const t=e.map(e=>e.startFeeCent??0).filter(e=>e>0),i=e.map(e=>({cent:e.blockingFeeCentMin??0,fromMin:e.blockingFeeFromMinute??0})).filter(e=>e.cent>0&&e.fromMin>0),a=[];if(t.length>0){const e=Math.max(...t);a.push(`+ ${it(e)} € ${Ne("card.start_fee_label")}`)}if(i.length>0){const e=Math.max(...i.map(e=>e.cent)),t=Math.min(...i.map(e=>e.fromMin));a.push(`${at(e)} ${Ne("card.blocking_fee_label").replaceAll("{from}",String(t))}`)}return a.length>0?a.join(", "):null}_statusLevel(e,t,i,a=null){if(!t)return"inactive";if(!1===a)return"inactive";const n=i.length;if(!e||0===n)return"unknown";let o=0,r=0,s=0;for(const e of i){const t=Je(e.status);"AVAILABLE"===t?o++:"CHARGING"===t||"OCCUPIED"===t||"RESERVED"===t||"BLOCKED"===t?r++:"OUTOFORDER"!==t&&"FAULTED"!==t&&"INOPERATIVE"!==t&&"UNAVAILABLE"!==t||s++}return 0===o?0===r&&s>0?"inactive":"busy":o<n?"partial":"ok"}_statusAria(e,t,i){return"inactive"===e?Ne("card.inactive"):"unknown"===e?Ne("card.status_unknown"):`${t} / ${i} ${Ne("card.live_suffix")}`}_toggle(e){const t=new Set(this._expanded);t.has(e)?t.delete(e):t.add(e),this._expanded=t}_onKey(e,t){"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),this._toggle(t))}_priceText(e){if(0===e.length)return"";if(e.some(e=>e.freeOfCharge))return Ne("card.gratis");const t=e.filter(e=>!e.freeOfCharge&&e.priceCentKwh>0).map(e=>e.priceCentKwh);if(t.length>0)return`${it(Math.min(...t))} €/kWh`;const i=e.filter(e=>!e.freeOfCharge&&e.priceCentMin>0).map(e=>e.priceCentMin);return i.length>0?`${it(Math.min(...i))} €/min`:""}_address(e){const t=[];e.street&&t.push(e.street);const i=[e.postCode,e.city].filter(Boolean).join(" ");return i&&t.push(i),t.join(", ")}_amenityItems(e){return[{flag:e.greenEnergy,icon:"mdi:leaf",label:Ne("amenities.green_energy")},{flag:e.austrianEcoLabel,icon:"mdi:certificate-outline",label:Ne("amenities.austrian_ecolabel")},{flag:e.freeParking,icon:"mdi:parking",label:Ne("amenities.free_parking")},{flag:e.roofedParking,icon:"mdi:home-roof",label:Ne("amenities.roofed_parking")},{flag:e.illuminatedParking,icon:"mdi:lightbulb-outline",label:Ne("amenities.illuminated_parking")},{flag:(e.barrierFreeParkingPlaces??0)>0,icon:"mdi:wheelchair-accessibility",label:Ne("amenities.barrier_free")},{flag:e.cateringService,icon:"mdi:silverware-fork-knife",label:Ne("amenities.catering")},{flag:e.bathroomsAvailable,icon:"mdi:toilet",label:Ne("amenities.bathrooms")},{flag:e.restingFacilities,icon:"mdi:sofa",label:Ne("amenities.resting")}].filter(e=>e.flag)}_formatKm(e){const t="number"==typeof e?e:parseFloat(String(e??""));if(!Number.isFinite(t))return"–";try{return new Intl.NumberFormat("de-AT",{minimumFractionDigits:2,maximumFractionDigits:2}).format(t)}catch{return t.toFixed(2)}}static{this.styles=Ye}};e([he({attribute:!1})],vt.prototype,"hass",void 0),e([ue()],vt.prototype,"config",void 0),e([ue()],vt.prototype,"_expanded",void 0),e([ue()],vt.prototype,"_versionMismatch",void 0),vt=e([ce("ladestellen-austria-card")],vt);export{vt as LadestellenAustriaCard};
