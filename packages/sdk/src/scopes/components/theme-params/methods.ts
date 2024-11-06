import {
  off,
  on,
  TypedError,
  camelToKebab,
  getStorageValue,
  setStorageValue,
  retrieveLaunchParams,
  deleteCssVar,
  setCssVar,
  type EventListener,
  type RGB,
  type ThemeParams,
} from '@telegram-apps/bridge';
import { isPageReload } from '@telegram-apps/navigation';

import { ERR_VARS_ALREADY_BOUND } from '@/errors.js';
import {
  createWrapSafeMounted
} from '@/scopes/toolkit/createWrapSafeMounted.js';

import { isCssVarsBound, state, isMounted } from './signals.js';
import { parseThemeParams } from './parseThemeParams.js';
import type { GetCssVarNameFn } from './types.js';

type StorageValue = ThemeParams;

const COMPONENT_NAME = 'themeParams';
const THEME_CHANGED_EVENT = 'theme_changed';

const wrapSafe = createWrapSafeMounted(COMPONENT_NAME, isMounted);

/**
 * Creates CSS variables connected with the current theme parameters.
 *
 * By default, created CSS variables names are following the pattern "--tg-theme-{name}", where
 * {name} is a theme parameters key name converted from camel case to kebab case.
 *
 * Default variables:
 * - `--tg-theme-bg-color`
 * - `--tg-theme-secondary-text-color`
 *
 * Variables are being automatically updated if theme parameters were changed.
 *
 * @param getCSSVarName - function, returning complete CSS variable name for the specified
 * theme parameters key.
 * @returns Function to stop updating variables.
 * @throws {TypedError} ERR_UNKNOWN_ENV
 * @throws {TypedError} ERR_VARS_ALREADY_BOUND
 * @throws {TypedError} ERR_NOT_MOUNTED
 * @example
 * if (bindCssVars.isAvailable()) {
 *   bindCssVars();
 * }
 */
export const bindCssVars = wrapSafe(
  'bindCssVars',
  (getCSSVarName?: GetCssVarNameFn): VoidFunction => {
    if (isCssVarsBound()) {
      throw new TypedError(
        ERR_VARS_ALREADY_BOUND,
        'CSS variables are already bound',
      );
    }
    getCSSVarName ||= (prop) => `--tg-theme-${camelToKebab(prop)}`;

    function forEachEntry(fn: (key: string, value: RGB) => void): void {
      Object.entries(state()).forEach(([k, v]) => {
        v && fn(k, v);
      });
    }

    function actualize(): void {
      forEachEntry((k, v) => {
        setCssVar(getCSSVarName!(k), v);
      });
    }

    actualize();
    state.sub(actualize);
    isCssVarsBound.set(true);

    return () => {
      forEachEntry(deleteCssVar);
      state.unsub(actualize);
      isCssVarsBound.set(false);
    };
  },
);

/**
 * Mounts the component.
 *
 * This function restores the component state and is automatically saving it in the local storage
 * if it changed.
 * @example
 * mount();
 */
export function mount(): void {
  if (!isMounted()) {
    on(THEME_CHANGED_EVENT, onThemeChanged);
    state.set(isPageReload() && getStorageValue<StorageValue>(COMPONENT_NAME) || retrieveLaunchParams().themeParams);
    isMounted.set(true);
  }
}

/**
 * Actualizes the theme parameters whenever an according event was received.
 * @param e - event data.
 */
const onThemeChanged: EventListener<'theme_changed'> = (e) => {
  const value = parseThemeParams(e.theme_params);
  state.set(value);
  setStorageValue<StorageValue>(COMPONENT_NAME, value);
};

/**
 * Unmounts the component, removing the listener, saving the component state in the local storage.
 * @example
 * unmount();
 */
export function unmount(): void {
  off(THEME_CHANGED_EVENT, onThemeChanged);
  isMounted.set(false);
}
