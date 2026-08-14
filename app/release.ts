export const release = {
  cliVersion: "1.7.0-beta.2",
  frameworkVersion: "0.2.0",
  templateVersion: "0.4.0-beta.2",
  repository: "https://github.com/MR-C0DE/phpaml-cli",
  tagUrl: "https://github.com/MR-C0DE/phpaml-cli/releases/tag/v1.7.0-beta.2",
  assets: [
    { mark: "⊞", name: "Windows", detail: "Windows 10/11 · x64", file: "phpaml-1.7.0-beta.2-windows-x64.exe", size: 8711971, sha256: "2be0e27faa599933f4922d1edae52ceb28cb1af31e3fcf9511f74956d3a02794" },
    { mark: "●", name: "macOS", detail: "Apple Silicon · ARM64", file: "phpaml-1.7.0-beta.2-macos-arm64.pkg", size: 8414474, sha256: "7cac537b23f3a366b46d3a6841a97517ab40aa41e02e6a41ab414d57bcca0713" },
    { mark: "◆", name: "Linux", detail: "Debian / Ubuntu · x64", file: "phpaml-1.7.0-beta.2-linux-x64.deb", size: 6386904, sha256: "d3a83a22643723959abfb57ade9893082c7b9722c12c04d23454d74e8d29f947" },
  ],
} as const;

export const releaseAssetUrl = (file: string) =>
  `${release.repository}/releases/download/v${release.cliVersion}/${file}`;
