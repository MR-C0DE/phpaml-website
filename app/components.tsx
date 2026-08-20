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
        <nav className="desktop-nav" aria-label={locale === "fr" ? "Navigation principale" : "Main navigation"}>
          <Link href={`${prefix}/docs`}>{locale === "fr" ? "Documentation" : "Docs"}</Link>
          <Link href={`${prefix}/tutorial`}>{locale === "fr" ? "Tutoriel" : "Tutorial"}</Link>
          <Link href={`${prefix}/platform`}>Platform</Link>
          <Link href={`${prefix}/demos`}>Demos</Link>
          <Link href={`${prefix}/download`}>{locale === "fr" ? "Télécharger" : "Download"}</Link>
          <Link className="lang-switch" href={languageHref}>{locale === "fr" ? "EN" : "FR"}</Link>
          <a href="https://github.com/MR-C0DE/phpaml-cli">GitHub ↗</a>
          <Link className="nav-cta" href={`${prefix}/download`}>{locale === "fr" ? "Installer AML" : "Install AML"} <span>↓</span></Link>
        </nav>
        <details className="mobile-menu">
          <summary aria-label={locale === "fr" ? "Ouvrir le menu" : "Open menu"}>
            <span /><span /><span />
          </summary>
          <nav aria-label={locale === "fr" ? "Navigation mobile" : "Mobile navigation"}>
            <Link href={`${prefix}/docs`}>{locale === "fr" ? "Documentation" : "Docs"} <span>→</span></Link>
            <Link href={`${prefix}/tutorial`}>{locale === "fr" ? "Tutoriel MVC" : "MVC tutorial"} <span>→</span></Link>
            <Link href={`${prefix}/platform`}>Platform <span>→</span></Link>
            <Link href={`${prefix}/demos`}>Demos <span>→</span></Link>
            <Link href={`${prefix}/download`}>{locale === "fr" ? "Télécharger" : "Download"} <span>↓</span></Link>
            <a href="https://github.com/MR-C0DE/phpaml-cli">GitHub <span>↗</span></a>
            <Link href={languageHref}>{locale === "fr" ? "English" : "Français"} <span>{locale === "fr" ? "EN" : "FR"}</span></Link>
          </nav>
        </details>
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
          <Link href={`${prefix}/tutorial`}>{locale === "fr" ? "Tutoriel MVC" : "MVC tutorial"}</Link>
          <Link href={`${prefix}/platform`}>Platform</Link>
          <Link href={`${prefix}/demos`}>Demos</Link>
          <Link href={`${prefix}/download`}>{locale === "fr" ? "Installateurs" : "Installers"}</Link>
          <a href="https://phpaml-book-reader-demo.onrender.com">Demo</a>
          <a href="https://github.com/MR-C0DE/phpaml-chess-tutor-demo">Tutor Chess</a>
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

function highlightCode(source: string) {
  const tokenPattern = /((?<!:)\/\/[^\n]*|#\[|(?<=#\[)[A-Za-z_]\w*|\b[A-Za-z_]\w*(?=\s*:)|'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|\$[A-Za-z_]\w*|\b(?:final|class|extends|public|protected|private|function|return|new|use|true|false|null|int|string|bool|array|void|static|readonly|fn)\b|\b\d+(?:\.\d+)?\b|::|->)/g;
  const tokens = source.split(tokenPattern).filter(Boolean);
  return tokens.map((token, index) => {
    let kind = "plain";
    if (token.startsWith("//")) kind = "comment";
    else if (tokens[index - 1] === "#[") kind = "attribute";
    else if (token.startsWith("'") || token.startsWith('"')) kind = "string";
    else if (/^\$[A-Za-z_]/.test(token)) kind = "variable";
    else if (/^\d/.test(token)) kind = "number";
    else if (token === "::" || token === "->") kind = "operator";
    else if (/^(final|class|extends|public|protected|private|function|return|new|use|true|false|null|int|string|bool|array|void|static|readonly|fn)$/.test(token)) kind = "keyword";
    else if (/^[A-Za-z_]\w*$/.test(token)) kind = "parameter";
    return <span className={`syntax-${kind}`} key={`${index}-${token}`}>{token}</span>;
  });
}

export function CodeBlock({ children }: { children: React.ReactNode }) {
  const source = typeof children === "string" ? children : String(children ?? "");
  return (
    <div className="terminal">
      <div className="terminal-bar">
        <span /><span /><span />
        <small>phpaml — zsh</small>
      </div>
      <pre><code>{highlightCode(source)}</code></pre>
    </div>
  );
}
