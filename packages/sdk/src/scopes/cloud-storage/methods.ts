import { CancelablePromise, type ExecuteWithOptions } from '@telegram-apps/bridge';
import { array, object, string } from '@telegram-apps/transformers';

import { withIsSupported } from '@/scopes/withIsSupported.js';
import { invokeCustomMethod } from '@/scopes/globals/globals.js';

const MINI_APPS_METHOD = 'web_app_invoke_custom_method';

/**
 * Deletes specified key or keys from the cloud storage.
 * @param keyOrKeys - key or keys to delete.
 * @param options - request execution options.
 */
export const deleteItem = withIsSupported((
  keyOrKeys: string | string[],
  options?: ExecuteWithOptions,
): CancelablePromise<void> => {
  const keys = Array.isArray(keyOrKeys) ? keyOrKeys : [keyOrKeys];
  return keys.length
    ? invokeCustomMethod('deleteStorageValues', { keys }, options).then()
    : CancelablePromise.resolve();
}, MINI_APPS_METHOD);

/**
 * @param keys - keys list.
 * @param options - request execution options.
 * @returns Map, where a key is one of the specified in the `keys` argument, and a value is
 * a corresponding storage value.
 */
function _getItem<K extends string>(
  keys: K[],
  options?: ExecuteWithOptions,
): CancelablePromise<Record<K, string>>;

/**
 * @param key - cloud storage key.
 * @param options - request execution options.
 * @return Value of the specified key. If the key was not created previously, the function
 * will return an empty string.
 */
function _getItem(key: string, options?: ExecuteWithOptions): CancelablePromise<string>;

function _getItem(
  keyOrKeys: string | string[],
  options?: ExecuteWithOptions,
): CancelablePromise<string | Record<string, string>> {
  const keys = Array.isArray(keyOrKeys) ? keyOrKeys : [keyOrKeys];

  return keys.length
    ? invokeCustomMethod('getStorageValues', { keys }, options).then(data => {
      const result = object(
        Object.fromEntries(keys.map((k) => [k, string()])),
      )()(data);

      return Array.isArray(keyOrKeys) ? result : result[keyOrKeys];
    })
    : CancelablePromise.resolve(typeof keyOrKeys === 'string' ? '' : {});
}

export const getItem = withIsSupported(_getItem, MINI_APPS_METHOD);

/**
 * Returns a list of all keys presented in the cloud storage.
 * @param options - request execution options.
 */
export const getKeys = withIsSupported(
  (options?: ExecuteWithOptions): CancelablePromise<string[]> => {
    return invokeCustomMethod('getStorageKeys', {}, options).then(array(string())());
  }, MINI_APPS_METHOD,
);

/**
 * Saves specified value by key.
 * @param key - storage key.
 * @param value - storage value.
 * @param options - request execution options.
 */
export const setItem = withIsSupported((
  key: string,
  value: string,
  options?: ExecuteWithOptions,
): CancelablePromise<void> => {
  return invokeCustomMethod('saveStorageValue', { key, value }, options).then();
}, MINI_APPS_METHOD);
