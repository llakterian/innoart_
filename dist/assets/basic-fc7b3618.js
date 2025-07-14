import{c as t,e,r as i,L as o,h as r,C as n,A as a,a as s,E as l,R as c,O as u,b as d,d as h,f as p,S as g,g as w,W as f,i as b,j as v,T as m,k as y,M as x,l as $,s as C,n as k,m as R}from"./core-83c0d9fc.js";import{p as T,c as I,i as E,s as _,U as P,d as j,A as O,a as S}from"./index-8a6a6c77.js";import"./main-555f3dea.js";/* empty css               */import"./events-8de2f827.js";import"./index.es-69286892.js";const L=t`
  :host {
    position: relative;
    background-color: var(--wui-color-gray-glass-002);
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--local-size);
    height: var(--local-size);
    border-radius: inherit;
    border-radius: var(--local-border-radius);
  }

  :host > wui-flex {
    overflow: hidden;
    border-radius: inherit;
    border-radius: var(--local-border-radius);
  }

  :host::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: inherit;
    border: 1px solid var(--wui-color-gray-glass-010);
    pointer-events: none;
  }

  :host([name='Extension'])::after {
    border: 1px solid var(--wui-color-accent-glass-010);
  }

  :host([data-wallet-icon='allWallets']) {
    background-color: var(--wui-all-wallets-bg-100);
  }

  :host([data-wallet-icon='allWallets'])::after {
    border: 1px solid var(--wui-color-accent-glass-010);
  }

  wui-icon[data-parent-size='inherit'] {
    width: 75%;
    height: 75%;
    align-items: center;
  }

  wui-icon[data-parent-size='sm'] {
    width: 18px;
    height: 18px;
  }

  wui-icon[data-parent-size='md'] {
    width: 24px;
    height: 24px;
  }

  wui-icon[data-parent-size='lg'] {
    width: 42px;
    height: 42px;
  }

  wui-icon[data-parent-size='full'] {
    width: 100%;
    height: 100%;
  }

  :host > wui-icon-box {
    position: absolute;
    overflow: hidden;
    right: -1px;
    bottom: -2px;
    z-index: 1;
    border: 2px solid var(--wui-color-bg-150, #1e1f1f);
    padding: 1px;
  }
`;var z=globalThis&&globalThis.__decorate||function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let A=class extends o{constructor(){super(...arguments),this.size="md",this.name="",this.installed=!1,this.badgeSize="xs"}render(){let t="xxs";return t="lg"===this.size?"m":"md"===this.size?"xs":"xxs",this.style.cssText=`\n       --local-border-radius: var(--wui-border-radius-${t});\n       --local-size: var(--wui-wallet-image-size-${this.size});\n   `,this.walletIcon&&(this.dataset.walletIcon=this.walletIcon),r`
      <wui-flex justifyContent="center" alignItems="center"> ${this.templateVisual()} </wui-flex>
    `}templateVisual(){return this.imageSrc?r`<wui-image src=${this.imageSrc} alt=${this.name}></wui-image>`:this.walletIcon?r`<wui-icon
        data-parent-size="md"
        size="md"
        color="inherit"
        name=${this.walletIcon}
      ></wui-icon>`:r`<wui-icon
      data-parent-size=${this.size}
      size="inherit"
      color="inherit"
      name="walletPlaceholder"
    ></wui-icon>`}};A.styles=[e,i,L],z([T()],A.prototype,"size",void 0),z([T()],A.prototype,"name",void 0),z([T()],A.prototype,"imageSrc",void 0),z([T()],A.prototype,"walletIcon",void 0),z([T({type:Boolean})],A.prototype,"installed",void 0),z([T()],A.prototype,"badgeSize",void 0),A=z([I("wui-wallet-image")],A);const B=t`
  :host {
    position: relative;
    border-radius: var(--wui-border-radius-xxs);
    width: 40px;
    height: 40px;
    overflow: hidden;
    background: var(--wui-color-gray-glass-002);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--wui-spacing-4xs);
    padding: 3.75px !important;
  }

  :host::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: inherit;
    border: 1px solid var(--wui-color-gray-glass-010);
    pointer-events: none;
  }

  :host > wui-wallet-image {
    width: 14px;
    height: 14px;
    border-radius: var(--wui-border-radius-5xs);
  }

  :host > wui-flex {
    padding: 2px;
    position: fixed;
    overflow: hidden;
    left: 34px;
    bottom: 8px;
    background: var(--dark-background-150, #1e1f1f);
    border-radius: 50%;
    z-index: 2;
    display: flex;
  }
`;var W=globalThis&&globalThis.__decorate||function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let D=class extends o{constructor(){super(...arguments),this.walletImages=[]}render(){const t=this.walletImages.length<4;return r`${this.walletImages.slice(0,4).map(({src:t,walletName:e})=>r`
            <wui-wallet-image
              size="inherit"
              imageSrc=${t}
              name=${E(e)}
            ></wui-wallet-image>
          `)}
      ${t?[...Array(4-this.walletImages.length)].map(()=>r` <wui-wallet-image size="inherit" name=""></wui-wallet-image>`):null}
      <wui-flex>
        <wui-icon-box
          size="xxs"
          iconSize="xxs"
          iconcolor="success-100"
          backgroundcolor="success-100"
          icon="checkmark"
          background="opaque"
        ></wui-icon-box>
      </wui-flex>`}};D.styles=[i,B],W([T({type:Array})],D.prototype,"walletImages",void 0),D=W([I("wui-all-wallets-image")],D);const N=t`
  button {
    column-gap: var(--wui-spacing-s);
    padding: 7px var(--wui-spacing-l) 7px var(--wui-spacing-xs);
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-100);
  }

  button > wui-text:nth-child(2) {
    display: flex;
    flex: 1;
  }

  button:disabled {
    background-color: var(--wui-color-gray-glass-015);
    color: var(--wui-color-gray-glass-015);
  }

  button:disabled > wui-tag {
    background-color: var(--wui-color-gray-glass-010);
    color: var(--wui-color-fg-300);
  }

  wui-icon {
    color: var(--wui-color-fg-200) !important;
  }
`;var M=globalThis&&globalThis.__decorate||function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let U=class extends o{constructor(){super(...arguments),this.walletImages=[],this.imageSrc="",this.name="",this.tabIdx=void 0,this.installed=!1,this.disabled=!1,this.showAllWallets=!1,this.loading=!1,this.loadingSpinnerColor="accent-100"}render(){return r`
      <button ?disabled=${this.disabled} tabindex=${E(this.tabIdx)}>
        ${this.templateAllWallets()} ${this.templateWalletImage()}
        <wui-text variant="paragraph-500" color="inherit">${this.name}</wui-text>
        ${this.templateStatus()}
      </button>
    `}templateAllWallets(){return this.showAllWallets&&this.imageSrc?r` <wui-all-wallets-image .imageeSrc=${this.imageSrc}> </wui-all-wallets-image> `:this.showAllWallets&&this.walletIcon?r` <wui-wallet-image .walletIcon=${this.walletIcon} size="sm"> </wui-wallet-image> `:null}templateWalletImage(){return!this.showAllWallets&&this.imageSrc?r`<wui-wallet-image
        size="sm"
        imageSrc=${this.imageSrc}
        name=${this.name}
        .installed=${this.installed}
      ></wui-wallet-image>`:this.showAllWallets||this.imageSrc?null:r`<wui-wallet-image size="sm" name=${this.name}></wui-wallet-image>`}templateStatus(){return this.loading?r`<wui-loading-spinner
        size="lg"
        color=${this.loadingSpinnerColor}
      ></wui-loading-spinner>`:this.tagLabel&&this.tagVariant?r`<wui-tag variant=${this.tagVariant}>${this.tagLabel}</wui-tag>`:this.icon?r`<wui-icon color="inherit" size="sm" name=${this.icon}></wui-icon>`:null}};U.styles=[i,e,N],M([T({type:Array})],U.prototype,"walletImages",void 0),M([T()],U.prototype,"imageSrc",void 0),M([T()],U.prototype,"name",void 0),M([T()],U.prototype,"tagLabel",void 0),M([T()],U.prototype,"tagVariant",void 0),M([T()],U.prototype,"icon",void 0),M([T()],U.prototype,"walletIcon",void 0),M([T()],U.prototype,"tabIdx",void 0),M([T({type:Boolean})],U.prototype,"installed",void 0),M([T({type:Boolean})],U.prototype,"disabled",void 0),M([T({type:Boolean})],U.prototype,"showAllWallets",void 0),M([T({type:Boolean})],U.prototype,"loading",void 0),M([T({type:String})],U.prototype,"loadingSpinnerColor",void 0),U=M([I("wui-list-wallet")],U);var q=globalThis&&globalThis.__decorate||function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let K=class extends o{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=n.state.connectors,this.count=a.state.count,this.filteredCount=a.state.filteredWallets.length,this.isFetchingRecommendedWallets=a.state.isFetchingRecommendedWallets,this.unsubscribe.push(n.subscribeKey("connectors",t=>this.connectors=t),a.subscribeKey("count",t=>this.count=t),a.subscribeKey("filteredWallets",t=>this.filteredCount=t.length),a.subscribeKey("isFetchingRecommendedWallets",t=>this.isFetchingRecommendedWallets=t))}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){const t=this.connectors.find(t=>"walletConnect"===t.id),{allWallets:e}=u.state;if(!t||"HIDE"===e)return null;if("ONLY_MOBILE"===e&&!s.isMobile())return null;const i=a.state.featured.length,o=this.count+i,n=o<10?o:10*Math.floor(o/10),l=this.filteredCount>0?this.filteredCount:n;let c=`${l}`;return this.filteredCount>0?c=`${this.filteredCount}`:l<o&&(c=`${l}+`),r`
      <wui-list-wallet
        name="All Wallets"
        walletIcon="allWallets"
        showAllWallets
        @click=${this.onAllWallets.bind(this)}
        tagLabel=${c}
        tagVariant="shade"
        data-testid="all-wallets"
        tabIdx=${E(this.tabIdx)}
        .loading=${this.isFetchingRecommendedWallets}
        loadingSpinnerColor=${this.isFetchingRecommendedWallets?"fg-300":"accent-100"}
      ></wui-list-wallet>
    `}onAllWallets(){l.sendEvent({type:"track",event:"CLICK_ALL_WALLETS"}),c.push("AllWallets")}};q([T()],K.prototype,"tabIdx",void 0),q([_()],K.prototype,"connectors",void 0),q([_()],K.prototype,"count",void 0),q([_()],K.prototype,"filteredCount",void 0),q([_()],K.prototype,"isFetchingRecommendedWallets",void 0),K=q([I("w3m-all-wallets-widget")],K);var V=globalThis&&globalThis.__decorate||function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let H=class extends o{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=n.state.connectors,this.unsubscribe.push(n.subscribeKey("connectors",t=>this.connectors=t))}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){const t=this.connectors.filter(t=>"ANNOUNCED"===t.type);return(null==t?void 0:t.length)?r`
      <wui-flex flexDirection="column" gap="xs">
        ${t.filter(d.showConnector).map(t=>r`
              <wui-list-wallet
                imageSrc=${E(h.getConnectorImage(t))}
                name=${t.name??"Unknown"}
                @click=${()=>this.onConnector(t)}
                tagVariant="success"
                tagLabel="installed"
                data-testid=${`wallet-selector-${t.id}`}
                .installed=${!0}
                tabIdx=${E(this.tabIdx)}
              >
              </wui-list-wallet>
            `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnector(t){"walletConnect"===t.id?s.isMobile()?c.push("AllWallets"):c.push("ConnectingWalletConnect"):c.push("ConnectingExternal",{connector:t})}};V([T()],H.prototype,"tabIdx",void 0),V([_()],H.prototype,"connectors",void 0),H=V([I("w3m-connect-announced-widget")],H);var F=globalThis&&globalThis.__decorate||function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let Y=class extends o{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=n.state.connectors,this.loading=!1,this.unsubscribe.push(n.subscribeKey("connectors",t=>this.connectors=t)),s.isTelegram()&&s.isIos()&&(this.loading=!p.state.wcUri,this.unsubscribe.push(p.subscribeKey("wcUri",t=>this.loading=!t)))}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){const{customWallets:t}=u.state;if(!(null==t?void 0:t.length))return this.style.cssText="display: none",null;const e=this.filterOutDuplicateWallets(t);return r`<wui-flex flexDirection="column" gap="xs">
      ${e.map(t=>r`
          <wui-list-wallet
            imageSrc=${E(h.getWalletImage(t))}
            name=${t.name??"Unknown"}
            @click=${()=>this.onConnectWallet(t)}
            data-testid=${`wallet-selector-${t.id}`}
            tabIdx=${E(this.tabIdx)}
            ?loading=${this.loading}
          >
          </wui-list-wallet>
        `)}
    </wui-flex>`}filterOutDuplicateWallets(t){const e=g.getRecentWallets(),i=this.connectors.map(t=>{var e;return null==(e=t.info)?void 0:e.rdns}).filter(Boolean),o=e.map(t=>t.rdns).filter(Boolean),r=i.concat(o);if(r.includes("io.metamask.mobile")&&s.isMobile()){const t=r.indexOf("io.metamask.mobile");r[t]="io.metamask"}return t.filter(t=>!r.includes(String(null==t?void 0:t.rdns)))}onConnectWallet(t){this.loading||c.push("ConnectingWalletConnect",{wallet:t})}};F([T()],Y.prototype,"tabIdx",void 0),F([_()],Y.prototype,"connectors",void 0),F([_()],Y.prototype,"loading",void 0),Y=F([I("w3m-connect-custom-widget")],Y);var J=globalThis&&globalThis.__decorate||function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let Q=class extends o{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=n.state.connectors,this.unsubscribe.push(n.subscribeKey("connectors",t=>this.connectors=t))}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){const t=this.connectors.filter(t=>"EXTERNAL"===t.type).filter(d.showConnector).filter(t=>t.id!==w.CONNECTOR_ID.COINBASE_SDK);return(null==t?void 0:t.length)?r`
      <wui-flex flexDirection="column" gap="xs">
        ${t.map(t=>r`
            <wui-list-wallet
              imageSrc=${E(h.getConnectorImage(t))}
              .installed=${!0}
              name=${t.name??"Unknown"}
              data-testid=${`wallet-selector-external-${t.id}`}
              @click=${()=>this.onConnector(t)}
              tabIdx=${E(this.tabIdx)}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnector(t){c.push("ConnectingExternal",{connector:t})}};J([T()],Q.prototype,"tabIdx",void 0),J([_()],Q.prototype,"connectors",void 0),Q=J([I("w3m-connect-external-widget")],Q);var X=globalThis&&globalThis.__decorate||function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let G=class extends o{constructor(){super(...arguments),this.tabIdx=void 0,this.wallets=[]}render(){return this.wallets.length?r`
      <wui-flex flexDirection="column" gap="xs">
        ${this.wallets.map(t=>r`
            <wui-list-wallet
              data-testid=${`wallet-selector-featured-${t.id}`}
              imageSrc=${E(h.getWalletImage(t))}
              name=${t.name??"Unknown"}
              @click=${()=>this.onConnectWallet(t)}
              tabIdx=${E(this.tabIdx)}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnectWallet(t){n.selectWalletConnector(t)}};X([T()],G.prototype,"tabIdx",void 0),X([T()],G.prototype,"wallets",void 0),G=X([I("w3m-connect-featured-widget")],G);var Z=globalThis&&globalThis.__decorate||function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let tt=class extends o{constructor(){super(...arguments),this.tabIdx=void 0,this.connectors=[]}render(){const t=this.connectors.filter(d.showConnector);return 0===t.length?(this.style.cssText="display: none",null):r`
      <wui-flex flexDirection="column" gap="xs">
        ${t.map(t=>r`
            <wui-list-wallet
              imageSrc=${E(h.getConnectorImage(t))}
              .installed=${!0}
              name=${t.name??"Unknown"}
              tagVariant="success"
              tagLabel="installed"
              data-testid=${`wallet-selector-${t.id}`}
              @click=${()=>this.onConnector(t)}
              tabIdx=${E(this.tabIdx)}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `}onConnector(t){n.setActiveConnector(t),c.push("ConnectingExternal",{connector:t})}};Z([T()],tt.prototype,"tabIdx",void 0),Z([T()],tt.prototype,"connectors",void 0),tt=Z([I("w3m-connect-injected-widget")],tt);var et=globalThis&&globalThis.__decorate||function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let it=class extends o{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=n.state.connectors,this.unsubscribe.push(n.subscribeKey("connectors",t=>this.connectors=t))}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){const t=this.connectors.filter(t=>"MULTI_CHAIN"===t.type&&"WalletConnect"!==t.name);return(null==t?void 0:t.length)?r`
      <wui-flex flexDirection="column" gap="xs">
        ${t.map(t=>r`
            <wui-list-wallet
              imageSrc=${E(h.getConnectorImage(t))}
              .installed=${!0}
              name=${t.name??"Unknown"}
              tagVariant="shade"
              tagLabel="multichain"
              data-testid=${`wallet-selector-${t.id}`}
              @click=${()=>this.onConnector(t)}
              tabIdx=${E(this.tabIdx)}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnector(t){n.setActiveConnector(t),c.push("ConnectingMultiChain")}};et([T()],it.prototype,"tabIdx",void 0),et([_()],it.prototype,"connectors",void 0),it=et([I("w3m-connect-multi-chain-widget")],it);var ot=globalThis&&globalThis.__decorate||function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let rt=class extends o{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=n.state.connectors,this.loading=!1,this.unsubscribe.push(n.subscribeKey("connectors",t=>this.connectors=t)),s.isTelegram()&&s.isIos()&&(this.loading=!p.state.wcUri,this.unsubscribe.push(p.subscribeKey("wcUri",t=>this.loading=!t)))}render(){const t=g.getRecentWallets().filter(t=>!f.isExcluded(t)).filter(t=>!this.hasWalletConnector(t)).filter(t=>this.isWalletCompatibleWithCurrentChain(t));return t.length?r`
      <wui-flex flexDirection="column" gap="xs">
        ${t.map(t=>r`
            <wui-list-wallet
              imageSrc=${E(h.getWalletImage(t))}
              name=${t.name??"Unknown"}
              @click=${()=>this.onConnectWallet(t)}
              tagLabel="recent"
              tagVariant="shade"
              tabIdx=${E(this.tabIdx)}
              ?loading=${this.loading}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnectWallet(t){this.loading||n.selectWalletConnector(t)}hasWalletConnector(t){return this.connectors.some(e=>e.id===t.id||e.name===t.name)}isWalletCompatibleWithCurrentChain(t){const e=b.state.activeChain;return!e||!t.chains||t.chains.some(t=>{const i=t.split(":")[0];return e===i})}};ot([T()],rt.prototype,"tabIdx",void 0),ot([_()],rt.prototype,"connectors",void 0),ot([_()],rt.prototype,"loading",void 0),rt=ot([I("w3m-connect-recent-widget")],rt);var nt=globalThis&&globalThis.__decorate||function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let at=class extends o{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.wallets=[],this.loading=!1,s.isTelegram()&&s.isIos()&&(this.loading=!p.state.wcUri,this.unsubscribe.push(p.subscribeKey("wcUri",t=>this.loading=!t)))}render(){const{connectors:t}=n.state,{customWallets:e,featuredWalletIds:i}=u.state,o=g.getRecentWallets(),a=t.find(t=>"walletConnect"===t.id),s=t.filter(t=>"INJECTED"===t.type||"ANNOUNCED"===t.type||"MULTI_CHAIN"===t.type).filter(t=>"Browser Wallet"!==t.name);if(!a)return null;if(i||e||!this.wallets.length)return this.style.cssText="display: none",null;const l=s.length+o.length,c=Math.max(0,2-l),d=f.filterOutDuplicateWallets(this.wallets).slice(0,c);return d.length?r`
      <wui-flex flexDirection="column" gap="xs">
        ${d.map(t=>r`
            <wui-list-wallet
              imageSrc=${E(h.getWalletImage(t))}
              name=${(null==t?void 0:t.name)??"Unknown"}
              @click=${()=>this.onConnectWallet(t)}
              tabIdx=${E(this.tabIdx)}
              ?loading=${this.loading}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnectWallet(t){if(this.loading)return;const e=n.getConnector(t.id,t.rdns);e?c.push("ConnectingExternal",{connector:e}):c.push("ConnectingWalletConnect",{wallet:t})}};nt([T()],at.prototype,"tabIdx",void 0),nt([T()],at.prototype,"wallets",void 0),nt([_()],at.prototype,"loading",void 0),at=nt([I("w3m-connect-recommended-widget")],at);var st=globalThis&&globalThis.__decorate||function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let lt=class extends o{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=n.state.connectors,this.connectorImages=v.state.connectorImages,this.unsubscribe.push(n.subscribeKey("connectors",t=>this.connectors=t),v.subscribeKey("connectorImages",t=>this.connectorImages=t))}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){if(s.isMobile())return this.style.cssText="display: none",null;const t=this.connectors.find(t=>"walletConnect"===t.id);if(!t)return this.style.cssText="display: none",null;const e=t.imageUrl||this.connectorImages[(null==t?void 0:t.imageId)??""];return r`
      <wui-list-wallet
        imageSrc=${E(e)}
        name=${t.name??"Unknown"}
        @click=${()=>this.onConnector(t)}
        tagLabel="qr code"
        tagVariant="main"
        tabIdx=${E(this.tabIdx)}
        data-testid="wallet-selector-walletconnect"
      >
      </wui-list-wallet>
    `}onConnector(t){n.setActiveConnector(t),c.push("ConnectingWalletConnect")}};st([T()],lt.prototype,"tabIdx",void 0),st([_()],lt.prototype,"connectors",void 0),st([_()],lt.prototype,"connectorImages",void 0),lt=st([I("w3m-connect-walletconnect-widget")],lt);const ct=t`
  :host {
    margin-top: var(--wui-spacing-3xs);
  }
  wui-separator {
    margin: var(--wui-spacing-m) calc(var(--wui-spacing-m) * -1) var(--wui-spacing-xs)
      calc(var(--wui-spacing-m) * -1);
    width: calc(100% + var(--wui-spacing-s) * 2);
  }
`;var ut=globalThis&&globalThis.__decorate||function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let dt=class extends o{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=n.state.connectors,this.recommended=a.state.recommended,this.featured=a.state.featured,this.unsubscribe.push(n.subscribeKey("connectors",t=>this.connectors=t),a.subscribeKey("recommended",t=>this.recommended=t),a.subscribeKey("featured",t=>this.featured=t))}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){return r`
      <wui-flex flexDirection="column" gap="xs"> ${this.connectorListTemplate()} </wui-flex>
    `}connectorListTemplate(){const{custom:t,recent:e,announced:i,injected:o,multiChain:n,recommended:a,featured:s,external:l}=d.getConnectorsByType(this.connectors,this.recommended,this.featured);return d.getConnectorTypeOrder({custom:t,recent:e,announced:i,injected:o,multiChain:n,recommended:a,featured:s,external:l}).map(t=>{switch(t){case"injected":return r`
            ${n.length?r`<w3m-connect-multi-chain-widget
                  tabIdx=${E(this.tabIdx)}
                ></w3m-connect-multi-chain-widget>`:null}
            ${i.length?r`<w3m-connect-announced-widget
                  tabIdx=${E(this.tabIdx)}
                ></w3m-connect-announced-widget>`:null}
            ${o.length?r`<w3m-connect-injected-widget
                  .connectors=${o}
                  tabIdx=${E(this.tabIdx)}
                ></w3m-connect-injected-widget>`:null}
          `;case"walletConnect":return r`<w3m-connect-walletconnect-widget
            tabIdx=${E(this.tabIdx)}
          ></w3m-connect-walletconnect-widget>`;case"recent":return r`<w3m-connect-recent-widget
            tabIdx=${E(this.tabIdx)}
          ></w3m-connect-recent-widget>`;case"featured":return r`<w3m-connect-featured-widget
            .wallets=${s}
            tabIdx=${E(this.tabIdx)}
          ></w3m-connect-featured-widget>`;case"custom":return r`<w3m-connect-custom-widget
            tabIdx=${E(this.tabIdx)}
          ></w3m-connect-custom-widget>`;case"external":return r`<w3m-connect-external-widget
            tabIdx=${E(this.tabIdx)}
          ></w3m-connect-external-widget>`;case"recommended":return r`<w3m-connect-recommended-widget
            .wallets=${a}
            tabIdx=${E(this.tabIdx)}
          ></w3m-connect-recommended-widget>`;default:return console.warn(`Unknown connector type: ${t}`),null}})}};dt.styles=ct,ut([T()],dt.prototype,"tabIdx",void 0),ut([_()],dt.prototype,"connectors",void 0),ut([_()],dt.prototype,"recommended",void 0),ut([_()],dt.prototype,"featured",void 0),dt=ut([I("w3m-connector-list")],dt);const ht=t`
  :host {
    display: inline-flex;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-3xl);
    padding: var(--wui-spacing-3xs);
    position: relative;
    height: 36px;
    min-height: 36px;
    overflow: hidden;
  }

  :host::before {
    content: '';
    position: absolute;
    pointer-events: none;
    top: 4px;
    left: 4px;
    display: block;
    width: var(--local-tab-width);
    height: 28px;
    border-radius: var(--wui-border-radius-3xl);
    background-color: var(--wui-color-gray-glass-002);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    transform: translateX(calc(var(--local-tab) * var(--local-tab-width)));
    transition: transform var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color, opacity;
  }

  :host([data-type='flex'])::before {
    left: 3px;
    transform: translateX(calc((var(--local-tab) * 34px) + (var(--local-tab) * 4px)));
  }

  :host([data-type='flex']) {
    display: flex;
    padding: 0px 0px 0px 12px;
    gap: 4px;
  }

  :host([data-type='flex']) > button > wui-text {
    position: absolute;
    left: 18px;
    opacity: 0;
  }

  button[data-active='true'] > wui-icon,
  button[data-active='true'] > wui-text {
    color: var(--wui-color-fg-100);
  }

  button[data-active='false'] > wui-icon,
  button[data-active='false'] > wui-text {
    color: var(--wui-color-fg-200);
  }

  button[data-active='true']:disabled,
  button[data-active='false']:disabled {
    background-color: transparent;
    opacity: 0.5;
    cursor: not-allowed;
  }

  button[data-active='true']:disabled > wui-text {
    color: var(--wui-color-fg-200);
  }

  button[data-active='false']:disabled > wui-text {
    color: var(--wui-color-fg-300);
  }

  button > wui-icon,
  button > wui-text {
    pointer-events: none;
    transition: color var(--wui-e ase-out-power-1) var(--wui-duration-md);
    will-change: color;
  }

  button {
    width: var(--local-tab-width);
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color;
  }

  :host([data-type='flex']) > button {
    width: 34px;
    position: relative;
    display: flex;
    justify-content: flex-start;
  }

  button:hover:enabled,
  button:active:enabled {
    background-color: transparent !important;
  }

  button:hover:enabled > wui-icon,
  button:active:enabled > wui-icon {
    transition: all var(--wui-ease-out-power-1) var(--wui-duration-lg);
    color: var(--wui-color-fg-125);
  }

  button:hover:enabled > wui-text,
  button:active:enabled > wui-text {
    transition: all var(--wui-ease-out-power-1) var(--wui-duration-lg);
    color: var(--wui-color-fg-125);
  }

  button {
    border-radius: var(--wui-border-radius-3xl);
  }
`;var pt=globalThis&&globalThis.__decorate||function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let gt=class extends o{constructor(){super(...arguments),this.tabs=[],this.onTabChange=()=>null,this.buttons=[],this.disabled=!1,this.localTabWidth="100px",this.activeTab=0,this.isDense=!1}render(){return this.isDense=this.tabs.length>3,this.style.cssText=`\n      --local-tab: ${this.activeTab};\n      --local-tab-width: ${this.localTabWidth};\n    `,this.dataset.type=this.isDense?"flex":"block",this.tabs.map((t,e)=>{var i;const o=e===this.activeTab;return r`
        <button
          ?disabled=${this.disabled}
          @click=${()=>this.onTabClick(e)}
          data-active=${o}
          data-testid="tab-${null==(i=t.label)?void 0:i.toLowerCase()}"
        >
          ${this.iconTemplate(t)}
          <wui-text variant="small-600" color="inherit"> ${t.label} </wui-text>
        </button>
      `})}firstUpdated(){this.shadowRoot&&this.isDense&&(this.buttons=[...this.shadowRoot.querySelectorAll("button")],setTimeout(()=>{this.animateTabs(0,!0)},0))}iconTemplate(t){return t.icon?r`<wui-icon size="xs" color="inherit" name=${t.icon}></wui-icon>`:null}onTabClick(t){this.buttons&&this.animateTabs(t,!1),this.activeTab=t,this.onTabChange(t)}animateTabs(t,e){const i=this.buttons[this.activeTab],o=this.buttons[t],r=null==i?void 0:i.querySelector("wui-text"),n=null==o?void 0:o.querySelector("wui-text"),a=null==o?void 0:o.getBoundingClientRect(),s=null==n?void 0:n.getBoundingClientRect();i&&r&&!e&&t!==this.activeTab&&(r.animate([{opacity:0}],{duration:50,easing:"ease",fill:"forwards"}),i.animate([{width:"34px"}],{duration:500,easing:"ease",fill:"forwards"})),o&&a&&s&&n&&(t!==this.activeTab||e)&&(this.localTabWidth=`${Math.round(a.width+s.width)+6}px`,o.animate([{width:`${a.width+s.width}px`}],{duration:e?0:500,fill:"forwards",easing:"ease"}),n.animate([{opacity:1}],{duration:e?0:125,delay:e?0:200,fill:"forwards",easing:"ease"}))}};gt.styles=[i,e,ht],pt([T({type:Array})],gt.prototype,"tabs",void 0),pt([T()],gt.prototype,"onTabChange",void 0),pt([T({type:Array})],gt.prototype,"buttons",void 0),pt([T({type:Boolean})],gt.prototype,"disabled",void 0),pt([T()],gt.prototype,"localTabWidth",void 0),pt([_()],gt.prototype,"activeTab",void 0),pt([_()],gt.prototype,"isDense",void 0),gt=pt([I("wui-tabs")],gt);var wt=globalThis&&globalThis.__decorate||function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let ft=class extends o{constructor(){super(...arguments),this.platformTabs=[],this.unsubscribe=[],this.platforms=[],this.onSelectPlatfrom=void 0}disconnectCallback(){this.unsubscribe.forEach(t=>t())}render(){const t=this.generateTabs();return r`
      <wui-flex justifyContent="center" .padding=${["0","0","l","0"]}>
        <wui-tabs .tabs=${t} .onTabChange=${this.onTabChange.bind(this)}></wui-tabs>
      </wui-flex>
    `}generateTabs(){const t=this.platforms.map(t=>"browser"===t?{label:"Browser",icon:"extension",platform:"browser"}:"mobile"===t?{label:"Mobile",icon:"mobile",platform:"mobile"}:"qrcode"===t?{label:"Mobile",icon:"mobile",platform:"qrcode"}:"web"===t?{label:"Webapp",icon:"browser",platform:"web"}:"desktop"===t?{label:"Desktop",icon:"desktop",platform:"desktop"}:{label:"Browser",icon:"extension",platform:"unsupported"});return this.platformTabs=t.map(({platform:t})=>t),t}onTabChange(t){var e;const i=this.platformTabs[t];i&&(null==(e=this.onSelectPlatfrom)||e.call(this,i))}};wt([T({type:Array})],ft.prototype,"platforms",void 0),wt([T()],ft.prototype,"onSelectPlatfrom",void 0),ft=wt([I("w3m-connecting-header")],ft);const bt=t`
  :host {
    width: var(--local-width);
    position: relative;
  }

  button {
    border: none;
    border-radius: var(--local-border-radius);
    width: var(--local-width);
    white-space: nowrap;
  }

  /* -- Sizes --------------------------------------------------- */
  button[data-size='md'] {
    padding: 8.2px var(--wui-spacing-l) 9px var(--wui-spacing-l);
    height: 36px;
  }

  button[data-size='md'][data-icon-left='true'][data-icon-right='false'] {
    padding: 8.2px var(--wui-spacing-l) 9px var(--wui-spacing-s);
  }

  button[data-size='md'][data-icon-right='true'][data-icon-left='false'] {
    padding: 8.2px var(--wui-spacing-s) 9px var(--wui-spacing-l);
  }

  button[data-size='lg'] {
    padding: var(--wui-spacing-m) var(--wui-spacing-2l);
    height: 48px;
  }

  /* -- Variants --------------------------------------------------------- */
  button[data-variant='main'] {
    background-color: var(--wui-color-accent-100);
    color: var(--wui-color-inverse-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-variant='inverse'] {
    background-color: var(--wui-color-inverse-100);
    color: var(--wui-color-inverse-000);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-variant='accent'] {
    background-color: var(--wui-color-accent-glass-010);
    color: var(--wui-color-accent-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  button[data-variant='accent-error'] {
    background: var(--wui-color-error-glass-015);
    color: var(--wui-color-error-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-error-glass-010);
  }

  button[data-variant='accent-success'] {
    background: var(--wui-color-success-glass-015);
    color: var(--wui-color-success-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-success-glass-010);
  }

  button[data-variant='neutral'] {
    background: transparent;
    color: var(--wui-color-fg-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  /* -- Focus states --------------------------------------------------- */
  button[data-variant='main']:focus-visible:enabled {
    background-color: var(--wui-color-accent-090);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0 0 0 4px var(--wui-color-accent-glass-020);
  }
  button[data-variant='inverse']:focus-visible:enabled {
    background-color: var(--wui-color-inverse-100);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-gray-glass-010),
      0 0 0 4px var(--wui-color-accent-glass-020);
  }
  button[data-variant='accent']:focus-visible:enabled {
    background-color: var(--wui-color-accent-glass-010);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0 0 0 4px var(--wui-color-accent-glass-020);
  }
  button[data-variant='accent-error']:focus-visible:enabled {
    background: var(--wui-color-error-glass-015);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-error-100),
      0 0 0 4px var(--wui-color-error-glass-020);
  }
  button[data-variant='accent-success']:focus-visible:enabled {
    background: var(--wui-color-success-glass-015);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-success-100),
      0 0 0 4px var(--wui-color-success-glass-020);
  }
  button[data-variant='neutral']:focus-visible:enabled {
    background: var(--wui-color-gray-glass-005);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-gray-glass-010),
      0 0 0 4px var(--wui-color-gray-glass-002);
  }

  /* -- Hover & Active states ----------------------------------------------------------- */
  @media (hover: hover) and (pointer: fine) {
    button[data-variant='main']:hover:enabled {
      background-color: var(--wui-color-accent-090);
    }

    button[data-variant='main']:active:enabled {
      background-color: var(--wui-color-accent-080);
    }

    button[data-variant='accent']:hover:enabled {
      background-color: var(--wui-color-accent-glass-015);
    }

    button[data-variant='accent']:active:enabled {
      background-color: var(--wui-color-accent-glass-020);
    }

    button[data-variant='accent-error']:hover:enabled {
      background: var(--wui-color-error-glass-020);
      color: var(--wui-color-error-100);
    }

    button[data-variant='accent-error']:active:enabled {
      background: var(--wui-color-error-glass-030);
      color: var(--wui-color-error-100);
    }

    button[data-variant='accent-success']:hover:enabled {
      background: var(--wui-color-success-glass-020);
      color: var(--wui-color-success-100);
    }

    button[data-variant='accent-success']:active:enabled {
      background: var(--wui-color-success-glass-030);
      color: var(--wui-color-success-100);
    }

    button[data-variant='neutral']:hover:enabled {
      background: var(--wui-color-gray-glass-002);
    }

    button[data-variant='neutral']:active:enabled {
      background: var(--wui-color-gray-glass-005);
    }

    button[data-size='lg'][data-icon-left='true'][data-icon-right='false'] {
      padding-left: var(--wui-spacing-m);
    }

    button[data-size='lg'][data-icon-right='true'][data-icon-left='false'] {
      padding-right: var(--wui-spacing-m);
    }
  }

  /* -- Disabled state --------------------------------------------------- */
  button:disabled {
    background-color: var(--wui-color-gray-glass-002);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    color: var(--wui-color-gray-glass-020);
    cursor: not-allowed;
  }

  button > wui-text {
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
    opacity: var(--local-opacity-100);
  }

  ::slotted(*) {
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
    opacity: var(--local-opacity-100);
  }

  wui-loading-spinner {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: var(--local-opacity-000);
  }
`;var vt=globalThis&&globalThis.__decorate||function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};const mt={main:"inverse-100",inverse:"inverse-000",accent:"accent-100","accent-error":"error-100","accent-success":"success-100",neutral:"fg-100",disabled:"gray-glass-020"},yt={lg:"paragraph-600",md:"small-600"},xt={lg:"md",md:"md"};let $t=class extends o{constructor(){super(...arguments),this.size="lg",this.disabled=!1,this.fullWidth=!1,this.loading=!1,this.variant="main",this.hasIconLeft=!1,this.hasIconRight=!1,this.borderRadius="m"}render(){this.style.cssText=`\n    --local-width: ${this.fullWidth?"100%":"auto"};\n    --local-opacity-100: ${this.loading?0:1};\n    --local-opacity-000: ${this.loading?1:0};\n    --local-border-radius: var(--wui-border-radius-${this.borderRadius});\n    `;const t=this.textVariant??yt[this.size];return r`
      <button
        data-variant=${this.variant}
        data-icon-left=${this.hasIconLeft}
        data-icon-right=${this.hasIconRight}
        data-size=${this.size}
        ?disabled=${this.disabled}
      >
        ${this.loadingTemplate()}
        <slot name="iconLeft" @slotchange=${()=>this.handleSlotLeftChange()}></slot>
        <wui-text variant=${t} color="inherit">
          <slot></slot>
        </wui-text>
        <slot name="iconRight" @slotchange=${()=>this.handleSlotRightChange()}></slot>
      </button>
    `}handleSlotLeftChange(){this.hasIconLeft=!0}handleSlotRightChange(){this.hasIconRight=!0}loadingTemplate(){if(this.loading){const t=xt[this.size],e=this.disabled?mt.disabled:mt[this.variant];return r`<wui-loading-spinner color=${e} size=${t}></wui-loading-spinner>`}return r``}};$t.styles=[i,e,bt],vt([T()],$t.prototype,"size",void 0),vt([T({type:Boolean})],$t.prototype,"disabled",void 0),vt([T({type:Boolean})],$t.prototype,"fullWidth",void 0),vt([T({type:Boolean})],$t.prototype,"loading",void 0),vt([T()],$t.prototype,"variant",void 0),vt([T({type:Boolean})],$t.prototype,"hasIconLeft",void 0),vt([T({type:Boolean})],$t.prototype,"hasIconRight",void 0),vt([T()],$t.prototype,"borderRadius",void 0),vt([T()],$t.prototype,"textVariant",void 0),$t=vt([I("wui-button")],$t);const Ct=t`
  button {
    padding: var(--wui-spacing-4xs) var(--wui-spacing-xxs);
    border-radius: var(--wui-border-radius-3xs);
    background-color: transparent;
    color: var(--wui-color-accent-100);
  }

  button:disabled {
    background-color: transparent;
    color: var(--wui-color-gray-glass-015);
  }

  button:hover {
    background-color: var(--wui-color-gray-glass-005);
  }
`;var kt=globalThis&&globalThis.__decorate||function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let Rt=class extends o{constructor(){super(...arguments),this.tabIdx=void 0,this.disabled=!1,this.color="inherit"}render(){return r`
      <button ?disabled=${this.disabled} tabindex=${E(this.tabIdx)}>
        <slot name="iconLeft"></slot>
        <wui-text variant="small-600" color=${this.color}>
          <slot></slot>
        </wui-text>
        <slot name="iconRight"></slot>
      </button>
    `}};Rt.styles=[i,e,Ct],kt([T()],Rt.prototype,"tabIdx",void 0),kt([T({type:Boolean})],Rt.prototype,"disabled",void 0),kt([T()],Rt.prototype,"color",void 0),Rt=kt([I("wui-link")],Rt);const Tt=t`
  :host {
    display: block;
    width: var(--wui-box-size-md);
    height: var(--wui-box-size-md);
  }

  svg {
    width: var(--wui-box-size-md);
    height: var(--wui-box-size-md);
  }

  rect {
    fill: none;
    stroke: var(--wui-color-accent-100);
    stroke-width: 4px;
    stroke-linecap: round;
    animation: dash 1s linear infinite;
  }

  @keyframes dash {
    to {
      stroke-dashoffset: 0px;
    }
  }
`;var It=globalThis&&globalThis.__decorate||function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let Et=class extends o{constructor(){super(...arguments),this.radius=36}render(){return this.svgLoaderTemplate()}svgLoaderTemplate(){const t=this.radius>50?50:this.radius,e=36-t;return r`
      <svg viewBox="0 0 110 110" width="110" height="110">
        <rect
          x="2"
          y="2"
          width="106"
          height="106"
          rx=${t}
          stroke-dasharray="${116+e} ${245+e}"
          stroke-dashoffset=${360+1.75*e}
        />
      </svg>
    `}};Et.styles=[i,Tt],It([T({type:Number})],Et.prototype,"radius",void 0),Et=It([I("wui-loading-thumbnail")],Et);const _t=t`
  button {
    border: none;
    border-radius: var(--wui-border-radius-3xl);
  }

  button[data-variant='main'] {
    background-color: var(--wui-color-accent-100);
    color: var(--wui-color-inverse-100);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-variant='accent'] {
    background-color: var(--wui-color-accent-glass-010);
    color: var(--wui-color-accent-100);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  button[data-variant='gray'] {
    background-color: transparent;
    color: var(--wui-color-fg-200);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-variant='shade'] {
    background-color: transparent;
    color: var(--wui-color-accent-100);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-size='sm'] {
    height: 32px;
    padding: 0 var(--wui-spacing-s);
  }

  button[data-size='md'] {
    height: 40px;
    padding: 0 var(--wui-spacing-l);
  }

  button[data-size='sm'] > wui-image {
    width: 16px;
    height: 16px;
  }

  button[data-size='md'] > wui-image {
    width: 24px;
    height: 24px;
  }

  button[data-size='sm'] > wui-icon {
    width: 12px;
    height: 12px;
  }

  button[data-size='md'] > wui-icon {
    width: 14px;
    height: 14px;
  }

  wui-image {
    border-radius: var(--wui-border-radius-3xl);
    overflow: hidden;
  }

  button.disabled > wui-icon,
  button.disabled > wui-image {
    filter: grayscale(1);
  }

  button[data-variant='main'] > wui-image {
    box-shadow: inset 0 0 0 1px var(--wui-color-accent-090);
  }

  button[data-variant='shade'] > wui-image,
  button[data-variant='gray'] > wui-image {
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  @media (hover: hover) and (pointer: fine) {
    button[data-variant='main']:focus-visible {
      background-color: var(--wui-color-accent-090);
    }

    button[data-variant='main']:hover:enabled {
      background-color: var(--wui-color-accent-090);
    }

    button[data-variant='main']:active:enabled {
      background-color: var(--wui-color-accent-080);
    }

    button[data-variant='accent']:hover:enabled {
      background-color: var(--wui-color-accent-glass-015);
    }

    button[data-variant='accent']:active:enabled {
      background-color: var(--wui-color-accent-glass-020);
    }

    button[data-variant='shade']:focus-visible,
    button[data-variant='gray']:focus-visible,
    button[data-variant='shade']:hover,
    button[data-variant='gray']:hover {
      background-color: var(--wui-color-gray-glass-002);
    }

    button[data-variant='gray']:active,
    button[data-variant='shade']:active {
      background-color: var(--wui-color-gray-glass-005);
    }
  }

  button.disabled {
    color: var(--wui-color-gray-glass-020);
    background-color: var(--wui-color-gray-glass-002);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    pointer-events: none;
  }
`;var Pt=globalThis&&globalThis.__decorate||function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let jt=class extends o{constructor(){super(...arguments),this.variant="accent",this.imageSrc="",this.disabled=!1,this.icon="externalLink",this.size="md",this.text=""}render(){const t="sm"===this.size?"small-600":"paragraph-600";return r`
      <button
        class=${this.disabled?"disabled":""}
        data-variant=${this.variant}
        data-size=${this.size}
      >
        ${this.imageSrc?r`<wui-image src=${this.imageSrc}></wui-image>`:null}
        <wui-text variant=${t} color="inherit"> ${this.text} </wui-text>
        <wui-icon name=${this.icon} color="inherit" size="inherit"></wui-icon>
      </button>
    `}};jt.styles=[i,e,_t],Pt([T()],jt.prototype,"variant",void 0),Pt([T()],jt.prototype,"imageSrc",void 0),Pt([T({type:Boolean})],jt.prototype,"disabled",void 0),Pt([T()],jt.prototype,"icon",void 0),Pt([T()],jt.prototype,"size",void 0),Pt([T()],jt.prototype,"text",void 0),jt=Pt([I("wui-chip-button")],jt);const Ot=t`
  wui-flex {
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
  }
`;var St=globalThis&&globalThis.__decorate||function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let Lt=class extends o{constructor(){super(...arguments),this.disabled=!1,this.label="",this.buttonLabel=""}render(){return r`
      <wui-flex
        justifyContent="space-between"
        alignItems="center"
        .padding=${["1xs","2l","1xs","2l"]}
      >
        <wui-text variant="paragraph-500" color="fg-200">${this.label}</wui-text>
        <wui-chip-button size="sm" variant="shade" text=${this.buttonLabel} icon="chevronRight">
        </wui-chip-button>
      </wui-flex>
    `}};Lt.styles=[i,e,Ot],St([T({type:Boolean})],Lt.prototype,"disabled",void 0),St([T()],Lt.prototype,"label",void 0),St([T()],Lt.prototype,"buttonLabel",void 0),Lt=St([I("wui-cta-button")],Lt);const zt=t`
  :host {
    display: block;
    padding: 0 var(--wui-spacing-xl) var(--wui-spacing-xl);
  }
`;var At=globalThis&&globalThis.__decorate||function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let Bt=class extends o{constructor(){super(...arguments),this.wallet=void 0}render(){if(!this.wallet)return this.style.display="none",null;const{name:t,app_store:e,play_store:i,chrome_store:o,homepage:n}=this.wallet,a=s.isMobile(),l=s.isIos(),u=s.isAndroid(),d=[e,i,n,o].filter(Boolean).length>1,h=P.getTruncateString({string:t,charsStart:12,charsEnd:0,truncate:"end"});return d&&!a?r`
        <wui-cta-button
          label=${`Don't have ${h}?`}
          buttonLabel="Get"
          @click=${()=>c.push("Downloads",{wallet:this.wallet})}
        ></wui-cta-button>
      `:!d&&n?r`
        <wui-cta-button
          label=${`Don't have ${h}?`}
          buttonLabel="Get"
          @click=${this.onHomePage.bind(this)}
        ></wui-cta-button>
      `:e&&l?r`
        <wui-cta-button
          label=${`Don't have ${h}?`}
          buttonLabel="Get"
          @click=${this.onAppStore.bind(this)}
        ></wui-cta-button>
      `:i&&u?r`
        <wui-cta-button
          label=${`Don't have ${h}?`}
          buttonLabel="Get"
          @click=${this.onPlayStore.bind(this)}
        ></wui-cta-button>
      `:(this.style.display="none",null)}onAppStore(){var t;(null==(t=this.wallet)?void 0:t.app_store)&&s.openHref(this.wallet.app_store,"_blank")}onPlayStore(){var t;(null==(t=this.wallet)?void 0:t.play_store)&&s.openHref(this.wallet.play_store,"_blank")}onHomePage(){var t;(null==(t=this.wallet)?void 0:t.homepage)&&s.openHref(this.wallet.homepage,"_blank")}};Bt.styles=[zt],At([T({type:Object})],Bt.prototype,"wallet",void 0),Bt=At([I("w3m-mobile-download-links")],Bt);const Wt=t`
  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(3px);
    }
    50% {
      transform: translateX(-3px);
    }
    75% {
      transform: translateX(3px);
    }
    100% {
      transform: translateX(0);
    }
  }

  wui-flex:first-child:not(:only-child) {
    position: relative;
  }

  wui-loading-thumbnail {
    position: absolute;
  }

  wui-icon-box {
    position: absolute;
    right: calc(var(--wui-spacing-3xs) * -1);
    bottom: calc(var(--wui-spacing-3xs) * -1);
    opacity: 0;
    transform: scale(0.5);
    transition-property: opacity, transform;
    transition-duration: var(--wui-duration-lg);
    transition-timing-function: var(--wui-ease-out-power-2);
    will-change: opacity, transform;
  }

  wui-text[align='center'] {
    width: 100%;
    padding: 0px var(--wui-spacing-l);
  }

  [data-error='true'] wui-icon-box {
    opacity: 1;
    transform: scale(1);
  }

  [data-error='true'] > wui-flex:first-child {
    animation: shake 250ms cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }

  [data-retry='false'] wui-link {
    display: none;
  }

  [data-retry='true'] wui-link {
    display: block;
    opacity: 1;
  }
