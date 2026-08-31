import type { Metadata } from "next";
import { getNewsPost, newsPosts, NewsArticlePage } from "../../news-content";
type Props = { params: Promise<{ slug: string }> };
const siteUrl = "https://phpaml.com", socialImage = `${siteUrl}/og-v3.png`;
export function generateStaticParams() { return newsPosts.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params, post = await getNewsPost(slug), item = post.translations.en, url = `${siteUrl}/news/${slug}`;
  return { title: item.title, description: item.summary, alternates: { canonical: url, languages: { en: url, fr: `${siteUrl}/fr/news/${slug}`, "x-default": url } }, openGraph: { title: item.title, description: item.summary, type: "article", url, locale: "en_CA", alternateLocale: ["fr_CA"], publishedTime: post.date, modifiedTime: post.updatedAt, images: [{ url: socialImage, width: 1200, height: 630, alt: item.title }] }, twitter: { title: item.title, description: item.summary, card: "summary_large_image", images: [socialImage] } };
}
export default async function Page({ params }: Props) { const { slug } = await params; return await NewsArticlePage({ locale: "en", slug }); }
