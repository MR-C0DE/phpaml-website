import type { Metadata } from "next";
import { DocsReferencePage } from "../../../docs/page";

export const metadata: Metadata = {
  title: "Référence technique PHPAML",
  description: "Référence complète de PHPAML : AML, MVC, View, Engine, API, Data, sécurité, tests et déploiement.",
};

export default function FrenchReferencePage() {
  return <DocsReferencePage locale="fr" />;
}
