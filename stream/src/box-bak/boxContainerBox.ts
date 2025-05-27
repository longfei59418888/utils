/*
 * 容器盒子
 * */
import Box from './box'

export class ContainerBox extends Box {
  _subBoxNames?: string[]
  constructor(_type: string, _size: number, _uuid?: string) {
    super(_type, _size, _uuid)
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

export default ContainerBox
