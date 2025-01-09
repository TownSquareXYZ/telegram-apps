# Методы и события

Этот раздел SDK посвящен теме, связанной
с [взаимодействием приложений](../../../platform/apps-communication.md).

## Вызов методов

Чтобы вызвать методы мини-приложений Telegram, разработчику нужно использовать функцию `postEvent`:

```typescript
import { postEvent } from '@telegram-apps/sdk';

postEvent('web_app_setup_back_button', { is_visible: true });
```

Эта функция автоматически определяет правильный способ отправки события, исходя из текущих особенностей среды. Для большей точности он определяет текущий тип приложения Telegram и
выбирает соответствующий поток.

### `request`

Функцию `request` следует использовать в том случае, если необходимо вызвать какой-либо метод мини-приложений Telegram и получить указанное событие. Например, разработчик хотел бы вызвать метод [web_app_request_viewport](../../../platform/methods.md#web-app-request-viewport)
и перехватить событие [viewport_changed](../../../platform/events.md#viewport-changed), чтобы получить актуальные данные о вьюпорте.

```typescript
import { request } from '@telegram-apps/sdk';

const viewport = await request({
  method: 'web_app_request_viewport',
  event: 'viewport_changed'
});

console.log(viewport);
// Output:
// {
//   is_state_stable: true,
//   is_expanded: false,
//   height: 320
// };
```

Если метод мини-приложений Telegram принимает параметры, их следует передать в свойстве `params`
третьего аргумента:

```typescript
import { request } from '@telegram-apps/sdk';

const buttonId = await request({
  method: 'web_app_open_popup',
  event: 'popup_closed',
  params: {
    title: 'Caution',
    message: 'Should we delete you account?',
    buttons: [
      { id: 'yes', type: 'ok' },
      { id: 'no', type: 'cancel' },
    ],
  },
});
```

Кроме того, можно отслеживать несколько событий одновременно:

```typescript
import { request } from '@telegram-apps/sdk';

const result = await request({
  method: 'web_app_open_scan_qr_popup',
  event: ['qr_text_received', 'scan_qr_popup_closed'],
});

// результатом будет либо qr_text_received, либо
// payload события scan_qr_popup_closed.
```

Эта функция позволяет передавать дополнительные параметры, такие как `postEvent`, `timeout` и `capture`.

#### `postEvent`

Параметр `postEvent` используется для переопределения метода, вызывающего метод мини-приложений Telegram.

```typescript
import { request, createPostEvent } from '@telegram-apps/sdk';

request({
  method: 'web_app_request_viewport',
  event: 'viewport_changed',
  postEvent: createPostEvent('6.5'),
});
```

#### `timeout`

Параметр `timeout` отвечает за установку тайм-аута запроса. В случае превышения тайм-аута будет выдана ошибка.

```typescript
import { request, isTimeoutError } from '@telegram-apps/sdk';

try {
  await request({
    method: 'web_app_invoke_custom_method',
    event: 'custom_method_invoked',
    timeout: 5000,
    params: {
      req_id: '1',
      method: 'deleteStorageValues',
      params: { keys: ['a'] },
    },
  });
} catch (e) {
  console.error(isTimeoutError(e) ? 'Timeout error' : 'Some different error', e);
}
```

#### `capture`

Свойство `capture` - это функция, позволяющая разработчику определить, следует ли фиксировать и возвращать из функции `request` событие, произошедшее в мини-приложении:

```typescript
const slug = 'jjKSJnm1k23lodd';

request({
  method: 'web_app_open_invoice',
  event: 'invoice_closed',
  params: { slug },
  capture(data) {
    return slug === data.slug;
  },
});
```

По умолчанию функция `request` фиксирует первое событие с необходимым названием. В этом
случае функция `request` зафиксирует событие только в том случае, если оно имеет ожидаемый slug.

## Вызов пользовательских методов

Пользовательские методы - это методы, которые могут использоваться в мини-приложениях Telegram с помощью метода [web_app_invoke_custom_method](../../../platform/methods.md#web-app-invoke-custom-method). Функция `invokeCustomMethod` упрощает использование таких методов и повторно использует функцию `request`.

Вот пример кода без использования этой функции:

```typescript
import { request } from '@telegram-apps/sdk';

const reqId = 'ABC';

request({
  method: 'web_app_invoke_custom_method',
  event: 'custom_method_invoked',
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

А вот как можно переписать с использованием функции `invokeCustomMethod`:

```typescript
import { invokeCustomMethod } from '@telegram-apps/sdk';

invokeCustomMethod('deleteStorageValues', { keys: ['a'] }, 'ABC');
```

В отличие от функции `request`, функция `invokeCustomMethod` анализирует результат и
проверяет наличие свойств `error`. Если свойство присутствует, то функция выдаст соответствующую ошибку. В противном случае будет возвращено свойство `result`.

## Прослушивание событий

### `on` и `off`

Для начала работы с событиями, разработчик может использовать функции `on` и `off`. Вот пример базового использования функции
`on`:

```typescript
import { on } from '@telegram-apps/sdk';

// Начать прослушивание события "viewport_changed". Возвращаемое значение
// это функция, которая удаляет этот слушатель.
const removeListener = on('viewport_changed', payload => {
  console.log('Viewport changed:', payload);
});

// Удалить этот слушатель.
removeListener();
```

Чтобы прекратить прослушивание событий, разработчик может использовать функцию `off`:

```typescript
import { on, off, type MiniAppsEventListener } from '@telegram-apps/sdk';

const listener: MiniAppsEventListener<'viewport_changed'> = payload => {
  console.log('Viewport changed:', payload);
};

// Начать прослушивать событие.
on('viewport_changed', listener);

// Удалить слушатель события.
off('viewport_changed', listener);
```

Чтобы вызвать слушатель только один раз, используйте третий аргумент boolean.

```typescript
import { on } from '@telegram-apps/sdk';

// Будет автоматически удален после первого запуска слушателя.
on('viewport_changed', (payload) => {
  console.log('Viewport changed:', payload);
}, true);
```

### `subscribe` и `unsubscribe`

Чтобы прослушивать все события, отправляемые нативным приложением Telegram, разработчику можно использовать такие функции, как `subscribe` и `unsubscribe`:

```typescript
import {
  subscribe,
  unsubscribe,
  type MiniAppsGlobalEventListener,
} from '@telegram-apps/sdk';

const listener: MiniAppsSubscribeListener = (event) => {
  console.log('Received event', event);
};

// Прослушивать все события.
subscribe(listener);

// Удалить этот слушатель.
unsubscribe(listener);
```

Слушатель принимает объект, содержащий свойства `name` и `payload`, которые соответствуют событиям мини-приложения name и payload.

## Проверка метода поддержки

Функция `postEvent` не проверяет, поддерживается ли указанный метод текущим нативным приложением Telegram. Для этого разработчик может использовать функцию `supports`, которая принимает название метода мини-приложения
и текущую версию платформы:

```typescript
import { supports } from '@telegram-apps/sdk';

supports('web_app_trigger_haptic_feedback', '6.0'); // false
supports('web_app_trigger_haptic_feedback', '6.1'); // true
```

Функция `supports` также позволяет проверить, поддерживается ли указанный параметр в параметрах метода:

```typescript
import { supports } from '@telegram-apps/sdk';

supports('web_app_open_link', 'try_instant_view', '6.0'); // false
supports('web_app_open_link', 'try_instant_view', '6.7'); // true
```

::: tip

Рекомендуется использовать эту функцию перед вызовом методов мини-приложений, чтобы избежать зависания приложения
и других непредвиденных действий.

:::

### Создание более безопасной версии `postEvent`

Этот пакет включает функцию `createPostEvent`, которая принимает текущую версию мини-приложения, в качестве входного параметра. Она возвращает функцию `postEvent`, которая внутренне проверяет, поддерживается ли указанный метод и параметры. Если они не поддерживаются, функция выдаст ошибку.

```typescript
import { createPostEvent } from '@telegram-apps/sdk';

const postEvent = createPostEvent('6.5');

// Будет работать нормально.
postEvent('web_app_read_text_from_clipboard');

// Выдаст ошибку.
postEvent('web_app_request_phone');
```

Настоятельно рекомендуется использовать этот генератор `postEvent`, чтобы гарантировать корректность вызовов метода.

## Отладка

Пакет поддерживает включение режима отладки, что позволяет логировать сообщения, связанные с обработкой событий. Для изменения режима отладки, используйте функцию `setDebug`:

```typescript
import { setDebug } from '@telegram-apps/sdk';

setDebug(true);
```

## Целевой источник (Target Origin)

Если пакет используется в браузерной среде (iframe), он применяет
функцию `window.parent.postMessage`. Для работы этой функции необходимо указать целевой источник (Target Origin), чтобы события
отправлялись только доверенным родительским iframe. По умолчанию пакет
использует `https://web.telegram.org` в качестве источника. Чтобы включить передачу событий на другие источники, разработчику нужно использовать функцию `setTargetOrigin`:

```typescript
import { setTargetOrigin } from '@telegram-apps/sdk';

setTargetOrigin('https://myendpoint.org');
```

::: warning

Настоятельно рекомендуется не изменять это значение, так как это может привести к проблемам с безопасностью.
Указывайте это значение только если вы точно понимаете, что делаете.

:::
