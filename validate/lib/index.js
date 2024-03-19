"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate = exports.isUsername = exports.isPwd = exports.isPhoneNumber = exports.isMoney = exports.isEmail = exports.isChName = exports.Regexp = void 0;
var _regexp = _interopRequireWildcard(require("./regexp"));
var _Regexp = _regexp;
exports.Regexp = _regexp;
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var validate = exports.validate = function validate(regText, value) {
  if (!value || value.length === 0) {
    return false;
  }
  return new RegExp(regText).test(value);
};
var isPhoneNumber = exports.isPhoneNumber = function isPhoneNumber(value) {
  return validate(_regexp.PHONE_NUMBER_REG, value);
};
var isEmail = exports.isEmail = function isEmail(value) {
  return validate(_regexp.EMAIL_REG, value);
};
var isMoney = exports.isMoney = function isMoney(value) {
  return validate(_regexp.MONEY_REG, value);
};
var isChName = exports.isChName = function isChName(value) {
  return validate(_regexp.CH_NAME_REG, value);
};
var isUsername = exports.isUsername = function isUsername(value) {
  return validate(_regexp.NAME_REG, value);
};
var isPwd = exports.isPwd = function isPwd(value) {
  return validate(_regexp.PWD_REG, value);
};