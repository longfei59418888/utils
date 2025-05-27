export type TypedArray =
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array
  | BigInt64Array
  | BigUint64Array

export const MAX_SIZE = Math.pow(2, 32)

class BufferView {
  static LITTLE_ENDIAN = true
  static BIG_ENDIAN = false
  /** 系统是 DataStream.BIG_ENDIAN or DataStream.LITTLE_ENDIAN */
  static endianness = new Int8Array(new Int16Array([1]).buffer)[0] > 0
  /** 数据buffer */
  _buffer: ArrayBuffer
  /** 数据 buffer 的 Offset */
  _byteOffset: number
  /** DataView = new DataView(_buffer, _byteOffset)  */
  _dataView: DataView
  /** 数据buffer长度 */
  _byteLength: number = 0
  failurePosition: number
  /** dataView 的 Offset */
  position: number
  endianness: boolean
  _dynamicSize: boolean

  /** DataView的长度 */
  get byteLength() {
    return this._byteLength - this._byteOffset
  }

  /** _byteOffset */
  get byteOffset() {
    return this._byteOffset
  }

  set byteOffset(v: number) {
    this._byteOffset = v
    this._dataView = new DataView(this._buffer, this._byteOffset)
    this._byteLength = this._buffer.byteLength
  }

  get dataView() {
    return this._dataView
  }

  set dataView(v: DataView) {
    this._byteOffset = v.byteOffset
    this._buffer = v.buffer
    this._dataView = new DataView(this._buffer, this._byteOffset)
    this._byteLength = this._byteOffset + v.byteLength
  }

  get buffer() {
    this._trimAlloc()
    return this._buffer
  }
  set buffer(v) {
    this._buffer = v
    /*
     * DataView Buffer视图类
     * 参数 ArrayBufferLike
     * 参数 byteOffset 从 ArrayBufferLike 第几个截取
     * 参数 byteLength 从 ArrayBufferLike 截取长度
     * */
    this._dataView = new DataView(this._buffer, this._byteOffset)
    this._byteLength = this._buffer.byteLength
  }

  constructor(
    data: ArrayBuffer | DataView,
    byteOffset: number = 0,
    endianness: boolean = BufferView.LITTLE_ENDIAN,
  ) {
    this._byteOffset = byteOffset
    if (data instanceof ArrayBuffer) {
      this.buffer = data
    } else if (data instanceof DataView) {
      this.dataView = data
      if (byteOffset) {
        this._byteOffset += byteOffset
      }
    } else {
      this.buffer = new ArrayBuffer(data || 0)
    }
    this.position = 0
    this.endianness = endianness
  }
  getPosition() {
    return this.position
  }

  readString(length?: number, encoding: string = 'ASCII') {
    length = length === undefined ? this.byteLength - this.position : length
    if (encoding === 'ASCII')
      return BufferView.toString([
        this.mapUint8Array(
          length == null ? this.byteLength - this.position : length,
        ),
      ])
    else return new TextDecoder(encoding).decode(this.mapUint8Array(length))
  }

  readCString(length?: number) {
    const bufferLength = this.byteLength - this.position
    const buffer = new Uint8Array(
      this._buffer,
      this._byteOffset + this.position,
    )
    const len = length == null ? bufferLength : Math.min(length, bufferLength)
    let index = 0
    while (index < len) {
      if (buffer[index] !== 0) {
        const string = BufferView.toString([this.mapUint8Array(index)])
        length !== undefined
          ? (this.position += len - index)
          : index !== bufferLength && (this.position += 1)
        return string
      }
      index++
    }
  }

