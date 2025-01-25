# @telegram-apps/signals

<p style="display: flex; gap: 8px; min-height: 20px">
  <a href="https://npmjs.com/package/@telegram-apps/signals">
    <img src="https://img.shields.io/npm/v/@telegram-apps/signals?logo=npm"/>
  </a>
  <img src="https://img.shields.io/bundlephobia/minzip/@telegram-apps/signals"/>
  <a href="https://github.com/Telegram-Mini-Apps/telegram-apps/tree/master/packages/signals">
    <img src="https://img.shields.io/badge/source-black?logo=github"/>
  </a>
</p>

Наша собственная реализация сигналов, которые мы используем в пакетах `@telegram-apps`.

## Установка

::: code-group

```bash [pnpm]
pnpm i @telegram-apps/signals
```

```bash [npm]
npm i @telegram-apps/signals
```

```bash [yarn]
yarn add @telegram-apps/signals
```

:::

## Сигнал

Функция `signal` — это простейший конструктор сигналов, используемый другими функциями пакета. Чтобы создать новый сигнал, просто передайте начальное значение:

```ts
import { signal } from '@telegram-apps/signals';

const isVisible = signal(false);
```

Возвращаемое значение представляет собой функцию с полезными методами. Сама функция возвращает текущее значение сигнала.

```ts
console.log('The element is', isVisible() ? 'visible' : 'invisible');
```

Функция также принимает параметры в качестве второго аргумента. Разработчик может указать функцию `equals`, которая принимает текущие и входящие значения и должна возвращать true, если они считаются равными.

```ts
const s = signal(10, {
  equals(current, next) {
    // Не будет обновлять сигнал, если следующее значение выше
    // чем текущее.
    return next > current;
  }
});
s.set(20); // не обновит сигнал
s.set(5); // обновит сигнал
```

### `set`

Для установки нового значения используйте метод `set`:

```ts
isVisible.set(true);
```

### `sub`

Для отслеживания изменений сигнала используйте метод `sub`. Он возвращает функцию, которая удаляет связанного слушателя. Слушатель принимает два аргумента: текущее и предыдущее значение соответственно.

```ts
const removeListener = isVisible.sub((current, prev) => {
  console.log('Value changed from', prev, 'to', current);
});

// При необходимости удалите слушателя.
removeListener();
```

Чтобы вызвать слушателя только один раз, используйте второй:

```ts
function listener(current: boolean, prev: boolean) {
  console.log('Value changed from', prev, 'to', current);
}

isVisible.sub(listener, true);
// или
isVisible.sub(listener, { once: true });
```

### `unsub`

В качестве альтернативы, чтобы удалить слушателя, разработчик может использовать метод `unsub`:

```ts
function listener(current: boolean, prev: boolean) {
  console.log('Value changed from', prev, 'to', current);
}

isVisible.sub(listener);

// При необходимости удалите слушателя.
isVisible.unsub(listener);
```

### `unsubAll`

Чтобы удалить всех слушателей, используйте метод `unsubAll`:

```ts
isVisible.unsubAll();
```

::: info

Этот метод не удаляет слушателей, добавленных вычисляемыми сигналами.

:::

### `reset`

Чтобы вернуться к изначально указанному значению, используйте метод `reset`:

```ts
import { signal } from '@telegram-apps/signals';

const isVisible = signal(false);
isVisible.set(true); // isVisible становится true
isVisible.reset(); // isVisible снова становится false
```

### `destroy`

Когда сигнал больше не нужен и не прослушивается ни одним вычисляемым сигналом, разработчик может использовать метод `destroy`, который принудительно удаляет всех слушателей:

```ts
isVisible.destroy();
```

## Вычисленные значения

Функция `computed` создает вычисляемый сигнал, который автоматически пересчитывается при изменении любого из вызываемых сигналов.

Вот пример:

```ts
import { signal, computed } from '@telegram-apps/signals';

const a = signal(2);
const b = signal(2);
const sum = computed(() => a() + b()); // 4

a.set(5); // сумма становится 7
b.set(5); // сумма становится 10
```

Возвращаемое значение представляет собой сигнал, в котором отсутствуют методы `set` и `reset`.

## Пакетирование изменений

Функция `batch` создает область, в которой пакетируются мутации сигнала.

Это полезно, когда разработчик хочет предотвратить пересчет вычисляемого сигнала каждый раз, когда несколько зависимых сигналов изменяются последовательно.

```ts
import { signal, computed, batch } from '@telegram-apps/signals';

const a = signal(1);
const b = signal(2);
const c = signal(3);
const sum = computed(() => a() + b() + c()); // 6

// Без пакетной обработки повторное вычисление выполняется 3 раза:
a.set(2); // сумма пересчитывается и становится 7
b.set(3); // сумма пересчитывается и становится 8
c.set(4); // сумма пересчитывается и становится 9

// Сброс каждого сигнала.
a.reset();
b.reset();
c.reset();
// Примечание: сброс вызывает метод set, который также приводит
// к пересчету суммы сигналов..

// Теперь давайте оптимизируем с помощью пакетной функции.:
batch(() => {
  a.set(2);
  b.set(3);
  c.set(4);
});
// На этом этапе сумма будет пересчитываться только один раз, поскольку
// пакет заставляет сигнал суммы ждать завершения функции,
// а затем запускает пересчет.
console.log(sum()); // 9
```
