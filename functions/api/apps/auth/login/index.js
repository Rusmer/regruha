export async function onRequest(context) {
  const req = context.request;
  const url = new URL(req.url);

  url.hostname = "regruha-terminal-core.base44.app";

  return fetch(url.toString(), {
    method: req.method,
    headers: req.headers,
    body: req.method === "GET" || req.method === "HEAD" ? null : await req.clone().text(),
    redirect: "follow",
  });
}
