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
    onPress,
    onLongPress,
    ...props
  } = _ref;
  const flexPropsStyle = (0, _useFlexPropsStyle.useFlexPropsStyle)(props);
  if (onPress && touchableOpacity) return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
    onPress: onPress,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: [flexPropsStyle.flexStyle, style],
      ...flexPropsStyle.props,
      children: children
    })
  });
  if (onPress || onLongPress) return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Pressable, {
    onPress: onPress,
    onLongPress: onLongPress,
    style: [flexPropsStyle.flexStyle, style, {
      flexDirection: 'row'
    }],
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