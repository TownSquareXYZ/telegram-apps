import { off, on } from '@/bridge/events/listening.js';
import { isPageReload } from '@/navigation/isPageReload.js';
import { getStorageValue, setStorageValue } from '@/storage/storage.js';
import { decorateWithIsSupported, type WithIsSupported } from '@/scopes/decorateWithIsSupported.js';
import { postEvent } from '@/scopes/globals/globals.js';
import type { EventListener } from '@/bridge/events/types.js';
import type { RemoveEventListenerFn } from '@/events/types.js';

import * as _ from './private.js';

/*
 * fixme
 * @see Usage: https://docs.telegram-mini-apps.com/platform/back-button
 * @see API: https://docs.telegram-mini-apps.com/packages/telegram-apps-sdk/components/back-button
 */

const MINI_APPS_METHOD = 'web_app_setup_back_button';
const CLICK_EVENT = 'back_button_pressed';
const STORAGE_KEY = 'backButton';

/**
 * Hides the back button.
 */
const hide: WithIsSupported<() => void> = decorateWithIsSupported(() => {
  _.isVisible.set(false);
}, MINI_APPS_METHOD);

/**
 * Mounts the component.
 */
function mount(): void {
  if (!_.isMounted()) {
    _.isVisible.set(isPageReload() && getStorageValue(STORAGE_KEY) || false);
    _.isVisible.sub(onStateChanged);
    _.isMounted.set(true);
  }
}

function onStateChanged(isVisible: boolean) {
  postEvent()(MINI_APPS_METHOD, { is_visible: isVisible });
  setStorageValue(STORAGE_KEY, isVisible);
}

/**
 * Add a new back button click listener.
 * @param fn - event listener.
 * @returns A function to remove bound listener.
 */
function onClick(fn: EventListener<'back_button_pressed'>): RemoveEventListenerFn {
  return on(CLICK_EVENT, fn);
}

/**
 * Removes the back button click listener.
 * @param fn - an event listener.
 */
function offClick(fn: EventListener<'back_button_pressed'>): void {
  off(CLICK_EVENT, fn);
}

/**
 * Shows the back button.
 */
const show: WithIsSupported<() => void> = decorateWithIsSupported(() => {
  _.isVisible.set(true);
}, MINI_APPS_METHOD);

/**
 * Unmounts the component.
 */
function unmount() {
  _.isVisible.unsub(onStateChanged);
  _.isMounted.set(false);
}

export {
  hide,
  mount,
  onClick,
  offClick,
  show,
  unmount,
};
export {
  isVisible,
  isMounted,
} from './computed.js';