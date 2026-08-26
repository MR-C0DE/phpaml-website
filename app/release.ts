export const release = {
  cliVersion: "1.7.0-beta.18",
  frameworkVersion: "0.3.0-beta.3",
  templateVersion: "0.5.0-beta.3",
  repository: "https://github.com/MR-C0DE/phpaml-cli",
  tagUrl: "https://github.com/MR-C0DE/phpaml-cli/releases/tag/v1.7.0-beta.18",
  assets: [
    { mark: "⊞", name: "Windows", detail: "Windows 10/11 · x64", file: "phpaml-1.7.0-beta.18-windows-x64.exe", size: 8735338, sha256: "03c238f4394f03cb34fa423a135fb6ecd832e92247c119f434c849fde76f87bc" },
    { mark: "●", name: "macOS", detail: "Apple Silicon · ARM64", file: "phpaml-1.7.0-beta.18-macos-arm64.pkg", size: 8449321, sha256: "46b909b93b58ed7b0d72480d441a74b2b0dbe2afdb282f5c422f0a7d48d57489" },
    { mark: "◆", name: "Linux", detail: "Debian / Ubuntu · x64", file: "phpaml-1.7.0-beta.18-linux-x64.deb", size: 6415984, sha256: "728b357cfc790170b0807816b28a6abd04faa8b45714466bd266b95979f091f5" },
  ],
} as const;

export const releaseAssetUrl = (file: string) =>
  `${release.repository}/releases/download/v${release.cliVersion}/${file}`;
