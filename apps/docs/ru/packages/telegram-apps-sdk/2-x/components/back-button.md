# Кнопка "Назад"

💠[Компонент](../scopes.md), отвечающий за [кнопку "Назад"](../../../../../platform/back-button.md) в мини-приложении Telegram.

## Проверка поддержки

Чтобы проверить, поддерживается ли кнопка "Назад" текущей версией мини-приложения Telegram, используйте метод `isSupported`:

::: code-group

```ts [Variable]
import { backButton } from '@telegram-apps/sdk';

backButton.isSupported(); // boolean
```

```ts [Functions]
import { isBackButtonSupported } from '@telegram-apps/sdk';

isBackButtonSupported(); // boolean
```

:::

## Установка

Перед использованием этого компонента необходимо смонтировать его для работы с правильно настроенными свойствами. Для этого используйте метод `mount`. Он обновит свойство сигнала `isMounted`.

::: code-group

```ts [Variable]
import { backButton } from '@telegram-apps/sdk';

if (backButton.mount.isAvailable()) {
  backButton.mount();
  backButton.isMounted(); // true
}
```

```ts [Functions]
import { mountBackButton, isBackButtonMounted } from '@telegram-apps/sdk';

if (mountBackButton.isAvailable()) {
  mountBackButton();
  isBackButtonMounted(); // true
}
```

:::

Для размонтирования используйте метод `unmount`:

::: code-group

```ts [Variable]
backButton.unmount();
backButton.isMounted(); // false
```

```ts [Functions]
import { unmountBackButton, isBackButtonMounted } from '@telegram-apps/sdk';

unmountBackButton();
isBackButtonMounted(); // false
```

:::

## Отображение и скрытие

Чтобы изменить видимость кнопки, используйте методы `hide()` и `show()`. Эти методы обновляют значение свойства сигнала `isVisible`.

::: code-group

```ts [Variable]
if (backButton.show.isAvailable()) {
  backButton.show();
  backButton.isVisible(); // true
}

if (backButton.hide.isAvailable()) {
  backButton.hide();
  backButton.isVisible(); // false
}
```

```ts [Functions]
import {
  showBackButton,
  hideBackButton,
  isBackButtonVisible,
} from '@telegram-apps/sdk';

if (showBackButton.isAvailable()) {
  showBackButton();
  isBackButtonVisible(); // true
}

if (hideBackButton.isAvailable()) {
  hideBackButton();
  isBackButtonVisible(); // false
}
```

:::

## Отслеживание нажатия

Чтобы добавить слушателя нажатия на кнопку, используйте метод `onClick`. Он возвращает функцию для удаления привязанного слушателя. В качестве альтернативы можно использовать метод `offClick`.

::: code-group

```ts [Variable]
if (backButton.onClick.isAvailable()) {
  function listener() {
    console.log('Clicked!');
  }

  const offClick = backButton.onClick(listener);
  offClick();
  // or
  backButton.onClick(listener);
  backButton.offClick(listener);
}
```

```ts [Functions]
import { onBackButtonClick, offBackButtonClick } from '@telegram-apps/sdk';

if (onBackButtonClick.isAvailable()) {
  function listener() {
    console.log('Clicked!');
  }

  const offClick = onBackButtonClick(listener);
  offClick();
  // or
  onBackButtonClick(listener);
  offBackButtonClick(listener);
}
```

:::
