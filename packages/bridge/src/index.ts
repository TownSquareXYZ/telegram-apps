export { isIframe } from '@/env/isIframe.js';
export { isTMA } from '@/env/isTMA.js';
export { BridgeError } from '@/errors/BridgeError.js';
export {
  type ErrorType,
  ERR_TIMED_OUT,
  ERR_METHOD_UNSUPPORTED,
  ERR_METHOD_PARAMETER_UNSUPPORTED,
  ERR_INVOKE_CUSTOM_METHOD_RESPONSE,
  ERR_UNKNOWN_ENV,
} from '@/errors/errors.js';
export { isBridgeError } from '@/errors/isBridgeError.js';
export { isBridgeErrorOfType } from '@/errors/isBridgeErrorOfType.js';

export { removeEventHandlers, defineEventHandlers } from '@/events/handlers.js';
export { on, off, subscribe, unsubscribe } from '@/events/listening.js';
export type {
  BiometryAuthRequestStatus,
  BiometryTokenUpdateStatus,
  BiometryType,
  InvoiceStatus,
  EventPayload,
  EventName,
  EventEmitter,
  Events,
  EventListener,
  PhoneRequestedStatus,
  SubscribeListener,
  WriteAccessRequestedStatus,
} from '@/events/types.js';

export type {
  AnyInvokeCustomMethodParams,
  AnyHapticFeedbackParams,
  CustomMethodName,
  CustomMethodParams,
  CustomMethodsParams,
  HeaderColorKey,
  ImpactHapticFeedbackParams,
  ImpactHapticFeedbackStyle,
  MethodParams,
  MethodNameWithVersionedParams,
  MethodName,
  MethodNameWithRequiredParams,
  MethodNameWithOptionalParams,
  MethodVersionedParams,
  Methods,
  MethodNameWithoutParams,
  NotificationHapticFeedbackType,
  NotificationHapticFeedbackParams,
  OpenLinkBrowser,
  PopupParams,
  PopupButton,
  SelectionHapticFeedbackParams,
  SwitchInlineQueryChatType,
} from '@/methods/types/index.js';
export { createPostEvent } from '@/methods/createPostEvent.js';
export { postEvent, type PostEvent } from '@/methods/postEvent.js';
export { supports } from '@/methods/supports.js';
export { targetOrigin } from '@/methods/targetOrigin.js';

export { compareVersions } from '@/utils/compareVersions.js';
export { createCleanup } from '@/utils/createCleanup.js';
export { createLogger } from '@/utils/createLogger.js';
export { createSingleton } from '@/utils/createSingleton.js';
export { debug } from '@/debug.js';
export { invokeCustomMethod } from '@/utils/invokeCustomMethod.js';
export { isRecord } from '@/utils/isRecord.js';
export {
  request,
  type RequestOptions,
  type RequestCaptureEventFn,
  type RequestCaptureEventsFn,
  type RequestEventsPayloads,
} from '@/utils/request.js';
export { sleep } from '@/utils/sleep.js';
export type {
  ExecuteWithOptions,
  ExecuteWithPostEvent,
  ExecuteWithTimeout,
} from './types.js';
export type * from '@telegram-apps/types';