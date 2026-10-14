import type { Metadata } from "next";
import { ChapterEightPage } from "../chapter-eight";
export const metadata: Metadata = { title: "Web security — PHPAML Documentation", description: "Learn layered Web security with validation, escaping, CSRF, sessions, headers, and rate limiting." };
export default function Page() { return <ChapterEightPage locale="en" lesson="overview"/>; }
