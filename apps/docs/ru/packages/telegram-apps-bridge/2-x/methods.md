# Методы

В этой статье рассматриваются темы, связанные с [общением с приложениями](../../platform/apps-communication.md) методы.

## Вызов методов

Для вызова методов Telegram Mini Apps разработчики должны использовать функцию `postEvent`:

```typescript
import { postEvent } from '@telegram-apps/bridge';

postEvent('web_app_setup_back_button', { is_visible: true });
```

Эта функция автоматически определяет правильный способ отправки события в зависимости от текущей обстановки окружения. Он определяет тип приложения Telegram и выбирает соответствующий поток.

## Проверка метода поддержки

По умолчанию функция `postEvent` не проверяет, поддерживается ли указанный метод
текущее приложение Telegram. Для этого используется функция `supports`.

Он принимает имя метода Mini Apps и текущую версию платформы:

```typescript
import { supports } from '@telegram-apps/bridge';

supports('web_app_trigger_haptic_feedback', '6.0'); // false
supports('web_app_trigger_haptic_feedback', '6.1'); // true
```

Функция `supports` также позволяет проверить, поддерживается ли конкретный параметр в параметрах метода:

```typescript
import { supports } from '@telegram-apps/bridge';

supports('web_app_open_link', 'try_instant_view', '6.0'); // false
supports('web_app_open_link', 'try_instant_view', '6.7'); // true
```

> [!СОВЕТ]
> Рекомендуется использовать эту функцию перед вызовом методов Mini Apps, чтобы предотвратить остановку или неожиданное поведение.

## Создание безопасной функции `postEvent`

Этот пакет включает функцию `createPostEvent`, которая принимает текущую версию Mini Apps в качестве входных данных.

Возвращает новую функцию `postEvent`, которая внутренне проверяет, поддерживаются ли переданные метод и параметры.

```typescript
import { createPostEvent } from '@telegram-apps/bridge';

const postEvent = createPostEvent('6.5');

// Будет работать хорошо.
postEvent('web_app_read_text_from_clipboard');

// Выбросит ошибку, этот метод не поддерживается 
// в Mini Apps версии 6.5.
postEvent('web_app_request_phone');
```

В качестве 2-го необязательного аргумента функция принимает обратный вызов, который вызывается, если метод или параметр не поддерживается.

```ts
createPostEvent('6.0', data => {
  if ('param' in data) {
    console.warn(
      'Oops, the parameter', data.param,
      'in method', data.method,
      'is not supported',
    );
  } else {
    console.warn('Oops, method', data.method, 'is not supported');
  }
});
```

Несмотря на то, что не рекомендуется выводить предупреждения вместо ошибок,
можно передать значение `non-strict`:

```ts
const postEvent = createPostEvent('6.5', 'non-strict');

// Будет работать хорошо.
postEvent('web_app_read_text_from_clipboard');

// Выведет в консоль предупреждение о том, что указанный
// метод не поддерживается в версии 6.5. Больше ничего не произойдет.
postEvent('web_app_request_phone');
```