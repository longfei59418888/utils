import MapBufferView from './MapBufferView'

class WirteBufferView extends MapBufferView {
  _dynamicSize = true
  get dynamicSize() {
    return this._dynamicSize
  }
  set dynamicSize(v) {
    if (!v) {
      this._trimAlloc()
    }
    this._dynamicSize = v
  }
  save(filename: string) {
    const blob = new Blob([this.buffer])
    if (window.URL && URL.createObjectURL) {
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      document.body.appendChild(a)
      a.setAttribute('href', url)
      a.setAttribute('download', filename)
      a.setAttribute('target', '_self')
      a.click()
      URL.revokeObjectURL(url)
      document.body.removeChild(a)
    }
  }

  /** 起始位置截取 offset 长度字节 */
  shift(offset: number) {
    const buffer = new ArrayBuffer(this._byteLength - offset)
    const destBuffer = new Uint8Array(buffer)
    const srcBuffer = new Uint8Array(this._buffer, offset, destBuffer.length)
    destBuffer.set(srcBuffer)
    this.buffer = buffer
    this.position -= offset
  }

  writeUCS2String(
    str: string,
    arrayIsLittleEndian?: boolean,
    lengthOverride?: number,
  ) {
    if (lengthOverride === undefined) lengthOverride = str.length
    const max = Math.max.apply(null, [lengthOverride, str.length])
    for (let i = 0; i < max; i++) {
      if (i < lengthOverride && i < str.length)
        this.writeUint16(str.charCodeAt(i), arrayIsLittleEndian)
      else {
        this.writeUint16(0)
      }
    }
  }

  writeString(str: string, encoding: string = 'ASCII', length?: number) {
    if (encoding == 'ASCII') {
      if (length === undefined) {
        for (let i = 0; i < str.length; i++) {
          this.writeUint8(str.charCodeAt(i))
        }
      } else {
        const max = Math.max(str.length, length)
        for (let i = 0; i < max; i++) {
          if (i < length && i < str.length) this.writeUint8(str.charCodeAt(i))
          else this.writeUint8(0)
        }
      }
    } else {
      this.writeUint8Array(new TextEncoder().encode(str.substring(0, length)))
    }
  }

  writeCString(str: string, length?: number) {
    if (length === undefined) {
      for (let i = 0; i < str.length; i++) {
        this.writeUint8(str.charCodeAt(i))
      }
      this.writeUint8(0)
    } else {
      const max = Math.max(str.length, length)
      for (let i = 0; i < max; i++) {
        if (i < length && i < str.length) this.writeUint8(str.charCodeAt(i))
        else this.writeUint8(0)
      }
    }
  }

  /** 修改 byteOffset+position 的位置后 64 位的数值 */
  writeFloat64(value: number, arrayIsLittleEndian?: boolean) {
    this._realLoc(8)
    this._dataView.setFloat64(
      this.position,
      value,
      arrayIsLittleEndian == null ? this.endianness : arrayIsLittleEndian,
    )
    this.position += 8
  }

  /** 修改 byteOffset+position 的位置后 32 位的数值 */
  writeInt32(value: number, arrayIsLittleEndian?: boolean) {
    this._realLoc(4)
    this._dataView.setInt32(
      this.position,
      value,
      arrayIsLittleEndian == null ? this.endianness : arrayIsLittleEndian,
    )
    this.position += 4
  }
  /** 修改 byteOffset+position 的位置后 32 位的数值 */
  writeUint32(value: number, arrayIsLittleEndian?: boolean) {
    this._realLoc(4)
    this._dataView.setUint32(
      this.position,
      value,
      arrayIsLittleEndian == null ? this.endianness : arrayIsLittleEndian,
    )
    this.position += 4
  }
  /** 修改 byteOffset+position 的位置后 32 位的数值 */
  writeFloat32(value: number, arrayIsLittleEndian?: boolean) {
    this._realLoc(4)
    this._dataView.setFloat32(
      this.position,
      value,
      arrayIsLittleEndian == null ? this.endianness : arrayIsLittleEndian,
    )
    this.position += 4
  }
  /** 修改 byteOffset+position 的位置后 16 位的数值 */
  writeInt16(value: number, arrayIsLittleEndian?: boolean) {
    this._realLoc(2)
    this._dataView.setInt16(
      this.position,
      value,
      arrayIsLittleEndian == null ? this.endianness : arrayIsLittleEndian,
    )
    this.position += 2
  }
  /** 修改 byteOffset+position 的位置后 16 位的数值 */
  writeUint16(value: number, arrayIsLittleEndian?: boolean) {
    this._realLoc(2)
    this._dataView.setUint16(
      this.position,
      value,
      arrayIsLittleEndian == null ? this.endianness : arrayIsLittleEndian,
    )
    this.position += 2
  }
  /** 修改 byteOffset+position 的位置后 8 位的数值 */
  writeInt8(value: number) {
    this._realLoc(1)
    this._dataView.setInt8(this.position, value)
    this.position += 1
  }
  /** 修改 byteOffset+position 的位置后 8 位的数值 */
  writeUint8(value: number) {
    this._realLoc(1)
    this._dataView.setUint8(this.position, value)
    this.position += 1
  }

