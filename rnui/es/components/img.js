function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { useMemo } from 'react';
import { Image as ImageBase, PixelRatio, Pressable } from 'react-native';
import { getScale, useFlexPropsStyle } from '../hooks/useFlexPropsStyle';
export const Img = ({
  source,
  touchableOpacity = false,
  touchableScale = true,
  size,
  resizeMode = 'contain',
  onPress,
  style,
  imageStyle,
  ...props
}) => {
  const propsStyle = useFlexPropsStyle(props);
  const styles = useMemo(() => {
    if (!size) return {};
    if (typeof size === 'number') {
      size = PixelRatio.roundToNearestPixel(size * getScale());
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
    return /*#__PURE__*/React.createElement(Pressable, {
      onPress: onPress,
      style: ({
        pressed
      }) => [touchableScale && pressed ? {
        transform: [{
          scale: 0.9
        }]
      } : null, touchableOpacity && pressed ? {
        opacity: 0.2
      } : null, propsStyle.flexStyle, styles, style]
    }, /*#__PURE__*/React.createElement(ImageBase, _extends({
      source: source,
      style: [{
        resizeMode
      }, styles, {
        height: propsStyle.flexStyle.height,
        width: propsStyle.flexStyle.width
      }, imageStyle]
    }, propsStyle.props)));
  }
  return /*#__PURE__*/React.createElement(ImageBase, _extends({
    source: source,
    style: [{
      resizeMode
    }, propsStyle.flexStyle, styles, style]
  }, propsStyle.props));
};
export default Img;