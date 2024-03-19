import Axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { match } from 'path-to-regexp'

import * as Constants from '../const'
import { LoginInterceptorConfig } from '../propsType'

const SKIP_INJECT_TOKEN: string[] = []

/** 添加跳过token检查的api接口 */
export const addApiSkipInterceptor = (path: string) =>
  SKIP_INJECT_TOKEN.push(path)

/** 移除跳过token检查的api接口 */
export const removeApiSkipInterceptor = (path: string) => {
  const index = SKIP_INJECT_TOKEN.indexOf(path)
  if (index !== -1) SKIP_INJECT_TOKEN.splice(index, 1)
}

export const loginInterceptor =
  ({
    STORAGE_LOGIN_KEY = Constants.STORAGE_LOGIN_KEY,
    PAGE_LOGIN,
    NETWORK_ERROR_TIP = '请求失败...',
    ERROR_LOGIN_CODE,
  }: LoginInterceptorConfig) =>
  ({ request, response }: typeof Axios.interceptors) => {
    request.use(
      async (config: InternalAxiosRequestConfig) => {
        if (
          !SKIP_INJECT_TOKEN.some(
            (path) => config.url && match(path)(config.url),
          )
        ) {
          const token = localStorage.getItem(STORAGE_LOGIN_KEY)
          if (!token) {
            PAGE_LOGIN && (location.href = PAGE_LOGIN)
            return Promise.reject({
              msg: 'token 不存在',
              code: Constants.CODE_NO_LOGIN,
            })
          }
          config.headers.Authorization = token
        }
        return config
      },
      async (error: AxiosResponse) => Promise.reject(error),
    )
    response.use(
      (response: AxiosResponse) => response,
      async (error: any) => {
        if (!error.response)
          return Promise.reject({ msg: NETWORK_ERROR_TIP, ...error })
        const { status } = error.response
        if (ERROR_LOGIN_CODE && status === ERROR_LOGIN_CODE) {
          PAGE_LOGIN && (location.href = PAGE_LOGIN)
          return Promise.reject({
            msg: '登陆过期',
            code: Constants.CODE_LOGIN_INVALID,
          })
        }
        return Promise.reject(error)
      },
    )
  }

export const dataInterceptorResponse = ({
  response,
}: typeof Axios.interceptors) => {
  response.use(
    (response: AxiosResponse) => (response.data ? response.data : response),
    async (error: any) => {
      return Promise.reject(error?.response?.data ? error.response.data : error)
    },
  )
}

export const logInterceptorRequest = ({
  request,
}: typeof Axios.interceptors) => {
  request.use(
    async (config: InternalAxiosRequestConfig) => {
      console.log(
        'REQUEST:',
        config.method,
        config?.url,
        config.data || config.params,
      )
      return config
    },
    async (error: AxiosResponse) => Promise.reject(error),
  )
}
export const logInterceptorResponse = ({
  response,
}: typeof Axios.interceptors) => {
  response.use(
    (response: AxiosResponse) => {
      console.log(
        'RESPONSE:',
        response.config.method,
        response.config?.url,
        response.data,
      )
      return response
    },
    async (response: any) => {
      if (!response.status) return Promise.reject(response)
      console.error(
        'RESPONSE:',
        response?.config?.method,
        response?.config?.url,
        response?.status,
        response?.data?.msg,
      )
      return Promise.reject(response)
    },
  )
}
