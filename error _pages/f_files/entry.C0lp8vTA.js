function iI(i,e){const t=Object.create(null),n=i.split(",");for(let r=0;r<n.length;r++)t[n[r]]=!0;return r=>!!t[r]}const rI=()=>{},sI=Object.prototype.hasOwnProperty,rm=(i,e)=>sI.call(i,e),Hs=Array.isArray,Up=i=>oT(i)==="[object Map]",sT=i=>typeof i=="function",oI=i=>typeof i=="string",vg=i=>typeof i=="symbol",kh=i=>i!==null&&typeof i=="object",aI=Object.prototype.toString,oT=i=>aI.call(i),lI=i=>oT(i).slice(8,-1),ux=i=>oI(i)&&i!=="NaN"&&i[0]!=="-"&&""+parseInt(i,10)===i,Bh=(i,e)=>!Object.is(i,e),cI=(i,e,t)=>{Object.defineProperty(i,e,{configurable:!0,enumerable:!1,value:t})};let Xi;class aT{constructor(e=!1){this.detached=e,this._active=!0,this.effects=[],this.cleanups=[],this.parent=Xi,!e&&Xi&&(this.index=(Xi.scopes||(Xi.scopes=[])).push(this)-1)}get active(){return this._active}run(e){if(this._active){const t=Xi;try{return Xi=this,e()}finally{Xi=t}}}on(){Xi=this}off(){Xi=this.parent}stop(e){if(this._active){let t,n;for(t=0,n=this.effects.length;t<n;t++)this.effects[t].stop();for(t=0,n=this.cleanups.length;t<n;t++)this.cleanups[t]();if(this.scopes)for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].stop(!0);if(!this.detached&&this.parent&&!e){const r=this.parent.scopes.pop();r&&r!==this&&(this.parent.scopes[this.index]=r,r.index=this.index)}this.parent=void 0,this._active=!1}}}function fx(i){return new aT(i)}function uI(i,e=Xi){e&&e.active&&e.effects.push(i)}function hx(){return Xi}function lT(i){Xi&&Xi.cleanups.push(i)}const dx=i=>{const e=new Set(i);return e.w=0,e.n=0,e},cT=i=>(i.w&Qo)>0,uT=i=>(i.n&Qo)>0,fI=({deps:i})=>{if(i.length)for(let e=0;e<i.length;e++)i[e].w|=Qo},hI=i=>{const{deps:e}=i;if(e.length){let t=0;for(let n=0;n<e.length;n++){const r=e[n];cT(r)&&!uT(r)?r.delete(i):e[t++]=r,r.w&=~Qo,r.n&=~Qo}e.length=t}},sm=new WeakMap;let zu=0,Qo=1;const vy=30;let Fr;const $a=Symbol(""),xy=Symbol("");class px{constructor(e,t=null,n){this.fn=e,this.scheduler=t,this.active=!0,this.deps=[],this.parent=void 0,uI(this,n)}run(){if(!this.active)return this.fn();let e=Fr,t=$o;for(;e;){if(e===this)return;e=e.parent}try{return this.parent=Fr,Fr=this,$o=!0,Qo=1<<++zu,zu<=vy?fI(this):PS(this),this.fn()}finally{zu<=vy&&hI(this),Qo=1<<--zu,Fr=this.parent,$o=t,this.parent=void 0,this.deferStop&&this.stop()}}stop(){Fr===this?this.deferStop=!0:this.active&&(PS(this),this.onStop&&this.onStop(),this.active=!1)}}function PS(i){const{deps:e}=i;if(e.length){for(let t=0;t<e.length;t++)e[t].delete(i);e.length=0}}let $o=!0;const fT=[];function nu(){fT.push($o),$o=!1}function iu(){const i=fT.pop();$o=i===void 0?!0:i}function Oi(i,e,t){if($o&&Fr){let n=sm.get(i);n||sm.set(i,n=new Map);let r=n.get(t);r||n.set(t,r=dx()),hT(r)}}function hT(i,e){let t=!1;zu<=vy?uT(i)||(i.n|=Qo,t=!cT(i)):t=!i.has(Fr),t&&(i.add(Fr),Fr.deps.push(i))}function Vs(i,e,t,n,r,s){const o=sm.get(i);if(!o)return;let a=[];if(e==="clear")a=[...o.values()];else if(t==="length"&&Hs(i)){const l=Number(n);o.forEach((c,u)=>{(u==="length"||!vg(u)&&u>=l)&&a.push(c)})}else switch(t!==void 0&&a.push(o.get(t)),e){case"add":Hs(i)?ux(t)&&a.push(o.get("length")):(a.push(o.get($a)),Up(i)&&a.push(o.get(xy)));break;case"delete":Hs(i)||(a.push(o.get($a)),Up(i)&&a.push(o.get(xy)));break;case"set":Up(i)&&a.push(o.get($a));break}if(a.length===1)a[0]&&by(a[0]);else{const l=[];for(const c of a)c&&l.push(...c);by(dx(l))}}function by(i,e){const t=Hs(i)?i:[...i];for(const n of t)n.computed&&IS(n);for(const n of t)n.computed||IS(n)}function IS(i,e){(i!==Fr||i.allowRecurse)&&(i.scheduler?i.scheduler():i.run())}function dI(i,e){var t;return(t=sm.get(i))==null?void 0:t.get(e)}const pI=iI("__proto__,__v_isRef,__isVue"),dT=new Set(Object.getOwnPropertyNames(Symbol).filter(i=>i!=="arguments"&&i!=="caller").map(i=>Symbol[i]).filter(vg)),LS=mI();function mI(){const i={};return["includes","indexOf","lastIndexOf"].forEach(e=>{i[e]=function(...t){const n=Et(this);for(let s=0,o=this.length;s<o;s++)Oi(n,"get",s+"");const r=n[e](...t);return r===-1||r===!1?n[e](...t.map(Et)):r}}),["push","pop","shift","unshift","splice"].forEach(e=>{i[e]=function(...t){nu();const n=Et(this)[e].apply(this,t);return iu(),n}}),i}function gI(i){const e=Et(this);return Oi(e,"has",i),e.hasOwnProperty(i)}class pT{constructor(e=!1,t=!1){this._isReadonly=e,this._shallow=t}get(e,t,n){const r=this._isReadonly,s=this._shallow;if(t==="__v_isReactive")return!r;if(t==="__v_isReadonly")return r;if(t==="__v_isShallow")return s;if(t==="__v_raw")return n===(r?s?DI:yT:s?_T:gT).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(n)?e:void 0;const o=Hs(e);if(!r){if(o&&rm(LS,t))return Reflect.get(LS,t,n);if(t==="hasOwnProperty")return gI}const a=Reflect.get(e,t,n);return(vg(t)?dT.has(t):pI(t))||(r||Oi(e,"get",t),s)?a:on(a)?o&&ux(t)?a:a.value:kh(a)?r?Uc(a):or(a):a}}class mT extends pT{constructor(e=!1){super(!1,e)}set(e,t,n,r){let s=e[t];if(!this._shallow){const l=cl(s);if(!om(n)&&!cl(n)&&(s=Et(s),n=Et(n)),!Hs(e)&&on(s)&&!on(n))return l?!1:(s.value=n,!0)}const o=Hs(e)&&ux(t)?Number(t)<e.length:rm(e,t),a=Reflect.set(e,t,n,r);return e===Et(r)&&(o?Bh(n,s)&&Vs(e,"set",t,n):Vs(e,"add",t,n)),a}deleteProperty(e,t){const n=rm(e,t);e[t];const r=Reflect.deleteProperty(e,t);return r&&n&&Vs(e,"delete",t,void 0),r}has(e,t){const n=Reflect.has(e,t);return(!vg(t)||!dT.has(t))&&Oi(e,"has",t),n}ownKeys(e){return Oi(e,"iterate",Hs(e)?"length":$a),Reflect.ownKeys(e)}}class _I extends pT{constructor(e=!1){super(!0,e)}set(e,t){return!0}deleteProperty(e,t){return!0}}const yI=new mT,vI=new _I,xI=new mT(!0),mx=i=>i,xg=i=>Reflect.getPrototypeOf(i);function ld(i,e,t=!1,n=!1){i=i.__v_raw;const r=Et(i),s=Et(e);t||(Bh(e,s)&&Oi(r,"get",e),Oi(r,"get",s));const{has:o}=xg(r),a=n?mx:t?yx:$f;if(o.call(r,e))return a(i.get(e));if(o.call(r,s))return a(i.get(s));i!==r&&i.get(e)}function cd(i,e=!1){const t=this.__v_raw,n=Et(t),r=Et(i);return e||(Bh(i,r)&&Oi(n,"has",i),Oi(n,"has",r)),i===r?t.has(i):t.has(i)||t.has(r)}function ud(i,e=!1){return i=i.__v_raw,!e&&Oi(Et(i),"iterate",$a),Reflect.get(i,"size",i)}function FS(i){i=Et(i);const e=Et(this);return xg(e).has.call(e,i)||(e.add(i),Vs(e,"add",i,i)),this}function OS(i,e){e=Et(e);const t=Et(this),{has:n,get:r}=xg(t);let s=n.call(t,i);s||(i=Et(i),s=n.call(t,i));const o=r.call(t,i);return t.set(i,e),s?Bh(e,o)&&Vs(t,"set",i,e):Vs(t,"add",i,e),this}function NS(i){const e=Et(this),{has:t,get:n}=xg(e);let r=t.call(e,i);r||(i=Et(i),r=t.call(e,i)),n&&n.call(e,i);const s=e.delete(i);return r&&Vs(e,"delete",i,void 0),s}function US(){const i=Et(this),e=i.size!==0,t=i.clear();return e&&Vs(i,"clear",void 0,void 0),t}function fd(i,e){return function(n,r){const s=this,o=s.__v_raw,a=Et(o),l=e?mx:i?yx:$f;return!i&&Oi(a,"iterate",$a),o.forEach((c,u)=>n.call(r,l(c),l(u),s))}}function hd(i,e,t){return function(...n){const r=this.__v_raw,s=Et(r),o=Up(s),a=i==="entries"||i===Symbol.iterator&&o,l=i==="keys"&&o,c=r[i](...n),u=t?mx:e?yx:$f;return!e&&Oi(s,"iterate",l?xy:$a),{next(){const{value:h,done:d}=c.next();return d?{value:h,done:d}:{value:a?[u(h[0]),u(h[1])]:u(h),done:d}},[Symbol.iterator](){return this}}}}function ho(i){return function(...e){return i==="delete"?!1:i==="clear"?void 0:this}}function bI(){const i={get(s){return ld(this,s)},get size(){return ud(this)},has:cd,add:FS,set:OS,delete:NS,clear:US,forEach:fd(!1,!1)},e={get(s){return ld(this,s,!1,!0)},get size(){return ud(this)},has:cd,add:FS,set:OS,delete:NS,clear:US,forEach:fd(!1,!0)},t={get(s){return ld(this,s,!0)},get size(){return ud(this,!0)},has(s){return cd.call(this,s,!0)},add:ho("add"),set:ho("set"),delete:ho("delete"),clear:ho("clear"),forEach:fd(!0,!1)},n={get(s){return ld(this,s,!0,!0)},get size(){return ud(this,!0)},has(s){return cd.call(this,s,!0)},add:ho("add"),set:ho("set"),delete:ho("delete"),clear:ho("clear"),forEach:fd(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach(s=>{i[s]=hd(s,!1,!1),t[s]=hd(s,!0,!1),e[s]=hd(s,!1,!0),n[s]=hd(s,!0,!0)}),[i,t,e,n]}const[SI,wI,MI,EI]=bI();function gx(i,e){const t=e?i?EI:MI:i?wI:SI;return(n,r,s)=>r==="__v_isReactive"?!i:r==="__v_isReadonly"?i:r==="__v_raw"?n:Reflect.get(rm(t,r)&&r in n?t:n,r,s)}const TI={get:gx(!1,!1)},AI={get:gx(!1,!0)},CI={get:gx(!0,!1)},gT=new WeakMap,_T=new WeakMap,yT=new WeakMap,DI=new WeakMap;function RI(i){switch(i){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function PI(i){return i.__v_skip||!Object.isExtensible(i)?0:RI(lI(i))}function or(i){return cl(i)?i:_x(i,!1,yI,TI,gT)}function zh(i){return _x(i,!1,xI,AI,_T)}function Uc(i){return _x(i,!0,vI,CI,yT)}function _x(i,e,t,n,r){if(!kh(i)||i.__v_raw&&!(e&&i.__v_isReactive))return i;const s=r.get(i);if(s)return s;const o=PI(i);if(o===0)return i;const a=new Proxy(i,o===2?n:t);return r.set(i,a),a}function qo(i){return cl(i)?qo(i.__v_raw):!!(i&&i.__v_isReactive)}function cl(i){return!!(i&&i.__v_isReadonly)}function om(i){return!!(i&&i.__v_isShallow)}function vT(i){return qo(i)||cl(i)}function Et(i){const e=i&&i.__v_raw;return e?Et(e):i}function bg(i){return cI(i,"__v_skip",!0),i}const $f=i=>kh(i)?or(i):i,yx=i=>kh(i)?Uc(i):i;function vx(i){$o&&Fr&&(i=Et(i),hT(i.dep||(i.dep=dx())))}function xx(i,e){i=Et(i);const t=i.dep;t&&by(t)}function on(i){return!!(i&&i.__v_isRef===!0)}function nt(i){return xT(i,!1)}function Hr(i){return xT(i,!0)}function xT(i,e){return on(i)?i:new II(i,e)}class II{constructor(e,t){this.__v_isShallow=t,this.dep=void 0,this.__v_isRef=!0,this._rawValue=t?e:Et(e),this._value=t?e:$f(e)}get value(){return vx(this),this._value}set value(e){const t=this.__v_isShallow||om(e)||cl(e);e=t?e:Et(e),Bh(e,this._rawValue)&&(this._rawValue=e,this._value=t?e:$f(e),xx(this))}}function Dt(i){return on(i)?i.value:i}const LI={get:(i,e,t)=>Dt(Reflect.get(i,e,t)),set:(i,e,t,n)=>{const r=i[e];return on(r)&&!on(t)?(r.value=t,!0):Reflect.set(i,e,t,n)}};function bT(i){return qo(i)?i:new Proxy(i,LI)}class FI{constructor(e){this.dep=void 0,this.__v_isRef=!0;const{get:t,set:n}=e(()=>vx(this),()=>xx(this));this._get=t,this._set=n}get value(){return this._get()}set value(e){this._set(e)}}function OI(i){return new FI(i)}function ST(i){const e=Hs(i)?new Array(i.length):{};for(const t in i)e[t]=MT(i,t);return e}class NI{constructor(e,t,n){this._object=e,this._key=t,this._defaultValue=n,this.__v_isRef=!0}get value(){const e=this._object[this._key];return e===void 0?this._defaultValue:e}set value(e){this._object[this._key]=e}get dep(){return dI(Et(this._object),this._key)}}class UI{constructor(e){this._getter=e,this.__v_isRef=!0,this.__v_isReadonly=!0}get value(){return this._getter()}}function wT(i,e,t){return on(i)?i:sT(i)?new UI(i):kh(i)&&arguments.length>1?MT(i,e,t):nt(i)}function MT(i,e,t){const n=i[e];return on(n)?n:new NI(i,e,t)}class kI{constructor(e,t,n,r){this._setter=t,this.dep=void 0,this.__v_isRef=!0,this.__v_isReadonly=!1,this._dirty=!0,this.effect=new px(e,()=>{this._dirty||(this._dirty=!0,xx(this))}),this.effect.computed=this,this.effect.active=this._cacheable=!r,this.__v_isReadonly=n}get value(){const e=Et(this);return vx(e),(e._dirty||!e._cacheable)&&(e._dirty=!1,e._value=e.effect.run()),e._value}set value(e){this._setter(e)}}function BI(i,e,t=!1){let n,r;const s=sT(i);return s?(n=i,r=rI):(n=i.get,r=i.set),new kI(n,r,s||!r,t)}function zI(i,e){const t=Object.create(null),n=i.split(",");for(let r=0;r<n.length;r++)t[n[r]]=!0;return r=>!!t[r]}const Zt={},bc=[],Gs=()=>{},HI=()=>!1,Sg=i=>i.charCodeAt(0)===111&&i.charCodeAt(1)===110&&(i.charCodeAt(2)>122||i.charCodeAt(2)<97),ET=i=>i.startsWith("onUpdate:"),ri=Object.assign,bx=(i,e)=>{const t=i.indexOf(e);t>-1&&i.splice(t,1)},VI=Object.prototype.hasOwnProperty,kt=(i,e)=>VI.call(i,e),gt=Array.isArray,TT=i=>wg(i)==="[object Map]",AT=i=>wg(i)==="[object Set]",GI=i=>wg(i)==="[object RegExp]",ft=i=>typeof i=="function",kn=i=>typeof i=="string",CT=i=>typeof i=="symbol",En=i=>i!==null&&typeof i=="object",DT=i=>(En(i)||ft(i))&&ft(i.then)&&ft(i.catch),RT=Object.prototype.toString,wg=i=>RT.call(i),PT=i=>wg(i)==="[object Object]",of=zI(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Mg=i=>{const e=Object.create(null);return t=>e[t]||(e[t]=i(t))},WI=/-(\w)/g,ds=Mg(i=>i.replace(WI,(e,t)=>t?t.toUpperCase():"")),XI=/\B([A-Z])/g,Eg=Mg(i=>i.replace(XI,"-$1").toLowerCase()),Sx=Mg(i=>i.charAt(0).toUpperCase()+i.slice(1)),F_=Mg(i=>i?`on${Sx(i)}`:""),kS=(i,e)=>!Object.is(i,e),af=(i,e)=>{for(let t=0;t<i.length;t++)i[t](e)},Sy=(i,e,t)=>{Object.defineProperty(i,e,{configurable:!0,enumerable:!1,value:t})},$I=i=>{const e=parseFloat(i);return isNaN(e)?i:e},qI=i=>{const e=kn(i)?Number(i):NaN;return isNaN(e)?i:e};let BS;const wy=()=>BS||(BS=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Hh(i){if(gt(i)){const e={};for(let t=0;t<i.length;t++){const n=i[t],r=kn(n)?ZI(n):Hh(n);if(r)for(const s in r)e[s]=r[s]}return e}else if(kn(i)||En(i))return i}const YI=/;(?![^(]*\))/g,jI=/:([^]+)/,KI=/\/\*[^]*?\*\//g;function ZI(i){const e={};return i.replace(KI,"").split(YI).forEach(t=>{if(t){const n=t.split(jI);n.length>1&&(e[n[0].trim()]=n[1].trim())}}),e}function Ys(i){let e="";if(kn(i))e=i;else if(gt(i))for(let t=0;t<i.length;t++){const n=Ys(i[t]);n&&(e+=n+" ")}else if(En(i))for(const t in i)i[t]&&(e+=t+" ");return e.trim()}function JI(i){if(!i)return null;let{class:e,style:t}=i;return e&&!kn(e)&&(i.class=Ys(e)),t&&(i.style=Hh(t)),i}const IT=i=>kn(i)?i:i==null?"":gt(i)||En(i)&&(i.toString===RT||!ft(i.toString))?JSON.stringify(i,LT,2):String(i),LT=(i,e)=>e&&e.__v_isRef?LT(i,e.value):TT(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((t,[n,r],s)=>(t[O_(n,s)+" =>"]=r,t),{})}:AT(e)?{[`Set(${e.size})`]:[...e.values()].map(t=>O_(t))}:CT(e)?O_(e):En(e)&&!gt(e)&&!PT(e)?String(e):e,O_=(i,e="")=>{var t;return CT(i)?`Symbol(${(t=i.description)!=null?t:e})`:i};function Yo(i,e,t,n){let r;try{r=n?i(...n):i()}catch(s){ru(s,e,t)}return r}function Sr(i,e,t,n){if(ft(i)){const s=Yo(i,e,t,n);return s&&DT(s)&&s.catch(o=>{ru(o,e,t)}),s}const r=[];for(let s=0;s<i.length;s++)r.push(Sr(i[s],e,t,n));return r}function ru(i,e,t,n=!0){const r=e?e.vnode:null;if(e){let s=e.parent;const o=e.proxy,a=t;for(;s;){const c=s.ec;if(c){for(let u=0;u<c.length;u++)if(c[u](i,o,a)===!1)return}s=s.parent}const l=e.appContext.config.errorHandler;if(l){Yo(l,null,10,[i,o,a]);return}}QI(i,t,r,n)}function QI(i,e,t,n=!0){console.error(i)}let qf=!1,My=!1;const Qn=[];let is=0;const Sc=[];let As=null,Ua=0;const FT=Promise.resolve();let wx=null;function so(i){const e=wx||FT;return i?e.then(this?i.bind(this):i):e}function eL(i){let e=is+1,t=Qn.length;for(;e<t;){const n=e+t>>>1,r=Qn[n],s=Yf(r);s<i||s===i&&r.pre?e=n+1:t=n}return e}function Tg(i){(!Qn.length||!Qn.includes(i,qf&&i.allowRecurse?is+1:is))&&(i.id==null?Qn.push(i):Qn.splice(eL(i.id),0,i),OT())}function OT(){!qf&&!My&&(My=!0,wx=FT.then(NT))}function tL(i){const e=Qn.indexOf(i);e>is&&Qn.splice(e,1)}function Ey(i){gt(i)?Sc.push(...i):(!As||!As.includes(i,i.allowRecurse?Ua+1:Ua))&&Sc.push(i),OT()}function zS(i,e,t=qf?is+1:0){for(;t<Qn.length;t++){const n=Qn[t];if(n&&n.pre){if(i&&n.id!==i.uid)continue;Qn.splice(t,1),t--,n()}}}function am(i){if(Sc.length){const e=[...new Set(Sc)];if(Sc.length=0,As){As.push(...e);return}for(As=e,As.sort((t,n)=>Yf(t)-Yf(n)),Ua=0;Ua<As.length;Ua++)As[Ua]();As=null,Ua=0}}const Yf=i=>i.id==null?1/0:i.id,nL=(i,e)=>{const t=Yf(i)-Yf(e);if(t===0){if(i.pre&&!e.pre)return-1;if(e.pre&&!i.pre)return 1}return t};function NT(i){My=!1,qf=!0,Qn.sort(nL);try{for(is=0;is<Qn.length;is++){const e=Qn[is];e&&e.active!==!1&&Yo(e,null,14)}}finally{is=0,Qn.length=0,am(),qf=!1,wx=null,(Qn.length||Sc.length)&&NT()}}function iL(i,e,...t){if(i.isUnmounted)return;const n=i.vnode.props||Zt;let r=t;const s=e.startsWith("update:"),o=s&&e.slice(7);if(o&&o in n){const u=`${o==="modelValue"?"model":o}Modifiers`,{number:h,trim:d}=n[u]||Zt;d&&(r=t.map(f=>kn(f)?f.trim():f)),h&&(r=t.map($I))}let a,l=n[a=F_(e)]||n[a=F_(ds(e))];!l&&s&&(l=n[a=F_(Eg(e))]),l&&Sr(l,i,6,r);const c=n[a+"Once"];if(c){if(!i.emitted)i.emitted={};else if(i.emitted[a])return;i.emitted[a]=!0,Sr(c,i,6,r)}}function UT(i,e,t=!1){const n=e.emitsCache,r=n.get(i);if(r!==void 0)return r;const s=i.emits;let o={},a=!1;if(!ft(i)){const l=c=>{const u=UT(c,e,!0);u&&(a=!0,ri(o,u))};!t&&e.mixins.length&&e.mixins.forEach(l),i.extends&&l(i.extends),i.mixins&&i.mixins.forEach(l)}return!s&&!a?(En(i)&&n.set(i,null),null):(gt(s)?s.forEach(l=>o[l]=null):ri(o,s),En(i)&&n.set(i,o),o)}function Ag(i,e){return!i||!Sg(e)?!1:(e=e.slice(2).replace(/Once$/,""),kt(i,e[0].toLowerCase()+e.slice(1))||kt(i,Eg(e))||kt(i,e))}let tr=null,Cg=null;function lm(i){const e=tr;return tr=i,Cg=i&&i.type.__scopeId||null,e}function Dg(i){Cg=i}function Rg(){Cg=null}function ul(i,e=tr,t){if(!e||i._n)return i;const n=(...r)=>{n._d&&ew(-1);const s=lm(e);let o;try{o=i(...r)}finally{lm(s),n._d&&ew(1)}return o};return n._n=!0,n._c=!0,n._d=!0,n}function N_(i){const{type:e,vnode:t,proxy:n,withProxy:r,props:s,propsOptions:[o],slots:a,attrs:l,emit:c,render:u,renderCache:h,data:d,setupState:f,ctx:p,inheritAttrs:m}=i;let g,_;const x=lm(i);try{if(t.shapeFlag&4){const v=r||n,w=v;g=mr(u.call(w,v,h,s,f,d,p)),_=l}else{const v=e;g=mr(v.length>1?v(s,{attrs:l,slots:a,emit:c}):v(s,null)),_=e.props?l:sL(l)}}catch(v){uf.length=0,ru(v,i,1),g=Ft(Di)}let y=g;if(_&&m!==!1){const v=Object.keys(_),{shapeFlag:w}=y;v.length&&w&7&&(o&&v.some(ET)&&(_=oL(_,o)),y=js(y,_))}return t.dirs&&(y=js(y),y.dirs=y.dirs?y.dirs.concat(t.dirs):t.dirs),t.transition&&(y.transition=t.transition),g=y,lm(x),g}function rL(i){let e;for(let t=0;t<i.length;t++){const n=i[t];if(Zf(n)){if(n.type!==Di||n.children==="v-if"){if(e)return;e=n}}else return}return e}const sL=i=>{let e;for(const t in i)(t==="class"||t==="style"||Sg(t))&&((e||(e={}))[t]=i[t]);return e},oL=(i,e)=>{const t={};for(const n in i)(!ET(n)||!(n.slice(9)in e))&&(t[n]=i[n]);return t};function aL(i,e,t){const{props:n,children:r,component:s}=i,{props:o,children:a,patchFlag:l}=e,c=s.emitsOptions;if(e.dirs||e.transition)return!0;if(t&&l>=0){if(l&1024)return!0;if(l&16)return n?HS(n,o,c):!!o;if(l&8){const u=e.dynamicProps;for(let h=0;h<u.length;h++){const d=u[h];if(o[d]!==n[d]&&!Ag(c,d))return!0}}}else return(r||a)&&(!a||!a.$stable)?!0:n===o?!1:n?o?HS(n,o,c):!0:!!o;return!1}function HS(i,e,t){const n=Object.keys(e);if(n.length!==Object.keys(i).length)return!0;for(let r=0;r<n.length;r++){const s=n[r];if(e[s]!==i[s]&&!Ag(t,s))return!0}return!1}function Mx({vnode:i,parent:e},t){for(;e&&e.subTree===i;)(i=e.vnode).el=t,e=e.parent}const kT="components";function lL(i,e){return zT(kT,i,!0,e)||i}const BT=Symbol.for("v-ndc");function cL(i){return kn(i)?zT(kT,i,!1)||i:i||BT}function zT(i,e,t=!0,n=!1){const r=tr||Sn;if(r){const s=r.type;{const a=Iy(s,!1);if(a&&(a===e||a===ds(e)||a===Sx(ds(e))))return s}const o=VS(r[i]||s[i],e)||VS(r.appContext[i],e);return!o&&n?s:o}}function VS(i,e){return i&&(i[e]||i[ds(e)]||i[Sx(ds(e))])}const HT=i=>i.__isSuspense,uL={name:"Suspense",__isSuspense:!0,process(i,e,t,n,r,s,o,a,l,c){i==null?fL(e,t,n,r,s,o,a,l,c):hL(i,e,t,n,r,o,a,l,c)},hydrate:dL,create:Tx,normalize:pL},Ex=uL;function jf(i,e){const t=i.props&&i.props[e];ft(t)&&t()}function fL(i,e,t,n,r,s,o,a,l){const{p:c,o:{createElement:u}}=l,h=u("div"),d=i.suspense=Tx(i,r,n,e,h,t,s,o,a,l);c(null,d.pendingBranch=i.ssContent,h,null,n,d,s,o),d.deps>0?(jf(i,"onPending"),jf(i,"onFallback"),c(null,i.ssFallback,e,t,n,null,s,o),wc(d,i.ssFallback)):d.resolve(!1,!0)}function hL(i,e,t,n,r,s,o,a,{p:l,um:c,o:{createElement:u}}){const h=e.suspense=i.suspense;h.vnode=e,e.el=i.el;const d=e.ssContent,f=e.ssFallback,{activeBranch:p,pendingBranch:m,isInFallback:g,isHydrating:_}=h;if(m)h.pendingBranch=d,Or(d,m)?(l(m,d,h.hiddenContainer,null,r,h,s,o,a),h.deps<=0?h.resolve():g&&(l(p,f,t,n,r,null,s,o,a),wc(h,f))):(h.pendingId++,_?(h.isHydrating=!1,h.activeBranch=m):c(m,r,h),h.deps=0,h.effects.length=0,h.hiddenContainer=u("div"),g?(l(null,d,h.hiddenContainer,null,r,h,s,o,a),h.deps<=0?h.resolve():(l(p,f,t,n,r,null,s,o,a),wc(h,f))):p&&Or(d,p)?(l(p,d,t,n,r,h,s,o,a),h.resolve(!0)):(l(null,d,h.hiddenContainer,null,r,h,s,o,a),h.deps<=0&&h.resolve()));else if(p&&Or(d,p))l(p,d,t,n,r,h,s,o,a),wc(h,d);else if(jf(e,"onPending"),h.pendingBranch=d,h.pendingId++,l(null,d,h.hiddenContainer,null,r,h,s,o,a),h.deps<=0)h.resolve();else{const{timeout:x,pendingId:y}=h;x>0?setTimeout(()=>{h.pendingId===y&&h.fallback(f)},x):x===0&&h.fallback(f)}}function Tx(i,e,t,n,r,s,o,a,l,c,u=!1){const{p:h,m:d,um:f,n:p,o:{parentNode:m,remove:g}}=c;let _;const x=mL(i);x&&e!=null&&e.pendingBranch&&(_=e.pendingId,e.deps++);const y=i.props?qI(i.props.timeout):void 0,v={vnode:i,parent:e,parentComponent:t,isSVG:o,container:n,hiddenContainer:r,anchor:s,deps:0,pendingId:0,timeout:typeof y=="number"?y:-1,activeBranch:null,pendingBranch:null,isInFallback:!u,isHydrating:u,isUnmounted:!1,effects:[],resolve(w=!1,T=!1){const{vnode:A,activeBranch:C,pendingBranch:M,pendingId:b,effects:R,parentComponent:L,container:F}=v;let H=!1;if(v.isHydrating)v.isHydrating=!1;else if(!w){H=C&&M.transition&&M.transition.mode==="out-in",H&&(C.transition.afterLeave=()=>{b===v.pendingId&&(d(M,F,p(C),0),Ey(R))});let{anchor:$}=v;C&&($=p(C),f(C,L,v,!0)),H||d(M,F,$,0)}wc(v,M),v.pendingBranch=null,v.isInFallback=!1;let W=v.parent,N=!1;for(;W;){if(W.pendingBranch){W.effects.push(...R),N=!0;break}W=W.parent}!N&&!H&&Ey(R),v.effects=[],x&&e&&e.pendingBranch&&_===e.pendingId&&(e.deps--,e.deps===0&&!T&&e.resolve()),jf(A,"onResolve")},fallback(w){if(!v.pendingBranch)return;const{vnode:T,activeBranch:A,parentComponent:C,container:M,isSVG:b}=v;jf(T,"onFallback");const R=p(A),L=()=>{v.isInFallback&&(h(null,w,M,R,C,null,b,a,l),wc(v,w))},F=w.transition&&w.transition.mode==="out-in";F&&(A.transition.afterLeave=L),v.isInFallback=!0,f(A,C,null,!0),F||L()},move(w,T,A){v.activeBranch&&d(v.activeBranch,w,T,A),v.container=w},next(){return v.activeBranch&&p(v.activeBranch)},registerDep(w,T){const A=!!v.pendingBranch;A&&v.deps++;const C=w.vnode.el;w.asyncDep.catch(M=>{ru(M,w,0)}).then(M=>{if(w.isUnmounted||v.isUnmounted||v.pendingId!==w.suspenseId)return;w.asyncResolved=!0;const{vnode:b}=w;Py(w,M,!1),C&&(b.el=C);const R=!C&&w.subTree.el;T(w,b,m(C||w.subTree.el),C?null:p(w.subTree),v,o,l),R&&g(R),Mx(w,b.el),A&&--v.deps===0&&v.resolve()})},unmount(w,T){v.isUnmounted=!0,v.activeBranch&&f(v.activeBranch,t,w,T),v.pendingBranch&&f(v.pendingBranch,t,w,T)}};return v}function dL(i,e,t,n,r,s,o,a,l){const c=e.suspense=Tx(e,n,t,i.parentNode,document.createElement("div"),null,r,s,o,a,!0),u=l(i,c.pendingBranch=e.ssContent,t,c,s,o);return c.deps===0&&c.resolve(!1,!0),u}function pL(i){const{shapeFlag:e,children:t}=i,n=e&32;i.ssContent=GS(n?t.default:t),i.ssFallback=n?GS(t.fallback):Ft(Di)}function GS(i){let e;if(ft(i)){const t=Bc&&i._c;t&&(i._d=!1,Gn()),i=i(),t&&(i._d=!0,e=yr,uA())}return gt(i)&&(i=rL(i)),i=mr(i),e&&!i.dynamicChildren&&(i.dynamicChildren=e.filter(t=>t!==i)),i}function VT(i,e){e&&e.pendingBranch?gt(i)?e.effects.push(...i):e.effects.push(i):Ey(i)}function wc(i,e){i.activeBranch=e;const{vnode:t,parentComponent:n}=i,r=t.el=e.el;n&&n.subTree===t&&(n.vnode.el=r,Mx(n,r))}function mL(i){var e;return((e=i.props)==null?void 0:e.suspensible)!=null&&i.props.suspensible!==!1}function qa(i,e){return Ax(i,null,e)}const dd={};function Mn(i,e,t){return Ax(i,e,t)}function Ax(i,e,{immediate:t,deep:n,flush:r,onTrack:s,onTrigger:o}=Zt){var a;const l=hx()===((a=Sn)==null?void 0:a.scope)?Sn:null;let c,u=!1,h=!1;if(on(i)?(c=()=>i.value,u=om(i)):qo(i)?(c=()=>i,n=!0):gt(i)?(h=!0,u=i.some(v=>qo(v)||om(v)),c=()=>i.map(v=>{if(on(v))return v.value;if(qo(v))return oc(v);if(ft(v))return Yo(v,l,2)})):ft(i)?e?c=()=>Yo(i,l,2):c=()=>{if(!(l&&l.isUnmounted))return d&&d(),Sr(i,l,3,[f])}:c=Gs,e&&n){const v=c;c=()=>oc(v())}let d,f=v=>{d=x.onStop=()=>{Yo(v,l,4),d=x.onStop=void 0}},p;if(Hc)if(f=Gs,e?t&&Sr(e,l,3,[c(),h?[]:void 0,f]):c(),r==="sync"){const v=n3();p=v.__watcherHandles||(v.__watcherHandles=[])}else return Gs;let m=h?new Array(i.length).fill(dd):dd;const g=()=>{if(x.active)if(e){const v=x.run();(n||u||(h?v.some((w,T)=>kS(w,m[T])):kS(v,m)))&&(d&&d(),Sr(e,l,3,[v,m===dd?void 0:h&&m[0]===dd?[]:m,f]),m=v)}else x.run()};g.allowRecurse=!!e;let _;r==="sync"?_=g:r==="post"?_=()=>Hn(g,l&&l.suspense):(g.pre=!0,l&&(g.id=l.uid),_=()=>Tg(g));const x=new px(c,_);e?t?g():m=x.run():r==="post"?Hn(x.run.bind(x),l&&l.suspense):x.run();const y=()=>{x.stop(),l&&l.scope&&bx(l.scope.effects,x)};return p&&p.push(y),y}function gL(i,e,t){const n=this.proxy,r=kn(i)?i.includes(".")?GT(n,i):()=>n[i]:i.bind(n,n);let s;ft(e)?s=e:(s=e.handler,t=e);const o=Sn;zc(this);const a=Ax(r,s.bind(n),t);return o?zc(o):Ya(),a}function GT(i,e){const t=e.split(".");return()=>{let n=i;for(let r=0;r<t.length&&n;r++)n=n[t[r]];return n}}function oc(i,e){if(!En(i)||i.__v_skip||(e=e||new Set,e.has(i)))return i;if(e.add(i),on(i))oc(i.value,e);else if(gt(i))for(let t=0;t<i.length;t++)oc(i[t],e);else if(AT(i)||TT(i))i.forEach(t=>{oc(t,e)});else if(PT(i))for(const t in i)oc(i[t],e);return i}function Jr(i,e,t,n){const r=i.dirs,s=e&&e.dirs;for(let o=0;o<r.length;o++){const a=r[o];s&&(a.oldValue=s[o].value);let l=a.dir[n];l&&(nu(),Sr(l,t,8,[i.el,a,i,e]),iu())}}const Ro=Symbol("_leaveCb"),pd=Symbol("_enterCb");function _L(){const i={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return Xr(()=>{i.isMounted=!0}),Gh(()=>{i.isUnmounting=!0}),i}const ur=[Function,Array],WT={mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:ur,onEnter:ur,onAfterEnter:ur,onEnterCancelled:ur,onBeforeLeave:ur,onLeave:ur,onAfterLeave:ur,onLeaveCancelled:ur,onBeforeAppear:ur,onAppear:ur,onAfterAppear:ur,onAppearCancelled:ur},yL={name:"BaseTransition",props:WT,setup(i,{slots:e}){const t=Ks(),n=_L();let r;return()=>{const s=e.default&&$T(e.default(),!0);if(!s||!s.length)return;let o=s[0];if(s.length>1){for(const m of s)if(m.type!==Di){o=m;break}}const a=Et(i),{mode:l}=a;if(n.isLeaving)return U_(o);const c=WS(o);if(!c)return U_(o);const u=Ty(c,a,n,t);cm(c,u);const h=t.subTree,d=h&&WS(h);let f=!1;const{getTransitionKey:p}=c.type;if(p){const m=p();r===void 0?r=m:m!==r&&(r=m,f=!0)}if(d&&d.type!==Di&&(!Or(c,d)||f)){const m=Ty(d,a,n,t);if(cm(d,m),l==="out-in")return n.isLeaving=!0,m.afterLeave=()=>{n.isLeaving=!1,t.update.active!==!1&&t.update()},U_(o);l==="in-out"&&c.type!==Di&&(m.delayLeave=(g,_,x)=>{const y=XT(n,d);y[String(d.key)]=d,g[Ro]=()=>{_(),g[Ro]=void 0,delete u.delayedLeave},u.delayedLeave=x})}return o}}},vL=yL;function XT(i,e){const{leavingVNodes:t}=i;let n=t.get(e.type);return n||(n=Object.create(null),t.set(e.type,n)),n}function Ty(i,e,t,n){const{appear:r,mode:s,persisted:o=!1,onBeforeEnter:a,onEnter:l,onAfterEnter:c,onEnterCancelled:u,onBeforeLeave:h,onLeave:d,onAfterLeave:f,onLeaveCancelled:p,onBeforeAppear:m,onAppear:g,onAfterAppear:_,onAppearCancelled:x}=e,y=String(i.key),v=XT(t,i),w=(C,M)=>{C&&Sr(C,n,9,M)},T=(C,M)=>{const b=M[1];w(C,M),gt(C)?C.every(R=>R.length<=1)&&b():C.length<=1&&b()},A={mode:s,persisted:o,beforeEnter(C){let M=a;if(!t.isMounted)if(r)M=m||a;else return;C[Ro]&&C[Ro](!0);const b=v[y];b&&Or(i,b)&&b.el[Ro]&&b.el[Ro](),w(M,[C])},enter(C){let M=l,b=c,R=u;if(!t.isMounted)if(r)M=g||l,b=_||c,R=x||u;else return;let L=!1;const F=C[pd]=H=>{L||(L=!0,H?w(R,[C]):w(b,[C]),A.delayedLeave&&A.delayedLeave(),C[pd]=void 0)};M?T(M,[C,F]):F()},leave(C,M){const b=String(i.key);if(C[pd]&&C[pd](!0),t.isUnmounting)return M();w(h,[C]);let R=!1;const L=C[Ro]=F=>{R||(R=!0,M(),F?w(p,[C]):w(f,[C]),C[Ro]=void 0,v[b]===i&&delete v[b])};v[b]=i,d?T(d,[C,L]):L()},clone(C){return Ty(C,e,t,n)}};return A}function U_(i){if(Vh(i))return i=js(i),i.children=null,i}function WS(i){return Vh(i)?i.children?i.children[0]:void 0:i}function cm(i,e){i.shapeFlag&6&&i.component?cm(i.component.subTree,e):i.shapeFlag&128?(i.ssContent.transition=e.clone(i.ssContent),i.ssFallback.transition=e.clone(i.ssFallback)):i.transition=e}function $T(i,e=!1,t){let n=[],r=0;for(let s=0;s<i.length;s++){let o=i[s];const a=t==null?o.key:String(t)+String(o.key!=null?o.key:s);o.type===Ki?(o.patchFlag&128&&r++,n=n.concat($T(o.children,e,a))):(e||o.type!==Di)&&n.push(a!=null?js(o,{key:a}):o)}if(r>1)for(let s=0;s<n.length;s++)n[s].patchFlag=-2;return n}/*! #__NO_SIDE_EFFECTS__ */function ea(i,e){return ft(i)?ri({name:i.name},e,{setup:i}):i}const Mc=i=>!!i.type.__asyncLoader;/*! #__NO_SIDE_EFFECTS__ */function XS(i){ft(i)&&(i={loader:i});const{loader:e,loadingComponent:t,errorComponent:n,delay:r=200,timeout:s,suspensible:o=!0,onError:a}=i;let l=null,c,u=0;const h=()=>(u++,l=null,d()),d=()=>{let f;return l||(f=l=e().catch(p=>{if(p=p instanceof Error?p:new Error(String(p)),a)return new Promise((m,g)=>{a(p,()=>m(h()),()=>g(p),u+1)});throw p}).then(p=>f!==l&&l?l:(p&&(p.__esModule||p[Symbol.toStringTag]==="Module")&&(p=p.default),c=p,p)))};return ea({name:"AsyncComponentWrapper",__asyncLoader:d,get __asyncResolved(){return c},setup(){const f=Sn;if(c)return()=>k_(c,f);const p=x=>{l=null,ru(x,f,13,!n)};if(o&&f.suspense||Hc)return d().then(x=>()=>k_(x,f)).catch(x=>(p(x),()=>n?Ft(n,{error:x}):null));const m=nt(!1),g=nt(),_=nt(!!r);return r&&setTimeout(()=>{_.value=!1},r),s!=null&&setTimeout(()=>{if(!m.value&&!g.value){const x=new Error(`Async component timed out after ${s}ms.`);p(x),g.value=x}},s),d().then(()=>{m.value=!0,f.parent&&Vh(f.parent.vnode)&&Tg(f.parent.update)}).catch(x=>{p(x),g.value=x}),()=>{if(m.value&&c)return k_(c,f);if(g.value&&n)return Ft(n,{error:g.value});if(t&&!_.value)return Ft(t)}}})}function k_(i,e){const{ref:t,props:n,children:r,ce:s}=e.vnode,o=Ft(i,n,r);return o.ref=t,o.ce=s,delete e.vnode.ce,o}const Vh=i=>i.type.__isKeepAlive,xL={name:"KeepAlive",__isKeepAlive:!0,props:{include:[String,RegExp,Array],exclude:[String,RegExp,Array],max:[String,Number]},setup(i,{slots:e}){const t=Ks(),n=t.ctx;if(!n.renderer)return()=>{const x=e.default&&e.default();return x&&x.length===1?x[0]:x};const r=new Map,s=new Set;let o=null;const a=t.suspense,{renderer:{p:l,m:c,um:u,o:{createElement:h}}}=n,d=h("div");n.activate=(x,y,v,w,T)=>{const A=x.component;c(x,y,v,0,a),l(A.vnode,x,y,v,A,a,w,x.slotScopeIds,T),Hn(()=>{A.isDeactivated=!1,A.a&&af(A.a);const C=x.props&&x.props.onVnodeMounted;C&&Ti(C,A.parent,x)},a)},n.deactivate=x=>{const y=x.component;c(x,d,null,1,a),Hn(()=>{y.da&&af(y.da);const v=x.props&&x.props.onVnodeUnmounted;v&&Ti(v,y.parent,x),y.isDeactivated=!0},a)};function f(x){B_(x),u(x,t,a,!0)}function p(x){r.forEach((y,v)=>{const w=Iy(y.type);w&&(!x||!x(w))&&m(v)})}function m(x){const y=r.get(x);!o||!Or(y,o)?f(y):o&&B_(o),r.delete(x),s.delete(x)}Mn(()=>[i.include,i.exclude],([x,y])=>{x&&p(v=>Hu(x,v)),y&&p(v=>!Hu(y,v))},{flush:"post",deep:!0});let g=null;const _=()=>{g!=null&&r.set(g,z_(t.subTree))};return Xr(_),KT(_),Gh(()=>{r.forEach(x=>{const{subTree:y,suspense:v}=t,w=z_(y);if(x.type===w.type&&x.key===w.key){B_(w);const T=w.component.da;T&&Hn(T,v);return}f(x)})}),()=>{if(g=null,!e.default)return null;const x=e.default(),y=x[0];if(x.length>1)return o=null,x;if(!Zf(y)||!(y.shapeFlag&4)&&!(y.shapeFlag&128))return o=null,y;let v=z_(y);const w=v.type,T=Iy(Mc(v)?v.type.__asyncResolved||{}:w),{include:A,exclude:C,max:M}=i;if(A&&(!T||!Hu(A,T))||C&&T&&Hu(C,T))return o=v,y;const b=v.key==null?w:v.key,R=r.get(b);return v.el&&(v=js(v),y.shapeFlag&128&&(y.ssContent=v)),g=b,R?(v.el=R.el,v.component=R.component,v.transition&&cm(v,v.transition),v.shapeFlag|=512,s.delete(b),s.add(b)):(s.add(b),M&&s.size>parseInt(M,10)&&m(s.values().next().value)),v.shapeFlag|=256,o=v,HT(y.type)?y:v}}},bL=xL;function Hu(i,e){return gt(i)?i.some(t=>Hu(t,e)):kn(i)?i.split(",").includes(e):GI(i)?i.test(e):!1}function qT(i,e){jT(i,"a",e)}function YT(i,e){jT(i,"da",e)}function jT(i,e,t=Sn){const n=i.__wdc||(i.__wdc=()=>{let r=t;for(;r;){if(r.isDeactivated)return;r=r.parent}return i()});if(Pg(e,n,t),t){let r=t.parent;for(;r&&r.parent;)Vh(r.parent.vnode)&&SL(n,e,t,r),r=r.parent}}function SL(i,e,t,n){const r=Pg(e,i,n,!0);su(()=>{bx(n[e],r)},t)}function B_(i){i.shapeFlag&=-257,i.shapeFlag&=-513}function z_(i){return i.shapeFlag&128?i.ssContent:i}function Pg(i,e,t=Sn,n=!1){if(t){const r=t[i]||(t[i]=[]),s=e.__weh||(e.__weh=(...o)=>{if(t.isUnmounted)return;nu(),zc(t);const a=Sr(e,t,i,o);return Ya(),iu(),a});return n?r.unshift(s):r.push(s),s}}const oo=i=>(e,t=Sn)=>(!Hc||i==="sp")&&Pg(i,(...n)=>e(...n),t),wL=oo("bm"),Xr=oo("m"),ML=oo("bu"),KT=oo("u"),Gh=oo("bum"),su=oo("um"),EL=oo("sp"),TL=oo("rtg"),AL=oo("rtc");function ZT(i,e=Sn){Pg("ec",i,e)}function b7(i,e,t,n){let r;const s=t;if(gt(i)||kn(i)){r=new Array(i.length);for(let o=0,a=i.length;o<a;o++)r[o]=e(i[o],o,void 0,s)}else if(typeof i=="number"){r=new Array(i);for(let o=0;o<i;o++)r[o]=e(o+1,o,void 0,s)}else if(En(i))if(i[Symbol.iterator])r=Array.from(i,(o,a)=>e(o,a,void 0,s));else{const o=Object.keys(i);r=new Array(o.length);for(let a=0,l=o.length;a<l;a++){const c=o[a];r[a]=e(i[c],c,a,s)}}else r=[];return r}const Ay=i=>i?mA(i)?Lx(i)||i.proxy:Ay(i.parent):null,lf=ri(Object.create(null),{$:i=>i,$el:i=>i.vnode.el,$data:i=>i.data,$props:i=>i.props,$attrs:i=>i.attrs,$slots:i=>i.slots,$refs:i=>i.refs,$parent:i=>Ay(i.parent),$root:i=>Ay(i.root),$emit:i=>i.emit,$options:i=>Cx(i),$forceUpdate:i=>i.f||(i.f=()=>Tg(i.update)),$nextTick:i=>i.n||(i.n=so.bind(i.proxy)),$watch:i=>gL.bind(i)}),H_=(i,e)=>i!==Zt&&!i.__isScriptSetup&&kt(i,e),CL={get({_:i},e){const{ctx:t,setupState:n,data:r,props:s,accessCache:o,type:a,appContext:l}=i;let c;if(e[0]!=="$"){const f=o[e];if(f!==void 0)switch(f){case 1:return n[e];case 2:return r[e];case 4:return t[e];case 3:return s[e]}else{if(H_(n,e))return o[e]=1,n[e];if(r!==Zt&&kt(r,e))return o[e]=2,r[e];if((c=i.propsOptions[0])&&kt(c,e))return o[e]=3,s[e];if(t!==Zt&&kt(t,e))return o[e]=4,t[e];Cy&&(o[e]=0)}}const u=lf[e];let h,d;if(u)return e==="$attrs"&&Oi(i,"get",e),u(i);if((h=a.__cssModules)&&(h=h[e]))return h;if(t!==Zt&&kt(t,e))return o[e]=4,t[e];if(d=l.config.globalProperties,kt(d,e))return d[e]},set({_:i},e,t){const{data:n,setupState:r,ctx:s}=i;return H_(r,e)?(r[e]=t,!0):n!==Zt&&kt(n,e)?(n[e]=t,!0):kt(i.props,e)||e[0]==="$"&&e.slice(1)in i?!1:(s[e]=t,!0)},has({_:{data:i,setupState:e,accessCache:t,ctx:n,appContext:r,propsOptions:s}},o){let a;return!!t[o]||i!==Zt&&kt(i,o)||H_(e,o)||(a=s[0])&&kt(a,o)||kt(n,o)||kt(lf,o)||kt(r.config.globalProperties,o)},defineProperty(i,e,t){return t.get!=null?i._.accessCache[e]=0:kt(t,"value")&&this.set(i,e,t.value,null),Reflect.defineProperty(i,e,t)}};function DL(){return JT().slots}function S7(){return JT().attrs}function JT(){const i=Ks();return i.setupContext||(i.setupContext=_A(i))}function $S(i){return gt(i)?i.reduce((e,t)=>(e[t]=null,e),{}):i}let Cy=!0;function RL(i){const e=Cx(i),t=i.proxy,n=i.ctx;Cy=!1,e.beforeCreate&&qS(e.beforeCreate,i,"bc");const{data:r,computed:s,methods:o,watch:a,provide:l,inject:c,created:u,beforeMount:h,mounted:d,beforeUpdate:f,updated:p,activated:m,deactivated:g,beforeDestroy:_,beforeUnmount:x,destroyed:y,unmounted:v,render:w,renderTracked:T,renderTriggered:A,errorCaptured:C,serverPrefetch:M,expose:b,inheritAttrs:R,components:L,directives:F,filters:H}=e;if(c&&PL(c,n,null),o)for(const $ in o){const X=o[$];ft(X)&&(n[$]=X.bind(t))}if(r){const $=r.call(t,t);En($)&&(i.data=or($))}if(Cy=!0,s)for(const $ in s){const X=s[$],Z=ft(X)?X.bind(t,t):ft(X.get)?X.get.bind(t,t):Gs,z=!ft(X)&&ft(X.set)?X.set.bind(t):Gs,ue=Ht({get:Z,set:z});Object.defineProperty(n,$,{enumerable:!0,configurable:!0,get:()=>ue.value,set:me=>ue.value=me})}if(a)for(const $ in a)QT(a[$],n,t,$);if(l){const $=ft(l)?l.call(t):l;Reflect.ownKeys($).forEach(X=>{Ws(X,$[X])})}u&&qS(u,i,"c");function N($,X){gt(X)?X.forEach(Z=>$(Z.bind(t))):X&&$(X.bind(t))}if(N(wL,h),N(Xr,d),N(ML,f),N(KT,p),N(qT,m),N(YT,g),N(ZT,C),N(AL,T),N(TL,A),N(Gh,x),N(su,v),N(EL,M),gt(b))if(b.length){const $=i.exposed||(i.exposed={});b.forEach(X=>{Object.defineProperty($,X,{get:()=>t[X],set:Z=>t[X]=Z})})}else i.exposed||(i.exposed={});w&&i.render===Gs&&(i.render=w),R!=null&&(i.inheritAttrs=R),L&&(i.components=L),F&&(i.directives=F)}function PL(i,e,t=Gs){gt(i)&&(i=Dy(i));for(const n in i){const r=i[n];let s;En(r)?"default"in r?s=xi(r.from||n,r.default,!0):s=xi(r.from||n):s=xi(r),on(s)?Object.defineProperty(e,n,{enumerable:!0,configurable:!0,get:()=>s.value,set:o=>s.value=o}):e[n]=s}}function qS(i,e,t){Sr(gt(i)?i.map(n=>n.bind(e.proxy)):i.bind(e.proxy),e,t)}function QT(i,e,t,n){const r=n.includes(".")?GT(t,n):()=>t[n];if(kn(i)){const s=e[i];ft(s)&&Mn(r,s)}else if(ft(i))Mn(r,i.bind(t));else if(En(i))if(gt(i))i.forEach(s=>QT(s,e,t,n));else{const s=ft(i.handler)?i.handler.bind(t):e[i.handler];ft(s)&&Mn(r,s,i)}}function Cx(i){const e=i.type,{mixins:t,extends:n}=e,{mixins:r,optionsCache:s,config:{optionMergeStrategies:o}}=i.appContext,a=s.get(e);let l;return a?l=a:!r.length&&!t&&!n?l=e:(l={},r.length&&r.forEach(c=>um(l,c,o,!0)),um(l,e,o)),En(e)&&s.set(e,l),l}function um(i,e,t,n=!1){const{mixins:r,extends:s}=e;s&&um(i,s,t,!0),r&&r.forEach(o=>um(i,o,t,!0));for(const o in e)if(!(n&&o==="expose")){const a=IL[o]||t&&t[o];i[o]=a?a(i[o],e[o]):e[o]}return i}const IL={data:YS,props:jS,emits:jS,methods:Vu,computed:Vu,beforeCreate:ci,created:ci,beforeMount:ci,mounted:ci,beforeUpdate:ci,updated:ci,beforeDestroy:ci,beforeUnmount:ci,destroyed:ci,unmounted:ci,activated:ci,deactivated:ci,errorCaptured:ci,serverPrefetch:ci,components:Vu,directives:Vu,watch:FL,provide:YS,inject:LL};function YS(i,e){return e?i?function(){return ri(ft(i)?i.call(this,this):i,ft(e)?e.call(this,this):e)}:e:i}function LL(i,e){return Vu(Dy(i),Dy(e))}function Dy(i){if(gt(i)){const e={};for(let t=0;t<i.length;t++)e[i[t]]=i[t];return e}return i}function ci(i,e){return i?[...new Set([].concat(i,e))]:e}function Vu(i,e){return i?ri(Object.create(null),i,e):e}function jS(i,e){return i?gt(i)&&gt(e)?[...new Set([...i,...e])]:ri(Object.create(null),$S(i),$S(e??{})):e}function FL(i,e){if(!i)return e;if(!e)return i;const t=ri(Object.create(null),i);for(const n in e)t[n]=ci(i[n],e[n]);return t}function eA(){return{app:null,config:{isNativeTag:HI,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let OL=0;function NL(i,e){return function(n,r=null){ft(n)||(n=ri({},n)),r!=null&&!En(r)&&(r=null);const s=eA(),o=new WeakSet;let a=!1;const l=s.app={_uid:OL++,_component:n,_props:r,_container:null,_context:s,_instance:null,version:yA,get config(){return s.config},set config(c){},use(c,...u){return o.has(c)||(c&&ft(c.install)?(o.add(c),c.install(l,...u)):ft(c)&&(o.add(c),c(l,...u))),l},mixin(c){return s.mixins.includes(c)||s.mixins.push(c),l},component(c,u){return u?(s.components[c]=u,l):s.components[c]},directive(c,u){return u?(s.directives[c]=u,l):s.directives[c]},mount(c,u,h){if(!a){const d=Ft(n,r);return d.appContext=s,u&&e?e(d,c):i(d,c,h),a=!0,l._container=c,c.__vue_app__=l,Lx(d.component)||d.component.proxy}},unmount(){a&&(i(null,l._container),delete l._container.__vue_app__)},provide(c,u){return s.provides[c]=u,l},runWithContext(c){Kf=l;try{return c()}finally{Kf=null}}};return l}}let Kf=null;function Ws(i,e){if(Sn){let t=Sn.provides;const n=Sn.parent&&Sn.parent.provides;n===t&&(t=Sn.provides=Object.create(n)),t[i]=e}}function xi(i,e,t=!1){const n=Sn||tr;if(n||Kf){const r=n?n.parent==null?n.vnode.appContext&&n.vnode.appContext.provides:n.parent.provides:Kf._context.provides;if(r&&i in r)return r[i];if(arguments.length>1)return t&&ft(e)?e.call(n&&n.proxy):e}}function Dx(){return!!(Sn||tr||Kf)}function UL(i,e,t,n=!1){const r={},s={};Sy(s,Ig,1),i.propsDefaults=Object.create(null),tA(i,e,r,s);for(const o in i.propsOptions[0])o in r||(r[o]=void 0);t?i.props=n?r:zh(r):i.type.props?i.props=r:i.props=s,i.attrs=s}function kL(i,e,t,n){const{props:r,attrs:s,vnode:{patchFlag:o}}=i,a=Et(r),[l]=i.propsOptions;let c=!1;if((n||o>0)&&!(o&16)){if(o&8){const u=i.vnode.dynamicProps;for(let h=0;h<u.length;h++){let d=u[h];if(Ag(i.emitsOptions,d))continue;const f=e[d];if(l)if(kt(s,d))f!==s[d]&&(s[d]=f,c=!0);else{const p=ds(d);r[p]=Ry(l,a,p,f,i,!1)}else f!==s[d]&&(s[d]=f,c=!0)}}}else{tA(i,e,r,s)&&(c=!0);let u;for(const h in a)(!e||!kt(e,h)&&((u=Eg(h))===h||!kt(e,u)))&&(l?t&&(t[h]!==void 0||t[u]!==void 0)&&(r[h]=Ry(l,a,h,void 0,i,!0)):delete r[h]);if(s!==a)for(const h in s)(!e||!kt(e,h))&&(delete s[h],c=!0)}c&&Vs(i,"set","$attrs")}function tA(i,e,t,n){const[r,s]=i.propsOptions;let o=!1,a;if(e)for(let l in e){if(of(l))continue;const c=e[l];let u;r&&kt(r,u=ds(l))?!s||!s.includes(u)?t[u]=c:(a||(a={}))[u]=c:Ag(i.emitsOptions,l)||(!(l in n)||c!==n[l])&&(n[l]=c,o=!0)}if(s){const l=Et(t),c=a||Zt;for(let u=0;u<s.length;u++){const h=s[u];t[h]=Ry(r,l,h,c[h],i,!kt(c,h))}}return o}function Ry(i,e,t,n,r,s){const o=i[t];if(o!=null){const a=kt(o,"default");if(a&&n===void 0){const l=o.default;if(o.type!==Function&&!o.skipFactory&&ft(l)){const{propsDefaults:c}=r;t in c?n=c[t]:(zc(r),n=c[t]=l.call(null,e),Ya())}else n=l}o[0]&&(s&&!a?n=!1:o[1]&&(n===""||n===Eg(t))&&(n=!0))}return n}function nA(i,e,t=!1){const n=e.propsCache,r=n.get(i);if(r)return r;const s=i.props,o={},a=[];let l=!1;if(!ft(i)){const u=h=>{l=!0;const[d,f]=nA(h,e,!0);ri(o,d),f&&a.push(...f)};!t&&e.mixins.length&&e.mixins.forEach(u),i.extends&&u(i.extends),i.mixins&&i.mixins.forEach(u)}if(!s&&!l)return En(i)&&n.set(i,bc),bc;if(gt(s))for(let u=0;u<s.length;u++){const h=ds(s[u]);KS(h)&&(o[h]=Zt)}else if(s)for(const u in s){const h=ds(u);if(KS(h)){const d=s[u],f=o[h]=gt(d)||ft(d)?{type:d}:ri({},d);if(f){const p=QS(Boolean,f.type),m=QS(String,f.type);f[0]=p>-1,f[1]=m<0||p<m,(p>-1||kt(f,"default"))&&a.push(h)}}}const c=[o,a];return En(i)&&n.set(i,c),c}function KS(i){return i[0]!=="$"}function ZS(i){const e=i&&i.toString().match(/^\s*(function|class) (\w+)/);return e?e[2]:i===null?"null":""}function JS(i,e){return ZS(i)===ZS(e)}function QS(i,e){return gt(e)?e.findIndex(t=>JS(t,i)):ft(e)&&JS(e,i)?0:-1}const iA=i=>i[0]==="_"||i==="$stable",Rx=i=>gt(i)?i.map(mr):[mr(i)],BL=(i,e,t)=>{if(e._n)return e;const n=ul((...r)=>Rx(e(...r)),t);return n._c=!1,n},rA=(i,e,t)=>{const n=i._ctx;for(const r in i){if(iA(r))continue;const s=i[r];if(ft(s))e[r]=BL(r,s,n);else if(s!=null){const o=Rx(s);e[r]=()=>o}}},sA=(i,e)=>{const t=Rx(e);i.slots.default=()=>t},zL=(i,e)=>{if(i.vnode.shapeFlag&32){const t=e._;t?(i.slots=Et(e),Sy(e,"_",t)):rA(e,i.slots={})}else i.slots={},e&&sA(i,e);Sy(i.slots,Ig,1)},HL=(i,e,t)=>{const{vnode:n,slots:r}=i;let s=!0,o=Zt;if(n.shapeFlag&32){const a=e._;a?t&&a===1?s=!1:(ri(r,e),!t&&a===1&&delete r._):(s=!e.$stable,rA(e,r)),o=e}else e&&(sA(i,e),o={default:1});if(s)for(const a in r)!iA(a)&&o[a]==null&&delete r[a]};function fm(i,e,t,n,r=!1){if(gt(i)){i.forEach((d,f)=>fm(d,e&&(gt(e)?e[f]:e),t,n,r));return}if(Mc(n)&&!r)return;const s=n.shapeFlag&4?Lx(n.component)||n.component.proxy:n.el,o=r?null:s,{i:a,r:l}=i,c=e&&e.r,u=a.refs===Zt?a.refs={}:a.refs,h=a.setupState;if(c!=null&&c!==l&&(kn(c)?(u[c]=null,kt(h,c)&&(h[c]=null)):on(c)&&(c.value=null)),ft(l))Yo(l,a,12,[o,u]);else{const d=kn(l),f=on(l);if(d||f){const p=()=>{if(i.f){const m=d?kt(h,l)?h[l]:u[l]:l.value;r?gt(m)&&bx(m,s):gt(m)?m.includes(s)||m.push(s):d?(u[l]=[s],kt(h,l)&&(h[l]=u[l])):(l.value=[s],i.k&&(u[i.k]=l.value))}else d?(u[l]=o,kt(h,l)&&(h[l]=o)):f&&(l.value=o,i.k&&(u[i.k]=o))};o?(p.id=-1,Hn(p,t)):p()}}}let po=!1;const md=i=>/svg/.test(i.namespaceURI)&&i.tagName!=="foreignObject",gd=i=>i.nodeType===8;function VL(i){const{mt:e,p:t,o:{patchProp:n,createText:r,nextSibling:s,parentNode:o,remove:a,insert:l,createComment:c}}=i,u=(y,v)=>{if(!v.hasChildNodes()){t(null,y,v),am(),v._vnode=y;return}po=!1,h(v.firstChild,y,null,null,null),am(),v._vnode=y,po&&console.error("Hydration completed but contains mismatches.")},h=(y,v,w,T,A,C=!1)=>{const M=gd(y)&&y.data==="[",b=()=>m(y,v,w,T,A,M),{type:R,ref:L,shapeFlag:F,patchFlag:H}=v;let W=y.nodeType;v.el=y,H===-2&&(C=!1,v.dynamicChildren=null);let N=null;switch(R){case kc:W!==3?v.children===""?(l(v.el=r(""),o(y),y),N=y):N=b():(y.data!==v.children&&(po=!0,y.data=v.children),N=s(y));break;case Di:x(y)?(N=s(y),_(v.el=y.content.firstChild,y,w)):W!==8||M?N=b():N=s(y);break;case cf:if(M&&(y=s(y),W=y.nodeType),W===1||W===3){N=y;const $=!v.children.length;for(let X=0;X<v.staticCount;X++)$&&(v.children+=N.nodeType===1?N.outerHTML:N.data),X===v.staticCount-1&&(v.anchor=N),N=s(N);return M?s(N):N}else b();break;case Ki:M?N=p(y,v,w,T,A,C):N=b();break;default:if(F&1)(W!==1||v.type.toLowerCase()!==y.tagName.toLowerCase())&&!x(y)?N=b():N=d(y,v,w,T,A,C);else if(F&6){v.slotScopeIds=A;const $=o(y);if(M?N=g(y):gd(y)&&y.data==="teleport start"?N=g(y,y.data,"teleport end"):N=s(y),e(v,$,null,w,T,md($),C),Mc(v)){let X;M?(X=Ft(Ki),X.anchor=N?N.previousSibling:$.lastChild):X=y.nodeType===3?pA(""):Ft("div"),X.el=y,v.component.subTree=X}}else F&64?W!==8?N=b():N=v.type.hydrate(y,v,w,T,A,C,i,f):F&128&&(N=v.type.hydrate(y,v,w,T,md(o(y)),A,C,i,h))}return L!=null&&fm(L,null,T,v),N},d=(y,v,w,T,A,C)=>{C=C||!!v.dynamicChildren;const{type:M,props:b,patchFlag:R,shapeFlag:L,dirs:F,transition:H}=v,W=M==="input"||M==="option";if(W||R!==-1){F&&Jr(v,null,w,"created");let N=!1;if(x(y)){N=lA(T,H)&&w&&w.vnode.props&&w.vnode.props.appear;const X=y.content.firstChild;N&&H.beforeEnter(X),_(X,y,w),v.el=y=X}if(b)if(W||!C||R&48)for(const X in b)(W&&(X.endsWith("value")||X==="indeterminate")||Sg(X)&&!of(X)||X[0]===".")&&n(y,X,null,b[X],!1,void 0,w);else b.onClick&&n(y,"onClick",null,b.onClick,!1,void 0,w);let $;if(($=b&&b.onVnodeBeforeMount)&&Ti($,w,v),F&&Jr(v,null,w,"beforeMount"),(($=b&&b.onVnodeMounted)||F||N)&&VT(()=>{$&&Ti($,w,v),N&&H.enter(y),F&&Jr(v,null,w,"mounted")},T),L&16&&!(b&&(b.innerHTML||b.textContent))){let X=f(y.firstChild,v,y,w,T,A,C);for(;X;){po=!0;const Z=X;X=X.nextSibling,a(Z)}}else L&8&&y.textContent!==v.children&&(po=!0,y.textContent=v.children)}return y.nextSibling},f=(y,v,w,T,A,C,M)=>{M=M||!!v.dynamicChildren;const b=v.children,R=b.length;for(let L=0;L<R;L++){const F=M?b[L]:b[L]=mr(b[L]);if(y)y=h(y,F,T,A,C,M);else{if(F.type===kc&&!F.children)continue;po=!0,t(null,F,w,null,T,A,md(w),C)}}return y},p=(y,v,w,T,A,C)=>{const{slotScopeIds:M}=v;M&&(A=A?A.concat(M):M);const b=o(y),R=f(s(y),v,b,w,T,A,C);return R&&gd(R)&&R.data==="]"?s(v.anchor=R):(po=!0,l(v.anchor=c("]"),b,R),R)},m=(y,v,w,T,A,C)=>{if(po=!0,v.el=null,C){const R=g(y);for(;;){const L=s(y);if(L&&L!==R)a(L);else break}}const M=s(y),b=o(y);return a(y),t(null,v,b,M,w,T,md(b),A),M},g=(y,v="[",w="]")=>{let T=0;for(;y;)if(y=s(y),y&&gd(y)&&(y.data===v&&T++,y.data===w)){if(T===0)return s(y);T--}return y},_=(y,v,w)=>{const T=v.parentNode;T&&T.replaceChild(y,v);let A=w;for(;A;)A.vnode.el===v&&(A.vnode.el=A.subTree.el=y),A=A.parent},x=y=>y.nodeType===1&&y.tagName.toLowerCase()==="template";return[u,h]}const Hn=VT;function oA(i){return aA(i)}function GL(i){return aA(i,VL)}function aA(i,e){const t=wy();t.__VUE__=!0;const{insert:n,remove:r,patchProp:s,createElement:o,createText:a,createComment:l,setText:c,setElementText:u,parentNode:h,nextSibling:d,setScopeId:f=Gs,insertStaticContent:p}=i,m=(E,P,O,V=null,q=null,U=null,se=!1,G=null,D=!!P.dynamicChildren)=>{if(E===P)return;E&&!Or(E,P)&&(V=Y(E),me(E,q,U,!0),E=null),P.patchFlag===-2&&(D=!1,P.dynamicChildren=null);const{type:S,ref:k,shapeFlag:K}=P;switch(S){case kc:g(E,P,O,V);break;case Di:_(E,P,O,V);break;case cf:E==null&&x(P,O,V,se);break;case Ki:L(E,P,O,V,q,U,se,G,D);break;default:K&1?w(E,P,O,V,q,U,se,G,D):K&6?F(E,P,O,V,q,U,se,G,D):(K&64||K&128)&&S.process(E,P,O,V,q,U,se,G,D,de)}k!=null&&q&&fm(k,E&&E.ref,U,P||E,!P)},g=(E,P,O,V)=>{if(E==null)n(P.el=a(P.children),O,V);else{const q=P.el=E.el;P.children!==E.children&&c(q,P.children)}},_=(E,P,O,V)=>{E==null?n(P.el=l(P.children||""),O,V):P.el=E.el},x=(E,P,O,V)=>{[E.el,E.anchor]=p(E.children,P,O,V,E.el,E.anchor)},y=({el:E,anchor:P},O,V)=>{let q;for(;E&&E!==P;)q=d(E),n(E,O,V),E=q;n(P,O,V)},v=({el:E,anchor:P})=>{let O;for(;E&&E!==P;)O=d(E),r(E),E=O;r(P)},w=(E,P,O,V,q,U,se,G,D)=>{se=se||P.type==="svg",E==null?T(P,O,V,q,U,se,G,D):M(E,P,q,U,se,G,D)},T=(E,P,O,V,q,U,se,G)=>{let D,S;const{type:k,props:K,shapeFlag:J,transition:ne,dirs:Me}=E;if(D=E.el=o(E.type,U,K&&K.is,K),J&8?u(D,E.children):J&16&&C(E.children,D,null,V,q,U&&k!=="foreignObject",se,G),Me&&Jr(E,null,V,"created"),A(D,E,E.scopeId,se,V),K){for(const we in K)we!=="value"&&!of(we)&&s(D,we,null,K[we],U,E.children,V,q,ye);"value"in K&&s(D,"value",null,K.value),(S=K.onVnodeBeforeMount)&&Ti(S,V,E)}Me&&Jr(E,null,V,"beforeMount");const he=lA(q,ne);he&&ne.beforeEnter(D),n(D,P,O),((S=K&&K.onVnodeMounted)||he||Me)&&Hn(()=>{S&&Ti(S,V,E),he&&ne.enter(D),Me&&Jr(E,null,V,"mounted")},q)},A=(E,P,O,V,q)=>{if(O&&f(E,O),V)for(let U=0;U<V.length;U++)f(E,V[U]);if(q){let U=q.subTree;if(P===U){const se=q.vnode;A(E,se,se.scopeId,se.slotScopeIds,q.parent)}}},C=(E,P,O,V,q,U,se,G,D=0)=>{for(let S=D;S<E.length;S++){const k=E[S]=G?Po(E[S]):mr(E[S]);m(null,k,P,O,V,q,U,se,G)}},M=(E,P,O,V,q,U,se)=>{const G=P.el=E.el;let{patchFlag:D,dynamicChildren:S,dirs:k}=P;D|=E.patchFlag&16;const K=E.props||Zt,J=P.props||Zt;let ne;O&&fa(O,!1),(ne=J.onVnodeBeforeUpdate)&&Ti(ne,O,P,E),k&&Jr(P,E,O,"beforeUpdate"),O&&fa(O,!0);const Me=q&&P.type!=="foreignObject";if(S?b(E.dynamicChildren,S,G,O,V,Me,U):se||X(E,P,G,null,O,V,Me,U,!1),D>0){if(D&16)R(G,P,K,J,O,V,q);else if(D&2&&K.class!==J.class&&s(G,"class",null,J.class,q),D&4&&s(G,"style",K.style,J.style,q),D&8){const he=P.dynamicProps;for(let we=0;we<he.length;we++){const Ie=he[we],ge=K[Ie],Le=J[Ie];(Le!==ge||Ie==="value")&&s(G,Ie,ge,Le,q,E.children,O,V,ye)}}D&1&&E.children!==P.children&&u(G,P.children)}else!se&&S==null&&R(G,P,K,J,O,V,q);((ne=J.onVnodeUpdated)||k)&&Hn(()=>{ne&&Ti(ne,O,P,E),k&&Jr(P,E,O,"updated")},V)},b=(E,P,O,V,q,U,se)=>{for(let G=0;G<P.length;G++){const D=E[G],S=P[G],k=D.el&&(D.type===Ki||!Or(D,S)||D.shapeFlag&70)?h(D.el):O;m(D,S,k,null,V,q,U,se,!0)}},R=(E,P,O,V,q,U,se)=>{if(O!==V){if(O!==Zt)for(const G in O)!of(G)&&!(G in V)&&s(E,G,O[G],null,se,P.children,q,U,ye);for(const G in V){if(of(G))continue;const D=V[G],S=O[G];D!==S&&G!=="value"&&s(E,G,S,D,se,P.children,q,U,ye)}"value"in V&&s(E,"value",O.value,V.value)}},L=(E,P,O,V,q,U,se,G,D)=>{const S=P.el=E?E.el:a(""),k=P.anchor=E?E.anchor:a("");let{patchFlag:K,dynamicChildren:J,slotScopeIds:ne}=P;ne&&(G=G?G.concat(ne):ne),E==null?(n(S,O,V),n(k,O,V),C(P.children,O,k,q,U,se,G,D)):K>0&&K&64&&J&&E.dynamicChildren?(b(E.dynamicChildren,J,O,q,U,se,G),(P.key!=null||q&&P===q.subTree)&&cA(E,P,!0)):X(E,P,O,k,q,U,se,G,D)},F=(E,P,O,V,q,U,se,G,D)=>{P.slotScopeIds=G,E==null?P.shapeFlag&512?q.ctx.activate(P,O,V,se,D):H(P,O,V,q,U,se,D):W(E,P,D)},H=(E,P,O,V,q,U,se)=>{const G=E.component=KL(E,V,q);if(Vh(E)&&(G.ctx.renderer=de),ZL(G),G.asyncDep){if(q&&q.registerDep(G,N),!E.el){const D=G.subTree=Ft(Di);_(null,D,P,O)}return}N(G,E,P,O,q,U,se)},W=(E,P,O)=>{const V=P.component=E.component;if(aL(E,P,O))if(V.asyncDep&&!V.asyncResolved){$(V,P,O);return}else V.next=P,tL(V.update),V.update();else P.el=E.el,V.vnode=P},N=(E,P,O,V,q,U,se)=>{const G=()=>{if(E.isMounted){let{next:k,bu:K,u:J,parent:ne,vnode:Me}=E,he=k,we;fa(E,!1),k?(k.el=Me.el,$(E,k,se)):k=Me,K&&af(K),(we=k.props&&k.props.onVnodeBeforeUpdate)&&Ti(we,ne,k,Me),fa(E,!0);const Ie=N_(E),ge=E.subTree;E.subTree=Ie,m(ge,Ie,h(ge.el),Y(ge),E,q,U),k.el=Ie.el,he===null&&Mx(E,Ie.el),J&&Hn(J,q),(we=k.props&&k.props.onVnodeUpdated)&&Hn(()=>Ti(we,ne,k,Me),q)}else{let k;const{el:K,props:J}=P,{bm:ne,m:Me,parent:he}=E,we=Mc(P);if(fa(E,!1),ne&&af(ne),!we&&(k=J&&J.onVnodeBeforeMount)&&Ti(k,he,P),fa(E,!0),K&&Re){const Ie=()=>{E.subTree=N_(E),Re(K,E.subTree,E,q,null)};we?P.type.__asyncLoader().then(()=>!E.isUnmounted&&Ie()):Ie()}else{const Ie=E.subTree=N_(E);m(null,Ie,O,V,E,q,U),P.el=Ie.el}if(Me&&Hn(Me,q),!we&&(k=J&&J.onVnodeMounted)){const Ie=P;Hn(()=>Ti(k,he,Ie),q)}(P.shapeFlag&256||he&&Mc(he.vnode)&&he.vnode.shapeFlag&256)&&E.a&&Hn(E.a,q),E.isMounted=!0,P=O=V=null}},D=E.effect=new px(G,()=>Tg(S),E.scope),S=E.update=()=>D.run();S.id=E.uid,fa(E,!0),S()},$=(E,P,O)=>{P.component=E;const V=E.vnode.props;E.vnode=P,E.next=null,kL(E,P.props,V,O),HL(E,P.children,O),nu(),zS(E),iu()},X=(E,P,O,V,q,U,se,G,D=!1)=>{const S=E&&E.children,k=E?E.shapeFlag:0,K=P.children,{patchFlag:J,shapeFlag:ne}=P;if(J>0){if(J&128){z(S,K,O,V,q,U,se,G,D);return}else if(J&256){Z(S,K,O,V,q,U,se,G,D);return}}ne&8?(k&16&&ye(S,q,U),K!==S&&u(O,K)):k&16?ne&16?z(S,K,O,V,q,U,se,G,D):ye(S,q,U,!0):(k&8&&u(O,""),ne&16&&C(K,O,V,q,U,se,G,D))},Z=(E,P,O,V,q,U,se,G,D)=>{E=E||bc,P=P||bc;const S=E.length,k=P.length,K=Math.min(S,k);let J;for(J=0;J<K;J++){const ne=P[J]=D?Po(P[J]):mr(P[J]);m(E[J],ne,O,null,q,U,se,G,D)}S>k?ye(E,q,U,!0,!1,K):C(P,O,V,q,U,se,G,D,K)},z=(E,P,O,V,q,U,se,G,D)=>{let S=0;const k=P.length;let K=E.length-1,J=k-1;for(;S<=K&&S<=J;){const ne=E[S],Me=P[S]=D?Po(P[S]):mr(P[S]);if(Or(ne,Me))m(ne,Me,O,null,q,U,se,G,D);else break;S++}for(;S<=K&&S<=J;){const ne=E[K],Me=P[J]=D?Po(P[J]):mr(P[J]);if(Or(ne,Me))m(ne,Me,O,null,q,U,se,G,D);else break;K--,J--}if(S>K){if(S<=J){const ne=J+1,Me=ne<k?P[ne].el:V;for(;S<=J;)m(null,P[S]=D?Po(P[S]):mr(P[S]),O,Me,q,U,se,G,D),S++}}else if(S>J)for(;S<=K;)me(E[S],q,U,!0),S++;else{const ne=S,Me=S,he=new Map;for(S=Me;S<=J;S++){const ze=P[S]=D?Po(P[S]):mr(P[S]);ze.key!=null&&he.set(ze.key,S)}let we,Ie=0;const ge=J-Me+1;let Le=!1,De=0;const Ke=new Array(ge);for(S=0;S<ge;S++)Ke[S]=0;for(S=ne;S<=K;S++){const ze=E[S];if(Ie>=ge){me(ze,q,U,!0);continue}let Ye;if(ze.key!=null)Ye=he.get(ze.key);else for(we=Me;we<=J;we++)if(Ke[we-Me]===0&&Or(ze,P[we])){Ye=we;break}Ye===void 0?me(ze,q,U,!0):(Ke[Ye-Me]=S+1,Ye>=De?De=Ye:Le=!0,m(ze,P[Ye],O,null,q,U,se,G,D),Ie++)}const Ne=Le?WL(Ke):bc;for(we=Ne.length-1,S=ge-1;S>=0;S--){const ze=Me+S,Ye=P[ze],lt=ze+1<k?P[ze+1].el:V;Ke[S]===0?m(null,Ye,O,lt,q,U,se,G,D):Le&&(we<0||S!==Ne[we]?ue(Ye,O,lt,2):we--)}}},ue=(E,P,O,V,q=null)=>{const{el:U,type:se,transition:G,children:D,shapeFlag:S}=E;if(S&6){ue(E.component.subTree,P,O,V);return}if(S&128){E.suspense.move(P,O,V);return}if(S&64){se.move(E,P,O,de);return}if(se===Ki){n(U,P,O);for(let K=0;K<D.length;K++)ue(D[K],P,O,V);n(E.anchor,P,O);return}if(se===cf){y(E,P,O);return}if(V!==2&&S&1&&G)if(V===0)G.beforeEnter(U),n(U,P,O),Hn(()=>G.enter(U),q);else{const{leave:K,delayLeave:J,afterLeave:ne}=G,Me=()=>n(U,P,O),he=()=>{K(U,()=>{Me(),ne&&ne()})};J?J(U,Me,he):he()}else n(U,P,O)},me=(E,P,O,V=!1,q=!1)=>{const{type:U,props:se,ref:G,children:D,dynamicChildren:S,shapeFlag:k,patchFlag:K,dirs:J}=E;if(G!=null&&fm(G,null,O,E,!0),k&256){P.ctx.deactivate(E);return}const ne=k&1&&J,Me=!Mc(E);let he;if(Me&&(he=se&&se.onVnodeBeforeUnmount)&&Ti(he,P,E),k&6)le(E.component,O,V);else{if(k&128){E.suspense.unmount(O,V);return}ne&&Jr(E,null,P,"beforeUnmount"),k&64?E.type.remove(E,P,O,q,de,V):S&&(U!==Ki||K>0&&K&64)?ye(S,P,O,!1,!0):(U===Ki&&K&384||!q&&k&16)&&ye(D,P,O),V&&Ue(E)}(Me&&(he=se&&se.onVnodeUnmounted)||ne)&&Hn(()=>{he&&Ti(he,P,E),ne&&Jr(E,null,P,"unmounted")},O)},Ue=E=>{const{type:P,el:O,anchor:V,transition:q}=E;if(P===Ki){ie(O,V);return}if(P===cf){v(E);return}const U=()=>{r(O),q&&!q.persisted&&q.afterLeave&&q.afterLeave()};if(E.shapeFlag&1&&q&&!q.persisted){const{leave:se,delayLeave:G}=q,D=()=>se(O,U);G?G(E.el,U,D):D()}else U()},ie=(E,P)=>{let O;for(;E!==P;)O=d(E),r(E),E=O;r(P)},le=(E,P,O)=>{const{bum:V,scope:q,update:U,subTree:se,um:G}=E;V&&af(V),q.stop(),U&&(U.active=!1,me(se,E,P,O)),G&&Hn(G,P),Hn(()=>{E.isUnmounted=!0},P),P&&P.pendingBranch&&!P.isUnmounted&&E.asyncDep&&!E.asyncResolved&&E.suspenseId===P.pendingId&&(P.deps--,P.deps===0&&P.resolve())},ye=(E,P,O,V=!1,q=!1,U=0)=>{for(let se=U;se<E.length;se++)me(E[se],P,O,V,q)},Y=E=>E.shapeFlag&6?Y(E.component.subTree):E.shapeFlag&128?E.suspense.next():d(E.anchor||E.el),ae=(E,P,O)=>{E==null?P._vnode&&me(P._vnode,null,null,!0):m(P._vnode||null,E,P,null,null,null,O),zS(),am(),P._vnode=E},de={p:m,um:me,m:ue,r:Ue,mt:H,mc:C,pc:X,pbc:b,n:Y,o:i};let be,Re;return e&&([be,Re]=e(de)),{render:ae,hydrate:be,createApp:NL(ae,be)}}function fa({effect:i,update:e},t){i.allowRecurse=e.allowRecurse=t}function lA(i,e){return(!i||i&&!i.pendingBranch)&&e&&!e.persisted}function cA(i,e,t=!1){const n=i.children,r=e.children;if(gt(n)&&gt(r))for(let s=0;s<n.length;s++){const o=n[s];let a=r[s];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=r[s]=Po(r[s]),a.el=o.el),t||cA(o,a)),a.type===kc&&(a.el=o.el)}}function WL(i){const e=i.slice(),t=[0];let n,r,s,o,a;const l=i.length;for(n=0;n<l;n++){const c=i[n];if(c!==0){if(r=t[t.length-1],i[r]<c){e[n]=r,t.push(n);continue}for(s=0,o=t.length-1;s<o;)a=s+o>>1,i[t[a]]<c?s=a+1:o=a;c<i[t[s]]&&(s>0&&(e[n]=t[s-1]),t[s]=n)}}for(s=t.length,o=t[s-1];s-- >0;)t[s]=o,o=e[o];return t}const XL=i=>i.__isTeleport,Ki=Symbol.for("v-fgt"),kc=Symbol.for("v-txt"),Di=Symbol.for("v-cmt"),cf=Symbol.for("v-stc"),uf=[];let yr=null;function Gn(i=!1){uf.push(yr=i?null:[])}function uA(){uf.pop(),yr=uf[uf.length-1]||null}let Bc=1;function ew(i){Bc+=i}function fA(i){return i.dynamicChildren=Bc>0?yr||bc:null,uA(),Bc>0&&yr&&yr.push(i),i}function ta(i,e,t,n,r,s){return fA(Qt(i,e,t,n,r,s,!0))}function Uo(i,e,t,n,r){return fA(Ft(i,e,t,n,r,!0))}function Zf(i){return i?i.__v_isVNode===!0:!1}function Or(i,e){return i.type===e.type&&i.key===e.key}const Ig="__vInternal",hA=({key:i})=>i??null,kp=({ref:i,ref_key:e,ref_for:t})=>(typeof i=="number"&&(i=""+i),i!=null?kn(i)||on(i)||ft(i)?{i:tr,r:i,k:e,f:!!t}:i:null);function Qt(i,e=null,t=null,n=0,r=null,s=i===Ki?0:1,o=!1,a=!1){const l={__v_isVNode:!0,__v_skip:!0,type:i,props:e,key:e&&hA(e),ref:e&&kp(e),scopeId:Cg,slotScopeIds:null,children:t,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetAnchor:null,staticCount:0,shapeFlag:s,patchFlag:n,dynamicProps:r,dynamicChildren:null,appContext:null,ctx:tr};return a?(Px(l,t),s&128&&i.normalize(l)):t&&(l.shapeFlag|=kn(t)?8:16),Bc>0&&!o&&yr&&(l.patchFlag>0||s&6)&&l.patchFlag!==32&&yr.push(l),l}const Ft=$L;function $L(i,e=null,t=null,n=0,r=null,s=!1){if((!i||i===BT)&&(i=Di),Zf(i)){const a=js(i,e,!0);return t&&Px(a,t),Bc>0&&!s&&yr&&(a.shapeFlag&6?yr[yr.indexOf(i)]=a:yr.push(a)),a.patchFlag|=-2,a}if(e3(i)&&(i=i.__vccOpts),e){e=dA(e);let{class:a,style:l}=e;a&&!kn(a)&&(e.class=Ys(a)),En(l)&&(vT(l)&&!gt(l)&&(l=ri({},l)),e.style=Hh(l))}const o=kn(i)?1:HT(i)?128:XL(i)?64:En(i)?4:ft(i)?2:0;return Qt(i,e,t,n,r,o,s,!0)}function dA(i){return i?vT(i)||Ig in i?ri({},i):i:null}function js(i,e,t=!1){const{props:n,ref:r,patchFlag:s,children:o}=i,a=e?qL(n||{},e):n;return{__v_isVNode:!0,__v_skip:!0,type:i.type,props:a,key:a&&hA(a),ref:e&&e.ref?t&&r?gt(r)?r.concat(kp(e)):[r,kp(e)]:kp(e):r,scopeId:i.scopeId,slotScopeIds:i.slotScopeIds,children:o,target:i.target,targetAnchor:i.targetAnchor,staticCount:i.staticCount,shapeFlag:i.shapeFlag,patchFlag:e&&i.type!==Ki?s===-1?16:s|16:s,dynamicProps:i.dynamicProps,dynamicChildren:i.dynamicChildren,appContext:i.appContext,dirs:i.dirs,transition:i.transition,component:i.component,suspense:i.suspense,ssContent:i.ssContent&&js(i.ssContent),ssFallback:i.ssFallback&&js(i.ssFallback),el:i.el,anchor:i.anchor,ctx:i.ctx,ce:i.ce}}function pA(i=" ",e=0){return Ft(kc,null,i,e)}function w7(i,e){const t=Ft(cf,null,i);return t.staticCount=e,t}function M7(i="",e=!1){return e?(Gn(),Uo(Di,null,i)):Ft(Di,null,i)}function mr(i){return i==null||typeof i=="boolean"?Ft(Di):gt(i)?Ft(Ki,null,i.slice()):typeof i=="object"?Po(i):Ft(kc,null,String(i))}function Po(i){return i.el===null&&i.patchFlag!==-1||i.memo?i:js(i)}function Px(i,e){let t=0;const{shapeFlag:n}=i;if(e==null)e=null;else if(gt(e))t=16;else if(typeof e=="object")if(n&65){const r=e.default;r&&(r._c&&(r._d=!1),Px(i,r()),r._c&&(r._d=!0));return}else{t=32;const r=e._;!r&&!(Ig in e)?e._ctx=tr:r===3&&tr&&(tr.slots._===1?e._=1:(e._=2,i.patchFlag|=1024))}else ft(e)?(e={default:e,_ctx:tr},t=32):(e=String(e),n&64?(t=16,e=[pA(e)]):t=8);i.children=e,i.shapeFlag|=t}function qL(...i){const e={};for(let t=0;t<i.length;t++){const n=i[t];for(const r in n)if(r==="class")e.class!==n.class&&(e.class=Ys([e.class,n.class]));else if(r==="style")e.style=Hh([e.style,n.style]);else if(Sg(r)){const s=e[r],o=n[r];o&&s!==o&&!(gt(s)&&s.includes(o))&&(e[r]=s?[].concat(s,o):o)}else r!==""&&(e[r]=n[r])}return e}function Ti(i,e,t,n=null){Sr(i,e,7,[t,n])}const YL=eA();let jL=0;function KL(i,e,t){const n=i.type,r=(e?e.appContext:i.appContext)||YL,s={uid:jL++,vnode:i,type:n,parent:e,appContext:r,root:null,next:null,subTree:null,effect:null,update:null,scope:new aT(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(r.provides),accessCache:null,renderCache:[],components:null,directives:null,propsOptions:nA(n,r),emitsOptions:UT(n,r),emit:null,emitted:null,propsDefaults:Zt,inheritAttrs:n.inheritAttrs,ctx:Zt,data:Zt,props:Zt,attrs:Zt,slots:Zt,refs:Zt,setupState:Zt,setupContext:null,attrsProxy:null,slotsProxy:null,suspense:t,suspenseId:t?t.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return s.ctx={_:s},s.root=e?e.root:s,s.emit=iL.bind(null,s),i.ce&&i.ce(s),s}let Sn=null;const Ks=()=>Sn||tr;let Ix,Cl,tw="__VUE_INSTANCE_SETTERS__";(Cl=wy()[tw])||(Cl=wy()[tw]=[]),Cl.push(i=>Sn=i),Ix=i=>{Cl.length>1?Cl.forEach(e=>e(i)):Cl[0](i)};const zc=i=>{Ix(i),i.scope.on()},Ya=()=>{Sn&&Sn.scope.off(),Ix(null)};function mA(i){return i.vnode.shapeFlag&4}let Hc=!1;function ZL(i,e=!1){Hc=e;const{props:t,children:n}=i.vnode,r=mA(i);UL(i,t,r,e),zL(i,n);const s=r?JL(i,e):void 0;return Hc=!1,s}function JL(i,e){const t=i.type;i.accessCache=Object.create(null),i.proxy=bg(new Proxy(i.ctx,CL));const{setup:n}=t;if(n){const r=i.setupContext=n.length>1?_A(i):null;zc(i),nu();const s=Yo(n,i,0,[i.props,r]);if(iu(),Ya(),DT(s)){if(s.then(Ya,Ya),e)return s.then(o=>{Py(i,o,e)}).catch(o=>{ru(o,i,0)});i.asyncDep=s}else Py(i,s,e)}else gA(i,e)}function Py(i,e,t){ft(e)?i.type.__ssrInlineRender?i.ssrRender=e:i.render=e:En(e)&&(i.setupState=bT(e)),gA(i,t)}let nw;function gA(i,e,t){const n=i.type;if(!i.render){if(!e&&nw&&!n.render){const r=n.template||Cx(i).template;if(r){const{isCustomElement:s,compilerOptions:o}=i.appContext.config,{delimiters:a,compilerOptions:l}=n,c=ri(ri({isCustomElement:s,delimiters:a},o),l);n.render=nw(r,c)}}i.render=n.render||Gs}{zc(i),nu();try{RL(i)}finally{iu(),Ya()}}}function QL(i){return i.attrsProxy||(i.attrsProxy=new Proxy(i.attrs,{get(e,t){return Oi(i,"get","$attrs"),e[t]}}))}function _A(i){const e=t=>{i.exposed=t||{}};return{get attrs(){return QL(i)},slots:i.slots,emit:i.emit,expose:e}}function Lx(i){if(i.exposed)return i.exposeProxy||(i.exposeProxy=new Proxy(bT(bg(i.exposed)),{get(e,t){if(t in e)return e[t];if(t in lf)return lf[t](i)},has(e,t){return t in e||t in lf}}))}function Iy(i,e=!0){return ft(i)?i.displayName||i.name:i.name||e&&i.__name}function e3(i){return ft(i)&&"__vccOpts"in i}const Ht=(i,e)=>BI(i,e,Hc);function ir(i,e,t){const n=arguments.length;return n===2?En(e)&&!gt(e)?Zf(e)?Ft(i,null,[e]):Ft(i,e):Ft(i,null,e):(n>3?t=Array.prototype.slice.call(arguments,2):n===3&&Zf(t)&&(t=[t]),Ft(i,e,t))}const t3=Symbol.for("v-scx"),n3=()=>xi(t3),yA="3.3.12";function i3(i,e){const t=Object.create(null),n=i.split(",");for(let r=0;r<n.length;r++)t[n[r]]=!0;return r=>!!t[r]}const r3=i=>i.charCodeAt(0)===111&&i.charCodeAt(1)===110&&(i.charCodeAt(2)>122||i.charCodeAt(2)<97),s3=i=>i.startsWith("onUpdate:"),Fx=Object.assign,Lg=Array.isArray,vA=i=>typeof i=="function",Jf=i=>typeof i=="string",o3=i=>i!==null&&typeof i=="object",xA=i=>{const e=Object.create(null);return t=>e[t]||(e[t]=i(t))},a3=/\B([A-Z])/g,bA=xA(i=>i.replace(a3,"-$1").toLowerCase()),l3=xA(i=>i.charAt(0).toUpperCase()+i.slice(1)),c3=i=>{const e=Jf(i)?Number(i):NaN;return isNaN(e)?i:e},u3="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",f3=i3(u3);function SA(i){return!!i||i===""}const h3="http://www.w3.org/2000/svg",ka=typeof document<"u"?document:null,iw=ka&&ka.createElement("template"),d3={insert:(i,e,t)=>{e.insertBefore(i,t||null)},remove:i=>{const e=i.parentNode;e&&e.removeChild(i)},createElement:(i,e,t,n)=>{const r=e?ka.createElementNS(h3,i):ka.createElement(i,t?{is:t}:void 0);return i==="select"&&n&&n.multiple!=null&&r.setAttribute("multiple",n.multiple),r},createText:i=>ka.createTextNode(i),createComment:i=>ka.createComment(i),setText:(i,e)=>{i.nodeValue=e},setElementText:(i,e)=>{i.textContent=e},parentNode:i=>i.parentNode,nextSibling:i=>i.nextSibling,querySelector:i=>ka.querySelector(i),setScopeId(i,e){i.setAttribute(e,"")},insertStaticContent(i,e,t,n,r,s){const o=t?t.previousSibling:e.lastChild;if(r&&(r===s||r.nextSibling))for(;e.insertBefore(r.cloneNode(!0),t),!(r===s||!(r=r.nextSibling)););else{iw.innerHTML=n?`<svg>${i}</svg>`:i;const a=iw.content;if(n){const l=a.firstChild;for(;l.firstChild;)a.appendChild(l.firstChild);a.removeChild(l)}e.insertBefore(a,t)}return[o?o.nextSibling:e.firstChild,t?t.previousSibling:e.lastChild]}},mo="transition",gu="animation",Qf=Symbol("_vtc"),Ox=(i,{slots:e})=>ir(vL,p3(i),e);Ox.displayName="Transition";const wA={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String};Ox.props=Fx({},WT,wA);const ha=(i,e=[])=>{Lg(i)?i.forEach(t=>t(...e)):i&&i(...e)},rw=i=>i?Lg(i)?i.some(e=>e.length>1):i.length>1:!1;function p3(i){const e={};for(const L in i)L in wA||(e[L]=i[L]);if(i.css===!1)return e;const{name:t="v",type:n,duration:r,enterFromClass:s=`${t}-enter-from`,enterActiveClass:o=`${t}-enter-active`,enterToClass:a=`${t}-enter-to`,appearFromClass:l=s,appearActiveClass:c=o,appearToClass:u=a,leaveFromClass:h=`${t}-leave-from`,leaveActiveClass:d=`${t}-leave-active`,leaveToClass:f=`${t}-leave-to`}=i,p=m3(r),m=p&&p[0],g=p&&p[1],{onBeforeEnter:_,onEnter:x,onEnterCancelled:y,onLeave:v,onLeaveCancelled:w,onBeforeAppear:T=_,onAppear:A=x,onAppearCancelled:C=y}=e,M=(L,F,H)=>{da(L,F?u:a),da(L,F?c:o),H&&H()},b=(L,F)=>{L._isLeaving=!1,da(L,h),da(L,f),da(L,d),F&&F()},R=L=>(F,H)=>{const W=L?A:x,N=()=>M(F,L,H);ha(W,[F,N]),sw(()=>{da(F,L?l:s),go(F,L?u:a),rw(W)||ow(F,n,m,N)})};return Fx(e,{onBeforeEnter(L){ha(_,[L]),go(L,s),go(L,o)},onBeforeAppear(L){ha(T,[L]),go(L,l),go(L,c)},onEnter:R(!1),onAppear:R(!0),onLeave(L,F){L._isLeaving=!0;const H=()=>b(L,F);go(L,h),y3(),go(L,d),sw(()=>{L._isLeaving&&(da(L,h),go(L,f),rw(v)||ow(L,n,g,H))}),ha(v,[L,H])},onEnterCancelled(L){M(L,!1),ha(y,[L])},onAppearCancelled(L){M(L,!0),ha(C,[L])},onLeaveCancelled(L){b(L),ha(w,[L])}})}function m3(i){if(i==null)return null;if(o3(i))return[V_(i.enter),V_(i.leave)];{const e=V_(i);return[e,e]}}function V_(i){return c3(i)}function go(i,e){e.split(/\s+/).forEach(t=>t&&i.classList.add(t)),(i[Qf]||(i[Qf]=new Set)).add(e)}function da(i,e){e.split(/\s+/).forEach(n=>n&&i.classList.remove(n));const t=i[Qf];t&&(t.delete(e),t.size||(i[Qf]=void 0))}function sw(i){requestAnimationFrame(()=>{requestAnimationFrame(i)})}let g3=0;function ow(i,e,t,n){const r=i._endId=++g3,s=()=>{r===i._endId&&n()};if(t)return setTimeout(s,t);const{type:o,timeout:a,propCount:l}=_3(i,e);if(!o)return n();const c=o+"end";let u=0;const h=()=>{i.removeEventListener(c,d),s()},d=f=>{f.target===i&&++u>=l&&h()};setTimeout(()=>{u<l&&h()},a+1),i.addEventListener(c,d)}function _3(i,e){const t=window.getComputedStyle(i),n=p=>(t[p]||"").split(", "),r=n(`${mo}Delay`),s=n(`${mo}Duration`),o=aw(r,s),a=n(`${gu}Delay`),l=n(`${gu}Duration`),c=aw(a,l);let u=null,h=0,d=0;e===mo?o>0&&(u=mo,h=o,d=s.length):e===gu?c>0&&(u=gu,h=c,d=l.length):(h=Math.max(o,c),u=h>0?o>c?mo:gu:null,d=u?u===mo?s.length:l.length:0);const f=u===mo&&/\b(transform|all)(,|$)/.test(n(`${mo}Property`).toString());return{type:u,timeout:h,propCount:d,hasTransform:f}}function aw(i,e){for(;i.length<e.length;)i=i.concat(i);return Math.max(...e.map((t,n)=>lw(t)+lw(i[n])))}function lw(i){return i==="auto"?0:Number(i.slice(0,-1).replace(",","."))*1e3}function y3(){return document.body.offsetHeight}function v3(i,e,t){const n=i[Qf];n&&(e=(e?[e,...n]:[...n]).join(" ")),e==null?i.removeAttribute("class"):t?i.setAttribute("class",e):i.className=e}const x3=Symbol("_vod"),b3=Symbol("");function S3(i,e,t){const n=i.style,r=Jf(t);if(t&&!r){if(e&&!Jf(e))for(const s in e)t[s]==null&&Ly(n,s,"");for(const s in t)Ly(n,s,t[s])}else{const s=n.display;if(r){if(e!==t){const o=n[b3];o&&(t+=";"+o),n.cssText=t}}else e&&i.removeAttribute("style");x3 in i&&(n.display=s)}}const cw=/\s*!important$/;function Ly(i,e,t){if(Lg(t))t.forEach(n=>Ly(i,e,n));else if(t==null&&(t=""),e.startsWith("--"))i.setProperty(e,t);else{const n=w3(i,e);cw.test(t)?i.setProperty(bA(n),t.replace(cw,""),"important"):i[n]=t}}const uw=["Webkit","Moz","ms"],G_={};function w3(i,e){const t=G_[e];if(t)return t;let n=ds(e);if(n!=="filter"&&n in i)return G_[e]=n;n=l3(n);for(let r=0;r<uw.length;r++){const s=uw[r]+n;if(s in i)return G_[e]=s}return e}const fw="http://www.w3.org/1999/xlink";function M3(i,e,t,n,r){if(n&&e.startsWith("xlink:"))t==null?i.removeAttributeNS(fw,e.slice(6,e.length)):i.setAttributeNS(fw,e,t);else{const s=f3(e);t==null||s&&!SA(t)?i.removeAttribute(e):i.setAttribute(e,s?"":t)}}function E3(i,e,t,n,r,s,o){if(e==="innerHTML"||e==="textContent"){n&&o(n,r,s),i[e]=t??"";return}const a=i.tagName;if(e==="value"&&a!=="PROGRESS"&&!a.includes("-")){i._value=t;const c=a==="OPTION"?i.getAttribute("value"):i.value,u=t??"";c!==u&&(i.value=u),t==null&&i.removeAttribute(e);return}let l=!1;if(t===""||t==null){const c=typeof i[e];c==="boolean"?t=SA(t):t==null&&c==="string"?(t="",l=!0):c==="number"&&(t=0,l=!0)}try{i[e]=t}catch{}l&&i.removeAttribute(e)}function T3(i,e,t,n){i.addEventListener(e,t,n)}function A3(i,e,t,n){i.removeEventListener(e,t,n)}const hw=Symbol("_vei");function C3(i,e,t,n,r=null){const s=i[hw]||(i[hw]={}),o=s[e];if(n&&o)o.value=n;else{const[a,l]=D3(e);if(n){const c=s[e]=I3(n,r);T3(i,a,c,l)}else o&&(A3(i,a,o,l),s[e]=void 0)}}const dw=/(?:Once|Passive|Capture)$/;function D3(i){let e;if(dw.test(i)){e={};let n;for(;n=i.match(dw);)i=i.slice(0,i.length-n[0].length),e[n[0].toLowerCase()]=!0}return[i[2]===":"?i.slice(3):bA(i.slice(2)),e]}let W_=0;const R3=Promise.resolve(),P3=()=>W_||(R3.then(()=>W_=0),W_=Date.now());function I3(i,e){const t=n=>{if(!n._vts)n._vts=Date.now();else if(n._vts<=t.attached)return;Sr(L3(n,t.value),e,5,[n])};return t.value=i,t.attached=P3(),t}function L3(i,e){if(Lg(e)){const t=i.stopImmediatePropagation;return i.stopImmediatePropagation=()=>{t.call(i),i._stopped=!0},e.map(n=>r=>!r._stopped&&n&&n(r))}else return e}const pw=i=>i.charCodeAt(0)===111&&i.charCodeAt(1)===110&&i.charCodeAt(2)>96&&i.charCodeAt(2)<123,F3=(i,e,t,n,r=!1,s,o,a,l)=>{e==="class"?v3(i,n,r):e==="style"?S3(i,t,n):r3(e)?s3(e)||C3(i,e,t,n,o):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):O3(i,e,n,r))?E3(i,e,n,s,o,a,l):(e==="true-value"?i._trueValue=n:e==="false-value"&&(i._falseValue=n),M3(i,e,n,r))};function O3(i,e,t,n){if(n)return!!(e==="innerHTML"||e==="textContent"||e in i&&pw(e)&&vA(t));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="form"||e==="list"&&i.tagName==="INPUT"||e==="type"&&i.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const r=i.tagName;if(r==="IMG"||r==="VIDEO"||r==="CANVAS"||r==="SOURCE")return!1}return pw(e)&&Jf(t)?!1:e in i}const N3=["ctrl","shift","alt","meta"],U3={stop:i=>i.stopPropagation(),prevent:i=>i.preventDefault(),self:i=>i.target!==i.currentTarget,ctrl:i=>!i.ctrlKey,shift:i=>!i.shiftKey,alt:i=>!i.altKey,meta:i=>!i.metaKey,left:i=>"button"in i&&i.button!==0,middle:i=>"button"in i&&i.button!==1,right:i=>"button"in i&&i.button!==2,exact:(i,e)=>N3.some(t=>i[`${t}Key`]&&!e.includes(t))},Fy=(i,e)=>i._withMods||(i._withMods=(t,...n)=>{for(let r=0;r<e.length;r++){const s=U3[e[r]];if(s&&s(t,e))return}return i(t,...n)}),MA=Fx({patchProp:F3},d3);let ff,mw=!1;function k3(){return ff||(ff=oA(MA))}function B3(){return ff=mw?ff:GL(MA),mw=!0,ff}const z3=(...i)=>{const e=k3().createApp(...i),{mount:t}=e;return e.mount=n=>{const r=EA(n);if(!r)return;const s=e._component;!vA(s)&&!s.render&&!s.template&&(s.template=r.innerHTML),r.innerHTML="";const o=t(r,!1,r instanceof SVGElement);return r instanceof Element&&(r.removeAttribute("v-cloak"),r.setAttribute("data-v-app","")),o},e},H3=(...i)=>{const e=B3().createApp(...i),{mount:t}=e;return e.mount=n=>{const r=EA(n);if(r)return t(r,!0,r instanceof SVGElement)},e};function EA(i){return Jf(i)?document.querySelector(i):i}const V3=/#/g,G3=/&/g,W3=/\//g,X3=/=/g,Nx=/\+/g,$3=/%5e/gi,q3=/%60/gi,Y3=/%7c/gi,j3=/%20/gi;function K3(i){return encodeURI(""+i).replace(Y3,"|")}function Oy(i){return K3(typeof i=="string"?i:JSON.stringify(i)).replace(Nx,"%2B").replace(j3,"+").replace(V3,"%23").replace(G3,"%26").replace(q3,"`").replace($3,"^").replace(W3,"%2F")}function X_(i){return Oy(i).replace(X3,"%3D")}function hm(i=""){try{return decodeURIComponent(""+i)}catch{return""+i}}function Z3(i){return hm(i.replace(Nx," "))}function J3(i){return hm(i.replace(Nx," "))}function TA(i=""){const e={};i[0]==="?"&&(i=i.slice(1));for(const t of i.split("&")){const n=t.match(/([^=]+)=?(.*)/)||[];if(n.length<2)continue;const r=Z3(n[1]);if(r==="__proto__"||r==="constructor")continue;const s=J3(n[2]||"");e[r]===void 0?e[r]=s:Array.isArray(e[r])?e[r].push(s):e[r]=[e[r],s]}return e}function Q3(i,e){return(typeof e=="number"||typeof e=="boolean")&&(e=String(e)),e?Array.isArray(e)?e.map(t=>`${X_(i)}=${Oy(t)}`).join("&"):`${X_(i)}=${Oy(e)}`:X_(i)}function eF(i){return Object.keys(i).filter(e=>i[e]!==void 0).map(e=>Q3(e,i[e])).filter(Boolean).join("&")}const tF=/^[\s\w\0+.-]{2,}:([/\\]{1,2})/,nF=/^[\s\w\0+.-]{2,}:([/\\]{2})?/,iF=/^([/\\]\s*){2,}[^/\\]/,rF=/^[\s\0]*(blob|data|javascript|vbscript):$/i,sF=/\/$|\/\?|\/#/,oF=/^\.?\//;function Sl(i,e={}){return typeof e=="boolean"&&(e={acceptRelative:e}),e.strict?tF.test(i):nF.test(i)||(e.acceptRelative?iF.test(i):!1)}function aF(i){return!!i&&rF.test(i)}function Ny(i="",e){return e?sF.test(i):i.endsWith("/")}function Fg(i="",e){if(!e)return(Ny(i)?i.slice(0,-1):i)||"/";if(!Ny(i,!0))return i||"/";let t=i,n="";const r=i.indexOf("#");r>=0&&(t=i.slice(0,r),n=i.slice(r));const[s,...o]=t.split("?");return((s.endsWith("/")?s.slice(0,-1):s)||"/")+(o.length>0?`?${o.join("?")}`:"")+n}function dm(i="",e){if(!e)return i.endsWith("/")?i:i+"/";if(Ny(i,!0))return i||"/";let t=i,n="";const r=i.indexOf("#");if(r>=0&&(t=i.slice(0,r),n=i.slice(r),!t))return n;const[s,...o]=t.split("?");return s+"/"+(o.length>0?`?${o.join("?")}`:"")+n}function lF(i=""){return i.startsWith("/")}function gw(i=""){return lF(i)?i:"/"+i}function cF(i,e){if(CA(e)||Sl(i))return i;const t=Fg(e);return i.startsWith(t)?i:ou(t,i)}function _w(i,e){if(CA(e))return i;const t=Fg(e);if(!i.startsWith(t))return i;const n=i.slice(t.length);return n[0]==="/"?n:"/"+n}function AA(i,e){const t=Wh(i),n={...TA(t.search),...e};return t.search=eF(n),hF(t)}function CA(i){return!i||i==="/"}function uF(i){return i&&i!=="/"}function ou(i,...e){let t=i||"";for(const n of e.filter(r=>uF(r)))if(t){const r=n.replace(oF,"");t=dm(t)+r}else t=n;return t}function fF(i,e,t={}){return t.trailingSlash||(i=dm(i),e=dm(e)),t.leadingSlash||(i=gw(i),e=gw(e)),t.encoding||(i=hm(i),e=hm(e)),i===e}const DA=Symbol.for("ufo:protocolRelative");function Wh(i="",e){const t=i.match(/^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i);if(t){const[,h,d=""]=t;return{protocol:h.toLowerCase(),pathname:d,href:h+d,auth:"",host:"",search:"",hash:""}}if(!Sl(i,{acceptRelative:!0}))return e?Wh(e+i):yw(i);const[,n="",r,s=""]=i.replace(/\\/g,"/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/)||[];let[,o="",a=""]=s.match(/([^#/?]*)(.*)?/)||[];n==="file:"&&(a=a.replace(/\/(?=[A-Za-z]:)/,""));const{pathname:l,search:c,hash:u}=yw(a);return{protocol:n.toLowerCase(),auth:r?r.slice(0,Math.max(0,r.length-1)):"",host:o,pathname:l,search:c,hash:u,[DA]:!n}}function yw(i=""){const[e="",t="",n=""]=(i.match(/([^#?]*)(\?[^#]*)?(#.*)?/)||[]).splice(1);return{pathname:e,search:t,hash:n}}function hF(i){const e=i.pathname||"",t=i.search?(i.search.startsWith("?")?"":"?")+i.search:"",n=i.hash||"",r=i.auth?i.auth+"@":"",s=i.host||"";return(i.protocol||i[DA]?(i.protocol||"")+"//":"")+r+s+e+t+n}const dF=()=>{var i;return((i=window==null?void 0:window.__NUXT__)==null?void 0:i.config)||{}},pm=dF().app,pF=()=>pm.baseURL,mF=()=>pm.buildAssetsDir,Ux=(...i)=>ou(RA(),mF(),...i),RA=(...i)=>{const e=pm.cdnURL||pm.baseURL;return i.length?ou(e,...i):e};globalThis.__buildAssetsURL=Ux,globalThis.__publicAssetsURL=RA;const gF=/"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/,_F=/"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/,yF=/^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;function vF(i,e){if(i==="__proto__"||i==="constructor"&&e&&typeof e=="object"&&"prototype"in e){xF(i);return}return e}function xF(i){console.warn(`[destr] Dropping "${i}" key to prevent prototype pollution.`)}function mm(i,e={}){if(typeof i!="string")return i;const t=i.trim();if(i[0]==='"'&&i.endsWith('"')&&!i.includes("\\"))return t.slice(1,-1);if(t.length<=9){const n=t.toLowerCase();if(n==="true")return!0;if(n==="false")return!1;if(n==="undefined")return;if(n==="null")return null;if(n==="nan")return Number.NaN;if(n==="infinity")return Number.POSITIVE_INFINITY;if(n==="-infinity")return Number.NEGATIVE_INFINITY}if(!yF.test(i)){if(e.strict)throw new SyntaxError("[destr] Invalid JSON");return i}try{if(gF.test(i)||_F.test(i)){if(e.strict)throw new Error("[destr] Possible prototype pollution");return JSON.parse(i,vF)}return JSON.parse(i)}catch(n){if(e.strict)throw n;return i}}class bF extends Error{constructor(e,t){super(e,t),this.name="FetchError",t!=null&&t.cause&&!this.cause&&(this.cause=t.cause)}}function SF(i){var l,c,u,h,d;const e=((l=i.error)==null?void 0:l.message)||((c=i.error)==null?void 0:c.toString())||"",t=((u=i.request)==null?void 0:u.method)||((h=i.options)==null?void 0:h.method)||"GET",n=((d=i.request)==null?void 0:d.url)||String(i.request)||"/",r=`[${t}] ${JSON.stringify(n)}`,s=i.response?`${i.response.status} ${i.response.statusText}`:"<no response>",o=`${r}: ${s}${e?` ${e}`:""}`,a=new bF(o,i.error?{cause:i.error}:void 0);for(const f of["request","options","response"])Object.defineProperty(a,f,{get(){return i[f]}});for(const[f,p]of[["data","_data"],["status","status"],["statusCode","status"],["statusText","statusText"],["statusMessage","statusText"]])Object.defineProperty(a,f,{get(){return i.response&&i.response[p]}});return a}const wF=new Set(Object.freeze(["PATCH","POST","PUT","DELETE"]));function vw(i="GET"){return wF.has(i.toUpperCase())}function MF(i){if(i===void 0)return!1;const e=typeof i;return e==="string"||e==="number"||e==="boolean"||e===null?!0:e!=="object"?!1:Array.isArray(i)?!0:i.buffer?!1:i.constructor&&i.constructor.name==="Object"||typeof i.toJSON=="function"}const EF=new Set(["image/svg","application/xml","application/xhtml","application/html"]),TF=/^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;function AF(i=""){if(!i)return"json";const e=i.split(";").shift()||"";return TF.test(e)?"json":EF.has(e)||e.startsWith("text/")?"text":"blob"}function CF(i,e,t=globalThis.Headers){const n={...e,...i};if(e!=null&&e.params&&(i!=null&&i.params)&&(n.params={...e==null?void 0:e.params,...i==null?void 0:i.params}),e!=null&&e.query&&(i!=null&&i.query)&&(n.query={...e==null?void 0:e.query,...i==null?void 0:i.query}),e!=null&&e.headers&&(i!=null&&i.headers)){n.headers=new t((e==null?void 0:e.headers)||{});for(const[r,s]of new t((i==null?void 0:i.headers)||{}))n.headers.set(r,s)}return n}const DF=new Set([408,409,425,429,500,502,503,504]),RF=new Set([101,204,205,304]);function PA(i={}){const{fetch:e=globalThis.fetch,Headers:t=globalThis.Headers,AbortController:n=globalThis.AbortController}=i;async function r(a){const l=a.error&&a.error.name==="AbortError"&&!a.options.timeout||!1;if(a.options.retry!==!1&&!l){let u;typeof a.options.retry=="number"?u=a.options.retry:u=vw(a.options.method)?0:1;const h=a.response&&a.response.status||500;if(u>0&&(Array.isArray(a.options.retryStatusCodes)?a.options.retryStatusCodes.includes(h):DF.has(h))){const d=a.options.retryDelay||0;return d>0&&await new Promise(f=>setTimeout(f,d)),s(a.request,{...a.options,retry:u-1})}}const c=SF(a);throw Error.captureStackTrace&&Error.captureStackTrace(c,s),c}const s=async function(l,c={}){var f;const u={request:l,options:CF(c,i.defaults,t),response:void 0,error:void 0};u.options.method=(f=u.options.method)==null?void 0:f.toUpperCase(),u.options.onRequest&&await u.options.onRequest(u),typeof u.request=="string"&&(u.options.baseURL&&(u.request=cF(u.request,u.options.baseURL)),(u.options.query||u.options.params)&&(u.request=AA(u.request,{...u.options.params,...u.options.query}))),u.options.body&&vw(u.options.method)&&(MF(u.options.body)?(u.options.body=typeof u.options.body=="string"?u.options.body:JSON.stringify(u.options.body),u.options.headers=new t(u.options.headers||{}),u.options.headers.has("content-type")||u.options.headers.set("content-type","application/json"),u.options.headers.has("accept")||u.options.headers.set("accept","application/json")):("pipeTo"in u.options.body&&typeof u.options.body.pipeTo=="function"||typeof u.options.body.pipe=="function")&&("duplex"in u.options||(u.options.duplex="half")));let h;if(!u.options.signal&&u.options.timeout){const p=new n;h=setTimeout(()=>p.abort(),u.options.timeout),u.options.signal=p.signal}try{u.response=await e(u.request,u.options)}catch(p){return u.error=p,u.options.onRequestError&&await u.options.onRequestError(u),await r(u)}finally{h&&clearTimeout(h)}if(u.response.body&&!RF.has(u.response.status)&&u.options.method!=="HEAD"){const p=(u.options.parseResponse?"json":u.options.responseType)||AF(u.response.headers.get("content-type")||"");switch(p){case"json":{const m=await u.response.text(),g=u.options.parseResponse||mm;u.response._data=g(m);break}case"stream":{u.response._data=u.response.body;break}default:u.response._data=await u.response[p]()}}return u.options.onResponse&&await u.options.onResponse(u),!u.options.ignoreResponseError&&u.response.status>=400&&u.response.status<600?(u.options.onResponseError&&await u.options.onResponseError(u),await r(u)):u.response},o=async function(l,c){return(await s(l,c))._data};return o.raw=s,o.native=(...a)=>e(...a),o.create=(a={})=>PA({...i,defaults:{...i.defaults,...a}}),o}const kx=function(){if(typeof globalThis<"u")return globalThis;if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("unable to locate global object")}(),PF=kx.fetch||(()=>Promise.reject(new Error("[ofetch] global.fetch is not supported!"))),IF=kx.Headers,LF=kx.AbortController,FF=PA({fetch:PF,Headers:IF,AbortController:LF}),OF=FF;globalThis.$fetch||(globalThis.$fetch=OF.create({baseURL:pF()}));function Uy(i,e={},t){for(const n in i){const r=i[n],s=t?`${t}:${n}`:n;typeof r=="object"&&r!==null?Uy(r,e,s):typeof r=="function"&&(e[s]=r)}return e}const NF={run:i=>i()},UF=()=>NF,IA=typeof console.createTask<"u"?console.createTask:UF;function kF(i,e){const t=e.shift(),n=IA(t);return i.reduce((r,s)=>r.then(()=>n.run(()=>s(...e))),Promise.resolve())}function BF(i,e){const t=e.shift(),n=IA(t);return Promise.all(i.map(r=>n.run(()=>r(...e))))}function $_(i,e){for(const t of[...i])t(e)}class zF{constructor(){this._hooks={},this._before=void 0,this._after=void 0,this._deprecatedMessages=void 0,this._deprecatedHooks={},this.hook=this.hook.bind(this),this.callHook=this.callHook.bind(this),this.callHookWith=this.callHookWith.bind(this)}hook(e,t,n={}){if(!e||typeof t!="function")return()=>{};const r=e;let s;for(;this._deprecatedHooks[e];)s=this._deprecatedHooks[e],e=s.to;if(s&&!n.allowDeprecated){let o=s.message;o||(o=`${r} hook has been deprecated`+(s.to?`, please use ${s.to}`:"")),this._deprecatedMessages||(this._deprecatedMessages=new Set),this._deprecatedMessages.has(o)||(console.warn(o),this._deprecatedMessages.add(o))}if(!t.name)try{Object.defineProperty(t,"name",{get:()=>"_"+e.replace(/\W+/g,"_")+"_hook_cb",configurable:!0})}catch{}return this._hooks[e]=this._hooks[e]||[],this._hooks[e].push(t),()=>{t&&(this.removeHook(e,t),t=void 0)}}hookOnce(e,t){let n,r=(...s)=>(typeof n=="function"&&n(),n=void 0,r=void 0,t(...s));return n=this.hook(e,r),n}removeHook(e,t){if(this._hooks[e]){const n=this._hooks[e].indexOf(t);n!==-1&&this._hooks[e].splice(n,1),this._hooks[e].length===0&&delete this._hooks[e]}}deprecateHook(e,t){this._deprecatedHooks[e]=typeof t=="string"?{to:t}:t;const n=this._hooks[e]||[];delete this._hooks[e];for(const r of n)this.hook(e,r)}deprecateHooks(e){Object.assign(this._deprecatedHooks,e);for(const t in e)this.deprecateHook(t,e[t])}addHooks(e){const t=Uy(e),n=Object.keys(t).map(r=>this.hook(r,t[r]));return()=>{for(const r of n.splice(0,n.length))r()}}removeHooks(e){const t=Uy(e);for(const n in t)this.removeHook(n,t[n])}removeAllHooks(){for(const e in this._hooks)delete this._hooks[e]}callHook(e,...t){return t.unshift(e),this.callHookWith(kF,e,...t)}callHookParallel(e,...t){return t.unshift(e),this.callHookWith(BF,e,...t)}callHookWith(e,t,...n){const r=this._before||this._after?{name:t,args:n,context:{}}:void 0;this._before&&$_(this._before,r);const s=e(t in this._hooks?[...this._hooks[t]]:[],n);return s instanceof Promise?s.finally(()=>{this._after&&r&&$_(this._after,r)}):(this._after&&r&&$_(this._after,r),s)}beforeEach(e){return this._before=this._before||[],this._before.push(e),()=>{if(this._before!==void 0){const t=this._before.indexOf(e);t!==-1&&this._before.splice(t,1)}}}afterEach(e){return this._after=this._after||[],this._after.push(e),()=>{if(this._after!==void 0){const t=this._after.indexOf(e);t!==-1&&this._after.splice(t,1)}}}}function LA(){return new zF}function HF(i={}){let e,t=!1;const n=o=>{if(e&&e!==o)throw new Error("Context conflict")};let r;if(i.asyncContext){const o=i.AsyncLocalStorage||globalThis.AsyncLocalStorage;o?r=new o:console.warn("[unctx] `AsyncLocalStorage` is not provided.")}const s=()=>{if(r&&e===void 0){const o=r.getStore();if(o!==void 0)return o}return e};return{use:()=>{const o=s();if(o===void 0)throw new Error("Context is not available");return o},tryUse:()=>s(),set:(o,a)=>{a||n(o),e=o,t=!0},unset:()=>{e=void 0,t=!1},call:(o,a)=>{n(o),e=o;try{return r?r.run(o,a):a()}finally{t||(e=void 0)}},async callAsync(o,a){e=o;const l=()=>{e=o},c=()=>e===o?l:void 0;ky.add(c);try{const u=r?r.run(o,a):a();return t||(e=void 0),await u}finally{ky.delete(c)}}}}function VF(i={}){const e={};return{get(t,n={}){return e[t]||(e[t]=HF({...i,...n})),e[t],e[t]}}}const gm=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof global<"u"?global:typeof window<"u"?window:{},xw="__unctx__",GF=gm[xw]||(gm[xw]=VF()),WF=(i,e={})=>GF.get(i,e),bw="__unctx_async_handlers__",ky=gm[bw]||(gm[bw]=new Set);function eh(i){const e=[];for(const r of ky){const s=r();s&&e.push(s)}const t=()=>{for(const r of e)r()};let n=i();return n&&typeof n=="object"&&"catch"in n&&(n=n.catch(r=>{throw t(),r})),[n,t]}const FA=WF("nuxt-app",{asyncContext:!1}),XF="__nuxt_plugin";function $F(i){let e=0;const t={_scope:fx(),provide:void 0,globalName:"nuxt",versions:{get nuxt(){return"3.9.0"},get vue(){return t.vueApp.version}},payload:or({data:{},state:{},once:new Set,_errors:{},...window.__NUXT__??{}}),static:{data:{}},runWithContext:r=>t._scope.run(()=>jF(t,r)),isHydrating:!0,deferHydration(){if(!t.isHydrating)return()=>{};e++;let r=!1;return()=>{if(!r&&(r=!0,e--,e===0))return t.isHydrating=!1,t.callHook("app:suspense:resolve")}},_asyncDataPromises:{},_asyncData:{},_payloadRevivers:{},...i};t.hooks=LA(),t.hook=t.hooks.hook,t.callHook=t.hooks.callHook,t.provide=(r,s)=>{const o="$"+r;_d(t,o,s),_d(t.vueApp.config.globalProperties,o,s)},_d(t.vueApp,"$nuxt",t),_d(t.vueApp.config.globalProperties,"$nuxt",t);{window.addEventListener("nuxt.preloadError",s=>{t.callHook("app:chunkError",{error:s.payload})}),window.useNuxtApp=window.useNuxtApp||Vt;const r=t.hook("app:error",(...s)=>{console.error("[nuxt] error caught during app initialization",...s)});t.hook("app:mounted",r)}const n=or(t.payload.config);return t.provide("config",n),t}async function qF(i,e){if(e.hooks&&i.hooks.addHooks(e.hooks),typeof e=="function"){const{provide:t}=await i.runWithContext(()=>e(i))||{};if(t&&typeof t=="object")for(const n in t)i.provide(n,t[n])}}async function YF(i,e){const t=[],n=[],r=[],s=[];let o=0;async function a(l){if(l.dependsOn&&!l.dependsOn.every(c=>t.includes(c)))n.push([new Set(l.dependsOn),l]);else{const c=qF(i,l).then(async()=>{l._name&&(t.push(l._name),await Promise.all(n.map(async([u,h])=>{u.has(l._name)&&(u.delete(l._name),u.size===0&&(o++,await a(h)))})))});l.parallel?r.push(c.catch(u=>s.push(u))):await c}}for(const l of e)await a(l);if(await Promise.all(r),o)for(let l=0;l<o;l++)await Promise.all(r);if(s.length)throw s[0]}function gs(i){if(typeof i=="function")return i;const e=i._name||i.name;return delete i.name,Object.assign(i.setup||(()=>{}),i,{[XF]:!0,_name:e})}function jF(i,e,t){const n=()=>e();return FA.set(i),i.vueApp.runWithContext(n)}function Vt(){var e;let i;if(Dx()&&(i=(e=Ks())==null?void 0:e.appContext.app.$nuxt),i=i||FA.tryUse(),!i)throw new Error("[nuxt] instance unavailable");return i}function Og(){return Vt().$config}function _d(i,e,t){Object.defineProperty(i,e,{get:()=>t})}const KF="modulepreload",ZF=function(i,e){return i[0]==="."?new URL(i,e).href:i},Sw={},JF=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){const s=document.getElementsByTagName("link");r=Promise.all(t.map(o=>{if(o=ZF(o,n),o in Sw)return;Sw[o]=!0;const a=o.endsWith(".css"),l=a?'[rel="stylesheet"]':"";if(!!n)for(let h=s.length-1;h>=0;h--){const d=s[h];if(d.href===o&&(!a||d.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${o}"]${l}`))return;const u=document.createElement("link");if(u.rel=a?"stylesheet":KF,a||(u.as="script",u.crossOrigin=""),u.href=o,document.head.appendChild(u),a)return new Promise((h,d)=>{u.addEventListener("load",h),u.addEventListener("error",()=>d(new Error(`Unable to preload CSS for ${o}`)))})}))}return r.then(()=>e()).catch(s=>{const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=s,window.dispatchEvent(o),!o.defaultPrevented)throw s})},Io=(...i)=>JF(...i).catch(e=>{const t=new Event("nuxt.preloadError");throw t.payload=e,window.dispatchEvent(t),e}),QF=-1,eO=-2,tO=-3,nO=-4,iO=-5,rO=-6;function sO(i,e){return oO(JSON.parse(i),e)}function oO(i,e){if(typeof i=="number")return r(i,!0);if(!Array.isArray(i)||i.length===0)throw new Error("Invalid input");const t=i,n=Array(t.length);function r(s,o=!1){if(s===QF)return;if(s===tO)return NaN;if(s===nO)return 1/0;if(s===iO)return-1/0;if(s===rO)return-0;if(o)throw new Error("Invalid input");if(s in n)return n[s];const a=t[s];if(!a||typeof a!="object")n[s]=a;else if(Array.isArray(a))if(typeof a[0]=="string"){const l=a[0],c=e==null?void 0:e[l];if(c)return n[s]=c(r(a[1]));switch(l){case"Date":n[s]=new Date(a[1]);break;case"Set":const u=new Set;n[s]=u;for(let f=1;f<a.length;f+=1)u.add(r(a[f]));break;case"Map":const h=new Map;n[s]=h;for(let f=1;f<a.length;f+=2)h.set(r(a[f]),r(a[f+1]));break;case"RegExp":n[s]=new RegExp(a[1],a[2]);break;case"Object":n[s]=Object(a[1]);break;case"BigInt":n[s]=BigInt(a[1]);break;case"null":const d=Object.create(null);n[s]=d;for(let f=1;f<a.length;f+=2)d[a[f]]=r(a[f+1]);break;default:throw new Error(`Unknown type ${l}`)}}else{const l=new Array(a.length);n[s]=l;for(let c=0;c<a.length;c+=1){const u=a[c];u!==eO&&(l[c]=r(u))}}else{const l={};n[s]=l;for(const c in a){const u=a[c];l[c]=r(u)}}return n[s]}return r(0)}const aO=new Set(["title","titleTemplate","script","style","noscript"]),Bp=new Set(["base","meta","link","style","script","noscript"]),lO=new Set(["title","titleTemplate","templateParams","base","htmlAttrs","bodyAttrs","meta","link","style","script","noscript"]),cO=new Set(["base","title","titleTemplate","bodyAttrs","htmlAttrs","templateParams"]),OA=new Set(["tagPosition","tagPriority","tagDuplicateStrategy","children","innerHTML","textContent","processTemplateParams"]),uO=typeof window<"u";function _m(i){let e=9;for(let t=0;t<i.length;)e=Math.imul(e^i.charCodeAt(t++),9**9);return((e^e>>>9)+65536).toString(16).substring(1,8).toLowerCase()}function ww(i){if(i._h)return i._h;if(i._d)return _m(i._d);let e=`${i.tag}:${i.textContent||i.innerHTML||""}:`;for(const t in i.props)e+=`${t}:${i.props[t]},`;return _m(e)}const fO=["name","property","http-equiv"];function NA(i){const{props:e,tag:t}=i;if(cO.has(t))return t;if(t==="link"&&e.rel==="canonical")return"canonical";if(e.charset)return"charset";if(e.id)return`${t}:id:${e.id}`;for(const n of fO)if(e[n]!==void 0)return`${t}:${n}:${e[n]}`;return!1}function Mw(i,e){return i==null?e||null:typeof i=="function"?i(e):i}function UA(i,e){const t=[],n=e.resolveKeyData||(s=>s.key),r=e.resolveValueData||(s=>s.value);for(const[s,o]of Object.entries(i))t.push(...(Array.isArray(o)?o:[o]).map(a=>{const l={key:s,value:a},c=r(l);return typeof c=="object"?UA(c,e):Array.isArray(c)?c:{[typeof e.key=="function"?e.key(l):e.key]:n(l),[typeof e.value=="function"?e.value(l):e.value]:c}}).flat());return t}function kA(i,e){return Object.entries(i).map(([t,n])=>{if(typeof n=="object"&&(n=kA(n,e)),e.resolve){const r=e.resolve({key:t,value:n});if(typeof r<"u")return r}return typeof n=="number"&&(n=n.toString()),typeof n=="string"&&e.wrapValue&&(n=n.replace(new RegExp(e.wrapValue,"g"),`\\${e.wrapValue}`),n=`${e.wrapValue}${n}${e.wrapValue}`),`${t}${e.keyValueSeparator||""}${n}`}).join(e.entrySeparator||"")}const oi=i=>({keyValue:i,metaKey:"property"}),q_=i=>({keyValue:i}),Bx={appleItunesApp:{unpack:{entrySeparator:", ",resolve({key:i,value:e}){return`${Fs(i)}=${e}`}}},articleExpirationTime:oi("article:expiration_time"),articleModifiedTime:oi("article:modified_time"),articlePublishedTime:oi("article:published_time"),bookReleaseDate:oi("book:release_date"),charset:{metaKey:"charset"},contentSecurityPolicy:{unpack:{entrySeparator:"; ",resolve({key:i,value:e}){return`${Fs(i)} ${e}`}},metaKey:"http-equiv"},contentType:{metaKey:"http-equiv"},defaultStyle:{metaKey:"http-equiv"},fbAppId:oi("fb:app_id"),msapplicationConfig:q_("msapplication-Config"),msapplicationTileColor:q_("msapplication-TileColor"),msapplicationTileImage:q_("msapplication-TileImage"),ogAudioSecureUrl:oi("og:audio:secure_url"),ogAudioUrl:oi("og:audio"),ogImageSecureUrl:oi("og:image:secure_url"),ogImageUrl:oi("og:image"),ogSiteName:oi("og:site_name"),ogVideoSecureUrl:oi("og:video:secure_url"),ogVideoUrl:oi("og:video"),profileFirstName:oi("profile:first_name"),profileLastName:oi("profile:last_name"),profileUsername:oi("profile:username"),refresh:{metaKey:"http-equiv",unpack:{entrySeparator:";",resolve({key:i,value:e}){if(i==="seconds")return`${e}`}}},robots:{unpack:{entrySeparator:", ",resolve({key:i,value:e}){return typeof e=="boolean"?`${Fs(i)}`:`${Fs(i)}:${e}`}}},xUaCompatible:{metaKey:"http-equiv"}},BA=new Set(["og","book","article","profile"]);function zA(i){var n;const e=Fs(i),t=e.indexOf(":");return BA.has(e.substring(0,t))?"property":((n=Bx[i])==null?void 0:n.metaKey)||"name"}function hO(i){var e;return((e=Bx[i])==null?void 0:e.keyValue)||Fs(i)}function Fs(i){const e=i.replace(/([A-Z])/g,"-$1").toLowerCase(),t=e.indexOf("-"),n=e.substring(0,t);return n==="twitter"||BA.has(n)?i.replace(/([A-Z])/g,":$1").toLowerCase():e}function By(i){if(Array.isArray(i))return i.map(t=>By(t));if(typeof i!="object"||Array.isArray(i))return i;const e={};for(const t in i)Object.prototype.hasOwnProperty.call(i,t)&&(e[Fs(t)]=By(i[t]));return e}function dO(i,e){const t=Bx[e];return e==="refresh"?`${i.seconds};url=${i.url}`:kA(By(i),{keyValueSeparator:"=",entrySeparator:", ",resolve({value:n,key:r}){if(n===null)return"";if(typeof n=="boolean")return`${r}`},...t==null?void 0:t.unpack})}const HA=new Set(["og:image","og:video","og:audio","twitter:image"]);function VA(i){const e={};for(const t in i){if(!Object.prototype.hasOwnProperty.call(i,t))continue;const n=i[t];String(n)!=="false"&&t&&(e[t]=n)}return e}function Ew(i,e){const t=VA(e),n=Fs(i),r=zA(n);if(HA.has(n)){const s={};for(const o in t)Object.prototype.hasOwnProperty.call(t,o)&&(s[`${i}${o==="url"?"":`${o[0].toUpperCase()}${o.slice(1)}`}`]=t[o]);return zx(s).sort((o,a)=>{var l,c;return(((l=o[r])==null?void 0:l.length)||0)-(((c=a[r])==null?void 0:c.length)||0)})}return[{[r]:n,...t}]}function zx(i){const e=[],t={};for(const r in i){if(!Object.prototype.hasOwnProperty.call(i,r))continue;const s=i[r];if(!Array.isArray(s)){if(typeof s=="object"&&s){if(HA.has(Fs(r))){e.push(...Ew(r,s));continue}t[r]=VA(s)}else t[r]=s;continue}for(const o of s)e.push(...typeof o=="string"?zx({[r]:o}):Ew(r,o))}const n=UA(t,{key({key:r}){return zA(r)},value({key:r}){return r==="charset"?"charset":"content"},resolveKeyData({key:r}){return hO(r)},resolveValueData({value:r,key:s}){return r===null?"_null":typeof r=="object"?dO(r,s):typeof r=="number"?r.toString():r}});return[...e,...n].map(r=>(r.content==="_null"&&(r.content=null),r))}function pO(i,e){return i instanceof Promise?i.then(e):e(i)}function zy(i,e,t,n){const r=n||WA(typeof e=="object"&&typeof e!="function"&&!(e instanceof Promise)?{...e}:{[i==="script"||i==="noscript"||i==="style"?"innerHTML":"textContent"]:e},i==="templateParams"||i==="titleTemplate");if(r instanceof Promise)return r.then(o=>zy(i,e,t,o));const s={tag:i,props:r};for(const o of OA){const a=s.props[o]!==void 0?s.props[o]:t[o];a!==void 0&&((!(o==="innerHTML"||o==="textContent"||o==="children")||aO.has(s.tag))&&(s[o==="children"?"innerHTML":o]=a),delete s.props[o])}return s.props.body&&(s.tagPosition="bodyClose",delete s.props.body),s.tag==="script"&&typeof s.innerHTML=="object"&&(s.innerHTML=JSON.stringify(s.innerHTML),s.props.type=s.props.type||"application/json"),Array.isArray(s.props.content)?s.props.content.map(o=>({...s,props:{...s.props,content:o}})):s}function mO(i,e){var n;const t=i==="class"?" ":";";return typeof e=="object"&&!Array.isArray(e)&&(e=Object.entries(e).filter(([,r])=>r).map(([r,s])=>i==="style"?`${r}:${s}`:r)),(n=String(Array.isArray(e)?e.join(t):e))==null?void 0:n.split(t).filter(r=>!!r.trim()).join(t)}function GA(i,e,t,n){for(let r=n;r<t.length;r+=1){const s=t[r];if(s==="class"||s==="style"){i[s]=mO(s,i[s]);continue}if(i[s]instanceof Promise)return i[s].then(o=>(i[s]=o,GA(i,e,t,r)));if(!e&&!OA.has(s)){const o=String(i[s]),a=s.startsWith("data-");o==="true"||o===""?i[s]=a?"true":!0:i[s]||(a&&o==="false"?i[s]="false":delete i[s])}}}function WA(i,e=!1){const t=GA(i,e,Object.keys(i),0);return t instanceof Promise?t.then(()=>i):i}const gO=10;function XA(i,e,t){for(let n=t;n<e.length;n+=1){const r=e[n];if(r instanceof Promise)return r.then(s=>(e[n]=s,XA(i,e,n)));Array.isArray(r)?i.push(...r):i.push(r)}}function _O(i){const e=[],t=i.resolvedInput;for(const r in t){if(!Object.prototype.hasOwnProperty.call(t,r))continue;const s=t[r];if(!(s===void 0||!lO.has(r))){if(Array.isArray(s)){for(const o of s)e.push(zy(r,o,i));continue}e.push(zy(r,s,i))}}if(e.length===0)return[];const n=[];return pO(XA(n,e,0),()=>n.map((r,s)=>(r._e=i._i,i.mode&&(r._m=i.mode),r._p=(i._i<<gO)+s,r)))}const Tw={base:-10,title:10},Aw={critical:-80,high:-10,low:20};function ym(i){const e=i.tagPriority;if(typeof e=="number")return e;let t=100;return i.tag==="meta"?i.props["http-equiv"]==="content-security-policy"?t=-30:i.props.charset?t=-20:i.props.name==="viewport"&&(t=-15):i.tag==="link"&&i.props.rel==="preconnect"?t=20:i.tag in Tw&&(t=Tw[i.tag]),e&&e in Aw?t+Aw[e]:t}const yO=[{prefix:"before:",offset:-1},{prefix:"after:",offset:1}],Cw=new Set(["onload","onerror","onabort","onprogress","onloadstart"]),Lo="%separator";function vO(i,e){var n;let t;if(e==="s"||e==="pageTitle")t=i.pageTitle;else if(e.includes(".")){const r=e.indexOf(".");t=(n=i[e.substring(0,r)])==null?void 0:n[e.substring(r+1)]}else t=i[e];return t!==void 0?(t||"").replace(/"/g,'\\"'):void 0}const xO=new RegExp(`${Lo}(?:\\s*${Lo})*`,"g");function Y_(i,e,t){if(typeof i!="string"||!i.includes("%"))return i;let n=i;try{n=decodeURI(i)}catch{}const r=n.match(/%\w+(?:\.\w+)?/g);if(!r)return i;const s=i.includes(Lo);return i=i.replace(/%\w+(?:\.\w+)?/g,o=>{if(o===Lo||!r.includes(o))return o;const a=vO(e,o.slice(1));return a!==void 0?a:o}).trim(),s&&(i.endsWith(Lo)&&(i=i.slice(0,-Lo.length)),i.startsWith(Lo)&&(i=i.slice(Lo.length)),i=i.replace(xO,t).trim()),i}async function $A(i,e={}){var u;const t=e.document||i.resolvedOptions.document;if(!t||!i.dirty)return;const n={shouldRender:!0,tags:[]};if(await i.hooks.callHook("dom:beforeRender",n),!n.shouldRender)return;const r=(await i.resolveTags()).map(h=>({tag:h,id:Bp.has(h.tag)?ww(h):h.tag,shouldRender:!0}));let s=i._dom;if(!s){s={elMap:{htmlAttrs:t.documentElement,bodyAttrs:t.body}};const h=new Set;for(const d of["body","head"]){const f=(u=t[d])==null?void 0:u.children;for(const p of f){const m=p.tagName.toLowerCase();if(!Bp.has(m))continue;const g={tag:m,props:await WA(p.getAttributeNames().reduce((v,w)=>({...v,[w]:p.getAttribute(w)}),{})),innerHTML:p.innerHTML},_=NA(g);let x=_,y=1;for(;x&&h.has(x);)x=`${_}:${y++}`;x&&(g._d=x,h.add(x)),s.elMap[p.getAttribute("data-hid")||ww(g)]=p}}}s.pendingSideEffects={...s.sideEffects},s.sideEffects={};function o(h,d,f){const p=`${h}:${d}`;s.sideEffects[p]=f,delete s.pendingSideEffects[p]}function a({id:h,$el:d,tag:f}){const p=f.tag.endsWith("Attrs");if(s.elMap[h]=d,p||(f.textContent&&f.textContent!==d.textContent&&(d.textContent=f.textContent),f.innerHTML&&f.innerHTML!==d.innerHTML&&(d.innerHTML=f.innerHTML),o(h,"el",()=>{var m;(m=s.elMap[h])==null||m.remove(),delete s.elMap[h]})),f._eventHandlers)for(const m in f._eventHandlers)Object.prototype.hasOwnProperty.call(f._eventHandlers,m)&&d.getAttribute(`data-${m}`)!==""&&((f.tag==="bodyAttrs"?t.defaultView:d).addEventListener(m.substring(2),f._eventHandlers[m].bind(d)),d.setAttribute(`data-${m}`,""));for(const m in f.props){if(!Object.prototype.hasOwnProperty.call(f.props,m))continue;const g=f.props[m],_=`attr:${m}`;if(m==="class"){if(!g)continue;for(const x of g.split(" "))p&&o(h,`${_}:${x}`,()=>d.classList.remove(x)),!d.classList.contains(x)&&d.classList.add(x)}else if(m==="style"){if(!g)continue;for(const x of g.split(";")){const y=x.indexOf(":"),v=x.substring(0,y).trim(),w=x.substring(y+1).trim();o(h,`${_}:${v}`,()=>{d.style.removeProperty(v)}),d.style.setProperty(v,w)}}else d.getAttribute(m)!==g&&d.setAttribute(m,g===!0?"":String(g)),p&&o(h,_,()=>d.removeAttribute(m))}}const l=[],c={bodyClose:void 0,bodyOpen:void 0,head:void 0};for(const h of r){const{tag:d,shouldRender:f,id:p}=h;if(f){if(d.tag==="title"){t.title=d.textContent;continue}h.$el=h.$el||s.elMap[p],h.$el?a(h):Bp.has(d.tag)&&l.push(h)}}for(const h of l){const d=h.tag.tagPosition||"head";h.$el=t.createElement(h.tag.tag),a(h),c[d]=c[d]||t.createDocumentFragment(),c[d].appendChild(h.$el)}for(const h of r)await i.hooks.callHook("dom:renderTag",h,t,o);c.head&&t.head.appendChild(c.head),c.bodyOpen&&t.body.insertBefore(c.bodyOpen,t.body.firstChild),c.bodyClose&&t.body.appendChild(c.bodyClose);for(const h in s.pendingSideEffects)s.pendingSideEffects[h]();i._dom=s,i.dirty=!1,await i.hooks.callHook("dom:rendered",{renders:r})}function bO(i,e={}){const t=e.delayFn||(n=>setTimeout(n,10));return i._domUpdatePromise=i._domUpdatePromise||new Promise(n=>t(()=>$A(i,e).then(()=>{delete i._domUpdatePromise,n()})))}function SO(i){return e=>{var n,r;const t=((r=(n=e.resolvedOptions.document)==null?void 0:n.head.querySelector('script[id="unhead:payload"]'))==null?void 0:r.innerHTML)||!1;return t&&e.push(JSON.parse(t)),{mode:"client",hooks:{"entries:updated":s=>{bO(s,i)}}}}}const wO=new Set(["templateParams","htmlAttrs","bodyAttrs"]),MO={hooks:{"tag:normalise":({tag:i})=>{i.props.hid&&(i.key=i.props.hid,delete i.props.hid),i.props.vmid&&(i.key=i.props.vmid,delete i.props.vmid),i.props.key&&(i.key=i.props.key,delete i.props.key);const t=NA(i)||(i.key?`${i.tag}:${i.key}`:!1);t&&(i._d=t)},"tags:resolve":i=>{const e=Object.create(null);for(const n of i.tags){const r=(n.key?`${n.tag}:${n.key}`:n._d)||n._p,s=e[r];if(s){let a=n==null?void 0:n.tagDuplicateStrategy;if(!a&&wO.has(n.tag)&&(a="merge"),a==="merge"){const l=s.props;l.style&&n.props.style&&(l.style[l.style.length-1]!==";"&&(l.style+=";"),n.props.style=`${l.style} ${n.props.style}`),l.class&&n.props.class?n.props.class=`${l.class} ${n.props.class}`:l.class&&(n.props.class=l.class),e[r].props={...l,...n.props};continue}else if(n._e===s._e){s._duped=s._duped||[],n._d=`${s._d}:${s._duped.length+1}`,s._duped.push(n);continue}else if(ym(n)>ym(s))continue}if(!(n.innerHTML||n.textContent||Object.keys(n.props).length!==0)&&Bp.has(n.tag)){delete e[r];continue}e[r]=n}const t=[];for(const n in e){const r=e[n],s=r._duped;t.push(r),s&&(delete r._duped,t.push(...s))}i.tags=t,i.tags=i.tags.filter(n=>!(n.tag==="meta"&&(n.props.name||n.props.property)&&!n.props.content))}}},EO={mode:"server",hooks:{"tags:resolve":i=>{const e={};let t=!1;for(const n of i.tags)n._m!=="server"||n.tag!=="titleTemplate"&&n.tag!=="templateParams"&&n.tag!=="title"||(e[n.tag]=n.tag==="title"||n.tag==="titleTemplate"?n.textContent:n.props,t=!0);t&&i.tags.push({tag:"script",innerHTML:JSON.stringify(e),props:{id:"unhead:payload",type:"application/json"}})}}},TO=new Set(["script","link","bodyAttrs"]),AO=i=>({hooks:{"tags:resolve":e=>{for(const t of e.tags){if(!TO.has(t.tag))continue;const n=t.props;for(const r in n){if(r[0]!=="o"||r[1]!=="n"||!Object.prototype.hasOwnProperty.call(n,r))continue;const s=n[r];typeof s=="function"&&(i.ssr&&Cw.has(r)?n[r]=`this.dataset.${r}fired = true`:delete n[r],t._eventHandlers=t._eventHandlers||{},t._eventHandlers[r]=s)}i.ssr&&t._eventHandlers&&(t.props.src||t.props.href)&&(t.key=t.key||_m(t.props.src||t.props.href))}},"dom:renderTag":({$el:e,tag:t})=>{var r,s;const n=e==null?void 0:e.dataset;if(n)for(const o in n){if(!o.endsWith("fired"))continue;const a=o.slice(0,-5);Cw.has(a)&&((s=(r=t._eventHandlers)==null?void 0:r[a])==null||s.call(e,new Event(a.substring(2))))}}}}),CO=new Set(["link","style","script","noscript"]),DO={hooks:{"tag:normalise":({tag:i})=>{i.key&&CO.has(i.tag)&&(i.props["data-hid"]=i._h=_m(i.key))}}},RO={hooks:{"tags:resolve":i=>{var e;for(const t of i.tags)if(typeof t.tagPriority=="string")for(const{prefix:n,offset:r}of yO){if(!t.tagPriority.startsWith(n))continue;const s=t.tagPriority.substring(n.length),o=(e=i.tags.find(a=>a._d===s))==null?void 0:e._p;if(o!==void 0){t._p=o+r;break}}i.tags.sort((t,n)=>{const r=ym(t),s=ym(n);return r<s?-1:r>s?1:t._p-n._p})}}},PO={meta:"content",link:"href",htmlAttrs:"lang"},IO=["innerHTML","textContent"],LO=i=>({hooks:{"tags:resolve":e=>{var o;const{tags:t}=e;let n;for(let a=0;a<t.length;a+=1)t[a].tag==="templateParams"&&(n=e.tags.splice(a,1)[0].props,a-=1);const r=n||{},s=r.separator||"|";delete r.separator,r.pageTitle=Y_(r.pageTitle||((o=t.find(a=>a.tag==="title"))==null?void 0:o.textContent)||"",r,s);for(const a of t){if(a.processTemplateParams===!1)continue;const l=PO[a.tag];if(l&&typeof a.props[l]=="string")a.props[l]=Y_(a.props[l],r,s);else if(a.processTemplateParams||a.tag==="titleTemplate"||a.tag==="title")for(const c of IO)typeof a[c]=="string"&&(a[c]=Y_(a[c],r,s))}i._templateParams=r,i._separator=s}}}),FO={hooks:{"tags:resolve":i=>{const{tags:e}=i;let t,n;for(let r=0;r<e.length;r+=1){const s=e[r];s.tag==="title"?t=s:s.tag==="titleTemplate"&&(n=s)}if(n&&t){const r=Mw(n.textContent,t.textContent);r!==null?t.textContent=r||t.textContent:i.tags.splice(i.tags.indexOf(t),1)}else if(n){const r=Mw(n.textContent);r!==null&&(n.textContent=r,n.tag="title",n=void 0)}n&&i.tags.splice(i.tags.indexOf(n),1)}}},OO={hooks:{"tags:afterResolve":i=>{for(const e of i.tags)typeof e.innerHTML=="string"&&(e.innerHTML&&(e.props.type==="application/ld+json"||e.props.type==="application/json")?e.innerHTML=e.innerHTML.replace(/</g,"\\u003C"):e.innerHTML=e.innerHTML.replace(new RegExp(`</${e.tag}`,"g"),`<\\/${e.tag}`))}}};let qA;function NO(i={}){const e=UO(i);return e.use(SO()),qA=e}function Dw(i,e){return!i||i==="server"&&e||i==="client"&&!e}function UO(i={}){const e=LA();e.addHooks(i.hooks||{}),i.document=i.document||(uO?document:void 0);const t=!i.document,n=()=>{a.dirty=!0,e.callHook("entries:updated",a)};let r=0,s=[];const o=[],a={plugins:o,dirty:!1,resolvedOptions:i,hooks:e,headEntries(){return s},use(l){const c=typeof l=="function"?l(a):l;(!c.key||!o.some(u=>u.key===c.key))&&(o.push(c),Dw(c.mode,t)&&e.addHooks(c.hooks||{}))},push(l,c){c==null||delete c.head;const u={_i:r++,input:l,...c};return Dw(u.mode,t)&&(s.push(u),n()),{dispose(){s=s.filter(h=>h._i!==u._i),e.callHook("entries:updated",a),n()},patch(h){for(const d of s)d._i===u._i&&(d.input=u.input=h);n()}}},async resolveTags(){const l={tags:[],entries:[...s]};await e.callHook("entries:resolve",l);for(const c of l.entries){const u=c.resolvedInput||c.input;if(c.resolvedInput=await(c.transform?c.transform(u):u),c.resolvedInput)for(const h of await _O(c)){const d={tag:h,entry:c,resolvedOptions:a.resolvedOptions};await e.callHook("tag:normalise",d),l.tags.push(d.tag)}}return await e.callHook("tags:beforeResolve",l),await e.callHook("tags:resolve",l),await e.callHook("tags:afterResolve",l),l.tags},ssr:t};return[MO,EO,AO,DO,RO,LO,FO,OO,...(i==null?void 0:i.plugins)||[]].forEach(l=>a.use(l)),a.hooks.callHook("init",a),a}function kO(){return qA}const BO=yA[0]==="3";function zO(i){return typeof i=="function"?i():Dt(i)}function vm(i){if(i instanceof Promise)return i;const e=zO(i);if(!i||!e)return e;if(Array.isArray(e))return e.map(t=>vm(t));if(typeof e=="object"){const t={};for(const n in e)if(Object.prototype.hasOwnProperty.call(e,n)){if(n==="titleTemplate"||n[0]==="o"&&n[1]==="n"){t[n]=Dt(e[n]);continue}t[n]=vm(e[n])}return t}return e}const HO={hooks:{"entries:resolve":i=>{for(const e of i.entries)e.resolvedInput=vm(e.input)}}},YA="usehead";function VO(i){return{install(t){BO&&(t.config.globalProperties.$unhead=i,t.config.globalProperties.$head=i,t.provide(YA,i))}}.install}function GO(i={}){i.domDelayFn=i.domDelayFn||(t=>so(()=>setTimeout(()=>t(),0)));const e=NO(i);return e.use(HO),e.install=VO(e),e}const Hy=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},Vy="__unhead_injection_handler__";function WO(i){Hy[Vy]=i}function XO(){if(Vy in Hy)return Hy[Vy]();const i=xi(YA);return i||kO()}function jA(i,e={}){const t=e.head||XO();if(t)return t.ssr?t.push(i,e):$O(t,i,e)}function $O(i,e,t={}){const n=nt(!1),r=nt({});qa(()=>{r.value=n.value?{}:vm(e)});const s=i.push(r.value,t);return Mn(r,a=>{s.patch(a)}),Ks()&&(Gh(()=>{s.dispose()}),YT(()=>{n.value=!0}),qT(()=>{n.value=!1})),s}function qO(i,e){const{title:t,titleTemplate:n,...r}=i;return jA({title:t,titleTemplate:n,_flatMeta:r},{...e,transform(s){const o=zx({...s._flatMeta});return delete s._flatMeta,{...s,meta:o}}})}function YO(i,e){return{ctx:{table:i},matchAll:t=>ZA(t,i)}}function KA(i){const e={};for(const t in i)e[t]=t==="dynamic"?new Map(Object.entries(i[t]).map(([n,r])=>[n,KA(r)])):new Map(Object.entries(i[t]));return e}function jO(i){return YO(KA(i))}function ZA(i,e,t){i.endsWith("/")&&(i=i.slice(0,-1)||"/");const n=[];for(const[s,o]of Rw(e.wildcard))(i===s||i.startsWith(s+"/"))&&n.push(o);for(const[s,o]of Rw(e.dynamic))if(i.startsWith(s+"/")){const a="/"+i.slice(s.length).split("/").splice(2).join("/");n.push(...ZA(a,o))}const r=e.static.get(i);return r&&n.push(r),n.filter(Boolean)}function Rw(i){return[...i.entries()].sort((e,t)=>e[0].length-t[0].length)}function j_(i){if(i===null||typeof i!="object")return!1;const e=Object.getPrototypeOf(i);return e!==null&&e!==Object.prototype&&Object.getPrototypeOf(e)!==null||Symbol.iterator in i?!1:Symbol.toStringTag in i?Object.prototype.toString.call(i)==="[object Module]":!0}function Gy(i,e,t=".",n){if(!j_(e))return Gy(i,{},t,n);const r=Object.assign({},e);for(const s in i){if(s==="__proto__"||s==="constructor")continue;const o=i[s];o!=null&&(n&&n(r,s,o,t)||(Array.isArray(o)&&Array.isArray(r[s])?r[s]=[...o,...r[s]]:j_(o)&&j_(r[s])?r[s]=Gy(o,r[s],(t?`${t}.`:"")+s.toString(),n):r[s]=o))}return r}function JA(i){return(...e)=>e.reduce((t,n)=>Gy(t,n,"",i),{})}const QA=JA(),KO=JA((i,e,t)=>{if(i[e]!==void 0&&typeof t=="function")return i[e]=t(i[e]),!0});function ZO(i,e){try{return e in i}catch{return!1}}var JO=Object.defineProperty,QO=(i,e,t)=>e in i?JO(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t,Ra=(i,e,t)=>(QO(i,typeof e!="symbol"?e+"":e,t),t);class Wy extends Error{constructor(e,t={}){super(e,t),Ra(this,"statusCode",500),Ra(this,"fatal",!1),Ra(this,"unhandled",!1),Ra(this,"statusMessage"),Ra(this,"data"),Ra(this,"cause"),t.cause&&!this.cause&&(this.cause=t.cause)}toJSON(){const e={message:this.message,statusCode:$y(this.statusCode,500)};return this.statusMessage&&(e.statusMessage=eC(this.statusMessage)),this.data!==void 0&&(e.data=this.data),e}}Ra(Wy,"__h3_error__",!0);function Xy(i){if(typeof i=="string")return new Wy(i);if(eN(i))return i;const e=new Wy(i.message??i.statusMessage??"",{cause:i.cause||i});if(ZO(i,"stack"))try{Object.defineProperty(e,"stack",{get(){return i.stack}})}catch{try{e.stack=i.stack}catch{}}if(i.data&&(e.data=i.data),i.statusCode?e.statusCode=$y(i.statusCode,e.statusCode):i.status&&(e.statusCode=$y(i.status,e.statusCode)),i.statusMessage?e.statusMessage=i.statusMessage:i.statusText&&(e.statusMessage=i.statusText),e.statusMessage){const t=e.statusMessage;eC(e.statusMessage)!==t&&console.warn("[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default.")}return i.fatal!==void 0&&(e.fatal=i.fatal),i.unhandled!==void 0&&(e.unhandled=i.unhandled),e}function eN(i){var e;return((e=i==null?void 0:i.constructor)==null?void 0:e.__h3_error__)===!0}const tN=/[^\u0009\u0020-\u007E]/g;function eC(i=""){return i.replace(tN,"")}function $y(i,e=200){return!i||(typeof i=="string"&&(i=Number.parseInt(i,10)),i<100||i>999)?e:i}const nN=Symbol("layout-meta"),Ng=Symbol("route"),tC="__nuxt_error",Ug=()=>wT(Vt().payload,"error"),ac=i=>{const e=Hx(i);try{const t=Vt(),n=Ug();t.hooks.callHook("app:error",e),n.value=n.value||e}catch{throw e}return e},iN=async(i={})=>{const e=Vt(),t=Ug();e.callHook("app:error:cleared",i),i.redirect&&await ao().replace(i.redirect),t.value=null},rN=i=>!!i&&typeof i=="object"&&tC in i,Hx=i=>{const e=Xy(i);return Object.defineProperty(e,tC,{value:!0,configurable:!1,writable:!1}),e},ao=()=>{var i;return(i=Vt())==null?void 0:i.$router},au=()=>Dx()?xi(Ng,Vt()._route):Vt()._route;const sN=()=>{try{if(Vt()._processingMiddleware)return!0}catch{return!0}return!1},Vx=(i,e)=>{i||(i="/");const t=typeof i=="string"?i:AA(i.path||"/",i.query||{})+(i.hash||"");if(e!=null&&e.open){{const{target:a="_blank",windowFeatures:l={}}=e.open,c=Object.entries(l).filter(([u,h])=>h!==void 0).map(([u,h])=>`${u.toLowerCase()}=${h}`).join(", ");open(t,a,c)}return Promise.resolve()}const n=(e==null?void 0:e.external)||Sl(t,{acceptRelative:!0});if(n){if(!(e!=null&&e.external))throw new Error("Navigating to an external URL is not allowed by default. Use `navigateTo(url, { external: true })`.");const a=Wh(t).protocol;if(a&&aF(a))throw new Error(`Cannot navigate to a URL with '${a}' protocol.`)}const r=sN();if(!n&&r)return i;const s=ao(),o=Vt();return n?(o._scope.stop(),e!=null&&e.replace?location.replace(t):location.href=t,r?o.isHydrating?new Promise(()=>{}):!1:Promise.resolve()):e!=null&&e.replace?s.replace(i):s.push(i)},oN={nuxt:{buildId:"2441844e-e73c-499a-b498-56f561351baa"}},aN=KO(oN);function lN(){const i=Vt();return i._appConfig||(i._appConfig=or(aN)),i._appConfig}const qy=!1,cN=!1,uN={componentName:"NuxtLink"},fN="#__nuxt";let zp,nC;function hN(){var e;const i=(e=lN().nuxt)==null?void 0:e.buildId;return zp=$fetch(Ux(`builds/meta/${i}.json`)),zp.then(t=>{nC=jO(t.matcher)}),zp}function kg(){return zp||hN()}async function iC(i){return await kg(),QA({},...nC.matchAll(i).reverse())}function Pw(i,e={}){const t=dN(i,e),n=Vt(),r=n._payloadCache=n._payloadCache||{};return t in r||(r[t]=pN(i).then(s=>s?rC(t).then(o=>o||(delete r[t],null)):(r[t]=null,null))),r[t]}const Iw="json";function dN(i,e={}){const t=new URL(i,"http://localhost");if(t.search)throw new Error("Payload URL cannot contain search params: "+i);if(t.host!=="localhost"||Sl(t.pathname,{acceptRelative:!0}))throw new Error("Payload URL must not include hostname: "+i);const n=e.hash||(e.fresh?Date.now():"");return ou(Og().app.baseURL,t.pathname,n?`_payload.${n}.${Iw}`:`_payload.${Iw}`)}async function rC(i){const e=fetch(i).then(t=>t.text().then(sC));try{return await e}catch(t){console.warn("[nuxt] Cannot load payload ",i,t)}return null}async function pN(i=au().path){if(i=Fg(i),(await kg()).prerendered.includes(i))return!0;const t=await iC(i);return!!t.prerender&&!t.redirect}let yd=null;async function mN(){if(yd)return yd;const i=document.getElementById("__NUXT_DATA__");if(!i)return{};const e=sC(i.textContent||""),t=i.dataset.src?await rC(i.dataset.src):void 0;return yd={...e,...t,...window.__NUXT__},yd}function sC(i){return sO(i,Vt()._payloadRevivers)}function gN(i,e){Vt()._payloadRevivers[i]=e}const Lw={NuxtError:i=>Hx(i),EmptyShallowRef:i=>Hr(i==="_"?void 0:i==="0n"?BigInt(0):mm(i)),EmptyRef:i=>nt(i==="_"?void 0:i==="0n"?BigInt(0):mm(i)),ShallowRef:i=>Hr(i),ShallowReactive:i=>zh(i),Ref:i=>nt(i),Reactive:i=>or(i)},_N=gs({name:"nuxt:revive-payload:client",order:-30,async setup(i){let e,t;for(const n in Lw)gN(n,Lw[n]);Object.assign(i.payload,([e,t]=eh(()=>i.runWithContext(mN)),e=await e,t(),e)),window.__NUXT__=i.payload}}),yN=[],vN=gs({name:"nuxt:head",enforce:"pre",setup(i){const e=GO({plugins:yN});WO(()=>Vt().vueApp._context.provides.usehead),i.vueApp.use(e);{let t=!0;const n=async()=>{t=!1,await $A(e)};e.hooks.hook("dom:beforeRender",r=>{r.shouldRender=!t}),i.hooks.hook("page:start",()=>{t=!0}),i.hooks.hook("page:finish",()=>{i.isHydrating||n()}),i.hooks.hook("app:error",n),i.hooks.hook("app:suspense:resolve",n)}}});/*!
  * vue-router v4.2.5
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */const nc=typeof window<"u";function xN(i){return i.__esModule||i[Symbol.toStringTag]==="Module"}const Ut=Object.assign;function K_(i,e){const t={};for(const n in e){const r=e[n];t[n]=Vr(r)?r.map(i):i(r)}return t}const hf=()=>{},Vr=Array.isArray,bN=/\/$/,SN=i=>i.replace(bN,"");function Z_(i,e,t="/"){let n,r={},s="",o="";const a=e.indexOf("#");let l=e.indexOf("?");return a<l&&a>=0&&(l=-1),l>-1&&(n=e.slice(0,l),s=e.slice(l+1,a>-1?a:e.length),r=i(s)),a>-1&&(n=n||e.slice(0,a),o=e.slice(a,e.length)),n=TN(n??e,t),{fullPath:n+(s&&"?")+s+o,path:n,query:r,hash:o}}function wN(i,e){const t=e.query?i(e.query):"";return e.path+(t&&"?")+t+(e.hash||"")}function Fw(i,e){return!e||!i.toLowerCase().startsWith(e.toLowerCase())?i:i.slice(e.length)||"/"}function MN(i,e,t){const n=e.matched.length-1,r=t.matched.length-1;return n>-1&&n===r&&Vc(e.matched[n],t.matched[r])&&oC(e.params,t.params)&&i(e.query)===i(t.query)&&e.hash===t.hash}function Vc(i,e){return(i.aliasOf||i)===(e.aliasOf||e)}function oC(i,e){if(Object.keys(i).length!==Object.keys(e).length)return!1;for(const t in i)if(!EN(i[t],e[t]))return!1;return!0}function EN(i,e){return Vr(i)?Ow(i,e):Vr(e)?Ow(e,i):i===e}function Ow(i,e){return Vr(e)?i.length===e.length&&i.every((t,n)=>t===e[n]):i.length===1&&i[0]===e}function TN(i,e){if(i.startsWith("/"))return i;if(!i)return e;const t=e.split("/"),n=i.split("/"),r=n[n.length-1];(r===".."||r===".")&&n.push("");let s=t.length-1,o,a;for(o=0;o<n.length;o++)if(a=n[o],a!==".")if(a==="..")s>1&&s--;else break;return t.slice(0,s).join("/")+"/"+n.slice(o-(o===n.length?1:0)).join("/")}var th;(function(i){i.pop="pop",i.push="push"})(th||(th={}));var df;(function(i){i.back="back",i.forward="forward",i.unknown=""})(df||(df={}));function AN(i){if(!i)if(nc){const e=document.querySelector("base");i=e&&e.getAttribute("href")||"/",i=i.replace(/^\w+:\/\/[^\/]+/,"")}else i="/";return i[0]!=="/"&&i[0]!=="#"&&(i="/"+i),SN(i)}const CN=/^[^#]+#/;function DN(i,e){return i.replace(CN,"#")+e}function RN(i,e){const t=document.documentElement.getBoundingClientRect(),n=i.getBoundingClientRect();return{behavior:e.behavior,left:n.left-t.left-(e.left||0),top:n.top-t.top-(e.top||0)}}const Bg=()=>({left:window.pageXOffset,top:window.pageYOffset});function PN(i){let e;if("el"in i){const t=i.el,n=typeof t=="string"&&t.startsWith("#"),r=typeof t=="string"?n?document.getElementById(t.slice(1)):document.querySelector(t):t;if(!r)return;e=RN(r,i)}else e=i;"scrollBehavior"in document.documentElement.style?window.scrollTo(e):window.scrollTo(e.left!=null?e.left:window.pageXOffset,e.top!=null?e.top:window.pageYOffset)}function Nw(i,e){return(history.state?history.state.position-e:-1)+i}const Yy=new Map;function IN(i,e){Yy.set(i,e)}function LN(i){const e=Yy.get(i);return Yy.delete(i),e}let FN=()=>location.protocol+"//"+location.host;function aC(i,e){const{pathname:t,search:n,hash:r}=e,s=i.indexOf("#");if(s>-1){let a=r.includes(i.slice(s))?i.slice(s).length:1,l=r.slice(a);return l[0]!=="/"&&(l="/"+l),Fw(l,"")}return Fw(t,i)+n+r}function ON(i,e,t,n){let r=[],s=[],o=null;const a=({state:d})=>{const f=aC(i,location),p=t.value,m=e.value;let g=0;if(d){if(t.value=f,e.value=d,o&&o===p){o=null;return}g=m?d.position-m.position:0}else n(f);r.forEach(_=>{_(t.value,p,{delta:g,type:th.pop,direction:g?g>0?df.forward:df.back:df.unknown})})};function l(){o=t.value}function c(d){r.push(d);const f=()=>{const p=r.indexOf(d);p>-1&&r.splice(p,1)};return s.push(f),f}function u(){const{history:d}=window;d.state&&d.replaceState(Ut({},d.state,{scroll:Bg()}),"")}function h(){for(const d of s)d();s=[],window.removeEventListener("popstate",a),window.removeEventListener("beforeunload",u)}return window.addEventListener("popstate",a),window.addEventListener("beforeunload",u,{passive:!0}),{pauseListeners:l,listen:c,destroy:h}}function Uw(i,e,t,n=!1,r=!1){return{back:i,current:e,forward:t,replaced:n,position:window.history.length,scroll:r?Bg():null}}function NN(i){const{history:e,location:t}=window,n={value:aC(i,t)},r={value:e.state};r.value||s(n.value,{back:null,current:n.value,forward:null,position:e.length-1,replaced:!0,scroll:null},!0);function s(l,c,u){const h=i.indexOf("#"),d=h>-1?(t.host&&document.querySelector("base")?i:i.slice(h))+l:FN()+i+l;try{e[u?"replaceState":"pushState"](c,"",d),r.value=c}catch(f){console.error(f),t[u?"replace":"assign"](d)}}function o(l,c){const u=Ut({},e.state,Uw(r.value.back,l,r.value.forward,!0),c,{position:r.value.position});s(l,u,!0),n.value=l}function a(l,c){const u=Ut({},r.value,e.state,{forward:l,scroll:Bg()});s(u.current,u,!0);const h=Ut({},Uw(n.value,l,null),{position:u.position+1},c);s(l,h,!1),n.value=l}return{location:n,state:r,push:a,replace:o}}function lC(i){i=AN(i);const e=NN(i),t=ON(i,e.state,e.location,e.replace);function n(s,o=!0){o||t.pauseListeners(),history.go(s)}const r=Ut({location:"",base:i,go:n,createHref:DN.bind(null,i)},e,t);return Object.defineProperty(r,"location",{enumerable:!0,get:()=>e.location.value}),Object.defineProperty(r,"state",{enumerable:!0,get:()=>e.state.value}),r}function UN(i){return i=location.host?i||location.pathname+location.search:"",i.includes("#")||(i+="#"),lC(i)}function kN(i){return typeof i=="string"||i&&typeof i=="object"}function cC(i){return typeof i=="string"||typeof i=="symbol"}const Kr={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0},uC=Symbol("");var kw;(function(i){i[i.aborted=4]="aborted",i[i.cancelled=8]="cancelled",i[i.duplicated=16]="duplicated"})(kw||(kw={}));function Gc(i,e){return Ut(new Error,{type:i,[uC]:!0},e)}function vs(i,e){return i instanceof Error&&uC in i&&(e==null||!!(i.type&e))}const Bw="[^/]+?",BN={sensitive:!1,strict:!1,start:!0,end:!0},zN=/[.+*?^${}()[\]/\\]/g;function HN(i,e){const t=Ut({},BN,e),n=[];let r=t.start?"^":"";const s=[];for(const c of i){const u=c.length?[]:[90];t.strict&&!c.length&&(r+="/");for(let h=0;h<c.length;h++){const d=c[h];let f=40+(t.sensitive?.25:0);if(d.type===0)h||(r+="/"),r+=d.value.replace(zN,"\\$&"),f+=40;else if(d.type===1){const{value:p,repeatable:m,optional:g,regexp:_}=d;s.push({name:p,repeatable:m,optional:g});const x=_||Bw;if(x!==Bw){f+=10;try{new RegExp(`(${x})`)}catch(v){throw new Error(`Invalid custom RegExp for param "${p}" (${x}): `+v.message)}}let y=m?`((?:${x})(?:/(?:${x}))*)`:`(${x})`;h||(y=g&&c.length<2?`(?:/${y})`:"/"+y),g&&(y+="?"),r+=y,f+=20,g&&(f+=-8),m&&(f+=-20),x===".*"&&(f+=-50)}u.push(f)}n.push(u)}if(t.strict&&t.end){const c=n.length-1;n[c][n[c].length-1]+=.7000000000000001}t.strict||(r+="/?"),t.end?r+="$":t.strict&&(r+="(?:/|$)");const o=new RegExp(r,t.sensitive?"":"i");function a(c){const u=c.match(o),h={};if(!u)return null;for(let d=1;d<u.length;d++){const f=u[d]||"",p=s[d-1];h[p.name]=f&&p.repeatable?f.split("/"):f}return h}function l(c){let u="",h=!1;for(const d of i){(!h||!u.endsWith("/"))&&(u+="/"),h=!1;for(const f of d)if(f.type===0)u+=f.value;else if(f.type===1){const{value:p,repeatable:m,optional:g}=f,_=p in c?c[p]:"";if(Vr(_)&&!m)throw new Error(`Provided param "${p}" is an array but it is not repeatable (* or + modifiers)`);const x=Vr(_)?_.join("/"):_;if(!x)if(g)d.length<2&&(u.endsWith("/")?u=u.slice(0,-1):h=!0);else throw new Error(`Missing required param "${p}"`);u+=x}}return u||"/"}return{re:o,score:n,keys:s,parse:a,stringify:l}}function VN(i,e){let t=0;for(;t<i.length&&t<e.length;){const n=e[t]-i[t];if(n)return n;t++}return i.length<e.length?i.length===1&&i[0]===80?-1:1:i.length>e.length?e.length===1&&e[0]===80?1:-1:0}function GN(i,e){let t=0;const n=i.score,r=e.score;for(;t<n.length&&t<r.length;){const s=VN(n[t],r[t]);if(s)return s;t++}if(Math.abs(r.length-n.length)===1){if(zw(n))return 1;if(zw(r))return-1}return r.length-n.length}function zw(i){const e=i[i.length-1];return i.length>0&&e[e.length-1]<0}const WN={type:0,value:""},XN=/[a-zA-Z0-9_]/;function $N(i){if(!i)return[[]];if(i==="/")return[[WN]];if(!i.startsWith("/"))throw new Error(`Invalid path "${i}"`);function e(f){throw new Error(`ERR (${t})/"${c}": ${f}`)}let t=0,n=t;const r=[];let s;function o(){s&&r.push(s),s=[]}let a=0,l,c="",u="";function h(){c&&(t===0?s.push({type:0,value:c}):t===1||t===2||t===3?(s.length>1&&(l==="*"||l==="+")&&e(`A repeatable param (${c}) must be alone in its segment. eg: '/:ids+.`),s.push({type:1,value:c,regexp:u,repeatable:l==="*"||l==="+",optional:l==="*"||l==="?"})):e("Invalid state to consume buffer"),c="")}function d(){c+=l}for(;a<i.length;){if(l=i[a++],l==="\\"&&t!==2){n=t,t=4;continue}switch(t){case 0:l==="/"?(c&&h(),o()):l===":"?(h(),t=1):d();break;case 4:d(),t=n;break;case 1:l==="("?t=2:XN.test(l)?d():(h(),t=0,l!=="*"&&l!=="?"&&l!=="+"&&a--);break;case 2:l===")"?u[u.length-1]=="\\"?u=u.slice(0,-1)+l:t=3:u+=l;break;case 3:h(),t=0,l!=="*"&&l!=="?"&&l!=="+"&&a--,u="";break;default:e("Unknown state");break}}return t===2&&e(`Unfinished custom RegExp for param "${c}"`),h(),o(),r}function qN(i,e,t){const n=HN($N(i.path),t),r=Ut(n,{record:i,parent:e,children:[],alias:[]});return e&&!r.record.aliasOf==!e.record.aliasOf&&e.children.push(r),r}function YN(i,e){const t=[],n=new Map;e=Gw({strict:!1,end:!0,sensitive:!1},e);function r(u){return n.get(u)}function s(u,h,d){const f=!d,p=jN(u);p.aliasOf=d&&d.record;const m=Gw(e,u),g=[p];if("alias"in u){const y=typeof u.alias=="string"?[u.alias]:u.alias;for(const v of y)g.push(Ut({},p,{components:d?d.record.components:p.components,path:v,aliasOf:d?d.record:p}))}let _,x;for(const y of g){const{path:v}=y;if(h&&v[0]!=="/"){const w=h.record.path,T=w[w.length-1]==="/"?"":"/";y.path=h.record.path+(v&&T+v)}if(_=qN(y,h,m),d?d.alias.push(_):(x=x||_,x!==_&&x.alias.push(_),f&&u.name&&!Vw(_)&&o(u.name)),p.children){const w=p.children;for(let T=0;T<w.length;T++)s(w[T],_,d&&d.children[T])}d=d||_,(_.record.components&&Object.keys(_.record.components).length||_.record.name||_.record.redirect)&&l(_)}return x?()=>{o(x)}:hf}function o(u){if(cC(u)){const h=n.get(u);h&&(n.delete(u),t.splice(t.indexOf(h),1),h.children.forEach(o),h.alias.forEach(o))}else{const h=t.indexOf(u);h>-1&&(t.splice(h,1),u.record.name&&n.delete(u.record.name),u.children.forEach(o),u.alias.forEach(o))}}function a(){return t}function l(u){let h=0;for(;h<t.length&&GN(u,t[h])>=0&&(u.record.path!==t[h].record.path||!fC(u,t[h]));)h++;t.splice(h,0,u),u.record.name&&!Vw(u)&&n.set(u.record.name,u)}function c(u,h){let d,f={},p,m;if("name"in u&&u.name){if(d=n.get(u.name),!d)throw Gc(1,{location:u});m=d.record.name,f=Ut(Hw(h.params,d.keys.filter(x=>!x.optional).map(x=>x.name)),u.params&&Hw(u.params,d.keys.map(x=>x.name))),p=d.stringify(f)}else if("path"in u)p=u.path,d=t.find(x=>x.re.test(p)),d&&(f=d.parse(p),m=d.record.name);else{if(d=h.name?n.get(h.name):t.find(x=>x.re.test(h.path)),!d)throw Gc(1,{location:u,currentLocation:h});m=d.record.name,f=Ut({},h.params,u.params),p=d.stringify(f)}const g=[];let _=d;for(;_;)g.unshift(_.record),_=_.parent;return{name:m,path:p,params:f,matched:g,meta:ZN(g)}}return i.forEach(u=>s(u)),{addRoute:s,resolve:c,removeRoute:o,getRoutes:a,getRecordMatcher:r}}function Hw(i,e){const t={};for(const n of e)n in i&&(t[n]=i[n]);return t}function jN(i){return{path:i.path,redirect:i.redirect,name:i.name,meta:i.meta||{},aliasOf:void 0,beforeEnter:i.beforeEnter,props:KN(i),children:i.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in i?i.components||null:i.component&&{default:i.component}}}function KN(i){const e={},t=i.props||!1;if("component"in i)e.default=t;else for(const n in i.components)e[n]=typeof t=="object"?t[n]:t;return e}function Vw(i){for(;i;){if(i.record.aliasOf)return!0;i=i.parent}return!1}function ZN(i){return i.reduce((e,t)=>Ut(e,t.meta),{})}function Gw(i,e){const t={};for(const n in i)t[n]=n in e?e[n]:i[n];return t}function fC(i,e){return e.children.some(t=>t===i||fC(i,t))}const hC=/#/g,JN=/&/g,QN=/\//g,eU=/=/g,tU=/\?/g,dC=/\+/g,nU=/%5B/g,iU=/%5D/g,pC=/%5E/g,rU=/%60/g,mC=/%7B/g,sU=/%7C/g,gC=/%7D/g,oU=/%20/g;function Gx(i){return encodeURI(""+i).replace(sU,"|").replace(nU,"[").replace(iU,"]")}function aU(i){return Gx(i).replace(mC,"{").replace(gC,"}").replace(pC,"^")}function jy(i){return Gx(i).replace(dC,"%2B").replace(oU,"+").replace(hC,"%23").replace(JN,"%26").replace(rU,"`").replace(mC,"{").replace(gC,"}").replace(pC,"^")}function lU(i){return jy(i).replace(eU,"%3D")}function cU(i){return Gx(i).replace(hC,"%23").replace(tU,"%3F")}function uU(i){return i==null?"":cU(i).replace(QN,"%2F")}function xm(i){try{return decodeURIComponent(""+i)}catch{}return""+i}function fU(i){const e={};if(i===""||i==="?")return e;const n=(i[0]==="?"?i.slice(1):i).split("&");for(let r=0;r<n.length;++r){const s=n[r].replace(dC," "),o=s.indexOf("="),a=xm(o<0?s:s.slice(0,o)),l=o<0?null:xm(s.slice(o+1));if(a in e){let c=e[a];Vr(c)||(c=e[a]=[c]),c.push(l)}else e[a]=l}return e}function Ww(i){let e="";for(let t in i){const n=i[t];if(t=lU(t),n==null){n!==void 0&&(e+=(e.length?"&":"")+t);continue}(Vr(n)?n.map(s=>s&&jy(s)):[n&&jy(n)]).forEach(s=>{s!==void 0&&(e+=(e.length?"&":"")+t,s!=null&&(e+="="+s))})}return e}function hU(i){const e={};for(const t in i){const n=i[t];n!==void 0&&(e[t]=Vr(n)?n.map(r=>r==null?null:""+r):n==null?n:""+n)}return e}const dU=Symbol(""),Xw=Symbol(""),Wx=Symbol(""),_C=Symbol(""),Ky=Symbol("");function _u(){let i=[];function e(n){return i.push(n),()=>{const r=i.indexOf(n);r>-1&&i.splice(r,1)}}function t(){i=[]}return{add:e,list:()=>i.slice(),reset:t}}function Fo(i,e,t,n,r){const s=n&&(n.enterCallbacks[r]=n.enterCallbacks[r]||[]);return()=>new Promise((o,a)=>{const l=h=>{h===!1?a(Gc(4,{from:t,to:e})):h instanceof Error?a(h):kN(h)?a(Gc(2,{from:e,to:h})):(s&&n.enterCallbacks[r]===s&&typeof h=="function"&&s.push(h),o())},c=i.call(n&&n.instances[r],e,t,l);let u=Promise.resolve(c);i.length<3&&(u=u.then(l)),u.catch(h=>a(h))})}function J_(i,e,t,n){const r=[];for(const s of i)for(const o in s.components){let a=s.components[o];if(!(e!=="beforeRouteEnter"&&!s.instances[o]))if(pU(a)){const c=(a.__vccOpts||a)[e];c&&r.push(Fo(c,t,n,s,o))}else{let l=a();r.push(()=>l.then(c=>{if(!c)return Promise.reject(new Error(`Couldn't resolve component "${o}" at "${s.path}"`));const u=xN(c)?c.default:c;s.components[o]=u;const d=(u.__vccOpts||u)[e];return d&&Fo(d,t,n,s,o)()}))}}return r}function pU(i){return typeof i=="object"||"displayName"in i||"props"in i||"__vccOpts"in i}function $w(i){const e=xi(Wx),t=xi(_C),n=Ht(()=>e.resolve(Dt(i.to))),r=Ht(()=>{const{matched:l}=n.value,{length:c}=l,u=l[c-1],h=t.matched;if(!u||!h.length)return-1;const d=h.findIndex(Vc.bind(null,u));if(d>-1)return d;const f=qw(l[c-2]);return c>1&&qw(u)===f&&h[h.length-1].path!==f?h.findIndex(Vc.bind(null,l[c-2])):d}),s=Ht(()=>r.value>-1&&yU(t.params,n.value.params)),o=Ht(()=>r.value>-1&&r.value===t.matched.length-1&&oC(t.params,n.value.params));function a(l={}){return _U(l)?e[Dt(i.replace)?"replace":"push"](Dt(i.to)).catch(hf):Promise.resolve()}return{route:n,href:Ht(()=>n.value.href),isActive:s,isExactActive:o,navigate:a}}const mU=ea({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"}},useLink:$w,setup(i,{slots:e}){const t=or($w(i)),{options:n}=xi(Wx),r=Ht(()=>({[Yw(i.activeClass,n.linkActiveClass,"router-link-active")]:t.isActive,[Yw(i.exactActiveClass,n.linkExactActiveClass,"router-link-exact-active")]:t.isExactActive}));return()=>{const s=e.default&&e.default(t);return i.custom?s:ir("a",{"aria-current":t.isExactActive?i.ariaCurrentValue:null,href:t.href,onClick:t.navigate,class:r.value},s)}}}),gU=mU;function _U(i){if(!(i.metaKey||i.altKey||i.ctrlKey||i.shiftKey)&&!i.defaultPrevented&&!(i.button!==void 0&&i.button!==0)){if(i.currentTarget&&i.currentTarget.getAttribute){const e=i.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return i.preventDefault&&i.preventDefault(),!0}}function yU(i,e){for(const t in e){const n=e[t],r=i[t];if(typeof n=="string"){if(n!==r)return!1}else if(!Vr(r)||r.length!==n.length||n.some((s,o)=>s!==r[o]))return!1}return!0}function qw(i){return i?i.aliasOf?i.aliasOf.path:i.path:""}const Yw=(i,e,t)=>i??e??t,vU=ea({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(i,{attrs:e,slots:t}){const n=xi(Ky),r=Ht(()=>i.route||n.value),s=xi(Xw,0),o=Ht(()=>{let c=Dt(s);const{matched:u}=r.value;let h;for(;(h=u[c])&&!h.components;)c++;return c}),a=Ht(()=>r.value.matched[o.value]);Ws(Xw,Ht(()=>o.value+1)),Ws(dU,a),Ws(Ky,r);const l=nt();return Mn(()=>[l.value,a.value,i.name],([c,u,h],[d,f,p])=>{u&&(u.instances[h]=c,f&&f!==u&&c&&c===d&&(u.leaveGuards.size||(u.leaveGuards=f.leaveGuards),u.updateGuards.size||(u.updateGuards=f.updateGuards))),c&&u&&(!f||!Vc(u,f)||!d)&&(u.enterCallbacks[h]||[]).forEach(m=>m(c))},{flush:"post"}),()=>{const c=r.value,u=i.name,h=a.value,d=h&&h.components[u];if(!d)return jw(t.default,{Component:d,route:c});const f=h.props[u],p=f?f===!0?c.params:typeof f=="function"?f(c):f:null,g=ir(d,Ut({},p,e,{onVnodeUnmounted:_=>{_.component.isUnmounted&&(h.instances[u]=null)},ref:l}));return jw(t.default,{Component:g,route:c})||g}}});function jw(i,e){if(!i)return null;const t=i(e);return t.length===1?t[0]:t}const yC=vU;function xU(i){const e=YN(i.routes,i),t=i.parseQuery||fU,n=i.stringifyQuery||Ww,r=i.history,s=_u(),o=_u(),a=_u(),l=Hr(Kr);let c=Kr;nc&&i.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const u=K_.bind(null,Y=>""+Y),h=K_.bind(null,uU),d=K_.bind(null,xm);function f(Y,ae){let de,be;return cC(Y)?(de=e.getRecordMatcher(Y),be=ae):be=Y,e.addRoute(be,de)}function p(Y){const ae=e.getRecordMatcher(Y);ae&&e.removeRoute(ae)}function m(){return e.getRoutes().map(Y=>Y.record)}function g(Y){return!!e.getRecordMatcher(Y)}function _(Y,ae){if(ae=Ut({},ae||l.value),typeof Y=="string"){const O=Z_(t,Y,ae.path),V=e.resolve({path:O.path},ae),q=r.createHref(O.fullPath);return Ut(O,V,{params:d(V.params),hash:xm(O.hash),redirectedFrom:void 0,href:q})}let de;if("path"in Y)de=Ut({},Y,{path:Z_(t,Y.path,ae.path).path});else{const O=Ut({},Y.params);for(const V in O)O[V]==null&&delete O[V];de=Ut({},Y,{params:h(O)}),ae.params=h(ae.params)}const be=e.resolve(de,ae),Re=Y.hash||"";be.params=u(d(be.params));const E=wN(n,Ut({},Y,{hash:aU(Re),path:be.path})),P=r.createHref(E);return Ut({fullPath:E,hash:Re,query:n===Ww?hU(Y.query):Y.query||{}},be,{redirectedFrom:void 0,href:P})}function x(Y){return typeof Y=="string"?Z_(t,Y,l.value.path):Ut({},Y)}function y(Y,ae){if(c!==Y)return Gc(8,{from:ae,to:Y})}function v(Y){return A(Y)}function w(Y){return v(Ut(x(Y),{replace:!0}))}function T(Y){const ae=Y.matched[Y.matched.length-1];if(ae&&ae.redirect){const{redirect:de}=ae;let be=typeof de=="function"?de(Y):de;return typeof be=="string"&&(be=be.includes("?")||be.includes("#")?be=x(be):{path:be},be.params={}),Ut({query:Y.query,hash:Y.hash,params:"path"in be?{}:Y.params},be)}}function A(Y,ae){const de=c=_(Y),be=l.value,Re=Y.state,E=Y.force,P=Y.replace===!0,O=T(de);if(O)return A(Ut(x(O),{state:typeof O=="object"?Ut({},Re,O.state):Re,force:E,replace:P}),ae||de);const V=de;V.redirectedFrom=ae;let q;return!E&&MN(n,be,de)&&(q=Gc(16,{to:V,from:be}),ue(be,be,!0,!1)),(q?Promise.resolve(q):b(V,be)).catch(U=>vs(U)?vs(U,2)?U:z(U):X(U,V,be)).then(U=>{if(U){if(vs(U,2))return A(Ut({replace:P},x(U.to),{state:typeof U.to=="object"?Ut({},Re,U.to.state):Re,force:E}),ae||V)}else U=L(V,be,!0,P,Re);return R(V,be,U),U})}function C(Y,ae){const de=y(Y,ae);return de?Promise.reject(de):Promise.resolve()}function M(Y){const ae=ie.values().next().value;return ae&&typeof ae.runWithContext=="function"?ae.runWithContext(Y):Y()}function b(Y,ae){let de;const[be,Re,E]=bU(Y,ae);de=J_(be.reverse(),"beforeRouteLeave",Y,ae);for(const O of be)O.leaveGuards.forEach(V=>{de.push(Fo(V,Y,ae))});const P=C.bind(null,Y,ae);return de.push(P),ye(de).then(()=>{de=[];for(const O of s.list())de.push(Fo(O,Y,ae));return de.push(P),ye(de)}).then(()=>{de=J_(Re,"beforeRouteUpdate",Y,ae);for(const O of Re)O.updateGuards.forEach(V=>{de.push(Fo(V,Y,ae))});return de.push(P),ye(de)}).then(()=>{de=[];for(const O of E)if(O.beforeEnter)if(Vr(O.beforeEnter))for(const V of O.beforeEnter)de.push(Fo(V,Y,ae));else de.push(Fo(O.beforeEnter,Y,ae));return de.push(P),ye(de)}).then(()=>(Y.matched.forEach(O=>O.enterCallbacks={}),de=J_(E,"beforeRouteEnter",Y,ae),de.push(P),ye(de))).then(()=>{de=[];for(const O of o.list())de.push(Fo(O,Y,ae));return de.push(P),ye(de)}).catch(O=>vs(O,8)?O:Promise.reject(O))}function R(Y,ae,de){a.list().forEach(be=>M(()=>be(Y,ae,de)))}function L(Y,ae,de,be,Re){const E=y(Y,ae);if(E)return E;const P=ae===Kr,O=nc?history.state:{};de&&(be||P?r.replace(Y.fullPath,Ut({scroll:P&&O&&O.scroll},Re)):r.push(Y.fullPath,Re)),l.value=Y,ue(Y,ae,de,P),z()}let F;function H(){F||(F=r.listen((Y,ae,de)=>{if(!le.listening)return;const be=_(Y),Re=T(be);if(Re){A(Ut(Re,{replace:!0}),be).catch(hf);return}c=be;const E=l.value;nc&&IN(Nw(E.fullPath,de.delta),Bg()),b(be,E).catch(P=>vs(P,12)?P:vs(P,2)?(A(P.to,be).then(O=>{vs(O,20)&&!de.delta&&de.type===th.pop&&r.go(-1,!1)}).catch(hf),Promise.reject()):(de.delta&&r.go(-de.delta,!1),X(P,be,E))).then(P=>{P=P||L(be,E,!1),P&&(de.delta&&!vs(P,8)?r.go(-de.delta,!1):de.type===th.pop&&vs(P,20)&&r.go(-1,!1)),R(be,E,P)}).catch(hf)}))}let W=_u(),N=_u(),$;function X(Y,ae,de){z(Y);const be=N.list();return be.length?be.forEach(Re=>Re(Y,ae,de)):console.error(Y),Promise.reject(Y)}function Z(){return $&&l.value!==Kr?Promise.resolve():new Promise((Y,ae)=>{W.add([Y,ae])})}function z(Y){return $||($=!Y,H(),W.list().forEach(([ae,de])=>Y?de(Y):ae()),W.reset()),Y}function ue(Y,ae,de,be){const{scrollBehavior:Re}=i;if(!nc||!Re)return Promise.resolve();const E=!de&&LN(Nw(Y.fullPath,0))||(be||!de)&&history.state&&history.state.scroll||null;return so().then(()=>Re(Y,ae,E)).then(P=>P&&PN(P)).catch(P=>X(P,Y,ae))}const me=Y=>r.go(Y);let Ue;const ie=new Set,le={currentRoute:l,listening:!0,addRoute:f,removeRoute:p,hasRoute:g,getRoutes:m,resolve:_,options:i,push:v,replace:w,go:me,back:()=>me(-1),forward:()=>me(1),beforeEach:s.add,beforeResolve:o.add,afterEach:a.add,onError:N.add,isReady:Z,install(Y){const ae=this;Y.component("RouterLink",gU),Y.component("RouterView",yC),Y.config.globalProperties.$router=ae,Object.defineProperty(Y.config.globalProperties,"$route",{enumerable:!0,get:()=>Dt(l)}),nc&&!Ue&&l.value===Kr&&(Ue=!0,v(r.location).catch(Re=>{}));const de={};for(const Re in Kr)Object.defineProperty(de,Re,{get:()=>l.value[Re],enumerable:!0});Y.provide(Wx,ae),Y.provide(_C,zh(de)),Y.provide(Ky,l);const be=Y.unmount;ie.add(Y),Y.unmount=function(){ie.delete(Y),ie.size<1&&(c=Kr,F&&F(),F=null,l.value=Kr,Ue=!1,$=!1),be()}}};function ye(Y){return Y.reduce((ae,de)=>ae.then(()=>M(de)),Promise.resolve())}return le}function bU(i,e){const t=[],n=[],r=[],s=Math.max(e.matched.length,i.matched.length);for(let o=0;o<s;o++){const a=e.matched[o];a&&(i.matched.find(c=>Vc(c,a))?n.push(a):t.push(a));const l=i.matched[o];l&&(e.matched.find(c=>Vc(c,l))||r.push(l))}return[t,n,r]}const SU=(i,e)=>e.path.replace(/(:\w+)\([^)]+\)/g,"$1").replace(/(:\w+)[?+*]/g,"$1").replace(/:\w+/g,t=>{var n;return((n=i.params[t.slice(1)])==null?void 0:n.toString())||""}),Zy=(i,e)=>{const t=i.route.matched.find(r=>{var s;return((s=r.components)==null?void 0:s.default)===i.Component.type}),n=e??(t==null?void 0:t.meta.key)??(t&&SU(i.route,t));return typeof n=="function"?n(i.route):n},wU=(i,e)=>({default:()=>i?ir(bL,i===!0?{}:i,e):e});function Xx(i){return Array.isArray(i)?i:[i]}const vd=or({transitionComplete:!1,transitionStart:!1,transitionReady:!1}),vC=()=>({transitionState:vd,toggleTransitionStart:n=>{vd.transitionStart=n},toggleTransitionComplete:n=>{vd.transitionComplete=n},toggleTransitionReady:n=>{vd.transitionReady=n}}),MU="$s";function EU(...i){const e=typeof i[i.length-1]=="string"?i.pop():void 0;typeof i[0]!="string"&&i.unshift(e);const[t,n]=i;if(!t||typeof t!="string")throw new TypeError("[nuxt] [useState] key must be a string: "+t);if(n!==void 0&&typeof n!="function")throw new Error("[nuxt] [useState] init must be a function: "+n);const r=MU+t,s=Vt(),o=wT(s.payload.state,r);if(o.value===void 0&&n){const a=n();if(on(a))return s.payload.state[r]=a,a;o.value=a}return o}const yu=()=>EU("flip-state"),Jy=globalThis.requestIdleCallback||(i=>{const e=Date.now(),t={didTimeout:!1,timeRemaining:()=>Math.max(0,50-(Date.now()-e))};return setTimeout(()=>{i(t)},1)}),TU=globalThis.cancelIdleCallback||(i=>{clearTimeout(i)}),$x=i=>{const e=Vt();e.isHydrating?e.hooks.hookOnce("app:suspense:resolve",()=>{Jy(i)}):Jy(i)};async function xC(i,e=ao()){const{path:t,matched:n}=e.resolve(i);if(!n.length||(e._routePreloaded||(e._routePreloaded=new Set),e._routePreloaded.has(t)))return;const r=e._preloadPromises=e._preloadPromises||[];if(r.length>4)return Promise.all(r).then(()=>xC(i,e));e._routePreloaded.add(t);const s=n.map(o=>{var a;return(a=o.components)==null?void 0:a.default}).filter(o=>typeof o=="function");for(const o of s){const a=Promise.resolve(o()).catch(()=>{}).finally(()=>r.splice(r.indexOf(a)));r.push(a)}await Promise.all(r)}function AU(i={}){const e=i.path||window.location.pathname;let t={};try{t=mm(sessionStorage.getItem("nuxt:reload")||"{}")}catch{}if(i.force||(t==null?void 0:t.path)!==e||(t==null?void 0:t.expires)<Date.now()){try{sessionStorage.setItem("nuxt:reload",JSON.stringify({path:e,expires:Date.now()+(i.ttl??1e4)}))}catch{}if(i.persistState)try{sessionStorage.setItem("nuxt:reload:state",JSON.stringify({state:Vt().payload.state}))}catch{}window.location.pathname!==e?window.location.href=e:window.location.reload()}}const CU=(...i)=>i.find(e=>e!==void 0),DU="noopener noreferrer";function RU(i){const e=i.componentName||"NuxtLink",t=(n,r)=>{if(!n||i.trailingSlash!=="append"&&i.trailingSlash!=="remove")return n;if(typeof n=="string")return Kw(n,i.trailingSlash);const s="path"in n?n.path:r(n).path;return{...n,name:void 0,path:Kw(s,i.trailingSlash)}};return ea({name:e,props:{to:{type:[String,Object],default:void 0,required:!1},href:{type:[String,Object],default:void 0,required:!1},target:{type:String,default:void 0,required:!1},rel:{type:String,default:void 0,required:!1},noRel:{type:Boolean,default:void 0,required:!1},prefetch:{type:Boolean,default:void 0,required:!1},noPrefetch:{type:Boolean,default:void 0,required:!1},activeClass:{type:String,default:void 0,required:!1},exactActiveClass:{type:String,default:void 0,required:!1},prefetchedClass:{type:String,default:void 0,required:!1},replace:{type:Boolean,default:void 0,required:!1},ariaCurrentValue:{type:String,default:void 0,required:!1},external:{type:Boolean,default:void 0,required:!1},custom:{type:Boolean,default:void 0,required:!1}},setup(n,{slots:r}){const s=ao(),o=Og(),a=Ht(()=>{const f=n.to||n.href||"";return t(f,s.resolve)}),l=Ht(()=>typeof a.value=="string"&&Sl(a.value,{acceptRelative:!0})),c=Ht(()=>n.external||n.target&&n.target!=="_self"?!0:typeof a.value=="object"?!1:a.value===""||l.value),u=nt(!1),h=nt(null),d=f=>{var p;h.value=n.custom?(p=f==null?void 0:f.$el)==null?void 0:p.nextElementSibling:f==null?void 0:f.$el};if(n.prefetch!==!1&&n.noPrefetch!==!0&&n.target!=="_blank"&&!IU()){const p=Vt();let m,g=null;Xr(()=>{const _=PU();$x(()=>{m=Jy(()=>{var x;(x=h==null?void 0:h.value)!=null&&x.tagName&&(g=_.observe(h.value,async()=>{g==null||g(),g=null;const y=typeof a.value=="string"?a.value:s.resolve(a.value).fullPath;await Promise.all([p.hooks.callHook("link:prefetch",y).catch(()=>{}),!c.value&&xC(a.value,s).catch(()=>{})]),u.value=!0}))})})}),Gh(()=>{m&&TU(m),g==null||g(),g=null})}return()=>{var _,x;if(!c.value){const y={ref:d,to:a.value,activeClass:n.activeClass||i.activeClass,exactActiveClass:n.exactActiveClass||i.exactActiveClass,replace:n.replace,ariaCurrentValue:n.ariaCurrentValue,custom:n.custom};return n.custom||(u.value&&(y.class=n.prefetchedClass||i.prefetchedClass),y.rel=n.rel),ir(lL("RouterLink"),y,r.default)}const f=typeof a.value=="object"?((_=s.resolve(a.value))==null?void 0:_.href)??null:a.value&&!n.external&&!l.value?t(ou(o.app.baseURL,a.value),s.resolve):a.value||null,p=n.target||null,m=n.noRel?null:CU(n.rel,i.externalRelAttribute,f?DU:"")||null,g=()=>Vx(f,{replace:n.replace});return n.custom?r.default?r.default({href:f,navigate:g,get route(){if(!f)return;const y=Wh(f);return{path:y.pathname,fullPath:y.pathname,get query(){return TA(y.search)},hash:y.hash,params:{},name:void 0,matched:[],redirectedFrom:void 0,meta:{},href:f}},rel:m,target:p,isExternal:c.value,isActive:!1,isExactActive:!1}):null:ir("a",{ref:h,href:f,rel:m,target:p},(x=r.default)==null?void 0:x.call(r))}}})}const bC=RU(uN);function Kw(i,e){const t=e==="append"?dm:Fg;return Sl(i)&&!i.startsWith("http")?i:t(i,!0)}function PU(){const i=Vt();if(i._observer)return i._observer;let e=null;const t=new Map,n=(s,o)=>(e||(e=new IntersectionObserver(a=>{for(const l of a){const c=t.get(l.target);(l.isIntersecting||l.intersectionRatio>0)&&c&&c()}})),t.set(s,o),e.observe(s),()=>{t.delete(s),e.unobserve(s),t.size===0&&(e.disconnect(),e=null)});return i._observer={observe:n}}function IU(){const i=navigator.connection;return!!(i&&(i.saveData||/2g/.test(i.effectiveType)))}const LU=!1;/*!
 * pinia v2.1.7
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */let SC;const Xh=i=>SC=i,wC=Symbol();function Qy(i){return i&&typeof i=="object"&&Object.prototype.toString.call(i)==="[object Object]"&&typeof i.toJSON!="function"}var pf;(function(i){i.direct="direct",i.patchObject="patch object",i.patchFunction="patch function"})(pf||(pf={}));function FU(){const i=fx(!0),e=i.run(()=>nt({}));let t=[],n=[];const r=bg({install(s){Xh(r),r._a=s,s.provide(wC,r),s.config.globalProperties.$pinia=r,n.forEach(o=>t.push(o)),n=[]},use(s){return!this._a&&!LU?n.push(s):t.push(s),this},_p:t,_a:null,_e:i,_s:new Map,state:e});return r}const MC=()=>{};function Zw(i,e,t,n=MC){i.push(e);const r=()=>{const s=i.indexOf(e);s>-1&&(i.splice(s,1),n())};return!t&&hx()&&lT(r),r}function Dl(i,...e){i.slice().forEach(t=>{t(...e)})}const OU=i=>i();function ev(i,e){i instanceof Map&&e instanceof Map&&e.forEach((t,n)=>i.set(n,t)),i instanceof Set&&e instanceof Set&&e.forEach(i.add,i);for(const t in e){if(!e.hasOwnProperty(t))continue;const n=e[t],r=i[t];Qy(r)&&Qy(n)&&i.hasOwnProperty(t)&&!on(n)&&!qo(n)?i[t]=ev(r,n):i[t]=n}return i}const NU=Symbol();function UU(i){return!Qy(i)||!i.hasOwnProperty(NU)}const{assign:Co}=Object;function kU(i){return!!(on(i)&&i.effect)}function BU(i,e,t,n){const{state:r,actions:s,getters:o}=e,a=t.state.value[i];let l;function c(){a||(t.state.value[i]=r?r():{});const u=ST(t.state.value[i]);return Co(u,s,Object.keys(o||{}).reduce((h,d)=>(h[d]=bg(Ht(()=>{Xh(t);const f=t._s.get(i);return o[d].call(f,f)})),h),{}))}return l=EC(i,c,e,t,n,!0),l}function EC(i,e,t={},n,r,s){let o;const a=Co({actions:{}},t),l={deep:!0};let c,u,h=[],d=[],f;const p=n.state.value[i];!s&&!p&&(n.state.value[i]={}),nt({});let m;function g(C){let M;c=u=!1,typeof C=="function"?(C(n.state.value[i]),M={type:pf.patchFunction,storeId:i,events:f}):(ev(n.state.value[i],C),M={type:pf.patchObject,payload:C,storeId:i,events:f});const b=m=Symbol();so().then(()=>{m===b&&(c=!0)}),u=!0,Dl(h,M,n.state.value[i])}const _=s?function(){const{state:M}=t,b=M?M():{};this.$patch(R=>{Co(R,b)})}:MC;function x(){o.stop(),h=[],d=[],n._s.delete(i)}function y(C,M){return function(){Xh(n);const b=Array.from(arguments),R=[],L=[];function F(N){R.push(N)}function H(N){L.push(N)}Dl(d,{args:b,name:C,store:w,after:F,onError:H});let W;try{W=M.apply(this&&this.$id===i?this:w,b)}catch(N){throw Dl(L,N),N}return W instanceof Promise?W.then(N=>(Dl(R,N),N)).catch(N=>(Dl(L,N),Promise.reject(N))):(Dl(R,W),W)}}const v={_p:n,$id:i,$onAction:Zw.bind(null,d),$patch:g,$reset:_,$subscribe(C,M={}){const b=Zw(h,C,M.detached,()=>R()),R=o.run(()=>Mn(()=>n.state.value[i],L=>{(M.flush==="sync"?u:c)&&C({storeId:i,type:pf.direct,events:f},L)},Co({},l,M)));return b},$dispose:x},w=or(v);n._s.set(i,w);const A=(n._a&&n._a.runWithContext||OU)(()=>n._e.run(()=>(o=fx()).run(e)));for(const C in A){const M=A[C];if(on(M)&&!kU(M)||qo(M))s||(p&&UU(M)&&(on(M)?M.value=p[C]:ev(M,p[C])),n.state.value[i][C]=M);else if(typeof M=="function"){const b=y(C,M);A[C]=b,a.actions[C]=M}}return Co(w,A),Co(Et(w),A),Object.defineProperty(w,"$state",{get:()=>n.state.value[i],set:C=>{g(M=>{Co(M,C)})}}),n._p.forEach(C=>{Co(w,o.run(()=>C({store:w,app:n._a,pinia:n,options:a})))}),p&&s&&t.hydrate&&t.hydrate(w.$state,p),c=!0,u=!0,w}function zg(i,e,t){let n,r;const s=typeof e=="function";typeof i=="string"?(n=i,r=s?t:e):(r=i,n=i.id);function o(a,l){const c=Dx();return a=a||(c?xi(wC,null):null),a&&Xh(a),a=SC,a._s.has(n)||(s?EC(n,e,r,a):BU(n,r,a)),a._s.get(n)}return o.$id=n,o}const bm=zg("routeUrl",{state:()=>({url:"/",item:null}),getters:{getUrl(i){return i.url}},actions:{setUrl(i,e){this.url=i,this.item=e}}});function Cs(i){if(i===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return i}function TC(i,e){i.prototype=Object.create(e.prototype),i.prototype.constructor=i,i.__proto__=e}/*!
 * GSAP 3.12.5
 * https://gsap.com
 *
 * @license Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var rr={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Wc={duration:.5,overwrite:!1,delay:0},qx,ti,Jt,vr=1e8,qt=1/vr,tv=Math.PI*2,zU=tv/4,HU=0,AC=Math.sqrt,VU=Math.cos,GU=Math.sin,Bn=function(e){return typeof e=="string"},un=function(e){return typeof e=="function"},Zs=function(e){return typeof e=="number"},Yx=function(e){return typeof e>"u"},ps=function(e){return typeof e=="object"},Ri=function(e){return e!==!1},jx=function(){return typeof window<"u"},xd=function(e){return un(e)||Bn(e)},CC=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},ni=Array.isArray,nv=/(?:-?\.?\d|\.)+/gi,DC=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,lc=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Q_=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,RC=/[+-]=-?[.\d]+/,PC=/[^,'"\[\]\s]+/gi,WU=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,tn,Qr,iv,Kx,ar={},Sm={},IC,LC=function(e){return(Sm=fl(e,ar))&&Ni},Zx=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},nh=function(e,t){return!t&&console.warn(e)},FC=function(e,t){return e&&(ar[e]=t)&&Sm&&(Sm[e]=t)||ar},ih=function(){return 0},XU={suppressEvents:!0,isStart:!0,kill:!1},Hp={suppressEvents:!0,kill:!1},$U={suppressEvents:!0},Jx={},jo=[],rv={},OC,Yi={},e0={},Jw=30,Vp=[],Qx="",eb=function(e){var t=e[0],n,r;if(ps(t)||un(t)||(e=[e]),!(n=(t._gsap||{}).harness)){for(r=Vp.length;r--&&!Vp[r].targetTest(t););n=Vp[r]}for(r=e.length;r--;)e[r]&&(e[r]._gsap||(e[r]._gsap=new sD(e[r],n)))||e.splice(r,1);return e},ja=function(e){return e._gsap||eb(xr(e))[0]._gsap},NC=function(e,t,n){return(n=e[t])&&un(n)?e[t]():Yx(n)&&e.getAttribute&&e.getAttribute(t)||n},Pi=function(e,t){return(e=e.split(",")).forEach(t)||e},pn=function(e){return Math.round(e*1e5)/1e5||0},Nn=function(e){return Math.round(e*1e7)/1e7||0},Ec=function(e,t){var n=t.charAt(0),r=parseFloat(t.substr(2));return e=parseFloat(e),n==="+"?e+r:n==="-"?e-r:n==="*"?e*r:e/r},qU=function(e,t){for(var n=t.length,r=0;e.indexOf(t[r])<0&&++r<n;);return r<n},wm=function(){var e=jo.length,t=jo.slice(0),n,r;for(rv={},jo.length=0,n=0;n<e;n++)r=t[n],r&&r._lazy&&(r.render(r._lazy[0],r._lazy[1],!0)._lazy=0)},UC=function(e,t,n,r){jo.length&&!ti&&wm(),e.render(t,n,ti&&t<0&&(e._initted||e._startAt)),jo.length&&!ti&&wm()},kC=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(PC).length<2?t:Bn(e)?e.trim():e},BC=function(e){return e},Mr=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},YU=function(e){return function(t,n){for(var r in n)r in t||r==="duration"&&e||r==="ease"||(t[r]=n[r])}},fl=function(e,t){for(var n in t)e[n]=t[n];return e},Qw=function i(e,t){for(var n in t)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(e[n]=ps(t[n])?i(e[n]||(e[n]={}),t[n]):t[n]);return e},Mm=function(e,t){var n={},r;for(r in e)r in t||(n[r]=e[r]);return n},mf=function(e){var t=e.parent||tn,n=e.keyframes?YU(ni(e.keyframes)):Mr;if(Ri(e.inherit))for(;t;)n(e,t.vars.defaults),t=t.parent||t._dp;return e},jU=function(e,t){for(var n=e.length,r=n===t.length;r&&n--&&e[n]===t[n];);return n<0},zC=function(e,t,n,r,s){var o=e[r],a;if(s)for(a=t[s];o&&o[s]>a;)o=o._prev;return o?(t._next=o._next,o._next=t):(t._next=e[n],e[n]=t),t._next?t._next._prev=t:e[r]=t,t._prev=o,t.parent=t._dp=e,t},Hg=function(e,t,n,r){n===void 0&&(n="_first"),r===void 0&&(r="_last");var s=t._prev,o=t._next;s?s._next=o:e[n]===t&&(e[n]=o),o?o._prev=s:e[r]===t&&(e[r]=s),t._next=t._prev=t.parent=null},na=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},Ka=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var n=e;n;)n._dirty=1,n=n.parent;return e},KU=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},sv=function(e,t,n,r){return e._startAt&&(ti?e._startAt.revert(Hp):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,r))},ZU=function i(e){return!e||e._ts&&i(e.parent)},eM=function(e){return e._repeat?Xc(e._tTime,e=e.duration()+e._rDelay)*e:0},Xc=function(e,t){var n=Math.floor(e/=t);return e&&n===e?n-1:n},Em=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},Vg=function(e){return e._end=Nn(e._start+(e._tDur/Math.abs(e._ts||e._rts||qt)||0))},Gg=function(e,t){var n=e._dp;return n&&n.smoothChildTiming&&e._ts&&(e._start=Nn(n._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),Vg(e),n._dirty||Ka(n,e)),e},HC=function(e,t){var n;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(n=Em(e.rawTime(),t),(!t._dur||$h(0,t.totalDuration(),n)-t._tTime>qt)&&t.render(n,!0)),Ka(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(n=e;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;e._zTime=-qt}},rs=function(e,t,n,r){return t.parent&&na(t),t._start=Nn((Zs(n)?n:n||e!==tn?pr(e,n,t):e._time)+t._delay),t._end=Nn(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),zC(e,t,"_first","_last",e._sort?"_start":0),ov(t)||(e._recent=t),r||HC(e,t),e._ts<0&&Gg(e,e._tTime),e},VC=function(e,t){return(ar.ScrollTrigger||Zx("scrollTrigger",t))&&ar.ScrollTrigger.create(t,e)},GC=function(e,t,n,r,s){if(nb(e,t,s),!e._initted)return 1;if(!n&&e._pt&&!ti&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&OC!==Zi.frame)return jo.push(e),e._lazy=[s,r],1},JU=function i(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||i(t))},ov=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},QU=function(e,t,n,r){var s=e.ratio,o=t<0||!t&&(!e._start&&JU(e)&&!(!e._initted&&ov(e))||(e._ts<0||e._dp._ts<0)&&!ov(e))?0:1,a=e._rDelay,l=0,c,u,h;if(a&&e._repeat&&(l=$h(0,e._tDur,t),u=Xc(l,a),e._yoyo&&u&1&&(o=1-o),u!==Xc(e._tTime,a)&&(s=1-o,e.vars.repeatRefresh&&e._initted&&e.invalidate())),o!==s||ti||r||e._zTime===qt||!t&&e._zTime){if(!e._initted&&GC(e,t,r,n,l))return;for(h=e._zTime,e._zTime=t||(n?qt:0),n||(n=t&&!h),e.ratio=o,e._from&&(o=1-o),e._time=0,e._tTime=l,c=e._pt;c;)c.r(o,c.d),c=c._next;t<0&&sv(e,t,n,!0),e._onUpdate&&!n&&nr(e,"onUpdate"),l&&e._repeat&&!n&&e.parent&&nr(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===o&&(o&&na(e,1),!n&&!ti&&(nr(e,o?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},ek=function(e,t,n){var r;if(n>t)for(r=e._first;r&&r._start<=n;){if(r.data==="isPause"&&r._start>t)return r;r=r._next}else for(r=e._last;r&&r._start>=n;){if(r.data==="isPause"&&r._start<t)return r;r=r._prev}},$c=function(e,t,n,r){var s=e._repeat,o=Nn(t)||0,a=e._tTime/e._tDur;return a&&!r&&(e._time*=o/e._dur),e._dur=o,e._tDur=s?s<0?1e10:Nn(o*(s+1)+e._rDelay*s):o,a>0&&!r&&Gg(e,e._tTime=e._tDur*a),e.parent&&Vg(e),n||Ka(e.parent,e),e},tM=function(e){return e instanceof mi?Ka(e):$c(e,e._dur)},tk={_start:0,endTime:ih,totalDuration:ih},pr=function i(e,t,n){var r=e.labels,s=e._recent||tk,o=e.duration()>=vr?s.endTime(!1):e._dur,a,l,c;return Bn(t)&&(isNaN(t)||t in r)?(l=t.charAt(0),c=t.substr(-1)==="%",a=t.indexOf("="),l==="<"||l===">"?(a>=0&&(t=t.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(t.substr(1))||0)*(c?(a<0?s:n).totalDuration()/100:1)):a<0?(t in r||(r[t]=o),r[t]):(l=parseFloat(t.charAt(a-1)+t.substr(a+1)),c&&n&&(l=l/100*(ni(n)?n[0]:n).totalDuration()),a>1?i(e,t.substr(0,a-1),n)+l:o+l)):t==null?o:+t},gf=function(e,t,n){var r=Zs(t[1]),s=(r?2:1)+(e<2?0:1),o=t[s],a,l;if(r&&(o.duration=t[1]),o.parent=n,e){for(a=o,l=n;l&&!("immediateRender"in a);)a=l.vars.defaults||{},l=Ri(l.vars.inherit)&&l.parent;o.immediateRender=Ri(a.immediateRender),e<2?o.runBackwards=1:o.startAt=t[s-1]}return new xn(t[0],o,t[s+1])},aa=function(e,t){return e||e===0?t(e):t},$h=function(e,t,n){return n<e?e:n>t?t:n},ei=function(e,t){return!Bn(e)||!(t=WU.exec(e))?"":t[1]},nk=function(e,t,n){return aa(n,function(r){return $h(e,t,r)})},av=[].slice,WC=function(e,t){return e&&ps(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&ps(e[0]))&&!e.nodeType&&e!==Qr},ik=function(e,t,n){return n===void 0&&(n=[]),e.forEach(function(r){var s;return Bn(r)&&!t||WC(r,1)?(s=n).push.apply(s,xr(r)):n.push(r)})||n},xr=function(e,t,n){return Jt&&!t&&Jt.selector?Jt.selector(e):Bn(e)&&!n&&(iv||!qc())?av.call((t||Kx).querySelectorAll(e),0):ni(e)?ik(e,n):WC(e)?av.call(e,0):e?[e]:[]},lv=function(e){return e=xr(e)[0]||nh("Invalid scope")||{},function(t){var n=e.current||e.nativeElement||e;return xr(t,n.querySelectorAll?n:n===e?nh("Invalid scope")||Kx.createElement("div"):e)}},XC=function(e){return e.sort(function(){return .5-Math.random()})},$C=function(e){if(un(e))return e;var t=ps(e)?e:{each:e},n=Za(t.ease),r=t.from||0,s=parseFloat(t.base)||0,o={},a=r>0&&r<1,l=isNaN(r)||a,c=t.axis,u=r,h=r;return Bn(r)?u=h={center:.5,edges:.5,end:1}[r]||0:!a&&l&&(u=r[0],h=r[1]),function(d,f,p){var m=(p||t).length,g=o[m],_,x,y,v,w,T,A,C,M;if(!g){if(M=t.grid==="auto"?0:(t.grid||[1,vr])[1],!M){for(A=-vr;A<(A=p[M++].getBoundingClientRect().left)&&M<m;);M<m&&M--}for(g=o[m]=[],_=l?Math.min(M,m)*u-.5:r%M,x=M===vr?0:l?m*h/M-.5:r/M|0,A=0,C=vr,T=0;T<m;T++)y=T%M-_,v=x-(T/M|0),g[T]=w=c?Math.abs(c==="y"?v:y):AC(y*y+v*v),w>A&&(A=w),w<C&&(C=w);r==="random"&&XC(g),g.max=A-C,g.min=C,g.v=m=(parseFloat(t.amount)||parseFloat(t.each)*(M>m?m-1:c?c==="y"?m/M:M:Math.max(M,m/M))||0)*(r==="edges"?-1:1),g.b=m<0?s-m:s,g.u=ei(t.amount||t.each)||0,n=n&&m<0?nD(n):n}return m=(g[d]-g.min)/g.max||0,Nn(g.b+(n?n(m):m)*g.v)+g.u}},cv=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(n){var r=Nn(Math.round(parseFloat(n)/e)*e*t);return(r-r%1)/t+(Zs(n)?0:ei(n))}},qC=function(e,t){var n=ni(e),r,s;return!n&&ps(e)&&(r=n=e.radius||vr,e.values?(e=xr(e.values),(s=!Zs(e[0]))&&(r*=r)):e=cv(e.increment)),aa(t,n?un(e)?function(o){return s=e(o),Math.abs(s-o)<=r?s:o}:function(o){for(var a=parseFloat(s?o.x:o),l=parseFloat(s?o.y:0),c=vr,u=0,h=e.length,d,f;h--;)s?(d=e[h].x-a,f=e[h].y-l,d=d*d+f*f):d=Math.abs(e[h]-a),d<c&&(c=d,u=h);return u=!r||c<=r?e[u]:o,s||u===o||Zs(o)?u:u+ei(o)}:cv(e))},YC=function(e,t,n,r){return aa(ni(e)?!t:n===!0?!!(n=0):!r,function(){return ni(e)?e[~~(Math.random()*e.length)]:(n=n||1e-5)&&(r=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((e-n/2+Math.random()*(t-e+n*.99))/n)*n*r)/r})},rk=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(r){return t.reduce(function(s,o){return o(s)},r)}},sk=function(e,t){return function(n){return e(parseFloat(n))+(t||ei(n))}},ok=function(e,t,n){return KC(e,t,0,1,n)},jC=function(e,t,n){return aa(n,function(r){return e[~~t(r)]})},ak=function i(e,t,n){var r=t-e;return ni(e)?jC(e,i(0,e.length),t):aa(n,function(s){return(r+(s-e)%r)%r+e})},lk=function i(e,t,n){var r=t-e,s=r*2;return ni(e)?jC(e,i(0,e.length-1),t):aa(n,function(o){return o=(s+(o-e)%s)%s||0,e+(o>r?s-o:o)})},rh=function(e){for(var t=0,n="",r,s,o,a;~(r=e.indexOf("random(",t));)o=e.indexOf(")",r),a=e.charAt(r+7)==="[",s=e.substr(r+7,o-r-7).match(a?PC:nv),n+=e.substr(t,r-t)+YC(a?s:+s[0],a?0:+s[1],+s[2]||1e-5),t=o+1;return n+e.substr(t,e.length-t)},KC=function(e,t,n,r,s){var o=t-e,a=r-n;return aa(s,function(l){return n+((l-e)/o*a||0)})},ck=function i(e,t,n,r){var s=isNaN(e+t)?0:function(f){return(1-f)*e+f*t};if(!s){var o=Bn(e),a={},l,c,u,h,d;if(n===!0&&(r=1)&&(n=null),o)e={p:e},t={p:t};else if(ni(e)&&!ni(t)){for(u=[],h=e.length,d=h-2,c=1;c<h;c++)u.push(i(e[c-1],e[c]));h--,s=function(p){p*=h;var m=Math.min(d,~~p);return u[m](p-m)},n=t}else r||(e=fl(ni(e)?[]:{},e));if(!u){for(l in t)tb.call(a,e,l,"get",t[l]);s=function(p){return sb(p,a)||(o?e.p:e)}}}return aa(n,s)},nM=function(e,t,n){var r=e.labels,s=vr,o,a,l;for(o in r)a=r[o]-t,a<0==!!n&&a&&s>(a=Math.abs(a))&&(l=o,s=a);return l},nr=function(e,t,n){var r=e.vars,s=r[t],o=Jt,a=e._ctx,l,c,u;if(s)return l=r[t+"Params"],c=r.callbackScope||e,n&&jo.length&&wm(),a&&(Jt=a),u=l?s.apply(c,l):s.call(c),Jt=o,u},Gu=function(e){return na(e),e.scrollTrigger&&e.scrollTrigger.kill(!!ti),e.progress()<1&&nr(e,"onInterrupt"),e},cc,ZC=[],JC=function(e){if(e)if(e=!e.name&&e.default||e,jx()||e.headless){var t=e.name,n=un(e),r=t&&!n&&e.init?function(){this._props=[]}:e,s={init:ih,render:sb,add:tb,kill:Ek,modifier:Mk,rawVars:0},o={targetTest:0,get:0,getSetter:rb,aliases:{},register:0};if(qc(),e!==r){if(Yi[t])return;Mr(r,Mr(Mm(e,s),o)),fl(r.prototype,fl(s,Mm(e,o))),Yi[r.prop=t]=r,e.targetTest&&(Vp.push(r),Jx[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}FC(t,r),e.register&&e.register(Ni,r,Ii)}else ZC.push(e)},Gt=255,Wu={aqua:[0,Gt,Gt],lime:[0,Gt,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,Gt],navy:[0,0,128],white:[Gt,Gt,Gt],olive:[128,128,0],yellow:[Gt,Gt,0],orange:[Gt,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[Gt,0,0],pink:[Gt,192,203],cyan:[0,Gt,Gt],transparent:[Gt,Gt,Gt,0]},t0=function(e,t,n){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(n-t)*e*6:e<.5?n:e*3<2?t+(n-t)*(2/3-e)*6:t)*Gt+.5|0},QC=function(e,t,n){var r=e?Zs(e)?[e>>16,e>>8&Gt,e&Gt]:0:Wu.black,s,o,a,l,c,u,h,d,f,p;if(!r){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),Wu[e])r=Wu[e];else if(e.charAt(0)==="#"){if(e.length<6&&(s=e.charAt(1),o=e.charAt(2),a=e.charAt(3),e="#"+s+s+o+o+a+a+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return r=parseInt(e.substr(1,6),16),[r>>16,r>>8&Gt,r&Gt,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),r=[e>>16,e>>8&Gt,e&Gt]}else if(e.substr(0,3)==="hsl"){if(r=p=e.match(nv),!t)l=+r[0]%360/360,c=+r[1]/100,u=+r[2]/100,o=u<=.5?u*(c+1):u+c-u*c,s=u*2-o,r.length>3&&(r[3]*=1),r[0]=t0(l+1/3,s,o),r[1]=t0(l,s,o),r[2]=t0(l-1/3,s,o);else if(~e.indexOf("="))return r=e.match(DC),n&&r.length<4&&(r[3]=1),r}else r=e.match(nv)||Wu.transparent;r=r.map(Number)}return t&&!p&&(s=r[0]/Gt,o=r[1]/Gt,a=r[2]/Gt,h=Math.max(s,o,a),d=Math.min(s,o,a),u=(h+d)/2,h===d?l=c=0:(f=h-d,c=u>.5?f/(2-h-d):f/(h+d),l=h===s?(o-a)/f+(o<a?6:0):h===o?(a-s)/f+2:(s-o)/f+4,l*=60),r[0]=~~(l+.5),r[1]=~~(c*100+.5),r[2]=~~(u*100+.5)),n&&r.length<4&&(r[3]=1),r},eD=function(e){var t=[],n=[],r=-1;return e.split(Ko).forEach(function(s){var o=s.match(lc)||[];t.push.apply(t,o),n.push(r+=o.length+1)}),t.c=n,t},iM=function(e,t,n){var r="",s=(e+r).match(Ko),o=t?"hsla(":"rgba(",a=0,l,c,u,h;if(!s)return e;if(s=s.map(function(d){return(d=QC(d,t,1))&&o+(t?d[0]+","+d[1]+"%,"+d[2]+"%,"+d[3]:d.join(","))+")"}),n&&(u=eD(e),l=n.c,l.join(r)!==u.c.join(r)))for(c=e.replace(Ko,"1").split(lc),h=c.length-1;a<h;a++)r+=c[a]+(~l.indexOf(a)?s.shift()||o+"0,0,0,0)":(u.length?u:s.length?s:n).shift());if(!c)for(c=e.split(Ko),h=c.length-1;a<h;a++)r+=c[a]+s[a];return r+c[h]},Ko=function(){var i="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in Wu)i+="|"+e+"\\b";return new RegExp(i+")","gi")}(),uk=/hsl[a]?\(/,tD=function(e){var t=e.join(" "),n;if(Ko.lastIndex=0,Ko.test(t))return n=uk.test(t),e[1]=iM(e[1],n),e[0]=iM(e[0],n,eD(e[1])),!0},sh,Zi=function(){var i=Date.now,e=500,t=33,n=i(),r=n,s=1e3/240,o=s,a=[],l,c,u,h,d,f,p=function m(g){var _=i()-r,x=g===!0,y,v,w,T;if((_>e||_<0)&&(n+=_-t),r+=_,w=r-n,y=w-o,(y>0||x)&&(T=++h.frame,d=w-h.time*1e3,h.time=w=w/1e3,o+=y+(y>=s?4:s-y),v=1),x||(l=c(m)),v)for(f=0;f<a.length;f++)a[f](w,d,T,g)};return h={time:0,frame:0,tick:function(){p(!0)},deltaRatio:function(g){return d/(1e3/(g||60))},wake:function(){IC&&(!iv&&jx()&&(Qr=iv=window,Kx=Qr.document||{},ar.gsap=Ni,(Qr.gsapVersions||(Qr.gsapVersions=[])).push(Ni.version),LC(Sm||Qr.GreenSockGlobals||!Qr.gsap&&Qr||{}),ZC.forEach(JC)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&h.sleep(),c=u||function(g){return setTimeout(g,o-h.time*1e3+1|0)},sh=1,p(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(l),sh=0,c=ih},lagSmoothing:function(g,_){e=g||1/0,t=Math.min(_||33,e)},fps:function(g){s=1e3/(g||240),o=h.time*1e3+s},add:function(g,_,x){var y=_?function(v,w,T,A){g(v,w,T,A),h.remove(y)}:g;return h.remove(g),a[x?"unshift":"push"](y),qc(),y},remove:function(g,_){~(_=a.indexOf(g))&&a.splice(_,1)&&f>=_&&f--},_listeners:a},h}(),qc=function(){return!sh&&Zi.wake()},Mt={},fk=/^[\d.\-M][\d.\-,\s]/,hk=/["']/g,dk=function(e){for(var t={},n=e.substr(1,e.length-3).split(":"),r=n[0],s=1,o=n.length,a,l,c;s<o;s++)l=n[s],a=s!==o-1?l.lastIndexOf(","):l.length,c=l.substr(0,a),t[r]=isNaN(c)?c.replace(hk,"").trim():+c,r=l.substr(a+1).trim();return t},pk=function(e){var t=e.indexOf("(")+1,n=e.indexOf(")"),r=e.indexOf("(",t);return e.substring(t,~r&&r<n?e.indexOf(")",n+1):n)},mk=function(e){var t=(e+"").split("("),n=Mt[t[0]];return n&&t.length>1&&n.config?n.config.apply(null,~e.indexOf("{")?[dk(t[1])]:pk(e).split(",").map(kC)):Mt._CE&&fk.test(e)?Mt._CE("",e):n},nD=function(e){return function(t){return 1-e(1-t)}},iD=function i(e,t){for(var n=e._first,r;n;)n instanceof mi?i(n,t):n.vars.yoyoEase&&(!n._yoyo||!n._repeat)&&n._yoyo!==t&&(n.timeline?i(n.timeline,t):(r=n._ease,n._ease=n._yEase,n._yEase=r,n._yoyo=t)),n=n._next},Za=function(e,t){return e&&(un(e)?e:Mt[e]||mk(e))||t},wl=function(e,t,n,r){n===void 0&&(n=function(l){return 1-t(1-l)}),r===void 0&&(r=function(l){return l<.5?t(l*2)/2:1-t((1-l)*2)/2});var s={easeIn:t,easeOut:n,easeInOut:r},o;return Pi(e,function(a){Mt[a]=ar[a]=s,Mt[o=a.toLowerCase()]=n;for(var l in s)Mt[o+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=Mt[a+"."+l]=s[l]}),s},rD=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},n0=function i(e,t,n){var r=t>=1?t:1,s=(n||(e?.3:.45))/(t<1?t:1),o=s/tv*(Math.asin(1/r)||0),a=function(u){return u===1?1:r*Math.pow(2,-10*u)*GU((u-o)*s)+1},l=e==="out"?a:e==="in"?function(c){return 1-a(1-c)}:rD(a);return s=tv/s,l.config=function(c,u){return i(e,c,u)},l},i0=function i(e,t){t===void 0&&(t=1.70158);var n=function(o){return o?--o*o*((t+1)*o+t)+1:0},r=e==="out"?n:e==="in"?function(s){return 1-n(1-s)}:rD(n);return r.config=function(s){return i(e,s)},r};Pi("Linear,Quad,Cubic,Quart,Quint,Strong",function(i,e){var t=e<5?e+1:e;wl(i+",Power"+(t-1),e?function(n){return Math.pow(n,t)}:function(n){return n},function(n){return 1-Math.pow(1-n,t)},function(n){return n<.5?Math.pow(n*2,t)/2:1-Math.pow((1-n)*2,t)/2})});Mt.Linear.easeNone=Mt.none=Mt.Linear.easeIn;wl("Elastic",n0("in"),n0("out"),n0());(function(i,e){var t=1/e,n=2*t,r=2.5*t,s=function(a){return a<t?i*a*a:a<n?i*Math.pow(a-1.5/e,2)+.75:a<r?i*(a-=2.25/e)*a+.9375:i*Math.pow(a-2.625/e,2)+.984375};wl("Bounce",function(o){return 1-s(1-o)},s)})(7.5625,2.75);wl("Expo",function(i){return i?Math.pow(2,10*(i-1)):0});wl("Circ",function(i){return-(AC(1-i*i)-1)});wl("Sine",function(i){return i===1?1:-VU(i*zU)+1});wl("Back",i0("in"),i0("out"),i0());Mt.SteppedEase=Mt.steps=ar.SteppedEase={config:function(e,t){e===void 0&&(e=1);var n=1/e,r=e+(t?0:1),s=t?1:0,o=1-qt;return function(a){return((r*$h(0,o,a)|0)+s)*n}}};Wc.ease=Mt["quad.out"];Pi("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(i){return Qx+=i+","+i+"Params,"});var sD=function(e,t){this.id=HU++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:NC,this.set=t?t.getSetter:rb},oh=function(){function i(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,$c(this,+t.duration,1,1),this.data=t.data,Jt&&(this._ctx=Jt,Jt.data.push(this)),sh||Zi.wake()}var e=i.prototype;return e.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},e.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},e.totalDuration=function(n){return arguments.length?(this._dirty=0,$c(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(n,r){if(qc(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(Gg(this,n),!s._dp||s.parent||HC(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&rs(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!r||this._initted&&Math.abs(this._zTime)===qt||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),UC(this,n,r)),this},e.time=function(n,r){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+eM(this))%(this._dur+this._rDelay)||(n?this._dur:0),r):this._time},e.totalProgress=function(n,r){return arguments.length?this.totalTime(this.totalDuration()*n,r):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>0?1:0},e.progress=function(n,r){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+eM(this),r):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(n,r){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*s,r):this._repeat?Xc(this._tTime,s)+1:1},e.timeScale=function(n,r){if(!arguments.length)return this._rts===-qt?0:this._rts;if(this._rts===n)return this;var s=this.parent&&this._ts?Em(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-qt?0:this._rts,this.totalTime($h(-Math.abs(this._delay),this._tDur,s),r!==!1),Vg(this),KU(this)},e.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(qc(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==qt&&(this._tTime-=qt)))),this):this._ps},e.startTime=function(n){if(arguments.length){this._start=n;var r=this.parent||this._dp;return r&&(r._sort||!this.parent)&&rs(r,this,n-this._delay),this}return this._start},e.endTime=function(n){return this._start+(Ri(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(n){var r=this.parent||this._dp;return r?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Em(r.rawTime(n),this):this._tTime:this._tTime},e.revert=function(n){n===void 0&&(n=$U);var r=ti;return ti=n,(this._initted||this._startAt)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),ti=r,this},e.globalTime=function(n){for(var r=this,s=arguments.length?n:r.rawTime();r;)s=r._start+s/(Math.abs(r._ts)||1),r=r._dp;return!this.parent&&this._sat?this._sat.globalTime(n):s},e.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,tM(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(n){if(arguments.length){var r=this._time;return this._rDelay=n,tM(this),r?this.time(r):this}return this._rDelay},e.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},e.seek=function(n,r){return this.totalTime(pr(this,n),Ri(r))},e.restart=function(n,r){return this.play().totalTime(n?-this._delay:0,Ri(r))},e.play=function(n,r){return n!=null&&this.seek(n,r),this.reversed(!1).paused(!1)},e.reverse=function(n,r){return n!=null&&this.seek(n||this.totalDuration(),r),this.reversed(!0).paused(!1)},e.pause=function(n,r){return n!=null&&this.seek(n,r),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-qt:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-qt,this},e.isActive=function(){var n=this.parent||this._dp,r=this._start,s;return!!(!n||this._ts&&this._initted&&n.isActive()&&(s=n.rawTime(!0))>=r&&s<this.endTime(!0)-qt)},e.eventCallback=function(n,r,s){var o=this.vars;return arguments.length>1?(r?(o[n]=r,s&&(o[n+"Params"]=s),n==="onUpdate"&&(this._onUpdate=r)):delete o[n],this):o[n]},e.then=function(n){var r=this;return new Promise(function(s){var o=un(n)?n:BC,a=function(){var c=r.then;r.then=null,un(o)&&(o=o(r))&&(o.then||o===r)&&(r.then=c),s(o),r.then=c};r._initted&&r.totalProgress()===1&&r._ts>=0||!r._tTime&&r._ts<0?a():r._prom=a})},e.kill=function(){Gu(this)},i}();Mr(oh.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-qt,_prom:0,_ps:!1,_rts:1});var mi=function(i){TC(e,i);function e(n,r){var s;return n===void 0&&(n={}),s=i.call(this,n)||this,s.labels={},s.smoothChildTiming=!!n.smoothChildTiming,s.autoRemoveChildren=!!n.autoRemoveChildren,s._sort=Ri(n.sortChildren),tn&&rs(n.parent||tn,Cs(s),r),n.reversed&&s.reverse(),n.paused&&s.paused(!0),n.scrollTrigger&&VC(Cs(s),n.scrollTrigger),s}var t=e.prototype;return t.to=function(r,s,o){return gf(0,arguments,this),this},t.from=function(r,s,o){return gf(1,arguments,this),this},t.fromTo=function(r,s,o,a){return gf(2,arguments,this),this},t.set=function(r,s,o){return s.duration=0,s.parent=this,mf(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new xn(r,s,pr(this,o),1),this},t.call=function(r,s,o){return rs(this,xn.delayedCall(0,r,s),o)},t.staggerTo=function(r,s,o,a,l,c,u){return o.duration=s,o.stagger=o.stagger||a,o.onComplete=c,o.onCompleteParams=u,o.parent=this,new xn(r,o,pr(this,l)),this},t.staggerFrom=function(r,s,o,a,l,c,u){return o.runBackwards=1,mf(o).immediateRender=Ri(o.immediateRender),this.staggerTo(r,s,o,a,l,c,u)},t.staggerFromTo=function(r,s,o,a,l,c,u,h){return a.startAt=o,mf(a).immediateRender=Ri(a.immediateRender),this.staggerTo(r,s,a,l,c,u,h)},t.render=function(r,s,o){var a=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,u=r<=0?0:Nn(r),h=this._zTime<0!=r<0&&(this._initted||!c),d,f,p,m,g,_,x,y,v,w,T,A;if(this!==tn&&u>l&&r>=0&&(u=l),u!==this._tTime||o||h){if(a!==this._time&&c&&(u+=this._time-a,r+=this._time-a),d=u,v=this._start,y=this._ts,_=!y,h&&(c||(a=this._zTime),(r||!s)&&(this._zTime=r)),this._repeat){if(T=this._yoyo,g=c+this._rDelay,this._repeat<-1&&r<0)return this.totalTime(g*100+r,s,o);if(d=Nn(u%g),u===l?(m=this._repeat,d=c):(m=~~(u/g),m&&m===u/g&&(d=c,m--),d>c&&(d=c)),w=Xc(this._tTime,g),!a&&this._tTime&&w!==m&&this._tTime-w*g-this._dur<=0&&(w=m),T&&m&1&&(d=c-d,A=1),m!==w&&!this._lock){var C=T&&w&1,M=C===(T&&m&1);if(m<w&&(C=!C),a=C?0:u%c?c:u,this._lock=1,this.render(a||(A?0:Nn(m*g)),s,!c)._lock=0,this._tTime=u,!s&&this.parent&&nr(this,"onRepeat"),this.vars.repeatRefresh&&!A&&(this.invalidate()._lock=1),a&&a!==this._time||_!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,M&&(this._lock=2,a=C?c:-1e-4,this.render(a,!0),this.vars.repeatRefresh&&!A&&this.invalidate()),this._lock=0,!this._ts&&!_)return this;iD(this,A)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(x=ek(this,Nn(a),Nn(d)),x&&(u-=d-(d=x._start))),this._tTime=u,this._time=d,this._act=!y,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=r,a=0),!a&&d&&!s&&!m&&(nr(this,"onStart"),this._tTime!==u))return this;if(d>=a&&r>=0)for(f=this._first;f;){if(p=f._next,(f._act||d>=f._start)&&f._ts&&x!==f){if(f.parent!==this)return this.render(r,s,o);if(f.render(f._ts>0?(d-f._start)*f._ts:(f._dirty?f.totalDuration():f._tDur)+(d-f._start)*f._ts,s,o),d!==this._time||!this._ts&&!_){x=0,p&&(u+=this._zTime=-qt);break}}f=p}else{f=this._last;for(var b=r<0?r:d;f;){if(p=f._prev,(f._act||b<=f._end)&&f._ts&&x!==f){if(f.parent!==this)return this.render(r,s,o);if(f.render(f._ts>0?(b-f._start)*f._ts:(f._dirty?f.totalDuration():f._tDur)+(b-f._start)*f._ts,s,o||ti&&(f._initted||f._startAt)),d!==this._time||!this._ts&&!_){x=0,p&&(u+=this._zTime=b?-qt:qt);break}}f=p}}if(x&&!s&&(this.pause(),x.render(d>=a?0:-qt)._zTime=d>=a?1:-1,this._ts))return this._start=v,Vg(this),this.render(r,s,o);this._onUpdate&&!s&&nr(this,"onUpdate",!0),(u===l&&this._tTime>=this.totalDuration()||!u&&a)&&(v===this._start||Math.abs(y)!==Math.abs(this._ts))&&(this._lock||((r||!c)&&(u===l&&this._ts>0||!u&&this._ts<0)&&na(this,1),!s&&!(r<0&&!a)&&(u||a||!l)&&(nr(this,u===l&&r>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(r,s){var o=this;if(Zs(s)||(s=pr(this,s,r)),!(r instanceof oh)){if(ni(r))return r.forEach(function(a){return o.add(a,s)}),this;if(Bn(r))return this.addLabel(r,s);if(un(r))r=xn.delayedCall(0,r);else return this}return this!==r?rs(this,r,s):this},t.getChildren=function(r,s,o,a){r===void 0&&(r=!0),s===void 0&&(s=!0),o===void 0&&(o=!0),a===void 0&&(a=-vr);for(var l=[],c=this._first;c;)c._start>=a&&(c instanceof xn?s&&l.push(c):(o&&l.push(c),r&&l.push.apply(l,c.getChildren(!0,s,o)))),c=c._next;return l},t.getById=function(r){for(var s=this.getChildren(1,1,1),o=s.length;o--;)if(s[o].vars.id===r)return s[o]},t.remove=function(r){return Bn(r)?this.removeLabel(r):un(r)?this.killTweensOf(r):(Hg(this,r),r===this._recent&&(this._recent=this._last),Ka(this))},t.totalTime=function(r,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=Nn(Zi.time-(this._ts>0?r/this._ts:(this.totalDuration()-r)/-this._ts))),i.prototype.totalTime.call(this,r,s),this._forcing=0,this):this._tTime},t.addLabel=function(r,s){return this.labels[r]=pr(this,s),this},t.removeLabel=function(r){return delete this.labels[r],this},t.addPause=function(r,s,o){var a=xn.delayedCall(0,s||ih,o);return a.data="isPause",this._hasPause=1,rs(this,a,pr(this,r))},t.removePause=function(r){var s=this._first;for(r=pr(this,r);s;)s._start===r&&s.data==="isPause"&&na(s),s=s._next},t.killTweensOf=function(r,s,o){for(var a=this.getTweensOf(r,o),l=a.length;l--;)zo!==a[l]&&a[l].kill(r,s);return this},t.getTweensOf=function(r,s){for(var o=[],a=xr(r),l=this._first,c=Zs(s),u;l;)l instanceof xn?qU(l._targets,a)&&(c?(!zo||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&o.push(l):(u=l.getTweensOf(a,s)).length&&o.push.apply(o,u),l=l._next;return o},t.tweenTo=function(r,s){s=s||{};var o=this,a=pr(o,r),l=s,c=l.startAt,u=l.onStart,h=l.onStartParams,d=l.immediateRender,f,p=xn.to(o,Mr({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:a,overwrite:"auto",duration:s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale())||qt,onStart:function(){if(o.pause(),!f){var g=s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale());p._dur!==g&&$c(p,g,0,1).render(p._time,!0,!0),f=1}u&&u.apply(p,h||[])}},s));return d?p.render(0):p},t.tweenFromTo=function(r,s,o){return this.tweenTo(s,Mr({startAt:{time:pr(this,r)}},o))},t.recent=function(){return this._recent},t.nextLabel=function(r){return r===void 0&&(r=this._time),nM(this,pr(this,r))},t.previousLabel=function(r){return r===void 0&&(r=this._time),nM(this,pr(this,r),1)},t.currentLabel=function(r){return arguments.length?this.seek(r,!0):this.previousLabel(this._time+qt)},t.shiftChildren=function(r,s,o){o===void 0&&(o=0);for(var a=this._first,l=this.labels,c;a;)a._start>=o&&(a._start+=r,a._end+=r),a=a._next;if(s)for(c in l)l[c]>=o&&(l[c]+=r);return Ka(this)},t.invalidate=function(r){var s=this._first;for(this._lock=0;s;)s.invalidate(r),s=s._next;return i.prototype.invalidate.call(this,r)},t.clear=function(r){r===void 0&&(r=!0);for(var s=this._first,o;s;)o=s._next,this.remove(s),s=o;return this._dp&&(this._time=this._tTime=this._pTime=0),r&&(this.labels={}),Ka(this)},t.totalDuration=function(r){var s=0,o=this,a=o._last,l=vr,c,u,h;if(arguments.length)return o.timeScale((o._repeat<0?o.duration():o.totalDuration())/(o.reversed()?-r:r));if(o._dirty){for(h=o.parent;a;)c=a._prev,a._dirty&&a.totalDuration(),u=a._start,u>l&&o._sort&&a._ts&&!o._lock?(o._lock=1,rs(o,a,u-a._delay,1)._lock=0):l=u,u<0&&a._ts&&(s-=u,(!h&&!o._dp||h&&h.smoothChildTiming)&&(o._start+=u/o._ts,o._time-=u,o._tTime-=u),o.shiftChildren(-u,!1,-1/0),l=0),a._end>s&&a._ts&&(s=a._end),a=c;$c(o,o===tn&&o._time>s?o._time:s,1,1),o._dirty=0}return o._tDur},e.updateRoot=function(r){if(tn._ts&&(UC(tn,Em(r,tn)),OC=Zi.frame),Zi.frame>=Jw){Jw+=rr.autoSleep||120;var s=tn._first;if((!s||!s._ts)&&rr.autoSleep&&Zi._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||Zi.sleep()}}},e}(oh);Mr(mi.prototype,{_lock:0,_hasPause:0,_forcing:0});var gk=function(e,t,n,r,s,o,a){var l=new Ii(this._pt,e,t,0,1,fD,null,s),c=0,u=0,h,d,f,p,m,g,_,x;for(l.b=n,l.e=r,n+="",r+="",(_=~r.indexOf("random("))&&(r=rh(r)),o&&(x=[n,r],o(x,e,t),n=x[0],r=x[1]),d=n.match(Q_)||[];h=Q_.exec(r);)p=h[0],m=r.substring(c,h.index),f?f=(f+1)%5:m.substr(-5)==="rgba("&&(f=1),p!==d[u++]&&(g=parseFloat(d[u-1])||0,l._pt={_next:l._pt,p:m||u===1?m:",",s:g,c:p.charAt(1)==="="?Ec(g,p)-g:parseFloat(p)-g,m:f&&f<4?Math.round:0},c=Q_.lastIndex);return l.c=c<r.length?r.substring(c,r.length):"",l.fp=a,(RC.test(r)||_)&&(l.e=0),this._pt=l,l},tb=function(e,t,n,r,s,o,a,l,c,u){un(r)&&(r=r(s||0,e,o));var h=e[t],d=n!=="get"?n:un(h)?c?e[t.indexOf("set")||!un(e["get"+t.substr(3)])?t:"get"+t.substr(3)](c):e[t]():h,f=un(h)?c?bk:cD:ib,p;if(Bn(r)&&(~r.indexOf("random(")&&(r=rh(r)),r.charAt(1)==="="&&(p=Ec(d,r)+(ei(d)||0),(p||p===0)&&(r=p))),!u||d!==r||uv)return!isNaN(d*r)&&r!==""?(p=new Ii(this._pt,e,t,+d||0,r-(d||0),typeof h=="boolean"?wk:uD,0,f),c&&(p.fp=c),a&&p.modifier(a,this,e),this._pt=p):(!h&&!(t in e)&&Zx(t,r),gk.call(this,e,t,d,r,f,l||rr.stringFilter,c))},_k=function(e,t,n,r,s){if(un(e)&&(e=_f(e,s,t,n,r)),!ps(e)||e.style&&e.nodeType||ni(e)||CC(e))return Bn(e)?_f(e,s,t,n,r):e;var o={},a;for(a in e)o[a]=_f(e[a],s,t,n,r);return o},oD=function(e,t,n,r,s,o){var a,l,c,u;if(Yi[e]&&(a=new Yi[e]).init(s,a.rawVars?t[e]:_k(t[e],r,s,o,n),n,r,o)!==!1&&(n._pt=l=new Ii(n._pt,s,e,0,1,a.render,a,0,a.priority),n!==cc))for(c=n._ptLookup[n._targets.indexOf(s)],u=a._props.length;u--;)c[a._props[u]]=l;return a},zo,uv,nb=function i(e,t,n){var r=e.vars,s=r.ease,o=r.startAt,a=r.immediateRender,l=r.lazy,c=r.onUpdate,u=r.runBackwards,h=r.yoyoEase,d=r.keyframes,f=r.autoRevert,p=e._dur,m=e._startAt,g=e._targets,_=e.parent,x=_&&_.data==="nested"?_.vars.targets:g,y=e._overwrite==="auto"&&!qx,v=e.timeline,w,T,A,C,M,b,R,L,F,H,W,N,$;if(v&&(!d||!s)&&(s="none"),e._ease=Za(s,Wc.ease),e._yEase=h?nD(Za(h===!0?s:h,Wc.ease)):0,h&&e._yoyo&&!e._repeat&&(h=e._yEase,e._yEase=e._ease,e._ease=h),e._from=!v&&!!r.runBackwards,!v||d&&!r.stagger){if(L=g[0]?ja(g[0]).harness:0,N=L&&r[L.prop],w=Mm(r,Jx),m&&(m._zTime<0&&m.progress(1),t<0&&u&&a&&!f?m.render(-1,!0):m.revert(u&&p?Hp:XU),m._lazy=0),o){if(na(e._startAt=xn.set(g,Mr({data:"isStart",overwrite:!1,parent:_,immediateRender:!0,lazy:!m&&Ri(l),startAt:null,delay:0,onUpdate:c&&function(){return nr(e,"onUpdate")},stagger:0},o))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(ti||!a&&!f)&&e._startAt.revert(Hp),a&&p&&t<=0&&n<=0){t&&(e._zTime=t);return}}else if(u&&p&&!m){if(t&&(a=!1),A=Mr({overwrite:!1,data:"isFromStart",lazy:a&&!m&&Ri(l),immediateRender:a,stagger:0,parent:_},w),N&&(A[L.prop]=N),na(e._startAt=xn.set(g,A)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(ti?e._startAt.revert(Hp):e._startAt.render(-1,!0)),e._zTime=t,!a)i(e._startAt,qt,qt);else if(!t)return}for(e._pt=e._ptCache=0,l=p&&Ri(l)||l&&!p,T=0;T<g.length;T++){if(M=g[T],R=M._gsap||eb(g)[T]._gsap,e._ptLookup[T]=H={},rv[R.id]&&jo.length&&wm(),W=x===g?T:x.indexOf(M),L&&(F=new L).init(M,N||w,e,W,x)!==!1&&(e._pt=C=new Ii(e._pt,M,F.name,0,1,F.render,F,0,F.priority),F._props.forEach(function(X){H[X]=C}),F.priority&&(b=1)),!L||N)for(A in w)Yi[A]&&(F=oD(A,w,e,W,M,x))?F.priority&&(b=1):H[A]=C=tb.call(e,M,A,"get",w[A],W,x,0,r.stringFilter);e._op&&e._op[T]&&e.kill(M,e._op[T]),y&&e._pt&&(zo=e,tn.killTweensOf(M,H,e.globalTime(t)),$=!e.parent,zo=0),e._pt&&l&&(rv[R.id]=1)}b&&hD(e),e._onInit&&e._onInit(e)}e._onUpdate=c,e._initted=(!e._op||e._pt)&&!$,d&&t<=0&&v.render(vr,!0,!0)},yk=function(e,t,n,r,s,o,a,l){var c=(e._pt&&e._ptCache||(e._ptCache={}))[t],u,h,d,f;if(!c)for(c=e._ptCache[t]=[],d=e._ptLookup,f=e._targets.length;f--;){if(u=d[f][t],u&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==t&&u.fp!==t;)u=u._next;if(!u)return uv=1,e.vars[t]="+=0",nb(e,a),uv=0,l?nh(t+" not eligible for reset"):1;c.push(u)}for(f=c.length;f--;)h=c[f],u=h._pt||h,u.s=(r||r===0)&&!s?r:u.s+(r||0)+o*u.c,u.c=n-u.s,h.e&&(h.e=pn(n)+ei(h.e)),h.b&&(h.b=u.s+ei(h.b))},vk=function(e,t){var n=e[0]?ja(e[0]).harness:0,r=n&&n.aliases,s,o,a,l;if(!r)return t;s=fl({},t);for(o in r)if(o in s)for(l=r[o].split(","),a=l.length;a--;)s[l[a]]=s[o];return s},xk=function(e,t,n,r){var s=t.ease||r||"power1.inOut",o,a;if(ni(t))a=n[e]||(n[e]=[]),t.forEach(function(l,c){return a.push({t:c/(t.length-1)*100,v:l,e:s})});else for(o in t)a=n[o]||(n[o]=[]),o==="ease"||a.push({t:parseFloat(e),v:t[o],e:s})},_f=function(e,t,n,r,s){return un(e)?e.call(t,n,r,s):Bn(e)&&~e.indexOf("random(")?rh(e):e},aD=Qx+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",lD={};Pi(aD+",id,stagger,delay,duration,paused,scrollTrigger",function(i){return lD[i]=1});var xn=function(i){TC(e,i);function e(n,r,s,o){var a;typeof r=="number"&&(s.duration=r,r=s,s=null),a=i.call(this,o?r:mf(r))||this;var l=a.vars,c=l.duration,u=l.delay,h=l.immediateRender,d=l.stagger,f=l.overwrite,p=l.keyframes,m=l.defaults,g=l.scrollTrigger,_=l.yoyoEase,x=r.parent||tn,y=(ni(n)||CC(n)?Zs(n[0]):"length"in r)?[n]:xr(n),v,w,T,A,C,M,b,R;if(a._targets=y.length?eb(y):nh("GSAP target "+n+" not found. https://gsap.com",!rr.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=f,p||d||xd(c)||xd(u)){if(r=a.vars,v=a.timeline=new mi({data:"nested",defaults:m||{},targets:x&&x.data==="nested"?x.vars.targets:y}),v.kill(),v.parent=v._dp=Cs(a),v._start=0,d||xd(c)||xd(u)){if(A=y.length,b=d&&$C(d),ps(d))for(C in d)~aD.indexOf(C)&&(R||(R={}),R[C]=d[C]);for(w=0;w<A;w++)T=Mm(r,lD),T.stagger=0,_&&(T.yoyoEase=_),R&&fl(T,R),M=y[w],T.duration=+_f(c,Cs(a),w,M,y),T.delay=(+_f(u,Cs(a),w,M,y)||0)-a._delay,!d&&A===1&&T.delay&&(a._delay=u=T.delay,a._start+=u,T.delay=0),v.to(M,T,b?b(w,M,y):0),v._ease=Mt.none;v.duration()?c=u=0:a.timeline=0}else if(p){mf(Mr(v.vars.defaults,{ease:"none"})),v._ease=Za(p.ease||r.ease||"none");var L=0,F,H,W;if(ni(p))p.forEach(function(N){return v.to(y,N,">")}),v.duration();else{T={};for(C in p)C==="ease"||C==="easeEach"||xk(C,p[C],T,p.easeEach);for(C in T)for(F=T[C].sort(function(N,$){return N.t-$.t}),L=0,w=0;w<F.length;w++)H=F[w],W={ease:H.e,duration:(H.t-(w?F[w-1].t:0))/100*c},W[C]=H.v,v.to(y,W,L),L+=W.duration;v.duration()<c&&v.to({},{duration:c-v.duration()})}}c||a.duration(c=v.duration())}else a.timeline=0;return f===!0&&!qx&&(zo=Cs(a),tn.killTweensOf(y),zo=0),rs(x,Cs(a),s),r.reversed&&a.reverse(),r.paused&&a.paused(!0),(h||!c&&!p&&a._start===Nn(x._time)&&Ri(h)&&ZU(Cs(a))&&x.data!=="nested")&&(a._tTime=-qt,a.render(Math.max(0,-u)||0)),g&&VC(Cs(a),g),a}var t=e.prototype;return t.render=function(r,s,o){var a=this._time,l=this._tDur,c=this._dur,u=r<0,h=r>l-qt&&!u?l:r<qt?0:r,d,f,p,m,g,_,x,y,v;if(!c)QU(this,r,s,o);else if(h!==this._tTime||!r||o||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u){if(d=h,y=this.timeline,this._repeat){if(m=c+this._rDelay,this._repeat<-1&&u)return this.totalTime(m*100+r,s,o);if(d=Nn(h%m),h===l?(p=this._repeat,d=c):(p=~~(h/m),p&&p===Nn(h/m)&&(d=c,p--),d>c&&(d=c)),_=this._yoyo&&p&1,_&&(v=this._yEase,d=c-d),g=Xc(this._tTime,m),d===a&&!o&&this._initted&&p===g)return this._tTime=h,this;p!==g&&(y&&this._yEase&&iD(y,_),this.vars.repeatRefresh&&!_&&!this._lock&&this._time!==m&&this._initted&&(this._lock=o=1,this.render(Nn(m*p),!0).invalidate()._lock=0))}if(!this._initted){if(GC(this,u?r:d,o,s,h))return this._tTime=0,this;if(a!==this._time&&!(o&&this.vars.repeatRefresh&&p!==g))return this;if(c!==this._dur)return this.render(r,s,o)}if(this._tTime=h,this._time=d,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=x=(v||this._ease)(d/c),this._from&&(this.ratio=x=1-x),d&&!a&&!s&&!p&&(nr(this,"onStart"),this._tTime!==h))return this;for(f=this._pt;f;)f.r(x,f.d),f=f._next;y&&y.render(r<0?r:y._dur*y._ease(d/this._dur),s,o)||this._startAt&&(this._zTime=r),this._onUpdate&&!s&&(u&&sv(this,r,s,o),nr(this,"onUpdate")),this._repeat&&p!==g&&this.vars.onRepeat&&!s&&this.parent&&nr(this,"onRepeat"),(h===this._tDur||!h)&&this._tTime===h&&(u&&!this._onUpdate&&sv(this,r,!0,!0),(r||!c)&&(h===this._tDur&&this._ts>0||!h&&this._ts<0)&&na(this,1),!s&&!(u&&!a)&&(h||a||_)&&(nr(this,h===l?"onComplete":"onReverseComplete",!0),this._prom&&!(h<l&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(r){return(!r||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(r),i.prototype.invalidate.call(this,r)},t.resetTo=function(r,s,o,a,l){sh||Zi.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),u;return this._initted||nb(this,c),u=this._ease(c/this._dur),yk(this,r,s,o,a,u,c,l)?this.resetTo(r,s,o,a,1):(Gg(this,0),this.parent||zC(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(r,s){if(s===void 0&&(s="all"),!r&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?Gu(this):this;if(this.timeline){var o=this.timeline.totalDuration();return this.timeline.killTweensOf(r,s,zo&&zo.vars.overwrite!==!0)._first||Gu(this),this.parent&&o!==this.timeline.totalDuration()&&$c(this,this._dur*this.timeline._tDur/o,0,1),this}var a=this._targets,l=r?xr(r):a,c=this._ptLookup,u=this._pt,h,d,f,p,m,g,_;if((!s||s==="all")&&jU(a,l))return s==="all"&&(this._pt=0),Gu(this);for(h=this._op=this._op||[],s!=="all"&&(Bn(s)&&(m={},Pi(s,function(x){return m[x]=1}),s=m),s=vk(a,s)),_=a.length;_--;)if(~l.indexOf(a[_])){d=c[_],s==="all"?(h[_]=s,p=d,f={}):(f=h[_]=h[_]||{},p=s);for(m in p)g=d&&d[m],g&&((!("kill"in g.d)||g.d.kill(m)===!0)&&Hg(this,g,"_pt"),delete d[m]),f!=="all"&&(f[m]=1)}return this._initted&&!this._pt&&u&&Gu(this),this},e.to=function(r,s){return new e(r,s,arguments[2])},e.from=function(r,s){return gf(1,arguments)},e.delayedCall=function(r,s,o,a){return new e(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:r,onComplete:s,onReverseComplete:s,onCompleteParams:o,onReverseCompleteParams:o,callbackScope:a})},e.fromTo=function(r,s,o){return gf(2,arguments)},e.set=function(r,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new e(r,s)},e.killTweensOf=function(r,s,o){return tn.killTweensOf(r,s,o)},e}(oh);Mr(xn.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});Pi("staggerTo,staggerFrom,staggerFromTo",function(i){xn[i]=function(){var e=new mi,t=av.call(arguments,0);return t.splice(i==="staggerFromTo"?5:4,0,0),e[i].apply(e,t)}});var ib=function(e,t,n){return e[t]=n},cD=function(e,t,n){return e[t](n)},bk=function(e,t,n,r){return e[t](r.fp,n)},Sk=function(e,t,n){return e.setAttribute(t,n)},rb=function(e,t){return un(e[t])?cD:Yx(e[t])&&e.setAttribute?Sk:ib},uD=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},wk=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},fD=function(e,t){var n=t._pt,r="";if(!e&&t.b)r=t.b;else if(e===1&&t.e)r=t.e;else{for(;n;)r=n.p+(n.m?n.m(n.s+n.c*e):Math.round((n.s+n.c*e)*1e4)/1e4)+r,n=n._next;r+=t.c}t.set(t.t,t.p,r,t)},sb=function(e,t){for(var n=t._pt;n;)n.r(e,n.d),n=n._next},Mk=function(e,t,n,r){for(var s=this._pt,o;s;)o=s._next,s.p===r&&s.modifier(e,t,n),s=o},Ek=function(e){for(var t=this._pt,n,r;t;)r=t._next,t.p===e&&!t.op||t.op===e?Hg(this,t,"_pt"):t.dep||(n=1),t=r;return!n},Tk=function(e,t,n,r){r.mSet(e,t,r.m.call(r.tween,n,r.mt),r)},hD=function(e){for(var t=e._pt,n,r,s,o;t;){for(n=t._next,r=s;r&&r.pr>t.pr;)r=r._next;(t._prev=r?r._prev:o)?t._prev._next=t:s=t,(t._next=r)?r._prev=t:o=t,t=n}e._pt=s},Ii=function(){function i(t,n,r,s,o,a,l,c,u){this.t=n,this.s=s,this.c=o,this.p=r,this.r=a||uD,this.d=l||this,this.set=c||ib,this.pr=u||0,this._next=t,t&&(t._prev=this)}var e=i.prototype;return e.modifier=function(n,r,s){this.mSet=this.mSet||this.set,this.set=Tk,this.m=n,this.mt=s,this.tween=r},i}();Pi(Qx+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(i){return Jx[i]=1});ar.TweenMax=ar.TweenLite=xn;ar.TimelineLite=ar.TimelineMax=mi;tn=new mi({sortChildren:!1,defaults:Wc,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});rr.stringFilter=tD;var Ja=[],Gp={},Ak=[],rM=0,Ck=0,r0=function(e){return(Gp[e]||Ak).map(function(t){return t()})},fv=function(){var e=Date.now(),t=[];e-rM>2&&(r0("matchMediaInit"),Ja.forEach(function(n){var r=n.queries,s=n.conditions,o,a,l,c;for(a in r)o=Qr.matchMedia(r[a]).matches,o&&(l=1),o!==s[a]&&(s[a]=o,c=1);c&&(n.revert(),l&&t.push(n))}),r0("matchMediaRevert"),t.forEach(function(n){return n.onMatch(n,function(r){return n.add(null,r)})}),rM=e,r0("matchMedia"))},dD=function(){function i(t,n){this.selector=n&&lv(n),this.data=[],this._r=[],this.isReverted=!1,this.id=Ck++,t&&this.add(t)}var e=i.prototype;return e.add=function(n,r,s){un(n)&&(s=r,r=n,n=un);var o=this,a=function(){var c=Jt,u=o.selector,h;return c&&c!==o&&c.data.push(o),s&&(o.selector=lv(s)),Jt=o,h=r.apply(o,arguments),un(h)&&o._r.push(h),Jt=c,o.selector=u,o.isReverted=!1,h};return o.last=a,n===un?a(o,function(l){return o.add(null,l)}):n?o[n]=a:a},e.ignore=function(n){var r=Jt;Jt=null,n(this),Jt=r},e.getTweens=function(){var n=[];return this.data.forEach(function(r){return r instanceof i?n.push.apply(n,r.getTweens()):r instanceof xn&&!(r.parent&&r.parent.data==="nested")&&n.push(r)}),n},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(n,r){var s=this;if(n?function(){for(var a=s.getTweens(),l=s.data.length,c;l--;)c=s.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(u){return a.splice(a.indexOf(u),1)}));for(a.map(function(u){return{g:u._dur||u._delay||u._sat&&!u._sat.vars.immediateRender?u.globalTime(0):-1/0,t:u}}).sort(function(u,h){return h.g-u.g||-1/0}).forEach(function(u){return u.t.revert(n)}),l=s.data.length;l--;)c=s.data[l],c instanceof mi?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof xn)&&c.revert&&c.revert(n);s._r.forEach(function(u){return u(n,s)}),s.isReverted=!0}():this.data.forEach(function(a){return a.kill&&a.kill()}),this.clear(),r)for(var o=Ja.length;o--;)Ja[o].id===this.id&&Ja.splice(o,1)},e.revert=function(n){this.kill(n||{})},i}(),Dk=function(){function i(t){this.contexts=[],this.scope=t,Jt&&Jt.data.push(this)}var e=i.prototype;return e.add=function(n,r,s){ps(n)||(n={matches:n});var o=new dD(0,s||this.scope),a=o.conditions={},l,c,u;Jt&&!o.selector&&(o.selector=Jt.selector),this.contexts.push(o),r=o.add("onMatch",r),o.queries=n;for(c in n)c==="all"?u=1:(l=Qr.matchMedia(n[c]),l&&(Ja.indexOf(o)<0&&Ja.push(o),(a[c]=l.matches)&&(u=1),l.addListener?l.addListener(fv):l.addEventListener("change",fv)));return u&&r(o,function(h){return o.add(null,h)}),this},e.revert=function(n){this.kill(n||{})},e.kill=function(n){this.contexts.forEach(function(r){return r.kill(n,!0)})},i}(),Tm={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];t.forEach(function(r){return JC(r)})},timeline:function(e){return new mi(e)},getTweensOf:function(e,t){return tn.getTweensOf(e,t)},getProperty:function(e,t,n,r){Bn(e)&&(e=xr(e)[0]);var s=ja(e||{}).get,o=n?BC:kC;return n==="native"&&(n=""),e&&(t?o((Yi[t]&&Yi[t].get||s)(e,t,n,r)):function(a,l,c){return o((Yi[a]&&Yi[a].get||s)(e,a,l,c))})},quickSetter:function(e,t,n){if(e=xr(e),e.length>1){var r=e.map(function(u){return Ni.quickSetter(u,t,n)}),s=r.length;return function(u){for(var h=s;h--;)r[h](u)}}e=e[0]||{};var o=Yi[t],a=ja(e),l=a.harness&&(a.harness.aliases||{})[t]||t,c=o?function(u){var h=new o;cc._pt=0,h.init(e,n?u+n:u,cc,0,[e]),h.render(1,h),cc._pt&&sb(1,cc)}:a.set(e,l);return o?c:function(u){return c(e,l,n?u+n:u,a,1)}},quickTo:function(e,t,n){var r,s=Ni.to(e,fl((r={},r[t]="+=0.1",r.paused=!0,r),n||{})),o=function(l,c,u){return s.resetTo(t,l,c,u)};return o.tween=s,o},isTweening:function(e){return tn.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=Za(e.ease,Wc.ease)),Qw(Wc,e||{})},config:function(e){return Qw(rr,e||{})},registerEffect:function(e){var t=e.name,n=e.effect,r=e.plugins,s=e.defaults,o=e.extendTimeline;(r||"").split(",").forEach(function(a){return a&&!Yi[a]&&!ar[a]&&nh(t+" effect requires "+a+" plugin.")}),e0[t]=function(a,l,c){return n(xr(a),Mr(l||{},s),c)},o&&(mi.prototype[t]=function(a,l,c){return this.add(e0[t](a,ps(l)?l:(c=l)&&{},this),c)})},registerEase:function(e,t){Mt[e]=Za(t)},parseEase:function(e,t){return arguments.length?Za(e,t):Mt},getById:function(e){return tn.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var n=new mi(e),r,s;for(n.smoothChildTiming=Ri(e.smoothChildTiming),tn.remove(n),n._dp=0,n._time=n._tTime=tn._time,r=tn._first;r;)s=r._next,(t||!(!r._dur&&r instanceof xn&&r.vars.onComplete===r._targets[0]))&&rs(n,r,r._start-r._delay),r=s;return rs(tn,n,0),n},context:function(e,t){return e?new dD(e,t):Jt},matchMedia:function(e){return new Dk(e)},matchMediaRefresh:function(){return Ja.forEach(function(e){var t=e.conditions,n,r;for(r in t)t[r]&&(t[r]=!1,n=1);n&&e.revert()})||fv()},addEventListener:function(e,t){var n=Gp[e]||(Gp[e]=[]);~n.indexOf(t)||n.push(t)},removeEventListener:function(e,t){var n=Gp[e],r=n&&n.indexOf(t);r>=0&&n.splice(r,1)},utils:{wrap:ak,wrapYoyo:lk,distribute:$C,random:YC,snap:qC,normalize:ok,getUnit:ei,clamp:nk,splitColor:QC,toArray:xr,selector:lv,mapRange:KC,pipe:rk,unitize:sk,interpolate:ck,shuffle:XC},install:LC,effects:e0,ticker:Zi,updateRoot:mi.updateRoot,plugins:Yi,globalTimeline:tn,core:{PropTween:Ii,globals:FC,Tween:xn,Timeline:mi,Animation:oh,getCache:ja,_removeLinkedListItem:Hg,reverting:function(){return ti},context:function(e){return e&&Jt&&(Jt.data.push(e),e._ctx=Jt),Jt},suppressOverwrites:function(e){return qx=e}}};Pi("to,from,fromTo,delayedCall,set,killTweensOf",function(i){return Tm[i]=xn[i]});Zi.add(mi.updateRoot);cc=Tm.to({},{duration:0});var Rk=function(e,t){for(var n=e._pt;n&&n.p!==t&&n.op!==t&&n.fp!==t;)n=n._next;return n},Pk=function(e,t){var n=e._targets,r,s,o;for(r in t)for(s=n.length;s--;)o=e._ptLookup[s][r],o&&(o=o.d)&&(o._pt&&(o=Rk(o,r)),o&&o.modifier&&o.modifier(t[r],e,n[s],r))},s0=function(e,t){return{name:e,rawVars:1,init:function(r,s,o){o._onInit=function(a){var l,c;if(Bn(s)&&(l={},Pi(s,function(u){return l[u]=1}),s=l),t){l={};for(c in s)l[c]=t(s[c]);s=l}Pk(a,s)}}}},Ni=Tm.registerPlugin({name:"attr",init:function(e,t,n,r,s){var o,a,l;this.tween=n;for(o in t)l=e.getAttribute(o)||"",a=this.add(e,"setAttribute",(l||0)+"",t[o],r,s,0,0,o),a.op=o,a.b=l,this._props.push(o)},render:function(e,t){for(var n=t._pt;n;)ti?n.set(n.t,n.p,n.b,n):n.r(e,n.d),n=n._next}},{name:"endArray",init:function(e,t){for(var n=t.length;n--;)this.add(e,n,e[n]||0,t[n],0,0,0,0,0,1)}},s0("roundProps",cv),s0("modifiers"),s0("snap",qC))||Tm;xn.version=mi.version=Ni.version="3.12.5";IC=1;jx()&&qc();Mt.Power0;Mt.Power1;Mt.Power2;Mt.Power3;Mt.Power4;Mt.Linear;Mt.Quad;Mt.Cubic;Mt.Quart;Mt.Quint;Mt.Strong;Mt.Elastic;Mt.Back;Mt.SteppedEase;Mt.Bounce;Mt.Sine;Mt.Expo;Mt.Circ;/*!
 * CSSPlugin 3.12.5
 * https://gsap.com
 *
 * Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var sM,Ho,Tc,ob,za,oM,ab,Ik=function(){return typeof window<"u"},Js={},Pa=180/Math.PI,Ac=Math.PI/180,Rl=Math.atan2,aM=1e8,lb=/([A-Z])/g,Lk=/(left|right|width|margin|padding|x)/i,Fk=/[\s,\(]\S/,ss={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},hv=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},Ok=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},Nk=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},Uk=function(e,t){var n=t.s+t.c*e;t.set(t.t,t.p,~~(n+(n<0?-.5:.5))+t.u,t)},pD=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},mD=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},kk=function(e,t,n){return e.style[t]=n},Bk=function(e,t,n){return e.style.setProperty(t,n)},zk=function(e,t,n){return e._gsap[t]=n},Hk=function(e,t,n){return e._gsap.scaleX=e._gsap.scaleY=n},Vk=function(e,t,n,r,s){var o=e._gsap;o.scaleX=o.scaleY=n,o.renderTransform(s,o)},Gk=function(e,t,n,r,s){var o=e._gsap;o[t]=n,o.renderTransform(s,o)},nn="transform",Li=nn+"Origin",Wk=function i(e,t){var n=this,r=this.target,s=r.style,o=r._gsap;if(e in Js&&s){if(this.tfm=this.tfm||{},e!=="transform")e=ss[e]||e,~e.indexOf(",")?e.split(",").forEach(function(a){return n.tfm[a]=Ds(r,a)}):this.tfm[e]=o.x?o[e]:Ds(r,e),e===Li&&(this.tfm.zOrigin=o.zOrigin);else return ss.transform.split(",").forEach(function(a){return i.call(n,a,t)});if(this.props.indexOf(nn)>=0)return;o.svg&&(this.svgo=r.getAttribute("data-svg-origin"),this.props.push(Li,t,"")),e=nn}(s||t)&&this.props.push(e,t,s[e])},gD=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},Xk=function(){var e=this.props,t=this.target,n=t.style,r=t._gsap,s,o;for(s=0;s<e.length;s+=3)e[s+1]?t[e[s]]=e[s+2]:e[s+2]?n[e[s]]=e[s+2]:n.removeProperty(e[s].substr(0,2)==="--"?e[s]:e[s].replace(lb,"-$1").toLowerCase());if(this.tfm){for(o in this.tfm)r[o]=this.tfm[o];r.svg&&(r.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),s=ab(),(!s||!s.isStart)&&!n[nn]&&(gD(n),r.zOrigin&&n[Li]&&(n[Li]+=" "+r.zOrigin+"px",r.zOrigin=0,r.renderTransform()),r.uncache=1)}},_D=function(e,t){var n={target:e,props:[],revert:Xk,save:Wk};return e._gsap||Ni.core.getCache(e),t&&t.split(",").forEach(function(r){return n.save(r)}),n},yD,dv=function(e,t){var n=Ho.createElementNS?Ho.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):Ho.createElement(e);return n&&n.style?n:Ho.createElement(e)},cs=function i(e,t,n){var r=getComputedStyle(e);return r[t]||r.getPropertyValue(t.replace(lb,"-$1").toLowerCase())||r.getPropertyValue(t)||!n&&i(e,Yc(t)||t,1)||""},lM="O,Moz,ms,Ms,Webkit".split(","),Yc=function(e,t,n){var r=t||za,s=r.style,o=5;if(e in s&&!n)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);o--&&!(lM[o]+e in s););return o<0?null:(o===3?"ms":o>=0?lM[o]:"")+e},pv=function(){Ik()&&window.document&&(sM=window,Ho=sM.document,Tc=Ho.documentElement,za=dv("div")||{style:{}},dv("div"),nn=Yc(nn),Li=nn+"Origin",za.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",yD=!!Yc("perspective"),ab=Ni.core.reverting,ob=1)},o0=function i(e){var t=dv("svg",this.ownerSVGElement&&this.ownerSVGElement.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),n=this.parentNode,r=this.nextSibling,s=this.style.cssText,o;if(Tc.appendChild(t),t.appendChild(this),this.style.display="block",e)try{o=this.getBBox(),this._gsapBBox=this.getBBox,this.getBBox=i}catch{}else this._gsapBBox&&(o=this._gsapBBox());return n&&(r?n.insertBefore(this,r):n.appendChild(this)),Tc.removeChild(t),this.style.cssText=s,o},cM=function(e,t){for(var n=t.length;n--;)if(e.hasAttribute(t[n]))return e.getAttribute(t[n])},vD=function(e){var t;try{t=e.getBBox()}catch{t=o0.call(e,!0)}return t&&(t.width||t.height)||e.getBBox===o0||(t=o0.call(e,!0)),t&&!t.width&&!t.x&&!t.y?{x:+cM(e,["x","cx","x1"])||0,y:+cM(e,["y","cy","y1"])||0,width:0,height:0}:t},xD=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&vD(e))},hl=function(e,t){if(t){var n=e.style,r;t in Js&&t!==Li&&(t=nn),n.removeProperty?(r=t.substr(0,2),(r==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),n.removeProperty(r==="--"?t:t.replace(lb,"-$1").toLowerCase())):n.removeAttribute(t)}},Vo=function(e,t,n,r,s,o){var a=new Ii(e._pt,t,n,0,1,o?mD:pD);return e._pt=a,a.b=r,a.e=s,e._props.push(n),a},uM={deg:1,rad:1,turn:1},$k={grid:1,flex:1},ia=function i(e,t,n,r){var s=parseFloat(n)||0,o=(n+"").trim().substr((s+"").length)||"px",a=za.style,l=Lk.test(t),c=e.tagName.toLowerCase()==="svg",u=(c?"client":"offset")+(l?"Width":"Height"),h=100,d=r==="px",f=r==="%",p,m,g,_;if(r===o||!s||uM[r]||uM[o])return s;if(o!=="px"&&!d&&(s=i(e,t,n,"px")),_=e.getCTM&&xD(e),(f||o==="%")&&(Js[t]||~t.indexOf("adius")))return p=_?e.getBBox()[l?"width":"height"]:e[u],pn(f?s/p*h:s/100*p);if(a[l?"width":"height"]=h+(d?o:r),m=~t.indexOf("adius")||r==="em"&&e.appendChild&&!c?e:e.parentNode,_&&(m=(e.ownerSVGElement||{}).parentNode),(!m||m===Ho||!m.appendChild)&&(m=Ho.body),g=m._gsap,g&&f&&g.width&&l&&g.time===Zi.time&&!g.uncache)return pn(s/g.width*h);if(f&&(t==="height"||t==="width")){var x=e.style[t];e.style[t]=h+r,p=e[u],x?e.style[t]=x:hl(e,t)}else(f||o==="%")&&!$k[cs(m,"display")]&&(a.position=cs(e,"position")),m===e&&(a.position="static"),m.appendChild(za),p=za[u],m.removeChild(za),a.position="absolute";return l&&f&&(g=ja(m),g.time=Zi.time,g.width=m[u]),pn(d?p*s/h:p&&s?h/p*s:0)},Ds=function(e,t,n,r){var s;return ob||pv(),t in ss&&t!=="transform"&&(t=ss[t],~t.indexOf(",")&&(t=t.split(",")[0])),Js[t]&&t!=="transform"?(s=lh(e,r),s=t!=="transformOrigin"?s[t]:s.svg?s.origin:Cm(cs(e,Li))+" "+s.zOrigin+"px"):(s=e.style[t],(!s||s==="auto"||r||~(s+"").indexOf("calc("))&&(s=Am[t]&&Am[t](e,t,n)||cs(e,t)||NC(e,t)||(t==="opacity"?1:0))),n&&!~(s+"").trim().indexOf(" ")?ia(e,t,s,n)+n:s},qk=function(e,t,n,r){if(!n||n==="none"){var s=Yc(t,e,1),o=s&&cs(e,s,1);o&&o!==n?(t=s,n=o):t==="borderColor"&&(n=cs(e,"borderTopColor"))}var a=new Ii(this._pt,e.style,t,0,1,fD),l=0,c=0,u,h,d,f,p,m,g,_,x,y,v,w;if(a.b=n,a.e=r,n+="",r+="",r==="auto"&&(m=e.style[t],e.style[t]=r,r=cs(e,t)||r,m?e.style[t]=m:hl(e,t)),u=[n,r],tD(u),n=u[0],r=u[1],d=n.match(lc)||[],w=r.match(lc)||[],w.length){for(;h=lc.exec(r);)g=h[0],x=r.substring(l,h.index),p?p=(p+1)%5:(x.substr(-5)==="rgba("||x.substr(-5)==="hsla(")&&(p=1),g!==(m=d[c++]||"")&&(f=parseFloat(m)||0,v=m.substr((f+"").length),g.charAt(1)==="="&&(g=Ec(f,g)+v),_=parseFloat(g),y=g.substr((_+"").length),l=lc.lastIndex-y.length,y||(y=y||rr.units[t]||v,l===r.length&&(r+=y,a.e+=y)),v!==y&&(f=ia(e,t,m,y)||0),a._pt={_next:a._pt,p:x||c===1?x:",",s:f,c:_-f,m:p&&p<4||t==="zIndex"?Math.round:0});a.c=l<r.length?r.substring(l,r.length):""}else a.r=t==="display"&&r==="none"?mD:pD;return RC.test(r)&&(a.e=0),this._pt=a,a},fM={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},Yk=function(e){var t=e.split(" "),n=t[0],r=t[1]||"50%";return(n==="top"||n==="bottom"||r==="left"||r==="right")&&(e=n,n=r,r=e),t[0]=fM[n]||n,t[1]=fM[r]||r,t.join(" ")},jk=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var n=t.t,r=n.style,s=t.u,o=n._gsap,a,l,c;if(s==="all"||s===!0)r.cssText="",l=1;else for(s=s.split(","),c=s.length;--c>-1;)a=s[c],Js[a]&&(l=1,a=a==="transformOrigin"?Li:nn),hl(n,a);l&&(hl(n,nn),o&&(o.svg&&n.removeAttribute("transform"),lh(n,1),o.uncache=1,gD(r)))}},Am={clearProps:function(e,t,n,r,s){if(s.data!=="isFromStart"){var o=e._pt=new Ii(e._pt,t,n,0,0,jk);return o.u=r,o.pr=-10,o.tween=s,e._props.push(n),1}}},ah=[1,0,0,1,0,0],bD={},SD=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},hM=function(e){var t=cs(e,nn);return SD(t)?ah:t.substr(7).match(DC).map(pn)},cb=function(e,t){var n=e._gsap||ja(e),r=e.style,s=hM(e),o,a,l,c;return n.svg&&e.getAttribute("transform")?(l=e.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?ah:s):(s===ah&&!e.offsetParent&&e!==Tc&&!n.svg&&(l=r.display,r.display="block",o=e.parentNode,(!o||!e.offsetParent)&&(c=1,a=e.nextElementSibling,Tc.appendChild(e)),s=hM(e),l?r.display=l:hl(e,"display"),c&&(a?o.insertBefore(e,a):o?o.appendChild(e):Tc.removeChild(e))),t&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},mv=function(e,t,n,r,s,o){var a=e._gsap,l=s||cb(e,!0),c=a.xOrigin||0,u=a.yOrigin||0,h=a.xOffset||0,d=a.yOffset||0,f=l[0],p=l[1],m=l[2],g=l[3],_=l[4],x=l[5],y=t.split(" "),v=parseFloat(y[0])||0,w=parseFloat(y[1])||0,T,A,C,M;n?l!==ah&&(A=f*g-p*m)&&(C=v*(g/A)+w*(-m/A)+(m*x-g*_)/A,M=v*(-p/A)+w*(f/A)-(f*x-p*_)/A,v=C,w=M):(T=vD(e),v=T.x+(~y[0].indexOf("%")?v/100*T.width:v),w=T.y+(~(y[1]||y[0]).indexOf("%")?w/100*T.height:w)),r||r!==!1&&a.smooth?(_=v-c,x=w-u,a.xOffset=h+(_*f+x*m)-_,a.yOffset=d+(_*p+x*g)-x):a.xOffset=a.yOffset=0,a.xOrigin=v,a.yOrigin=w,a.smooth=!!r,a.origin=t,a.originIsAbsolute=!!n,e.style[Li]="0px 0px",o&&(Vo(o,a,"xOrigin",c,v),Vo(o,a,"yOrigin",u,w),Vo(o,a,"xOffset",h,a.xOffset),Vo(o,a,"yOffset",d,a.yOffset)),e.setAttribute("data-svg-origin",v+" "+w)},lh=function(e,t){var n=e._gsap||new sD(e);if("x"in n&&!t&&!n.uncache)return n;var r=e.style,s=n.scaleX<0,o="px",a="deg",l=getComputedStyle(e),c=cs(e,Li)||"0",u,h,d,f,p,m,g,_,x,y,v,w,T,A,C,M,b,R,L,F,H,W,N,$,X,Z,z,ue,me,Ue,ie,le;return u=h=d=m=g=_=x=y=v=0,f=p=1,n.svg=!!(e.getCTM&&xD(e)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(r[nn]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[nn]!=="none"?l[nn]:"")),r.scale=r.rotate=r.translate="none"),A=cb(e,n.svg),n.svg&&(n.uncache?(X=e.getBBox(),c=n.xOrigin-X.x+"px "+(n.yOrigin-X.y)+"px",$=""):$=!t&&e.getAttribute("data-svg-origin"),mv(e,$||c,!!$||n.originIsAbsolute,n.smooth!==!1,A)),w=n.xOrigin||0,T=n.yOrigin||0,A!==ah&&(R=A[0],L=A[1],F=A[2],H=A[3],u=W=A[4],h=N=A[5],A.length===6?(f=Math.sqrt(R*R+L*L),p=Math.sqrt(H*H+F*F),m=R||L?Rl(L,R)*Pa:0,x=F||H?Rl(F,H)*Pa+m:0,x&&(p*=Math.abs(Math.cos(x*Ac))),n.svg&&(u-=w-(w*R+T*F),h-=T-(w*L+T*H))):(le=A[6],Ue=A[7],z=A[8],ue=A[9],me=A[10],ie=A[11],u=A[12],h=A[13],d=A[14],C=Rl(le,me),g=C*Pa,C&&(M=Math.cos(-C),b=Math.sin(-C),$=W*M+z*b,X=N*M+ue*b,Z=le*M+me*b,z=W*-b+z*M,ue=N*-b+ue*M,me=le*-b+me*M,ie=Ue*-b+ie*M,W=$,N=X,le=Z),C=Rl(-F,me),_=C*Pa,C&&(M=Math.cos(-C),b=Math.sin(-C),$=R*M-z*b,X=L*M-ue*b,Z=F*M-me*b,ie=H*b+ie*M,R=$,L=X,F=Z),C=Rl(L,R),m=C*Pa,C&&(M=Math.cos(C),b=Math.sin(C),$=R*M+L*b,X=W*M+N*b,L=L*M-R*b,N=N*M-W*b,R=$,W=X),g&&Math.abs(g)+Math.abs(m)>359.9&&(g=m=0,_=180-_),f=pn(Math.sqrt(R*R+L*L+F*F)),p=pn(Math.sqrt(N*N+le*le)),C=Rl(W,N),x=Math.abs(C)>2e-4?C*Pa:0,v=ie?1/(ie<0?-ie:ie):0),n.svg&&($=e.getAttribute("transform"),n.forceCSS=e.setAttribute("transform","")||!SD(cs(e,nn)),$&&e.setAttribute("transform",$))),Math.abs(x)>90&&Math.abs(x)<270&&(s?(f*=-1,x+=m<=0?180:-180,m+=m<=0?180:-180):(p*=-1,x+=x<=0?180:-180)),t=t||n.uncache,n.x=u-((n.xPercent=u&&(!t&&n.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-u)?-50:0)))?e.offsetWidth*n.xPercent/100:0)+o,n.y=h-((n.yPercent=h&&(!t&&n.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-h)?-50:0)))?e.offsetHeight*n.yPercent/100:0)+o,n.z=d+o,n.scaleX=pn(f),n.scaleY=pn(p),n.rotation=pn(m)+a,n.rotationX=pn(g)+a,n.rotationY=pn(_)+a,n.skewX=x+a,n.skewY=y+a,n.transformPerspective=v+o,(n.zOrigin=parseFloat(c.split(" ")[2])||!t&&n.zOrigin||0)&&(r[Li]=Cm(c)),n.xOffset=n.yOffset=0,n.force3D=rr.force3D,n.renderTransform=n.svg?Zk:yD?wD:Kk,n.uncache=0,n},Cm=function(e){return(e=e.split(" "))[0]+" "+e[1]},a0=function(e,t,n){var r=ei(t);return pn(parseFloat(t)+parseFloat(ia(e,"x",n+"px",r)))+r},Kk=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,wD(e,t)},pa="0deg",vu="0px",ma=") ",wD=function(e,t){var n=t||this,r=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.z,c=n.rotation,u=n.rotationY,h=n.rotationX,d=n.skewX,f=n.skewY,p=n.scaleX,m=n.scaleY,g=n.transformPerspective,_=n.force3D,x=n.target,y=n.zOrigin,v="",w=_==="auto"&&e&&e!==1||_===!0;if(y&&(h!==pa||u!==pa)){var T=parseFloat(u)*Ac,A=Math.sin(T),C=Math.cos(T),M;T=parseFloat(h)*Ac,M=Math.cos(T),o=a0(x,o,A*M*-y),a=a0(x,a,-Math.sin(T)*-y),l=a0(x,l,C*M*-y+y)}g!==vu&&(v+="perspective("+g+ma),(r||s)&&(v+="translate("+r+"%, "+s+"%) "),(w||o!==vu||a!==vu||l!==vu)&&(v+=l!==vu||w?"translate3d("+o+", "+a+", "+l+") ":"translate("+o+", "+a+ma),c!==pa&&(v+="rotate("+c+ma),u!==pa&&(v+="rotateY("+u+ma),h!==pa&&(v+="rotateX("+h+ma),(d!==pa||f!==pa)&&(v+="skew("+d+", "+f+ma),(p!==1||m!==1)&&(v+="scale("+p+", "+m+ma),x.style[nn]=v||"translate(0, 0)"},Zk=function(e,t){var n=t||this,r=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.rotation,c=n.skewX,u=n.skewY,h=n.scaleX,d=n.scaleY,f=n.target,p=n.xOrigin,m=n.yOrigin,g=n.xOffset,_=n.yOffset,x=n.forceCSS,y=parseFloat(o),v=parseFloat(a),w,T,A,C,M;l=parseFloat(l),c=parseFloat(c),u=parseFloat(u),u&&(u=parseFloat(u),c+=u,l+=u),l||c?(l*=Ac,c*=Ac,w=Math.cos(l)*h,T=Math.sin(l)*h,A=Math.sin(l-c)*-d,C=Math.cos(l-c)*d,c&&(u*=Ac,M=Math.tan(c-u),M=Math.sqrt(1+M*M),A*=M,C*=M,u&&(M=Math.tan(u),M=Math.sqrt(1+M*M),w*=M,T*=M)),w=pn(w),T=pn(T),A=pn(A),C=pn(C)):(w=h,C=d,T=A=0),(y&&!~(o+"").indexOf("px")||v&&!~(a+"").indexOf("px"))&&(y=ia(f,"x",o,"px"),v=ia(f,"y",a,"px")),(p||m||g||_)&&(y=pn(y+p-(p*w+m*A)+g),v=pn(v+m-(p*T+m*C)+_)),(r||s)&&(M=f.getBBox(),y=pn(y+r/100*M.width),v=pn(v+s/100*M.height)),M="matrix("+w+","+T+","+A+","+C+","+y+","+v+")",f.setAttribute("transform",M),x&&(f.style[nn]=M)},Jk=function(e,t,n,r,s){var o=360,a=Bn(s),l=parseFloat(s)*(a&&~s.indexOf("rad")?Pa:1),c=l-r,u=r+c+"deg",h,d;return a&&(h=s.split("_")[1],h==="short"&&(c%=o,c!==c%(o/2)&&(c+=c<0?o:-o)),h==="cw"&&c<0?c=(c+o*aM)%o-~~(c/o)*o:h==="ccw"&&c>0&&(c=(c-o*aM)%o-~~(c/o)*o)),e._pt=d=new Ii(e._pt,t,n,r,c,Ok),d.e=u,d.u="deg",e._props.push(n),d},dM=function(e,t){for(var n in t)e[n]=t[n];return e},Qk=function(e,t,n){var r=dM({},n._gsap),s="perspective,force3D,transformOrigin,svgOrigin",o=n.style,a,l,c,u,h,d,f,p;r.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),o[nn]=t,a=lh(n,1),hl(n,nn),n.setAttribute("transform",c)):(c=getComputedStyle(n)[nn],o[nn]=t,a=lh(n,1),o[nn]=c);for(l in Js)c=r[l],u=a[l],c!==u&&s.indexOf(l)<0&&(f=ei(c),p=ei(u),h=f!==p?ia(n,l,c,p):parseFloat(c),d=parseFloat(u),e._pt=new Ii(e._pt,a,l,h,d-h,hv),e._pt.u=p||0,e._props.push(l));dM(a,r)};Pi("padding,margin,Width,Radius",function(i,e){var t="Top",n="Right",r="Bottom",s="Left",o=(e<3?[t,n,r,s]:[t+s,t+n,r+n,r+s]).map(function(a){return e<2?i+a:"border"+a+i});Am[e>1?"border"+i:i]=function(a,l,c,u,h){var d,f;if(arguments.length<4)return d=o.map(function(p){return Ds(a,p,c)}),f=d.join(" "),f.split(d[0]).length===5?d[0]:f;d=(u+"").split(" "),f={},o.forEach(function(p,m){return f[p]=d[m]=d[m]||d[(m-1)/2|0]}),a.init(l,f,h)}});var MD={name:"css",register:pv,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,n,r,s){var o=this._props,a=e.style,l=n.vars.startAt,c,u,h,d,f,p,m,g,_,x,y,v,w,T,A,C;ob||pv(),this.styles=this.styles||_D(e),C=this.styles.props,this.tween=n;for(m in t)if(m!=="autoRound"&&(u=t[m],!(Yi[m]&&oD(m,t,n,r,e,s)))){if(f=typeof u,p=Am[m],f==="function"&&(u=u.call(n,r,e,s),f=typeof u),f==="string"&&~u.indexOf("random(")&&(u=rh(u)),p)p(this,e,m,u,n)&&(A=1);else if(m.substr(0,2)==="--")c=(getComputedStyle(e).getPropertyValue(m)+"").trim(),u+="",Ko.lastIndex=0,Ko.test(c)||(g=ei(c),_=ei(u)),_?g!==_&&(c=ia(e,m,c,_)+_):g&&(u+=g),this.add(a,"setProperty",c,u,r,s,0,0,m),o.push(m),C.push(m,0,a[m]);else if(f!=="undefined"){if(l&&m in l?(c=typeof l[m]=="function"?l[m].call(n,r,e,s):l[m],Bn(c)&&~c.indexOf("random(")&&(c=rh(c)),ei(c+"")||c==="auto"||(c+=rr.units[m]||ei(Ds(e,m))||""),(c+"").charAt(1)==="="&&(c=Ds(e,m))):c=Ds(e,m),d=parseFloat(c),x=f==="string"&&u.charAt(1)==="="&&u.substr(0,2),x&&(u=u.substr(2)),h=parseFloat(u),m in ss&&(m==="autoAlpha"&&(d===1&&Ds(e,"visibility")==="hidden"&&h&&(d=0),C.push("visibility",0,a.visibility),Vo(this,a,"visibility",d?"inherit":"hidden",h?"inherit":"hidden",!h)),m!=="scale"&&m!=="transform"&&(m=ss[m],~m.indexOf(",")&&(m=m.split(",")[0]))),y=m in Js,y){if(this.styles.save(m),v||(w=e._gsap,w.renderTransform&&!t.parseTransform||lh(e,t.parseTransform),T=t.smoothOrigin!==!1&&w.smooth,v=this._pt=new Ii(this._pt,a,nn,0,1,w.renderTransform,w,0,-1),v.dep=1),m==="scale")this._pt=new Ii(this._pt,w,"scaleY",w.scaleY,(x?Ec(w.scaleY,x+h):h)-w.scaleY||0,hv),this._pt.u=0,o.push("scaleY",m),m+="X";else if(m==="transformOrigin"){C.push(Li,0,a[Li]),u=Yk(u),w.svg?mv(e,u,0,T,0,this):(_=parseFloat(u.split(" ")[2])||0,_!==w.zOrigin&&Vo(this,w,"zOrigin",w.zOrigin,_),Vo(this,a,m,Cm(c),Cm(u)));continue}else if(m==="svgOrigin"){mv(e,u,1,T,0,this);continue}else if(m in bD){Jk(this,w,m,d,x?Ec(d,x+u):u);continue}else if(m==="smoothOrigin"){Vo(this,w,"smooth",w.smooth,u);continue}else if(m==="force3D"){w[m]=u;continue}else if(m==="transform"){Qk(this,u,e);continue}}else m in a||(m=Yc(m)||m);if(y||(h||h===0)&&(d||d===0)&&!Fk.test(u)&&m in a)g=(c+"").substr((d+"").length),h||(h=0),_=ei(u)||(m in rr.units?rr.units[m]:g),g!==_&&(d=ia(e,m,c,_)),this._pt=new Ii(this._pt,y?w:a,m,d,(x?Ec(d,x+h):h)-d,!y&&(_==="px"||m==="zIndex")&&t.autoRound!==!1?Uk:hv),this._pt.u=_||0,g!==_&&_!=="%"&&(this._pt.b=c,this._pt.r=Nk);else if(m in a)qk.call(this,e,m,c,x?x+u:u);else if(m in e)this.add(e,m,c||e[m],x?x+u:u,r,s);else if(m!=="parseTransform"){Zx(m,u);continue}y||(m in a?C.push(m,0,a[m]):C.push(m,1,c||e[m])),o.push(m)}}A&&hD(this)},render:function(e,t){if(t.tween._time||!ab())for(var n=t._pt;n;)n.r(e,n.d),n=n._next;else t.styles.revert()},get:Ds,aliases:ss,getSetter:function(e,t,n){var r=ss[t];return r&&r.indexOf(",")<0&&(t=r),t in Js&&t!==Li&&(e._gsap.x||Ds(e,"x"))?n&&oM===n?t==="scale"?Hk:zk:(oM=n||{})&&(t==="scale"?Vk:Gk):e.style&&!Yx(e.style[t])?kk:~t.indexOf("-")?Bk:rb(e,t)},core:{_removeProperty:hl,_getMatrix:cb}};Ni.utils.checkPrefix=Yc;Ni.core.getStyleSaver=_D;(function(i,e,t,n){var r=Pi(i+","+e+","+t,function(s){Js[s]=1});Pi(e,function(s){rr.units[s]="deg",bD[s]=1}),ss[r[13]]=i+","+e,Pi(n,function(s){var o=s.split(":");ss[o[1]]=r[o[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");Pi("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(i){rr.units[i]="px"});Ni.registerPlugin(MD);var Vn=Ni.registerPlugin(MD)||Ni;Vn.core.Tween;/*!
 * matrix 3.12.5
 * https://gsap.com
 *
 * Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Os,Qa,ub,Wg,Xu,Wp,Dm,yf,Ur="transform",gv=Ur+"Origin",ED,fb=function(e){var t=e.ownerDocument||e;for(!(Ur in e.style)&&("msTransform"in e.style)&&(Ur="msTransform",gv=Ur+"Origin");t.parentNode&&(t=t.parentNode););if(Qa=window,Dm=new Qs,t){Os=t,ub=t.documentElement,Wg=t.body,yf=Os.createElementNS("http://www.w3.org/2000/svg","g"),yf.style.transform="none";var n=t.createElement("div"),r=t.createElement("div"),s=t&&(t.body||t.firstElementChild);s&&s.appendChild&&(s.appendChild(n),n.appendChild(r),n.setAttribute("style","position:static;transform:translate3d(0,0,1px)"),ED=r.offsetParent!==n,s.removeChild(n))}return t},eB=function(e){for(var t,n;e&&e!==Wg;)n=e._gsap,n&&n.uncache&&n.get(e,"x"),n&&!n.scaleX&&!n.scaleY&&n.renderTransform&&(n.scaleX=n.scaleY=1e-4,n.renderTransform(1,n),t?t.push(n):t=[n]),e=e.parentNode;return t},TD=[],AD=[],hb=function(){return Qa.pageYOffset||Os.scrollTop||ub.scrollTop||Wg.scrollTop||0},db=function(){return Qa.pageXOffset||Os.scrollLeft||ub.scrollLeft||Wg.scrollLeft||0},pb=function(e){return e.ownerSVGElement||((e.tagName+"").toLowerCase()==="svg"?e:null)},tB=function i(e){if(Qa.getComputedStyle(e).position==="fixed")return!0;if(e=e.parentNode,e&&e.nodeType===1)return i(e)},l0=function i(e,t){if(e.parentNode&&(Os||fb(e))){var n=pb(e),r=n?n.getAttribute("xmlns")||"http://www.w3.org/2000/svg":"http://www.w3.org/1999/xhtml",s=n?t?"rect":"g":"div",o=t!==2?0:100,a=t===3?100:0,l="position:absolute;display:block;pointer-events:none;margin:0;padding:0;",c=Os.createElementNS?Os.createElementNS(r.replace(/^https/,"http"),s):Os.createElement(s);return t&&(n?(Wp||(Wp=i(e)),c.setAttribute("width",.01),c.setAttribute("height",.01),c.setAttribute("transform","translate("+o+","+a+")"),Wp.appendChild(c)):(Xu||(Xu=i(e),Xu.style.cssText=l),c.style.cssText=l+"width:0.1px;height:0.1px;top:"+a+"px;left:"+o+"px",Xu.appendChild(c))),c}throw"Need document and parent."},nB=function(e){for(var t=new Qs,n=0;n<e.numberOfItems;n++)t.multiply(e.getItem(n).matrix);return t},CD=function(e){var t=e.getCTM(),n;return t||(n=e.style[Ur],e.style[Ur]="none",e.appendChild(yf),t=yf.getCTM(),e.removeChild(yf),n?e.style[Ur]=n:e.style.removeProperty(Ur.replace(/([A-Z])/g,"-$1").toLowerCase())),t||Dm.clone()},iB=function(e,t){var n=pb(e),r=e===n,s=n?TD:AD,o=e.parentNode,a,l,c,u,h,d;if(e===Qa)return e;if(s.length||s.push(l0(e,1),l0(e,2),l0(e,3)),a=n?Wp:Xu,n)r?(c=CD(e),u=-c.e/c.a,h=-c.f/c.d,l=Dm):e.getBBox?(c=e.getBBox(),l=e.transform?e.transform.baseVal:{},l=l.numberOfItems?l.numberOfItems>1?nB(l):l.getItem(0).matrix:Dm,u=l.a*c.x+l.c*c.y,h=l.b*c.x+l.d*c.y):(l=new Qs,u=h=0),t&&e.tagName.toLowerCase()==="g"&&(u=h=0),(r?n:o).appendChild(a),a.setAttribute("transform","matrix("+l.a+","+l.b+","+l.c+","+l.d+","+(l.e+u)+","+(l.f+h)+")");else{if(u=h=0,ED)for(l=e.offsetParent,c=e;c&&(c=c.parentNode)&&c!==l&&c.parentNode;)(Qa.getComputedStyle(c)[Ur]+"").length>4&&(u=c.offsetLeft,h=c.offsetTop,c=0);if(d=Qa.getComputedStyle(e),d.position!=="absolute"&&d.position!=="fixed")for(l=e.offsetParent;o&&o!==l;)u+=o.scrollLeft||0,h+=o.scrollTop||0,o=o.parentNode;c=a.style,c.top=e.offsetTop-h+"px",c.left=e.offsetLeft-u+"px",c[Ur]=d[Ur],c[gv]=d[gv],c.position=d.position==="fixed"?"fixed":"absolute",e.parentNode.appendChild(a)}return a},c0=function(e,t,n,r,s,o,a){return e.a=t,e.b=n,e.c=r,e.d=s,e.e=o,e.f=a,e},Qs=function(){function i(t,n,r,s,o,a){t===void 0&&(t=1),n===void 0&&(n=0),r===void 0&&(r=0),s===void 0&&(s=1),o===void 0&&(o=0),a===void 0&&(a=0),c0(this,t,n,r,s,o,a)}var e=i.prototype;return e.inverse=function(){var n=this.a,r=this.b,s=this.c,o=this.d,a=this.e,l=this.f,c=n*o-r*s||1e-10;return c0(this,o/c,-r/c,-s/c,n/c,(s*l-o*a)/c,-(n*l-r*a)/c)},e.multiply=function(n){var r=this.a,s=this.b,o=this.c,a=this.d,l=this.e,c=this.f,u=n.a,h=n.c,d=n.b,f=n.d,p=n.e,m=n.f;return c0(this,u*r+d*o,u*s+d*a,h*r+f*o,h*s+f*a,l+p*r+m*o,c+p*s+m*a)},e.clone=function(){return new i(this.a,this.b,this.c,this.d,this.e,this.f)},e.equals=function(n){var r=this.a,s=this.b,o=this.c,a=this.d,l=this.e,c=this.f;return r===n.a&&s===n.b&&o===n.c&&a===n.d&&l===n.e&&c===n.f},e.apply=function(n,r){r===void 0&&(r={});var s=n.x,o=n.y,a=this.a,l=this.b,c=this.c,u=this.d,h=this.e,d=this.f;return r.x=s*a+o*c+h||0,r.y=s*l+o*u+d||0,r},i}();function Wn(i,e,t,n){if(!i||!i.parentNode||(Os||fb(i)).documentElement===i)return new Qs;var r=eB(i),s=pb(i),o=s?TD:AD,a=iB(i,t),l=o[0].getBoundingClientRect(),c=o[1].getBoundingClientRect(),u=o[2].getBoundingClientRect(),h=a.parentNode,d=!n&&tB(i),f=new Qs((c.left-l.left)/100,(c.top-l.top)/100,(u.left-l.left)/100,(u.top-l.top)/100,l.left+(d?0:db()),l.top+(d?0:hb()));if(h.removeChild(a),r)for(l=r.length;l--;)c=r[l],c.scaleX=c.scaleY=0,c.renderTransform(1,c);return e?f.inverse():f}/*!
 * Flip 3.12.5
 * https://gsap.com
 *
 * @license Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var rB=1,jc,Jn,Kt,vf,ko,Ns,_v,pM=function(e,t){return e.actions.forEach(function(n){return n.vars[t]&&n.vars[t](n)})},yv={},mM=180/Math.PI,sB=Math.PI/180,Rm={},gM={},Xg={},mb=function(e){return typeof e=="string"?e.split(" ").join("").split(","):e},oB=mb("onStart,onUpdate,onComplete,onReverseComplete,onInterrupt"),$g=mb("transform,transformOrigin,width,height,position,top,left,opacity,zIndex,maxWidth,maxHeight,minWidth,minHeight"),xf=function(e){return jc(e)[0]||console.warn("Element not found:",e)},uc=function(e){return Math.round(e*1e4)/1e4||0},u0=function(e,t,n){return e.forEach(function(r){return r.classList[n](t)})},_M={zIndex:1,kill:1,simple:1,spin:1,clearProps:1,targets:1,toggleClass:1,onComplete:1,onUpdate:1,onInterrupt:1,onStart:1,delay:1,repeat:1,repeatDelay:1,yoyo:1,scale:1,fade:1,absolute:1,props:1,onEnter:1,onLeave:1,custom:1,paused:1,nested:1,prune:1,absoluteOnLeave:1},DD={zIndex:1,simple:1,clearProps:1,scale:1,absolute:1,fitChild:1,getVars:1,props:1},RD=function(e){return e.replace(/([A-Z])/g,"-$1").toLowerCase()},fc=function(e,t){var n={},r;for(r in e)t[r]||(n[r]=e[r]);return n},gb={},PD=function(e){var t=gb[e]=mb(e);return Xg[e]=t.concat($g),t},aB=function(e){var t=e._gsap||Jn.core.getCache(e);return t.gmCache===Jn.ticker.frame?t.gMatrix:(t.gmCache=Jn.ticker.frame,t.gMatrix=Wn(e,!0,!1,!0))},lB=function i(e,t,n){n===void 0&&(n=0);for(var r=e.parentNode,s=1e3*Math.pow(10,n)*(t?-1:1),o=t?-s*900:0;e;)o+=s,e=e.previousSibling;return r?o+i(r,t,n+1):o},Pm=function(e,t,n){return e.forEach(function(r){return r.d=lB(n?r.element:r.t,t)}),e.sort(function(r,s){return r.d-s.d}),e},ch=function(e,t){for(var n=e.element.style,r=e.css=e.css||[],s=t.length,o,a;s--;)o=t[s],a=n[o]||n.getPropertyValue(o),r.push(a?o:gM[o]||(gM[o]=RD(o)),a);return n},Im=function(e){var t=e.css,n=e.element.style,r=0;for(e.cache.uncache=1;r<t.length;r+=2)t[r+1]?n[t[r]]=t[r+1]:n.removeProperty(t[r]);!t[t.indexOf("transform")+1]&&n.translate&&(n.removeProperty("translate"),n.removeProperty("scale"),n.removeProperty("rotate"))},yM=function(e,t){e.forEach(function(n){return n.a.cache.uncache=1}),t||e.finalStates.forEach(Im)},f0="paddingTop,paddingRight,paddingBottom,paddingLeft,gridArea,transition".split(","),_b=function(e,t,n){var r=e.element,s=e.width,o=e.height,a=e.uncache,l=e.getProp,c=r.style,u=4,h,d,f;if(typeof t!="object"&&(t=e),Kt&&n!==1)return Kt._abs.push({t:r,b:e,a:e,sd:0}),Kt._final.push(function(){return(e.cache.uncache=1)&&Im(e)}),r;for(d=l("display")==="none",(!e.isVisible||d)&&(d&&(ch(e,["display"]).display=t.display),e.matrix=t.matrix,e.width=s=e.width||t.width,e.height=o=e.height||t.height),ch(e,f0),f=window.getComputedStyle(r);u--;)c[f0[u]]=f[f0[u]];if(c.gridArea="1 / 1 / 1 / 1",c.transition="none",c.position="absolute",c.width=s+"px",c.height=o+"px",c.top||(c.top="0px"),c.left||(c.left="0px"),a)h=new dl(r);else if(h=fc(e,Rm),h.position="absolute",e.simple){var p=r.getBoundingClientRect();h.matrix=new Qs(1,0,0,1,p.left+db(),p.top+hb())}else h.matrix=Wn(r,!1,!1,!0);return h=Cc(h,e,!0),e.x=Ns(h.x,.01),e.y=Ns(h.y,.01),r},vM=function(e,t){return t!==!0&&(t=jc(t),e=e.filter(function(n){if(t.indexOf((n.sd<0?n.b:n.a).element)!==-1)return!0;n.t._gsap.renderTransform(1),n.b.isVisible&&(n.t.style.width=n.b.width+"px",n.t.style.height=n.b.height+"px")})),e},ID=function(e){return Pm(e,!0).forEach(function(t){return(t.a.isVisible||t.b.isVisible)&&_b(t.sd<0?t.b:t.a,t.b,1)})},cB=function(e,t){return t&&e.idLookup[vv(t).id]||e.elementStates[0]},vv=function(e,t,n,r){return e instanceof dl?e:e instanceof Br?cB(e,r):new dl(typeof e=="string"?xf(e)||console.warn(e+" not found"):e,t,n)},uB=function(e,t){for(var n=Jn.getProperty(e.element,null,"native"),r=e.props={},s=t.length;s--;)r[t[s]]=(n(t[s])+"").trim();return r.zIndex&&(r.zIndex=parseFloat(r.zIndex)||0),e},LD=function(e,t){var n=e.style||e,r;for(r in t)n[r]=t[r]},fB=function(e){var t=e.getAttribute("data-flip-id");return t||e.setAttribute("data-flip-id",t="auto-"+rB++),t},FD=function(e){return e.map(function(t){return t.element})},xM=function(e,t,n){return e&&t.length&&n.add(e(FD(t),n,new Br(t,0,!0)),0)},Cc=function(e,t,n,r,s,o){var a=e.element,l=e.cache,c=e.parent,u=e.x,h=e.y,d=t.width,f=t.height,p=t.scaleX,m=t.scaleY,g=t.rotation,_=t.bounds,x=o&&_v&&_v(a,"transform"),y=e,v=t.matrix,w=v.e,T=v.f,A=e.bounds.width!==_.width||e.bounds.height!==_.height||e.scaleX!==p||e.scaleY!==m||e.rotation!==g,C=!A&&e.simple&&t.simple&&!s,M,b,R,L,F,H,W;return C||!c?(p=m=1,g=M=0):(F=aB(c),H=F.clone().multiply(t.ctm?t.matrix.clone().multiply(t.ctm):t.matrix),g=uc(Math.atan2(H.b,H.a)*mM),M=uc(Math.atan2(H.c,H.d)*mM+g)%360,p=Math.sqrt(Math.pow(H.a,2)+Math.pow(H.b,2)),m=Math.sqrt(Math.pow(H.c,2)+Math.pow(H.d,2))*Math.cos(M*sB),s&&(s=jc(s)[0],L=Jn.getProperty(s),W=s.getBBox&&typeof s.getBBox=="function"&&s.getBBox(),y={scaleX:L("scaleX"),scaleY:L("scaleY"),width:W?W.width:Math.ceil(parseFloat(L("width","px"))),height:W?W.height:parseFloat(L("height","px"))}),l.rotation=g+"deg",l.skewX=M+"deg"),n?(p*=d===y.width||!y.width?1:d/y.width,m*=f===y.height||!y.height?1:f/y.height,l.scaleX=p,l.scaleY=m):(d=Ns(d*p/y.scaleX,0),f=Ns(f*m/y.scaleY,0),a.style.width=d+"px",a.style.height=f+"px"),r&&LD(a,t.props),C||!c?(u+=w-e.matrix.e,h+=T-e.matrix.f):A||c!==t.parent?(l.renderTransform(1,l),H=Wn(s||a,!1,!1,!0),b=F.apply({x:H.e,y:H.f}),R=F.apply({x:w,y:T}),u+=R.x-b.x,h+=R.y-b.y):(F.e=F.f=0,R=F.apply({x:w-e.matrix.e,y:T-e.matrix.f}),u+=R.x,h+=R.y),u=Ns(u,.02),h=Ns(h,.02),o&&!(o instanceof dl)?x&&x.revert():(l.x=u+"px",l.y=h+"px",l.renderTransform(1,l)),o&&(o.x=u,o.y=h,o.rotation=g,o.skewX=M,n?(o.scaleX=p,o.scaleY=m):(o.width=d,o.height=f)),o||l},h0=function(e,t){return e instanceof Br?e:new Br(e,t)},OD=function(e,t,n){var r=e.idLookup[n],s=e.alt[n];return s.isVisible&&(!(t.getElementState(s.element)||s).isVisible||!r.isVisible)?s:r},d0=[],p0="width,height,overflowX,overflowY".split(","),bd,bM=function(e){if(e!==bd){var t=ko.style,n=ko.clientWidth===window.outerWidth,r=ko.clientHeight===window.outerHeight,s=4;if(e&&(n||r)){for(;s--;)d0[s]=t[p0[s]];n&&(t.width=ko.clientWidth+"px",t.overflowY="hidden"),r&&(t.height=ko.clientHeight+"px",t.overflowX="hidden"),bd=e}else if(bd){for(;s--;)d0[s]?t[p0[s]]=d0[s]:t.removeProperty(RD(p0[s]));bd=e}}},m0=function(e,t,n,r){e instanceof Br&&t instanceof Br||console.warn("Not a valid state object."),n=n||{};var s=n,o=s.clearProps,a=s.onEnter,l=s.onLeave,c=s.absolute,u=s.absoluteOnLeave,h=s.custom,d=s.delay,f=s.paused,p=s.repeat,m=s.repeatDelay,g=s.yoyo,_=s.toggleClass,x=s.nested,y=s.zIndex,v=s.scale,w=s.fade,T=s.stagger,A=s.spin,C=s.prune,M=("props"in n?n:e).props,b=fc(n,_M),R=Jn.timeline({delay:d,paused:f,repeat:p,repeatDelay:m,yoyo:g,data:"isFlip"}),L=b,F=[],H=[],W=[],N=[],$=A===!0?1:A||0,X=typeof A=="function"?A:function(){return $},Z=e.interrupted||t.interrupted,z=R[r!==1?"to":"from"],ue,me,Ue,ie,le,ye,Y,ae,de,be,Re,E,P,O;for(me in t.idLookup)Re=t.alt[me]?OD(t,e,me):t.idLookup[me],le=Re.element,be=e.idLookup[me],e.alt[me]&&le===be.element&&(e.alt[me].isVisible||!Re.isVisible)&&(be=e.alt[me]),be?(ye={t:le,b:be,a:Re,sd:be.element===le?0:Re.isVisible?1:-1},W.push(ye),ye.sd&&(ye.sd<0&&(ye.b=Re,ye.a=be),Z&&ch(ye.b,M?Xg[M]:$g),w&&W.push(ye.swap={t:be.element,b:ye.b,a:ye.a,sd:-ye.sd,swap:ye})),le._flip=be.element._flip=Kt?Kt.timeline:R):Re.isVisible&&(W.push({t:le,b:fc(Re,{isVisible:1}),a:Re,sd:0,entering:1}),le._flip=Kt?Kt.timeline:R);if(M&&(gb[M]||PD(M)).forEach(function(U){return b[U]=function(se){return W[se].a.props[U]}}),W.finalStates=de=[],E=function(){for(Pm(W),bM(!0),ie=0;ie<W.length;ie++)ye=W[ie],P=ye.a,O=ye.b,C&&!P.isDifferent(O)&&!ye.entering?W.splice(ie--,1):(le=ye.t,x&&!(ye.sd<0)&&ie&&(P.matrix=Wn(le,!1,!1,!0)),O.isVisible&&P.isVisible?(ye.sd<0?(Y=new dl(le,M,e.simple),Cc(Y,P,v,0,0,Y),Y.matrix=Wn(le,!1,!1,!0),Y.css=ye.b.css,ye.a=P=Y,w&&(le.style.opacity=Z?O.opacity:P.opacity),T&&N.push(le)):ye.sd>0&&w&&(le.style.opacity=Z?P.opacity-O.opacity:"0"),Cc(P,O,v,M)):O.isVisible!==P.isVisible&&(O.isVisible?P.isVisible||(O.css=P.css,H.push(O),W.splice(ie--,1),c&&x&&Cc(P,O,v,M)):(P.isVisible&&F.push(P),W.splice(ie--,1))),v||(le.style.maxWidth=Math.max(P.width,O.width)+"px",le.style.maxHeight=Math.max(P.height,O.height)+"px",le.style.minWidth=Math.min(P.width,O.width)+"px",le.style.minHeight=Math.min(P.height,O.height)+"px"),x&&_&&le.classList.add(_)),de.push(P);var se;if(_&&(se=de.map(function(S){return S.element}),x&&se.forEach(function(S){return S.classList.remove(_)})),bM(!1),v?(b.scaleX=function(S){return W[S].a.scaleX},b.scaleY=function(S){return W[S].a.scaleY}):(b.width=function(S){return W[S].a.width+"px"},b.height=function(S){return W[S].a.height+"px"},b.autoRound=n.autoRound||!1),b.x=function(S){return W[S].a.x+"px"},b.y=function(S){return W[S].a.y+"px"},b.rotation=function(S){return W[S].a.rotation+(A?X(S,ae[S],ae)*360:0)},b.skewX=function(S){return W[S].a.skewX},ae=W.map(function(S){return S.t}),(y||y===0)&&(b.modifiers={zIndex:function(){return y}},b.zIndex=y,b.immediateRender=n.immediateRender!==!1),w&&(b.opacity=function(S){return W[S].sd<0?0:W[S].sd>0?W[S].a.opacity:"+=0"}),N.length){T=Jn.utils.distribute(T);var G=ae.slice(N.length);b.stagger=function(S,k){return T(~N.indexOf(k)?ae.indexOf(W[S].swap.t):S,k,G)}}if(oB.forEach(function(S){return n[S]&&R.eventCallback(S,n[S],n[S+"Params"])}),h&&ae.length){L=fc(b,_M),"scale"in h&&(h.scaleX=h.scaleY=h.scale,delete h.scale);for(me in h)ue=fc(h[me],DD),ue[me]=b[me],!("duration"in ue)&&"duration"in b&&(ue.duration=b.duration),ue.stagger=b.stagger,z.call(R,ae,ue,0),delete L[me]}(ae.length||H.length||F.length)&&(_&&R.add(function(){return u0(se,_,R._zTime<0?"remove":"add")},0)&&!f&&u0(se,_,"add"),ae.length&&z.call(R,ae,L,0)),xM(a,F,R),xM(l,H,R);var D=Kt&&Kt.timeline;D&&(D.add(R,0),Kt._final.push(function(){return yM(W,!o)})),Ue=R.duration(),R.call(function(){var S=R.time()>=Ue;S&&!D&&yM(W,!o),_&&u0(se,_,S?"remove":"add")})},u&&(c=W.filter(function(U){return!U.sd&&!U.a.isVisible&&U.b.isVisible}).map(function(U){return U.a.element})),Kt){var V;c&&(V=Kt._abs).push.apply(V,vM(W,c)),Kt._run.push(E)}else c&&ID(vM(W,c)),E();var q=Kt?Kt.timeline:R;return q.revert=function(){return yb(q,1,1)},q},hB=function i(e){e.vars.onInterrupt&&e.vars.onInterrupt.apply(e,e.vars.onInterruptParams||[]),e.getChildren(!0,!1,!0).forEach(i)},yb=function(e,t,n){if(e&&e.progress()<1&&(!e.paused()||n))return t&&(hB(e),t<2&&e.progress(1),e.kill()),!0},Sd=function(e){for(var t=e.idLookup={},n=e.alt={},r=e.elementStates,s=r.length,o;s--;)o=r[s],t[o.id]?n[o.id]=o:t[o.id]=o},Br=function(){function i(t,n,r){if(this.props=n&&n.props,this.simple=!!(n&&n.simple),r)this.targets=FD(t),this.elementStates=t,Sd(this);else{this.targets=jc(t);var s=n&&(n.kill===!1||n.batch&&!n.kill);Kt&&!s&&Kt._kill.push(this),this.update(s||!!Kt)}}var e=i.prototype;return e.update=function(n){var r=this;return this.elementStates=this.targets.map(function(s){return new dl(s,r.props,r.simple)}),Sd(this),this.interrupt(n),this.recordInlineStyles(),this},e.clear=function(){return this.targets.length=this.elementStates.length=0,Sd(this),this},e.fit=function(n,r,s){for(var o=Pm(this.elementStates.slice(0),!1,!0),a=(n||this).idLookup,l=0,c,u;l<o.length;l++)c=o[l],s&&(c.matrix=Wn(c.element,!1,!1,!0)),u=a[c.id],u&&Cc(c,u,r,!0,0,c),c.matrix=Wn(c.element,!1,!1,!0);return this},e.getProperty=function(n,r){var s=this.getElementState(n)||Rm;return(r in s?s:s.props||Rm)[r]},e.add=function(n){for(var r=n.targets.length,s=this.idLookup,o=this.alt,a,l,c;r--;)l=n.elementStates[r],c=s[l.id],c&&(l.element===c.element||o[l.id]&&o[l.id].element===l.element)?(a=this.elementStates.indexOf(l.element===c.element?c:o[l.id]),this.targets.splice(a,1,n.targets[r]),this.elementStates.splice(a,1,l)):(this.targets.push(n.targets[r]),this.elementStates.push(l));return n.interrupted&&(this.interrupted=!0),n.simple||(this.simple=!1),Sd(this),this},e.compare=function(n){var r=n.idLookup,s=this.idLookup,o=[],a=[],l=[],c=[],u=[],h=n.alt,d=this.alt,f=function(C,M,b){return(C.isVisible!==M.isVisible?C.isVisible?l:c:C.isVisible?a:o).push(b)&&u.push(b)},p=function(C,M,b){return u.indexOf(b)<0&&f(C,M,b)},m,g,_,x,y,v,w,T;for(_ in r)y=h[_],v=d[_],m=y?OD(n,this,_):r[_],x=m.element,g=s[_],v?(T=g.isVisible||!v.isVisible&&x===g.element?g:v,w=y&&!m.isVisible&&!y.isVisible&&T.element===y.element?y:m,w.isVisible&&T.isVisible&&w.element!==T.element?((w.isDifferent(T)?a:o).push(w.element,T.element),u.push(w.element,T.element)):f(w,T,w.element),y&&w.element===y.element&&(y=r[_]),p(w.element!==g.element&&y?y:w,g,g.element),p(y&&y.element===v.element?y:w,v,v.element),y&&p(y,v.element===y.element?v:g,y.element)):(g?g.isDifferent(m)?f(m,g,x):o.push(x):l.push(x),y&&p(y,g,y.element));for(_ in s)r[_]||(c.push(s[_].element),d[_]&&c.push(d[_].element));return{changed:a,unchanged:o,enter:l,leave:c}},e.recordInlineStyles=function(){for(var n=Xg[this.props]||$g,r=this.elementStates.length;r--;)ch(this.elementStates[r],n)},e.interrupt=function(n){var r=this,s=[];this.targets.forEach(function(o){var a=o._flip,l=yb(a,n?0:1);n&&l&&s.indexOf(a)<0&&a.add(function(){return r.updateVisibility()}),l&&s.push(a)}),!n&&s.length&&this.updateVisibility(),this.interrupted||(this.interrupted=!!s.length)},e.updateVisibility=function(){this.elementStates.forEach(function(n){var r=n.element.getBoundingClientRect();n.isVisible=!!(r.width||r.height||r.top||r.left),n.uncache=1})},e.getElementState=function(n){return this.elementStates[this.targets.indexOf(xf(n))]},e.makeAbsolute=function(){return Pm(this.elementStates.slice(0),!0,!0).map(_b)},i}(),dl=function(){function i(t,n,r){this.element=t,this.update(n,r)}var e=i.prototype;return e.isDifferent=function(n){var r=this.bounds,s=n.bounds;return r.top!==s.top||r.left!==s.left||r.width!==s.width||r.height!==s.height||!this.matrix.equals(n.matrix)||this.opacity!==n.opacity||this.props&&n.props&&JSON.stringify(this.props)!==JSON.stringify(n.props)},e.update=function(n,r){var s=this,o=s.element,a=Jn.getProperty(o),l=Jn.core.getCache(o),c=o.getBoundingClientRect(),u=o.getBBox&&typeof o.getBBox=="function"&&o.nodeName.toLowerCase()!=="svg"&&o.getBBox(),h=r?new Qs(1,0,0,1,c.left+db(),c.top+hb()):Wn(o,!1,!1,!0);s.getProp=a,s.element=o,s.id=fB(o),s.matrix=h,s.cache=l,s.bounds=c,s.isVisible=!!(c.width||c.height||c.left||c.top),s.display=a("display"),s.position=a("position"),s.parent=o.parentNode,s.x=a("x"),s.y=a("y"),s.scaleX=l.scaleX,s.scaleY=l.scaleY,s.rotation=a("rotation"),s.skewX=a("skewX"),s.opacity=a("opacity"),s.width=u?u.width:Ns(a("width","px"),.04),s.height=u?u.height:Ns(a("height","px"),.04),n&&uB(s,gb[n]||PD(n)),s.ctm=o.getCTM&&o.nodeName.toLowerCase()==="svg"&&CD(o).inverse(),s.simple=r||uc(h.a)===1&&!uc(h.b)&&!uc(h.c)&&uc(h.d)===1,s.uncache=0},i}(),dB=function(){function i(t,n){this.vars=t,this.batch=n,this.states=[],this.timeline=n.timeline}var e=i.prototype;return e.getStateById=function(n){for(var r=this.states.length;r--;)if(this.states[r].idLookup[n])return this.states[r]},e.kill=function(){this.batch.remove(this)},i}(),pB=function(){function i(t){this.id=t,this.actions=[],this._kill=[],this._final=[],this._abs=[],this._run=[],this.data={},this.state=new Br,this.timeline=Jn.timeline()}var e=i.prototype;return e.add=function(n){var r=this.actions.filter(function(s){return s.vars===n});return r.length?r[0]:(r=new dB(typeof n=="function"?{animate:n}:n,this),this.actions.push(r),r)},e.remove=function(n){var r=this.actions.indexOf(n);return r>=0&&this.actions.splice(r,1),this},e.getState=function(n){var r=this,s=Kt,o=vf;return Kt=this,this.state.clear(),this._kill.length=0,this.actions.forEach(function(a){a.vars.getState&&(a.states.length=0,vf=a,a.state=a.vars.getState(a)),n&&a.states.forEach(function(l){return r.state.add(l)})}),vf=o,Kt=s,this.killConflicts(),this},e.animate=function(){var n=this,r=Kt,s=this.timeline,o=this.actions.length,a,l;for(Kt=this,s.clear(),this._abs.length=this._final.length=this._run.length=0,this.actions.forEach(function(c){c.vars.animate&&c.vars.animate(c);var u=c.vars.onEnter,h=c.vars.onLeave,d=c.targets,f,p;d&&d.length&&(u||h)&&(f=new Br,c.states.forEach(function(m){return f.add(m)}),p=f.compare(Us.getState(d)),p.enter.length&&u&&u(p.enter),p.leave.length&&h&&h(p.leave))}),ID(this._abs),this._run.forEach(function(c){return c()}),l=s.duration(),a=this._final.slice(0),s.add(function(){l<=s.time()&&(a.forEach(function(c){return c()}),pM(n,"onComplete"))}),Kt=r;o--;)this.actions[o].vars.once&&this.actions[o].kill();return pM(this,"onStart"),s.restart(),this},e.loadState=function(n){n||(n=function(){return 0});var r=[];return this.actions.forEach(function(s){if(s.vars.loadState){var o,a=function l(c){c&&(s.targets=c),o=r.indexOf(l),~o&&(r.splice(o,1),r.length||n())};r.push(a),s.vars.loadState(a)}}),r.length||n(),this},e.setState=function(){return this.actions.forEach(function(n){return n.targets=n.vars.setState&&n.vars.setState(n)}),this},e.killConflicts=function(n){return this.state.interrupt(n),this._kill.forEach(function(r){return r.interrupt(n)}),this},e.run=function(n,r){var s=this;return this!==Kt&&(n||this.getState(r),this.loadState(function(){s._killed||(s.setState(),s.animate())})),this},e.clear=function(n){this.state.clear(),n||(this.actions.length=0)},e.getStateById=function(n){for(var r=this.actions.length,s;r--;)if(s=this.actions[r].getStateById(n),s)return s;return this.state.idLookup[n]&&this.state},e.kill=function(){this._killed=1,this.clear(),delete yv[this.id]},i}(),Us=function(){function i(){}return i.getState=function(t,n){var r=h0(t,n);return vf&&vf.states.push(r),n&&n.batch&&i.batch(n.batch).state.add(r),r},i.from=function(t,n){return n=n||{},"clearProps"in n||(n.clearProps=!0),m0(t,h0(n.targets||t.targets,{props:n.props||t.props,simple:n.simple,kill:!!n.kill}),n,-1)},i.to=function(t,n){return m0(t,h0(n.targets||t.targets,{props:n.props||t.props,simple:n.simple,kill:!!n.kill}),n,1)},i.fromTo=function(t,n,r){return m0(t,n,r)},i.fit=function(t,n,r){var s=r?fc(r,DD):{},o=r||s,a=o.absolute,l=o.scale,c=o.getVars,u=o.props,h=o.runBackwards,d=o.onComplete,f=o.simple,p=r&&r.fitChild&&xf(r.fitChild),m=vv(n,u,f,t),g=vv(t,0,f,m),_=u?Xg[u]:$g,x=Jn.context();return u&&LD(s,m.props),ch(g,_),h&&("immediateRender"in s||(s.immediateRender=!0),s.onComplete=function(){Im(g),d&&d.apply(this,arguments)}),a&&_b(g,m),s=Cc(g,m,l||p,u,p,s.duration||c?s:0),x&&!c&&x.add(function(){return function(){return Im(g)}}),c?s:s.duration?Jn.to(g.element,s):null},i.makeAbsolute=function(t,n){return(t instanceof Br?t:new Br(t,n)).makeAbsolute()},i.batch=function(t){return t||(t="default"),yv[t]||(yv[t]=new pB(t))},i.killFlipsOf=function(t,n){(t instanceof Br?t.targets:jc(t)).forEach(function(r){return r&&yb(r._flip,n!==!1?1:2)})},i.isFlipping=function(t){var n=i.getByTarget(t);return!!n&&n.isActive()},i.getByTarget=function(t){return(xf(t)||Rm)._flip},i.getElementState=function(t,n){return new dl(xf(t),n)},i.convertCoordinates=function(t,n,r){var s=Wn(n,!0,!0).multiply(Wn(t));return r?s.apply(r):s},i.register=function(t){if(ko=typeof document<"u"&&document.body,ko){Jn=t,fb(ko),jc=Jn.utils.toArray,_v=Jn.core.getStyleSaver;var n=Jn.utils.snap(.1);Ns=function(s,o){return n(parseFloat(s)+o)}}},i}();Us.version="3.12.5";typeof window<"u"&&window.gsap&&window.gsap.registerPlugin(Us);const{toggleTransitionComplete:SM,toggleTransitionReady:wM}=vC();let g0=!1,MM;const qh={name:"page-transition",mode:"out-in",onEnter:(i,e)=>{const t=bm();clearTimeout(MM),SM(!0),MM=setTimeout(()=>{g0=!1},1e3);const n=Vn.timeline({defaults:{ease:"sine.out",duration:.4},paused:!0,onStart(){},onComplete(){wM(!0),t.url=null,e()}});t.url==="/"&&n.set(document.documentElement,{"--opacityFede":1}),n.play()},onLeave:(i,e)=>{const t=bm(),n=au();let r;if(window.addEventListener("popstate",()=>{g0=!0,t.url=null}),n.path==="/"&&t.url==="/projects"){const o=i.querySelector("[data-projects-images]").cloneNode(!0);o.classList.add("cloned"),document.documentElement.appendChild(o);const a=document.querySelectorAll(".cloned [data-flip-id]");yu().value=Array.from(a).map(l=>Us.getState(l)),r=i}else if(n.path==="/"&&t.url==="/single-project"){const o=Array.from(i.children).filter(u=>!u.matches("[data-home-projects]")),a=Array.from(i.querySelector("[data-home-projects]").children).filter(u=>!u.matches("[data-projects-images]")),l=i.querySelector("[data-projects-images] .active img");Vn.set(i.querySelector("[data-projects-images]"),{"--alphaBg":1}),r=[o,a,l];const c=t.item;yu().value=Us.getState(c)}else if(n.path==="/projects"&&t.url==="/single-project"){const o=t.item.querySelector(".image");Vn.set(o,{"--alphaBg":1});const a=o.getBoundingClientRect(),l=o.cloneNode(!0);l.classList.add("cloned"),Vn.set(l,{left:a.left,top:a.top,position:"absolute",zIndex:1e3}),document.documentElement.appendChild(l),window.scrollTo(0,0);const c=document.querySelector(".cloned");r=[i,c.querySelector("img")],yu().value=Us.getState(c)}else if(n.name==="projects-single"&&t.url==="/single-project"){const o=Array.from(i.children).filter(u=>!u.matches("[data-next-project]")),a=i.querySelector(".image img"),l=i.querySelector(".next-content");r=[o,a,l];const c=i.querySelector("[data-next-project]");Vn.set(c,{"--alphaBg":1}),setTimeout(()=>{g0?yu().value=!1:(window.scrollTo(0,0),yu().value=Us.getState(c))},150)}else r=i;const s=Vn.timeline({paused:!0,onComplete:()=>{e()}});t.url!=="/"&&s.to(document.documentElement,{"--opacityFede":0,duration:.2},0),SM(!1),wM(!1),s.to(r,{autoAlpha:0,duration:.2,ease:"sine.out"},0).play()}},Xt={pageTransition:qh,layout:!1},Bi={pageTransition:qh,layout:!1},zi={pageTransition:qh,layout:!1},Hi={pageTransition:qh,layout:!1},Vi={pageTransition:qh,layout:!1},EM=[{name:(Xt==null?void 0:Xt.name)??"404",path:(Xt==null?void 0:Xt.path)??"/404",meta:Xt||{},alias:(Xt==null?void 0:Xt.alias)||[],redirect:(Xt==null?void 0:Xt.redirect)||void 0,component:()=>Io(()=>import("./404.NkuVQVho.js"),__vite__mapDeps([0,1,2]),import.meta.url).then(i=>i.default||i)},{name:(Bi==null?void 0:Bi.name)??"about",path:(Bi==null?void 0:Bi.path)??"/about",meta:Bi||{},alias:(Bi==null?void 0:Bi.alias)||[],redirect:(Bi==null?void 0:Bi.redirect)||void 0,component:()=>Io(()=>import("./about.1zmZFrue.js"),__vite__mapDeps([3,1,2,4,5]),import.meta.url).then(i=>i.default||i)},{name:(zi==null?void 0:zi.name)??"index",path:(zi==null?void 0:zi.path)??"/",meta:zi||{},alias:(zi==null?void 0:zi.alias)||[],redirect:(zi==null?void 0:zi.redirect)||void 0,component:()=>Io(()=>import("./index.D9FNPoYz.js"),__vite__mapDeps([6,1,2,4,7,8,9]),import.meta.url).then(i=>i.default||i)},{name:(Hi==null?void 0:Hi.name)??"projects-single",path:(Hi==null?void 0:Hi.path)??"/projects/:single()",meta:Hi||{},alias:(Hi==null?void 0:Hi.alias)||[],redirect:(Hi==null?void 0:Hi.redirect)||void 0,component:()=>Io(()=>import("./_single_.CakgS2l0.js"),__vite__mapDeps([10,1,2,4,8,11]),import.meta.url).then(i=>i.default||i)},{name:(Vi==null?void 0:Vi.name)??"projects",path:(Vi==null?void 0:Vi.path)??"/projects",meta:Vi||{},alias:(Vi==null?void 0:Vi.alias)||[],redirect:(Vi==null?void 0:Vi.redirect)||void 0,component:()=>Io(()=>import("./index.Cyd2F47N.js"),__vite__mapDeps([12,4,7,8,13]),import.meta.url).then(i=>i.default||i)},{path:(Xt==null?void 0:Xt.path)??"/:pathMatch(.*)*",name:(Xt==null?void 0:Xt.name)??"404",meta:Xt||{},alias:(Xt==null?void 0:Xt.alias)||[],redirect:(Xt==null?void 0:Xt.redirect)||void 0,component:()=>Io(()=>import("./404.NkuVQVho.js"),__vite__mapDeps([0,1,2]),import.meta.url).then(i=>i.default||i)}],mB=(i,e,t)=>(e=e===!0?{}:e,{default:()=>{var n;return e?ir(i,e,t):(n=t.default)==null?void 0:n.call(t)}});function TM(i){const e=(i==null?void 0:i.meta.key)??i.path.replace(/(:\w+)\([^)]+\)/g,"$1").replace(/(:\w+)[?+*]/g,"$1").replace(/:\w+/g,t=>{var n;return((n=i.params[t.slice(1)])==null?void 0:n.toString())||""});return typeof e=="function"?e(i):e}function gB(i,e){return i===e?!1:TM(i)!==TM(e)?!0:!i.matched.every((n,r)=>{var s,o;return n.components&&n.components.default===((o=(s=e.matched[r])==null?void 0:s.components)==null?void 0:o.default)})}const _B={scrollBehavior(i,e,t){var c;const n=Vt(),r=((c=ao().options)==null?void 0:c.scrollBehaviorType)??"auto";let s=t||void 0;const o=typeof i.meta.scrollToTop=="function"?i.meta.scrollToTop(i,e):i.meta.scrollToTop;if(!s&&e&&i&&o!==!1&&gB(i,e)&&(s={left:0,top:0}),i.path===e.path){if(e.hash&&!i.hash)return{left:0,top:0};if(i.hash)return{el:i.hash,top:AM(i.hash),behavior:r}}const a=u=>!!(u.meta.pageTransition??qy),l=a(e)&&a(i)?"page:transition:finish":"page:finish";return new Promise(u=>{n.hooks.hookOnce(l,async()=>{await so(),i.hash&&(s={el:i.hash,top:AM(i.hash),behavior:r}),u(s)})})}};function AM(i){try{const e=document.querySelector(i);if(e)return parseFloat(getComputedStyle(e).scrollMarginTop)}catch{}return 0}const yB={hashMode:!1,scrollBehaviorType:"auto"},Mi={...yB,..._B},vB=async i=>{var l;let e,t;if(!((l=i.meta)!=null&&l.validate))return;const n=Vt(),r=ao();if(([e,t]=eh(()=>Promise.resolve(i.meta.validate(i))),e=await e,t(),e)===!0)return;const o=Hx({statusCode:404,statusMessage:`Page Not Found: ${i.fullPath}`,data:{path:i.fullPath}}),a=r.beforeResolve(c=>{if(a(),c===i){const u=r.afterEach(async()=>{u(),await n.runWithContext(()=>ac(o)),window.history.pushState({},"",i.fullPath)});return!1}})},xB=async i=>{let e,t;const n=([e,t]=eh(()=>iC(i.path)),e=await e,t(),e);if(n.redirect)return n.redirect},bB=[vB,xB],bf={};function SB(i,e,t){const{pathname:n,search:r,hash:s}=e,o=i.indexOf("#");if(o>-1){const c=s.includes(i.slice(o))?i.slice(o).length:1;let u=s.slice(c);return u[0]!=="/"&&(u="/"+u),_w(u,"")}const a=_w(n,i),l=!t||fF(a,t,{trailingSlash:!0})?a:t;return l+(l.includes("?")?"":r)+s}const wB=gs({name:"nuxt:router",enforce:"pre",async setup(i){var m,g;let e,t,n=Og().app.baseURL;Mi.hashMode&&!n.includes("#")&&(n+="#");const r=((m=Mi.history)==null?void 0:m.call(Mi,n))??(Mi.hashMode?UN(n):lC(n)),s=((g=Mi.routes)==null?void 0:g.call(Mi,EM))??EM;let o;const a=SB(n,window.location,i.payload.path),l=xU({...Mi,scrollBehavior:(_,x,y)=>{var v;if(x===Kr){o=y;return}return l.options.scrollBehavior=Mi.scrollBehavior,(v=Mi.scrollBehavior)==null?void 0:v.call(Mi,_,Kr,o||y)},history:r,routes:s});i.vueApp.use(l);const c=Hr(l.currentRoute.value);l.afterEach((_,x)=>{c.value=x}),Object.defineProperty(i.vueApp.config.globalProperties,"previousRoute",{get:()=>c.value});const u=Hr(l.resolve(a)),h=()=>{u.value=l.currentRoute.value};i.hook("page:finish",h),l.afterEach((_,x)=>{var y,v,w,T;((v=(y=_.matched[0])==null?void 0:y.components)==null?void 0:v.default)===((T=(w=x.matched[0])==null?void 0:w.components)==null?void 0:T.default)&&h()});const d={};for(const _ in u.value)Object.defineProperty(d,_,{get:()=>u.value[_]});i._route=zh(d),i._middleware=i._middleware||{global:[],named:{}};const f=Ug();try{[e,t]=eh(()=>l.isReady()),await e,t()}catch(_){[e,t]=eh(()=>i.runWithContext(()=>ac(_))),await e,t()}const p=i.payload.state._layout;return l.beforeEach(async(_,x)=>{var y;await i.callHook("page:loading:start"),_.meta=or(_.meta),i.isHydrating&&p&&!cl(_.meta.layout)&&(_.meta.layout=p),i._processingMiddleware=!0;{const v=new Set([...bB,...i._middleware.global]);for(const w of _.matched){const T=w.meta.middleware;if(T)for(const A of Xx(T))v.add(A)}for(const w of v){const T=typeof w=="string"?i._middleware.named[w]||await((y=bf[w])==null?void 0:y.call(bf).then(C=>C.default||C)):w;if(!T)throw new Error(`Unknown route middleware: '${w}'.`);const A=await i.runWithContext(()=>T(_,x));if(!i.payload.serverRendered&&i.isHydrating&&(A===!1||A instanceof Error)){const C=A||Xy({statusCode:404,statusMessage:`Page Not Found: ${a}`});return await i.runWithContext(()=>ac(C)),!1}if(A!==!0&&(A||A===!1))return A}}}),l.onError(async()=>{delete i._processingMiddleware,await i.callHook("page:loading:end")}),l.afterEach(async(_,x,y)=>{delete i._processingMiddleware,!i.isHydrating&&f.value&&await i.runWithContext(iN),y&&await i.callHook("page:loading:end"),_.matched.length===0&&await i.runWithContext(()=>ac(Xy({statusCode:404,fatal:!1,statusMessage:`Page not found: ${_.fullPath}`,data:{path:_.fullPath}})))}),i.hooks.hookOnce("app:created",async()=>{try{await l.replace({...l.resolve(a),name:void 0,force:!0}),l.options.scrollBehavior=Mi.scrollBehavior}catch(_){await i.runWithContext(()=>ac(_))}}),{provide:{router:l}}}}),MB=gs({name:"nuxt:payload",setup(i){ao().beforeResolve(async(e,t)=>{if(e.path===t.path)return;const n=await Pw(e.path);n&&Object.assign(i.static.data,n.data)}),$x(()=>{var e;i.hooks.hook("link:prefetch",async t=>{Wh(t).protocol||await Pw(t)}),((e=navigator.connection)==null?void 0:e.effectiveType)!=="slow-2g"&&setTimeout(kg,1e3)})}}),EB=gs(i=>{let e;async function t(){const n=await kg();e&&clearTimeout(e),e=setTimeout(t,1e3*60*60);const r=await $fetch(Ux("builds/latest.json"));r.id!==n.id&&i.hooks.callHook("app:manifest:update",r)}$x(()=>{e=setTimeout(t,1e3*60*60)})}),TB=gs(i=>{const e=FU();return i.vueApp.use(e),Xh(e),i.payload&&i.payload.pinia&&(e.state.value=i.payload.pinia),{provide:{pinia:e}}}),AB=gs({name:"nuxt:global-components"}),wd={},CB=gs({name:"nuxt:prefetch",setup(i){const e=ao();i.hooks.hook("app:mounted",()=>{e.beforeEach(async t=>{var r;const n=(r=t==null?void 0:t.meta)==null?void 0:r.layout;n&&typeof wd[n]=="function"&&await wd[n]()})}),i.hooks.hook("link:prefetch",t=>{if(Sl(t))return;const n=e.resolve(t);if(!n)return;const r=n.meta.layout;let s=Xx(n.meta.middleware);s=s.filter(o=>typeof o=="string");for(const o of s)typeof bf[o]=="function"&&bf[o]();r&&typeof wd[r]=="function"&&wd[r]()})}}),DB=gs({name:"nuxt:chunk-reload",setup(i){const e=ao(),t=Og(),n=new Set;e.beforeEach(()=>{n.clear()}),i.hook("app:chunkError",({error:s})=>{n.add(s)});function r(s){const a="href"in s&&s.href.startsWith("#")?t.app.baseURL+s.href:ou(t.app.baseURL,s.fullPath);AU({path:a,persistState:!0})}i.hook("app:manifest:update",()=>{e.beforeResolve(r)}),e.onError((s,o)=>{n.has(s)&&r(o)})}});function RB(i,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(i,n.key,n)}}function PB(i,e,t){return e&&RB(i.prototype,e),i}/*!
 * Observer 3.12.5
 * https://gsap.com
 *
 * @license Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Xn,Xp,Ji,Go,Wo,Dc,ND,Ia,Sf,UD,ks,Dr,kD,BD=function(){return Xn||typeof window<"u"&&(Xn=window.gsap)&&Xn.registerPlugin&&Xn},zD=1,hc=[],_t=[],us=[],wf=Date.now,xv=function(e,t){return t},IB=function(){var e=Sf.core,t=e.bridge||{},n=e._scrollers,r=e._proxies;n.push.apply(n,_t),r.push.apply(r,us),_t=n,us=r,xv=function(o,a){return t[o](a)}},Zo=function(e,t){return~us.indexOf(e)&&us[us.indexOf(e)+1][t]},Mf=function(e){return!!~UD.indexOf(e)},ui=function(e,t,n,r,s){return e.addEventListener(t,n,{passive:r!==!1,capture:!!s})},ai=function(e,t,n,r){return e.removeEventListener(t,n,!!r)},Md="scrollLeft",Ed="scrollTop",bv=function(){return ks&&ks.isPressed||_t.cache++},Lm=function(e,t){var n=function r(s){if(s||s===0){zD&&(Ji.history.scrollRestoration="manual");var o=ks&&ks.isPressed;s=r.v=Math.round(s)||(ks&&ks.iOS?1:0),e(s),r.cacheID=_t.cache,o&&xv("ss",s)}else(t||_t.cache!==r.cacheID||xv("ref"))&&(r.cacheID=_t.cache,r.v=e());return r.v+r.offset};return n.offset=0,e&&n},gi={s:Md,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:Lm(function(i){return arguments.length?Ji.scrollTo(i,Rn.sc()):Ji.pageXOffset||Go[Md]||Wo[Md]||Dc[Md]||0})},Rn={s:Ed,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:gi,sc:Lm(function(i){return arguments.length?Ji.scrollTo(gi.sc(),i):Ji.pageYOffset||Go[Ed]||Wo[Ed]||Dc[Ed]||0})},Ai=function(e,t){return(t&&t._ctx&&t._ctx.selector||Xn.utils.toArray)(e)[0]||(typeof e=="string"&&Xn.config().nullTargetWarn!==!1?console.warn("Element not found:",e):null)},ra=function(e,t){var n=t.s,r=t.sc;Mf(e)&&(e=Go.scrollingElement||Wo);var s=_t.indexOf(e),o=r===Rn.sc?1:2;!~s&&(s=_t.push(e)-1),_t[s+o]||ui(e,"scroll",bv);var a=_t[s+o],l=a||(_t[s+o]=Lm(Zo(e,n),!0)||(Mf(e)?r:Lm(function(c){return arguments.length?e[n]=c:e[n]})));return l.target=e,a||(l.smooth=Xn.getProperty(e,"scrollBehavior")==="smooth"),l},Sv=function(e,t,n){var r=e,s=e,o=wf(),a=o,l=t||50,c=Math.max(500,l*3),u=function(p,m){var g=wf();m||g-o>l?(s=r,r=p,a=o,o=g):n?r+=p:r=s+(p-s)/(g-a)*(o-a)},h=function(){s=r=n?0:r,a=o=0},d=function(p){var m=a,g=s,_=wf();return(p||p===0)&&p!==r&&u(p),o===a||_-a>c?0:(r+(n?g:-g))/((n?_:o)-m)*1e3};return{update:u,reset:h,getVelocity:d}},xu=function(e,t){return t&&!e._gsapAllow&&e.preventDefault(),e.changedTouches?e.changedTouches[0]:e},CM=function(e){var t=Math.max.apply(Math,e),n=Math.min.apply(Math,e);return Math.abs(t)>=Math.abs(n)?t:n},HD=function(){Sf=Xn.core.globals().ScrollTrigger,Sf&&Sf.core&&IB()},VD=function(e){return Xn=e||BD(),!Xp&&Xn&&typeof document<"u"&&document.body&&(Ji=window,Go=document,Wo=Go.documentElement,Dc=Go.body,UD=[Ji,Go,Wo,Dc],Xn.utils.clamp,kD=Xn.core.context||function(){},Ia="onpointerenter"in Dc?"pointer":"mouse",ND=sn.isTouch=Ji.matchMedia&&Ji.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in Ji||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,Dr=sn.eventTypes=("ontouchstart"in Wo?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in Wo?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return zD=0},500),HD(),Xp=1),Xp};gi.op=Rn;_t.cache=0;var sn=function(){function i(t){this.init(t)}var e=i.prototype;return e.init=function(n){Xp||VD(Xn)||console.warn("Please gsap.registerPlugin(Observer)"),Sf||HD();var r=n.tolerance,s=n.dragMinimum,o=n.type,a=n.target,l=n.lineHeight,c=n.debounce,u=n.preventDefault,h=n.onStop,d=n.onStopDelay,f=n.ignore,p=n.wheelSpeed,m=n.event,g=n.onDragStart,_=n.onDragEnd,x=n.onDrag,y=n.onPress,v=n.onRelease,w=n.onRight,T=n.onLeft,A=n.onUp,C=n.onDown,M=n.onChangeX,b=n.onChangeY,R=n.onChange,L=n.onToggleX,F=n.onToggleY,H=n.onHover,W=n.onHoverEnd,N=n.onMove,$=n.ignoreCheck,X=n.isNormalizer,Z=n.onGestureStart,z=n.onGestureEnd,ue=n.onWheel,me=n.onEnable,Ue=n.onDisable,ie=n.onClick,le=n.scrollSpeed,ye=n.capture,Y=n.allowClicks,ae=n.lockAxis,de=n.onLockAxis;this.target=a=Ai(a)||Wo,this.vars=n,f&&(f=Xn.utils.toArray(f)),r=r||1e-9,s=s||0,p=p||1,le=le||1,o=o||"wheel,touch,pointer",c=c!==!1,l||(l=parseFloat(Ji.getComputedStyle(Dc).lineHeight)||22);var be,Re,E,P,O,V,q,U=this,se=0,G=0,D=n.passive||!u,S=ra(a,gi),k=ra(a,Rn),K=S(),J=k(),ne=~o.indexOf("touch")&&!~o.indexOf("pointer")&&Dr[0]==="pointerdown",Me=Mf(a),he=a.ownerDocument||Go,we=[0,0,0],Ie=[0,0,0],ge=0,Le=function(){return ge=wf()},De=function(fe,Ce){return(U.event=fe)&&f&&~f.indexOf(fe.target)||Ce&&ne&&fe.pointerType!=="touch"||$&&$(fe,Ce)},Ke=function(){U._vx.reset(),U._vy.reset(),Re.pause(),h&&h(U)},Ne=function(){var fe=U.deltaX=CM(we),Ce=U.deltaY=CM(Ie),pe=Math.abs(fe)>=r,Oe=Math.abs(Ce)>=r;R&&(pe||Oe)&&R(U,fe,Ce,we,Ie),pe&&(w&&U.deltaX>0&&w(U),T&&U.deltaX<0&&T(U),M&&M(U),L&&U.deltaX<0!=se<0&&L(U),se=U.deltaX,we[0]=we[1]=we[2]=0),Oe&&(C&&U.deltaY>0&&C(U),A&&U.deltaY<0&&A(U),b&&b(U),F&&U.deltaY<0!=G<0&&F(U),G=U.deltaY,Ie[0]=Ie[1]=Ie[2]=0),(P||E)&&(N&&N(U),E&&(x(U),E=!1),P=!1),V&&!(V=!1)&&de&&de(U),O&&(ue(U),O=!1),be=0},ze=function(fe,Ce,pe){we[pe]+=fe,Ie[pe]+=Ce,U._vx.update(fe),U._vy.update(Ce),c?be||(be=requestAnimationFrame(Ne)):Ne()},Ye=function(fe,Ce){ae&&!q&&(U.axis=q=Math.abs(fe)>Math.abs(Ce)?"x":"y",V=!0),q!=="y"&&(we[2]+=fe,U._vx.update(fe,!0)),q!=="x"&&(Ie[2]+=Ce,U._vy.update(Ce,!0)),c?be||(be=requestAnimationFrame(Ne)):Ne()},lt=function(fe){if(!De(fe,1)){fe=xu(fe,u);var Ce=fe.clientX,pe=fe.clientY,Oe=Ce-U.x,Ae=pe-U.y,Ge=U.isDragging;U.x=Ce,U.y=pe,(Ge||Math.abs(U.startX-Ce)>=s||Math.abs(U.startY-pe)>=s)&&(x&&(E=!0),Ge||(U.isDragging=!0),Ye(Oe,Ae),Ge||g&&g(U))}},Q=U.onPress=function(ee){De(ee,1)||ee&&ee.button||(U.axis=q=null,Re.pause(),U.isPressed=!0,ee=xu(ee),se=G=0,U.startX=U.x=ee.clientX,U.startY=U.y=ee.clientY,U._vx.reset(),U._vy.reset(),ui(X?a:he,Dr[1],lt,D,!0),U.deltaX=U.deltaY=0,y&&y(U))},ve=U.onRelease=function(ee){if(!De(ee,1)){ai(X?a:he,Dr[1],lt,!0);var fe=!isNaN(U.y-U.startY),Ce=U.isDragging,pe=Ce&&(Math.abs(U.x-U.startX)>3||Math.abs(U.y-U.startY)>3),Oe=xu(ee);!pe&&fe&&(U._vx.reset(),U._vy.reset(),u&&Y&&Xn.delayedCall(.08,function(){if(wf()-ge>300&&!ee.defaultPrevented){if(ee.target.click)ee.target.click();else if(he.createEvent){var Ae=he.createEvent("MouseEvents");Ae.initMouseEvent("click",!0,!0,Ji,1,Oe.screenX,Oe.screenY,Oe.clientX,Oe.clientY,!1,!1,!1,!1,0,null),ee.target.dispatchEvent(Ae)}}})),U.isDragging=U.isGesturing=U.isPressed=!1,h&&Ce&&!X&&Re.restart(!0),_&&Ce&&_(U),v&&v(U,pe)}},Se=function(fe){return fe.touches&&fe.touches.length>1&&(U.isGesturing=!0)&&Z(fe,U.isDragging)},xe=function(){return(U.isGesturing=!1)||z(U)},Ee=function(fe){if(!De(fe)){var Ce=S(),pe=k();ze((Ce-K)*le,(pe-J)*le,1),K=Ce,J=pe,h&&Re.restart(!0)}},Ve=function(fe){if(!De(fe)){fe=xu(fe,u),ue&&(O=!0);var Ce=(fe.deltaMode===1?l:fe.deltaMode===2?Ji.innerHeight:1)*p;ze(fe.deltaX*Ce,fe.deltaY*Ce,0),h&&!X&&Re.restart(!0)}},it=function(fe){if(!De(fe)){var Ce=fe.clientX,pe=fe.clientY,Oe=Ce-U.x,Ae=pe-U.y;U.x=Ce,U.y=pe,P=!0,h&&Re.restart(!0),(Oe||Ae)&&Ye(Oe,Ae)}},Fe=function(fe){U.event=fe,H(U)},j=function(fe){U.event=fe,W(U)},_e=function(fe){return De(fe)||xu(fe,u)&&ie(U)};Re=U._dc=Xn.delayedCall(d||.25,Ke).pause(),U.deltaX=U.deltaY=0,U._vx=Sv(0,50,!0),U._vy=Sv(0,50,!0),U.scrollX=S,U.scrollY=k,U.isDragging=U.isGesturing=U.isPressed=!1,kD(this),U.enable=function(ee){return U.isEnabled||(ui(Me?he:a,"scroll",bv),o.indexOf("scroll")>=0&&ui(Me?he:a,"scroll",Ee,D,ye),o.indexOf("wheel")>=0&&ui(a,"wheel",Ve,D,ye),(o.indexOf("touch")>=0&&ND||o.indexOf("pointer")>=0)&&(ui(a,Dr[0],Q,D,ye),ui(he,Dr[2],ve),ui(he,Dr[3],ve),Y&&ui(a,"click",Le,!0,!0),ie&&ui(a,"click",_e),Z&&ui(he,"gesturestart",Se),z&&ui(he,"gestureend",xe),H&&ui(a,Ia+"enter",Fe),W&&ui(a,Ia+"leave",j),N&&ui(a,Ia+"move",it)),U.isEnabled=!0,ee&&ee.type&&Q(ee),me&&me(U)),U},U.disable=function(){U.isEnabled&&(hc.filter(function(ee){return ee!==U&&Mf(ee.target)}).length||ai(Me?he:a,"scroll",bv),U.isPressed&&(U._vx.reset(),U._vy.reset(),ai(X?a:he,Dr[1],lt,!0)),ai(Me?he:a,"scroll",Ee,ye),ai(a,"wheel",Ve,ye),ai(a,Dr[0],Q,ye),ai(he,Dr[2],ve),ai(he,Dr[3],ve),ai(a,"click",Le,!0),ai(a,"click",_e),ai(he,"gesturestart",Se),ai(he,"gestureend",xe),ai(a,Ia+"enter",Fe),ai(a,Ia+"leave",j),ai(a,Ia+"move",it),U.isEnabled=U.isPressed=U.isDragging=!1,Ue&&Ue(U))},U.kill=U.revert=function(){U.disable();var ee=hc.indexOf(U);ee>=0&&hc.splice(ee,1),ks===U&&(ks=0)},hc.push(U),X&&Mf(a)&&(ks=U),U.enable(m)},PB(i,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),i}();sn.version="3.12.5";sn.create=function(i){return new sn(i)};sn.register=VD;sn.getAll=function(){return hc.slice()};sn.getById=function(i){return hc.filter(function(e){return e.vars.id===i})[0]};BD()&&Xn.registerPlugin(sn);/*!
 * strings: 3.12.5
 * https://gsap.com
 *
 * Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var LB=/(?:^\s+|\s+$)/g,GD=/([\uD800-\uDBFF][\uDC00-\uDFFF](?:[\u200D\uFE0F][\uD800-\uDBFF][\uDC00-\uDFFF]){2,}|\uD83D\uDC69(?:\u200D(?:(?:\uD83D\uDC69\u200D)?\uD83D\uDC67|(?:\uD83D\uDC69\u200D)?\uD83D\uDC66)|\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC69\u200D(?:\uD83D\uDC69\u200D)?\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D(?:\uD83D\uDC69\u200D)?\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]\uFE0F|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC6F\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3C-\uDD3E\uDDD6-\uDDDF])\u200D[\u2640\u2642]\uFE0F|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDF4\uD83C\uDDF2|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F\u200D[\u2640\u2642]|(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642])\uFE0F|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\uD83D\uDC69\u200D[\u2695\u2696\u2708]|\uD83D\uDC68(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708]))\uFE0F|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83D\uDC69\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69]))|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67)\uDB40\uDC7F|\uD83D\uDC68(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC66\u200D\uD83D\uDC66|(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92])|(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]))|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDD1-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\u200D(?:(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC67|(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC66)|\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC69\uDC6E\uDC70-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD26\uDD30-\uDD39\uDD3D\uDD3E\uDDD1-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])?|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDEEB\uDEEC\uDEF4-\uDEF8]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD4C\uDD50-\uDD6B\uDD80-\uDD97\uDDC0\uDDD0-\uDDE6])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267B\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEF8]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD4C\uDD50-\uDD6B\uDD80-\uDD97\uDDC0\uDDD0-\uDDE6])\uFE0F)/;function vb(i){var e=i.nodeType,t="";if(e===1||e===9||e===11){if(typeof i.textContent=="string")return i.textContent;for(i=i.firstChild;i;i=i.nextSibling)t+=vb(i)}else if(e===3||e===4)return i.nodeValue;return t}function wv(i,e,t,n){for(var r=i.firstChild,s=[],o;r;)r.nodeType===3?(o=(r.nodeValue+"").replace(/^\n+/g,""),n||(o=o.replace(/\s+/g," ")),s.push.apply(s,WD(o,e,t,n))):(r.nodeName+"").toLowerCase()==="br"?s[s.length-1]+="<br>":s.push(r.outerHTML),r=r.nextSibling;for(o=s.length;o--;)s[o]==="&"&&s.splice(o,1,"&amp;");return s}function WD(i,e,t,n){if(i+="",t&&(i=i.trim?i.trim():i.replace(LB,"")),e&&e!=="")return i.replace(/>/g,"&gt;").replace(/</g,"&lt;").split(e);for(var r=[],s=i.length,o=0,a,l;o<s;o++)l=i.charAt(o),(l.charCodeAt(0)>=55296&&l.charCodeAt(0)<=56319||i.charCodeAt(o+1)>=65024&&i.charCodeAt(o+1)<=65039)&&(a=((i.substr(o,12).split(GD)||[])[1]||"").length||2,l=i.substr(o,a),r.emoji=1,o+=a-1),r.push(l===">"?"&gt;":l==="<"?"&lt;":n&&l===" "&&(i.charAt(o-1)===" "||i.charAt(o+1)===" ")?"&nbsp;":l);return r}/*!
 * TextPlugin 3.12.5
 * https://gsap.com
 *
 * @license Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var $u,Td,FB=function(){return $u||typeof window<"u"&&($u=window.gsap)&&$u.registerPlugin&&$u},Yh={version:"3.12.5",name:"text",init:function(e,t,n){typeof t!="object"&&(t={value:t});var r=e.nodeName.toUpperCase(),s=this,o=t,a=o.newClass,l=o.oldClass,c=o.preserveSpaces,u=o.rtl,h=s.delimiter=t.delimiter||"",d=s.fillChar=t.fillChar||(t.padSpace?"&nbsp;":""),f,p,m,g,_,x,y,v;if(s.svg=e.getBBox&&(r==="TEXT"||r==="TSPAN"),!("innerHTML"in e)&&!s.svg)return!1;if(s.target=e,!("value"in t)){s.text=s.original=[""];return}for(m=wv(e,h,!1,c),Td||(Td=document.createElement("div")),Td.innerHTML=t.value,p=wv(Td,h,!1,c),s.from=n._from,(s.from||u)&&!(u&&s.from)&&(r=m,m=p,p=r),s.hasClass=!!(a||l),s.newClass=u?l:a,s.oldClass=u?a:l,r=m.length-p.length,f=r<0?m:p,r<0&&(r=-r);--r>-1;)f.push(d);if(t.type==="diff"){for(g=0,_=[],x=[],y="",r=0;r<p.length;r++)v=p[r],v===m[r]?y+=v:(_[g]=y+v,x[g++]=y+m[r],y="");p=_,m=x,y&&(p.push(y),m.push(y))}t.speed&&n.duration(Math.min(.05/t.speed*f.length,t.maxDuration||9999)),s.rtl=u,s.original=m,s.text=p,s._props.push("text")},render:function(e,t){e>1?e=1:e<0&&(e=0),t.from&&(e=1-e);var n=t.text,r=t.hasClass,s=t.newClass,o=t.oldClass,a=t.delimiter,l=t.target,c=t.fillChar,u=t.original,h=t.rtl,d=n.length,f=(h?1-e:e)*d+.5|0,p,m,g;r&&e?(p=s&&f,m=o&&f!==d,g=(p?"<span class='"+s+"'>":"")+n.slice(0,f).join(a)+(p?"</span>":"")+(m?"<span class='"+o+"'>":"")+a+u.slice(f).join(a)+(m?"</span>":"")):g=n.slice(0,f).join(a)+a+u.slice(f).join(a),t.svg?l.textContent=g:l.innerHTML=c==="&nbsp;"&&~g.indexOf("  ")?g.split("  ").join("&nbsp;&nbsp;"):g}};Yh.splitInnerHTML=wv;Yh.emojiSafeSplit=WD;Yh.getText=vb;FB()&&$u.registerPlugin(Yh);/*!
 * ScrollTrigger 3.12.5
 * https://gsap.com
 *
 * @license Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var je,ic,St,en,Pr,jt,XD,Fm,uh,Ef,qu,Ad,jn,qg,Mv,di,DM,RM,rc,$D,_0,qD,hi,Ev,YD,jD,Do,Tv,xb,Rc,bb,Om,Av,y0,Cd=1,Zn=Date.now,v0=Zn(),wr=0,Yu=0,PM=function(e,t,n){var r=qi(e)&&(e.substr(0,6)==="clamp("||e.indexOf("max")>-1);return n["_"+t+"Clamp"]=r,r?e.substr(6,e.length-7):e},IM=function(e,t){return t&&(!qi(e)||e.substr(0,6)!=="clamp(")?"clamp("+e+")":e},OB=function i(){return Yu&&requestAnimationFrame(i)},LM=function(){return qg=1},FM=function(){return qg=0},es=function(e){return e},ju=function(e){return Math.round(e*1e5)/1e5||0},KD=function(){return typeof window<"u"},ZD=function(){return je||KD()&&(je=window.gsap)&&je.registerPlugin&&je},pl=function(e){return!!~XD.indexOf(e)},JD=function(e){return(e==="Height"?bb:St["inner"+e])||Pr["client"+e]||jt["client"+e]},QD=function(e){return Zo(e,"getBoundingClientRect")||(pl(e)?function(){return Kp.width=St.innerWidth,Kp.height=bb,Kp}:function(){return Ps(e)})},NB=function(e,t,n){var r=n.d,s=n.d2,o=n.a;return(o=Zo(e,"getBoundingClientRect"))?function(){return o()[r]}:function(){return(t?JD(s):e["client"+s])||0}},UB=function(e,t){return!t||~us.indexOf(e)?QD(e):function(){return Kp}},os=function(e,t){var n=t.s,r=t.d2,s=t.d,o=t.a;return Math.max(0,(n="scroll"+r)&&(o=Zo(e,n))?o()-QD(e)()[s]:pl(e)?(Pr[n]||jt[n])-JD(r):e[n]-e["offset"+r])},Dd=function(e,t){for(var n=0;n<rc.length;n+=3)(!t||~t.indexOf(rc[n+1]))&&e(rc[n],rc[n+1],rc[n+2])},qi=function(e){return typeof e=="string"},_i=function(e){return typeof e=="function"},Ku=function(e){return typeof e=="number"},La=function(e){return typeof e=="object"},bu=function(e,t,n){return e&&e.progress(t?0:1)&&n&&e.pause()},x0=function(e,t){if(e.enabled){var n=e._ctx?e._ctx.add(function(){return t(e)}):t(e);n&&n.totalTime&&(e.callbackAnimation=n)}},Pl=Math.abs,eR="left",tR="top",Sb="right",wb="bottom",el="width",tl="height",Tf="Right",Af="Left",Cf="Top",Df="Bottom",vn="padding",gr="margin",Kc="Width",Mb="Height",An="px",_r=function(e){return St.getComputedStyle(e)},kB=function(e){var t=_r(e).position;e.style.position=t==="absolute"||t==="fixed"?t:"relative"},OM=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},Ps=function(e,t){var n=t&&_r(e)[Mv]!=="matrix(1, 0, 0, 1, 0, 0)"&&je.to(e,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),r=e.getBoundingClientRect();return n&&n.progress(0).kill(),r},Nm=function(e,t){var n=t.d2;return e["offset"+n]||e["client"+n]||0},nR=function(e){var t=[],n=e.labels,r=e.duration(),s;for(s in n)t.push(n[s]/r);return t},BB=function(e){return function(t){return je.utils.snap(nR(e),t)}},Eb=function(e){var t=je.utils.snap(e),n=Array.isArray(e)&&e.slice(0).sort(function(r,s){return r-s});return n?function(r,s,o){o===void 0&&(o=.001);var a;if(!s)return t(r);if(s>0){for(r-=o,a=0;a<n.length;a++)if(n[a]>=r)return n[a];return n[a-1]}else for(a=n.length,r+=o;a--;)if(n[a]<=r)return n[a];return n[0]}:function(r,s,o){o===void 0&&(o=.001);var a=t(r);return!s||Math.abs(a-r)<o||a-r<0==s<0?a:t(s<0?r-e:r+e)}},zB=function(e){return function(t,n){return Eb(nR(e))(t,n.direction)}},Rd=function(e,t,n,r){return n.split(",").forEach(function(s){return e(t,s,r)})},On=function(e,t,n,r,s){return e.addEventListener(t,n,{passive:!r,capture:!!s})},Fn=function(e,t,n,r){return e.removeEventListener(t,n,!!r)},Pd=function(e,t,n){n=n&&n.wheelHandler,n&&(e(t,"wheel",n),e(t,"touchmove",n))},NM={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},Id={toggleActions:"play",anticipatePin:0},Um={top:0,left:0,center:.5,bottom:1,right:1},$p=function(e,t){if(qi(e)){var n=e.indexOf("="),r=~n?+(e.charAt(n-1)+1)*parseFloat(e.substr(n+1)):0;~n&&(e.indexOf("%")>n&&(r*=t/100),e=e.substr(0,n-1)),e=r+(e in Um?Um[e]*t:~e.indexOf("%")?parseFloat(e)*t/100:parseFloat(e)||0)}return e},Ld=function(e,t,n,r,s,o,a,l){var c=s.startColor,u=s.endColor,h=s.fontSize,d=s.indent,f=s.fontWeight,p=en.createElement("div"),m=pl(n)||Zo(n,"pinType")==="fixed",g=e.indexOf("scroller")!==-1,_=m?jt:n,x=e.indexOf("start")!==-1,y=x?c:u,v="border-color:"+y+";font-size:"+h+";color:"+y+";font-weight:"+f+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return v+="position:"+((g||l)&&m?"fixed;":"absolute;"),(g||l||!m)&&(v+=(r===Rn?Sb:wb)+":"+(o+parseFloat(d))+"px;"),a&&(v+="box-sizing:border-box;text-align:left;width:"+a.offsetWidth+"px;"),p._isStart=x,p.setAttribute("class","gsap-marker-"+e+(t?" marker-"+t:"")),p.style.cssText=v,p.innerText=t||t===0?e+"-"+t:e,_.children[0]?_.insertBefore(p,_.children[0]):_.appendChild(p),p._offset=p["offset"+r.op.d2],qp(p,0,r,x),p},qp=function(e,t,n,r){var s={display:"block"},o=n[r?"os2":"p2"],a=n[r?"p2":"os2"];e._isFlipped=r,s[n.a+"Percent"]=r?-100:0,s[n.a]=r?"1px":0,s["border"+o+Kc]=1,s["border"+a+Kc]=0,s[n.p]=t+"px",je.set(e,s)},mt=[],Cv={},fh,UM=function(){return Zn()-wr>34&&(fh||(fh=requestAnimationFrame(Xs)))},Il=function(){(!hi||!hi.isPressed||hi.startX>jt.clientWidth)&&(_t.cache++,hi?fh||(fh=requestAnimationFrame(Xs)):Xs(),wr||gl("scrollStart"),wr=Zn())},b0=function(){jD=St.innerWidth,YD=St.innerHeight},Zu=function(){_t.cache++,!jn&&!qD&&!en.fullscreenElement&&!en.webkitFullscreenElement&&(!Ev||jD!==St.innerWidth||Math.abs(St.innerHeight-YD)>St.innerHeight*.25)&&Fm.restart(!0)},ml={},HB=[],iR=function i(){return Fn(yt,"scrollEnd",i)||Ha(!0)},gl=function(e){return ml[e]&&ml[e].map(function(t){return t()})||HB},$i=[],rR=function(e){for(var t=0;t<$i.length;t+=5)(!e||$i[t+4]&&$i[t+4].query===e)&&($i[t].style.cssText=$i[t+1],$i[t].getBBox&&$i[t].setAttribute("transform",$i[t+2]||""),$i[t+3].uncache=1)},Tb=function(e,t){var n;for(di=0;di<mt.length;di++)n=mt[di],n&&(!t||n._ctx===t)&&(e?n.kill(1):n.revert(!0,!0));Om=!0,t&&rR(t),t||gl("revert")},sR=function(e,t){_t.cache++,(t||!pi)&&_t.forEach(function(n){return _i(n)&&n.cacheID++&&(n.rec=0)}),qi(e)&&(St.history.scrollRestoration=xb=e)},pi,nl=0,kM,VB=function(){if(kM!==nl){var e=kM=nl;requestAnimationFrame(function(){return e===nl&&Ha(!0)})}},oR=function(){jt.appendChild(Rc),bb=!hi&&Rc.offsetHeight||St.innerHeight,jt.removeChild(Rc)},BM=function(e){return uh(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(t){return t.style.display=e?"none":"block"})},Ha=function(e,t){if(wr&&!e&&!Om){On(yt,"scrollEnd",iR);return}oR(),pi=yt.isRefreshing=!0,_t.forEach(function(r){return _i(r)&&++r.cacheID&&(r.rec=r())});var n=gl("refreshInit");$D&&yt.sort(),t||Tb(),_t.forEach(function(r){_i(r)&&(r.smooth&&(r.target.style.scrollBehavior="auto"),r(0))}),mt.slice(0).forEach(function(r){return r.refresh()}),Om=!1,mt.forEach(function(r){if(r._subPinOffset&&r.pin){var s=r.vars.horizontal?"offsetWidth":"offsetHeight",o=r.pin[s];r.revert(!0,1),r.adjustPinSpacing(r.pin[s]-o),r.refresh()}}),Av=1,BM(!0),mt.forEach(function(r){var s=os(r.scroller,r._dir),o=r.vars.end==="max"||r._endClamp&&r.end>s,a=r._startClamp&&r.start>=s;(o||a)&&r.setPositions(a?s-1:r.start,o?Math.max(a?s:r.start+1,s):r.end,!0)}),BM(!1),Av=0,n.forEach(function(r){return r&&r.render&&r.render(-1)}),_t.forEach(function(r){_i(r)&&(r.smooth&&requestAnimationFrame(function(){return r.target.style.scrollBehavior="smooth"}),r.rec&&r(r.rec))}),sR(xb,1),Fm.pause(),nl++,pi=2,Xs(2),mt.forEach(function(r){return _i(r.vars.onRefresh)&&r.vars.onRefresh(r)}),pi=yt.isRefreshing=!1,gl("refresh")},Dv=0,Yp=1,Rf,Xs=function(e){if(e===2||!pi&&!Om){yt.isUpdating=!0,Rf&&Rf.update(0);var t=mt.length,n=Zn(),r=n-v0>=50,s=t&&mt[0].scroll();if(Yp=Dv>s?-1:1,pi||(Dv=s),r&&(wr&&!qg&&n-wr>200&&(wr=0,gl("scrollEnd")),qu=v0,v0=n),Yp<0){for(di=t;di-- >0;)mt[di]&&mt[di].update(0,r);Yp=1}else for(di=0;di<t;di++)mt[di]&&mt[di].update(0,r);yt.isUpdating=!1}fh=0},Rv=[eR,tR,wb,Sb,gr+Df,gr+Tf,gr+Cf,gr+Af,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],jp=Rv.concat([el,tl,"boxSizing","max"+Kc,"max"+Mb,"position",gr,vn,vn+Cf,vn+Tf,vn+Df,vn+Af]),GB=function(e,t,n){Pc(n);var r=e._gsap;if(r.spacerIsNative)Pc(r.spacerState);else if(e._gsap.swappedIn){var s=t.parentNode;s&&(s.insertBefore(e,t),s.removeChild(t))}e._gsap.swappedIn=!1},S0=function(e,t,n,r){if(!e._gsap.swappedIn){for(var s=Rv.length,o=t.style,a=e.style,l;s--;)l=Rv[s],o[l]=n[l];o.position=n.position==="absolute"?"absolute":"relative",n.display==="inline"&&(o.display="inline-block"),a[wb]=a[Sb]="auto",o.flexBasis=n.flexBasis||"auto",o.overflow="visible",o.boxSizing="border-box",o[el]=Nm(e,gi)+An,o[tl]=Nm(e,Rn)+An,o[vn]=a[gr]=a[tR]=a[eR]="0",Pc(r),a[el]=a["max"+Kc]=n[el],a[tl]=a["max"+Mb]=n[tl],a[vn]=n[vn],e.parentNode!==t&&(e.parentNode.insertBefore(t,e),t.appendChild(e)),e._gsap.swappedIn=!0}},WB=/([A-Z])/g,Pc=function(e){if(e){var t=e.t.style,n=e.length,r=0,s,o;for((e.t._gsap||je.core.getCache(e.t)).uncache=1;r<n;r+=2)o=e[r+1],s=e[r],o?t[s]=o:t[s]&&t.removeProperty(s.replace(WB,"-$1").toLowerCase())}},Fd=function(e){for(var t=jp.length,n=e.style,r=[],s=0;s<t;s++)r.push(jp[s],n[jp[s]]);return r.t=e,r},XB=function(e,t,n){for(var r=[],s=e.length,o=n?8:0,a;o<s;o+=2)a=e[o],r.push(a,a in t?t[a]:e[o+1]);return r.t=e.t,r},Kp={left:0,top:0},zM=function(e,t,n,r,s,o,a,l,c,u,h,d,f,p){_i(e)&&(e=e(l)),qi(e)&&e.substr(0,3)==="max"&&(e=d+(e.charAt(4)==="="?$p("0"+e.substr(3),n):0));var m=f?f.time():0,g,_,x;if(f&&f.seek(0),isNaN(e)||(e=+e),Ku(e))f&&(e=je.utils.mapRange(f.scrollTrigger.start,f.scrollTrigger.end,0,d,e)),a&&qp(a,n,r,!0);else{_i(t)&&(t=t(l));var y=(e||"0").split(" "),v,w,T,A;x=Ai(t,l)||jt,v=Ps(x)||{},(!v||!v.left&&!v.top)&&_r(x).display==="none"&&(A=x.style.display,x.style.display="block",v=Ps(x),A?x.style.display=A:x.style.removeProperty("display")),w=$p(y[0],v[r.d]),T=$p(y[1]||"0",n),e=v[r.p]-c[r.p]-u+w+s-T,a&&qp(a,T,r,n-T<20||a._isStart&&T>20),n-=n-T}if(p&&(l[p]=e||-.001,e<0&&(e=0)),o){var C=e+n,M=o._isStart;g="scroll"+r.d2,qp(o,C,r,M&&C>20||!M&&(h?Math.max(jt[g],Pr[g]):o.parentNode[g])<=C+1),h&&(c=Ps(a),h&&(o.style[r.op.p]=c[r.op.p]-r.op.m-o._offset+An))}return f&&x&&(g=Ps(x),f.seek(d),_=Ps(x),f._caScrollDist=g[r.p]-_[r.p],e=e/f._caScrollDist*d),f&&f.seek(m),f?e:Math.round(e)},$B=/(webkit|moz|length|cssText|inset)/i,HM=function(e,t,n,r){if(e.parentNode!==t){var s=e.style,o,a;if(t===jt){e._stOrig=s.cssText,a=_r(e);for(o in a)!+o&&!$B.test(o)&&a[o]&&typeof s[o]=="string"&&o!=="0"&&(s[o]=a[o]);s.top=n,s.left=r}else s.cssText=e._stOrig;je.core.getCache(e).uncache=1,t.appendChild(e)}},aR=function(e,t,n){var r=t,s=r;return function(o){var a=Math.round(e());return a!==r&&a!==s&&Math.abs(a-r)>3&&Math.abs(a-s)>3&&(o=a,n&&n()),s=r,r=o,o}},Od=function(e,t,n){var r={};r[t.p]="+="+n,je.set(e,r)},VM=function(e,t){var n=ra(e,t),r="_scroll"+t.p2,s=function o(a,l,c,u,h){var d=o.tween,f=l.onComplete,p={};c=c||n();var m=aR(n,c,function(){d.kill(),o.tween=0});return h=u&&h||0,u=u||a-c,d&&d.kill(),l[r]=a,l.inherit=!1,l.modifiers=p,p[r]=function(){return m(c+u*d.ratio+h*d.ratio*d.ratio)},l.onUpdate=function(){_t.cache++,o.tween&&Xs()},l.onComplete=function(){o.tween=0,f&&f.call(d)},d=o.tween=je.to(e,l),d};return e[r]=n,n.wheelHandler=function(){return s.tween&&s.tween.kill()&&(s.tween=0)},On(e,"wheel",n.wheelHandler),yt.isTouch&&On(e,"touchmove",n.wheelHandler),s},yt=function(){function i(t,n){ic||i.register(je)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),Tv(this),this.init(t,n)}var e=i.prototype;return e.init=function(n,r){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!Yu){this.update=this.refresh=this.kill=es;return}n=OM(qi(n)||Ku(n)||n.nodeType?{trigger:n}:n,Id);var s=n,o=s.onUpdate,a=s.toggleClass,l=s.id,c=s.onToggle,u=s.onRefresh,h=s.scrub,d=s.trigger,f=s.pin,p=s.pinSpacing,m=s.invalidateOnRefresh,g=s.anticipatePin,_=s.onScrubComplete,x=s.onSnapComplete,y=s.once,v=s.snap,w=s.pinReparent,T=s.pinSpacer,A=s.containerAnimation,C=s.fastScrollEnd,M=s.preventOverlaps,b=n.horizontal||n.containerAnimation&&n.horizontal!==!1?gi:Rn,R=!h&&h!==0,L=Ai(n.scroller||St),F=je.core.getCache(L),H=pl(L),W=("pinType"in n?n.pinType:Zo(L,"pinType")||H&&"fixed")==="fixed",N=[n.onEnter,n.onLeave,n.onEnterBack,n.onLeaveBack],$=R&&n.toggleActions.split(" "),X="markers"in n?n.markers:Id.markers,Z=H?0:parseFloat(_r(L)["border"+b.p2+Kc])||0,z=this,ue=n.onRefreshInit&&function(){return n.onRefreshInit(z)},me=NB(L,H,b),Ue=UB(L,H),ie=0,le=0,ye=0,Y=ra(L,b),ae,de,be,Re,E,P,O,V,q,U,se,G,D,S,k,K,J,ne,Me,he,we,Ie,ge,Le,De,Ke,Ne,ze,Ye,lt,Q,ve,Se,xe,Ee,Ve,it,Fe,j;if(z._startClamp=z._endClamp=!1,z._dir=b,g*=45,z.scroller=L,z.scroll=A?A.time.bind(A):Y,Re=Y(),z.vars=n,r=r||n.animation,"refreshPriority"in n&&($D=1,n.refreshPriority===-9999&&(Rf=z)),F.tweenScroll=F.tweenScroll||{top:VM(L,Rn),left:VM(L,gi)},z.tweenTo=ae=F.tweenScroll[b.p],z.scrubDuration=function(pe){Se=Ku(pe)&&pe,Se?ve?ve.duration(pe):ve=je.to(r,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:Se,paused:!0,onComplete:function(){return _&&_(z)}}):(ve&&ve.progress(1).kill(),ve=0)},r&&(r.vars.lazy=!1,r._initted&&!z.isReverted||r.vars.immediateRender!==!1&&n.immediateRender!==!1&&r.duration()&&r.render(0,!0,!0),z.animation=r.pause(),r.scrollTrigger=z,z.scrubDuration(h),lt=0,l||(l=r.vars.id)),v&&((!La(v)||v.push)&&(v={snapTo:v}),"scrollBehavior"in jt.style&&je.set(H?[jt,Pr]:L,{scrollBehavior:"auto"}),_t.forEach(function(pe){return _i(pe)&&pe.target===(H?en.scrollingElement||Pr:L)&&(pe.smooth=!1)}),be=_i(v.snapTo)?v.snapTo:v.snapTo==="labels"?BB(r):v.snapTo==="labelsDirectional"?zB(r):v.directional!==!1?function(pe,Oe){return Eb(v.snapTo)(pe,Zn()-le<500?0:Oe.direction)}:je.utils.snap(v.snapTo),xe=v.duration||{min:.1,max:2},xe=La(xe)?Ef(xe.min,xe.max):Ef(xe,xe),Ee=je.delayedCall(v.delay||Se/2||.1,function(){var pe=Y(),Oe=Zn()-le<500,Ae=ae.tween;if((Oe||Math.abs(z.getVelocity())<10)&&!Ae&&!qg&&ie!==pe){var Ge=(pe-P)/S,et=r&&!R?r.totalProgress():Ge,Xe=Oe?0:(et-Q)/(Zn()-qu)*1e3||0,st=je.utils.clamp(-Ge,1-Ge,Pl(Xe/2)*Xe/.185),vt=Ge+(v.inertia===!1?0:st),xt,dt,pt=v,It=pt.onStart,I=pt.onInterrupt,te=pt.onComplete;if(xt=be(vt,z),Ku(xt)||(xt=vt),dt=Math.round(P+xt*S),pe<=O&&pe>=P&&dt!==pe){if(Ae&&!Ae._initted&&Ae.data<=Pl(dt-pe))return;v.inertia===!1&&(st=xt-Ge),ae(dt,{duration:xe(Pl(Math.max(Pl(vt-et),Pl(xt-et))*.185/Xe/.05||0)),ease:v.ease||"power3",data:Pl(dt-pe),onInterrupt:function(){return Ee.restart(!0)&&I&&I(z)},onComplete:function(){z.update(),ie=Y(),r&&(ve?ve.resetTo("totalProgress",xt,r._tTime/r._tDur):r.progress(xt)),lt=Q=r&&!R?r.totalProgress():z.progress,x&&x(z),te&&te(z)}},pe,st*S,dt-pe-st*S),It&&It(z,ae.tween)}}else z.isActive&&ie!==pe&&Ee.restart(!0)}).pause()),l&&(Cv[l]=z),d=z.trigger=Ai(d||f!==!0&&f),j=d&&d._gsap&&d._gsap.stRevert,j&&(j=j(z)),f=f===!0?d:Ai(f),qi(a)&&(a={targets:d,className:a}),f&&(p===!1||p===gr||(p=!p&&f.parentNode&&f.parentNode.style&&_r(f.parentNode).display==="flex"?!1:vn),z.pin=f,de=je.core.getCache(f),de.spacer?k=de.pinState:(T&&(T=Ai(T),T&&!T.nodeType&&(T=T.current||T.nativeElement),de.spacerIsNative=!!T,T&&(de.spacerState=Fd(T))),de.spacer=ne=T||en.createElement("div"),ne.classList.add("pin-spacer"),l&&ne.classList.add("pin-spacer-"+l),de.pinState=k=Fd(f)),n.force3D!==!1&&je.set(f,{force3D:!0}),z.spacer=ne=de.spacer,Ye=_r(f),Le=Ye[p+b.os2],he=je.getProperty(f),we=je.quickSetter(f,b.a,An),S0(f,ne,Ye),J=Fd(f)),X){G=La(X)?OM(X,NM):NM,U=Ld("scroller-start",l,L,b,G,0),se=Ld("scroller-end",l,L,b,G,0,U),Me=U["offset"+b.op.d2];var _e=Ai(Zo(L,"content")||L);V=this.markerStart=Ld("start",l,_e,b,G,Me,0,A),q=this.markerEnd=Ld("end",l,_e,b,G,Me,0,A),A&&(Fe=je.quickSetter([V,q],b.a,An)),!W&&!(us.length&&Zo(L,"fixedMarkers")===!0)&&(kB(H?jt:L),je.set([U,se],{force3D:!0}),Ke=je.quickSetter(U,b.a,An),ze=je.quickSetter(se,b.a,An))}if(A){var ee=A.vars.onUpdate,fe=A.vars.onUpdateParams;A.eventCallback("onUpdate",function(){z.update(0,0,1),ee&&ee.apply(A,fe||[])})}if(z.previous=function(){return mt[mt.indexOf(z)-1]},z.next=function(){return mt[mt.indexOf(z)+1]},z.revert=function(pe,Oe){if(!Oe)return z.kill(!0);var Ae=pe!==!1||!z.enabled,Ge=jn;Ae!==z.isReverted&&(Ae&&(Ve=Math.max(Y(),z.scroll.rec||0),ye=z.progress,it=r&&r.progress()),V&&[V,q,U,se].forEach(function(et){return et.style.display=Ae?"none":"block"}),Ae&&(jn=z,z.update(Ae)),f&&(!w||!z.isActive)&&(Ae?GB(f,ne,k):S0(f,ne,_r(f),De)),Ae||z.update(Ae),jn=Ge,z.isReverted=Ae)},z.refresh=function(pe,Oe,Ae,Ge){if(!((jn||!z.enabled)&&!Oe)){if(f&&pe&&wr){On(i,"scrollEnd",iR);return}!pi&&ue&&ue(z),jn=z,ae.tween&&!Ae&&(ae.tween.kill(),ae.tween=0),ve&&ve.pause(),m&&r&&r.revert({kill:!1}).invalidate(),z.isReverted||z.revert(!0,!0),z._subPinOffset=!1;var et=me(),Xe=Ue(),st=A?A.duration():os(L,b),vt=S<=.01,xt=0,dt=Ge||0,pt=La(Ae)?Ae.end:n.end,It=n.endTrigger||d,I=La(Ae)?Ae.start:n.start||(n.start===0||!d?0:f?"0 0":"0 100%"),te=z.pinnedContainer=n.pinnedContainer&&Ai(n.pinnedContainer,z),oe=d&&Math.max(0,mt.indexOf(z))||0,ce=oe,re,Pe,Be,qe,ke,$e,tt,Qe,Tt,zt,At,Tn,bt;for(X&&La(Ae)&&(Tn=je.getProperty(U,b.p),bt=je.getProperty(se,b.p));ce--;)$e=mt[ce],$e.end||$e.refresh(0,1)||(jn=z),tt=$e.pin,tt&&(tt===d||tt===f||tt===te)&&!$e.isReverted&&(zt||(zt=[]),zt.unshift($e),$e.revert(!0,!0)),$e!==mt[ce]&&(oe--,ce--);for(_i(I)&&(I=I(z)),I=PM(I,"start",z),P=zM(I,d,et,b,Y(),V,U,z,Xe,Z,W,st,A,z._startClamp&&"_startClamp")||(f?-.001:0),_i(pt)&&(pt=pt(z)),qi(pt)&&!pt.indexOf("+=")&&(~pt.indexOf(" ")?pt=(qi(I)?I.split(" ")[0]:"")+pt:(xt=$p(pt.substr(2),et),pt=qi(I)?I:(A?je.utils.mapRange(0,A.duration(),A.scrollTrigger.start,A.scrollTrigger.end,P):P)+xt,It=d)),pt=PM(pt,"end",z),O=Math.max(P,zM(pt||(It?"100% 0":st),It,et,b,Y()+xt,q,se,z,Xe,Z,W,st,A,z._endClamp&&"_endClamp"))||-.001,xt=0,ce=oe;ce--;)$e=mt[ce],tt=$e.pin,tt&&$e.start-$e._pinPush<=P&&!A&&$e.end>0&&(re=$e.end-(z._startClamp?Math.max(0,$e.start):$e.start),(tt===d&&$e.start-$e._pinPush<P||tt===te)&&isNaN(I)&&(xt+=re*(1-$e.progress)),tt===f&&(dt+=re));if(P+=xt,O+=xt,z._startClamp&&(z._startClamp+=xt),z._endClamp&&!pi&&(z._endClamp=O||-.001,O=Math.min(O,os(L,b))),S=O-P||(P-=.01)&&.001,vt&&(ye=je.utils.clamp(0,1,je.utils.normalize(P,O,Ve))),z._pinPush=dt,V&&xt&&(re={},re[b.a]="+="+xt,te&&(re[b.p]="-="+Y()),je.set([V,q],re)),f&&!(Av&&z.end>=os(L,b)))re=_r(f),qe=b===Rn,Be=Y(),Ie=parseFloat(he(b.a))+dt,!st&&O>1&&(At=(H?en.scrollingElement||Pr:L).style,At={style:At,value:At["overflow"+b.a.toUpperCase()]},H&&_r(jt)["overflow"+b.a.toUpperCase()]!=="scroll"&&(At.style["overflow"+b.a.toUpperCase()]="scroll")),S0(f,ne,re),J=Fd(f),Pe=Ps(f,!0),Qe=W&&ra(L,qe?gi:Rn)(),p?(De=[p+b.os2,S+dt+An],De.t=ne,ce=p===vn?Nm(f,b)+S+dt:0,ce&&(De.push(b.d,ce+An),ne.style.flexBasis!=="auto"&&(ne.style.flexBasis=ce+An)),Pc(De),te&&mt.forEach(function(Ze){Ze.pin===te&&Ze.vars.pinSpacing!==!1&&(Ze._subPinOffset=!0)}),W&&Y(Ve)):(ce=Nm(f,b),ce&&ne.style.flexBasis!=="auto"&&(ne.style.flexBasis=ce+An)),W&&(ke={top:Pe.top+(qe?Be-P:Qe)+An,left:Pe.left+(qe?Qe:Be-P)+An,boxSizing:"border-box",position:"fixed"},ke[el]=ke["max"+Kc]=Math.ceil(Pe.width)+An,ke[tl]=ke["max"+Mb]=Math.ceil(Pe.height)+An,ke[gr]=ke[gr+Cf]=ke[gr+Tf]=ke[gr+Df]=ke[gr+Af]="0",ke[vn]=re[vn],ke[vn+Cf]=re[vn+Cf],ke[vn+Tf]=re[vn+Tf],ke[vn+Df]=re[vn+Df],ke[vn+Af]=re[vn+Af],K=XB(k,ke,w),pi&&Y(0)),r?(Tt=r._initted,_0(1),r.render(r.duration(),!0,!0),ge=he(b.a)-Ie+S+dt,Ne=Math.abs(S-ge)>1,W&&Ne&&K.splice(K.length-2,2),r.render(0,!0,!0),Tt||r.invalidate(!0),r.parent||r.totalTime(r.totalTime()),_0(0)):ge=S,At&&(At.value?At.style["overflow"+b.a.toUpperCase()]=At.value:At.style.removeProperty("overflow-"+b.a));else if(d&&Y()&&!A)for(Pe=d.parentNode;Pe&&Pe!==jt;)Pe._pinOffset&&(P-=Pe._pinOffset,O-=Pe._pinOffset),Pe=Pe.parentNode;zt&&zt.forEach(function(Ze){return Ze.revert(!1,!0)}),z.start=P,z.end=O,Re=E=pi?Ve:Y(),!A&&!pi&&(Re<Ve&&Y(Ve),z.scroll.rec=0),z.revert(!1,!0),le=Zn(),Ee&&(ie=-1,Ee.restart(!0)),jn=0,r&&R&&(r._initted||it)&&r.progress()!==it&&r.progress(it||0,!0).render(r.time(),!0,!0),(vt||ye!==z.progress||A||m)&&(r&&!R&&r.totalProgress(A&&P<-.001&&!ye?je.utils.normalize(P,O,0):ye,!0),z.progress=vt||(Re-P)/S===ye?0:ye),f&&p&&(ne._pinOffset=Math.round(z.progress*ge)),ve&&ve.invalidate(),isNaN(Tn)||(Tn-=je.getProperty(U,b.p),bt-=je.getProperty(se,b.p),Od(U,b,Tn),Od(V,b,Tn-(Ge||0)),Od(se,b,bt),Od(q,b,bt-(Ge||0))),vt&&!pi&&z.update(),u&&!pi&&!D&&(D=!0,u(z),D=!1)}},z.getVelocity=function(){return(Y()-E)/(Zn()-qu)*1e3||0},z.endAnimation=function(){bu(z.callbackAnimation),r&&(ve?ve.progress(1):r.paused()?R||bu(r,z.direction<0,1):bu(r,r.reversed()))},z.labelToScroll=function(pe){return r&&r.labels&&(P||z.refresh()||P)+r.labels[pe]/r.duration()*S||0},z.getTrailing=function(pe){var Oe=mt.indexOf(z),Ae=z.direction>0?mt.slice(0,Oe).reverse():mt.slice(Oe+1);return(qi(pe)?Ae.filter(function(Ge){return Ge.vars.preventOverlaps===pe}):Ae).filter(function(Ge){return z.direction>0?Ge.end<=P:Ge.start>=O})},z.update=function(pe,Oe,Ae){if(!(A&&!Ae&&!pe)){var Ge=pi===!0?Ve:z.scroll(),et=pe?0:(Ge-P)/S,Xe=et<0?0:et>1?1:et||0,st=z.progress,vt,xt,dt,pt,It,I,te,oe;if(Oe&&(E=Re,Re=A?Y():Ge,v&&(Q=lt,lt=r&&!R?r.totalProgress():Xe)),g&&f&&!jn&&!Cd&&wr&&(!Xe&&P<Ge+(Ge-E)/(Zn()-qu)*g?Xe=1e-4:Xe===1&&O>Ge+(Ge-E)/(Zn()-qu)*g&&(Xe=.9999)),Xe!==st&&z.enabled){if(vt=z.isActive=!!Xe&&Xe<1,xt=!!st&&st<1,I=vt!==xt,It=I||!!Xe!=!!st,z.direction=Xe>st?1:-1,z.progress=Xe,It&&!jn&&(dt=Xe&&!st?0:Xe===1?1:st===1?2:3,R&&(pt=!I&&$[dt+1]!=="none"&&$[dt+1]||$[dt],oe=r&&(pt==="complete"||pt==="reset"||pt in r))),M&&(I||oe)&&(oe||h||!r)&&(_i(M)?M(z):z.getTrailing(M).forEach(function(Be){return Be.endAnimation()})),R||(ve&&!jn&&!Cd?(ve._dp._time-ve._start!==ve._time&&ve.render(ve._dp._time-ve._start),ve.resetTo?ve.resetTo("totalProgress",Xe,r._tTime/r._tDur):(ve.vars.totalProgress=Xe,ve.invalidate().restart())):r&&r.totalProgress(Xe,!!(jn&&(le||pe)))),f){if(pe&&p&&(ne.style[p+b.os2]=Le),!W)we(ju(Ie+ge*Xe));else if(It){if(te=!pe&&Xe>st&&O+1>Ge&&Ge+1>=os(L,b),w)if(!pe&&(vt||te)){var ce=Ps(f,!0),re=Ge-P;HM(f,jt,ce.top+(b===Rn?re:0)+An,ce.left+(b===Rn?0:re)+An)}else HM(f,ne);Pc(vt||te?K:J),Ne&&Xe<1&&vt||we(Ie+(Xe===1&&!te?ge:0))}}v&&!ae.tween&&!jn&&!Cd&&Ee.restart(!0),a&&(I||y&&Xe&&(Xe<1||!y0))&&uh(a.targets).forEach(function(Be){return Be.classList[vt||y?"add":"remove"](a.className)}),o&&!R&&!pe&&o(z),It&&!jn?(R&&(oe&&(pt==="complete"?r.pause().totalProgress(1):pt==="reset"?r.restart(!0).pause():pt==="restart"?r.restart(!0):r[pt]()),o&&o(z)),(I||!y0)&&(c&&I&&x0(z,c),N[dt]&&x0(z,N[dt]),y&&(Xe===1?z.kill(!1,1):N[dt]=0),I||(dt=Xe===1?1:3,N[dt]&&x0(z,N[dt]))),C&&!vt&&Math.abs(z.getVelocity())>(Ku(C)?C:2500)&&(bu(z.callbackAnimation),ve?ve.progress(1):bu(r,pt==="reverse"?1:!Xe,1))):R&&o&&!jn&&o(z)}if(ze){var Pe=A?Ge/A.duration()*(A._caScrollDist||0):Ge;Ke(Pe+(U._isFlipped?1:0)),ze(Pe)}Fe&&Fe(-Ge/A.duration()*(A._caScrollDist||0))}},z.enable=function(pe,Oe){z.enabled||(z.enabled=!0,On(L,"resize",Zu),H||On(L,"scroll",Il),ue&&On(i,"refreshInit",ue),pe!==!1&&(z.progress=ye=0,Re=E=ie=Y()),Oe!==!1&&z.refresh())},z.getTween=function(pe){return pe&&ae?ae.tween:ve},z.setPositions=function(pe,Oe,Ae,Ge){if(A){var et=A.scrollTrigger,Xe=A.duration(),st=et.end-et.start;pe=et.start+st*pe/Xe,Oe=et.start+st*Oe/Xe}z.refresh(!1,!1,{start:IM(pe,Ae&&!!z._startClamp),end:IM(Oe,Ae&&!!z._endClamp)},Ge),z.update()},z.adjustPinSpacing=function(pe){if(De&&pe){var Oe=De.indexOf(b.d)+1;De[Oe]=parseFloat(De[Oe])+pe+An,De[1]=parseFloat(De[1])+pe+An,Pc(De)}},z.disable=function(pe,Oe){if(z.enabled&&(pe!==!1&&z.revert(!0,!0),z.enabled=z.isActive=!1,Oe||ve&&ve.pause(),Ve=0,de&&(de.uncache=1),ue&&Fn(i,"refreshInit",ue),Ee&&(Ee.pause(),ae.tween&&ae.tween.kill()&&(ae.tween=0)),!H)){for(var Ae=mt.length;Ae--;)if(mt[Ae].scroller===L&&mt[Ae]!==z)return;Fn(L,"resize",Zu),H||Fn(L,"scroll",Il)}},z.kill=function(pe,Oe){z.disable(pe,Oe),ve&&!Oe&&ve.kill(),l&&delete Cv[l];var Ae=mt.indexOf(z);Ae>=0&&mt.splice(Ae,1),Ae===di&&Yp>0&&di--,Ae=0,mt.forEach(function(Ge){return Ge.scroller===z.scroller&&(Ae=1)}),Ae||pi||(z.scroll.rec=0),r&&(r.scrollTrigger=null,pe&&r.revert({kill:!1}),Oe||r.kill()),V&&[V,q,U,se].forEach(function(Ge){return Ge.parentNode&&Ge.parentNode.removeChild(Ge)}),Rf===z&&(Rf=0),f&&(de&&(de.uncache=1),Ae=0,mt.forEach(function(Ge){return Ge.pin===f&&Ae++}),Ae||(de.spacer=0)),n.onKill&&n.onKill(z)},mt.push(z),z.enable(!1,!1),j&&j(z),r&&r.add&&!S){var Ce=z.update;z.update=function(){z.update=Ce,P||O||z.refresh()},je.delayedCall(.01,z.update),S=.01,P=O=0}else z.refresh();f&&VB()},i.register=function(n){return ic||(je=n||ZD(),KD()&&window.document&&i.enable(),ic=Yu),ic},i.defaults=function(n){if(n)for(var r in n)Id[r]=n[r];return Id},i.disable=function(n,r){Yu=0,mt.forEach(function(o){return o[r?"kill":"disable"](n)}),Fn(St,"wheel",Il),Fn(en,"scroll",Il),clearInterval(Ad),Fn(en,"touchcancel",es),Fn(jt,"touchstart",es),Rd(Fn,en,"pointerdown,touchstart,mousedown",LM),Rd(Fn,en,"pointerup,touchend,mouseup",FM),Fm.kill(),Dd(Fn);for(var s=0;s<_t.length;s+=3)Pd(Fn,_t[s],_t[s+1]),Pd(Fn,_t[s],_t[s+2])},i.enable=function(){if(St=window,en=document,Pr=en.documentElement,jt=en.body,je&&(uh=je.utils.toArray,Ef=je.utils.clamp,Tv=je.core.context||es,_0=je.core.suppressOverwrites||es,xb=St.history.scrollRestoration||"auto",Dv=St.pageYOffset,je.core.globals("ScrollTrigger",i),jt)){Yu=1,Rc=document.createElement("div"),Rc.style.height="100vh",Rc.style.position="absolute",oR(),OB(),sn.register(je),i.isTouch=sn.isTouch,Do=sn.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),Ev=sn.isTouch===1,On(St,"wheel",Il),XD=[St,en,Pr,jt],je.matchMedia?(i.matchMedia=function(l){var c=je.matchMedia(),u;for(u in l)c.add(u,l[u]);return c},je.addEventListener("matchMediaInit",function(){return Tb()}),je.addEventListener("matchMediaRevert",function(){return rR()}),je.addEventListener("matchMedia",function(){Ha(0,1),gl("matchMedia")}),je.matchMedia("(orientation: portrait)",function(){return b0(),b0})):console.warn("Requires GSAP 3.11.0 or later"),b0(),On(en,"scroll",Il);var n=jt.style,r=n.borderTopStyle,s=je.core.Animation.prototype,o,a;for(s.revert||Object.defineProperty(s,"revert",{value:function(){return this.time(-.01,!0)}}),n.borderTopStyle="solid",o=Ps(jt),Rn.m=Math.round(o.top+Rn.sc())||0,gi.m=Math.round(o.left+gi.sc())||0,r?n.borderTopStyle=r:n.removeProperty("border-top-style"),Ad=setInterval(UM,250),je.delayedCall(.5,function(){return Cd=0}),On(en,"touchcancel",es),On(jt,"touchstart",es),Rd(On,en,"pointerdown,touchstart,mousedown",LM),Rd(On,en,"pointerup,touchend,mouseup",FM),Mv=je.utils.checkPrefix("transform"),jp.push(Mv),ic=Zn(),Fm=je.delayedCall(.2,Ha).pause(),rc=[en,"visibilitychange",function(){var l=St.innerWidth,c=St.innerHeight;en.hidden?(DM=l,RM=c):(DM!==l||RM!==c)&&Zu()},en,"DOMContentLoaded",Ha,St,"load",Ha,St,"resize",Zu],Dd(On),mt.forEach(function(l){return l.enable(0,1)}),a=0;a<_t.length;a+=3)Pd(Fn,_t[a],_t[a+1]),Pd(Fn,_t[a],_t[a+2])}},i.config=function(n){"limitCallbacks"in n&&(y0=!!n.limitCallbacks);var r=n.syncInterval;r&&clearInterval(Ad)||(Ad=r)&&setInterval(UM,r),"ignoreMobileResize"in n&&(Ev=i.isTouch===1&&n.ignoreMobileResize),"autoRefreshEvents"in n&&(Dd(Fn)||Dd(On,n.autoRefreshEvents||"none"),qD=(n.autoRefreshEvents+"").indexOf("resize")===-1)},i.scrollerProxy=function(n,r){var s=Ai(n),o=_t.indexOf(s),a=pl(s);~o&&_t.splice(o,a?6:2),r&&(a?us.unshift(St,r,jt,r,Pr,r):us.unshift(s,r))},i.clearMatchMedia=function(n){mt.forEach(function(r){return r._ctx&&r._ctx.query===n&&r._ctx.kill(!0,!0)})},i.isInViewport=function(n,r,s){var o=(qi(n)?Ai(n):n).getBoundingClientRect(),a=o[s?el:tl]*r||0;return s?o.right-a>0&&o.left+a<St.innerWidth:o.bottom-a>0&&o.top+a<St.innerHeight},i.positionInViewport=function(n,r,s){qi(n)&&(n=Ai(n));var o=n.getBoundingClientRect(),a=o[s?el:tl],l=r==null?a/2:r in Um?Um[r]*a:~r.indexOf("%")?parseFloat(r)*a/100:parseFloat(r)||0;return s?(o.left+l)/St.innerWidth:(o.top+l)/St.innerHeight},i.killAll=function(n){if(mt.slice(0).forEach(function(s){return s.vars.id!=="ScrollSmoother"&&s.kill()}),n!==!0){var r=ml.killAll||[];ml={},r.forEach(function(s){return s()})}},i}();yt.version="3.12.5";yt.saveStyles=function(i){return i?uh(i).forEach(function(e){if(e&&e.style){var t=$i.indexOf(e);t>=0&&$i.splice(t,5),$i.push(e,e.style.cssText,e.getBBox&&e.getAttribute("transform"),je.core.getCache(e),Tv())}}):$i};yt.revert=function(i,e){return Tb(!i,e)};yt.create=function(i,e){return new yt(i,e)};yt.refresh=function(i){return i?Zu():(ic||yt.register())&&Ha(!0)};yt.update=function(i){return++_t.cache&&Xs(i===!0?2:0)};yt.clearScrollMemory=sR;yt.maxScroll=function(i,e){return os(i,e?gi:Rn)};yt.getScrollFunc=function(i,e){return ra(Ai(i),e?gi:Rn)};yt.getById=function(i){return Cv[i]};yt.getAll=function(){return mt.filter(function(i){return i.vars.id!=="ScrollSmoother"})};yt.isScrolling=function(){return!!wr};yt.snapDirectional=Eb;yt.addEventListener=function(i,e){var t=ml[i]||(ml[i]=[]);~t.indexOf(e)||t.push(e)};yt.removeEventListener=function(i,e){var t=ml[i],n=t&&t.indexOf(e);n>=0&&t.splice(n,1)};yt.batch=function(i,e){var t=[],n={},r=e.interval||.016,s=e.batchMax||1e9,o=function(c,u){var h=[],d=[],f=je.delayedCall(r,function(){u(h,d),h=[],d=[]}).pause();return function(p){h.length||f.restart(!0),h.push(p.trigger),d.push(p),s<=h.length&&f.progress(1)}},a;for(a in e)n[a]=a.substr(0,2)==="on"&&_i(e[a])&&a!=="onRefreshInit"?o(a,e[a]):e[a];return _i(s)&&(s=s(),On(yt,"refresh",function(){return s=e.batchMax()})),uh(i).forEach(function(l){var c={};for(a in n)c[a]=n[a];c.trigger=l,t.push(yt.create(c))}),t};var GM=function(e,t,n,r){return t>r?e(r):t<0&&e(0),n>r?(r-t)/(n-t):n<0?t/(t-n):1},w0=function i(e,t){t===!0?e.style.removeProperty("touch-action"):e.style.touchAction=t===!0?"auto":t?"pan-"+t+(sn.isTouch?" pinch-zoom":""):"none",e===Pr&&i(jt,t)},Nd={auto:1,scroll:1},qB=function(e){var t=e.event,n=e.target,r=e.axis,s=(t.changedTouches?t.changedTouches[0]:t).target,o=s._gsap||je.core.getCache(s),a=Zn(),l;if(!o._isScrollT||a-o._isScrollT>2e3){for(;s&&s!==jt&&(s.scrollHeight<=s.clientHeight&&s.scrollWidth<=s.clientWidth||!(Nd[(l=_r(s)).overflowY]||Nd[l.overflowX]));)s=s.parentNode;o._isScroll=s&&s!==n&&!pl(s)&&(Nd[(l=_r(s)).overflowY]||Nd[l.overflowX]),o._isScrollT=a}(o._isScroll||r==="x")&&(t.stopPropagation(),t._gsapAllow=!0)},lR=function(e,t,n,r){return sn.create({target:e,capture:!0,debounce:!1,lockAxis:!0,type:t,onWheel:r=r&&qB,onPress:r,onDrag:r,onScroll:r,onEnable:function(){return n&&On(en,sn.eventTypes[0],XM,!1,!0)},onDisable:function(){return Fn(en,sn.eventTypes[0],XM,!0)}})},YB=/(input|label|select|textarea)/i,WM,XM=function(e){var t=YB.test(e.target.tagName);(t||WM)&&(e._gsapAllow=!0,WM=t)},jB=function(e){La(e)||(e={}),e.preventDefault=e.isNormalizer=e.allowClicks=!0,e.type||(e.type="wheel,touch"),e.debounce=!!e.debounce,e.id=e.id||"normalizer";var t=e,n=t.normalizeScrollX,r=t.momentum,s=t.allowNestedScroll,o=t.onRelease,a,l,c=Ai(e.target)||Pr,u=je.core.globals().ScrollSmoother,h=u&&u.get(),d=Do&&(e.content&&Ai(e.content)||h&&e.content!==!1&&!h.smooth()&&h.content()),f=ra(c,Rn),p=ra(c,gi),m=1,g=(sn.isTouch&&St.visualViewport?St.visualViewport.scale*St.visualViewport.width:St.outerWidth)/St.innerWidth,_=0,x=_i(r)?function(){return r(a)}:function(){return r||2.8},y,v,w=lR(c,e.type,!0,s),T=function(){return v=!1},A=es,C=es,M=function(){l=os(c,Rn),C=Ef(Do?1:0,l),n&&(A=Ef(0,os(c,gi))),y=nl},b=function(){d._gsap.y=ju(parseFloat(d._gsap.y)+f.offset)+"px",d.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(d._gsap.y)+", 0, 1)",f.offset=f.cacheID=0},R=function(){if(v){requestAnimationFrame(T);var X=ju(a.deltaY/2),Z=C(f.v-X);if(d&&Z!==f.v+f.offset){f.offset=Z-f.v;var z=ju((parseFloat(d&&d._gsap.y)||0)-f.offset);d.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+z+", 0, 1)",d._gsap.y=z+"px",f.cacheID=_t.cache,Xs()}return!0}f.offset&&b(),v=!0},L,F,H,W,N=function(){M(),L.isActive()&&L.vars.scrollY>l&&(f()>l?L.progress(1)&&f(l):L.resetTo("scrollY",l))};return d&&je.set(d,{y:"+=0"}),e.ignoreCheck=function($){return Do&&$.type==="touchmove"&&R()||m>1.05&&$.type!=="touchstart"||a.isGesturing||$.touches&&$.touches.length>1},e.onPress=function(){v=!1;var $=m;m=ju((St.visualViewport&&St.visualViewport.scale||1)/g),L.pause(),$!==m&&w0(c,m>1.01?!0:n?!1:"x"),F=p(),H=f(),M(),y=nl},e.onRelease=e.onGestureStart=function($,X){if(f.offset&&b(),!X)W.restart(!0);else{_t.cache++;var Z=x(),z,ue;n&&(z=p(),ue=z+Z*.05*-$.velocityX/.227,Z*=GM(p,z,ue,os(c,gi)),L.vars.scrollX=A(ue)),z=f(),ue=z+Z*.05*-$.velocityY/.227,Z*=GM(f,z,ue,os(c,Rn)),L.vars.scrollY=C(ue),L.invalidate().duration(Z).play(.01),(Do&&L.vars.scrollY>=l||z>=l-1)&&je.to({},{onUpdate:N,duration:Z})}o&&o($)},e.onWheel=function(){L._ts&&L.pause(),Zn()-_>1e3&&(y=0,_=Zn())},e.onChange=function($,X,Z,z,ue){if(nl!==y&&M(),X&&n&&p(A(z[2]===X?F+($.startX-$.x):p()+X-z[1])),Z){f.offset&&b();var me=ue[2]===Z,Ue=me?H+$.startY-$.y:f()+Z-ue[1],ie=C(Ue);me&&Ue!==ie&&(H+=ie-Ue),f(ie)}(Z||X)&&Xs()},e.onEnable=function(){w0(c,n?!1:"x"),yt.addEventListener("refresh",N),On(St,"resize",N),f.smooth&&(f.target.style.scrollBehavior="auto",f.smooth=p.smooth=!1),w.enable()},e.onDisable=function(){w0(c,!0),Fn(St,"resize",N),yt.removeEventListener("refresh",N),w.kill()},e.lockAxis=e.lockAxis!==!1,a=new sn(e),a.iOS=Do,Do&&!f()&&f(1),Do&&je.ticker.add(es),W=a._dc,L=je.to(a,{ease:"power4",paused:!0,inherit:!1,scrollX:n?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:aR(f,f(),function(){return L.pause()})},onUpdate:Xs,onComplete:W.vars.onComplete}),a};yt.sort=function(i){return mt.sort(i||function(e,t){return(e.vars.refreshPriority||0)*-1e6+e.start-(t.start+(t.vars.refreshPriority||0)*-1e6)})};yt.observe=function(i){return new sn(i)};yt.normalizeScroll=function(i){if(typeof i>"u")return hi;if(i===!0&&hi)return hi.enable();if(i===!1){hi&&hi.kill(),hi=i;return}var e=i instanceof sn?i:jB(i);return hi&&hi.target===e.target&&hi.kill(),pl(e.target)&&(hi=e),e};yt.core={_getVelocityProp:Sv,_inputObserver:lR,_scrollers:_t,_proxies:us,bridge:{ss:function(){wr||gl("scrollStart"),wr=Zn()},ref:function(){return jn}}};ZD()&&je.registerPlugin(yt);function $M(i){if(i===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return i}function KB(i,e){i.prototype=Object.create(e.prototype),i.prototype.constructor=i,i.__proto__=e}var wt,Wt,Qi,zr,Bs,M0,Rs,Pv,Ju,Xo,cR,Iv,hh,Ab,Qu,Rr,ef,Zp,uR,Lv,km=0,fR=function(){return typeof window<"u"},hR=function(){return wt||fR()&&(wt=window.gsap)&&wt.registerPlugin&&wt},Oo=function(e){return typeof e=="function"},Pf=function(e){return typeof e=="object"},Ir=function(e){return typeof e>"u"},Jp=function(){return!1},If="transform",Fv="transformOrigin",_o=function(e){return Math.round(e*1e4)/1e4},Su=Array.isArray,Ud=function(e,t){var n=Qi.createElementNS?Qi.createElementNS("http://www.w3.org/1999/xhtml".replace(/^https/,"http"),e):Qi.createElement(e);return n.style?n:Qi.createElement(e)},qM=180/Math.PI,ga=1e20,ZB=new Qs,yo=Date.now||function(){return new Date().getTime()},il=[],Ic={},JB=0,QB=/^(?:a|input|textarea|button|select)$/i,YM=0,Ll={},Ts={},dR=function(e,t){var n={},r;for(r in e)n[r]=t?e[r]*t:e[r];return n},ez=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},jM=function i(e,t){for(var n=e.length,r;n--;)t?e[n].style.touchAction=t:e[n].style.removeProperty("touch-action"),r=e[n].children,r&&r.length&&i(r,t)},pR=function(){return il.forEach(function(e){return e()})},tz=function(e){il.push(e),il.length===1&&wt.ticker.add(pR)},KM=function(){return!il.length&&wt.ticker.remove(pR)},ZM=function(e){for(var t=il.length;t--;)il[t]===e&&il.splice(t,1);wt.to(KM,{overwrite:!0,delay:15,duration:0,onComplete:KM,data:"_draggable"})},nz=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},Cn=function(e,t,n,r){if(e.addEventListener){var s=hh[t];r=r||(cR?{passive:!1}:null),e.addEventListener(s||t,n,r),s&&t!==s&&e.addEventListener(t,n,r)}},yn=function(e,t,n,r){if(e.removeEventListener){var s=hh[t];e.removeEventListener(s||t,n,r),s&&t!==s&&e.removeEventListener(t,n,r)}},fr=function(e){e.preventDefault&&e.preventDefault(),e.preventManipulation&&e.preventManipulation()},iz=function(e,t){for(var n=e.length;n--;)if(e[n].identifier===t)return!0},rz=function i(e){Ab=e.touches&&km<e.touches.length,yn(e.target,"touchend",i)},JM=function(e){Ab=e.touches&&km<e.touches.length,Cn(e.target,"touchend",rz)},Lc=function(e){return Wt.pageYOffset||e.scrollTop||e.documentElement.scrollTop||e.body.scrollTop||0},Fc=function(e){return Wt.pageXOffset||e.scrollLeft||e.documentElement.scrollLeft||e.body.scrollLeft||0},QM=function i(e,t){Cn(e,"scroll",t),Zc(e.parentNode)||i(e.parentNode,t)},e1=function i(e,t){yn(e,"scroll",t),Zc(e.parentNode)||i(e.parentNode,t)},Zc=function(e){return!e||e===zr||e.nodeType===9||e===Qi.body||e===Wt||!e.nodeType||!e.parentNode},t1=function(e,t){var n=t==="x"?"Width":"Height",r="scroll"+n,s="client"+n;return Math.max(0,Zc(e)?Math.max(zr[r],Bs[r])-(Wt["inner"+n]||zr[s]||Bs[s]):e[r]-e[s])},E0=function i(e,t){var n=t1(e,"x"),r=t1(e,"y");Zc(e)?e=Ts:i(e.parentNode,t),e._gsMaxScrollX=n,e._gsMaxScrollY=r,t||(e._gsScrollX=e.scrollLeft||0,e._gsScrollY=e.scrollTop||0)},T0=function(e,t,n){var r=e.style;r&&(Ir(r[t])&&(t=Ju(t,e)||t),n==null?r.removeProperty&&r.removeProperty(t.replace(/([A-Z])/g,"-$1").toLowerCase()):r[t]=n)},dh=function(e){return Wt.getComputedStyle(e instanceof Element?e:e.host||(e.parentNode||{}).host||e)},_a={},Fl=function(e){if(e===Wt)return _a.left=_a.top=0,_a.width=_a.right=zr.clientWidth||e.innerWidth||Bs.clientWidth||0,_a.height=_a.bottom=(e.innerHeight||0)-20<zr.clientHeight?zr.clientHeight:e.innerHeight||Bs.clientHeight||0,_a;var t=e.ownerDocument||Qi,n=Ir(e.pageX)?!e.nodeType&&!Ir(e.left)&&!Ir(e.top)?e:Xo(e)[0].getBoundingClientRect():{left:e.pageX-Fc(t),top:e.pageY-Lc(t),right:e.pageX-Fc(t)+1,bottom:e.pageY-Lc(t)+1};return Ir(n.right)&&!Ir(n.width)?(n.right=n.left+n.width,n.bottom=n.top+n.height):Ir(n.width)&&(n={width:n.right-n.left,height:n.bottom-n.top,right:n.right,left:n.left,bottom:n.bottom,top:n.top}),n},hn=function(e,t,n){var r=e.vars,s=r[n],o=e._listeners[t],a;return Oo(s)&&(a=s.apply(r.callbackScope||e,r[n+"Params"]||[e.pointerEvent])),o&&e.dispatchEvent(t)===!1&&(a=!1),a},n1=function(e,t){var n=Xo(e)[0],r,s,o;return!n.nodeType&&n!==Wt?Ir(e.left)?(s=e.min||e.minX||e.minRotation||0,r=e.min||e.minY||0,{left:s,top:r,width:(e.max||e.maxX||e.maxRotation||0)-s,height:(e.max||e.maxY||0)-r}):(o={x:0,y:0},{left:e.left-o.x,top:e.top-o.y,width:e.width,height:e.height}):sz(n,t)},hr={},sz=function(e,t){t=Xo(t)[0];var n=e.getBBox&&e.ownerSVGElement,r=e.ownerDocument||Qi,s,o,a,l,c,u,h,d,f,p,m,g,_;if(e===Wt)a=Lc(r),s=Fc(r),o=s+(r.documentElement.clientWidth||e.innerWidth||r.body.clientWidth||0),l=a+((e.innerHeight||0)-20<r.documentElement.clientHeight?r.documentElement.clientHeight:e.innerHeight||r.body.clientHeight||0);else{if(t===Wt||Ir(t))return e.getBoundingClientRect();s=a=0,n?(p=e.getBBox(),m=p.width,g=p.height):(e.viewBox&&(p=e.viewBox.baseVal)&&(s=p.x||0,a=p.y||0,m=p.width,g=p.height),m||(_=dh(e),p=_.boxSizing==="border-box",m=(parseFloat(_.width)||e.clientWidth||0)+(p?0:parseFloat(_.borderLeftWidth)+parseFloat(_.borderRightWidth)),g=(parseFloat(_.height)||e.clientHeight||0)+(p?0:parseFloat(_.borderTopWidth)+parseFloat(_.borderBottomWidth)))),o=m,l=g}return e===t?{left:s,top:a,width:o-s,height:l-a}:(c=Wn(t,!0).multiply(Wn(e)),u=c.apply({x:s,y:a}),h=c.apply({x:o,y:a}),d=c.apply({x:o,y:l}),f=c.apply({x:s,y:l}),s=Math.min(u.x,h.x,d.x,f.x),a=Math.min(u.y,h.y,d.y,f.y),{left:s,top:a,width:Math.max(u.x,h.x,d.x,f.x)-s,height:Math.max(u.y,h.y,d.y,f.y)-a})},A0=function(e,t,n,r,s,o){var a={},l,c,u;if(t)if(s!==1&&t instanceof Array){if(a.end=l=[],u=t.length,Pf(t[0]))for(c=0;c<u;c++)l[c]=dR(t[c],s);else for(c=0;c<u;c++)l[c]=t[c]*s;n+=1.1,r-=1.1}else Oo(t)?a.end=function(h){var d=t.call(e,h),f,p;if(s!==1)if(Pf(d)){f={};for(p in d)f[p]=d[p]*s;d=f}else d*=s;return d}:a.end=t;return(n||n===0)&&(a.max=n),(r||r===0)&&(a.min=r),o&&(a.velocity=0),a},oz=function i(e){var t;return!e||!e.getAttribute||e===Bs?!1:(t=e.getAttribute("data-clickable"))==="true"||t!=="false"&&(QB.test(e.nodeName+"")||e.getAttribute("contentEditable")==="true")?!0:i(e.parentNode)},kd=function(e,t){for(var n=e.length,r;n--;)r=e[n],r.ondragstart=r.onselectstart=t?null:Jp,wt.set(r,{lazy:!0,userSelect:t?"text":"none"})},az=function i(e){if(dh(e).position==="fixed")return!0;if(e=e.parentNode,e&&e.nodeType===1)return i(e)},mR,Ov,lz=function(e,t){e=wt.utils.toArray(e)[0],t=t||{};var n=document.createElement("div"),r=n.style,s=e.firstChild,o=0,a=0,l=e.scrollTop,c=e.scrollLeft,u=e.scrollWidth,h=e.scrollHeight,d=0,f=0,p=0,m,g,_,x,y,v;mR&&t.force3D!==!1?(y="translate3d(",v="px,0px)"):If&&(y="translate(",v="px)"),this.scrollTop=function(w,T){if(!arguments.length)return-this.top();this.top(-w,T)},this.scrollLeft=function(w,T){if(!arguments.length)return-this.left();this.left(-w,T)},this.left=function(w,T){if(!arguments.length)return-(e.scrollLeft+a);var A=e.scrollLeft-c,C=a;if((A>2||A<-2)&&!T){c=e.scrollLeft,wt.killTweensOf(this,{left:1,scrollLeft:1}),this.left(-c),t.onKill&&t.onKill();return}w=-w,w<0?(a=w-.5|0,w=0):w>f?(a=w-f|0,w=f):a=0,(a||C)&&(this._skip||(r[If]=y+-a+"px,"+-o+v),a+d>=0&&(r.paddingRight=a+d+"px")),e.scrollLeft=w|0,c=e.scrollLeft},this.top=function(w,T){if(!arguments.length)return-(e.scrollTop+o);var A=e.scrollTop-l,C=o;if((A>2||A<-2)&&!T){l=e.scrollTop,wt.killTweensOf(this,{top:1,scrollTop:1}),this.top(-l),t.onKill&&t.onKill();return}w=-w,w<0?(o=w-.5|0,w=0):w>p?(o=w-p|0,w=p):o=0,(o||C)&&(this._skip||(r[If]=y+-a+"px,"+-o+v)),e.scrollTop=w|0,l=e.scrollTop},this.maxScrollTop=function(){return p},this.maxScrollLeft=function(){return f},this.disable=function(){for(s=n.firstChild;s;)x=s.nextSibling,e.appendChild(s),s=x;e===n.parentNode&&e.removeChild(n)},this.enable=function(){if(s=e.firstChild,s!==n){for(;s;)x=s.nextSibling,n.appendChild(s),s=x;e.appendChild(n),this.calibrate()}},this.calibrate=function(w){var T=e.clientWidth===m,A,C,M;l=e.scrollTop,c=e.scrollLeft,!(T&&e.clientHeight===g&&n.offsetHeight===_&&u===e.scrollWidth&&h===e.scrollHeight&&!w)&&((o||a)&&(C=this.left(),M=this.top(),this.left(-e.scrollLeft),this.top(-e.scrollTop)),A=dh(e),(!T||w)&&(r.display="block",r.width="auto",r.paddingRight="0px",d=Math.max(0,e.scrollWidth-e.clientWidth),d&&(d+=parseFloat(A.paddingLeft)+(Ov?parseFloat(A.paddingRight):0))),r.display="inline-block",r.position="relative",r.overflow="visible",r.verticalAlign="top",r.boxSizing="content-box",r.width="100%",r.paddingRight=d+"px",Ov&&(r.paddingBottom=A.paddingBottom),m=e.clientWidth,g=e.clientHeight,u=e.scrollWidth,h=e.scrollHeight,f=e.scrollWidth-m,p=e.scrollHeight-g,_=n.offsetHeight,r.display="block",(C||M)&&(this.left(C),this.top(M)))},this.content=n,this.element=e,this._skip=!1,this.enable()},C0=function(e){if(fR()&&document.body){var t=window&&window.navigator;Wt=window,Qi=document,zr=Qi.documentElement,Bs=Qi.body,M0=Ud("div"),Zp=!!window.PointerEvent,Rs=Ud("div"),Rs.style.cssText="visibility:hidden;height:1px;top:-1px;pointer-events:none;position:relative;clear:both;cursor:grab",ef=Rs.style.cursor==="grab"?"grab":"move",Qu=t&&t.userAgent.toLowerCase().indexOf("android")!==-1,Iv="ontouchstart"in zr&&"orientation"in Wt||t&&(t.MaxTouchPoints>0||t.msMaxTouchPoints>0),Ov=function(){var n=Ud("div"),r=Ud("div"),s=r.style,o=Bs,a;return s.display="inline-block",s.position="relative",n.style.cssText="width:90px;height:40px;padding:10px;overflow:auto;visibility:hidden",n.appendChild(r),o.appendChild(n),a=r.offsetHeight+18>n.scrollHeight,o.removeChild(n),a}(),hh=function(n){for(var r=n.split(","),s=("onpointerdown"in M0?"pointerdown,pointermove,pointerup,pointercancel":"onmspointerdown"in M0?"MSPointerDown,MSPointerMove,MSPointerUp,MSPointerCancel":n).split(","),o={},a=4;--a>-1;)o[r[a]]=s[a],o[s[a]]=r[a];try{zr.addEventListener("test",null,Object.defineProperty({},"passive",{get:function(){cR=1}}))}catch{}return o}("touchstart,touchmove,touchend,touchcancel"),Cn(Qi,"touchcancel",Jp),Cn(Wt,"touchmove",Jp),Bs&&Bs.addEventListener("touchstart",Jp),Cn(Qi,"contextmenu",function(){for(var n in Ic)Ic[n].isPressed&&Ic[n].endDrag()}),wt=Pv=hR()}wt?(Rr=wt.plugins.inertia,uR=wt.core.context||function(){},Ju=wt.utils.checkPrefix,If=Ju(If),Fv=Ju(Fv),Xo=wt.utils.toArray,Lv=wt.core.getStyleSaver,mR=!!Ju("perspective")):e&&console.warn("Please gsap.registerPlugin(Draggable)")},cz=function(){function i(t){this._listeners={},this.target=t||this}var e=i.prototype;return e.addEventListener=function(n,r){var s=this._listeners[n]||(this._listeners[n]=[]);~s.indexOf(r)||s.push(r)},e.removeEventListener=function(n,r){var s=this._listeners[n],o=s&&s.indexOf(r);o>=0&&s.splice(o,1)},e.dispatchEvent=function(n){var r=this,s;return(this._listeners[n]||[]).forEach(function(o){return o.call(r,{type:n,target:r.target})===!1&&(s=!1)}),s},i}(),lu=function(i){KB(e,i);function e(t,n){var r;r=i.call(this)||this,Pv||C0(1),t=Xo(t)[0],r.styles=Lv&&Lv(t,"transform,left,top"),Rr||(Rr=wt.plugins.inertia),r.vars=n=dR(n||{}),r.target=t,r.x=r.y=r.rotation=0,r.dragResistance=parseFloat(n.dragResistance)||0,r.edgeResistance=isNaN(n.edgeResistance)?1:parseFloat(n.edgeResistance)||0,r.lockAxis=n.lockAxis,r.autoScroll=n.autoScroll||0,r.lockedAxis=null,r.allowEventDefault=!!n.allowEventDefault,wt.getProperty(t,"x");var s=(n.type||"x,y").toLowerCase(),o=~s.indexOf("x")||~s.indexOf("y"),a=s.indexOf("rotation")!==-1,l=a?"rotation":o?"x":"left",c=o?"y":"top",u=!!(~s.indexOf("x")||~s.indexOf("left")||s==="scroll"),h=!!(~s.indexOf("y")||~s.indexOf("top")||s==="scroll"),d=n.minimumMovement||2,f=$M(r),p=Xo(n.trigger||n.handle||t),m={},g=0,_=!1,x=n.autoScrollMarginTop||40,y=n.autoScrollMarginRight||40,v=n.autoScrollMarginBottom||40,w=n.autoScrollMarginLeft||40,T=n.clickableTest||oz,A=0,C=t._gsap||wt.core.getCache(t),M=az(t),b=function(j,_e){return parseFloat(C.get(t,j,_e))},R=t.ownerDocument||Qi,L,F,H,W,N,$,X,Z,z,ue,me,Ue,ie,le,ye,Y,ae,de,be,Re,E,P,O,V,q,U,se,G,D,S,k,K,J,ne=function(j){return fr(j),j.stopImmediatePropagation&&j.stopImmediatePropagation(),!1},Me=function Fe(j){if(f.autoScroll&&f.isDragging&&(_||ae)){var _e=t,ee=f.autoScroll*15,fe,Ce,pe,Oe,Ae,Ge,et,Xe;for(_=!1,Ts.scrollTop=Wt.pageYOffset!=null?Wt.pageYOffset:R.documentElement.scrollTop!=null?R.documentElement.scrollTop:R.body.scrollTop,Ts.scrollLeft=Wt.pageXOffset!=null?Wt.pageXOffset:R.documentElement.scrollLeft!=null?R.documentElement.scrollLeft:R.body.scrollLeft,Oe=f.pointerX-Ts.scrollLeft,Ae=f.pointerY-Ts.scrollTop;_e&&!Ce;)Ce=Zc(_e.parentNode),fe=Ce?Ts:_e.parentNode,pe=Ce?{bottom:Math.max(zr.clientHeight,Wt.innerHeight||0),right:Math.max(zr.clientWidth,Wt.innerWidth||0),left:0,top:0}:fe.getBoundingClientRect(),Ge=et=0,h&&(Xe=fe._gsMaxScrollY-fe.scrollTop,Xe<0?et=Xe:Ae>pe.bottom-v&&Xe?(_=!0,et=Math.min(Xe,ee*(1-Math.max(0,pe.bottom-Ae)/v)|0)):Ae<pe.top+x&&fe.scrollTop&&(_=!0,et=-Math.min(fe.scrollTop,ee*(1-Math.max(0,Ae-pe.top)/x)|0)),et&&(fe.scrollTop+=et)),u&&(Xe=fe._gsMaxScrollX-fe.scrollLeft,Xe<0?Ge=Xe:Oe>pe.right-y&&Xe?(_=!0,Ge=Math.min(Xe,ee*(1-Math.max(0,pe.right-Oe)/y)|0)):Oe<pe.left+w&&fe.scrollLeft&&(_=!0,Ge=-Math.min(fe.scrollLeft,ee*(1-Math.max(0,Oe-pe.left)/w)|0)),Ge&&(fe.scrollLeft+=Ge)),Ce&&(Ge||et)&&(Wt.scrollTo(fe.scrollLeft,fe.scrollTop),Se(f.pointerX+Ge,f.pointerY+et)),_e=fe}if(ae){var st=f.x,vt=f.y;a?(f.deltaX=st-parseFloat(C.rotation),f.rotation=st,C.rotation=st+"deg",C.renderTransform(1,C)):F?(h&&(f.deltaY=vt-F.top(),F.top(vt)),u&&(f.deltaX=st-F.left(),F.left(st))):o?(h&&(f.deltaY=vt-parseFloat(C.y),C.y=vt+"px"),u&&(f.deltaX=st-parseFloat(C.x),C.x=st+"px"),C.renderTransform(1,C)):(h&&(f.deltaY=vt-parseFloat(t.style.top||0),t.style.top=vt+"px"),u&&(f.deltaX=st-parseFloat(t.style.left||0),t.style.left=st+"px")),Z&&!j&&!G&&(G=!0,hn(f,"drag","onDrag")===!1&&(u&&(f.x-=f.deltaX),h&&(f.y-=f.deltaY),Fe(!0)),G=!1)}ae=!1},he=function(j,_e){var ee=f.x,fe=f.y,Ce,pe;t._gsap||(C=wt.core.getCache(t)),C.uncache&&wt.getProperty(t,"x"),o?(f.x=parseFloat(C.x),f.y=parseFloat(C.y)):a?f.x=f.rotation=parseFloat(C.rotation):F?(f.y=F.top(),f.x=F.left()):(f.y=parseFloat(t.style.top||(pe=dh(t))&&pe.top)||0,f.x=parseFloat(t.style.left||(pe||{}).left)||0),(be||Re||E)&&!_e&&(f.isDragging||f.isThrowing)&&(E&&(Ll.x=f.x,Ll.y=f.y,Ce=E(Ll),Ce.x!==f.x&&(f.x=Ce.x,ae=!0),Ce.y!==f.y&&(f.y=Ce.y,ae=!0)),be&&(Ce=be(f.x),Ce!==f.x&&(f.x=Ce,a&&(f.rotation=Ce),ae=!0)),Re&&(Ce=Re(f.y),Ce!==f.y&&(f.y=Ce),ae=!0)),ae&&Me(!0),j||(f.deltaX=f.x-ee,f.deltaY=f.y-fe,hn(f,"throwupdate","onThrowUpdate"))},we=function(j,_e,ee,fe){return _e==null&&(_e=-ga),ee==null&&(ee=ga),Oo(j)?function(Ce){var pe=f.isPressed?1-f.edgeResistance:1;return j.call(f,(Ce>ee?ee+(Ce-ee)*pe:Ce<_e?_e+(Ce-_e)*pe:Ce)*fe)*fe}:Su(j)?function(Ce){for(var pe=j.length,Oe=0,Ae=ga,Ge,et;--pe>-1;)Ge=j[pe],et=Ge-Ce,et<0&&(et=-et),et<Ae&&Ge>=_e&&Ge<=ee&&(Oe=pe,Ae=et);return j[Oe]}:isNaN(j)?function(Ce){return Ce}:function(){return j*fe}},Ie=function(j,_e,ee,fe,Ce,pe,Oe){return pe=pe&&pe<ga?pe*pe:ga,Oo(j)?function(Ae){var Ge=f.isPressed?1-f.edgeResistance:1,et=Ae.x,Xe=Ae.y,st,vt,xt;return Ae.x=et=et>ee?ee+(et-ee)*Ge:et<_e?_e+(et-_e)*Ge:et,Ae.y=Xe=Xe>Ce?Ce+(Xe-Ce)*Ge:Xe<fe?fe+(Xe-fe)*Ge:Xe,st=j.call(f,Ae),st!==Ae&&(Ae.x=st.x,Ae.y=st.y),Oe!==1&&(Ae.x*=Oe,Ae.y*=Oe),pe<ga&&(vt=Ae.x-et,xt=Ae.y-Xe,vt*vt+xt*xt>pe&&(Ae.x=et,Ae.y=Xe)),Ae}:Su(j)?function(Ae){for(var Ge=j.length,et=0,Xe=ga,st,vt,xt,dt;--Ge>-1;)xt=j[Ge],st=xt.x-Ae.x,vt=xt.y-Ae.y,dt=st*st+vt*vt,dt<Xe&&(et=Ge,Xe=dt);return Xe<=pe?j[et]:Ae}:function(Ae){return Ae}},ge=function(){var j,_e,ee,fe;X=!1,F?(F.calibrate(),f.minX=me=-F.maxScrollLeft(),f.minY=ie=-F.maxScrollTop(),f.maxX=ue=f.maxY=Ue=0,X=!0):n.bounds&&(j=n1(n.bounds,t.parentNode),a?(f.minX=me=j.left,f.maxX=ue=j.left+j.width,f.minY=ie=f.maxY=Ue=0):!Ir(n.bounds.maxX)||!Ir(n.bounds.maxY)?(j=n.bounds,f.minX=me=j.minX,f.minY=ie=j.minY,f.maxX=ue=j.maxX,f.maxY=Ue=j.maxY):(_e=n1(t,t.parentNode),f.minX=me=Math.round(b(l,"px")+j.left-_e.left),f.minY=ie=Math.round(b(c,"px")+j.top-_e.top),f.maxX=ue=Math.round(me+(j.width-_e.width)),f.maxY=Ue=Math.round(ie+(j.height-_e.height))),me>ue&&(f.minX=ue,f.maxX=ue=me,me=f.minX),ie>Ue&&(f.minY=Ue,f.maxY=Ue=ie,ie=f.minY),a&&(f.minRotation=me,f.maxRotation=ue),X=!0),n.liveSnap&&(ee=n.liveSnap===!0?n.snap||{}:n.liveSnap,fe=Su(ee)||Oo(ee),a?(be=we(fe?ee:ee.rotation,me,ue,1),Re=null):ee.points?E=Ie(fe?ee:ee.points,me,ue,ie,Ue,ee.radius,F?-1:1):(u&&(be=we(fe?ee:ee.x||ee.left||ee.scrollLeft,me,ue,F?-1:1)),h&&(Re=we(fe?ee:ee.y||ee.top||ee.scrollTop,ie,Ue,F?-1:1))))},Le=function(){f.isThrowing=!1,hn(f,"throwcomplete","onThrowComplete")},De=function(){f.isThrowing=!1},Ke=function(j,_e){var ee,fe,Ce,pe;j&&Rr?(j===!0&&(ee=n.snap||n.liveSnap||{},fe=Su(ee)||Oo(ee),j={resistance:(n.throwResistance||n.resistance||1e3)/(a?10:1)},a?j.rotation=A0(f,fe?ee:ee.rotation,ue,me,1,_e):(u&&(j[l]=A0(f,fe?ee:ee.points||ee.x||ee.left,ue,me,F?-1:1,_e||f.lockedAxis==="x")),h&&(j[c]=A0(f,fe?ee:ee.points||ee.y||ee.top,Ue,ie,F?-1:1,_e||f.lockedAxis==="y")),(ee.points||Su(ee)&&Pf(ee[0]))&&(j.linkedProps=l+","+c,j.radius=ee.radius))),f.isThrowing=!0,pe=isNaN(n.overshootTolerance)?n.edgeResistance===1?0:1-f.edgeResistance+.2:n.overshootTolerance,j.duration||(j.duration={max:Math.max(n.minDuration||0,"maxDuration"in n?n.maxDuration:2),min:isNaN(n.minDuration)?pe===0||Pf(j)&&j.resistance>1e3?0:.5:n.minDuration,overshoot:pe}),f.tween=Ce=wt.to(F||t,{inertia:j,data:"_draggable",inherit:!1,onComplete:Le,onInterrupt:De,onUpdate:n.fastMode?hn:he,onUpdateParams:n.fastMode?[f,"onthrowupdate","onThrowUpdate"]:ee&&ee.radius?[!1,!0]:[]}),n.fastMode||(F&&(F._skip=!0),Ce.render(1e9,!0,!0),he(!0,!0),f.endX=f.x,f.endY=f.y,a&&(f.endRotation=f.x),Ce.play(0),he(!0,!0),F&&(F._skip=!1))):X&&f.applyBounds()},Ne=function(j){var _e=V,ee;V=Wn(t.parentNode,!0),j&&f.isPressed&&!V.equals(_e||new Qs)&&(ee=_e.inverse().apply({x:H,y:W}),V.apply(ee,ee),H=ee.x,W=ee.y),V.equals(ZB)&&(V=null)},ze=function(){var j=1-f.edgeResistance,_e=M?Fc(R):0,ee=M?Lc(R):0,fe,Ce,pe;o&&(C.x=b(l,"px")+"px",C.y=b(c,"px")+"px",C.renderTransform()),Ne(!1),hr.x=f.pointerX-_e,hr.y=f.pointerY-ee,V&&V.apply(hr,hr),H=hr.x,W=hr.y,ae&&(Se(f.pointerX,f.pointerY),Me(!0)),K=Wn(t),F?(ge(),$=F.top(),N=F.left()):(Ye()?(he(!0,!0),ge()):f.applyBounds(),a?(fe=t.ownerSVGElement?[C.xOrigin-t.getBBox().x,C.yOrigin-t.getBBox().y]:(dh(t)[Fv]||"0 0").split(" "),Y=f.rotationOrigin=Wn(t).apply({x:parseFloat(fe[0])||0,y:parseFloat(fe[1])||0}),he(!0,!0),Ce=f.pointerX-Y.x-_e,pe=Y.y-f.pointerY+ee,N=f.x,$=f.y=Math.atan2(pe,Ce)*qM):($=b(c,"px"),N=b(l,"px"))),X&&j&&(N>ue?N=ue+(N-ue)/j:N<me&&(N=me-(me-N)/j),a||($>Ue?$=Ue+($-Ue)/j:$<ie&&($=ie-(ie-$)/j))),f.startX=N=_o(N),f.startY=$=_o($)},Ye=function(){return f.tween&&f.tween.isActive()},lt=function(){Rs.parentNode&&!Ye()&&!f.isDragging&&Rs.parentNode.removeChild(Rs)},Q=function(j,_e){var ee;if(!L||f.isPressed||!j||(j.type==="mousedown"||j.type==="pointerdown")&&!_e&&yo()-A<30&&hh[f.pointerEvent.type]){k&&j&&L&&fr(j);return}if(q=Ye(),J=!1,f.pointerEvent=j,hh[j.type]?(O=~j.type.indexOf("touch")?j.currentTarget||j.target:R,Cn(O,"touchend",xe),Cn(O,"touchmove",ve),Cn(O,"touchcancel",xe),Cn(R,"touchstart",JM)):(O=null,Cn(R,"mousemove",ve)),se=null,(!Zp||!O)&&(Cn(R,"mouseup",xe),j&&j.target&&Cn(j.target,"mouseup",xe)),P=T.call(f,j.target)&&n.dragClickables===!1&&!_e,P){Cn(j.target,"change",xe),hn(f,"pressInit","onPressInit"),hn(f,"press","onPress"),kd(p,!0),k=!1;return}if(U=!O||u===h||f.vars.allowNativeTouchScrolling===!1||f.vars.allowContextMenu&&j&&(j.ctrlKey||j.which>2)?!1:u?"y":"x",k=!U&&!f.allowEventDefault,k&&(fr(j),Cn(Wt,"touchforcechange",fr)),j.changedTouches?(j=le=j.changedTouches[0],ye=j.identifier):j.pointerId?ye=j.pointerId:le=ye=null,km++,tz(Me),W=f.pointerY=j.pageY,H=f.pointerX=j.pageX,hn(f,"pressInit","onPressInit"),(U||f.autoScroll)&&E0(t.parentNode),t.parentNode&&f.autoScroll&&!F&&!a&&t.parentNode._gsMaxScrollX&&!Rs.parentNode&&!t.getBBox&&(Rs.style.width=t.parentNode.scrollWidth+"px",t.parentNode.appendChild(Rs)),ze(),f.tween&&f.tween.kill(),f.isThrowing=!1,wt.killTweensOf(F||t,m,!0),F&&wt.killTweensOf(t,{scrollTo:1},!0),f.tween=f.lockedAxis=null,(n.zIndexBoost||!a&&!F&&n.zIndexBoost!==!1)&&(t.style.zIndex=e.zIndex++),f.isPressed=!0,Z=!!(n.onDrag||f._listeners.drag),z=!!(n.onMove||f._listeners.move),n.cursor!==!1||n.activeCursor)for(ee=p.length;--ee>-1;)wt.set(p[ee],{cursor:n.activeCursor||n.cursor||(ef==="grab"?"grabbing":ef)});hn(f,"press","onPress")},ve=function(j){var _e=j,ee,fe,Ce,pe,Oe,Ae;if(!L||Ab||!f.isPressed||!j){k&&j&&L&&fr(j);return}if(f.pointerEvent=j,ee=j.changedTouches,ee){if(j=ee[0],j!==le&&j.identifier!==ye){for(pe=ee.length;--pe>-1&&(j=ee[pe]).identifier!==ye&&j.target!==t;);if(pe<0)return}}else if(j.pointerId&&ye&&j.pointerId!==ye)return;if(O&&U&&!se&&(hr.x=j.pageX-(M?Fc(R):0),hr.y=j.pageY-(M?Lc(R):0),V&&V.apply(hr,hr),fe=hr.x,Ce=hr.y,Oe=Math.abs(fe-H),Ae=Math.abs(Ce-W),(Oe!==Ae&&(Oe>d||Ae>d)||Qu&&U===se)&&(se=Oe>Ae&&u?"x":"y",U&&se!==U&&Cn(Wt,"touchforcechange",fr),f.vars.lockAxisOnTouchScroll!==!1&&u&&h&&(f.lockedAxis=se==="x"?"y":"x",Oo(f.vars.onLockAxis)&&f.vars.onLockAxis.call(f,_e)),Qu&&U===se))){xe(_e);return}!f.allowEventDefault&&(!U||se&&U!==se)&&_e.cancelable!==!1?(fr(_e),k=!0):k&&(k=!1),f.autoScroll&&(_=!0),Se(j.pageX,j.pageY,z)},Se=function(j,_e,ee){var fe=1-f.dragResistance,Ce=1-f.edgeResistance,pe=f.pointerX,Oe=f.pointerY,Ae=$,Ge=f.x,et=f.y,Xe=f.endX,st=f.endY,vt=f.endRotation,xt=ae,dt,pt,It,I,te,oe;f.pointerX=j,f.pointerY=_e,M&&(j-=Fc(R),_e-=Lc(R)),a?(I=Math.atan2(Y.y-_e,j-Y.x)*qM,te=f.y-I,te>180?($-=360,f.y=I):te<-180&&($+=360,f.y=I),f.x!==N||Math.abs($-I)>d?(f.y=I,It=N+($-I)*fe):It=N):(V&&(oe=j*V.a+_e*V.c+V.e,_e=j*V.b+_e*V.d+V.f,j=oe),pt=_e-W,dt=j-H,pt<d&&pt>-d&&(pt=0),dt<d&&dt>-d&&(dt=0),(f.lockAxis||f.lockedAxis)&&(dt||pt)&&(oe=f.lockedAxis,oe||(f.lockedAxis=oe=u&&Math.abs(dt)>Math.abs(pt)?"y":h?"x":null,oe&&Oo(f.vars.onLockAxis)&&f.vars.onLockAxis.call(f,f.pointerEvent)),oe==="y"?pt=0:oe==="x"&&(dt=0)),It=_o(N+dt*fe),I=_o($+pt*fe)),(be||Re||E)&&(f.x!==It||f.y!==I&&!a)&&(E&&(Ll.x=It,Ll.y=I,oe=E(Ll),It=_o(oe.x),I=_o(oe.y)),be&&(It=_o(be(It))),Re&&(I=_o(Re(I)))),X&&(It>ue?It=ue+Math.round((It-ue)*Ce):It<me&&(It=me+Math.round((It-me)*Ce)),a||(I>Ue?I=Math.round(Ue+(I-Ue)*Ce):I<ie&&(I=Math.round(ie+(I-ie)*Ce)))),(f.x!==It||f.y!==I&&!a)&&(a?(f.endRotation=f.x=f.endX=It,ae=!0):(h&&(f.y=f.endY=I,ae=!0),u&&(f.x=f.endX=It,ae=!0)),!ee||hn(f,"move","onMove")!==!1?!f.isDragging&&f.isPressed&&(f.isDragging=J=!0,hn(f,"dragstart","onDragStart")):(f.pointerX=pe,f.pointerY=Oe,$=Ae,f.x=Ge,f.y=et,f.endX=Xe,f.endY=st,f.endRotation=vt,ae=xt))},xe=function Fe(j,_e){if(!L||!f.isPressed||j&&ye!=null&&!_e&&(j.pointerId&&j.pointerId!==ye&&j.target!==t||j.changedTouches&&!iz(j.changedTouches,ye))){k&&j&&L&&fr(j);return}f.isPressed=!1;var ee=j,fe=f.isDragging,Ce=f.vars.allowContextMenu&&j&&(j.ctrlKey||j.which>2),pe=wt.delayedCall(.001,lt),Oe,Ae,Ge,et,Xe;if(O?(yn(O,"touchend",Fe),yn(O,"touchmove",ve),yn(O,"touchcancel",Fe),yn(R,"touchstart",JM)):yn(R,"mousemove",ve),yn(Wt,"touchforcechange",fr),(!Zp||!O)&&(yn(R,"mouseup",Fe),j&&j.target&&yn(j.target,"mouseup",Fe)),ae=!1,fe&&(g=YM=yo(),f.isDragging=!1),ZM(Me),P&&!Ce){j&&(yn(j.target,"change",Fe),f.pointerEvent=ee),kd(p,!1),hn(f,"release","onRelease"),hn(f,"click","onClick"),P=!1;return}for(Ae=p.length;--Ae>-1;)T0(p[Ae],"cursor",n.cursor||(n.cursor!==!1?ef:null));if(km--,j){if(Oe=j.changedTouches,Oe&&(j=Oe[0],j!==le&&j.identifier!==ye)){for(Ae=Oe.length;--Ae>-1&&(j=Oe[Ae]).identifier!==ye&&j.target!==t;);if(Ae<0&&!_e)return}f.pointerEvent=ee,f.pointerX=j.pageX,f.pointerY=j.pageY}return Ce&&ee?(fr(ee),k=!0,hn(f,"release","onRelease")):ee&&!fe?(k=!1,q&&(n.snap||n.bounds)&&Ke(n.inertia||n.throwProps),hn(f,"release","onRelease"),(!Qu||ee.type!=="touchmove")&&ee.type.indexOf("cancel")===-1&&(hn(f,"click","onClick"),yo()-A<300&&hn(f,"doubleclick","onDoubleClick"),et=ee.target||t,A=yo(),Xe=function(){A!==D&&f.enabled()&&!f.isPressed&&!ee.defaultPrevented&&(et.click?et.click():R.createEvent&&(Ge=R.createEvent("MouseEvents"),Ge.initMouseEvent("click",!0,!0,Wt,1,f.pointerEvent.screenX,f.pointerEvent.screenY,f.pointerX,f.pointerY,!1,!1,!1,!1,0,null),et.dispatchEvent(Ge)))},!Qu&&!ee.defaultPrevented&&wt.delayedCall(.05,Xe))):(Ke(n.inertia||n.throwProps),!f.allowEventDefault&&ee&&(n.dragClickables!==!1||!T.call(f,ee.target))&&fe&&(!U||se&&U===se)&&ee.cancelable!==!1?(k=!0,fr(ee)):k=!1,hn(f,"release","onRelease")),Ye()&&pe.duration(f.tween.duration()),fe&&hn(f,"dragend","onDragEnd"),!0},Ee=function(j){if(j&&f.isDragging&&!F){var _e=j.target||t.parentNode,ee=_e.scrollLeft-_e._gsScrollX,fe=_e.scrollTop-_e._gsScrollY;(ee||fe)&&(V?(H-=ee*V.a+fe*V.c,W-=fe*V.d+ee*V.b):(H-=ee,W-=fe),_e._gsScrollX+=ee,_e._gsScrollY+=fe,Se(f.pointerX,f.pointerY))}},Ve=function(j){var _e=yo(),ee=_e-A<100,fe=_e-g<50,Ce=ee&&D===A,pe=f.pointerEvent&&f.pointerEvent.defaultPrevented,Oe=ee&&S===A,Ae=j.isTrusted||j.isTrusted==null&&ee&&Ce;if((Ce||fe&&f.vars.suppressClickOnDrag!==!1)&&j.stopImmediatePropagation&&j.stopImmediatePropagation(),ee&&!(f.pointerEvent&&f.pointerEvent.defaultPrevented)&&(!Ce||Ae&&!Oe)){Ae&&Ce&&(S=A),D=A;return}(f.isPressed||fe||ee)&&(!Ae||!j.detail||!ee||pe)&&fr(j),!ee&&!fe&&!J&&(j&&j.target&&(f.pointerEvent=j),hn(f,"click","onClick"))},it=function(j){return V?{x:j.x*V.a+j.y*V.c+V.e,y:j.x*V.b+j.y*V.d+V.f}:{x:j.x,y:j.y}};return de=e.get(t),de&&de.kill(),r.startDrag=function(Fe,j){var _e,ee,fe,Ce;Q(Fe||f.pointerEvent,!0),j&&!f.hitTest(Fe||f.pointerEvent)&&(_e=Fl(Fe||f.pointerEvent),ee=Fl(t),fe=it({x:_e.left+_e.width/2,y:_e.top+_e.height/2}),Ce=it({x:ee.left+ee.width/2,y:ee.top+ee.height/2}),H-=fe.x-Ce.x,W-=fe.y-Ce.y),f.isDragging||(f.isDragging=J=!0,hn(f,"dragstart","onDragStart"))},r.drag=ve,r.endDrag=function(Fe){return xe(Fe||f.pointerEvent,!0)},r.timeSinceDrag=function(){return f.isDragging?0:(yo()-g)/1e3},r.timeSinceClick=function(){return(yo()-A)/1e3},r.hitTest=function(Fe,j){return e.hitTest(f.target,Fe,j)},r.getDirection=function(Fe,j){var _e=Fe==="velocity"&&Rr?Fe:Pf(Fe)&&!a?"element":"start",ee,fe,Ce,pe,Oe,Ae;return _e==="element"&&(Oe=Fl(f.target),Ae=Fl(Fe)),ee=_e==="start"?f.x-N:_e==="velocity"?Rr.getVelocity(t,l):Oe.left+Oe.width/2-(Ae.left+Ae.width/2),a?ee<0?"counter-clockwise":"clockwise":(j=j||2,fe=_e==="start"?f.y-$:_e==="velocity"?Rr.getVelocity(t,c):Oe.top+Oe.height/2-(Ae.top+Ae.height/2),Ce=Math.abs(ee/fe),pe=Ce<1/j?"":ee<0?"left":"right",Ce<j&&(pe!==""&&(pe+="-"),pe+=fe<0?"up":"down"),pe)},r.applyBounds=function(Fe,j){var _e,ee,fe,Ce,pe,Oe;if(Fe&&n.bounds!==Fe)return n.bounds=Fe,f.update(!0,j);if(he(!0),ge(),X&&!Ye()){if(_e=f.x,ee=f.y,_e>ue?_e=ue:_e<me&&(_e=me),ee>Ue?ee=Ue:ee<ie&&(ee=ie),(f.x!==_e||f.y!==ee)&&(fe=!0,f.x=f.endX=_e,a?f.endRotation=_e:f.y=f.endY=ee,ae=!0,Me(!0),f.autoScroll&&!f.isDragging))for(E0(t.parentNode),Ce=t,Ts.scrollTop=Wt.pageYOffset!=null?Wt.pageYOffset:R.documentElement.scrollTop!=null?R.documentElement.scrollTop:R.body.scrollTop,Ts.scrollLeft=Wt.pageXOffset!=null?Wt.pageXOffset:R.documentElement.scrollLeft!=null?R.documentElement.scrollLeft:R.body.scrollLeft;Ce&&!Oe;)Oe=Zc(Ce.parentNode),pe=Oe?Ts:Ce.parentNode,h&&pe.scrollTop>pe._gsMaxScrollY&&(pe.scrollTop=pe._gsMaxScrollY),u&&pe.scrollLeft>pe._gsMaxScrollX&&(pe.scrollLeft=pe._gsMaxScrollX),Ce=pe;f.isThrowing&&(fe||f.endX>ue||f.endX<me||f.endY>Ue||f.endY<ie)&&Ke(n.inertia||n.throwProps,fe)}return f},r.update=function(Fe,j,_e){if(j&&f.isPressed){var ee=Wn(t),fe=K.apply({x:f.x-N,y:f.y-$}),Ce=Wn(t.parentNode,!0);Ce.apply({x:ee.e-fe.x,y:ee.f-fe.y},fe),f.x-=fe.x-Ce.e,f.y-=fe.y-Ce.f,Me(!0),ze()}var pe=f.x,Oe=f.y;return Ne(!j),Fe?f.applyBounds():(ae&&_e&&Me(!0),he(!0)),j&&(Se(f.pointerX,f.pointerY),ae&&Me(!0)),f.isPressed&&!j&&(u&&Math.abs(pe-f.x)>.01||h&&Math.abs(Oe-f.y)>.01&&!a)&&ze(),f.autoScroll&&(E0(t.parentNode,f.isDragging),_=f.isDragging,Me(!0),e1(t,Ee),QM(t,Ee)),f},r.enable=function(Fe){var j={lazy:!0},_e,ee,fe;if(n.cursor!==!1&&(j.cursor=n.cursor||ef),wt.utils.checkPrefix("touchCallout")&&(j.touchCallout="none"),Fe!=="soft"){for(jM(p,u===h?"none":n.allowNativeTouchScrolling&&t.scrollHeight===t.clientHeight==(t.scrollWidth===t.clientHeight)||n.allowEventDefault?"manipulation":u?"pan-y":"pan-x"),ee=p.length;--ee>-1;)fe=p[ee],Zp||Cn(fe,"mousedown",Q),Cn(fe,"touchstart",Q),Cn(fe,"click",Ve,!0),wt.set(fe,j),fe.getBBox&&fe.ownerSVGElement&&u!==h&&wt.set(fe.ownerSVGElement,{touchAction:n.allowNativeTouchScrolling||n.allowEventDefault?"manipulation":u?"pan-y":"pan-x"}),n.allowContextMenu||Cn(fe,"contextmenu",ne);kd(p,!1)}return QM(t,Ee),L=!0,Rr&&Fe!=="soft"&&Rr.track(F||t,o?"x,y":a?"rotation":"top,left"),t._gsDragID=_e="d"+JB++,Ic[_e]=f,F&&(F.enable(),F.element._gsDragID=_e),(n.bounds||a)&&ze(),n.bounds&&f.applyBounds(),f},r.disable=function(Fe){for(var j=f.isDragging,_e=p.length,ee;--_e>-1;)T0(p[_e],"cursor",null);if(Fe!=="soft"){for(jM(p,null),_e=p.length;--_e>-1;)ee=p[_e],T0(ee,"touchCallout",null),yn(ee,"mousedown",Q),yn(ee,"touchstart",Q),yn(ee,"click",Ve,!0),yn(ee,"contextmenu",ne);kd(p,!0),O&&(yn(O,"touchcancel",xe),yn(O,"touchend",xe),yn(O,"touchmove",ve)),yn(R,"mouseup",xe),yn(R,"mousemove",ve)}return e1(t,Ee),L=!1,Rr&&Fe!=="soft"&&(Rr.untrack(F||t,o?"x,y":a?"rotation":"top,left"),f.tween&&f.tween.kill()),F&&F.disable(),ZM(Me),f.isDragging=f.isPressed=P=!1,j&&hn(f,"dragend","onDragEnd"),f},r.enabled=function(Fe,j){return arguments.length?Fe?f.enable(j):f.disable(j):L},r.kill=function(){return f.isThrowing=!1,f.tween&&f.tween.kill(),f.disable(),wt.set(p,{clearProps:"userSelect"}),delete Ic[t._gsDragID],f},r.revert=function(){this.kill(),this.styles&&this.styles.revert()},~s.indexOf("scroll")&&(F=r.scrollProxy=new lz(t,ez({onKill:function(){f.isPressed&&xe(null)}},n)),t.style.overflowY=h&&!Iv?"auto":"hidden",t.style.overflowX=u&&!Iv?"auto":"hidden",t=F.content),a?m.rotation=1:(u&&(m[l]=1),h&&(m[c]=1)),C.force3D="force3D"in n?n.force3D:!0,uR($M(r)),r.enable(),r}return e.register=function(n){wt=n,C0()},e.create=function(n,r){return Pv||C0(!0),Xo(n).map(function(s){return new e(s,r)})},e.get=function(n){return Ic[(Xo(n)[0]||{})._gsDragID]},e.timeSinceDrag=function(){return(yo()-YM)/1e3},e.hitTest=function(n,r,s){if(n===r)return!1;var o=Fl(n),a=Fl(r),l=o.top,c=o.left,u=o.right,h=o.bottom,d=o.width,f=o.height,p=a.left>u||a.right<c||a.top>h||a.bottom<l,m,g,_;return p||!s?!p:(_=(s+"").indexOf("%")!==-1,s=parseFloat(s)||0,m={left:Math.max(c,a.left),top:Math.max(l,a.top)},m.width=Math.min(u,a.right)-m.left,m.height=Math.min(h,a.bottom)-m.top,m.width<0||m.height<0?!1:_?(s*=.01,g=m.width*m.height,g>=d*f*s||g>=a.width*a.height*s):m.width>s&&m.height>s)},e}(cz);nz(lu.prototype,{pointerX:0,pointerY:0,startX:0,startY:0,deltaX:0,deltaY:0,isDragging:!1,isPressed:!1});lu.zIndex=1e3;lu.version="3.12.5";hR()&&wt.registerPlugin(lu);function uz(i,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(i,n.key,n)}}function fz(i,e,t){return e&&uz(i.prototype,e),i}/*!
 * ScrollSmoother 3.12.5
 * https://gsap.com
 *
 * @license Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Lt,Bd,Kn,dc,tf,Yr,Fa,i1,ct,ts,zd,r1,s1,o1,a1,gR=function(){return typeof window<"u"},_R=function(){return Lt||gR()&&(Lt=window.gsap)&&Lt.registerPlugin&&Lt},hz=function(e){return Math.round(e*1e5)/1e5||0},vo=function(e){return ct.maxScroll(e||Kn)},dz=function(e,t){var n=e.parentNode||tf,r=e.getBoundingClientRect(),s=n.getBoundingClientRect(),o=s.top-r.top,a=s.bottom-r.bottom,l=(Math.abs(o)>Math.abs(a)?o:a)/(1-t),c=-l*t,u,h;return l>0&&(u=s.height/(Kn.innerHeight+s.height),h=u===.5?s.height*2:Math.min(s.height,Math.abs(-l*u/(2*u-1)))*2*(t||1),c+=t?-h*t:-h/2,l+=h),{change:l,offset:c}},pz=function(e){var t=dc.querySelector(".ScrollSmoother-wrapper");return t||(t=dc.createElement("div"),t.classList.add("ScrollSmoother-wrapper"),e.parentNode.insertBefore(t,e),t.appendChild(e)),t},_l=function(){function i(e){var t=this;Bd||i.register(Lt)||console.warn("Please gsap.registerPlugin(ScrollSmoother)"),e=this.vars=e||{},ts&&ts.kill(),ts=this,o1(this);var n=e,r=n.smoothTouch,s=n.onUpdate,o=n.onStop,a=n.smooth,l=n.onFocusIn,c=n.normalizeScroll,u=n.wholePixels,h,d,f,p,m,g,_,x,y,v,w,T,A,C,M=this,b=e.effectsPrefix||"",R=ct.getScrollFunc(Kn),L=ct.isTouch===1?r===!0?.8:parseFloat(r)||0:a===0||a===!1?0:parseFloat(a)||.8,F=L&&+e.speed||1,H=0,W=0,N=1,$=r1(0),X=function(){return $.update(-H)},Z={y:0},z=function(){return h.style.overflow="visible"},ue,me=function(D){D.update();var S=D.getTween();S&&(S.pause(),S._time=S._dur,S._tTime=S._tDur),ue=!1,D.animation.progress(D.progress,!0)},Ue=function(D,S){(D!==H&&!v||S)&&(u&&(D=Math.round(D)),L&&(h.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+D+", 0, 1)",h._gsap.y=D+"px"),W=D-H,H=D,ct.isUpdating||i.isRefreshing||ct.update())},ie=function(D){return arguments.length?(D<0&&(D=0),Z.y=-D,ue=!0,v?H=-D:Ue(-D),ct.isRefreshing?p.update():R(D/F),this):-H},le=typeof ResizeObserver<"u"&&e.autoResize!==!1&&new ResizeObserver(function(){if(!ct.isRefreshing){var G=vo(d)*F;G<-H&&ie(G),a1.restart(!0)}}),ye,Y=function(D){d.scrollTop=0,!(D.target.contains&&D.target.contains(d)||l&&l(t,D)===!1)&&(ct.isInViewport(D.target)||D.target===ye||t.scrollTo(D.target,!1,"center center"),ye=D.target)},ae=function(D,S){if(D<S.start)return D;var k=isNaN(S.ratio)?1:S.ratio,K=S.end-S.start,J=D-S.start,ne=S.offset||0,Me=S.pins||[],he=Me.offset||0,we=S._startClamp&&S.start<=0||S.pins&&S.pins.offset?0:S._endClamp&&S.end===vo()?1:.5;return Me.forEach(function(Ie){K-=Ie.distance,Ie.nativeStart<=D&&(J-=Ie.distance)}),he&&(J*=(K-he/k)/K),D+(J-ne*we)/k-J},de=function G(D,S,k){k||(D.pins.length=D.pins.offset=0);var K=D.pins,J=D.markers,ne,Me,he,we,Ie,ge,Le,De;for(Le=0;Le<S.length;Le++)if(De=S[Le],D.trigger&&De.trigger&&D!==De&&(De.trigger===D.trigger||De.pinnedContainer===D.trigger||D.trigger.contains(De.trigger))&&(Ie=De._startNative||De._startClamp||De.start,ge=De._endNative||De._endClamp||De.end,he=ae(Ie,D),we=De.pin&&ge>0?he+(ge-Ie):ae(ge,D),De.setPositions(he,we,!0,(De._startClamp?Math.max(0,he):he)-Ie),De.markerStart&&J.push(Lt.quickSetter([De.markerStart,De.markerEnd],"y","px")),De.pin&&De.end>0&&!k)){if(ne=De.end-De.start,Me=D._startClamp&&De.start<0,Me){if(D.start>0){D.setPositions(0,D.end+(D._startNative-D.start),!0),G(D,S);return}ne+=De.start,K.offset=-De.start}K.push({start:De.start,nativeStart:Ie,end:De.end,distance:ne,trig:De}),D.setPositions(D.start,D.end+(Me?-De.start:ne),!0)}},be=function(D,S){m.forEach(function(k){return de(k,D,S)})},Re=function(){z(),requestAnimationFrame(z),m&&(ct.getAll().forEach(function(D){D._startNative=D.start,D._endNative=D.end}),m.forEach(function(D){var S=D._startClamp||D.start,k=D.autoSpeed?Math.min(vo(),D.end):S+Math.abs((D.end-S)/D.ratio),K=k-D.end;if(S-=K/2,k-=K/2,S>k){var J=S;S=k,k=J}D._startClamp&&S<0?(k=D.ratio<0?vo():D.end/D.ratio,K=k-D.end,S=0):(D.ratio<0||D._endClamp&&k>=vo())&&(k=vo(),S=D.ratio<0||D.ratio>1?0:k-(k-D.start)/D.ratio,K=(k-S)*D.ratio-(D.end-D.start)),D.offset=K||1e-4,D.pins.length=D.pins.offset=0,D.setPositions(S,k,!0)}),be(ct.sort())),$.reset()},E=function(){return ct.addEventListener("refresh",Re)},P=function(){return m&&m.forEach(function(D){return D.vars.onRefresh(D)})},O=function(){return m&&m.forEach(function(D){return D.vars.onRefreshInit(D)}),P},V=function(D,S,k,K){return function(){var J=typeof S=="function"?S(k,K):S;J||J===0||(J=K.getAttribute("data-"+b+D)||(D==="speed"?1:0)),K.setAttribute("data-"+b+D,J);var ne=(J+"").substr(0,6)==="clamp(";return{clamp:ne,value:ne?J.substr(6,J.length-7):J}}},q=function(D,S,k,K,J){J=(typeof J=="function"?J(K,D):J)||0;var ne=V("speed",S,K,D),Me=V("lag",k,K,D),he=Lt.getProperty(D,"y"),we=D._gsap,Ie,ge,Le,De,Ke,Ne,ze=[],Ye=function(){S=ne(),k=parseFloat(Me().value),Ie=parseFloat(S.value)||1,Le=S.value==="auto",Ke=Le||ge&&ge._startClamp&&ge.start<=0||ze.offset?0:ge&&ge._endClamp&&ge.end===vo()?1:.5,De&&De.kill(),De=k&&Lt.to(D,{ease:zd,overwrite:!1,y:"+=0",duration:k}),ge&&(ge.ratio=Ie,ge.autoSpeed=Le)},lt=function(){we.y=he+"px",we.renderTransform(1),Ye()},Q=[],ve=0,Se=function(Ee){if(Le){lt();var Ve=dz(D,i1(0,1,-Ee.start/(Ee.end-Ee.start)));ve=Ve.change,Ne=Ve.offset}else Ne=ze.offset||0,ve=(Ee.end-Ee.start-Ne)*(1-Ie);ze.forEach(function(it){return ve-=it.distance*(1-Ie)}),Ee.offset=ve||.001,Ee.vars.onUpdate(Ee),De&&De.progress(1)};return Ye(),(Ie!==1||Le||De)&&(ge=ct.create({trigger:Le?D.parentNode:D,start:function(){return S.clamp?"clamp(top bottom+="+J+")":"top bottom+="+J},end:function(){return S.value<0?"max":S.clamp?"clamp(bottom top-="+J+")":"bottom top-="+J},scroller:d,scrub:!0,refreshPriority:-999,onRefreshInit:lt,onRefresh:Se,onKill:function(Ee){var Ve=m.indexOf(Ee);Ve>=0&&m.splice(Ve,1),lt()},onUpdate:function(Ee){var Ve=he+ve*(Ee.progress-Ke),it=ze.length,Fe=0,j,_e,ee;if(Ee.offset){if(it){for(_e=-H,ee=Ee.end;it--;){if(j=ze[it],j.trig.isActive||_e>=j.start&&_e<=j.end){De&&(j.trig.progress+=j.trig.direction<0?.001:-.001,j.trig.update(0,0,1),De.resetTo("y",parseFloat(we.y),-W,!0),N&&De.progress(1));return}_e>j.end&&(Fe+=j.distance),ee-=j.distance}Ve=he+Fe+ve*((Lt.utils.clamp(Ee.start,Ee.end,_e)-Ee.start-Fe)/(ee-Ee.start)-Ke)}Q.length&&!Le&&Q.forEach(function(fe){return fe(Ve-Fe)}),Ve=hz(Ve+Ne),De?(De.resetTo("y",Ve,-W,!0),N&&De.progress(1)):(we.y=Ve+"px",we.renderTransform(1))}}}),Se(ge),Lt.core.getCache(ge.trigger).stRevert=O,ge.startY=he,ge.pins=ze,ge.markers=Q,ge.ratio=Ie,ge.autoSpeed=Le,D.style.willChange="transform"),ge};E(),ct.addEventListener("killAll",E),Lt.delayedCall(.5,function(){return N=0}),this.scrollTop=ie,this.scrollTo=function(G,D,S){var k=Lt.utils.clamp(0,vo(),isNaN(G)?t.offset(G,S,!!D&&!v):+G);D?v?Lt.to(t,{duration:L,scrollTop:k,overwrite:"auto",ease:zd}):R(k):ie(k)},this.offset=function(G,D,S){G=Fa(G)[0];var k=G.style.cssText,K=ct.create({trigger:G,start:D||"top top"}),J;return m&&(N?ct.refresh():be([K],!0)),J=K.start/(S?F:1),K.kill(!1),G.style.cssText=k,Lt.core.getCache(G).uncache=1,J};function U(){return f=h.clientHeight,h.style.overflow="visible",Yr.style.height=Kn.innerHeight+(f-Kn.innerHeight)/F+"px",f-Kn.innerHeight}this.content=function(G){if(arguments.length){var D=Fa(G||"#smooth-content")[0]||console.warn("ScrollSmoother needs a valid content element.")||Yr.children[0];return D!==h&&(h=D,y=h.getAttribute("style")||"",le&&le.observe(h),Lt.set(h,{overflow:"visible",width:"100%",boxSizing:"border-box",y:"+=0"}),L||Lt.set(h,{clearProps:"transform"})),this}return h},this.wrapper=function(G){return arguments.length?(d=Fa(G||"#smooth-wrapper")[0]||pz(h),x=d.getAttribute("style")||"",U(),Lt.set(d,L?{overflow:"hidden",position:"fixed",height:"100%",width:"100%",top:0,left:0,right:0,bottom:0}:{overflow:"visible",position:"relative",width:"100%",height:"auto",top:"auto",bottom:"auto",left:"auto",right:"auto"}),this):d},this.effects=function(G,D){var S;if(m||(m=[]),!G)return m.slice(0);G=Fa(G),G.forEach(function(Ie){for(var ge=m.length;ge--;)m[ge].trigger===Ie&&m[ge].kill()}),D=D||{};var k=D,K=k.speed,J=k.lag,ne=k.effectsPadding,Me=[],he,we;for(he=0;he<G.length;he++)we=q(G[he],K,J,he,ne),we&&Me.push(we);return(S=m).push.apply(S,Me),D.refresh!==!1&&ct.refresh(),Me},this.sections=function(G,D){var S;if(g||(g=[]),!G)return g.slice(0);var k=Fa(G).map(function(K){return ct.create({trigger:K,start:"top 120%",end:"bottom -20%",onToggle:function(ne){K.style.opacity=ne.isActive?"1":"0",K.style.pointerEvents=ne.isActive?"all":"none"}})});return D&&D.add?(S=g).push.apply(S,k):g=k.slice(0),k},this.content(e.content),this.wrapper(e.wrapper),this.render=function(G){return Ue(G||G===0?G:H)},this.getVelocity=function(){return $.getVelocity(-H)},ct.scrollerProxy(d,{scrollTop:ie,scrollHeight:function(){return U()&&Yr.scrollHeight},fixedMarkers:e.fixedMarkers!==!1&&!!L,content:h,getBoundingClientRect:function(){return{top:0,left:0,width:Kn.innerWidth,height:Kn.innerHeight}}}),ct.defaults({scroller:d});var se=ct.getAll().filter(function(G){return G.scroller===Kn||G.scroller===d});se.forEach(function(G){return G.revert(!0,!0)}),p=ct.create({animation:Lt.fromTo(Z,{y:function(){return C=0,0}},{y:function(){return C=1,-U()},immediateRender:!1,ease:"none",data:"ScrollSmoother",duration:100,onUpdate:function(){if(C){var D=ue;D&&(me(p),Z.y=H),Ue(Z.y,D),X(),s&&!v&&s(M)}}}),onRefreshInit:function(D){if(!i.isRefreshing){if(i.isRefreshing=!0,m){var S=ct.getAll().filter(function(K){return!!K.pin});m.forEach(function(K){K.vars.pinnedContainer||S.forEach(function(J){if(J.pin.contains(K.trigger)){var ne=K.vars;ne.pinnedContainer=J.pin,K.vars=null,K.init(ne,K.animation)}})})}var k=D.getTween();A=k&&k._end>k._dp._time,T=H,Z.y=0,L&&(ct.isTouch===1&&(d.style.position="absolute"),d.scrollTop=0,ct.isTouch===1&&(d.style.position="fixed"))}},onRefresh:function(D){D.animation.invalidate(),D.setPositions(D.start,U()/F),A||me(D),Z.y=-R()*F,Ue(Z.y),N||(A&&(ue=!1),D.animation.progress(Lt.utils.clamp(0,1,T/F/-D.end))),A&&(D.progress-=.001,D.update()),i.isRefreshing=!1},id:"ScrollSmoother",scroller:Kn,invalidateOnRefresh:!0,start:0,refreshPriority:-9999,end:function(){return U()/F},onScrubComplete:function(){$.reset(),o&&o(t)},scrub:L||!0}),this.smooth=function(G){return arguments.length&&(L=G||0,F=L&&+e.speed||1,p.scrubDuration(G)),p.getTween()?p.getTween().duration():0},p.getTween()&&(p.getTween().vars.ease=e.ease||zd),this.scrollTrigger=p,e.effects&&this.effects(e.effects===!0?"[data-"+b+"speed], [data-"+b+"lag]":e.effects,{effectsPadding:e.effectsPadding,refresh:!1}),e.sections&&this.sections(e.sections===!0?"[data-section]":e.sections),se.forEach(function(G){G.vars.scroller=d,G.revert(!1,!0),G.init(G.vars,G.animation)}),this.paused=function(G,D){return arguments.length?(!!v!==G&&(G?(p.getTween()&&p.getTween().pause(),R(-H/F),$.reset(),w=ct.normalizeScroll(),w&&w.disable(),v=ct.observe({preventDefault:!0,type:"wheel,touch,scroll",debounce:!1,allowClicks:!0,onChangeY:function(){return ie(-H)}}),v.nested=s1(tf,"wheel,touch,scroll",!0,D!==!1)):(v.nested.kill(),v.kill(),v=0,w&&w.enable(),p.progress=(-H/F-p.start)/(p.end-p.start),me(p))),this):!!v},this.kill=this.revert=function(){t.paused(!1),me(p),p.kill();for(var G=(m||[]).concat(g||[]),D=G.length;D--;)G[D].kill();ct.scrollerProxy(d),ct.removeEventListener("killAll",E),ct.removeEventListener("refresh",Re),d.style.cssText=x,h.style.cssText=y;var S=ct.defaults({});S&&S.scroller===d&&ct.defaults({scroller:Kn}),t.normalizer&&ct.normalizeScroll(!1),clearInterval(_),ts=null,le&&le.disconnect(),Yr.style.removeProperty("height"),Kn.removeEventListener("focusin",Y)},this.refresh=function(G,D){return p.refresh(G,D)},c&&(this.normalizer=ct.normalizeScroll(c===!0?{debounce:!0,content:!L&&h}:c)),ct.config(e),"overscrollBehavior"in Kn.getComputedStyle(Yr)&&Lt.set([Yr,tf],{overscrollBehavior:"none"}),"scrollBehavior"in Kn.getComputedStyle(Yr)&&Lt.set([Yr,tf],{scrollBehavior:"auto"}),Kn.addEventListener("focusin",Y),_=setInterval(X,250),dc.readyState==="loading"||requestAnimationFrame(function(){return ct.refresh()})}return i.register=function(t){return Bd||(Lt=t||_R(),gR()&&window.document&&(Kn=window,dc=document,tf=dc.documentElement,Yr=dc.body),Lt&&(Fa=Lt.utils.toArray,i1=Lt.utils.clamp,zd=Lt.parseEase("expo"),o1=Lt.core.context||function(){},ct=Lt.core.globals().ScrollTrigger,Lt.core.globals("ScrollSmoother",i),Yr&&ct&&(a1=Lt.delayedCall(.2,function(){return ct.isRefreshing||ts&&ts.refresh()}).pause(),r1=ct.core._getVelocityProp,s1=ct.core._inputObserver,i.refresh=ct.refresh,Bd=1))),Bd},fz(i,[{key:"progress",get:function(){return this.scrollTrigger?this.scrollTrigger.animation._time/100:0}}]),i}();_l.version="3.12.5";_l.create=function(i){return ts&&i&&ts.content()===Fa(i.content)[0]?ts:new _l(i)};_l.get=function(){return ts};_R()&&Lt.registerPlugin(_l);/*!
 * VelocityTracker: 3.12.5
 * https://gsap.com
 *
 * Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var ns,Nv,Lf,yR,sc,pc,Uv,vR,xR=function(){return ns||typeof window<"u"&&(ns=window.gsap)},kv={},mz=function(e){return Math.round(e*1e4)/1e4},Bv=function(e){return vR(e).id},nf=function(e){return kv[Bv(typeof e=="string"?Lf(e)[0]:e)]},l1=function(e){var t=sc,n;if(e-Uv>=.05)for(Uv=e;t;)n=t.g(t.t,t.p),(n!==t.v1||e-t.t1>.2)&&(t.v2=t.v1,t.v1=n,t.t2=t.t1,t.t1=e),t=t._next},gz={deg:360,rad:Math.PI*2},D0=function(){ns=xR(),ns&&(Lf=ns.utils.toArray,yR=ns.utils.getUnit,vR=ns.core.getCache,pc=ns.ticker,Nv=1)},_z=function(e,t,n,r){this.t=e,this.p=t,this.g=e._gsap.get,this.rCap=gz[n||yR(this.g(e,t))],this.v1=this.v2=0,this.t1=this.t2=pc.time,r&&(this._next=r,r._prev=this)},jh=function(){function i(t,n){Nv||D0(),this.target=Lf(t)[0],kv[Bv(this.target)]=this,this._props={},n&&this.add(n)}i.register=function(n){ns=n,D0()};var e=i.prototype;return e.get=function(n,r){var s=this._props[n]||console.warn("Not tracking "+n+" velocity."),o,a,l;return o=parseFloat(r?s.v1:s.g(s.t,s.p)),a=o-parseFloat(s.v2),l=s.rCap,l&&(a=a%l,a!==a%(l/2)&&(a=a<0?a+l:a-l)),mz(a/((r?s.t1:pc.time)-s.t2))},e.getAll=function(){var n={},r=this._props,s;for(s in r)n[s]=this.get(s);return n},e.isTracking=function(n){return n in this._props},e.add=function(n,r){n in this._props||(sc||(pc.add(l1),Uv=pc.time),sc=this._props[n]=new _z(this.target,n,r,sc))},e.remove=function(n){var r=this._props[n],s,o;r&&(s=r._prev,o=r._next,s&&(s._next=o),o?o._prev=s:sc===r&&(pc.remove(l1),sc=0),delete this._props[n])},e.kill=function(n){for(var r in this._props)this.remove(r);n||delete kv[Bv(this.target)]},i.track=function(n,r,s){Nv||D0();for(var o=[],a=Lf(n),l=r.split(","),c=(s||"").split(","),u=a.length,h,d;u--;){for(h=nf(a[u])||new i(a[u]),d=l.length;d--;)h.add(l[d],c[d]||c[0]);o.push(h)}return o},i.untrack=function(n,r){var s=(r||"").split(",");Lf(n).forEach(function(o){var a=nf(o);a&&(s.length?s.forEach(function(l){return a.remove(l)}):a.kill(1))})},i.isTracking=function(n,r){var s=nf(n);return s&&s.isTracking(r)},i.getVelocity=function(n,r){var s=nf(n);return!s||!s.isTracking(r)?console.warn("Not tracking velocity of "+r):s.get(r)},i}();jh.getByTarget=nf;xR()&&ns.registerPlugin(jh);/*!
 * InertiaPlugin 3.12.5
 * https://gsap.com
 *
 * @license Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Dn,bR,c1,SR,zv,Ff,wR,MR,ER,Cb,TR,Of,Hv,AR,Bm=jh.getByTarget,CR=function(){return Dn||typeof window<"u"&&(Dn=window.gsap)&&Dn.registerPlugin&&Dn},yz=function(e){return typeof e=="string"},ph=function(e){return typeof e=="number"},Jo=function(e){return typeof e=="object"},Vv=function(e){return typeof e=="function"},vz=1,DR=Array.isArray,xz=function(e){return e},rl=1e10,u1=1/rl,RR=.05,bz=function(e){return Math.round(e*1e4)/1e4},Sz=function(e,t,n){for(var r in t)!(r in e)&&r!==n&&(e[r]=t[r]);return e},wz=function i(e){var t={},n,r;for(n in e)t[n]=Jo(r=e[n])&&!DR(r)?i(r):r;return t},f1=function(e,t,n,r,s){var o=t.length,a=0,l=rl,c,u,h,d;if(Jo(e)){for(;o--;){c=t[o],u=0;for(h in e)d=c[h]-e[h],u+=d*d;u<l&&(a=o,l=u)}if((s||rl)<rl&&s<Math.sqrt(l))return e}else for(;o--;)c=t[o],u=c-e,u<0&&(u=-u),u<l&&c>=r&&c<=n&&(a=o,l=u);return t[a]},PR=function(e,t,n,r,s,o,a){if(e.end==="auto")return e;var l=e.end,c,u;if(n=isNaN(n)?rl:n,r=isNaN(r)?-rl:r,Jo(t)){if(c=t.calculated?t:(Vv(l)?l(t,a):f1(t,l,n,r,o))||t,!t.calculated){for(u in c)t[u]=c[u];t.calculated=!0}c=c[s]}else c=Vv(l)?l(t,a):DR(l)?f1(t,l,n,r,o):parseFloat(l);return c>n?c=n:c<r&&(c=r),{max:c,min:c,unitFactor:e.unitFactor}},zm=function(e,t,n){return isNaN(e[t])?n:+e[t]},Db=function(e,t){return t*RR*e/Cb},h1=function(e,t,n){return Math.abs((t-e)*Cb/n/RR)},IR={resistance:1,checkpoint:1,preventOvershoot:1,linkedProps:1,radius:1,duration:1},LR=function(e,t,n,r){if(t.linkedProps){var s=t.linkedProps.split(","),o={},a,l,c,u,h,d;for(a=0;a<s.length;a++)l=s[a],c=t[l],c&&(ph(c.velocity)?u=c.velocity:(h=h||Bm(e),u=h&&h.isTracking(l)?h.get(l):0),d=Math.abs(u/zm(c,"resistance",r)),o[l]=parseFloat(n(e,l))+Db(u,d));return o}},Mz=function(e,t,n,r,s,o){if(n===void 0&&(n=10),r===void 0&&(r=.2),s===void 0&&(s=1),yz(e)&&(e=SR(e)[0]),!e)return 0;var a=0,l=rl,c=t.inertia||t,u=ER(e).get,h=zm(c,"resistance",Ff.resistance),d,f,p,m,g,_,x,y,v,w;w=LR(e,c,u,h);for(d in c)IR[d]||(f=c[d],Jo(f)||(y=y||Bm(e),y&&y.isTracking(d)?f=ph(f)?{velocity:f}:{velocity:y.get(d)}:(m=+f||0,p=Math.abs(m/h))),Jo(f)&&(ph(f.velocity)?m=f.velocity:(y=y||Bm(e),m=y&&y.isTracking(d)?y.get(d):0),p=TR(r,n,Math.abs(m/zm(f,"resistance",h))),g=parseFloat(u(e,d))||0,_=g+Db(m,p),"end"in f&&(f=PR(f,w&&d in w?w:_,f.max,f.min,d,c.radius,m),Of===t&&(Of=c=wz(t)),c[d]=Sz(f,c[d],"end")),"max"in f&&_>+f.max+u1?(v=f.unitFactor||Ff.unitFactors[d]||1,x=g>f.max&&f.min!==f.max||m*v>-15&&m*v<45?r+(n-r)*.1:h1(g,f.max,m),x+s<l&&(l=x+s)):"min"in f&&_<+f.min-u1&&(v=f.unitFactor||Ff.unitFactors[d]||1,x=g<f.min&&f.min!==f.max||m*v>-45&&m*v<15?r+(n-r)*.1:h1(g,f.min,m),x+s<l&&(l=x+s)),x>a&&(a=x)),p>a&&(a=p));return a>l&&(a=l),a>n?n:a<r?r:a},d1=function(){Dn=CR(),Dn&&(c1=Dn.parseEase,SR=Dn.utils.toArray,wR=Dn.utils.getUnit,ER=Dn.core.getCache,TR=Dn.utils.clamp,Hv=Dn.core.getStyleSaver,AR=Dn.core.reverting||function(){},zv=c1("power3"),Cb=zv(.05),MR=Dn.core.PropTween,Dn.config({resistance:100,unitFactors:{time:1e3,totalTime:1e3,progress:1e3,totalProgress:1e3}}),Ff=Dn.config(),Dn.registerPlugin(jh),bR=1)},Yg={version:"3.12.5",name:"inertia",register:function(e){Dn=e,d1()},init:function(e,t,n,r,s){bR||d1();var o=Bm(e);if(t==="auto"){if(!o){console.warn("No inertia tracking on "+e+". InertiaPlugin.track(target) first.");return}t=o.getAll()}this.styles=Hv&&typeof e.style=="object"&&Hv(e),this.target=e,this.tween=n,Of=t;var a=e._gsap,l=a.get,c=t.duration,u=Jo(c),h=t.preventOvershoot||u&&c.overshoot===0,d=zm(t,"resistance",Ff.resistance),f=ph(c)?c:Mz(e,t,u&&c.max||10,u&&c.min||.2,u&&"overshoot"in c?+c.overshoot:h?0:1),p,m,g,_,x,y,v,w,T;t=Of,Of=0,T=LR(e,t,l,d);for(p in t)IR[p]||(m=t[p],Vv(m)&&(m=m(r,e,s)),ph(m)?x=m:Jo(m)&&!isNaN(m.velocity)?x=+m.velocity:o&&o.isTracking(p)?x=o.get(p):console.warn("ERROR: No velocity was defined for "+e+" property: "+p),y=Db(x,f),w=0,g=l(e,p),_=wR(g),g=parseFloat(g),Jo(m)&&(v=g+y,"end"in m&&(m=PR(m,T&&p in T?T:v,m.max,m.min,p,t.radius,x)),"max"in m&&+m.max<v?h||m.preventOvershoot?y=m.max-g:w=m.max-g-y:"min"in m&&+m.min>v&&(h||m.preventOvershoot?y=m.min-g:w=m.min-g-y)),this._props.push(p),this.styles&&this.styles.save(p),this._pt=new MR(this._pt,e,p,g,0,xz,0,a.set(e,p,this)),this._pt.u=_||0,this._pt.c1=y,this._pt.c2=w);return n.duration(f),vz},render:function(e,t){var n=t._pt;if(e=zv(t.tween._time/t.tween._dur),e||!AR())for(;n;)n.set(n.t,n.p,bz(n.s+n.c1*e+n.c2*e*e)+n.u,n.d,e),n=n._next;else t.styles.revert()}};"track,untrack,isTracking,getVelocity,getByTarget".split(",").forEach(function(i){return Yg[i]=jh[i]});CR()&&Dn.registerPlugin(Yg);/*!
 * SplitText: 3.12.5
 * https://gsap.com
 *
 * @license Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var mc,Gv,FR,wu,OR,jg,Ez=/(?:\r|\n|\t\t)/g,Tz=/(?:\s\s+)/g,Az=" ",NR=function(e){mc=document,Gv=window,wu=wu||e||Gv.gsap||console.warn("Please gsap.registerPlugin(SplitText)"),wu&&(jg=wu.utils.toArray,OR=wu.core.context||function(){},FR=1)},UR=function(e){return Gv.getComputedStyle(e)},Rb=function(e){return e.position==="absolute"||e.absolute===!0},Cz=function(e,t){for(var n=t.length,r;--n>-1;)if(r=t[n],e.substr(0,r.length)===r)return r.length},Dz=" style='position:relative;display:inline-block;'",p1=function(e,t){e===void 0&&(e="");var n=~e.indexOf("++"),r=1;return n&&(e=e.split("++").join("")),function(){return"<"+t+Dz+(e?" class='"+e+(n?r++:"")+"'>":">")}},kR=function i(e,t,n){var r=e.nodeType;if(r===1||r===9||r===11)for(e=e.firstChild;e;e=e.nextSibling)i(e,t,n);else(r===3||r===4)&&(e.nodeValue=e.nodeValue.split(t).join(n))},R0=function(e,t){for(var n=t.length;--n>-1;)e.push(t[n])},m1=function(e,t,n){for(var r;e&&e!==t;){if(r=e._next||e.nextSibling,r)return r.textContent.charAt(0)===n;e=e.parentNode||e._parent}},Rz=function i(e){var t=jg(e.childNodes),n=t.length,r,s;for(r=0;r<n;r++)s=t[r],s._isSplit?i(s):r&&s.previousSibling&&s.previousSibling.nodeType===3?(s.previousSibling.nodeValue+=s.nodeType===3?s.nodeValue:s.firstChild.nodeValue,e.removeChild(s)):s.nodeType!==3&&(e.insertBefore(s.firstChild,s),e.removeChild(s))},jr=function(e,t){return parseFloat(t[e])||0},Pz=function(e,t,n,r,s,o,a){var l=UR(e),c=jr("paddingLeft",l),u=-999,h=jr("borderBottomWidth",l)+jr("borderTopWidth",l),d=jr("borderLeftWidth",l)+jr("borderRightWidth",l),f=jr("paddingTop",l)+jr("paddingBottom",l),p=jr("paddingLeft",l)+jr("paddingRight",l),m=jr("fontSize",l)*(t.lineThreshold||.2),g=l.textAlign,_=[],x=[],y=[],v=t.wordDelimiter||" ",w=t.tag?t.tag:t.span?"span":"div",T=t.type||t.split||"chars,words,lines",A=s&&~T.indexOf("lines")?[]:null,C=~T.indexOf("words"),M=~T.indexOf("chars"),b=Rb(t),R=t.linesClass,L=~(R||"").indexOf("++"),F=[],H=l.display==="flex",W=e.style.display,N,$,X,Z,z,ue,me,Ue,ie,le,ye,Y;for(L&&(R=R.split("++").join("")),H&&(e.style.display="block"),$=e.getElementsByTagName("*"),X=$.length,z=[],N=0;N<X;N++)z[N]=$[N];if(A||b)for(N=0;N<X;N++)Z=z[N],ue=Z.parentNode===e,(ue||b||M&&!C)&&(Y=Z.offsetTop,A&&ue&&Math.abs(Y-u)>m&&(Z.nodeName!=="BR"||N===0)&&(me=[],A.push(me),u=Y),b&&(Z._x=Z.offsetLeft,Z._y=Y,Z._w=Z.offsetWidth,Z._h=Z.offsetHeight),A&&((Z._isSplit&&ue||!M&&ue||C&&ue||!C&&Z.parentNode.parentNode===e&&!Z.parentNode._isSplit)&&(me.push(Z),Z._x-=c,m1(Z,e,v)&&(Z._wordEnd=!0)),Z.nodeName==="BR"&&(Z.nextSibling&&Z.nextSibling.nodeName==="BR"||N===0)&&A.push([])));for(N=0;N<X;N++){if(Z=z[N],ue=Z.parentNode===e,Z.nodeName==="BR"){A||b?(Z.parentNode&&Z.parentNode.removeChild(Z),z.splice(N--,1),X--):C||e.appendChild(Z);continue}if(b&&(ie=Z.style,!C&&!ue&&(Z._x+=Z.parentNode._x,Z._y+=Z.parentNode._y),ie.left=Z._x+"px",ie.top=Z._y+"px",ie.position="absolute",ie.display="block",ie.width=Z._w+1+"px",ie.height=Z._h+"px"),!C&&M)if(Z._isSplit)for(Z._next=$=Z.nextSibling,Z.parentNode.appendChild(Z);$&&$.nodeType===3&&$.textContent===" ";)Z._next=$.nextSibling,Z.parentNode.appendChild($),$=$.nextSibling;else Z.parentNode._isSplit?(Z._parent=Z.parentNode,!Z.previousSibling&&Z.firstChild&&(Z.firstChild._isFirst=!0),Z.nextSibling&&Z.nextSibling.textContent===" "&&!Z.nextSibling.nextSibling&&F.push(Z.nextSibling),Z._next=Z.nextSibling&&Z.nextSibling._isFirst?null:Z.nextSibling,Z.parentNode.removeChild(Z),z.splice(N--,1),X--):ue||(Y=!Z.nextSibling&&m1(Z.parentNode,e,v),Z.parentNode._parent&&Z.parentNode._parent.appendChild(Z),Y&&Z.parentNode.appendChild(mc.createTextNode(" ")),w==="span"&&(Z.style.display="inline"),_.push(Z));else Z.parentNode._isSplit&&!Z._isSplit&&Z.innerHTML!==""?x.push(Z):M&&!Z._isSplit&&(w==="span"&&(Z.style.display="inline"),_.push(Z))}for(N=F.length;--N>-1;)F[N].parentNode.removeChild(F[N]);if(A){for(b&&(le=mc.createElement(w),e.appendChild(le),ye=le.offsetWidth+"px",Y=le.offsetParent===e?0:e.offsetLeft,e.removeChild(le)),ie=e.style.cssText,e.style.cssText="display:none;";e.firstChild;)e.removeChild(e.firstChild);for(Ue=v===" "&&(!b||!C&&!M),N=0;N<A.length;N++){for(me=A[N],le=mc.createElement(w),le.style.cssText="display:block;text-align:"+g+";position:"+(b?"absolute;":"relative;"),R&&(le.className=R+(L?N+1:"")),y.push(le),X=me.length,$=0;$<X;$++)me[$].nodeName!=="BR"&&(Z=me[$],le.appendChild(Z),Ue&&Z._wordEnd&&le.appendChild(mc.createTextNode(" ")),b&&($===0&&(le.style.top=Z._y+"px",le.style.left=c+Y+"px"),Z.style.top="0px",Y&&(Z.style.left=Z._x-Y+"px")));X===0?le.innerHTML="&nbsp;":!C&&!M&&(Rz(le),kR(le," "," ")),b&&(le.style.width=ye,le.style.height=Z._h+"px"),e.appendChild(le)}e.style.cssText=ie}b&&(a>e.clientHeight&&(e.style.height=a-f+"px",e.clientHeight<a&&(e.style.height=a+h+"px")),o>e.clientWidth&&(e.style.width=o-p+"px",e.clientWidth<o&&(e.style.width=o+d+"px"))),H&&(W?e.style.display=W:e.style.removeProperty("display")),R0(n,_),C&&R0(r,x),R0(s,y)},Iz=function(e,t,n,r){var s=t.tag?t.tag:t.span?"span":"div",o=t.type||t.split||"chars,words,lines",a=~o.indexOf("chars"),l=Rb(t),c=t.wordDelimiter||" ",u=function(b){return b===c||b===Az&&c===" "},h=c!==" "?"":l?"&#173; ":" ",d="</"+s+">",f=1,p=t.specialChars?typeof t.specialChars=="function"?t.specialChars:Cz:null,m,g,_,x,y,v,w,T,A=mc.createElement("div"),C=e.parentNode;for(C.insertBefore(A,e),A.textContent=e.nodeValue,C.removeChild(e),e=A,m=vb(e),w=m.indexOf("<")!==-1,t.reduceWhiteSpace!==!1&&(m=m.replace(Tz," ").replace(Ez,"")),w&&(m=m.split("<").join("{{LT}}")),y=m.length,g=(m.charAt(0)===" "?h:"")+n(),_=0;_<y;_++)if(v=m.charAt(_),p&&(T=p(m.substr(_),t.specialChars)))v=m.substr(_,T||1),g+=a&&v!==" "?r()+v+"</"+s+">":v,_+=T-1;else if(u(v)&&!u(m.charAt(_-1))&&_){for(g+=f?d:"",f=0;u(m.charAt(_+1));)g+=h,_++;_===y-1?g+=h:m.charAt(_+1)!==")"&&(g+=h+n(),f=1)}else v==="{"&&m.substr(_,6)==="{{LT}}"?(g+=a?r()+"{{LT}}</"+s+">":"{{LT}}",_+=5):v.charCodeAt(0)>=55296&&v.charCodeAt(0)<=56319||m.charCodeAt(_+1)>=65024&&m.charCodeAt(_+1)<=65039?(x=((m.substr(_,12).split(GD)||[])[1]||"").length||2,g+=a&&v!==" "?r()+m.substr(_,x)+"</"+s+">":m.substr(_,x),_+=x-1):g+=a&&v!==" "?r()+v+"</"+s+">":v;e.outerHTML=g+(f?d:""),w&&kR(C,"{{LT}}","<")},Lz=function i(e,t,n,r){var s=jg(e.childNodes),o=s.length,a=Rb(t),l,c;if(e.nodeType!==3||o>1){for(t.absolute=!1,l=0;l<o;l++)c=s[l],c._next=c._isFirst=c._parent=c._wordEnd=null,(c.nodeType!==3||/\S+/.test(c.nodeValue))&&(a&&c.nodeType!==3&&UR(c).display==="inline"&&(c.style.display="inline-block",c.style.position="relative"),c._isSplit=!0,i(c,t,n,r));t.absolute=a,e._isSplit=!0;return}Iz(e,t,n,r)},Kg=function(){function i(t,n){FR||NR(),this.elements=jg(t),this.chars=[],this.words=[],this.lines=[],this._originals=[],this.vars=n||{},OR(this),this.split(n)}var e=i.prototype;return e.split=function(n){this.isSplit&&this.revert(),this.vars=n=n||this.vars,this._originals.length=this.chars.length=this.words.length=this.lines.length=0;for(var r=this.elements.length,s=n.tag?n.tag:n.span?"span":"div",o=p1(n.wordsClass,s),a=p1(n.charsClass,s),l,c,u;--r>-1;)u=this.elements[r],this._originals[r]={html:u.innerHTML,style:u.getAttribute("style")},l=u.clientHeight,c=u.clientWidth,Lz(u,n,o,a),Pz(u,n,this.chars,this.words,this.lines,c,l);return this.chars.reverse(),this.words.reverse(),this.lines.reverse(),this.isSplit=!0,this},e.revert=function(){var n=this._originals;if(!n)throw"revert() call wasn't scoped properly.";return this.elements.forEach(function(r,s){r.innerHTML=n[s].html,r.setAttribute("style",n[s].style)}),this.chars=[],this.words=[],this.lines=[],this.isSplit=!1,this},i.create=function(n,r){return new i(n,r)},i}();Kg.version="3.12.5";Kg.register=NR;Vn.registerPlugin(sn);Vn.registerPlugin(Yh);Vn.registerPlugin(yt);Vn.registerPlugin(lu);Vn.registerPlugin(Us);Vn.registerPlugin(_l);Vn.registerPlugin(Yg);Vn.registerPlugin(Kg);const Fz=gs(i=>{i.vueApp.use(Vn),i.provide("gsap",Vn),i.provide("Observer",sn),i.provide("ScrollTrigger",yt),i.provide("Draggable",lu),i.provide("Flip",Us),i.provide("ScrollSmoother",_l),i.provide("InertiaPlugin",Yg),i.provide("SplitText",Kg)}),Oz=[_N,vN,wB,MB,EB,TB,AB,CB,DB,Fz],Zg=(i,e)=>{const t=i.__vccOpts||i;for(const[n,r]of e)t[n]=r;return t},Nz=i=>(Dg("data-v-986f0136"),i=i(),Rg(),i),Uz={class:"font-saf-m text-xxs ds:text-xs flex items-center"},kz=["href","data-url"],Bz=Nz(()=>Qt("span",{class:"w-[1.6rem] h-[1px] -rotate-45 bg-border"},null,-1)),zz=["href","data-url"],Hz={__name:"Nav",setup(i){const e=bm(),t=n=>{const r=n.srcElement.dataset.url;e.setUrl(r),Vx({path:r})};return(n,r)=>{const s=bC;return Gn(),ta("nav",Uz,[Ft(s,{to:"/projects",custom:""},{default:ul(({href:o,isActive:a,isExactActive:l})=>[Qt("a",{href:o,"data-url":o,class:Ys(["nav-item | relative mr-5 ds:mr-10 secondary",[a&&"nuxt-link-active",l&&"nuxt-link-exact-active"]]),onClick:Fy(t,["prevent"])}," Projects ",10,kz)]),_:1}),Bz,Ft(s,{to:"/about",custom:""},{default:ul(({href:o,isActive:a,isExactActive:l})=>[Qt("a",{href:o,"data-url":o,class:Ys(["nav-item | relative ml-5 ds:ml-10 secondary",[a&&"nuxt-link-active",l&&"nuxt-link-exact-active"]]),onClick:Fy(t,["prevent"])}," About ",10,zz)]),_:1})])}}},Vz=Zg(Hz,[["__scopeId","data-v-986f0136"]]),Pb=zg("colors",{state:()=>({color:{color1:[225,98,0],color2:[185,27,76],colorBg:"#DF97AD"},isDark:!1}),getters:{getColor1(i){return i.color.color1},getColor2(i){return i.color.color2}},actions:{setColor(i,e,t){this.color.color1=i,this.color.color2=e,this.color.colorBg=t},toggleTheme(){this.isDark=!this.isDark}}}),BR=zg("sounds",{state:()=>({isEnable:!1}),actions:{toggleSounds(){this.isEnable=!0}}});let g1,Mu;const P0={},Hd=new Map;function Gz(){typeof window<"u"&&(Mu||(Mu=new(window.AudioContext||window.webkitAudioContext),g1=BR()));async function i(s){if(!P0[s]){const a=await(await fetch(s)).arrayBuffer();P0[s]=await Mu.decodeAudioData(a)}return P0[s]}async function e(s){if(!("ontouchstart"in window)){const o=Mu.createBufferSource();o.buffer=s,o.connect(Mu.destination),o.start(0)}}function t(s,o,a){const l=async()=>{if(!g1.isEnable)return;const c=await i(a);e(c)};s.addEventListener(o,l),Hd.has(s)||Hd.set(s,{}),Hd.get(s)[o]=l}function n(s,o){const a=Hd.get(s);a&&a[o]&&(s.removeEventListener(o,a[o]),delete a[o])}async function r(s){const o=await i(s);e(o)}return{setupSoundInteraction:t,playSoundDirectly:r,removeSetupSoundInteraction:n}}const Wz="/assets/sounds/tap_03.wav",E7="/assets/sounds/tap_03.wav",T7="/assets/sounds/select.wav",Xz="/assets/sounds/notification.wav",$z="/assets/sounds/swipe_01.wav",A7="/assets/sounds/toggle_on.wav",qz=i=>(Dg("data-v-28c71058"),i=i(),Rg(),i),Yz={class:"ds:col-start-1 ds:col-end-4 flex items-center"},jz=["href","data-url"],Kz=qz(()=>Qt("svg",{width:"37",height:"12",viewBox:"0 0 37 12",fill:"none",class:"primary pointer-events-none w-[3.4rem] ds:w-[4rem] h-auto"},[Qt("path",{d:"M0 11.1093V0.20929H6.8125V2.07786H2.02026V4.943H6.28003V6.796H2.02026V11.1093H0Z",class:"f-logo fill-current"}),Qt("path",{d:"M28.7998 11.1093V0.20929H32.8234C34.8726 0.20929 36.2936 1.70415 36.2936 3.71286C36.2936 5.64372 34.8576 7.232 32.8234 7.232H30.7293V11.1093H28.7998ZM30.7293 5.36343H32.7037C33.6461 5.36343 34.3341 4.66272 34.3341 3.71286C34.3341 2.74743 33.6461 2.06229 32.7037 2.06229H30.7293V5.36343Z",class:"p-logo fill-current"}),Qt("line",{x1:"23.6944",y1:"0.562843",x2:"12.7944",y2:"11.4628",class:"line-logo stroke-border"})],-1)),Zz=[Kz],Jz={class:"secondary text-xs font-saf-r hidden ds:block ml-80 uppercase"},Qz={class:"ds:col-start-11 ds:col-end-[13] flex items-center ds:items-center justify-between"},eH={__name:"Header",setup(i){const e=Pb(),t=bm(),n=au(),{setupSoundInteraction:r,playSoundDirectly:s}=Gz(),{$gsap:o}=Vt(),a=nt(""),l=nt(null),c=nt(null),u=nt(null),h=nt(null),d=()=>{const m=new Intl.DateTimeFormat("en-US",{hour:"2-digit",minute:"2-digit",hour12:!0,timeZone:"Europe/Rome"}).format(new Date),[g,_]=m.split(":");a.value=`${g}:${_.padStart(2,"0")}`},f=()=>{document.documentElement.classList.toggle("dark"),e.toggleTheme(),s($z)},p=m=>{const g=m.srcElement.dataset.url;t.setUrl(g),Vx({path:g})};return Xr(()=>{d(),setInterval(d,1e3),o.utils.toArray([c.value.$el.querySelectorAll("a"),h.value]).forEach(g=>{r(g,"mouseenter",Wz)}),r(u.value,"mouseenter",Xz)}),(m,g)=>{const _=bC,x=Vz;return Gn(),ta("header",{ref_key:"header",ref:l,class:Ys(["flex max-ds:justify-between site-grid px-20 mt-20 | ds:px-80 ds:mt-0 ds:pt-40 fixed top-0 left-0 w-full z-[2] opacity-[var(--opacity)] items-center | not-hover",Dt(n).path==="/"&&"ds:pb-100"])},[Qt("div",Yz,[Ft(_,{to:"/",custom:""},{default:ul(({href:y,isActive:v,isExactActive:w})=>[Qt("a",{ref_key:"logoHome",ref:u,href:y,"data-url":y,"aria-label":"Home page",class:Ys(["home-logo block",[v&&"nuxt-link-active",w&&"nuxt-link-exact-active"]]),onClick:Fy(p,["prevent"])},Zz,10,jz)]),_:1}),Qt("p",Jz,"Udine, "+IT(Dt(a))+" CEST",1)]),Qt("div",Qz,[Ft(x,{ref_key:"navigation",ref:c,class:"uppercase ds:mr-80"},null,512),Qt("button",{ref_key:"themeSwitch",ref:h,class:"max-ds:ml-20 rounded-full w-20 h-20 bg-[var(--color-switch)]","aria-label":"Change Color Theme",onClick:f},null,512)])],2)}}},tH=Zg(eH,[["__scopeId","data-v-28c71058"]]),nH=zg("preloader",{state:()=>({isLoaded:!0}),actions:{togglePreloader(){this.isLoaded=!this.isLoaded}}});function iH(i){return i&&i.__esModule&&Object.prototype.hasOwnProperty.call(i,"default")?i.default:i}var zR={exports:{}};(function(i){(function(){function e(m,g){document.addEventListener?m.addEventListener("scroll",g,!1):m.attachEvent("scroll",g)}function t(m){document.body?m():document.addEventListener?document.addEventListener("DOMContentLoaded",function g(){document.removeEventListener("DOMContentLoaded",g),m()}):document.attachEvent("onreadystatechange",function g(){(document.readyState=="interactive"||document.readyState=="complete")&&(document.detachEvent("onreadystatechange",g),m())})}function n(m){this.g=document.createElement("div"),this.g.setAttribute("aria-hidden","true"),this.g.appendChild(document.createTextNode(m)),this.h=document.createElement("span"),this.i=document.createElement("span"),this.m=document.createElement("span"),this.j=document.createElement("span"),this.l=-1,this.h.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;",this.i.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;",this.j.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;",this.m.style.cssText="display:inline-block;width:200%;height:200%;font-size:16px;max-width:none;",this.h.appendChild(this.m),this.i.appendChild(this.j),this.g.appendChild(this.h),this.g.appendChild(this.i)}function r(m,g){m.g.style.cssText="max-width:none;min-width:20px;min-height:20px;display:inline-block;overflow:hidden;position:absolute;width:auto;margin:0;padding:0;top:-999px;white-space:nowrap;font-synthesis:none;font:"+g+";"}function s(m){var g=m.g.offsetWidth,_=g+100;return m.j.style.width=_+"px",m.i.scrollLeft=_,m.h.scrollLeft=m.h.scrollWidth+100,m.l!==g?(m.l=g,!0):!1}function o(m,g){function _(){var y=x;s(y)&&y.g.parentNode!==null&&g(y.l)}var x=m;e(m.h,_),e(m.i,_),s(m)}function a(m,g,_){g=g||{},_=_||window,this.family=m,this.style=g.style||"normal",this.weight=g.weight||"normal",this.stretch=g.stretch||"normal",this.context=_}var l=null,c=null,u=null,h=null;function d(m){return c===null&&(f(m)&&/Apple/.test(window.navigator.vendor)?(m=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))(?:\.([0-9]+))/.exec(window.navigator.userAgent),c=!!m&&603>parseInt(m[1],10)):c=!1),c}function f(m){return h===null&&(h=!!m.document.fonts),h}function p(m,g){var _=m.style,x=m.weight;if(u===null){var y=document.createElement("div");try{y.style.font="condensed 100px sans-serif"}catch{}u=y.style.font!==""}return[_,x,u?m.stretch:"","100px",g].join(" ")}a.prototype.load=function(m,g){var _=this,x=m||"BESbswy",y=0,v=g||3e3,w=new Date().getTime();return new Promise(function(T,A){if(f(_.context)&&!d(_.context)){var C=new Promise(function(b,R){function L(){new Date().getTime()-w>=v?R(Error(""+v+"ms timeout exceeded")):_.context.document.fonts.load(p(_,'"'+_.family+'"'),x).then(function(F){1<=F.length?b():setTimeout(L,25)},R)}L()}),M=new Promise(function(b,R){y=setTimeout(function(){R(Error(""+v+"ms timeout exceeded"))},v)});Promise.race([M,C]).then(function(){clearTimeout(y),T(_)},A)}else t(function(){function b(){var me;(me=W!=-1&&N!=-1||W!=-1&&$!=-1||N!=-1&&$!=-1)&&((me=W!=N&&W!=$&&N!=$)||(l===null&&(me=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent),l=!!me&&(536>parseInt(me[1],10)||parseInt(me[1],10)===536&&11>=parseInt(me[2],10))),me=l&&(W==X&&N==X&&$==X||W==Z&&N==Z&&$==Z||W==z&&N==z&&$==z)),me=!me),me&&(ue.parentNode!==null&&ue.parentNode.removeChild(ue),clearTimeout(y),T(_))}function R(){if(new Date().getTime()-w>=v)ue.parentNode!==null&&ue.parentNode.removeChild(ue),A(Error(""+v+"ms timeout exceeded"));else{var me=_.context.document.hidden;(me===!0||me===void 0)&&(W=L.g.offsetWidth,N=F.g.offsetWidth,$=H.g.offsetWidth,b()),y=setTimeout(R,50)}}var L=new n(x),F=new n(x),H=new n(x),W=-1,N=-1,$=-1,X=-1,Z=-1,z=-1,ue=document.createElement("div");ue.dir="ltr",r(L,p(_,"sans-serif")),r(F,p(_,"serif")),r(H,p(_,"monospace")),ue.appendChild(L.g),ue.appendChild(F.g),ue.appendChild(H.g),_.context.document.body.appendChild(ue),X=L.g.offsetWidth,Z=F.g.offsetWidth,z=H.g.offsetWidth,R(),o(L,function(me){W=me,b()}),r(L,p(_,'"'+_.family+'",sans-serif')),o(F,function(me){N=me,b()}),r(F,p(_,'"'+_.family+'",serif')),o(H,function(me){$=me,b()}),r(H,p(_,'"'+_.family+'",monospace'))})})},i.exports=a})()})(zR);var rH=zR.exports;const _1=iH(rH),sH="<span class='block'>Ciao, I’m Fede! A freelance </span><span class='block'>creative developer and</span><span class='block'>co-founder at Overpx.</span>",oH="/assets/images/home",aH=[{title:"airbag studio",year:2023,agency:"Overpx",awards:"FWA of the day",description:"Studio focusing on designing and developing advanced and intuitive mobile ecosystems.",image:"01-project-airbag.jpg",color1:"255.0,98.0,0.0",color2:"185.0,27.0,76.0",link:"https://www.airbagstudio.it/en",altImage:"Airbag Studio Project",featured:!0,slug:"airbag-studio"},{title:"darko bratina",year:2020,agency:"Overpx",awards:"FWA of the day",description:"Darko Bratina as Sociologist, Cinephile and Politician. A journey discovering his life.",image:"02-project-darko-2.jpg",color1:"155.,155.,155.",color2:"36.0,52.0,78.0",link:"https://darkobratina.net/en/",altImage:"Darko Bratina Project",featured:!0,slug:"darko-bratina"},{title:"things agency",year:2023,agency:"Things",awards:"CSSDA of the day",description:"European design & innovation agency pioneering in IoT experience for humans.",image:"03-project-things.jpg",color1:"178.0,207.0,255.0",color2:"2.0,141.0,234.0",link:"https://things.is/",altImage:"Things Project",featured:!0},{title:"unisve crafts",year:2021,agency:"Overpx",awards:"CSSDA of the day",description:"Founded in 2001 to support and keep alive many traditional Venetian artisan techniques.",image:"04-project-unisve-2.jpg",color1:"236.0,183.0,150.0",color2:"0.0,50.0,71.0",link:"https://unisve.it/en/",altImage:"Unisve Project",featured:!0},{title:"abbracci musicali",year:2021,agency:"AQuest",awards:"CSSDA of the day",description:"An interactive website supporting future mothers through their pregnancy journey.",image:"05-project-abbracci-musicali-3.jpg",color1:"208.0,180.0,72.0",color2:"195.0,129.0,113.0",link:"https://abbraccimusicali2021.overpx.com/",altImage:"AbbracciMusicali Project",featured:!0},{title:"CME Stem",year:2021,agency:"Overpx",awards:"CSSDA of the day",image:"06-project-cme.jpg",color1:"0.15,0.7,1",color2:"0.0,50.0,71.0",link:"https://unisve.it/en/",altImage:"Unisve Project",featured:!1},{title:"Raccagni Group",year:2020,agency:"AQuest",awards:"CSSDA of the day",image:"07-project-raccagni.jpg",color1:"0.7,0.1,0.6",color2:"2.0,141.0,234.0",link:"https://things.is/",altImage:"Raccagni Project",featured:!1},{title:"Post Op",year:2023,agency:"Overpx",awards:"FWA of the day",image:"08-project-postop.jpg",color1:"0.5,0.1,0.5",color2:"36.0,52.0,78.0",link:"https://postop.ai/",altImage:"Post Op Project",featured:!1}],lH={fede:sH,imagesPath:oH,projects:aH},Ib=i=>(Dg("data-v-0ff3f988"),i=i(),Rg(),i),cH={ref:"preloader",class:"fixed left-0 top-0 w-full h-full pointer-events-none"},uH={class:"w-[14rem] h-[14rem] ds:w-[28rem] ds:h-[28rem] absolute z-[10] left-20 bottom-20 ds:left-80 ds:bottom-40 flex p-[1.2rem] ds:p-30 text-center uppercase justify-center items-center"},fH=Ib(()=>Qt("circle",{cx:"140",cy:"140",r:"139.5",stroke:"var(--color-border)",class:"circle__bg"},null,-1)),hH=Ib(()=>Qt("circle",{cx:"140",cy:"140",r:"139.5",stroke:"var(--color-primary)",class:"circle__progress"},null,-1)),dH=[fH,hH],pH={class:"w-[13rem] text-right tracking-tighter"},mH=Ib(()=>Qt("span",null,"%",-1)),gH=["innerHTML"],_H="safiro-medium",yH="safiro-regular-i",vH=880,xH={__name:"Preloader",setup(i){const e=au(),t=nH(),n=Pb(),{toggleTransitionComplete:r}=vC(),{$gsap:s}=Vt(),o=nt(null),a=nt(null),l=nt(0),c=nt(0),u=nt(0),h=nt(0),d=e.path==="/"||e.path==="/projects"?200:1e3;function f(x){l.value++,c.value=parseInt(x)}function p(){const x=h.value/100,y=vH*(1-x);s.to(o.value,{"--dashOffset":y,duration:.1,ease:"linear"})}function m(){const x=Math.min(Math.floor(l.value/c.value*100),100);h.value<x&&(h.value++,p(),requestAnimationFrame(m))}function g(){const x=document.querySelectorAll("img.to-load");if(x.length>0&&u.value<x.length){const y=x[u.value];y.complete?(f(x.length),u.value++,setTimeout(g,d)):y.onload=()=>{f(x.length),u.value++,setTimeout(g,d)}}else f(x.length)}const _=Ht(()=>c.value===0?0:h.value);return Mn([l,c],([x,y])=>{if(m(),x===y&&y!==0){const v=e.path==="/"?500:e.path==="/projects"?1e3:1500,w=e.path==="/"?0:e.path==="/projects"?1:1.5,T=s.timeline();e.path!=="/"&&(T.fromTo(document.querySelectorAll("[data-fede-preloader] span"),{yPercent:0,z:0,clipPath:"inset(0% 0 0% 0)"},{yPercent:-100,z:0,clipPath:"inset(0% 0 120% 0)",ease:"power3.out",stagger:.1,duration:1},w),T.to(a.value,{opacity:0,ease:"sine.out",duration:.3},w+.3),e.path==="/about"&&(T.to(o.value,{"--dashOffset":880,duration:1,ease:"power3.inOut"},w),T.to(o.value,{"--dashOffsetBorder":880,duration:1,ease:"power3.inOut"},w+.1))),setTimeout(()=>{t.togglePreloader(),r(!0),e.path!=="/about"&&s.set(o.value,{opacity:0}),e.path==="/"&&s.set(a.value,{opacity:0})},v)}else e.name==="404"&&(document.documentElement.classList.toggle("dark"),n.toggleTheme(),s.fromTo(a.value.querySelector("span:first-child"),{textContent:0},{textContent:100,snap:{textContent:1},duration:1,ease:"power3.inOut",onComplete:()=>{t.togglePreloader(),r(!0)}}),s.fromTo(document.querySelectorAll("[data-fede-preloader] span"),{yPercent:0,z:0,clipPath:"inset(0% 0 0% 0)"},{yPercent:-100,z:0,clipPath:"inset(0% 0 120% 0)",ease:"power3.out",delay:1+.2,stagger:.05,duration:1}),s.to(o.value,{"--dashOffset":880,duration:1,ease:"power3.inOut",delay:1}),s.to(o.value,{"--dashOffsetBorder":880,duration:1,ease:"power3.inOut",delay:1+.2}),s.to(a.value,{opacity:0,ease:"sine.out",delay:1+.3,duration:.3}))}),Xr(()=>{so(()=>{setTimeout(async()=>{await Promise.all([new _1(_H).load(),new _1(yH).load()]),g()},0)})}),(x,y)=>(Gn(),ta("div",cH,[Qt("div",uH,[(Gn(),ta("svg",{ref_key:"circle",ref:o,width:"280",height:"280",viewBox:"0 0 280 280",fill:"none",class:"circle w-full h-full ds:w-[28rem] ds:h-[28rem] absolute left-0 top-0 z-[0]"},dH,512)),Qt("span",{ref_key:"percentage",ref:a,class:"primary font-saf-m text-[4rem] ds:text-[8rem] leading-[0.8]"},[Qt("span",pH,IT(Dt(_)),1),mH],512)]),Qt("p",{"data-fede-preloader":"",class:"secondary max-ds:hidden absolute text-xs leading-6 left-20 bottom-20 ds:left-[37.6rem] ds:bottom-40 ds:text-sm ds:leading-7 uppercase tracking-tighter z-[10] opacity-[var(--opacityFede)]",innerHTML:Dt(lH).fede},null,8,gH)],512))}},bH=Zg(xH,[["__scopeId","data-v-0ff3f988"]]);/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Kh="168",SH={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},wH={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},HR=0,Wv=1,VR=2,MH=3,EH=0,Lb=1,Fb=2,Zr=3,eo=0,bi=1,Nr=2,$s=0,sl=1,Xv=2,$v=3,qv=4,GR=5,Bo=100,WR=101,XR=102,$R=103,qR=104,YR=200,jR=201,KR=202,ZR=203,Hm=204,Vm=205,JR=206,QR=207,eP=208,tP=209,nP=210,iP=211,rP=212,sP=213,oP=214,aP=0,lP=1,cP=2,mh=3,uP=4,fP=5,hP=6,dP=7,Zh=0,pP=1,mP=2,qs=0,gP=1,_P=2,yP=3,Ob=4,vP=5,xP=6,bP=7,Yv="attached",SP="detached",Jg=300,to=301,sa=302,gh=303,_h=304,cu=306,yh=1e3,br=1001,vh=1002,Un=1003,Nb=1004,TH=1004,gc=1005,AH=1005,wn=1006,Nf=1007,CH=1007,as=1008,DH=1008,ms=1009,Ub=1010,kb=1011,Jc=1012,Qg=1013,no=1014,Ci=1015,uu=1016,e_=1017,t_=1018,yl=1020,Bb=35902,zb=1021,Hb=1022,vi=1023,Vb=1024,Gb=1025,ol=1026,vl=1027,n_=1028,Jh=1029,Wb=1030,i_=1031,RH=1032,r_=1033,Uf=33776,kf=33777,Bf=33778,zf=33779,Gm=35840,Wm=35841,Xm=35842,$m=35843,qm=36196,Ym=37492,jm=37496,Km=37808,Zm=37809,Jm=37810,Qm=37811,eg=37812,tg=37813,ng=37814,ig=37815,rg=37816,sg=37817,og=37818,ag=37819,lg=37820,cg=37821,Hf=36492,ug=36494,fg=36495,Xb=36283,hg=36284,dg=36285,pg=36286,wP=2200,MP=2201,EP=2202,xh=2300,mg=2301,Qp=2302,Va=2400,Ga=2401,bh=2402,s_=2500,$b=2501,PH=0,IH=1,LH=2,TP=3200,AP=3201,FH=3202,OH=3203,la=0,CP=1,Is="",ji="srgb",lo="srgb-linear",o_="display-p3",Qh="display-p3-linear",Sh="linear",$t="srgb",wh="rec709",Mh="p3",NH=0,Oa=7680,UH=7681,kH=7682,BH=7683,zH=34055,HH=34056,VH=5386,GH=512,WH=513,XH=514,$H=515,qH=516,YH=517,jH=518,jv=519,DP=512,RP=513,PP=514,qb=515,IP=516,LP=517,FP=518,OP=519,Eh=35044,KH=35048,ZH=35040,JH=35045,QH=35049,e4=35041,t4=35046,n4=35050,i4=35042,r4="100",Kv="300 es",ls=2e3,Th=2001;class _s{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const $n=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let y1=1234567;const al=Math.PI/180,Qc=180/Math.PI;function sr(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return($n[i&255]+$n[i>>8&255]+$n[i>>16&255]+$n[i>>24&255]+"-"+$n[e&255]+$n[e>>8&255]+"-"+$n[e>>16&15|64]+$n[e>>24&255]+"-"+$n[t&63|128]+$n[t>>8&255]+"-"+$n[t>>16&255]+$n[t>>24&255]+$n[n&255]+$n[n>>8&255]+$n[n>>16&255]+$n[n>>24&255]).toLowerCase()}function cn(i,e,t){return Math.max(e,Math.min(t,i))}function Yb(i,e){return(i%e+e)%e}function s4(i,e,t,n,r){return n+(i-e)*(r-n)/(t-e)}function o4(i,e,t){return i!==e?(t-i)/(e-i):0}function Vf(i,e,t){return(1-t)*i+t*e}function a4(i,e,t,n){return Vf(i,e,1-Math.exp(-t*n))}function l4(i,e=1){return e-Math.abs(Yb(i,e*2)-e)}function c4(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function u4(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function f4(i,e){return i+Math.floor(Math.random()*(e-i+1))}function h4(i,e){return i+Math.random()*(e-i)}function d4(i){return i*(.5-Math.random())}function p4(i){i!==void 0&&(y1=i);let e=y1+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function m4(i){return i*al}function g4(i){return i*Qc}function _4(i){return(i&i-1)===0&&i!==0}function y4(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function v4(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function x4(i,e,t,n,r){const s=Math.cos,o=Math.sin,a=s(t/2),l=o(t/2),c=s((e+n)/2),u=o((e+n)/2),h=s((e-n)/2),d=o((e-n)/2),f=s((n-e)/2),p=o((n-e)/2);switch(r){case"XYX":i.set(a*u,l*h,l*d,a*c);break;case"YZY":i.set(l*d,a*u,l*h,a*c);break;case"ZXZ":i.set(l*h,l*d,a*u,a*c);break;case"XZX":i.set(a*u,l*p,l*f,a*c);break;case"YXY":i.set(l*f,a*u,l*p,a*c);break;case"ZYZ":i.set(l*p,l*f,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function yi(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function at(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const b4={DEG2RAD:al,RAD2DEG:Qc,generateUUID:sr,clamp:cn,euclideanModulo:Yb,mapLinear:s4,inverseLerp:o4,lerp:Vf,damp:a4,pingpong:l4,smoothstep:c4,smootherstep:u4,randInt:f4,randFloat:h4,randFloatSpread:d4,seededRandom:p4,degToRad:m4,radToDeg:g4,isPowerOfTwo:_4,ceilPowerOfTwo:y4,floorPowerOfTwo:v4,setQuaternionFromProperEuler:x4,normalize:at,denormalize:yi};class Te{constructor(e=0,t=0){Te.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(cn(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*r+e.x,this.y=s*r+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ot{constructor(e,t,n,r,s,o,a,l,c){ot.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,o,a,l,c)}set(e,t,n,r,s,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=t,u[4]=s,u[5]=l,u[6]=n,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],u=n[4],h=n[7],d=n[2],f=n[5],p=n[8],m=r[0],g=r[3],_=r[6],x=r[1],y=r[4],v=r[7],w=r[2],T=r[5],A=r[8];return s[0]=o*m+a*x+l*w,s[3]=o*g+a*y+l*T,s[6]=o*_+a*v+l*A,s[1]=c*m+u*x+h*w,s[4]=c*g+u*y+h*T,s[7]=c*_+u*v+h*A,s[2]=d*m+f*x+p*w,s[5]=d*g+f*y+p*T,s[8]=d*_+f*v+p*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-n*s*u+n*a*l+r*s*c-r*o*l}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=u*o-a*c,d=a*l-u*s,f=c*s-o*l,p=t*h+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const m=1/p;return e[0]=h*m,e[1]=(r*c-u*n)*m,e[2]=(a*n-r*o)*m,e[3]=d*m,e[4]=(u*t-r*l)*m,e[5]=(r*s-a*t)*m,e[6]=f*m,e[7]=(n*l-c*t)*m,e[8]=(o*t-n*s)*m,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(I0.makeScale(e,t)),this}rotate(e){return this.premultiply(I0.makeRotation(-e)),this}translate(e,t){return this.premultiply(I0.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const I0=new ot;function NP(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}const S4={Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array};function _c(i,e){return new S4[i](e)}function Ah(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function UP(){const i=Ah("canvas");return i.style.display="block",i}const v1={};function Oc(i){i in v1||(v1[i]=!0,console.warn(i))}function w4(i,e,t){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}const x1=new ot().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),b1=new ot().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Eu={[lo]:{transfer:Sh,primaries:wh,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i,fromReference:i=>i},[ji]:{transfer:$t,primaries:wh,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[Qh]:{transfer:Sh,primaries:Mh,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.applyMatrix3(b1),fromReference:i=>i.applyMatrix3(x1)},[o_]:{transfer:$t,primaries:Mh,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.convertSRGBToLinear().applyMatrix3(b1),fromReference:i=>i.applyMatrix3(x1).convertLinearToSRGB()}},M4=new Set([lo,Qh]),Pt={enabled:!0,_workingColorSpace:lo,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!M4.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,e,t){if(this.enabled===!1||e===t||!e||!t)return i;const n=Eu[e].toReference,r=Eu[t].fromReference;return r(n(i))},fromWorkingColorSpace:function(i,e){return this.convert(i,this._workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this._workingColorSpace)},getPrimaries:function(i){return Eu[i].primaries},getTransfer:function(i){return i===Is?Sh:Eu[i].transfer},getLuminanceCoefficients:function(i,e=this._workingColorSpace){return i.fromArray(Eu[e].luminanceCoefficients)}};function Nc(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function L0(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Ol;class kP{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Ol===void 0&&(Ol=Ah("canvas")),Ol.width=e.width,Ol.height=e.height;const n=Ol.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Ol}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Ah("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Nc(s[o]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Nc(t[n]/255)*255):t[n]=Nc(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let E4=0;class Wa{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:E4++}),this.uuid=sr(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(F0(r[o].image)):s.push(F0(r[o]))}else s=F0(r);n.url=s}return t||(e.images[this.uuid]=n),n}}function F0(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?kP.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let T4=0;class fn extends _s{constructor(e=fn.DEFAULT_IMAGE,t=fn.DEFAULT_MAPPING,n=br,r=br,s=wn,o=as,a=vi,l=ms,c=fn.DEFAULT_ANISOTROPY,u=Is){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:T4++}),this.uuid=sr(),this.name="",this.source=new Wa(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Te(0,0),this.repeat=new Te(1,1),this.center=new Te(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ot,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Jg)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case yh:e.x=e.x-Math.floor(e.x);break;case br:e.x=e.x<0?0:1;break;case vh:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case yh:e.y=e.y-Math.floor(e.y);break;case br:e.y=e.y<0?0:1;break;case vh:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}fn.DEFAULT_IMAGE=null;fn.DEFAULT_MAPPING=Jg;fn.DEFAULT_ANISOTROPY=1;class Nt{constructor(e=0,t=0,n=0,r=1){Nt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*r+o[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s;const l=e.elements,c=l[0],u=l[4],h=l[8],d=l[1],f=l[5],p=l[9],m=l[2],g=l[6],_=l[10];if(Math.abs(u-d)<.01&&Math.abs(h-m)<.01&&Math.abs(p-g)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+m)<.1&&Math.abs(p+g)<.1&&Math.abs(c+f+_-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const y=(c+1)/2,v=(f+1)/2,w=(_+1)/2,T=(u+d)/4,A=(h+m)/4,C=(p+g)/4;return y>v&&y>w?y<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(y),r=T/n,s=A/n):v>w?v<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(v),n=T/r,s=C/r):w<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(w),n=A/s,r=C/s),this.set(n,r,s,t),this}let x=Math.sqrt((g-p)*(g-p)+(h-m)*(h-m)+(d-u)*(d-u));return Math.abs(x)<.001&&(x=1),this.x=(g-p)/x,this.y=(h-m)/x,this.z=(d-u)/x,this.w=Math.acos((c+f+_-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class BP extends _s{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Nt(0,0,e,t),this.scissorTest=!1,this.viewport=new Nt(0,0,e,t);const r={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:wn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const s=new fn(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,r=e.textures.length;n<r;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Wa(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Gr extends BP{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class a_ extends fn{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Un,this.minFilter=Un,this.wrapR=br,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class A4 extends Gr{constructor(e=1,t=1,n=1,r={}){super(e,t,r),this.isWebGLArrayRenderTarget=!0,this.depth=n,this.texture=new a_(null,e,t,n),this.texture.isRenderTargetTexture=!0}}class jb extends fn{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Un,this.minFilter=Un,this.wrapR=br,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class C4 extends Gr{constructor(e=1,t=1,n=1,r={}){super(e,t,r),this.isWebGL3DRenderTarget=!0,this.depth=n,this.texture=new jb(null,e,t,n),this.texture.isRenderTargetTexture=!0}}class Fi{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,o,a){let l=n[r+0],c=n[r+1],u=n[r+2],h=n[r+3];const d=s[o+0],f=s[o+1],p=s[o+2],m=s[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h;return}if(a===1){e[t+0]=d,e[t+1]=f,e[t+2]=p,e[t+3]=m;return}if(h!==m||l!==d||c!==f||u!==p){let g=1-a;const _=l*d+c*f+u*p+h*m,x=_>=0?1:-1,y=1-_*_;if(y>Number.EPSILON){const w=Math.sqrt(y),T=Math.atan2(w,_*x);g=Math.sin(g*T)/w,a=Math.sin(a*T)/w}const v=a*x;if(l=l*g+d*v,c=c*g+f*v,u=u*g+p*v,h=h*g+m*v,g===1-a){const w=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=w,c*=w,u*=w,h*=w}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,r,s,o){const a=n[r],l=n[r+1],c=n[r+2],u=n[r+3],h=s[o],d=s[o+1],f=s[o+2],p=s[o+3];return e[t]=a*p+u*h+l*f-c*d,e[t+1]=l*p+u*d+c*h-a*f,e[t+2]=c*p+u*f+a*d-l*h,e[t+3]=u*p-a*h-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),u=a(r/2),h=a(s/2),d=l(n/2),f=l(r/2),p=l(s/2);switch(o){case"XYZ":this._x=d*u*h+c*f*p,this._y=c*f*h-d*u*p,this._z=c*u*p+d*f*h,this._w=c*u*h-d*f*p;break;case"YXZ":this._x=d*u*h+c*f*p,this._y=c*f*h-d*u*p,this._z=c*u*p-d*f*h,this._w=c*u*h+d*f*p;break;case"ZXY":this._x=d*u*h-c*f*p,this._y=c*f*h+d*u*p,this._z=c*u*p+d*f*h,this._w=c*u*h-d*f*p;break;case"ZYX":this._x=d*u*h-c*f*p,this._y=c*f*h+d*u*p,this._z=c*u*p-d*f*h,this._w=c*u*h+d*f*p;break;case"YZX":this._x=d*u*h+c*f*p,this._y=c*f*h+d*u*p,this._z=c*u*p-d*f*h,this._w=c*u*h-d*f*p;break;case"XZY":this._x=d*u*h-c*f*p,this._y=c*f*h-d*u*p,this._z=c*u*p+d*f*h,this._w=c*u*h+d*f*p;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],h=t[10],d=n+a+h;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(u-l)*f,this._y=(s-c)*f,this._z=(o-r)*f}else if(n>a&&n>h){const f=2*Math.sqrt(1+n-a-h);this._w=(u-l)/f,this._x=.25*f,this._y=(r+o)/f,this._z=(s+c)/f}else if(a>h){const f=2*Math.sqrt(1+a-n-h);this._w=(s-c)/f,this._x=(r+o)/f,this._y=.25*f,this._z=(l+u)/f}else{const f=2*Math.sqrt(1+h-n-a);this._w=(o-r)/f,this._x=(s+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(cn(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+o*a+r*c-s*l,this._y=r*u+o*l+s*a-n*c,this._z=s*u+o*c+n*l-r*a,this._w=o*u-n*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+n*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const f=1-t;return this._w=f*o+t*this._w,this._x=f*n+t*this._x,this._y=f*r+t*this._y,this._z=f*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),h=Math.sin((1-t)*u)/c,d=Math.sin(t*u)/c;return this._w=o*h+this._w*d,this._x=n*h+this._x*d,this._y=r*h+this._y*d,this._z=s*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class B{constructor(e=0,t=0,n=0){B.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(S1.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(S1.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*r-a*n),u=2*(a*t-s*r),h=2*(s*n-o*t);return this.x=t+l*c+o*h-a*u,this.y=n+l*u+a*c-s*h,this.z=r+l*h+s*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=r*l-s*a,this.y=s*o-n*l,this.z=n*a-r*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return O0.copy(this).projectOnVector(e),this.sub(O0)}reflect(e){return this.sub(O0.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(cn(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const O0=new B,S1=new Fi;class Si{constructor(e=new B(1/0,1/0,1/0),t=new B(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Tr.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Tr.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Tr.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Tr):Tr.fromBufferAttribute(s,o),Tr.applyMatrix4(e.matrixWorld),this.expandByPoint(Tr);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Vd.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Vd.copy(n.boundingBox)),Vd.applyMatrix4(e.matrixWorld),this.union(Vd)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Tr),Tr.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Tu),Gd.subVectors(this.max,Tu),Nl.subVectors(e.a,Tu),Ul.subVectors(e.b,Tu),kl.subVectors(e.c,Tu),xo.subVectors(Ul,Nl),bo.subVectors(kl,Ul),ya.subVectors(Nl,kl);let t=[0,-xo.z,xo.y,0,-bo.z,bo.y,0,-ya.z,ya.y,xo.z,0,-xo.x,bo.z,0,-bo.x,ya.z,0,-ya.x,-xo.y,xo.x,0,-bo.y,bo.x,0,-ya.y,ya.x,0];return!N0(t,Nl,Ul,kl,Gd)||(t=[1,0,0,0,1,0,0,0,1],!N0(t,Nl,Ul,kl,Gd))?!1:(Wd.crossVectors(xo,bo),t=[Wd.x,Wd.y,Wd.z],N0(t,Nl,Ul,kl,Gd))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Tr).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Tr).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(xs[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),xs[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),xs[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),xs[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),xs[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),xs[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),xs[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),xs[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(xs),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const xs=[new B,new B,new B,new B,new B,new B,new B,new B],Tr=new B,Vd=new Si,Nl=new B,Ul=new B,kl=new B,xo=new B,bo=new B,ya=new B,Tu=new B,Gd=new B,Wd=new B,va=new B;function N0(i,e,t,n,r){for(let s=0,o=i.length-3;s<=o;s+=3){va.fromArray(i,s);const a=r.x*Math.abs(va.x)+r.y*Math.abs(va.y)+r.z*Math.abs(va.z),l=e.dot(va),c=t.dot(va),u=n.dot(va);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const D4=new Si,Au=new B,U0=new B;class ii{constructor(e=new B,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):D4.setFromPoints(e).getCenter(n);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Au.subVectors(e,this.center);const t=Au.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(Au,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(U0.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Au.copy(e.center).add(U0)),this.expandByPoint(Au.copy(e.center).sub(U0))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const bs=new B,k0=new B,Xd=new B,So=new B,B0=new B,$d=new B,z0=new B;class fu{constructor(e=new B,t=new B(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,bs)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=bs.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(bs.copy(this.origin).addScaledVector(this.direction,t),bs.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){k0.copy(e).add(t).multiplyScalar(.5),Xd.copy(t).sub(e).normalize(),So.copy(this.origin).sub(k0);const s=e.distanceTo(t)*.5,o=-this.direction.dot(Xd),a=So.dot(this.direction),l=-So.dot(Xd),c=So.lengthSq(),u=Math.abs(1-o*o);let h,d,f,p;if(u>0)if(h=o*l-a,d=o*a-l,p=s*u,h>=0)if(d>=-p)if(d<=p){const m=1/u;h*=m,d*=m,f=h*(h+o*d+2*a)+d*(o*h+d+2*l)+c}else d=s,h=Math.max(0,-(o*d+a)),f=-h*h+d*(d+2*l)+c;else d=-s,h=Math.max(0,-(o*d+a)),f=-h*h+d*(d+2*l)+c;else d<=-p?(h=Math.max(0,-(-o*s+a)),d=h>0?-s:Math.min(Math.max(-s,-l),s),f=-h*h+d*(d+2*l)+c):d<=p?(h=0,d=Math.min(Math.max(-s,-l),s),f=d*(d+2*l)+c):(h=Math.max(0,-(o*s+a)),d=h>0?s:Math.min(Math.max(-s,-l),s),f=-h*h+d*(d+2*l)+c);else d=o>0?-s:s,h=Math.max(0,-(o*d+a)),f=-h*h+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(k0).addScaledVector(Xd,d),f}intersectSphere(e,t){bs.subVectors(e.center,this.origin);const n=bs.dot(this.direction),r=bs.dot(bs)-n*n,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),u>=0?(s=(e.min.y-d.y)*u,o=(e.max.y-d.y)*u):(s=(e.max.y-d.y)*u,o=(e.min.y-d.y)*u),n>o||s>r||((s>n||isNaN(n))&&(n=s),(o<r||isNaN(r))&&(r=o),h>=0?(a=(e.min.z-d.z)*h,l=(e.max.z-d.z)*h):(a=(e.max.z-d.z)*h,l=(e.min.z-d.z)*h),n>l||a>r)||((a>n||n!==n)&&(n=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,bs)!==null}intersectTriangle(e,t,n,r,s){B0.subVectors(t,e),$d.subVectors(n,e),z0.crossVectors(B0,$d);let o=this.direction.dot(z0),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;So.subVectors(this.origin,e);const l=a*this.direction.dot($d.crossVectors(So,$d));if(l<0)return null;const c=a*this.direction.dot(B0.cross(So));if(c<0||l+c>o)return null;const u=-a*So.dot(z0);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class rt{constructor(e,t,n,r,s,o,a,l,c,u,h,d,f,p,m,g){rt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,o,a,l,c,u,h,d,f,p,m,g)}set(e,t,n,r,s,o,a,l,c,u,h,d,f,p,m,g){const _=this.elements;return _[0]=e,_[4]=t,_[8]=n,_[12]=r,_[1]=s,_[5]=o,_[9]=a,_[13]=l,_[2]=c,_[6]=u,_[10]=h,_[14]=d,_[3]=f,_[7]=p,_[11]=m,_[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new rt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,r=1/Bl.setFromMatrixColumn(e,0).length(),s=1/Bl.setFromMatrixColumn(e,1).length(),o=1/Bl.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,s=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const d=o*u,f=o*h,p=a*u,m=a*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=f+p*c,t[5]=d-m*c,t[9]=-a*l,t[2]=m-d*c,t[6]=p+f*c,t[10]=o*l}else if(e.order==="YXZ"){const d=l*u,f=l*h,p=c*u,m=c*h;t[0]=d+m*a,t[4]=p*a-f,t[8]=o*c,t[1]=o*h,t[5]=o*u,t[9]=-a,t[2]=f*a-p,t[6]=m+d*a,t[10]=o*l}else if(e.order==="ZXY"){const d=l*u,f=l*h,p=c*u,m=c*h;t[0]=d-m*a,t[4]=-o*h,t[8]=p+f*a,t[1]=f+p*a,t[5]=o*u,t[9]=m-d*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const d=o*u,f=o*h,p=a*u,m=a*h;t[0]=l*u,t[4]=p*c-f,t[8]=d*c+m,t[1]=l*h,t[5]=m*c+d,t[9]=f*c-p,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const d=o*l,f=o*c,p=a*l,m=a*c;t[0]=l*u,t[4]=m-d*h,t[8]=p*h+f,t[1]=h,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=f*h+p,t[10]=d-m*h}else if(e.order==="XZY"){const d=o*l,f=o*c,p=a*l,m=a*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=d*h+m,t[5]=o*u,t[9]=f*h-p,t[2]=p*h-f,t[6]=a*u,t[10]=m*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(R4,e,P4)}lookAt(e,t,n){const r=this.elements;return Gi.subVectors(e,t),Gi.lengthSq()===0&&(Gi.z=1),Gi.normalize(),wo.crossVectors(n,Gi),wo.lengthSq()===0&&(Math.abs(n.z)===1?Gi.x+=1e-4:Gi.z+=1e-4,Gi.normalize(),wo.crossVectors(n,Gi)),wo.normalize(),qd.crossVectors(Gi,wo),r[0]=wo.x,r[4]=qd.x,r[8]=Gi.x,r[1]=wo.y,r[5]=qd.y,r[9]=Gi.y,r[2]=wo.z,r[6]=qd.z,r[10]=Gi.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],u=n[1],h=n[5],d=n[9],f=n[13],p=n[2],m=n[6],g=n[10],_=n[14],x=n[3],y=n[7],v=n[11],w=n[15],T=r[0],A=r[4],C=r[8],M=r[12],b=r[1],R=r[5],L=r[9],F=r[13],H=r[2],W=r[6],N=r[10],$=r[14],X=r[3],Z=r[7],z=r[11],ue=r[15];return s[0]=o*T+a*b+l*H+c*X,s[4]=o*A+a*R+l*W+c*Z,s[8]=o*C+a*L+l*N+c*z,s[12]=o*M+a*F+l*$+c*ue,s[1]=u*T+h*b+d*H+f*X,s[5]=u*A+h*R+d*W+f*Z,s[9]=u*C+h*L+d*N+f*z,s[13]=u*M+h*F+d*$+f*ue,s[2]=p*T+m*b+g*H+_*X,s[6]=p*A+m*R+g*W+_*Z,s[10]=p*C+m*L+g*N+_*z,s[14]=p*M+m*F+g*$+_*ue,s[3]=x*T+y*b+v*H+w*X,s[7]=x*A+y*R+v*W+w*Z,s[11]=x*C+y*L+v*N+w*z,s[15]=x*M+y*F+v*$+w*ue,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],h=e[6],d=e[10],f=e[14],p=e[3],m=e[7],g=e[11],_=e[15];return p*(+s*l*h-r*c*h-s*a*d+n*c*d+r*a*f-n*l*f)+m*(+t*l*f-t*c*d+s*o*d-r*o*f+r*c*u-s*l*u)+g*(+t*c*h-t*a*f-s*o*h+n*o*f+s*a*u-n*c*u)+_*(-r*a*u-t*l*h+t*a*d+r*o*h-n*o*d+n*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=e[9],d=e[10],f=e[11],p=e[12],m=e[13],g=e[14],_=e[15],x=h*g*c-m*d*c+m*l*f-a*g*f-h*l*_+a*d*_,y=p*d*c-u*g*c-p*l*f+o*g*f+u*l*_-o*d*_,v=u*m*c-p*h*c+p*a*f-o*m*f-u*a*_+o*h*_,w=p*h*l-u*m*l-p*a*d+o*m*d+u*a*g-o*h*g,T=t*x+n*y+r*v+s*w;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/T;return e[0]=x*A,e[1]=(m*d*s-h*g*s-m*r*f+n*g*f+h*r*_-n*d*_)*A,e[2]=(a*g*s-m*l*s+m*r*c-n*g*c-a*r*_+n*l*_)*A,e[3]=(h*l*s-a*d*s-h*r*c+n*d*c+a*r*f-n*l*f)*A,e[4]=y*A,e[5]=(u*g*s-p*d*s+p*r*f-t*g*f-u*r*_+t*d*_)*A,e[6]=(p*l*s-o*g*s-p*r*c+t*g*c+o*r*_-t*l*_)*A,e[7]=(o*d*s-u*l*s+u*r*c-t*d*c-o*r*f+t*l*f)*A,e[8]=v*A,e[9]=(p*h*s-u*m*s-p*n*f+t*m*f+u*n*_-t*h*_)*A,e[10]=(o*m*s-p*a*s+p*n*c-t*m*c-o*n*_+t*a*_)*A,e[11]=(u*a*s-o*h*s-u*n*c+t*h*c+o*n*f-t*a*f)*A,e[12]=w*A,e[13]=(u*m*r-p*h*r+p*n*d-t*m*d-u*n*g+t*h*g)*A,e[14]=(p*a*r-o*m*r-p*n*l+t*m*l+o*n*g-t*a*g)*A,e[15]=(o*h*r-u*a*r+u*n*l-t*h*l-o*n*d+t*a*d)*A,this}scale(e){const t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),s=1-n,o=e.x,a=e.y,l=e.z,c=s*o,u=s*a;return this.set(c*o+n,c*a-r*l,c*l+r*a,0,c*a+r*l,u*a+n,u*l-r*o,0,c*l-r*a,u*l+r*o,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,o){return this.set(1,n,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,u=o+o,h=a+a,d=s*c,f=s*u,p=s*h,m=o*u,g=o*h,_=a*h,x=l*c,y=l*u,v=l*h,w=n.x,T=n.y,A=n.z;return r[0]=(1-(m+_))*w,r[1]=(f+v)*w,r[2]=(p-y)*w,r[3]=0,r[4]=(f-v)*T,r[5]=(1-(d+_))*T,r[6]=(g+x)*T,r[7]=0,r[8]=(p+y)*A,r[9]=(g-x)*A,r[10]=(1-(d+m))*A,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;let s=Bl.set(r[0],r[1],r[2]).length();const o=Bl.set(r[4],r[5],r[6]).length(),a=Bl.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Ar.copy(this);const c=1/s,u=1/o,h=1/a;return Ar.elements[0]*=c,Ar.elements[1]*=c,Ar.elements[2]*=c,Ar.elements[4]*=u,Ar.elements[5]*=u,Ar.elements[6]*=u,Ar.elements[8]*=h,Ar.elements[9]*=h,Ar.elements[10]*=h,t.setFromRotationMatrix(Ar),n.x=s,n.y=o,n.z=a,this}makePerspective(e,t,n,r,s,o,a=ls){const l=this.elements,c=2*s/(t-e),u=2*s/(n-r),h=(t+e)/(t-e),d=(n+r)/(n-r);let f,p;if(a===ls)f=-(o+s)/(o-s),p=-2*o*s/(o-s);else if(a===Th)f=-o/(o-s),p=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=u,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=p,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,r,s,o,a=ls){const l=this.elements,c=1/(t-e),u=1/(n-r),h=1/(o-s),d=(t+e)*c,f=(n+r)*u;let p,m;if(a===ls)p=(o+s)*h,m=-2*h;else if(a===Th)p=s*h,m=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=m,l[14]=-p,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Bl=new B,Ar=new rt,R4=new B(0,0,0),P4=new B(1,1,1),wo=new B,qd=new B,Gi=new B,w1=new rt,M1=new Fi;class lr{constructor(e=0,t=0,n=0,r=lr.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],u=r[9],h=r[2],d=r[6],f=r[10];switch(t){case"XYZ":this._y=Math.asin(cn(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-cn(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(cn(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-cn(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(cn(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-cn(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return w1.makeRotationFromQuaternion(e),this.setFromRotationMatrix(w1,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return M1.setFromEuler(this),this.setFromQuaternion(M1,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}lr.DEFAULT_ORDER="XYZ";class l_{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let I4=0;const E1=new B,zl=new Fi,Ss=new rt,Yd=new B,Cu=new B,L4=new B,F4=new Fi,T1=new B(1,0,0),A1=new B(0,1,0),C1=new B(0,0,1),D1={type:"added"},O4={type:"removed"},Hl={type:"childadded",child:null},H0={type:"childremoved",child:null};class Rt extends _s{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:I4++}),this.uuid=sr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Rt.DEFAULT_UP.clone();const e=new B,t=new lr,n=new Fi,r=new B(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new rt},normalMatrix:{value:new ot}}),this.matrix=new rt,this.matrixWorld=new rt,this.matrixAutoUpdate=Rt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Rt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new l_,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return zl.setFromAxisAngle(e,t),this.quaternion.multiply(zl),this}rotateOnWorldAxis(e,t){return zl.setFromAxisAngle(e,t),this.quaternion.premultiply(zl),this}rotateX(e){return this.rotateOnAxis(T1,e)}rotateY(e){return this.rotateOnAxis(A1,e)}rotateZ(e){return this.rotateOnAxis(C1,e)}translateOnAxis(e,t){return E1.copy(e).applyQuaternion(this.quaternion),this.position.add(E1.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(T1,e)}translateY(e){return this.translateOnAxis(A1,e)}translateZ(e){return this.translateOnAxis(C1,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ss.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Yd.copy(e):Yd.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),Cu.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ss.lookAt(Cu,Yd,this.up):Ss.lookAt(Yd,Cu,this.up),this.quaternion.setFromRotationMatrix(Ss),r&&(Ss.extractRotation(r.matrixWorld),zl.setFromRotationMatrix(Ss),this.quaternion.premultiply(zl.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(D1),Hl.child=e,this.dispatchEvent(Hl),Hl.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(O4),H0.child=e,this.dispatchEvent(H0),H0.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ss.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ss.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ss),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(D1),Hl.child=e,this.dispatchEvent(Hl),Hl.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Cu,e,L4),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Cu,F4,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];s(e.shapes,h)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),h=o(e.shapes),d=o(e.skeletons),f=o(e.animations),p=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),p.length>0&&(n.nodes=p)}return n.object=r,n;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}}Rt.DEFAULT_UP=new B(0,1,0);Rt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Rt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Cr=new B,ws=new B,V0=new B,Ms=new B,Vl=new B,Gl=new B,R1=new B,G0=new B,W0=new B,X0=new B;class er{constructor(e=new B,t=new B,n=new B){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Cr.subVectors(e,t),r.cross(Cr);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){Cr.subVectors(r,t),ws.subVectors(n,t),V0.subVectors(e,t);const o=Cr.dot(Cr),a=Cr.dot(ws),l=Cr.dot(V0),c=ws.dot(ws),u=ws.dot(V0),h=o*c-a*a;if(h===0)return s.set(0,0,0),null;const d=1/h,f=(c*l-a*u)*d,p=(o*u-a*l)*d;return s.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Ms)===null?!1:Ms.x>=0&&Ms.y>=0&&Ms.x+Ms.y<=1}static getInterpolation(e,t,n,r,s,o,a,l){return this.getBarycoord(e,t,n,r,Ms)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Ms.x),l.addScaledVector(o,Ms.y),l.addScaledVector(a,Ms.z),l)}static isFrontFacing(e,t,n,r){return Cr.subVectors(n,t),ws.subVectors(e,t),Cr.cross(ws).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Cr.subVectors(this.c,this.b),ws.subVectors(this.a,this.b),Cr.cross(ws).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return er.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return er.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return er.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return er.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return er.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,s=this.c;let o,a;Vl.subVectors(r,n),Gl.subVectors(s,n),G0.subVectors(e,n);const l=Vl.dot(G0),c=Gl.dot(G0);if(l<=0&&c<=0)return t.copy(n);W0.subVectors(e,r);const u=Vl.dot(W0),h=Gl.dot(W0);if(u>=0&&h<=u)return t.copy(r);const d=l*h-u*c;if(d<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(n).addScaledVector(Vl,o);X0.subVectors(e,s);const f=Vl.dot(X0),p=Gl.dot(X0);if(p>=0&&f<=p)return t.copy(s);const m=f*c-l*p;if(m<=0&&c>=0&&p<=0)return a=c/(c-p),t.copy(n).addScaledVector(Gl,a);const g=u*p-f*h;if(g<=0&&h-u>=0&&f-p>=0)return R1.subVectors(s,r),a=(h-u)/(h-u+(f-p)),t.copy(r).addScaledVector(R1,a);const _=1/(g+m+d);return o=m*_,a=d*_,t.copy(n).addScaledVector(Vl,o).addScaledVector(Gl,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const zP={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Mo={h:0,s:0,l:0},jd={h:0,s:0,l:0};function $0(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class We{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ji){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Pt.toWorkingColorSpace(this,t),this}setRGB(e,t,n,r=Pt.workingColorSpace){return this.r=e,this.g=t,this.b=n,Pt.toWorkingColorSpace(this,r),this}setHSL(e,t,n,r=Pt.workingColorSpace){if(e=Yb(e,1),t=cn(t,0,1),n=cn(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=$0(o,s,e+1/3),this.g=$0(o,s,e),this.b=$0(o,s,e-1/3)}return Pt.toWorkingColorSpace(this,r),this}setStyle(e,t=ji){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=ji){const n=zP[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Nc(e.r),this.g=Nc(e.g),this.b=Nc(e.b),this}copyLinearToSRGB(e){return this.r=L0(e.r),this.g=L0(e.g),this.b=L0(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ji){return Pt.fromWorkingColorSpace(qn.copy(this),e),Math.round(cn(qn.r*255,0,255))*65536+Math.round(cn(qn.g*255,0,255))*256+Math.round(cn(qn.b*255,0,255))}getHexString(e=ji){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Pt.workingColorSpace){Pt.fromWorkingColorSpace(qn.copy(this),t);const n=qn.r,r=qn.g,s=qn.b,o=Math.max(n,r,s),a=Math.min(n,r,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const h=o-a;switch(c=u<=.5?h/(o+a):h/(2-o-a),o){case n:l=(r-s)/h+(r<s?6:0);break;case r:l=(s-n)/h+2;break;case s:l=(n-r)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=Pt.workingColorSpace){return Pt.fromWorkingColorSpace(qn.copy(this),t),e.r=qn.r,e.g=qn.g,e.b=qn.b,e}getStyle(e=ji){Pt.fromWorkingColorSpace(qn.copy(this),e);const t=qn.r,n=qn.g,r=qn.b;return e!==ji?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(Mo),this.setHSL(Mo.h+e,Mo.s+t,Mo.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Mo),e.getHSL(jd);const n=Vf(Mo.h,jd.h,t),r=Vf(Mo.s,jd.s,t),s=Vf(Mo.l,jd.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const qn=new We;We.NAMES=zP;let N4=0;class si extends _s{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:N4++}),this.uuid=sr(),this.name="",this.type="Material",this.blending=sl,this.side=eo,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Hm,this.blendDst=Vm,this.blendEquation=Bo,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new We(0,0,0),this.blendAlpha=0,this.depthFunc=mh,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=jv,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Oa,this.stencilZFail=Oa,this.stencilZPass=Oa,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==sl&&(n.blending=this.blending),this.side!==eo&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Hm&&(n.blendSrc=this.blendSrc),this.blendDst!==Vm&&(n.blendDst=this.blendDst),this.blendEquation!==Bo&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==mh&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==jv&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Oa&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Oa&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Oa&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=r(e.textures),o=r(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class co extends si{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new We(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new lr,this.combine=Zh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Ls=U4();function U4(){const i=new ArrayBuffer(4),e=new Float32Array(i),t=new Uint32Array(i),n=new Uint32Array(512),r=new Uint32Array(512);for(let l=0;l<256;++l){const c=l-127;c<-27?(n[l]=0,n[l|256]=32768,r[l]=24,r[l|256]=24):c<-14?(n[l]=1024>>-c-14,n[l|256]=1024>>-c-14|32768,r[l]=-c-1,r[l|256]=-c-1):c<=15?(n[l]=c+15<<10,n[l|256]=c+15<<10|32768,r[l]=13,r[l|256]=13):c<128?(n[l]=31744,n[l|256]=64512,r[l]=24,r[l|256]=24):(n[l]=31744,n[l|256]=64512,r[l]=13,r[l|256]=13)}const s=new Uint32Array(2048),o=new Uint32Array(64),a=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,u=0;for(;!(c&8388608);)c<<=1,u-=8388608;c&=-8388609,u+=947912704,s[l]=c|u}for(let l=1024;l<2048;++l)s[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)o[l]=l<<23;o[31]=1199570944,o[32]=2147483648;for(let l=33;l<63;++l)o[l]=2147483648+(l-32<<23);o[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(a[l]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:r,mantissaTable:s,exponentTable:o,offsetTable:a}}function Ei(i){Math.abs(i)>65504&&console.warn("THREE.DataUtils.toHalfFloat(): Value out of range."),i=cn(i,-65504,65504),Ls.floatView[0]=i;const e=Ls.uint32View[0],t=e>>23&511;return Ls.baseTable[t]+((e&8388607)>>Ls.shiftTable[t])}function rf(i){const e=i>>10;return Ls.uint32View[0]=Ls.mantissaTable[Ls.offsetTable[e]+(i&1023)]+Ls.exponentTable[e],Ls.floatView[0]}const k4={toHalfFloat:Ei,fromHalfFloat:rf},_n=new B,Kd=new Te;class Bt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Eh,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Ci,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return Oc("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Kd.fromBufferAttribute(this,t),Kd.applyMatrix3(e),this.setXY(t,Kd.x,Kd.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)_n.fromBufferAttribute(this,t),_n.applyMatrix3(e),this.setXYZ(t,_n.x,_n.y,_n.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)_n.fromBufferAttribute(this,t),_n.applyMatrix4(e),this.setXYZ(t,_n.x,_n.y,_n.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)_n.fromBufferAttribute(this,t),_n.applyNormalMatrix(e),this.setXYZ(t,_n.x,_n.y,_n.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)_n.fromBufferAttribute(this,t),_n.transformDirection(e),this.setXYZ(t,_n.x,_n.y,_n.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=yi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=at(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=yi(t,this.array)),t}setX(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=yi(t,this.array)),t}setY(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=yi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=yi(t,this.array)),t}setW(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=at(t,this.array),n=at(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=at(t,this.array),n=at(n,this.array),r=at(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=at(t,this.array),n=at(n,this.array),r=at(r,this.array),s=at(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Eh&&(e.usage=this.usage),e}}class B4 extends Bt{constructor(e,t,n){super(new Int8Array(e),t,n)}}class z4 extends Bt{constructor(e,t,n){super(new Uint8Array(e),t,n)}}class H4 extends Bt{constructor(e,t,n){super(new Uint8ClampedArray(e),t,n)}}class V4 extends Bt{constructor(e,t,n){super(new Int16Array(e),t,n)}}class Kb extends Bt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class G4 extends Bt{constructor(e,t,n){super(new Int32Array(e),t,n)}}class Zb extends Bt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class W4 extends Bt{constructor(e,t,n){super(new Uint16Array(e),t,n),this.isFloat16BufferAttribute=!0}getX(e){let t=rf(this.array[e*this.itemSize]);return this.normalized&&(t=yi(t,this.array)),t}setX(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize]=Ei(t),this}getY(e){let t=rf(this.array[e*this.itemSize+1]);return this.normalized&&(t=yi(t,this.array)),t}setY(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize+1]=Ei(t),this}getZ(e){let t=rf(this.array[e*this.itemSize+2]);return this.normalized&&(t=yi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize+2]=Ei(t),this}getW(e){let t=rf(this.array[e*this.itemSize+3]);return this.normalized&&(t=yi(t,this.array)),t}setW(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize+3]=Ei(t),this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=at(t,this.array),n=at(n,this.array)),this.array[e+0]=Ei(t),this.array[e+1]=Ei(n),this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=at(t,this.array),n=at(n,this.array),r=at(r,this.array)),this.array[e+0]=Ei(t),this.array[e+1]=Ei(n),this.array[e+2]=Ei(r),this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=at(t,this.array),n=at(n,this.array),r=at(r,this.array),s=at(s,this.array)),this.array[e+0]=Ei(t),this.array[e+1]=Ei(n),this.array[e+2]=Ei(r),this.array[e+3]=Ei(s),this}}class Je extends Bt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let X4=0;const dr=new rt,q0=new Rt,Wl=new B,Wi=new Si,Du=new Si,Ln=new B;class ht extends _s{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:X4++}),this.uuid=sr(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(NP(e)?Zb:Kb)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new ot().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return dr.makeRotationFromQuaternion(e),this.applyMatrix4(dr),this}rotateX(e){return dr.makeRotationX(e),this.applyMatrix4(dr),this}rotateY(e){return dr.makeRotationY(e),this.applyMatrix4(dr),this}rotateZ(e){return dr.makeRotationZ(e),this.applyMatrix4(dr),this}translate(e,t,n){return dr.makeTranslation(e,t,n),this.applyMatrix4(dr),this}scale(e,t,n){return dr.makeScale(e,t,n),this.applyMatrix4(dr),this}lookAt(e){return q0.lookAt(e),q0.updateMatrix(),this.applyMatrix4(q0.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Wl).negate(),this.translate(Wl.x,Wl.y,Wl.z),this}setFromPoints(e){const t=[];for(let n=0,r=e.length;n<r;n++){const s=e[n];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new Je(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Si);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new B(-1/0,-1/0,-1/0),new B(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const s=t[n];Wi.setFromBufferAttribute(s),this.morphTargetsRelative?(Ln.addVectors(this.boundingBox.min,Wi.min),this.boundingBox.expandByPoint(Ln),Ln.addVectors(this.boundingBox.max,Wi.max),this.boundingBox.expandByPoint(Ln)):(this.boundingBox.expandByPoint(Wi.min),this.boundingBox.expandByPoint(Wi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ii);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new B,1/0);return}if(e){const n=this.boundingSphere.center;if(Wi.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];Du.setFromBufferAttribute(a),this.morphTargetsRelative?(Ln.addVectors(Wi.min,Du.min),Wi.expandByPoint(Ln),Ln.addVectors(Wi.max,Du.max),Wi.expandByPoint(Ln)):(Wi.expandByPoint(Du.min),Wi.expandByPoint(Du.max))}Wi.getCenter(n);let r=0;for(let s=0,o=e.count;s<o;s++)Ln.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(Ln));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Ln.fromBufferAttribute(a,c),l&&(Wl.fromBufferAttribute(e,c),Ln.add(Wl)),r=Math.max(r,n.distanceToSquared(Ln))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Bt(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let C=0;C<n.count;C++)a[C]=new B,l[C]=new B;const c=new B,u=new B,h=new B,d=new Te,f=new Te,p=new Te,m=new B,g=new B;function _(C,M,b){c.fromBufferAttribute(n,C),u.fromBufferAttribute(n,M),h.fromBufferAttribute(n,b),d.fromBufferAttribute(s,C),f.fromBufferAttribute(s,M),p.fromBufferAttribute(s,b),u.sub(c),h.sub(c),f.sub(d),p.sub(d);const R=1/(f.x*p.y-p.x*f.y);isFinite(R)&&(m.copy(u).multiplyScalar(p.y).addScaledVector(h,-f.y).multiplyScalar(R),g.copy(h).multiplyScalar(f.x).addScaledVector(u,-p.x).multiplyScalar(R),a[C].add(m),a[M].add(m),a[b].add(m),l[C].add(g),l[M].add(g),l[b].add(g))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let C=0,M=x.length;C<M;++C){const b=x[C],R=b.start,L=b.count;for(let F=R,H=R+L;F<H;F+=3)_(e.getX(F+0),e.getX(F+1),e.getX(F+2))}const y=new B,v=new B,w=new B,T=new B;function A(C){w.fromBufferAttribute(r,C),T.copy(w);const M=a[C];y.copy(M),y.sub(w.multiplyScalar(w.dot(M))).normalize(),v.crossVectors(T,M);const R=v.dot(l[C])<0?-1:1;o.setXYZW(C,y.x,y.y,y.z,R)}for(let C=0,M=x.length;C<M;++C){const b=x[C],R=b.start,L=b.count;for(let F=R,H=R+L;F<H;F+=3)A(e.getX(F+0)),A(e.getX(F+1)),A(e.getX(F+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Bt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const r=new B,s=new B,o=new B,a=new B,l=new B,c=new B,u=new B,h=new B;if(e)for(let d=0,f=e.count;d<f;d+=3){const p=e.getX(d+0),m=e.getX(d+1),g=e.getX(d+2);r.fromBufferAttribute(t,p),s.fromBufferAttribute(t,m),o.fromBufferAttribute(t,g),u.subVectors(o,s),h.subVectors(r,s),u.cross(h),a.fromBufferAttribute(n,p),l.fromBufferAttribute(n,m),c.fromBufferAttribute(n,g),a.add(u),l.add(u),c.add(u),n.setXYZ(p,a.x,a.y,a.z),n.setXYZ(m,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)r.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),u.subVectors(o,s),h.subVectors(r,s),u.cross(h),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ln.fromBufferAttribute(e,t),Ln.normalize(),e.setXYZ(t,Ln.x,Ln.y,Ln.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,h=a.normalized,d=new c.constructor(l.length*u);let f=0,p=0;for(let m=0,g=l.length;m<g;m++){a.isInterleavedBufferAttribute?f=l[m]*a.data.stride+a.offset:f=l[m]*u;for(let _=0;_<u;_++)d[p++]=c[f++]}return new Bt(d,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new ht,n=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=e(l,n);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,h=c.length;u<h;u++){const d=c[u],f=e(d,n);l.push(f)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,d=c.length;h<d;h++){const f=c[h];u.push(f.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],h=s[c];for(let d=0,f=h.length;d<f;d++)u.push(h[d].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const P1=new rt,xa=new fu,Zd=new ii,I1=new B,Xl=new B,$l=new B,ql=new B,Y0=new B,Jd=new B,Qd=new Te,ep=new Te,tp=new Te,L1=new B,F1=new B,O1=new B,np=new B,ip=new B;class mn extends Rt{constructor(e=new ht,t=new co){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){Jd.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],h=s[l];u!==0&&(Y0.fromBufferAttribute(h,e),o?Jd.addScaledVector(Y0,u):Jd.addScaledVector(Y0.sub(t),u))}t.add(Jd)}return t}raycast(e,t){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Zd.copy(n.boundingSphere),Zd.applyMatrix4(s),xa.copy(e.ray).recast(e.near),!(Zd.containsPoint(xa.origin)===!1&&(xa.intersectSphere(Zd,I1)===null||xa.origin.distanceToSquared(I1)>(e.far-e.near)**2))&&(P1.copy(s).invert(),xa.copy(e.ray).applyMatrix4(P1),!(n.boundingBox!==null&&xa.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,xa)))}_computeIntersections(e,t,n){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,d=s.groups,f=s.drawRange;if(a!==null)if(Array.isArray(o))for(let p=0,m=d.length;p<m;p++){const g=d[p],_=o[g.materialIndex],x=Math.max(g.start,f.start),y=Math.min(a.count,Math.min(g.start+g.count,f.start+f.count));for(let v=x,w=y;v<w;v+=3){const T=a.getX(v),A=a.getX(v+1),C=a.getX(v+2);r=rp(this,_,e,n,c,u,h,T,A,C),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{const p=Math.max(0,f.start),m=Math.min(a.count,f.start+f.count);for(let g=p,_=m;g<_;g+=3){const x=a.getX(g),y=a.getX(g+1),v=a.getX(g+2);r=rp(this,o,e,n,c,u,h,x,y,v),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let p=0,m=d.length;p<m;p++){const g=d[p],_=o[g.materialIndex],x=Math.max(g.start,f.start),y=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let v=x,w=y;v<w;v+=3){const T=v,A=v+1,C=v+2;r=rp(this,_,e,n,c,u,h,T,A,C),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{const p=Math.max(0,f.start),m=Math.min(l.count,f.start+f.count);for(let g=p,_=m;g<_;g+=3){const x=g,y=g+1,v=g+2;r=rp(this,o,e,n,c,u,h,x,y,v),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}}}function $4(i,e,t,n,r,s,o,a){let l;if(e.side===bi?l=n.intersectTriangle(o,s,r,!0,a):l=n.intersectTriangle(r,s,o,e.side===eo,a),l===null)return null;ip.copy(a),ip.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(ip);return c<t.near||c>t.far?null:{distance:c,point:ip.clone(),object:i}}function rp(i,e,t,n,r,s,o,a,l,c){i.getVertexPosition(a,Xl),i.getVertexPosition(l,$l),i.getVertexPosition(c,ql);const u=$4(i,e,t,n,Xl,$l,ql,np);if(u){r&&(Qd.fromBufferAttribute(r,a),ep.fromBufferAttribute(r,l),tp.fromBufferAttribute(r,c),u.uv=er.getInterpolation(np,Xl,$l,ql,Qd,ep,tp,new Te)),s&&(Qd.fromBufferAttribute(s,a),ep.fromBufferAttribute(s,l),tp.fromBufferAttribute(s,c),u.uv1=er.getInterpolation(np,Xl,$l,ql,Qd,ep,tp,new Te)),o&&(L1.fromBufferAttribute(o,a),F1.fromBufferAttribute(o,l),O1.fromBufferAttribute(o,c),u.normal=er.getInterpolation(np,Xl,$l,ql,L1,F1,O1,new B),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const h={a,b:l,c,normal:new B,materialIndex:0};er.getNormal(Xl,$l,ql,h.normal),u.face=h}return u}class Ml extends ht{constructor(e=1,t=1,n=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],h=[];let d=0,f=0;p("z","y","x",-1,-1,n,t,e,o,s,0),p("z","y","x",1,-1,n,t,-e,o,s,1),p("x","z","y",1,1,e,n,t,r,o,2),p("x","z","y",1,-1,e,n,-t,r,o,3),p("x","y","z",1,-1,e,t,n,r,s,4),p("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new Je(c,3)),this.setAttribute("normal",new Je(u,3)),this.setAttribute("uv",new Je(h,2));function p(m,g,_,x,y,v,w,T,A,C,M){const b=v/A,R=w/C,L=v/2,F=w/2,H=T/2,W=A+1,N=C+1;let $=0,X=0;const Z=new B;for(let z=0;z<N;z++){const ue=z*R-F;for(let me=0;me<W;me++){const Ue=me*b-L;Z[m]=Ue*x,Z[g]=ue*y,Z[_]=H,c.push(Z.x,Z.y,Z.z),Z[m]=0,Z[g]=0,Z[_]=T>0?1:-1,u.push(Z.x,Z.y,Z.z),h.push(me/A),h.push(1-z/C),$+=1}}for(let z=0;z<C;z++)for(let ue=0;ue<A;ue++){const me=d+ue+W*z,Ue=d+ue+W*(z+1),ie=d+(ue+1)+W*(z+1),le=d+(ue+1)+W*z;l.push(me,Ue,le),l.push(Ue,ie,le),X+=6}a.addGroup(f,X,M),f+=X,d+=$}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ml(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function eu(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function fi(i){const e={};for(let t=0;t<i.length;t++){const n=eu(i[t]);for(const r in n)e[r]=n[r]}return e}function q4(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function HP(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Pt.workingColorSpace}const VP={clone:eu,merge:fi};var Y4=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,j4=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Wr extends si{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Y4,this.fragmentShader=j4,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=eu(e.uniforms),this.uniformsGroups=q4(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class ed extends Rt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new rt,this.projectionMatrix=new rt,this.projectionMatrixInverse=new rt,this.coordinateSystem=ls}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Eo=new B,N1=new Te,U1=new Te;class bn extends ed{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Qc*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(al*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Qc*2*Math.atan(Math.tan(al*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Eo.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Eo.x,Eo.y).multiplyScalar(-e/Eo.z),Eo.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Eo.x,Eo.y).multiplyScalar(-e/Eo.z)}getViewSize(e,t){return this.getViewBounds(e,N1,U1),t.subVectors(U1,N1)}setViewOffset(e,t,n,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(al*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,t-=o.offsetY*n/c,r*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Yl=-90,jl=1;class GP extends Rt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new bn(Yl,jl,e,t);r.layers=this.layers,this.add(r);const s=new bn(Yl,jl,e,t);s.layers=this.layers,this.add(s);const o=new bn(Yl,jl,e,t);o.layers=this.layers,this.add(o);const a=new bn(Yl,jl,e,t);a.layers=this.layers,this.add(a);const l=new bn(Yl,jl,e,t);l.layers=this.layers,this.add(l);const c=new bn(Yl,jl,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,s,o,a,l]=t;for(const c of t)this.remove(c);if(e===ls)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Th)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;const m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,s),e.setRenderTarget(n,1,r),e.render(t,o),e.setRenderTarget(n,2,r),e.render(t,a),e.setRenderTarget(n,3,r),e.render(t,l),e.setRenderTarget(n,4,r),e.render(t,c),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,r),e.render(t,u),e.setRenderTarget(h,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}}class td extends fn{constructor(e,t,n,r,s,o,a,l,c,u){e=e!==void 0?e:[],t=t!==void 0?t:to,super(e,t,n,r,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class WP extends Gr{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new td(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:wn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Ml(5,5,5),s=new Wr({name:"CubemapFromEquirect",uniforms:eu(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:bi,blending:$s});s.uniforms.tEquirect.value=t;const o=new mn(r,s),a=t.minFilter;return t.minFilter===as&&(t.minFilter=wn),new GP(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,r){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,r);e.setRenderTarget(s)}}const j0=new B,K4=new B,Z4=new ot;class No{constructor(e=new B(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=j0.subVectors(n,t).cross(K4.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(j0),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Z4.getNormalMatrix(e),r=this.coplanarPoint(j0).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ba=new ii,sp=new B;class nd{constructor(e=new No,t=new No,n=new No,r=new No,s=new No,o=new No){this.planes=[e,t,n,r,s,o]}set(e,t,n,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=ls){const n=this.planes,r=e.elements,s=r[0],o=r[1],a=r[2],l=r[3],c=r[4],u=r[5],h=r[6],d=r[7],f=r[8],p=r[9],m=r[10],g=r[11],_=r[12],x=r[13],y=r[14],v=r[15];if(n[0].setComponents(l-s,d-c,g-f,v-_).normalize(),n[1].setComponents(l+s,d+c,g+f,v+_).normalize(),n[2].setComponents(l+o,d+u,g+p,v+x).normalize(),n[3].setComponents(l-o,d-u,g-p,v-x).normalize(),n[4].setComponents(l-a,d-h,g-m,v-y).normalize(),t===ls)n[5].setComponents(l+a,d+h,g+m,v+y).normalize();else if(t===Th)n[5].setComponents(a,h,m,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ba.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ba.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ba)}intersectsSprite(e){return ba.center.set(0,0,0),ba.radius=.7071067811865476,ba.applyMatrix4(e.matrixWorld),this.intersectsSphere(ba)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(sp.x=r.normal.x>0?e.max.x:e.min.x,sp.y=r.normal.y>0?e.max.y:e.min.y,sp.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(sp)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function XP(){let i=null,e=!1,t=null,n=null;function r(s,o){t(s,o),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function J4(i){const e=new WeakMap;function t(a,l){const c=a.array,u=a.usage,h=c.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,c,u),a.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:h}}function n(a,l,c){const u=l.array,h=l._updateRange,d=l.updateRanges;if(i.bindBuffer(c,a),h.count===-1&&d.length===0&&i.bufferSubData(c,0,u),d.length!==0){for(let f=0,p=d.length;f<p;f++){const m=d[f];i.bufferSubData(c,m.start*u.BYTES_PER_ELEMENT,u,m.start,m.count)}l.clearUpdateRanges()}h.count!==-1&&(i.bufferSubData(c,h.offset*u.BYTES_PER_ELEMENT,u,h.offset,h.count),h.count=-1),l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(i.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}class hu extends ht{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const s=e/2,o=t/2,a=Math.floor(n),l=Math.floor(r),c=a+1,u=l+1,h=e/a,d=t/l,f=[],p=[],m=[],g=[];for(let _=0;_<u;_++){const x=_*d-o;for(let y=0;y<c;y++){const v=y*h-s;p.push(v,-x,0),m.push(0,0,1),g.push(y/a),g.push(1-_/l)}}for(let _=0;_<l;_++)for(let x=0;x<a;x++){const y=x+c*_,v=x+c*(_+1),w=x+1+c*(_+1),T=x+1+c*_;f.push(y,v,T),f.push(v,w,T)}this.setIndex(f),this.setAttribute("position",new Je(p,3)),this.setAttribute("normal",new Je(m,3)),this.setAttribute("uv",new Je(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new hu(e.width,e.height,e.widthSegments,e.heightSegments)}}var Q4=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,eV=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,tV=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,nV=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,iV=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,rV=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,sV=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,oV=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,aV=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,lV=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,cV=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,uV=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,fV=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,hV=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,dV=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,pV=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,mV=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,gV=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,_V=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,yV=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,vV=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,xV=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,bV=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,SV=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,wV=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,MV=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,EV=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,TV=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,AV=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,CV=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,DV="gl_FragColor = linearToOutputTexel( gl_FragColor );",RV=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,PV=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,IV=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,LV=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,FV=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,OV=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,NV=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,UV=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,kV=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,BV=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,zV=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,HV=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,VV=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,GV=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,WV=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,XV=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,$V=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,qV=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,YV=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,jV=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,KV=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,ZV=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,JV=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,QV=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,e5=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,t5=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,n5=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,i5=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,r5=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,s5=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,o5=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,a5=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,l5=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,c5=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,u5=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,f5=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,h5=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,d5=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,p5=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,m5=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,g5=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,_5=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,y5=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,v5=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,x5=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,b5=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,S5=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,w5=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,M5=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,E5=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,T5=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,A5=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,C5=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,D5=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,R5=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,P5=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,I5=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,L5=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,F5=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,O5=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,N5=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,U5=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,k5=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,B5=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,z5=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,H5=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,V5=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,G5=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,W5=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,X5=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,$5=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,q5=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Y5=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,j5=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,K5=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Z5=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const J5=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Q5=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,eG=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,tG=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,nG=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,iG=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,rG=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,sG=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,oG=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,aG=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,lG=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,cG=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,uG=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,fG=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,hG=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,dG=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,pG=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,mG=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,gG=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,_G=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,yG=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,vG=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,xG=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,bG=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,SG=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,wG=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,MG=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,EG=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,TG=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,AG=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,CG=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,DG=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,RG=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,PG=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ut={alphahash_fragment:Q4,alphahash_pars_fragment:eV,alphamap_fragment:tV,alphamap_pars_fragment:nV,alphatest_fragment:iV,alphatest_pars_fragment:rV,aomap_fragment:sV,aomap_pars_fragment:oV,batching_pars_vertex:aV,batching_vertex:lV,begin_vertex:cV,beginnormal_vertex:uV,bsdfs:fV,iridescence_fragment:hV,bumpmap_pars_fragment:dV,clipping_planes_fragment:pV,clipping_planes_pars_fragment:mV,clipping_planes_pars_vertex:gV,clipping_planes_vertex:_V,color_fragment:yV,color_pars_fragment:vV,color_pars_vertex:xV,color_vertex:bV,common:SV,cube_uv_reflection_fragment:wV,defaultnormal_vertex:MV,displacementmap_pars_vertex:EV,displacementmap_vertex:TV,emissivemap_fragment:AV,emissivemap_pars_fragment:CV,colorspace_fragment:DV,colorspace_pars_fragment:RV,envmap_fragment:PV,envmap_common_pars_fragment:IV,envmap_pars_fragment:LV,envmap_pars_vertex:FV,envmap_physical_pars_fragment:XV,envmap_vertex:OV,fog_vertex:NV,fog_pars_vertex:UV,fog_fragment:kV,fog_pars_fragment:BV,gradientmap_pars_fragment:zV,lightmap_pars_fragment:HV,lights_lambert_fragment:VV,lights_lambert_pars_fragment:GV,lights_pars_begin:WV,lights_toon_fragment:$V,lights_toon_pars_fragment:qV,lights_phong_fragment:YV,lights_phong_pars_fragment:jV,lights_physical_fragment:KV,lights_physical_pars_fragment:ZV,lights_fragment_begin:JV,lights_fragment_maps:QV,lights_fragment_end:e5,logdepthbuf_fragment:t5,logdepthbuf_pars_fragment:n5,logdepthbuf_pars_vertex:i5,logdepthbuf_vertex:r5,map_fragment:s5,map_pars_fragment:o5,map_particle_fragment:a5,map_particle_pars_fragment:l5,metalnessmap_fragment:c5,metalnessmap_pars_fragment:u5,morphinstance_vertex:f5,morphcolor_vertex:h5,morphnormal_vertex:d5,morphtarget_pars_vertex:p5,morphtarget_vertex:m5,normal_fragment_begin:g5,normal_fragment_maps:_5,normal_pars_fragment:y5,normal_pars_vertex:v5,normal_vertex:x5,normalmap_pars_fragment:b5,clearcoat_normal_fragment_begin:S5,clearcoat_normal_fragment_maps:w5,clearcoat_pars_fragment:M5,iridescence_pars_fragment:E5,opaque_fragment:T5,packing:A5,premultiplied_alpha_fragment:C5,project_vertex:D5,dithering_fragment:R5,dithering_pars_fragment:P5,roughnessmap_fragment:I5,roughnessmap_pars_fragment:L5,shadowmap_pars_fragment:F5,shadowmap_pars_vertex:O5,shadowmap_vertex:N5,shadowmask_pars_fragment:U5,skinbase_vertex:k5,skinning_pars_vertex:B5,skinning_vertex:z5,skinnormal_vertex:H5,specularmap_fragment:V5,specularmap_pars_fragment:G5,tonemapping_fragment:W5,tonemapping_pars_fragment:X5,transmission_fragment:$5,transmission_pars_fragment:q5,uv_pars_fragment:Y5,uv_pars_vertex:j5,uv_vertex:K5,worldpos_vertex:Z5,background_vert:J5,background_frag:Q5,backgroundCube_vert:eG,backgroundCube_frag:tG,cube_vert:nG,cube_frag:iG,depth_vert:rG,depth_frag:sG,distanceRGBA_vert:oG,distanceRGBA_frag:aG,equirect_vert:lG,equirect_frag:cG,linedashed_vert:uG,linedashed_frag:fG,meshbasic_vert:hG,meshbasic_frag:dG,meshlambert_vert:pG,meshlambert_frag:mG,meshmatcap_vert:gG,meshmatcap_frag:_G,meshnormal_vert:yG,meshnormal_frag:vG,meshphong_vert:xG,meshphong_frag:bG,meshphysical_vert:SG,meshphysical_frag:wG,meshtoon_vert:MG,meshtoon_frag:EG,points_vert:TG,points_frag:AG,shadow_vert:CG,shadow_frag:DG,sprite_vert:RG,sprite_frag:PG},He={common:{diffuse:{value:new We(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ot},alphaMap:{value:null},alphaMapTransform:{value:new ot},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ot}},envmap:{envMap:{value:null},envMapRotation:{value:new ot},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ot}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ot}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ot},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ot},normalScale:{value:new Te(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ot},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ot}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ot}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ot}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new We(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new We(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ot},alphaTest:{value:0},uvTransform:{value:new ot}},sprite:{diffuse:{value:new We(16777215)},opacity:{value:1},center:{value:new Te(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ot},alphaMap:{value:null},alphaMapTransform:{value:new ot},alphaTest:{value:0}}},Lr={basic:{uniforms:fi([He.common,He.specularmap,He.envmap,He.aomap,He.lightmap,He.fog]),vertexShader:ut.meshbasic_vert,fragmentShader:ut.meshbasic_frag},lambert:{uniforms:fi([He.common,He.specularmap,He.envmap,He.aomap,He.lightmap,He.emissivemap,He.bumpmap,He.normalmap,He.displacementmap,He.fog,He.lights,{emissive:{value:new We(0)}}]),vertexShader:ut.meshlambert_vert,fragmentShader:ut.meshlambert_frag},phong:{uniforms:fi([He.common,He.specularmap,He.envmap,He.aomap,He.lightmap,He.emissivemap,He.bumpmap,He.normalmap,He.displacementmap,He.fog,He.lights,{emissive:{value:new We(0)},specular:{value:new We(1118481)},shininess:{value:30}}]),vertexShader:ut.meshphong_vert,fragmentShader:ut.meshphong_frag},standard:{uniforms:fi([He.common,He.envmap,He.aomap,He.lightmap,He.emissivemap,He.bumpmap,He.normalmap,He.displacementmap,He.roughnessmap,He.metalnessmap,He.fog,He.lights,{emissive:{value:new We(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ut.meshphysical_vert,fragmentShader:ut.meshphysical_frag},toon:{uniforms:fi([He.common,He.aomap,He.lightmap,He.emissivemap,He.bumpmap,He.normalmap,He.displacementmap,He.gradientmap,He.fog,He.lights,{emissive:{value:new We(0)}}]),vertexShader:ut.meshtoon_vert,fragmentShader:ut.meshtoon_frag},matcap:{uniforms:fi([He.common,He.bumpmap,He.normalmap,He.displacementmap,He.fog,{matcap:{value:null}}]),vertexShader:ut.meshmatcap_vert,fragmentShader:ut.meshmatcap_frag},points:{uniforms:fi([He.points,He.fog]),vertexShader:ut.points_vert,fragmentShader:ut.points_frag},dashed:{uniforms:fi([He.common,He.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ut.linedashed_vert,fragmentShader:ut.linedashed_frag},depth:{uniforms:fi([He.common,He.displacementmap]),vertexShader:ut.depth_vert,fragmentShader:ut.depth_frag},normal:{uniforms:fi([He.common,He.bumpmap,He.normalmap,He.displacementmap,{opacity:{value:1}}]),vertexShader:ut.meshnormal_vert,fragmentShader:ut.meshnormal_frag},sprite:{uniforms:fi([He.sprite,He.fog]),vertexShader:ut.sprite_vert,fragmentShader:ut.sprite_frag},background:{uniforms:{uvTransform:{value:new ot},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ut.background_vert,fragmentShader:ut.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ot}},vertexShader:ut.backgroundCube_vert,fragmentShader:ut.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ut.cube_vert,fragmentShader:ut.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ut.equirect_vert,fragmentShader:ut.equirect_frag},distanceRGBA:{uniforms:fi([He.common,He.displacementmap,{referencePosition:{value:new B},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ut.distanceRGBA_vert,fragmentShader:ut.distanceRGBA_frag},shadow:{uniforms:fi([He.lights,He.fog,{color:{value:new We(0)},opacity:{value:1}}]),vertexShader:ut.shadow_vert,fragmentShader:ut.shadow_frag}};Lr.physical={uniforms:fi([Lr.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ot},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ot},clearcoatNormalScale:{value:new Te(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ot},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ot},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ot},sheen:{value:0},sheenColor:{value:new We(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ot},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ot},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ot},transmissionSamplerSize:{value:new Te},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ot},attenuationDistance:{value:0},attenuationColor:{value:new We(0)},specularColor:{value:new We(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ot},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ot},anisotropyVector:{value:new Te},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ot}}]),vertexShader:ut.meshphysical_vert,fragmentShader:ut.meshphysical_frag};const op={r:0,b:0,g:0},Sa=new lr,IG=new rt;function LG(i,e,t,n,r,s,o){const a=new We(0);let l=s===!0?0:1,c,u,h=null,d=0,f=null;function p(x){let y=x.isScene===!0?x.background:null;return y&&y.isTexture&&(y=(x.backgroundBlurriness>0?t:e).get(y)),y}function m(x){let y=!1;const v=p(x);v===null?_(a,l):v&&v.isColor&&(_(v,1),y=!0);const w=i.xr.getEnvironmentBlendMode();w==="additive"?n.buffers.color.setClear(0,0,0,1,o):w==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function g(x,y){const v=p(y);v&&(v.isCubeTexture||v.mapping===cu)?(u===void 0&&(u=new mn(new Ml(1,1,1),new Wr({name:"BackgroundCubeMaterial",uniforms:eu(Lr.backgroundCube.uniforms),vertexShader:Lr.backgroundCube.vertexShader,fragmentShader:Lr.backgroundCube.fragmentShader,side:bi,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(w,T,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),Sa.copy(y.backgroundRotation),Sa.x*=-1,Sa.y*=-1,Sa.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Sa.y*=-1,Sa.z*=-1),u.material.uniforms.envMap.value=v,u.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(IG.makeRotationFromEuler(Sa)),u.material.toneMapped=Pt.getTransfer(v.colorSpace)!==$t,(h!==v||d!==v.version||f!==i.toneMapping)&&(u.material.needsUpdate=!0,h=v,d=v.version,f=i.toneMapping),u.layers.enableAll(),x.unshift(u,u.geometry,u.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new mn(new hu(2,2),new Wr({name:"BackgroundMaterial",uniforms:eu(Lr.background.uniforms),vertexShader:Lr.background.vertexShader,fragmentShader:Lr.background.fragmentShader,side:eo,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=Pt.getTransfer(v.colorSpace)!==$t,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(h!==v||d!==v.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,h=v,d=v.version,f=i.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null))}function _(x,y){x.getRGB(op,HP(i)),n.buffers.color.setClear(op.r,op.g,op.b,y,o)}return{getClearColor:function(){return a},setClearColor:function(x,y=1){a.set(x),l=y,_(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(x){l=x,_(a,l)},render:m,addToRenderList:g}}function FG(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=d(null);let s=r,o=!1;function a(b,R,L,F,H){let W=!1;const N=h(F,L,R);s!==N&&(s=N,c(s.object)),W=f(b,F,L,H),W&&p(b,F,L,H),H!==null&&e.update(H,i.ELEMENT_ARRAY_BUFFER),(W||o)&&(o=!1,v(b,R,L,F),H!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(H).buffer))}function l(){return i.createVertexArray()}function c(b){return i.bindVertexArray(b)}function u(b){return i.deleteVertexArray(b)}function h(b,R,L){const F=L.wireframe===!0;let H=n[b.id];H===void 0&&(H={},n[b.id]=H);let W=H[R.id];W===void 0&&(W={},H[R.id]=W);let N=W[F];return N===void 0&&(N=d(l()),W[F]=N),N}function d(b){const R=[],L=[],F=[];for(let H=0;H<t;H++)R[H]=0,L[H]=0,F[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:L,attributeDivisors:F,object:b,attributes:{},index:null}}function f(b,R,L,F){const H=s.attributes,W=R.attributes;let N=0;const $=L.getAttributes();for(const X in $)if($[X].location>=0){const z=H[X];let ue=W[X];if(ue===void 0&&(X==="instanceMatrix"&&b.instanceMatrix&&(ue=b.instanceMatrix),X==="instanceColor"&&b.instanceColor&&(ue=b.instanceColor)),z===void 0||z.attribute!==ue||ue&&z.data!==ue.data)return!0;N++}return s.attributesNum!==N||s.index!==F}function p(b,R,L,F){const H={},W=R.attributes;let N=0;const $=L.getAttributes();for(const X in $)if($[X].location>=0){let z=W[X];z===void 0&&(X==="instanceMatrix"&&b.instanceMatrix&&(z=b.instanceMatrix),X==="instanceColor"&&b.instanceColor&&(z=b.instanceColor));const ue={};ue.attribute=z,z&&z.data&&(ue.data=z.data),H[X]=ue,N++}s.attributes=H,s.attributesNum=N,s.index=F}function m(){const b=s.newAttributes;for(let R=0,L=b.length;R<L;R++)b[R]=0}function g(b){_(b,0)}function _(b,R){const L=s.newAttributes,F=s.enabledAttributes,H=s.attributeDivisors;L[b]=1,F[b]===0&&(i.enableVertexAttribArray(b),F[b]=1),H[b]!==R&&(i.vertexAttribDivisor(b,R),H[b]=R)}function x(){const b=s.newAttributes,R=s.enabledAttributes;for(let L=0,F=R.length;L<F;L++)R[L]!==b[L]&&(i.disableVertexAttribArray(L),R[L]=0)}function y(b,R,L,F,H,W,N){N===!0?i.vertexAttribIPointer(b,R,L,H,W):i.vertexAttribPointer(b,R,L,F,H,W)}function v(b,R,L,F){m();const H=F.attributes,W=L.getAttributes(),N=R.defaultAttributeValues;for(const $ in W){const X=W[$];if(X.location>=0){let Z=H[$];if(Z===void 0&&($==="instanceMatrix"&&b.instanceMatrix&&(Z=b.instanceMatrix),$==="instanceColor"&&b.instanceColor&&(Z=b.instanceColor)),Z!==void 0){const z=Z.normalized,ue=Z.itemSize,me=e.get(Z);if(me===void 0)continue;const Ue=me.buffer,ie=me.type,le=me.bytesPerElement,ye=ie===i.INT||ie===i.UNSIGNED_INT||Z.gpuType===Qg;if(Z.isInterleavedBufferAttribute){const Y=Z.data,ae=Y.stride,de=Z.offset;if(Y.isInstancedInterleavedBuffer){for(let be=0;be<X.locationSize;be++)_(X.location+be,Y.meshPerAttribute);b.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let be=0;be<X.locationSize;be++)g(X.location+be);i.bindBuffer(i.ARRAY_BUFFER,Ue);for(let be=0;be<X.locationSize;be++)y(X.location+be,ue/X.locationSize,ie,z,ae*le,(de+ue/X.locationSize*be)*le,ye)}else{if(Z.isInstancedBufferAttribute){for(let Y=0;Y<X.locationSize;Y++)_(X.location+Y,Z.meshPerAttribute);b.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let Y=0;Y<X.locationSize;Y++)g(X.location+Y);i.bindBuffer(i.ARRAY_BUFFER,Ue);for(let Y=0;Y<X.locationSize;Y++)y(X.location+Y,ue/X.locationSize,ie,z,ue*le,ue/X.locationSize*Y*le,ye)}}else if(N!==void 0){const z=N[$];if(z!==void 0)switch(z.length){case 2:i.vertexAttrib2fv(X.location,z);break;case 3:i.vertexAttrib3fv(X.location,z);break;case 4:i.vertexAttrib4fv(X.location,z);break;default:i.vertexAttrib1fv(X.location,z)}}}}x()}function w(){C();for(const b in n){const R=n[b];for(const L in R){const F=R[L];for(const H in F)u(F[H].object),delete F[H];delete R[L]}delete n[b]}}function T(b){if(n[b.id]===void 0)return;const R=n[b.id];for(const L in R){const F=R[L];for(const H in F)u(F[H].object),delete F[H];delete R[L]}delete n[b.id]}function A(b){for(const R in n){const L=n[R];if(L[b.id]===void 0)continue;const F=L[b.id];for(const H in F)u(F[H].object),delete F[H];delete L[b.id]}}function C(){M(),o=!0,s!==r&&(s=r,c(s.object))}function M(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:C,resetDefaultState:M,dispose:w,releaseStatesOfGeometry:T,releaseStatesOfProgram:A,initAttributes:m,enableAttribute:g,disableUnusedAttributes:x}}function OG(i,e,t){let n;function r(c){n=c}function s(c,u){i.drawArrays(n,c,u),t.update(u,n,1)}function o(c,u,h){h!==0&&(i.drawArraysInstanced(n,c,u,h),t.update(u,n,h))}function a(c,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,h);let f=0;for(let p=0;p<h;p++)f+=u[p];t.update(f,n,1)}function l(c,u,h,d){if(h===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let p=0;p<c.length;p++)o(c[p],u[p],d[p]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,u,0,d,0,h);let p=0;for(let m=0;m<h;m++)p+=u[m];for(let m=0;m<d.length;m++)t.update(p,n,d[m])}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function NG(i,e,t,n){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const T=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(T){return!(T!==vi&&n.convert(T)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(T){const A=T===uu&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(T!==ms&&n.convert(T)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==Ci&&!A)}function l(T){if(T==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const h=t.logarithmicDepthBuffer===!0,d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),f=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),g=i.getParameter(i.MAX_VERTEX_ATTRIBS),_=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),x=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),v=f>0,w=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:h,maxTextures:d,maxVertexTextures:f,maxTextureSize:p,maxCubemapSize:m,maxAttributes:g,maxVertexUniforms:_,maxVaryings:x,maxFragmentUniforms:y,vertexTextures:v,maxSamples:w}}function UG(i){const e=this;let t=null,n=0,r=!1,s=!1;const o=new No,a=new ot,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const f=h.length!==0||d||n!==0||r;return r=d,n=h.length,f},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,d){t=u(h,d,0)},this.setState=function(h,d,f){const p=h.clippingPlanes,m=h.clipIntersection,g=h.clipShadows,_=i.get(h);if(!r||p===null||p.length===0||s&&!g)s?u(null):c();else{const x=s?0:n,y=x*4;let v=_.clippingState||null;l.value=v,v=u(p,d,y,f);for(let w=0;w!==y;++w)v[w]=t[w];_.clippingState=v,this.numIntersection=m?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,d,f,p){const m=h!==null?h.length:0;let g=null;if(m!==0){if(g=l.value,p!==!0||g===null){const _=f+m*4,x=d.matrixWorldInverse;a.getNormalMatrix(x),(g===null||g.length<_)&&(g=new Float32Array(_));for(let y=0,v=f;y!==m;++y,v+=4)o.copy(h[y]).applyMatrix4(x,a),o.normal.toArray(g,v),g[v+3]=o.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=m,e.numIntersection=0,g}}function kG(i){let e=new WeakMap;function t(o,a){return a===gh?o.mapping=to:a===_h&&(o.mapping=sa),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===gh||a===_h)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new WP(l.height);return c.fromEquirectangularTexture(i,o),e.set(o,c),o.addEventListener("dispose",r),t(c.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}class du extends ed{constructor(e=-1,t=1,n=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-e,o=n+e,a=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const yc=4,k1=[.125,.215,.35,.446,.526,.582],Ba=20,K0=new du,B1=new We;let Z0=null,J0=0,Q0=0,ey=!1;const Na=(1+Math.sqrt(5))/2,Kl=1/Na,z1=[new B(-Na,Kl,0),new B(Na,Kl,0),new B(-Kl,0,Na),new B(Kl,0,Na),new B(0,Na,-Kl),new B(0,Na,Kl),new B(-1,1,-1),new B(1,1,-1),new B(-1,1,1),new B(1,1,1)];class Zv{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100){Z0=this._renderer.getRenderTarget(),J0=this._renderer.getActiveCubeFace(),Q0=this._renderer.getActiveMipmapLevel(),ey=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=G1(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=V1(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Z0,J0,Q0),this._renderer.xr.enabled=ey,e.scissorTest=!1,ap(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===to||e.mapping===sa?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Z0=this._renderer.getRenderTarget(),J0=this._renderer.getActiveCubeFace(),Q0=this._renderer.getActiveMipmapLevel(),ey=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:wn,minFilter:wn,generateMipmaps:!1,type:uu,format:vi,colorSpace:lo,depthBuffer:!1},r=H1(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=H1(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=BG(s)),this._blurMaterial=zG(s,e,t)}return r}_compileMaterial(e){const t=new mn(this._lodPlanes[0],e);this._renderer.compile(t,K0)}_sceneToCubeUV(e,t,n,r){const a=new bn(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,d=u.toneMapping;u.getClearColor(B1),u.toneMapping=qs,u.autoClear=!1;const f=new co({name:"PMREM.Background",side:bi,depthWrite:!1,depthTest:!1}),p=new mn(new Ml,f);let m=!1;const g=e.background;g?g.isColor&&(f.color.copy(g),e.background=null,m=!0):(f.color.copy(B1),m=!0);for(let _=0;_<6;_++){const x=_%3;x===0?(a.up.set(0,l[_],0),a.lookAt(c[_],0,0)):x===1?(a.up.set(0,0,l[_]),a.lookAt(0,c[_],0)):(a.up.set(0,l[_],0),a.lookAt(0,0,c[_]));const y=this._cubeSize;ap(r,x*y,_>2?y:0,y,y),u.setRenderTarget(r),m&&u.render(p,a),u.render(e,a)}p.geometry.dispose(),p.material.dispose(),u.toneMapping=d,u.autoClear=h,e.background=g}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===to||e.mapping===sa;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=G1()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=V1());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new mn(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;ap(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,K0)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=z1[(r-s-1)%z1.length];this._blur(e,s-1,s,o,a)}t.autoClear=n}_blur(e,t,n,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,r,"latitudinal",s),this._halfBlur(o,e,n,n,r,"longitudinal",s)}_halfBlur(e,t,n,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new mn(this._lodPlanes[r],c),d=c.uniforms,f=this._sizeLods[n]-1,p=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*Ba-1),m=s/p,g=isFinite(s)?1+Math.floor(u*m):Ba;g>Ba&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Ba}`);const _=[];let x=0;for(let A=0;A<Ba;++A){const C=A/m,M=Math.exp(-C*C/2);_.push(M),A===0?x+=M:A<g&&(x+=2*M)}for(let A=0;A<_.length;A++)_[A]=_[A]/x;d.envMap.value=e.texture,d.samples.value=g,d.weights.value=_,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:y}=this;d.dTheta.value=p,d.mipInt.value=y-n;const v=this._sizeLods[r],w=3*v*(r>y-yc?r-y+yc:0),T=4*(this._cubeSize-v);ap(t,w,T,3*v,2*v),l.setRenderTarget(t),l.render(h,K0)}}function BG(i){const e=[],t=[],n=[];let r=i;const s=i-yc+1+k1.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);t.push(a);let l=1/a;o>i-yc?l=k1[o-i+yc-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),u=-c,h=1+c,d=[u,u,h,u,h,h,u,u,h,h,u,h],f=6,p=6,m=3,g=2,_=1,x=new Float32Array(m*p*f),y=new Float32Array(g*p*f),v=new Float32Array(_*p*f);for(let T=0;T<f;T++){const A=T%3*2/3-1,C=T>2?0:-1,M=[A,C,0,A+2/3,C,0,A+2/3,C+1,0,A,C,0,A+2/3,C+1,0,A,C+1,0];x.set(M,m*p*T),y.set(d,g*p*T);const b=[T,T,T,T,T,T];v.set(b,_*p*T)}const w=new ht;w.setAttribute("position",new Bt(x,m)),w.setAttribute("uv",new Bt(y,g)),w.setAttribute("faceIndex",new Bt(v,_)),e.push(w),r>yc&&r--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function H1(i,e,t){const n=new Gr(i,e,t);return n.texture.mapping=cu,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ap(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function zG(i,e,t){const n=new Float32Array(Ba),r=new B(0,1,0);return new Wr({name:"SphericalGaussianBlur",defines:{n:Ba,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Jb(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:$s,depthTest:!1,depthWrite:!1})}function V1(){return new Wr({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Jb(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:$s,depthTest:!1,depthWrite:!1})}function G1(){return new Wr({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Jb(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:$s,depthTest:!1,depthWrite:!1})}function Jb(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function HG(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===gh||l===_h,u=l===to||l===sa;if(c||u){let h=e.get(a);const d=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return t===null&&(t=new Zv(i)),h=c?t.fromEquirectangular(a,h):t.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),h.texture;if(h!==void 0)return h.texture;{const f=a.image;return c&&f&&f.height>0||u&&f&&r(f)?(t===null&&(t=new Zv(i)),h=c?t.fromEquirectangular(a):t.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),a.addEventListener("dispose",s),h.texture):null}}}return a}function r(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function VG(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const r=t(n);return r===null&&Oc("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function GG(i,e,t,n){const r={},s=new WeakMap;function o(h){const d=h.target;d.index!==null&&e.remove(d.index);for(const p in d.attributes)e.remove(d.attributes[p]);for(const p in d.morphAttributes){const m=d.morphAttributes[p];for(let g=0,_=m.length;g<_;g++)e.remove(m[g])}d.removeEventListener("dispose",o),delete r[d.id];const f=s.get(d);f&&(e.remove(f),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(h,d){return r[d.id]===!0||(d.addEventListener("dispose",o),r[d.id]=!0,t.memory.geometries++),d}function l(h){const d=h.attributes;for(const p in d)e.update(d[p],i.ARRAY_BUFFER);const f=h.morphAttributes;for(const p in f){const m=f[p];for(let g=0,_=m.length;g<_;g++)e.update(m[g],i.ARRAY_BUFFER)}}function c(h){const d=[],f=h.index,p=h.attributes.position;let m=0;if(f!==null){const x=f.array;m=f.version;for(let y=0,v=x.length;y<v;y+=3){const w=x[y+0],T=x[y+1],A=x[y+2];d.push(w,T,T,A,A,w)}}else if(p!==void 0){const x=p.array;m=p.version;for(let y=0,v=x.length/3-1;y<v;y+=3){const w=y+0,T=y+1,A=y+2;d.push(w,T,T,A,A,w)}}else return;const g=new(NP(d)?Zb:Kb)(d,1);g.version=m;const _=s.get(h);_&&e.remove(_),s.set(h,g)}function u(h){const d=s.get(h);if(d){const f=h.index;f!==null&&d.version<f.version&&c(h)}else c(h);return s.get(h)}return{get:a,update:l,getWireframeAttribute:u}}function WG(i,e,t){let n;function r(d){n=d}let s,o;function a(d){s=d.type,o=d.bytesPerElement}function l(d,f){i.drawElements(n,f,s,d*o),t.update(f,n,1)}function c(d,f,p){p!==0&&(i.drawElementsInstanced(n,f,s,d*o,p),t.update(f,n,p))}function u(d,f,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,s,d,0,p);let g=0;for(let _=0;_<p;_++)g+=f[_];t.update(g,n,1)}function h(d,f,p,m){if(p===0)return;const g=e.get("WEBGL_multi_draw");if(g===null)for(let _=0;_<d.length;_++)c(d[_]/o,f[_],m[_]);else{g.multiDrawElementsInstancedWEBGL(n,f,0,s,d,0,m,0,p);let _=0;for(let x=0;x<p;x++)_+=f[x];for(let x=0;x<m.length;x++)t.update(_,n,m[x])}}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function XG(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(s/3);break;case i.LINES:t.lines+=a*(s/2);break;case i.LINE_STRIP:t.lines+=a*(s-1);break;case i.LINE_LOOP:t.lines+=a*s;break;case i.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function $G(i,e,t){const n=new WeakMap,r=new Nt;function s(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0;let d=n.get(a);if(d===void 0||d.count!==h){let M=function(){A.dispose(),n.delete(a),a.removeEventListener("dispose",M)};d!==void 0&&d.texture.dispose();const f=a.morphAttributes.position!==void 0,p=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],_=a.morphAttributes.normal||[],x=a.morphAttributes.color||[];let y=0;f===!0&&(y=1),p===!0&&(y=2),m===!0&&(y=3);let v=a.attributes.position.count*y,w=1;v>e.maxTextureSize&&(w=Math.ceil(v/e.maxTextureSize),v=e.maxTextureSize);const T=new Float32Array(v*w*4*h),A=new a_(T,v,w,h);A.type=Ci,A.needsUpdate=!0;const C=y*4;for(let b=0;b<h;b++){const R=g[b],L=_[b],F=x[b],H=v*w*4*b;for(let W=0;W<R.count;W++){const N=W*C;f===!0&&(r.fromBufferAttribute(R,W),T[H+N+0]=r.x,T[H+N+1]=r.y,T[H+N+2]=r.z,T[H+N+3]=0),p===!0&&(r.fromBufferAttribute(L,W),T[H+N+4]=r.x,T[H+N+5]=r.y,T[H+N+6]=r.z,T[H+N+7]=0),m===!0&&(r.fromBufferAttribute(F,W),T[H+N+8]=r.x,T[H+N+9]=r.y,T[H+N+10]=r.z,T[H+N+11]=F.itemSize===4?r.w:1)}}d={count:h,texture:A,size:new Te(v,w)},n.set(a,d),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let f=0;for(let m=0;m<c.length;m++)f+=c[m];const p=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",p),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:s}}function qG(i,e,t,n){let r=new WeakMap;function s(l){const c=n.render.frame,u=l.geometry,h=e.get(l,u);if(r.get(h)!==c&&(e.update(h),r.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;r.get(d)!==c&&(d.update(),r.set(d,c))}return h}function o(){r=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:o}}class Qb extends fn{constructor(e,t,n,r,s,o,a,l,c,u=ol){if(u!==ol&&u!==vl)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===ol&&(n=no),n===void 0&&u===vl&&(n=yl),super(null,r,s,o,a,l,u,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:Un,this.minFilter=l!==void 0?l:Un,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const $P=new fn,W1=new Qb(1,1),qP=new a_,YP=new jb,jP=new td,X1=[],$1=[],q1=new Float32Array(16),Y1=new Float32Array(9),j1=new Float32Array(4);function pu(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let s=X1[r];if(s===void 0&&(s=new Float32Array(r),X1[r]=s),e!==0){n.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(s,a)}return s}function Pn(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function In(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function c_(i,e){let t=$1[e];t===void 0&&(t=new Int32Array(e),$1[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function YG(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function jG(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pn(t,e))return;i.uniform2fv(this.addr,e),In(t,e)}}function KG(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Pn(t,e))return;i.uniform3fv(this.addr,e),In(t,e)}}function ZG(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pn(t,e))return;i.uniform4fv(this.addr,e),In(t,e)}}function JG(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Pn(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),In(t,e)}else{if(Pn(t,n))return;j1.set(n),i.uniformMatrix2fv(this.addr,!1,j1),In(t,n)}}function QG(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Pn(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),In(t,e)}else{if(Pn(t,n))return;Y1.set(n),i.uniformMatrix3fv(this.addr,!1,Y1),In(t,n)}}function eW(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Pn(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),In(t,e)}else{if(Pn(t,n))return;q1.set(n),i.uniformMatrix4fv(this.addr,!1,q1),In(t,n)}}function tW(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function nW(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pn(t,e))return;i.uniform2iv(this.addr,e),In(t,e)}}function iW(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Pn(t,e))return;i.uniform3iv(this.addr,e),In(t,e)}}function rW(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pn(t,e))return;i.uniform4iv(this.addr,e),In(t,e)}}function sW(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function oW(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pn(t,e))return;i.uniform2uiv(this.addr,e),In(t,e)}}function aW(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Pn(t,e))return;i.uniform3uiv(this.addr,e),In(t,e)}}function lW(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pn(t,e))return;i.uniform4uiv(this.addr,e),In(t,e)}}function cW(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(W1.compareFunction=qb,s=W1):s=$P,t.setTexture2D(e||s,r)}function uW(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||YP,r)}function fW(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||jP,r)}function hW(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||qP,r)}function dW(i){switch(i){case 5126:return YG;case 35664:return jG;case 35665:return KG;case 35666:return ZG;case 35674:return JG;case 35675:return QG;case 35676:return eW;case 5124:case 35670:return tW;case 35667:case 35671:return nW;case 35668:case 35672:return iW;case 35669:case 35673:return rW;case 5125:return sW;case 36294:return oW;case 36295:return aW;case 36296:return lW;case 35678:case 36198:case 36298:case 36306:case 35682:return cW;case 35679:case 36299:case 36307:return uW;case 35680:case 36300:case 36308:case 36293:return fW;case 36289:case 36303:case 36311:case 36292:return hW}}function pW(i,e){i.uniform1fv(this.addr,e)}function mW(i,e){const t=pu(e,this.size,2);i.uniform2fv(this.addr,t)}function gW(i,e){const t=pu(e,this.size,3);i.uniform3fv(this.addr,t)}function _W(i,e){const t=pu(e,this.size,4);i.uniform4fv(this.addr,t)}function yW(i,e){const t=pu(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function vW(i,e){const t=pu(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function xW(i,e){const t=pu(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function bW(i,e){i.uniform1iv(this.addr,e)}function SW(i,e){i.uniform2iv(this.addr,e)}function wW(i,e){i.uniform3iv(this.addr,e)}function MW(i,e){i.uniform4iv(this.addr,e)}function EW(i,e){i.uniform1uiv(this.addr,e)}function TW(i,e){i.uniform2uiv(this.addr,e)}function AW(i,e){i.uniform3uiv(this.addr,e)}function CW(i,e){i.uniform4uiv(this.addr,e)}function DW(i,e,t){const n=this.cache,r=e.length,s=c_(t,r);Pn(n,s)||(i.uniform1iv(this.addr,s),In(n,s));for(let o=0;o!==r;++o)t.setTexture2D(e[o]||$P,s[o])}function RW(i,e,t){const n=this.cache,r=e.length,s=c_(t,r);Pn(n,s)||(i.uniform1iv(this.addr,s),In(n,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||YP,s[o])}function PW(i,e,t){const n=this.cache,r=e.length,s=c_(t,r);Pn(n,s)||(i.uniform1iv(this.addr,s),In(n,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||jP,s[o])}function IW(i,e,t){const n=this.cache,r=e.length,s=c_(t,r);Pn(n,s)||(i.uniform1iv(this.addr,s),In(n,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||qP,s[o])}function LW(i){switch(i){case 5126:return pW;case 35664:return mW;case 35665:return gW;case 35666:return _W;case 35674:return yW;case 35675:return vW;case 35676:return xW;case 5124:case 35670:return bW;case 35667:case 35671:return SW;case 35668:case 35672:return wW;case 35669:case 35673:return MW;case 5125:return EW;case 36294:return TW;case 36295:return AW;case 36296:return CW;case 35678:case 36198:case 36298:case 36306:case 35682:return DW;case 35679:case 36299:case 36307:return RW;case 35680:case 36300:case 36308:case 36293:return PW;case 36289:case 36303:case 36311:case 36292:return IW}}class FW{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=dW(t.type)}}class OW{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=LW(t.type)}}class NW{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,t[a.id],n)}}}const ty=/(\w+)(\])?(\[|\.)?/g;function K1(i,e){i.seq.push(e),i.map[e.id]=e}function UW(i,e,t){const n=i.name,r=n.length;for(ty.lastIndex=0;;){const s=ty.exec(n),o=ty.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){K1(t,c===void 0?new FW(a,i,e):new OW(a,i,e));break}else{let h=t.map[a];h===void 0&&(h=new NW(a),K1(t,h)),t=h}}}class em{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const s=e.getActiveUniform(t,r),o=e.getUniformLocation(t,s.name);UW(s,o,this)}}setValue(e,t,n,r){const s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in t&&n.push(o)}return n}}function Z1(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const kW=37297;let BW=0;function zW(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}function HW(i){const e=Pt.getPrimaries(Pt.workingColorSpace),t=Pt.getPrimaries(i);let n;switch(e===t?n="":e===Mh&&t===wh?n="LinearDisplayP3ToLinearSRGB":e===wh&&t===Mh&&(n="LinearSRGBToLinearDisplayP3"),i){case lo:case Qh:return[n,"LinearTransferOETF"];case ji:case o_:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function J1(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=i.getShaderInfoLog(e).trim();if(n&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+zW(i.getShaderSource(e),o)}else return r}function VW(i,e){const t=HW(e);return`vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function GW(i,e){let t;switch(e){case gP:t="Linear";break;case _P:t="Reinhard";break;case yP:t="Cineon";break;case Ob:t="ACESFilmic";break;case xP:t="AgX";break;case bP:t="Neutral";break;case vP:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const lp=new B;function WW(){Pt.getLuminanceCoefficients(lp);const i=lp.x.toFixed(4),e=lp.y.toFixed(4),t=lp.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function XW(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(sf).join(`
`)}function $W(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function qW(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(e,r),o=s.name;let a=1;s.type===i.FLOAT_MAT2&&(a=2),s.type===i.FLOAT_MAT3&&(a=3),s.type===i.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function sf(i){return i!==""}function Q1(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function eE(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const YW=/^[ \t]*#include +<([\w\d./]+)>/gm;function Jv(i){return i.replace(YW,KW)}const jW=new Map;function KW(i,e){let t=ut[e];if(t===void 0){const n=jW.get(e);if(n!==void 0)t=ut[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Jv(t)}const ZW=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function tE(i){return i.replace(ZW,JW)}function JW(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function nE(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function QW(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Lb?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Fb?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Zr&&(e="SHADOWMAP_TYPE_VSM"),e}function e6(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case to:case sa:e="ENVMAP_TYPE_CUBE";break;case cu:e="ENVMAP_TYPE_CUBE_UV";break}return e}function t6(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case sa:e="ENVMAP_MODE_REFRACTION";break}return e}function n6(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Zh:e="ENVMAP_BLENDING_MULTIPLY";break;case pP:e="ENVMAP_BLENDING_MIX";break;case mP:e="ENVMAP_BLENDING_ADD";break}return e}function i6(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function r6(i,e,t,n){const r=i.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=QW(t),c=e6(t),u=t6(t),h=n6(t),d=i6(t),f=XW(t),p=$W(s),m=r.createProgram();let g,_,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(sf).join(`
`),g.length>0&&(g+=`
`),_=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(sf).join(`
`),_.length>0&&(_+=`
`)):(g=[nE(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(sf).join(`
`),_=[nE(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==qs?"#define TONE_MAPPING":"",t.toneMapping!==qs?ut.tonemapping_pars_fragment:"",t.toneMapping!==qs?GW("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ut.colorspace_pars_fragment,VW("linearToOutputTexel",t.outputColorSpace),WW(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(sf).join(`
`)),o=Jv(o),o=Q1(o,t),o=eE(o,t),a=Jv(a),a=Q1(a,t),a=eE(a,t),o=tE(o),a=tE(a),t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,_=["#define varying in",t.glslVersion===Kv?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Kv?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+_);const y=x+g+o,v=x+_+a,w=Z1(r,r.VERTEX_SHADER,y),T=Z1(r,r.FRAGMENT_SHADER,v);r.attachShader(m,w),r.attachShader(m,T),t.index0AttributeName!==void 0?r.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(m,0,"position"),r.linkProgram(m);function A(R){if(i.debug.checkShaderErrors){const L=r.getProgramInfoLog(m).trim(),F=r.getShaderInfoLog(w).trim(),H=r.getShaderInfoLog(T).trim();let W=!0,N=!0;if(r.getProgramParameter(m,r.LINK_STATUS)===!1)if(W=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,m,w,T);else{const $=J1(r,w,"vertex"),X=J1(r,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(m,r.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+L+`
`+$+`
`+X)}else L!==""?console.warn("THREE.WebGLProgram: Program Info Log:",L):(F===""||H==="")&&(N=!1);N&&(R.diagnostics={runnable:W,programLog:L,vertexShader:{log:F,prefix:g},fragmentShader:{log:H,prefix:_}})}r.deleteShader(w),r.deleteShader(T),C=new em(r,m),M=qW(r,m)}let C;this.getUniforms=function(){return C===void 0&&A(this),C};let M;this.getAttributes=function(){return M===void 0&&A(this),M};let b=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=r.getProgramParameter(m,kW)),b},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=BW++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=w,this.fragmentShader=T,this}let s6=0;class o6{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new a6(e),t.set(e,n)),n}}class a6{constructor(e){this.id=s6++,this.code=e,this.usedTimes=0}}function l6(i,e,t,n,r,s,o){const a=new l_,l=new o6,c=new Set,u=[],h=r.logarithmicDepthBuffer,d=r.vertexTextures;let f=r.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(M){return c.add(M),M===0?"uv":`uv${M}`}function g(M,b,R,L,F){const H=L.fog,W=F.geometry,N=M.isMeshStandardMaterial?L.environment:null,$=(M.isMeshStandardMaterial?t:e).get(M.envMap||N),X=$&&$.mapping===cu?$.image.height:null,Z=p[M.type];M.precision!==null&&(f=r.getMaxPrecision(M.precision),f!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",f,"instead."));const z=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,ue=z!==void 0?z.length:0;let me=0;W.morphAttributes.position!==void 0&&(me=1),W.morphAttributes.normal!==void 0&&(me=2),W.morphAttributes.color!==void 0&&(me=3);let Ue,ie,le,ye;if(Z){const _e=Lr[Z];Ue=_e.vertexShader,ie=_e.fragmentShader}else Ue=M.vertexShader,ie=M.fragmentShader,l.update(M),le=l.getVertexShaderID(M),ye=l.getFragmentShaderID(M);const Y=i.getRenderTarget(),ae=F.isInstancedMesh===!0,de=F.isBatchedMesh===!0,be=!!M.map,Re=!!M.matcap,E=!!$,P=!!M.aoMap,O=!!M.lightMap,V=!!M.bumpMap,q=!!M.normalMap,U=!!M.displacementMap,se=!!M.emissiveMap,G=!!M.metalnessMap,D=!!M.roughnessMap,S=M.anisotropy>0,k=M.clearcoat>0,K=M.dispersion>0,J=M.iridescence>0,ne=M.sheen>0,Me=M.transmission>0,he=S&&!!M.anisotropyMap,we=k&&!!M.clearcoatMap,Ie=k&&!!M.clearcoatNormalMap,ge=k&&!!M.clearcoatRoughnessMap,Le=J&&!!M.iridescenceMap,De=J&&!!M.iridescenceThicknessMap,Ke=ne&&!!M.sheenColorMap,Ne=ne&&!!M.sheenRoughnessMap,ze=!!M.specularMap,Ye=!!M.specularColorMap,lt=!!M.specularIntensityMap,Q=Me&&!!M.transmissionMap,ve=Me&&!!M.thicknessMap,Se=!!M.gradientMap,xe=!!M.alphaMap,Ee=M.alphaTest>0,Ve=!!M.alphaHash,it=!!M.extensions;let Fe=qs;M.toneMapped&&(Y===null||Y.isXRRenderTarget===!0)&&(Fe=i.toneMapping);const j={shaderID:Z,shaderType:M.type,shaderName:M.name,vertexShader:Ue,fragmentShader:ie,defines:M.defines,customVertexShaderID:le,customFragmentShaderID:ye,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:f,batching:de,batchingColor:de&&F._colorsTexture!==null,instancing:ae,instancingColor:ae&&F.instanceColor!==null,instancingMorph:ae&&F.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:Y===null?i.outputColorSpace:Y.isXRRenderTarget===!0?Y.texture.colorSpace:lo,alphaToCoverage:!!M.alphaToCoverage,map:be,matcap:Re,envMap:E,envMapMode:E&&$.mapping,envMapCubeUVHeight:X,aoMap:P,lightMap:O,bumpMap:V,normalMap:q,displacementMap:d&&U,emissiveMap:se,normalMapObjectSpace:q&&M.normalMapType===CP,normalMapTangentSpace:q&&M.normalMapType===la,metalnessMap:G,roughnessMap:D,anisotropy:S,anisotropyMap:he,clearcoat:k,clearcoatMap:we,clearcoatNormalMap:Ie,clearcoatRoughnessMap:ge,dispersion:K,iridescence:J,iridescenceMap:Le,iridescenceThicknessMap:De,sheen:ne,sheenColorMap:Ke,sheenRoughnessMap:Ne,specularMap:ze,specularColorMap:Ye,specularIntensityMap:lt,transmission:Me,transmissionMap:Q,thicknessMap:ve,gradientMap:Se,opaque:M.transparent===!1&&M.blending===sl&&M.alphaToCoverage===!1,alphaMap:xe,alphaTest:Ee,alphaHash:Ve,combine:M.combine,mapUv:be&&m(M.map.channel),aoMapUv:P&&m(M.aoMap.channel),lightMapUv:O&&m(M.lightMap.channel),bumpMapUv:V&&m(M.bumpMap.channel),normalMapUv:q&&m(M.normalMap.channel),displacementMapUv:U&&m(M.displacementMap.channel),emissiveMapUv:se&&m(M.emissiveMap.channel),metalnessMapUv:G&&m(M.metalnessMap.channel),roughnessMapUv:D&&m(M.roughnessMap.channel),anisotropyMapUv:he&&m(M.anisotropyMap.channel),clearcoatMapUv:we&&m(M.clearcoatMap.channel),clearcoatNormalMapUv:Ie&&m(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ge&&m(M.clearcoatRoughnessMap.channel),iridescenceMapUv:Le&&m(M.iridescenceMap.channel),iridescenceThicknessMapUv:De&&m(M.iridescenceThicknessMap.channel),sheenColorMapUv:Ke&&m(M.sheenColorMap.channel),sheenRoughnessMapUv:Ne&&m(M.sheenRoughnessMap.channel),specularMapUv:ze&&m(M.specularMap.channel),specularColorMapUv:Ye&&m(M.specularColorMap.channel),specularIntensityMapUv:lt&&m(M.specularIntensityMap.channel),transmissionMapUv:Q&&m(M.transmissionMap.channel),thicknessMapUv:ve&&m(M.thicknessMap.channel),alphaMapUv:xe&&m(M.alphaMap.channel),vertexTangents:!!W.attributes.tangent&&(q||S),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!W.attributes.uv&&(be||xe),fog:!!H,useFog:M.fog===!0,fogExp2:!!H&&H.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:h,skinning:F.isSkinnedMesh===!0,morphTargets:W.morphAttributes.position!==void 0,morphNormals:W.morphAttributes.normal!==void 0,morphColors:W.morphAttributes.color!==void 0,morphTargetsCount:ue,morphTextureStride:me,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:i.shadowMap.enabled&&R.length>0,shadowMapType:i.shadowMap.type,toneMapping:Fe,decodeVideoTexture:be&&M.map.isVideoTexture===!0&&Pt.getTransfer(M.map.colorSpace)===$t,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===Nr,flipSided:M.side===bi,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:it&&M.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(it&&M.extensions.multiDraw===!0||de)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return j.vertexUv1s=c.has(1),j.vertexUv2s=c.has(2),j.vertexUv3s=c.has(3),c.clear(),j}function _(M){const b=[];if(M.shaderID?b.push(M.shaderID):(b.push(M.customVertexShaderID),b.push(M.customFragmentShaderID)),M.defines!==void 0)for(const R in M.defines)b.push(R),b.push(M.defines[R]);return M.isRawShaderMaterial===!1&&(x(b,M),y(b,M),b.push(i.outputColorSpace)),b.push(M.customProgramCacheKey),b.join()}function x(M,b){M.push(b.precision),M.push(b.outputColorSpace),M.push(b.envMapMode),M.push(b.envMapCubeUVHeight),M.push(b.mapUv),M.push(b.alphaMapUv),M.push(b.lightMapUv),M.push(b.aoMapUv),M.push(b.bumpMapUv),M.push(b.normalMapUv),M.push(b.displacementMapUv),M.push(b.emissiveMapUv),M.push(b.metalnessMapUv),M.push(b.roughnessMapUv),M.push(b.anisotropyMapUv),M.push(b.clearcoatMapUv),M.push(b.clearcoatNormalMapUv),M.push(b.clearcoatRoughnessMapUv),M.push(b.iridescenceMapUv),M.push(b.iridescenceThicknessMapUv),M.push(b.sheenColorMapUv),M.push(b.sheenRoughnessMapUv),M.push(b.specularMapUv),M.push(b.specularColorMapUv),M.push(b.specularIntensityMapUv),M.push(b.transmissionMapUv),M.push(b.thicknessMapUv),M.push(b.combine),M.push(b.fogExp2),M.push(b.sizeAttenuation),M.push(b.morphTargetsCount),M.push(b.morphAttributeCount),M.push(b.numDirLights),M.push(b.numPointLights),M.push(b.numSpotLights),M.push(b.numSpotLightMaps),M.push(b.numHemiLights),M.push(b.numRectAreaLights),M.push(b.numDirLightShadows),M.push(b.numPointLightShadows),M.push(b.numSpotLightShadows),M.push(b.numSpotLightShadowsWithMaps),M.push(b.numLightProbes),M.push(b.shadowMapType),M.push(b.toneMapping),M.push(b.numClippingPlanes),M.push(b.numClipIntersection),M.push(b.depthPacking)}function y(M,b){a.disableAll(),b.supportsVertexTextures&&a.enable(0),b.instancing&&a.enable(1),b.instancingColor&&a.enable(2),b.instancingMorph&&a.enable(3),b.matcap&&a.enable(4),b.envMap&&a.enable(5),b.normalMapObjectSpace&&a.enable(6),b.normalMapTangentSpace&&a.enable(7),b.clearcoat&&a.enable(8),b.iridescence&&a.enable(9),b.alphaTest&&a.enable(10),b.vertexColors&&a.enable(11),b.vertexAlphas&&a.enable(12),b.vertexUv1s&&a.enable(13),b.vertexUv2s&&a.enable(14),b.vertexUv3s&&a.enable(15),b.vertexTangents&&a.enable(16),b.anisotropy&&a.enable(17),b.alphaHash&&a.enable(18),b.batching&&a.enable(19),b.dispersion&&a.enable(20),b.batchingColor&&a.enable(21),M.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.skinning&&a.enable(4),b.morphTargets&&a.enable(5),b.morphNormals&&a.enable(6),b.morphColors&&a.enable(7),b.premultipliedAlpha&&a.enable(8),b.shadowMapEnabled&&a.enable(9),b.doubleSided&&a.enable(10),b.flipSided&&a.enable(11),b.useDepthPacking&&a.enable(12),b.dithering&&a.enable(13),b.transmission&&a.enable(14),b.sheen&&a.enable(15),b.opaque&&a.enable(16),b.pointsUvs&&a.enable(17),b.decodeVideoTexture&&a.enable(18),b.alphaToCoverage&&a.enable(19),M.push(a.mask)}function v(M){const b=p[M.type];let R;if(b){const L=Lr[b];R=VP.clone(L.uniforms)}else R=M.uniforms;return R}function w(M,b){let R;for(let L=0,F=u.length;L<F;L++){const H=u[L];if(H.cacheKey===b){R=H,++R.usedTimes;break}}return R===void 0&&(R=new r6(i,b,M,s),u.push(R)),R}function T(M){if(--M.usedTimes===0){const b=u.indexOf(M);u[b]=u[u.length-1],u.pop(),M.destroy()}}function A(M){l.remove(M)}function C(){l.dispose()}return{getParameters:g,getProgramCacheKey:_,getUniforms:v,acquireProgram:w,releaseProgram:T,releaseShaderCache:A,programs:u,dispose:C}}function c6(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function r(o,a,l){i.get(o)[a]=l}function s(){i=new WeakMap}return{has:e,get:t,remove:n,update:r,dispose:s}}function u6(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function iE(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function rE(){const i=[];let e=0;const t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function o(h,d,f,p,m,g){let _=i[e];return _===void 0?(_={id:h.id,object:h,geometry:d,material:f,groupOrder:p,renderOrder:h.renderOrder,z:m,group:g},i[e]=_):(_.id=h.id,_.object=h,_.geometry=d,_.material=f,_.groupOrder=p,_.renderOrder=h.renderOrder,_.z=m,_.group=g),e++,_}function a(h,d,f,p,m,g){const _=o(h,d,f,p,m,g);f.transmission>0?n.push(_):f.transparent===!0?r.push(_):t.push(_)}function l(h,d,f,p,m,g){const _=o(h,d,f,p,m,g);f.transmission>0?n.unshift(_):f.transparent===!0?r.unshift(_):t.unshift(_)}function c(h,d){t.length>1&&t.sort(h||u6),n.length>1&&n.sort(d||iE),r.length>1&&r.sort(d||iE)}function u(){for(let h=e,d=i.length;h<d;h++){const f=i[h];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:a,unshift:l,finish:u,sort:c}}function f6(){let i=new WeakMap;function e(n,r){const s=i.get(n);let o;return s===void 0?(o=new rE,i.set(n,[o])):r>=s.length?(o=new rE,s.push(o)):o=s[r],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function h6(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new B,color:new We};break;case"SpotLight":t={position:new B,direction:new B,color:new We,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new B,color:new We,distance:0,decay:0};break;case"HemisphereLight":t={direction:new B,skyColor:new We,groundColor:new We};break;case"RectAreaLight":t={color:new We,position:new B,halfWidth:new B,halfHeight:new B};break}return i[e.id]=t,t}}}function d6(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Te};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Te};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Te,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let p6=0;function m6(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function g6(i){const e=new h6,t=d6(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new B);const r=new B,s=new rt,o=new rt;function a(c){let u=0,h=0,d=0;for(let M=0;M<9;M++)n.probe[M].set(0,0,0);let f=0,p=0,m=0,g=0,_=0,x=0,y=0,v=0,w=0,T=0,A=0;c.sort(m6);for(let M=0,b=c.length;M<b;M++){const R=c[M],L=R.color,F=R.intensity,H=R.distance,W=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)u+=L.r*F,h+=L.g*F,d+=L.b*F;else if(R.isLightProbe){for(let N=0;N<9;N++)n.probe[N].addScaledVector(R.sh.coefficients[N],F);A++}else if(R.isDirectionalLight){const N=e.get(R);if(N.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const $=R.shadow,X=t.get(R);X.shadowIntensity=$.intensity,X.shadowBias=$.bias,X.shadowNormalBias=$.normalBias,X.shadowRadius=$.radius,X.shadowMapSize=$.mapSize,n.directionalShadow[f]=X,n.directionalShadowMap[f]=W,n.directionalShadowMatrix[f]=R.shadow.matrix,x++}n.directional[f]=N,f++}else if(R.isSpotLight){const N=e.get(R);N.position.setFromMatrixPosition(R.matrixWorld),N.color.copy(L).multiplyScalar(F),N.distance=H,N.coneCos=Math.cos(R.angle),N.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),N.decay=R.decay,n.spot[m]=N;const $=R.shadow;if(R.map&&(n.spotLightMap[w]=R.map,w++,$.updateMatrices(R),R.castShadow&&T++),n.spotLightMatrix[m]=$.matrix,R.castShadow){const X=t.get(R);X.shadowIntensity=$.intensity,X.shadowBias=$.bias,X.shadowNormalBias=$.normalBias,X.shadowRadius=$.radius,X.shadowMapSize=$.mapSize,n.spotShadow[m]=X,n.spotShadowMap[m]=W,v++}m++}else if(R.isRectAreaLight){const N=e.get(R);N.color.copy(L).multiplyScalar(F),N.halfWidth.set(R.width*.5,0,0),N.halfHeight.set(0,R.height*.5,0),n.rectArea[g]=N,g++}else if(R.isPointLight){const N=e.get(R);if(N.color.copy(R.color).multiplyScalar(R.intensity),N.distance=R.distance,N.decay=R.decay,R.castShadow){const $=R.shadow,X=t.get(R);X.shadowIntensity=$.intensity,X.shadowBias=$.bias,X.shadowNormalBias=$.normalBias,X.shadowRadius=$.radius,X.shadowMapSize=$.mapSize,X.shadowCameraNear=$.camera.near,X.shadowCameraFar=$.camera.far,n.pointShadow[p]=X,n.pointShadowMap[p]=W,n.pointShadowMatrix[p]=R.shadow.matrix,y++}n.point[p]=N,p++}else if(R.isHemisphereLight){const N=e.get(R);N.skyColor.copy(R.color).multiplyScalar(F),N.groundColor.copy(R.groundColor).multiplyScalar(F),n.hemi[_]=N,_++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=He.LTC_FLOAT_1,n.rectAreaLTC2=He.LTC_FLOAT_2):(n.rectAreaLTC1=He.LTC_HALF_1,n.rectAreaLTC2=He.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=d;const C=n.hash;(C.directionalLength!==f||C.pointLength!==p||C.spotLength!==m||C.rectAreaLength!==g||C.hemiLength!==_||C.numDirectionalShadows!==x||C.numPointShadows!==y||C.numSpotShadows!==v||C.numSpotMaps!==w||C.numLightProbes!==A)&&(n.directional.length=f,n.spot.length=m,n.rectArea.length=g,n.point.length=p,n.hemi.length=_,n.directionalShadow.length=x,n.directionalShadowMap.length=x,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=x,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=v+w-T,n.spotLightMap.length=w,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=A,C.directionalLength=f,C.pointLength=p,C.spotLength=m,C.rectAreaLength=g,C.hemiLength=_,C.numDirectionalShadows=x,C.numPointShadows=y,C.numSpotShadows=v,C.numSpotMaps=w,C.numLightProbes=A,n.version=p6++)}function l(c,u){let h=0,d=0,f=0,p=0,m=0;const g=u.matrixWorldInverse;for(let _=0,x=c.length;_<x;_++){const y=c[_];if(y.isDirectionalLight){const v=n.directional[h];v.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),v.direction.sub(r),v.direction.transformDirection(g),h++}else if(y.isSpotLight){const v=n.spot[f];v.position.setFromMatrixPosition(y.matrixWorld),v.position.applyMatrix4(g),v.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),v.direction.sub(r),v.direction.transformDirection(g),f++}else if(y.isRectAreaLight){const v=n.rectArea[p];v.position.setFromMatrixPosition(y.matrixWorld),v.position.applyMatrix4(g),o.identity(),s.copy(y.matrixWorld),s.premultiply(g),o.extractRotation(s),v.halfWidth.set(y.width*.5,0,0),v.halfHeight.set(0,y.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),p++}else if(y.isPointLight){const v=n.point[d];v.position.setFromMatrixPosition(y.matrixWorld),v.position.applyMatrix4(g),d++}else if(y.isHemisphereLight){const v=n.hemi[m];v.direction.setFromMatrixPosition(y.matrixWorld),v.direction.transformDirection(g),m++}}}return{setup:a,setupView:l,state:n}}function sE(i){const e=new g6(i),t=[],n=[];function r(u){c.camera=u,t.length=0,n.length=0}function s(u){t.push(u)}function o(u){n.push(u)}function a(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function _6(i){let e=new WeakMap;function t(r,s=0){const o=e.get(r);let a;return o===void 0?(a=new sE(i),e.set(r,[a])):s>=o.length?(a=new sE(i),o.push(a)):a=o[s],a}function n(){e=new WeakMap}return{get:t,dispose:n}}class eS extends si{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=TP,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class tS extends si{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const y6=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,v6=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function x6(i,e,t){let n=new nd;const r=new Te,s=new Te,o=new Nt,a=new eS({depthPacking:AP}),l=new tS,c={},u=t.maxTextureSize,h={[eo]:bi,[bi]:eo,[Nr]:Nr},d=new Wr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Te},radius:{value:4}},vertexShader:y6,fragmentShader:v6}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const p=new ht;p.setAttribute("position",new Bt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const m=new mn(p,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Lb;let _=this.type;this.render=function(T,A,C){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||T.length===0)return;const M=i.getRenderTarget(),b=i.getActiveCubeFace(),R=i.getActiveMipmapLevel(),L=i.state;L.setBlending($s),L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);const F=_!==Zr&&this.type===Zr,H=_===Zr&&this.type!==Zr;for(let W=0,N=T.length;W<N;W++){const $=T[W],X=$.shadow;if(X===void 0){console.warn("THREE.WebGLShadowMap:",$,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;r.copy(X.mapSize);const Z=X.getFrameExtents();if(r.multiply(Z),s.copy(X.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/Z.x),r.x=s.x*Z.x,X.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/Z.y),r.y=s.y*Z.y,X.mapSize.y=s.y)),X.map===null||F===!0||H===!0){const ue=this.type!==Zr?{minFilter:Un,magFilter:Un}:{};X.map!==null&&X.map.dispose(),X.map=new Gr(r.x,r.y,ue),X.map.texture.name=$.name+".shadowMap",X.camera.updateProjectionMatrix()}i.setRenderTarget(X.map),i.clear();const z=X.getViewportCount();for(let ue=0;ue<z;ue++){const me=X.getViewport(ue);o.set(s.x*me.x,s.y*me.y,s.x*me.z,s.y*me.w),L.viewport(o),X.updateMatrices($,ue),n=X.getFrustum(),v(A,C,X.camera,$,this.type)}X.isPointLightShadow!==!0&&this.type===Zr&&x(X,C),X.needsUpdate=!1}_=this.type,g.needsUpdate=!1,i.setRenderTarget(M,b,R)};function x(T,A){const C=e.update(m);d.defines.VSM_SAMPLES!==T.blurSamples&&(d.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Gr(r.x,r.y)),d.uniforms.shadow_pass.value=T.map.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(A,null,C,d,m,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(A,null,C,f,m,null)}function y(T,A,C,M){let b=null;const R=C.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(R!==void 0)b=R;else if(b=C.isPointLight===!0?l:a,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const L=b.uuid,F=A.uuid;let H=c[L];H===void 0&&(H={},c[L]=H);let W=H[F];W===void 0&&(W=b.clone(),H[F]=W,A.addEventListener("dispose",w)),b=W}if(b.visible=A.visible,b.wireframe=A.wireframe,M===Zr?b.side=A.shadowSide!==null?A.shadowSide:A.side:b.side=A.shadowSide!==null?A.shadowSide:h[A.side],b.alphaMap=A.alphaMap,b.alphaTest=A.alphaTest,b.map=A.map,b.clipShadows=A.clipShadows,b.clippingPlanes=A.clippingPlanes,b.clipIntersection=A.clipIntersection,b.displacementMap=A.displacementMap,b.displacementScale=A.displacementScale,b.displacementBias=A.displacementBias,b.wireframeLinewidth=A.wireframeLinewidth,b.linewidth=A.linewidth,C.isPointLight===!0&&b.isMeshDistanceMaterial===!0){const L=i.properties.get(b);L.light=C}return b}function v(T,A,C,M,b){if(T.visible===!1)return;if(T.layers.test(A.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&b===Zr)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,T.matrixWorld);const F=e.update(T),H=T.material;if(Array.isArray(H)){const W=F.groups;for(let N=0,$=W.length;N<$;N++){const X=W[N],Z=H[X.materialIndex];if(Z&&Z.visible){const z=y(T,Z,M,b);T.onBeforeShadow(i,T,A,C,F,z,X),i.renderBufferDirect(C,null,F,z,T,X),T.onAfterShadow(i,T,A,C,F,z,X)}}}else if(H.visible){const W=y(T,H,M,b);T.onBeforeShadow(i,T,A,C,F,W,null),i.renderBufferDirect(C,null,F,W,T,null),T.onAfterShadow(i,T,A,C,F,W,null)}}const L=T.children;for(let F=0,H=L.length;F<H;F++)v(L[F],A,C,M,b)}function w(T){T.target.removeEventListener("dispose",w);for(const C in c){const M=c[C],b=T.target.uuid;b in M&&(M[b].dispose(),delete M[b])}}}function b6(i){function e(){let Q=!1;const ve=new Nt;let Se=null;const xe=new Nt(0,0,0,0);return{setMask:function(Ee){Se!==Ee&&!Q&&(i.colorMask(Ee,Ee,Ee,Ee),Se=Ee)},setLocked:function(Ee){Q=Ee},setClear:function(Ee,Ve,it,Fe,j){j===!0&&(Ee*=Fe,Ve*=Fe,it*=Fe),ve.set(Ee,Ve,it,Fe),xe.equals(ve)===!1&&(i.clearColor(Ee,Ve,it,Fe),xe.copy(ve))},reset:function(){Q=!1,Se=null,xe.set(-1,0,0,0)}}}function t(){let Q=!1,ve=null,Se=null,xe=null;return{setTest:function(Ee){Ee?ye(i.DEPTH_TEST):Y(i.DEPTH_TEST)},setMask:function(Ee){ve!==Ee&&!Q&&(i.depthMask(Ee),ve=Ee)},setFunc:function(Ee){if(Se!==Ee){switch(Ee){case aP:i.depthFunc(i.NEVER);break;case lP:i.depthFunc(i.ALWAYS);break;case cP:i.depthFunc(i.LESS);break;case mh:i.depthFunc(i.LEQUAL);break;case uP:i.depthFunc(i.EQUAL);break;case fP:i.depthFunc(i.GEQUAL);break;case hP:i.depthFunc(i.GREATER);break;case dP:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Se=Ee}},setLocked:function(Ee){Q=Ee},setClear:function(Ee){xe!==Ee&&(i.clearDepth(Ee),xe=Ee)},reset:function(){Q=!1,ve=null,Se=null,xe=null}}}function n(){let Q=!1,ve=null,Se=null,xe=null,Ee=null,Ve=null,it=null,Fe=null,j=null;return{setTest:function(_e){Q||(_e?ye(i.STENCIL_TEST):Y(i.STENCIL_TEST))},setMask:function(_e){ve!==_e&&!Q&&(i.stencilMask(_e),ve=_e)},setFunc:function(_e,ee,fe){(Se!==_e||xe!==ee||Ee!==fe)&&(i.stencilFunc(_e,ee,fe),Se=_e,xe=ee,Ee=fe)},setOp:function(_e,ee,fe){(Ve!==_e||it!==ee||Fe!==fe)&&(i.stencilOp(_e,ee,fe),Ve=_e,it=ee,Fe=fe)},setLocked:function(_e){Q=_e},setClear:function(_e){j!==_e&&(i.clearStencil(_e),j=_e)},reset:function(){Q=!1,ve=null,Se=null,xe=null,Ee=null,Ve=null,it=null,Fe=null,j=null}}}const r=new e,s=new t,o=new n,a=new WeakMap,l=new WeakMap;let c={},u={},h=new WeakMap,d=[],f=null,p=!1,m=null,g=null,_=null,x=null,y=null,v=null,w=null,T=new We(0,0,0),A=0,C=!1,M=null,b=null,R=null,L=null,F=null;const H=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,N=0;const $=i.getParameter(i.VERSION);$.indexOf("WebGL")!==-1?(N=parseFloat(/^WebGL (\d)/.exec($)[1]),W=N>=1):$.indexOf("OpenGL ES")!==-1&&(N=parseFloat(/^OpenGL ES (\d)/.exec($)[1]),W=N>=2);let X=null,Z={};const z=i.getParameter(i.SCISSOR_BOX),ue=i.getParameter(i.VIEWPORT),me=new Nt().fromArray(z),Ue=new Nt().fromArray(ue);function ie(Q,ve,Se,xe){const Ee=new Uint8Array(4),Ve=i.createTexture();i.bindTexture(Q,Ve),i.texParameteri(Q,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(Q,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let it=0;it<Se;it++)Q===i.TEXTURE_3D||Q===i.TEXTURE_2D_ARRAY?i.texImage3D(ve,0,i.RGBA,1,1,xe,0,i.RGBA,i.UNSIGNED_BYTE,Ee):i.texImage2D(ve+it,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Ee);return Ve}const le={};le[i.TEXTURE_2D]=ie(i.TEXTURE_2D,i.TEXTURE_2D,1),le[i.TEXTURE_CUBE_MAP]=ie(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),le[i.TEXTURE_2D_ARRAY]=ie(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),le[i.TEXTURE_3D]=ie(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),s.setClear(1),o.setClear(0),ye(i.DEPTH_TEST),s.setFunc(mh),V(!1),q(Wv),ye(i.CULL_FACE),P($s);function ye(Q){c[Q]!==!0&&(i.enable(Q),c[Q]=!0)}function Y(Q){c[Q]!==!1&&(i.disable(Q),c[Q]=!1)}function ae(Q,ve){return u[Q]!==ve?(i.bindFramebuffer(Q,ve),u[Q]=ve,Q===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=ve),Q===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=ve),!0):!1}function de(Q,ve){let Se=d,xe=!1;if(Q){Se=h.get(ve),Se===void 0&&(Se=[],h.set(ve,Se));const Ee=Q.textures;if(Se.length!==Ee.length||Se[0]!==i.COLOR_ATTACHMENT0){for(let Ve=0,it=Ee.length;Ve<it;Ve++)Se[Ve]=i.COLOR_ATTACHMENT0+Ve;Se.length=Ee.length,xe=!0}}else Se[0]!==i.BACK&&(Se[0]=i.BACK,xe=!0);xe&&i.drawBuffers(Se)}function be(Q){return f!==Q?(i.useProgram(Q),f=Q,!0):!1}const Re={[Bo]:i.FUNC_ADD,[WR]:i.FUNC_SUBTRACT,[XR]:i.FUNC_REVERSE_SUBTRACT};Re[$R]=i.MIN,Re[qR]=i.MAX;const E={[YR]:i.ZERO,[jR]:i.ONE,[KR]:i.SRC_COLOR,[Hm]:i.SRC_ALPHA,[nP]:i.SRC_ALPHA_SATURATE,[eP]:i.DST_COLOR,[JR]:i.DST_ALPHA,[ZR]:i.ONE_MINUS_SRC_COLOR,[Vm]:i.ONE_MINUS_SRC_ALPHA,[tP]:i.ONE_MINUS_DST_COLOR,[QR]:i.ONE_MINUS_DST_ALPHA,[iP]:i.CONSTANT_COLOR,[rP]:i.ONE_MINUS_CONSTANT_COLOR,[sP]:i.CONSTANT_ALPHA,[oP]:i.ONE_MINUS_CONSTANT_ALPHA};function P(Q,ve,Se,xe,Ee,Ve,it,Fe,j,_e){if(Q===$s){p===!0&&(Y(i.BLEND),p=!1);return}if(p===!1&&(ye(i.BLEND),p=!0),Q!==GR){if(Q!==m||_e!==C){if((g!==Bo||y!==Bo)&&(i.blendEquation(i.FUNC_ADD),g=Bo,y=Bo),_e)switch(Q){case sl:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Xv:i.blendFunc(i.ONE,i.ONE);break;case $v:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case qv:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",Q);break}else switch(Q){case sl:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Xv:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case $v:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case qv:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",Q);break}_=null,x=null,v=null,w=null,T.set(0,0,0),A=0,m=Q,C=_e}return}Ee=Ee||ve,Ve=Ve||Se,it=it||xe,(ve!==g||Ee!==y)&&(i.blendEquationSeparate(Re[ve],Re[Ee]),g=ve,y=Ee),(Se!==_||xe!==x||Ve!==v||it!==w)&&(i.blendFuncSeparate(E[Se],E[xe],E[Ve],E[it]),_=Se,x=xe,v=Ve,w=it),(Fe.equals(T)===!1||j!==A)&&(i.blendColor(Fe.r,Fe.g,Fe.b,j),T.copy(Fe),A=j),m=Q,C=!1}function O(Q,ve){Q.side===Nr?Y(i.CULL_FACE):ye(i.CULL_FACE);let Se=Q.side===bi;ve&&(Se=!Se),V(Se),Q.blending===sl&&Q.transparent===!1?P($s):P(Q.blending,Q.blendEquation,Q.blendSrc,Q.blendDst,Q.blendEquationAlpha,Q.blendSrcAlpha,Q.blendDstAlpha,Q.blendColor,Q.blendAlpha,Q.premultipliedAlpha),s.setFunc(Q.depthFunc),s.setTest(Q.depthTest),s.setMask(Q.depthWrite),r.setMask(Q.colorWrite);const xe=Q.stencilWrite;o.setTest(xe),xe&&(o.setMask(Q.stencilWriteMask),o.setFunc(Q.stencilFunc,Q.stencilRef,Q.stencilFuncMask),o.setOp(Q.stencilFail,Q.stencilZFail,Q.stencilZPass)),se(Q.polygonOffset,Q.polygonOffsetFactor,Q.polygonOffsetUnits),Q.alphaToCoverage===!0?ye(i.SAMPLE_ALPHA_TO_COVERAGE):Y(i.SAMPLE_ALPHA_TO_COVERAGE)}function V(Q){M!==Q&&(Q?i.frontFace(i.CW):i.frontFace(i.CCW),M=Q)}function q(Q){Q!==HR?(ye(i.CULL_FACE),Q!==b&&(Q===Wv?i.cullFace(i.BACK):Q===VR?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Y(i.CULL_FACE),b=Q}function U(Q){Q!==R&&(W&&i.lineWidth(Q),R=Q)}function se(Q,ve,Se){Q?(ye(i.POLYGON_OFFSET_FILL),(L!==ve||F!==Se)&&(i.polygonOffset(ve,Se),L=ve,F=Se)):Y(i.POLYGON_OFFSET_FILL)}function G(Q){Q?ye(i.SCISSOR_TEST):Y(i.SCISSOR_TEST)}function D(Q){Q===void 0&&(Q=i.TEXTURE0+H-1),X!==Q&&(i.activeTexture(Q),X=Q)}function S(Q,ve,Se){Se===void 0&&(X===null?Se=i.TEXTURE0+H-1:Se=X);let xe=Z[Se];xe===void 0&&(xe={type:void 0,texture:void 0},Z[Se]=xe),(xe.type!==Q||xe.texture!==ve)&&(X!==Se&&(i.activeTexture(Se),X=Se),i.bindTexture(Q,ve||le[Q]),xe.type=Q,xe.texture=ve)}function k(){const Q=Z[X];Q!==void 0&&Q.type!==void 0&&(i.bindTexture(Q.type,null),Q.type=void 0,Q.texture=void 0)}function K(){try{i.compressedTexImage2D.apply(i,arguments)}catch(Q){console.error("THREE.WebGLState:",Q)}}function J(){try{i.compressedTexImage3D.apply(i,arguments)}catch(Q){console.error("THREE.WebGLState:",Q)}}function ne(){try{i.texSubImage2D.apply(i,arguments)}catch(Q){console.error("THREE.WebGLState:",Q)}}function Me(){try{i.texSubImage3D.apply(i,arguments)}catch(Q){console.error("THREE.WebGLState:",Q)}}function he(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(Q){console.error("THREE.WebGLState:",Q)}}function we(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(Q){console.error("THREE.WebGLState:",Q)}}function Ie(){try{i.texStorage2D.apply(i,arguments)}catch(Q){console.error("THREE.WebGLState:",Q)}}function ge(){try{i.texStorage3D.apply(i,arguments)}catch(Q){console.error("THREE.WebGLState:",Q)}}function Le(){try{i.texImage2D.apply(i,arguments)}catch(Q){console.error("THREE.WebGLState:",Q)}}function De(){try{i.texImage3D.apply(i,arguments)}catch(Q){console.error("THREE.WebGLState:",Q)}}function Ke(Q){me.equals(Q)===!1&&(i.scissor(Q.x,Q.y,Q.z,Q.w),me.copy(Q))}function Ne(Q){Ue.equals(Q)===!1&&(i.viewport(Q.x,Q.y,Q.z,Q.w),Ue.copy(Q))}function ze(Q,ve){let Se=l.get(ve);Se===void 0&&(Se=new WeakMap,l.set(ve,Se));let xe=Se.get(Q);xe===void 0&&(xe=i.getUniformBlockIndex(ve,Q.name),Se.set(Q,xe))}function Ye(Q,ve){const xe=l.get(ve).get(Q);a.get(ve)!==xe&&(i.uniformBlockBinding(ve,xe,Q.__bindingPointIndex),a.set(ve,xe))}function lt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),c={},X=null,Z={},u={},h=new WeakMap,d=[],f=null,p=!1,m=null,g=null,_=null,x=null,y=null,v=null,w=null,T=new We(0,0,0),A=0,C=!1,M=null,b=null,R=null,L=null,F=null,me.set(0,0,i.canvas.width,i.canvas.height),Ue.set(0,0,i.canvas.width,i.canvas.height),r.reset(),s.reset(),o.reset()}return{buffers:{color:r,depth:s,stencil:o},enable:ye,disable:Y,bindFramebuffer:ae,drawBuffers:de,useProgram:be,setBlending:P,setMaterial:O,setFlipSided:V,setCullFace:q,setLineWidth:U,setPolygonOffset:se,setScissorTest:G,activeTexture:D,bindTexture:S,unbindTexture:k,compressedTexImage2D:K,compressedTexImage3D:J,texImage2D:Le,texImage3D:De,updateUBOMapping:ze,uniformBlockBinding:Ye,texStorage2D:Ie,texStorage3D:ge,texSubImage2D:ne,texSubImage3D:Me,compressedTexSubImage2D:he,compressedTexSubImage3D:we,scissor:Ke,viewport:Ne,reset:lt}}function S6(i,e){const t=i.image&&i.image.width?i.image.width/i.image.height:1;return t>e?(i.repeat.x=1,i.repeat.y=t/e,i.offset.x=0,i.offset.y=(1-i.repeat.y)/2):(i.repeat.x=e/t,i.repeat.y=1,i.offset.x=(1-i.repeat.x)/2,i.offset.y=0),i}function w6(i,e){const t=i.image&&i.image.width?i.image.width/i.image.height:1;return t>e?(i.repeat.x=e/t,i.repeat.y=1,i.offset.x=(1-i.repeat.x)/2,i.offset.y=0):(i.repeat.x=1,i.repeat.y=t/e,i.offset.x=0,i.offset.y=(1-i.repeat.y)/2),i}function M6(i){return i.repeat.x=1,i.repeat.y=1,i.offset.x=0,i.offset.y=0,i}function Qv(i,e,t,n){const r=E6(n);switch(t){case zb:return i*e;case Vb:return i*e;case Gb:return i*e*2;case n_:return i*e/r.components*r.byteLength;case Jh:return i*e/r.components*r.byteLength;case Wb:return i*e*2/r.components*r.byteLength;case i_:return i*e*2/r.components*r.byteLength;case Hb:return i*e*3/r.components*r.byteLength;case vi:return i*e*4/r.components*r.byteLength;case r_:return i*e*4/r.components*r.byteLength;case Uf:case kf:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Bf:case zf:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Wm:case $m:return Math.max(i,16)*Math.max(e,8)/4;case Gm:case Xm:return Math.max(i,8)*Math.max(e,8)/2;case qm:case Ym:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case jm:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Km:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Zm:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Jm:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Qm:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case eg:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case tg:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case ng:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case ig:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case rg:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case sg:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case og:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case ag:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case lg:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case cg:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Hf:case ug:case fg:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Xb:case hg:return Math.ceil(i/4)*Math.ceil(e/4)*8;case dg:case pg:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function E6(i){switch(i){case ms:case Ub:return{byteLength:1,components:1};case Jc:case kb:case uu:return{byteLength:2,components:1};case e_:case t_:return{byteLength:2,components:4};case no:case Qg:case Ci:return{byteLength:4,components:1};case Bb:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}const T6={contain:S6,cover:w6,fill:M6,getByteLength:Qv};function A6(i,e,t,n,r,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Te,u=new WeakMap;let h;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(D,S){return f?new OffscreenCanvas(D,S):Ah("canvas")}function m(D,S,k){let K=1;const J=G(D);if((J.width>k||J.height>k)&&(K=k/Math.max(J.width,J.height)),K<1)if(typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&D instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&D instanceof ImageBitmap||typeof VideoFrame<"u"&&D instanceof VideoFrame){const ne=Math.floor(K*J.width),Me=Math.floor(K*J.height);h===void 0&&(h=p(ne,Me));const he=S?p(ne,Me):h;return he.width=ne,he.height=Me,he.getContext("2d").drawImage(D,0,0,ne,Me),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+ne+"x"+Me+")."),he}else return"data"in D&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),D;return D}function g(D){return D.generateMipmaps&&D.minFilter!==Un&&D.minFilter!==wn}function _(D){i.generateMipmap(D)}function x(D,S,k,K,J=!1){if(D!==null){if(i[D]!==void 0)return i[D];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let ne=S;if(S===i.RED&&(k===i.FLOAT&&(ne=i.R32F),k===i.HALF_FLOAT&&(ne=i.R16F),k===i.UNSIGNED_BYTE&&(ne=i.R8)),S===i.RED_INTEGER&&(k===i.UNSIGNED_BYTE&&(ne=i.R8UI),k===i.UNSIGNED_SHORT&&(ne=i.R16UI),k===i.UNSIGNED_INT&&(ne=i.R32UI),k===i.BYTE&&(ne=i.R8I),k===i.SHORT&&(ne=i.R16I),k===i.INT&&(ne=i.R32I)),S===i.RG&&(k===i.FLOAT&&(ne=i.RG32F),k===i.HALF_FLOAT&&(ne=i.RG16F),k===i.UNSIGNED_BYTE&&(ne=i.RG8)),S===i.RG_INTEGER&&(k===i.UNSIGNED_BYTE&&(ne=i.RG8UI),k===i.UNSIGNED_SHORT&&(ne=i.RG16UI),k===i.UNSIGNED_INT&&(ne=i.RG32UI),k===i.BYTE&&(ne=i.RG8I),k===i.SHORT&&(ne=i.RG16I),k===i.INT&&(ne=i.RG32I)),S===i.RGB&&k===i.UNSIGNED_INT_5_9_9_9_REV&&(ne=i.RGB9_E5),S===i.RGBA){const Me=J?Sh:Pt.getTransfer(K);k===i.FLOAT&&(ne=i.RGBA32F),k===i.HALF_FLOAT&&(ne=i.RGBA16F),k===i.UNSIGNED_BYTE&&(ne=Me===$t?i.SRGB8_ALPHA8:i.RGBA8),k===i.UNSIGNED_SHORT_4_4_4_4&&(ne=i.RGBA4),k===i.UNSIGNED_SHORT_5_5_5_1&&(ne=i.RGB5_A1)}return(ne===i.R16F||ne===i.R32F||ne===i.RG16F||ne===i.RG32F||ne===i.RGBA16F||ne===i.RGBA32F)&&e.get("EXT_color_buffer_float"),ne}function y(D,S){let k;return D?S===null||S===no||S===yl?k=i.DEPTH24_STENCIL8:S===Ci?k=i.DEPTH32F_STENCIL8:S===Jc&&(k=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===no||S===yl?k=i.DEPTH_COMPONENT24:S===Ci?k=i.DEPTH_COMPONENT32F:S===Jc&&(k=i.DEPTH_COMPONENT16),k}function v(D,S){return g(D)===!0||D.isFramebufferTexture&&D.minFilter!==Un&&D.minFilter!==wn?Math.log2(Math.max(S.width,S.height))+1:D.mipmaps!==void 0&&D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?S.mipmaps.length:1}function w(D){const S=D.target;S.removeEventListener("dispose",w),A(S),S.isVideoTexture&&u.delete(S)}function T(D){const S=D.target;S.removeEventListener("dispose",T),M(S)}function A(D){const S=n.get(D);if(S.__webglInit===void 0)return;const k=D.source,K=d.get(k);if(K){const J=K[S.__cacheKey];J.usedTimes--,J.usedTimes===0&&C(D),Object.keys(K).length===0&&d.delete(k)}n.remove(D)}function C(D){const S=n.get(D);i.deleteTexture(S.__webglTexture);const k=D.source,K=d.get(k);delete K[S.__cacheKey],o.memory.textures--}function M(D){const S=n.get(D);if(D.depthTexture&&D.depthTexture.dispose(),D.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(S.__webglFramebuffer[K]))for(let J=0;J<S.__webglFramebuffer[K].length;J++)i.deleteFramebuffer(S.__webglFramebuffer[K][J]);else i.deleteFramebuffer(S.__webglFramebuffer[K]);S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer[K])}else{if(Array.isArray(S.__webglFramebuffer))for(let K=0;K<S.__webglFramebuffer.length;K++)i.deleteFramebuffer(S.__webglFramebuffer[K]);else i.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&i.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let K=0;K<S.__webglColorRenderbuffer.length;K++)S.__webglColorRenderbuffer[K]&&i.deleteRenderbuffer(S.__webglColorRenderbuffer[K]);S.__webglDepthRenderbuffer&&i.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const k=D.textures;for(let K=0,J=k.length;K<J;K++){const ne=n.get(k[K]);ne.__webglTexture&&(i.deleteTexture(ne.__webglTexture),o.memory.textures--),n.remove(k[K])}n.remove(D)}let b=0;function R(){b=0}function L(){const D=b;return D>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+D+" texture units while this GPU supports only "+r.maxTextures),b+=1,D}function F(D){const S=[];return S.push(D.wrapS),S.push(D.wrapT),S.push(D.wrapR||0),S.push(D.magFilter),S.push(D.minFilter),S.push(D.anisotropy),S.push(D.internalFormat),S.push(D.format),S.push(D.type),S.push(D.generateMipmaps),S.push(D.premultiplyAlpha),S.push(D.flipY),S.push(D.unpackAlignment),S.push(D.colorSpace),S.join()}function H(D,S){const k=n.get(D);if(D.isVideoTexture&&U(D),D.isRenderTargetTexture===!1&&D.version>0&&k.__version!==D.version){const K=D.image;if(K===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Ue(k,D,S);return}}t.bindTexture(i.TEXTURE_2D,k.__webglTexture,i.TEXTURE0+S)}function W(D,S){const k=n.get(D);if(D.version>0&&k.__version!==D.version){Ue(k,D,S);return}t.bindTexture(i.TEXTURE_2D_ARRAY,k.__webglTexture,i.TEXTURE0+S)}function N(D,S){const k=n.get(D);if(D.version>0&&k.__version!==D.version){Ue(k,D,S);return}t.bindTexture(i.TEXTURE_3D,k.__webglTexture,i.TEXTURE0+S)}function $(D,S){const k=n.get(D);if(D.version>0&&k.__version!==D.version){ie(k,D,S);return}t.bindTexture(i.TEXTURE_CUBE_MAP,k.__webglTexture,i.TEXTURE0+S)}const X={[yh]:i.REPEAT,[br]:i.CLAMP_TO_EDGE,[vh]:i.MIRRORED_REPEAT},Z={[Un]:i.NEAREST,[Nb]:i.NEAREST_MIPMAP_NEAREST,[gc]:i.NEAREST_MIPMAP_LINEAR,[wn]:i.LINEAR,[Nf]:i.LINEAR_MIPMAP_NEAREST,[as]:i.LINEAR_MIPMAP_LINEAR},z={[DP]:i.NEVER,[OP]:i.ALWAYS,[RP]:i.LESS,[qb]:i.LEQUAL,[PP]:i.EQUAL,[FP]:i.GEQUAL,[IP]:i.GREATER,[LP]:i.NOTEQUAL};function ue(D,S){if(S.type===Ci&&e.has("OES_texture_float_linear")===!1&&(S.magFilter===wn||S.magFilter===Nf||S.magFilter===gc||S.magFilter===as||S.minFilter===wn||S.minFilter===Nf||S.minFilter===gc||S.minFilter===as)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(D,i.TEXTURE_WRAP_S,X[S.wrapS]),i.texParameteri(D,i.TEXTURE_WRAP_T,X[S.wrapT]),(D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY)&&i.texParameteri(D,i.TEXTURE_WRAP_R,X[S.wrapR]),i.texParameteri(D,i.TEXTURE_MAG_FILTER,Z[S.magFilter]),i.texParameteri(D,i.TEXTURE_MIN_FILTER,Z[S.minFilter]),S.compareFunction&&(i.texParameteri(D,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(D,i.TEXTURE_COMPARE_FUNC,z[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Un||S.minFilter!==gc&&S.minFilter!==as||S.type===Ci&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){const k=e.get("EXT_texture_filter_anisotropic");i.texParameterf(D,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,r.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function me(D,S){let k=!1;D.__webglInit===void 0&&(D.__webglInit=!0,S.addEventListener("dispose",w));const K=S.source;let J=d.get(K);J===void 0&&(J={},d.set(K,J));const ne=F(S);if(ne!==D.__cacheKey){J[ne]===void 0&&(J[ne]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,k=!0),J[ne].usedTimes++;const Me=J[D.__cacheKey];Me!==void 0&&(J[D.__cacheKey].usedTimes--,Me.usedTimes===0&&C(S)),D.__cacheKey=ne,D.__webglTexture=J[ne].texture}return k}function Ue(D,S,k){let K=i.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(K=i.TEXTURE_2D_ARRAY),S.isData3DTexture&&(K=i.TEXTURE_3D);const J=me(D,S),ne=S.source;t.bindTexture(K,D.__webglTexture,i.TEXTURE0+k);const Me=n.get(ne);if(ne.version!==Me.__version||J===!0){t.activeTexture(i.TEXTURE0+k);const he=Pt.getPrimaries(Pt.workingColorSpace),we=S.colorSpace===Is?null:Pt.getPrimaries(S.colorSpace),Ie=S.colorSpace===Is||he===we?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ie);let ge=m(S.image,!1,r.maxTextureSize);ge=se(S,ge);const Le=s.convert(S.format,S.colorSpace),De=s.convert(S.type);let Ke=x(S.internalFormat,Le,De,S.colorSpace,S.isVideoTexture);ue(K,S);let Ne;const ze=S.mipmaps,Ye=S.isVideoTexture!==!0,lt=Me.__version===void 0||J===!0,Q=ne.dataReady,ve=v(S,ge);if(S.isDepthTexture)Ke=y(S.format===vl,S.type),lt&&(Ye?t.texStorage2D(i.TEXTURE_2D,1,Ke,ge.width,ge.height):t.texImage2D(i.TEXTURE_2D,0,Ke,ge.width,ge.height,0,Le,De,null));else if(S.isDataTexture)if(ze.length>0){Ye&&lt&&t.texStorage2D(i.TEXTURE_2D,ve,Ke,ze[0].width,ze[0].height);for(let Se=0,xe=ze.length;Se<xe;Se++)Ne=ze[Se],Ye?Q&&t.texSubImage2D(i.TEXTURE_2D,Se,0,0,Ne.width,Ne.height,Le,De,Ne.data):t.texImage2D(i.TEXTURE_2D,Se,Ke,Ne.width,Ne.height,0,Le,De,Ne.data);S.generateMipmaps=!1}else Ye?(lt&&t.texStorage2D(i.TEXTURE_2D,ve,Ke,ge.width,ge.height),Q&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ge.width,ge.height,Le,De,ge.data)):t.texImage2D(i.TEXTURE_2D,0,Ke,ge.width,ge.height,0,Le,De,ge.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){Ye&&lt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ve,Ke,ze[0].width,ze[0].height,ge.depth);for(let Se=0,xe=ze.length;Se<xe;Se++)if(Ne=ze[Se],S.format!==vi)if(Le!==null)if(Ye){if(Q)if(S.layerUpdates.size>0){const Ee=Qv(Ne.width,Ne.height,S.format,S.type);for(const Ve of S.layerUpdates){const it=Ne.data.subarray(Ve*Ee/Ne.data.BYTES_PER_ELEMENT,(Ve+1)*Ee/Ne.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Se,0,0,Ve,Ne.width,Ne.height,1,Le,it,0,0)}S.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Se,0,0,0,Ne.width,Ne.height,ge.depth,Le,Ne.data,0,0)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,Se,Ke,Ne.width,Ne.height,ge.depth,0,Ne.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ye?Q&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,Se,0,0,0,Ne.width,Ne.height,ge.depth,Le,De,Ne.data):t.texImage3D(i.TEXTURE_2D_ARRAY,Se,Ke,Ne.width,Ne.height,ge.depth,0,Le,De,Ne.data)}else{Ye&&lt&&t.texStorage2D(i.TEXTURE_2D,ve,Ke,ze[0].width,ze[0].height);for(let Se=0,xe=ze.length;Se<xe;Se++)Ne=ze[Se],S.format!==vi?Le!==null?Ye?Q&&t.compressedTexSubImage2D(i.TEXTURE_2D,Se,0,0,Ne.width,Ne.height,Le,Ne.data):t.compressedTexImage2D(i.TEXTURE_2D,Se,Ke,Ne.width,Ne.height,0,Ne.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ye?Q&&t.texSubImage2D(i.TEXTURE_2D,Se,0,0,Ne.width,Ne.height,Le,De,Ne.data):t.texImage2D(i.TEXTURE_2D,Se,Ke,Ne.width,Ne.height,0,Le,De,Ne.data)}else if(S.isDataArrayTexture)if(Ye){if(lt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ve,Ke,ge.width,ge.height,ge.depth),Q)if(S.layerUpdates.size>0){const Se=Qv(ge.width,ge.height,S.format,S.type);for(const xe of S.layerUpdates){const Ee=ge.data.subarray(xe*Se/ge.data.BYTES_PER_ELEMENT,(xe+1)*Se/ge.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,xe,ge.width,ge.height,1,Le,De,Ee)}S.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ge.width,ge.height,ge.depth,Le,De,ge.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Ke,ge.width,ge.height,ge.depth,0,Le,De,ge.data);else if(S.isData3DTexture)Ye?(lt&&t.texStorage3D(i.TEXTURE_3D,ve,Ke,ge.width,ge.height,ge.depth),Q&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ge.width,ge.height,ge.depth,Le,De,ge.data)):t.texImage3D(i.TEXTURE_3D,0,Ke,ge.width,ge.height,ge.depth,0,Le,De,ge.data);else if(S.isFramebufferTexture){if(lt)if(Ye)t.texStorage2D(i.TEXTURE_2D,ve,Ke,ge.width,ge.height);else{let Se=ge.width,xe=ge.height;for(let Ee=0;Ee<ve;Ee++)t.texImage2D(i.TEXTURE_2D,Ee,Ke,Se,xe,0,Le,De,null),Se>>=1,xe>>=1}}else if(ze.length>0){if(Ye&&lt){const Se=G(ze[0]);t.texStorage2D(i.TEXTURE_2D,ve,Ke,Se.width,Se.height)}for(let Se=0,xe=ze.length;Se<xe;Se++)Ne=ze[Se],Ye?Q&&t.texSubImage2D(i.TEXTURE_2D,Se,0,0,Le,De,Ne):t.texImage2D(i.TEXTURE_2D,Se,Ke,Le,De,Ne);S.generateMipmaps=!1}else if(Ye){if(lt){const Se=G(ge);t.texStorage2D(i.TEXTURE_2D,ve,Ke,Se.width,Se.height)}Q&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,Le,De,ge)}else t.texImage2D(i.TEXTURE_2D,0,Ke,Le,De,ge);g(S)&&_(K),Me.__version=ne.version,S.onUpdate&&S.onUpdate(S)}D.__version=S.version}function ie(D,S,k){if(S.image.length!==6)return;const K=me(D,S),J=S.source;t.bindTexture(i.TEXTURE_CUBE_MAP,D.__webglTexture,i.TEXTURE0+k);const ne=n.get(J);if(J.version!==ne.__version||K===!0){t.activeTexture(i.TEXTURE0+k);const Me=Pt.getPrimaries(Pt.workingColorSpace),he=S.colorSpace===Is?null:Pt.getPrimaries(S.colorSpace),we=S.colorSpace===Is||Me===he?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,we);const Ie=S.isCompressedTexture||S.image[0].isCompressedTexture,ge=S.image[0]&&S.image[0].isDataTexture,Le=[];for(let xe=0;xe<6;xe++)!Ie&&!ge?Le[xe]=m(S.image[xe],!0,r.maxCubemapSize):Le[xe]=ge?S.image[xe].image:S.image[xe],Le[xe]=se(S,Le[xe]);const De=Le[0],Ke=s.convert(S.format,S.colorSpace),Ne=s.convert(S.type),ze=x(S.internalFormat,Ke,Ne,S.colorSpace),Ye=S.isVideoTexture!==!0,lt=ne.__version===void 0||K===!0,Q=J.dataReady;let ve=v(S,De);ue(i.TEXTURE_CUBE_MAP,S);let Se;if(Ie){Ye&&lt&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ve,ze,De.width,De.height);for(let xe=0;xe<6;xe++){Se=Le[xe].mipmaps;for(let Ee=0;Ee<Se.length;Ee++){const Ve=Se[Ee];S.format!==vi?Ke!==null?Ye?Q&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xe,Ee,0,0,Ve.width,Ve.height,Ke,Ve.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xe,Ee,ze,Ve.width,Ve.height,0,Ve.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ye?Q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xe,Ee,0,0,Ve.width,Ve.height,Ke,Ne,Ve.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xe,Ee,ze,Ve.width,Ve.height,0,Ke,Ne,Ve.data)}}}else{if(Se=S.mipmaps,Ye&&lt){Se.length>0&&ve++;const xe=G(Le[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,ve,ze,xe.width,xe.height)}for(let xe=0;xe<6;xe++)if(ge){Ye?Q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0,0,0,Le[xe].width,Le[xe].height,Ke,Ne,Le[xe].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0,ze,Le[xe].width,Le[xe].height,0,Ke,Ne,Le[xe].data);for(let Ee=0;Ee<Se.length;Ee++){const it=Se[Ee].image[xe].image;Ye?Q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xe,Ee+1,0,0,it.width,it.height,Ke,Ne,it.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xe,Ee+1,ze,it.width,it.height,0,Ke,Ne,it.data)}}else{Ye?Q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0,0,0,Ke,Ne,Le[xe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0,ze,Ke,Ne,Le[xe]);for(let Ee=0;Ee<Se.length;Ee++){const Ve=Se[Ee];Ye?Q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xe,Ee+1,0,0,Ke,Ne,Ve.image[xe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xe,Ee+1,ze,Ke,Ne,Ve.image[xe])}}}g(S)&&_(i.TEXTURE_CUBE_MAP),ne.__version=J.version,S.onUpdate&&S.onUpdate(S)}D.__version=S.version}function le(D,S,k,K,J,ne){const Me=s.convert(k.format,k.colorSpace),he=s.convert(k.type),we=x(k.internalFormat,Me,he,k.colorSpace);if(!n.get(S).__hasExternalTextures){const ge=Math.max(1,S.width>>ne),Le=Math.max(1,S.height>>ne);J===i.TEXTURE_3D||J===i.TEXTURE_2D_ARRAY?t.texImage3D(J,ne,we,ge,Le,S.depth,0,Me,he,null):t.texImage2D(J,ne,we,ge,Le,0,Me,he,null)}t.bindFramebuffer(i.FRAMEBUFFER,D),q(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,K,J,n.get(k).__webglTexture,0,V(S)):(J===i.TEXTURE_2D||J>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,K,J,n.get(k).__webglTexture,ne),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ye(D,S,k){if(i.bindRenderbuffer(i.RENDERBUFFER,D),S.depthBuffer){const K=S.depthTexture,J=K&&K.isDepthTexture?K.type:null,ne=y(S.stencilBuffer,J),Me=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,he=V(S);q(S)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,he,ne,S.width,S.height):k?i.renderbufferStorageMultisample(i.RENDERBUFFER,he,ne,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,ne,S.width,S.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Me,i.RENDERBUFFER,D)}else{const K=S.textures;for(let J=0;J<K.length;J++){const ne=K[J],Me=s.convert(ne.format,ne.colorSpace),he=s.convert(ne.type),we=x(ne.internalFormat,Me,he,ne.colorSpace),Ie=V(S);k&&q(S)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ie,we,S.width,S.height):q(S)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ie,we,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,we,S.width,S.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Y(D,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,D),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(S.depthTexture).__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),H(S.depthTexture,0);const K=n.get(S.depthTexture).__webglTexture,J=V(S);if(S.depthTexture.format===ol)q(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,K,0,J):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,K,0);else if(S.depthTexture.format===vl)q(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,K,0,J):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,K,0);else throw new Error("Unknown depthTexture format")}function ae(D){const S=n.get(D),k=D.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==D.depthTexture){const K=D.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),K){const J=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,K.removeEventListener("dispose",J)};K.addEventListener("dispose",J),S.__depthDisposeCallback=J}S.__boundDepthTexture=K}if(D.depthTexture&&!S.__autoAllocateDepthBuffer){if(k)throw new Error("target.depthTexture not supported in Cube render targets");Y(S.__webglFramebuffer,D)}else if(k){S.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(t.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer[K]),S.__webglDepthbuffer[K]===void 0)S.__webglDepthbuffer[K]=i.createRenderbuffer(),ye(S.__webglDepthbuffer[K],D,!1);else{const J=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ne=S.__webglDepthbuffer[K];i.bindRenderbuffer(i.RENDERBUFFER,ne),i.framebufferRenderbuffer(i.FRAMEBUFFER,J,i.RENDERBUFFER,ne)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=i.createRenderbuffer(),ye(S.__webglDepthbuffer,D,!1);else{const K=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,J=S.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,J),i.framebufferRenderbuffer(i.FRAMEBUFFER,K,i.RENDERBUFFER,J)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function de(D,S,k){const K=n.get(D);S!==void 0&&le(K.__webglFramebuffer,D,D.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),k!==void 0&&ae(D)}function be(D){const S=D.texture,k=n.get(D),K=n.get(S);D.addEventListener("dispose",T);const J=D.textures,ne=D.isWebGLCubeRenderTarget===!0,Me=J.length>1;if(Me||(K.__webglTexture===void 0&&(K.__webglTexture=i.createTexture()),K.__version=S.version,o.memory.textures++),ne){k.__webglFramebuffer=[];for(let he=0;he<6;he++)if(S.mipmaps&&S.mipmaps.length>0){k.__webglFramebuffer[he]=[];for(let we=0;we<S.mipmaps.length;we++)k.__webglFramebuffer[he][we]=i.createFramebuffer()}else k.__webglFramebuffer[he]=i.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){k.__webglFramebuffer=[];for(let he=0;he<S.mipmaps.length;he++)k.__webglFramebuffer[he]=i.createFramebuffer()}else k.__webglFramebuffer=i.createFramebuffer();if(Me)for(let he=0,we=J.length;he<we;he++){const Ie=n.get(J[he]);Ie.__webglTexture===void 0&&(Ie.__webglTexture=i.createTexture(),o.memory.textures++)}if(D.samples>0&&q(D)===!1){k.__webglMultisampledFramebuffer=i.createFramebuffer(),k.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let he=0;he<J.length;he++){const we=J[he];k.__webglColorRenderbuffer[he]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,k.__webglColorRenderbuffer[he]);const Ie=s.convert(we.format,we.colorSpace),ge=s.convert(we.type),Le=x(we.internalFormat,Ie,ge,we.colorSpace,D.isXRRenderTarget===!0),De=V(D);i.renderbufferStorageMultisample(i.RENDERBUFFER,De,Le,D.width,D.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+he,i.RENDERBUFFER,k.__webglColorRenderbuffer[he])}i.bindRenderbuffer(i.RENDERBUFFER,null),D.depthBuffer&&(k.__webglDepthRenderbuffer=i.createRenderbuffer(),ye(k.__webglDepthRenderbuffer,D,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ne){t.bindTexture(i.TEXTURE_CUBE_MAP,K.__webglTexture),ue(i.TEXTURE_CUBE_MAP,S);for(let he=0;he<6;he++)if(S.mipmaps&&S.mipmaps.length>0)for(let we=0;we<S.mipmaps.length;we++)le(k.__webglFramebuffer[he][we],D,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+he,we);else le(k.__webglFramebuffer[he],D,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+he,0);g(S)&&_(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Me){for(let he=0,we=J.length;he<we;he++){const Ie=J[he],ge=n.get(Ie);t.bindTexture(i.TEXTURE_2D,ge.__webglTexture),ue(i.TEXTURE_2D,Ie),le(k.__webglFramebuffer,D,Ie,i.COLOR_ATTACHMENT0+he,i.TEXTURE_2D,0),g(Ie)&&_(i.TEXTURE_2D)}t.unbindTexture()}else{let he=i.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(he=D.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(he,K.__webglTexture),ue(he,S),S.mipmaps&&S.mipmaps.length>0)for(let we=0;we<S.mipmaps.length;we++)le(k.__webglFramebuffer[we],D,S,i.COLOR_ATTACHMENT0,he,we);else le(k.__webglFramebuffer,D,S,i.COLOR_ATTACHMENT0,he,0);g(S)&&_(he),t.unbindTexture()}D.depthBuffer&&ae(D)}function Re(D){const S=D.textures;for(let k=0,K=S.length;k<K;k++){const J=S[k];if(g(J)){const ne=D.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,Me=n.get(J).__webglTexture;t.bindTexture(ne,Me),_(ne),t.unbindTexture()}}}const E=[],P=[];function O(D){if(D.samples>0){if(q(D)===!1){const S=D.textures,k=D.width,K=D.height;let J=i.COLOR_BUFFER_BIT;const ne=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Me=n.get(D),he=S.length>1;if(he)for(let we=0;we<S.length;we++)t.bindFramebuffer(i.FRAMEBUFFER,Me.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+we,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Me.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+we,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Me.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Me.__webglFramebuffer);for(let we=0;we<S.length;we++){if(D.resolveDepthBuffer&&(D.depthBuffer&&(J|=i.DEPTH_BUFFER_BIT),D.stencilBuffer&&D.resolveStencilBuffer&&(J|=i.STENCIL_BUFFER_BIT)),he){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Me.__webglColorRenderbuffer[we]);const Ie=n.get(S[we]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Ie,0)}i.blitFramebuffer(0,0,k,K,0,0,k,K,J,i.NEAREST),l===!0&&(E.length=0,P.length=0,E.push(i.COLOR_ATTACHMENT0+we),D.depthBuffer&&D.resolveDepthBuffer===!1&&(E.push(ne),P.push(ne),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,P)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,E))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),he)for(let we=0;we<S.length;we++){t.bindFramebuffer(i.FRAMEBUFFER,Me.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+we,i.RENDERBUFFER,Me.__webglColorRenderbuffer[we]);const Ie=n.get(S[we]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Me.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+we,i.TEXTURE_2D,Ie,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Me.__webglMultisampledFramebuffer)}else if(D.depthBuffer&&D.resolveDepthBuffer===!1&&l){const S=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[S])}}}function V(D){return Math.min(r.maxSamples,D.samples)}function q(D){const S=n.get(D);return D.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function U(D){const S=o.render.frame;u.get(D)!==S&&(u.set(D,S),D.update())}function se(D,S){const k=D.colorSpace,K=D.format,J=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||k!==lo&&k!==Is&&(Pt.getTransfer(k)===$t?(K!==vi||J!==ms)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",k)),S}function G(D){return typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement?(c.width=D.naturalWidth||D.width,c.height=D.naturalHeight||D.height):typeof VideoFrame<"u"&&D instanceof VideoFrame?(c.width=D.displayWidth,c.height=D.displayHeight):(c.width=D.width,c.height=D.height),c}this.allocateTextureUnit=L,this.resetTextureUnits=R,this.setTexture2D=H,this.setTexture2DArray=W,this.setTexture3D=N,this.setTextureCube=$,this.rebindTextures=de,this.setupRenderTarget=be,this.updateRenderTargetMipmap=Re,this.updateMultisampleRenderTarget=O,this.setupDepthRenderbuffer=ae,this.setupFrameBufferTexture=le,this.useMultisampledRTT=q}function KP(i,e){function t(n,r=Is){let s;const o=Pt.getTransfer(r);if(n===ms)return i.UNSIGNED_BYTE;if(n===e_)return i.UNSIGNED_SHORT_4_4_4_4;if(n===t_)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Bb)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Ub)return i.BYTE;if(n===kb)return i.SHORT;if(n===Jc)return i.UNSIGNED_SHORT;if(n===Qg)return i.INT;if(n===no)return i.UNSIGNED_INT;if(n===Ci)return i.FLOAT;if(n===uu)return i.HALF_FLOAT;if(n===zb)return i.ALPHA;if(n===Hb)return i.RGB;if(n===vi)return i.RGBA;if(n===Vb)return i.LUMINANCE;if(n===Gb)return i.LUMINANCE_ALPHA;if(n===ol)return i.DEPTH_COMPONENT;if(n===vl)return i.DEPTH_STENCIL;if(n===n_)return i.RED;if(n===Jh)return i.RED_INTEGER;if(n===Wb)return i.RG;if(n===i_)return i.RG_INTEGER;if(n===r_)return i.RGBA_INTEGER;if(n===Uf||n===kf||n===Bf||n===zf)if(o===$t)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Uf)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===kf)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Bf)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===zf)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Uf)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===kf)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Bf)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===zf)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Gm||n===Wm||n===Xm||n===$m)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Gm)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Wm)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Xm)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===$m)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===qm||n===Ym||n===jm)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===qm||n===Ym)return o===$t?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===jm)return o===$t?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Km||n===Zm||n===Jm||n===Qm||n===eg||n===tg||n===ng||n===ig||n===rg||n===sg||n===og||n===ag||n===lg||n===cg)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Km)return o===$t?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Zm)return o===$t?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Jm)return o===$t?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Qm)return o===$t?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===eg)return o===$t?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===tg)return o===$t?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ng)return o===$t?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ig)return o===$t?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===rg)return o===$t?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===sg)return o===$t?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===og)return o===$t?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ag)return o===$t?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===lg)return o===$t?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===cg)return o===$t?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Hf||n===ug||n===fg)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===Hf)return o===$t?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ug)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===fg)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Xb||n===hg||n===dg||n===pg)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===Hf)return s.COMPRESSED_RED_RGTC1_EXT;if(n===hg)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===dg)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===pg)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===yl?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}class ZP extends bn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class vc extends Rt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const C6={type:"move"};class ny{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new vc,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new vc,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new B,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new B),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new vc,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new B,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new B),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const m of e.hand.values()){const g=t.getJointPose(m,n),_=this._getHandJoint(c,m);g!==null&&(_.matrix.fromArray(g.transform.matrix),_.matrix.decompose(_.position,_.rotation,_.scale),_.matrixWorldNeedsUpdate=!0,_.jointRadius=g.radius),_.visible=g!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],d=u.position.distanceTo(h.position),f=.02,p=.005;c.inputState.pinching&&d>f+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(C6)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new vc;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const D6=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,R6=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

varying vec2 vUv;
uniform float u_ratio;
uniform float u_time;
uniform vec2 u_point;
uniform vec3 u_color1;
uniform vec3 u_color2;
uniform vec2 u_resolution;
uniform float u_mouseInteraction;

vec4 permute(vec4 x){
	return mod(((x*34.)+1.)*x,289.);
}
vec4 taylorInvSqrt(vec4 r){
	return 1.79284291400159-.85373472095314*r;
}

float snoise(vec3 v){
	const vec2 C=vec2(1./6.,1./3.);
	const vec4 D=vec4(0.,.5,1.,2.);
	
	
	vec3 i=floor(v+dot(v,C.yyy));
	vec3 x0=v-i+dot(i,C.xxx);
	
	
	vec3 g=step(x0.yzx,x0.xyz);
	vec3 l=1.-g;
	vec3 i1=min(g.xyz,l.zxy);
	vec3 i2=max(g.xyz,l.zxy);
	
	
	vec3 x1=x0-i1+1.*C.xxx;
	vec3 x2=x0-i2+2.*C.xxx;
	vec3 x3=x0-1.+3.*C.xxx;
	
	
	i=mod(i,289.);
	vec4 p=permute(permute(permute(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));
	
	
	
	float n_=1./7.;
	vec3 ns=n_*D.wyz-D.xzx;
	
	vec4 j=p-49.*floor(p*ns.z*ns.z);
	
	vec4 x_=floor(j*ns.z);
	vec4 y_=floor(j-7.*x_);
	
	vec4 x=x_*ns.x+ns.yyyy;
	vec4 y=y_*ns.x+ns.yyyy;
	vec4 h=1.-abs(x)-abs(y);
	
	vec4 b0=vec4(x.xy,y.xy);
	vec4 b1=vec4(x.zw,y.zw);
	
	vec4 s0=floor(b0)*2.+1.;
	vec4 s1=floor(b1)*2.+1.;
	vec4 sh=-step(h,vec4(0.));
	
	vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
	vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
	
	vec3 p0=vec3(a0.xy,h.x);
	vec3 p1=vec3(a0.zw,h.y);
	vec3 p2=vec3(a1.xy,h.z);
	vec3 p3=vec3(a1.zw,h.w);
	
	
	vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
	p0*=norm.x;
	p1*=norm.y;
	p2*=norm.z;
	p3*=norm.w;
	
	
	vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);
	m=m*m;
	return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}

vec3 hsv2rgb(vec3 c){
	vec4 K=vec4(1.,2./3.,1./3.,3.);
	vec3 p=abs(fract(c.xxx+K.xyz)*6.-K.www);
	return c.z*mix(K.xxx,clamp(p-K.xxx,0.,1.),c.y);
}

float circle_s(vec2 dist,float radius){
	return smoothstep(0.,radius,pow(dot(dist,dist),.6)*.1);
}

void main(){
	vec2 aspect=vec2(u_resolution.x/u_resolution.y,1.);
	
	vec2 uv=vUv*aspect;

	vec2 mouse=vUv-u_point;
	mouse.y/=u_ratio;
	float mouseInfluence = smoothstep(0.0, 0.5, length(mouse));

	float distanceFromCenter=length(vUv-vec2(.5,.5));
	float mask=1.-smoothstep(.1,.7,distanceFromCenter);
	
	float noise=snoise(vec3(uv,u_time * 3.));
	
	float noise1=snoise(vec3(uv+.1,u_time * 3.));
	float noise2=snoise(vec3(uv-.1,u_time * 3.));
	
	float alpha=(noise+noise1+noise2)/3.;
	alpha*=circle_s(mouse,.015 * u_mouseInteraction);
	float x=1.-noise;
	
	
	
	vec3 col=vec3(u_color1.x/255.,u_color1.y/255.,u_color1.z/255.);
	vec3 newColor=vec3(u_color2.x/255.,u_color2.y/255.,u_color2.z/255.);
	
	
	
	float blendFactor=smoothstep(.1,1.,x * 1.);
	vec3 blendedColor=mix(newColor, col, blendFactor);

	
	gl_FragColor.rgb=blendedColor;
	
	
	
	gl_FragColor.a=alpha;
}`,o7=`varying vec2 vUv;
	void main() {
			vUv = uv;
			gl_Position = vec4(position, 1.);
	}`;const a7=Qt("TresPlaneGeometry",{args:[2,2]},null,-1),l7=["vertex-shader","fragment-shader"],c7={__name:"Plane",setup(i){const{renderer:e,scene:t}=VX(),n=Pb(),r=au(),{$gsap:s}=Vt(),o=Hr(null),{onLoop:a,resume:l}=AS(),c=nt(window.innerWidth),u=nt(window.innerHeight),h=new Te(.5,.5),d=new Te(.5,.5);l(),a(({_delta:x,elapsed:y})=>{o.value&&(h.x+=(d.x-h.x)*.1,h.y+=(d.y-h.y)*.1,o.value.material.uniforms.u_point.value=h,o.value.material.uniforms.u_time.value=y*.1)});function f(x,y){d.x=x/window.innerWidth,d.y=1-y/window.innerHeight}const p={uTime:{value:0},u_point:{type:"v2",value:h},u_resolution:{type:"v2",value:new Te(c.value,u.value)},u_time:{type:"f",value:0},u_alpha:{type:"f",value:.9},u_ratio:{type:"f",value:c.value/u.value},u_width:{type:"f",value:c.value},u_mouseInteraction:{type:"f",value:1},u_strength:{type:"f",value:.5},u_coloring:{type:"f",value:n.getHue},u_saturation:{type:"f",value:n.getSaturation},u_brightness:{type:"f",value:n.getBrightness},u_color1:{type:"v3",value:new B(n.getColor1[0],n.getColor1[1],n.getColor1[2])},u_color2:{type:"v3",value:new B(n.getColor2[0],n.getColor2[1],n.getColor2[2])},u_speed:{type:"f",value:.1}},m=s.matchMedia(),g=1024;Xr(()=>{c.value=window.innerWidth,u.value=window.innerHeight,e.value.setPixelRatio(Math.min(window.devicePixelRatio,.5)),t.value.background=new We(0),m.add({isDesktop:`(min-width: ${g}px)`,isMobile:`(max-width: ${g-1}px)`,isTouch:"(hover: none), (pointer: coarse)"},x=>{const{isDesktop:y,isMobile:v,isTouch:w}=x.conditions;s.set(p.u_strength,{value:y?.5:.7}),s.set(p.u_mouseInteraction,{value:w?0:1}),window.addEventListener("resize",()=>{c.value=window.innerWidth,u.value=window.innerHeight,_()}),w||window.addEventListener("mousemove",T=>{f(T.clientX,T.clientY)})})});function _(){p.u_resolution.value.x=c.value,p.u_resolution.value.y=u.value,p.u_ratio.value=c.value/u.value}return Mn(()=>[n.color,n.isDark,r.path],([x,y,v])=>{x&&(s.to(p.u_color1.value,{x:x.color1[0],y:x.color1[1],z:x.color1[2],duration:.3,ease:"sine.out"}),s.to(p.u_color2.value,{x:x.color2[0],y:x.color2[1],z:x.color2[2],duration:.3,ease:"sine.out"})),v&&s.to(p.u_alpha,{value:v==="/"?.9:y?1:.5,duration:.3,ease:"sine.out"}),s.to(t.value.background,{duration:.3,ease:"sine.out",r:y?.02:n.color.colorBg[0]/255,g:y?.02:n.color.colorBg[1]/255,b:y?.02:n.color.colorBg[2]/255})},{deep:!0}),(x,y)=>(Gn(),ta("TresMesh",{ref_key:"blobRef",ref:o},[a7,Qt("TresShaderMaterial",{"vertex-shader":Dt(o7),"fragment-shader":Dt(s7),transparent:!0,dithering:!0,uniforms:p},null,8,l7)],512))}},u7=i=>(Dg("data-v-1a2b6ee2"),i=i(),Rg(),i),f7={class:"fixed z-[-1] top-0 left-0 w-full h-full"},h7=u7(()=>Qt("div",{class:"glass-overlay"},null,-1)),d7={__name:"CanvasBackground",setup(i){const e=new du(-.5,.5,.5,-.5,.1,10);return(t,n)=>{const r=c7;return Gn(),ta("section",f7,[Ft(Dt(r7),{class:"opacity-[var(--opacity)]",alpha:!1,"clear-color":"#e7e4df",camera:Dt(e),"window-size":""},{default:ul(()=>[(Gn(),Uo(Ex,null,{default:ul(()=>[Ft(r)]),_:1}))]),_:1},8,["camera"]),h7])}}},p7=Zg(d7,[["__scopeId","data-v-1a2b6ee2"]]),m7=ea({props:{vnode:{type:Object,required:!0},route:{type:Object,required:!0},vnodeRef:Object,renderKey:String,trackRootNodes:Boolean},setup(i){const e=i.renderKey,t=i.route,n={};for(const r in i.route)Object.defineProperty(n,r,{get:()=>e===i.renderKey?i.route[r]:t[r]});return Ws(Ng,zh(n)),()=>ir(i.vnode,{ref:i.vnodeRef})}}),g7=ea({name:"NuxtPage",inheritAttrs:!1,props:{name:{type:String},transition:{type:[Boolean,Object],default:void 0},keepalive:{type:[Boolean,Object],default:void 0},route:{type:Object},pageKey:{type:[Function,String],default:null}},setup(i,{attrs:e,expose:t}){const n=Vt(),r=nt(),s=xi(Ng,null);t({pageRef:r});const o=xi(nN,null);let a;const l=n.deferHydration();return i.pageKey&&Mn(()=>i.pageKey,(c,u)=>{c!==u&&n.callHook("page:loading:start")}),()=>ir(yC,{name:i.name,route:i.route,...e},{default:c=>{const u=y7(s,c.route,c.Component),h=s&&s.matched.length===c.route.matched.length;if(!c.Component){if(a&&!h)return a;l();return}if(a&&o&&!o.isCurrent(c.route))return a;if(u&&s&&(!o||o!=null&&o.isCurrent(s)))return h?a:null;const d=Zy(c,i.pageKey),f=!!(i.transition??c.route.meta.pageTransition??qy),p=f&&_7([i.transition,c.route.meta.pageTransition,qy,{onAfterLeave:()=>{n.callHook("page:transition:finish",c.Component)}}].filter(Boolean)),m=i.keepalive??c.route.meta.keepalive??cN;return a=mB(Ox,f&&p,wU(m,ir(Ex,{suspensible:!0,onPending:()=>n.callHook("page:start",c.Component),onResolve:()=>{so(()=>n.callHook("page:finish",c.Component).then(()=>n.callHook("page:loading:end")).finally(l))}},{default:()=>{const g=ir(m7,{key:d||void 0,vnode:c.Component,route:c.route,renderKey:d||void 0,trackRootNodes:f,vnodeRef:r});return m&&(g.type.name=c.Component.type.name||c.Component.type.__name||"RouteProvider"),g}}))).default(),a}})}});function _7(i){const e=i.map(t=>({...t,onAfterLeave:t.onAfterLeave?Xx(t.onAfterLeave):void 0}));return QA(...e)}function y7(i,e,t){if(!i)return!1;const n=e.matched.findIndex(r=>{var s;return((s=r.components)==null?void 0:s.default)===(t==null?void 0:t.type)});return!n||n===-1?!1:e.matched.slice(0,n).some((r,s)=>{var o,a,l;return((o=r.components)==null?void 0:o.default)!==((l=(a=i.matched[s])==null?void 0:a.components)==null?void 0:l.default)})||t&&Zy({route:e,Component:t})!==Zy({route:i,Component:t})}const v7={__name:"app",setup(i){jA({htmlAttrs:{lang:"en"}}),qO({ogImage:"/assets/images/share-social.jpg"});const{$gsap:e,$SplitText:t}=Vt();e.registerEffect({name:"clipText",effect:(r,s)=>e.fromTo(r,{yPercent:s.yPercent,z:0,clipPath:"inset(0% -10px 120% 0%)"},{willChange:"transform",yPercent:0,clipPath:"inset(0% -10px -4% 0%)",duration:s.duration,ease:s.ease,stagger:s.stagger?s.stagger:0}),defaults:{yPercent:120,duration:.8,ease:"power3.out"},extendTimeline:!0}),e.registerEffect({name:"clipTitle",effect:(r,s)=>{const o=e.timeline({defaults:{duration:s.duration,ease:s.ease}}),a=r[0].classList.contains("text-split-done")?r[0].querySelectorAll(".char"):new t(r,{type:"chars",charsClass:"char"}).chars;return r[0].classList.contains("text-split-done")||r[0].classList.add("text-split-done"),o.fromTo(a,{x:s.x,yPercent:s.yPercent,clipPath:"inset(0% 100% 120% -5%)",transformOrigin:"0% 50%"},{willChange:"transform",clipPath:"inset(0% -100% -100% -5%)",x:0,yPercent:0,stagger:s.stagger,duration:s.duration,ease:s.ease},.05),o},defaults:{yPercent:30,x:-30,duration:.8,ease:"power3.out",stagger:-.05},extendTimeline:!0}),e.registerEffect({name:"clipDescription",effect:(r,s)=>{const o=e.timeline({defaults:{duration:s.duration,ease:s.ease}}),a=r[0].classList.contains("text-split-done")?r[0].querySelectorAll(".line"):new t(r,{type:"lines",linesClass:"line"}).lines;return r[0].classList.contains("text-split-done")||r[0].classList.add("text-split-done"),o.fromTo(a,{yPercent:s.yPercent,z:0,clipPath:"inset(0% -10px 120% 0%)"},{willChange:"transform",yPercent:0,clipPath:"inset(0% -10px 0% 0%)",duration:s.duration,ease:s.ease,stagger:s.stagger?s.stagger:.05},0),o},defaults:{yPercent:120,duration:.8,ease:"power3.out"},extendTimeline:!0});const n=BR();return Xr(()=>{document.documentElement.addEventListener("click",()=>{setTimeout(()=>{n.isEnable||n.toggleSounds()},1e3)})}),(r,s)=>{const o=tH,a=bH,l=p7,c=g7;return Gn(),ta("div",null,[Ft(o),Ft(a),Ft(l),Ft(c)])}}},x7={__name:"nuxt-error-page",props:{error:Object},setup(i){const t=i.error;(t.stack||"").split(`
`).splice(1).map(h=>({text:h.replace("webpack:/","").replace(".vue",".js").trim(),internal:h.includes("node_modules")&&!h.includes(".cache")||h.includes("internal")||h.includes("new Promise")})).map(h=>`<span class="stack${h.internal?" internal":""}">${h.text}</span>`).join(`
`);const n=Number(t.statusCode||500),r=n===404,s=t.statusMessage??(r?"Page Not Found":"Internal Server Error"),o=t.message||t.toString(),a=void 0,u=r?XS(()=>Io(()=>import("./error-404.C82W8Mk8.js"),__vite__mapDeps([14,15]),import.meta.url).then(h=>h.default||h)):XS(()=>Io(()=>import("./error-500.BLAYZG93.js"),__vite__mapDeps([16,17]),import.meta.url).then(h=>h.default||h));return(h,d)=>(Gn(),Uo(Dt(u),JI(dA({statusCode:Dt(n),statusMessage:Dt(s),description:Dt(o),stack:Dt(a)})),null,16))}},iT={__name:"nuxt-root",setup(i){const e=()=>null,t=Vt(),n=t.deferHydration(),r=!1;Ws(Ng,au()),t.hooks.callHookWith(a=>a.map(l=>l()),"vue:setup");const s=Ug();ZT((a,l,c)=>{if(t.hooks.callHook("vue:error",a,l,c).catch(u=>console.error("[nuxt] Error in `vue:error` hook",u)),rN(a)&&(a.fatal||a.unhandled))return t.runWithContext(()=>ac(a)),!1});const o=!1;return(a,l)=>(Gn(),Uo(Ex,{onResolve:Dt(n)},{default:ul(()=>[Dt(s)?(Gn(),Uo(Dt(x7),{key:0,error:Dt(s)},null,8,["error"])):Dt(o)?(Gn(),Uo(Dt(e),{key:1,context:Dt(o)},null,8,["context"])):Dt(r)?(Gn(),Uo(cL(Dt(r)),{key:2})):(Gn(),Uo(Dt(v7),{key:3}))]),_:1},8,["onResolve"]))}};let rT;{let i;rT=async function(){var o,a;if(i)return i;const n=!!((o=window.__NUXT__)!=null&&o.serverRendered||((a=document.getElementById("__NUXT_DATA__"))==null?void 0:a.dataset.ssr)==="true")?H3(iT):z3(iT),r=$F({vueApp:n});async function s(l){await r.callHook("app:error",l),r.payload.error=r.payload.error||l}n.config.errorHandler=s;try{await YF(r,Oz)}catch(l){s(l)}try{await r.hooks.callHook("app:created",n),await r.hooks.callHook("app:beforeMount",n),n.mount(fN),await r.hooks.callHook("app:mounted",n),await so()}catch(l){s(l)}return n.config.errorHandler===s&&(n.config.errorHandler=void 0),n},i=rT().catch(e=>{throw console.error("Error while mounting app:",e),e})}export{Ys as A,Vx as B,Gz as C,w7 as D,E7 as E,Ki as F,Hh as G,Wz as H,T7 as I,au as J,EU as K,Sl as L,gw as M,ou as N,Wh as O,QA as P,eF as Q,Og as R,Ht as S,A7 as T,ea as U,S7 as V,qL as W,Zg as _,Qt as a,Ft as b,ta as c,pA as d,bC as e,Rg as f,Pb as g,nH as h,Mn as i,Xr as j,yu as k,su as l,Vt as m,vC as n,Gn as o,Dg as p,b7 as q,nt as r,M7 as s,IT as t,jA as u,Uo as v,ul as w,Dt as x,bm as y,Fy as z};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["./404.NkuVQVho.js","./Cta.BM_vgowC.js","./Cta.MkV0dE6U.css","./about.1zmZFrue.js","./NuxtPicture.vue.BoWsXzwl.js","./about.CimpTCn8.css","./index.D9FNPoYz.js","./state.BMZqzCxP.js","./projects.BAYTZuxw.js","./index.wAfGF9ej.css","./_single_.CakgS2l0.js","./_single_.BLC7npuK.css","./index.Cyd2F47N.js","./index.CVyGce08.css","./error-404.C82W8Mk8.js","./error-404.JekaaCis.css","./error-500.BLAYZG93.js","./error-500.CNP9nqm1.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}