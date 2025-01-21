---
outline:
  - 2
  - 3
---

# @telegram-apps/sdk-vue

<p style="display: inline-flex; gap: 8px">
  <a href="https://npmjs.com/package/@telegram-apps/sdk-vue">
    <img src="https://img.shields.io/npm/v/@telegram-apps/sdk-vue?logo=npm"/>
  </a>
  <img src="https://img.shields.io/bundlephobia/minzip/@telegram-apps/sdk-vue"/>
  <a href="https://github.com/Telegram-Mini-Apps/telegram-apps/tree/master/packages/sdk-vue">
    <img src="https://img.shields.io/badge/source-black?logo=github"/>
  </a>
</p>

Пакет Vue.js, предоставляющий утилиты, которые могут оказаться полезными разработчикам при разработке мини-приложений.

> [СОВЕТ!]
> Поскольку этот пакет предлагает утилиты, расширяющие функциональность [@telegram-apps/sdk](./telegram-apps-sdk/2-x.md), рекомендуется сначала ознакомиться с документацией пакета SDK.

## Установка

Прежде чем продолжить, предполагается, что вы уже установили пакет `vue`, поскольку он является зависимым от этого пакета.

::: code-group

```bash [pnpm]
pnpm i @telegram-apps/sdk-vue
```

```bash [npm]
npm i @telegram-apps/sdk-vue
```

```bash [yarn]
yarn add @telegram-apps/sdk-vue
```

:::

> [ИНФОРМАЦИЯ!]
> Этот пакет полностью реэкспортирует пакет [@telegram-apps/sdk](./telegram-apps-sdk/2-x), поэтому вам не нужно устанавливать его отдельно.

## Использование

Вот простой пример использования пакета:

:::code-group

```ts [index.ts]
import { createApp } from 'vue';
import { init } from '@telegram-apps/sdk-vue';
import App from './App.vue';

// Инициализировать пакет.
init();

const app = createApp(App);

app.mount('#root');
```

```vue [PopupButton.vue]
<script setup lang="ts">
/**
 * Component which opens native Telegram Popup.
 */
import { popup } from '@telegram-apps/sdk-vue'

const props = defineProps<{ title: string, message: string }>()

function open() {
  if (popup.isSupported()) {
    popup.open(props);
    return;
  }

  // Open fallback HTML dialog...
}
</script>

<template>
  <button aria-haspopup="dialog" @click="open">
    Open popup
  </button>
</template>
```

:::

## Хуки

### `useSignal`

Утилита, которая позволяет вам использовать [сигналы](./telegram-apps-signals.md) в приложении. Она возвращает Vue ссылку, которая обновляется каждый раз, когда меняется сигнал.

```ts [useMainButton.vue]
/**
 * Композиция, который инкапсулирует логику взаимодействия mainButton */
import { mainButton, useSignal } from '@telegram-apps/sdk-vue';

export function useMainButton() {
  if (!mainButton.isMounted()) {
    mainButton.mount();
  }

  const isVisible = useSignal(mainButton.isVisible);

  return { isVisible };
}
```

### `useLaunchParams`

Функция, которая возвращает параметры запуска мини-приложения. Для Vue.js это просто функция `retrieveLaunchParams` из `@telegram-apps/sdk`.

```ts [useInitApp.ts]
/**
 * Композиция, который инкапсулирует логику параметров запуска
 */
import { useLaunchParams } from '@telegram-apps/sdk-vue';

export function useInitApp() {
  const lp = useLaunchParams();

  if (lp.startParam) {
    switch (lp.startParam) {
      case 'navigate-to-page':
        // evaluate navigation
        return;
    }
  }
}
```

## Интеграция с маршрутизатором Vue

Приложение Telegram использует хэш URL для передачи параметров запуска в TMA, см. [эту статью](https://docs.telegram-mini-apps.com/platform/launch-parameters#transmission-method) для получения более подробной информации.

Поэтому [маршрутизатор Vue](https://router.vuejs.org/) должен использовать [режим HTML5](https://router.vuejs.org/guide/essentials/history-mode.html#HTML5-Mode):

```ts [router.ts]
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    //...
  ],
})
```
