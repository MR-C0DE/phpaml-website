import Link from "next/link";
import Image from "next/image";
import { release } from "./release";

export function Brand({ locale = "en" }: { locale?: "en" | "fr" }) {
  return (
    <Link className="brand" href={locale === "fr" ? "/fr" : "/"} aria-label="PHPAML — Home">
      <Image className="brand-mark" src="/phpaml-logo-violet-lime.png" alt="" width={32} height={32} priority />
      <span>PHP<span>AML</span></span>
    </Link>
  );
}

export function Header({ locale = "en", path = "" }: { locale?: "en" | "fr"; path?: string }) {
  const prefix = locale === "fr" ? "/fr" : "";
  const languageHref = locale === "fr" ? (path || "/") : `/fr${path}`;
  return (
    <header className="site-header">
      <div className="shell nav-wrap">
        <Brand locale={locale} />
        <nav aria-label={locale === "fr" ? "Navigation principale" : "Main navigation"}>
          <Link href={`${prefix}/docs`}>{locale === "fr" ? "Documentation" : "Docs"}</Link>
          <Link href={`${prefix}/download`}>{locale === "fr" ? "Télécharger" : "Download"}</Link>
          <Link className="lang-switch" href={languageHref}>{locale === "fr" ? "EN" : "FR"}</Link>
          <a href="https://github.com/MR-C0DE/phpaml-cli">GitHub ↗</a>
          <Link className="nav-cta" href={`${prefix}/download`}>{locale === "fr" ? "Installer AML" : "Install AML"} <span>↓</span></Link>
        </nav>
      </div>
    </header>
  );
}

export function Footer({ locale = "en" }: { locale?: "en" | "fr" }) {
  const prefix = locale === "fr" ? "/fr" : "";
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <Brand locale={locale} />
          <p>{locale === "fr" ? "Le mini-framework PHP autonome, pensé pour rester lisible." : "The autonomous PHP mini-framework, designed to stay readable."}</p>
        </div>
        <div className="footer-links">
          <Link href={`${prefix}/docs`}>{locale === "fr" ? "Documentation" : "Documentation"}</Link>
          <Link href={`${prefix}/download`}>{locale === "fr" ? "Installateurs" : "Installers"}</Link>
          <a href="https://github.com/MR-C0DE/phpaml-framework">Framework</a>
          <a href="https://github.com/MR-C0DE/phpaml-template">Modèle</a>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>{locale === "fr" ? "PHPAML est un jeune projet stable." : "PHPAML is a young stable project."}</span>
        <span>{locale === "fr" ? "Version actuelle" : "Current version"} · {release.cliVersion}</span>
      </div>
    </footer>
  );
}

export function CodeBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="terminal">
      <div className="terminal-bar">
        <span /><span /><span />
        <small>phpaml — zsh</small>
      </div>
      <pre><code>{children}</code></pre>
    </div>
  );
}
