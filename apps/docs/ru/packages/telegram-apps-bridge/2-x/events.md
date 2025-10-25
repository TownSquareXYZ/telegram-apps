# События

В этой статье рассматриваются темы, связанные с [общение с приложениями](../../platform/apps-communication.md) события.

## Отслеживание событий

Чтобы начать отслеживать события, используйте `on`. Возвращает новую функцию, удаляя связанный слушатель событий.

```typescript
import { on } from '@telegram-apps/bridge';

// Начните прослушивать событие "viewport_changed". Возвращаемое значение
// является функцией, которая удаляет этот слушатель события.
 const removeListener = on('viewport_changed', (payload) => {
  console.log('Viewport changed:', payload);
  // Удалите этот слушатель событий.
  removeListener();
});
```

В качестве альтернативы, чтобы прекратить прослушивание события, разработчик может использовать функцию `off`:

```typescript
import { on, off, type EventListener } from '@telegram-apps/bridge';

const listener: EventListener<'viewport_changed'> = (payload) => {
  console.log('Viewport changed:', payload);
  // Удалите слушатель событий.
  off('viewport_changed', listener);
};

// Начните прослушивание события.
on('viewport_changed', listener);

```

### Одноразовый слушатель

Чтобы вызвать слушателя только один раз и удалить его после этого, используется 3-ий аргумент boolean:

```typescript
import { on } from '@telegram-apps/bridge';

// слушатель будет автоматически удален после первого 
// его выполнения.
on('viewport_changed', payload => {
  console.log('Viewport changed:', payload);
}, true);
```

### Wildcard Listener

Если требуется отслеживать все события, передайте в качестве 1-го аргумента значение `*`. В этом случае слушатель получит кортеж, содержащий 2 элемента: имя события и его полезную нагрузку.

```ts
import { on } from '@telegram-apps/bridge';

on('*', event => {
  if (event[0] === 'viewport_changed') {
    console.log('Viewport changed:', payload);
    return;
  }
  // ...
});
```

> [!СОВЕТ] Почему именно кортеж?
> Слушатель получает кортеж для лучшей типизации при использовании TypeScript.
