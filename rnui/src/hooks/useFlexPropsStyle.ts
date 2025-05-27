import { useMemo } from 'react'
import { FlexStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes'
import { Dimensions, PixelRatio, ViewProps } from 'react-native'
import { PressableProps } from 'react-native/Libraries/Components/Pressable/Pressable'

let SCALE: number | null = null

export const getScale = () => {
  if (!SCALE) throw 'please call setDesignWidth, set design width.'
  return SCALE
}
export const viewProps = [
  'borderBottomWidth',
  'borderEndWidth',
  'borderLeftWidth',
  'borderRightWidth',
  'borderStartWidth',
  'borderTopWidth',
  'borderWidth',
  'bottom',
  'rowGap',
  'gap',
  'columnGap',
  'height',
  'left',
  'margin',
  'marginBottom',
  'marginEnd',
  'marginHorizontal',
  'marginLeft',
  'marginRight',
  'marginStart',
  'marginTop',
  'marginVertical',
  'maxHeight',
  'maxWidth',
  'minHeight',
  'minWidth',
  'padding',
  'paddingBottom',
  'paddingEnd',
  'paddingHorizontal',
  'paddingLeft',
  'paddingRight',
  'paddingStart',
  'paddingTop',
  'right',
  'start',
  'top',
  'width',
] as const
export type FlexStyleProps = (typeof viewProps)[number]

export const setDesignWidth = (width: number) => {
  SCALE = Dimensions.get('screen').width / width
}

export const viewPropsBooleans = {
  alignContentFlexStart: { alignContent: 'flex-start' },
  alignContentFlexEnd: { alignContent: 'flex-end' },
  alignContentCenter: { alignContent: 'center' },
  alignContentStretch: { alignContent: 'stretch' },
  alignContentSpaceBetween: { alignContent: 'space-between' },
  alignContentSpaceAround: { alignContent: 'space-around' },
  alignContentSpaceEvenly: { alignContent: 'space-evenly' },
  alignItemsFlexStart: { alignItems: 'flex-start' },
  alignSelfFlexStart: { alignSelf: 'flex-start' },
  alignItemsFlexEnd: { alignItems: 'flex-end' },
  alignSelfFlexEnd: { alignSelf: 'flex-end' },
  alignItemsCenter: { alignItems: 'center' },
  alignSelfCenter: { alignSelf: 'center' },
  alignItemsStretch: { alignItems: 'stretch' },
  alignSelfStretch: { alignSelf: 'stretch' },
  alignItemsBaseline: { alignItems: 'baseline' },
  alignSelfBaseline: { alignSelf: 'baseline' },
  displayNone: { display: 'none' },
  displayFlex: { display: 'flex' },
  flexDirectionRow: { flexDirection: 'row' },
  flexDirectionColumn: { flexDirection: 'column' },
  flexDirectionRowReverse: { flexDirection: 'row-reverse' },
  flexDirectionColumnReverse: { flexDirection: 'column-reverse' },
  flexWrap: { flexWrap: 'wrap' },
  flexNoWrap: { flexWrap: 'nowrap' },
  flexWrapReverse: { flexWrap: 'wrap-reverse' },
  justifyContentFlexStart: { justifyContent: 'flex-start' },
  justifyContentFlexEnd: { justifyContent: 'flex-end' },
  justifyContentCenter: { justifyContent: 'center' },
  justifyContentSpaceBetween: { justifyContent: 'space-between' },
  justifyContentSpaceAround: { justifyContent: 'space-around' },
  justifyContentSpaceEvenly: { justifyContent: 'space-evenly' },
  overflowVisible: { overflow: 'visible' },
  overflowHidden: { overflow: 'hidden' },
  overflowScroll: { overflow: 'scroll' },
  absolute: { position: 'absolute' },
  relative: { position: 'relative' },
  static: { position: 'static' },
}

export type FlexValue = keyof typeof viewPropsBooleans

export type ViewExtendProps<T = object> = ViewProps &
  Partial<Record<FlexValue, boolean>> &
  Pick<FlexStyle, FlexStyleProps> & {
    flex?: true | number
    zIndex?: number
    borderRadius?: number
    borderBottomLeftRadius?: number
    borderBottomRightRadius?: number
    borderTopLeftRadius?: number
    borderTopRightRadius?: number
    borderColor?: string
    widthFull?: boolean
    opacity?: number
    backgroundColor?: string
    heightFull?: boolean
    center?: boolean
  } & T

export type ViewExtendPropsWithPress<T = object> = ViewExtendProps<{
  onPress?: PressableProps['onPress']
  touchableOpacity?: boolean
  onLongPress?: PressableProps['onLongPress']
}> &
  T

export const scaleStyle = <T = FlexStyle>(rest: T) => {
  for (const attr in rest) {
    const value = rest[attr as keyof T]
    if (
      viewProps.includes(attr as FlexStyleProps) &&
      typeof value === 'number'
    ) {
      rest[attr as keyof T] = PixelRatio.roundToNearestPixel(
        value * getScale(),
      ) as any
    }
  }
  return rest
}

export const useFlexPropsStyle = <V = ViewProps, F = FlexStyle>({
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
}: ViewExtendProps) => {
  return useMemo(() => {
    let flexStyle: FlexStyle = {
      ...(centerProps
        ? {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }
        : {}),
      ...(zIndex !== undefined ? { zIndex } : {}),
      ...(borderColor !== undefined ? { borderColor } : {}),
      ...(borderRadius !== undefined ? { borderRadius } : {}),
      ...(opacity !== undefined ? { opacity } : {}),
      ...(borderBottomLeftRadius !== undefined
        ? { borderBottomLeftRadius }
        : {}),
      ...(borderBottomRightRadius !== undefined
        ? { borderBottomRightRadius }
        : {}),
      ...(borderTopLeftRadius !== undefined ? { borderTopLeftRadius } : {}),
      ...(borderTopRightRadius !== undefined ? { borderTopRightRadius } : {}),
      ...(backgroundColor ? { backgroundColor } : {}),
      ...(widthFull ? { width: '100%' } : {}),
      ...(heightFull ? { height: '100%' } : {}),
      ...(flex ? { flex: flex === true ? 1 : flex } : {}),
    }
    const props: any = {}
    for (const attr in rest) {
      const value = rest[attr as keyof ViewProps]
      if (
        viewProps.includes(attr as FlexStyleProps) &&
        typeof value === 'number'
      ) {
        flexStyle[attr as FlexStyleProps] = PixelRatio.roundToNearestPixel(
          value * getScale(),
        )
      } else if (viewPropsBooleans[attr as FlexValue]) {
        flexStyle = {
          ...flexStyle,
          ...viewPropsBooleans[attr as FlexValue],
        } as FlexStyle
      } else {
        props[attr] = value
      }
    }
    return {
      flexStyle: flexStyle as F,
      props: props as V,
    }
  }, [flex, heightFull, rest, widthFull])
}
