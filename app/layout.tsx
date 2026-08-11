import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3002";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const base = new URL(`${protocol}://${host}`);
  return {
    metadataBase: base,
    title: { default: "PHPAML — Autonomous PHP mini-framework", template: "%s · PHPAML" },
    description: "A compact PHP MVC framework inspired by Java EE and ASP.NET, with its own PHP and Composer runtimes.",
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
    openGraph: {
      title: "PHPAML — Petit par choix",
      description: "Framework MVC, CLI autonome, PHP et Composer inclus.",
      type: "website",
      locale: "en_CA",
      alternateLocale: ["fr_CA"],
      images: [{ url: new URL("/og-v2.png", base).toString(), width: 1200, height: 630, alt: "PHPAML — Structure PHP. Keep control." }],
    },
    twitter: { card: "summary_large_image", images: [new URL("/og-v2.png", base).toString()] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body></html>;
}
