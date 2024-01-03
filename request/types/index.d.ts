import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { Config, Interceptor, ReturnData } from './propsType';
export * as Interceptor from './interceptors';
export declare const initConfig: (config: Config, callback?: ((axiosInstance: AxiosInstance) => void) | undefined) => void;
/** 添加拦截器 */
export declare const addInterceptors: (interceptors: Interceptor | Interceptor[]) => void;
/** response 数据预处理 */
export declare const data: <D = unknown>(data: ReturnData<D>) => Promise<D>;
export declare const compile: <D extends object>(path: string, params?: D | undefined) => string;
export declare const toast: <D>(data: ReturnData<D>) => Promise<D>;
export declare const post: <T, D = unknown>(url: string, data?: D | undefined, config?: AxiosRequestConfig<unknown>) => Promise<T>;
export declare const get: <T, D = unknown>(url: string, params?: D | undefined, config?: AxiosRequestConfig<unknown>) => Promise<T>;
declare const _default: AxiosInstance;
export default _default;
