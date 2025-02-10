# Тактильный отклик

💠[Компонент](../scopes.md), отвечает за [тактильный отклик](../../../../platform/haptic-feedback.md) мини-приложения Telegram.

## Проверка поддержки

Чтобы проверить, поддерживается ли тактильный отклик текущей версией мини-приложения Telegram, используется метод `isSupported`:

::: code-group

```ts [Variable]
import { hapticFeedback } from '@telegram-apps/sdk';

hapticFeedback.isSupported(); // boolean
```

```ts [Functions]
import { isHapticFeedbackSupported } from '@telegram-apps/sdk';

isHapticFeedbackSupported(); // boolean
```

:::

## Произошло воздействие

`impactOccurred` — это метод, который сигнализирует о событии воздействия. Приложение Telegram может воспроизвести соответствующую тактильный отклик на основе переданного значения стиля.

::: code-group

```ts [Variable]
if (hapticFeedback.impactOccurred.isAvailable()) {
  hapticFeedback.impactOccurred('medium');
}
```

```ts [Functions]
import { hapticFeedbackImpactOccurred } from '@telegram-apps/sdk';

if (hapticFeedbackImpactOccurred.isAvailable()) {
  hapticFeedbackImpactOccurred('medium');
}
```

:::

Доступные стили для тактильного отклика:

- `light`: указывает на столкновение между небольшими или легкими объектами пользовательского интерфейса.
- `medium`: указывает на столкновение между средними или средними по весу объектами пользовательского интерфейса.
- `heavy`: указывает на столкновение между большими или тяжелыми объектами пользовательского интерфейса.
- `rigid`: указывает на столкновение между жесткими или несгибательными объектами пользовательского интерфейса.
- `soft`: указывает на столкновение между мягкими или гибкими объектами пользовательского интерфейса.

## Произошло уведомление

`notificationOccurred` — это метод, который сигнализирует об успешном выполнении задачи или действия, сбое или появлении предупреждения. Приложение Telegram может воспроизводить соответствующий тактильный отклик на основе переданного значения типа.

::: code-group

```ts [Variable]
if (hapticFeedback.notificationOccurred.isAvailable()) {
  hapticFeedback.notificationOccurred('success');
}
```

```ts [Functions]
import { hapticFeedbackNotificationOccurred } from '@telegram-apps/sdk';

if (hapticFeedbackNotificationOccurred.isAvailable()) {
  hapticFeedbackNotificationOccurred('success');
}
```

:::

Типы уведомлений следующие:

- `error`: указывает на то, что задача или действие завершилось с ошибкой.
- `success`: указывает на успешное завершение задачи или действия.
- `warning`: указывает на то, что задача или действие вызвали предупреждение.

## Изменение выбора

`selectionChanged` — это метод, который сигнализирует о том, что пользователь изменил выбор. Приложение Telegram может воспроизводить соответствующий тактильный отклик.

Используйте эту обратную связь только при изменении выбора, а не при выполнении или подтверждении выбора.

::: code-group

```ts [Variable]
if (hapticFeedback.selectionChanged.isAvailable()) {
  hapticFeedback.selectionChanged();
}
```

```ts [Functions]
import { hapticFeedbackSelectionChanged } from '@telegram-apps/sdk';

if (hapticFeedbackSelectionChanged.isAvailable()) {
  hapticFeedbackSelectionChanged();
}
```
