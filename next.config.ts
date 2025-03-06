import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.irisona.net',
        port: '',
        pathname: '/**/**',
      },
    ],
  },
}

export default nextConfig
