"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.viewPropsBooleans = exports.viewProps = exports.useFlexPropsStyle = exports.setDesignWidth = exports.scaleStyle = exports.scale = exports.getScale = void 0;
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
  /* alignContent */
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
  /* alignItems */
  alignItemsFlexStart: {
    alignItems: 'flex-start'
  },
  alignItemsFlexEnd: {
    alignItems: 'flex-end'
  },
  alignItemsCenter: {
    alignItems: 'center'
  },
  alignItemsStretch: {
    alignItems: 'stretch'
  },
  alignItemsBaseline: {
    alignItems: 'baseline'
  },
  /* alignSelf */
  alignSelfFlexStart: {
    alignSelf: 'flex-start'
  },
  alignSelfFlexEnd: {
    alignSelf: 'flex-end'
  },
  alignSelfCenter: {
    alignSelf: 'center'
  },
  alignSelfStretch: {
    alignSelf: 'stretch'
  },
  alignSelfBaseline: {
    alignSelf: 'baseline'
  },
  /* boxSizing */
  boxSizingBorderBox: {
    boxSizing: 'border-box'
  },
  boxSizingContentBox: {
    boxSizing: 'content-box'
  },
  /* direction */
  directionInherit: {
    direction: 'inherit'
  },
  directionLtr: {
    direction: 'ltr'
  },
  directionRtl: {
    direction: 'rtl'
  },
  /* display */
  displayNone: {
    display: 'none'
  },
  displayFlex: {
    display: 'flex'
  },
  displayContents: {
    display: 'contents'
  },
  /* flexDirection */
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
  /* flexWrap */
  flexWrap: {
    flexWrap: 'wrap'
  },
  flexNoWrap: {
    flexWrap: 'nowrap'
  },
  flexWrapReverse: {
    flexWrap: 'wrap-reverse'
  },
  /* isolation */
  isolationAuto: {
    isolation: 'auto'
  },
  isolationIsolate: {
    isolation: 'isolate'
  },
  /* justifyContent */
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
  /* overflow */
  overflowVisible: {
    overflow: 'visible'
  },
  overflowHidden: {
    overflow: 'hidden'
  },
  overflowScroll: {
    overflow: 'scroll'
  },
  /* position */
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
const scaleStyle = function (rest) {
  let attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  for (const attr in rest) {
    const value = rest[attr];
    if ([...viewProps, 'fontSize', ...attrs].includes(attr) && typeof value === 'number') {
      rest[attr] = _reactNative.PixelRatio.roundToNearestPixel(value * getScale());
    }
  }
  return rest;
};
exports.scaleStyle = scaleStyle;
const scale = value => _reactNative.PixelRatio.roundToNearestPixel(value * getScale());
exports.scale = scale;
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
    center,
    ...rest
  } = _ref;
  return (0, _react.useMemo)(() => {
    let flexStyle = {
      ...(center ? {
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