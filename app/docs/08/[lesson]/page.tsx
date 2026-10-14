import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChapterEightPage, type ChapterEightLesson } from "../../chapter-eight";
const lessons = ["input", "csrf", "sessions", "headers", "rate-limit", "workshop"] as const;
const titles = { input: "Validate input and escape output", csrf: "Protect actions from CSRF", sessions: "Secure PHPAML sessions", headers: "Browser security headers", "rate-limit": "Rate limiting", workshop: "Web security workshop" };
export const dynamicParams = false;
export function generateStaticParams() { return lessons.map((lesson) => ({ lesson })); }
export async function generateMetadata({ params }: { params: Promise<{ lesson: string }> }): Promise<Metadata> { const { lesson } = await params; if (!lessons.includes(lesson as typeof lessons[number])) return {}; return { title: `${titles[lesson as keyof typeof titles]} — PHPAML Documentation`, description: "A guided PHPAML Web security lesson." }; }
export default async function Page({ params }: { params: Promise<{ lesson: string }> }) { const { lesson } = await params; if (!lessons.includes(lesson as typeof lessons[number])) notFound(); return <ChapterEightPage locale="en" lesson={lesson as ChapterEightLesson}/>; }
