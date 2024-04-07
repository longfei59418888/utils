import { PcmPlayerOptions } from './propsType'

const encodings = {
  '8bitInt': 128,
  '16bitInt': 32768,
  '32bitInt': 2147483648,
  '32bitFloat': 1,
}

const typedArrays = {
  '8bitInt': Int8Array,
  '16bitInt': Int16Array,
  '32bitInt': Int32Array,
  '32bitFloat': Float32Array,
}

class PCMPlayer {
  option: PcmPlayerOptions
  // 采样的数据
  samples: Float32Array
  audioCtx: AudioContext
  gainNode: GainNode
  interval: NodeJS.Timer
  state: 'INIT' | 'RUNNING' | 'SUSPEND'
  startTime: number
  endTimer: NodeJS.Timer
  maxValue: number
  typedArray: any
  constructor(options: PcmPlayerOptions) {
    this.option = Object.assign(
      {
        encoding: '16bitInt',
        channels: 1,
        // 采样率，每一秒采样的数据
        sampleRate: 8000,
        flushingTime: 1000,
        endTimeout: 500,
      },
      options,
    )
    this.samples = new Float32Array()
    this.state = 'INIT'
    if (options.autoStart) this.start()
    this.maxValue = this.getMaxValue()
    this.typedArray = this.getTypedArray()
    this.createContext()
  }

  createContext() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)()
    // context needs to be resumed on iOS and Safari (or it will stay in "suspended" state)
    void this.audioCtx.resume()
    // if you want to see "Running" state in console and be happy about it
    this.audioCtx.onstatechange = () => console.log(this.audioCtx?.state)
    // 增益输出节点
    this.gainNode = this.audioCtx.createGain()
    this.gainNode.gain.value = 1
    this.gainNode.connect(this.audioCtx.destination)
    this.startTime = this.audioCtx.currentTime
    if (this.option.requestFrame ?? this.option.endFrame) {
      const requestFrame = () => {
        try {
          const { option, audioCtx, startTime } = this
          if (audioCtx.currentTime) {
            option.requestFrame?.({
              audio: audioCtx,
              totalTime: startTime,
            })
            if (this.startTime < this.audioCtx.currentTime) {
              if (!this.endTimer)
                this.endTimer = setTimeout(() => {
                  option.endFrame?.({
                    audio: audioCtx,
                    totalTime: startTime,
                  })
                }, this.option.endTimeout)
            } else {
              if (this.endTimer) clearTimeout(this.endTimer as any)
              option.startFrame?.({
                audio: audioCtx,
                totalTime: startTime,
              })
            }
          }
          requestAnimationFrame(requestFrame)
        } catch (_) {
          throw 'requestFrame error'
        }
      }
      requestAnimationFrame(requestFrame)
    }
  }

  start() {
    if (this.state === 'SUSPEND') void this.audioCtx.resume()
    this.state = 'RUNNING'
    this.flush()
    this.interval = setInterval(() => this.flush(), this.option.flushingTime)
  }

  pause() {
    this.state = 'SUSPEND'
    if (this.interval) clearInterval(this.interval as any)
    void this.audioCtx.suspend()
  }

  feed(data: any) {
    if (!this.isTypedArray(data)) return
    data = this.getFormatValue(data)
    if (this.samples !== null) {
      const tmp = new Float32Array(this.samples.length + data.length)
      tmp.set(this.samples, 0)
      tmp.set(data, this.samples.length)
      this.samples = tmp
    }
  }

  flush() {
    if (!this?.samples?.length) return
    // 创建音频节点
    const bufferSource = this.audioCtx.createBufferSource()
    const length = this.samples.length / this.option.channels
    // 空白AudioBuffer,用于填充数据
    const audioBuffer = this.audioCtx.createBuffer(
      this.option.channels,
      length,
      this.option.sampleRate,
    )
    let audioData, offset, decrement
    for (let channel = 0; channel < this.option.channels; channel++) {
      audioData = audioBuffer.getChannelData(channel)
      offset = channel
      decrement = 50
      for (let i = 0; i < length; i++) {
        audioData[i] = this.samples[offset]
        /* fadein */
        if (i < 50) {
          audioData[i] = (audioData[i] * i) / 50
        }
        /* fadeout */
        if (i >= length - 51) {
          audioData[i] = (audioData[i] * decrement--) / 50
        }
        offset += this.option.channels
      }
    }

    if (this.startTime < this.audioCtx.currentTime) {
      this.startTime = this.audioCtx.currentTime
    }

    bufferSource.buffer = audioBuffer
    bufferSource.connect(this.gainNode)
    bufferSource.start(this.startTime)

    this.startTime += audioBuffer.duration

    this.samples = new Float32Array()
  }

  getFormatValue(source: Buffer) {
    // eslint-disable-next-line new-cap
    const data = new this.typedArray(source.buffer)
    const float32 = new Float32Array(data.length)
    for (let i = 0; i < data.length; i++) {
      float32[i] = data[i] / this.maxValue
    }
    return float32
  }

  isTypedArray(data: any) {
    return (
      data.byteLength && data.buffer && data.buffer.constructor === ArrayBuffer
    )
  }

  volume(volume: number) {
    this.gainNode.gain.value = volume
  }

  destroy() {
    console.log('destroy')
    if (!this.audioCtx) return
    if (this.interval) {
      // @ts-expect-error
      clearInterval(this.interval)
    }
    // @ts-expect-error
    this.samples = null
    void this.audioCtx.close()
    // @ts-expect-error
    this.audioCtx = null
  }

  getMaxValue() {
    return encodings[this.option.encoding] ?? encodings['16bitInt']
  }

  getTypedArray() {
    return typedArrays[this.option.encoding] ?? typedArrays['16bitInt']
  }
}

export default PCMPlayer
