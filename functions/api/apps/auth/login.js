export async function onRequest(context) {
  const url = new URL(context.request.url);

  const target = new URL(
    "https://app.base44.com/api/apps/auth/login"
  );

  target.searchParams.set(
    "app_id",
    "6a4429aec4d8855c752ea6b7"
  );

  target.searchParams.set(
    "from_url",
    "https://regruha-terminal-core.base44.app/"
  );

  return Response.redirect(target.toString(), 302);
}
