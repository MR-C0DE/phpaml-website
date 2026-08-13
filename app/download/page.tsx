import Link from "next/link";
import { Footer, Header } from "../components";
import { release, releaseAssetUrl } from "../release";

function PlatformLogo({ platform }: { platform: string }) {
  if (platform === "Windows") return <svg viewBox="0 0 24 24" role="img" aria-label="Windows"><path d="M2 3.4 10.7 2v9.2H2V3.4Zm9.8-1.6L22 0v11.2H11.8V1.8ZM2 12.3h8.7v9.2L2 20.2v-7.9Zm9.8 0H22V24l-10.2-1.7v-10Z" /></svg>;
  if (platform === "macOS") return <svg viewBox="0 0 24 24" role="img" aria-label="Apple"><path d="M17.1 12.5c0-2.7 2.2-4 2.3-4.1-1.2-1.8-3.2-2.1-3.9-2.1-1.7-.2-3.2 1-4 1-.7 0-2.1-1-3.5-1-1.8 0-3.5 1.1-4.5 2.7-1.9 3.3-.5 8.2 1.4 10.9.9 1.3 2 2.8 3.5 2.7 1.4-.1 1.9-.9 3.6-.9s2.2.9 3.7.9c1.5 0 2.5-1.3 3.4-2.7 1.1-1.5 1.5-3 1.5-3.1-.1 0-3.5-1.3-3.5-5.3ZM14.4 4.6c.8-1 1.3-2.3 1.2-3.6-1.2.1-2.6.8-3.4 1.8-.7.8-1.4 2.2-1.2 3.4 1.3.1 2.6-.6 3.4-1.6Z" /></svg>;
  return <svg viewBox="0 0 24 24" role="img" aria-label="Linux"><path d="M12 1.2c-3 0-4.6 2.8-4.6 6.3 0 1.5.3 2.6-.5 4.1-.7 1.3-2.3 3.1-2.3 5.3 0 1.5.6 2.5 1.6 2.5.8 0 1.3-.5 1.7-1.1.9 1 2.4 1.7 4.1 1.7s3.2-.7 4.1-1.7c.4.6.9 1.1 1.7 1.1 1 0 1.6-1 1.6-2.5 0-2.2-1.6-4-2.3-5.3-.8-1.5-.5-2.6-.5-4.1 0-3.5-1.6-6.3-4.6-6.3Zm-1.7 5.2c-.6 0-1-.6-1-1.3s.4-1.3 1-1.3 1 .6 1 1.3-.4 1.3-1 1.3Zm3.4 0c-.6 0-1-.6-1-1.3s.4-1.3 1-1.3 1 .6 1 1.3-.4 1.3-1 1.3ZM12 6.6c.8 0 1.5.4 1.5.9s-.7 1.2-1.5 1.2-1.5-.7-1.5-1.2.7-.9 1.5-.9Zm0 4c1.6 0 2.9 1.7 2.9 3.8s-1.3 3.8-2.9 3.8-2.9-1.7-2.9-3.8 1.3-3.8 2.9-3.8Z" /></svg>;
}

export function DownloadPage({ locale }: { locale: "en" | "fr" }) {
  const fr = locale === "fr"; const prefix = fr ? "/fr" : "";
  return <><Header locale={locale} path="/download" /><main>
    <section className="page-hero centered shell"><p className="eyebrow"><span /> PHPAML CLI {release.cliVersion}</p><h1>{fr ? <>Choisissez votre<br /><em>plateforme.</em></> : <>Choose your<br /><em>platform.</em></>}</h1><p>{fr ? "PHP, Composer et AML sont inclus. Installez, ouvrez un terminal, commencez." : "PHP, Composer, and AML are included. Install, open a terminal, and start building."}</p></section>
    <section className="download-grid shell">{release.assets.map((p, index)=><article className="download-card" key={p.name}>
      <div className="download-card-top"><div className="platform-mark"><PlatformLogo platform={p.name} /></div><div className="platform-copy"><p>{p.detail}</p><h2>{p.name}</h2></div><span className="platform-number">0{index + 1}</span></div>
      <div className="download-meta"><span>{fr ? "Installateur" : "Installer"}</span><span>{fr ? "PHP inclus" : "PHP included"}</span><span>{(p.size / 1_000_000).toFixed(1)} MB</span></div>
      <a className="button primary full" href={releaseAssetUrl(p.file)}>{fr ? "Télécharger" : "Download"} <span>↓</span></a>
      <a className="checksum" href={releaseAssetUrl(`${p.file}.sha256`)} title={p.sha256}><span>✓</span> SHA-256</a>
    </article>)}</section>
    <section className="after-install shell"><div><p className="kicker">{fr ? "Après l’installation" : "After installation"}</p><h2>{fr ? <>Quatre commandes.<br />Un projet prêt.</> : <>Four commands.<br />One ready project.</>}</h2></div><pre><code><span>$</span> aml create {fr ? "mon-projet" : "my-project"}{"\n"}<span>$</span> cd {fr ? "mon-projet" : "my-project"}{"\n"}<span>$</span> aml install{"\n"}<span>$</span> aml serve</code></pre></section>
    <section className="portable shell"><div><strong>{fr ? "Vous préférez une version portable ?" : "Prefer a portable version?"}</strong><p>{fr ? "Des archives vérifiées sont disponibles pour les trois plateformes." : "Verified archives are available for all three platforms."}</p></div><a href={release.tagUrl}>{fr ? "Voir tous les fichiers" : "View all files"} ↗</a></section>
    <div className="back-docs"><Link href={`${prefix}/docs`}>{fr ? "Consulter le guide d’installation" : "Read the installation guide"} →</Link></div>
  </main><Footer locale={locale} /></>;
}

export default function Download() { return <DownloadPage locale="en" />; }
