import { notFound } from "next/navigation";
import { PlatformChapterPage, type PlatformChapter, type PlatformLesson } from "../../platform-chapters";
const chapters = ["09", "10", "11", "12"] as const;
const lessons = ["foundations", "workflow", "advanced", "workshop"] as const;
export const dynamicParams = false;
export function generateStaticParams() { return chapters.flatMap((chapter) => lessons.map((lesson) => ({ chapter, lesson }))); }
export default async function Page({ params }: { params: Promise<{ chapter: string; lesson: string }> }) { const { chapter, lesson } = await params; if (!chapters.includes(chapter as typeof chapters[number]) || !lessons.includes(lesson as typeof lessons[number])) notFound(); return <PlatformChapterPage locale="en" chapter={chapter as PlatformChapter} lesson={lesson as PlatformLesson}/>; }
