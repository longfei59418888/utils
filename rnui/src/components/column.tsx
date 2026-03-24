import {
  useFlexPropsStyle,
  ViewExtendPropsWithPress,
} from '../hooks/useFlexPropsStyle'
import { FC, useState } from 'react'
import { Pressable, TouchableOpacity, View } from 'react-native'

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
        onLongPress={onLongPress}>
        <View
          style={[flexPropsStyle.flexStyle, style, { transform: [{ scale }] }]}
          {...flexPropsStyle.props}>
          {children}
        </View>
      </Pressable>
    )
  return (
    <View style={[flexPropsStyle.flexStyle, style]} {...flexPropsStyle.props}>
      {children}
    </View>
  )
}

export default Column
