import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import test from "node:test";

async function waitForServer(url) {
  for (let attempt = 0; attempt < 120; attempt += 1) {
    try { const response = await fetch(url); if (response.ok) return; } catch { /* server is still starting */ }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error("Next.js test server did not start");
}

test("serves the complete bilingual PHPAML website", async () => {
  const port = 3100 + (process.pid % 1000);
  const origin = `http://127.0.0.1:${port}`;
  const server = spawn(process.execPath, ["node_modules/vinext/dist/cli.js", "start", "-H", "127.0.0.1", "-p", String(port)], { stdio: ["ignore", "pipe", "pipe"] });
  let serverOutput = "";
  server.stdout.on("data", (chunk) => { serverOutput += chunk; });
  server.stderr.on("data", (chunk) => { serverOutput += chunk; });
  try {
    await Promise.race([
      waitForServer(`${origin}/`),
      new Promise((_, reject) => server.once("exit", (code) => reject(new Error(`Test server exited with code ${code}: ${serverOutput}`)))),
    ]);
    const responses = await Promise.all([
      fetch(`${origin}/`),
      fetch(`${origin}/fr`),
      fetch(`${origin}/docs`),
      fetch(`${origin}/docs/reference`),
      fetch(`${origin}/docs/01`),
      fetch(`${origin}/fr/docs/01`),
      fetch(`${origin}/download`),
      fetch(`${origin}/tutorial`),
      fetch(`${origin}/fr/tutorial`),
      fetch(`${origin}/tutorial/01`),
      fetch(`${origin}/fr/tutorial/01`),
      fetch(`${origin}/tutorial/02`),
      fetch(`${origin}/fr/tutorial/02`),
      fetch(`${origin}/tutorial/03`),
      fetch(`${origin}/fr/tutorial/03`),
      fetch(`${origin}/tutorial/04`),
      fetch(`${origin}/fr/tutorial/04`),
      fetch(`${origin}/tutorial/05`),
      fetch(`${origin}/fr/tutorial/05`),
      fetch(`${origin}/tutorial/06`),
      fetch(`${origin}/fr/tutorial/06`),
      fetch(`${origin}/tutorial/07`),
      fetch(`${origin}/fr/tutorial/07`),
      fetch(`${origin}/tutorial/08`),
      fetch(`${origin}/fr/tutorial/08`),
      fetch(`${origin}/tutorial/09`),
      fetch(`${origin}/fr/tutorial/09`),
      fetch(`${origin}/tutorial/10`),
      fetch(`${origin}/fr/tutorial/10`),
      fetch(`${origin}/platform`),
      fetch(`${origin}/fr/platform`),
      fetch(`${origin}/demos`),
      fetch(`${origin}/fr/demos`),
      fetch(`${origin}/demos/book-reader`),
      fetch(`${origin}/demos/tutor-chess`),
      fetch(`${origin}/demos/movies-api`),
      fetch(`${origin}/fr/demos/movies-api`),
      fetch(`${origin}/news`),
      fetch(`${origin}/fr/news`),
      fetch(`${origin}/news/phpaml-data-enters-alpha`),
      fetch(`${origin}/fr/news/phpaml-data-enters-alpha`),
      fetch(`${origin}/news/phpaml-cli-1-7-beta-31`),
      fetch(`${origin}/fr/news/phpaml-cli-1-7-beta-31`),
      fetch(`${origin}/news/phpaml-cli-1-7-beta-33`),
      fetch(`${origin}/fr/news/phpaml-cli-1-7-beta-33`),
    ]);
    responses.forEach((response) => assert.equal(response.status, 200));
    const [home, french, docs, docsReference, docsChapterOne, frenchDocsChapterOne, download, tutorial, frenchTutorial, chapterOne, frenchChapterOne, chapterTwo, frenchChapterTwo, chapterThree, frenchChapterThree, chapterFour, frenchChapterFour, chapterFive, frenchChapterFive, chapterSix, frenchChapterSix, chapterSeven, frenchChapterSeven, chapterEight, frenchChapterEight, chapterNine, frenchChapterNine, chapterTen, frenchChapterTen, platform, frenchPlatform, demos, frenchDemos, bookDemo, chessDemo, moviesDemo, frenchMoviesDemo, news, frenchNews, dataNews, frenchDataNews, cliNews, frenchCliNews, cli33News, frenchCli33News] = await Promise.all(responses.map((response) => response.text()));
    const docsText = docsReference.replace(/<[^>]+>/g, "");
    assert.match(home, /Structure PHP/);
    assert.match(docsChapterOne, /Documentation · Chapter 01/);
    assert.match(docsChapterOne, /Install AML and/);
    assert.match(frenchDocsChapterOne, /Documentation · Chapitre 01/);
    assert.match(frenchDocsChapterOne, /Installer AML et/);
    const chapterPages = await Promise.all([
      fetch(origin + "/docs/01/installation"),
      fetch(origin + "/docs/01/verification"),
      fetch(origin + "/docs/01/creation"),
      fetch(origin + "/docs/01/execution"),
      fetch(origin + "/docs/01/depannage"),
      fetch(origin + "/fr/docs/01/installation"),
      fetch(origin + "/fr/docs/01/creation"),
      fetch(origin + "/fr/docs/01/depannage"),
    ]);
    chapterPages.forEach((response) => assert.equal(response.status, 200));
    const chapterHtml = (await Promise.all(chapterPages.map((response) => response.text()))).join("\n");
    assert.match(chapterHtml, /create command installs the project automatically/);
    assert.match(chapterHtml, /La création installe déjà le runtime/);
    assert.match(chapterHtml, /aml create-console/);
    assert.match(chapterHtml, /aml serve detects when it is missing/);
    const architecturePages = await Promise.all([
      fetch(origin + "/docs/02"),
      fetch(origin + "/docs/02/requete"),
      fetch(origin + "/docs/02/structure"),
      fetch(origin + "/docs/02/mvc"),
      fetch(origin + "/docs/02/variantes"),
      fetch(origin + "/docs/02/atelier"),
      fetch(origin + "/fr/docs/02"),
      fetch(origin + "/fr/docs/02/requete"),
      fetch(origin + "/fr/docs/02/structure"),
      fetch(origin + "/fr/docs/02/mvc"),
      fetch(origin + "/fr/docs/02/variantes"),
      fetch(origin + "/fr/docs/02/atelier"),
    ]);
    architecturePages.forEach((response) => assert.equal(response.status, 200));
    const architectureHtml = (await Promise.all(architecturePages.map((response) => response.text()))).join("\n");
    assert.match(architectureHtml, /How does/);
    assert.match(architectureHtml, /Comment fonctionne/);
    assert.match(architectureHtml, /No prior technical vocabulary is required/);
    assert.match(architectureHtml, /Aucun vocabulaire technique préalable/);
    assert.match(architectureHtml, /Where do PHP and PHPAML enter the picture/);
    assert.match(architectureHtml, /Décomposons une adresse complète/);
    assert.match(architectureHtml, /QUESTIONS DE DÉBUTANT/);
    assert.match(architectureHtml, /Fichier, dossier et extension/);
    assert.match(architectureHtml, /What does the browser actually receive/);
    assert.match(architectureHtml, /Les actions HTTP les plus utiles/);
    assert.match(architectureHtml, /composer\.lock/);
    assert.match(architectureHtml, /MVC n.est pas seul/);
    assert.match(architectureHtml, /Comparaison rapide/);
    assert.match(architectureHtml, /Si la page ne fonctionne pas/);
    assert.match(architectureHtml, /public\/index\.php/);
    assert.match(architectureHtml, /AboutController/);
    assert.match(architectureHtml, /CHECK YOUR UNDERSTANDING/);
    assert.match(architectureHtml, /The Running Thread Library/);
    assert.match(architectureHtml, /La bibliothèque Fil Rouge/);
    assert.match(architectureHtml, /Imagine a restaurant/);
    assert.match(architectureHtml, /Pourquoi ne pas tout mettre dans un seul fichier/);
    assert.match(architectureHtml, /Read the controller line by line/);
    assert.match(architectureHtml, /YOUR TURN/);
    const firstApplicationPages = await Promise.all([
      fetch(origin + "/docs/03"),
      fetch(origin + "/docs/03/creation"),
      fetch(origin + "/docs/03/explorer"),
      fetch(origin + "/docs/03/page"),
      fetch(origin + "/docs/03/data"),
      fetch(origin + "/docs/03/errors"),
      fetch(origin + "/docs/03/workshop"),
      fetch(origin + "/fr/docs/03"),
      fetch(origin + "/fr/docs/03/creation"),
      fetch(origin + "/fr/docs/03/explorer"),
      fetch(origin + "/fr/docs/03/page"),
      fetch(origin + "/fr/docs/03/data"),
      fetch(origin + "/fr/docs/03/errors"),
      fetch(origin + "/fr/docs/03/workshop"),
    ]);
    firstApplicationPages.forEach((response) => assert.equal(response.status, 200));
    const firstApplicationHtml = (await Promise.all(firstApplicationPages.map((response) => response.text()))).join("\n");
    assert.match(firstApplicationHtml, /Build your first/);
    assert.match(firstApplicationHtml, /Construire sa première/);
    assert.match(firstApplicationHtml, /src\/routes\/WebApp\.php/);
    assert.match(firstApplicationHtml, /AboutController/);
    assert.match(firstApplicationHtml, /BookController/);
    assert.match(firstApplicationHtml, /htmlspecialchars/);
    assert.match(firstApplicationHtml, /404 and 500/);
    assert.match(firstApplicationHtml, /404 et 500/);
    assert.match(firstApplicationHtml, /foreach/);
    const formPages = await Promise.all([
      fetch(origin + "/docs/04"),
      fetch(origin + "/docs/04/form"),
      fetch(origin + "/docs/04/request"),
      fetch(origin + "/docs/04/validation"),
      fetch(origin + "/docs/04/security"),
      fetch(origin + "/docs/04/crud"),
      fetch(origin + "/docs/04/workshop"),
      fetch(origin + "/fr/docs/04"),
      fetch(origin + "/fr/docs/04/form"),
      fetch(origin + "/fr/docs/04/request"),
      fetch(origin + "/fr/docs/04/validation"),
      fetch(origin + "/fr/docs/04/security"),
      fetch(origin + "/fr/docs/04/crud"),
      fetch(origin + "/fr/docs/04/workshop"),
    ]);
    formPages.forEach((response) => assert.equal(response.status, 200));
    const formHtml = (await Promise.all(formPages.map((response) => response.text()))).join("\n");
    assert.match(formHtml, /Make a form/);
    assert.match(formHtml, /Faire parler/);
    assert.match(formHtml, /POST.Redirect.GET/);
    assert.match(formHtml, /csrfField/);
    assert.match(formHtml, /Request::input|input\(&#x27;title&#x27;/);
    assert.match(formHtml, /Validator/);
    assert.match(formHtml, /Response::redirect/);
    assert.match(formHtml, /419/);
    assert.match(formHtml, /422/);
    assert.match(formHtml, /Create, read/);
    assert.match(formHtml, /Créer, consulter/);
    const viewPages = await Promise.all([
      fetch(origin + "/docs/05"),
      fetch(origin + "/docs/05/partials"),
      fetch(origin + "/docs/05/organization"),
      fetch(origin + "/docs/05/assets"),
      fetch(origin + "/docs/05/accessibility"),
      fetch(origin + "/docs/05/errors"),
      fetch(origin + "/docs/05/workshop"),
      fetch(origin + "/fr/docs/05"),
      fetch(origin + "/fr/docs/05/partials"),
      fetch(origin + "/fr/docs/05/organization"),
      fetch(origin + "/fr/docs/05/assets"),
      fetch(origin + "/fr/docs/05/accessibility"),
      fetch(origin + "/fr/docs/05/errors"),
      fetch(origin + "/fr/docs/05/workshop"),
    ]);
    viewPages.forEach((response) => assert.equal(response.status, 200));
    const viewHtml = (await Promise.all(viewPages.map((response) => response.text()))).join("\n");
    assert.match(viewHtml, /Build views/);
    assert.match(viewHtml, /Construire des vues/);
    assert.match(viewHtml, /header\.php/);
    assert.match(viewHtml, /partial/);
    assert.match(viewHtml, /src\/views\/partials/);
    assert.match(viewHtml, /public\/css\/app\.css/);
    assert.match(viewHtml, /focus-visible/);
    assert.match(viewHtml, /src\/views\/errors\/404\.php/);
    assert.match(viewHtml, /requestId/);
    assert.match(viewHtml, /No src file is public/);
    assert.match(viewHtml, /Aucun fichier src n.est public/);
    const configurationPages = await Promise.all([
      fetch(origin + "/docs/06"),
      fetch(origin + "/docs/06/manifest"),
      fetch(origin + "/docs/06/environment"),
      fetch(origin + "/docs/06/debug"),
      fetch(origin + "/docs/06/runtime"),
      fetch(origin + "/docs/06/production"),
      fetch(origin + "/docs/06/workshop"),
      fetch(origin + "/fr/docs/06"),
      fetch(origin + "/fr/docs/06/manifest"),
      fetch(origin + "/fr/docs/06/environment"),
      fetch(origin + "/fr/docs/06/debug"),
      fetch(origin + "/fr/docs/06/runtime"),
      fetch(origin + "/fr/docs/06/production"),
      fetch(origin + "/fr/docs/06/workshop"),
    ]);
    configurationPages.forEach((response) => assert.equal(response.status, 200));
    const configurationHtml = (await Promise.all(configurationPages.map((response) => response.text()))).join("\n");
    const configurationText = configurationHtml.replace(/<[^>]+>/g, "");
    assert.match(configurationText, /Configure without/);
    assert.match(configurationText, /Configurer sans/);
    assert.match(configurationText, /phpaml\.json/);
    assert.match(configurationText, /aml env:init/);
    assert.match(configurationText, /runtime\/config\/app\.php/);
    assert.match(configurationText, /X-Request-ID/);
    assert.match(configurationText, /aml doctor --production/);
    assert.match(configurationText, /Le programme reste le même/);
    assert.match(configurationText, /Keep secrets/);
    assert.match(home, /href="\/fr"/);
    assert.match(home, /<title>PHPAML/);
    assert.match(home, /rel="icon"[^>]+favicon\.png/);
    assert.match(home, /aria-label="Main navigation"/);
    assert.match(home, /phpaml-demo-en\.vtt/);
    assert.match(home, /phpaml-demo-fr\.vtt/);
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
    assert.match(home, /href="\/news"/);
    assert.match(home, /href="\/news\/first-aml-view-app-in-five-minutes"/);
    assert.match(french, /href="\/fr\/news\/first-aml-view-app-in-five-minutes"/);
    assert.match(docsReference, /href="\/news\/first-aml-view-app-in-five-minutes"/);
    assert.match(tutorial, /href="\/news\/first-aml-view-app-in-five-minutes"/);
    assert.match(frenchTutorial, /href="\/fr\/news\/first-aml-view-app-in-five-minutes"/);
    assert.match(platform, /Five components\. One PHP workflow/);
    assert.match(platform, /PHPAML Framework/);
    assert.match(platform, /PHPAML i18n/);
    assert.match(platform, /ReactiveCounter\.php/);
    assert.match(frenchPlatform, /Cinq composants\. Un seul flux PHP/);
    assert.match(demos, /Real code\. Public applications/);
    assert.match(demos, /href="\/demos\/book-reader"/);
    assert.match(demos, /href="\/demos\/movies-api"/);
    assert.match(frenchDemos, /Du code réel\. Des applications publiques/);
    assert.match(bookDemo, /The Last Lighthouse/);
    assert.match(chessDemo, /Tutor Chess/);
    assert.match(moviesDemo, /MovieRoute\.php/);
    assert.match(moviesDemo, /github\.com\/MR-C0DE\/phpaml-movies-api-demo/);
    assert.match(frenchMoviesDemo, /Ce que cette démo valide/);
    assert.match(news, /What changed\. Why it matters/);
    assert.match(news, /href="\/news\/phpaml-cli-1-7-beta-33"/);
    assert.match(news, /href="\/news\/phpaml-data-enters-alpha"/);
    assert.match(frenchNews, /Ce qui évolue\. Pourquoi ça compte/);
    assert.match(frenchNews, /href="\/fr\/news\/phpaml-cli-1-7-beta-33"/);
    assert.match(dataNews, /PHPAML Data enters alpha/);
    assert.match(dataNews, /aml install data --driver sqlite/);
    assert.match(dataNews, /property="og:image" content="https:\/\/phpaml\.com\/og-v3\.png"/);
    assert.match(frenchDataNews, /PHPAML Data entre en alpha/);
    assert.match(frenchDataNews, /Un noyau, plusieurs bases de données/);
    assert.match(frenchDataNews, /property="og:image" content="https:\/\/phpaml\.com\/og-v3\.png"/);
    assert.match(cliNews, /PHPAML CLI 1\.7 beta\.31 is available/);
    assert.match(cliNews, /aml create-view-app MyApp --empty/);
    assert.match(frenchCliNews, /PHPAML CLI 1\.7 beta\.31 est disponible/);
    assert.match(frenchCliNews, /aml create-view-app MonApp --empty/);
    assert.match(cli33News, /PHPAML CLI 1\.7 beta\.33 is available/);
    assert.match(cli33News, /aml serve --verbose/);
    assert.match(cli33News, /Console::log/);
    assert.match(frenchCli33News, /PHPAML CLI 1\.7 beta\.33 est disponible/);
    assert.match(frenchCli33News, /console serveur épurée/);
    assert.match(french, /Structurez PHP/);
    assert.match(french, /href="\/"/);
    assert.match(french, /aria-label="Navigation principale"/);
    assert.match(french, /Voyez le framework/);
    assert.match(french, /Explorer le code source/);
    assert.match(french, /phpaml-chess-tutor\.onrender\.com/);
    assert.match(french, /Cinq composants ciblés/);
    assert.match(docs, /Everything you need to/);
    assert.match(docs, /Complete reference/);
    assert.match(docsReference, /Official documentation/);
    assert.match(docsReference, /aml doctor --production --json/);
    assert.match(docsText, /aml deploy:configure production/);
    assert.match(docsReference, /public-html/);
    assert.match(docsReference, /sftp-only/);
    assert.match(docsReference, /deliverables/);
    assert.match(docsReference, /src\/views\/stylesheets/);
    assert.match(docsReference, /aml create-view my-interface/);
    assert.match(docsReference, /aml create-api my-api/);
    assert.match(docsReference, /aml create-console my-program/);
    assert.match(docsReference, /Four paths, a first result in under five minutes/);
    assert.match(docsReference, /Local reactivity for AML View/);
    assert.match(docsReference, /Typed persistence for MVC, View, API, or standalone PHP/);
    assert.match(docsReference, /src\/views/);
    assert.match(docsReference, /Four readable paths, one platform/);
    assert.match(docsReference, /routes\/WebApp\.php/);
    assert.match(docsReference, /runtime\/config\/app\.php/);
    assert.doesNotMatch(docsReference, /configs\/app\.php/);
    assert.match(download, /phpaml-1\.7\.0-beta\.43-windows-x64\.exe/);
    assert.match(download, /phpaml-1\.7\.0-beta\.43-macos-arm64\.pkg/);
    assert.match(download, /phpaml-1\.7\.0-beta\.43-linux-x64\.deb/);
    assert.match(download, /SHA-256/);
    assert.match(tutorial, /Official PHPAML tutorial/);
    assert.match(tutorial, /Master MVC/);
    assert.match(tutorial, /CHAPTER 18/);
    assert.match(tutorial, /Start with AML View/);
    assert.match(tutorial, /Understand AML Engine/);
    assert.match(tutorial, /Persist with PHPAML Data/);
    assert.match(frenchTutorial, /Tutoriel officiel PHPAML/);
    assert.match(frenchTutorial, /Maîtrisez MVC/);
    assert.match(frenchTutorial, /CHAPITRE 18/);
    assert.match(frenchTutorial, /Débuter avec AML View/);
    assert.match(frenchTutorial, /Comprendre AML Engine/);
    assert.match(frenchTutorial, /Persister avec PHPAML Data/);
    assert.match(tutorial, /href="\/tutorial\/01"/);
    assert.match(tutorial, /Coming soon/);
    assert.match(chapterOne, /Install AML and/);
    assert.match(chapterOne, /This chapter builds the right foundations/);
    assert.match(chapterOne, /Three different roles/);
    assert.match(chapterOne, /href="\/docs\/01\/installation"/);
    assert.match(frenchChapterOne, /Installer AML et/);
    assert.match(frenchChapterOne, /Ce chapitre construit de bonnes bases/);
    assert.match(frenchChapterOne, /Trois rôles différents/);
    assert.match(frenchChapterOne, /href="\/fr\/docs\/01\/installation"/);
    assert.match(tutorial, /href="\/tutorial\/02"/);
    assert.match(chapterTwo, /Understand the/);
    assert.match(chapterTwo, /runtime\/storage\/database\.sqlite/);
    assert.match(chapterTwo, /routes\/webapp\.php/);
    assert.match(chapterTwo, /src\/controllers/);
    assert.match(chapterTwo, /Follow a request/);
    assert.match(chapterTwo, /Understand before you start coding/);
    assert.match(chapterTwo, /A controller is a conductor/);
    assert.match(chapterTwo, /Understand, don&#x27;t memorize/);
    assert.match(frenchChapterTwo, /Comprendre la/);
    assert.match(frenchChapterTwo, /Le runtime géré par AML/);
    assert.match(frenchChapterTwo, /Correction et pièges/);
    assert.match(frenchChapterTwo, /Comprendre avant de commencer à coder/);
    assert.match(frenchChapterTwo, /Le contrôleur est un chef d’orchestre/);
    assert.match(tutorial, /href="\/tutorial\/03"/);
    assert.match(chapterThree, /Follow an/);
    assert.match(chapterThree, /GET \/books\/42/);
    assert.match(chapterThree, /A request crosses a pipeline/);
    assert.match(chapterThree, /HTTP is a conversation/);
    assert.match(chapterThree, /HTTP is stateless/);
    assert.match(chapterThree, /A response must be coherent/);
    assert.match(chapterThree, /Why should POST \/books\/42 return 405/);
    assert.match(frenchChapterThree, /Suivre une/);
    assert.match(frenchChapterThree, /Une requête traverse une chaîne/);
    assert.match(frenchChapterThree, /HTTP est un dialogue/);
    assert.match(frenchChapterThree, /Les en-têtes transportent le contexte/);
    assert.match(frenchChapterThree, /Une réponse doit être cohérente/);
    assert.match(frenchChapterThree, /Atelier guidé/);
    assert.match(tutorial, /href="\/tutorial\/04"/);
    assert.match(chapterFour, /Define and organize/);
    assert.match(chapterFour, /A route is a contract/);
    assert.match(chapterFour, /Seven routes, one coherent resource/);
    assert.match(chapterFour, /Build and test BookRoute/);
    assert.match(frenchChapterFour, /Définir et organiser/);
    assert.match(frenchChapterFour, /Une route est un contrat/);
    assert.match(frenchChapterFour, /Construisez et testez BookRoute/);
    assert.match(tutorial, /href="\/tutorial\/05"/);
    assert.match(chapterFive, /Build clear, testable/);
    assert.match(chapterFive, /Controllers orchestrate/);
    assert.match(frenchChapterFive, /Construire des contrôleurs/);
    assert.match(frenchChapterFive, /Le contrôleur orchestre/);
    assert.match(tutorial, /href="\/tutorial\/06"/);
    assert.match(chapterSix, /Create views/);
    assert.match(chapterSix, /Understand the role of a view/);
    assert.match(frenchChapterSix, /Créer les vues/);
    assert.match(frenchChapterSix, /Les données existent/);
    assert.match(frenchChapterSix, /En résumé/);
    assert.match(tutorial, /href="\/tutorial\/07"/);
    assert.match(chapterSeven, /Add CSS, JavaScript/);
    assert.match(chapterSeven, /Understand browser assets/);
    assert.match(frenchChapterSeven, /Ajouter CSS, JavaScript/);
    assert.match(frenchChapterSeven, /Une interface utile/);
    assert.match(frenchChapterSeven, /En résumé/);
    assert.match(tutorial, /href="\/tutorial\/08"/);
    assert.match(chapterEight, /Configure SQLite/);
    assert.match(chapterEight, /Why a database/);
    assert.match(frenchChapterEight, /Configurer SQLite/);
    assert.match(frenchChapterEight, /Une application qui oublie/);
    assert.match(frenchChapterEight, /En résumé/);
    assert.match(tutorial, /href="\/tutorial\/09"/);
    assert.match(chapterNine, /Create the/);
    assert.match(chapterNine, /Understand the model/);
    assert.match(frenchChapterNine, /Créer le modèle/);
    assert.match(frenchChapterNine, /La table existe/);
    assert.match(frenchChapterNine, /En résumé/);
    assert.match(tutorial, /href="\/tutorial\/10"/);
    assert.match(chapterTen, /Assemble the/);
    assert.match(chapterTen, /Connect without mixing/);
    assert.match(chapterTen, /Post\/Redirect\/Get/);
    assert.match(frenchChapterTen, /Assembler/);
    assert.match(frenchChapterTen, /Toutes les pièces existent/);
    assert.match(frenchChapterTen, /En résumé/);
  } finally {
    server.kill("SIGTERM");
  }
});
