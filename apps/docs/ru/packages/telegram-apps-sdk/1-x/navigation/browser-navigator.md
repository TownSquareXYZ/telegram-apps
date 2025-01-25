# `BrowserNavigator`

`BrowserNavigator` - это класс, который реализует навигацию с помощью History API браузера. Этот навигатор расширяет стандартный, предоставляя базовые функции навигации и логику, специфическую для истории браузера.

## Конструктор

Для создания экземпляра этого класса, разработчики могут использовать конструктор класса, который принимает элементы истории, курсор (индекс), указывающий на запись в списке элементов истории, и дополнительные опции:

```typescript
import { BrowserNavigator } from '@telegram-apps/sdk';

new BrowserNavigator(['/index'], 0);
new BrowserNavigator([{ pathname: '/a' }, { pathname: '/b' }], 1);
```

:::warning
Если передан пустой список элементов истории или курсор, указывающий на несуществующий элемент, конструктор
выдаст соответствующую ошибку.
:::

### `postEvent`

Функция `postEvent` позволяет заменить функцию, которая вызывает методы мини-приложений от имени навигатора.

```ts
const n = new BrowserNavigator(['/'], 0, {
  postEvent(method, payload) {
    console.log('postEvent:', method, payload);
  },
});
```

### `hashMode`

Свойство `hashMode` позволяет разработчику задать режим навигации, используемый навигатором. Допустимыми значениями являются: `classic` (`#pathname`), `lash` (`#/pathname`) и `null`. Передача значения `null`
переключает навигатор из режима SPA в режим MPA, используя весь `href` вместо хеш-части
местоположения.

По умолчанию навигатор использует режим `classic`.

```ts
const n = new BrowserNavigator(['/'], 0, {
  hashMode: 'slash'
});
```

### `base`

Свойство `base` отвечает за парсинг маршрутизации и отображение путей, предполагая, что они должны
начинаться с указанного значения `base`.

```ts
const n = new BrowserNavigator(['/'], 0, {
  hashMode: null,
  base: '/solidjs-template',
});

n.renderPath('/home'); // -> /solidjs-template/home
```

Это значение полезно только при использовании режима MPA.

## `createBrowserNavigatorFromLocation`

Чтобы упростить процесс создания `BrowserNavigator`, пакет предоставляет
метод `createBrowserNavigatorFromLocation`. В зависимости от переданных параметров (которые являются параметрами конструктора, описанными ранее), он анализирует текущую локацию и создает экземпляр `BrowserNavigator`.

```typescript
import { createBrowserNavigatorFromLocation } from '@telegram-apps/sdk';

const navigator = createBrowserNavigatorFromLocation({
  hashMode: 'slash',
});
```

## `initNavigator`

Функция `initNavigator` отвечает за создание экземпляра `BrowserNavigator`
с использованием ранее сохраненного состояния навигатора. Она также автоматически сохраняет его в session storage для последующего восстановления состояния.

Эта функция принимает имя ключа в session storage, который будет содержать состояние навигатора, и необязательный объект с параметрами конструктора навигатора.

```ts
import { initNavigator } from '@telegram-apps/sdk';

const n = initNavigator('app-navigator-state', {
  hashMode: 'slash',
});
```

Если функция не сможет восстановить навигатор с помощью session storage, она воспользуется функцией `createBrowserNavigatorFromLocation`.

## Присоединение

Создание экземпляра `BrowserNavigator` и использование его методов не обновляют историю браузера автоматически. Для этого разработчикам необходимо его присоединить. До этого момента навигатор
будет обновлять только свое внутреннее состояние и уведомлять всех подписчиков об изменениях. Присоединить вручную необходимо для предотвращения ситуаций, когда создается несколько навигаторов такого типа,
каждый из которых пытается управлять историей браузера с помощью своего внутреннего состояния.

Чтобы навигатор мог управлять историей браузера, необходимо присоединить его с помощью
метода `attach`:

```typescript
import { BrowserNavigator } from '@telegram-apps/sdk';

const navigator = new BrowserNavigator(...);

navigator.attach().then(() => {
  console.log('Attachment completed');
});
```

Этот метод возвращает промис, который будет выполнен после завершения присоединения.

Чтобы запретить навигатору изменять историю браузера, используйте метод `detach`:

```typescript
navigator.detach();
```

## Навигация

Навигатор предоставляет разработчикам список методов для работы с историей навигации.

### `back`

Перемещает назад в истории на 1.

