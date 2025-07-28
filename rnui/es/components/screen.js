function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { StatusBar } from 'react-native';
import { Background, Column } from '../index';
import useSafeAreaInsetsStyle from '../hooks/useSafeAreaInsetsStyle';
export const Screen = ({
  backgroundColor = 'transparent',
  source,
  children,
  statusBarProps,
  style,
  barStyle,
  resizeMode = 'cover',
  safeAreaEdges = ['bottom'],
  ...rest
}) => {
  const safeAreaInsetStyle = useSafeAreaInsetsStyle(safeAreaEdges);
  if (source) {
    return /*#__PURE__*/React.createElement(Background, {
      widthFull: true,
      heightFull: true,
      resizeMode: resizeMode,
      source: source
    }, /*#__PURE__*/React.createElement(Column, _extends({
      widthFull: true,
      heightFull: true,
      backgroundColor: backgroundColor,
      style: [safeAreaInsetStyle, style]
    }, rest), /*#__PURE__*/React.createElement(StatusBar, _extends({
      barStyle: barStyle
    }, statusBarProps)), children));
  }
  return /*#__PURE__*/React.createElement(Column, _extends({
    widthFull: true,
    heightFull: true,
    backgroundColor: backgroundColor,
    style: [safeAreaInsetStyle, style]
  }, rest), /*#__PURE__*/React.createElement(StatusBar, _extends({
    barStyle: barStyle
  }, statusBarProps)), children);
};
export default Screen;