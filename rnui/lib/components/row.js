"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Row = void 0;
var _useFlexPropsStyle = require("../hooks/useFlexPropsStyle");
var _reactNative = require("react-native");
var _jsxRuntime = require("react/jsx-runtime");
const Row = _ref => {
  let {
    style,
    children,
    touchableOpacity = false,
    touchableScale = true,
    onPress,
    onLongPress,
    ...props
  } = _ref;
  const flexPropsStyle = (0, _useFlexPropsStyle.useFlexPropsStyle)(props);
  if (onPress || onLongPress) return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Pressable, {
    onPress: onPress,
    onLongPress: onLongPress,
    style: _ref2 => {
      let {
        pressed
      } = _ref2;
      return [flexPropsStyle.flexStyle, style, {
        flexDirection: 'row'
      }, touchableScale && pressed ? {
        transform: [{
          scale: 0.9
        }]
      } : null, touchableOpacity && pressed ? {
        opacity: 0.2
      } : null];
    },
    ...flexPropsStyle.props,
    children: children
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    style: [flexPropsStyle.flexStyle, style, {
      flexDirection: 'row'
    }],
    ...flexPropsStyle.props,
    children: children
  });
};
exports.Row = Row;
var _default = exports.default = Row;