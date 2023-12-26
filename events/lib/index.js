"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.events = exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Events = /*#__PURE__*/function () {
  function Events() {
    _classCallCheck(this, Events);
    _defineProperty(this, "listeners", {});
  }
  _createClass(Events, [{
    key: "emit",
    value: function emit(eventName) {
      var name = eventName.split(".")[0];
      var listeners = this.listeners[name];
      if (listeners) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }
        if (name === eventName) {
          for (var attr in listeners) {
            var handle = listeners[attr];
            handle.handle.apply(handle, args);
            if (handle.once) delete this.listeners[name][attr];
          }
        } else if (listeners[eventName]) {
          var _handle = listeners[eventName];
          _handle.handle.apply(_handle, args);
          if (_handle.once) delete this.listeners[name][eventName];
        }
      }
    }
  }, {
    key: "off",
    value: function off(eventName) {
      this.removeListener(eventName);
    }
  }, {
    key: "on",
    value: function on(eventName, listener) {
      this.addListener(eventName, listener);
    }
  }, {
    key: "once",
    value: function once(eventName, listener) {
      this.addListener(eventName, listener, true);
    }
  }, {
    key: "addListener",
    value: function addListener(eventName, listener) {
      var once = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var name = eventName.split(".")[0];
      if (!name) throw "eventName 有误，请检查";
      var handle = {
        handle: listener,
        once: once,
        eventName: eventName
      };
      if (!this.listeners[name]) {
        this.listeners[name] = _defineProperty({}, eventName, handle);
      } else {
        this.listeners[name][eventName] = handle;
      }
    }
  }, {
    key: "removeListener",
    value: function removeListener(eventName) {
      var name = eventName.split(".")[0];
      if (this.listeners[name]) {
        if (eventName === name) delete this.listeners[name];else {
          delete this.listeners[name][eventName];
        }
      }
    }
  }]);
  return Events;
}();
var events = exports.events = new Events();
var _default = exports["default"] = Events;