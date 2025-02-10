# @telegram-apps/mate

Mate - это многофункциональный инструмент для разработчиков на платформе мини-приложений Telegram, решающий широкий спектр задач.

## Установка

Чтобы начать использовать Mate, необходимо установить пакет `@telegram-apps/mate`. Разработчик может сделать это как локально, так и глобально:

:::code-group

```bash [pnpm]
# Локально.
pnpm i -D @telegram-apps/mate
# Глобально.
pnpm i -g @telegram-apps/mate
```

```bash [npm]
# Локально.
npm i -D @telegram-apps/mate
# Глобально.
npm i -g @telegram-apps/mate
```

```bash [yarn]
# Локально.
yarn add -D @telegram-apps/mate
# Глобально.
yarn global add @telegram-apps/mate
```

:::

После установки пакет будет доступен через инструмент командной строки `mate`:

```bash
mate --help
```

> [!СОВЕТ]
> Настоятельно рекомендуется установить пакет локально, чтобы избежать путаницы по версиям пакета и обеспечить единообразный опыт использования внутри команды разработчиков.

## Использование без установки

Если не хотите устанавливать пакет, вы также можете использовать его с помощью `pnpm` или `npx`:

:::code-group

```bash [pnpm]
pnpm dlx @telegram-apps/mate@latest --help
```

```bash [npx]
npx @telegram-apps/mate@latest --help
```

:::
