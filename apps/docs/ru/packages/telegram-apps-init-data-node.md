---
outline:
  - 2
  - 3
---

# @telegram-apps/init-data-node

<p style="display: flex; gap: 8px; min-height: 20px">
  <a href="https://npmjs.com/package/@telegram-apps/init-data-node">
    <img src="https://img.shields.io/npm/v/@telegram-apps/init-data-node?logo=npm"/>
  </a>
  <img src="https://img.shields.io/bundlephobia/minzip/@telegram-apps/init-data-node"/>
  <a href="https://github.com/Telegram-Mini-Apps/telegram-apps/tree/master/packages/init-data-node">
    <img src="https://img.shields.io/badge/source-black?logo=github"/>
  </a>
</p>

Пакет предоставляет утилиты для работы с данными инициализации мини-приложений Telegram на стороне сервера. Чтобы узнать больше о данных инициализации и их использовании, пожалуйста, обратитесь к [документации](../platform/init-data.md).

## Установка

::: code-group

```bash [pnpm]
pnpm i @telegram-apps/init-data-node
```

```bash [npm]
npm i @telegram-apps/init-data-node
```

```bash [yarn]
yarn add @telegram-apps/init-data-node
```

:::

## Анализ

Чтобы проанализировать значение данных инициализации, используйте метод `parse`.

Метод принимает данные инициализации, представленные как `string` или `URLSearchParams`.

```ts
import { parse } from '@telegram-apps/init-data-node';

try {
  const initData = parse('...');
  // {
  //   canSendAfter: 10000,
  //   chat: {
  //     id: 1,
  //     type: 'group',
  //     username: 'my-chat',
  //     title: 'chat-title',
  //     photoUrl: 'chat-photo',
  //   },
  //   chatInstance: '888',
  //   chatType: 'sender',
  //   queryId: 'QUERY',
  //   receiver: {
  //     addedToAttachmentMenu: false,
  //     allowsWriteToPm: true,
  //     firstName: 'receiver-first-name',
  //     id: 991,
  //     isBot: false,
  //     isPremium: true,
  //     languageCode: 'ru',
  //     lastName: 'receiver-last-name',
  //     photoUrl: 'receiver-photo',
  //     username: 'receiver-username',
  //   },
  //   startParam: 'debug',
  //   user: {
  //     addedToAttachmentMenu: false,
  //     allowsWriteToPm: false,
  //     firstName: 'user-first-name',
  //     id: 222,
  //     isBot: true,
  //     isPremium: false,
  //     languageCode: 'en',
  //     lastName: 'user-last-name',
  //     photoUrl: 'user-photo',
  //     username: 'user-username',
  //   },
  // }
} catch (e) {
  console.error('Something is wrong', e);
}
```

## Проверка

### `validate`

Для проверки подписи данных инициализации используется функция `validate`. Она ожидает, что данные инициализации будут переданы в необработанном формате (параметры поиска) и в определенных случаях выдает ошибку.

```typescript
import { validate } from '@telegram-apps/init-data-node';

const secretToken = '5768337691:AAH5YkoiEuPk8-FZa32hStHTqXiLPtAEhx8';
const initData =
  'query_id=AAHdF6IQAAAAAN0XohDhrOrc' +
  '&user=%7B%22id%22%3A279058397%2C%22first_name%22%3A%22Vladislav%22%2C%22last_name%22%3A%22Kibenko%22%2C%22username%22%3A%22vdkfrost%22%2C%22language_code%22%3A%22ru%22%2C%22is_premium%22%3Atrue%7D' +
  '&auth_date=1662771648' +
  '&hash=c501b71e775f74ce10e377dea85a7ea24ecd640b223ea86dfe453e0eaed2e2b2';

validate(initData, secretToken);
```

Функция выдаст ошибку в одном из следующих случаев:

- `ERR_AUTH_DATE_INVALID`: `auth_date` пусто или не найдено
- `ERR_HASH_INVALID`: `hash` пусто или не найдено
- `ERR_SIGN_INVALID`: подпись недействительна
- `ERR_EXPIRED`: срок действия данных инициализации истек

Вот код, который можно использовать для проверки типа ошибки:

```ts
import { validate, isErrorOfType } from '@telegram-apps/init-data-node';

try {
  validate('init-data', 'token');
} catch (e) {
  if (isErrorOfType(e, 'ERR_SIGN_INVALID')) {
    console.log('Sign is invalid');
  }
}
```

По умолчанию функция проверяет истечение срока действия данных инициализации. Срок действия по умолчанию установлен на 1 день (86 400 секунд). Рекомендуется всегда проверять срок действия данных инициализации, так как они могут быть украдены, но при этом оставаться действительными. Чтобы отключить эту функцию, передайте `{ expiresIn: 0 }` в качестве третьего аргумента.

