export async function onRequest(context) {
  const request = context.request;
  const url = new URL(request.url);

  url.hostname = "regruha-terminal-core.base44.app";

  const res = await fetch(url, {
    method: request.method,
    headers: request.headers,
    body: request.method === "GET" || request.method === "HEAD"
      ? undefined
      : request.body,
    redirect: "manual",
  });

  return new HTMLRewriter()
    .on("head", {
      element(el) {
        el.prepend(`
          <style>
            #base44-badge,
            #base44-edit-badge {
              display: none !important;
            }
          </style>
        `, { html: true });
      },
    })
    .transform(res);
}
