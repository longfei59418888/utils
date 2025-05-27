import sameVariableText from './rules/sameVariableText'
import styledComponentsStyleSame from './rules/styledComponentsStyleSame'

module.exports = {
  rules: {
    'style-same': styledComponentsStyleSame,
    'variable-same-text': sameVariableText,
  },
  configs: {
    styledComponents: {
      plugins: ['@xlong'],
      rules: {
        '@xlong/style-same': 2,
        '@xlong/variable-same-text': 'warn',
      },
    },
    recommended: {
      plugins: ['@xlong'],
      rules: {
        '@xlong/variable-same-text': 'warn',
      },
    },
  },
}
