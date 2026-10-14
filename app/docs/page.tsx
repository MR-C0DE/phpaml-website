import Link from "next/link";
import { CodeBlock, Footer, Header } from "../components";
import "./onboarding.css";

type Locale = "en" | "fr";
const bookParts = {
  en: [
    { number: "PART 1", title: "Discover PHPAML", description: "Understand the platform, choose the right project type, and create a first runnable application.", chapters: [["01", "Get started", "#start"], ["02", "Architecture", "#architecture"], ["03", "Build a first application", "#first-application"]] },
    { number: "PART 2", title: "Build a Web application", description: "Learn the request lifecycle, MVC organization, configuration, persistence, and security.", chapters: [["04", "Forms, HTTP, and CRUD", "#forms"], ["05", "Views and assets", "#views"], ["06", "Environment", "#environment"], ["07", "Database", "#database"], ["08", "Security", "#security"]] },
    { number: "PART 3", title: "Create reactive interfaces", description: "Build declarative pages in PHP and understand what View and Engine each do.", chapters: [["09", "AML View", "#aml-view"], ["10", "AML Engine", "#aml-engine"], ["11", "Internationalization", "#i18n"]] },
    { number: "PART 4", title: "Use the platform modules", description: "Create APIs, persist typed data, or run pure PHP programs in the terminal.", chapters: [["12", "PHPAML API", "#api"], ["13", "PHPAML Data", "#data"], ["14", "Console", "#console"]] },
    { number: "PART 5", title: "Test and publish", description: "Use the CLI, diagnose problems, test, optimize, and deploy with confidence.", chapters: [["15", "CLI reference", "#cli"], ["16", "Tests and production", "#production"], ["17", "SEO toolkit", "#seo"], ["18", "Build and deploy", "#deployment"], ["19", "Troubleshooting", "#troubleshooting"]] },
  ],
  fr: [
    { number: "PARTIE 1", title: "Découvrir PHPAML", description: "Comprendre la plateforme, choisir le bon type de projet et créer une première application exécutable.", chapters: [["01", "Bien démarrer", "#start"], ["02", "Architecture", "#architecture"], ["03", "Construire une première application", "#first-application"]] },
    { number: "PARTIE 2", title: "Construire une application Web", description: "Apprendre le cycle d’une requête, le MVC, la configuration, la persistance et la sécurité.", chapters: [["04", "Formulaires, HTTP et CRUD", "#forms"], ["05", "Vues et fichiers", "#views"], ["06", "Environnement", "#environment"], ["07", "Base de données", "#database"], ["08", "Sécurité", "#security"]] },
    { number: "PARTIE 3", title: "Créer des interfaces réactives", description: "Construire des pages déclaratives en PHP et comprendre le rôle de View et celui d’Engine.", chapters: [["09", "AML View", "#aml-view"], ["10", "AML Engine", "#aml-engine"], ["11", "Internationalisation", "#i18n"]] },
    { number: "PARTIE 4", title: "Utiliser les modules de la plateforme", description: "Créer des API, persister des données typées ou exécuter des programmes PHP purs dans le terminal.", chapters: [["12", "PHPAML API", "#api"], ["13", "PHPAML Data", "#data"], ["14", "Console", "#console"]] },
    { number: "PARTIE 5", title: "Tester et publier", description: "Utiliser le CLI, diagnostiquer, tester, optimiser et déployer avec confiance.", chapters: [["15", "Référence CLI", "#cli"], ["16", "Tests et production", "#production"], ["17", "Outils SEO", "#seo"], ["18", "Build et déploiement", "#deployment"], ["19", "Dépannage", "#troubleshooting"]] },
  ],
};
const commands = {
  en: [["aml create .", "Create in the current folder"], ["aml create my-project", "Create a classic MVC application"], ["aml create-view my-ui", "Create an AML View application"], ["aml create-api my-api", "Create a JSON API"], ["aml create-console hello", "Create a pure PHP console program"], ["aml run", "Run the console program"], ["aml install", "Install runtime and dependencies"], ["aml serve", "Start from port 8910 with live reload"], ["aml routes", "List registered routes"], ["aml test", "Run project tests"], ["aml build", "Create a verified production archive"], ["aml deploy production --dry-run", "Preview the exact remote changes"], ["aml deploy:status production", "Compare local and production manifests"], ["aml deploy production", "Deploy only added and modified files"], ["aml deploy:history production", "Show the private local deployment history"], ["aml deploy:rollback production", "Restore the previous release"], ["aml make:controller User", "Generate a controller"], ["aml make:class Service", "Generate a plain PHP class"], ["aml make:model User", "Generate a plain model"], ["aml make:entity User", "Generate a persistent Data entity"], ["aml make:middleware Auth", "Generate middleware"], ["aml make:migration create_users_table", "Generate a migration"], ["aml env:init", "Create .env from .env.example"], ["aml env:list", "List variables and mask secrets"], ["aml env:get APP_DEBUG", "Read one variable"], ["aml env:set APP_DEBUG false", "Create or update one variable"], ["aml db:show", "Show database configuration"], ["aml doctor", "Check AML and the project"], ["aml cache:clear", "Clear application cache"], ["aml update --check", "Check for a new release"], ["aml update", "Install the latest release"], ["aml language fr", "Change the CLI language"]],
  fr: [["aml create .", "Créer dans le dossier courant"], ["aml create mon-projet", "Créer une application MVC classique"], ["aml create-view mon-ui", "Créer une application AML View"], ["aml create-api mon-api", "Créer une API JSON"], ["aml create-console bonjour", "Créer un programme console en PHP pur"], ["aml run", "Exécuter le programme console"], ["aml install", "Installer le runtime et les dépendances"], ["aml serve", "Démarrer à partir du port 8910 avec actualisation"], ["aml routes", "Afficher les routes"], ["aml test", "Exécuter les tests du projet"], ["aml build", "Créer une archive de production vérifiée"], ["aml deploy production --dry-run", "Prévisualiser précisément les changements distants"], ["aml deploy:status production", "Comparer les manifestes local et distant"], ["aml deploy production", "Déployer uniquement les fichiers utiles"], ["aml deploy:history production", "Afficher l’historique local privé"], ["aml deploy:rollback production", "Restaurer la version précédente"], ["aml make:controller User", "Générer un contrôleur"], ["aml make:class Service", "Générer une classe PHP simple"], ["aml make:model User", "Générer un modèle simple"], ["aml make:entity User", "Générer une entité Data persistante"], ["aml make:middleware Auth", "Générer un middleware"], ["aml make:migration create_users_table", "Générer une migration"], ["aml env:init", "Créer .env depuis .env.example"], ["aml env:list", "Lister les variables et masquer les secrets"], ["aml env:get APP_DEBUG", "Lire une variable"], ["aml env:set APP_DEBUG false", "Créer ou modifier une variable"], ["aml db:show", "Afficher la configuration de la base"], ["aml doctor", "Vérifier AML et le projet"], ["aml cache:clear", "Vider le cache"], ["aml update --check", "Chercher une nouvelle version"], ["aml update", "Installer la dernière version"], ["aml language en", "Changer la langue du CLI"]],
};
const commandRows = commands;

