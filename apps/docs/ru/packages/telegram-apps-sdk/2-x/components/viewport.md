# Область просмотра

💠[Компонент](../scopes.md), отвечающий за работу [области просмотра](../../../../../platform/viewport.md) мини-приложения Telegram.

## Установка

Перед использованием компонента необходимо смонтировать его для работы с правильно настроенными свойствами.
Для этого используйте метод `mount`. Он обновит свойство сигнала `isMounted`.

::: code-group

```ts [Variable]
import { viewport } from '@telegram-apps/sdk';

if (viewport.mount.isAvailable()) {
  viewport.mount();
  viewport.isMounted(); // true
}
```

```ts [Functions]
import {
  mountViewport,
  isViewportMounted,
} from '@telegram-apps/sdk';

if (mountViewport.isAvailable()) {
  mountViewport();
  isViewportMounted(); // true
}
```

:::

Для размонтирования используйте метод `unmount`:

::: code-group

```ts [Variable]
viewport.unmount();
viewport.isMounted(); // false
```

```ts [Functions]
import {
  unmountViewport,
  isViewportMounted,
} from '@telegram-apps/sdk';

unmountViewport();
isViewportMounted(); // false
```

:::

## Привязка CSS-переменных

Чтобы раскрыть свойства `viewport` через CSS-переменные, используйте метод `bindCssVars`.
Свойство сигнала `isCssVarsBound` обновляется после вызова метода.

Этот метод дополнительно принимает функцию, которая преобразует значения `width`, `height` и `stableHeight` в имена CSS-переменных. По умолчанию значения преобразуются в регистр kebab с префиксом --tg-viewport-.

::: code-group

```ts [Variable]
import { viewport } from '@telegram-apps/sdk';

if (viewport.bindCssVars.isAvailable()) {
  viewport. индЦссварс();
  // Создает CSS-переменные, например:
  // --tg-viewport-height: 675px
  // --tg-viewport-width: 320px
  // --tg-viewport-stable-height: 675px

  viewport. indCssVars(ключ => `--my-префикс -${key}`);
  // Создает CSS-переменные, например:
  // --my-prefix-height: 675px
  // --my-prefix-width: 320px
  // --my-prefix-stableHeight: 675px

  viewport. sCssVarsBound(); // true
}
```

```ts [Functions]
import {
  bindViewportCssVars,
  isViewportCssVarsBound,
} from '@telegram-apps/sdk';

if (bindViewportCssVars.isAvailable()) {
  bindViewportCssVars();
  // Создает CSS-переменные, например:
  // --tg-viewport-height: 675px
  // --tg-viewport-width: 320px
  // --tg-viewport-stable-height: 675px

  bindViewportCssVars(key => `--my-prefix-${key}`);
  // Создает CSS-переменные, например:
  // --my-prefix-height: 675px
  // --my-prefix-width: 320px
  // --my-prefix-stableHeight: 675px

  isViewportCssVarsBound(); // true
}
```

:::

## Расширение

Чтобы расширить область просмотра, используйте метод `expand`.

::: code-group

```ts [Variable]
if (viewport.expand.isAvailable()) {
  viewport.expand();
}
```

```ts [Functions]
import { expandViewport } from '@telegram-apps/sdk';

if (expandViewport.isAvailable()) {
  expandViewport();
}
```

:::

## Полноэкранный режим

Для включения полноэкранного режима используется метод `requestFullscreen`:

::: code-group

```ts [Variable]
if (viewport.requestFullscreen.isAvailable()) {
  await viewport.requestFullscreen();
  viewport.isFullscreen(); // true
}
```

```ts [Functions]
import { requestFullscreen, isFullscreen } from '@telegram-apps/sdk';

if (requestFullscreen.isAvailable()) {
  await requestFullscreen();
  isFullscreen(); // true
}
```

:::

Для выхода из полноэкранного режима используйте метод `exitFullscreen`:

::: code-group

```ts [Variable]
if (viewport.exitFullscreen.isAvailable()) {
  await viewport.exitFullscreen();
  viewport.isFullscreen(); // false
}
```

```ts [Functions]
import { exitFullscreen, isFullscreen } from '@telegram-apps/sdk';

if (exitFullscreen.isAvailable()) {
  await exitFullscreen();
  isFullscreen(); // false
}
```

:::

## Отступы для безопасных областей

Компонент области просмотра предоставляет доступ к двум типам отступов:

- **Отступы для безопасных областей**
- **Безопасные отступы для содержимого**

Для получения дополнительной информации о различиях между этими типами отступов перейдите на страницу [**области просмотра**](../../../../platform/viewport.md).

Доступ к этим отступам предоставляется через следующие сигналы:

::: code-group

```ts [Variable]
// Объекты с числовыми свойствами "top", "bottom", "left" и "right".
viewport.safeAreaInsets();
viewport.contentSafeAreaInsets();

// Числовые значения.
viewport.safeAreaInsetTop();
viewport.safeAreaInsetBottom();
viewport.safeAreaInsetLeft();
viewport.safeAreaInsetRight();
viewport.contentSafeAreaInsetTop();
viewport.contentSafeAreaInsetBottom();
viewport.contentSafeAreaInsetLeft();
viewport.contentSafeAreaInsetRight();
```

```ts [Functions]
import {
  viewportSafeAreaInsets,
  viewportSafeAreaInsetTop,
  viewportSafeAreaInsetBottom,
  viewportSafeAreaInsetLeft,
  viewportSafeAreaInsetRight,
  viewportContentSafeAreaInsets,
  viewportContentSafeAreaInsetTop,
  viewportContentSafeAreaInsetBottom,
  viewportContentSafeAreaInsetLeft,
  viewportContentSafeAreaInsetRight,
} from '@telegram-apps/sdk';

// Объекты с числовыми свойствами "top", "bottom", "left" и "right".
viewportSafeAreaInsets();
viewportContentSafeAreaInsets();

// Числовые значения.
viewportSafeAreaInsetTop();
viewportSafeAreaInsetBottom();
viewportSafeAreaInsetLeft();
viewportSafeAreaInsetRight();
viewportContentSafeAreaInsetTop();
viewportContentSafeAreaInsetBottom();
viewportContentSafeAreaInsetLeft();
viewportContentSafeAreaInsetRight();
```

:::
