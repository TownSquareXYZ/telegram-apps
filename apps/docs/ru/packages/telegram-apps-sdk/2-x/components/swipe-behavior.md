# Поведение при пролистывании

💠[Компонент](../scopes.md), отвечающий за поведение мини-приложения Telegram при пролистывании.

## Проверка поддержки

Чтобы проверить, поддерживается ли поведение при пролистывании текущей версии мини-приложения Telegram, используется метод `isSupported`:

::: code-group

```ts [Variable]
import { swipeBehavior } from '@telegram-apps/sdk';

swipeBehavior.isSupported(); // boolean
```

```ts [Functions]
import { isSwipeBehaviorSupported } from '@telegram-apps/sdk';

isSwipeBehaviorSupported(); // boolean
```

:::

## Установка

Перед использованием компонента необходимо смонтировать его для работы с правильно настроенными свойствами.
Для этого используйте метод `mount`. Он обновит свойство сигнала `isMounted`.

::: code-group

```ts [Variable]
import { swipeBehavior } from '@telegram-apps/sdk';

if (swipeBehavior.mount.isAvailable()) {
  swipeBehavior.mount();
  swipeBehavior.isMounted(); // true
}
```

```ts [Functions]
import {
  mountSwipeBehavior,
  isSwipeBehaviorMounted,
} from '@telegram-apps/sdk';

if (mountSwipeBehavior.isAvailable()) {
  mountSwipeBehavior();
  isSwipeBehaviorMounted(); // true
}
```

:::

Для отключения используйте метод `unmount`:

::: code-group

```ts [Variable]
swipeBehavior.unmount(); 
swipeBehavior.isMounted(); // false
```

```ts [Functions]
import {
  unmountClosingBehavior,
  isSwipeBehaviorMounted,
} from '@telegram-apps/sdk';

unmountSwipeBehavior(); 
isSwipeBehaviorMounted(); // false
```

:::

## Управление вертикальным пролистыванием

Чтобы включить или отключить вертикальное пролистывание, используйте методы `enableVertical` и `disableVertical`.
Вызывая эти методы, обновите значение свойства сигнала `isVerticalEnabled`.

::: code-group

```ts [Variable]
if (swipeBehavior.enableVertical.isAvailable()) {
  swipeBehavior.enableVertical();
  swipeBehavior.isVerticalEnabled(); // true
}

if (swipeBehavior.disableVertical.isAvailable()) {
  swipeBehavior.disableVertical();
  swipeBehavior.isVerticalEnabled(); // false
}
```

```ts [Functions]
import {
  enableVerticalSwipes,
  disableVerticalSwipes,
  isVerticalSwipesEnabled,
} from '@telegram-apps/sdk';

if (enableVerticalSwipes.isAvailable()) {
  enableVerticalSwipes();
  isVerticalSwipesEnabled(); // true
}

if (disableVerticalSwipes.isAvailable()) {
  disableVerticalSwipes();
  isVerticalSwipesEnabled(); // false
}
```

:::
