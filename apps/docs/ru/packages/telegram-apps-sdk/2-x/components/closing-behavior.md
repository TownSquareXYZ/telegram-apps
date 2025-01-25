# Поведение при закрытии

💠[Компонент](../scopes.md), отвечающий за [поведение при закрытии](../../../../../platform/closing-behavior.md) мини-приложения Telegram.

## Установка

Перед использованием этого компонента необходимо смонтировать его для работы с правильно настроенными свойствами. Для этого используйте метод `mount`. Он обновит свойство сигнала `isMounted`.

::: code-group

```ts [Variable]
import { closingBehavior } from '@telegram-apps/sdk';

if (closingBehavior.mount.isAvailable()) {
  closingBehavior.mount();
  closingBehavior.isMounted(); // true
}
```

```ts [Functions]
import {
  mountClosingBehavior,
  isClosingBehaviorMounted,
} from '@telegram-apps/sdk';

if (mountClosingBehavior.isAvailable()) {
  mountClosingBehavior();
  isClosingBehaviorMounted(); // true
}
```

:::

Для размонтирования используйте метод `unmount`:

::: code-group

```ts [Variable]
closingBehavior.unmount();
closingBehavior.isMounted(); // false
```

```ts [Functions]
import {
  unmountClosingBehavior,
  isClosingBehaviorMounted,
} from '@telegram-apps/sdk';

unmountClosingBehavior();
isClosingBehaviorMounted(); //  false
```

:::

## Подтверждение закрытия

Чтобы изменить поведение подтверждения при закрытии, используйте методы `enableConfirmation()` и `disableConfirmation()`. Эти методы обновляют значение свойства сигнала `isConfirmationEnabled`.

::: code-group

```ts [Variable]
if (closingBehavior.enableConfirmation.isAvailable()) {
  closingBehavior.enableConfirmation();
  closingBehavior.isConfirmationEnabled(); // true
}

if (closingBehavior.disableConfirmation.isAvailable()) {
  closingBehavior.disableConfirmation();
  closingBehavior.isConfirmationEnabled(); // false
}
```

```ts [Functions]
import {
  enableClosingConfirmation,
  disableClosingConfirmation,
} from '@telegram-apps/sdk';

if (enableClosingConfirmation.isAvailable()) {
  enableClosingConfirmation();
  isClosingConfirmationEnabled(); // true
}

if (disableClosingConfirmation.isAvailable()) {
  disableClosingConfirmation();
  isClosingConfirmationEnabled(); // false
}
```

:::
