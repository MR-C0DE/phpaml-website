export const release = {
  cliVersion: "1.7.0-beta.45",
  frameworkVersion: "0.3.0-beta.7",
  templateVersion: "0.5.0-beta.10",
  repository: "https://github.com/MR-C0DE/phpaml-cli",
  tagUrl: "https://github.com/MR-C0DE/phpaml-cli/releases/tag/v1.7.0-beta.45",
  assets: [
    { mark: "⊞", name: "Windows", detail: "Windows 10/11 · x64", file: "phpaml-1.7.0-beta.45-windows-x64.exe", size: 8773334, sha256: "8336715207f07ff63efc57e356a8303432baf84e50366400ec12ef29b3a9a92f" },
    { mark: "●", name: "macOS", detail: "Apple Silicon · ARM64", file: "phpaml-1.7.0-beta.45-macos-arm64.pkg", size: 8522739, sha256: "65e5ca319c14397f33e9ed6f634539e80d910ebd05a2b3aa6fcf8db09cd9f555" },
    { mark: "◆", name: "Linux", detail: "Debian / Ubuntu · x64", file: "phpaml-1.7.0-beta.45-linux-x64.deb", size: 6458618, sha256: "8897e0da61510d9a3c26460beff4dbdd545c5d7dfb083c3bd569be3872333955" },
  ],
} as const;

export const releaseAssetUrl = (file: string) =>
  `${release.repository}/releases/download/v${release.cliVersion}/${file}`;
