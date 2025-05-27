import BufferView from './BufferView'

class MapBufferView extends BufferView {
  mapInt32Array(length: number, arrayIsLittleEndian?: boolean) {
    this._realLoc(length * 4)
    const arrayBuffer = new Int32Array(
      this._buffer,
      this.byteOffset + this.position,
      length,
    )
    BufferView.arrayToNative(
      arrayBuffer,
      arrayIsLittleEndian == null ? this.endianness : arrayIsLittleEndian,
    )
    this.position += length * 4
    return arrayBuffer
  }
  mapInt16Array(length: number, arrayIsLittleEndian?: boolean) {
    this._realLoc(length * 2)
    const arrayBuffer = new Int16Array(
      this._buffer,
      this.byteOffset + this.position,
      length,
    )
    BufferView.arrayToNative(
      arrayBuffer,
      arrayIsLittleEndian == null ? this.endianness : arrayIsLittleEndian,
    )
    this.position += length * 2
    return arrayBuffer
  }
  mapInt8Array(length: number) {
    this._realLoc(length)
    const arrayBuffer = new Int8Array(
      this._buffer,
      this.byteOffset + this.position,
      length,
    )
    this.position += length
    return arrayBuffer
  }
  mapUint32Array(length: number, arrayIsLittleEndian?: boolean) {
    this._realLoc(length * 4)
    const arrayBuffer = new Uint32Array(
      this._buffer,
      this.byteOffset + this.position,
      length,
    )
    BufferView.arrayToNative(
      arrayBuffer,
      arrayIsLittleEndian == null ? this.endianness : arrayIsLittleEndian,
    )
    this.position += length * 4
    return arrayBuffer
  }
  mapUint16Array(length: number, arrayIsLittleEndian?: boolean) {
    this._realLoc(length * 4)
    const arrayBuffer = new Uint16Array(
      this._buffer,
      this.byteOffset + this.position,
      length,
    )
    BufferView.arrayToNative(
      arrayBuffer,
      arrayIsLittleEndian == null ? this.endianness : arrayIsLittleEndian,
    )
    this.position += length * 2
    return arrayBuffer
  }
  mapFloat64Array(length: number, arrayIsLittleEndian?: boolean) {
    this._realLoc(length * 8)
    const arrayBuffer = new Float64Array(
      this._buffer,
      this.byteOffset + this.position,
      length,
    )
    BufferView.arrayToNative(
      arrayBuffer,
      arrayIsLittleEndian == null ? this.endianness : arrayIsLittleEndian,
    )
    this.position += length * 8
    return arrayBuffer
  }
  mapFloat32Array(length: number, arrayIsLittleEndian?: boolean) {
    this._realLoc(length * 4)
    const arrayBuffer = new Float32Array(
      this._buffer,
      this.byteOffset + this.position,
      length,
    )
    BufferView.arrayToNative(
      arrayBuffer,
      arrayIsLittleEndian == null ? this.endianness : arrayIsLittleEndian,
    )
    this.position += length * 4
    return arrayBuffer
  }
}

export default MapBufferView
