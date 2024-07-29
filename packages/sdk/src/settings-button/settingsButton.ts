import { on } from '@/bridge/events/listening/on.js';
import { off } from '@/bridge/events/listening/off.js';
import { isPageReload } from '@/navigation/isPageReload.js';
import { getStorageValue, setStorageValue } from '@/storage/storage.js';
import { decorateWithSupports } from '@/components/decorateWithSupports.js';
import { postEvent } from '@/components/globals.js';
import { signal } from '@/signals/signal/signal.js';
import type { MiniAppsEventListener } from '@/bridge/events/types.js';
import type { RemoveEventListenerFn } from '@/events/types.js';

/*
 * fixme
 * @see Usage: https://docs.telegram-mini-apps.com/platform/settings-button
 * @see API: https://docs.telegram-mini-apps.com/packages/telegram-apps-sdk/components/settings-button
 */

const MINI_APPS_METHOD = 'web_app_setup_settings_button';
const CLICK_EVENT = 'settings_button_pressed';

export const isVisible = signal(false, {
  set(s, value) {
    if (s() !== value) {
      postEvent()(MINI_APPS_METHOD, { is_visible: value });
      setStorageValue('settingsButton', { isVisible: value });
    }
    s.set(value);
  },
});

/**
 * Hides the settings button.
 */
export const hide = decorateWithSupports((): void => isVisible.set(false), MINI_APPS_METHOD);

/**
 * Add a new settings button click listener.
 * @param fn - event listener.
 * @returns A function to remove bound listener.
 */
export function onClick(fn: MiniAppsEventListener<'settings_button_pressed'>): RemoveEventListenerFn {
  return on(CLICK_EVENT, fn);
}

/**
 * Removes the settings button click listener.
 * @param fn - an event listener.
 */
export function offClick(fn: MiniAppsEventListener<'settings_button_pressed'>): void {
  off(CLICK_EVENT, fn);
}

/**
 * Restores the settings button state using previously saved one in the local storage.
 */
export function restore(): void {
  isVisible.set((isPageReload() && getStorageValue('settingsButton') || { isVisible: false }).isVisible);
}

/**
 * Shows the settings button.
 */
export const show = decorateWithSupports((): void => isVisible.set(true), MINI_APPS_METHOD);