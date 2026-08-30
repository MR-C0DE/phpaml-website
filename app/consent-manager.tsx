"use client";

import { useSyncExternalStore } from "react";
import {
  readAnalyticsConsent,
  setAnalyticsConsent,
  subscribeToAnalyticsConsent,
} from "./analytics";

export function ConsentManager({ locale }: { locale: "en" | "fr" }) {
  const consent = useSyncExternalStore(subscribeToAnalyticsConsent, readAnalyticsConsent, () => null);
  const fr = locale === "fr";
  const status = consent === "accepted"
    ? (fr ? "Statistiques autorisées" : "Analytics allowed")
    : consent === "declined"
      ? (fr ? "Statistiques refusées" : "Analytics declined")
      : (fr ? "Aucun choix enregistré" : "No preference saved");

  return <section className="consent-panel" aria-live="polite">
    <div>
      <small>{fr ? "CHOIX ACTUEL" : "CURRENT PREFERENCE"}</small>
      <strong>{status}</strong>
      <p>{fr
        ? "Votre choix est enregistré uniquement dans ce navigateur. Vous pouvez le modifier à tout moment."
        : "Your preference is stored only in this browser. You can change it at any time."}</p>
    </div>
    <div className="consent-panel-actions">
      <button type="button" className={consent === "declined" ? "selected" : ""} onClick={() => setAnalyticsConsent("declined")}>{fr ? "Refuser" : "Decline"}</button>
      <button type="button" className={consent === "accepted" ? "selected accept" : "accept"} onClick={() => setAnalyticsConsent("accepted")}>{fr ? "Autoriser les statistiques" : "Allow analytics"}</button>
    </div>
  </section>;
}
