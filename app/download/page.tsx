import Link from "next/link";
import { Footer, Header } from "../components";
import { release, releaseAssetUrl } from "../release";

export function DownloadPage({ locale }: { locale: "en" | "fr" }) {
  const fr = locale === "fr"; const prefix = fr ? "/fr" : "";
  return <><Header locale={locale} path="/download" /><main>
    <section className="page-hero centered shell"><p className="eyebrow"><span /> PHPAML CLI {release.cliVersion}</p><h1>{fr ? <>Choisissez votre<br /><em>plateforme.</em></> : <>Choose your<br /><em>platform.</em></>}</h1><p>{fr ? "PHP, Composer et AML sont inclus. Installez, ouvrez un terminal, commencez." : "PHP, Composer, and AML are included. Install, open a terminal, and start building."}</p></section>
    <section className="download-grid shell">{release.assets.map(p=><article key={p.name}><div className="platform-mark" aria-hidden="true">{p.mark}</div><p>{p.detail}</p><h2>{p.name}</h2><small>{fr ? "Installateur · PHP inclus" : "Installer · PHP included"} · {(p.size / 1_000_000).toFixed(1)} MB</small><a className="button primary full" href={releaseAssetUrl(p.file)}>{fr ? "Télécharger" : "Download"} <span>↓</span></a><a className="checksum" href={releaseAssetUrl(`${p.file}.sha256`)} title={p.sha256}>SHA-256</a></article>)}</section>
    <section className="after-install shell"><div><p className="kicker">{fr ? "Après l’installation" : "After installation"}</p><h2>{fr ? <>Quatre commandes.<br />Un projet prêt.</> : <>Four commands.<br />One ready project.</>}</h2></div><pre><code><span>$</span> aml create {fr ? "mon-projet" : "my-project"}{"\n"}<span>$</span> cd {fr ? "mon-projet" : "my-project"}{"\n"}<span>$</span> aml install{"\n"}<span>$</span> aml serve</code></pre></section>
    <section className="portable shell"><div><strong>{fr ? "Vous préférez une version portable ?" : "Prefer a portable version?"}</strong><p>{fr ? "Des archives vérifiées sont disponibles pour les trois plateformes." : "Verified archives are available for all three platforms."}</p></div><a href={release.tagUrl}>{fr ? "Voir tous les fichiers" : "View all files"} ↗</a></section>
    <div className="back-docs"><Link href={`${prefix}/docs`}>{fr ? "Consulter le guide d’installation" : "Read the installation guide"} →</Link></div>
  </main><Footer locale={locale} /></>;
}

export default function Download() { return <DownloadPage locale="en" />; }
