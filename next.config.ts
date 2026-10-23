import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["10.0.0.13"],
  output: "standalone",
  serverExternalPackages: ["mongodb"],
  // Shared build hosts may expose more CPUs than their process quota allows.
  experimental: { cpus: 2 },
  // Locale page helpers are shared between route files. Vinext type-checks
  // them separately; Hostinger only needs the standalone Next.js output.
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
