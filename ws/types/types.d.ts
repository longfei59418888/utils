export interface WsOption {
    protocols?: string | string[];
    reConnectTime?: number;
    /** ping 循环时间 */
    pingTime?: number;
    /** pong 超时时间 */
    timeout?: number;
    autoPing?: boolean;
    /** ping 的数据 */
    ping?: unknown;
    /** pong 的数据 */
    pong?: unknown;
    formatData?: (event: MessageEvent) => MessageEvent;
}
