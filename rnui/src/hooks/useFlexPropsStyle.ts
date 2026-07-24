import {
  Dimensions,
  PixelRatio,
  useWindowDimensions,
  ViewProps,
} from 'react-native'
import { PressableProps } from 'react-native/Libraries/Components/Pressable/Pressable'
import { FlexStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes'

let DESIGN_WIDTH: number | null = null

const assertDesignWidth = (width: number | null): number => {
  if (width == null)
    throw new Error(
      '@xlong/rnui: please call setDesignWidth(width) before rendering.',
    )
  return width
}

/**
 * 即时读取缩放比(命令式)。基于当前 window 宽度计算,旋转/分屏后再次调用即为最新值。
 * 非响应式:在渲染期调用不会随窗口变化自动重渲染,响应式场景请用 useScale()。
 */
export const getScale = (): number =>
  Dimensions.get('window').width / assertDesignWidth(DESIGN_WIDTH)
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

const viewPropsSet: ReadonlySet<string> = new Set(viewProps)

export const setDesignWidth = (width: number) => {
  DESIGN_WIDTH = width
}

/**
 * 响应式缩放比:随窗口宽度(旋转/折叠屏/分屏)变化自动更新。
 */
export const useScale = (): number => {
  const { width } = useWindowDimensions()
  return width / assertDesignWidth(DESIGN_WIDTH)
}

export const viewPropsBooleans = {
  /* alignContent */
  alignContentFlexStart: { alignContent: 'flex-start' },
  alignContentFlexEnd: { alignContent: 'flex-end' },
  alignContentCenter: { alignContent: 'center' },
  alignContentStretch: { alignContent: 'stretch' },
  alignContentSpaceBetween: { alignContent: 'space-between' },
  alignContentSpaceAround: { alignContent: 'space-around' },
  alignContentSpaceEvenly: { alignContent: 'space-evenly' },
  /* alignItems */
  alignItemsFlexStart: { alignItems: 'flex-start' },
  alignItemsFlexEnd: { alignItems: 'flex-end' },
  alignItemsCenter: { alignItems: 'center' },
  alignItemsStretch: { alignItems: 'stretch' },
  alignItemsBaseline: { alignItems: 'baseline' },
  /* alignSelf */
  alignSelfFlexStart: { alignSelf: 'flex-start' },
  alignSelfFlexEnd: { alignSelf: 'flex-end' },
  alignSelfCenter: { alignSelf: 'center' },
  alignSelfStretch: { alignSelf: 'stretch' },
  alignSelfBaseline: { alignSelf: 'baseline' },
  /* boxSizing */
  boxSizingBorderBox: { boxSizing: 'border-box' },
  boxSizingContentBox: { boxSizing: 'content-box' },
  /* direction */
  directionInherit: { direction: 'inherit' },
  directionLtr: { direction: 'ltr' },
  directionRtl: { direction: 'rtl' },
  /* display */
  displayNone: { display: 'none' },
  displayFlex: { display: 'flex' },
  displayContents: { display: 'contents' },
  /* flexDirection */
  flexDirectionRow: { flexDirection: 'row' },
  flexDirectionColumn: { flexDirection: 'column' },
  flexDirectionRowReverse: { flexDirection: 'row-reverse' },
  flexDirectionColumnReverse: { flexDirection: 'column-reverse' },
  /* flexWrap */
  flexWrap: { flexWrap: 'wrap' },
  flexNoWrap: { flexWrap: 'nowrap' },
  flexWrapReverse: { flexWrap: 'wrap-reverse' },
  /* isolation */
  isolationAuto: { isolation: 'auto' },
  isolationIsolate: { isolation: 'isolate' },
  /* justifyContent */
  justifyContentFlexStart: { justifyContent: 'flex-start' },
  justifyContentFlexEnd: { justifyContent: 'flex-end' },
  justifyContentCenter: { justifyContent: 'center' },
  justifyContentSpaceBetween: { justifyContent: 'space-between' },
  justifyContentSpaceAround: { justifyContent: 'space-around' },
  justifyContentSpaceEvenly: { justifyContent: 'space-evenly' },
  /* overflow */
  overflowVisible: { overflow: 'visible' },
  overflowHidden: { overflow: 'hidden' },
  overflowScroll: { overflow: 'scroll' },
  /* position */
  absolute: { position: 'absolute' },
  relative: { position: 'relative' },
  static: { position: 'static' },
}

export type FlexValue = keyof typeof viewPropsBooleans

export type ViewExtendProps<T = object> = ViewProps &
  Partial<Record<FlexValue, boolean>> &
  Pick<FlexStyle, FlexStyleProps> & {
    zIndex?: number
    borderRadius?: number
    borderBottomLeftRadius?: number
    borderBottomRightRadius?: number
    borderTopLeftRadius?: number
    borderTopRightRadius?: number
    borderColor?: string
    opacity?: number
    backgroundColor?: string

    flex?: true | number
    widthFull?: boolean
    heightFull?: boolean
    center?: boolean
  } & T

export type ViewExtendPropsWithPress<T = object> = ViewExtendProps<{
  onPress?: PressableProps['onPress']
  touchableOpacity?: boolean
  touchableScale?: boolean
  onLongPress?: PressableProps['onLongPress']
}> &
  T

export const scaleStyle = <T extends Record<string, unknown>>(
  rest: T,
  attrs: string[] = [],
): T => {
  const scale = getScale()
  const extra = new Set(attrs)
  const out: Record<string, unknown> = { ...rest }
  for (const attr in out) {
    const value = out[attr]
    if (
      (viewPropsSet.has(attr) || attr === 'fontSize' || extra.has(attr)) &&
      typeof value === 'number'
    ) {
      out[attr] = PixelRatio.roundToNearestPixel(value * scale)
    }
  }
  return out as T
}

export const scale = (value: number): number =>
  PixelRatio.roundToNearestPixel(value * getScale())

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
  center,
  ...rest
}: ViewExtendProps) => {
  const scale = useScale()
  let flexStyle: FlexStyle = {
    ...(center
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
    ...(borderBottomLeftRadius !== undefined ? { borderBottomLeftRadius } : {}),
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
  const props: Record<string, unknown> = {}
  for (const attr in rest) {
    const value = rest[attr as keyof typeof rest]
    if (viewPropsSet.has(attr) && typeof value === 'number') {
      flexStyle[attr as FlexStyleProps] = PixelRatio.roundToNearestPixel(
        value * scale,
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
}
