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

  // Проверяем, что это HTML-страница, а не запрос за картинкой/скриптом
  const contentType = res.headers.get("content-type") || "";
  if (!contentType.includes("text/html")) {
    return res;
  }

  return new HTMLRewriter()
    .on("head", {
      element(el) {
        el.prepend(`
          <style>
            /* Скрываем старые бейджи */
            #base44-badge, #base44-edit-badge { 
              display: none !important; 
            }

            /* Более мощный CSS-селектор: ищет кнопку, внутри которой есть "Continue with Google" */
            button:has(svg path[fill="#4285F4"]),
            /* Ищет div, содержащий внутри span с текстом "or" */
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

          <script>
            // На случай, если это SPA (React/Vue) и элементы рендерятся динамически:
            const hideElements = () => {
              // Ищем кнопку по тексту "Continue with Google"
              document.querySelectorAll('button').forEach(btn => {
                if (btn.innerText && btn.innerText.includes('Continue with Google')) {
                  btn.style.setProperty('display', 'none', 'important');
                }
              });
              // Ищем блок "or"
              document.querySelectorAll('div.uppercase span').forEach(span => {
                if (span.innerText === 'or') {
                  const parentDiv = span.closest('div.relative');
                  if (parentDiv) parentDiv.style.setProperty('display', 'none', 'important');
                }
              });
            };

            // Запускаем скрытие сразу и следим за изменениями на странице
            hideElements();
            const observer = new MutationObserver(hideElements);
            observer.observe(document.documentElement, { childList: true, subtree: true });
          </script>
        `, { html: true });
      },
    })
    .transform(res);
}
