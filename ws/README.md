## @xlong/ws 

> 简单的 websocket 工具   
> 继承事件 @xlong/events， 实现了心跳检查   
> 自动重连：关闭重连、错误重连、心跳检查失败重连  

#### 安装
```shell
npm install @xlong/ws 
yarn add @xlong/ws 
pnpm add @xlong/ws 
```

#### 构造函数
- new WS(url: string, option?: WsOption)

#### 方法
- 监听 websocket open 事件：ws.on('open[.openName]',(data)=>{})
- 监听 websocket message 事件：ws.on('message[.messageName]',(data)=>{})
- 监听 websocket close 事件：ws.on('close[.closeName]',({code:number})=>{})
- 监听 websocket error 事件：ws.on('error[.errorName]',({code:number})=>{})
- ws.close(code:number,reason:string) code:默认1000
- ws.socket() 重连
- ws.send(message) 发送消息

#### 属性(继承 websocket 属性)
- option: WsOption
- ws: WebSocket
- queues: []

###### demo
```typescript
import WS from "@xlong/ws";

const client = new WS(url);
client.on("message.test", messageFn);
client.on("open.test", openFn);
client.on("close.test", closeFn);
client.on("error.test", errorFn);

client.send();
client.close();

```

```typescript
import WS from "@xlong/ws";

const client = new WS(url,{
  // 断开后，或者报错后重连间隔时间
  reConnectTime:3000,
  // 自动发送 ping 到服务器
  autoPing:true,
  // 发送ping 的间隔时间
  pingTime:10000,
  // pong 接受的超出时间，不传则不监控
  timeout:5000,
  // 发送给服务端的 ping 文本，可以为函数
  ping:"ping"
});
client.on("message.test", messageFn);
client.on("open.test", openFn);
client.on("close.test", closeFn);
client.on("error.test", errorFn);

client.send();
client.close();

```




#### 类型
```typescript

export interface WsOption {
  protocols?: string | string[];
  reConnectTime?: number;
  /** ping 循环时间 */
  pingTime?: number;
  /** pong 超时时间 */
  timeout?: number;
  autoPing?: boolean;
  /** ping 的数据 */
  ping?: string | Function;
  /** pong 的数据 */
  pong?: string | Function;
  formatData?: (event: MessageEvent) => MessageEvent;
}


```
