export const release = {
  cliVersion: "1.3.0",
  frameworkVersion: "0.1.0",
  templateVersion: "0.1.0",
  repository: "https://github.com/MR-C0DE/phpaml-cli",
  tagUrl: "https://github.com/MR-C0DE/phpaml-cli/releases/tag/v1.3.0",
  assets: [
    { mark: "⊞", name: "Windows", detail: "Windows 10/11 · x64", file: "phpaml-1.3.0-windows-x64.exe", size: 8689008, sha256: "8477e0d11e5cf9f5ba392cc873ff060fd579424c34d5059f0843fb8fe29d4232" },
    { mark: "●", name: "macOS", detail: "Apple Silicon · ARM64", file: "phpaml-1.3.0-macos-arm64.pkg", size: 8395433, sha256: "5fa784a6b4011738af4ef9705dd59282d21fcf93f33dbc2e4f9e4da4ff923cf3" },
    { mark: "◆", name: "Linux", detail: "Debian / Ubuntu · x64", file: "phpaml-1.3.0-linux-x64.deb", size: 6376006, sha256: "42a2deb69a8b6a9c3f88c42e7fb391377501d96b4a61ee622d909400d95684fe" },
  ],
} as const;

export const releaseAssetUrl = (file: string) =>
  `${release.repository}/releases/download/v${release.cliVersion}/${file}`;
