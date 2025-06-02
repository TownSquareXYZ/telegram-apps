---
outline:
  - 2
  - 3
---

# @telegram-apps/init-data-node

> [!TIP] Newer version available
> `@telegram-apps/init-data-node@2.x` is [out](./telegram-apps-init-data-node/2-x)!

<p style="display: flex; gap: 8px; min-height: 20px">
  <a href="https://npmjs.com/package/@telegram-apps/init-data-node">
    <img src="https://img.shields.io/npm/v/@telegram-apps/init-data-node?logo=npm"/>
  </a>
  <img src="https://img.shields.io/bundlephobia/minzip/@telegram-apps/init-data-node"/>
  <a href="https://github.com/Telegram-Mini-Apps/telegram-apps/tree/master/packages/init-data-node">
    <img src="https://img.shields.io/badge/source-black?logo=github"/>
  </a>
</p>

该软件包提供在
服务器端处理 Telegram 迷你应用程序初始化数据的实用程序。 要了解有关初始化数据及其用法的更多信息，请参阅
the [documentation](../platform/init-data.md). 要了解有关初始化数据及其用法的更多信息，请参阅
[文档](../platform/init-data.md).

## 安装

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

## 解析

要将一个值解析为 init 数据，请使用 `parse` 方法。

该方法接受以 `string` 或 `URLSearchParams` 形式呈现的 init 数据。

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

## 验证

### `validate`

要验证初始化数据的签名，需要使用`validate`函数。  它期望初始化数据以原始格式（查询参数）传递，并在某些情况下抛出错误。

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

或者，开发人员可以使用 `isValid` 函数来检查初始数据的有效性。
它不会引发错误，但会返回一个布尔值，表明初始数据的有效性。

- `ERR_AUTH_DATE_INVALID`：`auth_date` 为空或未找到
- `ERR_HASH_INVALID`：`hash` 为空或未找到
- 要验证初始化数据的签名，需要使用`validate`函数。 它希望
  以原始格式（搜索参数）传递初始化数据，并在
  某些情况下出错。
- `ERR_EXPIRED`：初始数据已过期

以下是您可以用来检查错误类型的代码：

```ts
import { validate, isErrorOfType } from '@telegram-apps/init-data-node';

try {
  validate('init-data', 'token');
} catch (e) {
  if (isErrorOfType('ERR_SIGN_INVALID')) {
    console.log('Sign is invalid');
  }
}
```

默认情况下，函数会检查初始化数据是否过期。 默认过期时间设置为 1 天（86,400 秒）。 建议始终检查
初始化数据的有效期，因为它可能被盗但仍然有效。 要禁用此功能，
将 `{ expiresIn: 0 }` 作为第三个参数。

### `validate3rd`

The `validate3rd` function is used to check if the passed init data was signed by Telegram. As
well as the `validate` function, this one accepts the init data in the same format.

As the second argument, it accepts the Telegram Bot identifier that was used to sign this
init data.

The third argument is an object with the following properties:

- `expiresIn` is responsible for init data expiration validation
- `test: boolean`: should be equal `true` if the init data was received in the test Telegram
  environment

要实现这一过程，需要使用 `sign` 方法。 下面是完整的示例：

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

函数会在其中一种情况下出错：

- 解析
- 所有软件包方法都允许开发人员使用散列令牌而不是原始令牌。
- `ERR_SIGN_INVALID`：签名无效
- 默认情况下，函数会检查初始化数据是否过期。
  的默认过期时间设置为 1 天（86,400 秒）。 建议始终检查
  初始化数据的有效期，因为它可能被盗但仍然有效。 要禁用此功能，将 `{ expiresIn: 0 }` 作为第三个参数。

> [!WARNING]
> This function uses **Web Crypto API** instead of Node.js modules.

### `isValid`

或者，开发人员可以使用 `isValid` 函数来检查初始数据的有效性。
它不会引发错误，但会返回一个布尔值，表明初始数据的有效性。
它不会引发错误，但会返回一个布尔值，表明初始数据的有效性。

```ts
import { isValid } from '@telegram-apps/init-data-node';

if (isValid('init-data')) {
  console.log('Init data is fine');
}
```

### `isValid3rd`

Does the same as the `isValid` function, but checks if the init data was signed by Telegram:

```ts
在某些情况下，开发人员可能需要创建自己的初始数据。 例如，如果您使用 `KeyboardButton`
或 `InlineKeyboardButton`，
Telegram 不会自动发送这些数据。 Telegram 无法做到这一点，因为它不知道应该使用哪个 Telegram Bot 令牌
。
```

> [!WARNING]
> This function uses **Web Crypto API** instead of Node.js modules.

## 签名

在某些情况下，开发人员可能需要创建自己的初始数据。 例如，如果您使用的是 `KeyboardButton` 或 `InlineKeyboardButton`，Telegram 不会自动发送此数据。 Telegram 无法执行此操作，因为它不知道应使用哪个 Telegram Bot 令牌。

要实现这一过程，需要使用 `sign` 方法。  解析

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

该函数接受三个参数：

- **要签名的数据**：它表示经过解析的初始数据对象，不包括 `authDate` 和 `hash`
  属性。
- **机器人令牌**：该令牌由 [@BotFather] (https://t.me/botfather) 接收。
- **签署日期**：此值将用作 `authDate` 属性的值。

因此，函数会返回带符号的 init 数据。

## 网页 Crypto API

如果要在 Node.js 以外的环境中使用此软件包，开发人员可以使用 `web`
子目录，该子目录导出的方法与上述方法相同，但会返回承诺。

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

## 传递散列令牌 - Hashed Token

所有包方法都允许开发者使用哈希令牌代替原始令牌。

我们所说的 "散列令牌 "是指使用 HMAC-SHA-256 算法散列的令牌，其密钥来自
`WebAppData`，详见
文档的 [validation](../platform/init-data#validating) 部分。

下面是一些例子：

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

使用这种方法可以减少直接传递原始token的次数。
