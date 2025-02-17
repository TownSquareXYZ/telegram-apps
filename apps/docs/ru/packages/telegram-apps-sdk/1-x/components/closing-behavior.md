# `ClosingBehavior`

Реализует в мини-приложения Telegram функциональность [поведения при закрытии](../../../../../platform/closing-behavior.md).

## Инициализация

Чтобы инициализировать компонент, используйте функцию `initClosingBehavior`:

```typescript
import { initClosingBehavior } from '@telegram-apps/sdk';

const [closingBehavior] = initClosingBehavior();  
```

## Подтверждение закрытия

Чтобы включить и отключить подтверждение закрытия, необходимо использовать методы `enableConfirmation()`
и `disableConfirmation()`. Обработчик

```typescript
closingBehavior.enableConfirmation();
console.log(closingBehavior.isConfirmationNeeded); // true  

closingBehavior.disableConfirmation();
console.log(closingBehavior.isConfirmationNeeded); // false
```

## Событие

Список событий, которые можно [отследить](#events):

| События                       | Обработчик                 | Срабатывает, когда                       |
| ----------------------------- | -------------------------- | ---------------------------------------- |
| `change`                      | `() => void`               | Что-то изменилось в компоненте           |
| `change:isConfirmationNeeded` | `(value: boolean) => void` | Свойство `isConfirmationNeeded` изменено |
