export const release = {
  cliVersion: "1.7.0-beta.22",
  frameworkVersion: "0.3.0-beta.3",
  templateVersion: "0.5.0-beta.3",
  repository: "https://github.com/MR-C0DE/phpaml-cli",
  tagUrl: "https://github.com/MR-C0DE/phpaml-cli/releases/tag/v1.7.0-beta.22",
  assets: [
    { mark: "⊞", name: "Windows", detail: "Windows 10/11 · x64", file: "phpaml-1.7.0-beta.22-windows-x64.exe", size: 8740369, sha256: "75b7a0f1010a5e63d98eaaa81d309531498d23acd314ae63e1721d6ccdfd1934" },
    { mark: "●", name: "macOS", detail: "Apple Silicon · ARM64", file: "phpaml-1.7.0-beta.22-macos-arm64.pkg", size: 8456585, sha256: "6e6ce78c2e007eff45215b6d9ff47b749b2cb704d51cc08b7d38c3894183a37f" },
    { mark: "◆", name: "Linux", detail: "Debian / Ubuntu · x64", file: "phpaml-1.7.0-beta.22-linux-x64.deb", size: 6419632, sha256: "da9107846c49c207d06fbf33f11f792c37985891fea0c3cb7f8e410fff196300" },
  ],
} as const;

export const releaseAssetUrl = (file: string) =>
  `${release.repository}/releases/download/v${release.cliVersion}/${file}`;
