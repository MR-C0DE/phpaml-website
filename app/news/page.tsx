import type { Metadata } from "next";
import { NewsIndexPage } from "../news-content";
export const metadata: Metadata = { title: "News", description: "Releases, technical decisions, and news from the PHPAML ecosystem." };
export default function Page() { return <NewsIndexPage locale="en" />; }
