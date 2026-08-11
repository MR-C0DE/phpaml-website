import Link from "next/link";
import { Footer, Header } from "../components";

const base = "https://github.com/MR-C0DE/phpaml-cli/releases/download/v1.3.0";
const platforms = [
  { mark: "⊞", name: "Windows", detail: "Windows 10/11 · x64", file: "phpaml-1.3.0-windows-x64.exe", note: "Installateur utilisateur · PHP inclus" },
  { mark: "●", name: "macOS", detail: "Apple Silicon · ARM64", file: "phpaml-1.3.0-macos-arm64.pkg", note: "Paquet macOS · PHP inclus" },
  { mark: "◆", name: "Linux", detail: "Debian / Ubuntu · x64", file: "phpaml-1.3.0-linux-x64.deb", note: "Paquet Debian · PHP inclus" },
];

export default function DownloadPage() {
  return (
    <>
      <Header />
      <main>
        <section className="page-hero centered shell">
          <p className="eyebrow"><span /> PHPAML CLI 1.3.0</p>
          <h1>Choisissez votre<br /><em>plateforme.</em></h1>
          <p>PHP, Composer et AML sont inclus. Installez, ouvrez un terminal, commencez.</p>
        </section>
        <section className="download-grid shell">
          {platforms.map((platform) => (
            <article key={platform.name}>
              <div className="platform-mark" aria-hidden="true">{platform.mark}</div>
              <p>{platform.detail}</p>
              <h2>{platform.name}</h2>
              <small>{platform.note}</small>
              <a className="button primary full" href={`${base}/${platform.file}`}>Télécharger <span>↓</span></a>
              <a className="checksum" href={`${base}/${platform.file}.sha256`}>Empreinte SHA-256</a>
            </article>
          ))}
        </section>
        <section className="after-install shell">
          <div>
            <p className="kicker">Après l’installation</p>
            <h2>Quatre commandes.<br />Un projet prêt.</h2>
          </div>
          <pre><code><span>$</span> aml create mon-projet{"\n"}<span>$</span> cd mon-projet{"\n"}<span>$</span> aml install{"\n"}<span>$</span> aml serve</code></pre>
        </section>
        <section className="portable shell">
          <div><strong>Vous préférez une version portable ?</strong><p>Des archives ZIP et TAR.GZ vérifiées sont disponibles pour les trois plateformes.</p></div>
          <a href="https://github.com/MR-C0DE/phpaml-cli/releases/tag/v1.3.0">Voir tous les fichiers ↗</a>
        </section>
        <div className="back-docs"><Link href="/docs">Consulter le guide d’installation →</Link></div>
      </main>
      <Footer />
    </>
  );
}
