import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { compile as compilePath } from 'path-to-regexp'

import {
  dataInterceptorResponse,
  loginInterceptor,
  logInterceptorRequest,
  logInterceptorResponse,
} from './interceptors'
import { Config, Interceptor, ReturnData } from './propsType'

export * as Const from './const'
export * as Interceptor from './interceptors'

let axiosInstance: AxiosInstance
let configs: Config
export const initConfig = (
  config: Config,
  callback?: (axiosInstance: AxiosInstance) => void,
) => {
  configs = config
  const {
    IS_DEBUG = false,
    dataInterceptor = true,
    loginInterceptorConfig,
    interceptors,
    ...params
  } = config
  axiosInstance = axios.create({
    timeout: 60000,
    ...params,
  })
  /*
   * loginInterceptorRequest
   * addInterceptorsRequests
   * logInterceptorRequest
   *
   * logInterceptorResponse
   * loginInterceptorResponse
   * addInterceptorsResponse
   *
   * */
  if (IS_DEBUG) addInterceptors(logInterceptorResponse)

  loginInterceptorConfig &&
    addInterceptors(loginInterceptor(loginInterceptorConfig))
  dataInterceptor && addInterceptors(dataInterceptorResponse)
  interceptors && addInterceptors(interceptors)
  if (IS_DEBUG) addInterceptors(logInterceptorRequest)
  callback?.(axiosInstance)
}

/** 添加拦截器 */
export const addInterceptors = (interceptors: Interceptor | Interceptor[]) => {
  if (!axiosInstance) throw '请执行 initConfig'
  if (Array.isArray(interceptors))
    interceptors.forEach((interceptor) =>
      interceptor(axiosInstance.interceptors),
    )
  else interceptors(axiosInstance.interceptors)
}

/** response 数据预处理 */
export const data = async <D = unknown>(data: ReturnData<D>): Promise<D> =>
  data.data
export const compile = <D extends object>(path: string, params?: D): string => {
  if (params) {
    path = compilePath(path)(params)
  }
  return path
}
export const toast = async <D>(data: ReturnData<D>): Promise<D> => {
  configs?.message?.(data.msg)
  return Promise.reject(data.data)
}

export const post = async <T, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig<unknown> & { signalName?: string },
): Promise<T> => axiosInstance.post(url, data, config)

export const get = async <T, D = unknown>(
  url: string,
  params?: D,
  config?: AxiosRequestConfig<unknown> & { signalName?: string },
): Promise<T> =>
  axiosInstance.get(url, {
    params,
    ...config,
  })

export default new Proxy<AxiosInstance>({} as AxiosInstance, {
  get(_target: AxiosInstance, p: string | symbol, receiver: any): any {
    return Reflect.get(axiosInstance ?? _target, p, receiver)
  },
})
