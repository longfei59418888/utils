## @xlong/events

>   
> 基础的事件模型

#### 安装
```shell
npm install @xlong/events 
yarn add @xlong/events 
pnpm add @xlong/events 
```

#### 方法
- on<D>(eventName: string, listener: Listener<D>): void
- once(eventName: string, listener: Listener): void
- emit(eventName: string, ...args: unknown[]) : void
- off(eventName: string): void

#### 属性
- listeners: Listeners

###### demo
```typescript
// 全局 events
import { events } from '@xlong/events';

events.on('click', ()=>console.log('click'));
events.on('click.top', (params)=>console.log('click.top'+params));

events.emit('click','test'); // console.log: click and click.toptest
events.emit('click.top','test'); // console.log: click.toptest

```

```typescript
import Events from 'xl_events';

// 创建一个实例
const events =  new Events()

events.on('click', ()=>console.log('click'));
// 替换前面的事件
events.on('click', ()=>console.log('click2'));

events.emit('click','test'); // console.log: click2 and click.toptest

```

#### 类型
```typescript

export interface Listener<D = unknown> {
  (...params: D[]): unknown;
}

export interface Handle {
  handle: Listener;
  once: boolean;
  eventName: string;
}

export type Listeners = Record<string, Record<string, Handle>>;

```
