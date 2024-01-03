## @xlong/request

用于请求的封装

#### 安装

```shell
npm install @xlong/request 
yarn add @xlong/request 
pnpm add @xlong/request 
```

#### 使用方法

- 基本用法

```typescript
import request, { compile, data, get, initConfig, post, toast } from '@xlong/request'
// 初始化位置
initConfig({
  baseURL,
  IS_DEBUG: true,
})

//  get/post 请求
const result: AxiosResponse = await get<Data>(path, params)
const result2: AxiosResponse = await post<Data>(path, bodys)
```

- 添加拦截器

```typescript
import request, { compile, data, get, initConfig, post, toast } from '@xlong/request'

const interceptorOne = ({ request }: any) => {
  request.use(
    async (config: InternalAxiosRequestConfig) => {
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
      return Promise.reject(response)
    },
  )
}

initConfig({
  baseURL,
  IS_DEBUG: true,
  // 数据处理
  dataInterceptor: true, // 默认 true
  // 自定义拦截器
  interceptors: [interceptorOne, interceptorTwo],
  // 登陆拦截器，自动判断 token 
  loginInterceptorConfig: {
    PAGE_LOGIN, // 跳转到登陆页面
    ERROR_LOGIN_CODE, // 接口登陆失效 code
    NETWORK_ERROR_TIP, // '请求失败...'
    STORAGE_LOGIN_KEY, // 'STORAGE_LOGIN_KEY'
  },
})
```

- 添加登陆过滤

```typescript
import request, { compile, data, get, initConfig, post, toast } from '@xlong/request'

initConfig({
  baseURL,
  IS_DEBUG: true,
  // 登陆拦截器，自动判断 token 
  loginInterceptorConfig: {
    PAGE_LOGIN, // 跳转到登陆页面
    ERROR_LOGIN_CODE, // 接口登陆失效 code
    NETWORK_ERROR_TIP, // '请求失败...'
    STORAGE_LOGIN_KEY, // 'STORAGE_LOGIN_KEY'
  },
})

// 跳过 API_LOGIN 接口登陆检查
addApiSkipInterceptor(API_LOGIN)

// 移除(跳过 API_LOGIN 接口登陆检查)
removeApiSkipInterceptor(API_LOGIN)




```

- 数据处理和toast提示

```typescript
import request, { compile, data, get, initConfig, post, toast } from "@xlong/request";

initConfig({
  baseURL,
  IS_DEBUG: true,
  message: (dataMessage) => message.toast(dataMessage)
});
// data 返回 response.data
// toast  message.toast(dataMessage)
const result: any = await post(API_LOGIN)
  .then(data, toast)
  .catch((err) => err);



```

#### 方法

- initConfig: (config: Config, callback?: ((axiosInstance: AxiosInstance) => void) | undefined) => void
- data: <D = unknown>(data: ReturnData<D>) => Promise<D>
- compile: <D extends object>(path: string, params?: D | undefined) => string;
- toast: <D>(data: ReturnData<D>) => Promise<D>;
- post: <T, D = unknown>(url: string, data?: D | undefined, config?: AxiosRequestConfig<unknown>) => Promise<T>;
- get: <T, D = unknown>(url: string, params?: D | undefined, config?: AxiosRequestConfig<unknown>) => Promise<T>;

#### 类型

```typescript
import Axios, { CreateAxiosDefaults } from 'axios';

export interface ReturnData<D> {
  code: number;
  msg: string;
  data: D;
}

export interface LoginInterceptorConfig {
  STORAGE_LOGIN_KEY?: string;
  PAGE_LOGIN: string;
  NETWORK_ERROR_TIP?: string;
  ERROR_LOGIN_CODE?: number;
}

export interface Config extends CreateAxiosDefaults {
  IS_DEBUG?: boolean;
  message?: (dataMessage: string) => unknown;
  interceptors?: Interceptor | Interceptor[];
  dataInterceptor?: boolean;
  loginInterceptorConfig?: LoginInterceptorConfig;
}

export type Params<F> = F extends (params: infer R) => unknown ? R : unknown;
export type Interceptor = (params: typeof Axios.interceptors) => void;


```
