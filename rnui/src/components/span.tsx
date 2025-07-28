import {
  getScale,
  useFlexPropsStyle,
  ViewExtendProps,
} from '../hooks/useFlexPropsStyle'
import { ReactNode } from 'react'
import {
  PixelRatio,
  StyleProp,
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle,
} from 'react-native'

export interface TextProps extends RNTextProps {
  text?: string
  fontFamily?: string
  style?: StyleProp<TextStyle>
  color?: string
  lineHeight?: number
  size?: number
  children?: ReactNode
}

export function Span(
  props: Omit<ViewExtendProps, 'style'> &
    TextProps &
    Partial<
      Record<`textAlign${'Left' | 'Center' | 'Justify' | 'Right'}`, boolean>
    >,
) {
  const {
    color,
    lineHeight,
    textAlignCenter,
    textAlignJustify,
    textAlignLeft,
    textAlignRight,
    size = 16,
    text,
    fontFamily,
    children,
    style,
    ...rest
  } = props
  const propsStyle = useFlexPropsStyle(rest)
  const content = text || children
  const scale = getScale()

  const styles: StyleProp<TextStyle> = [
    {
      fontSize: PixelRatio.roundToNearestPixel(size * scale),
      lineHeight: PixelRatio.roundToNearestPixel(size * 1.5 * scale),
      height: PixelRatio.roundToNearestPixel(size * 1.5 * scale),
    },
    { color: color, fontFamily },
    lineHeight
      ? {
          lineHeight: PixelRatio.roundToNearestPixel(lineHeight * scale),
          height: PixelRatio.roundToNearestPixel(lineHeight * scale),
        }
      : {},
    propsStyle.flexStyle,
    {
      textAlign: textAlignCenter
        ? 'center'
        : textAlignJustify
          ? 'justify'
          : textAlignRight
            ? 'right'
            : textAlignLeft
              ? 'left'
              : undefined,
    },
    style,
  ]
  return (
    <RNText {...propsStyle.props} style={styles}>
      {content}
    </RNText>
  )
}

export default Span