`;var Dt=globalThis&&globalThis.__decorate||function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};class Nt extends o{constructor(){var t,e,i,o,r;super(),this.wallet=null==(t=c.state.data)?void 0:t.wallet,this.connector=null==(e=c.state.data)?void 0:e.connector,this.timeout=void 0,this.secondaryBtnIcon="refresh",this.onConnect=void 0,this.onRender=void 0,this.onAutoConnect=void 0,this.isWalletConnect=!0,this.unsubscribe=[],this.imageSrc=h.getWalletImage(this.wallet)??h.getConnectorImage(this.connector),this.name=(null==(i=this.wallet)?void 0:i.name)??(null==(o=this.connector)?void 0:o.name)??"Wallet",this.isRetrying=!1,this.uri=p.state.wcUri,this.error=p.state.wcError,this.ready=!1,this.showRetry=!1,this.secondaryBtnLabel="Try again",this.secondaryLabel="Accept connection request in the wallet",this.isLoading=!1,this.isMobile=!1,this.onRetry=void 0,this.unsubscribe.push(p.subscribeKey("wcUri",t=>{var e;this.uri=t,this.isRetrying&&this.onRetry&&(this.isRetrying=!1,null==(e=this.onConnect)||e.call(this))}),p.subscribeKey("wcError",t=>this.error=t)),(s.isTelegram()||s.isSafari())&&s.isIos()&&p.state.wcUri&&(null==(r=this.onConnect)||r.call(this))}firstUpdated(){var t;null==(t=this.onAutoConnect)||t.call(this),this.showRetry=!this.onAutoConnect}disconnectedCallback(){this.unsubscribe.forEach(t=>t()),p.setWcError(!1),clearTimeout(this.timeout)}render(){var t;null==(t=this.onRender)||t.call(this),this.onShowRetry();const e=this.error?"Connection can be declined if a previous request is still active":this.secondaryLabel;let i=`Continue in ${this.name}`;return this.error&&(i="Connection declined"),r`
      <wui-flex
        data-error=${E(this.error)}
        data-retry=${this.showRetry}
        flexDirection="column"
        alignItems="center"
        .padding=${["3xl","xl","xl","xl"]}
        gap="xl"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-wallet-image size="lg" imageSrc=${E(this.imageSrc)}></wui-wallet-image>

          ${this.error?null:this.loaderTemplate()}

          <wui-icon-box
            backgroundColor="error-100"
            background="opaque"
            iconColor="error-100"
            icon="close"
            size="sm"
            border
            borderColor="wui-color-bg-125"
          ></wui-icon-box>
        </wui-flex>

        <wui-flex flexDirection="column" alignItems="center" gap="xs">
          <wui-text variant="paragraph-500" color=${this.error?"error-100":"fg-100"}>
            ${i}
          </wui-text>
          <wui-text align="center" variant="small-500" color="fg-200">${e}</wui-text>
        </wui-flex>

        ${this.secondaryBtnLabel?r`
              <wui-button
                variant="accent"
                size="md"
                ?disabled=${this.isRetrying||this.isLoading}
                @click=${this.onTryAgain.bind(this)}
                data-testid="w3m-connecting-widget-secondary-button"
              >
                <wui-icon color="inherit" slot="iconLeft" name=${this.secondaryBtnIcon}></wui-icon>
                ${this.secondaryBtnLabel}
              </wui-button>
            `:null}
      </wui-flex>

      ${this.isWalletConnect?r`
            <wui-flex .padding=${["0","xl","xl","xl"]} justifyContent="center">
              <wui-link @click=${this.onCopyUri} color="fg-200" data-testid="wui-link-copy">
                <wui-icon size="xs" color="fg-200" slot="iconLeft" name="copy"></wui-icon>
                Copy link
              </wui-link>
            </wui-flex>
          `:null}

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `}onShowRetry(){var t;if(this.error&&!this.showRetry){this.showRetry=!0;const e=null==(t=this.shadowRoot)?void 0:t.querySelector("wui-button");null==e||e.animate([{opacity:0},{opacity:1}],{fill:"forwards",easing:"ease"})}}onTryAgain(){var t,e;p.setWcError(!1),this.onRetry?(this.isRetrying=!0,null==(t=this.onRetry)||t.call(this)):null==(e=this.onConnect)||e.call(this)}loaderTemplate(){const t=m.state.themeVariables["--w3m-border-radius-master"],e=t?parseInt(t.replace("px",""),10):4;return r`<wui-loading-thumbnail radius=${9*e}></wui-loading-thumbnail>`}onCopyUri(){try{this.uri&&(s.copyToClopboard(this.uri),y.showSuccess("Link copied"))}catch{y.showError("Failed to copy")}}}Nt.styles=Wt,Dt([_()],Nt.prototype,"isRetrying",void 0),Dt([_()],Nt.prototype,"uri",void 0),Dt([_()],Nt.prototype,"error",void 0),Dt([_()],Nt.prototype,"ready",void 0),Dt([_()],Nt.prototype,"showRetry",void 0),Dt([_()],Nt.prototype,"secondaryBtnLabel",void 0),Dt([_()],Nt.prototype,"secondaryLabel",void 0),Dt([_()],Nt.prototype,"isLoading",void 0),Dt([T({type:Boolean})],Nt.prototype,"isMobile",void 0),Dt([T()],Nt.prototype,"onRetry",void 0);var Mt=globalThis&&globalThis.__decorate||function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let Ut=class extends Nt{constructor(){if(super(),!this.wallet)throw new Error("w3m-connecting-wc-browser: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.onAutoConnect=this.onConnectProxy.bind(this),l.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"browser"}})}async onConnectProxy(){var t;try{this.error=!1;const{connectors:e}=n.state,i=e.find(t=>{var e,i,o;return"ANNOUNCED"===t.type&&(null==(e=t.info)?void 0:e.rdns)===(null==(i=this.wallet)?void 0:i.rdns)||"INJECTED"===t.type||t.name===(null==(o=this.wallet)?void 0:o.name)});if(!i)throw new Error("w3m-connecting-wc-browser: No connector found");await p.connectExternal(i,i.chain),x.close(),l.sendEvent({type:"track",event:"CONNECT_SUCCESS",properties:{method:"browser",name:(null==(t=this.wallet)?void 0:t.name)||"Unknown"}})}catch(e){l.sendEvent({type:"track",event:"CONNECT_ERROR",properties:{message:(null==e?void 0:e.message)??"Unknown"}}),this.error=!0}}};Ut=Mt([I("w3m-connecting-wc-browser")],Ut);var qt=globalThis&&globalThis.__decorate||function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let Kt=class extends Nt{constructor(){if(super(),!this.wallet)throw new Error("w3m-connecting-wc-desktop: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.onRender=this.onRenderProxy.bind(this),l.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"desktop"}})}onRenderProxy(){var t;!this.ready&&this.uri&&(this.ready=!0,null==(t=this.onConnect)||t.call(this))}onConnectProxy(){var t;if((null==(t=this.wallet)?void 0:t.desktop_link)&&this.uri)try{this.error=!1;const{desktop_link:t,name:e}=this.wallet,{redirect:i,href:o}=s.formatNativeUrl(t,this.uri);p.setWcLinking({name:e,href:o}),p.setRecentWallet(this.wallet),s.openHref(i,"_blank")}catch{this.error=!0}}};Kt=qt([I("w3m-connecting-wc-desktop")],Kt);var Vt=globalThis&&globalThis.__decorate||function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let Ht=class extends Nt{constructor(){if(super(),this.btnLabelTimeout=void 0,this.redirectDeeplink=void 0,this.redirectUniversalLink=void 0,this.target=void 0,this.preferUniversalLinks=u.state.experimental_preferUniversalLinks,this.isLoading=!0,this.onConnect=()=>{var t;if((null==(t=this.wallet)?void 0:t.mobile_link)&&this.uri)try{this.error=!1;const{mobile_link:t,link_mode:e,name:i}=this.wallet,{redirect:o,redirectUniversalLink:r,href:n}=s.formatNativeUrl(t,this.uri,e);this.redirectDeeplink=o,this.redirectUniversalLink=r,this.target=s.isIframe()?"_top":"_self",p.setWcLinking({name:i,href:n}),p.setRecentWallet(this.wallet),this.preferUniversalLinks&&this.redirectUniversalLink?s.openHref(this.redirectUniversalLink,this.target):s.openHref(this.redirectDeeplink,this.target)}catch(e){l.sendEvent({type:"track",event:"CONNECT_PROXY_ERROR",properties:{message:e instanceof Error?e.message:"Error parsing the deeplink",uri:this.uri,mobile_link:this.wallet.mobile_link,name:this.wallet.name}}),this.error=!0}},!this.wallet)throw new Error("w3m-connecting-wc-mobile: No wallet provided");this.secondaryBtnLabel="Open",this.secondaryLabel=$.CONNECT_LABELS.MOBILE,this.secondaryBtnIcon="externalLink",this.onHandleURI(),this.unsubscribe.push(p.subscribeKey("wcUri",()=>{this.onHandleURI()})),l.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"mobile"}})}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.btnLabelTimeout)}onHandleURI(){var t;this.isLoading=!this.uri,!this.ready&&this.uri&&(this.ready=!0,null==(t=this.onConnect)||t.call(this))}onTryAgain(){var t;p.setWcError(!1),null==(t=this.onConnect)||t.call(this)}};Vt([_()],Ht.prototype,"redirectDeeplink",void 0),Vt([_()],Ht.prototype,"redirectUniversalLink",void 0),Vt([_()],Ht.prototype,"target",void 0),Vt([_()],Ht.prototype,"preferUniversalLinks",void 0),Vt([_()],Ht.prototype,"isLoading",void 0),Ht=Vt([I("w3m-connecting-wc-mobile")],Ht);var Ft={},Yt={},Jt={};let Qt;const Xt=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];Jt.getSymbolSize=function(t){if(!t)throw new Error('"version" cannot be null or undefined');if(t<1||t>40)throw new Error('"version" should be in range from 1 to 40');return 4*t+17},Jt.getSymbolTotalCodewords=function(t){return Xt[t]},Jt.getBCHDigit=function(t){let e=0;for(;0!==t;)e++,t>>>=1;return e},Jt.setToSJISFunction=function(t){if("function"!=typeof t)throw new Error('"toSJISFunc" is not a valid function.');Qt=t},Jt.isKanjiModeEnabled=function(){return void 0!==Qt},Jt.toSJIS=function(t){return Qt(t)};var Gt,Zt={};function te(){this.buffer=[],this.length=0}(Gt=Zt).L={bit:1},Gt.M={bit:0},Gt.Q={bit:3},Gt.H={bit:2},Gt.isValid=function(t){return t&&void 0!==t.bit&&t.bit>=0&&t.bit<4},Gt.from=function(t,e){if(Gt.isValid(t))return t;try{return function(t){if("string"!=typeof t)throw new Error("Param is not a string");switch(t.toLowerCase()){case"l":case"low":return Gt.L;case"m":case"medium":return Gt.M;case"q":case"quartile":return Gt.Q;case"h":case"high":return Gt.H;default:throw new Error("Unknown EC Level: "+t)}}(t)}catch(i){return e}},te.prototype={get:function(t){const e=Math.floor(t/8);return 1==(this.buffer[e]>>>7-t%8&1)},put:function(t,e){for(let i=0;i<e;i++)this.putBit(1==(t>>>e-i-1&1))},getLengthInBits:function(){return this.length},putBit:function(t){const e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),t&&(this.buffer[e]|=128>>>this.length%8),this.length++}};var ee=te;function ie(t){if(!t||t<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=t,this.data=new Uint8Array(t*t),this.reservedBit=new Uint8Array(t*t)}ie.prototype.set=function(t,e,i,o){const r=t*this.size+e;this.data[r]=i,o&&(this.reservedBit[r]=!0)},ie.prototype.get=function(t,e){return this.data[t*this.size+e]},ie.prototype.xor=function(t,e,i){this.data[t*this.size+e]^=i},ie.prototype.isReserved=function(t,e){return this.reservedBit[t*this.size+e]};var oe=ie,re={};!function(t){const e=Jt.getSymbolSize;t.getRowColCoords=function(t){if(1===t)return[];const i=Math.floor(t/7)+2,o=e(t),r=145===o?26:2*Math.ceil((o-13)/(2*i-2)),n=[o-7];for(let e=1;e<i-1;e++)n[e]=n[e-1]-r;return n.push(6),n.reverse()},t.getPositions=function(e){const i=[],o=t.getRowColCoords(e),r=o.length;for(let t=0;t<r;t++)for(let e=0;e<r;e++)0===t&&0===e||0===t&&e===r-1||t===r-1&&0===e||i.push([o[t],o[e]]);return i}}(re);var ne={};const ae=Jt.getSymbolSize;ne.getPositions=function(t){const e=ae(t);return[[0,0],[e-7,0],[0,e-7]]};var se={};!function(t){t.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const e=3,i=3,o=40,r=10;function n(e,i,o){switch(e){case t.Patterns.PATTERN000:return(i+o)%2==0;case t.Patterns.PATTERN001:return i%2==0;case t.Patterns.PATTERN010:return o%3==0;case t.Patterns.PATTERN011:return(i+o)%3==0;case t.Patterns.PATTERN100:return(Math.floor(i/2)+Math.floor(o/3))%2==0;case t.Patterns.PATTERN101:return i*o%2+i*o%3==0;case t.Patterns.PATTERN110:return(i*o%2+i*o%3)%2==0;case t.Patterns.PATTERN111:return(i*o%3+(i+o)%2)%2==0;default:throw new Error("bad maskPattern:"+e)}}t.isValid=function(t){return null!=t&&""!==t&&!isNaN(t)&&t>=0&&t<=7},t.from=function(e){return t.isValid(e)?parseInt(e,10):void 0},t.getPenaltyN1=function(t){const i=t.size;let o=0,r=0,n=0,a=null,s=null;for(let l=0;l<i;l++){r=n=0,a=s=null;for(let c=0;c<i;c++){let i=t.get(l,c);i===a?r++:(r>=5&&(o+=e+(r-5)),a=i,r=1),i=t.get(c,l),i===s?n++:(n>=5&&(o+=e+(n-5)),s=i,n=1)}r>=5&&(o+=e+(r-5)),n>=5&&(o+=e+(n-5))}return o},t.getPenaltyN2=function(t){const e=t.size;let o=0;for(let i=0;i<e-1;i++)for(let r=0;r<e-1;r++){const e=t.get(i,r)+t.get(i,r+1)+t.get(i+1,r)+t.get(i+1,r+1);4!==e&&0!==e||o++}return o*i},t.getPenaltyN3=function(t){const e=t.size;let i=0,r=0,n=0;for(let o=0;o<e;o++){r=n=0;for(let a=0;a<e;a++)r=r<<1&2047|t.get(o,a),a>=10&&(1488===r||93===r)&&i++,n=n<<1&2047|t.get(a,o),a>=10&&(1488===n||93===n)&&i++}return i*o},t.getPenaltyN4=function(t){let e=0;const i=t.data.length;for(let o=0;o<i;o++)e+=t.data[o];return Math.abs(Math.ceil(100*e/i/5)-10)*r},t.applyMask=function(t,e){const i=e.size;for(let o=0;o<i;o++)for(let r=0;r<i;r++)e.isReserved(r,o)||e.xor(r,o,n(t,r,o))},t.getBestMask=function(e,i){const o=Object.keys(t.Patterns).length;let r=0,n=1/0;for(let a=0;a<o;a++){i(a),t.applyMask(a,e);const o=t.getPenaltyN1(e)+t.getPenaltyN2(e)+t.getPenaltyN3(e)+t.getPenaltyN4(e);t.applyMask(a,e),o<n&&(n=o,r=a)}return r}}(se);var le={};const ce=Zt,ue=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],de=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];le.getBlocksCount=function(t,e){switch(e){case ce.L:return ue[4*(t-1)+0];case ce.M:return ue[4*(t-1)+1];case ce.Q:return ue[4*(t-1)+2];case ce.H:return ue[4*(t-1)+3];default:return}},le.getTotalCodewordsCount=function(t,e){switch(e){case ce.L:return de[4*(t-1)+0];case ce.M:return de[4*(t-1)+1];case ce.Q:return de[4*(t-1)+2];case ce.H:return de[4*(t-1)+3];default:return}};var he={},pe={};const ge=new Uint8Array(512),we=new Uint8Array(256);!function(){let t=1;for(let e=0;e<255;e++)ge[e]=t,we[t]=e,t<<=1,256&t&&(t^=285);for(let e=255;e<512;e++)ge[e]=ge[e-255]}(),pe.log=function(t){if(t<1)throw new Error("log("+t+")");return we[t]},pe.exp=function(t){return ge[t]},pe.mul=function(t,e){return 0===t||0===e?0:ge[we[t]+we[e]]},function(t){const e=pe;t.mul=function(t,i){const o=new Uint8Array(t.length+i.length-1);for(let r=0;r<t.length;r++)for(let n=0;n<i.length;n++)o[r+n]^=e.mul(t[r],i[n]);return o},t.mod=function(t,i){let o=new Uint8Array(t);for(;o.length-i.length>=0;){const t=o[0];for(let n=0;n<i.length;n++)o[n]^=e.mul(i[n],t);let r=0;for(;r<o.length&&0===o[r];)r++;o=o.slice(r)}return o},t.generateECPolynomial=function(i){let o=new Uint8Array([1]);for(let r=0;r<i;r++)o=t.mul(o,new Uint8Array([1,e.exp(r)]));return o}}(he);const fe=he;function be(t){this.genPoly=void 0,this.degree=t,this.degree&&this.initialize(this.degree)}be.prototype.initialize=function(t){this.degree=t,this.genPoly=fe.generateECPolynomial(this.degree)},be.prototype.encode=function(t){if(!this.genPoly)throw new Error("Encoder not initialized");const e=new Uint8Array(t.length+this.degree);e.set(t);const i=fe.mod(e,this.genPoly),o=this.degree-i.length;if(o>0){const t=new Uint8Array(this.degree);return t.set(i,o),t}return i};var ve=be,me={},ye={},xe={isValid:function(t){return!isNaN(t)&&t>=1&&t<=40}},$e={};const Ce="[0-9]+";let ke="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";ke=ke.replace(/u/g,"\\u");const Re="(?:(?![A-Z0-9 $%*+\\-./:]|"+ke+")(?:.|[\r\n]))+";$e.KANJI=new RegExp(ke,"g"),$e.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),$e.BYTE=new RegExp(Re,"g"),$e.NUMERIC=new RegExp(Ce,"g"),$e.ALPHANUMERIC=new RegExp("[A-Z $%*+\\-./:]+","g");const Te=new RegExp("^"+ke+"$"),Ie=new RegExp("^"+Ce+"$"),Ee=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");$e.testKanji=function(t){return Te.test(t)},$e.testNumeric=function(t){return Ie.test(t)},$e.testAlphanumeric=function(t){return Ee.test(t)},function(t){const e=xe,i=$e;t.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},t.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},t.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},t.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},t.MIXED={bit:-1},t.getCharCountIndicator=function(t,i){if(!t.ccBits)throw new Error("Invalid mode: "+t);if(!e.isValid(i))throw new Error("Invalid version: "+i);return i>=1&&i<10?t.ccBits[0]:i<27?t.ccBits[1]:t.ccBits[2]},t.getBestModeForData=function(e){return i.testNumeric(e)?t.NUMERIC:i.testAlphanumeric(e)?t.ALPHANUMERIC:i.testKanji(e)?t.KANJI:t.BYTE},t.toString=function(t){if(t&&t.id)return t.id;throw new Error("Invalid mode")},t.isValid=function(t){return t&&t.bit&&t.ccBits},t.from=function(e,i){if(t.isValid(e))return e;try{return function(e){if("string"!=typeof e)throw new Error("Param is not a string");switch(e.toLowerCase()){case"numeric":return t.NUMERIC;case"alphanumeric":return t.ALPHANUMERIC;case"kanji":return t.KANJI;case"byte":return t.BYTE;default:throw new Error("Unknown mode: "+e)}}(e)}catch(o){return i}}}(ye),function(t){const e=Jt,i=le,o=Zt,r=ye,n=xe,a=e.getBCHDigit(7973);function s(t,e){return r.getCharCountIndicator(t,e)+4}function l(t,e){let i=0;return t.forEach(function(t){const o=s(t.mode,e);i+=o+t.getBitsLength()}),i}t.from=function(t,e){return n.isValid(t)?parseInt(t,10):e},t.getCapacity=function(t,o,a){if(!n.isValid(t))throw new Error("Invalid QR Code version");void 0===a&&(a=r.BYTE);const l=8*(e.getSymbolTotalCodewords(t)-i.getTotalCodewordsCount(t,o));if(a===r.MIXED)return l;const c=l-s(a,t);switch(a){case r.NUMERIC:return Math.floor(c/10*3);case r.ALPHANUMERIC:return Math.floor(c/11*2);case r.KANJI:return Math.floor(c/13);case r.BYTE:default:return Math.floor(c/8)}},t.getBestVersionForData=function(e,i){let n;const a=o.from(i,o.M);if(Array.isArray(e)){if(e.length>1)return function(e,i){for(let o=1;o<=40;o++)if(l(e,o)<=t.getCapacity(o,i,r.MIXED))return o}(e,a);if(0===e.length)return 1;n=e[0]}else n=e;return function(e,i,o){for(let r=1;r<=40;r++)if(i<=t.getCapacity(r,o,e))return r}(n.mode,n.getLength(),a)},t.getEncodedBits=function(t){if(!n.isValid(t)||t<7)throw new Error("Invalid QR Code version");let i=t<<12;for(;e.getBCHDigit(i)-a>=0;)i^=7973<<e.getBCHDigit(i)-a;return t<<12|i}}(me);var _e={};const Pe=Jt,je=Pe.getBCHDigit(1335);_e.getEncodedBits=function(t,e){const i=t.bit<<3|e;let o=i<<10;for(;Pe.getBCHDigit(o)-je>=0;)o^=1335<<Pe.getBCHDigit(o)-je;return 21522^(i<<10|o)};var Oe={};const Se=ye;function Le(t){this.mode=Se.NUMERIC,this.data=t.toString()}Le.getBitsLength=function(t){return 10*Math.floor(t/3)+(t%3?t%3*3+1:0)},Le.prototype.getLength=function(){return this.data.length},Le.prototype.getBitsLength=function(){return Le.getBitsLength(this.data.length)},Le.prototype.write=function(t){let e,i,o;for(e=0;e+3<=this.data.length;e+=3)i=this.data.substr(e,3),o=parseInt(i,10),t.put(o,10);const r=this.data.length-e;r>0&&(i=this.data.substr(e),o=parseInt(i,10),t.put(o,3*r+1))};var ze=Le;const Ae=ye,Be=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function We(t){this.mode=Ae.ALPHANUMERIC,this.data=t}We.getBitsLength=function(t){return 11*Math.floor(t/2)+t%2*6},We.prototype.getLength=function(){return this.data.length},We.prototype.getBitsLength=function(){return We.getBitsLength(this.data.length)},We.prototype.write=function(t){let e;for(e=0;e+2<=this.data.length;e+=2){let i=45*Be.indexOf(this.data[e]);i+=Be.indexOf(this.data[e+1]),t.put(i,11)}this.data.length%2&&t.put(Be.indexOf(this.data[e]),6)};var De=We;const Ne=function(t){for(var e=[],i=t.length,o=0;o<i;o++){var r=t.charCodeAt(o);if(r>=55296&&r<=56319&&i>o+1){var n=t.charCodeAt(o+1);n>=56320&&n<=57343&&(r=1024*(r-55296)+n-56320+65536,o+=1)}r<128?e.push(r):r<2048?(e.push(r>>6|192),e.push(63&r|128)):r<55296||r>=57344&&r<65536?(e.push(r>>12|224),e.push(r>>6&63|128),e.push(63&r|128)):r>=65536&&r<=1114111?(e.push(r>>18|240),e.push(r>>12&63|128),e.push(r>>6&63|128),e.push(63&r|128)):e.push(239,191,189)}return new Uint8Array(e).buffer},Me=ye;function Ue(t){this.mode=Me.BYTE,"string"==typeof t&&(t=Ne(t)),this.data=new Uint8Array(t)}Ue.getBitsLength=function(t){return 8*t},Ue.prototype.getLength=function(){return this.data.length},Ue.prototype.getBitsLength=function(){return Ue.getBitsLength(this.data.length)},Ue.prototype.write=function(t){for(let e=0,i=this.data.length;e<i;e++)t.put(this.data[e],8)};var qe=Ue;const Ke=ye,Ve=Jt;function He(t){this.mode=Ke.KANJI,this.data=t}He.getBitsLength=function(t){return 13*t},He.prototype.getLength=function(){return this.data.length},He.prototype.getBitsLength=function(){return He.getBitsLength(this.data.length)},He.prototype.write=function(t){let e;for(e=0;e<this.data.length;e++){let i=Ve.toSJIS(this.data[e]);if(i>=33088&&i<=40956)i-=33088;else{if(!(i>=57408&&i<=60351))throw new Error("Invalid SJIS character: "+this.data[e]+"\nMake sure your charset is UTF-8");i-=49472}i=192*(i>>>8&255)+(255&i),t.put(i,13)}};var Fe,Ye=He,Je={exports:{}},Qe=Je.exports=Fe={single_source_shortest_paths:function(t,e,i){var o={},r={};r[e]=0;var n,a,s,l,c,u,d,h=Fe.PriorityQueue.make();for(h.push(e,0);!h.empty();)for(s in a=(n=h.pop()).value,l=n.cost,c=t[a]||{})c.hasOwnProperty(s)&&(u=l+c[s],d=r[s],(void 0===r[s]||d>u)&&(r[s]=u,h.push(s,u),o[s]=a));if(void 0!==i&&void 0===r[i]){var p=["Could not find a path from ",e," to ",i,"."].join("");throw new Error(p)}return o},extract_shortest_path_from_predecessor_list:function(t,e){for(var i=[],o=e;o;)i.push(o),t[o],o=t[o];return i.reverse(),i},find_path:function(t,e,i){var o=Fe.single_source_shortest_paths(t,e,i);return Fe.extract_shortest_path_from_predecessor_list(o,i)},PriorityQueue:{make:function(t){var e,i=Fe.PriorityQueue,o={};for(e in t=t||{},i)i.hasOwnProperty(e)&&(o[e]=i[e]);return o.queue=[],o.sorter=t.sorter||i.default_sorter,o},default_sorter:function(t,e){return t.cost-e.cost},push:function(t,e){var i={value:t,cost:e};this.queue.push(i),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return 0===this.queue.length}}};!function(t){const e=ye,i=ze,o=De,r=qe,n=Ye,a=$e,s=Jt,l=Qe;function c(t){return unescape(encodeURIComponent(t)).length}function u(t,e,i){const o=[];let r;for(;null!==(r=t.exec(i));)o.push({data:r[0],index:r.index,mode:e,length:r[0].length});return o}function d(t){const i=u(a.NUMERIC,e.NUMERIC,t),o=u(a.ALPHANUMERIC,e.ALPHANUMERIC,t);let r,n;s.isKanjiModeEnabled()?(r=u(a.BYTE,e.BYTE,t),n=u(a.KANJI,e.KANJI,t)):(r=u(a.BYTE_KANJI,e.BYTE,t),n=[]);return i.concat(o,r,n).sort(function(t,e){return t.index-e.index}).map(function(t){return{data:t.data,mode:t.mode,length:t.length}})}function h(t,a){switch(a){case e.NUMERIC:return i.getBitsLength(t);case e.ALPHANUMERIC:return o.getBitsLength(t);case e.KANJI:return n.getBitsLength(t);case e.BYTE:return r.getBitsLength(t)}}function p(t,a){let l;const c=e.getBestModeForData(t);if(l=e.from(a,c),l!==e.BYTE&&l.bit<c.bit)throw new Error('"'+t+'" cannot be encoded with mode '+e.toString(l)+".\n Suggested mode is: "+e.toString(c));switch(l!==e.KANJI||s.isKanjiModeEnabled()||(l=e.BYTE),l){case e.NUMERIC:return new i(t);case e.ALPHANUMERIC:return new o(t);case e.KANJI:return new n(t);case e.BYTE:return new r(t)}}t.fromArray=function(t){return t.reduce(function(t,e){return"string"==typeof e?t.push(p(e,null)):e.data&&t.push(p(e.data,e.mode)),t},[])},t.fromString=function(i,o){const r=function(t){const i=[];for(let o=0;o<t.length;o++){const r=t[o];switch(r.mode){case e.NUMERIC:i.push([r,{data:r.data,mode:e.ALPHANUMERIC,length:r.length},{data:r.data,mode:e.BYTE,length:r.length}]);break;case e.ALPHANUMERIC:i.push([r,{data:r.data,mode:e.BYTE,length:r.length}]);break;case e.KANJI:i.push([r,{data:r.data,mode:e.BYTE,length:c(r.data)}]);break;case e.BYTE:i.push([{data:r.data,mode:e.BYTE,length:c(r.data)}])}}return i}(d(i,s.isKanjiModeEnabled())),n=function(t,i){const o={},r={start:{}};let n=["start"];for(let a=0;a<t.length;a++){const s=t[a],l=[];for(let t=0;t<s.length;t++){const c=s[t],u=""+a+t;l.push(u),o[u]={node:c,lastCount:0},r[u]={};for(let t=0;t<n.length;t++){const a=n[t];o[a]&&o[a].node.mode===c.mode?(r[a][u]=h(o[a].lastCount+c.length,c.mode)-h(o[a].lastCount,c.mode),o[a].lastCount+=c.length):(o[a]&&(o[a].lastCount=c.length),r[a][u]=h(c.length,c.mode)+4+e.getCharCountIndicator(c.mode,i))}}n=l}for(let e=0;e<n.length;e++)r[n[e]].end=0;return{map:r,table:o}}(r,o),a=l.find_path(n.map,"start","end"),u=[];for(let t=1;t<a.length-1;t++)u.push(n.table[a[t]].node);return t.fromArray(function(t){return t.reduce(function(t,e){const i=t.length-1>=0?t[t.length-1]:null;return i&&i.mode===e.mode?(t[t.length-1].data+=e.data,t):(t.push(e),t)},[])}(u))},t.rawSplit=function(e){return t.fromArray(d(e,s.isKanjiModeEnabled()))}}(Oe);const Xe=Jt,Ge=Zt,Ze=ee,ti=oe,ei=re,ii=ne,oi=se,ri=le,ni=ve,ai=me,si=_e,li=ye,ci=Oe;function ui(t,e,i){const o=t.size,r=si.getEncodedBits(e,i);let n,a;for(n=0;n<15;n++)a=1==(r>>n&1),n<6?t.set(n,8,a,!0):n<8?t.set(n+1,8,a,!0):t.set(o-15+n,8,a,!0),n<8?t.set(8,o-n-1,a,!0):n<9?t.set(8,15-n-1+1,a,!0):t.set(8,15-n-1,a,!0);t.set(o-8,8,1,!0)}function di(t,e,i){const o=new Ze;i.forEach(function(e){o.put(e.mode.bit,4),o.put(e.getLength(),li.getCharCountIndicator(e.mode,t)),e.write(o)});const r=8*(Xe.getSymbolTotalCodewords(t)-ri.getTotalCodewordsCount(t,e));for(o.getLengthInBits()+4<=r&&o.put(0,4);o.getLengthInBits()%8!=0;)o.putBit(0);const n=(r-o.getLengthInBits())/8;for(let a=0;a<n;a++)o.put(a%2?17:236,8);return function(t,e,i){const o=Xe.getSymbolTotalCodewords(e),r=ri.getTotalCodewordsCount(e,i),n=o-r,a=ri.getBlocksCount(e,i),s=o%a,l=a-s,c=Math.floor(o/a),u=Math.floor(n/a),d=u+1,h=c-u,p=new ni(h);let g=0;const w=new Array(a),f=new Array(a);let b=0;const v=new Uint8Array(t.buffer);for(let C=0;C<a;C++){const t=C<l?u:d;w[C]=v.slice(g,g+t),f[C]=p.encode(w[C]),g+=t,b=Math.max(b,t)}const m=new Uint8Array(o);let y,x,$=0;for(y=0;y<b;y++)for(x=0;x<a;x++)y<w[x].length&&(m[$++]=w[x][y]);for(y=0;y<h;y++)for(x=0;x<a;x++)m[$++]=f[x][y];return m}(o,t,e)}function hi(t,e,i,o){let r;if(Array.isArray(t))r=ci.fromArray(t);else{if("string"!=typeof t)throw new Error("Invalid data");{let o=e;if(!o){const e=ci.rawSplit(t);o=ai.getBestVersionForData(e,i)}r=ci.fromString(t,o||40)}}const n=ai.getBestVersionForData(r,i);if(!n)throw new Error("The amount of data is too big to be stored in a QR Code");if(e){if(e<n)throw new Error("\nThe chosen QR Code version cannot contain this amount of data.\nMinimum version required to store current data is: "+n+".\n")}else e=n;const a=di(e,i,r),s=Xe.getSymbolSize(e),l=new ti(s);return function(t,e){const i=t.size,o=ii.getPositions(e);for(let r=0;r<o.length;r++){const e=o[r][0],n=o[r][1];for(let o=-1;o<=7;o++)if(!(e+o<=-1||i<=e+o))for(let r=-1;r<=7;r++)n+r<=-1||i<=n+r||(o>=0&&o<=6&&(0===r||6===r)||r>=0&&r<=6&&(0===o||6===o)||o>=2&&o<=4&&r>=2&&r<=4?t.set(e+o,n+r,!0,!0):t.set(e+o,n+r,!1,!0))}}(l,e),function(t){const e=t.size;for(let i=8;i<e-8;i++){const e=i%2==0;t.set(i,6,e,!0),t.set(6,i,e,!0)}}(l),function(t,e){const i=ei.getPositions(e);for(let o=0;o<i.length;o++){const e=i[o][0],r=i[o][1];for(let i=-2;i<=2;i++)for(let o=-2;o<=2;o++)-2===i||2===i||-2===o||2===o||0===i&&0===o?t.set(e+i,r+o,!0,!0):t.set(e+i,r+o,!1,!0)}}(l,e),ui(l,i,0),e>=7&&function(t,e){const i=t.size,o=ai.getEncodedBits(e);let r,n,a;for(let s=0;s<18;s++)r=Math.floor(s/3),n=s%3+i-8-3,a=1==(o>>s&1),t.set(r,n,a,!0),t.set(n,r,a,!0)}(l,e),function(t,e){const i=t.size;let o=-1,r=i-1,n=7,a=0;for(let s=i-1;s>0;s-=2)for(6===s&&s--;;){for(let i=0;i<2;i++)if(!t.isReserved(r,s-i)){let o=!1;a<e.length&&(o=1==(e[a]>>>n&1)),t.set(r,s-i,o),n--,-1===n&&(a++,n=7)}if(r+=o,r<0||i<=r){r-=o,o=-o;break}}}(l,a),isNaN(o)&&(o=oi.getBestMask(l,ui.bind(null,l,i))),oi.applyMask(o,l),ui(l,i,o),{modules:l,version:e,errorCorrectionLevel:i,maskPattern:o,segments:r}}Yt.create=function(t,e){if(void 0===t||""===t)throw new Error("No input text");let i,o,r=Ge.M;return void 0!==e&&(r=Ge.from(e.errorCorrectionLevel,Ge.M),i=ai.from(e.version),o=oi.from(e.maskPattern),e.toSJISFunc&&Xe.setToSJISFunction(e.toSJISFunc)),hi(t,i,r,o)};var pi={},gi={};!function(t){function e(t){if("number"==typeof t&&(t=t.toString()),"string"!=typeof t)throw new Error("Color should be defined as hex string");let e=t.slice().replace("#","").split("");if(e.length<3||5===e.length||e.length>8)throw new Error("Invalid hex color: "+t);3!==e.length&&4!==e.length||(e=Array.prototype.concat.apply([],e.map(function(t){return[t,t]}))),6===e.length&&e.push("F","F");const i=parseInt(e.join(""),16);return{r:i>>24&255,g:i>>16&255,b:i>>8&255,a:255&i,hex:"#"+e.slice(0,6).join("")}}t.getOptions=function(t){t||(t={}),t.color||(t.color={});const i=void 0===t.margin||null===t.margin||t.margin<0?4:t.margin,o=t.width&&t.width>=21?t.width:void 0,r=t.scale||4;return{width:o,scale:o?4:r,margin:i,color:{dark:e(t.color.dark||"#000000ff"),light:e(t.color.light||"#ffffffff")},type:t.type,rendererOpts:t.rendererOpts||{}}},t.getScale=function(t,e){return e.width&&e.width>=t+2*e.margin?e.width/(t+2*e.margin):e.scale},t.getImageWidth=function(e,i){const o=t.getScale(e,i);return Math.floor((e+2*i.margin)*o)},t.qrToImageData=function(e,i,o){const r=i.modules.size,n=i.modules.data,a=t.getScale(r,o),s=Math.floor((r+2*o.margin)*a),l=o.margin*a,c=[o.color.light,o.color.dark];for(let t=0;t<s;t++)for(let i=0;i<s;i++){let u=4*(t*s+i),d=o.color.light;if(t>=l&&i>=l&&t<s-l&&i<s-l){d=c[n[Math.floor((t-l)/a)*r+Math.floor((i-l)/a)]?1:0]}e[u++]=d.r,e[u++]=d.g,e[u++]=d.b,e[u]=d.a}}}(gi),function(t){const e=gi;t.render=function(t,i,o){let r=o,n=i;void 0!==r||i&&i.getContext||(r=i,i=void 0),i||(n=function(){try{return document.createElement("canvas")}catch(t){throw new Error("You need to specify a canvas element")}}()),r=e.getOptions(r);const a=e.getImageWidth(t.modules.size,r),s=n.getContext("2d"),l=s.createImageData(a,a);return e.qrToImageData(l.data,t,r),function(t,e,i){t.clearRect(0,0,e.width,e.height),e.style||(e.style={}),e.height=i,e.width=i,e.style.height=i+"px",e.style.width=i+"px"}(s,n,a),s.putImageData(l,0,0),n},t.renderToDataURL=function(e,i,o){let r=o;void 0!==r||i&&i.getContext||(r=i,i=void 0),r||(r={});const n=t.render(e,i,r),a=r.type||"image/png",s=r.rendererOpts||{};return n.toDataURL(a,s.quality)}}(pi);var wi={};const fi=gi;function bi(t,e){const i=t.a/255,o=e+'="'+t.hex+'"';return i<1?o+" "+e+'-opacity="'+i.toFixed(2).slice(1)+'"':o}function vi(t,e,i){let o=t+e;return void 0!==i&&(o+=" "+i),o}wi.render=function(t,e,i){const o=fi.getOptions(e),r=t.modules.size,n=t.modules.data,a=r+2*o.margin,s=o.color.light.a?"<path "+bi(o.color.light,"fill")+' d="M0 0h'+a+"v"+a+'H0z"/>':"",l="<path "+bi(o.color.dark,"stroke")+' d="'+function(t,e,i){let o="",r=0,n=!1,a=0;for(let s=0;s<t.length;s++){const l=Math.floor(s%e),c=Math.floor(s/e);l||n||(n=!0),t[s]?(a++,s>0&&l>0&&t[s-1]||(o+=n?vi("M",l+i,.5+c+i):vi("m",r,0),r=0,n=!1),l+1<e&&t[s+1]||(o+=vi("h",a),a=0)):r++}return o}(n,r,o.margin)+'"/>',c='viewBox="0 0 '+a+" "+a+'"',u='<svg xmlns="http://www.w3.org/2000/svg" '+(o.width?'width="'+o.width+'" height="'+o.width+'" ':"")+c+' shape-rendering="crispEdges">'+s+l+"</svg>\n";return"function"==typeof i&&i(null,u),u};const mi=function(){return"function"==typeof Promise&&Promise.prototype&&Promise.prototype.then},yi=Yt,xi=pi,$i=wi;function Ci(t,e,i,o,r){const n=[].slice.call(arguments,1),a=n.length,s="function"==typeof n[a-1];if(!s&&!mi())throw new Error("Callback required as last argument");if(!s){if(a<1)throw new Error("Too few arguments provided");return 1===a?(i=e,e=o=void 0):2!==a||e.getContext||(o=i,i=e,e=void 0),new Promise(function(r,n){try{const n=yi.create(i,o);r(t(n,e,o))}catch(a){n(a)}})}if(a<2)throw new Error("Too few arguments provided");2===a?(r=i,i=e,e=o=void 0):3===a&&(e.getContext&&void 0===r?(r=o,o=void 0):(r=o,o=i,i=e,e=void 0));try{const n=yi.create(i,o);r(null,t(n,e,o))}catch(l){r(l)}}Ft.create=yi.create,Ft.toCanvas=Ci.bind(null,xi.render),Ft.toDataURL=Ci.bind(null,xi.renderToDataURL),Ft.toString=Ci.bind(null,function(t,e,i){return $i.render(t,i)});function ki(t,e,i){if(t===e)return!1;return(t-e<0?e-t:t-e)<=i+.1}const Ri={generate({uri:t,size:e,logoSize:i,dotColor:o="#141414"}){const r=[],n=function(t,e){const i=Array.prototype.slice.call(Ft.create(t,{errorCorrectionLevel:e}).modules.data,0),o=Math.sqrt(i.length);return i.reduce((t,e,i)=>(i%o===0?t.push([e]):t[t.length-1].push(e))&&t,[])}(t,"Q"),a=e/n.length,s=[{x:0,y:0},{x:1,y:0},{x:0,y:1}];s.forEach(({x:t,y:e})=>{const i=(n.length-7)*a*t,l=(n.length-7)*a*e,c=.45;for(let n=0;n<s.length;n+=1){const t=a*(7-2*n);r.push(C`
            <rect
              fill=${2===n?o:"transparent"}
              width=${0===n?t-5:t}
              rx= ${0===n?(t-5)*c:t*c}
              ry= ${0===n?(t-5)*c:t*c}
              stroke=${o}
              stroke-width=${0===n?5:0}
              height=${0===n?t-5:t}
              x= ${0===n?l+a*n+2.5:l+a*n}
              y= ${0===n?i+a*n+2.5:i+a*n}
            />
          `)}});const l=Math.floor((i+25)/a),c=n.length/2-l/2,u=n.length/2+l/2-1,d=[];n.forEach((t,e)=>{t.forEach((t,i)=>{if(n[e][i]&&!(e<7&&i<7||e>n.length-8&&i<7||e<7&&i>n.length-8||e>c&&e<u&&i>c&&i<u)){const t=e*a+a/2,o=i*a+a/2;d.push([t,o])}})});const h={};return d.forEach(([t,e])=>{var i;h[t]?null==(i=h[t])||i.push(e):h[t]=[e]}),Object.entries(h).map(([t,e])=>{const i=e.filter(t=>e.every(e=>!ki(t,e,a)));return[Number(t),i]}).forEach(([t,e])=>{e.forEach(e=>{r.push(C`<circle cx=${t} cy=${e} fill=${o} r=${a/2.5} />`)})}),Object.entries(h).filter(([t,e])=>e.length>1).map(([t,e])=>{const i=e.filter(t=>e.some(e=>ki(t,e,a)));return[Number(t),i]}).map(([t,e])=>{e.sort((t,e)=>t<e?-1:1);const i=[];for(const o of e){const t=i.find(t=>t.some(t=>ki(o,t,a)));t?t.push(o):i.push([o])}return[t,i.map(t=>[t[0],t[t.length-1]])]}).forEach(([t,e])=>{e.forEach(([e,i])=>{r.push(C`
              <line
                x1=${t}
                x2=${t}
                y1=${e}
                y2=${i}
                stroke=${o}
                stroke-width=${a/1.25}
                stroke-linecap="round"
              />
            `)})}),r}},Ti=t`
  :host {
    position: relative;
    user-select: none;
    display: block;
    overflow: hidden;
    aspect-ratio: 1 / 1;
    width: var(--local-size);
  }

  :host([data-theme='dark']) {
    border-radius: clamp(0px, var(--wui-border-radius-l), 40px);
    background-color: var(--wui-color-inverse-100);
    padding: var(--wui-spacing-l);
  }

  :host([data-theme='light']) {
    box-shadow: 0 0 0 1px var(--wui-color-bg-125);
    background-color: var(--wui-color-bg-125);
  }

  :host([data-clear='true']) > wui-icon {
    display: none;
  }

  svg:first-child,
  wui-image,
  wui-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
  }

  wui-image {
    width: 25%;
    height: 25%;
    border-radius: var(--wui-border-radius-xs);
  }

  wui-icon {
    width: 100%;
    height: 100%;
    color: var(--local-icon-color) !important;
    transform: translateY(-50%) translateX(-50%) scale(0.25);
  }
