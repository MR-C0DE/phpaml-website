import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChapterEightPage, type ChapterEightLesson } from "../../../../docs/chapter-eight";
const lessons = ["input", "csrf", "sessions", "headers", "rate-limit", "workshop"] as const;
const titles = { input: "Valider les entrées et échapper les sorties", csrf: "Protéger les actions contre CSRF", sessions: "Sécuriser les sessions PHPAML", headers: "En-têtes de sécurité du navigateur", "rate-limit": "Limitation de débit", workshop: "Atelier de sécurité Web" };
export const dynamicParams = false;
export function generateStaticParams() { return lessons.map((lesson) => ({ lesson })); }
export async function generateMetadata({ params }: { params: Promise<{ lesson: string }> }): Promise<Metadata> { const { lesson } = await params; if (!lessons.includes(lesson as typeof lessons[number])) return {}; return { title: `${titles[lesson as keyof typeof titles]} — Documentation PHPAML`, description: "Une leçon guidée sur la sécurité Web avec PHPAML." }; }
export default async function Page({ params }: { params: Promise<{ lesson: string }> }) { const { lesson } = await params; if (!lessons.includes(lesson as typeof lessons[number])) notFound(); return <ChapterEightPage locale="fr" lesson={lesson as ChapterEightLesson}/>; }
