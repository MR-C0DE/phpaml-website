import Link from "next/link";
import { CodeBlock, Footer, Header } from "../components";
import "./chapter-one.css";
import "./chapter-two.css";

type Locale = "en" | "fr";
export type ChapterThreeLesson = "overview" | "creation" | "explorer" | "page" | "data" | "errors" | "workshop";

const order: ChapterThreeLesson[] = ["overview", "creation", "explorer", "page", "data", "errors", "workshop"];
const labels = {
  en: { overview: "The project", creation: "Create and run", explorer: "Explore the files", page: "Add a page", data: "Pass data", errors: "Understand errors", workshop: "Complete workshop" },
  fr: { overview: "Le projet", creation: "Créer et lancer", explorer: "Explorer les fichiers", page: "Ajouter une page", data: "Transmettre des données", errors: "Comprendre les erreurs", workshop: "Atelier complet" },
};
const descriptions = {
  en: { overview: "See what you will build", creation: "Start from the terminal", explorer: "Know where every file belongs", page: "Connect URL, controller, and view", data: "Display dynamic PHP values", errors: "Turn failures into useful clues", workshop: "Build a small reading list" },
  fr: { overview: "Voir ce que vous allez construire", creation: "Partir du terminal", explorer: "Savoir où ranger chaque fichier", page: "Relier URL, contrôleur et vue", data: "Afficher des valeurs PHP", errors: "Transformer les pannes en indices", workshop: "Construire une petite bibliothèque" },
};

function url(locale: Locale, lesson: ChapterThreeLesson) {
  const prefix = locale === "fr" ? "/fr" : "";
  return lesson === "overview" ? `${prefix}/docs/03` : `${prefix}/docs/03/${lesson}`;
}

function Nav({ locale, current }: { locale: Locale; current: ChapterThreeLesson }) {
  const fr = locale === "fr";
  return <nav className="chapter-one-nav" aria-label={fr ? "Pages du chapitre 3" : "Chapter 3 pages"}><div><small>{fr ? "CHAPITRE 03" : "CHAPTER 03"}</small><strong>{fr ? "Première application" : "First application"}</strong></div><ol>{order.map((item, index) => <li key={item} className={item === current ? "active" : ""}><Link href={url(locale, item)} aria-current={item === current ? "page" : undefined}><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{labels[locale][item]}</strong><small>{descriptions[locale][item]}</small></div></Link></li>)}</ol></nav>;
}

function Pager({ locale, current }: { locale: Locale; current: ChapterThreeLesson }) {
  const index = order.indexOf(current); const previous = order[index - 1]; const next = order[index + 1];
  return <nav className="chapter-one-pager"><Link href={previous ? url(locale, previous) : (locale === "fr" ? "/fr/docs/02" : "/docs/02")}>← {previous ? labels[locale][previous] : (locale === "fr" ? "Chapitre 02" : "Chapter 02")}</Link><Link href={next ? url(locale, next) : (locale === "fr" ? "/fr/docs/04" : "/docs/04")}>{next ? labels[locale][next] : (locale === "fr" ? "Chapitre 04" : "Chapter 04")} →</Link></nav>;
}

function Frame({ locale, lesson, title, intro, children }: { locale: Locale; lesson: ChapterThreeLesson; title: React.ReactNode; intro: string; children: React.ReactNode }) {
  const fr = locale === "fr";
  return <><Header locale={locale} path="/docs/03"/><main className="chapter-one-page"><header className="chapter-one-hero shell"><p className="eyebrow"><span/> {fr ? "Documentation · Chapitre 03" : "Documentation · Chapter 03"}</p><h1>{title}</h1><p>{intro}</p><p className="chapter-two-audience">{fr ? "Vous modifierez un seul élément à la fois, dans un fichier précisément indiqué, puis vous contrôlerez le résultat." : "You will change one element at a time, in an exact file, then verify the result."}</p></header><div className="chapter-one-layout shell"><Nav locale={locale} current={lesson}/><article className="chapter-one-article">{children}<Pager locale={locale} current={lesson}/></article></div></main><Footer locale={locale}/></>;
}

