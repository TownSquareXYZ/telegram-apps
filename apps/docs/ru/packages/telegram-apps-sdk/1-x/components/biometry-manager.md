# `BiometryManager`

## Инициализация

Для инициализации компонента, используйте функцию `initBiometryManager`:

```typescript
import { initBiometryManager } from '@telegram-apps/sdk';

const [biometryManager] = initBiometryManager();  
```

::: info

Поскольку BiometryManager не может быть инстанцирован синхронно, эта функция возвращает promise, который будет
выполнен после получения данных менеджера биометрии.

:::

## Аутентификация

Для аутентификации пользователя, используйте метод `authenticate`:

```ts
bm
  .authenticate({ reason: 'Authorize to unlock the storage' })
  .then(token => {
    console.log('Token received', token);
  });
```

Этот метод принимает необязательное свойство `reason: string` длиной до 128 символов.

## Открытие настроек

Для открытия модального окна с настройками биометрии, используйте метод `openSettings`:

```ts
bm.openSettings();
```

В этом модальном окне пользователь может включать и выключать функции биометрии.

## Запрос доступа

Для запроса разрешения на использование биометрии, используйте метод `requestAccess`:

```ts
bm
  .requestAccess({ reason: 'Authorize to start using biometry' })
  .then(accessGranted => {
    console.log('Access granted', accessGranted);
  });
```

Как и метод `authenticate`, он принимает необязательное свойство `reason: string` длиной
до 128 символов.

## Обновление биометрического токена

Для обновления токена, сохраненного в защищенном хранилище, используйте метод `updateToken`:

```ts
bm
  .updateToken({ token: 'My token' })
  .then(status => {
    console.log('Token updated', status);
  });
```

Этот метод возвращает обещание (promise) со статусом выполнения.

## Событие

Список событий, которые можно [отслеживать](#events):

| События                  | Слушатель                       | Срабатывает, когда                    |
| ------------------------ | ------------------------------- | ------------------------------------- |
| `change:accessGranted`   | `(value: boolean) => void`      | Свойство `accessGranted` изменено     |
| `change:accessRequested` | `(value: boolean) => void`      | `accessRequested` измененное свойство |
| `change:available`       | `(value: boolean) => void`      | Свойство `available` изменено         |
| `change:deviceId`        | `(value: string) => void`       | Свойство `deviceId` изменено          |
| `change:tokenSaved`      | `(value: boolean) => void`      | Свойство `tokenSaved` изменено        |
| `change:token`           | `(value: string) => void`       | Свойство `token` изменено             |
| `change:biometryType`    | `(value: BiometryType) => void` | Свойство `biometryType` изменено      |

## Методы поддержки

Список методов, которые можно использовать в [проверках поддержки](#methods-support):
`auth`, `openSettings`, `requestAccess` и `updateToken`.
