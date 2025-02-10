# Облачное хранилище

💠[Компонент](../scopes.md), отвечающий за управление облачным хранилищем в мини-приложении Telegram.

## Проверка поддержки

Чтобы проверить, поддерживается ли облачное хранилище текущей версией мини-приложения Telegram, используется метод `isSupported`:

::: code-group

```ts [Variable]
import { cloudStorage } from '@telegram-apps/sdk';

cloudStorage.isSupported(); // boolean
```

```ts [Functions]
import { isCloudStorageSupported } from '@telegram-apps/sdk';

isCloudStorageSupported(); // boolean
```

:::

## Настройка параметров

Чтобы задать значение ключа, используйте метод `setItem`.

::: code-group

```ts [Variable]
if (cloudStorage.setItem.isAvailable()) {
  await cloudStorage.setItem('a', 'a-value');
}
```

```ts [Functions]
import { setCloudStorageItem } from '@telegram-apps/sdk';

if (setCloudStorageItem.isAvailable()) {
  await setCloudStorageItem('a', 'a-value');
}
```

:::

## Получение ключей

Чтобы получить список всех существующих ключей, используйте метод `getKeys`.

::: code-group

```ts [Variable]
if (cloudStorage.getKeys.isAvailable()) {
  const keys = await cloudStorage.getKeys(); // ['a', 'b', 'c']
}
```

```ts [Functions]
import { getCloudStorageKeys } from '@telegram-apps/sdk';

if (getCloudStorageKeys.isAvailable()) {
  const keys = await getCloudStorageKeys(); // ['a', 'b', 'c']
}
```

:::

Чтобы получить значение определенного ключа или нескольких ключей, используйте метод `getItem`.

::: code-group

```ts [Variable]
if (cloudStorage.getItem.isAvailable()) {
  const nonExistent = await cloudStorage.getItem('non-existent');
  // Результат пустая строка: ''

  const existent = await cloudStorage.getItem('a');
  // Результат значение ключа 'a'. Пример: 'a-value'

  const values = await cloudStorage.getItem(['a', 'b', 'non-existent']);
  // Результат запись ключей 'a', 'b' и 'non-existent'.
  // Пример:
  // { 
  //   a: 'a-value', 
  //   b: 'b-value', 
  //   'non-existent': '', 
  // }
}
```

```ts [Functions]
import { getCloudStorageItem } from '@telegram-apps/sdk';

if (getCloudStorageItem.isAvailable()) {
  const nonExistent = await getCloudStorageItem('non-existent');
  // Результат пустая строка: ''

  const existent = await getCloudStorageItem('a');
  // Результат значение ключа 'a'. Пример: 'a-value''

  const values = await getCloudStorageItem(['a', 'b', 'non-existent']);
  // Результат запись ключей 'a', 'b' и 'non-existent'. 
  // Пример:
  // { 
  //   a: 'a-value', 
  //   b: 'b-value', 
  //   'non-existent': '', 
  // }
}
```

:::

## Удаление элементов

Чтобы удалить ключ или список ключей, используйте метод `deleteItem`.

::: code-group

```ts [Variable]
if (cloudStorage.deleteItem.isAvailable()) {
  await cloudStorage.deleteItem('a');
  await cloudStorage.deleteItem(['a', 'b', 'c']);
}
```

```ts [Functions]
import { deleteCloudStorageItem } from '@telegram-apps/sdk';

if (deleteCloudStorageItem.isAvailable()) {
  await deleteCloudStorageItem('a');
  await deleteCloudStorageItem(['a', 'b', 'c']);
}
```

:::
