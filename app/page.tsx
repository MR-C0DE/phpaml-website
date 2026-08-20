import Link from "next/link";
import { CodeBlock, Footer, Header } from "./components";
import { release } from "./release";

const copy = {
  en: {
    eyebrow: "PHP reorganized, not reinvented", title: <>Structure PHP.<br /><em>Keep control.</em></>,
    lead: "PHPAML combines a readable autonomous MVC core with AML View, its optional declarative and reactive frontend for PHP.",
    download: "Download AML", docs: "Read the documentation", zero: "global dependencies", platforms: "platforms", command: "command",
    architecture: "An architecture you already understand", discipline: <>Enterprise discipline.<br /><span>Without the weight.</span></>,
    lifecycle: "An explicit request lifecycle, separated responsibilities, and stable folder conventions. You always know where to look.",
    essential: "Essential and complete", everything: <>Everything you need.<br /><span>Nothing hidden.</span></>,
    first: "First project", route: <>From zero to your<br />first route.</>,
    install: "AML installs its own environment. No PHP setup, no global Composer, and no system folders to manage.", guide: "Quick-start guide",
    demoLabel: "Built with classic PHPAML", demoTitle: <>See the framework.<br /><span>Read the result.</span></>,
    demoText: "The Last Lighthouse is a complete public demo built with PHPAML’s classic MVC architecture: routes, controller, model, PHP views, sessions, CSRF protection, redirects, and automated tests.",
    demoLive: "Open the live demo", demoCode: "Explore the source code", demoBook: "The Last Lighthouse", demoChapter: "Chapter 1 · The island at dusk",
    demoFeatures: ["Classic MVC", "Protected reader", "Session progress", "Responsive UI"],
    chessLabel: "Built with AML View + PHPAML Data", chessTitle: <>A reactive interface.<br /><span>A real application.</span></>,
    chessText: "Tutor Chess is the public reference project for AML View: client-side navigation, reactive state, themes, Stockfish analysis, DeepSeek coaching, MongoDB accounts, and persistent lesson history.",
    chessLive: "Open the live demo", chessCode: "Explore the source code", chessStart: "Run locally with AML", chessFeatures: ["AML View", "Stockfish 18", "DeepSeek tutor", "MongoDB history"],
    stackLabel: "The complete application platform", stackTitle: <>Three focused layers.<br /><span>One PHP workflow.</span></>,
    stackText: "Use each package independently or combine all three. View describes the interface, Data persists your domain, and Engine turns declarative PHP instructions into fast browser interactions.",
    stackItems: [
      ["01", "AML View", "Declarative pages, reusable components, layouts, reactive state, computed properties and effects."],
      ["02", "PHPAML Data", "Typed entities, expressive queries, relations, migrations and transactions for SQL and MongoDB."],
      ["03", "AML Engine", "Client-side state, events, collections and navigation without a full page reload or handwritten JavaScript."],
    ],
    ready: "Ready to build?", next: <>Your next interface<br />starts with <code>aml create-view-app</code>.</>, installAml: "Install PHPAML", status: "beta",
    features: [
      ["01", "Clear MVC", "Controllers, models, PHP views, and partials with no hidden magic."],
      ["02", "HTTP routing", "Dynamic parameters, named routes, and per-route middleware."],
      ["03", "Native injection", "A lightweight container automatically resolves typed dependencies."],
      ["04", "AML View", "Reactive state, effects, collections, themes, and client navigation in declarative PHP."],
      ["05", "Practical security", "CSRF, sessions, validation, escaping, and secure headers."],
      ["06", "Autonomous tooling", "Private PHP 8.4 and Composer runtimes, diagnostics, and updates."],
    ],
  },
  fr: {
    eyebrow: "PHP réorganisé, pas réinventé", title: <>Structurez PHP.<br /><em>Gardez le contrôle.</em></>,
    lead: "PHPAML combine un cœur MVC autonome et lisible avec AML View, son frontend déclaratif et réactif optionnel pour PHP.",
    download: "Télécharger AML", docs: "Lire la documentation", zero: "dépendance globale", platforms: "plateformes", command: "commande",
    architecture: "Une architecture qui vous parle déjà", discipline: <>La rigueur des grands.<br /><span>Sans leur poids.</span></>,
    lifecycle: "Un cycle de requête explicite, des responsabilités séparées et une convention de dossiers stable. Vous savez toujours où chercher.",
    essential: "Essentiel, complet", everything: <>Tout ce qu’il faut.<br /><span>Rien à cacher.</span></>,
    first: "Premier projet", route: <>De zéro à votre<br />première route.</>,
    install: "AML installe son propre environnement. Pas de configuration PHP, pas de Composer global, pas de dossier système à bricoler.", guide: "Guide de démarrage",
    demoLabel: "Construit avec PHPAML classique", demoTitle: <>Voyez le framework.<br /><span>Lisez le résultat.</span></>,
    demoText: "The Last Lighthouse est une démo publique complète construite avec l’architecture MVC classique de PHPAML : routes, contrôleur, modèle, vues PHP, sessions, protection CSRF, redirections et tests automatisés.",
    demoLive: "Ouvrir la démo", demoCode: "Explorer le code source", demoBook: "The Last Lighthouse", demoChapter: "Chapitre 1 · L’île au crépuscule",
    demoFeatures: ["MVC classique", "Lecture protégée", "Progression en session", "Interface responsive"],
    chessLabel: "Construit avec AML View + PHPAML Data", chessTitle: <>Une interface réactive.<br /><span>Une vraie application.</span></>,
    chessText: "Tutor Chess est le projet public de référence d’AML View : navigation côté client, état réactif, thèmes, analyse Stockfish, tutorat DeepSeek, comptes MongoDB et historique persistant des leçons.",
    chessLive: "Ouvrir la démo en ligne", chessCode: "Explorer le code source", chessStart: "Lancer localement avec AML", chessFeatures: ["AML View", "Stockfish 18", "Tuteur DeepSeek", "Historique MongoDB"],
    stackLabel: "La plateforme applicative complète", stackTitle: <>Trois couches ciblées.<br /><span>Un seul flux PHP.</span></>,
    stackText: "Utilisez chaque paquet séparément ou combinez les trois. View décrit l’interface, Data conserve votre domaine et Engine transforme les instructions PHP déclaratives en interactions rapides dans le navigateur.",
    stackItems: [
      ["01", "AML View", "Pages déclaratives, composants réutilisables, layouts, état réactif, propriétés calculées et effets."],
      ["02", "PHPAML Data", "Entités typées, requêtes expressives, relations, migrations et transactions pour SQL et MongoDB."],
      ["03", "AML Engine", "État, événements, collections et navigation côté client sans rechargement complet ni JavaScript manuel."],
    ],
    ready: "Prêt à construire ?", next: <>Votre prochaine interface<br />commence par <code>aml create-view-app</code>.</>, installAml: "Installer PHPAML", status: "bêta",
    features: [
      ["01", "MVC clair", "Contrôleurs, modèles, vues PHP et partials sans magie cachée."],
      ["02", "Routage HTTP", "Paramètres dynamiques, routes nommées et middlewares par route."],
      ["03", "Injection native", "Un conteneur léger résout automatiquement les dépendances typées."],
      ["04", "AML View", "État réactif, effets, collections, thèmes et navigation client en PHP déclaratif."],
      ["05", "Sécurité utile", "CSRF, sessions, validation, échappement et en-têtes sécurisés."],
      ["06", "Outils autonomes", "PHP 8.4 et Composer privés, diagnostic et mise à jour intégrés."],
    ],
  },
};

