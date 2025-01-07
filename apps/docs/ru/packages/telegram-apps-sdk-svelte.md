---
outline:
  - 2
  - 3
---

# @telegram-apps/sdk-svelte

<p style="display: inline-flex; gap: 8px">
  <a href="https://npmjs.com/package/@telegram-apps/sdk-svelte">
    <img src="https://img.shields.io/npm/v/@telegram-apps/sdk-svelte?logo=npm"/>
  </a>
  <img src="https://img.shields.io/bundlephobia/minzip/@telegram-apps/sdk-svelte"/>
  <a href="https://github.com/Telegram-Mini-Apps/telegram-apps/tree/master/packages/sdk-svelte">
    <img src="https://img.shields.io/badge/source-black?logo=github"/>
  </a>
</p>

Пакет Svelte.js, предоставляющий утилиты, которые могут оказаться полезными разработчикам при разработке мини-приложений.

> [СОВЕТ!]
> Поскольку этот пакет предлагает утилиты, расширяющие функциональность [@telegram-apps/sdk](./telegram-apps-sdk/2-x.md), рекомендуется сначала ознакомиться с документацией пакета SDK.

## Установка

Прежде чем продолжить, предполагается, что вы уже установили пакет `svelte-js`, поскольку он является переменной зависимостью этого пакета.

::: code-group

```bash [pnpm]
pnpm i @telegram-apps/sdk-svelte
```

```bash [npm]
npm i @telegram-apps/sdk-svelte
```

```bash [yarn]
yarn add @telegram-apps/sdk-svelte
```

:::

> [ИНФОРМАЦИЯ!]
> Этот пакет полностью реэкспортирует пакет [@telegram-apps/sdk](./telegram-apps-sdk/2-x), поэтому вам не нужно устанавливать его отдельно.

## Использование

Простой пример использования пакета:

:::code-group

```svelte [index.svelte]
<script lang="ts">
  import { init, backButton } from '@telegram-apps/sdk-svelte';

  import { BackButton } from './BackButton.svelte';

  // Initialize the package.
  init();
</script>

<BackButton />
```

```svelte [BackButton.svelte]
/**
 * Компонент, который управляет видимостью кнопки "Назад".
 */
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { backButton, useSignal } from '@telegram-apps/sdk-svelte';

  const isVisible = useSignal(backButton.isVisible);

  $: console.log('The button is', isVisible.value ? 'visible' : 'invisible')

  onMount(() => {
    backButton.show();
  });

  onDestroy(() => {
    backButton.hide();
  });
</script>
```

:::

## Хуки

### `useSignal`

Утилита, которая позволяет использовать [сигналы](./telegram-apps-signals.md) в приложении. Она возвращает Svelte ref-объект, который обновляется при каждом изменении сигнала.

```svelte
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { backButton, useSignal } from '@telegram-apps/sdk-svelte';

  const isVisible = useSignal(backButton.isVisible);

  $: console.log('The button is', isVisible.value ? 'visible' : 'invisible')

  onMount(() => {
    backButton.show();
  });

  onDestroy(() => {
    backButton.hide();
  });
</script>
```

### `useLaunchParams`

Функция, которая возвращает параметры запуска мини-приложения.

```svelte
<script lang="ts">
  import { useLaunchParams } from '@telegram-apps/sdk-svelte';

  const lp = useLaunchParams();
</script>

<div>Start param: {lp.startParam}</div>
```
