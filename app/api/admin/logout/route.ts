import { clearAdminSession } from "../../../admin-session";
import { isTrustedAdminOrigin } from "../../../admin-origin";

export async function POST(request: Request) {
  if (!isTrustedAdminOrigin(request)) return new Response("Invalid request origin", { status: 403 });
  await clearAdminSession();
  return new Response(null, { status: 303, headers: { location: "/admin/login" } });
}
