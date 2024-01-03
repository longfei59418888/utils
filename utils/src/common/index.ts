export const getBase64Img = (base64Str: string): string => {
  return `data:image/png;base64,${base64Str}`
}
