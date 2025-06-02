# init-data-golang

该软件包提供用于处理 Telegram 迷你应用程序初始化数据的实用程序。 要了解
有关初始化数据及其用法的更多信息，请参阅
[文档](../platform/launch-parameters.md).

## 安装

```bash
go get github.com/telegram-mini-apps/init-data-golang
```

## 验证

如果过期时间设置为 `0`，函数将跳过过期时间检查。 不过，建议指定一个非零值，因为这一检查对于防止
使用被盗的旧初始化数据非常重要。 不过，
，建议指定一个非零值，因为这一检查对于防止
使用被盗的旧初始化数据非常重要。

```go
package main

import (
	"fmt"
	"github.com/Telegram-Mini-Apps/init-data-golang"
	"time"
)

func main() {
	// Init data in raw format.
	initData := "query_id=AAHdF6IQAAAAAN0XohDhrOrc&..."

	// Telegram Bot secret key.
	token := "627618978:amnnncjocxKJf"

	// Define how long since init data generation date init data is valid.
	expIn := 24 * time.Hour

	// Will return error in case, init data is invalid. To see,
	// which error could be returned, see errors.go file.
	fmt.Println(initdata.Validate(initData, token, expIn))
}
```

### Third-Party Validation

The package allows validating init data to check if it was signed by Telegram.

To do so, call the `ValidateThirdParty` function with the following arguments:

- `initData: string`: Init data in raw format.
- `botID: int64`: The Telegram Bot issuer identifier for the init data.
- `expIn: time.Time`: The maximum lifetime of the init data.

Here is an example:

```go
package main

import (
	"fmt"
	"github.com/Telegram-Mini-Apps/init-data-golang"
	"time"
)

func main() {
	// Init data in raw format.
	initData := "query_id=AAHdF6IQAAAAAN0XohDhrOrc&..."

	// Telegram Bot secret key.
	token := "627618978:amnnncjocxKJf"

	// Signing timestamp.
	authDate := time.Now()

	// The first value is parameters sign result ("hash" init data property).
	// The second one is error which could occur while parsing query string as
	// query parameters.
	fmt.Println(initdata.SignQueryString(initData, token, authDate))
	// or
	fmt.Println(initdata.Sign(map[string]string{
		"query_id": "AAHdF6IQAAAAAN0XohDhrOrc",
		// ...
	}, token, authDate))
}
```

You can also use the `ValidateThirdPartyWithEnv` function with the additional boolean
argument responsible for marking the environment as the testing one.

## 解析

需要注意的是，`Parse` 函数不会执行与 `Validate` 函数相同的检查。 因此，该函数只对输入数据进行解析，而不对
哈希值或过期时间进行验证。 因此，该函数只对输入数据进行解析，而不对
哈希值或过期时间进行验证。

```go
package main

import (
    "fmt"
    "github.com/Telegram-Mini-Apps/init-data-golang"
)

func main() {
	// Init data in raw format.
	initData := "query_id=AAHdF6IQAAAAAN0XohDhrOrc&..."
	
	// Will return 2 values.
	// 1. Pointer to InitData in case, passed data has correct format.
	// 2. Error in case, something is wrong. 
	fmt.Println(initdata.Parse(initData))
}
```

## 签名

签署数据的函数会删除`hash`和`auth_date`等参数，因为假定
，`hash`将由函数返回，`auth_date`将由函数
本身设置。

```go
package main

import (
	"fmt"
	"time"

	initdata "github.com/telegram-mini-apps/init-data-golang"
)

func main() {
	// Init data in raw format.
	initData := "user=%7B%22id%22%3A279058397%2C%22first_name%22%3A%22Vladislav%20%2B%20-%20%3F%20%5C%2F%22%2C%22last_name%22%3A%22Kibenko%22%2C%22username%22%3A%22vdkfrost%22%2C%22language_code%22%3A%22ru%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2F4FPEE4tmP3ATHa57u6MqTDih13LTOiMoKoLDRG4PnSA.svg%22%7D&chat_instance=8134722200314281151&chat_type=private&auth_date=1733509682&signature=TYJxVcisqbWjtodPepiJ6ghziUL94-KNpG8Pau-X7oNNLNBM72APCpi_RKiUlBvcqo5L-LAxIc3dnTzcZX_PDg&hash=a433d8f9847bd6addcc563bff7cc82c89e97ea0d90c11fe5729cae6796a36d73"

	// Telegram Bot secret key.
	token := "7342037359:AAHI25ES9xCOMPokpYoz-p8XVrZUdygo2J4"

	// Signing timestamp.
	// Here we took the value from the initData variable
	// above (auth_date query parameter).
	authDate := time.Unix(1733509682, 0)

	// Signing query parameters.
	// Returned values:
	// 1. Parameters sign result ("hash" init data property).
	// 2. Error occurring while parsing query string as query parameters.
	fmt.Println(initdata.SignQueryString(initData, token, authDate))

	// Signing the same query parameters presented as a map.
	fmt.Println(initdata.Sign(map[string]string{
		"user":          "{\"id\":279058397,\"first_name\":\"Vladislav + - ? \\/\",\"last_name\":\"Kibenko\",\"username\":\"vdkfrost\",\"language_code\":\"ru\",\"is_premium\":true,\"allows_write_to_pm\":true,\"photo_url\":\"https:\\/\\/t.me\\/i\\/userpic\\/320\\/4FPEE4tmP3ATHa57u6MqTDih13LTOiMoKoLDRG4PnSA.svg\"}",
		"chat_instance": "8134722200314281151",
		"chat_type":     "private",
		"signature":     "TYJxVcisqbWjtodPepiJ6ghziUL94-KNpG8Pau-X7oNNLNBM72APCpi_RKiUlBvcqo5L-LAxIc3dnTzcZX_PDg",
	}, token, authDate))

	// In the console, you should see the same results.
}

```

## GoDoc

要查看 GoDoc 文档，请访问 [此链接](https://pkg.go.dev/github.com/telegram-mini-apps/init-data-golang)。