// Copyright (c) 2024 The Stdlib Authors. License is Apache-2.0: http://www.apache.org/licenses/LICENSE-2.0
/// <reference types="./index.d.ts" />
import e from"https://cdn.jsdelivr.net/gh/stdlib-js/utils-define-nonenumerable-read-only-property@v0.2.1-esm/index.mjs";import n from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-plain-object@v0.2.2-esm/index.mjs";import i from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-has-own-property@v0.2.2-esm/index.mjs";import r from"https://cdn.jsdelivr.net/gh/stdlib-js/error-tools-fmtprodmsg@v0.2.2-esm/index.mjs";import t from"https://cdn.jsdelivr.net/gh/stdlib-js/utils-define-nonenumerable-read-only-accessor@v0.2.2-esm/index.mjs";import s from"https://cdn.jsdelivr.net/gh/stdlib-js/utils-define-nonenumerable-property@v0.2.2-esm/index.mjs";import d from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-ndarray-like@v0.2.2-esm/index.mjs";import{isPrimitive as a}from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-boolean@v0.2.2-esm/index.mjs";import{isPrimitive as o}from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-integer@v0.2.2-esm/index.mjs";import l from"https://cdn.jsdelivr.net/gh/stdlib-js/ndarray-base-ndarraylike2ndarray@esm/index.mjs";import p from"https://cdn.jsdelivr.net/gh/stdlib-js/ndarray-base-dtype@v0.2.2-esm/index.mjs";import h from"https://cdn.jsdelivr.net/gh/stdlib-js/ndarray-to-json@esm/index.mjs";import{factory as u}from"https://cdn.jsdelivr.net/gh/stdlib-js/array-base-assert-contains@v0.2.2-esm/index.mjs";import m from"https://cdn.jsdelivr.net/gh/stdlib-js/utils-linked-list@v0.2.2-esm/index.mjs";var f=["linear","cartesian"],v=u(f);var y=new m;function c(e){for(var n=y.first();n;){if(n.value.id===e)return n;n=n.next}return null}var j=-1;function b(t){var h,u,m,c,g,w;if(!(this instanceof b))return arguments.length>1?new b(t,arguments[1]):new b(t);if(!d(t))throw new TypeError(r("null5t",t));if(h={persist:!1,kind:""},arguments.length>1&&(u=function(e,t){return n(t)?i(t,"persist")&&(e.persist=t.persist,!a(e.persist))?new TypeError(r("null2o","persist",e.persist)):i(t,"kind")&&(e.kind=t.kind,!v(e.kind)&&""!==e.kind)?new TypeError(r("null4S","kind",f.join('", "'),e.kind)):null:new TypeError(r("null2V",t))}(h,arguments[1]),u))throw u;if(m=l(t),"generic"===(c=p(m)))if(m.length>0)if(w=m.iget(0),a(w))g="bool";else{if(!o(w))throw new TypeError("invalid argument. First argument must be a valid index ndarray.");g="int"}else g="int";else if("int64"===c||"int32"===c)g="int";else if("uint8"===c)g="mask";else{if("bool"!==c)throw new TypeError("invalid argument. First argument must be a valid index ndarray.");g="bool"}if("int"!==g&&""!==h.kind)throw new TypeError(r('invalid argument. First argument is not compatible with the specified index "kind". Type: %s. Kind: %s.',g,h.kind));return y.push({id:(j+=1).toString(),ref:this,data:m,type:g,kind:h.kind,dtype:c,persist:h.persist}),e(this,"_node",y.last()),s(this,"_invalidated",!1),this}function g(t){var s=function(e){var s,d;if(d={kind:t},arguments.length<2)return new b(e,d);if(s=arguments[1],!n(s))throw new TypeError(r("null2V",s));i(s,"persist")&&(d.persist=s.persist);return new b(e,d)};return e(s,"free",b.free),e(s,"get",b.get),s}e(b,"name","ndindex"),e(b,"free",(function(n){var i,r;return null!==(i=c(n))&&(r=i.value,e(r.ref,"_invalidated",!0),y.remove(i),r.data=null,!0)})),e(b,"get",(function(e){var n,i,r;return null===(n=c(e))?null:(i={data:(r=n.value).data,type:r.type,kind:r.kind,dtype:r.dtype},r.persist||b.free(e),i)})),t(b.prototype,"data",(function(){if(this._invalidated)throw new Error("invalid operation. This ndarray index instance has already been freed and can no longer be used.");return this._node.value.data})),t(b.prototype,"dtype",(function(){if(this._invalidated)throw new Error("invalid operation. This ndarray index instance has already been freed and can no longer be used.");return this._node.value.dtype})),t(b.prototype,"id",(function(){if(this._invalidated)throw new Error("invalid operation. This ndarray index instance has already been freed and can no longer be used.");return this._node.value.id})),t(b.prototype,"isCached",(function(){return!this._invalidated})),t(b.prototype,"kind",(function(){if(this._invalidated)throw new Error("invalid operation. This ndarray index instance has already been freed and can no longer be used.");return this._node.value.kind})),t(b.prototype,"type",(function(){if(this._invalidated)throw new Error("invalid operation. This ndarray index instance has already been freed and can no longer be used.");return this._node.value.type})),e(b.prototype,"toString",(function(){if(this._invalidated)throw new Error("invalid operation. This ndarray index instance has already been freed and can no longer be used.");return"ndindex<"+this._node.value.id+">"})),e(b.prototype,"toJSON",(function(){if(this._invalidated)throw new Error("invalid operation. This ndarray index instance has already been freed and can no longer be used.");return{type:"ndindex",kind:this._node.value.kind,data:h(this._node.value.data)}}));var w=g("cartesian"),x=g("linear");e(b,"cartesianIndex",w),e(b,"linearIndex",x);export{w as cartesianIndex,b as default,x as linearIndex};
//# sourceMappingURL=index.mjs.map