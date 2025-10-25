# Биометрия

Компонент 💠[component](../scopes.md), отвечающий за функциональность биометрии для мини-приложений Telegram.

## Проверка поддержки

Чтобы проверить, поддерживается ли биометрия в текущей версии Telegram Mini Apps, используйте метод `isSupported`:

::: code-group

```ts [Variable]
import { biometry } from '@telegram-apps/sdk';

biometry.isSupported(); // boolean
```

```ts [Functions]
import { isBiometrySupported } from '@telegram-apps/sdk';

isBiometrySupported(); // boolean
```

:::

## Монтирование

Прежде чем использовать компонент, его необходимо установить.

Этот процесс является асинхронным, поскольку данные биометрии должны быть запрошены у приложения Telegram.
Сигнал `isMounting` будет установлен в `true` во время процесса и обновлен до `false` по его завершении.

Если монтирование прошло успешно, сигнал `isMounted` будет установлен в `true`. Если возникают ошибки,
сигнал `mountError` будет отражать ошибку.

::: code-group

```ts [Variable]
if (biometry.mount.isAvailable()) {
  try {
    const promise = biometry.mount();
    biometry.isMounting(); // true
    await promise;
    biometry.isMounting(); // false
    biometry.isMounted(); // true
  } catch (err) {
    biometry.mountError(); // equals "err"
    biometry.isMounting(); // false
    biometry.isMounted(); // false
  }
}
```

```ts [Functions]
import {
  mountBiometry,
  isBiometryMounting,
  isBiometryMounted,
  biometryMountError,
} from '@telegram-apps/sdk';

if (mountBiometry.isAvailable()) {
  try {
    const promise = mountBiometry();
    isBiometryMounting(); // true
    await promise;
    isBiometryMounting(); // false
    isBiometryMounted(); // true
  } catch (err) {
    biometryMountError(); // equals "err"
    isBiometryMounting(); // false
    isBiometryMounted(); // false
  }
}
```

:::

Чтобы размонтировать, используйте метод `unmount`:

::: code-group

```ts [Variable]
biometry.unmount();
biometry.isMounted(); // false
```

```ts [Functions]
import { unmountBiometry, isBiometryMounted } from '@telegram-apps/sdk';

unmountBiometry();
isBiometryMounted(); // false
```

:::

## Запрос на доступ к биометрии

Чтобы запросить доступ к биометрии, используйте метод `requestAccess`. Он возвращает обещание с булевым
указывающим, был ли доступ предоставлен пользователем.

::: code-group

```ts [Variable]
if (biometry.requestAccess.isAvailable()) {
  const granted = await biometry.requestAccess(); // boolean
}
```

```ts [Functions]
import { requestBiometryAccess } from '@telegram-apps/sdk';

if (requestBiometryAccess.isAvailable()) {
  const granted = await requestBiometryAccess(); // boolean
}
```

:::

## Аутентификация

Чтобы аутентифицировать пользователя и получить сохраненный ранее токен, используйте метод `authenticate`.

В качестве опции он принимает объект со следующими свойствами:

- `reason?: string`: причина аутентификации для отображения пользователю.

Метод возвращает объект со `статусом` (`не удалось` или `авторизован`) и, в случае успеха,
`token: string`.

::: code-group

```ts [Variable]
if (biometry.authenticate.isAvailable()) {
  const { status, token } = await biometry.authenticate({
    reason: 'Please!',
  });

  if (status === 'authorized') {
    console.log(`Authorized. Token: ${token}`);
  } else {
    console.log('Not authorized');
  }
}
```

```ts [Functions]
import { authenticateBiometry } from '@telegram-apps/sdk';

if (authenticateBiometry.isAvailable()) {
  const { status, token } = await authenticateBiometry({
    reason: 'Please!',
  });

  if (status === 'authorized') {
    console.log(`Authorized. Token: ${token}`);
  } else {
    console.log('Not authorized');
  }
}
```

:::

## Обновление токена

Чтобы обновить токен, хранящийся в локальном безопасном хранилище, используйте метод `updateToken`.

Метод принимает необязательный объект со свойствами `reason` и `token`. Если токен не указан, существующий токен будет удален.

Он возвращает промис со значением boolean, указывающим, были ли внесены какие-либо изменения.

::: code-group

```ts [Variable]
if (biometry.updateToken.isAvailable()) {
  const updated = await biometry.updateToken({
    reason: 'Want to delete',
  });

  await biometry.updateToken({
    reason: 'Will set a new one',
    token: 'new token',
  });
}
```

```ts [Functions]
import { updateBiometryToken } from '@telegram-apps/sdk';

if (updateBiometryToken.isAvailable()) {
  const updated = await updateBiometryToken({
    reason: 'Want to delete',
  });

  await updateBiometryToken({
    reason: 'Will set a new one',
    token: 'new token',
  });
}
```

:::

## Открытие настроек

Чтобы открыть всплывающее окно настроек, связанных с биометрией, используйте метод `openSettings`. Этот метод может быть запущен только
в ответ на взаимодействие пользователя.

::: code-group

```ts [Variable]
if (biometry.openSettings.isAvailable()) {
  biometry.openSettings();
}
```

```ts [Functions]
import { openBiometrySettings } from '@telegram-apps/sdk';

if (openBiometrySettings.isAvailable()) {
  openBiometrySettings();
}
```

:::
