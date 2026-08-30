import { cookies } from "next/headers";

const cookieName = "phpaml_news_admin";
const encoder = new TextEncoder();
function secret() { return process.env.NEWS_ADMIN_SESSION_SECRET ?? ""; }
function bytesToBase64Url(bytes: Uint8Array) { let value = ""; for (const byte of bytes) value += String.fromCharCode(byte); return btoa(value).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); }
async function signature(payload: string) { const key = await crypto.subtle.importKey("raw", encoder.encode(secret()), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]); return bytesToBase64Url(new Uint8Array(await crypto.subtle.sign("HMAC", key, encoder.encode(payload)))); }
function safeEqual(left: string, right: string) { if (left.length !== right.length) return false; let difference = 0; for (let index = 0; index < left.length; index += 1) difference |= left.charCodeAt(index) ^ right.charCodeAt(index); return difference === 0; }
export async function passwordMatches(value: string) { const expected = process.env.NEWS_ADMIN_PASSWORD ?? ""; return expected.length >= 16 && safeEqual(await signature(`password:${value}`), await signature(`password:${expected}`)); }
export async function createAdminSession() { const expires = Math.floor(Date.now() / 1000) + 60 * 60 * 12, payload = `news-admin.${expires}`; return `${payload}.${await signature(payload)}`; }
export async function hasAdminSession() { if (!secret()) return false; const token = (await cookies()).get(cookieName)?.value ?? "", parts = token.split("."); if (parts.length !== 3 || parts[0] !== "news-admin" || Number(parts[1]) <= Date.now() / 1000) return false; return safeEqual(parts[2], await signature(`${parts[0]}.${parts[1]}`)); }
export async function setAdminSession(token: string) { (await cookies()).set(cookieName, token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: 60 * 60 * 12 }); }
export async function clearAdminSession() { (await cookies()).delete(cookieName); }
