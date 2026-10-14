import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PlatformChapterPage, type PlatformChapter } from "../platform-chapters";
const chapters = ["09", "10", "11", "12"] as const;
const titles = { "09": "AML View", "10": "AML Engine", "11": "Internationalization", "12": "PHPAML API" };
export const dynamicParams = false;
export function generateStaticParams() { return chapters.map((chapter) => ({ chapter })); }
export async function generateMetadata({ params }: { params: Promise<{ chapter: string }> }): Promise<Metadata> { const { chapter } = await params; if (!chapters.includes(chapter as typeof chapters[number])) return {}; return { title: `${titles[chapter as keyof typeof titles]} — PHPAML Documentation`, description: `A progressive guide to ${titles[chapter as keyof typeof titles]}.` }; }
export default async function Page({ params }: { params: Promise<{ chapter: string }> }) { const { chapter } = await params; if (!chapters.includes(chapter as typeof chapters[number])) notFound(); return <PlatformChapterPage locale="en" chapter={chapter as PlatformChapter} lesson="overview"/>; }
