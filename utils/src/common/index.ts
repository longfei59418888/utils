export const getBase64Img = (base64Str: string): string => {
  return `data:image/png;base64,${base64Str}`
}

export const base64ToBlob = (base64String: string, type?: string) => {
  const base64Strings = base64String.split(',')
  const mime = base64Strings[0]?.match(/:(.*?);/)
  const data = atob(base64Strings[1])
  let length = data.length
  const uint8Array = new Uint8Array(data.length)
  while (length--) {
    uint8Array[length] = data.charCodeAt(length)
  }
  return new Blob([uint8Array], { type: type ? type : (mime && mime[1]) || '' })
}


