(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["swl"] = factory();
	else
		root["swl"] = factory();
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

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.lgSelect = undefined;

	var _lgselect = __webpack_require__(2);

	var _lgselect2 = _interopRequireDefault(_lgselect);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // // this is Root Module for Whole app, require lib we need.
	// import LowPoly from './lowpoly';
	// // import * as Dashboard from 'dashboard';
	// import Drone from './drone';


	var RootApp = function RootApp() {
	    _classCallCheck(this, RootApp);
	};

	// Static Props..
	// RootApp.Drone = Drone;
	// RootApp.LowPoly = LowPoly;


	RootApp.lgSelect = _lgselect2.default;

	exports.lgSelect = _lgselect2.default;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _addrObj = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var CURSOR_RANGE = 1000;

	var lgSelect = function () {
	    function lgSelect(opt) {
	        _classCallCheck(this, lgSelect);

	        this.filterStr = "";
	        // actually here should defineProperty filteredOptions !! to watch the change.
	        this.filteredOptions = [];
	        this.dropOpen = false;
	        this.cursor = 0;
	        this.dropMenu = null;
	        this.selectInput = null;
	        this.selectBtn = null;
	        this.selected = {};
	        this.options = opt.options || [];
	        this.container = opt.containerId;
	        this.dropdownContainer = null;

	        console.log("ngInit...");
	        this.selected.name = opt.title || "select option";
	        // filter 1000 elements to fill in dropMenu.        
	        this.filterAO();
	        this.bindDOM();
	    }

	    /** implement universe data-bind Directive.. */


	    _createClass(lgSelect, [{
	        key: "bindDOM",
	        value: function bindDOM() {
	            var selectBtn = document.createElement("a");
	            selectBtn.className = "lg-select";
	            selectBtn.href = "javascript:void(0)";
	            var selectInput = document.createElement("input");
	            selectInput.placeholder = "keyword to search";
	            var dropdownContainer = document.createElement("div");
	            dropdownContainer.className = "dropdown-container";
	            dropdownContainer.appendChild(selectBtn);

	            var selectContainer = null;
	            if (this.container && document.querySelector("#" + this.container)) {
	                selectContainer = document.querySelector("#" + this.container);
	            } else {
	                console.error("Given containerId not correct.");
	                return;
	            }
	            selectContainer.appendChild(selectInput);
	            selectContainer.appendChild(dropdownContainer);

	            var dropMenu = document.createElement("ul");
	            dropMenu.className = "dropdown-menu";
	            dropdownContainer.appendChild(dropMenu);
	            this.dropdownContainer = dropdownContainer;
	            this.dropMenu = dropMenu;
	            this.selectInput = selectInput;
	            this.selectBtn = selectBtn;

	            if (selectBtn && selectInput && selectContainer && dropMenu) {
	                selectBtn.addEventListener("click", this.wrapHandler(this, this.toggleDropdown));
	                selectInput.onblur = this.wrapHandler(this, this.searchAO);
	                selectInput.onkeyup = this.wrapHandler(this, this.searchAO);
	                selectContainer.addEventListener("click", this.wrapHandler(this, this.hideDropdown));
	                dropMenu.onclick = this.wrapHandler(this, this.selectAO);
	                dropMenu.onscroll = this.wrapHandler(this, this.scrollListener);
	            } else {
	                console.error("bindDom error.");
	            }
	            this.updateDOM();
	        }
	    }, {
	        key: "wrapHandler",
	        value: function wrapHandler(ctx, func) {
	            return func.bind(ctx);
	        }

	        /**
	         * tranverse component DOM ele, and update the DOM value..
	         */

	    }, {
	        key: "updateDOM",
	        value: function updateDOM() {
	            // generate li depend on this.options... bind span innerText with *.name
	            var itemsHtml = "";
	            for (var i = 0; i < this.filteredOptions.length; i++) {
	                if (this.filteredOptions[i].name) {
	                    itemsHtml += "<li>" + this.filteredOptions[i].name + "</li>";
	                }
	            }
	            this.dropMenu.innerHTML = itemsHtml;
	            this.selectBtn.innerHTML = this.selected.name + "<span class=\"caret\"></span>";
	        }
	    }, {
	        key: "getSelected",
	        value: function getSelected() {
	            return this.selected;
	        }
	    }, {
	        key: "setOptions",
	        value: function setOptions(options) {
	            this.options = options;
	            return this;
	        }
	    }, {
	        key: "filterAO",

	        // fill dropMenu depend on the index range..
	        value: function filterAO() {
	            try {
	                if (this.cursor < 0 || this.cursor > this.options.length) return;
	                // #issue to address: slice safe
	                this.filteredOptions = this.options.slice(this.cursor, this.cursor + CURSOR_RANGE);
	                console.log("filtering addrobjs to promote performance..");
	            } catch (error) {
	                console.error(error);
	            }
	        }
	    }, {
	        key: "searchAO",

	        // keyUp listener.
	        value: function searchAO(evt) {
	            var _this = this;
	            if (evt.keyCode == 13 || evt.type == "blur") {} else return;
	            this.filterStr = this.selectInput.value;
	            if (this.filterStr.length === 0) {
	                this.cursor = 0;
	                this.filterAO();
	                this.updateDOM();
	                return;
	            }
	            try {
	                var tempAOs = [];
	                for (var j = 0; j < this.options.length; j++) {
	                    var curAO = this.options[j];
	                    if (curAO.name.indexOf(this.filterStr) > -1) {
	                        tempAOs.push(curAO);
	                    }
	                }
	                this.filteredOptions = tempAOs;
	                this.updateDOM();
	                setTimeout(function () {
	                    _this.openDropdown();
	                }, 200);
	                console.warn("search keyword is: " + this.filterStr, " search res num: " + tempAOs.length);
	            } catch (error) {
	                console.error("something happen when search AO");
	            }
	        }
	    }, {
	        key: "selectAO",

	        // selectAO by click AO list-item.
	        value: function selectAO(evt) {
	            var target = evt.target || evt.srcElement;
	            if (target.tagName && target.tagName === "LI") {
	                this.selected = {
	                    'name': target.innerText
	                };
	                console.warn("selected AO: " + target.innerText);
	                this.updateDOM();
	                this.hideDropdown();
	                return;
	            } else {
	                console.warn("NOT selected AO.........");
	            }
	        }
	    }, {
	        key: "scrollListener",

	        // to listen scroll on dropMenu, in order to filter new AO... throttle must be applied to this..
	        value: function scrollListener(evt) {
	            var _this2 = this;

	            var _this = this;
	            if (this.filterStr.length == 0) {
	                // cooling time 300ms for scrollListener.
	                // this.throttle(this.loadMoreAO, 300);
	                setTimeout(function () {
	                    _this.loadMoreAO();
	                    _this2.updateDOM();
	                }, 300);
	            }
	        }
	    }, {
	        key: "loadMoreAO",

	        // if function called as eventListener !! `this` means the Element which trigger evt ??
	        value: function loadMoreAO() {
	            // console.warn("when handling wheel evt, `this` means " + this);
	            if (this.dropMenu.scrollHeight - this.dropMenu.scrollTop < 211 && this.cursor < this.options.length - CURSOR_RANGE) {
	                // scroll to next page.
	                this.cursor += CURSOR_RANGE;
	                this.filterAO();
	                this.dropMenu.scrollTop = 1;
	            } else if (this.dropMenu.scrollTop < 1 && this.cursor > CURSOR_RANGE - 1) {
	                this.cursor -= CURSOR_RANGE;
	                this.filterAO();
	                this.dropMenu.scrollTop = this.dropMenu.scrollHeight * 0.95;
	            } else {
	                return;
	            }
	        }
	    }, {
	        key: "toggleDropdown",

	        // all variable need stric type.
	        value: function toggleDropdown(evt) {
	            var dropBtn = evt.target || evt.srcElement;
	            evt.stopPropagation();
	            if (!this.dropOpen && dropBtn.parentElement) {
	                // parent.. add Class .open
	                this.dropOpen = true;
	                setTimeout(function () {
	                    dropBtn.parentElement.className += " open";
	                    console.log("menu open...");
	                }, 50);
	            } else if (this.dropOpen) {
	                // hide the dropMenu
	                dropBtn.parentElement.className = "dropdown-container";
	                this.dropOpen = false;
	                console.log("menu hidden...`this` indicate: " + this);
	            }
	        }
	    }, {
	        key: "openDropdown",
	        value: function openDropdown() {
	            if (this.dropMenu && this.dropMenu.parentElement) {
	                var dropContainer = this.dropMenu.parentElement;
	                dropContainer.className += " open";
	                this.dropOpen = true;
	            }
	        }
	    }, {
	        key: "hideDropdown",
	        value: function hideDropdown(evt) {
	            // hide the dropMenu
	            this.dropdownContainer.className = "dropdown-container";
	            this.dropOpen = false;
	        }
	    }]);

	    return lgSelect;
	}();

	exports.default = lgSelect;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var AddrObj = function AddrObj(opt) {
	    _classCallCheck(this, AddrObj);

	    this.name = opt.name || "";
	};

	exports.default = AddrObj;

/***/ }
/******/ ])
});
;