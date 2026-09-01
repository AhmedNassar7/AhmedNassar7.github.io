import{o as e}from"./idb.7JQXQzuE.js";var t={};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const n="${JSCORE_VERSION}",i=function(e,t){if(!e)throw s(t)},s=function(e){return new Error("Firebase Database ("+n+") INTERNAL ASSERT FAILED: "+e)},r=function(e){const t=[];let n=0;for(let i=0;i<e.length;i++){let s=e.charCodeAt(i);s<128?t[n++]=s:s<2048?(t[n++]=s>>6|192,t[n++]=63&s|128):55296==(64512&s)&&i+1<e.length&&56320==(64512&e.charCodeAt(i+1))?(s=65536+((1023&s)<<10)+(1023&e.charCodeAt(++i)),t[n++]=s>>18|240,t[n++]=s>>12&63|128,t[n++]=s>>6&63|128,t[n++]=63&s|128):(t[n++]=s>>12|224,t[n++]=s>>6&63|128,t[n++]=63&s|128)}return t},o={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"==typeof atob,encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let s=0;s<e.length;s+=3){const t=e[s],r=s+1<e.length,o=r?e[s+1]:0,a=s+2<e.length,l=a?e[s+2]:0,h=t>>2,c=(3&t)<<4|o>>4;let u=(15&o)<<2|l>>6,d=63&l;a||(d=64,r||(u=64)),i.push(n[h],n[c],n[u],n[d])}return i.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(r(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):function(e){const t=[];let n=0,i=0;for(;n<e.length;){const s=e[n++];if(s<128)t[i++]=String.fromCharCode(s);else if(s>191&&s<224){const r=e[n++];t[i++]=String.fromCharCode((31&s)<<6|63&r)}else if(s>239&&s<365){const r=((7&s)<<18|(63&e[n++])<<12|(63&e[n++])<<6|63&e[n++])-65536;t[i++]=String.fromCharCode(55296+(r>>10)),t[i++]=String.fromCharCode(56320+(1023&r))}else{const r=e[n++],o=e[n++];t[i++]=String.fromCharCode((15&s)<<12|(63&r)<<6|63&o)}}return t.join("")}(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();const n=t?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let s=0;s<e.length;){const t=n[e.charAt(s++)],r=s<e.length?n[e.charAt(s)]:0;++s;const o=s<e.length?n[e.charAt(s)]:64;++s;const l=s<e.length?n[e.charAt(s)]:64;if(++s,null==t||null==r||null==o||null==l)throw new a;const h=t<<2|r>>4;if(i.push(h),64!==o){const e=r<<4&240|o>>2;if(i.push(e),64!==l){const e=o<<6&192|l;i.push(e)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class a extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const l=function(e){const t=r(e);return o.encodeByteArray(t,!0)},h=function(e){return l(e).replace(/\./g,"")},c=function(e){try{return o.decodeString(e,!0)}catch(t){}return null};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function u(e){return d(void 0,e)}function d(e,t){if(!(t instanceof Object))return t;switch(t.constructor){case Date:return new Date(t.getTime());case Object:void 0===e&&(e={});break;case Array:e=[];break;default:return t}for(const n in t)t.hasOwnProperty(n)&&p(n)&&(e[n]=d(e[n],t[n]));return e}function p(e){return"__proto__"!==e}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const _=()=>function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if("undefined"!=typeof global)return global;throw new Error("Unable to locate global object.")}().__FIREBASE_DEFAULTS__,f=()=>{try{return _()||(()=>{if("undefined"==typeof process)return;const e=t.__FIREBASE_DEFAULTS__;return e?JSON.parse(e):void 0})()||(()=>{if("undefined"==typeof document)return;let e;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch(n){return}const t=e&&c(e[1]);return t&&JSON.parse(t)})()}catch(e){return}},g=e=>{const t=(e=>{var t,n;return null===(n=null===(t=f())||void 0===t?void 0:t.emulatorHosts)||void 0===n?void 0:n[e]})(e);if(!t)return;const n=t.lastIndexOf(":");if(n<=0||n+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const i=parseInt(t.substring(n+1),10);return"["===t[0]?[t.substring(1,n-1),i]:[t.substring(0,n),i]},m=()=>{var e;return null===(e=f())||void 0===e?void 0:e.config};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class y{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),"function"==typeof e&&(this.promise.catch(()=>{}),1===e.length?e(t):e(t,n))}}}
/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function v(e){try{return(e.startsWith("http://")||e.startsWith("https://")?new URL(e).hostname:e).endsWith(".cloudworkstations.dev")}catch(t){return!1}}const C={};let w=!1;function b(e,t){if("undefined"==typeof window||"undefined"==typeof document||!v(window.location.host)||C[e]===t||C[e]||w)return;function n(e){return`__firebase__banner__${e}`}C[e]=t;const i="__firebase__banner",s=function(){const e={prod:[],emulator:[]};for(const t of Object.keys(C))C[t]?e.emulator.push(t):e.prod.push(t);return e}().prod.length>0;function r(){const e=document.createElement("span");return e.style.cursor="pointer",e.style.marginLeft="16px",e.style.fontSize="24px",e.innerHTML=" &times;",e.onclick=()=>{w=!0,function(){const e=document.getElementById(i);e&&e.remove()}()},e}function o(){const e=function(e){let t=document.getElementById(e),n=!1;return t||(t=document.createElement("div"),t.setAttribute("id",e),n=!0),{created:n,element:t}}(i),t=n("text"),o=document.getElementById(t)||document.createElement("span"),a=n("learnmore"),l=document.getElementById(a)||document.createElement("a"),h=n("preprendIcon"),c=document.getElementById(h)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(e.created){const t=e.element;!function(e){e.style.display="flex",e.style.background="#7faaf0",e.style.position="fixed",e.style.bottom="5px",e.style.left="5px",e.style.padding=".5em",e.style.borderRadius="5px",e.style.alignItems="center"}(t),function(e,t){e.setAttribute("id",t),e.innerText="Learn more",e.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",e.setAttribute("target","__blank"),e.style.paddingLeft="5px",e.style.textDecoration="underline"}(l,a);const n=r();!function(e,t){e.setAttribute("width","24"),e.setAttribute("id",t),e.setAttribute("height","24"),e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("fill","none"),e.style.marginLeft="-6px"}(c,h),t.append(c,o,l,n),document.body.appendChild(t)}s?(o.innerText="Preview backend disconnected.",c.innerHTML='<g clip-path="url(#clip0_6013_33858)">\n<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>\n</g>\n<defs>\n<clipPath id="clip0_6013_33858">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>'):(c.innerHTML='<g clip-path="url(#clip0_6083_34804)">\n<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>\n</g>\n<defs>\n<clipPath id="clip0_6083_34804">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>',o.innerText="Preview backend running in this workspace."),o.setAttribute("id",t)}"loading"===document.readyState?window.addEventListener("DOMContentLoaded",o):o()}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function I(){return"undefined"!=typeof window&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test("undefined"!=typeof navigator&&"string"==typeof navigator.userAgent?navigator.userAgent:"")}class T extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name="FirebaseError",Object.setPrototypeOf(this,T.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,E.prototype.create)}}class E{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){const n=t[0]||{},i=`${this.service}/${e}`,s=this.errors[e],r=s?function(e,t){return e.replace(S,(e,n)=>{const i=t[n];return null!=i?String(i):`<${n}?>`})}(s,n):"Error",o=`${this.serviceName}: ${r} (${i}).`;return new T(i,o,n)}}const S=/\{\$([^}]+)}/g;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function k(e){return JSON.parse(e)}function N(e){return JSON.stringify(e)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const P=function(e){let t={},n={},i={},s="";try{const r=e.split(".");t=k(c(r[0])||""),n=k(c(r[1])||""),s=r[2],i=n.d||{},delete n.d}catch(r){}return{header:t,claims:n,data:i,signature:s}};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function R(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function x(e,t){return Object.prototype.hasOwnProperty.call(e,t)?e[t]:void 0}function D(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}function A(e,t,n){const i={};for(const s in e)Object.prototype.hasOwnProperty.call(e,s)&&(i[s]=t.call(n,e[s],s,e));return i}function O(e,t){if(e===t)return!0;const n=Object.keys(e),i=Object.keys(t);for(const s of n){if(!i.includes(s))return!1;const n=e[s],r=t[s];if(M(n)&&M(r)){if(!O(n,r))return!1}else if(n!==r)return!1}for(const s of i)if(!n.includes(s))return!1;return!0}function M(e){return null!==e&&"object"==typeof e}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class L{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=64,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const n=this.W_;if("string"==typeof e)for(let c=0;c<16;c++)n[c]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let c=0;c<16;c++)n[c]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let c=16;c<80;c++){const e=n[c-3]^n[c-8]^n[c-14]^n[c-16];n[c]=4294967295&(e<<1|e>>>31)}let i,s,r=this.chain_[0],o=this.chain_[1],a=this.chain_[2],l=this.chain_[3],h=this.chain_[4];for(let c=0;c<80;c++){c<40?c<20?(i=l^o&(a^l),s=1518500249):(i=o^a^l,s=1859775393):c<60?(i=o&a|l&(o|a),s=2400959708):(i=o^a^l,s=3395469782);const e=(r<<5|r>>>27)+i+h+s+n[c]&4294967295;h=l,l=a,a=4294967295&(o<<30|o>>>2),o=r,r=e}this.chain_[0]=this.chain_[0]+r&4294967295,this.chain_[1]=this.chain_[1]+o&4294967295,this.chain_[2]=this.chain_[2]+a&4294967295,this.chain_[3]=this.chain_[3]+l&4294967295,this.chain_[4]=this.chain_[4]+h&4294967295}update(e,t){if(null==e)return;void 0===t&&(t=e.length);const n=t-this.blockSize;let i=0;const s=this.buf_;let r=this.inbuf_;for(;i<t;){if(0===r)for(;i<=n;)this.compress_(e,i),i+=this.blockSize;if("string"==typeof e){for(;i<t;)if(s[r]=e.charCodeAt(i),++r,++i,r===this.blockSize){this.compress_(s),r=0;break}}else for(;i<t;)if(s[r]=e[i],++r,++i,r===this.blockSize){this.compress_(s),r=0;break}}this.inbuf_=r,this.total_+=t}digest(){const e=[];let t=8*this.total_;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let i=this.blockSize-1;i>=56;i--)this.buf_[i]=255&t,t/=256;this.compress_(this.buf_);let n=0;for(let i=0;i<5;i++)for(let t=24;t>=0;t-=8)e[n]=this.chain_[i]>>t&255,++n;return e}}function F(e,t){return`${e} failed: ${t} argument `}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const q=function(e){let t=0;for(let n=0;n<e.length;n++){const i=e.charCodeAt(n);i<128?t++:i<2048?t+=2:i>=55296&&i<=56319?(t+=4,n++):t+=3}return t};
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function W(e){return e&&e._delegate?e._delegate:e}class U{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const H="[DEFAULT]";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class j{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const e=new y;if(this.instancesDeferred.set(t,e),this.isInitialized(t)||this.shouldAutoInitialize())try{const n=this.getOrInitializeService({instanceIdentifier:t});n&&e.resolve(n)}catch(n){}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const n=this.normalizeInstanceIdentifier(null==e?void 0:e.identifier),i=null!==(t=null==e?void 0:e.optional)&&void 0!==t&&t;if(!this.isInitialized(n)&&!this.shouldAutoInitialize()){if(i)return null;throw Error(`Service ${this.name} is not available`)}try{return this.getOrInitializeService({instanceIdentifier:n})}catch(s){if(i)return null;throw s}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,this.shouldAutoInitialize()){if(function(e){return"EAGER"===e.instantiationMode}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e))try{this.getOrInitializeService({instanceIdentifier:H})}catch(t){}for(const[e,n]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(e);try{const e=this.getOrInitializeService({instanceIdentifier:i});n.resolve(e)}catch(t){}}}}clearInstance(e=H){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...e.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return null!=this.component}isInitialized(e=H){return this.instances.has(e)}getOptions(e=H){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:n,options:t});for(const[s,r]of this.instancesDeferred.entries()){n===this.normalizeInstanceIdentifier(s)&&r.resolve(i)}return i}onInit(e,t){var n;const i=this.normalizeInstanceIdentifier(t),s=null!==(n=this.onInitCallbacks.get(i))&&void 0!==n?n:new Set;s.add(e),this.onInitCallbacks.set(i,s);const r=this.instances.get(i);return r&&e(r,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const n=this.onInitCallbacks.get(t);if(n)for(const s of n)try{s(e,t)}catch(i){}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:(i=e,i===H?void 0:i),options:t}),this.instances.set(e,n),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch(s){}var i;return n||null}normalizeInstanceIdentifier(e=H){return this.component?this.component.multipleInstances?e:H:e}shouldAutoInitialize(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode}}class B{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new j(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var z;!function(e){e[e.DEBUG=0]="DEBUG",e[e.VERBOSE=1]="VERBOSE",e[e.INFO=2]="INFO",e[e.WARN=3]="WARN",e[e.ERROR=4]="ERROR",e[e.SILENT=5]="SILENT"}(z||(z={}));const V={debug:z.DEBUG,verbose:z.VERBOSE,info:z.INFO,warn:z.WARN,error:z.ERROR,silent:z.SILENT},$=z.INFO,Y={[z.DEBUG]:"log",[z.VERBOSE]:"log",[z.INFO]:"info",[z.WARN]:"warn",[z.ERROR]:"error"},K=(e,t,...n)=>{if(t<e.logLevel)return;(new Date).toISOString();if(!Y[t])throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class G{constructor(e){this.name=e,this._logLevel=$,this._logHandler=K,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in z))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel="string"==typeof e?V[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if("function"!=typeof e)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,z.DEBUG,...e),this._logHandler(this,z.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,z.VERBOSE,...e),this._logHandler(this,z.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,z.INFO,...e),this._logHandler(this,z.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,z.WARN,...e),this._logHandler(this,z.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,z.ERROR,...e),this._logHandler(this,z.ERROR,...e)}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Q{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(function(e){const t=e.getComponent();return"VERSION"===(null==t?void 0:t.type)}(e)){const t=e.getImmediate();return`${t.library}/${t.version}`}return null}).filter(e=>e).join(" ")}}const J="@firebase/app",Z="0.13.2",X=new G("@firebase/app"),ee="@firebase/app-compat",te="@firebase/analytics-compat",ne="@firebase/analytics",ie="@firebase/app-check-compat",se="@firebase/app-check",re="@firebase/auth",oe="@firebase/auth-compat",ae="@firebase/database",le="@firebase/data-connect",he="@firebase/database-compat",ce="@firebase/functions",ue="@firebase/functions-compat",de="@firebase/installations",pe="@firebase/installations-compat",_e="@firebase/messaging",fe="@firebase/messaging-compat",ge="@firebase/performance",me="@firebase/performance-compat",ye="@firebase/remote-config",ve="@firebase/remote-config-compat",Ce="@firebase/storage",we="@firebase/storage-compat",be="@firebase/firestore",Ie="@firebase/ai",Te="@firebase/firestore-compat",Ee="firebase",Se="[DEFAULT]",ke={[J]:"fire-core",[ee]:"fire-core-compat",[ne]:"fire-analytics",[te]:"fire-analytics-compat",[se]:"fire-app-check",[ie]:"fire-app-check-compat",[re]:"fire-auth",[oe]:"fire-auth-compat",[ae]:"fire-rtdb",[le]:"fire-data-connect",[he]:"fire-rtdb-compat",[ce]:"fire-fn",[ue]:"fire-fn-compat",[de]:"fire-iid",[pe]:"fire-iid-compat",[_e]:"fire-fcm",[fe]:"fire-fcm-compat",[ge]:"fire-perf",[me]:"fire-perf-compat",[ye]:"fire-rc",[ve]:"fire-rc-compat",[Ce]:"fire-gcs",[we]:"fire-gcs-compat",[be]:"fire-fst",[Te]:"fire-fst-compat",[Ie]:"fire-vertex","fire-js":"fire-js",[Ee]:"fire-js-all"},Ne=new Map,Pe=new Map,Re=new Map;function xe(e,t){try{e.container.addComponent(t)}catch(n){X.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function De(e){const t=e.name;if(Re.has(t))return X.debug(`There were multiple attempts to register component ${t}.`),!1;Re.set(t,e);for(const n of Ne.values())xe(n,e);for(const n of Pe.values())xe(n,e);return!0}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Ae=new E("app","Firebase",{"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."});
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Oe{constructor(e,t,n){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new U("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Ae.create("app-deleted",{appName:this._name})}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Me(e,t={}){let n=e;if("object"!=typeof t){t={name:t}}const i=Object.assign({name:Se,automaticDataCollectionEnabled:!0},t),s=i.name;if("string"!=typeof s||!s)throw Ae.create("bad-app-name",{appName:String(s)});if(n||(n=m()),!n)throw Ae.create("no-options");const r=Ne.get(s);if(r){if(O(n,r.options)&&O(i,r.config))return r;throw Ae.create("duplicate-app",{appName:s})}const o=new B(s);for(const l of Re.values())o.addComponent(l);const a=new Oe(n,i,o);return Ne.set(s,a),a}function Le(e,t,n){var i;let s=null!==(i=ke[e])&&void 0!==i?i:e;n&&(s+=`-${n}`);const r=s.match(/\s|\//),o=t.match(/\s|\//);if(r||o){const e=[`Unable to register library "${s}" with version "${t}":`];return r&&e.push(`library name "${s}" contains illegal characters (whitespace or "/")`),r&&o&&e.push("and"),o&&e.push(`version name "${t}" contains illegal characters (whitespace or "/")`),void X.warn(e.join(" "))}De(new U(`${s}-version`,()=>({library:s,version:t}),"VERSION"))}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fe="firebase-heartbeat-store";let qe=null;function We(){return qe||(qe=e("firebase-heartbeat-database",1,{upgrade:(e,t)=>{if(0===t)try{e.createObjectStore(Fe)}catch(n){}}}).catch(e=>{throw Ae.create("idb-open",{originalErrorMessage:e.message})})),qe}async function Ue(e,t){try{const n=(await We()).transaction(Fe,"readwrite"),i=n.objectStore(Fe);await i.put(t,He(e)),await n.done}catch(n){if(n instanceof T)X.warn(n.message);else{const e=Ae.create("idb-set",{originalErrorMessage:null==n?void 0:n.message});X.warn(e.message)}}}function He(e){return`${e.name}!${e.options.appId}`}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class je{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new ze(t),this._heartbeatsCachePromise=this._storage.read().then(e=>(this._heartbeatsCache=e,e))}async triggerHeartbeat(){var e,t;try{const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Be();if(null==(null===(e=this._heartbeatsCache)||void 0===e?void 0:e.heartbeats)&&(this._heartbeatsCache=await this._heartbeatsCachePromise,null==(null===(t=this._heartbeatsCache)||void 0===t?void 0:t.heartbeats)))return;if(this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(e=>e.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:n}),this._heartbeatsCache.heartbeats.length>30){const e=function(e){if(0===e.length)return-1;let t=0,n=e[0].date;for(let i=1;i<e.length;i++)e[i].date<n&&(n=e[i].date,t=i);return t}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(e,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(n){X.warn(n)}}async getHeartbeatsHeader(){var e;try{if(null===this._heartbeatsCache&&await this._heartbeatsCachePromise,null==(null===(e=this._heartbeatsCache)||void 0===e?void 0:e.heartbeats)||0===this._heartbeatsCache.heartbeats.length)return"";const t=Be(),{heartbeatsToSend:n,unsentEntries:i}=function(e,t=1024){const n=[];let i=e.slice();for(const s of e){const e=n.find(e=>e.agent===s.agent);if(e){if(e.dates.push(s.date),Ve(n)>t){e.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),Ve(n)>t){n.pop();break}i=i.slice(1)}return{heartbeatsToSend:n,unsentEntries:i}}(this._heartbeatsCache.heartbeats),s=h(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=t,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(t){return X.warn(t),""}}}function Be(){return(new Date).toISOString().substring(0,10)}class ze{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return!!function(){try{return"object"==typeof indexedDB}catch(e){return!1}}()&&new Promise((e,t)=>{try{let n=!0;const i="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(i);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(i),e(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{var e;t((null===(e=s.error)||void 0===e?void 0:e.message)||"")}}catch(ct){t(ct)}}).then(()=>!0).catch(()=>!1)}async read(){if(await this._canUseIndexedDBPromise){const e=await async function(e){try{const t=(await We()).transaction(Fe),n=await t.objectStore(Fe).get(He(e));return await t.done,n}catch(t){if(t instanceof T)X.warn(t.message);else{const e=Ae.create("idb-get",{originalErrorMessage:null==t?void 0:t.message});X.warn(e.message)}}}(this.app);return(null==e?void 0:e.heartbeats)?e:{heartbeats:[]}}return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const n=await this.read();return Ue(this.app,{lastSentHeartbeatDate:null!==(t=e.lastSentHeartbeatDate)&&void 0!==t?t:n.lastSentHeartbeatDate,heartbeats:e.heartbeats})}}async add(e){var t;if(await this._canUseIndexedDBPromise){const n=await this.read();return Ue(this.app,{lastSentHeartbeatDate:null!==(t=e.lastSentHeartbeatDate)&&void 0!==t?t:n.lastSentHeartbeatDate,heartbeats:[...n.heartbeats,...e.heartbeats]})}}}function Ve(e){return h(JSON.stringify({version:2,heartbeats:e})).length}var $e;$e="",De(new U("platform-logger",e=>new Q(e),"PRIVATE")),De(new U("heartbeat",e=>new je(e),"PRIVATE")),Le(J,Z,$e),Le(J,Z,"esm2017"),Le("fire-js","");var Ye={};const Ke="@firebase/database",Ge="1.0.20";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let Qe="";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Je{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){null==t?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),N(t))}get(e){const t=this.domStorage_.getItem(this.prefixedName_(e));return null==t?null:k(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ze{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){null==t?delete this.cache_[e]:this.cache_[e]=t}get(e){return R(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xe=function(e){try{if("undefined"!=typeof window&&void 0!==window[e]){const t=window[e];return t.setItem("firebase:sentinel","cache"),t.removeItem("firebase:sentinel"),new Je(t)}}catch(t){}return new Ze},et=Xe("localStorage"),tt=Xe("sessionStorage"),nt=new G("@firebase/database"),it=function(){let e=1;return function(){return e++}}(),st=function(e){const t=function(e){const t=[];let n=0;for(let s=0;s<e.length;s++){let r=e.charCodeAt(s);if(r>=55296&&r<=56319){const t=r-55296;s++,i(s<e.length,"Surrogate pair missing trail surrogate."),r=65536+(t<<10)+(e.charCodeAt(s)-56320)}r<128?t[n++]=r:r<2048?(t[n++]=r>>6|192,t[n++]=63&r|128):r<65536?(t[n++]=r>>12|224,t[n++]=r>>6&63|128,t[n++]=63&r|128):(t[n++]=r>>18|240,t[n++]=r>>12&63|128,t[n++]=r>>6&63|128,t[n++]=63&r|128)}return t}(e),n=new L;n.update(t);const s=n.digest();return o.encodeByteArray(s)},rt=function(...e){let t="";for(let n=0;n<e.length;n++){const i=e[n];Array.isArray(i)||i&&"object"==typeof i&&"number"==typeof i.length?t+=rt.apply(null,i):t+="object"==typeof i?N(i):i,t+=" "}return t};let ot=null,at=!0;const lt=function(...e){if(!0===at&&(at=!1,null===ot&&!0===tt.get("logging_enabled")&&(i(!0,"Can't turn on custom loggers persistently."),nt.logLevel=z.VERBOSE,ot=nt.log.bind(nt))),ot){const t=rt.apply(null,e);ot(t)}},ht=function(e){return function(...t){lt(e,...t)}},ct=function(...e){const t="FIREBASE INTERNAL ERROR: "+rt(...e);nt.error(t)},ut=function(...e){const t=`FIREBASE FATAL ERROR: ${rt(...e)}`;throw nt.error(t),new Error(t)},dt=function(...e){const t="FIREBASE WARNING: "+rt(...e);nt.warn(t)},pt=function(e){return"number"==typeof e&&(e!=e||e===Number.POSITIVE_INFINITY||e===Number.NEGATIVE_INFINITY)},_t="[MIN_NAME]",ft="[MAX_NAME]",gt=function(e,t){if(e===t)return 0;if(e===_t||t===ft)return-1;if(t===_t||e===ft)return 1;{const n=Tt(e),i=Tt(t);return null!==n?null!==i?n-i===0?e.length-t.length:n-i:-1:null!==i?1:e<t?-1:1}},mt=function(e,t){return e===t?0:e<t?-1:1},yt=function(e,t){if(t&&e in t)return t[e];throw new Error("Missing required key ("+e+") in object: "+N(t))},vt=function(e){if("object"!=typeof e||null===e)return N(e);const t=[];for(const i in e)t.push(i);t.sort();let n="{";for(let i=0;i<t.length;i++)0!==i&&(n+=","),n+=N(t[i]),n+=":",n+=vt(e[t[i]]);return n+="}",n},Ct=function(e,t){const n=e.length;if(n<=t)return[e];const i=[];for(let s=0;s<n;s+=t)s+t>n?i.push(e.substring(s,n)):i.push(e.substring(s,s+t));return i};function wt(e,t){for(const n in e)e.hasOwnProperty(n)&&t(n,e[n])}const bt=function(e){i(!pt(e),"Invalid JSON number");const t=1023;let n,s,r,o,a;0===e?(s=0,r=0,n=1/e==-1/0?1:0):(n=e<0,(e=Math.abs(e))>=Math.pow(2,-1022)?(o=Math.min(Math.floor(Math.log(e)/Math.LN2),t),s=o+t,r=Math.round(e*Math.pow(2,52-o)-Math.pow(2,52))):(s=0,r=Math.round(e/Math.pow(2,-1074))));const l=[];for(a=52;a;a-=1)l.push(r%2?1:0),r=Math.floor(r/2);for(a=11;a;a-=1)l.push(s%2?1:0),s=Math.floor(s/2);l.push(n?1:0),l.reverse();const h=l.join("");let c="";for(a=0;a<64;a+=8){let e=parseInt(h.substr(a,8),2).toString(16);1===e.length&&(e="0"+e),c+=e}return c.toLowerCase()};const It=new RegExp("^-?(0*)\\d{1,10}$"),Tt=function(e){if(It.test(e)){const t=Number(e);if(t>=-2147483648&&t<=2147483647)return t}return null},Et=function(e){try{e()}catch(t){setTimeout(()=>{const e=t.stack||"";throw dt("Exception was thrown by user callback.",e),t},Math.floor(0))}},St=function(e,t){const n=setTimeout(e,t);return"number"==typeof n&&"undefined"!=typeof Deno&&Deno.unrefTimer?Deno.unrefTimer(n):"object"==typeof n&&n.unref&&n.unref(),n};
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class kt{constructor(e,t){var n;this.appCheckProvider=t,this.appName=e.name,null!=(n=e)&&void 0!==n.settings&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=null==t?void 0:t.getImmediate({optional:!0}),this.appCheck||null==t||t.get().then(e=>this.appCheck=e)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((t,n)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(t,n):t(null)},0)})}addTokenChangeListener(e){var t;null===(t=this.appCheckProvider)||void 0===t||t.get().then(t=>t.addTokenListener(e))}notifyForInvalidToken(){dt(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nt{constructor(e,t,n){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=n,this.auth_=null,this.auth_=n.getImmediate({optional:!0}),this.auth_||n.onInit(e=>this.auth_=e)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(e=>e&&"auth/token-not-initialized"===e.code?(lt("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(e)):new Promise((t,n)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(t,n):t(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(t=>t.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(t=>t.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',dt(e)}}class Pt{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}Pt.OWNER="owner";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Rt=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,xt="ac",Dt="websocket",At="long_polling";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Ot{constructor(e,t,n,i,s=!1,r="",o=!1,a=!1,l=null){this.secure=t,this.namespace=n,this.webSocketOnly=i,this.nodeAdmin=s,this.persistenceKey=r,this.includeNamespaceInQueryParams=o,this.isUsingEmulator=a,this.emulatorOptions=l,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=et.get("host:"+e)||this._host}isCacheableHost(){return"s-"===this.internalHost.substr(0,2)}isCustomHost(){return"firebaseio.com"!==this._domain&&"firebaseio-demo.com"!==this._domain}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&et.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}}function Mt(e,t,n){let s;if(i("string"==typeof t,"typeof type must == string"),i("object"==typeof n,"typeof params must == object"),t===Dt)s=(e.secure?"wss://":"ws://")+e.internalHost+"/.ws?";else{if(t!==At)throw new Error("Unknown connection type: "+t);s=(e.secure?"https://":"http://")+e.internalHost+"/.lp?"}(function(e){return e.host!==e.internalHost||e.isCustomHost()||e.includeNamespaceInQueryParams})(e)&&(n.ns=e.namespace);const r=[];return wt(n,(e,t)=>{r.push(e+"="+t)}),s+r.join("&")}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lt{constructor(){this.counters_={}}incrementCounter(e,t=1){R(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return u(this.counters_)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ft={},qt={};function Wt(e){const t=e.toString();return Ft[t]||(Ft[t]=new Lt),Ft[t]}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Ut{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){const e=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let t=0;t<e.length;++t)e[t]&&Et(()=>{this.onMessage_(e[t])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ht="start";class jt{constructor(e,t,n,i,s,r,o){this.connId=e,this.repoInfo=t,this.applicationId=n,this.appCheckToken=i,this.authToken=s,this.transportSessionId=r,this.lastSessionId=o,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=ht(e),this.stats_=Wt(t),this.urlFn=e=>(this.appCheckToken&&(e[xt]=this.appCheckToken),Mt(t,At,e))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new Ut(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(3e4)),function(e){if("complete"===document.readyState)e();else{let t=!1;const n=function(){document.body?t||(t=!0,e()):setTimeout(n,Math.floor(10))};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{"complete"===document.readyState&&n()}),window.attachEvent("onload",n))}}(()=>{if(this.isClosed_)return;this.scriptTagHolder=new Bt((...e)=>{const[t,n,i,s,r]=e;if(this.incrementIncomingBytes_(e),this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,t===Ht)this.id=n,this.password=i;else{if("close"!==t)throw new Error("Unrecognized command received: "+t);n?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(n,()=>{this.onClosed_()})):this.onClosed_()}},(...e)=>{const[t,n]=e;this.incrementIncomingBytes_(e),this.myPacketOrderer.handleResponse(t,n)},()=>{this.onClosed_()},this.urlFn);const e={};e[Ht]="t",e.ser=Math.floor(1e8*Math.random()),this.scriptTagHolder.uniqueCallbackIdentifier&&(e.cb=this.scriptTagHolder.uniqueCallbackIdentifier),e.v="5",this.transportSessionId&&(e.s=this.transportSessionId),this.lastSessionId&&(e.ls=this.lastSessionId),this.applicationId&&(e.p=this.applicationId),this.appCheckToken&&(e[xt]=this.appCheckToken),"undefined"!=typeof location&&location.hostname&&Rt.test(location.hostname)&&(e.r="f");const t=this.urlFn(e);this.log_("Connecting via long-poll to "+t),this.scriptTagHolder.addTag(t,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){jt.forceAllow_=!0}static forceDisallow(){jt.forceDisallow_=!0}static isAvailable(){return!!jt.forceAllow_||!(jt.forceDisallow_||"undefined"==typeof document||null==document.createElement||"object"==typeof window&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href)||"object"==typeof Windows&&"object"==typeof Windows.UI)}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const t=N(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const n=l(t),i=Ct(n,1840);for(let s=0;s<i.length;s++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,i.length,i[s]),this.curSegmentNum++}addDisconnectPingFrame(e,t){this.myDisconnFrame=document.createElement("iframe");const n={dframe:"t"};n.id=e,n.pw=t,this.myDisconnFrame.src=this.urlFn(n),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const t=N(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}}class Bt{constructor(e,t,n,i){this.onDisconnect=n,this.urlFn=i,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(1e8*Math.random()),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=it(),window["pLPCommand"+this.uniqueCallbackIdentifier]=e,window["pRTLPCB"+this.uniqueCallbackIdentifier]=t,this.myIFrame=Bt.createIFrame_();let n="";if(this.myIFrame.src&&"javascript:"===this.myIFrame.src.substr(0,11)){n='<script>document.domain="'+document.domain+'";<\/script>'}const i="<html><body>"+n+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(i),this.myIFrame.doc.close()}catch(s){lt("frame writing exception"),s.stack&&lt(s.stack),lt(s)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",!document.body)throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";document.body.appendChild(e);try{e.contentWindow.document||lt("No IE domain setting required")}catch(t){const n=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+n+"';document.close();})())"}return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{null!==this.myIFrame&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e.id=this.myID,e.pw=this.myPW,e.ser=this.currentSerial;let t=this.urlFn(e),n="",i=0;for(;this.pendingSegs.length>0;){if(!(this.pendingSegs[0].d.length+30+n.length<=1870))break;{const e=this.pendingSegs.shift();n=n+"&seg"+i+"="+e.seg+"&ts"+i+"="+e.ts+"&d"+i+"="+e.d,i++}}return t+=n,this.addLongPollTag_(t,this.currentSerial),!0}return!1}enqueueSegment(e,t,n){this.pendingSegs.push({seg:e,ts:t,d:n}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);const n=()=>{this.outstandingRequests.delete(t),this.newRequest_()},i=setTimeout(n,Math.floor(25e3));this.addTag(e,()=>{clearTimeout(i),n()})}addTag(e,t){setTimeout(()=>{try{if(!this.sendNewPolls)return;const n=this.myIFrame.doc.createElement("script");n.type="text/javascript",n.async=!0,n.src=e,n.onload=n.onreadystatechange=function(){const e=n.readyState;e&&"loaded"!==e&&"complete"!==e||(n.onload=n.onreadystatechange=null,n.parentNode&&n.parentNode.removeChild(n),t())},n.onerror=()=>{lt("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(n)}catch(n){}},Math.floor(1))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let zt=null;"undefined"!=typeof MozWebSocket?zt=MozWebSocket:"undefined"!=typeof WebSocket&&(zt=WebSocket);class Vt{constructor(e,t,n,i,s,r,o){this.connId=e,this.applicationId=n,this.appCheckToken=i,this.authToken=s,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=ht(this.connId),this.stats_=Wt(t),this.connURL=Vt.connectionURL_(t,r,o,i,n),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,n,i,s){const r={v:"5"};return"undefined"!=typeof location&&location.hostname&&Rt.test(location.hostname)&&(r.r="f"),t&&(r.s=t),n&&(r.ls=n),i&&(r[xt]=i),s&&(r.p=s),Mt(e,Dt,r)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,et.set("previous_websocket_failure",!0);try{let e;this.mySock=new zt(this.connURL,[],e)}catch(n){this.log_("Error instantiating WebSocket.");const e=n.message||n.data;return e&&this.log_(e),void this.onClosed_()}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=e=>{this.handleIncomingFrame(e)},this.mySock.onerror=e=>{this.log_("WebSocket error.  Closing connection.");const t=e.message||e.data;t&&this.log_(t),this.onClosed_()}}start(){}static forceDisallow(){Vt.forceDisallow_=!0}static isAvailable(){let e=!1;if("undefined"!=typeof navigator&&navigator.userAgent){const t=/Android ([0-9]{0,}\.[0-9]{0,})/,n=navigator.userAgent.match(t);n&&n.length>1&&parseFloat(n[1])<4.4&&(e=!0)}return!e&&null!==zt&&!Vt.forceDisallow_}static previouslyFailed(){return et.isInMemoryStorage||!0===et.get("previous_websocket_failure")}markConnectionHealthy(){et.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const e=this.frames.join("");this.frames=null;const t=k(e);this.onMessage(t)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(i(null===this.frames,"We already have a frame buffer"),e.length<=6){const t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(null===this.mySock)return;const t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),null!==this.frames)this.appendFrame_(t);else{const e=this.extractFrameCount_(t);null!==e&&this.appendFrame_(e)}}send(e){this.resetKeepAlive();const t=N(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const n=Ct(t,16384);n.length>1&&this.sendString_(String(n.length));for(let i=0;i<n.length;i++)this.sendString_(n[i])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(45e3))}sendString_(e){try{this.mySock.send(e)}catch(t){this.log_("Exception thrown from WebSocket.send():",t.message||t.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}Vt.responsesRequiredToBeHealthy=2,Vt.healthyTimeout=3e4;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class $t{static get ALL_TRANSPORTS(){return[jt,Vt]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const t=Vt&&Vt.isAvailable();let n=t&&!Vt.previouslyFailed();if(e.webSocketOnly&&(t||dt("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),n=!0),n)this.transports_=[Vt];else{const e=this.transports_=[];for(const t of $t.ALL_TRANSPORTS)t&&t.isAvailable()&&e.push(t);$t.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}$t.globalTransportInitialized_=!1;class Yt{constructor(e,t,n,i,s,r,o,a,l,h){this.id=e,this.repoInfo_=t,this.applicationId_=n,this.appCheckToken_=i,this.authToken_=s,this.onMessage_=r,this.onReady_=o,this.onDisconnect_=a,this.onKill_=l,this.lastSessionId=h,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=ht("c:"+this.id+":"),this.transportManager_=new $t(t),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.conn_),n=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(t,n)},Math.floor(0));const i=e.healthyTimeout||0;i>0&&(this.healthyTimeout_=St(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>102400?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>10240?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(i)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{2!==this.state_&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){const t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if("t"in e){const t=e.t;"a"===t?this.upgradeIfSecondaryHealthy_():"r"===t?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),this.tx_!==this.secondaryConn_&&this.rx_!==this.secondaryConn_||this.close()):"o"===t&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const t=yt("t",e),n=yt("d",e);if("c"===t)this.onSecondaryControl_(n);else{if("d"!==t)throw new Error("Unknown protocol layer: "+t);this.pendingDataMessages.push(n)}}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:"p",d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:"a",d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:"n",d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const t=yt("t",e),n=yt("d",e);"c"===t?this.onControl_(n):"d"===t&&this.onDataMessage_(n)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const t=yt("t",e);if("d"in e){const n=e.d;if("h"===t){const e=Object.assign({},n);this.repoInfo_.isUsingEmulator&&(e.h=this.repoInfo_.host),this.onHandshake_(e)}else if("n"===t){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let e=0;e<this.pendingDataMessages.length;++e)this.onDataMessage_(this.pendingDataMessages[e]);this.pendingDataMessages=[],this.tryCleanupConnection()}else"s"===t?this.onConnectionShutdown_(n):"r"===t?this.onReset_(n):"e"===t?ct("Server Error: "+n):"o"===t?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):ct("Unknown control packet command: "+t)}}onHandshake_(e){const t=e.ts,n=e.v,i=e.h;this.sessionId=e.s,this.repoInfo_.host=i,0===this.state_&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),"5"!==n&&dt("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.secondaryConn_),n=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,n),St(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(6e4))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,1===this.state_?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),0===this.primaryResponsesRequired_?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):St(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(5e3))}sendPingOnPrimaryIfNecessary_(){this.isHealthy_||1!==this.state_||(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:"p",d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,this.tx_!==e&&this.rx_!==e||this.close()}onConnectionLost_(e){this.conn_=null,e||0!==this.state_?1===this.state_&&this.log_("Realtime connection lost."):(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(et.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(1!==this.state_)throw"Connection is not connected";this.tx_.send(e)}close(){2!==this.state_&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kt{put(e,t,n,i){}merge(e,t,n,i){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,n){}onDisconnectMerge(e,t,n){}onDisconnectCancel(e,t){}reportStats(e){}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gt{constructor(e){this.allowedEvents_=e,this.listeners_={},i(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){const n=[...this.listeners_[e]];for(let e=0;e<n.length;e++)n[e].callback.apply(n[e].context,t)}}on(e,t,n){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:n});const i=this.getInitialEvent(e);i&&t.apply(n,i)}off(e,t,n){this.validateEventType_(e);const i=this.listeners_[e]||[];for(let s=0;s<i.length;s++)if(i[s].callback===t&&(!n||n===i[s].context))return void i.splice(s,1)}validateEventType_(e){i(this.allowedEvents_.find(t=>t===e),"Unknown event: "+e)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qt extends Gt{static getInstance(){return new Qt}constructor(){super(["online"]),this.online_=!0,"undefined"==typeof window||void 0===window.addEventListener||I()||(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return i("online"===e,"Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jt{constructor(e,t){if(void 0===t){this.pieces_=e.split("/");let t=0;for(let e=0;e<this.pieces_.length;e++)this.pieces_[e].length>0&&(this.pieces_[t]=this.pieces_[e],t++);this.pieces_.length=t,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)""!==this.pieces_[t]&&(e+="/"+this.pieces_[t]);return e||"/"}}function Zt(){return new Jt("")}function Xt(e){return e.pieceNum_>=e.pieces_.length?null:e.pieces_[e.pieceNum_]}function en(e){return e.pieces_.length-e.pieceNum_}function tn(e){let t=e.pieceNum_;return t<e.pieces_.length&&t++,new Jt(e.pieces_,t)}function nn(e){return e.pieceNum_<e.pieces_.length?e.pieces_[e.pieces_.length-1]:null}function sn(e,t=0){return e.pieces_.slice(e.pieceNum_+t)}function rn(e){if(e.pieceNum_>=e.pieces_.length)return null;const t=[];for(let n=e.pieceNum_;n<e.pieces_.length-1;n++)t.push(e.pieces_[n]);return new Jt(t,0)}function on(e,t){const n=[];for(let i=e.pieceNum_;i<e.pieces_.length;i++)n.push(e.pieces_[i]);if(t instanceof Jt)for(let i=t.pieceNum_;i<t.pieces_.length;i++)n.push(t.pieces_[i]);else{const e=t.split("/");for(let t=0;t<e.length;t++)e[t].length>0&&n.push(e[t])}return new Jt(n,0)}function an(e){return e.pieceNum_>=e.pieces_.length}function ln(e,t){const n=Xt(e),i=Xt(t);if(null===n)return t;if(n===i)return ln(tn(e),tn(t));throw new Error("INTERNAL ERROR: innerPath ("+t+") is not within outerPath ("+e+")")}function hn(e,t){if(en(e)!==en(t))return!1;for(let n=e.pieceNum_,i=t.pieceNum_;n<=e.pieces_.length;n++,i++)if(e.pieces_[n]!==t.pieces_[i])return!1;return!0}function cn(e,t){let n=e.pieceNum_,i=t.pieceNum_;if(en(e)>en(t))return!1;for(;n<e.pieces_.length;){if(e.pieces_[n]!==t.pieces_[i])return!1;++n,++i}return!0}class un{constructor(e,t){this.errorPrefix_=t,this.parts_=sn(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let n=0;n<this.parts_.length;n++)this.byteLength_+=q(this.parts_[n]);dn(this)}}function dn(e){if(e.byteLength_>768)throw new Error(e.errorPrefix_+"has a key path longer than 768 bytes ("+e.byteLength_+").");if(e.parts_.length>32)throw new Error(e.errorPrefix_+"path specified exceeds the maximum depth that can be written (32) or object contains a cycle "+pn(e))}function pn(e){return 0===e.parts_.length?"":"in property '"+e.parts_.join(".")+"'"}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _n extends Gt{static getInstance(){return new _n}constructor(){let e,t;super(["visible"]),"undefined"!=typeof document&&void 0!==document.addEventListener&&(void 0!==document.hidden?(t="visibilitychange",e="hidden"):void 0!==document.mozHidden?(t="mozvisibilitychange",e="mozHidden"):void 0!==document.msHidden?(t="msvisibilitychange",e="msHidden"):void 0!==document.webkitHidden&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,()=>{const t=!document[e];t!==this.visible_&&(this.visible_=t,this.trigger("visible",t))},!1)}getInitialEvent(e){return i("visible"===e,"Unknown event type: "+e),[this.visible_]}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fn=1e3;class gn extends Kt{constructor(e,t,n,i,s,r,o,a){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=n,this.onConnectStatus_=i,this.onServerInfoUpdate_=s,this.authTokenProvider_=r,this.appCheckTokenProvider_=o,this.authOverride_=a,this.id=gn.nextPersistentConnectionId_++,this.log_=ht("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=fn,this.maxReconnectDelay_=3e5,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,a)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");_n.getInstance().on("visible",this.onVisible_,this),-1===e.host.indexOf("fblocal")&&Qt.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,n){const s=++this.requestNumber_,r={r:s,a:e,b:t};this.log_(N(r)),i(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),n&&(this.requestCBHash_[s]=n)}get(e){this.initConnection_();const t=new y,n={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:e=>{const n=e.d;"ok"===e.s?t.resolve(n):t.reject(n)}};this.outstandingGets_.push(n),this.outstandingGetCount_++;const i=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(i),t.promise}listen(e,t,n,s){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),i(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),i(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const a={onComplete:s,hashFn:t,query:e,tag:n};this.listens.get(o).set(r,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const t=this.outstandingGets_[e];this.sendRequest("g",t.request,n=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,0===this.outstandingGetCount_&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(n)})}sendListen_(e){const t=e.query,n=t._path.toString(),i=t._queryIdentifier;this.log_("Listen on "+n+" for "+i);const s={p:n};e.tag&&(s.q=t._queryObject,s.t=e.tag),s.h=e.hashFn(),this.sendRequest("q",s,s=>{const r=s.d,o=s.s;gn.warnOnListenWarnings_(r,t);(this.listens.get(n)&&this.listens.get(n).get(i))===e&&(this.log_("listen response",s),"ok"!==o&&this.removeListen_(n,i),e.onComplete&&e.onComplete(o,r))})}static warnOnListenWarnings_(e,t){if(e&&"object"==typeof e&&R(e,"w")){const n=x(e,"w");if(Array.isArray(n)&&~n.indexOf("no_index")){const e='".indexOn": "'+t._queryParams.getIndex().toString()+'"',n=t._path.toString();dt(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${e} at ${n} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&40===e.length||function(e){const t=P(e).claims;return"object"==typeof t&&!0===t.admin}(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=3e4)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,t=function(e){const t=P(e).claims;return!!t&&"object"==typeof t&&t.hasOwnProperty("iat")}(e)?"auth":"gauth",n={cred:e};null===this.authOverride_?n.noauth=!0:"object"==typeof this.authOverride_&&(n.authvar=this.authOverride_),this.sendRequest(t,n,t=>{const n=t.s,i=t.d||"error";this.authToken_===e&&("ok"===n?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(n,i))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const t=e.s,n=e.d||"error";"ok"===t?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,n)})}unlisten(e,t){const n=e._path.toString(),s=e._queryIdentifier;this.log_("Unlisten called for "+n+" "+s),i(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query");this.removeListen_(n,s)&&this.connected_&&this.sendUnlisten_(n,s,e._queryObject,t)}sendUnlisten_(e,t,n,i){this.log_("Unlisten on "+e+" for "+t);const s={p:e};i&&(s.q=n,s.t=i),this.sendRequest("n",s)}onDisconnectPut(e,t,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:n})}onDisconnectMerge(e,t,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:n})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,n,i){const s={p:t,d:n};this.log_("onDisconnect "+e,s),this.sendRequest(e,s,e=>{i&&setTimeout(()=>{i(e.s,e.d)},Math.floor(0))})}put(e,t,n,i){this.putInternal("p",e,t,n,i)}merge(e,t,n,i){this.putInternal("m",e,t,n,i)}putInternal(e,t,n,i,s){this.initConnection_();const r={p:t,d:n};void 0!==s&&(r.h=s),this.outstandingPuts_.push({action:e,request:r,onComplete:i}),this.outstandingPutCount_++;const o=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(o):this.log_("Buffering put: "+t)}sendPut_(e){const t=this.outstandingPuts_[e].action,n=this.outstandingPuts_[e].request,i=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,n,n=>{this.log_(t+" response",n),delete this.outstandingPuts_[e],this.outstandingPutCount_--,0===this.outstandingPutCount_&&(this.outstandingPuts_=[]),i&&i(n.s,n.d)})}reportStats(e){if(this.connected_){const t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,e=>{if("ok"!==e.s){const t=e.d;this.log_("reportStats","Error sending stats: "+t)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+N(e));const t=e.r,n=this.requestCBHash_[t];n&&(delete this.requestCBHash_[t],n(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),"d"===e?this.onDataUpdate_(t.p,t.d,!1,t.t):"m"===e?this.onDataUpdate_(t.p,t.d,!0,t.t):"c"===e?this.onListenRevoked_(t.p,t.q):"ac"===e?this.onAuthRevoked_(t.s,t.d):"apc"===e?this.onAppCheckRevoked_(t.s,t.d):"sd"===e?this.onSecurityDebugPacket_(t):ct("Unrecognized action received from server: "+N(e)+"\nAre you using the latest client?")}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=(new Date).getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){i(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=fn,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=fn,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){if(this.visible_){if(this.lastConnectionEstablishedTime_){(new Date).getTime()-this.lastConnectionEstablishedTime_>3e4&&(this.reconnectDelay_=fn),this.lastConnectionEstablishedTime_=null}}else this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=(new Date).getTime();const e=Math.max(0,(new Date).getTime()-this.lastConnectionAttemptTime_);let t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,1.3*this.reconnectDelay_)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=(new Date).getTime(),this.lastConnectionEstablishedTime_=null;const t=this.onDataMessage_.bind(this),n=this.onReady_.bind(this),s=this.onRealtimeDisconnect_.bind(this),r=this.id+":"+gn.nextConnectionId_++,o=this.lastSessionId;let a=!1,l=null;const h=function(){l?l.close():(a=!0,s())},c=function(e){i(l,"sendRequest call when we're not connected not allowed."),l.sendRequest(e)};this.realtime_={close:h,sendRequest:c};const u=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[e,i]=await Promise.all([this.authTokenProvider_.getToken(u),this.appCheckTokenProvider_.getToken(u)]);a?lt("getToken() completed but was canceled"):(lt("getToken() completed. Creating connection."),this.authToken_=e&&e.accessToken,this.appCheckToken_=i&&i.token,l=new Yt(r,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,t,n,s,e=>{dt(e+" ("+this.repoInfo_.toString()+")"),this.interrupt("server_kill")},o))}catch(e){this.log_("Failed to get token: "+e),a||(this.repoInfo_.nodeAdmin&&dt(e),h())}}}interrupt(e){lt("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){lt("Resuming connection for reason: "+e),delete this.interruptReasons_[e],D(this.interruptReasons_)&&(this.reconnectDelay_=fn,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const t=e-(new Date).getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}0===this.outstandingPutCount_&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let n;n=t?t.map(e=>vt(e)).join("$"):"default";const i=this.removeListen_(e,n);i&&i.onComplete&&i.onComplete("permission_denied")}removeListen_(e,t){const n=new Jt(e).toString();let i;if(this.listens.has(n)){const e=this.listens.get(n);i=e.get(t),e.delete(t),0===e.size&&this.listens.delete(n)}else i=void 0;return i}onAuthRevoked_(e,t){lt("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),"invalid_token"!==e&&"permission_denied"!==e||(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=3&&(this.reconnectDelay_=3e4,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){lt("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,"invalid_token"!==e&&"permission_denied"!==e||(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=3&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_&&this.securityDebugCallback_(e)}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};e["sdk.js."+Qe.replace(/\./g,"-")]=1,I()?e["framework.cordova"]=1:"object"==typeof navigator&&"ReactNative"===navigator.product&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=Qt.getInstance().currentlyOnline();return D(this.interruptReasons_)&&e}}gn.nextPersistentConnectionId_=0,gn.nextConnectionId_=0;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class mn{constructor(e,t){this.name=e,this.node=t}static Wrap(e,t){return new mn(e,t)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yn{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){const n=new mn(_t,e),i=new mn(_t,t);return 0!==this.compare(n,i)}minPost(){return mn.MIN}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let vn;class Cn extends yn{static get __EMPTY_NODE(){return vn}static set __EMPTY_NODE(e){vn=e}compare(e,t){return gt(e.name,t.name)}isDefinedOn(e){throw s("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return mn.MIN}maxPost(){return new mn(ft,vn)}makePost(e,t){return i("string"==typeof e,"KeyIndex indexValue must always be a string."),new mn(e,vn)}toString(){return".key"}}const wn=new Cn;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bn{constructor(e,t,n,i,s=null){this.isReverse_=i,this.resultGenerator_=s,this.nodeStack_=[];let r=1;for(;!e.isEmpty();)if(r=t?n(e.key,t):1,i&&(r*=-1),r<0)e=this.isReverse_?e.left:e.right;else{if(0===r){this.nodeStack_.push(e);break}this.nodeStack_.push(e),e=this.isReverse_?e.right:e.left}}getNext(){if(0===this.nodeStack_.length)return null;let e,t=this.nodeStack_.pop();if(e=this.resultGenerator_?this.resultGenerator_(t.key,t.value):{key:t.key,value:t.value},this.isReverse_)for(t=t.left;!t.isEmpty();)this.nodeStack_.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack_.push(t),t=t.left;return e}hasNext(){return this.nodeStack_.length>0}peek(){if(0===this.nodeStack_.length)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class In{constructor(e,t,n,i,s){this.key=e,this.value=t,this.color=null!=n?n:In.RED,this.left=null!=i?i:Tn.EMPTY_NODE,this.right=null!=s?s:Tn.EMPTY_NODE}copy(e,t,n,i,s){return new In(null!=e?e:this.key,null!=t?t:this.value,null!=n?n:this.color,null!=i?i:this.left,null!=s?s:this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let i=this;const s=n(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,t,n),null):0===s?i.copy(null,t,null,null,null):i.copy(null,null,null,null,i.right.insert(e,t,n)),i.fixUp_()}removeMin_(){if(this.left.isEmpty())return Tn.EMPTY_NODE;let e=this;return e.left.isRed_()||e.left.left.isRed_()||(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let n,i;if(n=this,t(e,n.key)<0)n.left.isEmpty()||n.left.isRed_()||n.left.left.isRed_()||(n=n.moveRedLeft_()),n=n.copy(null,null,null,n.left.remove(e,t),null);else{if(n.left.isRed_()&&(n=n.rotateRight_()),n.right.isEmpty()||n.right.isRed_()||n.right.left.isRed_()||(n=n.moveRedRight_()),0===t(e,n.key)){if(n.right.isEmpty())return Tn.EMPTY_NODE;i=n.right.min_(),n=n.copy(i.key,i.value,null,null,n.right.removeMin_())}n=n.copy(null,null,null,null,n.right.remove(e,t))}return n.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,In.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,In.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}In.RED=!0,In.BLACK=!1;class Tn{constructor(e,t=Tn.EMPTY_NODE){this.comparator_=e,this.root_=t}insert(e,t){return new Tn(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,In.BLACK,null,null))}remove(e){return new Tn(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,In.BLACK,null,null))}get(e){let t,n=this.root_;for(;!n.isEmpty();){if(t=this.comparator_(e,n.key),0===t)return n.value;t<0?n=n.left:t>0&&(n=n.right)}return null}getPredecessorKey(e){let t,n=this.root_,i=null;for(;!n.isEmpty();){if(t=this.comparator_(e,n.key),0===t){if(n.left.isEmpty())return i?i.key:null;for(n=n.left;!n.right.isEmpty();)n=n.right;return n.key}t<0?n=n.left:t>0&&(i=n,n=n.right)}throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new bn(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new bn(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new bn(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new bn(this.root_,null,this.comparator_,!0,e)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function En(e,t){return gt(e.name,t.name)}function Sn(e,t){return gt(e,t)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let kn;Tn.EMPTY_NODE=new class{copy(e,t,n,i,s){return this}insert(e,t,n){return new In(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}};const Nn=function(e){return"number"==typeof e?"number:"+bt(e):"string:"+e},Pn=function(e){if(e.isLeafNode()){const t=e.val();i("string"==typeof t||"number"==typeof t||"object"==typeof t&&R(t,".sv"),"Priority must be a string or number.")}else i(e===kn||e.isEmpty(),"priority of unexpected type.");i(e===kn||e.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let Rn,xn,Dn;class An{static set __childrenNodeConstructor(e){Rn=e}static get __childrenNodeConstructor(){return Rn}constructor(e,t=An.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=t,this.lazyHash_=null,i(void 0!==this.value_&&null!==this.value_,"LeafNode shouldn't be created with null/undefined value."),Pn(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new An(this.value_,e)}getImmediateChild(e){return".priority"===e?this.priorityNode_:An.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return an(e)?this:".priority"===Xt(e)?this.priorityNode_:An.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return".priority"===e?this.updatePriority(t):t.isEmpty()&&".priority"!==e?this:An.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){const n=Xt(e);return null===n?t:t.isEmpty()&&".priority"!==n?this:(i(".priority"!==n||1===en(e),".priority must be the last token in a path"),this.updateImmediateChild(n,An.__childrenNodeConstructor.EMPTY_NODE.updateChild(tn(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(null===this.lazyHash_){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+Nn(this.priorityNode_.val())+":");const t=typeof this.value_;e+=t+":",e+="number"===t?bt(this.value_):this.value_,this.lazyHash_=st(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===An.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof An.__childrenNodeConstructor?-1:(i(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const t=typeof e.value_,n=typeof this.value_,s=An.VALUE_TYPE_ORDER.indexOf(t),r=An.VALUE_TYPE_ORDER.indexOf(n);return i(s>=0,"Unknown leaf type: "+t),i(r>=0,"Unknown leaf type: "+n),s===r?"object"===n?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-s}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}return!1}}An.VALUE_TYPE_ORDER=["object","boolean","number","string"];const On=new class extends yn{compare(e,t){const n=e.node.getPriority(),i=t.node.getPriority(),s=n.compareTo(i);return 0===s?gt(e.name,t.name):s}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return mn.MIN}maxPost(){return new mn(ft,new An("[PRIORITY-POST]",Dn))}makePost(e,t){const n=xn(e);return new mn(t,new An("[PRIORITY-POST]",n))}toString(){return".priority"}},Mn=Math.log(2);
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ln{constructor(e){var t;this.count=(t=e+1,parseInt(Math.log(t)/Mn,10)),this.current_=this.count-1;const n=(i=this.count,parseInt(Array(i+1).join("1"),2));var i;this.bits_=e+1&n}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const Fn=function(e,t,n,i){e.sort(t);const s=function(t,i){const r=i-t;let o,a;if(0===r)return null;if(1===r)return o=e[t],a=n?n(o):o,new In(a,o.node,In.BLACK,null,null);{const l=parseInt(r/2,10)+t,h=s(t,l),c=s(l+1,i);return o=e[l],a=n?n(o):o,new In(a,o.node,In.BLACK,h,c)}},r=function(t){let i=null,r=null,o=e.length;const a=function(t,i){const r=o-t,a=o;o-=t;const h=s(r+1,a),c=e[r],u=n?n(c):c;l(new In(u,c.node,i,null,h))},l=function(e){i?(i.left=e,i=e):(r=e,i=e)};for(let e=0;e<t.count;++e){const n=t.nextBitIsOne(),i=Math.pow(2,t.count-(e+1));n?a(i,In.BLACK):(a(i,In.BLACK),a(i,In.RED))}return r}(new Ln(e.length));return new Tn(i||t,r)};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let qn;const Wn={};class Un{static get Default(){return i(Wn&&On,"ChildrenNode.ts has not been loaded"),qn=qn||new Un({".priority":Wn},{".priority":On}),qn}constructor(e,t){this.indexes_=e,this.indexSet_=t}get(e){const t=x(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof Tn?t:null}hasIndex(e){return R(this.indexSet_,e.toString())}addIndex(e,t){i(e!==wn,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const n=[];let s=!1;const r=t.getIterator(mn.Wrap);let o,a=r.getNext();for(;a;)s=s||e.isDefinedOn(a.node),n.push(a),a=r.getNext();o=s?Fn(n,e.getCompare()):Wn;const l=e.toString(),h=Object.assign({},this.indexSet_);h[l]=e;const c=Object.assign({},this.indexes_);return c[l]=o,new Un(c,h)}addToIndexes(e,t){const n=A(this.indexes_,(n,s)=>{const r=x(this.indexSet_,s);if(i(r,"Missing index implementation for "+s),n===Wn){if(r.isDefinedOn(e.node)){const n=[],i=t.getIterator(mn.Wrap);let s=i.getNext();for(;s;)s.name!==e.name&&n.push(s),s=i.getNext();return n.push(e),Fn(n,r.getCompare())}return Wn}{const i=t.get(e.name);let s=n;return i&&(s=s.remove(new mn(e.name,i))),s.insert(e,e.node)}});return new Un(n,this.indexSet_)}removeFromIndexes(e,t){const n=A(this.indexes_,n=>{if(n===Wn)return n;{const i=t.get(e.name);return i?n.remove(new mn(e.name,i)):n}});return new Un(n,this.indexSet_)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Hn;class jn{static get EMPTY_NODE(){return Hn||(Hn=new jn(new Tn(Sn),null,Un.Default))}constructor(e,t,n){this.children_=e,this.priorityNode_=t,this.indexMap_=n,this.lazyHash_=null,this.priorityNode_&&Pn(this.priorityNode_),this.children_.isEmpty()&&i(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||Hn}updatePriority(e){return this.children_.isEmpty()?this:new jn(this.children_,e,this.indexMap_)}getImmediateChild(e){if(".priority"===e)return this.getPriority();{const t=this.children_.get(e);return null===t?Hn:t}}getChild(e){const t=Xt(e);return null===t?this:this.getImmediateChild(t).getChild(tn(e))}hasChild(e){return null!==this.children_.get(e)}updateImmediateChild(e,t){if(i(t,"We should always be passing snapshot nodes"),".priority"===e)return this.updatePriority(t);{const n=new mn(e,t);let i,s;t.isEmpty()?(i=this.children_.remove(e),s=this.indexMap_.removeFromIndexes(n,this.children_)):(i=this.children_.insert(e,t),s=this.indexMap_.addToIndexes(n,this.children_));const r=i.isEmpty()?Hn:this.priorityNode_;return new jn(i,r,s)}}updateChild(e,t){const n=Xt(e);if(null===n)return t;{i(".priority"!==Xt(e)||1===en(e),".priority must be the last token in a path");const s=this.getImmediateChild(n).updateChild(tn(e),t);return this.updateImmediateChild(n,s)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const t={};let n=0,i=0,s=!0;if(this.forEachChild(On,(r,o)=>{t[r]=o.val(e),n++,s&&jn.INTEGER_REGEXP_.test(r)?i=Math.max(i,Number(r)):s=!1}),!e&&s&&i<2*n){const e=[];for(const n in t)e[n]=t[n];return e}return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(null===this.lazyHash_){let e="";this.getPriority().isEmpty()||(e+="priority:"+Nn(this.getPriority().val())+":"),this.forEachChild(On,(t,n)=>{const i=n.hash();""!==i&&(e+=":"+t+":"+i)}),this.lazyHash_=""===e?"":st(e)}return this.lazyHash_}getPredecessorChildName(e,t,n){const i=this.resolveIndex_(n);if(i){const n=i.getPredecessorKey(new mn(e,t));return n?n.name:null}return this.children_.getPredecessorKey(e)}getFirstChildName(e){const t=this.resolveIndex_(e);if(t){const e=t.minKey();return e&&e.name}return this.children_.minKey()}getFirstChild(e){const t=this.getFirstChildName(e);return t?new mn(t,this.children_.get(t)):null}getLastChildName(e){const t=this.resolveIndex_(e);if(t){const e=t.maxKey();return e&&e.name}return this.children_.maxKey()}getLastChild(e){const t=this.getLastChildName(e);return t?new mn(t,this.children_.get(t)):null}forEachChild(e,t){const n=this.resolveIndex_(e);return n?n.inorderTraversal(e=>t(e.name,e.node)):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){const n=this.resolveIndex_(t);if(n)return n.getIteratorFrom(e,e=>e);{const n=this.children_.getIteratorFrom(e.name,mn.Wrap);let i=n.peek();for(;null!=i&&t.compare(i,e)<0;)n.getNext(),i=n.peek();return n}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){const n=this.resolveIndex_(t);if(n)return n.getReverseIteratorFrom(e,e=>e);{const n=this.children_.getReverseIteratorFrom(e.name,mn.Wrap);let i=n.peek();for(;null!=i&&t.compare(i,e)>0;)n.getNext(),i=n.peek();return n}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===Bn?-1:0}withIndex(e){if(e===wn||this.indexMap_.hasIndex(e))return this;{const t=this.indexMap_.addIndex(e,this.children_);return new jn(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===wn||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const t=e;if(this.getPriority().equals(t.getPriority())){if(this.children_.count()===t.children_.count()){const e=this.getIterator(On),n=t.getIterator(On);let i=e.getNext(),s=n.getNext();for(;i&&s;){if(i.name!==s.name||!i.node.equals(s.node))return!1;i=e.getNext(),s=n.getNext()}return null===i&&null===s}return!1}return!1}}resolveIndex_(e){return e===wn?null:this.indexMap_.get(e.toString())}}jn.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;const Bn=new class extends jn{constructor(){super(new Tn(Sn),jn.EMPTY_NODE,Un.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return jn.EMPTY_NODE}isEmpty(){return!1}};Object.defineProperties(mn,{MIN:{value:new mn(_t,jn.EMPTY_NODE)},MAX:{value:new mn(ft,Bn)}}),Cn.__EMPTY_NODE=jn.EMPTY_NODE,An.__childrenNodeConstructor=jn,kn=Bn,function(e){Dn=e}(Bn);function zn(e,t=null){if(null===e)return jn.EMPTY_NODE;if("object"==typeof e&&".priority"in e&&(t=e[".priority"]),i(null===t||"string"==typeof t||"number"==typeof t||"object"==typeof t&&".sv"in t,"Invalid priority type found: "+typeof t),"object"==typeof e&&".value"in e&&null!==e[".value"]&&(e=e[".value"]),"object"!=typeof e||".sv"in e){return new An(e,zn(t))}if(e instanceof Array){let n=jn.EMPTY_NODE;return wt(e,(t,i)=>{if(R(e,t)&&"."!==t.substring(0,1)){const e=zn(i);!e.isLeafNode()&&e.isEmpty()||(n=n.updateImmediateChild(t,e))}}),n.updatePriority(zn(t))}{const n=[];let i=!1;if(wt(e,(e,t)=>{if("."!==e.substring(0,1)){const s=zn(t);s.isEmpty()||(i=i||!s.getPriority().isEmpty(),n.push(new mn(e,s)))}}),0===n.length)return jn.EMPTY_NODE;const s=Fn(n,En,e=>e.name,Sn);if(i){const e=Fn(n,On.getCompare());return new jn(s,zn(t),new Un({".priority":e},{".priority":On}))}return new jn(s,zn(t),Un.Default)}}!function(e){xn=e}(zn);
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Vn extends yn{constructor(e){super(),this.indexPath_=e,i(!an(e)&&".priority"!==Xt(e),"Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){const n=this.extractChild(e.node),i=this.extractChild(t.node),s=n.compareTo(i);return 0===s?gt(e.name,t.name):s}makePost(e,t){const n=zn(e),i=jn.EMPTY_NODE.updateChild(this.indexPath_,n);return new mn(t,i)}maxPost(){const e=jn.EMPTY_NODE.updateChild(this.indexPath_,Bn);return new mn(ft,e)}toString(){return sn(this.indexPath_,0).join("/")}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $n=new class extends yn{compare(e,t){const n=e.node.compareTo(t.node);return 0===n?gt(e.name,t.name):n}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return mn.MIN}maxPost(){return mn.MAX}makePost(e,t){const n=zn(e);return new mn(t,n)}toString(){return".value"}};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yn(e){return{type:"value",snapshotNode:e}}function Kn(e,t){return{type:"child_added",snapshotNode:t,childName:e}}function Gn(e,t){return{type:"child_removed",snapshotNode:t,childName:e}}function Qn(e,t,n){return{type:"child_changed",snapshotNode:t,childName:e,oldSnap:n}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Jn{constructor(e){this.index_=e}updateChild(e,t,n,s,r,o){i(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(t);return a.getChild(s).equals(n.getChild(s))&&a.isEmpty()===n.isEmpty()?e:(null!=o&&(n.isEmpty()?e.hasChild(t)?o.trackChildChange(Gn(t,a)):i(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(Kn(t,n)):o.trackChildChange(Qn(t,n,a))),e.isLeafNode()&&n.isEmpty()?e:e.updateImmediateChild(t,n).withIndex(this.index_))}updateFullNode(e,t,n){return null!=n&&(e.isLeafNode()||e.forEachChild(On,(e,i)=>{t.hasChild(e)||n.trackChildChange(Gn(e,i))}),t.isLeafNode()||t.forEachChild(On,(t,i)=>{if(e.hasChild(t)){const s=e.getImmediateChild(t);s.equals(i)||n.trackChildChange(Qn(t,i,s))}else n.trackChildChange(Kn(t,i))})),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?jn.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zn{constructor(e){this.indexedFilter_=new Jn(e.getIndex()),this.index_=e.getIndex(),this.startPost_=Zn.getStartPost_(e),this.endPost_=Zn.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const t=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,n=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return t&&n}updateChild(e,t,n,i,s,r){return this.matches(new mn(t,n))||(n=jn.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,n,i,s,r)}updateFullNode(e,t,n){t.isLeafNode()&&(t=jn.EMPTY_NODE);let i=t.withIndex(this.index_);i=i.updatePriority(jn.EMPTY_NODE);const s=this;return t.forEachChild(On,(e,t)=>{s.matches(new mn(e,t))||(i=i.updateImmediateChild(e,jn.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,i,n)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}return e.getIndex().maxPost()}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xn{constructor(e){this.withinDirectionalStart=e=>this.reverse_?this.withinEndPost(e):this.withinStartPost(e),this.withinDirectionalEnd=e=>this.reverse_?this.withinStartPost(e):this.withinEndPost(e),this.withinStartPost=e=>{const t=this.index_.compare(this.rangedFilter_.getStartPost(),e);return this.startIsInclusive_?t<=0:t<0},this.withinEndPost=e=>{const t=this.index_.compare(e,this.rangedFilter_.getEndPost());return this.endIsInclusive_?t<=0:t<0},this.rangedFilter_=new Zn(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,n,i,s,r){return this.rangedFilter_.matches(new mn(t,n))||(n=jn.EMPTY_NODE),e.getImmediateChild(t).equals(n)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,n,i,s,r):this.fullLimitUpdateChild_(e,t,n,s,r)}updateFullNode(e,t,n){let i;if(t.isLeafNode()||t.isEmpty())i=jn.EMPTY_NODE.withIndex(this.index_);else if(2*this.limit_<t.numChildren()&&t.isIndexed(this.index_)){let e;i=jn.EMPTY_NODE.withIndex(this.index_),e=this.reverse_?t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let n=0;for(;e.hasNext()&&n<this.limit_;){const t=e.getNext();if(this.withinDirectionalStart(t)){if(!this.withinDirectionalEnd(t))break;i=i.updateImmediateChild(t.name,t.node),n++}}}else{let e;i=t.withIndex(this.index_),i=i.updatePriority(jn.EMPTY_NODE),e=this.reverse_?i.getReverseIterator(this.index_):i.getIterator(this.index_);let n=0;for(;e.hasNext();){const t=e.getNext();n<this.limit_&&this.withinDirectionalStart(t)&&this.withinDirectionalEnd(t)?n++:i=i.updateImmediateChild(t.name,jn.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,i,n)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,n,s,r){let o;if(this.reverse_){const e=this.index_.getCompare();o=(t,n)=>e(n,t)}else o=this.index_.getCompare();const a=e;i(a.numChildren()===this.limit_,"");const l=new mn(t,n),h=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),c=this.rangedFilter_.matches(l);if(a.hasChild(t)){const e=a.getImmediateChild(t);let i=s.getChildAfterChild(this.index_,h,this.reverse_);for(;null!=i&&(i.name===t||a.hasChild(i.name));)i=s.getChildAfterChild(this.index_,i,this.reverse_);const u=null==i?1:o(i,l);if(c&&!n.isEmpty()&&u>=0)return null!=r&&r.trackChildChange(Qn(t,n,e)),a.updateImmediateChild(t,n);{null!=r&&r.trackChildChange(Gn(t,e));const n=a.updateImmediateChild(t,jn.EMPTY_NODE);return null!=i&&this.rangedFilter_.matches(i)?(null!=r&&r.trackChildChange(Kn(i.name,i.node)),n.updateImmediateChild(i.name,i.node)):n}}return n.isEmpty()?e:c&&o(h,l)>=0?(null!=r&&(r.trackChildChange(Gn(h.name,h.node)),r.trackChildChange(Kn(t,n))),a.updateImmediateChild(t,n).updateImmediateChild(h.name,jn.EMPTY_NODE)):e}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ei{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=On}hasStart(){return this.startSet_}isViewFromLeft(){return""===this.viewFrom_?this.startSet_:"l"===this.viewFrom_}getIndexStartValue(){return i(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return i(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:_t}hasEnd(){return this.endSet_}getIndexEndValue(){return i(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return i(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:ft}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&""!==this.viewFrom_}getLimit(){return i(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===On}copy(){const e=new ei;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function ti(e){const t={};if(e.isDefault())return t;let n;if(e.index_===On?n="$priority":e.index_===$n?n="$value":e.index_===wn?n="$key":(i(e.index_ instanceof Vn,"Unrecognized index type!"),n=e.index_.toString()),t.orderBy=N(n),e.startSet_){const n=e.startAfterSet_?"startAfter":"startAt";t[n]=N(e.indexStartValue_),e.startNameSet_&&(t[n]+=","+N(e.indexStartName_))}if(e.endSet_){const n=e.endBeforeSet_?"endBefore":"endAt";t[n]=N(e.indexEndValue_),e.endNameSet_&&(t[n]+=","+N(e.indexEndName_))}return e.limitSet_&&(e.isViewFromLeft()?t.limitToFirst=e.limit_:t.limitToLast=e.limit_),t}function ni(e){const t={};if(e.startSet_&&(t.sp=e.indexStartValue_,e.startNameSet_&&(t.sn=e.indexStartName_),t.sin=!e.startAfterSet_),e.endSet_&&(t.ep=e.indexEndValue_,e.endNameSet_&&(t.en=e.indexEndName_),t.ein=!e.endBeforeSet_),e.limitSet_){t.l=e.limit_;let n=e.viewFrom_;""===n&&(n=e.isViewFromLeft()?"l":"r"),t.vf=n}return e.index_!==On&&(t.i=e.index_.toString()),t}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ii extends Kt{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return void 0!==t?"tag$"+t:(i(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,t,n,i){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=n,this.appCheckTokenProvider_=i,this.log_=ht("p:rest:"),this.listens_={}}listen(e,t,n,i){const s=e._path.toString();this.log_("Listen called for "+s+" "+e._queryIdentifier);const r=ii.getListenId_(e,n),o={};this.listens_[r]=o;const a=ti(e._queryParams);this.restRequest_(s+".json",a,(e,t)=>{let a=t;if(404===e&&(a=null,e=null),null===e&&this.onDataUpdate_(s,a,!1,n),x(this.listens_,r)===o){let t;t=e?401===e?"permission_denied":"rest_error:"+e:"ok",i(t,null)}})}unlisten(e,t){const n=ii.getListenId_(e,t);delete this.listens_[n]}get(e){const t=ti(e._queryParams),n=e._path.toString(),i=new y;return this.restRequest_(n+".json",t,(e,t)=>{let s=t;404===e&&(s=null,e=null),null===e?(this.onDataUpdate_(n,s,!1,null),i.resolve(s)):i.reject(new Error(s))}),i.promise}refreshAuthToken(e){}restRequest_(e,t={},n){return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([i,s])=>{i&&i.accessToken&&(t.auth=i.accessToken),s&&s.token&&(t.ac=s.token);const r=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+function(e){const t=[];for(const[n,i]of Object.entries(e))Array.isArray(i)?i.forEach(e=>{t.push(encodeURIComponent(n)+"="+encodeURIComponent(e))}):t.push(encodeURIComponent(n)+"="+encodeURIComponent(i));return t.length?"&"+t.join("&"):""}(t);this.log_("Sending REST request for "+r);const o=new XMLHttpRequest;o.onreadystatechange=()=>{if(n&&4===o.readyState){this.log_("REST Response for "+r+" received. status:",o.status,"response:",o.responseText);let t=null;if(o.status>=200&&o.status<300){try{t=k(o.responseText)}catch(e){dt("Failed to parse JSON response for "+r+": "+o.responseText)}n(null,t)}else 401!==o.status&&404!==o.status&&dt("Got unsuccessful REST response for "+r+" Status: "+o.status),n(o.status);n=null}},o.open("GET",r,!0),o.send()})}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class si{constructor(){this.rootNode_=jn.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ri(){return{value:null,children:new Map}}function oi(e,t,n){if(an(t))e.value=n,e.children.clear();else if(null!==e.value)e.value=e.value.updateChild(t,n);else{const i=Xt(t);e.children.has(i)||e.children.set(i,ri());oi(e.children.get(i),t=tn(t),n)}}function ai(e,t,n){null!==e.value?n(t,e.value):function(e,t){e.children.forEach((e,n)=>{t(n,e)})}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e,(e,i)=>{ai(i,new Jt(t.toString()+"/"+e),n)})}class li{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),t=Object.assign({},e);return this.last_&&wt(this.last_,(e,n)=>{t[e]=t[e]-n}),this.last_=e,t}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hi{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new li(e);const n=1e4+2e4*Math.random();St(this.reportStats_.bind(this),Math.floor(n))}reportStats_(){const e=this.statsListener_.get(),t={};let n=!1;wt(e,(e,i)=>{i>0&&R(this.statsToReport_,e)&&(t[e]=i,n=!0)}),n&&this.server_.reportStats(t),St(this.reportStats_.bind(this),Math.floor(2*Math.random()*3e5))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ci,ui;function di(e){return{fromUser:!1,fromServer:!0,queryId:e,tagged:!0}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(ui=ci||(ci={}))[ui.OVERWRITE=0]="OVERWRITE",ui[ui.MERGE=1]="MERGE",ui[ui.ACK_USER_WRITE=2]="ACK_USER_WRITE",ui[ui.LISTEN_COMPLETE=3]="LISTEN_COMPLETE";class pi{constructor(e,t,n){this.path=e,this.affectedTree=t,this.revert=n,this.type=ci.ACK_USER_WRITE,this.source={fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}operationForChild(e){if(an(this.path)){if(null!=this.affectedTree.value)return i(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const t=this.affectedTree.subtree(new Jt(e));return new pi(Zt(),t,this.revert)}}return i(Xt(this.path)===e,"operationForChild called for unrelated child."),new pi(tn(this.path),this.affectedTree,this.revert)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _i{constructor(e,t){this.source=e,this.path=t,this.type=ci.LISTEN_COMPLETE}operationForChild(e){return an(this.path)?new _i(this.source,Zt()):new _i(this.source,tn(this.path))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fi{constructor(e,t,n){this.source=e,this.path=t,this.snap=n,this.type=ci.OVERWRITE}operationForChild(e){return an(this.path)?new fi(this.source,Zt(),this.snap.getImmediateChild(e)):new fi(this.source,tn(this.path),this.snap)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gi{constructor(e,t,n){this.source=e,this.path=t,this.children=n,this.type=ci.MERGE}operationForChild(e){if(an(this.path)){const t=this.children.subtree(new Jt(e));return t.isEmpty()?null:t.value?new fi(this.source,Zt(),t.value):new gi(this.source,Zt(),t)}return i(Xt(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new gi(this.source,tn(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mi{constructor(e,t,n){this.node_=e,this.fullyInitialized_=t,this.filtered_=n}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(an(e))return this.isFullyInitialized()&&!this.filtered_;const t=Xt(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yi{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function vi(e,t,n,i,r,o){const a=i.filter(e=>e.type===n);a.sort((t,n)=>function(e,t,n){if(null==t.childName||null==n.childName)throw s("Should only compare child_ events.");const i=new mn(t.childName,t.snapshotNode),r=new mn(n.childName,n.snapshotNode);return e.index_.compare(i,r)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e,t,n)),a.forEach(n=>{const i=function(e,t,n){return"value"===t.type||"child_removed"===t.type||(t.prevName=n.getPredecessorChildName(t.childName,t.snapshotNode,e.index_)),t}(e,n,o);r.forEach(s=>{s.respondsTo(n.type)&&t.push(s.createEvent(i,e.query_))})})}function Ci(e,t){return{eventCache:e,serverCache:t}}function wi(e,t,n,i){return Ci(new mi(t,n,i),e.serverCache)}function bi(e,t,n,i){return Ci(e.eventCache,new mi(t,n,i))}function Ii(e){return e.eventCache.isFullyInitialized()?e.eventCache.getNode():null}function Ti(e){return e.serverCache.isFullyInitialized()?e.serverCache.getNode():null}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ei;class Si{static fromObject(e){let t=new Si(null);return wt(e,(e,n)=>{t=t.set(new Jt(e),n)}),t}constructor(e,t=(()=>(Ei||(Ei=new Tn(mt)),Ei))()){this.value=e,this.children=t}isEmpty(){return null===this.value&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(null!=this.value&&t(this.value))return{path:Zt(),value:this.value};if(an(e))return null;{const n=Xt(e),i=this.children.get(n);if(null!==i){const s=i.findRootMostMatchingPathAndValue(tn(e),t);if(null!=s){return{path:on(new Jt(n),s.path),value:s.value}}return null}return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(an(e))return this;{const t=Xt(e),n=this.children.get(t);return null!==n?n.subtree(tn(e)):new Si(null)}}set(e,t){if(an(e))return new Si(t,this.children);{const n=Xt(e),i=(this.children.get(n)||new Si(null)).set(tn(e),t),s=this.children.insert(n,i);return new Si(this.value,s)}}remove(e){if(an(e))return this.children.isEmpty()?new Si(null):new Si(null,this.children);{const t=Xt(e),n=this.children.get(t);if(n){const i=n.remove(tn(e));let s;return s=i.isEmpty()?this.children.remove(t):this.children.insert(t,i),null===this.value&&s.isEmpty()?new Si(null):new Si(this.value,s)}return this}}get(e){if(an(e))return this.value;{const t=Xt(e),n=this.children.get(t);return n?n.get(tn(e)):null}}setTree(e,t){if(an(e))return t;{const n=Xt(e),i=(this.children.get(n)||new Si(null)).setTree(tn(e),t);let s;return s=i.isEmpty()?this.children.remove(n):this.children.insert(n,i),new Si(this.value,s)}}fold(e){return this.fold_(Zt(),e)}fold_(e,t){const n={};return this.children.inorderTraversal((i,s)=>{n[i]=s.fold_(on(e,i),t)}),t(e,this.value,n)}findOnPath(e,t){return this.findOnPath_(e,Zt(),t)}findOnPath_(e,t,n){const i=!!this.value&&n(t,this.value);if(i)return i;if(an(e))return null;{const i=Xt(e),s=this.children.get(i);return s?s.findOnPath_(tn(e),on(t,i),n):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,Zt(),t)}foreachOnPath_(e,t,n){if(an(e))return this;{this.value&&n(t,this.value);const i=Xt(e),s=this.children.get(i);return s?s.foreachOnPath_(tn(e),on(t,i),n):new Si(null)}}foreach(e){this.foreach_(Zt(),e)}foreach_(e,t){this.children.inorderTraversal((n,i)=>{i.foreach_(on(e,n),t)}),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal((t,n)=>{n.value&&e(t,n.value)})}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ki{constructor(e){this.writeTree_=e}static empty(){return new ki(new Si(null))}}function Ni(e,t,n){if(an(t))return new ki(new Si(n));{const i=e.writeTree_.findRootMostValueAndPath(t);if(null!=i){const s=i.path;let r=i.value;const o=ln(s,t);return r=r.updateChild(o,n),new ki(e.writeTree_.set(s,r))}{const i=new Si(n),s=e.writeTree_.setTree(t,i);return new ki(s)}}}function Pi(e,t,n){let i=e;return wt(n,(e,n)=>{i=Ni(i,on(t,e),n)}),i}function Ri(e,t){if(an(t))return ki.empty();{const n=e.writeTree_.setTree(t,new Si(null));return new ki(n)}}function xi(e,t){return null!=Di(e,t)}function Di(e,t){const n=e.writeTree_.findRootMostValueAndPath(t);return null!=n?e.writeTree_.get(n.path).getChild(ln(n.path,t)):null}function Ai(e){const t=[],n=e.writeTree_.value;return null!=n?n.isLeafNode()||n.forEachChild(On,(e,n)=>{t.push(new mn(e,n))}):e.writeTree_.children.inorderTraversal((e,n)=>{null!=n.value&&t.push(new mn(e,n.value))}),t}function Oi(e,t){if(an(t))return e;{const n=Di(e,t);return new ki(null!=n?new Si(n):e.writeTree_.subtree(t))}}function Mi(e){return e.writeTree_.isEmpty()}function Li(e,t){return Fi(Zt(),e.writeTree_,t)}function Fi(e,t,n){if(null!=t.value)return n.updateChild(e,t.value);{let s=null;return t.children.inorderTraversal((t,r)=>{".priority"===t?(i(null!==r.value,"Priority writes must always be leaf nodes"),s=r.value):n=Fi(on(e,t),r,n)}),n.getChild(e).isEmpty()||null===s||(n=n.updateChild(on(e,".priority"),s)),n}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qi(e,t){return Ji(t,e)}function Wi(e,t){const n=e.allWrites.findIndex(e=>e.writeId===t);i(n>=0,"removeWrite called with nonexistent writeId.");const s=e.allWrites[n];e.allWrites.splice(n,1);let r=s.visible,o=!1,a=e.allWrites.length-1;for(;r&&a>=0;){const t=e.allWrites[a];t.visible&&(a>=n&&Ui(t,s.path)?r=!1:cn(s.path,t.path)&&(o=!0)),a--}if(r){if(o)return function(e){e.visibleWrites=ji(e.allWrites,Hi,Zt()),e.allWrites.length>0?e.lastWriteId=e.allWrites[e.allWrites.length-1].writeId:e.lastWriteId=-1}(e),!0;if(s.snap)e.visibleWrites=Ri(e.visibleWrites,s.path);else{wt(s.children,t=>{e.visibleWrites=Ri(e.visibleWrites,on(s.path,t))})}return!0}return!1}function Ui(e,t){if(e.snap)return cn(e.path,t);for(const n in e.children)if(e.children.hasOwnProperty(n)&&cn(on(e.path,n),t))return!0;return!1}function Hi(e){return e.visible}function ji(e,t,n){let i=ki.empty();for(let r=0;r<e.length;++r){const o=e[r];if(t(o)){const e=o.path;let t;if(o.snap)cn(n,e)?(t=ln(n,e),i=Ni(i,t,o.snap)):cn(e,n)&&(t=ln(e,n),i=Ni(i,Zt(),o.snap.getChild(t)));else{if(!o.children)throw s("WriteRecord should have .snap or .children");if(cn(n,e))t=ln(n,e),i=Pi(i,t,o.children);else if(cn(e,n))if(t=ln(e,n),an(t))i=Pi(i,Zt(),o.children);else{const e=x(o.children,Xt(t));if(e){const n=e.getChild(tn(t));i=Ni(i,Zt(),n)}}}}}return i}function Bi(e,t,n,i,s){if(i||s){const r=Oi(e.visibleWrites,t);if(!s&&Mi(r))return n;if(s||null!=n||xi(r,Zt())){const r=function(e){return(e.visible||s)&&(!i||!~i.indexOf(e.writeId))&&(cn(e.path,t)||cn(t,e.path))};return Li(ji(e.allWrites,r,t),n||jn.EMPTY_NODE)}return null}{const i=Di(e.visibleWrites,t);if(null!=i)return i;{const i=Oi(e.visibleWrites,t);if(Mi(i))return n;if(null!=n||xi(i,Zt())){return Li(i,n||jn.EMPTY_NODE)}return null}}}function zi(e,t,n,i){return Bi(e.writeTree,e.treePath,t,n,i)}function Vi(e,t){return function(e,t,n){let i=jn.EMPTY_NODE;const s=Di(e.visibleWrites,t);if(s)return s.isLeafNode()||s.forEachChild(On,(e,t)=>{i=i.updateImmediateChild(e,t)}),i;if(n){const s=Oi(e.visibleWrites,t);return n.forEachChild(On,(e,t)=>{const n=Li(Oi(s,new Jt(e)),t);i=i.updateImmediateChild(e,n)}),Ai(s).forEach(e=>{i=i.updateImmediateChild(e.name,e.node)}),i}return Ai(Oi(e.visibleWrites,t)).forEach(e=>{i=i.updateImmediateChild(e.name,e.node)}),i}(e.writeTree,e.treePath,t)}function $i(e,t,n,s){return function(e,t,n,s,r){i(s||r,"Either existingEventSnap or existingServerSnap must exist");const o=on(t,n);if(xi(e.visibleWrites,o))return null;{const t=Oi(e.visibleWrites,o);return Mi(t)?r.getChild(n):Li(t,r.getChild(n))}}(e.writeTree,e.treePath,t,n,s)}function Yi(e,t){return function(e,t){return Di(e.visibleWrites,t)}(e.writeTree,on(e.treePath,t))}function Ki(e,t,n,i,s,r){return function(e,t,n,i,s,r,o){let a;const l=Oi(e.visibleWrites,t),h=Di(l,Zt());if(null!=h)a=h;else{if(null==n)return[];a=Li(l,n)}if(a=a.withIndex(o),a.isEmpty()||a.isLeafNode())return[];{const e=[],t=o.getCompare(),n=r?a.getReverseIteratorFrom(i,o):a.getIteratorFrom(i,o);let l=n.getNext();for(;l&&e.length<s;)0!==t(l,i)&&e.push(l),l=n.getNext();return e}}(e.writeTree,e.treePath,t,n,i,s,r)}function Gi(e,t,n){return function(e,t,n,i){const s=on(t,n),r=Di(e.visibleWrites,s);if(null!=r)return r;if(i.isCompleteForChild(n))return Li(Oi(e.visibleWrites,s),i.getNode().getImmediateChild(n));return null}(e.writeTree,e.treePath,t,n)}function Qi(e,t){return Ji(on(e.treePath,t),e.writeTree)}function Ji(e,t){return{treePath:e,writeTree:t}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zi{constructor(){this.changeMap=new Map}trackChildChange(e){const t=e.type,n=e.childName;i("child_added"===t||"child_changed"===t||"child_removed"===t,"Only child changes supported for tracking"),i(".priority"!==n,"Only non-priority child changes can be tracked.");const r=this.changeMap.get(n);if(r){const i=r.type;if("child_added"===t&&"child_removed"===i)this.changeMap.set(n,Qn(n,e.snapshotNode,r.snapshotNode));else if("child_removed"===t&&"child_added"===i)this.changeMap.delete(n);else if("child_removed"===t&&"child_changed"===i)this.changeMap.set(n,Gn(n,r.oldSnap));else if("child_changed"===t&&"child_added"===i)this.changeMap.set(n,Kn(n,e.snapshotNode));else{if("child_changed"!==t||"child_changed"!==i)throw s("Illegal combination of changes: "+e+" occurred after "+r);this.changeMap.set(n,Qn(n,e.snapshotNode,r.oldSnap))}}else this.changeMap.set(n,e)}getChanges(){return Array.from(this.changeMap.values())}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xi=new class{getCompleteChild(e){return null}getChildAfterChild(e,t,n){return null}};class es{constructor(e,t,n=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=n}getCompleteChild(e){const t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{const t=null!=this.optCompleteServerCache_?new mi(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return Gi(this.writes_,e,t)}}getChildAfterChild(e,t,n){const i=null!=this.optCompleteServerCache_?this.optCompleteServerCache_:Ti(this.viewCache_),s=Ki(this.writes_,i,t,1,n,e);return 0===s.length?null:s[0]}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ts(e,t,n,r,o){const a=new Zi;let l,h;if(n.type===ci.OVERWRITE){const s=n;s.source.fromUser?l=ss(e,t,s.path,s.snap,r,o,a):(i(s.source.fromServer,"Unknown source."),h=s.source.tagged||t.serverCache.isFiltered()&&!an(s.path),l=is(e,t,s.path,s.snap,r,o,h,a))}else if(n.type===ci.MERGE){const s=n;s.source.fromUser?l=function(e,t,n,i,s,r,o){let a=t;return i.foreach((i,l)=>{const h=on(n,i);rs(t,Xt(h))&&(a=ss(e,a,h,l,s,r,o))}),i.foreach((i,l)=>{const h=on(n,i);rs(t,Xt(h))||(a=ss(e,a,h,l,s,r,o))}),a}(e,t,s.path,s.children,r,o,a):(i(s.source.fromServer,"Unknown source."),h=s.source.tagged||t.serverCache.isFiltered(),l=as(e,t,s.path,s.children,r,o,h,a))}else if(n.type===ci.ACK_USER_WRITE){const s=n;l=s.revert?function(e,t,n,s,r,o){let a;if(null!=Yi(s,n))return t;{const l=new es(s,t,r),h=t.eventCache.getNode();let c;if(an(n)||".priority"===Xt(n)){let n;if(t.serverCache.isFullyInitialized())n=zi(s,Ti(t));else{const e=t.serverCache.getNode();i(e instanceof jn,"serverChildren would be complete if leaf node"),n=Vi(s,e)}c=e.filter.updateFullNode(h,n,o)}else{const i=Xt(n);let r=Gi(s,i,t.serverCache);null==r&&t.serverCache.isCompleteForChild(i)&&(r=h.getImmediateChild(i)),c=null!=r?e.filter.updateChild(h,i,r,tn(n),l,o):t.eventCache.getNode().hasChild(i)?e.filter.updateChild(h,i,jn.EMPTY_NODE,tn(n),l,o):h,c.isEmpty()&&t.serverCache.isFullyInitialized()&&(a=zi(s,Ti(t)),a.isLeafNode()&&(c=e.filter.updateFullNode(c,a,o)))}return a=t.serverCache.isFullyInitialized()||null!=Yi(s,Zt()),wi(t,c,a,e.filter.filtersNodes())}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e,t,s.path,r,o,a):function(e,t,n,i,s,r,o){if(null!=Yi(s,n))return t;const a=t.serverCache.isFiltered(),l=t.serverCache;if(null!=i.value){if(an(n)&&l.isFullyInitialized()||l.isCompleteForPath(n))return is(e,t,n,l.getNode().getChild(n),s,r,a,o);if(an(n)){let i=new Si(null);return l.getNode().forEachChild(wn,(e,t)=>{i=i.set(new Jt(e),t)}),as(e,t,n,i,s,r,a,o)}return t}{let h=new Si(null);return i.foreach((e,t)=>{const i=on(n,e);l.isCompleteForPath(i)&&(h=h.set(e,l.getNode().getChild(i)))}),as(e,t,n,h,s,r,a,o)}}(e,t,s.path,s.affectedTree,r,o,a)}else{if(n.type!==ci.LISTEN_COMPLETE)throw s("Unknown operation type: "+n.type);l=function(e,t,n,i,s){const r=t.serverCache,o=bi(t,r.getNode(),r.isFullyInitialized()||an(n),r.isFiltered());return ns(e,o,n,i,Xi,s)}(e,t,n.path,r,a)}const c=a.getChanges();return function(e,t,n){const i=t.eventCache;if(i.isFullyInitialized()){const s=i.getNode().isLeafNode()||i.getNode().isEmpty(),r=Ii(e);(n.length>0||!e.eventCache.isFullyInitialized()||s&&!i.getNode().equals(r)||!i.getNode().getPriority().equals(r.getPriority()))&&n.push(Yn(Ii(t)))}}(t,l,c),{viewCache:l,changes:c}}function ns(e,t,n,s,r,o){const a=t.eventCache;if(null!=Yi(s,n))return t;{let l,h;if(an(n))if(i(t.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),t.serverCache.isFiltered()){const n=Ti(t),i=Vi(s,n instanceof jn?n:jn.EMPTY_NODE);l=e.filter.updateFullNode(t.eventCache.getNode(),i,o)}else{const n=zi(s,Ti(t));l=e.filter.updateFullNode(t.eventCache.getNode(),n,o)}else{const c=Xt(n);if(".priority"===c){i(1===en(n),"Can't have a priority with additional path components");const r=a.getNode();h=t.serverCache.getNode();const o=$i(s,n,r,h);l=null!=o?e.filter.updatePriority(r,o):a.getNode()}else{const i=tn(n);let u;if(a.isCompleteForChild(c)){h=t.serverCache.getNode();const e=$i(s,n,a.getNode(),h);u=null!=e?a.getNode().getImmediateChild(c).updateChild(i,e):a.getNode().getImmediateChild(c)}else u=Gi(s,c,t.serverCache);l=null!=u?e.filter.updateChild(a.getNode(),c,u,i,r,o):a.getNode()}}return wi(t,l,a.isFullyInitialized()||an(n),e.filter.filtersNodes())}}function is(e,t,n,i,s,r,o,a){const l=t.serverCache;let h;const c=o?e.filter:e.filter.getIndexedFilter();if(an(n))h=c.updateFullNode(l.getNode(),i,null);else if(c.filtersNodes()&&!l.isFiltered()){const e=l.getNode().updateChild(n,i);h=c.updateFullNode(l.getNode(),e,null)}else{const e=Xt(n);if(!l.isCompleteForPath(n)&&en(n)>1)return t;const s=tn(n),r=l.getNode().getImmediateChild(e).updateChild(s,i);h=".priority"===e?c.updatePriority(l.getNode(),r):c.updateChild(l.getNode(),e,r,s,Xi,null)}const u=bi(t,h,l.isFullyInitialized()||an(n),c.filtersNodes());return ns(e,u,n,s,new es(s,u,r),a)}function ss(e,t,n,i,s,r,o){const a=t.eventCache;let l,h;const c=new es(s,t,r);if(an(n))h=e.filter.updateFullNode(t.eventCache.getNode(),i,o),l=wi(t,h,!0,e.filter.filtersNodes());else{const s=Xt(n);if(".priority"===s)h=e.filter.updatePriority(t.eventCache.getNode(),i),l=wi(t,h,a.isFullyInitialized(),a.isFiltered());else{const r=tn(n),h=a.getNode().getImmediateChild(s);let u;if(an(r))u=i;else{const e=c.getCompleteChild(s);u=null!=e?".priority"===nn(r)&&e.getChild(rn(r)).isEmpty()?e:e.updateChild(r,i):jn.EMPTY_NODE}if(h.equals(u))l=t;else{l=wi(t,e.filter.updateChild(a.getNode(),s,u,r,c,o),a.isFullyInitialized(),e.filter.filtersNodes())}}}return l}function rs(e,t){return e.eventCache.isCompleteForChild(t)}function os(e,t,n){return n.foreach((e,n)=>{t=t.updateChild(e,n)}),t}function as(e,t,n,i,s,r,o,a){if(t.serverCache.getNode().isEmpty()&&!t.serverCache.isFullyInitialized())return t;let l,h=t;l=an(n)?i:new Si(null).setTree(n,i);const c=t.serverCache.getNode();return l.children.inorderTraversal((n,i)=>{if(c.hasChild(n)){const l=os(0,t.serverCache.getNode().getImmediateChild(n),i);h=is(e,h,new Jt(n),l,s,r,o,a)}}),l.children.inorderTraversal((n,i)=>{const l=!t.serverCache.isCompleteForChild(n)&&null===i.value;if(!c.hasChild(n)&&!l){const l=os(0,t.serverCache.getNode().getImmediateChild(n),i);h=is(e,h,new Jt(n),l,s,r,o,a)}}),h}class ls{constructor(e,t){this.query_=e,this.eventRegistrations_=[];const n=this.query_._queryParams,i=new Jn(n.getIndex()),s=(r=n).loadsAllData()?new Jn(r.getIndex()):r.hasLimit()?new Xn(r):new Zn(r);var r;this.processor_=function(e){return{filter:e}}(s);const o=t.serverCache,a=t.eventCache,l=i.updateFullNode(jn.EMPTY_NODE,o.getNode(),null),h=s.updateFullNode(jn.EMPTY_NODE,a.getNode(),null),c=new mi(l,o.isFullyInitialized(),i.filtersNodes()),u=new mi(h,a.isFullyInitialized(),s.filtersNodes());this.viewCache_=Ci(u,c),this.eventGenerator_=new yi(this.query_)}get query(){return this.query_}}function hs(e,t){const n=Ti(e.viewCache_);return n&&(e.query._queryParams.loadsAllData()||!an(t)&&!n.getImmediateChild(Xt(t)).isEmpty())?n.getChild(t):null}function cs(e){return 0===e.eventRegistrations_.length}function us(e,t,n){const s=[];if(n){i(null==t,"A cancel should cancel all event registrations.");const r=e.query._path;e.eventRegistrations_.forEach(e=>{const t=e.createCancelEvent(n,r);t&&s.push(t)})}if(t){let n=[];for(let i=0;i<e.eventRegistrations_.length;++i){const s=e.eventRegistrations_[i];if(s.matches(t)){if(t.hasAnyCallback()){n=n.concat(e.eventRegistrations_.slice(i+1));break}}else n.push(s)}e.eventRegistrations_=n}else e.eventRegistrations_=[];return s}function ds(e,t,n,s){t.type===ci.MERGE&&null!==t.source.queryId&&(i(Ti(e.viewCache_),"We should always have a full cache before handling merges"),i(Ii(e.viewCache_),"Missing event cache, even though we have a server cache"));const r=e.viewCache_,o=ts(e.processor_,r,t,n,s);var a,l;return a=e.processor_,l=o.viewCache,i(l.eventCache.getNode().isIndexed(a.filter.getIndex()),"Event snap not indexed"),i(l.serverCache.getNode().isIndexed(a.filter.getIndex()),"Server snap not indexed"),i(o.viewCache.serverCache.isFullyInitialized()||!r.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),e.viewCache_=o.viewCache,ps(e,o.changes,o.viewCache.eventCache.getNode(),null)}function ps(e,t,n,i){const s=i?[i]:e.eventRegistrations_;return function(e,t,n,i){const s=[],r=[];return t.forEach(t=>{var n;"child_changed"===t.type&&e.index_.indexedValueChanged(t.oldSnap,t.snapshotNode)&&r.push((n=t.childName,{type:"child_moved",snapshotNode:t.snapshotNode,childName:n}))}),vi(e,s,"child_removed",t,i,n),vi(e,s,"child_added",t,i,n),vi(e,s,"child_moved",r,i,n),vi(e,s,"child_changed",t,i,n),vi(e,s,"value",t,i,n),s}(e.eventGenerator_,t,n,s)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let _s,fs;class gs{constructor(){this.views=new Map}}function ms(e,t,n,s){const r=t.source.queryId;if(null!==r){const o=e.views.get(r);return i(null!=o,"SyncTree gave us an op for an invalid query."),ds(o,t,n,s)}{let i=[];for(const r of e.views.values())i=i.concat(ds(r,t,n,s));return i}}function ys(e,t,n,i,s,r){const o=function(e,t,n,i,s){const r=t._queryIdentifier,o=e.views.get(r);if(!o){let e=zi(n,s?i:null),r=!1;e?r=!0:i instanceof jn?(e=Vi(n,i),r=!1):(e=jn.EMPTY_NODE,r=!1);const o=Ci(new mi(e,r,!1),new mi(i,s,!1));return new ls(t,o)}return o}(e,t,i,s,r);return e.views.has(t._queryIdentifier)||e.views.set(t._queryIdentifier,o),function(e,t){e.eventRegistrations_.push(t)}(o,n),function(e,t){const n=e.viewCache_.eventCache,i=[];n.getNode().isLeafNode()||n.getNode().forEachChild(On,(e,t)=>{i.push(Kn(e,t))});return n.isFullyInitialized()&&i.push(Yn(n.getNode())),ps(e,i,n.getNode(),t)}(o,n)}function vs(e,t,n,s){const r=t._queryIdentifier,o=[];let a=[];const l=Ts(e);if("default"===r)for(const[i,h]of e.views.entries())a=a.concat(us(h,n,s)),cs(h)&&(e.views.delete(i),h.query._queryParams.loadsAllData()||o.push(h.query));else{const t=e.views.get(r);t&&(a=a.concat(us(t,n,s)),cs(t)&&(e.views.delete(r),t.query._queryParams.loadsAllData()||o.push(t.query)))}return l&&!Ts(e)&&o.push(new(i(_s,"Reference.ts has not been loaded"),_s)(t._repo,t._path)),{removed:o,events:a}}function Cs(e){const t=[];for(const n of e.views.values())n.query._queryParams.loadsAllData()||t.push(n);return t}function ws(e,t){let n=null;for(const i of e.views.values())n=n||hs(i,t);return n}function bs(e,t){if(t._queryParams.loadsAllData())return Es(e);{const n=t._queryIdentifier;return e.views.get(n)}}function Is(e,t){return null!=bs(e,t)}function Ts(e){return null!=Es(e)}function Es(e){for(const t of e.views.values())if(t.query._queryParams.loadsAllData())return t;return null}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ss=1;class ks{constructor(e){this.listenProvider_=e,this.syncPointTree_=new Si(null),this.pendingWriteTree_={visibleWrites:ki.empty(),allWrites:[],lastWriteId:-1},this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Ns(e,t,n,s,r){return function(e,t,n,s,r){i(s>e.lastWriteId,"Stacking an older write on top of newer ones"),void 0===r&&(r=!0),e.allWrites.push({path:t,snap:n,writeId:s,visible:r}),r&&(e.visibleWrites=Ni(e.visibleWrites,t,n)),e.lastWriteId=s}(e.pendingWriteTree_,t,n,s,r),r?Os(e,new fi({fromUser:!0,fromServer:!1,queryId:null,tagged:!1},t,n)):[]}function Ps(e,t,n=!1){const i=function(e,t){for(let n=0;n<e.allWrites.length;n++){const i=e.allWrites[n];if(i.writeId===t)return i}return null}(e.pendingWriteTree_,t);if(Wi(e.pendingWriteTree_,t)){let t=new Si(null);return null!=i.snap?t=t.set(Zt(),!0):wt(i.children,e=>{t=t.set(new Jt(e),!0)}),Os(e,new pi(i.path,t,n))}return[]}function Rs(e,t,n){return Os(e,new fi({fromUser:!1,fromServer:!0,queryId:null,tagged:!1},t,n))}function xs(e,t,n,i,s=!1){const r=t._path,o=e.syncPointTree_.get(r);let a=[];if(o&&("default"===t._queryIdentifier||Is(o,t))){const l=vs(o,t,n,i);0===o.views.size&&(e.syncPointTree_=e.syncPointTree_.remove(r));const h=l.removed;if(a=l.events,!s){const n=-1!==h.findIndex(e=>e._queryParams.loadsAllData()),s=e.syncPointTree_.findOnPath(r,(e,t)=>Ts(t));if(n&&!s){const t=e.syncPointTree_.subtree(r);if(!t.isEmpty()){const n=function(e){return e.fold((e,t,n)=>{if(t&&Ts(t)){return[Es(t)]}{let e=[];return t&&(e=Cs(t)),wt(n,(t,n)=>{e=e.concat(n)}),e}})}(t);for(let t=0;t<n.length;++t){const i=n[t],s=i.query,r=Fs(e,i);e.listenProvider_.startListening(Bs(s),qs(e,s),r.hashFn,r.onComplete)}}}if(!s&&h.length>0&&!i)if(n){const n=null;e.listenProvider_.stopListening(Bs(t),n)}else h.forEach(t=>{const n=e.queryToTagMap.get(Ws(t));e.listenProvider_.stopListening(Bs(t),n)})}!function(e,t){for(let n=0;n<t.length;++n){const i=t[n];if(!i._queryParams.loadsAllData()){const t=Ws(i),n=e.queryToTagMap.get(t);e.queryToTagMap.delete(t),e.tagToQueryMap.delete(n)}}}(e,h)}return a}function Ds(e,t,n,s=!1){const r=t._path;let o=null,a=!1;e.syncPointTree_.foreachOnPath(r,(e,t)=>{const n=ln(e,r);o=o||ws(t,n),a=a||Ts(t)});let l,h=e.syncPointTree_.get(r);if(h?(a=a||Ts(h),o=o||ws(h,Zt())):(h=new gs,e.syncPointTree_=e.syncPointTree_.set(r,h)),null!=o)l=!0;else{l=!1,o=jn.EMPTY_NODE;e.syncPointTree_.subtree(r).foreachChild((e,t)=>{const n=ws(t,Zt());n&&(o=o.updateImmediateChild(e,n))})}const c=Is(h,t);if(!c&&!t._queryParams.loadsAllData()){const n=Ws(t);i(!e.queryToTagMap.has(n),"View does not exist, but we have a tag");const s=Ss++;e.queryToTagMap.set(n,s),e.tagToQueryMap.set(s,n)}let u=ys(h,t,n,qi(e.pendingWriteTree_,r),o,l);if(!c&&!a&&!s){const n=bs(h,t);u=u.concat(function(e,t,n){const s=t._path,r=qs(e,t),o=Fs(e,n),a=e.listenProvider_.startListening(Bs(t),r,o.hashFn,o.onComplete),l=e.syncPointTree_.subtree(s);if(r)i(!Ts(l.value),"If we're adding a query, it shouldn't be shadowed");else{const t=l.fold((e,t,n)=>{if(!an(e)&&t&&Ts(t))return[Es(t).query];{let e=[];return t&&(e=e.concat(Cs(t).map(e=>e.query))),wt(n,(t,n)=>{e=e.concat(n)}),e}});for(let n=0;n<t.length;++n){const i=t[n];e.listenProvider_.stopListening(Bs(i),qs(e,i))}}return a}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e,t,n))}return u}function As(e,t,n){const i=e.pendingWriteTree_,s=e.syncPointTree_.findOnPath(t,(e,n)=>{const i=ws(n,ln(e,t));if(i)return i});return Bi(i,t,s,n,!0)}function Os(e,t){return Ms(t,e.syncPointTree_,null,qi(e.pendingWriteTree_,Zt()))}function Ms(e,t,n,i){if(an(e.path))return Ls(e,t,n,i);{const s=t.get(Zt());null==n&&null!=s&&(n=ws(s,Zt()));let r=[];const o=Xt(e.path),a=e.operationForChild(o),l=t.children.get(o);if(l&&a){const e=n?n.getImmediateChild(o):null,t=Qi(i,o);r=r.concat(Ms(a,l,e,t))}return s&&(r=r.concat(ms(s,e,i,n))),r}}function Ls(e,t,n,i){const s=t.get(Zt());null==n&&null!=s&&(n=ws(s,Zt()));let r=[];return t.children.inorderTraversal((t,s)=>{const o=n?n.getImmediateChild(t):null,a=Qi(i,t),l=e.operationForChild(t);l&&(r=r.concat(Ls(l,s,o,a)))}),s&&(r=r.concat(ms(s,e,i,n))),r}function Fs(e,t){const n=t.query,i=qs(e,n);return{hashFn:()=>{const e=function(e){return e.viewCache_.serverCache.getNode()}(t)||jn.EMPTY_NODE;return e.hash()},onComplete:t=>{if("ok"===t)return i?function(e,t,n){const i=Us(e,n);if(i){const n=Hs(i),s=n.path,r=n.queryId,o=ln(s,t);return js(e,s,new _i(di(r),o))}return[]}(e,n._path,i):function(e,t){return Os(e,new _i({fromUser:!1,fromServer:!0,queryId:null,tagged:!1},t))}(e,n._path);{const i=function(e,t){let n="Unknown Error";"too_big"===e?n="The data requested exceeds the maximum size that can be accessed with a single request.":"permission_denied"===e?n="Client doesn't have permission to access the desired data.":"unavailable"===e&&(n="The service is unavailable");const i=new Error(e+" at "+t._path.toString()+": "+n);return i.code=e.toUpperCase(),i}(t,n);return xs(e,n,null,i)}}}}function qs(e,t){const n=Ws(t);return e.queryToTagMap.get(n)}function Ws(e){return e._path.toString()+"$"+e._queryIdentifier}function Us(e,t){return e.tagToQueryMap.get(t)}function Hs(e){const t=e.indexOf("$");return i(-1!==t&&t<e.length-1,"Bad queryKey."),{queryId:e.substr(t+1),path:new Jt(e.substr(0,t))}}function js(e,t,n){const s=e.syncPointTree_.get(t);i(s,"Missing sync point for query tag that we're tracking");return ms(s,n,qi(e.pendingWriteTree_,t),null)}function Bs(e){return e._queryParams.loadsAllData()&&!e._queryParams.isDefault()?new(i(fs,"Reference.ts has not been loaded"),fs)(e._repo,e._path):e}class zs{constructor(e){this.node_=e}getImmediateChild(e){const t=this.node_.getImmediateChild(e);return new zs(t)}node(){return this.node_}}class Vs{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){const t=on(this.path_,e);return new Vs(this.syncTree_,t)}node(){return As(this.syncTree_,this.path_)}}const $s=function(e,t,n){return e&&"object"==typeof e?(i(".sv"in e,"Unexpected leaf node or priority contents"),"string"==typeof e[".sv"]?Ys(e[".sv"],t,n):"object"==typeof e[".sv"]?Ks(e[".sv"],t):void i(!1,"Unexpected server value: "+JSON.stringify(e,null,2))):e},Ys=function(e,t,n){if("timestamp"===e)return n.timestamp;i(!1,"Unexpected server value: "+e)},Ks=function(e,t,n){e.hasOwnProperty("increment")||i(!1,"Unexpected server value: "+JSON.stringify(e,null,2));const s=e.increment;"number"!=typeof s&&i(!1,"Unexpected increment value: "+s);const r=t.node();if(i(null!=r,"Expected ChildrenNode.EMPTY_NODE for nulls"),!r.isLeafNode())return s;const o=r.getValue();return"number"!=typeof o?s:o+s},Gs=function(e,t,n){return Qs(e,new zs(t),n)};function Qs(e,t,n){const i=e.getPriority().val(),s=$s(i,t.getImmediateChild(".priority"),n);let r;if(e.isLeafNode()){const i=e,r=$s(i.getValue(),t,n);return r!==i.getValue()||s!==i.getPriority().val()?new An(r,zn(s)):e}{const i=e;return r=i,s!==i.getPriority().val()&&(r=r.updatePriority(new An(s))),i.forEachChild(On,(e,i)=>{const s=Qs(i,t.getImmediateChild(e),n);s!==i&&(r=r.updateImmediateChild(e,s))}),r}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Js{constructor(e="",t=null,n={children:{},childCount:0}){this.name=e,this.parent=t,this.node=n}}function Zs(e,t){let n=t instanceof Jt?t:new Jt(t),i=e,s=Xt(n);for(;null!==s;){const e=x(i.node.children,s)||{children:{},childCount:0};i=new Js(s,i,e),n=tn(n),s=Xt(n)}return i}function Xs(e){return e.node.value}function er(e,t){e.node.value=t,rr(e)}function tr(e){return e.node.childCount>0}function nr(e,t){wt(e.node.children,(n,i)=>{t(new Js(n,e,i))})}function ir(e,t,n,i){n&&t(e),nr(e,e=>{ir(e,t,!0)})}function sr(e){return new Jt(null===e.parent?e.name:sr(e.parent)+"/"+e.name)}function rr(e){null!==e.parent&&function(e,t,n){const i=function(e){return void 0===Xs(e)&&!tr(e)}(n),s=R(e.node.children,t);i&&s?(delete e.node.children[t],e.node.childCount--,rr(e)):i||s||(e.node.children[t]=n.node,e.node.childCount++,rr(e))}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e.parent,e.name,e)}const or=/[\[\].#$\/\u0000-\u001F\u007F]/,ar=/[\[\].#$\u0000-\u001F\u007F]/,lr=10485760,hr=function(e){return"string"==typeof e&&0!==e.length&&!or.test(e)},cr=function(e){return"string"==typeof e&&0!==e.length&&!ar.test(e)},ur=function(e,t,n,i){i&&void 0===t||dr(F(e,"value"),t,n)},dr=function(e,t,n){const i=n instanceof Jt?new un(n,e):n;if(void 0===t)throw new Error(e+"contains undefined "+pn(i));if("function"==typeof t)throw new Error(e+"contains a function "+pn(i)+" with contents = "+t.toString());if(pt(t))throw new Error(e+"contains "+t.toString()+" "+pn(i));if("string"==typeof t&&t.length>lr/3&&q(t)>lr)throw new Error(e+"contains a string greater than "+lr+" utf8 bytes "+pn(i)+" ('"+t.substring(0,50)+"...')");if(t&&"object"==typeof t){let n=!1,s=!1;if(wt(t,(t,r)=>{if(".value"===t)n=!0;else if(".priority"!==t&&".sv"!==t&&(s=!0,!hr(t)))throw new Error(e+" contains an invalid key ("+t+") "+pn(i)+'.  Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');var o,a;a=t,(o=i).parts_.length>0&&(o.byteLength_+=1),o.parts_.push(a),o.byteLength_+=q(a),dn(o),dr(e,r,i),function(e){const t=e.parts_.pop();e.byteLength_-=q(t),e.parts_.length>0&&(e.byteLength_-=1)}(i)}),n&&s)throw new Error(e+' contains ".value" child '+pn(i)+" in addition to actual children.")}},pr=function(e,t,n,i){if(!cr(n))throw new Error(F(e,t)+'was an invalid path = "'+n+'". Paths must be non-empty strings and can\'t contain ".", "#", "$", "[", or "]"')},_r=function(e,t){if(".info"===Xt(t))throw new Error(e+" failed = Can't modify data under /.info/")},fr=function(e,t){const n=t.path.toString();if("string"!=typeof t.repoInfo.host||0===t.repoInfo.host.length||!hr(t.repoInfo.namespace)&&"localhost"!==t.repoInfo.host.split(":")[0]||0!==n.length&&!function(e){return e&&(e=e.replace(/^\/*\.info(\/|$)/,"/")),cr(e)}(n))throw new Error(F(e,"url")+'must be a valid firebase URL and the path can\'t contain ".", "#", "$", "[", or "]".')};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class gr{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function mr(e,t){let n=null;for(let i=0;i<t.length;i++){const s=t[i],r=s.getPath();null===n||hn(r,n.path)||(e.eventLists_.push(n),n=null),null===n&&(n={events:[],path:r}),n.events.push(s)}n&&e.eventLists_.push(n)}function yr(e,t,n){mr(e,n),Cr(e,e=>hn(e,t))}function vr(e,t,n){mr(e,n),Cr(e,e=>cn(e,t)||cn(t,e))}function Cr(e,t){e.recursionDepth_++;let n=!0;for(let i=0;i<e.eventLists_.length;i++){const s=e.eventLists_[i];if(s){t(s.path)?(wr(e.eventLists_[i]),e.eventLists_[i]=null):n=!1}}n&&(e.eventLists_=[]),e.recursionDepth_--}function wr(e){for(let t=0;t<e.events.length;t++){const n=e.events[t];if(null!==n){e.events[t]=null;const i=n.getEventRunner();ot&&lt("event: "+n.toString()),Et(i)}}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class br{constructor(e,t,n,i){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=n,this.appCheckProvider_=i,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new gr,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=ri(),this.transactionQueueTree_=new Js,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function Ir(e,t,n){if(e.stats_=Wt(e.repoInfo_),e.forceRestClient_||("object"==typeof window&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0)e.server_=new ii(e.repoInfo_,(t,n,i,s)=>{Sr(e,t,n,i,s)},e.authTokenProvider_,e.appCheckProvider_),setTimeout(()=>kr(e,!0),0);else{if(null!=n){if("object"!=typeof n)throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{N(n)}catch(i){throw new Error("Invalid authOverride provided: "+i)}}e.persistentConnection_=new gn(e.repoInfo_,t,(t,n,i,s)=>{Sr(e,t,n,i,s)},t=>{kr(e,t)},t=>{!function(e,t){wt(t,(t,n)=>{Nr(e,t,n)})}(e,t)},e.authTokenProvider_,e.appCheckProvider_,n),e.server_=e.persistentConnection_}e.authTokenProvider_.addTokenChangeListener(t=>{e.server_.refreshAuthToken(t)}),e.appCheckProvider_.addTokenChangeListener(t=>{e.server_.refreshAppCheckToken(t.token)}),e.statsReporter_=function(e,t){const n=e.toString();return qt[n]||(qt[n]=t()),qt[n]}(e.repoInfo_,()=>new hi(e.stats_,e.server_)),e.infoData_=new si,e.infoSyncTree_=new ks({startListening:(t,n,i,s)=>{let r=[];const o=e.infoData_.getNode(t._path);return o.isEmpty()||(r=Rs(e.infoSyncTree_,t._path,o),setTimeout(()=>{s("ok")},0)),r},stopListening:()=>{}}),Nr(e,"connected",!1),e.serverSyncTree_=new ks({startListening:(t,n,i,s)=>(e.server_.listen(t,i,n,(n,i)=>{const r=s(n,i);vr(e.eventQueue_,t._path,r)}),[]),stopListening:(t,n)=>{e.server_.unlisten(t,n)}})}function Tr(e){const t=e.infoData_.getNode(new Jt(".info/serverTimeOffset")).val()||0;return(new Date).getTime()+t}function Er(e){return(t=(t={timestamp:Tr(e)})||{}).timestamp=t.timestamp||(new Date).getTime(),t;var t}function Sr(e,t,n,i,s){e.dataUpdateCount++;const r=new Jt(t);n=e.interceptServerDataCallback_?e.interceptServerDataCallback_(t,n):n;let o=[];if(s)if(i){const t=A(n,e=>zn(e));o=function(e,t,n,i){const s=Us(e,i);if(s){const i=Hs(s),r=i.path,o=i.queryId,a=ln(r,t),l=Si.fromObject(n);return js(e,r,new gi(di(o),a,l))}return[]}(e.serverSyncTree_,r,t,s)}else{const t=zn(n);o=function(e,t,n,i){const s=Us(e,i);if(null!=s){const i=Hs(s),r=i.path,o=i.queryId,a=ln(r,t);return js(e,r,new fi(di(o),a,n))}return[]}(e.serverSyncTree_,r,t,s)}else if(i){const t=A(n,e=>zn(e));o=function(e,t,n){const i=Si.fromObject(n);return Os(e,new gi({fromUser:!1,fromServer:!0,queryId:null,tagged:!1},t,i))}(e.serverSyncTree_,r,t)}else{const t=zn(n);o=Rs(e.serverSyncTree_,r,t)}let a=r;o.length>0&&(a=Mr(e,r)),vr(e.eventQueue_,a,o)}function kr(e,t){Nr(e,"connected",t),!1===t&&function(e){xr(e,"onDisconnectEvents");const t=Er(e),n=ri();ai(e.onDisconnect_,Zt(),(i,s)=>{const r=function(e,t,n,i){return Qs(t,new Vs(n,e),i)}(i,s,e.serverSyncTree_,t);oi(n,i,r)});let i=[];ai(n,Zt(),(t,n)=>{i=i.concat(Rs(e.serverSyncTree_,t,n));const s=Ur(e,t);Mr(e,s)}),e.onDisconnect_=ri(),vr(e.eventQueue_,Zt(),i)}(e)}function Nr(e,t,n){const i=new Jt("/.info/"+t),s=zn(n);e.infoData_.updateSnapshot(i,s);const r=Rs(e.infoSyncTree_,i,s);vr(e.eventQueue_,i,r)}function Pr(e){return e.nextWriteId_++}function Rr(e,t,n,i,s){xr(e,"set",{path:t.toString(),value:n,priority:i});const r=Er(e),o=zn(n,i),a=As(e.serverSyncTree_,t),l=Gs(o,a,r),h=Pr(e),c=Ns(e.serverSyncTree_,t,l,h,!0);mr(e.eventQueue_,c),e.server_.put(t.toString(),o.val(!0),(n,i)=>{const r="ok"===n;r||dt("set at "+t+" failed: "+n);const o=Ps(e.serverSyncTree_,h,!r);vr(e.eventQueue_,t,o),function(e,t,n,i){t&&Et(()=>{if("ok"===n)t(null);else{const e=(n||"error").toUpperCase();let s=e;i&&(s+=": "+i);const r=new Error(s);r.code=e,t(r)}})}(0,s,n,i)});const u=Ur(e,t);Mr(e,u),vr(e.eventQueue_,u,[])}function xr(e,...t){let n="";e.persistentConnection_&&(n=e.persistentConnection_.id+":"),lt(n,...t)}function Dr(e,t,n,s,r,o){xr(e,"transaction on "+t);const a={path:t,update:n,onComplete:s,status:null,order:it(),applyLocally:o,retryCount:0,unwatcher:r,abortReason:null,currentWriteId:null,currentInputSnapshot:null,currentOutputSnapshotRaw:null,currentOutputSnapshotResolved:null},l=Ar(e,t,void 0);a.currentInputSnapshot=l;const h=a.update(l.val());if(void 0===h)a.unwatcher(),a.currentOutputSnapshotRaw=null,a.currentOutputSnapshotResolved=null,a.onComplete&&a.onComplete(null,!1,a.currentInputSnapshot);else{dr("transaction failed: Data returned ",h,a.path),a.status=0;const n=Zs(e.transactionQueueTree_,t),s=Xs(n)||[];let r;if(s.push(a),er(n,s),"object"==typeof h&&null!==h&&R(h,".priority"))r=x(h,".priority"),i(null===(c=r)||"string"==typeof c||"number"==typeof c&&!pt(c)||c&&"object"==typeof c&&R(c,".sv"),"Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.");else{r=(As(e.serverSyncTree_,t)||jn.EMPTY_NODE).getPriority().val()}const o=Er(e),u=zn(h,r),d=Gs(u,l,o);a.currentOutputSnapshotRaw=u,a.currentOutputSnapshotResolved=d,a.currentWriteId=Pr(e);const p=Ns(e.serverSyncTree_,t,d,a.currentWriteId,a.applyLocally);vr(e.eventQueue_,t,p),Or(e,e.transactionQueueTree_)}var c}function Ar(e,t,n){return As(e.serverSyncTree_,t,n)||jn.EMPTY_NODE}function Or(e,t=e.transactionQueueTree_){if(t||Wr(e,t),Xs(t)){const n=Fr(e,t);i(n.length>0,"Sending zero length transaction queue");n.every(e=>0===e.status)&&function(e,t,n){const s=n.map(e=>e.currentWriteId),r=Ar(e,t,s);let o=r;const a=r.hash();for(let c=0;c<n.length;c++){const e=n[c];i(0===e.status,"tryToSendTransactionQueue_: items in queue should all be run."),e.status=1,e.retryCount++;const s=ln(t,e.path);o=o.updateChild(s,e.currentOutputSnapshotRaw)}const l=o.val(!0),h=t;e.server_.put(h.toString(),l,i=>{xr(e,"transaction put response",{path:h.toString(),status:i});let s=[];if("ok"===i){const i=[];for(let t=0;t<n.length;t++)n[t].status=2,s=s.concat(Ps(e.serverSyncTree_,n[t].currentWriteId)),n[t].onComplete&&i.push(()=>n[t].onComplete(null,!0,n[t].currentOutputSnapshotResolved)),n[t].unwatcher();Wr(e,Zs(e.transactionQueueTree_,t)),Or(e,e.transactionQueueTree_),vr(e.eventQueue_,t,s);for(let e=0;e<i.length;e++)Et(i[e])}else{if("datastale"===i)for(let e=0;e<n.length;e++)3===n[e].status?n[e].status=4:n[e].status=0;else{dt("transaction at "+h.toString()+" failed: "+i);for(let e=0;e<n.length;e++)n[e].status=4,n[e].abortReason=i}Mr(e,t)}},a)}(e,sr(t),n)}else tr(t)&&nr(t,t=>{Or(e,t)})}function Mr(e,t){const n=Lr(e,t),s=sr(n);return function(e,t,n){if(0===t.length)return;const s=[];let r=[];const o=t.filter(e=>0===e.status),a=o.map(e=>e.currentWriteId);for(let l=0;l<t.length;l++){const o=t[l],h=ln(n,o.path);let c,u=!1;if(i(null!==h,"rerunTransactionsUnderNode_: relativePath should not be null."),4===o.status)u=!0,c=o.abortReason,r=r.concat(Ps(e.serverSyncTree_,o.currentWriteId,!0));else if(0===o.status)if(o.retryCount>=25)u=!0,c="maxretry",r=r.concat(Ps(e.serverSyncTree_,o.currentWriteId,!0));else{const n=Ar(e,o.path,a);o.currentInputSnapshot=n;const i=t[l].update(n.val());if(void 0!==i){dr("transaction failed: Data returned ",i,o.path);let t=zn(i);"object"==typeof i&&null!=i&&R(i,".priority")||(t=t.updatePriority(n.getPriority()));const s=o.currentWriteId,l=Er(e),h=Gs(t,n,l);o.currentOutputSnapshotRaw=t,o.currentOutputSnapshotResolved=h,o.currentWriteId=Pr(e),a.splice(a.indexOf(s),1),r=r.concat(Ns(e.serverSyncTree_,o.path,h,o.currentWriteId,o.applyLocally)),r=r.concat(Ps(e.serverSyncTree_,s,!0))}else u=!0,c="nodata",r=r.concat(Ps(e.serverSyncTree_,o.currentWriteId,!0))}vr(e.eventQueue_,n,r),r=[],u&&(t[l].status=2,function(e){setTimeout(e,Math.floor(0))}(t[l].unwatcher),t[l].onComplete&&("nodata"===c?s.push(()=>t[l].onComplete(null,!1,t[l].currentInputSnapshot)):s.push(()=>t[l].onComplete(new Error(c),!1,null))))}Wr(e,e.transactionQueueTree_);for(let i=0;i<s.length;i++)Et(s[i]);Or(e,e.transactionQueueTree_)}(e,Fr(e,n),s),s}function Lr(e,t){let n,i=e.transactionQueueTree_;for(n=Xt(t);null!==n&&void 0===Xs(i);)i=Zs(i,n),n=Xt(t=tn(t));return i}function Fr(e,t){const n=[];return qr(e,t,n),n.sort((e,t)=>e.order-t.order),n}function qr(e,t,n){const i=Xs(t);if(i)for(let s=0;s<i.length;s++)n.push(i[s]);nr(t,t=>{qr(e,t,n)})}function Wr(e,t){const n=Xs(t);if(n){let e=0;for(let t=0;t<n.length;t++)2!==n[t].status&&(n[e]=n[t],e++);n.length=e,er(t,n.length>0?n:void 0)}nr(t,t=>{Wr(e,t)})}function Ur(e,t){const n=sr(Lr(e,t)),i=Zs(e.transactionQueueTree_,t);return function(e,t){let n=e.parent;for(;null!==n;){if(t(n))return!0;n=n.parent}}(i,t=>{Hr(e,t)}),Hr(e,i),ir(i,t=>{Hr(e,t)}),n}function Hr(e,t){const n=Xs(t);if(n){const s=[];let r=[],o=-1;for(let t=0;t<n.length;t++)3===n[t].status||(1===n[t].status?(i(o===t-1,"All SENT items should be at beginning of queue."),o=t,n[t].status=3,n[t].abortReason="set"):(i(0===n[t].status,"Unexpected transaction status in abort"),n[t].unwatcher(),r=r.concat(Ps(e.serverSyncTree_,n[t].currentWriteId,!0)),n[t].onComplete&&s.push(n[t].onComplete.bind(null,new Error("set"),!1,null))));-1===o?er(t,void 0):n.length=o+1,vr(e.eventQueue_,sr(t),r);for(let e=0;e<s.length;e++)Et(s[e])}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jr=function(e,t){const n=Br(e),i=n.namespace;"firebase.com"===n.domain&&ut(n.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),i&&"undefined"!==i||"localhost"===n.domain||ut("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),n.secure||"undefined"!=typeof window&&window.location&&window.location.protocol&&-1!==window.location.protocol.indexOf("https:")&&dt("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().");const s="ws"===n.scheme||"wss"===n.scheme;return{repoInfo:new Ot(n.host,n.secure,i,s,t,"",i!==n.subdomain),path:new Jt(n.pathString)}},Br=function(e){let t="",n="",i="",s="",r="",o=!0,a="https",l=443;if("string"==typeof e){let h=e.indexOf("//");h>=0&&(a=e.substring(0,h-1),e=e.substring(h+2));let c=e.indexOf("/");-1===c&&(c=e.length);let u=e.indexOf("?");-1===u&&(u=e.length),t=e.substring(0,Math.min(c,u)),c<u&&(s=function(e){let t="";const n=e.split("/");for(let s=0;s<n.length;s++)if(n[s].length>0){let e=n[s];try{e=decodeURIComponent(e.replace(/\+/g," "))}catch(i){}t+="/"+e}return t}(e.substring(c,u)));const d=function(e){const t={};"?"===e.charAt(0)&&(e=e.substring(1));for(const n of e.split("&")){if(0===n.length)continue;const i=n.split("=");2===i.length?t[decodeURIComponent(i[0])]=decodeURIComponent(i[1]):dt(`Invalid query segment '${n}' in query '${e}'`)}return t}(e.substring(Math.min(e.length,u)));h=t.indexOf(":"),h>=0?(o="https"===a||"wss"===a,l=parseInt(t.substring(h+1),10)):h=t.length;const p=t.slice(0,h);if("localhost"===p.toLowerCase())n="localhost";else if(p.split(".").length<=2)n=p;else{const e=t.indexOf(".");i=t.substring(0,e).toLowerCase(),n=t.substring(e+1),r=i}"ns"in d&&(r=d.ns)}return{host:t,port:l,domain:n,subdomain:i,secure:o,scheme:a,pathString:s,namespace:r}},zr="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",Vr=function(){let e=0;const t=[];return function(n){const s=n===e;let r;e=n;const o=new Array(8);for(r=7;r>=0;r--)o[r]=zr.charAt(n%64),n=Math.floor(n/64);i(0===n,"Cannot push at time == 0");let a=o.join("");if(s){for(r=11;r>=0&&63===t[r];r--)t[r]=0;t[r]++}else for(r=0;r<12;r++)t[r]=Math.floor(64*Math.random());for(r=0;r<12;r++)a+=zr.charAt(t[r]);return i(20===a.length,"nextPushId: Length should be 20."),a}}();
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class $r{constructor(e,t,n,i){this.eventType=e,this.eventRegistration=t,this.snapshot=n,this.prevName=i}getPath(){const e=this.snapshot.ref;return"value"===this.eventType?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+N(this.snapshot.exportVal())}}class Yr{constructor(e,t,n){this.eventRegistration=e,this.error=t,this.path=n}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kr{constructor(e,t){this.snapshotCallback=e,this.cancelCallback=t}onValue(e,t){this.snapshotCallback.call(null,e,t)}onCancel(e){return i(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||void 0!==this.snapshotCallback.userCallback&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gr{constructor(e,t,n,i){this._repo=e,this._path=t,this._queryParams=n,this._orderByCalled=i}get key(){return an(this._path)?null:nn(this._path)}get ref(){return new Qr(this._repo,this._path)}get _queryIdentifier(){const e=ni(this._queryParams),t=vt(e);return"{}"===t?"default":t}get _queryObject(){return ni(this._queryParams)}isEqual(e){if(!((e=W(e))instanceof Gr))return!1;const t=this._repo===e._repo,n=hn(this._path,e._path),i=this._queryIdentifier===e._queryIdentifier;return t&&n&&i}toJSON(){return this.toString()}toString(){return this._repo.toString()+function(e){let t="";for(let n=e.pieceNum_;n<e.pieces_.length;n++)""!==e.pieces_[n]&&(t+="/"+encodeURIComponent(String(e.pieces_[n])));return t||"/"}(this._path)}}class Qr extends Gr{constructor(e,t){super(e,t,new ei,!1)}get parent(){const e=rn(this._path);return null===e?null:new Qr(this._repo,e)}get root(){let e=this;for(;null!==e.parent;)e=e.parent;return e}}class Jr{constructor(e,t,n){this._node=e,this.ref=t,this._index=n}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const t=new Jt(e),n=Xr(this.ref,e);return new Jr(this._node.getChild(t),n,On)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){if(this._node.isLeafNode())return!1;return!!this._node.forEachChild(this._index,(t,n)=>e(new Jr(n,Xr(this.ref,t),On)))}hasChild(e){const t=new Jt(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return!this._node.isLeafNode()&&!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function Zr(e,t){return(e=W(e))._checkNotDeleted("ref"),void 0!==t?Xr(e._root,t):e._root}function Xr(e,t){var n,i,s;return null===Xt((e=W(e))._path)?(n="child",i="path",(s=t)&&(s=s.replace(/^\/*\.info(\/|$)/,"/")),pr(n,i,s)):pr("child","path",t),new Qr(e._repo,on(e._path,t))}function eo(e,t){e=W(e),_r("push",e._path),ur("push",t,e._path,!0);const n=Tr(e._repo),i=Vr(n),s=Xr(e,i),r=Xr(e,i);let o;return o=null!=t?to(r,t).then(()=>r):Promise.resolve(r),s.then=o.then.bind(o),s.catch=o.then.bind(o,void 0),s}function to(e,t){e=W(e),_r("set",e._path),ur("set",t,e._path,!1);const n=new y;return Rr(e._repo,e._path,t,null,n.wrapCallback(()=>{})),n.promise}class no{constructor(e){this.callbackContext=e}respondsTo(e){return"value"===e}createEvent(e,t){const n=t._queryParams.getIndex();return new $r("value",this,new Jr(e.snapshotNode,new Qr(t._repo,t._path),n))}getEventRunner(e){return"cancel"===e.getEventType()?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new Yr(this,e,t):null}matches(e){return e instanceof no&&(!e.callbackContext||!this.callbackContext||e.callbackContext.matches(this.callbackContext))}hasAnyCallback(){return null!==this.callbackContext}}function io(e,t,n,i,s){const r=new Kr(n,void 0),o=new no(r);return function(e,t,n){let i;i=".info"===Xt(t._path)?Ds(e.infoSyncTree_,t,n):Ds(e.serverSyncTree_,t,n),yr(e.eventQueue_,t._path,i)}(e._repo,e,o),()=>function(e,t,n){let i;i=".info"===Xt(t._path)?xs(e.infoSyncTree_,t,n):xs(e.serverSyncTree_,t,n),yr(e.eventQueue_,t._path,i)}(e._repo,e,o)}function so(e,t,n,i){return io(e,0,t)}class ro{}class oo extends ro{constructor(e){super(),this._limit=e,this.type="limitToLast"}_apply(e){if(e._queryParams.hasLimit())throw new Error("limitToLast: Limit was already set (by another call to limitToFirst or limitToLast).");return new Gr(e._repo,e._path,function(e,t){const n=e.copy();return n.limitSet_=!0,n.limit_=t,n.viewFrom_="r",n}(e._queryParams,this._limit),e._orderByCalled)}}function ao(e){if(Math.floor(e)!==e||e<=0)throw new Error("limitToLast: First argument must be a positive integer.");return new oo(e)}function lo(e,...t){let n=W(e);for(const i of t)n=i._apply(n);return n}!function(e){i(!_s,"__referenceConstructor has already been defined"),_s=e}(Qr),function(e){i(!fs,"__referenceConstructor has already been defined"),fs=e}(Qr);
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const ho={};let co=!1;function uo(e,t,n,i,s){let r=i||e.options.databaseURL;void 0===r&&(e.options.projectId||ut("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),lt("Using default host for project ",e.options.projectId),r=`${e.options.projectId}-default-rtdb.firebaseio.com`);let o,a=jr(r,s),l=a.repoInfo;"undefined"!=typeof process&&Ye&&(o=Ye.FIREBASE_DATABASE_EMULATOR_HOST),o?(r=`http://${o}?ns=${l.namespace}`,a=jr(r,s),l=a.repoInfo):a.repoInfo.secure;const h=new Nt(e.name,e.options,t);fr("Invalid Firebase Database URL",a),an(a.path)||ut("Database URL must point to the root of a Firebase Database (not including a child path).");const c=function(e,t,n,i){let s=ho[t.name];s||(s={},ho[t.name]=s);let r=s[e.toURLString()];r&&ut("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call.");return r=new br(e,co,n,i),s[e.toURLString()]=r,r}(l,e,h,new kt(e,n));return new po(c,e)}class po{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(Ir(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new Qr(this._repo,Zt())),this._rootInternal}_delete(){return null!==this._rootInternal&&(!function(e,t){const n=ho[t];n&&n[e.key]===e||ut(`Database ${t}(${e.repoInfo_}) has already been deleted.`),function(e){e.persistentConnection_&&e.persistentConnection_.interrupt("repo_interrupt")}(e),delete n[e.key]}(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){null===this._rootInternal&&ut("Cannot call "+e+" on a deleted database.")}}function _o(e=function(e=Se){const t=Ne.get(e);if(!t&&e===Se&&m())return Me();if(!t)throw Ae.create("no-app",{appName:e});return t}(),t){const n=function(e,t){const n=e.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),e.container.getProvider(t)}(e,"database").getImmediate({identifier:t});if(!n._instanceStarted){const e=g("database");e&&function(e,t,n,i={}){e=W(e),e._checkNotDeleted("useEmulator");const s=`${t}:${n}`,r=e._repoInternal;if(e._instanceStarted){if(s===e._repoInternal.repoInfo_.host&&O(i,r.repoInfo_.emulatorOptions))return;ut("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(r.repoInfo_.nodeAdmin)i.mockUserToken&&ut('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new Pt(Pt.OWNER);else if(i.mockUserToken){const t="string"==typeof i.mockUserToken?i.mockUserToken:
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function(e,t){if(e.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n=t||"demo-project",i=e.iat||0,s=e.sub||e.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const r=Object.assign({iss:`https://securetoken.google.com/${n}`,aud:n,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}}},e);return[h(JSON.stringify({alg:"none",type:"JWT"})),h(JSON.stringify(r)),""].join(".")}(i.mockUserToken,e.app.options.projectId);o=new Pt(t)}v(t)&&(!async function(e){(await fetch(e,{credentials:"include"})).ok}(t),b("Database",!0));!function(e,t,n,i){const s=t.lastIndexOf(":"),r=v(t.substring(0,s));e.repoInfo_=new Ot(t,r,e.repoInfo_.namespace,e.repoInfo_.webSocketOnly,e.repoInfo_.nodeAdmin,e.repoInfo_.persistenceKey,e.repoInfo_.includeNamespaceInQueryParams,!0,n),i&&(e.authTokenProvider_=i)}(r,s,i,o)}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(n,...e)}return n}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class fo{constructor(e,t){this.committed=e,this.snapshot=t}toJSON(){return{committed:this.committed,snapshot:this.snapshot.toJSON()}}}function go(e,t,n){if(e=W(e),_r("Reference.transaction",e._path),".length"===e.key||".keys"===e.key)throw"Reference.transaction failed: "+e.key+" is a read-only object.";const i=!0,s=new y,r=so(e,()=>{});return Dr(e._repo,e._path,t,(t,n,i)=>{let r=null;t?s.reject(t):(r=new Jr(i,new Qr(e._repo,e._path),On),s.resolve(new fo(n,r)))},r,i),s.promise}gn.prototype.simpleListen=function(e,t){this.sendRequest("q",{p:e},t)},gn.prototype.echo=function(e,t){this.sendRequest("echo",{d:e},t)},function(e){Qe="11.10.0",De(new U("database",(e,{instanceIdentifier:t})=>uo(e.getProvider("app").getImmediate(),e.getProvider("auth-internal"),e.getProvider("app-check-internal"),t),"PUBLIC").setMultipleInstances(!0)),Le(Ke,Ge,e),Le(Ke,Ge,"esm2017")}();export{Zr as a,go as b,_o as g,Me as i,ao as l,so as o,eo as p,lo as q,Le as r,to as s};
