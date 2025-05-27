/*
 * 基础盒子
 * */
import SteamView from '../SteamView'
import { BoxParser } from './index'

class Box {
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
}

/*
 * Full box
 * */
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
}

export default Box
