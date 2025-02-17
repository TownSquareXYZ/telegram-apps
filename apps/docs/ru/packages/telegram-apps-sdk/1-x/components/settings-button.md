# `SettingsButton`

Реализует в мини-приложении Telegram [кнопку настроек](../../../../platform/settings-button.md).

## Инициализация

Для инициализации компонента используйте функцию `initSettingsButton`:

```typescript
import { initSettingsButton } from '@telegram-apps/sdk';

const [settingsButton] = initSettingsButton();  
```

## Отображение и скрытие

Чтобы отобразить и скрыть `SettingsButton`, необходимо использовать методы `show()` и `hide()`. Эти методы обновляют свойство кнопки `isVisible`:

```typescript
settingsButton.show();
console.log(settingsButton.isVisible); // true  

settingsButton.hide();
console.log(settingsButton.isVisible); // false  
```

## Событие

Список событий, которые можно [отследить](#events):

| События            | Обработчик                 | Срабатывает, когда             |
| ------------------ | -------------------------- | ------------------------------ |
| `click`            | `() => void`               | Была нажата кнопка настроек    |
| `change`           | `() => void`               | Что-то изменилось в компоненте |
| `change:isVisible` | `(value: boolean) => void` | Изменено свойство `isVisible`  |

## Поддержка методов

Список методов, которые могут быть использованы в [проверке поддержки](#methods-support): `show` и `hide`
