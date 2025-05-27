import { Box, boxParsing, ContainerBox, FullBox } from './parsing.js'
const MAX_SIZE = Math.pow(2, 32)

class IOSFile {
  static endianness = new Int8Array(new Int16Array([1]).buffer)[0] > 0
  buffer = null
  dataView = DataView
  position = 0
  boxes = []
  mdats = []
  moof = []
  moov = []

  readString(length) {
    const target = new Uint8Array(new ArrayBuffer(length), 0, length)
    const source = new Uint8Array(this.dataView.buffer, this.position, length)
    target.set(source)
    const text = new TextDecoder().decode(target.buffer)
    this.position += length
    return text
  }

  getUint32String() {
    const target = new Uint8Array(new ArrayBuffer(4), 0, 4)
    const source = new Uint8Array(this.dataView.buffer, this.position, 4)
    target.set(source)
    const text = new TextDecoder().decode(target.buffer)
    this.position += 4
    return text
  }

  getInt16() {
    const result = this.dataView.getInt16(this.position)
    this.position += 2
    return result
  }

  getInt32() {
    const result = this.dataView.getInt32(this.position)
    this.position += 4
    return result
  }

  getInt64() {
    return this.getInt32() * MAX_SIZE + this.getInt32()
  }

  getUint32() {
    const result = this.dataView.getUint32(this.position)
    this.position += 4
    return result
  }

  getUint24() {
    return (this.getUint8() << 16) + (this.getUint8() << 8) + this.getUint8()
  }

  getUint16() {
    const result = this.dataView.getUint16(this.position)
    this.position += 2
    return result
  }

  getUint8() {
    const result = this.dataView.getUint8(this.position)
    this.position += 1
    return result
  }

  getUint64() {
    return this.getUint32() * MAX_SIZE + this.getUint32()
  }

  getUint32Array(length, setPosition = true) {
    const target = new Uint8Array(new ArrayBuffer(length * 4), 0, length * 4)
    const source = new Uint8Array(
      this.dataView.buffer,
      this.position,
      length * 4,
    )
    target.set(source)
    if (setPosition) this.position += length * 4
    return target.buffer
  }

  getUint16Array(length, setPosition = true) {
    const target = new Uint8Array(new ArrayBuffer(length * 2), 0, length * 2)
    const source = new Uint8Array(
      this.dataView.buffer,
      this.position,
      length * 2,
    )
    target.set(source)
    if (setPosition) this.position += length * 2
    return target.buffer
  }

  getUint8Array(length, setPosition = true) {
    const target = new Uint8Array(new ArrayBuffer(length), 0, length)
    const source = new Uint8Array(this.dataView.buffer, this.position, length)
    target.set(source)
    if (setPosition) this.position += length
    return target.buffer
  }

  parseUUID() {
    var hex16 = ''
    for (let i = 0; i < 16; i++) {
      var hex = this.dataView.getUint8(this.position + i).toString(16)
      hex16 += hex.length === 1 ? '0' + hex : hex
    }
    this.position += 16
    return hex16
  }

  appendBuffer(buffer) {
    this.buffer = buffer
    this.position = 0
    this.dataView = new DataView(buffer, 0, buffer.length)
  }

  parseBox(headerOnly, endPosition) {
    let position = this.position
    if (endPosition <= position) return
    let hdr_size = 0
    let size = this.getUint32()
    hdr_size += 4
    let type = this.getUint32String()
    hdr_size += 4
    let uuid
    let boxType = type

    if (type === 'uuid') {
      boxType = uuid = this.parseUUID()
      hdr_size += 16
      debugger
    }
    if (size === 1) {
      debugger
      size = this.getUint32() * MAX_SIZE + this.getUint32()
      hdr_size += 8
    } else if (size === 0) {
      debugger
      if (type !== 'mdat') {
        return new Box(type, size)
      }
    }
    if (headerOnly)
      return { type: type, size: size, hdr_size: hdr_size, start: position }
    let box
    if (boxParsing[type]) {
      box = new boxParsing[type](type, size)
    } else {
      debugger
      if (type !== 'uuid') {
        const box = new Box(type, size)
        box.has_unparsed_data = true
        return box
      }
    }

    box.position = this.position
    box.start = position
    box.hdr_size = hdr_size
    box.data = this.getUint8Array(size - (this.position - position), false)
    box.parse(this)
    return box
  }

  parse() {
    while (true) {
      const box = this.parseBox()
      this.boxes.push(box)
      switch (box.type) {
        case 'mdat':
          this.mdats.push(box)
          break
        case 'moof':
          this.moofs.push(box)
          break
        case 'moov':
          this.moovStartFound = true
          if (this.mdats.length === 0) {
            this.isProgressive = true
          }
        default:
          this[box.type] = box
          break
      }
    }
  }

  getPosition() {
    return this.position
  }
}

const mp4File = new IOSFile()
const input = (document.querySelector('#input').onchange = (event) => {
  const reader = new FileReader()
  reader.onload = ({ target }) => {
    mp4File.appendBuffer(target.result)
    mp4File.parse()
  }
  reader.readAsArrayBuffer(event.target.files[0])
})
