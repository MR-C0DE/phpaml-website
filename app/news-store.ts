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
type FileHandle = { close(): Promise<void> };
type FileApi = {
  mkdir(path: string, options: { recursive: boolean }): Promise<void>;
  open(path: string, flags: string): Promise<FileHandle>;
  readFile(path: string, encoding: string): Promise<string>;
  rename(oldPath: string, newPath: string): Promise<void>;
  stat(path: string): Promise<{ mtimeMs: number }>;
  unlink(path: string): Promise<void>;
  writeFile(path: string, data: string, encoding: string): Promise<void>;
};

export type NewsStorageDriver = "d1" | "mongodb" | "file";
export type NewsStorageErrorCategory = "configuration" | "unavailable" | "corrupt";

export class NewsStorageError extends Error {
  constructor(
    public readonly driver: NewsStorageDriver,
    public readonly operation: string,
    public readonly category: NewsStorageErrorCategory,
    message: string,
    options?: { cause?: unknown },
  ) {
    super(message, options);
    this.name = "NewsStorageError";
  }
}

export type StoredNewsPost = {
  id: number; slug: string; status: "draft" | "published"; published_at: string | null; version: string;
  title_en: string; summary_en: string; content_en: string; title_fr: string; summary_fr: string; content_fr: string;
  author_email: string; created_at: string; updated_at: string;
};

export type NewsPostInput = Omit<StoredNewsPost, "id" | "author_email" | "created_at" | "updated_at">;

function selectStorageDriver(): NewsStorageDriver {
  const configured = process.env.NEWS_STORAGE_DRIVER?.trim().toLowerCase();
  if (!configured) return process.env.NODE_ENV === "production" ? "d1" : "file";
  if (configured === "d1" || configured === "mongodb" || configured === "file") return configured;
  throw new NewsStorageError("file", "configure", "configuration", `Unsupported NEWS_STORAGE_DRIVER: ${configured}`);
}

const storageDriver = selectStorageDriver();
export function selectedNewsStorage(): NewsStorageDriver { return storageDriver; }

function failure(driver: NewsStorageDriver, operation: string, cause: unknown, category: NewsStorageErrorCategory = "unavailable"): NewsStorageError {
  if (cause instanceof NewsStorageError) return cause;
  return new NewsStorageError(driver, operation, category, `${driver} news storage failed during ${operation}`, { cause });
}

async function d1Ready(): Promise<D1Database> {
  try {
    const runtimeImport = Function("specifier", "return import(specifier)") as (specifier: string) => Promise<{ env?: { DB?: D1Database } }>;
    const runtime = await runtimeImport("cloudflare:workers");
    if (!runtime.env?.DB) throw new Error("D1 binding DB is unavailable");
    await runtime.env.DB.batch([runtime.env.DB.prepare(newsPostsSchema), runtime.env.DB.prepare(newsPostsStatusIndex)]);
    return runtime.env.DB;
  } catch (error) {
    throw failure("d1", "connect", error);
  }
}

let mongoCollection: Promise<MongoCollection> | null = null;
async function mongoReady(): Promise<MongoCollection> {
  const uri = process.env.NEWS_MONGODB_URI?.trim();
  if (!uri) throw new NewsStorageError("mongodb", "configure", "configuration", "NEWS_MONGODB_URI is required for MongoDB news storage");
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
  })().catch((error) => {
    mongoCollection = null;
    throw failure("mongodb", "connect", error);
  });
  return mongoCollection;
}

function fromMongo(document: unknown): StoredNewsPost {
  const { _id: _ignored, ...post } = document as StoredNewsPost & { _id?: unknown };
  void _ignored;
  return post as StoredNewsPost;
}

async function fileStorage() {
  try {
    const runtimeImport = Function("specifier", "return import(specifier)") as (specifier: string) => Promise<unknown>;
    const [fs, path] = await Promise.all([runtimeImport("node:fs/promises"), runtimeImport("node:path")]) as [FileApi, { dirname(path: string): string; join(...parts: string[]): string }];
    const filename = process.env.NEWS_STORAGE_FILE || path.join(process.cwd(), "runtime", "news-posts.json");
    return { fs, path, filename };
  } catch (error) {
    throw failure("file", "configure", error, "configuration");
  }
}

function errorCode(error: unknown): string {
  return typeof error === "object" && error !== null && "code" in error ? String((error as { code?: unknown }).code ?? "") : "";
}

async function readFilePosts(): Promise<StoredNewsPost[]> {
  const { fs, filename } = await fileStorage();
  try {
    const decoded = JSON.parse(await fs.readFile(filename, "utf8")) as unknown;
    if (!Array.isArray(decoded)) throw new Error("News storage root must be an array");
    return decoded as StoredNewsPost[];
  } catch (error) {
    if (errorCode(error) === "ENOENT") return [];
    throw failure("file", "read", error, error instanceof SyntaxError ? "corrupt" : "unavailable");
  }
}

async function writeFilePosts(posts: StoredNewsPost[]) {
  const { fs, path, filename } = await fileStorage();
  try {
    await fs.mkdir(path.dirname(filename), { recursive: true });
    const temporary = `${filename}.${process.pid}.${Date.now()}.${crypto.randomUUID()}.tmp`;
    await fs.writeFile(temporary, JSON.stringify(posts, null, 2), "utf8");
    await fs.rename(temporary, filename);
  } catch (error) {
    throw failure("file", "write", error);
  }
}

