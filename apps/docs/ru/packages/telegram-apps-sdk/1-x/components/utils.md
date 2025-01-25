# `Utils`

Реализует функциональность, которая не требует состояния и не может быть категоризирована.

## Инициализация

Для инициализации компонента используйте функцию `initUtils`:

```typescript
import { initUtils } from '@telegram-apps/sdk';

const utils = initUtils();  
```

## Ссылки

### `openLink`

Класс `MiniApp` способен открывать ссылки разных типов. Например, он может открыть ссылку во внешнем браузере, не закрывая текущее мини-приложение, используя метод `openLink`:

```typescript
utils.openLink('https://google.com');
```

Этот метод также позволяет открывать ссылку с помощью [мгновенного просмотра](https://instantview.telegram.org/) в Telegram, когда это возможно:

```typescript
utils.openLink('https://google.com', { tryInstantView: true });
```

Чтобы попробовать открыть ссылку с помощью предпочитаемого пользователем браузера, используйте параметр `tryBrowser`:

```typescript
utils.openLink('https://google.com', { tryBrowser: true });
```

### `OpenTelegramLink`

В случае, если разработчик хочет открыть ссылку, связанную с Telegram (начинающуюся с `https://t.me`), можно использовать метод `openTelegramLink`.

Используя этот метод, приложение Telegram будет обрабатывать такую ​​ссылку на своей стороне:

```typescript
utils.openTelegramLink('https://t.me/heyqbnk');
```

### `shareURL`

Обмен URL-адресом — это распространенная функция в мини-приложениях. Для этого разработчик может использовать метод shareURL, который принимает URL-адрес для обмена и необязательный текст для добавления к сообщению после URL-адреса.

При вызове он открывает окно выбора чата для обмена URL-адресом.

```ts
utils.shareURL('https://t.me/mybot/myapp', 'Look! Some cool app here!');
```

::: warning

В настоящее время нет собственного метода для прямого обмена чем-либо. Поэтому этот метод использует метод [openTelegramLink](#opentelegramlink), который закрывает приложение после вызова. В этом методе используется функция [поделиться ссылками](https://core.telegram.org/api/links#share-links).

:::

## Буфер обмена

Разработчики могут читать текст из буфера обмена с помощью метода `readTextFromClipboard`.

Этот метод считывает текст из буфера обмена и возвращает строку или значение null. Значение Null возвращается в случаях, когда:

- Значение в буфере обмена не является текстом.
- Доступ к буферу обмена запрещен.

```typescript
utils.readTextFromClipboard().then((data) => {
  console.log('Clipboard data:', data);
  // Вывод: string или null
});
```

## Поддержка методов

Список методов и параметров, которые могут быть использованы
в [проверке поддержки](#methods-support): `readTextFromClipboard`
и `openLink.tryInstantView`
