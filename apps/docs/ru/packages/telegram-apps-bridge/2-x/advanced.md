# Расширенные функции

В этой статье рассказывается о расширенном использовании моста.

## Метод вызова, событие получения

Функцию `request` следует использовать, когда разработчику необходимо вызвать метод Telegram Mini Apps и получить определенное событие.

Например, чтобы вызвать
метод [web_app_request_viewport](../../../platform/methods.md#web-app-request-viewport) и поймать
событие [viewport_changed](../../../platform/events.md#viewport-changed) для получения фактических данных об области просмотра:

```typescript
import { request } from '@telegram-apps/bridge';

await request('web_app_request_viewport', 'viewport_changed');
// {
//   is_state_stable: true,
//   is_expanded: false,
//   height: 320
// };
```

Если метод Telegram Mini Apps принимает параметры, их следует передать в свойстве `params`
третьего аргумента:

```typescript
const { button_id } = await request('web_app_open_popup', 'popup_closed', {
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
await request(
  'web_app_open_scan_qr_popup',
  ['qr_text_received', 'scan_qr_popup_closed'],
);

// Результатом будет либо qr_text_received 
// или полезная нагрузка события scan_qr_popup_closed.
```

Эта функция позволяет передавать дополнительные параметры, такие как `postEvent`, `abortSignal`, `timeout`, и `capture`.

### `postEvent`

Опция `postEvent` позволяет разработчику переопределить метод, используемый для вызова метода Telegram Mini Apps метод.

```typescript
request('web_app_request_viewport', 'viewport_changed', {
  postEvent() {
    console.log('Hey, I am not going to do anything. Live with that');
  },
});
```

### `abortSignal`

Чтобы прервать выполнение возвращаемого обещания извне, используется опция `abortSignal`.

```ts
const controller = new AbortController();

request('web_app_request_viewport', 'viewport_changed', {
  abortSignal: controller.signal,
});

setTimeout(() => {
  controller.abort(new Error('Not going to wait anymore'));
}, 500);
```

### `timeout`

Опция `timeout` назначает тайм-аут для запроса.

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
  console.error(e); // e.name будет 'TimeoutError'
}
```

#### `capture`

Свойство `capture` - это функция, которая позволяет разработчикам определить, должно ли произошедшее событие Mini Apps должно быть захвачено и возвращено из функции `request`:

```typescript
const slug = 'jjKSJnm1k23lodd';

request('web_app_open_invoice', 'invoice_closed', {
  params: { slug },
  capture(data) {
    return slug === data.slug;
  },
});
```

По умолчанию функция `request` перехватывает первое событие с требуемым именем. В данном случае,
функция перехватит событие только в том случае, если оно имеет ожидаемое промежуточное значение, характерный для события [invoice_closed](../../../platform/events.md#invoice-closed) событие.

При передаче массива событий функция `capture` получит объект с параметром
параметрами `event: EventName` и `payload? EventPayload`.

## Вызов пользовательских методов

Пользовательские методы — это методы, которые можно использовать с методом
[web_app_invoke_custom_method](../../../platform/methods.md#web-app-invoke-custom-method)
Mini
Apps.

Функция `invokeCustomMethod` упрощает использование таких методов за счет повторного использования функции `request` функцию.

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
})
  .then(({ data, error }) => {
    if (error) {
      throw new Error(error);
    }
    return data;
  })
  .then(data => {
    console.log('We got some data', data);
  });
```

Теперь переписано с использованием функции `invokeCustomMethod`:

```typescript
import { invokeCustomMethod } from '@telegram-apps/bridge';

invokeCustomMethod('deleteStorageValues', { keys: ['a'] }, 'ABC')
  .then(data => {
    console.log('We got some data', data);
  });
```

Внутри он просто инкапсулирует специфическую логику, связанную с методами, поэтому разработчику не следует делать этого.

В отличие от функции `request`, функция `invokeCustomMethod` анализирует результат и проверяет, содержит ли он свойство `error`. Если это так, функция выбрасывает соответствующую ошибку; в противном случае,
возвращается свойство `result`.