# `MainButton`

Реализует в мини-приложении Telegram [главную кнопку](../../../../platform/main-button.md).

## Инициализация

Для инициализации компонента используйте функцию `initMainButton`:

```typescript
import { initMainButton } from '@telegram-apps/sdk';

const [mainButton] = initMainButton();  
```

## Видимость кнопки

Чтобы управлять видимостью главной кнопки, разработчик может использовать такие методы, как `show()` и `hide()`.
Оба они обновляют свойство компонента `isVisible`:

```typescript
mainButton.show();
console.log(mainButton.isVisible); // true  

mainButton.hide();
console.log(mainButton.isVisible); // false  
```

## Загрузчик

Главная кнопка может отображать загрузчик внутри себя. Чтобы управлять ее видимостью,
используйте методы `showLoader()` и `hideLoader()`. Свойство `isLoaderVisible` будет изменено.

```typescript
mainButton.showLoader();
console.log(mainButton.isLoaderVisible); // true  

mainButton.hideLoader();
console.log(mainButton.isLoaderVisible); // false
```

## Активное состояние

Главную кнопку можно включать и отключать, вызывая методы `disable()` и `enable()`. Оба метода обновят свойство `isEnabled`.

```typescript
mainButton.enable();
console.log(mainButton.isEnabled); // true  

mainButton.disable();
console.log(mainButton.isEnabled); // false
```

Включение главной кнопки позволит пользователю нажать на ее. В результате главная кнопка получит событие `click`.

## Цвет фона

Чтобы обновить цвет фона главной кнопки, используйте метод `setBackgroundColor(color: RGB)`. Он обновит свойство `backgroundColor`.

```typescript
mainButton.setBackgroundColor('#ffffaa');
console.log(mainButton.color); // '#ffffaa'
```

## Цвет текста

Чтобы обновить цвет текста главной кнопки, используйте метод `setTextColor(color: RGB)`. Он обновит свойство `textColor`.

```typescript
mainButton.setTextColor('#cca233');
console.log(mainButton.textColor); // '#cca233'
```

## Текст

Чтобы обновить текст главной кнопки, используйте метод `setText(text: string)`. Он обновит свойство `text`.

```typescript
mainButton.setText('Submit');
console.log(mainButton.text); // 'Submit'
```

## Настройка нескольких свойств

Иногда последовательный набор нескольких параметров главной кнопки может привести к появлению проблемных артефактов в
пользовательском интерфейсе. Чтобы избежать этой проблемы, разрешается использовать метод `setParams`:

```typescript
mainButton.setParams({
  backgroundColor: '#aa1388',
  text: 'Stop',
  isVisible: true,
});
```

## События

Список событий, которые можно [отследить](#events):

| Событие                  | Обработчик                 | Срабатывает, когда                  |
| ------------------------ | -------------------------- | ----------------------------------- |
| `click`                  | `() => void`               | Была нажата главная кнопка          |
| `change`                 | `() => void`               | Что-то в компоненте изменилось      |
| `change:backgroundColor` | `(value: RGB) => void`     | Изменено свойство `backgroundColor` |
| `change:isLoaderVisible` | `(value: boolean) => void` | Изменено свойство `isLoaderVisible` |
| `change:isEnabled`       | `(value: boolean) => void` | Изменено свойство `isEnabled`       |
| `change:isVisible`       | `(value: boolean) => void` | Изменено свойство `isVisible`       |
| `change:text`            | `(value: string) => void`  | Изменено свойство `text`            |
| `change:textColor`       | `(value: RGB) => void`     | Изменено свойство `textColor`       |
