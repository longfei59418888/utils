import WriteBufferView from './WriteBufferView'
import { MAX_SIZE } from './BufferView'

export type SteamViewArrayBuffer = ArrayBufferLike & {
  /** buffer 在 SteamView 中的开始位置 */
  fileStart: number
  /** 使用的字节数 */
  usedBytes: number
}

class SteamView extends WriteBufferView {
  /** 当前是第几个buffer */
  bufferIndex: number
  buffers: Array<SteamViewArrayBuffer>
  constructor(buffer?: SteamViewArrayBuffer) {
    super(new ArrayBuffer(0), 0, WriteBufferView.BIG_ENDIAN)
    this.buffer = new ArrayBuffer(0) as SteamViewArrayBuffer
    this.bufferIndex = -1
    if (buffer) {
      this.insertBuffer(buffer)
      this.bufferIndex = 0
    }
  }

  initialized() {
    let firstBuffer
    if (this.bufferIndex > -1) return true
    else if (this.buffers.length > 0) {
      firstBuffer = this.buffers[0]
      if (firstBuffer.fileStart === 0) {
        this.buffer = firstBuffer
        this.bufferIndex = 0
        return true
      }
    }
    return false
  }

  // todo
  /** 插入到对应的位置 */
  insertBuffer(ab: SteamViewArrayBuffer) {
    if (this.buffers.length < 1) {
      this.buffers.push(ab)
      this.buffer = ab
      return
    }
    for (let i = 0; i < this.buffers.length; i++) {
      const buffer = this.buffers[i]
      if (ab.fileStart <= buffer.fileStart) {
        if (ab.fileStart === buffer.fileStart) {
          if (ab.byteLength > buffer.byteLength) {
            this.buffers.splice(i, 1)
            i--
            continue
          }
        }
      }
    }
  }

  /** 清除已经使用的 */
  cleanBuffers() {
    let buffer
    for (let i = 0; i < this.buffers.length; i++) {
      buffer = this.buffers[i]
      if (buffer.usedBytes === buffer.byteLength) {
        this.buffers.splice(i, 1)
        i--
      }
    }
  }

  /** 合并下一个 */
  mergeNextBuffer() {
    let next_buffer
    if (this.bufferIndex + 1 < this.buffers.length) {
      next_buffer = this.buffers[this.bufferIndex + 1]
      if (
        next_buffer.fileStart ===
        (this.buffer as SteamViewArrayBuffer).fileStart + this.buffer.byteLength
      ) {
        const oldUsedBytes = (this.buffer as SteamViewArrayBuffer).usedBytes
        const oldFileStart = (this.buffer as SteamViewArrayBuffer).fileStart
        this.buffers[this.bufferIndex] = SteamView.concat(
          this.buffer,
          next_buffer,
        )
        this.buffer = this.buffers[this.bufferIndex]
        this.buffers.splice(this.bufferIndex + 1, 1)
        ;(this.buffer as SteamViewArrayBuffer).usedBytes = oldUsedBytes
        ;(this.buffer as SteamViewArrayBuffer).fileStart = oldFileStart
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }

  /** 返回 filePosition 的位置出来buffers的第几个buffer中 */
  findPosition(fromStart = false, filePosition: number, markAsUsed?: boolean) {
    let index = fromStart ? 0 : this.bufferIndex
    let buffer = null,
      target = -1
    while (index < this.buffers.length) {
      buffer = this.buffers[index]
      if (buffer.fileStart <= filePosition) {
        target = index
        if (markAsUsed) {
          if (buffer.fileStart + buffer.byteLength <= filePosition)
            buffer.usedBytes = buffer.byteLength
          else buffer.usedBytes = filePosition - buffer.fileStart
        }
      } else break
      index++
    }
    if (target !== -1) {
      buffer = this.buffers[target]
      if (buffer.fileStart + buffer.byteLength >= filePosition) {
        return target
      }
    }
    return -1
  }

  /** 获取最大连续的结束位置 【 buffers的数据不是连续的 】 */
  findEndContiguousBuf(index?: number) {
    index = index ?? this.bufferIndex
    let currentBuf = this.buffers[index]
    if (this.buffers.length > index + 1) {
      for (let i = index + 1; i < this.buffers.length; i++) {
        const nextBuf = this.buffers[i]
        if (
          nextBuf.fileStart ===
          currentBuf.fileStart + currentBuf.byteLength
        ) {
          currentBuf = nextBuf
        } else {
          break
        }
      }
    }
    return currentBuf.fileStart + currentBuf.byteLength
  }

  getEndFilePositionAfter(position: number) {
    const index = this.findPosition(true, position, false)
    if (index !== -1) {
      return this.findEndContiguousBuf(index)
    } else {
      return position
    }
  }

  addUsedBytes(nbBytes: number) {
    ;(this.buffer as SteamViewArrayBuffer).usedBytes += nbBytes
  }
  /** 设置 buffer 的位置 filePosition，返回状态 */
  // @ts-ignore
  seek(filePosition: number, fromStart?: boolean, markAsUsed?: boolean) {
    const index = this.findPosition(fromStart, filePosition, markAsUsed)
    if (index !== -1) {
      this.buffer = this.buffers[index]
      this.bufferIndex = index
      this.position =
        filePosition - (this.buffer as SteamViewArrayBuffer).fileStart
      return true
    } else {
      return false
    }
  }

  /** 返回在当前buffer的position在buffers的索引位置 */
  // @ts-ignore
  getPosition() {
    if (this.bufferIndex === -1 || this.buffers[this.bufferIndex] === null) {
      throw 'Error accessing position in the MultiBufferStream'
    }
    return this.buffers[this.bufferIndex].fileStart + this.position
  }

  /** 返回在当前buffer在buffers的结束位置 */
  getEndPosition() {
    if (this.bufferIndex === -1 || this.buffers[this.bufferIndex] === null) {
      throw 'Error accessing position in the MultiBufferStream'
    }
    return this.buffers[this.bufferIndex].fileStart + this.byteLength
  }

  writeUint64(v: number) {
    const h = Math.floor(v / MAX_SIZE)
    this.writeUint32(h)
    this.writeUint32(v & 0xffffffff)
  }

  writeUint24(v: number) {
    this.writeUint8((v & 0x00ff0000) >> 16)
    this.writeUint8((v & 0x0000ff00) >> 8)
    this.writeUint8(v & 0x000000ff)
  }

  adjustUint32(position: number, value: number) {
    const pos = this.position
    this.seek(position)
    this.writeUint32(value)
    this.seek(pos)
  }

  static reduceBuffer(
    buffer: SteamViewArrayBuffer,
    offset: number,
    newLength: number,
  ) {
    const smallB = new Uint8Array(newLength)
    smallB.set(new Uint8Array(buffer, offset, newLength))
    ;(smallB.buffer as SteamViewArrayBuffer)['fileStart'] =
      buffer.fileStart + offset
    ;(smallB.buffer as SteamViewArrayBuffer)['usedBytes'] = 0
    return smallB.buffer
  }

  static concat(buffer1: ArrayBuffer, buffer2: ArrayBuffer) {
    const tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength)
    tmp.set(new Uint8Array(buffer1), 0)
    tmp.set(new Uint8Array(buffer2), buffer1.byteLength)
    return tmp.buffer as SteamViewArrayBuffer
  }
}

export default SteamView
