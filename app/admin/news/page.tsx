import type { Metadata } from "next";
import { requireNewsAdmin } from "../../admin-auth";
import { AdminNews } from "./admin-news";
import "./admin.css";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "News Admin", robots: { index: false, follow: false } };

export default async function Page() { const user = await requireNewsAdmin(); return <AdminNews adminName={user.displayName} />; }
