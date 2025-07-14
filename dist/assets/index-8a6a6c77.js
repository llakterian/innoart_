var t,e;import{z as i,B as o,c as r,r as a,L as s,h as n,n as l,D as c,m as h,e as d}from"./core-83c0d9fc.js";import{_}from"./main-555f3dea.js";const p={getSpacingStyles:(t,e)=>Array.isArray(t)?t[e]?`var(--wui-spacing-${t[e]})`:void 0:"string"==typeof t?`var(--wui-spacing-${t})`:void 0,getFormattedDate:t=>new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric"}).format(t),getHostName(t){try{return new URL(t).hostname}catch(e){return""}},getTruncateString:({string:t,charsStart:e,charsEnd:i,truncate:o})=>t.length<=e+i?t:"end"===o?`${t.substring(0,e)}...`:"start"===o?`...${t.substring(t.length-i)}`:`${t.substring(0,Math.floor(e))}...${t.substring(t.length-Math.floor(i))}`,generateAvatarColors(t){const e=t.toLowerCase().replace(/^0x/iu,"").replace(/[^a-f0-9]/gu,"").substring(0,6).padEnd(6,"0"),i=this.hexToRgb(e),o=getComputedStyle(document.documentElement).getPropertyValue("--w3m-border-radius-master"),r=100-3*Number(null==o?void 0:o.replace("px","")),a=`${r}% ${r}% at 65% 40%`,s=[];for(let n=0;n<5;n+=1){const t=this.tintColor(i,.15*n);s.push(`rgb(${t[0]}, ${t[1]}, ${t[2]})`)}return`\n    --local-color-1: ${s[0]};\n    --local-color-2: ${s[1]};\n    --local-color-3: ${s[2]};\n    --local-color-4: ${s[3]};\n    --local-color-5: ${s[4]};\n    --local-radial-circle: ${a}\n   `},hexToRgb(t){const e=parseInt(t,16);return[e>>16&255,e>>8&255,255&e]},tintColor(t,e){const[i,o,r]=t;return[Math.round(i+(255-i)*e),Math.round(o+(255-o)*e),Math.round(r+(255-r)*e)]},isNumber:t=>/^[0-9]+$/u.test(t),getColorTheme(t){var e;return t||("undefined"!=typeof window&&window.matchMedia?(null==(e=window.matchMedia("(prefers-color-scheme: dark)"))?void 0:e.matches)?"dark":"light":"dark")},splitBalance(t){const e=t.split(".");return 2===e.length?[e[0],e[1]]:["0","00"]},roundNumber:(t,e,i)=>t.toString().length>=e?Number(t).toFixed(i):t,formatNumberToLocalString:(t,e=2)=>void 0===t?"0.00":"number"==typeof t?t.toLocaleString("en-US",{maximumFractionDigits:e,minimumFractionDigits:e}):parseFloat(t).toLocaleString("en-US",{maximumFractionDigits:e,minimumFractionDigits:e})};function g(t){return function(e){return"function"==typeof e?function(t,e){return customElements.get(t)||customElements.define(t,e),e}(t,e):function(t,e){const{kind:i,elements:o}=e;return{kind:i,elements:o,finisher(e){customElements.get(t)||customElements.define(t,e)}}}(t,e)}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let u;globalThis.litIssuedWarnings??(globalThis.litIssuedWarnings=new Set),u=(t,e)=>{e+=` See https://lit.dev/msg/${t} for more information.`,globalThis.litIssuedWarnings.has(e)||globalThis.litIssuedWarnings.has(t)||(console.warn(e),globalThis.litIssuedWarnings.add(e))};const w={attribute:!0,type:String,converter:i,reflect:!1,hasChanged:o},v=(t=w,e,i)=>{const{kind:o,metadata:r}=i;null==r&&u("missing-class-metadata",`The class ${e} is missing decorator metadata. This could mean that you're using a compiler that supports decorators but doesn't support decorator metadata, such as TypeScript 5.1. Please update your compiler.`);let a=globalThis.litPropertyMetadata.get(r);if(void 0===a&&globalThis.litPropertyMetadata.set(r,a=new Map),"setter"===o&&((t=Object.create(t)).wrapped=!0),a.set(i.name,t),"accessor"===o){const{name:o}=i;return{set(i){const r=e.get.call(this);e.set.call(this,i),this.requestUpdate(o,r,t)},init(e){return void 0!==e&&this._$changeProperty(o,void 0,t,e),e}}}if("setter"===o){const{name:o}=i;return function(i){const r=this[o];e.call(this,i),this.requestUpdate(o,r,t)}}throw new Error(`Unsupported decorator location: ${o}`)};function f(t){return(e,i)=>"object"==typeof i?v(t,e,i):((t,e,i)=>{const o=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),o?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function m(t){return f({...t,state:!0,attribute:!1})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */globalThis.litIssuedWarnings??(globalThis.litIssuedWarnings=new Set);const y=r`
  :host {
    display: flex;
    width: inherit;
    height: inherit;
  }
`;var b=globalThis&&globalThis.__decorate||function(t,e,i,o){var r,a=arguments.length,s=a<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,i,o);else for(var n=t.length-1;n>=0;n--)(r=t[n])&&(s=(a<3?r(s):a>3?r(e,i,s):r(e,i))||s);return a>3&&s&&Object.defineProperty(e,i,s),s};let E=class extends s{render(){return this.style.cssText=`\n      flex-direction: ${this.flexDirection};\n      flex-wrap: ${this.flexWrap};\n      flex-basis: ${this.flexBasis};\n      flex-grow: ${this.flexGrow};\n      flex-shrink: ${this.flexShrink};\n      align-items: ${this.alignItems};\n      justify-content: ${this.justifyContent};\n      column-gap: ${this.columnGap&&`var(--wui-spacing-${this.columnGap})`};\n      row-gap: ${this.rowGap&&`var(--wui-spacing-${this.rowGap})`};\n      gap: ${this.gap&&`var(--wui-spacing-${this.gap})`};\n      padding-top: ${this.padding&&p.getSpacingStyles(this.padding,0)};\n      padding-right: ${this.padding&&p.getSpacingStyles(this.padding,1)};\n      padding-bottom: ${this.padding&&p.getSpacingStyles(this.padding,2)};\n      padding-left: ${this.padding&&p.getSpacingStyles(this.padding,3)};\n      margin-top: ${this.margin&&p.getSpacingStyles(this.margin,0)};\n      margin-right: ${this.margin&&p.getSpacingStyles(this.margin,1)};\n      margin-bottom: ${this.margin&&p.getSpacingStyles(this.margin,2)};\n      margin-left: ${this.margin&&p.getSpacingStyles(this.margin,3)};\n    `,n`<slot></slot>`}};E.styles=[a,y],b([f()],E.prototype,"flexDirection",void 0),b([f()],E.prototype,"flexWrap",void 0),b([f()],E.prototype,"flexBasis",void 0),b([f()],E.prototype,"flexGrow",void 0),b([f()],E.prototype,"flexShrink",void 0),b([f()],E.prototype,"alignItems",void 0),b([f()],E.prototype,"justifyContent",void 0),b([f()],E.prototype,"columnGap",void 0),b([f()],E.prototype,"rowGap",void 0),b([f()],E.prototype,"gap",void 0),b([f()],E.prototype,"padding",void 0),b([f()],E.prototype,"margin",void 0),E=b([g("wui-flex")],E);
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const T=t=>t??l;
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */(null==(t=window.ShadyDOM)?void 0:t.inUse)&&!0===(null==(e=window.ShadyDOM)?void 0:e.noPatch)&&window.ShadyDOM.wrap;const x=1,S=2,j=t=>(...e)=>({_$litDirective$:t,values:e});class R{constructor(t){}get _$isConnected(){return this._$parent._$isConnected}_$initialize(t,e,i){this.__part=t,this._$parent=e,this.__attributeIndex=i}_$resolve(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const P=(t,e)=>{var i;const o=t._$disconnectableChildren;if(void 0===o)return!1;for(const r of o)null==(i=r._$notifyDirectiveConnectionChanged)||i.call(r,e,!1),P(r,e);return!0},$=t=>{let e,i;do{if(void 0===(e=t._$parent))break;i=e._$disconnectableChildren,i.delete(t),t=e}while(0===(null==i?void 0:i.size))},O=t=>{for(let e;e=t._$parent;t=e){let i=e._$disconnectableChildren;if(void 0===i)e._$disconnectableChildren=i=new Set;else if(i.has(t))break;i.add(t),k(e)}};function I(t){void 0!==this._$disconnectableChildren?($(this),this._$parent=t,O(this)):this._$parent=t}function D(t,e=!1,i=0){const o=this._$committedValue,r=this._$disconnectableChildren;if(void 0!==r&&0!==r.size)if(e)if(Array.isArray(o))for(let a=i;a<o.length;a++)P(o[a],!1),$(o[a]);else null!=o&&(P(o,!1),$(o));else P(this,t)}const k=t=>{t.type==S&&(t._$notifyConnectionChanged??(t._$notifyConnectionChanged=D),t._$reparentDisconnectables??(t._$reparentDisconnectables=I))};class L extends R{constructor(){super(...arguments),this._$disconnectableChildren=void 0}_$initialize(t,e,i){super._$initialize(t,e,i),O(this),this.isConnected=t._$isConnected}_$notifyDirectiveConnectionChanged(t,e=!0){var i,o;t!==this.isConnected&&(this.isConnected=t,t?null==(i=this.reconnected)||i.call(this):null==(o=this.disconnected)||o.call(this)),e&&(P(this,t),$(this))}setValue(t){if(void 0===this.__part.strings)this.__part._$setValue(t,this);else{if(void 0===this.__attributeIndex)throw new Error("Expected this.__attributeIndex to be a number");const e=[...this.__part._$committedValue];e[this.__attributeIndex]=t,this.__part._$setValue(e,this,0)}}disconnected(){}reconnected(){}}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class z{constructor(t){this._ref=t}disconnect(){this._ref=void 0}reconnect(t){this._ref=t}deref(){return this._ref}}class V{constructor(){this._promise=void 0,this._resolve=void 0}get(){return this._promise}pause(){this._promise??(this._promise=new Promise(t=>this._resolve=t))}resume(){var t;null==(t=this._resolve)||t.call(this),this._promise=this._resolve=void 0}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const A=t=>{return!(e=t,null===e||"object"!=typeof e&&"function"!=typeof e||"function"!=typeof t.then);var e},C=1073741823;const B=j(class extends L{constructor(){super(...arguments),this.__lastRenderedIndex=C,this.__values=[],this.__weakThis=new z(this),this.__pauser=new V}render(...t){return t.find(t=>!A(t))??c}update(t,e){const i=this.__values;let o=i.length;this.__values=e;const r=this.__weakThis,a=this.__pauser;this.isConnected||this.disconnected();for(let s=0;s<e.length&&!(s>this.__lastRenderedIndex);s++){const t=e[s];if(!A(t))return this.__lastRenderedIndex=s,t;s<o&&t===i[s]||(this.__lastRenderedIndex=C,o=0,Promise.resolve(t).then(async e=>{for(;a.get();)await a.get();const i=r.deref();if(void 0!==i){const o=i.__values.indexOf(t);o>-1&&o<i.__lastRenderedIndex&&(i.__lastRenderedIndex=o,i.setValue(e))}}))}return c}disconnected(){this.__weakThis.disconnect(),this.__pauser.pause()}reconnected(){this.__weakThis.reconnect(this),this.__pauser.resume()}});const M=new class{constructor(){this.cache=new Map}set(t,e){this.cache.set(t,e)}get(t){return this.cache.get(t)}has(t){return this.cache.has(t)}delete(t){this.cache.delete(t)}clear(){this.cache.clear()}},H=r`
  :host {
    display: flex;
    aspect-ratio: var(--local-aspect-ratio);
    color: var(--local-color);
    width: var(--local-width);
  }

  svg {
    width: inherit;
    height: inherit;
    object-fit: contain;
    object-position: center;
  }

  .fallback {
    width: var(--local-width);
    height: var(--local-height);
  }
`;var W=globalThis&&globalThis.__decorate||function(t,e,i,o){var r,a=arguments.length,s=a<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,i,o);else for(var n=t.length-1;n>=0;n--)(r=t[n])&&(s=(a<3?r(s):a>3?r(e,i,s):r(e,i))||s);return a>3&&s&&Object.defineProperty(e,i,s),s};const F={add:async()=>(await _(()=>import("./add-ce87a119.js"),["assets/add-ce87a119.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).addSvg,allWallets:async()=>(await _(()=>import("./all-wallets-523b3534.js"),["assets/all-wallets-523b3534.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).allWalletsSvg,arrowBottomCircle:async()=>(await _(()=>import("./arrow-bottom-circle-ade23fa5.js"),["assets/arrow-bottom-circle-ade23fa5.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).arrowBottomCircleSvg,appStore:async()=>(await _(()=>import("./app-store-2ce3ca05.js"),["assets/app-store-2ce3ca05.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).appStoreSvg,apple:async()=>(await _(()=>import("./apple-60eea42f.js"),["assets/apple-60eea42f.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).appleSvg,arrowBottom:async()=>(await _(()=>import("./arrow-bottom-5679664c.js"),["assets/arrow-bottom-5679664c.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).arrowBottomSvg,arrowLeft:async()=>(await _(()=>import("./arrow-left-dab2413b.js"),["assets/arrow-left-dab2413b.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).arrowLeftSvg,arrowRight:async()=>(await _(()=>import("./arrow-right-2ff5a8a5.js"),["assets/arrow-right-2ff5a8a5.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).arrowRightSvg,arrowTop:async()=>(await _(()=>import("./arrow-top-f67dc8d4.js"),["assets/arrow-top-f67dc8d4.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).arrowTopSvg,bank:async()=>(await _(()=>import("./bank-791ef752.js"),["assets/bank-791ef752.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).bankSvg,browser:async()=>(await _(()=>import("./browser-cf4e5055.js"),["assets/browser-cf4e5055.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).browserSvg,card:async()=>(await _(()=>import("./card-cafbe680.js"),["assets/card-cafbe680.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).cardSvg,checkmark:async()=>(await _(()=>import("./checkmark-da1e6d0a.js"),["assets/checkmark-da1e6d0a.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).checkmarkSvg,checkmarkBold:async()=>(await _(()=>import("./checkmark-bold-5dea0bfb.js"),["assets/checkmark-bold-5dea0bfb.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).checkmarkBoldSvg,chevronBottom:async()=>(await _(()=>import("./chevron-bottom-5eb2544c.js"),["assets/chevron-bottom-5eb2544c.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).chevronBottomSvg,chevronLeft:async()=>(await _(()=>import("./chevron-left-b796eeac.js"),["assets/chevron-left-b796eeac.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).chevronLeftSvg,chevronRight:async()=>(await _(()=>import("./chevron-right-96b6fad3.js"),["assets/chevron-right-96b6fad3.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).chevronRightSvg,chevronTop:async()=>(await _(()=>import("./chevron-top-633f6b77.js"),["assets/chevron-top-633f6b77.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).chevronTopSvg,chromeStore:async()=>(await _(()=>import("./chrome-store-07f99138.js"),["assets/chrome-store-07f99138.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).chromeStoreSvg,clock:async()=>(await _(()=>import("./clock-f3a7db68.js"),["assets/clock-f3a7db68.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).clockSvg,close:async()=>(await _(()=>import("./close-bea9644b.js"),["assets/close-bea9644b.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).closeSvg,compass:async()=>(await _(()=>import("./compass-9a63a90d.js"),["assets/compass-9a63a90d.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).compassSvg,coinPlaceholder:async()=>(await _(()=>import("./coinPlaceholder-ef54b900.js"),["assets/coinPlaceholder-ef54b900.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).coinPlaceholderSvg,copy:async()=>(await _(()=>import("./copy-5c0d308a.js"),["assets/copy-5c0d308a.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).copySvg,cursor:async()=>(await _(()=>import("./cursor-69e94cc8.js"),["assets/cursor-69e94cc8.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).cursorSvg,cursorTransparent:async()=>(await _(()=>import("./cursor-transparent-5bca00ae.js"),["assets/cursor-transparent-5bca00ae.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).cursorTransparentSvg,desktop:async()=>(await _(()=>import("./desktop-8fd9c977.js"),["assets/desktop-8fd9c977.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).desktopSvg,disconnect:async()=>(await _(()=>import("./disconnect-10a358f6.js"),["assets/disconnect-10a358f6.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).disconnectSvg,discord:async()=>(await _(()=>import("./discord-87350670.js"),["assets/discord-87350670.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).discordSvg,etherscan:async()=>(await _(()=>import("./etherscan-354c34cd.js"),["assets/etherscan-354c34cd.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).etherscanSvg,extension:async()=>(await _(()=>import("./extension-aba4b9c9.js"),["assets/extension-aba4b9c9.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).extensionSvg,externalLink:async()=>(await _(()=>import("./external-link-5d065843.js"),["assets/external-link-5d065843.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).externalLinkSvg,facebook:async()=>(await _(()=>import("./facebook-9d6b591a.js"),["assets/facebook-9d6b591a.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).facebookSvg,farcaster:async()=>(await _(()=>import("./farcaster-d514d552.js"),["assets/farcaster-d514d552.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).farcasterSvg,filters:async()=>(await _(()=>import("./filters-2c652d72.js"),["assets/filters-2c652d72.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).filtersSvg,github:async()=>(await _(()=>import("./github-1a333627.js"),["assets/github-1a333627.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).githubSvg,google:async()=>(await _(()=>import("./google-e76186a1.js"),["assets/google-e76186a1.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).googleSvg,helpCircle:async()=>(await _(()=>import("./help-circle-fdd13167.js"),["assets/help-circle-fdd13167.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).helpCircleSvg,image:async()=>(await _(()=>import("./image-eee56cfd.js"),["assets/image-eee56cfd.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).imageSvg,id:async()=>(await _(()=>import("./id-c0eda42d.js"),["assets/id-c0eda42d.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).idSvg,infoCircle:async()=>(await _(()=>import("./info-circle-f1eb47dc.js"),["assets/info-circle-f1eb47dc.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).infoCircleSvg,lightbulb:async()=>(await _(()=>import("./lightbulb-7104d21f.js"),["assets/lightbulb-7104d21f.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).lightbulbSvg,mail:async()=>(await _(()=>import("./mail-c6a6bd27.js"),["assets/mail-c6a6bd27.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).mailSvg,mobile:async()=>(await _(()=>import("./mobile-ba5c13b4.js"),["assets/mobile-ba5c13b4.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).mobileSvg,more:async()=>(await _(()=>import("./more-1f0dbb15.js"),["assets/more-1f0dbb15.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).moreSvg,networkPlaceholder:async()=>(await _(()=>import("./network-placeholder-590450f6.js"),["assets/network-placeholder-590450f6.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).networkPlaceholderSvg,nftPlaceholder:async()=>(await _(()=>import("./nftPlaceholder-f375c781.js"),["assets/nftPlaceholder-f375c781.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).nftPlaceholderSvg,off:async()=>(await _(()=>import("./off-f8947341.js"),["assets/off-f8947341.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).offSvg,playStore:async()=>(await _(()=>import("./play-store-56e96385.js"),["assets/play-store-56e96385.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).playStoreSvg,plus:async()=>(await _(()=>import("./plus-f2e82904.js"),["assets/plus-f2e82904.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).plusSvg,qrCode:async()=>(await _(()=>import("./qr-code-cc115658.js"),["assets/qr-code-cc115658.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).qrCodeIcon,recycleHorizontal:async()=>(await _(()=>import("./recycle-horizontal-f1e57a48.js"),["assets/recycle-horizontal-f1e57a48.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).recycleHorizontalSvg,refresh:async()=>(await _(()=>import("./refresh-e62432b2.js"),["assets/refresh-e62432b2.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).refreshSvg,search:async()=>(await _(()=>import("./search-ab552d58.js"),["assets/search-ab552d58.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).searchSvg,send:async()=>(await _(()=>import("./send-c89aad17.js"),["assets/send-c89aad17.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).sendSvg,swapHorizontal:async()=>(await _(()=>import("./swapHorizontal-2e41029c.js"),["assets/swapHorizontal-2e41029c.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).swapHorizontalSvg,swapHorizontalMedium:async()=>(await _(()=>import("./swapHorizontalMedium-05fcd314.js"),["assets/swapHorizontalMedium-05fcd314.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).swapHorizontalMediumSvg,swapHorizontalBold:async()=>(await _(()=>import("./swapHorizontalBold-57dbde9d.js"),["assets/swapHorizontalBold-57dbde9d.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).swapHorizontalBoldSvg,swapHorizontalRoundedBold:async()=>(await _(()=>import("./swapHorizontalRoundedBold-8f22281c.js"),["assets/swapHorizontalRoundedBold-8f22281c.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).swapHorizontalRoundedBoldSvg,swapVertical:async()=>(await _(()=>import("./swapVertical-fef59813.js"),["assets/swapVertical-fef59813.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).swapVerticalSvg,telegram:async()=>(await _(()=>import("./telegram-da86aaaa.js"),["assets/telegram-da86aaaa.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).telegramSvg,threeDots:async()=>(await _(()=>import("./three-dots-4a478970.js"),["assets/three-dots-4a478970.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).threeDotsSvg,twitch:async()=>(await _(()=>import("./twitch-25cb1ad3.js"),["assets/twitch-25cb1ad3.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).twitchSvg,twitter:async()=>(await _(()=>import("./x-5bcc763c.js"),["assets/x-5bcc763c.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).xSvg,twitterIcon:async()=>(await _(()=>import("./twitterIcon-494ed1aa.js"),["assets/twitterIcon-494ed1aa.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).twitterIconSvg,verify:async()=>(await _(()=>import("./verify-1cff3466.js"),["assets/verify-1cff3466.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).verifySvg,verifyFilled:async()=>(await _(()=>import("./verify-filled-ca4fd48e.js"),["assets/verify-filled-ca4fd48e.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).verifyFilledSvg,wallet:async()=>(await _(()=>import("./wallet-b8a153ab.js"),["assets/wallet-b8a153ab.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).walletSvg,walletConnect:async()=>(await _(()=>import("./walletconnect-4ad20dae.js"),["assets/walletconnect-4ad20dae.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).walletConnectSvg,walletConnectLightBrown:async()=>(await _(()=>import("./walletconnect-4ad20dae.js"),["assets/walletconnect-4ad20dae.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).walletConnectLightBrownSvg,walletConnectBrown:async()=>(await _(()=>import("./walletconnect-4ad20dae.js"),["assets/walletconnect-4ad20dae.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).walletConnectBrownSvg,walletPlaceholder:async()=>(await _(()=>import("./wallet-placeholder-3ae93b95.js"),["assets/wallet-placeholder-3ae93b95.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).walletPlaceholderSvg,warningCircle:async()=>(await _(()=>import("./warning-circle-102afb39.js"),["assets/warning-circle-102afb39.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).warningCircleSvg,x:async()=>(await _(()=>import("./x-5bcc763c.js"),["assets/x-5bcc763c.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).xSvg,info:async()=>(await _(()=>import("./info-6d53dc6e.js"),["assets/info-6d53dc6e.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).infoSvg,exclamationTriangle:async()=>(await _(()=>import("./exclamation-triangle-6a841d2e.js"),["assets/exclamation-triangle-6a841d2e.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).exclamationTriangleSvg,reown:async()=>(await _(()=>import("./reown-logo-23888193.js"),["assets/reown-logo-23888193.js","assets/core-83c0d9fc.js","assets/main-555f3dea.js","assets/global-38c848b6.css","assets/events-8de2f827.js","assets/index.es-69286892.js"])).reownSvg};let U=class extends s{constructor(){super(...arguments),this.size="md",this.name="copy",this.color="fg-300",this.aspectRatio="1 / 1"}render(){return this.style.cssText=`\n      --local-color: var(--wui-color-${this.color});\n      --local-width: var(--wui-icon-size-${this.size});\n      --local-aspect-ratio: ${this.aspectRatio}\n    `,n`${B(async function(t){if(M.has(t))return M.get(t);const e=(F[t]??F.copy)();return M.set(t,e),e}(this.name),n`<div class="fallback"></div>`)}`}};U.styles=[a,h,H],W([f()],U.prototype,"size",void 0),W([f()],U.prototype,"name",void 0),W([f()],U.prototype,"color",void 0),W([f()],U.prototype,"aspectRatio",void 0),U=W([g("wui-icon")],U);const G=j(
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class extends R{constructor(t){var e;if(super(t),t.type!==x||"class"!==t.name||(null==(e=t.strings)?void 0:e.length)>2)throw new Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){var i,o;if(void 0===this._previousClasses){this._previousClasses=new Set,void 0!==t.strings&&(this._staticClasses=new Set(t.strings.join(" ").split(/\s/).filter(t=>""!==t)));for(const t in e)e[t]&&!(null==(i=this._staticClasses)?void 0:i.has(t))&&this._previousClasses.add(t);return this.render(e)}const r=t.element.classList;for(const a of this._previousClasses)a in e||(r.remove(a),this._previousClasses.delete(a));for(const a in e){const t=!!e[a];t===this._previousClasses.has(a)||(null==(o=this._staticClasses)?void 0:o.has(a))||(t?(r.add(a),this._previousClasses.add(a)):(r.remove(a),this._previousClasses.delete(a)))}return c}}),q=r`
  :host {
    display: inline-flex !important;
  }

  slot {
    width: 100%;
    display: inline-block;
    font-style: normal;
    font-family: var(--wui-font-family);
    font-feature-settings:
      'tnum' on,
      'lnum' on,
      'case' on;
    line-height: 130%;
    font-weight: var(--wui-font-weight-regular);
    overflow: inherit;
    text-overflow: inherit;
    text-align: var(--local-align);
    color: var(--local-color);
  }

  .wui-line-clamp-1 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }

  .wui-line-clamp-2 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .wui-font-medium-400 {
    font-size: var(--wui-font-size-medium);
    font-weight: var(--wui-font-weight-light);
    letter-spacing: var(--wui-letter-spacing-medium);
  }

  .wui-font-medium-600 {
    font-size: var(--wui-font-size-medium);
    letter-spacing: var(--wui-letter-spacing-medium);
  }

  .wui-font-title-600 {
    font-size: var(--wui-font-size-title);
    letter-spacing: var(--wui-letter-spacing-title);
  }

  .wui-font-title-6-600 {
    font-size: var(--wui-font-size-title-6);
    letter-spacing: var(--wui-letter-spacing-title-6);
  }

  .wui-font-mini-700 {
    font-size: var(--wui-font-size-mini);
    letter-spacing: var(--wui-letter-spacing-mini);
    text-transform: uppercase;
  }

  .wui-font-large-500,
  .wui-font-large-600,
  .wui-font-large-700 {
    font-size: var(--wui-font-size-large);
    letter-spacing: var(--wui-letter-spacing-large);
  }

  .wui-font-2xl-500,
  .wui-font-2xl-600,
  .wui-font-2xl-700 {
    font-size: var(--wui-font-size-2xl);
    letter-spacing: var(--wui-letter-spacing-2xl);
  }

  .wui-font-paragraph-400,
  .wui-font-paragraph-500,
  .wui-font-paragraph-600,
  .wui-font-paragraph-700 {
    font-size: var(--wui-font-size-paragraph);
    letter-spacing: var(--wui-letter-spacing-paragraph);
  }

  .wui-font-small-400,
  .wui-font-small-500,
  .wui-font-small-600 {
    font-size: var(--wui-font-size-small);
    letter-spacing: var(--wui-letter-spacing-small);
  }

  .wui-font-tiny-400,
  .wui-font-tiny-500,
  .wui-font-tiny-600 {
    font-size: var(--wui-font-size-tiny);
    letter-spacing: var(--wui-letter-spacing-tiny);
  }

  .wui-font-micro-700,
  .wui-font-micro-600 {
    font-size: var(--wui-font-size-micro);
    letter-spacing: var(--wui-letter-spacing-micro);
    text-transform: uppercase;
  }

  .wui-font-tiny-400,
  .wui-font-small-400,
  .wui-font-medium-400,
  .wui-font-paragraph-400 {
    font-weight: var(--wui-font-weight-light);
  }

  .wui-font-large-700,
  .wui-font-paragraph-700,
  .wui-font-micro-700,
  .wui-font-mini-700 {
    font-weight: var(--wui-font-weight-bold);
  }

  .wui-font-medium-600,
  .wui-font-medium-title-600,
  .wui-font-title-6-600,
  .wui-font-large-600,
  .wui-font-paragraph-600,
  .wui-font-small-600,
  .wui-font-tiny-600,
  .wui-font-micro-600 {
    font-weight: var(--wui-font-weight-medium);
  }

  :host([disabled]) {
    opacity: 0.4;
  }
