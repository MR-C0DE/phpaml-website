export const release = {
  cliVersion: "1.7.0-beta.33",
  frameworkVersion: "0.3.0-beta.6",
  templateVersion: "0.5.0-beta.8",
  repository: "https://github.com/MR-C0DE/phpaml-cli",
  tagUrl: "https://github.com/MR-C0DE/phpaml-cli/releases/tag/v1.7.0-beta.33",
  assets: [
    { mark: "⊞", name: "Windows", detail: "Windows 10/11 · x64", file: "phpaml-1.7.0-beta.33-windows-x64.exe", size: 8748446, sha256: "4cf0cb626e0c0852c4522b7f453e1334a9d6bbcde62196c886903d3af2a3aee7" },
    { mark: "●", name: "macOS", detail: "Apple Silicon · ARM64", file: "phpaml-1.7.0-beta.33-macos-arm64.pkg", size: 8477534, sha256: "d2d2a56701a9ce926a8b2f59f59928646264a8293e82725a147723c025a69c71" },
    { mark: "◆", name: "Linux", detail: "Debian / Ubuntu · x64", file: "phpaml-1.7.0-beta.33-linux-x64.deb", size: 6439436, sha256: "8eb64c8b106328a788e437d0d06e186a1430d0518c717591fc4db9d31f52bea3" },
  ],
} as const;

export const releaseAssetUrl = (file: string) =>
  `${release.repository}/releases/download/v${release.cliVersion}/${file}`;
