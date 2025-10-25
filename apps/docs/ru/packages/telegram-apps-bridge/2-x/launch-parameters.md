# Параметры запуска

Параметры запуска очень важны для жизненного цикла мини-приложения. Чтобы узнать больше о том, что такое параметры запуска
Параметры запуска и их важность, стоит прочитать [эту](../../../platform/launch-parameters)
статью.

## Получение параметров запуска

Этот пакет позволяет разработчику извлекать параметры запуска из текущего окружения с помощью функции `retrieveLaunchParams`. Он пытается получить их из всех возможных источников, и если это не удается, будет выдана ошибка.

```typescript
import { retrieveLaunchParams } from '@telegram-apps/bridge';

retrieveLaunchParams();
// {
//   tgWebAppBotInline: false,
//   tgWebAppData: {
//     user: { ... },
//     auth_date: Date(...),
//     query_id: ...,
//     hash: ...
//   },
//   ...
// };
```

Чтобы извлечь параметры запуска, глубоко преобразованные в camel-case, передайте значение `true` 1-ым аргументом:

```ts
retrieveLaunchParams(true);
// {
//   tgWebAppBotInline: false,
//   tgWebAppData: {
//     user: { ... },
//     authDate: Date(...),
//     queryId: ...
//     hash: ...
//   },
//   ...
// };
```

### Raw

Чтобы получить параметры запуска в их исходном формате — в качестве параметров запроса, используйте функцию `retrieveRawLaunchParams`:

```ts
import { retrieveRawLaunchParams } from '@telegram-apps/bridge';

retrieveRawLaunchParams();
// tgWebAppBotInline=0&tgWebAppData=%7B%22user%22%3A%7B%7D%2C%22auth_date%22%3A1787367222%2C%22query_id%22%3A%22abc%22%7D...&...
```

## Получение необработанных исходных данных

Довольно часто приложение требует извлечения данных инициализации в исходном формате,
чтобы затем отправить их на backend-сервер. Не следует использовать функцию `retrieveLaunchParams`, а затем манипулировать значением `tgWebAppData`, а использовать функцию `retrieveRawInitData`, предназначенную для этой цели:

```ts
import { retrieveRawInitData } from '@telegram-apps/bridge';

retrieveRawInitData();
// '{"user":...,"auth_date":...,"query_id":...,...}'
```

Причина в том, что при использовании чего-то другого, а не этой функции, нет никакой гарантии, что данные init не будут искажены. Это единственная функция, которая гарантирует, что возвращаемое значение будет возвращено в неизменном виде, как оно было передано клиентом Telegram.