export async function onRequest(context) {
  const requestUrl = new URL(context.request.url);

  const target = new URL(
    "https://app.base44.com/api/apps/auth/login"
  );

  // Сохраняем app_id
  const appId = requestUrl.searchParams.get("app_id");

  if (appId) {
    target.searchParams.set("app_id", appId);
  }

  // ВСЕГДА используем основной домен Base44
  target.searchParams.set(
    "from_url",
    "https://regruha-terminal-core.base44.app/"
  );

  return Response.redirect(target.toString(), 302);
}
