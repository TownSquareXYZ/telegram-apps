# Окружение

Этот пакет предназначен для использования только в приложении Telegram. Поскольку в средах, отличных от Telegram, отсутствуют специфичные для Telegram функции, вызов таких методов,
как [retrieveLaunchParams](launch-parameters.md#retrieving)
или [postEvent](methods-and-events.md#postevent), приведет к ошибкам.

Тем не менее, пакет предоставляет утилиты, которые помогают разработчикам либо разрабатывать приложение
за пределами Telegram, либо определять, не является ли текущая среда мини-приложением Telegram вообще.

## `isTMA`

Чтобы проверить, подходит ли текущее окружение для мини-приложений Telegram, разработчик может воспользоваться функцией `isTMA`.
Она работает в двух режимах: **simple** и **complete**.

### Simple

В этом режиме функция пытается получить параметры запуска из окружения.

Если получение завершится успешно, среда будет считаться мини-приложением Telegram.
Режим Simple является синхронным и возвращает логическое значение.

```ts
import { isTMA } from '@telegram-apps/bridge';

if (isTMA('simple')) {
  console.log('It\'s Telegram Mini Apps');
}
```

Этот режим несколько поверхностен, но все же может быть достаточным для большинства приложений. Для более надежной проверки используйте режим [complete](#complete).

### Complete

В этом режиме функция вызывает метод, специфичный для мини-приложений Telegram, и ожидает
наступления события, специфичного для этого метода.

```ts
import { isTMA } from '@telegram-apps/bridge';

if (await isTMA()) {
  console.log('It\'s Telegram Mini Apps');
}
```

Функция ожидает события 100 миллисекунд, но разработчик может изменить это время, передав объект со свойством `timeout: number`.

```ts
if (await isTMA({ timeout: 50 })) {
  console.log('It\'s Telegram Mini Apps');
}
```

## `mockTelegramEnv`

Пакет предоставляет функцию `mockTelegramEnv`, которая имитирует среду, предоставляемую Telegram. Это помогает разработчикам начать создавать приложения даже без создания записи о мини-приложении в
[BotFather](https://t.me/botfather).

Эта функция принимает параметры запуска в необработанном или обработанном форматах. Вот пример:

```ts
mockTelegramEnv({
  themeParams: {
    accentTextColor: '#6ab2f2',
    bgColor: '#17212b',
    buttonColor: '#5288c1',
    buttonTextColor: '#ffffff',
    destructiveTextColor: '#ec3942',
    headerBgColor: '#17212b',
    hintColor: '#708499',
    linkColor: '#6ab3f3',
    secondaryBgColor: '#232e3c',
    sectionBgColor: '#17212b',
    sectionHeaderTextColor: '#6ab3f3',
    subtitleTextColor: '#708499',
    textColor: '#f5f5f5',
  },
  initData: {
    user: {
      id: 99281932,
      firstName: 'Andrew',
      lastName: 'Rogue',
      username: 'rogue',
      languageCode: 'en',
      isPremium: true,
      allowsWriteToPm: true,
    },
    hash: '89d6079ad6762351f38c6dbbc41bb53048019256a9443988af7a48bcad16ba31',
    authDate: new Date(1716922846000),
    startParam: 'debug',
    chatType: 'sender',
    chatInstance: '8428209589180549439',
  },
  initDataRaw: new URLSearchParams([
    ['user', JSON.stringify({
      id: 99281932,
      first_name: 'Andrew',
      last_name: 'Rogue',
      username: 'rogue',
      language_code: 'en',
      is_premium: true,
      allows_write_to_pm: true,
    })],
    ['hash', '89d6079ad6762351f38c6dbbc41bb53048019256a9443988af7a48bcad16ba31'],
    ['auth_date', '1716922846'],
    ['start_param', 'debug'],
    ['chat_type', 'sender'],
    ['chat_instance', '8428209589180549439'],
  ]).toString(),
  version: '7.2',
  platform: 'tdesktop',
});
```

> [!ВНИМАНИЕ]
> Эта функция только имитирует поведение среды Telegram. Она не отправляет никаких реальных запросов и не выполняет действий, которые будут видны в приложении Telegram.
