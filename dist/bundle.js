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

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.lgSelect = exports.LowPoly = exports.Drone = undefined;

	var _lowpoly = __webpack_require__(2);

	var _lowpoly2 = _interopRequireDefault(_lowpoly);

	var _drone = __webpack_require__(4);

	var _drone2 = _interopRequireDefault(_drone);

	var _lgselect = __webpack_require__(8);

	var _lgselect2 = _interopRequireDefault(_lgselect);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // this is Root Module for Whole app, require lib we need.

	// import * as Dashboard from 'dashboard';


	var RootApp = function RootApp() {
	    _classCallCheck(this, RootApp);
	};

	// Static Props..


	RootApp.Drone = _drone2.default;
	RootApp.LowPoly = _lowpoly2.default;
	RootApp.lgSelect = _lgselect2.default;

	exports.Drone = _drone2.default;
	exports.LowPoly = _lowpoly2.default;
	exports.lgSelect = _lgselect2.default;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Author: Jrain Lau
	 * E-mail: jrainlau@163.com
	 * Version: 0.1.0
	 */
	{
	  (function () {
	    'use strict';

	    var sourceLoadComplete = Symbol('sourceLoadComplete');
	    var setSource = Symbol('setSource');
	    var generate = Symbol('generate');
	    var getEdgePoint = Symbol('getEdgePoint');
	    var grayscaleFilterR = Symbol('grayscaleFilterR');
	    var convolutionFilterR = Symbol('convolutionFilterR');

	    var image = void 0,
	        source = void 0,
	        canvas = void 0,
	        context = void 0,
	        generating = true,
	        timeoutId = null;

	    var generateTime = 0;

	    /**
	     * Delaunay
	     * fork from https://github.com/timbennett/delaunay
	     */
	    var Delaunay = function () {
	      /**
	       * Node
	       *
	       * @param {Number} x
	       * @param {Number} y
	       * @param {Number} id
	       */
	      function Node(x, y, id) {
	        this.x = x;
	        this.y = y;
	        this.id = !isNaN(id) && isFinite(id) ? id : null;
	      }

	      Node.prototype = {
	        eq: function eq(p) {
	          var dx = this.x - p.x;
	          var dy = this.y - p.y;
	          return (dx < 0 ? -dx : dx) < 0.0001 && (dy < 0 ? -dy : dy) < 0.0001;
	        },

	        toString: function toString() {
	          return '(x: ' + this.x + ', y: ' + this.y + ')';
	        }
	      };

	      /**
	       * Edge
	       *
	       * @param {Node} p0
	       * @param {Node} p1
	       */
	      function Edge(p0, p1) {
	        this.nodes = [p0, p1];
	      }

	      Edge.prototype = {
	        eq: function eq(edge) {
	          var na = this.nodes,
	              nb = edge.nodes;
	          var na0 = na[0],
	              na1 = na[1],
	              nb0 = nb[0],
	              nb1 = nb[1];
	          return na0.eq(nb0) && na1.eq(nb1) || na0.eq(nb1) && na1.eq(nb0);
	        }
	      };

	      /**
	       * Triangle
	       *
	       * @param {Node} p0
	       * @param {Node} p1
	       * @param {Node} p2
	       */
	      function Triangle(p0, p1, p2) {
	        this.nodes = [p0, p1, p2];
	        this.edges = [new Edge(p0, p1), new Edge(p1, p2), new Edge(p2, p0)];

	        // 今回は id は使用しない
	        this.id = null;

	        // この三角形の外接円を作成する

	        var circle = this.circle = new Object();

	        var ax = p1.x - p0.x,
	            ay = p1.y - p0.y,
	            bx = p2.x - p0.x,
	            by = p2.y - p0.y,
	            t = p1.x * p1.x - p0.x * p0.x + p1.y * p1.y - p0.y * p0.y,
	            u = p2.x * p2.x - p0.x * p0.x + p2.y * p2.y - p0.y * p0.y;

	        var s = 1 / (2 * (ax * by - ay * bx));

	        circle.x = ((p2.y - p0.y) * t + (p0.y - p1.y) * u) * s;
	        circle.y = ((p0.x - p2.x) * t + (p1.x - p0.x) * u) * s;

	        var dx = p0.x - circle.x;
	        var dy = p0.y - circle.y;
	        circle.radiusSq = dx * dx + dy * dy;
	      }

	      /**
	       * Delaunay
	       *
	       * @param {Number} width
	       * @param {Number} height
	       */
	      function Delaunay(width, height) {
	        this.width = width;
	        this.height = height;

	        this._triangles = null;

	        this.clear();
	      }

	      Delaunay.prototype = {
	        clear: function clear() {
	          var p0 = new Node(0, 0);
	          var p1 = new Node(this.width, 0);
	          var p2 = new Node(this.width, this.height);
	          var p3 = new Node(0, this.height);

	          this._triangles = [new Triangle(p0, p1, p2), new Triangle(p0, p2, p3)];

	          return this;
	        },

	        insert: function insert(points) {
	          var k = void 0,
	              klen = void 0,
	              i = void 0,
	              ilen = void 0,
	              j = void 0,
	              jlen = void 0;
	          var triangles = void 0,
	              t = void 0,
	              temps = void 0,
	              edges = void 0,
	              edge = void 0,
	              polygon = void 0;
	          var x = void 0,
	              y = void 0,
	              circle = void 0,
	              dx = void 0,
	              dy = void 0,
	              distSq = void 0;

	          for (k = 0, klen = points.length; k < klen; k++) {
	            x = points[k][0];
	            y = points[k][1];

	            triangles = this._triangles;
	            temps = [];
	            edges = [];

	            for (ilen = triangles.length, i = 0; i < ilen; i++) {
	              t = triangles[i];

	              // 座標が三角形の外接円に含まれるか調べる
	              circle = t.circle;
	              dx = circle.x - x;
	              dy = circle.y - y;
	              distSq = dx * dx + dy * dy;

	              if (distSq < circle.radiusSq) {
	                // 含まれる場合三角形の辺を保存
	                edges.push(t.edges[0], t.edges[1], t.edges[2]);
	              } else {
	                // 含まれない場合は持ち越し
	                temps.push(t);
	              }
	            }

	            polygon = [];

	            // 辺の重複をチェック, 重複する場合は削除する
	            edgesLoop: for (ilen = edges.length, i = 0; i < ilen; i++) {
	              edge = edges[i];

	              // 辺を比較して重複していれば削除
	              for (jlen = polygon.length, j = 0; j < jlen; j++) {
	                if (edge.eq(polygon[j])) {
	                  polygon.splice(j, 1);
	                  continue edgesLoop;
	                }
	              }

	              polygon.push(edge);
	            }

	            for (ilen = polygon.length, i = 0; i < ilen; i++) {
	              edge = polygon[i];
	              temps.push(new Triangle(edge.nodes[0], edge.nodes[1], new Node(x, y)));
	            }

	            this._triangles = temps;
	          }

	          return this;
	        },

	        getTriangles: function getTriangles() {
	          return this._triangles.slice();
	        }
	      };

	      Delaunay.Node = Node;

	      return Delaunay;
	    }();

	    /**
	     * LowPoly
	     *
	     * Put in an image and return a low-poly style one.
	     *
	     * @param    {String}  src     address of an original image
	     * @param    {Objext}  config  configaration
	     *
	     */

	    var LowPoly = function () {
	      function LowPoly(src, _ref) {
	        var EDGE_DETECT_VALUE = _ref.EDGE_DETECT_VALUE,
	            POINT_RATE = _ref.POINT_RATE,
	            POINT_MAX_NUM = _ref.POINT_MAX_NUM,
	            BLUR_SIZE = _ref.BLUR_SIZE,
	            EDGE_SIZE = _ref.EDGE_SIZE,
	            PIXEL_LIMIT = _ref.PIXEL_LIMIT;

	        _classCallCheck(this, LowPoly);

	        this.src = src;
	        this.EDGE_DETECT_VALUE = EDGE_DETECT_VALUE || 80;
	        this.POINT_RATE = POINT_RATE || 0.075;
	        this.POINT_MAX_NUM = POINT_MAX_NUM || 3500;
	        this.BLUR_SIZE = BLUR_SIZE || 2;
	        this.EDGE_SIZE = EDGE_SIZE || 6;
	        this.PIXEL_LIMIT = PIXEL_LIMIT || 350000;

	        this.blur = function (size) {
	          var matrix = [];
	          var side = size * 2 + 1;
	          var i = void 0,
	              len = side * side;
	          for (i = 0; i < len; i++) {
	            matrix[i] = 1;
	          }return matrix;
	        }(this.BLUR_SIZE);

	        this.edge = function (size) {
	          var matrix = [];
	          var side = size * 2 + 1;
	          var i = void 0,
	              len = side * side;
	          var center = len * 0.5 | 0;
	          for (i = 0; i < len; i++) {
	            matrix[i] = i === center ? -len + 1 : 1;
	          }return matrix;
	        }(this.EDGE_SIZE);
	      }

	      /**
	       * init
	       *
	       * translate an image into low-poly style
	       *
	       * returns    {Promise}  a promise contains the low-poly image base64 url
	       *
	       */


	      _createClass(LowPoly, [{
	        key: 'init',
	        value: function init() {
	          var self = this;
	          canvas = document.createElement('canvas');
	          context = canvas.getContext('2d');
	          source = new Image();
	          this[setSource](this.src);
	          return new Promise(function (res, rej) {
	            source.addEventListener('load', function () {
	              self[sourceLoadComplete]().then(function (data) {
	                res(data);
	              });
	            }, false);
	          });
	        }
	      }, {
	        key: sourceLoadComplete,
	        value: function value(e) {
	          var self = this;
	          var width = source.width;
	          var height = source.height;
	          var pixelNum = width * height;
	          if (pixelNum > this.PIXEL_LIMIT) {
	            var scale = Math.sqrt(this.PIXEL_LIMIT / pixelNum);
	            source.width = width * scale | 0;
	            source.height = height * scale | 0;

	            console.log('Source resizing ' + width + 'px x ' + height + 'px' + ' -> ' + source.width + 'px x ' + source.height + 'px');
	          }

	          if (timeoutId) clearTimeout(timeoutId);
	          generateTime = new Date().getTime();
	          console.log('Generate start...');
	          return new Promise(function (res, rej) {
	            timeoutId = setTimeout(function () {
	              self[generate]().then(function (data) {
	                res(data);
	              });
	            }, 0);
	          });
	        }
	      }, {
	        key: setSource,
	        value: function value(src) {
	          generating = true;
	          if (source.src !== src) {
	            source.removeAttribute('width');
	            source.removeAttribute('height');
	            source.src = src;
	          } else {
	            this[sourceLoadComplete](null);
	          }
	        }
	      }, {
	        key: generate,
	        value: function value() {
	          var width = canvas.width = source.width;
	          var height = canvas.height = source.height;

	          context.drawImage(source, 0, 0, width, height);

	          var imageData = context.getImageData(0, 0, width, height);
	          var colorData = context.getImageData(0, 0, width, height).data;

	          this[grayscaleFilterR](imageData);
	          this[convolutionFilterR](this.blur, imageData, this.blur.length);
	          this[convolutionFilterR](this.edge, imageData);

	          var temp = this[getEdgePoint](imageData);
	          var detectionNum = temp.length;

	          var points = [];
	          var i = 0,
	              ilen = temp.length;
	          var tlen = ilen;
	          var j = void 0,
	              limit = Math.round(ilen * this.POINT_RATE);
	          if (limit > this.POINT_MAX_NUM) {
	            limit = this.POINT_MAX_NUM;
	          }

	          while (i < limit && i < ilen) {
	            j = tlen * Math.random() | 0;
	            points.push(temp[j]);
	            temp.splice(j, 1);
	            tlen--;
	            i++;
	          }

	          var delaunay = new Delaunay(width, height);
	          var triangles = delaunay.insert(points).getTriangles();

	          var t = void 0,
	              p0 = void 0,
	              p1 = void 0,
	              p2 = void 0,
	              cx = void 0,
	              cy = void 0;

	          for (ilen = triangles.length, i = 0; i < ilen; i++) {
	            t = triangles[i];
	            p0 = t.nodes[0];p1 = t.nodes[1];p2 = t.nodes[2];

	            context.beginPath();
	            context.moveTo(p0.x, p0.y);
	            context.lineTo(p1.x, p1.y);
	            context.lineTo(p2.x, p2.y);
	            context.lineTo(p0.x, p0.y);

	            cx = (p0.x + p1.x + p2.x) * 0.33333;
	            cy = (p0.y + p1.y + p2.y) * 0.33333;

	            j = (cx | 0) + (cy | 0) * width << 2;

	            context.fillStyle = 'rgb(' + colorData[j] + ', ' + colorData[j + 1] + ', ' + colorData[j + 2] + ')';
	            context.fill();
	          }

	          var dataUrl = canvas.toDataURL('image/png');

	          generateTime = new Date().getTime() - generateTime;
	          console.log('Generate completed ' + generateTime + 'ms, ' + points.length + ' points (out of ' + detectionNum + ' points, ' + (points.length / detectionNum * 100).toFixed(2) + ' %), ' + triangles.length + ' triangles');

	          generating = false;

	          return new Promise(function (res, rej) {
	            res(dataUrl);
	          });
	        }
	      }, {
	        key: getEdgePoint,
	        value: function value(imageData) {
	          var width = imageData.width;
	          var height = imageData.height;
	          var data = imageData.data;

	          var E = this.EDGE_DETECT_VALUE;

	          var points = [];
	          var x = void 0,
	              y = void 0,
	              row = void 0,
	              col = void 0,
	              sx = void 0,
	              sy = void 0,
	              step = void 0,
	              sum = void 0,
	              total = void 0;

	          for (y = 0; y < height; y++) {
	            for (x = 0; x < width; x++) {
	              sum = total = 0;

	              for (row = -1; row <= 1; row++) {
	                sy = y + row;
	                step = sy * width;
	                if (sy >= 0 && sy < height) {
	                  for (col = -1; col <= 1; col++) {
	                    sx = x + col;

	                    if (sx >= 0 && sx < width) {
	                      sum += data[sx + step << 2];
	                      total++;
	                    }
	                  }
	                }
	              }

	              if (total) sum /= total;
	              if (sum > E) points.push(new Array(x, y));
	            }
	          }

	          return points;
	        }
	      }, {
	        key: grayscaleFilterR,
	        value: function value(imageData) {
	          var width = imageData.width | 0;
	          var height = imageData.height | 0;
	          var data = imageData.data;

	          var x = void 0,
	              y = void 0;
	          var i = void 0,
	              step = void 0;
	          var r = void 0,
	              g = void 0,
	              b = void 0;

	          for (y = 0; y < height; y++) {
	            step = y * width;

	            for (x = 0; x < width; x++) {
	              i = x + step << 2;
	              r = data[i];
	              g = data[i + 1];
	              b = data[i + 2];

	              data[i] = Math.max(r, g, b) + Math.min(r, g, b) >> 2;
	            }
	          }

	          return imageData;
	        }
	      }, {
	        key: convolutionFilterR,
	        value: function value(matrix, imageData, divisor) {
	          matrix = matrix.slice();
	          divisor = divisor || 1;

	          var divscalar = divisor ? 1 / divisor : 0;
	          var k = void 0,
	              len = void 0;
	          if (divscalar !== 1) {
	            for (k = 0, len = matrix.length; k < matrix.length; k++) {
	              matrix[k] *= divscalar;
	            }
	          }

	          var data = imageData.data;

	          len = data.length >> 2;
	          var copy = new Uint8Array(len);
	          for (var _i = 0; _i < len; _i++) {
	            copy[_i] = data[_i << 2];
	          }var width = imageData.width | 0;
	          var height = imageData.height | 0;
	          var size = Math.sqrt(matrix.length);
	          var range = size * 0.5 | 0;

	          var x = void 0,
	              y = void 0;
	          var r = void 0,
	              g = void 0,
	              b = void 0,
	              v = void 0;
	          var col = void 0,
	              row = void 0,
	              sx = void 0,
	              sy = void 0;
	          var i = void 0,
	              istep = void 0,
	              jstep = void 0,
	              kstep = void 0;

	          for (y = 0; y < height; y++) {
	            istep = y * width;

	            for (x = 0; x < width; x++) {
	              r = g = b = 0;

	              for (row = -range; row <= range; row++) {
	                sy = y + row;
	                jstep = sy * width;
	                kstep = (row + range) * size;

	                if (sy >= 0 && sy < height) {
	                  for (col = -range; col <= range; col++) {
	                    sx = x + col;

	                    if (sx >= 0 && sx < width && (v = matrix[col + range + kstep])) {
	                      r += copy[sx + jstep] * v;
	                    }
	                  }
	                }
	              }

	              if (r < 0) r = 0;else if (r > 255) r = 255;

	              data[x + istep << 2] = r & 0xFF;
	            }
	          }
	          return imageData;
	        }
	      }]);

	      return LowPoly;
	    }();

	    if (( false ? 'undefined' : _typeof(module)) === 'object' && _typeof(module.exports) === 'object') {
	      // CommonJS
	      module.exports = exports = LowPoly;
	    } else if (true) {
	      // AMD support
	      !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	        return LowPoly;
	      }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object') {
	      // Normal way
	      window.LowPoly = LowPoly;
	    }
	  })();
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)(module)))

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _const = __webpack_require__(5);

	var _const2 = _interopRequireDefault(_const);

	var _bullet = __webpack_require__(6);

	var _bullet2 = _interopRequireDefault(_bullet);

	var _util = __webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// // Drone model script
	// const firingTime = 1200, MAXSPEED = 3.900;

	/**
	 * Drone class with control method.
	 */
	var Drone = function () {
	    function Drone(opts) {
	        _classCallCheck(this, Drone);

	        this.id;
	        this.speed = opts.speed ? opts.speed : 1;
	        this.direction = opts.direction ? opts.direction : 0;

	        this.name = opts.name ? opts.name : this.randomName();
	        this.life = _const2.default.DroneParam.LIFE;
	        this.bullets = [];
	        this.firing = false;
	        this.point = {
	            type: 'Point',
	            coordinates: [100, 30]
	        };
	        this.bulletNum = 2;
	    }

	    /**
	     * maintask start interval to update its status.
	     */


	    _createClass(Drone, [{
	        key: 'updateDrone',
	        value: function updateDrone() {
	            this.point.coordinates[0] += Math.sin(this.direction) * this.speed;
	            this.point.coordinates[1] += Math.cos(this.direction) * this.speed;
	            // updateDroneView. toDO in maintask.js
	        }

	        // @log

	    }, {
	        key: 'randomName',
	        value: function randomName() {
	            var randomNum = Math.random() * 10000;
	            return "Player ".concat(randomNum.toFixed(0));
	        }
	    }, {
	        key: 'turnLeft',
	        value: function turnLeft() {
	            if (this) {
	                this.direction -= 0.1;
	                // this.updateDrone();
	            }
	        }
	    }, {
	        key: 'turnRight',
	        value: function turnRight() {
	            this.direction += 0.1;
	            // this.updateDrone();
	        }
	    }, {
	        key: 'accelerate',
	        value: function accelerate() {
	            if (this.speed < _const2.default.DroneParam.MAXSPEED) {
	                this.speed += 1;
	                // this.updateDrone();
	            }
	        }
	    }, {
	        key: 'brake',
	        value: function brake() {
	            if (this.speed > 0) {
	                this.speed -= 1;
	                // this.updateDrone();
	            }
	        }
	    }, {
	        key: 'fire',
	        value: function fire() {
	            var _this = this;

	            if (this.bullets instanceof Array && this.bullets.length > 0 && !this.firing) {
	                (function () {
	                    var that = _this;
	                    setTimeout(function () {
	                        that.firing = false;
	                        // clearInterval(that.interval);
	                    }, _const2.default.DroneParam.FIRINGTIME);
	                    _this.firing = true;
	                })();
	            } else if (!this.firing) {
	                (function () {
	                    for (var i = 0; i < _this.bulletNum; i++) {
	                        _this.bullets.push(new _bullet2.default(_this));
	                    }
	                    // create Closure to handle the firing status change..
	                    var that = _this;
	                    setTimeout(function () {
	                        that.firing = false;
	                        // clearInterval(that.interval);
	                    }, _const2.default.DroneParam.FIRINGTIME);
	                    _this.firing = true;
	                })();
	            } else {
	                // this firing.. do nothing.
	            }
	        }
	    }]);

	    return Drone;
	}();

	exports.default = Drone;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Const = function Const() {
	    _classCallCheck(this, Const);
	};

	// Static Props.


	exports.default = Const;
	Const.DroneParam = {
	    MAXSPEED: 5,
	    FIRINGTIME: 800,
	    LIFE: 10,
	    // Firing range.. 0.2 rad in LngLat
	    RANGE: 0.2
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Bullet class
	 */
	var Bullet =
	// opts should contain the Drone's direction and geometry
	function Bullet(opts) {
	    _classCallCheck(this, Bullet);

	    this.id;
	    this.direciton = opts.direction ? opts.direction : 0;
	    this.spoint = {
	        type: 'Point',
	        coordinates: [0, 0]
	    };
	    // DeepCopy the drone coords to bullet.
	    this.spoint.coordinates[0] = opts.point.coordinates[0];
	    this.spoint.coordinates[1] = opts.point.coordinates[1];
	};

	exports.default = Bullet;

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var util = function () {
	    function util() {
	        _classCallCheck(this, util);
	    }

	    _createClass(util, null, [{
	        key: "getJSON",


	        /**
	         * use promise to implement xmlHttpRequest process
	         * promise.then receive 2 params.(resolve func, reject func)
	         */
	        // static xhr(){
	        //     // promise will excute immediately after init.
	        //     let promise = new Promise(() => {

	        //     })
	        // }

	        /**
	         * Promise.prototype.then()
	         * receive resolve callback and reject callback.
	         * SO important, if series of Async Process is required, 
	         * Promise is better than callback hell !
	         * 
	         * xhr().then(data => { // resolve actions.. }, 
	         *          err => { // reject actions.. }
	         *      ).then()
	         * 
	         */

	        /**
	         * return promise obj.
	         */
	        value: function getJSON(url) {
	            var promise = new Promise(function (resolve, reject) {
	                var xhr = new XMLHttpRequest();
	                xhr.open("GET", url);
	                xhr.onreadystatechange = handler;
	                xhr.responseType = "json";
	                xhr.setRequestHeader("Accept", "application/json");
	                xhr.send();

	                function handler() {
	                    if (this.readyState !== 4) {
	                        return;
	                    }
	                    if (this.status === 200) {
	                        // if server response success
	                        resolve(this.response);
	                    } else {
	                        reject(new Error(this.statusText));
	                    }
	                };
	            });

	            return promise;
	        }

	        /**
	         * getJSON("somedata.json").then((data) => {
	         *      console.log("got data: " + data);
	         * })
	         * .catch((err) => {
	         *      console.error("encounter error..");
	         * })
	         */

	        /**
	         * compared with traditional imageload. what is the advantage ?
	         */

	    }, {
	        key: "loadImageAsync",
	        value: function loadImageAsync(url, resolve, reject) {
	            return new Promise(function (resolve, reject) {
	                var image = new Image();
	                image.onload = resolve;
	                image.onerror = reject;
	                image.src = path;
	            });
	        }

	        /**
	         * This decorator func.
	         */

	    }, {
	        key: "readonly",
	        value: function readonly(target, name, descriptor) {
	            descriptor.writable = false;
	            return descriptor;
	        }

	        /**
	         * target.descriptor..
	         * this decorator used for log before calling target function.
	         */

	    }, {
	        key: "log",
	        value: function log(target, name, descriptor) {
	            var oldValue = descriptor.value;

	            descriptor.value = function () {
	                console.log("Calling \"" + name + "\" with", arguments);
	                // descriptor.value refer to the target itself.. func or attri
	                return oldValue.apply(null, arguments);
	            };
	        }
	    }]);

	    return util;
	}();

	exports.default = util;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _addrObj = __webpack_require__(9);

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
	            var selectBtn = document.querySelector(".lg-select");
	            var selectInput = document.querySelector("#selectInput");
	            var selectContainer = document.querySelector("#container");

	            var dropMenu = document.createElement("ul");
	            dropMenu.className = "dropdown-menu";
	            selectBtn.parentElement.appendChild(dropMenu);
	            this.dropMenu = dropMenu;
	            this.selectInput = selectInput;
	            this.selectBtn = selectBtn;

	            if (selectBtn && selectInput && selectContainer && dropMenu) {
	                selectBtn.addEventListener("click", this.wrapHandler(this, this.toggleDropdown));
	                selectInput.onblur = this.wrapHandler(this, this.searchAO);
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
	                    itemsHtml += "<li><span>" + this.filteredOptions[i].name + "</span></li>";
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
	            var dropdownContainer = document.querySelector(".dropdown-container");
	            dropdownContainer.className = "dropdown-container";
	            this.dropOpen = false;
	        }
	    }]);

	    return lgSelect;
	}();

	exports.default = lgSelect;

/***/ },
/* 9 */
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