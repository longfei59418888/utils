"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Column = void 0;
var _useFlexPropsStyle = require("../hooks/useFlexPropsStyle");
var _reactNative = require("react-native");
var _jsxRuntime = require("react/jsx-runtime");
const Column = props => {
  const {
    style,
    onPress,
    touchableOpacity = false,
    onLongPress,
    children,
    ...rest
  } = props;
  const flexPropsStyle = (0, _useFlexPropsStyle.useFlexPropsStyle)(rest);
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
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: [flexPropsStyle.flexStyle, style],
      ...flexPropsStyle.props,
      children: children
    })
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    style: [flexPropsStyle.flexStyle, style],
    ...flexPropsStyle.props,
    children: children
  });
};
exports.Column = Column;
var _default = exports.default = Column;