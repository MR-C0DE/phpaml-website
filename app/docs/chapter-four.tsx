import Link from "next/link";
import { CodeBlock, Footer, Header } from "../components";
import "./chapter-one.css";
import "./chapter-two.css";

type Locale = "en" | "fr";
export type ChapterFourLesson = "overview" | "form" | "request" | "validation" | "security" | "crud" | "workshop";
const order: ChapterFourLesson[] = ["overview", "form", "request", "validation", "security", "crud", "workshop"];
const labels = {
  en: { overview: "Forms and HTTP", form: "Build the form", request: "Receive the data", validation: "Validate and respond", security: "Protect the form", crud: "Complete the CRUD", workshop: "Final workshop" },
  fr: { overview: "Formulaires et HTTP", form: "Construire le formulaire", request: "Recevoir les données", validation: "Valider et répondre", security: "Protéger le formulaire", crud: "Compléter le CRUD", workshop: "Atelier final" },
};
const descriptions = {
  en: { overview: "Understand GET, POST, and PRG", form: "Give every field a precise role", request: "Read submitted values", validation: "Reject invalid input clearly", security: "Understand CSRF and escaping", crud: "Create, read, update, delete", workshop: "Finish a working book manager" },
  fr: { overview: "Comprendre GET, POST et PRG", form: "Donner un rôle précis aux champs", request: "Lire les valeurs envoyées", validation: "Refuser clairement une saisie invalide", security: "Comprendre CSRF et échappement", crud: "Créer, lire, modifier, supprimer", workshop: "Terminer un gestionnaire de livres" },
};

function url(locale: Locale, lesson: ChapterFourLesson) { const prefix = locale === "fr" ? "/fr" : ""; return lesson === "overview" ? `${prefix}/docs/04` : `${prefix}/docs/04/${lesson}`; }
function Nav({ locale, current }: { locale: Locale; current: ChapterFourLesson }) { const fr = locale === "fr"; return <nav className="chapter-one-nav" aria-label={fr ? "Pages du chapitre 4" : "Chapter 4 pages"}><div><small>{fr ? "CHAPITRE 04" : "CHAPTER 04"}</small><strong>{fr ? "Formulaires" : "Forms"}</strong></div><ol>{order.map((item, index) => <li key={item} className={item === current ? "active" : ""}><Link href={url(locale, item)} aria-current={item === current ? "page" : undefined}><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{labels[locale][item]}</strong><small>{descriptions[locale][item]}</small></div></Link></li>)}</ol></nav>; }
function Pager({ locale, current }: { locale: Locale; current: ChapterFourLesson }) { const index = order.indexOf(current); const previous = order[index - 1]; const next = order[index + 1]; return <nav className="chapter-one-pager"><Link href={previous ? url(locale, previous) : (locale === "fr" ? "/fr/docs/03" : "/docs/03")}>← {previous ? labels[locale][previous] : (locale === "fr" ? "Chapitre 03" : "Chapter 03")}</Link><Link href={next ? url(locale, next) : (locale === "fr" ? "/fr/docs/05" : "/docs/05")}>{next ? labels[locale][next] : (locale === "fr" ? "Chapitre 05" : "Chapter 05")} →</Link></nav>; }
function Frame({ locale, lesson, title, intro, children }: { locale: Locale; lesson: ChapterFourLesson; title: React.ReactNode; intro: string; children: React.ReactNode }) { const fr = locale === "fr"; return <><Header locale={locale} path="/docs/04"/><main className="chapter-one-page"><header className="chapter-one-hero shell"><p className="eyebrow"><span/> {fr ? "Documentation · Chapitre 04" : "Documentation · Chapter 04"}</p><h1>{title}</h1><p>{intro}</p><p className="chapter-two-audience">{fr ? "Nous poursuivons le projet reading-list. Les données seront conservées dans la session avant d’introduire une base de données." : "We continue the reading-list project. Data will be kept in the session before introducing a database."}</p></header><div className="chapter-one-layout shell"><Nav locale={locale} current={lesson}/><article className="chapter-one-article">{children}<Pager locale={locale} current={lesson}/></article></div></main><Footer locale={locale}/></>; }