export function ChapterThreePage({ locale, lesson }: { locale: Locale; lesson: ChapterThreeLesson }) {
  const fr = locale === "fr";
  if (lesson === "overview") return <Frame locale={locale} lesson={lesson} title={fr ? <>Construire sa première<br/><em>application complète.</em></> : <>Build your first<br/><em>complete application.</em></>} intro={fr ? "Nous allons créer une petite bibliothèque personnelle en suivant réellement le trajet d’une requête PHPAML." : "We will create a small personal library while following the real path of a PHPAML request."}>
    <section className="chapter-one-lead"><span>≈ 70 min</span><h2>{fr ? "Un résultat visible, pas une suite de fragments." : "A visible result, not disconnected fragments."}</h2><p>{fr ? "À la fin, trois adresses fonctionneront : la page d’accueil déjà fournie, une page À propos et une page Livres. Vous saurez quel fichier reçoit l’adresse, quel fichier prépare les informations et quel fichier produit le HTML." : "At the end, three addresses will work: the provided home page, an About page, and a Books page. You will know which file receives the address, which prepares information, and which produces HTML."}</p></section>
    <section><h2>{fr ? "Le projet fil rouge" : "The running project"}</h2><CodeBlock>{"http://127.0.0.1:8910/\nhttp://127.0.0.1:8910/about\nhttp://127.0.0.1:8910/books"}</CodeBlock><p>{fr ? "Une adresse locale n’est visible que sur votre ordinateur. Elle permet de travailler sans publier le site sur Internet. Le nombre 8910 est le port : pensez-y comme à une porte réservée à votre serveur de développement." : "A local address is visible only on your computer. It lets you work without publishing the website. The number 8910 is the port: think of it as a door reserved for your development server."}</p></section>
    <section><h2>{fr ? "La chaîne que vous allez construire" : "The chain you will build"}</h2><div className="architecture-flow"><Box n="1" title="URL" text="/books"/><b>→</b><Box n="2" title={fr ? "Route" : "Route"} text="WebApp.php"/><b>→</b><Box n="3" title={fr ? "Contrôleur" : "Controller"} text="BookController"/><b>→</b><Box n="4" title={fr ? "Vue" : "View"} text="books.php"/></div><p>{fr ? "Chaque flèche signifie simplement « passe le travail à l’étape suivante ». Si une page échoue, cette carte vous permet de chercher au bon endroit." : "Each arrow simply means “pass the work to the next step.” If a page fails, this map tells you where to look."}</p></section>
    <Vocabulary fr={fr} items={fr ? [["Route", "Règle qui associe une adresse à une action."], ["Contrôleur", "Classe PHP qui organise ce qu’il faut faire."], ["Vue", "Fichier PHP chargé de produire la page HTML."], ["Modèle", "Objet qui représente des informations ou une règle du domaine."]] : [["Route", "Rule connecting an address to an action."], ["Controller", "PHP class organizing what must happen."], ["View", "PHP file responsible for producing the HTML page."], ["Model", "Object representing information or a domain rule."]]}/>
    <Summary fr={fr} points={fr ? ["Nous construisons une application classique MVC.", "Chaque page suit URL → route → contrôleur → vue.", "Le navigateur ne lit jamais directement vos classes PHP.", "Chaque étape sera vérifiée avant la suivante."] : ["We are building a classic MVC application.", "Every page follows URL → route → controller → view.", "The browser never reads your PHP classes directly.", "Every step is checked before moving on."]}/>
  </Frame>;

  if (lesson === "creation") return <Frame locale={locale} lesson={lesson} title={fr ? <>Créer puis lancer<br/><em>le projet.</em></> : <>Create and run<br/><em>the project.</em></>} intro={fr ? "Le terminal indique où créer les fichiers et AML prépare une application immédiatement exécutable." : "The terminal tells AML where to create the files, and AML prepares an immediately runnable application."}>
    <section><h2>{fr ? "1. Choisissez le dossier parent" : "1. Choose the parent folder"}</h2><p>{fr ? "Le dossier parent est l’endroit qui contiendra votre nouveau projet. Ici, nous utilisons le Bureau. La commande cd signifie change directory, c’est-à-dire « entre dans ce dossier »." : "The parent folder is the place that will contain your new project. Here we use the Desktop. The cd command means change directory."}</p><CodeBlock>{"cd ~/Desktop"}</CodeBlock></section>
    <section><h2>{fr ? "2. Créez l’application" : "2. Create the application"}</h2><CodeBlock>{"aml create reading-list"}</CodeBlock><p>{fr ? "aml create choisit le modèle d’application classique. reading-list devient à la fois le nom du dossier et celui du projet. AML télécharge le modèle compatible, installe l’environnement et prépare les dépendances; il ne faut normalement pas lancer aml install juste après." : "aml create selects the classic application template. reading-list becomes both the folder and project name. AML downloads the compatible template, installs the environment, and prepares dependencies; normally you do not run aml install immediately afterward."}</p><Note title={fr ? "Attendez le message de réussite" : "Wait for the success message"}>{fr ? "Ne continuez pas si la création se termine par Error. Corrigez d’abord la première erreur affichée, puis recommencez avec un dossier vide." : "Do not continue if creation ends with Error. Fix the first displayed error, then retry with an empty folder."}</Note></section>
    <section><h2>{fr ? "3. Entrez dans le projet et démarrez" : "3. Enter the project and start"}</h2><CodeBlock>{"cd reading-list\naml serve"}</CodeBlock><p>{fr ? "La première ligne déplace le terminal dans le projet. La seconde lance le serveur local. Gardez ce terminal ouvert : tant que aml serve fonctionne, il écoute les requêtes du navigateur." : "The first line moves the terminal into the project. The second starts the local server. Keep this terminal open: while aml serve is running, it listens for browser requests."}</p><CodeBlock>{"PHPAML is listening at http://127.0.0.1:8910\nUse Ctrl+C to stop the server."}</CodeBlock></section>
    <section><h2>{fr ? "4. Vérifiez avant de modifier" : "4. Verify before editing"}</h2><ol><li>{fr ? "Ouvrez http://127.0.0.1:8910 dans le navigateur." : "Open http://127.0.0.1:8910 in the browser."}</li><li>{fr ? "Confirmez que la page d’accueil apparaît." : "Confirm that the home page appears."}</li><li>{fr ? "Revenez au terminal et vérifiez qu’aucune erreur rouge n’est affichée." : "Return to the terminal and verify that no red error is displayed."}</li></ol><p>{fr ? "Cette vérification crée un point de référence : si une panne arrive après votre prochaine modification, vous savez qu’elle vient probablement de cette modification." : "This check creates a reference point: if a failure happens after your next change, you know it probably comes from that change."}</p></section>
    <Checkpoint fr={fr} question={fr ? "Pourquoi garder aml serve ouvert ?" : "Why keep aml serve running?"} answer={fr ? "Parce qu’il joue le rôle du serveur. Sans lui, le navigateur ne peut pas demander à PHPAML d’exécuter votre application." : "Because it acts as the server. Without it, the browser cannot ask PHPAML to run your application."}/>
  </Frame>;

  if (lesson === "explorer") return <Frame locale={locale} lesson={lesson} title={fr ? <>Comprendre les fichiers<br/><em>sans se perdre.</em></> : <>Understand the files<br/><em>without getting lost.</em></>} intro={fr ? "Vous n’avez pas besoin de connaître tout le projet. Commencez par les fichiers que vous allez réellement modifier." : "You do not need to know the whole project. Start with the files you will actually edit."}>
    <section><h2>{fr ? "La carte du projet" : "The project map"}</h2><CodeBlock>{"reading-list/\n├── phpaml.json\n├── composer.json\n├── .env.example\n├── public/\n│   └── index.php\n├── src/\n│   ├── controllers/\n│   ├── models/\n│   ├── routes/WebApp.php\n│   ├── services/\n│   └── views/\n├── tests/\n└── runtime/"}</CodeBlock></section>
    <section><h2>{fr ? "Les quatre zones essentielles" : "The four essential areas"}</h2><div className="useful-grid"><Card title="public/" text={fr ? "Entrée publique du site et fichiers que le navigateur peut demander directement." : "Public website entry and files the browser can request directly."}/><Card title="src/" text={fr ? "Votre application : c’est ici que vous travaillez la plupart du temps." : "Your application: this is where you work most of the time."}/><Card title="tests/" text={fr ? "Vérifications automatiques qui empêchent un ancien comportement de casser." : "Automated checks preventing old behavior from breaking."}/><Card title="runtime/" text={fr ? "Environnement installé et reconstructible. N’y rangez pas votre logique." : "Installed, rebuildable environment. Do not store your logic there."}/></div></section>
    <section><h2>{fr ? "Les fichiers que vous modifierez dans ce chapitre" : "Files you will edit in this chapter"}</h2><div className="placement-table"><Row left="src/routes/WebApp.php" right={fr ? "déclare les adresses" : "declares addresses"}/><Row left="src/controllers/AboutController.php" right={fr ? "prépare la page À propos" : "prepares the About page"}/><Row left="src/controllers/BookController.php" right={fr ? "prépare la liste de livres" : "prepares the book list"}/><Row left="src/views/about.php" right={fr ? "affiche la page À propos" : "displays the About page"}/><Row left="src/views/books.php" right={fr ? "affiche les livres" : "displays the books"}/></div></section>
    <section><h2>{fr ? "Ce que font les fichiers à la racine" : "What root files do"}</h2><p><code>phpaml.json</code>{fr ? " est la fiche d’identité partagée du projet. " : " is the project's shared identity card. "}<code>composer.json</code>{fr ? " décrit les bibliothèques PHP et l’autoloading. " : " describes PHP libraries and autoloading. "}<code>.env.example</code>{fr ? " documente les réglages locaux attendus sans contenir de secrets réels." : " documents expected local settings without real secrets."}</p><Note title={fr ? "Ne modifiez pas runtime pour corriger votre application" : "Do not edit runtime to fix your application"}>{fr ? "runtime peut être régénéré. Une correction métier placée dedans risque de disparaître lors d’une réinstallation ou mise à jour." : "runtime can be regenerated. Application logic placed there may disappear after a reinstall or update."}</Note></section>
    <MiniExercise fr={fr} prompt={fr ? "Où placeriez-vous une nouvelle adresse /contact, son code de préparation et son HTML ?" : "Where would you place a new /contact address, its preparation code, and its HTML?"} hint={fr ? "Route dans src/routes, contrôleur dans src/controllers, vue dans src/views." : "Route in src/routes, controller in src/controllers, view in src/views."}/>
  </Frame>;

  if (lesson === "page") return <Frame locale={locale} lesson={lesson} title={fr ? <>Ajouter une page<br/><em>de bout en bout.</em></> : <>Add a page<br/><em>end to end.</em></>} intro={fr ? "Une page classique nécessite une adresse, une action et un fichier d’affichage. Nous allons créer /about dans cet ordre." : "A classic page needs an address, an action, and a display file. We will create /about in that order."}>
    <section><h2>{fr ? "1. Générez le contrôleur" : "1. Generate the controller"}</h2><CodeBlock>{"aml make:controller About"}</CodeBlock><p>{fr ? "AML crée src/controllers/AboutController.php. Un contrôleur est une classe PHP ordinaire qui hérite de Controller afin d’utiliser les outils du framework, notamment la méthode view()." : "AML creates src/controllers/AboutController.php. A controller is an ordinary PHP class extending Controller so it can use framework tools, including view()."}</p></section>
    <section><h2>{fr ? "2. Remplissez exactement ce fichier" : "2. Fill this exact file"}</h2><p><code>src/controllers/AboutController.php</code></p><CodeBlock>{String.raw`<?php

declare(strict_types=1);

namespace App\Controllers;

use PHPAML\Http\Request;
use PHPAML\Http\Response;
use PHPAML\Mvc\Controller;

final class AboutController extends Controller
{
    public function index(Request $request): Response
    {
        return $this->view('about.php');
    }
}`}</CodeBlock><p>{fr ? "index() est l’action appelée par la route. Request représente la demande reçue. Response garantit que l’action rend une réponse comprise par PHPAML. view('about.php') demande enfin le fichier src/views/about.php." : "index() is the action called by the route. Request represents the received request. Response ensures the action returns an answer PHPAML understands. view('about.php') finally requests src/views/about.php."}</p></section>
    <section><h2>{fr ? "3. Créez la vue" : "3. Create the view"}</h2><p><code>src/views/about.php</code></p><CodeBlock>{`<!DOCTYPE html>
<html lang="${fr ? "fr" : "en"}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${fr ? "À propos" : "About"}</title>
</head>
<body>
    <main>
        <h1>${fr ? "À propos de Reading List" : "About Reading List"}</h1>
        <p>${fr ? "Ma première page PHPAML." : "My first PHPAML page."}</p>
    </main>
</body>
</html>`}</CodeBlock><p>{fr ? "Cette vue contient du HTML parce que son travail est la présentation. Elle reste un fichier PHP : nous y afficherons bientôt des valeurs dynamiques." : "This view contains HTML because its job is presentation. It remains a PHP file: soon we will display dynamic values in it."}</p></section>
    <section><h2>{fr ? "4. Reliez l’adresse au contrôleur" : "4. Connect the address to the controller"}</h2><p><code>src/routes/WebApp.php</code></p><CodeBlock>{String.raw`<?php

declare(strict_types=1);

namespace App\Routes;

use App\Controllers\AboutController;
use App\Controllers\HomeController;
use PHPAML\Routing\Route;

final class WebApp extends Route
{
    protected function routes(): void
    {
        $this->get('/', [HomeController::class, 'index']);
        $this->get('/about', [AboutController::class, 'index']);
    }
}`}</CodeBlock><p>{fr ? "get signifie que la page répond à une consultation normale du navigateur. Le tableau indique la classe puis la méthode à appeler. La ligne use rend AboutController disponible dans ce fichier." : "get means the page answers a normal browser visit. The array names the class, then the method to call. The use line makes AboutController available in this file."}</p></section>
    <section><h2>{fr ? "5. Contrôlez immédiatement" : "5. Check immediately"}</h2><CodeBlock>{"aml routes\n# GET  /about  AboutController::index"}</CodeBlock><p>{fr ? "Ouvrez ensuite http://127.0.0.1:8910/about. Si la page apparaît, la route, le contrôleur et la vue sont correctement reliés." : "Then open http://127.0.0.1:8910/about. If the page appears, the route, controller, and view are correctly connected."}</p></section>
  </Frame>;

  if (lesson === "data") return <Frame locale={locale} lesson={lesson} title={fr ? <>Transmettre des données<br/><em>à la vue.</em></> : <>Pass data<br/><em>to the view.</em></>} intro={fr ? "Une page devient utile lorsque le contrôleur lui fournit des valeurs. Nous gardons la préparation séparée de l’affichage." : "A page becomes useful when the controller gives it values. We keep preparation separate from display."}>
    <section><h2>{fr ? "Le contrôleur prépare" : "The controller prepares"}</h2><p>{fr ? "Remplacez uniquement la méthode index() de AboutController. Le second argument de view() est un tableau associatif : chaque clé devient un nom disponible dans la vue." : "Replace only the index() method of AboutController. The second view() argument is an associative array: every key becomes a name available in the view."}</p><CodeBlock>{`public function index(Request $request): Response
{
    return $this->view('about.php', [
        'projectName' => 'Reading List',
        'bookCount' => 3,
    ]);
}`}</CodeBlock><div className="code-decoder"><div><code>projectName</code><p>{fr ? "nom que la vue utilisera" : "name used by the view"}</p></div><div><code>Reading List</code><p>{fr ? "valeur préparée par le contrôleur" : "value prepared by the controller"}</p></div></div></section>
    <section><h2>{fr ? "La vue affiche sans faire confiance" : "The view displays without blindly trusting"}</h2><p><code>src/views/about.php</code></p><CodeBlock>{`<main>
    <h1><?= htmlspecialchars($projectName, ENT_QUOTES, 'UTF-8') ?></h1>
    <p>${fr ? "Vous suivez" : "You track"} <?= (int) $bookCount ?> ${fr ? "livres." : "books."}</p>
</main>`}</CodeBlock><p>{fr ? "<?= ... ?> est une forme courte de echo. htmlspecialchars transforme les caractères pouvant être interprétés comme du HTML. Cette protection est importante dès qu’une valeur peut provenir d’un formulaire, d’une URL ou d’une base de données. Le cast (int) garantit ici un nombre." : "<?= ... ?> is a short form of echo. htmlspecialchars converts characters that could be interpreted as HTML. This protection matters whenever a value may come from a form, URL, or database. The (int) cast guarantees a number here."}</p></section>
    <section><h2>{fr ? "Suivez la valeur" : "Follow the value"}</h2><div className="architecture-flow"><Box n="1" title={fr ? "Contrôleur" : "Controller"} text="'bookCount' => 3"/><b>→</b><Box n="2" title="view()" text="about.php"/><b>→</b><Box n="3" title={fr ? "Vue" : "View"} text="$bookCount"/><b>→</b><Box n="4" title="HTML" text="3 books"/></div><p>{fr ? "La vue ne va pas chercher les données elle-même. Le contrôleur les lui remet explicitement, ce qui rend le flux lisible et testable." : "The view does not fetch data itself. The controller gives it data explicitly, making the flow readable and testable."}</p></section>
    <BeginnerQuestions fr={fr} items={fr ? [["Pourquoi ne pas écrire le nombre directement dans la vue ?", "Parce qu’une vraie valeur changera. La transmettre prépare le code aux données d’un service ou d’une base."], ["Puis-je transmettre un objet ?", "Oui. Le projet initial transmet déjà un HomeModel à home.php."], ["Faut-il échapper tous les textes ?", "Échappez les valeurs dynamiques affichées en HTML, surtout celles qui viennent d’un utilisateur ou d’une source externe."]] : [["Why not write the number directly in the view?", "Because a real value will change. Passing it prepares the code for service or database data."], ["Can I pass an object?", "Yes. The initial project already passes a HomeModel to home.php."], ["Must every text be escaped?", "Escape dynamic values displayed in HTML, especially those coming from users or external sources."]]}/>
  </Frame>;

  if (lesson === "errors") return <Frame locale={locale} lesson={lesson} title={fr ? <>Comprendre une erreur<br/><em>sans paniquer.</em></> : <>Understand an error<br/><em>without panic.</em></>} intro={fr ? "Une erreur est un indice sur l’étape qui n’a pas pu terminer son travail. Commencez par la première erreur, pas par la dernière conséquence." : "An error is a clue about the step that could not finish. Start with the first error, not the last consequence."}>
    <section><h2>{fr ? "404 et 500 ne racontent pas la même histoire" : "404 and 500 tell different stories"}</h2><div className="good-bad"><div><span>404</span><p>{fr ? "Aucune route ne correspond à l’adresse demandée. Vérifiez l’URL, la méthode HTTP et src/routes/WebApp.php." : "No route matches the requested address. Check the URL, HTTP method, and src/routes/WebApp.php."}</p></div><div><span>500</span><p>{fr ? "La route a généralement été trouvée, mais du code a échoué. Lisez l’erreur de développement et le terminal." : "The route was generally found, but code failed. Read the development error and terminal."}</p></div></div></section>
    <section><h2>{fr ? "La méthode en six questions" : "The six-question method"}</h2><ol className="request-steps"><Step n="1" title={fr ? "Le serveur fonctionne-t-il ?" : "Is the server running?"}>{fr ? "Le terminal doit encore afficher aml serve." : "The terminal must still be running aml serve."}</Step><Step n="2" title={fr ? "L’adresse est-elle exacte ?" : "Is the address exact?"}>{fr ? "Comparez /about et /About : la casse peut compter selon le système." : "Compare /about and /About: letter case may matter depending on the system."}</Step><Step n="3" title={fr ? "La route existe-t-elle ?" : "Does the route exist?"}>aml routes</Step><Step n="4" title={fr ? "La classe est-elle importée ?" : "Is the class imported?"}>{fr ? "Vérifiez use App\\Controllers\\AboutController;" : "Check use App\\Controllers\\AboutController;"}</Step><Step n="5" title={fr ? "La méthode existe-t-elle ?" : "Does the method exist?"}>{fr ? "La route demande index : le contrôleur doit avoir public function index(...)." : "The route requests index: the controller must have public function index(...)."}</Step><Step n="6" title={fr ? "La vue porte-t-elle le bon nom ?" : "Does the view have the right name?"}>{fr ? "about.php doit correspondre exactement à view('about.php')." : "about.php must exactly match view('about.php')."}</Step></ol></section>
    <section><h2>{fr ? "Pannes fréquentes et corrections" : "Frequent failures and fixes"}</h2><div className="placement-table"><Row left="Class AboutController not found" right={fr ? "ajouter/corriger le use" : "add/fix the use import"}/><Row left="Action de route invalide" right={fr ? "vérifier le nom de la méthode" : "check the method name"}/><Row left="View not found: about.php" right={fr ? "créer src/views/about.php" : "create src/views/about.php"}/><Row left="Undefined variable $projectName" right={fr ? "transmettre la clé dans view()" : "pass the key through view()"}/><Row left="Parse error" right={fr ? "chercher parenthèse, accolade ou ; manquant" : "look for a missing parenthesis, brace, or ;"}/></div></section>
    <section><h2>{fr ? "Créez une panne volontaire" : "Create an intentional failure"}</h2><p>{fr ? "Dans la route /about, écrivez temporairement 'show' à la place de 'index'. Rechargez, lisez l’erreur, puis rétablissez 'index'. Cet exercice apprend à reconnaître une liaison route–action cassée sans deviner." : "In the /about route, temporarily write 'show' instead of 'index'. Reload, read the error, then restore 'index'. This exercise teaches you to recognize a broken route–action connection without guessing."}</p><Note title={fr ? "En production" : "In production"}>{fr ? "Les détails internes doivent rester masqués aux visiteurs. Les écrans détaillés sont réservés au développement; les journaux conservent l’information nécessaire au diagnostic." : "Internal details must remain hidden from visitors. Detailed screens are for development; logs retain information needed for diagnosis."}</Note></section>
  </Frame>;

  return <Frame locale={locale} lesson="workshop" title={fr ? <>Atelier : construire<br/><em>la page Livres.</em></> : <>Workshop: build<br/><em>the Books page.</em></>} intro={fr ? "Vous allez refaire toute la chaîne sans copier la page À propos. Chaque étape possède un contrôle avant de continuer." : "You will rebuild the entire chain without copying the About page. Every step includes a check before continuing."}>
    <section className="chapter-one-exercise"><span>{fr ? "MISSION" : "MISSION"}</span><h2>{fr ? "Afficher trois livres sur /books" : "Display three books at /books"}</h2><ol><li>{fr ? "Générer BookController." : "Generate BookController."}</li><li>{fr ? "Préparer un tableau de trois livres." : "Prepare an array of three books."}</li><li>{fr ? "Transmettre ce tableau à books.php." : "Pass the array to books.php."}</li><li>{fr ? "Afficher chaque titre et auteur avec foreach." : "Display every title and author with foreach."}</li><li>{fr ? "Déclarer GET /books puis vérifier avec aml routes." : "Declare GET /books, then verify with aml routes."}</li></ol></section>
    <section><h2>{fr ? "Étape 1 — Le contrôleur" : "Step 1 — The controller"}</h2><CodeBlock>{"aml make:controller Book"}</CodeBlock><p><code>src/controllers/BookController.php</code></p><CodeBlock>{String.raw`<?php

declare(strict_types=1);

namespace App\Controllers;

use PHPAML\Http\Request;
use PHPAML\Http\Response;
use PHPAML\Mvc\Controller;

final class BookController extends Controller
{
    public function index(Request $request): Response
    {
        $books = [
            ['title' => 'Clean Code', 'author' => 'Robert C. Martin'],
            ['title' => 'The Pragmatic Programmer', 'author' => 'David Thomas & Andrew Hunt'],
            ['title' => 'Design Patterns', 'author' => 'Erich Gamma et al.'],
        ];

        return $this->view('books.php', ['books' => $books]);
    }
}`}</CodeBlock><p>{fr ? "Ici les données sont volontairement écrites dans le contrôleur pour apprendre le trajet. Plus tard, un service ou un dépôt les récupérera sans modifier la responsabilité de la vue." : "Here the data is deliberately written in the controller to learn the flow. Later, a service or repository can fetch it without changing the view's responsibility."}</p></section>
    <section><h2>{fr ? "Étape 2 — La vue" : "Step 2 — The view"}</h2><p><code>src/views/books.php</code></p><CodeBlock>{`<!DOCTYPE html>
<html lang="${fr ? "fr" : "en"}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${fr ? "Mes livres" : "My books"}</title>
</head>
<body>
    <main>
        <h1>${fr ? "Mes livres" : "My books"}</h1>
        <ul>
            <?php foreach ($books as $book): ?>
                <li>
                    <strong><?= htmlspecialchars($book['title'], ENT_QUOTES, 'UTF-8') ?></strong>
                    — <?= htmlspecialchars($book['author'], ENT_QUOTES, 'UTF-8') ?>
                </li>
            <?php endforeach; ?>
        </ul>
    </main>
</body>
</html>`}</CodeBlock><p>{fr ? "foreach répète le même fragment HTML pour chaque élément du tableau. La syntaxe avec deux-points et endforeach est du PHP natif particulièrement lisible au milieu du HTML." : "foreach repeats the same HTML fragment for every array item. The colon and endforeach syntax is native PHP and especially readable inside HTML."}</p></section>
    <section><h2>{fr ? "Étape 3 — La route" : "Step 3 — The route"}</h2><p><code>src/routes/WebApp.php</code></p><CodeBlock>{String.raw`use App\Controllers\AboutController;
use App\Controllers\BookController;
use App\Controllers\HomeController;

// Dans routes():
$this->get('/', [HomeController::class, 'index']);
$this->get('/about', [AboutController::class, 'index']);
$this->get('/books', [BookController::class, 'index']);`}</CodeBlock><p>{fr ? "Ne remplacez pas les routes existantes : ajoutez l’import et la nouvelle ligne. Une classe utilisée sans son use complet ne pourra pas être trouvée." : "Do not replace existing routes: add the import and new line. A class used without its full use import cannot be found."}</p></section>
    <section><h2>{fr ? "Étape 4 — La recette de vérification" : "Step 4 — Verification recipe"}</h2><CodeBlock>{"aml routes\n# Vérifier GET /books\n\naml test"}</CodeBlock><ol><li>{fr ? "Confirmez que GET /books apparaît dans aml routes." : "Confirm GET /books appears in aml routes."}</li><li>{fr ? "Ouvrez http://127.0.0.1:8910/books." : "Open http://127.0.0.1:8910/books."}</li><li>{fr ? "Vérifiez les trois titres et auteurs." : "Verify the three titles and authors."}</li><li>{fr ? "Lancez aml test pour vérifier le projet." : "Run aml test to verify the project."}</li></ol></section>
    <section><h2>{fr ? "Défis utiles" : "Useful challenges"}</h2><ul><li>{fr ? "Ajoutez un quatrième livre sans modifier la vue." : "Add a fourth book without changing the view."}</li><li>{fr ? "Ajoutez une propriété year et affichez-la en entier." : "Add a year property and display it as an integer."}</li><li>{fr ? "Ajoutez un lien depuis la page À propos vers /books." : "Add a link from the About page to /books."}</li><li>{fr ? "Déplacez ensuite la création du tableau dans un BookCatalog, quand vous aurez étudié les services." : "Later, move array creation into a BookCatalog after studying services."}</li></ul></section>
    <Summary fr={fr} points={fr ? ["Une route associe une adresse à une action.", "Le contrôleur prépare et transmet les données.", "La vue affiche et échappe les valeurs.", "aml routes, le navigateur et aml test forment une vérification progressive."] : ["A route connects an address to an action.", "The controller prepares and passes data.", "The view displays and escapes values.", "aml routes, the browser, and aml test provide progressive verification."]}/>
  </Frame>;
}

