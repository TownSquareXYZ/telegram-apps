# @telegram-apps/vue-router-integration

<p style="display: inline-flex; gap: 8px">
  <a href="https://npmjs.com/package/@telegram-apps/vue-router-integration">
    <img src="https://img.shields.io/npm/v/@telegram-apps/vue-router-integration?logo=npm"/>
  </a>
  <img src="https://img.shields.io/bundlephobia/minzip/@telegram-apps/vue-router-integration"/>
  <a href="https://github.com/Telegram-Mini-Apps/telegram-apps/tree/master/packages/vue-router-integration">
    <img src="https://img.shields.io/badge/source-black?logo=github"/>
  </a>
</p>

Telegram Mini Apps [Navigator](telegram-apps-sdk/navigation.md) integration
for [vue-router-dom](https://www.npmjs.com/package/vue-router-dom).

## Installation

::: code-group

```bash [pnpm]
pnpm i @telegram-apps/vue-router-integration
```

```bash [npm]
npm i @telegram-apps/vue-router-integration
```

```bash [yarn]
yarn add @telegram-apps/vue-router-integration
```

:::

## Usage

At the moment, this package provides the only 1 function, which creates the integration for
`vue-router` Router - `useIntegration`.

Here is how it could be used in `main.js`:

```vue
import { createApp } from 'vue'
import Root from './Root.vue'
import { createRouter } from "vue-router";

import { createWebHistory, initNavigator } from "@tma.js/sdk-vue";

const routes = [];

const navigator = initNavigator("app-navigator-state");
navigator.attach();

const router = createRouter({
  history: createWebHistory(navigator),
  routes,
});

// Stop redirect if it goes to wrong path
router.beforeEach((to, from, next) => {
  if (to.path.includes("/tgWebAppData=")) {
    next(false);
  } else {
    next();
  }
});

const app = createApp(Root);
app.use(router)
app.mount('#app')
```

You can learn more about how to use it real world applications using
our [vue template](https://github.com/Telegram-Mini-Apps/vuejs-template).

