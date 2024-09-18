import {
  supports,
  on,
  off,
  TypedError,
  CancelablePromise,
  getStorageValue,
  setStorageValue,
  type BiometryTokenUpdateStatus,
  type EventListener,
} from '@telegram-apps/bridge';
import { isPageReload } from '@telegram-apps/navigation';

import { withIsSupported } from '@/scopes/withIsSupported.js';
import { $version, postEvent, request } from '@/scopes/globals/globals.js';
import { createMountFn } from '@/scopes/createMountFn.js';
import { ERR_ALREADY_CALLED, ERR_NOT_AVAILABLE } from '@/errors.js';

import {
  state,
  mountError,
  isMounted,
} from './signals.js';
import { authenticatePromise, mountPromise, requestAccessPromise } from './private.js';
import * as BiometryManager from './static.js';
import { eventToState } from './eventToState.js';
import type {
  State,
  AuthenticateOptions,
  RequestAccessOptions,
  UpdateTokenOptions,
} from './types.js';

type StorageValue = State;

const REQUEST_AUTH_METHOD = 'web_app_biometry_request_auth';
const REQUEST_ACCESS_METHOD = 'web_app_biometry_request_access';
const OPEN_SETTINGS_METHOD = 'web_app_biometry_open_settings';
const UPDATE_TOKEN_METHOD = 'web_app_biometry_update_token';
const BIOMETRY_INFO_RECEIVED_EVENT = 'biometry_info_received';

/**
 * Attempts to authenticate a user using biometrics and fetch a previously stored
 * secure token.
 * @param options - method options.
 * @since 7.2
 * @returns Token from the local secure storage saved previously or undefined.
 * @throws {TypedError} ERR_ALREADY_CALLED
 * @throws {TypedError} ERR_NOT_AVAILABLE
 */
export const authenticate = withIsSupported(
  (options?: AuthenticateOptions): CancelablePromise<string | undefined> => {
    if (authenticatePromise()) {
      return CancelablePromise.reject(new TypedError(ERR_ALREADY_CALLED));
    }

    const s = state();
    if (!s || !s.available) {
      return CancelablePromise.reject(new TypedError(ERR_NOT_AVAILABLE));
    }

    options ||= {};
    const promise = request(REQUEST_AUTH_METHOD, 'biometry_auth_requested', {
      ...options,
      params: { reason: (options.reason || '').trim() },
    })
      .then(({ token }) => {
        if (typeof token === 'string') {
          state.set({ ...s, token });
        }
        return token;
      })
      .finally(() => {
        authenticatePromise.set(undefined);
      });
    authenticatePromise.set(promise);

    return promise;
  }, REQUEST_AUTH_METHOD,
);

/**
 * @returns True if biometry manager is supported.
 */
export function isSupported(): boolean {
  return supports(REQUEST_AUTH_METHOD, $version());
}

/**
 * Opens the biometric access settings for bots. Useful when you need to request biometrics
 * access to users who haven't granted it yet.
 *
 * _Note that this method can be called only in response to user interaction with the Mini App
 * interface (e.g. a click inside the Mini App or on the main button)_.
 * @since 7.2
 */
export const openSettings = withIsSupported(() => {
  postEvent(OPEN_SETTINGS_METHOD);
}, OPEN_SETTINGS_METHOD);

/**
 * Requests permission to use biometrics.
 * @since 7.2
 * @returns Promise with true, if access was granted.
 * @throws {TypedError} ERR_ALREADY_CALLED
 * @throws {TypedError} ERR_NOT_AVAILABLE
 */
export const requestAccess = withIsSupported(
  (options?: RequestAccessOptions): CancelablePromise<boolean> => {
    if (requestAccessPromise()) {
      return CancelablePromise.reject(new TypedError(ERR_ALREADY_CALLED));
    }

    options ||= {};
    const promise = request(REQUEST_ACCESS_METHOD, BIOMETRY_INFO_RECEIVED_EVENT, {
      ...options,
      params: { reason: options.reason || '' },
    })
      .then(eventToState)
      .then((info) => {
        if (!info.available) {
          throw new TypedError(ERR_NOT_AVAILABLE);
        }
        state.set(info);
        return info.accessGranted;
      })
      .finally(() => {
        requestAccessPromise.set(undefined);
      });

    requestAccessPromise.set(promise);

    return promise;
  }, REQUEST_ACCESS_METHOD,
);

/**
 * Mounts the component.
 */
export const mount = createMountFn<State>(
  (options) => {
    // May be not supported.
    if (!isSupported()) {
      return { available: false };
    }

    // Try to restore the state using the storage.
    const s = isPageReload() && getStorageValue<StorageValue>('biometryManager');
    if (s) {
      return s;
    }

    // We were unable to retrieve data locally. In this case, we are sending a request returning
    // the biometry information.
    options.timeout ||= 1000;
    return BiometryManager.request(options);
  },
  result => {
    on(BIOMETRY_INFO_RECEIVED_EVENT, onBiometryInfoReceived);
    state.sub(onStateChanged);
    state.set(result);
  },
  { isMounted, mountError, mountPromise },
);

const onBiometryInfoReceived: EventListener<'biometry_info_received'> = e => {
  state.set(eventToState(e));
};

function onStateChanged(s: State | undefined) {
  s && setStorageValue<StorageValue>('biometryManager', s);
}

/**
 * Unmounts the component.
 */
export function unmount(): void {
  off(BIOMETRY_INFO_RECEIVED_EVENT, onBiometryInfoReceived);
  state.unsub(onStateChanged);
}

/**
 * Updates the biometric token in a secure storage on the device.
 * @since 7.2
 * @returns Promise with `true`, if token was updated.
 */
export const updateToken = withIsSupported(
  (options?: UpdateTokenOptions): CancelablePromise<BiometryTokenUpdateStatus> => {
    options ||= {};
    return request(UPDATE_TOKEN_METHOD, 'biometry_token_updated', {
      ...options,
      params: {
        token: options.token || '',
        reason: options.reason,
      },
    }).then(r => r.status);
  }, UPDATE_TOKEN_METHOD,
);
