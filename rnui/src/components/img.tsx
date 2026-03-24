import {
  getScale,
  useFlexPropsStyle,
  ViewExtendPropsWithPress,
} from '../hooks/useFlexPropsStyle'
import { FC, useMemo, useState } from 'react'
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
  touchableScale = true,
  size,
  resizeMode = 'contain',
  onPress,
  style,
  ...props
}) => {
  const propsStyle = useFlexPropsStyle<ImageProps, ImageStyle>(props)
  const [scale, setScale] = useState(1)
  const onPressIn = () => touchableScale && setScale(0.9)
  const onPressOut = () => setScale(1)
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
      <Pressable
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={onPress}>
        <ImageBase
          source={source}
          style={[
            { resizeMode },
            propsStyle.flexStyle,
            styles,
            style,
            { transform: [{ scale }] },
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
