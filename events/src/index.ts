import { Handle, Listener, Listeners } from "./types";

class Events {
  listeners: Listeners = {};

  emit(eventName: string, ...args: unknown[]) {
    const name = eventName.split(".")[0];
    const listeners: Record<string, Handle> = this.listeners[name];
    if (listeners) {
      if (name === eventName) {
        for (const attr in listeners) {
          const handle: Handle = listeners[attr];
          handle.handle(...args);
          if (handle.once) delete this.listeners[name][attr];
        }
      } else if (listeners[eventName]) {
        const handle: Handle = listeners[eventName];
        handle.handle(...args);
        if (handle.once) delete this.listeners[name][eventName];
      }
    }
  }

  off(eventName: string) {
    this.removeListener(eventName);
  }

  on<D>(eventName: string, listener: Listener<D>) {
    this.addListener(eventName, listener as Listener);
  }

  once(eventName: string, listener: Listener) {
    this.addListener(eventName, listener, true);
  }

  addListener(eventName: string, listener: Listener, once = false) {
    const name = eventName.split(".")[0];
    if (!name) throw "eventName 有误，请检查";
    const handle: Handle = {
      handle: listener,
      once,
      eventName
    };
    if (!this.listeners[name]) {
      this.listeners[name] = {
        [eventName]: handle
      };
    } else {
      this.listeners[name][eventName] = handle;
    }
  }

  removeListener(eventName: string) {
    const name = eventName.split(".")[0];
    if (this.listeners[name]) {
      if (eventName === name) delete this.listeners[name];
      else {
        delete this.listeners[name][eventName];
      }
    }
  }
}

export const events = new Events();

export default Events;
