# `SwipeBehavior`

Реализует в мини-приложении Telegram функциональность [поведения со свайпом](../../../../../platform/swipe-behavior.md).

## Инициализация

Для инициализации компонента используйте функцию `initSwipeBehavior`:

```typescript
import { initSwipeBehavior } from '@telegram-apps/sdk';

const [swipeBehavior] = initSwipeBehavior();  
```

## Вертикальный свайп

По умолчанию пользователи могут скрыть приложение, просто проведя по нему пальцем вниз.
Чтобы предотвратить возможное закрытие, вы можете отключить это поведение, вызвав метод `disableVerticalSwipe()`
или включить с помощью метода `enableVerticalSwipe()`. Обработчик

```typescript
swipeBehavior.enableVerticalSwipe();
console.log(swipeBehavior.isVerticalSwipeEnabled); // true  

swipeBehavior.disableVerticalSwipe();
console.log(swipeBehavior.isVerticalSwipeEnabled); // false
```

## Событие

Список событий, которые можно [отследить](#events):

| События                         | Обработчик                 | Срабатывает, когда                         |
| ------------------------------- | -------------------------- | ------------------------------------------ |
| `change`                        | `() => void`               | Что-то в компоненте изменилось             |
| `change:isVerticalSwipeEnabled` | `(value: boolean) => void` | Изменено свойство `isVerticalSwipeEnabled` |

## Поддержка методов

Список методов, которые могут быть использованы в [проверке поддержки](#methods-support):
`disableVerticalSwipe`, `enableVerticalSwipe`.
