function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { useFlexPropsStyle } from '../hooks/useFlexPropsStyle';
import { Pressable, View } from 'react-native';
export const Row = ({
  style,
  children,
  touchableOpacity = false,
  touchableScale = true,
  onPress,
  onLongPress,
  ...props
}) => {
  const flexPropsStyle = useFlexPropsStyle(props);
  if (onPress || onLongPress) return /*#__PURE__*/React.createElement(Pressable, _extends({
    onPress: onPress,
    onLongPress: onLongPress,
    style: ({
      pressed
    }) => [flexPropsStyle.flexStyle, style, {
      flexDirection: 'row'
    }, touchableScale && pressed ? {
      transform: [{
        scale: 0.9
      }]
    } : null, touchableOpacity && pressed ? {
      opacity: 0.2
    } : null]
  }, flexPropsStyle.props), children);
  return /*#__PURE__*/React.createElement(View, _extends({
    style: [flexPropsStyle.flexStyle, style, {
      flexDirection: 'row'
    }]
  }, flexPropsStyle.props), children);
};
export default Row;