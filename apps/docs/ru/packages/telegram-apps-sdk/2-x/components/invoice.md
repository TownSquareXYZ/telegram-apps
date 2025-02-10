# Счета

💠[Компонент](../scopes.md), отвечающий за Telegram [счета](https://core.telegram.org/bots/payments#introducing-payments-2-0).

## Проверка поддержки

Чтобы проверить, поддерживаются ли счета текущей версией мини-приложений Telegram, используется метод `isSupported`:

::: code-group

```ts [Variable]
import { invoice } from '@telegram-apps/sdk';

invoice.isSupported(); // boolean
```

```ts [Functions]
import { isInvoiceSupported } from '@telegram-apps/sdk';

isInvoiceSupported(); // boolean
```

:::

## Открытие

Чтобы открыть счет, необходимо использовать метод `open`. Этот метод позволяет открывать счета, используя их URL-адреса или слаги.

Открытие счета в режиме URL-адреса требует передачи второго аргумента, равного `url`, поэтому метод будет интерпретировать переданное значение как URL-адрес.

Вызов метода обновляет значение свойства сигнала `isOpened`.

::: code-group

```ts [Variable]
import { invoice } from '@telegram-apps/sdk';

if (invoice.open.isAvailable()) {
  invoice.isOpened(); // false
  const promise = invoice.open('abIIks213');
  invoice.isOpened(); // true
  const status = await promise;
  invoice.isOpened(); // false

  // Или в режиме URL:
  await invoice.open('https://t.me/invoice/abIIks213', 'url');
}
```

```ts [Functions]
import { openInvoice, isInvoiceOpened } from '@telegram-apps/sdk';

if (openInvoice.isAvailable()) {
  isInvoiceOpened(); // false
  const promise = openInvoice('abIIks213');
  isInvoiceOpened(); // true
  const status = await promise;
  isInvoiceOpened(); // false

  // Или в режиме URL:
  await openInvoice('https://t.me/invoice/abIIks213', 'url');
}
```

:::
