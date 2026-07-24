import { memo } from 'react'
import { Pressable, View, ViewStyle } from 'react-native'

import {
  useFlexPropsStyle,
  ViewExtendPropsWithPress,
} from '../hooks/useFlexPropsStyle'

/**
 * Row / Column 的公共实现。
 * defaultStyle 放在 flexStyle 之前作为默认值,使布尔 props(如 flexDirection*)和 style 可覆盖它。
 */
export const FlexBox = memo<
  ViewExtendPropsWithPress & { defaultStyle?: ViewStyle }
>(function FlexBox({
  style,
  children,
  defaultStyle,
  touchableOpacity = false,
  touchableScale = true,
  onPress,
  onLongPress,
  ...props
}) {
  const { flexStyle, props: rest } = useFlexPropsStyle(props)

  if (onPress || onLongPress) {
    return (
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        onLongPress={onLongPress}
        style={({ pressed }) => [
          defaultStyle,
          flexStyle,
          style,
          touchableScale && pressed ? { transform: [{ scale: 0.9 }] } : null,
          touchableOpacity && pressed ? { opacity: 0.2 } : null,
        ]}
        {...rest}>
        {children}
      </Pressable>
    )
  }

  return (
    <View style={[defaultStyle, flexStyle, style]} {...rest}>
      {children}
    </View>
  )
})

export default FlexBox
