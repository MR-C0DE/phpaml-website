export const release = {
  cliVersion: "1.7.0-beta.16",
  frameworkVersion: "0.3.0-beta.2",
  templateVersion: "0.5.0-beta.2",
  repository: "https://github.com/MR-C0DE/phpaml-cli",
  tagUrl: "https://github.com/MR-C0DE/phpaml-cli/releases/tag/v1.7.0-beta.16",
  assets: [
    { mark: "⊞", name: "Windows", detail: "Windows 10/11 · x64", file: "phpaml-1.7.0-beta.16-windows-x64.exe", size: 8736897, sha256: "0b777b77cb8b72ec2174199e80c3ff79874e37e8443b6d7f9961a81681488cc3" },
    { mark: "●", name: "macOS", detail: "Apple Silicon · ARM64", file: "phpaml-1.7.0-beta.16-macos-arm64.pkg", size: 8447359, sha256: "f293907df8ab0cffc61c6ef50ee6d7b7b4b85137a7554ce87e3932a481a9a0c8" },
    { mark: "◆", name: "Linux", detail: "Debian / Ubuntu · x64", file: "phpaml-1.7.0-beta.16-linux-x64.deb", size: 6412486, sha256: "57d8585592726cc175d499c1ea030491da502195555120bd634c367965f50b35" },
  ],
} as const;

export const releaseAssetUrl = (file: string) =>
  `${release.repository}/releases/download/v${release.cliVersion}/${file}`;
