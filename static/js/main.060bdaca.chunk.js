(this["webpackJsonpreact-noti"]=this["webpackJsonpreact-noti"]||[]).push([[0],[,,,,,,,,,function(e,t,n){},,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),r=n(3),c=(n(9),n(4)),s="success",o="info",l="warning",u="error",m={TOP_CENTER:"top-center",TOP_RIGHT:"top-right",TOP_LEFT:"top-left",BOTTOM_CENTER:"bottom-center",BOTTOM_RIGHT:"bottom-right",BOTTOM_LEFT:"bottom-left"},p={position:m.TOP_RIGHT,autoDismiss:!0,timeOut:5e3,single:!1,icons:!0};function d(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function b(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?d(Object(n),!0).forEach((function(t){f(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):d(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function f(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function v(e,t){if(!Object.prototype.hasOwnProperty.call(e,t))throw new TypeError("attempted to use private field on non-instance");return e}var E=0;function g(e){return"__private_"+E+++"_"+e}var h=function(){function e(){var e=this;Object.defineProperty(this,O,{writable:!0,value:[]}),Object.defineProperty(this,k,{writable:!0,value:{autoDismiss:p.autoDismiss,timeOut:p.timeOut,single:p.single}}),Object.defineProperty(this,S,{writable:!0,value:function(){}}),Object.defineProperty(this,y,{writable:!0,value:function(t){var n=t.type,a=t.content,i=t.title,r=t.autoDismiss,c=void 0===r?v(e,k)[k].autoDismiss:r,s=t.timeOut,o=void 0===s?v(e,k)[k].timeOut:s;return{id:(46656*Math.random()).toString(36).slice(-3)+"-"+Date.now().toString(36),type:n,content:a,title:i,autoDismiss:c,timeOut:o}}}),Object.defineProperty(this,N,{writable:!0,value:function(t){v(e,k)[k].single?(v(e,O)[O].length=0,v(e,O)[O].push(t)):v(e,O)[O].unshift(t),v(e,S)[S](v(e,O)[O])}}),this.success=function(t,n){var a=void 0===n?{}:n,i=a.title,r=a.autoDismiss,c=a.timeOut,o=v(e,y)[y]({type:s,content:t,title:i,autoDismiss:r,timeOut:c});v(e,N)[N](o)},this.info=function(t,n){var a=void 0===n?{}:n,i=a.title,r=a.autoDismiss,c=a.timeOut,s=v(e,y)[y]({type:o,content:t,title:i,autoDismiss:r,timeOut:c});v(e,N)[N](s)},this.warning=function(t,n){var a=void 0===n?{}:n,i=a.title,r=a.autoDismiss,c=a.timeOut,s=v(e,y)[y]({type:l,content:t,title:i,autoDismiss:r,timeOut:c});v(e,N)[N](s)},this.error=function(t,n){var a=void 0===n?{}:n,i=a.title,r=a.autoDismiss,c=a.timeOut,s=v(e,y)[y]({type:u,content:t,title:i,autoDismiss:r,timeOut:c});v(e,N)[N](s)},this.dismiss=function(t){t?v(e,O)[O]=v(e,O)[O].filter((function(e){return e.id!==t})):v(e,O)[O].length=0,v(e,S)[S](v(e,O)[O])}}var t=e.prototype;return t.configure=function(e){var t=e.autoDismiss,n=e.timeOut,a=e.single;v(this,k)[k]=b(b({},v(this,k)[k]),{},{autoDismiss:t,timeOut:n,single:a})},t.register=function(e){var t=e.handleStoreChange;v(this,S)[S]=t},e}(),O=g("toasts"),k=g("config"),S=g("onStoreChange"),y=g("createToast"),N=g("addToast"),R=new h;n(2);function P(){return(P=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}var w=a.createElement("path",{d:"M8 16c-.5 0-1.1-.1-1.6-.2s-1-.3-1.5-.5-.9-.4-1.4-.7c-.4-.3-.8-.6-1.2-1-.4-.4-.7-.8-1-1.2C1 12 .8 11.5.6 11c-.2-.5-.4-1-.5-1.5 0-.4-.1-1-.1-1.5s.1-1.1.2-1.6.3-1 .5-1.5c.1-.5.4-.9.7-1.4.3-.4.6-.8 1-1.2.4-.4.8-.7 1.2-1 .4-.2.8-.5 1.3-.7.5-.2 1-.4 1.5-.5C6.9.1 7.5 0 8 0s1.1.1 1.6.2 1 .3 1.5.5.9.4 1.4.7c.4.3.8.6 1.2 1 .4.4.7.8 1 1.2.3.4.5.9.7 1.4.2.5.4 1 .5 1.5 0 .4.1 1 .1 1.5s-.1 1.1-.2 1.6-.3 1-.5 1.5-.4.9-.7 1.4c-.3.4-.6.8-1 1.2-.4.4-.8.7-1.2 1-.4.3-.9.5-1.4.7-.5.2-1 .4-1.5.5-.4 0-1 .1-1.5.1zM8 1.3a6.7 6.7 0 100 13.4A6.7 6.7 0 008 1.3zm4.7 3.9l-.7-.7c-.1-.1-.2-.1-.2 0L6.4 9.8 4.3 7.7c-.1-.1-.2-.1-.3 0l-.7.6c-.1.1-.1.2 0 .2l2.3 2.3.7.7c.1.1.2.1.2 0l6.1-6.1c.1-.1.1-.2.1-.2z"});function A(e){return a.createElement("svg",P({viewBox:"0 0 16 16"},e),w)}function B(){return(B=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}var C=a.createElement("path",{d:"M8 16c-.5 0-1.1-.1-1.6-.2s-1-.3-1.5-.5-.9-.4-1.4-.7c-.4-.3-.8-.6-1.2-1-.4-.4-.7-.8-1-1.2C1 12 .8 11.5.6 11c-.2-.5-.4-1-.5-1.5 0-.4-.1-1-.1-1.5s.1-1.1.2-1.6.3-1 .5-1.5c.1-.5.4-.9.7-1.4.3-.4.6-.8 1-1.2.4-.4.8-.7 1.2-1 .4-.2.8-.5 1.3-.7.5-.2 1-.4 1.5-.5C6.9.1 7.5 0 8 0s1.1.1 1.6.2 1 .3 1.5.5.9.4 1.4.7c.4.3.8.6 1.2 1 .4.4.7.8 1 1.2.3.4.5.9.7 1.4.2.5.4 1 .5 1.5 0 .4.1 1 .1 1.5s-.1 1.1-.2 1.6-.3 1-.5 1.5-.4.9-.7 1.4c-.3.4-.6.8-1 1.2-.4.4-.8.7-1.2 1-.4.3-.9.5-1.4.7-.5.2-1 .4-1.5.5-.4 0-1 .1-1.5.1zM8 1.3a6.7 6.7 0 100 13.4A6.7 6.7 0 008 1.3zm.6 11V6.2c0-.1-.1-.1-.1-.1h-1c-.1 0-.1.1-.1.1v6.1c0 .1.1.1.1.1h1c.1.1.1 0 .1-.1zm0-7.7v-1c0-.1-.1-.1-.1-.1h-1c-.1 0-.1.1-.1.1v1c0 .1.1.1.1.1h1c.1.1.1 0 .1-.1z"});function T(e){return a.createElement("svg",B({viewBox:"0 0 16 16"},e),C)}function j(){return(j=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}var Z=a.createElement("path",{d:"M8 16c-.5 0-1.1-.1-1.6-.2s-1-.3-1.5-.5-.9-.4-1.4-.7c-.4-.3-.8-.6-1.2-1-.4-.4-.7-.8-1-1.2C1 12 .8 11.5.6 11c-.2-.5-.4-1-.5-1.5 0-.4-.1-1-.1-1.5s.1-1.1.2-1.6.3-1 .5-1.5c.1-.5.4-.9.7-1.4.3-.4.6-.8 1-1.2.4-.4.8-.7 1.2-1 .4-.2.8-.5 1.3-.7.5-.2 1-.4 1.5-.5C6.9.1 7.5 0 8 0s1.1.1 1.6.2 1 .3 1.5.5.9.4 1.4.7c.4.3.8.6 1.2 1 .4.4.7.8 1 1.2.3.4.5.9.7 1.4.2.5.4 1 .5 1.5 0 .4.1 1 .1 1.5s-.1 1.1-.2 1.6-.3 1-.5 1.5-.4.9-.7 1.4c-.3.4-.6.8-1 1.2-.4.4-.8.7-1.2 1-.4.3-.9.5-1.4.7-.5.2-1 .4-1.5.5-.4 0-1 .1-1.5.1zM8 1.3a6.7 6.7 0 100 13.4A6.7 6.7 0 008 1.3zm.6 8.5V3.7c0-.1-.1-.1-.1-.1h-1c-.1 0-.1.1-.1.1v6.1c0 .1.1.1.1.1h1c.1 0 .1 0 .1-.1zm0 2.5v-1c0-.1-.1-.1-.1-.1h-1c-.1 0-.1.1-.1.1v1c0 .1.1.1.1.1h1c.1.1.1 0 .1-.1z"});function J(e){return a.createElement("svg",j({viewBox:"0 0 16 16"},e),Z)}function F(){return(F=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}var z=a.createElement("path",{d:"M8 16c-.5 0-1.1-.1-1.6-.2s-1-.3-1.5-.5-.9-.4-1.4-.7c-.4-.3-.8-.6-1.2-1-.4-.4-.7-.8-1-1.2C1 12 .8 11.5.6 11c-.2-.5-.4-1-.5-1.5 0-.4-.1-1-.1-1.5s.1-1.1.2-1.6.3-1 .5-1.5c.1-.5.4-.9.7-1.4.3-.4.6-.8 1-1.2.4-.4.8-.7 1.2-1 .4-.2.8-.5 1.3-.7.5-.2 1-.4 1.5-.5C6.9.1 7.5 0 8 0s1.1.1 1.6.2 1 .3 1.5.5.9.4 1.4.7c.4.3.8.6 1.2 1 .4.4.7.8 1 1.2.3.4.5.9.7 1.4.2.5.4 1 .5 1.5 0 .4.1 1 .1 1.5s-.1 1.1-.2 1.6-.3 1-.5 1.5-.4.9-.7 1.4c-.3.4-.6.8-1 1.2-.4.4-.8.7-1.2 1-.4.3-.9.5-1.4.7-.5.2-1 .4-1.5.5-.4 0-1 .1-1.5.1zM8 1.3a6.7 6.7 0 100 13.4A6.7 6.7 0 008 1.3zm3.5 9.3L8.9 8l2.6-2.6c.1-.1.1-.2 0-.2l-.7-.7c-.1-.1-.2-.1-.2 0L8 7.1 5.4 4.5c-.1-.1-.2-.1-.2 0l-.7.7c-.1.1-.1.2 0 .2L7.1 8l-2.6 2.6c-.1.1-.1.2 0 .2l.7.7c.1.1.2.1.2 0L8 8.9l2.6 2.6c.1.1.2.1.2 0l.7-.7c.1 0 .1-.1 0-.2z"});function D(e){return a.createElement("svg",F({viewBox:"0 0 16 16"},e),z)}n(12);var W={success:i.a.createElement(A,null),info:i.a.createElement(T,null),warning:i.a.createElement(J,null),error:i.a.createElement(D,null)};function I(e){var t=e.id,n=e.content,r=e.title,c=e.type,s=e.autoDismiss,o=e.timeOut,l=e.onDismiss,u=e.icons,m=Object(a.useRef)(null),p="ReactNoti__Toast ReactNoti__Toast--"+c,d=("ReactNoti__Toast__body "+(u?"":"no-icon")).trim(),b="icon icon-"+c;return s&&o>0&&(m=setTimeout((function(){l(t)}),o)),i.a.createElement("div",{className:p,"data-testid":"ReactNoti-Toast"},u&&i.a.createElement("div",{className:"ReactNoti__Toast__type",role:"img","aria-label":"alert "+c},i.a.createElement("span",{className:b},W[c])),i.a.createElement("div",{className:d},r&&i.a.createElement("strong",{className:"ReactNoti__Toast__title"},r),i.a.createElement("section",{className:"ReactNoti__Toast__content"},n)),i.a.createElement("button",{className:"ReactNoti__Toast__btn-dismiss",type:"button",onClick:function(){m&&clearTimeout(m),l(t)},"data-testid":"btn-dismiss"},i.a.createElement("span",{className:"icon icon-close"})))}I.propTypes={};var L=I;n(13);function H(e){var t=e.position,n=void 0===t?p.position:t,r=e.autoDismiss,c=void 0===r?p.autoDismiss:r,s=e.timeOut,o=void 0===s?p.timeOut:s,l=e.single,u=void 0===l?p.single:l,m=e.icons,d=void 0===m?p.icons:m,b=e.className,f=Object(a.useState)([]),v=f[0],E=f[1],g=("ReactNoti "+(b||"")).trim(),h="ReactNoti__Tray ReactNoti__Tray--"+n,O=function(e){var t="bottom"===n.split("-")[0]?[].concat(e).reverse():[].concat(e);E(t)};return R.configure({autoDismiss:c,timeOut:o,single:u}),Object(a.useEffect)((function(){R.register({handleStoreChange:O})}),[]),i.a.createElement("div",{className:g},v.length>0&&i.a.createElement("div",{className:h},v.map((function(e){return i.a.createElement(L,{key:e.id,id:e.id,content:e.content,title:e.title,type:e.type,autoDismiss:e.autoDismiss,timeOut:e.timeOut,icons:d,onDismiss:R.dismiss})}))))}H.propTypes={};var Y=H,x=(n(14),{SUCCESS:"success",INFO:"info",WARNING:"warning",ERROR:"error"});var G=Object(c.hot)((function(){var e=Object(a.useState)(m.TOP_RIGHT),t=e[0],n=e[1],r=Object(a.useState)(!0),c=r[0],s=r[1],o=Object(a.useState)(!0),l=o[0],u=o[1],p=Object(a.useState)(!1),d=p[0],b=p[1],f=Object(a.useState)(5e3),v=f[0],E=f[1];return i.a.createElement("div",{className:"App"},i.a.createElement(Y,{position:t,autoDismiss:c,single:d,icons:l,timeOut:1*v}),i.a.createElement("header",{className:"App__header"},i.a.createElement("h1",{className:"logo"},i.a.createElement("a",{href:"https://vitaliiburlaka.github.io/react-noti"},i.a.createElement("img",{src:"data:image/png;base64,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",alt:"React Noti logo"}))),i.a.createElement("a",{className:"github",href:"https://github.com/vitaliiburlaka/react-noti",target:"_blank",rel:"noopener noreferrer"},"GitHub")),i.a.createElement("div",{className:"App__content"},i.a.createElement("div",{className:"demo-panel"},i.a.createElement("div",{className:"demo-panel__header"},i.a.createElement("h2",{className:"react-noti"},"react-noti"),i.a.createElement("div",{className:"big-text"},"Notifications made easy.")),i.a.createElement("div",{className:"demo-panel__content"},i.a.createElement("div",{className:"demo-panel__buttons"},Object.keys(x).map((function(e){return i.a.createElement("button",{key:x[e],className:"btn btn-"+x[e],type:"button",onClick:function(){return function(e){switch(e){case x.SUCCESS:R.success("Lorem ipsum dolor sit amet",{title:"Success!"});break;case x.INFO:R.info("Cum, laborum animi.",{title:"Info!"});break;case x.WARNING:R.warning("Ipsum cum corporis similique eligendi",{title:"Warning!"});break;case x.ERROR:R.error("Veniam dolor repudiandae cumque!",{title:"Error!"})}}(x[e])}},x[e])}))),i.a.createElement("div",{className:"demo-panel__props"},i.a.createElement("h3",null,"Props"),i.a.createElement("section",{className:"row-control"},i.a.createElement("label",{htmlFor:"position"},i.a.createElement("code",null,"position")," ",i.a.createElement("select",{id:"position",value:t,onChange:function(e){var t=e.target;n(t.value)}},Object.keys(m).map((function(e){return i.a.createElement("option",{key:m[e],value:m[e]},m[e])})))),i.a.createElement("label",{htmlFor:"timeOut"},i.a.createElement("code",null,"timeOut")," ",i.a.createElement("input",{id:"timeOut",type:"text",name:"timeOut",value:v,placeholder:"Enter timeOut",onChange:function(e){var t=e.target;E(t.value)},maxLength:"4"}))),i.a.createElement("section",{className:"row-control"},i.a.createElement("label",{htmlFor:"autoDismiss"},i.a.createElement("input",{id:"autoDismiss",type:"checkbox",name:"autoDismiss",checked:c,onChange:function(){return s(!c)}})," ",i.a.createElement("code",null,"autoDismiss")),i.a.createElement("label",{htmlFor:"icons"},i.a.createElement("span",{className:"checkbox"},i.a.createElement("input",{id:"icons",type:"checkbox",name:"icons",checked:l,onChange:function(){return u(!l)}}))," ",i.a.createElement("code",null,"icons")),i.a.createElement("label",{htmlFor:"single"},i.a.createElement("input",{id:"single",type:"checkbox",name:"single",checked:d,onChange:function(){return b(!d)}})," ",i.a.createElement("code",null,"single"))))))),i.a.createElement("footer",{className:"App__footer"},"\xa9 ",(new Date).getFullYear()," Vitalii Burlaka",i.a.createElement("div",{className:"footer-links"},i.a.createElement("a",{href:"https://github.com/vitaliiburlaka",target:"_blank",rel:"noopener noreferrer"},"GitHub"),i.a.createElement("span",null," / "),i.a.createElement("a",{href:"https://twitter.com/vitaliiburlaka",target:"_blank",rel:"noopener noreferrer"},"Twitter"),i.a.createElement("span",null," / "),i.a.createElement("a",{href:"https://www.linkedin.com/in/vitaliiburlaka/",target:"_blank",rel:"noopener noreferrer"},"LinkedIn"))))}));Object(r.render)(i.a.createElement(G,null),document.getElementById("root"))}],[[15,1,2]]]);