  /** 修改 byteOffset+position 的位置后数据 */
  writeInt32Array(array: Int32Array, arrayIsLittleEndian?: boolean) {
    this._realLoc(array.length * 4)
    if (this.byteOffset + (this.position % array.BYTES_PER_ELEMENT) === 0) {
      WirteBufferView.memCopy(
        this._buffer,
        this.byteOffset + this.position,
        array.buffer,
        0,
        array.byteLength,
      )
      this.mapInt32Array(array.length, arrayIsLittleEndian)
    } else {
      for (let i = 0; i < array.length; i++) {
        this.writeInt32(array[i], arrayIsLittleEndian)
      }
    }
  }
  writeUint32Array(array: Uint32Array, arrayIsLittleEndian?: boolean) {
    this._realLoc(array.length * 4)
    if (this.byteOffset + (this.position % array.BYTES_PER_ELEMENT) === 0) {
      WirteBufferView.memCopy(
        this._buffer,
        this.byteOffset + this.position,
        array.buffer,
        0,
        array.byteLength,
      )
      this.mapUint32Array(array.length, arrayIsLittleEndian)
    } else {
      for (let i = 0; i < array.length; i++) {
        this.writeUint32(array[i], arrayIsLittleEndian)
      }
    }
  }
  /** 修改 byteOffset+position 的位置后数据 */
  writeInt16Array(array: Int16Array, arrayIsLittleEndian?: boolean) {
    this._realLoc(array.length * 2)
    if (this.byteOffset + (this.position % array.BYTES_PER_ELEMENT) === 0) {
      WirteBufferView.memCopy(
        this._buffer,
        this.byteOffset + this.position,
        array.buffer,
        0,
        array.byteLength,
      )
      this.mapInt16Array(array.length, arrayIsLittleEndian)
    } else {
      for (let i = 0; i < array.length; i++) {
        this.writeInt16(array[i], arrayIsLittleEndian)
      }
    }
  }
  /** 修改 byteOffset+position 的位置后数据 */
  writeUint16Array(array: Uint16Array, arrayIsLittleEndian?: boolean) {
    this._realLoc(array.length * 2)
    if (this.byteOffset + (this.position % array.BYTES_PER_ELEMENT) === 0) {
      WirteBufferView.memCopy(
        this._buffer,
        this.byteOffset + this.position,
        array.buffer,
        0,
        array.byteLength,
      )
      this.mapUint16Array(array.length, arrayIsLittleEndian)
    } else {
      for (let i = 0; i < array.length; i++) {
        this.writeUint16(array[i], arrayIsLittleEndian)
      }
    }
  }
  /** 修改 byteOffset+position 的位置后数据 */
  writeInt8Array(array: Int8Array) {
    this._realLoc(array.length)
    if (this.byteOffset + (this.position % array.BYTES_PER_ELEMENT) === 0) {
      WirteBufferView.memCopy(
        this._buffer,
        this.byteOffset + this.position,
        array.buffer,
        0,
        array.byteLength,
      )
      this.mapInt8Array(array.length)
    } else {
      for (let i = 0; i < array.length; i++) {
        this.writeInt8(array[i])
      }
    }
  }
  /** 修改 byteOffset+position 的位置后数据 */
  writeUint8Array(array: Uint8Array) {
    this._realLoc(array.length)
    if (this.byteOffset + (this.position % array.BYTES_PER_ELEMENT) === 0) {
      WirteBufferView.memCopy(
        this._buffer,
        this.byteOffset + this.position,
        array.buffer,
        0,
        array.byteLength,
      )
      this.mapUint8Array(array.length)
    } else {
      for (let i = 0; i < array.length; i++) {
        this.writeUint8(array[i])
      }
    }
  }
  /** 修改 byteOffset+position 的位置后数据 */
  writeFloat64Array(array: Float64Array, arrayIsLittleEndian?: boolean) {
    this._realLoc(array.length * 8)
    if (this.byteOffset + (this.position % array.BYTES_PER_ELEMENT) === 0) {
      WirteBufferView.memCopy(
        this._buffer,
        this.byteOffset + this.position,
        array.buffer,
        0,
        array.byteLength,
      )
      this.mapFloat64Array(array.length, arrayIsLittleEndian)
    } else {
      for (let i = 0; i < array.length; i++) {
        this.writeFloat64(array[i], arrayIsLittleEndian)
      }
    }
  }
  /** 修改 byteOffset+position 的位置后数据 */
  writeFloat32Array(array: Float32Array, arrayIsLittleEndian?: boolean) {
    this._realLoc(array.length * 4)
    if (this.byteOffset + (this.position % array.BYTES_PER_ELEMENT) === 0) {
      WirteBufferView.memCopy(
        this._buffer,
        this.byteOffset + this.position,
        array.buffer,
        0,
        array.byteLength,
      )
      this.mapFloat32Array(array.length, arrayIsLittleEndian)
    } else {
      for (let i = 0; i < array.length; i++) {
        this.writeFloat32(array[i], arrayIsLittleEndian)
      }
    }
  }
}

export default WirteBufferView
