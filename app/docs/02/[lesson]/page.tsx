import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChapterTwoPage } from "../../chapter-two";
const lessons = ["requete", "structure", "mvc", "variantes", "atelier"] as const;
type Lesson = typeof lessons[number];
const titles: Record<Lesson, string> = { requete: "Request lifecycle", structure: "PHPAML project structure", mvc: "MVC responsibilities", variantes: "PHPAML project variants", atelier: "Architecture workshop" };
export const dynamicParams = false;
export function generateStaticParams() { return lessons.map((lesson) => ({ lesson })); }
export async function generateMetadata({ params }: { params: Promise<{ lesson: string }> }): Promise<Metadata> { const { lesson } = await params; if (!lessons.includes(lesson as Lesson)) return {}; return { title: titles[lesson as Lesson] + " — PHPAML Documentation", description: "A guided lesson from the PHPAML architecture chapter." }; }
export default async function Page({ params }: { params: Promise<{ lesson: string }> }) { const { lesson } = await params; if (!lessons.includes(lesson as Lesson)) notFound(); return <ChapterTwoPage locale="en" lesson={lesson as Lesson}/>; }
