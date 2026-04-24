// Ladestellen Austria Card — bundled by Rollup. Edit sources in src/, then `npm run build`.
function t(t,e,i,s){var r,a=arguments.length,n=a<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var o=t.length-1;o>=0;o--)(r=t[o])&&(n=(a<3?r(n):a>3?r(e,i,n):r(e,i))||n);return a>3&&n&&Object.defineProperty(e,i,n),n}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),r=new WeakMap;let a=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&r.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new a(i,t,s)},o=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new a("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:l,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,f=globalThis,g=f.trustedTypes,m=g?g.emptyScript:"",v=f.reactiveElementPolyfillSupport,_=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},b=(t,e)=>!l(t,e),$={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),f.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&c(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:r}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const a=s?.call(this);r?.call(this,e),this.requestUpdate(t,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$}static _$Ei(){if(this.hasOwnProperty(_("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(_("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_("properties"))){const t=this.properties,e=[...h(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(o(t))}else void 0!==t&&e.push(o(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),r=e.litNonce;void 0!==r&&s.setAttribute("nonce",r),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=s;const a=r.fromAttribute(e,t.type);this[s]=a??this._$Ej?.get(s)??a,this._$Em=null}}requestUpdate(t,e,i,s=!1,r){if(void 0!==t){const a=this.constructor;if(!1===s&&(r=this[t]),i??=a.getPropertyOptions(t),!((i.hasChanged??b)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(a._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},a){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,a??e??this[t]),!0!==r||void 0!==a)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[_("elementProperties")]=new Map,x[_("finalized")]=new Map,v?.({ReactiveElement:x}),(f.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,A=t=>t,k=w.trustedTypes,E=k?k.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+S,z=`<${P}>`,O=document,T=()=>O.createComment(""),M=t=>null===t||"object"!=typeof t&&"function"!=typeof t,L=Array.isArray,U="[ \t\n\f\r]",H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N=/-->/g,R=/>/g,D=RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,I=/"/g,F=/^(?:script|style|textarea|title)$/i,V=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),B=Symbol.for("lit-noChange"),K=Symbol.for("lit-nothing"),W=new WeakMap,q=O.createTreeWalker(O,129);function G(t,e){if(!L(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const Y=(t,e)=>{const i=t.length-1,s=[];let r,a=2===e?"<svg>":3===e?"<math>":"",n=H;for(let e=0;e<i;e++){const i=t[e];let o,l,c=-1,d=0;for(;d<i.length&&(n.lastIndex=d,l=n.exec(i),null!==l);)d=n.lastIndex,n===H?"!--"===l[1]?n=N:void 0!==l[1]?n=R:void 0!==l[2]?(F.test(l[2])&&(r=RegExp("</"+l[2],"g")),n=D):void 0!==l[3]&&(n=D):n===D?">"===l[0]?(n=r??H,c=-1):void 0===l[1]?c=-2:(c=n.lastIndex-l[2].length,o=l[1],n=void 0===l[3]?D:'"'===l[3]?I:j):n===I||n===j?n=D:n===N||n===R?n=H:(n=D,r=void 0);const h=n===D&&t[e+1].startsWith("/>")?" ":"";a+=n===H?i+z:c>=0?(s.push(o),i.slice(0,c)+C+i.slice(c)+S+h):i+S+(-2===c?e:h)}return[G(t,a+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class J{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,a=0;const n=t.length-1,o=this.parts,[l,c]=Y(t,e);if(this.el=J.createElement(l,i),q.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=q.nextNode())&&o.length<n;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(C)){const e=c[a++],i=s.getAttribute(t).split(S),n=/([.?@])?(.*)/.exec(e);o.push({type:1,index:r,name:n[2],strings:i,ctor:"."===n[1]?et:"?"===n[1]?it:"@"===n[1]?st:tt}),s.removeAttribute(t)}else t.startsWith(S)&&(o.push({type:6,index:r}),s.removeAttribute(t));if(F.test(s.tagName)){const t=s.textContent.split(S),e=t.length-1;if(e>0){s.textContent=k?k.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],T()),q.nextNode(),o.push({type:2,index:++r});s.append(t[e],T())}}}else if(8===s.nodeType)if(s.data===P)o.push({type:2,index:r});else{let t=-1;for(;-1!==(t=s.data.indexOf(S,t+1));)o.push({type:7,index:r}),t+=S.length-1}r++}}static createElement(t,e){const i=O.createElement("template");return i.innerHTML=t,i}}function Z(t,e,i=t,s){if(e===B)return e;let r=void 0!==s?i._$Co?.[s]:i._$Cl;const a=M(e)?void 0:e._$litDirective$;return r?.constructor!==a&&(r?._$AO?.(!1),void 0===a?r=void 0:(r=new a(t),r._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=r:i._$Cl=r),void 0!==r&&(e=Z(t,r._$AS(t,e.values),r,s)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??O).importNode(e,!0);q.currentNode=s;let r=q.nextNode(),a=0,n=0,o=i[0];for(;void 0!==o;){if(a===o.index){let e;2===o.type?e=new X(r,r.nextSibling,this,t):1===o.type?e=new o.ctor(r,o.name,o.strings,this,t):6===o.type&&(e=new rt(r,this,t)),this._$AV.push(e),o=i[++n]}a!==o?.index&&(r=q.nextNode(),a++)}return q.currentNode=O,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=K,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),M(t)?t===K||null==t||""===t?(this._$AH!==K&&this._$AR(),this._$AH=K):t!==this._$AH&&t!==B&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>L(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==K&&M(this._$AH)?this._$AA.nextSibling.data=t:this.T(O.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=J.createElement(G(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Q(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=W.get(t.strings);return void 0===e&&W.set(t.strings,e=new J(t)),e}k(t){L(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const r of t)s===e.length?e.push(i=new X(this.O(T()),this.O(T()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=A(t).nextSibling;A(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=K,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=K}_$AI(t,e=this,i,s){const r=this.strings;let a=!1;if(void 0===r)t=Z(this,t,e,0),a=!M(t)||t!==this._$AH&&t!==B,a&&(this._$AH=t);else{const s=t;let n,o;for(t=r[0],n=0;n<r.length-1;n++)o=Z(this,s[i+n],e,n),o===B&&(o=this._$AH[n]),a||=!M(o)||o!==this._$AH[n],o===K?t=K:t!==K&&(t+=(o??"")+r[n+1]),this._$AH[n]=o}a&&!s&&this.j(t)}j(t){t===K?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===K?void 0:t}}class it extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==K)}}class st extends tt{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??K)===B)return;const i=this._$AH,s=t===K&&i!==K||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==K&&(i===K||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class rt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const at=w.litHtmlPolyfillSupport;at?.(J,X),(w.litHtmlVersions??=[]).push("3.3.2");const nt=globalThis;class ot extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let r=s._$litPart$;if(void 0===r){const t=i?.renderBefore??null;s._$litPart$=r=new X(e.insertBefore(T(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return B}}ot._$litElement$=!0,ot.finalized=!0,nt.litElementHydrateSupport?.({LitElement:ot});const lt=nt.litElementPolyfillSupport;lt?.({LitElement:ot}),(nt.litElementVersions??=[]).push("4.2.2");const ct=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},dt={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:b},ht=(t=dt,e,i)=>{const{kind:s,metadata:r}=i;let a=globalThis.litPropertyMetadata.get(r);if(void 0===a&&globalThis.litPropertyMetadata.set(r,a=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),a.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const r=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,r,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const r=this[s];e.call(this,i),this.requestUpdate(s,r,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function pt(t){return(e,i)=>"object"==typeof i?ht(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function ut(t){return pt({...t,state:!0,attribute:!1})}var ft={version:"Version",invalid_configuration:"Invalid configuration",loading:"Loading…"},gt={no_entity:"Select a Ladestellen Austria sensor in the card editor.",no_stations:"No stations match the current filters.",hero_context:"to the nearest charger in {city}",hero_count:"{count} stations",hero_count_filtered:"{filtered} of {total} stations",hero_range:"{min}–{max} km range",inactive:"inactive",status_unknown:"live availability unavailable",status_count:"{avail} of {total} points free",gratis:"Free",live_count:"{avail}/{total} free",live_suffix:"free",open_in_maps:"Open in Maps",website:"Website",call:"Call",address_heading:"Address",amenities_heading:"Amenities",availability:"Availability"},mt={green_energy:"Green energy",free_parking:"Free parking",roofed_parking:"Roofed parking",catering:"Catering nearby",bathrooms:"Restrooms",resting:"Resting area"},vt={section_main:"Main",section_display:"Display",section_filters:"Filters",name:"Card title (optional)",entity:"Sensor",max_stations:"Stations to show",show_pricing:"Show pricing",show_amenities:"Show amenity details",only_available:"Only currently available stations",only_free:"Only stations with free charging",connector_filter_hint:"Tap connector types to only show stations offering at least one of them. Empty = no filter.",hint_compliance:"Data is supplied under the ladestellen.at Terms of Use. The E-Control branding in the header and the 'Datenquelle: E-Control' footer are legally required and cannot be hidden."},_t={common:ft,card:gt,amenities:mt,editor:vt},yt={version:"Version",invalid_configuration:"Ungültige Konfiguration",loading:"Lade…"},bt={no_entity:"Bitte einen Ladestellen-Austria-Sensor im Karten-Editor auswählen.",no_stations:"Keine Ladestellen entsprechen den aktuellen Filtern.",hero_context:"zur nächsten Ladestelle in {city}",hero_count:"{count} Ladestellen",hero_count_filtered:"{filtered} von {total} Ladestellen",hero_range:"{min}–{max} km Umkreis",inactive:"inaktiv",status_unknown:"Live-Status nicht verfügbar",status_count:"{avail} von {total} Punkten frei",gratis:"Gratis",live_count:"{avail}/{total} frei",live_suffix:"frei",open_in_maps:"In Karte öffnen",website:"Website",call:"Anrufen",address_heading:"Adresse",amenities_heading:"Ausstattung",availability:"Verfügbarkeit"},$t={green_energy:"Ökostrom",free_parking:"Gratis Parken",roofed_parking:"Überdacht",catering:"Gastronomie",bathrooms:"WC",resting:"Ruhebereich"},xt={section_main:"Allgemein",section_display:"Anzeige",section_filters:"Filter",name:"Kartentitel (optional)",entity:"Sensor",max_stations:"Anzahl angezeigter Ladestellen",show_pricing:"Preise anzeigen",show_amenities:"Ausstattungs-Details anzeigen",only_available:"Nur aktuell verfügbare Ladestellen",only_free:"Nur Ladestellen mit Gratis-Laden",connector_filter_hint:"Steckertypen antippen, um nur Ladestellen mit mindestens einem davon anzuzeigen. Leer = kein Filter.",hint_compliance:"Die Daten werden unter den ladestellen.at-Nutzungsbedingungen bereitgestellt. Das E-Control-Branding im Kopf und die Fußzeile „Datenquelle: E-Control“ sind rechtlich vorgeschrieben und dürfen nicht entfernt werden."},wt={common:yt,card:bt,amenities:$t,editor:xt};const At={en:Object.freeze({__proto__:null,amenities:mt,card:gt,common:ft,default:_t,editor:vt}),de:Object.freeze({__proto__:null,amenities:$t,card:bt,common:yt,default:wt,editor:xt})};function kt(t,e){const i=t.split(".").reduce((t,e)=>{if(t&&"object"==typeof t&&e in t)return t[e]},e);return"string"==typeof i?i:void 0}let Et;function Ct(t){"string"==typeof t&&t.length>0&&(Et=t)}function St(t,e="",i=""){const s=(Et||localStorage.getItem("selectedLanguage")||("undefined"!=typeof navigator?navigator.language:"")||"en").replace(/['"]+/g,"").substring(0,2).toLowerCase();let r=kt(t,At[s]||At.en);return void 0===r&&(r=kt(t,At.en)),void 0===r&&(r=t),""!==e&&""!==i&&(r=r.replace(e,i)),r}const Pt=n`
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

  /* ----- Header (§3c brand-link, quiet top strip) --------------------- */
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--l-space-3);
    padding: 10px var(--l-space-4);
  }
  .brand-link {
    display: inline-flex;
    align-items: center;
    text-decoration: none;
    transition: opacity 160ms var(--l-ease);
  }
  .brand-link:hover {
    opacity: 0.7;
  }
  .brand-logo {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 24px;
    padding: 0 8px;
    background: #0052a5;
    color: #ffffff;
    border-radius: 4px;
    font-weight: var(--l-fw-bld);
    font-size: 11px;
    letter-spacing: 0.08em;
  }
  .brand-logo .accent {
    color: #3fa535;
    margin-right: 1px;
  }
  .header-title {
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
  .station-text {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
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

  /* Line 1: grid-based so we can reshuffle on narrow containers without
     touching the HTML. Wide layout: name / metrics / distance / chevron
     on a single line. Narrow layout: metrics wrap to their own row below
     the name, keeping line 1 uncluttered. */
  .station-line-1 {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto auto auto;
    grid-template-areas: "name metrics distance chevron";
    align-items: baseline;
    column-gap: var(--l-space-3);
    row-gap: 2px;
    min-width: 0;
  }
  .station-name {
    grid-area: name;
  }
  .station-metrics {
    grid-area: metrics;
    justify-self: end;
  }
  .station-distance {
    grid-area: distance;
  }
  .chevron {
    grid-area: chevron;
  }
  .station-name {
    font-size: var(--l-fs-m);
    font-weight: var(--l-fw-med);
    color: var(--primary-text-color);
    line-height: 1.35;
    letter-spacing: -0.002em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-width: 0;
  }

  .station-metrics {
    display: inline-flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 2px 6px;
    font-size: var(--l-fs-s);
    color: var(--secondary-text-color);
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }
  .metric {
    font-weight: var(--l-fw-reg);
  }
  .metric-kw {
    color: var(--primary-color);
    font-weight: var(--l-fw-bld);
    letter-spacing: 0;
  }
  .metric-kw--dc {
    color: var(--warning-color, #f57c00);
  }
  .metric-plug {
    color: var(--primary-text-color);
    font-weight: var(--l-fw-med);
  }
  .metric-price {
    color: var(--primary-text-color);
    font-weight: var(--l-fw-med);
  }
  .metric-free {
    color: var(--success-color, #2e7d32);
    font-weight: var(--l-fw-bld);
  }
  .metrics-sep {
    color: var(--divider-color);
    font-weight: var(--l-fw-reg);
    opacity: 0.8;
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

  /* Line 2: address (muted, always visible). */
  .station-line-2 {
    font-size: var(--l-fs-s);
    color: var(--secondary-text-color);
    line-height: 1.35;
    letter-spacing: 0.005em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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

  /* Footer (§3d attribution) */
  .footer {
    padding: var(--l-space-2) var(--l-space-4) var(--l-space-3);
    text-align: right;
    font-size: var(--l-fs-xs);
    color: var(--secondary-text-color);
    letter-spacing: 0.03em;
    opacity: 0.75;
    border-top: 1px solid var(--divider-color);
  }

  /* Empty states */
  .empty-state {
    padding: var(--l-space-5);
    text-align: center;
    color: var(--secondary-text-color);
    font-size: var(--l-fs-s);
  }
`,zt=n`
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
`;var Ot,Tt;!function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(Ot||(Ot={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(Tt||(Tt={}));const Mt=(t,e,i,s)=>{s=s||{},i=null==i?{}:i;const r=new Event(e,{bubbles:void 0===s.bubbles||s.bubbles,cancelable:Boolean(s.cancelable),composed:void 0===s.composed||s.composed});return r.detail=i,t.dispatchEvent(r),r},Lt=["Type 2","CCS","CHAdeMO","Type 1","Tesla","Schuko","CEE"];let Ut=class extends ot{constructor(){super(...arguments),this._config={type:"ladestellen-austria-card"}}setConfig(t){this._config={...t}}render(){Ct(this.hass?.language);const t=this._config.connector_types??[];return V`
      <div class="editor">
        <div class="editor-section">
          <div class="section-header">${St("editor.section_main")}</div>

          ${this.hass?V`
                <ha-selector
                  .hass=${this.hass}
                  .selector=${{entity:{domain:"sensor",integration:"ladestellen_austria"}}}
                  .value=${this._config.entity||void 0}
                  .configValue=${"entity"}
                  .label=${St("editor.entity")}
                  .required=${!0}
                  @value-changed=${this._valueChanged}
                ></ha-selector>
              `:V`<p>${St("common.loading")}</p>`}

          <ha-textfield
            label=${St("editor.name")}
            .value=${this._config.name||""}
            .configValue=${"name"}
            @input=${this._valueChanged}
          ></ha-textfield>
        </div>

        <div class="editor-section">
          <div class="section-header">${St("editor.section_display")}</div>

          ${this.hass?V`
                <ha-selector
                  .hass=${this.hass}
                  .selector=${{number:{min:1,max:10,step:1,mode:"slider"}}}
                  .value=${this._config.max_stations??10}
                  .configValue=${"max_stations"}
                  .label=${St("editor.max_stations")}
                  @value-changed=${this._valueChanged}
                ></ha-selector>
              `:K}

          <div class="toggle-row">
            <label>${St("editor.show_pricing")}</label>
            <ha-switch
              .checked=${this._config.show_pricing??!0}
              .configValue=${"show_pricing"}
              @change=${this._valueChanged}
            ></ha-switch>
          </div>

          <div class="toggle-row">
            <label>${St("editor.show_amenities")}</label>
            <ha-switch
              .checked=${this._config.show_amenities??!0}
              .configValue=${"show_amenities"}
              @change=${this._valueChanged}
            ></ha-switch>
          </div>
        </div>

        <div class="editor-section">
          <div class="section-header">${St("editor.section_filters")}</div>

          <div class="toggle-row">
            <label>${St("editor.only_available")}</label>
            <ha-switch
              .checked=${this._config.only_available??!1}
              .configValue=${"only_available"}
              @change=${this._valueChanged}
            ></ha-switch>
          </div>

          <div class="toggle-row">
            <label>${St("editor.only_free")}</label>
            <ha-switch
              .checked=${this._config.only_free??!1}
              .configValue=${"only_free"}
              @change=${this._valueChanged}
            ></ha-switch>
          </div>

          <div class="editor-hint">${St("editor.connector_filter_hint")}</div>
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

          <div class="editor-hint">${St("editor.hint_compliance")}</div>
        </div>
      </div>
    `}_toggleConnector(t){const e=this._config.connector_types??[],i=e.includes(t)?e.filter(e=>e!==t):[...e,t];this._config={...this._config,connector_types:i},Mt(this,"config-changed",{config:this._config})}_valueChanged(t){if(!this._config||!this.hass)return;const e=t.target;if(!e.configValue)return;const i=void 0!==e.checked?e.checked:t.detail?.value??e.value;this._config[e.configValue]!==i&&(this._config={...this._config,[e.configValue]:i},Mt(this,"config-changed",{config:this._config}))}static{this.styles=zt}};t([pt({attribute:!1})],Ut.prototype,"hass",void 0),t([ut()],Ut.prototype,"_config",void 0),Ut=t([ct("ladestellen-austria-card-editor")],Ut),console.info(`%c  Ladestellen Austria Card  %c  ${St("common.version")} 0.1.0-beta-12  `,"color: white; font-weight: bold; background: #3FA535","color: white; font-weight: bold; background: dimgray"),window.customCards=window.customCards||[],window.customCards.push({type:"ladestellen-austria-card",name:"Ladestellen Austria",description:"Nearby EV charging stations, powered by E-Control Austria",preview:!0,documentationURL:"https://github.com/rolandzeiner/ladestellen-austria"});let Ht=class extends ot{constructor(){super(...arguments),this._expanded=new Set}static getConfigElement(){return document.createElement("ladestellen-austria-card-editor")}static getStubConfig(t,e){const i=e.find(t=>t.startsWith("sensor.")&&t.includes("ladestelle"));return{entity:i??""}}setConfig(t){if(!t)throw new Error(St("common.invalid_configuration"));this.config={name:"Ladestellen Austria",max_stations:10,show_amenities:!0,show_pricing:!0,only_available:!1,only_free:!1,connector_types:[],...t}}shouldUpdate(t){if(!this.config)return!1;if(t.has("config")||t.has("_expanded"))return!0;const e=t.get("hass");return!e||!this.config.entity||e.states[this.config.entity]!==this.hass.states[this.config.entity]}getCardSize(){const t=this.config?.max_stations??10;return Math.min(3+Math.ceil(t/3),10)}render(){if(Ct(this.hass?.language),!this.hass||!this.config)return V`<ha-card
        ><div class="empty-state">${St("common.loading")}</div></ha-card
      >`;const t=this.config.entity?this.hass.states[this.config.entity]:void 0;if(!t)return V`
        <ha-card>
          ${this._renderHeader()}
          <div class="empty-state">${St("card.no_entity")}</div>
          ${this._renderFooter(void 0)}
        </ha-card>
      `;const e=t.attributes.stations??[],i=!0===t.attributes.live_status_available,s=this._filterStations(e),r=Math.max(1,this.config.max_stations??10),a=s.slice(0,r),n=a[0],o=a[a.length-1];return V`
      <ha-card>
        ${this._renderHeader()}
        ${this._renderHero(n,o,s.length,e.length)}
        ${a.length>0?V`<ul class="stations">
              ${a.map(t=>this._renderStation(t,i))}
            </ul>`:V`<div class="empty-state">
              ${St("card.no_stations")}
            </div>`}
        ${this._renderFooter(t.attributes.attribution)}
      </ha-card>
    `}_filterStations(t){const e=this.config.only_available??!1,i=this.config.only_free??!1,s=this.config.connector_types??[];return e||i||0!==s.length?t.filter(t=>{if(e){const e="ACTIVE"===t.stationStatus&&(t.points??[]).some(t=>"AVAILABLE"===t.status);if(!e)return!1}if(i){const e=(t.points??[]).some(t=>t.freeOfCharge);if(!e)return!1}if(s.length>0){const e=new Set((t.points??[]).flatMap(t=>(t.connectorType??[]).map(t=>this._shortConnector(t.consumerName,t.key)))),i=s.some(t=>e.has(t));if(!i)return!1}return!0}):t}_renderHeader(){const t=this.config?.name??"Ladestellen Austria";return V`
      <div class="header">
        <a
          class="brand-link"
          href="https://www.e-control.at/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="E-Control"
          @click=${t=>t.stopPropagation()}
        >
          <span class="brand-logo"
            ><span class="accent">E</span>-CONTROL</span
          >
        </a>
        <span class="header-title">${t}</span>
      </div>
    `}_renderHero(t,e,i,s){if(!t)return V`<div class="hero hero--empty">
        <div class="hero-label">${St("card.no_stations")}</div>
      </div>`;const r=this._formatKm(t.distance),a=this._heroCity(t),n=e?this._formatKm(e.distance):r,o=St("card.hero_range").replace("{min}",this._formatKm(t.distance)).replace("{max}",n),l=i===s?St("card.hero_count").replace("{count}",String(i)):St("card.hero_count_filtered").replace("{filtered}",String(i)).replace("{total}",String(s));return V`
      <div class="hero">
        <div class="hero-value">
          <span class="hero-number">${r}</span>
          <span class="hero-unit">km</span>
        </div>
        <div class="hero-context">
          <div class="hero-context-1">
            ${St("card.hero_context").replace("{city}",a)}
          </div>
          <div class="hero-context-2">${l} · ${o}</div>
        </div>
      </div>
    `}_heroCity(t){return t.city||t.label||""}_renderStation(t,e){const i=t.points??[],s=i.some(t=>(t.electricityType??[]).includes("DC")),r=i.reduce((t,e)=>Math.max(t,e.capacityKw??0),0),a=Array.from(new Set(i.flatMap(t=>(t.connectorType??[]).map(t=>this._shortConnector(t.consumerName,t.key))))),n=a.length<=2?a.join(", "):`${a.slice(0,2).join(", ")} +${a.length-2}`,o=this._priceText(i),l=i.length,c=i.filter(t=>"AVAILABLE"===t.status).length,d="ACTIVE"===t.stationStatus,h=this._statusLevel(e,d,c,l),p=this._expanded.has(t.stationId),u=`https://www.google.com/maps/search/?api=1&query=${t.location.lat},${t.location.lon}`,f=this.config?.show_amenities??!0,g=this.config?.show_pricing??!0,m=[];return r>0&&m.push(`${r} kW`),n&&m.push(n),g&&o&&m.push(o),V`
      <li
        class=${p?"station expanded":"station"}
        @click=${()=>this._toggle(t.stationId)}
        @keydown=${e=>this._onKey(e,t.stationId)}
        tabindex="0"
        role="button"
        aria-expanded=${p?"true":"false"}
      >
        <div class="station-body">
          <span
            class=${`status-dot status-${h}`}
            aria-label=${this._statusAria(h,c,l)}
          ></span>
          <div class="station-text">
            <div class="station-line-1">
              <span class="station-name">${t.label}</span>
              <span class="station-metrics">
                ${m.map((t,e)=>V`
                    ${e>0?V`<span class="metrics-sep">·</span>`:K}
                    <span
                      class=${this._metricClass(t,s)}
                      >${t}</span
                    >
                  `)}
              </span>
              <a
                class="station-distance"
                href=${u}
                target="_blank"
                rel="noopener noreferrer"
                aria-label=${St("card.open_in_maps")}
                title=${St("card.open_in_maps")}
                @click=${t=>t.stopPropagation()}
              >
                <ha-icon icon="mdi:map-marker-outline"></ha-icon>
                <span class="distance-value">
                  ${this._formatKm(t.distance)}<span class="unit"
                    >km</span
                  >
                </span>
              </a>
              <ha-icon
                class="chevron"
                icon=${p?"mdi:chevron-up":"mdi:chevron-down"}
              ></ha-icon>
            </div>
            <div class="station-line-2">${this._address(t)||"—"}</div>
          </div>
        </div>
        ${p?this._renderStationDetail(t,c,l,e,d,f,u):K}
      </li>
    `}_metricClass(t,e){return t.endsWith(" kW")?e?"metric metric-kw metric-kw--dc":"metric metric-kw":t===St("card.gratis")?"metric metric-free":t.includes("€")?"metric metric-price":"metric metric-plug"}_renderStationDetail(t,e,i,s,r,a,n){const o=this._amenityItems(t);return V`
      <div class="detail">
        ${s||!r?V`<div class="detail-section">
              <div class="detail-label">${St("card.availability")}</div>
              ${this._statusLine(s,r,e,i)}
            </div>`:K}
        ${a&&o.length>0?V`<div class="detail-section">
              <div class="detail-label">
                ${St("card.amenities_heading")}
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
        <div class="detail-actions">
          <a
            class="action-btn primary"
            href=${n}
            target="_blank"
            rel="noopener noreferrer"
            @click=${t=>t.stopPropagation()}
          >
            <ha-icon icon="mdi:map-marker-radius-outline"></ha-icon>
            <span>${St("card.open_in_maps")}</span>
          </a>
          ${t.website?V`<a
                class="action-btn"
                href=${t.website}
                target="_blank"
                rel="noopener noreferrer"
                @click=${t=>t.stopPropagation()}
              >
                <ha-icon icon="mdi:web"></ha-icon>
                <span>${St("card.website")}</span>
              </a>`:K}
          ${t.phoneNumber?V`<a
                class="action-btn"
                href=${`tel:${t.phoneCountryCode??""}${t.phoneNumber}`}
                @click=${t=>t.stopPropagation()}
              >
                <ha-icon icon="mdi:phone-outline"></ha-icon>
                <span>${St("card.call")}</span>
              </a>`:K}
        </div>
      </div>
    `}_statusLevel(t,e,i,s){return e?t&&0!==s?0===i?"busy":i<s?"partial":"ok":"unknown":"inactive"}_statusAria(t,e,i){return"inactive"===t?St("card.inactive"):"unknown"===t?St("card.status_unknown"):`${e} / ${i} ${St("card.live_suffix")}`}_statusLine(t,e,i,s){const r=this._statusLevel(t,e,i,s);return"inactive"===r?V`<div class="status-row status-${r}">
        <span class="status-dot status-${r}"></span>
        ${St("card.inactive")}
      </div>`:"unknown"===r?V`<div class="status-row status-${r}">
        <span class="status-dot status-${r}"></span>
        ${St("card.status_unknown")}
      </div>`:V`<div class="status-row status-${r}">
      <span class="status-dot status-${r}"></span>
      ${St("card.status_count").replace("{avail}",String(i)).replace("{total}",String(s))}
    </div>`}_toggle(t){const e=new Set(this._expanded);e.has(t)?e.delete(t):e.add(t),this._expanded=e}_onKey(t,e){"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),this._toggle(e))}_priceText(t){if(0===t.length)return"";if(t.some(t=>t.freeOfCharge))return St("card.gratis");const e=t.filter(t=>!t.freeOfCharge&&t.priceCentKwh>0).map(t=>t.priceCentKwh);if(e.length>0)return`${this._formatEuro(Math.min(...e))} €/kWh`;const i=t.filter(t=>!t.freeOfCharge&&t.priceCentMin>0).map(t=>t.priceCentMin);return i.length>0?`${this._formatEuro(Math.min(...i))} €/min`:""}_formatEuro(t){const e=t/100;try{return new Intl.NumberFormat("de-AT",{minimumFractionDigits:2,maximumFractionDigits:2}).format(e)}catch{return e.toFixed(2)}}_address(t){const e=[];t.street&&e.push(t.street);const i=[t.postCode,t.city].filter(Boolean).join(" ");return i&&e.push(i),e.join(", ")}_amenityItems(t){return[{flag:t.greenEnergy,icon:"mdi:leaf",label:St("amenities.green_energy")},{flag:t.freeParking,icon:"mdi:parking",label:St("amenities.free_parking")},{flag:t.roofedParking,icon:"mdi:home-roof",label:St("amenities.roofed_parking")},{flag:t.cateringService,icon:"mdi:silverware-fork-knife",label:St("amenities.catering")},{flag:t.bathroomsAvailable,icon:"mdi:toilet",label:St("amenities.bathrooms")},{flag:t.restingFacilities,icon:"mdi:sofa",label:St("amenities.resting")}].filter(t=>t.flag)}_renderFooter(t){const e=t&&t.includes("E-Control")?t:"Datenquelle: E-Control";return V`<div class="footer">${e}</div>`}_formatKm(t){const e="number"==typeof t?t:parseFloat(String(t??""));if(!Number.isFinite(e))return"–";try{return new Intl.NumberFormat("de-AT",{minimumFractionDigits:2,maximumFractionDigits:2}).format(e)}catch{return e.toFixed(2)}}_shortConnector(t,e){switch(t){case"TYPE_2_AC":return"Type 2";case"COMBO2_CCS_DC":return"CCS";case"CHADEMO":return"CHAdeMO";case"TYPE_1_AC":return"Type 1";case"TESLA_S":case"TESLA_R":return"Tesla";case"OTHER":return"DOMESTIC_F"===e?"Schuko":e?.startsWith("CEE")?"CEE":e??"?";default:return t?.replace(/_/g," ")??e??"?"}}static{this.styles=Pt}};t([pt({attribute:!1})],Ht.prototype,"hass",void 0),t([ut()],Ht.prototype,"config",void 0),t([ut()],Ht.prototype,"_expanded",void 0),Ht=t([ct("ladestellen-austria-card")],Ht);export{Ht as LadestellenAustriaCard};