`;var Ii=globalThis&&globalThis.__decorate||function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let Ei=class extends o{constructor(){super(...arguments),this.uri="",this.size=0,this.theme="dark",this.imageSrc=void 0,this.alt=void 0,this.arenaClear=void 0,this.farcaster=void 0}render(){return this.dataset.theme=this.theme,this.dataset.clear=String(this.arenaClear),this.style.cssText=`\n     --local-size: ${this.size}px;\n     --local-icon-color: ${this.color??"#3396ff"}\n    `,r`${this.templateVisual()} ${this.templateSvg()}`}templateSvg(){const t="light"===this.theme?this.size:this.size-32;return C`
      <svg height=${t} width=${t}>
        ${Ri.generate({uri:this.uri,size:t,logoSize:this.arenaClear?0:t/4,dotColor:this.color})}
      </svg>
    `}templateVisual(){return this.imageSrc?r`<wui-image src=${this.imageSrc} alt=${this.alt??"logo"}></wui-image>`:this.farcaster?r`<wui-icon
        class="farcaster"
        size="inherit"
        color="inherit"
        name="farcaster"
      ></wui-icon>`:r`<wui-icon size="inherit" color="inherit" name="walletConnect"></wui-icon>`}};Ei.styles=[i,Ti],Ii([T()],Ei.prototype,"uri",void 0),Ii([T({type:Number})],Ei.prototype,"size",void 0),Ii([T()],Ei.prototype,"theme",void 0),Ii([T()],Ei.prototype,"imageSrc",void 0),Ii([T()],Ei.prototype,"alt",void 0),Ii([T()],Ei.prototype,"color",void 0),Ii([T({type:Boolean})],Ei.prototype,"arenaClear",void 0),Ii([T({type:Boolean})],Ei.prototype,"farcaster",void 0),Ei=Ii([I("wui-qr-code")],Ei);const _i=t`
  :host {
    display: block;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
    background: linear-gradient(
      120deg,
      var(--wui-color-bg-200) 5%,
      var(--wui-color-bg-200) 48%,
      var(--wui-color-bg-300) 55%,
      var(--wui-color-bg-300) 60%,
      var(--wui-color-bg-300) calc(60% + 10px),
      var(--wui-color-bg-200) calc(60% + 12px),
      var(--wui-color-bg-200) 100%
    );
    background-size: 250%;
    animation: shimmer 3s linear infinite reverse;
  }

  :host([variant='light']) {
    background: linear-gradient(
      120deg,
      var(--wui-color-bg-150) 5%,
      var(--wui-color-bg-150) 48%,
      var(--wui-color-bg-200) 55%,
      var(--wui-color-bg-200) 60%,
      var(--wui-color-bg-200) calc(60% + 10px),
      var(--wui-color-bg-150) calc(60% + 12px),
      var(--wui-color-bg-150) 100%
    );
    background-size: 250%;
  }

  @keyframes shimmer {
    from {
      background-position: -250% 0;
    }
    to {
      background-position: 250% 0;
    }
  }
