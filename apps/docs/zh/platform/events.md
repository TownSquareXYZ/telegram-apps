---
outline:
  - 2
  - 3
---

# 事件 - Events {#Events}

事件是 Telegram 本地应用程序在
完成某些外部操作时发送的信号。 与方法一样，每个事件都有自己独特的名称和参数。

## 网页版 {#web}

如前所述，网络版使用 iframe 之间的标准通信方式。 这意味着
父 iframe 可以通过 `window.postMessage` 函数发送事件。  要处理这类
消息，只需在全局 `window` 对象上添加 `message` 事件监听器即可：

```typescript
window.addEventListener('message', ...);
```

本地应用程序将发送一个带有 `data: string` 的事件，该字符串代表已转换为字符串的 JSON 对象
。  该对象的接口与我们在
[方法](methods.md#web) 部分中定义的接口相同：

```typescript
interface MessageJSON {
  eventType: string;
  eventData: any;
}
```

然后，让我们想象一下如何处理 Telegram 应用程序中的事件：

```typescript
window.addEventListener('message', ({ data }) => {
  const { eventType, eventData } = JSON.parse(data);
  console.log(eventType, eventData);
});
```

::: warning

在这段代码中，我们假设 `message` 事件只由本地应用程序发送，但在实际应用中，这并不总是正确的。  此外，我们没有检查 `data` 是否真的属于
类型 `string`。 不要忘记检查每种类型，并适当处理传入的事件。

:::

## 电脑、手机和 Windows Phone

桌面版、手机版和 Windows Phone 版 Telegram 不使用
上一节所述的方法。 他们的方式有点不同寻常。 开发者首先应该知道的是，在 Telegram 需要触发事件时，它会插入调用全局定义函数的 JavaScript 代码。

下面就是一个例子：

```typescript
window.Telegram.WebView.receiveEvent('popup_closed', {
  button_id: 'cancel'
});
```

该功能的路径取决于平台：

- `window.TelegramGameProxy.receiveEvent` - Telegram 桌面版；
- `window.Telegram.WebView.receiveEvent` - 适用于 iOS 和 Android 的 Telegram；
- window.TelegramGameProxy_receiveEvent\` - Windows Phone

所有这些函数都有相同的签名：

```typescript
type ReceiveEvent = (eventType: string, eventData: unknown) => void;
```

因此，解决办法相当简单。 因此，解决办法相当简单。 为了处理传入的事件，我们应该创建一个
类型的函数，并将其分配给所有 3 条路径。

## 监听事件 {#Listening to Events}

为开发人员的应用程序处理所有可能的环境是一项挑战。 为开发人员的应用程序处理所有可能的环境是一项挑战。 为了简化
这一过程，社区开发了 [@telegram-apps/sdk](../packages/telegram-apps-sdk/2-x)
软件包，大大简化了集成工作。

下面介绍如何使用它：

```ts
import { on } from '@telegram-apps/sdk';

// 开始监听 "viewport_changed "事件。
// 返回值是一个函数，用于移除此事件监听器。
const removeListener = on('viewport_changed', payload => {
  console.log('Viewport changed:', payload);
});

// 移除此事件监听器。
removeListener();
```

有关调用方法的更多信息，请参阅
软件包的 [documentation](../packages/telegram-apps-bridge/events.md#listening-to-events) 。

## 可用事件 {#Available Events}

本节包含从 Telegram 发送的事件列表：名称、描述和参数。
参数。 小节标题指最小版本，小节内的事件可从该版本发送。

### `accelerometer_changed`

当 [viewport](viewport.md) 发生更改时出现。 例如，当用户开始拖动应用程序或调用扩展方法时。

Accelerometer data changed.

| 字段 | 类型       | 桌面版、手机版和 Windows Phone 版 Telegram 不使用&#xA;上一节所述的方法。他们的做法有点不同寻常。开发者首先要知道的是，如果 Telegram 需要发布事件，它会插入 JavaScript 代码，调用全局定义的函数。 |
| -- | -------- | -------------------------------------------------------------------------------------------------------------------------- |
| x  | `number` | The current acceleration in the X-axis, measured in m/s².                                                  |
| y  | `number` | The current acceleration in the Y-axis, measured in m/s².                                                  |
| z  | `number` | The current acceleration in the Z-axis, measured in m/s².                                                  |

### `accelerometer_failed`

启用版本: **v8.0**

Failed to start accelerometer data tracking.

| 字段    | 类型       | 说明                              |
| ----- | -------- | ------------------------------- |
| error | `string` | Occurred error. |

### `accelerometer_started`

启用版本: **v7.2**

Accelerometer data tracking started.

### `accelerometer_stopped`

启用版本: **v8.0**

Accelerometer data tracking stopped.

### `back_button_pressed`

启用版本: **v6.1**

用户点击了 [返回按钮](back-button.md)。

### `biometry_auth_requested`

启用版本: **v7.2**

生物识别认证请求已完成。 生物识别认证请求已完成。 该事件通常发生在对
[web_app_request_auth](methods.md#web-app-biometry-request-auth) 方法的响应中。

如果身份验证成功，事件中就会包含一个来自本地安全存储的令牌。

| 字段     | 类型       | 说明                                                                                                                |
| ------ | -------- | ----------------------------------------------------------------------------------------------------------------- |
| status | `string` | Authentication status. Possible values: `failed` or `authorized`. |
| token  | `string` | _可选_。 之前保存的本地安全存储器中的令牌。  仅当 `status` 为 `authorized` 时传递。                                                          |

### `biometry_info_received`

启用版本: **v7.2**

生物测量设置已收到。

| 字段                                    | 类型        | 说明                                                                                     |
| ------------------------------------- | --------- | -------------------------------------------------------------------------------------- |
| available                             | `boolean` | 显示是否提供生物测量。                                                                            |
| access_requested | `boolean` | 显示是否已申请使用生物识别技术的权限。                                                                    |
| access_granted   | `boolean` | 显示是否已批准使用生物识别技术。                                                                       |
| device_id        | `string`  | 唯一的设备标识符，可用于将令牌与设备进行匹配。                                                                |
| token_saved      | `boolean` | 显示本地安全存储是否包含以前保存的令牌。                                                                   |
| type                                  | `string`  | 设备上当前可用的生物识别技术类型。 Possible values: `face` or `finger`. |

### `biometry_token_updated`

为开发人员的应用程序处理所有可能的环境是一项挑战。 为了简化
这一过程，社区开发了 [@telegram-apps/sdk](../packages/telegram-apps-sdk/2-x)
软件包，大大简化了集成工作。

生物计量令牌已更新。

| 字段     | 类型       | 说明                                                                             |
| ------ | -------- | ------------------------------------------------------------------------------ |
| status | `string` | 更新状态。 Possible values: `updated` or `removed`. |

### `clipboard_text_received`

启用版本: **v6.4**

Telegram 应用程序试图从剪贴板提取文本。

| 字段                          | 类型                | 说明                                                                                                                                                                                                              |
| --------------------------- | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| req_id | `string`          | 在调用 [web_app_read_text_from_clipboard](methods.md#web-app-read-text-from-clipboard) 方法时传递的 `req_id` 值。 |
| data                        | `string` 或 `null` | _可选_。 从剪贴板中提取的数据。 _可选_。 从剪贴板中提取的数据。 只有在应用程序可以访问剪贴板的情况下，返回值才会是 `string` 类型。                                                                                                                                      |

### `content_safe_area_changed`

启用版本: **v6.9**

This event occurs whenever the content safe area changes in the user's Telegram app. For instance,
when a user switches to landscape mode.

The **safe area** ensures that content does not overlap with Telegram's UI elements.

The **content safe area** is a subset of the device's safe area, specifically covering Telegram's
UI.

| 字段     | 类型       | 说明                                                                                               |
| ------ | -------- | ------------------------------------------------------------------------------------------------ |
| top    | `number` | The top inset in pixels, representing the space to avoid at the top of the content area          |
| bottom | `number` | The bottom inset in pixels, representing the space to avoid at the bottom of the content area    |
| left   | `number` | The left inset in pixels, representing the space to avoid on the left side of the content area   |
| right  | `number` | The right inset in pixels, representing the space to avoid on the right side of the content area |

### `custom_method_invoked`

启用版本: **v6.9**

自定义方法调用完成。

| 字段                          | 类型        | 说明                                              |
| --------------------------- | --------- | ----------------------------------------------- |
| req_id | `string`  | 本次调用的唯一标识符。                                     |
| result                      | `unknown` | _可选_。 Method invocation result. |
| error                       | `string`  | _可选_。 方法调用错误代码。                                 |

### `device_orientation_changed`

启用版本: **v8.0**

Device orientation data changed.

| 字段       | 类型        | 说明                                                                                                                   |
| -------- | --------- | -------------------------------------------------------------------------------------------------------------------- |
| absolute | `boolean` | _可选_。  A boolean that indicates whether the device is providing orientation data in absolute values. |
| alpha    | `number`  | The rotation around the Z-axis, measured in radians.                                                 |
| beta     | `number`  | The rotation around the X-axis, measured in radians.                                                 |
| gamma    | `number`  | The rotation around the Y-axis, measured in radians.                                                 |

### `device_orientation_failed`

启用版本: **v8.0**

Device orientation data tracking failed to start.

| 字段    | 类型       | 说明                              |
| ----- | -------- | ------------------------------- |
| error | `string` | Occurred error. |

### `device_orientation_started`

Available since: **v8.0**

Device orientation data tracking started.

### `device_orientation_stopped`

Available since: **v8.0**

Device orientation data tracking stopped.

### `emoji_status_access_requested`

Available since: **v8.0**

Access to set custom emoji status was requested.

| 字段     | 类型       | 说明                                                                                |
| ------ | -------- | --------------------------------------------------------------------------------- |
| status | `string` | 请求状态。  Possible values: `allowed` or `cancelled`. |

### `emoji_status_failed`

_可选_。 方法调用成功。

Failed to set custom emoji status.

| 字段    | 类型       | 说明                                                                                                                      |
| ----- | -------- | ----------------------------------------------------------------------------------------------------------------------- |
| error | `string` | Emoji set failure reason. Possible values: `SUGGESTED_EMOJI_INVALID` or `USER_DECLINED` |

### `emoji_status_set`

如前所述，网页版使用 iframe 之间的标准通信方式。 这意味着
父 iframe 可以通过 `window.postMessage` 函数发送事件。 要处理这类
消息，只需在全局 `window` 对象上添加 `message` 事件监听器即可：

Custom emoji status set.

### `file_download_requested`

_可选_。 被点击按钮的标识符。 如果弹出窗口关闭时没有点击任何按钮，则省略此属性。

| Field  | Type     | Description                                                             |
| ------ | -------- | ----------------------------------------------------------------------- |
| status | `string` | 请求状态。  Set to `downloading` if the is being downloaded. |

### `fullscreen_changed`

```
      <code>failed</code>，账单失败
```

Occurs whenever the mini app enters or exits the fullscreen mode.

| 本地应用程序将发送一个带有 `data: string` 的事件，该字符串代表已转换为字符串的 JSON 对象&#xA;。 该对象的接口与我们在&#xA;[方法](methods.md#web) 部分中定义的接口相同： | 类型        | 描述                                                                            |
| ------------------------------------------------------------------------------------------------------------- | --------- | ----------------------------------------------------------------------------- |
| is_fullscreen                                                                            | `boolean` | Indicates if the application is currently in fullscreen mode. |

### `fullscreen_failed`

```
      <code>paid</code>，账单已支付
```

Occurs whenever the mini app enters or exits the fullscreen mode.

|   </tbody> | 因此，解决办法相当简单。 为了处理传入的事件，我们应该创建一个&#xA;类型的函数，并将其分配给所有 3 条路径。 | 描述                                                                                                                                    |
| ---------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| error      | `string`                                                  | Fullscreen mode status error. Possible values: `UNSUPPORTED` or `ALREADY_FULLSCREEN`. |

### `gyroscope_changed`

```
      <code>cancelled</code>，账单已取消
```

Gyroscope data changed.

| 字段 | 类型       | 描述                                                                              |
| -- | -------- | ------------------------------------------------------------------------------- |
| x  | `number` | The current rotation rate around the X-axis, measured in rad/s. |
| y  | `number` | The current rotation rate around the Y-axis, measured in rad/s. |
| z  | `number` | The current rotation rate around the Z-axis, measured in rad/s. |

### `gyroscope_failed`

`'failed'` 或 `'authorized'`

Gyroscope data tracking failed to run.

| 字段    | 类型       | 描述                              |
| ----- | -------- | ------------------------------- |
| error | `string` | Occurred error. |

### `gyroscope_started`

```
      <code>pending</code>，账单目前待定
```

Gyroscope data tracking started.

### `gyroscope_stopped`

`'updated'` 或 `'removed'`

Gyroscope data tracking stopped.

### `home_screen_added`

验证状态。

The mini application was added to the device's home screen.

### `home_screen_checked`

_可选_。 从 QR 中提取的数据。

The status of the mini application being added to the home screen has been checked.

| Field  | Type     | Description                                                                                                                                                        |
| ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| status | `string` | The status of the mini application being added to the home screen. Possible values: `unsupported`, `unknown`, `added` and `missed` |

- `unsupported` – the feature is not supported, and it is not possible to add the icon to the home
  screen,
- `unknown` – the feature is supported, and the icon can be added, but it is not possible to
  determine if the icon has already been added,
- `added` – the icon has already been added to the home screen,
- `missed` – the icon has not been added to the home screen.

### `home_screen_failed`

```
  账单状态。 值：
```

User declined the request to add the current mini application to the device's home screen.

### `invoice_closed`

支付请求已结清。

| Field  | Type     | Description                                                                                                                                                    |
| ------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| slug   | `string` | ```
  在&nbsp;
  期间传递       <a href="./methods#web-app-open-invoice">
    <code>web_app_open_invoice</code>
  </a>&nbsp;
  方法调用的<code>slug</code>值。
``` |
| status | `string` | 支付请求已结清。 Possible values: `paid`, `failed`, `pending` or `cancelled`.                                                          |

### `location_checked`

请求状态。只能是 `sent` 或 `cancelled`。

Location-related functionality availability status was retrieved.

| Field                                 | Type      | Description                                                                       |
| ------------------------------------- | --------- | --------------------------------------------------------------------------------- |
| available                             | `boolean` | Shows whether location tracking is available.                     |
| access_requested | `boolean` | Shows whether permission to location tracking has been requested. |
| access_granted   | `boolean` | Shows whether permission to location tracking has been granted.   |

### `location_requested`

更新状态。

The application received the information about the current user location.

| Field                                                                           | Type      | Description                                                                                                                                           |
| ------------------------------------------------------------------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| available                                                                       | `boolean` | Shows whether location tracking is available.                                                                                         |
| latitude                                                                        | `number`  | Latitude in degrees. Set only if `available` is True.                                                                 |
| longitude                                                                       | `number`  | Longitude in degrees. Set only if `available` is True.                                                                |
| 请注意，这种方法的发送速率不足以平滑调整&#xA;应用程序窗口的大小。 您可能应该使用一个稳定的高度来代替当前的高度，或者用其他方法来处理&#xA;这个问题。 | `number`  | _可选_。 Altitude above sea level in meters. Set only if `available` is True.                                            |
| course                                                                          | `number`  | _可选_。 The direction the device is moving in degrees. Set only if `available` is True.                                 |
| speed                                                                           | `number`  | _Optional_. The speed of the device in m/s. Set only if `available` is True.                          |
| horizontal_accuracy                                        | `number`  | _Optional_. Accuracy of the latitude and longitude values in meters. Set only if `available` is True. |
| vertical_accuracy                                          | `number`  | _Optional_. Accuracy of the altitude value in meters. Set only if `available` is True.                |
| course_accuracy                                            | `number`  | _Optional_. Accuracy of the course value in degrees. Set only if `available` is True.                 |
| speed_accuracy                                             | `number`  | _Optional_. Accuracy of the speed value in m/s. Set only if `available` is True.                      |

### `main_button_pressed`

用户点击了 [主按钮](main-button.md)。

### `phone_requested`

启用版本: **v6.9**

申请已收到电话访问请求状态。

| Field  | Type     | Description                                                                        |
| ------ | -------- | ---------------------------------------------------------------------------------- |
| status | `string` | Request status. Can only be `sent` or `cancelled`. |

### `popup_closed`

[Popup](popup.md) 已关闭。

| Field                          | Type     | Description                                                                       |
| ------------------------------ | -------- | --------------------------------------------------------------------------------- |
| button_id | `string` | _Optional_. 被点击按钮的标识符。 _可选_。 被点击按钮的标识符。 如果弹出窗口关闭时没有点击任何按钮，则省略此属性。 |

### `prepared_message_failed`

_可选_。 之前保存的本地安全存储器中的令牌。 仅当 `status` 为 `authorized` 时通过。

Failed to send a prepared message.

| Field | Type     | Description                     |
| ----- | -------- | ------------------------------- |
| error | `string` | Occurred error. |

### `prepared_message_sent`

_可选_。 视口宽度。

A prepared message was sent.

### `qr_text_received`

启用版本: **v6.4**

QR 扫描仪扫描一些 QR 并提取其内容。

| Field | 通常由 Telegram 网络应用程序发送的事件。 其有效载荷代表 `<style/>`&#xA;标记 HTML 内容，开发人员可以使用。 有效载荷中描述的样式表将帮助&#xA;开发人员设计应用程序滚动条的样式（但开发人员仍可自行设计）。 | Description                                    |
| ----- | ----------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| data  | `string`                                                                                                                | _Optional_. _可选_。 从 QR 中提取的数据。 |

### `reload_iframe`

父 iframe 请求重新加载当前 iframe。

### `safe_area_changed`

_可选_。 方法调用错误代码。

This event occurs whenever the safe area changes in the user's Telegram app, such as when the user
switches to landscape mode.

The **safe area** prevents content from overlapping with system UI elements like notches or
navigation bars.

| Field  | 在这段代码中，我们假设 "消息 "事件只由本地应用程序发送，但在实际应用中，这并不总是正确的。 此外，我们没有检查 `data` 是否真的属于&#xA;类型 `string`。 不要忘记检查每种类型，并适当处理传入的事件。 | 本节包含从 Telegram 发送的事件列表：名称、描述和参数。&#xA;参数。部分标题表示最小版本，该部分内的事件可从该版本发送。                         |
| ------ | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| top    | `number`                                                                                                        | The top inset in pixels, representing the space to avoid at the top of the screen          |
| bottom | `number`                                                                                                        | The bottom inset in pixels, representing the space to avoid at the bottom of the screen    |
| left   | `number`                                                                                                        | The left inset in pixels, representing the space to avoid on the left side of the screen   |
| right  | `number`                                                                                                        | The right inset in pixels, representing the space to avoid on the right side of the screen |

### `scan_qr_popup_closed`

启用版本: **v6.4**

QR 扫描仪已关闭。

### `secondary_button_pressed`

启用版本: **v7.10**

用户点击了辅助按钮。

### `set_custom_style`

通常由 Telegram 网络应用程序发送的事件。 其有效载荷代表 `<style/>`
标记 HTML 内容，开发人员可以使用。 负载中描述的样式表将帮助开发者对应用的滚动条进行样式化（但开发者仍然可以自行进行样式设置）。

### `settings_button_pressed`

启用版本: **v6.1**

按下 [设置按钮](settings-button.md) 时出现。

### `theme_changed`

每当用户的 Telegram 应用程序（包括切换到夜间模式）中的[主题](theming.md) 发生更改时都会出现这种情况。

| Field                             |   </thead>               | ```
  <code>string</code>
```          |
| --------------------------------- | ------------------------ | -------------------------------------- |
| theme_params | `Record<string, string>` | 映射，其中键是主题样式表键，值是以 `#RRGGBB` 格式表示的相应颜色。 |

### `viewport_changed`

当 [viewport](viewport.md) 发生更改时出现。  例如，当
用户开始拖动应用程序或调用扩展方法时。

| Field                                                     | 设备上当前可用的生物识别技术类型。 | 账单已结清。                            |
| --------------------------------------------------------- | ----------------- | --------------------------------- |
| height                                                    | `number`          | 视口高度。                             |
| width                                                     | `number`          | _Optional_. 视口宽度。 |
| is_expanded                          | `boolean`         | 当前视口是否已展开。                        |
| is_state_stable | `boolean`         | 视口当前状态是否稳定，下一秒是否会改变。              |

> [!TIP]
> Pay attention to the fact, that send rate of this method is not enough to smoothly resize the
> application window. 您可能应该使用一个稳定的高度来代替当前的高度，或者用其他方法来处理
> 这个问题。

### `visibility_changed`

请求状态。只能是 `allowed` 或 `cancelled`。

Active state assumes that the native Telegram client is currently working with the
current mini application. It is important to note that this is not related to the
mini application’s visibility, but rather its selection among other currently opened
mini applications.

| Field                           | _可选_。 从剪贴板中提取的数据。 只有在应用程序可以访问剪贴板的情况下，返回值才会是 `string` 类型。 | 说明                                                                |
| ------------------------------- | -------------------------------------------------------- | ----------------------------------------------------------------- |
| is_visible | `boolean`                                                | Indicates if the application is currently active. |

### `write_access_requested`

生物测量认证请求已完成。 该事件通常发生在对
[web_app_request_auth](methods.md#web-app-biometry-request-auth) 方法的响应中。

应用程序收到的写入访问请求状态。

| 事件是 Telegram 本地应用程序在&#xA;完成某些外部操作时发送的信号。 与方法一样，每个事件都有自己独特的名称和参数。 | `'face'` 或 `'finger'` | ```
  <code>string</code>
```                                                         |
| ---------------------------------------------------------------- | --------------------- | ------------------------------------------------------------------------------------- |
| status                                                           | `string`              | Request status. Can only be `allowed` or `cancelled`. |
