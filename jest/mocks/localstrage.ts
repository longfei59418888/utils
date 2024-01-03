const mockLocalStorage = (gets: Record<string, unknown>) => {
  Object.defineProperty(globalThis, 'localStorage', {
    value: {
      getItem: (item: string) => gets[item],
      // setItem: (item: string, value: unknown) => (gets[item] = value),
      // removeItem: (item: string) => (gets[item] = null),
      // clear: () => (gets = {}),
    },
    writable: true,
  })
}

export default mockLocalStorage
