export interface Listener<D = unknown> {
  (...params: D[]): unknown;
}

export interface Handle {
  handle: Listener;
  once: boolean;
  eventName: string;
}

export type Listeners = Record<string, Record<string, Handle>>;
