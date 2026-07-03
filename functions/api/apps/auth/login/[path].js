export async function onRequest(context) {
  const url = new URL(context.request.url);
  url.hostname = "regruha-terminal-core.base44.app";

  return Response.redirect(url.toString(), 302);
}
