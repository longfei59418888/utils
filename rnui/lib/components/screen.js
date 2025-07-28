"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Screen = void 0;
var _reactNative = require("react-native");
var _index = require("../index");
var _useSafeAreaInsetsStyle = _interopRequireDefault(require("../hooks/useSafeAreaInsetsStyle"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Screen = _ref => {
  let {
    backgroundColor = 'transparent',
    source,
    children,
    statusBarProps,
    style,
    barStyle,
    resizeMode = 'cover',
    safeAreaEdges = ['bottom'],
    ...rest
  } = _ref;
  const safeAreaInsetStyle = (0, _useSafeAreaInsetsStyle.default)(safeAreaEdges);
  if (source) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Background, {
      widthFull: true,
      heightFull: true,
      resizeMode: resizeMode,
      source: source,
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_index.Column, {
        widthFull: true,
        heightFull: true,
        backgroundColor: backgroundColor,
        style: [safeAreaInsetStyle, style],
        ...rest,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.StatusBar, {
          barStyle: barStyle,
          ...statusBarProps
        }), children]
      })
    });
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_index.Column, {
    widthFull: true,
    heightFull: true,
    backgroundColor: backgroundColor,
    style: [safeAreaInsetStyle, style],
    ...rest,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.StatusBar, {
      barStyle: barStyle,
      ...statusBarProps
    }), children]
  });
};
exports.Screen = Screen;
var _default = exports.default = Screen;