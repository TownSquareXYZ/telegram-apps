import { beforeEach, describe, expect, it, vi } from 'vitest';

import { EventEmitter } from './EventEmitter.js';

interface EventsMap {
  test: (a: number, b: boolean) => void;
  hey: never;
}

let ee: EventEmitter<EventsMap>;

beforeEach(() => {
  ee = new EventEmitter<EventsMap>();
});

describe('on', () => {
  it('should emit bound listener with specified arguments', () => {
    const listener = vi.fn();
    ee.on('test', listener);
    ee.emit('test', 1, true);
    expect(listener).toHaveBeenCalledOnce();
    expect(listener).toBeCalledWith(1, true);
  });

  it('should emit bound listener with specified arguments as many times as it was bound', () => {
    const listener = vi.fn();
    ee.on('test', listener);
    ee.on('test', listener);
    ee.emit('test', 1, true);
    expect(listener).toHaveBeenCalledTimes(2);
    expect(listener).toHaveBeenNthCalledWith(1, 1, true);
    expect(listener).toHaveBeenNthCalledWith(2, 1, true);
  });

  it('should not emit bound listener in case, event name does not match', () => {
    const listener = vi.fn();
    ee.on('test', listener);
    ee.emit('hey');
    expect(listener).not.toBeCalled();
  });

  it('should remove listener if returned function was called', () => {
    const listener = vi.fn();
    const off = ee.on('test', listener);

    off();
    ee.emit('test', 1, true);
    expect(listener).not.toBeCalled();
  });

  it('should remove listener if "once" argument was passed and listener was called', () => {
    const listener = vi.fn();
    ee.on('test', listener, true);

    ee.emit('test', 1, true);
    ee.emit('test', 2, false);
    expect(listener).toHaveBeenCalledOnce();
  });
});

describe('off', () => {
  it('should not emit bound listener in case, it was unbound', () => {
    const listener = vi.fn();
    ee.on('test', listener);
    ee.off('test', listener);
    ee.emit('test', 1, true);
    expect(listener).not.toBeCalled();
  });

  it('should not do anything in case, event has no listeners', () => {
    expect(() => {
      const listener = vi.fn();
      ee.off('test', listener);
    }).not.toThrow();
  });

  it('should not do anything if received not bound listener', () => {
    ee.on('test', vi.fn());
    expect(() => ee.off('test', vi.fn())).not.toThrow();
  });
});

describe('subscribe', () => {
  it('should catch any emitted event', () => {
    const listener = vi.fn();
    ee.subscribe(listener);
    ee.emit('test', 1, true);
    ee.emit('hey');
    expect(listener).toBeCalledTimes(2);
    expect(listener).toHaveBeenNthCalledWith(1, { event: 'test', args: [1, true] });
    expect(listener).toHaveBeenNthCalledWith(2, { event: 'hey', args: [] });
  });
});

describe('unsubscribe', () => {
  it('should not emit event if it was unbound', () => {
    const listener = vi.fn();
    ee.subscribe(listener);
    ee.unsubscribe(listener);
    ee.emit('test', 1, true);
    expect(listener).not.toBeCalled();
  });

  it('should not do anything if received not bound listener', () => {
    expect(() => ee.unsubscribe(vi.fn())).not.toThrow();
  });
});
