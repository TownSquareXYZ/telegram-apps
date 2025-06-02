---
outline:
  - 2
  - 4
---

# 初始数据 {#Init Data}

在 [应用启动参数](launch-parameters) 列表中，初始化数据位于
`tgWebAppData` 参数中。 这是一组数据，主要与启动
小应用程序的特定用户有关。 这是一组数据，主要与启动
小程序的特定用户有关。

init 数据的一个显著特点是，它可用作身份验证或
授权因素。 因此，不要忘记应用程序
和初始数据的安全性。

## 检索

要提取初始数据，开发人员可以使用
[@telegram-apps/sdk](../packages/telegram-apps-sdk/2-x) 中的 `retrieveLaunchParams` 函数。

```typescript
import { retrieveLaunchParams } from '@telegram-apps/sdk';

const { initDataRaw, initData } = retrieveLaunchParams();
```

## 授权和认证 {#authorization-and-authentication}

初始数据的一个显著特点是，它可用作身份验证或
授权因素。 因此，不要忘记应用程序
和初始数据的安全性。 初始化数据的一个特点是可以用作授权或
身份验证的因素。 事实上，原生 Telegram 应用程序生成的数据会使用 Telegram 机器人的密钥对
进行签名，然后生成的签名会放在
参数本身旁边。

因此，知道了 Telegram 机器人的秘钥，开发者就有机会验证
参数的签名，确保这些参数确实是发给指定用户的。

此外，签名验证操作足够快，不需要大量服务器
资源。

::: tip

你可以在[这篇文章](authorizing-user.md)中找到使用不同编程语言的示例。

:::

## 发送至服务器 {#sending-to-server}

为了在服务器上对用户进行授权，开发者需要传输启动小程序时指定的初始化
数据。
开发人员可以在每次向服务器发送请求时传输这些信息，然后在服务器端进行签名验证
。 为了简化自己的工作，开发者可以在每次请求服务器时传递它们，之后在服务器端进行签名验证。

下面是开发人员向服务器发送初始数据的方法：

```typescript
import { retrieveLaunchParams } from '@telegram-apps/sdk';

const { initDataRaw } = retrieveLaunchParams();

fetch('https://example.com/api', {
  method: 'POST',
  headers: {
    Authorization: `tma ${initDataRaw}`
  },
});
```

反过来，服务器端必须执行以下操作：

