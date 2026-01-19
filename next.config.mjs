/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.six1five.dev" }],
        destination: "https://six1five.dev/:path*",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
