# Данные инициализации

Этот раздел SDK представляет утилиты для работы с [данными инициализации](../../../platform/init-data.md).

## Парсинг

Эта библиотека включает функцию `parseInitData`, которая может извлекать данные инициализации
из параметров запроса. Вот пример ее использования:

```typescript
import { parseInitData } from '@telegram-apps/sdk';

// Представим, что у нас есть init data в сыром формате, как здесь. Приложение Telegram
// отправляет их именно в таком формате.
const initDataString =
  'query_id=AAHdF6IQAAAAAN0XohDhrOrc' +
  '&user=%7B%22id%22%3A279058397%2C%22first_name%22%3A%22Vladislav%22%2C%22last_name%22%3A%22Kibenko%22%2C%22username%22%3A%22vdkfrost%22%2C%22language_code%22%3A%22ru%22%2C%22is_premium%22%3Atrue%7D' +
  '&auth_date=1662771648' +
  '&hash=c501b71e775f74ce10e377dea85a7ea24ecd640b223ea86dfe453e0eaed2e2b2';

// Извлечение init data.
console.log(parseInitData(initDataString));
// или
console.log(parseInitData(new URLSearchParams(initDataString)));

// Output:
// {
//   authDate: 2022-09-10T01:00:48.000Z,
//   hash: 'c501b71e775f74ce10e377dea85a7ea24ecd640b223ea86dfe453e0eaed2e2b2',
//   queryId: 'AAHdF6IQAAAAAN0XohDhrOrc',
//   user: {
//     id: 279058397,
//     firstName: 'Vladislav',
//     lastName: 'Kibenko',
//     username: 'vdkfrost',
//     languageCode: 'ru',
//     isPremium: true
//   }
// }
```

Функция извлекает необходимые параметры и автоматически проверяет их типы. Если свойство
имеет недопустимый тип или значение, будет выдана ошибка. Чтобы узнать больше о возвращаемом типе, перейдите на страницу [InitData](init-data/init-data.md).

## Валидация и подпись

Утилиты валидации и подписи были перенесены в отдельный пакет* [@telegram-apps/init-data-node](../../telegram-apps-init-data-node).
