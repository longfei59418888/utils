import { memo } from 'react'
import { ImageBackground } from 'react-native'
import { ImageBackgroundProps } from 'react-native/Libraries/Image/Image'

import { useFlexPropsStyle, ViewExtendProps } from '../hooks/useFlexPropsStyle'

export const Background = memo<ViewExtendProps<ImageBackgroundProps>>(
  function Background({ style, onLayout, children, source, resizeMode, ...rest }) {
    const flexPropsStyle = useFlexPropsStyle(rest)
    return (
      <ImageBackground
        source={source}
        resizeMode={resizeMode}
        onLayout={onLayout}
        {...flexPropsStyle.props}
        style={[flexPropsStyle.flexStyle, style]}>
        {children}
      </ImageBackground>
    )
  },
)

export default Background
