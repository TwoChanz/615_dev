/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Enable type checking during builds
    ignoreBuildErrors: false,
  },
  images: {
    // Enable modern image formats for better performance
    formats: ["image/avif", "image/webp"],
    // Responsive image sizes for different viewports
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.six1fivestudio.dev" }],
        destination: "https://six1fivestudio.dev/:path*",
        permanent: true,
      },
    ]
  },
  // Fallback security headers (middleware handles most, but this provides backup)
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ]
  },
}

// Conditionally wrap with bundle analyzer if available and ANALYZE=true
let config = nextConfig

if (process.env.ANALYZE === "true") {
  try {
    const { default: bundleAnalyzer } = await import("@next/bundle-analyzer")
    config = bundleAnalyzer({ enabled: true })(nextConfig)
  } catch {
    console.warn("Bundle analyzer not installed. Run: npm install -D @next/bundle-analyzer")
  }
}

export default config
