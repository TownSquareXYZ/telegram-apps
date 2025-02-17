# `CloudStorage`

Реализует функциональность, связанную с облачным хранилищем мини-приложений Telegram.

## Инициализация

Для инициализации компонента используйте функцию `initCloudStorage`:

```typescript
import { initCloudStorage } from '@telegram-apps/sdk';

const cloudStorage = initCloudStorage();  
```

## Настройки элементов

Чтобы сохранить значение в облачном хранилище, необходимо использовать метод `set`:

```typescript
cloudStorage
  .set('my-key', 'my-value')
  .then(() => console.log('Item saved'));
```

## Получение элементов

Чтобы получить значения по ключам, необходимо использовать метод `get`, который получает как одно строковое значение, так и массив строковых значений:

::: code-group

```typescript [Single value]
cloudStorage
  .get('my-key')
  .then((value) => {
    console.log(value);
    // Вывод: 'my-value'
  });

cloudStorage
  .get('non-existent')
  .then((value) => {
    console.log(value);
    // Вывод: ''
  });
```

```typescript [Array of values]
cloudStorage
  .get(['my-key', 'non-existent'])
  .then((result) => {
    console.log('Result is', result);
    // Вывод:
    // {
    //   'my-key': 'my-value',
    //   'non-existent': ''
    // }
  });
```

:::

Этот метод возвращает пустые строки для тех ключей, которых нет в облачном хранилище.

## Получение ключей

Чтобы получить все зарегистрированные ключи в облачном хранилище, необходимо использовать метод `getKeys`:

```typescript
cloudStorage
  .getKeys()
  .then((keys) => {
    // Будет ['my-key'].
    console.log('Keys are', keys);
  })
```

## Удаление элементов

Для удаления элементов в облачном хранилище необходимо использовать метод `delete`. Этот метод позволяет удалять как один, так и несколько элементов:

::: code-group

```typescript [Single item]
cloudStorage
  .delete('my-key')
  .then(() => console.log('Key was deleted'));
```

```typescript [Multiple items]
cloudStorage
  .delete(['my-key', 'another-key'])
  .then(() => console.log('Keys were deleted'));
```

:::

## Поддержка методов

Список методов, которые могут быть использованы в [проверке поддержки](#methods-support):
`delete`, `get`, `getKeys` и `set`
