import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChapterFivePage, type ChapterFiveLesson } from "../../chapter-five";
const lessons = ["partials", "organization", "assets", "accessibility", "errors", "workshop"] as const;
const titles = { partials: "Reusable PHP view partials", organization: "Organize PHPAML views", assets: "CSS, images, and JavaScript", accessibility: "Accessible PHPAML pages", errors: "Custom PHPAML error pages", workshop: "Views and assets workshop" };
export const dynamicParams = false;
export function generateStaticParams() { return lessons.map((lesson) => ({ lesson })); }
export async function generateMetadata({ params }: { params: Promise<{ lesson: string }> }): Promise<Metadata> { const { lesson } = await params; if (!lessons.includes(lesson as typeof lessons[number])) return {}; return { title: `${titles[lesson as keyof typeof titles]} — PHPAML Documentation`, description: "A guided PHPAML views and public assets lesson." }; }
export default async function Page({ params }: { params: Promise<{ lesson: string }> }) { const { lesson } = await params; if (!lessons.includes(lesson as typeof lessons[number])) notFound(); return <ChapterFivePage locale="en" lesson={lesson as ChapterFiveLesson}/>; }
