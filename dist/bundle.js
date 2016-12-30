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
	exports.Controllers = exports.Drone = exports.Canvas = exports.Chart = undefined;

	var _drone = __webpack_require__(2);

	var _drone2 = _interopRequireDefault(_drone);

	var _canvas = __webpack_require__(5);

	var _canvas2 = _interopRequireDefault(_canvas);

	var _chartmodel = __webpack_require__(6);

	var _chartmodel2 = _interopRequireDefault(_chartmodel);

	var _controller = __webpack_require__(7);

	var _controller2 = _interopRequireDefault(_controller);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Chart = _chartmodel2.default;
	exports.Canvas = _canvas2.default;
	exports.Drone = _drone2.default;
	exports.Controllers = _controller2.default;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _const = __webpack_require__(3);

	var _const2 = _interopRequireDefault(_const);

	var _bullet = __webpack_require__(4);

	var _bullet2 = _interopRequireDefault(_bullet);

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
/* 3 */
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
/* 4 */
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
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// Some Static Function bind with one Canvas context
	var Canvas = function () {
	    function Canvas() {
	        _classCallCheck(this, Canvas);
	    }

	    _createClass(Canvas, null, [{
	        key: "init",

	        // Bound with a canvas element.
	        value: function init(ele) {
	            Canvas.canv = ele;
	            Canvas.height = ele.height;
	            Canvas.width = ele.width;
	            // let the canvas's width/height cohere width DOM width/height. 
	            Canvas.canv.width = ele.width;
	            Canvas.canv.height = ele.height;
	            Canvas.ctx = ele.getContext("2d");
	            Canvas.ctx.strokeStyle = "rgba(0,0,0,0.9)";
	            Canvas.ctx.fillStyle = "rgba(10,200,240,0.4)";
	            Canvas.ctx.strokeWidth = 2;
	            Canvas.animate = false;
	            Canvas.img = new Image();
	        }

	        /**
	         * set ctx.strokeStyle with rgba() @string
	         */

	    }, {
	        key: "setStroke",
	        value: function setStroke(colorStr) {
	            Canvas.ctx.strokeStyle = colorStr;
	        }

	        /**
	         * set ctx.fillStyle with rgba(). @string
	         */

	    }, {
	        key: "setFill",
	        value: function setFill(colorStr) {
	            Canvas.ctx.fillStyle = colorStr;
	        }

	        /**
	         * set ctx.strokeWidth and lineWidth. @number
	         */

	    }, {
	        key: "setWidth",
	        value: function setWidth(pixel) {
	            if (Canvas.ctx) {
	                Canvas.ctx.lineWidth = pixel;
	                Canvas.ctx.strokeWidth = pixel;
	            }
	        }

	        /**
	         * draw Circle with given x, y.
	         * radius: radius of Circle @number
	         * fill @bool
	         */

	    }, {
	        key: "drawPoint",
	        value: function drawPoint(coords, radius, fill, image, rotate, text) {
	            var imgWidth = void 0,
	                imgHeight = void 0;
	            Canvas.setFill("#EEE");
	            Canvas.setStroke("#EE1");
	            if (coords instanceof Array && coords.length == 2) {
	                Canvas.ctx.beginPath();
	                if (image) {
	                    Canvas.img.src = image;
	                    if (radius) {
	                        imgWidth = radius;
	                        imgHeight = radius;
	                    } else {
	                        imgWidth = Canvas.img.width;
	                        imgHeight = Canvas.img.height;
	                    }
	                    // drawImage(img, x2left, y2up, imgWidth, imgHeight)
	                    // console.log("rendering drone..with width:" + imgWidth + " height:" + imgHeight);
	                    var _y = Canvas.height - coords[1];
	                    if (rotate) Canvas.rotateCtx(coords, rotate);
	                    Canvas.ctx.drawImage(Canvas.img, parseInt(coords[0]), parseInt(_y), imgWidth, imgHeight);
	                    if (rotate) Canvas.restore(coords);
	                    return;
	                }
	                var y = Canvas.height - coords[1];
	                Canvas.ctx.arc(parseInt(coords[0]), parseInt(y), radius, 0, Math.PI * 2);

	                if (typeof rotate == 'number') {
	                    var tmp = rotate % (Math.PI * 2) - Math.PI / 2;
	                    Canvas.ctx.arc(parseInt(coords[0]), parseInt(y), radius + 2, tmp - Math.PI / 4, tmp + Math.PI / 4);
	                    console.log("rendering drone..with rotate:" + tmp);
	                }

	                if (text) Canvas.ctx.fillText(text, coords[0], parseInt(y) - 4);

	                if (fill) {
	                    Canvas.ctx.fill();
	                } else {
	                    Canvas.ctx.stroke();
	                }
	            } else return;
	        }
	    }, {
	        key: "restore",
	        value: function restore(coords) {
	            var y = Canvas.height - coords[1];
	            Canvas.ctx.translate(parseInt(-coords[0]), parseInt(-y));
	            Canvas.ctx.restore();
	        }

	        /**
	         * rotate by the obj! 
	         * first save ctx and translate to the obj center..
	         * draw obj after ctx rotate !!
	         * then translate back and retore
	         */

	    }, {
	        key: "rotateCtx",
	        value: function rotateCtx(coords, rotate) {
	            Canvas.ctx.save();
	            var y = Canvas.height - coords[1];
	            Canvas.ctx.translate(parseInt(coords[0]), parseInt(y));
	            Canvas.ctx.rotate(rotate);
	        }

	        /**
	         * drawBar with given Value..
	         * x: where to draw in X axis..
	         * width: bar width,
	         * value: bar y value.
	         * fill: fill or stroke. default false.
	         */

	    }, {
	        key: "drawBar",
	        value: function drawBar(x, width, value, fill) {
	            var barY = Canvas.height - value;
	            if (fill) {
	                // fillRect(leftUP.X, Y, RectWidth, RectHeight)
	                Canvas.ctx.fillRect(x, barY, width, value);
	            } else {
	                Canvas.ctx.strokeRect(x, barY, width, value);
	            }
	        }

	        /**
	         * drawLine with given Value..@Array
	         * lwidth : lineWidth @number
	         * dash: default false @bool
	         * fill: closeLine to a polygon
	         */

	    }, {
	        key: "drawLine",
	        value: function drawLine(data, lwidth, dash, fill) {
	            if (data instanceof Array && data.length > 0) {
	                Canvas.ctx.strokeStyle = "#FF0000";
	                Canvas.ctx.lineWidth = lwidth ? lwidth : 2;
	                Canvas.ctx.beginPath();
	                // for drawing area close with xaxis.. render first point.
	                if (fill) {
	                    Canvas.ctx.moveTo(-100, Canvas.height);
	                }
	                for (var i = 0; i < data.length; i++) {
	                    // each point of line contains x, y.
	                    if (data[i] instanceof Array && data[i].length == 2) {
	                        var pointy = Canvas.height - data[i][1];
	                        Canvas.ctx.lineTo(data[i][0], pointy);
	                    }
	                }
	                if (fill) {
	                    // close with beginPath point
	                    Canvas.ctx.lineTo(data[data.length - 1][0], Canvas.height);
	                    Canvas.ctx.closePath();
	                    // Canvas.ctx.stroke();
	                    Canvas.ctx.fill();
	                } else {
	                    Canvas.ctx.stroke();
	                }
	            }
	        }

	        /**
	         * draw Math.sin with canvas.
	         */
	        // static drawDemoline() {
	        //     let base = 50;

	        // }

	        /**
	         * drawBars with given data..
	         * width: bar width,
	         * data: Array of values..
	         * fill: fill or stroke. default false.
	         */

	    }, {
	        key: "drawBars",
	        value: function drawBars(data, fill) {
	            Canvas.clearCanv();
	            Canvas.ctx.strokeStyle = "#000";
	            Canvas.setWidth(2);
	            var barY = void 0,
	                barX = 10;
	            if (data instanceof Array) {
	                var segWidth = (Canvas.width - 20) / data.length;
	                var barWidth = segWidth * 0.7;
	                for (var i = 0; i < data.length; i++) {
	                    Canvas.drawBar(barX, barWidth, data[i]);
	                    barX += segWidth;
	                }
	            } else {
	                console.error('pls Input Array Data');
	            }
	            console.warn("Bars rendered complete..");
	        }
	    }, {
	        key: "clearCanv",
	        value: function clearCanv() {
	            Canvas.ctx.clearRect(0, 0, Canvas.width, Canvas.height);
	            Canvas.setFill("#000");
	            Canvas.ctx.fillRect(0, 0, Canvas.width, Canvas.height);
	        }
	    }]);

	    return Canvas;
	}();

	exports.default = Canvas;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _canvas = __webpack_require__(5);

	var _canvas2 = _interopRequireDefault(_canvas);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var chart = function () {
	    // init chart bind with a div element @object.
	    function chart(opts) {
	        _classCallCheck(this, chart);

	        this.ele = opts.ele ? opts.ele : null;
	        this.data = opts.data ? opts.data : [];
	        this.type = opts.type ? opts.type : null;
	        this.maxValue = 0;
	        this.rotate = opts.rotate ? opts.rotate : 0;
	        // specify url as data source.. update by GET.
	        this.url = opts.url ? opts.url : null;
	    }

	    // new Promise to GET latest data, then redraw


	    _createClass(chart, [{
	        key: 'updateData',
	        value: function updateData() {}
	        // new Promise() 


	        /**
	         * set chart.data with Array instance, then redraw.
	         */

	    }, {
	        key: 'setData',
	        value: function setData(data) {
	            this.data = data.coords;
	            this.rotate = data.rotate;
	            this.dataName = data.name;
	            _canvas2.default.clearCanv();
	            this.render();
	            return this;
	        }

	        /**
	         * render data in Canvas according data dimension
	         * width different strategy..
	         */

	    }, {
	        key: 'render',
	        value: function render() {
	            // if line or poly
	            if (this.data instanceof Array && this.data.length > 0 && this.data[0] instanceof Array) {
	                _canvas2.default.drawLine(this.data, null, null);
	            } else if (this.data instanceof Array && this.data.length > 0) {
	                if (this.url) {
	                    // render point with icon image.
	                    _canvas2.default.drawPoint(this.data, 20, null, this.url, this.rotate, this.dataName);
	                } else {
	                    _canvas2.default.drawPoint(this.data, 2, null, null, this.rotate, this.dataName);
	                }
	            }
	        }

	        // stat max value of Data and set to maxValue. only for 1 dimension data.[y1, y2, y3 ...]

	    }, {
	        key: 'statMax',
	        value: function statMax() {
	            var _this = this;

	            if (_typeof(this.data) == Array && this.data.length > 0) {
	                this.data.forEach(function (value) {
	                    if (_this.maxValue < value) _this.maxValue = value;
	                });
	            }
	            return this;
	        }

	        /**
	        * generate Math.sin/cos line data..
	         * 
	        * sin: 'sin'/'cos'/'tan' @string
	        * xEnd: finally returned points number.
	        * fatness: fatness of line. bigger the fatter will the line be.
	        * offset: offset to left with animation. @number
	         * 
	         * Return: 2 dimension Array. [[x1,y1], [x2,y2] ...] @Array
	        */

	    }, {
	        key: 'generateSinLine',
	        value: function generateSinLine(sin, xEnd, fatness, offset) {
	            var points = [],
	                y = 0,
	                yheight = 50,
	                ybase = 50,
	                fat = fatness ? fatness : 20.0,
	                off = offset ? offset : 0;
	            // 像素个数 xEnd. 
	            for (var x = 0; x < xEnd; x++) {
	                if (sin == 'sin') {
	                    y = parseInt(Math.sin(x / fat) * yheight);
	                } else if (sin == 'cos') y = parseInt(Math.cos(x / fat) * yheight);else if (sin == 'tan') y = parseInt(Math.tan(x / fat) * yheight);

	                points.push([x - off, y + ybase]);
	            }
	            return points;
	        }
	    }]);

	    return chart;
	}();

	exports.default = chart;


	var strategies = {};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _drone = __webpack_require__(2);

	var _drone2 = _interopRequireDefault(_drone);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var controllers = function () {
	    function controllers() {
	        _classCallCheck(this, controllers);
	    }

	    _createClass(controllers, null, [{
	        key: 'gameControl',

	        /**
	         * GameController bind with a drone instance.. 
	         * After start this controller, use WSAD to move drone.
	         */
	        value: function gameControl(drone) {
	            if (drone instanceof _drone2.default !== true) {
	                console.error("gameControl must bind with a drone instance.");
	                return;
	            }
	            document.body.addEventListener('keydown', function (e) {
	                if (e.which === 37 || e.which === 65) {
	                    drone.turnLeft();
	                }
	                if (e.which === 39 || e.which === 68) {
	                    drone.turnRight();
	                }
	                if (e.which === 38 || e.which === 87) {
	                    // faster
	                    drone.accelerate();
	                }
	                if (e.which === 40 || e.which === 83) {
	                    // slower
	                    drone.brake();
	                }
	                if (e.which === 32) {
	                    drone.fire();
	                }
	            });
	            console.log("gameControl register success.");
	        }

	        /**
	         * Calculate bullets location based on drones.
	         */

	    }, {
	        key: 'bulletCalculater',
	        value: function bulletCalculater(drones) {}

	        /**
	         * Dashboard bind with a drone instance and div element... 
	         * After start this controller, use WSAD to move drone.
	         */

	    }, {
	        key: 'dashBoard',
	        value: function dashBoard(drone, ele) {
	            if (drone instanceof _drone2.default !== true) {
	                console.error("dashBoard must bind with a drone instance.");
	                return;
	            }
	            try {
	                setInterval(function () {
	                    ele.innerHTML = drone.name + "<br> coords: " + drone.point.coordinates[0].toFixed(1) + ", " + drone.point.coordinates[1].toFixed(1) + "<br>" + 'speed: ' + drone.speed + "<br>" + 'direction: ' + (drone.direction % (Math.PI * 2) * 180 / Math.PI).toFixed(1);
	                }, 200);
	            } catch (e) {
	                console.error(e);
	            }
	            console.log("dashBoard register success.");
	        }
	    }]);

	    return controllers;
	}();

	exports.default = controllers;

/***/ }
/******/ ])
});
;