`;var Pi=globalThis&&globalThis.__decorate||function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let ji=class extends o{constructor(){super(...arguments),this.width="",this.height="",this.borderRadius="m",this.variant="default"}render(){return this.style.cssText=`\n      width: ${this.width};\n      height: ${this.height};\n      border-radius: clamp(0px,var(--wui-border-radius-${this.borderRadius}), 40px);\n    `,r`<slot></slot>`}};ji.styles=[_i],Pi([T()],ji.prototype,"width",void 0),Pi([T()],ji.prototype,"height",void 0),Pi([T()],ji.prototype,"borderRadius",void 0),Pi([T()],ji.prototype,"variant",void 0),ji=Pi([I("wui-shimmer")],ji);const Oi=t`
  .reown-logo {
    height: var(--wui-spacing-xxl);
  }

  a {
    text-decoration: none;
    cursor: pointer;
  }

  a:hover {
    opacity: 0.9;
  }
`;var Si=globalThis&&globalThis.__decorate||function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let Li=class extends o{render(){return r`
      <a
        data-testid="ux-branding-reown"
        href=${"https://reown.com"}
        rel="noreferrer"
        target="_blank"
        style="text-decoration: none;"
      >
        <wui-flex
          justifyContent="center"
          alignItems="center"
          gap="xs"
          .padding=${["0","0","l","0"]}
        >
          <wui-text variant="small-500" color="fg-100"> UX by </wui-text>
          <wui-icon name="reown" size="xxxl" class="reown-logo"></wui-icon>
        </wui-flex>
      </a>
    `}};Li.styles=[i,e,Oi],Li=Si([I("wui-ux-by-reown")],Li);const zi=t`
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  wui-shimmer {
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: clamp(0px, var(--wui-border-radius-l), 40px) !important;
  }

  wui-qr-code {
    opacity: 0;
    animation-duration: 200ms;
    animation-timing-function: ease;
    animation-name: fadein;
    animation-fill-mode: forwards;
  }
