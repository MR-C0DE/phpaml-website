import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChapterOnePage } from "../../../../docs/chapter-one";

const lessons = ["installation", "verification", "creation", "execution", "depannage"] as const;
type Lesson = typeof lessons[number];
const metadata: Record<Lesson, { title: string; description: string }> = {
  installation: { title: "Installer AML", description: "Installez AML et sa chaîne PHP et Composer intégrée sur Windows, macOS ou Linux." },
  verification: { title: "Vérifier l’environnement AML", description: "Utilisez aml version, aml doctor et aml language pour vérifier et configurer AML." },
  creation: { title: "Créer un projet PHPAML", description: "Choisissez entre les projets classique, View, API et Console, puis générez la bonne application PHPAML." },
  execution: { title: "Exécuter un projet PHPAML", description: "Démarrez le serveur local, comprenez runtime et reconstruisez l’environnement si nécessaire." },
  depannage: { title: "Dépanner AML", description: "Identifiez et résolvez les problèmes courants d’installation, de projet, de permissions et de réseau." },
};

export const dynamicParams = false;
export function generateStaticParams() { return lessons.map((lesson) => ({ lesson })); }

export async function generateMetadata({ params }: { params: Promise<{ lesson: string }> }): Promise<Metadata> {
  const { lesson } = await params;
  if (!lessons.includes(lesson as Lesson)) return {};
  return { title: metadata[lesson as Lesson].title + " — Documentation PHPAML", description: metadata[lesson as Lesson].description };
}

export default async function FrenchChapterOneLesson({ params }: { params: Promise<{ lesson: string }> }) {
  const { lesson } = await params;
  if (!lessons.includes(lesson as Lesson)) notFound();
  return <ChapterOnePage locale="fr" lesson={lesson as Lesson}/>;
}