```typescript
navigator.back();
```

### `forward`

Перемещает вперед в истории на 1.

```typescript
navigator.forward();
```

### `go`

Изменяет индекс текущего активного элемента истории на заданное значение delta. Этот метод не изменяет
индекс, если обновленный индекс указывает на несуществующий элемент истории. Это поведение сохраняется
до тех пор, пока не будет указан аргумент `fit`. Если он указан, метод корректирует переданную дельту, чтобы она соответствовала установленным границам `[0, history.length - 1]`.

```typescript
// Перемещает в истории на 3 шага назад.
navigator.go(-3);

// В реальных приложениях это не приведет ни к каким действиям.
navigator.go(-100000);

// Перемещает назад к самому старому элементу.
navigator.go(-100000, true);

// Перемещает вперед к самому новому элементу.
navigator.go(100000, true);
```

### `goTo`

Перемещает к указанному индексу. Метод не выполняет действий, если переданный индекс выходит за пределы допустимых значений.

Если указан параметр `fit` и индекс выходит за пределы допустимого диапазона, он будет скорректирован до ближайшего допустимого значения.

```typescript
// Не выполняет действий.
navigator.goTo(-1);

// Переместит к самому старому элементу.
navigator.goTo(0);

// В реальных приложениях не приведет ни к каким действиям.
navigator.goTo(100000);

// Переместит к самому старому элементу.
navigator.goTo(-100000, true);

// Переместить к самому новому элементу.
navigator.goTo(100000, true);
```

### `push`

Добавляет новый элемент в историю. Метод заменяет все элементы после текущего на добавленный. Обратите внимание, что передаваемый элемент всегда является относительным. Если вы хотите использовать его как абсолютный, добавьте
префикс `/`. Например: `/absolute`, `{ pathname: '/absolute' }`.

Для создания итогового пути навигатор использует метод из конструктора класса URL для определения пути на основе текущего.

В следующих примерах предположим, что текущий элемент - `/home/blog`.

#### Абсолютный путь

Указание абсолютного пути не объединит его с текущим; вместо этого он будет использоваться полностью:

```typescript
navigator.push('/database');
// или
navigator.push({ pathname: '/database' });
// Навигатор добавит новую запись и текущая станет /database
```

#### Относительный путь

При указании относительного пути будет использоваться то же поведение, что и в браузере:

```typescript
navigator.push('license');
// или
navigator.push({ pathname: 'license' });
// Навигатор добавит новую запись, а текущая станет /home/license
```

#### Поиск

Чтобы добавить запись с параметрами запроса, используйте вопросительный знак (`?`) или свойство записи `search`:

```typescript
navigator.push('?id=1');
// или
navigator.push({ search: '?id=1' });
// Навигатор добавит новую запись, а текущая станет /home/blog?id=1
```

:::info
Добавление нового пути с другими или отсутствующими параметрами запроса приведет к потере текущих параметров запроса. Чтобы этого избежать, разработчик должен отправить их повторно.
:::

#### Хэш

