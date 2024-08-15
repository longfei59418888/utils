import { Rule } from 'eslint'

import {
  getBlockErrors,
  getErrorRulesInCss,
  initStyles,
  removeTemplate,
  StyleSameConfig,
} from '../utils/findCssBlock'

const cwd = process.cwd()

const ruleModule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'check same css rule',
    },
  },
  create: function (
    context: Rule.RuleContext & {
      parserOptions: {
        styleRuleSameConfig: StyleSameConfig
      } & Rule.RuleContext['parserOptions']
    },
  ) {
    if (!context.parserOptions.styleRuleSameConfig) return {}
    const presetCssRules = context.parserOptions.styleRuleSameConfig?.cssRules
    const stylePaths = context.parserOptions.styleRuleSameConfig.styles ?? []
    return {
      TemplateLiteral: (node) => {
        if (stylePaths.some((path) => `${cwd}/${path}` === context.filename))
          return
        if (!node.range) return
        const root = removeTemplate(
          context
            .getSourceCode()
            .text.slice(node.range[0] + 1, node.range[1] - 1),
        )
        const errorRules = presetCssRules
          ? getErrorRulesInCss(presetCssRules, root)
          : []
        const errorStyles = stylePaths
          ? getBlockErrors(Object.values(initStyles(stylePaths)), root)
          : []
        const errors = Array.from(new Set(errorRules)).concat(errorStyles)
        if (errors) {
          errors.forEach((message) =>
            context.report({
              node,
              message,
            }),
          )
        }
      },
    }
  },
}

export default ruleModule
