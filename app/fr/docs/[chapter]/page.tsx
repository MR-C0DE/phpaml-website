import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PlatformChapterPage, type PlatformChapter } from "../../../docs/platform-chapters";
const chapters = ["09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19"] as const;
const titles = { "09": "AML View", "10": "AML Engine", "11": "Internationalisation", "12": "PHPAML API", "13": "PHPAML Data", "14": "Console", "15": "Référence CLI", "16": "Tests et production", "17": "Outils SEO", "18": "Build et déploiement", "19": "Dépannage" };
export const dynamicParams = false;
export function generateStaticParams() { return chapters.map((chapter) => ({ chapter })); }
export async function generateMetadata({ params }: { params: Promise<{ chapter: string }> }): Promise<Metadata> { const { chapter } = await params; if (!chapters.includes(chapter as typeof chapters[number])) return {}; return { title: `${titles[chapter as keyof typeof titles]} — Documentation PHPAML`, description: `Un guide progressif sur ${titles[chapter as keyof typeof titles]}.` }; }
export default async function Page({ params }: { params: Promise<{ chapter: string }> }) { const { chapter } = await params; if (!chapters.includes(chapter as typeof chapters[number])) notFound(); return <PlatformChapterPage locale="fr" chapter={chapter as PlatformChapter} lesson="overview"/>; }
