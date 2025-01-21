# init-data-golang

Пакет, предоставляющий утилиты для работы с [данными инициализации](../platform/launch-parameters.md) мини-приложений Telegram.

## Установка

```bash
go get github.com/telegram-mini-apps/init-data-golang
```

## Проверка

Если время истечения срока действия установлено на `0`, функция пропустит проверку времени истечения срока действия. Однако рекомендуется указать ненулевое значение, поскольку эта проверка считается важной для предотвращения использования устаревших данных инициализации.

```go
package main

import (
	"fmt"
	"time"

	initdata "github.com/telegram-mini-apps/init-data-golang"
)

func main() {
	// Инициализирует данные в необработанном формате.
	initData := "user=%7B%22id%22%3A279058397%2C%22first_name%22%3A%22Vladislav%20%2B%20-%20%3F%20%5C%2F%22%2C%22last_name%22%3A%22Kibenko%22%2C%22username%22%3A%22vdkfrost%22%2C%22language_code%22%3A%22ru%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2F4FPEE4tmP3ATHa57u6MqTDih13LTOiMoKoLDRG4PnSA.svg%22%7D&chat_instance=8134722200314281151&chat_type=private&auth_date=1733509682&signature=TYJxVcisqbWjtodPepiJ6ghziUL94-KNpG8Pau-X7oNNLNBM72APCpi_RKiUlBvcqo5L-LAxIc3dnTzcZX_PDg&hash=a433d8f9847bd6addcc563bff7cc82c89e97ea0d90c11fe5729cae6796a36d73"

	// Секретный ключ бота Telegram.
	token := "7342037359:AAHI25ES9xCOMPokpYoz-p8XVrZUdygo2J4"

	// Определите, насколько долго с момента генерации данных инициализации данные остаются корректными.
	expIn := 24 * time.Hour

	// Вернёт ошибку, если данные инициализации некоррректны.
	fmt.Println(initdata.Validate(initData, token, expIn))
}

```

### Сторонняя проверка

Пакет позволяет проверять данные инициализации, чтобы проверить, подписаны ли они Telegram.

Для этого вызовите функцию `ValidateThirdParty` со следующими аргументами:

- `initData: string`: данные инициализации в необработанном формате.
- `botID: int64`: идентификатор бота Telegram для данных инициализации.
- `expIn: time.Time`: максимальное время жизни данных инициализации.

Пример использования:

```go
package main

import (
	"fmt"
	"time"

	initdata "github.com/telegram-mini-apps/init-data-golang"
)

func main() {
	// Данные инициализации в необработанном формате.
	initData := "user=%7B%22id%22%3A279058397%2C%22first_name%22%3A%22Vladislav%20%2B%20-%20%3F%20%5C%2F%22%2C%22last_name%22%3A%22Kibenko%22%2C%22username%22%3A%22vdkfrost%22%2C%22language_code%22%3A%22ru%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2F4FPEE4tmP3ATHa57u6MqTDih13LTOiMoKoLDRG4PnSA.svg%22%7D&chat_instance=8134722200314281151&chat_type=private&auth_date=1733584787&hash=2174df5b000556d044f3f020384e879c8efcab55ddea2ced4eb752e93e7080d6&signature=zL-ucjNyREiHDE8aihFwpfR9aggP2xiAo3NSpfe-p7IbCisNlDKlo7Kb6G4D0Ao2mBrSgEk4maLSdv6MLIlADQ"

	// Секретный ключ бота Telegram.
	var botID int64 = 7342037359

	// Определите, насколько долго с момента генерации данных инициализации, данные остаются корректными.
	expIn := 24 * time.Hour

	// Вернёт ошибку, если данные инициализации некорректны.
	fmt.Println(initdata.ValidateThirdParty(initData, botID, expIn))
}
```

Вы также можете использовать функцию `ValidateThirdPartyWithEnv` с дополнительным логическим аргументом, отвечающим за маркировку среды как тестовой.

## Анализ

Важно отметить, что функция `Parse` не выполняет те же проверки, что и функция `Validate`. Поэтому эта функция анализирует только входящие данные, не проводя проверки на хэш или время истечения срока действия.

