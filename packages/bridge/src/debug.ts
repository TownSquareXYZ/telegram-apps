import { signal } from '@telegram-apps/signals';
import { createLogger } from '@telegram-apps/toolkit';

/**
 * The package debug mode.
 *
 * Enabling debug mode leads to printing additional messages in the console related to the
 * processes inside the package.
 */
export const $debug = signal(false);

export const [log, error] = createLogger('Bridge', {
  bgColor: 'blue',
  textColor: 'white',
  shouldLog: $debug,
});
