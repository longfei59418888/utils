import SteamView from '../SteamView'
import Box, { FullBox, SampleGroupEntry, TrackGroupTypeBox } from './box'
import ContainerBox from './boxContainerBox'
import SampleEntry from './boxSampleEntry'

interface Classes {
  [key: string]: any
}

export class BoxParser {
  static ERR_INVALID_DATA = -1

  static ERR_NOT_ENOUGH_DATA = 0
  static OK = 1
  /*
   * 基础盒子
   * mdat： media data container, 具体的媒体数据
   *
   * */
  static BASIC_BOXES = ['mdat', 'idat', 'free', 'skip', 'meco', 'strk']
  /*
   * Full 盒子：有版本号和标志位
   * */
  static FULL_BOXES = ['hmhd', 'nmhd', 'iods', 'xml ', 'bxml', 'ipro', 'mere']

  static CONTAINER_BOXES = [
    ['moov', ['trak', 'pssh']],
    ['trak'],
    ['edts'],
    ['mdia'],
    ['minf'],
    ['dinf'],
    ['stbl', ['sgpd', 'sbgp']],
    ['mvex', ['trex']],
    ['moof', ['traf']],
    ['traf', ['trun', 'sgpd', 'sbgp']],
    ['vttc'],
    ['tref'],
    ['iref'],
    ['mfra', ['tfra']],
    ['meco'],
    ['hnti'],
    ['hinf'],
    ['strk'],
    ['strd'],
    ['sinf'],
    ['rinf'],
    ['schi'],
    ['trgr'],
    ['udta', ['kind']],
    ['iprp', ['ipma']],
    ['ipco'],
    ['grpl'],
    ['j2kH'],
    ['etyp', ['tyco']],
  ]

  static classes: Classes = {
    Box: Box,
    FullBox: FullBox,
    ContainerBox: ContainerBox,
    SampleEntry: SampleEntry,
    TrackGroupTypeBox: TrackGroupTypeBox,
    SampleGroupEntry: SampleGroupEntry,
  }

  static TKHD_FLAG_ENABLED = 0x000001
  static TKHD_FLAG_IN_MOVIE = 0x000002
  static TKHD_FLAG_IN_PREVIEW = 0x000004

  static TFHD_FLAG_BASE_DATA_OFFSET = 0x01
  static TFHD_FLAG_SAMPLE_DESC = 0x02
  static TFHD_FLAG_SAMPLE_DUR = 0x08
  static TFHD_FLAG_SAMPLE_SIZE = 0x10
  static TFHD_FLAG_SAMPLE_FLAGS = 0x20
  static TFHD_FLAG_DUR_EMPTY = 0x10000
  static TFHD_FLAG_DEFAULT_BASE_IS_MOOF = 0x20000

  static TRUN_FLAGS_DATA_OFFSET = 0x01
  static TRUN_FLAGS_FIRST_FLAG = 0x04
  static TRUN_FLAGS_DURATION = 0x100
  static TRUN_FLAGS_SIZE = 0x200
  static TRUN_FLAGS_FLAGS = 0x400
  static TRUN_FLAGS_CTS_OFFSET = 0x800

  boxCodes: string[] = []
  fullBoxCodes = []
  containerBoxCodes = []
  sampleEntryCodes: Classes = {}
  sampleGroupEntryCodes = []
  trackGroupTypes = []
  static UUIDBoxes: Classes = {}
  UUIDs: string[] = []

  constructor() {
    this.initialize()
  }
  initialize() {
    BoxParser.BASIC_BOXES.forEach((type) => {
      this.createBoxCtor(type)
    })

    BoxParser.FULL_BOXES.forEach((type) => {
      this.createFullBoxCtor(type)
    })
    BoxParser.CONTAINER_BOXES.forEach((types) => {
      if (types[1] && types[0])
        this.createContainerBoxCtor(
          types[0] as string,
          undefined,
          types[1] as string[],
        )
      else this.createContainerBoxCtor(types[0] as string)
    })
  }

