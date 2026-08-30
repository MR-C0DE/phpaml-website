import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getChatGPTUser, type ChatGPTUser } from "./chatgpt-auth";
import { hasAdminSession } from "./admin-session";

const returnTo = "/admin/news";

function allowedEmails() {
  return (process.env.NEWS_ADMIN_EMAILS ?? "").split(",").map((email) => email.trim().toLowerCase()).filter(Boolean);
}

async function isLocalRequest() {
  if (process.env.NODE_ENV === "production") return false;
  const host = (await headers()).get("host") ?? "";
  return host.startsWith("localhost:") || host.startsWith("127.0.0.1:");
}

export async function requireNewsAdmin(): Promise<ChatGPTUser> {
  if (await isLocalRequest()) return { userId: "local-admin", email: "admin@localhost", displayName: "Local admin", fullName: "Local admin" };
  const user = await getChatGPTUser();
  if (user && allowedEmails().includes(user.email.toLowerCase())) return user;
  if (await hasAdminSession()) return { userId: "news-admin", email: "admin@phpaml.com", displayName: "PHPAML Admin", fullName: "PHPAML Admin" };
  redirect(`/admin/login?return_to=${encodeURIComponent(returnTo)}`);
}

export async function getNewsAdmin(): Promise<ChatGPTUser | null> {
  if (await isLocalRequest()) return { userId: "local-admin", email: "admin@localhost", displayName: "Local admin", fullName: "Local admin" };
  const user = await getChatGPTUser();
  if (user && allowedEmails().includes(user.email.toLowerCase())) return user;
  return await hasAdminSession() ? { userId: "news-admin", email: "admin@phpaml.com", displayName: "PHPAML Admin", fullName: "PHPAML Admin" } : null;
}
