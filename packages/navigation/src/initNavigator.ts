import { isPageReload } from '@/isPageReload.js';
import { createNavigator } from '@/createNavigator.js';
import { createNavigatorFromLocation } from '@/createNavigatorFromLocation.js';
import type { CtrOptions, HistoryItem, Navigator } from '@/types.js';

export interface InitNavigatorOptions<State> extends CtrOptions<State> {
  /**
   * Session storage key, containing the navigator state.
   * @default "@telegram-apps/navigator/state"
   */
  sessionStorageKey?: string;
}

interface StorageData<State> {
  history: HistoryItem<State>[];
  cursor: number;
}

function instantiate<State>(
  sessionStorageKey: string,
  options?: CtrOptions<State>,
): Navigator<State> {
  // If the page was reloaded, we assume that navigator had to previously save its state in the
  // session storage.
  if (isPageReload()) {
    const stateRaw = sessionStorage.getItem(sessionStorageKey);
    if (stateRaw) {
      try {
        const data = JSON.parse(stateRaw) as StorageData<State>;
        return createNavigator<State>(data.history, data.cursor, options);
      } catch (e) {
        console.error('Storage contains invalid navigator state:', e);
      }
    }
  }

  // In case, we could not restore the navigator state, or it is a fresh start, we can create an
  // empty navigator from the window.location.
  return createNavigatorFromLocation(options);
}

/**
 * Initializes a standard Mini Apps navigator.
 * @param options - function options.
 */
export function initNavigator<State>(options?: InitNavigatorOptions<State>): [
  /**
   * Created navigator.
   */
  Navigator<State>,
  /**
   * A function, performing cleanup.
   */
  cleanup: () => void,
] {
  options ||= {};
  const sessionStorageKey = options.sessionStorageKey || '@telegram-apps/navigator/state';
  const navigator = instantiate<State>(sessionStorageKey, options);

  const saveState = () => sessionStorage.setItem(sessionStorageKey, JSON.stringify({
    cursor: navigator.cursor(),
    history: navigator.history() as HistoryItem<State>[],
  } satisfies StorageData<State>));

  // Save the initial state to make sure nothing will break when the page was reloaded.
  saveState();

  return [
    navigator,
    // Whenever navigator changes its state, we save it in the session storage.
    navigator.location.sub(saveState)
  ];
}
