import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import test from "node:test";

async function waitForServer(url) {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try { const response = await fetch(url); if (response.ok) return; } catch { /* server is still starting */ }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error("Next.js test server did not start");
}

test("serves the complete bilingual PHPAML website", async () => {
  const server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "-p", "3100"], { stdio: "ignore" });
  try {
    await waitForServer("http://127.0.0.1:3100/");
    const responses = await Promise.all([
      fetch("http://127.0.0.1:3100/"),
      fetch("http://127.0.0.1:3100/fr"),
      fetch("http://127.0.0.1:3100/docs"),
      fetch("http://127.0.0.1:3100/download"),
    ]);
    responses.forEach((response) => assert.equal(response.status, 200));
    const [home, french, docs, download] = await Promise.all(responses.map((response) => response.text()));
    assert.match(home, /Structure PHP/);
    assert.match(home, /href="\/fr"/);
    assert.match(home, /<title>PHPAML/);
    assert.match(home, /rel="icon"[^>]+favicon\.svg/);
    assert.match(home, /aria-label="Main navigation"/);
    assert.match(home, /github\.com\/MR-C0DE\/phpaml-cli/);
    assert.match(french, /Structurez PHP/);
    assert.match(french, /href="\/"/);
    assert.match(french, /aria-label="Navigation principale"/);
    assert.match(docs, /Official documentation/);
    assert.match(docs, /aml doctor --production --json/);
    assert.match(docs, /\/css\/index\.css/);
    assert.match(download, /phpaml-1\.3\.0-windows-x64\.exe/);
    assert.match(download, /phpaml-1\.3\.0-macos-arm64\.pkg/);
    assert.match(download, /phpaml-1\.3\.0-linux-x64\.deb/);
    assert.match(download, /SHA-256/);
  } finally {
    server.kill("SIGTERM");
  }
});