`;var Ai=globalThis&&globalThis.__decorate||function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let Bi=class extends Nt{constructor(){var t;super(),this.forceUpdate=()=>{this.requestUpdate()},window.addEventListener("resize",this.forceUpdate),l.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:(null==(t=this.wallet)?void 0:t.name)??"WalletConnect",platform:"qrcode"}})}disconnectedCallback(){var t;super.disconnectedCallback(),null==(t=this.unsubscribe)||t.forEach(t=>t()),window.removeEventListener("resize",this.forceUpdate)}render(){return this.onRenderProxy(),r`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["0","xl","xl","xl"]}
        gap="xl"
      >
        <wui-shimmer borderRadius="l" width="100%"> ${this.qrCodeTemplate()} </wui-shimmer>

        <wui-text variant="paragraph-500" color="fg-100">
          Scan this QR Code with your phone
        </wui-text>
        ${this.copyTemplate()}
      </wui-flex>
      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `}onRenderProxy(){!this.ready&&this.uri&&(this.timeout=setTimeout(()=>{this.ready=!0},200))}qrCodeTemplate(){if(!this.uri||!this.ready)return null;const t=this.getBoundingClientRect().width-40,e=this.wallet?this.wallet.name:void 0;return p.setWcLinking(void 0),p.setRecentWallet(this.wallet),r` <wui-qr-code
      size=${t}
      theme=${m.state.themeMode}
      uri=${this.uri}
      imageSrc=${E(h.getWalletImage(this.wallet))}
      color=${E(m.state.themeVariables["--w3m-qr-color"])}
      alt=${E(e)}
      data-testid="wui-qr-code"
    ></wui-qr-code>`}copyTemplate(){const t=!this.uri||!this.ready;return r`<wui-link
      .disabled=${t}
      @click=${this.onCopyUri}
      color="fg-200"
      data-testid="copy-wc2-uri"
    >
      <wui-icon size="xs" color="fg-200" slot="iconLeft" name="copy"></wui-icon>
      Copy link
    </wui-link>`}};Bi.styles=zi,Bi=Ai([I("w3m-connecting-wc-qrcode")],Bi);var Wi=globalThis&&globalThis.__decorate||function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let Di=class extends o{constructor(){var t;if(super(),this.wallet=null==(t=c.state.data)?void 0:t.wallet,!this.wallet)throw new Error("w3m-connecting-wc-unsupported: No wallet provided");l.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"browser"}})}render(){return r`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["3xl","xl","xl","xl"]}
        gap="xl"
      >
        <wui-wallet-image
          size="lg"
          imageSrc=${E(h.getWalletImage(this.wallet))}
        ></wui-wallet-image>

        <wui-text variant="paragraph-500" color="fg-100">Not Detected</wui-text>
      </wui-flex>

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `}};Di=Wi([I("w3m-connecting-wc-unsupported")],Di);var Ni=globalThis&&globalThis.__decorate||function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let Mi=class extends Nt{constructor(){if(super(),this.isLoading=!0,!this.wallet)throw new Error("w3m-connecting-wc-web: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.secondaryBtnLabel="Open",this.secondaryLabel=$.CONNECT_LABELS.MOBILE,this.secondaryBtnIcon="externalLink",this.updateLoadingState(),this.unsubscribe.push(p.subscribeKey("wcUri",()=>{this.updateLoadingState()})),l.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"web"}})}updateLoadingState(){this.isLoading=!this.uri}onConnectProxy(){var t;if((null==(t=this.wallet)?void 0:t.webapp_link)&&this.uri)try{this.error=!1;const{webapp_link:t,name:e}=this.wallet,{redirect:i,href:o}=s.formatUniversalUrl(t,this.uri);p.setWcLinking({name:e,href:o}),p.setRecentWallet(this.wallet),s.openHref(i,"_blank")}catch{this.error=!0}}};Ni([_()],Mi.prototype,"isLoading",void 0),Mi=Ni([I("w3m-connecting-wc-web")],Mi);var Ui=globalThis&&globalThis.__decorate||function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let qi=class extends o{constructor(){var t;super(),this.wallet=null==(t=c.state.data)?void 0:t.wallet,this.unsubscribe=[],this.platform=void 0,this.platforms=[],this.isSiwxEnabled=Boolean(u.state.siwx),this.remoteFeatures=u.state.remoteFeatures,this.determinePlatforms(),this.initializeConnection(),this.unsubscribe.push(u.subscribeKey("remoteFeatures",t=>this.remoteFeatures=t))}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){return r`
      ${this.headerTemplate()}
      <div>${this.platformTemplate()}</div>
      ${this.reownBrandingTemplate()}
    `}reownBrandingTemplate(){var t;return(null==(t=this.remoteFeatures)?void 0:t.reownBranding)?r`<wui-ux-by-reown></wui-ux-by-reown>`:null}async initializeConnection(t=!1){if("browser"!==this.platform&&(!u.state.manualWCControl||t))try{const{wcPairingExpiry:e,status:i}=p.state;(t||u.state.enableEmbedded||s.isPairingExpired(e)||"connecting"===i)&&(await p.connectWalletConnect(),this.isSiwxEnabled||x.close())}catch(e){l.sendEvent({type:"track",event:"CONNECT_ERROR",properties:{message:(null==e?void 0:e.message)??"Unknown"}}),p.setWcError(!0),y.showError(e.message??"Connection error"),p.resetWcConnection(),c.goBack()}}determinePlatforms(){if(!this.wallet)return this.platforms.push("qrcode"),void(this.platform="qrcode");if(this.platform)return;const{mobile_link:t,desktop_link:e,webapp_link:i,injected:o,rdns:r}=this.wallet,n=null==o?void 0:o.map(({injected_id:t})=>t).filter(Boolean),a=[...r?[r]:n??[]],l=!u.state.isUniversalProvider&&a.length,c=t,d=i,h=p.checkInstalled(a),g=l&&h,w=e&&!s.isMobile();g&&!b.state.noAdapters&&this.platforms.push("browser"),c&&this.platforms.push(s.isMobile()?"mobile":"qrcode"),d&&this.platforms.push("web"),w&&this.platforms.push("desktop"),g||!l||b.state.noAdapters||this.platforms.push("unsupported"),this.platform=this.platforms[0]}platformTemplate(){switch(this.platform){case"browser":return r`<w3m-connecting-wc-browser></w3m-connecting-wc-browser>`;case"web":return r`<w3m-connecting-wc-web></w3m-connecting-wc-web>`;case"desktop":return r`
          <w3m-connecting-wc-desktop .onRetry=${()=>this.initializeConnection(!0)}>
          </w3m-connecting-wc-desktop>
        `;case"mobile":return r`
          <w3m-connecting-wc-mobile isMobile .onRetry=${()=>this.initializeConnection(!0)}>
          </w3m-connecting-wc-mobile>
        `;case"qrcode":return r`<w3m-connecting-wc-qrcode></w3m-connecting-wc-qrcode>`;default:return r`<w3m-connecting-wc-unsupported></w3m-connecting-wc-unsupported>`}}headerTemplate(){return this.platforms.length>1?r`
      <w3m-connecting-header
        .platforms=${this.platforms}
        .onSelectPlatfrom=${this.onSelectPlatform.bind(this)}
      >
      </w3m-connecting-header>
    `:null}async onSelectPlatform(t){var e;const i=null==(e=this.shadowRoot)?void 0:e.querySelector("div");i&&(await i.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.platform=t,i.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"}))}};Ui([_()],qi.prototype,"platform",void 0),Ui([_()],qi.prototype,"platforms",void 0),Ui([_()],qi.prototype,"isSiwxEnabled",void 0),Ui([_()],qi.prototype,"remoteFeatures",void 0),qi=Ui([I("w3m-connecting-wc-view")],qi);var Ki=globalThis&&globalThis.__decorate||function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let Vi=class extends o{constructor(){super(...arguments),this.isMobile=s.isMobile()}render(){if(this.isMobile){const{featured:t,recommended:e}=a.state,{customWallets:i}=u.state,o=g.getRecentWallets(),n=t.length||e.length||(null==i?void 0:i.length)||o.length;return r`<wui-flex
        flexDirection="column"
        gap="xs"
        .margin=${["3xs","s","s","s"]}
      >
        ${n?r`<w3m-connector-list></w3m-connector-list>`:null}
        <w3m-all-wallets-widget></w3m-all-wallets-widget>
      </wui-flex>`}return r`<wui-flex flexDirection="column" .padding=${["0","0","l","0"]}>
      <w3m-connecting-wc-view></w3m-connecting-wc-view>
      <wui-flex flexDirection="column" .padding=${["0","m","0","m"]}>
        <w3m-all-wallets-widget></w3m-all-wallets-widget> </wui-flex
    ></wui-flex>`}};Ki([_()],Vi.prototype,"isMobile",void 0),Vi=Ki([I("w3m-connecting-wc-basic-view")],Vi);
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Hi=()=>new Fi;class Fi{}const Yi=new WeakMap;const Ji=j(class extends O{render(t){return k}update(t,[e]){var i;const o=e!==this._ref;return o&&void 0!==this._ref&&this._updateRefValue(void 0),(o||this._lastElementForRef!==this._element)&&(this._ref=e,this._context=null==(i=t.options)?void 0:i.host,this._updateRefValue(this._element=t.element)),k}_updateRefValue(t){if(this.isConnected||(t=void 0),"function"==typeof this._ref){const e=this._context??globalThis;let i=Yi.get(e);void 0===i&&(i=new WeakMap,Yi.set(e,i)),void 0!==i.get(this._ref)&&this._ref.call(this._context,void 0),i.set(this._ref,t),void 0!==t&&this._ref.call(this._context,t)}else this._ref.value=t}get _lastElementForRef(){var t,e;return"function"==typeof this._ref?null==(t=Yi.get(this._context??globalThis))?void 0:t.get(this._ref):null==(e=this._ref)?void 0:e.value}disconnected(){this._lastElementForRef===this._element&&this._updateRefValue(void 0)}reconnected(){this._updateRefValue(this._element)}}),Qi=t`
  :host {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  label {
    position: relative;
    display: inline-block;
    width: 32px;
    height: 22px;
  }

  input {
    width: 0;
    height: 0;
    opacity: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--wui-color-blue-100);
    border-width: 1px;
    border-style: solid;
    border-color: var(--wui-color-gray-glass-002);
    border-radius: 999px;
    transition:
      background-color var(--wui-ease-inout-power-1) var(--wui-duration-md),
      border-color var(--wui-ease-inout-power-1) var(--wui-duration-md);
    will-change: background-color, border-color;
  }

  span:before {
    position: absolute;
    content: '';
    height: 16px;
    width: 16px;
    left: 3px;
    top: 2px;
    background-color: var(--wui-color-inverse-100);
    transition: transform var(--wui-ease-inout-power-1) var(--wui-duration-lg);
    will-change: transform;
    border-radius: 50%;
  }

  input:checked + span {
    border-color: var(--wui-color-gray-glass-005);
    background-color: var(--wui-color-blue-100);
  }

  input:not(:checked) + span {
    background-color: var(--wui-color-gray-glass-010);
  }

  input:checked + span:before {
    transform: translateX(calc(100% - 7px));
  }
