# 滑动行为

负责 Telegram 迷你应用程序轻扫行为的💠[组件](../scopes.md)。

## 检查支持

要检查当前 Telegram 小应用程序版本是否支持轻扫行为，需要使用
`isSupported` 方法：

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

## 安装

在使用此组件之前，需要将其挂载，以便与正确配置的属性一起工作。
为此，请使用 `mount` 方法。  它将更新 `isMounted` 信号属性。

::: code-group

```ts [Variable]
import { swipeBehavior } from '@telegram-apps/sdk';

swipeBehavior.mount();
swipeBehavior.isMounted(); // true
```

```ts [Functions]
import {
  mountSwipeBehavior,
  isSwipeBehaviorMounted,
} from '@telegram-apps/sdk';

mountSwipeBehavior(); 
isSwipeBehaviorMounted(); // true
```

:::

要卸载，请使用 `unmount` 方法：

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

## 控制纵向滑动

要启用或禁用垂直轻扫，请使用 `enableVertical` 和 `disableVertical` 方法。
调用这些方法时，会更新 `isVerticalEnabled` 信号属性值。
调用这些方法时，会更新 `isVerticalEnabled` 信号属性值。

::: code-group

```ts [Variable]
swipeBehavior.enableVertical();
swipeBehavior.isVerticalEnabled(); // true

swipeBehavior.disableVertical();
swipeBehavior.isVerticalEnabled(); // false
```

```ts [Functions]
import {
  enableVerticalSwipes,
  disableVerticalSwipes,
  isVerticalSwipesEnabled,
} from '@telegram-apps/sdk';

enableVerticalSwipes();
isVerticalSwipesEnabled(); // true

disableVerticalSwipes();
isVerticalSwipesEnabled(); // false
```

:::