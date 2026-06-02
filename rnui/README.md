# RNUI Components

# 安装

```shell
npm install @xlong/rnui
yarn add @xlong/rnui
pnpm add @xlong/rnui
```

# 使用方法

包含组件：

- `Column`
- `Row`
- `Img`
- `Background`
- `Screen`
- `Span`

## 使用前提

RNUI 内部会对很多数值型布局参数做缩放处理，缩放比例来自 `setDesignWidth(width)`。

建议在应用启动时先初始化一次：

```ts
import { useFlexPropsStyle } from '@xlong/rnui'

useFlexPropsStyle.setDesignWidth(750)
```

如果没有先调用 `setDesignWidth`，内部依赖缩放的方法在运行时会报错。

## 导入方式

```tsx
import {
  Column,
  Row,
  Img,
  Background,
  Screen,
  Span,
  useFlexPropsStyle,
} from '@xlong/rnui'
```

## 共享参数

大多数组件都支持一套统一的布局参数和快捷布尔参数。

### 数值型布局参数

这些参数传数字时会按设计稿宽度缩放：

- `borderBottomWidth`
- `borderEndWidth`
- `borderLeftWidth`
- `borderRightWidth`
- `borderStartWidth`
- `borderTopWidth`
- `borderWidth`
- `bottom`
- `rowGap`
- `gap`
- `columnGap`
- `height`
- `left`
- `margin`
- `marginBottom`
- `marginEnd`
- `marginHorizontal`
- `marginLeft`
- `marginRight`
- `marginStart`
- `marginTop`
- `marginVertical`
- `maxHeight`
- `maxWidth`
- `minHeight`
- `minWidth`
- `padding`
- `paddingBottom`
- `paddingEnd`
- `paddingHorizontal`
- `paddingLeft`
- `paddingRight`
- `paddingStart`
- `paddingTop`
- `right`
- `start`
- `top`
- `width`

示例：

```tsx
<Column paddingHorizontal={24} marginTop={16} width={300} />
```

### 布尔快捷布局参数

这些参数会直接映射成固定样式。

`alignContent`

- `alignContentFlexStart`
- `alignContentFlexEnd`
- `alignContentCenter`
- `alignContentStretch`
- `alignContentSpaceBetween`
- `alignContentSpaceAround`
- `alignContentSpaceEvenly`

`alignItems`

- `alignItemsFlexStart`
- `alignItemsFlexEnd`
- `alignItemsCenter`
- `alignItemsStretch`
- `alignItemsBaseline`

`alignSelf`

- `alignSelfFlexStart`
- `alignSelfFlexEnd`
- `alignSelfCenter`
- `alignSelfStretch`
- `alignSelfBaseline`

`boxSizing`

- `boxSizingBorderBox`
- `boxSizingContentBox`

`direction`

- `directionInherit`
- `directionLtr`
- `directionRtl`

`display`

- `displayNone`
- `displayFlex`
- `displayContents`

`flexDirection`

- `flexDirectionRow`
- `flexDirectionColumn`
- `flexDirectionRowReverse`
- `flexDirectionColumnReverse`

`flexWrap`

- `flexWrap`
- `flexNoWrap`
- `flexWrapReverse`

`isolation`

- `isolationAuto`
- `isolationIsolate`

`justifyContent`

- `justifyContentFlexStart`
- `justifyContentFlexEnd`
- `justifyContentCenter`
- `justifyContentSpaceBetween`
- `justifyContentSpaceAround`
- `justifyContentSpaceEvenly`

`overflow`

- `overflowVisible`
- `overflowHidden`
- `overflowScroll`

`position`

- `absolute`
- `relative`
- `static`

示例：

```tsx
<Row alignItemsCenter justifyContentSpaceBetween />
```

### 扩展参数

这些参数是 RNUI 在原生样式基础上的补充：

- `flex?: true | number`
- `widthFull?: boolean`
- `heightFull?: boolean`
- `center?: boolean`
- `zIndex?: number`
- `borderRadius?: number`
- `borderBottomLeftRadius?: number`
- `borderBottomRightRadius?: number`
- `borderTopLeftRadius?: number`
- `borderTopRightRadius?: number`
- `borderColor?: string`
- `opacity?: number`
- `backgroundColor?: string`

说明：

- `flex={true}` 等价于 `flex: 1`
- `widthFull` 等价于 `width: '100%'`
- `heightFull` 等价于 `height: '100%'`
- `center` 会同时设置横向和纵向居中

示例：

```tsx
<Column flex backgroundColor="#fff" center />
```

### 点击参数

支持点击的组件还会额外支持：

- `onPress`
- `onLongPress`
- `touchableOpacity?: boolean`
- `touchableScale?: boolean`

默认行为：

- `touchableOpacity` 默认 `false`
- `touchableScale` 默认 `true`
- 按下时会通过 `Pressable` 的 `style` 产生视觉反馈

示例：

