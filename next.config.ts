import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Date-dependent content relies on explicit `'use cache'` boundaries (plan ADR-002).
  cacheComponents: true,
  images: {
    // AVIF first (smallest on modern phones), WebP fallback.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
