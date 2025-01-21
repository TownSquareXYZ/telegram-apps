# Ссылки

## `openLink`

Чтобы открыть ссылку во внешнем браузере или с помощью [мгновенного просмотра](https://instantview.telegram.org/), используйте метод `openLink`. Вы также можете передать необязательный второй аргумент — объект с необязательными свойствами `tryBrowser: OpenLinkBrowser (string)` и `tryInstantView: boolean`.

::: code-group

```ts [Using isAvailable]
import { openLink } from '@telegram-apps/sdk';

if (openLink.isAvailable()) {
  openLink('https://telegram.org', {
    tryBrowser: 'chrome',
    tryInstantView: true,
  });
}
```

```ts [Using ifAvailable]
import { openLink } from '@telegram-apps/sdk';

openLink.ifAvailable('https://telegram.org', {
  tryBrowser: 'chrome',
  tryInstantView: true,
});
```

:::

## `OpenTelegramLink`

Чтобы открыть ссылку в Telegram с заданным поведением, используйте метод `openTelegramLink`. Этот метод позволяет применить нативное поведение, описанное в документации [Deep Links](https://core.telegram.org/api/links).

::: code-group

```ts [Using isAvailable]
import { openTelegramLink } from '@telegram-apps/sdk';

if (openTelegramLink.isAvailable()) {
  openTelegramLink('https://t.me/heyqbnk');
}
```

```ts [Using ifAvailable]
import { openTelegramLink } from '@telegram-apps/sdk';

openTelegramLink.ifAvailable('https://t.me/heyqbnk');
```

:::

## `shareURL`

Чтобы поделиться URL-адресом с другим пользователем, каналом или группой, используйте метод `shareURL`.

::: code-group

```ts [Using isAvailable]
import { shareURL } from '@telegram-apps/sdk';

if (shareURL.isAvailable()) {
  shareURL('https://t.me/heyqbnk', 'Check out this cool group!');
}
```

```ts [Using ifAvailable]
import { shareURL } from '@telegram-apps/sdk';

shareURL.ifAvailable(
  'https://t.me/heyqbnk', 
  'Check out this cool group!',
);
```

:::
