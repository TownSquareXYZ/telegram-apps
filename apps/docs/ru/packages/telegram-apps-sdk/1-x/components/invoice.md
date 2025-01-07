# `Счета`

Реализует функциональность [счетов](https://core.telegram.org/bots/payments#introducing-payments-2-0)
Telegram.

## Инициализация

Для инициализации компонента используйте функцию `initInvoice`:

```typescript
import { initInvoice } from '@telegram-apps/sdk';

const invoice = initInvoice();  
```

## Открытие счета

Чтобы открыть счет, необходимо использовать метод `open`. Этот метод позволяет открывать счета, используя их URL-адреса или промежуточные значения.

Открытие счета в режиме URL требует передачи второго аргумента, равного `url`, поэтому метод будет интерпретировать переданное значение как URL-адрес.

Чтобы интерпретировать переданное значение как промежуточное значение, опустите второй аргумент.

::: code-group

```typescript [Using slug]
invoice
  .open('abIIks213')
  .then((status) => {
    // Output: 'paid'
    return console.log(status);
  });
```

```typescript [Using URL]
invoice
  .open('https://t.me/invoice/abIIks213', 'url')
  .then((status) => {
    // Output: 'paid'
    return console.log(status);
  });
```

:::

::: info

Обратите внимание, что slug - это часть строки, которая помещается после символа `$`. Итак, получив значение `$abcdefghi`, возвращаемое из Telegram Bot API, вы должны вызвать метод `open`, используя значение `abcdefghi` или полный URL (https://t.me/invoice/abcdefghi или https://t.me/$abcdefghi).

:::

## События

Список событий, которые можно [отследить](#events):

| Событие           | Слушатель                  | Срабатывает, когда             |
| ----------------- | -------------------------- | ------------------------------ |
| `change`          | `() => void`               | Что-то изменилось в компоненте |
| `change:isOpened` | `(value: boolean) => void` | Свойство `isOpened` изменено   |

## Поддержка методов

Список методов, которые могут быть использованы в [проверке поддержки](#methods-support): `open`.