export function ChapterFourPage({ locale, lesson }: { locale: Locale; lesson: ChapterFourLesson }) {
  const fr = locale === "fr";
  if (lesson === "overview") return <Frame locale={locale} lesson={lesson} title={fr ? <>Faire parler<br/><em>un formulaire.</em></> : <>Make a form<br/><em>communicate.</em></>} intro={fr ? "Un formulaire est un dialogue : le serveur affiche des champs, l’utilisateur les remplit, puis le navigateur renvoie les valeurs au serveur." : "A form is a dialogue: the server displays fields, the user fills them, then the browser sends the values back to the server."}>
    <section className="chapter-one-lead"><span>≈ 90 min</span><h2>{fr ? "Nous allons rendre la bibliothèque modifiable." : "We will make the library editable."}</h2><p>{fr ? "Le chapitre précédent affichait des livres écrits dans le contrôleur. Nous allons maintenant ajouter, corriger et supprimer des livres depuis le navigateur. Chaque action restera en PHP et utilisera les protections fournies par PHPAML." : "The previous chapter displayed books written in the controller. We will now add, correct, and delete books from the browser. Every action remains in PHP and uses PHPAML protections."}</p></section>
    <section><h2>{fr ? "Deux types de demandes suffisent pour commencer" : "Two request types are enough to begin"}</h2><div className="good-bad"><div><span>GET</span><p>{fr ? "Demander une page ou consulter une ressource. Une visite normale dans le navigateur utilise GET." : "Request a page or read a resource. A normal browser visit uses GET."}</p></div><div><span>POST</span><p>{fr ? "Envoyer des valeurs qui provoqueront un changement, par exemple ajouter un livre." : "Send values that cause a change, such as adding a book."}</p></div></div><p>{fr ? "GET doit pouvoir être répété sans modifier la bibliothèque. POST exprime une intention de changement. Cette séparation rend l’application prévisible." : "GET should be repeatable without changing the library. POST expresses an intent to change. This separation makes the application predictable."}</p></section>
    <section><h2>{fr ? "Le nouveau trajet" : "The new journey"}</h2><div className="architecture-flow"><Box n="1" title="GET" text="/books/create"/><b>→</b><Box n="2" title={fr ? "Formulaire" : "Form"} text="create.php"/><b>→</b><Box n="3" title="POST" text="/books"/><b>→</b><Box n="4" title={fr ? "Redirection" : "Redirect"} text="/books"/></div><p>{fr ? "Après un POST réussi, le serveur ne rend pas directement la liste : il demande au navigateur de visiter /books. Ce modèle POST–Redirect–GET évite de créer deux fois le même livre lorsque la page est actualisée." : "After a successful POST, the server does not directly render the list: it asks the browser to visit /books. This POST–Redirect–GET pattern avoids creating the same book twice when the page is refreshed."}</p></section>
    <Vocabulary fr={fr} items={fr ? [["Champ", "Zone où l’utilisateur saisit ou choisit une valeur."], ["Validation", "Vérification que les valeurs respectent les règles attendues."], ["Session", "Petit espace de données associé à un navigateur pendant plusieurs requêtes."], ["Redirection", "Réponse qui demande au navigateur de visiter une autre adresse."]] : [["Field", "Area where a user types or selects a value."], ["Validation", "Check that values follow expected rules."], ["Session", "Small data space associated with one browser across requests."], ["Redirect", "Response asking the browser to visit another address."]]}/>
    <Summary fr={fr} points={fr ? ["GET consulte; POST demande un changement.", "Le name d’un champ devient la clé envoyée.", "Les données reçues ne sont jamais considérées comme sûres par défaut.", "POST–Redirect–GET évite une répétition accidentelle."] : ["GET reads; POST requests a change.", "A field name becomes the submitted key.", "Received data is never trusted by default.", "POST–Redirect–GET prevents accidental repetition."]}/>
  </Frame>;

  if (lesson === "form") return <Frame locale={locale} lesson={lesson} title={fr ? <>Construire un formulaire<br/><em>compréhensible.</em></> : <>Build an<br/><em>understandable form.</em></>} intro={fr ? "Avant de traiter des données, construisons une page accessible où chaque étiquette, nom et type a une fonction précise." : "Before processing data, let us build an accessible page where every label, name, and type has a precise function."}>
    <section><h2>{fr ? "Ajoutez la route qui affiche le formulaire" : "Add the route displaying the form"}</h2><p><code>src/routes/WebApp.php</code></p><CodeBlock>{String.raw`use App\Controllers\BookController;

// Dans routes():
$this->get('/books/create', [BookController::class, 'create']);`}</CodeBlock><p>{fr ? "Cette route n’enregistre encore rien. Elle demande seulement à BookController d’afficher le formulaire." : "This route does not save anything yet. It only asks BookController to display the form."}</p></section>
    <section><h2>{fr ? "Ajoutez l’action create()" : "Add the create() action"}</h2><p><code>src/controllers/BookController.php</code></p><CodeBlock>{`public function create(Request $request): Response
{
    return $this->view('books/create.php', [
        'errors' => [],
        'old' => ['title' => '', 'author' => ''],
    ]);
}`}</CodeBlock><p>{fr ? "Nous transmettons déjà errors et old, même vides. La vue conservera ainsi la même forme lorsqu’une validation échouera plus tard." : "We already pass errors and old, even when empty. The view will therefore keep the same shape when validation fails later."}</p></section>
    <section><h2>{fr ? "Créez le fichier de vue" : "Create the view file"}</h2><p><code>src/views/books/create.php</code></p><CodeBlock>{`<!DOCTYPE html>
<html lang="${fr ? "fr" : "en"}">
<head><meta charset="UTF-8"><title>${fr ? "Ajouter un livre" : "Add a book"}</title></head>
<body>
<main>
    <h1>${fr ? "Ajouter un livre" : "Add a book"}</h1>
    <form method="post" action="/books">
        <?= $view->csrfField() ?>

        <label for="title">${fr ? "Titre" : "Title"}</label>
        <input id="title" name="title" type="text" required
               value="<?= $view->escape($old['title'] ?? '') ?>">

        <label for="author">${fr ? "Auteur" : "Author"}</label>
        <input id="author" name="author" type="text" required
               value="<?= $view->escape($old['author'] ?? '') ?>">

        <button type="submit">${fr ? "Enregistrer" : "Save"}</button>
    </form>
</main>
</body>
</html>`}</CodeBlock></section>
    <section><h2>{fr ? "Lisez la balise form" : "Read the form element"}</h2><div className="placement-table"><Row left="method=post" right={fr ? "envoie une requête POST" : "sends a POST request"}/><Row left="action=/books" right={fr ? "choisit l’adresse destinataire" : "chooses the destination address"}/><Row left="name=title" right={fr ? "crée la clé title dans la requête" : "creates the title request key"}/><Row left="required" right={fr ? "aide le navigateur, sans remplacer le serveur" : "helps the browser, without replacing the server"}/><Row left="$view->csrfField()" right={fr ? "ajoute le jeton de protection" : "adds the protection token"}/></div></section>
    <Checkpoint fr={fr} question={fr ? "Pourquoi required ne suffit-il pas ?" : "Why is required not enough?"} answer={fr ? "Parce qu’un client peut contourner les règles du navigateur et envoyer directement une requête. Le serveur doit toujours valider lui-même." : "Because a client can bypass browser rules and send a request directly. The server must always validate for itself."}/>
  </Frame>;

  if (lesson === "request") return <Frame locale={locale} lesson={lesson} title={fr ? <>Recevoir les valeurs<br/><em>côté serveur.</em></> : <>Receive values<br/><em>on the server.</em></>} intro={fr ? "Le navigateur transforme les champs en une requête. PHPAML les expose à travers l’objet Request." : "The browser turns fields into a request. PHPAML exposes them through the Request object."}>
    <section><h2>{fr ? "Déclarez la destination POST" : "Declare the POST destination"}</h2><p><code>src/routes/WebApp.php</code></p><CodeBlock>{`$this->get('/books/create', [BookController::class, 'create']);
$this->post('/books', [BookController::class, 'store']);`}</CodeBlock><p>{fr ? "Une même adresse peut avoir des comportements différents selon sa méthode. Ici GET /books affichera la liste et POST /books ajoutera un livre." : "The same address can behave differently depending on its method. Here GET /books displays the list and POST /books adds a book."}</p></section>
    <section><h2>{fr ? "Lisez les champs sans utiliser les variables globales" : "Read fields without global variables"}</h2><CodeBlock>{`public function store(Request $request): Response
{
    $title = trim((string) $request->input('title', ''));
    $author = trim((string) $request->input('author', ''));

    return $this->view('books/received.php', [
        'title' => $title,
        'author' => $author,
    ]);
}`}</CodeBlock><p>{fr ? "input('title', '') cherche la clé title et renvoie une chaîne vide si elle manque. Le cast string normalise le type; trim retire les espaces inutiles au début et à la fin. Lire la valeur ne signifie pas encore qu’elle est valide." : "input('title', '') looks for the title key and returns an empty string when missing. The string cast normalizes its type; trim removes unnecessary surrounding whitespace. Reading a value does not mean it is valid."}</p></section>
    <section><h2>{fr ? "Ce que contient réellement Request" : "What Request actually contains"}</h2><div className="useful-grid"><Card title="method()" text={fr ? "GET, POST, PUT, PATCH ou DELETE." : "GET, POST, PUT, PATCH, or DELETE."}/><Card title="path()" text={fr ? "L’adresse demandée, par exemple /books." : "Requested path, such as /books."}/><Card title="query()" text={fr ? "Valeurs placées après ? dans l’adresse." : "Values placed after ? in the address."}/><Card title="input()" text={fr ? "Réunit les valeurs de l’adresse et du corps envoyé." : "Combines address and submitted body values."}/></div><Note title={fr ? "N’utilisez pas directement $_POST dans ce projet" : "Do not use $_POST directly in this project"}>{fr ? "Request centralise l’accès aux données, permet les tests et traite également les corps JSON ou encodés. Cela garde le contrôleur indépendant de la manière dont PHP a reçu la requête." : "Request centralizes data access, enables testing, and also handles JSON or encoded bodies. This keeps the controller independent from how PHP received the request."}</Note></section>
    <section><h2>{fr ? "Testez le trajet avant d’ajouter la validation" : "Test the journey before adding validation"}</h2><ol><li>{fr ? "Vérifiez GET /books/create et POST /books avec aml routes." : "Check GET /books/create and POST /books with aml routes."}</li><li>{fr ? "Ouvrez /books/create et remplissez les deux champs." : "Open /books/create and fill both fields."}</li><li>{fr ? "Soumettez et confirmez les valeurs reçues." : "Submit and confirm the received values."}</li><li>{fr ? "N’utilisez pas encore ces valeurs pour construire du SQL ou un nom de fichier." : "Do not yet use these values to build SQL or a file name."}</li></ol></section>
  </Frame>;

  if (lesson === "validation") return <Frame locale={locale} lesson={lesson} title={fr ? <>Valider, expliquer,<br/><em>puis rediriger.</em></> : <>Validate, explain,<br/><em>then redirect.</em></>} intro={fr ? "Une bonne validation ne se contente pas de refuser : elle conserve la saisie et indique précisément ce qu’il faut corriger." : "Good validation does more than reject: it preserves input and clearly explains what must be fixed."}>
    <section><h2>{fr ? "Injectez le Validator et la Session" : "Inject Validator and Session"}</h2><p>{fr ? "Remplacez le début de BookController par ces imports et ce constructeur. Le conteneur PHPAML fournit automatiquement les objets demandés." : "Replace the beginning of BookController with these imports and constructor. The PHPAML container automatically supplies the requested objects."}</p><CodeBlock>{String.raw`use PHPAML\Http\Request;
use PHPAML\Http\Response;
use PHPAML\Mvc\Controller;
use PHPAML\Mvc\View;
use PHPAML\Session\Session;
use PHPAML\Validation\Validator;

final class BookController extends Controller
{
    public function __construct(
        View $view,
        private Session $session,
        private Validator $validator,
    ) {
        parent::__construct($view);
    }`}</CodeBlock></section>
    <section><h2>{fr ? "Validez avant de conserver" : "Validate before storing"}</h2><CodeBlock>{`public function store(Request $request): Response
{
    $data = [
        'title' => trim((string) $request->input('title', '')),
        'author' => trim((string) $request->input('author', '')),
    ];

    $valid = $this->validator->validate($data, [
        'title' => ['required', 'string', 'min:2', 'max:120'],
        'author' => ['required', 'string', 'min:2', 'max:100'],
    ]);

    if (!$valid) {
        return $this->view('books/create.php', [
            'errors' => $this->validator->errors(),
            'old' => $data,
        ], 422);
    }

    $books = $this->session->get('books', []);
    $nextId = $books === [] ? 1 : max(array_column($books, 'id')) + 1;
    $books[] = ['id' => $nextId] + $data;
    $this->session->set('books', $books);

    return Response::redirect('/books', 303);
}`}</CodeBlock></section>
    <section><h2>{fr ? "Expliquez l’échec près du champ" : "Explain failure near the field"}</h2><p>{fr ? "Ajoutez ce bloc juste après le champ title dans create.php. Faites la même chose pour author." : "Add this block immediately after the title field in create.php. Do the same for author."}</p><CodeBlock>{`<?php foreach ($errors['title'] ?? [] as $error): ?>
    <p role="alert"><?= $view->escape($error) ?></p>
<?php endforeach; ?>`}</CodeBlock><p>{fr ? "Le statut 422 signifie que la requête est comprise mais que ses valeurs ne respectent pas les règles. La vue reçoit old pour ne pas obliger l’utilisateur à tout retaper." : "Status 422 means the request is understood but its values do not follow the rules. The view receives old so the user does not have to retype everything."}</p></section>
    <section><h2>{fr ? "Pourquoi rediriger avec 303 ?" : "Why redirect with 303?"}</h2><p>{fr ? "Après l’enregistrement, Response::redirect('/books', 303) indique au navigateur : « l’opération est terminée; consulte maintenant la liste avec GET ». Une actualisation répète alors GET, pas le POST." : "After saving, Response::redirect('/books', 303) tells the browser: “the operation is complete; now read the list with GET.” A refresh then repeats GET, not POST."}</p><div className="architecture-flow"><Box n="1" title="POST" text="/books"/><b>→</b><Box n="2" title="303" text="Location: /books"/><b>→</b><Box n="3" title="GET" text="/books"/></div></section>
  </Frame>;

  if (lesson === "security") return <Frame locale={locale} lesson={lesson} title={fr ? <>Protéger le formulaire<br/><em>par couches.</em></> : <>Protect the form<br/><em>in layers.</em></>} intro={fr ? "La sécurité n’est pas une seule fonction. Elle combine l’intention de la requête, la validation, l’échappement et les protections automatiques du framework." : "Security is not one function. It combines request intent, validation, escaping, and automatic framework protections."}>
    <section><h2>{fr ? "CSRF : empêcher une autre page d’agir à votre place" : "CSRF: prevent another page from acting as you"}</h2><p>{fr ? "Une attaque CSRF tente de faire envoyer à votre navigateur une action que vous n’avez pas décidée. PHPAML associe un jeton secret à votre session. Le formulaire l’envoie et le middleware vérifie qu’il correspond avant de laisser passer POST." : "A CSRF attack attempts to make your browser submit an action you did not choose. PHPAML associates a secret token with your session. The form submits it and middleware checks it before allowing POST."}</p><CodeBlock>{`<form method="post" action="/books">
    <?= $view->csrfField() ?>
    <!-- champs -->
</form>`}</CodeBlock><p>{fr ? "Dans une application classique actuelle, CsrfMiddleware est ajouté automatiquement. Un jeton absent ou incorrect reçoit 419. Ne désactivez pas cette protection pour corriger un formulaire : ajoutez le champ attendu." : "In a current classic application, CsrfMiddleware is added automatically. A missing or invalid token receives 419. Do not disable this protection to fix a form: add the expected field."}</p></section>
    <section><h2>{fr ? "Validation et échappement résolvent deux problèmes différents" : "Validation and escaping solve different problems"}</h2><div className="good-bad"><div><span>{fr ? "VALIDATION" : "VALIDATION"}</span><p>{fr ? "Décide si une valeur est acceptable pour votre application : longueur, type, présence, format." : "Decides whether a value is acceptable for your application: length, type, presence, format."}</p></div><div><span>{fr ? "ÉCHAPPEMENT" : "ESCAPING"}</span><p>{fr ? "Empêche une valeur affichée d’être interprétée comme une balise ou un script HTML." : "Prevents a displayed value from being interpreted as an HTML tag or script."}</p></div></div><CodeBlock>{`<?= $view->escape($book['title']) ?>`}</CodeBlock></section>
    <section><h2>{fr ? "Les protections déjà actives" : "Protections already active"}</h2><div className="useful-grid"><Card title="CSRF" text={fr ? "Vérifie les requêtes qui modifient." : "Checks modifying requests."}/><Card title={fr ? "Limitation de débit" : "Rate limiting"} text={fr ? "Freine les envois répétés sur POST, PUT, PATCH et DELETE." : "Slows repeated POST, PUT, PATCH, and DELETE submissions."}/><Card title={fr ? "En-têtes de sécurité" : "Security headers"} text={fr ? "Durcissent le comportement du navigateur." : "Harden browser behavior."}/><Card title={fr ? "Redirections internes" : "Internal redirects"} text={fr ? "Response refuse les destinations externes ou mal formées." : "Response rejects external or malformed destinations."}/></div></section>
    <section><h2>{fr ? "Test de sécurité simple" : "Simple security test"}</h2><ol><li>{fr ? "Soumettez normalement le formulaire : il doit réussir." : "Submit the form normally: it should succeed."}</li><li>{fr ? "Inspectez la page et retirez temporairement le champ _token." : "Inspect the page and temporarily remove the _token field."}</li><li>{fr ? "Soumettez de nouveau : PHPAML doit répondre 419." : "Submit again: PHPAML should return 419."}</li><li>{fr ? "Rétablissez csrfField() et vérifiez le succès." : "Restore csrfField() and verify success."}</li></ol><Note title={fr ? "Ne journalisez jamais le jeton" : "Never log the token"}>{fr ? "Un jeton CSRF est une valeur de sécurité liée à la session. Ne l’affichez pas dans une erreur publique et ne le copiez pas dans un rapport." : "A CSRF token is a security value tied to a session. Do not display it in a public error or copy it into a report."}</Note></section>
  </Frame>;

  if (lesson === "crud") return <Frame locale={locale} lesson={lesson} title={fr ? <>Créer, consulter,<br/><em>modifier, supprimer.</em></> : <>Create, read,<br/><em>update, delete.</em></>} intro={fr ? "CRUD est seulement un raccourci pour les quatre opérations les plus fréquentes sur une collection de données." : "CRUD is simply shorthand for the four most frequent operations on a data collection."}>
    <section><h2>{fr ? "La carte complète des actions" : "Complete action map"}</h2><div className="placement-table"><Row left="GET /books" right="index — Read"/><Row left="GET /books/create" right="create — form"/><Row left="POST /books" right="store — Create"/><Row left="GET /books/{id}/edit" right="edit — form"/><Row left="POST /books/{id}/edit" right="update — Update"/><Row left="POST /books/{id}/delete" right="destroy — Delete"/></div><p>{fr ? "Les formulaires HTML comprennent directement GET et POST. Nous utilisons donc des chemins explicites pour modifier et supprimer, sans ajouter de mécanisme caché de remplacement de méthode." : "HTML forms directly understand GET and POST. We therefore use explicit paths for update and delete without adding a hidden method-override mechanism."}</p></section>
    <section><h2>{fr ? "Les routes" : "The routes"}</h2><p><code>src/routes/WebApp.php</code></p><CodeBlock>{`$this->get('/books', [BookController::class, 'index']);
$this->get('/books/create', [BookController::class, 'create']);
$this->post('/books', [BookController::class, 'store']);
$this->get('/books/{id}/edit', [BookController::class, 'edit']);
$this->post('/books/{id}/edit', [BookController::class, 'update']);
$this->post('/books/{id}/delete', [BookController::class, 'destroy']);`}</CodeBlock></section>
    <section><h2>{fr ? "Retrouver un identifiant dynamique" : "Read a dynamic identifier"}</h2><CodeBlock>{`public function edit(Request $request): Response
{
    $id = (int) $request->attribute('id');
    $books = $this->session->get('books', []);
    $book = $this->findBook($books, $id);

    if ($book === null) {
        return Response::html('<h1>404</h1><p>Book not found.</p>', 404);
    }

    return $this->view('books/edit.php', [
        'book' => $book,
        'errors' => [],
    ]);
}`}</CodeBlock><p>{fr ? "Le routeur extrait la partie {id} de l’adresse et la place dans les attributs de Request. Le cast int empêche de traiter cet identifiant comme un texte arbitraire." : "The router extracts {id} from the address and places it in Request attributes. The int cast prevents treating this identifier as arbitrary text."}</p></section>
    <section><h2>{fr ? "Chercher sans dupliquer la boucle" : "Search without duplicating the loop"}</h2><CodeBlock>{`/** @param list<array{id:int,title:string,author:string}> $books */
private function findBook(array $books, int $id): ?array
{
    foreach ($books as $book) {
        if ($book['id'] === $id) {
            return $book;
        }
    }

    return null;
}`}</CodeBlock><p>{fr ? "Cette méthode privée ne répond pas au navigateur. Elle aide simplement plusieurs actions du contrôleur à retrouver un livre. Au prochain chapitre, la base de données et un dépôt remplaceront cette recherche en session." : "This private method does not answer the browser. It simply helps controller actions find a book. In the next chapter, a database and repository will replace this session search."}</p></section>
    <Note title={fr ? "Limite volontaire de la session" : "Intentional session limitation"}>{fr ? "Les livres appartiennent ici à un seul navigateur et peuvent disparaître lorsque la session expire. C’est suffisant pour apprendre HTTP; ce n’est pas encore un stockage de production." : "Books here belong to one browser and may disappear when the session expires. This is enough to learn HTTP; it is not production storage."}</Note>
  </Frame>;

  return <Frame locale={locale} lesson="workshop" title={fr ? <>Atelier : terminer<br/><em>le gestionnaire.</em></> : <>Workshop: finish<br/><em>the manager.</em></>} intro={fr ? "Rassemblez les notions dans une application utilisable, puis vérifiez chaque scénario comme un utilisateur et comme un développeur." : "Combine the concepts into a usable application, then verify every scenario as a user and a developer."}>
    <section className="chapter-one-exercise"><span>{fr ? "CAHIER DES CHARGES" : "REQUIREMENTS"}</span><h2>{fr ? "La page /books doit devenir un vrai point de départ." : "The /books page must become a real starting point."}</h2><ol><li>{fr ? "Afficher tous les livres de la session." : "Display all session books."}</li><li>{fr ? "Proposer un lien Ajouter un livre." : "Provide an Add a book link."}</li><li>{fr ? "Proposer Modifier et Supprimer pour chaque livre." : "Provide Edit and Delete for every book."}</li><li>{fr ? "Conserver les valeurs invalides et afficher les erreurs." : "Preserve invalid values and display errors."}</li><li>{fr ? "Rediriger après chaque changement réussi." : "Redirect after every successful change."}</li></ol></section>
    <section><h2>{fr ? "Action index()" : "index() action"}</h2><CodeBlock>{`public function index(Request $request): Response
{
    return $this->view('books/index.php', [
        'books' => $this->session->get('books', []),
    ]);
}`}</CodeBlock></section>
    <section><h2>{fr ? "Vue de la liste" : "List view"}</h2><p><code>src/views/books/index.php</code></p><CodeBlock>{`<h1>${fr ? "Mes livres" : "My books"}</h1>
<p><a href="/books/create">${fr ? "Ajouter un livre" : "Add a book"}</a></p>

<?php if ($books === []): ?>
    <p>${fr ? "Aucun livre pour le moment." : "No books yet."}</p>
<?php else: ?>
    <ul>
    <?php foreach ($books as $book): ?>
        <li>
            <strong><?= $view->escape($book['title']) ?></strong>
            — <?= $view->escape($book['author']) ?>
            <a href="/books/<?= (int) $book['id'] ?>/edit">${fr ? "Modifier" : "Edit"}</a>
            <form method="post" action="/books/<?= (int) $book['id'] ?>/delete">
                <?= $view->csrfField() ?>
                <button type="submit">${fr ? "Supprimer" : "Delete"}</button>
            </form>
        </li>
    <?php endforeach; ?>
    </ul>
<?php endif; ?>`}</CodeBlock></section>
    <section><h2>{fr ? "Action de suppression" : "Delete action"}</h2><CodeBlock>{`public function destroy(Request $request): Response
{
    $id = (int) $request->attribute('id');
    $books = $this->session->get('books', []);
    $books = array_values(array_filter(
        $books,
        static fn (array $book): bool => $book['id'] !== $id,
    ));
    $this->session->set('books', $books);

    return Response::redirect('/books', 303);
}`}</CodeBlock><p>{fr ? "array_filter conserve les livres dont l’identifiant est différent. array_values remet les positions du tableau dans un ordre simple. L’identifiant métier du livre, lui, ne change pas." : "array_filter keeps books with a different identifier. array_values resets array positions into a simple order. The book's business identifier itself does not change."}</p></section>
    <section><h2>{fr ? "Plan de vérification" : "Verification plan"}</h2><div className="placement-table"><Row left={fr ? "Créer un livre valide" : "Create a valid book"} right="303 → GET /books"/><Row left={fr ? "Envoyer un titre vide" : "Submit an empty title"} right="422 + error"/><Row left={fr ? "Retirer le jeton CSRF" : "Remove the CSRF token"} right="419"/><Row left={fr ? "Modifier un identifiant absent" : "Edit a missing identifier"} right="404"/><Row left={fr ? "Supprimer un livre" : "Delete a book"} right={fr ? "disparaît de la liste" : "disappears from list"}/></div><CodeBlock>{"aml routes\naml test"}</CodeBlock></section>
    <section><h2>{fr ? "Ce que vous avez réellement appris" : "What you actually learned"}</h2><p>{fr ? "Vous n’avez pas seulement créé un formulaire. Vous avez séparé consultation et modification, lu une requête, validé ses valeurs, protégé une action, conservé un état entre plusieurs requêtes, choisi des statuts HTTP utiles et empêché la répétition d’un POST." : "You did more than create a form. You separated reading and modification, read a request, validated values, protected an action, kept state across requests, chose useful HTTP statuses, and prevented POST repetition."}</p></section>
    <Summary fr={fr} points={fr ? ["Le navigateur aide, mais le serveur valide toujours.", "csrfField() protège chaque formulaire de modification.", "La vue échappe toute valeur dynamique.", "Une redirection 303 termine proprement un POST.", "La session convient à l’apprentissage, pas à la persistance définitive."] : ["The browser helps, but the server always validates.", "csrfField() protects every modifying form.", "The view escapes every dynamic value.", "A 303 redirect cleanly completes a POST.", "Session suits learning, not permanent persistence."]}/>
  </Frame>;
}

