import type { Metadata } from "next";
import { ChapterSevenPage } from "../../../docs/chapter-seven";
export const metadata: Metadata = { title: "Base de données et persistance — Documentation PHPAML", description: "Apprendre SQLite, PHPAML Data, les entités typées, migrations, DbContext, DbSet et le CRUD persistant." };
export default function Page() { return <ChapterSevenPage locale="fr" lesson="overview"/>; }
