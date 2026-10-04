import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer, Header } from "./components";
import { findNewsPost, listNewsPosts, type StoredNewsPost } from "./news-store";
import { NewsArticleRenderer } from "./news-article-renderer";

export type NewsLocale = "en" | "fr";
type Translation = { title: string; summary: string; category: string; content: string };
export type NewsPost = { slug: string; date: string; updatedAt: string; version: string; translations: Record<NewsLocale, Translation> };

export const newsPosts: NewsPost[] = [{
  slug: "phpaml-cli-1-7-beta-33", date: "2026-10-03", updatedAt: "2026-10-03", version: "1.7.0-beta.33",
  translations: {
    en: { category: "Release", title: "PHPAML CLI 1.7 beta.33 is available", summary: "A calmer development console, safe server-side logging, customizable error pages, and verified installers for all supported platforms.", content: `PHPAML CLI 1.7.0-beta.33 is available for macOS Apple Silicon, Windows x64, and Debian/Ubuntu x64. Every installer and portable archive is published with a SHA-256 checksum.

## A development console that stays readable

\`aml serve\` now hides the repetitive connection messages emitted by PHP's development server. Application output remains visible, so the terminal can be used as a useful development console instead of becoming a stream of \`Accepted\` and \`Closing\` lines.

Use verbose mode whenever you need the complete connection trace:

\`\`\`bash
aml serve --verbose
\`\`\`

## Log from PHP without contaminating the response

The Framework introduces \`Console::log()\`, \`Console::info()\`, \`Console::warning()\`, and \`Console::error()\`. During \`aml serve\`, a plain \`echo\` is also redirected to the terminal. These messages never become part of an HTML or JSON response.

Console output is sanitized, bounded, and prefixed line by line. Common secret fields such as passwords, tokens, and authorization values are redacted before display.

\`\`\`php
use PHPAML\\Console;

Console::log('User loaded', ['id' => 42]);
echo "Development checkpoint";
\`\`\`

## Error pages owned by the application

Template 0.5.0-beta.8 includes responsive pages for 404, 500, and other HTTP errors under \`src/views/errors\`. They can be adapted to a project's visual identity. Production responses hide private exception details and include a request reference, while debug mode retains useful development information.

This release distributes Framework 0.3.0-beta.6 and Template 0.5.0-beta.8. The published artifacts were verified by creating a new project from the public macOS archive, running all 11 application tests, and checking the home page, custom 404 page, security headers, and clean server console.` },
    fr: { category: "Version", title: "PHPAML CLI 1.7 beta.33 est disponible", summary: "Une console de développement plus calme, des journaux serveur sûrs, des pages d’erreur personnalisables et des installateurs vérifiés.", content: `PHPAML CLI 1.7.0-beta.33 est disponible pour macOS Apple Silicon, Windows x64 et Debian/Ubuntu x64. Chaque installateur et chaque archive portable est publié avec une empreinte SHA-256.

## Une console de développement qui reste lisible

\`aml serve\` masque maintenant les messages de connexion répétitifs du serveur de développement PHP. Les sorties de l’application restent visibles : le terminal devient une véritable console de développement au lieu d’accumuler les lignes \`Accepted\` et \`Closing\`.

Le mode détaillé permet de retrouver la trace complète des connexions :

\`\`\`bash
aml serve --verbose
\`\`\`

## Écrire dans la console sans contaminer la réponse

Le Framework introduit \`Console::log()\`, \`Console::info()\`, \`Console::warning()\` et \`Console::error()\`. Pendant \`aml serve\`, un simple \`echo\` est également redirigé vers le terminal. Ces messages ne sont jamais ajoutés à une réponse HTML ou JSON.

La sortie est nettoyée, limitée et préfixée ligne par ligne. Les champs sensibles courants — mots de passe, jetons et valeurs d’autorisation — sont masqués avant l’affichage.

\`\`\`php
use PHPAML\\Console;

Console::log('Utilisateur chargé', ['id' => 42]);
echo "Point de contrôle du développement";
\`\`\`

## Des pages d’erreur appartenant à l’application

Le Template 0.5.0-beta.8 fournit des pages responsives pour les erreurs 404, 500 et les autres statuts HTTP dans \`src/views/errors\`. Elles peuvent adopter l’identité visuelle du projet. En production, les détails privés des exceptions sont masqués et une référence de requête est affichée ; le mode debug conserve les informations utiles au développement.

Cette version distribue le Framework 0.3.0-beta.6 et le Template 0.5.0-beta.8. Les fichiers publiés ont été validés en créant un projet neuf depuis l’archive macOS publique, en exécutant les 11 tests de l’application et en contrôlant l’accueil, la page 404 personnalisée, les en-têtes de sécurité et la console serveur épurée.` },
  },
}, {
  slug: "phpaml-cli-1-7-beta-31", date: "2026-09-26", updatedAt: "2026-09-27", version: "1.7.0-beta.31",
  translations: {
    en: { category: "Release", title: "PHPAML CLI 1.7 beta.31 is available", summary: "A cleaner project structure, a minimal AML View starter, and verified installers for every supported platform.", content: `PHPAML CLI 1.7.0-beta.31 is now available for macOS Apple Silicon, Windows x64, and Debian/Ubuntu x64. Every installer and portable archive is published with a SHA-256 checksum.

## Start an empty AML View application

The new \`--empty\` option creates the smallest useful AML View project: one clean home page, without the demonstration, secondary pages, navigation, or themes.

\`\`\`bash
aml create-view-app MyApp --empty
cd MyApp
aml serve
\`\`\`

## One project structure

Classic, AML View, and API projects now share the same \`src/\` foundation. Controllers, models, middleware, views, and routes have predictable locations. Existing classic projects can move to this structure with \`aml migrate:structure\`.

The model generators are clearer too: \`aml make:model\` creates a plain PHP model without requiring PHPAML Data, while \`aml make:entity\` creates a persistent entity when Data is installed.

## Updated platform

This release distributes Template 0.5.0-beta.7 and Framework 0.3.0-beta.5. New AML View applications install View 0.1.0-beta.6 and Engine 0.1.0-beta.4, including native semantic components, \`Alert\`, \`Console::log()\`, and reactive progress controls.

Download the installer for your platform from the PHPAML download page, or inspect all release files and checksums on GitHub.` },
    fr: { category: "Version", title: "PHPAML CLI 1.7 beta.31 est disponible", summary: "Une structure de projet plus claire, un démarrage AML View minimal et des installateurs vérifiés pour chaque plateforme prise en charge.", content: `PHPAML CLI 1.7.0-beta.31 est maintenant disponible pour macOS Apple Silicon, Windows x64 et Debian/Ubuntu x64. Chaque installateur et chaque archive portable est publié avec une empreinte SHA-256.

## Démarrer une application AML View vide

La nouvelle option \`--empty\` crée le plus petit projet AML View utile : une page d’accueil propre, sans démonstration, pages secondaires, navigation ni thèmes.

\`\`\`bash
aml create-view-app MonApp --empty
cd MonApp
aml serve
\`\`\`

## Une structure de projet commune

Les projets classiques, AML View et API reposent maintenant sur la même fondation \`src/\`. Les contrôleurs, modèles, middlewares, vues et routes possèdent des emplacements prévisibles. Un ancien projet classique peut adopter cette structure avec \`aml migrate:structure\`.

Les générateurs de modèles sont également plus clairs : \`aml make:model\` crée un modèle PHP simple sans exiger PHPAML Data, tandis que \`aml make:entity\` crée une entité persistante lorsque Data est installé.

## Une plateforme actualisée

Cette version distribue le Template 0.5.0-beta.7 et le Framework 0.3.0-beta.5. Les nouvelles applications AML View installent View 0.1.0-beta.6 et Engine 0.1.0-beta.4, avec les composants sémantiques natifs, \`Alert\`, \`Console::log()\` et les progressions réactives.

Téléchargez l’installateur correspondant à votre plateforme depuis la page de téléchargement PHPAML, ou consultez tous les fichiers et leurs empreintes sur GitHub.` },
  },
}, {
  slug: "phpaml-data-enters-alpha", date: "2026-08-17", updatedAt: "2026-08-17", version: "0.1.0-alpha.2",
  translations: {
    en: { category: "Release", title: "PHPAML Data enters alpha", summary: "A typed persistence layer for SQL and MongoDB joins the PHPAML platform.", content: `PHPAML Data is now available as an alpha release. It gives PHPAML applications a focused data layer without tying the framework to a single database or application style.

## One core, several databases

SQLite is the default path. MySQL, MariaDB, and PostgreSQL share the SQL foundation, while MongoDB remains an independent adapter built on the common contracts.

## Made for the AML workflow

Choose the database once during installation. Models, migrations, seeders, status checks, and diagnostics then use the same short commands. Application models stay in src/models/.

\`\`\`bash
aml install data --driver sqlite
aml data:doctor
\`\`\`

## What comes next

The alpha is ready for evaluation and early projects. Feedback will focus on API clarity, provider consistency, migration safety, and diagnostics before the stable release.` },
    fr: { category: "Version", title: "PHPAML Data entre en alpha", summary: "Une couche de persistance typée pour SQL et MongoDB rejoint la plateforme PHPAML.", content: `PHPAML Data est maintenant disponible en version alpha. Le package apporte aux applications PHPAML une couche de données ciblée, sans lier le framework à une seule base de données ni à un seul type d’application.

## Un noyau, plusieurs bases de données

SQLite constitue le parcours par défaut. MySQL, MariaDB et PostgreSQL partagent la fondation SQL, tandis que MongoDB reste un adaptateur indépendant construit sur les contrats communs.

## Pensé pour l’expérience AML

Choisissez la base pendant l’installation. Les modèles, migrations, seeders, états et diagnostics utilisent ensuite les mêmes commandes courtes. Les modèles restent dans src/models/.

\`\`\`bash
aml install data --driver sqlite
aml data:doctor
\`\`\`

## La prochaine étape

Cette alpha est prête pour l’évaluation et les premiers projets. Les retours porteront sur la clarté de l’API, la cohérence des pilotes, la sécurité des migrations et les diagnostics.` },
  },
}];

