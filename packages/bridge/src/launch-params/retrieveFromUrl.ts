import { parseLaunchParams } from './parseLaunchParams.js';
import type { LaunchParams } from './types.js';

/**
 * @param urlString - URL to extract launch parameters from.
 * @returns Launch parameters from the specified URL.
 * @throws Error if function was unable to extract launch parameters from the passed URL.
 */
export function retrieveFromUrl(urlString: string): LaunchParams {
  return parseLaunchParams(
    urlString
      // Replace everything before this first hashtag or question sign.
      .replace(/^[^?#]*[?#]/, '')
      // Replace all hashtags and question signs to make it look like some search params.
      .replace(/[?#]/g, '&'),
  );
}
