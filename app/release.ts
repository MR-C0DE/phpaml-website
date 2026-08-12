export const release = {
  cliVersion: "1.6.0-beta.7",
  frameworkVersion: "0.2.0",
  templateVersion: "0.3.0",
  repository: "https://github.com/MR-C0DE/phpaml-cli",
  tagUrl: "https://github.com/MR-C0DE/phpaml-cli/releases/tag/v1.6.0-beta.7",
  assets: [
    { mark: "⊞", name: "Windows", detail: "Windows 10/11 · x64", file: "phpaml-1.6.0-beta.7-windows-x64.exe", size: 8710358, sha256: "b9217ca08cb67ffaf3855d200ed61df6b6c9883f47afbd3c17a269176b360080" },
    { mark: "●", name: "macOS", detail: "Apple Silicon · ARM64", file: "phpaml-1.6.0-beta.7-macos-arm64.pkg", size: 8413007, sha256: "5b8acaf8e80baf521221018194fe9bb4f2c94bd95f73e203661a3e75cde0d32a" },
    { mark: "◆", name: "Linux", detail: "Debian / Ubuntu · x64", file: "phpaml-1.6.0-beta.7-linux-x64.deb", size: 6385114, sha256: "d058592b38edbc392f38f64901f37c084f88677ce6fe557dacda5fd2062f19c3" },
  ],
} as const;

export const releaseAssetUrl = (file: string) =>
  `${release.repository}/releases/download/v${release.cliVersion}/${file}`;
