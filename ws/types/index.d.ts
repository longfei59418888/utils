/// <reference types="node" />
import { WsOption } from './types';
import Events from '@xlong/events';
declare const defaultOption: {
    pingTime: number;
    timeout: number;
    reConnectTime: number;
};
declare class WS extends Events {
    static CONNECTING: number;
    static OPEN: number;
    static CLOSING: number;
    static CLOSED: number;
    static CLOSED_HEALTH_CODE: number;
    url: string;
    option: WsOption & typeof defaultOption;
    ws?: WebSocket;
    pingTimer?: NodeJS.Timeout;
    autoPingTimer?: NodeJS.Timeout;
    PongOutTimer?: NodeJS.Timeout;
    queues: Array<string | ArrayBufferLike | Blob | ArrayBufferView>;
    constructor(url: string, option?: WsOption);
    socket(): void;
    private initEvents;
    private ping;
    send(data: string | ArrayBufferLike | Blob | ArrayBufferView): void;
    close(code?: number, reason?: string): void;
    private checkQueues;
    get bufferedAmount(): number | undefined;
    get readyState(): number | undefined;
    set binaryType(binaryType: BinaryType);
    get binaryType(): BinaryType;
    get extensions(): string | undefined;
    get protocol(): string | undefined;
    static getWS(url: string, option?: WsOption): WS;
}
export default WS;
