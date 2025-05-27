function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { useFlexPropsStyle } from '../hooks/useFlexPropsStyle';
import { Pressable, TouchableOpacity, View } from 'react-native';
export const Column = props => {
  const {
    style,
    onPress,
    touchableOpacity = false,
    onLongPress,
    children,
    ...rest
  } = props;
  const flexPropsStyle = useFlexPropsStyle(rest);
  if (onPress && touchableOpacity) return /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: onPress
  }, /*#__PURE__*/React.createElement(View, _extends({
    style: [flexPropsStyle.flexStyle, style]
  }, flexPropsStyle.props), children));
  if (onPress || onLongPress) return /*#__PURE__*/React.createElement(Pressable, {
    onPress: onPress,
    onLongPress: onLongPress
  }, /*#__PURE__*/React.createElement(View, _extends({
    style: [flexPropsStyle.flexStyle, style]
  }, flexPropsStyle.props), children));
  return /*#__PURE__*/React.createElement(View, _extends({
    style: [flexPropsStyle.flexStyle, style]
  }, flexPropsStyle.props), children);
};
export default Column;