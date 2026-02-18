---
outline: [ 2, 3 ]
---

# Данные инициализации

💠[Компонент](../scopes.md), отвечающий за [инициализацию данных](../../../../../platform/init-data.md) мини-приложения Telegram.

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

Чтобы проанализировать значения данных инициализации, используйте функцию `parseInitData`.

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

В этом разделе представлен полный список сигналов, связанных с данными инициализации.

### `authDate`

Тип возврата: `Date | undefined`

Дата создания данных инициализации.

::: code-group

```ts [Variable]
initData.authDate(); // Дата(1727368894000)
```

```ts [Functions]
import { initDataAuthDate } from '@telegram-apps/sdk';

initDataAuthDate(); // Дата(1727368894000)
```

:::

### `canSendAfter`

Тип возврата: `number | undefined`

Количество секунд, через которые можно отправить сообщение с помощью метода [answerWebAppQuery](https://core.telegram.org/bots/api#answerwebappquery).

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

Тип возврата: `Date | undefined`

[canSendAfter](#cansendafter), но как Date.

::: code-group

```ts [Variable]
initData.canSendAfterDate(); // Дата(1727368897600)
```

```ts [Functions]
import { initDataCanSendAfterDate } from '@telegram-apps/sdk';

initDataCanSendAfterDate(); // Дата(1727368897600)
```

:::

### `chat`

Тип возврата: `undefined` или [`Chat`](../../../../platform/init-data.md#chat) со свойствами в регистре camel.

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

Тип возврата: `string | undefined`

Тип чата, из которого было открыто мини-приложение. Значения:

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

Тип возврата: `string | undefined`

Подпись данных инициализации.

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

Тип возврата: `string | undefined`

Уникальный идентификатор сеанса мини-приложения. Используется в процессе отправки сообщения через метод [answerWebAppQuery](https://core.telegram.org/bots/api#answerwebappquery).

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

Тип возврата: `string | undefined`

Необработанное строковое представление данных инициализации.

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

Тип возврата: `undefined` или [`User`](../../../../platform/init-data.md#user) со свойствами в регистре camel.

Объект, содержащий данные о собеседнике текущего пользователя в чате, где бот был запущен через меню вложений.

> [!ПРИМЕЧАНИЕ]
> Возвращается только для приватных чатов и только для мини-приложений, запущенных через меню вложений.

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

Возвращаемый тип: `undefined` или [`InitData`](../../../../platform/init-data.md#parameters-list) со свойствами в регистре camel.

Объект, содержащий данные инициализации в формате объекта.

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

Тип возврата: `string | undefined`

Значение параметра запроса `startattach` или `startapp`, указанного в ссылке.

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

Тип возврата: `undefined` или [`User`](../../../../platform/init-data.md#user) со свойствами в регистре camel.

Объект, содержащий информацию о текущем пользователе.

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
