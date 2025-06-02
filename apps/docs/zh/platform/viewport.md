# 视口 - Viewport {#Viewport}

术语**视口**描述了迷你应用程序的**可见部分**。 由于迷你应用程序在不同平台上的显示方式可能
不同，因此可以使用视口信息来确保迷你应用程序的显示
正确。 Since Mini Apps can appear
differently across various platforms, viewport information is used to ensure the Mini App is
displayed correctly.

视口数据通过四个属性进行描述：

- `width` 和 `height` 属性定义了迷你应用程序可见部分的尺寸。
- `stability` 属性是一个标志，只要认为迷你应用程序不会在下一时刻改变其大小，
  该标志就等于 `true`。
- `expansion` 属性也是一个标志，当迷你应用程序达到
  的最大高度时，该标志等于 `true`。
- **`fullscreen`**: A boolean flag indicating whether the application is displayed in fullscreen
  mode.
- **`safe area`**: An information describing the viewport content safe area and insets.

## 扩展

When an application is opened in the mobile version of Telegram (on both Android and iOS), it is
displayed within a native component called **`BottomSheet`**. This is a draggable block that appears
at the bottom of the screen and can be expanded to cover the entire screen. Users can expand it by
dragging it to the top edge of the screen, but developers can also trigger this programmatically.

默认情况下，应用程序处于最小化（未展开）状态，允许的高度也最小。 要通过代码扩展
应用程序，开发人员应
调用 [web_app_expand](methods.md#web-app-expand) 方法。 To expand
the application via code, developers can call the [**`web_app_expand`**](methods.md#web-app-expand)
method.

<img
src="/components/viewport/views.png"
srcset="/components/viewport/views.png, /components/viewport/views@2x.png 2x"
class="guides-image"
/>

While the **`BottomSheet`** is being dragged, the viewport is considered unstable. For developers,
this means avoiding any resizing actions or similar operations, as viewport dimensions may change
momentarily.

其他平台打开的 Mini App 已在中等大小窗口中最大化，调用
of [web_app_expand](methods.md#web-app-expand) 方法不会有任何效果。 In these
cases, calling the [web_app_expand](methods.md#web-app-expand) method will have no effect.

## Fullscreen

![Full screen](/functionality/full-screen.png)

Mini apps can be launched in **fullscreen mode**, which expands the application to cover the entire
device screen, removing both the top and bottom bars of Telegram.

This mode is particularly suitable for games and media-focused applications.

To control fullscreen mode, Telegram Mini Apps provides such methods
as [web_app_request_fullscreen](methods.md#web_app_request_fullscreen)
and [web_app_exit_fullscreen](methods.md#web_app_exit_fullscreen).

[//]: # "TODO: Learn more and write this section"
[//]: # "## Safe Area"
[//]: #
[//]: # "In mini apps, the **safe area** refers to the portion of the screen that is free from"
[//]: # "obstructions like notches, status bars, navigation bars, or rounded screen edges. It ensures that"
[//]: # "essential content is displayed properly and not hidden or truncated."
[//]: #
[//]: # "Using the safe area is crucial for delivering a seamless user experience, especially on devices with"
[//]: # "modern screen designs (e.g., iPhones with notches or Android devices with rounded corners)."
[//]: # "Developers typically use CSS properties or platform-specific guidelines"
[//]: # "(e.g., `env(safe-area-inset-*)` in CSS) to adjust the layout within the safe area boundaries, but"
[//]: # "in Telegram Mini Apps, these values are passed manually from the Telegram application."

