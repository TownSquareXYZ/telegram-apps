# Переменные среды

Этот пакет предназначен для использования только внутри приложения Telegram. Поскольку в средах, не относящихся к Telegram
окружении отсутствуют специфические для Telegram черты, вызов таких методов, как
как [retrieveLaunchParams](launch-parameters.md) или [postEvent](methods.md#postevent), приведет к ошибкам.

Тем не менее, пакет предоставляет утилиты, которые помогут разработчикам либо создать приложение вне Telegram, либо определить, не является ли текущая среда Telegram Mini App вообще.

## Проверка текущей среды

Чтобы проверить, является ли текущее окружение Telegram Mini Apps, разработчик может использовать функцию `isTMA`.
Он работает в двух режимах: **простой** и **полный**.

### Простой

В этом режиме функция пытается получить параметры запуска из переменной среды.

Если извлечение прошло успешно, среда считается Telegram Mini Apps.
Простой режим является синхронным и возвращает логическое значение.

```ts
import { isTMA } from '@telegram-apps/bridge';

if (isTMA()) {
  // ...
}
```

Этот режим является несколько поверхностным, но для большинства приложений может быть достаточным. Для более надежной проверки используйте режим [полный](#complete).

### Полный

В этом режиме функция вызывает метод, специфичный для Telegram Mini Apps, и ожидает
события, характерного для метода.

```ts
import { isTMA } from '@telegram-apps/bridge';

if (await isTMA('complete')) {
  console.log('It\'s Telegram Mini Apps');
}
```

Функция ожидает событие в течение 100 миллисекунд, и в большинстве случаев этого достаточно, но разработчик может изменить это поведение, передавая объект в качестве второго аргумента со свойством `timeout: number`.

```ts
if (await isTMA('complete', { timeout: 50 })) {
  console.log('It\'s Telegram Mini Apps');
}
```

## Среда для тестирования

Пакет предоставляет функцию `mockTelegramEnv`, которая имитирует окружение, предоставляемое Telegram. Он помогает разработчикам начать создавать приложения даже без создания mini app в [BotFather](https://t.me/botfather).

Эта функция принимает объект с двумя необязательными свойствами - **launchParams** и
**onEvent**.

### `launchParams`

Параметры запуска для использования в макете. Он может быть представлен в виде списка параметров запроса (строка или экземпляр `URLSearchParams`), описанного в [этой](../../../platform/launch-parameters) статье, или объекта, подобного параметрам запуска, с отсутствующим свойством `tgWebAppData`, или представлен в виде списка параметров запроса, описанного в [этой](../../../platform/init-data#parameters-list) статье.

> [!СОВЕТ].
> Не бойтесь, это значение будет проверено, и пакет сообщит вам, что что-то не работает.

### `onEvent`

Функция, которая будет вызвана в случае, если какой-либо метод Mini Apps был вызван вашим приложением. Это позволяет разработчику определить пользовательское поведение обработки (если это необходимо).

Функция принимает кортеж, содержащий имя метода в качестве 1-го аргумента и его полезную нагрузку в качестве 2-го.

В качестве 2-го аргумента он принимает функцию, которая пытается вызвать нативную функцию `postEvent`, обычно определяемую клиентом Telegram. Таким образом, функция `mockTelegramEnv` может использоваться
даже внутри среды Telegram Mini Apps для перехвата всех вызовов методов и их дальнейшей передачи при необходимости.

### Пример

Вот полный пример, который вы можете использовать в своем приложении:

```ts
import { mockTelegramEnv, emitEvent } from '@telegram-apps/bridge';

const noInsets = {
  left: 0,
  top: 0,
  bottom: 0,
  right: 0,
} as const;
const themeParams = {
  accent_text_color: '#6ab2f2',
  bg_color: '#17212b',
  button_color: '#5288c1',
  button_text_color: '#ffffff',
  destructive_text_color: '#ec3942',
  header_bg_color: '#17212b',
  hint_color: '#708499',
  link_color: '#6ab3f3',
  secondary_bg_color: '#232e3c',
  section_bg_color: '#17212b',
  section_header_text_color: '#6ab3f3',
  subtitle_text_color: '#708499',
  text_color: '#f5f5f5',
} as const;

mockTelegramEnv({
  launchParams: {
    tgWebAppThemeParams: themeParams,
    tgWebAppData: new URLSearchParams([
      ['user', JSON.stringify({
        id: 1,
        first_name: 'Pavel',
      })],
      ['hash', ''],
      ['signature', ''],
      ['auth_date', Date.now().toString()],
    ]),
    tgWebAppStartParam: 'debug',
    tgWebAppVersion: '8',
    tgWebAppPlatform: 'tdesktop',
  },
  onEvent(e) {
    if (e[0] === 'web_app_request_theme') {
      return emitEvent('theme_changed', { theme_params: themeParams });
    }
    if (e[0] === 'web_app_request_viewport') {
      return emitEvent('viewport_changed', {
        height: window.innerHeight,
        width: window.innerWidth,
        is_expanded: true,
        is_state_stable: true,
      });
    }
    if (e[0] === 'web_app_request_content_safe_area') {
      return emitEvent('content_safe_area_changed', noInsets);
    }
    if (e[0] === 'web_app_request_safe_area') {
      return emitEvent('safe_area_changed', noInsets);
    }
  },
});
```
