function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { getScale, useFlexPropsStyle } from '../hooks/useFlexPropsStyle';
import { useMemo } from 'react';
import { Image as ImageBase, PixelRatio, Pressable, TouchableOpacity } from 'react-native';
export const Img = ({
  source,
  touchableOpacity = false,
  size,
  resizeMode = 'contain',
  onPress,
  style,
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
    if (touchableOpacity) return /*#__PURE__*/React.createElement(TouchableOpacity, {
      onPress: onPress
    }, /*#__PURE__*/React.createElement(ImageBase, _extends({
      source: source,
      style: [{
        resizeMode
      }, propsStyle.flexStyle, styles, style]
    }, propsStyle.props)));
    return /*#__PURE__*/React.createElement(Pressable, {
      onPress: onPress
    }, /*#__PURE__*/React.createElement(ImageBase, _extends({
      source: source,
      style: [{
        resizeMode
      }, propsStyle.flexStyle, styles, style]
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