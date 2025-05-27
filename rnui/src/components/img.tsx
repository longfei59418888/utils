import {
  getScale,
  useFlexPropsStyle,
  ViewExtendPropsWithPress,
} from '../hooks/useFlexPropsStyle'
import { FC, useMemo } from 'react'
import {
  Image as ImageBase,
  ImageStyle,
  PixelRatio,
  ImageResizeMode,
  ImageProps,
  Pressable,
  TouchableOpacity,
} from 'react-native'

type sizeType = number | `${number}%`

export const Img: FC<
  ViewExtendPropsWithPress<{
    source: ImageProps['source']
    resizeMode?: ImageResizeMode
    size?: sizeType

    style?: ImageStyle
  }>
> = ({
  source,
  touchableOpacity = false,
  size,
  resizeMode = 'contain',
  onPress,
  style,
  ...props
}) => {
  const propsStyle = useFlexPropsStyle<ImageProps, ImageStyle>(props)
  const styles: ImageStyle = useMemo(() => {
    if (!size) return {}
    if (typeof size === 'number') {
      size = PixelRatio.roundToNearestPixel(size * getScale())
      return {
        height: size,
        width: size,
      }
    }
    return {
      height: size,
      width: size,
    }
  }, [size])

  if (onPress) {
    if (touchableOpacity)
      return (
        <TouchableOpacity onPress={onPress}>
          <ImageBase
            source={source}
            style={[{ resizeMode }, propsStyle.flexStyle, styles, style]}
            {...propsStyle.props}
          />
        </TouchableOpacity>
      )

    return (
      <Pressable onPress={onPress}>
        <ImageBase
          source={source}
          style={[{ resizeMode }, propsStyle.flexStyle, styles, style]}
          {...propsStyle.props}
        />
      </Pressable>
    )
  }

  return (
    <ImageBase
      source={source}
      style={[{ resizeMode }, propsStyle.flexStyle, styles, style]}
      {...propsStyle.props}
    />
  )
}

export default Img
