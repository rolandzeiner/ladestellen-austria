// Ladestellen Austria Card — bundled by Rollup. Edit sources in src/, then `npm run build`.
function t(t,e,i,r){var s,n=arguments.length,a=n<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,r);else for(var o=t.length-1;o>=0;o--)(s=t[o])&&(a=(n<3?s(a):n>3?s(e,i,a):s(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),s=new WeakMap;let n=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=s.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&s.set(e,t))}return t}toString(){return this.cssText}};const a=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,r)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[r+1],t[0]);return new n(i,t,r)},o=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,r))(e)})(t):t,{is:l,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,g=globalThis,m=g.trustedTypes,f=m?m.emptyScript:"",v=g.reactiveElementPolyfillSupport,_=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},b=(t,e)=>!l(t,e),$={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(t,i,e);void 0!==r&&c(this.prototype,t,r)}}static getPropertyDescriptor(t,e,i){const{get:r,set:s}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:r,set(e){const n=r?.call(this);s?.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$}static _$Ei(){if(this.hasOwnProperty(_("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(_("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_("properties"))){const t=this.properties,e=[...h(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(o(t))}else void 0!==t&&e.push(o(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,r)=>{if(i)t.adoptedStyleSheets=r.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of r){const r=document.createElement("style"),s=e.litNonce;void 0!==s&&r.setAttribute("nonce",s),r.textContent=i.cssText,t.appendChild(r)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,i);if(void 0!==r&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(e,i.type);this._$Em=t,null==s?this.removeAttribute(r):this.setAttribute(r,s),this._$Em=null}}_$AK(t,e){const i=this.constructor,r=i._$Eh.get(t);if(void 0!==r&&this._$Em!==r){const t=i.getPropertyOptions(r),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=r;const n=s.fromAttribute(e,t.type);this[r]=n??this._$Ej?.get(r)??n,this._$Em=null}}requestUpdate(t,e,i,r=!1,s){if(void 0!==t){const n=this.constructor;if(!1===r&&(s=this[t]),i??=n.getPropertyOptions(t),!((i.hasChanged??b)(s,e)||i.useDefault&&i.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:r,wrapped:s},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==s||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===r&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,r=this[e];!0!==t||this._$AL.has(e)||void 0===r||this.C(e,void 0,i,r)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[_("elementProperties")]=new Map,x[_("finalized")]=new Map,v?.({ReactiveElement:x}),(g.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,A=t=>t,E=w.trustedTypes,k=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,z="?"+C,P=`<${z}>`,O=document,T=()=>O.createComment(""),M=t=>null===t||"object"!=typeof t&&"function"!=typeof t,U=Array.isArray,N="[ \t\n\f\r]",L=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,H=/>/g,D=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,I=/"/g,B=/^(?:script|style|textarea|title)$/i,V=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),F=Symbol.for("lit-noChange"),K=Symbol.for("lit-nothing"),W=new WeakMap,q=O.createTreeWalker(O,129);function G(t,e){if(!U(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==k?k.createHTML(e):e}const Y=(t,e)=>{const i=t.length-1,r=[];let s,n=2===e?"<svg>":3===e?"<math>":"",a=L;for(let e=0;e<i;e++){const i=t[e];let o,l,c=-1,d=0;for(;d<i.length&&(a.lastIndex=d,l=a.exec(i),null!==l);)d=a.lastIndex,a===L?"!--"===l[1]?a=R:void 0!==l[1]?a=H:void 0!==l[2]?(B.test(l[2])&&(s=RegExp("</"+l[2],"g")),a=D):void 0!==l[3]&&(a=D):a===D?">"===l[0]?(a=s??L,c=-1):void 0===l[1]?c=-2:(c=a.lastIndex-l[2].length,o=l[1],a=void 0===l[3]?D:'"'===l[3]?I:j):a===I||a===j?a=D:a===R||a===H?a=L:(a=D,s=void 0);const h=a===D&&t[e+1].startsWith("/>")?" ":"";n+=a===L?i+P:c>=0?(r.push(o),i.slice(0,c)+S+i.slice(c)+C+h):i+C+(-2===c?e:h)}return[G(t,n+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),r]};class J{constructor({strings:t,_$litType$:e},i){let r;this.parts=[];let s=0,n=0;const a=t.length-1,o=this.parts,[l,c]=Y(t,e);if(this.el=J.createElement(l,i),q.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(r=q.nextNode())&&o.length<a;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(S)){const e=c[n++],i=r.getAttribute(t).split(C),a=/([.?@])?(.*)/.exec(e);o.push({type:1,index:s,name:a[2],strings:i,ctor:"."===a[1]?et:"?"===a[1]?it:"@"===a[1]?rt:tt}),r.removeAttribute(t)}else t.startsWith(C)&&(o.push({type:6,index:s}),r.removeAttribute(t));if(B.test(r.tagName)){const t=r.textContent.split(C),e=t.length-1;if(e>0){r.textContent=E?E.emptyScript:"";for(let i=0;i<e;i++)r.append(t[i],T()),q.nextNode(),o.push({type:2,index:++s});r.append(t[e],T())}}}else if(8===r.nodeType)if(r.data===z)o.push({type:2,index:s});else{let t=-1;for(;-1!==(t=r.data.indexOf(C,t+1));)o.push({type:7,index:s}),t+=C.length-1}s++}}static createElement(t,e){const i=O.createElement("template");return i.innerHTML=t,i}}function Z(t,e,i=t,r){if(e===F)return e;let s=void 0!==r?i._$Co?.[r]:i._$Cl;const n=M(e)?void 0:e._$litDirective$;return s?.constructor!==n&&(s?._$AO?.(!1),void 0===n?s=void 0:(s=new n(t),s._$AT(t,i,r)),void 0!==r?(i._$Co??=[])[r]=s:i._$Cl=s),void 0!==s&&(e=Z(t,s._$AS(t,e.values),s,r)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,r=(t?.creationScope??O).importNode(e,!0);q.currentNode=r;let s=q.nextNode(),n=0,a=0,o=i[0];for(;void 0!==o;){if(n===o.index){let e;2===o.type?e=new X(s,s.nextSibling,this,t):1===o.type?e=new o.ctor(s,o.name,o.strings,this,t):6===o.type&&(e=new st(s,this,t)),this._$AV.push(e),o=i[++a]}n!==o?.index&&(s=q.nextNode(),n++)}return q.currentNode=O,r}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,r){this.type=2,this._$AH=K,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),M(t)?t===K||null==t||""===t?(this._$AH!==K&&this._$AR(),this._$AH=K):t!==this._$AH&&t!==F&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>U(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==K&&M(this._$AH)?this._$AA.nextSibling.data=t:this.T(O.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,r="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=J.createElement(G(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(e);else{const t=new Q(r,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=W.get(t.strings);return void 0===e&&W.set(t.strings,e=new J(t)),e}k(t){U(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,r=0;for(const s of t)r===e.length?e.push(i=new X(this.O(T()),this.O(T()),this,this.options)):i=e[r],i._$AI(s),r++;r<e.length&&(this._$AR(i&&i._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=A(t).nextSibling;A(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,r,s){this.type=1,this._$AH=K,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=K}_$AI(t,e=this,i,r){const s=this.strings;let n=!1;if(void 0===s)t=Z(this,t,e,0),n=!M(t)||t!==this._$AH&&t!==F,n&&(this._$AH=t);else{const r=t;let a,o;for(t=s[0],a=0;a<s.length-1;a++)o=Z(this,r[i+a],e,a),o===F&&(o=this._$AH[a]),n||=!M(o)||o!==this._$AH[a],o===K?t=K:t!==K&&(t+=(o??"")+s[a+1]),this._$AH[a]=o}n&&!r&&this.j(t)}j(t){t===K?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===K?void 0:t}}class it extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==K)}}class rt extends tt{constructor(t,e,i,r,s){super(t,e,i,r,s),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??K)===F)return;const i=this._$AH,r=t===K&&i!==K||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,s=t!==K&&(i===K||r);r&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const nt=w.litHtmlPolyfillSupport;nt?.(J,X),(w.litHtmlVersions??=[]).push("3.3.2");const at=globalThis;class ot extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const r=i?.renderBefore??e;let s=r._$litPart$;if(void 0===s){const t=i?.renderBefore??null;r._$litPart$=s=new X(e.insertBefore(T(),t),t,void 0,i??{})}return s._$AI(t),s})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}}ot._$litElement$=!0,ot.finalized=!0,at.litElementHydrateSupport?.({LitElement:ot});const lt=at.litElementPolyfillSupport;lt?.({LitElement:ot}),(at.litElementVersions??=[]).push("4.2.2");const ct=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},dt={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:b},ht=(t=dt,e,i)=>{const{kind:r,metadata:s}=i;let n=globalThis.litPropertyMetadata.get(s);if(void 0===n&&globalThis.litPropertyMetadata.set(s,n=new Map),"setter"===r&&((t=Object.create(t)).wrapped=!0),n.set(i.name,t),"accessor"===r){const{name:r}=i;return{set(i){const s=e.get.call(this);e.set.call(this,i),this.requestUpdate(r,s,t,!0,i)},init(e){return void 0!==e&&this.C(r,void 0,t,e),e}}}if("setter"===r){const{name:r}=i;return function(i){const s=this[r];e.call(this,i),this.requestUpdate(r,s,t,!0,i)}}throw Error("Unsupported decorator location: "+r)};function pt(t){return(e,i)=>"object"==typeof i?ht(t,e,i):((t,e,i)=>{const r=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),r?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function ut(t){return pt({...t,state:!0,attribute:!1})}var gt={version:"Version",invalid_configuration:"Invalid configuration",loading:"Loading…"},mt={no_entity:"Select a Ladestellen Austria sensor in the card editor.",no_stations:"No stations match the current filters.",nearest_label:"to {label}",station_count:"{count} stations",station_count_filtered:"{filtered} of {total} stations",inactive:"inactive",gratis:"Gratis",live_count:"{avail}/{total} free",open_in_maps:"Open in Maps",address_heading:"Address"},ft={green_energy:"Green energy",free_parking:"Free parking",roofed_parking:"Roofed parking",catering:"Catering nearby",bathrooms:"Restrooms",resting:"Resting area"},vt={section_main:"Main",section_display:"Display",section_filters:"Filters",name:"Card title (optional)",entity:"Sensor",max_stations:"Stations to show",show_pricing:"Show pricing chip",show_amenities:"Show amenity icons",only_available:"Only currently available stations",only_free:"Only stations with free charging",connector_filter_hint:"Tap connector types to only show stations offering at least one of them. Empty = no filter.",hint_compliance:"Data is supplied under the ladestellen.at Terms of Use. The E-Control branding in the header and the 'Datenquelle: E-Control' footer are legally required and cannot be hidden."},_t={common:gt,card:mt,amenities:ft,editor:vt},yt={version:"Version",invalid_configuration:"Ungültige Konfiguration",loading:"Lade…"},bt={no_entity:"Bitte einen Ladestellen-Austria-Sensor im Karten-Editor auswählen.",no_stations:"Keine Ladestellen entsprechen den aktuellen Filtern.",nearest_label:"zu {label}",station_count:"{count} Ladestellen",station_count_filtered:"{filtered} von {total} Ladestellen",inactive:"inaktiv",gratis:"Gratis",live_count:"{avail}/{total} frei",open_in_maps:"In Karte öffnen",address_heading:"Adresse"},$t={green_energy:"Ökostrom",free_parking:"Gratis Parken",roofed_parking:"Überdacht",catering:"Gastronomie",bathrooms:"WC",resting:"Ruhebereich"},xt={section_main:"Allgemein",section_display:"Anzeige",section_filters:"Filter",name:"Kartentitel (optional)",entity:"Sensor",max_stations:"Anzahl angezeigter Ladestellen",show_pricing:"Preis-Badge anzeigen",show_amenities:"Ausstattungs-Icons anzeigen",only_available:"Nur aktuell verfügbare Ladestellen",only_free:"Nur Ladestellen mit Gratis-Laden",connector_filter_hint:"Steckertypen antippen, um nur Ladestellen mit mindestens einem davon anzuzeigen. Leer = kein Filter.",hint_compliance:"Die Daten werden unter den ladestellen.at-Nutzungsbedingungen bereitgestellt. Das E-Control-Branding im Kopf und die Fußzeile „Datenquelle: E-Control“ sind rechtlich vorgeschrieben und dürfen nicht entfernt werden."},wt={common:yt,card:bt,amenities:$t,editor:xt};const At={en:Object.freeze({__proto__:null,amenities:ft,card:mt,common:gt,default:_t,editor:vt}),de:Object.freeze({__proto__:null,amenities:$t,card:bt,common:yt,default:wt,editor:xt})};function Et(t,e){const i=t.split(".").reduce((t,e)=>{if(t&&"object"==typeof t&&e in t)return t[e]},e);return"string"==typeof i?i:void 0}function kt(t,e="",i=""){const r=(localStorage.getItem("selectedLanguage")||"en").replace(/['"]+/g,"").replace("-","_");let s=Et(t,At[r]||At.en);return void 0===s&&(s=Et(t,At.en)),void 0===s&&(s=t),""!==e&&""!==i&&(s=s.replace(e,i)),s}const St=a`
  :host {
    display: block;
    --l-fs-xl: var(--ha-font-size-xl, 1.5rem);
    --l-fs-l: var(--ha-font-size-l, 1rem);
    --l-fs-m: var(--ha-font-size-m, 0.9rem);
    --l-fs-s: var(--ha-font-size-s, 0.85rem);
    --l-fs-xs: var(--ha-font-size-xs, 0.75rem);
    --l-fw-reg: var(--ha-font-weight-normal, 400);
    --l-fw-med: var(--ha-font-weight-medium, 500);
    --l-fw-bld: var(--ha-font-weight-bold, 700);
    --l-space-1: 4px;
    --l-space-2: 8px;
    --l-space-3: 12px;
    --l-space-4: 16px;
    --l-space-5: 20px;
    --l-ease: cubic-bezier(0.4, 0, 0.2, 1);
  }
  ha-card {
    overflow: hidden;
    border-radius: var(--ha-card-border-radius, 14px);
  }

  /* ----- Brand strip (§3c compliance) --------------------------------- */
  .brand-strip {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--l-space-3);
    padding: var(--l-space-3) var(--l-space-4);
  }
  .brand-link {
    display: inline-flex;
    align-items: center;
    gap: var(--l-space-2);
    text-decoration: none;
    color: inherit;
    transition: opacity 160ms var(--l-ease);
  }
  .brand-link:hover {
    opacity: 0.7;
  }
  .brand-logo {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 26px;
    padding: 0 9px;
    background: #0052a5;
    color: #ffffff;
    border-radius: 4px;
    font-weight: var(--l-fw-bld);
    font-size: 12px;
    letter-spacing: 0.06em;
  }
  .brand-logo .accent {
    color: #3fa535;
    margin-right: 1px;
  }
  .card-title {
    font-size: var(--l-fs-m);
    font-weight: var(--l-fw-med);
    color: var(--primary-text-color);
    letter-spacing: -0.005em;
  }

  /* ----- Summary row ------------------------------------------------- */
  .summary {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: var(--l-space-3);
    padding: var(--l-space-4);
    background: color-mix(
      in srgb,
      var(--primary-color) 5%,
      var(--ha-card-background, var(--card-background-color))
    );
    border-top: 1px solid
      color-mix(in srgb, var(--primary-color) 10%, transparent);
    border-bottom: 1px solid
      color-mix(in srgb, var(--primary-color) 10%, transparent);
  }
  .summary-main {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }
  .summary-distance {
    font-size: var(--l-fs-xl);
    font-weight: var(--l-fw-bld);
    color: var(--primary-text-color);
    line-height: 1;
    letter-spacing: -0.035em;
    font-variant-numeric: tabular-nums;
  }
  .summary-distance .unit {
    font-size: var(--l-fs-s);
    font-weight: var(--l-fw-reg);
    margin-left: 5px;
    color: var(--secondary-text-color);
    letter-spacing: 0;
  }
  .summary-label,
  .summary-count {
    font-size: var(--l-fs-s);
    color: var(--secondary-text-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100%;
  }
  .summary-count {
    text-align: right;
    font-variant-numeric: tabular-nums;
  }

  /* ----- Station list ------------------------------------------------ */
  .stations {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .station {
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: var(--l-space-3);
    row-gap: 4px;
    padding: var(--l-space-3) var(--l-space-4);
    border-bottom: 1px solid var(--divider-color);
    cursor: pointer;
    transition:
      background-color 200ms var(--l-ease),
      padding 200ms var(--l-ease);
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
    padding-bottom: var(--l-space-2);
    background: color-mix(
      in srgb,
      var(--primary-color) 3%,
      var(--ha-card-background, var(--card-background-color))
    );
  }

  /* kW as a leading data chip: tinted pill-ish backdrop, row-span 2.
     Uses --primary-color tint for AC, --warning-color for DC — mirrors
     how HA's own tile cards badge sensor-class accents. */
  .metric-kw {
    grid-column: 1;
    grid-row: 1 / span 2;
    align-self: center;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 68px;
    padding: 10px 14px;
    border-radius: 12px;
    background: color-mix(in srgb, var(--primary-color) 10%, transparent);
    color: var(--primary-color);
    font-size: 1.35rem;
    font-weight: var(--l-fw-bld);
    line-height: 1;
    letter-spacing: -0.03em;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
    transition:
      background-color 200ms var(--l-ease),
      transform 200ms var(--l-ease);
  }
  .station:hover .metric-kw {
    background: color-mix(in srgb, var(--primary-color) 14%, transparent);
  }
  .metric-kw.dc {
    background: color-mix(
      in srgb,
      var(--warning-color, #f57c00) 12%,
      transparent
    );
    color: var(--warning-color, #f57c00);
  }
  .station:hover .metric-kw.dc {
    background: color-mix(
      in srgb,
      var(--warning-color, #f57c00) 16%,
      transparent
    );
  }
  .metric-kw.empty {
    background: color-mix(
      in srgb,
      var(--secondary-text-color) 8%,
      transparent
    );
    color: var(--secondary-text-color);
    font-weight: var(--l-fw-reg);
    opacity: 0.7;
  }

  /* Right side of the grid: metrics + maps link + chevron (row 1), name
     below (row 2). */
  .row-main {
    grid-column: 2;
    grid-row: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--l-space-3);
    min-width: 0;
  }
  .row-inline-metrics {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--l-space-2);
    min-width: 0;
    flex: 1;
  }
  .row-right {
    display: inline-flex;
    align-items: center;
    gap: var(--l-space-1);
    flex-shrink: 0;
  }

  .station-name {
    grid-column: 2;
    grid-row: 2;
    font-size: var(--l-fs-s);
    font-weight: var(--l-fw-reg);
    color: var(--secondary-text-color);
    line-height: 1.35;
    letter-spacing: 0.005em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* Maps link — pin + distance, single click target. */
  .maps-inline {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 10px;
    border-radius: 999px;
    text-decoration: none;
    color: var(--primary-text-color);
    transition:
      background-color 160ms var(--l-ease),
      transform 160ms var(--l-ease);
  }
  .maps-inline:hover,
  .maps-inline:focus-visible {
    background: color-mix(in srgb, var(--primary-color) 16%, transparent);
    outline: none;
  }
  .maps-inline:active {
    transform: scale(0.96);
  }
  .maps-inline ha-icon {
    --mdc-icon-size: 18px;
    color: var(--primary-color);
  }
  .station-distance {
    font-size: var(--l-fs-l);
    font-weight: var(--l-fw-med);
    color: var(--primary-text-color);
    font-variant-numeric: tabular-nums;
    letter-spacing: -0.01em;
  }
  .station-distance .unit {
    font-size: var(--l-fs-s);
    color: var(--secondary-text-color);
    font-weight: var(--l-fw-reg);
    margin-left: 3px;
    letter-spacing: 0;
  }
  .chevron {
    --mdc-icon-size: 18px;
    color: var(--secondary-text-color);
    transition: transform 200ms var(--l-ease);
  }

  /* Price reads quieter than kW — it's a contextual detail, not the hero. */
  .metric-price {
    font-size: var(--l-fs-s);
    color: var(--secondary-text-color);
    font-variant-numeric: tabular-nums;
    font-weight: var(--l-fw-med);
    letter-spacing: -0.005em;
  }
  .metric-price.free {
    color: var(--success-color, #2e7d32);
    font-weight: var(--l-fw-bld);
  }

  /* Connector pills — theme-accent soft wash (consistent with kW). */
  .pill {
    display: inline-flex;
    align-items: center;
    padding: 3px 10px;
    border-radius: 999px;
    font-size: var(--l-fs-xs);
    font-weight: var(--l-fw-med);
    letter-spacing: 0.02em;
    line-height: 1.4;
    background: color-mix(in srgb, var(--primary-color) 10%, transparent);
    color: color-mix(in srgb, var(--primary-color) 85%, var(--primary-text-color));
  }

  /* Expanded detail — 2 columns: address left, status + amenities right. */
  .detail {
    grid-column: 1 / -1;
    grid-row: 3;
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
    column-gap: var(--l-space-4);
    row-gap: var(--l-space-2);
    margin-top: var(--l-space-2);
    padding: var(--l-space-3);
    border-radius: 10px;
    background: color-mix(
      in srgb,
      var(--primary-color) 4%,
      var(--ha-card-background, var(--card-background-color))
    );
    animation: l-reveal 220ms var(--l-ease);
  }
  .detail-col {
    display: flex;
    flex-direction: column;
    gap: var(--l-space-1);
    min-width: 0;
  }
  .detail-heading {
    font-size: 10px;
    font-weight: var(--l-fw-med);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--secondary-text-color);
    opacity: 0.75;
    margin-bottom: 2px;
  }
  .detail-address-col {
    /* Keep address on the left */
  }
  .detail-right-col {
    gap: var(--l-space-2);
    align-items: flex-end;
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

  .station-address {
    font-size: var(--l-fs-s);
    color: var(--primary-text-color);
    line-height: 1.45;
    letter-spacing: 0.003em;
  }

  /* Status line: inactive / live-availability. */
  .station-status {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: var(--l-fs-xs);
    font-weight: var(--l-fw-med);
    letter-spacing: 0.02em;
    font-variant-numeric: tabular-nums;
    padding: 2px 8px;
    border-radius: 999px;
    background: color-mix(in srgb, currentColor 12%, transparent);
  }
  .station-status.ok {
    color: var(--success-color, #2e7d32);
  }
  .station-status.busy {
    color: var(--error-color, #c62828);
  }
  .station-status.inactive {
    color: var(--state-unavailable-color, #a0a0a0);
  }
  .status-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: currentColor;
    display: inline-block;
  }

  /* Amenities — icon + label pair, right-aligned within the right col. */
  .amenities {
    display: flex;
    flex-wrap: wrap;
    gap: var(--l-space-1) var(--l-space-2);
    justify-content: flex-end;
    font-size: var(--l-fs-xs);
    color: var(--secondary-text-color);
  }
  .amenity {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 2px 8px;
    border-radius: 999px;
    background: color-mix(
      in srgb,
      var(--secondary-text-color) 8%,
      transparent
    );
    letter-spacing: 0.01em;
  }
  .amenity ha-icon {
    --mdc-icon-size: 14px;
    color: var(--secondary-text-color);
    flex-shrink: 0;
  }
  .amenity.green {
    background: color-mix(
      in srgb,
      var(--success-color, #2e7d32) 12%,
      transparent
    );
    color: color-mix(
      in srgb,
      var(--success-color, #2e7d32) 90%,
      var(--primary-text-color)
    );
  }
  .amenity.green ha-icon {
    color: var(--success-color, #2e7d32);
  }

  /* Attribution footer — §3d exact text. */
  .attribution {
    padding: var(--l-space-2) var(--l-space-4) var(--l-space-3);
    text-align: right;
    font-size: var(--l-fs-xs);
    color: var(--secondary-text-color);
    letter-spacing: 0.03em;
    opacity: 0.75;
  }

  /* Empty states */
  .empty-state {
    padding: var(--l-space-5);
    text-align: center;
    color: var(--secondary-text-color);
    font-size: var(--l-fs-s);
  }

  /* Narrow-card fallback: detail panel stacks when the card is below ~360px. */
  @container (max-width: 360px) {
    .detail {
      grid-template-columns: 1fr;
    }
    .detail-right-col {
      align-items: flex-start;
    }
    .amenities {
      justify-content: flex-start;
    }
  }
`,Ct=a`
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
`;var zt,Pt;!function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(zt||(zt={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(Pt||(Pt={}));const Ot=(t,e,i,r)=>{r=r||{},i=null==i?{}:i;const s=new Event(e,{bubbles:void 0===r.bubbles||r.bubbles,cancelable:Boolean(r.cancelable),composed:void 0===r.composed||r.composed});return s.detail=i,t.dispatchEvent(s),s},Tt=["Type 2","CCS","CHAdeMO","Type 1","Tesla","Schuko","CEE"];let Mt=class extends ot{constructor(){super(...arguments),this._config={type:"ladestellen-austria-card"}}setConfig(t){this._config={...t}}render(){const t=this._config.connector_types??[];return V`
      <div class="editor">
        <div class="editor-section">
          <div class="section-header">${kt("editor.section_main")}</div>

          ${this.hass?V`
                <ha-selector
                  .hass=${this.hass}
                  .selector=${{entity:{domain:"sensor",integration:"ladestellen_austria"}}}
                  .value=${this._config.entity||void 0}
                  .configValue=${"entity"}
                  .label=${kt("editor.entity")}
                  .required=${!0}
                  @value-changed=${this._valueChanged}
                ></ha-selector>
              `:V`<p>${kt("common.loading")}</p>`}

          <ha-textfield
            label=${kt("editor.name")}
            .value=${this._config.name||""}
            .configValue=${"name"}
            @input=${this._valueChanged}
          ></ha-textfield>
        </div>

        <div class="editor-section">
          <div class="section-header">${kt("editor.section_display")}</div>

          ${this.hass?V`
                <ha-selector
                  .hass=${this.hass}
                  .selector=${{number:{min:1,max:10,step:1,mode:"slider"}}}
                  .value=${this._config.max_stations??10}
                  .configValue=${"max_stations"}
                  .label=${kt("editor.max_stations")}
                  @value-changed=${this._valueChanged}
                ></ha-selector>
              `:K}

          <div class="toggle-row">
            <label>${kt("editor.show_pricing")}</label>
            <ha-switch
              .checked=${this._config.show_pricing??!0}
              .configValue=${"show_pricing"}
              @change=${this._valueChanged}
            ></ha-switch>
          </div>

          <div class="toggle-row">
            <label>${kt("editor.show_amenities")}</label>
            <ha-switch
              .checked=${this._config.show_amenities??!0}
              .configValue=${"show_amenities"}
              @change=${this._valueChanged}
            ></ha-switch>
          </div>
        </div>

        <div class="editor-section">
          <div class="section-header">${kt("editor.section_filters")}</div>

          <div class="toggle-row">
            <label>${kt("editor.only_available")}</label>
            <ha-switch
              .checked=${this._config.only_available??!1}
              .configValue=${"only_available"}
              @change=${this._valueChanged}
            ></ha-switch>
          </div>

          <div class="toggle-row">
            <label>${kt("editor.only_free")}</label>
            <ha-switch
              .checked=${this._config.only_free??!1}
              .configValue=${"only_free"}
              @change=${this._valueChanged}
            ></ha-switch>
          </div>

          <div class="editor-hint">${kt("editor.connector_filter_hint")}</div>
          <div class="chip-row">
            ${Tt.map(e=>V`
                <button
                  type="button"
                  class=${t.includes(e)?"filter-chip active":"filter-chip"}
                  @click=${()=>this._toggleConnector(e)}
                >
                  ${e}
                </button>
              `)}
          </div>

          <div class="editor-hint">${kt("editor.hint_compliance")}</div>
        </div>
      </div>
    `}_toggleConnector(t){const e=this._config.connector_types??[],i=e.includes(t)?e.filter(e=>e!==t):[...e,t];this._config={...this._config,connector_types:i},Ot(this,"config-changed",{config:this._config})}_valueChanged(t){if(!this._config||!this.hass)return;const e=t.target;if(!e.configValue)return;const i=void 0!==e.checked?e.checked:t.detail?.value??e.value;this._config[e.configValue]!==i&&(this._config={...this._config,[e.configValue]:i},Ot(this,"config-changed",{config:this._config}))}static{this.styles=Ct}};t([pt({attribute:!1})],Mt.prototype,"hass",void 0),t([ut()],Mt.prototype,"_config",void 0),Mt=t([ct("ladestellen-austria-card-editor")],Mt),console.info(`%c  Ladestellen Austria Card  %c  ${kt("common.version")} 0.1.0-beta-8  `,"color: white; font-weight: bold; background: #3FA535","color: white; font-weight: bold; background: dimgray"),window.customCards=window.customCards||[],window.customCards.push({type:"ladestellen-austria-card",name:"Ladestellen Austria",description:"Nearby EV charging stations, powered by E-Control Austria",preview:!0,documentationURL:"https://github.com/rolandzeiner/ladestellen-austria"});let Ut=class extends ot{constructor(){super(...arguments),this._expanded=new Set}static getConfigElement(){return document.createElement("ladestellen-austria-card-editor")}static getStubConfig(t,e){const i=e.find(t=>t.startsWith("sensor.")&&t.includes("ladestelle"));return{entity:i??""}}setConfig(t){if(!t)throw new Error(kt("common.invalid_configuration"));this.config={name:"Ladestellen Austria",max_stations:10,show_amenities:!0,show_pricing:!0,only_available:!1,only_free:!1,connector_types:[],...t}}shouldUpdate(t){if(!this.config)return!1;if(t.has("config")||t.has("_expanded"))return!0;const e=t.get("hass");return!e||!this.config.entity||e.states[this.config.entity]!==this.hass.states[this.config.entity]}getCardSize(){const t=this.config?.max_stations??10;return Math.min(2+Math.ceil(t/2),10)}render(){if(!this.hass||!this.config)return V`<ha-card><div class="empty-state">${kt("common.loading")}</div></ha-card>`;const t=this.config.entity?this.hass.states[this.config.entity]:void 0;if(!t)return V`
        <ha-card>
          ${this._renderBrandStrip()}
          <div class="empty-state">${kt("card.no_entity")}</div>
          ${this._renderAttribution(void 0)}
        </ha-card>
      `;const e=t.attributes.stations??[],i=!0===t.attributes.live_status_available,r=this._filterStations(e),s=Math.max(1,this.config.max_stations??10),n=r.slice(0,s),a=n[0];return V`
      <ha-card>
        ${this._renderBrandStrip()}
        ${this._renderSummary(a,r.length,e.length)}
        ${n.length>0?V`<ul class="stations">
              ${n.map(t=>this._renderStation(t,i))}
            </ul>`:V`<div class="empty-state">${kt("card.no_stations")}</div>`}
        ${this._renderAttribution(t.attributes.attribution)}
      </ha-card>
    `}_filterStations(t){const e=this.config.only_available??!1,i=this.config.only_free??!1,r=this.config.connector_types??[];return e||i||0!==r.length?t.filter(t=>{if(e){const e="ACTIVE"===t.stationStatus&&(t.points??[]).some(t=>"AVAILABLE"===t.status);if(!e)return!1}if(i){const e=(t.points??[]).some(t=>t.freeOfCharge);if(!e)return!1}if(r.length>0){const e=new Set((t.points??[]).flatMap(t=>(t.connectorType??[]).map(t=>this._shortConnector(t.consumerName,t.key)))),i=r.some(t=>e.has(t));if(!i)return!1}return!0}):t}_renderBrandStrip(){const t=this.config?.name??"Ladestellen Austria";return V`
      <div class="brand-strip">
        <a
          class="brand-link"
          href="https://www.e-control.at/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="E-Control"
        >
          <span class="brand-logo"><span class="accent">E</span>-CONTROL</span>
        </a>
        <span class="card-title">${t}</span>
      </div>
    `}_renderSummary(t,e,i){const r=t?this._formatKm(t.distance):"–",s=e===i?kt("card.station_count").replace("{count}",String(e)):kt("card.station_count_filtered").replace("{filtered}",String(e)).replace("{total}",String(i));return V`
      <div class="summary">
        <div class="summary-main">
          <span class="summary-distance">
            ${r}<span class="unit">km</span>
          </span>
          <span class="summary-label">
            ${t?kt("card.nearest_label").replace("{label}",t.label):kt("card.no_stations")}
          </span>
        </div>
        <span class="summary-count">${s}</span>
      </div>
    `}_renderStation(t,e){const i=t.points??[],r=i.some(t=>(t.electricityType??[]).includes("DC")),s=i.reduce((t,e)=>Math.max(t,e.capacityKw??0),0),n=Array.from(new Set(i.flatMap(t=>(t.connectorType??[]).map(t=>this._shortConnector(t.consumerName,t.key))))),a=this._priceText(i),o=i.some(t=>t.freeOfCharge),l=i.length,c=i.filter(t=>"AVAILABLE"===t.status).length,d="ACTIVE"===t.stationStatus,h=this._expanded.has(t.stationId),p=this._address(t),u=this._amenityItems(t),g=this.config?.show_amenities??!0,m=this.config?.show_pricing??!0,f=`https://www.google.com/maps/search/?api=1&query=${t.location.lat},${t.location.lon}`;return V`
      <li
        class=${h?"station expanded":"station"}
        @click=${()=>this._toggle(t.stationId)}
        @keydown=${e=>this._onKey(e,t.stationId)}
        tabindex="0"
        role="button"
        aria-expanded=${h?"true":"false"}
      >
        ${s>0?V`<span class="metric-kw ${r?"dc":""}"
              >${s}&thinsp;kW</span
            >`:V`<span class="metric-kw empty">—</span>`}
        <div class="row-main">
          <div class="row-inline-metrics">
            ${n.map(t=>V`<span class="pill plug">${t}</span>`)}
            ${m&&a?V`<span class="metric-price ${o?"free":""}"
                  >${a}</span
                >`:K}
          </div>
          <div class="row-right">
            <a
              class="maps-inline"
              href=${f}
              target="_blank"
              rel="noopener noreferrer"
              aria-label=${kt("card.open_in_maps")}
              title=${kt("card.open_in_maps")}
              @click=${t=>t.stopPropagation()}
            >
              <ha-icon icon="mdi:map-marker-outline"></ha-icon>
              <span class="station-distance">
                ${this._formatKm(t.distance)}<span class="unit">km</span>
              </span>
            </a>
            <ha-icon
              class="chevron"
              icon=${h?"mdi:chevron-up":"mdi:chevron-down"}
            ></ha-icon>
          </div>
        </div>
        <div class="station-name">${t.label}</div>
        ${h?this._renderStationDetail(p,u,g,e,d,c,l):K}
      </li>
    `}_renderStationDetail(t,e,i,r,s,n,a){const o=this._statusLine(r,s,n,a),l=o!==K||i&&e.length>0;return V`
      <div class="detail">
        <div class="detail-col detail-address-col">
          ${t?V`<div class="detail-heading">
                  ${kt("card.address_heading")}
                </div>
                <div class="station-address">${t}</div>`:K}
        </div>
        ${l?V`<div class="detail-col detail-right-col">
              ${o}
              ${i&&e.length>0?V`<div class="amenities">
                    ${e.map(t=>V`
                        <span
                          class=${"mdi:leaf"===t.icon?"amenity green":"amenity"}
                          title=${t.label}
                        >
                          <ha-icon icon=${t.icon}></ha-icon>
                          <span>${t.label}</span>
                        </span>
                      `)}
                  </div>`:K}
            </div>`:K}
      </div>
    `}_statusLine(t,e,i,r){if(!e)return V`<div class="station-status inactive">
        <span class="status-dot"></span>${kt("card.inactive")}
      </div>`;if(t&&r>0){const t=i>0?"ok":"busy",e=kt("card.live_count").replace("{avail}",String(i)).replace("{total}",String(r));return V`<div class="station-status ${t}">
        <span class="status-dot"></span>${e}
      </div>`}return K}_toggle(t){const e=new Set(this._expanded);e.has(t)?e.delete(t):e.add(t),this._expanded=e}_onKey(t,e){"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),this._toggle(e))}_priceText(t){if(0===t.length)return"";if(t.some(t=>t.freeOfCharge))return kt("card.gratis");const e=t.filter(t=>!t.freeOfCharge&&t.priceCentKwh>0).map(t=>t.priceCentKwh);if(e.length>0)return`${this._formatEuro(Math.min(...e))} €/kWh`;const i=t.filter(t=>!t.freeOfCharge&&t.priceCentMin>0).map(t=>t.priceCentMin);return i.length>0?`${this._formatEuro(Math.min(...i))} €/min`:""}_formatEuro(t){const e=t/100;try{return new Intl.NumberFormat("de-AT",{minimumFractionDigits:2,maximumFractionDigits:2}).format(e)}catch{return e.toFixed(2)}}_address(t){const e=[];t.street&&e.push(t.street);const i=[t.postCode,t.city].filter(Boolean).join(" ");return i&&e.push(i),e.join(", ")}_amenityItems(t){return[{flag:t.greenEnergy,icon:"mdi:leaf",label:kt("amenities.green_energy")},{flag:t.freeParking,icon:"mdi:parking",label:kt("amenities.free_parking")},{flag:t.roofedParking,icon:"mdi:home-roof",label:kt("amenities.roofed_parking")},{flag:t.cateringService,icon:"mdi:silverware-fork-knife",label:kt("amenities.catering")},{flag:t.bathroomsAvailable,icon:"mdi:toilet",label:kt("amenities.bathrooms")},{flag:t.restingFacilities,icon:"mdi:sofa",label:kt("amenities.resting")}].filter(t=>t.flag)}_renderAttribution(t){const e=t&&t.includes("E-Control")?t:"Datenquelle: E-Control";return V`<div class="attribution">${e}</div>`}_formatKm(t){const e="number"==typeof t?t:parseFloat(String(t??""));if(!Number.isFinite(e))return"–";try{return new Intl.NumberFormat("de-AT",{minimumFractionDigits:2,maximumFractionDigits:2}).format(e)}catch{return e.toFixed(2)}}_shortConnector(t,e){switch(t){case"TYPE_2_AC":return"Type 2";case"COMBO2_CCS_DC":return"CCS";case"CHADEMO":return"CHAdeMO";case"TYPE_1_AC":return"Type 1";case"TESLA_S":case"TESLA_R":return"Tesla";case"OTHER":return"DOMESTIC_F"===e?"Schuko":e?.startsWith("CEE")?"CEE":e??"?";default:return t?.replace(/_/g," ")??e??"?"}}static{this.styles=St}};t([pt({attribute:!1})],Ut.prototype,"hass",void 0),t([ut()],Ut.prototype,"config",void 0),t([ut()],Ut.prototype,"_expanded",void 0),Ut=t([ct("ladestellen-austria-card")],Ut);export{Ut as LadestellenAustriaCard};
