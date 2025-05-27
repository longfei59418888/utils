import {
  ImageBackground,
  ImageProps,
  ImageResizeMode,
  LayoutChangeEvent,
  ViewStyle,
} from 'react-native'
import { useFlexPropsStyle, ViewExtendProps } from '../hooks/useFlexPropsStyle'
import { FC } from 'react'

export const Background: FC<
  ViewExtendProps<{
    source: ImageProps['source']
    resizeMode?: ImageResizeMode
    style?: ViewStyle
    onLayout?: ((event: LayoutChangeEvent) => void) | undefined
  }>
> = ({ style, onLayout, children, source, resizeMode, ...rest }) => {
  const flexPropsStyle = useFlexPropsStyle(rest)
  return (
    <ImageBackground
      source={source}
      resizeMode={resizeMode}
      onLayout={onLayout}
      style={[flexPropsStyle.flexStyle, style]}>
      {children}
    </ImageBackground>
  )
}

export default Background
