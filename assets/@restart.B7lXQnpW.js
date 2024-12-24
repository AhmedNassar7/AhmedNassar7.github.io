import{r as e,j as n}from"./react.D1r2OQ_i.js";import{c as t,q as r,s as o,o as i,a as u,l,b as s}from"./dom-helpers.CaiTvyg6.js";import{R as a}from"./react-dom.DSzqWn1k.js";function c(n){if(!n||"function"==typeof n)return null;const{major:t}=function(){const n=e.version.split(".");return{major:+n[0],minor:+n[1],patch:+n[2]}}();return t>=19?n.props.ref:n.ref}const d=e=>e&&"function"!=typeof e?n=>{e.current=n}:e;function f(n,t){return e.useMemo((()=>function(e,n){const t=d(e),r=d(n);return e=>{t&&t(e),r&&r(e)}}(n,t)),[n,t])}function m(n){const t=function(n){const t=e.useRef(n);return e.useEffect((()=>{t.current=n}),[n]),t}(n);return e.useCallback((function(...e){return t.current&&t.current(...e)}),[t])}function g(n){const t=function(n){const t=e.useRef(n);return e.useEffect((()=>{t.current=n}),[n]),t}(n);return e.useCallback((function(...e){return t.current&&t.current(...e)}),[t])}const h="undefined"!=typeof global&&global.navigator&&"ReactNative"===global.navigator.product,p="undefined"!=typeof document||h?e.useLayoutEffect:e.useEffect,v=["as","disabled"];function b({tagName:e,disabled:n,href:t,target:r,rel:o,role:i,onClick:u,tabIndex:l=0,type:s}){e||(e=null!=t||null!=r||null!=o?"a":"button");const a={tagName:e};if("button"===e)return[{type:s||"button",disabled:n},a];const c=r=>{(n||"a"===e&&function(e){return!e||"#"===e.trim()}(t))&&r.preventDefault(),n?r.stopPropagation():null==u||u(r)};return"a"===e&&(t||(t="#"),n&&(t=void 0)),[{role:null!=i?i:"button",disabled:void 0,tabIndex:n?void 0:l,href:t,target:"a"===e?r:void 0,"aria-disabled":n||void 0,rel:"a"===e?o:void 0,onClick:c,onKeyDown:e=>{" "===e.key&&(e.preventDefault(),c(e))}},a]}const y=e.forwardRef(((e,t)=>{let{as:r,disabled:o}=e,i=function(e,n){if(null==e)return{};var t={};for(var r in e)if({}.hasOwnProperty.call(e,r)){if(n.indexOf(r)>=0)continue;t[r]=e[r]}return t}(e,v);const[u,{tagName:l}]=b(Object.assign({tagName:r,disabled:o},i));return n.jsx(l,Object.assign({},i,u,{ref:t}))}));y.displayName="Button";const E=["onKeyDown"];const x=e.forwardRef(((e,t)=>{let{onKeyDown:r}=e,o=function(e,n){if(null==e)return{};var t={};for(var r in e)if({}.hasOwnProperty.call(e,r)){if(n.indexOf(r)>=0)continue;t[r]=e[r]}return t}(e,E);const[i]=b(Object.assign({tagName:"a"},o)),u=g((e=>{i.onKeyDown(e),null==r||r(e)}));return(l=o.href)&&"#"!==l.trim()&&"button"!==o.role?n.jsx("a",Object.assign({ref:t},o,{onKeyDown:r})):n.jsx("a",Object.assign({ref:t},o,i,{onKeyDown:u}));var l}));x.displayName="Anchor";const w=e.createContext(null),O=(e,n=null)=>null!=e?String(e):n||null,C=e.createContext(null);C.displayName="NavContext";function k(e){return`data-rr-ui-${e}`}const j=e.createContext(t?window:void 0);function R(){return e.useContext(j)}j.Provider;const D="undefined"!=typeof global&&global.navigator&&"ReactNative"===global.navigator.product,S="undefined"!=typeof document||D?e.useLayoutEffect:e.useEffect,M=e=>e&&"function"!=typeof e?n=>{e.current=n}:e;function N(n,t){return e.useMemo((()=>function(e,n){const t=M(e),r=M(n);return e=>{t&&t(e),r&&r(e)}}(n,t)),[n,t])}const K=e.createContext(null),T=["as","active","eventKey"];function I({key:n,onClick:t,active:r,id:o,role:i,disabled:u}){const l=e.useContext(w),s=e.useContext(C),a=e.useContext(K);let c=r;const d={role:i};if(s){i||"tablist"!==s.role||(d.role="tab");const e=s.getControllerId(null!=n?n:null),t=s.getControlledId(null!=n?n:null);d[k("event-key")]=n,d.id=e||o,c=null==r&&null!=n?s.activeKey===n:r,!c&&(null!=a&&a.unmountOnExit||null!=a&&a.mountOnEnter)||(d["aria-controls"]=t)}return"tab"===d.role&&(d["aria-selected"]=c,c||(d.tabIndex=-1),u&&(d.tabIndex=-1,d["aria-disabled"]=!0)),d.onClick=g((e=>{u||(null==t||t(e),null!=n&&l&&!e.isPropagationStopped()&&l(n,e))})),[d,{isActive:c}]}const P=e.forwardRef(((e,t)=>{let{as:r=y,active:o,eventKey:i}=e,u=function(e,n){if(null==e)return{};var t={};for(var r in e)if({}.hasOwnProperty.call(e,r)){if(n.indexOf(r)>=0)continue;t[r]=e[r]}return t}(e,T);const[l,s]=I(Object.assign({key:O(i,u.href),active:o},u));return l[k("active")]=s.isActive,n.jsx(r,Object.assign({},u,l,{ref:t}))}));P.displayName="NavItem";const A=["as","onSelect","activeKey","role","onKeyDown"];const B=()=>{},L=k("event-key"),$=e.forwardRef(((t,o)=>{let{as:i="div",onSelect:u,activeKey:l,role:s,onKeyDown:a}=t,c=function(e,n){if(null==e)return{};var t={};for(var r in e)if({}.hasOwnProperty.call(e,r)){if(n.indexOf(r)>=0)continue;t[r]=e[r]}return t}(t,A);const d=function(){const[,n]=e.useReducer((e=>e+1),0);return n}(),f=e.useRef(!1),m=e.useContext(w),g=e.useContext(K);let h,p;g&&(s=s||"tablist",l=g.activeKey,h=g.getControlledId,p=g.getControllerId);const v=e.useRef(null),b=e=>{const n=v.current;if(!n)return null;const t=r(n,`[${L}]:not([aria-disabled=true])`),o=n.querySelector("[aria-selected=true]");if(!o||o!==document.activeElement)return null;const i=t.indexOf(o);if(-1===i)return null;let u=i+e;return u>=t.length&&(u=0),u<0&&(u=t.length-1),t[u]},y=(e,n)=>{null!=e&&(null==u||u(e,n),null==m||m(e,n))};e.useEffect((()=>{if(v.current&&f.current){const e=v.current.querySelector(`[${L}][aria-selected=true]`);null==e||e.focus()}f.current=!1}));const E=N(o,v);return n.jsx(w.Provider,{value:y,children:n.jsx(C.Provider,{value:{role:s,activeKey:O(l),getControlledId:h||B,getControllerId:p||B},children:n.jsx(i,Object.assign({},c,{onKeyDown:e=>{if(null==a||a(e),!g)return;let n;switch(e.key){case"ArrowLeft":case"ArrowUp":n=b(-1);break;case"ArrowRight":case"ArrowDown":n=b(1);break;default:return}var t;n&&(e.preventDefault(),y(n.dataset[(t="EventKey",`rrUi${t}`)]||null,e),f.current=!0,d())},ref:E,role:s}))})})}));$.displayName="Nav";const F=Object.assign($,{Item:P});function W(n){const t=function(n){const t=e.useRef(n);return t.current=n,t}(n);e.useEffect((()=>()=>t.current()),[])}const q=k("modal-open");class H{constructor({ownerDocument:e,handleContainerOverflow:n=!0,isRTL:t=!1}={}){this.handleContainerOverflow=n,this.isRTL=t,this.modals=[],this.ownerDocument=e}getScrollbarWidth(){return function(e=document){const n=e.defaultView;return Math.abs(n.innerWidth-e.documentElement.clientWidth)}(this.ownerDocument)}getElement(){return(this.ownerDocument||document).body}setModalAttributes(e){}removeModalAttributes(e){}setContainerStyle(e){const n={overflow:"hidden"},t=this.isRTL?"paddingLeft":"paddingRight",r=this.getElement();e.style={overflow:r.style.overflow,[t]:r.style[t]},e.scrollBarWidth&&(n[t]=`${parseInt(o(r,t)||"0",10)+e.scrollBarWidth}px`),r.setAttribute(q,""),o(r,n)}reset(){[...this.modals].forEach((e=>this.remove(e)))}removeContainerStyle(e){const n=this.getElement();n.removeAttribute(q),Object.assign(n.style,e.style)}add(e){let n=this.modals.indexOf(e);return-1!==n?n:(n=this.modals.length,this.modals.push(e),this.setModalAttributes(e),0!==n||(this.state={scrollBarWidth:this.getScrollbarWidth(),style:{}},this.handleContainerOverflow&&this.setContainerStyle(this.state)),n)}remove(e){const n=this.modals.indexOf(e);-1!==n&&(this.modals.splice(n,1),!this.modals.length&&this.handleContainerOverflow&&this.removeContainerStyle(this.state),this.removeModalAttributes(e))}isTopModal(e){return!!this.modals.length&&this.modals[this.modals.length-1]===e}}const U=(e,n)=>t?null==e?(n||i()).body:("function"==typeof e&&(e=e()),e&&"current"in e&&(e=e.current),e&&("nodeType"in e||e.getBoundingClientRect)?e:null):null;function J({children:n,in:t,onExited:r,mountOnEnter:o,unmountOnExit:i}){const u=e.useRef(null),l=e.useRef(t),s=g(r);e.useEffect((()=>{t?l.current=!0:s(u.current)}),[t,s]);const a=N(u,n.ref),c=e.cloneElement(n,{ref:a});return t?c:i||!l.current&&o?null:c}const V=["onEnter","onEntering","onEntered","onExit","onExiting","onExited","addEndListener","children"];const z=["component"];const G=e.forwardRef(((t,r)=>{let{component:o}=t;const i=function(n){let{onEnter:t,onEntering:r,onEntered:o,onExit:i,onExiting:u,onExited:l,addEndListener:s,children:a}=n,d=function(e,n){if(null==e)return{};var t={};for(var r in e)if({}.hasOwnProperty.call(e,r)){if(n.indexOf(r)>=0)continue;t[r]=e[r]}return t}(n,V);const f=e.useRef(null),m=N(f,c(a)),g=e=>n=>{e&&f.current&&e(f.current,n)},h=e.useCallback(g(t),[t]),p=e.useCallback(g(r),[r]),v=e.useCallback(g(o),[o]),b=e.useCallback(g(i),[i]),y=e.useCallback(g(u),[u]),E=e.useCallback(g(l),[l]),x=e.useCallback(g(s),[s]);return Object.assign({},d,{nodeRef:f},t&&{onEnter:h},r&&{onEntering:p},o&&{onEntered:v},i&&{onExit:b},u&&{onExiting:y},l&&{onExited:E},s&&{addEndListener:x},{children:"function"==typeof a?(e,n)=>a(e,Object.assign({},n,{ref:m})):e.cloneElement(a,{ref:m})})}(function(e,n){if(null==e)return{};var t={};for(var r in e)if({}.hasOwnProperty.call(e,r)){if(n.indexOf(r)>=0)continue;t[r]=e[r]}return t}(t,z));return n.jsx(o,Object.assign({ref:r},i))}));function Q({children:n,in:t,onExited:r,onEntered:o,transition:i}){const[u,l]=e.useState(!t);t&&u&&l(!1);const s=function({in:n,onTransition:t}){const r=e.useRef(null),o=e.useRef(!0),i=g(t);return p((()=>{if(!r.current)return;let e=!1;return i({in:n,element:r.current,initial:o.current,isStale:()=>e}),()=>{e=!0}}),[n,i]),p((()=>(o.current=!1,()=>{o.current=!0})),[]),r}({in:!!t,onTransition:e=>{Promise.resolve(i(e)).then((()=>{e.isStale()||(e.in?null==o||o(e.element,e.initial):(l(!0),null==r||r(e.element)))}),(n=>{throw e.in||l(!0),n}))}}),a=N(s,n.ref);return u&&!t?null:e.cloneElement(n,{ref:a})}function X(e,t,r){return e?n.jsx(G,Object.assign({},r,{component:e})):t?n.jsx(Q,Object.assign({},r,{transition:t})):n.jsx(J,Object.assign({},r))}const Y=["show","role","className","style","children","backdrop","keyboard","onBackdropClick","onEscapeKeyDown","transition","runTransition","backdropTransition","runBackdropTransition","autoFocus","enforceFocus","restoreFocus","restoreFocusOptions","renderDialog","renderBackdrop","manager","container","onShow","onHide","onExit","onExited","onExiting","onEnter","onEntering","onEntered"];let Z;function _(n){const t=R(),r=n||function(e){return Z||(Z=new H({ownerDocument:null==e?void 0:e.document})),Z}(t),o=e.useRef({dialog:null,backdrop:null});return Object.assign(o.current,{add:()=>r.add(o.current),remove:()=>r.remove(o.current),isTopModal:()=>r.isTopModal(o.current),setDialogRef:e.useCallback((e=>{o.current.dialog=e}),[]),setBackdropRef:e.useCallback((e=>{o.current.backdrop=e}),[])})}const ee=e.forwardRef(((r,o)=>{let{show:i=!1,role:c="dialog",className:d,style:f,children:m,backdrop:h=!0,keyboard:p=!0,onBackdropClick:v,onEscapeKeyDown:b,transition:y,runTransition:E,backdropTransition:x,runBackdropTransition:w,autoFocus:O=!0,enforceFocus:C=!0,restoreFocus:k=!0,restoreFocusOptions:j,renderDialog:D,renderBackdrop:S=e=>n.jsx("div",Object.assign({},e)),manager:M,container:N,onShow:K,onHide:T=()=>{},onExit:I,onExited:P,onExiting:A,onEnter:B,onEntering:L,onEntered:$}=r,F=function(e,n){if(null==e)return{};var t={};for(var r in e)if({}.hasOwnProperty.call(e,r)){if(n.indexOf(r)>=0)continue;t[r]=e[r]}return t}(r,Y);const q=R(),H=function(n,t){const r=R(),[o,i]=e.useState((()=>U(n,null==r?void 0:r.document)));if(!o){const e=U(n);e&&i(e)}return e.useEffect((()=>{}),[t,o]),e.useEffect((()=>{const e=U(n);e!==o&&i(e)}),[n,o]),o}(N),J=_(M),V=function(){const n=e.useRef(!0),t=e.useRef((()=>n.current));return e.useEffect((()=>(n.current=!0,()=>{n.current=!1})),[]),t.current}(),z=function(n){const t=e.useRef(null);return e.useEffect((()=>{t.current=n})),t.current}(i),[G,Q]=e.useState(!i),Z=e.useRef(null);e.useImperativeHandle(o,(()=>J),[J]),t&&!z&&i&&(Z.current=u(null==q?void 0:q.document)),i&&G&&Q(!1);const ee=g((()=>{if(J.add(),ue.current=l(document,"keydown",oe),ie.current=l(document,"focus",(()=>setTimeout(te)),!0),K&&K(),O){var e,n;const t=u(null!=(e=null==(n=J.dialog)?void 0:n.ownerDocument)?e:null==q?void 0:q.document);J.dialog&&t&&!s(J.dialog,t)&&(Z.current=t,J.dialog.focus())}})),ne=g((()=>{var e;(J.remove(),null==ue.current||ue.current(),null==ie.current||ie.current(),k)&&(null==(e=Z.current)||null==e.focus||e.focus(j),Z.current=null)}));e.useEffect((()=>{i&&H&&ee()}),[i,H,ee]),e.useEffect((()=>{G&&ne()}),[G,ne]),W((()=>{ne()}));const te=g((()=>{if(!C||!V()||!J.isTopModal())return;const e=u(null==q?void 0:q.document);J.dialog&&e&&!s(J.dialog,e)&&J.dialog.focus()})),re=g((e=>{e.target===e.currentTarget&&(null==v||v(e),!0===h&&T())})),oe=g((e=>{p&&function(e){return"Escape"===e.code||27===e.keyCode}(e)&&J.isTopModal()&&(null==b||b(e),e.defaultPrevented||T())})),ie=e.useRef(),ue=e.useRef();if(!H)return null;const le=Object.assign({role:c,ref:J.setDialogRef,"aria-modal":"dialog"===c||void 0},F,{style:f,className:d,tabIndex:-1});let se=D?D(le):n.jsx("div",Object.assign({},le,{children:e.cloneElement(m,{role:"document"})}));se=X(y,E,{unmountOnExit:!0,mountOnEnter:!0,appear:!0,in:!!i,onExit:I,onExiting:A,onExited:(...e)=>{Q(!0),null==P||P(...e)},onEnter:B,onEntering:L,onEntered:$,children:se});let ae=null;return h&&(ae=S({ref:J.setBackdropRef,onClick:re}),ae=X(x,w,{in:!!i,appear:!0,mountOnEnter:!0,unmountOnExit:!0,children:ae})),n.jsx(n.Fragment,{children:a.createPortal(n.jsxs(n.Fragment,{children:[ae,se]}),H)})}));ee.displayName="Modal";const ne=Object.assign(ee,{Manager:H}),te=new WeakMap,re=(e,n)=>{if(!e||!n)return;const t=te.get(n)||new Map;te.set(n,t);let r=t.get(e);return r||(r=n.matchMedia(e),r.refCount=0,t.set(r.media,r)),r};function oe(n,t=("undefined"==typeof window?void 0:window)){const r=re(n,t),[o,i]=e.useState((()=>!!r&&r.matches));return S((()=>{let e=re(n,t);if(!e)return i(!1);let r=te.get(t);const o=()=>{i(e.matches)};return e.refCount++,e.addListener(o),o(),()=>{e.removeListener(o),e.refCount--,e.refCount<=0&&(null==r||r.delete(e.media)),e=void 0}}),[n]),o}const ie=function(n){const t=Object.keys(n);function r(e,n){return e===n?n:e?`${e} and ${n}`:n}function o(e){const r=function(e){return t[Math.min(t.indexOf(e)+1,t.length-1)]}(e);let o=n[r];return o="number"==typeof o?o-.2+"px":`calc(${o} - 0.2px)`,`(max-width: ${o})`}return function(t,i,u){let l;return"object"==typeof t?(l=t,u=i,i=!0):(i=i||!0,l={[t]:i}),oe(e.useMemo((()=>Object.entries(l).reduce(((e,[t,i])=>("up"!==i&&!0!==i||(e=r(e,function(e){let t=n[e];return"number"==typeof t&&(t=`${t}px`),`(min-width: ${t})`}(t))),"down"!==i&&!0!==i||(e=r(e,o(t))),e)),"")),[JSON.stringify(l)]),u)}}({xs:0,sm:576,md:768,lg:992,xl:1200,xxl:1400});export{x as A,F as B,H as M,w as S,m as a,I as b,ie as c,ne as d,c as g,O as m,f as u};