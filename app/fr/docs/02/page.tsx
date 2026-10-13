import type { Metadata } from "next";
import { ChapterTwoPage } from "../../../docs/chapter-two";
export const metadata: Metadata = { title: "Comprendre l’architecture PHPAML — Documentation PHPAML", description: "Apprenez le cycle d’une requête, la structure du projet, les responsabilités MVC et les variantes PHPAML." };
export default function Page() { return <ChapterTwoPage locale="fr" lesson="overview"/>; }
