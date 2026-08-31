import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer, Header } from "./components";
import { findNewsPost, listNewsPosts, type StoredNewsPost } from "./news-store";
import { NewsArticleRenderer } from "./news-article-renderer";

export type NewsLocale = "en" | "fr";
type Translation = { title: string; summary: string; category: string; content: string };
export type NewsPost = { slug: string; date: string; updatedAt: string; version: string; translations: Record<NewsLocale, Translation> };

export const newsPosts: NewsPost[] = [{
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
