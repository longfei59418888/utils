export class Box {
  position = 0
  start = 0
  constructor(_type, _size, _uuid) {
    this.type = _type
    this.size = _size
    this.uuid = _uuid
  }

  parse(iOSFile) {
    this.data = iOSFile.getUint8Array(
      this.size - (iOSFile.position - this.start),
      true,
    )
  }

  parseLanguage(stream) {
    this.language = stream.getUint16()
    var chars = []
    chars[0] = (this.language >> 10) & 0x1f
    chars[1] = (this.language >> 5) & 0x1f
    chars[2] = this.language & 0x1f
    this.languageString = String.fromCharCode(
      chars[0] + 0x60,
      chars[1] + 0x60,
      chars[2] + 0x60,
    )
  }

  static get(type, parseMethod) {
    return class Index extends Box {
      constructor(type, _size) {
        super(type, _size)
        this.parse = function (stream) {
          if (parseMethod) {
            parseMethod.call(this, stream)
          }
        }
      }
    }
  }
}

export class ContainerBox extends Box {
  _subBoxNames = []
  boxes = []
  constructor(_type, _size, _uuid) {
    super(_type, _size, _uuid)
    if (_type === 'moov') {
      this.trak = []
      this.pssh = []
    }
    if (_type === 'stbl') {
      this.sgpd = []
      this.sbgp = []
    }
  }

  parse(iOSFile) {
    while (iOSFile.getPosition() < this.start + this.size) {
      const box = iOSFile.parseBox()
      this.boxes.push(box)
      if (this.type === 'moov') {
        if (box.type === 'trak') this.trak.push(box)
        if (box.type === 'pssh') this.pssh.push(box)
      }
      if (this.type === 'stbl') {
        if (box.type === 'sgpd') this.sgpd.push(box)
        if (box.type === 'sgpd') this.sgpd.push(box)
      }
    }
  }
}

export class FullBox extends Box {
  flags
  version = 0
  constructor(_type, _size, _uuid) {
    super(_type, _size, _uuid)
  }
  parseFullHeader(stream) {
    this.version = stream.getUint8()
    this.flags = stream.getUint24()
    this.hdr_size += 4
  }
  writeHeader(stream) {
    this.size += 4
    super.writeHeader(stream)
    stream.writeUint8(this.version)
    stream.writeUint24(this.flags)
  }

  static get(type, parseMethod) {
    return class Index extends FullBox {
      constructor(type, _size) {
        super(type, _size)
        this.parse = function (stream) {
          this.parseFullHeader(stream)
          if (parseMethod) {
            parseMethod.call(this, stream)
          }
        }
      }
    }
  }
}

export class SampleEntry extends ContainerBox {
  constructor(_type, _size, hdr_size, start) {
    super(_type, _size)
    hdr_size && (this.hdr_size = hdr_size)
    start && (this.start = start)
  }

  parseHeader(stream) {
    stream.getUint8Array(6)
    this.data_reference_index = stream.getUint16()
    this.hdr_size += 8
  }

  parse(stream) {
    this.parseHeader(stream)
    this.data = stream.getUint8Array(this.size - this.hdr_size)
  }
  parseDataAndRewind(stream) {
    this.parseHeader(stream)
    this.data = stream.getUint8Array(this.size - this.hdr_size, false)
  }

  isVideo() {
    return false
  }
  isAudio() {
    return false
  }
  isSubtitle() {
    return false
  }
  isMetadata() {
    return false
  }
  isHint() {
    return false
  }
  getCodec() {
    return this.type.replace('.', '')
  }
  getWidth() {
    return ''
  }
  getHeight() {
    return ''
  }
  getChannelCount() {
    return ''
  }
  getSampleRate() {
    return ''
  }
  getSampleSize() {
    return ''
  }
}

export class VisualSampleEntry extends SampleEntry {
  width
  height
  channel_count
  samplesize

  parse(stream) {
    var compressorname_length
    this.parseHeader(stream)
    stream.getUint16()
    stream.getUint16()
    stream.getUint32Array(3)
    this.width = stream.getUint16()
    this.height = stream.getUint16()
    this.horizresolution = stream.getUint32()
    this.vertresolution = stream.getUint32()
    stream.getUint32()
    this.frame_count = stream.getUint16()
    compressorname_length = Math.min(31, stream.getUint8())
    this.compressorname = stream.readString(compressorname_length)
    if (compressorname_length < 31) {
      stream.readString(31 - compressorname_length)
    }
    this.depth = stream.getUint16()
    stream.getUint16()
    while (stream.getPosition() < this.start + this.size) {
      const box = stream.parseBox()
      this.boxes.push(box)
      if (this.type === 'moov') {
        if (box.type === 'trak') this.trak.push(box)
        if (box.type === 'pssh') this.pssh.push(box)
      }
      if (this.type === 'stbl') {
        if (box.type === 'sgpd') this.sgpd.push(box)
        if (box.type === 'sgpd') this.sgpd.push(box)
      }
    }
  }

