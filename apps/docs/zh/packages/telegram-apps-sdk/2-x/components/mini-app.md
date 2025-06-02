# 迷你应用程序

💠[组件](../scopes.md) 负责管理 Telegram 迷你应用程序内的功能。

## 安装

在使用该组件之前，必须使用 `mount` 方法安装该组件，该方法会更新
`isMounted` 信号属性。

::: code-group

```ts [Variable]
import { miniApp } from '@telegram-apps/sdk';

miniApp.mount();
miniApp.isMounted(); // true
```

```ts [Functions]
import { mountMiniApp, isMiniAppMounted } from '@telegram-apps/sdk';

mountMiniApp();
isMiniAppMounted(); // true
```

:::

> [!INFO]
> `mount`方法还会挂载 [Theme Params](theme-params.md)作用域，以提取正确的
> 配置值。

要卸载组件，请使用 `unmount` 方法：

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

## 绑定 CSS 变量

要通过 CSS 变量公开 `miniApp` 属性，请使用 `bindCssVars` 方法。
调用该方法后，`isCssVarsBound` 信号属性会被更新。
调用该方法后，`isCssVarsBound` 信号属性会被更新。

此方法可选择接受一个函数，该函数可将 `bgColor` 和 `headerColor`
的值转换为 CSS 变量名。 默认情况下，数值会以前缀 `--tg-` 转换为 kebab 大小写。 默认情况下，数值会以前缀 `--tg-` 转换为 kebab 大小写。

::: code-group

```ts [Variable]
miniApp.bindCssVars();
// Creates CSS variables like:
// --tg-bg-color: #aabbcc
// --tg-header-color: #aabbcc

miniApp.bindCssVars(key => `--my-prefix-${key}`);
// Creates CSS variables like:
// --my-prefix-bgColor: #aabbcc
// --my-prefix-headerColor: #aabbcc

miniApp.isCssVarsBound(); // true
```

```ts [Functions]
import { bindMiniAppCssVars, isMiniAppCssVarsBound } from '@telegram-apps/sdk';

bindMiniAppCssVars();
// Creates CSS variables like:
// --tg-bg-color: #aabbcc
// --tg-header-color: #aabbcc

bindMiniAppCssVars(key => `--my-prefix-${key}`);
// Creates CSS variables like:
// --my-prefix-bgColor: #aabbcc
// --my-prefix-headerColor: #aabbcc

isMiniAppCssVarsBound(); // true
```

:::

## 页眉颜色

要更改迷你应用程序的标题颜色，可使用方法 `setHeaderColor`。 反过来，
会更新 `headerColor` 信号属性值。 而这反过来，
会更新 `headerColor` 信号属性值。

该方法接受 RGB 颜色值或以下字符串之一：`bg_color`、`secondary_bg_color`。

::: code-group

```ts [Variable]
if (miniApp.setHeaderColor.isSupported()) {
  miniApp.setHeaderColor('bg_color');
  miniApp.headerColor(); // 'bg_color'
}

if (
  miniApp.setHeaderColor.isSupported()
  && miniApp.setHeaderColor.supports('color')
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

if (setMiniAppHeaderColor.isSupported()) {
  setMiniAppHeaderColor('bg_color');
  miniAppHeaderColor(); // 'bg_color'
}

if (
  setMiniAppHeaderColor.isSupported()
  && setMiniAppHeaderColor.supports('color')
) {
  setMiniAppHeaderColor('#aabbcc');
  miniAppHeaderColor(); // '#aabbcc'
}
```

:::

## 背景颜色

要更新迷你应用程序的背景颜色，请使用 `setBackgroundColor` 方法。 调用
时，该方法会更新 `headerColor` 信号属性值。 调用
时，该方法会更新 `headerColor` 信号属性值。

::: code-group

```ts [Variable]
if (miniApp.setBackgroundColor.isSupported()) {
  miniApp.setBackgroundColor('#ffffff');
  miniApp.backgroundColor(); // '#ffffff'
}
```

```ts [Functions]
import { 
  setMiniAppBackgroundColor,
  miniAppBackgroundColor,
} from '@telegram-apps/sdk';

if (setMiniAppBackgroundColor.isSupported()) {
  setMiniAppBackgroundColor('#ffffff');
  miniAppBackgroundColor(); // '#ffffff'
}
```

:::

## Active State

The mini application becomes inactive if it is wrapped into the bottom native Telegram client tray
or if the currently active tab of the mini apps browser is changed to another one.

To track if the mini application is currently active, use the `isActive` signal.

::: code-group

```ts [Variable]
miniApp.close();
```

```ts [Functions]
import { closeMiniApp } from '@telegram-apps/sdk';

closeMiniApp();
```

:::

## 方法

### `close`

要关闭迷你应用程序，请使用 `close` 方法。

::: code-group

```ts [Variable]
要通过 CSS 变量公开 `miniApp` 属性，请使用 `bindCssVars` 方法。
调用该方法后，`isCssVarsBound` 信号属性会被更新。
```

```ts [Functions]
要发出 Mini App 已准备好显示的信号，请使用 `ready` 方法。 调用后，
加载占位符会被隐藏，而迷你应用程序则会显示出来。
```

:::

### `ready`

要发出 小程序已准备好显示的信号，请使用 `ready` 方法。 调用后，
加载占位符会被隐藏，而小程序则会显示出来。 调用后，
加载占位符会被隐藏，而小程序则会显示出来。

::: code-group

```ts [Variable]
miniApp.ready();
```

```ts [Functions]
import { miniAppReady } from '@telegram-apps/sdk';

miniAppReady();
```

:::

> [!TIP]
> 在加载基本界面元素后尽早调用该函数，以确保
> 顺畅的用户体验。