export async function onRequest(context) {
  const request = context.request;
  const url = new URL(request.url);

  url.hostname = "regruha-terminal-core.base44.app";

  return fetch(url.toString(), {
    method: request.method,
    headers: request.headers,
    body: request.method === "GET" || request.method === "HEAD" ? null : await request.clone().text(),
    redirect: "follow",
  });
}
