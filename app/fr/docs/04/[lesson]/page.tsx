import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChapterFourPage, type ChapterFourLesson } from "../../../../docs/chapter-four";
const lessons = ["form", "request", "validation", "security", "crud", "workshop"] as const;
const titles = { form: "Construire un formulaire PHPAML", request: "Recevoir les données du formulaire", validation: "Valider les données", security: "Protéger les formulaires PHPAML", crud: "Construire un CRUD en session", workshop: "Atelier formulaires et CRUD" };
export const dynamicParams = false;
export function generateStaticParams() { return lessons.map((lesson) => ({ lesson })); }
export async function generateMetadata({ params }: { params: Promise<{ lesson: string }> }): Promise<Metadata> { const { lesson } = await params; if (!lessons.includes(lesson as typeof lessons[number])) return {}; return { title: `${titles[lesson as keyof typeof titles]} — Documentation PHPAML`, description: "Une leçon guidée sur les formulaires et HTTP avec PHPAML." }; }
export default async function Page({ params }: { params: Promise<{ lesson: string }> }) { const { lesson } = await params; if (!lessons.includes(lesson as typeof lessons[number])) notFound(); return <ChapterFourPage locale="fr" lesson={lesson as ChapterFourLesson}/>; }