```go
package main

import (
	"fmt"

	initdata "github.com/telegram-mini-apps/init-data-golang"
)

func main() {
	// Данные инициализации в необработанном формате.
	initData := "user=%7B%22id%22%3A279058397%2C%22first_name%22%3A%22Vladislav%20%2B%20-%20%3F%20%5C%2F%22%2C%22last_name%22%3A%22Kibenko%22%2C%22username%22%3A%22vdkfrost%22%2C%22language_code%22%3A%22ru%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2F4FPEE4tmP3ATHa57u6MqTDih13LTOiMoKoLDRG4PnSA.svg%22%7D&chat_instance=8134722200314281151&chat_type=private&auth_date=1733509682&signature=TYJxVcisqbWjtodPepiJ6ghziUL94-KNpG8Pau-X7oNNLNBM72APCpi_RKiUlBvcqo5L-LAxIc3dnTzcZX_PDg&hash=a433d8f9847bd6addcc563bff7cc82c89e97ea0d90c11fe5729cae6796a36d73"

	// Вернёт 2 значения.
	// 1. Экземпляр InitData, если переданные данные имеют правильный формат.
	// 2. Ошибка в случае, если что-то не так. 
	fmt.Println(initdata.Parse(initData))
}

```

## Подписание

Функции, которые подписывают данные, удаляют такие параметры, как `hash` и `auth_date`, поскольку предполагается, что `hash` будет возвращен функцией, а `auth_date` будет установлена ​​самой функцией.

```go
package main

import (
	"fmt"
	"time"

	initdata "github.com/telegram-mini-apps/init-data-golang"
)

func main() {
	// Инициализация данных в необработанном формате.
	initData := "user=%7B%22id%22%3A279058397%2C%22first_name%22%3A%22Vladislav%20%2B%20-%20%3F%20%5C%2F%22%2C%22last_name%22%3A%22Kibenko%22%2C%22username%22%3A%22vdkfrost%22%2C%22language_code%22%3A%22ru%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2F4FPEE4tmP3ATHa57u6MqTDih13LTOiMoKoLDRG4PnSA.svg%22%7D&chat_instance=8134722200314281151&chat_type=private&auth_date=1733509682&signature=TYJxVcisqbWjtodPepiJ6ghziUL94-KNpG8Pau-X7oNNLNBM72APCpi_RKiUlBvcqo5L-LAxIc3dnTzcZX_PDg&hash=a433d8f9847bd6addcc563bff7cc82c89e97ea0d90c11fe5729cae6796a36d73"

	// Секретный ключ бота Telegram.
	token := "7342037359:AAHI25ES9xCOMPokpYoz-p8XVrZUdygo2J4"

	// Время подписания.
	// Здесь мы взяли значение из переменной initData выше
 	// (параметр запроса auth_date).
	authDate := time.Unix(1733509682, 0)

	// Подписание параметров запроса.
	// Возвращаемые значения:
	// 1. Результат подписи параметров ("hash" свойства данных инициализации).
	// 2. Ошибка, возникающая при анализе строки запроса как параметров запроса.
	fmt.Println(initdata.SignQueryString(initData, token, authDate))

	// Подписание тех же параметров запроса, представленных в виде карты.
	fmt.Println(initdata.Sign(map[string]string{
		"user":          "{\"id\":279058397,\"first_name\":\"Vladislav + - ? \\/\",\"last_name\":\"Kibenko\",\"username\":\"vdkfrost\",\"language_code\":\"ru\",\"is_premium\":true,\"allows_write_to_pm\":true,\"photo_url\":\"https:\\/\\/t.me\\/i\\/userpic\\/320\\/4FPEE4tmP3ATHa57u6MqTDih13LTOiMoKoLDRG4PnSA.svg\"}",
		"chat_instance": "8134722200314281151",
		"chat_type":     "private",
		"signature":     "TYJxVcisqbWjtodPepiJ6ghziUL94-KNpG8Pau-X7oNNLNBM72APCpi_RKiUlBvcqo5L-LAxIc3dnTzcZX_PDg",
	}, token, authDate))

	// В консоли вы должны увидеть те же результаты.
}

```

## GoDoc

Чтобы ознакомиться с документацией по GoDoc,
перейдите по [этой ссылке](https://pkg.go.dev/github.com/telegram-mini-apps/init-data-golang).