`;var N=globalThis&&globalThis.__decorate||function(t,e,i,o){var r,a=arguments.length,s=a<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,i,o);else for(var n=t.length-1;n>=0;n--)(r=t[n])&&(s=(a<3?r(s):a>3?r(e,i,s):r(e,i))||s);return a>3&&s&&Object.defineProperty(e,i,s),s};let Y=class extends s{constructor(){super(...arguments),this.variant="paragraph-500",this.color="fg-300",this.align="left",this.lineClamp=void 0}render(){const t={[`wui-font-${this.variant}`]:!0,[`wui-color-${this.color}`]:!0,[`wui-line-clamp-${this.lineClamp}`]:!!this.lineClamp};return this.style.cssText=`\n      --local-align: ${this.align};\n      --local-color: var(--wui-color-${this.color});\n    `,n`<slot class=${G(t)}></slot>`}};Y.styles=[a,q],N([f()],Y.prototype,"variant",void 0),N([f()],Y.prototype,"color",void 0),N([f()],Y.prototype,"align",void 0),N([f()],Y.prototype,"lineClamp",void 0),Y=N([g("wui-text")],Y);const J=r`
  :host {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    background-color: var(--wui-color-gray-glass-020);
    border-radius: var(--local-border-radius);
    border: var(--local-border);
    box-sizing: content-box;
    width: var(--local-size);
    height: var(--local-size);
    min-height: var(--local-size);
    min-width: var(--local-size);
  }

  @supports (background: color-mix(in srgb, white 50%, black)) {
    :host {
      background-color: color-mix(in srgb, var(--local-bg-value) var(--local-bg-mix), transparent);
    }
  }
