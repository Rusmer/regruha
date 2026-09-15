const debugHeaders = new Headers();

debugHeaders.set("content-type", "text/plain; charset=utf-8");

const setCookies = response.headers.get("set-cookie");

debugHeaders.set(
  "x-base44-set-cookie",
  setCookies || "NO SET-COOKIE"
);

return new Response(
  [
    "BASE44 LOCATION:",
    location,
    "",
    "BASE44 SET-COOKIE:",
    setCookies || "NO SET-COOKIE",
    "",
    "ORIGINAL STATE:",
    stateRaw,
    "",
    "MODIFIED STATE:",
    JSON.stringify(state),
  ].join("\n"),
  {
    status: 200,
    headers: debugHeaders,
  }
);