### `validate3rd`

Функция `validate3rd` используется для проверки того, были ли переданные данные инициализации подписаны Telegram. Как и функция `validate`, эта принимает данные инициализации в том же формате.

В качестве второго аргумента она принимает идентификатор бата Telegram, который использовался для подписи этих данных инициализации.

Третьим аргументом является объект со следующими свойствами:

- `expiresIn` отвечает за проверку срока действия данных инициализации
- `test: boolean`: должно быть равно `true`, если данные инициализации были получены в тестовой среде Telegram

Вот пример использования:

```ts
const initData =
  'user=%7B%22id%22%3A279058397%2C%22first_name%22%3A%22Vladislav%20%2B%20-%20%3F%20%5C%2F%22%2C%22last_name%22%3A%22Kibenko%22%2C%22username%22%3A%22vdkfrost%22%2C%22language_code%22%3A%22ru%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2F4FPEE4tmP3ATHa57u6MqTDih13LTOiMoKoLDRG4PnSA.svg%22%7D' +
  '&chat_instance=8134722200314281151' +
  '&chat_type=private' +
  '&auth_date=1733584787' +
  '&signature=zL-ucjNyREiHDE8aihFwpfR9aggP2xiAo3NSpfe-p7IbCisNlDKlo7Kb6G4D0Ao2mBrSgEk4maLSdv6MLIlADQ' +
  '&hash=2174df5b000556d044f3f020384e879c8efcab55ddea2ced4eb752e93e7080d6';
const botId = 7342037359;

await validate3rd(initData, botId);
```

Функция выдаст ошибку в одном из следующих случаев:

- `ERR_AUTH_DATE_INVALID`: `auth_date` пусто или не найдено
- `ERR_SIGNATURE_MISSING`: `signature` пусто или не найдено
- `ERR_SIGN_INVALID`: подпись недействительна
- `ERR_EXPIRED`: истек срок действия данных инициализации

> [!ОСТОРОЖНО]
> Эта функция использует **Web Crypto API** вместо модулей Node.js.

### `isValid`

В качестве альтернативы, чтобы проверить правильность данных инициализации, разработчик может использовать функцию `isValid`.
Она не выдает ошибку, а возвращает логическое значение, указывающее правильность данных инициализации.

```ts
import { isValid } from '@telegram-apps/init-data-node';

if (isValid('... init data', 'my-bot-token')) {
  console.log('Init data is fine');
}
```

### `isValid3rd`

Делает то же самое, что и функция `isValid`, но проверяет, были ли данные инициализации подписаны Telegram:

```ts
import { isValid3rd } from '@telegram-apps/init-data-node';

const botId = 7342037359;

if (await isValid3rd('... init data', botId)) {
  console.log('Init data is fine');
}
```

> [!ОСТОРОЖНО]
> Эта функция использует **Web Crypto API** вместо модулей Node.js.

## Подписание

В некоторых случаях разработчику необходимо создать собственные данные инициализации. Например, Telegram не отправляет эти данные автоматически, если вы используете что-то вроде `KeyboardButton` или `InlineKeyboardButton`. Telegram не может этого сделать, поскольку не знает, какой токен Telegram бота следует использовать.

Для реализации такого процесса необходимо использовать метод `sign`. Вот полный пример:

::: code-group

```ts [Signing]
import { sign } from '@telegram-apps/init-data-node';

sign(
  {
    canSendAfter: 10000,
    chat: {
      id: 1,
      type: 'group',
      username: 'my-chat',
      title: 'chat-title',
      photoUrl: 'chat-photo',
    },
    chatInstance: '888',
    chatType: 'sender',
    queryId: 'QUERY',
    receiver: {
      addedToAttachmentMenu: false,
      allowsWriteToPm: true,
      firstName: 'receiver-first-name',
      id: 991,
      isBot: false,
      isPremium: true,
      languageCode: 'ru',
      lastName: 'receiver-last-name',
      photoUrl: 'receiver-photo',
      username: 'receiver-username',
    },
    startParam: 'debug',
    user: {
      addedToAttachmentMenu: false,
      allowsWriteToPm: false,
      firstName: 'user-first-name',
      id: 222,
      isBot: true,
      isPremium: false,
      languageCode: 'en',
      lastName: 'user-last-name',
      photoUrl: 'user-photo',
      username: 'user-username',
    },
  },
  '5768337691:AAH5YkoiEuPk8-FZa32hStHTqXiLPtAEhx8',
  new Date(1000),
);
```

