# Авторизация пользователя

В этой статье приведены примеры кода на разных языках программирования, описывающие, как разработчик может авторизовать пользователя с помощью [данных инициализации](init-data.md) Telegram.

## Клиент

Прежде всего, необходимо начать с передачи данных инициализации с клиентской стороны на сервер. Мы можем сделать это с помощью этого кода:

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

Мы отправляем запрос на воображаемый сервер, используя URL `https://example.com/api`. Этот запрос использует метод HTTP POST
(вы можете использовать любой, который хотите) и добавляет заголовок `Authorization`, который здесь наиболее важен. Он представляет собой строку, содержащую 2 части, разделенные пробелом. Первая часть описывает метод авторизации (в этом случае наш сервер будет поддерживать несколько других), а вторая содержит данные авторизации. В случае мини-приложений Telegram, вторая часть - это необработанные данные для инициализации.

## Сервер

Теперь, когда данные инициализации передаются на серверную сторону, мы должны создать простой HTTP-сервер, который использует эти данные и авторизует пользователя.

### Node.js

В примере Node.js используется [express](https://www.npmjs.com/package/express) для обработки HTTP-запросов.

```typescript
import { validate, parse, type InitDataParsed } from '@telegram-apps/init-data-node';
import express, {
  type ErrorRequestHandler,
  type RequestHandler,
  type Response,
} from 'express';

/**
 * Устанавливает init data в указанный объект ответа.
 * @param res - Объект ответа.
 * @param initData - Init data.
 */
function setInitData(res: Response, initData: InitDataParsed): void {
  res.locals.initData = initData;
}

/**
 * Извлекает init data из объекта ответа.
 * @param res - Объект ответа.
 * @returns Init data, сохраненный в объекте ответа. Может вернуть undefined в случае,
 * если клиент не авторизован.
 */
function getInitData(res: Response): InitDataParsed | undefined {
  return res.locals.initData;
}

/**
 * Мидлварь, которая аутентифицирует внешнего клиента.
 * @param req - Объект запроса.
 * @param res - Объект ответа.
 * @param next - Функция для вызова следующего мидлваря.
 */
const authMiddleware: RequestHandler = (req, res, next) => {
  // Ожидаем передачи init data в заголовке Authorization в следующем формате:
  // <auth-type> <auth-data>
  // <auth-type> должно быть "tma", а <auth-data> — данные инициализации Telegram Mini Apps.
  const [authType, authData = ''] = (req.header('authorization') || '').split(' ');

  switch (authType) {
    case 'tma':
      try {
        // Проверяем init data.
        validate(authData, token, {
          // Рассматриваем подписку на init data как допустимую в течение одного часа с момента их создания.
          expiresIn: 3600,
        });

        // Парсим init data. Мы обязательно понадобимся им в будущем.
        setInitData(res, parse(authData));
        return next();
      } catch (e) {
        return next(e);
      }
    // ... другие методы аутентификации.
    default:
      return next(new Error('Unauthorized'));
  }
};

/**
 * Мидлварь, которая отображает данные инициализации пользователя.
 * @param _req
 * @param res - Объект ответа.
 * @param next - Функция для вызова следующего мидлваря.
 */
const showInitDataMiddleware: RequestHandler = (_req, res, next) => {
  const initData = getInitData(res);
  if (!initData) {
    return next(new Error('Cant display init data as long as it was not found'));
  }
  res.json(initData);
};

/**
 * Мидлварь, которая отображает данные инициализации пользователя.
 * @param err - Обработанный ошибкой.
 * @param _req
 * @param res - Объект ответа.
 */
const defaultErrorMiddleware: ErrorRequestHandler = (err, _req, res) => {
  res.status(500).json({
    error: err.message,
  });
};

// Ваш секретный токен бота.
const token = '1234567890:ABC';

// Создайте приложение Express и начните прослушивание порта 3000.
const app = express();

app.use(authMiddleware);
app.get('/', showInitDataMiddleware);
app.use(defaultErrorMiddleware);

app.listen(3000);

// После запуска HTTP-сервера попробуйте отправить HTTP GET запрос на URL 
// http://localhost:3000/ с заголовком Authorization, содержащим данные в требуемом формате.
```

### GoLang

В примере GoLang используется [gin](https://gin-gonic.com/) для обработки HTTP-запросов.

```go
package main

import (
	"context"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	initdata "github.com/telegram-mini-apps/init-data-golang"
)

type contextKey string

const (
	_initDataKey contextKey = "init-data"
)

// Возвращает новый контекст с указанными данными инициализации.
func withInitData(ctx context.Context, initData initdata.InitData) context.Context {
	return context.WithValue(ctx, _initDataKey, initData)
}

// Получает данные инициализации из указанного контекста.
func ctxInitData(ctx context.Context) (initdata.InitData, bool) {
	initData, ok := ctx.Value(_initDataKey).(initdata.InitData)
	return initData, ok
}

// Мидлварь для аутентификации внешнего клиента.
func authMiddleware(token string) gin.HandlerFunc {
	return func(context *gin.Context) {
		// Ожидаем передачи данных инициализации в заголовке Authorization в следующем формате:
		// <auth-type> <auth-data>
		// <auth-type> должно быть "tma", а <auth-data> — данные инициализации Telegram Mini Apps.
		authParts := strings.Split(context.GetHeader("authorization"), " ")
		if len(authParts) != 2 {
			context.AbortWithStatusJSON(401, map[string]any{
				"message": "Unauthorized",
			})
			return
		}

		authType := authParts[0]
		authData := authParts[1]

		switch authType {
		case "tma":
			// Проверяем данные инициализации. Мы считаем подпись данных инициализации действительной в течение одного часа с момента их создания.
			if err := initdata.Validate(authData, token, time.Hour); err != nil {
				context.AbortWithStatusJSON(401, map[string]any{
					"message": err.Error(),
				})
				return
			}

			// Парсим данные инициализации. Мы обязательно понадобимся им в будущем.
			initData, err := initdata.Parse(authData)
			if err != nil {
				context.AbortWithStatusJSON(500, map[string]any{
					"message": err.Error(),
				})
				return
			}

			context.Request = context.Request.WithContext(
				withInitData(context.Request.Context(), initData),
			)
		}
	}
}

// Мидлварь для отображения данных инициализации пользователя.
func showInitDataMiddleware(context *gin.Context) {
	initData, ok := ctxInitData(context.Request.Context())
	if !ok {
		context.AbortWithStatusJSON(401, map[string]any{
			"message": "Init data not found",
		})
		return
	}

	context.JSON(200, initData)
}

func main() {
	// Ваш секретный токен бота.
	token := "1234567890:ABC"

	r := gin.New()

	r.Use(authMiddleware(token))
	r.GET("/", showInitDataMiddleware)

	if err := r.Run(":3000"); err != nil {
		panic(err)
	}
}
```
