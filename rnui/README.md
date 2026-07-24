# RNUI Components

一套基于设计稿宽度自动缩放的 React Native 响应式组件库。通过 `setDesignWidth` 设定设计稿宽度，组件的数值型布局参数会按当前屏幕宽度自动等比缩放，并且随屏幕旋转 / 折叠屏 / 分屏实时更新。

## 目录

- [安装](#安装)
- [快速上手](#快速上手)
- [使用前提：setDesignWidth](#使用前提setdesignwidth)
- [导入方式](#导入方式)
- [共享参数](#共享参数)
  - [数值型布局参数](#数值型布局参数)
  - [布尔快捷布局参数](#布尔快捷布局参数)
  - [扩展参数](#扩展参数)
  - [点击参数](#点击参数)
- [组件](#组件)
  - [Column](#column)
  - [Row](#row)
  - [Img](#img)
  - [Background](#background)
  - [Screen](#screen)
  - [Span](#span)
- [Hooks 与工具函数](#hooks-与工具函数)
  - [setDesignWidth](#setdesignwidthwidth-number)
  - [useScale](#usescale-number)
  - [getScale](#getscale-number)
  - [scale](#scalevalue-number-number)
  - [scaleStyle](#scalestylestyle-attrs)
  - [useFlexPropsStyle](#useflexpropsstyleprops)
  - [useSafeAreaInsetsStyle](#usesafeareainsetsstyleedges-property)
- [组合示例](#组合示例)
- [注意事项](#注意事项)

## 安装

```shell
npm install @xlong/rnui
# 或
yarn add @xlong/rnui
# 或
pnpm add @xlong/rnui
```

### peerDependencies

需要宿主项目自行安装以下依赖：

```jsonc
{
  "react": ">=18.2.0",
  "react-native": ">=0.74.5",
  "react-native-safe-area-context": ">=4.10.5"
}
```

`Screen` / `useSafeAreaInsetsStyle` 依赖安全区，请确保应用根节点已包裹 `SafeAreaProvider`：

```tsx
import { SafeAreaProvider } from 'react-native-safe-area-context'

export default function App() {
  return (
    <SafeAreaProvider>
      <RootNavigator />
    </SafeAreaProvider>
  )
}
```

## 快速上手

```tsx
import { setDesignWidth, Screen, Column, Row, Span, Img } from '@xlong/rnui'

// 1. 应用启动时初始化一次设计稿宽度（例如设计稿基于 750）
setDesignWidth(750)

// 2. 直接使用组件，数值型参数会按屏幕宽度自动缩放
export default function Home() {
  return (
    <Screen backgroundColor="#f5f5f5" safeAreaEdges={['top', 'bottom']}>
      <Column flex padding={24} gap={16}>
        <Span text="欢迎使用 RNUI" size={28} color="#111" />
        <Row alignItemsCenter justifyContentSpaceBetween>
          <Span text="今日推荐" size={16} />
          <Img size={20} source={require('./assets/arrow.png')} />
        </Row>
      </Column>
    </Screen>
  )
}
```

## 使用前提：setDesignWidth

RNUI 会对数值型布局参数做缩放处理，缩放比例 = `当前 window 宽度 / 设计稿宽度`。

请在应用启动时（组件渲染之前）初始化一次：

```ts
import { setDesignWidth } from '@xlong/rnui'

setDesignWidth(750) // 传入设计稿宽度
```

> ⚠️ 如果没有先调用 `setDesignWidth`，所有依赖缩放的方法（`useScale` / `getScale` / `scale` / `useFlexPropsStyle` 以及各组件）在运行时会抛出错误：
> `@xlong/rnui: please call setDesignWidth(width) before rendering.`

**响应式说明**：缩放基于 `useWindowDimensions`，屏幕旋转、折叠屏展开、分屏尺寸变化时，组件尺寸会自动重新计算并重渲染，无需手动处理。

## 导入方式

所有组件、Hooks 和工具函数均从包根部平铺导出，可直接按需引入：

```tsx
import {
  // 组件
  Column,
  Row,
  Img,
  Background,
  Screen,
  Span,
  // Hooks 与工具函数
  setDesignWidth,
  useScale,
  getScale,
  scale,
  scaleStyle,
  useFlexPropsStyle,
  useSafeAreaInsetsStyle,
} from '@xlong/rnui'
```

## 共享参数

大多数组件都支持一套统一的布局参数和快捷布尔参数。

### 数值型布局参数

这些参数传数字时会按设计稿宽度缩放：

`borderBottomWidth`、`borderEndWidth`、`borderLeftWidth`、`borderRightWidth`、`borderStartWidth`、`borderTopWidth`、`borderWidth`、`bottom`、`rowGap`、`gap`、`columnGap`、`height`、`left`、`margin`、`marginBottom`、`marginEnd`、`marginHorizontal`、`marginLeft`、`marginRight`、`marginStart`、`marginTop`、`marginVertical`、`maxHeight`、`maxWidth`、`minHeight`、`minWidth`、`padding`、`paddingBottom`、`paddingEnd`、`paddingHorizontal`、`paddingLeft`、`paddingRight`、`paddingStart`、`paddingTop`、`right`、`start`、`top`、`width`

示例：

```tsx
<Column paddingHorizontal={24} marginTop={16} width={300} />
```

> 完整列表也可通过导出的 `viewProps` 常量在代码中获取。

### 布尔快捷布局参数

这些参数会直接映射成固定样式（传 `true` 生效）。

| 分组 | 可用参数 |
| --- | --- |
| `alignContent` | `alignContentFlexStart`、`alignContentFlexEnd`、`alignContentCenter`、`alignContentStretch`、`alignContentSpaceBetween`、`alignContentSpaceAround`、`alignContentSpaceEvenly` |
| `alignItems` | `alignItemsFlexStart`、`alignItemsFlexEnd`、`alignItemsCenter`、`alignItemsStretch`、`alignItemsBaseline` |
| `alignSelf` | `alignSelfFlexStart`、`alignSelfFlexEnd`、`alignSelfCenter`、`alignSelfStretch`、`alignSelfBaseline` |
| `boxSizing` | `boxSizingBorderBox`、`boxSizingContentBox` |
| `direction` | `directionInherit`、`directionLtr`、`directionRtl` |
| `display` | `displayNone`、`displayFlex`、`displayContents` |
| `flexDirection` | `flexDirectionRow`、`flexDirectionColumn`、`flexDirectionRowReverse`、`flexDirectionColumnReverse` |
| `flexWrap` | `flexWrap`、`flexNoWrap`、`flexWrapReverse` |
| `isolation` | `isolationAuto`、`isolationIsolate` |
| `justifyContent` | `justifyContentFlexStart`、`justifyContentFlexEnd`、`justifyContentCenter`、`justifyContentSpaceBetween`、`justifyContentSpaceAround`、`justifyContentSpaceEvenly` |
| `overflow` | `overflowVisible`、`overflowHidden`、`overflowScroll` |
| `position` | `absolute`、`relative`、`static` |

示例：

```tsx
<Row alignItemsCenter justifyContentSpaceBetween />
```

> 完整映射也可通过导出的 `viewPropsBooleans` 常量在代码中获取。

### 扩展参数

这些参数是 RNUI 在原生样式基础上的补充：

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `flex` | `true \| number` | `flex={true}` 等价于 `flex: 1` |
| `widthFull` | `boolean` | 等价于 `width: '100%'` |
| `heightFull` | `boolean` | 等价于 `height: '100%'` |
| `center` | `boolean` | 同时设置横向和纵向居中 |
| `zIndex` | `number` | 层级 |
| `borderRadius` | `number` | 圆角 |
| `borderBottomLeftRadius` | `number` | 左下圆角 |
| `borderBottomRightRadius` | `number` | 右下圆角 |
| `borderTopLeftRadius` | `number` | 左上圆角 |
| `borderTopRightRadius` | `number` | 右上圆角 |
| `borderColor` | `string` | 边框颜色 |
| `opacity` | `number` | 透明度 |
| `backgroundColor` | `string` | 背景色 |

> 注意：`borderRadius` 等扩展参数不参与缩放，直接透传原值。

示例：

```tsx
<Column flex backgroundColor="#fff" center />
```

### 点击参数

支持点击的组件（`Column` / `Row` / `Img`）额外支持：

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `onPress` | `() => void` | — | 点击回调 |
| `onLongPress` | `() => void` | — | 长按回调 |
| `touchableOpacity` | `boolean` | `false` | 按下时降低透明度 |
| `touchableScale` | `boolean` | `true` | 按下时缩放反馈 |

- 传入 `onPress` 或 `onLongPress` 后，容器会自动切换为 `Pressable` 并带有 `accessibilityRole`。
- 按下反馈通过 `Pressable` 的 `style` 实现（缩放至 0.9 / 透明度 0.2）。

示例：

```tsx
<Row onPress={handlePress} touchableOpacity touchableScale={false} />
```

## 组件

### Column

**作用**：竖向容器组件，适合做页面分块、卡片内容区、表单区域、弹窗内容区。

**支持的参数**：所有共享布局参数 + 扩展参数 + 点击参数 + 原生 `ViewProps`。

**行为说明**：

- 默认按纵向排列子元素（`View` 默认 `flexDirection: 'column'`）。
- 传入 `onPress` 或 `onLongPress` 后，自动变成可点击容器。

基础纵向布局：

```tsx
<Column paddingHorizontal={24} paddingTop={32} gap={16}>
  <Span text="标题" size={28} />
  <Span text="描述文案" color="#666" />
</Column>
```

卡片容器：

```tsx
<Column
  backgroundColor="#fff"
  borderRadius={20}
  padding={24}
  marginHorizontal={20}>
  <Span text="卡片标题" size={18} />
  <Span text="卡片内容" color="#999" marginTop={12} />
</Column>
```

可点击菜单项：

```tsx
<Column
  onPress={handlePress}
  touchableOpacity
  backgroundColor="#fff"
  borderRadius={16}
  padding={20}>
  <Span text="点击进入" />
</Column>
```

内容居中：

```tsx
<Column flex center backgroundColor="#f7f7f7">
  <Span text="空状态" color="#999" />
</Column>
```

### Row

**作用**：横向容器组件，适合做列表项、头部栏、按钮组、左右结构布局。

**支持的参数**：所有共享布局参数 + 扩展参数 + 点击参数 + 原生 `ViewProps`。

**行为说明**：

- 默认带 `flexDirection: 'row'`，作为默认值可被布尔参数（如 `flexDirectionColumn`）或 `style` 覆盖。
- 传入 `onPress` 或 `onLongPress` 后，自动变成可点击行容器。

左右分布：

```tsx
<Row
  alignItemsCenter
  justifyContentSpaceBetween
  paddingHorizontal={24}
  height={88}>
  <Span text="设置" />
  <Img size={24} source={iconArrow} />
</Row>
```

头像信息行：

```tsx
<Row alignItemsCenter paddingHorizontal={20} paddingVertical={16}>
  <Img size={48} source={avatar} borderRadius={24} />
  <Column marginLeft={12}>
    <Span text="张三" size={16} />
    <Span text="在线" size={12} color="#10b981" marginTop={4} />
  </Column>
</Row>
```

按钮组：

```tsx
<Row justifyContentSpaceBetween gap={12}>
  <Column flex center height={44} borderRadius={12} backgroundColor="#eee">
    <Span text="取消" />
  </Column>
  <Column flex center height={44} borderRadius={12} backgroundColor="#111">
    <Span text="确认" color="#fff" />
  </Column>
</Row>
```

可点击列表项：

```tsx
<Row
  onPress={handleDetail}
  touchableOpacity
  alignItemsCenter
  justifyContentSpaceBetween
  paddingHorizontal={20}
  paddingVertical={18}
  backgroundColor="#fff">
  <Span text="账户安全" />
  <Img size={20} source={iconArrow} />
</Row>
```

### Img

**作用**：图片组件，适合展示图标、头像、封面图、可点击图片。

**支持的参数**：所有共享布局参数 + 点击参数 + 原生 `ImageProps`。

**专有参数**：

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `source` | `ImageSourcePropType` | — | 图片源 |
| `size` | `number \| \`${number}%\`` | — | 同时设置宽高；数字时参与缩放 |
| `resizeMode` | `'cover' \| 'contain' \| 'stretch' \| 'repeat' \| 'center'` | `'contain'` | 缩放模式 |
| `style` | `StyleProp<ImageStyle>` | — | 外层样式 |
| `imageStyle` | `ImageStyle` | — | 可点击模式下作用于内层图片的样式 |

**行为说明**：

- `size` 会同时设置宽高，数字类型参与缩放，百分比字符串直接透传。
- 传入 `onPress` 时会用 `Pressable` 包裹并启用点击态反馈。

普通图标：

```tsx
<Img size={24} source={iconSearch} />
```

头像：

```tsx
<Img size={72} source={{ uri: user.avatar }} resizeMode="cover" borderRadius={36} />
```

横幅图：

```tsx
<Img widthFull height={180} source={bannerImage} resizeMode="cover" borderRadius={16} />
```

可点击图片：

```tsx
<Img size={88} source={cover} onPress={handlePreview} touchableOpacity />
```

百分比尺寸：

```tsx
<Img size="100%" source={poster} resizeMode="contain" />
```

### Background

**作用**：背景图容器组件，适合做页面背景、卡片背景、活动会场背景。

**支持的参数**：所有共享布局参数 + 扩展参数 + 原生 `ImageBackgroundProps`。

**行为说明**：

- 本质上是 `ImageBackground`，支持内部继续嵌套 `children`。
- 常与 `Column`、`Row`、`Screen` 组合使用。
- 不支持点击参数，如需点击请在内部嵌套可点击的 `Column` / `Row`。

整页背景：

```tsx
<Background
  widthFull
  heightFull
  source={require('./bg.png')}
  resizeMode="cover">
  <Column flex>{children}</Column>
</Background>
```

带内容的卡片背景：

```tsx
<Background
  source={require('./card-bg.png')}
  resizeMode="stretch"
  borderRadius={20}
  overflowHidden
  padding={24}>
  <Span text="会员中心" color="#fff" size={20} />
</Background>
```

头图容器：

```tsx
<Background widthFull height={220} source={headerBg} resizeMode="cover">
  <Row paddingHorizontal={20} paddingTop={48} justifyContentSpaceBetween>
    <Span text="首页" color="#fff" size={24} />
  </Row>
</Background>
```

### Screen

**作用**：页面级容器组件，负责处理全屏尺寸、安全区、状态栏和可选背景图。

**支持的参数**：所有共享布局参数 + 扩展参数 + 原生 `ViewProps` + 以下专有参数。

**专有参数**：

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `safeAreaEdges` | `Array<Edge>` | `['bottom']` | 需要留出安全区的边 |
| `barStyle` | `StatusBarStyle \| null` | — | 状态栏文字样式 |
| `source` | `ImageProps['source']` | — | 传入后启用背景图模式 |
| `statusBarProps` | `StatusBarProps` | — | 透传给 `StatusBar` |
| `resizeMode` | `ImageResizeMode` | `'cover'` | 背景图缩放模式 |
| `backgroundColor` | `string` | `'transparent'` | 内容容器背景色 |

**行为说明**：

- 内部容器默认带 `widthFull` 和 `heightFull`。
- 传入 `source` 时自动使用背景图模式（外层 `Background` + 内层 `Column`）。
- 内部始终渲染一个 `StatusBar`。

基础页面：

```tsx
<Screen backgroundColor="#f5f5f5">
  <Column flex padding={20}>
    <Span text="首页" size={24} />
  </Column>
</Screen>
```

处理顶部和底部安全区：

```tsx
<Screen
  backgroundColor="#fff"
  safeAreaEdges={['top', 'bottom']}
  barStyle="dark-content">
  {children}
</Screen>
```

透明状态栏：

```tsx
<Screen
  safeAreaEdges={[]}
  barStyle="light-content"
  statusBarProps={{
    translucent: true,
    backgroundColor: 'transparent',
  }}>
  {children}
</Screen>
```

带背景图页面：

```tsx
<Screen
  source={require('./bg.png')}
  resizeMode="cover"
  backgroundColor="rgba(0,0,0,0.15)">
  <Column flex paddingTop={40}>
    <Span text="活动会场" color="#fff" size={28} />
  </Column>
</Screen>
```

登录页：

```tsx
<Screen source={loginBg} resizeMode="cover" safeAreaEdges={['top', 'bottom']}>
  <Column flex justifyContentSpaceBetween padding={24}>
    <Span text="欢迎回来" size={32} color="#fff" />
    <Column backgroundColor="#fff" borderRadius={24} padding={24}>
      <Span text="手机号登录" size={20} />
    </Column>
  </Column>
</Screen>
```

### Span

**作用**：文本组件，适合做标题、正文、说明文案、按钮文字、标签文字。

**支持的参数**：原生 `TextProps` + 大部分共享布局参数 + 以下专有参数。

**专有参数**：

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `text` | `string` | — | 文本内容（优先于 `children`） |
| `children` | `ReactNode` | — | 文本内容 |
| `size` | `number` | `16` | 字号，参与缩放 |
| `color` | `string` | — | 文字颜色 |
| `lineHeight` | `number` | `size * 1.5` | 行高，参与缩放 |
| `fontFamily` | `string` | — | 字体 |
| `textAlignLeft` | `boolean` | — | 左对齐 |
| `textAlignCenter` | `boolean` | — | 居中对齐 |
| `textAlignRight` | `boolean` | — | 右对齐 |
| `textAlignJustify` | `boolean` | — | 两端对齐 |
| `style` | `StyleProp<TextStyle>` | — | 自定义样式 |

**行为说明**：

- `text` 和 `children` 同时存在时，优先使用 `text`。
- 对齐优先级：`textAlignCenter` > `textAlignJustify` > `textAlignRight` > `textAlignLeft`。
- 默认会把 `height` 设为与行高一致（`size * 1.5`）。**多行文本请显式传 `lineHeight` 或用 `style` 覆盖 `height`**，否则可能被裁切。

基础文本：

```tsx
<Span text="这是正文内容" />
```

标题：

```tsx
<Span text="欢迎使用 RNUI" size={28} color="#111" />
```

说明文案：

```tsx
<Span
  text="登录即表示你已阅读并同意相关协议"
  size={12}
  color="#999"
  lineHeight={18}
/>
```

居中文本：

```tsx
<Span text="暂无数据" textAlignCenter color="#999" marginTop={24} />
```

使用 children：

```tsx
<Span size={18} color="#222">
  自定义文本内容
</Span>
```

带字体：

```tsx
<Span text="价格" size={22} color="#ff4d4f" fontFamily="DIN-Bold" />
```

限制行数（多行文本记得覆盖固定高度）：

```tsx
<Span
  text={longText}
  numberOfLines={2}
  ellipsizeMode="tail"
  color="#666"
  style={{ height: 'auto' }}
/>
```

## Hooks 与工具函数

除组件外，RNUI 还导出了一组缩放相关的 Hooks 和工具函数，可用于自定义组件或手动计算尺寸。

### `setDesignWidth(width: number)`

设置设计稿宽度，应在应用启动时调用一次。

```ts
import { setDesignWidth } from '@xlong/rnui'

setDesignWidth(750)
```

### `useScale(): number`

**响应式** Hook，返回当前缩放比（`window 宽度 / 设计稿宽度`），随屏幕尺寸变化自动更新。只能在组件 / 自定义 Hook 中调用。

```tsx
import { useScale } from '@xlong/rnui'

function Custom() {
  const scale = useScale()
  return <View style={{ width: 100 * scale }} />
}
```

### `getScale(): number`

命令式读取当前缩放比，返回调用时刻的值（**不响应**后续屏幕变化）。可在组件外任意位置调用。

```ts
import { getScale } from '@xlong/rnui'

const px = 100 * getScale()
```

### `scale(value: number): number`

把设计稿数值转换为缩放后的像素值（内部使用 `getScale` + 像素对齐）。

```ts
import { scale } from '@xlong/rnui'

const styles = StyleSheet.create({
  box: { width: scale(100), height: scale(48) },
})
```

### `scaleStyle(style, attrs?)`

对一个样式对象里的数值型属性批量缩放，返回**新对象**（不修改入参）。默认缩放 `viewProps` 中的属性和 `fontSize`，可通过 `attrs` 追加需要缩放的键名。

```ts
import { scaleStyle } from '@xlong/rnui'

const scaled = scaleStyle({ width: 100, padding: 12, fontSize: 16 })
// 追加自定义键
const scaled2 = scaleStyle({ width: 100, customSize: 20 }, ['customSize'])
```

### `useFlexPropsStyle(props)`

组件内部使用的核心 Hook：把 RNUI 的扩展 props 拆分成 `flexStyle`（缩放后的样式）和 `props`（其余透传属性）。用于自定义封装组件。

```tsx
import { useFlexPropsStyle, ViewExtendProps } from '@xlong/rnui'
import { View } from 'react-native'

function MyBox(props: ViewExtendProps) {
  const { flexStyle, props: rest } = useFlexPropsStyle(props)
  return <View style={flexStyle} {...rest} />
}
```

### `useSafeAreaInsetsStyle(edges?, property?)`

返回指定边的安全区内边距样式。`edges` 默认 `['top', 'right', 'bottom', 'left']`，`property` 默认 `'padding'`（可选 `'margin'`）。

```tsx
import { useSafeAreaInsetsStyle } from '@xlong/rnui'
import { View } from 'react-native'

function Footer() {
  const insetStyle = useSafeAreaInsetsStyle(['bottom'], 'padding')
  // => { paddingBottom: number }
  return <View style={insetStyle} />
}
```

## 组合示例

### 设置页列表

```tsx
<Screen backgroundColor="#f3f4f6" safeAreaEdges={['top', 'bottom']}>
  <Column padding={20} gap={12}>
    <Row
      onPress={handleAccount}
      touchableOpacity
      backgroundColor="#fff"
      borderRadius={16}
      paddingHorizontal={20}
      height={56}
      alignItemsCenter
      justifyContentSpaceBetween>
      <Span text="账户与安全" />
      <Img size={18} source={iconArrow} />
    </Row>

    <Row
      onPress={handleCache}
      touchableOpacity
      backgroundColor="#fff"
      borderRadius={16}
      paddingHorizontal={20}
      height={56}
      alignItemsCenter
      justifyContentSpaceBetween>
      <Span text="清除缓存" />
      <Span text="32MB" color="#999" />
    </Row>
  </Column>
</Screen>
```

### 个人信息卡片

```tsx
<Background
  source={profileBg}
  resizeMode="cover"
  borderRadius={24}
  overflowHidden
  margin={20}
  padding={24}>
  <Row alignItemsCenter>
    <Img size={64} source={avatar} borderRadius={32} />
    <Column marginLeft={16}>
      <Span text="小龙" size={22} color="#fff" />
      <Span
        text="普通会员"
        size={12}
        color="rgba(255,255,255,0.8)"
        marginTop={6}
      />
    </Column>
  </Row>
</Background>
```

### 商品卡片

```tsx
<Column
  width={168}
  backgroundColor="#fff"
  borderRadius={16}
  overflowHidden
  onPress={handleGoods}
  touchableOpacity>
  <Img widthFull height={168} source={goodsCover} resizeMode="cover" />
  <Column padding={12}>
    <Span text="商品名称" numberOfLines={2} lineHeight={20} />
    <Row alignItemsFlexEnd marginTop={8}>
      <Span text="¥199" size={20} color="#ef4444" />
      <Span text="¥299" size={12} color="#999" marginLeft={8} />
    </Row>
  </Column>
</Column>
```

## 注意事项

- **务必先调用 `setDesignWidth`** 再渲染任何组件，否则会抛错。
- 数值型布局参数（见上表）和 `Span` 的 `size` / `lineHeight`、`Img` 的数字 `size` 会参与缩放；`borderRadius` 等扩展参数不参与缩放。
- 缩放基于 `window` 宽度且响应式更新，支持屏幕旋转 / 折叠屏 / 分屏。
- `useScale` / `useFlexPropsStyle` / `useSafeAreaInsetsStyle` 是 Hook，只能在组件或自定义 Hook 中调用；组件外请用 `getScale` / `scale`。
- `Img` 只有 `onPress` 会触发点击包装（`onLongPress` 不会单独启用）。
- `Background` 不支持点击参数，如需点击请在内部嵌套 `Column` / `Row`。
- `Span` 默认会把 `height` 设为与行高一致，多行文本场景请显式覆盖高度。
