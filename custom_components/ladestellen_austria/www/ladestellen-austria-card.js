// Ladestellen Austria Card — bundled by Rollup. Edit sources in src/, then `npm run build`.
function t(t,e,i,n){var a,s=arguments.length,r=s<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,n);else for(var o=t.length-1;o>=0;o--)(a=t[o])&&(r=(s<3?a(r):s>3?a(e,i,r):a(e,i))||r);return s>3&&r&&Object.defineProperty(e,i,r),r}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,n=Symbol(),a=new WeakMap;let s=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=a.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&a.set(e,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,n)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[n+1],t[0]);return new s(i,t,n)},o=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new s("string"==typeof t?t:t+"",void 0,n))(e)})(t):t,{is:l,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,g=globalThis,f=g.trustedTypes,m=f?f.emptyScript:"",v=g.reactiveElementPolyfillSupport,_=(t,e)=>t,b={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},y=(t,e)=>!l(t,e),x={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let $=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=x){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),n=this.getPropertyDescriptor(t,i,e);void 0!==n&&c(this.prototype,t,n)}}static getPropertyDescriptor(t,e,i){const{get:n,set:a}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:n,set(e){const s=n?.call(this);a?.call(this,e),this.requestUpdate(t,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??x}static _$Ei(){if(this.hasOwnProperty(_("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(_("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_("properties"))){const t=this.properties,e=[...h(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(o(t))}else void 0!==t&&e.push(o(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,n)=>{if(i)t.adoptedStyleSheets=n.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of n){const n=document.createElement("style"),a=e.litNonce;void 0!==a&&n.setAttribute("nonce",a),n.textContent=i.cssText,t.appendChild(n)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,i);if(void 0!==n&&!0===i.reflect){const a=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(e,i.type);this._$Em=t,null==a?this.removeAttribute(n):this.setAttribute(n,a),this._$Em=null}}_$AK(t,e){const i=this.constructor,n=i._$Eh.get(t);if(void 0!==n&&this._$Em!==n){const t=i.getPropertyOptions(n),a="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=n;const s=a.fromAttribute(e,t.type);this[n]=s??this._$Ej?.get(n)??s,this._$Em=null}}requestUpdate(t,e,i,n=!1,a){if(void 0!==t){const s=this.constructor;if(!1===n&&(a=this[t]),i??=s.getPropertyOptions(t),!((i.hasChanged??y)(a,e)||i.useDefault&&i.reflect&&a===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:n,wrapped:a},s){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,s??e??this[t]),!0!==a||void 0!==s)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===n&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,n=this[e];!0!==t||this._$AL.has(e)||void 0===n||this.C(e,void 0,i,n)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[_("elementProperties")]=new Map,$[_("finalized")]=new Map,v?.({ReactiveElement:$}),(g.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,k=t=>t,A=w.trustedTypes,S=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,z="?"+E,P=`<${z}>`,O=document,M=()=>O.createComment(""),T=t=>null===t||"object"!=typeof t&&"function"!=typeof t,L=Array.isArray,U="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,H=/-->/g,D=/>/g,R=RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),I=/'/g,j=/"/g,F=/^(?:script|style|textarea|title)$/i,V=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),B=Symbol.for("lit-noChange"),K=Symbol.for("lit-nothing"),W=new WeakMap,q=O.createTreeWalker(O,129);function G(t,e){if(!L(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const Y=(t,e)=>{const i=t.length-1,n=[];let a,s=2===e?"<svg>":3===e?"<math>":"",r=N;for(let e=0;e<i;e++){const i=t[e];let o,l,c=-1,d=0;for(;d<i.length&&(r.lastIndex=d,l=r.exec(i),null!==l);)d=r.lastIndex,r===N?"!--"===l[1]?r=H:void 0!==l[1]?r=D:void 0!==l[2]?(F.test(l[2])&&(a=RegExp("</"+l[2],"g")),r=R):void 0!==l[3]&&(r=R):r===R?">"===l[0]?(r=a??N,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,o=l[1],r=void 0===l[3]?R:'"'===l[3]?j:I):r===j||r===I?r=R:r===H||r===D?r=N:(r=R,a=void 0);const h=r===R&&t[e+1].startsWith("/>")?" ":"";s+=r===N?i+P:c>=0?(n.push(o),i.slice(0,c)+C+i.slice(c)+E+h):i+E+(-2===c?e:h)}return[G(t,s+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),n]};class Z{constructor({strings:t,_$litType$:e},i){let n;this.parts=[];let a=0,s=0;const r=t.length-1,o=this.parts,[l,c]=Y(t,e);if(this.el=Z.createElement(l,i),q.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(n=q.nextNode())&&o.length<r;){if(1===n.nodeType){if(n.hasAttributes())for(const t of n.getAttributeNames())if(t.endsWith(C)){const e=c[s++],i=n.getAttribute(t).split(E),r=/([.?@])?(.*)/.exec(e);o.push({type:1,index:a,name:r[2],strings:i,ctor:"."===r[1]?et:"?"===r[1]?it:"@"===r[1]?nt:tt}),n.removeAttribute(t)}else t.startsWith(E)&&(o.push({type:6,index:a}),n.removeAttribute(t));if(F.test(n.tagName)){const t=n.textContent.split(E),e=t.length-1;if(e>0){n.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)n.append(t[i],M()),q.nextNode(),o.push({type:2,index:++a});n.append(t[e],M())}}}else if(8===n.nodeType)if(n.data===z)o.push({type:2,index:a});else{let t=-1;for(;-1!==(t=n.data.indexOf(E,t+1));)o.push({type:7,index:a}),t+=E.length-1}a++}}static createElement(t,e){const i=O.createElement("template");return i.innerHTML=t,i}}function J(t,e,i=t,n){if(e===B)return e;let a=void 0!==n?i._$Co?.[n]:i._$Cl;const s=T(e)?void 0:e._$litDirective$;return a?.constructor!==s&&(a?._$AO?.(!1),void 0===s?a=void 0:(a=new s(t),a._$AT(t,i,n)),void 0!==n?(i._$Co??=[])[n]=a:i._$Cl=a),void 0!==a&&(e=J(t,a._$AS(t,e.values),a,n)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,n=(t?.creationScope??O).importNode(e,!0);q.currentNode=n;let a=q.nextNode(),s=0,r=0,o=i[0];for(;void 0!==o;){if(s===o.index){let e;2===o.type?e=new X(a,a.nextSibling,this,t):1===o.type?e=new o.ctor(a,o.name,o.strings,this,t):6===o.type&&(e=new at(a,this,t)),this._$AV.push(e),o=i[++r]}s!==o?.index&&(a=q.nextNode(),s++)}return q.currentNode=O,n}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,n){this.type=2,this._$AH=K,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=J(this,t,e),T(t)?t===K||null==t||""===t?(this._$AH!==K&&this._$AR(),this._$AH=K):t!==this._$AH&&t!==B&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>L(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==K&&T(this._$AH)?this._$AA.nextSibling.data=t:this.T(O.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,n="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Z.createElement(G(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===n)this._$AH.p(e);else{const t=new Q(n,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=W.get(t.strings);return void 0===e&&W.set(t.strings,e=new Z(t)),e}k(t){L(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,n=0;for(const a of t)n===e.length?e.push(i=new X(this.O(M()),this.O(M()),this,this.options)):i=e[n],i._$AI(a),n++;n<e.length&&(this._$AR(i&&i._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=k(t).nextSibling;k(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,n,a){this.type=1,this._$AH=K,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=a,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=K}_$AI(t,e=this,i,n){const a=this.strings;let s=!1;if(void 0===a)t=J(this,t,e,0),s=!T(t)||t!==this._$AH&&t!==B,s&&(this._$AH=t);else{const n=t;let r,o;for(t=a[0],r=0;r<a.length-1;r++)o=J(this,n[i+r],e,r),o===B&&(o=this._$AH[r]),s||=!T(o)||o!==this._$AH[r],o===K?t=K:t!==K&&(t+=(o??"")+a[r+1]),this._$AH[r]=o}s&&!n&&this.j(t)}j(t){t===K?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===K?void 0:t}}class it extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==K)}}class nt extends tt{constructor(t,e,i,n,a){super(t,e,i,n,a),this.type=5}_$AI(t,e=this){if((t=J(this,t,e,0)??K)===B)return;const i=this._$AH,n=t===K&&i!==K||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,a=t!==K&&(i===K||n);n&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class at{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){J(this,t)}}const st=w.litHtmlPolyfillSupport;st?.(Z,X),(w.litHtmlVersions??=[]).push("3.3.2");const rt=globalThis;class ot extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const n=i?.renderBefore??e;let a=n._$litPart$;if(void 0===a){const t=i?.renderBefore??null;n._$litPart$=a=new X(e.insertBefore(M(),t),t,void 0,i??{})}return a._$AI(t),a})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return B}}ot._$litElement$=!0,ot.finalized=!0,rt.litElementHydrateSupport?.({LitElement:ot});const lt=rt.litElementPolyfillSupport;lt?.({LitElement:ot}),(rt.litElementVersions??=[]).push("4.2.2");const ct=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},dt={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:y},ht=(t=dt,e,i)=>{const{kind:n,metadata:a}=i;let s=globalThis.litPropertyMetadata.get(a);if(void 0===s&&globalThis.litPropertyMetadata.set(a,s=new Map),"setter"===n&&((t=Object.create(t)).wrapped=!0),s.set(i.name,t),"accessor"===n){const{name:n}=i;return{set(i){const a=e.get.call(this);e.set.call(this,i),this.requestUpdate(n,a,t,!0,i)},init(e){return void 0!==e&&this.C(n,void 0,t,e),e}}}if("setter"===n){const{name:n}=i;return function(i){const a=this[n];e.call(this,i),this.requestUpdate(n,a,t,!0,i)}}throw Error("Unsupported decorator location: "+n)};function pt(t){return(e,i)=>"object"==typeof i?ht(t,e,i):((t,e,i)=>{const n=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),n?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function ut(t){return pt({...t,state:!0,attribute:!1})}var gt,ft;!function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(gt||(gt={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(ft||(ft={}));const mt=(t,e,i,n)=>{n=n||{},i=null==i?{}:i;const a=new Event(e,{bubbles:void 0===n.bubbles||n.bubbles,cancelable:Boolean(n.cancelable),composed:void 0===n.composed||n.composed});return a.detail=i,t.dispatchEvent(a),a};var vt={version:"Version",invalid_configuration:"Invalid configuration",loading:"Loading…"},_t={no_entity:"Select a Ladestellen Austria sensor in the card editor.",no_stations:"No stations match the current filters.",hero_context:"to the nearest charger in {city}",hero_count:"{count} stations",hero_count_filtered:"{filtered} of {total} stations",hero_range:"{min}–{max} km range",inactive:"inactive",status_unknown:"live availability unavailable",status_count:"{avail} of {total} points free",gratis:"Free",live_count:"{avail}/{total} free",live_suffix:"free",open_in_maps:"Open in Maps",website:"Website",call:"Call",address_heading:"Address",amenities_heading:"Amenities",availability:"Availability",pinned:"Pinned",unpin:"Remove pin",orphan_pin_title:"Pinned station not in range"},bt={green_energy:"Green energy",free_parking:"Free parking",roofed_parking:"Roofed parking",catering:"Catering nearby",bathrooms:"Restrooms",resting:"Resting area"},yt={section_main:"Main",section_display:"Display",section_filters:"Filters",name:"Card title (optional)",entity:"Sensor",max_stations:"Stations to show",show_hero:"Show hero summary",show_pricing:"Show pricing",show_amenities:"Show amenity details",sort_by_power:"Sort by power (fastest first)",logo_adapt_to_theme:"Adapt logo to theme (black on light, white on dark)",only_available:"Only currently available stations",only_free:"Only stations with free charging",connector_filter_hint:"Tap connector types to only show stations offering at least one of them. Empty = no filter.",hint_compliance:"Data is supplied under the ladestellen.at Terms of Use. The E-Control branding in the header and the 'Datenquelle: E-Control' footer are legally required and cannot be hidden.",section_pinned:"Pinned stations",pin_hint:"Pinned stations always appear first and bypass filters. They still count toward the display cap above.",pin_select_sensor_first:"Select a sensor first to see available stations.",pin_no_stations_yet:"No stations returned yet — wait for the next refresh.",pin_orphans_heading:"Pinned but not in range (click to remove):",pin_unpin:"Remove"},xt={common:vt,card:_t,amenities:bt,editor:yt},$t={version:"Version",invalid_configuration:"Ungültige Konfiguration",loading:"Lade…"},wt={no_entity:"Bitte einen Ladestellen-Austria-Sensor im Karten-Editor auswählen.",no_stations:"Keine Ladestellen entsprechen den aktuellen Filtern.",hero_context:"zur nächsten Ladestelle in {city}",hero_count:"{count} Ladestellen",hero_count_filtered:"{filtered} von {total} Ladestellen",hero_range:"{min}–{max} km Umkreis",inactive:"inaktiv",status_unknown:"Live-Status nicht verfügbar",status_count:"{avail} von {total} Punkten frei",gratis:"Gratis",live_count:"{avail}/{total} frei",live_suffix:"frei",open_in_maps:"In Karte öffnen",website:"Website",call:"Anrufen",address_heading:"Adresse",amenities_heading:"Ausstattung",availability:"Verfügbarkeit",pinned:"Angepinnt",unpin:"Pin entfernen",orphan_pin_title:"Angepinnte Ladestelle außerhalb des Umkreises"},kt={green_energy:"Ökostrom",free_parking:"Gratis Parken",roofed_parking:"Überdacht",catering:"Gastronomie",bathrooms:"WC",resting:"Ruhebereich"},At={section_main:"Allgemein",section_display:"Anzeige",section_filters:"Filter",name:"Kartentitel (optional)",entity:"Sensor",max_stations:"Anzahl angezeigter Ladestellen",show_hero:"Überschrift anzeigen",show_pricing:"Preise anzeigen",show_amenities:"Ausstattungs-Details anzeigen",sort_by_power:"Nach Leistung sortieren (schnellste zuerst)",logo_adapt_to_theme:"Logo an Design anpassen (schwarz auf hell, weiß auf dunkel)",only_available:"Nur aktuell verfügbare Ladestellen",only_free:"Nur Ladestellen mit Gratis-Laden",connector_filter_hint:"Steckertypen antippen, um nur Ladestellen mit mindestens einem davon anzuzeigen. Leer = kein Filter.",hint_compliance:"Die Daten werden unter den ladestellen.at-Nutzungsbedingungen bereitgestellt. Das E-Control-Branding im Kopf und die Fußzeile „Datenquelle: E-Control“ sind rechtlich vorgeschrieben und dürfen nicht entfernt werden.",section_pinned:"Angepinnte Ladestellen",pin_hint:"Angepinnte Ladestellen erscheinen immer zuerst und ignorieren Filter. Sie zählen weiterhin zur obigen Maximalanzahl.",pin_select_sensor_first:"Zuerst einen Sensor auswählen, um verfügbare Ladestellen zu sehen.",pin_no_stations_yet:"Noch keine Ladestellen geladen — auf die nächste Aktualisierung warten.",pin_orphans_heading:"Angepinnt, aber nicht im Umkreis (anklicken zum Entfernen):",pin_unpin:"Entfernen"},St={common:$t,card:wt,amenities:kt,editor:At};const Ct={en:Object.freeze({__proto__:null,amenities:bt,card:_t,common:vt,default:xt,editor:yt}),de:Object.freeze({__proto__:null,amenities:kt,card:wt,common:$t,default:St,editor:At})};function Et(t,e){const i=t.split(".").reduce((t,e)=>{if(t&&"object"==typeof t&&e in t)return t[e]},e);return"string"==typeof i?i:void 0}let zt;function Pt(t){"string"==typeof t&&t.length>0&&(zt=t)}function Ot(t,e="",i=""){const n=(zt||localStorage.getItem("selectedLanguage")||("undefined"!=typeof navigator?navigator.language:"")||"en").replace(/['"]+/g,"").substring(0,2).toLowerCase();let a=Et(t,Ct[n]||Ct.en);return void 0===a&&(a=Et(t,Ct.en)),void 0===a&&(a=t),""!==e&&""!==i&&(a=a.replace(e,i)),a}const Mt=r`
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
  /* Official E-Control logo PNG (2274x598, RGBA). Width auto-scales to
     preserve the aspect ratio. 20px tall in the footer reads as a
     credit-line mark, not a hero — subtle but still legible. */
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

  /* Optional user-set card title. Only rendered when config.name differs
     from the default "Ladestellen Austria". */
  .custom-title {
    padding: var(--l-space-3) var(--l-space-4) 0;
    font-size: var(--l-fs-xs);
    font-weight: var(--l-fw-med);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--secondary-text-color);
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
    border-top: 1px solid var(--divider-color);
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

  /* Body: status dot + text column. Two lines always (name+metrics / address). */
  .station-body {
    display: flex;
    gap: var(--l-space-3);
    padding: var(--l-space-3) var(--l-space-4);
    align-items: flex-start;
  }

  /* Status dot — 9px circle that communicates live availability at a glance.
     Aligned to the baseline of the first text line for tidy vertical rhythm. */
  .status-dot {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    flex-shrink: 0;
    margin-top: 7px; /* aligns with the baseline of .station-name */
    background: currentColor;
  }
  .status-dot.status-ok {
    color: var(--l-dot-ok);
    box-shadow: 0 0 0 3px
      color-mix(in srgb, var(--l-dot-ok) 18%, transparent);
  }
  .status-dot.status-partial {
    color: var(--l-dot-partial);
    box-shadow: 0 0 0 3px
      color-mix(in srgb, var(--l-dot-partial) 20%, transparent);
  }
  .status-dot.status-busy {
    color: var(--l-dot-busy);
    box-shadow: 0 0 0 3px
      color-mix(in srgb, var(--l-dot-busy) 18%, transparent);
  }
  .status-dot.status-inactive {
    color: var(--l-dot-inactive);
    opacity: 0.7;
  }
  .status-dot.status-unknown {
    color: transparent;
    border: 1.5px solid var(--secondary-text-color);
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
    padding: 6px;
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

  /* Distance-pill — map link. Pin + number together, compact click target. */
  .station-distance {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    padding: 3px 10px;
    border-radius: 999px;
    text-decoration: none;
    color: var(--primary-text-color);
    background: color-mix(in srgb, var(--primary-color) 10%, transparent);
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
    --mdc-icon-size: 15px;
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
      font-size: 10px;
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
`,Tt=r`
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
`,Lt=["Type 2","CCS","CHAdeMO","Type 1","Tesla","Schuko","CEE"];let Ut=class extends ot{constructor(){super(...arguments),this._config={type:"ladestellen-austria-card"}}setConfig(t){this._config={...t}}render(){Pt(this.hass?.language);const t=this._config.connector_types??[];return V`
      <div class="editor">
        <div class="editor-section">
          <div class="section-header">${Ot("editor.section_main")}</div>

          ${this.hass?V`
                <ha-selector
                  .hass=${this.hass}
                  .selector=${{entity:{domain:"sensor",integration:"ladestellen_austria"}}}
                  .value=${this._config.entity||void 0}
                  .configValue=${"entity"}
                  .label=${Ot("editor.entity")}
                  .required=${!0}
                  @value-changed=${this._valueChanged}
                ></ha-selector>
              `:V`<p>${Ot("common.loading")}</p>`}

          <ha-textfield
            label=${Ot("editor.name")}
            .value=${this._config.name||""}
            .configValue=${"name"}
            @input=${this._valueChanged}
          ></ha-textfield>
        </div>

        <div class="editor-section">
          <div class="section-header">${Ot("editor.section_display")}</div>

          ${this.hass?V`
                <ha-selector
                  .hass=${this.hass}
                  .selector=${{number:{min:1,max:10,step:1,mode:"slider"}}}
                  .value=${this._config.max_stations??10}
                  .configValue=${"max_stations"}
                  .label=${Ot("editor.max_stations")}
                  @value-changed=${this._valueChanged}
                ></ha-selector>
              `:K}

          <div class="toggle-row">
            <label>${Ot("editor.show_hero")}</label>
            <ha-switch
              .checked=${!1!==this._config.show_hero}
              .configValue=${"show_hero"}
              @change=${this._valueChanged}
            ></ha-switch>
          </div>

          <div class="toggle-row">
            <label>${Ot("editor.show_pricing")}</label>
            <ha-switch
              .checked=${this._config.show_pricing??!0}
              .configValue=${"show_pricing"}
              @change=${this._valueChanged}
            ></ha-switch>
          </div>

          <div class="toggle-row">
            <label>${Ot("editor.show_amenities")}</label>
            <ha-switch
              .checked=${this._config.show_amenities??!0}
              .configValue=${"show_amenities"}
              @change=${this._valueChanged}
            ></ha-switch>
          </div>

          <div class="toggle-row">
            <label>${Ot("editor.sort_by_power")}</label>
            <ha-switch
              .checked=${this._config.sort_by_power??!1}
              .configValue=${"sort_by_power"}
              @change=${this._valueChanged}
            ></ha-switch>
          </div>

          <div class="toggle-row">
            <label>${Ot("editor.logo_adapt_to_theme")}</label>
            <ha-switch
              .checked=${this._config.logo_adapt_to_theme??!1}
              .configValue=${"logo_adapt_to_theme"}
              @change=${this._valueChanged}
            ></ha-switch>
          </div>
        </div>

        <div class="editor-section">
          <div class="section-header">${Ot("editor.section_filters")}</div>

          <div class="toggle-row">
            <label>${Ot("editor.only_available")}</label>
            <ha-switch
              .checked=${this._config.only_available??!1}
              .configValue=${"only_available"}
              @change=${this._valueChanged}
            ></ha-switch>
          </div>

          <div class="toggle-row">
            <label>${Ot("editor.only_free")}</label>
            <ha-switch
              .checked=${this._config.only_free??!1}
              .configValue=${"only_free"}
              @change=${this._valueChanged}
            ></ha-switch>
          </div>

          <div class="editor-hint">${Ot("editor.connector_filter_hint")}</div>
          <div class="chip-row">
            ${Lt.map(e=>V`
                <button
                  type="button"
                  class=${t.includes(e)?"filter-chip active":"filter-chip"}
                  @click=${()=>this._toggleConnector(e)}
                >
                  ${e}
                </button>
              `)}
          </div>

          <div class="editor-hint">${Ot("editor.hint_compliance")}</div>
        </div>

        ${this._renderPinSection()}
      </div>
    `}_renderPinSection(){const t=this._config.entity,e=t?this.hass?.states[t]:void 0,i=e?.attributes?.stations??[],n=this._config.pinned_station_ids??[],a=new Set(n),s=new Set(i.map(t=>t.stationId)),r=n.filter(t=>!s.has(t));return V`
      <div class="editor-section">
        <div class="section-header">${Ot("editor.section_pinned")}</div>
        <div class="editor-hint">${Ot("editor.pin_hint")}</div>

        ${t?0===i.length?V`<div class="editor-hint editor-hint--muted">
              ${Ot("editor.pin_no_stations_yet")}
            </div>`:V`
              <div class="pin-list">
                ${i.map(t=>{const e=a.has(t.stationId),i="number"==typeof t.distance?`${t.distance.toFixed(2)} km`:"";return V`
                    <button
                      type="button"
                      class=${e?"pin-row pinned":"pin-row"}
                      @click=${()=>this._togglePin(t.stationId)}
                    >
                      <ha-icon
                        icon=${e?"mdi:pin":"mdi:pin-outline"}
                      ></ha-icon>
                      <span class="pin-label">${t.label}</span>
                      <span class="pin-meta">${i}</span>
                    </button>
                  `})}
              </div>
            `:V`<div class="editor-hint editor-hint--muted">
              ${Ot("editor.pin_select_sensor_first")}
            </div>`}
        ${r.length>0?V`
              <div class="editor-hint editor-hint--muted">
                ${Ot("editor.pin_orphans_heading")}
              </div>
              <div class="pin-list">
                ${r.map(t=>V`
                    <button
                      type="button"
                      class="pin-row orphan"
                      @click=${()=>this._togglePin(t)}
                    >
                      <ha-icon icon="mdi:pin-off-outline"></ha-icon>
                      <span class="pin-label">${t}</span>
                      <span class="pin-meta">${Ot("editor.pin_unpin")}</span>
                    </button>
                  `)}
              </div>
            `:K}
      </div>
    `}_togglePin(t){const e=this._config.pinned_station_ids??[],i=e.includes(t)?e.filter(e=>e!==t):[...e,t];this._config={...this._config,pinned_station_ids:i},mt(this,"config-changed",{config:this._config})}_toggleConnector(t){const e=this._config.connector_types??[],i=e.includes(t)?e.filter(e=>e!==t):[...e,t];this._config={...this._config,connector_types:i},mt(this,"config-changed",{config:this._config})}_valueChanged(t){if(!this._config||!this.hass)return;const e=t.target;if(!e.configValue)return;const i=void 0!==e.checked?e.checked:t.detail?.value??e.value;this._config[e.configValue]!==i&&(this._config={...this._config,[e.configValue]:i},mt(this,"config-changed",{config:this._config}))}static{this.styles=Tt}};t([pt({attribute:!1})],Ut.prototype,"hass",void 0),t([ut()],Ut.prototype,"_config",void 0),Ut=t([ct("ladestellen-austria-card-editor")],Ut),console.info(`%c  Ladestellen Austria Card  %c  ${Ot("common.version")} 0.1.0-beta-27  `,"color: white; font-weight: bold; background: #3FA535","color: white; font-weight: bold; background: dimgray"),window.customCards=window.customCards||[],window.customCards.push({type:"ladestellen-austria-card",name:"Ladestellen Austria",description:"Nearby EV charging stations, powered by E-Control Austria",preview:!0,documentationURL:"https://github.com/rolandzeiner/ladestellen-austria"});let Nt=class extends ot{constructor(){super(...arguments),this._expanded=new Set}static getConfigElement(){return document.createElement("ladestellen-austria-card-editor")}static getStubConfig(t,e){const i=e.find(t=>t.startsWith("sensor.")&&t.includes("ladestelle"));return{entity:i??""}}setConfig(t){if(!t)throw new Error(Ot("common.invalid_configuration"));this.config={name:"Ladestellen Austria",max_stations:10,show_hero:!0,show_amenities:!0,show_pricing:!0,sort_by_power:!1,logo_adapt_to_theme:!1,only_available:!1,only_free:!1,connector_types:[],pinned_station_ids:[],...t}}shouldUpdate(t){if(!this.config)return!1;if(t.has("config")||t.has("_expanded"))return!0;const e=t.get("hass");return!e||!this.config.entity||e.states[this.config.entity]!==this.hass.states[this.config.entity]}getCardSize(){const t=this.config?.max_stations??10;return Math.min(3+Math.ceil(t/3),10)}render(){if(Pt(this.hass?.language),!this.hass||!this.config)return V`<ha-card
        ><div class="empty-state">${Ot("common.loading")}</div></ha-card
      >`;const t=this.config.entity?this.hass.states[this.config.entity]:void 0;if(!t)return V`
        <ha-card>
          <div class="empty-state">${Ot("card.no_entity")}</div>
          ${this._renderFooter(void 0)}
        </ha-card>
      `;const e=t.attributes.stations??[],i=!0===t.attributes.live_status_available,n=this.config.pinned_station_ids??[],a=this._collectPinnedItems(n,e),s=new Set(a.filter(t=>"live"===t.kind).map(t=>t.stationId)),r=e.filter(t=>!s.has(t.stationId)),o=this._filterStations(r),l=this._sortStations(o),c=e[0],d=Math.max(1,this.config.max_stations??10),h=[...a,...l.map(t=>({kind:"live",station:t}))],p=h.slice(0,d),u=p.filter(t=>"live"===t.kind).map(t=>t.station),g=u.length>0?u[u.length-1]:void 0,f=!1!==this.config.show_hero,m=this.config.name&&"Ladestellen Austria"!==this.config.name?this.config.name:null;return V`
      <ha-card>
        ${m?V`<div class="custom-title">${m}</div>`:K}
        ${f?this._renderHero(c,g,o.length,e.length):K}
        ${p.length>0?V`<ul class="stations">
              ${p.map(t=>"live"===t.kind?this._renderStation(t.station,i,s.has(t.station.stationId)):this._renderOrphanPin(t.id))}
            </ul>`:V`<div class="empty-state">
              ${Ot("card.no_stations")}
            </div>`}
        ${this._renderFooter(t.attributes.attribution)}
      </ha-card>
    `}_sortStations(t){return[...t].sort((t,e)=>{if(this.config.sort_by_power){const i=Math.max(0,...(t.points??[]).map(t=>t.capacityKw??0)),n=Math.max(0,...(e.points??[]).map(t=>t.capacityKw??0));if(n!==i)return n-i}else{const i=t.distance??1/0,n=e.distance??1/0;if(i!==n)return i-n}const i=this._stationHasFree(t);return i!==this._stationHasFree(e)?i?-1:1:(t.distance??1/0)-(e.distance??1/0)})}_stationHasFree(t){return"ACTIVE"===t.stationStatus&&(t.points??[]).some(t=>"AVAILABLE"===t.status)}_collectPinnedItems(t,e){const i=new Map(e.map(t=>[t.stationId,t])),n=new Set,a=[];for(const e of t){if(n.has(e))continue;n.add(e);const t=i.get(e);t?a.push({kind:"live",station:t,stationId:t.stationId}):a.push({kind:"orphan",id:e})}return a}_unpinStation(t){const e=(this.config.pinned_station_ids??[]).filter(e=>e!==t),i={...this.config,pinned_station_ids:e};mt(this,"config-changed",{config:i})}_renderOrphanPin(t){return V`
      <li class="station orphan-pin" role="listitem">
        <div class="station-body orphan-body">
          <ha-icon class="orphan-icon" icon="mdi:pin-off-outline"></ha-icon>
          <div class="orphan-text">
            <div class="orphan-title">
              ${Ot("card.orphan_pin_title")}
            </div>
            <div class="orphan-id">${t}</div>
          </div>
          <button
            class="orphan-remove"
            type="button"
            aria-label=${Ot("card.unpin")}
            title=${Ot("card.unpin")}
            @click=${e=>{e.stopPropagation(),this._unpinStation(t)}}
          >
            <ha-icon icon="mdi:close"></ha-icon>
          </button>
        </div>
      </li>
    `}_filterStations(t){const e=this.config.only_available??!1,i=this.config.only_free??!1,n=this.config.connector_types??[];return e||i||0!==n.length?t.filter(t=>{if(e){const e="ACTIVE"===t.stationStatus&&(t.points??[]).some(t=>"AVAILABLE"===t.status);if(!e)return!1}if(i){const e=(t.points??[]).some(t=>t.freeOfCharge);if(!e)return!1}if(n.length>0){const e=new Set((t.points??[]).flatMap(t=>(t.connectorType??[]).map(t=>this._shortConnector(t.consumerName,t.key)))),i=n.some(t=>e.has(t));if(!i)return!1}return!0}):t}_renderFooter(t){const e=!0===this.config?.logo_adapt_to_theme,i=Boolean(this.hass?.themes?.darkMode),n=e?"brand-logo adaptive "+(i?"adaptive-dark":"adaptive-light"):"brand-logo",a=t&&t.includes("E-Control")?t:"Datenquelle: E-Control";return V`
      <div class="footer">
        <a
          class="brand-link"
          href="https://www.e-control.at/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="E-Control"
          @click=${t=>t.stopPropagation()}
        >
          <img
            class=${n}
            src="/ladestellen_austria/e-control_logo.png"
            alt="E-Control"
          />
        </a>
        <span class="attribution-text">${a}</span>
      </div>
    `}_renderHero(t,e,i,n){if(!t)return V`<div class="hero hero--empty">
        <div class="hero-label">${Ot("card.no_stations")}</div>
      </div>`;const a=this._formatKm(t.distance),s=this._heroCity(t),r=e?this._formatKm(e.distance):a,o=Ot("card.hero_range").replace("{min}",this._formatKm(t.distance)).replace("{max}",r),l=i===n?Ot("card.hero_count").replace("{count}",String(i)):Ot("card.hero_count_filtered").replace("{filtered}",String(i)).replace("{total}",String(n));return V`
      <div class="hero">
        <div class="hero-value">
          <span class="hero-number">${a}</span>
          <span class="hero-unit">km</span>
        </div>
        <div class="hero-context">
          <div class="hero-context-1">
            ${Ot("card.hero_context").replace("{city}",s)}
          </div>
          <div class="hero-context-2">${l} · ${o}</div>
        </div>
      </div>
    `}_heroCity(t){return t.city||t.label||""}_renderStation(t,e,i=!1){const n=t.points??[],a=n.some(t=>(t.electricityType??[]).includes("DC")),s=n.reduce((t,e)=>Math.max(t,e.capacityKw??0),0),r=Array.from(new Set(n.flatMap(t=>(t.connectorType??[]).map(t=>this._shortConnector(t.consumerName,t.key))))),o=r.slice(0,3),l=r.length-o.length,c=this._priceText(n),d=n.some(t=>t.freeOfCharge),h=n.length,p=n.filter(t=>"AVAILABLE"===t.status).length,u="ACTIVE"===t.stationStatus,g=this._statusLevel(e,u,p,h),f=this._expanded.has(t.stationId),m=`https://www.google.com/maps/search/?api=1&query=${t.location.lat},${t.location.lon}`,v=this.config?.show_amenities??!0,_=this.config?.show_pricing??!0,b=["station",f?"expanded":"",i?"pinned":""].filter(Boolean).join(" ");return V`
      <li
        class=${b}
        @click=${()=>this._toggle(t.stationId)}
        @keydown=${e=>this._onKey(e,t.stationId)}
        tabindex="0"
        role="button"
        aria-expanded=${f?"true":"false"}
      >
        <div class="station-body">
          <span
            class=${`status-dot status-${g}`}
            aria-label=${this._statusAria(g,p,h)}
          ></span>
          <div class="station-grid">
            <span class="station-metrics">
              ${i?V`<ha-icon
                    class="pin-indicator"
                    icon="mdi:pin"
                    title=${Ot("card.pinned")}
                    aria-label=${Ot("card.pinned")}
                  ></ha-icon>`:K}
              ${s>0?V`<span
                    class=${a?"metric-kw metric-kw--dc":"metric-kw"}
                  >
                    <span class="kw-num">${s}</span
                    ><span class="kw-unit">kW</span>
                  </span>`:K}
              ${o.map(t=>V`<span class="pill plug">${t}</span>`)}
              ${l>0?V`<span class="pill plug plug-more"
                    >+${l}</span
                  >`:K}
            </span>
            ${_&&c?V`<span
                  class=${d?"metric-price metric-free":"metric-price"}
                  >${c}</span
                >`:V`<span class="metric-price-placeholder"></span>`}
            <ha-icon
              class="chevron"
              icon=${f?"mdi:chevron-up":"mdi:chevron-down"}
            ></ha-icon>
            <div class="station-name">${t.label}</div>
            <a
              class="station-distance"
              href=${m}
              target="_blank"
              rel="noopener noreferrer"
              aria-label=${Ot("card.open_in_maps")}
              title=${Ot("card.open_in_maps")}
              @click=${t=>t.stopPropagation()}
            >
              <ha-icon icon="mdi:map-marker-outline"></ha-icon>
              <span class="distance-value">
                ${this._formatKm(t.distance)}<span class="unit"
                  >km</span
                >
              </span>
            </a>
          </div>
        </div>
        ${f?this._renderStationDetail(t,p,h,e,u,v,m):K}
      </li>
    `}_renderStationDetail(t,e,i,n,a,s,r){const o=this._amenityItems(t),l=n||!a,c=this._address(t);return V`
      <div class="detail">
        ${l?V`<div class="detail-section">
              <div class="detail-label">${Ot("card.availability")}</div>
              ${this._statusLine(n,a,e,i)}
            </div>`:K}
        ${s&&o.length>0?V`<div class="detail-section">
              <div class="detail-label">
                ${Ot("card.amenities_heading")}
              </div>
              <div class="amenities">
                ${o.map(t=>V`
                    <span class="amenity" title=${t.label}>
                      <ha-icon icon=${t.icon}></ha-icon>
                      <span>${t.label}</span>
                    </span>
                  `)}
              </div>
            </div>`:K}
        ${c?V`<div class="detail-section">
              <div class="detail-label">
                ${Ot("card.address_heading")}
              </div>
              <div class="detail-address">${c}</div>
            </div>`:K}
        <div class="detail-actions">
          <a
            class="action-btn primary"
            href=${r}
            target="_blank"
            rel="noopener noreferrer"
            @click=${t=>t.stopPropagation()}
          >
            <ha-icon icon="mdi:map-marker-radius-outline"></ha-icon>
            <span>${Ot("card.open_in_maps")}</span>
          </a>
          ${t.website?V`<a
                class="action-btn"
                href=${t.website}
                target="_blank"
                rel="noopener noreferrer"
                @click=${t=>t.stopPropagation()}
              >
                <ha-icon icon="mdi:web"></ha-icon>
                <span>${Ot("card.website")}</span>
              </a>`:K}
          ${t.phoneNumber?V`<a
                class="action-btn"
                href=${`tel:${t.phoneCountryCode??""}${t.phoneNumber}`}
                @click=${t=>t.stopPropagation()}
              >
                <ha-icon icon="mdi:phone-outline"></ha-icon>
                <span>${Ot("card.call")}</span>
              </a>`:K}
        </div>
      </div>
    `}_statusLevel(t,e,i,n){return e?t&&0!==n?0===i?"busy":i<n?"partial":"ok":"unknown":"inactive"}_statusAria(t,e,i){return"inactive"===t?Ot("card.inactive"):"unknown"===t?Ot("card.status_unknown"):`${e} / ${i} ${Ot("card.live_suffix")}`}_statusLine(t,e,i,n){const a=this._statusLevel(t,e,i,n);return"inactive"===a?V`<div class="status-row status-${a}">
        <span class="status-dot status-${a}"></span>
        ${Ot("card.inactive")}
      </div>`:"unknown"===a?V`<div class="status-row status-${a}">
        <span class="status-dot status-${a}"></span>
        ${Ot("card.status_unknown")}
      </div>`:V`<div class="status-row status-${a}">
      <span class="status-dot status-${a}"></span>
      ${Ot("card.status_count").replace("{avail}",String(i)).replace("{total}",String(n))}
    </div>`}_toggle(t){const e=new Set(this._expanded);e.has(t)?e.delete(t):e.add(t),this._expanded=e}_onKey(t,e){"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),this._toggle(e))}_priceText(t){if(0===t.length)return"";if(t.some(t=>t.freeOfCharge))return Ot("card.gratis");const e=t.filter(t=>!t.freeOfCharge&&t.priceCentKwh>0).map(t=>t.priceCentKwh);if(e.length>0)return`${this._formatEuro(Math.min(...e))} €/kWh`;const i=t.filter(t=>!t.freeOfCharge&&t.priceCentMin>0).map(t=>t.priceCentMin);return i.length>0?`${this._formatEuro(Math.min(...i))} €/min`:""}_formatEuro(t){const e=t/100;try{return new Intl.NumberFormat("de-AT",{minimumFractionDigits:2,maximumFractionDigits:2}).format(e)}catch{return e.toFixed(2)}}_address(t){const e=[];t.street&&e.push(t.street);const i=[t.postCode,t.city].filter(Boolean).join(" ");return i&&e.push(i),e.join(", ")}_amenityItems(t){return[{flag:t.greenEnergy,icon:"mdi:leaf",label:Ot("amenities.green_energy")},{flag:t.freeParking,icon:"mdi:parking",label:Ot("amenities.free_parking")},{flag:t.roofedParking,icon:"mdi:home-roof",label:Ot("amenities.roofed_parking")},{flag:t.cateringService,icon:"mdi:silverware-fork-knife",label:Ot("amenities.catering")},{flag:t.bathroomsAvailable,icon:"mdi:toilet",label:Ot("amenities.bathrooms")},{flag:t.restingFacilities,icon:"mdi:sofa",label:Ot("amenities.resting")}].filter(t=>t.flag)}_formatKm(t){const e="number"==typeof t?t:parseFloat(String(t??""));if(!Number.isFinite(e))return"–";try{return new Intl.NumberFormat("de-AT",{minimumFractionDigits:2,maximumFractionDigits:2}).format(e)}catch{return e.toFixed(2)}}_shortConnector(t,e){switch(t){case"TYPE_2_AC":return"Type 2";case"COMBO2_CCS_DC":return"CCS";case"CHADEMO":return"CHAdeMO";case"TYPE_1_AC":return"Type 1";case"TESLA_S":case"TESLA_R":return"Tesla";case"OTHER":return"DOMESTIC_F"===e?"Schuko":e?.startsWith("CEE")?"CEE":e??"?";default:return t?.replace(/_/g," ")??e??"?"}}static{this.styles=Mt}};t([pt({attribute:!1})],Nt.prototype,"hass",void 0),t([ut()],Nt.prototype,"config",void 0),t([ut()],Nt.prototype,"_expanded",void 0),Nt=t([ct("ladestellen-austria-card")],Nt);export{Nt as LadestellenAustriaCard};