`;var K=globalThis&&globalThis.__decorate||function(t,e,i,o){var r,a=arguments.length,s=a<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,i,o);else for(var n=t.length-1;n>=0;n--)(r=t[n])&&(s=(a<3?r(s):a>3?r(e,i,s):r(e,i))||s);return a>3&&s&&Object.defineProperty(e,i,s),s};let Q=class extends s{constructor(){super(...arguments),this.size="md",this.backgroundColor="accent-100",this.iconColor="accent-100",this.background="transparent",this.border=!1,this.borderColor="wui-color-bg-125",this.icon="copy"}render(){const t=this.iconSize||this.size,e="lg"===this.size,i="xl"===this.size,o=e?"12%":"16%",r=e?"xxs":i?"s":"3xl",a="gray"===this.background,s="opaque"===this.background,l="accent-100"===this.backgroundColor&&s||"success-100"===this.backgroundColor&&s||"error-100"===this.backgroundColor&&s||"inverse-100"===this.backgroundColor&&s;let c=`var(--wui-color-${this.backgroundColor})`;return l?c=`var(--wui-icon-box-bg-${this.backgroundColor})`:a&&(c=`var(--wui-color-gray-${this.backgroundColor})`),this.style.cssText=`\n       --local-bg-value: ${c};\n       --local-bg-mix: ${l||a?"100%":o};\n       --local-border-radius: var(--wui-border-radius-${r});\n       --local-size: var(--wui-icon-box-size-${this.size});\n       --local-border: ${"wui-color-bg-125"===this.borderColor?"2px":"1px"} solid ${this.border?`var(--${this.borderColor})`:"transparent"}\n   `,n` <wui-icon color=${this.iconColor} size=${t} name=${this.icon}></wui-icon> `}};Q.styles=[a,d,J],K([f()],Q.prototype,"size",void 0),K([f()],Q.prototype,"backgroundColor",void 0),K([f()],Q.prototype,"iconColor",void 0),K([f()],Q.prototype,"iconSize",void 0),K([f()],Q.prototype,"background",void 0),K([f({type:Boolean})],Q.prototype,"border",void 0),K([f()],Q.prototype,"borderColor",void 0),K([f()],Q.prototype,"icon",void 0),Q=K([g("wui-icon-box")],Q);const X=r`
  :host {
    display: block;
    width: var(--local-width);
    height: var(--local-height);
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
    border-radius: inherit;
  }
