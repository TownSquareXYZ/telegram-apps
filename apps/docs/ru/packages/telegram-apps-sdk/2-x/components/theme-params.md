# Параметры темы

💠[Компонент](../scopes.md), отвечающий за [параметры темы](../../../../platform/theming.md) мини-приложения Telegram.

## Установка

Перед использованием этого компонента его необходимо смонтировать, чтобы убедиться, что свойства настроены правильно. Для этого используйте метод `mount`, который обновляет свойство сигнала `isMounted`.

::: code-group

```ts [Variable]
import { themeParams } from '@telegram-apps/sdk';

if (themeParams.mount.isAvailable()) {
  themeParams.mount();
  themeParams.isMounted(); // true
}
```

```ts [Functions]
import {
  mountThemeParams,
  isThemeParamsMounted,
} from '@telegram-apps/sdk';

if (mountThemeParams.isAvailable()) {
  mountThemeParams();
  isThemeParamsMounted(); // true
}
```

:::

Чтобы размонтировать, используйте метод `unmount`:

::: code-group

```ts [Variable]
themeParams.unmount(); 
themeParams.isMounted(); // false
```

```ts [Functions]
import {
  unmountThemeParams,
  isThemeParamsMounted,
} from '@telegram-apps/sdk';

unmountThemeParams();
isThemeParamsMounted(); // false
```

:::

## Привязка CSS-переменных

Эта область позволяет отображать свои свойства с помощью переменных CSS.

Чтобы создать новые CSS-переменные, используйте метод `bindCssVars`. При вызове он обновляет свойство сигнала `isCssVarsBound`.

Этот метод необязательно принимает функцию, которая получает ключ палитры темы в формате camel case и возвращает имя CSS-переменной. По умолчанию метод преобразует ключ палитры, используя следующие правила:

- Преобразует значение в регистр kebab.
- Добавляет префикс `--tg-theme-`.

::: code-group

```ts [Variable]
if (themeParams.bindCssVars.isAvailable()) {
  themeParams.bindCssVars();
  // Создает CSS-переменные, такие как:
  // --tg-theme-button-color: #aabbcc
  // --tg-theme-accent-text-color: #aabbcc
  // --tg-theme-bg-color: #aabbcc
  // ...

  themeParams.bindCssVars(key => `--my-prefix-${key}`);
  // Создает CSS-переменные, такие как:
  // --my-prefix-buttonColor: #aabbcc
  // --my-prefix-accentTextColor: #aabbcc
  // --my-prefix-bgColor: #aabbcc
  // ...

  // themeParams.isCssVarsBound() -> true
}
```

```ts [Functions]
import {
  bindThemeParamsCssVars,
  isThemeParamsCssVarsBound,
} from '@telegram-apps/sdk';

if (bindThemeParamsCssVars.isAvailable()) {
  bindThemeParamsCssVars();
  // Создает CSS-переменные, такие как:
  // --tg-theme-button-color: #aabbcc
  // --tg-theme-accent-text-color: #aabbcc
  // --tg-theme-bg-color: #aabbcc
  // ...

  bindThemeParamsCssVars(key => `--my-prefix-${key}`);
  // Создает CSS-переменные, такие как:
  // --my-prefix-buttonColor: #aabbcc
  // --my-prefix-accentTextColor: #aabbcc
  // --my-prefix-bgColor: #aabbcc
  // ...
  
  // isThemeParamsCssVarsBound() -> true
}
```

:::

## Свойства

::: code-group

```ts [Variable]
themeParams.accentTextColor(); // RGB | undefined
themeParams.backgroundColor(); // RGB | undefined
themeParams.buttonTextColor(); // RGB | undefined
themeParams.buttonColor(); // RGB | undefined
themeParams.destructiveTextColor(); // RGB | undefined
themeParams.headerBackgroundColor(); // RGB | undefined
themeParams.hintColor(); // RGB | undefined
themeParams.linkColor(); // RGB | undefined
themeParams.subtitleTextColor(); // RGB | undefined
themeParams.sectionBackgroundColor(); // RGB | undefined
themeParams.secondaryBackgroundColor(); // RGB | undefined
themeParams.sectionSeparatorColor(); // RGB | undefined
themeParams.sectionHeaderTextColor(); // RGB | undefined
themeParams.textColor(); // RGB | undefined

themeParams.state(); // Record<string, RGB>;
```

```ts [Functions]
import {
  themeParamsAccentTextColor,
  themeParamsBackgroundColor,
  themeParamsButtonTextColor,
  themeParamsButtonColor,
  themeParamsDestructiveTextColor,
  themeParamsHeaderBackgroundColor,
  themeParamsHintColor,
  themeParamsLinkColor,
  themeParamsSubtitleTextColor,
  themeParamsSectionBackgroundColor,
  themeParamsSecondaryBackgroundColor,
  themeParamsSectionSeparatorColor,
  themeParamsSectionHeaderTextColor,
  themeParamsTextColor,
  themeParamsState,
} from '@telegram-apps/sdk';

themeParamsAccentTextColor(); // RGB | undefined
themeParamsBackgroundColor(); // RGB | undefined
themeParamsButtonTextColor(); // RGB | undefined
themeParamsButtonColor(); // RGB | undefined
themeParamsDestructiveTextColor(); // RGB | undefined
themeParamsHeaderBackgroundColor(); // RGB | undefined
themeParamsHintColor(); // RGB | undefined
themeParamsLinkColor(); // RGB | undefined
themeParamsSubtitleTextColor(); // RGB | undefined
themeParamsSectionBackgroundColor(); // RGB | undefined
themeParamsSecondaryBackgroundColor(); // RGB | undefined
themeParamsSectionSeparatorColor(); // RGB | undefined
themeParamsSectionHeaderTextColor(); // RGB | undefined
themeParamsTextColor(); // RGB | undefined

themeParamsState(); // Record<string, RGB>;
```

:::