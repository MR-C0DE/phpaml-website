import { newsPostsSchema, newsPostsStatusIndex } from "../db/schema";

type D1Result<T> = { results?: T[] };
type D1Statement = { bind(...values: unknown[]): D1Statement; run(): Promise<unknown>; all<T>(): Promise<D1Result<T>>; first<T>(): Promise<T | null> };
type D1Database = { prepare(sql: string): D1Statement; batch(statements: D1Statement[]): Promise<unknown> };
type MongoCollection = {
  createIndex(keys: Record<string, 1 | -1>, options?: { unique?: boolean }): Promise<unknown>;
  deleteOne(filter: Record<string, unknown>): Promise<unknown>;
  find(filter: Record<string, unknown>): { sort(keys: Record<string, 1 | -1>): { toArray(): Promise<unknown[]> } };
  findOne(filter: Record<string, unknown>): Promise<unknown | null>;
  updateOne(filter: Record<string, unknown>, update: Record<string, unknown>, options: { upsert: boolean }): Promise<unknown>;
};

export type StoredNewsPost = {
  id: number; slug: string; status: "draft" | "published"; published_at: string | null; version: string;
  title_en: string; summary_en: string; content_en: string; title_fr: string; summary_fr: string; content_fr: string;
  author_email: string; created_at: string; updated_at: string;
};

export type NewsPostInput = Omit<StoredNewsPost, "id" | "author_email" | "created_at" | "updated_at">;

async function db(): Promise<D1Database> {
  const runtimeImport = Function("specifier", "return import(specifier)") as (specifier: string) => Promise<{ env?: { DB?: D1Database } }>;
  const runtime = await runtimeImport("cloudflare:workers");
  if (!runtime.env?.DB) throw new Error("D1 binding DB is unavailable");
  return runtime.env.DB;
}

async function ready() {
  const database = await db();
  await database.batch([database.prepare(newsPostsSchema), database.prepare(newsPostsStatusIndex)]);
  return database;
}

type FileApi = {
  mkdir(path: string, options: { recursive: boolean }): Promise<void>;
  readFile(path: string, encoding: string): Promise<string>;
  rename(oldPath: string, newPath: string): Promise<void>;
  writeFile(path: string, data: string, encoding: string): Promise<void>;
};

let fileQueue: Promise<void> = Promise.resolve();
let mongoCollection: Promise<MongoCollection | null> | null = null;

async function mongoReady(): Promise<MongoCollection | null> {
  const uri = process.env.NEWS_MONGODB_URI;
  if (!uri) return null;
  mongoCollection ??= (async () => {
    const { MongoClient } = await import("mongodb");
    const client = new MongoClient(uri);
    await client.connect();
    const collection = client.db(process.env.NEWS_MONGODB_DATABASE || "phpaml_news").collection("news_posts");
    await Promise.all([
      collection.createIndex({ slug: 1 }, { unique: true }),
      collection.createIndex({ status: 1, published_at: -1 }),
    ]);
    return collection;
  })();
  return mongoCollection;
}

async function mongoWrite(operation: (collection: MongoCollection) => Promise<void>) {
  let collection = await mongoReady();
  if (!collection) return false;
  try {
    await operation(collection);
  } catch {
    // Persistent Node processes may retain a pool that Atlas has already closed.
    // Recreate it once so an editor action does not fail until the next deploy.
    mongoCollection = null;
    collection = await mongoReady();
    if (!collection) return false;
    await operation(collection);
  }
  return true;
}

function fromMongo(document: unknown): StoredNewsPost {
  const { _id: _ignored, ...post } = document as StoredNewsPost & { _id?: unknown };
  void _ignored;
  return post as StoredNewsPost;
}

async function fileStorage() {
  const runtimeImport = Function("specifier", "return import(specifier)") as (specifier: string) => Promise<unknown>;
  const [fs, path] = await Promise.all([runtimeImport("node:fs/promises"), runtimeImport("node:path")]) as [FileApi, { dirname(path: string): string; join(...parts: string[]): string }];
  const filename = process.env.NEWS_STORAGE_FILE || path.join(process.cwd(), "runtime", "news-posts.json");
  return { fs, path, filename };
}

async function readFilePosts(): Promise<StoredNewsPost[]> {
  const { fs, filename } = await fileStorage();
  try { return JSON.parse(await fs.readFile(filename, "utf8")) as StoredNewsPost[]; }
  catch { return []; }
}

