import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChapterSevenPage, type ChapterSevenLesson } from "../../../../docs/chapter-seven";
const lessons = ["sqlite", "installation", "entity", "migration", "crud", "workshop"] as const;
const titles = { sqlite: "Comprendre SQLite", installation: "Installer PHPAML Data", entity: "Créer une entité persistante", migration: "Créer une migration de base", crud: "Lire et écrire avec DbContext", workshop: "Atelier de persistance" };
export const dynamicParams = false;
export function generateStaticParams() { return lessons.map((lesson) => ({ lesson })); }
export async function generateMetadata({ params }: { params: Promise<{ lesson: string }> }): Promise<Metadata> { const { lesson } = await params; if (!lessons.includes(lesson as typeof lessons[number])) return {}; return { title: `${titles[lesson as keyof typeof titles]} — Documentation PHPAML`, description: "Une leçon guidée sur PHPAML Data et la persistance." }; }
export default async function Page({ params }: { params: Promise<{ lesson: string }> }) { const { lesson } = await params; if (!lessons.includes(lesson as typeof lessons[number])) notFound(); return <ChapterSevenPage locale="fr" lesson={lesson as ChapterSevenLesson}/>; }
