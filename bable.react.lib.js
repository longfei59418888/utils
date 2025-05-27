module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          chrome: 100,
          safari: 15,
          firefox: 91,
        },
      },
    ],
    '@babel/preset-typescript',
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
  ],
  plugins: [],
  ignore: ['./**/*/__tests__'],
}
