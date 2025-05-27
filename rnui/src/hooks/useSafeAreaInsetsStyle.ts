import { Edge, useSafeAreaInsets } from 'react-native-safe-area-context'

const upperFirstChar = (word: string): string => {
  if (typeof word !== 'string' || word === '')
    throw new Error("typeof source !== 'string")
  return word.charAt(0).toUpperCase() + word.slice(1)
}

export function useSafeAreaInsetsStyle(
  safeAreaEdges: Array<Edge> = ['top', 'right', 'bottom', 'left'],
  property: 'padding' | 'margin' = 'padding',
) {
  /*
   * useSafeAreaInsets
   * 返回安全区域的内边距
   * */
  const insets = useSafeAreaInsets()
  return safeAreaEdges.reduce((acc, value) => {
    return { ...acc, [`${property}${upperFirstChar(value)}`]: insets[value] }
  }, {}) as {
    [K in Array<Edge>[number] as `${
      | 'padding'
      | 'margin'}${Capitalize<K>}`]: number
  }
}

export default useSafeAreaInsetsStyle
