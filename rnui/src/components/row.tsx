import {
  useFlexPropsStyle,
  ViewExtendPropsWithPress,
} from '../hooks/useFlexPropsStyle'
import { FC } from 'react'
import { Pressable, TouchableOpacity, View } from 'react-native'

export const Row: FC<ViewExtendPropsWithPress> = ({
  style,
  children,
  touchableOpacity = false,
  onPress,
  onLongPress,
  ...props
}) => {
  const flexPropsStyle = useFlexPropsStyle(props)
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
        onPress={onPress}
        onLongPress={onLongPress}
        style={[
          flexPropsStyle.flexStyle,
          style,
          {
            flexDirection: 'row',
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