```ts [Expected result]
'auth_date=1' +
'&can_send_after=10000' +
'&chat=%7B%22id%22%3A1%2C%22type%22%3A%22group%22%2C%22title%22%3A%22chat-title%22%2C%22photo_url%22%3A%22group%22%2C%22username%22%3A%22my-chat%22%7D' +
'&chat_instance=888' +
'&chat_type=sender' +
'&query_id=QUERY' +
'&receiver=%7B%22added_to_attachment_menu%22%3Afalse%2C%22allows_write_to_pm%22%3Atrue%2C%22first_name%22%3A%22receiver-first-name%22%2C%22id%22%3A991%2C%22is_bot%22%3Afalse%2C%22is_premium%22%3Atrue%2C%22language_code%22%3A%22ru%22%2C%22last_name%22%3A%22receiver-last-name%22%2C%22photo_url%22%3A%22receiver-photo%22%2C%22username%22%3A%22receiver-username%22%7D' +
'&start_param=debug' +
'&user=%7B%22added_to_attachment_menu%22%3Afalse%2C%22allows_write_to_pm%22%3Afalse%2C%22first_name%22%3A%22user-first-name%22%2C%22id%22%3A222%2C%22is_bot%22%3Atrue%2C%22is_premium%22%3Afalse%2C%22language_code%22%3A%22en%22%2C%22last_name%22%3A%22user-last-name%22%2C%22photo_url%22%3A%22user-photo%22%2C%22username%22%3A%22user-username%22%7D' +
'&hash=47cfa22e72b887cba90c9cb833c5ea0f599975b6ce7193741844b5c4a4228b40'
```

:::

Эта функция принимает три аргумента:

- **Данные для подписи**: они представляют собой проанализированный объект данных инициализации, исключая свойства `authDate` и `hash`.
- **Токен бота**: этот токен получен от [@BotFather](https://t.me/botfather).
- **Дата подписания**: это значение будет использоваться как значение свойства `authDate`.

В результате функция возвращает подписанные данные инициализации.

## Web Crypto API

Если этот пакет используется в среде, отличной от Node.js, разработчик может использовать подкаталог `web`, который экспортирует те же методы, что и описано выше, но возвращает промисы.

```ts
import {
  validate,
  sign,
  signData,
  isValid,
} from '@telegram-apps/init-data-node/web';

await validate(...);
await sign(...);
await signData(...);
await isValid(...);
```

## Передача хэшированного токена

Все методы пакета позволяют разработчикам использовать хэшированный токен вместо исходного.

Под "хешированным токеном" мы подразумеваем токен, хешированный с использованием алгоритма HMAC-SHA-256 с ключом, полученным из `WebAppData`, как указано в разделе [валидации](../platform/init-data#validating) из документации.

Вот несколько примеров:

```ts
import { validate, sign } from '@telegram-apps/init-data-node';

const secretTokenHashed = 'a5c609aa52f63cb5e6d8ceb6e4138726ea82bbc36bb786d64482d445ea38ee5f';
const initData =
  'query_id=AAHdF6IQAAAAAN0XohDhrOrc' +
  '&user=%7B%22id%22%3A279058397%2C%22first_name%22%3A%22Vladislav%22%2C%22last_name%22%3A%22Kibenko%22%2C%22username%22%3A%22vdkfrost%22%2C%22language_code%22%3A%22ru%22%2C%22is_premium%22%3Atrue%7D' +
  '&auth_date=1662771648' +
  '&hash=c501b71e775f74ce10e377dea85a7ea24ecd640b223ea86dfe453e0eaed2e2b2';

// Validating.
validate(initData, secretTokenHashed, { tokenHashed: true });

// Signing.
sign(
  {
    canSendAfter: 10000,
    chat: {
      id: 1,
      type: 'group',
      username: 'my-chat',
      title: 'chat-title',
      photoUrl: 'chat-photo',
    },
    chatInstance: '888',
    chatType: 'sender',
    queryId: 'QUERY',
    receiver: {
      addedToAttachmentMenu: false,
      allowsWriteToPm: true,
      firstName: 'receiver-first-name',
      id: 991,
      isBot: false,
      isPremium: true,
      languageCode: 'ru',
      lastName: 'receiver-last-name',
      photoUrl: 'receiver-photo',
      username: 'receiver-username',
    },
    startParam: 'debug',
    user: {
      addedToAttachmentMenu: false,
      allowsWriteToPm: false,
      firstName: 'user-first-name',
      id: 222,
      isBot: true,
      isPremium: false,
      languageCode: 'en',
      lastName: 'user-last-name',
      photoUrl: 'user-photo',
      username: 'user-username',
    },
  },
  secretTokenHashed,
  new Date(1000),
  { tokenHashed: true }
);
```

Вы можете использовать этот подход, чтобы сократить количество случаев прямой передачи исходного токена.
