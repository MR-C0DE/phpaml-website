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
  const server = spawn(process.execPath, ["node_modules/vinext/dist/cli.js", "start", "-p", "3100"], { stdio: "ignore" });
  try {
    await waitForServer("http://127.0.0.1:3100/");
    const responses = await Promise.all([
      fetch("http://127.0.0.1:3100/"),
      fetch("http://127.0.0.1:3100/fr"),
      fetch("http://127.0.0.1:3100/docs"),
      fetch("http://127.0.0.1:3100/download"),
      fetch("http://127.0.0.1:3100/tutorial"),
      fetch("http://127.0.0.1:3100/fr/tutorial"),
      fetch("http://127.0.0.1:3100/tutorial/01"),
      fetch("http://127.0.0.1:3100/fr/tutorial/01"),
      fetch("http://127.0.0.1:3100/tutorial/02"),
      fetch("http://127.0.0.1:3100/fr/tutorial/02"),
      fetch("http://127.0.0.1:3100/platform"),
      fetch("http://127.0.0.1:3100/fr/platform"),
      fetch("http://127.0.0.1:3100/demos"),
      fetch("http://127.0.0.1:3100/fr/demos"),
      fetch("http://127.0.0.1:3100/demos/book-reader"),
      fetch("http://127.0.0.1:3100/demos/tutor-chess"),
      fetch("http://127.0.0.1:3100/demos/movies-api"),
      fetch("http://127.0.0.1:3100/fr/demos/movies-api"),
    ]);
    responses.forEach((response) => assert.equal(response.status, 200));
    const [home, french, docs, download, tutorial, frenchTutorial, chapterOne, frenchChapterOne, chapterTwo, frenchChapterTwo, platform, frenchPlatform, demos, frenchDemos, bookDemo, chessDemo, moviesDemo, frenchMoviesDemo] = await Promise.all(responses.map((response) => response.text()));
    const docsText = docs.replace(/<[^>]+>/g, "");
    assert.match(home, /Structure PHP/);
    assert.match(home, /href="\/fr"/);
    assert.match(home, /<title>PHPAML/);
    assert.match(home, /rel="icon"[^>]+favicon\.png/);
    assert.match(home, /aria-label="Main navigation"/);
    assert.match(home, /github\.com\/MR-C0DE\/phpaml-cli/);
    assert.match(home, /phpaml-book-reader-demo\.onrender\.com/);
    assert.match(home, /github\.com\/MR-C0DE\/phpaml-book-reader-demo/);
    assert.match(home, /The Last Lighthouse/);
    assert.match(home, /Tutor Chess/);
    assert.match(home, /phpaml-chess-tutor\.onrender\.com/);
    assert.match(home, /github\.com\/MR-C0DE\/phpaml-chess-tutor-demo/);
    assert.match(home, /Stockfish 18/);
    assert.match(home, /ReactiveCounter\.php/);
    assert.match(home, /ClientAction/);
    assert.match(home, /syntax-keyword/);
    assert.match(home, /syntax-variable/);
    assert.match(home, /syntax-string/);
    assert.match(home, /syntax-operator/);
    assert.match(home, /syntax-attribute/);
    assert.match(home, /syntax-parameter/);
    assert.match(home, /Effect/);
    assert.match(home, /href="\/platform"/);
    assert.match(home, /href="\/demos"/);
    assert.match(platform, /Three layers\. One PHP workflow/);
    assert.match(platform, /ReactiveCounter\.php/);
    assert.match(frenchPlatform, /Trois couches\. Un seul flux PHP/);
    assert.match(demos, /Real code\. Public applications/);
    assert.match(demos, /href="\/demos\/book-reader"/);
    assert.match(demos, /href="\/demos\/movies-api"/);
    assert.match(frenchDemos, /Du code réel\. Des applications publiques/);
    assert.match(bookDemo, /The Last Lighthouse/);
    assert.match(chessDemo, /Tutor Chess/);
    assert.match(moviesDemo, /MovieRoute\.php/);
    assert.match(moviesDemo, /github\.com\/MR-C0DE\/phpaml-movies-api-demo/);
    assert.match(frenchMoviesDemo, /Ce que cette démo valide/);
    assert.match(french, /Structurez PHP/);
    assert.match(french, /href="\/"/);
    assert.match(french, /aria-label="Navigation principale"/);
    assert.match(french, /Voyez le framework/);
    assert.match(french, /Explorer le code source/);
    assert.match(french, /phpaml-chess-tutor\.onrender\.com/);
    assert.match(french, /Trois couches ciblées/);
    assert.match(docs, /Official documentation/);
    assert.match(docs, /aml doctor --production --json/);
    assert.match(docsText, /aml deploy:configure production/);
    assert.match(docs, /public-html/);
    assert.match(docs, /sftp-only/);
    assert.match(docs, /deliverables/);
    assert.match(docs, /src\/views\/stylesheets/);
    assert.match(docs, /aml create-view-app/);
    assert.match(docs, /src\/views/);
    assert.match(download, /phpaml-1\.7\.0-beta\.11-windows-x64\.exe/);
    assert.match(download, /phpaml-1\.7\.0-beta\.11-macos-arm64\.pkg/);
    assert.match(download, /phpaml-1\.7\.0-beta\.11-linux-x64\.deb/);
    assert.match(download, /SHA-256/);
    assert.match(tutorial, /Official PHPAML tutorial/);
    assert.match(tutorial, /Master MVC/);
    assert.match(tutorial, /CHAPTER 12/);
    assert.match(frenchTutorial, /Tutoriel officiel PHPAML/);
    assert.match(frenchTutorial, /Maîtrisez MVC/);
    assert.match(frenchTutorial, /CHAPITRE 12/);
    assert.match(tutorial, /href="\/tutorial\/01"/);
    assert.match(tutorial, /Coming soon/);
    assert.match(chapterOne, /Install AML and/);
    assert.match(chapterOne, /aml create my-first-app/);
    assert.match(chapterOne, /phpaml-1\.7\.0-beta\.11-windows-x64\.exe/);
    assert.match(chapterOne, /phpaml-1\.7\.0-beta\.11-macos-arm64\.pkg/);
    assert.match(chapterOne, /phpaml-1\.7\.0-beta\.11-linux-x64\.deb/);
    assert.match(chapterOne, /Live reload enabled/);
    assert.match(chapterOne, /Final exercise/);
    assert.match(frenchChapterOne, /Installer AML et/);
    assert.match(frenchChapterOne, /aml create mon-projet/);
    assert.match(frenchChapterOne, /Exercice final/);
    assert.match(tutorial, /href="\/tutorial\/02"/);
    assert.match(chapterTwo, /Understand the/);
    assert.match(chapterTwo, /routes\/webapp\.php/);
    assert.match(chapterTwo, /runtime\/storage\/database\.sqlite/);
    assert.match(chapterTwo, /public\/assets\/css\/app\.css/);
    assert.match(frenchChapterTwo, /Comprendre la/);
    assert.match(frenchChapterTwo, /Le runtime géré par AML/);
  } finally {
    server.kill("SIGTERM");
  }
});