export function HomePage({ locale }: { locale: "en" | "fr" }) {
  const c = copy[locale]; const prefix = locale === "fr" ? "/fr" : "";
  const project = locale === "fr" ? "mon-projet" : "my-project";
  return <><Header locale={locale} /><main>
    <section className="hero shell"><div className="hero-copy">
      <div className="eyebrow"><span /> {c.eyebrow} <b>v{release.cliVersion}</b></div><h1>{c.title}</h1><p className="hero-lead">{c.lead}</p>
      <div className="hero-actions"><Link className="button primary" href={`${prefix}/download`}>{c.download} <span>↓</span></Link><Link className="button ghost" href={`${prefix}/docs`}>{c.docs} <span>→</span></Link></div>
      <div className="hero-proof"><span><strong>0</strong> {c.zero}</span><span><strong>3</strong> {c.platforms}</span><span><strong>1</strong> {c.command}</span></div>
    </div><div className="hero-code"><div className="version-pill"><span /> v{release.cliVersion} · {c.status}</div><div className="terminal-label">01 / QUICK START</div>
      <CodeBlock>{`$ aml create-view-app ${project}\n✓ AML View + Engine installed\n\n$ cd ${project}\n$ aml doctor\n✓ Diagnostics passed\n\n$ aml serve\n→ http://127.0.0.1:8910`}</CodeBlock><div className="code-shadow" /><div className="floating-note">PHP + Composer<br /><strong>included</strong></div>
    </div></section>
    <section className="principle-strip"><div className="shell strip-grid"><span>PHP 8.2+</span><i /><span>MVC</span><i /><span>DI container</span><i /><span>PHP included</span></div></section>
    <section className="section shell"><div className="section-intro"><div className="section-number">/ 01</div><div><p className="kicker">{c.architecture}</p><h2>{c.discipline}</h2></div><p>{c.lifecycle}</p></div>
      <div className="architecture-flow"><div><small>01</small><strong>Request</strong><span>HTTP input</span></div><b>→</b><div><small>02</small><strong>Middleware</strong><span>Global pipeline</span></div><b>→</b><div><small>03</small><strong>Router</strong><span>Route + params</span></div><b>→</b><div><small>04</small><strong>Controller</strong><span>Injected action</span></div><b>→</b><div><small>05</small><strong>Response</strong><span>HTML or JSON</span></div></div>
    </section>
    <section className="section features-section"><div className="shell"><div className="section-intro compact"><div className="section-number">/ 02</div><div><p className="kicker">{c.essential}</p><h2>{c.everything}</h2></div></div><div className="feature-grid">{c.features.map(([n,t,d])=><article key={n}><small>{n}</small><h3>{t}</h3><p>{d}</p></article>)}</div></div></section>
    <section className="section shell quickstart"><div className="quick-copy"><div className="section-number">/ 03</div><p className="kicker">{c.first}</p><h2>{c.route}</h2><p>{c.install}</p><Link className="text-link" href={`${prefix}/docs#demarrage`}>{c.guide} <span>→</span></Link></div><CodeBlock>{`// configs/app.php\n'routes' => [\n    'GET /users/{id}' => [\n        'handler' => [UserController::class, 'show'],\n        'name' => 'users.show',\n    ],\n],`}</CodeBlock></section>
    <section id="platform" className="platform-section"><div className="shell">
      <div className="platform-intro"><div className="section-number">/ 04</div><div><p className="kicker">{c.stackLabel}</p><h2>{c.stackTitle}</h2></div><p>{c.stackText}</p></div>
      <div className="platform-cards">{c.stackItems.map(([n,title,description])=><article key={title}><small>{n}</small><h3>{title}</h3><p>{description}</p></article>)}</div>
      <div className="platform-examples">
        <article><header><span>VIEW</span><strong>ReactiveCounter.php</strong></header><CodeBlock>{`final class Counter extends Page\n{\n    #[State] public int $count = 0;\n\n    public function body(): View\n    {\n        return VStack(\n            Heading('AML View')->size(42),\n            Text(StateRef::to('count', $this->count)),\n            Button('Add one')->onClick(\n                ClientAction::increment('count')\n            )\n        )->gap(16);\n    }\n}`}</CodeBlock></article>
        <article><header><span>DATA</span><strong>UserRepository.php</strong></header><CodeBlock>{`$users = $db->users()\n    ->where('active', '=', true)\n    ->orderBy('name')\n    ->limit(20)\n    ->all();\n\n$db->transaction(function ($db) use ($lesson) {\n    $db->lessons()->add($lesson);\n    $db->saveChanges();\n});`}</CodeBlock></article>
        <article><header><span>ENGINE</span><strong>SearchPage.php</strong></header><CodeBlock>{`#[Effect(\n    dependencies: ['query'],\n    debounce: 300,\n    concurrency: 'latest'\n)]\nprotected function search(): EffectPlan\n{\n    return Effects::run(\n        ClientAction::set('loading', true)\n    );\n}\n\nButton('Account')->onClick(\n    Navigate('/account')\n);`}</CodeBlock></article>
      </div>
    </div></section>
    <section id="demo" className="demo-section"><div className="shell demo-grid">
      <div className="demo-copy"><div className="section-number">/ 04</div><p className="kicker">{c.demoLabel}</p><h2>{c.demoTitle}</h2><p>{c.demoText}</p>
        <div className="demo-features">{c.demoFeatures.map((feature, index)=><span key={feature}><b>0{index + 1}</b>{feature}</span>)}</div>
        <div className="hero-actions"><a className="button primary" href="https://phpaml-book-reader-demo.onrender.com" target="_blank" rel="noreferrer">{c.demoLive} <span>↗</span></a><a className="button ghost" href="https://github.com/MR-C0DE/phpaml-book-reader-demo" target="_blank" rel="noreferrer">{c.demoCode} <span>↗</span></a></div>
      </div>
      <a className="demo-window" href="https://phpaml-book-reader-demo.onrender.com" target="_blank" rel="noreferrer" aria-label={c.demoLive}>
        <div className="demo-browser"><i /><i /><i /><small>phpaml-book-reader-demo.onrender.com</small></div>
        <div className="demo-reader"><aside><span>THE LAST<br />LIGHTHOUSE</span><div className="demo-lighthouse" /></aside><article><small>PHPAML MVC DEMO</small><h3>{c.demoBook}</h3><p>{c.demoChapter}</p><div className="demo-lines"><i /><i /><i /><i /></div><b>{c.demoLive} →</b></article></div>
      </a>
    </div></section>
    <section id="tutor-chess" className="chess-demo-section"><div className="shell chess-demo-grid">
      <a className="chess-window" href="https://phpaml-chess-tutor.onrender.com" target="_blank" rel="noreferrer" aria-label={c.chessLive}>
        <div className="chess-window-bar"><span>PHPAML / TUTOR CHESS</span><b>AML VIEW</b></div>
        <div className="chess-board">{["♜","♞","♝","♛","♚","♝","♞","♜","♟","♟","♟","♟","♟","♟","♟","♟","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","♙","♙","♙","♙","♙","♙","♙","♙","♖","♘","♗","♕","♔","♗","♘","♖"].map((piece,index)=><i className={index < 16 ? "black-piece" : index >= 48 ? "white-piece" : undefined} key={index}>{piece}</i>)}</div>
        <div className="chess-coach"><small>DEEPSEEK · TUTOR</small><strong>{locale === "fr" ? "Un bon coup. Maintenant, demandez-vous ce que votre adversaire menace." : "A good move. Now ask what your opponent is threatening."}</strong></div>
      </a>
      <div className="demo-copy chess-copy"><div className="section-number">/ 05</div><p className="kicker">{c.chessLabel}</p><h2>{c.chessTitle}</h2><p>{c.chessText}</p>
        <div className="demo-features">{c.chessFeatures.map((feature,index)=><span key={feature}><b>0{index + 1}</b>{feature}</span>)}</div>
        <div className="hero-actions"><a className="button primary" href="https://phpaml-chess-tutor.onrender.com" target="_blank" rel="noreferrer">{c.chessLive} <span>↗</span></a><a className="button ghost" href="https://github.com/MR-C0DE/phpaml-chess-tutor-demo" target="_blank" rel="noreferrer">{c.chessCode} <span>↗</span></a></div>
        <a className="text-link" href="https://github.com/MR-C0DE/phpaml-chess-tutor-demo#run-locally" target="_blank" rel="noreferrer">{c.chessStart} <span>→</span></a>
      </div>
    </div></section>
    <section className="cta-section"><div className="shell cta-content"><div><p className="kicker">{c.ready}</p><h2>{c.next}</h2></div><Link className="button light" href={`${prefix}/download`}>{c.installAml} <span>→</span></Link></div></section>
  </main><Footer locale={locale} /></>;
}

export default function Home() { return <HomePage locale="en" />; }
