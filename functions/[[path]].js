export default {
  async fetch(request, env) {
    return handleRequest(request, env);
  },
};

async function handleRequest(request, env) {
  return new Promise(async (resolve) => {
    const onRequest = async (request) => {
      const url = new URL(request.url);
      const country = request.headers.get('cf-ipcountry') || 'US';

      if (['RU', 'BY'].includes(country)) {
        return new Response(null, { status: 301, headers: { Location: 'https://regruha.vercel.app' } });
      }

      if (url.pathname === '/google14337db78de6911c.html') {
        return new Response('google-site-verification: google14337db78de6911c.html', { status: 200 });
      }

      if (url.pathname === '/robots.txt') {
        return new Response('User-agent: *\nDisallow:', { status: 200 });
      }

      if (url.pathname === '/sitemap.xml') {
        return new Response('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>', { status: 200 });
      }

      const backendUrl = `https://regruha-terminal-core.base44.app${url.pathname}${url.search}?v=2`;
      const backendResponse = await fetch(backendUrl, { method: request.method, headers: request.headers, body: request.body });
      const contentType = backendResponse.headers.get('content-type') || '';

      if (!contentType.includes('text/html')) {
        return backendResponse;
      }

      let html = await backendResponse.text();

      const rewriter = new HTMLRewriter()
        .on('meta', new MetaRemover())
        .on('link', new LinkRemover())
        .on('title', new TitleRemover())
        .on('textarea', new TextareaModifier())
        .on('head', new HeadInjector());

      const aprilFoolsScript = `
    <script>
      (function() {
        console.log('April Fools script loaded v7 - FIXED INTERCEPTORS');
        
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
              if (!text || text.length === 0) {
                console.log('FETCH: empty response');
                return new Response(text, {
                  status: response.status,
                  statusText: response.statusText,
                  headers: response.headers
                });
              }
              
              console.log('FETCH RESPONSE TEXT (first 200 chars):', text.substring(0, 200));
              
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
            if (self.readyState === 4 && self.responseText) {
              const text = self.responseText;
              if (text && text.length > 0) {
                console.log('XHR RESPONSE (first 200 chars):', text.substring(0, 200));
                
                if (text.includes('Regruha')) {
                  console.log('!!! FOUND Regruha IN XHR !!!', self._url);
                  self._originalResponseText = text.replace(/Regruha/g, 'Reeeeeeegruha');
                  self._responseModified = true;
                } else {
                  try {
                    const json = JSON.parse(text);
                    const modified = replaceInObject(json);
                    if (JSON.stringify(json) !== JSON.stringify(modified)) {
                      console.log('!!! REPLACED Regruha IN XHR JSON !!!', self._url);
                      self._originalResponseText = JSON.stringify(modified);
                      self._responseModified = true;
                    }
                  } catch (e) {
                    // не JSON
                  }
                }
              }
            }
            return originalOnreadystatechange?.apply(this, arguments);
          };
          
          Object.defineProperty(this, 'responseText', {
            get: function() {
              return this._responseModified ? this._originalResponseText : this._responseTextOriginal;
            }
          });
          
          Object.defineProperty(this, 'response', {
            get: function() {
              return this._responseModified ? this._originalResponseText : this._responseOriginal;
            }
          });
          
          const result = originalSend.apply(this, args);
          this._responseTextOriginal = this.responseText;
          this._responseOriginal = this.response;
          return result;
        };
        
        console.log('Interceptors v7 installed');
      })();
    </script>
  `;

      class HeadInjector {
        element(element) {
          element.append(aprilFoolsScript, { html: true });
        }
      }

      class MetaRemover {
        element(element) {
          const name = element.getAttribute('name');
          const property = element.getAttribute('property');
          if (['description', 'og:site_name', 'og:title', 'og:description', 'twitter:title', 'twitter:description'].includes(name || property)) {
            element.remove();
          }
        }
      }

      class LinkRemover {
        element(element) {
          const rel = element.getAttribute('rel');
          if (rel && rel.includes('canonical')) {
            element.remove();
          }
        }
      }

      class TitleRemover {
        element(element) {
          element.remove();
        }
      }

      class TextareaModifier {
        element(element) {
          element.setAttribute('placeholder', 'Напишите ответ...');
        }
      }

      const transformed = await rewriter.transform(new Response(html)).text();

      return new Response(transformed, {
        status: backendResponse.status,
        headers: { ...Object.fromEntries(backendResponse.headers), 'Content-Security-Policy': 'frame-ancestors *;' },
      });
    };

    return resolve(await onRequest(request));
  });
}
