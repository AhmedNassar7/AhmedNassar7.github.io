import{o as es}from"./idb-DPHlWu5x.js";var ns={};/**
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
 */const is=!1,ss="${JSCORE_VERSION}",f=function(i,t){if(!i)throw Ct(t)},Ct=function(i){return new Error("Firebase Database ("+ss+") INTERNAL ASSERT FAILED: "+i)},Kn=function(i){const t=[];let e=0;for(let n=0;n<i.length;n++){let s=i.charCodeAt(n);s<128?t[e++]=s:s<2048?(t[e++]=s>>6|192,t[e++]=63&s|128):(64512&s)==55296&&n+1<i.length&&(64512&i.charCodeAt(n+1))==56320?(s=65536+((1023&s)<<10)+(1023&i.charCodeAt(++n)),t[e++]=s>>18|240,t[e++]=s>>12&63|128,t[e++]=s>>6&63|128,t[e++]=63&s|128):(t[e++]=s>>12|224,t[e++]=s>>6&63|128,t[e++]=63&s|128)}return t},We={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(i,t){if(!Array.isArray(i))throw Error("encodeByteArray takes an array as a parameter");this.init_();const e=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,n=[];for(let s=0;s<i.length;s+=3){const r=i[s],o=s+1<i.length,a=o?i[s+1]:0,h=s+2<i.length,l=h?i[s+2]:0,d=r>>2,c=(3&r)<<4|a>>4;let u=(15&a)<<2|l>>6,p=63&l;h||(p=64,o||(u=64)),n.push(e[d],e[c],e[u],e[p])}return n.join("")},encodeString(i,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(i):this.encodeByteArray(Kn(i),t)},decodeString(i,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(i):function(e){const n=[];let s=0,r=0;for(;s<e.length;){const o=e[s++];if(o<128)n[r++]=String.fromCharCode(o);else if(o>191&&o<224){const a=e[s++];n[r++]=String.fromCharCode((31&o)<<6|63&a)}else if(o>239&&o<365){const a=((7&o)<<18|(63&e[s++])<<12|(63&e[s++])<<6|63&e[s++])-65536;n[r++]=String.fromCharCode(55296+(a>>10)),n[r++]=String.fromCharCode(56320+(1023&a))}else{const a=e[s++],h=e[s++];n[r++]=String.fromCharCode((15&o)<<12|(63&a)<<6|63&h)}}return n.join("")}(this.decodeStringToByteArray(i,t))},decodeStringToByteArray(i,t){this.init_();const e=t?this.charToByteMapWebSafe_:this.charToByteMap_,n=[];for(let s=0;s<i.length;){const r=e[i.charAt(s++)],o=s<i.length?e[i.charAt(s)]:0;++s;const a=s<i.length?e[i.charAt(s)]:64;++s;const h=s<i.length?e[i.charAt(s)]:64;if(++s,r==null||o==null||a==null||h==null)throw new rs;const l=r<<2|o>>4;if(n.push(l),a!==64){const d=o<<4&240|a>>2;if(n.push(d),h!==64){const c=a<<6&192|h;n.push(c)}}}return n},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let i=0;i<this.ENCODED_VALS.length;i++)this.byteToCharMap_[i]=this.ENCODED_VALS.charAt(i),this.charToByteMap_[this.byteToCharMap_[i]]=i,this.byteToCharMapWebSafe_[i]=this.ENCODED_VALS_WEBSAFE.charAt(i),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[i]]=i,i>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(i)]=i,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(i)]=i)}}};/**
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
 */class rs extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Gn=function(i){const t=Kn(i);return We.encodeByteArray(t,!0)},Yt=function(i){return Gn(i).replace(/\./g,"")},be=function(i){try{return We.decodeString(i,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
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
 */function os(i){return Yn(void 0,i)}function Yn(i,t){if(!(t instanceof Object))return t;switch(t.constructor){case Date:return new Date(t.getTime());case Object:i===void 0&&(i={});break;case Array:i=[];break;default:return t}for(const e in t)t.hasOwnProperty(e)&&e!=="__proto__"&&(i[e]=Yn(i[e],t[e]));return i}/**
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
 */const as=()=>function(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}().__FIREBASE_DEFAULTS__,Qn=()=>{try{return as()||(()=>{if(typeof process>"u")return;const i=ns.__FIREBASE_DEFAULTS__;return i?JSON.parse(i):void 0})()||(()=>{if(typeof document>"u")return;let i;try{i=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const t=i&&be(i[1]);return t&&JSON.parse(t)})()}catch(i){return void console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${i}`)}},hs=i=>{const t=(s=>{var r,o;return(o=(r=Qn())===null||r===void 0?void 0:r.emulatorHosts)===null||o===void 0?void 0:o[s]})(i);if(!t)return;const e=t.lastIndexOf(":");if(e<=0||e+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const n=parseInt(t.substring(e+1),10);return t[0]==="["?[t.substring(1,e-1),n]:[t.substring(0,e),n]},Jn=()=>{var i;return(i=Qn())===null||i===void 0?void 0:i.config};/**
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
 */class ae{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}wrapCallback(t){return(e,n)=>{e?this.reject(e):this.resolve(n),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(e):t(e,n))}}}/**
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
 */function Xn(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:"")}function Zn(){return is===!0}class Ut extends Error{constructor(t,e,n){super(e),this.code=t,this.customData=n,this.name="FirebaseError",Object.setPrototypeOf(this,Ut.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ti.prototype.create)}}class ti{constructor(t,e,n){this.service=t,this.serviceName=e,this.errors=n}create(t,...e){const n=e[0]||{},s=`${this.service}/${t}`,r=this.errors[t],o=r?function(h,l){return h.replace(ls,(d,c)=>{const u=l[c];return u!=null?String(u):`<${c}?>`})}(r,n):"Error",a=`${this.serviceName}: ${o} (${s}).`;return new Ut(s,a,n)}}const ls=/\{\$([^}]+)}/g;/**
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
 */function Ot(i){return JSON.parse(i)}function M(i){return JSON.stringify(i)}/**
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
 */const ln=function(i){let t={},e={},n={},s="";try{const r=i.split(".");t=Ot(be(r[0])||""),e=Ot(be(r[1])||""),s=r[2],n=e.d||{},delete e.d}catch{}return{header:t,claims:e,data:n,signature:s}};/**
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
 */function X(i,t){return Object.prototype.hasOwnProperty.call(i,t)}function gt(i,t){return Object.prototype.hasOwnProperty.call(i,t)?i[t]:void 0}function cn(i){for(const t in i)if(Object.prototype.hasOwnProperty.call(i,t))return!1;return!0}function Qt(i,t,e){const n={};for(const s in i)Object.prototype.hasOwnProperty.call(i,s)&&(n[s]=t.call(e,i[s],s,i));return n}function Ie(i,t){if(i===t)return!0;const e=Object.keys(i),n=Object.keys(t);for(const s of e){if(!n.includes(s))return!1;const r=i[s],o=t[s];if(un(r)&&un(o)){if(!Ie(r,o))return!1}else if(r!==o)return!1}for(const s of n)if(!e.includes(s))return!1;return!0}function un(i){return i!==null&&typeof i=="object"}/**
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
 *//**
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
 */class cs{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=64,this.pad_[0]=128;for(let t=1;t<this.blockSize;++t)this.pad_[t]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(t,e){e||(e=0);const n=this.W_;if(typeof t=="string")for(let c=0;c<16;c++)n[c]=t.charCodeAt(e)<<24|t.charCodeAt(e+1)<<16|t.charCodeAt(e+2)<<8|t.charCodeAt(e+3),e+=4;else for(let c=0;c<16;c++)n[c]=t[e]<<24|t[e+1]<<16|t[e+2]<<8|t[e+3],e+=4;for(let c=16;c<80;c++){const u=n[c-3]^n[c-8]^n[c-14]^n[c-16];n[c]=4294967295&(u<<1|u>>>31)}let s,r,o=this.chain_[0],a=this.chain_[1],h=this.chain_[2],l=this.chain_[3],d=this.chain_[4];for(let c=0;c<80;c++){c<40?c<20?(s=l^a&(h^l),r=1518500249):(s=a^h^l,r=1859775393):c<60?(s=a&h|l&(a|h),r=2400959708):(s=a^h^l,r=3395469782);const u=(o<<5|o>>>27)+s+d+r+n[c]&4294967295;d=l,l=h,h=4294967295&(a<<30|a>>>2),a=o,o=u}this.chain_[0]=this.chain_[0]+o&4294967295,this.chain_[1]=this.chain_[1]+a&4294967295,this.chain_[2]=this.chain_[2]+h&4294967295,this.chain_[3]=this.chain_[3]+l&4294967295,this.chain_[4]=this.chain_[4]+d&4294967295}update(t,e){if(t==null)return;e===void 0&&(e=t.length);const n=e-this.blockSize;let s=0;const r=this.buf_;let o=this.inbuf_;for(;s<e;){if(o===0)for(;s<=n;)this.compress_(t,s),s+=this.blockSize;if(typeof t=="string"){for(;s<e;)if(r[o]=t.charCodeAt(s),++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}else for(;s<e;)if(r[o]=t[s],++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=e}digest(){const t=[];let e=8*this.total_;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let s=this.blockSize-1;s>=56;s--)this.buf_[s]=255&e,e/=256;this.compress_(this.buf_);let n=0;for(let s=0;s<5;s++)for(let r=24;r>=0;r-=8)t[n]=this.chain_[s]>>r&255,++n;return t}}function Ue(i,t){return`${i} failed: ${t} argument `}/**
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
 */const Vt=function(i){let t=0;for(let e=0;e<i.length;e++){const n=i.charCodeAt(e);n<128?t++:n<2048?t+=2:n>=55296&&n<=56319?(t+=4,e++):t+=3}return t};/**
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
 */function Mt(i){return i&&i._delegate?i._delegate:i}class Lt{constructor(t,e,n){this.name=t,this.instanceFactory=e,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
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
 */const st="[DEFAULT]";/**
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
 */class us{constructor(t,e){this.name=t,this.container=e,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const e=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(e)){const n=new ae;if(this.instancesDeferred.set(e,n),this.isInitialized(e)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:e});s&&n.resolve(s)}catch{}}return this.instancesDeferred.get(e).promise}getImmediate(t){var e;const n=this.normalizeInstanceIdentifier(t==null?void 0:t.identifier),s=(e=t==null?void 0:t.optional)!==null&&e!==void 0&&e;if(!this.isInitialized(n)&&!this.shouldAutoInitialize()){if(s)return null;throw Error(`Service ${this.name} is not available`)}try{return this.getOrInitializeService({instanceIdentifier:n})}catch(r){if(s)return null;throw r}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,this.shouldAutoInitialize()){if(function(e){return e.instantiationMode==="EAGER"}(t))try{this.getOrInitializeService({instanceIdentifier:st})}catch{}for(const[e,n]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(e);try{const r=this.getOrInitializeService({instanceIdentifier:s});n.resolve(r)}catch{}}}}clearInstance(t=st){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...t.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=st){return this.instances.has(t)}getOptions(t=st){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:e={}}=t,n=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:n,options:e});for(const[r,o]of this.instancesDeferred.entries())n===this.normalizeInstanceIdentifier(r)&&o.resolve(s);return s}onInit(t,e){var n;const s=this.normalizeInstanceIdentifier(e),r=(n=this.onInitCallbacks.get(s))!==null&&n!==void 0?n:new Set;r.add(t),this.onInitCallbacks.set(s,r);const o=this.instances.get(s);return o&&t(o,s),()=>{r.delete(t)}}invokeOnInitCallbacks(t,e){const n=this.onInitCallbacks.get(e);if(n)for(const s of n)try{s(t,e)}catch{}}getOrInitializeService({instanceIdentifier:t,options:e={}}){let n=this.instances.get(t);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:(s=t,s===st?void 0:s),options:e}),this.instances.set(t,n),this.instancesOptions.set(t,e),this.invokeOnInitCallbacks(n,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,n)}catch{}var s;return n||null}normalizeInstanceIdentifier(t=st){return this.component?this.component.multipleInstances?t:st:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}class ds{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const e=this.getProvider(t.name);if(e.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);e.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const e=new us(t,this);return this.providers.set(t,e),e}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var k;(function(i){i[i.DEBUG=0]="DEBUG",i[i.VERBOSE=1]="VERBOSE",i[i.INFO=2]="INFO",i[i.WARN=3]="WARN",i[i.ERROR=4]="ERROR",i[i.SILENT=5]="SILENT"})(k||(k={}));const ps={debug:k.DEBUG,verbose:k.VERBOSE,info:k.INFO,warn:k.WARN,error:k.ERROR,silent:k.SILENT},_s=k.INFO,fs={[k.DEBUG]:"log",[k.VERBOSE]:"log",[k.INFO]:"info",[k.WARN]:"warn",[k.ERROR]:"error"},ms=(i,t,...e)=>{if(t<i.logLevel)return;const n=new Date().toISOString(),s=fs[t];if(!s)throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`);console[s](`[${n}]  ${i.name}:`,...e)};class ei{constructor(t){this.name=t,this._logLevel=_s,this._logHandler=ms,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in k))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?ps[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,k.DEBUG,...t),this._logHandler(this,k.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,k.VERBOSE,...t),this._logHandler(this,k.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,k.INFO,...t),this._logHandler(this,k.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,k.WARN,...t),this._logHandler(this,k.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,k.ERROR,...t),this._logHandler(this,k.ERROR,...t)}}/**
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
 */class gs{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(function(e){const n=e.getComponent();return(n==null?void 0:n.type)==="VERSION"}(t)){const e=t.getImmediate();return`${e.library}/${e.version}`}return null}).filter(t=>t).join(" ")}}const Te="@firebase/app",dn="0.10.13",Q=new ei("@firebase/app"),ys="@firebase/app-compat",vs="@firebase/analytics-compat",Cs="@firebase/analytics",ws="@firebase/app-check-compat",bs="@firebase/app-check",Is="@firebase/auth",Ts="@firebase/auth-compat",Ss="@firebase/database",Es="@firebase/data-connect",ks="@firebase/database-compat",Ns="@firebase/functions",Rs="@firebase/functions-compat",Ps="@firebase/installations",Ds="@firebase/installations-compat",xs="@firebase/messaging",As="@firebase/messaging-compat",Os="@firebase/performance",Ms="@firebase/performance-compat",Ls="@firebase/remote-config",Fs="@firebase/remote-config-compat",qs="@firebase/storage",Ws="@firebase/storage-compat",Us="@firebase/firestore",Hs="@firebase/vertexai-preview",js="@firebase/firestore-compat",Bs="firebase",Se="[DEFAULT]",zs={[Te]:"fire-core",[ys]:"fire-core-compat",[Cs]:"fire-analytics",[vs]:"fire-analytics-compat",[bs]:"fire-app-check",[ws]:"fire-app-check-compat",[Is]:"fire-auth",[Ts]:"fire-auth-compat",[Ss]:"fire-rtdb",[Es]:"fire-data-connect",[ks]:"fire-rtdb-compat",[Ns]:"fire-fn",[Rs]:"fire-fn-compat",[Ps]:"fire-iid",[Ds]:"fire-iid-compat",[xs]:"fire-fcm",[As]:"fire-fcm-compat",[Os]:"fire-perf",[Ms]:"fire-perf-compat",[Ls]:"fire-rc",[Fs]:"fire-rc-compat",[qs]:"fire-gcs",[Ws]:"fire-gcs-compat",[Us]:"fire-fst",[js]:"fire-fst-compat",[Hs]:"fire-vertex","fire-js":"fire-js",[Bs]:"fire-js-all"},Jt=new Map,$s=new Map,Ee=new Map;function pn(i,t){try{i.container.addComponent(t)}catch(e){Q.debug(`Component ${t.name} failed to register with FirebaseApp ${i.name}`,e)}}function Xt(i){const t=i.name;if(Ee.has(t))return Q.debug(`There were multiple attempts to register component ${t}.`),!1;Ee.set(t,i);for(const e of Jt.values())pn(e,i);for(const e of $s.values())pn(e,i);return!0}/**
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
 */const et=new ti("app","Firebase",{"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."});/**
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
 */class Vs{constructor(t,e,n){this._isDeleted=!1,this._options=Object.assign({},t),this._config=Object.assign({},e),this._name=e.name,this._automaticDataCollectionEnabled=e.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new Lt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw et.create("app-deleted",{appName:this._name})}}/**
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
 */function Ks(i,t={}){let e=i;typeof t!="object"&&(t={name:t});const n=Object.assign({name:Se,automaticDataCollectionEnabled:!1},t),s=n.name;if(typeof s!="string"||!s)throw et.create("bad-app-name",{appName:String(s)});if(e||(e=Jn()),!e)throw et.create("no-options");const r=Jt.get(s);if(r){if(Ie(e,r.options)&&Ie(n,r.config))return r;throw et.create("duplicate-app",{appName:s})}const o=new ds(s);for(const h of Ee.values())o.addComponent(h);const a=new Vs(e,n,o);return Jt.set(s,a),a}function Rt(i,t,e){var n;let s=(n=zs[i])!==null&&n!==void 0?n:i;e&&(s+=`-${e}`);const r=s.match(/\s|\//),o=t.match(/\s|\//);if(r||o){const a=[`Unable to register library "${s}" with version "${t}":`];return r&&a.push(`library name "${s}" contains illegal characters (whitespace or "/")`),r&&o&&a.push("and"),o&&a.push(`version name "${t}" contains illegal characters (whitespace or "/")`),void Q.warn(a.join(" "))}Xt(new Lt(`${s}-version`,()=>({library:s,version:t}),"VERSION"))}/**
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
 */const Ft="firebase-heartbeat-store";let pe=null;function ni(){return pe||(pe=es("firebase-heartbeat-database",1,{upgrade:(i,t)=>{if(t===0)try{i.createObjectStore(Ft)}catch(e){console.warn(e)}}}).catch(i=>{throw et.create("idb-open",{originalErrorMessage:i.message})})),pe}async function _n(i,t){try{const e=(await ni()).transaction(Ft,"readwrite");await e.objectStore(Ft).put(t,ii(i)),await e.done}catch(e){if(e instanceof Ut)Q.warn(e.message);else{const n=et.create("idb-set",{originalErrorMessage:e==null?void 0:e.message});Q.warn(n.message)}}}function ii(i){return`${i.name}!${i.options.appId}`}/**
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
 */class Gs{constructor(t){this.container=t,this._heartbeatsCache=null;const e=this.container.getProvider("app").getImmediate();this._storage=new Ys(e),this._heartbeatsCachePromise=this._storage.read().then(n=>(this._heartbeatsCache=n,n))}async triggerHeartbeat(){var t,e;try{const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=fn();return((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(r=>r.date===s)?void 0:(this._heartbeatsCache.heartbeats.push({date:s,agent:n}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(r=>{const o=new Date(r.date).valueOf();return Date.now()-o<=2592e6}),this._storage.overwrite(this._heartbeatsCache))}catch(n){Q.warn(n)}}async getHeartbeatsHeader(){var t;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=fn(),{heartbeatsToSend:n,unsentEntries:s}=function(o,a=1024){const h=[];let l=o.slice();for(const d of o){const c=h.find(u=>u.agent===d.agent);if(c){if(c.dates.push(d.date),mn(h)>a){c.dates.pop();break}}else if(h.push({agent:d.agent,dates:[d.date]}),mn(h)>a){h.pop();break}l=l.slice(1)}return{heartbeatsToSend:h,unsentEntries:l}}(this._heartbeatsCache.heartbeats),r=Yt(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(e){return Q.warn(e),""}}}function fn(){return new Date().toISOString().substring(0,10)}class Ys{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return!!function(){try{return typeof indexedDB=="object"}catch{return!1}}()&&new Promise((t,e)=>{try{let n=!0;const s="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(s);r.onsuccess=()=>{r.result.close(),n||self.indexedDB.deleteDatabase(s),t(!0)},r.onupgradeneeded=()=>{n=!1},r.onerror=()=>{var o;e(((o=r.error)===null||o===void 0?void 0:o.message)||"")}}catch(n){e(n)}}).then(()=>!0).catch(()=>!1)}async read(){if(await this._canUseIndexedDBPromise){const t=await async function(e){try{const n=(await ni()).transaction(Ft),s=await n.objectStore(Ft).get(ii(e));return await n.done,s}catch(n){if(n instanceof Ut)Q.warn(n.message);else{const s=et.create("idb-get",{originalErrorMessage:n==null?void 0:n.message});Q.warn(s.message)}}}(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}return{heartbeats:[]}}async overwrite(t){var e;if(await this._canUseIndexedDBPromise){const n=await this.read();return _n(this.app,{lastSentHeartbeatDate:(e=t.lastSentHeartbeatDate)!==null&&e!==void 0?e:n.lastSentHeartbeatDate,heartbeats:t.heartbeats})}}async add(t){var e;if(await this._canUseIndexedDBPromise){const n=await this.read();return _n(this.app,{lastSentHeartbeatDate:(e=t.lastSentHeartbeatDate)!==null&&e!==void 0?e:n.lastSentHeartbeatDate,heartbeats:[...n.heartbeats,...t.heartbeats]})}}}function mn(i){return Yt(JSON.stringify({version:2,heartbeats:i})).length}/**
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
 */var gn;gn="",Xt(new Lt("platform-logger",i=>new gs(i),"PRIVATE")),Xt(new Lt("heartbeat",i=>new Gs(i),"PRIVATE")),Rt(Te,dn,gn),Rt(Te,dn,"esm2017"),Rt("fire-js","");var yn={};const vn="@firebase/database",Cn="1.0.8";/**
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
 */let si="";/**
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
 */class Qs{constructor(t){this.domStorage_=t,this.prefix_="firebase:"}set(t,e){e==null?this.domStorage_.removeItem(this.prefixedName_(t)):this.domStorage_.setItem(this.prefixedName_(t),M(e))}get(t){const e=this.domStorage_.getItem(this.prefixedName_(t));return e==null?null:Ot(e)}remove(t){this.domStorage_.removeItem(this.prefixedName_(t))}prefixedName_(t){return this.prefix_+t}toString(){return this.domStorage_.toString()}}/**
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
 */class Js{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(t,e){e==null?delete this.cache_[t]:this.cache_[t]=e}get(t){return X(this.cache_,t)?this.cache_[t]:null}remove(t){delete this.cache_[t]}}/**
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
 */const ri=function(i){try{if(typeof window<"u"&&window[i]!==void 0){const t=window[i];return t.setItem("firebase:sentinel","cache"),t.removeItem("firebase:sentinel"),new Qs(t)}}catch{}return new Js},ot=ri("localStorage"),Xs=ri("sessionStorage"),ft=new ei("@firebase/database"),Zs=function(){let i=1;return function(){return i++}}(),oi=function(i){const t=function(s){const r=[];let o=0;for(let a=0;a<s.length;a++){let h=s.charCodeAt(a);if(h>=55296&&h<=56319){const l=h-55296;a++,f(a<s.length,"Surrogate pair missing trail surrogate."),h=65536+(l<<10)+(s.charCodeAt(a)-56320)}h<128?r[o++]=h:h<2048?(r[o++]=h>>6|192,r[o++]=63&h|128):h<65536?(r[o++]=h>>12|224,r[o++]=h>>6&63|128,r[o++]=63&h|128):(r[o++]=h>>18|240,r[o++]=h>>12&63|128,r[o++]=h>>6&63|128,r[o++]=63&h|128)}return r}(i),e=new cs;e.update(t);const n=e.digest();return We.encodeByteArray(n)},Ht=function(...i){let t="";for(let e=0;e<i.length;e++){const n=i[e];Array.isArray(n)||n&&typeof n=="object"&&typeof n.length=="number"?t+=Ht.apply(null,n):t+=typeof n=="object"?M(n):n,t+=" "}return t};let Nt=null,wn=!0;const L=function(...i){var t;if(wn===!0&&(wn=!1,Nt===null&&Xs.get("logging_enabled")===!0&&(f(!t,"Can't turn on custom loggers persistently."),ft.logLevel=k.VERBOSE,Nt=ft.log.bind(ft))),Nt){const e=Ht.apply(null,i);Nt(e)}},jt=function(i){return function(...t){L(i,...t)}},ke=function(...i){const t="FIREBASE INTERNAL ERROR: "+Ht(...i);ft.error(t)},G=function(...i){const t=`FIREBASE FATAL ERROR: ${Ht(...i)}`;throw ft.error(t),new Error(t)},U=function(...i){const t="FIREBASE WARNING: "+Ht(...i);ft.warn(t)},ai=function(i){return typeof i=="number"&&(i!=i||i===Number.POSITIVE_INFINITY||i===Number.NEGATIVE_INFINITY)},yt="[MIN_NAME]",ht="[MAX_NAME]",wt=function(i,t){if(i===t)return 0;if(i===yt||t===ht)return-1;if(t===yt||i===ht)return 1;{const e=bn(i),n=bn(t);return e!==null?n!==null?e-n==0?i.length-t.length:e-n:-1:n!==null?1:i<t?-1:1}},tr=function(i,t){return i===t?0:i<t?-1:1},Tt=function(i,t){if(t&&i in t)return t[i];throw new Error("Missing required key ("+i+") in object: "+M(t))},He=function(i){if(typeof i!="object"||i===null)return M(i);const t=[];for(const n in i)t.push(n);t.sort();let e="{";for(let n=0;n<t.length;n++)n!==0&&(e+=","),e+=M(t[n]),e+=":",e+=He(i[t[n]]);return e+="}",e},hi=function(i,t){const e=i.length;if(e<=t)return[i];const n=[];for(let s=0;s<e;s+=t)s+t>e?n.push(i.substring(s,e)):n.push(i.substring(s,s+t));return n};function j(i,t){for(const e in i)i.hasOwnProperty(e)&&t(e,i[e])}const li=function(i){f(!ai(i),"Invalid JSON number");const t=1023;let e,n,s,r,o;i===0?(n=0,s=0,e=1/i==-1/0?1:0):(e=i<0,(i=Math.abs(i))>=Math.pow(2,-1022)?(r=Math.min(Math.floor(Math.log(i)/Math.LN2),t),n=r+t,s=Math.round(i*Math.pow(2,52-r)-Math.pow(2,52))):(n=0,s=Math.round(i/Math.pow(2,-1074))));const a=[];for(o=52;o;o-=1)a.push(s%2?1:0),s=Math.floor(s/2);for(o=11;o;o-=1)a.push(n%2?1:0),n=Math.floor(n/2);a.push(e?1:0),a.reverse();const h=a.join("");let l="";for(o=0;o<64;o+=8){let d=parseInt(h.substr(o,8),2).toString(16);d.length===1&&(d="0"+d),l+=d}return l.toLowerCase()},er=new RegExp("^-?(0*)\\d{1,10}$"),bn=function(i){if(er.test(i)){const t=Number(i);if(t>=-2147483648&&t<=2147483647)return t}return null},bt=function(i){try{i()}catch(t){setTimeout(()=>{const e=t.stack||"";throw U("Exception was thrown by user callback.",e),t},Math.floor(0))}},Pt=function(i,t){const e=setTimeout(i,t);return typeof e=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(e):typeof e=="object"&&e.unref&&e.unref(),e};/**
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
 */class nr{constructor(t,e){this.appName_=t,this.appCheckProvider=e,this.appCheck=e==null?void 0:e.getImmediate({optional:!0}),this.appCheck||e==null||e.get().then(n=>this.appCheck=n)}getToken(t){return this.appCheck?this.appCheck.getToken(t):new Promise((e,n)=>{setTimeout(()=>{this.appCheck?this.getToken(t).then(e,n):e(null)},0)})}addTokenChangeListener(t){var e;(e=this.appCheckProvider)===null||e===void 0||e.get().then(n=>n.addTokenListener(t))}notifyForInvalidToken(){U(`Provided AppCheck credentials for the app named "${this.appName_}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
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
 */class ir{constructor(t,e,n){this.appName_=t,this.firebaseOptions_=e,this.authProvider_=n,this.auth_=null,this.auth_=n.getImmediate({optional:!0}),this.auth_||n.onInit(s=>this.auth_=s)}getToken(t){return this.auth_?this.auth_.getToken(t).catch(e=>e&&e.code==="auth/token-not-initialized"?(L("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(e)):new Promise((e,n)=>{setTimeout(()=>{this.auth_?this.getToken(t).then(e,n):e(null)},0)})}addTokenChangeListener(t){this.auth_?this.auth_.addAuthTokenListener(t):this.authProvider_.get().then(e=>e.addAuthTokenListener(t))}removeTokenChangeListener(t){this.authProvider_.get().then(e=>e.removeAuthTokenListener(t))}notifyForInvalidToken(){let t='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?t+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?t+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':t+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',U(t)}}class Kt{constructor(t){this.accessToken=t}getToken(t){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(t){t(this.accessToken)}removeTokenChangeListener(t){}notifyForInvalidToken(){}}Kt.OWNER="owner";/**
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
 */const ci=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,Ne="ac",ui="websocket",di="long_polling";/**
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
 */class pi{constructor(t,e,n,s,r=!1,o="",a=!1,h=!1){this.secure=e,this.namespace=n,this.webSocketOnly=s,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=h,this._host=t.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=ot.get("host:"+t)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(t){t!==this.internalHost&&(this.internalHost=t,this.isCacheableHost()&&ot.set("host:"+this._host,this.internalHost))}toString(){let t=this.toURLString();return this.persistenceKey&&(t+="<"+this.persistenceKey+">"),t}toURLString(){const t=this.secure?"https://":"http://",e=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${t}${this.host}/${e}`}}function _i(i,t,e){let n;if(f(typeof t=="string","typeof type must == string"),f(typeof e=="object","typeof params must == object"),t===ui)n=(i.secure?"wss://":"ws://")+i.internalHost+"/.ws?";else{if(t!==di)throw new Error("Unknown connection type: "+t);n=(i.secure?"https://":"http://")+i.internalHost+"/.lp?"}(function(r){return r.host!==r.internalHost||r.isCustomHost()||r.includeNamespaceInQueryParams})(i)&&(e.ns=i.namespace);const s=[];return j(e,(r,o)=>{s.push(r+"="+o)}),n+s.join("&")}/**
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
 */class sr{constructor(){this.counters_={}}incrementCounter(t,e=1){X(this.counters_,t)||(this.counters_[t]=0),this.counters_[t]+=e}get(){return os(this.counters_)}}/**
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
 */const _e={},fe={};function je(i){const t=i.toString();return _e[t]||(_e[t]=new sr),_e[t]}/**
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
 */class rr{constructor(t){this.onMessage_=t,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(t,e){this.closeAfterResponse=t,this.onClose=e,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(t,e){for(this.pendingResponses[t]=e;this.pendingResponses[this.currentResponseNum];){const n=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let s=0;s<n.length;++s)n[s]&&bt(()=>{this.onMessage_(n[s])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
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
 */const In="start";class _t{constructor(t,e,n,s,r,o,a){this.connId=t,this.repoInfo=e,this.applicationId=n,this.appCheckToken=s,this.authToken=r,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=jt(t),this.stats_=je(e),this.urlFn=h=>(this.appCheckToken&&(h[Ne]=this.appCheckToken),_i(e,di,h))}open(t,e){this.curSegmentNum=0,this.onDisconnect_=e,this.myPacketOrderer=new rr(t),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(3e4)),function(n){if(document.readyState==="complete")n();else{let s=!1;const r=function(){document.body?s||(s=!0,n()):setTimeout(r,Math.floor(10))};document.addEventListener?(document.addEventListener("DOMContentLoaded",r,!1),window.addEventListener("load",r,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&r()}),window.attachEvent("onload",r))}}(()=>{if(this.isClosed_)return;this.scriptTagHolder=new Be((...r)=>{const[o,a,h,l,d]=r;if(this.incrementIncomingBytes_(r),this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===In)this.id=a,this.password=h;else{if(o!=="close")throw new Error("Unrecognized command received: "+o);a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_()}},(...r)=>{const[o,a]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const n={};n[In]="t",n.ser=Math.floor(1e8*Math.random()),this.scriptTagHolder.uniqueCallbackIdentifier&&(n.cb=this.scriptTagHolder.uniqueCallbackIdentifier),n.v="5",this.transportSessionId&&(n.s=this.transportSessionId),this.lastSessionId&&(n.ls=this.lastSessionId),this.applicationId&&(n.p=this.applicationId),this.appCheckToken&&(n[Ne]=this.appCheckToken),typeof location<"u"&&location.hostname&&ci.test(location.hostname)&&(n.r="f");const s=this.urlFn(n);this.log_("Connecting via long-poll to "+s),this.scriptTagHolder.addTag(s,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){_t.forceAllow_=!0}static forceDisallow(){_t.forceDisallow_=!0}static isAvailable(){return!!_t.forceAllow_||!(_t.forceDisallow_||typeof document>"u"||document.createElement==null||typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href)||typeof Windows=="object"&&typeof Windows.UI=="object")}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(t){const e=M(t);this.bytesSent+=e.length,this.stats_.incrementCounter("bytes_sent",e.length);const n=Gn(e),s=hi(n,1840);for(let r=0;r<s.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,s.length,s[r]),this.curSegmentNum++}addDisconnectPingFrame(t,e){this.myDisconnFrame=document.createElement("iframe");const n={dframe:"t"};n.id=t,n.pw=e,this.myDisconnFrame.src=this.urlFn(n),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(t){const e=M(t).length;this.bytesReceived+=e,this.stats_.incrementCounter("bytes_received",e)}}class Be{constructor(t,e,n,s){this.onDisconnect=n,this.urlFn=s,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(1e8*Math.random()),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=Zs(),window["pLPCommand"+this.uniqueCallbackIdentifier]=t,window["pRTLPCB"+this.uniqueCallbackIdentifier]=e,this.myIFrame=Be.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){L("frame writing exception"),a.stack&&L(a.stack),L(a)}}}static createIFrame_(){const t=document.createElement("iframe");if(t.style.display="none",!document.body)throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";document.body.appendChild(t);try{t.contentWindow.document||L("No IE domain setting required")}catch{const n=document.domain;t.src="javascript:void((function(){document.open();document.domain='"+n+"';document.close();})())"}return t.contentDocument?t.doc=t.contentDocument:t.contentWindow?t.doc=t.contentWindow.document:t.document&&(t.doc=t.document),t}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const t=this.onDisconnect;t&&(this.onDisconnect=null,t())}startLongPoll(t,e){for(this.myID=t,this.myPW=e,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const t={};t.id=this.myID,t.pw=this.myPW,t.ser=this.currentSerial;let e=this.urlFn(t),n="",s=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+30+n.length<=1870;){const r=this.pendingSegs.shift();n=n+"&seg"+s+"="+r.seg+"&ts"+s+"="+r.ts+"&d"+s+"="+r.d,s++}return e+=n,this.addLongPollTag_(e,this.currentSerial),!0}return!1}enqueueSegment(t,e,n){this.pendingSegs.push({seg:t,ts:e,d:n}),this.alive&&this.newRequest_()}addLongPollTag_(t,e){this.outstandingRequests.add(e);const n=()=>{this.outstandingRequests.delete(e),this.newRequest_()},s=setTimeout(n,Math.floor(25e3));this.addTag(t,()=>{clearTimeout(s),n()})}addTag(t,e){setTimeout(()=>{try{if(!this.sendNewPolls)return;const n=this.myIFrame.doc.createElement("script");n.type="text/javascript",n.async=!0,n.src=t,n.onload=n.onreadystatechange=function(){const s=n.readyState;s&&s!=="loaded"&&s!=="complete"||(n.onload=n.onreadystatechange=null,n.parentNode&&n.parentNode.removeChild(n),e())},n.onerror=()=>{L("Long-poll script failed to load: "+t),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(n)}catch{}},Math.floor(1))}}/**
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
 */let Zt=null;typeof MozWebSocket<"u"?Zt=MozWebSocket:typeof WebSocket<"u"&&(Zt=WebSocket);class B{constructor(t,e,n,s,r,o,a){this.connId=t,this.applicationId=n,this.appCheckToken=s,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=jt(this.connId),this.stats_=je(e),this.connURL=B.connectionURL_(e,o,a,s,n),this.nodeAdmin=e.nodeAdmin}static connectionURL_(t,e,n,s,r){const o={v:"5"};return typeof location<"u"&&location.hostname&&ci.test(location.hostname)&&(o.r="f"),e&&(o.s=e),n&&(o.ls=n),s&&(o[Ne]=s),r&&(o.p=r),_i(t,ui,o)}open(t,e){this.onDisconnect=e,this.onMessage=t,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,ot.set("previous_websocket_failure",!0);try{let n;Zn(),this.mySock=new Zt(this.connURL,[],n)}catch(n){this.log_("Error instantiating WebSocket.");const s=n.message||n.data;return s&&this.log_(s),void this.onClosed_()}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=n=>{this.handleIncomingFrame(n)},this.mySock.onerror=n=>{this.log_("WebSocket error.  Closing connection.");const s=n.message||n.data;s&&this.log_(s),this.onClosed_()}}start(){}static forceDisallow(){B.forceDisallow_=!0}static isAvailable(){let t=!1;if(typeof navigator<"u"&&navigator.userAgent){const e=/Android ([0-9]{0,}\.[0-9]{0,})/,n=navigator.userAgent.match(e);n&&n.length>1&&parseFloat(n[1])<4.4&&(t=!0)}return!t&&Zt!==null&&!B.forceDisallow_}static previouslyFailed(){return ot.isInMemoryStorage||ot.get("previous_websocket_failure")===!0}markConnectionHealthy(){ot.remove("previous_websocket_failure")}appendFrame_(t){if(this.frames.push(t),this.frames.length===this.totalFrames){const e=this.frames.join("");this.frames=null;const n=Ot(e);this.onMessage(n)}}handleNewFrameCount_(t){this.totalFrames=t,this.frames=[]}extractFrameCount_(t){if(f(this.frames===null,"We already have a frame buffer"),t.length<=6){const e=Number(t);if(!isNaN(e))return this.handleNewFrameCount_(e),null}return this.handleNewFrameCount_(1),t}handleIncomingFrame(t){if(this.mySock===null)return;const e=t.data;if(this.bytesReceived+=e.length,this.stats_.incrementCounter("bytes_received",e.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(e);else{const n=this.extractFrameCount_(e);n!==null&&this.appendFrame_(n)}}send(t){this.resetKeepAlive();const e=M(t);this.bytesSent+=e.length,this.stats_.incrementCounter("bytes_sent",e.length);const n=hi(e,16384);n.length>1&&this.sendString_(String(n.length));for(let s=0;s<n.length;s++)this.sendString_(n[s])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(45e3))}sendString_(t){try{this.mySock.send(t)}catch(e){this.log_("Exception thrown from WebSocket.send():",e.message||e.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}B.responsesRequiredToBeHealthy=2,B.healthyTimeout=3e4;/**
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
 */class qt{constructor(t){this.initTransports_(t)}static get ALL_TRANSPORTS(){return[_t,B]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}initTransports_(t){const e=B&&B.isAvailable();let n=e&&!B.previouslyFailed();if(t.webSocketOnly&&(e||U("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),n=!0),n)this.transports_=[B];else{const s=this.transports_=[];for(const r of qt.ALL_TRANSPORTS)r&&r.isAvailable()&&s.push(r);qt.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}qt.globalTransportInitialized_=!1;class or{constructor(t,e,n,s,r,o,a,h,l,d){this.id=t,this.repoInfo_=e,this.applicationId_=n,this.appCheckToken_=s,this.authToken_=r,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=h,this.onKill_=l,this.lastSessionId=d,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=jt("c:"+this.id+":"),this.transportManager_=new qt(e),this.log_("Connection created"),this.start_()}start_(){const t=this.transportManager_.initialTransport();this.conn_=new t(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=t.responsesRequiredToBeHealthy||0;const e=this.connReceiver_(this.conn_),n=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(e,n)},Math.floor(0));const s=t.healthyTimeout||0;s>0&&(this.healthyTimeout_=Pt(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>102400?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>10240?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(s)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(t){return e=>{t===this.conn_?this.onConnectionLost_(e):t===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(t){return e=>{this.state_!==2&&(t===this.rx_?this.onPrimaryMessageReceived_(e):t===this.secondaryConn_?this.onSecondaryMessageReceived_(e):this.log_("message on old connection"))}}sendRequest(t){const e={t:"d",d:t};this.sendData_(e)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(t){if("t"in t){const e=t.t;e==="a"?this.upgradeIfSecondaryHealthy_():e==="r"?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),this.tx_!==this.secondaryConn_&&this.rx_!==this.secondaryConn_||this.close()):e==="o"&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(t){const e=Tt("t",t),n=Tt("d",t);if(e==="c")this.onSecondaryControl_(n);else{if(e!=="d")throw new Error("Unknown protocol layer: "+e);this.pendingDataMessages.push(n)}}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:"p",d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:"a",d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:"n",d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(t){const e=Tt("t",t),n=Tt("d",t);e==="c"?this.onControl_(n):e==="d"&&this.onDataMessage_(n)}onDataMessage_(t){this.onPrimaryResponse_(),this.onMessage_(t)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(t){const e=Tt("t",t);if("d"in t){const n=t.d;if(e==="h"){const s=Object.assign({},n);this.repoInfo_.isUsingEmulator&&(s.h=this.repoInfo_.host),this.onHandshake_(s)}else if(e==="n"){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let s=0;s<this.pendingDataMessages.length;++s)this.onDataMessage_(this.pendingDataMessages[s]);this.pendingDataMessages=[],this.tryCleanupConnection()}else e==="s"?this.onConnectionShutdown_(n):e==="r"?this.onReset_(n):e==="e"?ke("Server Error: "+n):e==="o"?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):ke("Unknown control packet command: "+e)}}onHandshake_(t){const e=t.ts,n=t.v,s=t.h;this.sessionId=t.s,this.repoInfo_.host=s,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,e),n!=="5"&&U("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const t=this.transportManager_.upgradeTransport();t&&this.startUpgrade_(t)}startUpgrade_(t){this.secondaryConn_=new t(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=t.responsesRequiredToBeHealthy||0;const e=this.connReceiver_(this.secondaryConn_),n=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(e,n),Pt(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(6e4))}onReset_(t){this.log_("Reset packet received.  New host: "+t),this.repoInfo_.host=t,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(t,e){this.log_("Realtime connection established."),this.conn_=t,this.state_=1,this.onReady_&&(this.onReady_(e,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):Pt(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(5e3))}sendPingOnPrimaryIfNecessary_(){this.isHealthy_||this.state_!==1||(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:"p",d:{}}}))}onSecondaryConnectionLost_(){const t=this.secondaryConn_;this.secondaryConn_=null,this.tx_!==t&&this.rx_!==t||this.close()}onConnectionLost_(t){this.conn_=null,t||this.state_!==0?this.state_===1&&this.log_("Realtime connection lost."):(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(ot.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)),this.close()}onConnectionShutdown_(t){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(t),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(t){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(t)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
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
 */class fi{put(t,e,n,s){}merge(t,e,n,s){}refreshAuthToken(t){}refreshAppCheckToken(t){}onDisconnectPut(t,e,n){}onDisconnectMerge(t,e,n){}onDisconnectCancel(t,e){}reportStats(t){}}/**
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
 */class mi{constructor(t){this.allowedEvents_=t,this.listeners_={},f(Array.isArray(t)&&t.length>0,"Requires a non-empty array")}trigger(t,...e){if(Array.isArray(this.listeners_[t])){const n=[...this.listeners_[t]];for(let s=0;s<n.length;s++)n[s].callback.apply(n[s].context,e)}}on(t,e,n){this.validateEventType_(t),this.listeners_[t]=this.listeners_[t]||[],this.listeners_[t].push({callback:e,context:n});const s=this.getInitialEvent(t);s&&e.apply(n,s)}off(t,e,n){this.validateEventType_(t);const s=this.listeners_[t]||[];for(let r=0;r<s.length;r++)if(s[r].callback===e&&(!n||n===s[r].context))return void s.splice(r,1)}validateEventType_(t){f(this.allowedEvents_.find(e=>e===t),"Unknown event: "+t)}}/**
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
 */class te extends mi{constructor(){super(["online"]),this.online_=!0,typeof window>"u"||window.addEventListener===void 0||Xn()||(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}static getInstance(){return new te}getInitialEvent(t){return f(t==="online","Unknown event type: "+t),[this.online_]}currentlyOnline(){return this.online_}}/**
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
 */class P{constructor(t,e){if(e===void 0){this.pieces_=t.split("/");let n=0;for(let s=0;s<this.pieces_.length;s++)this.pieces_[s].length>0&&(this.pieces_[n]=this.pieces_[s],n++);this.pieces_.length=n,this.pieceNum_=0}else this.pieces_=t,this.pieceNum_=e}toString(){let t="";for(let e=this.pieceNum_;e<this.pieces_.length;e++)this.pieces_[e]!==""&&(t+="/"+this.pieces_[e]);return t||"/"}}function S(){return new P("")}function C(i){return i.pieceNum_>=i.pieces_.length?null:i.pieces_[i.pieceNum_]}function it(i){return i.pieces_.length-i.pieceNum_}function R(i){let t=i.pieceNum_;return t<i.pieces_.length&&t++,new P(i.pieces_,t)}function gi(i){return i.pieceNum_<i.pieces_.length?i.pieces_[i.pieces_.length-1]:null}function yi(i,t=0){return i.pieces_.slice(i.pieceNum_+t)}function vi(i){if(i.pieceNum_>=i.pieces_.length)return null;const t=[];for(let e=i.pieceNum_;e<i.pieces_.length-1;e++)t.push(i.pieces_[e]);return new P(t,0)}function D(i,t){const e=[];for(let n=i.pieceNum_;n<i.pieces_.length;n++)e.push(i.pieces_[n]);if(t instanceof P)for(let n=t.pieceNum_;n<t.pieces_.length;n++)e.push(t.pieces_[n]);else{const n=t.split("/");for(let s=0;s<n.length;s++)n[s].length>0&&e.push(n[s])}return new P(e,0)}function b(i){return i.pieceNum_>=i.pieces_.length}function H(i,t){const e=C(i),n=C(t);if(e===null)return t;if(e===n)return H(R(i),R(t));throw new Error("INTERNAL ERROR: innerPath ("+t+") is not within outerPath ("+i+")")}function Ci(i,t){if(it(i)!==it(t))return!1;for(let e=i.pieceNum_,n=t.pieceNum_;e<=i.pieces_.length;e++,n++)if(i.pieces_[e]!==t.pieces_[n])return!1;return!0}function z(i,t){let e=i.pieceNum_,n=t.pieceNum_;if(it(i)>it(t))return!1;for(;e<i.pieces_.length;){if(i.pieces_[e]!==t.pieces_[n])return!1;++e,++n}return!0}class ar{constructor(t,e){this.errorPrefix_=e,this.parts_=yi(t,0),this.byteLength_=Math.max(1,this.parts_.length);for(let n=0;n<this.parts_.length;n++)this.byteLength_+=Vt(this.parts_[n]);wi(this)}}function wi(i){if(i.byteLength_>768)throw new Error(i.errorPrefix_+"has a key path longer than 768 bytes ("+i.byteLength_+").");if(i.parts_.length>32)throw new Error(i.errorPrefix_+"path specified exceeds the maximum depth that can be written (32) or object contains a cycle "+rt(i))}function rt(i){return i.parts_.length===0?"":"in property '"+i.parts_.join(".")+"'"}/**
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
 */class ze extends mi{constructor(){let t,e;super(["visible"]),typeof document<"u"&&document.addEventListener!==void 0&&(document.hidden!==void 0?(e="visibilitychange",t="hidden"):document.mozHidden!==void 0?(e="mozvisibilitychange",t="mozHidden"):document.msHidden!==void 0?(e="msvisibilitychange",t="msHidden"):document.webkitHidden!==void 0&&(e="webkitvisibilitychange",t="webkitHidden")),this.visible_=!0,e&&document.addEventListener(e,()=>{const n=!document[t];n!==this.visible_&&(this.visible_=n,this.trigger("visible",n))},!1)}static getInstance(){return new ze}getInitialEvent(t){return f(t==="visible","Unknown event type: "+t),[this.visible_]}}/**
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
 */const St=1e3;class Y extends fi{constructor(t,e,n,s,r,o,a,h){if(super(),this.repoInfo_=t,this.applicationId_=e,this.onDataUpdate_=n,this.onConnectStatus_=s,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=h,this.id=Y.nextPersistentConnectionId_++,this.log_=jt("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=St,this.maxReconnectDelay_=3e5,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,h&&!Zn())throw new Error("Auth override specified in options, but not supported on non Node.js platforms");ze.getInstance().on("visible",this.onVisible_,this),t.host.indexOf("fblocal")===-1&&te.getInstance().on("online",this.onOnline_,this)}sendRequest(t,e,n){const s=++this.requestNumber_,r={r:s,a:t,b:e};this.log_(M(r)),f(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),n&&(this.requestCBHash_[s]=n)}get(t){this.initConnection_();const e=new ae,n={action:"g",request:{p:t._path.toString(),q:t._queryObject},onComplete:r=>{const o=r.d;r.s==="ok"?e.resolve(o):e.reject(o)}};this.outstandingGets_.push(n),this.outstandingGetCount_++;const s=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(s),e.promise}listen(t,e,n,s){this.initConnection_();const r=t._queryIdentifier,o=t._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),f(t._queryParams.isDefault()||!t._queryParams.loadsAllData(),"listen() called for non-default but complete query"),f(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const a={onComplete:s,hashFn:e,query:t,tag:n};this.listens.get(o).set(r,a),this.connected_&&this.sendListen_(a)}sendGet_(t){const e=this.outstandingGets_[t];this.sendRequest("g",e.request,n=>{delete this.outstandingGets_[t],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),e.onComplete&&e.onComplete(n)})}sendListen_(t){const e=t.query,n=e._path.toString(),s=e._queryIdentifier;this.log_("Listen on "+n+" for "+s);const r={p:n};t.tag&&(r.q=e._queryObject,r.t=t.tag),r.h=t.hashFn(),this.sendRequest("q",r,o=>{const a=o.d,h=o.s;Y.warnOnListenWarnings_(a,e),(this.listens.get(n)&&this.listens.get(n).get(s))===t&&(this.log_("listen response",o),h!=="ok"&&this.removeListen_(n,s),t.onComplete&&t.onComplete(h,a))})}static warnOnListenWarnings_(t,e){if(t&&typeof t=="object"&&X(t,"w")){const n=gt(t,"w");if(Array.isArray(n)&&~n.indexOf("no_index")){const s='".indexOn": "'+e._queryParams.getIndex().toString()+'"',r=e._path.toString();U(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${s} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(t){this.authToken_=t,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(t)}reduceReconnectDelayIfAdminCredential_(t){(t&&t.length===40||function(e){const n=ln(e).claims;return typeof n=="object"&&n.admin===!0}(t))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=3e4)}refreshAppCheckToken(t){this.appCheckToken_=t,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const t=this.authToken_,e=function(s){const r=ln(s).claims;return!!r&&typeof r=="object"&&r.hasOwnProperty("iat")}(t)?"auth":"gauth",n={cred:t};this.authOverride_===null?n.noauth=!0:typeof this.authOverride_=="object"&&(n.authvar=this.authOverride_),this.sendRequest(e,n,s=>{const r=s.s,o=s.d||"error";this.authToken_===t&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},t=>{const e=t.s,n=t.d||"error";e==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(e,n)})}unlisten(t,e){const n=t._path.toString(),s=t._queryIdentifier;this.log_("Unlisten called for "+n+" "+s),f(t._queryParams.isDefault()||!t._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(n,s)&&this.connected_&&this.sendUnlisten_(n,s,t._queryObject,e)}sendUnlisten_(t,e,n,s){this.log_("Unlisten on "+t+" for "+e);const r={p:t};s&&(r.q=n,r.t=s),this.sendRequest("n",r)}onDisconnectPut(t,e,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",t,e,n):this.onDisconnectRequestQueue_.push({pathString:t,action:"o",data:e,onComplete:n})}onDisconnectMerge(t,e,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",t,e,n):this.onDisconnectRequestQueue_.push({pathString:t,action:"om",data:e,onComplete:n})}onDisconnectCancel(t,e){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",t,null,e):this.onDisconnectRequestQueue_.push({pathString:t,action:"oc",data:null,onComplete:e})}sendOnDisconnect_(t,e,n,s){const r={p:e,d:n};this.log_("onDisconnect "+t,r),this.sendRequest(t,r,o=>{s&&setTimeout(()=>{s(o.s,o.d)},Math.floor(0))})}put(t,e,n,s){this.putInternal("p",t,e,n,s)}merge(t,e,n,s){this.putInternal("m",t,e,n,s)}putInternal(t,e,n,s,r){this.initConnection_();const o={p:e,d:n};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:t,request:o,onComplete:s}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+e)}sendPut_(t){const e=this.outstandingPuts_[t].action,n=this.outstandingPuts_[t].request,s=this.outstandingPuts_[t].onComplete;this.outstandingPuts_[t].queued=this.connected_,this.sendRequest(e,n,r=>{this.log_(e+" response",r),delete this.outstandingPuts_[t],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),s&&s(r.s,r.d)})}reportStats(t){if(this.connected_){const e={c:t};this.log_("reportStats",e),this.sendRequest("s",e,n=>{if(n.s!=="ok"){const s=n.d;this.log_("reportStats","Error sending stats: "+s)}})}}onDataMessage_(t){if("r"in t){this.log_("from server: "+M(t));const e=t.r,n=this.requestCBHash_[e];n&&(delete this.requestCBHash_[e],n(t.b))}else{if("error"in t)throw"A server-side error has occurred: "+t.error;"a"in t&&this.onDataPush_(t.a,t.b)}}onDataPush_(t,e){this.log_("handleServerMessage",t,e),t==="d"?this.onDataUpdate_(e.p,e.d,!1,e.t):t==="m"?this.onDataUpdate_(e.p,e.d,!0,e.t):t==="c"?this.onListenRevoked_(e.p,e.q):t==="ac"?this.onAuthRevoked_(e.s,e.d):t==="apc"?this.onAppCheckRevoked_(e.s,e.d):t==="sd"?this.onSecurityDebugPacket_(e):ke("Unrecognized action received from server: "+M(t)+`
Are you using the latest client?`)}onReady_(t,e){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(t),this.lastSessionId=e,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(t){f(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(t))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(t){t&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=St,this.realtime_||this.scheduleConnect_(0)),this.visible_=t}onOnline_(t){t?(this.log_("Browser went online."),this.reconnectDelay_=St,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>3e4&&(this.reconnectDelay_=St),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const t=new Date().getTime()-this.lastConnectionAttemptTime_;let e=Math.max(0,this.reconnectDelay_-t);e=Math.random()*e,this.log_("Trying to reconnect in "+e+"ms"),this.scheduleConnect_(e),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,1.3*this.reconnectDelay_)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const t=this.onDataMessage_.bind(this),e=this.onReady_.bind(this),n=this.onRealtimeDisconnect_.bind(this),s=this.id+":"+Y.nextConnectionId_++,r=this.lastSessionId;let o=!1,a=null;const h=function(){a?a.close():(o=!0,n())},l=function(c){f(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(c)};this.realtime_={close:h,sendRequest:l};const d=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[c,u]=await Promise.all([this.authTokenProvider_.getToken(d),this.appCheckTokenProvider_.getToken(d)]);o?L("getToken() completed but was canceled"):(L("getToken() completed. Creating connection."),this.authToken_=c&&c.accessToken,this.appCheckToken_=u&&u.token,a=new or(s,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,t,e,n,p=>{U(p+" ("+this.repoInfo_.toString()+")"),this.interrupt("server_kill")},r))}catch(c){this.log_("Failed to get token: "+c),o||(this.repoInfo_.nodeAdmin&&U(c),h())}}}interrupt(t){L("Interrupting connection for reason: "+t),this.interruptReasons_[t]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(t){L("Resuming connection for reason: "+t),delete this.interruptReasons_[t],cn(this.interruptReasons_)&&(this.reconnectDelay_=St,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(t){const e=t-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:e})}cancelSentTransactions_(){for(let t=0;t<this.outstandingPuts_.length;t++){const e=this.outstandingPuts_[t];e&&"h"in e.request&&e.queued&&(e.onComplete&&e.onComplete("disconnect"),delete this.outstandingPuts_[t],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(t,e){let n;n=e?e.map(r=>He(r)).join("$"):"default";const s=this.removeListen_(t,n);s&&s.onComplete&&s.onComplete("permission_denied")}removeListen_(t,e){const n=new P(t).toString();let s;if(this.listens.has(n)){const r=this.listens.get(n);s=r.get(e),r.delete(e),r.size===0&&this.listens.delete(n)}else s=void 0;return s}onAuthRevoked_(t,e){L("Auth token revoked: "+t+"/"+e),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),t!=="invalid_token"&&t!=="permission_denied"||(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=3&&(this.reconnectDelay_=3e4,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(t,e){L("App check token revoked: "+t+"/"+e),this.appCheckToken_=null,this.forceTokenRefresh_=!0,t!=="invalid_token"&&t!=="permission_denied"||(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=3&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(t){this.securityDebugCallback_?this.securityDebugCallback_(t):"msg"in t&&console.log("FIREBASE: "+t.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const t of this.listens.values())for(const e of t.values())this.sendListen_(e);for(let t=0;t<this.outstandingPuts_.length;t++)this.outstandingPuts_[t]&&this.sendPut_(t);for(;this.onDisconnectRequestQueue_.length;){const t=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(t.action,t.pathString,t.data,t.onComplete)}for(let t=0;t<this.outstandingGets_.length;t++)this.outstandingGets_[t]&&this.sendGet_(t)}sendConnectStats_(){const t={};t["sdk.js."+si.replace(/\./g,"-")]=1,Xn()?t["framework.cordova"]=1:typeof navigator=="object"&&navigator.product==="ReactNative"&&(t["framework.reactnative"]=1),this.reportStats(t)}shouldReconnect_(){const t=te.getInstance().currentlyOnline();return cn(this.interruptReasons_)&&t}}Y.nextPersistentConnectionId_=0,Y.nextConnectionId_=0;/**
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
 */class I{constructor(t,e){this.name=t,this.node=e}static Wrap(t,e){return new I(t,e)}}/**
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
 */class he{getCompare(){return this.compare.bind(this)}indexedValueChanged(t,e){const n=new I(yt,t),s=new I(yt,e);return this.compare(n,s)!==0}minPost(){return I.MIN}}/**
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
 */let zt;class bi extends he{static get __EMPTY_NODE(){return zt}static set __EMPTY_NODE(t){zt=t}compare(t,e){return wt(t.name,e.name)}isDefinedOn(t){throw Ct("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(t,e){return!1}minPost(){return I.MIN}maxPost(){return new I(ht,zt)}makePost(t,e){return f(typeof t=="string","KeyIndex indexValue must always be a string."),new I(t,zt)}toString(){return".key"}}const mt=new bi;/**
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
 */class $t{constructor(t,e,n,s,r=null){this.isReverse_=s,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!t.isEmpty();)if(o=e?n(t.key,e):1,s&&(o*=-1),o<0)t=this.isReverse_?t.left:t.right;else{if(o===0){this.nodeStack_.push(t);break}this.nodeStack_.push(t),t=this.isReverse_?t.right:t.left}}getNext(){if(this.nodeStack_.length===0)return null;let t,e=this.nodeStack_.pop();if(t=this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return t}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const t=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(t.key,t.value):{key:t.key,value:t.value}}}class A{constructor(t,e,n,s,r){this.key=t,this.value=e,this.color=n??A.RED,this.left=s??W.EMPTY_NODE,this.right=r??W.EMPTY_NODE}copy(t,e,n,s,r){return new A(t??this.key,e??this.value,n??this.color,s??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||!!t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,n){let s=this;const r=n(t,s.key);return s=r<0?s.copy(null,null,null,s.left.insert(t,e,n),null):r===0?s.copy(null,e,null,null,null):s.copy(null,null,null,null,s.right.insert(t,e,n)),s.fixUp_()}removeMin_(){if(this.left.isEmpty())return W.EMPTY_NODE;let t=this;return t.left.isRed_()||t.left.left.isRed_()||(t=t.moveRedLeft_()),t=t.copy(null,null,null,t.left.removeMin_(),null),t.fixUp_()}remove(t,e){let n,s;if(n=this,e(t,n.key)<0)n.left.isEmpty()||n.left.isRed_()||n.left.left.isRed_()||(n=n.moveRedLeft_()),n=n.copy(null,null,null,n.left.remove(t,e),null);else{if(n.left.isRed_()&&(n=n.rotateRight_()),n.right.isEmpty()||n.right.isRed_()||n.right.left.isRed_()||(n=n.moveRedRight_()),e(t,n.key)===0){if(n.right.isEmpty())return W.EMPTY_NODE;s=n.right.min_(),n=n.copy(s.key,s.value,null,null,n.right.removeMin_())}n=n.copy(null,null,null,null,n.right.remove(t,e))}return n.fixUp_()}isRed_(){return this.color}fixUp_(){let t=this;return t.right.isRed_()&&!t.left.isRed_()&&(t=t.rotateLeft_()),t.left.isRed_()&&t.left.left.isRed_()&&(t=t.rotateRight_()),t.left.isRed_()&&t.right.isRed_()&&(t=t.colorFlip_()),t}moveRedLeft_(){let t=this.colorFlip_();return t.right.left.isRed_()&&(t=t.copy(null,null,null,null,t.right.rotateRight_()),t=t.rotateLeft_(),t=t.colorFlip_()),t}moveRedRight_(){let t=this.colorFlip_();return t.left.left.isRed_()&&(t=t.rotateRight_(),t=t.colorFlip_()),t}rotateLeft_(){const t=this.copy(null,null,A.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight_(){const t=this.copy(null,null,A.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip_(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth_(){const t=this.check_();return Math.pow(2,t)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const t=this.left.check_();if(t!==this.right.check_())throw new Error("Black depths differ");return t+(this.isRed_()?0:1)}}A.RED=!0,A.BLACK=!1;class W{constructor(t,e=W.EMPTY_NODE){this.comparator_=t,this.root_=e}insert(t,e){return new W(this.comparator_,this.root_.insert(t,e,this.comparator_).copy(null,null,A.BLACK,null,null))}remove(t){return new W(this.comparator_,this.root_.remove(t,this.comparator_).copy(null,null,A.BLACK,null,null))}get(t){let e,n=this.root_;for(;!n.isEmpty();){if(e=this.comparator_(t,n.key),e===0)return n.value;e<0?n=n.left:e>0&&(n=n.right)}return null}getPredecessorKey(t){let e,n=this.root_,s=null;for(;!n.isEmpty();){if(e=this.comparator_(t,n.key),e===0){if(n.left.isEmpty())return s?s.key:null;for(n=n.left;!n.right.isEmpty();)n=n.right;return n.key}e<0?n=n.left:e>0&&(s=n,n=n.right)}throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(t){return this.root_.inorderTraversal(t)}reverseTraversal(t){return this.root_.reverseTraversal(t)}getIterator(t){return new $t(this.root_,null,this.comparator_,!1,t)}getIteratorFrom(t,e){return new $t(this.root_,t,this.comparator_,!1,e)}getReverseIteratorFrom(t,e){return new $t(this.root_,t,this.comparator_,!0,e)}getReverseIterator(t){return new $t(this.root_,null,this.comparator_,!0,t)}}/**
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
 */function hr(i,t){return wt(i.name,t.name)}function $e(i,t){return wt(i,t)}/**
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
 */let Re;W.EMPTY_NODE=new class{copy(i,t,e,n,s){return this}insert(i,t,e){return new A(i,t,null)}remove(i,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(i){return!1}reverseTraversal(i){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}};const Ii=function(i){return typeof i=="number"?"number:"+li(i):"string:"+i},Ti=function(i){if(i.isLeafNode()){const t=i.val();f(typeof t=="string"||typeof t=="number"||typeof t=="object"&&X(t,".sv"),"Priority must be a string or number.")}else f(i===Re||i.isEmpty(),"priority of unexpected type.");f(i===Re||i.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
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
 */let Tn,Si,Ei;class x{constructor(t,e=x.__childrenNodeConstructor.EMPTY_NODE){this.value_=t,this.priorityNode_=e,this.lazyHash_=null,f(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),Ti(this.priorityNode_)}static set __childrenNodeConstructor(t){Tn=t}static get __childrenNodeConstructor(){return Tn}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(t){return new x(this.value_,t)}getImmediateChild(t){return t===".priority"?this.priorityNode_:x.__childrenNodeConstructor.EMPTY_NODE}getChild(t){return b(t)?this:C(t)===".priority"?this.priorityNode_:x.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(t,e){return null}updateImmediateChild(t,e){return t===".priority"?this.updatePriority(e):e.isEmpty()&&t!==".priority"?this:x.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(t,e).updatePriority(this.priorityNode_)}updateChild(t,e){const n=C(t);return n===null?e:e.isEmpty()&&n!==".priority"?this:(f(n!==".priority"||it(t)===1,".priority must be the last token in a path"),this.updateImmediateChild(n,x.__childrenNodeConstructor.EMPTY_NODE.updateChild(R(t),e)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(t,e){return!1}val(t){return t&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let t="";this.priorityNode_.isEmpty()||(t+="priority:"+Ii(this.priorityNode_.val())+":");const e=typeof this.value_;t+=e+":",t+=e==="number"?li(this.value_):this.value_,this.lazyHash_=oi(t)}return this.lazyHash_}getValue(){return this.value_}compareTo(t){return t===x.__childrenNodeConstructor.EMPTY_NODE?1:t instanceof x.__childrenNodeConstructor?-1:(f(t.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(t))}compareToLeafNode_(t){const e=typeof t.value_,n=typeof this.value_,s=x.VALUE_TYPE_ORDER.indexOf(e),r=x.VALUE_TYPE_ORDER.indexOf(n);return f(s>=0,"Unknown leaf type: "+e),f(r>=0,"Unknown leaf type: "+n),s===r?n==="object"?0:this.value_<t.value_?-1:this.value_===t.value_?0:1:r-s}withIndex(){return this}isIndexed(){return!0}equals(t){if(t===this)return!0;if(t.isLeafNode()){const e=t;return this.value_===e.value_&&this.priorityNode_.equals(e.priorityNode_)}return!1}}x.VALUE_TYPE_ORDER=["object","boolean","number","string"];const F=new class extends he{compare(i,t){const e=i.node.getPriority(),n=t.node.getPriority(),s=e.compareTo(n);return s===0?wt(i.name,t.name):s}isDefinedOn(i){return!i.getPriority().isEmpty()}indexedValueChanged(i,t){return!i.getPriority().equals(t.getPriority())}minPost(){return I.MIN}maxPost(){return new I(ht,new x("[PRIORITY-POST]",Ei))}makePost(i,t){const e=Si(i);return new I(t,new x("[PRIORITY-POST]",e))}toString(){return".priority"}},lr=Math.log(2);/**
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
 */class cr{constructor(t){var e;this.count=(e=t+1,parseInt(Math.log(e)/lr,10)),this.current_=this.count-1;const n=(s=this.count,parseInt(Array(s+1).join("1"),2));var s;this.bits_=t+1&n}nextBitIsOne(){const t=!(this.bits_&1<<this.current_);return this.current_--,t}}const ee=function(i,t,e,n){i.sort(t);const s=function(o,a){const h=a-o;let l,d;if(h===0)return null;if(h===1)return l=i[o],d=e?e(l):l,new A(d,l.node,A.BLACK,null,null);{const c=parseInt(h/2,10)+o,u=s(o,c),p=s(c+1,a);return l=i[c],d=e?e(l):l,new A(d,l.node,A.BLACK,u,p)}},r=function(o){let a=null,h=null,l=i.length;const d=function(u,p){const _=l-u,m=l;l-=u;const g=s(_+1,m),y=i[_],v=e?e(y):y;c(new A(v,y.node,p,null,g))},c=function(u){a?(a.left=u,a=u):(h=u,a=u)};for(let u=0;u<o.count;++u){const p=o.nextBitIsOne(),_=Math.pow(2,o.count-(u+1));p?d(_,A.BLACK):(d(_,A.BLACK),d(_,A.RED))}return h}(new cr(i.length));return new W(n||t,r)};/**
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
 */let me;const pt={};class K{constructor(t,e){this.indexes_=t,this.indexSet_=e}static get Default(){return f(pt&&F,"ChildrenNode.ts has not been loaded"),me=me||new K({".priority":pt},{".priority":F}),me}get(t){const e=gt(this.indexes_,t);if(!e)throw new Error("No index defined for "+t);return e instanceof W?e:null}hasIndex(t){return X(this.indexSet_,t.toString())}addIndex(t,e){f(t!==mt,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const n=[];let s=!1;const r=e.getIterator(I.Wrap);let o,a=r.getNext();for(;a;)s=s||t.isDefinedOn(a.node),n.push(a),a=r.getNext();o=s?ee(n,t.getCompare()):pt;const h=t.toString(),l=Object.assign({},this.indexSet_);l[h]=t;const d=Object.assign({},this.indexes_);return d[h]=o,new K(d,l)}addToIndexes(t,e){const n=Qt(this.indexes_,(s,r)=>{const o=gt(this.indexSet_,r);if(f(o,"Missing index implementation for "+r),s===pt){if(o.isDefinedOn(t.node)){const a=[],h=e.getIterator(I.Wrap);let l=h.getNext();for(;l;)l.name!==t.name&&a.push(l),l=h.getNext();return a.push(t),ee(a,o.getCompare())}return pt}{const a=e.get(t.name);let h=s;return a&&(h=h.remove(new I(t.name,a))),h.insert(t,t.node)}});return new K(n,this.indexSet_)}removeFromIndexes(t,e){const n=Qt(this.indexes_,s=>{if(s===pt)return s;{const r=e.get(t.name);return r?s.remove(new I(t.name,r)):s}});return new K(n,this.indexSet_)}}/**
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
 */let Et;class T{constructor(t,e,n){this.children_=t,this.priorityNode_=e,this.indexMap_=n,this.lazyHash_=null,this.priorityNode_&&Ti(this.priorityNode_),this.children_.isEmpty()&&f(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}static get EMPTY_NODE(){return Et||(Et=new T(new W($e),null,K.Default))}isLeafNode(){return!1}getPriority(){return this.priorityNode_||Et}updatePriority(t){return this.children_.isEmpty()?this:new T(this.children_,t,this.indexMap_)}getImmediateChild(t){if(t===".priority")return this.getPriority();{const e=this.children_.get(t);return e===null?Et:e}}getChild(t){const e=C(t);return e===null?this:this.getImmediateChild(e).getChild(R(t))}hasChild(t){return this.children_.get(t)!==null}updateImmediateChild(t,e){if(f(e,"We should always be passing snapshot nodes"),t===".priority")return this.updatePriority(e);{const n=new I(t,e);let s,r;e.isEmpty()?(s=this.children_.remove(t),r=this.indexMap_.removeFromIndexes(n,this.children_)):(s=this.children_.insert(t,e),r=this.indexMap_.addToIndexes(n,this.children_));const o=s.isEmpty()?Et:this.priorityNode_;return new T(s,o,r)}}updateChild(t,e){const n=C(t);if(n===null)return e;{f(C(t)!==".priority"||it(t)===1,".priority must be the last token in a path");const s=this.getImmediateChild(n).updateChild(R(t),e);return this.updateImmediateChild(n,s)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(t){if(this.isEmpty())return null;const e={};let n=0,s=0,r=!0;if(this.forEachChild(F,(o,a)=>{e[o]=a.val(t),n++,r&&T.INTEGER_REGEXP_.test(o)?s=Math.max(s,Number(o)):r=!1}),!t&&r&&s<2*n){const o=[];for(const a in e)o[a]=e[a];return o}return t&&!this.getPriority().isEmpty()&&(e[".priority"]=this.getPriority().val()),e}hash(){if(this.lazyHash_===null){let t="";this.getPriority().isEmpty()||(t+="priority:"+Ii(this.getPriority().val())+":"),this.forEachChild(F,(e,n)=>{const s=n.hash();s!==""&&(t+=":"+e+":"+s)}),this.lazyHash_=t===""?"":oi(t)}return this.lazyHash_}getPredecessorChildName(t,e,n){const s=this.resolveIndex_(n);if(s){const r=s.getPredecessorKey(new I(t,e));return r?r.name:null}return this.children_.getPredecessorKey(t)}getFirstChildName(t){const e=this.resolveIndex_(t);if(e){const n=e.minKey();return n&&n.name}return this.children_.minKey()}getFirstChild(t){const e=this.getFirstChildName(t);return e?new I(e,this.children_.get(e)):null}getLastChildName(t){const e=this.resolveIndex_(t);if(e){const n=e.maxKey();return n&&n.name}return this.children_.maxKey()}getLastChild(t){const e=this.getLastChildName(t);return e?new I(e,this.children_.get(e)):null}forEachChild(t,e){const n=this.resolveIndex_(t);return n?n.inorderTraversal(s=>e(s.name,s.node)):this.children_.inorderTraversal(e)}getIterator(t){return this.getIteratorFrom(t.minPost(),t)}getIteratorFrom(t,e){const n=this.resolveIndex_(e);if(n)return n.getIteratorFrom(t,s=>s);{const s=this.children_.getIteratorFrom(t.name,I.Wrap);let r=s.peek();for(;r!=null&&e.compare(r,t)<0;)s.getNext(),r=s.peek();return s}}getReverseIterator(t){return this.getReverseIteratorFrom(t.maxPost(),t)}getReverseIteratorFrom(t,e){const n=this.resolveIndex_(e);if(n)return n.getReverseIteratorFrom(t,s=>s);{const s=this.children_.getReverseIteratorFrom(t.name,I.Wrap);let r=s.peek();for(;r!=null&&e.compare(r,t)>0;)s.getNext(),r=s.peek();return s}}compareTo(t){return this.isEmpty()?t.isEmpty()?0:-1:t.isLeafNode()||t.isEmpty()?1:t===Dt?-1:0}withIndex(t){if(t===mt||this.indexMap_.hasIndex(t))return this;{const e=this.indexMap_.addIndex(t,this.children_);return new T(this.children_,this.priorityNode_,e)}}isIndexed(t){return t===mt||this.indexMap_.hasIndex(t)}equals(t){if(t===this)return!0;if(t.isLeafNode())return!1;{const e=t;if(this.getPriority().equals(e.getPriority())){if(this.children_.count()===e.children_.count()){const n=this.getIterator(F),s=e.getIterator(F);let r=n.getNext(),o=s.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=n.getNext(),o=s.getNext()}return r===null&&o===null}return!1}return!1}}resolveIndex_(t){return t===mt?null:this.indexMap_.get(t.toString())}}T.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;const Dt=new class extends T{constructor(){super(new W($e),T.EMPTY_NODE,K.Default)}compareTo(i){return i===this?0:1}equals(i){return i===this}getPriority(){return this}getImmediateChild(i){return T.EMPTY_NODE}isEmpty(){return!1}};Object.defineProperties(I,{MIN:{value:new I(yt,T.EMPTY_NODE)},MAX:{value:new I(ht,Dt)}}),bi.__EMPTY_NODE=T.EMPTY_NODE,x.__childrenNodeConstructor=T,Re=Dt,function(i){Ei=i}(Dt);function O(i,t=null){if(i===null)return T.EMPTY_NODE;if(typeof i=="object"&&".priority"in i&&(t=i[".priority"]),f(t===null||typeof t=="string"||typeof t=="number"||typeof t=="object"&&".sv"in t,"Invalid priority type found: "+typeof t),typeof i=="object"&&".value"in i&&i[".value"]!==null&&(i=i[".value"]),typeof i!="object"||".sv"in i)return new x(i,O(t));if(i instanceof Array){let e=T.EMPTY_NODE;return j(i,(n,s)=>{if(X(i,n)&&n.substring(0,1)!=="."){const r=O(s);!r.isLeafNode()&&r.isEmpty()||(e=e.updateImmediateChild(n,r))}}),e.updatePriority(O(t))}{const e=[];let n=!1;if(j(i,(r,o)=>{if(r.substring(0,1)!=="."){const a=O(o);a.isEmpty()||(n=n||!a.getPriority().isEmpty(),e.push(new I(r,a)))}}),e.length===0)return T.EMPTY_NODE;const s=ee(e,hr,r=>r.name,$e);if(n){const r=ee(e,F.getCompare());return new T(s,O(t),new K({".priority":r},{".priority":F}))}return new T(s,O(t),K.Default)}}(function(i){Si=i})(O);/**
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
 */class ur extends he{constructor(t){super(),this.indexPath_=t,f(!b(t)&&C(t)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(t){return t.getChild(this.indexPath_)}isDefinedOn(t){return!t.getChild(this.indexPath_).isEmpty()}compare(t,e){const n=this.extractChild(t.node),s=this.extractChild(e.node),r=n.compareTo(s);return r===0?wt(t.name,e.name):r}makePost(t,e){const n=O(t),s=T.EMPTY_NODE.updateChild(this.indexPath_,n);return new I(e,s)}maxPost(){const t=T.EMPTY_NODE.updateChild(this.indexPath_,Dt);return new I(ht,t)}toString(){return yi(this.indexPath_,0).join("/")}}/**
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
 */const dr=new class extends he{compare(i,t){const e=i.node.compareTo(t.node);return e===0?wt(i.name,t.name):e}isDefinedOn(i){return!0}indexedValueChanged(i,t){return!i.equals(t)}minPost(){return I.MIN}maxPost(){return I.MAX}makePost(i,t){const e=O(i);return new I(t,e)}toString(){return".value"}};/**
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
 */function Sn(i,t,e){return{type:"child_changed",snapshotNode:t,childName:i,oldSnap:e}}/**
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
 */class Ve{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=F}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return f(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return f(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:yt}hasEnd(){return this.endSet_}getIndexEndValue(){return f(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return f(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:ht}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return f(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===F}copy(){const t=new Ve;return t.limitSet_=this.limitSet_,t.limit_=this.limit_,t.startSet_=this.startSet_,t.startAfterSet_=this.startAfterSet_,t.indexStartValue_=this.indexStartValue_,t.startNameSet_=this.startNameSet_,t.indexStartName_=this.indexStartName_,t.endSet_=this.endSet_,t.endBeforeSet_=this.endBeforeSet_,t.indexEndValue_=this.indexEndValue_,t.endNameSet_=this.endNameSet_,t.indexEndName_=this.indexEndName_,t.index_=this.index_,t.viewFrom_=this.viewFrom_,t}}function En(i){const t={};if(i.isDefault())return t;let e;if(i.index_===F?e="$priority":i.index_===dr?e="$value":i.index_===mt?e="$key":(f(i.index_ instanceof ur,"Unrecognized index type!"),e=i.index_.toString()),t.orderBy=M(e),i.startSet_){const n=i.startAfterSet_?"startAfter":"startAt";t[n]=M(i.indexStartValue_),i.startNameSet_&&(t[n]+=","+M(i.indexStartName_))}if(i.endSet_){const n=i.endBeforeSet_?"endBefore":"endAt";t[n]=M(i.indexEndValue_),i.endNameSet_&&(t[n]+=","+M(i.indexEndName_))}return i.limitSet_&&(i.isViewFromLeft()?t.limitToFirst=i.limit_:t.limitToLast=i.limit_),t}function kn(i){const t={};if(i.startSet_&&(t.sp=i.indexStartValue_,i.startNameSet_&&(t.sn=i.indexStartName_),t.sin=!i.startAfterSet_),i.endSet_&&(t.ep=i.indexEndValue_,i.endNameSet_&&(t.en=i.indexEndName_),t.ein=!i.endBeforeSet_),i.limitSet_){t.l=i.limit_;let e=i.viewFrom_;e===""&&(e=i.isViewFromLeft()?"l":"r"),t.vf=e}return i.index_!==F&&(t.i=i.index_.toString()),t}/**
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
 */class ne extends fi{constructor(t,e,n,s){super(),this.repoInfo_=t,this.onDataUpdate_=e,this.authTokenProvider_=n,this.appCheckTokenProvider_=s,this.log_=jt("p:rest:"),this.listens_={}}reportStats(t){throw new Error("Method not implemented.")}static getListenId_(t,e){return e!==void 0?"tag$"+e:(f(t._queryParams.isDefault(),"should have a tag if it's not a default query."),t._path.toString())}listen(t,e,n,s){const r=t._path.toString();this.log_("Listen called for "+r+" "+t._queryIdentifier);const o=ne.getListenId_(t,n),a={};this.listens_[o]=a;const h=En(t._queryParams);this.restRequest_(r+".json",h,(l,d)=>{let c=d;if(l===404&&(c=null,l=null),l===null&&this.onDataUpdate_(r,c,!1,n),gt(this.listens_,o)===a){let u;u=l?l===401?"permission_denied":"rest_error:"+l:"ok",s(u,null)}})}unlisten(t,e){const n=ne.getListenId_(t,e);delete this.listens_[n]}get(t){const e=En(t._queryParams),n=t._path.toString(),s=new ae;return this.restRequest_(n+".json",e,(r,o)=>{let a=o;r===404&&(a=null,r=null),r===null?(this.onDataUpdate_(n,a,!1,null),s.resolve(a)):s.reject(new Error(a))}),s.promise}refreshAuthToken(t){}restRequest_(t,e={},n){return e.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([s,r])=>{s&&s.accessToken&&(e.auth=s.accessToken),r&&r.token&&(e.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+t+"?ns="+this.repoInfo_.namespace+function(h){const l=[];for(const[d,c]of Object.entries(h))Array.isArray(c)?c.forEach(u=>{l.push(encodeURIComponent(d)+"="+encodeURIComponent(u))}):l.push(encodeURIComponent(d)+"="+encodeURIComponent(c));return l.length?"&"+l.join("&"):""}(e);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(n&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let h=null;if(a.status>=200&&a.status<300){try{h=Ot(a.responseText)}catch{U("Failed to parse JSON response for "+o+": "+a.responseText)}n(null,h)}else a.status!==401&&a.status!==404&&U("Got unsuccessful REST response for "+o+" Status: "+a.status),n(a.status);n=null}},a.open("GET",o,!0),a.send()})}}/**
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
 */class pr{constructor(){this.rootNode_=T.EMPTY_NODE}getNode(t){return this.rootNode_.getChild(t)}updateSnapshot(t,e){this.rootNode_=this.rootNode_.updateChild(t,e)}}/**
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
 */function ie(){return{value:null,children:new Map}}function ki(i,t,e){if(b(t))i.value=e,i.children.clear();else if(i.value!==null)i.value=i.value.updateChild(t,e);else{const n=C(t);i.children.has(n)||i.children.set(n,ie()),ki(i.children.get(n),t=R(t),e)}}function Pe(i,t,e){i.value!==null?e(t,i.value):function(n,s){n.children.forEach((r,o)=>{s(o,r)})}(i,(n,s)=>{Pe(s,new P(t.toString()+"/"+n),e)})}class _r{constructor(t){this.collection_=t,this.last_=null}get(){const t=this.collection_.get(),e=Object.assign({},t);return this.last_&&j(this.last_,(n,s)=>{e[n]=e[n]-s}),this.last_=t,e}}/**
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
 */class fr{constructor(t,e){this.server_=e,this.statsToReport_={},this.statsListener_=new _r(t);const n=1e4+2e4*Math.random();Pt(this.reportStats_.bind(this),Math.floor(n))}reportStats_(){const t=this.statsListener_.get(),e={};let n=!1;j(t,(s,r)=>{r>0&&X(this.statsToReport_,s)&&(e[s]=r,n=!0)}),n&&this.server_.reportStats(e),Pt(this.reportStats_.bind(this),Math.floor(2*Math.random()*3e5))}}/**
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
 */var $,tt;function Nn(i){return{fromUser:!1,fromServer:!0,queryId:i,tagged:!0}}/**
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
 */(tt=$||($={}))[tt.OVERWRITE=0]="OVERWRITE",tt[tt.MERGE=1]="MERGE",tt[tt.ACK_USER_WRITE=2]="ACK_USER_WRITE",tt[tt.LISTEN_COMPLETE=3]="LISTEN_COMPLETE";class se{constructor(t,e,n){this.path=t,this.affectedTree=e,this.revert=n,this.type=$.ACK_USER_WRITE,this.source={fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}operationForChild(t){if(b(this.path)){if(this.affectedTree.value!=null)return f(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const e=this.affectedTree.subtree(new P(t));return new se(S(),e,this.revert)}}return f(C(this.path)===t,"operationForChild called for unrelated child."),new se(R(this.path),this.affectedTree,this.revert)}}/**
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
 */class lt{constructor(t,e,n){this.source=t,this.path=e,this.snap=n,this.type=$.OVERWRITE}operationForChild(t){return b(this.path)?new lt(this.source,S(),this.snap.getImmediateChild(t)):new lt(this.source,R(this.path),this.snap)}}/**
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
 */class Wt{constructor(t,e,n){this.source=t,this.path=e,this.children=n,this.type=$.MERGE}operationForChild(t){if(b(this.path)){const e=this.children.subtree(new P(t));return e.isEmpty()?null:e.value?new lt(this.source,S(),e.value):new Wt(this.source,S(),e)}return f(C(this.path)===t,"Can't get a merge for a child not on the path of the operation"),new Wt(this.source,R(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
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
 */class Ke{constructor(t,e,n){this.node_=t,this.fullyInitialized_=e,this.filtered_=n}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(t){if(b(t))return this.isFullyInitialized()&&!this.filtered_;const e=C(t);return this.isCompleteForChild(e)}isCompleteForChild(t){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(t)}getNode(){return this.node_}}function kt(i,t,e,n,s,r){const o=n.filter(a=>a.type===e);o.sort((a,h)=>function(l,d,c){if(d.childName==null||c.childName==null)throw Ct("Should only compare child_ events.");const u=new I(d.childName,d.snapshotNode),p=new I(c.childName,c.snapshotNode);return l.index_.compare(u,p)}(i,a,h)),o.forEach(a=>{const h=function(l,d,c){return d.type==="value"||d.type==="child_removed"||(d.prevName=c.getPredecessorChildName(d.childName,d.snapshotNode,l.index_)),d}(i,a,r);s.forEach(l=>{l.respondsTo(a.type)&&t.push(l.createEvent(h,i.query_))})})}function Ni(i,t){return{eventCache:i,serverCache:t}}function xt(i,t,e,n){return Ni(new Ke(t,e,n),i.serverCache)}function Ri(i,t,e,n){return Ni(i.eventCache,new Ke(t,e,n))}function De(i){return i.eventCache.isFullyInitialized()?i.eventCache.getNode():null}function ct(i){return i.serverCache.isFullyInitialized()?i.serverCache.getNode():null}/**
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
 */let ge;class N{constructor(t,e=(ge||(ge=new W(tr)),ge)){this.value=t,this.children=e}static fromObject(t){let e=new N(null);return j(t,(n,s)=>{e=e.set(new P(n),s)}),e}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(t,e){if(this.value!=null&&e(this.value))return{path:S(),value:this.value};if(b(t))return null;{const n=C(t),s=this.children.get(n);if(s!==null){const r=s.findRootMostMatchingPathAndValue(R(t),e);return r!=null?{path:D(new P(n),r.path),value:r.value}:null}return null}}findRootMostValueAndPath(t){return this.findRootMostMatchingPathAndValue(t,()=>!0)}subtree(t){if(b(t))return this;{const e=C(t),n=this.children.get(e);return n!==null?n.subtree(R(t)):new N(null)}}set(t,e){if(b(t))return new N(e,this.children);{const n=C(t),s=(this.children.get(n)||new N(null)).set(R(t),e),r=this.children.insert(n,s);return new N(this.value,r)}}remove(t){if(b(t))return this.children.isEmpty()?new N(null):new N(null,this.children);{const e=C(t),n=this.children.get(e);if(n){const s=n.remove(R(t));let r;return r=s.isEmpty()?this.children.remove(e):this.children.insert(e,s),this.value===null&&r.isEmpty()?new N(null):new N(this.value,r)}return this}}get(t){if(b(t))return this.value;{const e=C(t),n=this.children.get(e);return n?n.get(R(t)):null}}setTree(t,e){if(b(t))return e;{const n=C(t),s=(this.children.get(n)||new N(null)).setTree(R(t),e);let r;return r=s.isEmpty()?this.children.remove(n):this.children.insert(n,s),new N(this.value,r)}}fold(t){return this.fold_(S(),t)}fold_(t,e){const n={};return this.children.inorderTraversal((s,r)=>{n[s]=r.fold_(D(t,s),e)}),e(t,this.value,n)}findOnPath(t,e){return this.findOnPath_(t,S(),e)}findOnPath_(t,e,n){const s=!!this.value&&n(e,this.value);if(s)return s;if(b(t))return null;{const r=C(t),o=this.children.get(r);return o?o.findOnPath_(R(t),D(e,r),n):null}}foreachOnPath(t,e){return this.foreachOnPath_(t,S(),e)}foreachOnPath_(t,e,n){if(b(t))return this;{this.value&&n(e,this.value);const s=C(t),r=this.children.get(s);return r?r.foreachOnPath_(R(t),D(e,s),n):new N(null)}}foreach(t){this.foreach_(S(),t)}foreach_(t,e){this.children.inorderTraversal((n,s)=>{s.foreach_(D(t,n),e)}),this.value&&e(t,this.value)}foreachChild(t){this.children.inorderTraversal((e,n)=>{n.value&&t(e,n.value)})}}/**
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
 */class V{constructor(t){this.writeTree_=t}static empty(){return new V(new N(null))}}function At(i,t,e){if(b(t))return new V(new N(e));{const n=i.writeTree_.findRootMostValueAndPath(t);if(n!=null){const s=n.path;let r=n.value;const o=H(s,t);return r=r.updateChild(o,e),new V(i.writeTree_.set(s,r))}{const s=new N(e),r=i.writeTree_.setTree(t,s);return new V(r)}}}function Rn(i,t,e){let n=i;return j(e,(s,r)=>{n=At(n,D(t,s),r)}),n}function Pn(i,t){if(b(t))return V.empty();{const e=i.writeTree_.setTree(t,new N(null));return new V(e)}}function xe(i,t){return dt(i,t)!=null}function dt(i,t){const e=i.writeTree_.findRootMostValueAndPath(t);return e!=null?i.writeTree_.get(e.path).getChild(H(e.path,t)):null}function Dn(i){const t=[],e=i.writeTree_.value;return e!=null?e.isLeafNode()||e.forEachChild(F,(n,s)=>{t.push(new I(n,s))}):i.writeTree_.children.inorderTraversal((n,s)=>{s.value!=null&&t.push(new I(n,s.value))}),t}function nt(i,t){if(b(t))return i;{const e=dt(i,t);return new V(e!=null?new N(e):i.writeTree_.subtree(t))}}function Ae(i){return i.writeTree_.isEmpty()}function vt(i,t){return Pi(S(),i.writeTree_,t)}function Pi(i,t,e){if(t.value!=null)return e.updateChild(i,t.value);{let n=null;return t.children.inorderTraversal((s,r)=>{s===".priority"?(f(r.value!==null,"Priority writes must always be leaf nodes"),n=r.value):e=Pi(D(i,s),r,e)}),e.getChild(i).isEmpty()||n===null||(e=e.updateChild(D(i,".priority"),n)),e}}/**
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
 */function Di(i,t){return Li(t,i)}function mr(i,t){const e=i.allWrites.findIndex(a=>a.writeId===t);f(e>=0,"removeWrite called with nonexistent writeId.");const n=i.allWrites[e];i.allWrites.splice(e,1);let s=n.visible,r=!1,o=i.allWrites.length-1;for(;s&&o>=0;){const a=i.allWrites[o];a.visible&&(o>=e&&gr(a,n.path)?s=!1:z(n.path,a.path)&&(r=!0)),o--}return s?r?(function(a){a.visibleWrites=xi(a.allWrites,yr,S()),a.allWrites.length>0?a.lastWriteId=a.allWrites[a.allWrites.length-1].writeId:a.lastWriteId=-1}(i),!0):(n.snap?i.visibleWrites=Pn(i.visibleWrites,n.path):j(n.children,a=>{i.visibleWrites=Pn(i.visibleWrites,D(n.path,a))}),!0):!1}function gr(i,t){if(i.snap)return z(i.path,t);for(const e in i.children)if(i.children.hasOwnProperty(e)&&z(D(i.path,e),t))return!0;return!1}function yr(i){return i.visible}function xi(i,t,e){let n=V.empty();for(let s=0;s<i.length;++s){const r=i[s];if(t(r)){const o=r.path;let a;if(r.snap)z(e,o)?(a=H(e,o),n=At(n,a,r.snap)):z(o,e)&&(a=H(o,e),n=At(n,S(),r.snap.getChild(a)));else{if(!r.children)throw Ct("WriteRecord should have .snap or .children");if(z(e,o))a=H(e,o),n=Rn(n,a,r.children);else if(z(o,e))if(a=H(o,e),b(a))n=Rn(n,S(),r.children);else{const h=gt(r.children,C(a));if(h){const l=h.getChild(R(a));n=At(n,S(),l)}}}}}return n}function Ai(i,t,e,n,s){if(n||s){const r=nt(i.visibleWrites,t);if(!s&&Ae(r))return e;if(s||e!=null||xe(r,S())){const o=function(a){return(a.visible||s)&&(!n||!~n.indexOf(a.writeId))&&(z(a.path,t)||z(t,a.path))};return vt(xi(i.allWrites,o,t),e||T.EMPTY_NODE)}return null}{const r=dt(i.visibleWrites,t);if(r!=null)return r;{const o=nt(i.visibleWrites,t);return Ae(o)?e:e!=null||xe(o,S())?vt(o,e||T.EMPTY_NODE):null}}}function Oe(i,t,e,n){return Ai(i.writeTree,i.treePath,t,e,n)}function Oi(i,t){return function(e,n,s){let r=T.EMPTY_NODE;const o=dt(e.visibleWrites,n);if(o)return o.isLeafNode()||o.forEachChild(F,(a,h)=>{r=r.updateImmediateChild(a,h)}),r;if(s){const a=nt(e.visibleWrites,n);return s.forEachChild(F,(h,l)=>{const d=vt(nt(a,new P(h)),l);r=r.updateImmediateChild(h,d)}),Dn(a).forEach(h=>{r=r.updateImmediateChild(h.name,h.node)}),r}return Dn(nt(e.visibleWrites,n)).forEach(a=>{r=r.updateImmediateChild(a.name,a.node)}),r}(i.writeTree,i.treePath,t)}function xn(i,t,e,n){return function(s,r,o,a,h){f(a||h,"Either existingEventSnap or existingServerSnap must exist");const l=D(r,o);if(xe(s.visibleWrites,l))return null;{const d=nt(s.visibleWrites,l);return Ae(d)?h.getChild(o):vt(d,h.getChild(o))}}(i.writeTree,i.treePath,t,e,n)}function Gt(i,t){return function(e,n){return dt(e.visibleWrites,n)}(i.writeTree,D(i.treePath,t))}function vr(i,t,e,n,s,r){return function(o,a,h,l,d,c,u){let p;const _=nt(o.visibleWrites,a),m=dt(_,S());if(m!=null)p=m;else{if(h==null)return[];p=vt(_,h)}if(p=p.withIndex(u),p.isEmpty()||p.isLeafNode())return[];{const g=[],y=u.getCompare(),v=c?p.getReverseIteratorFrom(l,u):p.getIteratorFrom(l,u);let w=v.getNext();for(;w&&g.length<d;)y(w,l)!==0&&g.push(w),w=v.getNext();return g}}(i.writeTree,i.treePath,t,e,n,s,r)}function Ge(i,t,e){return function(n,s,r,o){const a=D(s,r),h=dt(n.visibleWrites,a);return h??(o.isCompleteForChild(r)?vt(nt(n.visibleWrites,a),o.getNode().getImmediateChild(r)):null)}(i.writeTree,i.treePath,t,e)}function Mi(i,t){return Li(D(i.treePath,t),i.writeTree)}function Li(i,t){return{treePath:i,writeTree:t}}/**
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
 */class Cr{constructor(){this.changeMap=new Map}trackChildChange(t){const e=t.type,n=t.childName;f(e==="child_added"||e==="child_changed"||e==="child_removed","Only child changes supported for tracking"),f(n!==".priority","Only non-priority child changes can be tracked.");const s=this.changeMap.get(n);if(s){const o=s.type;if(e==="child_added"&&o==="child_removed")this.changeMap.set(n,Sn(n,t.snapshotNode,s.snapshotNode));else if(e==="child_removed"&&o==="child_added")this.changeMap.delete(n);else if(e==="child_removed"&&o==="child_changed")this.changeMap.set(n,(r=n,{type:"child_removed",snapshotNode:s.oldSnap,childName:r}));else if(e==="child_changed"&&o==="child_added")this.changeMap.set(n,function(a,h){return{type:"child_added",snapshotNode:h,childName:a}}(n,t.snapshotNode));else{if(e!=="child_changed"||o!=="child_changed")throw Ct("Illegal combination of changes: "+t+" occurred after "+s);this.changeMap.set(n,Sn(n,t.snapshotNode,s.oldSnap))}}else this.changeMap.set(n,t);var r}getChanges(){return Array.from(this.changeMap.values())}}/**
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
 */const Fi=new class{getCompleteChild(i){return null}getChildAfterChild(i,t,e){return null}};class Ye{constructor(t,e,n=null){this.writes_=t,this.viewCache_=e,this.optCompleteServerCache_=n}getCompleteChild(t){const e=this.viewCache_.eventCache;if(e.isCompleteForChild(t))return e.getNode().getImmediateChild(t);{const n=this.optCompleteServerCache_!=null?new Ke(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return Ge(this.writes_,t,n)}}getChildAfterChild(t,e,n){const s=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:ct(this.viewCache_),r=vr(this.writes_,s,e,1,n,t);return r.length===0?null:r[0]}}function wr(i,t,e,n,s){const r=new Cr;let o,a;if(e.type===$.OVERWRITE){const l=e;l.source.fromUser?o=ye(i,t,l.path,l.snap,n,s,r):(f(l.source.fromServer,"Unknown source."),a=l.source.tagged||t.serverCache.isFiltered()&&!b(l.path),o=re(i,t,l.path,l.snap,n,s,a,r))}else if(e.type===$.MERGE){const l=e;l.source.fromUser?o=function(d,c,u,p,_,m,g){let y=c;return p.foreach((v,w)=>{const E=D(u,v);An(c,C(E))&&(y=ye(d,y,E,w,_,m,g))}),p.foreach((v,w)=>{const E=D(u,v);An(c,C(E))||(y=ye(d,y,E,w,_,m,g))}),y}(i,t,l.path,l.children,n,s,r):(f(l.source.fromServer,"Unknown source."),a=l.source.tagged||t.serverCache.isFiltered(),o=ve(i,t,l.path,l.children,n,s,a,r))}else if(e.type===$.ACK_USER_WRITE){const l=e;o=l.revert?function(d,c,u,p,_,m){let g;if(Gt(p,u)!=null)return c;{const y=new Ye(p,c,_),v=c.eventCache.getNode();let w;if(b(u)||C(u)===".priority"){let E;if(c.serverCache.isFullyInitialized())E=Oe(p,ct(c));else{const q=c.serverCache.getNode();f(q instanceof T,"serverChildren would be complete if leaf node"),E=Oi(p,q)}w=d.filter.updateFullNode(v,E,m)}else{const E=C(u);let q=Ge(p,E,c.serverCache);q==null&&c.serverCache.isCompleteForChild(E)&&(q=v.getImmediateChild(E)),w=q!=null?d.filter.updateChild(v,E,q,R(u),y,m):c.eventCache.getNode().hasChild(E)?d.filter.updateChild(v,E,T.EMPTY_NODE,R(u),y,m):v,w.isEmpty()&&c.serverCache.isFullyInitialized()&&(g=Oe(p,ct(c)),g.isLeafNode()&&(w=d.filter.updateFullNode(w,g,m)))}return g=c.serverCache.isFullyInitialized()||Gt(p,S())!=null,xt(c,w,g,d.filter.filtersNodes())}}(i,t,l.path,n,s,r):function(d,c,u,p,_,m,g){if(Gt(_,u)!=null)return c;const y=c.serverCache.isFiltered(),v=c.serverCache;if(p.value!=null){if(b(u)&&v.isFullyInitialized()||v.isCompleteForPath(u))return re(d,c,u,v.getNode().getChild(u),_,m,y,g);if(b(u)){let w=new N(null);return v.getNode().forEachChild(mt,(E,q)=>{w=w.set(new P(E),q)}),ve(d,c,u,w,_,m,y,g)}return c}{let w=new N(null);return p.foreach((E,q)=>{const Z=D(u,E);v.isCompleteForPath(Z)&&(w=w.set(E,v.getNode().getChild(Z)))}),ve(d,c,u,w,_,m,y,g)}}(i,t,l.path,l.affectedTree,n,s,r)}else{if(e.type!==$.LISTEN_COMPLETE)throw Ct("Unknown operation type: "+e.type);o=function(l,d,c,u,p){const _=d.serverCache,m=Ri(d,_.getNode(),_.isFullyInitialized()||b(c),_.isFiltered());return qi(l,m,c,u,Fi,p)}(i,t,e.path,n,r)}const h=r.getChanges();return function(l,d,c){const u=d.eventCache;if(u.isFullyInitialized()){const p=u.getNode().isLeafNode()||u.getNode().isEmpty(),_=De(l);(c.length>0||!l.eventCache.isFullyInitialized()||p&&!u.getNode().equals(_)||!u.getNode().getPriority().equals(_.getPriority()))&&c.push({type:"value",snapshotNode:De(d)})}}(t,o,h),{viewCache:o,changes:h}}function qi(i,t,e,n,s,r){const o=t.eventCache;if(Gt(n,e)!=null)return t;{let a,h;if(b(e))if(f(t.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),t.serverCache.isFiltered()){const l=ct(t),d=Oi(n,l instanceof T?l:T.EMPTY_NODE);a=i.filter.updateFullNode(t.eventCache.getNode(),d,r)}else{const l=Oe(n,ct(t));a=i.filter.updateFullNode(t.eventCache.getNode(),l,r)}else{const l=C(e);if(l===".priority"){f(it(e)===1,"Can't have a priority with additional path components");const d=o.getNode();h=t.serverCache.getNode();const c=xn(n,e,d,h);a=c!=null?i.filter.updatePriority(d,c):o.getNode()}else{const d=R(e);let c;if(o.isCompleteForChild(l)){h=t.serverCache.getNode();const u=xn(n,e,o.getNode(),h);c=u!=null?o.getNode().getImmediateChild(l).updateChild(d,u):o.getNode().getImmediateChild(l)}else c=Ge(n,l,t.serverCache);a=c!=null?i.filter.updateChild(o.getNode(),l,c,d,s,r):o.getNode()}}return xt(t,a,o.isFullyInitialized()||b(e),i.filter.filtersNodes())}}function re(i,t,e,n,s,r,o,a){const h=t.serverCache;let l;const d=o?i.filter:i.filter.getIndexedFilter();if(b(e))l=d.updateFullNode(h.getNode(),n,null);else if(d.filtersNodes()&&!h.isFiltered()){const u=h.getNode().updateChild(e,n);l=d.updateFullNode(h.getNode(),u,null)}else{const u=C(e);if(!h.isCompleteForPath(e)&&it(e)>1)return t;const p=R(e),_=h.getNode().getImmediateChild(u).updateChild(p,n);l=u===".priority"?d.updatePriority(h.getNode(),_):d.updateChild(h.getNode(),u,_,p,Fi,null)}const c=Ri(t,l,h.isFullyInitialized()||b(e),d.filtersNodes());return qi(i,c,e,s,new Ye(s,c,r),a)}function ye(i,t,e,n,s,r,o){const a=t.eventCache;let h,l;const d=new Ye(s,t,r);if(b(e))l=i.filter.updateFullNode(t.eventCache.getNode(),n,o),h=xt(t,l,!0,i.filter.filtersNodes());else{const c=C(e);if(c===".priority")l=i.filter.updatePriority(t.eventCache.getNode(),n),h=xt(t,l,a.isFullyInitialized(),a.isFiltered());else{const u=R(e),p=a.getNode().getImmediateChild(c);let _;if(b(u))_=n;else{const m=d.getCompleteChild(c);_=m!=null?gi(u)===".priority"&&m.getChild(vi(u)).isEmpty()?m:m.updateChild(u,n):T.EMPTY_NODE}p.equals(_)?h=t:h=xt(t,i.filter.updateChild(a.getNode(),c,_,u,d,o),a.isFullyInitialized(),i.filter.filtersNodes())}}return h}function An(i,t){return i.eventCache.isCompleteForChild(t)}function On(i,t,e){return e.foreach((n,s)=>{t=t.updateChild(n,s)}),t}function ve(i,t,e,n,s,r,o,a){if(t.serverCache.getNode().isEmpty()&&!t.serverCache.isFullyInitialized())return t;let h,l=t;h=b(e)?n:new N(null).setTree(e,n);const d=t.serverCache.getNode();return h.children.inorderTraversal((c,u)=>{if(d.hasChild(c)){const p=On(0,t.serverCache.getNode().getImmediateChild(c),u);l=re(i,l,new P(c),p,s,r,o,a)}}),h.children.inorderTraversal((c,u)=>{const p=!t.serverCache.isCompleteForChild(c)&&u.value===null;if(!d.hasChild(c)&&!p){const _=On(0,t.serverCache.getNode().getImmediateChild(c),u);l=re(i,l,new P(c),_,s,r,o,a)}}),l}function br(i,t){const e=ct(i.viewCache_);return e&&(i.query._queryParams.loadsAllData()||!b(t)&&!e.getImmediateChild(C(t)).isEmpty())?e.getChild(t):null}function Mn(i,t,e,n){t.type===$.MERGE&&t.source.queryId!==null&&(f(ct(i.viewCache_),"We should always have a full cache before handling merges"),f(De(i.viewCache_),"Missing event cache, even though we have a server cache"));const s=i.viewCache_,r=wr(i.processor_,s,t,e,n);var o,a;return o=i.processor_,a=r.viewCache,f(a.eventCache.getNode().isIndexed(o.filter.getIndex()),"Event snap not indexed"),f(a.serverCache.getNode().isIndexed(o.filter.getIndex()),"Server snap not indexed"),f(r.viewCache.serverCache.isFullyInitialized()||!s.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),i.viewCache_=r.viewCache,function(h,l,d){const c=h.eventRegistrations_;return function(u,p,_,m){const g=[],y=[];return p.forEach(v=>{var w;v.type==="child_changed"&&u.index_.indexedValueChanged(v.oldSnap,v.snapshotNode)&&y.push((w=v.childName,{type:"child_moved",snapshotNode:v.snapshotNode,childName:w}))}),kt(u,g,"child_removed",p,m,_),kt(u,g,"child_added",p,m,_),kt(u,g,"child_moved",y,m,_),kt(u,g,"child_changed",p,m,_),kt(u,g,"value",p,m,_),g}(h.eventGenerator_,l,d,c)}(i,r.changes,r.viewCache.eventCache.getNode())}let Ln,Fn;function Qe(i,t,e,n){const s=t.source.queryId;if(s!==null){const r=i.views.get(s);return f(r!=null,"SyncTree gave us an op for an invalid query."),Mn(r,t,e,n)}{let r=[];for(const o of i.views.values())r=r.concat(Mn(o,t,e,n));return r}}function Je(i,t){let e=null;for(const n of i.views.values())e=e||br(n,t);return e}/**
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
 */class qn{constructor(t){this.listenProvider_=t,this.syncPointTree_=new N(null),this.pendingWriteTree_={visibleWrites:V.empty(),allWrites:[],lastWriteId:-1},this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Wi(i,t,e,n,s){return function(r,o,a,h,l){f(h>r.lastWriteId,"Stacking an older write on top of newer ones"),l===void 0&&(l=!0),r.allWrites.push({path:o,snap:a,writeId:h,visible:l}),l&&(r.visibleWrites=At(r.visibleWrites,o,a)),r.lastWriteId=h}(i.pendingWriteTree_,t,e,n,s),s?ce(i,new lt({fromUser:!0,fromServer:!1,queryId:null,tagged:!1},t,e)):[]}function at(i,t,e=!1){const n=function(s,r){for(let o=0;o<s.allWrites.length;o++){const a=s.allWrites[o];if(a.writeId===r)return a}return null}(i.pendingWriteTree_,t);if(mr(i.pendingWriteTree_,t)){let s=new N(null);return n.snap!=null?s=s.set(S(),!0):j(n.children,r=>{s=s.set(new P(r),!0)}),ce(i,new se(n.path,s,e))}return[]}function le(i,t,e){return ce(i,new lt({fromUser:!1,fromServer:!0,queryId:null,tagged:!1},t,e))}function Xe(i,t,e){const n=i.pendingWriteTree_,s=i.syncPointTree_.findOnPath(t,(r,o)=>{const a=Je(o,H(r,t));if(a)return a});return Ai(n,t,s,e,!0)}function ce(i,t){return Ui(t,i.syncPointTree_,null,Di(i.pendingWriteTree_,S()))}function Ui(i,t,e,n){if(b(i.path))return Hi(i,t,e,n);{const s=t.get(S());e==null&&s!=null&&(e=Je(s,S()));let r=[];const o=C(i.path),a=i.operationForChild(o),h=t.children.get(o);if(h&&a){const l=e?e.getImmediateChild(o):null,d=Mi(n,o);r=r.concat(Ui(a,h,l,d))}return s&&(r=r.concat(Qe(s,i,n,e))),r}}function Hi(i,t,e,n){const s=t.get(S());e==null&&s!=null&&(e=Je(s,S()));let r=[];return t.children.inorderTraversal((o,a)=>{const h=e?e.getImmediateChild(o):null,l=Mi(n,o),d=i.operationForChild(o);d&&(r=r.concat(Hi(d,a,h,l)))}),s&&(r=r.concat(Qe(s,i,n,e))),r}function Wn(i,t){return i.tagToQueryMap.get(t)}function Un(i){const t=i.indexOf("$");return f(t!==-1&&t<i.length-1,"Bad queryKey."),{queryId:i.substr(t+1),path:new P(i.substr(0,t))}}function Hn(i,t,e){const n=i.syncPointTree_.get(t);return f(n,"Missing sync point for query tag that we're tracking"),Qe(n,e,Di(i.pendingWriteTree_,t),null)}/**
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
 */class Ze{constructor(t){this.node_=t}getImmediateChild(t){const e=this.node_.getImmediateChild(t);return new Ze(e)}node(){return this.node_}}class tn{constructor(t,e){this.syncTree_=t,this.path_=e}getImmediateChild(t){const e=D(this.path_,t);return new tn(this.syncTree_,e)}node(){return Xe(this.syncTree_,this.path_)}}const jn=function(i,t,e){return i&&typeof i=="object"?(f(".sv"in i,"Unexpected leaf node or priority contents"),typeof i[".sv"]=="string"?Ir(i[".sv"],t,e):typeof i[".sv"]=="object"?Tr(i[".sv"],t):void f(!1,"Unexpected server value: "+JSON.stringify(i,null,2))):i},Ir=function(i,t,e){if(i==="timestamp")return e.timestamp;f(!1,"Unexpected server value: "+i)},Tr=function(i,t,e){i.hasOwnProperty("increment")||f(!1,"Unexpected server value: "+JSON.stringify(i,null,2));const n=i.increment;typeof n!="number"&&f(!1,"Unexpected increment value: "+n);const s=t.node();if(f(s!=null,"Expected ChildrenNode.EMPTY_NODE for nulls"),!s.isLeafNode())return n;const r=s.getValue();return typeof r!="number"?n:r+n},ji=function(i,t,e){return en(i,new Ze(t),e)};function en(i,t,e){const n=i.getPriority().val(),s=jn(n,t.getImmediateChild(".priority"),e);let r;if(i.isLeafNode()){const o=i,a=jn(o.getValue(),t,e);return a!==o.getValue()||s!==o.getPriority().val()?new x(a,O(s)):i}{const o=i;return r=o,s!==o.getPriority().val()&&(r=r.updatePriority(new x(s))),o.forEachChild(F,(a,h)=>{const l=en(h,t.getImmediateChild(a),e);l!==h&&(r=r.updateImmediateChild(a,l))}),r}}/**
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
 */class nn{constructor(t="",e=null,n={children:{},childCount:0}){this.name=t,this.parent=e,this.node=n}}function sn(i,t){let e=t instanceof P?t:new P(t),n=i,s=C(e);for(;s!==null;){const r=gt(n.node.children,s)||{children:{},childCount:0};n=new nn(s,n,r),e=R(e),s=C(e)}return n}function It(i){return i.node.value}function Bi(i,t){i.node.value=t,Me(i)}function zi(i){return i.node.childCount>0}function ue(i,t){j(i.node.children,(e,n)=>{t(new nn(e,i,n))})}function $i(i,t,e,n){e&&!n&&t(i),ue(i,s=>{$i(s,t,!0,n)}),e&&n&&t(i)}function Bt(i){return new P(i.parent===null?i.name:Bt(i.parent)+"/"+i.name)}function Me(i){i.parent!==null&&function(t,e,n){const s=function(o){return It(o)===void 0&&!zi(o)}(n),r=X(t.node.children,e);s&&r?(delete t.node.children[e],t.node.childCount--,Me(t)):s||r||(t.node.children[e]=n.node,t.node.childCount++,Me(t))}(i.parent,i.name,i)}const Sr=/[\[\].#$\/\u0000-\u001F\u007F]/,Er=/[\[\].#$\u0000-\u001F\u007F]/,Ce=10485760,Vi=function(i){return typeof i=="string"&&i.length!==0&&!Sr.test(i)},Ki=function(i){return typeof i=="string"&&i.length!==0&&!Er.test(i)},rn=function(i,t,e){const n=e instanceof P?new ar(e,i):e;if(t===void 0)throw new Error(i+"contains undefined "+rt(n));if(typeof t=="function")throw new Error(i+"contains a function "+rt(n)+" with contents = "+t.toString());if(ai(t))throw new Error(i+"contains "+t.toString()+" "+rt(n));if(typeof t=="string"&&t.length>Ce/3&&Vt(t)>Ce)throw new Error(i+"contains a string greater than "+Ce+" utf8 bytes "+rt(n)+" ('"+t.substring(0,50)+"...')");if(t&&typeof t=="object"){let s=!1,r=!1;if(j(t,(o,a)=>{if(o===".value")s=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!Vi(o)))throw new Error(i+" contains an invalid key ("+o+") "+rt(n)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);var h,l;l=o,(h=n).parts_.length>0&&(h.byteLength_+=1),h.parts_.push(l),h.byteLength_+=Vt(l),wi(h),rn(i,a,n),function(d){const c=d.parts_.pop();d.byteLength_-=Vt(c),d.parts_.length>0&&(d.byteLength_-=1)}(n)}),s&&r)throw new Error(i+' contains ".value" child '+rt(n)+" in addition to actual children.")}},Bn=function(i,t,e,n){if(!Ki(e))throw new Error(Ue(i,t)+'was an invalid path = "'+e+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},kr=function(i,t){const e=t.path.toString();if(typeof t.repoInfo.host!="string"||t.repoInfo.host.length===0||!Vi(t.repoInfo.namespace)&&t.repoInfo.host.split(":")[0]!=="localhost"||e.length!==0&&!function(n){return n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),Ki(n)}(e))throw new Error(Ue(i,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
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
 */class Nr{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function Gi(i,t){let e=null;for(let n=0;n<t.length;n++){const s=t[n],r=s.getPath();e===null||Ci(r,e.path)||(i.eventLists_.push(e),e=null),e===null&&(e={events:[],path:r}),e.events.push(s)}e&&i.eventLists_.push(e)}function J(i,t,e){Gi(i,e),function(n,s){n.recursionDepth_++;let r=!0;for(let o=0;o<n.eventLists_.length;o++){const a=n.eventLists_[o];a&&(s(a.path)?(Rr(n.eventLists_[o]),n.eventLists_[o]=null):r=!1)}r&&(n.eventLists_=[]),n.recursionDepth_--}(i,n=>z(n,t)||z(t,n))}function Rr(i){for(let t=0;t<i.events.length;t++){const e=i.events[t];if(e!==null){i.events[t]=null;const n=e.getEventRunner();Nt&&L("event: "+e.toString()),bt(n)}}}/**
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
 */class Pr{constructor(t,e,n,s){this.repoInfo_=t,this.forceRestClient_=e,this.authTokenProvider_=n,this.appCheckProvider_=s,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new Nr,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=ie(),this.transactionQueueTree_=new nn,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function Dr(i,t,e){if(i.stats_=je(i.repoInfo_),i.forceRestClient_||(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0)i.server_=new ne(i.repoInfo_,(n,s,r,o)=>{zn(i,n,s,r,o)},i.authTokenProvider_,i.appCheckProvider_),setTimeout(()=>$n(i,!0),0);else{if(e!=null){if(typeof e!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{M(e)}catch(n){throw new Error("Invalid authOverride provided: "+n)}}i.persistentConnection_=new Y(i.repoInfo_,t,(n,s,r,o)=>{zn(i,n,s,r,o)},n=>{$n(i,n)},n=>{(function(s,r){j(r,(o,a)=>{Le(s,o,a)})})(i,n)},i.authTokenProvider_,i.appCheckProvider_,e),i.server_=i.persistentConnection_}i.authTokenProvider_.addTokenChangeListener(n=>{i.server_.refreshAuthToken(n)}),i.appCheckProvider_.addTokenChangeListener(n=>{i.server_.refreshAppCheckToken(n.token)}),i.statsReporter_=function(n,s){const r=n.toString();return fe[r]||(fe[r]=s()),fe[r]}(i.repoInfo_,()=>new fr(i.stats_,i.server_)),i.infoData_=new pr,i.infoSyncTree_=new qn({startListening:(n,s,r,o)=>{let a=[];const h=i.infoData_.getNode(n._path);return h.isEmpty()||(a=le(i.infoSyncTree_,n._path,h),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),Le(i,"connected",!1),i.serverSyncTree_=new qn({startListening:(n,s,r,o)=>(i.server_.listen(n,r,s,(a,h)=>{const l=o(a,h);J(i.eventQueue_,n._path,l)}),[]),stopListening:(n,s)=>{i.server_.unlisten(n,s)}})}function xr(i){const t=i.infoData_.getNode(new P(".info/serverTimeOffset")).val()||0;return new Date().getTime()+t}function on(i){return(t=(t={timestamp:xr(i)})||{}).timestamp=t.timestamp||new Date().getTime(),t;var t}function zn(i,t,e,n,s){i.dataUpdateCount++;const r=new P(t);e=i.interceptServerDataCallback_?i.interceptServerDataCallback_(t,e):e;let o=[];if(s)if(n){const h=Qt(e,l=>O(l));o=function(l,d,c,u){const p=Wn(l,u);if(p){const _=Un(p),m=_.path,g=_.queryId,y=H(m,d),v=N.fromObject(c);return Hn(l,m,new Wt(Nn(g),y,v))}return[]}(i.serverSyncTree_,r,h,s)}else{const h=O(e);o=function(l,d,c,u){const p=Wn(l,u);if(p!=null){const _=Un(p),m=_.path,g=_.queryId,y=H(m,d);return Hn(l,m,new lt(Nn(g),y,c))}return[]}(i.serverSyncTree_,r,h,s)}else if(n){const h=Qt(e,l=>O(l));o=function(l,d,c){const u=N.fromObject(c);return ce(l,new Wt({fromUser:!1,fromServer:!0,queryId:null,tagged:!1},d,u))}(i.serverSyncTree_,r,h)}else{const h=O(e);o=le(i.serverSyncTree_,r,h)}let a=r;o.length>0&&(a=de(i,r)),J(i.eventQueue_,a,o)}function $n(i,t){Le(i,"connected",t),t===!1&&function(e){an(e,"onDisconnectEvents");const n=on(e),s=ie();Pe(e.onDisconnect_,S(),(o,a)=>{const h=function(l,d,c,u){return en(d,new tn(c,l),u)}(o,a,e.serverSyncTree_,n);ki(s,o,h)});let r=[];Pe(s,S(),(o,a)=>{r=r.concat(le(e.serverSyncTree_,o,a));const h=ts(e,o);de(e,h)}),e.onDisconnect_=ie(),J(e.eventQueue_,S(),r)}(i)}function Le(i,t,e){const n=new P("/.info/"+t),s=O(e);i.infoData_.updateSnapshot(n,s);const r=le(i.infoSyncTree_,n,s);J(i.eventQueue_,n,r)}function Yi(i){return i.nextWriteId_++}function Ar(i,t,e,n,s){an(i,"set",{path:t.toString(),value:e,priority:n});const r=on(i),o=O(e,n),a=Xe(i.serverSyncTree_,t),h=ji(o,a,r),l=Yi(i),d=Wi(i.serverSyncTree_,t,h,l,!0);Gi(i.eventQueue_,d),i.server_.put(t.toString(),o.val(!0),(u,p)=>{const _=u==="ok";_||U("set at "+t+" failed: "+u);const m=at(i.serverSyncTree_,l,!_);J(i.eventQueue_,t,m),function(g,y,v,w){y&&bt(()=>{if(v==="ok")y(null);else{const E=(v||"error").toUpperCase();let q=E;w&&(q+=": "+w);const Z=new Error(q);Z.code=E,y(Z)}})}(0,s,u,p)});const c=ts(i,t);de(i,c),J(i.eventQueue_,c,[])}function an(i,...t){let e="";i.persistentConnection_&&(e=i.persistentConnection_.id+":"),L(e,...t)}function Qi(i,t,e){return Xe(i.serverSyncTree_,t,e)||T.EMPTY_NODE}function Fe(i,t=i.transactionQueueTree_){if(t||oe(i,t),It(t)){const e=Xi(i,t);f(e.length>0,"Sending zero length transaction queue"),e.every(n=>n.status===0)&&function(n,s,r){const o=r.map(u=>u.currentWriteId),a=Qi(n,s,o);let h=a;const l=a.hash();for(let u=0;u<r.length;u++){const p=r[u];f(p.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),p.status=1,p.retryCount++;const _=H(s,p.path);h=h.updateChild(_,p.currentOutputSnapshotRaw)}const d=h.val(!0),c=s;n.server_.put(c.toString(),d,u=>{an(n,"transaction put response",{path:c.toString(),status:u});let p=[];if(u==="ok"){const _=[];for(let m=0;m<r.length;m++)r[m].status=2,p=p.concat(at(n.serverSyncTree_,r[m].currentWriteId)),r[m].onComplete&&_.push(()=>r[m].onComplete(null,!0,r[m].currentOutputSnapshotResolved)),r[m].unwatcher();oe(n,sn(n.transactionQueueTree_,s)),Fe(n,n.transactionQueueTree_),J(n.eventQueue_,s,p);for(let m=0;m<_.length;m++)bt(_[m])}else{if(u==="datastale")for(let _=0;_<r.length;_++)r[_].status===3?r[_].status=4:r[_].status=0;else{U("transaction at "+c.toString()+" failed: "+u);for(let _=0;_<r.length;_++)r[_].status=4,r[_].abortReason=u}de(n,s)}},l)}(i,Bt(t),e)}else zi(t)&&ue(t,e=>{Fe(i,e)})}function de(i,t){const e=Ji(i,t),n=Bt(e);return function(s,r,o){if(r.length===0)return;const a=[];let h=[];const l=r.filter(u=>u.status===0),d=l.map(u=>u.currentWriteId);for(let u=0;u<r.length;u++){const p=r[u],_=H(o,p.path);let m,g=!1;if(f(_!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),p.status===4)g=!0,m=p.abortReason,h=h.concat(at(s.serverSyncTree_,p.currentWriteId,!0));else if(p.status===0)if(p.retryCount>=25)g=!0,m="maxretry",h=h.concat(at(s.serverSyncTree_,p.currentWriteId,!0));else{const y=Qi(s,p.path,d);p.currentInputSnapshot=y;const v=r[u].update(y.val());if(v!==void 0){rn("transaction failed: Data returned ",v,p.path);let w=O(v);typeof v=="object"&&v!=null&&X(v,".priority")||(w=w.updatePriority(y.getPriority()));const E=p.currentWriteId,q=on(s),Z=ji(w,y,q);p.currentOutputSnapshotRaw=w,p.currentOutputSnapshotResolved=Z,p.currentWriteId=Yi(s),d.splice(d.indexOf(E),1),h=h.concat(Wi(s.serverSyncTree_,p.path,Z,p.currentWriteId,p.applyLocally)),h=h.concat(at(s.serverSyncTree_,E,!0))}else g=!0,m="nodata",h=h.concat(at(s.serverSyncTree_,p.currentWriteId,!0))}J(s.eventQueue_,o,h),h=[],g&&(r[u].status=2,c=r[u].unwatcher,setTimeout(c,Math.floor(0)),r[u].onComplete&&(m==="nodata"?a.push(()=>r[u].onComplete(null,!1,r[u].currentInputSnapshot)):a.push(()=>r[u].onComplete(new Error(m),!1,null))))}var c;oe(s,s.transactionQueueTree_);for(let u=0;u<a.length;u++)bt(a[u]);Fe(s,s.transactionQueueTree_)}(i,Xi(i,e),n),n}function Ji(i,t){let e,n=i.transactionQueueTree_;for(e=C(t);e!==null&&It(n)===void 0;)n=sn(n,e),e=C(t=R(t));return n}function Xi(i,t){const e=[];return Zi(i,t,e),e.sort((n,s)=>n.order-s.order),e}function Zi(i,t,e){const n=It(t);if(n)for(let s=0;s<n.length;s++)e.push(n[s]);ue(t,s=>{Zi(i,s,e)})}function oe(i,t){const e=It(t);if(e){let n=0;for(let s=0;s<e.length;s++)e[s].status!==2&&(e[n]=e[s],n++);e.length=n,Bi(t,e.length>0?e:void 0)}ue(t,n=>{oe(i,n)})}function ts(i,t){const e=Bt(Ji(i,t)),n=sn(i.transactionQueueTree_,t);return function(s,r){let o=s.parent;for(;o!==null;){if(r(o))return!0;o=o.parent}}(n,s=>{we(i,s)}),we(i,n),$i(n,s=>{we(i,s)}),e}function we(i,t){const e=It(t);if(e){const n=[];let s=[],r=-1;for(let o=0;o<e.length;o++)e[o].status===3||(e[o].status===1?(f(r===o-1,"All SENT items should be at beginning of queue."),r=o,e[o].status=3,e[o].abortReason="set"):(f(e[o].status===0,"Unexpected transaction status in abort"),e[o].unwatcher(),s=s.concat(at(i.serverSyncTree_,e[o].currentWriteId,!0)),e[o].onComplete&&n.push(e[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?Bi(t,void 0):e.length=r+1,J(i.eventQueue_,Bt(t),s);for(let o=0;o<n.length;o++)bt(n[o])}}/**
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
 */const Vn=function(i,t){const e=Or(i),n=e.namespace;e.domain==="firebase.com"&&G(e.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),n&&n!=="undefined"||e.domain==="localhost"||G("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),e.secure||typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&U("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().");const s=e.scheme==="ws"||e.scheme==="wss";return{repoInfo:new pi(e.host,e.secure,n,s,t,"",n!==e.subdomain),path:new P(e.pathString)}},Or=function(i){let t="",e="",n="",s="",r="",o=!0,a="https",h=443;if(typeof i=="string"){let l=i.indexOf("//");l>=0&&(a=i.substring(0,l-1),i=i.substring(l+2));let d=i.indexOf("/");d===-1&&(d=i.length);let c=i.indexOf("?");c===-1&&(c=i.length),t=i.substring(0,Math.min(d,c)),d<c&&(s=function(_){let m="";const g=_.split("/");for(let y=0;y<g.length;y++)if(g[y].length>0){let v=g[y];try{v=decodeURIComponent(v.replace(/\+/g," "))}catch{}m+="/"+v}return m}(i.substring(d,c)));const u=function(_){const m={};_.charAt(0)==="?"&&(_=_.substring(1));for(const g of _.split("&")){if(g.length===0)continue;const y=g.split("=");y.length===2?m[decodeURIComponent(y[0])]=decodeURIComponent(y[1]):U(`Invalid query segment '${g}' in query '${_}'`)}return m}(i.substring(Math.min(i.length,c)));l=t.indexOf(":"),l>=0?(o=a==="https"||a==="wss",h=parseInt(t.substring(l+1),10)):l=t.length;const p=t.slice(0,l);if(p.toLowerCase()==="localhost")e="localhost";else if(p.split(".").length<=2)e=p;else{const _=t.indexOf(".");n=t.substring(0,_).toLowerCase(),e=t.substring(_+1),r=n}"ns"in u&&(r=u.ns)}return{host:t,port:h,domain:e,subdomain:n,secure:o,scheme:a,pathString:s,namespace:r}};/**
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
 */class hn{constructor(t,e,n,s){this._repo=t,this._path=e,this._queryParams=n,this._orderByCalled=s}get key(){return b(this._path)?null:gi(this._path)}get ref(){return new ut(this._repo,this._path)}get _queryIdentifier(){const t=kn(this._queryParams),e=He(t);return e==="{}"?"default":e}get _queryObject(){return kn(this._queryParams)}isEqual(t){if(!((t=Mt(t))instanceof hn))return!1;const e=this._repo===t._repo,n=Ci(this._path,t._path),s=this._queryIdentifier===t._queryIdentifier;return e&&n&&s}toJSON(){return this.toString()}toString(){return this._repo.toString()+function(t){let e="";for(let n=t.pieceNum_;n<t.pieces_.length;n++)t.pieces_[n]!==""&&(e+="/"+encodeURIComponent(String(t.pieces_[n])));return e||"/"}(this._path)}}class ut extends hn{constructor(t,e){super(t,e,new Ve,!1)}get parent(){const t=vi(this._path);return t===null?null:new ut(this._repo,t)}get root(){let t=this;for(;t.parent!==null;)t=t.parent;return t}}function Wr(i,t){return(i=Mt(i))._checkNotDeleted("ref"),t!==void 0?function(e,n){C((e=Mt(e))._path)===null?(s="child",r="path",(o=n)&&(o=o.replace(/^\/*\.info(\/|$)/,"/")),Bn(s,r,o)):Bn("child","path",n);var s,r,o;return new ut(e._repo,D(e._path,n))}(i._root,t):i._root}function Ur(i,t){(function(n,s){if(C(s)===".info")throw new Error(n+" failed = Can't modify data under /.info/")})("set",(i=Mt(i))._path),function(n,s,r){rn(Ue(n,"value"),s,r)}("set",t,i._path);const e=new ae;return Ar(i._repo,i._path,t,null,e.wrapCallback(()=>{})),e.promise}(function(i){f(!Ln,"__referenceConstructor has already been defined"),Ln=i})(ut),function(i){f(!Fn,"__referenceConstructor has already been defined"),Fn=i}(ut);/**
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
 */const qe={};let Mr=!1;function Lr(i,t,e,n,s){let r=n||i.options.databaseURL;r===void 0&&(i.options.projectId||G("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),L("Using default host for project ",i.options.projectId),r=`${i.options.projectId}-default-rtdb.firebaseio.com`);let o,a=Vn(r,s),h=a.repoInfo;typeof process<"u"&&yn&&(o=yn.FIREBASE_DATABASE_EMULATOR_HOST),o?(r=`http://${o}?ns=${h.namespace}`,a=Vn(r,s),h=a.repoInfo):a.repoInfo.secure;const l=new ir(i.name,i.options,t);kr("Invalid Firebase Database URL",a),b(a.path)||G("Database URL must point to the root of a Firebase Database (not including a child path).");const d=function(c,u,p,_){let m=qe[u.name];m||(m={},qe[u.name]=m);let g=m[c.toURLString()];return g&&G("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),g=new Pr(c,Mr,p,_),m[c.toURLString()]=g,g}(h,i,l,new nr(i.name,e));return new Fr(d,i)}class Fr{constructor(t,e){this._repoInternal=t,this.app=e,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(Dr(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new ut(this._repo,S())),this._rootInternal}_delete(){return this._rootInternal!==null&&(function(t,e){const n=qe[e];n&&n[t.key]===t||G(`Database ${e}(${t.repoInfo_}) has already been deleted.`),function(s){s.persistentConnection_&&s.persistentConnection_.interrupt("repo_interrupt")}(t),delete n[t.key]}(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(t){this._rootInternal===null&&G("Cannot call "+t+" on a deleted database.")}}function Hr(i=function(e=Se){const n=Jt.get(e);if(!n&&e===Se&&Jn())return Ks();if(!n)throw et.create("no-app",{appName:e});return n}(),t){const e=function(n,s){const r=n.container.getProvider("heartbeat").getImmediate({optional:!0});return r&&r.triggerHeartbeat(),n.container.getProvider(s)}(i,"database").getImmediate({identifier:t});if(!e._instanceStarted){const n=hs("database");n&&function(s,r,o,a={}){s=Mt(s),s._checkNotDeleted("useEmulator"),s._instanceStarted&&G("Cannot call useEmulator() after instance has already been initialized.");const h=s._repoInternal;let l;if(h.repoInfo_.nodeAdmin)a.mockUserToken&&G('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),l=new Kt(Kt.OWNER);else if(a.mockUserToken){const d=typeof a.mockUserToken=="string"?a.mockUserToken:function(c,u){if(c.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const p=u||"demo-project",_=c.iat||0,m=c.sub||c.user_id;if(!m)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const g=Object.assign({iss:`https://securetoken.google.com/${p}`,aud:p,iat:_,exp:_+3600,auth_time:_,sub:m,user_id:m,firebase:{sign_in_provider:"custom",identities:{}}},c);return[Yt(JSON.stringify({alg:"none",type:"JWT"})),Yt(JSON.stringify(g)),""].join(".")}(a.mockUserToken,s.app.options.projectId);l=new Kt(d)}(function(d,c,u,p){d.repoInfo_=new pi(`${c}:${u}`,!1,d.repoInfo_.namespace,d.repoInfo_.webSocketOnly,d.repoInfo_.nodeAdmin,d.repoInfo_.persistenceKey,d.repoInfo_.includeNamespaceInQueryParams,!0),p&&(d.authTokenProvider_=p)})(h,r,o,l)}(e,...n)}return e}Y.prototype.simpleListen=function(i,t){this.sendRequest("q",{p:i},t)},Y.prototype.echo=function(i,t){this.sendRequest("echo",{d:i},t)},function(i){si="10.14.1",Xt(new Lt("database",(t,{instanceIdentifier:e})=>Lr(t.getProvider("app").getImmediate(),t.getProvider("auth-internal"),t.getProvider("app-check-internal"),e),"PUBLIC").setMultipleInstances(!0)),Rt(vn,Cn,i),Rt(vn,Cn,"esm2017")}();export{Wr as a,Hr as g,Ks as i,Rt as r,Ur as s};
