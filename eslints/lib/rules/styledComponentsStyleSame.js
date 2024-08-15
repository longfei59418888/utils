"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _findCssBlock = require("../utils/findCssBlock");
var cwd = process.cwd();
var ruleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'check same css rule'
    }
  },
  create: function create(context) {
    var _context$parserOption, _context$parserOption2;
    if (!context.parserOptions.styleRuleSameConfig) return {};
    var presetCssRules = (_context$parserOption = context.parserOptions.styleRuleSameConfig) === null || _context$parserOption === void 0 ? void 0 : _context$parserOption.cssRules;
    var stylePaths = (_context$parserOption2 = context.parserOptions.styleRuleSameConfig.styles) !== null && _context$parserOption2 !== void 0 ? _context$parserOption2 : [];
    return {
      TemplateLiteral: function TemplateLiteral(node) {
        if (stylePaths.some(function (path) {
          return "".concat(cwd, "/").concat(path) === context.filename;
        })) return;
        if (!node.range) return;
        var root = (0, _findCssBlock.removeTemplate)(context.getSourceCode().text.slice(node.range[0] + 1, node.range[1] - 1));
        var errorRules = presetCssRules ? (0, _findCssBlock.getErrorRulesInCss)(presetCssRules, root) : [];
        var errorStyles = stylePaths ? (0, _findCssBlock.getBlockErrors)(Object.values((0, _findCssBlock.initStyles)(stylePaths)), root) : [];
        var errors = Array.from(new Set(errorRules)).concat(errorStyles);
        if (errors) {
          errors.forEach(function (message) {
            return context.report({
              node: node,
              message: message
            });
          });
        }
      }
    };
  }
};
var _default = exports["default"] = ruleModule;