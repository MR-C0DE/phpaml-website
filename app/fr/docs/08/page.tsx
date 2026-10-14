import type { Metadata } from "next";
import { ChapterEightPage } from "../../../docs/chapter-eight";
export const metadata: Metadata = { title: "Sécurité Web — Documentation PHPAML", description: "Apprendre la sécurité Web par couches : validation, échappement, CSRF, sessions, en-têtes et limitation." };
export default function Page() { return <ChapterEightPage locale="fr" lesson="overview"/>; }
