import Link from "next/link";
import { CodeBlock, Footer, Header } from "../components";
import { release, releaseAssetUrl } from "../release";
import "./chapter-one.css";

type Locale = "en" | "fr";
type Lesson = "overview" | "installation" | "verification" | "creation" | "execution" | "depannage";

const order: Lesson[] = ["overview", "installation", "verification", "creation", "execution", "depannage"];
const labels = {
  en: { overview: "Overview", installation: "Install AML", verification: "Verify", creation: "Create", execution: "Run", depannage: "Troubleshoot" },
  fr: { overview: "Vue d’ensemble", installation: "Installer AML", verification: "Vérifier", creation: "Créer", execution: "Exécuter", depannage: "Dépanner" },
};
const descriptions = {
  en: { overview: "Understand AML, PHPAML, and runtime", installation: "Install the complete toolchain", verification: "Check the environment and language", creation: "Generate the right project", execution: "Start and understand the project", depannage: "Solve common problems" },
  fr: { overview: "Comprendre AML, PHPAML et runtime", installation: "Installer toute la chaîne d’outils", verification: "Contrôler l’environnement et la langue", creation: "Générer le bon projet", execution: "Démarrer et comprendre le projet", depannage: "Résoudre les problèmes courants" },
};

function url(locale: Locale, lesson: Lesson) {
  const prefix = locale === "fr" ? "/fr" : "";
  return lesson === "overview" ? prefix + "/docs/01" : prefix + "/docs/01/" + lesson;
}

function SideNav({ locale, current }: { locale: Locale; current: Lesson }) {
  const fr = locale === "fr";
  return <nav className="chapter-one-nav" aria-label={fr ? "Pages du chapitre 1" : "Chapter 1 pages"}>
    <div><small>{fr ? "CHAPITRE 01" : "CHAPTER 01"}</small><strong>{fr ? "Premiers pas" : "Getting started"}</strong></div>
    <ol>{order.map((item, index) => <li key={item} className={item === current ? "active" : ""}><Link href={url(locale, item)} aria-current={item === current ? "page" : undefined}><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{labels[locale][item]}</strong><small>{descriptions[locale][item]}</small></div></Link></li>)}</ol>
  </nav>;
}

function Pager({ locale, current }: { locale: Locale; current: Lesson }) {
  const index = order.indexOf(current);
  const previous = order[index - 1];
  const next = order[index + 1];
  return <nav className="chapter-one-pager">
    <Link href={previous ? url(locale, previous) : (locale === "fr" ? "/fr/docs" : "/docs")}>← {previous ? labels[locale][previous] : "Documentation"}</Link>
    <Link href={next ? url(locale, next) : (locale === "fr" ? "/fr/docs/reference#architecture" : "/docs/reference#architecture")}>{next ? labels[locale][next] : (locale === "fr" ? "Chapitre 02" : "Chapter 02")} →</Link>
  </nav>;
}

function Frame({ locale, lesson, title, intro, children }: { locale: Locale; lesson: Lesson; title: React.ReactNode; intro: string; children: React.ReactNode }) {
  const fr = locale === "fr";
  return <><Header locale={locale} path="/docs/01" /><main className="chapter-one-page">
    <header className="chapter-one-hero shell"><p className="eyebrow"><span /> {fr ? "Documentation · Chapitre 01" : "Documentation · Chapter 01"}</p><h1>{title}</h1><p>{intro}</p></header>
    <div className="chapter-one-layout shell"><SideNav locale={locale} current={lesson}/><article className="chapter-one-article">{children}<Pager locale={locale} current={lesson}/></article></div>
  </main><Footer locale={locale}/></>;
}

