# Методы

В этой статье мы рассмотрим темы, связанные с методами [взаимодействия приложений](../../platform/apps-communication.md).

## Вызов методов

Чтобы вызвать методы мини-приложений Telegram, разработчикам нужно использовать функцию `postEvent`:

```typescript
import { postEvent } from '@telegram-apps/bridge';

postEvent('web_app_setup_back_button', { is_visible: true });
```

Эта функция автоматически определяет правильный способ отправки события, в зависимости от текущей среды. Он определяет тип приложения Telegram и выбирает соответствующий процесс.

### `request`

Функцию `request` следует использовать, когда разработчику нужно вызвать метод Telegram Mini Apps и
получить определенное событие.

Например, чтобы вызвать
метод [web_app_request_viewport](../../platform/methods.md#web-app-request-viewport) и обработать
событие [viewport_changed](../../platform/events.md#viewport-changed) для получения актуальных данных о viewport:

```typescript
import { request } from '@telegram-apps/bridge';

const viewport = await request(
  'web_app_request_viewport',
  'viewport_changed',
);

console.log(viewport);
// Output:
// {
//   is_state_stable: true,
//   is_expanded: false,
//   height: 320
// };
```

Если метод Telegram Mini Apps принимает параметры, их следует передавать в свойстве `params`
третьего аргумента:

```typescript
const buttonId = await request('web_app_open_popup', 'popup_closed', {
  params: {
    title: 'Caution',
    message: 'Should we delete your account?',
    buttons: [
      { id: 'yes', type: 'ok' },
      { id: 'no', type: 'cancel' },
    ],
  },
});
```

Также можно отслеживать несколько событий одновременно:

```typescript
const result = await request(
  'web_app_open_scan_qr_popup',
  ['qr_text_received', 'scan_qr_popup_closed'],
);

// Результатом будет либо qr_text_received 
// либо payload события scan_qr_popup_closed.
```

Эта функция позволяет передавать дополнительные параметры, такие как `postEvent`, `abortSignal`, `timeout`,
и `capture`.

#### `postEvent`

Параметр `postEvent` позволяет разработчику переопределить метод, используемый для вызова метода мини-приложений Telegram.

```typescript
request('web_app_request_viewport', 'viewport_changed', {
  postEvent() {
    console.log('Hey, I am not going to do anything');
  },
});
```

#### `abortSignal`

Для отмены возвращенного promise извне, используется параметр `abortSignal`.

```ts
const controller = new AbortController();

request('web_app_request_viewport', 'viewport_changed', {
  abortSignal: controller.signal,
});

setTimeout(() => {
  controller.abort(new Error('Not going to wait anymore'));
}, 500);
```

#### `timeout`

Параметр `timeout` присваивает тайм-аут для запроса.

```typescript
import { request } from '@telegram-apps/bridge';

try {
  await request(
    'web_app_invoke_custom_method',
    'custom_method_invoked',
    {
      timeout: 5000,
      params: {
        req_id: '1',
        method: 'deleteStorageValues',
        params: { keys: ['a'] },
      },
    },
  );
} catch (e) {
  console.error(e); // TypedError with e.type === 'ERR_TIMED_OUT'
}
```

#### `capture`

Свойство `capture` - это функция, которая позволяет разработчикам определять, следует ли фиксировать и возвращать из функции `request` произошедшее событие мини-приложения:

```typescript
const slug = 'jjKSJnm1k23lodd';

request('web_app_open_invoice', 'invoice_closed', {
  params: { slug },
  capture(data) {
    return slug === data.slug;
  },
});
```

По умолчанию функция `request` фиксирует первое событие с нужным названием. В данном случае функция зафиксирует событие только в том случае, если у него будет ожидаемый slug, характерный для события
[invoice_closed](../../platform/events.md#invoice-closed).

При передаче массива событий функция `capture` получит объект со свойствами `event: EventName` и `payload?: EventPayload`.

## Вызов пользовательских методов

Пользовательские методы - это методы, которые можно использовать с
методом [web_app_invoke_custom_method](../../platform/methods.md#web-app-invoke-custom-method) мини-приложений (Mini Apps).

Функция `invokeCustomMethod` упрощает использование таких методов за счет повторного использования функции `request`.

Вот пример без использования этой функции:

```typescript
const reqId = 'ABC';

request('web_app_invoke_custom_method', 'custom_method_invoked', {
  params: {
    req_id: reqId,
    method: 'deleteStorageValues',
    params: { keys: ['a'] },
  },
  capture(data) {
    return data.req_id === reqId;
  }
});
```

Теперь перепишем с использованием функции `invokeCustomMethod`:

```typescript
import { invokeCustomMethod } from '@telegram-apps/bridge';

invokeCustomMethod('deleteStorageValues', { keys: ['a'] }, 'ABC');
```

Внутри она просто инкапсулирует определенную логику, связанную с методами, поэтому разработчику не нужно этого
делать.

В отличие от функции `request`, функция `invokeCustomMethod` анализирует результат и проверяет, содержит ли он
свойство `error`. Если содержит, функция выдает соответствующую ошибку; в противном случае возвращается
свойство `result`.

## Проверка поддержки метода

Функция `postEvent` не проверяет, поддерживается ли указанный метод текущим приложением Telegram. Для этого используется функция `supports`.

Она принимает название метода мини-приложения (Mini Apps) и текущую версию платформы:

```typescript
import { supports } from '@telegram-apps/bridge';

supports('web_app_trigger_haptic_feedback', '6.0'); // false
supports('web_app_trigger_haptic_feedback', '6.1'); // true
```

Функция `supports` также позволяет проверить, поддерживается ли конкретный параметр в параметрах метода:

```typescript
import { supports } from '@telegram-apps/bridge';

supports('web_app_open_link', 'try_instant_view', '6.0'); // false
supports('web_app_open_link', 'try_instant_view', '6.7'); // true
```

> [!ПОДСКАЗКА]
> Рекомендуется использовать эту функцию перед вызовом методов мини-приложений (Mini Apps), чтобы предотвратить
> зависание приложений или их неожиданное поведение.

## Создание безопасной функции `postEvent`

Этот пакет включает функцию `createPostEvent`, которая принимает текущую версию мини-приложений в качестве входных данных.

Она возвращает функцию `postEvent`, которая внутренне проверяет, поддерживаются ли переданные метод и параметры.

```typescript
import { createPostEvent } from '@telegram-apps/bridge';

const postEvent = createPostEvent('6.5');

// Будет работать нормально.
postEvent('web_app_read_text_from_clipboard');

// Выдаст ошибку, этот метод не поддерживается 
// в мини-приложениях версии 6.5.
postEvent('web_app_request_phone');
```

В качестве второго необязательного аргумента функция принимает callback, который вызывается, если метод или параметр
не поддерживаются.

```ts
createPostEvent('6.0', (data) => {
  if ('param' in data) {
    console.warn(
      'Oops, the parameter', data.param,
      'in method', data.method,
      'is not supported',
    );
  } else {
    console.warn('Oops, method', data.method, 'is not supported');
  }
});
```

Чтобы логировать предупреждения, вместо выдачи ошибок, можно передать значение `'non-strict`:

```ts
createPostEvent('6.0', 'non-strict');
```
