import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChapterThreePage, type ChapterThreeLesson } from "../../chapter-three";
const lessons = ["creation", "explorer", "page", "data", "errors", "workshop"] as const;
const titles = { creation: "Create and run a PHPAML project", explorer: "Explore PHPAML files", page: "Add a PHPAML page", data: "Pass data to a PHP view", errors: "Diagnose PHPAML errors", workshop: "First PHPAML application workshop" };
export const dynamicParams = false;
export function generateStaticParams() { return lessons.map((lesson) => ({ lesson })); }
export async function generateMetadata({ params }: { params: Promise<{ lesson: string }> }): Promise<Metadata> { const { lesson } = await params; if (!lessons.includes(lesson as typeof lessons[number])) return {}; return { title: `${titles[lesson as keyof typeof titles]} — Documentation`, description: "A guided lesson for building a first PHPAML application." }; }
export default async function Page({ params }: { params: Promise<{ lesson: string }> }) { const { lesson } = await params; if (!lessons.includes(lesson as typeof lessons[number])) notFound(); return <ChapterThreePage locale="en" lesson={lesson as ChapterThreeLesson}/>; }
