export async function onRequest(context) {
  const request = context.request;
  const incomingUrl = new URL(request.url);
  const siteUrl = `${incomingUrl.protocol}//${incomingUrl.host}`;

  const image = "https://github.com/Rusmer/regruha/blob/main/functions/favicon.png?raw=true";
  const title = "Regruha — T-Regruha";
  const description = "Regruha / T-Regruha — официальный сайт проекта.";

  if (incomingUrl.pathname === "/google14337db78de6911c.html") {
    return new Response("google-site-verification: google14337db78de6911c.html", {
      headers: {
        "content-type": "text/html; charset=utf-8",
      },
    });
  }

  if (incomingUrl.pathname === "/robots.txt") {
    const body = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml`;

    return new Response(body, {
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "cache-control": "no-store, no-cache, must-revalidate, max-age=0",
      },
    });
  }

  if (incomingUrl.pathname === "/sitemap.xml") {
    const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
  </url>
</urlset>`;

    return new Response(body, {
      headers: {
        "content-type": "application/xml; charset=utf-8",
        "cache-control": "no-store, no-cache, must-revalidate, max-age=0",
      },
    });
  }

  const url = new URL(request.url);

  if (url.hostname === "regruha.pages.dev" && url.pathname.startsWith("/api/")) {
    url.hostname = "regruha-terminal-core.base44.app";
  }

  url.searchParams.set("v", "2");

  const response = await fetch(url.toString(), {
    method: request.method,
    headers: request.headers,
    body: request.method === "GET" || request.method === "HEAD" ? null : await request.clone().text(),
    redirect: "follow",
  });

  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("text/html")) return response;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Regruha",
    alternateName: "T-Regruha",
    url: `${siteUrl}/`,
    description,
  };

  const rewritten = new HTMLRewriter()
    .on('link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]', {
      element(el) {
        el.remove();
      },
    })
    .on("head", {
      element(el) {
        el.prepend(`
          <style>
            #base44-badge,
            #base44-edit-badge {
              display: none !important;
            }
          </style>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <meta name="google-site-verification" content="google14337db78de6911c.html">
          <title>${title}</title>
          <meta name="description" content="${description}">
          <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
          <meta name="googlebot" content="index, follow">
          <link rel="canonical" href="${siteUrl}/">
          <link rel="icon" type="image/png" href="${image}" sizes="32x32">
          <link rel="shortcut icon" href="${image}">
          <link rel="apple-touch-icon" href="${image}">
          <meta property="og:site_name" content="Regruha">
          <meta property="og:title" content="${title}">
          <meta property="og:description" content="${description}">
          <meta property="og:image" content="${image}">
          <meta property="og:type" content="website">
          <meta property="og:url" content="${siteUrl}/">
          <meta name="twitter:card" content="summary_large_image">
          <meta name="twitter:title" content="${title}">
          <meta name="twitter:description" content="${description}">
          <meta name="twitter:image" content="${image}">
          <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
        `, { html: true });
      },
    })
    .on("title", {
      element(el) {
        el.setInnerContent(title, { html: false });
      },
    })
    .transform(response);

  const newHeaders = new Headers(rewritten.headers);
  newHeaders.set("cache-control", "no-store, no-cache, must-revalidate, max-age=0");
  newHeaders.set("pragma", "no-cache");
  newHeaders.set("expires", "0");
  newHeaders.delete("x-robots-tag");

  return new Response(rewritten.body, {
    status: rewritten.status,
    statusText: rewritten.statusText,
    headers: newHeaders,
  });
}
