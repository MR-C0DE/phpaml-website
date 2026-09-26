import { getNewsAdmin } from "../../../admin-auth";
import { isTrustedAdminOrigin } from "../../../admin-origin";
import { deleteNewsPost, listNewsPosts, NewsStorageError, saveNewsPost, type NewsPostInput } from "../../../news-store";

export const dynamic = "force-dynamic";

function storageFailure(error: unknown) {
  if (error instanceof NewsStorageError) {
    console.error("News storage failure", {
      driver: error.driver,
      operation: error.operation,
      category: error.category,
      message: error.message,
      cause: error.cause instanceof Error ? error.cause.message : String(error.cause ?? ""),
    });
    return Response.json(
      { error: "Publication storage is temporarily unavailable", storage: error.driver },
      { status: error.category === "configuration" ? 500 : 503 },
    );
  }
  console.error("Unexpected news administration failure", error);
  return Response.json({ error: "Unexpected publication error" }, { status: 500 });
}

function clean(value: unknown, max: number) {
  return String(value ?? "").trim().slice(0, max);
}

function decodeContent(value: unknown, encoding: unknown) {
  const raw = String(value ?? "");
  if (encoding !== "base64") return raw;
  try { return Buffer.from(raw, "base64").toString("utf8"); }
  catch { return ""; }
}

export async function GET() {
  if (!await getNewsAdmin()) return Response.json({ error: "Unauthorized" }, { status: 401 });
  try {
    return Response.json({ posts: await listNewsPosts(true) });
  } catch (error) {
    return storageFailure(error);
  }
}

export async function POST(request: Request) {
  if (!isTrustedAdminOrigin(request)) return Response.json({ error: "Invalid request origin" }, { status: 403 });
  const user = await getNewsAdmin();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });
  if (Number(request.headers.get("content-length") ?? 0) > 250_000) return Response.json({ error: "Publication is too large" }, { status: 413 });
  const input = await request.json() as Partial<NewsPostInput> & { content_encoding?: string };
  input.content_en = decodeContent(input.content_en, input.content_encoding);
  input.content_fr = decodeContent(input.content_fr, input.content_encoding);
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
    return storageFailure(error);
  }
  return Response.json({ ok: true });
}

export async function DELETE(request: Request) {
  if (!isTrustedAdminOrigin(request)) return Response.json({ error: "Invalid request origin" }, { status: 403 });
  if (!await getNewsAdmin()) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const slug = new URL(request.url).searchParams.get("slug");
  if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return Response.json({ error: "Invalid slug" }, { status: 422 });
  try {
    await deleteNewsPost(slug);
    return Response.json({ ok: true });
  } catch (error) {
    return storageFailure(error);
  }
}
