export const release = {
  cliVersion: "1.7.0-beta.11",
  frameworkVersion: "0.2.1-beta.1",
  templateVersion: "0.4.0-beta.5",
  repository: "https://github.com/MR-C0DE/phpaml-cli",
  tagUrl: "https://github.com/MR-C0DE/phpaml-cli/releases/tag/v1.7.0-beta.11",
  assets: [
    { mark: "⊞", name: "Windows", detail: "Windows 10/11 · x64", file: "phpaml-1.7.0-beta.11-windows-x64.exe", size: 8727122, sha256: "aac8d208f5369cc503e07ebb1cf6d2de99ec9ae96b71af56fe0afcc9353c7e35" },
    { mark: "●", name: "macOS", detail: "Apple Silicon · ARM64", file: "phpaml-1.7.0-beta.11-macos-arm64.pkg", size: 8435766, sha256: "10fe15668234b0cf64d630e2015cbfa03452fbf3dbb849d4a270ed31c948bbef" },
    { mark: "◆", name: "Linux", detail: "Debian / Ubuntu · x64", file: "phpaml-1.7.0-beta.11-linux-x64.deb", size: 6400748, sha256: "2d443110485329a83027e4086b10076614dce465827f30ed5861a45056064931" },
  ],
} as const;

export const releaseAssetUrl = (file: string) =>
  `${release.repository}/releases/download/v${release.cliVersion}/${file}`;