const lockTimeoutMs = 10_000;
const staleLockMs = 30_000;
async function withFileLock(operation: () => Promise<void>) {
  const { fs, path, filename } = await fileStorage();
  const lockPath = `${filename}.lock`;
  const started = Date.now();
  let handle: FileHandle | null = null;
  await fs.mkdir(path.dirname(filename), { recursive: true });
  while (!handle) {
    try {
      handle = await fs.open(lockPath, "wx");
    } catch (error) {
      if (errorCode(error) !== "EEXIST") throw failure("file", "lock", error);
      try {
        if (Date.now() - (await fs.stat(lockPath)).mtimeMs > staleLockMs) {
          await fs.unlink(lockPath);
          continue;
        }
      } catch (inspectionError) {
        if (errorCode(inspectionError) !== "ENOENT") throw failure("file", "inspect-lock", inspectionError);
      }
      if (Date.now() - started >= lockTimeoutMs) throw failure("file", "lock", new Error("Timed out waiting for the news storage lock"));
      await new Promise((resolve) => setTimeout(resolve, 25));
    }
  }
  try {
    await operation();
  } finally {
    await handle.close().catch(() => undefined);
    await fs.unlink(lockPath).catch(() => undefined);
  }
}

export async function listNewsPosts(includeDrafts = false): Promise<StoredNewsPost[]> {
  if (storageDriver === "d1") {
    try {
      const database = await d1Ready();
      const where = includeDrafts ? "" : "WHERE status = 'published'";
      const result = await database.prepare(`SELECT * FROM news_posts ${where} ORDER BY COALESCE(published_at, updated_at) DESC`).all<StoredNewsPost>();
      return result.results ?? [];
    } catch (error) { throw failure("d1", "list", error); }
  }
  if (storageDriver === "mongodb") {
    try {
      const mongo = await mongoReady();
      const rows = await mongo.find(includeDrafts ? {} : { status: "published" }).sort({ published_at: -1, updated_at: -1 }).toArray();
      return rows.map(fromMongo);
    } catch (error) { throw failure("mongodb", "list", error); }
  }
  return (await readFilePosts()).filter((post) => includeDrafts || post.status === "published").sort((a, b) => (b.published_at ?? b.updated_at).localeCompare(a.published_at ?? a.updated_at));
}

export async function findNewsPost(slug: string, includeDrafts = false): Promise<StoredNewsPost | null> {
  if (storageDriver === "d1") {
    try {
      const database = await d1Ready();
      return database.prepare(`SELECT * FROM news_posts WHERE slug = ? ${includeDrafts ? "" : "AND status = 'published'"} LIMIT 1`).bind(slug).first<StoredNewsPost>();
    } catch (error) { throw failure("d1", "find", error); }
  }
  if (storageDriver === "mongodb") {
    try {
      const mongo = await mongoReady();
      const row = await mongo.findOne(includeDrafts ? { slug } : { slug, status: "published" });
      return row ? fromMongo(row) : null;
    } catch (error) { throw failure("mongodb", "find", error); }
  }
  return (await readFilePosts()).find((post) => post.slug === slug && (includeDrafts || post.status === "published")) ?? null;
}

export async function saveNewsPost(input: NewsPostInput, authorEmail: string): Promise<void> {
  if (storageDriver === "d1") {
    try {
      const database = await d1Ready();
      await database.prepare(`INSERT INTO news_posts (slug,status,published_at,version,title_en,summary_en,content_en,title_fr,summary_fr,content_fr,author_email,updated_at)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,CURRENT_TIMESTAMP)
        ON CONFLICT(slug) DO UPDATE SET status=excluded.status,published_at=excluded.published_at,version=excluded.version,title_en=excluded.title_en,summary_en=excluded.summary_en,content_en=excluded.content_en,title_fr=excluded.title_fr,summary_fr=excluded.summary_fr,content_fr=excluded.content_fr,author_email=excluded.author_email,updated_at=CURRENT_TIMESTAMP`)
        .bind(input.slug, input.status, input.published_at, input.version, input.title_en, input.summary_en, input.content_en, input.title_fr, input.summary_fr, input.content_fr, authorEmail).run();
      return;
    } catch (error) { throw failure("d1", "save", error); }
  }
  if (storageDriver === "mongodb") {
    try {
      const now = new Date().toISOString();
      const mongo = await mongoReady();
      await mongo.updateOne({ slug: input.slug }, { $set: { ...input, author_email: authorEmail, updated_at: now }, $setOnInsert: { id: Date.now(), created_at: now } }, { upsert: true });
      return;
    } catch (error) { throw failure("mongodb", "save", error); }
  }
  await withFileLock(async () => {
    const posts = await readFilePosts();
    const index = posts.findIndex((post) => post.slug === input.slug);
    const now = new Date().toISOString();
    const post: StoredNewsPost = { ...input, id: index >= 0 ? posts[index].id : Math.max(0, ...posts.map((item) => item.id)) + 1, author_email: authorEmail, created_at: index >= 0 ? posts[index].created_at : now, updated_at: now };
    if (index >= 0) posts[index] = post; else posts.push(post);
    await writeFilePosts(posts);
  });
}

export async function deleteNewsPost(slug: string): Promise<void> {
  if (storageDriver === "d1") {
    try {
      const database = await d1Ready();
      await database.prepare("DELETE FROM news_posts WHERE slug = ?").bind(slug).run();
      return;
    } catch (error) { throw failure("d1", "delete", error); }
  }
  if (storageDriver === "mongodb") {
    try {
      const mongo = await mongoReady();
      await mongo.deleteOne({ slug });
      return;
    } catch (error) { throw failure("mongodb", "delete", error); }
  }
  await withFileLock(async () => writeFilePosts((await readFilePosts()).filter((post) => post.slug !== slug)));
}