  /** 设置 position */
  protected seek(position: number) {
    position = Math.max(0, Math.min(this.byteLength, position))
    this.position = isNaN(position) || !isFinite(position) ? 0 : position
  }
  /** 是否结束 */
  isEof() {
    return this.position >= this._byteLength
  }
  /** 从 byteOffset + position 获取 length 长度的Uint8Array数据 */
  mapUint8Array(length: number) {
    this._realLoc(length)
    const arrayBuffer = new Uint8Array(
      this._buffer,
      this.byteOffset + this.position,
      length,
    )
    this.position += length
    return arrayBuffer
  }
  /** 从 byteOffset + position 获取 length 长度的Int32Array数据  */
  readInt32Array(length?: number, arrayIsLittleEndian?: boolean) {
    length = length === undefined ? this.byteLength - this.position / 4 : length
    const typedArray = new Int32Array(length)
    BufferView.memCopy(
      typedArray.buffer,
      0,
      this.buffer,
      this.byteOffset + this.position,
      length * typedArray.BYTES_PER_ELEMENT,
    )
    BufferView.arrayToNative(
      typedArray,
      arrayIsLittleEndian == null ? this.endianness : arrayIsLittleEndian,
    )
    this.position += typedArray.byteLength
    return typedArray
  }
  /** 从 byteOffset + position 获取 length 长度的Int16Array数据  */
  readInt16Array(length?: number, arrayIsLittleEndian?: boolean) {
    length = length === undefined ? this.byteLength - this.position / 2 : length
    const typedArray = new Int16Array(length)
    BufferView.memCopy(
      typedArray.buffer,
      0,
      this.buffer,
      this.byteOffset + this.position,
      length * typedArray.BYTES_PER_ELEMENT,
    )
    BufferView.arrayToNative(
      typedArray,
      arrayIsLittleEndian == null ? this.endianness : arrayIsLittleEndian,
    )
    this.position += typedArray.byteLength
    return typedArray
  }
  /** 从 byteOffset + position 获取 length 长度的Int8Array数据  */
  readInt8Array(length?: number) {
    length = length === undefined ? this.byteLength - this.position : length
    const typedArray = new Int8Array(length)
    BufferView.memCopy(
      typedArray.buffer,
      0,
      this.buffer,
      this.byteOffset + this.position,
      length * typedArray.BYTES_PER_ELEMENT,
    )
    this.position += typedArray.byteLength
    return typedArray
  }
  /** 从 byteOffset + position 获取 length 长度的Uint32Array数据  */
  zreadUint32Array(length?: number, arrayIsLittleEndian?: boolean) {
    length = length === undefined ? this.byteLength - this.position / 4 : length
    const typedArray = new Uint32Array(length)
    BufferView.memCopy(
      typedArray.buffer,
      0,
      this.buffer,
      this.byteOffset + this.position,
      length * typedArray.BYTES_PER_ELEMENT,
    )
    BufferView.arrayToNative(
      typedArray,
      arrayIsLittleEndian == null ? this.endianness : arrayIsLittleEndian,
    )
    this.position += typedArray.byteLength
    return typedArray
  }
  /** 从 byteOffset + position 获取 length 长度的Uint16Array数据  */
  readUint16Array(length?: number, arrayIsLittleEndian?: boolean) {
    length = length === undefined ? this.byteLength - this.position / 2 : length
    const typedArray = new Uint16Array(length)
    BufferView.memCopy(
      typedArray.buffer,
      0,
      this.buffer,
      this.byteOffset + this.position,
      length * typedArray.BYTES_PER_ELEMENT,
    )
    BufferView.arrayToNative(
      typedArray,
      arrayIsLittleEndian == null ? this.endianness : arrayIsLittleEndian,
    )
    this.position += typedArray.byteLength
    return typedArray
  }
  /** 从 byteOffset + position 获取 length 长度的Uint8Array数据  */
  readUint8Array(length?: number) {
    length = length === undefined ? this.byteLength - this.position : length
    const typedArray = new Uint8Array(length)
    BufferView.memCopy(
      typedArray.buffer,
      0,
      this.buffer,
      this.byteOffset + this.position,
      length * typedArray.BYTES_PER_ELEMENT,
    )
    this.position += typedArray.byteLength
    return typedArray
  }
  /** 从 byteOffset + position 获取 length 长度的Float64Array数据  */
  readFloat64Array(length?: number, arrayIsLittleEndian?: boolean) {
    length = length === undefined ? this.byteLength - this.position / 8 : length
    const typedArray = new Float64Array(length)
    BufferView.memCopy(
      typedArray.buffer,
      0,
      this.buffer,
      this.byteOffset + this.position,
      length * typedArray.BYTES_PER_ELEMENT,
    )
    BufferView.arrayToNative(
      typedArray,
      arrayIsLittleEndian == null ? this.endianness : arrayIsLittleEndian,
    )
    this.position += typedArray.byteLength
    return typedArray
  }
  /** 从 byteOffset + position 获取 length 长度的Float32Array数据  */
  readFloat32Array(length?: number, arrayIsLittleEndian?: boolean) {
    length = length === undefined ? this.byteLength - this.position / 4 : length
    const typedArray = new Float32Array(length)
    BufferView.memCopy(
      typedArray.buffer,
      0,
      this.buffer,
      this.byteOffset + this.position,
      length * typedArray.BYTES_PER_ELEMENT,
    )
    BufferView.arrayToNative(
      typedArray,
      arrayIsLittleEndian == null ? this.endianness : arrayIsLittleEndian,
    )
    this.position += typedArray.byteLength
    return typedArray
  }
  /** 返回position位置的一个长整型 32 位数 */
  readInt32(arrayIsLittleEndian?: boolean) {
    const typedArray = this._dataView.getInt32(
      this.position,
      arrayIsLittleEndian,
    )
    this.position += 4
    return typedArray
  }
  readUint32(arrayIsLittleEndian?: boolean) {
    const typedArray = this._dataView.getUint32(
      this.position,
      arrayIsLittleEndian,
    )
    this.position += 4
    return typedArray
  }
  /** 返回position位置的一个长整型 16 位数 */
  readInt16(arrayIsLittleEndian?: boolean) {
    const typedArray = this._dataView.getInt16(
      this.position,
      arrayIsLittleEndian,
    )
    this.position += 2
    return typedArray
  }
  readUint16(arrayIsLittleEndian?: boolean) {
    const typedArray = this._dataView.getUint16(
      this.position,
      arrayIsLittleEndian,
    )
    this.position += 2
    return typedArray
  }
  /** 返回position位置的一个长整型 8 位数 */
  readInt8() {
    const typedArray = this._dataView.getInt8(this.position)
    this.position += 1
    return typedArray
  }

