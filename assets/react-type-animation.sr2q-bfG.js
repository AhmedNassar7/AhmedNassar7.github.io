import{r as e,a as t}from"./react.D1r2OQ_i.js";function r(e,t,r,n){return new(r||(r=Promise))((function(t,a){function o(e){try{i(n.next(e))}catch(e){a(e)}}function u(e){try{i(n.throw(e))}catch(e){a(e)}}function i(e){var n;e.done?t(e.value):(n=e.value,n instanceof r?n:new r((function(e){e(n)}))).then(o,u)}i((n=n.apply(e,[])).next())}))}function n(e,t){var r,n,a,o,u={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return o={next:i(0),throw:i(1),return:i(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function i(o){return function(i){return function(o){if(r)throw new TypeError("Generator is already executing.");for(;u;)try{if(r=1,n&&(a=2&o[0]?n.return:o[0]?n.throw||((a=n.return)&&a.call(n),0):n.next)&&!(a=a.call(n,o[1])).done)return a;switch(n=0,a&&(o=[2&o[0],a.value]),o[0]){case 0:case 1:a=o;break;case 4:return u.label++,{value:o[1],done:!1};case 5:u.label++,n=o[1],o=[0];continue;case 7:o=u.ops.pop(),u.trys.pop();continue;default:if(!((a=(a=u.trys).length>0&&a[a.length-1])||6!==o[0]&&2!==o[0])){u=0;continue}if(3===o[0]&&(!a||o[1]>a[0]&&o[1]<a[3])){u.label=o[1];break}if(6===o[0]&&u.label<a[1]){u.label=a[1],a=o;break}if(a&&u.label<a[2]){u.label=a[2],u.ops.push(o);break}a[2]&&u.ops.pop(),u.trys.pop();continue}o=t.call(e,u)}catch(e){o=[6,e],n=0}finally{r=a=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,i])}}}function a(e){var t="function"==typeof Symbol&&Symbol.iterator,r=t&&e[t],n=0;if(r)return r.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&n>=e.length&&(e=void 0),{value:e&&e[n++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}function o(e,t){var r="function"==typeof Symbol&&e[Symbol.iterator];if(!r)return e;var n,a,o=r.call(e),u=[];try{for(;(void 0===t||t-- >0)&&!(n=o.next()).done;)u.push(n.value)}catch(e){a={error:e}}finally{try{n&&!n.done&&(r=o.return)&&r.call(o)}finally{if(a)throw a.error}}return u}function u(e,t,r){if(2===arguments.length)for(var n,a=0,o=t.length;a<o;a++)!n&&a in t||(n||(n=Array.prototype.slice.call(t,0,a)),n[a]=t[a]);return e.concat(n||Array.prototype.slice.call(t))}function i(e,t,i,s,f){for(var d=[],p=5;p<arguments.length;p++)d[p-5]=arguments[p];return r(this,0,void 0,(function(){var r,p,h,y,v,b;return n(this,(function(n){switch(n.label){case 0:n.trys.push([0,12,13,14]),r=a(d),p=r.next(),n.label=1;case 1:if(p.done)return[3,11];switch(typeof(h=p.value)){case"string":return[3,2];case"number":return[3,4];case"function":return[3,6]}return[3,8];case 2:return[4,c(e,t,h,i,s,f)];case 3:return n.sent(),[3,10];case 4:return[4,l(h)];case 5:return n.sent(),[3,10];case 6:return[4,h.apply(void 0,u([e,t,i,s,f],o(d),!1))];case 7:return n.sent(),[3,10];case 8:return[4,h];case 9:n.sent(),n.label=10;case 10:return p=r.next(),[3,1];case 11:return[3,14];case 12:return y=n.sent(),v={error:y},[3,14];case 13:try{p&&!p.done&&(b=r.return)&&b.call(r)}finally{if(v)throw v.error}return[7];case 14:return[2]}}))}))}function c(e,t,a,i,c,l){return r(this,0,void 0,(function(){var r,p;return n(this,(function(n){switch(n.label){case 0:return r=e.textContent||"",p=function(e,t){var r=o(t).slice(0);return u(u([],o(e),!1),[NaN],!1).findIndex((function(e,t){return r[t]!==e}))}(r,a),[4,s(e,u(u([],o(d(r,t,p)),!1),o(f(a,t,p)),!1),i,c,l)];case 1:return n.sent(),[2]}}))}))}function l(e){return r(this,0,void 0,(function(){return n(this,(function(t){switch(t.label){case 0:return[4,new Promise((function(t){return setTimeout(t,e)}))];case 1:return t.sent(),[2]}}))}))}function s(e,t,u,i,c){return r(this,0,void 0,(function(){var r,s,f,d,p,h,y,v,b,m,w,g,x;return n(this,(function(S){switch(S.label){case 0:if(r=t,c){for(s=0,f=1;f<t.length;f++)if(d=o([t[f-1],t[f]],2),p=d[0],(h=d[1]).length>p.length||""===h){s=f;break}r=t.slice(s,t.length)}S.label=1;case 1:S.trys.push([1,6,7,8]),y=a(function(e){var t,r,o,u,i,c,l;return n(this,(function(s){switch(s.label){case 0:t=function(e){return n(this,(function(t){switch(t.label){case 0:return[4,{op:function(t){return requestAnimationFrame((function(){return t.textContent=e}))},opCode:function(t){var r=t.textContent||"";return""===e||r.length>e.length?"DELETE":"WRITING"}}];case 1:return t.sent(),[2]}}))},s.label=1;case 1:s.trys.push([1,6,7,8]),r=a(e),o=r.next(),s.label=2;case 2:return o.done?[3,5]:(u=o.value,[5,t(u)]);case 3:s.sent(),s.label=4;case 4:return o=r.next(),[3,2];case 5:return[3,8];case 6:return i=s.sent(),c={error:i},[3,8];case 7:try{o&&!o.done&&(l=r.return)&&l.call(r)}finally{if(c)throw c.error}return[7];case 8:return[2]}}))}(r)),v=y.next(),S.label=2;case 2:return v.done?[3,5]:(b=v.value,m="WRITING"===b.opCode(e)?u+u*(Math.random()-.5):i+i*(Math.random()-.5),b.op(e),[4,l(m)]);case 3:S.sent(),S.label=4;case 4:return v=y.next(),[3,2];case 5:return[3,8];case 6:return w=S.sent(),g={error:w},[3,8];case 7:try{v&&!v.done&&(x=y.return)&&x.call(y)}finally{if(g)throw g.error}return[7];case 8:return[2]}}))}))}function f(e,t,r){var a,o;return void 0===r&&(r=0),n(this,(function(n){switch(n.label){case 0:a=t(e),o=a.length,n.label=1;case 1:return r<o?[4,a.slice(0,++r).join("")]:[3,3];case 2:return n.sent(),[3,1];case 3:return[2]}}))}function d(e,t,r){var a,o;return void 0===r&&(r=0),n(this,(function(n){switch(n.label){case 0:a=t(e),o=a.length,n.label=1;case 1:return o>r?[4,a.slice(0,--o).join("")]:[3,3];case 2:return n.sent(),[3,1];case 3:return[2]}}))}!function(e,t){void 0===t&&(t={});var r=t.insertAt;if("undefined"!=typeof document){var n=document.head||document.getElementsByTagName("head")[0],a=document.createElement("style");a.type="text/css","top"===r&&n.firstChild?n.insertBefore(a,n.firstChild):n.appendChild(a),a.styleSheet?a.styleSheet.cssText=e:a.appendChild(document.createTextNode(e))}}(".index-module_type__E-SaG::after {\n  content: '|';\n  animation: index-module_cursor__PQg0P 1.1s infinite step-start;\n}\n\n@keyframes index-module_cursor__PQg0P {\n  50% {\n    opacity: 0;\n  }\n}\n");var p=e.memo(e.forwardRef((function(r,n){var a=r.sequence,c=r.repeat,l=r.className,s=r.speed,f=void 0===s?40:s,d=r.deletionSpeed,p=r.omitDeletionAnimation,h=void 0!==p&&p,y=r.preRenderFirstString,v=void 0!==y&&y,b=r.wrapper,m=void 0===b?"span":b,w=r.splitter,g=void 0===w?function(e){return u([],o(e),!1)}:w,x=r.cursor,S=void 0===x||x,E=r.style,_=function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(n=Object.getOwnPropertySymbols(e);a<n.length;a++)t.indexOf(n[a])<0&&Object.prototype.propertyIsEnumerable.call(e,n[a])&&(r[n[a]]=e[n[a]])}return r}(r,["sequence","repeat","className","speed","deletionSpeed","omitDeletionAnimation","preRenderFirstString","wrapper","splitter","cursor","style"]),k=_["aria-label"],O=_["aria-hidden"],R=_.role;d||(d=f);var j=new Array(2).fill(40);[f,d].forEach((function(e,t){switch(typeof e){case"number":j[t]=Math.abs(e-100);break;case"object":var r=e.type,n=e.value;if("number"!=typeof n)break;"keyStrokeDelayInMs"===r&&(j[t]=n)}}));var C,N,P,T,A,I,G=j[0],D=j[1],M=function(t,r){void 0===r&&(r=null);var n=e.useRef(r);return e.useEffect((function(){t&&("function"==typeof t?t(n.current):t.current=n.current)}),[t]),n}(n),q="index-module_type__E-SaG";C=l?"".concat(S?q+" ":"").concat(l):S?q:"",N=e.useRef((function(){var e,t=a;c===1/0?e=i:"number"==typeof c&&(t=Array(1+c).fill(a).flat());var r=e?u(u([],o(t),!1),[e],!1):u([],o(t),!1);return i.apply(void 0,u([M.current,g,G,D,h],o(r),!1)),function(){M.current}})),P=e.useRef(),T=e.useRef(!1),A=e.useRef(!1),I=o(e.useState(0),2)[1],T.current&&(A.current=!0),e.useEffect((function(){return T.current||(P.current=N.current(),T.current=!0),I((function(e){return e+1})),function(){A.current&&P.current&&P.current()}}),[]);var F=m,B=v?a.find((function(e){return"string"==typeof e}))||"":null;return t.createElement(F,{"aria-hidden":O,"aria-label":k,role:R,style:E,className:C,children:k?t.createElement("span",{"aria-hidden":"true",ref:M,children:B}):B,ref:k?void 0:M})})),(function(e,t){return!0}));export{p as m};