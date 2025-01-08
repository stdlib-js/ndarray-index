"use strict";var s=function(r,e){return function(){return e||r((e={exports:{}}).exports,e),e.exports}};var m=s(function(qe,w){"use strict";function A(){return{persist:!1,kind:""}}w.exports=A});var q=s(function(be,D){D.exports=["linear","cartesian"]});var _=s(function(xe,k){"use strict";var U=require("@stdlib/assert-is-plain-object"),b=require("@stdlib/assert-has-own-property"),z=require("@stdlib/assert-is-boolean").isPrimitive,G=require("@stdlib/array-base-assert-contains").factory,f=require("@stdlib/string-format"),x=q(),H=G(x);function M(r,e){return U(e)?b(e,"persist")&&(r.persist=e.persist,!z(r.persist))?new TypeError(f("invalid option. `%s` option must be a boolean. Option: `%s`.","persist",r.persist)):b(e,"kind")&&(r.kind=e.kind,!H(r.kind)&&r.kind!=="")?new TypeError(f('invalid option. `%s` option must be one of the following: "%s". Option: `%s`.',"kind",x.join('", "'),r.kind)):null:new TypeError(f("invalid argument. Options argument must be an object. Value: `%s`.",e))}k.exports=M});var c=s(function(ke,E){"use strict";var Q=require("@stdlib/utils-linked-list"),W=new Q;E.exports=W});var O=s(function(_e,T){"use strict";var X=c();function Y(r){for(var e=X.first();e;){if(e.value.id===r)return e;e=e.next}return null}T.exports=Y});var F=s(function(Ee,j){"use strict";var I=-1;function Z(){return I+=1,I.toString()}j.exports=Z});var h=s(function(Te,P){"use strict";var u=require("@stdlib/utils-define-nonenumerable-read-only-accessor"),o=require("@stdlib/utils-define-nonenumerable-read-only-property"),$=require("@stdlib/utils-define-nonenumerable-property"),ee=require("@stdlib/assert-is-ndarray-like"),re=require("@stdlib/assert-is-boolean").isPrimitive,ne=require("@stdlib/assert-is-integer").isPrimitive,ie=require("@stdlib/ndarray-base-ndarraylike2ndarray"),te=require("@stdlib/ndarray-base-dtype"),ae=require("@stdlib/ndarray-to-json"),S=require("@stdlib/string-format"),de=m(),se=_(),p=c(),N=O(),oe=F();function i(r){var e,a,t,n,d,v;if(!(this instanceof i))return arguments.length>1?new i(r,arguments[1]):new i(r);if(!ee(r))throw new TypeError(S("invalid argument. First argument must be an ndarray-like object. Value: `%s`.",r));if(e=de(),arguments.length>1&&(a=se(e,arguments[1]),a))throw a;if(t=ie(r),n=te(t),n==="generic")if(t.length>0)if(v=t.iget(0),re(v))d="bool";else if(ne(v))d="int";else throw new TypeError("invalid argument. First argument must be a valid index ndarray.");else d="int";else if(n==="int64"||n==="int32")d="int";else if(n==="uint8")d="mask";else if(n==="bool")d="bool";else throw new TypeError("invalid argument. First argument must be a valid index ndarray.");if(d!=="int"&&e.kind!=="")throw new TypeError(S('invalid argument. First argument is not compatible with the specified index "kind". Type: %s. Kind: %s.',d,e.kind));return p.push({id:oe(),ref:this,data:t,type:d,kind:e.kind,dtype:n,persist:e.persist}),o(this,"_node",p.last()),$(this,"_invalidated",!1),this}o(i,"name","ndindex");o(i,"free",function(e){var a,t;return a=N(e),a===null?!1:(t=a.value,o(t.ref,"_invalidated",!0),p.remove(a),t.data=null,!0)});o(i,"get",function(e){var a,t,n;return a=N(e),a===null?null:(n=a.value,t={data:n.data,type:n.type,kind:n.kind,dtype:n.dtype},n.persist||i.free(e),t)});u(i.prototype,"data",function(){if(this._invalidated)throw new Error("invalid operation. This ndarray index instance has already been freed and can no longer be used.");return this._node.value.data});u(i.prototype,"dtype",function(){if(this._invalidated)throw new Error("invalid operation. This ndarray index instance has already been freed and can no longer be used.");return this._node.value.dtype});u(i.prototype,"id",function(){if(this._invalidated)throw new Error("invalid operation. This ndarray index instance has already been freed and can no longer be used.");return this._node.value.id});u(i.prototype,"isCached",function(){return!this._invalidated});u(i.prototype,"kind",function(){if(this._invalidated)throw new Error("invalid operation. This ndarray index instance has already been freed and can no longer be used.");return this._node.value.kind});u(i.prototype,"type",function(){if(this._invalidated)throw new Error("invalid operation. This ndarray index instance has already been freed and can no longer be used.");return this._node.value.type});o(i.prototype,"toString",function(){if(this._invalidated)throw new Error("invalid operation. This ndarray index instance has already been freed and can no longer be used.");return"ndindex<"+this._node.value.id+">"});o(i.prototype,"toJSON",function(){if(this._invalidated)throw new Error("invalid operation. This ndarray index instance has already been freed and can no longer be used.");return{type:"ndindex",kind:this._node.value.kind,data:ae(this._node.value.data)}});P.exports=i});var y=s(function(Oe,K){"use strict";var R=require("@stdlib/utils-define-nonenumerable-read-only-property"),ue=require("@stdlib/assert-is-plain-object"),le=require("@stdlib/assert-has-own-property"),ve=require("@stdlib/string-format"),l=h();function fe(r){var e=a;return R(e,"free",l.free),R(e,"get",l.get),e;function a(t){var n,d;if(d={kind:r},arguments.length<2)return new l(t,d);if(n=arguments[1],!ue(n))throw new TypeError(ve("invalid argument. Options argument must be an object. Value: `%s`.",n));return le(n,"persist")&&(d.persist=n.persist),new l(t,d)}}K.exports=fe});var V=s(function(Ie,L){"use strict";var ce=y(),pe=ce("cartesian");L.exports=pe});var C=s(function(je,B){"use strict";var he=y(),ye=he("linear");B.exports=ye});var J=require("@stdlib/utils-define-nonenumerable-read-only-property"),ge=V(),we=C(),g=h();J(g,"cartesianIndex",ge);J(g,"linearIndex",we);module.exports=g;
/**
* @license Apache-2.0
*
* Copyright (c) 2024 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
//# sourceMappingURL=index.js.map
