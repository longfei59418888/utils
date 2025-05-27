"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _fs = _interopRequireDefault(require("fs"));
var _html = require("../constants/html");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var textMap = new Map();
var ruleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'check same const variable text'
    }
  },
  create: function create(context) {
    textMap.set(context.filename, []);
    return {
      VariableDeclarator: function VariableDeclarator(_ref) {
        var init = _ref.init;
        if (init && init.type === 'Literal') checkNode(context, init);
      },
      Property: function Property(_ref2) {
        var value = _ref2.value;
        if (value && value.type === 'Literal') checkNode(context, value);
      },
      CallExpression: function CallExpression(node) {
        node.arguments.forEach(function (argument) {
          if (argument.type === 'Literal') checkNode(context, argument);
        });
      },
      JSXAttribute: function JSXAttribute(_ref3) {
        var _value$expression;
        var name = _ref3.name,
          value = _ref3.value;
        if (!_html.attrsName.includes(name.name) && (value === null || value === void 0 || (_value$expression = value.expression) === null || _value$expression === void 0 ? void 0 : _value$expression.type) === 'Literal') checkNode(context, value === null || value === void 0 ? void 0 : value.expression);
      },
      BinaryExpression: function BinaryExpression(_ref4) {
        var left = _ref4.left,
          right = _ref4.right;
        if (left && left.type === 'Literal') checkNode(context, left);
        if (right && right.type === 'Literal') checkNode(context, right);
      },
      ConditionalExpression: function ConditionalExpression(_ref5) {
        var consequent = _ref5.consequent,
          alternate = _ref5.alternate;
        if (consequent && consequent.type === 'Literal') checkNode(context, consequent);
        if (alternate && alternate.type === 'Literal') checkNode(context, alternate);
      }
    };
  }
};
function checkNode(context, node) {
  var limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 3;
  var loc = node.loc,
    value = node.value;
  if (typeof value === 'string' && value.length > limit) {
    var fileNodeTexts = textMap.get(context.filename) || [];
    var _iterator = _createForOfIteratorHelper(textMap.entries()),
      _step;
    try {
      var _loop = function _loop() {
        var _step$value = _slicedToArray(_step.value, 2),
          path = _step$value[0],
          nodeTexts = _step$value[1];
        if (_fs["default"].existsSync(path)) {
          var errors = nodeTexts.filter(function (nodeText) {
            return nodeText.value === value;
          });
          if (errors) {
            errors.forEach(function (message) {
              var _message$loc, _message$loc2;
              return context.report({
                node: node,
                message: "".concat(path, ":").concat((_message$loc = message.loc) === null || _message$loc === void 0 ? void 0 : _message$loc.start.line, ":").concat((_message$loc2 = message.loc) === null || _message$loc2 === void 0 ? void 0 : _message$loc2.start.column, " \u5B58\u5728 ").concat(message.value)
              });
            });
          }
        } else textMap["delete"](path);
      };
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        _loop();
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    if (!fileNodeTexts) textMap.set(context.filename, [{
      loc: loc,
      value: value
    }]);else {
      fileNodeTexts.push({
        loc: loc,
        value: value
      });
      textMap.set(context.filename, fileNodeTexts);
    }
  }
}
var _default = exports["default"] = ruleModule;