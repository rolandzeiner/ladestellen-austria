// Ladestellen Austria Card — bundled by Rollup. Edit sources in src/, then `npm run build`.
function e(e,t,i,n){var a,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,n);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(o=(r<3?a(o):r>3?a(t,i,o):a(t,i))||o);return r>3&&o&&Object.defineProperty(t,i,o),o}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,n=Symbol(),a=new WeakMap;let r=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=a.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&a.set(t,e))}return e}toString(){return this.cssText}};const o=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,n)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[n+1],e[0]);return new r(i,e,n)},s=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new r("string"==typeof e?e:e+"",void 0,n))(t)})(e):e,{is:l,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:p,getOwnPropertySymbols:h,getPrototypeOf:u}=Object,g=globalThis,m=g.trustedTypes,f=m?m.emptyScript:"",v=g.reactiveElementPolyfillSupport,_=(e,t)=>e,b={toAttribute(e,t){switch(t){case Boolean:e=e?f:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},y=(e,t)=>!l(e,t),w={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=w){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),n=this.getPropertyDescriptor(e,i,t);void 0!==n&&c(this.prototype,e,n)}}static getPropertyDescriptor(e,t,i){const{get:n,set:a}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:n,set(t){const r=n?.call(this);a?.call(this,t),this.requestUpdate(e,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??w}static _$Ei(){if(this.hasOwnProperty(_("elementProperties")))return;const e=u(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(_("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_("properties"))){const e=this.properties,t=[...p(e),...h(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(s(e))}else void 0!==e&&t.push(s(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,n)=>{if(i)e.adoptedStyleSheets=n.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of n){const n=document.createElement("style"),a=t.litNonce;void 0!==a&&n.setAttribute("nonce",a),n.textContent=i.cssText,e.appendChild(n)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),n=this.constructor._$Eu(e,i);if(void 0!==n&&!0===i.reflect){const a=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(t,i.type);this._$Em=e,null==a?this.removeAttribute(n):this.setAttribute(n,a),this._$Em=null}}_$AK(e,t){const i=this.constructor,n=i._$Eh.get(e);if(void 0!==n&&this._$Em!==n){const e=i.getPropertyOptions(n),a="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:b;this._$Em=n;const r=a.fromAttribute(t,e.type);this[n]=r??this._$Ej?.get(n)??r,this._$Em=null}}requestUpdate(e,t,i,n=!1,a){if(void 0!==e){const r=this.constructor;if(!1===n&&(a=this[e]),i??=r.getPropertyOptions(e),!((i.hasChanged??y)(a,t)||i.useDefault&&i.reflect&&a===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:n,wrapped:a},r){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,r??t??this[e]),!0!==a||void 0!==r)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===n&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,n=this[t];!0!==e||this._$AL.has(t)||void 0===n||this.C(t,void 0,i,n)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[_("elementProperties")]=new Map,x[_("finalized")]=new Map,v?.({ReactiveElement:x}),(g.reactiveElementVersions??=[]).push("2.1.2");const k=globalThis,$=e=>e,A=k.trustedTypes,C=A?A.createPolicy("lit-html",{createHTML:e=>e}):void 0,E="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,z="?"+S,P=`<${z}>`,D=document,O=()=>D.createComment(""),T=e=>null===e||"object"!=typeof e&&"function"!=typeof e,L=Array.isArray,N="[ \t\n\f\r]",R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,U=/-->/g,I=/>/g,M=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),F=/'/g,B=/"/g,H=/^(?:script|style|textarea|title)$/i,V=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),W=Symbol.for("lit-noChange"),j=Symbol.for("lit-nothing"),K=new WeakMap,G=D.createTreeWalker(D,129);function q(e,t){if(!L(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==C?C.createHTML(t):t}const Y=(e,t)=>{const i=e.length-1,n=[];let a,r=2===t?"<svg>":3===t?"<math>":"",o=R;for(let t=0;t<i;t++){const i=e[t];let s,l,c=-1,d=0;for(;d<i.length&&(o.lastIndex=d,l=o.exec(i),null!==l);)d=o.lastIndex,o===R?"!--"===l[1]?o=U:void 0!==l[1]?o=I:void 0!==l[2]?(H.test(l[2])&&(a=RegExp("</"+l[2],"g")),o=M):void 0!==l[3]&&(o=M):o===M?">"===l[0]?(o=a??R,c=-1):void 0===l[1]?c=-2:(c=o.lastIndex-l[2].length,s=l[1],o=void 0===l[3]?M:'"'===l[3]?B:F):o===B||o===F?o=M:o===U||o===I?o=R:(o=M,a=void 0);const p=o===M&&e[t+1].startsWith("/>")?" ":"";r+=o===R?i+P:c>=0?(n.push(s),i.slice(0,c)+E+i.slice(c)+S+p):i+S+(-2===c?t:p)}return[q(e,r+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),n]};class Z{constructor({strings:e,_$litType$:t},i){let n;this.parts=[];let a=0,r=0;const o=e.length-1,s=this.parts,[l,c]=Y(e,t);if(this.el=Z.createElement(l,i),G.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(n=G.nextNode())&&s.length<o;){if(1===n.nodeType){if(n.hasAttributes())for(const e of n.getAttributeNames())if(e.endsWith(E)){const t=c[r++],i=n.getAttribute(e).split(S),o=/([.?@])?(.*)/.exec(t);s.push({type:1,index:a,name:o[2],strings:i,ctor:"."===o[1]?te:"?"===o[1]?ie:"@"===o[1]?ne:ee}),n.removeAttribute(e)}else e.startsWith(S)&&(s.push({type:6,index:a}),n.removeAttribute(e));if(H.test(n.tagName)){const e=n.textContent.split(S),t=e.length-1;if(t>0){n.textContent=A?A.emptyScript:"";for(let i=0;i<t;i++)n.append(e[i],O()),G.nextNode(),s.push({type:2,index:++a});n.append(e[t],O())}}}else if(8===n.nodeType)if(n.data===z)s.push({type:2,index:a});else{let e=-1;for(;-1!==(e=n.data.indexOf(S,e+1));)s.push({type:7,index:a}),e+=S.length-1}a++}}static createElement(e,t){const i=D.createElement("template");return i.innerHTML=e,i}}function J(e,t,i=e,n){if(t===W)return t;let a=void 0!==n?i._$Co?.[n]:i._$Cl;const r=T(t)?void 0:t._$litDirective$;return a?.constructor!==r&&(a?._$AO?.(!1),void 0===r?a=void 0:(a=new r(e),a._$AT(e,i,n)),void 0!==n?(i._$Co??=[])[n]=a:i._$Cl=a),void 0!==a&&(t=J(e,a._$AS(e,t.values),a,n)),t}class Q{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,n=(e?.creationScope??D).importNode(t,!0);G.currentNode=n;let a=G.nextNode(),r=0,o=0,s=i[0];for(;void 0!==s;){if(r===s.index){let t;2===s.type?t=new X(a,a.nextSibling,this,e):1===s.type?t=new s.ctor(a,s.name,s.strings,this,e):6===s.type&&(t=new ae(a,this,e)),this._$AV.push(t),s=i[++o]}r!==s?.index&&(a=G.nextNode(),r++)}return G.currentNode=D,n}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,n){this.type=2,this._$AH=j,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=J(this,e,t),T(e)?e===j||null==e||""===e?(this._$AH!==j&&this._$AR(),this._$AH=j):e!==this._$AH&&e!==W&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>L(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==j&&T(this._$AH)?this._$AA.nextSibling.data=e:this.T(D.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,n="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=Z.createElement(q(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===n)this._$AH.p(t);else{const e=new Q(n,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=K.get(e.strings);return void 0===t&&K.set(e.strings,t=new Z(e)),t}k(e){L(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,n=0;for(const a of e)n===t.length?t.push(i=new X(this.O(O()),this.O(O()),this,this.options)):i=t[n],i._$AI(a),n++;n<t.length&&(this._$AR(i&&i._$AB.nextSibling,n),t.length=n)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=$(e).nextSibling;$(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ee{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,n,a){this.type=1,this._$AH=j,this._$AN=void 0,this.element=e,this.name=t,this._$AM=n,this.options=a,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=j}_$AI(e,t=this,i,n){const a=this.strings;let r=!1;if(void 0===a)e=J(this,e,t,0),r=!T(e)||e!==this._$AH&&e!==W,r&&(this._$AH=e);else{const n=e;let o,s;for(e=a[0],o=0;o<a.length-1;o++)s=J(this,n[i+o],t,o),s===W&&(s=this._$AH[o]),r||=!T(s)||s!==this._$AH[o],s===j?e=j:e!==j&&(e+=(s??"")+a[o+1]),this._$AH[o]=s}r&&!n&&this.j(e)}j(e){e===j?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class te extends ee{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===j?void 0:e}}class ie extends ee{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==j)}}class ne extends ee{constructor(e,t,i,n,a){super(e,t,i,n,a),this.type=5}_$AI(e,t=this){if((e=J(this,e,t,0)??j)===W)return;const i=this._$AH,n=e===j&&i!==j||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,a=e!==j&&(i===j||n);n&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ae{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){J(this,e)}}const re=k.litHtmlPolyfillSupport;re?.(Z,X),(k.litHtmlVersions??=[]).push("3.3.2");const oe=globalThis;class se extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const n=i?.renderBefore??t;let a=n._$litPart$;if(void 0===a){const e=i?.renderBefore??null;n._$litPart$=a=new X(t.insertBefore(O(),e),e,void 0,i??{})}return a._$AI(e),a})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}se._$litElement$=!0,se.finalized=!0,oe.litElementHydrateSupport?.({LitElement:se});const le=oe.litElementPolyfillSupport;le?.({LitElement:se}),(oe.litElementVersions??=[]).push("4.2.2");const ce=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},de={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:y},pe=(e=de,t,i)=>{const{kind:n,metadata:a}=i;let r=globalThis.litPropertyMetadata.get(a);if(void 0===r&&globalThis.litPropertyMetadata.set(a,r=new Map),"setter"===n&&((e=Object.create(e)).wrapped=!0),r.set(i.name,e),"accessor"===n){const{name:n}=i;return{set(i){const a=t.get.call(this);t.set.call(this,i),this.requestUpdate(n,a,e,!0,i)},init(t){return void 0!==t&&this.C(n,void 0,e,t),t}}}if("setter"===n){const{name:n}=i;return function(i){const a=this[n];t.call(this,i),this.requestUpdate(n,a,e,!0,i)}}throw Error("Unsupported decorator location: "+n)};function he(e){return(t,i)=>"object"==typeof i?pe(e,t,i):((e,t,i)=>{const n=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),n?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}function ue(e){return he({...e,state:!0,attribute:!1})}var ge,me;!function(e){e.language="language",e.system="system",e.comma_decimal="comma_decimal",e.decimal_comma="decimal_comma",e.space_comma="space_comma",e.none="none"}(ge||(ge={})),function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24"}(me||(me={}));const fe=(e,t,i,n)=>{n=n||{},i=null==i?{}:i;const a=new Event(t,{bubbles:void 0===n.bubbles||n.bubbles,cancelable:Boolean(n.cancelable),composed:void 0===n.composed||n.composed});return a.detail=i,e.dispatchEvent(a),a};var ve={version:"Version",invalid_configuration:"Invalid configuration",loading:"Loading…"},_e={no_entity:"Select a Ladestellen Austria sensor in the card editor.",no_stations:"No stations match the current filters.",hero_context:"to the nearest charger in {city}",hero_count:"{count} stations",hero_count_filtered:"{filtered} of {total} stations",hero_range:"{min}–{max} km range",inactive:"inactive",status_unknown:"live availability unavailable",status_count:"{avail} of {total} points free",gratis:"Free",live_count:"{avail}/{total} free",live_suffix:"free",open_in_maps:"Open in Maps",website:"Website",call:"Call",address_heading:"Address",amenities_heading:"Amenities",availability:"Availability",pinned:"Pinned",unpin:"Remove pin",orphan_pin_title:"Pinned station not in range",operator_heading:"Operator",charging_points_heading:"Charging points",opening_hours_heading:"Opening hours",payment_heading:"Payment",open_now:"Open now",closed_now:"Closed",closed_now_row:"Closed now",always_open_short:"24h",unknown_hours:"No information",start_fee_label:"start fee",blocking_fee_label:"¢/min from {from} min.",point_status_available:"Available",point_status_charging:"Charging",point_status_occupied:"Occupied",point_status_reserved:"Reserved",point_status_blocked:"Blocked",point_status_fault:"Out of order",point_status_unavailable:"Unavailable",point_status_unknown:"Unknown",point_status_planned:"Planned",point_status_removed:"Removed",tariff:"Tariff",dynamic_follows_entity:"Tracking: {entity}"},be={card_name:"Ladestellen Austria — Parking",description:"Single station, points rendered as parking slots viewed from above.",editor_station_heading:"Station",pick_station_hint:"Pick one station from the sensor. The card shows that station's charging points as parking slots.",no_station_selected:"Pick a station in the card editor.",station_not_found:"The selected station is not in the sensor's current results.",station_not_in_range:"Selected station not in range",available_count:"{avail} of {total} free",no_points:"No charging points reported for this station.",slot_status_free:"free",slot_status_busy:"in use",slot_status_warn:"out of order",slot_status_unknown:"unknown"},ye={green_energy:"Green energy",free_parking:"Free parking",roofed_parking:"Roofed parking",illuminated_parking:"Illuminated",barrier_free:"Accessible",austrian_ecolabel:"Austrian Eco-Label",catering:"Catering nearby",bathrooms:"Restrooms",resting:"Resting area"},we={app:"App",qr:"QR code",rfid:"RFID",contract:"Contract",debit:"Debit card",credit:"Credit card",contactless:"Contactless"},xe={mo:"Mo",tu:"Tu",we:"We",th:"Th",fr:"Fr",sa:"Sa",su:"Su"},ke={section_main:"Main",section_display:"Display",section_filters:"Filters",name:"Card title (optional)",entity:"Sensor",entity_missing:"Selected sensor is unavailable. Pick a different Ladestellen Austria sensor.",max_stations:"Stations to show",show_hero:"Show hero summary",show_pricing:"Show pricing",show_amenities:"Show amenity details",sort_by_power:"Sort by power (fastest first)",logo_adapt_to_theme:"Adapt logo to theme (black on light, white on dark)",only_available:"Only currently available stations",only_free:"Only stations with free charging",only_open:"Only currently open stations",connector_filter_hint:"Tap connector types to only show stations offering at least one of them. Empty = no filter.",amenity_filter_hint:"Tap amenities to narrow to stations offering all selected features (AND). Empty = no filter.",payment_filter_hint:"Tap payment methods to only show stations accepting at least one of them. Empty = no filter.",hint_compliance:"Data is supplied under the ladestellen.at Terms of Use. The E-Control branding in the header and the 'Datenquelle: E-Control' footer are legally required and cannot be hidden.",section_pinned:"Pinned stations",pin_hint:"Pinned stations always appear first and bypass filters. They still count toward the display cap above.",pin_select_sensor_first:"Select a sensor first to see available stations.",pin_no_stations_yet:"No stations returned yet — wait for the next refresh.",pin_orphans_heading:"Pinned but not in range (click to remove):",pin_unpin:"Remove",pin_disabled_dynamic:"Dynamic location mode is active on this sensor — pinned stations are disabled because the list follows your current position. Existing pins are preserved for when you switch back to fixed mode."},$e={common:ve,card:_e,parking:be,amenities:ye,auth:we,weekday:xe,editor:ke},Ae={version:"Version",invalid_configuration:"Ungültige Konfiguration",loading:"Lade…"},Ce={no_entity:"Bitte einen Ladestellen-Austria-Sensor im Karten-Editor auswählen.",no_stations:"Keine Ladestellen entsprechen den aktuellen Filtern.",hero_context:"zur nächsten Ladestelle in {city}",hero_count:"{count} Ladestellen",hero_count_filtered:"{filtered} von {total} Ladestellen",hero_range:"{min}–{max} km Umkreis",inactive:"inaktiv",status_unknown:"Live-Status nicht verfügbar",status_count:"{avail} von {total} Punkten frei",gratis:"Gratis",live_count:"{avail}/{total} frei",live_suffix:"frei",open_in_maps:"In Karte öffnen",website:"Website",call:"Anrufen",address_heading:"Adresse",amenities_heading:"Ausstattung",availability:"Verfügbarkeit",pinned:"Angepinnt",unpin:"Pin entfernen",orphan_pin_title:"Angepinnte Ladestelle außerhalb des Umkreises",operator_heading:"Betreiber",charging_points_heading:"Ladepunkte",opening_hours_heading:"Öffnungszeiten",payment_heading:"Bezahlung",open_now:"Jetzt geöffnet",closed_now:"Geschlossen",closed_now_row:"Jetzt geschlossen",always_open_short:"24h",unknown_hours:"Keine Angabe",start_fee_label:"Startgebühr",blocking_fee_label:"¢/min ab {from} Min.",point_status_available:"Verfügbar",point_status_charging:"Lädt",point_status_occupied:"Belegt",point_status_reserved:"Reserviert",point_status_blocked:"Blockiert",point_status_fault:"Außer Betrieb",point_status_unavailable:"Nicht verfügbar",point_status_unknown:"Unbekannt",point_status_planned:"Geplant",point_status_removed:"Entfernt",tariff:"Tarif",dynamic_follows_entity:"Folgt: {entity}"},Ee={card_name:"Ladestellen Austria — Parkplatz",description:"Eine Ladestelle, Ladepunkte als Parkplätze von oben dargestellt.",editor_station_heading:"Ladestelle",pick_station_hint:"Eine Ladestelle aus dem Sensor auswählen. Die Karte zeigt deren Ladepunkte als Parkplätze.",no_station_selected:"Bitte eine Ladestelle im Karten-Editor auswählen.",station_not_found:"Die gewählte Ladestelle ist aktuell nicht in den Sensor-Ergebnissen.",station_not_in_range:"Gewählte Ladestelle nicht im Umkreis",available_count:"{avail} von {total} frei",no_points:"Keine Ladepunkte für diese Ladestelle vorhanden.",slot_status_free:"frei",slot_status_busy:"belegt",slot_status_warn:"außer Betrieb",slot_status_unknown:"unbekannt"},Se={green_energy:"Ökostrom",free_parking:"Gratis Parken",roofed_parking:"Überdacht",illuminated_parking:"Beleuchtet",barrier_free:"Barrierefrei",austrian_ecolabel:"Umweltzeichen",catering:"Gastronomie",bathrooms:"WC",resting:"Ruhebereich"},ze={app:"App",qr:"QR-Code",rfid:"RFID",contract:"Vertrag",debit:"Bankomat",credit:"Kreditkarte",contactless:"Kontaktlos"},Pe={mo:"Mo",tu:"Di",we:"Mi",th:"Do",fr:"Fr",sa:"Sa",su:"So"},De={section_main:"Allgemein",section_display:"Anzeige",section_filters:"Filter",name:"Kartentitel (optional)",entity:"Sensor",entity_missing:"Ausgewählter Sensor ist nicht verfügbar. Bitte einen anderen Ladestellen-Austria-Sensor wählen.",max_stations:"Anzahl angezeigter Ladestellen",show_hero:"Überschrift anzeigen",show_pricing:"Preise anzeigen",show_amenities:"Ausstattungs-Details anzeigen",sort_by_power:"Nach Leistung sortieren (schnellste zuerst)",logo_adapt_to_theme:"Logo an Design anpassen (schwarz auf hell, weiß auf dunkel)",only_available:"Nur aktuell verfügbare Ladestellen",only_free:"Nur Ladestellen mit Gratis-Laden",only_open:"Nur aktuell geöffnete Ladestellen",connector_filter_hint:"Steckertypen antippen, um nur Ladestellen mit mindestens einem davon anzuzeigen. Leer = kein Filter.",amenity_filter_hint:"Ausstattungsmerkmale antippen, um nur Ladestellen mit allen gewählten Merkmalen anzuzeigen (UND). Leer = kein Filter.",payment_filter_hint:"Bezahlmethoden antippen, um nur Ladestellen anzuzeigen, die mindestens eine davon akzeptieren. Leer = kein Filter.",hint_compliance:"Die Daten werden unter den ladestellen.at-Nutzungsbedingungen bereitgestellt. Das E-Control-Branding im Kopf und die Fußzeile „Datenquelle: E-Control“ sind rechtlich vorgeschrieben und dürfen nicht entfernt werden.",section_pinned:"Angepinnte Ladestellen",pin_hint:"Angepinnte Ladestellen erscheinen immer zuerst und ignorieren Filter. Sie zählen weiterhin zur obigen Maximalanzahl.",pin_select_sensor_first:"Zuerst einen Sensor auswählen, um verfügbare Ladestellen zu sehen.",pin_no_stations_yet:"Noch keine Ladestellen geladen — auf die nächste Aktualisierung warten.",pin_orphans_heading:"Angepinnt, aber nicht im Umkreis (anklicken zum Entfernen):",pin_unpin:"Entfernen",pin_disabled_dynamic:"Dynamische Standortverfolgung ist für diesen Sensor aktiv — angepinnte Ladestellen sind deaktiviert, weil die Liste deiner aktuellen Position folgt. Bestehende Pins bleiben erhalten, falls du wieder auf festen Standort wechselst."},Oe={common:Ae,card:Ce,parking:Ee,amenities:Se,auth:ze,weekday:Pe,editor:De};const Te={en:Object.freeze({__proto__:null,amenities:ye,auth:we,card:_e,common:ve,default:$e,editor:ke,parking:be,weekday:xe}),de:Object.freeze({__proto__:null,amenities:Se,auth:ze,card:Ce,common:Ae,default:Oe,editor:De,parking:Ee,weekday:Pe})};function Le(e,t){const i=e.split(".").reduce((e,t)=>{if(e&&"object"==typeof e&&t in e)return e[t]},t);return"string"==typeof i?i:void 0}let Ne;function Re(e){"string"==typeof e&&e.length>0&&(Ne=e)}function Ue(e,t="",i=""){const n=(Ne||localStorage.getItem("selectedLanguage")||("undefined"!=typeof navigator?navigator.language:"")||"en").replace(/['"]+/g,"").substring(0,2).toLowerCase();let a=Le(e,Te[n]||Te.en);return void 0===a&&(a=Le(e,Te.en)),void 0===a&&(a=e),""!==t&&""!==i&&(a=a.replace(t,i)),a}const Ie=o`
  :host {
    display: block;
    --l-fs-hero: clamp(2.25rem, 4vw + 1rem, 3rem);
    --l-fs-xl: var(--ha-font-size-xl, 1.5rem);
    --l-fs-l: var(--ha-font-size-l, 1rem);
    --l-fs-m: var(--ha-font-size-m, 0.9375rem);
    --l-fs-s: var(--ha-font-size-s, 0.8125rem);
    --l-fs-xs: var(--ha-font-size-xs, 0.75rem);
    --l-fs-2xs: 11px;
    --l-fw-reg: var(--ha-font-weight-normal, 400);
    --l-fw-med: var(--ha-font-weight-medium, 500);
    --l-fw-bld: var(--ha-font-weight-bold, 700);
    --l-space-1: 4px;
    --l-space-2: 8px;
    --l-space-3: 12px;
    --l-space-4: 16px;
    --l-space-5: 20px;
    --l-space-6: 24px;
    --l-ease: cubic-bezier(0.4, 0, 0.2, 1);
    --l-dot-ok: var(--success-color, #22c55e);
    --l-dot-partial: var(--warning-color, #f59e0b);
    --l-dot-busy: var(--error-color, #ef4444);
    --l-dot-inactive: var(--state-unavailable-color, #9ca3af);
  }
  ha-card {
    overflow: hidden;
    border-radius: var(--ha-card-border-radius, 14px);
    /* Container query scope — every @container rule below resolves against
       the actual card width, not the viewport. HA dashboards place cards
       in columns of widely varying widths (250-700px+), so sizing against
       the card itself is the correct 2026 pattern. */
    container-type: inline-size;
    container-name: lscard;
  }

  /* Card-content wrapper — follows HA's slotted-child convention so ha-card's
     shadow-DOM selectors apply cleanly, but we reset the default 16px padding
     because every block inside supplies its own spacing tuned to the 2-column
     compact layout. Keeping the wrapper is purely semantic hygiene. */
  .card-content {
    padding: 0;
  }

  /* ----- Brand (used in the footer: §3c logo-link + §3d attribution) --- */
  .brand-link {
    display: inline-flex;
    align-items: center;
    text-decoration: none;
    transition: opacity 160ms var(--l-ease);
  }
  .brand-link:hover {
    opacity: 0.7;
  }
  /* Official E-Control logo (vector SVG — previously a 2274x598 PNG,
     now resolution-independent so the brightness(0)/invert(1) adaptive
     filter renders crisp at any DPI). Width auto-scales to preserve
     aspect ratio. 20px tall in the footer reads as a credit-line
     mark, not a hero — subtle but still legible. */
  .brand-logo {
    display: block;
    height: 20px;
    width: auto;
    max-width: 140px;
    object-fit: contain;
    transition: filter 160ms var(--l-ease);
  }
  /* Optional theme-adaptive rendering. brightness(0) collapses all
     channels to black while keeping alpha; invert(1) flips to white for
     dark mode. Enabled by the card's logo_adapt_to_theme config. */
  .brand-logo.adaptive.adaptive-light {
    filter: brightness(0);
  }
  .brand-logo.adaptive.adaptive-dark {
    filter: brightness(0) invert(1);
  }

  /* Dynamic-mode indicator — a small pill under the hero reminding
     the user the list is tracking a device_tracker, not the fixed
     config location. Only rendered when the sensor reports
     dynamic_mode: true. */
  .dynamic-indicator {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin: var(--l-space-3) var(--l-space-4);
    padding: 4px 10px;
    border-radius: 999px;
    background: color-mix(
      in srgb,
      var(--primary-color) 12%,
      transparent
    );
    color: var(--primary-text-color);
    font-size: var(--l-fs-xs);
    font-weight: var(--l-fw-med);
    letter-spacing: 0.01em;
    font-variant-numeric: tabular-nums;
    max-width: calc(100% - 2 * var(--l-space-4));
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .dynamic-indicator ha-icon {
    --mdc-icon-size: 14px;
    color: var(--primary-color);
    flex-shrink: 0;
  }

  /* Optional user-set card title. Only rendered when config.name differs
     from the default "Ladestellen Austria". */
  .custom-title {
    /* <h3> override: nuke UA heading margins so the layout is identical
       to the previous <div>. Semantics only. */
    margin: 0;
    padding: var(--l-space-3) var(--l-space-4) 0;
    font-size: var(--l-fs-l);
    font-weight: var(--l-fw-med);
    color: var(--primary-text-color);
    letter-spacing: 0;
  }

  /* ----- Hero — single big stat + context ---------------------------- */
  .hero {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: var(--l-space-4);
    padding: var(--l-space-3) var(--l-space-4) var(--l-space-4);
  }
  .hero--empty {
    padding: var(--l-space-5) var(--l-space-4);
    justify-content: center;
  }
  .hero-value {
    display: inline-flex;
    align-items: baseline;
    color: var(--primary-text-color);
    font-variant-numeric: tabular-nums;
    flex-shrink: 0;
  }
  .hero-number {
    font-size: var(--l-fs-hero);
    font-weight: var(--l-fw-bld);
    line-height: 1;
    letter-spacing: -0.04em;
  }
  .hero-unit {
    font-size: var(--l-fs-m);
    font-weight: var(--l-fw-reg);
    color: var(--secondary-text-color);
    margin-left: 6px;
    letter-spacing: 0;
  }
  .hero-context {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 2px;
    min-width: 0;
    text-align: right;
  }
  .hero-context-1 {
    font-size: var(--l-fs-s);
    font-weight: var(--l-fw-med);
    color: var(--primary-text-color);
    line-height: 1.3;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100%;
  }
  .hero-context-2 {
    font-size: var(--l-fs-xs);
    color: var(--secondary-text-color);
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.01em;
  }
  .hero-label {
    font-size: var(--l-fs-s);
    color: var(--secondary-text-color);
  }

  /* ----- Station list ------------------------------------------------ */
  .stations {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .station {
    display: flex;
    flex-direction: column;
    padding: 0;
    border-bottom: 1px solid var(--divider-color);
    cursor: pointer;
    transition: background-color 200ms var(--l-ease);
  }
  .station:last-child {
    border-bottom: none;
  }
  .station:hover,
  .station:focus-visible {
    background: color-mix(
      in srgb,
      var(--primary-color) 5%,
      var(--ha-card-background, var(--card-background-color))
    );
    outline: none;
  }
  .station.expanded {
    background: color-mix(
      in srgb,
      var(--primary-color) 3%,
      var(--ha-card-background, var(--card-background-color))
    );
  }

  /* Station is not actionable right now — under maintenance (all known
     points in warn states), closed-now, or API says stationStatus is not
     ACTIVE. The whole collapsed row dims and the kW loses its DC amber
     so the row reads as neutral-muted instead of a dimmed fast-charge
     accent. The expanded detail area stays full-clarity — it carries the
     context (opening hours, rack, wrenches) that explains why the row is
     muted. */
  .station.inactive .station-body {
    opacity: 0.6;
  }
  .station.inactive .metric-kw,
  .station.inactive .metric-kw--dc,
  .station.inactive .metric-kw .kw-num,
  .station.inactive .metric-kw .kw-unit,
  .station.inactive .metric-kw--dc .kw-num,
  .station.inactive .metric-kw--dc .kw-unit {
    color: var(--secondary-text-color);
  }

  /* Body: status dot + text column. Two lines always (name+metrics / address). */
  .station-body {
    display: flex;
    gap: var(--l-space-3);
    padding: var(--l-space-3) var(--l-space-4);
    align-items: flex-start;
  }

  /* Status dot — 9px circle that communicates live availability at a glance.
     Aligned to the baseline of the first text line for tidy vertical rhythm.
     WCAG 1.4.1 (use of color) — each state ships THREE independent cues:
     colour, halo geometry, AND fill-vs-hollow shape. The dot fill itself
     stays at full saturation in every active state so colour reads loud;
     the shape cue lives in the halo layers around the dot, never inside. */
  .status-dot {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    flex-shrink: 0;
    margin-top: 7px; /* aligns with the baseline of .station-name */
    background: currentColor;
    box-sizing: border-box;
  }
  .status-dot.status-ok {
    /* Shape: solid disc + single soft halo. Baseline "healthy" state. */
    color: var(--l-dot-ok);
    box-shadow: 0 0 0 3px
      color-mix(in srgb, var(--l-dot-ok) 18%, transparent);
  }
  .status-dot.status-partial {
    /* Shape: solid disc + DOUBLE halo (tighter bright ring + soft outer).
       Distinct from ok's single halo at any zoom or in grayscale. */
    color: var(--l-dot-partial);
    box-shadow:
      0 0 0 2px
        color-mix(in srgb, var(--l-dot-partial) 45%, transparent),
      0 0 0 4px
        color-mix(in srgb, var(--l-dot-partial) 18%, transparent);
  }
  .status-dot.status-busy {
    /* Shape: solid disc + solid saturated ring + soft outer halo.
       The solid ring adds visual "weight" so saturation reads heavier
       even at full grayscale, distinguishing busy from partial. */
    color: var(--l-dot-busy);
    box-shadow:
      0 0 0 1.5px var(--l-dot-busy),
      0 0 0 4px color-mix(in srgb, var(--l-dot-busy) 20%, transparent);
  }
  .status-dot.status-inactive {
    /* Shape: hollow ring (no fill) — clearly "off" regardless of colour. */
    color: transparent;
    background: transparent;
    border: 1.5px solid var(--l-dot-inactive);
    opacity: 0.7;
  }
  .status-dot.status-unknown {
    /* Shape: hollow dashed ring (distinct from inactive's solid ring). */
    color: transparent;
    background: transparent;
    border: 1.5px dashed var(--secondary-text-color);
    opacity: 0.6;
  }

  /* 2-row grid for the station row. Distance sits on line 1, price on
     line 2. Both live in the same grid column (width = wider-of-the-two,
     usually the distance pill), and both use justify-self: center so
     their geometric midpoints line up vertically — harmonic column
     centred under the distance. Chevron spans both rows and remains
     vertically centred against the full cluster. */
  .station-grid {
    flex: 1;
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto auto;
    grid-template-areas:
      "metrics distance chevron"
      "name    price    chevron";
    column-gap: var(--l-space-3);
    row-gap: 4px;
    align-items: center;
    min-width: 0;
  }
  .station-metrics {
    grid-area: metrics;
    justify-self: start;
    align-self: center;
  }
  .station-distance {
    grid-area: distance;
    justify-self: center;
  }
  .metric-price,
  .metric-price-placeholder {
    grid-area: price;
    justify-self: center;
    align-self: center;
  }
  .chevron {
    grid-area: chevron;
    align-self: center;
  }
  .station-name {
    grid-area: name;
  }
  /* Name sits on line 2 as a secondary identifier. Kept legible but
     visually subordinate to the metrics line above. */
  .station-name {
    font-size: var(--l-fs-s);
    font-weight: var(--l-fw-reg);
    color: var(--secondary-text-color);
    line-height: 1.4;
    letter-spacing: 0.005em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .station-metrics {
    display: inline-flex;
    /* center alignment keeps pill padding from descending past the row
       baseline — baseline alignment put chip-bottoms below the kW
       numeral, visually bleeding into line 2 */
    align-items: center;
    flex-wrap: wrap;
    gap: 2px 6px;
    font-size: var(--l-fs-m);
    color: var(--primary-text-color);
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }

  /* Pin indicator on pinned stations — small accent icon at the start
     of the metrics row. */
  .pin-indicator {
    --mdc-icon-size: 14px;
    color: var(--primary-color);
    flex-shrink: 0;
  }
  .station.pinned {
    background: color-mix(in srgb, var(--primary-color) 4%, transparent);
  }
  .station.pinned:hover,
  .station.pinned:focus-visible {
    background: color-mix(in srgb, var(--primary-color) 8%, transparent);
  }

  /* Orphan-pin placeholder row — for pinned IDs whose stations aren't in
     the current /search response (out of range / decommissioned). Click
     the ✕ to unpin. */
  .orphan-pin {
    cursor: default;
  }
  .orphan-pin:hover {
    background: transparent;
  }
  .orphan-body {
    display: flex;
    align-items: center;
    gap: var(--l-space-3);
    padding: 10px var(--l-space-4);
    opacity: 0.75;
  }
  .orphan-icon {
    --mdc-icon-size: 18px;
    color: var(--secondary-text-color);
    flex-shrink: 0;
  }
  .orphan-text {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .orphan-title {
    font-size: var(--l-fs-s);
    color: var(--primary-text-color);
    font-weight: var(--l-fw-med);
  }
  .orphan-id {
    font-size: var(--l-fs-xs);
    color: var(--secondary-text-color);
    font-family: ui-monospace, "SF Mono", Menlo, Monaco, Consolas, monospace;
    letter-spacing: 0;
  }
  .orphan-remove {
    appearance: none;
    border: none;
    background: transparent;
    padding: 10px;
    min-width: 44px;
    min-height: 44px;
    border-radius: 999px;
    cursor: pointer;
    color: var(--secondary-text-color);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: background-color 160ms var(--l-ease);
  }
  .orphan-remove:hover,
  .orphan-remove:focus-visible {
    background: color-mix(in srgb, var(--error-color, #c62828) 14%, transparent);
    color: var(--error-color, #c62828);
    outline: none;
  }
  .orphan-remove ha-icon {
    --mdc-icon-size: 16px;
  }
  /* kW — pure typographic treatment inspired by nextbike-austria's
     "bikes available" number. Big bold primary-text number with a
     small muted unit alongside; no pill, no background. DC distinction
     rides on the unit colour only so the overall style stays clean. */
  .metric-kw {
    display: inline-flex;
    align-items: baseline;
    gap: 3px;
    color: var(--primary-text-color);
    font-variant-numeric: tabular-nums;
    line-height: 1;
    white-space: nowrap;
  }
  .kw-num {
    font-size: 1.45em;
    font-weight: var(--l-fw-bld);
    line-height: 1;
    letter-spacing: -0.02em;
  }
  .kw-unit {
    font-size: 0.85em;
    font-weight: var(--l-fw-med);
    color: var(--secondary-text-color);
    letter-spacing: 0.01em;
  }
  /* DC fast-charge: both the number and the unit take the warning
     accent so the full "80 kW" reads as one amber token. */
  .metric-kw--dc {
    color: var(--warning-color, #f57c00);
  }
  .metric-kw--dc .kw-unit {
    color: var(--warning-color, #f57c00);
  }
  /* Price sits above distance in the right-stack — right-aligned so
     digits line up column-wise for easy comparison across rows. */
  .metric-price {
    color: var(--primary-text-color);
    font-size: var(--l-fs-s);
    font-weight: var(--l-fw-med);
    font-variant-numeric: tabular-nums;
    letter-spacing: -0.005em;
    line-height: 1.2;
    white-space: nowrap;
  }
  .metric-free {
    color: var(--success-color, #2e7d32);
    font-weight: var(--l-fw-bld);
  }

  /* Connector chips — neutral tint, tight vertical footprint so they
     never overshoot the kW's numeric box when sat next to it. */
  .pill.plug {
    display: inline-flex;
    align-items: center;
    padding: 1px 8px;
    border-radius: 999px;
    background: color-mix(
      in srgb,
      var(--secondary-text-color) 12%,
      transparent
    );
    color: var(--primary-text-color);
    font-size: var(--l-fs-xs);
    font-weight: var(--l-fw-med);
    letter-spacing: 0.015em;
    line-height: 1.3;
    white-space: nowrap;
  }
  .pill.plug.plug-more {
    background: color-mix(
      in srgb,
      var(--secondary-text-color) 6%,
      transparent
    );
    color: var(--secondary-text-color);
  }

  /* Distance-pill — map link. Vertical padding + line-height matched to
     .pill.plug so everything in line 1 (kW numeral, connector chips,
     distance pill) sits at a shared visual height. */
  .station-distance {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    padding: 1px 10px;
    border-radius: 999px;
    text-decoration: none;
    color: var(--primary-text-color);
    background: color-mix(in srgb, var(--primary-color) 10%, transparent);
    line-height: 1.3;
    transition:
      background-color 160ms var(--l-ease),
      transform 160ms var(--l-ease);
    flex-shrink: 0;
  }
  .station-distance:hover,
  .station-distance:focus-visible {
    background: color-mix(in srgb, var(--primary-color) 18%, transparent);
    outline: none;
  }
  .station-distance:active {
    transform: scale(0.96);
  }
  .station-distance ha-icon {
    --mdc-icon-size: 14px;
    color: var(--primary-color);
  }
  .distance-value {
    font-size: var(--l-fs-s);
    font-weight: var(--l-fw-med);
    font-variant-numeric: tabular-nums;
    letter-spacing: -0.005em;
  }
  .distance-value .unit {
    font-size: var(--l-fs-xs);
    color: var(--secondary-text-color);
    font-weight: var(--l-fw-reg);
    margin-left: 2px;
    letter-spacing: 0;
  }
  .chevron {
    --mdc-icon-size: 18px;
    color: var(--secondary-text-color);
    flex-shrink: 0;
    transition: transform 200ms var(--l-ease);
  }

  /* (Line 2 is now .station-name — address moved to .detail-address in
     the expanded panel.) */
  .detail-address {
    font-size: var(--l-fs-s);
    color: var(--primary-text-color);
    line-height: 1.4;
    letter-spacing: 0.003em;
  }

  /* ----- Expanded detail -------------------------------------------- */
  .detail {
    display: flex;
    flex-direction: column;
    gap: var(--l-space-3);
    padding: 0 var(--l-space-4) var(--l-space-4) calc(var(--l-space-4) + 9px + var(--l-space-3));
    animation: l-reveal 220ms var(--l-ease);
  }
  @keyframes l-reveal {
    from {
      opacity: 0;
      transform: translateY(-4px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }
  .detail-section {
    display: flex;
    flex-direction: column;
    gap: var(--l-space-1);
  }
  .detail-label {
    font-size: var(--l-fs-2xs);
    font-weight: var(--l-fw-med);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--secondary-text-color);
    opacity: 0.7;
  }

  /* Status row (in expanded detail) */
  .status-row {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: var(--l-fs-s);
    font-weight: var(--l-fw-med);
    letter-spacing: 0.005em;
    font-variant-numeric: tabular-nums;
    align-self: flex-start;
  }
  .status-row .status-dot {
    margin-top: 0;
  }
  .status-row.status-ok {
    color: var(--l-dot-ok);
  }
  .status-row.status-partial {
    color: var(--l-dot-partial);
  }
  .status-row.status-busy {
    color: var(--l-dot-busy);
  }
  .status-row.status-inactive,
  .status-row.status-unknown {
    color: var(--secondary-text-color);
  }

  /* Amenities — compact wrap of icon+label pairs. */
  .amenities {
    display: flex;
    flex-wrap: wrap;
    gap: 6px 14px;
    font-size: var(--l-fs-s);
    color: var(--secondary-text-color);
  }
  .amenity {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    letter-spacing: 0.005em;
  }
  .amenity ha-icon {
    --mdc-icon-size: 15px;
    color: var(--secondary-text-color);
    flex-shrink: 0;
  }

  /* Action row — clear, tappable, colored primary for Maps. */
  .detail-actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--l-space-2);
    padding-top: var(--l-space-1);
  }
  .action-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border-radius: 999px;
    font-size: var(--l-fs-s);
    font-weight: var(--l-fw-med);
    letter-spacing: 0.005em;
    text-decoration: none;
    color: var(--primary-text-color);
    background: color-mix(
      in srgb,
      var(--secondary-text-color) 10%,
      transparent
    );
    transition:
      background-color 160ms var(--l-ease),
      transform 160ms var(--l-ease);
  }
  .action-btn:hover,
  .action-btn:focus-visible {
    background: color-mix(
      in srgb,
      var(--secondary-text-color) 18%,
      transparent
    );
    outline: none;
  }
  .action-btn:active {
    transform: scale(0.97);
  }
  .action-btn ha-icon {
    --mdc-icon-size: 16px;
  }
  .action-btn.primary {
    background: color-mix(in srgb, var(--primary-color) 15%, transparent);
    color: color-mix(
      in srgb,
      var(--primary-color) 85%,
      var(--primary-text-color)
    );
  }
  .action-btn.primary:hover,
  .action-btn.primary:focus-visible {
    background: color-mix(in srgb, var(--primary-color) 22%, transparent);
  }
  .action-btn.primary ha-icon {
    color: var(--primary-color);
  }

  /* Footer — §3c logo-link on the left, §3d attribution on the right.
     Both compliance items collapse into a single credit-line row. */
  .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--l-space-3);
    padding: 10px var(--l-space-4);
    border-top: 1px solid var(--divider-color);
  }
  .attribution-text {
    font-size: var(--l-fs-xs);
    color: var(--secondary-text-color);
    letter-spacing: 0.03em;
    opacity: 0.8;
  }

  /* Empty states */
  .empty-state {
    padding: var(--l-space-5);
    text-align: center;
    color: var(--secondary-text-color);
    font-size: var(--l-fs-s);
  }

  /* ----- Operator byline (top of expanded detail) ------------------ */
  .operator-line {
    display: flex;
    align-items: baseline;
    gap: 10px;
    flex-wrap: wrap;
    min-width: 0;
  }
  .operator-name {
    font-size: var(--l-fs-s);
    color: var(--primary-text-color);
    font-weight: var(--l-fw-med);
    letter-spacing: 0.01em;
    line-height: 1.3;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-width: 0;
  }

  /* ----- Station note (operator-supplied access info) --------------
     Surfaces station.description — free-text notes from the operator
     like "Zufahrt nur Anrainern gestattet 7-14 Uhr". Only rendered
     when non-null, so it never adds visual noise for stations that
     have nothing to say. */
  .station-note {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    padding: 8px 10px;
    background: color-mix(
      in srgb,
      var(--secondary-text-color) 7%,
      transparent
    );
    border-left: 3px solid
      color-mix(in srgb, var(--primary-color) 55%, transparent);
    border-radius: 6px;
    font-size: var(--l-fs-xs);
    line-height: 1.4;
    color: var(--primary-text-color);
  }
  .station-note ha-icon {
    --mdc-icon-size: 16px;
    color: var(--primary-color);
    flex-shrink: 0;
    margin-top: 1px;
  }

  /* ----- Rack (per-point availability grid, nextbike-style) ---------
     Centred cluster — small point counts (1-4 typical) sit in the middle
     of the container rather than left-hugging, which kept looking like a
     half-empty row. */
  .rack {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
    padding: 10px;
    border-radius: 10px;
    background: color-mix(
      in srgb,
      var(--secondary-text-color) 4%,
      transparent
    );
  }
  .rack-slot {
    /* Layout model:
       - Positioned container. Only the status dot is an absolute
         overlay (top-left decoration). Everything else — power badge,
         kW, connector / wrench — participates in the flex column so
         the entire content cluster is centred by a single
         justify-content rule.
       - Symmetric 8px padding + gap: 3px between flex children; when
         content underfills the min-height floor the free space splits
         evenly above/below.
       - min-height keeps mixed warn/regular rows height-consistent. */
    position: relative;
    flex: 0 0 80px;
    width: 80px;
    min-height: 64px;
    box-sizing: border-box;
    border-radius: 10px;
    padding: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3px;
    border: 1px solid transparent;
    transition: background-color 160ms var(--l-ease),
      border-color 160ms var(--l-ease);
    cursor: default;
  }
  .rack-slot[data-status="ok"] {
    background: color-mix(in srgb, var(--success-color, #22c55e) 14%, transparent);
    border-color: color-mix(in srgb, var(--success-color, #22c55e) 40%, transparent);
  }
  .rack-slot[data-status="busy"] {
    background: color-mix(in srgb, var(--error-color, #ef4444) 12%, transparent);
    border-color: color-mix(in srgb, var(--error-color, #ef4444) 35%, transparent);
  }
  .rack-slot[data-status="warn"] {
    background: color-mix(in srgb, var(--warning-color, #f59e0b) 12%, transparent);
    border-color: color-mix(in srgb, var(--warning-color, #f59e0b) 35%, transparent);
  }
  /* UNKNOWN — live status not reported by the operator. Solid muted grey
     tile so kW + connector stay legible; no dashed border (that's
     reserved for "empty" = PLANNED/REMOVED slot placeholders). */
  .rack-slot[data-status="unknown"] {
    background: color-mix(
      in srgb,
      var(--secondary-text-color) 6%,
      transparent
    );
    border-color: color-mix(
      in srgb,
      var(--secondary-text-color) 20%,
      transparent
    );
  }
  .rack-slot[data-status="empty"] {
    background: color-mix(
      in srgb,
      var(--secondary-text-color) 8%,
      transparent
    );
    border: 1px dashed
      color-mix(in srgb, var(--secondary-text-color) 35%, transparent);
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
  /* Number + unit share the same primary-text colour on every slot —
     status tint lives on the slot background + status dot, not on the
     kW label. DC is carried by the top-left bolt icon. */
  .rack-kw-num {
    font-size: 1.15rem;
    font-weight: var(--l-fw-bld);
    letter-spacing: -0.02em;
  }
  .rack-kw-unit {
    font-size: 0.72rem;
    font-weight: var(--l-fw-med);
    letter-spacing: 0.01em;
  }
  .rack-connector {
    max-width: 100%;
    font-size: var(--l-fs-xs);
    color: var(--secondary-text-color);
    letter-spacing: 0.005em;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .rack-warn-icon {
    --mdc-icon-size: 28px;
    color: var(--warning-color, #f57c00);
  }
  /* Status dot — top-left corner, mirroring the power-badge at top-
     centre for a balanced header band. Absolute keeps it stable across
     varying connector label widths below. */
  .rack-dot {
    position: absolute;
    top: 6px;
    left: 7px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .rack-dot.status-ok {
    background: var(--l-dot-ok);
  }
  .rack-dot.status-busy {
    background: var(--l-dot-busy);
  }
  .rack-dot.status-warn {
    background: var(--l-dot-partial);
  }
  .rack-dot.status-unknown {
    background: color-mix(
      in srgb,
      var(--secondary-text-color) 55%,
      transparent
    );
  }
  .rack-dot.status-empty {
    background: transparent;
    border: 1px solid
      color-mix(in srgb, var(--secondary-text-color) 60%, transparent);
  }
  /* AC/DC badge — first flex child (above kW). Participates in the
     flex flow so it centres with the rest of the content. DC takes
     the warning accent (fast-charge signal); AC stays secondary so
     it recedes on the common case. */
  .power-badge {
    font-size: 0.5625rem; /* 9px @ 16px root — WCAG 1.4.4 resize-text */
    font-weight: var(--l-fw-bld);
    letter-spacing: 0.08em;
    line-height: 1;
    text-transform: uppercase;
  }
  .power-badge[data-type="dc"] {
    color: var(--warning-color, #f57c00);
  }
  .power-badge[data-type="ac"] {
    color: var(--secondary-text-color);
    opacity: 0.75;
  }

  /* Fees line under the rack — quiet secondary text. */
  .fees-line {
    font-size: var(--l-fs-xs);
    color: var(--secondary-text-color);
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.005em;
    line-height: 1.4;
    padding-top: 4px;
  }

  /* ----- Opening hours --------------------------------------------- */
  .hours-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--l-space-3);
    flex-wrap: wrap;
    font-size: var(--l-fs-s);
    color: var(--primary-text-color);
    line-height: 1.4;
  }
  .hours-lines {
    /* <dl> override: nuke UA margins so the list sits flush inside the
       detail section. */
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
    margin: 0;
    padding: 0;
  }
  .hours-line {
    display: flex;
    gap: 8px;
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.005em;
  }
  .hours-day,
  .hours-time {
    /* <dt> / <dd> overrides: strip UA margins so the day/time pair sits
       on a single line matching the previous <div> rendering. */
    margin: 0;
  }
  .hours-day {
    font-weight: 500;
    flex-shrink: 0;
  }
  .hours-chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 2px 10px;
    border-radius: 999px;
    font-size: var(--l-fs-xs);
    font-weight: var(--l-fw-med);
    letter-spacing: 0.01em;
    background: color-mix(
      in srgb,
      var(--secondary-text-color) 10%,
      transparent
    );
    color: var(--secondary-text-color);
    white-space: nowrap;
  }
  .hours-chip.status-ok {
    background: color-mix(
      in srgb,
      var(--success-color, #22c55e) 14%,
      transparent
    );
    color: var(--success-color, #22c55e);
  }
  .hours-chip.status-inactive {
    background: color-mix(
      in srgb,
      var(--secondary-text-color) 12%,
      transparent
    );
    color: var(--secondary-text-color);
  }
  .hours-chip .status-dot {
    margin-top: 0;
    width: 7px;
    height: 7px;
    box-shadow: none;
  }

  /* ----- Payment chips --------------------------------------------- */
  .payment-row {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  .payment-chip {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 3px 10px;
    border-radius: 999px;
    background: color-mix(
      in srgb,
      var(--secondary-text-color) 10%,
      transparent
    );
    color: var(--primary-text-color);
    font-size: var(--l-fs-xs);
    font-weight: var(--l-fw-med);
    letter-spacing: 0.005em;
    line-height: 1.3;
    white-space: nowrap;
  }
  .payment-chip ha-icon {
    --mdc-icon-size: 14px;
    color: var(--secondary-text-color);
    flex-shrink: 0;
  }

  /* ==========================================================
     RESPONSIVE: container queries against the card's own width
     ========================================================== */

  /* Compact — below ~440px (most phone dashboards). Line 1 stays as
     metrics + distance + chevron; line 2 stays as the station name.
     Only typography and padding tighten. */
  @container lscard (max-width: 439px) {
    .station-body {
      padding: 10px var(--l-space-3);
      gap: var(--l-space-2);
    }
    .station-metrics {
      font-size: var(--l-fs-s);
    }
    .station-name {
      font-size: var(--l-fs-xs);
    }

    /* Hero stacks vertically so the big number and context each get
       their own line. */
    .hero {
      flex-direction: column;
      align-items: flex-start;
      gap: var(--l-space-2);
      padding: var(--l-space-3) var(--l-space-3) var(--l-space-4);
    }
    .hero-context {
      align-items: flex-start;
      text-align: left;
    }

    .custom-title {
      padding: var(--l-space-2) var(--l-space-3) 0;
    }

    .detail {
      padding: 0 var(--l-space-3) var(--l-space-3)
        calc(var(--l-space-3) + 9px + var(--l-space-2));
    }
    .amenities {
      gap: 4px 10px;
    }
    .action-btn {
      font-size: var(--l-fs-xs);
      padding: 5px 10px;
    }
    .footer {
      padding: 8px var(--l-space-3);
      gap: var(--l-space-2);
    }
    .brand-logo {
      height: 18px;
    }
  }

  /* Narrow rack — slots shrink from 80×72 to 60×56 so even 4-point DC
     hubs wrap to two rows at worst on phone-width dashboards. */
  @container lscard (max-width: 359px) {
    .rack {
      gap: 6px;
      padding: 8px;
    }
    .rack-slot {
      flex: 0 0 60px;
      width: 60px;
      min-height: 52px;
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
      font-size: 0.625rem; /* 10px @ 16px root — WCAG 1.4.4 */
    }
    .rack-warn-icon {
      --mdc-icon-size: 22px;
    }
    .rack-dot {
      top: 4px;
      left: 5px;
      width: 7px;
      height: 7px;
    }
    .power-badge {
      font-size: 0.5rem; /* 8px @ 16px root — WCAG 1.4.4 */
      letter-spacing: 0.06em;
    }
  }

  /* Ultra-compact — below 320px. Drop more ornamentation; let overflow
     wrap instead of ellipsis-truncate. */
  @container lscard (max-width: 319px) {
    .station-body {
      padding: 8px var(--l-space-3);
    }
    .station-metrics {
      font-size: var(--l-fs-xs);
    }
    .distance-value {
      font-size: var(--l-fs-s);
    }
    .distance-value .unit {
      font-size: 0.625rem; /* 10px @ 16px root — WCAG 1.4.4 */
    }
    .station-distance {
      padding: 2px 8px;
    }
    .station-distance ha-icon {
      --mdc-icon-size: 14px;
    }
    .chevron {
      --mdc-icon-size: 16px;
    }
    .hero {
      padding: var(--l-space-2) var(--l-space-3) var(--l-space-3);
    }
    .hero-context-1,
    .hero-context-2 {
      white-space: normal;
    }
  }

  /* Accessibility: visible focus ring for keyboard users. */
  .station:focus-visible,
  .orphan-remove:focus-visible,
  a:focus-visible,
  button:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
    border-radius: 6px;
  }

  /* Accessibility: honour user motion preference. */
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
`,Me=o`
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
    padding: var(--ha-space-3, 14px) var(--ha-space-4, 16px);
    display: flex;
    flex-direction: column;
    gap: var(--ha-space-2, 10px);
  }
  .section-header {
    font-size: var(--ha-font-size-xs, 11px);
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
    font-size: var(--ha-font-size-s, 13px);
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
  /* Amenity / payment chips include an icon next to the label.
     Slightly tighter padding so a dense chip-row wraps cleanly. */
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

  /* Pin list — editor section for toggling which stations are pinned. */
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
    font-size: var(--ha-font-size-s, 13px);
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
    font-size: var(--ha-font-size-xs, 11px);
    color: var(--secondary-text-color);
    font-variant-numeric: tabular-nums;
    flex-shrink: 0;
  }
  .editor-hint--muted {
    opacity: 0.7;
  }
`,Fe=o`
  :host {
    display: block;
    --l-fs-l: var(--ha-font-size-l, 1rem);
    --l-fs-m: var(--ha-font-size-m, 0.9375rem);
    --l-fs-s: var(--ha-font-size-s, 0.8125rem);
    --l-fs-xs: var(--ha-font-size-xs, 0.75rem);
    --l-fw-reg: var(--ha-font-weight-normal, 400);
    --l-fw-med: var(--ha-font-weight-medium, 500);
    --l-fw-bld: var(--ha-font-weight-bold, 700);
    --l-ease: cubic-bezier(0.4, 0, 0.2, 1);
    --l-ok: var(--success-color, #22c55e);
    --l-busy: var(--error-color, #ef4444);
    --l-warn: var(--warning-color, #f59e0b);
  }
  ha-card {
    overflow: hidden;
    border-radius: var(--ha-card-border-radius, 14px);
    container-type: inline-size;
    container-name: plcard;
  }

  .parking-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 12px;
    padding: 12px 16px 8px;
    flex-wrap: wrap;
  }
  .parking-title-group {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
    flex: 1;
  }
  .parking-title {
    /* <h3> override: nuke UA heading margins so the header row layout
       is identical to the previous <div>. */
    margin: 0;
    font-size: var(--l-fs-l);
    font-weight: var(--l-fw-med);
    color: var(--primary-text-color);
    letter-spacing: 0;
  }
  .parking-station-label {
    font-size: var(--l-fs-s);
    color: var(--secondary-text-color);
    letter-spacing: 0.005em;
    line-height: 1.3;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .parking-count {
    font-size: var(--l-fs-s);
    font-weight: var(--l-fw-med);
    color: var(--secondary-text-color);
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }
  .parking-count--ok {
    color: var(--l-ok);
  }

  /* The lot — dark asphalt tint under the slots. Slots sit on this
     background so the painted lane lines read as paint on asphalt. */
  .parking-lot {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(96px, 1fr));
    gap: 8px;
    padding: 6px 16px 16px;
    background: color-mix(
      in srgb,
      var(--primary-text-color) 8%,
      var(--ha-card-background, var(--card-background-color))
    );
  }

  /* A single parking slot. Dashed vertical borders serve as the painted
     lane-markers; subtle inner background keeps the slot distinguishable
     from the asphalt base. */
  .parking-slot {
    position: relative;
    min-height: 120px;
    padding: 12px 8px;
    display: flex;
    align-items: stretch;
    justify-content: center;
    box-sizing: border-box;
    cursor: default;
    transition: opacity 160ms var(--l-ease), filter 160ms var(--l-ease);
    border-left: 2px dashed
      color-mix(in srgb, var(--primary-text-color) 30%, transparent);
    border-right: 2px dashed
      color-mix(in srgb, var(--primary-text-color) 30%, transparent);
    background: color-mix(
      in srgb,
      var(--primary-text-color) 4%,
      transparent
    );
  }
  .slot-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    width: 100%;
  }

  .slot-power-badge {
    font-size: 0.5625rem; /* 9px @ 16px root — WCAG 1.4.4 */
    font-weight: var(--l-fw-bld);
    letter-spacing: 0.08em;
    line-height: 1;
    text-transform: uppercase;
  }
  .slot-power-badge[data-type="dc"] {
    color: var(--warning-color, #f57c00);
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
    font-weight: var(--l-fw-bld);
    letter-spacing: -0.02em;
  }
  .slot-kw-unit {
    font-size: 0.78rem;
    font-weight: var(--l-fw-med);
  }

  .slot-connector {
    font-size: var(--l-fs-xs);
    color: var(--secondary-text-color);
    letter-spacing: 0.005em;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .slot-status-word {
    font-size: var(--l-fs-xs);
    font-weight: var(--l-fw-med);
    letter-spacing: 0.04em;
    text-transform: uppercase;
    line-height: 1;
    margin-top: 4px;
  }
  .slot-status-free {
    color: var(--l-ok);
  }
  .slot-status-busy {
    color: var(--l-busy);
  }
  .slot-status-warn {
    color: var(--l-warn);
  }
  .slot-status-unknown {
    color: var(--secondary-text-color);
  }

  /* AVAILABLE slots pop — success-tinted fill + brighter painted-lane
     markers so the eye lands on the free spots immediately. */
  .parking-slot.is-available {
    background: color-mix(
      in srgb,
      var(--l-ok) 14%,
      color-mix(
        in srgb,
        var(--primary-text-color) 4%,
        transparent
      )
    );
    border-left-color: color-mix(
      in srgb,
      var(--l-ok) 50%,
      var(--primary-text-color)
    );
    border-right-color: color-mix(
      in srgb,
      var(--l-ok) 50%,
      var(--primary-text-color)
    );
  }

  /* Non-AVAILABLE slots: desaturated + reduced opacity so the AVAILABLE
     ones dominate the glance-read. Muting applies to CHARGING / BLOCKED
     / OUTOFORDER / UNKNOWN uniformly. */
  .parking-slot.is-muted {
    opacity: 0.5;
    filter: grayscale(50%);
  }

  /* Empty state inside ha-card (no station selected, out of range). */
  .empty-state {
    padding: 20px 16px;
    text-align: center;
    color: var(--secondary-text-color);
    font-size: var(--l-fs-s);
  }

  /* Tablet split-view tier: cards between ~320 px and ~439 px (between
     the default auto-fit minmax(96px) and the narrow 319 px fallback)
     get a modest density bump so an iPad or split-view column still
     reads cleanly. */
  @container plcard (min-width: 320px) and (max-width: 439px) {
    .parking-lot {
      grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
      gap: 8px;
      padding: 8px 14px 14px;
    }
    .parking-slot {
      min-height: 110px;
      padding: 12px 6px;
    }
    .parking-header {
      padding: 12px 14px 6px;
    }
  }

  /* Narrow card fallback — rely on the container query so small dashboard
     columns still render readable slots. */
  @container plcard (max-width: 319px) {
    .parking-lot {
      grid-template-columns: repeat(auto-fit, minmax(84px, 1fr));
      gap: 6px;
      padding: 6px 12px 12px;
    }
    .parking-slot {
      min-height: 100px;
      padding: 10px 6px;
    }
    .parking-header {
      padding: 10px 12px 6px;
    }
    .slot-kw-num {
      font-size: 1.2rem;
    }
  }

  /* Accessibility: visible focus ring. */
  .parking-slot:focus-visible,
  a:focus-visible,
  button:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
    border-radius: 6px;
  }

  /* Accessibility: honour user motion preference. */
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
`;function Be(e){const t=e.electricityType??[];return t.some(e=>"DC"===e||e?.startsWith("DC"))?"dc":t.some(e=>e?.startsWith("AC"))?"ac":null}function He(e){return(e??"").toUpperCase().replace(/_/g,"")}function Ve(e){const t=He(e);return"AVAILABLE"===t?"ok":"CHARGING"===t||"OCCUPIED"===t||"RESERVED"===t||"BLOCKED"===t?"busy":"OUTOFORDER"===t||"FAULTED"===t||"INOPERATIVE"===t||"UNAVAILABLE"===t?"warn":"UNKNOWN"===t?"unknown":"empty"}function We(e){if(!e)return"";const t={AVAILABLE:"available",CHARGING:"charging",OCCUPIED:"occupied",RESERVED:"reserved",BLOCKED:"blocked",OUTOFORDER:"fault",FAULTED:"fault",INOPERATIVE:"fault",UNAVAILABLE:"unavailable",UNKNOWN:"unknown",PLANNED:"planned",REMOVED:"removed"}[He(e)];if(!t)return e;const i=`card.point_status_${t}`,n=Ue(i);return n===i?e:n}function je(e){if(null==e||!Number.isFinite(e))return"–";try{return new Intl.NumberFormat("de-AT",{minimumFractionDigits:0,maximumFractionDigits:1}).format(e)}catch{return String(e).replace(".",",")}}function Ke(e){const t=e/100;try{return new Intl.NumberFormat("de-AT",{minimumFractionDigits:2,maximumFractionDigits:2}).format(t)}catch{return t.toFixed(2)}}function Ge(e){if(!Number.isFinite(e))return"0";try{return new Intl.NumberFormat("de-AT",{minimumFractionDigits:0,maximumFractionDigits:2}).format(e)}catch{return String(e).replace(".",",")}}function qe(e,t){switch(e){case"TYPE_2_AC":return"Type 2";case"COMBO2_CCS_DC":return"CCS";case"CHADEMO":return"CHAdeMO";case"TYPE_1_AC":return"Type 1";case"TESLA_S":case"TESLA_R":return"Tesla";case"OTHER":return"DOMESTIC_F"===t?"Schuko":t?.startsWith("CEE")?"CEE":t??"?";default:return e?.replace(/_/g," ")??t??"?"}}function Ye(e){const t=(e.connectorType??[])[0];return t?qe(t.consumerName,t.key):"–"}const Ze=["Type 2","CCS","CHAdeMO","Type 1","Tesla","Schuko","CEE"],Je=[{key:"green_energy",icon:"mdi:leaf",label_key:"amenities.green_energy"},{key:"austrian_ecolabel",icon:"mdi:certificate-outline",label_key:"amenities.austrian_ecolabel"},{key:"free_parking",icon:"mdi:parking",label_key:"amenities.free_parking"},{key:"roofed_parking",icon:"mdi:home-roof",label_key:"amenities.roofed_parking"},{key:"illuminated_parking",icon:"mdi:lightbulb-outline",label_key:"amenities.illuminated_parking"},{key:"barrier_free",icon:"mdi:wheelchair-accessibility",label_key:"amenities.barrier_free"},{key:"catering",icon:"mdi:silverware-fork-knife",label_key:"amenities.catering"},{key:"bathrooms",icon:"mdi:toilet",label_key:"amenities.bathrooms"},{key:"resting",icon:"mdi:sofa",label_key:"amenities.resting"}],Qe=[{key:"APP",icon:"mdi:cellphone",label_key:"auth.app"},{key:"QR",icon:"mdi:qrcode",label_key:"auth.qr"},{key:"RFID_READER",icon:"mdi:credit-card-wireless-outline",label_key:"auth.rfid"},{key:"CHARGING_CONTRACT",icon:"mdi:handshake-outline",label_key:"auth.contract"},{key:"DEBIT_CARD",icon:"mdi:credit-card-outline",label_key:"auth.debit"},{key:"CREDIT_CARD",icon:"mdi:credit-card",label_key:"auth.credit"},{key:"CONTACTLESS_CARD_SUPPORT",icon:"mdi:contactless-payment",label_key:"auth.contactless"}];let Xe=class extends se{constructor(){super(...arguments),this._config={type:"ladestellen-austria-card"}}setConfig(e){const t=e.entity&&this.hass?.states[e.entity]?.attributes.friendly_name;this._config={name:"string"==typeof t?t:void 0,...e}}render(){Re(this.hass?.language);const e=this._config.connector_types??[],t=this._config.amenities??[],i=this._config.payment_methods??[],n=!!this._config.entity&&!!this.hass&&!this.hass.states[this._config.entity];return V`
      <div class="editor">
        <div class="editor-section">
          <div class="section-header">${Ue("editor.section_main")}</div>

          ${this.hass?V`
                <ha-selector
                  .hass=${this.hass}
                  .selector=${{entity:{domain:"sensor",integration:"ladestellen_austria"}}}
                  .value=${this._config.entity||void 0}
                  .configValue=${"entity"}
                  .label=${Ue("editor.entity")}
                  .required=${!0}
                  aria-invalid=${n?"true":"false"}
                  aria-describedby=${n?"entity-error":j}
                  @value-changed=${this._valueChanged}
                ></ha-selector>
                ${n?V`<ha-alert
                      id="entity-error"
                      alert-type="error"
                    >
                      ${Ue("editor.entity_missing")}
                    </ha-alert>`:j}
              `:V`<p>${Ue("common.loading")}</p>`}

          <ha-textfield
            label=${Ue("editor.name")}
            .value=${this._config.name||""}
            .configValue=${"name"}
            @input=${this._valueChanged}
          ></ha-textfield>
        </div>

        <div class="editor-section">
          <div class="section-header">${Ue("editor.section_display")}</div>

          ${this.hass?V`
                <ha-selector
                  .hass=${this.hass}
                  .selector=${{number:{min:1,max:10,step:1,mode:"slider"}}}
                  .value=${this._config.max_stations??10}
                  .configValue=${"max_stations"}
                  .label=${Ue("editor.max_stations")}
                  @value-changed=${this._valueChanged}
                ></ha-selector>
              `:j}

          <div class="toggle-row">
            <label for="toggle-show-hero"
              >${Ue("editor.show_hero")}</label
            >
            <ha-switch
              id="toggle-show-hero"
              .checked=${!1!==this._config.show_hero}
              .configValue=${"show_hero"}
              @change=${this._valueChanged}
            ></ha-switch>
          </div>

          <div class="toggle-row">
            <label for="toggle-show-pricing"
              >${Ue("editor.show_pricing")}</label
            >
            <ha-switch
              id="toggle-show-pricing"
              .checked=${this._config.show_pricing??!0}
              .configValue=${"show_pricing"}
              @change=${this._valueChanged}
            ></ha-switch>
          </div>

          <div class="toggle-row">
            <label for="toggle-show-amenities"
              >${Ue("editor.show_amenities")}</label
            >
            <ha-switch
              id="toggle-show-amenities"
              .checked=${this._config.show_amenities??!0}
              .configValue=${"show_amenities"}
              @change=${this._valueChanged}
            ></ha-switch>
          </div>

          <div class="toggle-row">
            <label for="toggle-sort-by-power"
              >${Ue("editor.sort_by_power")}</label
            >
            <ha-switch
              id="toggle-sort-by-power"
              .checked=${this._config.sort_by_power??!1}
              .configValue=${"sort_by_power"}
              @change=${this._valueChanged}
            ></ha-switch>
          </div>

          <div class="toggle-row">
            <label for="toggle-logo-adapt"
              >${Ue("editor.logo_adapt_to_theme")}</label
            >
            <ha-switch
              id="toggle-logo-adapt"
              .checked=${this._config.logo_adapt_to_theme??!1}
              .configValue=${"logo_adapt_to_theme"}
              @change=${this._valueChanged}
            ></ha-switch>
          </div>
        </div>

        <div class="editor-section">
          <div class="section-header">${Ue("editor.section_filters")}</div>

          <div class="toggle-row">
            <label for="toggle-only-available"
              >${Ue("editor.only_available")}</label
            >
            <ha-switch
              id="toggle-only-available"
              .checked=${this._config.only_available??!1}
              .configValue=${"only_available"}
              @change=${this._valueChanged}
            ></ha-switch>
          </div>

          <div class="toggle-row">
            <label for="toggle-only-free"
              >${Ue("editor.only_free")}</label
            >
            <ha-switch
              id="toggle-only-free"
              .checked=${this._config.only_free??!1}
              .configValue=${"only_free"}
              @change=${this._valueChanged}
            ></ha-switch>
          </div>

          <div class="toggle-row">
            <label for="toggle-only-open"
              >${Ue("editor.only_open")}</label
            >
            <ha-switch
              id="toggle-only-open"
              .checked=${this._config.only_open??!1}
              .configValue=${"only_open"}
              @change=${this._valueChanged}
            ></ha-switch>
          </div>

          <div class="editor-hint">${Ue("editor.connector_filter_hint")}</div>
          <div class="chip-row">
            ${Ze.map(t=>V`
                <button
                  type="button"
                  class=${e.includes(t)?"filter-chip active":"filter-chip"}
                  @click=${()=>this._toggleConnector(t)}
                >
                  ${t}
                </button>
              `)}
          </div>

          <div class="editor-hint">${Ue("editor.amenity_filter_hint")}</div>
          <div class="chip-row">
            ${Je.map(e=>V`
                <button
                  type="button"
                  class=${t.includes(e.key)?"filter-chip icon-chip active":"filter-chip icon-chip"}
                  @click=${()=>this._toggleAmenity(e.key)}
                >
                  <ha-icon icon=${e.icon}></ha-icon>
                  <span>${Ue(e.label_key)}</span>
                </button>
              `)}
          </div>

          <div class="editor-hint">${Ue("editor.payment_filter_hint")}</div>
          <div class="chip-row">
            ${Qe.map(e=>V`
                <button
                  type="button"
                  class=${i.includes(e.key)?"filter-chip icon-chip active":"filter-chip icon-chip"}
                  @click=${()=>this._togglePayment(e.key)}
                >
                  <ha-icon icon=${e.icon}></ha-icon>
                  <span>${Ue(e.label_key)}</span>
                </button>
              `)}
          </div>

          <div class="editor-hint">${Ue("editor.hint_compliance")}</div>
        </div>

        ${this._renderPinSection()}
      </div>
    `}_renderPinSection(){const e=this._config.entity,t=e?this.hass?.states[e]:void 0,i=t?.attributes?.stations??[],n=this._config.pinned_station_ids??[],a=new Set(n),r=new Set(i.map(e=>e.stationId)),o=n.filter(e=>!r.has(e)),s=!0===t?.attributes?.dynamic_mode;return V`
      <div class="editor-section">
        <div class="section-header">${Ue("editor.section_pinned")}</div>
        <div class="editor-hint">${Ue("editor.pin_hint")}</div>

        ${s?V`<div class="editor-hint editor-hint--muted">
              ${Ue("editor.pin_disabled_dynamic")}
            </div>`:e?0===i.length?V`<div class="editor-hint editor-hint--muted">
              ${Ue("editor.pin_no_stations_yet")}
            </div>`:V`
              <div class="pin-list">
                ${i.map(e=>{const t=a.has(e.stationId),i="number"==typeof e.distance?`${e.distance.toFixed(2)} km`:"";return V`
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
            `:V`<div class="editor-hint editor-hint--muted">
              ${Ue("editor.pin_select_sensor_first")}
            </div>`}
        ${o.length>0?V`
              <div class="editor-hint editor-hint--muted">
                ${Ue("editor.pin_orphans_heading")}
              </div>
              <div class="pin-list">
                ${o.map(e=>V`
                    <button
                      type="button"
                      class="pin-row orphan"
                      @click=${()=>this._togglePin(e)}
                    >
                      <ha-icon icon="mdi:pin-off-outline"></ha-icon>
                      <span class="pin-label">${e}</span>
                      <span class="pin-meta">${Ue("editor.pin_unpin")}</span>
                    </button>
                  `)}
              </div>
            `:j}
      </div>
    `}_togglePin(e){const t=this._config.pinned_station_ids??[],i=t.includes(e)?t.filter(t=>t!==e):[...t,e];this._config={...this._config,pinned_station_ids:i},fe(this,"config-changed",{config:this._config})}_toggleConnector(e){const t=this._config.connector_types??[],i=t.includes(e)?t.filter(t=>t!==e):[...t,e];this._config={...this._config,connector_types:i},fe(this,"config-changed",{config:this._config})}_toggleAmenity(e){const t=this._config.amenities??[],i=t.includes(e)?t.filter(t=>t!==e):[...t,e];this._config={...this._config,amenities:i},fe(this,"config-changed",{config:this._config})}_togglePayment(e){const t=this._config.payment_methods??[],i=t.includes(e)?t.filter(t=>t!==e):[...t,e];this._config={...this._config,payment_methods:i},fe(this,"config-changed",{config:this._config})}_valueChanged(e){if(!this._config||!this.hass)return;const t=e.target;if(!t.configValue)return;const i=void 0!==t.checked?t.checked:e.detail?.value??t.value;this._config[t.configValue]!==i&&(this._config={...this._config,[t.configValue]:i},fe(this,"config-changed",{config:this._config}))}static{this.styles=Me}};e([he({attribute:!1})],Xe.prototype,"hass",void 0),e([ue()],Xe.prototype,"_config",void 0),Xe=e([ce("ladestellen-austria-card-editor")],Xe);let et=class extends se{constructor(){super(...arguments),this._config={type:"ladestellen-austria-parking-card"}}setConfig(e){this._config={...e}}render(){Re(this.hass?.language);const e=this._config.entity,t=e?this.hass?.states[e]:void 0,i=t?.attributes?.stations??[],n=this._config.station_id??"",a=!!e&&!!this.hass&&!this.hass.states[e];return V`
      <div class="editor">
        <div class="editor-section">
          <div class="section-header">${Ue("editor.section_main")}</div>

          ${this.hass?V`
                <ha-selector
                  .hass=${this.hass}
                  .selector=${{entity:{domain:"sensor",integration:"ladestellen_austria"}}}
                  .value=${this._config.entity||void 0}
                  .configValue=${"entity"}
                  .label=${Ue("editor.entity")}
                  .required=${!0}
                  aria-invalid=${a?"true":"false"}
                  aria-describedby=${a?"entity-error":j}
                  @value-changed=${this._valueChanged}
                ></ha-selector>
                ${a?V`<ha-alert
                      id="entity-error"
                      alert-type="error"
                    >
                      ${Ue("editor.entity_missing")}
                    </ha-alert>`:j}
              `:V`<p>${Ue("common.loading")}</p>`}

          <ha-textfield
            label=${Ue("editor.name")}
            .value=${this._config.name||""}
            .configValue=${"name"}
            @input=${this._valueChanged}
          ></ha-textfield>
        </div>

        <div class="editor-section">
          <div class="section-header">
            ${Ue("parking.editor_station_heading")}
          </div>
          <div class="editor-hint">
            ${Ue("parking.pick_station_hint")}
          </div>

          ${e?0===i.length?V`<div class="editor-hint editor-hint--muted">
                ${Ue("editor.pin_no_stations_yet")}
              </div>`:V`
                <div class="pin-list">
                  ${i.map(e=>{const t=e.stationId===n,i="number"==typeof e.distance?`${e.distance.toFixed(2)} km`:"";return V`
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
              `:V`<div class="editor-hint editor-hint--muted">
                ${Ue("editor.pin_select_sensor_first")}
              </div>`}
          ${n&&!i.some(e=>e.stationId===n)?V`<div class="editor-hint editor-hint--muted">
                ${Ue("parking.station_not_in_range")}: ${n}
              </div>`:j}
        </div>

        <div class="editor-section">
          <div class="editor-hint">${Ue("editor.hint_compliance")}</div>
        </div>
      </div>
    `}_selectStation(e){const t=this._config.station_id===e?"":e;this._config={...this._config,station_id:t},fe(this,"config-changed",{config:this._config})}_valueChanged(e){if(!this._config||!this.hass)return;const t=e.target;if(!t.configValue)return;const i=void 0!==t.checked?t.checked:e.detail?.value??t.value;this._config[t.configValue]!==i&&(this._config={...this._config,[t.configValue]:i},fe(this,"config-changed",{config:this._config}))}static{this.styles=Me}};e([he({attribute:!1})],et.prototype,"hass",void 0),e([ue()],et.prototype,"_config",void 0),et=e([ce("ladestellen-austria-parking-card-editor")],et),window.customCards=window.customCards||[],window.customCards.push({type:"ladestellen-austria-parking-card",name:"Ladestellen Austria — Parking",description:"Single station, points rendered as parking slots viewed from above.",preview:!0,documentationURL:"https://github.com/rolandzeiner/ladestellen-austria"});let tt=class extends se{static getConfigElement(){return document.createElement("ladestellen-austria-parking-card-editor")}static getStubConfig(e,t){const i=t.find(e=>e.startsWith("sensor.")&&e.includes("ladestelle"));return{entity:i??"",station_id:""}}setConfig(e){if(!e)throw new Error(Ue("common.invalid_configuration"));this.config={...e}}shouldUpdate(e){if(!this.config)return!1;if(e.has("config"))return!0;const t=e.get("hass");return!t||!this.config.entity||t.states[this.config.entity]!==this.hass.states[this.config.entity]}getCardSize(){return 3}getGridOptions(){return{columns:6,rows:"auto",min_columns:4,min_rows:3}}render(){if(Re(this.hass?.language),!this.hass||!this.config)return V`<ha-card>
        <div class="card-content">
          <div class="empty-state">${Ue("common.loading")}</div>
        </div>
      </ha-card>`;const e=this.config.entity?this.hass.states[this.config.entity]:void 0;if(!e)return V`<ha-card>
        <div class="card-content">
          <div class="empty-state">${Ue("card.no_entity")}</div>
        </div>
      </ha-card>`;const t=e.attributes.stations??[],i=this.config.station_id??"",n=t.find(e=>e.stationId===i),a=this.config.name;if(!i||!n)return V`<ha-card>
        <div class="card-content">
          ${a?V`<div class="parking-title">${a}</div>`:j}
          <div class="empty-state">
            ${Ue(i?"parking.station_not_found":"parking.no_station_selected")}
          </div>
        </div>
      </ha-card>`;const r=n.points??[],o=r.filter(e=>"ok"===Ve(e.status)).length,s=r.length,l=Ue("parking.available_count").replace("{avail}",String(o)).replace("{total}",String(s));return V`
      <ha-card>
        <div class="card-content">
          <header class="parking-header">
            <div class="parking-title-group">
              ${a?V`<h3 class="parking-title">${a}</h3>`:j}
              <div class="parking-station-label">${n.label}</div>
            </div>
            <div
              class=${o>0?"parking-count parking-count--ok":"parking-count"}
              role="status"
              aria-live="polite"
            >
              ${l}
            </div>
          </header>
          ${0===r.length?V`<div class="empty-state">
                ${Ue("parking.no_points")}
              </div>`:V`<div
                class="parking-lot"
                role="list"
                aria-label=${l}
              >
                ${r.map(e=>this._renderSlot(e))}
              </div>`}
        </div>
      </ha-card>
    `}_renderSlot(e){const t=Ve(e.status),i=Be(e),n=Ye(e),a=je(e.capacityKw),r=We(e.status),o=this._slotStatusBucket(t),s="ok"===t,l=[i?i.toUpperCase():null,e.capacityKw?`${a} kW`:null,n&&"–"!==n?n:null,r].filter(Boolean).join(" · ");return V`
      <div
        class=${"parking-slot "+(s?"is-available":"is-muted")}
        data-status=${t}
        role="listitem"
        aria-label=${l}
        title=${`${e.evseId??""} · ${r}`.trim()}
      >
        <span class="slot-inner">
          ${i?V`<span
                class="slot-power-badge"
                data-type=${i}
                >${i.toUpperCase()}</span
              >`:j}
          <span class="slot-kw">
            <span class="slot-kw-num">${a}</span
            ><span class="slot-kw-unit">kW</span>
          </span>
          <span class="slot-connector">${n}</span>
          <span class="slot-status-word slot-status-${o}"
            >${this._slotStatusWord(o,r)}</span
          >
        </span>
      </div>
    `}_slotStatusBucket(e){switch(e){case"ok":return"free";case"busy":return"busy";case"warn":return"warn";default:return"unknown"}}_slotStatusWord(e,t){const i=`parking.slot_status_${e}`,n=Ue(i);return n===i?t:n}static{this.styles=Fe}};e([he({attribute:!1})],tt.prototype,"hass",void 0),e([ue()],tt.prototype,"config",void 0),tt=e([ce("ladestellen-austria-parking-card")],tt),console.info(`%c  Ladestellen Austria Card  %c  ${Ue("common.version")} 0.2.1-beta-1  `,"color: white; font-weight: bold; background: #3FA535","color: white; font-weight: bold; background: dimgray"),window.customCards=window.customCards||[],window.customCards.push({type:"ladestellen-austria-card",name:"Ladestellen Austria",description:"Nearby EV charging stations, powered by E-Control Austria",preview:!0,documentationURL:"https://github.com/rolandzeiner/ladestellen-austria"});const it={MONDAY:0,TUESDAY:1,WEDNESDAY:2,THURSDAY:3,FRIDAY:4,SATURDAY:5,SUNDAY:6},nt={Mon:0,Tue:1,Wed:2,Thu:3,Fri:4,Sat:5,Sun:6};let at=class extends se{constructor(){super(...arguments),this._expanded=new Set}static getConfigElement(){return document.createElement("ladestellen-austria-card-editor")}static getStubConfig(e,t){const i=t.find(e=>e.startsWith("sensor.")&&e.includes("ladestelle"));return{entity:i??""}}setConfig(e){if(!e)throw new Error(Ue("common.invalid_configuration"));this.config={name:"Ladestellen Austria",max_stations:10,show_hero:!0,show_amenities:!0,show_pricing:!0,sort_by_power:!1,logo_adapt_to_theme:!1,only_available:!1,only_free:!1,only_open:!1,connector_types:[],amenities:[],payment_methods:[],pinned_station_ids:[],...e}}shouldUpdate(e){if(!this.config)return!1;if(e.has("config")||e.has("_expanded"))return!0;const t=e.get("hass");return!t||!this.config.entity||t.states[this.config.entity]!==this.hass.states[this.config.entity]}getCardSize(){const e=this.config?.max_stations??10;return Math.min(3+Math.ceil(e/3),10)}getGridOptions(){return{columns:12,rows:"auto",min_columns:6,min_rows:3}}render(){if(Re(this.hass?.language),!this.hass||!this.config)return V`<ha-card>
        <div class="card-content">
          <div class="empty-state">${Ue("common.loading")}</div>
        </div>
      </ha-card>`;const e=this.config.entity?this.hass.states[this.config.entity]:void 0;if(!e)return V`
        <ha-card>
          <div class="card-content">
            <div class="empty-state">${Ue("card.no_entity")}</div>
            ${this._renderFooter(void 0)}
          </div>
        </ha-card>
      `;const t=e.attributes.stations??[],i=!0===e.attributes.live_status_available,n=!0===e.attributes.dynamic_mode,a=e.attributes.dynamic_entity??null,r=n?[]:this.config.pinned_station_ids??[],o=this._collectPinnedItems(r,t),s=new Set(o.filter(e=>"live"===e.kind).map(e=>e.stationId)),l=t.filter(e=>!s.has(e.stationId)),c=this._filterStations(l),d=this._sortStations(c),p=t[0],h=Math.max(1,this.config.max_stations??10),u=[...o,...d.map(e=>({kind:"live",station:e}))],g=u.slice(0,h),m=g.filter(e=>"live"===e.kind).map(e=>e.station),f=m.length>0?m[m.length-1]:void 0,v=!1!==this.config.show_hero,_=this.config.name&&"Ladestellen Austria"!==this.config.name?this.config.name:null;return V`
      <ha-card>
        <div class="card-content">
          ${_?V`<h3 class="custom-title">${_}</h3>`:j}
          ${v?this._renderHero(p,f,c.length,t.length):j}
          ${n&&a?V`<div class="dynamic-indicator">
                <ha-icon icon="mdi:crosshairs-gps"></ha-icon>
                <span
                  >${Ue("card.dynamic_follows_entity").replace("{entity}",a)}</span
                >
              </div>`:j}
          ${g.length>0?V`<ul class="stations">
                ${g.map(e=>"live"===e.kind?this._renderStation(e.station,i,s.has(e.station.stationId)):this._renderOrphanPin(e.id))}
              </ul>`:V`<div class="empty-state">
                ${Ue("card.no_stations")}
              </div>`}
          ${this._renderFooter(e.attributes.attribution)}
        </div>
      </ha-card>
    `}_sortStations(e){return[...e].sort((e,t)=>{if(this.config.sort_by_power){const i=Math.max(0,...(e.points??[]).map(e=>e.capacityKw??0)),n=Math.max(0,...(t.points??[]).map(e=>e.capacityKw??0));if(n!==i)return n-i}else{const i=e.distance??1/0,n=t.distance??1/0;if(i!==n)return i-n}const i=this._stationHasFree(e);return i!==this._stationHasFree(t)?i?-1:1:(e.distance??1/0)-(t.distance??1/0)})}_stationHasFree(e){return"ACTIVE"===e.stationStatus&&(e.points??[]).some(e=>"AVAILABLE"===e.status)}_collectPinnedItems(e,t){const i=new Map(t.map(e=>[e.stationId,e])),n=new Set,a=[];for(const t of e){if(n.has(t))continue;n.add(t);const e=i.get(t);e?a.push({kind:"live",station:e,stationId:e.stationId}):a.push({kind:"orphan",id:t})}return a}_unpinStation(e){const t=(this.config.pinned_station_ids??[]).filter(t=>t!==e),i={...this.config,pinned_station_ids:t};fe(this,"config-changed",{config:i})}_renderOrphanPin(e){return V`
      <li class="station orphan-pin" role="listitem">
        <div class="station-body orphan-body">
          <ha-icon class="orphan-icon" icon="mdi:pin-off-outline"></ha-icon>
          <div class="orphan-text">
            <div class="orphan-title">
              ${Ue("card.orphan_pin_title")}
            </div>
            <div class="orphan-id">${e}</div>
          </div>
          <button
            class="orphan-remove"
            type="button"
            aria-label=${Ue("card.unpin")}
            title=${Ue("card.unpin")}
            @click=${t=>{t.stopPropagation(),this._unpinStation(e)}}
          >
            <ha-icon icon="mdi:close"></ha-icon>
          </button>
        </div>
      </li>
    `}_filterStations(e){const t=this.config.only_available??!1,i=this.config.only_free??!1,n=this.config.only_open??!1,a=this.config.connector_types??[],r=this.config.amenities??[],o=this.config.payment_methods??[];if(!t&&!i&&!n&&0===a.length&&0===r.length&&0===o.length)return e;const s=new Date,l=this.hass?.config?.time_zone??"Europe/Vienna";return e.filter(e=>{if(t){const t="ACTIVE"===e.stationStatus&&(e.points??[]).some(e=>"AVAILABLE"===e.status);if(!t)return!1}if(i){const t=(e.points??[]).some(e=>e.freeOfCharge);if(!t)return!1}if(n){if(!1===this._isOpenNow(e.openingHours,s,l))return!1}if(a.length>0){const t=new Set((e.points??[]).flatMap(e=>(e.connectorType??[]).map(e=>qe(e.consumerName,e.key)))),i=a.some(e=>t.has(e));if(!i)return!1}if(r.length>0){if(!r.every(t=>this._stationHasAmenity(e,t)))return!1}if(o.length>0){const t=new Set((e.points??[]).flatMap(e=>e.authenticationMode??[])),i=o.some(e=>t.has(e));if(!i)return!1}return!0})}_stationHasAmenity(e,t){switch(t){case"green_energy":return Boolean(e.greenEnergy);case"austrian_ecolabel":return Boolean(e.austrianEcoLabel);case"free_parking":return Boolean(e.freeParking);case"roofed_parking":return Boolean(e.roofedParking);case"illuminated_parking":return Boolean(e.illuminatedParking);case"barrier_free":return(e.barrierFreeParkingPlaces??0)>0;case"catering":return Boolean(e.cateringService);case"bathrooms":return Boolean(e.bathroomsAvailable);case"resting":return Boolean(e.restingFacilities);default:return!1}}_renderFooter(e){const t=!0===this.config?.logo_adapt_to_theme,i=Boolean(this.hass?.themes?.darkMode),n=t?"brand-logo adaptive "+(i?"adaptive-dark":"adaptive-light"):"brand-logo",a=e&&e.includes("E-Control")?e:"Datenquelle: E-Control";return V`
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
        <span class="attribution-text">${a}</span>
      </div>
    `}_renderHero(e,t,i,n){if(!e)return V`<section class="hero hero--empty" aria-live="polite">
        <div class="hero-label">${Ue("card.no_stations")}</div>
      </section>`;const a=this._formatKm(e.distance),r=this._heroCity(e),o=t?this._formatKm(t.distance):a,s=Ue("card.hero_range").replace("{min}",this._formatKm(e.distance)).replace("{max}",o),l=i===n?Ue("card.hero_count").replace("{count}",String(i)):Ue("card.hero_count_filtered").replace("{filtered}",String(i)).replace("{total}",String(n));return V`
      <section class="hero" aria-live="polite">
        <div class="hero-value">
          <span class="hero-number">${a}</span>
          <span class="hero-unit">km</span>
        </div>
        <div class="hero-context">
          <div class="hero-context-1">
            ${Ue("card.hero_context").replace("{city}",r)}
          </div>
          <div class="hero-context-2">${l} · ${s}</div>
        </div>
      </section>
    `}_heroCity(e){return e.city||e.label||""}_renderStation(e,t,i=!1){const n=e.points??[],a=n.some(e=>(e.electricityType??[]).includes("DC")),r=n.reduce((e,t)=>Math.max(e,t.capacityKw??0),0),o=Array.from(new Set(n.flatMap(e=>(e.connectorType??[]).map(e=>qe(e.consumerName,e.key))))),s=o.slice(0,3),l=o.length-s.length,c=this._priceText(n),d=n.some(e=>e.freeOfCharge),p=n.length,h=n.filter(e=>"AVAILABLE"===He(e.status)).length,u="ACTIVE"===e.stationStatus,g=this.hass?.config?.time_zone??"Europe/Vienna",m=this._isOpenNow(e.openingHours,new Date,g),f=this._statusLevel(t,u,n,m),v=this._expanded.has(e.stationId),_=`https://www.google.com/maps/search/?api=1&query=${e.location.lat},${e.location.lon}`,b=this.config?.show_amenities??!0,y=this.config?.show_pricing??!0,w=["station",v?"expanded":"",i?"pinned":"","inactive"===f?"inactive":""].filter(Boolean).join(" ");return V`
      <li
        class=${w}
        @click=${()=>this._toggle(e.stationId)}
        @keydown=${t=>this._onKey(t,e.stationId)}
        tabindex="0"
        role="button"
        aria-expanded=${v?"true":"false"}
      >
        <div class="station-body">
          <span
            class=${`status-dot status-${f}`}
            aria-label=${this._statusAria(f,h,p)}
          ></span>
          <div class="station-grid">
            <span class="station-metrics">
              ${i?V`<ha-icon
                    class="pin-indicator"
                    icon="mdi:pin"
                    title=${Ue("card.pinned")}
                    aria-label=${Ue("card.pinned")}
                  ></ha-icon>`:j}
              ${r>0?V`<span
                    class=${a?"metric-kw metric-kw--dc":"metric-kw"}
                  >
                    <span class="kw-num">${r}</span
                    ><span class="kw-unit">kW</span>
                  </span>`:j}
              ${s.map(e=>V`<span class="pill plug">${e}</span>`)}
              ${l>0?V`<span class="pill plug plug-more"
                    >+${l}</span
                  >`:j}
            </span>
            ${y&&c?V`<span
                  class=${d?"metric-price metric-free":"metric-price"}
                  >${c}</span
                >`:V`<span class="metric-price-placeholder"></span>`}
            <ha-icon
              class="chevron"
              icon=${v?"mdi:chevron-up":"mdi:chevron-down"}
            ></ha-icon>
            <div class="station-name">${e.label}</div>
            <a
              class="station-distance"
              href=${_}
              target="_blank"
              rel="noopener noreferrer"
              aria-label=${Ue("card.open_in_maps")}
              title=${Ue("card.open_in_maps")}
              @click=${e=>e.stopPropagation()}
            >
              <ha-icon icon="mdi:map-marker-outline"></ha-icon>
              <span class="distance-value">
                ${this._formatKm(e.distance)}<span class="unit"
                  >km</span
                >
              </span>
            </a>
          </div>
        </div>
        ${v?this._renderStationDetail(e,m,b,_):j}
      </li>
    `}_renderStationDetail(e,t,i,n){const a=this._amenityItems(e),r=e.points??[],o=this._address(e),s=this._paymentChips(r),l=this._feesLine(r),c=e.operatorName||e.owner||"";return V`
      <div class="detail">
        ${c?V`<div class="operator-line">
              <span class="detail-label">
                ${Ue("card.operator_heading")}
              </span>
              <span class="operator-name">${c}</span>
            </div>`:j}
        ${e.description?V`<div class="station-note">
              <ha-icon icon="mdi:information-outline"></ha-icon>
              <span>${e.description}</span>
            </div>`:j}
        ${r.length>0?V`<div class="detail-section">
              <div class="detail-label">
                ${Ue("card.charging_points_heading")}
              </div>
              ${this._renderRack(r)}
              ${l?V`<div class="fees-line">${l}</div>`:j}
            </div>`:j}
        ${this._renderOpeningHoursSection(e.openingHours,t)}
        ${s.length>0?V`<div class="detail-section">
              <div class="detail-label">
                ${Ue("card.payment_heading")}
              </div>
              <div class="payment-row">
                ${s.map(e=>V`
                    <span class="payment-chip" title=${e.label}>
                      <ha-icon icon=${e.icon}></ha-icon>
                      <span>${e.label}</span>
                    </span>
                  `)}
              </div>
            </div>`:j}
        ${i&&a.length>0?V`<div class="detail-section">
              <div class="detail-label">
                ${Ue("card.amenities_heading")}
              </div>
              <div class="amenities">
                ${a.map(e=>V`
                    <span class="amenity" title=${e.label}>
                      <ha-icon icon=${e.icon}></ha-icon>
                      <span>${e.label}</span>
                    </span>
                  `)}
              </div>
            </div>`:j}
        ${o?V`<div class="detail-section">
              <div class="detail-label">
                ${Ue("card.address_heading")}
              </div>
              <div class="detail-address">${o}</div>
            </div>`:j}
        <div class="detail-actions">
          <a
            class="action-btn primary"
            href=${n}
            target="_blank"
            rel="noopener noreferrer"
            @click=${e=>e.stopPropagation()}
          >
            <ha-icon icon="mdi:map-marker-radius-outline"></ha-icon>
            <span>${Ue("card.open_in_maps")}</span>
          </a>
          ${e.website?V`<a
                class="action-btn"
                href=${e.website}
                target="_blank"
                rel="noopener noreferrer"
                @click=${e=>e.stopPropagation()}
              >
                <ha-icon icon="mdi:web"></ha-icon>
                <span>${Ue("card.website")}</span>
              </a>`:j}
          ${e.phoneNumber?V`<a
                class="action-btn"
                href=${`tel:${e.phoneCountryCode??""}${e.phoneNumber}`}
                @click=${e=>e.stopPropagation()}
              >
                <ha-icon icon="mdi:phone-outline"></ha-icon>
                <span>${Ue("card.call")}</span>
              </a>`:j}
          ${e.priceUrl?V`<a
                class="action-btn"
                href=${e.priceUrl}
                target="_blank"
                rel="noopener noreferrer"
                @click=${e=>e.stopPropagation()}
              >
                <ha-icon icon="mdi:cash-multiple"></ha-icon>
                <span>${Ue("card.tariff")}</span>
              </a>`:j}
        </div>
      </div>
    `}_renderRack(e){return V`
      <div class="rack">
        ${e.map(e=>this._renderRackSlot(e))}
      </div>
    `}_renderRackSlot(e){const t=Be(e),i=Ve(e.status),n=this._pointTooltip(e),a=this._pointAriaLabel(e,t),r=t?V`<span class="power-badge" data-type=${t}
          >${t.toUpperCase()}</span
        >`:j;if("warn"===i)return V`
        <div
          class="rack-slot"
          role="group"
          aria-label=${a}
          data-status=${i}
          title=${n}
        >
          <ha-icon
            class="rack-warn-icon"
            icon="mdi:wrench-outline"
          ></ha-icon>
        </div>
      `;const o=Ye(e),s=je(e.capacityKw);return V`
      <div
        class="rack-slot"
        role="group"
        aria-label=${a}
        data-status=${i}
        title=${n}
      >
        <span class="rack-dot status-${i}"></span>
        ${r}
        <span class="rack-kw">
          <span class="rack-kw-num">${s}</span
          ><span class="rack-kw-unit">kW</span>
        </span>
        <span class="rack-connector">${o}</span>
      </div>
    `}_pointAriaLabel(e,t){const i=[];t&&i.push(t.toUpperCase()),e.capacityKw&&i.push(`${je(e.capacityKw)} kW`);const n=Ye(e);n&&"–"!==n&&i.push(n);const a=We(e.status);return a&&i.push(a),i.join(" · ")}_pointTooltip(e){const t=[`${e.evseId??""} · ${We(e.status)}`.trim()],i=e.startFeeCent??0;i>0&&t.push(`${Ue("card.start_fee_label")}: ${Ke(i)} €`);const n=e.blockingFeeCentMin??0,a=e.blockingFeeFromMinute??0;return n>0&&a>0&&t.push(`${Ge(n)} ${Ue("card.blocking_fee_label").replace("{from}",String(a))}`),t.join("\n")}_renderOpeningHoursSection(e,t){if(!e||0===e.length)return j;const i=this._formatOpeningHours(e);if(0===i.length)return j;const n=!0===t?"status-ok":!1===t?"status-inactive":null,a=!0===t?Ue("card.open_now"):!1===t?Ue("card.closed_now"):null;return V`
      <div class="detail-section">
        <div class="detail-label">
          ${Ue("card.opening_hours_heading")}
        </div>
        <div class="hours-row">
          <dl class="hours-lines">
            ${i.map(e=>V`<div class="hours-line">
                <dt class="hours-day">${e.day}</dt>
                <dd class="hours-time">${e.time}</dd>
              </div>`)}
          </dl>
          ${a?V`<span class=${`hours-chip ${n??""}`}>
                <span class=${`status-dot ${n??""}`}></span>
                ${a}
              </span>`:j}
        </div>
      </div>
    `}_formatOpeningHours(e){const t=[];for(const i of e){const e=this._formatSingleRange(i);e&&t.push(e)}return t}_formatSingleRange(e){const t=this._shortDay(e.fromWeekday),i=this._shortDay(e.toWeekday);if(!t||!i)return null;const n="00:00"===e.fromTime&&("23:59"===e.toTime||"24:00"===e.toTime);return{day:e.fromWeekday===e.toWeekday?t:`${t}–${i}`,time:n?Ue("card.always_open_short"):`${e.fromTime}–${e.toTime}`}}_shortDay(e){switch((e??"").toUpperCase()){case"MONDAY":return Ue("weekday.mo");case"TUESDAY":return Ue("weekday.tu");case"WEDNESDAY":return Ue("weekday.we");case"THURSDAY":return Ue("weekday.th");case"FRIDAY":return Ue("weekday.fr");case"SATURDAY":return Ue("weekday.sa");case"SUNDAY":return Ue("weekday.su");default:return""}}_isOpenNow(e,t,i){if(!e||0===e.length)return null;const n=this._minuteOfWeek(t,i);if(null==n)return null;for(const t of e){const e=this._hoursToMow(t.fromWeekday,t.fromTime),i=this._hoursToMow(t.toWeekday,t.toTime);if(null!=e&&null!=i)if(e<=i){if(n>=e&&n<=i)return!0}else if(n>=e||n<=i)return!0}return!1}_minuteOfWeek(e,t){try{const i=new Intl.DateTimeFormat("en-US",{timeZone:t,weekday:"short",hour:"2-digit",minute:"2-digit",hour12:!1}).formatToParts(e),n=i.find(e=>"weekday"===e.type)?.value??"",a=i.find(e=>"hour"===e.type)?.value??"",r=i.find(e=>"minute"===e.type)?.value??"",o=nt[n];if(void 0===o)return null;let s=parseInt(a,10);const l=parseInt(r,10);return Number.isFinite(s)&&Number.isFinite(l)?(24===s&&(s=0),1440*o+60*s+l):null}catch{return null}}_hoursToMow(e,t){const i=it[(e??"").toUpperCase()];if(void 0===i)return null;const[n,a]=(t??"").split(":"),r=parseInt(n,10),o=parseInt(a,10);return Number.isFinite(r)&&Number.isFinite(o)?1440*i+60*r+o:null}_paymentChips(e){const t=new Set,i=[];for(const n of e)for(const e of n.authenticationMode??[]){if(t.has(e))continue;t.add(e);const n=this._authLabel(e);n&&i.push(n)}return i}_authLabel(e){switch(e){case"APP":return{icon:"mdi:cellphone",label:Ue("auth.app")};case"QR":return{icon:"mdi:qrcode",label:Ue("auth.qr")};case"RFID_READER":return{icon:"mdi:credit-card-wireless-outline",label:Ue("auth.rfid")};case"CHARGING_CONTRACT":return{icon:"mdi:handshake-outline",label:Ue("auth.contract")};case"DEBIT_CARD":return{icon:"mdi:credit-card-outline",label:Ue("auth.debit")};case"CREDIT_CARD":return{icon:"mdi:credit-card",label:Ue("auth.credit")};case"CONTACTLESS_CARD_SUPPORT":return{icon:"mdi:contactless-payment",label:Ue("auth.contactless")};default:return null}}_feesLine(e){const t=e.map(e=>e.startFeeCent??0).filter(e=>e>0),i=e.map(e=>({cent:e.blockingFeeCentMin??0,fromMin:e.blockingFeeFromMinute??0})).filter(e=>e.cent>0&&e.fromMin>0),n=[];if(t.length>0){const e=Math.max(...t);n.push(`+ ${Ke(e)} € ${Ue("card.start_fee_label")}`)}if(i.length>0){const e=Math.max(...i.map(e=>e.cent)),t=Math.min(...i.map(e=>e.fromMin));n.push(`${Ge(e)} ${Ue("card.blocking_fee_label").replace("{from}",String(t))}`)}return n.length>0?n.join(", "):null}_statusLevel(e,t,i,n=null){if(!t)return"inactive";if(!1===n)return"inactive";const a=i.length;if(!e||0===a)return"unknown";let r=0,o=0,s=0;for(const e of i){const t=He(e.status);"AVAILABLE"===t?r++:"CHARGING"===t||"OCCUPIED"===t||"RESERVED"===t||"BLOCKED"===t?o++:"OUTOFORDER"!==t&&"FAULTED"!==t&&"INOPERATIVE"!==t&&"UNAVAILABLE"!==t||s++}return 0===r?0===o&&s>0?"inactive":"busy":r<a?"partial":"ok"}_statusAria(e,t,i){return"inactive"===e?Ue("card.inactive"):"unknown"===e?Ue("card.status_unknown"):`${t} / ${i} ${Ue("card.live_suffix")}`}_toggle(e){const t=new Set(this._expanded);t.has(e)?t.delete(e):t.add(e),this._expanded=t}_onKey(e,t){"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),this._toggle(t))}_priceText(e){if(0===e.length)return"";if(e.some(e=>e.freeOfCharge))return Ue("card.gratis");const t=e.filter(e=>!e.freeOfCharge&&e.priceCentKwh>0).map(e=>e.priceCentKwh);if(t.length>0)return`${Ke(Math.min(...t))} €/kWh`;const i=e.filter(e=>!e.freeOfCharge&&e.priceCentMin>0).map(e=>e.priceCentMin);return i.length>0?`${Ke(Math.min(...i))} €/min`:""}_address(e){const t=[];e.street&&t.push(e.street);const i=[e.postCode,e.city].filter(Boolean).join(" ");return i&&t.push(i),t.join(", ")}_amenityItems(e){return[{flag:e.greenEnergy,icon:"mdi:leaf",label:Ue("amenities.green_energy")},{flag:e.austrianEcoLabel,icon:"mdi:certificate-outline",label:Ue("amenities.austrian_ecolabel")},{flag:e.freeParking,icon:"mdi:parking",label:Ue("amenities.free_parking")},{flag:e.roofedParking,icon:"mdi:home-roof",label:Ue("amenities.roofed_parking")},{flag:e.illuminatedParking,icon:"mdi:lightbulb-outline",label:Ue("amenities.illuminated_parking")},{flag:(e.barrierFreeParkingPlaces??0)>0,icon:"mdi:wheelchair-accessibility",label:Ue("amenities.barrier_free")},{flag:e.cateringService,icon:"mdi:silverware-fork-knife",label:Ue("amenities.catering")},{flag:e.bathroomsAvailable,icon:"mdi:toilet",label:Ue("amenities.bathrooms")},{flag:e.restingFacilities,icon:"mdi:sofa",label:Ue("amenities.resting")}].filter(e=>e.flag)}_formatKm(e){const t="number"==typeof e?e:parseFloat(String(e??""));if(!Number.isFinite(t))return"–";try{return new Intl.NumberFormat("de-AT",{minimumFractionDigits:2,maximumFractionDigits:2}).format(t)}catch{return t.toFixed(2)}}static{this.styles=Ie}};e([he({attribute:!1})],at.prototype,"hass",void 0),e([ue()],at.prototype,"config",void 0),e([ue()],at.prototype,"_expanded",void 0),at=e([ce("ladestellen-austria-card")],at);export{at as LadestellenAustriaCard};
