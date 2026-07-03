export async function onRequest(context) {
  const url = new URL(context.request.url);
  url.hostname = "regruha-terminal-core.base44.app";
  url.searchParams.set("from_url", "https://regruha-terminal-core.base44.app/");

  const res = await fetch(url.toString(), {
    method: context.request.method,
    headers: context.request.headers,
    body: null,
    redirect: "manual",
  });

  const location = res.headers.get("location");
  if (location) return Response.redirect(location, 302);

  return res;
}
