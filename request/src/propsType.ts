import Axios, { CreateAxiosDefaults } from 'axios'

export interface ReturnData<D> {
  code: number
  msg: string
  data: D
}

export interface LoginInterceptorConfig {
  STORAGE_LOGIN_KEY?: string
  PAGE_LOGIN?: string
  NETWORK_ERROR_TIP?: string
  ERROR_LOGIN_CODE?: number
}

export interface Config extends CreateAxiosDefaults {
  IS_DEBUG?: boolean
  message?: (dataMessage: string) => unknown
  interceptors?: Interceptor | Interceptor[]
  dataInterceptor?: boolean
  loginInterceptorConfig?: LoginInterceptorConfig
}

export type Params<F> = F extends (params: infer R) => unknown ? R : unknown

export type Interceptor = (params: typeof Axios.interceptors) => void
