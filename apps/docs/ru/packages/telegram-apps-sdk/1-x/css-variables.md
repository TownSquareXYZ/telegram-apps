# Переменные CSS

Этот пакет содержит утилиты, помогающие разработчикам автоматизировать управление переменными CSS компонентов.
Как и Telegram SDK, `@telegram-apps/sdk` позволяет разработчикам задавать глобальные переменные CSS, связанные с конкретными компонентами.

## `bindViewportCSSVars`

Функция `bindViewportCSSVars` принимает экземпляр [Viewport](components/viewport.md) и создает переменные
для следующих свойств: `height`, `width` и `stableHeight`.

```ts
import { bindViewportCSSVars, initViewport } from '@telegram-apps/sdk';

const vp = await initViewport();

bindViewportCSSVars(vp);
```

По умолчанию эта функция создает глобальные переменные CSS с названиями
`--tg-viewport-height`, `--tg-viewport-width` и `--tg-viewport-stable-height`. Однако функция
позволяет передать генератор названий переменных CSS, который принимает одно из строковых значений, каждое из которых
отвечает за определенное свойство: `width`, `height` или `stable-height`.

```ts
bindViewportCSSVars(vp, key => {
  switch (key) {
    case 'height':
      return `--viewportHeight`;
    case 'width':
      return `--viewportWidth`;
    case 'stable-height':
      return `--viewportStableHeight`;
    default:
      return `--void`;
  }
});
```

## `bindThemeParamsCSSVars`

Эта функция принимает экземпляр [ThemeParams](components/theme-params.md) и создает глобальные переменные CSS, связанные с параметрами темы.

```ts
import { bindThemeParamsCSSVars, initThemeParams } from '@telegram-apps/sdk';

const tp = initThemeParams();

bindThemeParamsCSSVars(tp);
```

По умолчанию эта функция преобразует свойства экземпляра ThemeParams из camel case в kebab case и
добавляет префикс `--tg-theme-`. Вот пример созданных переменных:

- `--tg-theme-bg-color`
- `--tg-theme-secondary-bg-color`
- `--tg-theme-accent-text-color`
- и т.д.

Как и функция [bindViewportCSSVars](#bindViewportCSSVars), она позволяет передать генератор названий переменных CSS, который принимает свойства экземпляра ThemeParams.

```ts
bindThemeParamsCSSVars(tp, key => {
  // Преобразует camel case в kebab case.
  return `--${key.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`)}`;
});
```

## `bindMiniAppCSSVars`

Функция `bindMiniAppCSSVars` принимает экземпляр [MiniApp](components/mini-app.md) вместе с
экземпляром [ThemeParams](components/theme-params.md), создавая глобальные CSS-переменные, связанные с экземпляром MiniApp.

```ts
import { bindMiniAppCSSVars, initMiniApp, initThemeParams } from '@telegram-apps/sdk';

const ma = initMiniApp();
const tp = initThemeParams();

bindMiniAppCSSVars(ma, tp);
```

По умолчанию она создает такие переменные, как `--tg-bg-color` и `--tg-header-color`. Однако, как и все
другие функции привязки переменных CSS, она позволяет настраивать генерируемые имена. Передаваемый генератор
принимает один из ключей: `bg` и `header`, ожидая возврата полного имени переменной CSS.

```ts
bindMiniAppCSSVars(ma, tp, key => {
  switch (key) {
    case 'bg':
      return `--miniAppBg`;
    case 'header':
      return `--miniAppHeader`;
    default:
      return `--void`;
  }
});
```
