"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _events = _interopRequireDefault(require("@xlong/events"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var defaultOption = {
  pingTime: 8000,
  timeout: 5000,
  reConnectTime: 100
};

/*
 * const ws = new WS(url,WsOption])
 * ws.on('message[.messageName]',(data)=>{})
 * ws.on('open[.openName]',(data)=>{})
 * ws.on('close[.closeName]',({code:number})=>{})
 * ws.on('error[.errorName]',({code:number})=>{})
 * ws.close(code:number,reason:string) code:默认1000
 * ws.socket() 重连
 * ws.send(message)
 * */
var WS = /*#__PURE__*/function (_Events) {
  _inherits(WS, _Events);
  var _super = _createSuper(WS);
  function WS(url, option) {
    var _this;
    _classCallCheck(this, WS);
    _this = _super.call(this);
    _defineProperty(_assertThisInitialized(_this), "queues", []);
    _this.url = url;
    _this.option = _objectSpread(_objectSpread({}, defaultOption), option);
    _this.initEvents();
    _this.socket();
    return _this;
  }
  _createClass(WS, [{
    key: "socket",
    value: function socket() {
      var _this2 = this;
      var url = this.url,
        option = this.option;
      var _ref = option || {},
        protocols = _ref.protocols,
        formatData = _ref.formatData,
        pong = _ref.pong;
      this.ws = new window.WebSocket(url, protocols);
      this.ws.onopen = function () {
        for (var _len = arguments.length, _ref2 = new Array(_len), _key = 0; _key < _len; _key++) {
          _ref2[_key] = arguments[_key];
        }
        var event = _ref2[0];
        return _this2.emit('open', event);
      };
      this.ws.onmessage = function (event) {
        if (formatData) event = formatData(event);
        var message = typeof pong === 'function' ? pong() : pong;
        if (pong && event.data === message) _this2.emit('message.pong', event.data);else _this2.emit('message', event.data);
      };
      this.ws.onclose = function () {
        for (var _len2 = arguments.length, _ref3 = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          _ref3[_key2] = arguments[_key2];
        }
        var event = _ref3[0];
        return _this2.emit('close', event);
      };
      this.ws.onerror = function () {
        for (var _len3 = arguments.length, _ref4 = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          _ref4[_key3] = arguments[_key3];
        }
        var event = _ref4[0];
        return _this2.emit('error', event);
      };
    }
  }, {
    key: "initEvents",
    value: function initEvents() {
      var _this3 = this;
      var _this$option = this.option,
        pong = _this$option.pong,
        autoPing = _this$option.autoPing,
        pingTime = _this$option.pingTime,
        reConnectTime = _this$option.reConnectTime,
        ping = _this$option.ping;
      this.on('open.checkQueues', function () {
        return _this3.checkQueues();
      });
      if (autoPing && ping) {
        this.on('open.autoPing', function () {
          if (!pong) {
            _this3.autoPingTimer && clearInterval(_this3.autoPingTimer);
            _this3.autoPingTimer = setInterval(function () {
              _this3.ping(0);
            }, pingTime);
          } else {
            _this3.ping();
          }
        });
      }
      if (pong) {
        this.on('message.pong', function (data) {
          var message = typeof pong === 'function' ? pong() : pong;
          if (data !== message) return;
          _this3.ping();
        });
      }
      this.on('close.autoPing', function () {
        _this3.autoPingTimer && clearInterval(_this3.autoPingTimer);
        _this3.autoPingTimer = undefined;
        _this3.pingTimer && clearTimeout(_this3.pingTimer);
        _this3.pingTimer = undefined;
        _this3.PongOutTimer && clearTimeout(_this3.PongOutTimer);
        _this3.PongOutTimer = undefined;
      });
      this.on('close.reConnect', function (_ref5) {
        var code = _ref5.code;
        if (code !== 1000) setTimeout(function () {
          _this3.socket();
        }, code === WS.CLOSED_HEALTH_CODE ? 0 : reConnectTime);
      });
    }
  }, {
    key: "ping",
    value: function ping(time) {
      var _this4 = this;
      var _this$option2 = this.option,
        pingTime = _this$option2.pingTime,
        ping = _this$option2.ping,
        pong = _this$option2.pong,
        timeout = _this$option2.timeout,
        autoPing = _this$option2.autoPing;
      if (!ping) return;
      if (this.PongOutTimer) {
        clearTimeout(this.PongOutTimer);
        this.PongOutTimer = undefined;
      }
      var message = typeof ping === 'function' ? ping() : ping;
      this.pingTimer && clearTimeout(this.pingTimer);
      this.pingTimer = setTimeout(function () {
        if (_this4.readyState === WS.OPEN) {
          _this4.send(message);
          if (pong) {
            _this4.PongOutTimer = setTimeout(function () {
              _this4.close(WS.CLOSED_HEALTH_CODE);
            }, timeout);
          }
        }
      }, (time !== null && time !== void 0 ? time : autoPing) ? pingTime : 0);
    }
  }, {
    key: "send",
    value: function send(data) {
      if (this.readyState === WS.OPEN && this.ws) this.ws.send(data);else {
        this.queues.push(data);
      }
    }
  }, {
    key: "close",
    value: function close() {
      var code = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;
      var reason = arguments.length > 1 ? arguments[1] : undefined;
      (this === null || this === void 0 ? void 0 : this.ws) && this.ws.close(code, reason);
    }
  }, {
    key: "checkQueues",
    value: function checkQueues() {
      var data = this.queues.shift();
      while (data) {
        if (this.readyState === WS.OPEN && this.ws) this.ws.send(data);else {
          this.queues.unshift(data);
          break;
        }
        data = this.queues.shift();
      }
    }
  }, {
    key: "bufferedAmount",
    get: function get() {
      var _this$ws;
      return this === null || this === void 0 || (_this$ws = this.ws) === null || _this$ws === void 0 ? void 0 : _this$ws.bufferedAmount;
    }
  }, {
    key: "readyState",
    get: function get() {
      var _this$ws2;
      return this === null || this === void 0 || (_this$ws2 = this.ws) === null || _this$ws2 === void 0 ? void 0 : _this$ws2.readyState;
    }
  }, {
    key: "binaryType",
    get: function get() {
      var _this$ws3;
      return this === null || this === void 0 || (_this$ws3 = this.ws) === null || _this$ws3 === void 0 ? void 0 : _this$ws3.binaryType;
    },
    set: function set(binaryType) {
      this.ws && (this.ws.binaryType = binaryType);
    }
  }, {
    key: "extensions",
    get: function get() {
      var _this$ws4;
      return this === null || this === void 0 || (_this$ws4 = this.ws) === null || _this$ws4 === void 0 ? void 0 : _this$ws4.extensions;
    }
  }, {
    key: "protocol",
    get: function get() {
      var _this$ws5;
      return this === null || this === void 0 || (_this$ws5 = this.ws) === null || _this$ws5 === void 0 ? void 0 : _this$ws5.protocol;
    }
  }], [{
    key: "getWS",
    value: function getWS(url, option) {
      return new WS(url, option);
    }
  }]);
  return WS;
}(_events["default"]);
_defineProperty(WS, "CONNECTING", 0);
_defineProperty(WS, "OPEN", 1);
_defineProperty(WS, "CLOSING", 2);
_defineProperty(WS, "CLOSED", 3);
_defineProperty(WS, "CLOSED_HEALTH_CODE", 4001);
var _default = exports["default"] = WS;