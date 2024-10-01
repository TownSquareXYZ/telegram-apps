import type { AsyncOptions } from '@telegram-apps/toolkit';

import { historyGo } from './historyGo.js';

/**
 * Drops current browser history switching browser history cursor to the first one entry.
 * @param options - additional options.
 */
export async function dropHistory(options?: AsyncOptions): Promise<void> {
  const h = history;
  if (h.length <= 1) {
    return;
  }

  // Push empty state to cut states we have no access to, placed after the current one.
  h.pushState(null, '');

  // By this line of code we cover the most recent case, when application is opened in WebView,
  // but not in iframe. Applications opened in WebView have simple browser history containing
  // only entries belonging to the current web application.
  if (await historyGo(1 - h.length, options)) {
    return;
  }

  // Nevertheless, iframe works a bit different in context of browser history. Calling
  // window.history.length in iframe will return browser history information related to the
  // external web environment too (e.g. browser tab). So, iframe shares the browser history with
  // the external application, but has no access to its history entries. Calling window.history.go
  // pointing out to the entry belonging to the external application will have no impact, so the
  // previous idea with go(1 - ...) will not work.
  //
  // This is the reason why we iteratively call go(-1) to meet the entry which is recognized as
  // the initial one for the current iframe.
  while (await historyGo(-1, options)) {
  }
}
