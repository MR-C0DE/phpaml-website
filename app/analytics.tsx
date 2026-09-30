"use client";

import { useEffect, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";

const measurementId = "G-YFP7HP50RP";
const consentKey = "phpaml-analytics-consent";
const consentEvent = "phpaml-analytics-consent-change";
export type AnalyticsConsent = "accepted" | "declined" | null;

export function readAnalyticsConsent(): AnalyticsConsent {
  const value = window.localStorage.getItem(consentKey);
  return value === "accepted" || value === "declined" ? value : null;
}

export function subscribeToAnalyticsConsent(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(consentEvent, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(consentEvent, callback);
  };
}

export function setAnalyticsConsent(value: Exclude<AnalyticsConsent, null>) {
  window.localStorage.setItem(consentKey, value);
  window[`ga-disable-${measurementId}`] = value === "declined";
  window.dispatchEvent(new Event(consentEvent));
}

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
    "ga-disable-G-YFP7HP50RP"?: boolean;
  }
}

function sendPageView() {
  const pageLocation = window.location.href;
  if (pageLocation === lastPageView) return;
  lastPageView = pageLocation;
  window.gtag?.("event", "page_view", {
    page_location: pageLocation,
    page_path: `${window.location.pathname}${window.location.search}`,
    page_title: document.title,
  });
}

let analyticsReady: Promise<void> | null = null;
let lastPageView = "";

function startAnalytics(): Promise<void> {
  if (analyticsReady) return analyticsReady;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    void args;
    // Google Tag's official command queue requires this function's Arguments object.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  window.gtag("consent", "default", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.gtag("js", new Date());
  window.gtag("config", measurementId, {
    anonymize_ip: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    send_page_view: false,
  });

  analyticsReady = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[data-phpaml-analytics="${measurementId}"]`,
    );
    const script = existing ?? document.createElement("script");

    if (script.dataset.loaded === "true") {
      resolve();
      return;
    }

    script.addEventListener("load", () => {
      script.dataset.loaded = "true";
      resolve();
    }, { once: true });
    script.addEventListener("error", () => {
      analyticsReady = null;
      reject(new Error("Google Analytics failed to load."));
    }, { once: true });

    if (!existing) {
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      script.dataset.phpamlAnalytics = measurementId;
      document.head.appendChild(script);
    }
  });

  return analyticsReady;
}

function platformFor(file: string) {
  if (/windows/i.test(file)) return "windows";
  if (/macos/i.test(file)) return "macos";
  if (/linux/i.test(file)) return "linux";
  return "other";
}

export function Analytics() {
  const consent = useSyncExternalStore(subscribeToAnalyticsConsent, readAnalyticsConsent, () => null);
  const pathname = usePathname();
  const isFrench = pathname === "/fr" || pathname.startsWith("/fr/");

  useEffect(() => {
    window[`ga-disable-${measurementId}`] = consent === "declined";
    window.gtag?.("consent", "update", {
      analytics_storage: consent === "accepted" ? "granted" : "denied",
    });
    if (consent !== "accepted") return;
    startAnalytics()
      .then(() => window.setTimeout(sendPageView, 0))
      .catch(() => undefined);
  }, [consent, pathname]);

  useEffect(() => {
    if (consent !== "accepted") return;

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
      document.removeEventListener("click", trackClick, true);
    };
  }, [consent]);

  function choose(value: "accepted" | "declined") {
    setAnalyticsConsent(value);
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
