export function isTrustedAdminOrigin(request: Request): boolean {
  try {
    const origin = new URL(request.headers.get("origin") ?? "");
    const target = new URL(request.url);
    const configured = process.env.NEWS_ADMIN_ORIGIN?.trim();
    const expected = configured || (process.env.NODE_ENV === "production" ? "https://phpaml.com" : target.origin);
    return origin.origin === new URL(expected).origin;
  } catch {
    return false;
  }
}