`;var Xi=globalThis&&globalThis.__decorate||function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let Gi=class extends o{constructor(){super(...arguments),this.inputElementRef=Hi(),this.checked=void 0}render(){return r`
      <label>
        <input
          ${Ji(this.inputElementRef)}
          type="checkbox"
          ?checked=${E(this.checked)}
          @change=${this.dispatchChangeEvent.bind(this)}
        />
        <span></span>
      </label>
    `}dispatchChangeEvent(){var t;this.dispatchEvent(new CustomEvent("switchChange",{detail:null==(t=this.inputElementRef.value)?void 0:t.checked,bubbles:!0,composed:!0}))}};Gi.styles=[i,e,R,Qi],Xi([T({type:Boolean})],Gi.prototype,"checked",void 0),Gi=Xi([I("wui-switch")],Gi);const Zi=t`
  :host {
    height: 100%;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: var(--wui-spacing-1xs);
    padding: var(--wui-spacing-xs) var(--wui-spacing-s);
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color;
    cursor: pointer;
  }

  wui-switch {
    pointer-events: none;
  }
`;var to=globalThis&&globalThis.__decorate||function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let eo=class extends o{constructor(){super(...arguments),this.checked=void 0}render(){return r`
      <button>
        <wui-icon size="xl" name="walletConnectBrown"></wui-icon>
        <wui-switch ?checked=${E(this.checked)}></wui-switch>
      </button>
    `}};eo.styles=[i,e,Zi],to([T({type:Boolean})],eo.prototype,"checked",void 0),eo=to([I("wui-certified-switch")],eo);const io=t`
  button {
    background-color: var(--wui-color-fg-300);
    border-radius: var(--wui-border-radius-4xs);
    width: 16px;
    height: 16px;
  }

  button:disabled {
    background-color: var(--wui-color-bg-300);
  }

  wui-icon {
    color: var(--wui-color-bg-200) !important;
  }

  button:focus-visible {
    background-color: var(--wui-color-fg-250);
    border: 1px solid var(--wui-color-accent-100);
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled {
      background-color: var(--wui-color-fg-250);
    }

    button:active:enabled {
      background-color: var(--wui-color-fg-225);
    }
  }
