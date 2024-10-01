import { isPageReload } from '@telegram-apps/navigation';
import { getStorageValue, setStorageValue } from '@telegram-apps/toolkit';

import { $postEvent } from '@/scopes/globals/globals.js';
import { withIsSupported, type WithIsSupported } from '@/scopes/withIsSupported.js';

import { isMounted, isVerticalSwipesEnabled } from './signals.js';

/*
 * fixme
 * @see Usage: https://docs.telegram-mini-apps.com/platform/swipe-behavior
 * @see API: https://docs.telegram-mini-apps.com/packages/telegram-apps-sdk/components/swipe-behavior
 */

type StorageValue = boolean;

const MINI_APPS_METHOD = 'web_app_setup_swipe_behavior';
const STORAGE_KEY = 'swipeBehavior';

/**
 * Disables vertical swipes.
 */
export const disableVerticalSwipes: WithIsSupported<() => void> = withIsSupported(() => {
  isVerticalSwipesEnabled.set(false);
}, MINI_APPS_METHOD);

/**
 * Enables vertical swipes.
 */
export const enableVerticalSwipes: WithIsSupported<() => void> = withIsSupported(() => {
  isVerticalSwipesEnabled.set(true);
}, MINI_APPS_METHOD);

/**
 * Mounts the component.
 *
 * This function restores the component state and is automatically saving it in the local storage
 * if it changed.
 */
export function mount(): void {
  if (!isMounted()) {
    isVerticalSwipesEnabled.set(isPageReload() && getStorageValue<StorageValue>(STORAGE_KEY) || false);
    isVerticalSwipesEnabled.sub(onStateChanged);
    isMounted.set(true);
  }
}

function onStateChanged(value: boolean): void {
  $postEvent()(MINI_APPS_METHOD, { allow_vertical_swipe: value });
  setStorageValue<StorageValue>(STORAGE_KEY, value);
}

/**
 * Unmounts the component, removing the listener, saving the component state in the local storage.
 */
export function unmount(): void {
  isVerticalSwipesEnabled.unsub(onStateChanged);
  isMounted.set(false);
}
