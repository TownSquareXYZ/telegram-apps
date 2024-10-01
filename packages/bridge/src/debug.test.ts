import { beforeEach, describe, expect, it, vi } from 'vitest';
import { dispatchMiniAppsEvent } from 'test-utils';

import { resetPackageState } from '@test-utils/resetPackageState.js';

import { debugLog, setDebug } from './debug.js';

beforeEach(() => {
  vi.restoreAllMocks();
  resetPackageState();
});

describe('setDebug', () => {
  it('should output Mini Apps event log in console if debug mode is enabled', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => null);
    setDebug(true)
    dispatchMiniAppsEvent('back_button_pressed');
    expect(spy).toHaveBeenCalledOnce();
    expect(spy).toHaveBeenCalledWith(
      expect.anything(),
      expect.anything(),
      expect.anything(),
      expect.anything(),
      'Event received:',
      { name: 'back_button_pressed' },
    );
    spy.mockClear();

    setDebug(false);
    dispatchMiniAppsEvent('back_button_pressed');
    expect(spy).not.toHaveBeenCalled();
  });
});

describe('debugLog', () => {
  it('should output log in console if debug mode is enabled', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => null);
    setDebug(true);
    debugLog('abc');

    expect(spy).toHaveBeenCalledOnce();
    expect(spy).toHaveBeenCalledWith(
      expect.anything(),
      expect.anything(),
      expect.anything(),
      expect.anything(),
      'abc',
    );
    spy.mockClear();

    setDebug(false);
    debugLog('abc');
    expect(spy).not.toHaveBeenCalled();
  });
});
