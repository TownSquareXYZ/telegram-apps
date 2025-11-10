---
outline: [ 2, 3 ]
---

# Инициализация данных

💠[Компонент](../scopes.md), отвечающий за Telegram Mini
Apps [init data](../../../../platform/init-data.md).

## Восстановление

Чтобы восстановить состояние компонента, используйте метод `restore`.

::: code-group

```ts [Variable]
import { initData } from '@telegram-apps/sdk';

initData.restore();
```

```ts [Functions]
import { restoreInitData } from '@telegram-apps/sdk';

restoreInitData();
```

:::

## Анализ

Чтобы проанализировать значение как данные инициализации, используйте функцию `parseInitData`.

```ts
import { parseInitData } from '@telegram-apps/sdk';

const initData = parseInitData('auth_date=123&query_id=anQQ231vs&...');
// {
//   user: {
//     id: 99281932,
//     firstName: 'Andrew',
//     lastName: 'Rogue',
//     username: 'rogue',
//     languageCode: 'en',
//     isPremium: true,
//     allowsWriteToPm: true,
//   },
//   hash: 'abcedef123',
//   authDate: Date(1716922846000),
//   startParam: 'debug',
//   chatType: 'sender',
//   chatInstance: '8428209589180549439',
// };
```

Функция возвращает объект [инициализации данных](../../../../platform/init-data.md#parameters-list)
со свойствами в camel регистре.

## Сигналы

В этом разделе приведен полный список сигналов, связанных с данными инициализации.

### `authDate`

Тип возвращаемого значения: `Date | undefined`

Дата создания данных инициализации.

::: code-group

```ts [Variable]
initData.authDate(); // Date(1727368894000)
```

```ts [Functions]
import { initDataAuthDate } from '@telegram-apps/sdk';

initDataAuthDate(); // Date(1727368894000)
```

:::

### `canSendAfter`

Тип возвращаемого значения: `number | undefined`

Количество секунд, по истечении которых сообщение может быть отправлено с помощью метода
[answerWebAppQuery](https://core.telegram.org/bots/api#answerwebappquery).

::: code-group

```ts [Variable]
initData.canSendAfter(); // 3600
```

```ts [Functions]
import { initDataCanSendAfter } from '@telegram-apps/sdk';

initDataAuthDate(); // 3600
```

:::

### `canSendAfterDate`

Тип возвращаемого значения: `Date | undefined`

[canSendAfter](#cansendafter), но в виде даты.

::: code-group

```ts [Variable]
initData.canSendAfterDate(); // Date(1727368897600)
```

```ts [Functions]
import { initDataCanSendAfterDate } from '@telegram-apps/sdk';

initDataCanSendAfterDate(); // Date(1727368897600)
```

:::

### `chat`

Тип возвращаемого значения: `undefined` или [`Chat`](../../../../platform/init-data.md#chat) со свойствами, написанными в верблюжьем регистре.

Объект, содержащий данные о чате, в котором бот был запущен через меню вложений.

> [!ПРИМЕЧАНИЕ]
> Возвращается для супергрупп, каналов и групповых чатов — только для мини-приложений, запущенных через меню вложений.

::: code-group

```ts [Variable]
initData.chat();
// {
//   id: 7728725378876215,
//   type: 'group',
//   title: '@BotFather',
//   photoUrl: 'https://example.com/image.png',
//   username: 'botfather'
// }
```

```ts [Functions]
import { initDataChat } from '@telegram-apps/sdk';

initDataChat();
// {
//   id: 7728725378876215,
//   type: 'group',
//   title: '@BotFather',
//   photoUrl: 'https://example.com/image.png',
//   username: 'botfather'
// }
```

:::

### `chatType`

Тип возвращаемого значения: `string | undefined`

Тип чата, из которого были открыты мини-приложения. Значения:

- `sender`
- `private`
- `group`
- `supergroup`
- `channel`

> [!ПРИМЕЧАНИЕ]
> Возвращается только для приложений, открытых по прямой ссылке.

::: code-group

```ts [Variable]
initData.chatType(); // 'group'
```

```ts [Functions]
import { initDataChatType } from '@telegram-apps/sdk';

initDataChatType(); // 'group'
```

:::

### `chatInstance`

Тип возврата: `string | undefined`

Глобальный идентификатор, указывающий чат, из которого было открыто мини-приложение.

> [!ПРЕДУПРЕЖДЕНИЕ]
> Возвращается только для приложений, открытых по прямой ссылке.

::: code-group

```ts [Variable]
initData.chatInstance(); // 'group'
```

```ts [Functions]
import { initDataChatInstance } from '@telegram-apps/sdk';

initDataChatInstance(); // '899667289674387257'
```

:::

### `hash`

Return type: `string | undefined`

Initialization data signature.

::: code-group

```ts [Variable]
initData.hash(); // 'group'
```

```ts [Functions]
import { initDataHash } from '@telegram-apps/sdk';

initDataHash(); // 'sgbbc62g3bvdhg3djsaasd'
```

:::

### `queryId`

Return type: `string | undefined`

The unique session ID of the Mini App. Used in the process of
sending a message via the
method [answerWebAppQuery](https://core.telegram.org/bots/api#answerwebappquery).

::: code-group

```ts [Variable]
initData.queryId(); // 'group'
```

```ts [Functions]
import { initDataQueryId } from '@telegram-apps/sdk';

initDataQueryId(); // 'ssVXZ231ger'
```

:::

### `raw`

Return type: `string | undefined`

A raw string representation of the initialization data.

::: code-group

```ts [Variable]
initData.raw(); // 'user=...&chat=...&...'
```

```ts [Functions]
import { initDataRaw } from '@telegram-apps/sdk';

initDataRaw(); // 'user=...&chat=...&...'
```

:::

### `receiver`

Return type: `undefined` or [`User`](../../../../platform/init-data.md#user) with camel-cased
properties.

An object containing data about the chat partner of the current user in
the chat where the bot was launched via the attachment menu.

> [!NOTE]
> Returned only for private chats and only for Mini Apps launched via the attachment menu.

::: code-group

```ts [Variable]
initData.user();
// {
//   addedToAttachmentMenu: false,
//   allowsWriteToPm: true,
//   isPremium: true,
//   firstName: 'Pavel',
//   id: 78262681,
//   isBot: false,
//   lastName: 'Durov',
//   languageCode: 'ru',
//   photoUrl: 'https://example.com/image.png',
//   username: 'durove',
// }
```

```ts [Functions]
import { initDataUser } from '@telegram-apps/sdk';

initDataUser();
// {
//   addedToAttachmentMenu: false,
//   allowsWriteToPm: true,
//   isPremium: true,
//   firstName: 'Pavel',
//   id: 78262681,
//   isBot: false,
//   lastName: 'Durov',
//   languageCode: 'ru',
//   photoUrl: 'https://example.com/image.png',
//   username: 'durove',
// }
```

:::

### `state`

Return type: `undefined` or [`InitData`](../../../../platform/init-data.md#parameters-list) with
deeply camel-cased properties.

An object containing the initialization data in object format.

::: code-group

```ts [Variable]
initData.state();
```

```ts [Functions]
import { initDataState } from '@telegram-apps/sdk';

initDataState();
```

:::

### `startParam`

Return type: `string | undefined`

The value of the `startattach` or `startapp` query parameter specified in the link.

::: code-group

```ts [Variable]
initData.startParam(); // 'my-value'
```

```ts [Functions]
import { initDataStartParam } from '@telegram-apps/sdk';

initDataStartParam(); // 'my-value'
```

:::

### `user`

Return type: `undefined` or [`User`](../../../../platform/init-data.md#user) with camel-cased
properties.

An object containing information about the current user.

::: code-group

```ts [Variable]
initData.user();
// {
//   addedToAttachmentMenu: false,
//   allowsWriteToPm: true,
//   isPremium: true,
//   firstName: 'Pavel',
//   id: 78262681,
//   isBot: false,
//   lastName: 'Durov',
//   languageCode: 'ru',
//   photoUrl: 'https://example.com/image.png',
//   username: 'durove',
// }
```

```ts [Functions]
import { initDataUser } from '@telegram-apps/sdk';

initDataUser();
// {
//   addedToAttachmentMenu: false,
//   allowsWriteToPm: true,
//   isPremium: true,
//   firstName: 'Pavel',
//   id: 78262681,
//   isBot: false,
//   lastName: 'Durov',
//   languageCode: 'ru',
//   photoUrl: 'https://example.com/image.png',
//   username: 'durove',
// }
```

:::
