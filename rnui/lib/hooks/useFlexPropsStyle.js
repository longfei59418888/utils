"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.viewPropsBooleans = exports.viewProps = exports.useFlexPropsStyle = exports.setDesignWidth = exports.scaleStyle = exports.getScale = void 0;
var _react = require("react");
var _reactNative = require("react-native");
let SCALE = null;
const getScale = () => {
  if (!SCALE) throw 'please call setDesignWidth, set design width.';
  return SCALE;
};
exports.getScale = getScale;
const viewProps = exports.viewProps = ['borderBottomWidth', 'borderEndWidth', 'borderLeftWidth', 'borderRightWidth', 'borderStartWidth', 'borderTopWidth', 'borderWidth', 'bottom', 'rowGap', 'gap', 'columnGap', 'height', 'left', 'margin', 'marginBottom', 'marginEnd', 'marginHorizontal', 'marginLeft', 'marginRight', 'marginStart', 'marginTop', 'marginVertical', 'maxHeight', 'maxWidth', 'minHeight', 'minWidth', 'padding', 'paddingBottom', 'paddingEnd', 'paddingHorizontal', 'paddingLeft', 'paddingRight', 'paddingStart', 'paddingTop', 'right', 'start', 'top', 'width'];
const setDesignWidth = width => {
  SCALE = _reactNative.Dimensions.get('screen').width / width;
};
exports.setDesignWidth = setDesignWidth;
const viewPropsBooleans = exports.viewPropsBooleans = {
  alignContentFlexStart: {
    alignContent: 'flex-start'
  },
  alignContentFlexEnd: {
    alignContent: 'flex-end'
  },
  alignContentCenter: {
    alignContent: 'center'
  },
  alignContentStretch: {
    alignContent: 'stretch'
  },
  alignContentSpaceBetween: {
    alignContent: 'space-between'
  },
  alignContentSpaceAround: {
    alignContent: 'space-around'
  },
  alignContentSpaceEvenly: {
    alignContent: 'space-evenly'
  },
  alignItemsFlexStart: {
    alignItems: 'flex-start'
  },
  alignSelfFlexStart: {
    alignSelf: 'flex-start'
  },
  alignItemsFlexEnd: {
    alignItems: 'flex-end'
  },
  alignSelfFlexEnd: {
    alignSelf: 'flex-end'
  },
  alignItemsCenter: {
    alignItems: 'center'
  },
  alignSelfCenter: {
    alignSelf: 'center'
  },
  alignItemsStretch: {
    alignItems: 'stretch'
  },
  alignSelfStretch: {
    alignSelf: 'stretch'
  },
  alignItemsBaseline: {
    alignItems: 'baseline'
  },
  alignSelfBaseline: {
    alignSelf: 'baseline'
  },
  displayNone: {
    display: 'none'
  },
  displayFlex: {
    display: 'flex'
  },
  flexDirectionRow: {
    flexDirection: 'row'
  },
  flexDirectionColumn: {
    flexDirection: 'column'
  },
  flexDirectionRowReverse: {
    flexDirection: 'row-reverse'
  },
  flexDirectionColumnReverse: {
    flexDirection: 'column-reverse'
  },
  flexWrap: {
    flexWrap: 'wrap'
  },
  flexNoWrap: {
    flexWrap: 'nowrap'
  },
  flexWrapReverse: {
    flexWrap: 'wrap-reverse'
  },
  justifyContentFlexStart: {
    justifyContent: 'flex-start'
  },
  justifyContentFlexEnd: {
    justifyContent: 'flex-end'
  },
  justifyContentCenter: {
    justifyContent: 'center'
  },
  justifyContentSpaceBetween: {
    justifyContent: 'space-between'
  },
  justifyContentSpaceAround: {
    justifyContent: 'space-around'
  },
  justifyContentSpaceEvenly: {
    justifyContent: 'space-evenly'
  },
  overflowVisible: {
    overflow: 'visible'
  },
  overflowHidden: {
    overflow: 'hidden'
  },
  overflowScroll: {
    overflow: 'scroll'
  },
  absolute: {
    position: 'absolute'
  },
  relative: {
    position: 'relative'
  },
  static: {
    position: 'static'
  }
};
const scaleStyle = rest => {
  for (const attr in rest) {
    const value = rest[attr];
    if (viewProps.includes(attr) && typeof value === 'number') {
      rest[attr] = _reactNative.PixelRatio.roundToNearestPixel(value * getScale());
    }
  }
  return rest;
};
exports.scaleStyle = scaleStyle;
const useFlexPropsStyle = _ref => {
  let {
    flex,
    zIndex,
    borderRadius,
    opacity,
    borderBottomLeftRadius,
    borderBottomRightRadius,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderColor,
    widthFull,
    heightFull,
    backgroundColor,
    center: centerProps,
    ...rest
  } = _ref;
  return (0, _react.useMemo)(() => {
    let flexStyle = {
      ...(centerProps ? {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      } : {}),
      ...(zIndex !== undefined ? {
        zIndex
      } : {}),
      ...(borderColor !== undefined ? {
        borderColor
      } : {}),
      ...(borderRadius !== undefined ? {
        borderRadius
      } : {}),
      ...(opacity !== undefined ? {
        opacity
      } : {}),
      ...(borderBottomLeftRadius !== undefined ? {
        borderBottomLeftRadius
      } : {}),
      ...(borderBottomRightRadius !== undefined ? {
        borderBottomRightRadius
      } : {}),
      ...(borderTopLeftRadius !== undefined ? {
        borderTopLeftRadius
      } : {}),
      ...(borderTopRightRadius !== undefined ? {
        borderTopRightRadius
      } : {}),
      ...(backgroundColor ? {
        backgroundColor
      } : {}),
      ...(widthFull ? {
        width: '100%'
      } : {}),
      ...(heightFull ? {
        height: '100%'
      } : {}),
      ...(flex ? {
        flex: flex === true ? 1 : flex
      } : {})
    };
    const props = {};
    for (const attr in rest) {
      const value = rest[attr];
      if (viewProps.includes(attr) && typeof value === 'number') {
        flexStyle[attr] = _reactNative.PixelRatio.roundToNearestPixel(value * getScale());
      } else if (viewPropsBooleans[attr]) {
        flexStyle = {
          ...flexStyle,
          ...viewPropsBooleans[attr]
        };
      } else {
        props[attr] = value;
      }
    }
    return {
      flexStyle: flexStyle,
      props: props
    };
  }, [flex, heightFull, rest, widthFull]);
};
exports.useFlexPropsStyle = useFlexPropsStyle;