# Параметры темы

В этом разделе SDK рассматривается тема, связанная
с [параметрами темы](../../../platform/theming.md).

## Анализ

Для анализа значения в качестве параметров темы в пакете предусмотрен метод `parseThemeParams`. Этот метод принимает объект JSON как строку или объект JavaScript, возвращая интерфейс `ThemeParams`. Если предоставленные данные недействительны, он ввыдает ошибку.

::: code-group

```typescript [Usage example]
import { parseThemeParams } from '@telegram-apps/sdk';

parseThemeParams({
  accent_text_color: "#6ab2f2",
  bg_color: "#17212b",
  button_color: "#5288c1",
  button_text_color: "#ffffff",
  destructive_text_color: "#ec3942",
  header_bg_color: "#17212b",
  hint_color: "#708499",
  link_color: "#6ab3f3",
  secondary_bg_color: "#232e3c",
  section_bg_color: "#17212b",
  section_header_text_color: "#6ab3f3",
  subtitle_text_color: "#708499",
  text_color: "#f5f5f5"
});
```

```typescript [Expected result]
const result = {
  accentTextColor: "#6ab2f2",
  bgColor: "#17212b",
  buttonColor: "#5288c1",
  buttonTextColor: "#ffffff",
  destructiveTextColor: "#ec3942",
  headerBgColor: "#17212b",
  hintColor: "#708499",
  linkColor: "#6ab3f3",
  secondaryBgColor: "#232e3c",
  sectionBgColor: "#17212b",
  sectionHeaderTextColor: "#6ab3f3",
  subtitleTextColor: "#708499",
  textColor: "#f5f5f5"
};
```

:::

Предполагая, что каждое свойство записано с использованием регистра snake, он преобразует их в регистр camel.

## Сериализация

Чтобы преобразовать представление объекта параметров темы в строку, разработчики должны использовать функцию `serializeThemeParams`:

```typescript
import { serializeThemeParams } from '@telegram-apps/sdk';

serializeThemeParams({
  accentTextColor: "#6ab2f2",
  bgColor: "#17212b",
  buttonColor: "#5288c1",
  buttonTextColor: "#ffffff",
  destructiveTextColor: "#ec3942",
  headerBgColor: "#17212b",
  hintColor: "#708499",
  linkColor: "#6ab3f3",
  secondaryBgColor: "#232e3c",
  sectionBgColor: "#17212b",
  sectionHeaderTextColor: "#6ab3f3",
  subtitleTextColor: "#708499",
  textColor: "#f5f5f5"
});

// Result:
// `{
//   "accent_text_color":"#6ab2f2",
//   "bg_color":"#17212b",
//   "button_color":"#5288c1",
//   "button_text_color":"#ffffff",
//   "destructive_text_color":"#ec3942",
//   "header_bg_color":"#17212b",
//   "hint_color":"#708499",
//   "link_color":"#6ab3f3",
//   "secondary_bg_color":"#232e3c",
//   "section_bg_color":"#17212b",
//   "section_header_text_color":"#6ab3f3",
//   "subtitle_text_color":"#708499",
//   "text_color":"#f5f5f5"
// }`
```
