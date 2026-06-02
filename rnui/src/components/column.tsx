import {
  useFlexPropsStyle,
  ViewExtendPropsWithPress,
} from '../hooks/useFlexPropsStyle'
import { FC } from 'react'
import { Pressable, View } from 'react-native'

export const Column: FC<ViewExtendPropsWithPress> = (props) => {
  const {
    style,
    onPress,
    touchableOpacity = false,
    touchableScale = true,
    onLongPress,
    children,
    ...rest
  } = props
  const flexPropsStyle = useFlexPropsStyle(rest)
  if (onPress || onLongPress)
    return (
      <Pressable
        onPress={onPress}
        onLongPress={onLongPress}
        style={({ pressed }) => [
          flexPropsStyle.flexStyle,
          style,
          touchableScale && pressed ? { transform: [{ scale: 0.9 }] } : null,
          touchableOpacity && pressed ? { opacity: 0.2 } : null,
        ]}
        {...flexPropsStyle.props}>
        {children}
      </Pressable>
    )
  return (
    <View style={[flexPropsStyle.flexStyle, style]} {...flexPropsStyle.props}>
      {children}
    </View>
  )
}

export default Column
