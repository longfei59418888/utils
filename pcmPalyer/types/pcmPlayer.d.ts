/// <reference types="node" />
/// <reference types="node" />
import { PcmPlayerOptions } from './propsType';
declare class PCMPlayer {
    option: PcmPlayerOptions;
    samples: Float32Array;
    audioCtx: AudioContext;
    gainNode: GainNode;
    interval: NodeJS.Timer;
    state: 'INIT' | 'RUNNING' | 'SUSPEND';
    startTime: number;
    endTimer: NodeJS.Timer;
    maxValue: number;
    typedArray: any;
    constructor(options: PcmPlayerOptions);
    createContext(): void;
    start(): void;
    pause(): void;
    feed(data: any): void;
    flush(): void;
    getFormatValue(source: Buffer): Float32Array;
    isTypedArray(data: any): any;
    volume(volume: number): void;
    destroy(): void;
    getMaxValue(): number;
    getTypedArray(): Int8ArrayConstructor | Int16ArrayConstructor | Int32ArrayConstructor | Float32ArrayConstructor;
}
export default PCMPlayer;
