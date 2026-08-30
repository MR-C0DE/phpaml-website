import type { Metadata } from "next";
import { headers } from "next/headers";
import { Analytics } from "./analytics";
import "./analytics.css";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3002";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const base = new URL(`${protocol}://${host}`);
  return {
    metadataBase: base,
    title: { default: "PHPAML — The autonomous PHP application platform", template: "%s · PHPAML" },
    description: "Build classic MVC applications, declarative interfaces, APIs, and data layers with Framework, AML View, Engine, Data, and i18n.",
    icons: {
      icon: [{ url: "/favicon.png", type: "image/png", sizes: "64x64" }],
      shortcut: "/favicon.png",
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    },
    openGraph: {
      title: "PHPAML — Une plateforme PHP complète et modulaire",
      description: "Framework, AML View, Engine, Data et i18n, avec CLI autonome, PHP et Composer inclus.",
      type: "website",
      locale: "en_CA",
      alternateLocale: ["fr_CA"],
      images: [{ url: new URL("/og-v3.png", base).toString(), width: 1200, height: 630, alt: "PHPAML — Build PHP. Keep control." }],
    },
    twitter: { card: "summary_large_image", images: [new URL("/og-v3.png", base).toString()] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}<Analytics /></body></html>;
}
