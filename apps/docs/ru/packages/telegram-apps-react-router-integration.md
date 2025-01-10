# @telegram-apps/react-router-integration

<p style="display: inline-flex; gap: 8px">
  <a href="https://npmjs.com/package/@telegram-apps/react-router-integration">
    <img src="https://img.shields.io/npm/v/@telegram-apps/react-router-integration?logo=npm"/>
  </a>
  <img src="https://img.shields.io/bundlephobia/minzip/@telegram-apps/react-router-integration"/>
  <a href="https://github.com/Telegram-Mini-Apps/telegram-apps/tree/master/packages/react-router-integration">
    <img src="https://img.shields.io/badge/source-black?logo=github"/>
  </a>
</p>

Интеграция [навигации](telegram-apps-sdk/1-x/navigation.md) мини-приложения Telegram с [react-router-dom](https://www.npmjs.com/package/react-router-dom).

## Установка

::: code-group

```bash [pnpm]
pnpm i @telegram-apps/react-router-integration
```

```bash [npm]
npm i @telegram-apps/react-router-integration
```

```bash [yarn]
yarn add @telegram-apps/react-router-integration
```

:::

## Использование

На данный момент этот пакет предоставляет только 1 функцию, которая создает интеграцию для `react-router-dom` Router - `useIntegration`.

Вот пример его использования:

```jsx
import { useIntegration } from '@telegram-apps/react-router-integration';
import { initNavigator } from '@telegram-apps/sdk-react';
import { useEffect, useMemo } from 'react';
import {
  Navigate,
  Route,
  Router,
  Routes,
} from 'react-router-dom';

import { IndexPage } from './IndexPage.js';

function App() {
  // Создаем новую навигацию приложения и привязываем ее к истории браузера, чтобы он мог изменять её
  // и прослушивать её изменения.
  const navigator = useMemo(() => initNavigator('app-navigation-state'), []);
  const [location, reactNavigator] = useIntegration(navigator);

  // Не забудьте привязать навигацию, чтобы она мог управлять состоянием BackButton, а также
  // историей браузера.
  useEffect(() => {
    navigator.attach();
    return () => navigator.detach();
  }, [navigator]);

  return (
    <Router location={location} navigator={reactNavigator}>
      <Routes>
        <Route path={'/'} component={IndexPage}/>
        <Route path={'*'} element={<Navigate href={'/'}/>}/>
      </Routes>
    </Router>
  );
}
```

Вы можете узнать больше о том, как использовать его в реальных приложениях, используя наш [шаблон React](https://github.com/Telegram-Mini-Apps/reactjs-template).
