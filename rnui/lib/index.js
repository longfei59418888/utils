"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Background", {
  enumerable: true,
  get: function () {
    return _background.default;
  }
});
Object.defineProperty(exports, "Column", {
  enumerable: true,
  get: function () {
    return _column.default;
  }
});
Object.defineProperty(exports, "Img", {
  enumerable: true,
  get: function () {
    return _img.default;
  }
});
Object.defineProperty(exports, "Row", {
  enumerable: true,
  get: function () {
    return _row.default;
  }
});
Object.defineProperty(exports, "Screen", {
  enumerable: true,
  get: function () {
    return _screen.default;
  }
});
exports.useSafeAreaInsetsStyle = exports.useFlexPropsStyle = void 0;
var _column = _interopRequireDefault(require("./components/column"));
var _row = _interopRequireDefault(require("./components/row"));
var _img = _interopRequireDefault(require("./components/img"));
var _background = _interopRequireDefault(require("./components/background"));
var _screen = _interopRequireDefault(require("./components/screen"));
var _useFlexPropsStyle = _interopRequireWildcard(require("./hooks/useFlexPropsStyle"));
exports.useFlexPropsStyle = _useFlexPropsStyle;
var _useSafeAreaInsetsStyle = _interopRequireWildcard(require("./hooks/useSafeAreaInsetsStyle"));
exports.useSafeAreaInsetsStyle = _useSafeAreaInsetsStyle;
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }