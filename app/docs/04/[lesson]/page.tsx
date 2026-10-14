import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChapterFourPage, type ChapterFourLesson } from "../../chapter-four";
const lessons = ["form", "request", "validation", "security", "crud", "workshop"] as const;
const titles = { form: "Build a PHPAML form", request: "Receive form data", validation: "Validate form data", security: "Protect PHPAML forms", crud: "Build a session CRUD", workshop: "Forms and CRUD workshop" };
export const dynamicParams = false;
export function generateStaticParams() { return lessons.map((lesson) => ({ lesson })); }
export async function generateMetadata({ params }: { params: Promise<{ lesson: string }> }): Promise<Metadata> { const { lesson } = await params; if (!lessons.includes(lesson as typeof lessons[number])) return {}; return { title: `${titles[lesson as keyof typeof titles]} — PHPAML Documentation`, description: "A guided PHPAML forms and HTTP lesson." }; }
export default async function Page({ params }: { params: Promise<{ lesson: string }> }) { const { lesson } = await params; if (!lessons.includes(lesson as typeof lessons[number])) notFound(); return <ChapterFourPage locale="en" lesson={lesson as ChapterFourLesson}/>; }
