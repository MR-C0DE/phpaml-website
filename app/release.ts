export const release = {
  cliVersion: "1.7.0-beta.4",
  frameworkVersion: "0.2.0",
  templateVersion: "0.4.0-beta.2",
  repository: "https://github.com/MR-C0DE/phpaml-cli",
  tagUrl: "https://github.com/MR-C0DE/phpaml-cli/releases/tag/v1.7.0-beta.4",
  assets: [
    { mark: "⊞", name: "Windows", detail: "Windows 10/11 · x64", file: "phpaml-1.7.0-beta.4-windows-x64.exe", size: 8712780, sha256: "b703a7481f2b00750577be2c1c641588883767452323443289e1b754baa66844" },
    { mark: "●", name: "macOS", detail: "Apple Silicon · ARM64", file: "phpaml-1.7.0-beta.4-macos-arm64.pkg", size: 8417946, sha256: "b7e47092bffb5430cdf7f94fb1d39873d126c01cf1aab17577456513de672741" },
    { mark: "◆", name: "Linux", detail: "Debian / Ubuntu · x64", file: "phpaml-1.7.0-beta.4-linux-x64.deb", size: 6391146, sha256: "89b76741ac0bf0f305f6c2632e6be887e9b5a9b80168845745a81dca5a332774" },
  ],
} as const;

export const releaseAssetUrl = (file: string) =>
  `${release.repository}/releases/download/v${release.cliVersion}/${file}`;
