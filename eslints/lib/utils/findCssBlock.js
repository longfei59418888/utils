"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeTemplate = exports.initStyles = exports.getErrorRulesInCss = exports.getBlockErrors = void 0;
var _esprima = require("esprima");
var _fs = _interopRequireDefault(require("fs"));
var _md = _interopRequireDefault(require("md5"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var cwd = process.cwd();
var cacheMap = {};
var removeTemplate = exports.removeTemplate = function removeTemplate(raws) {
  var index = 0,
    templateMark = 0;
  var root = {
    index: 0,
    text: '',
    parent: null
  };
  var block = root;
  while (raws[index]) {
    var target = raws[index];
    if (target === '{' && raws[index - 1] === '$') templateMark += 1;else if (target === '{' && templateMark !== 0) templateMark += 1;else if (target === '}' && templateMark !== 0) templateMark -= 1;else if (templateMark === 0) {
      if (target === '{') {
        var targetBlock = {
          index: index,
          text: '',
          parent: block
        };
        if (block.block) block.block.push(targetBlock);else block.block = [targetBlock];
        block = targetBlock;
      } else if (target === '}') {
        block.cssRules = _getCssRule(block.text);
        block = block.parent || root;
        if (![';', '}'].includes(raws[index + 1])) block.text += ';';
      } else if (!['$', '+', '&'].includes(target)) block.text += target;
    }
    index++;
  }
  root.cssRules = _getCssRule(root.text);
  return root;
};
var initStyles = exports.initStyles = function initStyles(stylePaths) {
  var map = stylePaths.reduce(function (previousValue, currentValue) {
    var path = "".concat(cwd, "/").concat(currentValue);
    if (!_fs["default"].existsSync(path)) path = "".concat(cwd, "/").concat(currentValue, ".ts");
    if (!_fs["default"].existsSync(path)) path = "".concat(cwd, "/").concat(currentValue, ".js");
    var styleText = _fs["default"].readFileSync(path, {
      encoding: 'utf-8'
    });
    var uuid = (0, _md["default"])(styleText);
    return _objectSpread(_objectSpread({}, previousValue), {}, _defineProperty({}, "".concat(currentValue, "_").concat(uuid), cacheMap["".concat(currentValue, "_").concat(uuid)] || _parseCss(styleText, currentValue)));
  }, {});
  cacheMap = map;
  return map;
};
var getBlockErrors = exports.getBlockErrors = function getBlockErrors(styles, roots) {
  var blockErrors = {};
  var _iterator = _createForOfIteratorHelper(styles),
    _step;
  try {
    var _loop = function _loop() {
      var target = _step.value;
      if (target.styles.some(function (_ref) {
        var name = _ref.name,
          _ref$values = _ref.values,
          values = _ref$values === void 0 ? [] : _ref$values;
        if (_checkBlockStyles(values, roots)) {
          blockErrors[target.fileName] = "\u4F7F\u7528 ".concat(target.fileName, " \u6587\u4EF6\u4E0B ").concat(name, " \u66FF\u6362\u6837\u5F0F ").concat(values.join(';'));
          return true;
        }
      })) return 1; // break
    };
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      if (_loop()) break;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return Object.values(blockErrors);
};
function _checkBlockStyles(values, root) {
  if (!root) return false;
  var block = root.block,
    _root$cssRules = root.cssRules,
    cssRules = _root$cssRules === void 0 ? [] : _root$cssRules;
  if (values.every(function (value) {
    return cssRules.map(function (rule) {
      return rule.text;
    }).includes(value);
  })) return true;
  if (!block) return false;
  return block.map(function (item) {
    return _checkBlockStyles(values, item);
  }).some(function (item) {
    return item;
  });
}
var getErrorRulesInCss = exports.getErrorRulesInCss = function getErrorRulesInCss(presetCssRules, root) {
  if (!root) return [];
  var block = root.block,
    _root$cssRules2 = root.cssRules,
    cssRules = _root$cssRules2 === void 0 ? [] : _root$cssRules2;
  var errorRules = [];
  cssRules.forEach(function (_ref2) {
    var key = _ref2.key,
      value = _ref2.value;
    var presetCssRuleValues = presetCssRules[key.split('-').map(function (word, index) {
      return index !== 0 ? word[0].toUpperCase() + word.slice(1) : word;
    }).join('')];
    if (presetCssRuleValues === true) {
      errorRules.push("\u4F7F\u7528\u5168\u5C40\u53D8\u91CF\u66FF\u6362 ".concat(key, ":").concat(value, " \u4E2D ").concat(value));
      return true;
    }
    ;
    (presetCssRuleValues || []).some(function (cssRuleValue) {
      if (cssRuleValue === value) {
        errorRules.push("\u4F7F\u7528\u5168\u5C40\u53D8\u91CF\u66FF\u6362 ".concat(key, ":").concat(value, " \u4E2D ").concat(value));
        return true;
      }
    });
  });
  if (!block) return errorRules;
  return errorRules.concat.apply(errorRules, _toConsumableArray(block.map(function (item) {
    return getErrorRulesInCss(presetCssRules, item);
  })));
};
function _getCssRule(raws) {
  return raws.split(';').map(function (raw) {
    raw = raw.replaceAll('\n', '').trim();
    if (raw.startsWith(':') || raw.endsWith(':')) return null;
    var _raw$split = raw.split(':'),
      _raw$split2 = _slicedToArray(_raw$split, 2),
      key = _raw$split2[0],
      value = _raw$split2[1];
    if (value && !['hover'].includes(value.trim())) {
      return {
        key: key.trim(),
        value: value.trim(),
        text: "".concat(key.trim(), ":").concat(value.trim())
      };
    }
  }).filter(function (item) {
    return !!item;
  });
}
function _parseCss(code, fileName) {
  var styles = (0, _esprima.parseModule)(code).body.map(function (declaration) {
    if (declaration.type !== 'ExportNamedDeclaration') return null;
    var _ref3 = (declaration === null || declaration === void 0 ? void 0 : declaration.declaration).declarations[0] || {},
      id = _ref3.id,
      init = _ref3.init;
    var name = id === null || id === void 0 ? void 0 : id.name;
    var _ref4 = init,
      type = _ref4.type,
      tag = _ref4.tag,
      quasi = _ref4.quasi;
    if (type === 'TaggedTemplateExpression' && tag.name === 'css') {
      var value = quasi.quasis[0].value.raw;
      return {
        name: name,
        values: _getCssRule(value).map(function (item) {
          return "".concat(item.key, ":").concat(item.value);
        })
      };
    }
  }).filter(function (item) {
    return !!item;
  }).sort(function (a, b) {
    return b.values.length - a.values.length;
  });
  return {
    fileName: fileName,
    styles: styles
  };
}