import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChapterFivePage, type ChapterFiveLesson } from "../../../../docs/chapter-five";
const lessons = ["partials", "organization", "assets", "accessibility", "errors", "workshop"] as const;
const titles = { partials: "Partiels de vues PHP réutilisables", organization: "Organiser les vues PHPAML", assets: "CSS, images et JavaScript", accessibility: "Pages PHPAML accessibles", errors: "Pages d’erreur PHPAML personnalisées", workshop: "Atelier vues et fichiers publics" };
export const dynamicParams = false;
export function generateStaticParams() { return lessons.map((lesson) => ({ lesson })); }
export async function generateMetadata({ params }: { params: Promise<{ lesson: string }> }): Promise<Metadata> { const { lesson } = await params; if (!lessons.includes(lesson as typeof lessons[number])) return {}; return { title: `${titles[lesson as keyof typeof titles]} — Documentation PHPAML`, description: "Une leçon guidée sur les vues et fichiers publics PHPAML." }; }
export default async function Page({ params }: { params: Promise<{ lesson: string }> }) { const { lesson } = await params; if (!lessons.includes(lesson as typeof lessons[number])) notFound(); return <ChapterFivePage locale="fr" lesson={lesson as ChapterFiveLesson}/>; }
