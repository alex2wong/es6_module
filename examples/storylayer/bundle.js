(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Alex"] = factory();
	else
		root["Alex"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.sleep = exports.myTween = undefined;

	var _Tween = __webpack_require__(2);

	exports.myTween = _Tween.myTween;
	exports.sleep = _Tween.sleep;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var breakBetween = 2000;
	// myTween.js  needs to be a global Function..
	var myTween = exports.myTween = {
	    fps: 30,
	    objs: null,
	    get: function get(models) {
	        this.objs = models;
	        return this;
	    },
	    to: function to(targets, duration, cb) {
	        this.lastAniParams = [targets, duration];
	        if (targets != undefined && duration != undefined && myTween.objs != null) {
	            var inter, stepNum, stepIndex, objsCopy, props;
	            var i;
	            var k;

	            var _ret = function () {
	                var animation = function animation() {
	                    var fadeIn = false,
	                        fadeOut = false;
	                    // animation end related handling.
	                    if (stepIndex >= stepNum) {
	                        // reset objs 2 original status.
	                        if (myTween.loop) {
	                            stepIndex = 0;
	                            for (var i = 0; i < myTween.objs.length; i++) {
	                                // shallow copy objects..
	                                myTween.objs[i] = Object.assign([], myTween.objs[i], objsCopy[i]);
	                            }
	                            // myTween.objs = Object.assign([], myTween.objs, objsCopy);
	                            console.warn("animation reset ...");
	                        } else {
	                            myTween.paused = true;
	                            clearInterval(myTween.timer);
	                            myTween.timerOn = false;
	                            console.warn("animation end !!!");
	                        }
	                        return;
	                    }
	                    if (stepIndex == 0) {
	                        fadeIn = true;
	                    } else if (stepIndex == stepNum - 1) {
	                        fadeOut = true;
	                    }
	                    if (myTween.speed != 1) {}
	                    // animation pause related.  record current params..
	                    if (myTween.paused) {
	                        return;
	                    }
	                    for (var i = 0; i < myTween.objs.length; i++) {
	                        for (var key in props[i]) {
	                            // currently animation is controlled by stepIndex..
	                            myTween.objs[i][key] += props[i][key];
	                            // console.log("obj " +  myTween.objs[i]['name'] +' changed,' + key + ": " + myTween.objs[i][key]);
	                        }
	                    }
	                    if (cb && cb instanceof Function) {
	                        cb.call(this, myTween.objs, fadeOut, fadeIn);
	                    }
	                    stepIndex += 1;
	                };
	                // if last timer is still On, register later.. use async alike process controller.


	                inter = 1000 / myTween.fps;
	                stepNum = duration / 1000 * myTween.fps;
	                stepIndex = 0;
	                objsCopy = [];
	                props = [];

	                console.log("animation params init complete...");

	                // tranverse targetStatus props then calculate status of each frame
	                for (i = 0; i < myTween.objs.length; i++) {
	                    for (k in targets[i]) {
	                        if (typeof targets[i][k] == 'number') {
	                            // deepCopy original status..
	                            if (_typeof(objsCopy[i]) != 'object') objsCopy[i] = {};
	                            if (_typeof(props[i]) != 'object') props[i] = {};
	                            objsCopy[i][k] = myTween.objs[i][k];
	                            props[i][k] = parseFloat(((targets[i][k] - myTween.objs[i][k]) * (1 / stepNum)).toFixed(3));
	                        }
	                    }
	                }

	                return {
	                    v: new Promise(function (resolve, reject) {
	                        myTween.timer = setInterval(animation, inter);
	                        myTween.timerOn = true;
	                        myTween.paused = false;
	                        // this step is to sleep for animation duration..
	                        setTimeout(resolve, duration);
	                    })
	                };
	            }();

	            if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	        }
	    },
	    loop: false,
	    speed: 1,
	    timerOn: false,
	    timer: null,
	    paused: false,
	    // make async Function execute as Sync Function..
	    wait: function wait(targets, duration) {
	        var duration = duration || 0;
	        return new Promise(function (res, rej) {
	            setTimeout(function () {
	                if (targets instanceof Object) myTween.objs = Object.assign(myTween.objs, targets);else if (targets instanceof Function) console.log("execute Func await..");
	                targets.call(this);
	                res();
	            }, duration);
	        });
	    },
	    toggleAni: function toggleAni(paused) {
	        if (paused != undefined) {
	            this.paused = paused;
	            var status = paused ? "paused" : "playing";
	            return;
	        }
	        this.paused = !this.paused;
	    },
	    toggleLoop: function toggleLoop(loop) {
	        if (loop != undefined) {
	            this.loop = loop;
	            return;
	        }
	        this.loop = !this.loop;
	    },
	    lastAniParams: [undefined, undefined]
	};

	var sleep = exports.sleep = function sleep(time, fn) {
	    return new Promise(function (resolve, reject) {
	        setTimeout(function () {
	            if (fn && fn instanceof Function) {
	                resolve(fn());
	            } else {
	                resolve();
	            }
	        }, time);
	    });
	};

/***/ }
/******/ ])
});
;