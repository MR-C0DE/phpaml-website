export const release = {
  cliVersion: "1.6.0",
  frameworkVersion: "0.2.0",
  templateVersion: "0.3.0",
  repository: "https://github.com/MR-C0DE/phpaml-cli",
  tagUrl: "https://github.com/MR-C0DE/phpaml-cli/releases/tag/v1.6.0",
  assets: [
    { mark: "⊞", name: "Windows", detail: "Windows 10/11 · x64", file: "phpaml-1.6.0-windows-x64.exe", size: 8707718, sha256: "9800572d257c143f69f4a3c9944b2774ef84ac7e07e99fe9a70f84defbeadcc4" },
    { mark: "●", name: "macOS", detail: "Apple Silicon · ARM64", file: "phpaml-1.6.0-macos-arm64.pkg", size: 8413400, sha256: "50cb491eaecdff276eb863b9fdd0d10eca786e6663affaee04d98efdca5a5b41" },
    { mark: "◆", name: "Linux", detail: "Debian / Ubuntu · x64", file: "phpaml-1.6.0-linux-x64.deb", size: 6385356, sha256: "f01161c48c3589ed46a153579978dfebe27bf784ba6add2fa3c6641191151302" },
  ],
} as const;

export const releaseAssetUrl = (file: string) =>
  `${release.repository}/releases/download/v${release.cliVersion}/${file}`;
