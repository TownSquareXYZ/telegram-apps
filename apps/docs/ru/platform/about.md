# О платформе

Мини-приложения Telegram - это технология, созданная разработчиками известного мессенджера Telegram. Ее основная цель - предоставить разработчикам более гибкий канал связи с пользователями Telegram.

Это может показаться непонятным, но мини-приложения не являются автономными сервисами. Первое, что следует отметить, это то, что технически эта технология является всего лишь дополнением к такому уже известному функционалу Telegram, как Telegram-боты. Поэтому в настоящее время создание мини-приложения без создания Telegram-бота невозможно.

The platform offers a high variety of available methods to communicate with the Telegram application
to make your web applications look more native, allow them to simulate native application's
behavior, and finally, to **mimic** native applications.

## Требуемые технологии

Before starting to create an application on the Mini Apps platform, it is important to know what
Mini Apps are from a technical standpoint. This will lead the developer to the selection of language and technology.

Внутренне мини-приложения представляют собой типичные веб-приложения, которые отображаются в WebView. Другими словами, они представляют собой набор статических файлов (в основном `.js`, `.css` и `.html`). Поэтому для создания мини-приложения достаточно изучить стандартные технологии разработки интерфейса, такие как:

- JavaScript
- CSS
- HTML

Действительно просто, не правда ли? Но для создания более серьезных и больших приложений мы рекомендуем использовать более надежные технологии, такие как `TypeScript`, `React`, `SCSS` и т. д.

Поэтому, если мы хотим создать мини-приложение, нам следует создать стандартное веб-приложение с любым технологическим стеком. Единственное, что нужно Telegram от разработчика, — это URL-адрес приложения. Этот URL-адрес будет использоваться в качестве источника для компонента WebView клиента Telegram, который будет загружать и отображать приложение в Telegram.

## Использование

Как мы уже упоминали в предыдущем разделе, мини-приложение — это надстройки для ботов Telegram. Telegram-боты также являются известной технологией, которая предоставляет функциональность для широкого спектра вариантов использования. You could create a
bot to buy a ticket in the cinema, tell jokes, generate random numbers, etc. In other
words, the bot can do whatever the developer can think of.

Проблема в том, что визуальная часть ботов не так хороша и функциональна, как могла бы быть. Их текущая реализация "консольная", что больше подходит разработчикам, а не обычным пользователям. That's
where Mini Apps are useful.

Using Mini Apps, developers can create more user-friendly and complex interfaces, which
are commonly used by typical users. С помощью этой технологии разработчик по-прежнему может взаимодействовать с ботом за пределами мини-приложения, но также может предоставить некоторые более гибкие интерфейсы для взаимодействия.

Mini Apps are used when a standard bot interface is not enough. Create a Mini App when you
want to make user life easier when displaying several buttons is not even close to the
functionality you want to provide.

## Поддерживаемые приложения

В настоящее время мини-приложения Telegram доступны в широком списке приложений Telegram:

- [Telegram для Android](https://github.com/DrKLO/Telegram) `android`;
- [Telegram для iOS](https://github.com/TelegramMessenger/Telegram-iOS) `ios`;
- [Telegram для macOS](https://github.com/overtake/TelegramSwift) `macos`;
- [Telegram Desktop](https://github.com/telegramdesktop/tdesktop) `tdesktop`;
- [Telegram Web A](https://github.com/Ajaxy/telegram-tt) `weba`;
- [Telegram Web K](https://github.com/morethanwords/tweb) `web`;

Other applications either don't have implementation for Telegram Mini Apps or
support it too poorly. Возможно, это будет полезно в следующих разделах документации.

::: info

Поскольку все приложения разрабатываются отдельно, поэтому могут быть различия в их реализации на платформе. Если вы столкнетесь с неожиданными различиями, пожалуйста, сообщите о [проблеме](https://github.com/Telegram-Mini-Apps/issues).

:::
