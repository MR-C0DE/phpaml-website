import { ConsentManager } from "./consent-manager";
import { Footer, Header } from "./components";

export function PrivacyPage({ locale }: { locale: "en" | "fr" }) {
  const fr = locale === "fr";
  return <>
    <Header locale={locale} path={fr ? "/confidentialite" : "/privacy"} />
    <main className="privacy-page">
      <section className="privacy-hero shell">
        <p className="kicker">{fr ? "CONFIDENTIALITÉ" : "PRIVACY"}</p>
        <h1>{fr ? "Vous gardez le contrôle de vos données." : "You stay in control of your data."}</h1>
        <p>{fr
          ? "PHPAML mesure son audience pour améliorer sa documentation, ses téléchargements et ses démonstrations. Cette mesure reste facultative et ne sert pas à créer un profil publicitaire."
          : "PHPAML measures its audience to improve documentation, downloads, and demos. Analytics is optional and is not used to build advertising profiles."}</p>
      </section>
      <section className="privacy-body shell">
        <ConsentManager locale={locale} />
        <div className="privacy-grid">
          <article><span>01</span><h2>{fr ? "Ce que nous mesurons" : "What we measure"}</h2><p>{fr ? "Pages visitées, parcours dans la documentation, provenance générale, appareil, langue et téléchargements des installateurs." : "Visited pages, documentation journeys, general traffic source, device, language, and installer downloads."}</p></article>
          <article><span>02</span><h2>{fr ? "Ce que nous évitons" : "What we avoid"}</h2><p>{fr ? "Aucun profil publicitaire, aucune revente de données et aucune collecte Analytics avant votre autorisation." : "No advertising profiles, no sale of data, and no Analytics collection before you give permission."}</p></article>
          <article><span>03</span><h2>{fr ? "Votre choix" : "Your choice"}</h2><p>{fr ? "Refuser ne bloque aucune fonctionnalité. Si vous retirez votre accord, la collecte est désactivée immédiatement sur ce navigateur." : "Declining does not block any feature. If you withdraw consent, collection is disabled immediately in this browser."}</p></article>
        </div>
      </section>
    </main>
    <Footer locale={locale} />
  </>;
}