export function ChapterOnePage({ locale, lesson }: { locale: Locale; lesson: Lesson }) {
  const fr = locale === "fr";
  if (lesson === "overview") return <Frame locale={locale} lesson={lesson} title={fr ? <>Installer AML et créer<br/><em>son premier projet.</em></> : <>Install AML and create<br/><em>your first project.</em></>} intro={fr ? "Un parcours guidé, découpé en pages courtes, pour passer d’une machine neuve à une application PHPAML qui fonctionne." : "A guided path, split into focused pages, from a new machine to a working PHPAML application."}>
    <section className="chapter-one-lead"><span>≈ 25 min</span><h2>{fr ? "Ce chapitre construit de bonnes bases." : "This chapter builds the right foundations."}</h2><p>{fr ? "Vous allez distinguer AML, PHPAML et le runtime, installer l’outil officiel, vérifier la machine, choisir un type de projet puis le lancer. Chaque commande est expliquée avant d’être utilisée." : "You will distinguish AML, PHPAML, and the runtime, install the official tool, verify the machine, choose a project type, and run it. Every command is explained before it is used."}</p></section>
    <section><h2>{fr ? "Avant de commencer" : "Before you begin"}</h2><p>{fr ? "Il vous faut Windows 10/11 x64, un Mac Apple Silicon ou Debian/Ubuntu x64, une connexion Internet et un terminal. AML fournit PHP 8.4 et Composer : aucune installation séparée de PHP, Composer ou Node.js n’est nécessaire." : "You need Windows 10/11 x64, an Apple Silicon Mac, or Debian/Ubuntu x64, an internet connection, and a terminal. AML includes PHP 8.4 and Composer: no separate PHP, Composer, or Node.js installation is required."}</p><Note title={fr ? "Résultat attendu" : "Expected result"}>{fr ? "À la fin, aml doctor est sain et votre projet répond dans le navigateur sur une adresse locale." : "At the end, aml doctor is healthy and your project responds in the browser at a local address."}</Note></section>
    <section><h2>{fr ? "Trois rôles différents" : "Three different roles"}</h2><div className="chapter-one-concepts"><Concept n="01" title="AML">{fr ? "La commande qui crée, vérifie, lance, teste et met à jour les projets." : "The command that creates, verifies, runs, tests, and updates projects."}</Concept><Concept n="02" title="PHPAML">{fr ? "Le framework qui structure l’application, ses routes et ses réponses." : "The framework that structures the application, routes, and responses."}</Concept><Concept n="03" title="runtime/">{fr ? "L’environnement privé et reconstructible. Votre code reste dans src/." : "The private, rebuildable environment. Your code stays in src/."}</Concept></div></section>
  </Frame>;

  if (lesson === "installation") return <Frame locale={locale} lesson={lesson} title={fr ? <>Installer AML<br/><em>correctement.</em></> : <>Install AML<br/><em>correctly.</em></>} intro={fr ? "Utilisez le paquet officiel de votre système. AML installe sa propre version de PHP et Composer." : "Use the official package for your system. AML installs its own PHP and Composer."}>
    <section><h2>{fr ? "Choisissez votre système" : "Choose your system"}</h2><div className="chapter-one-downloads">{release.assets.slice(0, 3).map((asset, index) => <a key={asset.file} href={releaseAssetUrl(asset.file)}><span>0{index + 1}</span><strong>{["Windows x64", "macOS ARM64", "Linux x64"][index]}</strong><code>{asset.file}</code><b>{fr ? "Télécharger" : "Download"} ↓</b></a>)}</div><p>{fr ? "La version documentée ici est AML " + release.cliVersion + ". Téléchargez toujours depuis phpaml.com ou la release GitHub officielle." : "This documentation targets AML " + release.cliVersion + ". Always download from phpaml.com or the official GitHub release."}</p></section>
    <section><h2>{fr ? "Installer selon la plateforme" : "Install for your platform"}</h2><h3>Windows</h3><p>{fr ? "Ouvrez le .exe puis un nouveau terminal. L’installation utilise votre profil et ne demande normalement pas de droits administrateur." : "Open the .exe, then a new terminal. Installation uses your profile and normally needs no administrator rights."}</p><h3>macOS</h3><p>{fr ? "Ouvrez le .pkg. Le paquet bêta n’étant pas encore signé par Apple, macOS peut demander une autorisation dans Confidentialité et sécurité." : "Open the .pkg. Because the beta package is not yet signed by Apple, macOS may request approval under Privacy & Security."}</p><h3>Debian / Ubuntu</h3><CodeBlock>{"sudo dpkg -i phpaml-" + release.cliVersion + "-linux-x64.deb"}</CodeBlock></section>
    <section><h2>{fr ? "Premier contrôle" : "First check"}</h2><CodeBlock>{"aml version"}</CodeBlock><p>{fr ? "Le terminal doit afficher " + release.cliVersion + ". Si aml est introuvable, fermez puis rouvrez le terminal pour recharger le PATH." : "The terminal should display " + release.cliVersion + ". If aml is not found, close and reopen the terminal to reload PATH."}</p></section>
  </Frame>;

  if (lesson === "verification") return <Frame locale={locale} lesson={lesson} title={fr ? <>Vérifier<br/><em>l’environnement.</em></> : <>Verify the<br/><em>environment.</em></>} intro={fr ? "Confirmez que la commande, le runtime privé, le cache et le port de développement sont disponibles." : "Confirm that the command, private runtime, cache, and development port are available."}>
    <section><h2>aml doctor</h2><CodeBlock>{"aml doctor"}</CodeBlock><p>{fr ? "Chaque ligne décrit un contrôle. Une erreur doit être corrigée avant de continuer." : "Each line describes one check. An error must be fixed before continuing."}</p><div className="chapter-one-output"><span>[OK]</span> AML — version {release.cliVersion}<br/><span>[OK]</span> PHP — compatible<br/><span>[OK]</span> Cache AML — writable<br/><span>[OK]</span> Development port — available</div></section>
    <section><h2>{fr ? "Choisir la langue" : "Choose the language"}</h2><CodeBlock>{"aml language\naml language fr\naml language en"}</CodeBlock><p>{fr ? "Sans argument, la commande affiche la langue actuelle. Ce choix traduit la CLI, pas automatiquement votre application." : "Without an argument, the command shows the current language. This choice translates the CLI, not your application."}</p></section>
    <section><h2>{fr ? "Lire le résultat" : "Read the result"}</h2><ul><li>{fr ? "OK : le contrôle est réussi." : "OK: the check passed."}</li><li>{fr ? "WARNING : une capacité facultative est limitée." : "WARNING: an optional capability is limited."}</li><li>{fr ? "ERROR : corrigez le problème puis relancez aml doctor." : "ERROR: fix the problem, then run aml doctor again."}</li></ul></section>
  </Frame>;

  if (lesson === "creation") return <Frame locale={locale} lesson={lesson} title={fr ? <>Créer le bon<br/><em>type de projet.</em></> : <>Create the right<br/><em>project type.</em></>} intro={fr ? "La commande de création installe automatiquement le projet : aml install n’est pas une étape normale après la création." : "The create command installs the project automatically: aml install is not a routine step after creation."}>
    <section><h2>{fr ? "Choisissez selon votre besoin" : "Choose for your use case"}</h2><div className="chapter-one-choices"><Choice cmd="aml create" title={fr ? "Application classique" : "Classic application"}>{fr ? "MVC, routes, contrôleurs et vues PHP." : "MVC, routes, controllers, and PHP views."}</Choice><Choice cmd="aml create-view" title="AML View">{fr ? "Interface réactive écrite directement en PHP." : "Reactive interface written directly in PHP."}</Choice><Choice cmd="aml create-api" title="API">{fr ? "Service JSON sans interface graphique." : "JSON service without a graphical interface."}</Choice><Choice cmd="aml create-console" title="Console">{fr ? "Programme PHP pur dans le terminal." : "Pure PHP program in the terminal."}</Choice></div></section>
    <section><h2>{fr ? "Créer une application classique" : "Create a classic application"}</h2><div className="chapter-one-code-pair"><div><small>{fr ? "NOUVEAU DOSSIER" : "NEW FOLDER"}</small><CodeBlock>{fr ? "aml create mon-premier-projet\ncd mon-premier-projet" : "aml create my-first-project\ncd my-first-project"}</CodeBlock></div><div><small>{fr ? "DOSSIER VIDE ACTUEL" : "CURRENT EMPTY FOLDER"}</small><CodeBlock>{fr ? "mkdir mon-premier-projet\ncd mon-premier-projet\naml create ." : "mkdir my-first-project\ncd my-first-project\naml create ."}</CodeBlock></div></div><Note title="Important">{fr ? "La création installe déjà le runtime. Utilisez aml install seulement pour reconstruire un projet existant, ou après --no-install." : "Creation already installs the runtime. Use aml install only to rebuild an existing project, or after --no-install."}</Note></section>
    <section><h2>{fr ? "Structure créée" : "Created structure"}</h2><CodeBlock>{fr ? "public/       point d’entrée Web\nsrc/          votre code applicatif\nroutes/       déclaration des routes\nruntime/      moteur privé reconstructible\nphpaml.json   manifeste PHPAML" : "public/       Web entry point\nsrc/          your application code\nroutes/       route declarations\nruntime/      rebuildable private engine\nphpaml.json   PHPAML manifest"}</CodeBlock></section>
  </Frame>;

  if (lesson === "execution") return <Frame locale={locale} lesson={lesson} title={fr ? <>Démarrer et comprendre<br/><em>le projet.</em></> : <>Run and understand<br/><em>the project.</em></>} intro={fr ? "Lancez le serveur depuis la racine du projet et ouvrez l’adresse affichée par AML." : "Start the server from the project root and open the address shown by AML."}>
    <section><h2>{fr ? "Lancer le serveur" : "Start the server"}</h2><CodeBlock>{"aml serve"}</CodeBlock><div className="chapter-one-output">PHPAML is listening at http://127.0.0.1:8910<br/>Use Ctrl+C to stop the server.</div><p>{fr ? "Gardez ce terminal ouvert. Si 8910 est occupé, AML essaie automatiquement le port suivant." : "Keep this terminal open. If 8910 is busy, AML automatically tries the next port."}</p></section>
    <section><h2>{fr ? "Si runtime/ a disparu" : "If runtime/ is missing"}</h2><p>{fr ? "Au démarrage, aml serve détecte son absence et tente de le reconstruire. Si cela échoue, aml install donne un diagnostic détaillé." : "At startup, aml serve detects when it is missing and attempts to rebuild it. If that fails, aml install provides a detailed diagnostic."}</p><CodeBlock>{"aml install\naml doctor\naml serve"}</CodeBlock></section>
    <section><h2>{fr ? "Arrêter proprement" : "Stop cleanly"}</h2><p>{fr ? "Dans le terminal du serveur, appuyez sur Ctrl+C. Aucun fichier du projet n’est supprimé." : "In the server terminal, press Ctrl+C. No project file is deleted."}</p></section>
  </Frame>;

  return <Frame locale={locale} lesson="depannage" title={fr ? <>Résoudre les problèmes<br/><em>sans deviner.</em></> : <>Solve problems<br/><em>without guessing.</em></>} intro={fr ? "Partez du message exact et utilisez les diagnostics AML avant de réinstaller quoi que ce soit." : "Start from the exact message and use AML diagnostics before reinstalling anything."}>
    <section><h2>{fr ? "Problèmes fréquents" : "Common problems"}</h2><div className="chapter-one-troubles"><Trouble code="aml: command not found">{fr ? "Ouvrez un nouveau terminal, puis vérifiez le PATH." : "Open a new terminal, then check PATH."}</Trouble><Trouble code="not a PHPAML project">{fr ? "Placez-vous dans le dossier contenant phpaml.json." : "Move into the folder containing phpaml.json."}</Trouble><Trouble code="Permission denied">{fr ? "Vérifiez les droits du projet et du cache, puis relancez aml doctor." : "Check project and cache permissions, then run aml doctor again."}</Trouble><Trouble code="GitHub unavailable">{fr ? "Vérifiez la connexion ou utilisez --offline si les archives sont déjà en cache." : "Check the connection or use --offline when archives are already cached."}</Trouble></div></section>
    <section className="chapter-one-exercise"><span>{fr ? "EXERCICE FINAL" : "FINAL EXERCISE"}</span><h2>{fr ? "Créez et ouvrez votre première application." : "Create and open your first application."}</h2><CodeBlock>{"aml doctor\naml create task-app\ncd task-app\naml serve"}</CodeBlock><p>{fr ? "Le chapitre est réussi si doctor ne signale aucune erreur bloquante, si phpaml.json existe et si la page locale répond. Ne lancez pas aml install après une création réussie." : "The chapter is complete when doctor reports no blocking error, phpaml.json exists, and the local page responds. Do not run aml install after a successful creation."}</p></section>
  </Frame>;
}

function Note({ title, children }: { title: string; children: React.ReactNode }) { return <div className="chapter-one-note"><strong>{title}</strong><p>{children}</p></div>; }
function Concept({ n, title, children }: { n: string; title: string; children: React.ReactNode }) { return <div><span>{n}</span><strong>{title}</strong><p>{children}</p></div>; }
function Choice({ cmd, title, children }: { cmd: string; title: string; children: React.ReactNode }) { return <div><code>{cmd}</code><strong>{title}</strong><p>{children}</p></div>; }
function Trouble({ code, children }: { code: string; children: React.ReactNode }) { return <div><code>{code}</code><p>{children}</p></div>; }
