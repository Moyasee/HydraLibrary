(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();var ri={};/**
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
 */const Qi={NODE_CLIENT:!1,NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
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
 */const f=function(n,e){if(!n)throw Re(e)},Re=function(n){return new Error("Firebase Database ("+Qi.SDK_VERSION+") INTERNAL ASSERT FAILED: "+n)};/**
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
 */const Ji=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&i+1<n.length&&(n.charCodeAt(i+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++i)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},Rr=function(n){const e=[];let t=0,i=0;for(;t<n.length;){const s=n[t++];if(s<128)e[i++]=String.fromCharCode(s);else if(s>191&&s<224){const r=n[t++];e[i++]=String.fromCharCode((s&31)<<6|r&63)}else if(s>239&&s<365){const r=n[t++],o=n[t++],a=n[t++],l=((s&7)<<18|(r&63)<<12|(o&63)<<6|a&63)-65536;e[i++]=String.fromCharCode(55296+(l>>10)),e[i++]=String.fromCharCode(56320+(l&1023))}else{const r=n[t++],o=n[t++];e[i++]=String.fromCharCode((s&15)<<12|(r&63)<<6|o&63)}}return e.join("")},In={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let s=0;s<n.length;s+=3){const r=n[s],o=s+1<n.length,a=o?n[s+1]:0,l=s+2<n.length,c=l?n[s+2]:0,h=r>>2,u=(r&3)<<4|a>>4;let d=(a&15)<<2|c>>6,p=c&63;l||(p=64,o||(d=64)),i.push(t[h],t[u],t[d],t[p])}return i.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Ji(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Rr(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let s=0;s<n.length;){const r=t[n.charAt(s++)],a=s<n.length?t[n.charAt(s)]:0;++s;const c=s<n.length?t[n.charAt(s)]:64;++s;const u=s<n.length?t[n.charAt(s)]:64;if(++s,r==null||a==null||c==null||u==null)throw new Nr;const d=r<<2|a>>4;if(i.push(d),c!==64){const p=a<<4&240|c>>2;if(i.push(p),u!==64){const _=c<<6&192|u;i.push(_)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Nr extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Xi=function(n){const e=Ji(n);return In.encodeByteArray(e,!0)},dt=function(n){return Xi(n).replace(/\./g,"")},tn=function(n){try{return In.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function kr(n){return Zi(void 0,n)}function Zi(n,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const t=e;return new Date(t.getTime());case Object:n===void 0&&(n={});break;case Array:n=[];break;default:return e}for(const t in e)!e.hasOwnProperty(t)||!Ar(t)||(n[t]=Zi(n[t],e[t]));return n}function Ar(n){return n!=="__proto__"}/**
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
 */function Dr(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const Or=()=>Dr().__FIREBASE_DEFAULTS__,Pr=()=>{if(typeof process>"u"||typeof ri>"u")return;const n=ri.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},xr=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&tn(n[1]);return e&&JSON.parse(e)},es=()=>{try{return Or()||Pr()||xr()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Lr=n=>{var e,t;return(t=(e=es())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},Fr=n=>{const e=Lr(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const i=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),i]:[e.substring(0,t),i]},ts=()=>{var n;return(n=es())===null||n===void 0?void 0:n.config};/**
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
 */class G{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,i)=>{t?this.reject(t):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,i))}}}/**
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
 */function Mr(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},i=e||"demo-project",s=n.iat||0,r=n.sub||n.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${i}`,aud:i,iat:s,exp:s+3600,auth_time:s,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}}},n);return[dt(JSON.stringify(t)),dt(JSON.stringify(o)),""].join(".")}/**
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
 */function Ur(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function ns(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ur())}function Wr(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function is(){return Qi.NODE_ADMIN===!0}function Hr(){try{return typeof indexedDB=="object"}catch{return!1}}function Br(){return new Promise((n,e)=>{try{let t=!0;const i="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(i);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(i),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var r;e(((r=s.error)===null||r===void 0?void 0:r.message)||"")}}catch(t){e(t)}})}/**
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
 */const Gr="FirebaseError";class tt extends Error{constructor(e,t,i){super(t),this.code=e,this.customData=i,this.name=Gr,Object.setPrototypeOf(this,tt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ss.prototype.create)}}class ss{constructor(e,t,i){this.service=e,this.serviceName=t,this.errors=i}create(e,...t){const i=t[0]||{},s=`${this.service}/${e}`,r=this.errors[e],o=r?Vr(r,i):"Error",a=`${this.serviceName}: ${o} (${s}).`;return new tt(s,a,i)}}function Vr(n,e){return n.replace(jr,(t,i)=>{const s=e[i];return s!=null?String(s):`<${i}?>`})}const jr=/\{\$([^}]+)}/g;/**
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
 */function je(n){return JSON.parse(n)}function k(n){return JSON.stringify(n)}/**
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
 */const rs=function(n){let e={},t={},i={},s="";try{const r=n.split(".");e=je(tn(r[0])||""),t=je(tn(r[1])||""),s=r[2],i=t.d||{},delete t.d}catch{}return{header:e,claims:t,data:i,signature:s}},qr=function(n){const e=rs(n),t=e.claims;return!!t&&typeof t=="object"&&t.hasOwnProperty("iat")},zr=function(n){const e=rs(n).claims;return typeof e=="object"&&e.admin===!0};/**
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
 */function j(n,e){return Object.prototype.hasOwnProperty.call(n,e)}function Ce(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]}function nn(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function ft(n,e,t){const i={};for(const s in n)Object.prototype.hasOwnProperty.call(n,s)&&(i[s]=e.call(t,n[s],s,n));return i}function sn(n,e){if(n===e)return!0;const t=Object.keys(n),i=Object.keys(e);for(const s of t){if(!i.includes(s))return!1;const r=n[s],o=e[s];if(oi(r)&&oi(o)){if(!sn(r,o))return!1}else if(r!==o)return!1}for(const s of i)if(!t.includes(s))return!1;return!0}function oi(n){return n!==null&&typeof n=="object"}/**
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
 */function $r(n){const e=[];for(const[t,i]of Object.entries(n))Array.isArray(i)?i.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}/**
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
 */class Kr{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const i=this.W_;if(typeof e=="string")for(let u=0;u<16;u++)i[u]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let u=0;u<16;u++)i[u]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let u=16;u<80;u++){const d=i[u-3]^i[u-8]^i[u-14]^i[u-16];i[u]=(d<<1|d>>>31)&4294967295}let s=this.chain_[0],r=this.chain_[1],o=this.chain_[2],a=this.chain_[3],l=this.chain_[4],c,h;for(let u=0;u<80;u++){u<40?u<20?(c=a^r&(o^a),h=1518500249):(c=r^o^a,h=1859775393):u<60?(c=r&o|a&(r|o),h=2400959708):(c=r^o^a,h=3395469782);const d=(s<<5|s>>>27)+c+l+h+i[u]&4294967295;l=a,a=o,o=(r<<30|r>>>2)&4294967295,r=s,s=d}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+l&4294967295}update(e,t){if(e==null)return;t===void 0&&(t=e.length);const i=t-this.blockSize;let s=0;const r=this.buf_;let o=this.inbuf_;for(;s<t;){if(o===0)for(;s<=i;)this.compress_(e,s),s+=this.blockSize;if(typeof e=="string"){for(;s<t;)if(r[o]=e.charCodeAt(s),++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}else for(;s<t;)if(r[o]=e[s],++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=t}digest(){const e=[];let t=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let s=this.blockSize-1;s>=56;s--)this.buf_[s]=t&255,t/=256;this.compress_(this.buf_);let i=0;for(let s=0;s<5;s++)for(let r=24;r>=0;r-=8)e[i]=this.chain_[s]>>r&255,++i;return e}}function Ee(n,e){return`${n} failed: ${e} argument `}/**
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
 */const Yr=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);if(s>=55296&&s<=56319){const r=s-55296;i++,f(i<n.length,"Surrogate pair missing trail surrogate.");const o=n.charCodeAt(i)-56320;s=65536+(r<<10)+o}s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):s<65536?(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},kt=function(n){let e=0;for(let t=0;t<n.length;t++){const i=n.charCodeAt(t);i<128?e++:i<2048?e+=2:i>=55296&&i<=56319?(e+=4,t++):e+=3}return e};/**
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
 */function Y(n){return n&&n._delegate?n._delegate:n}class qe{constructor(e,t,i){this.name=e,this.instanceFactory=t,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const oe="[DEFAULT]";/**
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
 */class Qr{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const i=new G;if(this.instancesDeferred.set(t,i),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&i.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const i=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(i)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:i})}catch(r){if(s)return null;throw r}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Xr(e))try{this.getOrInitializeService({instanceIdentifier:oe})}catch{}for(const[t,i]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const r=this.getOrInitializeService({instanceIdentifier:s});i.resolve(r)}catch{}}}}clearInstance(e=oe){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=oe){return this.instances.has(e)}getOptions(e=oe){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:i,options:t});for(const[r,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(r);i===a&&o.resolve(s)}return s}onInit(e,t){var i;const s=this.normalizeInstanceIdentifier(t),r=(i=this.onInitCallbacks.get(s))!==null&&i!==void 0?i:new Set;r.add(e),this.onInitCallbacks.set(s,r);const o=this.instances.get(s);return o&&e(o,s),()=>{r.delete(e)}}invokeOnInitCallbacks(e,t){const i=this.onInitCallbacks.get(t);if(i)for(const s of i)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:Jr(e),options:t}),this.instances.set(e,i),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=oe){return this.component?this.component.multipleInstances?e:oe:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Jr(n){return n===oe?void 0:n}function Xr(n){return n.instantiationMode==="EAGER"}/**
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
 */class Zr{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Qr(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var I;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(I||(I={}));const eo={debug:I.DEBUG,verbose:I.VERBOSE,info:I.INFO,warn:I.WARN,error:I.ERROR,silent:I.SILENT},to=I.INFO,no={[I.DEBUG]:"log",[I.VERBOSE]:"log",[I.INFO]:"info",[I.WARN]:"warn",[I.ERROR]:"error"},io=(n,e,...t)=>{if(e<n.logLevel)return;const i=new Date().toISOString(),s=no[e];if(s)console[s](`[${i}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class os{constructor(e){this.name=e,this._logLevel=to,this._logHandler=io,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in I))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?eo[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,I.DEBUG,...e),this._logHandler(this,I.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,I.VERBOSE,...e),this._logHandler(this,I.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,I.INFO,...e),this._logHandler(this,I.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,I.WARN,...e),this._logHandler(this,I.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,I.ERROR,...e),this._logHandler(this,I.ERROR,...e)}}const so=(n,e)=>e.some(t=>n instanceof t);let ai,li;function ro(){return ai||(ai=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function oo(){return li||(li=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const as=new WeakMap,rn=new WeakMap,ls=new WeakMap,Vt=new WeakMap,Tn=new WeakMap;function ao(n){const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("success",r),n.removeEventListener("error",o)},r=()=>{t(X(n.result)),s()},o=()=>{i(n.error),s()};n.addEventListener("success",r),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&as.set(t,n)}).catch(()=>{}),Tn.set(e,n),e}function lo(n){if(rn.has(n))return;const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("complete",r),n.removeEventListener("error",o),n.removeEventListener("abort",o)},r=()=>{t(),s()},o=()=>{i(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",r),n.addEventListener("error",o),n.addEventListener("abort",o)});rn.set(n,e)}let on={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return rn.get(n);if(e==="objectStoreNames")return n.objectStoreNames||ls.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return X(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function co(n){on=n(on)}function uo(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const i=n.call(jt(this),e,...t);return ls.set(i,e.sort?e.sort():[e]),X(i)}:oo().includes(n)?function(...e){return n.apply(jt(this),e),X(as.get(this))}:function(...e){return X(n.apply(jt(this),e))}}function ho(n){return typeof n=="function"?uo(n):(n instanceof IDBTransaction&&lo(n),so(n,ro())?new Proxy(n,on):n)}function X(n){if(n instanceof IDBRequest)return ao(n);if(Vt.has(n))return Vt.get(n);const e=ho(n);return e!==n&&(Vt.set(n,e),Tn.set(e,n)),e}const jt=n=>Tn.get(n);function fo(n,e,{blocked:t,upgrade:i,blocking:s,terminated:r}={}){const o=indexedDB.open(n,e),a=X(o);return i&&o.addEventListener("upgradeneeded",l=>{i(X(o.result),l.oldVersion,l.newVersion,X(o.transaction),l)}),t&&o.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),a.then(l=>{r&&l.addEventListener("close",()=>r()),s&&l.addEventListener("versionchange",c=>s(c.oldVersion,c.newVersion,c))}).catch(()=>{}),a}const po=["get","getKey","getAll","getAllKeys","count"],_o=["put","add","delete","clear"],qt=new Map;function ci(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(qt.get(e))return qt.get(e);const t=e.replace(/FromIndex$/,""),i=e!==t,s=_o.includes(t);if(!(t in(i?IDBIndex:IDBObjectStore).prototype)||!(s||po.includes(t)))return;const r=async function(o,...a){const l=this.transaction(o,s?"readwrite":"readonly");let c=l.store;return i&&(c=c.index(a.shift())),(await Promise.all([c[t](...a),s&&l.done]))[0]};return qt.set(e,r),r}co(n=>({...n,get:(e,t,i)=>ci(e,t)||n.get(e,t,i),has:(e,t)=>!!ci(e,t)||n.has(e,t)}));/**
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
 */class mo{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(go(t)){const i=t.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(t=>t).join(" ")}}function go(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const an="@firebase/app",ui="0.10.13";/**
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
 */const $=new os("@firebase/app"),yo="@firebase/app-compat",vo="@firebase/analytics-compat",Co="@firebase/analytics",Eo="@firebase/app-check-compat",bo="@firebase/app-check",So="@firebase/auth",wo="@firebase/auth-compat",Io="@firebase/database",To="@firebase/data-connect",Ro="@firebase/database-compat",No="@firebase/functions",ko="@firebase/functions-compat",Ao="@firebase/installations",Do="@firebase/installations-compat",Oo="@firebase/messaging",Po="@firebase/messaging-compat",xo="@firebase/performance",Lo="@firebase/performance-compat",Fo="@firebase/remote-config",Mo="@firebase/remote-config-compat",Uo="@firebase/storage",Wo="@firebase/storage-compat",Ho="@firebase/firestore",Bo="@firebase/vertexai-preview",Go="@firebase/firestore-compat",Vo="firebase",jo="10.14.1";/**
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
 */const ln="[DEFAULT]",qo={[an]:"fire-core",[yo]:"fire-core-compat",[Co]:"fire-analytics",[vo]:"fire-analytics-compat",[bo]:"fire-app-check",[Eo]:"fire-app-check-compat",[So]:"fire-auth",[wo]:"fire-auth-compat",[Io]:"fire-rtdb",[To]:"fire-data-connect",[Ro]:"fire-rtdb-compat",[No]:"fire-fn",[ko]:"fire-fn-compat",[Ao]:"fire-iid",[Do]:"fire-iid-compat",[Oo]:"fire-fcm",[Po]:"fire-fcm-compat",[xo]:"fire-perf",[Lo]:"fire-perf-compat",[Fo]:"fire-rc",[Mo]:"fire-rc-compat",[Uo]:"fire-gcs",[Wo]:"fire-gcs-compat",[Ho]:"fire-fst",[Go]:"fire-fst-compat",[Bo]:"fire-vertex","fire-js":"fire-js",[Vo]:"fire-js-all"};/**
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
 */const pt=new Map,zo=new Map,cn=new Map;function hi(n,e){try{n.container.addComponent(e)}catch(t){$.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function _t(n){const e=n.name;if(cn.has(e))return $.debug(`There were multiple attempts to register component ${e}.`),!1;cn.set(e,n);for(const t of pt.values())hi(t,n);for(const t of zo.values())hi(t,n);return!0}function $o(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}/**
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
 */const Ko={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Z=new ss("app","Firebase",Ko);/**
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
 */class Yo{constructor(e,t,i){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new qe("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Z.create("app-deleted",{appName:this._name})}}/**
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
 */const Qo=jo;function cs(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const i=Object.assign({name:ln,automaticDataCollectionEnabled:!1},e),s=i.name;if(typeof s!="string"||!s)throw Z.create("bad-app-name",{appName:String(s)});if(t||(t=ts()),!t)throw Z.create("no-options");const r=pt.get(s);if(r){if(sn(t,r.options)&&sn(i,r.config))return r;throw Z.create("duplicate-app",{appName:s})}const o=new Zr(s);for(const l of cn.values())o.addComponent(l);const a=new Yo(t,i,o);return pt.set(s,a),a}function Jo(n=ln){const e=pt.get(n);if(!e&&n===ln&&ts())return cs();if(!e)throw Z.create("no-app",{appName:n});return e}function ge(n,e,t){var i;let s=(i=qo[n])!==null&&i!==void 0?i:n;t&&(s+=`-${t}`);const r=s.match(/\s|\//),o=e.match(/\s|\//);if(r||o){const a=[`Unable to register library "${s}" with version "${e}":`];r&&a.push(`library name "${s}" contains illegal characters (whitespace or "/")`),r&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),$.warn(a.join(" "));return}_t(new qe(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
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
 */const Xo="firebase-heartbeat-database",Zo=1,ze="firebase-heartbeat-store";let zt=null;function us(){return zt||(zt=fo(Xo,Zo,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(ze)}catch(t){console.warn(t)}}}}).catch(n=>{throw Z.create("idb-open",{originalErrorMessage:n.message})})),zt}async function ea(n){try{const t=(await us()).transaction(ze),i=await t.objectStore(ze).get(hs(n));return await t.done,i}catch(e){if(e instanceof tt)$.warn(e.message);else{const t=Z.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});$.warn(t.message)}}}async function di(n,e){try{const i=(await us()).transaction(ze,"readwrite");await i.objectStore(ze).put(e,hs(n)),await i.done}catch(t){if(t instanceof tt)$.warn(t.message);else{const i=Z.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});$.warn(i.message)}}}function hs(n){return`${n.name}!${n.options.appId}`}/**
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
 */const ta=1024,na=30*24*60*60*1e3;class ia{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new ra(t),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=fi();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(o=>o.date===r)?void 0:(this._heartbeatsCache.heartbeats.push({date:r,agent:s}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const a=new Date(o.date).valueOf();return Date.now()-a<=na}),this._storage.overwrite(this._heartbeatsCache))}catch(i){$.warn(i)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=fi(),{heartbeatsToSend:i,unsentEntries:s}=sa(this._heartbeatsCache.heartbeats),r=dt(JSON.stringify({version:2,heartbeats:i}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(t){return $.warn(t),""}}}function fi(){return new Date().toISOString().substring(0,10)}function sa(n,e=ta){const t=[];let i=n.slice();for(const s of n){const r=t.find(o=>o.agent===s.agent);if(r){if(r.dates.push(s.date),pi(t)>e){r.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),pi(t)>e){t.pop();break}i=i.slice(1)}return{heartbeatsToSend:t,unsentEntries:i}}class ra{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Hr()?Br().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await ea(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return di(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return di(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function pi(n){return dt(JSON.stringify({version:2,heartbeats:n})).length}/**
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
 */function oa(n){_t(new qe("platform-logger",e=>new mo(e),"PRIVATE")),_t(new qe("heartbeat",e=>new ia(e),"PRIVATE")),ge(an,ui,n),ge(an,ui,"esm2017"),ge("fire-js","")}oa("");var aa="firebase",la="10.14.1";/**
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
 */ge(aa,la,"app");var _i={};const mi="@firebase/database",gi="1.0.8";/**
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
 */let ds="";function ca(n){ds=n}/**
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
 */class ua{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){t==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),k(t))}get(e){const t=this.domStorage_.getItem(this.prefixedName_(e));return t==null?null:je(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
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
 */class ha{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){t==null?delete this.cache_[e]:this.cache_[e]=t}get(e){return j(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
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
 */const fs=function(n){try{if(typeof window<"u"&&typeof window[n]<"u"){const e=window[n];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new ua(e)}}catch{}return new ha},ce=fs("localStorage"),da=fs("sessionStorage");/**
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
 */const ye=new os("@firebase/database"),fa=function(){let n=1;return function(){return n++}}(),ps=function(n){const e=Yr(n),t=new Kr;t.update(e);const i=t.digest();return In.encodeByteArray(i)},nt=function(...n){let e="";for(let t=0;t<n.length;t++){const i=n[t];Array.isArray(i)||i&&typeof i=="object"&&typeof i.length=="number"?e+=nt.apply(null,i):typeof i=="object"?e+=k(i):e+=i,e+=" "}return e};let We=null,yi=!0;const pa=function(n,e){f(!e,"Can't turn on custom loggers persistently."),ye.logLevel=I.VERBOSE,We=ye.log.bind(ye)},O=function(...n){if(yi===!0&&(yi=!1,We===null&&da.get("logging_enabled")===!0&&pa()),We){const e=nt.apply(null,n);We(e)}},it=function(n){return function(...e){O(n,...e)}},un=function(...n){const e="FIREBASE INTERNAL ERROR: "+nt(...n);ye.error(e)},K=function(...n){const e=`FIREBASE FATAL ERROR: ${nt(...n)}`;throw ye.error(e),new Error(e)},F=function(...n){const e="FIREBASE WARNING: "+nt(...n);ye.warn(e)},_a=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&F("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},At=function(n){return typeof n=="number"&&(n!==n||n===Number.POSITIVE_INFINITY||n===Number.NEGATIVE_INFINITY)},ma=function(n){if(document.readyState==="complete")n();else{let e=!1;const t=function(){if(!document.body){setTimeout(t,Math.floor(10));return}e||(e=!0,n())};document.addEventListener?(document.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("load",t,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&t()}),window.attachEvent("onload",t))}},be="[MIN_NAME]",ue="[MAX_NAME]",fe=function(n,e){if(n===e)return 0;if(n===be||e===ue)return-1;if(e===be||n===ue)return 1;{const t=vi(n),i=vi(e);return t!==null?i!==null?t-i===0?n.length-e.length:t-i:-1:i!==null?1:n<e?-1:1}},ga=function(n,e){return n===e?0:n<e?-1:1},Oe=function(n,e){if(e&&n in e)return e[n];throw new Error("Missing required key ("+n+") in object: "+k(e))},Rn=function(n){if(typeof n!="object"||n===null)return k(n);const e=[];for(const i in n)e.push(i);e.sort();let t="{";for(let i=0;i<e.length;i++)i!==0&&(t+=","),t+=k(e[i]),t+=":",t+=Rn(n[e[i]]);return t+="}",t},_s=function(n,e){const t=n.length;if(t<=e)return[n];const i=[];for(let s=0;s<t;s+=e)s+e>t?i.push(n.substring(s,t)):i.push(n.substring(s,s+e));return i};function P(n,e){for(const t in n)n.hasOwnProperty(t)&&e(t,n[t])}const ms=function(n){f(!At(n),"Invalid JSON number");const e=11,t=52,i=(1<<e-1)-1;let s,r,o,a,l;n===0?(r=0,o=0,s=1/n===-1/0?1:0):(s=n<0,n=Math.abs(n),n>=Math.pow(2,1-i)?(a=Math.min(Math.floor(Math.log(n)/Math.LN2),i),r=a+i,o=Math.round(n*Math.pow(2,t-a)-Math.pow(2,t))):(r=0,o=Math.round(n/Math.pow(2,1-i-t))));const c=[];for(l=t;l;l-=1)c.push(o%2?1:0),o=Math.floor(o/2);for(l=e;l;l-=1)c.push(r%2?1:0),r=Math.floor(r/2);c.push(s?1:0),c.reverse();const h=c.join("");let u="";for(l=0;l<64;l+=8){let d=parseInt(h.substr(l,8),2).toString(16);d.length===1&&(d="0"+d),u=u+d}return u.toLowerCase()},ya=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},va=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function Ca(n,e){let t="Unknown Error";n==="too_big"?t="The data requested exceeds the maximum size that can be accessed with a single request.":n==="permission_denied"?t="Client doesn't have permission to access the desired data.":n==="unavailable"&&(t="The service is unavailable");const i=new Error(n+" at "+e._path.toString()+": "+t);return i.code=n.toUpperCase(),i}const Ea=new RegExp("^-?(0*)\\d{1,10}$"),ba=-2147483648,Sa=2147483647,vi=function(n){if(Ea.test(n)){const e=Number(n);if(e>=ba&&e<=Sa)return e}return null},Ne=function(n){try{n()}catch(e){setTimeout(()=>{const t=e.stack||"";throw F("Exception was thrown by user callback.",t),e},Math.floor(0))}},wa=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},He=function(n,e){const t=setTimeout(n,e);return typeof t=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(t):typeof t=="object"&&t.unref&&t.unref(),t};/**
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
 */class Ia{constructor(e,t){this.appName_=e,this.appCheckProvider=t,this.appCheck=t==null?void 0:t.getImmediate({optional:!0}),this.appCheck||t==null||t.get().then(i=>this.appCheck=i)}getToken(e){return this.appCheck?this.appCheck.getToken(e):new Promise((t,i)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){var t;(t=this.appCheckProvider)===null||t===void 0||t.get().then(i=>i.addTokenListener(e))}notifyForInvalidToken(){F(`Provided AppCheck credentials for the app named "${this.appName_}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
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
 */class Ta{constructor(e,t,i){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=i,this.auth_=null,this.auth_=i.getImmediate({optional:!0}),this.auth_||i.onInit(s=>this.auth_=s)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(t=>t&&t.code==="auth/token-not-initialized"?(O("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(t)):new Promise((t,i)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(t=>t.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(t=>t.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',F(e)}}class ht{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}ht.OWNER="owner";/**
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
 */const Nn="5",gs="v",ys="s",vs="r",Cs="f",Es=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,bs="ls",Ss="p",hn="ac",ws="websocket",Is="long_polling";/**
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
 */class Ts{constructor(e,t,i,s,r=!1,o="",a=!1,l=!1){this.secure=t,this.namespace=i,this.webSocketOnly=s,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=l,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=ce.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&ce.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}}function Ra(n){return n.host!==n.internalHost||n.isCustomHost()||n.includeNamespaceInQueryParams}function Rs(n,e,t){f(typeof e=="string","typeof type must == string"),f(typeof t=="object","typeof params must == object");let i;if(e===ws)i=(n.secure?"wss://":"ws://")+n.internalHost+"/.ws?";else if(e===Is)i=(n.secure?"https://":"http://")+n.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);Ra(n)&&(t.ns=n.namespace);const s=[];return P(t,(r,o)=>{s.push(r+"="+o)}),i+s.join("&")}/**
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
 */class Na{constructor(){this.counters_={}}incrementCounter(e,t=1){j(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return kr(this.counters_)}}/**
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
 */const $t={},Kt={};function kn(n){const e=n.toString();return $t[e]||($t[e]=new Na),$t[e]}function ka(n,e){const t=n.toString();return Kt[t]||(Kt[t]=e()),Kt[t]}/**
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
 */class Aa{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){const i=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let s=0;s<i.length;++s)i[s]&&Ne(()=>{this.onMessage_(i[s])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
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
 */const Ci="start",Da="close",Oa="pLPCommand",Pa="pRTLPCB",Ns="id",ks="pw",As="ser",xa="cb",La="seg",Fa="ts",Ma="d",Ua="dframe",Ds=1870,Os=30,Wa=Ds-Os,Ha=25e3,Ba=3e4;class me{constructor(e,t,i,s,r,o,a){this.connId=e,this.repoInfo=t,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=it(e),this.stats_=kn(t),this.urlFn=l=>(this.appCheckToken&&(l[hn]=this.appCheckToken),Rs(t,Is,l))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new Aa(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(Ba)),ma(()=>{if(this.isClosed_)return;this.scriptTagHolder=new An((...r)=>{const[o,a,l,c,h]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===Ci)this.id=a,this.password=l;else if(o===Da)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,a]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const i={};i[Ci]="t",i[As]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(i[xa]=this.scriptTagHolder.uniqueCallbackIdentifier),i[gs]=Nn,this.transportSessionId&&(i[ys]=this.transportSessionId),this.lastSessionId&&(i[bs]=this.lastSessionId),this.applicationId&&(i[Ss]=this.applicationId),this.appCheckToken&&(i[hn]=this.appCheckToken),typeof location<"u"&&location.hostname&&Es.test(location.hostname)&&(i[vs]=Cs);const s=this.urlFn(i);this.log_("Connecting via long-poll to "+s),this.scriptTagHolder.addTag(s,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){me.forceAllow_=!0}static forceDisallow(){me.forceDisallow_=!0}static isAvailable(){return me.forceAllow_?!0:!me.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!ya()&&!va()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const t=k(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=Xi(t),s=_s(i,Wa);for(let r=0;r<s.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,s.length,s[r]),this.curSegmentNum++}addDisconnectPingFrame(e,t){this.myDisconnFrame=document.createElement("iframe");const i={};i[Ua]="t",i[Ns]=e,i[ks]=t,this.myDisconnFrame.src=this.urlFn(i),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const t=k(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}}class An{constructor(e,t,i,s){this.onDisconnect=i,this.urlFn=s,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=fa(),window[Oa+this.uniqueCallbackIdentifier]=e,window[Pa+this.uniqueCallbackIdentifier]=t,this.myIFrame=An.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){O("frame writing exception"),a.stack&&O(a.stack),O(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||O("No IE domain setting required")}catch{const i=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+i+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[Ns]=this.myID,e[ks]=this.myPW,e[As]=this.currentSerial;let t=this.urlFn(e),i="",s=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+Os+i.length<=Ds;){const o=this.pendingSegs.shift();i=i+"&"+La+s+"="+o.seg+"&"+Fa+s+"="+o.ts+"&"+Ma+s+"="+o.d,s++}return t=t+i,this.addLongPollTag_(t,this.currentSerial),!0}else return!1}enqueueSegment(e,t,i){this.pendingSegs.push({seg:e,ts:t,d:i}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);const i=()=>{this.outstandingRequests.delete(t),this.newRequest_()},s=setTimeout(i,Math.floor(Ha)),r=()=>{clearTimeout(s),i()};this.addTag(e,r)}addTag(e,t){setTimeout(()=>{try{if(!this.sendNewPolls)return;const i=this.myIFrame.doc.createElement("script");i.type="text/javascript",i.async=!0,i.src=e,i.onload=i.onreadystatechange=function(){const s=i.readyState;(!s||s==="loaded"||s==="complete")&&(i.onload=i.onreadystatechange=null,i.parentNode&&i.parentNode.removeChild(i),t())},i.onerror=()=>{O("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(i)}catch{}},Math.floor(1))}}/**
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
 */const Ga=16384,Va=45e3;let mt=null;typeof MozWebSocket<"u"?mt=MozWebSocket:typeof WebSocket<"u"&&(mt=WebSocket);class V{constructor(e,t,i,s,r,o,a){this.connId=e,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=it(this.connId),this.stats_=kn(t),this.connURL=V.connectionURL_(t,o,a,s,i),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,i,s,r){const o={};return o[gs]=Nn,typeof location<"u"&&location.hostname&&Es.test(location.hostname)&&(o[vs]=Cs),t&&(o[ys]=t),i&&(o[bs]=i),s&&(o[hn]=s),r&&(o[Ss]=r),Rs(e,ws,o)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,ce.set("previous_websocket_failure",!0);try{let i;is(),this.mySock=new mt(this.connURL,[],i)}catch(i){this.log_("Error instantiating WebSocket.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=i=>{this.handleIncomingFrame(i)},this.mySock.onerror=i=>{this.log_("WebSocket error.  Closing connection.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_()}}start(){}static forceDisallow(){V.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const t=/Android ([0-9]{0,}\.[0-9]{0,})/,i=navigator.userAgent.match(t);i&&i.length>1&&parseFloat(i[1])<4.4&&(e=!0)}return!e&&mt!==null&&!V.forceDisallow_}static previouslyFailed(){return ce.isInMemoryStorage||ce.get("previous_websocket_failure")===!0}markConnectionHealthy(){ce.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const t=this.frames.join("");this.frames=null;const i=je(t);this.onMessage(i)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(f(this.frames===null,"We already have a frame buffer"),e.length<=6){const t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(t);else{const i=this.extractFrameCount_(t);i!==null&&this.appendFrame_(i)}}send(e){this.resetKeepAlive();const t=k(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=_s(t,Ga);i.length>1&&this.sendString_(String(i.length));for(let s=0;s<i.length;s++)this.sendString_(i[s])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(Va))}sendString_(e){try{this.mySock.send(e)}catch(t){this.log_("Exception thrown from WebSocket.send():",t.message||t.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}V.responsesRequiredToBeHealthy=2;V.healthyTimeout=3e4;/**
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
 */class $e{constructor(e){this.initTransports_(e)}static get ALL_TRANSPORTS(){return[me,V]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}initTransports_(e){const t=V.isAvailable();let i=t&&!V.previouslyFailed();if(e.webSocketOnly&&(t||F("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),i=!0),i)this.transports_=[V];else{const s=this.transports_=[];for(const r of $e.ALL_TRANSPORTS)r&&r.isAvailable()&&s.push(r);$e.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}$e.globalTransportInitialized_=!1;/**
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
 */const ja=6e4,qa=5e3,za=10*1024,$a=100*1024,Yt="t",Ei="d",Ka="s",bi="r",Ya="e",Si="o",wi="a",Ii="n",Ti="p",Qa="h";class Ja{constructor(e,t,i,s,r,o,a,l,c,h){this.id=e,this.repoInfo_=t,this.applicationId_=i,this.appCheckToken_=s,this.authToken_=r,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=l,this.onKill_=c,this.lastSessionId=h,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=it("c:"+this.id+":"),this.transportManager_=new $e(t),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.conn_),i=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(t,i)},Math.floor(0));const s=e.healthyTimeout||0;s>0&&(this.healthyTimeout_=He(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>$a?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>za?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(s)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){const t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(Yt in e){const t=e[Yt];t===wi?this.upgradeIfSecondaryHealthy_():t===bi?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):t===Si&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const t=Oe("t",e),i=Oe("d",e);if(t==="c")this.onSecondaryControl_(i);else if(t==="d")this.pendingDataMessages.push(i);else throw new Error("Unknown protocol layer: "+t)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:Ti,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:wi,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:Ii,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const t=Oe("t",e),i=Oe("d",e);t==="c"?this.onControl_(i):t==="d"&&this.onDataMessage_(i)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const t=Oe(Yt,e);if(Ei in e){const i=e[Ei];if(t===Qa){const s=Object.assign({},i);this.repoInfo_.isUsingEmulator&&(s.h=this.repoInfo_.host),this.onHandshake_(s)}else if(t===Ii){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let s=0;s<this.pendingDataMessages.length;++s)this.onDataMessage_(this.pendingDataMessages[s]);this.pendingDataMessages=[],this.tryCleanupConnection()}else t===Ka?this.onConnectionShutdown_(i):t===bi?this.onReset_(i):t===Ya?un("Server Error: "+i):t===Si?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):un("Unknown control packet command: "+t)}}onHandshake_(e){const t=e.ts,i=e.v,s=e.h;this.sessionId=e.s,this.repoInfo_.host=s,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),Nn!==i&&F("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.secondaryConn_),i=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,i),He(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(ja))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):He(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(qa))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:Ti,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(ce.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
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
 */class Ps{put(e,t,i,s){}merge(e,t,i,s){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,i){}onDisconnectMerge(e,t,i){}onDisconnectCancel(e,t){}reportStats(e){}}/**
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
 */class xs{constructor(e){this.allowedEvents_=e,this.listeners_={},f(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){const i=[...this.listeners_[e]];for(let s=0;s<i.length;s++)i[s].callback.apply(i[s].context,t)}}on(e,t,i){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:i});const s=this.getInitialEvent(e);s&&t.apply(i,s)}off(e,t,i){this.validateEventType_(e);const s=this.listeners_[e]||[];for(let r=0;r<s.length;r++)if(s[r].callback===t&&(!i||i===s[r].context)){s.splice(r,1);return}}validateEventType_(e){f(this.allowedEvents_.find(t=>t===e),"Unknown event: "+e)}}/**
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
 */class gt extends xs{constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!ns()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}static getInstance(){return new gt}getInitialEvent(e){return f(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
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
 */const Ri=32,Ni=768;class E{constructor(e,t){if(t===void 0){this.pieces_=e.split("/");let i=0;for(let s=0;s<this.pieces_.length;s++)this.pieces_[s].length>0&&(this.pieces_[i]=this.pieces_[s],i++);this.pieces_.length=i,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)this.pieces_[t]!==""&&(e+="/"+this.pieces_[t]);return e||"/"}}function C(){return new E("")}function g(n){return n.pieceNum_>=n.pieces_.length?null:n.pieces_[n.pieceNum_]}function ne(n){return n.pieces_.length-n.pieceNum_}function S(n){let e=n.pieceNum_;return e<n.pieces_.length&&e++,new E(n.pieces_,e)}function Dn(n){return n.pieceNum_<n.pieces_.length?n.pieces_[n.pieces_.length-1]:null}function Xa(n){let e="";for(let t=n.pieceNum_;t<n.pieces_.length;t++)n.pieces_[t]!==""&&(e+="/"+encodeURIComponent(String(n.pieces_[t])));return e||"/"}function Ke(n,e=0){return n.pieces_.slice(n.pieceNum_+e)}function Ls(n){if(n.pieceNum_>=n.pieces_.length)return null;const e=[];for(let t=n.pieceNum_;t<n.pieces_.length-1;t++)e.push(n.pieces_[t]);return new E(e,0)}function T(n,e){const t=[];for(let i=n.pieceNum_;i<n.pieces_.length;i++)t.push(n.pieces_[i]);if(e instanceof E)for(let i=e.pieceNum_;i<e.pieces_.length;i++)t.push(e.pieces_[i]);else{const i=e.split("/");for(let s=0;s<i.length;s++)i[s].length>0&&t.push(i[s])}return new E(t,0)}function y(n){return n.pieceNum_>=n.pieces_.length}function L(n,e){const t=g(n),i=g(e);if(t===null)return e;if(t===i)return L(S(n),S(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+n+")")}function Za(n,e){const t=Ke(n,0),i=Ke(e,0);for(let s=0;s<t.length&&s<i.length;s++){const r=fe(t[s],i[s]);if(r!==0)return r}return t.length===i.length?0:t.length<i.length?-1:1}function On(n,e){if(ne(n)!==ne(e))return!1;for(let t=n.pieceNum_,i=e.pieceNum_;t<=n.pieces_.length;t++,i++)if(n.pieces_[t]!==e.pieces_[i])return!1;return!0}function U(n,e){let t=n.pieceNum_,i=e.pieceNum_;if(ne(n)>ne(e))return!1;for(;t<n.pieces_.length;){if(n.pieces_[t]!==e.pieces_[i])return!1;++t,++i}return!0}class el{constructor(e,t){this.errorPrefix_=t,this.parts_=Ke(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let i=0;i<this.parts_.length;i++)this.byteLength_+=kt(this.parts_[i]);Fs(this)}}function tl(n,e){n.parts_.length>0&&(n.byteLength_+=1),n.parts_.push(e),n.byteLength_+=kt(e),Fs(n)}function nl(n){const e=n.parts_.pop();n.byteLength_-=kt(e),n.parts_.length>0&&(n.byteLength_-=1)}function Fs(n){if(n.byteLength_>Ni)throw new Error(n.errorPrefix_+"has a key path longer than "+Ni+" bytes ("+n.byteLength_+").");if(n.parts_.length>Ri)throw new Error(n.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+Ri+") or object contains a cycle "+ae(n))}function ae(n){return n.parts_.length===0?"":"in property '"+n.parts_.join(".")+"'"}/**
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
 */class Pn extends xs{constructor(){super(["visible"]);let e,t;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(t="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(t="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(t="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,()=>{const i=!document[e];i!==this.visible_&&(this.visible_=i,this.trigger("visible",i))},!1)}static getInstance(){return new Pn}getInitialEvent(e){return f(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
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
 */const Pe=1e3,il=60*5*1e3,ki=30*1e3,sl=1.3,rl=3e4,ol="server_kill",Ai=3;class z extends Ps{constructor(e,t,i,s,r,o,a,l){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=i,this.onConnectStatus_=s,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=l,this.id=z.nextPersistentConnectionId_++,this.log_=it("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=Pe,this.maxReconnectDelay_=il,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,l&&!is())throw new Error("Auth override specified in options, but not supported on non Node.js platforms");Pn.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&gt.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,i){const s=++this.requestNumber_,r={r:s,a:e,b:t};this.log_(k(r)),f(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),i&&(this.requestCBHash_[s]=i)}get(e){this.initConnection_();const t=new G,s={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?t.resolve(a):t.reject(a)}};this.outstandingGets_.push(s),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),t.promise}listen(e,t,i,s){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),f(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),f(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const a={onComplete:s,hashFn:t,query:e,tag:i};this.listens.get(o).set(r,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const t=this.outstandingGets_[e];this.sendRequest("g",t.request,i=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(i)})}sendListen_(e){const t=e.query,i=t._path.toString(),s=t._queryIdentifier;this.log_("Listen on "+i+" for "+s);const r={p:i},o="q";e.tag&&(r.q=t._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,a=>{const l=a.d,c=a.s;z.warnOnListenWarnings_(l,t),(this.listens.get(i)&&this.listens.get(i).get(s))===e&&(this.log_("listen response",a),c!=="ok"&&this.removeListen_(i,s),e.onComplete&&e.onComplete(c,l))})}static warnOnListenWarnings_(e,t){if(e&&typeof e=="object"&&j(e,"w")){const i=Ce(e,"w");if(Array.isArray(i)&&~i.indexOf("no_index")){const s='".indexOn": "'+t._queryParams.getIndex().toString()+'"',r=t._path.toString();F(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${s} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||zr(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=ki)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,t=qr(e)?"auth":"gauth",i={cred:e};this.authOverride_===null?i.noauth=!0:typeof this.authOverride_=="object"&&(i.authvar=this.authOverride_),this.sendRequest(t,i,s=>{const r=s.s,o=s.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const t=e.s,i=e.d||"error";t==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,i)})}unlisten(e,t){const i=e._path.toString(),s=e._queryIdentifier;this.log_("Unlisten called for "+i+" "+s),f(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(i,s)&&this.connected_&&this.sendUnlisten_(i,s,e._queryObject,t)}sendUnlisten_(e,t,i,s){this.log_("Unlisten on "+e+" for "+t);const r={p:e},o="n";s&&(r.q=i,r.t=s),this.sendRequest(o,r)}onDisconnectPut(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:i})}onDisconnectMerge(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:i})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,i,s){const r={p:t,d:i};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{s&&setTimeout(()=>{s(o.s,o.d)},Math.floor(0))})}put(e,t,i,s){this.putInternal("p",e,t,i,s)}merge(e,t,i,s){this.putInternal("m",e,t,i,s)}putInternal(e,t,i,s,r){this.initConnection_();const o={p:t,d:i};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:s}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+t)}sendPut_(e){const t=this.outstandingPuts_[e].action,i=this.outstandingPuts_[e].request,s=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,i,r=>{this.log_(t+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),s&&s(r.s,r.d)})}reportStats(e){if(this.connected_){const t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,i=>{if(i.s!=="ok"){const r=i.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+k(e));const t=e.r,i=this.requestCBHash_[t];i&&(delete this.requestCBHash_[t],i(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),e==="d"?this.onDataUpdate_(t.p,t.d,!1,t.t):e==="m"?this.onDataUpdate_(t.p,t.d,!0,t.t):e==="c"?this.onListenRevoked_(t.p,t.q):e==="ac"?this.onAuthRevoked_(t.s,t.d):e==="apc"?this.onAppCheckRevoked_(t.s,t.d):e==="sd"?this.onSecurityDebugPacket_(t):un("Unrecognized action received from server: "+k(e)+`
Are you using the latest client?`)}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){f(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=Pe,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=Pe,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>rl&&(this.reconnectDelay_=Pe),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=new Date().getTime()-this.lastConnectionAttemptTime_;let t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*sl)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),i=this.onRealtimeDisconnect_.bind(this),s=this.id+":"+z.nextConnectionId_++,r=this.lastSessionId;let o=!1,a=null;const l=function(){a?a.close():(o=!0,i())},c=function(u){f(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(u)};this.realtime_={close:l,sendRequest:c};const h=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[u,d]=await Promise.all([this.authTokenProvider_.getToken(h),this.appCheckTokenProvider_.getToken(h)]);o?O("getToken() completed but was canceled"):(O("getToken() completed. Creating connection."),this.authToken_=u&&u.accessToken,this.appCheckToken_=d&&d.token,a=new Ja(s,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,i,p=>{F(p+" ("+this.repoInfo_.toString()+")"),this.interrupt(ol)},r))}catch(u){this.log_("Failed to get token: "+u),o||(this.repoInfo_.nodeAdmin&&F(u),l())}}}interrupt(e){O("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){O("Resuming connection for reason: "+e),delete this.interruptReasons_[e],nn(this.interruptReasons_)&&(this.reconnectDelay_=Pe,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const t=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let i;t?i=t.map(r=>Rn(r)).join("$"):i="default";const s=this.removeListen_(e,i);s&&s.onComplete&&s.onComplete("permission_denied")}removeListen_(e,t){const i=new E(e).toString();let s;if(this.listens.has(i)){const r=this.listens.get(i);s=r.get(t),r.delete(t),r.size===0&&this.listens.delete(i)}else s=void 0;return s}onAuthRevoked_(e,t){O("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=Ai&&(this.reconnectDelay_=ki,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){O("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=Ai&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let t="js";e["sdk."+t+"."+ds.replace(/\./g,"-")]=1,ns()?e["framework.cordova"]=1:Wr()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=gt.getInstance().currentlyOnline();return nn(this.interruptReasons_)&&e}}z.nextPersistentConnectionId_=0;z.nextConnectionId_=0;/**
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
 */class v{constructor(e,t){this.name=e,this.node=t}static Wrap(e,t){return new v(e,t)}}/**
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
 */class Dt{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){const i=new v(be,e),s=new v(be,t);return this.compare(i,s)!==0}minPost(){return v.MIN}}/**
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
 */let ct;class Ms extends Dt{static get __EMPTY_NODE(){return ct}static set __EMPTY_NODE(e){ct=e}compare(e,t){return fe(e.name,t.name)}isDefinedOn(e){throw Re("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return v.MIN}maxPost(){return new v(ue,ct)}makePost(e,t){return f(typeof e=="string","KeyIndex indexValue must always be a string."),new v(e,ct)}toString(){return".key"}}const ve=new Ms;/**
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
 */class ut{constructor(e,t,i,s,r=null){this.isReverse_=s,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=t?i(e.key,t):1,s&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),t;if(this.resultGenerator_?t=this.resultGenerator_(e.key,e.value):t={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return t}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class D{constructor(e,t,i,s,r){this.key=e,this.value=t,this.color=i??D.RED,this.left=s??M.EMPTY_NODE,this.right=r??M.EMPTY_NODE}copy(e,t,i,s,r){return new D(e??this.key,t??this.value,i??this.color,s??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,i){let s=this;const r=i(e,s.key);return r<0?s=s.copy(null,null,null,s.left.insert(e,t,i),null):r===0?s=s.copy(null,t,null,null,null):s=s.copy(null,null,null,null,s.right.insert(e,t,i)),s.fixUp_()}removeMin_(){if(this.left.isEmpty())return M.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let i,s;if(i=this,t(e,i.key)<0)!i.left.isEmpty()&&!i.left.isRed_()&&!i.left.left.isRed_()&&(i=i.moveRedLeft_()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed_()&&(i=i.rotateRight_()),!i.right.isEmpty()&&!i.right.isRed_()&&!i.right.left.isRed_()&&(i=i.moveRedRight_()),t(e,i.key)===0){if(i.right.isEmpty())return M.EMPTY_NODE;s=i.right.min_(),i=i.copy(s.key,s.value,null,null,i.right.removeMin_())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,D.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,D.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}D.RED=!0;D.BLACK=!1;class al{copy(e,t,i,s,r){return this}insert(e,t,i){return new D(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class M{constructor(e,t=M.EMPTY_NODE){this.comparator_=e,this.root_=t}insert(e,t){return new M(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,D.BLACK,null,null))}remove(e){return new M(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,D.BLACK,null,null))}get(e){let t,i=this.root_;for(;!i.isEmpty();){if(t=this.comparator_(e,i.key),t===0)return i.value;t<0?i=i.left:t>0&&(i=i.right)}return null}getPredecessorKey(e){let t,i=this.root_,s=null;for(;!i.isEmpty();)if(t=this.comparator_(e,i.key),t===0){if(i.left.isEmpty())return s?s.key:null;for(i=i.left;!i.right.isEmpty();)i=i.right;return i.key}else t<0?i=i.left:t>0&&(s=i,i=i.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new ut(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new ut(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new ut(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new ut(this.root_,null,this.comparator_,!0,e)}}M.EMPTY_NODE=new al;/**
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
 */function ll(n,e){return fe(n.name,e.name)}function xn(n,e){return fe(n,e)}/**
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
 */let dn;function cl(n){dn=n}const Us=function(n){return typeof n=="number"?"number:"+ms(n):"string:"+n},Ws=function(n){if(n.isLeafNode()){const e=n.val();f(typeof e=="string"||typeof e=="number"||typeof e=="object"&&j(e,".sv"),"Priority must be a string or number.")}else f(n===dn||n.isEmpty(),"priority of unexpected type.");f(n===dn||n.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
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
 */let Di;class A{constructor(e,t=A.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=t,this.lazyHash_=null,f(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),Ws(this.priorityNode_)}static set __childrenNodeConstructor(e){Di=e}static get __childrenNodeConstructor(){return Di}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new A(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:A.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return y(e)?this:g(e)===".priority"?this.priorityNode_:A.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return e===".priority"?this.updatePriority(t):t.isEmpty()&&e!==".priority"?this:A.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){const i=g(e);return i===null?t:t.isEmpty()&&i!==".priority"?this:(f(i!==".priority"||ne(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(i,A.__childrenNodeConstructor.EMPTY_NODE.updateChild(S(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+Us(this.priorityNode_.val())+":");const t=typeof this.value_;e+=t+":",t==="number"?e+=ms(this.value_):e+=this.value_,this.lazyHash_=ps(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===A.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof A.__childrenNodeConstructor?-1:(f(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const t=typeof e.value_,i=typeof this.value_,s=A.VALUE_TYPE_ORDER.indexOf(t),r=A.VALUE_TYPE_ORDER.indexOf(i);return f(s>=0,"Unknown leaf type: "+t),f(r>=0,"Unknown leaf type: "+i),s===r?i==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-s}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}else return!1}}A.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
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
 */let Hs,Bs;function ul(n){Hs=n}function hl(n){Bs=n}class dl extends Dt{compare(e,t){const i=e.node.getPriority(),s=t.node.getPriority(),r=i.compareTo(s);return r===0?fe(e.name,t.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return v.MIN}maxPost(){return new v(ue,new A("[PRIORITY-POST]",Bs))}makePost(e,t){const i=Hs(e);return new v(t,new A("[PRIORITY-POST]",i))}toString(){return".priority"}}const R=new dl;/**
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
 */const fl=Math.log(2);class pl{constructor(e){const t=r=>parseInt(Math.log(r)/fl,10),i=r=>parseInt(Array(r+1).join("1"),2);this.count=t(e+1),this.current_=this.count-1;const s=i(this.count);this.bits_=e+1&s}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const yt=function(n,e,t,i){n.sort(e);const s=function(l,c){const h=c-l;let u,d;if(h===0)return null;if(h===1)return u=n[l],d=t?t(u):u,new D(d,u.node,D.BLACK,null,null);{const p=parseInt(h/2,10)+l,_=s(l,p),b=s(p+1,c);return u=n[p],d=t?t(u):u,new D(d,u.node,D.BLACK,_,b)}},r=function(l){let c=null,h=null,u=n.length;const d=function(_,b){const x=u-_,_e=u;u-=_;const lt=s(x+1,_e),Gt=n[x],Tr=t?t(Gt):Gt;p(new D(Tr,Gt.node,b,null,lt))},p=function(_){c?(c.left=_,c=_):(h=_,c=_)};for(let _=0;_<l.count;++_){const b=l.nextBitIsOne(),x=Math.pow(2,l.count-(_+1));b?d(x,D.BLACK):(d(x,D.BLACK),d(x,D.RED))}return h},o=new pl(n.length),a=r(o);return new M(i||e,a)};/**
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
 */let Qt;const xe={};class q{constructor(e,t){this.indexes_=e,this.indexSet_=t}static get Default(){return f(R,"ChildrenNode.ts has not been loaded"),Qt=Qt||new q({".priority":xe},{".priority":R}),Qt}get(e){const t=Ce(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof M?t:null}hasIndex(e){return j(this.indexSet_,e.toString())}addIndex(e,t){f(e!==ve,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const i=[];let s=!1;const r=t.getIterator(v.Wrap);let o=r.getNext();for(;o;)s=s||e.isDefinedOn(o.node),i.push(o),o=r.getNext();let a;s?a=yt(i,e.getCompare()):a=xe;const l=e.toString(),c=Object.assign({},this.indexSet_);c[l]=e;const h=Object.assign({},this.indexes_);return h[l]=a,new q(h,c)}addToIndexes(e,t){const i=ft(this.indexes_,(s,r)=>{const o=Ce(this.indexSet_,r);if(f(o,"Missing index implementation for "+r),s===xe)if(o.isDefinedOn(e.node)){const a=[],l=t.getIterator(v.Wrap);let c=l.getNext();for(;c;)c.name!==e.name&&a.push(c),c=l.getNext();return a.push(e),yt(a,o.getCompare())}else return xe;else{const a=t.get(e.name);let l=s;return a&&(l=l.remove(new v(e.name,a))),l.insert(e,e.node)}});return new q(i,this.indexSet_)}removeFromIndexes(e,t){const i=ft(this.indexes_,s=>{if(s===xe)return s;{const r=t.get(e.name);return r?s.remove(new v(e.name,r)):s}});return new q(i,this.indexSet_)}}/**
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
 */let Le;class m{constructor(e,t,i){this.children_=e,this.priorityNode_=t,this.indexMap_=i,this.lazyHash_=null,this.priorityNode_&&Ws(this.priorityNode_),this.children_.isEmpty()&&f(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}static get EMPTY_NODE(){return Le||(Le=new m(new M(xn),null,q.Default))}isLeafNode(){return!1}getPriority(){return this.priorityNode_||Le}updatePriority(e){return this.children_.isEmpty()?this:new m(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const t=this.children_.get(e);return t===null?Le:t}}getChild(e){const t=g(e);return t===null?this:this.getImmediateChild(t).getChild(S(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,t){if(f(t,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(t);{const i=new v(e,t);let s,r;t.isEmpty()?(s=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(i,this.children_)):(s=this.children_.insert(e,t),r=this.indexMap_.addToIndexes(i,this.children_));const o=s.isEmpty()?Le:this.priorityNode_;return new m(s,o,r)}}updateChild(e,t){const i=g(e);if(i===null)return t;{f(g(e)!==".priority"||ne(e)===1,".priority must be the last token in a path");const s=this.getImmediateChild(i).updateChild(S(e),t);return this.updateImmediateChild(i,s)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const t={};let i=0,s=0,r=!0;if(this.forEachChild(R,(o,a)=>{t[o]=a.val(e),i++,r&&m.INTEGER_REGEXP_.test(o)?s=Math.max(s,Number(o)):r=!1}),!e&&r&&s<2*i){const o=[];for(const a in t)o[a]=t[a];return o}else return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+Us(this.getPriority().val())+":"),this.forEachChild(R,(t,i)=>{const s=i.hash();s!==""&&(e+=":"+t+":"+s)}),this.lazyHash_=e===""?"":ps(e)}return this.lazyHash_}getPredecessorChildName(e,t,i){const s=this.resolveIndex_(i);if(s){const r=s.getPredecessorKey(new v(e,t));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.minKey();return i&&i.name}else return this.children_.minKey()}getFirstChild(e){const t=this.getFirstChildName(e);return t?new v(t,this.children_.get(t)):null}getLastChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.maxKey();return i&&i.name}else return this.children_.maxKey()}getLastChild(e){const t=this.getLastChildName(e);return t?new v(t,this.children_.get(t)):null}forEachChild(e,t){const i=this.resolveIndex_(e);return i?i.inorderTraversal(s=>t(s.name,s.node)):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getIteratorFrom(e,s=>s);{const s=this.children_.getIteratorFrom(e.name,v.Wrap);let r=s.peek();for(;r!=null&&t.compare(r,e)<0;)s.getNext(),r=s.peek();return s}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getReverseIteratorFrom(e,s=>s);{const s=this.children_.getReverseIteratorFrom(e.name,v.Wrap);let r=s.peek();for(;r!=null&&t.compare(r,e)>0;)s.getNext(),r=s.peek();return s}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===st?-1:0}withIndex(e){if(e===ve||this.indexMap_.hasIndex(e))return this;{const t=this.indexMap_.addIndex(e,this.children_);return new m(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===ve||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const t=e;if(this.getPriority().equals(t.getPriority()))if(this.children_.count()===t.children_.count()){const i=this.getIterator(R),s=t.getIterator(R);let r=i.getNext(),o=s.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=i.getNext(),o=s.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===ve?null:this.indexMap_.get(e.toString())}}m.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class _l extends m{constructor(){super(new M(xn),m.EMPTY_NODE,q.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return m.EMPTY_NODE}isEmpty(){return!1}}const st=new _l;Object.defineProperties(v,{MIN:{value:new v(be,m.EMPTY_NODE)},MAX:{value:new v(ue,st)}});Ms.__EMPTY_NODE=m.EMPTY_NODE;A.__childrenNodeConstructor=m;cl(st);hl(st);/**
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
 */const ml=!0;function N(n,e=null){if(n===null)return m.EMPTY_NODE;if(typeof n=="object"&&".priority"in n&&(e=n[".priority"]),f(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof n=="object"&&".value"in n&&n[".value"]!==null&&(n=n[".value"]),typeof n!="object"||".sv"in n){const t=n;return new A(t,N(e))}if(!(n instanceof Array)&&ml){const t=[];let i=!1;if(P(n,(o,a)=>{if(o.substring(0,1)!=="."){const l=N(a);l.isEmpty()||(i=i||!l.getPriority().isEmpty(),t.push(new v(o,l)))}}),t.length===0)return m.EMPTY_NODE;const r=yt(t,ll,o=>o.name,xn);if(i){const o=yt(t,R.getCompare());return new m(r,N(e),new q({".priority":o},{".priority":R}))}else return new m(r,N(e),q.Default)}else{let t=m.EMPTY_NODE;return P(n,(i,s)=>{if(j(n,i)&&i.substring(0,1)!=="."){const r=N(s);(r.isLeafNode()||!r.isEmpty())&&(t=t.updateImmediateChild(i,r))}}),t.updatePriority(N(e))}}ul(N);/**
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
 */class gl extends Dt{constructor(e){super(),this.indexPath_=e,f(!y(e)&&g(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){const i=this.extractChild(e.node),s=this.extractChild(t.node),r=i.compareTo(s);return r===0?fe(e.name,t.name):r}makePost(e,t){const i=N(e),s=m.EMPTY_NODE.updateChild(this.indexPath_,i);return new v(t,s)}maxPost(){const e=m.EMPTY_NODE.updateChild(this.indexPath_,st);return new v(ue,e)}toString(){return Ke(this.indexPath_,0).join("/")}}/**
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
 */class yl extends Dt{compare(e,t){const i=e.node.compareTo(t.node);return i===0?fe(e.name,t.name):i}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return v.MIN}maxPost(){return v.MAX}makePost(e,t){const i=N(e);return new v(t,i)}toString(){return".value"}}const vl=new yl;/**
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
 */function Gs(n){return{type:"value",snapshotNode:n}}function Se(n,e){return{type:"child_added",snapshotNode:e,childName:n}}function Ye(n,e){return{type:"child_removed",snapshotNode:e,childName:n}}function Qe(n,e,t){return{type:"child_changed",snapshotNode:e,childName:n,oldSnap:t}}function Cl(n,e){return{type:"child_moved",snapshotNode:e,childName:n}}/**
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
 */class Ln{constructor(e){this.index_=e}updateChild(e,t,i,s,r,o){f(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(t);return a.getChild(s).equals(i.getChild(s))&&a.isEmpty()===i.isEmpty()||(o!=null&&(i.isEmpty()?e.hasChild(t)?o.trackChildChange(Ye(t,a)):f(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(Se(t,i)):o.trackChildChange(Qe(t,i,a))),e.isLeafNode()&&i.isEmpty())?e:e.updateImmediateChild(t,i).withIndex(this.index_)}updateFullNode(e,t,i){return i!=null&&(e.isLeafNode()||e.forEachChild(R,(s,r)=>{t.hasChild(s)||i.trackChildChange(Ye(s,r))}),t.isLeafNode()||t.forEachChild(R,(s,r)=>{if(e.hasChild(s)){const o=e.getImmediateChild(s);o.equals(r)||i.trackChildChange(Qe(s,r,o))}else i.trackChildChange(Se(s,r))})),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?m.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
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
 */class Je{constructor(e){this.indexedFilter_=new Ln(e.getIndex()),this.index_=e.getIndex(),this.startPost_=Je.getStartPost_(e),this.endPost_=Je.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const t=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,i=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return t&&i}updateChild(e,t,i,s,r,o){return this.matches(new v(t,i))||(i=m.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,i,s,r,o)}updateFullNode(e,t,i){t.isLeafNode()&&(t=m.EMPTY_NODE);let s=t.withIndex(this.index_);s=s.updatePriority(m.EMPTY_NODE);const r=this;return t.forEachChild(R,(o,a)=>{r.matches(new v(o,a))||(s=s.updateImmediateChild(o,m.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,s,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}else return e.getIndex().maxPost()}}/**
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
 */class El{constructor(e){this.withinDirectionalStart=t=>this.reverse_?this.withinEndPost(t):this.withinStartPost(t),this.withinDirectionalEnd=t=>this.reverse_?this.withinStartPost(t):this.withinEndPost(t),this.withinStartPost=t=>{const i=this.index_.compare(this.rangedFilter_.getStartPost(),t);return this.startIsInclusive_?i<=0:i<0},this.withinEndPost=t=>{const i=this.index_.compare(t,this.rangedFilter_.getEndPost());return this.endIsInclusive_?i<=0:i<0},this.rangedFilter_=new Je(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,i,s,r,o){return this.rangedFilter_.matches(new v(t,i))||(i=m.EMPTY_NODE),e.getImmediateChild(t).equals(i)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,i,s,r,o):this.fullLimitUpdateChild_(e,t,i,r,o)}updateFullNode(e,t,i){let s;if(t.isLeafNode()||t.isEmpty())s=m.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<t.numChildren()&&t.isIndexed(this.index_)){s=m.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const a=r.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))s=s.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{s=t.withIndex(this.index_),s=s.updatePriority(m.EMPTY_NODE);let r;this.reverse_?r=s.getReverseIterator(this.index_):r=s.getIterator(this.index_);let o=0;for(;r.hasNext();){const a=r.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:s=s.updateImmediateChild(a.name,m.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,s,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,i,s,r){let o;if(this.reverse_){const u=this.index_.getCompare();o=(d,p)=>u(p,d)}else o=this.index_.getCompare();const a=e;f(a.numChildren()===this.limit_,"");const l=new v(t,i),c=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),h=this.rangedFilter_.matches(l);if(a.hasChild(t)){const u=a.getImmediateChild(t);let d=s.getChildAfterChild(this.index_,c,this.reverse_);for(;d!=null&&(d.name===t||a.hasChild(d.name));)d=s.getChildAfterChild(this.index_,d,this.reverse_);const p=d==null?1:o(d,l);if(h&&!i.isEmpty()&&p>=0)return r!=null&&r.trackChildChange(Qe(t,i,u)),a.updateImmediateChild(t,i);{r!=null&&r.trackChildChange(Ye(t,u));const b=a.updateImmediateChild(t,m.EMPTY_NODE);return d!=null&&this.rangedFilter_.matches(d)?(r!=null&&r.trackChildChange(Se(d.name,d.node)),b.updateImmediateChild(d.name,d.node)):b}}else return i.isEmpty()?e:h&&o(c,l)>=0?(r!=null&&(r.trackChildChange(Ye(c.name,c.node)),r.trackChildChange(Se(t,i))),a.updateImmediateChild(t,i).updateImmediateChild(c.name,m.EMPTY_NODE)):e}}/**
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
 */class Fn{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=R}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return f(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return f(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:be}hasEnd(){return this.endSet_}getIndexEndValue(){return f(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return f(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:ue}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return f(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===R}copy(){const e=new Fn;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function bl(n){return n.loadsAllData()?new Ln(n.getIndex()):n.hasLimit()?new El(n):new Je(n)}function Oi(n){const e={};if(n.isDefault())return e;let t;if(n.index_===R?t="$priority":n.index_===vl?t="$value":n.index_===ve?t="$key":(f(n.index_ instanceof gl,"Unrecognized index type!"),t=n.index_.toString()),e.orderBy=k(t),n.startSet_){const i=n.startAfterSet_?"startAfter":"startAt";e[i]=k(n.indexStartValue_),n.startNameSet_&&(e[i]+=","+k(n.indexStartName_))}if(n.endSet_){const i=n.endBeforeSet_?"endBefore":"endAt";e[i]=k(n.indexEndValue_),n.endNameSet_&&(e[i]+=","+k(n.indexEndName_))}return n.limitSet_&&(n.isViewFromLeft()?e.limitToFirst=n.limit_:e.limitToLast=n.limit_),e}function Pi(n){const e={};if(n.startSet_&&(e.sp=n.indexStartValue_,n.startNameSet_&&(e.sn=n.indexStartName_),e.sin=!n.startAfterSet_),n.endSet_&&(e.ep=n.indexEndValue_,n.endNameSet_&&(e.en=n.indexEndName_),e.ein=!n.endBeforeSet_),n.limitSet_){e.l=n.limit_;let t=n.viewFrom_;t===""&&(n.isViewFromLeft()?t="l":t="r"),e.vf=t}return n.index_!==R&&(e.i=n.index_.toString()),e}/**
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
 */class vt extends Ps{constructor(e,t,i,s){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=i,this.appCheckTokenProvider_=s,this.log_=it("p:rest:"),this.listens_={}}reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return t!==void 0?"tag$"+t:(f(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}listen(e,t,i,s){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=vt.getListenId_(e,i),a={};this.listens_[o]=a;const l=Oi(e._queryParams);this.restRequest_(r+".json",l,(c,h)=>{let u=h;if(c===404&&(u=null,c=null),c===null&&this.onDataUpdate_(r,u,!1,i),Ce(this.listens_,o)===a){let d;c?c===401?d="permission_denied":d="rest_error:"+c:d="ok",s(d,null)}})}unlisten(e,t){const i=vt.getListenId_(e,t);delete this.listens_[i]}get(e){const t=Oi(e._queryParams),i=e._path.toString(),s=new G;return this.restRequest_(i+".json",t,(r,o)=>{let a=o;r===404&&(a=null,r=null),r===null?(this.onDataUpdate_(i,a,!1,null),s.resolve(a)):s.reject(new Error(a))}),s.promise}refreshAuthToken(e){}restRequest_(e,t={},i){return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([s,r])=>{s&&s.accessToken&&(t.auth=s.accessToken),r&&r.token&&(t.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+$r(t);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(i&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let l=null;if(a.status>=200&&a.status<300){try{l=je(a.responseText)}catch{F("Failed to parse JSON response for "+o+": "+a.responseText)}i(null,l)}else a.status!==401&&a.status!==404&&F("Got unsuccessful REST response for "+o+" Status: "+a.status),i(a.status);i=null}},a.open("GET",o,!0),a.send()})}}/**
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
 */class Sl{constructor(){this.rootNode_=m.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}}/**
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
 */function Ct(){return{value:null,children:new Map}}function ke(n,e,t){if(y(e))n.value=t,n.children.clear();else if(n.value!==null)n.value=n.value.updateChild(e,t);else{const i=g(e);n.children.has(i)||n.children.set(i,Ct());const s=n.children.get(i);e=S(e),ke(s,e,t)}}function fn(n,e){if(y(e))return n.value=null,n.children.clear(),!0;if(n.value!==null){if(n.value.isLeafNode())return!1;{const t=n.value;return n.value=null,t.forEachChild(R,(i,s)=>{ke(n,new E(i),s)}),fn(n,e)}}else if(n.children.size>0){const t=g(e);return e=S(e),n.children.has(t)&&fn(n.children.get(t),e)&&n.children.delete(t),n.children.size===0}else return!0}function pn(n,e,t){n.value!==null?t(e,n.value):wl(n,(i,s)=>{const r=new E(e.toString()+"/"+i);pn(s,r,t)})}function wl(n,e){n.children.forEach((t,i)=>{e(i,t)})}/**
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
 */class Il{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),t=Object.assign({},e);return this.last_&&P(this.last_,(i,s)=>{t[i]=t[i]-s}),this.last_=e,t}}/**
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
 */const xi=10*1e3,Tl=30*1e3,Rl=5*60*1e3;class Nl{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new Il(e);const i=xi+(Tl-xi)*Math.random();He(this.reportStats_.bind(this),Math.floor(i))}reportStats_(){const e=this.statsListener_.get(),t={};let i=!1;P(e,(s,r)=>{r>0&&j(this.statsToReport_,s)&&(t[s]=r,i=!0)}),i&&this.server_.reportStats(t),He(this.reportStats_.bind(this),Math.floor(Math.random()*2*Rl))}}/**
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
 */var H;(function(n){n[n.OVERWRITE=0]="OVERWRITE",n[n.MERGE=1]="MERGE",n[n.ACK_USER_WRITE=2]="ACK_USER_WRITE",n[n.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(H||(H={}));function Mn(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function Un(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function Wn(n){return{fromUser:!1,fromServer:!0,queryId:n,tagged:!0}}/**
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
 */class Et{constructor(e,t,i){this.path=e,this.affectedTree=t,this.revert=i,this.type=H.ACK_USER_WRITE,this.source=Mn()}operationForChild(e){if(y(this.path)){if(this.affectedTree.value!=null)return f(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const t=this.affectedTree.subtree(new E(e));return new Et(C(),t,this.revert)}}else return f(g(this.path)===e,"operationForChild called for unrelated child."),new Et(S(this.path),this.affectedTree,this.revert)}}/**
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
 */class Xe{constructor(e,t){this.source=e,this.path=t,this.type=H.LISTEN_COMPLETE}operationForChild(e){return y(this.path)?new Xe(this.source,C()):new Xe(this.source,S(this.path))}}/**
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
 */class he{constructor(e,t,i){this.source=e,this.path=t,this.snap=i,this.type=H.OVERWRITE}operationForChild(e){return y(this.path)?new he(this.source,C(),this.snap.getImmediateChild(e)):new he(this.source,S(this.path),this.snap)}}/**
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
 */class we{constructor(e,t,i){this.source=e,this.path=t,this.children=i,this.type=H.MERGE}operationForChild(e){if(y(this.path)){const t=this.children.subtree(new E(e));return t.isEmpty()?null:t.value?new he(this.source,C(),t.value):new we(this.source,C(),t)}else return f(g(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new we(this.source,S(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
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
 */class ie{constructor(e,t,i){this.node_=e,this.fullyInitialized_=t,this.filtered_=i}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(y(e))return this.isFullyInitialized()&&!this.filtered_;const t=g(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
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
 */class kl{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function Al(n,e,t,i){const s=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&n.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(Cl(o.childName,o.snapshotNode))}),Fe(n,s,"child_removed",e,i,t),Fe(n,s,"child_added",e,i,t),Fe(n,s,"child_moved",r,i,t),Fe(n,s,"child_changed",e,i,t),Fe(n,s,"value",e,i,t),s}function Fe(n,e,t,i,s,r){const o=i.filter(a=>a.type===t);o.sort((a,l)=>Ol(n,a,l)),o.forEach(a=>{const l=Dl(n,a,r);s.forEach(c=>{c.respondsTo(a.type)&&e.push(c.createEvent(l,n.query_))})})}function Dl(n,e,t){return e.type==="value"||e.type==="child_removed"||(e.prevName=t.getPredecessorChildName(e.childName,e.snapshotNode,n.index_)),e}function Ol(n,e,t){if(e.childName==null||t.childName==null)throw Re("Should only compare child_ events.");const i=new v(e.childName,e.snapshotNode),s=new v(t.childName,t.snapshotNode);return n.index_.compare(i,s)}/**
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
 */function Ot(n,e){return{eventCache:n,serverCache:e}}function Be(n,e,t,i){return Ot(new ie(e,t,i),n.serverCache)}function Vs(n,e,t,i){return Ot(n.eventCache,new ie(e,t,i))}function bt(n){return n.eventCache.isFullyInitialized()?n.eventCache.getNode():null}function de(n){return n.serverCache.isFullyInitialized()?n.serverCache.getNode():null}/**
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
 */let Jt;const Pl=()=>(Jt||(Jt=new M(ga)),Jt);class w{constructor(e,t=Pl()){this.value=e,this.children=t}static fromObject(e){let t=new w(null);return P(e,(i,s)=>{t=t.set(new E(i),s)}),t}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(this.value!=null&&t(this.value))return{path:C(),value:this.value};if(y(e))return null;{const i=g(e),s=this.children.get(i);if(s!==null){const r=s.findRootMostMatchingPathAndValue(S(e),t);return r!=null?{path:T(new E(i),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(y(e))return this;{const t=g(e),i=this.children.get(t);return i!==null?i.subtree(S(e)):new w(null)}}set(e,t){if(y(e))return new w(t,this.children);{const i=g(e),r=(this.children.get(i)||new w(null)).set(S(e),t),o=this.children.insert(i,r);return new w(this.value,o)}}remove(e){if(y(e))return this.children.isEmpty()?new w(null):new w(null,this.children);{const t=g(e),i=this.children.get(t);if(i){const s=i.remove(S(e));let r;return s.isEmpty()?r=this.children.remove(t):r=this.children.insert(t,s),this.value===null&&r.isEmpty()?new w(null):new w(this.value,r)}else return this}}get(e){if(y(e))return this.value;{const t=g(e),i=this.children.get(t);return i?i.get(S(e)):null}}setTree(e,t){if(y(e))return t;{const i=g(e),r=(this.children.get(i)||new w(null)).setTree(S(e),t);let o;return r.isEmpty()?o=this.children.remove(i):o=this.children.insert(i,r),new w(this.value,o)}}fold(e){return this.fold_(C(),e)}fold_(e,t){const i={};return this.children.inorderTraversal((s,r)=>{i[s]=r.fold_(T(e,s),t)}),t(e,this.value,i)}findOnPath(e,t){return this.findOnPath_(e,C(),t)}findOnPath_(e,t,i){const s=this.value?i(t,this.value):!1;if(s)return s;if(y(e))return null;{const r=g(e),o=this.children.get(r);return o?o.findOnPath_(S(e),T(t,r),i):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,C(),t)}foreachOnPath_(e,t,i){if(y(e))return this;{this.value&&i(t,this.value);const s=g(e),r=this.children.get(s);return r?r.foreachOnPath_(S(e),T(t,s),i):new w(null)}}foreach(e){this.foreach_(C(),e)}foreach_(e,t){this.children.inorderTraversal((i,s)=>{s.foreach_(T(e,i),t)}),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal((t,i)=>{i.value&&e(t,i.value)})}}/**
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
 */class B{constructor(e){this.writeTree_=e}static empty(){return new B(new w(null))}}function Ge(n,e,t){if(y(e))return new B(new w(t));{const i=n.writeTree_.findRootMostValueAndPath(e);if(i!=null){const s=i.path;let r=i.value;const o=L(s,e);return r=r.updateChild(o,t),new B(n.writeTree_.set(s,r))}else{const s=new w(t),r=n.writeTree_.setTree(e,s);return new B(r)}}}function _n(n,e,t){let i=n;return P(t,(s,r)=>{i=Ge(i,T(e,s),r)}),i}function Li(n,e){if(y(e))return B.empty();{const t=n.writeTree_.setTree(e,new w(null));return new B(t)}}function mn(n,e){return pe(n,e)!=null}function pe(n,e){const t=n.writeTree_.findRootMostValueAndPath(e);return t!=null?n.writeTree_.get(t.path).getChild(L(t.path,e)):null}function Fi(n){const e=[],t=n.writeTree_.value;return t!=null?t.isLeafNode()||t.forEachChild(R,(i,s)=>{e.push(new v(i,s))}):n.writeTree_.children.inorderTraversal((i,s)=>{s.value!=null&&e.push(new v(i,s.value))}),e}function ee(n,e){if(y(e))return n;{const t=pe(n,e);return t!=null?new B(new w(t)):new B(n.writeTree_.subtree(e))}}function gn(n){return n.writeTree_.isEmpty()}function Ie(n,e){return js(C(),n.writeTree_,e)}function js(n,e,t){if(e.value!=null)return t.updateChild(n,e.value);{let i=null;return e.children.inorderTraversal((s,r)=>{s===".priority"?(f(r.value!==null,"Priority writes must always be leaf nodes"),i=r.value):t=js(T(n,s),r,t)}),!t.getChild(n).isEmpty()&&i!==null&&(t=t.updateChild(T(n,".priority"),i)),t}}/**
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
 */function Pt(n,e){return Ks(e,n)}function xl(n,e,t,i,s){f(i>n.lastWriteId,"Stacking an older write on top of newer ones"),s===void 0&&(s=!0),n.allWrites.push({path:e,snap:t,writeId:i,visible:s}),s&&(n.visibleWrites=Ge(n.visibleWrites,e,t)),n.lastWriteId=i}function Ll(n,e,t,i){f(i>n.lastWriteId,"Stacking an older merge on top of newer ones"),n.allWrites.push({path:e,children:t,writeId:i,visible:!0}),n.visibleWrites=_n(n.visibleWrites,e,t),n.lastWriteId=i}function Fl(n,e){for(let t=0;t<n.allWrites.length;t++){const i=n.allWrites[t];if(i.writeId===e)return i}return null}function Ml(n,e){const t=n.allWrites.findIndex(a=>a.writeId===e);f(t>=0,"removeWrite called with nonexistent writeId.");const i=n.allWrites[t];n.allWrites.splice(t,1);let s=i.visible,r=!1,o=n.allWrites.length-1;for(;s&&o>=0;){const a=n.allWrites[o];a.visible&&(o>=t&&Ul(a,i.path)?s=!1:U(i.path,a.path)&&(r=!0)),o--}if(s){if(r)return Wl(n),!0;if(i.snap)n.visibleWrites=Li(n.visibleWrites,i.path);else{const a=i.children;P(a,l=>{n.visibleWrites=Li(n.visibleWrites,T(i.path,l))})}return!0}else return!1}function Ul(n,e){if(n.snap)return U(n.path,e);for(const t in n.children)if(n.children.hasOwnProperty(t)&&U(T(n.path,t),e))return!0;return!1}function Wl(n){n.visibleWrites=qs(n.allWrites,Hl,C()),n.allWrites.length>0?n.lastWriteId=n.allWrites[n.allWrites.length-1].writeId:n.lastWriteId=-1}function Hl(n){return n.visible}function qs(n,e,t){let i=B.empty();for(let s=0;s<n.length;++s){const r=n[s];if(e(r)){const o=r.path;let a;if(r.snap)U(t,o)?(a=L(t,o),i=Ge(i,a,r.snap)):U(o,t)&&(a=L(o,t),i=Ge(i,C(),r.snap.getChild(a)));else if(r.children){if(U(t,o))a=L(t,o),i=_n(i,a,r.children);else if(U(o,t))if(a=L(o,t),y(a))i=_n(i,C(),r.children);else{const l=Ce(r.children,g(a));if(l){const c=l.getChild(S(a));i=Ge(i,C(),c)}}}else throw Re("WriteRecord should have .snap or .children")}}return i}function zs(n,e,t,i,s){if(!i&&!s){const r=pe(n.visibleWrites,e);if(r!=null)return r;{const o=ee(n.visibleWrites,e);if(gn(o))return t;if(t==null&&!mn(o,C()))return null;{const a=t||m.EMPTY_NODE;return Ie(o,a)}}}else{const r=ee(n.visibleWrites,e);if(!s&&gn(r))return t;if(!s&&t==null&&!mn(r,C()))return null;{const o=function(c){return(c.visible||s)&&(!i||!~i.indexOf(c.writeId))&&(U(c.path,e)||U(e,c.path))},a=qs(n.allWrites,o,e),l=t||m.EMPTY_NODE;return Ie(a,l)}}}function Bl(n,e,t){let i=m.EMPTY_NODE;const s=pe(n.visibleWrites,e);if(s)return s.isLeafNode()||s.forEachChild(R,(r,o)=>{i=i.updateImmediateChild(r,o)}),i;if(t){const r=ee(n.visibleWrites,e);return t.forEachChild(R,(o,a)=>{const l=Ie(ee(r,new E(o)),a);i=i.updateImmediateChild(o,l)}),Fi(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}else{const r=ee(n.visibleWrites,e);return Fi(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}}function Gl(n,e,t,i,s){f(i||s,"Either existingEventSnap or existingServerSnap must exist");const r=T(e,t);if(mn(n.visibleWrites,r))return null;{const o=ee(n.visibleWrites,r);return gn(o)?s.getChild(t):Ie(o,s.getChild(t))}}function Vl(n,e,t,i){const s=T(e,t),r=pe(n.visibleWrites,s);if(r!=null)return r;if(i.isCompleteForChild(t)){const o=ee(n.visibleWrites,s);return Ie(o,i.getNode().getImmediateChild(t))}else return null}function jl(n,e){return pe(n.visibleWrites,e)}function ql(n,e,t,i,s,r,o){let a;const l=ee(n.visibleWrites,e),c=pe(l,C());if(c!=null)a=c;else if(t!=null)a=Ie(l,t);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const h=[],u=o.getCompare(),d=r?a.getReverseIteratorFrom(i,o):a.getIteratorFrom(i,o);let p=d.getNext();for(;p&&h.length<s;)u(p,i)!==0&&h.push(p),p=d.getNext();return h}else return[]}function zl(){return{visibleWrites:B.empty(),allWrites:[],lastWriteId:-1}}function St(n,e,t,i){return zs(n.writeTree,n.treePath,e,t,i)}function Hn(n,e){return Bl(n.writeTree,n.treePath,e)}function Mi(n,e,t,i){return Gl(n.writeTree,n.treePath,e,t,i)}function wt(n,e){return jl(n.writeTree,T(n.treePath,e))}function $l(n,e,t,i,s,r){return ql(n.writeTree,n.treePath,e,t,i,s,r)}function Bn(n,e,t){return Vl(n.writeTree,n.treePath,e,t)}function $s(n,e){return Ks(T(n.treePath,e),n.writeTree)}function Ks(n,e){return{treePath:n,writeTree:e}}/**
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
 */class Kl{constructor(){this.changeMap=new Map}trackChildChange(e){const t=e.type,i=e.childName;f(t==="child_added"||t==="child_changed"||t==="child_removed","Only child changes supported for tracking"),f(i!==".priority","Only non-priority child changes can be tracked.");const s=this.changeMap.get(i);if(s){const r=s.type;if(t==="child_added"&&r==="child_removed")this.changeMap.set(i,Qe(i,e.snapshotNode,s.snapshotNode));else if(t==="child_removed"&&r==="child_added")this.changeMap.delete(i);else if(t==="child_removed"&&r==="child_changed")this.changeMap.set(i,Ye(i,s.oldSnap));else if(t==="child_changed"&&r==="child_added")this.changeMap.set(i,Se(i,e.snapshotNode));else if(t==="child_changed"&&r==="child_changed")this.changeMap.set(i,Qe(i,e.snapshotNode,s.oldSnap));else throw Re("Illegal combination of changes: "+e+" occurred after "+s)}else this.changeMap.set(i,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
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
 */class Yl{getCompleteChild(e){return null}getChildAfterChild(e,t,i){return null}}const Ys=new Yl;class Gn{constructor(e,t,i=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=i}getCompleteChild(e){const t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{const i=this.optCompleteServerCache_!=null?new ie(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return Bn(this.writes_,e,i)}}getChildAfterChild(e,t,i){const s=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:de(this.viewCache_),r=$l(this.writes_,s,t,1,i,e);return r.length===0?null:r[0]}}/**
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
 */function Ql(n){return{filter:n}}function Jl(n,e){f(e.eventCache.getNode().isIndexed(n.filter.getIndex()),"Event snap not indexed"),f(e.serverCache.getNode().isIndexed(n.filter.getIndex()),"Server snap not indexed")}function Xl(n,e,t,i,s){const r=new Kl;let o,a;if(t.type===H.OVERWRITE){const c=t;c.source.fromUser?o=yn(n,e,c.path,c.snap,i,s,r):(f(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered()&&!y(c.path),o=It(n,e,c.path,c.snap,i,s,a,r))}else if(t.type===H.MERGE){const c=t;c.source.fromUser?o=ec(n,e,c.path,c.children,i,s,r):(f(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered(),o=vn(n,e,c.path,c.children,i,s,a,r))}else if(t.type===H.ACK_USER_WRITE){const c=t;c.revert?o=ic(n,e,c.path,i,s,r):o=tc(n,e,c.path,c.affectedTree,i,s,r)}else if(t.type===H.LISTEN_COMPLETE)o=nc(n,e,t.path,i,r);else throw Re("Unknown operation type: "+t.type);const l=r.getChanges();return Zl(e,o,l),{viewCache:o,changes:l}}function Zl(n,e,t){const i=e.eventCache;if(i.isFullyInitialized()){const s=i.getNode().isLeafNode()||i.getNode().isEmpty(),r=bt(n);(t.length>0||!n.eventCache.isFullyInitialized()||s&&!i.getNode().equals(r)||!i.getNode().getPriority().equals(r.getPriority()))&&t.push(Gs(bt(e)))}}function Qs(n,e,t,i,s,r){const o=e.eventCache;if(wt(i,t)!=null)return e;{let a,l;if(y(t))if(f(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const c=de(e),h=c instanceof m?c:m.EMPTY_NODE,u=Hn(i,h);a=n.filter.updateFullNode(e.eventCache.getNode(),u,r)}else{const c=St(i,de(e));a=n.filter.updateFullNode(e.eventCache.getNode(),c,r)}else{const c=g(t);if(c===".priority"){f(ne(t)===1,"Can't have a priority with additional path components");const h=o.getNode();l=e.serverCache.getNode();const u=Mi(i,t,h,l);u!=null?a=n.filter.updatePriority(h,u):a=o.getNode()}else{const h=S(t);let u;if(o.isCompleteForChild(c)){l=e.serverCache.getNode();const d=Mi(i,t,o.getNode(),l);d!=null?u=o.getNode().getImmediateChild(c).updateChild(h,d):u=o.getNode().getImmediateChild(c)}else u=Bn(i,c,e.serverCache);u!=null?a=n.filter.updateChild(o.getNode(),c,u,h,s,r):a=o.getNode()}}return Be(e,a,o.isFullyInitialized()||y(t),n.filter.filtersNodes())}}function It(n,e,t,i,s,r,o,a){const l=e.serverCache;let c;const h=o?n.filter:n.filter.getIndexedFilter();if(y(t))c=h.updateFullNode(l.getNode(),i,null);else if(h.filtersNodes()&&!l.isFiltered()){const p=l.getNode().updateChild(t,i);c=h.updateFullNode(l.getNode(),p,null)}else{const p=g(t);if(!l.isCompleteForPath(t)&&ne(t)>1)return e;const _=S(t),x=l.getNode().getImmediateChild(p).updateChild(_,i);p===".priority"?c=h.updatePriority(l.getNode(),x):c=h.updateChild(l.getNode(),p,x,_,Ys,null)}const u=Vs(e,c,l.isFullyInitialized()||y(t),h.filtersNodes()),d=new Gn(s,u,r);return Qs(n,u,t,s,d,a)}function yn(n,e,t,i,s,r,o){const a=e.eventCache;let l,c;const h=new Gn(s,e,r);if(y(t))c=n.filter.updateFullNode(e.eventCache.getNode(),i,o),l=Be(e,c,!0,n.filter.filtersNodes());else{const u=g(t);if(u===".priority")c=n.filter.updatePriority(e.eventCache.getNode(),i),l=Be(e,c,a.isFullyInitialized(),a.isFiltered());else{const d=S(t),p=a.getNode().getImmediateChild(u);let _;if(y(d))_=i;else{const b=h.getCompleteChild(u);b!=null?Dn(d)===".priority"&&b.getChild(Ls(d)).isEmpty()?_=b:_=b.updateChild(d,i):_=m.EMPTY_NODE}if(p.equals(_))l=e;else{const b=n.filter.updateChild(a.getNode(),u,_,d,h,o);l=Be(e,b,a.isFullyInitialized(),n.filter.filtersNodes())}}}return l}function Ui(n,e){return n.eventCache.isCompleteForChild(e)}function ec(n,e,t,i,s,r,o){let a=e;return i.foreach((l,c)=>{const h=T(t,l);Ui(e,g(h))&&(a=yn(n,a,h,c,s,r,o))}),i.foreach((l,c)=>{const h=T(t,l);Ui(e,g(h))||(a=yn(n,a,h,c,s,r,o))}),a}function Wi(n,e,t){return t.foreach((i,s)=>{e=e.updateChild(i,s)}),e}function vn(n,e,t,i,s,r,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let l=e,c;y(t)?c=i:c=new w(null).setTree(t,i);const h=e.serverCache.getNode();return c.children.inorderTraversal((u,d)=>{if(h.hasChild(u)){const p=e.serverCache.getNode().getImmediateChild(u),_=Wi(n,p,d);l=It(n,l,new E(u),_,s,r,o,a)}}),c.children.inorderTraversal((u,d)=>{const p=!e.serverCache.isCompleteForChild(u)&&d.value===null;if(!h.hasChild(u)&&!p){const _=e.serverCache.getNode().getImmediateChild(u),b=Wi(n,_,d);l=It(n,l,new E(u),b,s,r,o,a)}}),l}function tc(n,e,t,i,s,r,o){if(wt(s,t)!=null)return e;const a=e.serverCache.isFiltered(),l=e.serverCache;if(i.value!=null){if(y(t)&&l.isFullyInitialized()||l.isCompleteForPath(t))return It(n,e,t,l.getNode().getChild(t),s,r,a,o);if(y(t)){let c=new w(null);return l.getNode().forEachChild(ve,(h,u)=>{c=c.set(new E(h),u)}),vn(n,e,t,c,s,r,a,o)}else return e}else{let c=new w(null);return i.foreach((h,u)=>{const d=T(t,h);l.isCompleteForPath(d)&&(c=c.set(h,l.getNode().getChild(d)))}),vn(n,e,t,c,s,r,a,o)}}function nc(n,e,t,i,s){const r=e.serverCache,o=Vs(e,r.getNode(),r.isFullyInitialized()||y(t),r.isFiltered());return Qs(n,o,t,i,Ys,s)}function ic(n,e,t,i,s,r){let o;if(wt(i,t)!=null)return e;{const a=new Gn(i,e,s),l=e.eventCache.getNode();let c;if(y(t)||g(t)===".priority"){let h;if(e.serverCache.isFullyInitialized())h=St(i,de(e));else{const u=e.serverCache.getNode();f(u instanceof m,"serverChildren would be complete if leaf node"),h=Hn(i,u)}h=h,c=n.filter.updateFullNode(l,h,r)}else{const h=g(t);let u=Bn(i,h,e.serverCache);u==null&&e.serverCache.isCompleteForChild(h)&&(u=l.getImmediateChild(h)),u!=null?c=n.filter.updateChild(l,h,u,S(t),a,r):e.eventCache.getNode().hasChild(h)?c=n.filter.updateChild(l,h,m.EMPTY_NODE,S(t),a,r):c=l,c.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=St(i,de(e)),o.isLeafNode()&&(c=n.filter.updateFullNode(c,o,r)))}return o=e.serverCache.isFullyInitialized()||wt(i,C())!=null,Be(e,c,o,n.filter.filtersNodes())}}/**
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
 */class sc{constructor(e,t){this.query_=e,this.eventRegistrations_=[];const i=this.query_._queryParams,s=new Ln(i.getIndex()),r=bl(i);this.processor_=Ql(r);const o=t.serverCache,a=t.eventCache,l=s.updateFullNode(m.EMPTY_NODE,o.getNode(),null),c=r.updateFullNode(m.EMPTY_NODE,a.getNode(),null),h=new ie(l,o.isFullyInitialized(),s.filtersNodes()),u=new ie(c,a.isFullyInitialized(),r.filtersNodes());this.viewCache_=Ot(u,h),this.eventGenerator_=new kl(this.query_)}get query(){return this.query_}}function rc(n){return n.viewCache_.serverCache.getNode()}function oc(n){return bt(n.viewCache_)}function ac(n,e){const t=de(n.viewCache_);return t&&(n.query._queryParams.loadsAllData()||!y(e)&&!t.getImmediateChild(g(e)).isEmpty())?t.getChild(e):null}function Hi(n){return n.eventRegistrations_.length===0}function lc(n,e){n.eventRegistrations_.push(e)}function Bi(n,e,t){const i=[];if(t){f(e==null,"A cancel should cancel all event registrations.");const s=n.query._path;n.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(t,s);o&&i.push(o)})}if(e){let s=[];for(let r=0;r<n.eventRegistrations_.length;++r){const o=n.eventRegistrations_[r];if(!o.matches(e))s.push(o);else if(e.hasAnyCallback()){s=s.concat(n.eventRegistrations_.slice(r+1));break}}n.eventRegistrations_=s}else n.eventRegistrations_=[];return i}function Gi(n,e,t,i){e.type===H.MERGE&&e.source.queryId!==null&&(f(de(n.viewCache_),"We should always have a full cache before handling merges"),f(bt(n.viewCache_),"Missing event cache, even though we have a server cache"));const s=n.viewCache_,r=Xl(n.processor_,s,e,t,i);return Jl(n.processor_,r.viewCache),f(r.viewCache.serverCache.isFullyInitialized()||!s.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),n.viewCache_=r.viewCache,Js(n,r.changes,r.viewCache.eventCache.getNode(),null)}function cc(n,e){const t=n.viewCache_.eventCache,i=[];return t.getNode().isLeafNode()||t.getNode().forEachChild(R,(r,o)=>{i.push(Se(r,o))}),t.isFullyInitialized()&&i.push(Gs(t.getNode())),Js(n,i,t.getNode(),e)}function Js(n,e,t,i){const s=i?[i]:n.eventRegistrations_;return Al(n.eventGenerator_,e,t,s)}/**
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
 */let Tt;class Xs{constructor(){this.views=new Map}}function uc(n){f(!Tt,"__referenceConstructor has already been defined"),Tt=n}function hc(){return f(Tt,"Reference.ts has not been loaded"),Tt}function dc(n){return n.views.size===0}function Vn(n,e,t,i){const s=e.source.queryId;if(s!==null){const r=n.views.get(s);return f(r!=null,"SyncTree gave us an op for an invalid query."),Gi(r,e,t,i)}else{let r=[];for(const o of n.views.values())r=r.concat(Gi(o,e,t,i));return r}}function Zs(n,e,t,i,s){const r=e._queryIdentifier,o=n.views.get(r);if(!o){let a=St(t,s?i:null),l=!1;a?l=!0:i instanceof m?(a=Hn(t,i),l=!1):(a=m.EMPTY_NODE,l=!1);const c=Ot(new ie(a,l,!1),new ie(i,s,!1));return new sc(e,c)}return o}function fc(n,e,t,i,s,r){const o=Zs(n,e,i,s,r);return n.views.has(e._queryIdentifier)||n.views.set(e._queryIdentifier,o),lc(o,t),cc(o,t)}function pc(n,e,t,i){const s=e._queryIdentifier,r=[];let o=[];const a=se(n);if(s==="default")for(const[l,c]of n.views.entries())o=o.concat(Bi(c,t,i)),Hi(c)&&(n.views.delete(l),c.query._queryParams.loadsAllData()||r.push(c.query));else{const l=n.views.get(s);l&&(o=o.concat(Bi(l,t,i)),Hi(l)&&(n.views.delete(s),l.query._queryParams.loadsAllData()||r.push(l.query)))}return a&&!se(n)&&r.push(new(hc())(e._repo,e._path)),{removed:r,events:o}}function er(n){const e=[];for(const t of n.views.values())t.query._queryParams.loadsAllData()||e.push(t);return e}function te(n,e){let t=null;for(const i of n.views.values())t=t||ac(i,e);return t}function tr(n,e){if(e._queryParams.loadsAllData())return xt(n);{const i=e._queryIdentifier;return n.views.get(i)}}function nr(n,e){return tr(n,e)!=null}function se(n){return xt(n)!=null}function xt(n){for(const e of n.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
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
 */let Rt;function _c(n){f(!Rt,"__referenceConstructor has already been defined"),Rt=n}function mc(){return f(Rt,"Reference.ts has not been loaded"),Rt}let gc=1;class Vi{constructor(e){this.listenProvider_=e,this.syncPointTree_=new w(null),this.pendingWriteTree_=zl(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function ir(n,e,t,i,s){return xl(n.pendingWriteTree_,e,t,i,s),s?Ae(n,new he(Mn(),e,t)):[]}function yc(n,e,t,i){Ll(n.pendingWriteTree_,e,t,i);const s=w.fromObject(t);return Ae(n,new we(Mn(),e,s))}function J(n,e,t=!1){const i=Fl(n.pendingWriteTree_,e);if(Ml(n.pendingWriteTree_,e)){let r=new w(null);return i.snap!=null?r=r.set(C(),!0):P(i.children,o=>{r=r.set(new E(o),!0)}),Ae(n,new Et(i.path,r,t))}else return[]}function rt(n,e,t){return Ae(n,new he(Un(),e,t))}function vc(n,e,t){const i=w.fromObject(t);return Ae(n,new we(Un(),e,i))}function Cc(n,e){return Ae(n,new Xe(Un(),e))}function Ec(n,e,t){const i=qn(n,t);if(i){const s=zn(i),r=s.path,o=s.queryId,a=L(r,e),l=new Xe(Wn(o),a);return $n(n,r,l)}else return[]}function Nt(n,e,t,i,s=!1){const r=e._path,o=n.syncPointTree_.get(r);let a=[];if(o&&(e._queryIdentifier==="default"||nr(o,e))){const l=pc(o,e,t,i);dc(o)&&(n.syncPointTree_=n.syncPointTree_.remove(r));const c=l.removed;if(a=l.events,!s){const h=c.findIndex(d=>d._queryParams.loadsAllData())!==-1,u=n.syncPointTree_.findOnPath(r,(d,p)=>se(p));if(h&&!u){const d=n.syncPointTree_.subtree(r);if(!d.isEmpty()){const p=wc(d);for(let _=0;_<p.length;++_){const b=p[_],x=b.query,_e=ar(n,b);n.listenProvider_.startListening(Ve(x),Ze(n,x),_e.hashFn,_e.onComplete)}}}!u&&c.length>0&&!i&&(h?n.listenProvider_.stopListening(Ve(e),null):c.forEach(d=>{const p=n.queryToTagMap.get(Lt(d));n.listenProvider_.stopListening(Ve(d),p)}))}Ic(n,c)}return a}function sr(n,e,t,i){const s=qn(n,i);if(s!=null){const r=zn(s),o=r.path,a=r.queryId,l=L(o,e),c=new he(Wn(a),l,t);return $n(n,o,c)}else return[]}function bc(n,e,t,i){const s=qn(n,i);if(s){const r=zn(s),o=r.path,a=r.queryId,l=L(o,e),c=w.fromObject(t),h=new we(Wn(a),l,c);return $n(n,o,h)}else return[]}function Cn(n,e,t,i=!1){const s=e._path;let r=null,o=!1;n.syncPointTree_.foreachOnPath(s,(d,p)=>{const _=L(d,s);r=r||te(p,_),o=o||se(p)});let a=n.syncPointTree_.get(s);a?(o=o||se(a),r=r||te(a,C())):(a=new Xs,n.syncPointTree_=n.syncPointTree_.set(s,a));let l;r!=null?l=!0:(l=!1,r=m.EMPTY_NODE,n.syncPointTree_.subtree(s).foreachChild((p,_)=>{const b=te(_,C());b&&(r=r.updateImmediateChild(p,b))}));const c=nr(a,e);if(!c&&!e._queryParams.loadsAllData()){const d=Lt(e);f(!n.queryToTagMap.has(d),"View does not exist, but we have a tag");const p=Tc();n.queryToTagMap.set(d,p),n.tagToQueryMap.set(p,d)}const h=Pt(n.pendingWriteTree_,s);let u=fc(a,e,t,h,r,l);if(!c&&!o&&!i){const d=tr(a,e);u=u.concat(Rc(n,e,d))}return u}function jn(n,e,t){const s=n.pendingWriteTree_,r=n.syncPointTree_.findOnPath(e,(o,a)=>{const l=L(o,e),c=te(a,l);if(c)return c});return zs(s,e,r,t,!0)}function Sc(n,e){const t=e._path;let i=null;n.syncPointTree_.foreachOnPath(t,(c,h)=>{const u=L(c,t);i=i||te(h,u)});let s=n.syncPointTree_.get(t);s?i=i||te(s,C()):(s=new Xs,n.syncPointTree_=n.syncPointTree_.set(t,s));const r=i!=null,o=r?new ie(i,!0,!1):null,a=Pt(n.pendingWriteTree_,e._path),l=Zs(s,e,a,r?o.getNode():m.EMPTY_NODE,r);return oc(l)}function Ae(n,e){return rr(e,n.syncPointTree_,null,Pt(n.pendingWriteTree_,C()))}function rr(n,e,t,i){if(y(n.path))return or(n,e,t,i);{const s=e.get(C());t==null&&s!=null&&(t=te(s,C()));let r=[];const o=g(n.path),a=n.operationForChild(o),l=e.children.get(o);if(l&&a){const c=t?t.getImmediateChild(o):null,h=$s(i,o);r=r.concat(rr(a,l,c,h))}return s&&(r=r.concat(Vn(s,n,i,t))),r}}function or(n,e,t,i){const s=e.get(C());t==null&&s!=null&&(t=te(s,C()));let r=[];return e.children.inorderTraversal((o,a)=>{const l=t?t.getImmediateChild(o):null,c=$s(i,o),h=n.operationForChild(o);h&&(r=r.concat(or(h,a,l,c)))}),s&&(r=r.concat(Vn(s,n,i,t))),r}function ar(n,e){const t=e.query,i=Ze(n,t);return{hashFn:()=>(rc(e)||m.EMPTY_NODE).hash(),onComplete:s=>{if(s==="ok")return i?Ec(n,t._path,i):Cc(n,t._path);{const r=Ca(s,t);return Nt(n,t,null,r)}}}}function Ze(n,e){const t=Lt(e);return n.queryToTagMap.get(t)}function Lt(n){return n._path.toString()+"$"+n._queryIdentifier}function qn(n,e){return n.tagToQueryMap.get(e)}function zn(n){const e=n.indexOf("$");return f(e!==-1&&e<n.length-1,"Bad queryKey."),{queryId:n.substr(e+1),path:new E(n.substr(0,e))}}function $n(n,e,t){const i=n.syncPointTree_.get(e);f(i,"Missing sync point for query tag that we're tracking");const s=Pt(n.pendingWriteTree_,e);return Vn(i,t,s,null)}function wc(n){return n.fold((e,t,i)=>{if(t&&se(t))return[xt(t)];{let s=[];return t&&(s=er(t)),P(i,(r,o)=>{s=s.concat(o)}),s}})}function Ve(n){return n._queryParams.loadsAllData()&&!n._queryParams.isDefault()?new(mc())(n._repo,n._path):n}function Ic(n,e){for(let t=0;t<e.length;++t){const i=e[t];if(!i._queryParams.loadsAllData()){const s=Lt(i),r=n.queryToTagMap.get(s);n.queryToTagMap.delete(s),n.tagToQueryMap.delete(r)}}}function Tc(){return gc++}function Rc(n,e,t){const i=e._path,s=Ze(n,e),r=ar(n,t),o=n.listenProvider_.startListening(Ve(e),s,r.hashFn,r.onComplete),a=n.syncPointTree_.subtree(i);if(s)f(!se(a.value),"If we're adding a query, it shouldn't be shadowed");else{const l=a.fold((c,h,u)=>{if(!y(c)&&h&&se(h))return[xt(h).query];{let d=[];return h&&(d=d.concat(er(h).map(p=>p.query))),P(u,(p,_)=>{d=d.concat(_)}),d}});for(let c=0;c<l.length;++c){const h=l[c];n.listenProvider_.stopListening(Ve(h),Ze(n,h))}}return o}/**
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
 */class Kn{constructor(e){this.node_=e}getImmediateChild(e){const t=this.node_.getImmediateChild(e);return new Kn(t)}node(){return this.node_}}class Yn{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){const t=T(this.path_,e);return new Yn(this.syncTree_,t)}node(){return jn(this.syncTree_,this.path_)}}const Nc=function(n){return n=n||{},n.timestamp=n.timestamp||new Date().getTime(),n},ji=function(n,e,t){if(!n||typeof n!="object")return n;if(f(".sv"in n,"Unexpected leaf node or priority contents"),typeof n[".sv"]=="string")return kc(n[".sv"],e,t);if(typeof n[".sv"]=="object")return Ac(n[".sv"],e);f(!1,"Unexpected server value: "+JSON.stringify(n,null,2))},kc=function(n,e,t){switch(n){case"timestamp":return t.timestamp;default:f(!1,"Unexpected server value: "+n)}},Ac=function(n,e,t){n.hasOwnProperty("increment")||f(!1,"Unexpected server value: "+JSON.stringify(n,null,2));const i=n.increment;typeof i!="number"&&f(!1,"Unexpected increment value: "+i);const s=e.node();if(f(s!==null&&typeof s<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!s.isLeafNode())return i;const o=s.getValue();return typeof o!="number"?i:o+i},lr=function(n,e,t,i){return Qn(e,new Yn(t,n),i)},cr=function(n,e,t){return Qn(n,new Kn(e),t)};function Qn(n,e,t){const i=n.getPriority().val(),s=ji(i,e.getImmediateChild(".priority"),t);let r;if(n.isLeafNode()){const o=n,a=ji(o.getValue(),e,t);return a!==o.getValue()||s!==o.getPriority().val()?new A(a,N(s)):n}else{const o=n;return r=o,s!==o.getPriority().val()&&(r=r.updatePriority(new A(s))),o.forEachChild(R,(a,l)=>{const c=Qn(l,e.getImmediateChild(a),t);c!==l&&(r=r.updateImmediateChild(a,c))}),r}}/**
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
 */class Jn{constructor(e="",t=null,i={children:{},childCount:0}){this.name=e,this.parent=t,this.node=i}}function Xn(n,e){let t=e instanceof E?e:new E(e),i=n,s=g(t);for(;s!==null;){const r=Ce(i.node.children,s)||{children:{},childCount:0};i=new Jn(s,i,r),t=S(t),s=g(t)}return i}function De(n){return n.node.value}function ur(n,e){n.node.value=e,En(n)}function hr(n){return n.node.childCount>0}function Dc(n){return De(n)===void 0&&!hr(n)}function Ft(n,e){P(n.node.children,(t,i)=>{e(new Jn(t,n,i))})}function dr(n,e,t,i){t&&!i&&e(n),Ft(n,s=>{dr(s,e,!0,i)})}function Oc(n,e,t){let i=n.parent;for(;i!==null;){if(e(i))return!0;i=i.parent}return!1}function ot(n){return new E(n.parent===null?n.name:ot(n.parent)+"/"+n.name)}function En(n){n.parent!==null&&Pc(n.parent,n.name,n)}function Pc(n,e,t){const i=Dc(t),s=j(n.node.children,e);i&&s?(delete n.node.children[e],n.node.childCount--,En(n)):!i&&!s&&(n.node.children[e]=t.node,n.node.childCount++,En(n))}/**
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
 */const xc=/[\[\].#$\/\u0000-\u001F\u007F]/,Lc=/[\[\].#$\u0000-\u001F\u007F]/,Xt=10*1024*1024,Zn=function(n){return typeof n=="string"&&n.length!==0&&!xc.test(n)},fr=function(n){return typeof n=="string"&&n.length!==0&&!Lc.test(n)},Fc=function(n){return n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),fr(n)},pr=function(n){return n===null||typeof n=="string"||typeof n=="number"&&!At(n)||n&&typeof n=="object"&&j(n,".sv")},bn=function(n,e,t,i){Mt(Ee(n,"value"),e,t)},Mt=function(n,e,t){const i=t instanceof E?new el(t,n):t;if(e===void 0)throw new Error(n+"contains undefined "+ae(i));if(typeof e=="function")throw new Error(n+"contains a function "+ae(i)+" with contents = "+e.toString());if(At(e))throw new Error(n+"contains "+e.toString()+" "+ae(i));if(typeof e=="string"&&e.length>Xt/3&&kt(e)>Xt)throw new Error(n+"contains a string greater than "+Xt+" utf8 bytes "+ae(i)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let s=!1,r=!1;if(P(e,(o,a)=>{if(o===".value")s=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!Zn(o)))throw new Error(n+" contains an invalid key ("+o+") "+ae(i)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);tl(i,o),Mt(n,a,i),nl(i)}),s&&r)throw new Error(n+' contains ".value" child '+ae(i)+" in addition to actual children.")}},Mc=function(n,e){let t,i;for(t=0;t<e.length;t++){i=e[t];const r=Ke(i);for(let o=0;o<r.length;o++)if(!(r[o]===".priority"&&o===r.length-1)){if(!Zn(r[o]))throw new Error(n+"contains an invalid key ("+r[o]+") in path "+i.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(Za);let s=null;for(t=0;t<e.length;t++){if(i=e[t],s!==null&&U(s,i))throw new Error(n+"contains a path "+s.toString()+" that is ancestor of another path "+i.toString());s=i}},_r=function(n,e,t,i){const s=Ee(n,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(s+" must be an object containing the children to replace.");const r=[];P(e,(o,a)=>{const l=new E(o);if(Mt(s,a,T(t,l)),Dn(l)===".priority"&&!pr(a))throw new Error(s+"contains an invalid value for '"+l.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");r.push(l)}),Mc(s,r)},Uc=function(n,e,t){if(At(e))throw new Error(Ee(n,"priority")+"is "+e.toString()+", but must be a valid Firebase priority (a string, finite number, server value, or null).");if(!pr(e))throw new Error(Ee(n,"priority")+"must be a valid Firebase priority (a string, finite number, server value, or null).")},mr=function(n,e,t,i){if(!fr(t))throw new Error(Ee(n,e)+'was an invalid path = "'+t+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},Wc=function(n,e,t,i){t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),mr(n,e,t)},Ue=function(n,e){if(g(e)===".info")throw new Error(n+" failed = Can't modify data under /.info/")},Hc=function(n,e){const t=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!Zn(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||t.length!==0&&!Fc(t))throw new Error(Ee(n,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
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
 */class Bc{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function Ut(n,e){let t=null;for(let i=0;i<e.length;i++){const s=e[i],r=s.getPath();t!==null&&!On(r,t.path)&&(n.eventLists_.push(t),t=null),t===null&&(t={events:[],path:r}),t.events.push(s)}t&&n.eventLists_.push(t)}function gr(n,e,t){Ut(n,t),yr(n,i=>On(i,e))}function W(n,e,t){Ut(n,t),yr(n,i=>U(i,e)||U(e,i))}function yr(n,e){n.recursionDepth_++;let t=!0;for(let i=0;i<n.eventLists_.length;i++){const s=n.eventLists_[i];if(s){const r=s.path;e(r)?(Gc(n.eventLists_[i]),n.eventLists_[i]=null):t=!1}}t&&(n.eventLists_=[]),n.recursionDepth_--}function Gc(n){for(let e=0;e<n.events.length;e++){const t=n.events[e];if(t!==null){n.events[e]=null;const i=t.getEventRunner();We&&O("event: "+t.toString()),Ne(i)}}}/**
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
 */const vr="repo_interrupt",Vc=25;class jc{constructor(e,t,i,s){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=i,this.appCheckProvider_=s,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new Bc,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=Ct(),this.transactionQueueTree_=new Jn,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function qc(n,e,t){if(n.stats_=kn(n.repoInfo_),n.forceRestClient_||wa())n.server_=new vt(n.repoInfo_,(i,s,r,o)=>{qi(n,i,s,r,o)},n.authTokenProvider_,n.appCheckProvider_),setTimeout(()=>zi(n,!0),0);else{if(typeof t<"u"&&t!==null){if(typeof t!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{k(t)}catch(i){throw new Error("Invalid authOverride provided: "+i)}}n.persistentConnection_=new z(n.repoInfo_,e,(i,s,r,o)=>{qi(n,i,s,r,o)},i=>{zi(n,i)},i=>{$c(n,i)},n.authTokenProvider_,n.appCheckProvider_,t),n.server_=n.persistentConnection_}n.authTokenProvider_.addTokenChangeListener(i=>{n.server_.refreshAuthToken(i)}),n.appCheckProvider_.addTokenChangeListener(i=>{n.server_.refreshAppCheckToken(i.token)}),n.statsReporter_=ka(n.repoInfo_,()=>new Nl(n.stats_,n.server_)),n.infoData_=new Sl,n.infoSyncTree_=new Vi({startListening:(i,s,r,o)=>{let a=[];const l=n.infoData_.getNode(i._path);return l.isEmpty()||(a=rt(n.infoSyncTree_,i._path,l),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),ei(n,"connected",!1),n.serverSyncTree_=new Vi({startListening:(i,s,r,o)=>(n.server_.listen(i,r,s,(a,l)=>{const c=o(a,l);W(n.eventQueue_,i._path,c)}),[]),stopListening:(i,s)=>{n.server_.unlisten(i,s)}})}function zc(n){const t=n.infoData_.getNode(new E(".info/serverTimeOffset")).val()||0;return new Date().getTime()+t}function Wt(n){return Nc({timestamp:zc(n)})}function qi(n,e,t,i,s){n.dataUpdateCount++;const r=new E(e);t=n.interceptServerDataCallback_?n.interceptServerDataCallback_(e,t):t;let o=[];if(s)if(i){const l=ft(t,c=>N(c));o=bc(n.serverSyncTree_,r,l,s)}else{const l=N(t);o=sr(n.serverSyncTree_,r,l,s)}else if(i){const l=ft(t,c=>N(c));o=vc(n.serverSyncTree_,r,l)}else{const l=N(t);o=rt(n.serverSyncTree_,r,l)}let a=r;o.length>0&&(a=Te(n,r)),W(n.eventQueue_,a,o)}function zi(n,e){ei(n,"connected",e),e===!1&&Jc(n)}function $c(n,e){P(e,(t,i)=>{ei(n,t,i)})}function ei(n,e,t){const i=new E("/.info/"+e),s=N(t);n.infoData_.updateSnapshot(i,s);const r=rt(n.infoSyncTree_,i,s);W(n.eventQueue_,i,r)}function ti(n){return n.nextWriteId_++}function Kc(n,e,t){const i=Sc(n.serverSyncTree_,e);return i!=null?Promise.resolve(i):n.server_.get(e).then(s=>{const r=N(s).withIndex(e._queryParams.getIndex());Cn(n.serverSyncTree_,e,t,!0);let o;if(e._queryParams.loadsAllData())o=rt(n.serverSyncTree_,e._path,r);else{const a=Ze(n.serverSyncTree_,e);o=sr(n.serverSyncTree_,e._path,r,a)}return W(n.eventQueue_,e._path,o),Nt(n.serverSyncTree_,e,t,null,!0),r},s=>(at(n,"get for query "+k(e)+" failed: "+s),Promise.reject(new Error(s))))}function Yc(n,e,t,i,s){at(n,"set",{path:e.toString(),value:t,priority:i});const r=Wt(n),o=N(t,i),a=jn(n.serverSyncTree_,e),l=cr(o,a,r),c=ti(n),h=ir(n.serverSyncTree_,e,l,c,!0);Ut(n.eventQueue_,h),n.server_.put(e.toString(),o.val(!0),(d,p)=>{const _=d==="ok";_||F("set at "+e+" failed: "+d);const b=J(n.serverSyncTree_,c,!_);W(n.eventQueue_,e,b),re(n,s,d,p)});const u=ii(n,e);Te(n,u),W(n.eventQueue_,u,[])}function Qc(n,e,t,i){at(n,"update",{path:e.toString(),value:t});let s=!0;const r=Wt(n),o={};if(P(t,(a,l)=>{s=!1,o[a]=lr(T(e,a),N(l),n.serverSyncTree_,r)}),s)O("update() called with empty data.  Don't do anything."),re(n,i,"ok",void 0);else{const a=ti(n),l=yc(n.serverSyncTree_,e,o,a);Ut(n.eventQueue_,l),n.server_.merge(e.toString(),t,(c,h)=>{const u=c==="ok";u||F("update at "+e+" failed: "+c);const d=J(n.serverSyncTree_,a,!u),p=d.length>0?Te(n,e):e;W(n.eventQueue_,p,d),re(n,i,c,h)}),P(t,c=>{const h=ii(n,T(e,c));Te(n,h)}),W(n.eventQueue_,e,[])}}function Jc(n){at(n,"onDisconnectEvents");const e=Wt(n),t=Ct();pn(n.onDisconnect_,C(),(s,r)=>{const o=lr(s,r,n.serverSyncTree_,e);ke(t,s,o)});let i=[];pn(t,C(),(s,r)=>{i=i.concat(rt(n.serverSyncTree_,s,r));const o=ii(n,s);Te(n,o)}),n.onDisconnect_=Ct(),W(n.eventQueue_,C(),i)}function Xc(n,e,t){n.server_.onDisconnectCancel(e.toString(),(i,s)=>{i==="ok"&&fn(n.onDisconnect_,e),re(n,t,i,s)})}function $i(n,e,t,i){const s=N(t);n.server_.onDisconnectPut(e.toString(),s.val(!0),(r,o)=>{r==="ok"&&ke(n.onDisconnect_,e,s),re(n,i,r,o)})}function Zc(n,e,t,i,s){const r=N(t,i);n.server_.onDisconnectPut(e.toString(),r.val(!0),(o,a)=>{o==="ok"&&ke(n.onDisconnect_,e,r),re(n,s,o,a)})}function eu(n,e,t,i){if(nn(t)){O("onDisconnect().update() called with empty data.  Don't do anything."),re(n,i,"ok",void 0);return}n.server_.onDisconnectMerge(e.toString(),t,(s,r)=>{s==="ok"&&P(t,(o,a)=>{const l=N(a);ke(n.onDisconnect_,T(e,o),l)}),re(n,i,s,r)})}function tu(n,e,t){let i;g(e._path)===".info"?i=Cn(n.infoSyncTree_,e,t):i=Cn(n.serverSyncTree_,e,t),gr(n.eventQueue_,e._path,i)}function nu(n,e,t){let i;g(e._path)===".info"?i=Nt(n.infoSyncTree_,e,t):i=Nt(n.serverSyncTree_,e,t),gr(n.eventQueue_,e._path,i)}function Cr(n){n.persistentConnection_&&n.persistentConnection_.interrupt(vr)}function iu(n){n.persistentConnection_&&n.persistentConnection_.resume(vr)}function at(n,...e){let t="";n.persistentConnection_&&(t=n.persistentConnection_.id+":"),O(t,...e)}function re(n,e,t,i){e&&Ne(()=>{if(t==="ok")e(null);else{const s=(t||"error").toUpperCase();let r=s;i&&(r+=": "+i);const o=new Error(r);o.code=s,e(o)}})}function Er(n,e,t){return jn(n.serverSyncTree_,e,t)||m.EMPTY_NODE}function ni(n,e=n.transactionQueueTree_){if(e||Ht(n,e),De(e)){const t=Sr(n,e);f(t.length>0,"Sending zero length transaction queue"),t.every(s=>s.status===0)&&su(n,ot(e),t)}else hr(e)&&Ft(e,t=>{ni(n,t)})}function su(n,e,t){const i=t.map(c=>c.currentWriteId),s=Er(n,e,i);let r=s;const o=s.hash();for(let c=0;c<t.length;c++){const h=t[c];f(h.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),h.status=1,h.retryCount++;const u=L(e,h.path);r=r.updateChild(u,h.currentOutputSnapshotRaw)}const a=r.val(!0),l=e;n.server_.put(l.toString(),a,c=>{at(n,"transaction put response",{path:l.toString(),status:c});let h=[];if(c==="ok"){const u=[];for(let d=0;d<t.length;d++)t[d].status=2,h=h.concat(J(n.serverSyncTree_,t[d].currentWriteId)),t[d].onComplete&&u.push(()=>t[d].onComplete(null,!0,t[d].currentOutputSnapshotResolved)),t[d].unwatcher();Ht(n,Xn(n.transactionQueueTree_,e)),ni(n,n.transactionQueueTree_),W(n.eventQueue_,e,h);for(let d=0;d<u.length;d++)Ne(u[d])}else{if(c==="datastale")for(let u=0;u<t.length;u++)t[u].status===3?t[u].status=4:t[u].status=0;else{F("transaction at "+l.toString()+" failed: "+c);for(let u=0;u<t.length;u++)t[u].status=4,t[u].abortReason=c}Te(n,e)}},o)}function Te(n,e){const t=br(n,e),i=ot(t),s=Sr(n,t);return ru(n,s,i),i}function ru(n,e,t){if(e.length===0)return;const i=[];let s=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const l=e[a],c=L(t,l.path);let h=!1,u;if(f(c!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),l.status===4)h=!0,u=l.abortReason,s=s.concat(J(n.serverSyncTree_,l.currentWriteId,!0));else if(l.status===0)if(l.retryCount>=Vc)h=!0,u="maxretry",s=s.concat(J(n.serverSyncTree_,l.currentWriteId,!0));else{const d=Er(n,l.path,o);l.currentInputSnapshot=d;const p=e[a].update(d.val());if(p!==void 0){Mt("transaction failed: Data returned ",p,l.path);let _=N(p);typeof p=="object"&&p!=null&&j(p,".priority")||(_=_.updatePriority(d.getPriority()));const x=l.currentWriteId,_e=Wt(n),lt=cr(_,d,_e);l.currentOutputSnapshotRaw=_,l.currentOutputSnapshotResolved=lt,l.currentWriteId=ti(n),o.splice(o.indexOf(x),1),s=s.concat(ir(n.serverSyncTree_,l.path,lt,l.currentWriteId,l.applyLocally)),s=s.concat(J(n.serverSyncTree_,x,!0))}else h=!0,u="nodata",s=s.concat(J(n.serverSyncTree_,l.currentWriteId,!0))}W(n.eventQueue_,t,s),s=[],h&&(e[a].status=2,function(d){setTimeout(d,Math.floor(0))}(e[a].unwatcher),e[a].onComplete&&(u==="nodata"?i.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):i.push(()=>e[a].onComplete(new Error(u),!1,null))))}Ht(n,n.transactionQueueTree_);for(let a=0;a<i.length;a++)Ne(i[a]);ni(n,n.transactionQueueTree_)}function br(n,e){let t,i=n.transactionQueueTree_;for(t=g(e);t!==null&&De(i)===void 0;)i=Xn(i,t),e=S(e),t=g(e);return i}function Sr(n,e){const t=[];return wr(n,e,t),t.sort((i,s)=>i.order-s.order),t}function wr(n,e,t){const i=De(e);if(i)for(let s=0;s<i.length;s++)t.push(i[s]);Ft(e,s=>{wr(n,s,t)})}function Ht(n,e){const t=De(e);if(t){let i=0;for(let s=0;s<t.length;s++)t[s].status!==2&&(t[i]=t[s],i++);t.length=i,ur(e,t.length>0?t:void 0)}Ft(e,i=>{Ht(n,i)})}function ii(n,e){const t=ot(br(n,e)),i=Xn(n.transactionQueueTree_,e);return Oc(i,s=>{Zt(n,s)}),Zt(n,i),dr(i,s=>{Zt(n,s)}),t}function Zt(n,e){const t=De(e);if(t){const i=[];let s=[],r=-1;for(let o=0;o<t.length;o++)t[o].status===3||(t[o].status===1?(f(r===o-1,"All SENT items should be at beginning of queue."),r=o,t[o].status=3,t[o].abortReason="set"):(f(t[o].status===0,"Unexpected transaction status in abort"),t[o].unwatcher(),s=s.concat(J(n.serverSyncTree_,t[o].currentWriteId,!0)),t[o].onComplete&&i.push(t[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?ur(e,void 0):t.length=r+1,W(n.eventQueue_,ot(e),s);for(let o=0;o<i.length;o++)Ne(i[o])}}/**
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
 */function ou(n){let e="";const t=n.split("/");for(let i=0;i<t.length;i++)if(t[i].length>0){let s=t[i];try{s=decodeURIComponent(s.replace(/\+/g," "))}catch{}e+="/"+s}return e}function au(n){const e={};n.charAt(0)==="?"&&(n=n.substring(1));for(const t of n.split("&")){if(t.length===0)continue;const i=t.split("=");i.length===2?e[decodeURIComponent(i[0])]=decodeURIComponent(i[1]):F(`Invalid query segment '${t}' in query '${n}'`)}return e}const Ki=function(n,e){const t=lu(n),i=t.namespace;t.domain==="firebase.com"&&K(t.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!i||i==="undefined")&&t.domain!=="localhost"&&K("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),t.secure||_a();const s=t.scheme==="ws"||t.scheme==="wss";return{repoInfo:new Ts(t.host,t.secure,i,s,e,"",i!==t.subdomain),path:new E(t.pathString)}},lu=function(n){let e="",t="",i="",s="",r="",o=!0,a="https",l=443;if(typeof n=="string"){let c=n.indexOf("//");c>=0&&(a=n.substring(0,c-1),n=n.substring(c+2));let h=n.indexOf("/");h===-1&&(h=n.length);let u=n.indexOf("?");u===-1&&(u=n.length),e=n.substring(0,Math.min(h,u)),h<u&&(s=ou(n.substring(h,u)));const d=au(n.substring(Math.min(n.length,u)));c=e.indexOf(":"),c>=0?(o=a==="https"||a==="wss",l=parseInt(e.substring(c+1),10)):c=e.length;const p=e.slice(0,c);if(p.toLowerCase()==="localhost")t="localhost";else if(p.split(".").length<=2)t=p;else{const _=e.indexOf(".");i=e.substring(0,_).toLowerCase(),t=e.substring(_+1),r=i}"ns"in d&&(r=d.ns)}return{host:e,port:l,domain:t,subdomain:i,secure:o,scheme:a,pathString:s,namespace:r}};/**
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
 */class cu{constructor(e,t,i,s){this.eventType=e,this.eventRegistration=t,this.snapshot=i,this.prevName=s}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+k(this.snapshot.exportVal())}}class uu{constructor(e,t,i){this.eventRegistration=e,this.error=t,this.path=i}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
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
 */class Ir{constructor(e,t){this.snapshotCallback=e,this.cancelCallback=t}onValue(e,t){this.snapshotCallback.call(null,e,t)}onCancel(e){return f(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
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
 */class hu{constructor(e,t){this._repo=e,this._path=t}cancel(){const e=new G;return Xc(this._repo,this._path,e.wrapCallback(()=>{})),e.promise}remove(){Ue("OnDisconnect.remove",this._path);const e=new G;return $i(this._repo,this._path,null,e.wrapCallback(()=>{})),e.promise}set(e){Ue("OnDisconnect.set",this._path),bn("OnDisconnect.set",e,this._path);const t=new G;return $i(this._repo,this._path,e,t.wrapCallback(()=>{})),t.promise}setWithPriority(e,t){Ue("OnDisconnect.setWithPriority",this._path),bn("OnDisconnect.setWithPriority",e,this._path),Uc("OnDisconnect.setWithPriority",t);const i=new G;return Zc(this._repo,this._path,e,t,i.wrapCallback(()=>{})),i.promise}update(e){Ue("OnDisconnect.update",this._path),_r("OnDisconnect.update",e,this._path);const t=new G;return eu(this._repo,this._path,e,t.wrapCallback(()=>{})),t.promise}}/**
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
 */class si{constructor(e,t,i,s){this._repo=e,this._path=t,this._queryParams=i,this._orderByCalled=s}get key(){return y(this._path)?null:Dn(this._path)}get ref(){return new Q(this._repo,this._path)}get _queryIdentifier(){const e=Pi(this._queryParams),t=Rn(e);return t==="{}"?"default":t}get _queryObject(){return Pi(this._queryParams)}isEqual(e){if(e=Y(e),!(e instanceof si))return!1;const t=this._repo===e._repo,i=On(this._path,e._path),s=this._queryIdentifier===e._queryIdentifier;return t&&i&&s}toJSON(){return this.toString()}toString(){return this._repo.toString()+Xa(this._path)}}class Q extends si{constructor(e,t){super(e,t,new Fn,!1)}get parent(){const e=Ls(this._path);return e===null?null:new Q(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class et{constructor(e,t,i){this._node=e,this.ref=t,this._index=i}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const t=new E(e),i=Sn(this.ref,e);return new et(this._node.getChild(t),i,R)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(i,s)=>e(new et(s,Sn(this.ref,i),R)))}hasChild(e){const t=new E(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function en(n,e){return n=Y(n),n._checkNotDeleted("ref"),e!==void 0?Sn(n._root,e):n._root}function Sn(n,e){return n=Y(n),g(n._path)===null?Wc("child","path",e):mr("child","path",e),new Q(n._repo,T(n._path,e))}function du(n){return n=Y(n),new hu(n._repo,n._path)}function Yi(n,e){n=Y(n),Ue("set",n._path),bn("set",e,n._path);const t=new G;return Yc(n._repo,n._path,e,null,t.wrapCallback(()=>{})),t.promise}function Uu(n,e){_r("update",e,n._path);const t=new G;return Qc(n._repo,n._path,e,t.wrapCallback(()=>{})),t.promise}function Wu(n){n=Y(n);const e=new Ir(()=>{}),t=new Bt(e);return Kc(n._repo,n,t).then(i=>new et(i,new Q(n._repo,n._path),n._queryParams.getIndex()))}class Bt{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,t){const i=t._queryParams.getIndex();return new cu("value",this,new et(e.snapshotNode,new Q(t._repo,t._path),i))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new uu(this,e,t):null}matches(e){return e instanceof Bt?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}function fu(n,e,t,i,s){const r=new Ir(t,void 0),o=new Bt(r);return tu(n._repo,n,o),()=>nu(n._repo,n,o)}function pu(n,e,t,i){return fu(n,"value",e)}uc(Q);_c(Q);/**
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
 */const _u="FIREBASE_DATABASE_EMULATOR_HOST",wn={};let mu=!1;function gu(n,e,t,i){n.repoInfo_=new Ts(`${e}:${t}`,!1,n.repoInfo_.namespace,n.repoInfo_.webSocketOnly,n.repoInfo_.nodeAdmin,n.repoInfo_.persistenceKey,n.repoInfo_.includeNamespaceInQueryParams,!0),i&&(n.authTokenProvider_=i)}function yu(n,e,t,i,s){let r=i||n.options.databaseURL;r===void 0&&(n.options.projectId||K("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),O("Using default host for project ",n.options.projectId),r=`${n.options.projectId}-default-rtdb.firebaseio.com`);let o=Ki(r,s),a=o.repoInfo,l;typeof process<"u"&&_i&&(l=_i[_u]),l?(r=`http://${l}?ns=${a.namespace}`,o=Ki(r,s),a=o.repoInfo):o.repoInfo.secure;const c=new Ta(n.name,n.options,e);Hc("Invalid Firebase Database URL",o),y(o.path)||K("Database URL must point to the root of a Firebase Database (not including a child path).");const h=Cu(a,n,c,new Ia(n.name,t));return new Eu(h,n)}function vu(n,e){const t=wn[e];(!t||t[n.key]!==n)&&K(`Database ${e}(${n.repoInfo_}) has already been deleted.`),Cr(n),delete t[n.key]}function Cu(n,e,t,i){let s=wn[e.name];s||(s={},wn[e.name]=s);let r=s[n.toURLString()];return r&&K("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new jc(n,mu,t,i),s[n.toURLString()]=r,r}class Eu{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(qc(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new Q(this._repo,C())),this._rootInternal}_delete(){return this._rootInternal!==null&&(vu(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&K("Cannot call "+e+" on a deleted database.")}}function bu(n=Jo(),e){const t=$o(n,"database").getImmediate({identifier:e});if(!t._instanceStarted){const i=Fr("database");i&&Su(t,...i)}return t}function Su(n,e,t,i={}){n=Y(n),n._checkNotDeleted("useEmulator"),n._instanceStarted&&K("Cannot call useEmulator() after instance has already been initialized.");const s=n._repoInternal;let r;if(s.repoInfo_.nodeAdmin)i.mockUserToken&&K('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),r=new ht(ht.OWNER);else if(i.mockUserToken){const o=typeof i.mockUserToken=="string"?i.mockUserToken:Mr(i.mockUserToken,n.app.options.projectId);r=new ht(o)}gu(s,e,t,r)}function wu(n){n=Y(n),n._checkNotDeleted("goOffline"),Cr(n._repo)}function Iu(n){n=Y(n),n._checkNotDeleted("goOnline"),iu(n._repo)}/**
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
 */function Tu(n){ca(Qo),_t(new qe("database",(e,{instanceIdentifier:t})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return yu(i,s,r,t)},"PUBLIC").setMultipleInstances(!0)),ge(mi,gi,n),ge(mi,gi,"esm2017")}/**
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
 */const Ru={".sv":"timestamp"};function Nu(){return Ru}z.prototype.simpleListen=function(n,e){this.sendRequest("q",{p:n},e)};z.prototype.echo=function(n,e){this.sendRequest("echo",{d:n},e)};Tu();const ku={apiKey:"AIzaSyA6En-96gJQAgVVdfWrJBkG9ck3ggg-D2I",authDomain:"hydra-library-2.firebaseapp.com",databaseURL:"https://hydra-library-2-default-rtdb.firebaseio.com",projectId:"hydra-library-2",storageBucket:"hydra-library-2.firebasestorage.app",messagingSenderId:"64984778774",appId:"1:64984778774:web:7406df8e41c9ddc1798d37"},Au=cs(ku),Me=bu(Au),Du=5*60*1e3,Ou=3*60*1e3;class Pu{constructor(){this.isConnected=!1,this.connectionRef=en(Me,".info/connected"),this.presenceRef=null,this.clientId=this.generateClientId(),this.heartbeatTimer=null,this.disconnectTimer=null}generateClientId(){return"client_"+Math.random().toString(36).substring(2,15)+Math.random().toString(36).substring(2,15)+"_"+Date.now()}async initialize(){if(!this.isConnected)try{return this.presenceRef=en(Me,`presence/${this.clientId}`),pu(this.connectionRef,e=>{e.val()===!0?(this.isConnected=!0,du(this.presenceRef).remove(),this.updatePresence(),this.setupHeartbeat(),this.setupDisconnectTimeout()):(this.isConnected=!1,this.clearTimers())}),!0}catch(e){return console.error("Failed to initialize Firebase connection:",e),!1}}updatePresence(){if(this.presenceRef)try{Yi(this.presenceRef,{online:!0,lastActive:Nu()})}catch(e){console.error("Failed to update presence:",e)}}setupHeartbeat(){this.clearTimers(),this.heartbeatTimer=setInterval(()=>{document.visibilityState==="visible"&&this.updatePresence()},Ou)}setupDisconnectTimeout(){this.clearDisconnectTimer(),this.disconnectTimer=setTimeout(()=>{document.visibilityState!=="visible"&&this.disconnect()},Du)}disconnect(){if(this.isConnected)try{this.presenceRef&&Yi(this.presenceRef,null),wu(Me),this.isConnected=!1,this.clearTimers()}catch(e){console.error("Failed to disconnect:",e)}}reconnect(){if(!this.isConnected)try{Iu(Me),this.clientId=this.generateClientId(),this.presenceRef=en(Me,`presence/${this.clientId}`),this.updatePresence(),this.setupHeartbeat(),this.setupDisconnectTimeout(),this.isConnected=!0}catch(e){console.error("Failed to reconnect:",e)}}clearTimers(){this.clearHeartbeatTimer(),this.clearDisconnectTimer()}clearHeartbeatTimer(){this.heartbeatTimer&&(clearInterval(this.heartbeatTimer),this.heartbeatTimer=null)}clearDisconnectTimer(){this.disconnectTimer&&(clearTimeout(this.disconnectTimer),this.disconnectTimer=null)}resetDisconnectTimeout(){this.isConnected&&(this.setupDisconnectTimeout(),this.updatePresence())}}const le=new Pu;document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"?le.isConnected?(le.resetDisconnectTimeout(),le.updatePresence()):le.reconnect():document.visibilityState==="hidden"&&le.setupDisconnectTimeout()});["click","mousemove","keypress","scroll","touchstart"].forEach(n=>{document.addEventListener(n,()=>{le.resetDisconnectTimeout()},{passive:!0})});window.addEventListener("beforeunload",()=>{le.disconnect()});const xu={header:{title:"Hydra Library",search:"Search",searchMobile:"Search",about:"About",suggest:"Suggest Source",donate:"Donate"},filters:{title:"Filters & Sort",status:{title:"Source Status",trusted:"Trusted",safeForUse:"Safe For Use",useAtOwnRisk:"Use At Your Own Risk",worksInRussia:"Works In Russia"},sort:{title:"Sort Sources",hot:"Hot (24h)",mostCopies:"Most Copies",mostInstalls:"Most Installs",newest:"Newest",topRated:"Top Rated",nameAsc:"By Name (A-Z)",nameDesc:"By Name (Z-A)",new:"New",alphabetical:"By name (A-Z)"},gamesCount:{title:"Games Count",range1:"0-999",range2:"1000-4999",range3:"5000-9999",range4:"10000+"},activeFilters:"{count} active",reset:"Reset All",apply:"Apply Filters"},sourceCard:{install:"Install",installing:"Installing...",installed:"Installed",copy:"Copy",copied:"Copied!",games:"games"},cookies:{message:"We use cookies to track source usage and improve your experience.",accept:"Accept All",reject:"Reject All"},status:{trusted:"Trusted",safeForUse:"Safe For Use",useAtOwnRisk:"Use At Your Own Risk",worksInRussia:"Works In Russia"},common:{install:"Install",copy:"Copy",games:"games",added:"Added",date:{today:"today",yesterday:"yesterday",daysAgo:"{days} days ago",on:"on"}},modal:{warning:{title:"Warning",message:'This source is marked as "Use At Your Own Risk". It may contain untested or potentially harmful content. Are you sure you want to proceed?',confirm:"Proceed",cancel:"Cancel"}},about:{title:"About Hydra Library",subtitle:"Game Source Management System",description:"A comprehensive platform designed to streamline access to game repositories, ensuring safety and efficiency for the gaming community.",features:{secure:"Secure Sources",fast:"Fast Access",community:"Community Driven"},stats:{sources:"Total Sources",games:"Total Games",actions:"Total Installs & Copies"},statusTypes:{title:"Source Status Types",trusted:{title:"Trusted",description:"Verified sources that have been thoroughly checked for safety and reliability."},safeForUse:{title:"Safe For Use",description:"Community-verified sources that are generally considered safe but should be used with normal precautions."},useAtOwnRisk:{title:"Use At Your Own Risk",description:"Unverified sources that haven't been thoroughly checked. Exercise caution when using these sources."},new:{title:"New",description:"Recently added sources that are still being evaluated by the community."},worksInRussia:{title:"Works In Russia",description:"Sources that work in Russia, allowing users to bypass infinite source validating in Hydra."}},features:{keyFeatures:{secure:"Secure Sources",fast:"Fast Access",community:"Community Driven"},title:"Features",gameManagement:{title:"Game Management",description:"Efficiently organize and manage your game collection with advanced filtering, sorting, and search capabilities."},sourceVerification:{title:"Source Verification",description:"Community-driven verification system ensuring safe and reliable game sources with multiple security levels."},communityIntegration:{title:"Community Integration",description:"Active community participation in source verification, ratings, and reviews to maintain high-quality standards."}},stats:{sources:"Total Sources",games:"Total Games",actions:"Total Installs & Copies"},statusTypes:{title:"Source Status Types",trusted:{title:"Trusted",description:"Verified sources that have been thoroughly checked for safety and reliability."},safeForUse:{title:"Safe For Use",description:"Community-verified sources that are generally considered safe but should be used with normal precautions."},useAtOwnRisk:{title:"Use At Your Own Risk",description:"Unverified sources that haven't been thoroughly checked. Exercise caution when using these sources."},new:{title:"New",description:"Recently added sources that are still being evaluated by the community."},worksInRussia:{title:"Works In Russia",description:"Sources that work in Russia, allowing users to bypass Cloudflare restrictions in their country."}},developer:{title:"About the Developer",name:"Moyase",role:"Developer & Designer",about:{title:"About",description:"Developer and designer of Hydra Library, focused on creating safe and efficient tools for the gaming community. Passionate about building user-friendly interfaces and maintaining high security standards."},projects:{title:"Projects",hydraLibrary:{title:"Hydra Library",description:"You are currently here"},isItOnHydra:{title:"Is It On Hydra",description:"Check if a game is available on Hydra Launcher",action:"Visit"}}},navigation:{home:"Home"}},sources:{"RuTracker | All Categories":{title:"RuTracker | All Categories",description:"The source created by Kakitu for Hydra Launcher."},FitGirl:{title:"FitGirl",description:"Home archivist to web's top game repacker: the ultimate source for trustworthy games."},"SteamRip [DIRECT DOWNLOAD / NO TORRENT]":{title:"SteamRip [DIRECT DOWNLOAD / NO TORRENT]",description:"Pre-installed games with original content, uncompressed, and sourced reliably."},"David Kazumi":{title:"David Kazumi",description:"David Kazumi's source, for Hydra Launcher. Well known across the Hydra Launcher community server."},CrackStatus:{title:"CrackStatus",description:"Latest updates on game cracks and releases."},AtopGames:{title:"AtopGames",description:"Unaltered pre-installed games sourced from multiple trustworthy names in the community."},DODI:{title:"DODI",description:"Renowned brand in pirated video games, this repacker is among the finest in the field."},"HydraSources(RUSSIAN)":{title:"HydraSources(RUSSIAN)",description:"Source that was created by the russian guy called HydraSources, updating almost daily. If you are a russian user, this is the source you should use."},Empress:{title:"Empress",description:"For games cracked by EMPRESS."},"Wkeynhk Source":{title:"Wkeynhk Source",description:"Source created by wkeyhnk for Hydra Launcher which parses the rutor.info site."},CPGRepacks:{title:"CPGRepacks",description:"A collection of 200+ NSFW games. Contains adult content and is intended for users 18 and older."},"RuTracker | Linux only":{title:"RuTracker | Linux",description:"Automatically updated source from Wkeynhk containing games for Linux from the RuTracker site."},"LinuxRulez!":{title:"LinuxRulez!",description:"Repacks for Linux users; GNU/Linux Games; Linux P2P Games."},Nexus:{title:"Nexus",description:"Source with various games from different categories."},"Erotorrent.ru by sodalite":{title:"Erotorrent.ru by sodalite",description:"Russian torrent tracker that contains many NSFW torrent games."},"HydraSources.su | FreeTp.Org":{title:"HydraSources.su | FreeTp.Org",description:"Collection of games with online fixes from the FreeTP website."},TapochekNet:{title:"TapochekNet",description:"Source containing many games from the TapochekNet website, especially R.G. Mechanics repacks."},TheLastGame:{title:"TheLastGame",description:"Collection of games from the Russian site thelastgame.ru."}},index:{hero:{badge:"Discover Game Sources",title:{part1:"The Ultimate",part2:"Game Library",part3:"for Hydra"},description:"Access the most comprehensive collection of verified game sources. Browse through trusted repositories and stay up to date with the latest additions.",cta:{primary:"Browse Library",secondary:"Telegram(RU)"}},stats:{trustedSources:"Trusted Sources",totalGames:"Total Games",totalCopies:"Total Copies"},features:{community:{title:"Community Driven",description:"Users can suggest new sources to be added to the library."},fast:{title:"Fast Access",description:"Quick and easy access to large amount of sources and links for Hydra Launcher."},secure:{title:"Secure Sources",description:"All sources are verified and monitored for safety and reliability."}}},donate:{hero:{badge:"Support the Project",title:"Support Hydra Library",description:"Your support helps maintain and improve Hydra Library. Every donation contributes to keeping the project running and developing new features."},crypto:{title:"Cryptocurrency",btc:"Bitcoin (BTC) Network: SegWit",usdt:"USDT (TRC20)"},other:{title:"Other Ways to Support",share:{title:"Share the Project",description:"Help spread the word about Hydra Library by sharing it with your friends and community."},contribute:{title:"Contribute",description:"You can also contribute to the project by reporting bugs, suggesting features, or contributing code on GitHub.",github:"Visit GitHub Repository"}}},suggest:{title:"Suggest a Source",description:"Want to add a new source to Hydra Library? You can suggest it by creating an issue on our GitHub repository.",requirements:{title:"Important Requirements:",jsonOnly:"Only .json file links are accepted (e.g., repack-games.com/source.json)",noWebsites:"Website links are not accepted (e.g., repack-games.com)"},steps:{title:"How to Suggest a Source:",visit:"Visit our GitHub repository issue page",newIssue:'Click on "New Issue"',template:'Select "Source Suggestion" template',fillInfo:"Fill in the required information:",sourceUrl:"Source URL (.json file)",sourceName:"Source Name",description:"Description",gamesCount:"Approximate number of games",submit:"Submit the issue"},createIssue:"Create Source Suggestion"},badges:{nsfw:"NSFW"},ageVerification:{title:"Age Verification Required",message:"This source contains adult content (NSFW). You must be 18 or older to access this content.",confirm:"I am 18 or older",cancel:"Cancel",warning:"By continuing, you confirm that you are of legal age to view adult content."}},Lu={header:{title:"Hydra Library",search:"Поиск",searchMobile:"Поиск",about:"О проекте",suggest:"Предложить источник",donate:"Поддержать"},filters:{title:"Сортировка источников",status:{title:"Статус источника",trusted:"Проверенный",safeForUse:"Безопасный",useAtOwnRisk:"Не проверенный",worksInRussia:"Работает в России"},sort:{title:"Сортировка",hot:"Горячие (24ч)",mostCopies:"По копиям",mostInstalls:"По установкам",newest:"Новые",topRated:"По рейтингу",nameAsc:"По имени (А-Я)",nameDesc:"По имени (Я-А)",new:"Новые",alphabetical:"По имени (А-Я)"},gamesCount:{title:"Игр в источнике",range1:"0-999",range2:"1000-4999",range3:"5000-9999",range4:"10000+"},activeFilters:"{count} активно",reset:"Сбросить все",apply:"Применить фильтры"},sourceCard:{install:"Установить",installing:"Установка...",installed:"Установлено",copy:"Копировать",copied:"Скопировано!",games:"игр",warning:{title:"Внимание",message:"Этот источник не проверен и может быть небезопасным. Продолжайте с осторожностью.",proceed:"Продолжить",cancel:"Отмена"}},cookies:{message:"Мы используем файлы cookie для отслеживания использования источников и улучшения вашего опыта.",accept:"Принять все",reject:"Отклонить все"},status:{trusted:"Проверенный",safeForUse:"Безопасный",useAtOwnRisk:"Не проверенный",worksInRussia:"Работает в России",nsfw:"NSFW"},common:{install:"Установить",copy:"Копировать",games:"игр",added:"Добавлено",date:{today:"сегодня",yesterday:"вчера",daysAgo:"{days} дней назад",on:" "}},modal:{warning:{title:"Внимание",message:'Этот источник помечен как "Не проверенный". Он может содержать непроверенный или потенциально опасный контент. Вы уверены, что хотите продолжить?',confirm:"Продолжить",cancel:"Отмена"}},about:{title:"О Hydra Library",subtitle:"Система управления игровыми источниками",description:"Комплексная платформа, разработанная для упрощения доступа к игровым репозиториям, обеспечивающая безопасность и эффективность для игрового сообщества.",features:{keyFeatures:{secure:"Безопасные источники",fast:"Быстрый доступ",community:"Управляется сообществом"},title:"Возможности",gameManagement:{title:"Управление играми",description:"Эффективная организация и управление вашей коллекцией игр с продвинутой фильтрацией, сортировкой и поиском."},sourceVerification:{title:"Проверка источников",description:"Система проверки на основе сообщества, обеспечивающая безопасные и надёжные источники игр с несколькими уровнями безопасности."},communityIntegration:{title:"Интеграция с сообществом",description:"Активное участие сообщества в проверке источников, оценках и отзывах для поддержания высоких стандартов качества."}},stats:{sources:"Всего источников",games:"Всего игр",actions:"Всего установок и копирований"},statusTypes:{title:"Типы статусов источников",trusted:{title:"Проверенный",description:"Подтверждённые источники, которые были тщательно проверены на безопасность и надёжность."},safeForUse:{title:"Безопасный",description:"Проверенные сообществом источники, которые считаются безопасными, но требуют обычных мер предосторожности."},useAtOwnRisk:{title:"Использовать на свой риск",description:"Непроверенные источники, которые не прошли тщательную проверку. Соблюдайте осторожность при их использовании."},new:{title:"Новый",description:"Недавно добавленные источники, которые всё ещё оцениваются сообществом."},worksInRussia:{title:"Работает в России",description:"Источники, работающие в России, позволяющие пользователям обойти бесконечную проверку источников в Hydra."}},developer:{title:"О разработчике",name:"Moyase",role:"Разработчик и дизайнер",about:{title:"О разработчике",description:"Разработчик и дизайнер Hydra Library, сосредоточенный на создании безопасных и эффективных инструментов для игрового сообщества. Увлечён созданием удобных интерфейсов и поддержанием высоких стандартов безопасности."},projects:{title:"Проекты",hydraLibrary:{title:"Hydra Library",description:"Вы сейчас здесь"},isItOnHydra:{title:"Is It On Hydra",description:"Проверьте, доступна ли игра в Hydra Launcher",action:"Посетить"}}},navigation:{home:"Главная"}},sources:{"RuTracker | All Categories":{title:"RuTracker | Все категории",description:"Источник, созданный Kakitu для Hydra Launcher, содержащий все категории контента."},FitGirl:{title:"FitGirl",description:"Лучший в мире репакер игр: надёжный источник проверенных и максимально сжатых репаков."},"SteamRip [DIRECT DOWNLOAD / NO TORRENT]":{title:"SteamRip [ПРЯМОЕ СКАЧИВАНИЕ / БЕЗ ТОРРЕНТА]",description:"Готовые к установке игры с оригинальным контентом, без сжатия, загруженные напрямую из Steam."},"David Kazumi":{title:"David Kazumi",description:"Надёжный источник от David Kazumi, хорошо известного участника сообщества Hydra Launcher."},CrackStatus:{title:"CrackStatus",description:"Актуальная информация о статусе взломов и новых релизах игр. Регулярные обновления."},AtopGames:{title:"AtopGames",description:"Оригинальные предустановленные игры от проверенных участников сообщества, без модификаций."},DODI:{title:"DODI",description:"Один из самых известных и уважаемых репакеров в мире. Славится качеством и надёжностью своих релизов."},"HydraSources(RUSSIAN)":{title:"HydraSources(РУССКИЙ)",description:"Русскоязычный источник от HydraSources с ежедневными обновлениями. Рекомендуется для русскоговорящих пользователей."},Empress:{title:"Empress",description:"Коллекция игр, взломанных известной хакершей EMPRESS. Высококачественные и проверенные релизы."},"wkeyhnk Source":{title:"wkeyhnk Source",description:"Автоматически обновляемый источник от wkeyhnk, собирающий информацию с rutor.info. Большая база игр."},"SteamRip [SOFTWARE ONLY]":{title:"SteamRip [ТОЛЬКО ПРОГРАММЫ]",description:"Уменьшенная версия SteamRip, включающая только программное обеспечение, такое как Lossless Scaling, Wallpaper Engine и другие."},KaOsKrew:{title:"KaOsKrew",description:"Ветераны сцены, которые на протяжении двух десятилетий создают качественные рипы и репаки."},"Online-Fix":{title:"Online-Fix",description:"Предоставляет решения для многопользовательской игры в определённых играх."},"Tiny-Repacks":{title:"Tiny-Repacks",description:"Небольшие и компактные репаки игр."},ByXatab:{title:"ByXatab",description:"Уважаемый репакер в мире пиратских видеоигр, известный своими качественными релизами."},"AtopGames(RU)":{title:"AtopGames(РУС)",description:"Оригинальные предустановленные игры от проверенных участников сообщества, без модификаций. Русская версия."},"SteamRip(RU) [SOFTWARE ONLY]":{title:"SteamRip(РУС) [ТОЛЬКО ПРОГРАММЫ]",description:"Уменьшенная версия SteamRip, включающая только программное обеспечение. Русская версия."},"SteamRip(RU) [DIRECT DOWNLOAD / NO TORRENT]":{title:"SteamRip(РУС) [ПРЯМОЕ СКАЧИВАНИЕ / БЕЗ ТОРРЕНТА]",description:"Готовые к установке игры с оригинальным контентом, без сжатия. Русская версия."},"DODI(RU)":{title:"DODI(РУС)",description:"Один из самых известных и уважаемых репакеров в мире. Русская версия."},"Empress(RU)":{title:"Empress(РУС)",description:"Коллекция игр, взломанных EMPRESS. Русская версия."},"FitGirl(RU)":{title:"FitGirl(РУС)",description:"Лучший в мире репакер игр: надёжный источник проверенных и максимально сжатых репаков. Русская версия."},"KaOsKrew(RU)":{title:"KaOsKrew(РУС)",description:"Ветераны сцены, создающие качественные рипы и репаки. Русская версия."},"Online-Fix(RU)":{title:"Online-Fix(РУС)",description:"Предоставляет решения для многопользовательской игры. Русская версия."},"Tiny-Repacks(RU)":{title:"Tiny-Repacks(РУС)",description:"Небольшие и компактные репаки игр. Русская версия."},"ByXatab(RU)":{title:"ByXatab(РУС)",description:"Уважаемый репакер в мире пиратских видеоигр. Русская версия."},"Free GOG(RU)":{title:"Free GOG(РУС)",description:"Предоставляет игры без DRM-защиты, прошедшие тщательную проверку. Русская версия."},"Wkeynhk Source":{title:"Источник Wkeynhk",description:"Автоматически обновляемый источник содержащий в себе игры с сайтов: RuTracker и Rutor"},"Shisuy's Source":{title:"Источник Shisuy",description:"Источник получает игры с сайта Repack-Games.com. Обеспечивает быструю и надёжную загрузку."},CPGRepacks:{title:"CPGRepacks",description:"Коллекция из 200+ NSFW игр. Содержит контент для взрослых и предназначен для пользователей старше 18 лет."},"RuTracker | Linux only":{title:"RuTracker | Linux",description:"Автоматически обновляемый источник от Wkeynhk с играми для Linux с сайта RuTracker."},"LinuxRulez!":{title:"LinuxRulez!",description:"Репаки для Linux; Игры для GNU/Linux; Linux P2P Игры"},Nexus:{title:"Nexus",description:"Источник с различными играми из разных категорий"},"Erotorrent.ru by sodalite":{title:"Erotorrent.ru от sodalite",description:"Русский торрент-трекер, содержащий множество NSFW игр"},"HydraSources.su | FreeTp.Org":{title:"HydraSources.su | FreeTp.Org",description:"Коллекция всех игр (1700+) с онлайн-фиксами с сайта FreeTP для Hydra Launcher"},"TapochekNet | Windows, Linux, Mac games":{title:"TapochekNet | Windows, Linux, Mac games",description:"Источник, содержащий множество игр с сайта TapochekNet, особенно репаки от R.G. Mechanics."},TheLastGame:{title:"TheLastGame",description:"Коллекция игр с русского сайта thelastgame.ru."},"GGVV Source | Linux only":{title:"Источник GGVV | только Linux",description:"GOG игры только для Linux"},"HydraSources.su | nnmclub":{title:"HydraSources.su | nnmclub",description:"Игры с русского трекера - nnmclub"}},index:{hero:{badge:"Лучшие Игровые Источники",title:{part1:"Лучшая",part2:"Библиотека Игр",part3:"для Hydra"},description:"Получите доступ к самой полной коллекции проверенных игровых источников. Просматривайте надежные репозитории и будьте в курсе последних обновлений.",cta:{primary:"Открыть Библиотеку",secondary:" Наш Телеграм"}},stats:{trustedSources:"Источников",totalGames:"Всего Игр",totalCopies:"Всего Копий"},features:{community:{title:"Управляется сообществом",description:"Пользователи могут предлагать новые источники для добавления в библиотеку."},fast:{title:"Быстрый доступ",description:"Быстрый и простой доступ к большому количеству источников и ссылок для Hydra Launcher."},secure:{title:"Безопасные источники",description:"Все источники проверяются и контролируются на безопасность и надежность."}}},donate:{hero:{badge:"Поддержать проект",title:"Поддержать Hydra Library",description:"Ваша поддержка помогает поддерживать и улучшать Hydra Library. Каждое пожертвование способствует работе проекта и разработке новых функций."},crypto:{title:"Криптовалюта",btc:"Bitcoin (BTC) Сеть: SegWit",usdt:"USDT (TRC20)"},other:{title:"Другие способы поддержки",share:{title:"Поделиться проектом",description:"Помогите распространить информацию о Hydra Library, поделившись с друзьями и сообществом."},contribute:{title:"Внести свой вклад",description:"Вы также можете внести свой вклад в проект, сообщая об ошибках, предлагая функции или участвуя в разработке на GitHub.",github:"Посетить репозиторий GitHub"}}},suggest:{title:"Предложить источник",description:"Хотите добавить новый источник в Hydra Library? Вы можете предложить его, создав issue в нашем GitHub репозитории.",requirements:{title:"Важные требования:",jsonOnly:"Принимаются только ссылки на файлы .json (например, repack-games.com/source.json)",noWebsites:"Ссылки на веб-сайты не принимаются (например, repack-games.com)"},steps:{title:"Как предложить источник:",visit:"Перейдите на страницу issues нашего GitHub репозитория",newIssue:'Нажмите "New Issue"',template:'Выберите шаблон "Source Suggestion"',fillInfo:"Заполните необходимую информацию:",sourceUrl:"URL источника (файл .json)",sourceName:"Название источника",description:"Описание",gamesCount:"Примерное количество игр",submit:"Отправить issue"},createIssue:"Создать предложение источника"},badges:{nsfw:"NSFW"},ageVerification:{title:"Требуется подтверждение возраста",message:"Этот источник содержит контент для взрослых (NSFW). Вам должно быть 18 лет или больше для доступа к этому контенту.",confirm:"Мне 18 лет или больше",cancel:"Отмена",warning:"Продолжая, вы подтверждаете, что достигли возраста, позволяющего просматривать контент для взрослых."}},Fu={header:{title:"Hydra Library",search:"Pesquisar",searchMobile:"Pesquisar",about:"Sobre",suggest:"Sugerir Fonte",donate:"Apoio"},filters:{title:"Filtros e Ordenação",status:{title:"Status da Fonte",trusted:"Confiável",safeForUse:"Seguro para Uso",useAtOwnRisk:"Use por Sua Conta e Risco",worksInRussia:"Funciona na Rússia"},sort:{title:"Ordenar Fontes",hot:"Em Alta (24h)",mostCopies:"Mais Cópias",mostInstalls:"Mais Instalações",newest:"Mais Recentes",topRated:"Melhor Avaliado",nameAsc:"Por Nome (A-Z)",nameDesc:"Por Nome (Z-A)",new:"Novo",alphabetical:"Por nome (A-Z)"},gamesCount:{title:"Quantidade de Jogos",range1:"0-999",range2:"1000-4999",range3:"5000-9999",range4:"10000+"},activeFilters:"{count} ativos",reset:"Redefinir Tudo",apply:"Aplicar Filtros"},sourceCard:{install:"Instalar",installing:"Instalando...",installed:"Instalado",copy:"Copiar",copied:"Copiado!",games:"jogos",warning:{title:"Aviso",message:"Esta fonte não é verificada e pode ser insegura. Continue com cautela.",proceed:"Continuar",cancel:"Cancelar"}},cookies:{message:"Usamos cookies para rastrear o uso das fontes e melhorar sua experiência.",accept:"Aceitar Todos",reject:"Rejeitar Todos"},status:{trusted:"Confiável",safeForUse:"Seguro para Uso",useAtOwnRisk:"Não Verificado",worksInRussia:"Funciona na Rússia",nsfw:"NSFW"},common:{install:"Instalar",copy:"Copiar",games:"jogos",added:"Adicionado",date:{today:"hoje",yesterday:"ontem",daysAgo:"há {days} dias",on:"em"}},modal:{warning:{title:"Aviso",message:'Esta fonte está marcada como "Use por Sua Conta e Risco". Ela pode conter conteúdo não testado ou potencialmente prejudicial. Tem certeza que deseja continuar?',confirm:"Continuar",cancel:"Cancelar"}},about:{title:"Sobre a Hydra Library",subtitle:"Sistema de Gerenciamento de Fontes de Jogos",description:"Uma plataforma abrangente projetada para simplificar o acesso a repositórios de jogos, garantindo segurança e eficiência para a comunidade gamer.",features:{secure:"Fontes Seguras",fast:"Acesso Rápido",community:"Movido pela Comunidade"},stats:{sources:"Total de Fontes",games:"Total de Jogos",actions:"Total de Instalações e Cópias"},statusTypes:{title:"Tipos de Status das Fontes",trusted:{title:"Confiável",description:"Fontes verificadas que foram minuciosamente checadas quanto à segurança e confiabilidade."},safeForUse:{title:"Seguro para Uso",description:"Fontes verificadas pela comunidade que são geralmente consideradas seguras, mas devem ser usadas com precauções normais."},useAtOwnRisk:{title:"Use por Sua Conta e Risco",description:"Fontes não verificadas que não foram minuciosamente checadas. Tenha cautela ao usá-las."},new:{title:"Novo",description:"Fontes adicionadas recentemente que ainda estão sendo avaliadas pela comunidade."},worksInRussia:{title:"Funciona na Rússia",description:"Fontes que funcionam na Rússia, permitindo que os usuários contornem a validação infinita de fontes no Hydra."}},features:{keyFeatures:{secure:"Fontes Seguras",fast:"Acesso Rápido",community:"Movido pela Comunidade"},title:"Recursos",gameManagement:{title:"Gerenciamento de Jogos",description:"Organize e gerencie sua coleção de jogos de forma eficiente com filtragem avançada, ordenação e recursos de pesquisa."},sourceVerification:{title:"Verificação de Fontes",description:"Sistema de verificação baseado na comunidade, garantindo fontes de jogos seguras e confiáveis com múltiplos níveis de segurança."},communityIntegration:{title:"Integração com a Comunidade",description:"Participação ativa da comunidade na verificação de fontes, avaliações e análises para manter altos padrões de qualidade."}},developer:{title:"Sobre o Desenvolvedor",name:"Moyase",role:"Desenvolvedor e Designer",about:{title:"Sobre",description:"Desenvolvedor e designer da Hydra Library, focado em criar ferramentas seguras e eficientes para a comunidade gamer. Apaixonado por construir interfaces amigáveis e manter altos padrões de segurança."},projects:{title:"Projetos",hydraLibrary:{title:"Hydra Library",description:"Você está aqui"},isItOnHydra:{title:"Is It On Hydra",description:"Verifique se um jogo está disponível no Hydra Launcher",action:"Visitar"}}},navigation:{home:"Início"}},sources:{"RuTracker | All Categories":{title:"RuTracker | Todas as Categorias",description:"A fonte criada por Kakitu para o Hydra Launcher."},FitGirl:{title:"FitGirl",description:"Arquivista doméstica para a melhor repacker de jogos da web: a fonte definitiva para jogos confiáveis."},"SteamRip [DIRECT DOWNLOAD / NO TORRENT]":{title:"SteamRip [DOWNLOAD DIRETO / SEM TORRENT]",description:"Jogos pré-instalados com conteúdo original, sem compressão e de fonte confiável."},"David Kazumi":{title:"David Kazumi",description:"Fonte do David Kazumi para o Hydra Launcher. Bem conhecido em toda a comunidade do Hydra Launcher."},CrackStatus:{title:"CrackStatus",description:"Últimas atualizações sobre cracks e lançamentos de jogos."},AtopGames:{title:"AtopGames",description:"Jogos pré-instalados inalterados obtidos de várias fontes confiáveis da comunidade."},DODI:{title:"DODI",description:"Marca renomada em jogos piratas, este repacker está entre os melhores da área."},"HydraSources(RUSSIAN)":{title:"HydraSources(RUSSO)",description:"Fonte criada pelo russo chamado HydraSources, atualizando quase diariamente. Se você é um usuário russo, esta é a fonte que você deve usar."},Empress:{title:"Empress",description:"Para jogos crackeados pela EMPRESS."},"SteamRip [SOFTWARE ONLY]":{title:"SteamRip [APENAS SOFTWARE]",description:"Versão reduzida do SteamRip incluindo apenas software como Lossless Scaling, Wallpaper Engine e outros."},KaOsKrew:{title:"KaOsKrew",description:"Veteranos da cena que criam rips e repacks de qualidade há duas décadas."},"Online-Fix":{title:"Online-Fix",description:"Fornece soluções para jogos multiplayer."},"Tiny-Repacks":{title:"Tiny-Repacks",description:"Repacks pequenos e compactos de jogos."},ByXatab:{title:"ByXatab",description:"Repacker respeitado no mundo dos jogos piratas."},"AtopGames(RU)":{title:"AtopGames(RU)",description:"Jogos pré-instalados inalterados de fontes confiáveis da comunidade. Versão russa."},"SteamRip(RU) [SOFTWARE ONLY]":{title:"SteamRip(RU) [APENAS SOFTWARE]",description:"Versão reduzida do SteamRip incluindo apenas software. Versão russa."},"SteamRip(RU) [DIRECT DOWNLOAD / NO TORRENT]":{title:"SteamRip(RU) [DOWNLOAD DIRETO / SEM TORRENT]",description:"Jogos pré-instalados com conteúdo original, sem compressão. Versão russa."},"DODI(RU)":{title:"DODI(RU)",description:"Um dos repackers mais conhecidos e respeitados do mundo. Versão russa."},"Empress(RU)":{title:"Empress(RU)",description:"Para jogos crackeados pela EMPRESS. Versão russa."},"FitGirl(RU)":{title:"FitGirl(RU)",description:"A melhor repacker de jogos da web: fonte definitiva para jogos confiáveis. Versão russa."},"KaOsKrew(RU)":{title:"KaOsKrew(RU)",description:"Veteranos da cena que criam rips e repacks de qualidade. Versão russa."},"Online-Fix(RU)":{title:"Online-Fix(RU)",description:"Fornece soluções para jogos multiplayer. Versão russa."},"Tiny-Repacks(RU)":{title:"Tiny-Repacks(RU)",description:"Repacks pequenos e compactos de jogos. Versão russa."},"ByXatab(RU)":{title:"ByXatab(RU)",description:"Repacker respeitado no mundo dos jogos piratas. Versão russa."},"Free GOG(RU)":{title:"Free GOG(RU)",description:"Fornece jogos sem DRM que passaram por verificação completa. Versão russa."},"Wkeynhk Source":{title:"Fonte Wkeynhk",description:"Fonte atualizada automaticamente contendo jogos dos sites: RuTracker e Rutor."},"Shisuy's Source":{title:"Fonte do Shisuy",description:"Fonte que obtém jogos do site Repack-Games.com. Fornece download rápido e confiável."},CPGRepacks:{title:"CPGRepacks",description:"Uma coleção de mais de 200 jogos NSFW. Contém conteúdo adulto e é destinado a usuários maiores de 18 anos."},"RuTracker | Linux only":{title:"RuTracker | Linux",description:"O Wkeynhk fonte atualizada automaticamente contendo jogos do site RuTracker para Linux."},"LinuxRulez!":{title:"LinuxRulez!",description:"Repacks para Linux; Jogos para GNU/Linux; Jogos Linux P2P"},Nexus:{title:"Nexus",description:"Fonte com vários jogos de diferentes categorias"},"Erotorrent.ru by sodalite":{title:"Erotorrent.ru por sodalite",description:"Tracker de torrent russo contendo muitos jogos NSFW"},"HydraSources.su | FreeTp.Org":{title:"HydraSources.su | FreeTp.Org",description:"Fonte de todos os jogos com correções online do site FreeTP para Hydra Launcher"},"TapochekNet | Windows, Linux, Mac games":{title:"TapochekNet | Windows, Linux, Mac games",description:"Fonte contendo muitos jogos do site TapochekNet, especialmente repacks do R.G. Mechanics."},TheLastGame:{title:"TheLastGame",description:"Coleção de jogos do site russo thelastgame.ru."},"GGVV Source | Linux":{title:"GGVV Source | Linux",description:"jogos gog linux"},"HydraSources.su | nnmclub":{title:"HydraSources.su | nnmclub",description:"Jogos do tracker russo nnmclub"}},index:{hero:{badge:"Descubra Fontes de Jogos",title:{part1:"A Melhor",part2:"Biblioteca para",part3:"o Hydra"},description:"Acesse a mais completa coleção de fontes de jogos verificadas. Navegue por repositórios confiáveis e fique atualizado com as últimas adições.",cta:{primary:"Explorar Biblioteca",secondary:"Telegram(Russo)"}},stats:{trustedSources:"Fontes Confiáveis",totalGames:"Total de Jogos",totalCopies:"Total de Cópias"},features:{community:{title:"Movido pela Comunidade",description:"Usuários podem sugerir novas fontes para serem adicionadas à biblioteca."},fast:{title:"Acesso Rápido",description:"Acesso rápido e fácil a uma grande quantidade de fontes e links para o Hydra Launcher."},secure:{title:"Fontes Seguras",description:"Todas as fontes são verificadas e monitoradas quanto à segurança e confiabilidade."}}},donate:{hero:{badge:"Apoie o Projeto",title:"Apoie a Hydra Library",description:"Seu apoio ajuda a manter e melhorar a Hydra Library. Cada doação contribui para manter o projeto funcionando e desenvolver novos recursos."},crypto:{title:"Criptomoeda",btc:"Bitcoin (BTC) Rede: SegWit",usdt:"USDT (TRC20)"},other:{title:"Outras Formas de Apoio",share:{title:"Compartilhe o Projeto",description:"Ajude a divulgar a Hydra Library compartilhando com seus amigos e comunidade."},contribute:{title:"Contribua",description:"Você também pode contribuir com o projeto reportando bugs, sugerindo recursos ou contribuindo com código no GitHub.",github:"Visitar Repositório GitHub"}}},suggest:{title:"Sugerir Fonte",description:"Quer adicionar uma nova fonte à Hydra Library? Você pode sugerir criando uma issue em nosso repositório GitHub.",requirements:{title:"Requisitos Importantes:",jsonOnly:"Apenas links de arquivos .json são aceitos (ex: repack-games.com/source.json)",noWebsites:"Links de sites não são aceitos (ex: repack-games.com)"},steps:{title:"Como Sugerir uma Fonte:",visit:"Visite a página de issues do nosso repositório GitHub",newIssue:'Clique em "New Issue"',template:'Selecione o modelo "Source Suggestion"',fillInfo:"Preencha as informações necessárias:",sourceUrl:"URL da fonte (arquivo .json)",sourceName:"Nome da fonte",description:"Descrição",gamesCount:"Número aproximado de jogos",submit:"Enviar issue"},createIssue:"Criar Sugestão de Fonte"},badges:{nsfw:"NSFW"},ageVerification:{title:"Verificação de Idade Necessária",message:"Esta fonte contém conteúdo adulto (NSFW). Você deve ter 18 anos ou mais para acessar este conteúdo.",confirm:"Tenho 18 anos ou mais",cancel:"Cancelar",warning:"Ao continuar, você confirma que tem idade legal para visualizar conteúdo adulto."}};class Mu{constructor(){this.translations={en:xu,ru:Lu,"pt-br":Fu},this.currentLocale=localStorage.getItem("locale")||"en",console.log("I18n initialized with locale:",this.currentLocale)}t(e,t={}){const i=e.split(".");let s=this.translations[this.currentLocale];for(const r of i)s=s==null?void 0:s[r];return console.log("Translating key:",e,"Result:",s),s?s.replace(/\{(\w+)\}/g,(r,o)=>t[o]||""):e}setLocale(e){console.log("Setting locale to:",e),this.translations[e]&&(this.currentLocale=e,localStorage.setItem("locale",e),this.updatePageContent(),document.dispatchEvent(new Event("languageChanged")),console.log("Locale updated successfully"))}getCurrentLocale(){return this.currentLocale}updatePageContent(){console.log("Updating page content for locale:",this.currentLocale),document.querySelectorAll("[data-i18n]").forEach(e=>{const t=e.dataset.i18n,i=e.dataset.i18nParams?JSON.parse(e.dataset.i18nParams):{};e.textContent=this.t(t,i)}),document.querySelectorAll("[data-i18n-placeholder]").forEach(e=>{const t=e.dataset.i18nPlaceholder,i=e.dataset.i18nParams?JSON.parse(e.dataset.i18nParams):{};e.placeholder=this.t(t,i)}),console.log("Page content updated")}}const Hu=new Mu;export{le as c,Me as d,Wu as g,Hu as i,en as r,Uu as u};
