import { newsPostsSchema, newsPostsStatusIndex } from "../db/schema";

type D1Result<T> = { results?: T[] };
type D1Statement = { bind(...values: unknown[]): D1Statement; run(): Promise<unknown>; all<T>(): Promise<D1Result<T>>; first<T>(): Promise<T | null> };
type D1Database = { prepare(sql: string): D1Statement; batch(statements: D1Statement[]): Promise<unknown> };

export type StoredNewsPost = {
  id: number; slug: string; status: "draft" | "published"; published_at: string | null; version: string;
  title_en: string; summary_en: string; content_en: string; title_fr: string; summary_fr: string; content_fr: string;
  author_email: string; created_at: string; updated_at: string;
};

export type NewsPostInput = Omit<StoredNewsPost, "id" | "author_email" | "created_at" | "updated_at">;

async function db(): Promise<D1Database> {
  const runtime = await import("cloudflare:workers") as unknown as { env: { DB?: D1Database } };
  if (!runtime.env.DB) throw new Error("D1 binding DB is unavailable");
  return runtime.env.DB;
}

async function ready() {
  const database = await db();
  await database.batch([database.prepare(newsPostsSchema), database.prepare(newsPostsStatusIndex)]);
  return database;
}

export async function listNewsPosts(includeDrafts = false): Promise<StoredNewsPost[]> {
  const database = await ready();
  const where = includeDrafts ? "" : "WHERE status = 'published'";
  const result = await database.prepare(`SELECT * FROM news_posts ${where} ORDER BY COALESCE(published_at, updated_at) DESC`).all<StoredNewsPost>();
  return result.results ?? [];
}

export async function findNewsPost(slug: string, includeDrafts = false): Promise<StoredNewsPost | null> {
  const database = await ready();
  return database.prepare(`SELECT * FROM news_posts WHERE slug = ? ${includeDrafts ? "" : "AND status = 'published'"} LIMIT 1`).bind(slug).first<StoredNewsPost>();
}

export async function saveNewsPost(input: NewsPostInput, authorEmail: string): Promise<void> {
  const database = await ready();
  await database.prepare(`INSERT INTO news_posts (slug,status,published_at,version,title_en,summary_en,content_en,title_fr,summary_fr,content_fr,author_email,updated_at)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,CURRENT_TIMESTAMP)
    ON CONFLICT(slug) DO UPDATE SET status=excluded.status,published_at=excluded.published_at,version=excluded.version,title_en=excluded.title_en,summary_en=excluded.summary_en,content_en=excluded.content_en,title_fr=excluded.title_fr,summary_fr=excluded.summary_fr,content_fr=excluded.content_fr,author_email=excluded.author_email,updated_at=CURRENT_TIMESTAMP`)
    .bind(input.slug, input.status, input.published_at, input.version, input.title_en, input.summary_en, input.content_en, input.title_fr, input.summary_fr, input.content_fr, authorEmail).run();
}

export async function deleteNewsPost(slug: string): Promise<void> {
  const database = await ready();
  await database.prepare("DELETE FROM news_posts WHERE slug = ?").bind(slug).run();
}
