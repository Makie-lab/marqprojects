import type { NextConfig } from "next";

/**
 * Content-Security-Policy.
 *
 * Scoped to exactly what the app loads:
 *  - Google Fonts (stylesheet + font files)
 *  - image.thum.io  (live project screenshots)
 *  - Gmail / Canva  (asset-request hand-off targets in form-action)
 * `unsafe-inline` for styles is required by Tailwind's injected styles and the
 * inline `style` props used for CSS-variable theming.
 */
const cspDirectives = [
  "default-src 'self'",
  // Next.js requires inline/eval for its dev overlay and hydration payloads.
  process.env.NODE_ENV === "production"
    ? "script-src 'self' 'unsafe-inline'"
    : "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: blob: https://image.thum.io",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "form-action 'self' https://mail.google.com https://www.canva.com",
  "base-uri 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: cspDirectives },
  // Force HTTPS for two years, including subdomains.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  // Do not advertise the framework version.
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true,

  // Fail the build on type errors — no silent regressions in CI.
  // (Lint is enforced separately via `npm run lint` / `npm run verify`.)
  typescript: { ignoreBuildErrors: false },

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "image.thum.io" },
    ],
    formats: ["image/avif", "image/webp"],
  },

  async headers() {
    return [
      {
        // Apply hardening to every route.
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        // API responses must never be cached by shared caches by default.
        source: "/api/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store, max-age=0" },
          { key: "X-Robots-Tag", value: "noindex" },
        ],
      },
    ];
  },
};

export default nextConfig;
