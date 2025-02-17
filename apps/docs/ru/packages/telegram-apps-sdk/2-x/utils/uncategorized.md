# Без категории

## `getCurrentTime`

Для получения текущего времени сервера Telegram используйте функцию `getCurrentTime`. Она возвращает объект `Date` JavaScript.

::: code-group

```ts [Using isAvailable]
import { getCurrentTime } from '@telegram-apps/sdk';

if (getCurrentTime.isAvailable()) {
  const time = await getCurrentTime(); // Date
}
```

```ts [Using ifAvailable]
import { getCurrentTime } from '@telegram-apps/sdk';

const time = await getCurrentTime.ifAvailable(); // Date | undefined
```

:::

## `readTextFromClipboard`

Для чтения текста из буфера обмена, используйте функцию `readTextFromClipboard`.

::: code-group

```ts [Using isAvailable]
import { readTextFromClipboard } from '@telegram-apps/sdk';

if (readTextFromClipboard.isAvailable()) {
  const contents = await readTextFromClipboard(); // string | null
}
```

```ts [Using ifAvailable]
import { readTextFromClipboard } from '@telegram-apps/sdk';

const contents = await readTextFromClipboard.ifAvailable(); 
// string | null | undefined
```

:::

## `shareStory`

Метод `shareStory` открывает редактор историй.

У него есть один обязательный параметр: URL-адрес медиафайла, который будет использоваться в качестве фона для истории.

::: code-group

```ts [Using isAvailable]
import { shareStory } from '@telegram-apps/sdk';

if (shareStory.isAvailable()) {
  shareStory('https://my.media/background.png');
}
```

```ts [Using ifAvailable]
import { shareStory } from '@telegram-apps/sdk';

shareStory.ifAvailable('https://my.media/background.png');
```

:::

Функция по желанию принимает объект с дополнительными опциями:

- `text?: string` - подпись для добавления к медиафайлу, с ограничением 0-200 символов для обычных пользователей и 0-2048 символов для [премиум-подписчиков](https://telegram.org/faq_premium#telegram-premium).
- `widgetLink?: object` - объект для включения ссылки на виджет в историю.
  Только [премиум-подписчики](https://telegram.org/faq_premium#telegram-premium) могут публиковать истории со ссылками.
  - `url: string` - URL, который будет включен в историю.
  - `name?: string` - отображаемое имя для ссылки на виджет (0-48 символов).

```ts
shareStory('https://my.media/background.png', {
  text: 'Today was a good day. Love it! Thanks to this public!',
  widgetLink: {
    url: 'https://t.me/heyqbnk',
    name: 'heyqbnk public group',
  },
});
```

## `sendData`

Чтобы отправить данные боту, используйте функцию `sendData`. Эта функция отправляет служебное сообщение боту
и закрывает мини-приложение.

::: code-group

```ts [Using isAvailable]
import { sendData } from '@telegram-apps/sdk';

if (sendData.isAvailable()) {
  sendData('my-data-goes-here');
}
```

```ts [Using ifAvailable]
import { sendData } from '@telegram-apps/sdk';

sendData.ifAvailable('my-data-goes-here');
```

:::

> [!СОВЕТ]
> Эта функция отправляет боту данные до 4096 байт и доступна для мини-приложений, запущенных с помощью кнопки клавиатуры.

> [!ВНИМАНИЕ]
> Эта функция доступна только для мини-приложений, запускаемых с помощью кнопки клавиатуры. Дополнительные сведения см. в поле `web_app_data` класса [Message](https://core.telegram.org/bots/api#message).

## `switchInlineQuery`

Чтобы создать сообщение с префиксом из имени пользователя бота и определенным текстом и отправить его в другой чат, используйте метод `switchInlineQuery`. Вы можете использовать второй необязательный аргумент, чтобы указать, какие типы чатов
можно выбрать для отправки сообщения.

::: code-group

```ts [Using isAvailable]
import { switchInlineQuery } from '@telegram-apps/sdk';

if (switchInlineQuery.isAvailable()) {
  switchInlineQuery('Check this bot!', [
    'users',
    'bots',
    'groups',
    'channels',
  ]);
}
```

```ts [Using ifAvailable]
import { switchInlineQuery } from '@telegram-apps/sdk';

switchInlineQuery.ifAvailable('Check this bot!', [
  'users',
  'bots',
  'groups',
  'channels',
]);
```

:::
