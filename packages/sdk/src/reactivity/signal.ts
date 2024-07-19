import { registerGet } from '@/reactivity/context.js';
import type { ListenerFn, TrackReactiveUnitFn, UntrackReactiveUnitFn } from '@/reactivity/types.js';

/**
 * Represents the lowest level reactivity unit.
 */
export type Signal<T> = [
  /**
   * Returns the underlying signal value.
   */
  get: () => T,
  /**
   * Updates the signal notifying all subscribers about changes.
   * @param value - value to set.
   */
  set: (value: T) => void,
  /**
   * Adds a new listener, tracking the signal changes.
   */
  track: TrackReactiveUnitFn<T>,
  /**
   * Removes a listener, tracking the signal changes.
   */
  untrack: UntrackReactiveUnitFn<T>,
  /**
   * Removes all listeners.
   */
  untrackAll: () => void,
];

/**
 * Creates a new signal without value.
 */
export function signal<T>(): Signal<T | undefined>;
/**
 * Creates a new signal with the initial value.
 * @param initialValue - initial value.
 */
export function signal<T>(initialValue: T): Signal<T>;
export function signal<T>(initialValue?: T): Signal<T> {
  const listeners = new Map<symbol, ListenerFn<T>>();
  let value: T = initialValue as T;

  function track(fn: ListenerFn<T>): () => void {
    listeners.set(Symbol(), fn);
    return () => untrack(fn);
  }

  function untrack(fn: ListenerFn<T>): void {
    for (const [key, listener] of listeners.entries()) {
      if (listener === fn) {
        listeners.delete(key);
        return;
      }
    }
  }

  return [
    function get() {
      registerGet(track);
      return value;
    },
    function set(v) {
      if (value !== v) {
        value = v;
        listeners.forEach(l => l(v));
      }
    },
    track,
    untrack,
    function untrackAll() {
      listeners.clear();
    },
  ];
}
