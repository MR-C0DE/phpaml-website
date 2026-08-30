import { createAdminSession, passwordMatches, setAdminSession } from "../../../admin-session";
const attempts = new Map<string, { count: number; reset: number }>();
function safeReturnTo(value: FormDataEntryValue | null) { const path = String(value ?? "/admin/news"); return path.startsWith("/admin/") && !path.startsWith("//") ? path : "/admin/news"; }
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin) return new Response("Invalid request origin", { status: 403 });
  const client = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown", now = Date.now(), current = attempts.get(client);
  if (current && current.reset > now && current.count >= 5) return new Response("Too many attempts", { status: 429 });
  const form = await request.formData(), returnTo = safeReturnTo(form.get("return_to"));
  if (!await passwordMatches(String(form.get("password") ?? ""))) { attempts.set(client, current && current.reset > now ? { ...current, count: current.count + 1 } : { count: 1, reset: now + 15 * 60_000 }); return Response.redirect(new URL(`/admin/login?error=1&return_to=${encodeURIComponent(returnTo)}`, request.url), 303); }
  attempts.delete(client); await setAdminSession(await createAdminSession()); return Response.redirect(new URL(returnTo, request.url), 303);
}