  createBoxCtor(type: string, parseMethod?: Box['parse']) {
    this.boxCodes.push(type)
    BoxParser.classes[type + 'Box'] = class Index extends Box {
      constructor(_size: number) {
        super(type, _size)
        if (parseMethod) this.parse = parseMethod
      }
    }
  }
  createFullBoxCtor(type: string, parseMethod?: Box['parse']) {
    BoxParser.classes[type + 'Box'] = class Index extends FullBox {
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

  addSubBoxArrays() {}
  createContainerBoxCtor(
    type: string,
    parseMethod?: Box['parse'],
    subBoxNames?: string[],
  ) {
    BoxParser.classes[type + 'Box'] = class Index extends ContainerBox {
      constructor(_size: number) {
        super(type, _size)
        if (subBoxNames) this.subBoxNames = subBoxNames
        if (parseMethod) this.parse = parseMethod
      }
    }
  }
  createMediaSampleEntryCtor(
    type: string,
    parseMethod?: Box['parse'],
    subBoxNames?: string[],
  ) {
    this.sampleEntryCodes[type] = []
    BoxParser.classes[type + 'SampleEntry'] = class Index extends SampleEntry {
      constructor(_type: string, _size: number) {
        super(type, _size)
        if (subBoxNames) this.subBoxNames = subBoxNames
        if (parseMethod) this.parse = parseMethod
      }
    }
  }
  createSampleEntryCtor(
    mediaType: string,
    type: string,
    parseMethod?: Box['parse'],
    subBoxNames?: string[],
  ) {
    this.sampleEntryCodes[mediaType].push(type)
    BoxParser.classes[type + 'SampleEntry'] = class Index extends SampleEntry {
      constructor(_size: number) {
        super(type, _size)
        if (subBoxNames) this.subBoxNames = subBoxNames
        if (parseMethod) this.parse = parseMethod
      }
    }
  }
  createEncryptedSampleEntryCtor(
    mediaType: string,
    type: string,
    parseMethod?: Box['parse'],
  ) {
    this.createSampleEntryCtor(mediaType, type, parseMethod, ['sinf'])
  }
  createSampleGroupCtor(type: string, parseMethod?: Box['parse']) {
    BoxParser.classes[type + 'SampleGroupEntry'] = class Index extends (
      SampleGroupEntry
    ) {
      constructor(size?: number) {
        super(type, size)
        if (parseMethod) this.parse = parseMethod
      }
    }
  }
  createTrackGroupCtor(type: string, parseMethod?: Box['parse']) {
    BoxParser.classes[type + 'TrackGroupTypeBox'] = class Index extends (
      TrackGroupTypeBox
    ) {
      constructor(size: number) {
        super(type, size)
        if (parseMethod) this.parse = parseMethod
      }
    }
  }
  createUUIDBox(
    uuid: string,
    isFullBox?: boolean,
    isContainerBox?: boolean,
    parseMethod?: Box['parse'],
  ) {
    this.UUIDs.push(uuid)
    if (isFullBox) {
      this.UUIDBoxes[uuid] = class Index extends FullBox {
        constructor(size: number) {
          super('uuid', size, uuid)
          this.parse = function (stream: SteamView) {
            this.parseFullHeader(stream)
            if (parseMethod) {
              parseMethod.call(this, stream)
            }
          }
        }
      }
    } else {
      if (isContainerBox) {
        this.UUIDBoxes[uuid] = class Index extends ContainerBox {
          constructor(size: number) {
            super('uuid', size, uuid)
            parseMethod && (this.parse = parseMethod)
          }
        }
      } else {
        this.UUIDBoxes[uuid] = class Index extends Box {
          constructor(size: number) {
            super('uuid', size, uuid)
            parseMethod && (this.parse = parseMethod)
          }
        }
      }
    }
  }

  static parseOneBox(
    stream: SteamView,
    headerOnly?: boolean,
    parentSize?: number,
  ) {
    const start = stream.getPosition()
    let uuid
    /** 索引的位置 */
    let hdr_size = 0
    /* 太小了，type：4字节、size：4字节 */
    if (stream.getEndPosition() - start < 8 || (parentSize && parentSize < 8))
      return { code: BoxParser.ERR_NOT_ENOUGH_DATA }
    let size = stream.readUint32()
    const type = stream.readString(4)
    let boxType = type
    hdr_size = 8
    let box
    /** 如果类型为 uuid 则向后读取16个字节，16个字节表示类型 */
    if (type === 'uuid') {
      if (
        stream.getEndPosition() - stream.getPosition() < 16 ||
        (parentSize && parentSize - hdr_size < 16)
      ) {
        stream.seek(start)
        return { code: BoxParser.ERR_NOT_ENOUGH_DATA }
      }
      uuid = BoxParser.parseUUID(stream)
      hdr_size += 16
      boxType = uuid
    }
    /** 如果大小为1，则后8位为大小 size */
    if (size == 1) {
      if (
        stream.getEndPosition() - stream.getPosition() < 8 ||
        (parentSize && parentSize - hdr_size < 8)
      ) {
        stream.seek(start)
        return { code: BoxParser.ERR_NOT_ENOUGH_DATA }
      }
      size = stream.readUint64()
      hdr_size += 8
    } else if (size === 0) {
      if (parentSize) {
        size = parentSize
      } else {
        if (type !== 'mdat') {
          box = new BoxParser.classes['Box'](type, size)
          return {
            code: BoxParser.OK,
            box,
            size: box.size,
          }
        }
      }
    }
    if (headerOnly)
      return {
        code: BoxParser.OK,
        type: type,
        size: size,
        hdr_size: hdr_size,
        start: start,
      }
    else {
      if (BoxParser.classes[type + 'Box']) {
        box = new BoxParser.classes[type + 'Box'](size)
      } else {
        if (type !== 'uuid') {
          box = new BoxParser.classes['Box'](type, size)
          box.has_unparsed_data = true
        } else {
          if (uuid && BoxParser.UUIDBoxes[uuid]) {
            box = new BoxParser.UUIDBoxes[uuid](size)
          } else {
            box = new BoxParser.classes['Box'](type, size)
            box.uuid = uuid
            box.has_unparsed_data = true
          }
        }
      }
    }
    box.hdr_size = hdr_size
    box.start = start
    if (box.write === BoxParser.Box.prototype.write && box.type !== 'mdat') {
      box.parseDataAndRewind(stream)
    }
  }

  static parseUUID(stream: SteamView) {
    return BoxParser.parseHex16(stream)
  }

  /** 解析16个字节为 toString(16) */
  static parseHex16(stream: SteamView) {
    let hex16 = ''
    for (let i = 0; i < 16; i++) {
      const hex = stream.readUint8().toString(16)
      hex16 += hex.length === 1 ? '0' + hex : hex
    }
    return hex16
  }

  set() {}
  addEntry() {}
}

export default Object.assign(new BoxParser(), BoxParser.classes)