function Box({ n, title, text }: { n: string; title: string; text: string }) { return <div><span>{n}</span><strong>{title}</strong><code>{text}</code></div>; }
function Card({ title, text }: { title: string; text: string }) { return <div><strong>{title}</strong><p>{text}</p></div>; }
function Row({ left, right }: { left: string; right: string }) { return <div><span>{left}</span><strong>{right}</strong></div>; }
function Note({ title, children }: { title: string; children: React.ReactNode }) { return <div className="notice"><strong>{title}</strong><p>{children}</p></div>; }
function Vocabulary({ fr, items }: { fr: boolean; items: string[][] }) { return <section><p className="chapter-one-kicker">{fr ? "VOCABULAIRE" : "VOCABULARY"}</p><h2>{fr ? "Les mots à retenir" : "Words to remember"}</h2><div className="placement-table">{items.map(([word, definition]) => <Row key={word} left={word} right={definition}/>)}</div></section>; }
function Summary({ fr, points }: { fr: boolean; points: string[] }) { return <section className="chapter-one-summary"><p className="chapter-one-kicker">{fr ? "EN RÉSUMÉ" : "SUMMARY"}</p><h2>{fr ? "Ce qu’il faut retenir" : "What to remember"}</h2><ul>{points.map((point) => <li key={point}>{point}</li>)}</ul></section>; }
function Checkpoint({ fr, question, answer }: { fr: boolean; question: string; answer: string }) { return <details className="chapter-one-check"><summary>{fr ? "Vérifiez votre compréhension : " : "Check your understanding: "}{question}</summary><p>{answer}</p></details>; }
