# Залипающее приложение

::: tip

Начиная с версии Mini Apps **7.7**, вы можете предотвратить закрытие приложения из-за пролистывания вниз, используя специальный метод.

- [Метод для мини-приложений](methods.md#web-app-setup-swipe-behavior)
- [@telegram-apps/sdk component](../packages/telegram-apps-sdk/2-x/components/swipe-behavior.md)

:::

Разработчики часто ищут способы сделать свои приложения "залипающими". В этом контексте "залипание" означает предотвращение случайного закрытия приложения, например, жестом пролистывания вниз.

Прежде чем принимать меры по предотвращению случайного закрытия, важно понять, почему такое поведение вообще существует.

Мини-приложения Telegram позволяют разработчикам изменять видимость кнопки "Закрыть", иногда заменяя ее кнопкой "Назад". По этой причине разработчики Telegram хотят, чтобы пользователи могли выйти из приложения, даже если кнопка закрытия не видна. Вот почему существует механизм прокрутки вниз.

Рассмотрим сценарий, в котором приложение отображает кнопку "Назад", но перестает отвечать на запросы. В таких случаях, вместо того, чтобы закрывать все приложение Telegram, пользователи могут просто провести пальцем вниз, чтобы закрыть мини-приложение. Поэтому, прежде чем отключать этот механизм, убедитесь, что ваше приложение не перестает отвечать на запросы и не заманивает пользователей в ловушку.

Наконец, проверьте, подходит ли вам [подтверждение закрытия](./closing-behavior.md).

## Сделать приложение залипающим

Чтобы сделать приложение "залипающим", вы можете использовать определенные стили CSS, которые не позволяют WebView передавать событие пролистывания в приложение Telegram.

Вот пример HTML и CSS, который вы можете использовать:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta
    name="viewport"
    content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
  >
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>My Mini App</title>
  <style>
    .mobile-body {
      overflow: hidden;
      height: 100vh;
    }

    .mobile-wrap {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      overflow-x: hidden;
      overflow-y: auto;
      background: red;
    }

    .mobile-content {
      height: calc(100% + 1px);
      background: green;
    }
  </style>
</head>
<body>
  <div id="wrap">
    <div id="content">
      My application goes here.
    </div>
  </div>
  <script src="https://unpkg.com/@telegram-apps/sdk@1.0.0/dist/index.iife.js"></script>
  <script>
    (function() {
      var { retrieveLaunchParams, postEvent } = window.telegramApps.sdk;
      var lp = retrieveLaunchParams();

      // Некоторые версии Telegram не нуждаются в вышеуказанных классах
      if (['macos', 'tdesktop', 'weba', 'web', 'webk'].includes(lp.platform)) {
        return;
      }

      // Расширьте приложение.
      postEvent('web_app_expand');

      document.body.classList.add('mobile-body');
      document.getElementById('wrap').classList.add('mobile-wrap');
      document.getElementById('content').classList.add('mobile-content');
    })();
  </script>
</body>
</html>
```

Использование этого HTML и CSS предотвратит большинство случайных закрытий пролистыванием вниз. Хотя этот метод подходит для большинства сценариев, в редких случаях он может оказаться неэффективным, но в реальной жизни это редкость.

[Открыть в Telegram](https://t.me/tmajsbot/sticky_app) ([Исходный код](https://github.com/Telegram-Mini-Apps/sticky-app/blob/master/dist/index.html))
