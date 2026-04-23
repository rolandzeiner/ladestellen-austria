// Ladestellen Austria Card — bundled by Rollup. Edit sources in src/, then `npm run build`.
function t(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),n=new WeakMap;let r=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=n.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&n.set(e,t))}return t}toString(){return this.cssText}};const o=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new r(i,t,s)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:c,defineProperty:l,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,g=globalThis,f=g.trustedTypes,m=f?f.emptyScript:"",_=g.reactiveElementPolyfillSupport,v=(t,e)=>t,$={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},y=(t,e)=>!c(t,e),b={attribute:!0,type:String,converter:$,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&l(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:n}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const r=s?.call(this);n?.call(this,e),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...d(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),n=e.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:$).toAttribute(e,i.type);this._$Em=t,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:$;this._$Em=s;const r=n.fromAttribute(e,t.type);this[s]=r??this._$Ej?.get(s)??r,this._$Em=null}}requestUpdate(t,e,i,s=!1,n){if(void 0!==t){const r=this.constructor;if(!1===s&&(n=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??y)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:n},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==n||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[v("elementProperties")]=new Map,w[v("finalized")]=new Map,_?.({ReactiveElement:w}),(g.reactiveElementVersions??=[]).push("2.1.2");const A=globalThis,x=t=>t,E=A.trustedTypes,C=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,O="?"+k,P=`<${O}>`,T=document,M=()=>T.createComment(""),z=t=>null===t||"object"!=typeof t&&"function"!=typeof t,U=Array.isArray,R="[ \t\n\f\r]",L=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N=/-->/g,H=/>/g,D=RegExp(`>|${R}(?:([^\\s"'>=/]+)(${R}*=${R}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,V=/"/g,B=/^(?:script|style|textarea|title)$/i,I=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),q=Symbol.for("lit-noChange"),F=Symbol.for("lit-nothing"),K=new WeakMap,W=T.createTreeWalker(T,129);function G(t,e){if(!U(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==C?C.createHTML(e):e}const J=(t,e)=>{const i=t.length-1,s=[];let n,r=2===e?"<svg>":3===e?"<math>":"",o=L;for(let e=0;e<i;e++){const i=t[e];let a,c,l=-1,h=0;for(;h<i.length&&(o.lastIndex=h,c=o.exec(i),null!==c);)h=o.lastIndex,o===L?"!--"===c[1]?o=N:void 0!==c[1]?o=H:void 0!==c[2]?(B.test(c[2])&&(n=RegExp("</"+c[2],"g")),o=D):void 0!==c[3]&&(o=D):o===D?">"===c[0]?(o=n??L,l=-1):void 0===c[1]?l=-2:(l=o.lastIndex-c[2].length,a=c[1],o=void 0===c[3]?D:'"'===c[3]?V:j):o===V||o===j?o=D:o===N||o===H?o=L:(o=D,n=void 0);const d=o===D&&t[e+1].startsWith("/>")?" ":"";r+=o===L?i+P:l>=0?(s.push(a),i.slice(0,l)+S+i.slice(l)+k+d):i+k+(-2===l?e:d)}return[G(t,r+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class Y{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,r=0;const o=t.length-1,a=this.parts,[c,l]=J(t,e);if(this.el=Y.createElement(c,i),W.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=W.nextNode())&&a.length<o;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(S)){const e=l[r++],i=s.getAttribute(t).split(k),o=/([.?@])?(.*)/.exec(e);a.push({type:1,index:n,name:o[2],strings:i,ctor:"."===o[1]?et:"?"===o[1]?it:"@"===o[1]?st:tt}),s.removeAttribute(t)}else t.startsWith(k)&&(a.push({type:6,index:n}),s.removeAttribute(t));if(B.test(s.tagName)){const t=s.textContent.split(k),e=t.length-1;if(e>0){s.textContent=E?E.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],M()),W.nextNode(),a.push({type:2,index:++n});s.append(t[e],M())}}}else if(8===s.nodeType)if(s.data===O)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(k,t+1));)a.push({type:7,index:n}),t+=k.length-1}n++}}static createElement(t,e){const i=T.createElement("template");return i.innerHTML=t,i}}function Z(t,e,i=t,s){if(e===q)return e;let n=void 0!==s?i._$Co?.[s]:i._$Cl;const r=z(e)?void 0:e._$litDirective$;return n?.constructor!==r&&(n?._$AO?.(!1),void 0===r?n=void 0:(n=new r(t),n._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=n:i._$Cl=n),void 0!==n&&(e=Z(t,n._$AS(t,e.values),n,s)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??T).importNode(e,!0);W.currentNode=s;let n=W.nextNode(),r=0,o=0,a=i[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new X(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new nt(n,this,t)),this._$AV.push(e),a=i[++o]}r!==a?.index&&(n=W.nextNode(),r++)}return W.currentNode=T,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=F,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),z(t)?t===F||null==t||""===t?(this._$AH!==F&&this._$AR(),this._$AH=F):t!==this._$AH&&t!==q&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>U(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==F&&z(this._$AH)?this._$AA.nextSibling.data=t:this.T(T.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Y.createElement(G(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Q(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=K.get(t.strings);return void 0===e&&K.set(t.strings,e=new Y(t)),e}k(t){U(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new X(this.O(M()),this.O(M()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=x(t).nextSibling;x(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=F,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=F}_$AI(t,e=this,i,s){const n=this.strings;let r=!1;if(void 0===n)t=Z(this,t,e,0),r=!z(t)||t!==this._$AH&&t!==q,r&&(this._$AH=t);else{const s=t;let o,a;for(t=n[0],o=0;o<n.length-1;o++)a=Z(this,s[i+o],e,o),a===q&&(a=this._$AH[o]),r||=!z(a)||a!==this._$AH[o],a===F?t=F:t!==F&&(t+=(a??"")+n[o+1]),this._$AH[o]=a}r&&!s&&this.j(t)}j(t){t===F?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===F?void 0:t}}class it extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==F)}}class st extends tt{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??F)===q)return;const i=this._$AH,s=t===F&&i!==F||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==F&&(i===F||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const rt=A.litHtmlPolyfillSupport;rt?.(Y,X),(A.litHtmlVersions??=[]).push("3.3.2");const ot=globalThis;class at extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let n=s._$litPart$;if(void 0===n){const t=i?.renderBefore??null;s._$litPart$=n=new X(e.insertBefore(M(),t),t,void 0,i??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}}at._$litElement$=!0,at.finalized=!0,ot.litElementHydrateSupport?.({LitElement:at});const ct=ot.litElementPolyfillSupport;ct?.({LitElement:at}),(ot.litElementVersions??=[]).push("4.2.2");const lt=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ht={attribute:!0,type:String,converter:$,reflect:!1,hasChanged:y},dt=(t=ht,e,i)=>{const{kind:s,metadata:n}=i;let r=globalThis.litPropertyMetadata.get(n);if(void 0===r&&globalThis.litPropertyMetadata.set(n,r=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),r.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const n=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,n,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const n=this[s];e.call(this,i),this.requestUpdate(s,n,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function pt(t){return(e,i)=>"object"==typeof i?dt(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function ut(t){return pt({...t,state:!0,attribute:!1})}var gt,ft;!function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(gt||(gt={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(ft||(ft={}));const mt=(t,e,i,s)=>{s=s||{},i=null==i?{}:i;const n=new Event(e,{bubbles:void 0===s.bubbles||s.bubbles,cancelable:Boolean(s.cancelable),composed:void 0===s.composed||s.composed});return n.detail=i,t.dispatchEvent(n),n};var _t={version:"Version",invalid_configuration:"Invalid configuration",loading:"Loading…"},vt={no_entity:"Select a Ladestellen Austria sensor in the card editor.",no_stations:"No stations match the current filters.",nearest_label:"to {label}",station_count:"{count} stations",station_count_filtered:"{filtered} of {total} stations",inactive:"inactive",gratis:"Gratis",live_count:"{avail}/{total} free"},$t={green_energy:"Green energy",free_parking:"Free parking",roofed_parking:"Roofed parking",catering:"Catering nearby",bathrooms:"Restrooms",resting:"Resting area"},yt={section_main:"Main",section_display:"Display",section_filters:"Filters",name:"Card title (optional)",entity:"Sensor",max_stations:"Stations to show",show_pricing:"Show pricing chip",show_amenities:"Show amenity icons",only_available:"Only currently available stations",only_free:"Only stations with free charging",connector_filter_hint:"Tap connector types to only show stations offering at least one of them. Empty = no filter.",hint_compliance:"Data is supplied under the ladestellen.at Terms of Use. The E-Control branding in the header and the 'Datenquelle: E-Control' footer are legally required and cannot be hidden."},bt={common:_t,card:vt,amenities:$t,editor:yt},wt={version:"Version",invalid_configuration:"Ungültige Konfiguration",loading:"Lade…"},At={no_entity:"Bitte einen Ladestellen-Austria-Sensor im Karten-Editor auswählen.",no_stations:"Keine Ladestellen entsprechen den aktuellen Filtern.",nearest_label:"zu {label}",station_count:"{count} Ladestellen",station_count_filtered:"{filtered} von {total} Ladestellen",inactive:"inaktiv",gratis:"Gratis",live_count:"{avail}/{total} frei"},xt={green_energy:"Ökostrom",free_parking:"Gratis Parken",roofed_parking:"Überdacht",catering:"Gastronomie",bathrooms:"WC",resting:"Ruhebereich"},Et={section_main:"Allgemein",section_display:"Anzeige",section_filters:"Filter",name:"Kartentitel (optional)",entity:"Sensor",max_stations:"Anzahl angezeigter Ladestellen",show_pricing:"Preis-Badge anzeigen",show_amenities:"Ausstattungs-Icons anzeigen",only_available:"Nur aktuell verfügbare Ladestellen",only_free:"Nur Ladestellen mit Gratis-Laden",connector_filter_hint:"Steckertypen antippen, um nur Ladestellen mit mindestens einem davon anzuzeigen. Leer = kein Filter.",hint_compliance:"Die Daten werden unter den ladestellen.at-Nutzungsbedingungen bereitgestellt. Das E-Control-Branding im Kopf und die Fußzeile „Datenquelle: E-Control“ sind rechtlich vorgeschrieben und dürfen nicht entfernt werden."},Ct={common:wt,card:At,amenities:xt,editor:Et};const St={en:Object.freeze({__proto__:null,amenities:$t,card:vt,common:_t,default:bt,editor:yt}),de:Object.freeze({__proto__:null,amenities:xt,card:At,common:wt,default:Ct,editor:Et})};function kt(t,e){const i=t.split(".").reduce((t,e)=>{if(t&&"object"==typeof t&&e in t)return t[e]},e);return"string"==typeof i?i:void 0}function Ot(t,e="",i=""){const s=(localStorage.getItem("selectedLanguage")||"en").replace(/['"]+/g,"").replace("-","_");let n=kt(t,St[s]||St.en);return void 0===n&&(n=kt(t,St.en)),void 0===n&&(n=t),""!==e&&""!==i&&(n=n.replace(e,i)),n}const Pt=o`
  :host {
    display: block;
  }
  ha-card {
    overflow: hidden;
  }

  /* Header: E-Control branding strip — §3c compliance.
     The <a> wrapping the logo is the legally-required image-link back to
     www.e-control.at. Do not remove the anchor or the href. */
  .brand-strip {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--ha-space-3, 12px);
    padding: var(--ha-space-3, 12px) var(--ha-space-4, 16px);
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
    border-bottom: 1px solid var(--divider-color);
  }
  .brand-link {
    display: inline-flex;
    align-items: center;
    gap: var(--ha-space-2, 8px);
    text-decoration: none;
    color: inherit;
  }
  /* Styled-text E-Control wordmark as a placeholder for the official logo
     asset (TODO: bundle SVG from e-control.at/presse/pressebilder pre-v1.0). */
  .brand-logo {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 28px;
    padding: 0 10px;
    background: #0052a5;
    color: #ffffff;
    border-radius: 4px;
    font-weight: 700;
    font-size: 13px;
    letter-spacing: 0.5px;
    font-family: var(--ha-font-family-body, system-ui, sans-serif);
  }
  .brand-logo .accent {
    color: #3fa535;
    margin-right: 1px;
  }
  .card-title {
    font-size: var(--ha-font-size-l, 1rem);
    font-weight: var(--ha-font-weight-medium, 500);
    color: var(--primary-text-color);
  }

  /* Summary row — distance to nearest station. */
  .summary {
    padding: var(--ha-space-4, 16px);
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: var(--ha-space-3, 12px);
    border-bottom: 1px solid var(--divider-color);
  }
  .summary-distance {
    font-size: var(--ha-font-size-xxl, 2rem);
    font-weight: var(--ha-font-weight-bold, 700);
    color: var(--primary-text-color);
    line-height: 1;
  }
  .summary-distance .unit {
    font-size: var(--ha-font-size-m, 0.9rem);
    font-weight: var(--ha-font-weight-normal, 400);
    margin-left: 4px;
    color: var(--secondary-text-color);
  }
  .summary-count {
    font-size: var(--ha-font-size-s, 0.85rem);
    color: var(--secondary-text-color);
    text-align: right;
  }

  /* Station list. */
  .stations {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .station {
    display: flex;
    flex-direction: column;
    padding: var(--ha-space-3, 12px) var(--ha-space-4, 16px);
    border-bottom: 1px solid var(--divider-color);
    gap: 4px;
    cursor: pointer;
    transition: background-color 120ms;
  }
  .station:last-child {
    border-bottom: none;
  }
  .station:hover {
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
  }
  .station-row-1 {
    display: flex;
    justify-content: space-between;
    gap: var(--ha-space-3, 12px);
    align-items: baseline;
  }
  .station-label {
    font-weight: var(--ha-font-weight-medium, 500);
    color: var(--primary-text-color);
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .station-distance {
    font-variant-numeric: tabular-nums;
    color: var(--secondary-text-color);
    font-size: var(--ha-font-size-s, 0.85rem);
    white-space: nowrap;
  }
  .station-row-2 {
    display: flex;
    gap: var(--ha-space-2, 8px);
    align-items: center;
    flex-wrap: wrap;
    font-size: var(--ha-font-size-s, 0.85rem);
    color: var(--secondary-text-color);
  }
  .chip {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    padding: 2px 8px;
    border-radius: 999px;
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.06));
    font-size: var(--ha-font-size-xs, 0.75rem);
    font-variant-numeric: tabular-nums;
    line-height: 1.4;
  }
  .chip.power {
    background: rgba(63, 165, 53, 0.15);
    color: #2f7a27;
    font-weight: 600;
  }
  .chip.dc {
    background: rgba(255, 143, 0, 0.15);
    color: #a15c00;
    font-weight: 600;
  }
  .chip.inactive {
    background: rgba(158, 0, 0, 0.12);
    color: #9e0000;
  }
  .chip.free {
    background: rgba(63, 165, 53, 0.2);
    color: #2f7a27;
    font-weight: 600;
  }
  .chip.price {
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.06));
    color: var(--primary-text-color);
    font-weight: 500;
  }
  .chip.live-ok {
    background: rgba(63, 165, 53, 0.18);
    color: #2f7a27;
    font-weight: 600;
  }
  .chip.live-none {
    background: rgba(158, 0, 0, 0.15);
    color: #9e0000;
    font-weight: 600;
  }
  .amenity {
    display: inline-flex;
    align-items: center;
    color: var(--secondary-text-color);
  }
  .amenity ha-icon {
    --mdc-icon-size: 16px;
  }

  /* Attribution footer — §3d. Required text: "Datenquelle: E-Control". */
  .attribution {
    padding: var(--ha-space-2, 8px) var(--ha-space-4, 16px);
    text-align: right;
    font-size: var(--ha-font-size-xs, 0.75rem);
    color: var(--secondary-text-color);
    font-style: italic;
  }

  .empty-state {
    padding: var(--ha-space-5, 20px);
    text-align: center;
    color: var(--secondary-text-color);
  }