`;var oo=globalThis&&globalThis.__decorate||function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let ro=class extends o{constructor(){super(...arguments),this.icon="copy"}render(){return r`
      <button>
        <wui-icon color="inherit" size="xxs" name=${this.icon}></wui-icon>
      </button>
    `}};ro.styles=[i,e,io],oo([T()],ro.prototype,"icon",void 0),ro=oo([I("wui-input-element")],ro);const no=t`
  :host {
    position: relative;
    width: 100%;
    display: inline-block;
    color: var(--wui-color-fg-275);
  }

  input {
    width: 100%;
    border-radius: var(--wui-border-radius-xs);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    background: var(--wui-color-gray-glass-002);
    font-size: var(--wui-font-size-paragraph);
    letter-spacing: var(--wui-letter-spacing-paragraph);
    color: var(--wui-color-fg-100);
    transition:
      background-color var(--wui-ease-inout-power-1) var(--wui-duration-md),
      border-color var(--wui-ease-inout-power-1) var(--wui-duration-md),
      box-shadow var(--wui-ease-inout-power-1) var(--wui-duration-md);
    will-change: background-color, border-color, box-shadow;
    caret-color: var(--wui-color-accent-100);
  }

  input:disabled {
    cursor: not-allowed;
    border: 1px solid var(--wui-color-gray-glass-010);
  }

  input:disabled::placeholder,
  input:disabled + wui-icon {
    color: var(--wui-color-fg-300);
  }

  input::placeholder {
    color: var(--wui-color-fg-275);
  }

  input:focus:enabled {
    background-color: var(--wui-color-gray-glass-005);
    -webkit-box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0px 0px 0px 4px var(--wui-box-shadow-blue);
    -moz-box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0px 0px 0px 4px var(--wui-box-shadow-blue);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0px 0px 0px 4px var(--wui-box-shadow-blue);
  }

  input:hover:enabled {
    background-color: var(--wui-color-gray-glass-005);
  }

  wui-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
  }

  .wui-size-sm {
    padding: 9px var(--wui-spacing-m) 10px var(--wui-spacing-s);
  }

  wui-icon + .wui-size-sm {
    padding: 9px var(--wui-spacing-m) 10px 36px;
  }

  wui-icon[data-input='sm'] {
    left: var(--wui-spacing-s);
  }

  .wui-size-md {
    padding: 15px var(--wui-spacing-m) var(--wui-spacing-l) var(--wui-spacing-m);
  }

  wui-icon + .wui-size-md,
  wui-loading-spinner + .wui-size-md {
    padding: 10.5px var(--wui-spacing-3xl) 10.5px var(--wui-spacing-3xl);
  }

  wui-icon[data-input='md'] {
    left: var(--wui-spacing-l);
  }

  .wui-size-lg {
    padding: var(--wui-spacing-s) var(--wui-spacing-s) var(--wui-spacing-s) var(--wui-spacing-l);
    letter-spacing: var(--wui-letter-spacing-medium-title);
    font-size: var(--wui-font-size-medium-title);
    font-weight: var(--wui-font-weight-light);
    line-height: 130%;
    color: var(--wui-color-fg-100);
    height: 64px;
  }

  .wui-padding-right-xs {
    padding-right: var(--wui-spacing-xs);
  }

  .wui-padding-right-s {
    padding-right: var(--wui-spacing-s);
  }

  .wui-padding-right-m {
    padding-right: var(--wui-spacing-m);
  }

  .wui-padding-right-l {
    padding-right: var(--wui-spacing-l);
  }

  .wui-padding-right-xl {
    padding-right: var(--wui-spacing-xl);
  }

  .wui-padding-right-2xl {
    padding-right: var(--wui-spacing-2xl);
  }

  .wui-padding-right-3xl {
    padding-right: var(--wui-spacing-3xl);
  }

  .wui-padding-right-4xl {
    padding-right: var(--wui-spacing-4xl);
  }

  .wui-padding-right-5xl {
    padding-right: var(--wui-spacing-5xl);
  }

  wui-icon + .wui-size-lg,
  wui-loading-spinner + .wui-size-lg {
    padding-left: 50px;
  }

  wui-icon[data-input='lg'] {
    left: var(--wui-spacing-l);
  }

  .wui-size-mdl {
    padding: 17.25px var(--wui-spacing-m) 17.25px var(--wui-spacing-m);
  }
  wui-icon + .wui-size-mdl,
  wui-loading-spinner + .wui-size-mdl {
    padding: 17.25px var(--wui-spacing-3xl) 17.25px 40px;
  }
  wui-icon[data-input='mdl'] {
    left: var(--wui-spacing-m);
  }

  input:placeholder-shown ~ ::slotted(wui-input-element),
  input:placeholder-shown ~ ::slotted(wui-icon) {
    opacity: 0;
    pointer-events: none;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }

  ::slotted(wui-input-element),
  ::slotted(wui-icon) {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  ::slotted(wui-input-element) {
    right: var(--wui-spacing-m);
  }

  ::slotted(wui-icon) {
    right: 0px;
  }
`;var ao=globalThis&&globalThis.__decorate||function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let so=class extends o{constructor(){super(...arguments),this.inputElementRef=Hi(),this.size="md",this.disabled=!1,this.placeholder="",this.type="text",this.value=""}render(){const t=`wui-padding-right-${this.inputRightPadding}`,e=`wui-size-${this.size}`,i={[e]:!0,[t]:Boolean(this.inputRightPadding)};return r`${this.templateIcon()}
      <input
        data-testid="wui-input-text"
        ${Ji(this.inputElementRef)}
        class=${S(i)}
        type=${this.type}
        enterkeyhint=${E(this.enterKeyHint)}
        ?disabled=${this.disabled}
        placeholder=${this.placeholder}
        @input=${this.dispatchInputChangeEvent.bind(this)}
        .value=${this.value||""}
        tabindex=${E(this.tabIdx)}
      />
      <slot></slot>`}templateIcon(){return this.icon?r`<wui-icon
        data-input=${this.size}
        size=${this.size}
        color="inherit"
        name=${this.icon}
      ></wui-icon>`:null}dispatchInputChangeEvent(){var t;this.dispatchEvent(new CustomEvent("inputChange",{detail:null==(t=this.inputElementRef.value)?void 0:t.value,bubbles:!0,composed:!0}))}};so.styles=[i,e,no],ao([T()],so.prototype,"size",void 0),ao([T()],so.prototype,"icon",void 0),ao([T({type:Boolean})],so.prototype,"disabled",void 0),ao([T()],so.prototype,"placeholder",void 0),ao([T()],so.prototype,"type",void 0),ao([T()],so.prototype,"keyHint",void 0),ao([T()],so.prototype,"value",void 0),ao([T()],so.prototype,"inputRightPadding",void 0),ao([T()],so.prototype,"tabIdx",void 0),so=ao([I("wui-input-text")],so);const lo=t`
  :host {
    position: relative;
    display: inline-block;
    width: 100%;
  }
`;var co=globalThis&&globalThis.__decorate||function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let uo=class extends o{constructor(){super(...arguments),this.inputComponentRef=Hi()}render(){return r`
      <wui-input-text
        ${Ji(this.inputComponentRef)}
        placeholder="Search wallet"
        icon="search"
        type="search"
        enterKeyHint="search"
        size="sm"
      >
        <wui-input-element @click=${this.clearValue} icon="close"></wui-input-element>
      </wui-input-text>
    `}clearValue(){const t=this.inputComponentRef.value,e=null==t?void 0:t.inputElementRef.value;e&&(e.value="",e.focus(),e.dispatchEvent(new Event("input")))}};uo.styles=[i,lo],uo=co([I("wui-search-bar")],uo);const ho=C`<svg  viewBox="0 0 48 54" fill="none">
  <path
    d="M43.4605 10.7248L28.0485 1.61089C25.5438 0.129705 22.4562 0.129705 19.9515 1.61088L4.53951 10.7248C2.03626 12.2051 0.5 14.9365 0.5 17.886V36.1139C0.5 39.0635 2.03626 41.7949 4.53951 43.2752L19.9515 52.3891C22.4562 53.8703 25.5438 53.8703 28.0485 52.3891L43.4605 43.2752C45.9637 41.7949 47.5 39.0635 47.5 36.114V17.8861C47.5 14.9365 45.9637 12.2051 43.4605 10.7248Z"
  />
</svg>`,po=t`
  :host {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 104px;
    row-gap: var(--wui-spacing-xs);
    padding: var(--wui-spacing-xs) 10px;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: clamp(0px, var(--wui-border-radius-xs), 20px);
    position: relative;
  }

  wui-shimmer[data-type='network'] {
    border: none;
    -webkit-clip-path: var(--wui-path-network);
    clip-path: var(--wui-path-network);
  }

  svg {
    position: absolute;
    width: 48px;
    height: 54px;
    z-index: 1;
  }

  svg > path {
    stroke: var(--wui-color-gray-glass-010);
    stroke-width: 1px;
  }

  @media (max-width: 350px) {
    :host {
      width: 100%;
    }
  }
`;var go=globalThis&&globalThis.__decorate||function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let wo=class extends o{constructor(){super(...arguments),this.type="wallet"}render(){return r`
      ${this.shimmerTemplate()}
      <wui-shimmer width="56px" height="20px" borderRadius="xs"></wui-shimmer>
    `}shimmerTemplate(){return"network"===this.type?r` <wui-shimmer
          data-type=${this.type}
          width="48px"
          height="54px"
          borderRadius="xs"
        ></wui-shimmer>
        ${ho}`:r`<wui-shimmer width="56px" height="56px" borderRadius="xs"></wui-shimmer>`}};wo.styles=[i,e,po],go([T()],wo.prototype,"type",void 0),wo=go([I("wui-card-select-loader")],wo);const fo=t`
  :host {
    display: grid;
    width: inherit;
    height: inherit;
  }
`;var bo=globalThis&&globalThis.__decorate||function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let vo=class extends o{render(){return this.style.cssText=`\n      grid-template-rows: ${this.gridTemplateRows};\n      grid-template-columns: ${this.gridTemplateColumns};\n      justify-items: ${this.justifyItems};\n      align-items: ${this.alignItems};\n      justify-content: ${this.justifyContent};\n      align-content: ${this.alignContent};\n      column-gap: ${this.columnGap&&`var(--wui-spacing-${this.columnGap})`};\n      row-gap: ${this.rowGap&&`var(--wui-spacing-${this.rowGap})`};\n      gap: ${this.gap&&`var(--wui-spacing-${this.gap})`};\n      padding-top: ${this.padding&&P.getSpacingStyles(this.padding,0)};\n      padding-right: ${this.padding&&P.getSpacingStyles(this.padding,1)};\n      padding-bottom: ${this.padding&&P.getSpacingStyles(this.padding,2)};\n      padding-left: ${this.padding&&P.getSpacingStyles(this.padding,3)};\n      margin-top: ${this.margin&&P.getSpacingStyles(this.margin,0)};\n      margin-right: ${this.margin&&P.getSpacingStyles(this.margin,1)};\n      margin-bottom: ${this.margin&&P.getSpacingStyles(this.margin,2)};\n      margin-left: ${this.margin&&P.getSpacingStyles(this.margin,3)};\n    `,r`<slot></slot>`}};vo.styles=[i,fo],bo([T()],vo.prototype,"gridTemplateRows",void 0),bo([T()],vo.prototype,"gridTemplateColumns",void 0),bo([T()],vo.prototype,"justifyItems",void 0),bo([T()],vo.prototype,"alignItems",void 0),bo([T()],vo.prototype,"justifyContent",void 0),bo([T()],vo.prototype,"alignContent",void 0),bo([T()],vo.prototype,"columnGap",void 0),bo([T()],vo.prototype,"rowGap",void 0),bo([T()],vo.prototype,"gap",void 0),bo([T()],vo.prototype,"padding",void 0),bo([T()],vo.prototype,"margin",void 0),vo=bo([I("wui-grid")],vo);const mo=t`
  button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 104px;
    row-gap: var(--wui-spacing-xs);
    padding: var(--wui-spacing-s) var(--wui-spacing-0);
    background-color: var(--wui-color-gray-glass-002);
    border-radius: clamp(0px, var(--wui-border-radius-xs), 20px);
    transition:
      color var(--wui-duration-lg) var(--wui-ease-out-power-1),
      background-color var(--wui-duration-lg) var(--wui-ease-out-power-1),
      border-radius var(--wui-duration-lg) var(--wui-ease-out-power-1);
    will-change: background-color, color, border-radius;
    outline: none;
    border: none;
  }

  button > wui-flex > wui-text {
    color: var(--wui-color-fg-100);
    max-width: 86px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    justify-content: center;
  }

  button > wui-flex > wui-text.certified {
    max-width: 66px;
  }

  button:hover:enabled {
    background-color: var(--wui-color-gray-glass-005);
  }

  button:disabled > wui-flex > wui-text {
    color: var(--wui-color-gray-glass-015);
  }

  [data-selected='true'] {
    background-color: var(--wui-color-accent-glass-020);
  }

  @media (hover: hover) and (pointer: fine) {
    [data-selected='true']:hover:enabled {
      background-color: var(--wui-color-accent-glass-015);
    }
  }

  [data-selected='true']:active:enabled {
    background-color: var(--wui-color-accent-glass-010);
  }

  @media (max-width: 350px) {
    button {
      width: 100%;
    }
  }
