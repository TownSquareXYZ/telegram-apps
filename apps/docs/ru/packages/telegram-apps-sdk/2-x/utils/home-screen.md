# Главный экран

## `addToHomeScreen`

Чтобы предложить пользователю добавить мини-приложение на главный экран, используйте функцию `addToHomeScreen`.

::: code-group

```ts [Using isAvailable]
import { addToHomeScreen } from '@telegram-apps/sdk';

if (addToHomeScreen.isAvailable()) {
  addToHomeScreen();
}
```

```ts [Using ifAvailable]
import { addToHomeScreen } from '@telegram-apps/sdk';

addToHomeScreen.ifAvailable();
```

:::

Чтобы отслеживать, добавлено ли текущее мини-приложение на домашний экран устройства, используйте функции `onAddedToHomeScreen` и `offAddedToHomeScreen`:

```ts
import {
  onAddedToHomeScreen,
  onAddToHomeScreenFailed,
  offAddedToHomeScreen,
  offAddToHomeScreenFailed,
} from '@telegram-apps/sdk';

function onAdded() {
  console.log('Added');
}

onAddedToHomeScreen(onAdded);
offAddedToHomeScreen(onAdded);

function onFailed() {
  console.log('User declined the request');
}

onAddToHomeScreenFailed(onFailed);
offAddToHomeScreenFailed(onFailed);
```

> [!ПРИМЕЧАНИЕ]
> Если устройство не может определить статус установки, соответствующее событие может не быть получено, даже если значок был добавлен.

## `checkHomeScreenStatus`

Функция `checkHomeScreenStatus` проверяет, добавил ли пользователь уже мини-приложение на домашний экран устройства.

```ts
import { checkHomeScreenStatus } from '@telegram-apps/sdk';

if (checkHomeScreenStatus.isAvailable()) {
  checkHomeScreenStatus().then(status => {
    console.log(status);
  });
}
```