Добавление хэш-части записи происходит по той же логике, что и [поиск](#search), но с использованием хэштега
(`#`) и свойства записи `hash`.

```typescript
navigator.push('#introduction');
// или
navigator.push({ hash: '#introduction' });
// Навигатор добавит новую запись и текущая
// станет /home/blog#introduction
```

### `replace`

Метод `replace` работает аналогично методу [push](#push), но он не создает новую запись. Вместо этого он заменяет текущую запись.

## Параметры

### `index`

Текущий курсор истории.

```typescript
const navigator = new BrowserNavigator(['/'], 0);
navigator.index; // 0
```

### `id`

Идентификатор текущего элемента истории. Если идентификатор не указан конкретно, навигатор генерирует их сам.

```typescript
const navigator = new BrowserNavigator(['/'], 0);
navigator.id; // 'abb721'

const navigator2 = new BrowserNavigator([{ id: 'a', pathname: '/' }], 0);
navigator2.id; // 'a'
```

### `hash`

Хэш текущего элемента истории.

```typescript
const navigator = new BrowserNavigator(['/#jungle'], 0);
navigator.hash; // "#jungle"
```

### `hasPrev`

Значение true, если в навигаторе есть элементы перед текущим.

```typescript
const navigator = new BrowserNavigator(['/'], 0);
navigator.hasPrev; // false

const navigator2 = new BrowserNavigator(['/a', '/b'], 1);
navigator2.hasPrev; // true
```

### `hasNext`

Значение true, если в навигаторе есть элементы после текущего.

```typescript
const navigator = new BrowserNavigator(['/'], 0);
navigator.hasNext; // false

const navigator2 = new BrowserNavigator(['/a', '/b'], 0);
navigator2.hasNext; // true
```

### `history`

Безопасно изменяет историю навигации.

```typescript
const navigator = new BrowserNavigator(['/a#a-hash', '/b?b-query=1'], 0);
navigator.history;
// [
//   { pathname: '/a', hash: '#a-hash', search: '', id: 'ahJJ123' },
//   { pathname: '/b', hash: '', search: '?b-query=1', id: 'dd82' },
// ]
```

### `path`

Путь, включая имя пути, поиск и хэш.

```typescript
const navigator = new BrowserNavigator([{
  pathname: '/a',
  hash: '#mama',
  search: '?joe',
}], 0);
navigator.path; // '/a?joe#mama'
```

### `pathname`

Текущее имя пути. Всегда начинается со слэша.

```typescript
const navigator = new BrowserNavigator([{
  pathname: '/a',
  hash: '#mama',
  search: '?joe',
}], 0);
navigator.pathname; // '/a'
```

### `search`

Текущие параметры запроса.

```typescript
const navigator = new BrowserNavigator([{
  pathname: '/a',
  hash: '#mama',
  search: '?joe',
}], 0);
navigator.search; // '?joe'
```

### `state`

Текущее состояние элемента истории.

```typescript
const navigator = new BrowserNavigator([{ state: 'test' }], 0);


navigator.state; // 'test'
```

## События

`BrowserNavigator` предоставляет методы `on` и `off` для управления слушателями событий. В настоящее время единственным доступным для прослушивания событием является `change`. Payload события `change` - это объект, содержащий следующие свойства:

- `navigator: BrowserNavigator`: связанный экземпляр навигатора.
- `delta: number`: Дельта активного в данный момент курсора элемента.
- `from: { pathname: string; hash: string; search: string; id: string; state?: State }`: ранее активный элемент истории.
- `to`: Объект с той же структурой, что и `from`, представляющий текущий активный элемент истории.

### Добавление слушателя событий

Чтобы добавить слушателя события `change`, используйте метод `on`:

```typescript
const removeEventListener = navigator.on('change', (ev) => {
  console.warn('Navigation state changed', ev);
});
```

### Удаление слушателя событий

Чтобы удалить слушателя событий, вызовите функцию, возвращаемую методом `on`:

```typescript
removeEventListener();
```

Либо, как альтернативу, можно использовать метод навигатора `off`:

```typescript
function listener(ev) {
  console.warn('Navigation state changed', ev);
}
navigator.on('change', listener);
navigator.off('change', listener);
```

## Другие методы

### `renderPath`

Метод `renderPath` объединяет свойство навигатора `base` с заданными данными пути, применяя
режим навигации навигатора. Этот метод возвращает полностью сформированный путь в виде строки.

```typescript
const n = new BrowserNavigator(['/'], 0, {
  hashMode: 'slash',
});
n.renderPath('/test'); // '#/test'

const n2 = new BrowserNavigator(['/'], 0, {
  base: '/my-base',
  hashMode: 'slash',
});
n2.renderPath('/test'); // '#/my-base/test'

const n3 = new BrowserNavigator(['/'], 0, {
  base: '/my-base',
  hashMode: null,
});
n3.renderPath('/test'); // '/my-base/test'
```

### `parsePath`

Метод `parsePath` анализирует заданный путь в соответствии с текущим типом навигации и возвращает
его в виде объекта. Этот метод помогает понять, как навигатор интерпретирует заданный путь.

```typescript
const n = new BrowserNavigator(['/'], 0);
n.parsePath('/test');
// { pathname: '/', search: '', hash: '' }

n.parsePath('/test#abc');
// { pathname: '/abc', search: '', hash: '' }

n.parsePath('/test#abc?query#some-hash');
// { pathname: '/abc', search: '?query', hash: '#some-hash' }

const n2 = new BrowserNavigator(['/'], 0, { hashMode: null });
n2.parsePath('/test');
// { pathname: '/test', search: '', hash: '' }

n2.parsePath('/test#abc');
// { pathname: '/test', search: '', hash: '#abc' }

n2.parsePath('/test?query#abc');
// { pathname: '/test', search: '?query', hash: '#abc' }
```
