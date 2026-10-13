import type { Metadata } from "next";
import { ChapterOnePage } from "../../../docs/chapter-one";

export const metadata: Metadata = {
  title: "Installer AML et créer son premier projet — Documentation PHPAML",
  description: "Un chapitre complet et progressif pour installer AML, vérifier l’environnement et créer un premier projet PHPAML.",
};

export default function FrenchDocumentationChapterOnePage() {
  return <ChapterOnePage locale="fr" lesson="overview" />;
}
