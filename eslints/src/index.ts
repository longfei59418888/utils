import styledComponentsStyleSame from './rules/styledComponentsStyleSame'

module.exports = {
  rules: {
    'style-same': styledComponentsStyleSame,
  },
  configs: {
    styledComponents: {
      plugins: ['@xlong-eslint'],
      rules: {
        '@xlong-eslint/style-same': 2,
      },
    },
  },
}
