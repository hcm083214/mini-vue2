/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/core/global-api/index.ts":
/*!**************************************!*\
  !*** ./src/core/global-api/index.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
function initGlobalAPI(Vue) {
}
exports["default"] = initGlobalAPI;


/***/ }),

/***/ "./src/core/index.ts":
/*!***************************!*\
  !*** ./src/core/index.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var index_1 = __webpack_require__(/*! ./instance/index */ "./src/core/instance/index.ts");
var index_2 = __webpack_require__(/*! ./global-api/index */ "./src/core/global-api/index.ts");
(0, index_2.default)(index_1.default);
exports["default"] = index_1.default;


/***/ }),

/***/ "./src/core/instance/index.ts":
/*!************************************!*\
  !*** ./src/core/instance/index.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var init_1 = __webpack_require__(/*! ./init */ "./src/core/instance/init.ts");
var Vue = /** @class */ (function () {
    function Vue(options) {
        this._init(options);
    }
    Vue.prototype._init = function (options) { };
    ;
    return Vue;
}());
exports["default"] = Vue;
(0, init_1.default)(Vue); // 定义


/***/ }),

/***/ "./src/core/instance/init.ts":
/*!***********************************!*\
  !*** ./src/core/instance/init.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var state_1 = __webpack_require__(/*! ./state */ "./src/core/instance/state.ts");
function initMixin(Vue) {
    Vue.prototype._init = function (options) {
        var vm = this;
        vm.$options = options;
        (0, state_1.initState)(vm); //数据初始化响应式
    };
}
exports["default"] = initMixin;


/***/ }),

/***/ "./src/core/instance/state.ts":
/*!************************************!*\
  !*** ./src/core/instance/state.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.initState = void 0;
var index_1 = __webpack_require__(/*! ../observer/index */ "./src/core/observer/index.ts");
function proxy(source, sourceKey, key) {
    Object.defineProperty(source, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            console.log('proxy --> get');
            return this[sourceKey][key];
        },
        set: function (newVal) {
            console.log('proxy --> set');
            this[sourceKey][key] = newVal;
        }
    });
}
function initData(vm) {
    var data = vm.$options.data;
    //给实例对象设置代理，能从 data 中访问数据,
    // eg: vm.key = vm._data.key = data.key
    data = vm._data = data;
    var keys = Object.keys(data);
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        proxy(vm, "_data", key);
    }
    // 调用 observe 函数进行数据响应化
    (0, index_1.observe)(data);
}
function initState(vm) {
    initData(vm);
}
exports.initState = initState;


/***/ }),

/***/ "./src/core/observer/index.ts":
/*!************************************!*\
  !*** ./src/core/observer/index.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.observe = void 0;
/*
 * @Author: 黄灿民
 * @Date: 2021-12-15 15:25:10
 * @LastEditTime: 2021-12-17 12:37:16
 * @LastEditors: 黄灿民
 * @Description:
 * @FilePath: \mini-vue2\src\core\observer\index.ts
 */
var lang_1 = __webpack_require__(/*! ../util/lang */ "./src/core/util/lang.ts");
var util_1 = __webpack_require__(/*! ../util/util */ "./src/core/util/util.ts");
function observe(data) {
    console.log("🚀 ~ file: index.ts ~ line 18 ~ observe ~ isObject(data)", data, (0, util_1.isObject)(data));
    if (!(0, util_1.isObject)(data))
        return;
    var ob;
    // 观察者若存在直接返回，不存在则创建新的实例
    if ((0, util_1.hasOwn)(data, '__ob__') && data.__ob__ instanceof Observer) {
        ob = data.__ob__;
    }
    else {
        ob = new Observer(data);
    }
    return ob;
}
exports.observe = observe;
function defineReactive(obj, key, value) {
    arguments.length === 2 && (value = obj[key]);
    observe(value);
    Object.defineProperty(obj, key, {
        configurable: true,
        enumerable: true,
        get: function () {
            console.log("🚀 ~ file: index.ts ~ line 32 ~ get ~ get", value);
            return value;
        },
        set: function (newVal) {
            console.log("🚀 ~ file: index.ts ~ line 36 ~ set ~ set", value, newVal);
            this.value = newVal;
            observe(newVal);
        }
    });
}
var Observer = /** @class */ (function () {
    function Observer(value) {
        this.value = value;
        // 给数据贴上 __ob__ 属性，值为 Observer 实例，如果有 __ob__ 属性，则不再 observe
        // 这边有个细节，enumerable 需要设置为 false，防止遍历 __ob__ 里面的属性进行响应化操作导致死循环
        (0, lang_1.def)(value, "__ob__", this);
        //对每个数据进行响应化
        this.walk(value);
    }
    Observer.prototype.walk = function (obj) {
        var keys = Object.keys(obj);
        for (var i = 0; i < keys.length; i++) {
            defineReactive(obj, keys[i]);
        }
    };
    return Observer;
}());


/***/ }),

/***/ "./src/core/util/lang.ts":
/*!*******************************!*\
  !*** ./src/core/util/lang.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports) => {


/*
 * @Author: 黄灿民
 * @Date: 2021-12-16 11:59:24
 * @LastEditTime: 2021-12-17 12:03:58
 * @LastEditors: 黄灿民
 * @Description:
 * @FilePath: \mini-vue2\src\core\util\lang.ts
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.def = void 0;
//定义一个对象的属性
function def(obj, key, val, enumerable) {
    Object.defineProperty(obj, key, {
        enumerable: !!enumerable,
        configurable: true,
        writable: true,
        value: val,
    });
}
exports.def = def;


/***/ }),

/***/ "./src/core/util/util.ts":
/*!*******************************!*\
  !*** ./src/core/util/util.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.hasOwn = exports.isObject = void 0;
/*
 * @Author: 黄灿民
 * @Date: 2021-12-16 12:46:00
 * @LastEditTime: 2021-12-16 20:22:27
 * @LastEditors: 黄灿民
 * @Description:
 * @FilePath: \mini-vue2\src\core\util\util.ts
 */
function isObject(obj) {
    return obj !== null && typeof obj === 'object';
}
exports.isObject = isObject;
/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key);
}
exports.hasOwn = hasOwn;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var index_1 = __webpack_require__(/*! ./core/index */ "./src/core/index.ts");
exports["default"] = index_1.default;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./src/test/test.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index */ "./src/index.ts");


const vm = new _index__WEBPACK_IMPORTED_MODULE_0__["default"]({
    data: {
        obj: {
            name: 'zs',
            age: 10,
        },
        id: 1,
        arr: [1, 2, 3]
    }
})
vm.obj.age
})();

/******/ })()
;
//# sourceMappingURL=main.js.map