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
    touchableScale = true,
    onLongPress,
    children,
    ...rest
  } = props;
  const flexPropsStyle = (0, _useFlexPropsStyle.useFlexPropsStyle)(rest);
  if (onPress || onLongPress) return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Pressable, {
    onPress: onPress,
    onLongPress: onLongPress,
    style: _ref => {
      let {
        pressed
      } = _ref;
      return [flexPropsStyle.flexStyle, style, touchableScale && pressed ? {
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
    style: [flexPropsStyle.flexStyle, style],
    ...flexPropsStyle.props,
    children: children
  });
};
exports.Column = Column;
var _default = exports.default = Column;