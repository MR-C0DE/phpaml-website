import Link from "next/link";
import { CodeBlock, Footer, Header } from "../components";
import "./chapter-one.css";
import "./chapter-two.css";

type Locale = "en" | "fr";
export type ChapterFiveLesson = "overview" | "partials" | "organization" | "assets" | "accessibility" | "errors" | "workshop";
const order: ChapterFiveLesson[] = ["overview", "partials", "organization", "assets", "accessibility", "errors", "workshop"];
const labels = {
  en: { overview: "A view's role", partials: "Reusable partials", organization: "Organize views", assets: "CSS, images, and JS", accessibility: "Accessible pages", errors: "Error pages", workshop: "Visual workshop" },
  fr: { overview: "Rôle d’une vue", partials: "Partiels réutilisables", organization: "Organiser les vues", assets: "CSS, images et JS", accessibility: "Pages accessibles", errors: "Pages d’erreur", workshop: "Atelier visuel" },
};
const descriptions = {
  en: { overview: "Separate content from presentation", partials: "Stop repeating shared HTML", organization: "Keep features easy to find", assets: "Understand public files", accessibility: "Build for people and devices", errors: "Give failures a useful face", workshop: "Polish the reading list" },
  fr: { overview: "Séparer contenu et présentation", partials: "Arrêter de répéter le HTML commun", organization: "Retrouver facilement les fonctions", assets: "Comprendre les fichiers publics", accessibility: "Construire pour tous", errors: "Donner un visage utile aux pannes", workshop: "Finaliser la bibliothèque" },
};

function url(locale: Locale, lesson: ChapterFiveLesson) { const prefix = locale === "fr" ? "/fr" : ""; return lesson === "overview" ? `${prefix}/docs/05` : `${prefix}/docs/05/${lesson}`; }
function Nav({ locale, current }: { locale: Locale; current: ChapterFiveLesson }) { const fr = locale === "fr"; return <nav className="chapter-one-nav" aria-label={fr ? "Pages du chapitre 5" : "Chapter 5 pages"}><div><small>{fr ? "CHAPITRE 05" : "CHAPTER 05"}</small><strong>{fr ? "Vues et fichiers" : "Views and assets"}</strong></div><ol>{order.map((item, index) => <li key={item} className={item === current ? "active" : ""}><Link href={url(locale, item)} aria-current={item === current ? "page" : undefined}><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{labels[locale][item]}</strong><small>{descriptions[locale][item]}</small></div></Link></li>)}</ol></nav>; }
function Pager({ locale, current }: { locale: Locale; current: ChapterFiveLesson }) { const index = order.indexOf(current); const previous = order[index - 1]; const next = order[index + 1]; return <nav className="chapter-one-pager"><Link href={previous ? url(locale, previous) : (locale === "fr" ? "/fr/docs/04" : "/docs/04")}>← {previous ? labels[locale][previous] : (locale === "fr" ? "Chapitre 04" : "Chapter 04")}</Link><Link href={next ? url(locale, next) : (locale === "fr" ? "/fr/docs/reference#environment" : "/docs/reference#environment")}>{next ? labels[locale][next] : (locale === "fr" ? "Environnement" : "Environment")} →</Link></nav>; }
function Frame({ locale, lesson, title, intro, children }: { locale: Locale; lesson: ChapterFiveLesson; title: React.ReactNode; intro: string; children: React.ReactNode }) { const fr = locale === "fr"; return <><Header locale={locale} path="/docs/05"/><main className="chapter-one-page"><header className="chapter-one-hero shell"><p className="eyebrow"><span/> {fr ? "Documentation · Chapitre 05" : "Documentation · Chapter 05"}</p><h1>{title}</h1><p>{intro}</p><p className="chapter-two-audience">{fr ? "Nous améliorons reading-list sans changer sa logique HTTP ni son stockage temporaire en session." : "We improve reading-list without changing its HTTP logic or temporary session storage."}</p></header><div className="chapter-one-layout shell"><Nav locale={locale} current={lesson}/><article className="chapter-one-article">{children}<Pager locale={locale} current={lesson}/></article></div></main><Footer locale={locale}/></>; }

