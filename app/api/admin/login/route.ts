import { createAdminSession, passwordMatches, setAdminSession } from "../../../admin-session";
import { isTrustedAdminOrigin } from "../../../admin-origin";
const attempts = new Map<string, { count: number; reset: number }>();
function safeReturnTo(value: FormDataEntryValue | null) { const path = String(value ?? "/admin/news"); return path.startsWith("/admin/") && !path.startsWith("//") ? path : "/admin/news"; }
function redirect(path: string) { return new Response(null, { status: 303, headers: { location: path } }); }
export async function POST(request: Request) {
  if (!isTrustedAdminOrigin(request)) return new Response("Invalid request origin", { status: 403 });
  const client = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown", now = Date.now(), current = attempts.get(client);
  if (current && current.reset > now && current.count >= 5) return new Response("Too many attempts", { status: 429 });
  const form = await request.formData(), returnTo = safeReturnTo(form.get("return_to"));
  if (!await passwordMatches(String(form.get("password") ?? ""))) { attempts.set(client, current && current.reset > now ? { ...current, count: current.count + 1 } : { count: 1, reset: now + 15 * 60_000 }); return redirect(`/admin/login?error=1&return_to=${encodeURIComponent(returnTo)}`); }
  attempts.delete(client); await setAdminSession(await createAdminSession()); return redirect(returnTo);
}
