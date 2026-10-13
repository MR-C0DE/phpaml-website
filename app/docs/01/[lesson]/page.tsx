import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChapterOnePage } from "../../chapter-one";

const lessons = ["installation", "verification", "creation", "execution", "depannage"] as const;
type Lesson = typeof lessons[number];
const metadata: Record<Lesson, { title: string; description: string }> = {
  installation: { title: "Install AML", description: "Install AML and its bundled PHP and Composer toolchain on Windows, macOS, or Linux." },
  verification: { title: "Verify the AML environment", description: "Use aml version, aml doctor, and aml language to verify and configure AML." },
  creation: { title: "Create a PHPAML project", description: "Choose between classic, View, API, and Console projects, then generate the right PHPAML application." },
  execution: { title: "Run a PHPAML project", description: "Start the local server, understand runtime, and rebuild the environment when required." },
  depannage: { title: "Troubleshoot AML", description: "Recognize and solve common AML installation, project, permission, and network problems." },
};

export const dynamicParams = false;
export function generateStaticParams() { return lessons.map((lesson) => ({ lesson })); }

export async function generateMetadata({ params }: { params: Promise<{ lesson: string }> }): Promise<Metadata> {
  const { lesson } = await params;
  if (!lessons.includes(lesson as Lesson)) return {};
  return { title: metadata[lesson as Lesson].title + " — PHPAML Documentation", description: metadata[lesson as Lesson].description };
}

export default async function ChapterOneLesson({ params }: { params: Promise<{ lesson: string }> }) {
  const { lesson } = await params;
  if (!lessons.includes(lesson as Lesson)) notFound();
  return <ChapterOnePage locale="en" lesson={lesson as Lesson}/>;
}
