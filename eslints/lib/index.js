"use strict";

var _sameVariableText = _interopRequireDefault(require("./rules/sameVariableText"));
var _styledComponentsStyleSame = _interopRequireDefault(require("./rules/styledComponentsStyleSame"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
module.exports = {
  rules: {
    'style-same': _styledComponentsStyleSame["default"],
    'variable-same-text': _sameVariableText["default"]
  },
  configs: {
    styledComponents: {
      plugins: ['@xlong'],
      rules: {
        '@xlong/style-same': 2,
        '@xlong/variable-same-text': 'warn'
      }
    },
    recommended: {
      plugins: ['@xlong'],
      rules: {
        '@xlong/variable-same-text': 'warn'
      }
    }
  }
};