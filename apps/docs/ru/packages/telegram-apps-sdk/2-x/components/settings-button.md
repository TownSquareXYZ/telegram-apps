# Кнопка настроек

💠[Компонент](../scopes.md), отвечающий за работу [кнопки настроек](../../../../../platform/settings-button.md) мини-приложения Telegram.

## Проверка поддержки

Чтобы проверить, поддерживается ли кнопка настроек текущей версией мини-приложения Telegram, используется метод
`isSupported`:

::: code-group

```ts [Variable]
import { settingsButton } from '@telegram-apps/sdk';

settingsButton.isSupported(); // boolean
```

```ts [Functions]
import { isSettingsButtonSupported } from '@telegram-apps/sdk';

isSettingsButtonSupported(); // boolean
```

:::

## Установка

Перед использованием компонента необходимо смонтировать его для корректной работы с настроенными свойствами.
Для этого используйте метод `mount`. Будет изменено свойство сигнала `isMounted`.

::: code-group

```ts [Variable]
import { settingsButton } from '@telegram-apps/sdk';

if (settingsButton.mount.isAvailable()) {
  settingsButton.mount();
  settingsButton.isMounted(); // true
}
```

```ts [Functions]
import {
  mountSettingsButton,
  isSettingsButtonMounted,
} from '@telegram-apps/sdk';

if (mountSettingsButton.isAvailable()) {
  mountSettingsButton();
  isSettingsButtonMounted(); // true
}
```

:::

Для размонтирования используйте метод `unmount`:

::: code-group

```ts [Variable]
settingsButton.unmount();
settingsButton.isMounted(); // false
```

```ts [Functions]
import { 
  unmountSettingsButton,
  isSettingsButtonMounted,
} from '@telegram-apps/sdk';

unmountSettingsButton();
isSettingsButtonMounted(); // false
```

:::

## Отображение и скрытие

Чтобы изменить видимость кнопки, используйте методы `hide()` и `show()`. Эти методы обновляют свойство сигнала `isVisible`.

::: code-group

```ts [Variable]
if (settingsButton.show.isAvailable()) {
  settingsButton.show();
  settingsButton.isVisible(); // true
}

if (settingsButton.hide.isAvailable()) {
  settingsButton.hide();
  settingsButton.isVisible(); // false
}
```

```ts [Functions]
import {
  showSettingsButton,
  hideSettingsButton,
  isSettingsButtonVisible,
} from '@telegram-apps/sdk';

if (showSettingsButton.isAvailable()) {
  showSettingsButton();
  isSettingsButtonVisible(); // true
}

if (hideSettingsButton.isAvailable()) {
  hideSettingsButton();
  isSettingsButtonVisible(); // false
}
```

:::

## Отслеживание нажатия

Чтобы добавить слушателя нажатия кнопки, используйте метод `onClick`. Он возвращает функцию для удаления привязанного слушателя. В качестве альтернативы можно использовать метод `offClick`.

::: code-group

```ts [Variable]
if (settingsButton.onClick.isAvailable()) {
  function listener() {
    console.log('Clicked!');
  }

  const offClick = settingsButton.onClick(listener);
  offClick();
  // or
  settingsButton.onClick(listener);
  settingsButton.offClick(listener);
}
```

```ts [Functions]
import {
  onSettingsButtonClick,
  offSettingsButtonClick,
} from '@telegram-apps/sdk';

if (onSettingsButtonClick.isAvailable()) {
  function listener() {
    console.log('Clicked!');
  }

  const offClick = onSettingsButtonClick(listener);
  offClick();
  // or
  onSettingsButtonClick(listener);
  offSettingsButtonClick(listener);
}
```

:::
