webpackJsonp([1,2],{

/***/ 363:
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(371);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(384)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!C:\\Users\\ahuang\\AppData\\Roaming\\npm\\node_modules\\angular-cli\\node_modules\\css-loader\\index.js!C:\\Users\\ahuang\\AppData\\Roaming\\npm\\node_modules\\angular-cli\\node_modules\\postcss-loader\\index.js!./styles.css", function() {
			var newContent = require("!!C:\\Users\\ahuang\\AppData\\Roaming\\npm\\node_modules\\angular-cli\\node_modules\\css-loader\\index.js!C:\\Users\\ahuang\\AppData\\Roaming\\npm\\node_modules\\angular-cli\\node_modules\\postcss-loader\\index.js!./styles.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ },

/***/ 371:
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(372)();
// imports


// module
exports.push([module.i, "/* You can add global styles to this file, and also import other style files */\r\n\r\nbody {\r\n    width: 100%;\r\n    height: 100%;\r\n    color: #5c5c5c;\r\n    overflow: hidden;\r\n    background-repeat: no-repeat;\r\n    font-family: \"MicroSoft Yahei\";\r\n    /*background-image: url(\"../resource/WorkTile首页.png\");*/\r\n    opacity: 1;\r\n}\r\nbody, html {\r\n    padding: 0;\r\n    margin: 0;\r\n    box-sizing: border-box;\r\n}\r\n#popuplayer {\r\n    position: absolute;\r\n    width: 100%;\r\n    height: 100%;\r\n    padding: 0;\r\n    margin: 0;\r\n    background: #f9f7f3;\r\n}\r\n.sidenav {\r\n    background: #2e2d2b;\r\n    float:left;\r\n    width: 75px;\r\n    height: 100%;\r\n}\r\n.verti {\r\n    text-align: center;\r\n    vertical-align: middle;\r\n    font-size: 1.2em;\r\n    width: 75px;\r\n    height: 50px;\r\n    padding-top: 10px;\r\n    /*float: left;*/\r\n    margin-top: 40px;\r\n}\r\n.leftbottom {\r\n    position: absolute;\r\n    left: 0;\r\n    bottom: 10px;\r\n}\r\n#navitems {\r\n    width: 100%;\r\n    padding: 0;\r\n    margin-top: 100px;\r\n}\r\n#tabcontent {\r\n    width:100%;\r\n    min-width: 500px;\r\n    /*float: left;*/\r\n}\r\n/*flex or grid is better!!*/\r\nheader {\r\n    background-color: #fff;\r\n    box-shadow: 2px 2px 2px rgba(0,0,0,0.2);\r\n    width: 100%;    \r\n    height: 45px;\r\n}\r\n.lefttitle {\r\n    float: left;\r\n    height: 30px;\r\n    padding-top: 10px;\r\n    margin: -5px 30px 0 50px;\r\n}\r\n.lefttext {\r\n    /*float: left;*/\r\n    margin-top: 5px;\r\n    margin-left: -50%;\r\n}\r\n.lefttext:after {\r\n    content: \"\";\r\n    float: none;\r\n    clear: both;\r\n}\r\n.clear {\r\n    content: \"\";\r\n    float: none;\r\n    clear: both;\r\n}\r\n.rightpanel {\r\n    margin: 0 auto;\r\n}\r\n.lgfont {\r\n    font-size: 1.4em;\r\n}\r\n.smfont {\r\n    font-size: 0.9em;\r\n}\r\n.headitem {\r\n    display: inline-block;\r\n}\r\n.hori-group {\r\n    \r\n}\r\n.hori {\r\n    text-align: center;\r\n    vertical-align: middle;\r\n    font-size: 1.2em;\r\n    width: 80px;\r\n    height: 30px;\r\n    padding-top: 10px;\r\n    float: left;\r\n    margin: 0px;\r\n}\r\n.bloc {\r\n    display: block;\r\n}\r\n.hov:hover {\r\n    cursor: pointer;\r\n    color: #ba1010;\r\n    /*width: 100%;*/\r\n    /*background-color: rgba(200,200,200,0.1);*/\r\n    transition: border, 0.6s;    \r\n    /*border: 1px solid rgba(200,200,200,0.1);*/\r\n}\r\n.bottom:hover {\r\n    border-bottom: 2px solid rgba(200,200,200,0.9);\r\n}\r\n\r\n#content {\r\n    width: 100%;\r\n    height: 80%;\r\n}\r\nfooter {\r\n    width: 100%;\r\n    height: 10%;\r\n}\r\na {\r\n    text-decoration-line: none;\r\n    text-decoration-style: none;\r\n}\r\nli {\r\n    list-style: none;\r\n}\r\n.btn {\r\n    text-decoration: none;\r\n    text-decoration-line: none;\r\n    text-align: center;\r\n    display: inline-block;\r\n    width: 75px;\r\n    height: 40px;\r\n    border-radius: 4px;\r\n    margin: 10px 10px 0 0;\r\n    font-weight: bold;\r\n}\r\n.primary {\r\n    background: #3CBEF4;\r\n    border: 1px solid #3CBEF4;\r\n    color: #fff;\r\n}\r\n.accent {\r\n    background: #f9f7f3;\r\n    border: 1px solid #f9f7f3;\r\n}\r\n.btn:hover {\r\n    /*background: #fff;\r\n    color: #808080;*/\r\n    transition: background .5s ease;\r\n    cursor: pointer;\r\n    box-shadow: 2px 4px 4px 0 rgba(0,0,0,.1);\r\n}\r\n", ""]);

// exports


/***/ },

/***/ 372:
/***/ function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ },

/***/ 384:
/***/ function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ },

/***/ 661:
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(363);


/***/ }

},[661]);
//# sourceMappingURL=styles.map