import Link from "next/link";
import { CodeBlock } from "./components";

export type RenderedNewsTranslation = {
  category: string;
  title: string;
  summary: string;
  content: string;
};

export type RenderedNewsPost = {
  slug: string;
  date: string;
  updatedAt?: string;
  version: string;
  translation: RenderedNewsTranslation;
};

function richBlocks(content: string) {
  const chunks: Array<{ type: "content" | "code"; value: string }> = [];
  let prose: string[] = [], code: string[] = [], inCode = false;
  const flushProse = () => {
    const value = prose.join("\n").trim();
    if (value) chunks.push({ type: "content", value });
    prose = [];
  };
  for (const line of content.trim().split("\n")) {
    if (line.trimStart().startsWith("```")) {
      if (inCode) {
        chunks.push({ type: "code", value: code.join("\n").replace(/\n+$/, "") });
        code = [];
        inCode = false;
      } else {
        flushProse();
        inCode = true;
      }
      continue;
    }
    if (inCode) code.push(line);
    else if (line.trim() === "") flushProse();
    else prose.push(line);
  }
  if (inCode) chunks.push({ type: "code", value: code.join("\n").replace(/\n+$/, "") });
  flushProse();

  return chunks.map((chunk, index) => {
    const value = chunk.value.trim();
    if (chunk.type === "code") return <CodeBlock key={index}>{chunk.value}</CodeBlock>;
    if (value.startsWith("## ")) return <h2 key={index}>{value.slice(3).trim()}</h2>;
    if (value.startsWith("### ")) return <h3 key={index}>{value.slice(4).trim()}</h3>;
    if (value.split("\n").every((line) => line.startsWith("- "))) {
      return <ul key={index}>{value.split("\n").map((line) => <li key={line}>{line.slice(2)}</li>)}</ul>;
    }
    if (value.split("\n").every((line) => /^\d+\. /.test(line))) {
      return <ol key={index}>{value.split("\n").map((line) => <li key={line}>{line.replace(/^\d+\. /, "")}</li>)}</ol>;
    }
    if (value.startsWith("> ")) return <blockquote key={index}>{value.split("\n").map((line) => line.replace(/^> ?/, "")).join(" ")}</blockquote>;
    return <p key={index}>{value.replace(/\n/g, " ")}</p>;
  });
}

const formatDate = (value: string, locale: "en" | "fr") => new Intl.DateTimeFormat(locale === "fr" ? "fr-CA" : "en-CA", {
  day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
}).format(new Date(`${value || new Date().toISOString().slice(0, 10)}T00:00:00Z`));

export function NewsArticleRenderer({ locale, post, preview = false }: { locale: "en" | "fr"; post: RenderedNewsPost; preview?: boolean }) {
  const fr = locale === "fr";
  const item = post.translation;
  const prefix = fr ? "/fr" : "";
  const url = `https://phpaml.com${prefix}/news/${post.slug}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: item.title,
    description: item.summary,
    image: ["https://phpaml.com/og-v3.png"],
    datePublished: post.date,
    dateModified: post.updatedAt || post.date,
    inLanguage: fr ? "fr-CA" : "en-CA",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: { "@type": "Organization", name: "PHPAML", url: "https://phpaml.com" },
    publisher: { "@type": "Organization", name: "PHPAML", logo: { "@type": "ImageObject", url: "https://phpaml.com/phpaml-logo.png" } },
  };
  return <article className={preview ? "news-preview-article" : undefined}>
    {!preview && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />}
    <header className="news-article-hero shell">
      {!preview && <Link className="news-back" href={`${prefix}/news`}>← {fr ? "Toutes les actualités" : "All news"}</Link>}
      {preview && <span className="news-back">← {fr ? "Aperçu fidèle de la publication" : "True publication preview"}</span>}
      <div className="news-article-meta"><span>{item.category}</span><time dateTime={post.date}>{formatDate(post.date, locale)}</time>{post.version && <b>v{post.version}</b>}</div>
      <h1>{item.title || (fr ? "Titre de la publication" : "Publication title")}</h1>
      <p>{item.summary || (fr ? "Le résumé apparaîtra ici." : "The summary will appear here.")}</p>
    </header>
    <div className="news-article-layout shell">
      <aside><small>PHPAML NEWS</small><strong>{item.category || (fr ? "Actualité" : "News")}</strong><span>{fr ? "Publication bilingue" : "Bilingual publication"}</span></aside>
      <div className="news-article-body">{richBlocks(item.content || (fr ? "Commencez à écrire pour afficher l’aperçu." : "Start writing to display the preview."))}</div>
    </div>
  </article>;
}
