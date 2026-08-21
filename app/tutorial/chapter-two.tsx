import Link from "next/link";
import { CodeBlock, Footer, Header } from "../components";
import "./chapter-one.css";
import "./chapter-two.css";

const tree = `my-project/
├── src/
│   ├── controllers/HomeController.php
│   ├── models/Home.php
│   └── views/
│       ├── home.php
│       └── partials/{header,footer}.php
├── routes/webapp.php
├── public/
│   ├── index.php
│   └── assets/{css,js,images}/
├── phpaml.json       # editable project configuration
├── runtime/          # generated engine, cache and storage
└── .env`;

export function ChapterTwo({ locale }: { locale:"en"|"fr" }) {
  const fr=locale==="fr"; const prefix=fr?"/fr":"";
  const sections=fr?[
    ["02.1","Comprendre MVC","MVC divise l’application en responsabilités claires. Le modèle représente les données et les règles métier. Le contrôleur reçoit la requête et coordonne le travail. La vue produit le HTML envoyé au navigateur."],
    ["02.2","Contrôleurs et modèles","Les contrôleurs vivent dans src/controllers. Les modèles vivent dans src/models et concentrent l’accès aux données ainsi que la logique métier. Les routes publiques sont déclarées séparément dans routes/webapp.php."],
    ["02.3","Vues et partials","Les vues PHP vivent dans src/views. Une page complète peut réutiliser src/views/partials/header.php et footer.php. La vue reçoit uniquement les données préparées par le contrôleur et échappe les sorties HTML."],
    ["02.4","Configuration de l’application","phpaml.json contient les réglages modifiables du projet. .env conserve les valeurs propres à la machine et les secrets. AML combine les deux pour générer sa configuration privée dans runtime."],
    ["02.5","Base de données et migrations","SQLite est conservée dans runtime/storage/database.sqlite. AML Data génère les migrations dans runtime/database/migrations lorsque le projet en a besoin."],
    ["02.6","Fichiers publics","public/index.php est l’unique point d’entrée PHP. Les ressources accessibles directement, comme CSS, JavaScript, images, favicon, robots.txt ou sitemap.xml, restent dans public. Sur un hébergeur, seul ce dossier doit être exposé."],
    ["02.7","Le runtime géré par AML","runtime contient le framework, l’autoloader, les dépendances, la configuration générée, le stockage et les caches. Ne modifiez pas son contenu manuellement : AML le crée et le met à jour avec aml install."],
  ]:[
    ["02.1","Understand MVC","MVC divides the application into clear responsibilities. The model represents data and business rules. The controller receives the request and coordinates the work. The view produces the HTML sent to the browser."],
    ["02.2","Controllers and models","Controllers live in src/controllers. Models live in src/models and concentrate data access and business logic. Public routes are declared separately in routes/webapp.php."],
    ["02.3","Views and partials","PHP views live in src/views. A complete page can reuse src/views/partials/header.php and footer.php. The view receives only data prepared by the controller and escapes HTML output."],
    ["02.4","Application configuration","phpaml.json contains the project settings developers may change. .env holds machine-specific values and secrets. AML combines both into private generated configuration inside runtime."],
    ["02.5","Database and migrations","SQLite is stored in runtime/storage/database.sqlite. AML Data generates migrations in runtime/database/migrations when the project needs them."],
    ["02.6","Public files","public/index.php is the only PHP entry point. Directly accessible resources such as CSS, JavaScript, images, favicon, robots.txt, and sitemap.xml stay in public. On a host, only this directory should be exposed."],
    ["02.7","The AML-managed runtime","runtime contains the framework, autoloader, dependencies, generated configuration, storage, and caches. Do not edit it manually: AML creates and updates it through aml install."],
  ];
  return <><Header locale={locale} path="/tutorial/02"/><main className="lesson-page architecture-lesson">
    <section className="lesson-hero shell"><div><p className="eyebrow"><span/> {fr?"Tutoriel MVC · Chapitre 02":"MVC tutorial · Chapter 02"}</p><h1>{fr?<>Comprendre la<br/><em>structure PHPAML.</em></>:<>Understand the<br/><em>PHPAML structure.</em></>}</h1><p>{fr?"Apprenez où placer chaque responsabilité et pourquoi l’application reste légère, lisible et séparée de son moteur privé.":"Learn where every responsibility belongs and why the application stays lightweight, readable, and separate from its private engine."}</p></div><aside><small>{fr?"OBJECTIF":"OUTCOME"}</small><strong>{fr?"Savoir où écrire chaque fichier":"Know where every file belongs"}</strong><span>≈ 30 min</span></aside></section>
    <section className="mvc-flow shell" aria-label={fr?"Flux MVC":"MVC flow"}><div><span>01</span><strong>Request</strong></div><b>→</b><div><span>02</span><strong>Controller</strong></div><b>→</b><div><span>03</span><strong>Model</strong></div><b>→</b><div><span>04</span><strong>View</strong></div><b>→</b><div><span>05</span><strong>Response</strong></div></section>
    <div className="lesson-layout shell"><nav className="lesson-toc" aria-label={fr?"Sommaire du chapitre":"Chapter contents"}><strong>{fr?"Dans ce chapitre":"In this chapter"}</strong>{sections.map(([id,title])=><a href={`#section-${id}`} key={id}><span>{id}</span>{title}</a>)}<a href="#exercise"><span>✓</span>{fr?"Exercice final":"Final exercise"}</a></nav><article className="lesson-content">
      <div className="lesson-callout"><strong>{fr?"Idée principale":"Core idea"}</strong><p>{fr?"Vous modifiez src, routes, public, phpaml.json et .env. AML gère runtime. Cette frontière protège le moteur et garde la racine compréhensible.":"You edit src, routes, public, phpaml.json, and .env. AML manages runtime. This boundary protects the engine and keeps the root understandable."}</p></div>
      <section className="project-tree"><div><p className="kicker">{fr?"Carte du projet":"Project map"}</p><h2>{fr?"Une place pour chaque responsabilité.":"One place for every responsibility."}</h2><p>{fr?"La structure du modèle officiel PHPAML.":"The official PHPAML template structure."}</p></div><CodeBlock>{tree}</CodeBlock></section>
      {sections.map(([id,title,body],index)=><section className="lesson-section" id={`section-${id}`} key={id}><span className="lesson-number">{id}</span><h2>{title}</h2><p>{body}</p>{index===0&&<div className="responsibility-grid"><div><small>M</small><strong>Model</strong><span>{fr?"Données et règles":"Data and rules"}</span></div><div><small>C</small><strong>Controller</strong><span>{fr?"Coordination":"Coordination"}</span></div><div><small>V</small><strong>View</strong><span>HTML</span></div></div>}{index===1&&<CodeBlock>{`namespace App\\Controllers;

final class HomeController
{
    public function index(): array
    {
        return ['message' => 'Hello PHPAML'];
    }
}`}</CodeBlock>}{index===2&&<CodeBlock>{`<?php require __DIR__ . '/partials/header.php'; ?>

<h1><?= htmlspecialchars($message) ?></h1>

<?php require __DIR__ . '/partials/footer.php'; ?>`}</CodeBlock>}{index===3&&<CodeBlock>{`{
  "name": "my-project",
  "application": {
    "type": "web",
    "debug": true
  },
  "runtime": {
    "directory": "runtime"
  }
}`}</CodeBlock>}{index===4&&<div className="architecture-note"><code>runtime/database/migrations/</code><span>{fr?"Migrations générées":"Generated migrations"}</span><code>runtime/storage/database.sqlite</code><span>{fr?"Base locale générée":"Generated local database"}</span></div>}{index===5&&<div className="public-map"><span>public/index.php</span><b>→</b><span>public/assets/css/app.css</span><span>public/assets/js/app.js</span><span>public/favicon.png</span></div>}{index===6&&<div className="engine-boundary"><div><strong>{fr?"Vous modifiez":"You edit"}</strong><code>src/ · routes/ · public/ · phpaml.json · .env</code></div><div><strong>{fr?"AML gère":"AML manages"}</strong><code>runtime/</code></div></div>}</section>)}
      <section className="lesson-exercise" id="exercise"><p className="kicker">{fr?"Exercice final":"Final exercise"}</p><h2>{fr?"Classez les responsabilités.":"Place each responsibility."}</h2><p>{fr?"Retrouvez le contrôleur, le modèle, la vue, les partials, le CSS, la configuration et SQLite. Expliquez le rôle de chacun.":"Locate the controller, model, view, partials, CSS, configuration, and SQLite. Explain the role of each."}</p><div className="lesson-check"><strong>{fr?"Chapitre réussi si…":"Chapter complete when…"}</strong><span>✓ MVC</span><span>✓ public</span><span>✓ runtime</span></div></section>
    </article></div>
    <section className="lesson-navigation shell"><Link href={`${prefix}/tutorial/01`}>← {fr?"Chapitre 01":"Chapter 01"}</Link><span>{fr?"Chapitre 03 · À venir":"Chapter 03 · Coming soon"} 🔒</span></section>
  </main><Footer locale={locale}/></>;
}
