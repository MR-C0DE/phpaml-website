import Link from "next/link";
import { CodeBlock, Footer, Header } from "./components";
import { release } from "./release";

const copy = {
  en: {
    eyebrow: "PHP reorganized, not reinvented", title: <>Structure PHP.<br /><em>Keep control.</em></>,
    lead: "PHPAML brings the familiar structure of Java EE and ASP.NET to a readable, autonomous MVC mini-framework that is quick to learn.",
    download: "Download AML", docs: "Read the documentation", zero: "global dependencies", platforms: "platforms", command: "command",
    architecture: "An architecture you already understand", discipline: <>Enterprise discipline.<br /><span>Without the weight.</span></>,
    lifecycle: "An explicit request lifecycle, separated responsibilities, and stable folder conventions. You always know where to look.",
    essential: "Essential and complete", everything: <>Everything you need.<br /><span>Nothing hidden.</span></>,
    first: "First project", route: <>From zero to your<br />first route.</>,
    install: "AML installs its own environment. No PHP setup, no global Composer, and no system folders to manage.", guide: "Quick-start guide",
    ready: "Ready to build?", next: <>Your next project<br />starts with <code>aml create</code>.</>, installAml: "Install PHPAML", status: "pre-stable",
    features: [
      ["01", "Clear MVC", "Controllers, models, PHP views, and partials with no hidden magic."],
      ["02", "HTTP routing", "Dynamic parameters, named routes, and per-route middleware."],
      ["03", "Native injection", "A lightweight container automatically resolves typed dependencies."],
      ["04", "Built-in data tools", "PDO, a minimal QueryBuilder, and transactional migrations."],
      ["05", "Practical security", "CSRF, sessions, validation, escaping, and secure headers."],
      ["06", "Autonomous tooling", "Private PHP 8.4 and Composer runtimes, diagnostics, and updates."],
    ],
  },
  fr: {
    eyebrow: "PHP réorganisé, pas réinventé", title: <>Structurez PHP.<br /><em>Gardez le contrôle.</em></>,
    lead: "PHPAML reprend la structure familière de Java EE et ASP.NET dans un mini-framework MVC lisible, autonome et rapide à prendre en main.",
    download: "Télécharger AML", docs: "Lire la documentation", zero: "dépendance globale", platforms: "plateformes", command: "commande",
    architecture: "Une architecture qui vous parle déjà", discipline: <>La rigueur des grands.<br /><span>Sans leur poids.</span></>,
    lifecycle: "Un cycle de requête explicite, des responsabilités séparées et une convention de dossiers stable. Vous savez toujours où chercher.",
    essential: "Essentiel, complet", everything: <>Tout ce qu’il faut.<br /><span>Rien à cacher.</span></>,
    first: "Premier projet", route: <>De zéro à votre<br />première route.</>,
    install: "AML installe son propre environnement. Pas de configuration PHP, pas de Composer global, pas de dossier système à bricoler.", guide: "Guide de démarrage",
    ready: "Prêt à construire ?", next: <>Votre prochain projet<br />commence par <code>aml create</code>.</>, installAml: "Installer PHPAML", status: "pré-stable",
    features: [
      ["01", "MVC clair", "Contrôleurs, modèles, vues PHP et partials sans magie cachée."],
      ["02", "Routage HTTP", "Paramètres dynamiques, routes nommées et middlewares par route."],
      ["03", "Injection native", "Un conteneur léger résout automatiquement les dépendances typées."],
      ["04", "Données intégrées", "PDO, QueryBuilder minimal et migrations transactionnelles."],
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
      <CodeBlock>{`$ aml create ${project}\n✓ Official template verified\n\n$ cd ${project} && aml install\n✓ PHPAML installed in aml_env\n\n$ aml doctor\n✓ 13 checks passed\n\n$ aml serve\n→ http://localhost:8000`}</CodeBlock><div className="code-shadow" /><div className="floating-note">PHP + Composer<br /><strong>included</strong></div>
    </div></section>
    <section className="principle-strip"><div className="shell strip-grid"><span>PHP 8.2+</span><i /><span>MVC</span><i /><span>DI container</span><i /><span>PHP included</span></div></section>
    <section className="section shell"><div className="section-intro"><div className="section-number">/ 01</div><div><p className="kicker">{c.architecture}</p><h2>{c.discipline}</h2></div><p>{c.lifecycle}</p></div>
      <div className="architecture-flow"><div><small>01</small><strong>Request</strong><span>HTTP input</span></div><b>→</b><div><small>02</small><strong>Middleware</strong><span>Global pipeline</span></div><b>→</b><div><small>03</small><strong>Router</strong><span>Route + params</span></div><b>→</b><div><small>04</small><strong>Controller</strong><span>Injected action</span></div><b>→</b><div><small>05</small><strong>Response</strong><span>HTML or JSON</span></div></div>
    </section>
    <section className="section features-section"><div className="shell"><div className="section-intro compact"><div className="section-number">/ 02</div><div><p className="kicker">{c.essential}</p><h2>{c.everything}</h2></div></div><div className="feature-grid">{c.features.map(([n,t,d])=><article key={n}><small>{n}</small><h3>{t}</h3><p>{d}</p></article>)}</div></div></section>
    <section className="section shell quickstart"><div className="quick-copy"><div className="section-number">/ 03</div><p className="kicker">{c.first}</p><h2>{c.route}</h2><p>{c.install}</p><Link className="text-link" href={`${prefix}/docs#demarrage`}>{c.guide} <span>→</span></Link></div><CodeBlock>{`// configs/app.php\n'routes' => [\n    'GET /users/{id}' => [\n        'handler' => [UserController::class, 'show'],\n        'name' => 'users.show',\n    ],\n],`}</CodeBlock></section>
    <section className="cta-section"><div className="shell cta-content"><div><p className="kicker">{c.ready}</p><h2>{c.next}</h2></div><Link className="button light" href={`${prefix}/download`}>{c.installAml} <span>→</span></Link></div></section>
  </main><Footer locale={locale} /></>;
}

export default function Home() { return <HomePage locale="en" />; }
