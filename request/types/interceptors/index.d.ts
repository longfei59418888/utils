import Axios from 'axios';
import { LoginInterceptorConfig } from '../propsType';
/** 添加跳过token检查的api接口 */
export declare const addApiSkipInterceptor: (path: string) => number;
/** 移除跳过token检查的api接口 */
export declare const removeApiSkipInterceptor: (path: string) => void;
export declare const loginInterceptor: ({ STORAGE_LOGIN_KEY, PAGE_LOGIN, NETWORK_ERROR_TIP, ERROR_LOGIN_CODE, }: LoginInterceptorConfig) => ({ request, response }: typeof Axios.interceptors) => void;
export declare const dataInterceptorResponse: ({ response, }: typeof Axios.interceptors) => void;
export declare const logInterceptorRequest: ({ request, }: typeof Axios.interceptors) => void;
export declare const logInterceptorResponse: ({ response, }: typeof Axios.interceptors) => void;
