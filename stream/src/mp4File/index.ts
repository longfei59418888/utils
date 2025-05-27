import { BoxParser } from '../box'
import SteamView from '../SteamView'
import { Moov, Tkhd } from '../types/mp4'
import { ExtractedTrack, FragmentedTrack, ParsingMdat } from '../types/mp4File'

class ISOFile {
  moov?: Moov
  stream: SteamView
  boxes = []
  mdats = []
  moofs = []
  isProgressive = false
  moovStartFound = false
  onMoovStart = null
  moovStartSent = false
  onReady = null
  readySent = false
  onSegment = null
  onSamples = null
  sampleListBuilt = false
  fragmentedTracks: FragmentedTrack[] = []
  extractedTracks: ExtractedTrack[] = []
  isFragmentationInitialized = false
  sampleProcessingStarted = false
  nextMoofNumber = 0
  itemListBuilt = false
  onSidx = null
  sidxSent = false

  lastBoxStartPosition = 0
  nextParsePosition = 0
  /** 处理媒体数据 */
  parsingMdat: ParsingMdat | null = null
  discardMdatData = false

  constructor(stream?: SteamView) {
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
    if (!this.restoreParsePosition()) return
    // eslint-disable-next-line no-constant-condition
    while (true) {
      if (this.parsingMdat) {
        if (this.processIncompleteMdat()) continue
        else return
      } else {
        this.lastBoxStartPosition = this.stream.getPosition()
        const ret = BoxParser.parseOneBox(this.stream, false)
      }
    }
  }

  /** 从文件0的位置开始 */
  restoreParsePosition() {
    return this.stream.seek(
      this.lastBoxStartPosition,
      true,
      this.discardMdatData,
    )
  }

  /** 处理媒体数据中 */
  processIncompleteMdat() {
    if (!this.parsingMdat) return false
    const box = this.parsingMdat
    const found = this.stream.seek(
      box.start + box.size,
      false,
      this.discardMdatData,
    )
    if (found) {
      this.parsingMdat = null
      return true
    } else {
      this.nextParsePosition = this.stream.findEndContiguousBuf()
      return false
    }
  }

  getTrackById(id: Tkhd['track_id']) {
    if (!this.moov) return null
    for (let j = 0; j < this.moov.traks.length; j++) {
      const trak = this.moov.traks[j]
      if (trak.tkhd.track_id == id) return trak
    }
    return null
  }
}
