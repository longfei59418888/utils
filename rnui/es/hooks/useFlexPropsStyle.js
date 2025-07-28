import { useMemo } from 'react';
import { Dimensions, PixelRatio } from 'react-native';
let SCALE = null;
export const getScale = () => {
  if (!SCALE) throw 'please call setDesignWidth, set design width.';
  return SCALE;
};
export const viewProps = ['borderBottomWidth', 'borderEndWidth', 'borderLeftWidth', 'borderRightWidth', 'borderStartWidth', 'borderTopWidth', 'borderWidth', 'bottom', 'rowGap', 'gap', 'columnGap', 'height', 'left', 'margin', 'marginBottom', 'marginEnd', 'marginHorizontal', 'marginLeft', 'marginRight', 'marginStart', 'marginTop', 'marginVertical', 'maxHeight', 'maxWidth', 'minHeight', 'minWidth', 'padding', 'paddingBottom', 'paddingEnd', 'paddingHorizontal', 'paddingLeft', 'paddingRight', 'paddingStart', 'paddingTop', 'right', 'start', 'top', 'width'];
export const setDesignWidth = width => {
  SCALE = Dimensions.get('screen').width / width;
};
export const viewPropsBooleans = {
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
export const scaleStyle = (rest, attrs = []) => {
  for (const attr in rest) {
    const value = rest[attr];
    if ([...viewProps, 'fontSize', ...attrs].includes(attr) && typeof value === 'number') {
      rest[attr] = PixelRatio.roundToNearestPixel(value * getScale());
    }
  }
  return rest;
};
export const scale = value => PixelRatio.roundToNearestPixel(value * getScale());
export const useFlexPropsStyle = ({
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
}) => {
  return useMemo(() => {
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
        flexStyle[attr] = PixelRatio.roundToNearestPixel(value * getScale());
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