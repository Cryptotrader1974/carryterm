import{b2 as v,bo as re,bl as l,T as ce,cJ as b,fl as V,cL as m,ej as U,ca as C,eK as W,eR as de,s as H,fd as d,el as R,cb as h,c_ as ue,eM as c,L as f,eQ as S,gm as B,w as F,v as he,Z as K,ac as M,ba as E,U as X,ek as pe,bv as P,t as z,ak as J,bB as me,bJ as ae,eo as fe,r as we}from"./index-BjT4K9Qd.js";import{P as D}from"./index-DlT7_YmO.js";import{S as be}from"./SwapController-B8jnZoIa.js";const ne={isUnsupportedChainView(){return l.state.view==="UnsupportedChain"||l.state.view==="SwitchNetwork"&&l.state.history.includes("UnsupportedChain")},async safeClose(){if(this.isUnsupportedChainView()){v.shake();return}if(await re.isSIWXCloseDisabled()){v.shake();return}(l.state.view==="DataCapture"||l.state.view==="DataCaptureOtpConfirm")&&ce.disconnect(),v.close()}},ge=b`
  :host {
    display: block;
    border-radius: clamp(0px, ${({borderRadius:e})=>e[8]}, 44px);
    box-shadow: 0 0 0 1px ${({tokens:e})=>e.theme.foregroundPrimary};
    overflow: hidden;
  }
`;var ye=function(e,t,i,r){var a=arguments.length,o=a<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,i):r,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(e,t,i,r);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(o=(a<3?n(o):a>3?n(t,i,o):n(t,i))||o);return a>3&&o&&Object.defineProperty(t,i,o),o};let Y=class extends U{render(){return C`<slot></slot>`}};Y.styles=[V,ge];Y=ye([m("wui-card")],Y);const ve=b`
  :host {
    width: 100%;
  }

  :host > wui-flex {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${({spacing:e})=>e[2]};
    padding: ${({spacing:e})=>e[3]};
    border-radius: ${({borderRadius:e})=>e[6]};
    border: 1px solid ${({tokens:e})=>e.theme.borderPrimary};
    box-sizing: border-box;
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.25);
    color: ${({tokens:e})=>e.theme.textPrimary};
  }

  :host > wui-flex[data-type='info'] {
    .icon-box {
      background-color: ${({tokens:e})=>e.theme.foregroundSecondary};

      wui-icon {
        color: ${({tokens:e})=>e.theme.iconDefault};
      }
    }
  }
  :host > wui-flex[data-type='success'] {
    .icon-box {
      background-color: ${({tokens:e})=>e.core.backgroundSuccess};

      wui-icon {
        color: ${({tokens:e})=>e.core.borderSuccess};
      }
    }
  }
  :host > wui-flex[data-type='warning'] {
    .icon-box {
      background-color: ${({tokens:e})=>e.core.backgroundWarning};

      wui-icon {
        color: ${({tokens:e})=>e.core.borderWarning};
      }
    }
  }
  :host > wui-flex[data-type='error'] {
    .icon-box {
      background-color: ${({tokens:e})=>e.core.backgroundError};

      wui-icon {
        color: ${({tokens:e})=>e.core.borderError};
      }
    }
  }

  wui-flex {
    width: 100%;
  }

  wui-text {
    word-break: break-word;
    flex: 1;
  }

  .close {
    cursor: pointer;
    color: ${({tokens:e})=>e.theme.iconDefault};
  }

  .icon-box {
    height: 40px;
    width: 40px;
    border-radius: ${({borderRadius:e})=>e[2]};
    background-color: var(--local-icon-bg-value);
  }
`;var q=function(e,t,i,r){var a=arguments.length,o=a<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,i):r,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(e,t,i,r);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(o=(a<3?n(o):a>3?n(t,i,o):n(t,i))||o);return a>3&&o&&Object.defineProperty(t,i,o),o};const xe={info:"info",success:"checkmark",warning:"warningCircle",error:"warning"};let N=class extends U{constructor(){super(...arguments),this.message="",this.type="info"}render(){return C`
      <wui-flex
        data-type=${de(this.type)}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        gap="2"
      >
        <wui-flex columnGap="2" flexDirection="row" alignItems="center">
          <wui-flex
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            class="icon-box"
          >
            <wui-icon color="inherit" size="md" name=${xe[this.type]}></wui-icon>
          </wui-flex>
          <wui-text variant="md-medium" color="inherit" data-testid="wui-alertbar-text"
            >${this.message}</wui-text
          >
        </wui-flex>
        <wui-icon
          class="close"
          color="inherit"
          size="sm"
          name="close"
          @click=${this.onClose}
        ></wui-icon>
      </wui-flex>
    `}onClose(){H.close()}};N.styles=[V,ve];q([W()],N.prototype,"message",void 0);q([W()],N.prototype,"type",void 0);N=q([m("wui-alertbar")],N);const ke=b`
  :host {
    display: block;
    position: absolute;
    top: ${({spacing:e})=>e[3]};
    left: ${({spacing:e})=>e[4]};
    right: ${({spacing:e})=>e[4]};
    opacity: 0;
    pointer-events: none;
  }
`;var se=function(e,t,i,r){var a=arguments.length,o=a<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,i):r,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(e,t,i,r);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(o=(a<3?n(o):a>3?n(t,i,o):n(t,i))||o);return a>3&&o&&Object.defineProperty(t,i,o),o};const $e={info:{backgroundColor:"fg-350",iconColor:"fg-325",icon:"info"},success:{backgroundColor:"success-glass-reown-020",iconColor:"success-125",icon:"checkmark"},warning:{backgroundColor:"warning-glass-reown-020",iconColor:"warning-100",icon:"warningCircle"},error:{backgroundColor:"error-glass-reown-020",iconColor:"error-125",icon:"warning"}};let j=class extends R{constructor(){super(),this.unsubscribe=[],this.open=H.state.open,this.onOpen(!0),this.unsubscribe.push(H.subscribeKey("open",t=>{this.open=t,this.onOpen(!1)}))}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){const{message:t,variant:i}=H.state,r=$e[i];return h`
      <wui-alertbar
        message=${t}
        backgroundColor=${r?.backgroundColor}
        iconColor=${r?.iconColor}
        icon=${r?.icon}
        type=${i}
      ></wui-alertbar>
    `}onOpen(t){this.open?(this.animate([{opacity:0,transform:"scale(0.85)"},{opacity:1,transform:"scale(1)"}],{duration:150,fill:"forwards",easing:"ease"}),this.style.cssText="pointer-events: auto"):t||(this.animate([{opacity:1,transform:"scale(1)"},{opacity:0,transform:"scale(0.85)"}],{duration:150,fill:"forwards",easing:"ease"}),this.style.cssText="pointer-events: none")}};j.styles=ke;se([d()],j.prototype,"open",void 0);j=se([m("w3m-alertbar")],j);const Ce=b`
  button {
    display: block;
    display: flex;
    align-items: center;
    padding: ${({spacing:e})=>e[1]};
    transition: background-color ${({durations:e})=>e.lg}
      ${({easings:e})=>e["ease-out-power-2"]};
    will-change: background-color;
    border-radius: ${({borderRadius:e})=>e[32]};
  }

  wui-image {
    border-radius: 100%;
  }

  wui-text {
    padding-left: ${({spacing:e})=>e[1]};
  }

  .left-icon-container,
  .right-icon-container {
    width: 24px;
    height: 24px;
    justify-content: center;
    align-items: center;
  }

  wui-icon {
    color: ${({tokens:e})=>e.theme.iconDefault};
  }

  /* -- Sizes --------------------------------------------------- */
  button[data-size='lg'] {
    height: 32px;
  }

  button[data-size='md'] {
    height: 28px;
  }

  button[data-size='sm'] {
    height: 24px;
  }

  button[data-size='lg'] wui-image {
    width: 24px;
    height: 24px;
  }

  button[data-size='md'] wui-image {
    width: 20px;
    height: 20px;
  }

  button[data-size='sm'] wui-image {
    width: 16px;
    height: 16px;
  }

  button[data-size='lg'] .left-icon-container {
    width: 24px;
    height: 24px;
  }

  button[data-size='md'] .left-icon-container {
    width: 20px;
    height: 20px;
  }

  button[data-size='sm'] .left-icon-container {
    width: 16px;
    height: 16px;
  }

  /* -- Variants --------------------------------------------------------- */
  button[data-type='filled-dropdown'] {
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
  }

  button[data-type='text-dropdown'] {
    background-color: transparent;
  }

  /* -- Focus states --------------------------------------------------- */
  button:focus-visible:enabled {
    background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    box-shadow: 0 0 0 4px ${({tokens:e})=>e.core.foregroundAccent040};
  }

  /* -- Hover & Active states ----------------------------------------------------------- */
  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled,
    button:active:enabled {
      background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    }
  }

  /* -- Disabled states --------------------------------------------------- */
  button:disabled {
    background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    opacity: 0.5;
  }
`;var O=function(e,t,i,r){var a=arguments.length,o=a<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,i):r,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(e,t,i,r);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(o=(a<3?n(o):a>3?n(t,i,o):n(t,i))||o);return a>3&&o&&Object.defineProperty(t,i,o),o};const Se={lg:"lg-regular",md:"md-regular",sm:"sm-regular"},We={lg:"lg",md:"md",sm:"sm"};let I=class extends U{constructor(){super(...arguments),this.imageSrc="",this.text="",this.size="lg",this.type="text-dropdown",this.disabled=!1}render(){return C`<button ?disabled=${this.disabled} data-size=${this.size} data-type=${this.type}>
      ${this.imageTemplate()} ${this.textTemplate()}
      <wui-flex class="right-icon-container">
        <wui-icon name="chevronBottom"></wui-icon>
      </wui-flex>
    </button>`}textTemplate(){const t=Se[this.size];return this.text?C`<wui-text color="primary" variant=${t}>${this.text}</wui-text>`:null}imageTemplate(){if(this.imageSrc)return C`<wui-image src=${this.imageSrc} alt="select visual"></wui-image>`;const t=We[this.size];return C` <wui-flex class="left-icon-container">
      <wui-icon size=${t} name="networkPlaceholder"></wui-icon>
    </wui-flex>`}};I.styles=[V,ue,Ce];O([W()],I.prototype,"imageSrc",void 0);O([W()],I.prototype,"text",void 0);O([W()],I.prototype,"size",void 0);O([W()],I.prototype,"type",void 0);O([W({type:Boolean})],I.prototype,"disabled",void 0);I=O([m("wui-select")],I);const Ie=b`
  wui-image {
    border-radius: ${({borderRadius:e})=>e.round};
  }

  .transfers-badge {
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    border: 1px solid ${({tokens:e})=>e.theme.foregroundSecondary};
    border-radius: ${({borderRadius:e})=>e[4]};
  }
`;var Q=function(e,t,i,r){var a=arguments.length,o=a<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,i):r,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(e,t,i,r);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(o=(a<3?n(o):a>3?n(t,i,o):n(t,i))||o);return a>3&&o&&Object.defineProperty(t,i,o),o};let T=class extends R{constructor(){super(),this.unsubscribe=[],this.paymentAsset=D.state.paymentAsset,this.amount=D.state.amount,this.unsubscribe.push(D.subscribeKey("paymentAsset",t=>{this.paymentAsset=t}),D.subscribeKey("amount",t=>{this.amount=t}))}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){const i=f.getAllRequestedCaipNetworks().find(r=>r.caipNetworkId===this.paymentAsset.network);return h`<wui-flex
      alignItems="center"
      gap="1"
      .padding=${["1","2","1","1"]}
      class="transfers-badge"
    >
      <wui-image src=${S(this.paymentAsset.metadata.logoURI)} size="xl"></wui-image>
      <wui-text variant="lg-regular" color="primary">
        ${this.amount} ${this.paymentAsset.metadata.symbol}
      </wui-text>
      <wui-text variant="sm-regular" color="secondary">
        on ${i?.name??"Unknown"}
      </wui-text>
    </wui-flex>`}};T.styles=[Ie];Q([c()],T.prototype,"paymentAsset",void 0);Q([c()],T.prototype,"amount",void 0);T=Q([m("w3m-pay-header")],T);const Re=b`
  :host {
    height: 60px;
  }

  :host > wui-flex {
    box-sizing: border-box;
    background-color: var(--local-header-background-color);
  }

  wui-text {
    background-color: var(--local-header-background-color);
  }

  wui-flex.w3m-header-title {
    transform: translateY(0);
    opacity: 1;
  }

  wui-flex.w3m-header-title[view-direction='prev'] {
    animation:
      slide-down-out 120ms forwards ${({easings:e})=>e["ease-out-power-2"]},
      slide-down-in 120ms forwards ${({easings:e})=>e["ease-out-power-2"]};
    animation-delay: 0ms, 200ms;
  }

  wui-flex.w3m-header-title[view-direction='next'] {
    animation:
      slide-up-out 120ms forwards ${({easings:e})=>e["ease-out-power-2"]},
      slide-up-in 120ms forwards ${({easings:e})=>e["ease-out-power-2"]};
    animation-delay: 0ms, 200ms;
  }

  wui-icon-button[data-hidden='true'] {
    opacity: 0 !important;
    pointer-events: none;
  }

  @keyframes slide-up-out {
    from {
      transform: translateY(0px);
      opacity: 1;
    }
    to {
      transform: translateY(3px);
      opacity: 0;
    }
  }

  @keyframes slide-up-in {
    from {
      transform: translateY(-3px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slide-down-out {
    from {
      transform: translateY(0px);
      opacity: 1;
    }
    to {
      transform: translateY(-3px);
      opacity: 0;
    }
  }

  @keyframes slide-down-in {
    from {
      transform: translateY(3px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;var A=function(e,t,i,r){var a=arguments.length,o=a<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,i):r,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(e,t,i,r);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(o=(a<3?n(o):a>3?n(t,i,o):n(t,i))||o);return a>3&&o&&Object.defineProperty(t,i,o),o};const Ae=["SmartSessionList"],Ee={PayWithExchange:B.tokens.theme.foregroundPrimary};function ee(){const e=l.state.data?.connector?.name,t=l.state.data?.wallet?.name,i=l.state.data?.network?.name,r=t??e,a=X.getConnectors(),o=a.length===1&&a[0]?.id==="w3m-email",n=f.getAccountData()?.socialProvider,s=n?n.charAt(0).toUpperCase()+n.slice(1):"Connect Social";return{Connect:`Connect ${o?"Email":""} Wallet`,Create:"Create Wallet",ChooseAccountName:void 0,Account:void 0,AccountSettings:void 0,AllWallets:"All Wallets",ApproveTransaction:"Approve Transaction",BuyInProgress:"Buy",UsageExceeded:"Usage Exceeded",ConnectingExternal:r??"Connect Wallet",ConnectingWalletConnect:r??"WalletConnect",ConnectingWalletConnectBasic:"WalletConnect",ConnectingSiwe:"Sign In",Convert:"Convert",ConvertSelectToken:"Select token",ConvertPreview:"Preview Convert",Downloads:r?`Get ${r}`:"Downloads",EmailLogin:"Email Login",EmailVerifyOtp:"Confirm Email",EmailVerifyDevice:"Register Device",GetWallet:"Get a Wallet",Networks:"Choose Network",OnRampProviders:"Choose Provider",OnRampActivity:"Activity",OnRampTokenSelect:"Select Token",OnRampFiatSelect:"Select Currency",Pay:"How you pay",ProfileWallets:"Wallets",SwitchNetwork:i??"Switch Network",Transactions:"Activity",UnsupportedChain:"Switch Network",UpgradeEmailWallet:"Upgrade Your Wallet",UpdateEmailWallet:"Edit Email",UpdateEmailPrimaryOtp:"Confirm Current Email",UpdateEmailSecondaryOtp:"Confirm New Email",WhatIsABuy:"What is Buy?",RegisterAccountName:"Choose Name",RegisterAccountNameSuccess:"",WalletReceive:"Receive",WalletCompatibleNetworks:"Compatible Networks",Swap:"Swap",SwapSelectToken:"Select Token",SwapPreview:"Preview Swap",WalletSend:"Send",WalletSendPreview:"Review Send",WalletSendSelectToken:"Select Token",WalletSendConfirmed:"Confirmed",WhatIsANetwork:"What is a network?",WhatIsAWallet:"What is a Wallet?",ConnectWallets:"Connect Wallet",ConnectSocials:"All Socials",ConnectingSocial:s,ConnectingMultiChain:"Select Chain",ConnectingFarcaster:"Farcaster",SwitchActiveChain:"Switch Chain",SmartSessionCreated:void 0,SmartSessionList:"Smart Sessions",SIWXSignMessage:"Sign In",PayLoading:"Processing payment...",PayQuote:"Payment Quote",DataCapture:"Profile",DataCaptureOtpConfirm:"Confirm Email",FundWallet:"Fund Wallet",PayWithExchange:"Deposit from Exchange",PayWithExchangeSelectAsset:"Select Asset",SmartAccountSettings:"Smart Account Settings"}}let x=class extends R{constructor(){super(),this.unsubscribe=[],this.heading=ee()[l.state.view],this.network=f.state.activeCaipNetwork,this.networkImage=F.getNetworkImage(this.network),this.showBack=!1,this.prevHistoryLength=1,this.view=l.state.view,this.viewDirection="",this.unsubscribe.push(he.subscribeNetworkImages(()=>{this.networkImage=F.getNetworkImage(this.network)}),l.subscribeKey("view",t=>{setTimeout(()=>{this.view=t,this.heading=ee()[t]},K.ANIMATION_DURATIONS.HeaderText),this.onViewChange(),this.onHistoryChange()}),f.subscribeKey("activeCaipNetwork",t=>{this.network=t,this.networkImage=F.getNetworkImage(this.network)}))}disconnectCallback(){this.unsubscribe.forEach(t=>t())}render(){const t=Ee[l.state.view]??B.tokens.theme.backgroundPrimary;return this.style.setProperty("--local-header-background-color",t),h`
      <wui-flex
        .padding=${["0","4","0","4"]}
        justifyContent="space-between"
        alignItems="center"
      >
        ${this.leftHeaderTemplate()} ${this.titleTemplate()} ${this.rightHeaderTemplate()}
      </wui-flex>
    `}onWalletHelp(){M.sendEvent({type:"track",event:"CLICK_WALLET_HELP"}),l.push("WhatIsAWallet")}async onClose(){await ne.safeClose()}rightHeaderTemplate(){const t=E?.state?.features?.smartSessions;return l.state.view!=="Account"||!t?this.closeButtonTemplate():h`<wui-flex>
      <wui-icon-button
        icon="clock"
        size="lg"
        iconSize="lg"
        type="neutral"
        variant="primary"
        @click=${()=>l.push("SmartSessionList")}
        data-testid="w3m-header-smart-sessions"
      ></wui-icon-button>
      ${this.closeButtonTemplate()}
    </wui-flex> `}closeButtonTemplate(){return h`
      <wui-icon-button
        icon="close"
        size="lg"
        type="neutral"
        variant="primary"
        iconSize="lg"
        @click=${this.onClose.bind(this)}
        data-testid="w3m-header-close"
      ></wui-icon-button>
    `}titleTemplate(){if(this.view==="PayQuote")return h`<w3m-pay-header></w3m-pay-header>`;const t=Ae.includes(this.view);return h`
      <wui-flex
        view-direction="${this.viewDirection}"
        class="w3m-header-title"
        alignItems="center"
        gap="2"
      >
        <wui-text
          display="inline"
          variant="lg-regular"
          color="primary"
          data-testid="w3m-header-text"
        >
          ${this.heading}
        </wui-text>
        ${t?h`<wui-tag variant="accent" size="md">Beta</wui-tag>`:null}
      </wui-flex>
    `}leftHeaderTemplate(){const{view:t}=l.state,i=t==="Connect",r=E.state.enableEmbedded,a=t==="ApproveTransaction",o=t==="ConnectingSiwe",n=t==="Account",s=E.state.enableNetworkSwitch,y=a||o||i&&r;return n&&s?h`<wui-select
        id="dynamic"
        data-testid="w3m-account-select-network"
        active-network=${S(this.network?.name)}
        @click=${this.onNetworks.bind(this)}
        imageSrc=${S(this.networkImage)}
      ></wui-select>`:this.showBack&&!y?h`<wui-icon-button
        data-testid="header-back"
        id="dynamic"
        icon="chevronLeft"
        size="lg"
        iconSize="lg"
        type="neutral"
        variant="primary"
        @click=${this.onGoBack.bind(this)}
      ></wui-icon-button>`:h`<wui-icon-button
      data-hidden=${!i}
      id="dynamic"
      icon="helpCircle"
      size="lg"
      iconSize="lg"
      type="neutral"
      variant="primary"
      @click=${this.onWalletHelp.bind(this)}
    ></wui-icon-button>`}onNetworks(){this.isAllowedNetworkSwitch()&&(M.sendEvent({type:"track",event:"CLICK_NETWORKS"}),l.push("Networks"))}isAllowedNetworkSwitch(){const t=f.getAllRequestedCaipNetworks(),i=t?t.length>1:!1,r=t?.find(({id:a})=>a===this.network?.id);return i||!r}onViewChange(){const{history:t}=l.state;let i=K.VIEW_DIRECTION.Next;t.length<this.prevHistoryLength&&(i=K.VIEW_DIRECTION.Prev),this.prevHistoryLength=t.length,this.viewDirection=i}async onHistoryChange(){const{history:t}=l.state,i=this.shadowRoot?.querySelector("#dynamic");t.length>1&&!this.showBack&&i?(await i.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.showBack=!0,i.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"})):t.length<=1&&this.showBack&&i&&(await i.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.showBack=!1,i.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"}))}onGoBack(){l.goBack()}};x.styles=Re;A([d()],x.prototype,"heading",void 0);A([d()],x.prototype,"network",void 0);A([d()],x.prototype,"networkImage",void 0);A([d()],x.prototype,"showBack",void 0);A([d()],x.prototype,"prevHistoryLength",void 0);A([d()],x.prototype,"view",void 0);A([d()],x.prototype,"viewDirection",void 0);x=A([m("w3m-header")],x);const Pe=b`
  :host {
    display: flex;
    align-items: center;
    gap: ${({spacing:e})=>e[1]};
    padding: ${({spacing:e})=>e[2]} ${({spacing:e})=>e[3]}
      ${({spacing:e})=>e[2]} ${({spacing:e})=>e[2]};
    border-radius: ${({borderRadius:e})=>e[20]};
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    box-shadow:
      0px 0px 8px 0px rgba(0, 0, 0, 0.1),
      inset 0 0 0 1px ${({tokens:e})=>e.theme.borderPrimary};
    max-width: 320px;
  }

  wui-icon-box {
    border-radius: ${({borderRadius:e})=>e.round} !important;
    overflow: hidden;
  }

  wui-loading-spinner {
    padding: ${({spacing:e})=>e[1]};
    background-color: ${({tokens:e})=>e.core.foregroundAccent010};
    border-radius: ${({borderRadius:e})=>e.round} !important;
  }
