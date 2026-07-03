export async function onRequest(context) {
  const req = context.request;
  const url = new URL(req.url);

  url.hostname = "regruha-terminal-core.base44.app";
  url.searchParams.set("from_url", "https://regruha-terminal-core.base44.app/");

  const headers = new Headers(req.headers);
  headers.set("host", "regruha-terminal-core.base44.app");
  headers.set("origin", "https://regruha-terminal-core.base44.app");
  headers.set("referer", "https://regruha-terminal-core.base44.app/");

  const res = await fetch(url.toString(), {
    method: req.method,
    headers,
    body: req.method === "GET" || req.method === "HEAD" ? null : await req.clone().text(),
    redirect: "manual",
  });

  const location = res.headers.get("location");
  if (location) return Response.redirect(location, 302);

  return res;
}
