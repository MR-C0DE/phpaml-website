import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChapterSixPage, type ChapterSixLesson } from "../../../../docs/chapter-six";
const lessons = ["manifest", "environment", "debug", "runtime", "production", "workshop"] as const;
const titles = { manifest: "Comprendre phpaml.json", environment: ".env et secrets", debug: "Débogage et journaux applicatifs", runtime: "Runtime PHPAML généré", production: "Préparer PHPAML pour la production", workshop: "Atelier de configuration" };
export const dynamicParams = false;
export function generateStaticParams() { return lessons.map((lesson) => ({ lesson })); }
export async function generateMetadata({ params }: { params: Promise<{ lesson: string }> }): Promise<Metadata> { const { lesson } = await params; if (!lessons.includes(lesson as typeof lessons[number])) return {}; return { title: `${titles[lesson as keyof typeof titles]} — Documentation PHPAML`, description: "Une leçon guidée sur la configuration et les environnements PHPAML." }; }
export default async function Page({ params }: { params: Promise<{ lesson: string }> }) { const { lesson } = await params; if (!lessons.includes(lesson as typeof lessons[number])) notFound(); return <ChapterSixPage locale="fr" lesson={lesson as ChapterSixLesson}/>; }
