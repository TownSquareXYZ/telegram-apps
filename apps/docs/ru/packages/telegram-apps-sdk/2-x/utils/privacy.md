# Конфиденциальность

## `requestPhoneAccess`

Чтобы запросить доступ к информации о телефоне пользователя, используйте метод `requestPhoneAccess`. Если пользователь предоставит доступ, бот разработчика получит данные о телефоне.

::: code-group

```ts [Using isAvailable]
import { requestPhoneAccess } from '@telegram-apps/sdk';

if (requestPhoneAccess.isAvailable()) {
  const status = await requestPhoneAccess();
  // Статус будет 'sent' | 'cancelled' | string
}
```

```ts [Using ifAvailable]
import { requestPhoneAccess } from '@telegram-apps/sdk';

const status = await requestPhoneAccess.ifAvailable();
// Статус будет 'sent' | 'cancelled' | string | undefined
```

:::

## `requestWriteAccess`

Чтобы запросить разрешение на отправку сообщений пользователю, используйте метод `requestWriteAccess`.

::: code-group

```ts [Using isAvailable]
import { requestWriteAccess } from '@telegram-apps/sdk';

if (requestWriteAccess.isAvailable()) {
  const status = await requestWriteAccess();
  // Статус будет 'allowed' | string
}
```

```ts [Using ifAvailable]
import { requestWriteAccess } from '@telegram-apps/sdk';

const status = await requestWriteAccess.ifAvailable();
// Статус будет 'allowed' | string | undefined
```

:::

## `requestContact`

Для получения контактной информации пользователя используйте метод `requestContact`.

::: code-group

```ts [Using isAvailable]
import { requestContact } from '@telegram-apps/sdk';

if (requestContact.isAvailable()) {
  const contact = await requestContact();
  // {
  //   contact: {
  //     userId: 1,
  //     phoneNumber: '+987654321',
  //     firstName: 'Vladislav',
  //     lastName: 'Kibenko'
  //   },
  //   authDate: Date(12345678),
  //   hash: 'abcdefgh'
  // };
}
```

```ts [Using ifAvailable]
import { requestContact } from '@telegram-apps/sdk';

const contact = await requestContact.ifAvailable();
// {
//   contact: {
//     userId: 1,
//     phoneNumber: '+987654321',
//     firstName: 'Vladislav',
//     lastName: 'Kibenko'
//   },
//   authDate: Date(12345678),
//   hash: 'abcdefgh'
// } | undefined;
```

:::
