import type { Metadata } from "next";
import { headers } from "next/headers";
import { getNewsPost, newsPosts, NewsArticlePage } from "../../news-content";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return newsPosts.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params, item = (await getNewsPost(slug)).translations.en, h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "phpaml.com", protocol = h.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https"), url = `${protocol}://${host}/news/${slug}`;
  return { title: item.title, description: item.summary, alternates: { canonical: url, languages: { en: url, fr: `${protocol}://${host}/fr/news/${slug}` } }, openGraph: { title: item.title, description: item.summary, type: "article", url, images: [] }, twitter: { title: item.title, description: item.summary, card: "summary", images: [] } };
}
export default async function Page({ params }: Props) { const { slug } = await params; return await NewsArticlePage({ locale: "en", slug }); }
