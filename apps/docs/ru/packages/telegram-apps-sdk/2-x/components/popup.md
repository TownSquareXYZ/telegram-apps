# Всплывающее окно

💠[Компонент](../scopes.md), отвечающий за [всплывающее окно](../../../../../platform/popup.md) в мини-приложении Telegram.

## Проверка поддержки

Чтобы проверить, поддерживается ли всплывающее окно текущей версией Telegram Mini Apps, используется метод `isSupported`:

::: code-group

```ts [Variable]
import { popup } from '@telegram-apps/sdk';

popup.isSupported(); // boolean
```

```ts [Functions]
import { isPopupSupported } from '@telegram-apps/sdk';

isPopupSupported(); // boolean
```

:::

## Открытие

Чтобы открыть всплывающее окно, необходимо вызвать метод `open`, указав свойства всплывающего окна: заголовок, сообщение и список из 3 кнопок.

Метод возвращает промис, который будет выполнен с идентификатором нажатой кнопки. В случае, если пользователь не нажал ни одной кнопки, метод вернет `null`.

Вызов метода обновляет значение свойства сигнала `isOpened`.

::: code-group

```ts [Variable]
import { popup } from '@telegram-apps/sdk';

if (popup.open.isAvailable()) {
  // popup.isOpened() -> false
  const promise = popup.open({
    title: 'Hello!',
    message: 'Here is a test message.',
    buttons: [{ id: 'my-id', type: 'default', text: 'Default text' }],
  });
  // popup.isOpened() -> true
  const buttonId = await promise;
  // popup.isOpened() -> false
}
```

```ts [Functions]
import { openPopup, isPopupOpened } from '@telegram-apps/sdk';

if (openPopup.isAvailable()) {
  // isPopupOpened() -> false
  const promise = openPopup({
    title: 'Hello!',
    message: 'Here is a test message.',
    buttons: [{ id: 'my-id', type: 'default', text: 'Default text' }],
  });
  // isPopupOpened() -> true
  const buttonId = await promise;
  // isPopupOpened() -> false
}
```

:::
