import { ViewExtendProps } from '../hooks/useFlexPropsStyle'
import { FC } from 'react'
import {
  ImageProps,
  ImageResizeMode,
  StatusBar,
  StatusBarProps,
  StatusBarStyle,
} from 'react-native'
import { Edge } from 'react-native-safe-area-context'
import { Background, Column } from '../index'
import useSafeAreaInsetsStyle from '../hooks/useSafeAreaInsetsStyle'

export const Screen: FC<
  ViewExtendProps & {
    safeAreaEdges?: Array<Edge>
    barStyle?: null | StatusBarStyle | undefined
    source: ImageProps['source']
    statusBarProps?: StatusBarProps
    resizeMode?: ImageResizeMode
  }
> = ({
  backgroundColor = 'transparent',
  source,
  children,
  statusBarProps,
  style,
  barStyle,
  resizeMode = 'cover',
  safeAreaEdges = ['bottom'],
  ...rest
}) => {
  const safeAreaInsetStyle = useSafeAreaInsetsStyle(safeAreaEdges)
  if (source) {
    return (
      <Background widthFull heightFull resizeMode={resizeMode} source={source}>
        <Column
          widthFull
          heightFull
          backgroundColor={backgroundColor}
          style={[safeAreaInsetStyle, style]}
          {...rest}>
          <StatusBar barStyle={barStyle} {...statusBarProps} />
          {children}
        </Column>
      </Background>
    )
  }
  return (
    <Column
      widthFull
      heightFull
      backgroundColor={backgroundColor}
      style={[safeAreaInsetStyle, style]}
      {...rest}>
      <StatusBar barStyle={barStyle} {...statusBarProps} />
      {children}
    </Column>
  )
}

export default Screen
