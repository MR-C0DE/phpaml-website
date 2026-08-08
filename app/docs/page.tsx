import Link from "next/link";
import { CodeBlock, Footer, Header } from "../components";

const topics = [
  ["Architecture", "MVC, cycle HTTP et injection de dépendances", "#architecture"],
  ["Commandes AML", "Créer, installer, diagnostiquer et servir", "#commandes"],
  ["Routes", "Paramètres, réponses et middlewares", "#routes"],
  ["Vues", "Partials, CSS, JavaScript et actualisation", "#vues"],
  ["Données", "PDO, validation, migrations et CSRF", "#donnees"],
  ["Production", "Tests, diagnostic et déploiement", "#production"],
];

export default function DocsPage() {
  return (
    <>
      <Header />
      <main>
        <section className="page-hero shell">
          <p className="eyebrow"><span /> Documentation officielle</p>
          <h1>Comprendre PHPAML.<br /><em>Construire sans deviner.</em></h1>
          <p>Guides pratiques et référence de l’environnement autonome AML 1.2.x.</p>
        </section>

        <section className="docs-layout shell">
          <aside>
            <strong>Sur cette page</strong>
            {topics.map(([title, , href]) => <a key={href} href={href}>{title}</a>)}
          </aside>
          <div className="docs-content">
            <section id="demarrage">
              <span className="doc-label">Démarrage rapide</span>
              <h2>Créer une application</h2>
              <p>AML télécharge le modèle officiel, vérifie son empreinte puis installe le moteur dans un environnement isolé.</p>
              <CodeBlock>{`aml create mon-projet
cd mon-projet
aml install
aml doctor
aml serve`}</CodeBlock>
              <p>Le site est disponible sur <code>http://localhost:8000</code>. Les modifications PHP, CSS, JS, HTML, JSON et SVG déclenchent l’actualisation du navigateur.</p>
            </section>

            <section id="architecture">
              <span className="doc-label">Concepts</span>
              <h2>Architecture du projet</h2>
              <div className="file-tree"><pre>{`mon-projet/
├── app/
│   ├── Controllers/
│   ├── Models/
│   ├── public/{css,js,img}/
│   └── views/partials/
├── configs/app.php
├── database/migrations/
├── tests/
├── aml_env/
└── index.php`}</pre></div>
              <p>Travaillez dans <code>app</code>, <code>configs</code>, <code>database</code> et <code>tests</code>. Le dossier <code>aml_env</code> contient le moteur et les dépendances ; il ne se modifie pas à la main.</p>
            </section>

            <section id="commandes">
              <span className="doc-label">CLI</span>
              <h2>Commandes essentielles</h2>
              <div className="command-list">
                {[['aml create .', 'Créer dans le dossier courant'], ['aml install', 'Installer moteur et dépendances'], ['aml doctor', 'Diagnostiquer environnement et projet'], ['aml routes', 'Afficher les routes'], ['aml test', 'Exécuter les tests'], ['aml update', 'Installer la dernière version']].map(([command, text]) => <div key={command}><code>{command}</code><span>{text}</span></div>)}
              </div>
            </section>

            <section id="routes">
              <span className="doc-label">HTTP</span>
              <h2>Routes et contrôleurs</h2>
              <CodeBlock>{`'GET /users/{id}' => [
    'handler' => [UserController::class, 'show'],
    'middleware' => [AuthMiddleware::class],
    'name' => 'users.show',
],`}</CodeBlock>
              <CodeBlock>{`public function show(Request $request): Response
{
    $id = $request->attribute('id');
    return $this->json(['id' => $id]);
}`}</CodeBlock>
            </section>

            <section id="vues">
              <span className="doc-label">Interface</span>
              <h2>Vues et fichiers publics</h2>
              <p>Le modèle fournit <code>header.php</code>, <code>footer.php</code>, <code>css/index.css</code>, <code>js/main.js</code> et <code>img/favicon.svg</code>.</p>
              <CodeBlock>{`<?php $this->partial('header.php') ?>
<h1><?= $this->escape($title) ?></h1>
<?php $this->partial('footer.php') ?>`}</CodeBlock>
            </section>

            <section id="donnees">
              <span className="doc-label">Persistance</span>
              <h2>Données et sécurité</h2>
              <p>La connexion PDO est injectable. Les migrations s’exécutent dans une transaction et la validation couvre les règles courantes.</p>
              <CodeBlock>{`aml make:migration create_users_table
aml migrate

$validator->validate($request->input(), [
    'email' => ['required', 'email'],
]);`}</CodeBlock>
              <p>Ajoutez <code>CsrfMiddleware</code> aux routes mutables et utilisez <code>$this-&gt;csrfField()</code> dans les formulaires.</p>
            </section>

            <section id="production">
              <span className="doc-label">Livraison</span>
              <h2>Avant la production</h2>
              <CodeBlock>{`aml install --production
aml doctor --json
aml routes
aml test`}</CodeBlock>
              <div className="notice"><strong>À savoir</strong><p><code>aml serve</code> est réservé au développement. Utilisez un serveur HTTP de production, HTTPS, <code>APP_DEBUG=false</code> et réalisez une revue de sécurité.</p></div>
            </section>

            <div className="docs-next">
              <span>Prêt à essayer ?</span>
              <Link href="/download">Choisir votre installateur →</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
