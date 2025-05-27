"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Background = void 0;
var _reactNative = require("react-native");
var _useFlexPropsStyle = require("../hooks/useFlexPropsStyle");
var _jsxRuntime = require("react/jsx-runtime");
const Background = _ref => {
  let {
    style,
    onLayout,
    children,
    source,
    resizeMode,
    ...rest
  } = _ref;
  const flexPropsStyle = (0, _useFlexPropsStyle.useFlexPropsStyle)(rest);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.ImageBackground, {
    source: source,
    resizeMode: resizeMode,
    onLayout: onLayout,
    style: [flexPropsStyle.flexStyle, style],
    children: children
  });
};
exports.Background = Background;
var _default = exports.default = Background;