# Эмодзи статус

## `requestEmojiStatusAccess`

Чтобы запросить доступ для обновления эмодзи статуса пользователя, используйте функцию `requestEmojiStatusAccess`:

::: code-group

```ts [Using isAvailable]
import { requestEmojiStatusAccess } from '@telegram-apps/sdk';

if (requestEmojiStatusAccess.isAvailable()) {
  const status = await requestEmojiStatusAccess();
}
```

```ts [Using ifAvailable]
import { requestEmojiStatusAccess } from '@telegram-apps/sdk';

const status = await requestEmojiStatusAccess.ifAvailable();
```

:::

## `setEmojiStatus`

Чтобы установить эмодзи статус от имени пользователя, используйте функцию `setEmojiStatus`.

В качестве первого аргумента, функция принимает идентификатор пользовательского эмодзи. При необходимости вы можете передать второй аргумент, который определяет, на сколько секунд должен быть установлен статус.

::: code-group

```ts [Using isAvailable]
import { setEmojiStatus } from '@telegram-apps/sdk';

if (setEmojiStatus.isAvailable()) {
  // Устанавливается на неограниченный период времени.
  await setEmojiStatus('5361800828313167608');

  // Устанавливается на 1 день.
  await setEmojiStatus('5361800828313167608', 86400);
}
```

```ts [Using ifAvailable]
import { setEmojiStatus } from '@telegram-apps/sdk';

// Устанавливается на неограниченный период времени.
await setEmojiStatus.ifAvailable('5361800828313167608');

// Устанавливается на 1 день.
await setEmojiStatus.ifAvailable('5361800828313167608', 86400);
```

:::
