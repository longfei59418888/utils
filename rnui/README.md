## @xlong/request

用于请求的封装

#### 安装

```shell
npm install @xlong/rnui
yarn add @xlong/rnui
pnpm add @xlong/rnui
```

#### 使用方法

- 基本用法

```tsx
import { Row, Screen, Background, Span, Img, Column } from '@xlong/rnui'

const SettingItem: FC<{ text: string; onPress?: () => void }> = ({
  text,
  onPress,
}) => {
  return (
    <Screen
      safeAreaEdges={[]}
      barStyle={'dark-content'}
      statusBarProps={{ translucent: true, backgroundColor: 'transparent' }}
      source={require('@/assets/images/setting/bg.png')}>
      <Row flex={1} paddingLeft={625} right={176}>
        <Background
          relative
          top={-10}
          resizeMode={'stretch'}
          height={'110%'}
          widthFull
          paddingTop={76}
          source={require('@/assets/images/setting/content-bg.png')}>
          <SettingItem onPress={() => setExitShow(true)} text={'切换账号'} />
          <Column
            borderRadius={20}
            overflowHidden
            marginTop={66}
            marginHorizontal={100}>
            <Row
              paddingHorizontal={65}
              height={160}
              touchableScale={false}
              onPress={() => setMarkShow(true)}
              backgroundColor={'#ffffff'}
              justifyContentSpaceBetween
              alignItemsCenter>
              <Span
                size={50}
                color={'#000000'}
                fontFamily={MISANS_NORMAL}
                text="清除缓存"
              />
              <Img
                size={80}
                source={require('@/assets/images/setting/arrow.png')}></Img>
            </Row>
            <Row
              paddingHorizontal={65}
              height={160}
              touchableScale={false}
              onPress={() => {}}
              backgroundColor={'#ffffff'}
              justifyContentSpaceBetween
              alignItemsCenter>
              <Span
                size={50}
                color={'#000000'}
                fontFamily={MISANS_NORMAL}
                text="账户和密码修改"></Span>
              <Img
                size={80}
                source={require('@/assets/images/setting/arrow.png')}></Img>
            </Row>
          </Column>
        </Background>
      </Row>
    </Screen>
  )
}
```
