import type { NextConfig } from "next";
import path from "node:path";

// `cloudflare:workers` only resolves inside the Workers runtime. The vinext
// dev/build path provides it; the Next.js build for Vercel does not, so point
// it at a stub whose bindings are all absent.
//
// Turbopack wants a project-root-relative specifier here; webpack wants an
// absolute path.
const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: { "cloudflare:workers": "./lib/workers-stub.ts" },
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "cloudflare:workers": path.resolve(process.cwd(), "lib/workers-stub.ts"),
    };
    return config;
  },
};

export default nextConfig;
