import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChapterTwoPage } from "../../../../docs/chapter-two";
const lessons = ["requete", "structure", "mvc", "variantes", "atelier"] as const;
type Lesson = typeof lessons[number];
const titles: Record<Lesson, string> = { requete: "Cycle d’une requête", structure: "Structure d’un projet PHPAML", mvc: "Responsabilités MVC", variantes: "Variantes de projet PHPAML", atelier: "Atelier d’architecture" };
export const dynamicParams = false;
export function generateStaticParams() { return lessons.map((lesson) => ({ lesson })); }
export async function generateMetadata({ params }: { params: Promise<{ lesson: string }> }): Promise<Metadata> { const { lesson } = await params; if (!lessons.includes(lesson as Lesson)) return {}; return { title: titles[lesson as Lesson] + " — Documentation PHPAML", description: "Une leçon guidée du chapitre consacré à l’architecture PHPAML." }; }
export default async function Page({ params }: { params: Promise<{ lesson: string }> }) { const { lesson } = await params; if (!lessons.includes(lesson as Lesson)) notFound(); return <ChapterTwoPage locale="fr" lesson={lesson as Lesson}/>; }
