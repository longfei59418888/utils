import { Listener, Listeners } from "./types";
declare class Events {
    listeners: Listeners;
    emit(eventName: string, ...args: unknown[]): void;
    off(eventName: string): void;
    on<D>(eventName: string, listener: Listener<D>): void;
    once(eventName: string, listener: Listener): void;
    addListener(eventName: string, listener: Listener, once?: boolean): void;
    removeListener(eventName: string): void;
}
export declare const events: Events;
export default Events;
