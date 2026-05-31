import{cJ as V,fl as At,c_ as Ut,eK as k,cL as F,ej as xt,eR as Lt,ca as Re,W as O,be as Dt,T as q,a1 as qt,bd as _,a2 as H,ah as Mt,al as R,ba as Be,b8 as N,dZ as Xe,L as w,w as D,ac as oe,bv as z,B as Bt,b2 as ue,U,bl as ce,gm as Ft,bJ as jt,a_ as Je}from"./index-B_sODcps.js";const we=globalThis,Fe=we.ShadowRoot&&(we.ShadyCSS===void 0||we.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,je=Symbol(),Ze=new WeakMap;let Et=class{constructor(e,s,n){if(this._$cssResult$=!0,n!==je)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=s}get styleSheet(){let e=this.o;const s=this.t;if(Fe&&e===void 0){const n=s!==void 0&&s.length===1;n&&(e=Ze.get(s)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&Ze.set(s,e))}return e}toString(){return this.cssText}};const Wt=t=>new Et(typeof t=="string"?t:t+"",void 0,je),zt=(t,...e)=>{const s=t.length===1?t[0]:e.reduce((n,i,r)=>n+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[r+1],t[0]);return new Et(s,t,je)},Ht=(t,e)=>{if(Fe)t.adoptedStyleSheets=e.map(s=>s instanceof CSSStyleSheet?s:s.styleSheet);else for(const s of e){const n=document.createElement("style"),i=we.litNonce;i!==void 0&&n.setAttribute("nonce",i),n.textContent=s.cssText,t.appendChild(n)}},et=Fe?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let s="";for(const n of e.cssRules)s+=n.cssText;return Wt(s)})(t):t;const{is:Vt,defineProperty:Gt,getOwnPropertyDescriptor:Qt,getOwnPropertyNames:Yt,getOwnPropertySymbols:Kt,getPrototypeOf:Xt}=Object,Se=globalThis,tt=Se.trustedTypes,Jt=tt?tt.emptyScript:"",Zt=Se.reactiveElementPolyfillSupport,le=(t,e)=>t,be={toAttribute(t,e){switch(e){case Boolean:t=t?Jt:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=t!==null;break;case Number:s=t===null?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch{s=null}}return s}},We=(t,e)=>!Vt(t,e),st={attribute:!0,type:String,converter:be,reflect:!1,useDefault:!1,hasChanged:We};Symbol.metadata??=Symbol("metadata"),Se.litPropertyMetadata??=new WeakMap;let se=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,s=st){if(s.state&&(s.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((s=Object.create(s)).wrapped=!0),this.elementProperties.set(e,s),!s.noAccessor){const n=Symbol(),i=this.getPropertyDescriptor(e,n,s);i!==void 0&&Gt(this.prototype,e,i)}}static getPropertyDescriptor(e,s,n){const{get:i,set:r}=Qt(this.prototype,e)??{get(){return this[s]},set(o){this[s]=o}};return{get:i,set(o){const c=i?.call(this);r?.call(this,o),this.requestUpdate(e,c,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??st}static _$Ei(){if(this.hasOwnProperty(le("elementProperties")))return;const e=Xt(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(le("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(le("properties"))){const s=this.properties,n=[...Yt(s),...Kt(s)];for(const i of n)this.createProperty(i,s[i])}const e=this[Symbol.metadata];if(e!==null){const s=litPropertyMetadata.get(e);if(s!==void 0)for(const[n,i]of s)this.elementProperties.set(n,i)}this._$Eh=new Map;for(const[s,n]of this.elementProperties){const i=this._$Eu(s,n);i!==void 0&&this._$Eh.set(i,s)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const s=[];if(Array.isArray(e)){const n=new Set(e.flat(1/0).reverse());for(const i of n)s.unshift(et(i))}else e!==void 0&&s.push(et(e));return s}static _$Eu(e,s){const n=s.attribute;return n===!1?void 0:typeof n=="string"?n:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,s=this.constructor.elementProperties;for(const n of s.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ht(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,s,n){this._$AK(e,n)}_$ET(e,s){const n=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,n);if(i!==void 0&&n.reflect===!0){const r=(n.converter?.toAttribute!==void 0?n.converter:be).toAttribute(s,n.type);this._$Em=e,r==null?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(e,s){const n=this.constructor,i=n._$Eh.get(e);if(i!==void 0&&this._$Em!==i){const r=n.getPropertyOptions(i),o=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:be;this._$Em=i;const c=o.fromAttribute(s,r.type);this[i]=c??this._$Ej?.get(i)??c,this._$Em=null}}requestUpdate(e,s,n,i=!1,r){if(e!==void 0){const o=this.constructor;if(i===!1&&(r=this[e]),n??=o.getPropertyOptions(e),!((n.hasChanged??We)(r,s)||n.useDefault&&n.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,n))))return;this.C(e,s,n)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,s,{useDefault:n,reflect:i,wrapped:r},o){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??s??this[e]),r!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(s=void 0),this._$AL.set(e,s)),i===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(s){Promise.reject(s)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[i,r]of this._$Ep)this[i]=r;this._$Ep=void 0}const n=this.constructor.elementProperties;if(n.size>0)for(const[i,r]of n){const{wrapped:o}=r,c=this[i];o!==!0||this._$AL.has(i)||c===void 0||this.C(i,void 0,r,c)}}let e=!1;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),this._$EO?.forEach(n=>n.hostUpdate?.()),this.update(s)):this._$EM()}catch(n){throw e=!1,this._$EM(),n}e&&this._$AE(s)}willUpdate(e){}_$AE(e){this._$EO?.forEach(s=>s.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(s=>this._$ET(s,this[s])),this._$EM()}updated(e){}firstUpdated(e){}};se.elementStyles=[],se.shadowRootOptions={mode:"open"},se[le("elementProperties")]=new Map,se[le("finalized")]=new Map,Zt?.({ReactiveElement:se}),(Se.reactiveElementVersions??=[]).push("2.1.2");const ze=globalThis,nt=t=>t,Ae=ze.trustedTypes,it=Ae?Ae.createPolicy("lit-html",{createHTML:t=>t}):void 0,_t="$lit$",Q=`lit$${Math.random().toFixed(9).slice(2)}$`,$t="?"+Q,es=`<${$t}>`,ee=document,de=()=>ee.createComment(""),he=t=>t===null||typeof t!="object"&&typeof t!="function",He=Array.isArray,ts=t=>He(t)||typeof t?.[Symbol.iterator]=="function",Pe=`[ 	
\f\r]`,ae=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,rt=/-->/g,ot=/>/g,J=RegExp(`>|${Pe}(?:([^\\s"'>=/]+)(${Pe}*=${Pe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),at=/'/g,ct=/"/g,vt=/^(?:script|style|textarea|title)$/i,ss=t=>(e,...s)=>({_$litType$:t,strings:e,values:s}),d=ss(1),te=Symbol.for("lit-noChange"),$=Symbol.for("lit-nothing"),lt=new WeakMap,Z=ee.createTreeWalker(ee,129);function St(t,e){if(!He(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return it!==void 0?it.createHTML(e):e}const ns=(t,e)=>{const s=t.length-1,n=[];let i,r=e===2?"<svg>":e===3?"<math>":"",o=ae;for(let c=0;c<s;c++){const l=t[c];let f,y,g=-1,I=0;for(;I<l.length&&(o.lastIndex=I,y=o.exec(l),y!==null);)I=o.lastIndex,o===ae?y[1]==="!--"?o=rt:y[1]!==void 0?o=ot:y[2]!==void 0?(vt.test(y[2])&&(i=RegExp("</"+y[2],"g")),o=J):y[3]!==void 0&&(o=J):o===J?y[0]===">"?(o=i??ae,g=-1):y[1]===void 0?g=-2:(g=o.lastIndex-y[2].length,f=y[1],o=y[3]===void 0?J:y[3]==='"'?ct:at):o===ct||o===at?o=J:o===rt||o===ot?o=ae:(o=J,i=void 0);const P=o===J&&t[c+1].startsWith("/>")?" ":"";r+=o===ae?l+es:g>=0?(n.push(f),l.slice(0,g)+_t+l.slice(g)+Q+P):l+Q+(g===-2?c:P)}return[St(t,r+(t[s]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),n]};class pe{constructor({strings:e,_$litType$:s},n){let i;this.parts=[];let r=0,o=0;const c=e.length-1,l=this.parts,[f,y]=ns(e,s);if(this.el=pe.createElement(f,n),Z.currentNode=this.el.content,s===2||s===3){const g=this.el.content.firstChild;g.replaceWith(...g.childNodes)}for(;(i=Z.nextNode())!==null&&l.length<c;){if(i.nodeType===1){if(i.hasAttributes())for(const g of i.getAttributeNames())if(g.endsWith(_t)){const I=y[o++],P=i.getAttribute(g).split(Q),W=/([.?@])?(.*)/.exec(I);l.push({type:1,index:r,name:W[2],strings:P,ctor:W[1]==="."?rs:W[1]==="?"?os:W[1]==="@"?as:Ie}),i.removeAttribute(g)}else g.startsWith(Q)&&(l.push({type:6,index:r}),i.removeAttribute(g));if(vt.test(i.tagName)){const g=i.textContent.split(Q),I=g.length-1;if(I>0){i.textContent=Ae?Ae.emptyScript:"";for(let P=0;P<I;P++)i.append(g[P],de()),Z.nextNode(),l.push({type:2,index:++r});i.append(g[I],de())}}}else if(i.nodeType===8)if(i.data===$t)l.push({type:2,index:r});else{let g=-1;for(;(g=i.data.indexOf(Q,g+1))!==-1;)l.push({type:7,index:r}),g+=Q.length-1}r++}}static createElement(e,s){const n=ee.createElement("template");return n.innerHTML=e,n}}function ne(t,e,s=t,n){if(e===te)return e;let i=n!==void 0?s._$Co?.[n]:s._$Cl;const r=he(e)?void 0:e._$litDirective$;return i?.constructor!==r&&(i?._$AO?.(!1),r===void 0?i=void 0:(i=new r(t),i._$AT(t,s,n)),n!==void 0?(s._$Co??=[])[n]=i:s._$Cl=i),i!==void 0&&(e=ne(t,i._$AS(t,e.values),i,n)),e}class is{constructor(e,s){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=s}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:s},parts:n}=this._$AD,i=(e?.creationScope??ee).importNode(s,!0);Z.currentNode=i;let r=Z.nextNode(),o=0,c=0,l=n[0];for(;l!==void 0;){if(o===l.index){let f;l.type===2?f=new me(r,r.nextSibling,this,e):l.type===1?f=new l.ctor(r,l.name,l.strings,this,e):l.type===6&&(f=new cs(r,this,e)),this._$AV.push(f),l=n[++c]}o!==l?.index&&(r=Z.nextNode(),o++)}return Z.currentNode=ee,i}p(e){let s=0;for(const n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,s),s+=n.strings.length-2):n._$AI(e[s])),s++}}class me{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,s,n,i){this.type=2,this._$AH=$,this._$AN=void 0,this._$AA=e,this._$AB=s,this._$AM=n,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const s=this._$AM;return s!==void 0&&e?.nodeType===11&&(e=s.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,s=this){e=ne(this,e,s),he(e)?e===$||e==null||e===""?(this._$AH!==$&&this._$AR(),this._$AH=$):e!==this._$AH&&e!==te&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):ts(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==$&&he(this._$AH)?this._$AA.nextSibling.data=e:this.T(ee.createTextNode(e)),this._$AH=e}$(e){const{values:s,_$litType$:n}=e,i=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=pe.createElement(St(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===i)this._$AH.p(s);else{const r=new is(i,this),o=r.u(this.options);r.p(s),this.T(o),this._$AH=r}}_$AC(e){let s=lt.get(e.strings);return s===void 0&&lt.set(e.strings,s=new pe(e)),s}k(e){He(this._$AH)||(this._$AH=[],this._$AR());const s=this._$AH;let n,i=0;for(const r of e)i===s.length?s.push(n=new me(this.O(de()),this.O(de()),this,this.options)):n=s[i],n._$AI(r),i++;i<s.length&&(this._$AR(n&&n._$AB.nextSibling,i),s.length=i)}_$AR(e=this._$AA.nextSibling,s){for(this._$AP?.(!1,!0,s);e!==this._$AB;){const n=nt(e).nextSibling;nt(e).remove(),e=n}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}}class Ie{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,s,n,i,r){this.type=1,this._$AH=$,this._$AN=void 0,this.element=e,this.name=s,this._$AM=i,this.options=r,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=$}_$AI(e,s=this,n,i){const r=this.strings;let o=!1;if(r===void 0)e=ne(this,e,s,0),o=!he(e)||e!==this._$AH&&e!==te,o&&(this._$AH=e);else{const c=e;let l,f;for(e=r[0],l=0;l<r.length-1;l++)f=ne(this,c[n+l],s,l),f===te&&(f=this._$AH[l]),o||=!he(f)||f!==this._$AH[l],f===$?e=$:e!==$&&(e+=(f??"")+r[l+1]),this._$AH[l]=f}o&&!i&&this.j(e)}j(e){e===$?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class rs extends Ie{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===$?void 0:e}}class os extends Ie{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==$)}}class as extends Ie{constructor(e,s,n,i,r){super(e,s,n,i,r),this.type=5}_$AI(e,s=this){if((e=ne(this,e,s,0)??$)===te)return;const n=this._$AH,i=e===$&&n!==$||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,r=e!==$&&(n===$||i);i&&this.element.removeEventListener(this.name,this,n),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class cs{constructor(e,s,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=s,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){ne(this,e)}}const ls=ze.litHtmlPolyfillSupport;ls?.(pe,me),(ze.litHtmlVersions??=[]).push("3.3.3");const us=(t,e,s)=>{const n=s?.renderBefore??e;let i=n._$litPart$;if(i===void 0){const r=s?.renderBefore??null;n._$litPart$=i=new me(e.insertBefore(de(),r),r,void 0,s??{})}return i._$AI(t),i};const Ve=globalThis;let T=class extends se{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const s=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=us(s,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return te}};T._$litElement$=!0,T.finalized=!0,Ve.litElementHydrateSupport?.({LitElement:T});const ds=Ve.litElementPolyfillSupport;ds?.({LitElement:T});(Ve.litElementVersions??=[]).push("4.2.2");const hs={attribute:!0,type:String,converter:be,reflect:!1,hasChanged:We},ps=(t=hs,e,s)=>{const{kind:n,metadata:i}=s;let r=globalThis.litPropertyMetadata.get(i);if(r===void 0&&globalThis.litPropertyMetadata.set(i,r=new Map),n==="setter"&&((t=Object.create(t)).wrapped=!0),r.set(s.name,t),n==="accessor"){const{name:o}=s;return{set(c){const l=e.get.call(this);e.set.call(this,c),this.requestUpdate(o,l,t,!0,c)},init(c){return c!==void 0&&this.C(o,void 0,t,c),c}}}if(n==="setter"){const{name:o}=s;return function(c){const l=this[o];e.call(this,c),this.requestUpdate(o,l,t,!0,c)}}throw Error("Unsupported decorator location: "+n)};function fe(t){return(e,s)=>typeof s=="object"?ps(t,e,s):((n,i,r)=>{const o=i.hasOwnProperty(r);return i.constructor.createProperty(r,n),o?Object.getOwnPropertyDescriptor(i,r):void 0})(t,e,s)}function m(t){return fe({...t,state:!0,attribute:!1})}const x=t=>t??$,ms=V`
  :host {
    position: relative;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    padding: ${({spacing:t})=>t[1]};
  }

  /* -- Colors --------------------------------------------------- */
  button[data-type='accent'] wui-icon {
    color: ${({tokens:t})=>t.core.iconAccentPrimary};
  }

  button[data-type='neutral'][data-variant='primary'] wui-icon {
    color: ${({tokens:t})=>t.theme.iconInverse};
  }

  button[data-type='neutral'][data-variant='secondary'] wui-icon {
    color: ${({tokens:t})=>t.theme.iconDefault};
  }

  button[data-type='success'] wui-icon {
    color: ${({tokens:t})=>t.core.iconSuccess};
  }

  button[data-type='error'] wui-icon {
    color: ${({tokens:t})=>t.core.iconError};
  }

  /* -- Sizes --------------------------------------------------- */
  button[data-size='xs'] {
    width: 16px;
    height: 16px;

    border-radius: ${({borderRadius:t})=>t[1]};
  }

  button[data-size='sm'] {
    width: 20px;
    height: 20px;
    border-radius: ${({borderRadius:t})=>t[1]};
  }

  button[data-size='md'] {
    width: 24px;
    height: 24px;
    border-radius: ${({borderRadius:t})=>t[2]};
  }

  button[data-size='lg'] {
    width: 28px;
    height: 28px;
    border-radius: ${({borderRadius:t})=>t[2]};
  }

  button[data-size='xs'] wui-icon {
    width: 8px;
    height: 8px;
  }

  button[data-size='sm'] wui-icon {
    width: 12px;
    height: 12px;
  }

  button[data-size='md'] wui-icon {
    width: 16px;
    height: 16px;
  }

  button[data-size='lg'] wui-icon {
    width: 20px;
    height: 20px;
  }

  /* -- Hover --------------------------------------------------- */
  @media (hover: hover) {
    button[data-type='accent']:hover:enabled {
      background-color: ${({tokens:t})=>t.core.foregroundAccent010};
    }

    button[data-variant='primary'][data-type='neutral']:hover:enabled {
      background-color: ${({tokens:t})=>t.theme.foregroundSecondary};
    }

    button[data-variant='secondary'][data-type='neutral']:hover:enabled {
      background-color: ${({tokens:t})=>t.theme.foregroundSecondary};
    }

    button[data-type='success']:hover:enabled {
      background-color: ${({tokens:t})=>t.core.backgroundSuccess};
    }

    button[data-type='error']:hover:enabled {
      background-color: ${({tokens:t})=>t.core.backgroundError};
    }
  }

  /* -- Focus --------------------------------------------------- */
  button:focus-visible {
    box-shadow: 0 0 0 4px ${({tokens:t})=>t.core.foregroundAccent020};
  }

  /* -- Properties --------------------------------------------------- */
  button[data-full-width='true'] {
    width: 100%;
  }

  :host([fullWidth]) {
    width: 100%;
  }

  button[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;var K=function(t,e,s,n){var i=arguments.length,r=i<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,s):n,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(t,e,s,n);else for(var c=t.length-1;c>=0;c--)(o=t[c])&&(r=(i<3?o(r):i>3?o(e,s,r):o(e,s))||r);return i>3&&r&&Object.defineProperty(e,s,r),r};let M=class extends xt{constructor(){super(...arguments),this.icon="card",this.variant="primary",this.type="accent",this.size="md",this.iconSize=void 0,this.fullWidth=!1,this.disabled=!1}render(){return Re`<button
      data-variant=${this.variant}
      data-type=${this.type}
      data-size=${this.size}
      data-full-width=${this.fullWidth}
      ?disabled=${this.disabled}
    >
      <wui-icon color="inherit" name=${this.icon} size=${Lt(this.iconSize)}></wui-icon>
    </button>`}};M.styles=[At,Ut,ms];K([k()],M.prototype,"icon",void 0);K([k()],M.prototype,"variant",void 0);K([k()],M.prototype,"type",void 0);K([k()],M.prototype,"size",void 0);K([k()],M.prototype,"iconSize",void 0);K([k({type:Boolean})],M.prototype,"fullWidth",void 0);K([k({type:Boolean})],M.prototype,"disabled",void 0);M=K([F("wui-icon-button")],M);const fs=Symbol(),ut=Object.getPrototypeOf,dt=new WeakMap,gs=t=>t&&(dt.has(t)?dt.get(t):ut(t)===Object.prototype||ut(t)===Array.prototype),ys=t=>gs(t)&&t[fs]||null,Ue={},Ge=t=>typeof t=="object"&&t!==null,ws=t=>Ge(t)&&!It.has(t)&&(Array.isArray(t)||!(Symbol.iterator in t))&&!(t instanceof WeakMap)&&!(t instanceof WeakSet)&&!(t instanceof Error)&&!(t instanceof Number)&&!(t instanceof Date)&&!(t instanceof String)&&!(t instanceof RegExp)&&!(t instanceof ArrayBuffer)&&!(t instanceof Promise),bs=(t,e,s,n)=>({deleteProperty(i,r){const o=Reflect.get(i,r);s(r);const c=Reflect.deleteProperty(i,r);return c&&n(["delete",[r],o]),c},set(i,r,o,c){const l=!t()&&Reflect.has(i,r),f=Reflect.get(i,r,c);if(l&&(ht(f,o)||Ee.has(o)&&ht(f,Ee.get(o))))return!0;s(r),Ge(o)&&(o=ys(o)||o);const y=!xe.has(o)&&xs(o)?Nt(o):o;return e(r,y),Reflect.set(i,r,y,c),n(["set",[r],o,f]),!0}}),xe=new WeakMap,It=new WeakSet,Te=[1],Ee=new WeakMap;let ht=Object.is,As=(t,e)=>new Proxy(t,e),xs=ws,Es=bs;function Nt(t={}){if(!Ge(t))throw new Error("object required");const e=Ee.get(t);if(e)return e;let s=Te[0];const n=new Set,i=(b,S=++Te[0])=>{s!==S&&(r=s=S,n.forEach(A=>A(b,S)))};let r=s;const o=(b=Te[0])=>(r!==b&&(r=b,l.forEach(([S])=>{const A=S[1](b);A>s&&(s=A)})),s),c=b=>(S,A)=>{const L=[...S];L[1]=[b,...L[1]],i(L,A)},l=new Map,f=(b,S)=>{const A=!It.has(S)&&xe.get(S);if(A){if((Ue?"production":void 0)!=="production"&&l.has(b))throw new Error("prop listener already exists");if(n.size){const L=A[2](c(b));l.set(b,[A,L])}else l.set(b,[A])}},y=b=>{var S;const A=l.get(b);A&&(l.delete(b),(S=A[1])==null||S.call(A))},g=b=>(n.add(b),n.size===1&&l.forEach(([A,L],ge)=>{if((Ue?"production":void 0)!=="production"&&L)throw new Error("remove already exists");const Rt=A[2](c(ge));l.set(ge,[A,Rt])}),()=>{n.delete(b),n.size===0&&l.forEach(([A,L],ge)=>{L&&(L(),l.set(ge,[A]))})});let I=!0;const P=Es(()=>I,f,y,i),W=As(t,P);Ee.set(t,W);const Ot=[t,o,g];return xe.set(W,Ot),Reflect.ownKeys(t).forEach(b=>{const S=Object.getOwnPropertyDescriptor(t,b);"value"in S&&S.writable&&(W[b]=t[b])}),I=!1,W}function Pt(t,e,s){const n=xe.get(t);(Ue?"production":void 0)!=="production"&&!n&&console.warn("Please use proxy object");let i;const r=[],o=n[2];let c=!1;const f=o(y=>{r.push(y),i||(i=Promise.resolve().then(()=>{i=void 0,c&&e(r.splice(0))}))});return c=!0,()=>{c=!1,f()}}function _s(t,e,s,n){let i=t[e];return Pt(t,()=>{const r=t[e];Object.is(i,r)||s(i=r)})}const h={INVALID_PAYMENT_CONFIG:"INVALID_PAYMENT_CONFIG",INVALID_RECIPIENT:"INVALID_RECIPIENT",INVALID_ASSET:"INVALID_ASSET",INVALID_AMOUNT:"INVALID_AMOUNT",UNKNOWN_ERROR:"UNKNOWN_ERROR",UNABLE_TO_INITIATE_PAYMENT:"UNABLE_TO_INITIATE_PAYMENT",INVALID_CHAIN_NAMESPACE:"INVALID_CHAIN_NAMESPACE",GENERIC_PAYMENT_ERROR:"GENERIC_PAYMENT_ERROR",UNABLE_TO_GET_EXCHANGES:"UNABLE_TO_GET_EXCHANGES",ASSET_NOT_SUPPORTED:"ASSET_NOT_SUPPORTED",UNABLE_TO_GET_PAY_URL:"UNABLE_TO_GET_PAY_URL",UNABLE_TO_GET_BUY_STATUS:"UNABLE_TO_GET_BUY_STATUS",UNABLE_TO_GET_TOKEN_BALANCES:"UNABLE_TO_GET_TOKEN_BALANCES",UNABLE_TO_GET_QUOTE:"UNABLE_TO_GET_QUOTE",UNABLE_TO_GET_QUOTE_STATUS:"UNABLE_TO_GET_QUOTE_STATUS",INVALID_RECIPIENT_ADDRESS_FOR_ASSET:"INVALID_RECIPIENT_ADDRESS_FOR_ASSET"},G={[h.INVALID_PAYMENT_CONFIG]:"Invalid payment configuration",[h.INVALID_RECIPIENT]:"Invalid recipient address",[h.INVALID_ASSET]:"Invalid asset specified",[h.INVALID_AMOUNT]:"Invalid payment amount",[h.INVALID_RECIPIENT_ADDRESS_FOR_ASSET]:"Invalid recipient address for the asset selected",[h.UNKNOWN_ERROR]:"Unknown payment error occurred",[h.UNABLE_TO_INITIATE_PAYMENT]:"Unable to initiate payment",[h.INVALID_CHAIN_NAMESPACE]:"Invalid chain namespace",[h.GENERIC_PAYMENT_ERROR]:"Unable to process payment",[h.UNABLE_TO_GET_EXCHANGES]:"Unable to get exchanges",[h.ASSET_NOT_SUPPORTED]:"Asset not supported by the selected exchange",[h.UNABLE_TO_GET_PAY_URL]:"Unable to get payment URL",[h.UNABLE_TO_GET_BUY_STATUS]:"Unable to get buy status",[h.UNABLE_TO_GET_TOKEN_BALANCES]:"Unable to get token balances",[h.UNABLE_TO_GET_QUOTE]:"Unable to get quote. Please choose a different token",[h.UNABLE_TO_GET_QUOTE_STATUS]:"Unable to get quote status"};class p extends Error{get message(){return G[this.code]}constructor(e,s){super(G[e]),this.name="AppKitPayError",this.code=e,this.details=s,Error.captureStackTrace&&Error.captureStackTrace(this,p)}}const $s="https://rpc.walletconnect.org/v1/json-rpc",pt="reown_test";function vs(){const{chainNamespace:t}=_.parseCaipNetworkId(u.state.paymentAsset.network);if(!H.isAddress(u.state.recipient,t))throw new p(h.INVALID_RECIPIENT_ADDRESS_FOR_ASSET,`Provide valid recipient address for namespace "${t}"`)}async function Ss(t,e,s){if(e!==O.CHAIN.EVM)throw new p(h.INVALID_CHAIN_NAMESPACE);if(!s.fromAddress)throw new p(h.INVALID_PAYMENT_CONFIG,"fromAddress is required for native EVM payments.");const n=typeof s.amount=="string"?parseFloat(s.amount):s.amount;if(isNaN(n))throw new p(h.INVALID_PAYMENT_CONFIG);const i=t.metadata?.decimals??18,r=q.parseUnits(n.toString(),i);if(typeof r!="bigint")throw new p(h.GENERIC_PAYMENT_ERROR);return await q.sendTransaction({chainNamespace:e,to:s.recipient,address:s.fromAddress,value:r,data:"0x"})??void 0}async function Is(t,e){if(!e.fromAddress)throw new p(h.INVALID_PAYMENT_CONFIG,"fromAddress is required for ERC20 EVM payments.");const s=t.asset,n=e.recipient,i=Number(t.metadata.decimals),r=q.parseUnits(e.amount.toString(),i);if(r===void 0)throw new p(h.GENERIC_PAYMENT_ERROR);return await q.writeContract({fromAddress:e.fromAddress,tokenAddress:s,args:[n,r],method:"transfer",abi:qt.getERC20Abi(s),chainNamespace:O.CHAIN.EVM})??void 0}async function Ns(t,e){if(t!==O.CHAIN.SOLANA)throw new p(h.INVALID_CHAIN_NAMESPACE);if(!e.fromAddress)throw new p(h.INVALID_PAYMENT_CONFIG,"fromAddress is required for Solana payments.");const s=typeof e.amount=="string"?parseFloat(e.amount):e.amount;if(isNaN(s)||s<=0)throw new p(h.INVALID_PAYMENT_CONFIG,"Invalid payment amount.");try{if(!Dt.getProvider(t))throw new p(h.GENERIC_PAYMENT_ERROR,"No Solana provider available.");const i=await q.sendTransaction({chainNamespace:O.CHAIN.SOLANA,to:e.recipient,value:s,tokenMint:e.tokenMint});if(!i)throw new p(h.GENERIC_PAYMENT_ERROR,"Transaction failed.");return i}catch(n){throw n instanceof p?n:new p(h.GENERIC_PAYMENT_ERROR,`Solana payment failed: ${n}`)}}async function Ps({sourceToken:t,toToken:e,amount:s,recipient:n}){const i=q.parseUnits(s,t.metadata.decimals),r=q.parseUnits(s,e.metadata.decimals);return Promise.resolve({type:De,origin:{amount:i?.toString()??"0",currency:t},destination:{amount:r?.toString()??"0",currency:e},fees:[{id:"service",label:"Service Fee",amount:"0",currency:e}],steps:[{requestId:De,type:"deposit",deposit:{amount:i?.toString()??"0",currency:t.asset,receiver:n}}],timeInSeconds:6})}function Le(t){if(!t)return null;const e=t.steps[0];return!e||e.type!==Ws?null:e}function Ce(t,e=0){if(!t)return[];const s=t.steps.filter(i=>i.type===zs),n=s.filter((i,r)=>r+1>e);return s.length>0&&s.length<3?n:[]}const Qe=new Mt({baseUrl:H.getApiUrl(),clientId:null});class Ts extends Error{}function Cs(){const t=Be.getSnapshot().projectId;return`${$s}?projectId=${t}`}function Ye(){const{projectId:t,sdkType:e,sdkVersion:s}=Be.state;return{projectId:t,st:e||"appkit",sv:s||"html-wagmi-4.2.2"}}async function Ke(t,e){const s=Cs(),{sdkType:n,sdkVersion:i,projectId:r}=Be.getSnapshot(),o={jsonrpc:"2.0",id:1,method:t,params:{...e||{},st:n,sv:i,projectId:r}},l=await(await fetch(s,{method:"POST",body:JSON.stringify(o),headers:{"Content-Type":"application/json"}})).json();if(l.error)throw new Ts(l.error.message);return l}async function mt(t){return(await Ke("reown_getExchanges",t)).result}async function ft(t){return(await Ke("reown_getExchangePayUrl",t)).result}async function ks(t){return(await Ke("reown_getExchangeBuyStatus",t)).result}async function Os(t){const e=N.bigNumber(t.amount).times(10**t.toToken.metadata.decimals).toString(),{chainId:s,chainNamespace:n}=_.parseCaipNetworkId(t.sourceToken.network),{chainId:i,chainNamespace:r}=_.parseCaipNetworkId(t.toToken.network),o=t.sourceToken.asset==="native"?Xe(n):t.sourceToken.asset,c=t.toToken.asset==="native"?Xe(r):t.toToken.asset;return await Qe.post({path:"/appkit/v1/transfers/quote",body:{user:t.address,originChainId:s.toString(),originCurrency:o,destinationChainId:i.toString(),destinationCurrency:c,recipient:t.recipient,amount:e},params:Ye()})}async function Rs(t){const e=R.isLowerCaseMatch(t.sourceToken.network,t.toToken.network),s=R.isLowerCaseMatch(t.sourceToken.asset,t.toToken.asset);return e&&s?Ps(t):Os(t)}async function Us(t){return await Qe.get({path:"/appkit/v1/transfers/status",params:{requestId:t.requestId,...Ye()}})}async function Ls(t){return await Qe.get({path:`/appkit/v1/transfers/assets/exchanges/${t}`,params:Ye()})}const Ds=["eip155","solana"],qs={eip155:{native:{assetNamespace:"slip44",assetReference:"60"},defaultTokenNamespace:"erc20"},solana:{native:{assetNamespace:"slip44",assetReference:"501"},defaultTokenNamespace:"token"}},gt={56:"714",204:"714"};function ke(t,e){const{chainNamespace:s,chainId:n}=_.parseCaipNetworkId(t),i=qs[s];if(!i)throw new Error(`Unsupported chain namespace for CAIP-19 formatting: ${s}`);let r=i.native.assetNamespace,o=i.native.assetReference;return e!=="native"?(r=i.defaultTokenNamespace,o=e):s==="eip155"&&gt[n]&&(o=gt[n]),`${`${s}:${n}`}/${r}:${o}`}function Ms(t){const{chainNamespace:e}=_.parseCaipNetworkId(t);return Ds.includes(e)}function Bs(t){const s=w.getAllRequestedCaipNetworks().find(i=>i.caipNetworkId===t.chainId);let n=t.address;if(!s)throw new Error(`Target network not found for balance chainId "${t.chainId}"`);if(R.isLowerCaseMatch(t.symbol,s.nativeCurrency.symbol))n="native";else if(H.isCaipAddress(n)){const{address:i}=_.parseCaipAddress(n);n=i}else if(!n)throw new Error(`Balance address not found for balance symbol "${t.symbol}"`);return{network:s.caipNetworkId,asset:n,metadata:{name:t.name,symbol:t.symbol,decimals:Number(t.quantity.decimals),logoURI:t.iconUrl},amount:t.quantity.numeric}}function Fs(t){return{chainId:t.network,address:`${t.network}:${t.asset}`,symbol:t.metadata.symbol,name:t.metadata.name,iconUrl:t.metadata.logoURI||"",price:0,quantity:{numeric:"0",decimals:t.metadata.decimals.toString()}}}function _e(t){const e=N.bigNumber(t,{safe:!0});return e.lt(.001)?"<0.001":e.round(4).toString()}function js(t){const s=w.getAllRequestedCaipNetworks().find(n=>n.caipNetworkId===t.network);return s?!!s.testnet:!1}const yt=0,Oe="unknown",De="direct-transfer",Ws="deposit",zs="transaction",a=Nt({paymentAsset:{network:"eip155:1",asset:"0x0",metadata:{name:"0x0",symbol:"0x0",decimals:0}},recipient:"0x0",amount:0,isConfigured:!1,error:null,isPaymentInProgress:!1,exchanges:[],isLoading:!1,openInNewTab:!0,redirectUrl:void 0,payWithExchange:void 0,currentPayment:void 0,analyticsSet:!1,paymentId:void 0,choice:"pay",tokenBalances:{[O.CHAIN.EVM]:[],[O.CHAIN.SOLANA]:[]},isFetchingTokenBalances:!1,selectedPaymentAsset:null,quote:void 0,quoteStatus:"waiting",quoteError:null,isFetchingQuote:!1,selectedExchange:void 0,exchangeUrlForQuote:void 0,requestId:void 0}),u={state:a,subscribe(t){return Pt(a,()=>t(a))},subscribeKey(t,e){return _s(a,t,e)},async handleOpenPay(t){this.resetState(),this.setPaymentConfig(t),this.initializeAnalytics(),vs(),await this.prepareTokenLogo(),a.isConfigured=!0,oe.sendEvent({type:"track",event:"PAY_MODAL_OPEN",properties:{exchanges:a.exchanges,configuration:{network:a.paymentAsset.network,asset:a.paymentAsset.asset,recipient:a.recipient,amount:a.amount}}}),await ue.open({view:"Pay"})},resetState(){a.paymentAsset={network:"eip155:1",asset:"0x0",metadata:{name:"0x0",symbol:"0x0",decimals:0}},a.recipient="0x0",a.amount=0,a.isConfigured=!1,a.error=null,a.isPaymentInProgress=!1,a.isLoading=!1,a.currentPayment=void 0,a.selectedExchange=void 0,a.exchangeUrlForQuote=void 0,a.requestId=void 0},resetQuoteState(){a.quote=void 0,a.quoteStatus="waiting",a.quoteError=null,a.isFetchingQuote=!1,a.requestId=void 0},setPaymentConfig(t){if(!t.paymentAsset)throw new p(h.INVALID_PAYMENT_CONFIG);try{a.choice=t.choice??"pay",a.paymentAsset=t.paymentAsset,a.recipient=t.recipient,a.amount=t.amount,a.openInNewTab=t.openInNewTab??!0,a.redirectUrl=t.redirectUrl,a.payWithExchange=t.payWithExchange,a.error=null}catch(e){throw new p(h.INVALID_PAYMENT_CONFIG,e.message)}},setSelectedPaymentAsset(t){a.selectedPaymentAsset=t},setSelectedExchange(t){a.selectedExchange=t},setRequestId(t){a.requestId=t},setPaymentInProgress(t){a.isPaymentInProgress=t},getPaymentAsset(){return a.paymentAsset},getExchanges(){return a.exchanges},async fetchExchanges(){try{a.isLoading=!0;const t=await mt({page:yt});a.exchanges=t.exchanges.slice(0,2)}catch{throw z.showError(G.UNABLE_TO_GET_EXCHANGES),new p(h.UNABLE_TO_GET_EXCHANGES)}finally{a.isLoading=!1}},async getAvailableExchanges(t){try{const e=t?.asset&&t?.network?ke(t.network,t.asset):void 0;return await mt({page:t?.page??yt,asset:e,amount:t?.amount?.toString()})}catch{throw new p(h.UNABLE_TO_GET_EXCHANGES)}},async getPayUrl(t,e,s=!1){try{const n=Number(e.amount),i=await ft({exchangeId:t,asset:ke(e.network,e.asset),amount:n.toString(),recipient:`${e.network}:${e.recipient}`});return oe.sendEvent({type:"track",event:"PAY_EXCHANGE_SELECTED",properties:{source:"pay",exchange:{id:t},configuration:{network:e.network,asset:e.asset,recipient:e.recipient,amount:n},currentPayment:{type:"exchange",exchangeId:t},headless:s}}),s&&(this.initiatePayment(),oe.sendEvent({type:"track",event:"PAY_INITIATED",properties:{source:"pay",paymentId:a.paymentId||Oe,configuration:{network:e.network,asset:e.asset,recipient:e.recipient,amount:n},currentPayment:{type:"exchange",exchangeId:t}}})),i}catch(n){throw n instanceof Error&&n.message.includes("is not supported")?new p(h.ASSET_NOT_SUPPORTED):new Error(n.message)}},async generateExchangeUrlForQuote({exchangeId:t,paymentAsset:e,amount:s,recipient:n}){const i=await ft({exchangeId:t,asset:ke(e.network,e.asset),amount:s.toString(),recipient:n});a.exchangeSessionId=i.sessionId,a.exchangeUrlForQuote=i.url},async openPayUrl(t,e,s=!1){try{const n=await this.getPayUrl(t.exchangeId,e,s);if(!n)throw new p(h.UNABLE_TO_GET_PAY_URL);const r=t.openInNewTab??!0?"_blank":"_self";return H.openHref(n.url,r),n}catch(n){throw n instanceof p?a.error=n.message:a.error=G.GENERIC_PAYMENT_ERROR,new p(h.UNABLE_TO_GET_PAY_URL)}},async onTransfer({chainNamespace:t,fromAddress:e,toAddress:s,amount:n,paymentAsset:i}){if(a.currentPayment={type:"wallet",status:"IN_PROGRESS"},!a.isPaymentInProgress)try{this.initiatePayment();const o=w.getAllRequestedCaipNetworks().find(l=>l.caipNetworkId===i.network);if(!o)throw new Error("Target network not found");const c=w.state.activeCaipNetwork;switch(R.isLowerCaseMatch(c?.caipNetworkId,o.caipNetworkId)||await w.switchActiveNetwork(o),t){case O.CHAIN.EVM:i.asset==="native"&&(a.currentPayment.result=await Ss(i,t,{recipient:s,amount:n,fromAddress:e})),i.asset.startsWith("0x")&&(a.currentPayment.result=await Is(i,{recipient:s,amount:n,fromAddress:e})),a.currentPayment.status="SUCCESS";break;case O.CHAIN.SOLANA:a.currentPayment.result=await Ns(t,{recipient:s,amount:n,fromAddress:e,tokenMint:i.asset==="native"?void 0:i.asset}),a.currentPayment.status="SUCCESS";break;default:throw new p(h.INVALID_CHAIN_NAMESPACE)}}catch(r){throw r instanceof p?a.error=r.message:a.error=G.GENERIC_PAYMENT_ERROR,a.currentPayment.status="FAILED",z.showError(a.error),r}finally{a.isPaymentInProgress=!1}},async onSendTransaction(t){try{const{namespace:e,transactionStep:s}=t;u.initiatePayment();const i=w.getAllRequestedCaipNetworks().find(o=>o.caipNetworkId===a.paymentAsset?.network);if(!i)throw new Error("Target network not found");const r=w.state.activeCaipNetwork;if(R.isLowerCaseMatch(r?.caipNetworkId,i.caipNetworkId)||await w.switchActiveNetwork(i),e===O.CHAIN.EVM){const{from:o,to:c,data:l,value:f}=s.transaction;await q.sendTransaction({address:o,to:c,data:l,value:BigInt(f),chainNamespace:e})}else if(e===O.CHAIN.SOLANA){const{instructions:o}=s.transaction;await q.writeSolanaTransaction({instructions:o})}}catch(e){throw e instanceof p?a.error=e.message:a.error=G.GENERIC_PAYMENT_ERROR,z.showError(a.error),e}finally{a.isPaymentInProgress=!1}},getExchangeById(t){return a.exchanges.find(e=>e.id===t)},validatePayConfig(t){const{paymentAsset:e,recipient:s,amount:n}=t;if(!e)throw new p(h.INVALID_PAYMENT_CONFIG);if(!s)throw new p(h.INVALID_RECIPIENT);if(!e.asset)throw new p(h.INVALID_ASSET);if(n==null||n<=0)throw new p(h.INVALID_AMOUNT)},async handlePayWithExchange(t){try{a.currentPayment={type:"exchange",exchangeId:t};const{network:e,asset:s}=a.paymentAsset,n={network:e,asset:s,amount:a.amount,recipient:a.recipient},i=await this.getPayUrl(t,n);if(!i)throw new p(h.UNABLE_TO_INITIATE_PAYMENT);return a.currentPayment.sessionId=i.sessionId,a.currentPayment.status="IN_PROGRESS",a.currentPayment.exchangeId=t,this.initiatePayment(),{url:i.url,openInNewTab:a.openInNewTab}}catch(e){return e instanceof p?a.error=e.message:a.error=G.GENERIC_PAYMENT_ERROR,a.isPaymentInProgress=!1,z.showError(a.error),null}},async getBuyStatus(t,e){try{const s=await ks({sessionId:e,exchangeId:t});return(s.status==="SUCCESS"||s.status==="FAILED")&&oe.sendEvent({type:"track",event:s.status==="SUCCESS"?"PAY_SUCCESS":"PAY_ERROR",properties:{message:s.status==="FAILED"?H.parseError(a.error):void 0,source:"pay",paymentId:a.paymentId||Oe,configuration:{network:a.paymentAsset.network,asset:a.paymentAsset.asset,recipient:a.recipient,amount:a.amount},currentPayment:{type:"exchange",exchangeId:a.currentPayment?.exchangeId,sessionId:a.currentPayment?.sessionId,result:s.txHash}}}),s}catch{throw new p(h.UNABLE_TO_GET_BUY_STATUS)}},async fetchTokensFromEOA({caipAddress:t,caipNetwork:e,namespace:s}){if(!t)return[];const{address:n}=_.parseCaipAddress(t);let i=e;return s===O.CHAIN.EVM&&(i=void 0),await Bt.getMyTokensWithBalance({address:n,caipNetwork:i})},async fetchTokensFromExchange(){if(!a.selectedExchange)return[];const t=await Ls(a.selectedExchange.id),e=Object.values(t.assets).flat();return await Promise.all(e.map(async n=>{const i=Fs(n),{chainNamespace:r}=_.parseCaipNetworkId(i.chainId);let o=i.address;if(H.isCaipAddress(o)){const{address:l}=_.parseCaipAddress(o);o=l}const c=await D.getImageByToken(o??"",r).catch(()=>{});return i.iconUrl=c??"",i}))},async fetchTokens({caipAddress:t,caipNetwork:e,namespace:s}){try{a.isFetchingTokenBalances=!0;const r=await(!!a.selectedExchange?this.fetchTokensFromExchange():this.fetchTokensFromEOA({caipAddress:t,caipNetwork:e,namespace:s}));a.tokenBalances={...a.tokenBalances,[s]:r}}catch(n){const i=n instanceof Error?n.message:"Unable to get token balances";z.showError(i)}finally{a.isFetchingTokenBalances=!1}},async fetchQuote({amount:t,address:e,sourceToken:s,toToken:n,recipient:i}){try{u.resetQuoteState(),a.isFetchingQuote=!0;const r=await Rs({amount:t,address:a.selectedExchange?void 0:e,sourceToken:s,toToken:n,recipient:i});if(a.selectedExchange){const o=Le(r);if(o){const c=`${s.network}:${o.deposit.receiver}`,l=N.formatNumber(o.deposit.amount,{decimals:s.metadata.decimals??0,round:8});await u.generateExchangeUrlForQuote({exchangeId:a.selectedExchange.id,paymentAsset:s,amount:l.toString(),recipient:c})}}a.quote=r}catch(r){let o=G.UNABLE_TO_GET_QUOTE;if(r instanceof Error&&r.cause&&r.cause instanceof Response)try{const c=await r.cause.json();c.error&&typeof c.error=="string"&&(o=c.error)}catch{}throw a.quoteError=o,z.showError(o),new p(h.UNABLE_TO_GET_QUOTE)}finally{a.isFetchingQuote=!1}},async fetchQuoteStatus({requestId:t}){try{if(t===De){const s=a.selectedExchange,n=a.exchangeSessionId;if(s&&n){switch((await this.getBuyStatus(s.id,n)).status){case"IN_PROGRESS":a.quoteStatus="waiting";break;case"SUCCESS":a.quoteStatus="success",a.isPaymentInProgress=!1;break;case"FAILED":a.quoteStatus="failure",a.isPaymentInProgress=!1;break;case"UNKNOWN":a.quoteStatus="waiting";break;default:a.quoteStatus="waiting";break}return}a.quoteStatus="success";return}const{status:e}=await Us({requestId:t});a.quoteStatus=e}catch{throw a.quoteStatus="failure",new p(h.UNABLE_TO_GET_QUOTE_STATUS)}},initiatePayment(){a.isPaymentInProgress=!0,a.paymentId=crypto.randomUUID()},initializeAnalytics(){a.analyticsSet||(a.analyticsSet=!0,this.subscribeKey("isPaymentInProgress",t=>{if(a.currentPayment?.status&&a.currentPayment.status!=="UNKNOWN"){const e={IN_PROGRESS:"PAY_INITIATED",SUCCESS:"PAY_SUCCESS",FAILED:"PAY_ERROR"}[a.currentPayment.status];oe.sendEvent({type:"track",event:e,properties:{message:a.currentPayment.status==="FAILED"?H.parseError(a.error):void 0,source:"pay",paymentId:a.paymentId||Oe,configuration:{network:a.paymentAsset.network,asset:a.paymentAsset.asset,recipient:a.recipient,amount:a.amount},currentPayment:{type:a.currentPayment.type,exchangeId:a.currentPayment.exchangeId,sessionId:a.currentPayment.sessionId,result:a.currentPayment.result}}})}}))},async prepareTokenLogo(){if(!a.paymentAsset.metadata.logoURI)try{const{chainNamespace:t}=_.parseCaipNetworkId(a.paymentAsset.network),e=await D.getImageByToken(a.paymentAsset.asset,t);a.paymentAsset.metadata.logoURI=e}catch{}}},Hs=V`
  wui-separator {
    margin: var(--apkt-spacing-3) calc(var(--apkt-spacing-3) * -1) var(--apkt-spacing-2)
      calc(var(--apkt-spacing-3) * -1);
    width: calc(100% + var(--apkt-spacing-3) * 2);
  }

  .token-display {
    padding: var(--apkt-spacing-3) var(--apkt-spacing-3);
    border-radius: var(--apkt-borderRadius-5);
    background-color: var(--apkt-tokens-theme-backgroundPrimary);
    margin-top: var(--apkt-spacing-3);
    margin-bottom: var(--apkt-spacing-3);
  }

  .token-display wui-text {
    text-transform: none;
  }

  wui-loading-spinner {
    padding: var(--apkt-spacing-2);
  }

  .left-image-container {
    position: relative;
    justify-content: center;
    align-items: center;
  }

  .token-image {
    border-radius: ${({borderRadius:t})=>t.round};
    width: 40px;
    height: 40px;
  }

  .chain-image {
    position: absolute;
    width: 20px;
    height: 20px;
    bottom: -3px;
    right: -5px;
    border-radius: ${({borderRadius:t})=>t.round};
    border: 2px solid ${({tokens:t})=>t.theme.backgroundPrimary};
  }

  .payment-methods-container {
    background-color: ${({tokens:t})=>t.theme.foregroundPrimary};
    border-top-right-radius: ${({borderRadius:t})=>t[8]};
    border-top-left-radius: ${({borderRadius:t})=>t[8]};
  }
`;var X=function(t,e,s,n){var i=arguments.length,r=i<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,s):n,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(t,e,s,n);else for(var c=t.length-1;c>=0;c--)(o=t[c])&&(r=(i<3?o(r):i>3?o(e,s,r):o(e,s))||r);return i>3&&r&&Object.defineProperty(e,s,r),r};let B=class extends T{constructor(){super(),this.unsubscribe=[],this.amount=u.state.amount,this.namespace=void 0,this.paymentAsset=u.state.paymentAsset,this.activeConnectorIds=U.state.activeConnectorIds,this.caipAddress=void 0,this.exchanges=u.state.exchanges,this.isLoading=u.state.isLoading,this.initializeNamespace(),this.unsubscribe.push(u.subscribeKey("amount",e=>this.amount=e)),this.unsubscribe.push(U.subscribeKey("activeConnectorIds",e=>this.activeConnectorIds=e)),this.unsubscribe.push(u.subscribeKey("exchanges",e=>this.exchanges=e)),this.unsubscribe.push(u.subscribeKey("isLoading",e=>this.isLoading=e)),u.fetchExchanges(),u.setSelectedExchange(void 0)}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return d`
      <wui-flex flexDirection="column">
        ${this.paymentDetailsTemplate()} ${this.paymentMethodsTemplate()}
      </wui-flex>
    `}paymentMethodsTemplate(){return d`
      <wui-flex flexDirection="column" padding="3" gap="2" class="payment-methods-container">
        ${this.payWithWalletTemplate()} ${this.templateSeparator()}
        ${this.templateExchangeOptions()}
      </wui-flex>
    `}initializeNamespace(){const e=w.state.activeChain;this.namespace=e,this.caipAddress=w.getAccountData(e)?.caipAddress,this.unsubscribe.push(w.subscribeChainProp("accountState",s=>{this.caipAddress=s?.caipAddress},e))}paymentDetailsTemplate(){const s=w.getAllRequestedCaipNetworks().find(n=>n.caipNetworkId===this.paymentAsset.network);return d`
      <wui-flex
        alignItems="center"
        justifyContent="space-between"
        .padding=${["6","8","6","8"]}
        gap="2"
      >
        <wui-flex alignItems="center" gap="1">
          <wui-text variant="h1-regular" color="primary">
            ${_e(this.amount||"0")}
          </wui-text>

          <wui-flex flexDirection="column">
            <wui-text variant="h6-regular" color="secondary">
              ${this.paymentAsset.metadata.symbol||"Unknown"}
            </wui-text>
            <wui-text variant="md-medium" color="secondary"
              >on ${s?.name||"Unknown"}</wui-text
            >
          </wui-flex>
        </wui-flex>

        <wui-flex class="left-image-container">
          <wui-image
            src=${x(this.paymentAsset.metadata.logoURI)}
            class="token-image"
          ></wui-image>
          <wui-image
            src=${x(D.getNetworkImage(s))}
            class="chain-image"
          ></wui-image>
        </wui-flex>
      </wui-flex>
    `}payWithWalletTemplate(){return Ms(this.paymentAsset.network)?this.caipAddress?this.connectedWalletTemplate():this.disconnectedWalletTemplate():d``}connectedWalletTemplate(){const{name:e,image:s}=this.getWalletProperties({namespace:this.namespace});return d`
      <wui-flex flexDirection="column" gap="3">
        <wui-list-item
          type="secondary"
          boxColor="foregroundSecondary"
          @click=${this.onWalletPayment}
          .boxed=${!1}
          ?chevron=${!0}
          ?fullSize=${!1}
          ?rounded=${!0}
          data-testid="wallet-payment-option"
          imageSrc=${x(s)}
          imageSize="3xl"
        >
          <wui-text variant="lg-regular" color="primary">Pay with ${e}</wui-text>
        </wui-list-item>

        <wui-list-item
          type="secondary"
          icon="power"
          iconColor="error"
          @click=${this.onDisconnect}
          data-testid="disconnect-button"
          ?chevron=${!1}
          boxColor="foregroundSecondary"
        >
          <wui-text variant="lg-regular" color="secondary">Disconnect</wui-text>
        </wui-list-item>
      </wui-flex>
    `}disconnectedWalletTemplate(){return d`<wui-list-item
      type="secondary"
      boxColor="foregroundSecondary"
      variant="icon"
      iconColor="default"
      iconVariant="overlay"
      icon="wallet"
      @click=${this.onWalletPayment}
      ?chevron=${!0}
      data-testid="wallet-payment-option"
    >
      <wui-text variant="lg-regular" color="primary">Pay with wallet</wui-text>
    </wui-list-item>`}templateExchangeOptions(){if(this.isLoading)return d`<wui-flex justifyContent="center" alignItems="center">
        <wui-loading-spinner size="md"></wui-loading-spinner>
      </wui-flex>`;const e=this.exchanges.filter(s=>js(this.paymentAsset)?s.id===pt:s.id!==pt);return e.length===0?d`<wui-flex justifyContent="center" alignItems="center">
        <wui-text variant="md-medium" color="primary">No exchanges available</wui-text>
      </wui-flex>`:e.map(s=>d`
        <wui-list-item
          type="secondary"
          boxColor="foregroundSecondary"
          @click=${()=>this.onExchangePayment(s)}
          data-testid="exchange-option-${s.id}"
          ?chevron=${!0}
          imageSrc=${x(s.imageUrl)}
        >
          <wui-text flexGrow="1" variant="lg-regular" color="primary">
            Pay with ${s.name}
          </wui-text>
        </wui-list-item>
      `)}templateSeparator(){return d`<wui-separator text="or" bgColor="secondary"></wui-separator>`}async onWalletPayment(){if(!this.namespace)throw new Error("Namespace not found");this.caipAddress?ce.push("PayQuote"):(await U.connect(),await ue.open({view:"PayQuote"}))}onExchangePayment(e){u.setSelectedExchange(e),ce.push("PayQuote")}async onDisconnect(){try{await q.disconnect(),await ue.open({view:"Pay"})}catch{console.error("Failed to disconnect"),z.showError("Failed to disconnect")}}getWalletProperties({namespace:e}){if(!e)return{name:void 0,image:void 0};const s=this.activeConnectorIds[e];if(!s)return{name:void 0,image:void 0};const n=U.getConnector({id:s,namespace:e});if(!n)return{name:void 0,image:void 0};const i=D.getConnectorImage(n);return{name:n.name,image:i}}};B.styles=Hs;X([m()],B.prototype,"amount",void 0);X([m()],B.prototype,"namespace",void 0);X([m()],B.prototype,"paymentAsset",void 0);X([m()],B.prototype,"activeConnectorIds",void 0);X([m()],B.prototype,"caipAddress",void 0);X([m()],B.prototype,"exchanges",void 0);X([m()],B.prototype,"isLoading",void 0);B=X([F("w3m-pay-view")],B);const Vs={ATTRIBUTE:1},Gs=t=>(...e)=>({_$litDirective$:t,values:e});class Qs{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,s,n){this._$Ct=e,this._$AM=s,this._$Ci=n}_$AS(e,s){return this.update(e,s)}update(e,s){return this.render(...s)}}const Tt=Gs(class extends Qs{constructor(t){if(super(t),t.type!==Vs.ATTRIBUTE||t.name!=="class"||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){if(this.st===void 0){this.st=new Set,t.strings!==void 0&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(n=>n!=="")));for(const n in e)e[n]&&!this.nt?.has(n)&&this.st.add(n);return this.render(e)}const s=t.element.classList;for(const n of this.st)n in e||(s.remove(n),this.st.delete(n));for(const n in e){const i=!!e[n];i===this.st.has(n)||this.nt?.has(n)||(i?(s.add(n),this.st.add(n)):(s.remove(n),this.st.delete(n)))}return te}}),Ys=V`
  :host {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .pulse-container {
    position: relative;
    width: var(--pulse-size);
    height: var(--pulse-size);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .pulse-rings {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .pulse-ring {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 2px solid var(--pulse-color);
    opacity: 0;
    animation: pulse var(--pulse-duration, 2s) ease-out infinite;
  }

  .pulse-content {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @keyframes pulse {
    0% {
      transform: scale(0.5);
      opacity: var(--pulse-opacity, 0.3);
    }
    50% {
      opacity: calc(var(--pulse-opacity, 0.3) * 0.5);
    }
    100% {
      transform: scale(1.2);
      opacity: 0;
    }
  }
`;var re=function(t,e,s,n){var i=arguments.length,r=i<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,s):n,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(t,e,s,n);else for(var c=t.length-1;c>=0;c--)(o=t[c])&&(r=(i<3?o(r):i>3?o(e,s,r):o(e,s))||r);return i>3&&r&&Object.defineProperty(e,s,r),r};const Ks=3,Xs=2,Js=.3,Zs="200px",en={"accent-primary":Ft.tokens.core.backgroundAccentPrimary};let Y=class extends xt{constructor(){super(...arguments),this.rings=Ks,this.duration=Xs,this.opacity=Js,this.size=Zs,this.variant="accent-primary"}render(){const e=en[this.variant];this.style.cssText=`
      --pulse-size: ${this.size};
      --pulse-duration: ${this.duration}s;
      --pulse-color: ${e};
      --pulse-opacity: ${this.opacity};
    `;const s=Array.from({length:this.rings},(n,i)=>this.renderRing(i,this.rings));return Re`
      <div class="pulse-container">
        <div class="pulse-rings">${s}</div>
        <div class="pulse-content">
          <slot></slot>
        </div>
      </div>
    `}renderRing(e,s){const i=`animation-delay: ${e/s*this.duration}s;`;return Re`<div class="pulse-ring" style=${i}></div>`}};Y.styles=[At,Ys];re([k({type:Number})],Y.prototype,"rings",void 0);re([k({type:Number})],Y.prototype,"duration",void 0);re([k({type:Number})],Y.prototype,"opacity",void 0);re([k()],Y.prototype,"size",void 0);re([k()],Y.prototype,"variant",void 0);Y=re([F("wui-pulse")],Y);const wt=[{id:"received",title:"Receiving funds",icon:"dollar"},{id:"processing",title:"Swapping asset",icon:"recycleHorizontal"},{id:"sending",title:"Sending asset to the recipient address",icon:"send"}],bt=["success","submitted","failure","timeout","refund"],tn=V`
  :host {
    display: block;
    height: 100%;
    width: 100%;
  }

  wui-image {
    border-radius: ${({borderRadius:t})=>t.round};
  }

  .token-badge-container {
    position: absolute;
    bottom: 6px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: ${({borderRadius:t})=>t[4]};
    z-index: 3;
    min-width: 105px;
  }

  .token-badge-container.loading {
    background-color: ${({tokens:t})=>t.theme.backgroundPrimary};
    border: 3px solid ${({tokens:t})=>t.theme.backgroundPrimary};
  }

  .token-badge-container.success {
    background-color: ${({tokens:t})=>t.theme.backgroundPrimary};
    border: 3px solid ${({tokens:t})=>t.theme.backgroundPrimary};
  }

  .token-image-container {
    position: relative;
  }

  .token-image {
    border-radius: ${({borderRadius:t})=>t.round};
    width: 64px;
    height: 64px;
  }

  .token-image.success {
    background-color: ${({tokens:t})=>t.theme.foregroundPrimary};
  }

  .token-image.error {
    background-color: ${({tokens:t})=>t.theme.foregroundPrimary};
  }

  .token-image.loading {
    background: ${({colors:t})=>t.accent010};
  }

  .token-image wui-icon {
    width: 32px;
    height: 32px;
  }

  .token-badge {
    background-color: ${({tokens:t})=>t.theme.foregroundPrimary};
    border: 1px solid ${({tokens:t})=>t.theme.foregroundSecondary};
    border-radius: ${({borderRadius:t})=>t[4]};
  }

  .token-badge wui-text {
    white-space: nowrap;
  }

  .payment-lifecycle-container {
    background-color: ${({tokens:t})=>t.theme.foregroundPrimary};
    border-top-right-radius: ${({borderRadius:t})=>t[6]};
    border-top-left-radius: ${({borderRadius:t})=>t[6]};
  }

  .payment-step-badge {
    padding: ${({spacing:t})=>t[1]} ${({spacing:t})=>t[2]};
    border-radius: ${({borderRadius:t})=>t[1]};
  }

  .payment-step-badge.loading {
    background-color: ${({tokens:t})=>t.theme.foregroundSecondary};
  }

  .payment-step-badge.error {
    background-color: ${({tokens:t})=>t.core.backgroundError};
  }

  .payment-step-badge.success {
    background-color: ${({tokens:t})=>t.core.backgroundSuccess};
  }

  .step-icon-container {
    position: relative;
    height: 40px;
    width: 40px;
    border-radius: ${({borderRadius:t})=>t.round};
    background-color: ${({tokens:t})=>t.theme.foregroundSecondary};
  }

  .step-icon-box {
    position: absolute;
    right: -4px;
    bottom: -1px;
    padding: 2px;
    border-radius: ${({borderRadius:t})=>t.round};
    border: 2px solid ${({tokens:t})=>t.theme.backgroundPrimary};
    background-color: ${({tokens:t})=>t.theme.foregroundPrimary};
  }

  .step-icon-box.success {
    background-color: ${({tokens:t})=>t.core.backgroundSuccess};
  }
`;var j=function(t,e,s,n){var i=arguments.length,r=i<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,s):n,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(t,e,s,n);else for(var c=t.length-1;c>=0;c--)(o=t[c])&&(r=(i<3?o(r):i>3?o(e,s,r):o(e,s))||r);return i>3&&r&&Object.defineProperty(e,s,r),r};const sn={received:["pending","success","submitted"],processing:["success","submitted"],sending:["success","submitted"]},nn=3e3;let C=class extends T{constructor(){super(),this.unsubscribe=[],this.pollingInterval=null,this.paymentAsset=u.state.paymentAsset,this.quoteStatus=u.state.quoteStatus,this.quote=u.state.quote,this.amount=u.state.amount,this.namespace=void 0,this.caipAddress=void 0,this.profileName=null,this.activeConnectorIds=U.state.activeConnectorIds,this.selectedExchange=u.state.selectedExchange,this.initializeNamespace(),this.unsubscribe.push(u.subscribeKey("quoteStatus",e=>this.quoteStatus=e),u.subscribeKey("quote",e=>this.quote=e),U.subscribeKey("activeConnectorIds",e=>this.activeConnectorIds=e),u.subscribeKey("selectedExchange",e=>this.selectedExchange=e))}connectedCallback(){super.connectedCallback(),this.startPolling()}disconnectedCallback(){super.disconnectedCallback(),this.stopPolling(),this.unsubscribe.forEach(e=>e())}render(){return d`
      <wui-flex flexDirection="column" .padding=${["3","0","0","0"]} gap="2">
        ${this.tokenTemplate()} ${this.paymentTemplate()} ${this.paymentLifecycleTemplate()}
      </wui-flex>
    `}tokenTemplate(){const e=_e(this.amount||"0"),s=this.paymentAsset.metadata.symbol??"Unknown",i=w.getAllRequestedCaipNetworks().find(c=>c.caipNetworkId===this.paymentAsset.network),r=this.quoteStatus==="failure"||this.quoteStatus==="timeout"||this.quoteStatus==="refund";return this.quoteStatus==="success"||this.quoteStatus==="submitted"?d`<wui-flex alignItems="center" justifyContent="center">
        <wui-flex justifyContent="center" alignItems="center" class="token-image success">
          <wui-icon name="checkmark" color="success" size="inherit"></wui-icon>
        </wui-flex>
      </wui-flex>`:r?d`<wui-flex alignItems="center" justifyContent="center">
        <wui-flex justifyContent="center" alignItems="center" class="token-image error">
          <wui-icon name="close" color="error" size="inherit"></wui-icon>
        </wui-flex>
      </wui-flex>`:d`
      <wui-flex alignItems="center" justifyContent="center">
        <wui-flex class="token-image-container">
          <wui-pulse size="125px" rings="3" duration="4" opacity="0.5" variant="accent-primary">
            <wui-flex justifyContent="center" alignItems="center" class="token-image loading">
              <wui-icon name="paperPlaneTitle" color="accent-primary" size="inherit"></wui-icon>
            </wui-flex>
          </wui-pulse>

          <wui-flex
            justifyContent="center"
            alignItems="center"
            class="token-badge-container loading"
          >
            <wui-flex
              alignItems="center"
              justifyContent="center"
              gap="01"
              padding="1"
              class="token-badge"
            >
              <wui-image
                src=${x(D.getNetworkImage(i))}
                class="chain-image"
                size="mdl"
              ></wui-image>

              <wui-text variant="lg-regular" color="primary">${e} ${s}</wui-text>
            </wui-flex>
          </wui-flex>
        </wui-flex>
      </wui-flex>
    `}paymentTemplate(){return d`
      <wui-flex flexDirection="column" gap="2" .padding=${["0","6","0","6"]}>
        ${this.renderPayment()}
        <wui-separator></wui-separator>
        ${this.renderWallet()}
      </wui-flex>
    `}paymentLifecycleTemplate(){const e=this.getStepsWithStatus();return d`
      <wui-flex flexDirection="column" padding="4" gap="2" class="payment-lifecycle-container">
        <wui-flex alignItems="center" justifyContent="space-between">
          <wui-text variant="md-regular" color="secondary">PAYMENT CYCLE</wui-text>

          ${this.renderPaymentCycleBadge()}
        </wui-flex>

        <wui-flex flexDirection="column" gap="5" .padding=${["2","0","2","0"]}>
          ${e.map(s=>this.renderStep(s))}
        </wui-flex>
      </wui-flex>
    `}renderPaymentCycleBadge(){const e=this.quoteStatus==="failure"||this.quoteStatus==="timeout"||this.quoteStatus==="refund",s=this.quoteStatus==="success"||this.quoteStatus==="submitted";if(e)return d`
        <wui-flex
          justifyContent="center"
          alignItems="center"
          class="payment-step-badge error"
          gap="1"
        >
          <wui-icon name="close" color="error" size="xs"></wui-icon>
          <wui-text variant="sm-regular" color="error">Failed</wui-text>
        </wui-flex>
      `;if(s)return d`
        <wui-flex
          justifyContent="center"
          alignItems="center"
          class="payment-step-badge success"
          gap="1"
        >
          <wui-icon name="checkmark" color="success" size="xs"></wui-icon>
          <wui-text variant="sm-regular" color="success">Completed</wui-text>
        </wui-flex>
      `;const n=this.quote?.timeInSeconds??0;return d`
      <wui-flex alignItems="center" justifyContent="space-between" gap="3">
        <wui-flex
          justifyContent="center"
          alignItems="center"
          class="payment-step-badge loading"
          gap="1"
        >
          <wui-icon name="clock" color="default" size="xs"></wui-icon>
          <wui-text variant="sm-regular" color="primary">Est. ${n} sec</wui-text>
        </wui-flex>

        <wui-icon name="chevronBottom" color="default" size="xxs"></wui-icon>
      </wui-flex>
    `}renderPayment(){const s=w.getAllRequestedCaipNetworks().find(o=>{const c=this.quote?.origin.currency.network;if(!c)return!1;const{chainId:l}=_.parseCaipNetworkId(c);return R.isLowerCaseMatch(o.id.toString(),l.toString())}),n=N.formatNumber(this.quote?.origin.amount||"0",{decimals:this.quote?.origin.currency.metadata.decimals??0}).toString(),i=_e(n),r=this.quote?.origin.currency.metadata.symbol??"Unknown";return d`
      <wui-flex
        alignItems="flex-start"
        justifyContent="space-between"
        .padding=${["3","0","3","0"]}
      >
        <wui-text variant="lg-regular" color="secondary">Payment Method</wui-text>

        <wui-flex flexDirection="column" alignItems="flex-end" gap="1">
          <wui-flex alignItems="center" gap="01">
            <wui-text variant="lg-regular" color="primary">${i}</wui-text>
            <wui-text variant="lg-regular" color="secondary">${r}</wui-text>
          </wui-flex>

          <wui-flex alignItems="center" gap="1">
            <wui-text variant="md-regular" color="secondary">on</wui-text>
            <wui-image
              src=${x(D.getNetworkImage(s))}
              size="xs"
            ></wui-image>
            <wui-text variant="md-regular" color="secondary">${s?.name}</wui-text>
          </wui-flex>
        </wui-flex>
      </wui-flex>
    `}renderWallet(){return d`
      <wui-flex
        alignItems="flex-start"
        justifyContent="space-between"
        .padding=${["3","0","3","0"]}
      >
        <wui-text variant="lg-regular" color="secondary"
          >${this.selectedExchange?"Exchange":"Wallet"}</wui-text
        >

        ${this.renderWalletText()}
      </wui-flex>
    `}renderWalletText(){const{image:e}=this.getWalletProperties({namespace:this.namespace}),{address:s}=this.caipAddress?_.parseCaipAddress(this.caipAddress):{},n=this.selectedExchange?.name;return this.selectedExchange?d`
        <wui-flex alignItems="center" justifyContent="flex-end" gap="1">
          <wui-text variant="lg-regular" color="primary">${n}</wui-text>
          <wui-image src=${x(this.selectedExchange.imageUrl)} size="mdl"></wui-image>
        </wui-flex>
      `:d`
      <wui-flex alignItems="center" justifyContent="flex-end" gap="1">
        <wui-text variant="lg-regular" color="primary">
          ${jt.getTruncateString({string:this.profileName||s||n||"",charsStart:this.profileName?16:4,charsEnd:this.profileName?0:6,truncate:this.profileName?"end":"middle"})}
        </wui-text>

        <wui-image src=${x(e)} size="mdl"></wui-image>
      </wui-flex>
    `}getStepsWithStatus(){return this.quoteStatus==="failure"||this.quoteStatus==="timeout"||this.quoteStatus==="refund"?wt.map(s=>({...s,status:"failed"})):wt.map(s=>{const i=(sn[s.id]??[]).includes(this.quoteStatus)?"completed":"pending";return{...s,status:i}})}renderStep({title:e,icon:s,status:n}){return d`
      <wui-flex alignItems="center" gap="3">
        <wui-flex justifyContent="center" alignItems="center" class="step-icon-container">
          <wui-icon name=${s} color="default" size="mdl"></wui-icon>

          <wui-flex alignItems="center" justifyContent="center" class=${Tt({"step-icon-box":!0,success:n==="completed"})}>
            ${this.renderStatusIndicator(n)}
          </wui-flex>
        </wui-flex>

        <wui-text variant="md-regular" color="primary">${e}</wui-text>
      </wui-flex>
    `}renderStatusIndicator(e){return e==="completed"?d`<wui-icon size="sm" color="success" name="checkmark"></wui-icon>`:e==="failed"?d`<wui-icon size="sm" color="error" name="close"></wui-icon>`:e==="pending"?d`<wui-loading-spinner color="accent-primary" size="sm"></wui-loading-spinner>`:null}startPolling(){this.pollingInterval||(this.fetchQuoteStatus(),this.pollingInterval=setInterval(()=>{this.fetchQuoteStatus()},nn))}stopPolling(){this.pollingInterval&&(clearInterval(this.pollingInterval),this.pollingInterval=null)}async fetchQuoteStatus(){const e=u.state.requestId;if(!e||bt.includes(this.quoteStatus))this.stopPolling();else try{await u.fetchQuoteStatus({requestId:e}),bt.includes(this.quoteStatus)&&this.stopPolling()}catch{this.stopPolling()}}initializeNamespace(){const e=w.state.activeChain;this.namespace=e,this.caipAddress=w.getAccountData(e)?.caipAddress,this.profileName=w.getAccountData(e)?.profileName??null,this.unsubscribe.push(w.subscribeChainProp("accountState",s=>{this.caipAddress=s?.caipAddress,this.profileName=s?.profileName??null},e))}getWalletProperties({namespace:e}){if(!e)return{name:void 0,image:void 0};const s=this.activeConnectorIds[e];if(!s)return{name:void 0,image:void 0};const n=U.getConnector({id:s,namespace:e});if(!n)return{name:void 0,image:void 0};const i=D.getConnectorImage(n);return{name:n.name,image:i}}};C.styles=tn;j([m()],C.prototype,"paymentAsset",void 0);j([m()],C.prototype,"quoteStatus",void 0);j([m()],C.prototype,"quote",void 0);j([m()],C.prototype,"amount",void 0);j([m()],C.prototype,"namespace",void 0);j([m()],C.prototype,"caipAddress",void 0);j([m()],C.prototype,"profileName",void 0);j([m()],C.prototype,"activeConnectorIds",void 0);j([m()],C.prototype,"selectedExchange",void 0);C=j([F("w3m-pay-loading-view")],C);const rn=zt`
  :host {
    display: block;
  }
`;var on=function(t,e,s,n){var i=arguments.length,r=i<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,s):n,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(t,e,s,n);else for(var c=t.length-1;c>=0;c--)(o=t[c])&&(r=(i<3?o(r):i>3?o(e,s,r):o(e,s))||r);return i>3&&r&&Object.defineProperty(e,s,r),r};let qe=class extends T{render(){return d`
      <wui-flex flexDirection="column" gap="4">
        <wui-flex alignItems="center" justifyContent="space-between">
          <wui-text variant="md-regular" color="secondary">Pay</wui-text>
          <wui-shimmer width="60px" height="16px" borderRadius="4xs" variant="light"></wui-shimmer>
        </wui-flex>

        <wui-flex alignItems="center" justifyContent="space-between">
          <wui-text variant="md-regular" color="secondary">Network Fee</wui-text>

          <wui-flex flexDirection="column" alignItems="flex-end" gap="2">
            <wui-shimmer
              width="75px"
              height="16px"
              borderRadius="4xs"
              variant="light"
            ></wui-shimmer>

            <wui-flex alignItems="center" gap="01">
              <wui-shimmer width="14px" height="14px" rounded variant="light"></wui-shimmer>
              <wui-shimmer
                width="49px"
                height="14px"
                borderRadius="4xs"
                variant="light"
              ></wui-shimmer>
            </wui-flex>
          </wui-flex>
        </wui-flex>

        <wui-flex alignItems="center" justifyContent="space-between">
          <wui-text variant="md-regular" color="secondary">Service Fee</wui-text>
          <wui-shimmer width="75px" height="16px" borderRadius="4xs" variant="light"></wui-shimmer>
        </wui-flex>
      </wui-flex>
    `}};qe.styles=[rn];qe=on([F("w3m-pay-fees-skeleton")],qe);const an=V`
  :host {
    display: block;
  }

  wui-image {
    border-radius: ${({borderRadius:t})=>t.round};
  }
`;var Ct=function(t,e,s,n){var i=arguments.length,r=i<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,s):n,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(t,e,s,n);else for(var c=t.length-1;c>=0;c--)(o=t[c])&&(r=(i<3?o(r):i>3?o(e,s,r):o(e,s))||r);return i>3&&r&&Object.defineProperty(e,s,r),r};let $e=class extends T{constructor(){super(),this.unsubscribe=[],this.quote=u.state.quote,this.unsubscribe.push(u.subscribeKey("quote",e=>this.quote=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const e=N.formatNumber(this.quote?.origin.amount||"0",{decimals:this.quote?.origin.currency.metadata.decimals??0,round:6}).toString();return d`
      <wui-flex flexDirection="column" gap="4">
        <wui-flex alignItems="center" justifyContent="space-between">
          <wui-text variant="md-regular" color="secondary">Pay</wui-text>
          <wui-text variant="md-regular" color="primary">
            ${e} ${this.quote?.origin.currency.metadata.symbol||"Unknown"}
          </wui-text>
        </wui-flex>

        ${this.quote&&this.quote.fees.length>0?this.quote.fees.map(s=>this.renderFee(s)):null}
      </wui-flex>
    `}renderFee(e){const s=e.id==="network",n=N.formatNumber(e.amount||"0",{decimals:e.currency.metadata.decimals??0,round:6}).toString();if(s){const r=w.getAllRequestedCaipNetworks().find(o=>R.isLowerCaseMatch(o.caipNetworkId,e.currency.network));return d`
        <wui-flex alignItems="center" justifyContent="space-between">
          <wui-text variant="md-regular" color="secondary">${e.label}</wui-text>

          <wui-flex flexDirection="column" alignItems="flex-end" gap="2">
            <wui-text variant="md-regular" color="primary">
              ${n} ${e.currency.metadata.symbol||"Unknown"}
            </wui-text>

            <wui-flex alignItems="center" gap="01">
              <wui-image
                src=${x(D.getNetworkImage(r))}
                size="xs"
              ></wui-image>
              <wui-text variant="sm-regular" color="secondary">
                ${r?.name||"Unknown"}
              </wui-text>
            </wui-flex>
          </wui-flex>
        </wui-flex>
      `}return d`
      <wui-flex alignItems="center" justifyContent="space-between">
        <wui-text variant="md-regular" color="secondary">${e.label}</wui-text>
        <wui-text variant="md-regular" color="primary">
          ${n} ${e.currency.metadata.symbol||"Unknown"}
        </wui-text>
      </wui-flex>
    `}};$e.styles=[an];Ct([m()],$e.prototype,"quote",void 0);$e=Ct([F("w3m-pay-fees")],$e);const cn=V`
  :host {
    display: block;
    width: 100%;
  }

  .disabled-container {
    padding: ${({spacing:t})=>t[2]};
    min-height: 168px;
  }

  wui-icon {
    width: ${({spacing:t})=>t[8]};
    height: ${({spacing:t})=>t[8]};
  }

  wui-flex > wui-text {
    max-width: 273px;
  }
`;var kt=function(t,e,s,n){var i=arguments.length,r=i<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,s):n,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(t,e,s,n);else for(var c=t.length-1;c>=0;c--)(o=t[c])&&(r=(i<3?o(r):i>3?o(e,s,r):o(e,s))||r);return i>3&&r&&Object.defineProperty(e,s,r),r};let ve=class extends T{constructor(){super(),this.unsubscribe=[],this.selectedExchange=u.state.selectedExchange,this.unsubscribe.push(u.subscribeKey("selectedExchange",e=>this.selectedExchange=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const e=!!this.selectedExchange;return d`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap="3"
        class="disabled-container"
      >
        <wui-icon name="coins" color="default" size="inherit"></wui-icon>

        <wui-text variant="md-regular" color="primary" align="center">
          You don't have enough funds to complete this transaction
        </wui-text>

        ${e?null:d`<wui-button
              size="md"
              variant="neutral-secondary"
              @click=${this.dispatchConnectOtherWalletEvent.bind(this)}
              >Connect other wallet</wui-button
            >`}
      </wui-flex>
    `}dispatchConnectOtherWalletEvent(){this.dispatchEvent(new CustomEvent("connectOtherWallet",{detail:!0,bubbles:!0,composed:!0}))}};ve.styles=[cn];kt([fe({type:Array})],ve.prototype,"selectedExchange",void 0);ve=kt([F("w3m-pay-options-empty")],ve);const ln=V`
  :host {
    display: block;
    width: 100%;
  }

  .pay-options-container {
    max-height: 196px;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
  }

  .pay-options-container::-webkit-scrollbar {
    display: none;
  }

  .pay-option-container {
    border-radius: ${({borderRadius:t})=>t[4]};
    padding: ${({spacing:t})=>t[3]};
    min-height: 60px;
  }

  .token-images-container {
    position: relative;
    justify-content: center;
    align-items: center;
  }

  .chain-image {
    position: absolute;
    bottom: -3px;
    right: -5px;
    border: 2px solid ${({tokens:t})=>t.theme.foregroundSecondary};
  }
`;var un=function(t,e,s,n){var i=arguments.length,r=i<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,s):n,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(t,e,s,n);else for(var c=t.length-1;c>=0;c--)(o=t[c])&&(r=(i<3?o(r):i>3?o(e,s,r):o(e,s))||r);return i>3&&r&&Object.defineProperty(e,s,r),r};let Me=class extends T{render(){return d`
      <wui-flex flexDirection="column" gap="2" class="pay-options-container">
        ${this.renderOptionEntry()} ${this.renderOptionEntry()} ${this.renderOptionEntry()}
      </wui-flex>
    `}renderOptionEntry(){return d`
      <wui-flex
        alignItems="center"
        justifyContent="space-between"
        gap="2"
        class="pay-option-container"
      >
        <wui-flex alignItems="center" gap="2">
          <wui-flex class="token-images-container">
            <wui-shimmer
              width="32px"
              height="32px"
              rounded
              variant="light"
              class="token-image"
            ></wui-shimmer>
            <wui-shimmer
              width="16px"
              height="16px"
              rounded
              variant="light"
              class="chain-image"
            ></wui-shimmer>
          </wui-flex>

          <wui-flex flexDirection="column" gap="1">
            <wui-shimmer
              width="74px"
              height="16px"
              borderRadius="4xs"
              variant="light"
            ></wui-shimmer>
            <wui-shimmer
              width="46px"
              height="14px"
              borderRadius="4xs"
              variant="light"
            ></wui-shimmer>
          </wui-flex>
        </wui-flex>
      </wui-flex>
    `}};Me.styles=[ln];Me=un([F("w3m-pay-options-skeleton")],Me);const dn=V`
  :host {
    display: block;
    width: 100%;
  }

  .pay-options-container {
    max-height: 196px;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
    mask-image: var(--options-mask-image);
    -webkit-mask-image: var(--options-mask-image);
  }

  .pay-options-container::-webkit-scrollbar {
    display: none;
  }

  .pay-option-container {
    cursor: pointer;
    border-radius: ${({borderRadius:t})=>t[4]};
    padding: ${({spacing:t})=>t[3]};
    transition: background-color ${({durations:t})=>t.lg}
      ${({easings:t})=>t["ease-out-power-1"]};
    will-change: background-color;
  }

  .token-images-container {
    position: relative;
    justify-content: center;
    align-items: center;
  }

  .token-image {
    border-radius: ${({borderRadius:t})=>t.round};
    width: 32px;
    height: 32px;
  }

  .chain-image {
    position: absolute;
    width: 16px;
    height: 16px;
    bottom: -3px;
    right: -5px;
    border-radius: ${({borderRadius:t})=>t.round};
    border: 2px solid ${({tokens:t})=>t.theme.backgroundPrimary};
  }

  @media (hover: hover) and (pointer: fine) {
    .pay-option-container:hover {
      background-color: ${({tokens:t})=>t.theme.foregroundPrimary};
    }
  }
`;var Ne=function(t,e,s,n){var i=arguments.length,r=i<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,s):n,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(t,e,s,n);else for(var c=t.length-1;c>=0;c--)(o=t[c])&&(r=(i<3?o(r):i>3?o(e,s,r):o(e,s))||r);return i>3&&r&&Object.defineProperty(e,s,r),r};const hn=300;let ie=class extends T{constructor(){super(),this.unsubscribe=[],this.options=[],this.selectedPaymentAsset=null}disconnectedCallback(){this.unsubscribe.forEach(s=>s()),this.resizeObserver?.disconnect(),this.shadowRoot?.querySelector(".pay-options-container")?.removeEventListener("scroll",this.handleOptionsListScroll.bind(this))}firstUpdated(){const e=this.shadowRoot?.querySelector(".pay-options-container");e&&(requestAnimationFrame(this.handleOptionsListScroll.bind(this)),e?.addEventListener("scroll",this.handleOptionsListScroll.bind(this)),this.resizeObserver=new ResizeObserver(()=>{this.handleOptionsListScroll()}),this.resizeObserver?.observe(e),this.handleOptionsListScroll())}render(){return d`
      <wui-flex flexDirection="column" gap="2" class="pay-options-container">
        ${this.options.map(e=>this.payOptionTemplate(e))}
      </wui-flex>
    `}payOptionTemplate(e){const{network:s,metadata:n,asset:i,amount:r="0"}=e,c=w.getAllRequestedCaipNetworks().find(P=>P.caipNetworkId===s),l=`${s}:${i}`,f=`${this.selectedPaymentAsset?.network}:${this.selectedPaymentAsset?.asset}`,y=l===f,g=N.bigNumber(r,{safe:!0}),I=g.gt(0);return d`
      <wui-flex
        alignItems="center"
        justifyContent="space-between"
        gap="2"
        @click=${()=>this.onSelect?.(e)}
        class="pay-option-container"
      >
        <wui-flex alignItems="center" gap="2">
          <wui-flex class="token-images-container">
            <wui-image
              src=${x(n.logoURI)}
              class="token-image"
              size="3xl"
            ></wui-image>
            <wui-image
              src=${x(D.getNetworkImage(c))}
              class="chain-image"
              size="md"
            ></wui-image>
          </wui-flex>

          <wui-flex flexDirection="column" gap="1">
            <wui-text variant="lg-regular" color="primary">${n.symbol}</wui-text>
            ${I?d`<wui-text variant="sm-regular" color="secondary">
                  ${g.round(6).toString()} ${n.symbol}
                </wui-text>`:null}
          </wui-flex>
        </wui-flex>

        ${y?d`<wui-icon name="checkmark" size="md" color="success"></wui-icon>`:null}
      </wui-flex>
    `}handleOptionsListScroll(){const e=this.shadowRoot?.querySelector(".pay-options-container");if(!e)return;e.scrollHeight>hn?(e.style.setProperty("--options-mask-image",`linear-gradient(
          to bottom,
          rgba(0, 0, 0, calc(1 - var(--options-scroll--top-opacity))) 0px,
          rgba(200, 200, 200, calc(1 - var(--options-scroll--top-opacity))) 1px,
          black 50px,
          black calc(100% - 50px),
          rgba(155, 155, 155, calc(1 - var(--options-scroll--bottom-opacity))) calc(100% - 1px),
          rgba(0, 0, 0, calc(1 - var(--options-scroll--bottom-opacity))) 100%
        )`),e.style.setProperty("--options-scroll--top-opacity",Je.interpolate([0,50],[0,1],e.scrollTop).toString()),e.style.setProperty("--options-scroll--bottom-opacity",Je.interpolate([0,50],[0,1],e.scrollHeight-e.scrollTop-e.offsetHeight).toString())):(e.style.setProperty("--options-mask-image","none"),e.style.setProperty("--options-scroll--top-opacity","0"),e.style.setProperty("--options-scroll--bottom-opacity","0"))}};ie.styles=[dn];Ne([fe({type:Array})],ie.prototype,"options",void 0);Ne([fe()],ie.prototype,"selectedPaymentAsset",void 0);Ne([fe()],ie.prototype,"onSelect",void 0);ie=Ne([F("w3m-pay-options")],ie);const pn=V`
  .payment-methods-container {
    background-color: ${({tokens:t})=>t.theme.foregroundPrimary};
    border-top-right-radius: ${({borderRadius:t})=>t[5]};
    border-top-left-radius: ${({borderRadius:t})=>t[5]};
  }

  .pay-options-container {
    background-color: ${({tokens:t})=>t.theme.foregroundSecondary};
    border-radius: ${({borderRadius:t})=>t[5]};
    padding: ${({spacing:t})=>t[1]};
  }

  w3m-tooltip-trigger {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: fit-content;
  }

  wui-image {
    border-radius: ${({borderRadius:t})=>t.round};
  }

  w3m-pay-options.disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;var v=function(t,e,s,n){var i=arguments.length,r=i<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,s):n,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(t,e,s,n);else for(var c=t.length-1;c>=0;c--)(o=t[c])&&(r=(i<3?o(r):i>3?o(e,s,r):o(e,s))||r);return i>3&&r&&Object.defineProperty(e,s,r),r};const ye={eip155:"ethereum",solana:"solana",bip122:"bitcoin",ton:"ton"},mn={eip155:{icon:ye.eip155,label:"EVM"},solana:{icon:ye.solana,label:"Solana"},bip122:{icon:ye.bip122,label:"Bitcoin"},ton:{icon:ye.ton,label:"Ton"}};let E=class extends T{constructor(){super(),this.unsubscribe=[],this.profileName=null,this.paymentAsset=u.state.paymentAsset,this.namespace=void 0,this.caipAddress=void 0,this.amount=u.state.amount,this.recipient=u.state.recipient,this.activeConnectorIds=U.state.activeConnectorIds,this.selectedPaymentAsset=u.state.selectedPaymentAsset,this.selectedExchange=u.state.selectedExchange,this.isFetchingQuote=u.state.isFetchingQuote,this.quoteError=u.state.quoteError,this.quote=u.state.quote,this.isFetchingTokenBalances=u.state.isFetchingTokenBalances,this.tokenBalances=u.state.tokenBalances,this.isPaymentInProgress=u.state.isPaymentInProgress,this.exchangeUrlForQuote=u.state.exchangeUrlForQuote,this.completedTransactionsCount=0,this.unsubscribe.push(u.subscribeKey("paymentAsset",e=>this.paymentAsset=e)),this.unsubscribe.push(u.subscribeKey("tokenBalances",e=>this.onTokenBalancesChanged(e))),this.unsubscribe.push(u.subscribeKey("isFetchingTokenBalances",e=>this.isFetchingTokenBalances=e)),this.unsubscribe.push(U.subscribeKey("activeConnectorIds",e=>this.activeConnectorIds=e)),this.unsubscribe.push(u.subscribeKey("selectedPaymentAsset",e=>this.selectedPaymentAsset=e)),this.unsubscribe.push(u.subscribeKey("isFetchingQuote",e=>this.isFetchingQuote=e)),this.unsubscribe.push(u.subscribeKey("quoteError",e=>this.quoteError=e)),this.unsubscribe.push(u.subscribeKey("quote",e=>this.quote=e)),this.unsubscribe.push(u.subscribeKey("amount",e=>this.amount=e)),this.unsubscribe.push(u.subscribeKey("recipient",e=>this.recipient=e)),this.unsubscribe.push(u.subscribeKey("isPaymentInProgress",e=>this.isPaymentInProgress=e)),this.unsubscribe.push(u.subscribeKey("selectedExchange",e=>this.selectedExchange=e)),this.unsubscribe.push(u.subscribeKey("exchangeUrlForQuote",e=>this.exchangeUrlForQuote=e)),this.resetQuoteState(),this.initializeNamespace(),this.fetchTokens()}disconnectedCallback(){super.disconnectedCallback(),this.resetAssetsState(),this.unsubscribe.forEach(e=>e())}updated(e){super.updated(e),e.has("selectedPaymentAsset")&&this.fetchQuote()}render(){return d`
      <wui-flex flexDirection="column">
        ${this.profileTemplate()}

        <wui-flex
          flexDirection="column"
          gap="4"
          class="payment-methods-container"
          .padding=${["4","4","5","4"]}
        >
          ${this.paymentOptionsViewTemplate()} ${this.amountWithFeeTemplate()}

          <wui-flex
            alignItems="center"
            justifyContent="space-between"
            .padding=${["1","0","1","0"]}
          >
            <wui-separator></wui-separator>
          </wui-flex>

          ${this.paymentActionsTemplate()}
        </wui-flex>
      </wui-flex>
    `}profileTemplate(){if(this.selectedExchange){const o=N.formatNumber(this.quote?.origin.amount,{decimals:this.quote?.origin.currency.metadata.decimals??0}).toString();return d`
        <wui-flex
          .padding=${["4","3","4","3"]}
          alignItems="center"
          justifyContent="space-between"
          gap="2"
        >
          <wui-text variant="lg-regular" color="secondary">Paying with</wui-text>

          ${this.quote?d`<wui-text variant="lg-regular" color="primary">
                ${N.bigNumber(o,{safe:!0}).round(6).toString()}
                ${this.quote.origin.currency.metadata.symbol}
              </wui-text>`:d`<wui-shimmer width="80px" height="18px" variant="light"></wui-shimmer>`}
        </wui-flex>
      `}const e=H.getPlainAddress(this.caipAddress)??"",{name:s,image:n}=this.getWalletProperties({namespace:this.namespace}),{icon:i,label:r}=mn[this.namespace]??{};return d`
      <wui-flex
        .padding=${["4","3","4","3"]}
        alignItems="center"
        justifyContent="space-between"
        gap="2"
      >
        <wui-wallet-switch
          profileName=${x(this.profileName)}
          address=${x(e)}
          imageSrc=${x(n)}
          alt=${x(s)}
          @click=${this.onConnectOtherWallet.bind(this)}
          data-testid="wui-wallet-switch"
        ></wui-wallet-switch>

        <wui-wallet-switch
          profileName=${x(r)}
          address=${x(e)}
          icon=${x(i)}
          iconSize="xs"
          .enableGreenCircle=${!1}
          alt=${x(r)}
          @click=${this.onConnectOtherWallet.bind(this)}
          data-testid="wui-wallet-switch"
        ></wui-wallet-switch>
      </wui-flex>
    `}initializeNamespace(){const e=w.state.activeChain;this.namespace=e,this.caipAddress=w.getAccountData(e)?.caipAddress,this.profileName=w.getAccountData(e)?.profileName??null,this.unsubscribe.push(w.subscribeChainProp("accountState",s=>this.onAccountStateChanged(s),e))}async fetchTokens(){if(this.namespace){let e;if(this.caipAddress){const{chainId:s,chainNamespace:n}=_.parseCaipAddress(this.caipAddress),i=`${n}:${s}`;e=w.getAllRequestedCaipNetworks().find(o=>o.caipNetworkId===i)}await u.fetchTokens({caipAddress:this.caipAddress,caipNetwork:e,namespace:this.namespace})}}fetchQuote(){if(this.amount&&this.recipient&&this.selectedPaymentAsset&&this.paymentAsset){const{address:e}=this.caipAddress?_.parseCaipAddress(this.caipAddress):{};u.fetchQuote({amount:this.amount.toString(),address:e,sourceToken:this.selectedPaymentAsset,toToken:this.paymentAsset,recipient:this.recipient})}}getWalletProperties({namespace:e}){if(!e)return{name:void 0,image:void 0};const s=this.activeConnectorIds[e];if(!s)return{name:void 0,image:void 0};const n=U.getConnector({id:s,namespace:e});if(!n)return{name:void 0,image:void 0};const i=D.getConnectorImage(n);return{name:n.name,image:i}}paymentOptionsViewTemplate(){return d`
      <wui-flex flexDirection="column" gap="2">
        <wui-text variant="sm-regular" color="secondary">CHOOSE PAYMENT OPTION</wui-text>
        <wui-flex class="pay-options-container">${this.paymentOptionsTemplate()}</wui-flex>
      </wui-flex>
    `}paymentOptionsTemplate(){const e=this.getPaymentAssetFromTokenBalances();if(this.isFetchingTokenBalances)return d`<w3m-pay-options-skeleton></w3m-pay-options-skeleton>`;if(e.length===0)return d`<w3m-pay-options-empty
        @connectOtherWallet=${this.onConnectOtherWallet.bind(this)}
      ></w3m-pay-options-empty>`;const s={disabled:this.isFetchingQuote};return d`<w3m-pay-options
      class=${Tt(s)}
      .options=${e}
      .selectedPaymentAsset=${x(this.selectedPaymentAsset)}
      .onSelect=${this.onSelectedPaymentAssetChanged.bind(this)}
    ></w3m-pay-options>`}amountWithFeeTemplate(){return this.isFetchingQuote||!this.selectedPaymentAsset||this.quoteError?d`<w3m-pay-fees-skeleton></w3m-pay-fees-skeleton>`:d`<w3m-pay-fees></w3m-pay-fees>`}paymentActionsTemplate(){const e=this.isFetchingQuote||this.isFetchingTokenBalances,s=this.isFetchingQuote||this.isFetchingTokenBalances||!this.selectedPaymentAsset||!!this.quoteError,n=N.formatNumber(this.quote?.origin.amount??0,{decimals:this.quote?.origin.currency.metadata.decimals??0}).toString();return this.selectedExchange?e||s?d`
          <wui-shimmer width="100%" height="48px" variant="light" ?rounded=${!0}></wui-shimmer>
        `:d`<wui-button
        size="lg"
        fullWidth
        variant="accent-secondary"
        @click=${this.onPayWithExchange.bind(this)}
      >
        ${`Continue in ${this.selectedExchange.name}`}

        <wui-icon name="arrowRight" color="inherit" size="sm" slot="iconRight"></wui-icon>
      </wui-button>`:d`
      <wui-flex alignItems="center" justifyContent="space-between">
        <wui-flex flexDirection="column" gap="1">
          <wui-text variant="md-regular" color="secondary">Order Total</wui-text>

          ${e||s?d`<wui-shimmer width="58px" height="32px" variant="light"></wui-shimmer>`:d`<wui-flex alignItems="center" gap="01">
                <wui-text variant="h4-regular" color="primary">${_e(n)}</wui-text>

                <wui-text variant="lg-regular" color="secondary">
                  ${this.quote?.origin.currency.metadata.symbol||"Unknown"}
                </wui-text>
              </wui-flex>`}
        </wui-flex>

        ${this.actionButtonTemplate({isLoading:e,isDisabled:s})}
      </wui-flex>
    `}actionButtonTemplate(e){const s=Ce(this.quote),{isLoading:n,isDisabled:i}=e;let r="Pay";return s.length>1&&this.completedTransactionsCount===0&&(r="Approve"),d`
      <wui-button
        size="lg"
        variant="accent-primary"
        ?loading=${n||this.isPaymentInProgress}
        ?disabled=${i||this.isPaymentInProgress}
        @click=${()=>{s.length>0?this.onSendTransactions():this.onTransfer()}}
      >
        ${r}
        ${n?null:d`<wui-icon
              name="arrowRight"
              color="inherit"
              size="sm"
              slot="iconRight"
            ></wui-icon>`}
      </wui-button>
    `}getPaymentAssetFromTokenBalances(){return this.namespace?(this.tokenBalances[this.namespace]??[]).map(i=>{try{return Bs(i)}catch{return null}}).filter(i=>!!i).filter(i=>{const{chainId:r}=_.parseCaipNetworkId(i.network),{chainId:o}=_.parseCaipNetworkId(this.paymentAsset.network);return R.isLowerCaseMatch(i.asset,this.paymentAsset.asset)?!0:this.selectedExchange?!R.isLowerCaseMatch(r.toString(),o.toString()):!0}):[]}onTokenBalancesChanged(e){this.tokenBalances=e;const[s]=this.getPaymentAssetFromTokenBalances();s&&u.setSelectedPaymentAsset(s)}async onConnectOtherWallet(){await U.connect(),await ue.open({view:"PayQuote"})}onAccountStateChanged(e){const{address:s}=this.caipAddress?_.parseCaipAddress(this.caipAddress):{};if(this.caipAddress=e?.caipAddress,this.profileName=e?.profileName??null,s){const{address:n}=this.caipAddress?_.parseCaipAddress(this.caipAddress):{};n?R.isLowerCaseMatch(n,s)||(this.resetAssetsState(),this.resetQuoteState(),this.fetchTokens()):ue.close()}}onSelectedPaymentAssetChanged(e){this.isFetchingQuote||u.setSelectedPaymentAsset(e)}async onTransfer(){const e=Le(this.quote);if(e){if(!R.isLowerCaseMatch(this.selectedPaymentAsset?.asset,e.deposit.currency))throw new Error("Quote asset is not the same as the selected payment asset");const n=this.selectedPaymentAsset?.amount??"0",i=N.formatNumber(e.deposit.amount,{decimals:this.selectedPaymentAsset?.metadata.decimals??0}).toString();if(!N.bigNumber(n).gte(i)){z.showError("Insufficient funds");return}if(this.quote&&this.selectedPaymentAsset&&this.caipAddress&&this.namespace){const{address:o}=_.parseCaipAddress(this.caipAddress);await u.onTransfer({chainNamespace:this.namespace,fromAddress:o,toAddress:e.deposit.receiver,amount:i,paymentAsset:this.selectedPaymentAsset}),u.setRequestId(e.requestId),ce.push("PayLoading")}}}async onSendTransactions(){const e=this.selectedPaymentAsset?.amount??"0",s=N.formatNumber(this.quote?.origin.amount??0,{decimals:this.selectedPaymentAsset?.metadata.decimals??0}).toString();if(!N.bigNumber(e).gte(s)){z.showError("Insufficient funds");return}const i=Ce(this.quote),[r]=Ce(this.quote,this.completedTransactionsCount);r&&this.namespace&&(await u.onSendTransaction({namespace:this.namespace,transactionStep:r}),this.completedTransactionsCount+=1,this.completedTransactionsCount===i.length&&(u.setRequestId(r.requestId),ce.push("PayLoading")))}onPayWithExchange(){if(this.exchangeUrlForQuote){const e=H.returnOpenHref("","popupWindow","scrollbar=yes,width=480,height=720");if(!e)throw new Error("Could not create popup window");e.location.href=this.exchangeUrlForQuote;const s=Le(this.quote);s&&u.setRequestId(s.requestId),u.initiatePayment(),ce.push("PayLoading")}}resetAssetsState(){u.setSelectedPaymentAsset(null)}resetQuoteState(){u.resetQuoteState()}};E.styles=pn;v([m()],E.prototype,"profileName",void 0);v([m()],E.prototype,"paymentAsset",void 0);v([m()],E.prototype,"namespace",void 0);v([m()],E.prototype,"caipAddress",void 0);v([m()],E.prototype,"amount",void 0);v([m()],E.prototype,"recipient",void 0);v([m()],E.prototype,"activeConnectorIds",void 0);v([m()],E.prototype,"selectedPaymentAsset",void 0);v([m()],E.prototype,"selectedExchange",void 0);v([m()],E.prototype,"isFetchingQuote",void 0);v([m()],E.prototype,"quoteError",void 0);v([m()],E.prototype,"quote",void 0);v([m()],E.prototype,"isFetchingTokenBalances",void 0);v([m()],E.prototype,"tokenBalances",void 0);v([m()],E.prototype,"isPaymentInProgress",void 0);v([m()],E.prototype,"exchangeUrlForQuote",void 0);v([m()],E.prototype,"completedTransactionsCount",void 0);E=v([F("w3m-pay-quote-view")],E);export{p as A,u as P,C as W,h as a,E as b,B as c};
