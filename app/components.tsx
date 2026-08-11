import Link from "next/link";

export function Brand() {
  return (
    <Link className="brand" href="/" aria-label="PHPAML — Accueil">
      <span className="brand-mark" aria-hidden="true">A</span>
      <span>PHP<span>AML</span></span>
    </Link>
  );
}

export function Header() {
  return (
    <header className="site-header">
      <div className="shell nav-wrap">
        <Brand />
        <nav aria-label="Navigation principale">
          <Link href="/docs">Documentation</Link>
          <Link href="/download">Télécharger</Link>
          <a href="https://github.com/MR-C0DE/phpaml-cli">GitHub ↗</a>
          <Link className="nav-cta" href="/download">Installer AML <span>↓</span></Link>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <Brand />
          <p>Le mini-framework PHP autonome, pensé pour rester lisible.</p>
        </div>
        <div className="footer-links">
          <Link href="/docs">Documentation</Link>
          <Link href="/download">Installateurs</Link>
          <a href="https://github.com/MR-C0DE/phpaml-framework">Framework</a>
          <a href="https://github.com/MR-C0DE/phpaml-template">Modèle</a>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>PHPAML est un projet expérimental.</span>
        <span>Version actuelle · 1.3.0</span>
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
