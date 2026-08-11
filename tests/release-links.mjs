import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const source = await readFile(new URL("../app/release.ts", import.meta.url), "utf8");
const version = source.match(/cliVersion:\s*"([^"]+)"/)?.[1];
assert.ok(version, "Missing centralized CLI version");
const files = [...source.matchAll(/file:\s*"([^"]+)"/g)].map((match) => match[1]);
assert.equal(files.length, 3, "Expected one installer for each supported platform");

for (const file of files.flatMap((name) => [name, `${name}.sha256`])) {
  const url = `https://github.com/MR-C0DE/phpaml-cli/releases/download/v${version}/${file}`;
  const response = await fetch(url, { method: "HEAD", redirect: "follow" });
  assert.equal(response.ok, true, `Missing release asset: ${url} (${response.status})`);
}
