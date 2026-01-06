export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  // ✅ 只保護後台路徑
  if (url.pathname.startsWith("/admin")) {
    const auth = request.headers.get("Authorization") || "";

    const user = env.ADMIN_USER || "";
    const pass = env.ADMIN_PASS || "";

    // Basic base64("user:pass")
    const expected = "Basic " + btoa(`${user}:${pass}`);

    if (auth !== expected) {
      return new Response("Auth required", {
        status: 401,
        headers: { "WWW-Authenticate": 'Basic realm="Admin"' },
      });
    }
  }

  return context.next();
}
