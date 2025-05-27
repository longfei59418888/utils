import SteamView, { SteamViewArrayBuffer } from '../SteamView'
import { Moov } from '../types/mp4'
import { ExtractedTrack, FragmentedTrack } from '../types/mp4File'
import Mp4FileSample from './Mp4FileSample'
import { BoxParser } from '../box'

export class IMp4File {
  moov?: Moov
  stream: SteamView
}

class Mp4File extends Mp4FileSample {
  boxes: []
  mdats: []
  moofs: []

  isProgressive = false
  moovStartFound = false
  onMoovStart = null
  moovStartSent = false
  onReady = null
  readySent = false
  onSegment = null
  onSamples = null
  onError = null
  sampleListBuilt = false
  fragmentedTracks: FragmentedTrack[] = []
  extractedTracks: ExtractedTrack[] = []
  isFragmentationInitialized = false
  sampleProcessingStarted = false
  nextMoofNumber = 0
  itemListBuilt = false
  onSidx = null
  sidxSent = false
  constructor(stream?: SteamView) {
    super()
    this.stream = stream ?? new SteamView()
  }

  /** 向 fragmentedTracks 中添加元素 */
  setSegmentOptions(
    id: FragmentedTrack['id'],
    user: FragmentedTrack['user'],
    options: {
      nbSamples: FragmentedTrack['nb_samples']
      rapAlignement: FragmentedTrack['rapAlignement']
    },
  ) {
    const trak = this.getTrackById(id)
    if (trak)
      this.fragmentedTracks.push({
        id,
        trak,
        user,
        nextSample: 0,
        segmentStream: null,
        nb_samples: options.nbSamples ?? 1000,
        rapAlignement: options.rapAlignement ?? true,
      })
  }

  /** 删除 fragmentedTracks 中 id 的元素 */
  unsetSegmentOptions(id: FragmentedTrack['id']) {
    this.fragmentedTracks.some((fragmentedTrack, index) => {
      if (fragmentedTrack.id == id) {
        this.fragmentedTracks.splice(index, 1)
        return true
      }
    })
  }

  setExtractionOptions(
    id: ExtractedTrack['id'],
    user: ExtractedTrack['user'],
    options: {
      nbSamples: ExtractedTrack['nb_samples']
    },
  ) {
    const trak = this.getTrackById(id)
    if (trak) {
      this.extractedTracks.push({
        id,
        user,
        trak,
        nextSample: 0,
        nb_samples: options.nbSamples ?? 1000,
        samples: [],
      })
    }
  }

  unsetExtractionOptions(id: FragmentedTrack['id']) {
    this.extractedTracks.some((fragmentedTrack, index) => {
      if (fragmentedTrack.id == id) {
        this.extractedTracks.splice(index, 1)
        return true
      }
    })
  }

  parse() {
    let found, ret, box, parseBoxHeadersOnly
    if (this.restoreParsePosition) {
      if (!this.restoreParsePosition()) {
        return
      }
    }
    while (true) {
      if (this.parsingMdat !== null) {
        if (this.processIncompleteMdat()) {
          continue
        } else {
          return
        }
      } else {
        this.saveParsePosition()
        ret = BoxParser.parseOneBox(this.stream, parseBoxHeadersOnly)
      }
    }
  }

  checkBuffer(ab: SteamViewArrayBuffer) {
    ab.usedBytes = 0
    this.stream.insertBuffer(ab)
    this.stream.initialized()
  }

  appendBuffer(ab: SteamViewArrayBuffer) {
    this.checkBuffer(ab)
    this.parse()
  }

  getInfo() {}

  setNextSeekPositionFromSample() {}

  processSamples() {}

  getBox() {}

  getBoxes() {}

  getTrackSamplesInfo() {}

  getTrackSample() {}

  releaseUsedSamples() {}

  start() {}

  stop() {}

  flush() {}

  seekTrack() {}

  getTrackDuration() {}

  seek() {}

  equal() {}
}
