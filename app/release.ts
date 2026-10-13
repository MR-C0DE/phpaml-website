export const release = {
  cliVersion: "1.7.0-beta.43",
  frameworkVersion: "0.3.0-beta.7",
  templateVersion: "0.5.0-beta.10",
  repository: "https://github.com/MR-C0DE/phpaml-cli",
  tagUrl: "https://github.com/MR-C0DE/phpaml-cli/releases/tag/v1.7.0-beta.43",
  assets: [
    { mark: "⊞", name: "Windows", detail: "Windows 10/11 · x64", file: "phpaml-1.7.0-beta.43-windows-x64.exe", size: 8742124, sha256: "7ece7ce987a3b0c0f530bff750a49cac56ef29ad0232da0224d9afb50b130a92" },
    { mark: "●", name: "macOS", detail: "Apple Silicon · ARM64", file: "phpaml-1.7.0-beta.43-macos-arm64.pkg", size: 8477235, sha256: "637590c5c9509515e30aa34c4f077c70c708863a1245ecbd966393335fbffbdd" },
    { mark: "◆", name: "Linux", detail: "Debian / Ubuntu · x64", file: "phpaml-1.7.0-beta.43-linux-x64.deb", size: 6443460, sha256: "6978efec4501eff8a49395da3b68f51e75da2e7758cbc23de716e49362e467df" },
  ],
} as const;

export const releaseAssetUrl = (file: string) =>
  `${release.repository}/releases/download/v${release.cliVersion}/${file}`;
