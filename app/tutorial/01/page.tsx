import type { Metadata } from "next";
import { ChapterOne } from "../chapter-one";

export const metadata: Metadata = { title: "Install AML and create a project — PHPAML Tutorial", description: "Install AML on Windows, macOS, or Linux and create your first PHPAML MVC project." };
export default function ChapterOnePage(){ return <ChapterOne locale="en"/>; }
