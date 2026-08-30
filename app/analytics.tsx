"use client";

import { useEffect, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";

const measurementId = "G-YFP7HP50RP";
const consentKey = "phpaml-analytics-consent";
const consentEvent = "phpaml-analytics-consent-change";

function readConsent(): "accepted" | "declined" | null {
  const value = window.localStorage.getItem(consentKey);
  return value === "accepted" || value === "declined" ? value : null;
}

function subscribeToConsent(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(consentEvent, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(consentEvent, callback);
  };
}

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function sendPageView() {
  window.gtag?.("event", "page_view", {
    page_location: window.location.href,
    page_path: `${window.location.pathname}${window.location.search}`,
    page_title: document.title,
  });
}

function startAnalytics() {
  if (document.querySelector(`script[data-phpaml-analytics="${measurementId}"]`)) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = (...args: unknown[]) => window.dataLayer.push(args);
  window.gtag("js", new Date());
  window.gtag("config", measurementId, {
    anonymize_ip: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    send_page_view: true,
  });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  script.dataset.phpamlAnalytics = measurementId;
  document.head.appendChild(script);
}

function platformFor(file: string) {
  if (/windows/i.test(file)) return "windows";
  if (/macos/i.test(file)) return "macos";
  if (/linux/i.test(file)) return "linux";
  return "other";
}

export function Analytics() {
  const consent = useSyncExternalStore(subscribeToConsent, readConsent, () => null);
  const pathname = usePathname();
  const isFrench = pathname === "/fr" || pathname.startsWith("/fr/");

  useEffect(() => {
    if (consent !== "accepted") return;
    startAnalytics();

    const trackNavigation = () => window.setTimeout(sendPageView, 0);
    const originalPushState = history.pushState.bind(history);
    const originalReplaceState = history.replaceState.bind(history);
    history.pushState = (...args) => { originalPushState(...args); trackNavigation(); };
    history.replaceState = (...args) => { originalReplaceState(...args); trackNavigation(); };
    window.addEventListener("popstate", trackNavigation);

    const trackClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;
      const url = new URL(anchor.href, window.location.href);
      const label = anchor.textContent?.trim().replace(/\s+/g, " ").slice(0, 120) || "";
      const common = { link_url: url.href, link_text: label, page_path: window.location.pathname };

      if (url.hostname === "github.com" && url.pathname.includes("/releases/download/")) {
        const fileName = url.pathname.split("/").pop() || "unknown";
        window.gtag?.("event", "file_download", { ...common, file_name: fileName, file_extension: fileName.split(".").pop(), platform: platformFor(fileName) });
      } else if (url.origin !== window.location.origin) {
        window.gtag?.("event", "outbound_click", { ...common, destination: url.hostname });
      } else if (url.pathname.endsWith("/download")) {
        window.gtag?.("event", "view_download_page", common);
      }
    };
    document.addEventListener("click", trackClick, true);

    return () => {
      history.pushState = originalPushState;
      history.replaceState = originalReplaceState;
      window.removeEventListener("popstate", trackNavigation);
      document.removeEventListener("click", trackClick, true);
    };
  }, [consent]);

  function choose(value: "accepted" | "declined") {
    window.localStorage.setItem(consentKey, value);
    window.dispatchEvent(new Event(consentEvent));
  }

  if (consent !== null) return null;
  return <aside className="analytics-consent" aria-label="Analytics preferences">
    <div>
      <strong>{isFrench ? "Mesure d’audience PHPAML" : "PHPAML Analytics"}</strong>
      <p>{isFrench
        ? "Nous utilisons des données d’usage anonymes pour comprendre les visites, les parcours dans la documentation et les téléchargements. Aucun profil publicitaire."
        : "We use anonymous usage data to understand visits, documentation journeys and installer downloads. No advertising profiles."}</p>
    </div>
    <div className="analytics-consent-actions">
      <button type="button" onClick={() => choose("declined")}>{isFrench ? "Refuser" : "Decline"}</button>
      <button className="accept" type="button" onClick={() => choose("accepted")}>{isFrench ? "Autoriser les statistiques" : "Accept analytics"}</button>
    </div>
  </aside>;
}
