import type { Metadata } from "next";
import { NewsIndexPage } from "../../news-content";
export const metadata: Metadata = { title: "Actualités", description: "Versions, décisions techniques et actualités de l’écosystème PHPAML." };
export default function Page() { return <NewsIndexPage locale="fr" />; }
