export const release = {
  cliVersion: "1.7.0-beta.20",
  frameworkVersion: "0.3.0-beta.3",
  templateVersion: "0.5.0-beta.3",
  repository: "https://github.com/MR-C0DE/phpaml-cli",
  tagUrl: "https://github.com/MR-C0DE/phpaml-cli/releases/tag/v1.7.0-beta.20",
  assets: [
    { mark: "⊞", name: "Windows", detail: "Windows 10/11 · x64", file: "phpaml-1.7.0-beta.20-windows-x64.exe", size: 8738306, sha256: "c34a2639f5ed4c2e9eedab39456bfd6c69bd6defde006c486ce7b52b340cf346" },
    { mark: "●", name: "macOS", detail: "Apple Silicon · ARM64", file: "phpaml-1.7.0-beta.20-macos-arm64.pkg", size: 8450971, sha256: "5dd45e65ccac9dd78eed12e83ac7eb958a13e7b7aac900151f75350574bb8a58" },
    { mark: "◆", name: "Linux", detail: "Debian / Ubuntu · x64", file: "phpaml-1.7.0-beta.20-linux-x64.deb", size: 6414518, sha256: "2c12908b8213b664f414b5b94c7230a6789f2c6eaf9f566ce789f3553a3f7e53" },
  ],
} as const;

export const releaseAssetUrl = (file: string) =>
  `${release.repository}/releases/download/v${release.cliVersion}/${file}`;
