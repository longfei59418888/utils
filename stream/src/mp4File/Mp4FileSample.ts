import { Tkhd } from '../types/mp4'
import Mp4FileParse from './Mp4FileParse'

class Mp4FileSample extends Mp4FileParse {
  lastMoofIndex = 0
  samplesDataSize = 0

  resetTables() {}

  initSampleGroups() {}

  setSampleGroupProperties() {}

  buildSampleLists() {}

  buildTrakSampleLists() {}

  updateSampleLists() {}

  getSample() {}

  releaseSample() {}

  getAllocatedSampleDataSize() {}

  getTrexById() {}

  getCodecs() {}

  getTrackById(id: Tkhd['track_id']) {
    if (this.moov === undefined) {
      return null
    }
    for (let i = 0; i < this.moov.traks.length; i++) {
      const trak = this.moov.traks[i]
      if (trak.tkhd.track_id == id) return trak
    }
  }

  static process_sdtp() {}
}

export default Mp4FileSample