  readUint8() {
    const typedArray = this._dataView.getUint8(this.position)
    this.position += 1
    return typedArray
  }

  readFloat64(arrayIsLittleEndian?: boolean) {
    const typedArray = this._dataView.getFloat64(
      this.position,
      arrayIsLittleEndian,
    )
    this.position += 8
    return typedArray
  }

  readFloat32(arrayIsLittleEndian?: boolean) {
    const typedArray = this._dataView.getFloat32(
      this.position,
      arrayIsLittleEndian,
    )
    this.position += 4
    return typedArray
  }

  readInt64() {
    // 高32位 + 低32位
    return this.readInt32() * MAX_SIZE + this.readInt32()
  }
  readUint64() {
    // 高32位 + 低32位
    return this.readUint32() * MAX_SIZE + this.readUint32()
  }
  readUint24() {
    return (this.readUint8() << 16) + (this.readUint8() << 8) + this.readUint8()
  }

  _trimAlloc() {
    if (this._byteLength == this._buffer.byteLength) {
      return
    }
    const buffer = new ArrayBuffer(this._byteLength)
    const destBuffer = new Uint8Array(buffer)
    const rscBuffer = new Uint8Array(this._buffer, 0, destBuffer.length)
    destBuffer.set(rscBuffer)
    this.buffer = buffer
  }
  /** 设置额外长度，超出则不齐 */
  _realLoc(extra: number) {
    if (!this._dynamicSize) return
    const requestLength = this._byteOffset + this.position + extra
    let bufferLength = this._buffer.byteLength
    if (requestLength <= bufferLength) {
      if (requestLength > this._byteLength) {
        this._byteLength = requestLength
      }
      return
    }
    if (bufferLength < 1) bufferLength = 1
    while (requestLength > bufferLength) {
      bufferLength *= 2
    }
    const buf = new ArrayBuffer(bufferLength)
    const src = new Uint8Array(this._buffer)
    const dst = new Uint8Array(buf, 0, src.length)
    dst.set(src)
    this.buffer = buf
    this._byteLength = requestLength
  }

  static toString(typedArray: TypedArray[]) {
    const arr = []
    for (let i = 0; i < typedArray.length; i++) {
      arr[i] = typedArray[i]
    }
    return String.fromCharCode.apply(null, arr)
  }

  static memCopy(
    dst: ArrayBuffer,
    dstOffset: number,
    src: ArrayBuffer,
    srcOffset: number,
    byteLength: number,
  ) {
    const dstU8 = new Uint8Array(dst, dstOffset, byteLength)
    const srcU8 = new Uint8Array(src, srcOffset, byteLength)
    dstU8.set(srcU8)
  }

  static arrayToNative(array: TypedArray, arrayIsLittleEndian: boolean) {
    if (arrayIsLittleEndian == this.endianness) return array
    else return BufferView.flipArrayEndianness(array)
  }

  /** 小端转为大端 */
  static flipArrayEndianness(array: TypedArray) {
    const u8 = new Uint8Array(array.buffer, array.byteOffset, array.byteLength)
    for (let i = 0; i < array.byteLength; i += array.BYTES_PER_ELEMENT) {
      for (let j = i + array.BYTES_PER_ELEMENT - 1, k = i; j > k; j--, k++) {
        const tmp = u8[k]
        u8[k] = u8[j]
        u8[j] = tmp
      }
    }
    return array
  }
}

export default BufferView