`;var Z=function(e,t,i,r){var a=arguments.length,o=a<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,i):r,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(e,t,i,r);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(o=(a<3?n(o):a>3?n(t,i,o):n(t,i))||o);return a>3&&o&&Object.defineProperty(t,i,o),o};let _=class extends U{constructor(){super(...arguments),this.message="",this.variant="success"}render(){return C`
      ${this.templateIcon()}
      <wui-text variant="lg-regular" color="primary" data-testid="wui-snackbar-message"
        >${this.message}</wui-text
      >
    `}templateIcon(){const t={success:"success",error:"error",warning:"warning",info:"default"},i={success:"checkmark",error:"warning",warning:"warningCircle",info:"info"};return this.variant==="loading"?C`<wui-loading-spinner size="md" color="accent-primary"></wui-loading-spinner>`:C`<wui-icon-box
      size="md"
      color=${t[this.variant]}
      icon=${i[this.variant]}
    ></wui-icon-box>`}};_.styles=[V,Pe];Z([W()],_.prototype,"message",void 0);Z([W()],_.prototype,"variant",void 0);_=Z([m("wui-snackbar")],_);const Oe=pe`
  :host {
    display: block;
    position: absolute;
    opacity: 0;
    pointer-events: none;
    top: 11px;
    left: 50%;
    width: max-content;
  }
