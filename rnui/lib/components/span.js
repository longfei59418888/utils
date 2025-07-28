"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Span = Span;
exports.default = void 0;
var _useFlexPropsStyle = require("../hooks/useFlexPropsStyle");
var _reactNative = require("react-native");
var _jsxRuntime = require("react/jsx-runtime");
function Span(props) {
  const {
    color,
    lineHeight,
    textAlignCenter,
    textAlignJustify,
    textAlignLeft,
    textAlignRight,
    size = 16,
    text,
    fontFamily,
    children,
    style,
    ...rest
  } = props;
  const propsStyle = (0, _useFlexPropsStyle.useFlexPropsStyle)(rest);
  const content = text || children;
  const scale = (0, _useFlexPropsStyle.getScale)();
  const styles = [{
    fontSize: _reactNative.PixelRatio.roundToNearestPixel(size * scale),
    lineHeight: _reactNative.PixelRatio.roundToNearestPixel(size * 1.5 * scale),
    height: _reactNative.PixelRatio.roundToNearestPixel(size * 1.5 * scale)
  }, {
    color: color,
    fontFamily
  }, lineHeight ? {
    lineHeight: _reactNative.PixelRatio.roundToNearestPixel(lineHeight * scale),
    height: _reactNative.PixelRatio.roundToNearestPixel(lineHeight * scale)
  } : {}, propsStyle.flexStyle, {
    textAlign: textAlignCenter ? 'center' : textAlignJustify ? 'justify' : textAlignRight ? 'right' : textAlignLeft ? 'left' : undefined
  }, style];
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
    ...propsStyle.props,
    style: styles,
    children: content
  });
}
var _default = exports.default = Span;