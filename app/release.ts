export const release = {
  cliVersion: "1.7.0-beta.21",
  frameworkVersion: "0.3.0-beta.3",
  templateVersion: "0.5.0-beta.3",
  repository: "https://github.com/MR-C0DE/phpaml-cli",
  tagUrl: "https://github.com/MR-C0DE/phpaml-cli/releases/tag/v1.7.0-beta.21",
  assets: [
    { mark: "⊞", name: "Windows", detail: "Windows 10/11 · x64", file: "phpaml-1.7.0-beta.21-windows-x64.exe", size: 8739160, sha256: "9cfabe7513a42bdbbdd6982f5eba96cb5cca4cbbb99c9e48652cd23674f4c8ce" },
    { mark: "●", name: "macOS", detail: "Apple Silicon · ARM64", file: "phpaml-1.7.0-beta.21-macos-arm64.pkg", size: 8455901, sha256: "bbbb92b0cd3a62955acf1ada34f32cb8c7f8e808cb1fa82bfe974c38b8fefcfa" },
    { mark: "◆", name: "Linux", detail: "Debian / Ubuntu · x64", file: "phpaml-1.7.0-beta.21-linux-x64.deb", size: 6418970, sha256: "74aed2171d7598067af6c63168fb7f43a0f7512c498adf77757f75b8eddd561a" },
  ],
} as const;

export const releaseAssetUrl = (file: string) =>
  `${release.repository}/releases/download/v${release.cliVersion}/${file}`;
