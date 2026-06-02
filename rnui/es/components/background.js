function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { ImageBackground } from 'react-native';
import { useFlexPropsStyle } from '../hooks/useFlexPropsStyle';
export const Background = ({
  style,
  onLayout,
  children,
  source,
  resizeMode,
  ...rest
}) => {
  const flexPropsStyle = useFlexPropsStyle(rest);
  return /*#__PURE__*/React.createElement(ImageBackground, _extends({
    source: source,
    resizeMode: resizeMode,
    onLayout: onLayout
  }, flexPropsStyle.props, {
    style: [flexPropsStyle.flexStyle, style]
  }), children);
};
export default Background;