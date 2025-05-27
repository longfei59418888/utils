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
  return /*#__PURE__*/React.createElement(ImageBackground, {
    source: source,
    resizeMode: resizeMode,
    onLayout: onLayout,
    style: [flexPropsStyle.flexStyle, style]
  }, children);
};
export default Background;