function fromStored(post: StoredNewsPost): NewsPost {
  return { slug: post.slug, date: post.published_at ?? post.updated_at.slice(0, 10), updatedAt: post.updated_at, version: post.version, translations: {
    en: { category: "News", title: post.title_en, summary: post.summary_en, content: post.content_en },
    fr: { category: "Actualité", title: post.title_fr, summary: post.summary_fr, content: post.content_fr },
  } };
}
export async function getAllNewsPosts() {
  try { const stored = (await listNewsPosts()).map(fromStored); return [...stored, ...newsPosts.filter((post) => !stored.some((item) => item.slug === post.slug))]; }
  catch { return newsPosts; }
}
export async function getNewsPost(slug: string) {
  try { const stored = await findNewsPost(slug); if (stored) return fromStored(stored); } catch { /* D1 is optional during plain Next.js development. */ }
  const post = newsPosts.find((item) => item.slug === slug); if (!post) notFound(); return post;
}
const date = (value: string, locale: NewsLocale) => new Intl.DateTimeFormat(locale === "fr" ? "fr-CA" : "en-CA", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${value}T00:00:00Z`));

export async function NewsIndexPage({ locale }: { locale: NewsLocale }) {
  const fr = locale === "fr", prefix = fr ? "/fr" : "";
  const posts = await getAllNewsPosts();
  return <><Header locale={locale} path="/news" /><main className="news-page">
    <section className="news-hero shell"><div><p className="kicker">{fr ? "Actualités PHPAML" : "PHPAML News"}</p><h1>{fr ? "Ce qui évolue. Pourquoi ça compte." : "What changed. Why it matters."}</h1></div><p>{fr ? "Versions, décisions techniques et nouvelles de l’écosystème PHPAML." : "Releases, technical decisions, and news from the PHPAML ecosystem."}</p></section>
    <section className="news-feed shell"><div className="news-feed-heading"><span>/ 01</span><h2>{fr ? "Dernières actualités" : "Latest news"}</h2></div>{posts.map((post, index) => { const item = post.translations[locale]; return <article className="news-card" key={post.slug}><div className="news-card-meta"><span>{item.category}</span><time dateTime={post.date}>{date(post.date, locale)}</time></div><div className="news-card-index">{String(index + 1).padStart(2, "0")}</div><h3>{item.title}</h3><p>{item.summary}</p><Link href={`${prefix}/news/${post.slug}`}>{fr ? "Lire l’actualité" : "Read the story"} <span>→</span></Link></article>; })}</section>
  </main><Footer locale={locale} /></>;
}

export async function NewsArticlePage({ locale, slug }: { locale: NewsLocale; slug: string }) {
  const post = await getNewsPost(slug), item = post.translations[locale];
  return <><Header locale={locale} path={`/news/${slug}`} /><main className="news-article-page"><NewsArticleRenderer locale={locale} post={{ slug, date: post.date, updatedAt: post.updatedAt, version: post.version, translation: item }} /></main><Footer locale={locale} /></>;
}
