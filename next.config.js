/** @type {import('next').NextConfig} */
const webpack = require('webpack');
const nextConfig = {
  // output: 'standalone',
  // output: 'export',
  experimental: {
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["placeholder.svg"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET, POST, PUT, DELETE, OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" },
        ],
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/public/:path*',
        destination: '/:path*', // Chuyển /public/header.png -> /header.png
      },
       {
        source: '/api/vip/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_OK}/:path*`, // Chuyển /public/header.png -> /header.png
      }
    ];
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
  config.plugins.push(new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery',
          'window.jQuery': 'jquery'
      }))
  return config;
  }
}

module.exports = nextConfig
