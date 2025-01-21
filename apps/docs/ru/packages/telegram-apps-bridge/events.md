# События

В этой статье рассматриваются темы, связанные с событиями [коммуникации приложений](../../platform/apps-communication.md).

## Определение обработчиков событий

Чтобы избежать побочных эффектов, этот пакет не вызывает никаких функций при импорте. Мини-приложения Telegram требуется особый способ взаимодействия между собственным приложением Telegram и мини-приложением, который включает определение определенных методов в глобальном объекте `window`.

Чтобы включить это и начать получать события Мини-приложения Telegram, используйте функцию `defineEventHandlers`:

```typescript
import { defineEventHandlers } from '@telegram-apps/bridge';

defineEventHandlers();
```

Эта настройка гарантирует, что мини-приложение может правильно взаимодействовать с собственным приложением Telegram, прослушивая
и обрабатывая необходимые события.

## `on` и `off`

Чтобы начать работать с событиями, используются функции `on` и `off`.

Вот простой пример функции `on`:

```typescript
import { on } from '@telegram-apps/bridge';

// Начните прослушивание события "viewport_changed". Возвращаемое значение
// — это функция, которая удаляет этот слушатель события.
const removeListener = on('viewport_changed', (payload) => {
  console.log('Viewport changed:', payload);
});

// Удаляем этот слушатель событий.
removeListener();
```

Или, чтобы остановить прослушивание событий, разработчик может использовать функцию `off`:

```typescript
import { on, off, type EventListener } from '@telegram-apps/bridge';

const listener: EventListener<'viewport_changed'> = (payload) => {
  console.log('Viewport changed:', payload);
};

// Начать прослушивание события.
on('viewport_changed', listener);

// Удаляет слушатель событий.
off('viewport_changed', listener);
```

Чтобы вызвать слушателя только один раз, используется третий логический аргумент:

```typescript
import { on } from '@telegram-apps/bridge';

// Будет автоматически удален после первого выполнения слушателя.
on('viewport_changed', (payload) => {
  console.log('Viewport changed:', payload);
}, true);
```

## `subscribe` и `unsubscribe`

Чтобы прослушивать все события, отправленные из собственного приложения Telegram, используются функции `subscribe` и `unsubscribe`:

```typescript
import {
  subscribe,
  unsubscribe,
  type SubscribeListener,
} from '@telegram-apps/bridge';

const listener: SubscribeListener = (event) => {
  console.log('Received event', event);
};

// Прослушивание всех событий.
subscribe(listener);

// Удаление слушателя.
unsubscribe(listener);
```
