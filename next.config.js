/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: process.env.NEXT_HOSTNAME || 'localhost',
        port: process.env.NEXT_PORT || '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      }
    ],
  },
}

module.exports = nextConfig