export function ChapterFivePage({ locale, lesson }: { locale: Locale; lesson: ChapterFiveLesson }) {
  const fr = locale === "fr";
  if (lesson === "overview") return <Frame locale={locale} lesson={lesson} title={fr ? <>Construire des vues<br/><em>qui restent simples.</em></> : <>Build views<br/><em>that stay simple.</em></>} intro={fr ? "Une vue transforme des données préparées en un document compréhensible par le navigateur et par la personne qui utilise le site." : "A view turns prepared data into a document understood by both the browser and the person using the site."}>
    <section className="chapter-one-lead"><span>≈ 75 min</span><h2>{fr ? "Le fonctionnement est bon; améliorons maintenant la présentation." : "The behavior works; now improve its presentation."}</h2><p>{fr ? "Les pages du chapitre précédent répètent le doctype, head et parfois la navigation. Cette répétition fonctionne, mais elle rend chaque changement plus risqué. Nous allons partager le HTML commun et donner une place claire au CSS, aux images et au JavaScript facultatif." : "The previous chapter pages repeat the doctype, head, and sometimes navigation. This works, but makes every change riskier. We will share common HTML and give CSS, images, and optional JavaScript clear locations."}</p></section>
    <section><h2>{fr ? "Une vue fait trois choses" : "A view does three things"}</h2><div className="useful-grid"><Card title={fr ? "Structure" : "Structure"} text={fr ? "Titres, listes, formulaires et liens en HTML sémantique." : "Headings, lists, forms, and links in semantic HTML."}/><Card title={fr ? "Affichage" : "Display"} text={fr ? "Valeurs fournies par le contrôleur, toujours échappées." : "Values supplied by the controller, always escaped."}/><Card title={fr ? "Composition" : "Composition"} text={fr ? "Assemblage de petits partiels communs." : "Assembly of small shared partials."}/><Card title={fr ? "Références" : "References"} text={fr ? "Liens vers les styles, images et scripts publics." : "Links to public styles, images, and scripts."}/></div></section>
    <section><h2>{fr ? "Une vue ne décide pas tout" : "A view does not decide everything"}</h2><div className="good-bad"><div><span>{fr ? "DANS LA VUE" : "IN THE VIEW"}</span><p>{fr ? "Boucler sur les livres, échapper un titre, choisir un élément HTML, afficher une erreur déjà préparée." : "Loop through books, escape a title, choose an HTML element, display an already prepared error."}</p></div><div><span>{fr ? "HORS DE LA VUE" : "OUTSIDE THE VIEW"}</span><p>{fr ? "Interroger une base, modifier la session, décider des permissions ou valider une règle métier." : "Query a database, modify the session, decide permissions, or validate a business rule."}</p></div></div></section>
    <section><h2>{fr ? "La nouvelle carte" : "The new map"}</h2><CodeBlock>{"src/views/\n├── books/\n│   ├── index.php\n│   ├── create.php\n│   └── edit.php\n├── partials/\n│   ├── head.php\n│   ├── header.php\n│   ├── footer.php\n│   └── book-form.php\n└── errors/\n    ├── 404.php\n    ├── 500.php\n    └── default.php\n\npublic/\n├── css/app.css\n├── img/logo.svg\n└── js/books.js"}</CodeBlock></section>
    <Summary fr={fr} points={fr ? ["Le contrôleur prépare; la vue présente.", "Un partiel évite de recopier le HTML commun.", "Les vues privées restent dans src/views.", "Les fichiers demandés directement par le navigateur vont dans public."] : ["The controller prepares; the view presents.", "A partial prevents copying shared HTML.", "Private views stay in src/views.", "Files requested directly by the browser go in public."]}/>
  </Frame>;

  if (lesson === "partials") return <Frame locale={locale} lesson={lesson} title={fr ? <>Réutiliser du HTML<br/><em>sans le cacher.</em></> : <>Reuse HTML<br/><em>without hiding it.</em></>} intro={fr ? "Un partiel est un petit fichier de vue inclus dans une autre vue. Il reste du PHP et du HTML ordinaires." : "A partial is a small view file included by another view. It remains ordinary PHP and HTML."}>
    <section><h2>{fr ? "Le moteur cherche dans un dossier précis" : "The engine looks in one exact folder"}</h2><p>{fr ? "La méthode partial() cherche uniquement sous src/views/partials. Le nom transmis est relatif à ce dossier." : "The partial() method searches only under src/views/partials. The supplied name is relative to that folder."}</p><CodeBlock>{`<?php $view->partial('header.php') ?>
<?php $view->partial('footer.php') ?>`}</CodeBlock><p>{fr ? "Ces appels chargent src/views/partials/header.php et src/views/partials/footer.php. Un fichier absent provoque une erreur claire au lieu d’être silencieusement ignoré." : "These calls load src/views/partials/header.php and src/views/partials/footer.php. A missing file causes a clear error instead of being silently ignored."}</p></section>
    <section><h2>{fr ? "Créez le head commun" : "Create the shared head"}</h2><p><code>src/views/partials/head.php</code></p><CodeBlock>{`<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="<?= $view->escape($description ?? '') ?>">
<title><?= $view->escape($title ?? 'Reading List') ?></title>
<link rel="stylesheet" href="/css/app.css">`}</CodeBlock><p>{fr ? "Les opérateurs ?? fournissent une valeur de remplacement lorsque title ou description ne sont pas transmis." : "The ?? operators provide a fallback when title or description are not supplied."}</p></section>
    <section><h2>{fr ? "Transmettez des valeurs au partiel" : "Pass values to the partial"}</h2><CodeBlock>{`<!DOCTYPE html>
<html lang="${fr ? "fr" : "en"}">
<head>
    <?php $view->partial('head.php', [
        'title' => '${fr ? "Mes livres" : "My books"}',
        'description' => '${fr ? "Votre bibliothèque personnelle." : "Your personal library."}',
    ]) ?>
</head>
<body>
    <?php $view->partial('header.php') ?>
    <main><!-- contenu propre à la page --></main>
    <?php $view->partial('footer.php') ?>
</body>
</html>`}</CodeBlock><p>{fr ? "Le tableau du second argument est extrait seulement pour ce partiel. Le head reçoit donc les métadonnées dont il a besoin sans dépendre de variables globales." : "The second argument array is extracted only for that partial. The head receives the metadata it needs without depending on global variables."}</p></section>
    <section><h2>{fr ? "Partiel ou page complète ?" : "Partial or complete page?"}</h2><div className="placement-table"><Row left={fr ? "Navigation partagée" : "Shared navigation"} right="partials/header.php"/><Row left={fr ? "Champs titre + auteur" : "Title + author fields"} right="partials/book-form.php"/><Row left={fr ? "Liste complète des livres" : "Complete book list"} right="books/index.php"/><Row left={fr ? "Formulaire Ajouter" : "Add form page"} right="books/create.php"/></div><Note title={fr ? "Le moteur classique n’impose pas un système de layout" : "The classic engine does not impose a layout system"}>{fr ? "La composition se fait explicitement avec partial(). Cette transparence aide à comprendre quel fichier produit chaque morceau du document." : "Composition is explicit through partial(). This transparency makes it clear which file produces each part of the document."}</Note></section>
  </Frame>;

  if (lesson === "organization") return <Frame locale={locale} lesson={lesson} title={fr ? <>Organiser les vues<br/><em>par fonctionnalité.</em></> : <>Organize views<br/><em>by feature.</em></>} intro={fr ? "Quand une application grandit, des noms précis et des dossiers prévisibles évitent de chercher au hasard." : "As an application grows, precise names and predictable folders prevent random searching."}>
    <section><h2>{fr ? "Déplacez les vues Livres ensemble" : "Keep Books views together"}</h2><CodeBlock>{"src/views/books/index.php\nsrc/views/books/create.php\nsrc/views/books/edit.php"}</CodeBlock><p>{fr ? "Le chemin donné au contrôleur est toujours relatif à src/views. Il faut donc mettre à jour les appels." : "The controller path is always relative to src/views. Controller calls must therefore be updated."}</p><CodeBlock>{`return $this->view('books/index.php', ['books' => $books]);
return $this->view('books/create.php', ['errors' => [], 'old' => []]);
return $this->view('books/edit.php', ['book' => $book, 'errors' => []]);`}</CodeBlock></section>
    <section><h2>{fr ? "Extrayez le formulaire partagé" : "Extract the shared form"}</h2><p><code>src/views/partials/book-form.php</code></p><CodeBlock>{`<label for="title">${fr ? "Titre" : "Title"}</label>
<input id="title" name="title" type="text" required
       value="<?= $view->escape($values['title'] ?? '') ?>">
<?php foreach ($errors['title'] ?? [] as $error): ?>
    <p class="field-error" role="alert"><?= $view->escape($error) ?></p>
<?php endforeach; ?>

<label for="author">${fr ? "Auteur" : "Author"}</label>
<input id="author" name="author" type="text" required
       value="<?= $view->escape($values['author'] ?? '') ?>">
<?php foreach ($errors['author'] ?? [] as $error): ?>
    <p class="field-error" role="alert"><?= $view->escape($error) ?></p>
<?php endforeach; ?>`}</CodeBlock></section>
    <section><h2>{fr ? "Utilisez-le pour créer et modifier" : "Use it for create and edit"}</h2><CodeBlock>{`<form method="post" action="<?= $view->escape($action) ?>">
    <?= $view->csrfField() ?>
    <?php $view->partial('book-form.php', [
        'values' => $values,
        'errors' => $errors,
    ]) ?>
    <button type="submit"><?= $view->escape($submitLabel) ?></button>
</form>`}</CodeBlock><p>{fr ? "Le contrôleur transmet action, values et submitLabel. Le même partiel affiche les champs; la page reste responsable de l’adresse d’envoi et du texte du bouton." : "The controller passes action, values, and submitLabel. The same partial displays fields; the page remains responsible for submission address and button text."}</p></section>
    <section><h2>{fr ? "Règle pratique" : "Practical rule"}</h2><p>{fr ? "Extrayez un partiel lorsque le même bloc apparaît réellement dans plusieurs pages ou lorsqu’il représente une unité claire comme une navigation. Ne découpez pas chaque balise en fichier : trop de petits fichiers rendent le trajet plus difficile à suivre." : "Extract a partial when the same block truly appears on several pages or represents a clear unit such as navigation. Do not split every element into a file: too many tiny files make the flow harder to follow."}</p></section>
  </Frame>;

  if (lesson === "assets") return <Frame locale={locale} lesson={lesson} title={fr ? <>Servir CSS, images<br/><em>et JavaScript.</em></> : <>Serve CSS, images,<br/><em>and JavaScript.</em></>} intro={fr ? "Le navigateur peut demander directement les fichiers de public/. Il ne doit jamais recevoir les fichiers privés de src/." : "The browser can directly request files under public/. It must never receive private files under src/."}>
    <section><h2>{fr ? "Racine publique et chemin URL" : "Public root and URL path"}</h2><div className="placement-table"><Row left="public/css/app.css" right="/css/app.css"/><Row left="public/img/logo.svg" right="/img/logo.svg"/><Row left="public/js/books.js" right="/js/books.js"/></div><p>{fr ? "Le mot public ne figure pas dans l’URL, car ce dossier est déjà la racine exposée par le serveur. Une URL /src/views/books/index.php doit rester inaccessible." : "The word public does not appear in the URL because this folder is already the server's exposed root. A /src/views/books/index.php URL must remain inaccessible."}</p></section>
    <section><h2>{fr ? "Créez une base CSS simple" : "Create a simple CSS foundation"}</h2><p><code>public/css/app.css</code></p><CodeBlock>{`:root {
    color-scheme: light;
    font-family: system-ui, sans-serif;
    color: #171717;
    background: #f7f7f5;
}

body { margin: 0; }
.container { width: min(68rem, calc(100% - 2rem)); margin-inline: auto; }
header { border-bottom: 1px solid #d7d7d2; }
nav { display: flex; gap: 1rem; padding-block: 1rem; }
main { padding-block: 3rem; }
input, button { min-height: 2.75rem; font: inherit; }
.field-error { color: #a40018; }`}</CodeBlock><p>{fr ? "Le CSS améliore la présentation sans déplacer la structure HTML ni la logique PHP. Commencez par les fondations : largeur lisible, contraste, espacements et champs utilisables." : "CSS improves presentation without moving HTML structure or PHP logic. Start with foundations: readable width, contrast, spacing, and usable fields."}</p></section>
    <section><h2>{fr ? "Ajoutez une image avec une alternative" : "Add an image with alternative text"}</h2><CodeBlock>{`<img src="/img/logo.svg"
     width="40" height="40"
     alt="Reading List">`}</CodeBlock><p>{fr ? "width et height réservent l’espace avant le téléchargement. alt décrit l’information utile. Si l’image est purement décorative, utilisez alt=\"\" afin qu’un lecteur d’écran l’ignore." : "width and height reserve space before download. alt describes useful information. If the image is purely decorative, use alt=\"\" so a screen reader ignores it."}</p></section>
    <section><h2>{fr ? "JavaScript seulement lorsqu’il apporte quelque chose" : "JavaScript only when it adds value"}</h2><CodeBlock>{`<script src="/js/books.js" defer></script>`}</CodeBlock><p>{fr ? "defer télécharge le script sans bloquer la lecture du HTML et l’exécute après l’analyse du document. Le CRUD doit rester fonctionnel sans ce fichier. Un script peut ensuite ajouter une confirmation de suppression ou une amélioration visuelle, jamais remplacer la validation serveur." : "defer downloads the script without blocking HTML parsing and runs it after the document is parsed. The CRUD should remain functional without it. A script can add delete confirmation or a visual enhancement, never replace server validation."}</p><Note title={fr ? "Une page particulière peut charger un script particulier" : "A specific page can load a specific script"}>{fr ? "Ajoutez /js/books.js seulement dans les pages Livres si les autres pages n’en ont pas besoin. Cela évite du travail inutile au navigateur." : "Add /js/books.js only to Books pages when other pages do not need it. This avoids unnecessary browser work."}</Note></section>
  </Frame>;

  if (lesson === "accessibility") return <Frame locale={locale} lesson={lesson} title={fr ? <>Créer une interface<br/><em>utilisable par tous.</em></> : <>Create an interface<br/><em>usable by everyone.</em></>} intro={fr ? "L’accessibilité commence par du HTML correct. Elle aide aussi les claviers, les mobiles, les moteurs de recherche et les personnes temporairement limitées." : "Accessibility starts with correct HTML. It also helps keyboards, mobile devices, search engines, and temporarily limited users."}>
    <section><h2>{fr ? "Une structure qui a du sens" : "A meaningful structure"}</h2><CodeBlock>{`<header>…</header>
<nav aria-label="${fr ? "Navigation principale" : "Main navigation"}">…</nav>
<main id="content">
    <h1>${fr ? "Mes livres" : "My books"}</h1>
    …
</main>
<footer>…</footer>`}</CodeBlock><p>{fr ? "Ces éléments décrivent leur rôle, contrairement à une suite de div anonymes. Une page possède normalement un titre principal h1, puis des h2 pour ses grandes sections." : "These elements describe their role, unlike anonymous div elements. A page normally has one main h1 heading, then h2 headings for major sections."}</p></section>
    <section><h2>{fr ? "Les formulaires doivent rester compréhensibles" : "Forms must remain understandable"}</h2><ul><li>{fr ? "Chaque input possède un label relié par for et id." : "Every input has a label connected through for and id."}</li><li>{fr ? "Les erreurs apparaissent près du champ et utilisent role=alert." : "Errors appear near the field and use role=alert."}</li><li>{fr ? "Le focus reste visible au clavier." : "Keyboard focus remains visible."}</li><li>{fr ? "Le bouton décrit l’action : Enregistrer plutôt que OK." : "The button describes the action: Save rather than OK."}</li><li>{fr ? "La couleur n’est jamais le seul signal d’erreur." : "Color is never the only error signal."}</li></ul><CodeBlock>{`input:focus-visible,
button:focus-visible,
a:focus-visible {
    outline: 3px solid #5b35e8;
    outline-offset: 3px;
}`}</CodeBlock></section>
    <section><h2>{fr ? "Métadonnées minimales par page" : "Minimum metadata per page"}</h2><CodeBlock>{`<html lang="${fr ? "fr" : "en"}">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${fr ? "Mes livres — Reading List" : "My books — Reading List"}</title>
<meta name="description" content="${fr ? "Gérez votre bibliothèque personnelle." : "Manage your personal library."}">`}</CodeBlock><p>{fr ? "lang aide la prononciation par les technologies d’assistance. title distingue les onglets. La description résume la page pour les moteurs et les aperçus, sans garantir à elle seule un bon référencement." : "lang helps assistive technology pronunciation. title distinguishes tabs. The description summarizes the page for search engines and previews, without guaranteeing good ranking by itself."}</p></section>
    <section><h2>{fr ? "Contrôle manuel en cinq minutes" : "Five-minute manual check"}</h2><ol><li>{fr ? "Parcourez toute la page avec Tab uniquement." : "Navigate the whole page using only Tab."}</li><li>{fr ? "Zoomez à 200 % et cherchez un contenu coupé." : "Zoom to 200% and look for clipped content."}</li><li>{fr ? "Réduisez la fenêtre à la largeur d’un téléphone." : "Narrow the window to phone width."}</li><li>{fr ? "Soumettez un formulaire invalide et lisez l’ordre des messages." : "Submit an invalid form and read the message order."}</li><li>{fr ? "Désactivez le CSS : le document doit conserver un ordre logique." : "Disable CSS: the document should keep a logical order."}</li></ol></section>
  </Frame>;

  if (lesson === "errors") return <Frame locale={locale} lesson={lesson} title={fr ? <>Transformer une panne<br/><em>en prochaine action.</em></> : <>Turn a failure<br/><em>into a next action.</em></>} intro={fr ? "Une page d’erreur publique doit être calme, brève et utile. Les détails techniques restent dans l’écran de développement ou les journaux." : "A public error page should be calm, brief, and useful. Technical details stay in the development screen or logs."}>
    <section><h2>{fr ? "Le dossier est déjà configuré" : "The folder is already configured"}</h2><p>{fr ? "Le template actuel pointe error_views vers src/views/errors. PHPAML cherche d’abord le fichier du statut, par exemple 404.php, puis default.php si aucun fichier précis n’existe." : "The current template points error_views to src/views/errors. PHPAML first looks for the status file, such as 404.php, then default.php when no specific file exists."}</p><CodeBlock>{"src/views/errors/404.php\nsrc/views/errors/500.php\nsrc/views/errors/default.php"}</CodeBlock></section>
    <section><h2>{fr ? "Une page 404 utile" : "A useful 404 page"}</h2><p><code>src/views/errors/404.php</code></p><CodeBlock>{`<!DOCTYPE html>
<html lang="${fr ? "fr" : "en"}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 — ${fr ? "Page introuvable" : "Page not found"}</title>
    <link rel="stylesheet" href="/css/error.css">
</head>
<body>
<main>
    <p>404</p>
    <h1>${fr ? "Cette page est introuvable." : "This page cannot be found."}</h1>
    <p>${fr ? "Vérifiez l’adresse ou retournez à votre bibliothèque." : "Check the address or return to your library."}</p>
    <a href="/books">${fr ? "Voir mes livres" : "View my books"}</a>
</main>
</body>
</html>`}</CodeBlock></section>
    <section><h2>{fr ? "Une page générique sans fuite" : "A generic page without leakage"}</h2><p><code>src/views/errors/default.php</code></p><CodeBlock>{`<!DOCTYPE html>
<html lang="${fr ? "fr" : "en"}">
<head><meta charset="UTF-8"><title><?= (int) $status ?> — Error</title></head>
<body>
<main>
    <p><?= (int) $status ?></p>
    <h1><?= htmlspecialchars($title, ENT_QUOTES, 'UTF-8') ?></h1>
    <p>${fr ? "La demande n’a pas pu être terminée." : "The request could not be completed."}</p>
    <?php if ($requestId !== null): ?>
        <p>${fr ? "Référence" : "Reference"}: <code><?= htmlspecialchars($requestId, ENT_QUOTES, 'UTF-8') ?></code></p>
    <?php endif; ?>
</main>
</body>
</html>`}</CodeBlock><p>{fr ? "Le numéro de référence permet de retrouver l’incident dans les journaux sans montrer la trace, les chemins internes ou les secrets au visiteur." : "The reference number helps find the incident in logs without showing the visitor a trace, internal paths, or secrets."}</p></section>
    <section><h2>{fr ? "Quel fichier pour quel problème ?" : "Which file for which problem?"}</h2><div className="placement-table"><Row left="404.php" right={fr ? "adresse inconnue" : "unknown address"}/><Row left="500.php" right={fr ? "erreur interne inattendue" : "unexpected internal error"}/><Row left="default.php" right={fr ? "419, 422, 429, 503 et autres" : "419, 422, 429, 503, and others"}/></div><Note title={fr ? "Développement et production sont différents" : "Development and production differ"}>{fr ? "Avec APP_DEBUG activé, PHPAML peut afficher son panneau détaillé pour corriger le code. En production, le visiteur doit recevoir la page sûre et générique." : "With APP_DEBUG enabled, PHPAML may display its detailed panel for fixing code. In production, visitors must receive the safe generic page."}</Note></section>
  </Frame>;

  return <Frame locale={locale} lesson="workshop" title={fr ? <>Atelier : une interface<br/><em>simple et cohérente.</em></> : <>Workshop: a simple,<br/><em>consistent interface.</em></>} intro={fr ? "Réorganisez reading-list sans changer son comportement. Chaque amélioration doit pouvoir être vérifiée séparément." : "Reorganize reading-list without changing its behavior. Every improvement should be independently verifiable."}>
    <section className="chapter-one-exercise"><span>{fr ? "OBJECTIF" : "OBJECTIVE"}</span><h2>{fr ? "Donner la même identité à toutes les pages Livres." : "Give every Books page the same identity."}</h2><ol><li>{fr ? "Créer head, header, footer et book-form comme partiels." : "Create head, header, footer, and book-form partials."}</li><li>{fr ? "Ranger les pages sous src/views/books." : "Store pages under src/views/books."}</li><li>{fr ? "Créer public/css/app.css et public/img/logo.svg." : "Create public/css/app.css and public/img/logo.svg."}</li><li>{fr ? "Ajouter une navigation clavier claire et des métadonnées." : "Add clear keyboard navigation and metadata."}</li><li>{fr ? "Personnaliser 404.php et default.php." : "Customize 404.php and default.php."}</li></ol></section>
    <section><h2>{fr ? "Le header partagé" : "Shared header"}</h2><p><code>src/views/partials/header.php</code></p><CodeBlock>{`<header>
    <nav class="container" aria-label="${fr ? "Navigation principale" : "Main navigation"}">
        <a class="brand" href="/books">
            <img src="/img/logo.svg" width="32" height="32" alt="">
            <span>Reading List</span>
        </a>
        <a href="/books">${fr ? "Livres" : "Books"}</a>
        <a href="/books/create">${fr ? "Ajouter" : "Add"}</a>
        <a href="/about">${fr ? "À propos" : "About"}</a>
    </nav>
</header>`}</CodeBlock></section>
    <section><h2>{fr ? "Le footer partagé" : "Shared footer"}</h2><p><code>src/views/partials/footer.php</code></p><CodeBlock>{`<footer>
    <div class="container">
        <small>&copy; <?= date('Y') ?> Reading List</small>
    </div>
</footer>`}</CodeBlock></section>
    <section><h2>{fr ? "Ordre de migration sans casse" : "Safe migration order"}</h2><ol><li>{fr ? "Créez les partiels sans retirer l’ancien HTML." : "Create partials without removing old HTML."}</li><li>{fr ? "Migrez seulement books/index.php et rechargez /books." : "Migrate only books/index.php and reload /books."}</li><li>{fr ? "Migrez create.php, puis testez un ajout valide et invalide." : "Migrate create.php, then test a valid and invalid addition."}</li><li>{fr ? "Migrez edit.php, puis testez modification et suppression." : "Migrate edit.php, then test update and deletion."}</li><li>{fr ? "Ajoutez CSS et images après avoir confirmé le HTML." : "Add CSS and images after confirming the HTML."}</li></ol><p>{fr ? "Cette progression évite de modifier structure, style et comportement en même temps. Si une erreur apparaît, la dernière petite étape désigne probablement sa cause." : "This progression avoids changing structure, style, and behavior simultaneously. If an error appears, the last small step probably identifies its cause."}</p></section>
    <section><h2>{fr ? "Liste de vérification finale" : "Final checklist"}</h2><div className="placement-table"><Row left={fr ? "Toutes les pages ont un h1 unique" : "Every page has one unique h1"} right="✓"/><Row left={fr ? "Tab atteint tous les contrôles" : "Tab reaches every control"} right="✓"/><Row left={fr ? "Les erreurs restent près des champs" : "Errors remain near fields"} right="✓"/><Row left={fr ? "Les valeurs sont échappées" : "Values are escaped"} right="✓"/><Row left={fr ? "Une URL inconnue montre la 404" : "An unknown URL shows 404"} right="✓"/><Row left={fr ? "Aucun fichier src n’est public" : "No src file is public"} right="✓"/></div><CodeBlock>{"aml test\n# puis vérifier /books, /books/create et une URL inconnue"}</CodeBlock></section>
    <Summary fr={fr} points={fr ? ["partial() compose explicitement les vues classiques.", "src/views reste privé; public est servi au navigateur.", "Le HTML sémantique précède la décoration CSS.", "Le JavaScript enrichit mais ne remplace pas le serveur.", "Les pages d’erreur publiques n’exposent aucun détail interne."] : ["partial() explicitly composes classic views.", "src/views stays private; public is served to the browser.", "Semantic HTML comes before CSS decoration.", "JavaScript enhances but does not replace the server.", "Public error pages expose no internal detail."]}/>
  </Frame>;
}

function Card({ title, text }: { title: string; text: string }) { return <div><strong>{title}</strong><p>{text}</p></div>; }
function Row({ left, right }: { left: string; right: string }) { return <div><span>{left}</span><strong>{right}</strong></div>; }
function Note({ title, children }: { title: string; children: React.ReactNode }) { return <div className="notice"><strong>{title}</strong><p>{children}</p></div>; }
function Summary({ fr, points }: { fr: boolean; points: string[] }) { return <section className="chapter-one-summary"><p className="chapter-one-kicker">{fr ? "EN RÉSUMÉ" : "SUMMARY"}</p><h2>{fr ? "Ce qu’il faut retenir" : "What to remember"}</h2><ul>{points.map((point) => <li key={point}>{point}</li>)}</ul></section>; }
