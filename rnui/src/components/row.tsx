import {
  useFlexPropsStyle,
  ViewExtendPropsWithPress,
} from '../hooks/useFlexPropsStyle'
import { FC, useState } from 'react'
import { Pressable, TouchableOpacity, View } from 'react-native'

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
  const [scale, setScale] = useState(1)
  const onPressIn = () => touchableScale && setScale(0.9)
  const onPressOut = () => setScale(1)
  if (onPress && touchableOpacity)
    return (
      <TouchableOpacity onPress={onPress}>
        <View
          style={[flexPropsStyle.flexStyle, style]}
          {...flexPropsStyle.props}>
          {children}
        </View>
      </TouchableOpacity>
    )
  if (onPress || onLongPress)
    return (
      <Pressable
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={onPress}
        onLongPress={onLongPress}
        style={[
          flexPropsStyle.flexStyle,
          style,
          {
            flexDirection: 'row',
            transform: [{ scale }],
          },
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
