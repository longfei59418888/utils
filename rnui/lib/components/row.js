"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Row = void 0;
var _useFlexPropsStyle = require("../hooks/useFlexPropsStyle");
var _react = require("react");
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
  const [scale, setScale] = (0, _react.useState)(1);
  const onPressIn = () => touchableScale && setScale(0.9);
  const onPressOut = () => setScale(1);
  if (onPress && touchableOpacity) return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
    onPress: onPress,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: [flexPropsStyle.flexStyle, style],
      ...flexPropsStyle.props,
      children: children
    })
  });
  if (onPress || onLongPress) return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Pressable, {
    onPressIn: onPressIn,
    onPressOut: onPressOut,
    onPress: onPress,
    onLongPress: onLongPress,
    style: [flexPropsStyle.flexStyle, style, {
      flexDirection: 'row',
      transform: [{
        scale
      }]
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