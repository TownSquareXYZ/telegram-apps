import { createCbCollector, addEventListener, type If, type IsNever } from '@telegram-apps/toolkit';
import { Signal, signal } from '@telegram-apps/signals';
import { miniAppsMessage, type MiniAppsMessage } from '@telegram-apps/transformers';

import { logError, logInfo } from '@/debug.js';

import { transformers } from '../transformers.js';
import type { EventPayload, EventName } from '../types/events.js';

export type LastEvent = {
  [E in EventName]: [E, If<IsNever<EventPayload<E>>, undefined, EventPayload<E>>]
}[EventName];

/**
 * Creates window event listeners, tracking Mini Apps events and calling passed handler with their
 * data.
 * @param onEvent - event callback.
 */
function defineListeners(onEvent: (event: LastEvent) => void): () => void {
  const w = window;
  const [, cleanup] = createCbCollector(
    // Add "resize" event listener to make sure, we always have fresh viewport information.
    // The desktop version of Telegram is sometimes not sending the "viewport_changed"
    // event. For example, when the Main Button is shown. That's why we should
    // add our own listener to make sure viewport information is always fresh.
    // Issue: https://github.com/Telegram-Mini-Apps/telegram-apps/issues/10
    addEventListener(w, 'resize', () => {
      onEvent(['viewport_changed', {
        width: window.innerWidth,
        height: window.innerHeight,
        is_state_stable: true,
        is_expanded: true,
      }]);
    }),
    // Add listener, which handles events sent from the Telegram web application and also events
    // generated by the local emitEvent function.
    addEventListener(w, 'message', (event) => {
      // Ignore non-parent window messages.
      if (event.source !== w.parent) {
        return;
      }

      // Parse incoming event data.
      let message: MiniAppsMessage;
      try {
        message = miniAppsMessage()(event.data);
      } catch {
        // We ignore incorrect messages as they could be generated by any other code.
        return;
      }

      const { eventType, eventData } = message;
      const createTransformer = transformers[eventType as keyof typeof transformers];

      try {
        const transformed = createTransformer
          ? createTransformer()(eventData)
          : eventData;
        logInfo('Event received:', transformed
          ? { eventType, eventData: transformed }
          : { eventType });
        onEvent([eventType, transformed] as LastEvent);
      } catch (cause) {
        logError(
          [
            `An error occurred processing the "${eventType}" event from the Telegram application.`,
            'Please, file an issue here:',
            'https://github.com/Telegram-Mini-Apps/telegram-apps/issues/new/choose',
          ].join('\n'),
          message,
          cause,
        );
      }
    }),
  );

  return cleanup;
}

/**
 * Last received event.
 */
export const $lastEvent = signal<LastEvent>();

/**
 * Side effects listening cleanup function. It will be eventually set when some code tried
 * to retrieve the last event.
 */
export const $lastEventCleanup = signal<() => void>();

/**
 * Retrieve last received Mini Apps event ensuring that external listeners were defined.
 */
export function lastEventSignal(): Signal<LastEvent | undefined, LastEvent> {
  if (!$lastEventCleanup()) {
    $lastEventCleanup.set(defineListeners($lastEvent.set));
  }
  return $lastEvent;
}

