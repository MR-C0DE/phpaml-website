import type { Metadata } from "next";
import { headers } from "next/headers";
import { getNewsPost, newsPosts, NewsArticlePage } from "../../../news-content";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return newsPosts.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params, item = (await getNewsPost(slug)).translations.fr, h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "phpaml.com", protocol = h.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https"), url = `${protocol}://${host}/fr/news/${slug}`;
  return { title: item.title, description: item.summary, alternates: { canonical: url, languages: { en: `${protocol}://${host}/news/${slug}`, fr: url } }, openGraph: { title: item.title, description: item.summary, type: "article", url, locale: "fr_CA", images: [] }, twitter: { title: item.title, description: item.summary, card: "summary", images: [] } };
}
export default async function Page({ params }: Props) { const { slug } = await params; return await NewsArticlePage({ locale: "fr", slug }); }
