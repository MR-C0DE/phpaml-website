import type { Metadata } from "next";
import { ChapterOnePage } from "../chapter-one";

export const metadata: Metadata = {
  title: "Install AML and create your first project — PHPAML Documentation",
  description: "A complete, step-by-step chapter for installing AML, verifying the environment, and creating a first PHPAML project.",
};

export default function DocumentationChapterOnePage() {
  return <ChapterOnePage locale="en" lesson="overview" />;
}
