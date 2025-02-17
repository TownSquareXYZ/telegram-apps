# @telegram-apps/bridge

<p style="display: flex; gap: 8px; min-height: 20px">
  <a href="https://npmjs.com/package/@telegram-apps/bridge">
    <img src="https://img.shields.io/npm/v/@telegram-apps/bridge?logo=npm"/>
  </a>
  <img src="https://img.shields.io/bundlephobia/minzip/@telegram-apps/bridge"/>
  <a href="https://github.com/Telegram-Mini-Apps/telegram-apps/tree/master/packages/bridge">
    <img src="https://img.shields.io/badge/source-black?logo=github"/>
  </a>
</p>

Самый низкий уровень взаимодействия с мини-приложениями Telegram.

Этот пакет предоставляет основные утилиты и типы приложений для разработки на платформе мини-приложений Telegram.

Разработчик может использовать только этот пакет, но рекомендуется использовать пакет более высокого уровня,
например, [@telegram-apps/sdk](telegram-apps-sdk/2-x).

## Установка

::: code-group

```bash [pnpm]
pnpm i @telegram-apps/bridge
```

```bash [npm]
npm i @telegram-apps/bridge
```

```bash [yarn]
yarn add @telegram-apps/bridge
```

:::

## Использование

Вот простой пример использования этого пакета. Подробнее см. в следующих статьях документации.

```ts
import {
  defineEventHandlers,
  on,
  postEvent,
} from '@telegram-apps/bridge';

// Определяем обработчики событий мини-приложения для получения 
// событий от приложения Telegram.
defineEventHandlers();

// Показываем кнопку возврата, ждем, пока она не будет нажата один раз,
// затем скрываем ее.
postEvent('web_app_setup_back_button', { is_visible: true });

const off = on('back_button_pressed', () => {
  postEvent('web_app_setup_back_button', { is_visible: false });
  off();
});
```
