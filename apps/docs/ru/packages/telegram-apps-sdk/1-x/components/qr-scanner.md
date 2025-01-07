# `QRScanner`

Компонент, обеспечивающий функциональность QR-сканера.

## Инициализация

Для инициализации компонента используйте функцию `initQRScanner`:

```typescript
import { initQRScanner } from '@telegram-apps/sdk';

const qrScanner = initQRScanner();  
```

## Открытие и закрытие

Чтобы открыть QR-сканер, разработчик должен использовать метод `open`:

```typescript
qrScanner.open('Scan QR code').then((content) => {
  console.log(content);
  // Output: 'some-data=22l&app=93...'
});
console.log(qrScanner.isOpened); // true
```

В результате метод возвращает промис, который будет разрешен в случае, если QR был отсканирован. Он также может разрешить `null`, если сканер был закрыт.

Разрешается передавать объект с необязательными свойствами `text` и `capture`, отвечающими за отображение текста в QR-сканере и определение того, следует ли захватывать отсканированный QR и выполнять промис.

```ts
qrScanner.open({ 
  text: 'Scan QR code',
  capture({ data }) {
    // Capture QRs contanining Telegram user link.
    return data.startsWith('https://t.me');
  }
}).then((qr) => {
  // May be something like 'https://t.me/heyqbnk' or null.
  console.log(qr);
});
```

Чтобы закрыть сканер, используйте метод `close`:

```typescript
qrScanner.close();
console.log(qrScanner.isOpened); // false
```

## События

Список событий, которые можно [отследить](#events):

| Событие           | Обработчик                 | Срабатывает, когда             |
| ----------------- | -------------------------- | ------------------------------ |
| `change`          | `() => void`               | Что-то в компоненте изменилось |
| `change:isOpened` | `(value: boolean) => void` | Свойство `isOpened` изменено   |

## Поддержка методов

Список методов, которые могут быть использованы в [проверке поддержки](#methods-support): `open` and `close`
