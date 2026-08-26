export const release = {
  cliVersion: "1.7.0-beta.19",
  frameworkVersion: "0.3.0-beta.3",
  templateVersion: "0.5.0-beta.3",
  repository: "https://github.com/MR-C0DE/phpaml-cli",
  tagUrl: "https://github.com/MR-C0DE/phpaml-cli/releases/tag/v1.7.0-beta.19",
  assets: [
    { mark: "⊞", name: "Windows", detail: "Windows 10/11 · x64", file: "phpaml-1.7.0-beta.19-windows-x64.exe", size: 8736079, sha256: "a6bf14b5f6f4896b29a2c1f5b406007e1fc7c020add87af81c40b118e38c9e5a" },
    { mark: "●", name: "macOS", detail: "Apple Silicon · ARM64", file: "phpaml-1.7.0-beta.19-macos-arm64.pkg", size: 8449336, sha256: "72941acf991df892d8f975ec4f6f430e83c5f205039f30e59a4f5d221a0e6ff6" },
    { mark: "◆", name: "Linux", detail: "Debian / Ubuntu · x64", file: "phpaml-1.7.0-beta.19-linux-x64.deb", size: 6414670, sha256: "3d369c8d79411f53ef373a5c9202e65fe6c833f87febdd3f53c6091bb6ae0896" },
  ],
} as const;

export const releaseAssetUrl = (file: string) =>
  `${release.repository}/releases/download/v${release.cliVersion}/${file}`;
