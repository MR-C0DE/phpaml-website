import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChapterThreePage, type ChapterThreeLesson } from "../../../../docs/chapter-three";
const lessons = ["creation", "explorer", "page", "data", "errors", "workshop"] as const;
const titles = { creation: "Créer et lancer un projet PHPAML", explorer: "Explorer les fichiers PHPAML", page: "Ajouter une page PHPAML", data: "Transmettre des données à une vue PHP", errors: "Diagnostiquer les erreurs PHPAML", workshop: "Atelier première application PHPAML" };
export const dynamicParams = false;
export function generateStaticParams() { return lessons.map((lesson) => ({ lesson })); }
export async function generateMetadata({ params }: { params: Promise<{ lesson: string }> }): Promise<Metadata> { const { lesson } = await params; if (!lessons.includes(lesson as typeof lessons[number])) return {}; return { title: `${titles[lesson as keyof typeof titles]} — Documentation`, description: "Une leçon guidée pour construire sa première application PHPAML." }; }
export default async function Page({ params }: { params: Promise<{ lesson: string }> }) { const { lesson } = await params; if (!lessons.includes(lesson as typeof lessons[number])) notFound(); return <ChapterThreePage locale="fr" lesson={lesson as ChapterThreeLesson}/>; }
