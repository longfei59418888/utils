import { Rule } from 'eslint'
import { SourceLocation } from 'estree'
import * as ESTree from 'estree'
import fs from 'fs'

import { attrsName } from '../constants/html'

const textMap = new Map<
  string,
  Array<{ loc?: SourceLocation | null | undefined; value: string }>
>()

const ruleModule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'check same const variable text',
    },
  },
  create: function (context) {
    textMap.set(context.filename, [])
    return {
      VariableDeclarator: ({ init }) => {
        if (init && init.type === 'Literal') checkNode(context, init)
      },
      Property: ({ value }) => {
        if (value && value.type === 'Literal') checkNode(context, value)
      },
      CallExpression: (node) => {
        node.arguments.forEach((argument) => {
          if (argument.type === 'Literal') checkNode(context, argument)
        })
      },
      JSXAttribute: ({ name, value }: any) => {
        if (
          !attrsName.includes(name.name) &&
          value?.expression?.type === 'Literal'
        )
          checkNode(context, value?.expression)
      },
      BinaryExpression: ({ left, right }) => {
        if (left && left.type === 'Literal') checkNode(context, left)
        if (right && right.type === 'Literal') checkNode(context, right)
      },
      ConditionalExpression: ({ consequent, alternate }) => {
        if (consequent && consequent.type === 'Literal')
          checkNode(context, consequent)
        if (alternate && alternate.type === 'Literal')
          checkNode(context, alternate)
      },
    }
  },
}

function checkNode(context: Rule.RuleContext, node: ESTree.Literal, limit = 3) {
  const { loc, value } = node
  if (typeof value === 'string' && value.length > limit) {
    const fileNodeTexts = textMap.get(context.filename) || []
    for (const [path, nodeTexts] of textMap.entries()) {
      if (fs.existsSync(path)) {
        const errors = nodeTexts.filter((nodeText) => nodeText.value === value)
        if (errors) {
          errors.forEach((message) =>
            context.report({
              node,
              message: `${path}:${message.loc?.start.line}:${message.loc?.start.column} 存在 ${message.value}`,
            }),
          )
        }
      } else textMap.delete(path)
    }
    if (!fileNodeTexts) textMap.set(context.filename, [{ loc, value }])
    else {
      fileNodeTexts.push({ loc, value })
      textMap.set(context.filename, fileNodeTexts)
    }
  }
}

export default ruleModule