`,Tt=o`
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
    letter-spacing: 0.6px;
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
      background-color 120ms,
      color 120ms,
      border-color 120ms;
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
`,Mt=["Type 2","CCS","CHAdeMO","Type 1","Tesla","Schuko","CEE"];let zt=class extends at{constructor(){super(...arguments),this._config={type:"ladestellen-austria-card"}}setConfig(t){this._config={...t}}render(){const t=this._config.connector_types??[];return I`
      <div class="editor">
        <div class="editor-section">
          <div class="section-header">${Ot("editor.section_main")}</div>

          ${this.hass?I`
                <ha-selector
                  .hass=${this.hass}
                  .selector=${{entity:{domain:"sensor",integration:"ladestellen_austria"}}}
                  .value=${this._config.entity||void 0}
                  .configValue=${"entity"}
                  .label=${Ot("editor.entity")}
                  .required=${!0}
                  @value-changed=${this._valueChanged}
                ></ha-selector>
              `:I`<p>${Ot("common.loading")}</p>`}

          <ha-textfield
            label=${Ot("editor.name")}
            .value=${this._config.name||""}
            .configValue=${"name"}
            @input=${this._valueChanged}
          ></ha-textfield>
        </div>

        <div class="editor-section">
          <div class="section-header">${Ot("editor.section_display")}</div>

          ${this.hass?I`
                <ha-selector
                  .hass=${this.hass}
                  .selector=${{number:{min:1,max:10,step:1,mode:"slider"}}}
                  .value=${this._config.max_stations??10}
                  .configValue=${"max_stations"}
                  .label=${Ot("editor.max_stations")}
                  @value-changed=${this._valueChanged}
                ></ha-selector>
              `:F}

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
            ${Mt.map(e=>I`
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
      </div>
    `}_toggleConnector(t){const e=this._config.connector_types??[],i=e.includes(t)?e.filter(e=>e!==t):[...e,t];this._config={...this._config,connector_types:i},mt(this,"config-changed",{config:this._config})}_valueChanged(t){if(!this._config||!this.hass)return;const e=t.target;if(!e.configValue)return;const i=void 0!==e.checked?e.checked:t.detail?.value??e.value;this._config[e.configValue]!==i&&(this._config={...this._config,[e.configValue]:i},mt(this,"config-changed",{config:this._config}))}static{this.styles=Tt}};t([pt({attribute:!1})],zt.prototype,"hass",void 0),t([ut()],zt.prototype,"_config",void 0),zt=t([lt("ladestellen-austria-card-editor")],zt),console.info(`%c  Ladestellen Austria Card  %c  ${Ot("common.version")} 0.1.0-beta-3  `,"color: white; font-weight: bold; background: #3FA535","color: white; font-weight: bold; background: dimgray"),window.customCards=window.customCards||[],window.customCards.push({type:"ladestellen-austria-card",name:"Ladestellen Austria",description:"Nearby EV charging stations, powered by E-Control Austria",preview:!0,documentationURL:"https://github.com/rolandzeiner/ladestellen-austria"});let Ut=class extends at{static getConfigElement(){return document.createElement("ladestellen-austria-card-editor")}static getStubConfig(t,e){const i=e.find(t=>t.startsWith("sensor.")&&t.includes("ladestelle"));return{entity:i??""}}setConfig(t){if(!t)throw new Error(Ot("common.invalid_configuration"));this.config={name:"Ladestellen Austria",max_stations:10,show_amenities:!0,show_pricing:!0,only_available:!1,only_free:!1,connector_types:[],...t}}shouldUpdate(t){return!!this.config&&function(t,e,i){if(e.has("config")||i)return!0;if(t.config.entity){const i=e.get("hass");return!i||i.states[t.config.entity]!==t.hass.states[t.config.entity]}return!1}(this,t,!1)}getCardSize(){const t=this.config?.max_stations??10;return Math.min(2+Math.ceil(t/2),10)}render(){if(!this.hass||!this.config)return I`<ha-card><div class="empty-state">${Ot("common.loading")}</div></ha-card>`;const t=this.config.entity?this.hass.states[this.config.entity]:void 0;if(!t)return I`
        <ha-card>
          ${this._renderBrandStrip()}
          <div class="empty-state">${Ot("card.no_entity")}</div>
          ${this._renderAttribution(void 0)}
        </ha-card>
      `;const e=t.attributes.stations??[],i=!0===t.attributes.live_status_available,s=this._filterStations(e),n=Math.max(1,this.config.max_stations??10),r=s.slice(0,n),o=r[0];return I`
      <ha-card>
        ${this._renderBrandStrip()}
        ${this._renderSummary(o,s.length,e.length)}
        ${r.length>0?I`<ul class="stations">${r.map(t=>this._renderStation(t,i))}</ul>`:I`<div class="empty-state">${Ot("card.no_stations")}</div>`}
        ${this._renderAttribution(t.attributes.attribution)}
      </ha-card>
    `}_filterStations(t){const e=this.config.only_available??!1,i=this.config.only_free??!1,s=this.config.connector_types??[];return e||i||0!==s.length?t.filter(t=>{if(e){const e="ACTIVE"===t.stationStatus&&(t.points??[]).some(t=>"AVAILABLE"===t.status);if(!e)return!1}if(i){const e=(t.points??[]).some(t=>t.freeOfCharge);if(!e)return!1}if(s.length>0){const e=new Set((t.points??[]).flatMap(t=>(t.connectorType??[]).map(t=>this._shortConnector(t.consumerName,t.key)))),i=s.some(t=>e.has(t));if(!i)return!1}return!0}):t}_renderBrandStrip(){const t=this.config?.name??"Ladestellen Austria";return I`
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
    `}_renderSummary(t,e,i){const s=t?this._formatKm(t.distance):"–",n=e===i?Ot("card.station_count").replace("{count}",String(e)):Ot("card.station_count_filtered").replace("{filtered}",String(e)).replace("{total}",String(i));return I`
      <div class="summary">
        <div>
          <div class="summary-distance">
            ${s}<span class="unit">km</span>
          </div>
          <div class="summary-count">
            ${t?Ot("card.nearest_label").replace("{label}",t.label):Ot("card.no_stations")}
          </div>
        </div>
        <div class="summary-count">${n}</div>
      </div>
    `}_renderStation(t,e){const i=`https://www.google.com/maps/search/?api=1&query=${t.location.lat},${t.location.lon}`,s=t.points??[],n=Array.from(new Set(s.flatMap(t=>(t.connectorType??[]).map(t=>this._shortConnector(t.consumerName,t.key))))),r=s.some(t=>(t.electricityType??[]).includes("DC")),o=s.reduce((t,e)=>Math.max(t,e.capacityKw??0),0),a=s.length,c=s.filter(t=>"AVAILABLE"===t.status).length,l="ACTIVE"===t.stationStatus,h=this.config?.show_amenities??!0,d=this.config?.show_pricing??!0?this._pricingChip(s):null;let p=F;if(l){if(e&&a>0){const t=c>0?"live-ok":"live-none",e=Ot("card.live_count").replace("{avail}",String(c)).replace("{total}",String(a));p=I`<span class=${`chip ${t}`}>${e}</span>`}}else p=I`<span class="chip inactive">${Ot("card.inactive")}</span>`;return I`
      <li
        class="station"
        @click=${t=>this._openMaps(t,i)}
        tabindex="0"
        role="button"
      >
        <div class="station-row-1">
          <span class="station-label">${t.label}</span>
          <span class="station-distance">${this._formatKm(t.distance)} km</span>
        </div>
        <div class="station-row-2">
          <span>${t.postCode} ${t.city}</span>
          ${o>0?I`<span class="chip power">${o} kW</span>`:F}
          ${r?I`<span class="chip dc">DC</span>`:F}
          ${n.map(t=>I`<span class="chip">${t}</span>`)}
          ${d}
          ${p}
          ${h?this._renderAmenities(t):F}
        </div>
      </li>
    `}_pricingChip(t){if(0===t.length)return F;if(t.some(t=>t.freeOfCharge))return I`<span class="chip free">${Ot("card.gratis")}</span>`;const e=t.filter(t=>!t.freeOfCharge&&t.priceCentKwh>0).map(t=>t.priceCentKwh);if(e.length>0){const t=Math.min(...e);return I`<span class="chip price">${(t/100).toFixed(2)} €/kWh</span>`}const i=t.filter(t=>!t.freeOfCharge&&t.priceCentMin>0).map(t=>t.priceCentMin);if(i.length>0){const t=Math.min(...i);return I`<span class="chip price">${(t/100).toFixed(2)} €/min</span>`}return F}_renderAmenities(t){const e=[{flag:t.greenEnergy,icon:"mdi:leaf",label:Ot("amenities.green_energy")},{flag:t.freeParking,icon:"mdi:parking",label:Ot("amenities.free_parking")},{flag:t.roofedParking,icon:"mdi:home-roof",label:Ot("amenities.roofed_parking")},{flag:t.cateringService,icon:"mdi:silverware-fork-knife",label:Ot("amenities.catering")},{flag:t.bathroomsAvailable,icon:"mdi:toilet",label:Ot("amenities.bathrooms")},{flag:t.restingFacilities,icon:"mdi:sofa",label:Ot("amenities.resting")}];return I`
      ${e.filter(t=>t.flag).map(t=>I`
            <span class="amenity" title=${t.label}>
              <ha-icon icon=${t.icon}></ha-icon>
            </span>
          `)}
    `}_renderAttribution(t){const e=t&&t.includes("E-Control")?t:"Datenquelle: E-Control";return I`<div class="attribution">${e}</div>`}_openMaps(t,e){t.stopPropagation(),window.open(e,"_blank","noopener,noreferrer")}_formatKm(t){const e="number"==typeof t?t:parseFloat(String(t??""));return Number.isFinite(e)?e.toFixed(2):"–"}_shortConnector(t,e){switch(t){case"TYPE_2_AC":return"Type 2";case"COMBO2_CCS_DC":return"CCS";case"CHADEMO":return"CHAdeMO";case"TYPE_1_AC":return"Type 1";case"TESLA_S":case"TESLA_R":return"Tesla";case"OTHER":return"DOMESTIC_F"===e?"Schuko":e?.startsWith("CEE")?"CEE":e??"?";default:return t?.replace(/_/g," ")??e??"?"}}static{this.styles=Pt}};t([pt({attribute:!1})],Ut.prototype,"hass",void 0),t([ut()],Ut.prototype,"config",void 0),Ut=t([lt("ladestellen-austria-card")],Ut);export{Ut as LadestellenAustriaCard};
