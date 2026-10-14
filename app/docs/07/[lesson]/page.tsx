import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChapterSevenPage, type ChapterSevenLesson } from "../../chapter-seven";
const lessons = ["sqlite", "installation", "entity", "migration", "crud", "workshop"] as const;
const titles = { sqlite: "Understand SQLite", installation: "Install PHPAML Data", entity: "Create a persistent entity", migration: "Create a database migration", crud: "Read and write with DbContext", workshop: "Database persistence workshop" };
export const dynamicParams = false;
export function generateStaticParams() { return lessons.map((lesson) => ({ lesson })); }
export async function generateMetadata({ params }: { params: Promise<{ lesson: string }> }): Promise<Metadata> { const { lesson } = await params; if (!lessons.includes(lesson as typeof lessons[number])) return {}; return { title: `${titles[lesson as keyof typeof titles]} — PHPAML Documentation`, description: "A guided PHPAML Data and persistence lesson." }; }
export default async function Page({ params }: { params: Promise<{ lesson: string }> }) { const { lesson } = await params; if (!lessons.includes(lesson as typeof lessons[number])) notFound(); return <ChapterSevenPage locale="en" lesson={lesson as ChapterSevenLesson}/>; }
