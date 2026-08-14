import Link from "next/link";
import { CodeBlock, Footer, Header } from "../components";
import "./chapter-one.css";
import "./chapter-two.css";

const tree = `my-project/
├── app/
│   ├── Controllers/HomeController.php
│   ├── Models/HomeModel.php
│   ├── views/home.php
│   ├── views/partials/header.php
│   ├── views/partials/footer.php
│   └── public/{css,js,img}/
├── configs/app.php
├── database/migrations/
├── runtime/          # private engine
├── phpaml.json       # project manifest
├── public/index.php  # web entry point
└── .env`;

export function ChapterTwo({ locale }: { locale:"en"|"fr" }) {
  const fr=locale==="fr"; const prefix=fr?"/fr":"";
  const sections=fr?[
    ["02.1","Comprendre MVC","MVC divise l’application en responsabilités claires. Le modèle représente les données et les règles métier. Le contrôleur reçoit la requête et coordonne le travail. La vue produit le HTML envoyé au navigateur."],
    ["02.2","Contrôleurs et modèles","Les contrôleurs vivent dans app/Controllers. Les modèles vivent dans app/Models et concentrent l’accès aux données ainsi que la logique métier."],
    ["02.3","Vues et partials","Les vues PHP vivent dans app/views. Une page complète peut réutiliser app/views/partials/header.php et footer.php. La vue reçoit uniquement les données préparées par le contrôleur et échappe les sorties HTML."],
    ["02.4","Configuration de l’application","configs/app.php définit le nom, le mode debug, le chemin des vues, la base de données, les routes et les middlewares. Les secrets restent dans .env et sont lus avec Env."],
    ["02.5","Base de données et migrations","SQLite pointe par défaut vers runtime/storage/database.sqlite. Les migrations que vous écrivez restent dans database/migrations afin que la structure soit reproductible et versionnée."],
    ["02.6","Fichiers publics","CSS, JavaScript, images et favicon se trouvent dans public. public/index.php reçoit les requêtes web. Sur un hébergeur, seule la surface publique doit être exposée au navigateur."],
    ["02.7","Le runtime géré par AML","runtime contient le framework, l’autoloader, Composer, le stockage et les caches. phpaml.json identifie le projet et les versions attendues. AML génère et met à jour le runtime avec aml install."],
  ]:[
    ["02.1","Understand MVC","MVC divides the application into clear responsibilities. The model represents data and business rules. The controller receives the request and coordinates the work. The view produces the HTML sent to the browser."],
    ["02.2","Controllers and models","Controllers live in app/Controllers. Models live in app/Models and concentrate data access and business logic."],
    ["02.3","Views and partials","PHP views live in app/views. A complete page can reuse app/views/partials/header.php and footer.php. The view receives only data prepared by the controller and escapes HTML output."],
    ["02.4","Application configuration","configs/app.php defines the name, debug mode, view path, database, routes, and middleware. Secrets stay in .env and are read through Env."],
    ["02.5","Database and migrations","SQLite points to runtime/storage/database.sqlite by default. Migrations you write remain in database/migrations so the structure is reproducible and versioned."],
    ["02.6","Public files","CSS, JavaScript, images, and the favicon live in public. public/index.php receives web requests. On a host, only the public surface should be exposed to the browser."],
    ["02.7","The AML-managed runtime","runtime contains the framework, autoloader, Composer, storage, and caches. phpaml.json identifies the project and expected versions. AML generates and updates the runtime through aml install."],
  ];
  return <><Header locale={locale} path="/tutorial/02"/><main className="lesson-page architecture-lesson">
    <section className="lesson-hero shell"><div><p className="eyebrow"><span/> {fr?"Tutoriel MVC · Chapitre 02":"MVC tutorial · Chapter 02"}</p><h1>{fr?<>Comprendre la<br/><em>structure PHPAML.</em></>:<>Understand the<br/><em>PHPAML structure.</em></>}</h1><p>{fr?"Apprenez où placer chaque responsabilité et pourquoi l’application reste légère, lisible et séparée de son moteur privé.":"Learn where every responsibility belongs and why the application stays lightweight, readable, and separate from its private engine."}</p></div><aside><small>{fr?"OBJECTIF":"OUTCOME"}</small><strong>{fr?"Savoir où écrire chaque fichier":"Know where every file belongs"}</strong><span>≈ 30 min</span></aside></section>
    <section className="mvc-flow shell" aria-label={fr?"Flux MVC":"MVC flow"}><div><span>01</span><strong>Request</strong></div><b>→</b><div><span>02</span><strong>Controller</strong></div><b>→</b><div><span>03</span><strong>Model</strong></div><b>→</b><div><span>04</span><strong>View</strong></div><b>→</b><div><span>05</span><strong>Response</strong></div></section>
    <div className="lesson-layout shell"><nav className="lesson-toc" aria-label={fr?"Sommaire du chapitre":"Chapter contents"}><strong>{fr?"Dans ce chapitre":"In this chapter"}</strong>{sections.map(([id,title])=><a href={`#section-${id}`} key={id}><span>{id}</span>{title}</a>)}<a href="#exercise"><span>✓</span>{fr?"Exercice final":"Final exercise"}</a></nav><article className="lesson-content">
      <div className="lesson-callout"><strong>{fr?"Idée principale":"Core idea"}</strong><p>{fr?"Vous modifiez app, configs, database, public et .env. AML gère runtime. Cette frontière protège le moteur et garde la racine compréhensible.":"You edit app, configs, database, public, and .env. AML manages runtime. This boundary protects the engine and keeps the root understandable."}</p></div>
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

<?php require __DIR__ . '/partials/footer.php'; ?>`}</CodeBlock>}{index===3&&<CodeBlock>{`return [
    'debug' => Env::bool('APP_DEBUG', true),
    'views_path' => dirname(__DIR__) . '/app/views',
    'routes' => [
        'GET /' => ['handler' => [HomeController::class, 'index']],
    ],
];`}</CodeBlock>}{index===4&&<div className="architecture-note"><code>database/migrations/</code><span>{fr?"Vos migrations versionnées":"Your versioned migrations"}</span><code>runtime/storage/database.sqlite</code><span>{fr?"Base locale générée":"Generated local database"}</span></div>}{index===5&&<div className="public-map"><span>public/index.php</span><b>→</b><span>public/css/index.css</span><span>public/js/main.js</span><span>public/img/favicon.svg</span></div>}{index===6&&<div className="engine-boundary"><div><strong>{fr?"Vous modifiez":"You edit"}</strong><code>app/ · configs/ · database/ · .env</code></div><div><strong>{fr?"AML gère":"AML manages"}</strong><code>runtime/</code></div></div>}</section>)}
      <section className="lesson-exercise" id="exercise"><p className="kicker">{fr?"Exercice final":"Final exercise"}</p><h2>{fr?"Classez les responsabilités.":"Place each responsibility."}</h2><p>{fr?"Retrouvez le contrôleur, le modèle, la vue, les partials, le CSS, la configuration et SQLite. Expliquez le rôle de chacun.":"Locate the controller, model, view, partials, CSS, configuration, and SQLite. Explain the role of each."}</p><div className="lesson-check"><strong>{fr?"Chapitre réussi si…":"Chapter complete when…"}</strong><span>✓ MVC</span><span>✓ public</span><span>✓ runtime</span></div></section>
    </article></div>
    <section className="lesson-navigation shell"><Link href={`${prefix}/tutorial/01`}>← {fr?"Chapitre 01":"Chapter 01"}</Link><span>{fr?"Chapitre 03 · À venir":"Chapter 03 · Coming soon"} 🔒</span></section>
  </main><Footer locale={locale}/></>;
}
