export const release = {
  cliVersion: "1.7.0-beta.15",
  frameworkVersion: "0.3.0-beta.2",
  templateVersion: "0.5.0-beta.2",
  repository: "https://github.com/MR-C0DE/phpaml-cli",
  tagUrl: "https://github.com/MR-C0DE/phpaml-cli/releases/tag/v1.7.0-beta.15",
  assets: [
    { mark: "⊞", name: "Windows", detail: "Windows 10/11 · x64", file: "phpaml-1.7.0-beta.15-windows-x64.exe", size: 8734539, sha256: "7851c448071bac7a21694b825aa6684135f0534e05e6510b4ba898ef9f4b6c12" },
    { mark: "●", name: "macOS", detail: "Apple Silicon · ARM64", file: "phpaml-1.7.0-beta.15-macos-arm64.pkg", size: 8447304, sha256: "a05b191e169e83523847907e4dba234c4801f7e401520225ebc3d1479ebe2c4a" },
    { mark: "◆", name: "Linux", detail: "Debian / Ubuntu · x64", file: "phpaml-1.7.0-beta.15-linux-x64.deb", size: 6412502, sha256: "93e91243551a2ec6530fd4f27880f22b5c38a452bab185584baa68f51162fba8" },
  ],
} as const;

export const releaseAssetUrl = (file: string) =>
  `${release.repository}/releases/download/v${release.cliVersion}/${file}`;
