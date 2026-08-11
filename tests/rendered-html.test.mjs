import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import test from "node:test";

async function waitForServer(url) {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try { const response = await fetch(url); if (response.ok) return; } catch {}
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error("Next.js test server did not start");
}

test("serves the complete bilingual PHPAML website", async () => {
  const server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "-p", "3100"], { stdio: "ignore" });
  try {
    await waitForServer("http://127.0.0.1:3100/");
    const [home, french, docs, download] = await Promise.all([
      fetch("http://127.0.0.1:3100/").then((r) => r.text()),
      fetch("http://127.0.0.1:3100/fr").then((r) => r.text()),
      fetch("http://127.0.0.1:3100/docs").then((r) => r.text()),
      fetch("http://127.0.0.1:3100/download").then((r) => r.text()),
    ]);
    assert.match(home, /Structure PHP/);
    assert.match(home, /href="\/fr"/);
    assert.match(french, /Structurez PHP/);
    assert.match(french, /href="\/"/);
    assert.match(docs, /Official documentation/);
    assert.match(download, /phpaml-1\.3\.0-windows-x64\.exe/);
  } finally {
    server.kill("SIGTERM");
  }
});
