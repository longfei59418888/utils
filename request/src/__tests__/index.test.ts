import { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import nock from 'nock'

import mockLocalStorage from '../../../jest/mocks/localstrage'
import mockLocation from '../../../jest/mocks/location'
import request, { compile, data, get, initConfig, post, toast } from '../index'
import {
  addApiSkipInterceptor,
  removeApiSkipInterceptor,
} from '../interceptors'

const baseURL = 'http://127.0.0.1:8090'
const testPath = '/user'
const testParams = {
  name: 'xlong',
  age: 18,
}
const testResult = {
  user: {
    id: 'abc-123',
    name: 'xlong',
  },
}
const PAGE_LOGIN = '/login'
const API_LOGIN = '/login'
const ERROR_LOGIN_CODE = 401

describe('utils/request', () => {
  const logFn = jest.fn()
  beforeAll(() => {
    mockLocalStorage({
      ['STORAGE_LOGIN_KEY']: null,
    })
    Object.defineProperty(globalThis, 'console', {
      value: {
        log: logFn,
      },
      writable: true,
    })
  })

  it('utils/request initConfig ', function () {
    const callbackFn = jest.fn()
    expect(request.defaults).toBeUndefined()
    initConfig(
      {
        baseURL,
      },
      callbackFn,
    )
    expect(callbackFn).toBeCalled()
    expect(request.defaults.baseURL).toEqual(baseURL)
  })

  it('utils/request enable debug ', async () => {
    nock(baseURL).get(testPath).query(testParams).reply(200, {
      data: testResult,
    })
    initConfig({
      baseURL,
      IS_DEBUG: true,
    })
    const result: AxiosResponse = await get(testPath, testParams)
    expect(result.data).toEqual(testResult)
    expect(logFn).toHaveBeenNthCalledWith(
      1,
      ...['REQUEST:', 'get', testPath, testParams],
    )
    expect(logFn).toHaveBeenNthCalledWith(
      2,
      ...['RESPONSE:', 'get', testPath, { data: testResult }],
    )
  })

  it('utils/request enable loginCheck and data format ', async () => {
    const setHref = jest.fn()
    mockLocalStorage({
      ['STORAGE_LOGIN_KEY']: null,
    })
    mockLocation('href', setHref)
    nock(baseURL).get(testPath).query(testParams).reply(200, {
      data: testResult,
    })
    initConfig({
      baseURL,
      IS_DEBUG: true,
      loginInterceptorConfig: {
        PAGE_LOGIN,
        ERROR_LOGIN_CODE,
      },
    })
    const result: any = await get(testPath, testParams).catch((err) => err)
    expect(setHref).toBeCalledWith(PAGE_LOGIN)
    expect(result).toEqual({ msg: 'token 不存在' })
    mockLocalStorage({
      ['STORAGE_LOGIN_KEY']: 'STORAGE_LOGIN_KEY',
    })
    nock(baseURL).get(testPath).reply(ERROR_LOGIN_CODE, {})
    const result2: any = await get(testPath).catch((err) => err)
    expect(setHref).toHaveBeenNthCalledWith(2, PAGE_LOGIN)
    expect(result2).toEqual({ msg: '登陆过期' })
    nock(baseURL).get(testPath).reply(200, {
      data: testResult,
    })
    const result3: any = await get<any>(testPath)
      .then(data)
      .catch((err) => err)
    expect(setHref).toBeCalledTimes(2)
    expect(result3).toEqual(testResult)
  })

  it('utils/request  addInterceptors', async () => {
    const interceptorOneFn = jest.fn()
    const interceptorTwoFn = jest.fn()
    mockLocalStorage({
      ['STORAGE_LOGIN_KEY']: 'STORAGE_LOGIN_KEY',
    })
    nock(baseURL).post(API_LOGIN).reply(200, {
      data: testResult,
    })
    const interceptorOne = ({ request }: any) => {
      request.use(
        async (config: InternalAxiosRequestConfig) => {
          interceptorOneFn(config.url)
          return config
        },
        async (error: AxiosResponse) => Promise.reject(error),
      )
    }
    const interceptorTwo = ({ response }: any) => {
      response.use(
        (response: AxiosResponse) => {
          return response
        },
        async (response: any) => {
          interceptorTwoFn(response)
          return Promise.reject(response)
        },
      )
    }
    initConfig({
      baseURL,
      IS_DEBUG: true,
      interceptors: [interceptorOne, interceptorTwo],
      loginInterceptorConfig: {
        PAGE_LOGIN,
        ERROR_LOGIN_CODE,
      },
    })
    await post<any>(API_LOGIN)
      .then(data)
      .catch((err) => err)
    expect(interceptorOneFn).toBeCalledWith(API_LOGIN)
    expect(interceptorTwoFn).toBeCalledTimes(0)
    nock(baseURL).post(API_LOGIN).reply(501, {
      data: testResult,
    })
    await post<any>(API_LOGIN)
      .then(data)
      .catch((err) => err)
    expect(interceptorOneFn).toBeCalledTimes(2)
    expect(interceptorTwoFn).toBeCalledTimes(1)
  })

  it('utils/request  add addApiSkipInterceptor/removeApiSkipInterceptor path', async () => {
    const setHref = jest.fn()
    mockLocalStorage({
      ['STORAGE_LOGIN_KEY']: null,
    })
    mockLocation('href', setHref)
    nock(baseURL).post(API_LOGIN).reply(200, {
      data: testResult,
    })
    initConfig({
      baseURL,
      IS_DEBUG: true,
      loginInterceptorConfig: {
        PAGE_LOGIN,
        ERROR_LOGIN_CODE,
      },
    })
    addApiSkipInterceptor(API_LOGIN)
    const result: any = await post<any>(API_LOGIN)
      .then(data)
      .catch((err) => err)
    expect(setHref).toBeCalledTimes(0)
    expect(result).toEqual(testResult)

    removeApiSkipInterceptor(API_LOGIN)
    const result2: any = await post<any>(API_LOGIN)
      .then(data, toast)
      .catch((err) => err)
    expect(setHref).toBeCalledTimes(1)
    expect(result2).toBeUndefined()
  })

  it('utils/request  post add', async () => {
    mockLocalStorage({
      ['STORAGE_LOGIN_KEY']: 'STORAGE_LOGIN_KEY',
    })
    nock(baseURL).post(testPath).reply(405, {
      data: testResult,
      code: 405,
    })
    initConfig({
      baseURL,
      IS_DEBUG: true,
      loginInterceptorConfig: {
        PAGE_LOGIN,
        ERROR_LOGIN_CODE,
      },
    })
    const result: any = await post<any>(API_LOGIN)
      .then(data)
      .catch((err) => err)
    expect(result).toEqual({ msg: '请求失败...' })
  })

  it('utils/request compile', async () => {
    const url = compile('test/:id', { id: 12 })
    expect(url).toEqual('test/12')
  })
})