async function writeFilePosts(posts: StoredNewsPost[]) {
  const { fs, path, filename } = await fileStorage();
  await fs.mkdir(path.dirname(filename), { recursive: true });
  const temporary = `${filename}.${Date.now()}.tmp`;
  await fs.writeFile(temporary, JSON.stringify(posts, null, 2), "utf8");
  await fs.rename(temporary, filename);
}

async function withFileLock(operation: () => Promise<void>) {
  const next = fileQueue.then(operation, operation);
  fileQueue = next.catch(() => undefined);
  await next;
}

export async function listNewsPosts(includeDrafts = false): Promise<StoredNewsPost[]> {
  try {
    const database = await ready();
    const where = includeDrafts ? "" : "WHERE status = 'published'";
    const result = await database.prepare(`SELECT * FROM news_posts ${where} ORDER BY COALESCE(published_at, updated_at) DESC`).all<StoredNewsPost>();
    return result.results ?? [];
  } catch {
    const mongo = await mongoReady();
    if (mongo) {
      const rows = await mongo.find(includeDrafts ? {} : { status: "published" }).sort({ published_at: -1, updated_at: -1 }).toArray();
      return rows.map(fromMongo);
    }
    const posts = await readFilePosts();
    return posts.filter((post) => includeDrafts || post.status === "published").sort((a, b) => (b.published_at ?? b.updated_at).localeCompare(a.published_at ?? a.updated_at));
  }
}

export async function findNewsPost(slug: string, includeDrafts = false): Promise<StoredNewsPost | null> {
  try {
    const database = await ready();
    return database.prepare(`SELECT * FROM news_posts WHERE slug = ? ${includeDrafts ? "" : "AND status = 'published'"} LIMIT 1`).bind(slug).first<StoredNewsPost>();
  } catch {
    const mongo = await mongoReady();
    if (mongo) {
      const row = await mongo.findOne(includeDrafts ? { slug } : { slug, status: "published" });
      return row ? fromMongo(row) : null;
    }
    return (await readFilePosts()).find((post) => post.slug === slug && (includeDrafts || post.status === "published")) ?? null;
  }
}

export async function saveNewsPost(input: NewsPostInput, authorEmail: string): Promise<void> {
  try {
    const database = await ready();
    await database.prepare(`INSERT INTO news_posts (slug,status,published_at,version,title_en,summary_en,content_en,title_fr,summary_fr,content_fr,author_email,updated_at)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,CURRENT_TIMESTAMP)
      ON CONFLICT(slug) DO UPDATE SET status=excluded.status,published_at=excluded.published_at,version=excluded.version,title_en=excluded.title_en,summary_en=excluded.summary_en,content_en=excluded.content_en,title_fr=excluded.title_fr,summary_fr=excluded.summary_fr,content_fr=excluded.content_fr,author_email=excluded.author_email,updated_at=CURRENT_TIMESTAMP`)
      .bind(input.slug, input.status, input.published_at, input.version, input.title_en, input.summary_en, input.content_en, input.title_fr, input.summary_fr, input.content_fr, authorEmail).run();
  } catch {
    const now = new Date().toISOString();
    if (await mongoWrite(async (mongo) => {
      await mongo.updateOne(
        { slug: input.slug },
        { $set: { ...input, author_email: authorEmail, updated_at: now }, $setOnInsert: { id: Date.now(), created_at: now } },
        { upsert: true },
      );
    })) return;
    await withFileLock(async () => {
      const posts = await readFilePosts(), index = posts.findIndex((post) => post.slug === input.slug), now = new Date().toISOString();
      const post: StoredNewsPost = { ...input, id: index >= 0 ? posts[index].id : Math.max(0, ...posts.map((item) => item.id)) + 1, author_email: authorEmail, created_at: index >= 0 ? posts[index].created_at : now, updated_at: now };
      if (index >= 0) posts[index] = post; else posts.push(post);
      await writeFilePosts(posts);
    });
  }
}

export async function deleteNewsPost(slug: string): Promise<void> {
  try {
    const database = await ready();
    await database.prepare("DELETE FROM news_posts WHERE slug = ?").bind(slug).run();
  } catch {
    const mongo = await mongoReady();
    if (mongo) { await mongo.deleteOne({ slug }); return; }
    await withFileLock(async () => writeFilePosts((await readFilePosts()).filter((post) => post.slug !== slug)));
  }
}
