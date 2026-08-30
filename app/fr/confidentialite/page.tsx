import type { Metadata } from "next";
import { PrivacyPage } from "../../privacy-content";

export const metadata: Metadata = {
  title: "Confidentialité et préférences Analytics",
  description: "Comprendre et contrôler la mesure d’audience sur phpaml.com.",
};

export default function Page() {
  return <PrivacyPage locale="fr" />;
}
