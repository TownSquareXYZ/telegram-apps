# Второстепенная кнопка

💠[Компонент](../scopes.md), отвечающий за второстепенную кнопку мини-приложения Telegram.

## Проверка поддержки

Чтобы проверить, поддерживается ли второстепенная кнопка текущей версией мини-приложения Telegram, используйте метод
`isSupported`:

::: code-group

```ts [Variable]
import { secondaryButton } from '@telegram-apps/sdk';

secondaryButton.isSupported(); // boolean
```

```ts [Functions]
import { isSecondaryButtonSupported } from '@telegram-apps/sdk';

isSecondaryButtonSupported(); // boolean
```

:::

## Установка

Перед использованием этого компонента необходимо смонтировать его для работы с правильно настроенными свойствами. Для этого используйте метод `mount`. Он обновит свойство сигнала `isMounted`.

::: code-group

```ts [Variable]
import { secondaryButton } from '@telegram-apps/sdk';

if (secondaryButton.mount.isAvailable()) {
  secondaryButton.mount();
  secondaryButton.isMounted(); // true
}
```

```ts [Functions]
import {
  mountSecondaryButton,
  isSecondaryButtonMounted,
} from '@telegram-apps/sdk';

if (mountSecondaryButton.isAvailable()) {
  mountSecondaryButton();
  isSecondaryButtonMounted(); // true
}
```

:::

Для отключения используйте метод `unmount`:

::: code-group

```ts [Variable]
secondaryButton.unmount();
secondaryButton.isMounted(); // false
```

```ts [Functions]
import {
  unmountSecondaryButton,
  isSecondaryButtonMounted,
} from '@telegram-apps/sdk';

unmountSecondaryButton();
isSecondaryButtonMounted(); // false
```

:::

> [!ВНИМАНИЕ]
> Свойства этого компонента зависят от значений из компонентов [мини-приложения](mini-app.md) и [параметров темы](theme-params.md). В частности, второстепенная кнопка использует цвет мини-приложения `bottomBarBgColor` и некоторые цвета параметров темы. Обязательно смонтируйте эти компоненты перед использованием второстепенной кнопки.

## Настройки свойств

Чтобы обновить свойства кнопки, используйте метод `setParams`. Он принимает объект с необязательными свойствами, каждое из которых отвечает за свою собственную черту кнопки.

Таким образом, вызов этого метода обновляет такие сигналы, как `backgroundColor`, `hasShineEffect`, `isVisible`, `isEnabled`, `isLoaderVisible`, `position`, `state`, `textColor` и `text`.

::: code-group

```ts [Variable]
if (secondaryButton.setParams.isAvailable()) {
  secondaryButton.setParams({
    backgroundColor: '#000000',
    hasShineEffect: true,
    isEnabled: true,
    isLoaderVisible: true,
    isVisible: true,
    position: 'top',
    text: 'My text',
    textColor: '#ffffff'
  });
  secondaryButton.backgroundColor(); // '#000000'
  secondaryButton.hasShineEffect(); // true
  secondaryButton.isEnabled(); // true
  secondaryButton.isLoaderVisible(); // true
  secondaryButton.isVisible(); // true
  secondaryButton.position(); // 'top'
  secondaryButton.text(); // 'My text'
  secondaryButton.textColor(); // '#ffffff'

  secondaryButton.state();
  // {
  //   backgroundColor: '#000000',
  //   hasShineEffect: true,
  //   isActive: true,
  //   isLoaderVisible: true,
  //   isVisible: true,
  //   position: 'top',
  //   text: 'My text',
  //   textColor: '#ffffff'
  // }
}
```

```ts [Functions]
import {
  setSecondaryButtonParams,
  secondaryButtonBackgroundColor,
  secondaryButtonHasShineEffect,
  isSecondaryButtonVisible,
  isSecondaryButtonEnabled,
  isSecondaryButtonLoaderVisible,
  secondaryButtonState,
  secondaryButtonTextColor,
  secondaryButtonText,
  secondaryButtonPosition,
} from '@telegram-apps/sdk';

if (setSecondaryButtonParams.isAvailable()) {
  setSecondaryButtonParams({
    backgroundColor: '#000000',
    hasShineEffect: true,
    isEnabled: true,
    isLoaderVisible: true,
    isVisible: true,
    position: 'top',
    text: 'My text',
    textColor: '#ffffff'
  });
  secondaryButtonBackgroundColor(); // '#000000'
  secondaryButtonHasShineEffect(); // true
  isSecondaryButtonEnabled(); // true
  isSecondaryButtonLoaderVisible(); // true
  isSecondaryButtonVisible(); // true
  secondaryButtonPosition(); // 'top'
  secondaryButtonText(); // 'My text'
  secondaryButtonTextColor(); // '#ffffff'

  secondaryButtonState();
  // {
  //   backgroundColor: '#000000',
  //   hasShineEffect: true,
  //   isActive: true,
  //   isLoaderVisible: true,
  //   isVisible: true,
  //   position: 'top',
  //   text: 'My text',
  //   textColor: '#ffffff'
  // }
}
```

:::

## Отслеживание нажатий

Чтобы добавить слушателя событий нажатия на кнопку, используйте метод `onClick`. Он возвращает функцию для удаления связанного слушателя. В качестве альтернативы можно использовать метод `offClick`.

::: code-group

```ts [Variable]
if (secondaryButton.onClick.isAvailable()) {
  function listener() {
    console.log('Clicked!');
  }

  const offClick = secondaryButton.onClick(listener);
  offClick();
  // или
  secondaryButton.onClick(listener);
  secondaryButton.offClick(listener);
}
```

```ts [Functions]
import {
  onSecondaryButtonClick,
  offSecondaryButtonClick,
} from '@telegram-apps/sdk';

if (onSecondaryButtonClick.isAvailable()) {
  function listener() {
    console.log('Clicked!');
  }

  const offClick = onSecondaryButtonClick(listener);
  offClick();
  // или
  onSecondaryButtonClick(listener);
  offSecondaryButtonClick(listener);
}
```

:::
