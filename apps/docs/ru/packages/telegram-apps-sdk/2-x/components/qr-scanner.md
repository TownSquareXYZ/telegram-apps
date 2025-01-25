# QR-сканер

💠[Компонент](../scopes.md), который обеспечивает функциональность QR-сканера.

## Открытие и закрытие

Чтобы открыть QR-сканер, разработчик должен использовать метод `open`. Он принимает необязательное свойство `text`, ответственное за отображение свойств заголовка сканера в зависимости от стиля открытия.

В свою очередь, вызов метода `open` обновляет значение свойства сигнала `isOpened`.

Чтобы закрыть сканер, используйте метод `close`.

### Стиль обратного вызова

Принимает параметр `onCaptured`, который является функцией, получающей отсканированное содержимое QR. Этот метод возвращает промис, который будет разрешен при закрытии сканера.

::: code-group

```ts [Variable]
import { qrScanner } from '@telegram-apps/sdk';

if (qrScanner.open.isAvailable()) {
  qrScanner.isOpened(); // false
  const promise = qrScanner.open({
    text: 'Scan the QR',
    onCaptured(qr) {
      if (qr === 'qr-content-we-expect') {
        qrScanner.close();
      }
    },
  });
  qrScanner.isOpened(); // true
  await promise;
  qrScanner.isOpened(); // false
}
```

```ts [Functions]
import {
  openQrScanner,
  closeQrScanner,
  isQrScannerOpened,
} from '@telegram-apps/sdk';

if (openQrScanner.isAvailable()) {
  isQrScannerOpened(); // false
  const promise = openQrScanner({
    text: 'Scan the QR',
    onCaptured(qr) {
      if (qr === 'qr-content-we-expect') {
        closeQrScanner();
      }
    },
  });
  isQrScannerOpened(); // true
  await promise;
  isQrScannerOpened(); // true
}
```

:::

### Стиль промиса

Принимает необязательную опцию `capture`, которая получает сканированный контент QR и возвращает `true`, если он должен быть захвачен и промис разрешен. Если этот параметр пропущен, будет разрешено первое захваченное содержимое QR. Промис может быть разрешен в `undefined`, если сканер был закрыт по какой-то причине.

::: code-group

```ts [Variable]
import { qrScanner } from '@telegram-apps/sdk';

if (qrScanner.open.isAvailable()) {
  // Получение первого захваченного QR.
  qrScanner.isOpened(); // false
  let promise = qrScanner.open({ text: 'Scan any QR' });
  qrScanner.isOpened(); // true
  await promise;
  qrScanner.isOpened(); // false

  // Получение какого-то конкретного QR.
  qrScanner.isOpened(); // false
  promise = qrScanner.open({
    text: 'Scan some specific QR',
    capture(qr) {
      return qr === 'some-specific-qr';
    },
  });
  qrScanner.isOpened(); // true
  await promise;
  qrScanner.isOpened(); // false
}
```

```ts [Functions]
import {
  openQrScanner,
  closeQrScanner,
  isQrScannerOpened,
} from '@telegram-apps/sdk';

if (openQrScanner.isAvailable()) {
  // Получение первого захваченного QR.
  // isQrScannerOpened() -> false
  let promise = openQrScanner({ text: 'Scan any QR' });
  // isQrScannerOpened() -> true
  await promise;
  // isQrScannerOpened() -> false

  // Получение какого-то конкретного QR.
  // isQrScannerOpened() -> false
  promise = openQrScanner({
    text: 'Scan some specific QR',
    capture(qr) {
      return qr === 'some-specific-qr';
    },
  });
  // isQrScannerOpened() -> true
  await promise;
  // isQrScannerOpened() -> false
}
```

:::
