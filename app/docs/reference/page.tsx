import type { Metadata } from "next";
import { DocsReferencePage } from "../page";

export const metadata: Metadata = {
  title: "PHPAML technical reference",
  description: "Complete PHPAML reference for AML, MVC, View, Engine, API, Data, security, testing, and deployment.",
};

export default function ReferencePage() {
  return <DocsReferencePage locale="en" />;
}
