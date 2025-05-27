// @ts-nocheck
import SteamView from '../../SteamView'
import { Box, FullBox } from '../Box'

function getWidthAndHeight(stream) {
  this.width = stream.readUint32()
  this.height = stream.readUint32()
}

export default {
  clef: FullBox.get('clef', getWidthAndHeight),
  enof: FullBox.get('enof', getWidthAndHeight),
  prof: FullBox.get('prof', getWidthAndHeight),
}