function Box({ n, title, text }: { n: string; title: string; text: string }) { return <div><span>{n}</span><strong>{title}</strong><code>{text}</code></div>; }
function Card({ title, text }: { title: string; text: string }) { return <div><strong>{title}</strong><p>{text}</p></div>; }
function Row({ left, right }: { left: string; right: string }) { return <div><span>{left}</span><strong>{right}</strong></div>; }
function Step({ n, title, children }: { n: string; title: string; children: React.ReactNode }) { return <li><span>{n}</span><div><strong>{title}</strong><p>{children}</p></div></li>; }
function Note({ title, children }: { title: string; children: React.ReactNode }) { return <div className="notice"><strong>{title}</strong><p>{children}</p></div>; }
function Vocabulary({ fr, items }: { fr: boolean; items: string[][] }) { return <section><p className="chapter-one-kicker">{fr ? "VOCABULAIRE" : "VOCABULARY"}</p><h2>{fr ? "Les mots à retenir." : "Words to remember."}</h2><div className="placement-table">{items.map(([word, definition]) => <Row key={word} left={word} right={definition}/>)}</div></section>; }
function Summary({ fr, points }: { fr: boolean; points: string[] }) { return <section className="chapter-one-summary"><p className="chapter-one-kicker">{fr ? "EN RÉSUMÉ" : "SUMMARY"}</p><h2>{fr ? "Ce qu’il faut retenir" : "What to remember"}</h2><ul>{points.map((point) => <li key={point}>{point}</li>)}</ul></section>; }
function Checkpoint({ fr, question, answer }: { fr: boolean; question: string; answer: string }) { return <details className="chapter-one-check"><summary>{fr ? "Vérifiez votre compréhension : " : "Check your understanding: "}{question}</summary><p>{answer}</p></details>; }
function MiniExercise({ fr, prompt, hint }: { fr: boolean; prompt: string; hint: string }) { return <section className="chapter-one-exercise"><span>{fr ? "À VOUS" : "YOUR TURN"}</span><h2>{prompt}</h2><details><summary>{fr ? "Voir un indice" : "Show a hint"}</summary><p>{hint}</p></details></section>; }
function BeginnerQuestions({ fr, items }: { fr: boolean; items: string[][] }) { return <section><p className="chapter-one-kicker">{fr ? "QUESTIONS DE DÉBUTANT" : "BEGINNER QUESTIONS"}</p><h2>{fr ? "Les questions normales à ce stade." : "Normal questions at this stage."}</h2>{items.map(([question, answer]) => <details className="chapter-one-check" key={question}><summary>{question}</summary><p>{answer}</p></details>)}</section>; }
