export const release = {
  cliVersion: "1.7.0-beta.14",
  frameworkVersion: "0.2.1-beta.1",
  templateVersion: "0.4.0-beta.5",
  repository: "https://github.com/MR-C0DE/phpaml-cli",
  tagUrl: "https://github.com/MR-C0DE/phpaml-cli/releases/tag/v1.7.0-beta.14",
  assets: [
    { mark: "⊞", name: "Windows", detail: "Windows 10/11 · x64", file: "phpaml-1.7.0-beta.14-windows-x64.exe", size: 8736261, sha256: "c59b4650624f306cdd8ac67d2fdf061f5d11ab94cb061f59b374ed6b10218f64" },
    { mark: "●", name: "macOS", detail: "Apple Silicon · ARM64", file: "phpaml-1.7.0-beta.14-macos-arm64.pkg", size: 8447267, sha256: "89417ffed9af1bc8383975a65a2df6aa8b97f836df7380579d13e3c79b3dd9ed" },
    { mark: "◆", name: "Linux", detail: "Debian / Ubuntu · x64", file: "phpaml-1.7.0-beta.14-linux-x64.deb", size: 6412532, sha256: "90b6ee134ec90391670348401fc5f5c3b843ac42348e1530000ee38e71eca45e" },
  ],
} as const;

export const releaseAssetUrl = (file: string) =>
  `${release.repository}/releases/download/v${release.cliVersion}/${file}`;
