import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders the PHPAML landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /PHPAML/);
  assert.match(html, /Structurez PHP/);
  assert.match(html, /v1\.3\.0/);
  assert.match(html, /aml create mon-projet/);
  assert.match(html, /href="\/download"/);
  assert.match(html, /href="\/docs"/);
  assert.doesNotMatch(html, /codex-preview|Building your site|react-loading-skeleton/i);
});

test("renders documentation and download routes", async () => {
  const [docs, download] = await Promise.all([render("/docs"), render("/download")]);
  assert.equal(docs.status, 200);
  assert.equal(download.status, 200);
  assert.match(await docs.text(), /Documentation officielle/);
  assert.match(await download.text(), /phpaml-1\.3\.0-windows-x64\.exe/);
  await access(new URL("../public/og-v2.png", import.meta.url));
});
