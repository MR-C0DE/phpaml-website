import Link from "next/link";
import { CodeBlock, Footer, Header } from "./components";

type Locale = "en" | "fr";

const examples = {
  view: `final class Counter extends Page
{
    #[State] public int $count = 0;

    public function body(): View
    {
        return VStack(
            Heading('AML View')->size(42),
            Text(StateRef::to('count', $this->count)),
            Button('Add one')->onClick(
                ClientAction::increment('count')
            )
        )->gap(16);
    }
}`,
  data: `$users = $db->users()
    ->where('active', '=', true)
    ->orderBy('name')
    ->limit(20)
    ->all();

$db->transaction(function ($db) use ($lesson) {
    $db->lessons()->add($lesson);
    $db->saveChanges();
});`,
  engine: `#[Effect(
    dependencies: ['query'],
    debounce: 300,
    concurrency: 'latest'
)]
protected function search(): EffectPlan
{
    return Effects::run(
        ClientAction::set('loading', true)
    );
}

Button('Account')->onClick(
    Navigate('/account')
);`,
};

export function PlatformPage({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  return <><Header locale={locale} path="/platform" /><main className="platform-page">
    <section className="route-hero shell"><small>PHPAML PLATFORM</small><h1>{fr ? "Trois couches. Un seul flux PHP." : "Three layers. One PHP workflow."}</h1><p>{fr ? "AML View décrit l’interface, PHPAML Data conserve le domaine et AML Engine transforme le PHP déclaratif en interactions rapides dans le navigateur." : "AML View describes the interface, PHPAML Data persists the domain, and AML Engine turns declarative PHP into fast browser interactions."}</p><div className="route-actions"><Link className="button primary" href={fr ? "/fr/docs" : "/docs"}>{fr ? "Lire la documentation" : "Read the documentation"} →</Link><Link className="button ghost" href={fr ? "/fr/demos" : "/demos"}>{fr ? "Voir les démos" : "See the demos"} →</Link></div></section>
    <section className="platform-section"><div className="shell"><div className="platform-cards"><article><small>01</small><h3>AML View</h3><p>{fr ? "Pages déclaratives, composants, layouts, état réactif, propriétés calculées et effets." : "Declarative pages, components, layouts, reactive state, computed properties, and effects."}</p></article><article><small>02</small><h3>PHPAML Data</h3><p>{fr ? "Entités typées, requêtes, relations, migrations et transactions SQL ou MongoDB." : "Typed entities, queries, relations, migrations, and SQL or MongoDB transactions."}</p></article><article><small>03</small><h3>AML Engine</h3><p>{fr ? "Événements, collections et navigation client sans rechargement complet ni JavaScript manuel." : "Events, collections, and client navigation without full reloads or handwritten JavaScript."}</p></article></div><div className="platform-examples"><article><header><span>VIEW</span><strong>ReactiveCounter.php</strong></header><CodeBlock>{examples.view}</CodeBlock></article><article><header><span>DATA</span><strong>UserRepository.php</strong></header><CodeBlock>{examples.data}</CodeBlock></article><article><header><span>ENGINE</span><strong>SearchPage.php</strong></header><CodeBlock>{examples.engine}</CodeBlock></article></div></div></section>
  </main><Footer locale={locale} /></>;
}

const demos = [
  { slug: "book-reader", title: "The Last Lighthouse", stack: "Classic PHPAML MVC", description: { en: "A protected book reader with authentication, sessions, reading progress, CSRF protection, and automated tests.", fr: "Un lecteur protégé avec authentification, sessions, progression, protection CSRF et tests automatisés." }, tags: ["MVC", "Sessions", "CSRF", "PHP Views"] },
  { slug: "tutor-chess", title: "Tutor Chess", stack: "AML View + Data + Engine", description: { en: "A reactive chess mentor powered by Stockfish, DeepSeek coaching, MongoDB accounts, themes, and lesson memory.", fr: "Un mentor d’échecs réactif avec Stockfish, DeepSeek, comptes MongoDB, thèmes et mémoire des leçons." }, tags: ["AML View", "Stockfish 18", "DeepSeek", "MongoDB"] },
  { slug: "movies-api", title: "PHPAML Movies API", stack: "PHPAML REST API", description: { en: "A focused JSON API with resource routes, controllers, models, repositories, SQLite, CORS, pagination, and OpenAPI.", fr: "Une API JSON avec routes par ressource, contrôleurs, modèles, dépôts, SQLite, CORS, pagination et OpenAPI." }, tags: ["REST API", "SQLite", "OpenAPI", "PHPAML 1.7"] },
];

export function DemosPage({ locale }: { locale: Locale }) {
  const fr = locale === "fr"; const prefix = fr ? "/fr" : "";
  return <><Header locale={locale} path="/demos" /><main><section className="route-hero shell"><small>PHPAML DEMOS</small><h1>{fr ? "Du code réel. Des applications publiques." : "Real code. Public applications."}</h1><p>{fr ? "Chaque démonstration présente une architecture différente, une application en ligne et un dépôt GitHub complet à étudier." : "Each demonstration presents a different architecture, a live application, and a complete GitHub repository to study."}</p></section><section className="demo-catalog"><div className="shell demo-catalog-grid">{demos.map(demo => <Link className="demo-catalog-card" href={`${prefix}/demos/${demo.slug}`} key={demo.slug}><small>{demo.stack}</small><h2>{demo.title}</h2><p>{demo.description[locale]}</p><ul>{demo.tags.map(tag => <li key={tag}>{tag}</li>)}</ul><strong>{fr ? "Découvrir le projet" : "Explore the project"} →</strong></Link>)}</div></section></main><Footer locale={locale} /></>;
}

type DemoSlug = "book-reader" | "tutor-chess" | "movies-api";

const demoDetails = {
  "book-reader": {
    title: "The Last Lighthouse",
    stack: "CLASSIC PHPAML MVC",
    live: "https://phpaml-book-reader-demo.onrender.com",
    github: "https://github.com/MR-C0DE/phpaml-book-reader-demo",
    file: "ReaderController.php",
    label: "MVC",
    description: {
      en: "A book presentation with sign-in, a protected reader, and session-based reading progress.",
      fr: "Une présentation de livre avec connexion, lecteur protégé et progression conservée en session.",
    },
    validates: {
      en: "MVC routing, controllers, models, PHP views, sessions, validation, CSRF, redirects, and responsive UI.",
      fr: "Routage MVC, contrôleurs, modèles, vues PHP, sessions, validation, CSRF, redirections et interface responsive.",
    },
    features: ["PHPAML MVC", "PHP Views", "Sessions", "CSRF", "Automated tests"],
    code: `final class ReaderController
{
    public function read(Book $book): Response
    {
        Auth::requireUser();
        Session::put('chapter', $book->currentChapter());

        return view('reader/show', compact('book'));
    }
}`,
  },
  "tutor-chess": {
    title: "Tutor Chess", stack: "AML VIEW + DATA + ENGINE", live: "https://phpaml-chess-tutor.onrender.com", github: "https://github.com/MR-C0DE/phpaml-chess-tutor-demo", file: "CoachPage.php", label: "ENGINE",
    description: { en: "A chess mentor that analyzes every move, explains its decisions, and remembers the user’s lessons.", fr: "Un mentor d’échecs qui analyse chaque coup, explique ses décisions et conserve les leçons de l’utilisateur." },
    validates: { en: "Navigation without reloads, reactive state, themes, a chess engine, AI analysis, MongoDB authentication, and persistent history.", fr: "Navigation sans rechargement, état réactif, thèmes, moteur d’échecs, analyse IA, authentification MongoDB et historique persistant." },
    features: ["AML View", "PHPAML Data", "AML Engine", "MongoDB", "DeepSeek", "Stockfish 18"], code: examples.engine,
  },
  "movies-api": {
    title: "PHPAML Movies API", stack: "PHPAML REST API", live: "https://github.com/MR-C0DE/phpaml-movies-api-demo#endpoints", github: "https://github.com/MR-C0DE/phpaml-movies-api-demo", file: "MovieRoute.php", label: "API ROUTES",
    description: { en: "A read-only movie catalog API organized around explicit resource routes and a small, understandable backend.", fr: "Une API de catalogue de films en lecture seule, organisée autour de routes explicites et d’un backend facile à comprendre." },
    validates: { en: "Automatic route discovery, dependency injection, JSON responses, SQLite repositories, search, filters, pagination, CORS, errors, and OpenAPI.", fr: "Découverte automatique des routes, injection de dépendances, réponses JSON, dépôts SQLite, recherche, filtres, pagination, CORS, erreurs et OpenAPI." },
    features: ["PHPAML 1.7", "REST API", "Resource routes", "SQLite", "CORS", "OpenAPI 3.1"],
    code: `final class MovieRoute extends Route
{
    protected string $prefix = '/api/v1';

    protected function routes(): void
    {
        $this->get('/movies', [MovieController::class, 'index']);
        $this->get('/movies/{id}', [MovieController::class, 'show']);
        $this->get('/genres', [MovieController::class, 'genres']);
    }
}`,
  },
} as const;

export function DemoDetailPage({ locale, demo }: { locale: Locale; demo: DemoSlug }) {
  const fr = locale === "fr"; const prefix = fr ? "/fr" : ""; const details = demoDetails[demo]; const api = demo === "movies-api";
  return <><Header locale={locale} path={`/demos/${demo}`} /><main><section className="route-hero shell"><small>{details.stack}</small><h1>{details.title}</h1><p>{details.description[locale]}</p><div className="route-actions"><a className="button primary" href={details.live} target="_blank" rel="noreferrer">{api ? (fr ? "Voir les endpoints" : "View endpoints") : (fr ? "Ouvrir l’application" : "Open the live app")} ↗</a><a className="button ghost" href={details.github} target="_blank" rel="noreferrer">GitHub ↗</a><Link className="button ghost" href={`${prefix}/demos`}>{fr ? "Toutes les démos" : "All demos"} →</Link></div></section><section className="demo-detail shell"><div className="demo-detail-grid"><div className="demo-detail-copy"><h2>{fr ? "Ce que cette démo valide" : "What this demo validates"}</h2><p>{details.validates[locale]}</p><h2>Stack</h2><div className="demo-features">{details.features.map((item,index)=><span key={item}><b>0{index+1}</b>{item}</span>)}</div></div><div className="platform-examples"><article><header><span>{details.label}</span><strong>{details.file}</strong></header><CodeBlock>{details.code}</CodeBlock></article></div></div></section></main><Footer locale={locale} /></>;
}
