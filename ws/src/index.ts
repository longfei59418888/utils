import { WsOption } from './types'
import Events from '@xlong/events'

const defaultOption = {
  pingTime: 8000,
  timeout: 5000,
  reConnectTime: 100,
}

/*
 * const ws = new WS(url,WsOption])
 * ws.on('message[.messageName]',(data)=>{})
 * ws.on('open[.openName]',(data)=>{})
 * ws.on('close[.closeName]',({code:number})=>{})
 * ws.on('error[.errorName]',({code:number})=>{})
 * ws.close(code:number,reason:string) code:默认1000
 * ws.socket() 重连
 * ws.send(message)
 * */

class WS extends Events {
  static CONNECTING = 0
  static OPEN = 1
  static CLOSING = 2
  static CLOSED = 3
  static CLOSED_HEALTH_CODE = 4001
  url: string
  option: WsOption & typeof defaultOption
  ws?: WebSocket
  pingTimer?: NodeJS.Timeout
  autoPingTimer?: NodeJS.Timeout
  PongOutTimer?: NodeJS.Timeout
  queues: Array<string | ArrayBufferLike | Blob | ArrayBufferView> = []
  constructor(url: string, option?: WsOption) {
    super()
    this.url = url
    this.option = { ...defaultOption, ...option }
    this.initEvents()
    this.socket()
  }

  socket() {
    const { url, option } = this
    const { protocols, formatData, pong } = option || {}
    this.ws = new window.WebSocket(url, protocols)
    this.ws.onopen = (...[event]) => this.emit('open', event)
    this.ws.onmessage = (event) => {
      if (formatData) event = formatData(event)
      const message = typeof pong === 'function' ? pong() : pong
      if (pong && event.data === message) this.emit('message.pong', event.data)
      else this.emit('message', event.data)
    }
    this.ws.onclose = (...[event]) => this.emit('close', event)
    this.ws.onerror = (...[event]) => this.emit('error', event)
  }

  private initEvents() {
    const { pong, autoPing, pingTime, reConnectTime, ping } = this.option
    this.on('open.checkQueues', () => this.checkQueues())
    if (autoPing && ping) {
      this.on('open.autoPing', () => {
        if (!pong) {
          this.autoPingTimer && clearInterval(this.autoPingTimer)
          this.autoPingTimer = setInterval(() => {
            this.ping(0)
          }, pingTime)
        } else {
          this.ping()
        }
      })
    }
    if (pong) {
      this.on('message.pong', (data) => {
        const message = typeof pong === 'function' ? pong() : pong
        if (data !== message) return
        this.ping()
      })
    }

    this.on('close.autoPing', () => {
      this.autoPingTimer && clearInterval(this.autoPingTimer)
      this.autoPingTimer = undefined
      this.pingTimer && clearTimeout(this.pingTimer)
      this.pingTimer = undefined
      this.PongOutTimer && clearTimeout(this.PongOutTimer)
      this.PongOutTimer = undefined
    })

    this.on<{ code: number }>('close.reConnect', ({ code }) => {
      if (code !== 1000)
        setTimeout(
          () => {
            this.socket()
          },
          code === WS.CLOSED_HEALTH_CODE ? 0 : reConnectTime,
        )
    })
  }

  private ping(time?: number) {
    const { pingTime, ping, pong, timeout, autoPing } = this.option
    if (!ping) return
    if (this.PongOutTimer) {
      clearTimeout(this.PongOutTimer)
      this.PongOutTimer = undefined
    }
    const message = typeof ping === 'function' ? ping() : ping
    this.pingTimer && clearTimeout(this.pingTimer)
    this.pingTimer = setTimeout(
      () => {
        if (this.readyState === WS.OPEN) {
          this.send(message)
          if (pong) {
            this.PongOutTimer = setTimeout(() => {
              this.close(WS.CLOSED_HEALTH_CODE)
            }, timeout)
          }
        }
      },
      time ?? autoPing ? pingTime : 0,
    )
  }

  send(data: string | ArrayBufferLike | Blob | ArrayBufferView) {
    if (this.readyState === WS.OPEN && this.ws) this.ws.send(data)
    else {
      this.queues.push(data)
    }
  }

  close(code = 1000, reason?: string) {
    this?.ws && this.ws.close(code, reason)
  }

  private checkQueues() {
    let data = this.queues.shift()
    while (data) {
      if (this.readyState === WS.OPEN && this.ws) this.ws.send(data)
      else {
        this.queues.unshift(data)
        break
      }
      data = this.queues.shift()
    }
  }

  get bufferedAmount() {
    return this?.ws?.bufferedAmount
  }

  get readyState() {
    return this?.ws?.readyState
  }

  set binaryType(binaryType: BinaryType) {
    this.ws && (this.ws.binaryType = binaryType)
  }

  get binaryType() {
    return this?.ws?.binaryType as BinaryType
  }

  get extensions() {
    return this?.ws?.extensions
  }

  get protocol() {
    return this?.ws?.protocol
  }

  static getWS(url: string, option?: WsOption) {
    return new WS(url, option)
  }
}

export default WS