  isVideo() {
    return true
  }
  getWidth() {
    return this.width
  }
  getHeight() {
    return this.height
  }
  isAudio() {
    return true
  }
  // @ts-ignore
  getChannelCount() {
    return this.channel_count
  }
  // @ts-ignore
  getSampleRate() {
    return this.samplesize
  }
  isMetadata() {
    return true
  }
  isSubtitle() {
    return true
  }
}

export class SampleGroupEntry {
  constructor(grouping_type, size) {
    this.grouping_type = grouping_type
    size && (this.size = size)
  }



}

export const boxParsing = {
  ftyp: Box,
  free: Box,
  mdat: Box,
  moov: ContainerBox,
  /*
   * moov.mvhd 视频的Header信息
   * creation_time  创建时间
   * modification_time   修改时间
   * timescale  时间比例
   * duration  持续时间
   * rate  速度
   * volume  音量
   * next_track_id
   * */
  mvhd: FullBox.get('mvhd', function (iOSFile) {
    if (this.version === 1) {
      this.creation_time = iOSFile.getUint64()
      this.modification_time = iOSFile.getUint64()
      this.timescale = iOSFile.getUint32()
      this.duration = iOSFile.getUint64()
    } else {
      this.creation_time = iOSFile.getUint32()
      this.modification_time = iOSFile.getUint32()
      this.timescale = iOSFile.getUint32()
      this.duration = iOSFile.getUint32()
    }
    this.rate = iOSFile.getUint32()
    this.volume = iOSFile.getUint16() >> 8
    iOSFile.getUint16()
    iOSFile.getUint32Array(2, true)
    this.matrix = iOSFile.getUint32Array(9, true)
    iOSFile.getUint32Array(6, true)
    this.next_track_id = iOSFile.getUint32()
  }),
  /** moov.trak */
  trak: ContainerBox,
  /**  moov.trak.tkhd   轨道的Header信息 */
  tkhd: FullBox.get('tkhd', function (iOSFile) {
    if (this.version === 1) {
      this.creation_time = iOSFile.getUint64()
      this.modification_time = iOSFile.getUint64()
      this.track_id = iOSFile.getUint32()
      iOSFile.getUint32()
      this.duration = iOSFile.getUint64()
    } else {
      this.creation_time = iOSFile.getUint32()
      this.modification_time = iOSFile.getUint32()
      this.track_id = iOSFile.getUint32()
      iOSFile.getUint32()
      this.duration = iOSFile.getUint32()
    }
    iOSFile.getUint32Array(2, true)
    this.layer = iOSFile.getInt16()
    this.alternate_group = iOSFile.getInt16()
    this.volume = iOSFile.getUint16() >> 8
    iOSFile.getUint16()
    this.matrix = iOSFile.getUint32Array(9, true)
    this.width = iOSFile.getUint32()
    this.height = iOSFile.getUint32()
  }),
  /*  moov.trak.edts 将时间线映射在media时间线上 */
  edts: ContainerBox,
  /*  moov.trak.edts.elst  */
  elst: FullBox.get('elst', function (stream) {
    this.entries = []
    const entry_count = stream.getUint32()
    for (var i = 0; i < entry_count; i++) {
      var entry = {}
      this.entries.push(entry)
      if (this.version === 1) {
        entry.segment_duration = stream.getUint64()
        entry.media_time = stream.getInt64()
      } else {
        entry.segment_duration = stream.getUint32()
        entry.media_time = stream.getInt32()
      }
      entry.media_rate_integer = stream.getInt16()
      entry.media_rate_fraction = stream.getInt16()
    }
  }),
  /*  moov.trak.mdia  媒体在轨道中的信息 */
  mdia: ContainerBox,
  /*  moov.trak.mdia.mdhd  轨道中媒体的信息 */
  mdhd: FullBox.get('mdhd', function (stream) {
    if (this.version == 1) {
      this.creation_time = stream.getUint64()
      this.modification_time = stream.getUint64()
      this.timescale = stream.getUint32()
      this.duration = stream.getUint32()
    } else {
      this.creation_time = stream.getUint32()
      this.modification_time = stream.getUint32()
      this.timescale = stream.getUint32()
      this.duration = stream.getUint32()
    }
    this.parseLanguage(stream)
    stream.getUint16()
  }),
  /*  moov.trak.mdia.mdhd  媒体在轨道中的信息 */
  hdlr: FullBox.get('hdlr', function (stream) {
    if (this.version === 0) {
      stream.getUint32()
      this.handler = stream.readString(4)
      stream.getUint32Array(3)
      this.name = stream.readString(this.size + this.start - stream.position)
    }
  }),
  /*  moov.trak.mdia.minf  轨道上的媒体信息与数据的映射关系和处理 */
  minf: ContainerBox,
  /*  moov.trak.mdia.minf.vmhd  轨道上的媒体信息与数据的映射关系和处理 */
  vmhd: FullBox.get('vmhd', function (stream) {
    this.graphicsmode = stream.getUint16()
    this.opcolor = stream.getUint16Array(3)
  }),
  /*  moov.trak.mdia.minf.dinf  轨道上的媒体信息与数据的映射关系和处理 */
  dinf: ContainerBox,
  /*  moov.trak.mdia.minf.dinf.dref  轨道上的媒体信息与数据的映射关系和处理 */
  dref: FullBox.get('dref', function (stream) {
    this.entries = []
    var entry_count = stream.getUint32()
    for (var i = 0; i < entry_count; i++) {
      if (stream.getPosition() >= this.size + this.start) return
      var box = stream.parseBox()
      if (box) {
        this.entries.push(box)
      } else {
        return
      }
    }
  }),
  ['url ']: FullBox.get('url ', function (stream) {
    if (this.flags !== 0x000001) {
      this.location = stream.readString(
        this.size + this.start - stream.position,
      )
    }
  }),
  /*  moov.trak.mdia.minf.stbl  */
  stbl: ContainerBox,
  /*  moov.trak.mdia.minf.stbl.stsd  描述编码信息*/
  stsd: FullBox.get('stsd', function (stream) {
    var i
    var ret
    var entryCount
    var box
    this.entries = []
    entryCount = stream.getUint32()
    for (i = 1; i <= entryCount; i++) {
      const ret = stream.parseBox(true, this.size + this.start)
      if (ret) {
        if (boxParsing[ret.type]) {
          box = new boxParsing[ret.type](ret.type, ret.size)
          box.hdr_size = ret.hdr_size
          box.start = ret.start
        } else {
          box = new SampleEntry(ret.type, ret.size, ret.hdr_size, ret.start)
        }
        if (box.write === SampleEntry.prototype.write) {
          box.data = stream.getUint8Array(
            box.size - (this.position - box.start),
            false,
          )
        }
        box.parse(stream)
        this.entries.push(box)
      } else {
        return
      }
    }
  }),
  avc1: VisualSampleEntry,
  avcC: Box.get('avcC', function (stream) {
    var i
    var toparse
    this.configurationVersion = stream.getUint8()
    this.AVCProfileIndication = stream.getUint8()
    this.profile_compatibility = stream.getUint8()
    this.AVCLevelIndication = stream.getUint8()
    this.lengthSizeMinusOne = stream.getUint8() & 0x3
    this.nb_SPS_nalus = stream.getUint8() & 0x1f
    toparse = this.size - this.hdr_size - 6
    this.SPS = []
    for (i = 0; i < this.nb_SPS_nalus; i++) {
      this.SPS[i] = {}
      this.SPS[i].length = stream.getUint16()
      this.SPS[i].nalu = stream.getUint8Array(this.SPS[i].length)
      toparse -= 2 + this.SPS[i].length
    }
    this.nb_PPS_nalus = stream.getUint8()
    toparse--
    this.PPS = []
    for (i = 0; i < this.nb_PPS_nalus; i++) {
      this.PPS[i] = {}
      this.PPS[i].length = stream.getUint16()
      this.PPS[i].nalu = stream.getUint8Array(this.PPS[i].length)
      toparse -= 2 + this.PPS[i].length
    }
    if (toparse > 0) {
      this.ext = stream.getUint8Array(toparse)
    }
  }),
  /** 存储每一块的帧数大小【计算处理每一个 sample 的 dts 解码时间】 */
  stts: FullBox.get('stts', function (stream) {
    var entry_count
    var i
    var delta
    entry_count = stream.getUint32()
    this.sample_counts = []
    this.sample_deltas = []
    if (this.version === 0) {
      for (i = 0; i < entry_count; i++) {
        this.sample_counts.push(stream.getUint32())
        delta = stream.getInt32()
        if (delta < 0) {
          delta = 1
        }
        this.sample_deltas.push(delta)
      }
    }
  }),
  /** 关键帧列表 sample_numbers */
  stss: FullBox.get('stss', function (stream) {
    var entry_count
    entry_count = stream.getUint32()
    if (this.version === 0) {
      this.sample_numbers = []
      for (let i = 0; i < entry_count; i++) {
        this.sample_numbers.push(stream.getUint32())
      }
    }
  }),
  /** 包含了每一个sample 的构建时PTS 和结构时间的差 */
  ctts: FullBox.get('ctts', function (stream) {
    var entry_count
    entry_count = stream.getUint32()
    this.sample_counts = []
    this.sample_offsets = []
    if (this.version === 0) {
      for (let i = 0; i < entry_count; i++) {
        this.sample_counts.push(stream.getUint32())
        /* some files are buggy and declare version=0 while using signed offsets.
           The likelyhood of using the most significant bit in a 32-bits time offset is very low,
           so using signed value here as well */
        var value = stream.getInt32()
        this.sample_offsets.push(value)
      }
    } else if (this.version == 1) {
      for (let i = 0; i < entry_count; i++) {
        this.sample_counts.push(stream.getUint32())
        this.sample_offsets.push(stream.getInt32()) /* signed */
      }
    }
  }),
  /** sample样本和块的关联 */
  stsc: FullBox.get('stsc', function (stream) {
    var entry_count
    var i
    entry_count = stream.getUint32()
    this.first_chunk = []
    this.samples_per_chunk = []
    this.sample_description_index = []
    if (this.version === 0) {
      for (i = 0; i < entry_count; i++) {
        this.first_chunk.push(stream.getUint32())
        this.samples_per_chunk.push(stream.getUint32())
        this.sample_description_index.push(stream.getUint32())
      }
    }
  }),
  /** 样本大小 */
  stsz: FullBox.get('stsz', function (stream) {
    var i
    this.sample_sizes = []
    if (this.version === 0) {
      this.sample_size = stream.getUint32()
      this.sample_count = stream.getUint32()
      for (i = 0; i < this.sample_count; i++) {
        if (this.sample_size === 0) {
          this.sample_sizes.push(stream.getUint32())
        } else {
          this.sample_sizes[i] = this.sample_size
        }
      }
    }
  }),
  /** 每个chunks相对文件的偏移量 */
  stco: FullBox.get('stco', function (stream) {
    var entry_count
    entry_count = stream.getUint32()
    this.chunk_offsets = []
    if (this.version === 0) {
      for (var i = 0; i < entry_count; i++) {
        this.chunk_offsets.push(stream.getUint32())
      }
    }
  }),
  smhd: FullBox.get('smhd', function (stream) {
    this.balance = stream.getUint16()
    stream.getUint16()
  }),
  sgpd: FullBox.get('smhd', function (stream) {
    // console.log(
    //   this.size + this.start - stream.getPosition(),
    //   this.size - this.hdr_size,
    // )
    // debugger
    // this.data = stream.getUint8(this.size - this.hdr_size)
    // return
    this.grouping_type = stream.readString(4)
    if (this.version === 1) {
      this.default_length = stream.getUint32()
    } else {
      this.default_length = 0
    }
    if (this.version >= 2) {
      this.default_group_description_index = stream.getUint32()
    }
    this.entries = []
    var entry_count = stream.getUint32()
    debugger
    for (var i = 0; i < entry_count; i++) {
      var entry
      if (BoxParser[this.grouping_type + 'SampleGroupEntry']) {
        entry = new BoxParser[this.grouping_type + 'SampleGroupEntry'](
          this.grouping_type,
        )
      } else {
        entry = new BoxParser.SampleGroupEntry(this.grouping_type)
      }
      this.entries.push(entry)
      if (this.version === 1) {
        if (this.default_length === 0) {
          entry.description_length = stream.getUint32()
        } else {
          entry.description_length = this.default_length
        }
      } else {
        entry.description_length = this.default_length
      }
      if (entry.write === BoxParser.SampleGroupEntry.prototype.write) {
        // storing data
        entry.data = stream.readUint8Array(entry.description_length)
        // rewinding
        stream.position -= entry.description_length
      }
      entry.parse(stream)
    }
    debugger
  }),
  roolSampleGroupEntry:
}
