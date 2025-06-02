# 关于平台

Telegram Mini Apps 是著名聊天工具 Telegram 开发人员创造的一项技术。
的主要目的是为开发人员与 Telegram 用户提供更灵活的交流渠道。
主要目的是为开发人员与 Telegram 用户提供更灵活的交流渠道。

这似乎不太清楚，但迷你应用程序不是自助服务。 首先要注意的是，从技术上讲，这项技术只是对
Telegram Bots 等已知 Telegram 功能的附加。 因此，目前无法在不创建 Telegram Bot 的情况下创建迷你应用程序。 首先要注意的是，
，从技术上讲，这项技术只是对
Telegram Bots 等已知 Telegram 功能的附加。 正如我们在上一节中提到的，迷你应用程序是 Telegram 机器人的附加组件。 Telegram 机器人是
也是一项著名的技术，可为各种使用案例提供功能。 您可以创建一个
机器人来购买电影票、给用户讲笑话、生成随机数等。 换句话说，机器人可以做开发人员想到的任何事情。

The platform offers a high variety of available methods to communicate with the Telegram application
to make your web applications look more native, allow them to simulate native application's
behavior, and finally, to **mimic** native applications.

## 所需技术

Before starting to create an application on the Mini Apps platform, it is important to know what
Mini Apps are from a technical standpoint. This will lead the developer to the selection of language and technology.

在内部，迷你应用程序是典型的网络应用程序，在 WebView 中显示。 换句话说，它们只是一组静态文件（主要是`.js`、`.css`和`.html`）。 因此，要创建 Mini App，只需学习标准的前端开发技术即可，例如： 换句话说，
，它们只是一组静态文件（主要是`.js`、`.css`和`.html`）。 因此，要创建 Mini App，
，只需学习标准的前端开发技术即可，例如：

- JavaScript
- CSS
- HTML

真的很简单，不是吗？ 真的很简单，不是吗？ 但如果要制作更严肃、更大型的应用程序，我们建议使用
等更可靠的技术，如 `TypeScript`、`React`、`SCSS` 等。

因此，如果我们想创建一个小程序，我们应该使用任何技术栈创建一个标准的 web 应用程序。 因此，如果我们想创建一个迷你应用程序，就应该使用任何技术创建一个标准的网络应用程序
stack。 Telegram 需要开发者提供的唯一信息就是应用程序的 URL。 该 URL 将用作 Telegram 客户端 WebView 组件的
源，WebView 组件将加载并显示 Telegram 中的应用程序
。 该 URL 将用作 Telegram 客户端 WebView 组件的
源，WebView 组件将加载并显示 Telegram 中的应用程序
。

## 使用方法

正如我们在上一节中提到的，小程序是 Telegram 机器人的附加组件。 Telegram 机器人是
也是一项著名的技术，可为各种使用案例提供功能。 You could create a
bot to buy a ticket in the cinema, tell jokes, generate random numbers, etc. In other
words, the bot can do whatever the developer can think of.

问题是，机器人的视觉效果和功能都不尽如人意。 他们目前的
实现是 "控制台式 "的，更适合开发人员，而不是普通用户。 That's
where Mini Apps are useful.

Using Mini Apps, developers can create more user-friendly and complex interfaces, which
are commonly used by typical users. 利用迷你应用程序，开发人员可以创建更加友好和复杂的界面，这些界面是普通用户常用的。 有了这项技术，开发者仍然可以与 Mini App 背后的机器人
通信，但此外，他们还可以提供一些更灵活的界面，供
交互。

Mini Apps are used when a standard bot interface is not enough. Create a Mini App when you
want to make user life easier when displaying several buttons is not even close to the
functionality you want to provide.

## 支持的应用程序

目前，Telegram Mini Apps 可在众多 Telegram
应用程序中使用：

- [Telegram for Android](https://github.com/DrKLO/Telegram) `android`；
- [Telegram for iOS](https://github.com/TelegramMessenger/Telegram-iOS) `iS`；
- [Telegram for macOS](https://github.com/overtake/TelegramSwift) `macos`；
- [Telegram Desktop](https://github.com/telegramdesktop/tdesktop) `tdesktop`；
- [Telegram Web A](https://github.com/Ajaxy/telegram-tt) `weba`；
- [Telegram Web K](https://github.com/morethanwords/tweb) `web`；

Other applications either don't have implementation for Telegram Mini Apps or
support it too poorly. 这在
文档的后续章节中可能会有用。

::: info

只要所有应用程序都是单独开发的，那么它们在
实现平台的方式就可能存在差异。 只要所有应用程序都是单独开发的，那么它们在
实现平台的方式就可能存在差异。 如果遇到意外差异，请考虑
[报告问题](https://github.com/Telegram-Mini-Apps/issues)。

:::
