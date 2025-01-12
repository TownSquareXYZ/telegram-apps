import type { LaunchParamsShape } from '@telegram-apps/transformers';

import { retrieveFromUrl } from './retrieveFromUrl.js';

/**
 * @returns Launch parameters based on the first navigation entry.
 * @throws Error if function was unable to extract launch parameters from the navigation entry.
 */
export function retrieveFromPerformance(): LaunchParamsShape {
  const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
  if (!navigationEntry) {
    throw new Error('Unable to get first navigation entry.');
  }

  return retrieveFromUrl(navigationEntry.name);
}
