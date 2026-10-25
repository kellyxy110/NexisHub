import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: { root: process.cwd() },
  async redirects() {
    return [{
      source: "/:path*",
      has: [{ type: "host", value: "nexishub\\.vercel\\.app" }],
      destination: "https://www.thenexishub.org/:path*",
      permanent: true,
    }];
  },
  async headers() {
    return [{ source: "/(.*)", headers: [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
    ] }];
  },
};

export default nextConfig;
