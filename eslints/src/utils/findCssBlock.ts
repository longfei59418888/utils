import {parseModule} from 'esprima'
import {
  Identifier,
  TaggedTemplateExpression,
  VariableDeclaration,
} from 'estree'
import fs from 'fs'
import md5 from 'md5'

interface CssRules {
  key: string
  value: string
  text: string
}

interface Block {
  index: number
  text: string
  parent: Block | null
  cssRules?: CssRules[]
  block?: Block[]
}

interface Style {
  name: string
  values: string[]
}

interface FileStyles {
  fileName: string
  styles: Style[]
}

export interface StyleSameConfig {
  styles: string[]
  cssRules: {
    [key in string]: true | string[]
  }
}

const cwd = process.cwd()

let cacheMap: Record<string, any> = {}

export const removeTemplate = (raws: string) => {
  let index = 0,
    templateMark = 0
  const root: Block = {
    index: 0,
    text: '',
    parent: null,
  }
  let block = root

  while (raws[index]) {
    const target = raws[index]
    if (target === '{' && raws[index - 1] === '$') templateMark += 1
    else if (target === '{' && templateMark !== 0) templateMark += 1
    else if (target === '}' && templateMark !== 0) templateMark -= 1
    else if (templateMark === 0) {
      if (target === '{') {
        const targetBlock = {
          index,
          text: '',
          parent: block,
        }
        if (block.block) block.block.push(targetBlock)
        else block.block = [targetBlock]
        block = targetBlock
      } else if (target === '}') {
        block.cssRules = _getCssRule(block.text)
        block = block.parent || root
        if (![';', '}'].includes(raws[index + 1])) block.text += ';'
      } else if (!['$', '+', '&'].includes(target)) block.text += target
    }

    index++
  }
  root.cssRules = _getCssRule(root.text)
  return root
}

export const initStyles = (stylePaths: string[]) => {
  const map = stylePaths.reduce((previousValue, currentValue) => {
    let path = `${cwd}/${currentValue}`
    if (!fs.existsSync(path)) path = `${cwd}/${currentValue}.ts`
    if (!fs.existsSync(path)) path = `${cwd}/${currentValue}.js`
    const styleText = fs.readFileSync(path, { encoding: 'utf-8' })
    const uuid = md5(styleText)
    return {
      ...previousValue,
      [`${currentValue}_${uuid}`]:
        cacheMap[`${currentValue}_${uuid}`] ||
        _parseCss(styleText, currentValue),
    }
  }, {})
  cacheMap = map
  return map
}

export const getBlockErrors = (styles: FileStyles[], roots: Block) => {
  const blockErrors: Record<string, string> = {}
  for (const target of styles) {
    if (
      target.styles.some(({ name, values = [] }) => {
        if (_checkBlockStyles(values, roots)) {
          blockErrors[target.fileName] = `使用 ${
            target.fileName
          } 文件下 ${name} 替换样式 ${values.join(';')}`
          return true
        }
      })
    )
      break
  }
  return Object.values(blockErrors) as string[]
}

function _checkBlockStyles(values: string[], root: Block): boolean {
  if (!root) return false
  const { block, cssRules = [] } = root
  if (
    values.every((value) => cssRules.map((rule) => rule.text).includes(value))
  )
    return true
  if (!block) return false
  return block
    .map((item) => _checkBlockStyles(values, item))
    .some((item) => item)
}

export const getErrorRulesInCss = (
  presetCssRules: StyleSameConfig['cssRules'],
  root: Block,
): string[] => {
  if (!root) return []
  const { block, cssRules = [] } = root
  const errorRules: string[] = []
  cssRules.forEach(({ key, value }) => {
    const presetCssRuleValues =
      presetCssRules[
        key
          .split('-')
          .map((word, index) =>
            index !== 0 ? word[0].toUpperCase() + word.slice(1) : word,
          )
          .join('')
      ]
    if (presetCssRuleValues === true) {
      errorRules.push(`使用全局变量替换 ${key}:${value} 中 ${value}`)
      return true
    }
    ;(presetCssRuleValues || []).some((cssRuleValue) => {
      if (cssRuleValue === value) {
        errorRules.push(`使用全局变量替换 ${key}:${value} 中 ${value}`)
        return true
      }
    })
  })
  if (!block) return errorRules
  return errorRules.concat(
    ...block.map((item) => getErrorRulesInCss(presetCssRules, item)),
  ) as string[]
}

function _getCssRule(raws: string) {
  return raws
    .split(';')
    .map((raw) => {
      raw = raw.replaceAll('\n', '').trim()
      if (raw.startsWith(':') || raw.endsWith(':')) return null
      const [key, value] = raw.split(':')
      if (value && !['hover'].includes(value.trim())) {
        return {
          key: key.trim(),
          value: value.trim(),
          text: `${key.trim()}:${value.trim()}`,
        }
      }
    })
    .filter((item) => !!item) as CssRules[]
}

function _parseCss(code: string, fileName: string) {
  const styles = parseModule(code)
    .body.map((declaration) => {
      if (declaration.type !== 'ExportNamedDeclaration') return null
      const { id, init } =
        (declaration?.declaration as VariableDeclaration).declarations[0] || {}
      const name = (id as Identifier)?.name
      const { type, tag, quasi } = init as TaggedTemplateExpression
      if (type === 'TaggedTemplateExpression' && (tag as any).name === 'css') {
        const value = quasi.quasis[0].value.raw
        return {
          name,
          values: _getCssRule(value).map((item) => `${item.key}:${item.value}`),
        }
      }
    })
    .filter((item) => !!item)
    .sort((a, b) => (b as Style).values.length - (a as Style).values.length)
  return {
    fileName,
    styles,
  }
}
