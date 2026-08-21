import Link from "next/link";
import { CodeBlock, Footer, Header } from "../components";
import { release, releaseAssetUrl } from "../release";
import "./chapter-one.css";

const command = {
  doctor: "aml doctor",
  current: "mkdir my-first-app\ncd my-first-app\naml create .\naml install\naml serve",
  doctorResult: `[OK]        AML                     version 1.7.0-beta.14
[OK]        PHP                     compatible
[OK]        Private Composer        available
[OK]        Temporary directory     writable
[OK]        Cache AML               writable
[OK]        Development port        127.0.0.1:8910 available`,
} as const;

export function ChapterOne({ locale }: { locale: "en" | "fr" }) {
  const fr = locale === "fr";
  const prefix = fr ? "/fr" : "";
  const sections = fr ? [
    ["01.1", "AML et PHPAML", "PHPAML est le mini-framework MVC. AML est sa commande : elle installe l’environnement, crée les projets, lance le serveur et diagnostique la machine. Une fois AML installé, vous n’avez pas besoin d’installer PHP ou Composer séparément."],
    ["01.2", "Installer AML", "Téléchargez l’installateur adapté à votre système depuis la page officielle. Windows utilise le fichier .exe, macOS le paquet .pkg et Linux le paquet .deb. L’installateur ajoute AML, PHP et Composer à la machine."],
    ["01.3", "Choisir la langue", "Pendant l’installation, choisissez Français ou English. Ce choix contrôle l’aide, les confirmations et les messages d’erreur. Vous pourrez le modifier plus tard dans la configuration AML."],
    ["01.4", "Vérifier la machine", "La commande doctor contrôle AML, PHP, les extensions, Composer, les dossiers temporaires, le cache et le port de développement. Corrigez les lignes ERROR avant de créer votre premier projet."],
    ["01.5", "Créer le premier projet", "Créez un nouveau dossier avec aml create mon-projet, ou utilisez aml create . dans un dossier vide existant. AML télécharge le modèle officiel et prépare la structure MVC."],
    ["01.6", "Installer et démarrer", "aml install installe le moteur privé dans runtime. aml serve lance ensuite le site local avec l’actualisation automatique. Gardez ce terminal ouvert pendant le développement."],
    ["01.7", "Résoudre les problèmes", "Si AML ne reconnaît pas le projet, vérifiez que vous êtes dans le dossier contenant phpaml.json, src, routes et runtime. Si le port 8910 est occupé, AML essaie automatiquement le suivant. Relancez toujours aml doctor après une correction."],
  ] : [
    ["01.1", "AML and PHPAML", "PHPAML is the MVC mini-framework. AML is its command-line tool: it installs the environment, creates projects, starts the server, and diagnoses the machine. Once AML is installed, PHP and Composer do not need to be installed separately."],
    ["01.2", "Install AML", "Download the installer for your system from the official page. Windows uses the .exe file, macOS the .pkg package, and Linux the .deb package. The installer adds AML, PHP, and Composer to the machine."],
    ["01.3", "Choose the language", "During installation, choose English or Français. This choice controls help, confirmations, and error messages. You can change it later in the AML configuration."],
    ["01.4", "Check the machine", "The doctor command checks AML, PHP, extensions, Composer, temporary folders, cache, and the development port. Resolve every ERROR line before creating your first project."],
    ["01.5", "Create the first project", "Create a new folder with aml create my-project, or use aml create . inside an existing empty folder. AML downloads the official template and prepares the MVC structure."],
    ["01.6", "Install and start", "aml install installs the private engine in runtime. aml serve then starts the local website with automatic refresh. Keep this terminal open while developing."],
    ["01.7", "Troubleshoot", "If AML does not recognize the project, make sure you are inside the folder containing phpaml.json, src, routes, and runtime. If port 8910 is busy, AML automatically tries the next one. Always run aml doctor again after a fix."],
  ];

  return <><Header locale={locale} path="/tutorial/01" /><main className="lesson-page">
    <section className="lesson-hero shell"><div><p className="eyebrow"><span /> {fr ? "Tutoriel MVC · Chapitre 01" : "MVC tutorial · Chapter 01"}</p><h1>{fr ? <>Installer AML et<br/><em>créer un projet.</em></> : <>Install AML and<br/><em>create a project.</em></>}</h1><p>{fr ? "À la fin de ce chapitre, votre environnement sera vérifié et votre première application PHPAML fonctionnera localement." : "By the end of this chapter, your environment will be verified and your first PHPAML application will run locally."}</p></div><aside><small>{fr ? "OBJECTIF" : "OUTCOME"}</small><strong>{fr ? "Un projet prêt à coder" : "A project ready to code"}</strong><span>≈ 25 min</span></aside></section>
    <div className="lesson-layout shell"><nav className="lesson-toc" aria-label={fr ? "Sommaire du chapitre" : "Chapter contents"}><strong>{fr ? "Dans ce chapitre" : "In this chapter"}</strong>{sections.map(([id,title])=><a href={`#section-${id}`} key={id}><span>{id}</span>{title}</a>)}<a href="#exercise"><span>✓</span>{fr ? "Exercice final" : "Final exercise"}</a></nav>
      <article className="lesson-content">
        <div className="lesson-callout"><strong>{fr ? "Prérequis" : "Prerequisites"}</strong><p>{fr ? "Un ordinateur Windows 10/11, macOS 12+ ou une distribution Linux Debian/Ubuntu, une connexion Internet et un terminal. Aucun PHP préalable n’est requis." : "A Windows 10/11, macOS 12+, or Debian/Ubuntu Linux computer, an internet connection, and a terminal. No existing PHP installation is required."}</p></div>
        {sections.map(([id,title,body],index)=><section className="lesson-section" id={`section-${id}`} key={id}><span className="lesson-number">{id}</span><h2>{title}</h2><p>{body}</p>{index===1&&<div className="platform-grid"><a href={releaseAssetUrl(release.assets[0].file)}><strong>Windows</strong><code>.exe · x64 · 10/11</code><span>{fr?"Télécharger":"Download"} ↓</span></a><a href={releaseAssetUrl(release.assets[1].file)}><strong>macOS</strong><code>.pkg · Apple Silicon</code><span>{fr?"Télécharger":"Download"} ↓</span></a><a href={releaseAssetUrl(release.assets[2].file)}><strong>Linux</strong><code>.deb · x64 · Debian/Ubuntu</code><span>{fr?"Télécharger":"Download"} ↓</span></a></div>}{index===3&&<><CodeBlock>{command.doctor}</CodeBlock><div className="expected-label">{fr?"SORTIE ATTENDUE":"EXPECTED OUTPUT"}</div><CodeBlock>{command.doctorResult}</CodeBlock></>}{index===4&&<div className="command-pair"><div><small>{fr ? "NOUVEAU DOSSIER" : "NEW FOLDER"}</small><CodeBlock>{fr ? "aml create mon-projet\ncd mon-projet\naml install\naml serve" : "aml create my-first-app\ncd my-first-app\naml install\naml serve"}</CodeBlock></div><div><small>{fr ? "DOSSIER ACTUEL VIDE" : "EMPTY CURRENT FOLDER"}</small><CodeBlock>{command.current}</CodeBlock></div></div>}{index===5&&<><div className="expected-label">{fr?"SORTIE ATTENDUE":"EXPECTED OUTPUT"}</div><CodeBlock>{`PHPAML development server\n→ http://127.0.0.1:8910\n${fr?"Actualisation automatique active":"Live reload enabled"}`}</CodeBlock><div className="lesson-note"><strong>{fr ? "Adresse locale" : "Local address"}</strong><code>http://127.0.0.1:8910</code></div></>}{index===6&&<div className="trouble-table"><div><strong>{fr ? "Message" : "Message"}</strong><strong>{fr ? "Solution" : "Solution"}</strong></div><div><code>not a PHPAML project</code><span>{fr ? "Entrez dans le bon dossier ou lancez aml create ." : "Enter the correct folder or run aml create ."}</span></div><div><code>Address already in use</code><span>{fr ? "AML essaie automatiquement le port suivant." : "AML automatically tries the next port."}</span></div><div><code>Permission denied</code><span>{fr ? "Vérifiez les droits du dossier, puis relancez doctor." : "Check folder permissions, then run doctor again."}</span></div><div><code>GitHub unavailable</code><span>{fr ? "Réutilisez le cache avec aml create projet --offline." : "Reuse the cache with aml create project --offline."}</span></div></div>}</section>)}
        <section className="lesson-exercise" id="exercise"><p className="kicker">{fr ? "Exercice final" : "Final exercise"}</p><h2>{fr ? "Créez votre première application." : "Create your first application."}</h2><ol><li>{fr ? "Vérifiez la machine avec aml doctor." : "Check the machine with aml doctor."}</li><li>{fr ? "Créez un projet nommé task-app." : "Create a project named task-app."}</li><li>{fr ? "Installez ses dépendances avec aml install." : "Install its dependencies with aml install."}</li><li>{fr ? "Lancez-le avec aml serve et ouvrez la page locale." : "Start it with aml serve and open the local page."}</li></ol><div className="lesson-check"><strong>{fr ? "Chapitre réussi si…" : "Chapter complete when…"}</strong><span>✓ aml doctor</span><span>✓ task-app</span><span>✓ HTTP 200</span></div></section>
      </article>
    </div>
    <section className="lesson-navigation shell"><Link href={`${prefix}/tutorial`}>← {fr ? "Tous les chapitres" : "All chapters"}</Link><Link href={`${prefix}/tutorial/02`}>{fr ? "Chapitre 02 · Architecture PHPAML" : "Chapter 02 · PHPAML architecture"} →</Link></section>
  </main><Footer locale={locale} /></>;
}
