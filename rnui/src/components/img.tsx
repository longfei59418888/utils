import { FC, useMemo } from 'react'
import {
  Image as ImageBase,
  ImageProps,
  ImageStyle,
  PixelRatio,
  Pressable,
} from 'react-native'

import {
  getScale,
  useFlexPropsStyle,
  ViewExtendPropsWithPress,
} from '../hooks/useFlexPropsStyle'

type sizeType = number | `${number}%`

export const Img: FC<
  ViewExtendPropsWithPress<
    ImageProps & {
      size?: sizeType
      imageStyle?: ImageStyle
    }
  >
> = ({
  source,
  touchableOpacity = false,
  touchableScale = true,
  size,
  resizeMode = 'contain',
  onPress,
  style,
  imageStyle,
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
    return (
      <Pressable
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
}

export default Img
