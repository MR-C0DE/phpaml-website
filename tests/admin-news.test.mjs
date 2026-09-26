import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawn } from "node:child_process";
import test from "node:test";

const password = "correct-horse-battery-staple";
const sessionSecret = "test-session-secret-with-at-least-32-characters";

function basePort(offset = 0) { return 5200 + (process.pid % 400) + offset; }

async function waitForServer(origin, server, output) {
  for (let attempt = 0; attempt < 120; attempt += 1) {
    if (server.exitCode !== null) throw new Error(`Test server exited with code ${server.exitCode}: ${output()}`);
    try { const response = await fetch(`${origin}/`); if (response.ok) return; } catch { /* starting */ }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error(`Test server did not start: ${output()}`);
}

async function startServer(port, environment) {
  const origin = `http://127.0.0.1:${port}`;
  let captured = "";
  const server = spawn(process.execPath, ["node_modules/vinext/dist/cli.js", "start", "-H", "127.0.0.1", "-p", String(port)], {
    env: {
      ...process.env,
      NODE_ENV: "production",
      NEWS_ADMIN_ORIGIN: origin,
      NEWS_ADMIN_PASSWORD: password,
      NEWS_ADMIN_SESSION_SECRET: sessionSecret,
      ...environment,
    },
    stdio: ["ignore", "pipe", "pipe"],
  });
  server.stdout.on("data", (chunk) => { captured += chunk; });
  server.stderr.on("data", (chunk) => { captured += chunk; });
  await waitForServer(origin, server, () => captured);
  return { origin, server, output: () => captured };
}

async function stopServer(instance) {
  if (instance.server.exitCode === null) instance.server.kill("SIGTERM");
  await Promise.race([
    new Promise((resolve) => instance.server.once("exit", resolve)),
    new Promise((resolve) => setTimeout(resolve, 2_000)),
  ]);
  if (instance.server.exitCode === null) instance.server.kill("SIGKILL");
}

async function login(instance, value = password, origin = instance.origin) {
  const response = await fetch(`${instance.origin}/api/admin/login`, {
    method: "POST",
    headers: { origin, "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ password: value, return_to: "/admin/news" }),
    redirect: "manual",
  });
  return { response, cookie: response.headers.get("set-cookie")?.split(";", 1)[0] ?? "" };
}

function expiredCookie() {
  const payload = `news-admin.${Math.floor(Date.now() / 1000) - 60}`;
  const signature = createHmac("sha256", sessionSecret).update(payload).digest("base64url");
  return `phpaml_news_admin=${payload}.${signature}`;
}

function post(slug) {
  return {
    slug,
    status: "draft",
    published_at: null,
    version: "test",
    title_en: `English ${slug}`,
    summary_en: "English summary",
    content_en: "English content",
    title_fr: `Français ${slug}`,
    summary_fr: "Résumé français",
    content_fr: "Contenu français",
  };
}

async function save(instance, cookie, slug, origin = instance.origin, extraHeaders = {}) {
  return fetch(`${instance.origin}/api/admin/news`, {
    method: "POST",
    headers: { cookie, origin, "content-type": "application/json", ...extraHeaders },
    body: JSON.stringify(post(slug)),
  });
}

test("news administration enforces authentication, sessions, CSRF and CRUD", async () => {
  const directory = await mkdtemp(join(tmpdir(), "phpaml-news-admin-"));
  const instance = await startServer(basePort(), { NEWS_STORAGE_DRIVER: "file", NEWS_STORAGE_FILE: join(directory, "news.json") });
  try {
    assert.equal((await fetch(`${instance.origin}/api/admin/news`)).status, 401);

    const forbiddenLogin = await login(instance, password, "https://attacker.example");
    assert.equal(forbiddenLogin.response.status, 403);

    const wrong = await login(instance, "incorrect-password");
    assert.equal(wrong.response.status, 303);
    assert.match(wrong.response.headers.get("location") ?? "", /error=1/);
    assert.equal(wrong.cookie, "");

    const authenticated = await login(instance);
    assert.equal(authenticated.response.status, 303);
    assert.ok(authenticated.cookie.startsWith("phpaml_news_admin="));

    const expired = await fetch(`${instance.origin}/api/admin/news`, { headers: { cookie: expiredCookie() } });
    assert.equal(expired.status, 401);

    const forgedHeader = await save(instance, authenticated.cookie, "forged-origin", "https://attacker.example", { "x-phpaml-admin": "news-editor" });
    assert.equal(forgedHeader.status, 403);

    const created = await save(instance, authenticated.cookie, "first-article");
    assert.equal(created.status, 200, await created.text());
    const listing = await fetch(`${instance.origin}/api/admin/news`, { headers: { cookie: authenticated.cookie } });
    assert.equal(listing.status, 200);
    assert.deepEqual((await listing.json()).posts.map((item) => item.slug), ["first-article"]);

    const removed = await fetch(`${instance.origin}/api/admin/news?slug=first-article`, { method: "DELETE", headers: { cookie: authenticated.cookie, origin: instance.origin } });
    assert.equal(removed.status, 200, await removed.text());
    const afterDelete = await fetch(`${instance.origin}/api/admin/news`, { headers: { cookie: authenticated.cookie } });
    assert.deepEqual((await afterDelete.json()).posts, []);

    const logoutCsrf = await fetch(`${instance.origin}/api/admin/logout`, { method: "POST", headers: { cookie: authenticated.cookie, origin: "https://attacker.example" }, redirect: "manual" });
    assert.equal(logoutCsrf.status, 403);
    const logout = await fetch(`${instance.origin}/api/admin/logout`, { method: "POST", headers: { cookie: authenticated.cookie, origin: instance.origin }, redirect: "manual" });
    assert.equal(logout.status, 303);
  } finally {
    await stopServer(instance);
    await rm(directory, { recursive: true, force: true });
  }
});

test("the selected storage returns 503 instead of silently falling back", async () => {
  const directory = await mkdtemp(join(tmpdir(), "phpaml-news-failure-"));
  const storageFile = join(directory, "must-not-exist.json");
  const instance = await startServer(basePort(20), {
    NEWS_STORAGE_DRIVER: "mongodb",
    NEWS_MONGODB_URI: "mongodb://127.0.0.1:1/phpaml?serverSelectionTimeoutMS=100&connectTimeoutMS=100",
    NEWS_STORAGE_FILE: storageFile,
  });
  try {
    const authenticated = await login(instance);
    const response = await save(instance, authenticated.cookie, "must-not-fallback");
    assert.equal(response.status, 503, await response.text());
    await assert.rejects(readFile(storageFile, "utf8"), { code: "ENOENT" });
    assert.match(instance.output(), /News storage failure/);
    assert.match(instance.output(), /mongodb/);
  } finally {
    await stopServer(instance);
    await rm(directory, { recursive: true, force: true });
  }
});

test("file storage serializes writes from separate server processes", async () => {
  const directory = await mkdtemp(join(tmpdir(), "phpaml-news-concurrency-"));
  const storageFile = join(directory, "news.json");
  const first = await startServer(basePort(40), { NEWS_STORAGE_DRIVER: "file", NEWS_STORAGE_FILE: storageFile });
  const second = await startServer(basePort(41), { NEWS_STORAGE_DRIVER: "file", NEWS_STORAGE_FILE: storageFile });
  try {
    const [firstLogin, secondLogin] = await Promise.all([login(first), login(second)]);
    const writes = Array.from({ length: 24 }, (_, index) => {
      const instance = index % 2 === 0 ? first : second;
      const cookie = index % 2 === 0 ? firstLogin.cookie : secondLogin.cookie;
      return save(instance, cookie, `concurrent-${String(index).padStart(2, "0")}`);
    });
    const responses = await Promise.all(writes);
    for (const response of responses) assert.equal(response.status, 200, await response.text());
    const listing = await fetch(`${first.origin}/api/admin/news`, { headers: { cookie: firstLogin.cookie } });
    assert.equal(listing.status, 200);
    const posts = (await listing.json()).posts;
    assert.equal(posts.length, 24);
    assert.equal(new Set(posts.map((item) => item.slug)).size, 24);
    assert.equal(JSON.parse(await readFile(storageFile, "utf8")).length, 24);
  } finally {
    await Promise.all([stopServer(first), stopServer(second)]);
    await rm(directory, { recursive: true, force: true });
  }
});
