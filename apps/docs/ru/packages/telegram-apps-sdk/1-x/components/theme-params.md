# `ThemeParams`

Компонент, содержащий информацию о текущей
используемой [теме](../../../../platform/theming.md) приложением Telegram.

## Инициализация

Для инициализации компонента используйте функцию `initThemeParams`:

```typescript
import { initThemeParams } from '@telegram-apps/sdk';

const [themeParams] = initThemeParams();  
```

## Запрос актуальных данных

Чтобы получить актуальную информацию о параметрах темы, разработчик может использовать функцию `requestThemeParams`:

```typescript
import { requestThemeParams } from '@telegram-apps/sdk';

requestThemeParams.then(console.log);

// Output:
// { bgColor: '#ffaabb', ... }
```

## Цвета

Разработчик может получить цвет темы, используя метод `get`:

```typescript
themeParams.get('bgColor');
themeParams.get('packageUnknownColor');
```

Чтобы получить все цвета через один объект, используйте метод `getState`:

```typescript
themeParams.getState();
// Output:
// {
//   accentTextColor: '#aa1399',
//   bgColor: '#baac12',
//   linkColor: '#887722'
//   packageUnknownColor: '#676767,
// }
```

Компонент `ThemeParams` предоставляет прямой доступ к списку цветов:

- `accentTextColor: RGB | undefined`
- `bgColor: RGB | undefined`
- `buttonColor: RGB | undefined`
- `buttonTextColor: RGB | undefined`
- `destructiveTextColor: RGB | undefined`
- `headerBgColor: RGB | undefined`
- `hintColor: RGB | undefined`
- `linkColor: RGB | undefined`
- `secondaryBgColor: RGB | undefined`
- `sectionBgColor: RGB | undefined`
- `sectionHeaderTextColor: RGB | undefined`
- `subtitleTextColor: RGB | undefined`
- `textColor: RGB | undefined`

Пример:

```typescript
themeParams.accentTextColor; // '#aa1399'
```

## События

Список событий, которые можно [отследить](#events):

| Событие              | Обработчик             | Срабатывает, когда                |
| -------------------- | ---------------------- | --------------------------------- |
| `change`             | `() => void`           | Что-то в компоненте изменилось    |
| `change:{theme_key}` | `(value: RGB) => void` | Цвет с указанным ключом изменился |
