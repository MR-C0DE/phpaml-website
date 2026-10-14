import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChapterSixPage, type ChapterSixLesson } from "../../chapter-six";
const lessons = ["manifest", "environment", "debug", "runtime", "production", "workshop"] as const;
const titles = { manifest: "Understanding phpaml.json", environment: ".env and secrets", debug: "Debugging and application logs", runtime: "Generated PHPAML runtime", production: "Prepare PHPAML for production", workshop: "Configuration workshop" };
export const dynamicParams = false;
export function generateStaticParams() { return lessons.map((lesson) => ({ lesson })); }
export async function generateMetadata({ params }: { params: Promise<{ lesson: string }> }): Promise<Metadata> { const { lesson } = await params; if (!lessons.includes(lesson as typeof lessons[number])) return {}; return { title: `${titles[lesson as keyof typeof titles]} — PHPAML Documentation`, description: "A guided PHPAML configuration and environments lesson." }; }
export default async function Page({ params }: { params: Promise<{ lesson: string }> }) { const { lesson } = await params; if (!lessons.includes(lesson as typeof lessons[number])) notFound(); return <ChapterSixPage locale="en" lesson={lesson as ChapterSixLesson}/>; }
