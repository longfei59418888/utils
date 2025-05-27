// @ts-nocheck
import SteamView from '../../SteamView'
import { Box } from '../Box'

export default {
  a1lx: Box.get('a1lx', function (stream: SteamView) {
    const large_size = stream.readUint8() & 1
    const FieldLength = ((large_size & 1) + 1) * 16
    this.layer_size = []
    for (let i = 0; i < 3; i++) {
      if (FieldLength == 16) {
        this.layer_size[i] = stream.readUint16()
      } else {
        this.layer_size[i] = stream.readUint32()
      }
    }
  }),
  a1op: Box.get('a1op', function (stream) {
    this.op_index = stream.readUint8()
  }),
}
