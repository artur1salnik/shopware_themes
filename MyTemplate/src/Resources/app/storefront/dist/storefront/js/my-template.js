(window.webpackJsonp=window.webpackJsonp||[]).push([["my-template"],{IPYR:function(t,e,n){"use strict";var o=n("63Ad");Object.defineProperty(e,"__esModule",{value:!0}),e.log=e.Log=e.tag=e.LogLevel=void 0;var r,i=o(n("SDJZ")),a=o(n("NToG")),c=o(n("OvAC"));e.LogLevel={INFO:"INFO",WARN:"WARN",ERROR:"ERROR",OFF:"OFF"},function(t){t[t.INFO=1]="INFO",t[t.WARN=2]="WARN",t[t.ERROR=3]="ERROR",t[t.OFF=4]="OFF"}(r||(r={}));var l={};e.tag=l;var u=function(){function t(){(0,i.default)(this,t),(0,c.default)(this,"_tagToLevel",{}),(0,c.default)(this,"_callback",void 0)}return(0,a.default)(t,[{key:"init",value:function(t,e){for(var n in t)this._tagToLevel[n]=r[t[n]]||1;for(var o in void 0!==e&&(this._callback=e),this._tagToLevel)l[o]=o;return this}},{key:"error",value:function(t,e){if(r.ERROR>=(this._tagToLevel[t]||r.INFO)&&this._callback){for(var n=arguments.length,o=new Array(n>2?n-2:0),i=2;i<n;i++)o[i-2]=arguments[i];this._callback(r[r.ERROR],t,e,o)}}},{key:"warn",value:function(t,e){if(r.WARN>=(this._tagToLevel[t]||r.INFO)&&this._callback){for(var n=arguments.length,o=new Array(n>2?n-2:0),i=2;i<n;i++)o[i-2]=arguments[i];this._callback(r[r.WARN],t,e,o)}}},{key:"info",value:function(t,e){if(r.INFO>=(this._tagToLevel[t]||r.INFO)&&this._callback){for(var n=arguments.length,o=new Array(n>2?n-2:0),i=2;i<n;i++)o[i-2]=arguments[i];this._callback(r[r.INFO],t,e,o)}}}]),t}();e.Log=u;var f=new u;e.log=f},VfTe:function(t,e,n){"use strict";n.r(e);var o=n("FGIj"),r=n("IPYR");function i(t){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function a(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function c(t,e){return!e||"object"!==i(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function l(t){return(l=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function u(t,e){return(u=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function f(t){return function(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}r.log.init({initializer:"INFO"},(function(t,e,n,o){var r;(r=console).log.apply(r,["".concat(t,": [").concat(e,"] "),n].concat(f(o)))}));var s=function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),c(this,l(e).apply(this,arguments))}var n,o,i;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&u(t,e)}(e,t),n=e,(o=[{key:"init",value:function(){console.log("init"),r.log.info("initializer","plugin got started",this)}}])&&a(n.prototype,o),i&&a(n,i),e}(o.a);window.PluginManager.register("MyTemplate",s)}},[["VfTe","runtime","vendor-node","vendor-shared"]]]);