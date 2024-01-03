import { getBase64Img } from '../index'

describe('utils/utils/common', () => {
  it('utils/utils/common getBase64Img', () => {
    const base64Str = 'base64Str'
    const result = getBase64Img(base64Str)
    expect(result).toEqual(`data:image/png;base64,${base64Str}`)
  })
})
