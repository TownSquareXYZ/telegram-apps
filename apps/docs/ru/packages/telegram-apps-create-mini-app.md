# @telegram-apps/create-mini-app

<p style="display: inline-flex; gap: 8px">
  <a href="https://npmjs.com/package/@telegram-apps/create-mini-app">
    <img src="https://img.shields.io/npm/v/@telegram-apps/create-mini-app?logo=npm"/>
  </a>
  <a href="https://github.com/Telegram-Mini-Apps/telegram-apps/tree/master/packages/create-mini-app">
    <img src="https://img.shields.io/badge/source-black?logo=github"/>
  </a>
</p>

`@telegram-apps/create-mini-app` - это инструмент командной строки (CLI), предназначенный для создания вашего нового мини-приложения на платформе мини-приложений Telegram. Он генерирует проект с предварительно настроенными библиотеками и файлами шаблонов, позволяя вам настроить содержимое в соответствии с вашими конкретными требованиями.

## Использование

Для запуска инструмента используйте один из следующих сценариев в зависимости от вашего менеджера пакетов.

::: code-group

```bash [pnpm]
pnpm dlx @telegram-apps/create-mini-app@latest
```

```bash [npm]
npx @telegram-apps/create-mini-app@latest
```

```bash [yarn]
yarn create @telegram-apps/mini-app
```

:::

## Создание нового приложения

Приведенная выше команда выполняет скрипт, который проведет вас через создание приложения, последовательно запрашивая следующую информацию:

### 1. Имя каталога проекта

- **Подсказка**: введите имя папки, в которой будут находиться файлы проекта.

- **По умолчанию**: mini-app
  Скрипт создаст подпапку с указанным именем в текущем каталоге.

### 2. Предпочтительные технологии

| Параметр       | Подробности                                                                                                                                                                                                                                                                                                                                                                                                      |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Язык**       | Выберите между **TypeScript** или **JavaScript**.                                                                                                                                                                                                                                                                                                                                                |
| **SDK**        | **• tma.js** [@telegram-apps/sdk](https://www.npmjs.com/package/@telegram-apps/sdk) <br/>Библиотека TypeScript для бесперебойной работы с функциями мини-приложений Telegram. <br/> **• Telegram SDK** [@twa-dev/sdk](https://www.npmjs.com/package/@twa-dev/sdk)<br/>Этот пакет позволяет работать с SDK как с пакетом npm.           |
| **Фреймворки** | **• React.js** [шаблон](https://github.com/Telegram-Mini-Apps/reactjs-template)<br/> **• Next.js** [шаблон](https://github.com/Telegram-Mini-Apps/nextjs-template)<br/> **• Solid.js** [шаблон](https://github.com/Telegram-Mini-Apps/solidjs-js-template)<br/> **• Vue.js** [шаблон](https://github.com/Telegram-Mini-Apps/vuejs-template)<br/> |

### 3. URL-адрес удаленного репозитория Git (необязательно)

Введите URL-адрес удаленного репозитория Git. Это значение будет использоваться для подключения созданного проекта к вашему удаленному репозиторию Git. Это должна быть либо ссылка HTTPS, либо строка подключения SSH.

## Конфигурация сборки

Проекты, созданные с помощью `create-mini-app`, настроены на использование [Vite](https://vite.dev/). Проект включает файл `vite.config.js`, который вы можете настроить для изменений параметров сборки по вашему усмотрению.
