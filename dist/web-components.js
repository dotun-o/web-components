"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var DNMeter =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(DNMeter, _HTMLElement);

  _createClass(DNMeter, null, [{
    key: "observedAttributes",
    get: function get() {
      return ["min", "current", "max", "theme"];
    }
  }]);

  function DNMeter() {
    var _this;

    _classCallCheck(this, DNMeter);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DNMeter).call(this));
    var style = document.createElement('style');
    style.textContent = "* {\n            margin: 0;\n            border: 0;\n            padding: 0;\n            box-sizing: border-box;\n            transition: 0.2s;\n        }\n        .wrapper {\n            position: relative;\n        }\n        .track, .bar {\n            height: 50px;\n        }\n        .track {\n            border-radius: 5px;\n        }\n        .bar {\n            display: flex;\n            align-items: center;\n            justify-content: flex-end;\n            border-top-left-radius: 5px;\n            border-bottom-left-radius: 5px;\n            padding: 10px;\n            position: absolute;\n            top: 0;\n            left: 0;\n        }\n        .cool .track {\n            background-color: #44484C;\n        }\n        .cool .track:hover {\n            background-color: #505559;\n        }\n        .cool .bar {\n            color: #44484C;\n        }\n        .cool .bar {\n            background-color: #17c3e5;\n        }\n        .cool .bar:hover {\n            background-color: #00ffff;\n        }\n        .warm .track {\n            background-color: #4c4744;\n        }\n        .warm .track:hover {\n            background-color: #595350;\n        }\n        .warm .bar {\n            color: #4c4744;\n        }\n        .warm .bar {\n            background-color: #ffaa00;\n        }\n        .warm .bar:hover {\n            background-color: #ffea00;\n        }\n        .stats {\n            display: flex;\n            justify-content: space-between;\n        }";

    var shadow = _this.attachShadow({
      mode: "open"
    });

    var wrapper = document.createElement("div");
    var track = document.createElement("div");
    var bar = document.createElement("div");
    var stats = document.createElement("div");
    wrapper.setAttribute("class", "wrapper");
    track.setAttribute("class", "track");
    bar.setAttribute("class", "bar");
    stats.setAttribute("class", "stats");
    wrapper.appendChild(track);
    wrapper.appendChild(bar);
    wrapper.appendChild(stats);
    shadow.appendChild(style);
    shadow.appendChild(wrapper);
    return _this;
  }

  _createClass(DNMeter, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      console.log("<dn-meter> element added to page.");
      this.updateView();
      window.addEventListener("resize", this.updateViewOnWindowResize.bind(this), false);
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      console.log("<dn-meter> element removed from page.");
      window.removeEventListener("resize", this.updateViewOnWindowResize.bind(this), false);
    }
  }, {
    key: "adoptedCallback",
    value: function adoptedCallback() {
      console.log("<dn-meter> element moved to new page.");
    }
  }, {
    key: "attributeChangedCallback",
    value: function attributeChangedCallback(name, oldValue, newValue) {
      console.log("<dn-meter> element attributes changed.");
      this.updateView();
    }
  }, {
    key: "updateView",
    value: function updateView() {
      var shadow = this.shadowRoot;
      var themeClass = this.getAttribute("theme") || "cool";
      var min = parseFloat(this.getAttribute("min")) || 0;
      var current = parseFloat(this.getAttribute("current")) || 50;
      var max = parseFloat(this.getAttribute("max")) || 100;
      var prefix = this.getAttribute("prefix") || "";
      var postfix = this.getAttribute("postfix") || "";
      var width = parseFloat(shadow.querySelector(".wrapper").clientWidth);
      shadow.querySelector(".wrapper").setAttribute("class", "wrapper ".concat(themeClass));
      shadow.querySelector(".bar").style.width = "".concat(current / max * width, "px");
      shadow.querySelector(".bar").innerHTML = "<span>".concat(prefix).concat(current).concat(postfix, "</span>");
      shadow.querySelector(".stats").innerHTML = "<span>".concat(prefix).concat(min).concat(postfix, "</span><span>").concat(prefix).concat(max).concat(postfix, "</span>");
    }
  }, {
    key: "updateViewOnWindowResize",
    value: function updateViewOnWindowResize(e) {
      this.updateView();
    }
  }]);

  return DNMeter;
}(_wrapNativeSuper(HTMLElement));

window.customElements.define("dn-meter", DNMeter);
"use strict";

var THEME = {
  "COOL": {
    "DEFAULT": "#ccc",
    "HIGHLIGHT": "#eee",
    "DISABLED": "#333"
  },
  "WARM": {
    "DEFAULT": "#ccc",
    "HIGHLIGHT": "#eee",
    "DISABLED": "#333"
  }
};
