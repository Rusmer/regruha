export async function onRequest(context) {
  const incoming = new URL(context.request.url);

  const base44 = new URL(
    "https://app.base44.com/api/apps/auth/login"
  );

  // Передаём параметры в Base44
  base44.searchParams.set(
    "app_id",
    incoming.searchParams.get("app_id")
  );

  base44.searchParams.set(
    "from_url",
    "https://regruha-terminal-core.base44.app/"
  );

  // Запрашиваем OAuth redirect, но НЕ перенаправляем браузер сразу
  const response = await fetch(base44.toString(), {
    redirect: "manual",
  });

  const location = response.headers.get("Location");

  if (!location) {
    return new Response(
      await response.text(),
      {
        status: response.status,
        headers: response.headers,
      }
    );
  }

  const google = new URL(location);

  // Получаем state
  const stateRaw = google.searchParams.get("state");

  if (stateRaw) {
    try {
      const state = JSON.parse(stateRaw);

      // Самое главное изменение
      state.domain = "https://regruha-terminal-core.base44.app";

      // from_url тоже оставляем основным доменом
      state.from_url = "https://regruha-terminal-core.base44.app/";

      google.searchParams.set(
        "state",
        JSON.stringify(state)
      );
    } catch (e) {
      return new Response(
        "Failed to modify OAuth state: " + e.message,
        { status: 500 }
      );
    }
  }

  // Отправляем пользователя на Google
  return Response.redirect(
    google.toString(),
    302
  );
}
:::

### Что должно измениться

До:

```text
state={
  "domain":"https://regruha.pages.dev",
  "from_url":"https://regruha-terminal-core.base44.app/"
}


После Pages Function:

state={
  "domain":"https://regruha-terminal-core.base44.app",
  "from_url":"https://regruha-terminal-core.base44.app/"
}


Google получит уже второй вариант.

Но есть ещё один этап

Если это сработает, Google вернёт:

https://app.base44.com/api/apps/auth/callback?state=...


Base44 увидит:

domain = regruha-terminal-core.base44.app


и, если state не подписан, должен пропустить авторизацию.

Дальше Base44, вероятно, редиректнет на:

https://regruha-terminal-core.base44.app/


Вот этот последний redirect нам тоже придётся перехватить, чтобы вернуть пользователя на:

https://regruha.pages.dev/

Важное предупреждение

Ты сейчас прислал рабочие OAuth code в сообщениях:

code=4/0ATsM...


Это одноразовые авторизационные коды. Больше их сюда не присылай. Они обычно быстро протухают, но лучше считать их скомпрометированными.

Я бы сейчас попробовал именно этот вариант с перехватом Location. Если после него ошибка изменится — это уже очень хороший знак. Если снова будет Domain is not valid, значит Base44 дополнительно валидирует что-то ещё или state криптографически связывается с первоначальным запросом, и тогда будем смотреть следующий уровень.
