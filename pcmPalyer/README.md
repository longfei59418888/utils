## @xlong/player

流播放器(PCM音频播放)

#### 安装

```shell
npm install @xlong/player 
yarn add @xlong/player 
pnpm add @xlong/player 
```

#### 使用方法

- 基本用法

```typescript
import { PCMPlayer } from '@xlong/player'
import WS from '@xlong/ws'


const player = new PCMPlayer({
  encoding: '16bitInt',
  channels: 1,
  sampleRate: 16000,
  flushingTime: 2000,
  requestFrame: (data) => {
    console.log(data.audioCtx,data.startTime)
  },
})

const ws = new WS(GLOBAL_CONFIG.API_STREAM)
ws.current?.on('message', async (data) => {
  console.log(data)
  if (typeof data === 'string') onSignal(data)
  else {
    const arrayBuffer = await data.arrayBuffer()
    player.current?.feed(new Uint8Array(arrayBuffer))
  }
})

```

#### 方法

- feed: (data:Uint8Array | Uint16Array | Uint32Array) => void
- volume: (volume: number) => void
- destroy: () => void

#### 属性

- startTime: 音频结束时间
- audioCtx: 音频上下文 AudioContext
