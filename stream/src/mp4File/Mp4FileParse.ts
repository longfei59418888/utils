import { ParsingMdat } from '../types/mp4File'
import { IMp4File } from './Mp4File'

class Mp4FileParse extends IMp4File {
  /** 当前的位置 */
  lastBoxStartPosition = 0
  /** buffers 中最大连续的结束位置 */
  nextParsePosition = 0
  /* 正在解析 Mdat 中 */
  parsingMdat: ParsingMdat | null = null
  discardMdatData = false
  processIncompleteBox() {}
  hasIncompleteMdat() {
    return this.parsingMdat !== null
  }
  processIncompleteMdat() {
    if (this.parsingMdat === null) return false
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
  restoreParsePosition() {
    return this.stream.seek(
      this.lastBoxStartPosition,
      true,
      this.discardMdatData,
    )
  }
  saveParsePosition() {
    this.lastBoxStartPosition = this.stream.getPosition()
  }
  updateUsedBytes() {}
}

export default Mp4FileParse
