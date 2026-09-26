import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Date-dependent content relies on explicit `'use cache'` boundaries (plan ADR-002).
  cacheComponents: true,
};

export default nextConfig;
