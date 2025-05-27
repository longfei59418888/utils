import {
  useFlexPropsStyle,
  ViewExtendPropsWithPress,
} from '../hooks/useFlexPropsStyle'
import { FC } from 'react'
import { Pressable, TouchableOpacity, View } from 'react-native'

export const Column: FC<ViewExtendPropsWithPress> = (props) => {
  const {
    style,
    onPress,
    touchableOpacity = false,
    onLongPress,
    children,
    ...rest
  } = props
  const flexPropsStyle = useFlexPropsStyle(rest)
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
      <Pressable onPress={onPress} onLongPress={onLongPress}>
        <View
          style={[flexPropsStyle.flexStyle, style]}
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
