import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["10.0.0.13"],
  output: "standalone",
  // Locale page helpers are shared between route files. Vinext type-checks
  // them separately; Hostinger only needs the standalone Next.js output.
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
