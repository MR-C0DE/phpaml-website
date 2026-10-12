export const release = {
  cliVersion: "1.7.0-beta.39",
  frameworkVersion: "0.3.0-beta.6",
  templateVersion: "0.5.0-beta.8",
  repository: "https://github.com/MR-C0DE/phpaml-cli",
  tagUrl: "https://github.com/MR-C0DE/phpaml-cli/releases/tag/v1.7.0-beta.39",
  assets: [
    { mark: "⊞", name: "Windows", detail: "Windows 10/11 · x64", file: "phpaml-1.7.0-beta.39-windows-x64.exe", size: 8746961, sha256: "b4af4725553cc93155ae451c7bdd95af54819ea7d2f7ec8e1b8392a6558f6036" },
    { mark: "●", name: "macOS", detail: "Apple Silicon · ARM64", file: "phpaml-1.7.0-beta.39-macos-arm64.pkg", size: 8479963, sha256: "ef9d0692e15d44af86e1dcf55414d553f09a216179087c908f4cc8afffb51f78" },
    { mark: "◆", name: "Linux", detail: "Debian / Ubuntu · x64", file: "phpaml-1.7.0-beta.39-linux-x64.deb", size: 6442548, sha256: "288ec4196655233f7b886d374588d3fd16cd0777ebd51256dc2512a672b37ef5" },
  ],
} as const;

export const releaseAssetUrl = (file: string) =>
  `${release.repository}/releases/download/v${release.cliVersion}/${file}`;