`;var yo=globalThis&&globalThis.__decorate||function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let xo=class extends o{constructor(){super(),this.observer=new IntersectionObserver(()=>{}),this.visible=!1,this.imageSrc=void 0,this.imageLoading=!1,this.wallet=void 0,this.observer=new IntersectionObserver(t=>{t.forEach(t=>{t.isIntersecting?(this.visible=!0,this.fetchImageSrc()):this.visible=!1})},{threshold:.01})}firstUpdated(){this.observer.observe(this)}disconnectedCallback(){this.observer.disconnect()}render(){var t,e;const i="certified"===(null==(t=this.wallet)?void 0:t.badge_type);return r`
      <button>
        ${this.imageTemplate()}
        <wui-flex flexDirection="row" alignItems="center" justifyContent="center" gap="3xs">
          <wui-text
            variant="tiny-500"
            color="inherit"
            class=${E(i?"certified":void 0)}
            >${null==(e=this.wallet)?void 0:e.name}</wui-text
          >
          ${i?r`<wui-icon size="sm" name="walletConnectBrown"></wui-icon>`:null}
        </wui-flex>
      </button>
    `}imageTemplate(){var t,e;return!this.visible&&!this.imageSrc||this.imageLoading?this.shimmerTemplate():r`
      <wui-wallet-image
        size="md"
        imageSrc=${E(this.imageSrc)}
        name=${null==(t=this.wallet)?void 0:t.name}
        .installed=${null==(e=this.wallet)?void 0:e.installed}
        badgeSize="sm"
      >
      </wui-wallet-image>
    `}shimmerTemplate(){return r`<wui-shimmer width="56px" height="56px" borderRadius="xs"></wui-shimmer>`}async fetchImageSrc(){this.wallet&&(this.imageSrc=h.getWalletImage(this.wallet),this.imageSrc||(this.imageLoading=!0,this.imageSrc=await h.fetchWalletImage(this.wallet.image_id),this.imageLoading=!1))}};xo.styles=mo,yo([_()],xo.prototype,"visible",void 0),yo([_()],xo.prototype,"imageSrc",void 0),yo([_()],xo.prototype,"imageLoading",void 0),yo([T()],xo.prototype,"wallet",void 0),xo=yo([I("w3m-all-wallets-list-item")],xo);const $o=t`
  wui-grid {
    max-height: clamp(360px, 400px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
    grid-auto-rows: min-content;
    grid-template-columns: repeat(auto-fill, 104px);
  }

  @media (max-width: 350px) {
    wui-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  wui-grid[data-scroll='false'] {
    overflow: hidden;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  wui-loading-spinner {
    padding-top: var(--wui-spacing-l);
    padding-bottom: var(--wui-spacing-l);
    justify-content: center;
    grid-column: 1 / span 4;
  }
`;var Co=globalThis&&globalThis.__decorate||function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};const ko="local-paginator";let Ro=class extends o{constructor(){super(),this.unsubscribe=[],this.paginationObserver=void 0,this.loading=!a.state.wallets.length,this.wallets=a.state.wallets,this.recommended=a.state.recommended,this.featured=a.state.featured,this.filteredWallets=a.state.filteredWallets,this.unsubscribe.push(a.subscribeKey("wallets",t=>this.wallets=t),a.subscribeKey("recommended",t=>this.recommended=t),a.subscribeKey("featured",t=>this.featured=t),a.subscribeKey("filteredWallets",t=>this.filteredWallets=t))}firstUpdated(){this.initialFetch(),this.createPaginationObserver()}disconnectedCallback(){var t;this.unsubscribe.forEach(t=>t()),null==(t=this.paginationObserver)||t.disconnect()}render(){return r`
      <wui-grid
        data-scroll=${!this.loading}
        .padding=${["0","s","s","s"]}
        columnGap="xxs"
        rowGap="l"
        justifyContent="space-between"
      >
        ${this.loading?this.shimmerTemplate(16):this.walletsTemplate()}
        ${this.paginationLoaderTemplate()}
      </wui-grid>
    `}async initialFetch(){var t;this.loading=!0;const e=null==(t=this.shadowRoot)?void 0:t.querySelector("wui-grid");e&&(await a.fetchWalletsByPage({page:1}),await e.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.loading=!1,e.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"}))}shimmerTemplate(t,e){return[...Array(t)].map(()=>r`
        <wui-card-select-loader type="wallet" id=${E(e)}></wui-card-select-loader>
      `)}walletsTemplate(){var t;const e=(null==(t=this.filteredWallets)?void 0:t.length)>0?s.uniqueBy([...this.featured,...this.recommended,...this.filteredWallets],"id"):s.uniqueBy([...this.featured,...this.recommended,...this.wallets],"id");return f.markWalletsAsInstalled(e).map(t=>r`
        <w3m-all-wallets-list-item
          @click=${()=>this.onConnectWallet(t)}
          .wallet=${t}
        ></w3m-all-wallets-list-item>
      `)}paginationLoaderTemplate(){const{wallets:t,recommended:e,featured:i,count:o}=a.state,r=window.innerWidth<352?3:4,n=t.length+e.length;let s=Math.ceil(n/r)*r-n+r;return s-=t.length?i.length%r:0,0===o&&i.length>0?null:0===o||[...i,...t,...e].length<o?this.shimmerTemplate(s,ko):null}createPaginationObserver(){var t;const e=null==(t=this.shadowRoot)?void 0:t.querySelector(`#${ko}`);e&&(this.paginationObserver=new IntersectionObserver(([t])=>{if((null==t?void 0:t.isIntersecting)&&!this.loading){const{page:t,count:e,wallets:i}=a.state;i.length<e&&a.fetchWalletsByPage({page:t+1})}}),this.paginationObserver.observe(e))}onConnectWallet(t){n.selectWalletConnector(t)}};Ro.styles=$o,Co([_()],Ro.prototype,"loading",void 0),Co([_()],Ro.prototype,"wallets",void 0),Co([_()],Ro.prototype,"recommended",void 0),Co([_()],Ro.prototype,"featured",void 0),Co([_()],Ro.prototype,"filteredWallets",void 0),Ro=Co([I("w3m-all-wallets-list")],Ro);const To=t`
  wui-grid,
  wui-loading-spinner,
  wui-flex {
    height: 360px;
  }

  wui-grid {
    overflow: scroll;
    scrollbar-width: none;
    grid-auto-rows: min-content;
    grid-template-columns: repeat(auto-fill, 104px);
  }

  wui-grid[data-scroll='false'] {
    overflow: hidden;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  wui-loading-spinner {
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 350px) {
    wui-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;var Io=globalThis&&globalThis.__decorate||function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let Eo=class extends o{constructor(){super(...arguments),this.prevQuery="",this.prevBadge=void 0,this.loading=!0,this.query=""}render(){return this.onSearch(),this.loading?r`<wui-loading-spinner color="accent-100"></wui-loading-spinner>`:this.walletsTemplate()}async onSearch(){this.query.trim()===this.prevQuery.trim()&&this.badge===this.prevBadge||(this.prevQuery=this.query,this.prevBadge=this.badge,this.loading=!0,await a.searchWallet({search:this.query,badge:this.badge}),this.loading=!1)}walletsTemplate(){const{search:t}=a.state,e=f.markWalletsAsInstalled(t);return t.length?r`
      <wui-grid
        data-testid="wallet-list"
        .padding=${["0","s","s","s"]}
        rowGap="l"
        columnGap="xs"
        justifyContent="space-between"
      >
        ${e.map(t=>r`
            <w3m-all-wallets-list-item
              @click=${()=>this.onConnectWallet(t)}
              .wallet=${t}
              data-testid="wallet-search-item-${t.id}"
            ></w3m-all-wallets-list-item>
          `)}
      </wui-grid>
    `:r`
        <wui-flex
          data-testid="no-wallet-found"
          justifyContent="center"
          alignItems="center"
          gap="s"
          flexDirection="column"
        >
          <wui-icon-box
            size="lg"
            iconColor="fg-200"
            backgroundColor="fg-300"
            icon="wallet"
            background="transparent"
          ></wui-icon-box>
          <wui-text data-testid="no-wallet-found-text" color="fg-200" variant="paragraph-500">
            No Wallet found
          </wui-text>
        </wui-flex>
      `}onConnectWallet(t){n.selectWalletConnector(t)}};Eo.styles=To,Io([_()],Eo.prototype,"loading",void 0),Io([T()],Eo.prototype,"query",void 0),Io([T()],Eo.prototype,"badge",void 0),Eo=Io([I("w3m-all-wallets-search")],Eo);var _o=globalThis&&globalThis.__decorate||function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let Po=class extends o{constructor(){super(...arguments),this.search="",this.onDebouncedSearch=s.debounce(t=>{this.search=t})}render(){const t=this.search.length>=2;return r`
      <wui-flex .padding=${["0","s","s","s"]} gap="xs">
        <wui-search-bar @inputChange=${this.onInputChange.bind(this)}></wui-search-bar>
        <wui-certified-switch
          ?checked=${this.badge}
          @click=${this.onClick.bind(this)}
          data-testid="wui-certified-switch"
        ></wui-certified-switch>
        ${this.qrButtonTemplate()}
      </wui-flex>
      ${t||this.badge?r`<w3m-all-wallets-search
            query=${this.search}
            badge=${E(this.badge)}
          ></w3m-all-wallets-search>`:r`<w3m-all-wallets-list badge=${E(this.badge)}></w3m-all-wallets-list>`}
    `}onInputChange(t){this.onDebouncedSearch(t.detail)}onClick(){"certified"!==this.badge?(this.badge="certified",y.showSvg("Only WalletConnect certified",{icon:"walletConnectBrown",iconColor:"accent-100"})):this.badge=void 0}qrButtonTemplate(){return s.isMobile()?r`
        <wui-icon-box
          size="lg"
          iconSize="xl"
          iconColor="accent-100"
          backgroundColor="accent-100"
          icon="qrCode"
          background="transparent"
          border
          borderColor="wui-accent-glass-010"
          @click=${this.onWalletConnectQr.bind(this)}
        ></wui-icon-box>
      `:null}onWalletConnectQr(){c.push("ConnectingWalletConnect")}};_o([_()],Po.prototype,"search",void 0),_o([_()],Po.prototype,"badge",void 0),Po=_o([I("w3m-all-wallets-view")],Po);const jo=t`
  button {
    column-gap: var(--wui-spacing-s);
    padding: 11px 18px 11px var(--wui-spacing-s);
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-250);
    transition:
      color var(--wui-ease-out-power-1) var(--wui-duration-md),
      background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: color, background-color;
  }

  button[data-iconvariant='square'],
  button[data-iconvariant='square-blue'] {
    padding: 6px 18px 6px 9px;
  }

  button > wui-flex {
    flex: 1;
  }

  button > wui-image {
    width: 32px;
    height: 32px;
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
    border-radius: var(--wui-border-radius-3xl);
  }

  button > wui-icon {
    width: 36px;
    height: 36px;
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
  }

  button > wui-icon-box[data-variant='blue'] {
    box-shadow: 0 0 0 2px var(--wui-color-accent-glass-005);
  }

  button > wui-icon-box[data-variant='overlay'] {
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
  }

  button > wui-icon-box[data-variant='square-blue'] {
    border-radius: var(--wui-border-radius-3xs);
    position: relative;
    border: none;
    width: 36px;
    height: 36px;
  }

  button > wui-icon-box[data-variant='square-blue']::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: inherit;
    border: 1px solid var(--wui-color-accent-glass-010);
    pointer-events: none;
  }

  button > wui-icon:last-child {
    width: 14px;
    height: 14px;
  }

  button:disabled {
    color: var(--wui-color-gray-glass-020);
  }

  button[data-loading='true'] > wui-icon {
    opacity: 0;
  }

  wui-loading-spinner {
    position: absolute;
    right: 18px;
    top: 50%;
    transform: translateY(-50%);
  }
`;var Oo=globalThis&&globalThis.__decorate||function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let So=class extends o{constructor(){super(...arguments),this.tabIdx=void 0,this.variant="icon",this.disabled=!1,this.imageSrc=void 0,this.alt=void 0,this.chevron=!1,this.loading=!1}render(){return r`
      <button
        ?disabled=${!!this.loading||Boolean(this.disabled)}
        data-loading=${this.loading}
        data-iconvariant=${E(this.iconVariant)}
        tabindex=${E(this.tabIdx)}
      >
        ${this.loadingTemplate()} ${this.visualTemplate()}
        <wui-flex gap="3xs">
          <slot></slot>
        </wui-flex>
        ${this.chevronTemplate()}
      </button>
    `}visualTemplate(){if("image"===this.variant&&this.imageSrc)return r`<wui-image src=${this.imageSrc} alt=${this.alt??"list item"}></wui-image>`;if("square"===this.iconVariant&&this.icon&&"icon"===this.variant)return r`<wui-icon name=${this.icon}></wui-icon>`;if("icon"===this.variant&&this.icon&&this.iconVariant){const t=["blue","square-blue"].includes(this.iconVariant)?"accent-100":"fg-200",e="square-blue"===this.iconVariant?"mdl":"md",i=this.iconSize?this.iconSize:e;return r`
        <wui-icon-box
          data-variant=${this.iconVariant}
          icon=${this.icon}
          iconSize=${i}
          background="transparent"
          iconColor=${t}
          backgroundColor=${t}
          size=${e}
        ></wui-icon-box>
      `}return null}loadingTemplate(){return this.loading?r`<wui-loading-spinner
        data-testid="wui-list-item-loading-spinner"
        color="fg-300"
      ></wui-loading-spinner>`:r``}chevronTemplate(){return this.chevron?r`<wui-icon size="inherit" color="fg-200" name="chevronRight"></wui-icon>`:null}};So.styles=[i,e,jo],Oo([T()],So.prototype,"icon",void 0),Oo([T()],So.prototype,"iconSize",void 0),Oo([T()],So.prototype,"tabIdx",void 0),Oo([T()],So.prototype,"variant",void 0),Oo([T()],So.prototype,"iconVariant",void 0),Oo([T({type:Boolean})],So.prototype,"disabled",void 0),Oo([T()],So.prototype,"imageSrc",void 0),Oo([T()],So.prototype,"alt",void 0),Oo([T({type:Boolean})],So.prototype,"chevron",void 0),Oo([T({type:Boolean})],So.prototype,"loading",void 0),So=Oo([I("wui-list-item")],So);var Lo=globalThis&&globalThis.__decorate||function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let zo=class extends o{constructor(){var t;super(...arguments),this.wallet=null==(t=c.state.data)?void 0:t.wallet}render(){if(!this.wallet)throw new Error("w3m-downloads-view");return r`
      <wui-flex gap="xs" flexDirection="column" .padding=${["s","s","l","s"]}>
        ${this.chromeTemplate()} ${this.iosTemplate()} ${this.androidTemplate()}
        ${this.homepageTemplate()}
      </wui-flex>
    `}chromeTemplate(){var t;return(null==(t=this.wallet)?void 0:t.chrome_store)?r`<wui-list-item
      variant="icon"
      icon="chromeStore"
      iconVariant="square"
      @click=${this.onChromeStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">Chrome Extension</wui-text>
    </wui-list-item>`:null}iosTemplate(){var t;return(null==(t=this.wallet)?void 0:t.app_store)?r`<wui-list-item
      variant="icon"
      icon="appStore"
      iconVariant="square"
      @click=${this.onAppStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">iOS App</wui-text>
    </wui-list-item>`:null}androidTemplate(){var t;return(null==(t=this.wallet)?void 0:t.play_store)?r`<wui-list-item
      variant="icon"
      icon="playStore"
      iconVariant="square"
      @click=${this.onPlayStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">Android App</wui-text>
    </wui-list-item>`:null}homepageTemplate(){var t;return(null==(t=this.wallet)?void 0:t.homepage)?r`
      <wui-list-item
        variant="icon"
        icon="browser"
        iconVariant="square-blue"
        @click=${this.onHomePage.bind(this)}
        chevron
      >
        <wui-text variant="paragraph-500" color="fg-100">Website</wui-text>
      </wui-list-item>
    `:null}onChromeStore(){var t;(null==(t=this.wallet)?void 0:t.chrome_store)&&s.openHref(this.wallet.chrome_store,"_blank")}onAppStore(){var t;(null==(t=this.wallet)?void 0:t.app_store)&&s.openHref(this.wallet.app_store,"_blank")}onPlayStore(){var t;(null==(t=this.wallet)?void 0:t.play_store)&&s.openHref(this.wallet.play_store,"_blank")}onHomePage(){var t;(null==(t=this.wallet)?void 0:t.homepage)&&s.openHref(this.wallet.homepage,"_blank")}};zo=Lo([I("w3m-downloads-view")],zo);export{Po as W3mAllWalletsView,Vi as W3mConnectingWcBasicView,zo as W3mDownloadsView};
