import type { Metadata } from "next";
import { PrivacyPage } from "../privacy-content";

export const metadata: Metadata = {
  title: "Privacy and analytics preferences",
  description: "Understand and control audience measurement on phpaml.com.",
};

export default function Page() {
  return <PrivacyPage locale="en" />;
}
