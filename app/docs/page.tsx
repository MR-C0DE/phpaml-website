import Link from "next/link";
import { CodeBlock, Footer, Header } from "../components";

const topics = {
  en: [["Architecture", "#architecture"], ["AML commands", "#commandes"], ["Routes", "#routes"], ["Views", "#vues"], ["Data", "#donnees"], ["Production", "#production"]],
  fr: [["Architecture", "#architecture"], ["Commandes AML", "#commandes"], ["Routes", "#routes"], ["Vues", "#vues"], ["Données", "#donnees"], ["Production", "#production"]],
};

export function DocsPage({ locale }: { locale: "en" | "fr" }) {
  const fr=locale==="fr"; const prefix=fr?"/fr":"";
  const text = fr ? {
    label:"Documentation officielle", title:<>Comprendre PHPAML.<br /><em>Construire sans deviner.</em></>, lead:"Guides pratiques et référence de l’environnement autonome AML 1.3.x.", onPage:"Sur cette page",
    start:"Démarrage rapide", create:"Créer une application", createP:"AML télécharge le modèle officiel, vérifie son empreinte puis installe le moteur dans un environnement isolé.",
    arch:"Architecture du projet", archP:"Travaillez dans app, configs, database et tests. Le dossier aml_env contient le moteur et les dépendances ; il ne se modifie pas à la main.",
    commands:"Commandes essentielles", routes:"Routes et contrôleurs", views:"Vues et fichiers publics", data:"Données et sécurité", production:"Avant la production", ready:"Prêt à essayer ?", installer:"Choisir votre installateur",
  } : {
    label:"Official documentation", title:<>Understand PHPAML.<br /><em>Build without guessing.</em></>, lead:"Practical guides and reference for the autonomous AML 1.3.x environment.", onPage:"On this page",
    start:"Quick start", create:"Create an application", createP:"AML downloads the official template, verifies its checksum, then installs the engine in an isolated environment.",
    arch:"Project architecture", archP:"Work in app, configs, database, and tests. The aml_env directory contains the engine and dependencies; do not edit it manually.",
    commands:"Essential commands", routes:"Routes and controllers", views:"Views and public assets", data:"Data and security", production:"Before production", ready:"Ready to try it?", installer:"Choose your installer",
  };
  const commands = fr ? [["aml create .","Créer dans le dossier courant"],["aml install","Installer moteur et dépendances"],["aml doctor","Diagnostiquer environnement et projet"],["aml routes","Afficher les routes"],["aml test","Exécuter les tests"],["aml update","Installer la dernière version"]] : [["aml create .","Create in the current directory"],["aml install","Install engine and dependencies"],["aml doctor","Check the environment and project"],["aml routes","List routes"],["aml test","Run tests"],["aml update","Install the latest version"]];
  return <><Header locale={locale} path="/docs" /><main>
    <section className="page-hero shell"><p className="eyebrow"><span /> {text.label}</p><h1>{text.title}</h1><p>{text.lead}</p></section>
    <section className="docs-layout shell"><aside><strong>{text.onPage}</strong>{topics[locale].map(([t,h])=><a key={h} href={h}>{t}</a>)}</aside><div className="docs-content">
      <section id="demarrage"><span className="doc-label">{text.start}</span><h2>{text.create}</h2><p>{text.createP}</p><CodeBlock>{`aml create ${fr?"mon-projet":"my-project"}\ncd ${fr?"mon-projet":"my-project"}\naml install\naml doctor\naml serve`}</CodeBlock><p>{fr?"Le site est disponible sur":"The site is available at"} <code>http://localhost:8000</code>.</p></section>
      <section id="architecture"><span className="doc-label">{fr?"Concepts":"Concepts"}</span><h2>{text.arch}</h2><div className="file-tree"><pre>{`${fr?"mon-projet":"my-project"}/\n├── app/\n│   ├── Controllers/\n│   ├── Models/\n│   ├── public/{css,js,img}/\n│   └── views/partials/\n├── configs/app.php\n├── database/migrations/\n├── tests/\n├── aml_env/\n└── index.php`}</pre></div><p>{text.archP}</p></section>
      <section id="commandes"><span className="doc-label">CLI</span><h2>{text.commands}</h2><div className="command-list">{commands.map(([c,d])=><div key={c}><code>{c}</code><span>{d}</span></div>)}</div></section>
      <section id="routes"><span className="doc-label">HTTP</span><h2>{text.routes}</h2><CodeBlock>{`'GET /users/{id}' => [\n    'handler' => [UserController::class, 'show'],\n    'middleware' => [AuthMiddleware::class],\n    'name' => 'users.show',\n],`}</CodeBlock></section>
      <section id="vues"><span className="doc-label">UI</span><h2>{text.views}</h2><p>{fr?"Le modèle fournit les partials et les fichiers CSS, JavaScript et images nécessaires.":"The template provides partials and the required CSS, JavaScript, and image files."}</p><CodeBlock>{`<?php $this->partial('header.php') ?>\n<h1><?= $this->escape($title) ?></h1>\n<?php $this->partial('footer.php') ?>`}</CodeBlock></section>
      <section id="donnees"><span className="doc-label">{fr?"Persistance":"Persistence"}</span><h2>{text.data}</h2><p>{fr?"La connexion PDO est injectable. Les migrations sont transactionnelles et la validation couvre les règles courantes.":"The PDO connection is injectable. Migrations are transactional and validation covers common rules."}</p><CodeBlock>{`aml db:configure sqlite\naml make:migration create_users_table\naml migrate`}</CodeBlock></section>
      <section id="production"><span className="doc-label">{fr?"Livraison":"Shipping"}</span><h2>{text.production}</h2><CodeBlock>{`aml install --production\naml doctor --json\naml routes\naml test`}</CodeBlock><div className="notice"><strong>{fr?"À savoir":"Important"}</strong><p>{fr?"aml serve est réservé au développement. Utilisez HTTPS et APP_DEBUG=false en production.":"aml serve is for development only. Use HTTPS and APP_DEBUG=false in production."}</p></div></section>
      <div className="docs-next"><span>{text.ready}</span><Link href={`${prefix}/download`}>{text.installer} →</Link></div>
    </div></section>
  </main><Footer locale={locale} /></>;
}

export default function Docs() { return <DocsPage locale="en" />; }
