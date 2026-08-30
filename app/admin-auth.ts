import { headers } from "next/headers";
import { getChatGPTUser, requireChatGPTUser, type ChatGPTUser } from "./chatgpt-auth";

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
  const user = await requireChatGPTUser(returnTo);
  if (!allowedEmails().includes(user.email.toLowerCase())) throw new Error("NEWS_ADMIN_FORBIDDEN");
  return user;
}

export async function getNewsAdmin(): Promise<ChatGPTUser | null> {
  if (await isLocalRequest()) return { userId: "local-admin", email: "admin@localhost", displayName: "Local admin", fullName: "Local admin" };
  const user = await getChatGPTUser();
  return user && allowedEmails().includes(user.email.toLowerCase()) ? user : null;
}
