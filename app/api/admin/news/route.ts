import { getNewsAdmin } from "../../../admin-auth";
import { deleteNewsPost, listNewsPosts, saveNewsPost, type NewsPostInput } from "../../../news-store";

export const dynamic = "force-dynamic";

function sameOrigin(request: Request) {
  try {
    if (request.headers.get("x-phpaml-admin") === "news-editor") return true;
    if (request.headers.get("sec-fetch-site") === "same-origin") return true;
    const origin = new URL(request.headers.get("origin") ?? "");
    if (origin.origin === "https://phpaml.com") return true;
    const target = new URL(request.url);
    return ["localhost", "127.0.0.1"].includes(origin.hostname) && origin.host === target.host;
  } catch { return false; }
}

function clean(value: unknown, max: number) {
  return String(value ?? "").trim().slice(0, max);
}

export async function GET() {
  if (!await getNewsAdmin()) return Response.json({ error: "Unauthorized" }, { status: 401 });
  return Response.json({ posts: await listNewsPosts(true) });
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) return Response.json({ error: "Invalid request origin" }, { status: 403 });
  const user = await getNewsAdmin();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });
  if (Number(request.headers.get("content-length") ?? 0) > 250_000) return Response.json({ error: "Publication is too large" }, { status: 413 });
  const input = await request.json() as Partial<NewsPostInput>;
  const slug = clean(input.slug, 100).toLowerCase();
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return Response.json({ error: "Invalid slug" }, { status: 422 });
  const required = ["title_en", "summary_en", "content_en", "title_fr", "summary_fr", "content_fr"] as const;
  if (required.some((key) => !String(input[key] ?? "").trim())) return Response.json({ error: "Both languages are required" }, { status: 422 });
  try {
    await saveNewsPost({
      slug, status: input.status === "published" ? "published" : "draft",
      published_at: input.status === "published" ? (input.published_at || new Date().toISOString().slice(0, 10)) : null,
      version: clean(input.version, 60),
      title_en: clean(input.title_en, 180), summary_en: clean(input.summary_en, 600), content_en: clean(input.content_en, 100_000),
      title_fr: clean(input.title_fr, 180), summary_fr: clean(input.summary_fr, 600), content_fr: clean(input.content_fr, 100_000),
    }, user.email);
  } catch (error) {
    console.error("News publication storage failed", error);
    return Response.json({ error: "Publication storage is temporarily unavailable" }, { status: 503 });
  }
  return Response.json({ ok: true });
}

export async function DELETE(request: Request) {
  if (!sameOrigin(request)) return Response.json({ error: "Invalid request origin" }, { status: 403 });
  if (!await getNewsAdmin()) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const slug = new URL(request.url).searchParams.get("slug");
  if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return Response.json({ error: "Invalid slug" }, { status: 422 });
  await deleteNewsPost(slug);
  return Response.json({ ok: true });
}
