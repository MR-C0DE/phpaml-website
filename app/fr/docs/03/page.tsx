import type { Metadata } from "next";
import { ChapterThreePage } from "../../../docs/chapter-three";
export const metadata: Metadata = { title: "Construire sa première application PHPAML — Documentation", description: "Créer pas à pas une application PHPAML classique complète." };
export default function Page() { return <ChapterThreePage locale="fr" lesson="overview"/>; }
