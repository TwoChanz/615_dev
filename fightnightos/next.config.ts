import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Images are served from Supabase Storage, so we allow that domain
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
}

export default nextConfig
