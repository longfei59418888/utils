import { memo, useMemo } from 'react'
import {
  Image as ImageBase,
  ImageProps,
  ImageStyle,
  PixelRatio,
  Pressable,
} from 'react-native'

import {
  useScale,
  useFlexPropsStyle,
  ViewExtendPropsWithPress,
} from '../hooks/useFlexPropsStyle'

type sizeType = number | `${number}%`

export const Img = memo(function Img({
  source,
  touchableOpacity = false,
  touchableScale = true,
  size,
  resizeMode = 'contain',
  onPress,
  style,
  imageStyle,
  ...props
}: ViewExtendPropsWithPress<
  ImageProps & {
    size?: sizeType
    imageStyle?: ImageStyle
  }
>) {
  const propsStyle = useFlexPropsStyle<ImageProps, ImageStyle>(props)
  const scale = useScale()
  const styles: ImageStyle = useMemo(() => {
    if (!size) return {}
    const dimension =
      typeof size === 'number'
        ? PixelRatio.roundToNearestPixel(size * scale)
        : size
    return {
      height: dimension,
      width: dimension,
    }
  }, [size, scale])

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="imagebutton"
        onPress={onPress}
        style={({ pressed }) => [
          touchableScale && pressed ? { transform: [{ scale: 0.9 }] } : null,
          touchableOpacity && pressed ? { opacity: 0.2 } : null,
          propsStyle.flexStyle,
          styles,
          style,
        ]}>
        <ImageBase
          source={source}
          style={[
            { resizeMode },
            styles,
            {
              height: propsStyle.flexStyle.height,
              width: propsStyle.flexStyle.width,
            },
            imageStyle,
          ]}
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
})

export default Img