1. 获取 `Authorization`（授权）标头的值；
2. 检查其第一部分是否等于 `tma`；
3. 获取初始数据并 [验证](#validating) 其签名。

如果该算法成功，应用程序的服务器部分就可以信任传输的
初始数据。

## 验证 {#validating}

初始数据验证是客户端和服务器之间通信
中最重要的部分之一。 它的有效性保证了初始数据可以被信任
并在未来的代码执行中使用。

> 为避免初始数据验证过程中可能出现的问题，我们建议使用
> 成熟且经过
> 测试的软件包：
>
> - 用于节点：[@telegram-apps/init-data-node](../packages/telegram-apps-init-data-node)
> - GoLang: [init-data-golang](../packages/init-data-golang.md)

### Using Telegram Bot Token

Init data validation is one of the most important parts in communication
between client and server. It's validity guarantees, that init data can be trusted
and used in the future code execution.

要知道，初始数据是以查询参数列表的形式呈现的，要验证
，开发人员应遵循以下步骤：

1. 遍历所有键值对，并以
  格式创建字符串值数组 `{key}={value}`。 `hash` 应排除在外，但要记下来。
  代表初始数据符号，将用于验证过程的最后一步。 `hash` 应排除在外，但要记下来。 它代表初始数据符号，将用于验证过程的最后一步。
2. 最后，让我们使用
  第 2 步收到的排序对和第 3 步的值来计算初始数据符号：
3. 使用密钥 `WebAppData` 创建 HMAC-SHA256，并将其应用于绑定到迷你应用程序的 Telegram Bot
  令牌。
4. Create HMAC-SHA256 using the result of the previous step as a key. <i>可选</i>。 聊天照片链接。 照片可以是<code>.jpeg</code>和 <code>.svg</code>格式。 只有通过附件
  菜单打开的小程序才会返回。
5. 将第 1 步收到的 `hash` 值与第 4 步的结果进行比较。
6. 如果这些值相等，则传递的初始数据是可信的。

#### 检索 {#retrieving}

##### 1. Initial Input

- **Telegram Bot token**: This value is used to sign the init data, and we will need it in the later
  steps of the validation process.

```
5768337691:AAH5YkoiEuPk8-FZa32hStHTqXiLPtAEhx8
```

- **Init data**: This data should be passed directly from the mini application to the server as-is.

```
query_id=AAHdF6IQAAAAAN0XohDhrOrc&user=%7B%22id%22%3A279058397%2C%22first_name%22%3A%22Vladislav%22%2C%22last_name%22%3A%22Kibenko%22%2C%22username%22%3A%22vdkfrost%22%2C%22language_code%22%3A%22ru%22%2C%22is_premium%22%3Atrue%7D&auth_date=1662771648&hash=c501b71e775f74ce10e377dea85a7ea24ecd640b223ea86dfe453e0eaed2e2b2
```

##### 2. Create Key-Value Pairs and Extract Signature

As per the validation process, we should parse the init data as query parameters. Then, take all
key-value pairs excluding the `hash` key, join them with the `=` symbol, and sort them in
alphabetical order. The final array must be joined with the linebreak symbol (`\n`).

The result will be:

```
auth_date=1662771648\nquery_id=AAHdF6IQAAAAAN0XohDhrOrc\nuser={"id":279058397,"first_name":"Vladislav","last_name":"Kibenko","username":"vdkfrost","language_code":"ru","is_premium":true}
```

The signature is the value in the `hash` key. In this case, it equals:

```
c501b71e775f74ce10e377dea85a7ea24ecd640b223ea86dfe453e0eaed2e2b2
```

##### 3. Create Telegram Bot Token Signature

To verify if the init data is signed correctly, we need to sign it ourselves. 然后，创建第 3 步所需的 HMAC-SHA256。 它应基于
`WebAppData` 字面字符串值和 Telegram Bot token。

Here is the result:

```
HMAC-SHA256(
  "WebAppData", 
  "5768337691:AAGDAe6rjxu1cUgxK4BizYi--Utc3J9v5AU"
) = "aa492a44bdf019c759defb1698c1d77690189973945491a756051cdc1207a449"
```

> [!WARNING]\
> The received value must not be transformed into a hexadecimal sequence, as shown above. In the
> next step, use it as-is (an array of bytes), but you can use the hexadecimal value to check if
> your
> code generates the hash correctly.

##### 4. Create and Compare Init Data Signature

Finally, we compute the init data signature.

使用第 3 步的结果作为密钥创建 HMAC-SHA256。 将
应用于第 2 步
中收到的带换行符（`\n`）的成对数组，并将结果显示为十六进制符号序列。

Here is the result:

```
HMAC-SHA256(
  auth_date=1662771648\nquery_id=AAHdF6IQAAAAAN0XohDhrOrc\nuser={"id":279058397,"first_name":"Vladislav","last_name":"Kibenko","username":"vdkfrost","language_code":"ru","is_premium":true},
  *signature from Step 3*,
) = c501b71e775f74ce10e377dea85a7ea24ecd640b223ea86dfe453e0eaed2e2b2
```

现在，将最后收到的结果与第 1 步中的 `hash` 值进行比较，我们可以看到它们是相等的。 这意味着，我们可以信任传递的初始数据。 This means we can trust the passed init data.

### Using Telegram Public Key

Another useful feature Telegram provides is it allows validating init data without knowing
the bot secret token, but its identifier.

At the moment, there are 2 Ed25519 public keys Telegram provides:

- For production environment: `e7bf03a2fa4602af4580703d88dda5bb59f32ed8b02a56c187fe7d34caed242d`
- For test environment: `40055058a4ee38156a06562e52eece92a771bcd8346a8c4615cb7376eddf72ec`

To perform this kind of validation (called third-party validation), follow these steps:

1. 遍历所有键值对，并以
  格式创建字符串值数组 `{key}={value}`。 `hash` 应排除在外，但要记下来。
  代表初始数据符号，将用于验证过程的最后一步。 Key `hash` should be excluded. The `signature` key should also be
  excluded, but memoized. It represents the init data sign and will be used in the final step of
  the validation process.
2. 将计算出的数组按字母顺序排序。
3. Concatenate Telegram Bot identifier issued the init data with the `WebAppData` string using the
  semicolon (`:`) and append a linebreak (`\n`).
4. Join the pairs from the 2-nd step with the linebreak (`\n`) and append the final value to the
  value from the 3-rd step.
5. Verify Ed25519 signature using the value from the `signature` init data key.
6. If verification is successful, the init data can be trusted.

#### 示例 {#example}

##### 1. Initial Input

- **Production environment**: We are validating init data in the production environment. So, this
  Ed25519 public key will be used:

```
e7bf03a2fa4602af4580703d88dda5bb59f32ed8b02a56c187fe7d34caed242d
```

- **Init data**: This data should be passed directly from the mini application to the server as-is.

```
user=%7B%22id%22%3A279058397%2C%22first_name%22%3A%22Vladislav%20%2B%20-%20%3F%20%5C%2F%22%2C%22last_name%22%3A%22Kibenko%22%2C%22username%22%3A%22vdkfrost%22%2C%22language_code%22%3A%22ru%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2F4FPEE4tmP3ATHa57u6MqTDih13LTOiMoKoLDRG4PnSA.svg%22%7D&chat_instance=8134722200314281151&chat_type=private&auth_date=1733584787&hash=2174df5b000556d044f3f020384e879c8efcab55ddea2ced4eb752e93e7080d6&signature=zL-ucjNyREiHDE8aihFwpfR9aggP2xiAo3NSpfe-p7IbCisNlDKlo7Kb6G4D0Ao2mBrSgEk4maLSdv6MLIlADQ
```

##### 2. Create Key-Value Pairs and Extract Signature

As per the validation process, we should parse the init data as query parameters. Then, take all
key-value pairs excluding the `hash` and `signature` keys, join them with the `=` symbol, and sort
them in alphabetical order. The final array must be joined with the linebreak symbol (`\n`).

The result will be:

```
joined_pairs =
   "auth_date=1709144340
   chat_instance=-3788475317572404878
   chat_type=private
   user={\"id\":279058397,\"first_name\":\"Vladislav\",\"last_name\":\"Kibenko\",\"username\":\"vdkfrost\",\"language_code\":\"en\",\"is_premium\":true,\"allows_write_to_pm\":true}"

HMAC-SHA256(
  "aa492a44bdf019c759defb1698c1d77690189973945491a756051cdc1207a449",
  joined_pairs,
) = "371697738012ebd26a111ace4aff23ee265596cd64026c8c3677956a85ca1827"
```

The signature is the value in the `signature` key. In this case, it equals:

```
zL-ucjNyREiHDE8aihFwpfR9aggP2xiAo3NSpfe-p7IbCisNlDKlo7Kb6G4D0Ao2mBrSgEk4maLSdv6MLIlADQ
```

Nevertheless, in the future steps, we should convert it to a bytes array, assuming that this value
is base64-encoded.

> [!DANGER]\
> At the moment, Telegram sends an invalid signature. Some programming languages (e.g., Go) consider
> the signature as an invalid base64 value, as long as it doesn't fully comply with the standard.
> When using the signature, remember to add paddings (`=` signs) at the end of the value in case
> they are needed. In this example, the proper value would be:
>
> ```
> zL-ucjNyREiHDE8aihFwpfR9aggP2xiAo3NSpfe-p7IbCisNlDKlo7Kb6G4D0Ao2mBrSgEk4maLSdv6MLIlADQ==
> ```

##### 3. Create Data-Check String

Now, let's create a data-check string. To do so, we should join the Telegram Bot token with
the `WebAppData` string using the semicolon (`:`) and append a linebreak. Then, the sorted init data
from the previous step should be appended.

Here is the result:

```
// Sorted pairs.
[
  'auth_date=1709144340',
  'chat_instance=-3788475317572404878',
  'chat_type=private',
  'user={"id":279058397,"first_name":"Vladislav","last_name":"Kibenko","username":"vdkfrost","language_code":"en","is_premium":true,"allows_write_to_pm":true}'
]

// Hash.
'371697738012ebd26a111ace4aff23ee265596cd64026c8c3677956a85ca1827'
```

##### 4. Verify Ed25519 Signature

Finally, we verify the signature.

As long as we are in the production environment, we will use the corresponding Ed25519 public key:

```
e7bf03a2fa4602af4580703d88dda5bb59f32ed8b02a56c187fe7d34caed242d
```

This value must be converted to a bytes array, assuming that the value is a hexadecimal sequence.

So here is the result of verification:

```
Telegram Bot token:
5768337691:AAGDAe6rjxu1cUgxK4BizYi--Utc3J9v5AU

Init data:
user=%7B%22id%22%3A279058397%2C%22first_name%22%3A%22Vladislav%22%2C%22last_name%22%3A%22Kibenko%22%2C%22username%22%3A%22vdkfrost%22%2C%22language_code%22%3A%22en%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%7D
&chat_instance=-3788475317572404878
&chat_type=private
&auth_date=1709144340
&hash=371697738012ebd26a111ace4aff23ee265596cd64026c8c3677956a85ca1827
```

If the verification is successful, the init data can be trusted.

### Recommendation

在实际应用中，建议使用其他机制来验证
初始化数据。 例如，添加到期日期。 在实际应用中，建议使用其他机制来验证
初始化数据。 例如，添加到期日期。 这种检查可以通过
`auth_date`参数来实现，该参数负责参数创建的日期。 该
解决方案可在初始化数据被盗的情况下，防止
攻击者不断使用这些数据。
This solution will allow in case of theft of initialization data to prevent their constant use by
an attacker.

## 参数列表 {#parameters-list}

本节提供初始化数据所用参数的完整列表。

<table>
<thead>
  <tr>
    <th>参数</th>
    <th>类型</th>
    <th>说明</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>auth_date</td>
    <td>
      <code>number</code>
    </td>
    <td>
      
      初始化数据的创建日期。 是一个数字，代表 Unix 时间戳。
     是一个数字，代表 Unix 时间戳。
    </td>
  </tr>

  <tr>
    <td>can_send_after</td>
    <td>
      <code>number</code>
    </td>
    <td>
      <i>可选</i>。 
      <i>可选</i>。 通过
      <a href="https://core.telegram.org/bots/api#answerwebappquery">answerWebAppQuery</a> 方法发送消息的秒数。
    
    </td>
  </tr>

  <tr>
    <td>chat</td>
    <td>
      <a href="#chat">
        <code>Chat</code>
      </a>
    </td>
    <td>
      <i>可选</i>。 包含通过附件菜单启动机器人的聊天数据的对象。 返回超级群组、频道和群组聊天 - 仅适用于通过附件菜单启动的小程序。
    </td>
  </tr>

  <tr>
    <td>chat_type</td>
    <td>
      <code>string</code>
    </td>
    <td>
      <i>可选</i>。 打开小程序的聊天类型。 值：      
<ul>
        <li>
          <code>sender</code>
        </li>
        <li>
          <code>private</code>
        </li>
        <li>
          <code>group</code>
        </li>
        <li>
          <code>supergroup</code>
        </li>
        <li>
          <code>channel</code>
        </li>
      </ul>
      仅返回通过直接链接打开的申请表。
    </td>
  </tr>

  <tr>
    <td>chat_instance</td>
    <td>
      <code>string</code>
    </td>
    <td>
      <i>可选</i>。 全局标识符，表示打开小程序的聊天窗口。
      仅返回通过直接链接打开的申请表。
    
    </td>
  </tr>

  <tr>
    <td>hash</td>
    <td>
      <code>string</code>
    </td>
    <td>初始化数据签名。</td>
  </tr>

  <tr>
    <td>query_id</td>
    <td>
      <code>string</code>
    </td>
    <td>
      <i>可选</i>。 小程序的唯一会话 ID。 在
      通过
      <0>answerWebAppQuery</0> 方法发送信息的过程中使用。
    
    </td>
  </tr>

  <tr>
    <td>receiver</td>
    <td>
      <a href="#user">
        <code>User</code>
      </a>
    </td>
    <td>
      <i>可选</i>。 一个对象，包含当前用户在 
      聊天时的聊天伙伴数据，机器人是通过附件菜单启动的。 仅对私人聊天 
      和通过附件菜单启动的小程序返回。
    </td>
  </tr>

  <tr>
    <td>start_param</td>
    <td>
      <code>string</code>
    </td>
    <td>
      <i>可选</i>。 
      <i>可选</i>。 链接中指定的<code>startattach</code>或<code>startapp</code>查询 
      参数的值。 只有通过 
      附件菜单打开的迷你应用程序才会返回。
     只有通过 
      附件菜单打开的小程序才会返回。
    </td>
  </tr>

  <tr>
    <td>user</td>
    <td>
      <a href="#user">
        <code>User</code>
      </a>
    </td>
    <td>
      <i>可选</i>。 
      <i>可选</i>。 包含当前用户信息的对象。
    
    </td>
  </tr>

</tbody>
</table>

## 其他类型 {#Other Types}

### Chat

描述聊天信息。

<table>
<thead>
  <tr>
    <th>属性</th>
    <th>类型</th>
    <th>说明</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>id</td>
    <td>
      <code>number</code>
    </td>
    <td>唯一聊天 ID。</td>
  </tr>

  <tr>
    <td>type</td>
    <td>
      <code>string</code>
    </td>
    <td>
      
      聊天类型。 值：      
 值：      
<ul>
        <li>
          <code>group</code>
        </li>
        <li>
          <code>supergroup</code>
        </li>
        <li>
          <code>channel</code>
        </li>
      </ul>
    </td>
  </tr>

  <tr>
    <td>title</td>
    <td>
      <code>string</code>
    </td>
    <td>聊天标题。</td>
  </tr>

  <tr>
    <td>photo_url</td>
    <td>
      <code>string</code>
    </td>
    <td>
      <i>可选</i>。 聊天照片链接。 照片可以是<code>.jpeg</code>和
      <code>.svg</code>格式。 只有通过附件 
      菜单打开的小程序才会返回。
    </td>
  </tr>

  <tr>
    <td>username</td>
    <td>
      <code>string</code>
    </td>
    <td>
      <i>可选</i>。 聊天用户登录。
    </td>
  </tr>
</tbody>
</table>

### User

描述用户或机器人的信息。

| 属性                                                                                      | 类型        | 说明                                                                        |
| --------------------------------------------------------------------------------------- | --------- | ------------------------------------------------------------------------- |
| added_to_attachment_menu | `boolean` | _可选_。 _可选_。 如果该用户在附件菜单中添加了机器人，则为 True。                                    |
| allows_write_to_pm       | `boolean` | _可选_。 _可选_。 如果该用户允许机器人向其发送信息，则为 "true"。                                   |
| is_premium                                                         | `boolean` | _可选_。 _可选_。 用户是否购买了 Telegram Premium。                                     |
| first_name                                                         | `string`  | 机器人或用户名。                                                                  |
| id                                                                                      | `number`  | 机器人或用户 ID。                                                                |
| is_bot                                                             | `boolean` | _可选_。 用户是否是机器人                                                            |
| last_name                                                          | `string`  | _可选_。 _可选_。 用户姓氏。                                                         |
| language_code                                                      | `string`  | _可选_。 _可选_。 [IETF](https://en.wikipedia.org/wiki/IETF_language_tag) 用户语言。 |
| photo_url                                                          | `string`  | _可选_。 用户或机器人照片的链接。 照片的格式可以是`.jpeg`和`.svg`。 只有通过附件菜单打开的小程序才会返回。            |
| username                                                                                | `string`  | _可选_。 _可选_。 机器人或用户的登录。                                                    |
