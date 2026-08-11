import Link from "next/link";
import { CodeBlock, Footer, Header } from "./components";

const features = [
  ["01", "MVC clair", "Contrôleurs, modèles, vues PHP et partials sans magie cachée."],
  ["02", "Routage HTTP", "Paramètres dynamiques, routes nommées et middlewares par route."],
  ["03", "Injection native", "Un conteneur léger résout automatiquement les dépendances typées."],
  ["04", "Données intégrées", "PDO, QueryBuilder minimal et migrations transactionnelles."],
  ["05", "Sécurité utile", "CSRF, sessions, validation, échappement et en-têtes sécurisés."],
  ["06", "Outils autonomes", "PHP 8.4 et Composer privés, diagnostic et mise à jour intégrés."],
];

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <section className="hero shell">
          <div className="hero-copy">
            <div className="eyebrow"><span /> PHP réorganisé, pas réinventé <b>v1.3</b></div>
            <h1>Structurez PHP.<br /><em>Gardez le contrôle.</em></h1>
            <p className="hero-lead">
              PHPAML reprend la structure familière de Java EE et ASP.NET dans
              un mini-framework MVC lisible, autonome et rapide à prendre en main.
            </p>
            <div className="hero-actions">
              <Link className="button primary" href="/download">Télécharger AML <span>↓</span></Link>
              <Link className="button ghost" href="/docs">Lire la documentation <span>→</span></Link>
            </div>
            <div className="hero-proof">
              <span><strong>0</strong> dépendance globale</span>
              <span><strong>3</strong> plateformes</span>
              <span><strong>1</strong> commande</span>
            </div>
          </div>
          <div className="hero-code">
            <div className="version-pill"><span /> v1.3.0 · stable</div>
            <div className="terminal-label">01 / QUICK START</div>
            <CodeBlock>{`$ aml create mon-projet
✓ Official template verified

$ cd mon-projet && aml install
✓ PHPAML installed in aml_env

$ aml doctor
✓ 13 checks passed

$ aml serve
→ http://localhost:8000`}</CodeBlock>
            <div className="code-shadow" />
            <div className="floating-note">PHP + Composer<br /><strong>included</strong></div>
          </div>
        </section>

        <section className="principle-strip">
          <div className="shell strip-grid">
            <span>PHP 8.2+</span><i />
            <span>MVC</span><i />
            <span>DI container</span><i />
            <span>PHP inclus</span>
          </div>
        </section>

        <section className="section shell" id="philosophy">
          <div className="section-intro">
            <div className="section-number">/ 01</div>
            <div>
              <p className="kicker">Une architecture qui vous parle déjà</p>
              <h2>La rigueur des grands.<br /><span>Sans leur poids.</span></h2>
            </div>
            <p>
              Un cycle de requête explicite, des responsabilités séparées et une
              convention de dossiers stable. Vous savez toujours où chercher.
            </p>
          </div>

          <div className="architecture-flow" aria-label="Cycle d’une requête PHPAML">
            <div><small>01</small><strong>Request</strong><span>HTTP entrant</span></div>
            <b>→</b>
            <div><small>02</small><strong>Middleware</strong><span>Pipeline global</span></div>
            <b>→</b>
            <div><small>03</small><strong>Router</strong><span>Route + paramètres</span></div>
            <b>→</b>
            <div><small>04</small><strong>Controller</strong><span>Action injectée</span></div>
            <b>→</b>
            <div><small>05</small><strong>Response</strong><span>HTML ou JSON</span></div>
          </div>
        </section>

        <section className="section features-section">
          <div className="shell">
            <div className="section-intro compact">
              <div className="section-number">/ 02</div>
              <div>
                <p className="kicker">Essentiel, complet</p>
                <h2>Tout ce qu’il faut.<br /><span>Rien à cacher.</span></h2>
              </div>
            </div>
            <div className="feature-grid">
              {features.map(([number, title, text]) => (
                <article key={number}>
                  <small>{number}</small>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section shell quickstart">
          <div className="quick-copy">
            <div className="section-number">/ 03</div>
            <p className="kicker">Premier projet</p>
            <h2>De zéro à votre<br />première route.</h2>
            <p>
              AML installe son propre environnement. Pas de configuration PHP,
              pas de Composer global, pas de dossier système à bricoler.
            </p>
            <Link className="text-link" href="/docs#demarrage">Guide de démarrage <span>→</span></Link>
          </div>
          <CodeBlock>{`// configs/app.php
'routes' => [
    'GET /users/{id}' => [
        'handler' => [
            UserController::class,
            'show',
        ],
        'name' => 'users.show',
    ],
],`}</CodeBlock>
        </section>

        <section className="cta-section">
          <div className="shell cta-content">
            <div>
              <p className="kicker">Prêt à construire ?</p>
              <h2>Votre prochain projet<br />commence par <code>aml create</code>.</h2>
            </div>
            <Link className="button light" href="/download">Installer PHPAML <span>→</span></Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
