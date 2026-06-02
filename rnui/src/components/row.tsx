import {
  useFlexPropsStyle,
  ViewExtendPropsWithPress,
} from '../hooks/useFlexPropsStyle'
import { FC } from 'react'
import { Pressable, View } from 'react-native'

export const Row: FC<ViewExtendPropsWithPress> = ({
  style,
  children,
  touchableOpacity = false,
  touchableScale = true,
  onPress,
  onLongPress,
  ...props
}) => {
  const flexPropsStyle = useFlexPropsStyle(props)
  if (onPress || onLongPress)
    return (
      <Pressable
        onPress={onPress}
        onLongPress={onLongPress}
        style={({ pressed }) => [
          flexPropsStyle.flexStyle,
          style,
          {
            flexDirection: 'row',
          },
          touchableScale && pressed ? { transform: [{ scale: 0.9 }] } : null,
          touchableOpacity && pressed ? { opacity: 0.2 } : null,
        ]}
        {...flexPropsStyle.props}>
        {children}
      </Pressable>
    )
  return (
    <View
      style={[
        flexPropsStyle.flexStyle,
        style,
        {
          flexDirection: 'row',
        },
      ]}
      {...flexPropsStyle.props}>
      {children}
    </View>
  )
}

export default Row
