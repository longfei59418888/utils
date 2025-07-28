function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { getScale, useFlexPropsStyle } from '../hooks/useFlexPropsStyle';
import { PixelRatio, Text as RNText } from 'react-native';
export function Span(props) {
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
  const propsStyle = useFlexPropsStyle(rest);
  const content = text || children;
  const scale = getScale();
  const styles = [{
    fontSize: PixelRatio.roundToNearestPixel(size * scale),
    lineHeight: PixelRatio.roundToNearestPixel(size * 1.5 * scale),
    height: PixelRatio.roundToNearestPixel(size * 1.5 * scale)
  }, {
    color: color,
    fontFamily
  }, lineHeight ? {
    lineHeight: PixelRatio.roundToNearestPixel(lineHeight * scale),
    height: PixelRatio.roundToNearestPixel(lineHeight * scale)
  } : {}, propsStyle.flexStyle, {
    textAlign: textAlignCenter ? 'center' : textAlignJustify ? 'justify' : textAlignRight ? 'right' : textAlignLeft ? 'left' : undefined
  }, style];
  return /*#__PURE__*/React.createElement(RNText, _extends({}, propsStyle.props, {
    style: styles
  }), content);
}
export default Span;