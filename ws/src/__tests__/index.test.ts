import WS from '../index'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
type MockWebsocket = typeof window.Websocket
let websocket: MockWebsocket = {}
const server = {
  open: () => {
    websocket.readyState = WS.OPEN
    websocket.onopen()
  },
  message: (message: string) => {
    websocket.onmessage({ data: message })
  },
  error: () => {
    websocket.onerror()
  },
  close: (code: number) => {
    websocket.readyState = WS.CLOSED
    websocket.onclose({ code })
  },
}
describe('utils/ws', () => {
  const url = 'ws://localhost:1234'
  const sendFn = jest.fn()
  jest.useFakeTimers()
  beforeEach(() => {
    jest.clearAllMocks()
    sendFn.mockRestore()
    const mockSocket = {
      send: sendFn,
      binaryType: 'arraybuffer',
      extensions: 'extensions',
      bufferedAmount: 1000,
      close: function (code: number) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this?.onclose({ code })
      },
    }
    Object.defineProperty(globalThis, 'window', {
      value: {
        WebSocket: function (url: string, protocol: string) {
          websocket = mockSocket
          websocket.readyState = WS.CONNECTING
          websocket.protocol = protocol
          websocket.url = url
          return websocket
        },
      },
      writable: true,
    })
  })
  it('utils/ws WS open/close/error/message', async () => {
    const messageFn = jest.fn()
    const openFn = jest.fn()
    const closeFn = jest.fn()
    const errorFn = jest.fn()
    const client = new WS(url)
    client.on('message.test', messageFn)
    client.on('open.test', openFn)
    client.on('close.test', closeFn)
    client.on('error.test', errorFn)
    expect(client.readyState).toEqual(WS.CONNECTING)
    server.open()
    expect(client.url).toEqual(url)
    expect(client.readyState).toEqual(WS.OPEN)
    expect(openFn).toBeCalledTimes(1)
    expect(messageFn).toBeCalledTimes(0)
    expect(closeFn).toBeCalledTimes(0)
    expect(errorFn).toBeCalledTimes(0)
    client.send(`{ "type": "GREETING", "payload": "hello" }`)
    expect(sendFn).toBeCalledWith(`{ "type": "GREETING", "payload": "hello" }`)
    server.message(`{ "type": "GREETING", "payload": "return" }`)
    expect(messageFn).toBeCalledWith(
      `{ "type": "GREETING", "payload": "return" }`,
    )
    server.error()
    expect(errorFn).toBeCalledTimes(1)
    server.close(1002)
    expect(closeFn).toBeCalledWith({ code: 1002 })
    server.close(1000)
  })

  it('utils/ws WS close/reConnect', async () => {
    const openFn = jest.fn()
    const closeFn = jest.fn()
    const client = new WS(url)
    client.on('open.test', openFn)
    client.on('close.test', closeFn)
    server.open()
    server.close(1002)
    expect(client.readyState).toEqual(WS.CLOSED)
    expect(client.autoPingTimer).toBeUndefined()
    expect(client.pingTimer).toBeUndefined()
    expect(client.PongOutTimer).toBeUndefined()
    await jest.advanceTimersByTimeAsync(101)
    expect(client.readyState).toEqual(WS.CONNECTING)
    server.open()
    expect(openFn).toBeCalledTimes(2)
    expect(closeFn).toBeCalledTimes(1)
    expect(client.readyState).toEqual(WS.OPEN)
    server.close(1000)
    await jest.advanceTimersByTimeAsync(10000)
    expect(client.readyState).toEqual(WS.CLOSED)
    expect(client.autoPingTimer).toBeUndefined()
    expect(client.pingTimer).toBeUndefined()
    expect(client.PongOutTimer).toBeUndefined()
    client.socket()
    expect(client.readyState).toEqual(WS.CONNECTING)
    server.open()
    expect(client.readyState).toEqual(WS.OPEN)
    server.close(1000)
  })

  it('utils/ws WS queues', async () => {
    const openFn = jest.fn()
    const closeFn = jest.fn()
    const client = new WS(url)
    client.on('open.test', openFn)
    client.on('close.test', closeFn)
    client.send('test1')
    client.send('test2')
    client.send('test3')
    expect(client.queues).toEqual(['test1', 'test2', 'test3'])
    server.open()
    expect(sendFn).toHaveBeenNthCalledWith(1, 'test1')
    expect(sendFn).toHaveBeenNthCalledWith(2, 'test2')
    expect(sendFn).toHaveBeenNthCalledWith(3, 'test3')
    server.close(1000)
  })

  it('utils/ws WS ping/autoPing', async () => {
    const client = new WS(url, {
      ping: 'ping',
      autoPing: true,
    })
    server.open()
    expect(client.readyState).toEqual(WS.OPEN)
    await jest.advanceTimersByTimeAsync(8001)
    expect(sendFn).toBeCalledWith('ping')
    await jest.advanceTimersByTimeAsync(8001 * 3)
    expect(sendFn).toBeCalledTimes(4)
    server.close(1000)
  })

  it('utils/ws WS ping/pong/autoPing', async () => {
    const openFn = jest.fn()
    const closeFn = jest.fn()
    const client = new WS(url, {
      ping: 'ping',
      pong: 'pong',
      autoPing: true,
    })
    client.on('open.test', openFn)
    client.on('close.test', closeFn)
    server.open()
    expect(client.readyState).toEqual(WS.OPEN)
    await jest.advanceTimersByTimeAsync(8001)
    expect(sendFn).toBeCalledWith('ping')
    await jest.advanceTimersByTimeAsync(5001)
    expect(closeFn).toBeCalledWith({ code: WS.CLOSED_HEALTH_CODE })
    await jest.advanceTimersByTimeAsync(1)
    expect(client.readyState).toEqual(WS.CONNECTING)
    server.open()
    expect(client.readyState).toEqual(WS.OPEN)
    await jest.advanceTimersByTimeAsync(8001)
    expect(sendFn).toHaveBeenNthCalledWith(2, 'ping')
    server.message('pong')
    await jest.advanceTimersByTimeAsync(8001)
    expect(sendFn).toHaveBeenNthCalledWith(3, 'ping')
    server.message('pong')
    await jest.advanceTimersByTimeAsync(8001)
    expect(sendFn).toHaveBeenNthCalledWith(4, 'ping')
    server.close(1000)
  })

  it('utils/ws WS ping/pong', async () => {
    const client = new WS(url, {
      ping: 'ping',
      pong: 'pong',
    })
    server.open()
    expect(client.readyState).toEqual(WS.OPEN)
    expect(client.pingTimer).toBeUndefined()
    server.message('pong')
    expect(!!client.pingTimer).toBeDefined()
    await jest.advanceTimersByTimeAsync(8001)
    expect(sendFn).toBeCalledWith('ping')
    server.message('pong')
    expect(client.PongOutTimer).toEqual(undefined)
    await jest.advanceTimersByTimeAsync(8001)
    expect(sendFn).toBeCalledWith('ping')
    server.close(1000)
  })

  it('utils/ws WS ping/pong function', async () => {
    const client = new WS(url, {
      ping: () => 'ping',
      pong: () => 'pong',
    })
    server.open()
    expect(client.readyState).toEqual(WS.OPEN)
    expect(client.pingTimer).toBeUndefined()
    server.message('pong')
    expect(!!client.pingTimer).toBeDefined()
    await jest.advanceTimersByTimeAsync(8001)
    expect(sendFn).toBeCalledWith('ping')
    server.message('pong')
    server.close(1000)
  })

  it('utils/ws WS formatData', async () => {
    const messageFn = jest.fn()
    const client = new WS(url, {
      formatData: (event) => {
        return {
          ...event,
          data: event.data + 'test',
        }
      },
    })
    client.on('message.test', messageFn)
    server.open()
    server.message('info')
    expect(messageFn).toBeCalledWith('info' + 'test')
  })

  it('utils/ws WS others', async () => {
    const client = WS.getWS(url, {
      protocols: 'protocols',
    })
    expect(client.binaryType).toEqual('arraybuffer')
    expect(client.extensions).toEqual('extensions')
    expect(client.protocol).toEqual('protocols')
    expect(client.bufferedAmount).toEqual(1000)
    client.binaryType = 'blob'
    expect(client.binaryType).toEqual('blob')
    server.close(1000)
  })
})
