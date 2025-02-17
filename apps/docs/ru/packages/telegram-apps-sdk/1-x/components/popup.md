# `Popup`

Реализует в мини-приложении Telegram [всплывающее окно](../../../../platform/popup.md).

## Инициализация

Для инициализации компонента используйте функцию `initPopup`:

```typescript
import { initPopup } from '@telegram-apps/sdk';

const popup = initPopup();  
```

## Открытие нового всплывающего окна

Чтобы открыть всплывающее окно, необходимо вызвать метод `open`, указав свойства всплывающего окна: заголовок,
сообщение и список из до 3 кнопок.

```typescript
popup
  .open({
    title: 'Hello!',
    message: 'Here is a test message.',
    buttons: [{ id: 'my-id', type: 'default', text: 'Default text' }],
  })
  .then(buttonId => {
    console.log(
      buttonId === null 
        ? 'User did not click any button'
        : `User clicked a button with ID "${buttonId}"`
    );
  });

console.log(popup.isOpened); // true
```

Этот метод возвращает промис, который будет выполнен с идентификатором нажатой кнопки. В случае, если пользователь не нажал ни одной кнопки, метод вернет `null`.

## Событие

Список событий, которые можно [отследить](#events):

| События            | Обработчик                 | Срабатывает, когда             |
| ------------------ | -------------------------- | ------------------------------ |
| `changed`          | `() => void`               | Что-то в компоненте изменилось |
| `changed:isOpened` | `(value: boolean) => void` | Свойство `isOpened` изменено   |

## Поддержка методов

Список методов, которые могут быть использованы в [проверке поддержки](#methods-support): `open`
