export async function onRequest(context) {
  const url = new URL(context.request.url);

  url.hostname = "regruha-terminal-core.base44.app";
  url.searchParams.set("from_url", "https://regruha-terminal-core.base44.app/");

  return fetch(url.toString(), {
    method: context.request.method,
    headers: context.request.headers,
    body: context.request.method === "GET" || context.request.method === "HEAD"
      ? null
      : await context.request.clone().text(),
    redirect: "manual",
  });
}
