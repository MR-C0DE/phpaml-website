import Link from "next/link";
import { CodeBlock, Footer, Header } from "../components";
import "./chapter-one.css";
import "./chapter-two.css";

const tree = `my-project/
├── src/
│   ├── controllers/HomeController.php
│   ├── models/Home.php
│   └── views/{pages,components}/
├── routes/webapp.php
├── public/index.php       # web entry point
├── phpaml.json            # editable settings
├── .env                   # local secrets
└── runtime/               # AML-managed engine
    ├── storage/database.sqlite
    └── database/migrations/`;

export function ChapterTwo({ locale }: { locale:"en"|"fr" }) {
  const fr=locale==="fr"; const prefix=fr?"/fr":"";
  const sections=fr?[
    ["02.1","Comprendre MVC","MVC divise l’application en responsabilités claires. Le modèle représente les données et les règles métier. Le contrôleur reçoit la requête et coordonne le travail. La vue produit le HTML envoyé au navigateur."],
    ["02.2","Contrôleurs et modèles","Les contrôleurs vivent dans src/controllers. Les modèles vivent dans src/models et concentrent l’accès aux données ainsi que la logique métier."],
    ["02.3","Vues et composants","Les vues vivent dans src/views. Les pages composent l’écran; les composants isolent les éléments réutilisables. Une vue reçoit les données préparées par le contrôleur."],
    ["02.4","Routes et configuration","routes/webapp.php relie les URL aux contrôleurs. phpaml.json contient les réglages modifiables du projet; les secrets restent dans .env. La configuration interne générée appartient au runtime."],
    ["02.5","Base de données et migrations","SQLite pointe par défaut vers runtime/storage/database.sqlite. Les migrations générées restent dans runtime/database/migrations afin que la structure soit reproductible et versionnée."],
    ["02.6","Surface publique","public/index.php reçoit les requêtes web. Les documents exigeant une URL directe, comme favicon, robots.txt ou sitemap.xml, peuvent rester dans public. Le code et les secrets n’y vont jamais."],
    ["02.7","Le runtime géré par AML","runtime contient le framework, l’autoloader, Composer, le stockage et les caches. phpaml.json identifie le projet et les versions attendues. AML génère et met à jour le runtime avec aml install."],
  ]:[
    ["02.1","Understand MVC","MVC divides the application into clear responsibilities. The model represents data and business rules. The controller receives the request and coordinates the work. The view produces the HTML sent to the browser."],
    ["02.2","Controllers and models","Controllers live in src/controllers. Models live in src/models and concentrate data access and business logic."],
    ["02.3","Views and components","Views live in src/views. Pages compose the screen; components isolate reusable elements. A view receives data prepared by the controller."],
    ["02.4","Routes and configuration","routes/webapp.php connects URLs to controllers. phpaml.json contains editable project settings; secrets stay in .env. Generated internal configuration belongs to the runtime."],
    ["02.5","Database and migrations","SQLite points to runtime/storage/database.sqlite by default. Generated migrations remain in runtime/database/migrations so the structure is reproducible and versioned."],
    ["02.6","Public surface","public/index.php receives web requests. Documents requiring a direct URL, such as favicon, robots.txt, or sitemap.xml, may stay in public. Code and secrets never belong there."],
    ["02.7","The AML-managed runtime","runtime contains the framework, autoloader, Composer, storage, and caches. phpaml.json identifies the project and expected versions. AML generates and updates the runtime through aml install."],
  ];
  return <><Header locale={locale} path="/tutorial/02"/><main className="lesson-page architecture-lesson">
    <section className="lesson-hero shell"><div><p className="eyebrow"><span/> {fr?"Tutoriel MVC · Chapitre 02":"MVC tutorial · Chapter 02"}</p><h1>{fr?<>Comprendre la<br/><em>structure PHPAML.</em></>:<>Understand the<br/><em>PHPAML structure.</em></>}</h1><p>{fr?"Apprenez où placer chaque responsabilité et pourquoi l’application reste légère, lisible et séparée de son moteur privé.":"Learn where every responsibility belongs and why the application stays lightweight, readable, and separate from its private engine."}</p></div><aside><small>{fr?"OBJECTIF":"OUTCOME"}</small><strong>{fr?"Savoir où écrire chaque fichier":"Know where every file belongs"}</strong><span>≈ 30 min</span></aside></section>
    <section className="mvc-flow shell" aria-label={fr?"Flux MVC":"MVC flow"}><div><span>01</span><strong>Request</strong></div><b>→</b><div><span>02</span><strong>Controller</strong></div><b>→</b><div><span>03</span><strong>Model</strong></div><b>→</b><div><span>04</span><strong>View</strong></div><b>→</b><div><span>05</span><strong>Response</strong></div></section>
    <div className="lesson-layout shell"><nav className="lesson-toc" aria-label={fr?"Sommaire du chapitre":"Chapter contents"}><strong>{fr?"Dans ce chapitre":"In this chapter"}</strong>{sections.map(([id,title])=><a href={`#section-${id}`} key={id}><span>{id}</span>{title}</a>)}<a href="#exercise"><span>✓</span>{fr?"Exercice final":"Final exercise"}</a></nav><article className="lesson-content">
      <div className="lesson-callout"><strong>{fr?"Idée principale":"Core idea"}</strong><p>{fr?"Vous travaillez principalement dans src, routes, phpaml.json et .env. AML gère runtime. Cette frontière protège le moteur et garde la racine compréhensible.":"You work mainly in src, routes, phpaml.json, and .env. AML manages runtime. This boundary protects the engine and keeps the root understandable."}</p></div>
      <section className="lesson-rich-block lesson-objectives"><p className="kicker">{fr?"Avant de parcourir les dossiers":"Before exploring folders"}</p><h2>{fr?"L’architecture est une carte de responsabilités.":"Architecture is a map of responsibilities."}</h2><p>{fr?"Une bonne structure ne sert pas à multiplier les dossiers. Elle répond rapidement à une question : où placer ce code pour qu’un autre développeur comprenne son rôle sans l’ouvrir ? PHPAML sépare donc l’entrée HTTP, les routes, la coordination, les règles métier, la présentation et l’infrastructure générée.":"A good structure is not designed to multiply folders. It quickly answers one question: where should this code live so another developer understands its role without opening it? PHPAML therefore separates the HTTP entry point, routes, coordination, business rules, presentation, and generated infrastructure."}</p><ul><li>{fr?"Une URL est déclarée dans routes/.":"A URL is declared in routes/."}</li><li>{fr?"Une action HTTP est coordonnée par un contrôleur.":"An HTTP action is coordinated by a controller."}</li><li>{fr?"Une règle métier appartient à un modèle ou un service.":"A business rule belongs in a model or service."}</li><li>{fr?"La présentation appartient à src/views.":"Presentation belongs in src/views."}</li></ul></section>
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

<?php require __DIR__ . '/partials/footer.php'; ?>`}</CodeBlock>}{index===3&&<><CodeBlock>{`use App\\Controllers\\HomeController;

Route::get('/', [HomeController::class, 'index']);`}</CodeBlock><CodeBlock>{`{
  "name": "my-project",
  "type": "webapp",
  "language": "en"
}`}</CodeBlock></>}{index===4&&<div className="architecture-note"><code>runtime/database/migrations/</code><span>{fr?"Migrations générées":"Generated migrations"}</span><code>runtime/storage/database.sqlite</code><span>{fr?"Base locale générée":"Generated local database"}</span></div>}{index===5&&<div className="public-map"><span>public/index.php</span><b>→</b><span>favicon.svg</span><span>robots.txt</span><span>sitemap.xml</span></div>}{index===6&&<div className="engine-boundary"><div><strong>{fr?"Vous modifiez":"You edit"}</strong><code>src/ · routes/ · phpaml.json · .env</code></div><div><strong>{fr?"AML gère":"AML manages"}</strong><code>runtime/</code></div></div>}</section>)}
      <section className="lesson-exercise" id="exercise"><p className="kicker">{fr?"Exercice final":"Final exercise"}</p><h2>{fr?"Classez les responsabilités.":"Place each responsibility."}</h2><p>{fr?"Retrouvez la route, le contrôleur, le modèle, la page, les composants, phpaml.json, .env et SQLite. Expliquez le rôle de chacun sans ouvrir runtime.":"Locate the route, controller, model, page, components, phpaml.json, .env, and SQLite. Explain each role without opening runtime."}</p><div className="lesson-check"><strong>{fr?"Chapitre réussi si…":"Chapter complete when…"}</strong><span>✓ MVC</span><span>✓ routes</span><span>✓ runtime</span></div></section>
      <section className="lesson-rich-block"><p className="kicker">{fr?"Suivre une requête":"Follow a request"}</p><h2>{fr?"De /movies à la réponse HTML.":"From /movies to the HTML response."}</h2><ol className="lesson-steps"><li><strong>public/index.php</strong><span>{fr?"reçoit la requête et démarre l’application.":"receives the request and boots the application."}</span></li><li><strong>routes/webapp.php</strong><span>{fr?"associe GET /movies à une méthode de contrôleur.":"maps GET /movies to a controller method."}</span></li><li><strong>src/controllers</strong><span>{fr?"valide l’entrée et demande les données nécessaires.":"validates input and requests the required data."}</span></li><li><strong>src/models</strong><span>{fr?"applique les règles métier et dialogue avec la persistance.":"applies business rules and communicates with persistence."}</span></li><li><strong>src/views</strong><span>{fr?"transforme les données préparées en interface.":"turns prepared data into an interface."}</span></li></ol><p>{fr?"Cette circulation est volontairement prévisible. Lorsqu’un écran affiche une mauvaise valeur, remontez le trajet : vue, contrôleur, modèle, puis source de données. Lorsqu’une URL ne répond pas, commencez par la route et non par le CSS.":"This flow is intentionally predictable. When a screen shows a wrong value, trace the path backward: view, controller, model, then data source. When a URL does not respond, begin with the route rather than the CSS."}</p></section>
      <section className="lesson-rich-block lesson-correction"><p className="kicker">{fr?"Correction et pièges":"Solution and pitfalls"}</p><h2>{fr?"Décidez par responsabilité, pas par habitude.":"Decide by responsibility, not habit."}</h2><div className="lesson-decision-grid"><div><strong>{fr?"Validation d’un formulaire":"Form validation"}</strong><span>src/controllers</span></div><div><strong>{fr?"Calcul d’un prix":"Price calculation"}</strong><span>src/models</span></div><div><strong>{fr?"Route GET /about":"GET /about route"}</strong><span>routes/webapp.php</span></div><div><strong>{fr?"Clé de base de données":"Database credential"}</strong><span>.env</span></div><div><strong>{fr?"Nom public du projet":"Public project name"}</strong><span>phpaml.json</span></div><div><strong>{fr?"Favicon direct":"Direct favicon"}</strong><span>public/</span></div></div><div className="lesson-warning"><strong>{fr?"Erreurs fréquentes":"Common mistakes"}</strong><p>{fr?"Ne placez pas une requête SQL dans une vue, un mot de passe dans phpaml.json ou une règle métier dans public/index.php. Ne modifiez pas runtime pour contourner un problème : corrigez la source du projet, puis laissez AML reconstruire l’infrastructure.":"Do not put an SQL query in a view, a password in phpaml.json, or a business rule in public/index.php. Do not edit runtime to work around a problem: fix the project source, then let AML rebuild the infrastructure."}</p></div><details><summary>{fr?"Mini-quiz : où placer un middleware ?":"Mini quiz: where does middleware belong?"}</summary><p>{fr?"Dans src/middleware lorsqu’il s’agit de code applicatif. La configuration générée correspondante reste interne au runtime.":"In src/middleware when it is application code. The corresponding generated configuration remains internal to the runtime."}</p></details></section>
    </article></div>
    <section className="lesson-navigation shell"><Link href={`${prefix}/tutorial/01`}>← {fr?"Chapitre 01":"Chapter 01"}</Link><span>{fr?"Chapitre 03 · À venir":"Chapter 03 · Coming soon"} 🔒</span></section>
  </main><Footer locale={locale}/></>;
}
