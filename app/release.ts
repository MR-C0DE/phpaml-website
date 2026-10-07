export const release = {
  cliVersion: "1.7.0-beta.35",
  frameworkVersion: "0.3.0-beta.6",
  templateVersion: "0.5.0-beta.8",
  repository: "https://github.com/MR-C0DE/phpaml-cli",
  tagUrl: "https://github.com/MR-C0DE/phpaml-cli/releases/tag/v1.7.0-beta.35",
  assets: [
    { mark: "⊞", name: "Windows", detail: "Windows 10/11 · x64", file: "phpaml-1.7.0-beta.35-windows-x64.exe", size: 8744189, sha256: "0a52688fabbc91c9a1924493a99bf3f1f48d42a952a559a5c8368311fd5f5f8d" },
    { mark: "●", name: "macOS", detail: "Apple Silicon · ARM64", file: "phpaml-1.7.0-beta.35-macos-arm64.pkg", size: 8477628, sha256: "7feadb82fbc104af9829b1bbb48934e0d89a2e7d455e819238ae0b92547413b4" },
    { mark: "◆", name: "Linux", detail: "Debian / Ubuntu · x64", file: "phpaml-1.7.0-beta.35-linux-x64.deb", size: 6438608, sha256: "4730054682c725352fa51b1738e032b2eaeb40ca4268090339895a9e1733ed8a" },
  ],
} as const;

export const releaseAssetUrl = (file: string) =>
  `${release.repository}/releases/download/v${release.cliVersion}/${file}`;
