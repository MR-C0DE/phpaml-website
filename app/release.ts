export const release = {
  cliVersion: "1.7.0-beta.31",
  frameworkVersion: "0.3.0-beta.5",
  templateVersion: "0.5.0-beta.7",
  repository: "https://github.com/MR-C0DE/phpaml-cli",
  tagUrl: "https://github.com/MR-C0DE/phpaml-cli/releases/tag/v1.7.0-beta.31",
  assets: [
    { mark: "⊞", name: "Windows", detail: "Windows 10/11 · x64", file: "phpaml-1.7.0-beta.31-windows-x64.exe", size: 8748616, sha256: "4243eff920cc7819e95e38b61007041ac3457c5ca26fc235870f6985d83df3cf" },
    { mark: "●", name: "macOS", detail: "Apple Silicon · ARM64", file: "phpaml-1.7.0-beta.31-macos-arm64.pkg", size: 8471480, sha256: "4d274315f0827c7a037390e688f85e11abbbd88779095ed949039230566af7e2" },
    { mark: "◆", name: "Linux", detail: "Debian / Ubuntu · x64", file: "phpaml-1.7.0-beta.31-linux-x64.deb", size: 6434286, sha256: "16e4b9425b331c380be1545554baab88ee26367fd615d417a4b1a631054ab5ae" },
  ],
} as const;

export const releaseAssetUrl = (file: string) =>
  `${release.repository}/releases/download/v${release.cliVersion}/${file}`;
