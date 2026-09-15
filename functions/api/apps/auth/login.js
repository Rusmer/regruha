export async function onRequest(context) {
  const incoming = new URL(context.request.url);

  const base44 = new URL(
    "https://app.base44.com/api/apps/auth/login"
  );

  const appId = incoming.searchParams.get("app_id");

  if (!appId) {
    return new Response("Missing app_id", {
      status: 400,
    });
  }

  base44.searchParams.set("app_id", appId);

  base44.searchParams.set(
    "from_url",
    "https://regruha-terminal-core.base44.app/"
  );

  const response = await fetch(base44.toString(), {
    redirect: "manual",
  });

  const location = response.headers.get("Location");

  if (!location) {
    return new Response(
      "Base44 did not return OAuth redirect",
      {
        status: 502,
      }
    );
  }

  const google = new URL(location);

  const stateRaw = google.searchParams.get("state");

  if (!stateRaw) {
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

    );
  }

  try {
    const state = JSON.parse(stateRaw);

    state.domain =
      "https://regruha-terminal-core.base44.app";

    state.from_url =
      "https://regruha-terminal-core.base44.app/";

    google.searchParams.set(
      "state",
      JSON.stringify(state)
    );
  } catch (error) {
    return new Response(
      "Failed to modify OAuth state",
      {
        status: 500,
      }
    );
  }

  return Response.redirect(
    google.toString(),
    302
  );
}
