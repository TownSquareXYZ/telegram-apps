# Мини-приложение

💠[Компонент](../scopes.md), отвечающий за управление функциональностью мини-приложений Telegram.

## Установка

Перед использованием этого компонента его необходимо смонтировать с помощью метода `mount`, который обновляет свойство сигнала `isMounted`.

::: code-group

```ts [Variable]
import { miniApp } from '@telegram-apps/sdk';

if (miniApp.mount.isAvailable()) {
  miniApp.mount();
  miniApp.isMounted(); // true
}
```

```ts [Functions]
import { mountMiniApp, isMiniAppMounted } from '@telegram-apps/sdk';

if (mountMiniApp.isAvailable()) {
  mountMiniApp();
  isMiniAppMounted(); // true
}
```

:::

> [!ИНФОРМАЦИЯ]
> Метод `mount` также монтирует [параметры темы](theme-params.md), чтобы извлечь правильно настроенные значения.

Чтобы отключить компонент, используйте метод `unmount`:

::: code-group

```ts [Variable]
miniApp.unmount();
miniApp.isMounted(); // false
```

```ts [Functions]
import { unmountMiniApp, isMiniAppMounted } from '@telegram-apps/sdk';

unmountMiniApp();
isMiniAppMounted(); // false
```

:::

## Привязка CSS-переменных

Чтобы раскрыть свойства `miniApp` через CSS-переменные, используйте метод `bindCssVars`.
Свойство сигнала `isCssVarsBound` обновляется после вызова метода.

Этот метод необязательно принимает функцию, которая преобразует значения `bgColor` и `headerColor` в имена CSS-переменных. По умолчанию значения преобразуются в регистр kebab с префиксом `--tg-`.

::: code-group

```ts [Variable]
if (miniApp.bindCssVars.isAvailable()) {
  miniApp.bindCssVars();
  // Создает CSS-переменные, такие как:
  // --tg-bg-color: #aabbcc
  // --tg-header-color: #aabbcc

  miniApp.bindCssVars(key => `--my-prefix-${key}`);
  // Создает CSS-переменные, такие как:
  // --my-prefix-bgColor: #aabbcc
  // --my-prefix-headerColor: #aabbcc

  miniApp.isCssVarsBound(); // true
}
```

```ts [Functions]
import { bindMiniAppCssVars, isMiniAppCssVarsBound } from '@telegram-apps/sdk';

if (bindMiniAppCssVars.isAvailable()) {
  bindMiniAppCssVars();
  // Создает CSS-переменные, такие как:
  // --tg-bg-color: #aabbcc
  // --tg-header-color: #aabbcc

  bindMiniAppCssVars(key => `--my-prefix-${key}`);
  // ССоздает CSS-переменные, такие как:
  // --my-prefix-bgColor: #aabbcc
  // --my-prefix-headerColor: #aabbcc

  isMiniAppCssVarsBound(); // true
}
```

:::

## Цвет заголовка

Чтобы изменить цвет заголовка мини-приложения, используется метод `setHeaderColor`. В свою очередь, вызов этого метода обновляет значение свойства сигнала `headerColor`.

Метод принимает либо значение цвета RGB, либо одну из следующих строк: `bg_color`, `secondary_bg_color`.

::: code-group

```ts [Variable]
if (miniApp.setHeaderColor.isAvailable()) {
  miniApp.setHeaderColor('bg_color');
  miniApp.headerColor(); // 'bg_color'
}

if (
  miniApp.setHeaderColor.isAvailable()
  && miniApp.setHeaderColor.supports('rgb')
) {
  miniApp.setHeaderColor('#aabbcc');
  miniApp.headerColor(); // '#aabbcc'
}
```

```ts [Functions]
import {
  setMiniAppHeaderColor,
  miniAppHeaderColor,
} from '@telegram-apps/sdk';

if (setMiniAppHeaderColor.isAvailable()) {
  setMiniAppHeaderColor('bg_color');
  miniAppHeaderColor(); // 'bg_color'
}

if (
  setMiniAppHeaderColor.isAvailable()
  && setMiniAppHeaderColor.supports('rgb')
) {
  setMiniAppHeaderColor('#aabbcc');
  miniAppHeaderColor(); // '#aabbcc'
}
```

:::

## Цвет фона

Чтобы обновить цвет фона мини-приложения, используйте метод `setBackgroundColor`. Вызов этого метода обновляет значение свойства сигнала `headerColor`.

::: code-group

```ts [Variable]
if (miniApp.setBackgroundColor.isAvailable()) {
  miniApp.setBackgroundColor('#ffffff');
  miniApp.backgroundColor(); // '#ffffff'
}
```

```ts [Functions]
import {
  setMiniAppBackgroundColor,
  miniAppBackgroundColor,
} from '@telegram-apps/sdk';

if (setMiniAppBackgroundColor.isAvailable()) {
  setMiniAppBackgroundColor('#ffffff');
  miniAppBackgroundColor(); // '#ffffff'
}
```

:::

## Активное состояние

Мини-приложение становится неактивным, если оно свернуто в нижний трей клиента Telegram или если текущая активная вкладка браузера мини-приложений изменена на другую.

Чтобы отслеживать, активно ли в данный момент мини-приложение, используйте сигнал `isActive`.

::: code-group

```ts [Variable]
miniApp.isActive();
```

```ts [Functions]
import { isMiniAppActive } from '@telegram-apps/sdk';

isMiniAppActive()
```

:::

## Методы

### `close`

Чтобы закрыть мини-приложение, используйте метод `close`.

::: code-group

```ts [Variable]
if (miniApp.close.isAvailable()) {
  miniApp.close();
}
```

```ts [Functions]
import { closeMiniApp } from '@telegram-apps/sdk';

if (miniApp.close.isAvailable()) {
  miniApp.close();
}
```

:::

### `ready`

Чтобы сообщить, что мини-приложение готово к отображению, используйте метод `ready`. После вызова заполнитель загрузки скрывается, а мини-приложение отображается.

::: code-group

```ts [Variable]
if (miniApp.ready.isAvailable()) {
  miniApp.ready();
}
```

```ts [Functions]
import { miniAppReady } from '@telegram-apps/sdk';

if (miniAppReady.isAvailable()) {
  miniAppReady();
}
```

:::

> [!СОВЕТ]
> Вызовите эту функцию как можно скорее после загрузки важных элементов интерфейса для обеспечения плавного пользовательского опыта.