```tsx
<Row onPress={handlePress} touchableOpacity touchableScale={false} />
```

## Column

### 作用

竖向容器组件，适合做页面分块、卡片内容区、表单区域、弹窗内容区。

### 支持的参数

- 所有共享布局参数
- 所有扩展参数
- 所有点击参数
- 原生 `ViewProps`

### 行为说明

- 默认按纵向排列子元素
- 传入 `onPress` 或 `onLongPress` 后，会自动变成可点击容器
- 点击态支持缩放和透明度反馈

### 常见示例

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

## Row

### 作用

横向容器组件，适合做列表项、头部栏、按钮组、左右结构布局。

### 支持的参数

- 所有共享布局参数
- 所有扩展参数
- 所有点击参数
- 原生 `ViewProps`

### 行为说明

- 自动带 `flexDirection: 'row'`
- 传入 `onPress` 或 `onLongPress` 后，会自动变成可点击行容器
- 点击态支持缩放和透明度反馈

### 常见示例

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
  <Img size={48} source={avatar} />
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

## Img

### 作用

图片组件，适合展示图标、头像、封面图、可点击图片。

### 支持的参数

- 所有共享布局参数
- 所有点击参数
- 原生 `ImageProps`
- 自定义 `size` 参数

### 专有参数

- `source`
- `size?: number | \`\${number}%\``
- `resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center'`
- `style?: ImageStyle`

### 行为说明

- `size` 会同时设置宽高
- `size` 为数字时会参与缩放
- `resizeMode` 默认是 `contain`
- 传入 `onPress` 时会启用点击态反馈

### 常见示例

普通图标：

```tsx
<Img size={24} source={iconSearch} />
```

头像：

```tsx
<Img
  size={72}
  source={{ uri: user.avatar }}
  resizeMode="cover"
  borderRadius={36}
/>
```

横幅图：

```tsx
<Img
  widthFull
  height={180}
  source={bannerImage}
  resizeMode="cover"
  borderRadius={16}
/>
```

可点击图片：

```tsx
<Img size={88} source={cover} onPress={handlePreview} touchableOpacity />
```

百分比尺寸：

```tsx
<Img size="100%" source={poster} resizeMode="contain" />
```

## Background

### 作用

背景图容器组件，适合做页面背景、卡片背景、活动会场背景。

### 支持的参数

- 所有共享布局参数
- 所有扩展参数
- 原生 `ImageBackgroundProps`

### 行为说明

- 本质上是 `ImageBackground`
- 支持内部继续嵌套 `children`
- 常与 `Column`、`Row`、`Screen` 组合使用

### 常见示例

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

## Screen

### 作用

页面级容器组件，负责处理全屏尺寸、安全区、状态栏和可选背景图。

### 支持的参数

- 所有共享布局参数
- 所有扩展参数
- 原生 `ViewProps`
- 页面相关专有参数

### 专有参数

- `safeAreaEdges?: Array<Edge>`
- `barStyle?: StatusBarStyle | null`
- `source?: ImageProps['source']`
- `statusBarProps?: StatusBarProps`
- `resizeMode?: ImageResizeMode`

### 行为说明

- 默认 `backgroundColor` 为 `transparent`
- 默认内部容器带 `widthFull` 和 `heightFull`
- 默认 `safeAreaEdges` 为 `['bottom']`
- 传入 `source` 时，会自动使用背景图模式
- 内部始终会渲染 `StatusBar`

### 常见示例

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

## Span

### 作用

文本组件，适合做标题、正文、说明文案、按钮文字、标签文字。

### 支持的参数

- 原生 `TextProps`
- `text?: string`
- `fontFamily?: string`
- `style?: StyleProp<TextStyle>`
- `color?: string`
- `lineHeight?: number`
- `size?: number`
- `children?: ReactNode`
- `textAlignLeft?: boolean`
- `textAlignCenter?: boolean`
- `textAlignJustify?: boolean`
- `textAlignRight?: boolean`
- 以及大部分共享布局参数

### 行为说明

- 默认 `size = 16`
- 默认行高按 `size * 1.5` 计算
- 如果显式传 `lineHeight`，会覆盖默认行高
- `text` 和 `children` 同时存在时，优先使用 `text`
- 对齐参数按以下优先级生效：
  - `textAlignCenter`
  - `textAlignJustify`
  - `textAlignRight`
  - `textAlignLeft`

### 常见示例

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

带字重和字体：

```tsx
<Span text="价格" size={22} color="#ff4d4f" fontFamily="DIN-Bold" />
```

限制行数：

```tsx
<Span text={longText} numberOfLines={2} ellipsizeMode="tail" color="#666" />
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

- 先调用 `setDesignWidth` 再使用组件
- 数字型布局参数通常会参与缩放
- `Img` 目前只有 `onPress` 会触发点击包装
- `Span` 默认会把 `height` 设为与行高一致，多行文本场景建议显式验证效果
