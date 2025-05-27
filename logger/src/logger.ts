import dayjs from 'dayjs'

export type LoggerLevel = 'info' | 'log' | 'warn' | 'error'

export interface LoggerOptions {
  /** 前缀 */
  prefix: string
  /** 启用 */
  disabled: boolean
  /** 级别 */
  level: number
}

class Logger {
  static console = console || {}
  static methods: LoggerLevel[] = ['info', 'log', 'warn', 'error']
  prefix: string = 'Logger'
  _disabled: boolean
  _level: number
  constructor(options?: LoggerOptions) {
    this.disabled = options?.disabled ?? false
    this.level = options?.level ?? 0
    options?.prefix && (this.prefix = options?.prefix)
  }

  set disabled(v: boolean) {
    this._disabled = v
  }

  get disabled() {
    return this._disabled
  }

  set level(level: number) {
    this._level = level
  }
  get level() {
    return this._level
  }

  info: (actions: string, ...data: any[]) => void
  log: (actions: string, ...data: any[]) => void
  warn: (actions: string, ...data: any[]) => void
  error: (actions: string, ...data: any[]) => void
  static get(options?: LoggerOptions) {
    return new Logger(options)
  }
}

Logger.methods.forEach((level) => {
  Logger.prototype[level] = function (action: string, ...data: any[]) {
    if (this.disabled) return
    if (this.level === 3 && level !== 'error') return
    if (this.level === 2 && ['log', 'info'].includes(level)) return
    if (this.level === 1 && level === 'info') return
    const message = `[${action}}][${dayjs().format('YYYY-MM-DD HH:mm:ss')}]`
    Logger.console[level](message, ...data)
  }
})

export default Logger
