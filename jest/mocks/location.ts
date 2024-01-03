export const mockLocation = (
  property: string,
  fn: unknown,
  init: Object = {},
) => {
  const location = { ...init }
  Object.defineProperty(location, property, {
    set: function (v: string) {
      ;(fn as Function)(v)
    },
  })
  Object.defineProperty(globalThis, 'location', {
    value: location,
    writable: true,
  })
}

export default mockLocation
