import type { Metadata } from "next";
import { ChapterThree } from "../chapter-three";
export const metadata:Metadata={title:"Follow an HTTP request — PHPAML Tutorial",description:"Follow a PHPAML request through public/index.php, middleware, routing, controllers, models, views, and HTTP responses."};
export default function ChapterThreePage(){return <ChapterThree locale="en"/>}
