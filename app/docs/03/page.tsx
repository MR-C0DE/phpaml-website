import type { Metadata } from "next";
import { ChapterThreePage } from "../chapter-three";
export const metadata: Metadata = { title: "Build your first PHPAML application — Documentation", description: "Create a complete classic PHPAML application step by step." };
export default function Page() { return <ChapterThreePage locale="en" lesson="overview"/>; }
