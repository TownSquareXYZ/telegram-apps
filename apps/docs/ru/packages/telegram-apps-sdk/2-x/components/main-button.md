# Главная кнопка

💠[Компонент](../scopes.md) отвечает за [главную кнопку](../../../../platform/main-button.md) мини-приложения Telegram.

## Установка

Перед использованием этого компонента необходимо смонтировать его для работы с правильно настроенными свойствами. Для этого используйте метод `mount`. Он обновит свойство сигнала `isMounted`.

::: code-group

```ts [Variable]
import { mainButton } from '@telegram-apps/sdk';

if (mainButton.mount.isAvailable()) {
  mainButton.mount();
  mainButton.isMounted(); // true
}
```

```ts [Functions]
import { mountMainButton, isMainButtonMounted } from '@telegram-apps/sdk';

if (mountMainButton.isAvailable()) {
  mountMainButton();
  isMainButtonMounted(); // true
}
```

:::

Чтобы размонтировать, используйте метод `unmount`:

::: code-group

```ts [Variable]
mainButton.unmount(); 
mainButton.isMounted(); // false
```

```ts [Functions]
import { unmountMainButton, isMainButtonMounted } from '@telegram-apps/sdk';

unmountMainButton();
isMainButtonMounted(); // false
```

:::

> [!ВНИМАНИЕ]
> Свойства этого компонента зависят от значений из компонента [параметров темы](theme-params.md).
> Обязательно смонтируйте параметры темы перед использованием главной кнопки.

## Настройки свойств

Для обновления свойств кнопки используйте метод `setParams`. Он принимает объект с необязательными свойствами, каждое из которых отвечает за свое собственное свойство кнопки.

В свою очередь, вызов этого метода обновляет такие сигналы, как `backgroundColor`, `hasShineEffect`, `isVisible`, `isEnabled`, `isLoaderVisible`, `state`, `textColor` и `text`.

::: code-group

```ts [Variable]
if (mainButton.setParams.isAvailable()) {
  mainButton.setParams({
    backgroundColor: '#000000',
    hasShineEffect: true,
    isEnabled: true,
    isLoaderVisible: true,
    isVisible: true,
    text: 'My text',
    textColor: '#ffffff'
  });
  mainButton.backgroundColor(); // '#000000'
  mainButton.hasShineEffect(); // true
  mainButton.isEnabled(); // true
  mainButton.isLoaderVisible(); // true
  mainButton.isVisible(); // true
  mainButton.text(); // 'My text'
  mainButton.textColor(); // '#ffffff'

  mainButton.state();
  // {
  //   backgroundColor: '#000000',
  //   hasShineEffect: true,
  //   isActive: true,
  //   isLoaderVisible: true,
  //   isVisible: true,
  //   text: 'My text',
  //   textColor: '#ffffff'
  // }
}
```

```ts [Functions]
import {
  setMainButtonParams,
  mainButtonBackgroundColor,
  mainButtonHasShineEffect,
  isMainButtonVisible,
  isMainButtonEnabled,
  isMainButtonLoaderVisible,
  mainButtonState,
  mainButtonTextColor,
  mainButtonText,
} from '@telegram-apps/sdk';

if (setMainButtonParams.isAvailable()) {
  setMainButtonParams({
    backgroundColor: '#000000',
    hasShineEffect: true,
    isEnabled: true,
    isLoaderVisible: true,
    isVisible: true,
    text: 'My text',
    textColor: '#ffffff'
  });
  mainButtonBackgroundColor(); // '#000000'
  mainButtonHasShineEffect(); // true
  isMainButtonEnabled(); // true
  isMainButtonLoaderVisible(); // true
  isMainButtonVisible(); // true
  mainButtonText(); // 'My text'
  mainButtonTextColor(); // '#ffffff'

  mainButtonState();
  // {
  //   backgroundColor: '#000000',
  //   hasShineEffect: true,
  //   isActive: true,
  //   isLoaderVisible: true,
  //   isVisible: true,
  //   text: 'My text',
  //   textColor: '#ffffff'
  // }
}
```

:::

## Отслеживание нажатия

Чтобы добавить слушатель нажатия на кнопку, используйте метод `onClick`. Он возвращает функцию для удаления привязанного слушателя. В качестве альтернативы можно использовать метод `offClick`.

::: code-group

```ts [Variable]
if (mainButton.onClick.isAvailable()) {
  function listener() {
    console.log('Clicked!');
  }

  const offClick = mainButton.onClick(listener);
  offClick();
  // or
  mainButton.onClick(listener);
  mainButton.offClick(listener);
}
```

```ts [Functions]
import {
  onMainButtonClick,
  offMainButtonClick,
} from '@telegram-apps/sdk';

if (onMainButtonClick.isAvailable()) {
  function listener() {
    console.log('Clicked!');
  }

  const offClick = onMainButtonClick(listener);
  offClick();
  // или
  onMainButtonClick(listener);
  offMainButtonClick(listener);
}
```

:::
