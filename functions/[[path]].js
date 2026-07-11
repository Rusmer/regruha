export async function onRequest(context) {
  const request = context.request;

  const country = request.headers.get("CF-IPCountry");

  if (country === "RU" || country === "BY") {
    const redirectUrl = new URL(request.url);
    redirectUrl.hostname = "regruha.vercel.app";
    return Response.redirect(redirectUrl.toString(), 302);
  }

  const incomingUrl = new URL(request.url);
  const siteUrl = `${incomingUrl.protocol}//${incomingUrl.host}`;

  const image = "https://github.com/Rusmer/regruha/blob/main/functions/favicon.png?raw=true";
  const title = "Regruha — T-Regruha";
  const description = "Regruha / T-Regruha — официальный сайт проекта.";

  if (incomingUrl.pathname === "/google14337db78de6911c.html") {
    return new Response("google-site-verification: google14337db78de6911c.html", {
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }

  if (incomingUrl.pathname === "/robots.txt") {
    const body = `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml`;
    return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
  }

  if (incomingUrl.pathname === "/sitemap.xml") {
    const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${siteUrl}/</loc>\n    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>\n  </url>\n</urlset>`;
    return new Response(body, { headers: { "content-type": "application/xml; charset=utf-8" } });
  }

  if (incomingUrl.pathname.startsWith("/api/")) {
    return fetch(request);
  }

  const url = new URL(request.url);
  url.hostname = "regruha-terminal-core.base44.app";
  url.searchParams.set("v", "2");

  const response = await fetch(url.toString(), {
    method: request.method,
    headers: request.headers,
    body: request.method === "GET" || request.method === "HEAD" ? null : await request.clone().text(),
    redirect: "follow",
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Regruha",
    alternateName: "T-Regruha",
    url: `${siteUrl}/`,
    description,
  };

  const aprilFoolsScript = `
    <script>
      (function() {
        console.log('April Fools script loaded v6 - DEEP INTERCEPT');
        
        // Заменяем в мета-тегах
        document.querySelectorAll('meta').forEach(meta => {
          if (meta.content && meta.content.includes('Regruha')) {
            console.log('REPLACING in meta:', meta.getAttribute('name') || meta.getAttribute('property'));
            meta.content = meta.content.replace(/Regruha/g, 'Reeeeeeegruha');
          }
        });
        
        document.querySelectorAll('title').forEach(el => {
          if (el.textContent.includes('Regruha')) {
            console.log('REPLACING in title');
            el.textContent = el.textContent.replace(/Regruha/g, 'Reeeeeeegruha');
          }
        });
        
        // Глубокая замена в JSON объектах
        function replaceInObject(obj) {
          if (typeof obj === 'string') {
            return obj.replace(/Regruha/g, 'Reeeeeeegruha');
          }
          if (typeof obj === 'object' && obj !== null) {
            if (Array.isArray(obj)) {
              return obj.map(replaceInObject);
            }
            const result = {};
            for (const key in obj) {
              result[key] = replaceInObject(obj[key]);
            }
            return result;
          }
          return obj;
        }
        
        // Перехватываем fetch
        const originalFetch = window.fetch;
        window.fetch = function(...args) {
          const url = typeof args[0] === 'string' ? args[0] : args[0].url;
          console.log('FETCH CALLED:', url);
          
          return originalFetch.apply(this, args).then(response => {
            return response.clone().text().then(text => {
              console.log('FETCH RESPONSE TEXT (first 500 chars):', text.substring(0, 500));
              
              if (text.includes('Regruha')) {
                console.log('!!! FOUND Regruha IN FETCH RESPONSE !!!', url);
                const modified = text.replace(/Regruha/g, 'Reeeeeeegruha');
                return new Response(modified, {
                  status: response.status,
                  statusText: response.statusText,
                  headers: response.headers
                });
              }
              
              // Пробуем распарсить как JSON и заменить там
              try {
                const json = JSON.parse(text);
                const modified = replaceInObject(json);
                const hasChanged = JSON.stringify(json) !== JSON.stringify(modified);
                if (hasChanged) {
                  console.log('!!! REPLACED Regruha IN JSON !!!', url);
                  return new Response(JSON.stringify(modified), {
                    status: response.status,
                    statusText: response.statusText,
                    headers: response.headers
                  });
                }
              } catch (e) {
                // Не JSON, игнорируем
              }
              
              return new Response(text, {
                status: response.status,
                statusText: response.statusText,
                headers: response.headers
              });
            });
          }).catch(e => {
            console.log('FETCH ERROR:', e);
            throw e;
          });
        };
        
        // Перехватываем XMLHttpRequest
        const originalOpen = XMLHttpRequest.prototype.open;
        const originalSend = XMLHttpRequest.prototype.send;
        
        XMLHttpRequest.prototype.open = function(method, url, ...rest) {
          this._url = url;
          this._method = method;
          console.log('XHR OPEN:', method, url);
          return originalOpen.apply(this, [method, url, ...rest]);
        };
        
        XMLHttpRequest.prototype.send = function(...args) {
          const self = this;
          const originalOnreadystatechange = this.onreadystatechange;
          
          this.onreadystatechange = function() {
            if (self.readyState === 4) {
              console.log('XHR RESPONSE (first 500 chars):', self.responseText.substring(0, 500));
              
              if (self.responseText && self.responseText.includes('Regruha')) {
                console.log('!!! FOUND Regruha IN XHR !!!', self._url);
                self._originalResponseText = self.responseText.replace(/Regruha/g, 'Reeeeeeegruha');
              }
            }
            return originalOnreadystatechange?.apply(this, arguments);
          };
          
          Object.defineProperty(this, 'responseText', {
            get: function() {
              return this._originalResponseText !== undefined ? this._originalResponseText : this._responseText;
            }
          });
          
          const result = originalSend.apply(this, args);
          this._responseText = this.responseText;
          return result;
        };
        
        console.log('Deep interceptors installed');
      })();
    </script>
  `;

  const rewritten = new HTMLRewriter()
    .on('link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"], link[rel="canonical"], meta[name="description"]', {
      element(el) {
        el.remove();
      },
    })
    .on("title", {
      element(el) {
        el.remove();
      },
    })
    .on("textarea", {
      element(el) {
        el.setAttribute("placeholder", "Напишите ответ...");
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

            button:has(svg path[fill="#4285F4"]),
            div.uppercase:has(span) {
              display: none !important;
              opacity: 0 !important;
              visibility: hidden !important;
              pointer-events: none !important;
              height: 0 !important;
              margin: 0 !important;
              padding: 0 !important;
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
          ${aprilFoolsScript}
        `, { html: true });
      },
    })
    .transform(response);

  const newHeaders = new Headers(rewritten.headers);
  newHeaders.delete("x-robots-tag");
  newHeaders.delete("x-frame-options");
  newHeaders.delete("content-security-policy");
  newHeaders.set("content-security-policy", "frame-ancestors *;");

  return new Response(rewritten.body, {
    status: rewritten.status,
    statusText: rewritten.statusText,
    headers: newHeaders,
  });
}
