# 自定义启动参数 {#Start Parameter}

起始参数是从外部环境传递给 小程序的自定义字符串参数。
自定义启动参数是从外部环境传递给 Mini App 的自定义字符串参数。
其值存储在 [tgWebAppStartParam](launch-parameters#tgwebappstartparam) 启动
参数中。

该参数包含在下列情况之一中：

- 机器人链接包含 `startattach` 查询参数。

```
https://t.me/botusername?startattach=ABC
```

- 直接链接包含 `startapp` 查询参数。

```
https://t.me/botusername/appname?startapp=ABC
```

[//]: #C "待办事项：直接链接：请参阅直接链接页面"

在上述两种情况下，起始参数都将设置为 `ABC`。

::: info

自定义启动参数不包含在位置哈希值中。 相反，它可以在 URL
查询参数中找到。 相反，它可以在 URL
查询参数中找到。

:::

:::tip

该参数的值会在初始数据的 [start_param](init-data.md#parameters-list) 属性中重复。

:::

## 限制条件

- Only the following characters are allowed: `A-Z`, `a-z`, `0-9`, `_` (underscore) and the `-` (minus). We recommend using [base64url](https://base64.guru/standards/base64url) to encode parameters with binary and other types of content. The parameter can be up to `512` characters long.
- You can validate start parameter with the following RegExp: `/^[\w-]{0,512}$/`
