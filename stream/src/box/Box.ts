import { BoxParser } from '../box-bak'
import { MAX_SIZE } from '../BufferView'
import SteamView from '../SteamView'
import boxParsing from './parsing/box'

export class Box {
  type: string
  start: number
  size: number
  /** 记录读取的位置 */
  hdr_size: number = 0
  data?: Uint8Array
  uuid?: string
  /** 容器盒子-子盒子 */
  boxes: Box[] = []
  constructor(_type: string, _size: number, _uuid?: string) {
    this.type = _type
    this.size = _size
    this.uuid = _uuid
  }

  parse(stream: SteamView) {
    if (this.type != 'mdat') {
      this.data = stream.readUint8Array(this.size - this.hdr_size)
    } else {
      if (this.size === 0) {
        stream.seek(stream.getEndPosition())
      } else {
        stream.seek(this.start + this.size)
      }
    }
  }

  add(name: string) {
    return this.addBox(new BoxParser.classes[name + 'Box']())
  }
  addBox(box: Box) {
    this.boxes.push(box)
    // @ts-ignore
    if (this[box.type + 's']) {
      // @ts-ignore
      this[box.type + 's'].push(box)
    } else {
      // @ts-ignore
      this[box.type] = box
    }
    return box
  }

  set(prop: string, value: unknown) {
    // @ts-ignore
    this[prop] = value
    return this
  }
  addEntry(value: unknown, _prop: string = 'entries') {
    // @ts-ignore
    if (!this[_prop]) {
      // @ts-ignore
      this[_prop] = []
    }
    // @ts-ignore
    this[_prop].push(value)
    return this
  }

  sizePosition = 0

  writeHeader(stream: SteamView) {
    this.size += 8
    if (this.size > MAX_SIZE) {
      this.size += 8
    }
    if (this.type === 'uuid') {
      this.size += 16
    }
    if (this.size > MAX_SIZE) {
      stream.writeUint32(1)
    } else {
      this.sizePosition = stream.getPosition()
      stream.writeUint32(this.size)
    }
    stream.writeString(this.type, undefined, 4)
    if (this.type === 'uuid' && this.uuid) {
      // @ts-ignore
      stream.writeUint8Array(this.uuid)
    }
    if (this.size > MAX_SIZE) {
      stream.writeUint64(this.size)
    }
  }
  write(stream: SteamView) {
    if (this.type === 'mdat') {
      if (this.data) {
        this.size = this.data.length
        this.writeHeader(stream)
        stream.writeUint8Array(this.data)
      }
    } else {
      this.size = this.data ? this.data.length : 0
      this.writeHeader(stream)
      if (this.data) {
        stream.writeUint8Array(this.data)
      }
    }
  }

  static get(type: string, parseMethod?: Box['parse']) {
    return class Index extends Box {
      constructor(_size: number) {
        super(type, _size)
        if (parseMethod) this.parse = parseMethod
      }
    }
  }
}

export class FullBox extends Box {
  flags: number = 0
  version: number = 0
  constructor(_type: string, _size: number, _uuid?: string) {
    super(_type, _size, _uuid)
  }
  parseFullHeader(stream: SteamView) {
    this.version = stream.readUint8()
    this.flags = stream.readUint24()
    this.hdr_size += 4
  }
  writeHeader(stream: SteamView) {
    this.size += 4
    super.writeHeader(stream)
    stream.writeUint8(this.version)
    stream.writeUint24(this.flags)
  }

  static get(type: string, parseMethod?: Box['parse']) {
    return class Index extends FullBox {
      constructor(_size: number) {
        super(type, _size)
        this.parse = function (stream: SteamView) {
          this.parseFullHeader(stream)
          if (parseMethod) {
            parseMethod.call(this, stream)
          }
        }
      }
    }
  }
}

export class TrackGroupTypeBox extends FullBox {
  constructor(_type: string, _size: number, _uuid?: string) {
    super(_type, _size, _uuid)
  }
}

export class SampleGroupEntry {
  grouping_type: string
  size: number
  parse: Box['parse']
  constructor(grouping_type: string, size?: number) {
    this.grouping_type = grouping_type
    size && (this.size = size)
  }
}

export class ContainerBox extends Box {
  _subBoxNames?: string[]
  constructor(_type: string, _size: number, _uuid?: string) {
    super(_type, _size, _uuid)
  }

  write(stream: SteamView) {
    this.size = 0
    this.writeHeader(stream)
    for (let i = 0; i < this.boxes.length; i++) {
      if (this.boxes[i]) {
        this.boxes[i].write(stream)
        this.size += this.boxes[i].size
      }
    }
    stream.adjustUint32(this.sizePosition, this.size)
  }

  set subBoxNames(v: string[]) {
    this._subBoxNames = v
    for (let k = 0; k < v.length; k++) {
      // @ts-ignore
      this[v[k] + 's'] = []
    }
  }
  get subBoxNames() {
    return this._subBoxNames ?? []
  }

  static get(type: string, parseMethod?: Box['parse'], subBoxNames?: string[]) {
    return class Index extends ContainerBox {
      constructor(_size: number) {
        super(type, _size)
        if (subBoxNames) this.subBoxNames = subBoxNames
        if (parseMethod) this.parse = parseMethod
      }
    }
  }
}

export default {
  mdat: Box,
  idat: Box,
  free: Box,
  skip: Box,
  meco: Box,
  strk: Box,
  ...boxParsing,
  hmhd: FullBox,
  nmhd: FullBox,
  iods: FullBox,
  xml: FullBox,
  bxml: FullBox,
  ipro: FullBox,
  mere: FullBox,
}
