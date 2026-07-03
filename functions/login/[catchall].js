export async function onRequest(context) {
  const request = context.request;
  const url = new URL(request.url);
  url.hostname = "regruha-terminal-core.base44.app";

  const res = await fetch(url.toString(), {
    method: request.method,
    headers: request.headers,
    body: request.method === "GET" || request.method === "HEAD" ? null : await request.clone().text(),
    redirect: "follow",
  });

  return new HTMLRewriter()
    .on("head", {
      element(el) {
        el.prepend(`
          <style>
            #base44-badge,
            #base44-edit-badge,
            button.w-full.h-12.mb-6,
            div.relative.flex.justify-center.text-xs.uppercase {
              display: none !important;
            }
          </style>
        `, { html: true });
      },
    })
    .transform(res);
}