`;var Z=globalThis&&globalThis.__decorate||function(t,e,i,o){var r,a=arguments.length,s=a<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,i,o);else for(var n=t.length-1;n>=0;n--)(r=t[n])&&(s=(a<3?r(s):a>3?r(e,i,s):r(e,i))||s);return a>3&&s&&Object.defineProperty(e,i,s),s};let tt=class extends s{constructor(){super(...arguments),this.src="./path/to/image.jpg",this.alt="Image",this.size=void 0}render(){return this.style.cssText=`\n      --local-width: ${this.size?`var(--wui-icon-size-${this.size});`:"100%"};\n      --local-height: ${this.size?`var(--wui-icon-size-${this.size});`:"100%"};\n      `,n`<img src=${this.src} alt=${this.alt} @error=${this.handleImageError} />`}handleImageError(){this.dispatchEvent(new CustomEvent("onLoadError",{bubbles:!0,composed:!0}))}};tt.styles=[a,h,X],Z([f()],tt.prototype,"src",void 0),Z([f()],tt.prototype,"alt",void 0),Z([f()],tt.prototype,"size",void 0),tt=Z([g("wui-image")],tt);const et=r`
  :host {
    display: flex;
    justify-content: center;
    align-items: center;
    height: var(--wui-spacing-m);
    padding: 0 var(--wui-spacing-3xs) !important;
    border-radius: var(--wui-border-radius-5xs);
    transition:
      border-radius var(--wui-duration-lg) var(--wui-ease-out-power-1),
      background-color var(--wui-duration-lg) var(--wui-ease-out-power-1);
    will-change: border-radius, background-color;
  }

  :host > wui-text {
    transform: translateY(5%);
  }

  :host([data-variant='main']) {
    background-color: var(--wui-color-accent-glass-015);
    color: var(--wui-color-accent-100);
  }

  :host([data-variant='shade']) {
    background-color: var(--wui-color-gray-glass-010);
    color: var(--wui-color-fg-200);
  }

  :host([data-variant='success']) {
    background-color: var(--wui-icon-box-bg-success-100);
    color: var(--wui-color-success-100);
  }

  :host([data-variant='error']) {
    background-color: var(--wui-icon-box-bg-error-100);
    color: var(--wui-color-error-100);
  }

  :host([data-size='lg']) {
    padding: 11px 5px !important;
  }

  :host([data-size='lg']) > wui-text {
    transform: translateY(2%);
  }
