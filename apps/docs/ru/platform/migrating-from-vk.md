# Перенос мини-приложений из ВКонтакте в Telegram

## 1. Начало работы

### Создание бота в Telegram

Чтобы начать работать с мини-приложениями в Telegram, вам необходимо создать бота. Выполните следующие действия:

1. Откройте приложение Telegram и найдите BotFather.
2. Начните диалог с BotFather, используя команду `/start`, для начала создания бота.
3. Введите команду `/newbot` и следуйте инструкциям по созданию нового бота. Вам нужно будет выбрать имя и уникальный логин для бота.
4. После успешного создания бота BotFather предоставит вам токен доступа, который потребуется для взаимодействия с API Telegram.

### Регистрация и настройка мини-приложения

Чтобы зарегистрировать и настроить мини-приложение, выполните следующие действия:

1. Перейдите в раздел [Создание веб-приложения Telegram](https://core.telegram.org/bots/webapps) в официальной документации Telegram.
2. Следуйте инструкциям, чтобы зарегистрировать свое мини-приложение, настроить необходимые параметры и интегрировать его с ботом.

## 2) Взаимодействие с API платформ

Для взаимодействия с API платформ используются специализированные библиотеки, обеспечивающие удобный доступ к функциям и возможностям этих платформ. ВКонтакте и Telegram предоставляют такие библиотеки, а именно `vk-bridge` и `@tma.js/sdk`, соответственно. Обе библиотеки выполняют схожие функции, позволяя разработчикам взаимодействовать с API своей платформы для получения пользовательских данных и выполнения других задач.

### ВКонтакте: vk-bridge

Библиотека `vk-bridge` предназначена для взаимодействия с API ВКонтакте. Официальную документацию можно найти [здесь](https://dev.vk.com/ru/bridge/overview).

### Telegram: @tma.js/sdk

Библиотека `@tma.js/sdk` предназначена для взаимодействия с API Telegram. Официальную документацию можно найти [здесь](https://docs.telegram-mini-apps.com/packages/tma-js-sdk).

## 3. Авторизация в приложении

Основное различие между ВКонтакте и Telegram заключается в том, как вы авторизуете своего пользователя.

### ВКонтакте

#### Бэкэнд

У ВКонтакте нет специальной библиотеки для авторизации. Вам нужно вручную вычислить хэш `signParams` с помощью секретного ключа, указанного в настройках мини-приложения ВКонтакте.

```ts
const VK_APP_SECRET_KEY = 'VK_APP_SECRET_KEY';

function isSignValid(sign: string, signParams: Record<string, string>): boolean {
  const signUrlParams = new URLSearchParams(signParams);
  signUrlParams.sort();

  const queryString = signUrlParams.toString();

  const paramsHash = crypto
    .createHmac('sha256', VK_APP_SECRET_KEY)
    .update(queryString)
    .digest()
    .toString('base64url');

  return paramsHash === sign;
}
```

После проверки параметров входа вы можете извлечь оттуда пользовательские данные. Например, `vkUserId`.

```ts
const vkUserId = signParams.vk_user_id;
```

После этого просто поместите `vkUserId` в базу данных или куда-либо еще.

#### Фронтенд

Используйте `vk-bridge` для получения данных о параметрах авторизации.

```ts
  const { sign, ...signParams } = await bridge.send('VKWebAppGetLaunchParams');
```

### Telegram

#### Бэкэнд

В Telegram есть похожий механизм. Но вместо ручной проверки вы можете использовать пакет `@tma.js/init-data-node` для проверки `initData`, используя секретный ключ, предоставленный `@BotFather`.

```ts
import { validate } from '@tma.js/init-data-node';

const TG_BOT_SECRET = 'TG_BOT_SECRET';

function isInitDataValid(initDataRaw: string): boolean {
  try {
    validate(initDataRaw, TG_BOT_SECRET);
    return true;
  } catch (err) {
    return false;
  }
}
```

После проверки данных init вы можете извлечь информацию о пользователе с помощью `@tms.js/init-data-node`.

```ts
import { parse } from '@tma.js/init-data-node';

const initData = parse(initDataRaw);
const tgUserId = initData.user.id.toString();
```

После этого просто поместите `tgUserId` в базу данных или куда-либо еще.

#### Фронтэнд

Используйте `@tma.js/sdk`, чтобы получить `initDataRaw`.

```ts
  import { retrieveLaunchParams } from '@tma.js/sdk';

  const { initDataRaw } = retrieveLaunchParams();
```

### Авторизация с помощью кошелька Ton (необязательно)

Кроме прочего, вы можете авторизовать своего пользователя с помощью кошелька Ton.
Стандартный способ - использование Ton Proof. Ниже приведен пример. Дополнительную информацию вы можете найти в [официальных документах](https://docs.ton.org/develop/dapps/ton-connect/sign).

#### Бэкэнд

```ts
export async function isProofValid(payload: TonProof): Promise<boolean> {
  try {
    const stateInit = loadStateInit(Cell.fromBase64(payload.proof.stateInit).beginParse());
    const publicKey = tryParsePublicKey(stateInit);
    if (!publicKey) {
      return false;
    }

    const walletPublicKey = Buffer.from(payload.publicKey, 'hex');
    if (!publicKey.equals(walletPublicKey)) {
      return false;
    }

    const address = Address.parse(payload.address);
    const walletAddress = contractAddress(address.workChain, stateInit);
    if (!walletAddress.equals(address)) {
      return false;
    }

    if (!ALLOWED_DOMAINS.includes(payload.proof.domain.value)) {
      return false;
    }

    const now = Math.floor(Date.now() / 1000);
    if (now - VALID_AUTH_TIME > payload.proof.timestamp) {
      return false;
    }

    const message = {
      workchain: walletAddress.workChain,
      address: walletAddress.hash,
      domain: {
        lengthBytes: payload.proof.domain.lengthBytes,
        value: payload.proof.domain.value,
      },
      signature: Buffer.from(payload.proof.signature, 'base64'),
      payload: payload.proof.payload,
      stateInit: payload.proof.stateInit,
      timestamp: payload.proof.timestamp,
    };

    const wc = Buffer.alloc(4);
    wc.writeUInt32BE(message.workchain, 0);

    const ts = Buffer.alloc(8);
    ts.writeBigUInt64LE(BigInt(message.timestamp), 0);

    const dl = Buffer.alloc(4);
    dl.writeUInt32LE(message.domain.lengthBytes, 0);

    const msg = Buffer.concat([
      Buffer.from(TON_PROOF_PREFIX),
      wc,
      message.address,
      dl,
      Buffer.from(message.domain.value),
      ts,
      Buffer.from(message.payload),
    ]);

    const msgHash = Buffer.from(await sha256(msg));

    const fullMsg = Buffer.concat([
      Buffer.from([0xff, 0xff]),
      Buffer.from(TON_CONNECT_PREFIX),
      msgHash,
    ]);

    const result = Buffer.from(await sha256(fullMsg));

    return sign.detached.verify(result, message.signature, publicKey);
  } catch (e) {
    return false;
  }
}
```

#### Фронтэнд

Пример создания провайдера для авторизации:

```tsx
import {
  ReactNode, useCallback, useEffect, useRef, useState,
} from 'react';
import {
  useIsConnectionRestored, useTonAddress, useTonConnectModal, useTonConnectUI, useTonWallet,
} from '@tonconnect/ui-react';
import { retrieveLaunchParams } from '@tma.js/sdk-react';
import {
  apiGetSelf, apiGetTonProof, apiLogout, apiPostTgAuthorize, apiPostTonProofAuth,
} from 'services/auth.api';
import { GetAuthSelfResponse, GetAuthTonProofResponse } from 'dtos/auth.dtos';
import { AuthContext } from '../auth.context';

type TAuthProvider = {
  children: ReactNode
};

const payloadTTLMS = 1000 * 60 * 20;

export const AuthTonProvider = ({ children }: TAuthProvider) => {
  const [user, setUser] = useState<GetAuthSelfResponse | null>();
  const isConnectionRestored = useIsConnectionRestored();
  const wallet = useTonWallet();
  const [tonConnectUI] = useTonConnectUI();
  const address = useTonAddress();

  const { open } = useTonConnectModal();
  const interval = useRef<ReturnType<typeof setInterval> | undefined>();
  const tonProof = useRef<GetAuthTonProofResponse | null>(null);

  const fetchUser = useCallback(async () => {
    const userResponse = await apiGetSelf();
    setUser(userResponse);
    const { initDataRaw } = retrieveLaunchParams();
    if (!userResponse.tgUserId) {
      await apiPostTgAuthorize(initDataRaw || '');
    }
  }, []);

  const completeAuth = useCallback(async () => {
    if (!isConnectionRestored) {
      return;
    }
    clearInterval(interval.current);
    if (!wallet) {
      setUser(null);
      const refreshPayload = async () => {
        tonConnectUI.setConnectRequestParameters({ state: 'loading' });

        const value = await apiGetTonProof();
        tonProof.current = value;
        if (!value) {
          tonConnectUI.setConnectRequestParameters(null);
        } else {
          tonConnectUI.setConnectRequestParameters({ state: 'ready', value: { tonProof: value.payload } });
        }

      };
      refreshPayload().catch(() => {});
      setInterval(refreshPayload, payloadTTLMS);
      return;
    }

    try {
      await fetchUser();
    } catch (e) {
      if (wallet.connectItems?.tonProof && !('error' in wallet.connectItems.tonProof) && tonProof.current) {
        try {
          await apiPostTonProofAuth(
            wallet.connectItems.tonProof.proof, wallet.account, tonProof.current,
          );
          await fetchUser();
        } catch (e) {
          alert('Please try another wallet');
          await tonConnectUI.disconnect();
        }
      } else {
        alert('Please try another wallet');
        await tonConnectUI.disconnect();
      }
    }

  }, [fetchUser, isConnectionRestored, tonConnectUI, wallet]);

  useEffect(() => {
    completeAuth();
  }, [completeAuth]);

  const onLogout = useCallback(async () => {
    await tonConnectUI.disconnect();
    await apiLogout();
    setUser(null);
  }, [tonConnectUI]);

  const authContextValue = {
    user,
    setUser,
    onLogout,
    isWalletConnectionRestored: isConnectionRestored,
    address,
    onOpenTonModal: open,
    tonConnectUI,
    fetchUser,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
```
