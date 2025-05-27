import ContainerBox from './boxContainerBox'

export class SampleEntry extends ContainerBox {
  constructor(_type: string, _size: number, hdr_size?: number, start?: number) {
    super(_type, _size)
    hdr_size && (this.hdr_size = hdr_size)
    start && (this.start = start)
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
  width: string
  height: string
  channel_count: number
  samplesize: number
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

export default SampleEntry
