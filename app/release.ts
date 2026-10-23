export const release = {
  cliVersion: "1.7.0-beta.46",
  frameworkVersion: "0.3.0-beta.7",
  templateVersion: "0.5.0-beta.10",
  repository: "https://github.com/MR-C0DE/phpaml-cli",
  tagUrl: "https://github.com/MR-C0DE/phpaml-cli/releases/tag/v1.7.0-beta.46",
  assets: [
    { mark: "⊞", name: "Windows", detail: "Windows 10/11 · x64", file: "phpaml-1.7.0-beta.46-windows-x64.exe", size: 8789440, sha256: "718bba2fbc566992255a0519d604231d480dda8d5b16326bf83cc0c99bbea20e" },
    { mark: "●", name: "macOS", detail: "Apple Silicon · ARM64", file: "phpaml-1.7.0-beta.46-macos-arm64.pkg", size: 8545344, sha256: "bd3d16ec579d99d99f5e13ef843534c0d8f858d3438029f14f936e28ad79ee9e" },
    { mark: "◆", name: "Linux", detail: "Debian / Ubuntu · x64", file: "phpaml-1.7.0-beta.46-linux-x64.deb", size: 6473582, sha256: "becf6f95838d7a58527e357a5ca9e043def33526f31d7e18c57d4c802dabbb07" },
  ],
} as const;

export const releaseAssetUrl = (file: string) =>
  `${release.repository}/releases/download/v${release.cliVersion}/${file}`;
