"use strict";

var _styledComponentsStyleSame = _interopRequireDefault(require("./rules/styledComponentsStyleSame"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
module.exports = {
  rules: {
    'style-same': _styledComponentsStyleSame["default"]
  },
  configs: {
    styledComponents: {
      plugins: ['@xlong-eslint'],
      rules: {
        '@xlong-eslint/style-same': 2
      }
    }
  }
};