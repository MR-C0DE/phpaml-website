import type { Metadata } from "next";
import { ChapterOne } from "../../../tutorial/chapter-one";

export const metadata: Metadata = { title: "Installer AML et créer un projet — Tutoriel PHPAML", description: "Installez AML sur Windows, macOS ou Linux et créez votre premier projet MVC PHPAML." };
export default function ChapterOneFrenchPage(){ return <ChapterOne locale="fr"/>; }
