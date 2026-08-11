import Link from "next/link";
import { Footer, Header } from "../components";

const base = "https://github.com/MR-C0DE/phpaml-cli/releases/download/v1.3.0";
const platforms = [
  { mark: "⊞", name: "Windows", detail: "Windows 10/11 · x64", file: "phpaml-1.3.0-windows-x64.exe" },
  { mark: "●", name: "macOS", detail: "Apple Silicon · ARM64", file: "phpaml-1.3.0-macos-arm64.pkg" },
  { mark: "◆", name: "Linux", detail: "Debian / Ubuntu · x64", file: "phpaml-1.3.0-linux-x64.deb" },
];

export function DownloadPage({ locale }: { locale: "en" | "fr" }) {
  const fr = locale === "fr"; const prefix = fr ? "/fr" : "";
  return <><Header locale={locale} path="/download" /><main>
    <section className="page-hero centered shell"><p className="eyebrow"><span /> PHPAML CLI 1.3.0</p><h1>{fr ? <>Choisissez votre<br /><em>plateforme.</em></> : <>Choose your<br /><em>platform.</em></>}</h1><p>{fr ? "PHP, Composer et AML sont inclus. Installez, ouvrez un terminal, commencez." : "PHP, Composer, and AML are included. Install, open a terminal, and start building."}</p></section>
    <section className="download-grid shell">{platforms.map(p=><article key={p.name}><div className="platform-mark" aria-hidden="true">{p.mark}</div><p>{p.detail}</p><h2>{p.name}</h2><small>{fr ? "Installateur · PHP inclus" : "Installer · PHP included"}</small><a className="button primary full" href={`${base}/${p.file}`}>{fr ? "Télécharger" : "Download"} <span>↓</span></a><a className="checksum" href={`${base}/${p.file}.sha256`}>SHA-256</a></article>)}</section>
    <section className="after-install shell"><div><p className="kicker">{fr ? "Après l’installation" : "After installation"}</p><h2>{fr ? <>Quatre commandes.<br />Un projet prêt.</> : <>Four commands.<br />One ready project.</>}</h2></div><pre><code><span>$</span> aml create {fr ? "mon-projet" : "my-project"}{"\n"}<span>$</span> cd {fr ? "mon-projet" : "my-project"}{"\n"}<span>$</span> aml install{"\n"}<span>$</span> aml serve</code></pre></section>
    <section className="portable shell"><div><strong>{fr ? "Vous préférez une version portable ?" : "Prefer a portable version?"}</strong><p>{fr ? "Des archives vérifiées sont disponibles pour les trois plateformes." : "Verified archives are available for all three platforms."}</p></div><a href="https://github.com/MR-C0DE/phpaml-cli/releases/tag/v1.3.0">{fr ? "Voir tous les fichiers" : "View all files"} ↗</a></section>
    <div className="back-docs"><Link href={`${prefix}/docs`}>{fr ? "Consulter le guide d’installation" : "Read the installation guide"} →</Link></div>
  </main><Footer locale={locale} /></>;
}

export default function Download() { return <DownloadPage locale="en" />; }
