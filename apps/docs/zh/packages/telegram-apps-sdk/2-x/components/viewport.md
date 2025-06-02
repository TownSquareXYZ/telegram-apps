# 视口 - Viewport {#Viewport}

负责 Telegram Mini
Apps [viewport](../../../../platform/viewport.md) 的💠[组件](../scopes.md)。

## 安装

在使用此组件之前，需要将其挂载，以便与正确配置的属性一起工作。
为此，请使用 `mount` 方法。  它将更新 `isMounted` 信号属性。

::: code-group

```ts [Variable]
import { viewport } from '@telegram-apps/sdk';

viewport.mount();
viewport.isMounted(); // true
```

```ts [Functions]
import {
  mountViewport,
  isViewportMounted,
} from '@telegram-apps/sdk';

mountViewport();
isViewportMounted(); // true
```

:::

要卸载，请使用 `unmount` 方法：

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

## 绑定 CSS 变量

要通过 CSS 变量公开 `viewport` 属性，请使用 `bindCssVars` 方法。
调用该方法后，`isCssVarsBound` 信号属性会被更新。
调用该方法后，"isCssVarsBound "信号属性会被更新。

此方法可选择接受一个函数，该函数可将 `width`、`height`
和 `stableHeight` 的值转换为 CSS 变量名。 默认情况下，数值会通过
前缀 `--tg-viewport-` 转换为 kebab 大小写。 默认情况下，数值会通过
前缀 `--tg-viewport-` 转换为 kebab 大小写。

::: code-group

```ts [Variable]
viewport.bindCssVars();
// Creates CSS variables like:
// --tg-viewport-height: 675px
// --tg-viewport-width: 320px
// --tg-viewport-stable-height: 675px

viewport.bindCssVars(key => `--my-prefix-${key}`);
// Creates CSS variables like:
// --my-prefix-height: 675px
// --my-prefix-width: 320px
// --my-prefix-stableHeight: 675px

viewport.isCssVarsBound(); // true
```

```ts [Functions]
import {
  bindViewportCssVars,
  isViewportCssVarsBound,
} from '@telegram-apps/sdk';

bindViewportCssVars();
// Creates CSS variables like:
// --tg-viewport-height: 675px
// --tg-viewport-width: 320px
// --tg-viewport-stable-height: 675px

bindViewportCssVars(key => `--my-prefix-${key}`);
// Creates CSS variables like:
// --my-prefix-height: 675px
// --my-prefix-width: 320px
// --my-prefix-stableHeight: 675px

isViewportCssVarsBound(); // true
```

:::

## 扩展

要扩展视口，请使用 `expand` 方法。

::: code-group

```ts [Variable]
viewport.expand();
```

```ts [Functions]
import { expandViewport } from '@telegram-apps/sdk';

expandViewport();
```

:::

## Fullscreen Mode

To enable the fullscreen mode, the method `requestFullscreen` is used:

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

To exit the fullscreen mode, use the `exitFullscreen` method:

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

## Safe Area Insets

The viewport component offers access to two types of insets:

- **Safe area insets**
- **Content safe area insets**

For more details on the differences between these inset types, visit the
[**Viewport**](../../../../platform/viewport.md) page.

The component provides access to these insets through the following signals:

::: code-group

```ts [Variable]
// Objects with numeric properties "top", "bottom", "left" and "right".
viewport.safeAreaInsets();
viewport.contentSafeAreaInsets();

// Numeric values.
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

// Objects with numeric properties "top", "bottom", "left" and "right".
viewportSafeAreaInsets();
viewportContentSafeAreaInsets();

// Numeric values.
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