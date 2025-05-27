import Logger, { LoggerOptions } from './logger'

export type LoggerLevel = 'info' | 'log' | 'warn' | 'error'

export interface Tracks {
  action: string
  data: any[]
  user: User
}

export interface User {
  id: string
}

class LoggerWithTrack extends Logger {
  static tracks: Tracks[] = []
  user: User
  token: string
  constructor(options?: LoggerOptions) {
    super(options)
    this._initToken()
  }

  setUser(user: User) {
    this.user = user
  }

  _initToken() {
    if (!window.localStorage) throw 'window.localStorage is undefined'
    this.token = localStorage.getItem('LoggerWithTrackToken') ?? ''
    if (!this.token) {
      this.token = this._uuid()
      localStorage.setItem('LoggerWithTrackToken', this.token)
    }
  }

  _uuid() {
    let d = new Date().getTime()
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        const r = (d + Math.random() * 16) % 16 | 0
        d = Math.floor(d / 16)
        return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16)
      },
    )
  }
}

export default LoggerWithTrack