function AmlViewDocsSections({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  return <>
    <section id="aml-view">
      <span className="doc-label">13 — AML View</span>
      <h2>{fr ? "Construire une interface déclarative et réactive" : "Build a declarative, reactive interface"}</h2>
      <p>{fr ? "AML View est la couche frontend optionnelle de PHPAML. PHP rend le premier document, puis Engine gère localement l’état, les effets, les collections, les thèmes et la navigation." : "AML View is PHPAML’s optional frontend layer. PHP renders the first document, then Engine manages state, effects, collections, themes, and navigation locally."}</p>
      <CodeBlock>{`aml create-view ${fr ? "mon-interface" : "my-interface"}\ncd ${fr ? "mon-interface" : "my-interface"}\naml serve\n# http://127.0.0.1:8910`}</CodeBlock>
      <div className="file-tree"><pre>{`src/\n├── controllers/\n├── models/\n├── middleware/\n└── views/\n    ├── pages/{route}/page.php\n    ├── components/\n    ├── layouts/\n    ├── states/{Loading,Error,NotFound}.php\n    ├── stylesheets/\n    ├── themes/\n    └── assets/`}</pre></div>
      <p>{fr ? "src/views, src/controllers et src/models sont obligatoires. Les CSS sont collectés depuis src/views/stylesheets. Les ressources importées restent dans assets ; favicon, robots.txt et sitemap.xml restent dans public/." : "src/views, src/controllers, and src/models are required. CSS is collected from src/views/stylesheets. Imported assets stay in assets; favicon, robots.txt, and sitemap.xml stay in public/."}</p>
      <CodeBlock>{`use AML\\View\\{Page, State, View};\nuse function AML\\View\\{Button, Text, VStack, import};\n\nimport('pages/home.css');\n\nfinal class HomePage extends Page\n{\n    #[State]\n    private int $count = 0;\n\n    public function body(): View\n    {\n        return VStack(\n            Text('Count: {count}'),\n            Button('Add one')->onClick(fn () => $this->count++),\n        );\n    }\n}`}</CodeBlock>
      <p>{fr ? "Les propriétés #[State] se lisent et se modifient comme du PHP ordinaire. View compile les fermetures frontend prises en charge ; Engine exécute ensuite l’interaction dans le navigateur, sans requête serveur pour chaque clic. Les effets offrent dépendances, debounce, throttle, annulation latest et états loading/success/error." : "#[State] properties are read and changed like ordinary PHP. View compiles supported frontend closures; Engine then runs the interaction in the browser without a server request for every click. Effects provide dependencies, debounce, throttle, latest cancellation, and loading/success/error states."}</p>
      <div className="notice"><strong>{fr ? "Navigation sans rechargement" : "Navigation without reload"}</strong><p>{fr ? "Engine remplace uniquement la zone RouterView, conserve le document, met à jour l’historique, les métadonnées et le focus, puis utilise Loading, Error ou NotFound selon la réponse." : "Engine replaces only the RouterView boundary, preserves the document, updates history, metadata, and focus, then uses Loading, Error, or NotFound for the response state."}</p></div>
    </section>
    <section id="i18n">
      <span className="doc-label">14 — i18n</span>
      <h2>{fr ? "Internationalisation JSON" : "JSON internationalization"}</h2>
      <CodeBlock>{`aml install i18n\naml i18n:add es\naml i18n:list\naml i18n:check\naml i18n:missing fr\naml i18n:set-default en`}</CodeBlock>
      <p>{fr ? "Organisez librement les fichiers sous src/locales/{langue}. Le chemin devient une clé pointée, les paramètres utilisent :nom, les pluriels one/other utilisent le nombre et LocaleResolver choisit une langue supportée depuis la route, le cookie ou Accept-Language." : "Organize files freely under src/locales/{locale}. Paths become dotted keys, parameters use :name, one/other plural forms use the count, and LocaleResolver selects a supported locale from the route, cookie, or Accept-Language."}</p>
    </section>
  </>;
}

function PlatformModulesSections({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  return <>
    <section id="console">
      <span className="doc-label">02.3 — Console</span>
      <h2>{fr ? "Apprendre et exécuter du PHP sans application Web" : "Learn and run PHP without a Web application"}</h2>
      <p>{fr ? "Le parcours Console génère un programme PHP pur, strict et orienté objet. Il ne contient ni serveur HTTP, ni route, ni contrôleur, ni HTML. echo écrit dans le terminal, fgets() lit une saisie et la valeur retournée par main() devient le code de sortie." : "The Console path generates a pure, strict, object-oriented PHP program. It has no HTTP server, routes, controllers, or HTML. echo writes to the terminal, fgets() reads input, and the value returned by main() becomes the process exit code."}</p>
      <CodeBlock>{`aml create-console ${fr ? "bonjour" : "hello"}\ncd ${fr ? "bonjour" : "hello"}\naml run\naml run -- Andre\naml make:class Domain/User\naml test`}</CodeBlock>
      <CodeBlock>{`final class Program\n{\n    /** @param list<string> $arguments */\n    public static function main(array $arguments): int\n    {\n        $name = $arguments[0] ?? 'PHP';\n        echo "Hello, {$name}!\\n";\n        return 0;\n    }\n}`}</CodeBlock>
    </section>
    <section id="aml-engine">
      <span className="doc-label">13.1 — AML Engine</span>
      <h2>{fr ? "La réactivité locale utilisée par AML View" : "Local reactivity for AML View"}</h2>
      <p>{fr ? "Engine n’est pas un interpréteur PHP complet dans le navigateur. Il reçoit l’état initial et les instructions frontend produites par View, puis met à jour uniquement les nœuds concernés. Les affectations, calculs, conditions, collections, requêtes API et effets pris en charge peuvent ainsi rester exprimés en PHP côté auteur." : "Engine is not a complete PHP interpreter in the browser. It receives initial state and frontend instructions produced by View, then updates only the affected nodes. Supported assignments, calculations, conditions, collections, API requests, and effects can therefore remain expressed in PHP by the author."}</p>
      <CodeBlock>{`Button('Calculate')->onClick(function (): void {\n    $subtotal = $this->price * $this->quantity;\n    $this->total = $subtotal - $this->discount;\n});`}</CodeBlock>
      <div className="notice"><strong>{fr ? "Erreur utile en développement" : "Useful development errors"}</strong><p>{fr ? "En mode debug, les erreurs de compilation d’une fermeture frontend indiquent le fichier, la ligne et la construction non prise en charge. En production, les détails sensibles restent masqués." : "In debug mode, frontend-closure compilation errors identify the file, line, and unsupported construct. In production, sensitive details remain hidden."}</p></div>
    </section>
    <section id="api">
      <span className="doc-label">13.2 — API</span>
      <h2>{fr ? "Créer un service JSON sans couche de vues" : "Create a JSON service without a view layer"}</h2>
      <p>{fr ? "create-api prépare une structure dédiée aux contrôleurs, requêtes validées, ressources, dépôts, middlewares et routes par classe. Elle n’installe pas AML View : l’application répond en JSON et peut rester indépendante d’un frontend." : "create-api prepares a structure dedicated to controllers, validated requests, resources, repositories, middleware, and class-based routes. It does not install AML View: the application responds with JSON and can remain independent of a frontend."}</p>
      <CodeBlock>{`aml create-api ${fr ? "films-api" : "movies-api"}\ncd ${fr ? "films-api" : "movies-api"}\naml serve\naml routes\naml test`}</CodeBlock>
    </section>
    <section id="data">
      <span className="doc-label">13.3 — Data</span>
      <h2>{fr ? "Persistance typée pour MVC, View, API ou PHP autonome" : "Typed persistence for MVC, View, API, or standalone PHP"}</h2>
      <p>{fr ? "PHPAML Data est optionnel. make:model crée toujours une classe PHP simple ; make:entity crée une entité persistante après installation de Data. SQLite, MySQL, MariaDB et PostgreSQL sont couverts par la matrice de tests réelle. MongoDB reste fourni par un adaptateur alpha séparé." : "PHPAML Data is optional. make:model always creates a plain PHP class; make:entity creates a persistent entity after Data is installed. SQLite, MySQL, MariaDB, and PostgreSQL are covered by the real-database test matrix. MongoDB remains available through a separate alpha adapter."}</p>
      <CodeBlock>{`aml install data --driver sqlite\naml make:entity User\naml make:migration create_users_table\naml make:seeder UserSeeder\naml data:migrate\naml data:doctor`}</CodeBlock>
      <CodeBlock>{`#[Table('users')]\nfinal class User extends Entity\n{\n    #[Key]\n    public int $id;\n    public string $name;\n    public string $email;\n}`}</CodeBlock>
    </section>
  </>;
}

function ArchitectureSection({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  return <section id="architecture">
    <span className="doc-label">02 — Concepts</span>
    <h2>{fr ? "Quatre parcours lisibles, une même plateforme" : "Four readable paths, one platform"}</h2>
    <p>{fr ? "PHPAML sépare les responsabilités sans imposer de dossiers inutiles. Les applications classique et View utilisent src. Une API retire les vues et adopte une classe de route par ressource. Un programme Console conserve uniquement le PHP nécessaire à son exécution." : "PHPAML separates responsibilities without adding empty folders. Classic and View applications use src. An API removes views and uses one route class per resource. A Console program keeps only the PHP required to run it."}</p>
    <div className="architecture-variants">
      <div><small>{fr ? "APPLICATION CLASSIQUE" : "CLASSIC APPLICATION"}</small><div className="file-tree"><pre>{`src/
├── controllers/
├── models/
├── middleware/
├── routes/WebApp.php
└── views/
public/index.php`}</pre></div></div>
      <div><small>AML VIEW</small><div className="file-tree"><pre>{`src/
├── controllers/
├── models/
├── middleware/
├── locales/
└── views/
    ├── pages/
    ├── components/
    ├── layouts/
    ├── states/
    └── stylesheets/
routes/WebApp.php`}</pre></div></div>
      <div><small>API</small><div className="file-tree"><pre>{`src/
├── controllers/
├── models/
├── repositories/
├── requests/
├── resources/
├── middleware/
└── routes/
    └── MovieRoute.php
public/index.php`}</pre></div></div>
    </div>
    <h3>{fr ? "Configuration sans dossier configs" : "Configuration without a configs folder"}</h3>
    <p>{fr ? "Dans les nouveaux projets, phpaml.json contient les choix partageables et .env les secrets ou valeurs propres à la machine. PHPAML construit runtime/config/app.php automatiquement. Ce dernier appartient au moteur et ne doit jamais être édité." : "In new projects, phpaml.json stores shareable choices while .env stores secrets and machine-specific values. PHPAML builds runtime/config/app.php automatically. That generated file belongs to the runtime and must never be edited."}</p>
    <h3>{fr ? "Cycle d’une requête" : "Request lifecycle"}</h3>
    <ol className="doc-steps"><li><b>public/index.php</b> {fr ? "charge phpaml.json et .env." : "loads phpaml.json and .env."}</li><li>{fr ? "Les middlewares traitent la requête." : "Middleware processes the request."}</li><li>{fr ? "Le routeur découvre routes/ ou src/routes/." : "The router discovers routes/ or src/routes/."}</li><li>{fr ? "Le conteneur injecte les dépendances du contrôleur." : "The container injects controller dependencies."}</li><li>{fr ? "L’action retourne HTML, JSON ou une redirection." : "The action returns HTML, JSON, or a redirect."}</li></ol>
  </section>;
}

function PackageInstallSection({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  return <section id="packages">
    <span className="doc-label">02.2 — PACKAGIST</span>
    <h2>{fr ? "Installer les composants indépendamment" : "Install components independently"}</h2>
    <p>{fr ? "Les commandes de création AML configurent automatiquement les bons composants. Dans un projet Composer existant, déclarez ensemble les paquets en préversion qui collaborent afin que le projet racine autorise explicitement leur niveau de stabilité." : "AML creation commands configure the correct components automatically. In an existing Composer project, declare collaborating prerelease packages together so the root project explicitly accepts their stability level."}</p>
    <div className="command-pair"><div><small>AML VIEW + ENGINE</small><CodeBlock>{`composer require \\
  phpaml/view:^0.1@beta \\
  phpaml/engine:^0.1@beta`}</CodeBlock></div><div><small>DATA + MONGODB</small><CodeBlock>{`composer require \\
  phpaml/data:^0.2@alpha \\
  phpaml/data-mongodb:^0.1@alpha`}</CodeBlock></div></div>
    <p>{fr ? "Engine, Data et i18n peuvent aussi être installés seuls. L’adaptateur MongoDB nécessite l’extension PHP mongodb, tandis que Data SQL nécessite PDO." : "Engine, Data, and i18n can also be installed alone. The MongoDB adapter requires the PHP mongodb extension, while SQL Data requires PDO."}</p>
  </section>;
}

export function DocsReferencePage({ locale }: { locale: Locale }) {
  const fr = locale === "fr", prefix = fr ? "/fr" : "";
  const chapterHref = (number: string, anchor: string) => number === "01" ? `${prefix}/docs/01` : anchor;
  const tx = fr ? { label:"Documentation officielle", title:"Comprendre PHPAML.", accent:"Construire efficacement.", lead:"Guides pratiques et référence technique pour créer, tester et déployer des applications avec PHPAML.", nav:"Dans la documentation" } : { label:"Official documentation", title:"Understand PHPAML.", accent:"Build effectively.", lead:"Practical guides and technical reference for creating, testing, and deploying applications with PHPAML.", nav:"In the documentation" };
  return <><Header locale={locale} path="/docs" /><main>
    <section className="page-hero docs-book-hero shell"><p className="eyebrow"><span /> {tx.label}</p><h1>{tx.title}<br /><em>{tx.accent}</em></h1><p>{tx.lead}</p><div className="doc-stats"><span><strong>5</strong>{fr?" parties":" parts"}</span><span><strong>19</strong>{fr?" chapitres":" chapters"}</span><span><strong>EN / FR</strong>{fr?" documentation bilingue":" bilingual documentation"}</span></div></section>
    <section className="book-introduction shell" aria-labelledby="book-contents-title">
      <div className="book-introduction-copy"><p className="eyebrow"><span /> {fr ? "Documentation structurée" : "Structured documentation"}</p><h2 id="book-contents-title">{fr ? "Sommaire" : "Contents"}</h2><p>{fr ? "Lisez les chapitres dans l’ordre pour apprendre PHPAML progressivement, ou accédez directement à une partie lorsque vous recherchez une commande, un concept ou une solution précise." : "Read the chapters in order to learn PHPAML progressively, or open a part directly when you need a specific command, concept, or solution."}</p></div>
      <div className="book-parts">{bookParts[locale].map((part) => <article key={part.number} className="book-part"><div className="book-part-heading"><span>{part.number}</span><h3>{part.title}</h3><p>{part.description}</p></div><ol>{part.chapters.map(([number, title, href]) => <li key={href}><Link href={chapterHref(number, href)}><span>{number}</span>{title}<b aria-hidden="true">→</b></Link></li>)}</ol></article>)}</div>
    </section>
    <section className="docs-layout shell"><aside><strong>{tx.nav}</strong>{bookParts[locale].map((part) => <div className="docs-nav-part" key={part.number}><span>{part.number}</span>{part.chapters.map(([number, title, href]) => <Link key={href} href={chapterHref(number, href)}>{title}</Link>)}</div>)}</aside><div className="docs-content">
      <section id="start"><span className="doc-label">01 — {fr?"Démarrage":"Getting started"}</span><h2>{fr?"Quatre parcours, un premier résultat en moins de cinq minutes":"Four paths, a first result in under five minutes"}</h2><p>{fr?"AML inclut PHP et Composer, crée la structure choisie et installe automatiquement ses dépendances. Choisissez Classique pour MVC, View pour une interface réactive, API pour JSON ou Console pour apprendre et exécuter du PHP pur.":"AML bundles PHP and Composer, creates the selected structure, and installs its dependencies automatically. Choose Classic for MVC, View for a reactive interface, API for JSON, or Console to learn and run pure PHP."}</p><div className="onboarding-grid"><div><small>01 · {fr?"APPLICATION CLASSIQUE":"CLASSIC APPLICATION"}</small><CodeBlock>{`aml create ${fr?"mon-projet":"my-project"}\ncd ${fr?"mon-projet":"my-project"}\naml serve`}</CodeBlock></div><div><small>02 · AML VIEW</small><CodeBlock>{`aml create-view ${fr?"mon-interface":"my-interface"}\ncd ${fr?"mon-interface":"my-interface"}\naml serve`}</CodeBlock></div><div><small>03 · API</small><CodeBlock>{`aml create-api ${fr?"mon-api":"my-api"}\ncd ${fr?"mon-api":"my-api"}\naml serve`}</CodeBlock></div><div><small>04 · CONSOLE</small><CodeBlock>{`aml create-console ${fr?"mon-programme":"my-program"}\ncd ${fr?"mon-programme":"my-program"}\naml run`}</CodeBlock></div></div><p>{fr?"Pour les trois parcours Web, ouvrez ensuite":"For the three Web paths, then open"} <code>http://127.0.0.1:8910</code>. {fr?"Utilisez aml doctor pour vérifier l’environnement.":"Use aml doctor to verify the environment."}</p><div className="notice"><strong>{fr?"Installation automatique et actualisation":"Automatic installation and live reload"}</strong><p>{fr?"Les commandes de création préparent directement un projet exécutable. Le navigateur se recharge ensuite après chaque modification prise en charge.":"Creation commands produce a runnable project directly. The browser then reloads after each supported change."}</p></div></section>
      <ArchitectureSection locale={locale} />
      <PlatformModulesSections locale={locale} />
      <section id="migration"><span className="doc-label">02.1 — {fr?"Migration":"Migration"}</span><h2>{fr?"Passer de aml_env à runtime":"Move from aml_env to runtime"}</h2><p>{fr?"Les projets plus anciens utilisent aml_env, info.json ou app/View. La migration renomme aussi app/View en app/UI. Prévisualisez toujours la conversion avant de l’appliquer. AML crée une sauvegarde dans runtime/storage/migrations avant de renommer les éléments et d’actualiser les références connues.":"Older projects use aml_env, info.json, or app/View. The migration also renames app/View to app/UI. Always preview the conversion before applying it. AML creates a backup under runtime/storage/migrations before renaming files and updating known references."}</p><CodeBlock>{`aml migrate:structure\naml migrate:structure --apply --yes\naml doctor --offline\naml test`}</CodeBlock><div className="notice"><strong>{fr?"Sauvegarde automatique":"Automatic backup"}</strong><p><code>runtime/storage/migrations/structure-&lt;date&gt;/</code></p></div></section>
      <section id="cli"><span className="doc-label">03 — CLI</span><h2>{fr?"Référence des commandes AML":"AML command reference"}</h2><p>{fr?"Au premier lancement, AML demande English ou Français. Les sorties, diagnostics et erreurs suivent ce choix. AML_LANG=en ou AML_LANG=fr remplace temporairement la langue.":"On first launch, AML asks for English or French. Output, diagnostics, and errors follow that choice. AML_LANG=en or AML_LANG=fr temporarily overrides it."}</p><div className="command-reference">{commandRows[locale].map(([c,d])=><div key={c}><code>{c}</code><span>{d}</span></div>)}</div><h3>{fr?"Options utiles":"Useful options"}</h3><CodeBlock>{`aml create ${fr?"projet":"project"} --version 0.1.0\naml create ${fr?"projet":"project"} --offline\naml install --production\naml install --refresh\naml doctor --offline\naml doctor --port 8080\naml doctor --production --json\naml update --version 1.3.0`}</CodeBlock></section>
      <section id="http"><span className="doc-label">04 — HTTP & MVC</span><h2>{fr?"Routes, requêtes et contrôleurs":"Routes, requests, and controllers"}</h2><CodeBlock>{`'GET /users/{id}' => [\n    'handler' => [UserController::class, 'show'],\n    'middleware' => [AuthMiddleware::class],\n    'name' => 'users.show',\n],`}</CodeBlock><CodeBlock>{`public function show(Request $request): Response\n{\n    return $this->json(['id' => $request->attribute('id')]);\n}`}</CodeBlock><p>{fr?"Request fournit method(), path(), query(), input(), cookie(), header(), server() et attribute(). Le JSON est décodé automatiquement. Une route inconnue retourne 404 ; une mauvaise méthode retourne 405.":"Request provides method(), path(), query(), input(), cookie(), header(), server(), and attribute(). JSON is decoded automatically. An unknown route returns 404; an unsupported method returns 405."}</p><CodeBlock>{`return Response::html('<h1>Hello</h1>');\nreturn Response::json(['ok' => true], 201);\nreturn Response::redirect('/login');\nreturn $this->view('users/show.php', ['user' => $user]);`}</CodeBlock></section>
      <section id="views"><span className="doc-label">05 — UI</span><h2>{fr?"Vues déclaratives et ressources":"Declarative views and assets"}</h2><p>{fr?"Les applications classiques peuvent conserver leurs templates PHP et partials. Une application AML View place ses pages, composants, layouts et états dans src/views. Les feuilles de style sont découvertes automatiquement dans src/views/stylesheets, tandis que le moteur JavaScript est servi automatiquement par AML.":"Classic applications may keep PHP templates and partials. An AML View application places pages, components, layouts, and states in src/views. Stylesheets are discovered automatically under src/views/stylesheets, while AML serves the JavaScript engine automatically."}</p><CodeBlock>{`src/views/pages/home/page.php\nsrc/views/components/Navigation.php\nsrc/views/layouts/DashboardLayout.php\nsrc/views/stylesheets/pages/home.css\nassets/images/hero.webp\npublic/favicon.svg`}</CodeBlock></section>
      <section id="environment"><span className="doc-label">06 — ENV</span><h2>{fr?"Configurer .env en ligne de commande":"Configure .env from the command line"}</h2><CodeBlock>{`aml env:init\naml env:set APP_DEBUG false\naml env:get APP_DEBUG\naml env:list`}</CodeBlock><p>{fr?"env:init copie .env.example ; --force remplace un fichier existant. env:list masque mots de passe, secrets, clés et jetons. Ne publiez jamais .env dans Git.":"env:init copies .env.example; --force replaces an existing file. env:list masks passwords, secrets, keys, and tokens. Never commit .env to Git."}</p></section>
      <section id="database"><span className="doc-label">07 — Data</span><h2>{fr?"SQLite, MySQL et migrations":"SQLite, MySQL, and migrations"}</h2><p>{fr?"SQLite est la base locale par défaut. AML crée runtime/storage/database.sqlite et enregistre root/root par convention ; SQLite n’utilise pas réellement ces identifiants.":"SQLite is the default local database. AML creates runtime/storage/database.sqlite and records root/root by convention; SQLite does not actually use these credentials."}</p><CodeBlock>{`aml db:configure sqlite\naml db:configure sqlite --path storage/app.sqlite\naml db:show\n\naml db:configure mysql --host 127.0.0.1 --port 3306 \\\n  --database phpaml --user root --password root`}</CodeBlock><h3>{fr?"Migrations transactionnelles":"Transactional migrations"}</h3><CodeBlock>{`aml make:migration create_users_table\naml migrate
aml migrate:rollback --steps 1`}</CodeBlock><p>{fr?"Les migrations sont enregistrées dans aml_migrations. Les migrations sont ordonnées et verrouillées. migrate:rollback exécute down() en ordre inverse. Le QueryBuilder fournit all() et insert() ; utilisez PDO préparé pour le reste.":"Migrations are recorded in aml_migrations. Migrations are ordered and locked. migrate:rollback runs down() in reverse order. QueryBuilder provides all() and insert(); use prepared PDO for everything else."}</p></section>
      <section id="security"><span className="doc-label">08 — Security</span><h2>{fr?"Validation, CSRF et middleware":"Validation, CSRF, and middleware"}</h2><CodeBlock>{`$valid = $validator->validate($request->input(), [\n  'email' => ['required', 'email'],\n  'name' => ['required', 'string', 'min:2', 'max:100'],\n]);`}</CodeBlock><p>{fr?"Règles : required, email, string, min:n et max:n. Protégez les routes d’écriture avec CsrfMiddleware et ajoutez <?= $this->csrfField() ?> aux formulaires. Pour une API, utilisez X-CSRF-Token.":"Rules: required, email, string, min:n, and max:n. Protect write routes with CsrfMiddleware and add <?= $this->csrfField() ?> to forms. For an API, use X-CSRF-Token."}</p><p>{fr?"SecurityHeadersMiddleware ajoute les en-têtes de sécurité ; les détails d’erreur sont masqués avec APP_DEBUG=false.":"SecurityHeadersMiddleware adds security headers; error details are hidden when APP_DEBUG=false."}</p></section>
      <section id="production"><span className="doc-label">09 — Shipping</span><h2>{fr?"Tester et préparer la production":"Test and prepare for production"}</h2><CodeBlock>{`aml test\naml install --production\naml doctor --production --json\naml routes`}</CodeBlock><p>{fr?"aml test utilise le PHP privé d’AML et exécute tests/run.php. --production exclut les dépendances de développement et optimise l’autoloader.":"aml test uses AML's private PHP and runs tests/run.php. --production excludes development dependencies and optimizes the autoloader."}</p><div className="notice"><strong>{fr?"Important":"Important"}</strong><p>{fr?"aml serve est réservé au développement. En production : serveur HTTP compatible PHP, HTTPS, APP_DEBUG=false, permissions minimales, sauvegardes et authentification adaptée.":"aml serve is for development only. In production: a PHP-compatible HTTP server, HTTPS, APP_DEBUG=false, minimal permissions, backups, and appropriate authentication."}</p></div></section>
      <section id="troubleshooting"><span className="doc-label">10 — Support</span><h2>{fr?"Résoudre les problèmes fréquents":"Solve common problems"}</h2><div className="faq"><details open><summary>{fr?"La commande aml est introuvable":"The aml command is not found"}</summary><p>{fr?"Ouvrez un nouveau terminal et vérifiez PATH : %LOCALAPPDATA%\\Programs\\PHPAML\\bin sous Windows, /usr/local/bin sous macOS/Linux.":"Open a new terminal and check PATH: %LOCALAPPDATA%\\Programs\\PHPAML\\bin on Windows, /usr/local/bin on macOS/Linux."}</p></details><details><summary>{fr?"L’environnement AML est absent":"The AML environment is missing"}</summary><p>{fr?"Depuis la racine du projet, lancez aml install.":"From the project root, run aml install."}</p></details><details><summary>{fr?"CSS ou JavaScript ne se charge pas":"CSS or JavaScript does not load"}</summary><p>{fr?"Vérifiez /public/, les majuscules du fichier et lancez aml serve depuis le dossier contenant public/index.php.":"Check /public/, filename casing, and run aml serve from the folder containing public/index.php."}</p></details><details><summary>{fr?"Le port 8000 est occupé":"Port 8000 is busy"}</summary><p><code>aml doctor --port 8080</code><br/><code>aml serve 127.0.0.1:8080</code></p></details><details><summary>{fr?"GitHub est inaccessible":"GitHub is unavailable"}</summary><p>{fr?"Utilisez aml create projet --offline ou aml install --offline pour réutiliser le cache.":"Use aml create project --offline or aml install --offline to reuse the cache."}</p></details></div></section>
      <section id="seo"><span className="doc-label">11 — SEO</span><h2>{fr?"Piloter le SEO depuis AML":"Control SEO from AML"}</h2><p>{fr?"AML centralise les métadonnées, génère les fichiers destinés aux moteurs de recherche et audite le HTML publié.":"AML centralizes metadata, generates search-engine files, and audits the published HTML."}</p><CodeBlock>{`aml seo:init\naml seo:set base_url "https://example.com"\naml seo:set title "My website"\naml seo:set description "A clear description between 50 and 160 characters."\naml seo:disallow /admin\naml seo:allow /admin/public\naml seo:generate\naml seo:audit https://example.com --json`}</CodeBlock><p>{fr?"seo:generate crée public/sitemap.xml et public/robots.txt depuis les routes GET statiques. Les routes interdites sont retirées du sitemap. seo:audit vérifie le titre, la description, l’URL canonique, Open Graph, Twitter Cards, JSON-LD, la langue, le viewport, le H1, les images et HTTPS.":"seo:generate creates public/sitemap.xml and public/robots.txt from static GET routes. Disallowed routes are removed from the sitemap. seo:audit checks the title, description, canonical URL, Open Graph, Twitter Cards, JSON-LD, language, viewport, H1, images, and HTTPS."}</p><div className="notice"><strong>{fr?"Indexation et sécurité":"Indexing and security"}</strong><p>{fr?"Une règle disallow guide les robots, mais ne protège pas une page. Utilisez l’authentification et les middlewares pour les zones privées.":"A disallow rule guides crawlers but does not protect a page. Use authentication and middleware for private areas."}</p></div></section>
      <section id="deployment">
        <span className="doc-label">12 — Deploy</span>
        <h2>{fr?"Construire et déployer partout":"Build and deploy anywhere"}</h2>
        <p>{fr?"aml build exécute les tests, vérifie public/.htaccess et crée une archive ZIP, un manifeste et un checksum SHA-256 dans output/. Les secrets et éléments non exécutables sont exclus : .env, journaux, bases SQLite, tests, fichiers temporaires, output/ et deliverables/.":"aml build runs the tests, checks public/.htaccess, and creates a ZIP archive, manifest, and SHA-256 checksum in output/. Secrets and non-runtime material are excluded: .env, logs, SQLite databases, tests, temporary files, output/, and deliverables/."}</p>
        <CodeBlock>{`aml build\naml build --skip-tests\n\naml deploy:configure production --host example.com --user deploy \\\n  --path /home/deploy/site --port 22 --key ~/.ssh/id_ed25519\naml deploy:check production\naml deploy production --dry-run\naml deploy:status production\naml deploy production\naml deploy:history production\naml deploy:rollback production\naml deploy:prune production --keep 5`}</CodeBlock>
        <p>{fr?"Après le premier envoi, AML compare les empreintes SHA-256 et ne transfère que les fichiers ajoutés ou modifiés. Il retire les fichiers supprimés, affiche le volume transféré, l’économie obtenue et la progression jusqu’à l’activation. --dry-run et deploy:status restent strictement en lecture seule.":"After the first upload, AML compares SHA-256 fingerprints and transfers only added or modified files. It removes deleted files and reports transferred size, savings, and progress through activation. --dry-run and deploy:status remain strictly read-only."}</p>
        <CodeBlock>{`[ 25%] Comparison completed\n+ public/version.txt\n~ src/controllers/HomeController.php\n- public/obsolete.txt\nTransfer: 42.3 KB of 8.40 MB — 99.5% saved\n[100%] Deployment completed`}</CodeBlock>
        <h3>{fr?"Choisir une stratégie":"Choose a strategy"}</h3>
        <div className="command-list"><div><code>releases</code><span>{fr?"Versions horodatées, lien current et retour arrière atomique":"Timestamped releases, current symlink, and atomic rollback"}</span></div><div><code>public-html</code><span>{fr?"Hébergement mutualisé avec public_html séparé":"Shared hosting with a separate public_html"}</span></div><div><code>sftp-only</code><span>{fr?"Serveur sans accès shell SSH":"Server without SSH shell access"}</span></div></div>
        <CodeBlock>{`aml deploy:configure hostinger --host example.com --user deploy \\\n  --path /home/user/domains/example.com \\\n  --strategy public-html \\\n  --public-path /home/user/domains/example.com/public_html \\\n  --key ~/.ssh/id_ed25519`}</CodeBlock>
        <p>{fr?"Le profil privé est conservé dans ~/.phpaml/deploy.json et l’historique dans ~/.phpaml/deploy-history.json, tous deux avec des permissions 600. L’historique conserve au plus 100 résultats sans hôte, chemin, utilisateur ni secret.":"The private profile is stored in ~/.phpaml/deploy.json and history in ~/.phpaml/deploy-history.json, both with 600 permissions. History retains up to 100 results without storing the host, path, user, or secrets."}</p>
        <div className="notice"><strong>{fr?"Déploiement protégé":"Protected deployment"}</strong><p>{fr?"AML vérifie les checksums, refuse les chemins d’archive dangereux, écrit l’historique atomiquement et arrête l’aperçu si le manifeste distant est inaccessible.":"AML verifies checksums, rejects unsafe archive paths, writes history atomically, and stops previews when the remote manifest cannot be reached."}</p></div>
      </section>
      <div className="docs-next"><span>{fr?"Prêt à construire votre première application ?":"Ready to build your first application?"}</span><div className="docs-next-links"><Link href={`${prefix}/news/first-aml-view-app-in-five-minutes`}>{fr?"Suivre le guide AML View":"Follow the AML View guide"} →</Link><Link href={`${prefix}/download`}>{fr?"Installer AML":"Install AML"} →</Link></div></div>
      <PackageInstallSection locale={locale} />
      <AmlViewDocsSections locale={locale} />
    </div></section>
  </main><Footer locale={locale} /></>;
}

export function DocsPage({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const prefix = fr ? "/fr" : "";
  const destination = (number: string, anchor: string) => number === "01"
    ? `${prefix}/docs/01`
    : number === "02"
      ? `${prefix}/docs/02`
      : number === "03"
        ? `${prefix}/docs/03`
      : number === "04"
        ? `${prefix}/docs/04`
      : number === "05"
        ? `${prefix}/docs/05`
      : number === "06"
        ? `${prefix}/docs/06`
      : number === "07"
        ? `${prefix}/docs/07`
      : number === "08"
        ? `${prefix}/docs/08`
      : ["09", "10", "11", "12"].includes(number)
        ? `${prefix}/docs/${number}`
      : `${prefix}/docs/reference${anchor}`;

  return <><Header locale={locale} path="/docs" /><main className="docs-home">
    <section className="docs-home-hero shell">
      <p className="eyebrow"><span /> {fr ? "Documentation officielle" : "Official documentation"}</p>
      <div className="docs-home-hero-grid"><div><h1>{fr ? <>Tout ce qu’il faut pour<br/><em>construire avec PHPAML.</em></> : <>Everything you need to<br/><em>build with PHPAML.</em></>}</h1></div><div className="docs-home-intro"><p>{fr ? "Des explications progressives comme dans un bon manuel, avec la navigation et la rapidité d’une documentation Web." : "Progressive explanations like a good handbook, with the navigation and speed of Web documentation."}</p><div><Link className="button primary" href={`${prefix}/docs/01`}>{fr ? "Commencer" : "Get started"} <span>→</span></Link><Link className="docs-reference-link" href={`${prefix}/docs/reference`}>{fr ? "Référence complète" : "Complete reference"} ↗</Link></div></div></div>
    </section>

    <section className="docs-home-paths shell" aria-labelledby="docs-paths-title">
      <div className="docs-home-section-title"><p className="kicker">{fr ? "Choisir un parcours" : "Choose a path"}</p><h2 id="docs-paths-title">{fr ? "Quel projet voulez-vous créer ?" : "What do you want to build?"}</h2></div>
      <div className="docs-path-grid">
        <Link href={`${prefix}/docs/reference#start`}><span>01</span><strong>{fr ? "Application classique" : "Classic application"}</strong><p>{fr ? "Routes, contrôleurs, modèles et vues PHP." : "Routes, controllers, models, and PHP views."}</p><b>aml create</b></Link>
        <Link href={`${prefix}/docs/reference#aml-view`}><span>02</span><strong>AML View</strong><p>{fr ? "Interfaces réactives écrites directement en PHP." : "Reactive interfaces written directly in PHP."}</p><b>aml create-view</b></Link>
        <Link href={`${prefix}/docs/reference#api`}><span>03</span><strong>API</strong><p>{fr ? "Services JSON sans couche de vues." : "JSON services without a view layer."}</p><b>aml create-api</b></Link>
        <Link href={`${prefix}/docs/reference#console`}><span>04</span><strong>Console</strong><p>{fr ? "Programmes PHP purs exécutés dans le terminal." : "Pure PHP programs running in the terminal."}</p><b>aml create-console</b></Link>
      </div>
    </section>

    <section className="docs-home-contents shell" aria-labelledby="docs-contents-title">
      <div className="docs-home-section-title"><p className="kicker">{fr ? "Documentation structurée" : "Structured documentation"}</p><h2 id="docs-contents-title">{fr ? "Parcourir toutes les parties" : "Browse every part"}</h2><p>{fr ? "Suivez l’ordre proposé pour apprendre progressivement, ou ouvrez directement le sujet dont vous avez besoin." : "Follow the suggested order to learn progressively, or open the exact topic you need."}</p></div>
      <div className="docs-home-parts">{bookParts[locale].map((part) => <article key={part.number}><header><span>{part.number}</span><h3>{part.title}</h3><p>{part.description}</p></header><ol>{part.chapters.map(([number, title, anchor]) => <li key={anchor}><Link href={destination(number, anchor)}><span>{number}</span><strong>{title}</strong><b>→</b></Link></li>)}</ol></article>)}</div>
    </section>

    <section className="docs-home-footer shell"><div><p className="kicker">{fr ? "Vous cherchez une commande ?" : "Looking for a command?"}</p><h2>{fr ? "Accédez directement à la référence technique." : "Jump directly to the technical reference."}</h2></div><Link className="button primary" href={`${prefix}/docs/reference`}>{fr ? "Ouvrir la référence" : "Open reference"} <span>→</span></Link></section>
  </main><Footer locale={locale} /></>;
}

export default function Docs(){return <DocsPage locale="en"/>}
