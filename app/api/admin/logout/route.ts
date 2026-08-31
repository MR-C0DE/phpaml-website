import { clearAdminSession } from "../../../admin-session";
export async function POST() { await clearAdminSession(); return new Response(null, { status: 303, headers: { location: "/admin/login" } }); }
