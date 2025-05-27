"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Img = void 0;
var _useFlexPropsStyle = require("../hooks/useFlexPropsStyle");
var _react = require("react");
var _reactNative = require("react-native");
var _jsxRuntime = require("react/jsx-runtime");
const Img = _ref => {
  let {
    source,
    touchableOpacity = false,
    size,
    resizeMode = 'contain',
    onPress,
    style,
    ...props
  } = _ref;
  const propsStyle = (0, _useFlexPropsStyle.useFlexPropsStyle)(props);
  const styles = (0, _react.useMemo)(() => {
    if (!size) return {};
    if (typeof size === 'number') {
      size = _reactNative.PixelRatio.roundToNearestPixel(size * (0, _useFlexPropsStyle.getScale)());
      return {
        height: size,
        width: size
      };
    }
    return {
      height: size,
      width: size
    };
  }, [size]);
  if (onPress) {
    if (touchableOpacity) return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
      onPress: onPress,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Image, {
        source: source,
        style: [{
          resizeMode
        }, propsStyle.flexStyle, styles, style],
        ...propsStyle.props
      })
    });
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Pressable, {
      onPress: onPress,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Image, {
        source: source,
        style: [{
          resizeMode
        }, propsStyle.flexStyle, styles, style],
        ...propsStyle.props
      })
    });
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Image, {
    source: source,
    style: [{
      resizeMode
    }, propsStyle.flexStyle, styles, style],
    ...propsStyle.props
  });
};
exports.Img = Img;
var _default = exports.default = Img;