`;var it=globalThis&&globalThis.__decorate||function(t,e,i,o){var r,a=arguments.length,s=a<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,i,o);else for(var n=t.length-1;n>=0;n--)(r=t[n])&&(s=(a<3?r(s):a>3?r(e,i,s):r(e,i))||s);return a>3&&s&&Object.defineProperty(e,i,s),s};let ot=class extends s{constructor(){super(...arguments),this.variant="main",this.size="lg"}render(){this.dataset.variant=this.variant,this.dataset.size=this.size;const t="md"===this.size?"mini-700":"micro-700";return n`
      <wui-text data-variant=${this.variant} variant=${t} color="inherit">
        <slot></slot>
      </wui-text>
    `}};ot.styles=[a,et],it([f()],ot.prototype,"variant",void 0),it([f()],ot.prototype,"size",void 0),ot=it([g("wui-tag")],ot);const rt=r`
  :host {
    display: flex;
  }

  :host([data-size='sm']) > svg {
    width: 12px;
    height: 12px;
  }

  :host([data-size='md']) > svg {
    width: 16px;
    height: 16px;
  }

  :host([data-size='lg']) > svg {
    width: 24px;
    height: 24px;
  }

  :host([data-size='xl']) > svg {
    width: 32px;
    height: 32px;
  }

  svg {
    animation: rotate 2s linear infinite;
  }

  circle {
    fill: none;
    stroke: var(--local-color);
    stroke-width: 4px;
    stroke-dasharray: 1, 124;
    stroke-dashoffset: 0;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  :host([data-size='md']) > svg > circle {
    stroke-width: 6px;
  }

  :host([data-size='sm']) > svg > circle {
    stroke-width: 8px;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 124;
      stroke-dashoffset: 0;
    }

    50% {
      stroke-dasharray: 90, 124;
      stroke-dashoffset: -35;
    }

    100% {
      stroke-dashoffset: -125;
    }
  }
`;var at=globalThis&&globalThis.__decorate||function(t,e,i,o){var r,a=arguments.length,s=a<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,i,o);else for(var n=t.length-1;n>=0;n--)(r=t[n])&&(s=(a<3?r(s):a>3?r(e,i,s):r(e,i))||s);return a>3&&s&&Object.defineProperty(e,i,s),s};let st=class extends s{constructor(){super(...arguments),this.color="accent-100",this.size="lg"}render(){return this.style.cssText="--local-color: "+("inherit"===this.color?"inherit":`var(--wui-color-${this.color})`),this.dataset.size=this.size,n`<svg viewBox="25 25 50 50">
      <circle r="20" cy="50" cx="50"></circle>
    </svg>`}};st.styles=[a,rt],at([f()],st.prototype,"color",void 0),at([f()],st.prototype,"size",void 0),st=at([g("wui-loading-spinner")],st);export{L as A,p as U,G as a,g as c,j as d,T as i,f as p,m as s};
