# `BackButton`

Реализует в мини-приложении Telegram [кнопку "Назад"](../../../../platform/back-button.md).

## Инициализация

Для инициализации компонента используйте функцию `initBackButton`:

```typescript
import { initBackButton } from '@telegram-apps/sdk';

const [backButton] = initBackButton();  
```

## Отображение и скрытие

Чтобы отобразить и скрыть `BackButton`, необходимо использовать методы `show()` и `hide()`. Эти методы
обновляют свойство кнопки `isVisible`:

```typescript
backButton.show();
console.log(backButton.isVisible); // true  

backButton.hide();
console.log(backButton.isVisible); // false  
```

## Событие

Список событий, которые можно [отследить](#events):

| События            | Обработчик                 | Срабатывает, когда             |
| ------------------ | -------------------------- | ------------------------------ |
| `click`            | `() => void`               | Была нажата кнопка "Назад"     |
| `change`           | `() => void`               | Что-то изменилось в компоненте |
| `change:isVisible` | `(value: boolean) => void` | Свойство `isVisible` изменено  |

## Поддерживаемые методы

Список методов, которые могут быть использованы в [проверке поддержки](#methods-support): `show` и `hide`
