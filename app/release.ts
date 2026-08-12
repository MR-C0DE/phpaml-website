export const release = {
  cliVersion: "1.5.0",
  frameworkVersion: "0.2.0",
  templateVersion: "0.3.0",
  repository: "https://github.com/MR-C0DE/phpaml-cli",
  tagUrl: "https://github.com/MR-C0DE/phpaml-cli/releases/tag/v1.5.0",
  assets: [
    { mark: "⊞", name: "Windows", detail: "Windows 10/11 · x64", file: "phpaml-1.5.0-windows-x64.exe", size: 8695378, sha256: "f2c1c8f10237033be165303fb7197d59f6b47ff2616484350ff6b8e811b466a0" },
    { mark: "●", name: "macOS", detail: "Apple Silicon · ARM64", file: "phpaml-1.5.0-macos-arm64.pkg", size: 8400053, sha256: "3eed3bd7ed80582f4618e5bcc82a93b1d65f74c5f460b09bff4ea9eab56d47e8" },
    { mark: "◆", name: "Linux", detail: "Debian / Ubuntu · x64", file: "phpaml-1.5.0-linux-x64.deb", size: 6377656, sha256: "4dda0d4901c4923b817817f989903892e945afe088563cd9a7dccd9b2b85baca" },
  ],
} as const;

export const releaseAssetUrl = (file: string) =>
  `${release.repository}/releases/download/v${release.cliVersion}/${file}`;