`;var le=function(e,t,i,r){var a=arguments.length,o=a<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,i):r,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(e,t,i,r);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(o=(a<3?n(o):a>3?n(t,i,o):n(t,i))||o);return a>3&&o&&Object.defineProperty(t,i,o),o};let L=class extends R{constructor(){super(),this.unsubscribe=[],this.timeout=void 0,this.open=P.state.open,this.unsubscribe.push(P.subscribeKey("open",t=>{this.open=t,this.onOpen()}))}disconnectedCallback(){clearTimeout(this.timeout),this.unsubscribe.forEach(t=>t())}render(){const{message:t,variant:i}=P.state;return h` <wui-snackbar message=${t} variant=${i}></wui-snackbar> `}onOpen(){clearTimeout(this.timeout),this.open?(this.animate([{opacity:0,transform:"translateX(-50%) scale(0.85)"},{opacity:1,transform:"translateX(-50%) scale(1)"}],{duration:150,fill:"forwards",easing:"ease"}),this.timeout&&clearTimeout(this.timeout),P.state.autoClose&&(this.timeout=setTimeout(()=>P.hide(),2500))):this.animate([{opacity:1,transform:"translateX(-50%) scale(1)"},{opacity:0,transform:"translateX(-50%) scale(0.85)"}],{duration:150,fill:"forwards",easing:"ease"})}};L.styles=Oe;le([d()],L.prototype,"open",void 0);L=le([m("w3m-snackbar")],L);const Ne=b`
  :host {
    z-index: ${({tokens:e})=>e.core.zIndex};
    display: block;
    backface-visibility: hidden;
    will-change: opacity;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    opacity: 0;
    background-color: ${({tokens:e})=>e.theme.overlay};
    backdrop-filter: blur(0px);
    transition:
      opacity ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-2"]},
      backdrop-filter ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-2"]};
    will-change: opacity;
  }

  :host(.open) {
    opacity: 1;
    backdrop-filter: blur(8px);
  }

  :host(.appkit-modal) {
    position: relative;
    pointer-events: unset;
    background: none;
    width: 100%;
    opacity: 1;
  }

  wui-card {
    max-width: var(--apkt-modal-width);
    width: 100%;
    position: relative;
    outline: none;
    transform: translateY(4px);
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
    transition:
      transform ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-2"]},
      border-radius ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-1"]},
      background-color ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-1"]},
      box-shadow ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-1"]};
    will-change: border-radius, background-color, transform, box-shadow;
    background-color: ${({tokens:e})=>e.theme.backgroundPrimary};
    padding: var(--local-modal-padding);
    box-sizing: border-box;
  }

  :host(.open) wui-card {
    transform: translateY(0px);
  }

  wui-card::before {
    z-index: 1;
    pointer-events: none;
    content: '';
    position: absolute;
    inset: 0;
    border-radius: clamp(0px, var(--apkt-borderRadius-8), 44px);
    transition: box-shadow ${({durations:e})=>e.lg}
      ${({easings:e})=>e["ease-out-power-2"]};
    transition-delay: ${({durations:e})=>e.md};
    will-change: box-shadow;
  }

  :host([data-mobile-fullscreen='true']) wui-card::before {
    border-radius: 0px;
  }

  :host([data-border='true']) wui-card::before {
    box-shadow: inset 0px 0px 0px 4px ${({tokens:e})=>e.theme.foregroundSecondary};
  }

  :host([data-border='false']) wui-card::before {
    box-shadow: inset 0px 0px 0px 1px ${({tokens:e})=>e.theme.borderPrimaryDark};
  }

  :host([data-border='true']) wui-card {
    animation:
      fade-in ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-2"]},
      card-background-border var(--apkt-duration-dynamic)
        ${({easings:e})=>e["ease-out-power-2"]};
    animation-fill-mode: backwards, both;
    animation-delay: var(--apkt-duration-dynamic);
  }

  :host([data-border='false']) wui-card {
    animation:
      fade-in ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-2"]},
      card-background-default var(--apkt-duration-dynamic)
        ${({easings:e})=>e["ease-out-power-2"]};
    animation-fill-mode: backwards, both;
    animation-delay: 0s;
  }

  :host(.appkit-modal) wui-card {
    max-width: var(--apkt-modal-width);
  }

  wui-card[shake='true'] {
    animation:
      fade-in ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-2"]},
      w3m-shake ${({durations:e})=>e.xl}
        ${({easings:e})=>e["ease-out-power-2"]};
  }

  wui-flex {
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  @media (max-height: 700px) and (min-width: 431px) {
    wui-flex {
      align-items: flex-start;
    }

    wui-card {
      margin: var(--apkt-spacing-6) 0px;
    }
  }

  @media (max-width: 430px) {
    :host([data-mobile-fullscreen='true']) {
      height: 100dvh;
    }
    :host([data-mobile-fullscreen='true']) wui-flex {
      align-items: stretch;
    }
    :host([data-mobile-fullscreen='true']) wui-card {
      max-width: 100%;
      height: 100%;
      border-radius: 0;
      border: none;
    }
    :host(:not([data-mobile-fullscreen='true'])) wui-flex {
      align-items: flex-end;
    }

    :host(:not([data-mobile-fullscreen='true'])) wui-card {
      max-width: 100%;
      border-bottom: none;
    }

    :host(:not([data-mobile-fullscreen='true'])) wui-card[data-embedded='true'] {
      border-bottom-left-radius: clamp(0px, var(--apkt-borderRadius-8), 44px);
      border-bottom-right-radius: clamp(0px, var(--apkt-borderRadius-8), 44px);
    }

    :host(:not([data-mobile-fullscreen='true'])) wui-card:not([data-embedded='true']) {
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 0px;
    }

    wui-card[shake='true'] {
      animation: w3m-shake 0.5s ${({easings:e})=>e["ease-out-power-2"]};
    }
  }

  @keyframes fade-in {
    0% {
      transform: scale(0.99) translateY(4px);
    }
    100% {
      transform: scale(1) translateY(0);
    }
  }

  @keyframes w3m-shake {
    0% {
      transform: scale(1) rotate(0deg);
    }
    20% {
      transform: scale(1) rotate(-1deg);
    }
    40% {
      transform: scale(1) rotate(1.5deg);
    }
    60% {
      transform: scale(1) rotate(-1.5deg);
    }
    80% {
      transform: scale(1) rotate(1deg);
    }
    100% {
      transform: scale(1) rotate(0deg);
    }
  }

  @keyframes card-background-border {
    from {
      background-color: ${({tokens:e})=>e.theme.backgroundPrimary};
    }
    to {
      background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    }
  }

  @keyframes card-background-default {
    from {
      background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    }
    to {
      background-color: ${({tokens:e})=>e.theme.backgroundPrimary};
    }
  }
`;var k=function(e,t,i,r){var a=arguments.length,o=a<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,i):r,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(e,t,i,r);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(o=(a<3?n(o):a>3?n(t,i,o):n(t,i))||o);return a>3&&o&&Object.defineProperty(t,i,o),o};const te="scroll-lock",Te={PayWithExchange:"0",PayWithExchangeSelectAsset:"0",Pay:"0",PayQuote:"0",PayLoading:"0"};class g extends R{constructor(){super(),this.unsubscribe=[],this.abortController=void 0,this.hasPrefetched=!1,this.enableEmbedded=E.state.enableEmbedded,this.open=v.state.open,this.caipAddress=f.state.activeCaipAddress,this.caipNetwork=f.state.activeCaipNetwork,this.shake=v.state.shake,this.filterByNamespace=X.state.filterByNamespace,this.padding=B.spacing[1],this.mobileFullScreen=E.state.enableMobileFullScreen,this.initializeTheming(),z.prefetchAnalyticsConfig(),this.unsubscribe.push(v.subscribeKey("open",t=>t?this.onOpen():this.onClose()),v.subscribeKey("shake",t=>this.shake=t),f.subscribeKey("activeCaipNetwork",t=>this.onNewNetwork(t)),f.subscribeKey("activeCaipAddress",t=>this.onNewAddress(t)),E.subscribeKey("enableEmbedded",t=>this.enableEmbedded=t),X.subscribeKey("filterByNamespace",t=>{this.filterByNamespace!==t&&!f.getAccountData(t)?.caipAddress&&(z.fetchRecommendedWallets(),this.filterByNamespace=t)}),l.subscribeKey("view",()=>{this.dataset.border=J.hasFooter()?"true":"false",this.padding=Te[l.state.view]??B.spacing[1]}))}firstUpdated(){if(this.dataset.border=J.hasFooter()?"true":"false",this.mobileFullScreen&&this.setAttribute("data-mobile-fullscreen","true"),this.caipAddress){if(this.enableEmbedded){v.close(),this.prefetch();return}this.onNewAddress(this.caipAddress)}this.open&&this.onOpen(),this.enableEmbedded&&this.prefetch()}disconnectedCallback(){this.unsubscribe.forEach(t=>t()),this.onRemoveKeyboardListener()}render(){return this.style.setProperty("--local-modal-padding",this.padding),this.enableEmbedded?h`${this.contentTemplate()}
        <w3m-tooltip></w3m-tooltip> `:this.open?h`
          <wui-flex @click=${this.onOverlayClick.bind(this)} data-testid="w3m-modal-overlay">
            ${this.contentTemplate()}
          </wui-flex>
          <w3m-tooltip></w3m-tooltip>
        `:null}contentTemplate(){return h` <wui-card
      shake="${this.shake}"
      data-embedded="${S(this.enableEmbedded)}"
      role="alertdialog"
      aria-modal="true"
      tabindex="0"
      data-testid="w3m-modal-card"
    >
      <w3m-header></w3m-header>
      <w3m-router></w3m-router>
      <w3m-footer></w3m-footer>
      <w3m-snackbar></w3m-snackbar>
      <w3m-alertbar></w3m-alertbar>
    </wui-card>`}async onOverlayClick(t){if(t.target===t.currentTarget){if(this.mobileFullScreen)return;await this.handleClose()}}async handleClose(){await ne.safeClose()}initializeTheming(){const{themeVariables:t,themeMode:i}=me.state,r=ae.getColorTheme(i);fe(t,r)}onClose(){this.open=!1,this.classList.remove("open"),this.onScrollUnlock(),P.hide(),this.onRemoveKeyboardListener()}onOpen(){this.open=!0,this.classList.add("open"),this.onScrollLock(),this.onAddKeyboardListener()}onScrollLock(){const t=document.createElement("style");t.dataset.w3m=te,t.textContent=`
      body {
        touch-action: none;
        overflow: hidden;
        overscroll-behavior: contain;
      }
      w3m-modal {
        pointer-events: auto;
      }
    `,document.head.appendChild(t)}onScrollUnlock(){const t=document.head.querySelector(`style[data-w3m="${te}"]`);t&&t.remove()}onAddKeyboardListener(){this.abortController=new AbortController;const t=this.shadowRoot?.querySelector("wui-card");t?.focus(),window.addEventListener("keydown",i=>{if(i.key==="Escape")this.handleClose();else if(i.key==="Tab"){const{tagName:r}=i.target;r&&!r.includes("W3M-")&&!r.includes("WUI-")&&t?.focus()}},this.abortController)}onRemoveKeyboardListener(){this.abortController?.abort(),this.abortController=void 0}async onNewAddress(t){const i=f.state.isSwitchingNamespace,r=l.state.view==="ProfileWallets";!t&&!i&&!r&&v.close(),await re.initializeIfEnabled(t),this.caipAddress=t,f.setIsSwitchingNamespace(!1)}onNewNetwork(t){const r=this.caipNetwork?.caipNetworkId?.toString(),a=t?.caipNetworkId?.toString(),o=r!==a,n=l.state.view==="UnsupportedChain",s=v.state.open;let y=!1;this.enableEmbedded&&l.state.view==="SwitchNetwork"&&(y=!0),o&&be.resetState(),s&&n&&(y=!0),y&&l.state.view!=="SIWXSignMessage"&&l.goBack(),this.caipNetwork=t}prefetch(){this.hasPrefetched||(z.prefetch(),z.fetchWalletsByPage({page:1}),this.hasPrefetched=!0)}}g.styles=Ne;k([c({type:Boolean})],g.prototype,"enableEmbedded",void 0);k([d()],g.prototype,"open",void 0);k([d()],g.prototype,"caipAddress",void 0);k([d()],g.prototype,"caipNetwork",void 0);k([d()],g.prototype,"shake",void 0);k([d()],g.prototype,"filterByNamespace",void 0);k([d()],g.prototype,"padding",void 0);k([d()],g.prototype,"mobileFullScreen",void 0);let ie=class extends g{};ie=k([m("w3m-modal")],ie);let oe=class extends g{};oe=k([m("appkit-modal")],oe);const _e=b`
  .icon-box {
    width: 64px;
    height: 64px;
    border-radius: ${({borderRadius:e})=>e[5]};
    background-color: ${({colors:e})=>e.semanticError010};
  }
`;var ze=function(e,t,i,r){var a=arguments.length,o=a<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,i):r,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(e,t,i,r);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(o=(a<3?n(o):a>3?n(t,i,o):n(t,i))||o);return a>3&&o&&Object.defineProperty(t,i,o),o};let G=class extends R{constructor(){super()}render(){return h`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        gap="4"
        .padding="${["1","3","4","3"]}"
      >
        <wui-flex justifyContent="center" alignItems="center" class="icon-box">
          <wui-icon size="xxl" color="error" name="warningCircle"></wui-icon>
        </wui-flex>

        <wui-text variant="lg-medium" color="primary" align="center">
          The app isn't responding as expected
        </wui-text>
        <wui-text variant="md-regular" color="secondary" align="center">
          Try again or reach out to the app team for help.
        </wui-text>

        <wui-button
          variant="neutral-secondary"
          size="md"
          @click=${this.onTryAgainClick.bind(this)}
          data-testid="w3m-usage-exceeded-button"
        >
          <wui-icon color="inherit" slot="iconLeft" name="refresh"></wui-icon>
          Try Again
        </wui-button>
      </wui-flex>
    `}onTryAgainClick(){l.goBack()}};G.styles=_e;G=ze([m("w3m-usage-exceeded-view")],G);const De=b`
  :host {
    width: 100%;
  }
`;var p=function(e,t,i,r){var a=arguments.length,o=a<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,i):r,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(e,t,i,r);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(o=(a<3?n(o):a>3?n(t,i,o):n(t,i))||o);return a>3&&o&&Object.defineProperty(t,i,o),o};let u=class extends R{constructor(){super(...arguments),this.hasImpressionSent=!1,this.walletImages=[],this.imageSrc="",this.name="",this.size="md",this.tabIdx=void 0,this.disabled=!1,this.showAllWallets=!1,this.loading=!1,this.loadingSpinnerColor="accent-100",this.rdnsId="",this.displayIndex=void 0,this.walletRank=void 0,this.namespaces=[]}connectedCallback(){super.connectedCallback()}disconnectedCallback(){super.disconnectedCallback(),this.cleanupIntersectionObserver()}updated(t){super.updated(t),(t.has("name")||t.has("imageSrc")||t.has("walletRank"))&&(this.hasImpressionSent=!1),t.has("walletRank")&&this.walletRank&&!this.intersectionObserver&&this.setupIntersectionObserver()}setupIntersectionObserver(){this.intersectionObserver=new IntersectionObserver(t=>{t.forEach(i=>{i.isIntersecting&&!this.loading&&!this.hasImpressionSent&&this.sendImpressionEvent()})},{threshold:.1}),this.intersectionObserver.observe(this)}cleanupIntersectionObserver(){this.intersectionObserver&&(this.intersectionObserver.disconnect(),this.intersectionObserver=void 0)}sendImpressionEvent(){!this.name||this.hasImpressionSent||!this.walletRank||(this.hasImpressionSent=!0,(this.rdnsId||this.name)&&M.sendWalletImpressionEvent({name:this.name,walletRank:this.walletRank,rdnsId:this.rdnsId,view:l.state.view,displayIndex:this.displayIndex}))}handleGetWalletNamespaces(){return Object.keys(we.state.adapters).length>1?this.namespaces:[]}render(){return h`
      <wui-list-wallet
        .walletImages=${this.walletImages}
        imageSrc=${S(this.imageSrc)}
        name=${this.name}
        size=${S(this.size)}
        tagLabel=${S(this.tagLabel)}
        .tagVariant=${this.tagVariant}
        .walletIcon=${this.walletIcon}
        .tabIdx=${this.tabIdx}
        .disabled=${this.disabled}
        .showAllWallets=${this.showAllWallets}
        .loading=${this.loading}
        loadingSpinnerColor=${this.loadingSpinnerColor}
        .namespaces=${this.handleGetWalletNamespaces()}
      ></wui-list-wallet>
    `}};u.styles=De;p([c({type:Array})],u.prototype,"walletImages",void 0);p([c()],u.prototype,"imageSrc",void 0);p([c()],u.prototype,"name",void 0);p([c()],u.prototype,"size",void 0);p([c()],u.prototype,"tagLabel",void 0);p([c()],u.prototype,"tagVariant",void 0);p([c()],u.prototype,"walletIcon",void 0);p([c()],u.prototype,"tabIdx",void 0);p([c({type:Boolean})],u.prototype,"disabled",void 0);p([c({type:Boolean})],u.prototype,"showAllWallets",void 0);p([c({type:Boolean})],u.prototype,"loading",void 0);p([c({type:String})],u.prototype,"loadingSpinnerColor",void 0);p([c()],u.prototype,"rdnsId",void 0);p([c()],u.prototype,"displayIndex",void 0);p([c()],u.prototype,"walletRank",void 0);p([c({type:Array})],u.prototype,"namespaces",void 0);u=p([m("w3m-list-wallet")],u);const He=b`
  :host {
    --local-duration-height: 0s;
    --local-duration: ${({durations:e})=>e.lg};
    --local-transition: ${({easings:e})=>e["ease-out-power-2"]};
  }

  .container {
    display: block;
    overflow: hidden;
    overflow: hidden;
    position: relative;
    height: var(--local-container-height);
    transition: height var(--local-duration-height) var(--local-transition);
    will-change: height, padding-bottom;
  }

  .container[data-mobile-fullscreen='true'] {
    overflow: scroll;
  }

  .page {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: auto;
    width: inherit;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    background-color: ${({tokens:e})=>e.theme.backgroundPrimary};
    border-bottom-left-radius: var(--local-border-bottom-radius);
    border-bottom-right-radius: var(--local-border-bottom-radius);
    transition: border-bottom-left-radius var(--local-duration) var(--local-transition);
  }

  .page[data-mobile-fullscreen='true'] {
    height: 100%;
  }

  .page-content {
    display: flex;
    flex-direction: column;
    min-height: 100%;
  }

  .footer {
    height: var(--apkt-footer-height);
  }

  div.page[view-direction^='prev-'] .page-content {
    animation:
      slide-left-out var(--local-duration) forwards var(--local-transition),
      slide-left-in var(--local-duration) forwards var(--local-transition);
    animation-delay: 0ms, var(--local-duration, ${({durations:e})=>e.lg});
  }

  div.page[view-direction^='next-'] .page-content {
    animation:
      slide-right-out var(--local-duration) forwards var(--local-transition),
      slide-right-in var(--local-duration) forwards var(--local-transition);
    animation-delay: 0ms, var(--local-duration, ${({durations:e})=>e.lg});
  }

  @keyframes slide-left-out {
    from {
      transform: translateX(0px) scale(1);
      opacity: 1;
      filter: blur(0px);
    }
    to {
      transform: translateX(8px) scale(0.99);
      opacity: 0;
      filter: blur(4px);
    }
  }

  @keyframes slide-left-in {
    from {
      transform: translateX(-8px) scale(0.99);
      opacity: 0;
      filter: blur(4px);
    }
    to {
      transform: translateX(0) translateY(0) scale(1);
      opacity: 1;
      filter: blur(0px);
    }
  }

  @keyframes slide-right-out {
    from {
      transform: translateX(0px) scale(1);
      opacity: 1;
      filter: blur(0px);
    }
    to {
      transform: translateX(-8px) scale(0.99);
      opacity: 0;
      filter: blur(4px);
    }
  }

  @keyframes slide-right-in {
    from {
      transform: translateX(8px) scale(0.99);
      opacity: 0;
      filter: blur(4px);
    }
    to {
      transform: translateX(0) translateY(0) scale(1);
      opacity: 1;
      filter: blur(0px);
    }
  }
`;var $=function(e,t,i,r){var a=arguments.length,o=a<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,i):r,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(e,t,i,r);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(o=(a<3?n(o):a>3?n(t,i,o):n(t,i))||o);return a>3&&o&&Object.defineProperty(t,i,o),o};const Be=60;let w=class extends R{constructor(){super(...arguments),this.resizeObserver=void 0,this.transitionDuration="0.15s",this.transitionFunction="",this.history="",this.view="",this.setView=void 0,this.viewDirection="",this.historyState="",this.previousHeight="0px",this.mobileFullScreen=E.state.enableMobileFullScreen,this.onViewportResize=()=>{this.updateContainerHeight()}}updated(t){if(t.has("history")){const i=this.history;this.historyState!==""&&this.historyState!==i&&this.onViewChange(i)}t.has("transitionDuration")&&this.style.setProperty("--local-duration",this.transitionDuration),t.has("transitionFunction")&&this.style.setProperty("--local-transition",this.transitionFunction)}firstUpdated(){this.transitionFunction&&this.style.setProperty("--local-transition",this.transitionFunction),this.style.setProperty("--local-duration",this.transitionDuration),this.historyState=this.history,this.resizeObserver=new ResizeObserver(t=>{for(const i of t)if(i.target===this.getWrapper()){let r=i.contentRect.height;const a=parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--apkt-footer-height")||"0");if(this.mobileFullScreen){const o=window.visualViewport?.height||window.innerHeight,n=this.getHeaderHeight();r=o-n-a,this.style.setProperty("--local-border-bottom-radius","0px")}else r=r+a,this.style.setProperty("--local-border-bottom-radius",a?"var(--apkt-borderRadius-5)":"0px");this.style.setProperty("--local-container-height",`${r}px`),this.previousHeight!=="0px"&&this.style.setProperty("--local-duration-height",this.transitionDuration),this.previousHeight=`${r}px`}}),this.resizeObserver.observe(this.getWrapper()),this.updateContainerHeight(),window.addEventListener("resize",this.onViewportResize),window.visualViewport?.addEventListener("resize",this.onViewportResize)}disconnectedCallback(){const t=this.getWrapper();t&&this.resizeObserver&&this.resizeObserver.unobserve(t),window.removeEventListener("resize",this.onViewportResize),window.visualViewport?.removeEventListener("resize",this.onViewportResize)}render(){return h`
      <div class="container" data-mobile-fullscreen="${S(this.mobileFullScreen)}">
        <div
          class="page"
          data-mobile-fullscreen="${S(this.mobileFullScreen)}"
          view-direction="${this.viewDirection}"
        >
          <div class="page-content">
            <slot></slot>
          </div>
        </div>
      </div>
    `}onViewChange(t){const i=t.split(",").filter(Boolean),r=this.historyState.split(",").filter(Boolean),a=r.length,o=i.length,n=i[i.length-1]||"",s=ae.cssDurationToNumber(this.transitionDuration);let y="";o>a?y="next":o<a?y="prev":o===a&&i[o-1]!==r[a-1]&&(y="next"),queueMicrotask(()=>{this.viewDirection=`${y}-${n}`}),setTimeout(()=>{this.historyState=t,this.setView?.(n)},s),setTimeout(()=>{this.viewDirection=""},s*2)}getWrapper(){return this.shadowRoot?.querySelector("div.page")}updateContainerHeight(){const t=this.getWrapper();if(!t)return;const i=parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--apkt-footer-height")||"0");let r=0;if(this.mobileFullScreen){const a=window.visualViewport?.height||window.innerHeight,o=this.getHeaderHeight();r=a-o-i,this.style.setProperty("--local-border-bottom-radius","0px")}else r=t.getBoundingClientRect().height+i,this.style.setProperty("--local-border-bottom-radius",i?"var(--apkt-borderRadius-5)":"0px");this.style.setProperty("--local-container-height",`${r}px`),this.previousHeight!=="0px"&&this.style.setProperty("--local-duration-height",this.transitionDuration),this.previousHeight=`${r}px`}getHeaderHeight(){return Be}};w.styles=[He];$([c({type:String})],w.prototype,"transitionDuration",void 0);$([c({type:String})],w.prototype,"transitionFunction",void 0);$([c({type:String})],w.prototype,"history",void 0);$([c({type:String})],w.prototype,"view",void 0);$([c({attribute:!1})],w.prototype,"setView",void 0);$([d()],w.prototype,"viewDirection",void 0);$([d()],w.prototype,"historyState",void 0);$([d()],w.prototype,"previousHeight",void 0);$([d()],w.prototype,"mobileFullScreen",void 0);w=$([m("w3m-router-container")],w);export{oe as AppKitModal,u as W3mListWallet,ie as W3mModal,g as W3mModalBase,w as W3mRouterContainer,G as W3mUsageExceededView};
